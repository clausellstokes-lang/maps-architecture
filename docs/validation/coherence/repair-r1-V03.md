# Repair round 1 — V03 (plans) — lane coherence/repair-V03-r1

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V03-r1; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first "=== " line is
# ignored.
#
# PROGRESS
# - P0 brief read whole (7 routed issues: 3 major, 4 minor) plus G120-V03 (the canon's item-120 ruling names V03); skeleton: done
# - P1 issue sources, canon rulings (g 114–120, 119 (a2)), sibling repairs' hand-offs to V03, every concerned V03 section: done
# - P2 count-asserted substitutions on the live V03 (70 edits + 1 append; work/repair-V03-r1/gen.py): done
# - P3 checks on a copy (applier dry run identical, audit 0 not-OK): done; review, refs, doc_checks, words, result: in progress

=== FILE docs/volumes/V03-interiors.md ===

=== REPLACE ## 1 Scope, the base hooks consumed, and what is out of scope ===
## 1 Scope, the base hooks consumed, and what is out of scope

**Scope.** This volume builds the plan rung — `BuildingGenerator.plan` (§2.6, which names this volume its builder) — to
build depth: the resolution of every building's room programme (by class id, template family, structure slot, split
half, band, era and specialisation) and its default rows; the role table and its companion tables; storey allocation,
the fill of an over-large shell, the vacant programme and the shared access that keeps each household off its
neighbours' rooms; the stair core, the hearths and stacks and every other anchor; the partition of each storey on the
transient arena by the seven layout patterns; doors, unit entries, loops and concealed openings; windows on volume 2's
façade bays and dormers from its dormer rows; furnishing; basements; the crypt's ring, rank and entry (V03 §3.7.4; the
field and the class column's rule are §2.6's *Basements*, item 109 (k) (2) as revised ~20:05, J111), its plan, its
stairs from the nave and the choir stairs over a raised crypt; the head of every way down a building hosts (items 64,
66; II.7.3, II.7.5, II.7.6; item 109 (j) (3), (3b)); the plans of buildings below ground (item 109 (e), (j) (4); II.7.3;
II.7.5); the plans of item 110's buildings — stepped tiers, walls against retaining walls, buildings on decks and in arch
vaults under raised ways, the aqueduct's cistern and the arena (item 110 (a)–(e) as revised ~23:40); the plan report;
click-to-elaborate with stale-until-clicked as the viewer experiences it; the plan edits with their tools, bends and
undo; the room explainer and the clerk's `plan` and `crypt` sections; the plan draw at the building band; the plan
block, SVG, raster and per-storey VTT scenes; the plan's part of Find, the rooms a match uses at the interior band
(item 120; V03 §5.5); budgets with the plan's share of the one-time waits (item 119), bars and the build plan. The base
states the records (§2.6's
`Plan`, `Storey`, `Room`, `Wall`, `Opening`, `WindowRec`, `StairCore`, `Chimney`, `FurnitureItem`, `InteriorLadderRow`
and the fields file f items 232–242 add), the rung's steps (§2.6 *The plan rung*), the interior ladder and the one
capacity function (§2.6), the elaboration record and cache (§2.8, §2.9) and every hook below; this volume cites them.

**Base hooks consumed.**

| hook (base section) | what this volume does with it |
|---|---|
| the plan rung's steps 1–7, the stage-3 contract's fourth rung, the clip order (§2.6) | implements each step (V03 §3) |
| the interior ladder, the canonical chain, the re-cut rule, the unit-door rule, the capacity with its stair-and-landing reserve `R(s)` (§2.6) | consumes; adds unit-to-storey packing, the shared access (A6) and the no-abort fit ladder (V03 §3.2, V03 §3.9) |
| *Entrances* rules 1–5, `Entrance.faces` (with `tunnel`) and `Entrance.storey`; `Basement` with `access`, `crypt` and `kind 'raised'`; *Basements* (the class probability, the terrain gate, the crypt column and ladder, the walk-out at a wall); the requested basement; step 3's `external` door at `basementDoor(b)` (§2.6) | anchors (V03 §3.3), the basement storey, the crypt and the heads (V03 §3.7); the storey rule (V03 §3.6); `basementDoor(b)`'s rule (V03 §3.7.1) |
| footprint templates with their part names, `BaseWing`, the wing-carrying rule, J-P48, `CarriedShapes` with furniture points (§2.6) | part-name affinities (A5 (e)), the crypt's seed; carried furniture (V03 §4.3) |
| `ElaborationRecord` with the plan rung's inputs, the elaboration cache, `elaborate`, the view keys `storey` and `roomNumbers` (§2.8, §2.9) | the click (V03 §4.5); the plan report in the chunk (V03 §2.3) |
| the explainer registry, `room:` addresses resolved by prefix (§2.8) | the room provider and the two sections (V03 §4.6) |
| `transientArena`, `readBack`, `tileRings`, the input-side rule, the re-cut as the same call (§3.4) | the partition machine (V03 §3.5) |
| `ratio()` and the division rule (§3.2 (8)) | `slice`'s ratio (V03 §3.10) |
| the `spine` reader (§3.8) | the label, light and free-furniture point (V03 §3.8, V03 §5.1) |
| the seed-tiling row (§3.10) | T-V3-4 |
| the trigger policy (§4.1) | V03 §4.5 |
| `WorkLimitLaw`, `workLimits.json` with the unit `moduleCells` (§4.12) | the storey's work limit (V03 §3.4) |
| the generation fill, `Building.households` clamped to the capacity, `Building.dwelling`, `BuildingSlot.role`, `BuildingSlot.unhoused` (§4.7 S10b, S11) | the household count, the live-in unit and the slot the programme reads |
| concealed institutions, their entrances and rooms (§2.6, §4.7; item 63) | the concealed sub-graph (V03 §3.5, V03 §3.6), the public merge (V03 §5.4) |
| `relet`, the Works stages, `heightsAt` (§4.11) | re-cut triggers; the plan in progress (V03 §5.1) |
| F-PLAN tiers 0–6 with the stair-kind fallback and the fit ladder, F-EDIT (§5.2) | every step's failure on a tier (V03 §3.9); edits bend before F-EDIT (V03 §4.2) |
| the plan rows of the invariant suite, the unit rule's shared access among them (§5.3) | V03 §7's bars |
| `plan.program`, `plan.layout`, `plan.roles`, `plan.furnish` and the rung counters (§6.1) | the only streams drawn, with creation indices (V03 §3.10) |
| room addresses by anchor, a stacked wing's by wing-relative storey (§6.3) | re-match on re-cut and carry (V03 §2.2, V03 §3.11) |
| the plan events (with `setHearth`, `moveStairCore.kind`, `instance` on a room, `setOpening.hinge`/`swing`, `setWindow.kind`), `setRoomUnit`, `regenerate` with `rung`, `setAttr`, `convert` `relet`, the authoring toolkit (§7.1) | V03 §4 |
| edited attributes, the stored-plan re-cut inside the changing event, the lifecycle rows (§7.2, §7.3, §7.4) | V03 §4.3 |
| `roomProgram.json` with the plan tables, editable tables (§7.6, §10.2, §14) | the rows (V03 §2.4) |
| the dossier derivation table (items 2, 10, 11; DR9, DR24; §7.7) | the dossier trace (V03 §1b) |
| the building band, change markers, the `ink` / `lit` / `hatched` plan rows, room labels and lights, chimneys, the `furniture` role and the `planWallShade` program (§8.2, §8.5, §8.6) | V03 §5 |
| the pyramid with the building-band stops (§8.8) | the detail ladder (V03 §5.1) |
| the path sun and its sampler (item 102 (a), (d); §8.4) | the sun tie-break (V03 §3.5) |
| the room-label range (§9.4) | labels (V03 §5.1) |
| `RoomProgramRow`, `RoomRuleRow` as extended, `DesignationTemplateRow.programme`, `.structures`, `households`, `BuildingClassRow.liveIn` (§10.2) | the resolution keys and rows (V03 §2.4) |
| households, `Household.building`, `Use.specialisation`, `Use.branchOf` (§10.3, §2.7) | units; the specialisation and half keys (A1) |
| the JSON `plan` block, the `.dd2vtt` per-storey profile, Foundry walls, CityJSON, glTF with `interiors` (§11.1) | V03 §5.3 |
| the `query` union with `plan` and `planReport`, the oracle rules (§11.2) | V03 §4.6 |
| the view key `find` (§2.9), the veil, outline and halo rows (§8.2), Find in picture exports (§11.1), the gazetteer's matches under knowledge admission (§11.2), the overlay's budget (§12.5) — item 120 | the rooms a match uses at the interior band (V03 §5.5), T-V3-38 |
| the plan row, the cache line and the chain count (§12.7, §12.8) | V03 §6 |
| the targets, the comfort level for one-time waits, the measured-gain and progress rules and the interaction budgets (§12.1, §12.5, §12.6; item 119) | the plan's one-time waits and its interaction rows (V03 §6), T-V3-37 |
| B-PLAN, T28-1 – T28-19, T63-3, T12-1, the plan soft bands (§13.2, §13.7) | V03 §7 |
| the input scheme, `keymap.json` with the storey keys' precedence, the interaction contract R1–R19 (R2's bend), WCAG 2.2 AA (§14) | V03 §4.2's bends, V03 §4.5 |
| underground neighbourhoods and their dwellings, basement accesses, `AccessPoint`, the undercity and its lifelines, the systems and the access edit (II.7.3 – II.7.6) | the heads (V03 §3.7.2); buildings below ground (V03 §3.12) |
| `RetainingWall` (§2.7) and the levelled ground's one reader `levelledGroundCm(doc, key, p)` (§4.7 S10, S11) | the exposure gates and the entrance storeys (V03 §3.6), the walk-out and its door (V03 §3.7.1), the outside digest |
| raised ways, their spans and the vaults between piers (item 110 (b); §2.7; II.7.6) | grade faces (V03 §3.12 (9)); the inlet mark (V03 §5.1) |
| deck plots (item 110 (d); §2.6, §4.7 S11) and volume 2's deck gate | V03 §3.7.2 (0), the deck bend (V03 §4.2), the fall (V03 §5.1) |
| *Entrances* rules 1, 4 and 5 as volume 2's BCR-V2-38 and BCR-V2-41 amend them (§2.6) | `Entrance.storey`'s rule and O2's roots (V03 §3.6) |
| the anchor table's row for a room of a stored plan (§6.3) | the wing-relative re-match (V03 §3.11) |

**Other volumes and file g items read (cited, never restated).** A `RetainingWall`'s step, read by `basementDoor(b)`'s
rule 1, is §2.7's `stepProfile(wall)` (file f item 245). Volume 1: its entrance reserve and close-up digest (V01 §3.8.2
step 5, V01 §3.8.3), which read `basementDoor(b)` and `stackAccessDoor(b, a)`. Volume 2: `facadeBays` on every side,
`dormerPositions`, `bayM` and `endMarginM` (V02 §3.7; BCR-V2-15); `stairTreads` for the exterior flights (V02 §2.6);
`composition.classFamily` for a `v.` key without a programme row (V02 §3.10.5); `DormerRow` (V02 §2.2; BCR-V2-03);
`BaseWing.role`, `WingRole` and `BaseWing.key`, wings named by key (BCR-V2-01, BCR-V2-27); `MassingRef.low` (V02 §2.1);
the composer's rooms `hall`, `gatehall`, `chapel`, `towerRoom`, their ids and the hall's court door (V02 §3.8);
F-COMPOSE (3)'s omitted rooms (V02 §3.13) and `CompositionRow.rooms.gateHallM` (V02 §2.3, V02 §3.8); each wing's `RoofSpec.kind` as
V02 §4.6 (3) edits it; `Porch.kind` (BCR-V2-04); the crypt seed wings `cryptSeedWings(b)` (V02 §2.4, V02 §3.14.5 (c),
exported by `@plat/plots`) and the wet-ground lift with `Basement.kind 'raised'` (V02 §3.14.5; BCR-V2-28); item 110's
fold as landed — `BaseWing.on` and `.solid` (BCR-V2-31), the roles `tier`, `shrine` and `stair`, `storeyRange`,
`deckLevel`, `stairChain` and `landingSide` (V02 §2.6), `MassingRef.stack` (`lowerRoof`, `top`, `stairs`), the datum of
stacked and deck wings (BCR-V2-32), the storeys a wing reaches and the basement inside the ground wings (BCR-V2-33: the
access `external` where no ground wing is storeyed), `DeckContext` and the deck gate (BCR-V2-34), the solid stack's
entrance and plan root (BCR-V2-41), the wall-side datum (BCR-V2-42), plans of tiers and the crypt seeded with tier 0
(V02 §3.15.3), deck buildings (V02 §3.16), the rest of item 110 at the building (V02 §3.17), the sealed stair form
`none`, the plan chimney drawn at `Chimney.levels[1]` (V02 §5.2), the `ovalCourt` arena (V02 §2.1), `Storey.level` with
a stacked tier's first storey a principal floor (J-V2.85), the bank quay, the vault ceiling and the crypt inside a solid
tier 0 — all as volume 2 landed them (J-VI.5), so `W_TIER_UNREACHED` flags a storeyed wing on a sealed (`none`) stack,
which volume 2 admits. Volume 4: the access records' kinds, sources and `AccessPoint.cause` (BCR-V4-29, BCR-V4-30;
V04 §2.2) as written by U-NET, U-FRONT, U-SYS (the catacomb's entrance, V04 §3.5.1 (9)), U-ACCESS (the crypt join, the
dig from above, the well through a chamber; V04 §3.5.7 (c), (d), (f)), U-LINK (L1's air shaft through a building, L5's
institution access; V04 §3.7) and U-DIG (V04 §3.8); the excavation reading (V04 §3.5.7 (g)); the ruin chambers' column
points (V04 §3.5.0a); the `archVault` chambers (V04 §3.5.4 (d)) and `Chamber.monument`; its underground light rows
(V04 §3.9). Volume 5: the island cathedral's rim-slab crypt vault (V05 §3.10 (5)); `levelledGroundCm` (BCR-V5-30).
Volume 7: the village classes by their `v.` keys (V07 §2.4; V11 §2.9). Volume 9: the Find panel and its `live.find`
overlay, which draw V03 §5.5's rooms (item 120); the progress view of a one-time wait (V09 §4.21.9; item 119). Volume 10: `WhyProvider`, `WhySectionProvider`
and `WhyAnswer` (V10 §2.13, V10 §3.9, V10 §3.9a; BCR-V10-3). Volume 11: `BuildingClassRow.templateFamily`, `.staff`, `.split`
(V11 §2.3; BCR-V11-1), the `crypt` column, `cryptM2` and `crypt.rankShare` (BCR-V11-13), `HeightsRow.storeyCm` (V11 §2.8)
through the designation template's `heights` key, the template families and their structures (V11 §3.6.1), the
specialisations by band (V11 §3.6.2), the class ladder with `conduit_house` and `arena` (V11 §3.5), the ladder step
types (V11 §3.12), the scene archetypes and the custom-content resolver (V11 §3.13). File g: item 102 (the sun), item
104 (h) (5) (a custom service inside its provider), item 105 (h) (split works and shop, `Use.branchOf`), item 108 (a)
(ladder buildings), item 109 (e), (g), (j) (1)–(5) with (3b), (k) (2) and (6) as revised ~20:05 (J111), item 110 (a)–(f)
as revised ~23:40, item 119 (the plan's one-time waits; J130) and item 120 (Find at the interior band; J133).

**Out of scope, each with its owner.** The composer that makes `Composition.wings`, `towers`, `courts`, dormer rows and
`Composition.rooms` (volume 2); this volume reads a composition and, where none is stored or composed, the base wings
(§2.6's clip order treats both). The household records, their people and schedules (§10.3, `@plat/sim`). The underground
elements an access reaches, the rules that create, gate, draw and seal accesses (item 64's lottery, item 109 (j) (3)'s
dig draw and public openings, (3b)'s breaches, the catacomb's burial-face source, growth and entrance, the crypt join's
draw) and the underground buildings' outlines and heights (volume 4, II.7); this volume draws the head of every access a
building hosts and plans the rooms of underground buildings. The crypt's growth target and rank share (volume 11's rows),
its seed wings and the wet-ground lift (volume 2), the island's rim-slab vault (volume 5) and the crypt field with the
class column's rule (§2.6); this volume states the crypt's ring, rank and entry (V03 §3.7.4) and plans it. The tier
construction, the stair wings, the pent skirts and the roofscape's terraces, parapets and stacks (volume 2); retaining
walls, raised ways and their spans, and deck plots (the base); arch vault chambers and a ruin's stepped monument
(volume 4) — this volume reads them and plans the rooms inside. The epoch engine that schedules re-lets and excavations
(§4.11, volume 6); how an epoch run and the history replay are timed against item 119's comfort level (volume 6's
part of the item). Find's panel, type-ahead, chip grid, results and `live.find` overlay (volume 9), its draw rows (§8.2)
and its matches (§11.2's gazetteer) — this volume gives the rooms a match uses at the interior band (V03 §5.5).
Elevation drawings: the 3-D export reads heights, not plans (§11.1), and this volume adds no elevation
view (J-V3.19).
=== END ===

=== REPLACE ## 1b Wiring table ===
## 1b Wiring table

Every piece this volume adds, its producer, its consumers and the base hook it plugs into (principle (7): a piece with
no producer or no consumer is a defect; none is left). This table is the one home of each piece's readers: V03 §2.5's
lifecycle rows cite it.

**Tables** (all in `roomProgram.json`, §14; each edited by `editTable`, §7.6; each cell with provenance)

| piece | producer | consumers | base hook |
|---|---|---|---|
| `RoomRoleRow` (V03 §2.4) | defaults here; `editTable` | A2–A5 (V03 §3.2), the cutters (`minWidthCm`, `aspectMax`, V03 §3.5), O2–O3 (`door`, `maxDoors`), W1 (`exterior`), H1 (`hearth`), `Room.lit`, F1–F3 (`furnish`), labels (display text, §10.4), the `bias` tie-break (V03 §3.5) | `roomProgram.json` (§14) |
| the extended `RoomProgramRow` / `RoomRuleRow` cells (`family`, `slot`, `half`, `shared`, `unitHearth`, `unitOneRoom`, `fill`, `staffSleepIn`, `seatingExits`, `perRoom`, `notBasement`, `belowTop`, the optional override cells; V03 §2.4) | defaults here; `editTable` | A1, A2, A5 (V03 §3.2), S6 (d) (V03 §3.3) | §10.2 |
| the class, named, family, slot, class-id and village rows; the vacant programme (V03 §2.4) | defaults here, the class rows keyed by §2.6's `BuildingClass` (volume 11's classes and volume 7's `v.` keys), the family rows by volume 11's families, the named rows by name; for a `v.` key without a row, volume 2's `composition.classFamily` (V02 §3.10.5) | A1 | §10.2 |
| `PatternRow` (V03 §2.4) | defaults here | the per-piece pattern choice (V03 §3.5) | §2.6 step 4 |
| `EntranceAnchorRow` (V03 §2.4) | defaults here | A2 (8) (V03 §3.2) | §2.6 step 3 |
| `WingAffinityRow` (V03 §2.4) | defaults here | A5 (e) | §2.6 step 3; volume 2's `WingRole` |
| `SubLocationRoleRow` (V03 §2.4) | defaults here | A2 (5) | §2.6 `SubLocation` |
| `AccessHostRow` (V03 §2.4) | defaults here | the head's host room (V03 §3.7.2 (6)) | II.7.4 `AccessPoint` |
| `FurnitureRow` catalogue (V03 §2.4) | defaults here | F1–F4 (V03 §3.8), the draw (V03 §5.1), SVG, JSON, `instance` edits (V03 §4.2) | §2.6 step 6 |
| `PlanGeometryRow` (V03 §2.4) | defaults here | anchors (V03 §3.3), cutters (V03 §3.5), openings (V03 §3.6), heads and crypt (V03 §3.7), F2, the view rules (V03 §4.5, V03 §5.1), A3's unit floor — all from P1; the capacity's `R(s)` (`stair.ladder`, `stair.landingCm`) from M2b; `Entrance.storey` (`datum.maxSteps`, `stair.riserCm`, `exposureAllStoreys`), `basementDoor(b)`, `stackAccessDoor(b, a)` and W2's outside sample (`moduleCm`, `door.mainCm`) from M3a (V03 §8's PE) | `roomProgram.json` |
| the plan stage's `WorkLimitLaw` row (V03 §2.4) | `workLimits.json` (§4.12) | the storey's `transientArena` work limit (V03 §3.4) | §4.12 |
| the register lines of `roomProgram.json` and T-V3-35's `BenchBarDef` (V03 §2.4, V03 §7) | this volume's lines; the seats landing PE (M2b, M3a), P1 and P2 write the entries, the P1 seat registers the bar | V12's register lint and milestone exits (V12 §3.11, T-V12-20), `plat parity`'s `bar.` rows (V12 §2.1), V3-P6's exit (V03 §8) | V12 §3.11 (`register.json`) |

**Records and fields** (declared in §2.6 unless marked; their meaning V03 §2.1)

| piece | producer | consumers |
|---|---|---|
| `Storey.furniture`, `FurnitureItem`, `Room.nextFurniture` | F1–F4 (V03 §3.8) on `plan.furnish`; `instance` on a room (V03 §4.2) | the draw (V03 §5.1), JSON, SVG, the VTT image, the carry check (V03 §4.3), T-V3-8 |
| `Room.name` | `setAttr plan/rooms/<id>/name` via T11 `name` (V03 §4.2) | the label (V03 §5.1), the panel (V03 §4.5), JSON, the Foundry journal, the room why (V03 §4.6) |
| an edited `Room.lit` | `setAttr plan/rooms/<id>/lit` (V03 §4.2) | the draw's lights, VTT and Foundry lights |
| `Opening.hinge`, `.swing` | O3 (V03 §3.6); `setOpening` (V03 §4.2) | the door leaf draw, VTT bounds, F2 |
| `Opening.point` | the crawl hatch, a hatch head (V03 §3.7) | the draw, VTT, Foundry |
| `Opening.steps` | O1 (c) (V03 §3.6) | the draw, F2, glTF |
| `WindowRec.kind` | W2 (V03 §3.6); `setWindow` (V03 §4.2) | the draw, SVG, VTT, glTF |
| `Chimney.air` | V03 §3.7.2 (4), V03 §3.12 (3) | the stack draw (§8.6), VTT, the room why |
| `Chimney.levels` carried through the tiers above | H3 (V03 §3.3) | T-V3-4, volume 2's roofscape drawing the stack over `column` at `levels[1]` (V02 §5.2), VTT, JSON |
| `ProgramRoom.origin`, `.subLocation`, `.anchor.access` | A2, A6 (V03 §3.2), V03 §3.7.2 | A5, the cutters, P5, the report, the room why |
| `AccessHead` (§2.6), `Plan.heads` | V03 §3.7.2 from `BuildingInput.accesses` | the anchors (fixed rings), the draw, JSON `accesses`, the VTT portal, the Foundry note, the panel (V03 §4.5), the room why (V03 §4.6), T-V3-22; a head of `storey` null the outline draw, the JSON, the panel and the why only |
| `Building.declaredRooms` | `setAttr declaredRooms` via T9 `shape` (V03 §4.2) | A2 (7), `ElaborationRecord.inputs` |
| `Entrance.faces` `tunnel` | volume 4's entrance derivation for sewer-front, undercity, cavern and ruin buildings (V04 §1b) | V03 §3.12 (4), VTT portals |
| `Entrance.storey` | §2.6's `deriveEntrances` at S11 (its rule V03 §3.6; built at M3a, V03 §8's PE) | E1, O2's roots, A2 (8), A6, W2's door gate, the switcher's first storey, the VTT scene's elevation, JSON |
| `Basement.crypt` | the basement function (§2.6 *Basements*; its ring, rank and entry V03 §3.7.4), from volume 11's `crypt` column, `cryptM2`, `crypt.rankShare`, volume 2's `cryptSeedWings(b)` and lift, a dossier crypt record | A2 (9), the crypt plan (V03 §3.7.5), the crypt and choir stairs (V03 §3.7.6), the stair-entered reading, the rank and the crypt-edit dry runs (V03 §3.7.4), volume 4's crypt join (V04 §3.5.7 (c), which reads this field and never a plan room), the `crypt` section (V03 §4.6) and volume 10's why, volume 1's T-V1-47 (no crypt has a place or a pin), `basementDoor(b)`'s vault (V03 §3.7.1), JSON `entities`, T-V3-23 |
| `BaseWing.partName` | §2.6's outline builder from its template part (S11), passed through by volume 2's M0 (d) and kept by its wing writers (lifecycle V03 §2.5) | A5 (e)'s `part:` affinities, the crypt's seed through volume 2's `cryptSeedWings`, volume 2's M8 (e), the room why (V03 §4.6), the JSON wing record, T-V3-13 |
| `StairCore.levels` spanning a stack; the landing doors, terrace exits, terrace and seating doors (`Opening`s of V03 §3.3 S6, V03 §3.6 O1 (d)) | S5–S6 | O2's roots, T28-2, the draw, VTT portals, Foundry, the room why (causes `landingDoor`, `terraceExit`, `terraceDoor`, `seatingExit`) |
| `PlanReport` with `notes` (V03 §2.3; in the elaboration chunk, §2.9) | A1 and every step's failure handling (V03 §3.9) | the panel (V03 §4.5; each warning its `report.plan.<code>` line), the clerk's `planReport`, the room why and the `plan` section (V03 §4.6), JSON `report`, §13.7's soft bands, T28-1's reporting clause, T-V3-35 |

**Derived pieces** (never stored; computed at the call and consumed — the one list of them)

| piece | computed from | read by |
|---|---|---|
| the level reading `s₀(w)` and `ground(b)` (V03 §3.3) | volume 2's `storeyRange`, `BaseWing.on`, `.solid` | the seeds (V03 §3.4), the datums, S2, S5, S6, A5 (e), V03 §3.7, the switcher (V03 §4.5), T-V3-27; `Entrance.storey`, `basementDoor(b)` (V03 §3.7.1), `stackAccessDoor(b, a)`'s domain (V03 §3.7.2 (1)), volume 1's entrance reserve and close-up digest (V01 §3.8.2 step 5, V01 §3.8.3), §2.6's *Basements* condition (BCR-V2-33) |
| storey heights and `floorCm(w, s)` (V03 §3.3) | volume 2's `deckLevel`, `Heights`, volume 11's `HeightsRow.storeyCm` | O1 (c), W2, `Entrance.storey`, the crypt stairs, the exports' elevations, T-V3-18, T-V3-27 |
| the roof terraces `T(x)`, their floor, parapet and walkability (V03 §3.4a) | the wings' `on`, each wing's own `RoofSpec.kind` (`MassingRef.stack.top` only for the shrine), `deckLevel`, the family's `parapetCm` | S6 and O1 (d)'s doors, W4, the draw (V03 §5.1), VTT, Foundry, JSON `terraces`, the switcher, T-V3-29 |
| the outside ground of each exterior wall (V03 §3.6) | `levelledGroundCm(doc, key, p)` (BCR-V5-30), `RetainingWall`s (the chain's far side), a deck's surface, a lower wing's roof | W2's window and door gates, `Entrance.storey`, the walk-out, the outside digest (§2.8), T-V3-30 |
| `basementDoor(b)` — an `external` basement's outside door (V03 §3.7.1; declared in §2.6) | `Basement.ring`, `.access`, from M6-U the crypt's vault, the `Entrance` records, the wings (`ground(b)`, the stair wings, stair 0's approach), `RetainingWall`s with §2.7's `stepProfile(wall)` (file f item 245), `levelledGroundCm`, the cells `moduleCm`, `door.mainCm`, `cellar.insetCm`, `cellar.depthCm` | the plan rung's step 3 door on storey −1, the crawl hatch (V03 §3.7.7), the crypt's entry where the crypt is not stair-entered (V03 §3.7.6), O2's basement root, volume 1's entrance reserve and close-up digest, the why causes `walkOut` and `tombDoor` (V03 §4.6), T28-3, T-V3-30 |
| `stackAccessDoor(b, a)` — a stack-hosted access's outside door (V03 §3.7.2 (1)) | the wings (`on`, `solid`, `role`, their rings), volume 2's `stairChain` (stair 0 and its approach strip, V02 §4.6), `AccessPoint.ground.at`, the cell `moduleCm`; `ground(b)` and `Building.basement` for its domain | `AccessHead.door`, V03 §3.9's row, V03 §5.1, V03 §5.3, volume 1's entrance reserve and close-up digest, T-V3-22 |
| the door run's point `doorRunPoint` (V03 §3.7.1) | a straight run, a target point, an admissibility test, the cell `moduleCm` | `basementDoor(b)`, `stackAccessDoor(b, a)` |
| the grade faces of a host chamber (V03 §3.12 (9)) | volume 4's `archVault` chambers (V04 §3.5.4 (d)) | W1–W3 on those faces, the frontage's `faces`, the face flue, T-V3-32 |
| the deck predicate `onDeck(b)` (V03 §3.7.2 (0)) | volume 2's deck gate (BCR-V2-34) | V03 §3.7.2 (0), the deck bend (V03 §4.2), the fall (V03 §5.1), T-V3-31 |
| the crypt's capped bays (V03 §3.7.4 (3)) | the crypt's step-2 ring, `Basement.crypt.ring`, `Basement.ring` | A2 (9)'s `undercroft`, storey −1's seed pieces (V03 §3.4, V03 §3.7.5), the column grid, the draw, volume 6's capped vaults (V06 §3.18.3 (3), T-V6-55), T-V3-23 (h); with the ring, `basementDoor(b)`'s vault |
| the stair-entered reading of a crypt (V03 §3.7.4) | `ground(b)`, the storeyed ground-standing wings' rings, the crypt's vault | the basement's extent for an `always` class and an author's crypt ring (at S11 from M6-U), O2's crypt join and closed vault, V03 §3.7.5's undercroft join, V03 §3.7.6's entry, V03 §3.9's crypt rows, the crypt-ring edit (V03 §4.2), T-V3-23 (j) |
| the principal crypt and every crypt's rank (V03 §3.7.4 (3)) | every `Basement.crypt` of the settlement, the class rows | the rank's trim, the crypt-edit dry runs (V03 §3.7.4), the `crypt` section (V03 §4.6), the panel, JSON `crypt.principal`, T-V3-23 (b) |
| the crypt's column-grid points and `column` faces (V03 §3.7.5) | the step-2 ring's OBB (an edited ring's own), `crypt.bayCm`, `crypt.columnCm` | the cutters (fixed rings), F3, the draw, VTT `line_of_sight` |
| a stair core's or stair head's flights and landing; a crypt stair's or choir flight's treads (V03 §3.3 S4, V03 §3.7.6) | the kind, the bay, the storey height or the two rooms' floors | the draw, JSON flights, glTF, VTT portals |
| a room's `lit` (its role's unless an edited attribute) | `RoomRoleRow.lit`, the edited `Room.lit` | the draw's lights, VTT and Foundry lights |
| a chimney's column ring; a door's clearance square | `PlanGeometryRow.hearth.stackCm` about `Chimney.column`; the door's width (V03 §3.6 O3) | the cutters, F2, T-V3-6, T-V3-8 |
| an opening's concealment — concealed exactly when a room on either side is (V03 §3.6 O6) | the rooms' `concealed` flags | the merge at a public key (V03 §5.4), every export |
| the storey switcher's names; a room's number (V03 §4.5, V03 §5.1) | the levels, the wings' roles and ordinals, the terraces; the room order under the `roomNumbers` view key | the switcher, the draw, the key table, SVG `plan.key`, the Foundry journal, JSON `number` |
| the porch outline (V03 §5.1) | volume 2's `Porch` and its kind | the draw under the plan |
| the inlet mark (V03 §5.1) | an aqueduct-class raised way ending within `access.snapCm` of a cistern | the draw, JSON `inlet` |
| a split half's programme (`programmeSource.half`) | `Use.branchOf` as S10b's split writes it (item 105 (h)) | A1, the report, the room why |
| the rooms a Find match uses — `findRooms(plan, b, target)` (V03 §5.5; item 120) | the drawn plan's rooms (`Room.program`'s origins, `Room.subLocation`, `Room.unit`, scope), the match (V09's `live.find` over §11.2's gazetteer at the view's key), §2.9's view key `find`, V03 §5.4's merge | V09's `live.find` overlay with §8.2's veil, outline and halo rows; the storey switcher's and the plan panel's marks (V03 §4.5); the SVG `plan.find` group (V03 §5.2); T-V3-38 |

**Stage outputs** (each consumed; all inside `BuildingGenerator.plan`, §2.6)

| output | fed by | feeds |
|---|---|---|
| A1's resolved row and `programmeSource` (V03 §3.2) | the template's `programme` key, `Building.class`, `BuildingSlot.role`, `Use.specialisation`, `Use.branchOf`, the band, the era, volume 11's `templateFamily` and `split`, volume 2's `composition.classFamily` | A2, the report, the room why |
| A2's lists (V03 §3.2) | the resolved row, the ladder row, `Building.households`, `.dwelling`, `.subLocations`, `.concealed`, `.declaredRooms`, `Basement.crypt` and its capped bays, `BuildingInput.accesses`, volume 11's `staff`, `Composition.rooms` and the composed wings' roles | A3–A5, P5 (`Room.program`, `Room.subLocation`) |
| A5's allocation and A6's stair hall (V03 §3.2) | A2–A4, the anchors, `WingAffinityRow`, `RoomRuleRow.adjacency`, the ladder's `staff.placement` | the cutters' targets per piece (V03 §3.5) |
| stair cores, stacks, entrance points, composer rooms, heads, the crypt ring, columns, crypt stairs, choir flights (V03 §3.3, V03 §3.7) | the wings by key, the entrances, the basement, the composition's rooms, the accesses, `PlanGeometryRow` | `transientArena`'s fixed rings (§3.4), O2's graph, the draw |
| S6's joins of stacked wings (V03 §3.3) | `stairChain`, `landingSide`, the cores, the terraces | O2's stack roots, T28-2, the draw, VTT portals, the report's anchors |
| the cut pieces (V03 §3.5) | seed pieces, fixed rings, targets, `plan.layout` | `readBack` → `Room.ring`, `Wall` (§3.4) |
| the door graph (V03 §3.6) | pieces with roles, adjacency cells, `maxDoors`, entrances, `floorCm`, the crypt and its capped bays | `Opening` records, `Plan.units[].entry`, T28-2, §5.3's interior-ladder row |
| windows (V03 §3.6 W1–W3) | volume 2's `facadeBays` on every side, the room's `exterior` | `WindowRec`s, §8.4's lit windows once a plan exists |
| dormer counts (V03 §3.6 W4) | top-storey roofed rooms with exterior demand | volume 2's unedited `DormerRow.count` (positions `dormerPositions`); `Wing.dormers` without a composition |
| furniture (V03 §3.8) | rooms, openings, `FurnitureRow`, `plan.furnish` | the draw, exports |

**Interfaces**

| interface | implementer | caller |
|---|---|---|
| `BuildingGenerator.plan` (§2.6) | this volume's rung in `@plat/buildings` (§14) | the elaboration cache on a click, `elaborate: 'view'`, the clerk's `plan` query — each after `wings` and `rooms` (V03 §4.5, V03 §4.6) — and a stored plan's re-cut (§7.3) |
| `compose(…, 'rooms')`, the `rooms` rung (V02 §3.8) | volume 2 | this volume's click, `view` and `plan` query, before `plan` |
| `WhyProvider` for kind `room` and path `plan` of kind `building` (V03 §4.6) | this volume | volume 10's oracle and clerk (`query why`), volume 9's why panel |
| `WhySectionProvider` `plan` and `crypt` (V03 §4.6; V10 §3.9a) | this volume | the facade's `why` query, which merges sections after the kind's provider (V10 §3.9); volume 9's panels |
| `query` kinds `plan`, `planReport` (§11.2; V03 §4.6) | this volume | the embedding API, the clerk |
| `basementDoor(b)` (§2.6's declaration; rule V03 §3.7.1) | this volume's rule in `@plat/plots`, re-exported by `@plat/buildings`, built at M3a (V03 §8's PE), its crypt clause at M6-U | the plan rung's step 3, volume 1's entrance reserve and close-up digest (V01 §3.8.2 step 5, V01 §3.8.3), T28-3, T-V3-30 |
| `stackAccessDoor(b, a)` (V03 §3.7.2 (1)) | this volume's rule in `@plat/plots` beside `basementDoor(b)`, re-exported by `@plat/buildings`, built at M3a | V03 §3.7.2 (1), volume 1's entrance reserve and close-up digest, T-V3-22 |
| `ground(b)` and the level reading (V03 §3.3), W2's outside sample (V03 §3.6) | this volume's rules in `@plat/plots`, built at M3a | the plan rung, `Entrance.storey`, `basementDoor(b)`, `stackAccessDoor(b, a)`, volume 1's entrance reserve and digest, §2.6's *Basements* (BCR-V2-33) |
| `findRooms(plan, b, target)` (V03 §5.5) | this volume's pure reading in `@plat/buildings`, landing with Find (V03 §8) | V09's `live.find` overlay, V03 §4.5's switcher and panel, V03 §5.2's SVG exporter |

**Edit kinds**: V03 §4.1's table is their one home (tool, events, semantics, lifecycle row, undo).

**Entity kinds** (plan parts are values of the plan, never registry entities, J-V3.12): every room, wall, opening,
window, core, stack, head, column and furniture item is drawn (V03 §5.1), labelled where it is a room (V03 §5.1),
exported (V03 §5.2, V03 §5.3) and persisted with a stored plan (§2.6) or re-derived from the cache (§2.9). Item 110's derived
surfaces — roof terraces (V03 §3.4a), the exterior flights (treads by volume 2's `stairTreads`), the stoop and the inlet
mark — are drawn (V03 §5.1) and exported (V03 §5.3), named only through the switcher's "Roof terrace" (V03 §4.5), and
never persisted: each is re-derived at read from the wings, the openings and the raised ways.

**View state and chrome**: the `roomNumbers` view key (§2.9; V03 §4.5), the storey switcher and the plan panel
(V03 §4.5), the keymap rows `plan.storeyUp` / `plan.storeyDown` (`keymap.json`, §14); the view key `find` (§2.9;
item 120), read and never written by V03 §5.5.

**The dossier, end to end.** No plan fact is a dossier field: every room, wall and door is `map` tier by `factTier`, an
edited one `declared` (§2.8; item 101). A dossier change reaches a plan only through the records below, whose change marks
the plan stale or re-cuts a stored one (§2.8, §7.3). The dossier inputs and their derivation rows:
* **households** → `Building.households`, §4.7 S10b's fill from §7.7's population row (§7.7 item 10; item 20 (h)) → A2 (1);
* **an institution's use and concealment** → `Building.use`, `Building.concealed` (§7.7 items 2, 11); its class is
  volume 11's class id by volume 8's row map (V11 §3.11) → A1;
* **a custom institution** (item 104) → volume 11's resolver (V11 §3.13) → a class and its designation template → A1
  rule (1); a custom service provided by an institution → a `SubLocation` of its provider's building with its
  SettlementForge tags (item 104 (h) (5)) → A2 (5);
* **an institution ladder** (item 108 (a)) → one building of its greater tier's class (GUILD, SIZE) or a building per
  member (COUNT), by volume 11's step types (V11 §3.12) → A1;
* **churches and crypts** → the church buildings from the dossier's religious institutions (volume 8's rows, DR9;
  V08 §2.6a) → volume 11's `crypt` column → `Basement.crypt` (§2.6) → A2 (9); a dossier crypt record binds to its church
  building (V04 §2.3a), which makes it `always` (V03 §3.7.4);
* **an access's knowledge** → `AccessPoint.knownTo` (item 64 (c); II.7.4) → what a viewer's key sees of its head
  (V03 §3.7.3, V03 §5.4);
* **stepped forms** (item 110 (c)) → the dossier's culture fact (volume 8) → volume 11's specialisation (`stepped_temple`,
  `terraced_palace`, `tiered_tower`) → `Use.specialisation` → A1 rule (1)'s `'*'` rows (V03 §2.4). No dossier fact names
  a retaining wall, a raised way's span or a deck: they reach the plan as map facts only.
=== END ===

=== REPLACE ### 2.1 Record additions (typed) ===
### 2.1 Record additions (typed)

§2.6 declares every field this volume adds to the base's records (file f items 232, 235–239, 241): `Storey.furniture`
and `FurnitureItem`; `Room.nextFurniture` and `Room.name`; `Opening.point`, `.hinge`, `.swing` and `.steps`;
`WindowRec.kind`; `Chimney.air` and `Chimney.levels` carried through the tiers above; `ProgramRoom.origin`,
`.subLocation` and `.anchor.access`; `Plan.heads`; `Building.declaredRooms`; `Entrance.faces` `'tunnel'`;
`Entrance.storey`; `Basement.crypt`; and `AccessHead` on `Plan.heads`, whose fields V03 §3.7.2 places. This volume
states what the fields §2.6 points here for mean:

* `Room.nextFurniture` — written by F3 and by an `instance` add (V03 §3.8, V03 §4.2). `Room.name` — the author's name
  (`setAttr plan/rooms/<id>/name`, V03 §4.2): the label shows it, the role unchanged.
* `Opening.hinge` (doors only) — the leaf hangs at the end of `wall` nearer `a` (0) or `b` (1); `Opening.swing` (doors
  only) — the room the leaf opens into; both derived by O3 (V03 §3.6), editable by `setOpening` (V03 §4.2).
  `Opening.steps` — 1 … `PlanGeometryRow.datum.maxSteps` treads of a short flight inside the lower room where the two
  rooms' floors differ (V03 §3.6 O1 (c)); absent: level. `Opening.point` — a floor opening's centre (a trapdoor, a hatch,
  a head's opening, V03 §3.7), `wall` then naming the host room's nearest wall for ordering only.
* `Chimney.air` — a stack with `air` and no hearth is a hearthless air stack (V03 §3.7.2 (4)); `Chimney.levels` runs from
  the lowest hearth to the highest level of any storeyed wing whose extent contains `column` (V03 §3.3 H3), `wing`
  staying the hearth's wing.
* `ProgramRoom.rule` — for origin `crypt`: 0 the crypt, 1 its capped bays' undercroft (A2 (9)); for origin `composer`:
  the composer room's index in `Composition.rooms`, −1 for the room A2 (11) places for an omitted one.
* `FurnitureItem` (§2.6) — placed and rotated by F3 (V03 §3.8); `edited` is kept by New random on `plan.furnish`
  (V03 §4.3). `Entrance.storey`'s rule is V03 §3.6's; `Basement.crypt`'s ring, rank and entry are V03 §3.7.4's.

Everything else the plan reads at draw, export and check is derived and never stored: V03 §1b's *Derived pieces* is
their one list.
=== END ===

=== REPLACE ### 2.3 The plan report (non-canonical) ===
### 2.3 The plan report (non-canonical)

```ts
interface PlanReport { // kept in the elaboration chunk beside its Plan (§2.9's ElaborationChunk.bytes carries both); never in a digest
  building: Id; inputs: Hash64 /* the ElaborationRecord.inputs it was derived under */;
  programmeSource: { level: 'specialisation'|'class'|'family'|'buildingClass'|'fallback'; key: string; slot?: string;
    half?: 'works'|'shop'; era?: string; vacant?: true;
    via?: string /* the composition key of volume 2's composition.classFamily a v. key without a row of its own resolved through (A1 (3)) */ } /* A1's resolution (V03 §3.2) */;
  owed: { origin: ProgramRoom['origin']; rule: number; role: RoomRole; delivered: 'full'|'folded'|'generic'|'dropped'|'oversize'; tier?: 0|1|2|3|4|5|6 /* absent exactly for a room dropped
    under solidMonument (A5 (b); §13.2's T28-1) */; into?: Id }[] /* per ProgramRoom */;
  units: { household: Id; asked: UnitForm; built: UnitForm }[] /* F-PLAN tier 0's form falls */;
  fit: ('dropSoft'|'omitHard'|'reduceCirculation'|'stairDown'|'minimalRooms')[] /* the no-abort ladder's steps taken (V03 §3.9) */;
  anchors: { kind: 'core'|'stack'|'access'|'entranceRoom'|'sharedAccess'|'crypt'|'cryptStair'|'choirStair'|'hood'|'flue'|'composerRoom'
    |'landingDoor'|'terraceExit'|'terraceDoor'|'seatingExit'|'tombDoor'|'stoop'|'inlet'; tier: 0|1|2|6; distCm?: Cm; note?: string }[];
  warnings: { code: 'W_TIER_UNREACHED'|'W_STACK_ACCESS'|'W_DECK_ACCESS'|'W_ENTRANCE_NO_STOREY'|'W_CHURCH_CATACOMB_HEAD'
    |'W_GRADE_FACE_TUNNEL'|'W_STOREY_RUN'; wing?: number; entrance?: number; access?: Id;
    note?: string }[] /* failures V03 §3.9 reports, W_ codes only; each also a panel line, keyed report.plan.<code>, its
                        words V03 §4.5's */;
  notes: { id: 'shrineOneRoom'|'solidMonument'|'stackCarried'; wing?: number; note?: string }[]
    /* information, no failure (V03 §3.3 S6, H4; V03 §3.9; a room shrineOneRoom drops keeps its tier in owed): the ids the
       plan section keys info.plan.note.<id> (V03 §4.6) */;
  patterns: Record<number /* storey */, { piece: number; pattern: LayoutPattern | 'lodgings' }[]> /* per seed piece (V03 §3.5) */;
  datum: { doorsWithSteps: number; joinsRefused: number } /* V03 §3.6 O1 (c) */;
  circulationShare: Record<number /* storey */, number>; attempts: Record<number, number> /* plan.layout attempts per storey */;
  chainSteps: number /* canonical-chain steps run */; furnitureSkipped: number; ms: number /* measured, diagnostics only */ }
```

Producer and consumers: V03 §1b's `PlanReport` row. **A stored plan's report** (a stored plan keeps no cache chunk once evicted, §12.8) is recomputed
on demand — from `Plan.program` against the stored rooms (`Room.program` gives owed ↔ delivered; a program row no room
names is `dropped`), the units from `Plan.units` against the ladder row, the heads from `Plan.heads`; the members only a
derivation measures (`attempts`, `ms`, `fit`) read absent (J-V3.27).
=== END ===

=== REPLACE ### 2.4 The rule tables and the default rows ===
### 2.4 The rule tables and the default rows

All rows live in `roomProgram.json` (§14), carry provenance (§7.6, §17.1 (6)) and are edited by `editTable`; every
number below is `own` unless marked, with the default shown; its calibration register entry is this section's closing
*register lines of `roomProgram.json`* — a B-PLAN `measure` at V3-P6 for the columns they name — else V12 §3.11's
default line.
Room lists are discrete cells, read by §4.5's discrete-cell rule: an authored four-column cell reads poor / modest /
prosperous / rich, `squalid` reading the poor row and `comfortable` the modest row (the nearest rowed band below;
J-V3.28).

**Types** (§10.2 lists the tables and extends its two rows by file f item 428).

```ts
interface RoomRoleRow { // one per RoomRole: what a role is, wherever a programme names it
  role: RoomRole; scope: Room['scope'] /* the default scope; a RoomRuleRow's scope overrides; A2 (1) sets 'unit' */;
  area: [number, number, number] | 'ring' /* m²: min, target, max before the ladder's sizeFactor; 'ring': the composer's or a structural ring, never area-checked */;
  storey: 'any'|'ground'|'upper'|'top'|'basement'|'notBasement'|'belowTop' /* belowTop: any storeyed level but the building's highest
                                 (a stepped temple's sacristy off the one-room shrine, V03 §2.4) */; exterior: 'none'|'some'|'max';
  door: 'door'|'arch'|'open'|'passage'|'none' /* passage and none only on the structural rows */; maxDoors: number;
  hearth: boolean; lit: boolean; minWidthCm: Cm;
  aspectMax: number /* long ÷ short side of the room's OBB: slice refuses a part above it, soft — tried last (V03 §3.5) */;
  bias: 'none'|'sun'|'lowEnd' /* the assignment's tie-break among equal fits (V03 §3.5): sun — the part facing nearest the noon sun (item 102);
                                 lowEnd — the part whose centroid samples lowest (a longhouse's byre, downslope) */;
  hosts: number /* sub-locations one room of the role hosts (A2 (5)) */;
  furnish: { density: number /* items per m² */; wallBias: number /* share placed at wall slots first (F3) */; glyphs: string[] } }
interface FurnitureRow { // the abstract glyph catalogue; setting-agnostic shapes, our own
  glyph: string; shape: 'rect'|'round'|'ell'; wCm: [Cm, Cm]; dCm: [Cm, Cm]; placement: 'against'|'corner'|'free'|'row';
  clearCm: Cm /* free floor kept in front of it */; perRoomMax: number; weight: number; band?: string[] /* absent: every band */;
  tall: boolean /* taller than a sill: an against item keeps off a window's bay (F3) */ }
interface PatternRow { pattern: LayoutPattern; requires: 'none'|'entrance'|'hall'|'core'|'courtOrStreet' /* what a seed piece must hold for the pattern to cut it (V03 §3.5) */ }
interface EntranceAnchorRow { entrance: Entrance['role'] | 'concealed'; roles: (RoomRole | 'crossPassage' | 'firstGround' | 'concealedFirst')[] /* A2 (8) */ }
interface WingAffinityRow { role: RoomRole; wings: string[] /* WingRole values (BCR-V2-01) or 'part:<partName>' (BCR-V3-13), preferred first (A5 (e));
                                 'tier:top' the highest storeyed tier, 'tier:entrance' the tier holding the main entrance's storey (item 110 (c)) */ }
interface SubLocationRoleRow { key: string /* a SubLocation tag, a SettlementForge tag of a custom service, or 'cap:<capacity key>' */; roles: RoomRole[] /* A2 (5) */ }
interface AccessHostRow { reach: string /* the reached element's system kind (II.7.6's kinds, sewer included, ruin, item 109 (b), and mine), or 'well' */;
  cause?: AccessCause['rule'] /* V04 §2.2 (BCR-V4-30): a row with a cause wins over the row without one for the same reach */; roles: RoomRole[] /* V03 §3.7.2 (6) */ }
interface PlanGeometryRow { // one row per table version
  moduleCm: Cm /* 50, the wing-local module (§2.6 step 4) */; minRoomWidthCm: Cm /* 180 */; corridorCm: Cm /* 100 */; galleryCm: Cm /* 120 */; crossPassageCm: Cm /* 150 */;
  door: { mainCm: Cm /* 120 */; entranceCm: Cm /* 100 */; internalCm: Cm /* 80 */; serviceCm: Cm /* 90 */; archCm: Cm /* 120 */; jambCm: Cm /* 15 */; heightCm: Cm /* 200 */ };
  window: { widthCm: Record<string /* band id */, Cm> /* squalid 40, poor 50, modest 60, comfortable 70, prosperous 80, rich 100 */; slitCm: Cm /* 20 */; endClearCm: Cm /* 30 */; sillCm: Cm /* 90 */; headCm: Cm /* 210 */; lightBelowCm: Cm /* 60 */ };
  stair: { riserCm: Cm /* 20 */; goingCm: Cm /* 23 */; flightCm: { house: Cm /* 90 */; institution: Cm /* 120 */ }; landingCm: Cm /* 90 */; spiralCm: Cm /* 180, diameter */; ladder: [Cm, Cm] /* 70 × 110 */; hatchCm: Cm /* 80 */ };
  hearth: { stackCm: [Cm, Cm] /* 60 × 60, one flue */; doubleCm: [Cm, Cm] /* 60 × 100, back to back */; apronCm: Cm /* 90 */; flueReachM: M /* 30: an underground hearth's reach to an air shaft (V03 §3.12) */ };
  access: { shaftCm: Cm /* 120 */; wellCm: Cm /* 150, parapet included */; snapCm: Cm /* 300 */ };
  crypt: { bayCm: Cm /* 400: the column grid's pitch (V03 §3.7.5) */; columnCm: Cm /* 50: a column's square side */ };
  datum: { maxSteps: number /* 3 */ };
  unitFloorM2: Record<UnitForm, number> /* house 60, dwelling 30, lodging 16, apartment 12, room 9 — A3's floor per unit */;
  furnish: { walkwayCm: Cm /* 60 */ };
  view: { planCap: number /* 64 */; planStop: number /* 350: 'view' derives and draws plans at 1:350 or finer */; leavesStop: number /* 350 */; treadsStop: number /* 250 */;
    frameShare: number /* 0.6 */; frameStops: [number, number] /* [125, 350]: the zoom-to-plan clamp (V03 §4.5) */ };
  sunTieBreak: boolean /* true; false is a no-op pin (the bias 'sun' ignored) */;
  exposureAllStoreys: boolean /* true: W2's outside-ground gates on every storey and Entrance.storey by the ground (V03 §3.6; item 110 (a));
                                 false: exposure read on basement walls only and every entrance on storey 0 — the no-op pin of T-V3-34 and
                                 the off form of V11 §3.24.0's item-110 row; its presets.MFCG, .FTG and .VG entries false
                                 (V11 §2.2's preset entries; provenance own, noted 'fixed: the parity off value (V11 §3.24.0)') */ }
```

§10.2 declares the extended `RoomProgramRow` and `RoomRuleRow` (file f item 428); their cells mean: `for.cls` a
class id of §2.6's `BuildingClass` (volume 11's classes, volume 7's `v.` keys) or `'*'` in a generic slot row; `for.family` a V11 template family key; `for.slot` a
structure slot role (`#n` the n-th slot of that role in slot order); `for.use` a specialisation name (V11 §3.6.2);
`shared` the ladder row's shared rooms the key admits (default `'all'`); `unitHearth` whether the poor row's cooking
place carries a hearth (default true); `unitOneRoom` a unit's rooms delivered as one room (A2 (1); default false);
`fill` A5 (f)'s list; `staffSleepIn` A2 (3b)'s share (default 0); `seatingExits` a core against a solid seating wing
ending in an exit onto it (V03 §3.3 S6 (d); default false); `furnish.density` and `.wallBias` multipliers (default 1)
of the role cells; each pattern entry's weight stated at every band (0 excludes). A `RoomRuleRow` cell left absent
reads the role table's (adjacency absent: none); `storey` `'notBasement'` and `'belowTop'` as the role table's;
`count.perRoom` the `perCapacity` divisor (capacity ÷ `perRoom` rooms, rounded up); `half` default `both`; `hearth`
overrides the role's.

**The pattern table** (`PatternRow`): `nave` none; `bisect` none; `follow` courtOrStreet; `spine` core (a piece holding
the core's bay, else the main entrance); `hall_and_parlour` hall (a piece holding a `hall`, `common room` or `taproom`
target and at least one more); `cross_passage` entrance (the piece holding the main entrance); `enfilade` none.

**The default role table** (areas in m²; `U` upper, `G` ground, `T` top, `B` basement, `nB` not basement; exterior
n / s / m; scope `svc` service, `circ` circulation, `sh` shared; bias `sun`, `low`, `—`; hosts 1 unless noted; density
in items per m²). Density provenance: store, kitchen, parlour and stair hall are `ref:Dwellings itch 17195045 prop density
(export), scaled at 2 m per cell` (the measured medians ÷ 4), hall and chamber the same rounded; every other density,
every area and every other cell is `own` (J-V3.22):

| role | scope | area min / target / max | storey | ext | door | maxDoors | hearth | lit | minWidth cm | aspectMax | bias | density | glyphs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| hall | svc | 16 / 24 / 40 | G | s | door | 4 | yes | yes | 300 | 2.5 | sun | 0.06 | table, bench, chest |
| parlour | svc | 10 / 15 / 26 | any | s | door | 3 | yes | yes | 250 | 2 | sun | 0.075 | table, stool, chest |
| solar | svc | 12 / 18 / 30 | U | m | door | 2 | yes | yes | 300 | 2 | sun | 0.07 | bed, chest, table |
| chamber | svc | 8 / 12 / 20 | nB | s | door | 1 | no | yes | 240 | 2 | — | 0.08 | bed, chest |
| staff chamber | svc | 4 / 6 / 9 | any | s | door | 1 | no | yes | 180 | 2.5 | — | 0.10 | cot, chest |
| bedroom | svc | 6 / 8 / 12 | nB | s | door | 1 | no | yes | 200 | 2 | — | 0.08 | bed, chest |
| cooking place | svc | 3 / 4 / 6 | nB | s | open | 2 | yes | yes | 150 | 3 | — | 0.10 | table, barrel |
| room | svc | 9 / 10 / 14 | nB | s | door | 1 | no | yes | 220 | 2 | — | 0.08 | pallet, chest |
| kitchen | svc | 9 / 14 / 24 | G | s | door | 3 | yes | yes | 250 | 2 | — | 0.125 | table, bench, barrel, shelf |
| buttery | svc | 4 / 6 / 10 | G | n | door | 1 | no | no | 180 | 3 | — | 0.15 | barrel, shelf |
| store | svc | 4 / 8 / 16 | any | n | door | 1 | no | no | 180 | 4 | — | 0.15 | crate, barrel, shelf |
| cellar | svc | 6 / 12 / 30 | B | n | door | 2 | no | no | 180 | 4 | — | 0.15 | barrel, crate, shelf |
| common room | svc | 16 / 26 / 45 | G | m | open | 4 | yes | yes | 350 | 2 | sun | 0.07 | table, bench |
| taproom | svc | 16 / 24 / 40 | G | m | door | 3 | yes | yes | 300 | 2 | sun | 0.09 | table, bench, barrel, counter |
| guest room | svc (hosts 2) | 8 / 10 / 14 | U | s | door | 1 | no | yes | 240 | 2 | — | 0.08 | bed, chest |
| dormitory | svc (hosts 4) | 16 / 24 / 40 | U | s | door | 1 | no | yes | 300 | 3 | — | 0.10 | pallet |
| shop | svc | 10 / 16 / 28 | G | m | door | 2 | no | yes | 250 | 2.5 | sun | 0.10 | counter, shelf, chest |
| workshop | svc | 14 / 22 / 40 | G | m | door | 2 | no | yes | 300 | 3 | — | 0.10 | workbench, shelf, crate |
| forge | svc | 12 / 18 / 30 | G | s | arch | 2 | yes | yes | 300 | 2.5 | — | 0.08 | anvil, workbench, barrel |
| bakehouse | svc | 12 / 18 / 28 | G | s | door | 2 | yes | yes | 300 | 2.5 | — | 0.08 | table, trough |
| brewhouse | svc | 14 / 22 / 36 | G | s | door | 2 | yes | yes | 300 | 2.5 | — | 0.10 | vat, barrel |
| slaughter room | svc | 12 / 20 / 36 | G | s | arch | 2 | no | yes | 300 | 2.5 | — | 0.05 | table, trough, rack |
| kiln | svc | 12 / 20 / 40 | G | s | arch | 2 | yes | yes | 300 | 2 | — | 0.05 | crate, shelf |
| furnace | svc | 8 / 12 / 20 | G | n | door | 1 | yes | no | 250 | 2 | — | 0.05 | crate |
| counting room | svc | 6 / 9 / 14 | nB | s | door | 1 | no | yes | 200 | 2 | — | 0.10 | table, chest, shelf |
| office | svc | 8 / 12 / 20 | nB | s | door | 2 | yes | yes | 250 | 2 | — | 0.10 | table, shelf, chest |
| study | svc | 6 / 10 / 16 | nB | s | door | 1 | no | yes | 220 | 2 | — | 0.12 | table, shelf, stool |
| library | svc | 16 / 30 / 90 | nB | m | door | 2 | no | yes | 350 | 3 | — | 0.10 | shelf, table, stool |
| laboratory | svc | 10 / 16 / 30 | nB | s | door | 1 | yes | yes | 250 | 2 | — | 0.12 | table, shelf, vat |
| guard room | svc | 10 / 16 / 24 | G | s | door | 2 | yes | yes | 250 | 2.5 | — | 0.08 | bench, table, rack |
| armoury | svc | 8 / 16 / 40 | nB | n | door | 1 | no | no | 250 | 3 | — | 0.12 | rack, chest |
| mess | svc | 16 / 30 / 80 | nB | m | door | 3 | yes | yes | 350 | 3 | — | 0.08 | table, bench |
| ward | svc (hosts 6) | 20 / 40 / 100 | nB | m | door | 2 | yes | yes | 400 | 4 | — | 0.10 | bed, chest |
| cell | svc | 4 / 6 / 9 | any | n | door | 1 | no | no | 180 | 2 | — | 0.10 | pallet |
| bath | svc | 15 / 30 / 80 | G | s | door | 2 | no | yes | 300 | 3 | — | 0.04 | vat, bench |
| nave | svc | 30 / 120 / 900 | G | m | arch | 4 | no | yes | 400 | 4 | — | 0.06 | altar, pew |
| chancel | svc | 20 / 45 / 150 | G | m | arch | 3 | no | yes | 400 | 3 | — | 0.04 | altar, bench, ledger (only where the building has no crypt, F3) |
| chapel | svc | 12 / 20 / 40 | nB | m | arch | 2 | no | yes | 300 | 3 | — | 0.05 | altar, bench |
| chapter house | svc | 40 / 60 / 120 | G | m | door | 2 | no | yes | 500 | 2 | — | 0.05 | bench |
| sacristy | svc | 6 / 9 / 14 | G | s | door | 1 | no | yes | 200 | 2 | — | 0.10 | chest, shelf |
| crypt | svc | ring (`Basement.crypt.ring`, V03 §3.7.4; its size is volume 11's `cryptM2`) | B | n (a `raised` crypt's walls above ground: `light` windows, W2) | arch | 2 | no | no | 300 | — | — | 0.03 | tomb |
| porch | circ | 4 / 8 / 16 | G | s | arch | 2 | no | yes | 200 | 2.5 | — | 0.05 | bench |
| undercroft | svc | 20 / 40 / 120 | G | s | arch | 3 | no | no | 300 | 4 | — | 0.05 | crate, barrel |
| arcade | svc | 40 / 150 / 700 | G | m | open | 8 | no | yes | 400 | 6 | — | 0.08 | table, counter |
| garderobe | svc | 1 / 1.5 / 3 | nB | s | door | 1 | no | no | 90 | 3 | — | 0 | — |
| garret | svc | 6 / 12 / 30 | T | s | door | 1 | no | yes | 200 | 4 | — | 0.10 | crate, pallet |
| mill room | svc | 20 / 40 / 80 | G | s | arch | 2 | no | yes | 300 | 2 | — | 0.04 | millstone, crate |
| barn floor | svc | 40 / 80 / 200 | G | n | arch | 2 | no | no | 400 | 4 | — | 0.02 | crate, trough |
| byre | svc | 15 / 30 / 60 | G | s | door | 2 | no | no | 300 | 4 | low | 0.05 | stall, trough |
| stable | svc | 20 / 40 / 100 | G | s | arch | 2 | no | no | 300 | 5 | — | 0.05 | stall, trough, rack |
| dovecote | svc | 6 / 12 / 25 | G | n | door | 1 | no | no | 200 | 2 | — | 0.20 | shelf |
| back room | svc | 8 / 12 / 20 | nB | n | door | 1 | no | yes | 200 | 2.5 | — | 0.08 | table, bench |
| strongroom | svc | 4 / 6 / 10 | any | n | door | 1 | no | no | 180 | 2 | — | 0.12 | chest |
| towerRoom | svc | ring | any | m | door | 2 | no | yes | 200 | — | — | 0.06 | table, chest |
| gatehall | circ | ring (12 / 20 / 40 in a gatehouse slot) | G | n | arch | 4 | no | yes | 300 | — | — | 0 | — |
| stair hall | circ | 6 / 9 / 16 | any | s | open | 6 | no | yes | 200 | 5 | — | 0.05 | bench |
| corridor, landing | circ | derived (V03 §3.5) | any | s | open | — | no | no | `corridorCm` | — | — | 0 | — |
| passage | circ | ring (the span ring, §2.6) | G | n | passage | 2 | no | no | — | — | — | 0 | — |
| stair | circ | ring (a core's bay, a head's bay, a crypt stair's or a choir flight's ring; V03 §3.3, V03 §3.7) | any | n | open | 2 | no | yes | — | — | — | 0 | — |
| stack | circ | ring (the stack's ring, V03 §3.3) | any | n | none | 0 | no | no | — | — | — | 0 | — |
| shaft | circ | ring (a shaft's or well's ring, V03 §3.7.2) | any | n | open (at its head), none (through) | 1 | no | no | — | — | — | 0 | — |
| column | circ | ring (a crypt column, V03 §3.7.5; a ruin chamber's column inside an underground building, V03 §3.12) | any | n | none | 0 | no | no | — | — | — | 0 | — |
| cistern | svc | 8 / 20 / 80 | G | n | arch | 1 | no | no | 250 | 3 | — | 0 | — (drawn with §8.2's water role as its floor fill, V03 §5.1) |

`back room` and `strongroom` are the concealed programme's roles (item 63); `crypt` the room of `Basement.crypt` (V03 §3.7.4, V03 §3.7.5); `stair`,
`stack`, `shaft` and `column` are structural faces (every storey's rooms tile its extents, §2.6's fourth rung): never allocated by
A5, never furnished; `stack` and a `shaft`'s through-ring never labelled or entered (BCR-V3-9). `towerRoom` and `gatehall`
are volume 2's composer roles (V02 §3.8) with its spelling; `gatehall` in a gatehouse slot without a composer takes the
area shown.

**The class rows** (the last resolution level of A1 but one, keyed by §2.6's `BuildingClass`; every `RoomProgramRow` of
the class at every band). Notation: rooms as role × count law (priority; storey where the role's is overridden; bands
where not all); patterns as ground / upper / top / basement, each `pattern weight`; circulation as rich → squalid; fill in
order. Unit, shared, staff and circulation rooms come from the interior ladder (§2.6) and resolve through the role table:

| class | own rooms | patterns | stair: placement, kind | basementAccess | circulation | shared, unitHearth, unitOneRoom | fill |
|---|---|---|---|---|---|---|---|
| hovel, tent, shack, lean_to_shelter | — | nave 1 / nave 1 / nave 1 / nave 1 | by_entrance, ladder | trapdoor | 0/1 | none, true, true | — |
| cottage | — | hall_and_parlour 3, bisect 1 / bisect 1 / bisect 1 / nave 1 | rear, winder | trapdoor | 1/20 at every band | all, true, false | chamber, store |
| house | — | rich–comfortable: hall_and_parlour 2, cross_passage 1, spine 0; modest–squalid: hall_and_parlour 1, cross_passage 1, spine 1 / rich–comfortable: bisect 2, spine 0; modest–squalid: bisect 1, spine 2 / bisect 1 / nave 1 | by_entrance, dogleg | core | 1/10, 1/10, 1/8, 1/6, 1/5, 1/5 | all, true, false | chamber, store |
| row_house | shop × const 1 (soft) where the template's frontage is `shopfront` or `stall` | rich–comfortable: cross_passage 2, follow 1, spine 0; modest–squalid: cross_passage 1, follow 1, spine 1 / bisect 1, spine 1 (spine 0 at rich–comfortable) / bisect 1 / nave 1 | rear, straight | core | as house | all, true, false | chamber, store |
| inn | common room × 1 (hard; area 30 / 45 / 90), kitchen × 1 (hard), buttery × 1, store × 1, guest room × perCapacity (tag tempResidential, perRoom 2), dormitory × 1 (poor, modest), parlour × 1 (prosperous, rich), counting room × 1 (rich) | cross_passage 2, follow 1 / spine 1 / spine 1 / nave 1 | centre, dogleg | core | 3/20 | all, true, false | guest room |
| workshop | workshop × 1 (hard), store × 1 | follow 2, bisect 1 / bisect 2, spine 1 (spine 0 at comfortable and richer) / bisect 1 / nave 1 | rear, straight | trapdoor | 1/8 | all, true, false | store, chamber |
| warehouse | store × perStorey (hard), counting room × 1 | nave 2, bisect 1 / nave 1 / nave 1 / nave 1 | by_entrance, straight | core | 1/20 | none, true, false | store |
| chapel | nave × 1 (hard), sacristy × 1 (soft) | nave 1 everywhere | by_entrance, ladder | trapdoor | 0/1 | none, true, false | — |
| church | nave × 1 (hard), chancel × 1 (hard), sacristy × 1, chapel × 1 (soft; prosperous, rich) | nave 1 everywhere | tower, spiral (else by_entrance, winder) | core | 1/20 | none, true, false | — |
| manor | (A2 (4): only at the one-household ladder form) hall (area 40 / 80 / 250), solar, parlour, kitchen, buttery × 1 each (hard), chapel × 1 (rich), counting room × 1, garderobe × perStorey, store × 1 | hall_and_parlour 2, cross_passage 1 / enfilade 1, follow 1 / bisect 1 / nave 1 | centre, dogleg (tower, spiral where a tower joins the wing) | core | 1/10 | all, true, false | chamber, parlour, store |

**The named rows** (J-V3.135): four rows in the class rows' notation and columns, keyed by a name that no building's class
takes — a template family is never a class (§2.6's `BuildingClass`) — and reached only by name, from the family rows
("= hall", "= keep", "= tower", "= mill"), the slot rows and the class-id and specialisation rows that take one whole;
A1 (4) never reaches them:

| named row | own rooms | patterns | stair: placement, kind | basementAccess | circulation | shared, unitHearth, unitOneRoom | fill |
|---|---|---|---|---|---|---|---|
| hall | hall × 1 (hard; area 40 / 80 / 250; ground, or upper over an undercroft × 1 where floors > 1), counting room × 1, office × 1 (soft), store × perStorey | nave 2, follow 1 / nave 1 / nave 1 / nave 1 | by_entrance, straight | core | 1/10 | all, true, false | store |
| keep | hall × 1, guard room × 1, store × perStorey (basement), garderobe × perStorey (hard) | nave 1, bisect 1 / nave 1, bisect 1 / nave 1 / nave 1 | tower, spiral (else centre, winder) | core | 1/20 | all, true, false | chamber, store |
| tower | towerRoom × perStorey | nave 1 everywhere | centre, spiral | core | 0/1 | none, true, false | — |
| mill | mill room × 1 (hard), store × 1 | nave 1 / bisect 1 / nave 1 / nave 1 | by_entrance, ladder | trapdoor | 1/20 | none, true, false | store |

Per-band cells (the class and the named rows): the circulation column gives the six rows' `circulation` (the default band set's order, §4.5); every
other column holds at every row unless it names rows. The poorest row's circulation is the one §2.6's capacity reads — on PE's register line (V12 §3.11's default line), never
tuned at V3-P6; the `room` role's area, the capacity's other cell, rides the first register line, measured there and never
tuned (the register lines below).
`unitOneRoom`: a hovel's household lives in one room with its hearth (A2 (1)).

**The template-family rows** (`for.family`, V11 §3.6.1's families; the rooms stand in the family's **main slot** — its
first structure marked required, else its first structure; the other slots take the slot rows below). Four-column
cells p / m / pr / r; "= X" takes the class or named row X whole:

| family | main slot | own rooms | patterns | stair | bAcc | circ | fill |
|---|---|---|---|---|---|---|---|
| `dwelling-row` | house | = row_house | | | | | |
| `dwelling-detached` | house | = house | | | | | |
| `dwelling-compound` | hall | hall × 1 (hard; area 40 / 80 / 250); parlour × 1 (soft); counting room × 1 (soft; pr, r) | as manor | centre, dogleg | core | 1/10 | chamber, parlour, store |
| `hovel`, `cluster` | hut, the cluster's structure | = hovel | | | | | |
| `lodging-row` | house | kitchen × 1 (shared, soft, ground, adjacency hard to core); common room × 1 (shared, soft; m, pr, r) | cross_passage 2, bisect 1 / spine 1 / spine 1 / nave 1 | by_entrance, dogleg | core | 1/6 | room |
| `shopfront` | shop-house | shop × 1 (hard); store × 1 (soft; m, pr, r); counting room × 1 (soft; r) | cross_passage 1, follow 1, bisect 1 / bisect 2, spine 1 / bisect 1 / nave 1 | rear, straight | core | 1/10 | chamber, store |
| `workshop-row` | shop-house | workshop × 1 (hard); shop × 1 (soft; m, pr, r); store × 1 (soft; pr, r); counting room × 1 (soft; r) | follow 2, bisect 1 / bisect 2, spine 1 / bisect 1 / nave 1 | rear, straight | trapdoor | 1/8 | store, chamber |
| `workshop-yard` | house | = house (the dwelling); the work in its `forge or workshop` slot | | | | | |
| `works-noxious` | works | workshop × 1 (hard); store × 1 (soft); office × 1 (soft; pr, r) | nave 2, bisect 1 / nave 1 / nave 1 / nave 1 | by_entrance, straight | trapdoor | 1/20 | store |
| `yard` | shed | store × 1 (hard); workshop × 1 (soft) | nave 1 everywhere | by_entrance, ladder | trapdoor | 1/20 | store |
| `kiln-yard` | kiln | kiln × 1 (hard); store × 1 (soft) | nave 2, bisect 1 / nave 1 / nave 1 / nave 1 | by_entrance, ladder | trapdoor | 1/20 | store |
| `warehouse` | store | = warehouse | | | | | |
| `market-hall` | hall | arcade × 1 (hard, ground); hall × 1 (hard, upper); office × 1 (soft, upper) | nave 1 / nave 2, bisect 1 / nave 1 / nave 1 | by_entrance, straight | core | 1/20 | store |
| `hall` | hall | = hall | | | | | |
| `inn-compound` | inn | = inn | | | | | |
| `tavern-row` | house | taproom × 1 (hard); store × 1 (soft, basement; m, pr, r); guest room × 2 (soft; pr); parlour × 1, guest room × 3, kitchen × 1 (soft; r) | cross_passage 2, follow 1 / bisect 1, spine 1 / bisect 1 / nave 1 | by_entrance, dogleg | core | 1/10 | chamber, guest room |
| `bath-house` | bath hall | bath × 1 (hard); furnace × 1 (hard); room × 1 (soft: the changing room); store × 1 (soft) | nave 1, bisect 2 / bisect 1 / nave 1 / nave 1 | by_entrance, straight | trapdoor | 1/20 | room |
| `church` | nave | = church | | | | | |
| `chapel` | nave | = chapel | | | | | |
| `cathedral` | nave and choir | nave × 1 (hard); chancel × 1 (hard); sacristy × 1; chapel × 3 (soft) | nave 1 everywhere | tower, spiral (else by_entrance, winder) | core | 1/20 | — |
| `cloister` | church | = church | | | | | |
| `court-institution` | main range | hall × 1 (hard); office × 1 (soft); chamber × 1 (soft: the warden's); kitchen × 1 (soft) | hall_and_parlour 1, cross_passage 1, bisect 1 / spine 1, bisect 1 / bisect 1 / nave 1 | centre, dogleg | core | 1/8 | chamber, store |
| `barracks` | block | dormitory × perStorey (hard, upper); mess × 1 (hard, ground); armoury × 1; guard room × 1; office × 1 (soft) | nave 1, bisect 1 / spine 2, nave 1 / nave 1 / nave 1 | centre, dogleg | core | 1/8 | dormitory, store |
| `watch-house` | post | guard room × 1 (hard); store × 1 (soft) | nave 1 everywhere | by_entrance, ladder | trapdoor | 0/1 | — |
| `tower` | tower | = tower | | | | | |
| `castle` | the keep | = keep | | | | | |
| `farm` | farmhouse | = house, with kitchen × 1 (hard) and store × 1 (soft: the dairy) | | | | | |
| `mill` | mill house | = mill | | | | | |
| `extractive` | works shed | workshop × 1 (hard); store × 1 (soft) | nave 1 everywhere | by_entrance, ladder | trapdoor | 0/1 | — |
| `landing-yard` | sheds | store × 1 (hard); workshop × 1 (soft) | nave 1, bisect 1 / nave 1 / nave 1 / nave 1 | by_entrance, ladder | trapdoor | 1/20 | store |
| `stable-yard` | stable | stable × 1 (hard); store × 1 (soft, top: the hay loft) | nave 1, bisect 1 / nave 1 / nave 1 / nave 1 | by_entrance, ladder | trapdoor | 1/20 | store |

**The slot rows** (`for.slot`; for every structure that is not its template's main slot; resolved (1) a row with that slot
under the building's class id, (2) under its family, (3) the generic slot row below (`for.cls` `'*'`), (4) the building's
class row; the level is reported): house, farmhouse, close houses, parsonage → the `house` class row at the band; dwelling
(staff) → the `cottage` class row; hut → `hovel`; shed, sheds → store × 1 (hard), workshop × 1 (soft), nave; hall → the
`hall` named row; main range → the `court-institution` family row; kitchen → kitchen × 1 (hard), buttery × 1, store × 1
(soft), bisect; stable, stables → stable × 1 (hard), store × 1 (soft, top); store → store × perStorey (hard); cellar store →
store × perStorey (hard; basement preferred where the building has one); shop-house → the `shopfront` family row;
workshop, works, works shed → workshop × 1 (hard), store × 1 (soft); forge → forge × 1 (hard), store × 1 (soft); forge or
workshop → forge × 1 (hard) where the class's V11 profile family is `metalwork`, else workshop × 1 (hard), each with
store × 1 (soft); journeymen → dormitory × 1 (hard), staff chamber × 1 (soft: the foreman's), spine; office → office × 1
(hard), store × 1 (soft); kiln → kiln × 1 (hard), store × 1 (soft); inn → `inn`; brewhouse → brewhouse × 1 (hard), store
× 1 (soft, basement); bath hall → the `bath-house` family row; furnace → furnace × 1 (hard); nave, church → the `church`
class row; nave and choir → the `cathedral` family row; tower, towers → the `tower` named row; porch → porch × 1 (hard);
chapter house → chapter house × 1 (hard); cloister ring → arcade × 1 (hard), nave; gatehouse → gatehall × 1 (hard),
guard room × 1 (soft: the porter's); barn, barns → barn floor × 1 (hard), store × 1 (soft, top); byre → byre × 1 (hard),
store × 1 (soft, top); chapel → the `chapel` class row; block → the `barracks` family row; armoury → armoury × perStorey
(hard); post → the `watch-house` family row; annex → store × 1, office × 1 (soft); mill house → `mill`; wheel or sails →
mill room × 1 (hard); dovecote → dovecote × 1 (hard); chamber block → solar × 1 (hard), chamber × perStorey (soft),
enfilade; ranges → chamber × perStorey (hard), store × 1 (soft). Under the `cloister` family: ranges#1 → chapter house × 1
(hard, ground), dormitory × 1 (hard, upper); ranges#2 → mess × 1 (hard, ground: the refectory), kitchen × 1 (hard);
ranges#3 → store × perStorey (hard), guest room × 2 (soft, upper). A slot role no row names falls to the building's class
row, reported `buildingClass`.

**The class-id rows** (`for.cls` a V11 class id, V11 §3.5; band cells p / m / pr / r follow V11 §3.6.2's specialisations,
so a building's work grows with the quarter's wealth — DEFINITION §3 step 7; `slot` where the rooms stand in a slot other
than the main; `staffSleepIn` where not 0). Every other V11 class takes its family row:

| class id | rooms (p / m / pr / r) | notes |
|---|---|---|
| `smithy`, `farrier`, `armourer` | slot `forge or workshop`: forge / forge, store / forge, shop, store / forge, shop, store, counting room | staffSleepIn 0.5; the journeymen's beds go to a `journeymen` slot where the template has one (A2 (3b)) |
| `bakery` | bakehouse / bakehouse, shop / bakehouse, shop, store / bakehouse, shop, store, counting room (all soft but the bakehouse and, from m, the shop) | staffSleepIn 0.5 |
| `cookshop` | kitchen (hard), shop (hard); store (soft; pr, r) | — |
| `tavern`, `alehouse` | taproom / taproom, store (basement) / taproom, guest room × 2, store (basement) / taproom, parlour, guest room × 3, kitchen, store (basement); an alehouse stops at the modest cell | — |
| `inn`, `coaching_inn`, `caravanserai` | the `inn` class row | staffSleepIn 0.5 |
| `brewery` | half works: brewhouse (hard), store (soft, basement), counting room (soft; r); half shop: taproom (hard), store (soft, basement); both: brewhouse, taproom, store | split, item 105 (h); staffSleepIn 0.5 |
| `butcher` | half works: slaughter room (hard), store (soft); half shop: shop (hard), store (soft); both: shop (hard), slaughter room (soft; adjacency hard to entrance:yard), store | split |
| `potter` | half works: kiln (hard), store (soft); half shop: shop (hard), store (soft); both: kiln, shop, store | split |
| `shambles` | slaughter room × 2 (hard), shop × 1 (soft), store × 1 | — |
| `maltings` | kiln (hard), store × perStorey (hard) | — |
| `smelter` | forge (hard), store (soft) | — |
| `vintner` | shop (hard), store × 2 (hard, basement) | — |
| `goldsmith` | shop / shop, workshop / shop, workshop, strongroom / shop, workshop, strongroom, counting room | — |
| `moneylender`, `money_changer`, `pawnshop`, `bank` | shop or hall (bank), counting room, strongroom (hard) | — |
| `tailor` | workshop / workshop, shop / shop, workshop, store / shop, workshop, parlour (the fitting room), store | — |
| `apothecary`, `herbalist` | shop / shop, store / shop, laboratory (the still-room), store / shop, laboratory, study, store | — |
| `barber_surgeon`, `physician`, `healer` | shop or parlour, chamber (the surgery); physician: study, laboratory (soft; pr, r) | — |
| `alchemist`, `enchanter`, `scroll_scribe` | laboratory (hard), shop (soft), store (soft); scroll scribe: study for laboratory | — |
| `merchant_house` | — / counting room, store / counting room, store × perStorey, parlour / hall (area 40 / 80 / 250), counting room, store × perStorey, strongroom | — |
| `shop`, `grocer`, `fishmonger`, `draper`, `furrier`, `ship_chandlery`, `outfitter` | shop / shop, store / shop, store / shop, store, counting room | — |
| `mint`, `assay_office` | workshop or laboratory (hard), strongroom (hard), guard room, office | — |
| `town_hall`, `guildhall`, `customs_house`, `harbour_master` | hall (hard, upper over an undercroft where floors > 1), office × 2, counting room, store; guildhall: chapel (soft; r) | — |
| `courthouse` | hall (hard), office, cell × 2 (hard, basement preferred) | — |
| `archive`, `library` | library × perStorey (hard), office × 1 | — |
| `school`, `college`, `university`, `scriptorium` | hall (hard; not scriptorium), study × perStorey, library × 1 (soft); college and university: dormitory × perStorey (upper) | — |
| `mages_guild`, `academy_of_magic`, `mage_tower` | laboratory × 2, library × 1, study × perStorey; guild and academy: hall; the tower: towerRoom × perStorey as the `tower` named row | — |
| `hospital`, `foundling_home` | ward × perStorey (hard), chapel × 1 (soft), kitchen × 1, office × 1; foundling home: dormitory for ward | — |
| `almshouse` | the ladder's units, chapel × 1 (soft), kitchen × 1 (shared) | — |
| `prison`, `workhouse` | prison: cell × perCapacity (tag tempResidential, perRoom 1), guard room × 2, office; workhouse: dormitory × perStorey, workshop × 2, mess | — |
| `barracks`, `mercenary_hall`, `training_yard` | the `barracks` family row; mercenary hall: hall, mess, armoury | — |
| `watchtower`, `tower_house` | the `tower` named row with guard room × 1 (ground) (watchtower) or hall × 1 (first storey, tower house) | — |
| `market_hall`, `cloth_hall` | the `market-hall` family row | — |
| `cathedral`, `great_temple` | the `cathedral` family row | volume 11's crypt column `always`: the crypt from `Basement.crypt` (A2 (9), V03 §3.7.4), the settlement's largest |
| `church` | nave, chancel / + sacristy / + sacristy, chapel / + sacristy, chapel × 2 | crypt column `basement`: a crypt from `Basement.crypt` exactly where its basement holds one (A2 (9)) |
| `monastery` | the `church` class row in its `church` slot; the cloister slots by the slot rows | — |
| `cemetery` | its chapel slot: the `chapel` class row | no crypt of its own (crypt column `never`); its catacomb is V04's (V04 §3.5.1), whose entrance stair is headed in the chapel's nave (V03 §3.7.2 (6)) |
| `theatre`, `opera_house`, `auction_house`, `adventurers_hall`, `hireling_hall`, `teleport_circle`, `planar_embassy` | hall (hard), store, room (soft); embassy: guest room × 2 | — |
| `conduit_house` | cistern × 1 (hard), store × 1 (soft), office × 1 (soft; pr, r); patterns nave 2, bisect 1 / nave 1 / nave 1 / nave 1; stair by_entrance, ladder; trapdoor; 1/20 | the aqueduct's end house (item 110 (b)); its inlet mark where an aqueduct ends at it (V03 §5.1) |
| `arena` (volume 2's `ovalCourt`) | office × 1 (soft; ground), store × perStorey (soft), cell × 2 (hard; basement preferred), store × 2 (soft; basement); patterns spine 1 everywhere (the ambulatory: the spine corridor along each storeyed ring wing); stair rear (the court side), straight; core; circulation 1/5 at every band; fill store; `seatingExits` true | the seating banks are solid wings (no rooms, V03 §3.4); the arena floor is the composition's court, never a room; the gate halls are volume 2's composer rooms (A2 (11)) with their court arches (V03 §3.6 O1 (b)) |
| `'*'` · `for.use` `stepped_temple` | chapel × 1 (hard; storey top: the sanctuary, alone on the shrine's top storey), sacristy × 1 (soft; belowTop), store × 1 (soft; belowTop); patterns nave 1 everywhere; stair by_entrance, ladder; trapdoor; 0/1; fill none | on a solid stack the shrine is the only storeyed wing, so the sacristy and the store are dropped (tier 0, `shrineOneRoom`); a crypt by volume 11's column (a great temple's `always`), entered by the tomb door (V03 §3.7.1) |
| `'*'` · `for.use` `terraced_palace` | the `manor` class row, with hall × 1 (hard; storey ground, affinity `tier:entrance`), solar × 1 and chamber × perStorey (soft; upper); fill chamber, parlour, store | its tiers joined by S5's chain cores and S6's landing doors |
| `'*'` · `for.use` `tiered_tower` | the `tower` named row (towerRoom × perStorey); stair centre, spiral | one core up every tier it fits (S5 (a)) |
| `golem_works`, `necro_works` | workshop × 2 (hard), laboratory (hard), store | — |

**The village class rows** (V07 §2.4's classes; J-V3.111). Each row is keyed by the class's **`v.`
key** (`for.cls` = `v.<id>`, as V07 §2.4 and V11 §2.9 key them): a village row and V11's town row of the same word are two
keys, so a row here that takes a town row names it. Same resolution (A1): `v.longhouse` — hall × 1 (hard, the unit's
hearth room), byre × 1 (hard; bias `lowEnd`: the downslope end, V07 §2.4's "byre end downslope"), nave 1, bisect 1 / — / —
/ nave 1, by_entrance, ladder, trapdoor, 0/1, unitOneRoom false; `v.farmstead` — the `farm` family row, its barn and byre
by the slot rows; `v.yeoman_house` — the `house` class row, its barn and dovecote by the slot rows; `v.manor_house` — main
slot `hall`: hall × 1 (hard; area 40 / 80 / 250), kitchen × 1 (soft), the chamber block, kitchen, barn, stables and
dovecote by the slot rows; `v.parish_church` — the `church` class row (its west tower a `part:tower` wing, BCR-V3-13);
`v.parsonage` — the `house` class row; `v.tithe_barn` — barn floor × 1 (hard), store × 1 (soft); `v.watermill`,
`v.windmill` — the `mill` named row; `v.smithy`, `v.alehouse`, `v.inn` — the town class-id rows `smithy`, `alehouse`,
`inn`; `v.chapel` — the town `chapel` class row; `v.hovel`, `v.cottage` — the town `hovel` and `cottage` class rows;
`v.bakehouse` (the common oven) — bakehouse × 1 (hard), store × 1 (soft), nave 1 everywhere, by_entrance, ladder,
trapdoor, 1/20, fill store (J-V3.112); `v.shop` (a general dealer with a stall front) — the `shopfront` family row
(J-V3.112).

**A `v.` key without a row of its own** (today `v.reeve_house`, `v.landing`, `v.wood_yard`, `v.charcoal_pit`, `v.potter`,
`v.tannery`, `v.watchtower` and `v.pound`, and any village class added later) reads, at A1 (3), the row named by
the composition key volume 2's `composition.classFamily` gives that `v.` key (V02 §3.10.5, keyed by the `v.` keys):
the template-family row of that name above, else the class row of that name (§2.6's `BuildingClass`, e.g. `manor`,
`cottage`) or the named row of that name, else the slot row of that name (e.g. `barn`, `kitchen`); the row reached is reported at level `family` with
`programmeSource.via` naming the key (V03 §2.3). A composition key that places no building (`yardPart`: `v.pound`, a walled pen)
yields no plan, as no building stands. A key that names no row here falls on to A1 (4), reported with `via`, which T-V3-1
fails. The key-to-row lookup reads volume 2's table at run time and restates none of its cells.

**The vacant programme** (A1, a building with no `use` and no household, item 17): the class row at the plot's
`builtBand` with the as-built unit form's rooms (the ladder row at `builtBand`), and the crypt where `Basement.crypt`
exists (A2 (9)), every room scope `service`, no `unit`, no furniture, labelled by role; `PlanReport.programmeSource.vacant`
set. A ruined or decayed building draws this plan as
V03 §5.1 states.

**The entrance anchors** (`EntranceAnchorRow`, A2 (8)): main → [stair hall (A6 only), gatehall, common room, taproom,
shop, arcade, nave, hall, crossPassage, firstGround]; yard → [kitchen, bakehouse, brewhouse, forge, slaughter room, stable,
byre, store]; service → [kitchen, store, buttery, furnace]; side and rear → [shop, taproom, workshop, store, hall];
concealed → [concealedFirst]. `crossPassage` is the `cross_passage` strip; `firstGround` the first `ProgramRoom` in list
order on the entrance's storey; `concealedFirst` the concealed suite's first room.

The three `'*'` rows are keyed by specialisation (A1 rule (1)): volume 11 carries `stepped_temple`, `terraced_palace`
and `tiered_tower` as specialisation values of the classes whose culture builds in tiers (V11 §3.24.3), not as
class ids, so the specialisation key is the rows' one and final key (J-V3.93). No row names volume 2's `stepped-monument`: a ruin's stepped monument is volume 4's chamber record, not a building, and has no
plan (V02 §3.15.6; J-V3.96).

**The wing affinities** (`WingAffinityRow`, A5 (e)): hall → tier:entrance, main; common room, taproom, shop, arcade → main, range; parlour,
solar, chamber → cross, main, block; kitchen, buttery, bakehouse, brewhouse, furnace, store, staff chamber → service, back,
main; stable, byre, barn floor → service, back, main; gatehall → gate; towerRoom → tower, turret; nave → part:nave, main,
part; chancel → part:chancel, part:apse, main; sacristy → part:chancel, part:transept, main; chapel → part:transept,
part:chapel, cross, main; chapel and nave also → shrine, tier:top ahead of their lists; towerRoom → tower, turret, tier;
any other role → none (the largest remaining piece). A `stair` or other solid wing is never an affinity target (it
reaches no level, V03 §3.4). The crypt has no affinity: its ring is placed by the basement function (V03 §3.7.4), never by A5.

**The sub-location roles** (`SubLocationRoleRow`, A2 (5)): SubLocation tags — bed → guest room, chamber; table →
common room, taproom; counter → shop, taproom; stage → common room, taproom, hall; bath → bath; pickup, deliver → store;
capacities, for a sub-location no tag maps (its largest capacity key) — cap:tempResidential → guest room; cap:leisure →
common room; cap:studying → study; cap:working → workshop; cap:guestWorker → dormitory; SettlementForge tags of a custom
service (item 104 (h) (5); V08 §2.6's tag words) — healing → ward; lodging → guest room; arcane, magic, enchanting,
alchemy → laboratory; legal, law, civic, public_authority → office; education, scholarly → study, library; religious,
church, divine → chapel; food → kitchen; trade, market, economic → shop; craft, metalwork, leather, textile → workshop;
banking → counting room; defense, military, security → guard room; warehouse → store.

**The access hosts** (`AccessHostRow`, V03 §3.7.2 (6)): catacomb with cause `crypt` → crypt (volume 4's crypt join, V04 §3.5.7
(c): the only catacomb head a crypt holds); catacomb (any other cause) → cellar, nave, store (the burial ground's chapel,
V04 §3.5.1 (9)) — never a crypt; sewer, vaults, buried, dug, undercity → cellar, store; cavern, ruin, quarry, mine →
cellar, store, workshop; well → kitchen, store, and the yard entrance's room. A church-class building — one whose class's
crypt column is `always` or `basement` — never hosts a catacomb access of source `system` (V03 §3.7.2 (6)).

**The furniture catalogue** (glyph: shape, w × d cm, placement, clear cm, per room max, weight, tall):
bed (rect 90–140 × 190–200, against, 60, 2, 3, no) · cot (rect 70–80 × 180, against, 50, 2, 2, no) · pallet (rect 70–80
× 170–180, against, 40, 4, 2, no) · chest (rect 50 × 90–120, against, 60, 3, 2, no) · table (rect 80–100 × 120–240, free,
70, 2, 3, no) · stool (round 35, free, 30, 4, 1, no) · bench (rect 30–40 × 120–200, against, 50, 4, 2, no) · shelf (rect
35–40 × 90–180, against, 70, 3, 2, yes) · barrel (round 50–70, corner, 30, 6, 2, no) · crate (rect 50–70 × 50–70, corner,
30, 6, 2, no) · counter (rect 60 × 150–240, against, 90, 1, 3, no) · workbench (rect 70 × 150–200, against, 90, 2, 3, no)
· anvil (rect 40 × 70, free, 90, 1, 3, no) · trough (rect 60 × 150, against, 70, 1, 2, no) · vat (round 120–160, free, 70,
2, 3, yes) · rack (rect 40 × 150, against, 70, 2, 1, yes) · altar (rect 90–120 × 180–240, against, 120, 1, 5, yes) · pew
(rect 50 × 240–400, row, 70, 12, 3, no) · tomb (rect 90 × 210, free, 60, 4, 2, no) · millstone (round 140–180, free, 90,
1, 5, no) · stall (rect 100–150 × 220–260, against, 60, 12, 2, no) · ledger (rect 90 × 200, free, 0, 6, 2, no; drawn flush
with the floor, a burial slab in a church without a crypt, J-V3.44) · brazier (round 60, free, 90, 1, 3, no; an
underground hearth with no flue in reach, V03 §3.12). The hearth is no furniture glyph: it is drawn from
`Room.hearth` (V03 §5.1).

**The work limit** is the plan stage's row of `workLimits.json` (§4.12, whose `WorkUnit` carries `moduleCells`; §5.1
(5)): `{ counter: 'plan.storey'; unit: 'moduleCells'; perUnit: 40; floor: 2 000 }`.

**The register lines of `roomProgram.json`** (J-V3.118). Every
calibratable cell of this volume's tables (registry row 38, V11 §3.1) takes its calibration register entry (V12 §3.11)
from exactly one line below, in V02 §3.10.10's form, `owner` `'V03'`, written by the seat landing the milestone that ships
the cell, in the same change (V03 §8's exit cells); a column no line names takes V12 §3.11's default line, written in that
change by `plat calibrate register --defaults --milestone <id>`, the landing change's id in V12 §2.8's form (M2b and M3a
for PE, `V3-P0` – `V3-P6`; a column first compiled after M-CAL's record takes its layer's later run, `M-CAL/M6-P`,
V12 §3.11). A cell P6 tunes by hand at `V3-P6`, and its hand fallback, is a value moved by its owning seat before its
due (V12 §3.11), recorded by `plat calibrate register --defaults --milestone V3-P6`; rows a later step adds to a column
(P1's band rows) take a rows-added cells row by the same command. `bar.T-V3-35` is volume 12's bar-metric family (V12 §2.1) over this
volume's bar T-V3-35 (V03 §7), registered by the seat landing P1 — the change that writes the first entry naming it — as a V12
`BenchBarDef`: `id` `'T-V3-35'`, `owner` `'V03'`, `statistic` its four clauses in order (unit `share`), `stages` `[]` (the
bar measures plan-rung derivations, which have no StageId; V11 §3.1 row 38's readers are S10b, S11, the three relet
phases and `@plat/hood` beside the plan rung, and V12 §3.7.2 (4) admits no run's cell through the bar, so the lines are
read at the exit only), `towns` B-PLAN's fixtures (`family` `'bplan'`, `perSetting` 1, each setting's
`preset` `'default'`) and B-CITY-lite (`family` `'bcity'`, its lite count per rung, `preset` `'default'`), `tier`
`'milestone'`, `run` T-V3-35's check, every building's plan derived by the `plan` query (V03 §4.6). A clause whose subject is
not yet built reads −1 and is left out of the verdict (clause (iv) before P2's furnishing); no entry naming the bar falls
due before V3-P6.

| cells — one entry each | method, due | metric | when it cannot confirm |
|---|---|---|---|
| every `RoomRoleRow`'s `area` triple (the `room` role's included: measured by T-V3-35 (i) at V3-P6 but never tuned there, since §2.6's capacity reads its minimum from M2b; the column's default entry, written at M2b, restated in place by this line at P1 — V12 §3.11's later-line rule — should M6-P land after M-CAL's record, the restatement ships with a new major version of `roomProgram` (V12 §4.2), the entry `provisional` again), `minWidthCm` and `aspectMax`; the area overrides of the class, named, family, slot, class-id and village rows; `PlanGeometryRow.unitFloorM2` and `.minRoomWidthCm` (shipped at P1) | `measure` at V3-P6 — T-V3-35 (i) and (ii) on B-PLAN and B-CITY-lite after P6's tuning | `bar.T-V3-35` | the default stays, reported: a cell P6 tuned returns to its shipped default in the same change, the entry closes `fallback-applied` and the miss is reported to the owner (V12 §5.5) (the `room` row, never tuned, never moves) |
| the stair cells P1 ships — `stair.goingCm`, `stair.flightCm`, `stair.spiralCm`, `stair.hatchCm` | `measure` at V3-P6 — T-V3-35 (iii) | `bar.T-V3-35` | the default stays, reported |
| the furnishing cells — every `RoomRoleRow`'s `furnish.density` and `furnish.wallBias` (P1), every `FurnitureRow`'s `wCm`, `dCm`, `clearCm`, `perRoomMax` and `weight` (P2), `PlanGeometryRow.furnish.walkwayCm` (P2) | `measure` at V3-P6 — T-V3-35 (iv) | `bar.T-V3-35` | the default stays, reported |
| PE's cells and the capacity's own — `stair.ladder`, `stair.landingCm` and each class and named row's poorest-band `circulation` (§2.6's *One capacity function*, J-A28.28; the capacity's other cell, the `room` role's `area` triple — its min §2.6's `minRoomCm2` — rides its column's entry on the first line above, measured, never tuned) (M2b), `datum.maxSteps`, `stair.riserCm`, `moduleCm`, `door.mainCm` (M3a) | no line here: V12 §3.11's default line, its entries written by the seats landing M2b and M3a (J-V3.118: a retune at V3-P6 would shift the capacity — every shell's household count — the entrance storeys and the outside doors those milestones build) | `frame.roomProgram.<column>` | the default line's: closes `fixed` at M-CAL with "no admissible frame" where no frame's run targets the column |
| every other calibratable cell — the rest of `PlanGeometryRow` (the corridor, door, window, hearth, access, crypt and view cells), `RoomRoleRow.maxDoors` and `.hosts`, the pattern weights, every `circulation` cell but the class and named rows' poorest-band ones (PE's line), `staffSleepIn` and `perRoom` | V12 §3.11's default line (`corpus` at M-CAL), written with each cell's landing | `frame.roomProgram.<column>` | as above; §13.7's item-28 plan soft band keeps its own entry (a threshold, `thr.`), whose fallback steps once the `circulation` cell of a band row other than a class or named row's poorest — never a cell the capacity reads (§13.7's item-28 row) |
| the switches `sunTieBreak` and `exposureAllStoreys` | not calibratable (`ColumnSpec.calibratable: false`, as V11 §3.7.4's `orientEnabled`): no entry | — | — |
| the keys, enumerations and laws — the role names; `RoomRoleRow`'s `scope`, `storey`, `exterior`, `door`, `hearth`, `lit`, `bias` and `furnish.glyphs`; the room lists, count laws and `for` keys of the programme rows; `PatternRow`, `EntranceAnchorRow`, `WingAffinityRow`, `SubLocationRoleRow`, `AccessHostRow`; each `FurnitureRow`'s `glyph`, `shape`, `placement`, `band` and `tall` | not calibratable (keys, enumerations and laws, as V12 §3.11 reads V11's `ColumnSpec`): no entry | — | — |
=== END ===

=== REPLACE ### 2.5 Lifecycle of every new state field ===
### 2.5 Lifecycle of every new state field

One row per field, record or derived piece: how it is created, persisted, regenerated, undone and migrated. Its readers
are V03 §1b's (their one home); the few readers V03 §1b does not list are named after the table. A derived piece (V03 §1b's
*Derived pieces*) is saved as nothing, re-derived at load and after an undo or redo from its restored inputs, and needs no
migration; its row says what moves it.

| field or record | create | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|
| `Storey.furniture`, `FurnitureItem`, `Room.nextFurniture` | F1–F4 (V03 §3.8); an `instance` add on a stored plan | in the elaboration chunk; in the stored plan once any plan event or `instance` stores it (§2.6) | re-derived with the plan on `plan.furnish`; a stored plan's items kept by id; after a carry each is re-snapped or orphaned (V03 §4.3); New random on `plan.furnish` re-places every item not `edited` | the event's undo record keeps the former storey (§7.4's plan-event row) | a document written before M6-P has none: the first derivation fills them; a stored plan without the member gets an empty list and F1–F4 at its next re-cut; a draft's quarter-turn `rotCdeg` reads as the wing frame's angle plus the quarter turn |
| `FurnitureItem.edited` | an `instance` add, move or restyle | with the stored plan | kept | with the storey | absent: not edited |
| `Room.name` | `setAttr plan/rooms/<id>/name` (V03 §4.2) | with the stored plan (the edit stores it) | kept by the room's re-match (V03 §2.2); a room re-cut away passes its name to the kept room that re-matches it, else the name is orphaned and reported | `setAttr`'s inverse | absent: the role's display text |
| an edited `Room.lit` | `setAttr plan/rooms/<id>/lit` | with the stored plan | an edited attribute (§7.2), kept through re-cuts while the room re-matches | inverse | absent: the role's `lit` |
| `Opening.hinge`, `.swing` | O3; `setOpening` with `hinge` or `swing` | with the plan | re-derived by O3 with the opening, unless the opening was edited (a fixed input, V03 §4.3) | with the storey | absent: O3 derives them at first read |
| `Opening.point` | V03 §3.7 (a hatch, a head's floor opening, the crawl hatch) | with the plan | re-derived with its head | with the storey | absent: a wall opening |
| `Opening.steps` | O1 (c) | with the plan | re-derived with the opening | with the storey | absent: level |
| `WindowRec.kind` | W2; `setWindow` with `kind` | with the plan | re-derived by W1–W4 unless edited | with the storey | absent: W2's rule for its wall (a tower's, keep's or basement's wall `slit` or `light`, else `window`) |
| `Chimney.air` | V03 §3.7.2 (4) | with the plan | re-derived with the heads | with the storey | absent: no air access |
| `ProgramRoom.origin`, `.subLocation`, `.anchor.access` | A2, A6, V03 §3.7 | in `Plan.program` | re-derived with the programme | with the plan | absent `origin`: `programme`; absent `subLocation`: none |
| `Plan.heads`, `AccessHead` (the `storey`-null form of V03 §3.7.2 (1) included) | V03 §3.7 | with the plan | re-derived when a hosted access changes (the stale mark, §2.8); a stored plan re-anchors them inside the changing event (V03 §4.3) | with the plan | absent: derived at the next derivation or re-cut |
| `Building.declaredRooms` | `setAttr declaredRooms` (V03 §4.2) | on the building record, in its leaf digest (§2.6) | an edited attribute (§7.2), kept by every re-derivation and re-cut | `setAttr`'s inverse | absent: none |
| `BaseWing.partName` | §2.6's outline builder at S11 from the template's part, passed through by volume 2's M0 (d); every wing writer (volume 2's mutator W-steps, its `setMassing` ops, `removeWing`'s re-joined block, the key re-ordering of BCR-V2-27) keeps it on the wing that keeps its key — a re-joined block keeps the lowest key's; a wing new to the building has none | in `Building.wings` (the leaf digest); the JSON schema's wing record | re-derived with the template whenever S11 re-fits the footprint | restored with the wings by the causing event's undo | a document without it re-derives it at load for every building of a template family — each wing's ring matched to its template's part (the part whose fitted ring equals the wing's on the lattice, else the part overlapping it by more than half, ties by part order), else absent; each absent one reported in the upgrade's fates |
| `Entrance.faces` `tunnel` | the underground stages' entrance derivation (V04; II.7.3, II.7.5) | the entrance record | as every entrance | as every entrance | no older document holds it |
| `roomNumbers` view key | the viewer (V03 §4.5) | view state (§2.9), outside the model hash | — | view keys are not undone (§2.9) | absent: `off` |
| `PlanReport` | every derivation and re-cut; recomputed on demand for a stored plan (V03 §2.3) | in the elaboration chunk only (non-canonical) | replaced with the chunk | nothing canonical | dropped with a stale chunk |
| the tables — `RoomRoleRow`, `FurnitureRow`, `PlanGeometryRow`, `PatternRow`, `EntranceAnchorRow`, `WingAffinityRow`, `SubLocationRoleRow`, `AccessHostRow`; the class, named, family, slot, class-id and village rows; item 110's rows and cells (the `cistern` role, the `'*'` rows, `conduit_house`, `arena`, `seatingExits`, `belowTop`, `exposureAllStoreys`) | the shipped `roomProgram.json`; `editTable` | the recipe's table pins (§2.9) and row operations (§7.6) | an edit of a slice marks every plan citing it stale (`ElaborationRecord.slices`, §2.8) and re-cuts stored ones (§7.3); an edit of `stair.ladder`, `stair.landingCm` or the `room` role's minimum re-runs the capacity rule's re-homing (§2.6) | `editTable`'s inverse | a version bump is §7.5's; the tables arrive with the output version that ships them; a stored plan citing none re-reads them at its next re-cut |
| the plan edits (V03 §4.1's table: tool, events, §7.4 row, undo) | the plan tools, the clerk | the log (§2.9) | kept as edited attributes (§7.2), fixed inputs of the rung's re-derivation | V03 §4.1's undo column | event migration (§7.5) adds nothing: new kinds and parameters only |
| New random on an edited plan (`regenerate` with `rung` `plan`, `plan.layout`, `plan.roles`, `plan.furnish`) | T10 `hold` | the log | the rung's counter advances; edited and locked parts fixed; §5.1 (6)'s comparison on the stored subtree (V03 §4.3) | the event's undo record (the former plan) | — |
| `setAttr(basement)`'s consequences for hosted accesses | V03 §4.2 | the access records (V04) and the plan | the underground layer's per-building rules re-run for this building (V03 §4.2) | one undo step restores the basement, the accesses and the plan | — |
| `Basement.crypt` (`ring`, `edited`) | the basement function at S11 with the basement (its ring, rank and entry V03 §3.7.4), from volume 11's `crypt` column and `cryptM2`, the seed (volume 2's `cryptSeedWings(b)`, else the far third), the principal's area and a dossier crypt record | with `Basement` in the building's leaf digest (§2.6) | re-derived with the basement — at S11, after a `setMassing` commit or a designation mutation (V02 §3.14.5 (c)), after a terrain change (a `basement` class only; an `always` class keeps its crypt unconditionally), and after any change of the principal crypt, its building or its area (every other crypt re-ranked, trimmed or re-grown by V03 §3.7.4 (3), `Basement.ring` never shortened); an `edited` ring is kept as the author's (§7.2), bent only by V03 §3.7.4's crypt-edit dry runs, and reported when the rank no longer holds | the causing event's undo record (the former `Basement`) | a document without the member re-derives it at load for every `always` and `basement` building with a basement; an `always` building with no basement takes the crypt ladder — a one-time shift the owner's rule causes (J111), reported in the upgrade's fates |
| crypt stairs (`StairCore`s of levels [−1, 0]) and choir flights (rooms of role `stair`) | V03 §3.7.6, with the crypt and the chancel's lift | with the plan (a core; a room) | re-derived with the plan from `Basement.crypt` and `floorCm` (V03 §3.3); a stored plan re-anchors them inside the changing event (V03 §4.3) | with the storeys | none: they exist only where a crypt or a lift does |
| `column` faces (crypt and ruin columns) | V03 §3.7.5, V03 §3.12 | with the plan (rooms of role `column`) | re-derived with the crypt ring or the host chamber | with the storey | none |
| `Entrance.storey` | §2.6's `deriveEntrances` at S11 (built at M3a, V03 §8's PE) and at every re-derivation of the entrance set | on the entrance record, in the leaf digest | re-derived with the entrance, and when the outside ground at its vertex (a terrain or `RetainingWall` change beside it), the stack, or the building's basement — its `access`, `kind` or `floors` — changes (§2.6 *Entrances* rule 4); an edited entrance keeps its vertex, its storey re-derived | the causing event's undo record | none needed: built at M3a with the first stacks and walls; a document from before M3a derives 0 at load (T-V3-34), any other value or a dropped secondary entrance listed in the upgrade's fates |
| the level reading, storey heights, `floorCm` (V03 §3.3) | derived per call | never | re-derived with the plan | — | none |
| the crypt's capped bays (V03 §3.7.4 (3)) | derived per call from the step-2 ring, `Basement.crypt.ring` and `Basement.ring` | never (their `undercroft` room persists with a stored plan, re-matched as any room) | with every rank run; re-grown away when the crypt re-grows | the causing event's undo restores `Basement` | none |
| the stair-entered reading (V03 §3.7.4) | derived per call from `ground(b)`, the storeyed ground wings' rings and the crypt's vault | never (the extent it chose persists as `Basement.ring`) | recomputed at each read: a wing change (a `setMassing` commit, a designation mutation) or a change of the crypt's step-2 or edited ring moves it — never a rank event, which moves no vault — and the basement is re-derived with it inside the causing event (the `Basement.crypt` row), which marks the plan stale or re-cuts a stored one | its inputs' undo | none: built with the crypt derivation at M6-U |
| the roof terraces `T(x)` and their walkability (V03 §3.4a) | derived with the plan | never (a stored plan re-derives them at read from its wings and openings) | with the plan | its inputs' undo | none |
| the outside ground per wall and the outside digest (V03 §3.6 W2) | derived per call; the digest in `ElaborationRecord.inputs` | the digest in the non-canonical record (§2.8) | a `RetainingWall`, terrain, levelled-platform datum (the values `levelledGroundCm` returns) or deck change beside the building moves the digest: an unstored plan goes stale, a stored plan is re-cut inside the changing event (V03 §4.3; §7.3) | the causing event's undo | none |
| `basementDoor(b)` and `doorRunPoint` (V03 §3.7.1) | derived per call from eager records | never | recomputed at each read: a `RetainingWall`, terrain, levelled-platform, wing, entrance or basement change (from M6-U `Basement.crypt` among the basement's fields, its vault never moved by the rank) moves it, which marks an unstored plan stale and re-cuts a stored one inside the event (§7.3) | its inputs' undo | none |
| `stackAccessDoor(b, a)` (V03 §3.7.2 (1)) | derived per call from eager records | never (the head's `door` persists with a stored plan) | recomputed at each read: a wing, stack, stair or access change moves it, which marks an unstored plan stale and re-anchors a stored one's head inside the event (§2.8; V03 §4.3) | its inputs' undo | none |
| `StairCore.levels` over a stack; landing doors, terrace exits, terrace and seating doors (V03 §3.3 S5–S6) | S5–S6; `moveStairCore` | with the plan (cores; openings) | re-derived with the plan; a stored plan's re-cut keeps an edited core and re-derives the doors around it (V03 §3.11) | with the storeys | none: they exist only on a stack |
| `Chimney.levels` through overlying tiers (V03 §3.3 H3) | H3 | with the plan | re-derived with the stacks; a `setHearth` or a `tiers` edit re-cuts every storey the stack crosses | with the storeys | a stored plan whose chimney ends under a tier re-derives its `levels` at the next re-cut |
| a crypt-only basement set by `setAttr(basement)` on `basement/crypt/ring` (V03 §4.2) | the edit, by the crypt ladder (the ground wings' whole inset where the ring would not be stair-entered, V03 §3.7.4) | with `Basement` in the leaf digest, `crypt.edited` set | an edited attribute (§7.2), kept through re-derivations; announced on a `never` class | one step: basement, crypt and plan | none |
| a split half's programme (`programmeSource.half`) | at read, from `Use.branchOf` as S10b's split writes it (item 105 (h)) | never (the use is in the leaf digest) | a split or a merge back onto one plot changes `Use.branchOf`, which marks both buildings' plans stale and re-cuts stored ones (§2.8, §7.3) | the causing event's undo restores both uses and both plans | none |
| the rooms a Find match uses (V03 §5.5) | derived per call from the drawn plan and the view key `find` (§2.9) | never (view state, outside the document, its hash and the log) | re-read at every commit, regenerate, undo, advance of time and season change and with the plan's re-derivation (item 120 (f)) | its inputs' undo; the view key is not undone (§2.9) | none |

**Readers beyond V03 §1b's.** The crypt stairs and choir flights are also read by O2, T28-2 and T-V3-23; the stack cores
and their doors by T-V3-28; `FurnitureItem.edited` by New random on `plan.furnish` (V03 §4.3). A crypt draws only in a
plan, never on an unelaborated building; volume 1's opening pass selects by `AccessPoint` fields and reads no crypt field
(V01 §3.7.1), its T-V1-47 being its one reader of `Basement.crypt`.
=== END ===

=== REPLACE ### 3.2 A — the programme ===
### 3.2 A — the programme

**A1 Resolution** (J-V3.26, J-V3.29, J-V3.30). The inputs: the designation template's `programme` key `k` (V11 §3.6.1:
the class id — for a custom institution the class volume 11's resolver gave it, V11 §3.13; for a ladder GUILD or SIZE
record its greater tier's class, V11 §3.12; for a village class its `v.` key, V07 §2.4, V11 §2.9); the building's slot
(`BuildingSlot.role`, §4.7 S11) and whether it is its template's **main slot** (V03 §2.4); the **half** `h` — `shop` when
`Use.branchOf` is set, `works` when another building's use names this use in its `branchOf`, else `both` (item 105 (h));
the occupants' band `b` (`Plot.fieldBand`); the recipe's era `e` (§7.7 layer 1). At every level below, a row whose
`for.era` is `e` wins over the era-less row at the same key (J-V3.78). **The main slot** resolves by the first match of:
1. the class-id row whose `for.use` is `Use.specialisation` (V11 §3.6.2's discrete cell), under `k`, else under `'*'` (a
   specialisation row that spans classes: item 110 (c)'s stepped forms, V03 §2.4);
2. the class-id row (`for.cls` = `k`, no `for.use`);
3. where `h` is not `both` and the row reached by (1)–(2) has no `half` cells, or no row was reached: the family row of
   volume 11's `split.works` or `split.shop` for `k` (by `h`); otherwise the family row of `k`'s `templateFamily` — for a
   `v.` key, which carries none, the row its volume 2 `composition.classFamily` key names (V03 §2.4's village rows),
   reported with `programmeSource.via`;
4. the building-class row of §2.6's `Building.class`;
5. the fallback: the `house` class row when the building houses a household, else the `warehouse` class row.

**Another slot** resolves by V03 §2.4's slot-row order (a slot row under the class id, under the family — for a `v.` key
the family its `composition.classFamily` key names — the generic `'*'` slot row, then the building-class row). A row's
room with `half` other than `both` and other than `h` is dropped. A building with no `use` and no household takes **the
vacant programme** (V03 §2.4). The row reached, its level, the slot, the half, the era and `vacant` go to
`PlanReport.programmeSource`. A concealed use (`Building.concealed`) resolves its own row by the same rule, for A2 (6).
**Band cells**: an authored four-column cell reads poor / modest / prosperous / rich (`squalid` the poor cell,
`comfortable` the modest cell, J-V3.28); continuous cells (areas, `sizeFactor`, `furnish.density`) interpolate linearly
along the field value between the centres of the two bands it lies between (§4.5's centres); discrete cells read §4.5's
discrete-cell rule (a band without a row reads the nearest rowed band below), so they switch at the lower cut of the next
rowed band above. **Pattern precedence**: at a band whose ladder form is `lodging`, `apartment` or `room`, the ladder row's
`circulation.patterns` replace the resolved row's `upper` and `top` cells (the first listed at weight 2, each other at
weight 1); the resolved row governs every other cell.

**A2 Lists.** `ProgramRoom`s are built in the order (1)–(7), (9), (10), (11); (8) runs after A6. Each carries `origin`,
`rule` (its row index in that list), `scope`, `priority`, and the resolved row's cells overriding the role table's
(J-V3.1):
* **(1) Units.** Per household in address order, its unit's rooms at the ladder row's `form` (scope `unit`, hard, origin
  `ladder`). Where the resolved row sets `unitOneRoom`, the unit is one room of role `room` whose area triple is the sum
  of the form's unit-room triples; where it sets `unitHearth: false`, the unit's cooking place carries no hearth (H1
  skips it).
* **(1′) The live-in household** (`Building.dwelling`, §4.7 S10b; J-V3.32): its form is the ladder row's form capped at
  `dwelling` (a richer form becomes `dwelling`: the shell is the use's), its rooms marked `liveIn` for A5 (a).
* **(2) Shared rooms.** The ladder row's `shared` roles that the resolved row's `shared` cell admits (`all`, `none` or a
  role list), scope `shared`, soft, origin `ladder`.
* **(3) Staff rooms** of the owners' unit (the unit at form `house` or `dwelling` whose principal chamber is largest;
  ties by household address), by the ladder row's `staff.count`: `const` n rooms, or one per n **principal chambers** —
  the unit's rooms of role `chamber` or `solar`. Area = `sizeShare` × the target of the owners' principal chamber (the
  unit's largest `chamber`, `solar` or `hall`); scope `service`, soft, origin `staff`.
* **(3b) Workplace sleep-in staff** (J-V3.31): `beds = ⌈workers.max × staffSleepIn⌉`, `workers` from volume 11's
  `BuildingClassRow.staff` at band `b`, `staffSleepIn` from the resolved row (default 0); `beds ≥ 3` gives `dormitory` ×
  `⌈beds ÷ 8⌉`, `beds` 1–2 gives `staff chamber` × `beds`; soft, origin `sleepIn`, storey rule `top` then `upper`. Where
  the template has a `journeymen` slot, its building's slot row holds the dormitory and (3b) adds nothing here.
* **(4) Class and use rooms** of the resolved row at band `b`, half-filtered, origin `programme` (the vacant programme's:
  `vacant`). **A dwelling row's own rooms need the form `house`** (J-V3.104): for a dwelling row — the class rows `house`,
  `cottage`, `row_house` and `manor`, the family rows `dwelling-row`, `dwelling-detached`, `dwelling-compound` and `farm`,
  the village rows `v.yeoman_house`, `v.parsonage` and `v.manor_house` (and `v.cottage`, `v.hovel` through the class rows
  they take), and every slot row that takes one of them — the row's own rooms apply only where the interior-ladder row's
  form at band `b` is `house`; at any other form the units of (1) and the shared rooms of (2) replace them, as volume 2's
  `rooms` rung withholds the hall and chapel (V02 §3.8, J-V2.36), and the row's `fill` still runs. Every other row (an
  institution's, the `'*'` specialisation rows included) keeps its own rooms at every band. Count laws per §10.2:
  `const`, `perHousehold`, `perStorey` (one per storey the room's storey rule admits), `perCapacity` (the named capacity
  summed over the building's sub-locations, ÷ the row's `perRoom`, rounded up — guest room 2, dormitory 8, cell 1 by
  default), `perSubLocation`. A fractional count draws once on `plan.program` (V03 §3.10).
* **(5) Sub-locations** (J-V3.74). Per `SubLocation` in id order, its keys are its tags in order, then `cap:` + its
  largest capacity key (ties in the order leisure, tempResidential, guestWorker, studying, working); the roles are those
  of `SubLocationRoleRow` for the first key that has a row. It is hosted by the first room of (4), in list order, whose
  role is among them and whose hosted count is below its role's `hosts`; else it adds a `ProgramRoom` of the first mapped
  role (soft, origin `subLocation`); `store` only when no key maps (reported). A2 writes `ProgramRoom.subLocation`; P5
  copies it to `Room.subLocation`. A custom service inside its provider (item 104 (h) (5)) arrives as such a sub-location
  with its SettlementForge tags.
* **(6) Concealed rooms.** Per concealed use in id order: the rooms of its resolved row marked `concealed` (§10.2's
  `RoomRuleRow.concealed`); where the row marks none, `back room` × 1 (hard) and `strongroom` × 1 (soft, `basement`
  preferred where the building has a basement). Each is flagged `concealed`, scope `service`, origin `concealed`.
* **(7) Declared rooms** (J-V3.58). `Building.declaredRooms` in list order: `role × count`, hard, origin `declared`,
  storey rule the declared `storey` (that exact level) where given, else the role's; scope the role's.
* **(9) The crypt.** Exactly when `Basement.crypt` exists (V03 §3.7.4): `crypt` × 1, hard, storey −1, area its ring,
  origin `crypt` — whatever the class, band or vacancy; where the rank has capped it (V03 §3.7.4 (3)), `undercroft` × 1
  as well — hard, storey −1, area the capped bays' ring, origin `crypt`, `rule` 1.
* **(10) Access host rooms.** Per hosted access (V03 §3.7.2) whose host roles (V03 §3.7.2 (6)) name no room of the lists
  above on the head's storey class: a `cellar` (a basement head) or `store` (a ground head) at its min area, hard, origin
  `access` — none for a head of `storey` null, which has no host room, and none on a crypt-only basement, whose heads
  V03 §3.7.2 (6) hosts in its undercroft or crypt (J-V3.119).
* **(11) Composer rooms.** Each `Composition.rooms` room (volume 2's `hall`, `gatehall`, `chapel`, `towerRoom`) takes the
  first unmatched `ProgramRoom` of its role on its storey (its area becomes the ring's); a composer room that matches none
  adds a `ProgramRoom` of its role (hard, area its ring, origin `composer`). **A composer room the composer omitted**
  (V02 §3.13 F-COMPOSE (3); J-V3.106) is placed here: a composed wing of role `gate` holding no `gatehall` room of
  `Composition.rooms` adds a `ProgramRoom` `gatehall` (hard, origin `composer`, `rule` −1, `wing` that wing's key) whose
  fixed ring E2 lays across the wing from eave side to eave side, as wide as the lower bound of volume 2's
  `CompositionRow.rooms.gateHallM` at the occupants' band, centred on the main entrance's offset (else the wing's
  midpoint), clipped to its seed piece and moved along the wing on the module until it keeps `minEdge` (§3.4) from every
  side it does not share — with no lawful position, an area target of the role's gatehouse triple allocated to that wing
  (reported `composerRoom`, tier 2); a composed tower missing its `towerRoom` on a storey it reaches adds a `towerRoom`
  there (hard, origin `composer`, `rule` −1, `wing` the tower's key, area its tower's seed piece on that storey, a ring
  role). So the court keeps O1 (b)'s arches and T28-2's reach with or without the composer's ring.
* **(8) Entrance anchors** (after A5 and A6; J-V3.75). Per entrance in ordinal order whose `storey` is not null (a solid
  stack's main entrance opens nothing and S6's root landing door takes its place, with that door's storey), the first
  `ProgramRoom` on the entrance's storey, not already anchoring an entrance, whose role is in the entrance's
  `EntranceAnchorRow` list, in list order, takes `anchor.entrance` (`crossPassage` is resolved at the cut: the anchor
  passes to the cross-passage strip where that pattern is drawn, else to the next list entry; `firstGround` the first
  `ProgramRoom` in list order on the entrance's storey; `concealedFirst` the concealed suite's first room). A room
  anchors one entrance only, unless two entrances' inward points fall in one seed piece. With no candidate, a `stair
  hall` of its min area is added (circulation, hard, origin `entrance`). Every fall is reported in `PlanReport.anchors`.

**A3 Sizes.** A room's `areaM2` = its role's triple (or the resolved row's override) × the ladder row's `sizeFactor` at
the value; a ring role takes its ring's area as min, target and max. **The unit floor** (J-V3.40): where the sum of a
unit's targets falls below `PlanGeometryRow.unitFloorM2` of its form, every room of the unit is scaled by that floor ÷
the sum (min, target and max together). Provenance of the floor and of the `room` role's 9 m²: own, general historical
knowledge, not corpus-witnessed (item 104 (f)'s wording). Their calibration entries are V03 §2.4's register lines: the
floor measured and tunable at V3-P6; the `room` role's area measured there and never tuned, since §2.6's capacity reads
its minimum from M2b.

**A4 Storey capacities.** For storey `s`: `cap(s) = area(pieces(s)) − Σ fixed rings on s − circulation(s)` in `area2`;
the fixed rings are those of V03 §3.1 step 2 (the stacks are subtracted when A5 (c) places them); `circulation(s) =
area(pieces(s)) × num ÷ den` of the resolved row's circulation cell (integers; the ring of A6 counts inside it), at
least one landing (`landingCm` × the core's flight width) on every storey the core serves above its first. The crypt's
piece is outside `cap(−1)`: it holds the crypt alone.

**A5 Allocation** (deterministic; no draw). A storey is **claimed** by the use when a hard non-unit room of the resolved
row has that storey class (a shop's or a forge's ground storey).
* **(a) Units first** (F-PLAN tier 0; J-V3.33). A `house` unit takes every storey above the basement. `dwelling` units
  take whole storeys in address order from the lowest unclaimed storey up — one storey each where storeys ≥ units; else
  split by wing (units to wings in key order) where wings ≥ units; else side by side on one storey around a lobby 
  (V03 §3.5's `lodgings`). The **live-in** unit takes the lowest storey above the use's hard rooms with capacity, spilling
  upward ("quarters above"); with no upper storey it stays on the ground storey marked `farFromEntrance` (V03 §3.5's
  assignment). `lodging`, `apartment` and `room` units pack first-fit from the top storey down (the poorest highest,
  J-V3.2), `perStorey(s) = ⌊cap(s) ÷ unitArea⌋` with `unitArea` the sum of the form's targets, falling to the next
  poorer form (tier 0) until every household fits. A claimed storey is tried last in every rule. When even `room` does
  not fit, the no-abort ladder runs (V03 §3.9).
* **(b) Hard non-unit rooms** by storey rule: `ground` (level 0: the lowest storeyed level), `top` (the highest storeyed
  level), `basement` (storey −1), `upper` (the lowest storey above level 0 with capacity), `notBasement`, `any` and
  `belowTop` (the storey with the most capacity left among those the rule admits, ties lower), a declared room's exact
  level. A room whose rule admits no storey the building has is `dropped` (soft, tier 0) or delivered by tier 5 (hard) —
  on a building with no storeyed wing (V03 §3.1 step 2) it is `dropped`, hard or soft, with no tier, under the
  information `solidMonument`, and listed in `PlanReport.owed` with no `tier` (V03 §2.3; T28-1's exception, §13.2). A
  shortfall runs the ladder's step (ii).
* **(c) Hearths first among the wings.** Every allocated room that needs a hearth (H1) takes its wing now by (e)'s rules;
  then H1–H3 place the stacks (V03 §3.3) and `cap(s)` of every storey a stack crosses falls by its ring.
* **(d) Soft rooms** by priority then list order. Staff rooms by the ladder's `staff.placement` in order (`attic`: the
  top storey; `basement`; `service`: a storey holding a wing of role `service` or `back`, BCR-V2-01), never on a storey
  that holds the owners' principal rooms while another allowed storey has capacity (J-A28.27); sleep-in staff (3b) the
  top storey, then the upper storeys downward; every other soft room onto the storey its rule allows with the most
  capacity left (ties lower). A soft room that fits nowhere is `dropped` (tier 0, reported); the unit's hearth room never
  (it falls with its form). A storey class whose only positive-weight pattern is `nave` holds one target per seed piece:
  its soft non-anchored extras go to another storey with capacity, in level order, before V03 §3.5's strips.
* **(e) Wing choice inside a storey** (J-V3.76, J-V3.77), first rule that decides: (1) an anchor names the wing (an
  entrance's inward point, a stack, the core's bay, an access head, a composer room); (2) adjacency
  (`RoomRuleRow.adjacency`, hard): `direct` or `corridor` — the partner's wing; `under` — the room moves to the storey
  below its target's, under it; `to: 'core'` — the core's wing (the shared kitchen "by the stair core", §2.6);
  `to: 'entrance:main'` or `'entrance:yard'` — the wing holding that entrance; (3) a concealed room — the wing of the
  concealed entrance where one exists, else the wing holding the use's service rooms; (4) a `farFromEntrance` target —
  the wing farthest from the main entrance's inward point; (5) `WingAffinityRow`: the first wing role of its list that
  the storey has with capacity left (`part:<name>` a wing carrying that template part name, §2.6); (6) the wing piece with
  the largest remaining area. Ties by wing key.
* **(f) Fill** (J-V3.39). Per storey in level order, while its spare capacity is at least the smallest target of the
  resolved row's `fill` list, fill rooms are added cycling through the list, each at its target (soft, origin `fill`); a
  fill room is scope `unit` of the storey's household where every unit room on that storey belongs to one household,
  else `service`. After the cut a piece above its role's max keeps it (`oversize`, reported), never split below a min.

Output: per storey and wing piece, an ordered list of targets.

**A6 Shared access** (J-V3.34). After A5, when the building houses two or more units, a live-in unit, or any unit with
no room on the main entrance's storey (`Entrance.storey`; on a solid stack the root landing door's, S6): one `stair
hall` `ProgramRoom` (circulation, hard, origin `sharedAccess`, that storey, `anchor.entrance` = the main ordinal). Its
area counts inside `circulation(s)` (A4), so nothing is re-allocated; it is cut first on its storey (V03 §3.5 step 0).
=== END ===

=== REPLACE ### 3.4 Seed pieces per storey ===
### 3.4 Seed pieces per storey

Per §2.6 steps 1 and 4: the extents of the wings reaching the storey (the levels of volume 2's `storeyRange`, a solid
wing none — V03 §3.3's level reading; §2.6's fourth rung), clipped to tile by `tileRings` in the clip order, the span
rings at the ground storey, `Basement.ring` below — on storey −1 with the crypt's ring (V03 §3.7.4) cut out as its own
piece and its capped bays as another — opened with the fixed rings of V03 §3.3 and V03 §3.7 on one transient arena per
storey. The work limit is V03 §2.4's work-limit row (§4.12's `WorkUnit` `moduleCells` = Σ piece area ÷ `moduleCm²`).
Storeys are exactly the levels `storeyRange` gives each wing — for a wing on the ground its `Heights.floors` (J-V3.23):
an attic is a storey only where `floors` counts it, its rooms then taking the `top` rule. A stacked wing's extent lies
inside the wing it stands on (V02 §3.15.1 ST6), and at its own levels the lower wing reaches nothing, so the clip order
meets no contained stacked wing: each tier's storeys are cut on its own extent. A storey of one seed piece holding one
target is that room, cut by nothing; a seed piece the kernel refuses (zero area, below `minEdge`, non-simple after the
clip — `E_DEGENERATE` with detail `seed`, or `overlap` for a piece left with a hole, §3.4) is left out of its storey and its targets go to the
storey's other pieces by A5 and the no-abort ladder (V03 §3.9), reported, never a whole-map retry (§5.1; T-V3-36 (b)).
=== END ===

=== REPLACE ### 3.7 Basements, the crypt and the heads of the ways down ===
### 3.7 Basements, the crypt and the heads of the ways down

**3.7.1 The basement storey.** Storeys −1 … −k are cut like any storey on `Basement.ring` (seed), storey −1 less the
crypt's piece and its capped bays' piece (V03 §3.7.4, V03 §3.7.5), with the core's bay where `Basement.access` is `core`.
Their rooms are A5's basement allocation — `cellar`, `store`, `undercroft` (scope `service`), a concealed use's
`strongroom` (`service`, concealed), the host rooms of A2 (10) — and, with nothing allocated, one `cellar` (`nave`). The
crypt (`service`) is its own piece (V03 §3.7.5). **Access** follows §2.6 step 3 (`core`, `trapdoor`, `external` with its
door at `basementDoor(b)`, below). An access or basement change marks the rung stale (§2.8's `plan` inputs).
* **Where a core joins it** (J-V3.88). A core joins the basement only where `ground(b)` exists and the core's wing stands
  on the ground and reaches level 0; its bay then lies inside the part of `Basement.ring` under a storeyed ground wing
  (J-A29.25), else §2.6 step 3's trapdoor fallback lies in that part — in either case outside the vault of a
  stair-entered crypt (V03 §3.7.4), which O2 closes to the rest of the basement; a crypt-only basement's cores are its
  crypt stairs (V03 §3.7.6). A building with a solid ground wing beside a storeyed one (the arena's seating beside its
  ring, a stepped temple with a storeyed annex) is joined so, never forced outside.
* **The walk-out at a retaining wall** (item 110 (a); §2.6 *Basements*). Where a footprint side lies on or within
  `cellar.insetCm` of a `RetainingWall`'s high side whose step there is at least half the cellar depth, S11's basement
  decision takes the walk-out form (`Basement.access` `external`) and its outside door opens on that side, onto the lower
  terrace, by `basementDoor(b)`'s rule 1 below; W2 gives that face its `light` windows. Volume 2 keeps a building off a
  wall by its template's setback (V02 §3.17 (a)), so the rule fires where that setback is below `cellar.insetCm` — a row
  built against the terrace's edge. It is built at M3a with the retaining walls (V03 §8's PE).
* **The door run — `doorRunPoint`** (one helper for both outside doors; E-29). Stated once, used by `basementDoor(b)`
  below and `stackAccessDoor(b, a)` (V03 §3.7.2 (1)), each keeping its own rules:
  ```ts
  declare function doorRunPoint(run: [PointCm, PointCm], target: PointCm,
    admit: (span: [PointCm, PointCm]) => boolean): PointCm | null;
  ```
  A **door run** is a straight stretch of a ring side at least two `moduleCm` long (a door's width, §2.6 step 3).
  `doorRunPoint` returns the point of the run nearest `target` — ties toward the run's first vertex — whose **span** (two
  `moduleCm` along the run, centred on the point) lies within the run and passes `admit`; with none, `null`. It is pure,
  draws nothing, reads no plan, and lives in `@plat/plots` beside its two callers.
* **The outside door — `basementDoor(b)`** (J-V3.114, J-V3.115, J-V3.125). Where an `external` basement's outside door
  opens is stated once, here, as a pure function of eager records:
  ```ts
  declare function basementDoor(doc: Document, key: PlatKey, b: Building): { side: number /* the index of a Basement.ring side */; at: PointCm /* the door's centre on that side */ } | null;
  ```
  Written `basementDoor(b)` in prose, it is called on the building's own document and arena key — the key its plot lies
  on — which reach the `RetainingWall`s and `levelledGroundCm(doc, key, p)`. It reads `Basement.ring` and `.access`, from
  M6-U the crypt's vault (V03 §3.7.4), the `Entrance` records, the wings (`ground(b)` by V03 §3.3's level reading, the
  stair wings' rings and stair 0's approach, volume 2's `stairChain`), the `RetainingWall`s with §2.7's
  `stepProfile(wall)` (file f item 245) and `levelledGroundCm(doc, key, p)` (§4.7 S10, S11), and the cells `moduleCm`,
  `door.mainCm`, `cellar.insetCm` and `cellar.depthCm`; it draws nothing and reads no plan, is implemented in
  `@plat/plots` beside `facadeBays` and re-exported by `@plat/buildings` (§14), and is built with the eager facts at M3a
  (V03 §8's PE), so the plan rung's step 3 (§2.6), volume 1's entrance reserve (V01 §3.8.2 step 5), T28-3 and the exports
  read one door without elaborating anything. It is `null` unless `Basement.access` is `external`; otherwise the first of
  these rules that gives a side wins, over the **door sides** — the sides of `Basement.ring` that are door runs — each
  read at its **door point** `doorRunPoint(side, the side's midpoint, admit)`: `admit` accepts every span, so the door
  point is the midpoint, except on a building with `Basement.crypt` and `ground(b)` — a church, whose crypt is entered
  from the church above by its crypt stairs (V03 §3.7.6), never from the street, or a crypt beside a storeyed wing but
  under none, entered through O2's crypt join from a basement room — where `admit` accepts only a span sharing no length
  with the crypt's vault (V03 §3.7.4), which no event at another church moves; a side whose door point is `null` is no
  door side. `Basement.crypt` exists from M6-U (§2.6); before it every door point is a midpoint. The rules:
  1. **The wall walk-out.** The door sides whose door point lies within `2 × cellar.insetCm` of a `RetainingWall`'s high
     side whose step there — `stepProfile(wall)` at the chain point nearest the door point — is at least `cellar.depthCm
     ÷ 2` (the ring lies `cellar.insetCm` inside the ground wings, so this is the basement decision's footprint test moved
     onto the ring): the one with the largest step, ties by the nearer wall, then by ring index; `at` its door point.
     Where the test — read at the midpoint of a side that is no door side — holds only for sides that are no door sides
     (shorter than a door run, or, on a church, with no door point off its crypt's vault), the result is `null` while
     `ground(b)` exists — §2.6 step 3's `trapdoor` fallback, reported (V03 §3.9) — and never a door on a side away from
     the wall; without `ground(b)` rule 2 follows.
  2. **The tomb door**, where `ground(b)` is absent (no storeyed ground wing: the one condition under which §2.6's
     *Basements* makes the access `external` for a stack, BCR-V2-33): an outside stair down to a door at the basement's
     floor in the face of a ground-standing wing on the main entrance's side, on the door side nearest that face, outside
     every stair wing's ring and stair 0's approach, `at` = `doorRunPoint(that side, the main entrance's point, every
     span)` — the side's point nearest the main entrance at which the door's width lies within it (reported `tombDoor`).
     A crypt inside a solid tier 0 is entered by the same door at its own floor. The tomb door is the basement's root
     (T28-2's `external` clause).
  3. **The fall walk-out.** The door side whose outside ground is lowest — `levelledGroundCm` at the point
     `cellar.insetCm + door.mainCm` outward from the side's door point along its outward normal (the point W2 samples for
     the wall above it, V03 §3.6, where the door point is the midpoint), read on a `RetainingWall`'s far side where the
     point lies across one — ties by ring index; `at` its door point.

  **A drop no step reaches** (J-V3.131): a door side whose outside ground — rule 1's lower terrace at the wall, rule 3's
  sample — lies more than `datum.maxSteps × riserCm` below the basement's floor (a cliff's edge, a wall taller than the
  cellar is deep) is no door side for rules 1 and 3, so no door opens into the air (rule 1 then gives `null` as it
  states; rule 3 takes the lowest remaining side).
  With no door side at all the result is `null` (§2.6 step 3's `trapdoor` fallback, reported; V03 §3.9). The plan opens
  the door — an `Opening` of kind `door` of `door.entranceCm` on storey −1's wall along `side`, centred at `at` — with the
  base's outside stair (step 3); whichever rule places it, the door is the root of the basement's storeys (O2's basement
  root; §2.6 step 5). Every input is eager, so a `RetainingWall`, terrain, levelling, wing, entrance or basement change —
  the crypt's vault among the basement's, from M6-U — moves the door and marks the plan stale through the outside digest
  (§2.8) or the basement's own change.

**3.7.2 Access heads** (J-V3.49, J-V3.50). Every `AccessPoint` in `BuildingInput.accesses` — every access whose
`ground.host` is this building or its basement, whatever its source (`neighbourhood`, `basement`, `system`, `lifeline`,
`edit`, and volume 4's `dig`, `opening`, `overlap`, `crypt`, `dossier`) or cause (V04 §2.2; §2.6 step 1) — gets exactly
one head, in access-id order, placed before any cut:
0. **Decks** (item 110 (d); J-V3.92). A building on a deck — `onDeck(b)`: exactly the buildings volume 2's deck gate
   (BCR-V2-34) denies a cellar, a placed landmark at a mole's head or mid-mole included (J-V2.68; a quay on the bank
   excepted by volume 2's `DeckContext.surfaceCm` null, V02 §2.6) — hosts no head and no well. An access volume 4 hands
   one anyway is headed as a `hatch` on level 0 and reported `W_DECK_ACCESS`; a well pin there stays volume 4's,
   unheaded (reported).
1. **Storey.** A `stair`, `cellar_stair`, `ladder`, `hatch`, `shaft` or `door` heads on the building's lowest storey (the
   deepest basement storey, else level 0 where `ground(b)` exists); with neither — a solid stack without a basement — the
   head is an outside door in the face of a ground-standing wing, its descent inside the mass the access's own stairwell
   (volume 4's), reported `W_STACK_ACCESS`: a head of `storey` null, with no room and no `Opening`, whose `door` 
   (§2.6's `AccessHead`) is `stackAccessDoor(b, a)` below — the one point volume 1's entrance reserve reads (V01 §3.8.2 step 5) — drawn
   `door.entranceCm` wide at its `at` (V03 §5.1).
   **`stackAccessDoor(b, a)`** (J-V3.120) states that door once, as a pure function of eager records:
   ```ts
   declare function stackAccessDoor(b: Building, a: AccessPoint): { wing: number /* BaseWing.key */; side: number /* that wing's ring side */; at: PointCm; fallback?: true } | null;
   ```
   It is `null` unless the building has no basement and `ground(b)` is absent (V03 §3.3) — the only buildings whose heads
   take this form — and otherwise reads only the wings (`on`, `solid`, `role`, their rings), volume 2's `stairChain`
   (stair 0, and its approach strip as V02 §4.6 bounds it: none under the stair form `none`), `a.ground.at` and the cell
   `moduleCm`; it draws nothing and reads no plan, is implemented in `@plat/plots` beside `basementDoor(b)` and
   re-exported by `@plat/buildings`, and is built with the eager facts at M3a (V03 §8's PE), so volume 1's entrance
   reserve (M5) reads it before any plan exists. Terms: the building's **outline** is the edge of the area its
   ground-standing wings (the wings without `on`) cover together; a **door part** is a maximal stretch of a wing's ring
   side lying on that outline that is a door run (V03 §3.7.1); a point of a door part is **admissible** where
   `doorRunPoint` would accept it with `admit` = the span lying at least one `moduleCm` from stair 0's approach strip (so
   the point lies at least one `moduleCm` from each end of its part).
   * **The wing** — among the ground-standing wings whose `role` is not `stair` and that hold an admissible point, the one
     whose ring, as a region, lies nearest `a.ground.at` (0 where it holds the point; ties by key).
   * **The side** — among that wing's ring sides holding an admissible point, the one whose admissible points lie nearest
     `a.ground.at` (ties by side index).
   * **`at`** — the nearest to `a.ground.at` of `doorRunPoint(part, a.ground.at, admit)` over the side's door parts (ties
     toward the side's first vertex): `a.ground.at`'s projection onto the side, moved along it by the least distance that
     makes it admissible.
   * **The fallback** — with no admissible point on any non-stair ground-standing wing: the midpoint of the outline side
     nearest `a.ground.at` among every ground-standing wing's ring sides, stair 0's included (ties by wing key, then side
     index), `fallback` set; the plan reports it `W_STACK_ACCESS` with the note `door fallback` (V03 §3.9).
   The head's `door` takes the result's `wing`, `side` and `at`; `distCm` (5) is measured to that `at`. Every input is
   eager, so a wing, stack or stair change moves the door, and the access's change or the building's re-derivation marks
   the plan stale (§2.8). A `well` heads on level 0 where `ground(b)` exists (water is drawn from above), else it stays
   volume 4's pin, unheaded (reported). A crypt join (cause `crypt`) heads on storey −1 in the crypt; any other kind a
   building hosts (a `sinkhole`, `collapsed_shaft`, `ruin_entrance` under a footprint) is headed as a `hatch` (on a
   building with neither a basement nor `ground(b)`, as the outside door above), reported.
2. **Form.** `stair` and `cellar_stair`: the bay of one flight — S1 at the access's drop where the drop is at most the
   head storey's height (the basement's `cellar.depthCm`, else level 0's `storeyCm`), else S1 at that height, trying
   `straight`, `dogleg`, `winder`, `spiral` in S4's order; the rest of the descent is the access's own stairwell below
   the floor, the underground part's (volume 4), never cut into the plan. `ladder`: the ladder bay. `hatch`: an `Opening`
   of kind `trapdoor` with `point` over a ladder bay. `door`: an `Opening` of kind `door` on the head storey's wall segment
   nearest the element, at the point nearest it. `shaft`: a square of `access.shaftCm` with a ladder in it. `well`: a
   disc of `access.wellCm` (its parapet included) as a 16-gon on the lattice, like the spiral's.
3. **Through-rings.** A `well`'s or a `shaft`'s ring is a fixed ring on every storey from its head down to the lowest
   basement storey, a face of role `shaft` (never allocated, furnished or entered but at its head).
4. **Air.** An access of role `air` the building hosts (volume 4's L1 air shaft through a building) rides the chimney
   stack nearest `ground.at` within `access.snapCm`: `Chimney.air` names it and the stack's `levels` extend down to the
   lowest storey. With no stack in reach, a hearthless stack from the lowest storey to the roof is placed by H2 (b)–(d)
   (drawn on the roof as a stack, §8.6), reported. On a building with neither a basement nor `ground(b)`, which has no
   storey to carry a stack from, it takes (1)'s outside-door form — a vent in the foot — `storey` null.
5. **Position.** Candidates on the module ranked by distance from `ground.at` — a stair's bay against a wall of its piece
   as S2 requires; a shaft, well or hatch anywhere in the piece keeping `minEdge` — excluding clearance squares, aprons,
   the core's bay, the crypt's columns and other heads. The first candidate within `access.snapCm` of `ground.at` is
   taken, else the nearest, reported in `PlanReport.anchors` with its distance (`AccessHead.distCm`); a head of `storey`
   null takes (1)'s door point instead, `distCm` measured to `door.at`. The head is the drawn position at the building
   band; the underground part keeps `ground.at`; the two scenes link by the access id (V03 §5.3).
6. **Host room.** The head's room is the first role, in the order of the `AccessHostRow` for the reached element's system
   kind and the access's cause (a row with the cause wins over the row without one), that is present on the head's
   storey; the `ProgramRoom` holding it takes `anchor.access`, and with none present A2 (10) has added one; a head of
   `storey` null has no host room. **On a crypt-only basement** — storey −1 the crypt's and its capped bays' pieces alone
   (A4, V03 §3.7.5), with no cellar or store and no room to cut one — a head whose reach is not a catacomb lies in the
   capped bays' `undercroft` where one exists, else in the crypt itself (an access broken into the vault), reported in
   `PlanReport.anchors` (`kind: 'access'`, tier 2, note `crypt host`; J-V3.119). A crypt join (cause `crypt`, volume 4's
   U-ACCESS (c)) is the only catacomb head a crypt holds; any other catacomb head — the burial ground's chapel stair,
   V04 §3.5.1 (9) — lies in a cellar, the chapel's nave or a store. **A church-class building** (its class's crypt column
   `always` or `basement`, V03 §3.7.4; J-V3.73) never hosts a catacomb access of source `system`: should volume 4 hand
   one, the plan heads it in a store, reports `W_CHURCH_CATACOMB_HEAD`, and T-V3-23 (d) fails the fixture.
7. **Opening and state.** The head's opening enters it from its host room (kind `open` for a stair or ladder bay, the
   hatch's `trapdoor`, the door itself), outside the host's `maxDoors`, as a core's is; a head of `storey` null has no
   `Opening` — its door is its `door` (1), on no storey's wall. The access's state as II.7.4 reads it — the stored
   `state`, or, while its element is closed (II.6), the derived reading (`bricked` while the element is sealed;
   `collapsed` while it is partly caved in or collapsed) — is drawn and exported (V03 §5.1, V03 §5.3): `open` as drawn;
   `locked` a closed, locked door or hatch; `bricked` the opening drawn as wall with a bricking hatch and left out of
   every portal; `collapsed` the opening drawn as a trace with rubble stipple (§8.2's access row, as V01 §3.8.8 draws the
   surface symbol) and left out of every portal. The reading is taken at draw and export time from the access record and
   its element's closure, never stored on the head, so a closure change (II.6's conversions, volume 6's epochs) redraws
   the head's storey (its `DisplayDelta`, V03 §5.1) without re-cutting the plan.

**3.7.3 A secret head** (J-V3.51). A head whose access's `knownTo` is `secret` gets, before the storey's cut, its own
concealed room: a fixed ring of role `back room`, of area the role's min × the ladder row's `sizeFactor` and at least the
head's ring plus `landingCm` in front of it, against the head storey's wall nearest the element (the head placed inside
it by V03 §3.7.2 (5) within that ring). The room is `concealed` (scope `service`); the rest of the storey — the public
cellar with its core or trapdoor — keeps its scope and no concealed flag. The room is joined by one concealed opening to
the cellar, or to the concealed suite where the building has one on that storey (O6). A `local` or `public` head stays in
its host room. The same holds for a secret head on a ground storey (a hovel's hidden shaft).

**3.7.4 The crypt — derived with the basement, never by the plan** (item 109 (k) (2), (6) as revised ~20:05, J111;
J-V3.45, J-V3.48). §2.6's basement function derives `Basement.crypt` with the basement, from volume 11's three-valued
`crypt` column (BCR-V11-13):
* **`always`** — volume 11's `cathedral` and `great_temple`, and any building a dossier crypt record binds to (volume 4's
  dossier row set, V04 §2.3a). The basement is taken by the **no-refusal crypt ladder** — `full`, then `half`, then
  `raised` (V02 §3.14.5 (d), `Basement.kind 'raised'`; on a sky island volume 5's rim-slab vault, V05 §3.10 (5), planned
  here as the `full` form) — in place of the class probability and of the terrain gate's no-cellar rows. Where the
  class's ordinary cellar draw also gives a basement, the crypt lies inside it; otherwise, where the crypt is
  stair-entered or `ground(b)` is absent (below), the basement is **crypt-only**: `Basement.ring` is the crypt's ring,
  `floors` 1, and `Basement.access` is `core`, its cores being the crypt stairs (V03 §3.7.6), so T28-3 holds — `external`,
  by its outside door at `basementDoor(b)` (the tomb door, or a wall walk-out's door), where `ground(b)` is absent 
  (V03 §3.7.1; a great temple built as a solid stack, whose seed wing is its tier 0, V02 §3.15.3). Where `ground(b)` exists
  but the crypt would not be stair-entered, the basement is never crypt-only: it takes the region whole (§2.6's inset of
  the ground wings), the crypt inside it, `floors` 1, its access the programme row's (§2.6 step 3; `external` only for a
  walk-out), so the core the storeyed wing brings, or the trapdoor fallback, lands in the part under that wing 
  (V03 §3.7.1's *Where a core joins it*) — an outside door, where a walk-out makes the access `external`, lying off the vault
  (V03 §3.7.1) — and O2's crypt join enters the crypt (J-V3.127). On the `raised` rung volume 2 lifts every ground wing
  over that whole inset, the storeyed wing with the seed wings, so its ground storey clears the basement by
  `crypt.clearCm` as a raised choir clears its crypt and its core reaches the basement beside the crypt; a solid tier 0
  holding the crypt inside it keeps its height (V02 §3.14.5 (d); J-V3.128). An author's crypt ring on a building without
  a basement makes a basement by the same ladder — crypt-only, or the ground wings' whole inset where that ring would not
  be stair-entered (V03 §4.2).
* **`basement`** — the base decision applies unchanged; a `full`, `half` or `walkout` basement holds a crypt, a crawl
  space none (volume 11's religious cellar rows are then the crypt's chance).
* **`never`** — no crypt.

**On wet ground** — where §2.6's terrain gate gives no cellar — an `always` class's ladder reaches its `raised` rung: the
crypt under a raised choir, entered from the nave (V03 §3.7.6 (b)); any other church has no crypt, its burials marked by
flush `ledger` slabs in the chancel floor (V03 §3.8; J-V3.44), with no crypt of any other form. V09 §4.17.5 and V10 §3.9a
word both.

The **ring** is derived in three steps, all on the lattice and in `area2`:
1. **Seed.** The part of the basement's region (`Basement.ring`; for a crypt-only basement, the ring the basement would
   take, §2.6's inset of the ground wings) under the wings `cryptSeedWings(b)` returns (V02 §3.14.5 (c), exported by
   `@plat/plots`); where it returns none, the third of the region farthest from the main entrance along the footprint's
   OBB long axis.
2. **Growth** to volume 11's `cryptM2` target `T` for the class at the occupants' band (a four-column cell, read as A1
   reads cells): where the seed exceeds `T`, it is trimmed from its end nearer the main entrance by a cut perpendicular to
   the long axis at the module position giving `T` (`slice`'s search); where it falls short, it grows toward the main
   entrance by the slab of the region between its entrance-side edge and a parallel line, the line's module position
   giving `T` (bisection), never beyond the region — on the crypt ladder's `half` and `raised` rungs never beyond the
   ground wings its step-1 seed lies under (volume 2's `cryptSeedWings(b)`, else the ground wings over the far third),
   which volume 2 raises or lifts over it, or the solid tier 0 that holds it (V02 §3.14.5 (d)), so a half-sunk or raised
   crypt stays under its raised choir (J-V3.129) — and a region smaller than `T`, or a crypt so bounded below `T`,
   becomes the crypt whole, reported short. An author's ring (V03 §4.2) keeps no bound: volume 2 then raises or lifts the
   wings over it.
3. **Rank** (J-V3.48, J-V3.107). The settlement's **principal crypt** is the `cathedral` building's (several: the largest
   ring, ties by address); with no cathedral, the `always` building's with the largest ring (ties by address); with no
   `always` building there is none. Every other crypt's ring is **capped** at `crypt.rankShare` (volume 11's row) × the
   principal's area: its step-2 ring, trimmed from its entrance end by step 2's cut where it exceeds the cap. **The trim
   shortens `Basement.crypt.ring` only, never `Basement.ring`**: a crypt-only basement keeps its whole extent as basement,
   and the **capped bays** — the step-2 ring less the trimmed ring, inside `Basement.ring` (derived, never stored) — are
   planned as one `undercroft` room (A2 (9)) under the crypt's column grid, their vaults kept and drawn (V03 §3.7.5).
   **The rank is recomputed, never only a trim**: each run caps every ranked crypt afresh from its step-2 ring (steps 1–2,
   deterministic, no draw), so when the principal's area falls, the principal moves to another building or the trimmed
   building becomes the principal (the see returns), its ring re-grows within `Basement.ring`, up to its step-2 ring, and
   the capped bays regain the crypt role. The rank runs as a closing pass of S11 over every building with a crypt, and
   again, inside the causing event, whenever the principal crypt, its building or its area changes (the other crypts'
   plans are then marked stale or re-cut, §7.3); volume 11's compile bar keeps every `always` class's smallest `cryptM2`
   above every `basement` class's largest, so at generation the trim is a backstop, save where the `half` or `raised`
   bound leaves the principal short, and across epochs volume 6 re-runs this rank inside each op that moves the see 
   (V06 §3.18.3 (2)–(3)).

**The vault and the stair-entered reading** (J-V3.127). A crypt's **vault** is its step-2 ring, which holds its capped
bays — the author's ring where `Basement.crypt.edited` is set; no rank event moves it. A crypt is **stair-entered** where
`ground(b)` exists and the ring of a storeyed ground-standing wing (V03 §3.3's level reading: `BaseWing.on` absent and
`s₀(w)` = 0) shares area — never an edge alone — with its vault: a reading of eager records, derived and never stored. A
stair-entered crypt is entered by its crypt stairs (V03 §3.7.6); any other — `ground(b)` absent (a great temple built
solid), or no storeyed wing over its vault (a great temple's crypt under its solid tier 0 beside a storeyed annex) — is
entered from the basement: by the outside door at `basementDoor(b)`, or through O2's one crypt join. The basement
function reads it before it fixes the basement's extent (the `always` bullet above), on the step-2 ring of the region a
crypt-only basement would take (step 1) — the ring the crypt keeps in the whole inset too, whose seed and growth read
the same region — and it is built with the crypt derivation at M6-U (§2.6; V03 §8).

A ring the author set (`setAttr(basement)` on `basement/crypt/ring`, `edited: true`) is kept as the author's and never
trimmed, subject only to the dry runs below. A dossier crypt record makes its building `always`. **No plan derivation
writes `Basement.crypt`**: the plan reads it (T-V3-23 (f)), so volume 4's crypt join (V04 §3.5.7 (c)), the rank, volume
10's why and volume 1's T-V1-47 read it at generation without elaborating any building. A church-class building without
a crypt furnishes its chancel with flush `ledger` slabs (V03 §3.8; J-V3.44): no opening and no join.

**The crypt-edit dry runs** (the crypt's owner; J-V3.47, J-V3.130). Every plan event and `setAttr(basement)` that
changes a crypt is checked on the overlay before it commits; none is refused but for a dossier fact or a lock (item 101
R2), and each bend names its `bent` words, which V09 §4.17.5 (e) and V10 word:
1. **Removing a cathedral's crypt** — `setRoomRole` away from `crypt`, a `mergeRooms` that dissolves the crypt room,
   `setAttr(basement)` to none, or a crypt ring set empty, on a building whose class's crypt column is `always`
   (volume 11's `cathedral`, `great_temple`) — bends to that crypt at its **smallest lawful size**: step 2's ring grown to
   the smallest value its class's `cryptM2` cell takes over the bands (the region whole where that is smaller), set as
   the author's ring (`edited`). A `setAttr(basement)` to none keeps a basement by the crypt ladder holding that ring
   (crypt-only, or the ground wings' whole inset where it would not be stair-entered, as V03 §4.2's crypt-ring edit makes
   one); every other such edit is carried out as that `setAttr(basement)` on `basement/crypt/ring`. Words
   `bend.crypt.cathedral`, the kept area its `{m2}`. A crypt a dossier crypt record binds is a dossier fact: an edit
   removing it is refused (§7.7).
2. **Enlarging another crypt past the cap** — a `setAttr(basement)` on `basement/crypt/ring`, or a `moveWall` on the
   crypt's boundary (carried out as that edit, V03 §4.2), that makes a crypt other than the principal larger than
   `crypt.rankShare` × the principal's area — bends to that cap: the given ring trimmed from its end nearer the main
   entrance by step 2's cut. Words `bend.crypt.largest` ("stops at {share} of the cathedral's"), whose offer to enlarge
   the cathedral's crypt too is V09's two-event group. With no principal crypt there is no cap.
3. **Removing any other crypt** is carried out; where it held the crypt join (an `AccessPoint` of cause `crypt`,
   V04 §3.5.7 (c)), the dry run lists the join's closing among its fates ("the way from {church}'s crypt into the catacombs
   closes").
4. **Every other author's crypt edit** is kept as the author's: one that leaves the principal smaller than another
   crypt's edited ring, or gives a `never` class a crypt, is announced ("by the rules the cathedral has the settlement's
   largest crypt"; "by the rules this building has no crypt; kept as yours") and reported in `PlanReport.anchors`
   (`kind: 'crypt'`, with a note); a change of the principal's area re-runs the rank for every other crypt (step 3),
   named in the preview.

**3.7.5 The crypt's plan.** The crypt's ring is a fixed seed piece of storey −1 (V03 §3.4), cut out of `Basement.ring`
before A5 allocates the rest, and holds one room of role `crypt` (the `nave` pattern). **The capped bays** (V03 §3.7.4
(3)), where the rank has trimmed the crypt, are a second fixed seed piece beside it holding one room of role
`undercroft` (the `nave` pattern), joined to the crypt by one `arch` of `door.archCm` on their shared wall, and — only
where the crypt is not stair-entered (V03 §3.7.4; O2's crypt join) — to the rest of storey −1 as any room is (O2). The
crypt's **columns**: in the step-2 ring's OBB frame (an `edited` ring's own), a grid of pitch `crypt.bayCm` centred on
that OBB, so the grid does not move when the rank trims or re-grows the ring; a square of `crypt.columnCm` stands at every
grid node lying at least `crypt.bayCm ÷ 2` inside the crypt's ring or the capped bays' ring and outside every stair bay
and head; each is a fixed ring of role `column` that the cut avoids and F3 furnishes around. The crypt's boundary moves
only with `Basement.crypt.ring` (a `moveWall` on it is carried out as `setAttr(basement)`, V03 §4.2). Its walls above
ground in the `raised` form take W2's `light` windows.

**3.7.6 Crypt stairs and choir flights** (J-V3.46). The crypt's **nave-side edge** is its ring's edge that crosses the
footprint's long axis nearer the main entrance; on storey 0 the same line is the nave/chancel line (the chancel wing's
joint, or the chancel strip's cut, V03 §3.5).
* **Where they start.** Crypt stairs are laid only to a stair-entered crypt (V03 §3.7.4); they and the choir flights are
  laid only from a nave piece on level 0; where `ground(b)` holds no nave, the crypt stairs run from the largest room on
  level 0 whose piece stands over part of the crypt's ring along its nave-side edge, else from the largest room of level
  0 standing over part of its vault, the flight's bay laid inside that part, landing in the crypt, else in the capped
  bays' undercroft that V03 §3.7.5's arch joins to it (V03 §3.9). Where the crypt is not stair-entered (`ground(b)`
  absent — a stepped temple's sanctuary on its solid stack — or no storeyed wing over its vault), the crypt's entry is
  from the basement — the outside door at `basementDoor(b)` (the tomb door, or a wall walk-out's door) directly, or O2's
  one crypt join from the basement's tree (O2 (i), (ii)) — reported `cryptStair` with the note `tomb door` (the door
  opening into the crypt) or `crypt join`, and no stair descends through a solid wing.
* **(a) Crypt stairs, `full` and `half` forms.** Straight flights of S1 at Δ = `floorCm`(the nave's wing, 0) − the
  crypt's floor, width `stair.flightCm.institution`, each a `StairCore` of `levels` [−1, 0] whose bay lies inside the
  crypt's ring against its nave-side edge, its long axis along the church's axis (it descends away from the nave). Two
  flank the axis, at ±(`minRoomWidthCm` ÷ 2 + f ÷ 2) from it, where the edge holds two flights and `minRoomWidthCm`
  between them; else one, on the side of the lower lattice index. On storey 0 the bay is a fixed ring in the piece above
  it (the chancel's west end where the crypt lies under the chancel alone), joined like a core's bay (O2) with the nave
  preferred — one `open` opening onto the nave, or onto the room above it that the tree reaches first; on storey −1 its
  foot opens into the crypt. A bay that does not fit takes `dogleg`, `winder`, `spiral` in turn, then one `ladder` bay
  (tier 2, reported `cryptStair`).
* **(b) The crypt entry, `raised` form.** One `StairCore` of `levels` [−1, 0] centred on the axis at the nave-side edge:
  S1 straight at Δ = |the nave's floor − the crypt's floor| (Δ may be 0: a level bay of `landingCm` depth), width
  `stair.flightCm.institution`; on storey 0 its ring lies under the lifted choir at the nave's floor and is joined to the
  nave by an `arch`; its foot opens into the crypt.
* **(c) Choir flights.** Wherever a chancel piece's `floorCm` exceeds the adjacent nave piece's by more than
  `datum.maxSteps × riserCm` (volume 2's lift of `crypt.clearCm`, or any other difference between the nave's and the
  chancel's wings), two straight flights of S1 at that difference, width `stair.flightCm.institution`, stand in the nave
  piece against the nave/chancel line, rising toward the chancel — flanking the crypt entry at ±(its width ÷ 2 +
  `jambCm` + f ÷ 2) from the axis in the `raised` form, else flanking the axis as (a) does; where the width holds only
  one, one on the side of the lower lattice index; where none fits, one flight against the nave's side wall at the line
  (tier 2), else tier 6 (flagged). Each flight is a room of role `stair` with an `open` opening onto the nave at its foot
  and onto the chancel at its head: the O2 edge between nave and chancel that replaces O1 (c)'s refused door, so T28-2
  holds.
* Where the crypt is stair-entered the crypt stairs are its entry and the vault is closed to the rest of the basement
  (O2); where `ground(b)` exists the basement's outside door never opens into the vault (V03 §3.7.1's door point), so a
  crypt beside a storeyed wing but under none is entered by O2's crypt join. A crypt joined to a catacomb holds that
  access's head (V03 §3.7.2 (6)) and nothing else links it underground.

**3.7.7 The crawl space** (`kind: 'crawl'`) is no storey: level 0 carries an `Opening` of kind `trapdoor` with `point`
in the room over the building's lowest footprint sample (J-V3.18), and nothing below is cut. Where `ground(b)` is
absent, the hatch is an outside one at `basementDoor(b)` (V03 §3.7.1; the access is `external` there by §2.6
*Basements*), else, where that is `null`, in the face of the ground-standing wing nearest the main entrance, reported.
=== END ===

=== REPLACE ### 3.13 Edges at their limits (principle (11)) ===
### 3.13 Edges at their limits (principle (11))

Every mechanism of V03 §2–§5 at its limits: its outcome (stated at the section cited, else here), its failure rung (§5's
ladder: never a whole-map retry) and its test. Degenerate geometry is refused by the kernel (§3.1's `E_DEGENERATE` with its §3.4 details on
the transient arena, `E_INVARIANT` for a §3.10 row) and handled on F-PLAN's ladder at the step that made it (§5.1). T-V3-36 is the bar of
this table.

| mechanism | edge | outcome | rung | test |
|---|---|---|---|---|
| record fields (V03 §2.1) | a field absent, empty or naming what no longer exists (a head whose access is gone, furniture whose room is re-cut away, an opening whose wall is gone) | the absence reads V03 §2.5's migrate cell; a dangling part is re-derived with its owner or, on a stored plan, orphaned and reported (V03 §3.11); a table cell outside its type is refused at load (§7.6) | repair locally; leave out and report | T-V3-36 (d) |
| part identity (V03 §2.2) | a part's room or wall re-cut away | V03 §2.2's re-match column | leave out and report | T-V3-36 (i) |
| the derivation (V03 §3.1) | no programme and no head; one room; a missing table row | V03 §3.1 step 2; V03 §3.4; A1's fallback, reported | substitute | T-V3-29, T-V3-36 (q), T-V3-1 |
| storey heights (V03 §3.3) | a run below one riser per storey; `G + (n − 1) × U` = 0; a basement under ground wings of different `baseCm` | V03 §3.3 | simpler shape | T-V3-36 (a) |
| seed pieces (V03 §3.4) | no seed piece on a level; exactly one; a degenerate one | V03 §3.4 | leave out and report | T-V3-36 (b) |
| roof terraces (V03 §3.4a) | no flat roof; a degenerate face; save, load, undo, redo, regenerate, migrate | V03 §3.4a; V03 §2.5's terrace row (derived, never stored: re-derived at read, with the plan and by its inputs' undo; nothing to migrate) | none (no failure) | T-V3-36 (c), T-V3-29 |
| openings (V03 §3.6) | a wall shorter than a door and its jambs; a side with no façade bay; a room with no wall long enough to a neighbour | O1 (a); W2; O5, else tier 1 (V03 §3.9) | retry that piece; leave out and report | T-V3-36 (e) |
| every mechanism of V03 §3.2–§5.4 | every rung THORP → METROPOLIS | rung-independent per building: the rung reaches the plan only through its class rows (a village's `v.` rows, V03 §2.4), its terrain, its accesses and its crypts; with no `always` building there is no principal crypt and no trim (V03 §3.7.4 (3)); the METROPOLIS view is capped by `view.planCap` (V03 §4.5), the rank pass by V03 §6's crypt row | none (no failure) | T-V3-36 (f) |
| furnishing (V03 §3.8) | `n` = 0; `n` = 1; no free floor; a glyph with no `FurnitureRow` | nothing placed; one glyph by F3; every item skipped and counted; the glyph skipped and counted | leave out and report | T-V3-36 (g), T-V3-8 |
| failure handling (V03 §3.9) | a kernel refusal inside any step | the step's row of V03 §3.9 | per the row | T-V3-17, T-V3-36 (b) |
| determinism (V03 §3.10) | no draw; one draw | V03 §3.10 | none (no failure) | T-V3-20, T-V3-36 (h) |
| re-cuts (V03 §3.11) | a prior room's seed piece degenerate or gone; a kept opening's wall gone | V03 §3.11 | leave out and report | T-V3-9, T-V3-36 (i) |
| below ground (V03 §3.12) | no basement; one grade face; a chamber with none; a grade face shorter than a window bay or a door run; the raised way removed | (1); (9) on that face; (1)–(8); no window or door on it, the frontage entrance at its vertex (§2.6 rule 5); V03 §4.2's dry run and undo | leave out and report | T-V3-24, T-V3-32, T-V3-36 (j) |
| the edits (V03 §4.1, V03 §4.2) | save, load, undo, redo, regenerate, migrate; geometry the kernel refuses; an edit that would leave a room unreached | V03 §2.5's rows; V03 §4.2's degenerate bend (for a crypt ring, the ring step 2 derives) and reach bend (`bend.room.unreachable`), never refused, never partly committed | repair locally | T-V3-11, T-V3-36 (k) |
| carries (V03 §4.3) | a carry that collapses a room's carried ring | V03 §4.3 | leave out and report | T-V3-36 (l) |
| the click and the panel (V03 §4.5) | an `absent`, one-storey, empty or `stale` plan; a building smaller than the frame stop can fill | V03 §4.5; the frame clamped to `view.frameStops` | none (no failure) | T-V3-36 (m) |
| the clerk's queries (V03 §4.6) | an empty plan; a `storey` the plan lacks; after undo, redo, load or regenerate | V03 §4.6 | none (no failure) | T-V3-12, T-V3-36 (n) |
| the draw, the picture and scene exports (V03 §5.1–§5.3) | an empty plan; one room or storey; a room too small for its label; a degenerate part; `interiors` off and on | V03 §5.1, V03 §5.2, V03 §5.3 | leave out | T-V3-13, T-V3-14, T-V3-36 (o) |
| concealment (V03 §5.4) | one concealed room; a storey whose every room is concealed | V03 §5.4 | none (no failure) | T-V3-12, T-V3-14, T-V3-36 (p) |
| Find at the interior band (V03 §5.5) | no chip; one chip and twelve; a match whose rooms lie on another storey only or on none; a plan absent, stale, stored or empty; a concealed use at a public key; save, load, undo, redo, regenerate | V03 §5.5 (1)–(3): where the shown storey holds none of the match's rooms the building's outline glowing and the switcher marking the storeys that do; where the plan does not draw the building glowing whole; no concealed room glowing at a key that withholds it; nothing saved, the view key outside the document | none (no failure) | T-V3-38 |
| the plan's one-time waits (V03 §6) | a dossier change reaching many stored plans; the largest export; a migration at the metropolis cap | inside the comfort level (V03 §6); a wait past it completes and is reported (§12.1), never answered by a coarser plan (§12.7) | report | T-V3-37 |
| the plan × a cliff (pipeline) | a wall or basement side over a cliff's drop | V03 §3.6's exposure gates; V03 §3.7.1's drop no step reaches | leave out and report | T-V3-36 (r) |
| the plan × steep ground (pipeline) | a fall past `cellar.slopeCm`; ground beyond the step tolerance | V03 §3.7.1 rule 3; V03 §3.6's entrance storeys, stoop and `W_ENTRANCE_NO_STOREY` | repair locally | T-V3-30 |
| the plan × the coast, a moat or an oasis (pipeline) | a wall facing water; wet ground; a deck over water | the water's surface is never walkable, so no door there (V03 §3.6); the wet-ground rule (V03 §3.7.4); the deck rules (V03 §3.7.2 (0)) | none (no failure) | T-V3-31, T-V3-36 (r) |
| the plan × the frame (kernel) | a building at the frame's edge; an epoch's frame growth | every sample of V03 §3.6 and V03 §3.7.1 lies within `cellar.insetCm + door.mainCm` of a footprint inside the frame, so it reads the rasters over the frame's context margin (§3.2 (9)); frame growth extends the rasters by whole cells, moving no sample and staling no plan; under its re-grid fallback the outside digest moves and each plan goes stale or is re-cut inside the epoch event (V03 §2.5) | none (no failure) | T-V3-36 (s) |
=== END ===

=== REPLACE ### 4.2 The edits the plan needs, each with its semantics and its bend ===
### 4.2 The edits the plan needs, each with its semantics and its bend

The plan events, `setRoomUnit` and `regenerate` with `rung` are §7.1's; their dry runs check §13.2's plan bars on the
overlay (§7.1). This volume fixes what each does to the derived parts of V03 §3.5–§3.8. Per item 101's R2, an edit that
cannot be done exactly is **bent** to the nearest lawful form and the bend named in one line; it is refused only against a
dossier fact or a lock — never on a structural ground (J-V3.54). Local re-derivations draw at V03 §3.10's creation
indices, so a plan reached through them equals the whole derivation's (T-V3-20). An edit whose geometry the kernel
refuses as degenerate bends to the nearest lawful module position or ring (V03 §3.13).
* **`setRoomRole`** — roles only: re-derives the room's door kinds and widths (O3; a changed width re-centred on the same
  midpoint), windows (W1–W3 on its walls), furniture (F1–F4 in that room, ids re-issued from `nextFurniture`), `lit` and
  its label; no ring and no opening position moves. A role whose storey rule or area range the room breaks is kept as
  declared and the report notes the rule.
* **`moveWall`, `splitRoom`, `mergeRooms`** — the storey's rooms on either side re-take O1–O6 for the walls touched,
  W1–W3 for the exterior walls touched and F1–F4 for the rooms touched; other rooms' parts keep their ids (V03 §2.2). A
  wall moved past a room's `minWidthCm` or into a fixed ring stops at the nearest lawful module position (bend named). A
  `moveWall` on the crypt's boundary is carried out as `setAttr(basement)` on `basement/crypt/ring` (announced).
* **`setOpening`** (with the optional `hinge` and `swing`) **and `setWindow`** (with the optional `kind`) — the named part
  only; a moved door re-takes O3's hinge and swing unless given; F2's clearance is re-checked and furniture now in a
  clearance square moves by F3 within its room (listed in the fates). A door onto a forbidden edge (two units, concealed
  and public) bends to the nearest wall of the same room whose other side is allowed. A door on an exterior wall is
  lawful where the outside is ground within the datum tolerance or a walkable terrace (W2, O1 (d)) — a door set onto a
  roof terrace makes it walkable (V03 §3.4a) — and is otherwise bent to the nearest such wall of the same room, named
  ("no door into earth: moved to the street side"); a window set below its outside ground bends up to the lowest bay
  whose sill clears it, else to the nearest wall that has one, named.
* **Reach** (item 28 (f); §7.1's outcome row `bend.room.unreachable`) — a `setOpening`, `moveWall`, `splitRoom`,
  `mergeRooms` or `moveStairCore`, or a `setRoomUnit`, that would leave a room the main entrance no longer reaches through
  O2's tree (V03 §3.6) is bent to the nearest lawful form that keeps every room reached: a door the edit removes or moves
  is kept where it was, or moved to the nearest wall of the cut-off room whose other side reaches circulation (O3's width
  and hinge for its kind, O2's forbidden edges kept), named ("kept the door: the store has no other way in").
* **`moveStairCore`** (with the optional `kind`) — the bay on every storey it serves; each such storey re-partitioned
  around it (V03 §3.11). A kind whose bay does not fit at the requested position takes the nearest kind in S4's order that
  fits there; a position that fits no kind takes S2's nearest candidate; each bend named.
* **`setHearth`** `{ building, storey, room, op: 'add'|'move'|'remove', wall?, at? }` — the stack re-placed by H2–H3
  constrained to the named wall and position, rising through the storeys above as H2 states; a wall that cannot take a
  stack bends to the nearest wall of the room that can, in H2's order; every storey the stack crosses is re-cut around it
  (V03 §3.11); removing the last hearth on a stack removes the `Chimney` and its roof stack (§8.6).
* **`instance` on a room** — `entity` a room id, `ordinal` a furniture ordinal (its decimal string): `add` (a glyph at a
  point, ordinal `Room.nextFurniture`), `move` (to a point, snapped to 10 cm), `remove`, `restyle` (`style.glyph`,
  `style.rotCdeg`, `style.wCm`, `style.dCm` — sizes clamped into the row's range, named). An add or move onto a spot F2
  forbids snaps to the nearest free slot of F3's scan in the same room (named); where the room has no free slot, the item
  **bends** to the nearest room of the building that has one — on the same storey by centroid distance, else on the
  nearest storey (ties lower), ties by room id — placed there by F3's scan and named ("no room for a bed in the pantry:
  placed in the chamber"; J-V3.105); a moved item that bends into another room takes that room's `nextFurniture` as its
  ordinal (a new id, the fates listing the old). Where no room of the building has a free slot, the item is kept where
  the author put it and reported as crowding its room. The item is marked `edited`.
* **`setAttr declaredRooms`** — the declared rooms become A2 (7)'s hard rooms; an unstored plan is marked stale, a stored
  one re-cut inside the event. A room that fits not on its declared storey bends to the nearest storey that holds it
  (ties lower); one that fits nowhere first displaces soft rooms and then other hard non-unit rooms (the fit ladder's
  (i)–(ii)), named; only where every household's unit leaves no room is it refused, naming that cause (the households are
  the dossier's population, item 20 (h)).
* **`setAttr plan/rooms/<id>/name`** (T11) — the room's name; the label shows it, the role unchanged; stores the plan.
* **`setAttr plan/rooms/<id>/lit`** — the room's light on or off (an edited attribute, §7.2; Dwellings' per-room
  toggle); stores the plan.
* **`setAttr plan/pattern/<level>`** — re-cuts that storey by V03 §3.11 with the named `LayoutPattern` for every piece
  that holds its requirement (the others by V03 §3.5's rule, named); stores the plan.
* **`setAttr(basement)`** (J-V3.70), including `basement/crypt/ring` — the basement storeys re-cut (V03 §3.11); the
  crypt re-derived by V03 §3.7.4 unless its ring is the path set, every crypt change passing V03 §3.7.4's crypt-edit dry
  runs; the building's hosted accesses **re-read after the underground rules re-run for this building** — II.7.3's gate
  and draw, volume 4's per-building crypt-join and dig-from-above draws (V04 §3.5.7 (c), (d)), each keyed per building so
  the same uniform decides at the new floor, owned by volume 4 — and the heads re-anchored for whatever records result.
  The dry run's preview names, one line each, every access gained, lost or re-hosted and, where a lost one was a void's
  last access, the dwellings item 109 (j) (4) would empty (from volume 4's excavation reading, V04 §3.5.7 (g): "removing
  this cellar seals the only way into the ruin: 4 households leave"); a change of the principal's area re-runs the rank
  for every other crypt (V03 §3.7.4 (3)), named in the preview. **On a building without a basement** (J-V3.87),
  `setAttr(basement)` on `basement/crypt/ring` makes a basement by the no-refusal crypt ladder (`full`, then `half`, then
  `raised`; V03 §3.7.4) — crypt-only, or the ground wings' whole inset where the ring would not be stair-entered — as a
  dossier crypt record does: the building is `always` for that derivation, `Basement.crypt.edited` is set, and the ring
  is the given ring clipped to V03 §3.7.4 step 1's region and snapped to the lattice; its access is the crypt stairs where
  the ring is stair-entered, the programme row's with O2's crypt join where `ground(b)` exists but it is not, or the tomb
  door where `ground(b)` is absent. The terrain gate never refuses it, the raised form being always lawful. Volume 9's
  `drawChamber` bend inside a church-class footprint emits exactly this event (V09 §4.17.5 (a)) and previews the form this
  rule gives. **On a deck building** (`onDeck(b)`, V03 §3.7.2 (0); J-V3.92) every basement form fails at once and the
  request **bends** (item 101 R2) to the same request on the nearest building on the ground of its plot group, else of its
  block, else the nearest building on the ground, named `bend.deck.basement` (§7.1's deck bend; volume 2 registers the id
  for volumes 9 and 10, and its `bend.deck.single` — the family bend for small light buildings on a bridge — is another):
  "A deck over water holds no cellar: the cellar goes to <building> on the quay." The dry run previews that building's
  basement and its consequences as for any `setAttr(basement)`; a deck is a fact of the map, neither a dossier fact nor a
  lock, so nothing is refused.
* **Volume 2's `tiers` op and the stepped mutations** (T9's tier controls; J-V3.85) are volume 2's events; on the plan
  they re-cut a stored plan by V03 §3.11's wing-relative re-match (an unstored one goes stale). The op's dry run lists,
  from this volume, every named, locked or furnished room and every edited opening of a tier the edit removes (or of a
  wing-relative storey it takes away), each as "orphaned: <room name or role>, tier k"; each undo restores the plan byte
  for byte.
* **A `RetainingWall` drawn, moved or removed** (T3 `wall` `retaining`, T2 `ground`) — the base's edit; each building
  whose outside digest it moves (§2.8) has its unstored plan marked stale and its stored plan re-cut inside the event
  (W2's gates re-run, the walk-out re-decided), both listed in the edit's fates; undo restores them byte for byte.
* **Removing a raised way** (item 110 (b)) — the base's edit (a removal of a generated way holds through regeneration);
  its dry run lists among its fates each building in its vaults and, for a stored plan, "its edited floor plan is lost"
  with its named rooms and placed items counted (V03 §3.12 (9)); volumes 9 and 10 read the fates; undo restores each
  building with its stored plan byte for byte.

The first of the plan edits above on a building stores its composition with its plan (§2.6), under J-P48 (1) in the same
batch; `setAttr declaredRooms` and `setAttr(basement)` are building attributes and store the plan only when it is already
stored, and the last three bullets are their owners' edits, which store nothing here.
=== END ===

=== REPLACE ### 4.4 What is not an edit ===
### 4.4 What is not an edit

Clicking a building, switching storeys, opening the plan panel, turning room numbers on (the `roomNumbers` view key),
setting Find's chips (the view key `find`, V03 §5.5) and a clerk's plan or why query log nothing (§4.1, item 28 (c), §2.9's view state). A room's light is the edited attribute of
V03 §4.2; `placeLight` (§7.1, item 68) adds lights of its own and never changes a room's `lit`.
=== END ===

=== REPLACE ### 4.5 The click, the storey switcher and the plan panel — the viewer's experience ===
### 4.5 The click, the storey switcher and the plan panel — the viewer's experience

* **States (§2.8)** read on the building: `absent` — the wings draw, the panel offers "Show plan"; `current` — the plan
  draws; `stale` — the cached plan draws under §8.5's marker, the panel says what changed (the input group whose digest
  moved: households, band, use, wings, an access, the crypt, the Works stage or a table), and the next building click
  (by band, below), double-click or view re-derives it from its canonical prior (§4.1); `edited` — the stored plan draws,
  a pencil mark beside the marker slot. An empty plan (V03 §3.1 step 2) draws the outline with its heads and the panel's
  "no rooms" line, with no switcher (T-V3-36 (m)).
* **Click and double-click** (§14's input scheme; J-V3.55, J-V3.108). **From the neighbourhood band down**, a click
  selects the building, opens the plan panel and, under `elaborate: 'click'`, derives `wings`, then `rooms` (V02 §3.8),
  then `plan` into the cache, each where absent or stale, **without moving the view**. **At the city and district bands**
  a click on a building is the district's click (V01 §3.8.1: its close-up and its buildings' `wings` rung), which also
  selects the building and opens its panel without deriving `rooms` or `plan` (the panel offers "Show plan"). A
  double-click — or the panel's "Show plan" — at any band derives `wings`, `rooms` and `plan` as above and zooms to the
  building band at the **frame stop**: the coarsest stop at which the building's longest side fills `view.frameShare` of
  the view, clamped to `view.frameStops` (V03 §5.1), and sets `storey` to the main entrance's storey (on a solid stack,
  the root landing door's, S6; with no storeyed wing, storey −1 where it has a basement). The plan arrives from the
  derivation pool as a `DisplayDelta` (§8.6); until then the wings draw with a small progress tick on the building (no
  spinner over the map). A stale building whose re-cut chain is long derives its steps in the pool during idle frames once
  it goes stale (V03 §6's chain row), so a click mostly finds it current.
* **The storey switcher**: a vertical radio group beside the building, accessible name "Storey", one option per storeyed
  level (−k … n) and per walkable roof level (V03 §3.4a), named "Storey n of m — cellar / ground / first …" — "ground"
  only for level 0 where `ground(b)` exists — and on a stack by wing role and ordinal ("Tier 2, storey 1", "Shrine",
  "Roof terrace"); a building with no storeyed wing lists only its basement storeys, and with no basement has no
  switcher. The current one is checked; the map region's live description gains "storey n of m"; `keymap.json` rows
  `plan.storeyUp` (PageUp) and `plan.storeyDown` (PageDown), editable and versioned, their precedence over the
  underground layer's band keys (V04 §5.1) stated in §14's keymap; the view key `storey` (§2.9) holds it per viewer. With Find on (item 120), every storey holding a room a match uses
  carries its chip's glyph (V03 §5.5).
* **The plan panel** (the context panel's building tab, accessible name "Floor plan"): rooms by storey with their name
  or role, number (when `roomNumbers` is on), unit (the household's name for a viewer admitted to it) and area in m²;
  what the plan owed — `PlanReport.owed` with each row's `delivered` in plain words ("folded into the hall", "no room for
  it: dropped") — and the units with their forms ("asked for lodgings, built as single rooms"); **the ways down**
  (J-V3.71): per storey — a head of `storey` null under "at the foot" — each head's kind, state, what it reaches (the
  element's system and, through volume 4's connection graph, the systems beyond it, item 109 (j) (3b)) and its cause in
  plain words ("dug when the house was built", "the neighbourhood's way down", "the catacomb's stair", "a door from the
  crypt into the catacomb", "added by an edit"), each withheld for a key its `knownTo` does not admit; the crypt, where
  the building has one ("the cathedral's crypt, the largest in the town"; "raised over wet ground"; "entered by a door at
  the platform's foot"); **item 110's lines** — "a solid monument: no rooms above the ground" (`solidMonument`; its crypt
  under the crypt line), "stands on the bridge: no cellar and no well" (a deck), "fell with the bridge" (or pier, mole, quay) for a building whose deck is ruined or
  removed, "backs onto the terrace wall: no windows on that side" (the exposure gate), "a cellar that opens onto the
  street below" (a walk-out at a wall), "built into an arch of the viaduct" (a grade face); **the plan's warnings** —
  one line per `PlanReport.warnings` entry (V03 §2.3), each the `en` text of the key `report.plan.<code>` of volume 9's
  catalogue (V09 §4.9), written here, its slots filled from the entry's `wing`, `entrance` and `access` as the panel names
  them (the switcher's wing names, the entrance's role, the head's kind): `W_TIER_UNREACHED` "{tier} cannot be reached:
  no stair arrives there"; `W_STOREY_RUN` "{wing} is too low for its storeys: planned solid, its rooms moved to the other
  wings"; `W_ENTRANCE_NO_STOREY` "the {role} door meets no floor: left out"; `W_STACK_ACCESS` "no cellar under the
  tiers: the way down is entered by a door in the outer wall"; `W_DECK_ACCESS` "stands on a deck: a way down here is
  only a hatch in the floor, and a well only its mark on the map"; `W_GRADE_FACE_TUNNEL` "the door in the arch opens
  onto the ground under the span, not a tunnel"; `W_CHURCH_CATACOMB_HEAD` "a catacomb stair handed to this church
  stands in a store: a church reaches the catacomb only through its crypt". **Room numbers** (J-V3.59):
  the per-viewer view key `roomNumbers: 'off'|'storey'|'building'` numbers rooms in reading order (storey, then room
  index; per storey or through the building), with a key table in the panel. Every edit tool of V03 §4.1 acts from the
  panel or on the canvas. With Find on, each room a match uses carries its chip's glyph in the room list (V03 §5.5).
* **`elaborate: 'view'`** (J-V3.57) derives (each plan through `wings`, then `rooms`, then `plan`, as a click does) and
  draws plans only at stops of `view.planStop` or finer, and for at most `view.planCap` buildings per view, centre-out,
  within V03 §6's per-frame budget; the rest draw their wings.
=== END ===

=== REPLACE ### 4.6 The clerk's view — plan queries and "why?" ===
### 4.6 The clerk's view — plan queries and "why?"

**Queries** (§11.2): `{ kind: 'plan'; building: Id; storey?: number }` returns the plan's storeys as §11.1's JSON `plan`
block, derived first — `wings`, then `rooms`, then `plan`, each where absent or stale, as a click does (the pool, no
event, the cache only); a `storey` the plan does not hold returns no storey with the reason `noStorey`, and an empty plan
returns no storeys (T-V3-36 (n)); `{ kind: 'planReport'; building: Id }` returns `PlanReport` (a stored plan's
recomputed, V03 §2.3). Both read the current state through the cache (§2.8), so an answer after an undo, redo, load or
regenerate is the new state's, and both filter by the caller's knowledge key (§9.2) by V03 §5.4's merge: a concealed
room, door, head or its furniture is withheld for a key that does not admit its use, the room merged into its public
neighbour and the areas re-summed, so the answer never shows a void. A clerk changes a plan only through V03 §4.1's
events via `preview` then `edit`.

**"Why?"** (J-V3.60). This volume registers a `WhyProvider` (V10 §2.13) for kind `room`, resolving a `room:` address
through its building's plan — stored, else the cache, else a derivation into the cache as the `plan` query does (§2.8's
explainer registry resolves plan addresses by prefix). Its answer: `facts` — role, name, scope, household, area,
storey, tier, `elevationCm`, the room's tier (wing role and ordinal) and `accesses: { id, kind, reaches, cause }[]` for
the heads it holds; `cause` — the `ProgramRoom`'s origin and rule (the class, use, specialisation, half or slot row; the
ladder row and band; a declared room; a crypt from volume 11's column and the basement form; an edit), the pattern and
the step that cut it, each head's cause, and for each of its doors and missing windows item 110's **room causes**:
`landingDoor` (the flight that arrives there), `terraceDoor`, `terraceExit`, `seatingExit`, `walkOut` (the rule of
`basementDoor(b)` that placed the door: the retaining wall's id and its step, or the fall; on a church, that its door
point was moved off the crypt's vault), `tombDoor` (no storeyed ground wing), `gradeFace` (the raised way or bridge and
its vault), `deckNoCellar` (the deck: why a deck building has no cellar — a fact of the deck, §2.6's deck gate, never an
edit refusal), `stoop` (over an `external` basement, the main entrance kept on the ground storey, V03 §3.6), `exposure`
(the outside ground above a sill or floor), `stackCarried` (the tier a chimney rises through); `rest` — its
`PlanReport.owed` row and the unit's asked and built form. The building's path `plan` ("why these units?", "why is there
no kitchen?", "why no crypt?", "why are there no rooms?", "why can't I reach the top tier?") answers from the ladder row
at the occupants' band, `Building.households`, A1's `programmeSource`, the owed rows, `Basement.crypt`'s derivation (the
column value, the ladder's form, the rank trim), `PlanReport.warnings` and `PlanReport.notes`.

**The section providers** (V10 §3.9, V10 §3.9a; J-VI.17 H18). This volume registers two `WhySectionProvider`s, which the
facade's `why` query merges after the kind's provider (V10 §3.9) and volume 9's panels show; every row's words are a key
of volume 9's catalogue (V09 §4.9), one key per value, their texts written in volume 10:
* **`plan`**, on every building with a plan: one row per item-110 room cause the plan holds, keyed
  `info.plan.cause.<cause>` for each cause above (`landingDoor`, `terraceDoor`, `terraceExit`, `seatingExit`, `walkOut`,
  `tombDoor`, `gradeFace`, `deckNoCellar`, `stoop`, `exposure`, `stackCarried`), and one row per
  `PlanReport.notes` entry, keyed `info.plan.note.<id>` (`shrineOneRoom`, `solidMonument`, `stackCarried`), so the cause
  and the note named `stackCarried` keep two keys.
* **`crypt`**, on every church-class building (V03 §3.7.2 (6)), over `Basement.crypt` and its rank: **presence** — the
  class's crypt value `always`, `basement` or `never`, or a dossier crypt record (`info.crypt.presence.<always|basement|
  never|dossier>`); **area and form** — the ring's area, and the form `full`, `half`, `raised` or on a sky island the
  rim-slab vault (`info.crypt.form.<full|half|raised|rimVault>`); **rank** — the principal crypt, or a crypt the rank
  trimmed (`info.crypt.rank.<principal|trimmed>`); **the crypt join** — an `AccessPoint` of cause `crypt` and the
  catacomb it opens into (`info.crypt.join`); **no crypt** — its row gave it none, or wet ground with ledger slabs in the
  chancel floor (`info.crypt.none.<row|wet>`, V03 §3.7.4). The crypt rows are `purpose: true` (a crypt names a church),
  so a withheld building's answer keeps none (V10 §3.9a).

Both the provider and the sections are knowledge-filtered by volume 10's oracle rules and V03 §5.4 (T-V3-12).
=== END ===

=== REPLACE ### 5.2 Picture exports ===
### 5.2 Picture exports

**SVG** at the building band: one file per storey on request, or the **all-storeys sheet**: the storeys side by side in
level order on one sheet, each captioned "Storey n", one scale bar. Groups `layer.plan.floor`, `plan.shade`,
`plan.furniture`, `plan.stairs`, `plan.heads`, `plan.hearths`, `plan.walls`, `plan.openings`, `plan.windows`,
`plan.labels`, `plan.lights`, with numbering on `plan.key` (the key table: number, name or role, area) and with Find on
`plan.find` (V03 §5.5), with the
`<metadata>` map to room, wall, opening, head and furniture ids (§11.1's convention). **PNG** by §8.8's tiles at the
building-band stops, the sheet likewise. A picture export derives the plan as the `plan` query does (V03 §4.6); an empty
plan (V03 §3.1 step 2) exports the building's outline with its heads of `storey` null and no storey sheet
(T-V3-36 (o)).
=== END ===

=== REPLACE ## 6 Performance budgets ===
## 6 Performance budgets

On §12.1's reference hardware, in the derivation pool; the rung's whole budget per plan is §12.7's (× steps for a
chain), which this split must sum inside. PLAUSIBLE until the P0 spike measures it (V03 §8).

| work | budget (median / p95) | law and basis |
|---|---|---|
| A programme, resolution and allocation (incl. A6 and the fit ladder) | 0.2 / 0.6 ms | O(rooms × storeys); ≤ 60 rooms; the fit ladder at most five more A5 passes |
| anchors (S1–S5, H1–H4, E1–E2), heads, the crypt's columns and stairs | 0.6 / 2.2 ms | O(candidates) on the module; ≤ 400 candidates per wing, exact containment per candidate; heads ≤ 4 per building |
| per storey: seed clip, arena open, the A6 strip, cuts, read-back | 0.8 / 3 ms | O(pieces + cuts × log cells): `slice`'s bisection (≈ 10 probes per cut, each an `area2` of a boolean on ≤ 40 vertices), the linear-scan fallback bounded by the work limit — never cell enumeration |
| openings O1–O6, W1–W4 | 0.3 / 1 ms | O(walls) per storey |
| furnishing F1–F4 | 0.4 / 1.5 ms | O(items × slots) per room; ≤ 40 items per storey |
| a typical 2-storey house, with basement | 3 / 10 ms | the rows above at 3 storeys — inside §12.7's plan row |
| a 4-storey tenement of 12 units | 5 / 18 ms | the class the P0 spike must measure first |
| a cathedral with crypt, choir flights and 6 chapels | 4 / 15 ms | 3 storeys (crypt, ground, tower), ≤ 80 columns |
| the crypt rank pass (S11's closing pass, per settlement) | ≤ 1 ms | ≤ 60 crypts at METROPOLIS: one sort and one trim each |
| item 110's per-storey reads — outside ground and exposure, entrance storeys, terraces | 0.1 / 0.3 ms per storey | O(exterior walls) `levelledGroundCm` or surface samples; one kernel difference per flat roof |
| S11's eager additions (V03 §8's PE): `Entrance.storey` per entrance, `basementDoor(b)` per `external` basement; `stackAccessDoor(b, a)` per stack-hosted access, on call | ≤ 0.05 ms per building | O(entrances × levels + ring sides × retaining walls within `2 × cellar.insetCm`) `levelledGroundCm` samples and `stepProfile` reads, inside S11's stage budget (§12); `stackAccessDoor` O(ground wings' ring sides × outline sides), no sample; from M6-U a church's door points add O(ring sides × vault sides) span clips on its crypt's vault (V03 §3.7.4 steps 1–2 recomputed, no draw); measured at M3a on B-CITY-lite, the crypt clause at M6-U |
| a stepped temple (solid tiers, a one-room shrine) | 1 / 4 ms | one storeyed level; no piece for a solid wing |
| a tiered tower of five one-storey tiers (one spiral chain core) | 4 / 14 ms | five storeys of one piece each, the chain core's containment over five extents |
| a terraced palace of four tiers × two storeys (≤ 60 rooms) | 13 / 45 ms | eight storeys at the per-storey rows, plus S5–S6 and the terraces; derived storey by storey in the pool during idle frames, as the chain row is, with the progress tick until the last storey lands; stepped buildings are at most 0.1 % of buildings (volume 2's cap), so §12.7's median and p95 per plan are unmoved |
| the longest re-cut chain: a capacity-30 shell from `rich` with one household to `squalid` at capacity, ≈ 34 steps | 170 / 680 ms | derived step by step in the pool during idle frames once the building goes stale; a click before the last step shows the progress tick until it lands |
| the plan draw per storey (vector, tile worker) | 1.5 ms | ≤ 300 marks per storey |
| a storey's VTT scene (image excluded) | ≤ 20 ms | walls ≤ 200 segments |
| `elaborate: 'view'` at a METROPOLIS core at `planStop` | ≤ `view.planCap` plans derived, ≤ 8 per 16 ms pool frame, drawn within §12.5's frame budget | centre-out; measured at P4 on the B-CITY METROPOLIS seeds |
| the cache (§12.8) | §12.8's line per storey, furniture included; ≈ 0.8 MB for a capped view (`view.planCap` × 3 storeys) | 40 items × 16 B + rooms, walls, openings as §12.8 states |
| Find's room reading (V03 §5.5; item 120 (j)) | ≤ 0.02 ms per drawn plan; ≤ 2 ms per chip change over a capped view | O(rooms + walls) per plan (≤ 60 rooms) over the stored or cached plan, the union's outline read from its wall records with no boolean, for ≤ `view.planCap` plans and the clicked ones; an overlay reading, no plan redrawn; inside §12.5's glow of about 100 ms; measured at Find's landing (V03 §8) on the B-CITY METROPOLIS seeds |

**Fallbacks, pre-decided:** a class over its row → the module doubles (§12.7's fallback) for that class; a storey over its
`workLimit` → F-PLAN tier 3 then 4 (V03 §3.9); furnishing over 1.5 ms p95 at P0 → F3's slot scan steps at 2 × module; the
view mode over its frame share → it derives the three buildings nearest the view's centre per frame, and a METROPOLIS
view over §12.5's budget halves `view.planCap`; a chain step over 20 ms p95 → the steps' memoised chunks (§2.9) are kept
for the session; where P0 measures a stacked building above 20 ms p95 per pair of storeys, the module doubles for the
stacked wings above tier 0 (§12.7's fallback, per class). A run-time miss is reported, never answered by a coarser plan
(§12.7).

**One-time waits** (item 119, the plan's part; J-V3.133). The rows above and §12.7's plan row (R12-23) stay the
**targets** — as fast as possible, every path pressed toward them (§12.1; item 119 (a)). The plan rung's share of each
one-time wait lies inside §12.1's **comfort level** on its reference machine, at every rung up to the metropolis cap
(T-V3-37):
* **generate, regenerate and Re-derive** — PE's eager facts (`Entrance.storey`, `basementDoor(b)`, `stackAccessDoor(b,
  a)`) and the crypt rank pass run inside S11's stage budget (the rows above), so the generation the base times holds
  them; the plan rung itself runs on no generation (§4.1's lazy policy);
* **a dossier change applied, and every event that moves a stored plan's inputs** (a `relet`, a designation mutation, a
  table edit, a retaining wall or a levelling beside the building, the rank's re-cut of the other crypts) — each stored
  plan it reaches is re-cut inside that event (§7.3; V03 §4.3) at §12.7's chain budget, counted in the event's wait; an
  unstored plan is only marked stale;
* **an epoch** — its stored plans' re-cuts and the crypt rank inside its ops (V03 §3.7.4 (3)) count in the epoch's work,
  timed as volume 6's part of item 119 times an advance of time and the history replay (V06 §6);
* **a plan export** — a picture or scene export of one building (V03 §5.2, V03 §5.3) derives its plan as the `plan`
  query does (§12.7's chain budget), then draws or writes it (the per-storey rows above; the raster at §12.7's PNG
  budget); the whole-document JSON, CityJSON and glTF `interiors` carry the stored plans and the cached ones and derive
  none (§11.1; J-A28.86), so their plan part is serialisation inside the export's own budget;
* **a migration on load** — V03 §2.5's migrate cells, `BaseWing.partName` matched per template-family building and
  `Basement.crypt` re-derived per `always` and `basement` building with a basement (the rank pass once), inside the
  load's migration step; a cached chunk is non-canonical and is re-derived at its next click (§2.9).

A wait past the comfort level fails its bar (§12.1) and the plan's part takes the pre-decided fallbacks above (the module
doubled for the class, the steps' memoised chunks kept); at run time the wait completes and is reported, never answered
by a coarser plan (§12.7). A plan step runs slower than its target only for a measured gain recorded as its
`perf.qualitySpend` row (V11 §3.25.8; §4.1's quality budget) and still inside the comfort level (item 119 (b)); none
ships. A wait past about one second shows progress — the stage by name and the map filling in — through V09 §4.21.9's
progress view (§12.1's progress rule; item 119 (c)). **Interaction stays fast** (item 119 (d)): the click and its plan (a
stale chain derived in idle frames, the progress tick until it lands), the storey switch, `elaborate: 'view'` within
§12.5's frame budget, Find's room reading and a plan edit's preview (§12.6) keep the rows above and §12's, none relaxed.
The low tier aims at the same comfort level, a size it cannot reach declared per device (item 119 (e)).
=== END ===

=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

The base's T28-1 – T28-19 (§13.2, T28-1 and T28-2 with their storey-less and structural-face clauses) and the plan soft
bands (§13.7, the item-28 row's fallback never moving the capacity) stand; this volume's bars add to them, all on
B-PLAN's fixtures (§13.2) and, from P1, on every building of B-CITY-lite clicked by script. Hard unless marked soft.
**B-PLAN gains** (each a named fixture): a three-slot inn compound; a smithy with a separate dwelling; a split brewer pair
and a split butcher pair; a bent quad with a party-wall stack; a cruciform church with and without a crypt; a rectangular
church with a crypt (the chancel strip); a cathedral on `flood` ground (the raised crypt), on `low` ground (the half
crypt) and on a sky island (the rim-slab vault); a rich shell with one household; a `squalid` tenement at capacity; a
vacant house; a closed-family inn with its gate hall and the hall's court door; a stepped row on a slope and a two-wing
house with wings of different storey heights; a front whose concealed use's service rooms lie on another storey; a
building with a secret item-64 access; the access fixtures of T-V3-22; a sewer-front dwelling and a ruin dwelling
(T-V3-24). **Item 110's fixtures**: a stepped temple of the `great_temple` class (solid tiers, axial stair, a one-storey
shrine, its `always` crypt) on dry and on `flood` ground, and one laid with `top` `flat` — no shrine, its crypt planned
alone; the same with a storeyed ground annex, with and without a requested basement, and on a `flood` plot; a terraced
palace (four storeyed tiers of two storeys, flights); a tiered tower (five one-storey tiers, pent roofs, the `internal`
form); a sealed stack (stair form `none`); the arena (volume 2's `ovalCourt`, V02 §2.1); the terrace-wall sub-fixture (a
row built against a 3 m wall on its rear line, and a house at the wall's top edge with a walk-out); a house between two
streets on different terraces; a bridge-deck row of shop-houses, a jetty shed and a mole-head tower (a landmark); a
viaduct with an occupied arch vault; an aqueduct ending at a conduit house. **The edge fixtures** (T-V3-36): a wing whose
run is below one riser per storey; a basement under two ground wings of different `baseCm`; a cliff-edge row; a shore
row, a moat-side row and an oasis house; a fully concealed cellar storey; a building at the frame's edge. **From P1,
B-PLAN's scripted click set also clicks every building of both known-city fixtures** (J78's and item 110 (e)'s): no plan
aborts, and F-PLAN's tier-6 flags are counted and reported per class.

| id | bar | how measured |
|---|---|---|
| T-V3-1 | resolution and schema: every class of volume 11's registry, every volume 7 village class (its `v.` key), the classes of the 17 scene archetypes and every `generic-<family>` class, at every band and with every specialisation, slot role and half its templates name, resolves by A1 to a row whose level is reported; every `v.` key resolves to a row of its own or through its `composition.classFamily` key (`via` reported), never to the building-class row or the fallback, `v.pound` (no building) excepted; volume 11's stepped specialisations and volume 2's stepped composition rows resolve at level `specialisation`, no hard room of theirs names a storey rule its fixture's storeyed levels cannot meet, and every `belowTop` room is soft; `conduit_house` and `arena` resolve to their class-id rows; every role named is in the role table and every role row carries every column; every class row's key is a `BuildingClass` id (`roster.classes`) and every named row is reached by name from a family, slot, class-id or specialisation row; every pattern cell states a weight at every band; every `fill`, `shared`, `unitHearth`, `perRoom` and `half` cell present where its law needs it; no class, family or class-id row names the `crypt` role (it comes only from `Basement.crypt`); every `AccessHostRow` reach has a row; every tag of the shipped class table's sub-locations maps or is listed | schema and enumeration test on `roomProgram.json` with volume 11's and volume 7's registries |
| T-V3-2 | allocation: every household housed (T28-13 widened to every fixture); `lodging` / `apartment` / `room` units fill the top storey down (unit k's storey never below unit k+1's); a `dwelling` pair divides by storey where storeys ≥ 2; a live-in unit never shares a seed piece with the use's hard rooms where an upper storey has capacity; no unit falls a form while a hard non-unit room is delivered on a storey the unit could have used; no staff room on a storey holding the owners' principal rooms while another allowed storey had capacity | the plan's units and rooms against A5 |
| T-V3-3 | stair bays: every core's bay equals S1's size for its kind and storey height within one module, lies against a wing side or joint along its long side, and overlaps no clearance square, apron, head or flight | geometry test |
| T-V3-4 | stacks: every chimney's column is one point on every storey of its `levels`; every hearth room touches its stack; no stack without a hearth or an air access; every unit with a cooking place touches a stack or reports a hood; no two stacks share a point unless one `doubleCm` ring; every stack reaches the roof or a terrace over its column — `levels[1]` is the highest level of any storeyed wing whose extent holds the column — and no stack ends under a floor | per plan, the stepped fixtures included |
| T-V3-5 | windows: none on a party wall; every window centre lies on a façade bay of volume 2's `facadeBays` for its side within `endClearCm`, and a side with no bay holds no window; windows on stacked walls share bay indices; `slit` only on above-ground walls of tower, turret and keep wings; `light` only on basement walls whose exposure ≥ `window.lightBelowCm`; none on a buried wall or an underground building; with a composition, every unedited `DormerRow.count` equals W4's count and every edited row's dormers are windows of the rooms under them | per plan |
| T-V3-6 | doors: every door's hinge within `jambCm` + ½ module of its wall end or at the midpoint (arch); no two clearance squares overlap; a unit room's door count ≤ its role's `maxDoors`; every width is O3's for its kind; the main entrance's opening lies within the porch's width where a porch exists | per plan |
| T-V3-7 | loops only by O4: every door-graph cycle contains an O4 edge (§13.7's soft band made hard for O4's own list) | cycle basis per storey |
| T-V3-8 | furniture: every item's rotated footprint inside its room's ring; none over a clearance square, a stair bay, a head or an apron; counts within ± 1 of F1's `n` or reported skipped; no glyph above its `perRoomMax` or outside its `band`; `ledger` only in the chancel of a church-class building without a crypt | per plan |
| T-V3-9 | re-cuts: (soft, reported) the share of rooms kept by V03 §3.11 on a house → inn designation change and on a one-band fall, by class; (hard) after every re-cut no kept opening joins two units or a concealed room to a public one or exceeds a `maxDoors`; T28-15's exact restoration stands | B-PLAN mutation fixtures |
| T-V3-10 | basements: a crawl space has exactly one `trapdoor` opening with `point` on the ground storey and no basement storey; every basement room's scope is V03 §3.7.1's; with a secret item-64 access, the public cellar is reached from the core or trapdoor, the access's room only through its concealed opening, and T63-3 holds | the item-64 fixtures of §13.2 |
| T-V3-11 | edits: each edit of V03 §4.1's table commits, re-cuts only its building (`setAttr(basement)`: plus the named underground consequences) and undoes byte-identically; every bend of V03 §4.2 lands on its nearest lawful form with a one-line reason and none is refused but for V03 §4.2's stated causes; a B-EDIT sequence removing a cellar that holds a void's last access previews that access and the dwellings that would leave; `regenerate` on each rung of an edited plan changes it or reports that nothing changed; item 110's sequences — (i) a retaining wall drawn behind a planned building marks its plan stale, the re-derivation drops the windows below the new ground, and undo restores it byte-identically; (ii) on a church without a basement, a chamber drawn inside its footprint (volume 9's bend) makes a crypt-only basement with the edited ring, announced where the class is `never`, and undo restores it byte-identically; (iii) `setAttr(basement)` on a deck shop bends to the same request on the nearest ground building, named `bend.deck.basement`, and the dry run previews that building's basement; (iv) an `instance` add or move into a room with no free slot bends to the nearest room with one, named, and a building with none keeps the item where it was put, reported; (v) the crypt-edit dry runs (V03 §3.7.4): removing a cathedral's crypt by each of its four edits bends to its smallest lawful size (`bend.crypt.cathedral`); enlarging another church's crypt past the cap bends to `crypt.rankShare` × the principal's area (`bend.crypt.largest`); removing a crypt that holds the crypt join lists the join's closing among its fates; removing a dossier-bound crypt is refused; each undoes byte-identically; (vi) the reach bend (V03 §4.2): a `setOpening` closing a room's only door, a `moveWall` and a `splitRoom` that would cut a room off and a `setRoomUnit` leaving a room unreached each bend by `bend.room.unreachable` to the nearest lawful form, every room still reached (T28-2), and undo byte-identically | B-EDIT plan sequences, 10³ per PR |
| T-V3-12 | the clerk: `plan` and `planReport` at `public` over a front with a concealed use return no concealed room, door, head or furniture and each storey's answered areas sum to its extents; at `secret` all; neither query nor `why` writes a log entry or changes a digest; `why` on a room returns its facts, cause and rest, with its heads' causes; the `plan` and `crypt` section providers (V03 §4.6) answer on every church-class fixture — presence, area and form, rank, the crypt join or no crypt (dry and wet) — and on every item-110 fixture, each row carrying one catalogue key per value (`info.crypt.*`, `info.plan.cause.*`, `info.plan.note.*`), no crypt row answering for a withheld building | API test |
| T-V3-13 | exports: each storey's `.dd2vtt` portals equal the plan's openings and entrances at their plan widths (T28-19), a bricked head none and a head whose element is sealed or collapsed none; `line_of_sight` has no segment across a window or opening; Foundry windows pass sight, a locked head's door is locked; the CityJSON file with storeys, units and rooms validates against CityJSON 2.0 and each `BuildingRoom`'s footprint equals its room's ring; the glTF `interiors` file validates, no window gap exceeds its storey's height less 30 cm, and with `interiors` off the file equals the default; the JSON wing record carries `partName` through a save and load, and a document without it re-derives it by V03 §2.5's migration row, each unmatched wing reported; an empty plan exports a block with no storeys and no scene | validators in CI |
| T-V3-14 | draw: every B-PLAN fixture at each detail tier's first stop in `ink`, `lit` and `hatched`: the tier's marks and no finer ones; every opening's gap and leaf inside its wall; flights on the lower storey; one label per room inside its ring or none (§8.3's plan-draw row), no label line below §9.4's range; room numbers in reading order when on; at `public` no enclosed room without an opening and the drawn rooms tile each storey; an empty plan draws its outline with its heads | §13.4's visual regression |
| T-V3-15 | budgets: V03 §6's rows at median and p95 on B-PLAN and B-CITY-lite clicks; the view-cap row on the B-CITY METROPOLIS seeds | the bench, §13.8 nightly |
| T-V3-16 | shared access: every unit's entry door is reached from the main entrance, or from a secondary entrance of the same unit, through circulation rooms and stair cores only — never through a room of another unit or a service room of the use | the door graph, on B-PLAN and T28-13's ladder fixtures |
| T-V3-17 | no abort: over B-PLAN and a household sweep from 1 to each fixture's capacity, no plan aborts for want of room and every household has a unit; the fit ladder's steps are reported | sweep |
| T-V3-18 | floor datums: no door crosses a floor difference above `datum.maxSteps × riserCm`; every door across more than `riserCm` carries its `steps`; wings unjoined by S5 share no core | the stepped-row, slope and mixed-height fixtures |
| T-V3-19 | roles re-roll: `regenerate` with rung `plan.roles` leaves every ring and every `Opening.at`, `widthCm`, `wall` and `kind` byte-identical | B-PLAN |
| T-V3-20 | local = whole: a plan reached by a whole derivation equals, byte for byte, the same state reached through each local re-derivation of V03 §4.2 on an unstored plan | B-EDIT pairs |
| T-V3-21 | declared rooms: a declared room appears on its declared storey or on V03 §4.2's bent storey with its reason, survives every re-cut, marks an unstored plan stale and undoes byte-identically | B-EDIT |
| T-V3-22 | access heads: on fixtures holding one access of each source and cause — II.7.3's fallback cellar stair; an item-64 access; a catacomb entrance in a cemetery's chapel (V04 §3.5.1 (9)); a crypt join (cause `crypt`); an `addUndergroundAccess` into a building with and one without a basement, its door into the other cellar included (both buildings); a lifeline stair; volume 4's L1 chimney air shaft; an L5 institution; item 109's dug `cellar_stair`, `shaft` and `well`; a 10 m catacomb stair; a hovel's shaft; a kitchen well; a solid stack without a basement hosting one access, and one whose access's `ground.at` lies nearest stair 0's flight; a dug access under a crypt-only cathedral — every hosted access has exactly one head, no wall crosses a head, every head fits its storey, no straight bay exceeds one storey's flight, every through-ring is continuous from its head to the lowest storey, and §13.2's T12-1 fixture passes on its plan side; the solid stack's one head has `storey` null, no room and its `door` equal to `stackAccessDoor(b, a)` — on a non-stair ground wing's outline side, at least one module from each end of its door part and its span one module clear of stair 0's approach strip, never in a flight — is drawn (V03 §5.1) and written in the JSON `accesses` with `storey` null, and no VTT or Foundry scene carries it; the crypt-only cathedral's dug head lies in its undercroft, else its crypt, reported `crypt host`; the `stackAccessDoor(b, a)` clause runs from M3a on the eager records (V03 §8's PE), the head's draw and export from P2 | per plan; the door clause from M3a on eager records |
| T-V3-23 | the crypt (J111), on B-PLAN, B-CITY-lite and, at the model level with no plan elaborated, 200 CITY and METROPOLIS seeds: (a) every `always` building, and every building a dossier crypt record binds to, has `Basement.crypt` on every terrain class, `damp` and `flood` included (the raised form), and on a sky island; (b) on derived output the principal's crypt ring is strictly the largest in the settlement; (c) a `basement`-class church has a crypt exactly when it has a `full`, `half` or `walkout` basement, and a `never` class never has one — on wet ground no crypt, its chancel with ledger slabs; (d) no church-class building hosts a catacomb access of source `system`, and every catacomb head in a building with a crypt has cause `crypt` and lies in the crypt; (e) when elaborated, every crypt room covers its ring and every chancel is reachable from the main entrance (T28-2) in all three forms, with choir flights wherever the lift exceeds `datum.maxSteps` risers; and a great temple laid with `top` `flat` (V02 §3.15.4's `stepped-temple` row, or its `tiers` op, V02 §4.6) has a plan holding storey −1 with its crypt room, entered from the door at `basementDoor(b)`, directly or through O2's one crypt join, and no level at or above the ground, and T28-1 holds, the `stepped_temple` row's `chapel` listed under `solidMonument` with no tier; (f) no plan derivation changes `Basement.crypt`; (g) with no building elaborated, the set of volume 4's crypt joins equals the set after elaborating every church (V04's T-V4-50 holds the same clause from the join's side), and every cathedral whose crypt ring lies over a catacomb element draws its join; (h) a crypt-only church whose crypt the rank caps keeps `Basement.ring` byte-identical, its capped bays planned as one `undercroft` room under the crypt's column grid, reached from the crypt through V03 §3.7.5's arch (O2's forced edge), and after the principal's area falls (or the church becomes the principal) its crypt ring re-grows to its step-2 ring and the undercroft is gone; (i) the crypt's step-1 seed region lies under the wings volume 2's `cryptSeedWings(b)` returns wherever it returns any — a ranged church's `chancel`, `apse` or `crossing` part and a stepped temple's tier 0 among them — and in the far third only where it returns none; on the `half` and `raised` rungs the derived crypt ring lies under those wings alone — on a cathedral fixture on a `low` plot whose chancel's inset is below its `cryptM2`, the crypt is reported short and lies under no nave; (j) on a walk-out `basement`-class church — fixtures: a church on a slope falling toward its chancel, its crypt longer than half the nave's axis, capped and uncapped — the outside door at `basementDoor(b)` shares no length with the crypt's vault, else the basement takes the reported `trapdoor` fallback; no outside door opens into the vault, which is entered from the church by its crypt stairs, and O2 joins the crypt to no other basement room but its capped bays' undercroft; every basement room is reached (T28-2); on a flat-topped great temple whose cellar draw gives a basement larger than its crypt, capped and uncapped, the crypt and every basement room are reached from the tomb door through exactly one crypt join; on the stepped great temple with a storeyed ground annex, its crypt seeded under the solid tier 0 — with a requested basement (`Basement.access` ≠ `external`; V02's T-V2-44, its *Basement access* clause) and with none (the basement then taking the ground wings' whole inset, never crypt-only) — the crypt is reached (T28-2) through exactly one crypt join from the room the annex's core or the trapdoor fallback enters, and no crypt its crypt stairs enter takes a crypt join; on a `flood` plot, the same temple's basement is the ground wings' whole inset in the `raised` form, the annex's ground storey clearing it by `crypt.clearCm` (V02's T-V2-36), its crypt reached through one crypt join; on a capped walk-out church with a cellar, no tree path joins the crypt or its undercroft to a cellar room, the undercroft reached from the crypt through V03 §3.7.5's arch; the door clause and the basement's extent run from M6-U on the eager records, the reach from P2 | model-level test and per plan |
| T-V3-24 | buildings below ground: on §13.2's T12-1 fixture and a ruin-dwelling fixture, no window, stack or basement on an underground building; every hearth has a flue to an air access within `hearth.flueReachM` or is a reported brazier; no wall crosses a ruin column; every frontage entrance faces `tunnel` | per plan |
| T-V3-25 | slots, halves and composer rooms: in the three-slot inn only the main slot holds the common room and the stable block holds its stable; the smithy's separate dwelling takes the `house` row; the split brewer's works holds a brewhouse and no taproom, its shop a taproom and no brewhouse, and a merge back onto one plot marks both plans stale; every composed `gatehall` and `towerRoom` resolves, and the court of a closed family is reached through the gate hall's arches; a rich manor whose occupants fall to the poor band has no `hall` or `solar` room and houses at least three units — the `poor` row's least households per shell (§2.6's interior ladder) — in its main range; a closed family whose composer omitted its gate hall (V02 §3.13 F-COMPOSE (3)) still has a `gatehall` with both arches, and an omitted `towerRoom` is still present on every storey its wing reaches; every composer room keeps the `rooms` rung's id, no two rooms of a level share an id, and a stored plan's re-cut that adds a room mints it above the level's highest id; every core and chimney id names its wing by key and survives the removal of another wing unchanged | the named fixtures |
| T-V3-26 | fill and vacancy: the rich shell with one household leaves no storey with spare capacity above the smallest fill target; the `squalid` tenement at capacity houses every household at `room` or better; the vacant house's plan has every room scope `service`, no unit and no furniture, labelled by role | the named fixtures |
| T-V3-27 | tiers nest: every room lies inside the extent of a wing reaching its level; no room, anchor or head lies in a solid wing; each stacked wing's `floorCm` at `s₀` equals `deckLevel` of the wing it stands on within 1 cm, and each wing's storey heights sum to its storey run exactly; each storey's rooms tile the extents of the wings reaching it (the fourth rung); no crypt stair or head descends through a solid wing; the arena's basement is reached by a core in a storeyed range, never by an outside door, and the stepped temple's by the tomb door; on every stepped-temple fixture the shrine's top storey holds exactly one room, of role `chapel` | the stepped fixtures and the arena |
| T-V3-28 | reach on a stack: every storeyed wing's rooms are reached from the root through cores, landing doors, terrace exits or terrace doors (T28-2); every `stairChain` flight whose head meets a storeyed wing has its landing door; no core bay lies outside the extent of a wing it serves; no entrance door stands more than `datum.maxSteps × riserCm` from its outside ground, the main entrance's stoop excepted and reported; on a solid stack with a stair chain the main entrance stands at stair 0's foot (§2.6 *Entrances* rule 5) with `storey` null and the plan's root is the first landing door; the sealed stack reports `W_TIER_UNREACHED` and nothing else fails | the stepped fixtures |
| T-V3-29 | terraces: every walkable terrace touches a landing, an exit or a door; no terrace polygon overlaps a room of its storey; every storeyed stacked wing standing on a flat roof has a landing or terrace door; no room under a terrace or a flat roof has a dormer; each storey's `.dd2vtt` scene with a walkable terrace has the terrace's floor in its image and each of its doors as a portal (validator); a building with no storeyed wing and no basement has no storey in its plan (its heads only, each `storey` null), no switcher and no failure, and one with a basement plans its basement storeys alone; on the flat-topped great temple T28-1 holds, the `stepped_temple` row's `chapel` listed under `solidMonument` with no tier | the stepped fixtures; a flat-topped solid pyramid; the flat-topped great temple |
| T-V3-30 | exposure: no window's sill lies below its outside ground; no door or entrance lies more than the tolerance from its outside ground (the main stoop excepted); every building with a footprint side within `cellar.insetCm` of a retaining wall's high side whose step there is at least half the cellar depth, and whose class draws a basement, has a walk-out on that side; a rear entrance onto an upper terrace's street opens on the storey whose floor meets it; a half cellar's floor lies at the datum less half the cellar depth within 1 cm, its walls take their `light` windows and the main entrance its stoop; a pitched roof set on a lower tier by `setAttr(wings/<key>/roof)` makes no terrace and a tier set flat makes one; on the terrace-wall sub-fixture, whose plots S10–S11 level, every ground sample W2 reads equals `levelledGroundCm` at its point — the platform datum on a levelled plot and on each side of the wall, never the unlevelled raster there — so a build that samples the raster fails the walk-out and entrance-storey clauses; re-levelling a plot beside a stored plan re-cuts it (the outside digest); every external basement's outside door lies at `basementDoor(b)`, and every wall walk-out's door is on the wall's side — its ring side's door point within `2 × cellar.insetCm` of that wall's high side — or, where no ring side there is a door run, the basement is joined by the reported `trapdoor` fallback; on item 110 (e)'s terraced wards and the terrace-wall sub-fixture, with their wall and fall walk-outs, every room of a walk-out basement is spanned from the room its outside door opens into (O2's basement root), none tier 1; on a downhill-fronted walk-out house — its street along its low side, 130 – 250 cm of fall at its main entrance, the fall under its footprint past `cellar.slopeCm` — the main entrance's `Entrance.storey` is 0, never a basement level, opened with its stoop (O1 (e)), the basement entered by its outside door at `basementDoor(b)`, and every room of every storey is reached (T28-2); after `setAttr(basement)` changes that basement's access, kind or floors, every entrance's `storey` equals a fresh derivation's (§2.6 *Entrances* rule 4); the entrance-storey and walk-out clauses, `basementDoor(b)` included, run from M3a on the eager records (V03 §8's PE), the plan and reach clauses from P1 | item 110 (e)'s terraced wards and ravine of stepped housing; the terrace-wall sub-fixture; the two-street house; the downhill-fronted walk-out house; the half-cellar house on wet ground; the stepped fixture with its roofs edited |
| T-V3-31 | decks: no basement, head or well in any deck building, the mole-head tower included; every deck building's level-0 floor equals its deck's `surfaceCm` within 1 cm; a ruined deck's buildings draw as V03 §5.1 states and a removed deck's draw nothing; `setAttr(basement)` on a deck shop bends to the nearest ground building with a basement request, named | the bridge-deck row, the jetty shed, the mole-head tower |
| T-V3-32 | grade faces and the aqueduct's end: the vault building's grade face (`gradeFaces`, V04 §3.5.4 (f)) has its entrance and windows; no `tunnel` face lies on a grade face; every hearth has a face flue, an air-access flue or a brazier; removing the viaduct previews the stored plan's loss and undo restores it byte-identically; the conduit house holds a `cistern` and draws its inlet mark where the aqueduct ends within snap | the viaduct and aqueduct fixtures |
| T-V3-33 | tier edits keep the author's rooms: on a stored terraced palace with a named room, a locked room and a placed item in tier 2, a `tiers` edit adding a storey to tier 0 keeps all three with their ids at their new levels; removing tier 2 lists them in the preview; each undo restores the plan byte-identically | B-EDIT |
| T-V3-34 | item 110's no-op pin (item 110 (f)), its first clause the `item110.*` `NoOpPin` over B-PLAN's and B-CITY-lite's plans, registered on V12 §3.7.8's engine by the P1 seat under the pins V12 §2.13 lists it (its off form V11 §3.24.0's, `exposureAllStoreys` false among it): with no stacked or solid wing, no `RetainingWall`, no deck plot and no raised way, and with `exposureAllStoreys` false, every B-PLAN and B-CITY-lite plan is byte-identical to the plan with this volume's item-110 paths (the level reading's stack cases, S5 (a), S6, V03 §3.4a, the exposure gates, `Entrance.storey`'s ground reading, V03 §3.7.2 (0), V03 §3.12 (9)) removed; with `exposureAllStoreys` true the only differences are windows and entrances on walls whose outside ground lies above their sill or outside the floor tolerance, each listed — the recorded realism change of J-V3.84; from M3a, before any plan exists, the same pin holds on the eager records V03 §8's PE builds: with `exposureAllStoreys` false every `Entrance.storey` is 0 where `ground(b)` exists and no entrance is dropped, and with no `RetainingWall` and no solid ground wing `basementDoor(b)` takes rule 3 only | B-PLAN, B-CITY-lite; from M3a, their eager records |
| T-V3-35 | the B-PLAN calibration statistics (J-V3.118) — the bar V03 §2.4's register lines name as `bar.T-V3-35`, registered there as a V12 `BenchBarDef`; four clauses, each a share, in this order: (i) of the delivered rooms of every role whose area is not `ring`, the share whose area lies inside the role's [min, max] × the ladder row's `sizeFactor` (A3; the resolved row's override where one is set) — pass ≥ 0.90; (ii) of the households on the fixtures and on a household sweep from 1 to 80 % of each fixture's capacity, the share whose unit is built at its asked form (`PlanReport.units`, `built` = `asked`) — pass ≥ 0.95; (iii) of the cores of buildings on the `house`, `row_house` and `cottage` class rows and the families taking them, the share whose kind S4 dropped to `ladder` or `trapdoor` where the resolved row asked another kind — pass ≤ 1/90 (parity row (d′)'s target made a clause); (iv) Σ `PlanReport.furnitureSkipped` ÷ Σ F1's `n` over the furnished rooms — pass ≤ 0.10, −1 and left out of the verdict until P2 lands F1–F4; the verdict passes when every clause that applies passes (thresholds `own`) | B-PLAN's fixtures and B-CITY-lite, every building's plan derived by the `plan` query (V03 §4.6); at V3-P6's exit (tier `milestone`) |
| T-V3-36 | edges at their limits (V03 §3.13; principle (11)): (a) a wing whose run is below one riser per storey is planned solid with `W_STOREY_RUN`, its rooms on other wings, every wing standing on it keeping its levels; a heights row with `G + (n − 1) × U` = 0 gives equal storeys; a basement under ground wings of different `baseCm` lies below the lowest; (b) a storey whose wings reach no level has no storey; a one-piece, one-target storey is that room; a seed piece a fixture's edited wing makes degenerate is left out, its targets re-allocated and reported, no other building re-derived; (c) a wing with no flat roof makes no terrace; a degenerate terrace face is roof; save, load, undo and redo of a stepped plan re-derive byte-identical terraces, a regenerate re-derives them with its plan, and a migrated document re-derives them at read equal to a fresh derivation (none is stored); (d) a stored plan with every migrate-cell absence reads its default; a head whose access was removed, furniture whose room was re-cut away and an opening whose wall is gone are re-derived or orphaned and reported; a table cell outside its type fails load (§7.6); (e) a wall shorter than a door and its jambs holds no door, a side with no bay no window, and a room with no wall long enough to a neighbour takes O5's strip or is tier 1, reported; (f) B-CITY-lite at THORP, HAMLET, VILLAGE, TOWN, CITY and the METROPOLIS cap, the village fixtures included, every building clicked: no plan aborts, T28-1 and T28-2 hold, a rung with no `always` building has no principal crypt and no trim, and the METROPOLIS view holds `view.planCap`; (g) furnishing with `n` = 0 places nothing, with `n` = 1 one glyph, on an empty free floor skips every item (counted), and a glyph with no `FurnitureRow` is skipped (counted); (h) an empty plan and a one-draw plan are byte-identical across two runs and across a whole derivation and a local re-derivation; (i) a re-cut whose prior room's seed piece became degenerate or vanished cuts it as new (unstored) or orphans it with its parts (stored), reported, and a kept opening whose wall is gone is removed, reported; (j) an underground building with no basement, with one grade face, in a chamber with none and with a grade face shorter than a door run holds windows and doors only on usable grade faces, its frontage entrance at its vertex; (k) an edit whose geometry the kernel refuses bends to the nearest lawful position or ring, named, and undoes byte-identically, and save, load, undo, redo, regenerate and migrate of each edit kind leave the plan byte-identical to a fresh derivation of the same log; (l) a warp that collapses a stored room's carried ring orphans the room with its parts, reported, the plan re-cut around the rest; (m) an absent, one-storey, empty and stale plan each show V03 §4.5's state, and a building smaller than the frame stop fills is framed inside `view.frameStops`; a plan reporting each `PlanReport.warnings` code shows one panel line per entry under its `report.plan.<code>` key, every code of V03 §2.3's union having its line; (n) `plan` on an empty plan returns no storeys, with a `storey` the plan lacks `noStorey`, and after an undo, redo, load or regenerate an answer equal to a fresh derivation's, writing nothing; (o) an empty plan's picture export is its outline with its heads and no storey sheet; (p) one concealed room merges into its neighbour and a wholly concealed storey draws as one public room at a public key; (q) an empty plan, a one-room plan and a building whose class has no row (the fallback, reported); (r) on the cliff-edge row no basement door opens over the drop (the trapdoor fallback or another side, reported) and no window lies below its ground; on the shore, moat-side and oasis fixtures no door opens onto water, no cellar stands on wet ground but an `always` crypt raised, and other churches there have ledger slabs; (s) a building at the frame's edge reads every sample inside the context margin, and an epoch's frame growth leaves every plan's outside digest unchanged (under the re-grid fallback the digests move and each plan goes stale or is re-cut) | the edge fixtures of B-PLAN, B-CITY-lite at every rung, B-EDIT sequences |
| T-V3-37 | the plan's one-time waits (item 119 (f)'s plan clauses; V03 §6), on §12.1's reference machine, five seeds per wait at every rung's top and at the metropolis cap, each timed from the click to the complete result: (a) a dossier change applied on B-EDIT's reference CITY document (§12.6) given a stored plan on every building of its largest district, its re-homing `relet`ting each of them by one household, so that every stored plan is re-cut inside the event; (b) every plan export of the tallest B-PLAN fixture (the terraced palace's eight storeys) — the SVG storey and all-storeys sheets, the PNG sheet at the export dialog's largest offered size, the `.dd2vtt` and Foundry scenes per storey — and the whole-document JSON, CityJSON and glTF `interiors` with the elaboration cache at its §12.8 cap; (c) a load migrating a document written before M6-U (every `always` and `basement` building's crypt re-derived) and one without `BaseWing.partName` — each within the comfort level (§12.1; T119-2); every such wait past one second shows V09 §4.21.9's progress within a second of the click, never an empty screen (T119-3); every plan step slower than its V03 §6 or §12.7 target has its `perf.qualitySpend` row with its recorded gain, none at shipping (T119-4); the click and a stale chain's derivation, the storey switch, `elaborate: 'view'`'s frame share, Find's room reading and a plan edit's preview hold their V03 §6 and §12 rows, none relaxed against the previous release (T119-5; V12 §3.15.9 (5)); an epoch's re-cuts are timed by volume 6's part of item 119 | §12.1's timing phase with V12 §3.15.9's wait timer (`wait.dossierChange`, `wait.export`, `wait.migrate`), nightly; clause (b) from P5, the rest from P6 |
| T-V3-38 | Find at the interior band (item 120 (k)'s plan clauses; V03 §5.5), on B-PLAN's fixtures and B-CITY-lite's clicked buildings with chip sets of one to twelve chips: (a) the model digest, every stored plan, cache chunk and `PlanReport` and the saved bytes are identical with Find on and off, and Clear leaves every plan tile byte-identical; (b) `findRooms` returns exactly V03 §5.5 (1)'s set — a `smithy` chip on the smithy with a separate dwelling glows its work building's programme rooms and no room of the dwelling, whose outline alone carries the halo; the split brewer pair glows the brewhouse in the works and the taproom in the shop; a `church` chip on the cruciform church glows its programme's rooms and its crypt; a person's chip glows their unit's rooms; a custom service glows its sub-location's rooms; no `circulation` room glows for a use or a household; (c) at `public` a front's concealed use is offered as no chip and no concealed room glows, a merged room glowing only as its public reading, and at `secret` its A2 (6) rooms glow; (d) on a storey without the match's rooms the building's outline glows and the switcher marks exactly the storeys that hold them, each with its chip's glyph and its accessible name's count, and a building whose plan does not draw glows whole; (e) after a `relet`, a `setRoomRole`, a re-cut, an undo, a regenerate and a load the glowing set equals a fresh reading, and a chip set survives every storey switch and every stop of the building band; (f) an SVG storey sheet with Find on carries `plan.find` and the chips in its legend, with Find off equals the Find-less export byte for byte, and a `.dd2vtt` scene carries no Find unless asked, then in its image only; (g) at the METROPOLIS cap under `view.planCap` a chip's glow over the drawn plans lands within item 120 (j)'s 100 ms (V03 §6's Find row) | B-PLAN, B-CITY-lite and volume 9's app harness; at Find's landing (V03 §8) |

**Parity against the reference that owns the subject (Dwellings; descriptive rows, research-side, never `baselines.json`
rows — §13.5's note):** (a) *programme realisation* on the twelve footprints the Dwellings exports lane decoded, fed as
wings at 2 m per cell with their programmes **translated into our role names and counts by a research seat** (J-V3.61:
the file `research/fixtures/dwellings-ab.json` — each footprint as wing rings in cm and its programme in our roles, with
its provenance, passed through §17.1 (5)'s scan; the builder receives only that file and never the reference's lists):
hard rooms realised 12 / 12, all items ≥ 90 %, against the reference's 79 of 157 (`research/findings/dwellings-synthesis.md`
§6 (4), §7); (b) *stairs stacked* 100 % against the reference's stated floor-pair failures; (c) *public → private depth* —
hall, then parlour or living room, then chamber, ordered by median door depth from the main entrance in ≥ 90 % of houses
(the reference's medians 1, 2, 6 as the descriptive baseline); (d) *room-size order* by role matching the reference's
ordinal order (store < kitchen < chamber < parlour < hall) in ≥ 90 % of houses, the Spearman bar of §13.7 per building;
(d′) *the trapdoor rate*: at most 1 house in 90 falls to a `trapdoor` core, the reference's rate as the target, reported
(T-V3-35 (iii) holds that target as a bar clause at V3-P6); (e) *storeys inside the storey below* (the plan side of
Dwellings' upper-storey setback, docs/confidence/dwellings.md B3): on the stepped fixtures every storeyed level's rooms
lie inside the extents of the wings reaching the level below it — hard, 100 %, with the reference's 17 of 17 exports as
the descriptive baseline — and each smaller storey's rooms per m² lie within ± 25 % of level 0's (descriptive).
=== END ===

=== REPLACE ## 8 Build plan ===
## 8 Build plan

**The order** (V03 §11 Q1, decided by J122; J-V3.132). P0, P1 and P3 run on the base's buildings after M4, beside M5, the
village and M6-E; P2 runs once volume 4's access records exist (M6-U); P4–P6 follow volume 2's M6 — M6-P's row in §16
and INDEX §3–§4. The rung reads a composition where one is stored or composed, else the base's wings (§2.6's clip order
treats both), so it takes volume 2's composed wings, composer rooms and dormer rows when M6 lands, with no rework. M6-P's
first landing, before M6, creates the `@plat/buildings` package with the plan rung alone (§14). Every exit that lands a
calibratable cell runs **the register check** — `plat calibrate register --check` green over the cells it lands 
(V12 §3.11, T-V12-20), their entries V03 §2.4's register lines, else V12 §3.11's default line. Estimates in person-weeks,
PLAUSIBLE, for the builder tier with a verifier seat.

| milestone | content | exit (executed) | pw | depends on |
|---|---|---|---|---|
| **PE — the plan rung's eager facts** (J-V3.116) | built into the base within M2b and M3a, not the plan package: **at M2b**, `R(s)` in §2.6's *One capacity function*, with the cells `stair.ladder` and `stair.landingCm` shipped in the base's `roomProgram.json`; **at M3a**, in S11 with item 110 (a), (c) and §2.6 *Entrances* rule 5: `Entrance.storey` with its tolerance cells (`datum.maxSteps`, `stair.riserCm`) and `exposureAllStoreys`, rule 4's non-derivation and V03 §3.6's storey rule; the wall walk-out and `basementDoor(b)` with `doorRunPoint` (V03 §3.7.1) and the cells `moduleCm` and `door.mainCm`; `stackAccessDoor(b, a)` (V03 §3.7.2 (1)) on `moduleCm`; `basementDoor(b)`'s crypt clause is built at M6-U with the crypt derivation, inside its price, its first reading declared in M6-U's shift record (J-V3.125), its door clause of T-V3-23 (j) at M6-U's exit; and the pure readings they need — V03 §3.3's level reading (`ground(b)`) and storey heights (`floorCm`) and W2's outside-ground sample (V03 §3.6) — exported from `@plat/plots`, which P1 imports | at M2b: the capacity with `R(s)` on T28-13's ladder fixtures and the re-homing on an edit of `stair.ladder`, `stair.landingCm` or the `room` role's minimum (V03 §2.5's table row); at M3a: T-V3-30's entrance-storey and walk-out clauses (`basementDoor(b)` included), T-V3-22's `stackAccessDoor(b, a)` clause and T-V3-34, on the eager records of the terrace-wall sub-fixture, the two-street house, the stepped fixtures and B-CITY-lite; at each, the register check green over the cells it lands, on V12 §3.11's default line (V03 §2.4's register lines) | 0.75–1 (M2b 0.25; M3a 0.5–0.75), moved from P1 | the base's *One capacity function* (M2b); item 110 (a)'s `RetainingWall`s and levelling with volume 1's `stepProfile` and `levelledGroundCm`, item 110 (c)'s stacks through volume 2's M3a-V2 (`storeyRange`, `deckLevel`, `BaseWing.on`, `.solid`, `stairChain`) and *Entrances* rule 5 (M3a) |
| **P0 — B-PLAN spike** | the synthesis's first experiment (`dwellings-synthesis.md` §6): 24 fixtures, six classes, three bands; A1–A6 with the fit ladder, anchors, `bisect`, `follow`, `spine`, `hall_and_parlour`, O1–O5, F-PLAN; the Dwellings A/B of V03 §7 (a) on the research seat's translated fixture (J-V3.61) | V03 §7 (a)–(d′) measured; T28-1 – T28-4, T-V3-16, T-V3-17 green; V03 §6's per-storey row measured with its fallback decided | 1.5–2 | M4; the base's transient arena (§3.4; priced in §16's unpriced-mechanisms line), M2b's entrances and basements; the fixture file |
| **P1 — the rung on any wings** | every pattern and `lodgings`; the per-piece rule and the cut machine on bent pieces; S1–S5, H1–H4, E1–E2; floor datums; W1–W4 on volume 2's façade bays (moved forward from its M6b, imported from `@plat/plots`, priced there; V03 §3.6 W2); every row of V03 §2.4 (role, class, family, slot, class-id, village, tables); `PlanReport`; the chain, the kept-room and kept-opening tests; **item 110** — the plan's uses of the level reading, `ground(b)` and the storey heights (their functions imported from PE), the storey run's limit, chain cores (S5 (a)), S6's joins, the roof terraces (V03 §3.4a), stacks through tiers, the window and door exposure gates, the basement door opened at `basementDoor(b)`, the stepped, `conduit_house` and `arena` rows (`Entrance.storey`, the wall walk-out, `basementDoor(b)` and `R(s)` are PE's); the composition clauses — A2 (11)'s composer rooms, W4's `DormerRow` counts, O1 (b)'s court door — run on composed wings from volume 2's M6 | T28-1 – T28-6, T28-13 – T28-17 (F-PLAN clause), T-V3-1 – T-V3-7, T-V3-9, T-V3-16 – T-V3-20, T-V3-25 – T-V3-29, the plan clauses of T-V3-30 and T-V3-34 and T-V3-36 (a)–(c), (e), (h), (q) on B-PLAN, T-V3-25's composer clauses from M6; the known-city click set; the register check green over the cells it lands, T-V3-35's `BenchBarDef` registered and the `area` column's entry restated (V03 §2.4's register lines) | 4–5.5 | P0, PE, M4; volume 2's item-110 fold (`storeyRange`, `deckLevel`, `stairChain`, `landingSide`) and façade bays; volume 2's composer (M6) for composed wings; volume 11's registry (class ids, families, `staff`, `split`, `HeightsRow`); item 110 (a)'s `RetainingWall` |
| **P2 — basements, heads, the crypt, concealment, furnishing, below ground** | V03 §3.7 but the crypt's derivation (heads of every source, the secret head's room, the crypt's plan and columns, crypt stairs and choir flights, the crawl hatch, the core's join and the tomb door, O2's crypt join and closed vault, the deck rule; `stackAccessDoor(b, a)` is PE's); V03 §3.12 with its grade faces; the concealed sub-graph and V03 §5.4's merge; F1–F4 and the catalogue; and P3's parts that read these — `setAttr(basement)`'s underground preview and the crypt-only basement edit, the crypt-edit dry runs (V03 §3.7.4), the panel's ways down and crypt line, the room why's head causes and the `crypt` section (V03 §4.6), priced in P3's range. `Basement.crypt` with its seed, growth, rank and the stair-entered reading that sets the basement's extent (V03 §3.7.4) is built at M6-U (§2.6; volume 4's crypt derivation line) | T-V3-8, T-V3-10, T-V3-22 – T-V3-24, T-V3-31, T-V3-32, T-V3-11 (ii), (v), T-V3-12's crypt clauses, T-V3-36 (d), (g), (i), (j), (p), (r); the concealed-institutions row of the base's §5.3; T12-1's plan side; the register check green over the cells it lands (V03 §2.4) | 3–4.25 | P1; volume 4's access records (U-SYS, U-ACCESS, U-LINK, U-DIG) and item 64's, and its `archVault` chambers with `gradeFaces` (M6-U); volume 11's crypt column and rows; the crypt derivation and volume 2's lift (M6-U — the crypt's plan and T-V3-23's plan clauses run from that landing) and the deck gate |
| **P3 — editing, the click and the clerk** | the plan tools with their bends; `setHearth`, `moveStairCore.kind`, `instance` on a room, the attribute paths, `declaredRooms`, the deck bend; New random per rung; carries under warps (§2.6's test with stored furnished plans); the wing-relative re-match under volume 2's `tiers` op and its orphan preview, the retaining wall's stale mark and re-cut, the raised way's removal fates; the storey switcher with stack names, the panel with item 110's lines and room numbers; the clerk's queries, the `WhyProvider` with item 110's causes and the `plan` section — the parts that read P2's heads and crypt land with P2 (above) | T28-6, T28-7, T28-9 – T28-12, T28-18 (`setRoomUnit` clause), T-V3-11 but (ii) and (v), T-V3-12 but its crypt clauses, T-V3-21, T-V3-33, T-V3-36 (k)–(n) | 3.25–4.5 | P1, M4; §7's editing core (M2a–M3a); volume 10's registry |
| **P4 — the draw** | the building band's stops (§8.8) and the detail ladder, every mark of V03 §5.1 in `ink`, `lit`, `hatched` and the ink variants, `planWallShade`, labels, numbers, lights, the Works and ruin drawings, the underground band's plans; terraces, exterior flights, the stoop, the cistern and inlet mark, the deck's fall; the view cap | T-V3-14; §8.2's plan-draw row; V03 §6's view-cap row on the B-CITY METROPOLIS seeds; T-V3-36 (f) | 2.25–2.75 | P1; §8's building band (M2b); M6 (the decided order) |
| **P5 — exports** | the JSON block (with `terraces`, entrance storeys, flights, `inlet`), SVG and PNG with the all-storeys sheet, `.dd2vtt` and Foundry per storey (terraces, landing portals, linked flights, roof levels), CityJSON storeys at their true elevations, units and rooms, glTF interiors | T28-19, T-V3-13, T-V3-29's export clause, T-V3-36 (o) | 1.75–2.25 | P1, P4; §11's exporters (M3b) |
| **P6 — content and tuning** | the role, class, family, use and catalogue rows and the unit floors tuned on B-PLAN and B-CITY-lite — never the `room` role's area (V03 §2.4's first register line: measured, never tuned) or a class row's poorest-band `circulation` (V03 §2.4's PE line), which §2.6's capacity reads; the soft bands; the owner's panel of twenty plans (six classes, three bands, a church with its crypt) side by side with Dwellings houses of like size — V12 §3.9.1's `PanelSpec` V3-P6 (DW 20), as V12 states it; under J122's sittings its build lands after M5, so the panel runs unrated, its bars "provisional — not rated" (§13.6 (7)), never blocking | §13.7's plan soft bands; T-V3-15; T-V3-35, which confirms V03 §2.4's `measure` entries or opens their fallback, no V03 entry left `provisional` past V3-P6 | 2–3 | P1–P5 |
| **total** | | | **18.5–25.25** | |

**Items 119 and 120** (J-V3.133, J-V3.134). T-V3-37 times the plan's share of the one-time waits at P5's exit (its
exports' clause) and P6's (the rest) on V12 §3.15.9's wait timer, inside those milestones' prices. The plan's part of
Find (V03 §5.5) — `findRooms`, the switcher's and the panel's marks and the SVG `plan.find` group — lands with the later
of P5 and the milestone that lands Find (V09 §8), inside P4's and P5's prices (one pure reading over the plan's wall
records, two marks and one SVG group), its exit T-V3-38.

**Against the parity assessment.** docs/confidence/dwellings.md's capability matrix sums to 20.0 pw for
Dwellings-alone parity (its rows A1–H2, D7 excluded). This volume builds none of rows B1 (ground-plan drafting, 0.8), B2
(storey count, 0.2), B5 (footprint hand-off, 0.4), D4 (naming, 0.3), E6 (roofs, 1.0), E7 (elevation, 1.5), F1 (blueprint
editor, 0.3), G3 (hand-off contract, 0.3) or A1 (parameter surface, 0.3), nor the massing half of B3 (upper-storey
setback, 0.2 of its 0.4) — together 5.3 pw: footprints, storeys, setbacks and roofs are volume 2's and the base's, naming
volume 11's, the editor and parameters volume 9's and the base's, and the elevation is dropped (J-V3.19). B3's plan half —
a smaller storey's containment and partition, and the exposed roof — is this volume's since item 110 (c) (parity row
(e)). The rows it does build sum to 14.7 pw, plus D7's 1.5 pw (the typed, programme-first method this volume's programme
is) — 16.2 pw at the assessor's pace. The remaining 2.3–9.05 pw of this volume's 18.5–25.25 pay for what parity does not
ask: the interior ladder and its re-cuts, the resolution over every registered class, the editing contract (events,
bends, undo, stored plans, carries), the VTT, Foundry, CityJSON and glTF exports, the clerk and "why", the ways down, the
crypt and the buildings below ground, and item 110's stacks, terraces, hillside exposure, decks and vaults (1.75–2.5 pw).

**Risks, in order** (the synthesis's list, §6, answered here): packing a programme into bent or L wings (A5's trimming
before any cut, P0 and the exact `slice` before the pattern, tiers 2–5; measured at P0); small wings against a stair bay
(S4's kind fallback; parity row (d′)); institutions (per-class rows, `nave` and its strips, the crypt's stairs); the
mutation operator (the kept-room and kept-opening tests; T-V3-9's survival figure); the building band's legibility (the
stops, the detail ladder; P4's visual bars); the budget of `slice` (bisection, never cell enumeration; P0 measures); the
shared-access strip in tight shells (its fallback; T-V3-16 on the ladder fixtures from P0); stacked buildings (a chain
core that fits no whole chain, a terraced palace's budget; S5's prefixes, S6's joins and V03 §6's module fallback,
measured on the stepped fixtures at P1). **Spikes:** P0 is the spike; its pre-decided fallbacks are V03 §6's and V03 §3.9's.

**Where in §16's order** (J-V3.109). The base prices the plan rung's hooks (§16: O9's +2 and the transient arena); the
rung itself is §16's milestone **M6-P — the plan rung**, carrying P0–P6 and 17.75–24.25 pw of this volume's
18.5–25.25 on the effort table's line "plan rung (volume 3)"; PE's 0.75–1 pw is built within the base's M2b (0.25) and
M3a (0.5–0.75) and counted in those rows, inside §16's first total. The crypt derivation's price is M6-U's (volume 4's
line). §16 computes the totals once; this volume states no total of its own.
=== END ===

=== REPLACE ## 9 Decisions (each vetoable) ===
## 9 Decisions (each vetoable)

One row per decision; an amended row carries one mark naming the row that amends it, which keeps the reason.

| id | decision |
|---|---|
| J-V3.1 | Chose one role table that every programme resolves through, with class and use rows overriding only the cells they set, over repeating each room's cells in every class-and-band row, because the interior ladder names its roles across all classes and the repeat would state one fact about a hundred times (single source). |
| J-V3.2 | Chose to pack `lodging`, `apartment` and `room` units from the top storey down over bottom-up, because the poorest historically lodged highest (garrets) and the ground storey keeps the shop, the shared kitchen and the stair hall hub (§2.6's shared-room placement). |
| J-V3.3 | Chose to divide `dwelling` units by storey first, then by wing, then side by side around a lobby, over wing first, because the stair hall already gives each storey its own door, so no corridor is added — item 28 (f)'s "separate floors or wings" in that order. |
| J-V3.4 | Chose anchors placed by a total candidate order that reads no stream over drawn anchors, because §6.1 promises a layout re-roll keeps the stair core and §5.1 requires tier-2 repairs to read no stream. |
| J-V3.5 | Chose the stair-kind fallback dogleg → straight → winder → ladder → trapdoor over refusing the plan, because a narrow row house or cottage historically took a steeper or winding stair or a ladder rather than no upper storey. |
| J-V3.6 | Chose the stack preference back to back on a cross line, then party wall, then gable, then any exterior wall, then a smoke hood on a joint, over one fixed rule, because it is the historical order of town-house chimneys (the lobby-entry plan, shared party stacks) — the realism tiebreaker. |
| J-V3.7 | Chose stacks as vertical fixed rings from the lowest hearth to the wing's top, offered first to the hearth rooms above, over hearths placed storey by storey, because a flue is continuous and the owner's coherence rule puts chimneys over hearths (item 28 (a)). |
| J-V3.8 | Chose one cut primitive — an area-targeted straight cut found by bisection on the module — over grid packing or a treemap, because it is O(log cells) per cut, exact in `area2`, lattice-clean, and answers the synthesis's O(cells²) warning. |
| J-V3.9 | Chose roles assigned by the programme as pieces are cut, with `plan.roles` re-dealing roles only inside exchange classes that leave the door graph's costs, kinds and widths unchanged (P7), over a role search after the cut, because function first is the owner-adopted inversion of the reference (item 28 (a)), a search is the reference's own cost centre, and §6.1 and T28-6 require a roles re-roll to move no wall or opening. |
| J-V3.10 | Chose a priced tree from the main entrance plus loops by O4's rules over random extra doors, because item 60's ruling keeps ours and a loop must have a reason (a service route, an enfilade, the master's door into his shop). |
| J-V3.11 | Chose a door's hinge and swing derived by rule over leaving them undrawn, because the VTT door bounds, the drawn leaf and furniture clearance all need them, and a rule keeps them deterministic. |
| J-V3.12 | Chose plan-local ids for walls, openings, windows, cores, chimneys, heads and furniture over registry entities, because a click must mint nothing (§6.2) and a stored plan's parts are re-matched by rule (V03 §2.2). |
| J-V3.13 | Chose one window bay grid per wing side, shared by every storey, over per-room window placement, because windows then align across storeys by construction (§2.6 step 6) and the façade reads as built. |
| J-V3.14 | Chose furniture as plan values edited by the existing `instance` event over a new furniture event, because item 101 forbids a new tool and `instance` already adds, moves, removes and restyles instances by entity and ordinal. |
| J-V3.15 | Chose a new `setHearth` event over deriving hearths from roles alone, because a stack is geometry a roles re-roll must never move (§6.1), so moving it must re-cut, which no role event may do. |
| J-V3.16 | Chose eight building-band stops to ≈ 1:125 over drawing plans at 1:500, because at 1:500 an 80 cm door is ≈ 6 px — below the legibility floor. |
| J-V3.17 | Chose CityJSON rooms at LoD1 and a glTF `interiors` option off by default over leaving interiors out of 3-D, because every entity kind is exported and the default files and budgets stay unchanged. |
| J-V3.18 | Chose the crawl space's hatch in the room over the lowest footprint sample over a drawn position, because a hatch belongs where the void is deepest and a rule needs no stream. |
| J-V3.19 | Chose no elevation view over Dwellings' elevation, because elevations are the 3-D export's (§11.1) and the synthesis names it scope creep (risk 10). |
| J-V3.20 | Chose the building band's threshold at the stop nearest 1:700 over 1:500, so a clicked building is framed with its plot and neighbours before the plan's own stops; the detail ladder (J-V3.56) keeps the coarse stops legible. |
| J-V3.21 | Chose the plan report as non-canonical data in the elaboration chunk over a report record in the model, because a click writes nothing canonical (§6.2) and the report is a function of the plan. |
| J-V3.22 | Chose our own role areas, historically plausible for 12th–15th-century Western Europe (a hovel's room 9–14 m², a hall 16–40 m² and a hall class's 40–250 m²) and ordered as Dwellings' measured medians order its roles, over the reference's cell counts, because the reference has no scale (`dwellings-synthesis.md` §2.5); the four density cells equal to the reference's measured medians are marked as such; calibrate-later at P6. |
| J-V3.23 | Chose a roof storey only where `Heights.floors` counts it over inventing attics, because storeys are the shell's fact (§2.6) and the plan never adds shell. |
| J-V3.24 | Chose the kept-room test's best fit (nearest target, then list order) over first fit, so a re-cut keeps the most rooms in the roles they fit best (least disruption, item 28 (f)). |
| J-V3.25 | Chose `lodgings` as an allocation variant of `bisect` over an eighth `LayoutPattern` value, so the base's type is unchanged and no weight row can draw it where A5 does not ask for it. |
| J-V3.26 | Chose the resolution specialisation → class id → split or template family → building class → fallback over keying programmes by §2.6's eighteen building classes, because volume 11 fixes the programme key as the class id and scales work by specialisation per band, and every registered class then finds a row. |
| J-V3.27 | Chose to recompute a stored plan's report on demand from `Plan.program` against its rooms over storing the report, because a stored plan keeps no cache chunk once evicted (§12.8) and the report is derivable except for the measured members. |
| J-V3.28 | Chose four-column band cells (poor, modest, prosperous, rich) with `squalid` reading poor and `comfortable` modest over six-column cells, because volume 11's specialisations are authored at four anchors and a six-way split would state guesses twice. |
| J-V3.29 | Chose slot-keyed rows for every structure of a multi-building template over one programme per designation, because an inn's stable block must not receive a common room. |
| J-V3.30 | Chose split halves by a `half` filter on the class-id row, else volume 11's split families, over one programme for both plots, so a brewer's taphouse holds no brewhouse (item 105 (h)). |
| J-V3.31 | Chose workplace sleep-in beds from volume 11's `staff` column × a row's `staffSleepIn` over a fixed journeymen room, because the workforce is volume 11's fact and the share varies by trade. |
| J-V3.32 | Chose the live-in household's form capped at `dwelling` and placed above the work first over giving it the ladder's full form, because the shell is the use's and the owner's own example is "quarters above" (item 28 (a)). |
| J-V3.33 | Chose units allocated first, with storeys the use claims tried last, over hard rooms first, because F-PLAN tier 0 and §2.6 step 3 place the households first and a hard forge must never push a family to a poorer form. |
| J-V3.34 | Chose one shared stair hall cut from the main entrance to the core over per-unit corridors grown from any room, because it is how a subdivided house gave each family its own door (item 28 (f)) and it is the shortest circulation that meets T-V3-16. |
| J-V3.35 | Chose a pre-decided no-abort fit ladder with a capacity reserve for a ladder bay and a landing over the rung's abort, because the owner's "never omit a household" forbids a plan with no units. |
| J-V3.36 | Chose to decide the hearth rooms' wings before placing stacks, and to place a back-to-back stack on the line a pattern would cut, over placing stacks on walls the cut has not made, because anchors must precede the cut and read no stream. |
| J-V3.37 | Chose `slice` on the maximal segment nearest the piece's centre, with fixed rings as bridges and a bounded linear scan where the area is not monotone, over a cut refused on every bent piece, because bent quads and notched pieces are common. |
| J-V3.38 | Chose to apply the drawn pattern to the piece that holds its requirement and give every other piece the first pattern it admits over one pattern for every wing, because an L or a courtyard building has pieces without an entrance, a hall or a core. |
| J-V3.39 | Chose filler rooms by class list and oversize pieces kept over stretching rooms past their maximum or leaving area unassigned, because a large shell with a small programme historically held more rooms, not bigger ones. |
| J-V3.40 | Chose a unit floor per unit form in `PlanGeometryRow` (house 60 … room 9 m²) over a per-ladder-row column, so one fact per form serves every band's row (general historical knowledge, calibrate-later). |
| J-V3.41 | Chose volume 2's façade bays on every side (its function, `facadeBays`; J-V2.93) over a plan-only bay grid or a restatement of its law per side, so the plan's windows, the dormers and the lit windows share one rhythm. |
| J-V3.42 | Chose Prim over internal edges with secondary entrances adding openings only over secondary roots at cost 0, because a room reachable only from outside breaks T28-2. *Amended by J-V3.121.* |
| J-V3.43 | Chose steps inside the lower room up to `datum.maxSteps` risers and no door beyond over level doors across any drop, because wings on a slope or of different storey heights stand at different floors. |
| J-V3.44 | Chose flush `ledger` slabs in the chancel floor for a church without a crypt over a vaulted burial chamber under its floor passing for a crypt, because under J111 a church without a crypt has none, and burial under the church floor was marked by slabs; on wet ground this is every church but an `always` class (V03 §3.7.4). |
| J-V3.45 | Chose the crypt as a model fact on `Basement`, drawn by the plan, over a plan-only room, because plans are derived on a click, and volume 4's join, the largest-crypt rule, volume 10 and volume 1's T-V1-47 read the crypt at generation. |
| J-V3.46 | Chose crypt stairs from the nave and choir flights over the lifted chancel over the stair core alone, because the raised form lifts the chancel past O1 (c)'s three steps and a crypt was historically entered from the nave (general knowledge). |
| J-V3.47 | Chose to keep and announce an author's removal of the cathedral's crypt over refusing it, because everything is editable (item 101 R2) and the owner's crypt rule governs derivation. *Amended by J-V3.130.* |
| J-V3.48 | Chose a rank trim of every other crypt to `crypt.rankShare` × the principal's area over trusting the size rows alone, because the owner's "the cathedral always has … the largest crypt" must hold on derived output whatever the bands and shells. |
| J-V3.49 | Chose to anchor every access a building hosts, whatever its source or cause, over item 64's accesses alone, because the access edit, the neighbourhood's stair, the catacomb's entrance, the crypt join and the owner's dug access are all ways down inside buildings. |
| J-V3.50 | Chose one flight per head with the rest of the descent below the floor as the access's own stairwell over a straight bay at the full drop, because a 10 m descent fits no cellar. |
| J-V3.51 | Chose a secret access's own concealed back room over concealing the whole cellar, so the public cellar stays reachable and the secret stays hidden. |
| J-V3.52 | Chose to merge a concealed room into its public neighbour at a public key over drawing a door-less void, because a void is the tell item 63 exists to avoid. |
| J-V3.53 | Chose a flue to an air shaft, else a brazier, for an underground hearth over a stack through the ground, because no stack may rise through rock or another building. |
| J-V3.54 | Chose bends named in one line over refusals for plan edits, because item 101 R2 allows refusals only against a dossier fact or a lock. |
| J-V3.55 | Chose click to select and derive without moving the view and double-click to zoom over a click that frames the building, because §14's input scheme gives every entity that behaviour. |
| J-V3.56 | Chose a detail ladder by stop inside the building band over drawing every mark at every stop, because at the band's threshold leaves, treads and furniture are below the legibility floor. |
| J-V3.57 | Chose `view` plans only at 1:350 or finer and at most 64 per view over every visible building, because a METROPOLIS core holds hundreds and would fill the cache in one view. |
| J-V3.58 | Chose declared rooms as a building attribute read as hard programme rooms over rooms that can only be drawn, because item 101's authoring is "declare, then derive" and the Dwellings users ask for programme control. |
| J-V3.59 | Chose a room name that keeps the role and a per-viewer numbering key over role labels only, because a GM's room key is the ordinary use of a plan (Dwellings D6). |
| J-V3.60 | Chose a `WhyProvider` for rooms and a `plan` path on buildings over queries without causes, because volume 10 routes "why?" to the kind's provider. |
| J-V3.61 | Chose a translated A/B fixture prepared by a research seat over handing the builder the reference's lists, because §17.1 (2) forbids an implementer reading reference word lists. |
| J-V3.62 | Chose an exchange class keyed also by door kind and minimum width over scope, unit, door cap and hub-ness alone, so a roles re-roll can never move an opening or place a role in a piece too narrow for it. |
| J-V3.63 | Chose an explicit creation index for every `plan.*` draw over sequential draws per building, so a local re-derivation draws what the whole derivation would. |
| J-V3.64 | Chose to carry furniture points with a stored plan and re-snap or orphan them after a warp over carrying rings alone, because mean-value carrying is not rigid. |
| J-V3.65 | Chose a per-rung New random on an edited plan, edited parts fixed, over leaving it undefined, because a silent no-op is forbidden (§5.1 (6)). |
| J-V3.66 | Chose a sun tie-break for principal rooms among equally fitting parts over ignoring orientation, because the rich sought the sun (item 102 (d)) and a tie-break never overrides fit. |
| J-V3.67 | Chose furniture rotation in integer centidegrees from the slot wall over quarter turns of the wing frame, because bent quads, polygon wings and round rooms have walls off that frame. |
| J-V3.68 | Chose CityJSON `BuildingUnit`s per household unit and no furniture over furniture objects, because units are the plan's social fact and the glyphs are abstract. |
| J-V3.69 | Chose a wall-shade program of our own and an all-storeys sheet over omitting both, because the synthesis keeps the reference's shading as a readability device and its users print whole houses. |
| J-V3.70 | Chose to re-run the underground layer's per-building rules on a basement edit and name every access gained or lost and every emptied void in the preview over a silent consequence, because item 109 (j) (4) empties a void whose last access closes. |
| J-V3.71 | Chose to explain every way down — kind, state, reach, cause — in the panel, the why and the exports over drawing heads alone, because item 109 (g) and (j) (3) require the cause to be told. |
| J-V3.72 | Chose a strip chancel cut at the crypt's nave-side edge in a church without a chancel wing over the chancel's own target depth, so the chancel stands over the crypt as historically it did. |
| J-V3.73 | Chose "church-class" as a class whose crypt column is `always` or `basement` over a class-name list, so a burial ground's chapel (class `cemetery`, `never`) may host the catacomb's entrance and no church may (J111). |
| J-V3.74 | Chose a tag → role table for sub-locations, with capacities and SettlementForge tags as fallbacks, over naming a room by a tag, because no sub-location tag is a role name. |
| J-V3.75 | Chose an entrance → room-role table for anchors over an unstated hub choice, so every entrance's room is decided by data. |
| J-V3.76 | Chose room placement by wing role and template part names (`WingAffinityRow`, BCR-V3-13) over the largest remaining piece alone, so a manor's kitchen lands in its service range and a church's chancel in its eastern arm. |
| J-V3.77 | Chose to read the base's adjacency cells, the ladder's staff placement and its circulation patterns over leaving them dangling, with the ladder's patterns governing the upper storeys of subdivided bands. |
| J-V3.78 | Chose an era row winning over the era-less row at the same key over ignoring `for.era`, so alternative room sets by era (Dwellings D5's idea) are data. |
| J-V3.79 | Chose to re-check every kept opening after a re-cut and remove the ones the new units forbid over keeping them, because a kept door between two households breaks the unit rule. |
| J-V3.80 | Chose to read volume 2's `storeyRange` and `deckLevel` and a ground predicate `ground(b)` over counting every wing's storeys from the ground, because a stacked tier's lower levels would vanish under the base's clip order, its floor would stand a storey too high, and on a solid stack level 0 is not the ground. |
| J-V3.81 | Chose one core carried up a chain of stacked tiers wherever its bay fits every tier, then landing doors where volume 2's stairs arrive, then terrace exits and terrace doors, with each such door a further root of the door tree, over a core per tier and secondary roots that reach nothing, because stacked tiers are not joined along a joint and a tier entered from its terrace is the stepped building's own form. |
| J-V3.82 | Chose the roof terrace as a derived surface of the level above, walkable only where a flight, an exit or a door reaches it, over a room of a new role, because a terrace lies outside the walls (no room tiles it) and an unreached roof must not read as floor in a game scene. |
| J-V3.83 | Chose to prefer stacks under the hearth wing's own exposed roof and to carry any other up through the tiers above, over ending a flue under a floor, because a flue is continuous (J-V3.7). |
| J-V3.84 | Chose the outside-ground test on every storey — windows above their outside ground, doors only within the step tolerance — switchable off by one flag, over reading exposure on basement walls only, because retaining walls put earth against ground storeys; on natural slopes it is a realism fix recorded here. |
| J-V3.85 | Chose to re-match a stacked wing's rooms by wing-relative storey, with their addresses kept, over the absolute level, because a tier edit below must not orphan the author's named, locked and furnished rooms above. |
| J-V3.86 | Chose to treat a host chamber's side that volume 4 marks open to ground part 0 as an exterior wall at grade — windows, a street door and a flue in the arch's infill — over applying the underground rules to the whole building, because an arch vault's face is open air. |
| J-V3.87 | Chose to make a crypt-only basement by the crypt ladder when an author sets a crypt ring on a building without a basement, over refusing the edit, because everything is editable (item 101) and the ladder's raised form is always lawful. |
| J-V3.88 | Chose "no storeyed wing stands on the ground" over "a solid ground wing" as the one condition for the outside basement door, because a basement that a storeyed ground wing's core can reach must not be forced outside. |
| J-V3.89 | Chose one sanctuary room on a stepped temple's shrine top storey, its sacristy and store only on another storeyed level, over cutting service rooms into the shrine, following volume 2's small shrine (the historical reading PLAUSIBLE: some temple-top shrines had an outer and an inner room, which a two-storey shrine still gets below). |
| J-V3.90 | Chose storey heights from the class's heights row — a principal first storey on every wing, a stacked tier's included, and upper storeys — scaled to sum to the wing's storey run below any parapet, over one mean height per wing, because volume 2 raises each tier from a ground and an upper storey height (J-V2.85) and a parapet is not a storey. |
| J-V3.91 | Chose, on a solid stack, the main entrance at the stair's foot with no plan door and the plan rooted at the first landing door, and no level at or above the ground and no failure for a building with no storeyed wing, over a main door on the shrine, because rule 1 keeps the main entrance on the footprint and a solid stack has no storey there (§2.6 *Entrances* rule 5). *Amended by J-V3.117.* |
| J-V3.92 | Chose to single-source the deck rule on volume 2's deck gate (every deck plot, landmarks included) and give a deck building no head and no well, over a landmark exemption, because volume 2 treats no deck — a mole included — as ground (J-V2.68); a cistern inside a mole fort would need J-V2.68 amended, and item 110 (d) names no such need. |
| J-V3.93 | Chose to key the stepped programmes (`stepped_temple`, `terraced_palace`, `tiered_tower`) as specialisation rows under `'*'`, over rows under class ids, because volume 11 carries them as specialisation values of the classes whose culture builds in tiers (V11 §3.24.3), not as class ids, so A1's rule (1) reaches them whatever class carries the specialisation. |
| J-V3.94 | Chose an `arena` row with an ambulatory by the `spine` pattern, cells and stores below, and a row cell `seatingExits` for the cores' exits onto the seating, over a class-name test or no way onto the seating, because tables carry behaviour (item 23) and an amphitheatre's stairs lead to its banks. |
| J-V3.95 | Chose a `cistern` role in the conduit house and a derived inlet mark where an aqueduct ends at it, over a store and a workshop, because the aqueduct's end house holds water and generated aqueducts make it common. |
| J-V3.96 | Chose no plan and no programme row for a ruin's stepped monument, over a `stepped-monument` programme row, because volume 4 keeps the monument as a chamber's record and never as a building (V02 §3.15.6; `Chamber.monument`), so the row would be read by nothing (the wiring rule). |
| J-V3.97 | Chose an outside-ground digest — the retaining walls near the footprint, the samples W2 reads and, for a building below ground, its host chamber's ring and grade faces — in `ElaborationRecord.inputs` over the building's own leaf state alone, because the plan now reads ground outside the walls and a stale plan must not look current. |
| J-V3.98 | Chose the grade faces of a host chamber as volume 4's derived reading `gradeFaces(chamberId)` (V04 §3.5.4 (f)) — an arch vault's two arch mouths, the sides of its rectangle parallel to its raised way's axis, and a street or bridge vault's open arch — over a rule of this volume's own, because the chamber's geometry fixes those faces, volume 4 owns the chamber, and generated viaducts are common. |
| J-V3.99 | Chose `Entrance.storey` derived with the entrance set at S11 — a secondary entrance whose ground meets no floor not derived, after its draws — over a plan-time reading alone, so exports, the clerk and the plan read one fact and a hill-town house's back door stands one floor up without elaborating anything. |
| J-V3.100 | Chose an uncapped outside stoop for a main entrance whose ground meets no floor over refusing or moving the main door, because rule 1 fixes the main entrance and a stoop is the historical answer to a raised ground floor. |
| J-V3.101 | Chose the roof terrace from each wing's own `RoofSpec.kind` (flat, laid or edited) over `MassingRef.stack.lowerRoof` and `top`, because volume 2's roof edit changes the wing's roof and leaves the stack's field as the laid default for a later re-lay, so only the wing's own roof says what stands there now; the stack is read only for the shrine. |
| J-V3.102 | Chose stair core and chimney ids by wing key then a rank inside the wing over a building-wide index by wing order, because wings are keyed and canonically ordered (BCR-V2-27), so a wing added or removed elsewhere would renumber a stored plan's cores and stacks that plan events name. |
| J-V3.103 | Chose composer rooms keeping the `rooms` rung's ids, other rooms minted after them in `readBack`'s order, and a stored plan's new rooms minted from the level's highest id + 1 over re-numbering every room on each cut, because plan events name room ids and volume 2 fixes the composer's; never re-using an id keeps an old event from naming a new room. |
| J-V3.104 | Chose to apply a dwelling row's own rooms only at the ladder form `house`, the units and shared rooms replacing them at every other form, over adding the class's hall and solar beside the units at every band, because volume 2's `rooms` rung withholds the hall and chapel below that form (J-V2.36) and a manor divided into lodgings historically lost its hall to them; institutions keep their rooms at every band. |
| J-V3.105 | Chose to bend a furniture add or move into a full room to the nearest room with a free slot (same storey first), and to keep it where the author put it when no room has one, over refusing it, because item 101 R2 allows refusals only against a dossier fact or a lock (J-V3.54). |
| J-V3.106 | Chose to place an omitted gate hall as a fixed ring across its gate wing at the entrance offset, `gateHallM`'s lower bound wide, and an omitted tower room as its tower's piece, over leaving the role to A5's leftovers, because volume 2's F-COMPOSE (3) hands the role to this rung and the court is reached only through the gate hall's arches. |
| J-V3.107 | Chose a rank that caps `Basement.crypt.ring` only — the capped bays kept as an undercroft under the crypt's column grid — and is recomputed from each crypt's step-2 ring on every run, so a trimmed crypt re-grows when the see returns, over a trim that also shortens a crypt-only basement, because volume 6's epoch rule keeps every vault (J-V6.62, T-V6-55) and a recomputed rank is the same function at generation and across epochs. |
| J-V3.108 | Chose the district click at the city and district bands (close-up and `wings`, the building selected and its panel open) and the building click from the neighbourhood band down, each deriving `wings`, then `rooms`, then `plan`, over a building click at every band, because the base orders the gestures down the ladder, volume 2 keeps the district band composition-free and the plan reads the composer's rooms. |
| J-V3.109 | Chose a §16 milestone of its own for the plan rung (M6-P) with its effort-table line and the §14 package line, over leaving the rung outside §16 until the owner opens stage 3, because the rung is designed to build depth and priced here, and a total computed once from the table's lines keeps volumes 1–3 from rewriting one number three ways. |
| J-V3.110 | Withdrawn: a process record, not a design decision; its design content is J-V3.109 and V03 §4.2's deck bend. |
| J-V3.111 | Chose to key the village programme rows by volume 7's `v.` keys, each row that takes a town row naming it, and to resolve a `v.` key without a row of its own through the row its volume 2 `composition.classFamily` key names (reported as `programmeSource.via`), over unprefixed ids or a copy of every volume 7 class here, because volumes 7 and 11 key a village class `v.<id>` and a same-word town row is another key, and one lookup through volume 2's table keeps a village building's programme and massing on one family and resolves any later village class without a new row. |
| J-V3.112 | Chose rows of their own for `v.bakehouse` (bakehouse and store) and `v.shop` (the `shopfront` family row) over the `composition.classFamily` fallback for them, because the composition keys volume 2 gives them are massing choices (`kitchen`, `dwelling-detached`) whose programme rows would plan a common oven as a kitchen with a buttery and a general dealer's house with no shop room. |
| J-V3.113 | Chose to read every ground height W2 samples through `levelledGroundCm(doc, key, p)` on the building's own arena key, and to stale a plan when a levelled platform's datum changes as well as the terrain, over sampling the `Terrain` raster, because the raster holds no levelled height: a raster read gives the unlevelled slope at every terraced wall (misreading the exposure gates, `Entrance.storey` and the walk-out), and a raster-only stale trigger misses a re-levelling. |
| J-V3.114 | Chose one pure function `basementDoor(b)` of eager records (V03 §3.7.1), built at M3a, as the single producer of an external basement's door — the wall walk-out, then the tomb door, then the fall walk-out — read by the base's step 3 and T28-3, over the base's lowest-midpoint rule with two exceptions beside it, because on a levelled plot `levelledGroundCm` reads one platform under every side (the rule fell to the ring-index tie and never found the wall), a second text would contradict the tomb and wall doors, and volume 1's entrance reserve needs the door from committed state without elaborating a plan. |
| J-V3.115 | Chose, inside `basementDoor(b)`, (a) the wall test on the ring at `2 × cellar.insetCm` — the footprint distance of §2.6's wall walk-out plus the ring's own inset — over `cellar.insetCm` measured on the ring, because the ring lies `cellar.insetCm` inside the ground wings, so the narrower test would miss exactly the walls the basement decision found; (b) no door off the wall — the trapdoor fallback, reported — where the wall's ring sides are too short for a door, over a door on another side, so a wall walk-out never opens a door into the platform's fill; (c) rule 3's sample outside the wall — `levelledGroundCm` at W2's point, `cellar.insetCm + door.mainCm` out from the ring side — over the ring side's own midpoint, because on a levelled platform, or with an authored `external` access, the inside sample is the platform datum under every side, while the outside sample finds the ground the door opens onto; on an unlevelled plot both find the downslope side. |
| J-V3.116 | Chose to build the plan rung's eager facts — `R(s)` at M2b; `Entrance.storey`, the wall walk-out and `basementDoor(b)` at M3a in S11 — as V03 §8's PE row inside the base's milestones, 0.75–1 pw moved from P1, over building them with the plan rung at M6-P, because their inputs exist at M2b and M3a and their readers (S10b's placement and re-homing, volume 1's entrance reserve at M5, volume 2's porches, the exports) run earlier, so a build at M6-P would shift capacity and households in every multi-storey building, and entrance sets, storeys and walk-outs in every terraced or stacked one — an undeclared one-time shift of eager records. |
| J-V3.117 | Chose to plan a building with no storeyed wing below the ground (V03 §3.1 step 2) — its basement storeys alone where it has a basement, else its hosted accesses as heads of `storey` null with a door on the ground-standing face, else an empty plan, every room whose storey rule admits no basement storey dropped with no tier (J-V3.122) — over an empty plan in every case, because a great temple laid with `top` `flat` (volume 2's `stepped-temple` row or its `tiers` op) is an `always`-crypt class whose crypt, entrance door and heads the empty plan dropped, while volume 1 relies on the plan for every building-hosted access's one mark (V01 §3.8.8) and tells the owner the crypt door is drawn with the building; with a basement the heads lie on its lowest storey, the outside-door form (`stackAccessDoor(b, a)`, J-V3.120) only without one. |
| J-V3.118 | Chose register lines of this volume's own for `roomProgram.json` (V03 §2.4) — `measure` at V3-P6 on T-V3-35 for the columns P6 tunes (V03 §2.4's first register line), fallback "the default stays, reported"; PE's cells and every other column on V12 §3.11's default line; the switches and keys not calibratable — over the default line alone, because P6 tunes those columns on B-PLAN and an entry that never names that measurement would let a tuned value stand unconfirmed until M-CAL, where no corpus frame measures room areas; over naming the existing bars, whose clauses are structural and pass whatever the values; PE's cells stay on the default line because a retune at V3-P6 would shift the capacity, entrance storeys and outside doors built at M2b and M3a (J-V3.116); `stages` `[]` because the plan rung has no StageId (V11 §3.1 row 38), so no run reaches these cells through the bar. *Amended by J-V3.123.* |
| J-V3.119 | Chose, on a crypt-only basement, to head an access that reaches no catacomb in the capped bays' undercroft, else in the crypt (reported `crypt host`), over the cellar A2 (10) would add, because storey −1 there holds the crypt's and its capped bays' pieces alone (A4), so that cellar could never fit and the head would lose its host room on every flat-topped great temple over which volume 4 draws a dug or overlap access; a catacomb head there stays the crypt join. |
| J-V3.120 | Chose one pure function `stackAccessDoor(b, a)` (V03 §3.7.2 (1)), built at M3a beside `basementDoor(b)`, as the single producer of a stack-hosted access's outside door — read by the head and by volume 1's entrance reserve and digest — over two texts deriving one point; and a non-stair ground-standing wing's door run (V03 §3.7.1), its span at least one `moduleCm` clear of stair 0's approach strip so no door opens onto the strip's edge, the nearest wing holding an admissible point taken before the reported fallback, over the nearest ground-standing wing at `door.entranceCm` + 2 · `jambCm`, because stair 0 is a ground wing (V02 §3.15.1 ST6), so the nearest-wing rule could put the door in a flight, a point moved along its side left volume 1's rectangle, volume 1's reserve must read the point at M5, and `moduleCm` ships at M3a while `door.entranceCm` and `jambCm` ship at M6-P; its effort is counted inside PE's M3a range. |
| J-V3.121 | Chose the base's reading — an `external` basement's outside door, whichever of `basementDoor(b)`'s rules placed it, roots a further Prim tree over the basement's storeys after the stack roots — over a walk-out's door as a secondary entrance adding openings only, because the core stops at the ground storey there (§2.6 step 3, J-A29.25), T28-2 starts at that door and §2.6 step 5 states it for both `external` cases; with openings only, every room of every walk-out basement was unreached (F-PLAN tier 1 on every hill house with a walk-out). J-V3.42 stands for the side, rear, yard and service doors, a side door onto a walk-out's low side among them. |
| J-V3.122 | Chose T28-1's storey-less clause (§13.2) — on a building with no storeyed wing, a room whose storey rule admits none of its basement storeys, hard or soft, dropped under `solidMonument` and listed in the report with no tier (`PlanReport.owed`'s `tier` absent exactly then, V03 §2.3) — over delivering it by tier 5 or leaving T28-1 as it was, because no storey stands above the ground to hold the `stepped_temple` row's `chapel` on a great temple laid with `top` `flat`, a generic room there would stand inside solid masonry, and the bar would otherwise fail and flag that building at F-PLAN tier 1 on every derivation though nothing is wrong (tier 1 reads the bar, so it follows with no text of its own); the clause covers the soft rooms too, since "each with its tier in the report" would otherwise fail that building's soft rooms. |
| J-V3.123 | Chose to leave untuned at V3-P6 the two cells §2.6's capacity reads — the `room` role's `area` triple (its min `minRoomCm2`) and each class row's poorest-band `circulation` — with §13.7's item-28 fallback stepping neither, over tuning them as a declared shift of the capacity (T28-13's fixtures and the goldens re-signed at M6-P), because the capacity is an eager fact every shell's household count has read since M2b (J-A28.28), so a tune at the plan rung would move households, their placement and everything downstream in every town at a milestone the owner's roadmap stages last — J-V3.116's and J-V3.118's reason for PE's cells. The `room` triple rides its whole column's entry on V03 §2.4's first register line — measured by T-V3-35 (i) at V3-P6, never tuned there, its fallback moving no `room` cell — because V12 §3.11 binds a whole column to one entry; over a V12 rule for row-subset default entries, because the later-line rule as written covers the case with no new register machinery. Only each class row's poorest-band `circulation`, a column wholly on the default line, stays on PE's line; A3's unit floor, still `measure` at V3-P6, keeps P6's lever on a `room` unit's size. |
| J-V3.124 | Chose the main entrance of a building whose basement is `external` on the ground storey, opened with its stoop — its `Entrance.storey` reading the levels at or above the ground only, derived by S11 after the basement decision and re-derived when the basement's access, kind or floors change (V03 §3.6) — over extending the core down to a basement level the main entrance meets, because the `external` access stops the core at the ground storey (§2.6 step 3, J-A29.25) and a basement holds service rooms only (V03 §3.7.1, A5), so the other reading would amend two base texts and bring the entrance hall and the shared stair into the cellar, and with the main entrance on storey −1 O2 rooted the main tree in the basement and every room of storey 0 and above was unreached (F-PLAN tier 1, T28-2 failed) on the common downhill-fronted walk-out house. An outside flight to the main door with the cellar door under it is a historical hill-street form; the stoop lengthens (up to about fourteen risers, reported `stoop`; volume 1's T-V1-26 keeps its doubled-depth fallback for the entrance reserve). A side, rear, yard or service entrance still opens on a basement level its ground meets, and the kind and floors re-derive the storeys because a basement storey added or a crypt's `raised` floor moves the levels such a door may meet; the storey step draws nothing, so the door and basement draws keep their order on `siteplan.entrance` (J-A29.61), over moving S11's entrance draws after the basement's. |
| J-V3.125 | Chose, on a building with `Basement.crypt` and `ground(b)`, to read `basementDoor(b)`'s rules 1 and 3 at each door side's door point (V03 §3.7.1) — its midpoint, else the nearest point whose span, held within the side, shares no length with the crypt's vault; a side with none no door side, the result `null` (the reported `trapdoor` fallback) where no side remains — over a door opening into the crypt, because a church's crypt is entered from the church above by its crypt stairs (V03 §3.7.6), volume 1's §0 tells the owner so, and a tree started in the crypt crossed no forbidden edge, leaving the cellar unreached (T28-2). The point slides along its side, over disqualifying every side whose midpoint's span touches the crypt, so a walk-out church whose crypt covers the midpoint of its low long side keeps its door on that low side, off the crypt, rather than falling to a higher side or to the trapdoor. The region cleared is the vault — its ring with its capped bays, the step-2 ring on an unedited crypt — over the ring alone, because the rank's trim and re-growth move the ring when another church's crypt changes, so a ring-only test would move this door and volume 1's reserve on an event elsewhere, and a door into the capped bays reaches the crypt through V03 §3.7.5's arch. The span is two `moduleCm` — the base's door width (§2.6 step 3), as `stackAccessDoor(b, a)`'s span — held within the side, over `door.mainCm`, because a door side may be as short as two modules, so a `door.mainCm` span held within its side would bar on a church a side every other building may use, and one not held within it could slide past the side's end. The clause is inert before M6-U (no `Basement.crypt`); its first reading moves such churches' doors once, declared in M6-U's shift record with the crypt's first derivation and priced inside that derivation. |
| J-V3.126 | Chose exactly one crypt join in O2's tree for a crypt that is not stair-entered (V03 §3.6 O2 (i), (ii)) — at the first room the tree spanning the basement reaches beside the unspanned crypt, else, where the tree starts in the crypt, to its adjoining room of least edge cost — with V03 §3.7.5's capped-bays arch a forced edge exempt from the crypt's forbidden clause, over a crypt door on every building and over growing a solid temple's crypt toward its tomb door, because a solid temple has no church above and its crypt's entry is the outside door, which the crypt's trim from its entrance end (V03 §3.7.4 step 2, shared with every church and read by volumes 4, 6 and 10) puts in a cellar wherever the cellar draw gives a larger basement, where the forbidden edge left the crypt unreached (T28-2, T-V3-23 (e)); the join is an `arch` of `door.archCm`, the crypt role's door kind by O3, over a door of `door.entranceCm`, so T-V3-6's widths need no exception; the forced arch spans a capped crypt-only church's undercroft and, where crypt stairs enter the crypt, closes the vault, over an opening outside the tree, which re-strands that undercroft. *Amended by J-V3.127.* |
| J-V3.127 | Chose to key the crypt's entry on whether a storeyed ground wing stands over its vault (V03 §3.7.4) — stair-entered, by its crypt stairs; else from the basement, by the outside door or one crypt join — and to give a crypt no stair reaches on a building with `ground(b)` the ground wings' whole inset rather than a crypt-only basement, over keying on `ground(b)`, which strands the crypt of a great temple with a storeyed annex (no crypt stair, no join); over a tomb door for it, which §2.6's *Basements* bars (a storeyed annex's basement is never outside); and over seeding the crypt under the annex, which moves volume 2's `cryptSeedWings` and puts the temple's crypt off its sanctuary, read by volumes 4, 6 and 10; on the vault, not the trimmed ring, so the reading never flips on a rank event elsewhere. The realism tiebreaker agrees: a temple platform's substructure opening into its tomb chamber is a historical arrangement, and the crypt stays under the sanctuary. |
| J-V3.128 | Chose, for a crypt no stair reaches on the `raised` rung, the ground wings' whole inset with every ground wing over it lifted, so the storeyed annex clears the basement by `crypt.clearCm` and its core reaches the basement beside the crypt, over (i) a crypt-only raised basement with a tomb door, which would amend §2.6's *Basements* access rule, volume 2's "never outside" (V02 §3.15.3, T-V2-44), J-V3.88 and `basementDoor(b)`'s rule 2 for one wet-ground case, and over (ii) refusing the whole inset on that rung, which re-strands the crypt; one rule on every rung is the simpler mechanism, and a hall raised over an undercroft on wet ground is a historical form (PLAUSIBLE, general knowledge). |
| J-V3.129 | Chose to bound a derived crypt's growth on the `half` rung as on the `raised` rung — under the ground wings its step-1 seed lies under, which volume 2 raises or lifts over it, or the solid tier 0 that holds it — over letting it grow and raising every wing it reaches (volume 2's ring rule alone), because volume 2's form is a raised choir over a half-sunk crypt (J-V2.91) and raising a nave with its choir drops the choir flights; a short principal still out-ranks every other crypt by the cap, and an author's ring keeps no bound (volume 2 raises the wings over it). |
| J-V3.130 | Chose the crypt-edit dry runs at the crypt's owner (V03 §3.7.4) — a cathedral's crypt kept at its smallest lawful size, another crypt's enlargement bent to the rank's cap `crypt.rankShare` × the principal's area, the crypt join's closing listed among the fates, a dossier-bound crypt's removal refused — over keeping and announcing an author's removal of the cathedral's crypt and over a clamp "just short of" the cathedral's, because the owner's rule gives every cathedral a crypt, the largest in the town (J111), item 101 R2 bends an edit that cannot be done exactly to its nearest lawful form, the cap is the rank's own value (volume 11's cell, one number for the derivation and the edit), and the dossier is the sole immutable truth (§7.7); every other author's crypt edit stays as J-V3.47 keeps it, announced where it breaks a rule. |
| J-V3.131 | Chose to treat a door side whose outside ground lies more than `datum.maxSteps × riserCm` below the basement's floor as no door side for `basementDoor(b)`'s rules 1 and 3, over a door opening onto a cliff's drop or a tall wall's foot, because an outside door must meet its ground by a stair or a few steps, as every other door of the plan must (V03 §3.6's exposure gate), and §2.6 step 3's trapdoor fallback still reaches the basement from inside; the realism tiebreaker agrees — no door hangs in a cliff face. |
| J-V3.132 | Chose, under the owner's delegated answer to V03 §11's Q1 (J122), to land P3's parts that read P2's heads and crypt with P2, priced in P3's range, and P1's composition clauses with volume 2's M6, over holding all of P3 until P2, because the decided order runs P3 before P2 and those parts read heads and a crypt that exist only from P2 and M6-U, while the rest of P3 reads P1's plan alone. |
| J-V3.133 | Chose to read item 119 at the plan rung (V03 §6) as V03 §6's rows and §12.7's plan row kept as the targets and the plan's share of each one-time wait — PE's eager facts inside S11's generation, the stored plans' re-cuts inside a dossier change or any event that moves their inputs, an epoch's re-cuts (timed by volume 6's part of the item), the plan exports and the plan's migration on load — inside §12.1's comfort level, with the click, a stale chain's derivation, the storey switch, `elaborate: 'view'`, Find's room reading and a plan edit's preview kept as interaction budgets, over timing a plan's elaboration on a click as a one-time wait, because a click on a building is click-to-inspect (item 119 (d)), the plan rung runs on no generation (§4.1), and the cache and the idle-frame chain keep it off the user's path, while the waits a user sits through once are the events and exports that carry plans. |
| J-V3.134 | Chose to make Find's interior-band glow (item 120 (f)) the rooms a match uses in the plan as drawn — a use's programme rooms (origins `programme`, `sleepIn`, `subLocation` and `crypt`; on a shell housing no household its `declared`, `access` and `composer` rooms too), a sub-location's rooms, a household's unit, or every room for a match that is the building — one union outline per chip from the plan's wall records, the building's outline glowing and the switcher marking the storeys where the shown storey holds none, over glowing the whole footprint at every stop or every room of a matched building, because the owner's rule asks that "the rooms an institution uses glow", a smith's house and an inn's family rooms are its households' and not the institution's, and a match must never be lost (item 120 (e)); Find reads the drawn plan and never derives one, so a chip costs no derivation and no tile (item 120 (j)). |
| J-V3.135 | Chose to key the class rows on §2.6's `BuildingClass` alone — `hall`, `keep`, `tower` and `mill` moved, cell for cell, to named rows in the same columns, reached only by name from the family, slot, class-id and specialisation rows, and `temple` dropped from the church row's key — over re-keying the four rows to classes (`castle`, `tower_house`, `watermill`) or folding them into the family table, because a template family is never a class (§2.6's `BuildingClass`; VAF-R0S-16), no building's class names them, several families, slots and classes take each whole, the family table lacks their `shared` column, and their poorest-band `circulation` stays a capacity cell on PE's register line; no building resolves differently — a great temple reaches its `cathedral` family row at A1 (3) as before, so the church row's `temple` key served no building. |
=== END ===

=== REPLACE ## 12 CONFIRMED versus PLAUSIBLE ===
## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read text against text by the coherence pass): the base sections, file f items and other volumes'
sections this volume cites, as the set now stands; the Dwellings capability matrix's sums (20.0 pw; the dropped rows'
5.3 pw) computed from docs/confidence/dwellings.md §2; the Dwellings facts used as descriptive baselines (programme
realisation 79 of 157, stair floor-pair failures, window density, prop-density ordering), cited by file and section and
used as ideas only.

**PLAUSIBLE until executed:** every mechanism, default row and number this volume adds — the resolution tables, the role,
class, family, slot, class-id and village rows, the allocation, fill and fit ladder, the shared-access strip, the anchor
scores, the cut machine, the door, window and head rules, the crypt's growth, rank and dry runs, the crypt stairs and
choir flights, furnishing, the budget split and the estimates — until P0–P2 measure them on B-PLAN (V03 §8), with the
pre-decided fallbacks of V03 §6 and V03 §3.9; id minting, the omitted gate hall's ring, the capped bays' undercroft
and the rank recomputed from the step-2 ring, the furniture bend's storey order and the dwelling-row list until P1–P3
run them on B-PLAN; that `v.bakehouse`'s and `v.shop`'s rows and the `classFamily` fallback give every village
building a sensible room set, until P1–P2 run on B-PLAN and the village fixtures (T-V3-1's `v.` clause); item 110's rules — the level reading's edge cases, chain cores and prefixes,
S6's joins, terraces and their walkability, the stacks' carry, the exposure gates and entrance storeys, the tomb door,
the storey run's limit — and its 1.75–2.5 pw until P1–P2 run them on the stepped, terrace, deck and vault fixtures;
`basementDoor(b)`'s three rules, its `2 × cellar.insetCm` ring test, rule 3's outside sample and the drop no step
reaches, and PE's split of 0.25 and 0.5–0.75 pw, until M3a runs T-V3-30 on the terrace-wall sub-fixture's and a hill
fixture's eager records; that T-V3-30's levelled-ground clause catches a raster-sampling build; T-V3-35's thresholds
(0.90, 0.95, 1/90, 0.10) until P6; that V12's registration accepts `stages` `[]`; the realism of heading a dug access in a crypt-only basement's
undercroft or crypt (J-V3.119); that `stackAccessDoor(b, a)`'s
admissibility leaves an admissible point on tier 0 of every shipped stepped row (the fallback reported where it does
not; T-V3-22 from M3a); that no corpus frame at M-CAL targets the capacity's two cells; the realism of a walk-out's
basement reached only from its outside door (J-A29.25); the frequency of the downhill-fronted walk-out house and of the
walk-out church whose low side lies on its crypt, and that the door point's slide keeps a door on the low side of most
such churches (T-V3-23 (j) from M6-U); that a stoop of about fourteen risers reads well at the building band (P4's
visual bars); that the crypt clause fits inside M6-U's price for the crypt derivation; that the annex temple's crypt
lies under no storeyed wing in the fixture as built (T-V3-23 (j) holds either way); that a flight laid inside the part of
the vault a level-0 room stands over fits (V03 §3.7.6's kinds, then tier 6, flagged); that the closed vault leaves every cellar of a capped walk-out church
reached (T-V3-23 (j), the core's bay and the trapdoor kept outside the vault); that the `half` rung's bound keeps the principal intact (T-V3-23 (b), (i) at M6-U); that the plan's share of each
one-time wait stays inside item 119's comfort level — a district of stored plans re-cut in one dossier change, the
largest plan export, a migration at the metropolis cap — until T-V3-37 runs; that `findRooms`'s set reads as where an
institution is at the interior band, and its cost, until T-V3-38 and P4's visual bars run. The historical readings
behind the rules (a shared stair hall giving each family its own door, a unit floor of 9–60 m², crypts entered from the
nave, raised choirs over crypts on wet ground, ledger slabs in a church floor, hill-town houses entered from two streets,
walk-outs at a terrace edge, arch-vault fronts bricked in with a door, windows and a flue, tomb doors at a stepped
platform's foot, a one-room temple-top sanctuary, stoops, a hall raised over an undercroft on wet ground) are general
knowledge, not corpus-witnessed; the CityJSON 2.0 types (`BuildingStorey`, `BuildingUnit`, `BuildingRoom`) are checked
against the schema at P5 (T-V3-13). Clean-room (§17.1): no identifier, name, list or table of the Dwellings reference, or
of item 110's study-only assessment (J114), appears in this text.
=== END ===

=== REPLACE ## 13 Fix list ===
## 13 Fix list

**Open items: none.** Every finding against this volume is fixed in the text above; nothing is deferred.

**Hand-offs — the one live table.** Each request this volume makes of another unit, with the rule it states here, and
each request another unit made of this one, with where it is closed.

*Made here, the other unit's side* (each rule stated at the section cited):

| to | the rule | status |
|---|---|---|
| V04 | the crypt join reads `Basement.crypt` and a dossier crypt record makes its church `always` (V03 §3.7.4); the chapel's catacomb head (V03 §2.4); `tunnel` frontages, `ruinColumns` and `gradeFaces` (V03 §3.12); the join set independent of elaboration (T-V3-23 (g)); the crypt derivation's content in its U4 line (V03 §8's PE) | closed at V04 §3.5.7 (c), V04 §2.3a, V04 §3.5.1 (9), V04 §3.5.0a, V04 §3.5.4 (f), T-V4-50 and V04 §8 |
| V11 | the crypt column, `cryptM2`, `crypt.rankShare` and the compile bar between `always` and `basement` classes (V03 §3.7.4); `staff`, `split` and `HeightsRow.storeyCm` (V03 §3.2, V03 §3.3); the stepped forms as specialisation values (J-V3.93) | closed at V11 §2.3, V11 §2.8, V11 §3.5, V11 §3.24.3 — nothing owed |
| V06 | the crypt re-derivation and rank inside epochs (V03 §3.7.4 (3)); the outside digest (V03 §2.5); vault buildings of an epoch-added raised way (V03 §3.12 (9)); the wing-relative re-match (V03 §3.11); the stair-entered reading on a wing change (V03 §2.5) | closed at V06 §3.18.3 (2)–(3) and its epoch rows |
| V01 | crypts read from `Basement.crypt` (T-V1-47); the district-band click (V03 §4.5); the reserve and digest reading `basementDoor(b)` and `stackAccessDoor(b, a)`, and the door's move off a crypt's vault at M6-U (V03 §3.7.1, V03 §8) | closed at V01 §3.7.1, V01 §3.8.1, V01 §3.8.2 step 5, V01 §3.8.3 |
| V02 | the basement door at `basementDoor(b)` (V03 §3.7.1); F-COMPOSE (3)'s omitted rooms (A2 (11)); the plan stack at `Chimney.levels[1]` (H4); the `tiers` op's orphan list (V03 §4.2); `bend.deck.basement` in its bend list; `facadeBays` built first (V03 §3.6 W2) | closed at V02 §3.13, V02 §5.2, V02 §4.6, V02 §1b and V02 §8 |
| V09, V10 | the `room` provider and the `plan` and `crypt` sections (V03 §4.6); the panel, switcher and `roomNumbers` key (V03 §4.5); the `drawChamber` bend's crypt-ring edit and the tier and raised-way previews (V03 §4.2); the crypt-edit dry runs' words (V03 §3.7.4) | closed at V09 §4.17.5 and V10 §3.9, V10 §3.9a; the deck cause's one name is this volume's `deckNoCellar`, which V10's rows follow |
| V09 | the family `report.plan.<code>` in V09 §4.9's family table — one key per `PlanReport.warnings` code, its `en` text V03 §4.5's; Find's `live.find` drawing V03 §5.5's rooms at the interior band, with the switcher's and the panel's marks (item 120) | the other end: V09 §4.9's family table; V09's Find panel and `live.find` |
| V05, V07, V12 | `levelledGroundCm` read by W2 (V03 §3.6); a new village class's rows (J-V3.111, J-V3.112); the known-city click set (V03 §7) | closed at V05's reader list, V02 §3.10.5 and V12's fixtures (standing rules, nothing owed) |
| the base (file f) | every request of V03 §10 at its section, with the notes of items 233, 235, 237, 238, 241, 242, 263, 305, 483, 505, 567, 568, 578 and 585 | closed at the base sections of V03 §10 |

*Made of this volume, closed here:*

| from | the request | closed at |
|---|---|---|
| V02 (X11) | the plan reads wings by key; unedited dormer rows follow the plan's roofed rooms and edited ones stay fixed; the choir stairs over the raised crypt's lift; the room role `gatehall` | V03 §3.1, V03 §3.6 W4, V03 §3.7.6 (c), V03 §2.4 |
| V06 (X3) | the rank re-runs inside each epoch op that changes the principal crypt or its building's designation; a trim shortens `Basement.crypt.ring` only, the capped bays an undercroft that regains the crypt role when the see returns | V03 §3.7.4 (3), V03 §2.5's `Basement.crypt` row |
| V06 (X18) | the outside digest: an epoch that levels beside a building stales an unstored plan and re-cuts a stored one inside the epoch event | V03 §2.5's outside-ground row; T-V3-30 |
| V09 (XV-V9-5) | the crypt bends of V09 §4.17.5 (e): the cathedral's crypt kept at its smallest lawful size, another church's crypt clamped at the rank's cap, the crypt join's closing listed as a fate, each with its `bent` words | V03 §3.7.4's crypt-edit dry runs (J-V3.130); T-V3-11 (v) |
| V09 (XV-V9-15) | the crypt ladder for `setAttr(basement/crypt/ring)` on a building without a basement, which V09 §4.17.5 (a) emits | V03 §4.2 |
| V10 (CVR-V10-2) | the `crypt` section provider over `Basement.crypt` with its `info.crypt.*` keys | V03 §4.6, V03 §1b; T-V3-12 |
| V10 (CVR-V10-9) | a catalogue key for each of item 110's room causes in the `plan` section | V03 §4.6 (`info.plan.cause.*`; the deck cause is `deckNoCellar`) |
| V11 (X-V11-16) | registry row 38's readers (S10b, S11, the three relet phases, `@plat/hood`); T-V3-35's `stages` `[]` | V03 §2.4's register lines |
| V12 (X-V12-4) | V3-P6's `PanelSpec` against Dwellings | V03 §8's P6, confirmed as V12 §3.9.1 states it |
| V12 (X-V12-15) | T-V3-35 registered as a `BenchBarDef` by the seat landing the milestone whose exit writes its entry | V03 §2.4 (the P1 seat) |
| V12 (X-V12-16) | `plat calibrate register --check` green at every exit that lands a calibratable cell | V03 §8's PE, P1, P2 and P6 exits |
| V12 (X-V12-17) | each register command with the landing change's id (`M2b`, `M3a` for PE; `V3-P0` – `V3-P6`) and a column first compiled after M-CAL's record on `M-CAL/M6-P` | V03 §2.4's register lines; V03 §8 |
| V12 (X-V12-18) | hand tuning at V3-P6 and its fallback recorded by `--defaults --milestone V3-P6`; rows added to a column take a rows-added cells row | V03 §2.4's register lines |
| V02 (X30) | T-V3-25 carries the poor manor's three-units clause | T-V3-25 |
| model (VAF-R0S-03) | `AccessHead` declared at §2.6 and cited here | V03 §2.1, V03 §1b, V03 §3.7.2 (1) |
| model (VAF-R0S-16) | the class rows keyed on §2.6's `BuildingClass` alone | V03 §2.4's class and named rows (J-V3.135); T-V3-1 |
| pipeline (VAF-R0S-20) | §4.5's discrete-cell rule cited | V03 §2.4, V03 §3.2 |
| determinism (VDC0-11) | the plan edits' reach bend `bend.room.unreachable` | V03 §4.2; T-V3-11 (vi) |
| V10 (VV34-07) | the notes keyed `info.plan.note.<id>` | V03 §4.6, V03 §2.3; T-V3-12 |
| V11 (VAP-21), V12 | `exposureAllStoreys`'s preset entries false; T-V3-34's first clause the `item110.*` `NoOpPin` on V12 §3.7.8's engine | V03 §2.4; T-V3-34 |
=== END ===

=== APPEND TO SECTION ## 5 Rendering, labels, exports ===
### 5.5 Find at the interior band (item 120, the plan's part; J-V3.134)

Find is a view, never a change (item 120 (a)): its state is the per-viewer view key `find` (§2.9: the chips and the Show
gaps switch), outside the document, its hash and the log; this section reads it and writes nothing, and no plan, cache
chunk or report changes with it. The panel, the type-ahead, the chip grid, the results and the `live.find` overlay are
volume 9's; the veil, outline, halo, pin and count-bubble rows §8.2's; the matches §11.2's gazetteer rows at the view's
effective key, under knowledge admission (item 120 (h)). Item 120 (f)'s **interior band** is, for each building, the
building band at the stops where its plan draws (V03 §5.1: a clicked building's plan, or under `elaborate: 'view'` from
`planStop`): there a match's glow moves from the building's footprint to the rooms it uses.

**(1) The rooms a match uses** — `findRooms`, a pure reading of the plan as drawn (stored, else the cache), never stored:
```ts
// @plat/buildings (V03 §5.5; item 120): the rooms of building b's drawn plan that a Find match uses, by storey; [] when none
declare function findRooms(plan: Plan, b: Building, target: { kind: 'use'|'subLocation'|'household'|'building'; id: Id }): { storey: number; rooms: Id[] }[];
```
* **a use** b holds (a kind chip whose class is the use's, a named institution, the work of a person's chip through
  volume 9's Where is): the rooms that use's programme made — `Room.program` of origin `programme` (A2 (4); in a split
  pair its half's rows only, item 105 (h), so a brewer's works glows its brewhouse and its shop the taproom), `sleepIn`
  (A2 (3b)), `subLocation` (A2 (5)) and `crypt` (A2 (9): a church's crypt and its undercroft) — and, where b houses no
  household (the shell is the use's), its `declared`, `access` and `composer` rooms too; for a concealed use, at a key
  admitting it only, A2 (6)'s rooms for that use (by its place in A2 (6)'s per-use order);
* **a sub-location** (a custom service inside its provider, item 104 (h) (5)): the rooms whose `Room.subLocation` it is;
* **a household** (a person's home through Where is): its unit's rooms (`Room.unit`);
* **b itself** (a kind chip whose class is b's own and no use's — a farmstead, a mill —, or a named place that is a
  building): every room.

A `circulation` room glows for none of them, and the households' rooms — their units (A2 (1), (1′)), shared rooms (A2 (2))
and the owners' staff rooms (A2 (3)) — never for a use. At a public key the reading follows V03 §5.4's merge: a merged
room glows as its public reading where its public part is used, so no glow outlines a concealed room or hints at one.

**(2) The look** (item 120 (e); item 112's second cue). On the storey shown, the rooms a chip's match uses lie above the
veil at full strength with their labels (V03 §5.1), and §8.2's outline and halo in the chip's colour and dash run along
the outline of their union — one outline round adjacent rooms, none along the walls between them: the plan's `Wall`s
whose two sides differ (a room the match uses against another room or the outside), read from its wall records with no
boolean; the rest of the plan lies under the veil. A room two chips match glows as §8.2 draws a match two chips share. Where the shown storey holds
none of the match's rooms — they lie on another storey, or the plan holds none (a building of the use's plot it does not
work in, such as a smith's separate house; an empty plan; a use whose programme rooms the fit ladder dropped, V03 §3.9) —
the building's outline carries the chip's outline and halo above the veil, the building itself under it, so a match is
never lost; the storey switcher marks every storey that holds one of the rooms with the chip's glyph, its accessible name
gaining "{n} found" (V03 §4.5), and the plan panel marks each such room in its room list with the same glyph. A matched
building whose plan does not draw at the view's stop (absent, or coarser than its stops) glows whole by §8.2's
building-band row. Find never derives a plan: a click or `elaborate: 'view'` does (V03 §4.5).

**(3) Over time and edits** (item 120 (f)). Every commit, regenerate, undo, advance of time and season change
re-evaluates the chips at once, and the glow reads the plan as drawn — a stale plan's cached rooms under §8.5's marker
until its re-derivation lands, a re-cut plan's rooms at once — so a room a `relet`, a `setRoomRole`, a declared room or a
re-cut gives the use glows as it appears and one it takes away goes dark. The glow holds across storey switches and the
building band's stops; a building below ground (V03 §3.12) glows on its plan at the underground band (V03 §5.1), its ghost
pin on another layer being volume 4's part of item 120.

**(4) Exports** (item 120 (i)). A picture export of a plan (V03 §5.2) draws Find as the view shows it — the veil, each
chip's outline and halo on the rooms it uses, the chips in the sheet's legend (§11.1) — in the SVG group `plan.find`,
absent with Find off, so the file then equals the Find-less export; a `.dd2vtt` or Foundry scene (V03 §5.3) leaves Find
off unless the export asks for it, and then carries it in the scene's image only, never in its walls, portals or lights;
the JSON `plan` block, CityJSON and glTF never carry it (a view, never the model).

**(5) Cost** (item 120 (j)). An interaction, not a one-time wait (item 119 (d)): `findRooms` is O(rooms) per drawn plan
over the stored or cached plan, for at most `view.planCap` plans per view and the clicked ones (V03 §6's Find row), inside
item 120 (j)'s glow of about 100 ms (§12.5's overlay budget); a chip change redraws no plan tile and rewrites no
`DisplayDelta` or cache chunk (T-V3-38).
=== END ===
