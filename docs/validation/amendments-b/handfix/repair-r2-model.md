# repair-r2-model — lane handfix-b/repair-model-r2 (MODEL part): block file per the BLOCK PROTOCOL; text before the first
# "=== " line is ignored by apply-blocks.py. Rulings, receipts and the issue table: repair-model-r2-report.md (this folder).
# Built on doc e9c0b828… / rationale dcabf14b… by a script that makes exact substitutions in the live §2.6 and rows
# (every old string asserted once), so every other byte is unchanged. Begun by an opus stand-in (14:34), regenerated whole
# by the Fable continuation (2026-09-27 evening; the report's "Fable continuation" section): 11 substitutions in §2.6 —
# the stand-in's 10, three of them changed or added — and 4 in the restated rows.
# Issues: VHM1-01, VHM1-02, VHM1-03 (verify-model-r1), VPH1-02 (verify-pipeline-r1). Apply VPH1-02 with the pipeline
# part's VPH1-01; the two touch no common text.
# ASSEMBLER HAND-OFF — after apply-blocks.py has applied every repair-r2-*.md:
# (1) RESTATED ROWS. J-ROWS restates J-A28.23 and J-A28.26; RATIONALE-A restates J-A28.23 and J-A28.26 (same ids): move
#     each restated row into its older row's place and delete the older (assemble-r1-handoff.py's swap_restated). No new id.
# (2) No substitution in another lane's text is needed.

=== REPLACE ### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface ===
### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface

```ts
interface Heights { baseCm: Cm /* ground datum: floor level in terrain cm (below) */; floors: number; floorsBelow?: number /* derived, never set on its own: on Building.heights the basement's Basement.floors (below; item 29), 0 or absent without one; absent from every other entity's heights */; eaveCm: Cm; ridgeCm: Cm; towerCm?: Cm /* eave, ridge, tower above baseCm */ }   // owner HEIGHT ruling: always populated
interface BaseWing { kind: 'rect'|'quad'|'polygon';
  ring: Polygon /* world lattice points, counter-clockwise — a derived shape record the wing-carrying rule keeps on the footprint (below).
                   rect: a rectangle — its four corners, and on its sides, between them, the footprint's and the building's other wings' vertices that lie
                   there · quad: a row footprint clipped to its plot (§4.7 S11) — four sides in ring order from corners[0]: sides 1 and 3 are the party-wall
                   chains (straight, or with the lot cut's one bend, §4.7 S10 (4)), sides 2 and 4 the front and rear chains, which may be bent or curved —
                   or a rect the carry turned into a quad (rule 3) · polygon: a template part (apse, octagon, star point) */;
  corners?: [0, number, number, number] /* rect and quad: the ring indices at which sides 1, 2, 3 and 4 begin (the ring starts at the first corner);
                   S11 records them when it clips a row or when a rect's sides carry other vertices, and every carry re-indexes them;
                   absent on a rect whose ring is its four corners ([0, 1, 2, 3]) */;
  ridgeAxis: 0|1 /* rect: along side 1 (0) or side 2 (1) · quad: 0 = the ridge joins the arc-length midpoints of sides 1 and 3, the party-wall chains
                    (eaves to the street), 1 = it joins the arc-length midpoints of sides 2 and 4, the front and rear chains (gable to the street) ·
                    polygon: unused (pyramid, cone or dome) */;
  spans?: FaceRef /* item 30: the Passage face (§2.5) this wing spans — on each base wing whose ring runs along the passage's edge (a stepped front building's quads each); written only by S11, with `Passage.frontBuilding` (§2.5), and cleared by S11, when it builds or re-fits the passage's front building or the passage goes (§4.6, §4.7 S10 (9); a drawPassage, a block's reach changed to or from passage (J-A30.72), densify … back_court's new passage and the rung-3 re-cut that removes a sealed passage with its rear row (amalgamate) reach it through that re-fit, §7.1, §4.11 — sealPassage, openPassage and thin … back_court's sealing change no geometry and leave it) — and cleared, with `Passage.frontBuilding`, inside the event that makes the front building a footprint trace (§2.8's `cleared`: `robStone` or `clear`, which zero its heights) or a tombstone (`demolish`); each such event holds the passage in its effective scope (§7.3 item 1), and its undo restores what it cleared (§7.4); the passage is then open above — its face, its `sealed` bit and its plots' access unchanged, and no span mark, span caster or arch glyph drawn over it — until S11 raises a successor over it (`reuse … build`, `build`); absent on every other wing. Its span ring and its extent above the ground are as Wing.spans below, so the capacity (below), the leaf digest of the building and §8.5's span mark read them before any composition exists, and a composition inherits them */;
  heights: Heights; roof: RoofSpec }
interface Building {
  id: Id; plot: Id; slot: number; footprint: FaceRef /* L4 */; wings: BaseWing[] /* ≥ 1; the footprint is their union exactly, kept so through every move by the wing-carrying rule (rectangle = 1, L = 2, T = 2–3, templates n; a clipped row house = 1 quad, or stepped quads on a slope) */;
  class: BuildingClass /* hovel, cottage, house, row_house, hall, inn, workshop, warehouse, chapel, church, temple, manor, keep, tower, mill, tent, … data-defined */;
  use?: Id /* the current Use record (§2.7): the roster class it houses, its specialisation and assignment; absent: vacant (item 17) */; formerUses: Id[] /* the Use records that occupied it before, newest last — the traces item 17 (c) keeps (a former inn, a guildhall turned tenement) */;
  dwelling?: Id /* the household living in a workplace (live-in), §4.7 S10b — one of its households; cleared by the event that moves that household out of the building (§10.3's relocation: a use's move, §4.7's overflow pass, the capacity re-homing below) and by one that leaves the building no live-in use, the household staying as an ordinary one of `households` (§10.3's use that moves without it; a `liveIn` table edit, §7.6) */; households: Id[] /* the Household records housed (§2.7): the reverse of Household.building, kept by the writer that sets it — the generation fill (S10b's placement, written by S11 once the wings exist, clamped into [1, capacity] for a residential building and empty for every other, §4.7), §4.11's relet, item 17's relocation (§10.3); its length is the count the plan rung houses and the interior ladder reads (below, item 28 (f)), never above the capacity (below) */;
  entrances: Entrance[] /* ≥ 1 (item 29): exactly one of role main, facing the street or the court or path from the plot's street gate, plus the side, rear, yard and service doors the entrance rules below allow; replaces the single entrance vertex */; nextEntrance: number /* the next free entrance ordinal (the i of Entrance.vertex): written only by deriveEntrances and setEntrance, never decreasing, so a removed entrance's ordinal is never re-used (as WaterBody.nextControl) */; basement?: Basement /* the selective basement decision below (item 29 (b)); absent: none */;
  heights: Heights /* the building's max over its wings */;
  roof: RoofSpec /* the model's default roof construction; a style sheet may override the construction, never the heights (§8.2) */;
  material: { walls: string; roof: string } /* from MaterialRow; setAttr-overridable; a rendering attribute only (below) */; condition: 'kept'|'worn'|'neglected' /* item 31 rung 1: the fabric's wear — a rendering-class driver like material (§8.2: wear, patched roofs), never a shape input and not an existence state (§2.8); stepped down by §4.11's ladder, restored by renovation */;
  knownTo: 'public'|'local'|'secret' /* item 30: defaults from its plot's exposure and knownTo; a dossier fact for a dossier-backed institution's buildings (§7.7); read by §9.2 and the reader, never by geometry */; predecessor?: Id /* item 8: the cleared trace or ruin this building was raised on (§4.11's reuse … build; the trace's address passes by succession, §6.3) */; reusedAs?: 'garden'|'orchard'|'field' /* item 8: what a reused trace became (existence reused, §2.8) — the trace keeps its L4 face and is drawn as that kind (§8.2); written only by §4.11's reuse conversion or its convert by hand (§7.1); absent on every other building (J-A8.22) */;
  description?: TextRef; openingHours?: OpeningRow[];
  subLocations: Id[] /* SubLocation records, from the class table */;
  composition?: Composition /* stage 3: lazily generated rung by rung (the elaboration record and cache, §2.8, §2.9), stored only when edited — the first composition or plan edit stores it (§7.1); its streams derive from the building's lineage with each rung's own reroll (§6.1) */;
  assignment?: Id; drift?: DriftBounds; lifecycle: Lifecycle;   // no occupants list (J-A28.29): the housed are households (with a workplace's live-in dwelling), those who work there §10's Posting records
}
type RoofSpec = { kind: 'gable'|'hip'|'flat'|'pyramid'|'cone'|'dome'|'skeleton'|'tent'|'plain' /* the F-SKELETON downgrade: no ridge or hip lines, §3.8 */|'none' /* the roofless state the decline ladder's decay sets — derelict, and kept through ruin (§2.8 decline hooks) */; pitch?: number /* a ratio, not an angle */; material?: string };
interface MaterialRow { key: { era: string; stage?: number /* FTG's per-stage default: the growth stage of the building's plot */; districtKind?: string; cls?: string /* overrides, the most specific winning: class (temples and churches stone by row), then district kind, then the stage default */;
  band?: string /* only in the optional regional-shift rows below — absent from every default row, so the default never keys a material by wealth (item 19) */ }; walls: string; roof: string; weight: number; extension?: 'regionalShift' /* §7.6's marker: a row of our optional regional shift, off by default (items 19, 23) */ }   // a rule table (§7.6), our own rows; the rule is "Materials" below
interface OpeningRow { dayType: string; openH: number; closeH: number }
interface SubLocation { id: Id; building: Id; name: string; tags: string[] /* table, counter, stage, bed, bath, pickup, deliver, … data-defined */;
  capacities: { leisure: number; tempResidential: number; guestWorker: number; studying: number; working: number }; relax?: string[] }   // from the class table; rooms at stage 3 refine, never replace
interface Composition { lod: ('outline'|'wings'|'rooms'|'plan')[] /* the four rungs of the building ladder: outline → wings → rooms → plan (item 28) */; wings: Wing[]; towers: ComposedTower[]; courts: Polygon[];
  rooms?: Room[] /* the rooms rung: the principal rooms a Fantasy-Manor-class composer emits with its wings (a hall, a tower's round room), each with its storey; the plan rung takes them as fixed rings, each less a stair bay or chimney stack it holds (the stage-3 contract, below); optional, and absent from the base's outline builder */;
  plan?: Plan /* the plan rung: every storey's rooms, walls and openings (below) */ }
interface Wing { footprint: Polygon /* the wing's ground ring */; heights: Heights; roof: RoofSpec; dormers?: number /* a free count while the plan rung is absent; once a plan exists it is derived from the plan's roofed rooms with exterior demand (the plan rung, below) */;
  porch?: Porch /* at the main entrance's side and offset (item 29), so the porch and the plan's front door coincide by construction; re-read with it after every carry (rule 3) */;
  spans?: FaceRef /* item 30: the Passage face (§2.5) the wing spans — a composed wing whose ground ring follows the edge of a passage that a base wing spans takes that BaseWing.spans (above) — every such composed wing, and no other — so a composition inherits the span and never decides it. Its span ring — the part of that face under the wing: the face's ring cut by the lines that continue across it the end segments of the two wing-ring sides meeting the passage's edge (a row quad's front and rear chains), a boolean on the arrangement (§3.7), or the whole ring where the wing covers it all — is derived at read, never stored. The wing's ground ring ends at the passage's edge (the stage-3 contract reads that ring) and every storey above extends over the span ring (the wing's extent at level ≥ 1 is its ring ∪ the span ring); at the ground storey the plan rung adds the span ring as a seed ring and passes it as a fixed ring — the passage room (role passage, scope circulation), never cut, its two end walls carrying the passage openings (J-A30.23); read on the base wing by the capacity (below), §8.5's span mark (also §8.4's span caster) and the 3-D export (§11.1), and on the base or the composed wing by the plan rung */ }
interface ComposedTower { centre: Point; radiusCm: Cm; heights: Heights; roof: RoofSpec }   // a composition's tower — for the plan rung a round wing: one round room per storey and the spiral stair core of the wing it joins (below); the wall tower entity is §2.7's Tower
interface Room { id: Id /* room:<building id>/<level>/<i> — an address carried by its anchor, the room's centroid within its wing (§6.3) */; ring: Polygon /* world lattice points inside its wing's extent at its storey (spans on the base or the composed wing; the passage room is a span ring): a value read back from the rung's transient arena, never a plat face (§3.4; J-A28.31) */;
  wing: number /* index into Composition.wings; a tower's round room names its ComposedTower by wings.length + the tower's index; the passage room names the wing that spans it */; storey: number /* Storey.level */; role: RoomRole; scope: 'unit'|'shared'|'service'|'circulation' /* §10.2's RoomRuleRow.scope: a household's own room, one the households share, the use's or the staff's, or a corridor, stair hall, landing or passage */;
  unit?: Id /* item 28 (f): the Household whose dwelling unit the room belongs to — present exactly when scope is 'unit'; edited by setRoomUnit (§7.1) */; program?: number /* index into Plan.program; absent for a generic room */;
  subLocation?: Id /* the SubLocation it hosts: rooms refine sub-locations, never replace them (below) */; hearth?: { wall: Id; at: Cm; chimney: Id }; lit: boolean /* a light at the room's spine summit (§8.5, §11.1; J-A28.32); corridors unlit */ }
interface Plan { storeys: Storey[]; program: ProgramRoom[] /* the programme as sized and allocated (the plan rung, steps 2–3 below): what the plan owed — read by the report, §13.2's bars and the re-cut */;
  units: { household: Id; form: UnitForm; entry: Id /* the Opening that is the unit's own door, onto circulation or the street */ }[] /* item 28 (f): one per household housed */;
  cores: StairCore[]; chimneys: Chimney[]; pattern: Record<number /* storey level */, LayoutPattern>; slices: SliceRef[] /* the programme, pattern, furniture and interior-ladder rows consulted (§2.8) */ }
interface Storey { level: number /* −k … −1 the basement's storeys, 0 the ground, 1 … n above */; wings: number[] /* the wings whose floors — or the basement ring — reach this level */;
  rooms: Room[]; walls: Wall[]; openings: Opening[]; windows: WindowRec[] }
interface ProgramRoom { rule: number /* index into the programme row's rooms (§10.2 RoomRuleRow) */; role: RoomRole; scope: Room['scope']; unit?: Id /* scope unit: the household it is for */;
  areaM2: [number, number, number] /* the row's min, target and max × the interior ladder row's size factor, interpolated along the occupants' value (below) */; storey: number; wing: number; anchor?: { entrance: number /* an entrance's ordinal: its entrance room, one per entrance (step 3) */ } | 'core' | 'hearth' | 'passage' /* the passage room: the span ring (step 1) */ }
interface Wall { id: Id; a: PointCm; b: PointCm; kind: 'exterior'|'party'|'partition'|'court'; left: Id | 'outside'; right: Id | 'outside' }   // exterior and court walls lie on the edges of the storey's extents (wing rings, and a span ring: the passage room's walls, J-A30.23), a party wall on the plot's party-wall edge (the stage-3 contract's fourth rung, below)
interface Opening { id: Id; wall: Id; at: Cm /* from a */; widthCm: Cm; kind: 'door'|'arch'|'open'|'entrance'|'passage'|'trapdoor'; entrance?: number /* the entrance's ordinal (the stable i of Entrance.vertex; item 29): every entrance opens here; the passage room's two arch openings are of kind passage and name no entrance (item 30, J-A30.23) */ }
interface WindowRec { id: Id; wall: Id; at: Cm; widthCm: Cm }
interface StairCore { id: Id; wing: number; tower?: number /* index into Composition.towers: a spiral in a round wing */; bay: Polygon /* the same bay on every storey it serves */;
  levels: [number, number]; kind: 'straight'|'dogleg'|'winder'|'spiral'|'ladder'|'trapdoor' }
interface Chimney { id: Id; wing: number; column: PointCm; levels: [number, number] }     // derived from a hearth column (a small fixed ring on the transient arena, §3.4); the roof construction draws it (§8.6)
type RoomRole = string;        // data-defined by §10.2's room-programme rows (our own names: hall, chamber, solar, parlour, kitchen, buttery, common room, cooking place, staff chamber, stair hall, forge, shop, store, undercroft, nave, passage …)
type LayoutPattern = 'bisect'|'follow'|'spine'|'hall_and_parlour'|'cross_passage'|'enfilade'|'nave';   // the cut patterns (the plan rung, below); rows, not code
type UnitForm = 'house'|'dwelling'|'lodging'|'apartment'|'room';   // item 28 (f): the interior ladder's unit forms, richest first (below)
interface InteriorLadderRow {   // item 28 (f): one row of the interior ladder (below) — the interiorLadder table of roomProgram.json (§7.6, §14); its default rows are the table below
  band: string /* a FieldBands.bands id: one row per band of the set (§4.5) */; form: UnitForm /* one household's unit */;
  households: [number, number | 'capacity'] /* the range a shell of this row houses, clamped into [1, capacity] (the capacity function, below): it bounds relet and the canonical chain's row steps, never the as-built count */;
  unitRooms: RoomRole[] /* scope unit */; shared: RoomRole[] /* scope shared, where the class's programme row allows */;
  staff: { count: { n: number; law: 'const'|'perPrincipalChambers' /* n rooms, or one per n principal chambers */ }; sizeShare: number /* of the owners' principal chamber's target */; placement: ('attic'|'basement'|'service')[] /* preferred first */ } | null;
  circulation: { roles: RoomRole[] /* scope circulation: stair hall, corridor */; patterns: LayoutPattern[] /* the circulation's cut patterns, preferred first */ };
  sizeFactor: number /* × the programme rows' room areas */ }
interface Entrance { vertex: VertexRef /* ('entrance', building id, i): a vertex on the footprint edge, indexed (§2.2 rule 7); i a stable ordinal — kept by a re-derived entrance that §6.3 re-matches, Building.nextEntrance for a new one, never re-used after a removal — which Opening.entrance and ProgramRoom.anchor name */; role: 'main'|'side'|'rear'|'yard'|'service'; faces: 'street'|'lane'|'alley'|'yard'|'court'|'passage' /* the way or part the door opens onto; passage: an item 30 passage face */;
  wing: number; side: number /* the wing ring's side, as Porch.side */; offsetCm: Cm /* along that side; side and offset re-read from the vertex after every carry (rule 3) */ }   // item 29; the rules are "Entrances" below
interface Basement { floors: number /* storeys below ground, ≥ 1 — the one stored count, which Heights.floorsBelow reads */; kind: 'full'|'half'|'walkout'; ring: Polygon /* inside the ground storey's wings and smaller than their union; world lattice points, carried with the wings by rule 2 (b)'s mean-value coordinates (CarriedShapes.basement; rule 4 checks it) */;
  access: 'core'|'trapdoor'|'external' /* how the plan rung joins it — the stair core (where no bay of the core fits inside the ring, a trapdoor core the plan reports: the plan rung, step 3), a trapdoor, or an outside stair (step 3's reported trapdoor core where no side of `Basement.ring` is long enough for its door); derived with the basement, a shell fact (Basements, below) */ }   // item 29 (b); the decision is "Basements" below
interface Porch { side: number /* the side of its wing's footprint ring that it stands on, by ring index */; offsetCm: Cm /* from that side's first vertex along the side */; widthCm: Cm; depthCm: Cm /* outward */ }   // relative to its wing: no world point, so it moves with the wing; its side and offset are the main entrance's, re-read after every carry (rule 3)
interface BuildingInput { lot: Polygon; access: Segment[]; slot: SlotPlan /* §2.5: at S11 the site plan's working hint; at a later outline() or compose() call the building's current footprint ring, resolved at the call */; ctx: ContextVector; cls: BuildingClass; assignment?: Assignment; drift: DriftBounds; seed: StreamKey /* derived from the building's lineage for this call; never stored */; terrain: TerrainSampler;
  fixedWings?: BaseWing[] /* the row arrangement's clipped quads (§4.7 S11): outline() returns them with heights and roofs and never re-fits them */;
  building?: Pick<Building, 'households'|'entrances'|'basement'|'subLocations'|'use'|'assignment'> /* the plan rung's content inputs (item 28), resolved at the call like the footprint ring */ }
interface BuildingGenerator {   // the stage-3 hook, split by cost (SCL-13)
  outline(input: BuildingInput, k: Kernel): KernelResult<{ wings: BaseWing[] }>;              // every LOD, exports, shadows: cheap and deterministic
  compose(input: BuildingInput, outline: BaseWing[], lod: 'wings'|'rooms', k: Kernel): KernelResult<Composition>;   // lazy, per visible tile
  plan(input: BuildingInput, composition: Composition, k: Kernel, prior?: Plan): KernelResult<Plan>;   // the fourth rung (item 28): lazy under §4.1's contract, on the click's request, on a transient arena per storey (§3.4); prior = the canonical prior a re-cut mutates (the interior ladder, below; §7.3) — never the cache
}
interface ClassRules { pick(ctx: ContextVector, bands: { field: { band: string; value: number } /* the occupants' band — the plot's fieldBand (§2.5) — and the current field value (the interior ladder, below): the specialisation and the room programme */; manifested: { band: string; value: number } /* from Plot.builtBand and FieldBands.middle by §4.11's floor rule: the geometry columns */ }, assignment?: Assignment): { cls: BuildingClass; specialisation?: string; heights: Omit<Heights, 'baseCm'>; roof: RoofSpec; template?: string } }   // a data table, not code: the class row and its designation template (§4.7 S11, item 19) — the geometry columns read at the plot's manifested band, the specialisation and the room programme at the field band (J-A19.43, J-A28.29)
// Replaceability and class change (item 31): how soon a band change may replace a building's stock is its designation template row's replaceability at the plot's builtBand (§10.2), read by §4.11's ladder; a class change at rung 2 (a mansion to a tenement, inn, workshop or chapel) is item 18's mutation and keeps the shell (§4.7 S11)
// The wing-carrying rule (below): pure, + − × ÷ and sqrt only (§6.5); when it runs: below.
interface CarriedShapes { wings: BaseWing[]; basement?: Basement /* item 29 (b): carried by rule 2 (b) and checked by rule 4 */; composition?: Composition /* only when stored (an edited stage-3 composition): its wing, court and room rings and its tower centres, and with a stored plan every storey's room rings, walls' end points, stair-core bays and chimney columns (rule 2 (b); J-P48) */ }
declare function carryWings(shapes: CarriedShapes, before: Polygon[] /* the footprint's rings before the change, outer first */, after: Polygon[] /* the same rings after it */,
  moved: (p: LatticePoint) => LatticePoint | null /* the position after the change of the footprint vertex — with spanned, of a span ring's vertex too — that stood at p; null: the change dissolved it */,
  pairing?: 'tiled' | 'overlapping' /* rule 4's pairing verdict, found from the vertex identities once per edit and reused by every halving of one step; computed when absent */,
  spanned?: { before: Polygon[]; after: Polygon[] }[] /* item 30: with a stored composition over a spanned passage, per span ring the rings of the footprint face ∪ that span ring before and after the change — the rings a stored point inside the span ring takes its mean-value coordinates in (J-P48 (2)) */): KernelResult<CarriedShapes>   // E_INVARIANT when rule 4's check fails
```

**The base outline builder.** The base ships `OutlineBuildingGenerator`: the site plan's rectangle, an L or T composed of
2–3 rectangular wings (MFCG Complex mode, FTG Dense/Gaps looks), a row's `fixedWings` passed through unchanged (below),
and — for institution classes (keep, temple, church, manor, hall, farmstead) — two further constructions behind the same
`outline()`:
1. **Footprint templates** (COV-FTG-F16): data rows of normalised shapes fitted to the claim — cruciform church (nave,
   transept, apse), cruciform keep with corner projections, octagon, n-gon (a 9-gon theatre), 6- and 7-pointed star
   temples, U-court, ring cloister around a court. Fitting is an affine map of the template into the claim's `lir`,
   then a boolean intersection with the claim; each template is stored as its constituent rectangles and wedges so the
   wing rule below holds.
2. **The axis-locked composer** (COV-MFCG-G05; our own construction of MFCG's idea): take the claim's OBB axes; cut the
   axis-aligned rectangle on the axis more perpendicular to the current longest edge at a ratio drawn from U(0.4, 0.6);
   recurse until cells reach the class's minimum cell (`minCell = baseCell · 2^(2·size − 1)`, a table row); keep each
   cell with the class's `fill` probability, keeping the cell nearest the main entrance and rejecting any drop that
   disconnects the kept set; retry ≤ 3 times on the `…/attempt=n` stream, then the full rectangle (reported). U, H,
   comb, cross and ring footprints emerge — the landmark silhouettes that show at city zoom.

Every footprint is stored as **wings** (VIS-10; J-P17) of the three `BaseWing` kinds — `rect` for the outline builder's
rectangles and its L / T compositions, `quad` for a row house (below), `polygon` for a template part with a `pyramid` /
`cone` / `dome` roof. Each wing carries its ridge axis (the wing's long axis, or the short axis in a table share of wings
— NG measures ≈ 36 %), its heights and its roof; the footprint is the wings' union, so the footprint hash at city LOD
does not depend on the wing split. The roof *construction* the renderer
draws (plain, skeleton-hip, skeleton-gable, fake gable per wing) is a style-sheet parameter over the stored wings (§8.2);
the model's `roof.kind` is the default that the 3-D export uses, so presets can change the picture without changing the
model.

**Row footprints are quads (J-P31, J-P39).** S11's row arrangement builds each row house's footprint by the boolean
`plot ∩ frontage band` (§4.7 S11, GEO-26), so two neighbours share one party-wall edge even on a bent or curved frontage.
That polygon is stored as one `quad` wing — its two side chains are the plot's party walls, straight or bent once where
the lot cut's bend falls inside the row depth (the side lines are bent lot cuts, §4.7 S10 (4)), its front and rear are
the clipped chains, and S11 records the four corners where the side chains meet the front and rear chains (`corners`) —
and S11 hands it to `outline()` as `fixedWings`; `outline()` adds heights and the roof and never re-fits it, so the
footprint the boolean made is the footprint the model stores (on a slope beyond `skirtMaxCm` S11 first splits it along
the contour into stepped quads, each a wing with its own corners). The quad's model ridge joins the arc-length midpoints
of the two chains its `ridgeAxis` names, so every row house has a ridge without a skeleton, and a bent party-wall chain
has one well-defined midpoint (on whichever of its two segments half its length falls). The drawn roof is chosen wing by
wing by §3.8 (the exact OBB roof for a wing that passes its convex near-rectangle test, else the validated skeleton with
its plain-roof downgrade); the per-wing fake-gable construction draws the stored ridge directly, and no reader asserts
that a party-wall side is straight. The union rule, O17 (i)'s identical footprint hash at every LOD and the stage-3
contract therefore hold for attached rows on curved frontages exactly as for rectangles (the curved-street fixtures of
§13.2).

**Wings follow their footprint — the wing-carrying rule (J-P42).** Wing rings store world lattice points, some of them
footprint vertex positions (with a stored stage-3 composition and its plan, the only entity records that do, §2.2 rule
5; a basement ring's points, all inside the footprint, are carried with them), so one pure function, `carryWings`, keeps
every building's wings on its footprint face through every change of that face's rings: a `warp` or `moveVertex` moving
a vertex of the face (the commit record's `moved` list, §3.3); a batch adding a vertex to one of its rings (a
neighbouring plot re-fitted with a corner on a shared party wall; II.1 (3)'s neighbour step splitting a kerb a row
footprint fronts; S12b's formal-garden grid line or orchard-part edge ending on a house wall, §4.9) or taking one out (a
dissolution, or that step's reversal); and S11's own insertion of the footprint, the first carry. **When it runs is
stage-agnostic (J-P47):** after every committed batch — generation or edit; derivation pool, hinterland unit or
generation worker — whose commit record lists a footprint face among the L4 faces it changed, a vertex of one among the
vertices it moved, or — for a building whose stored composition has a wing that spans a passage (`spans`) — that
passage's face among the L3 faces it changed or one of its vertices among the vertices it moved (§3.3), the batch's
writer runs `carryWings` for that building before its next batch (a passage and its front building lie in one block,
§2.5, and an edit that changes the passage face takes the building into its effective scope, as J-P48 (1)'s split faces
are, §7.3 item 1); the building's own S11 batch ends with the first carry, and a `warp` or `moveVertex` runs it inside
the step's whole-step validation (rule 4; §3.6, §7.4). The carry writes only the building's `wings` (and its basement
ring and stored composition), which belong to the writer's own faces — a district's S12b changes only its own footprints
(§4.1's laziness contract), an edit only those of its effective scope and seam exception (§7.3 item 1) — so generation,
a pool of any size, a replay and Regenerate (keep settings) run the same carries on the same rings and store the same
bytes (O9 (c)). The rule:
1. *Boundary runs are footprint runs.* The parts of a wing's ring that lie on the footprint's boundary — its **boundary
   runs** — are runs of the footprint's rings vertex for vertex, so a wing vertex on the boundary is a footprint vertex,
   identified by its lattice point (a vertex is unique per lattice point, §3.10). S11 establishes this at the first
   carry: it inserts the footprint's rings through every wing vertex that lies on the wings' union boundary — a
   collinear one included, as a shape vertex of the ring, which never dissolves (§2.2 rule 3) — and then carries the
   wings from the ring it inserted to the committed face, each input vertex matched to the vertex its insertion placed
   (`ChainInsert.placed`, §3.4; a row's quad, which the boolean on the arrangement made, already is its committed ring).
   Inside the footprint the same holds between wings: a vertex that one wing has on another wing's side — the joint of
   an L's two rectangles, a T's stem corner on its bar — is a vertex of both rings (a rect records it between its
   corners), so wings that share a side share it vertex for vertex. Every later carry keeps both properties.
2. *Carry.* For each such building, from the footprint's rings before the change and after it: (a) each boundary run is
   re-read from the rings after the change between its two end vertices, in the direction that keeps the footprint's
   interior on its left, matched by identity — an end keeps the vertex it was, wherever that vertex now stands — so a
   vertex the change added to the boundary joins every wing ring that runs along it, a dissolved one leaves it, and a
   moved one moves; a wing whose ring lies wholly on the boundary (a one-wing house, a row's quad) is re-read whole,
   from its first corner's vertex; (b) every other wing vertex — a joint where two wings meet inside the footprint, or
   the hidden corner of a wing that overlaps another — takes its mean-value coordinates with respect to the footprint's
   rings (outer and holes) before the change, applied to the rings after it with `+ − × ÷` and `sqrt` only (§6.5) and
   rounded to the lattice, so a joint two wings share maps to one point for both. The basement ring's points
   (`CarriedShapes.basement`, item 29 (b)) are carried the same way, in the same call (J-A29.23).
3. *Kinds.* A rect's and a quad's `corners` name the same corner vertices after the carry and are re-indexed. A rect
   whose carried ring fails §3.8's convex near-rectangle test becomes a `quad` with its four corners recorded and its
   `ridgeAxis` swapped — a rect's axis 0, along side 1, is a quad's axis 1, the line joining the midpoints of sides 2
   and 4 — so the ridge keeps its direction and the roof path is re-chosen on the carried ring (§3.8, §8.6); a quad and
   a polygon wing keep their kinds. After every carry each entrance's `side` and `offsetCm` are re-read from its vertex
   — the side of its wing's ring the vertex lies on and its arc length from that side's first vertex — and a stored
   composition's porch takes the main entrance's, re-read the same way on its composed wing's ring, so the stored
   numbers never disagree with the door (§6.3's re-match reads them; J-A29.23).
4. *Check (J-P49).* Every carried ring is simple and counter-clockwise, and the union of the building's wings equals its
   footprint face (integer equality after snapping — the stage-3 contract, below). It is decided exactly, at the least
   cost, by the building's **pairing**: whether every directed edge of its wing rings, keyed by vertex identity (a
   footprint vertex, or a joint the meeting wings share), is an edge of the footprint's rings — each used once — or the
   reverse of exactly one other wing's edge. The pairing depends on identities only, so it is found once per edit and
   holds through every halving of a step, which moves vertices and never adds or removes one; a batch that adds or
   removes a vertex recomputes it. Then: (i) a building whose every wing is re-read whole by rule 2 (a) — a one-wing
   house, a row's quad — needs no union: its ring is its footprint's ring, which the step's own validation keeps simple
   (§3.6), and only rule 3's test runs, on a rect; (ii) a building whose pairing holds — tiled wings: an L, T, cross or
   U of abutting rects, a template of tiles — needs only every carried ring simple and counter-clockwise, because the
   pairing makes the wings' winding numbers sum to the footprint face's at every point off the edges, so simple
   counter-clockwise rings cover each point of the face exactly once and nothing outside it; (iii) a building whose
   pairing fails — wings that overlap, such as a T whose stem runs into its bar — is checked by the kernel's boolean
   union on the arrangement (§3.7) against the face. For a `warp` or a `moveVertex` this check is part of the step's
   whole-step validation, which halves the step when it fails (§3.6; the edit layer's record check, as for a held pin,
   §7.4); it runs after the kernel's own checks of the step pass and stops at the first failing building in address
   order, since one failure halves the step. After any other batch a building whose check fails is re-derived by S11 on
   its plot (F-REDERIVE, reported); by rule 1 that cannot happen on the boundary, whose runs follow the rings exactly,
   and a joint moves only by the sub-centimetre route changes such a batch makes (§2.2 rule 3). The basement ring is
   checked in the same pass — simple, counter-clockwise and inside the footprint face (exact `orient2d` tests): an
   unedited basement whose carried ring fails is re-derived by the basement decision (below) inside the step, with no
   halving; an edited one fails the step's validation as a held pin does (§7.4), and after any other batch its edit is
   orphaned (§7.3 item 4) as a stored composition's is (J-P48), the basement being re-derived until the user re-attaches
   or discards the edit (J-A29.23). *Cost* (measured on a model of the rule, per building per validation pass, the carry
   and rule 3 included; Node 24 on the bench machine, `docs/validation/bench/fixall_pipeline_r5_wingcost.mjs` → `.out`):
   ≈ 0.06 µs for a row's quad, ≈ 0.4 µs for a one-wing rect (rule 3's test), ≈ 0.9–2.7 µs for tiled L, T, cross, U and
   inner-joint compositions (their check 0.15–0.4 µs of it), and ≈ 0.3–0.9 µs once per edit for the pairing; an
   overlapping composition adds its union, bounded by S11's compound geometry share (≤ 25 µs, §12.4's S11 row;
   PLAUSIBLE). On an assumed core mix — 55 % row quads, 25 % one-wing houses, 18 % tiled, 2 % overlapping — 450
   buildings, §12.6's district ceiling and about what a 150 m brush (≈ 7 ha) covers in a dense CITY core, cost ≈ 0.4 ms
   per pass and ≈ 3.6 ms in the worst case of a step and eight halvings, inside §12.6's warp Apply budget, which counts
   it; M3a's measurement on that brush and its pre-decided fallback are §12.6's.
5. *Undo, replay, `moveFootprint`.* The edit's undo record keeps the former rings (§7.4), and a replay performs the same
   carry on the same geometry, so it gets the same rings. `moveFootprint` applies its rigid move to the wing rings and
   S11 re-fits the plot with them as `fixedWings` — the first-carry path.

**A stored composition is carried with its wings (J-P48).** A stage-3 `Composition` is derived lazily and stores no
position until an edit stores it (`Building.composition`; the edit kinds that do so are stage 3's and the plan events of
§7.1; a hand-built one is stored by §2.6's test); from then on its world geometry — each composed `Wing.footprint`, each
court, each room ring (the rooms rung's and, with a stored plan, every storey's), each `Wall`'s end points, each
`StairCore.bay`, each `Chimney.column` and each `ComposedTower`'s centre — is carried in the same `carryWings` call as
the base wings, by the same rules. A porch is stored relative to its wing's side (`Porch`) and takes the main entrance's
side and offset after every carry (rule 3). A designation mutation (item 18) re-matches a stored composition's and
plan's rings to the target template by role inside its event (§4.7 S11) and re-cuts a stored plan by the re-cut rule
(the interior ladder, below).

* (1) The edit that stores it establishes rule 1 for it in the same batch: every point of those rings, wall ends, bays
  and columns and every tower centre that lies on the footprint face's boundary becomes a vertex of the footprint rings
  — on an L4 edge by a same-level L4 split, on a plot line (L3) or a kerb (L2) by an L4 Steiner vertex that
  `splitThrough` places, the composition's point re-read at the placed vertex (§2.2 rule 3) — and each such vertex
  carries a `('composition', buildingId, i)` vertex role row while the composition is stored, so no dissolution removes
  it (§2.2 rule 7); the row leaves with the composition when an undo removes it or it is orphaned (below). The base
  wings gain each such vertex by rule 2 (a), and a point one composed ring has on another's side is made a vertex of
  both (a data step on the record). Every face that shares a split edge — the building's own yard parts, a row
  neighbour's footprint across a party wall, a neighbouring plot's L4 face across the plot line — gains the vertex and
  is in the storing edit's effective scope, together with a row neighbour's wing rings, which its carry changes the same
  way; each ring equals its prior ring with those vertices removed (§3.3's same-level-split rule; the check of §7.3 item
  7 (ii)).
* (2) Boundary runs are re-read by identity and every other point takes its mean-value coordinates in the footprint's
  rings before the change — a stored room's point in a spanned passage's span ring (the plan's passage room's, or a
  room's above it, the rooms rung's or the plan's) in the rings of the footprint face ∪ that span ring (`carryWings`'
  `spanned`; J-A30.23) — applied after it and rounded, so a point that a wing, a court and a room share maps to one
  point for all of them, and a tower centre on the boundary, a footprint vertex, moves with it; each composed wing and
  tower is then re-based by `deriveBase` on the ground it now stands on, as the base wings are (§7.4).
* (3) A composed `Wing` has no kind to lose — its roof construction is re-chosen on the carried ring (§8.6).
* (4) The check adds every carried composition ring simple and counter-clockwise, the composed wings uniting to the
  footprint face (the stage-3 contract, by rule 4's tiers), every room ring inside the union of the face and the span
  rings of the passages the building spans (J-A30.23), a stored plan's rooms tiling each storey's extent (the contract's
  fourth rung, by §3.10's seed-tiling test) and every tower centre inside or on the face (exact `orient2d` tests).
* (5) The undo record keeps the former composition with the former wing rings (§7.4).

A failure inside a warp or `moveVertex` halves the step, as for the wings; after any other batch — where rule 1 makes it
as rare as for the wings — the stored composition's fate is **orphaned** (§7.3 item 4): the dry run lists it, the edit
that stored it stays in the log and in the document's orphan table, the record is dropped and the building composes
lazily from its carried wings until the user re-attaches or discards the edit — never silently. Wherever this document
names a building's wing rings as carried, re-based, excepted from locality or restored — §2.2 rule 5, §4.6 step 7, §5.3,
§7.3 (a) 4 and items 1 and 7 (ii), §7.4, II.1 (3), II.4 — a stored composition's rings, wings and tower centres and a
stored plan's points are included, by this rule, and the basement ring by rule 2 (b).

**Test.** "§2.6's test" — the B-EDIT fixture that exercises this rule (warps and vertex moves over L, overlapping T,
curved-row and holed footprints and a hand-built stored composition; generation equal to regeneration on a compound
whose garden edges end on the house wall) — is stated in §13.2 (and §7.3 item 7 (vi)). Receipts for the carry under
0.25–8 m displacement fields: `docs/validation/bench/fixall_pipeline_r4_wings.py` → `.out`; for the cost and the
pairing's agreement with the full edge test: `fixall_pipeline_r5_wingcost.mjs` → `.out`.

**Heights and the ground datum (owner HEIGHT ruling; AM-3; FTG-13).** Every building, wing, tower, keep, wall run, gate
and bridge carries heights; eave, ridge and tower heights are measured above `baseCm`, the floor level in terrain
centimetres. One per-entity function, `deriveBase(entity, sampler)`, computes every ground datum, and S11, S7, S1's
terrain operator (§7.3 (a)) and the edit layer after a warp or vertex move (§7.4) all call it: a wing's `baseCm` from the
terrain sampler (bilinear on the refined 2.5 m raster at the wing's vertices and centroid) is `max(samples) + plinthCm`
(table, default 30 cm), so no floor is buried; the fall under the wing (`max − min`) is a foundation skirt the 3-D export
extrudes down to the terrain and the shadow pass includes. Where the fall across a row footprint would exceed
`skirtMaxCm` (table, default 300 cm) the footprint is split along the contour into stepped wings, each within the limit
— terraces step down a hill instead of floating. Walls store their base as a knot profile along the trace (§2.2 rule 5),
gates and towers their own base from the samples under their footprints, bridges and pier decks a deck height from the
two bank elevations plus a clearance row. Shadows and the 3-D export (§11.1) read the same numbers, so they agree on any
terrain. The shadow pass is §8.4's (optional, off by default, timed at M2b); the base populates every height and keeps the
display list's shadow hook (§8.1) and its budget (§8.4, §12). The heights acceptance bar is §13.2's.

**Materials (COV-FTG-F20; item 19; owner, 2026-09-26: "different materials for construction is only represented by a
change in texture or color. It has nothing to do with the shape").** A material is a **rendering attribute only**: it
changes the texture and colour roles the style sheet maps it to (§8.2) and never a footprint, a wing, a storey, a height
or a roof form — the same geometry renders in any material, as in FTG; shape is decided by the designation template and
prosperity alone (§4.7 S11). `MaterialRow` is a rule table read by S11 whose **default rows reproduce FTG's model**
(item 23): one default material per growth stage (`key.stage`), overridden per district kind and per building class
(temples and churches stone by row), with wealth shown through the lifestyle-banded building pools (§10.2) and the
roof-colour role by band in the style sheet (§8.2) — never by a material keyed to the prosperity band. The **optional
regional shift** — rows marked `extension: 'regionalShift'`, off by default, a preset row (D-2) — may shift materials
with the prosperity band within what the region builds with, never as a universal ladder. A district's
`materialOverride` and a building's `setAttr` override the rows; enceintes carry their own wall material (§2.7). Wear
(`Building.condition`, item 31) is a rendering class over the same geometry (§8.2); a roof is lost only in the decline
ladder's derelict state (`decay`, `RoofSpec.kind 'none'`, §2.8). Test: a material change leaves the geometry subtree of
the digest unchanged (§13.2).

**Descriptions, opening hours, sub-locations (COV-FTG-F21, FTG-11).** A building's description is generated by the
naming engine (§10.4) from its class, use, owner and district, persisted per entity and editable; opening hours come
from the class table and are what the simulation module reads. `SubLocation` records (named parts of a building with
tags and capacities for leisure, temporary residence, guest workers, study and work) are filled from the class table
when the building is created; stage-3 rooms refine them (a `Room` may host a sub-location) and never replace their ids.

**The stage-3 hook and its cost contract (owner-staged; DEF-17, SCL-13).** Stage 3 replaces `OutlineBuildingGenerator`
with a lot-driven Fantasy-Manor-class generator (`manor.md` §3.3, §9 via the proposals: a lot-derived path of wings,
orientation fixed by the frontage, the lot polygon in the collision set, a class picker per plot from the same
`ClassRules` table). The interface is split so the city view never waits for a manor: `outline(input)` returns the wings
every LOD, every export and the shadow hook use — a row's `fixedWings` unchanged, with heights and roofs added — and
`compose(input, outline, lod)` returns wings with roofs, dormers, porches, towers, courts and rooms, lazily per visible
tile at district LOD and finer (a tile draws the outline until its compositions arrive). Their budgets — the base
`outline()` inside S11's geometry share, a stage-3 `outline()`'s admission bound and the re-declaration of S11's §12.4
row by the measured difference, `compose()` per building and per tile — are §12.7's. **The stage-3 contract:** the union
of the composed wings equals the outline's union exactly (integer equality after snapping), so O17 (i)'s identical
footprint hash at every LOD holds by construction (its test: §13.2). A composition's wings — generated or stored, and after every composition edit — reach every storey its base wings reach, with at least their area at each storey, so the households the capacity admits always fit its plan (F-PLAN tier 6, §5.2). The contract reads the wings' **ground rings**: a
wing that spans a passage (`spans` on the base or the composed wing, item 30) contributes its ground ring, its span ring
lying outside the union at the ground and inside the wing's extent above it. The plan's seed rings — base or composed,
clipped to tile (the plan rung's step 4) — stand at least `attractCm` apart except where they share a joint, so the plan
rung's transient arena inserts them unmoved (§3.4's seed contract). The seed clip (§3.4's `tileRings`) is given the
wings reaching a storey in the **clip order**: wing order, except that a wing whose extent there lies wholly inside
another's is taken after that container (two identical extents keep wing order), so a contained wing has no piece at
that storey — its floor there is its container's, and every anchor or fixed ring the plan rung places in that wing at
that storey lies in the container's piece — and no piece has a hole, which the clip refuses. The composed towers — each a round wing to the plan rung (`Composition.towers`) — join the clip order at every storey they reach: a tower whose ring there lies wholly inside the extent of a wing and overlaps no wing taken before the first such wing in the clip order (its container) is taken directly after that container, towers sharing a container in `Composition.towers` order; every other tower is taken before all the wings, in `Composition.towers` order; and no tower's ring lies wholly inside another tower's at a storey both reach (a stair inside a tower is its spiral core, `StairCore.tower`). So the clip order stays one order and no piece has a hole. Each tower's round room is its ring less those of the earlier towers in the clip order that it overlaps — its own piece when it precedes the wings, each wing's piece taking the arcs; a tower wholly inside a wing that overlaps a wing taken before that container is taken before the wings too, the earlier wing, not wholly inside the container, carrying the tower's cut to the container's edge; a tower that follows its container has no piece there, and its round room lies inside the container's piece.
A stair core's bay or a chimney stack that step 3 places inside a composer's room — the bay of a spiral core (`StairCore.tower`) inside its tower's round room, a stair or a hearth's stack inside a hall — stands against that room's wall, meeting its sides along one run and nowhere else, or fills the room (a stair turret); step 3 filters its candidates to those that stay out of every composer's room or stand in one so. At each storey where such a bay or stack lies, the plan rung passes the room less it, and no room where it fills the room, so the room keeps no hole and meets that bay or stack only along its sides (§3.4's `transientArena`).
Every composer's room (`Composition.rooms`), a tower's round room included, lies inside one seed piece at its storey — the composer emits it inside its own wing's or tower's extent less the extents before that wing or tower in the clip order, or inside its container's piece where the clip order leaves it none — so every fixed ring the plan rung passes lies inside one seed piece (§3.4's `transientArena`), and F-PLAN's abort on a refused composer's room (§5.2) marks a composer's bug. **Its fourth rung** (item
28): per storey, the union of the plan's rooms equals the union of the **extents** of the wings that reach the storey —
a wing's extent is its ring and, above the ground, its ring ∪ the span ring of the passage it spans (`spans`, on the
base or the composed wing) — and, at the ground storey, also the span ring of each passage a wing of the building spans,
which the plan reserves before any cut as one room of role `passage`, scope `circulation`, its two end edges exterior
walls carrying the passage's arch openings (the plan rung, below; §3.10's seed-tiling row; J-A30.23).
* **Stage-3 intake measurement and fallback.** The stage-3 intake measures the generator's `outline()` time per building
  class on B-CITY METROPOLIS seeds. If it exceeds §12.7's 10 µs median, `outline()` runs the generator's own massing step
  only (its wing rectangles without roofs or rooms); if that still exceeds the budget, the base `OutlineBuildingGenerator`
  keeps producing the outline and stage-3 `compose()` is constrained to it (its wings must union to the base outline).
  Diversity "from a giant manor to a small hovel" stays a property of `ClassRules` (data keyed by the context vector),
  not of the generator. The intake also runs §2.6's test with every fixture building's composition stored (§13.2), so a
  stage-3 generator is admitted only with compositions the base can carry and only with compositions that keep that storey rule.

**Entrances (owner, 2026-09-26: "larger buildings can have more than one entrance. there should always be a street facing
entrance. back or side entrances if an alley presents itself are optional or random but limited. back entrances in the
case of a larger court or yard is recommended"; item 29 (a); J-A29.21).** A building's doors are a set, `Building.entrances`:
each a named footprint vertex (`('entrance', building id, i)`, indexed, §2.2 rule 7) on the wing that faces its way,
carried through every change of the footprint by the wing-carrying rule (above), and derived by one per-entity function,
`deriveEntrances(building, plot, template row)`, that S11 (§4.7), the designation mutator (item 18, §4.7 S11 — a house
that becomes a shop gains its street door; a shop that closes keeps the door as a house door) and the edit layer
(`setEntrance`, §7.1, §7.4) all call, as `deriveBase` is called; its draws are the `siteplan.entrance` concern (§6.1), so
re-deriving the doors disturbs no site-plan draw. The rules are defaults; the rows are the designation template's
`entrances` columns (§10.2; item 23: the parity presets give one street entrance per building — MFCG's and FTG's rule —
with side and rear probabilities 0):
1. **One main entrance, always street-facing.** Exactly one entrance has role `main`. It lies on the plot's frontage access
   edge, 3 ± 1 m from the corridor (FTG's measured rule, §4.7 S11, §13.5), and faces the street. A set-back building on a
   multi-building plot (a compound's hall behind its forecourt) puts its main entrance on the court or the path that
   leads from the plot's street gate (`PlotBound.gates` on the frontage: the plot itself always has a street-facing gate or
   door); a hidden plot's main entrance faces its access face — the court or the passage (item 30, §4.6).
2. **Side and rear doors only where an access edge presents itself.** A `side` or `rear` entrance is drawn only where the
   plot has an access edge beyond its frontage — a lane, a through-alley, a back lane or a passage face (S8's interior
   treatments and S10's alley rung, §4.6, §4.7) — with the row's probability by class × size × band and capped by the row
   (`capSide`, `capRear`: one side and one rear door for ordinary classes; hovels and row houses ≈ never; shops and inns
   often on a corner; workshops and warehouses toward the lane); `service` entrances for institution classes, one per
   court side the row allows.
3. **A yard door is recommended.** When the plot's `yard` parts behind or beside the building reach the row's
   `yardDoorMinM2`, a `yard` entrance opens onto the yard or court by default — a kitchen or service door, never a public
   entrance.
4. **Every entrance is an addressable vertex.** Add, move and remove are building edits (`setEntrance`); the main
   entrance moves only along its street-facing side and is never removed; entrances are re-derived when the designation
   mutates and kept where an edit fixed them (§7.2). Its ordinal `i` is stable: a re-derived entrance that §6.3's anchor
   re-matches keeps it, a new one takes `Building.nextEntrance`, and a removed one's is never re-used (J-A29.23).
5. **The plan opens a door at every entrance** and roots its circulation at the main one; side, rear, yard and service
   doors are secondary roots, so a plan may legitimately have more than one way in (the plan rung, below); the passage
   room's two arch openings are the passage's own ways through (kind `passage`, no entrance), and a door from the
   building onto the passage is a side entrance facing `passage` (rule 2; item 30, J-A30.23).
§5.3's rows: exactly one main entrance per building, facing its street or court; no side or rear entrance without an
access edge beyond the frontage. Test: §13.2's entrance bars on B-CITY-lite.

**Basements (owner: "selective but appropriate basements"; item 29 (b); J-A29.22, J-A29.24).** `Building.basement` is
derived by the same function, never rolled alone, from: the class row's `cellar` columns (§10.2 — the base probability
by class: cellars for inns, taverns, breweries, storehouses, manors, keeps and temples by row, none for hovels, tents
and sheds; the kind weights; the slope threshold `slopeCm`; the rock cost; the cellar depth `depthCm`, default 220 cm,
and the ring's inset `insetCm`, default 60), raised within the class band by the prosperity value and by the building's
size and storeys (larger and taller more likely), and gated by the **terrain**, read from §2.3's facts and the context
vector — no new raster. The **water table** is the nearest water body's surface elevation (its shore's terrain sample)
plus the freeboard `freeboardCm` (default 50) for a plot within `waterTableM` (default 40 m) of a shore, and elsewhere
the height of the drainage line: the `hydro` cell nearest the footprint's centroid whose `flowAccum` reaches
`drainageAccumCells` (ties by cell index; where no cell reaches it, no water table limits the cellar) — the three values
are §10.2's basement-gate row. Against it: **no cellar** where the plot's `terrainClass` is `damp` or `flood`, or where
even a half-cellar's floor — the wing's `baseCm` less half the cellar depth — would lie below the water table; a
**half-cellar** where the full cellar's floor (`baseCm` less the depth) would lie below it and the half-cellar's would
not, or where `terrainClass` is `low`; a **walk-out** cellar where the fall under the footprint exceeds the row's
`slopeCm` (the same samples `deriveBase` reads — the skirt facts); `rock` lowers the probability by the row's cost. The
basement lies inside the ground storey's wings and smaller than their union (`Basement.ring`, inset by
`cellar.insetCm`), has its own storeys (`Basement.floors`, which `Heights.floorsBelow` reads; its floor `baseCm` less
the depth per storey) and is joined by the stair core, a trapdoor or an outside stair — `Basement.access`, derived with
it: `external` for a walk-out, else the class's programme row's `basementAccess` read at the plot's `builtBand` (§10.2),
a shell fact that never moves with the occupants and is edited with the basement (`setAttr(basement)`) — which the plan
rung reads (step 3). Its ring follows every change of the footprint by the wing-carrying rule (rule 2 (b); rule 4 says
what becomes of a ring that no longer fits; J-A29.23). It is editable (`setAttr(basement)`, §7.1; an edited basement is
kept through terrain changes, §7.3 (a)) and re-derived when its terrain gate changes. **A cellar never joins a sewer as
a room** (item 12: underground neighbourhoods front sewer tunnels only; J-A12.42): a cellar stair down to a tunnel is an
`AccessPoint` record (II.7.4), allowed where the class row's `undergroundAccess` is true. Emulation note: MFCG and FTG
have no cellars; Dwellings' basement share is a descriptive baseline only (§13.5); the terrain gate and the prosperity
term are our extensions (item 23). §5.3's rows: no cellar under the flood band; every basement inside its ground-storey
footprint and smaller than it.

**The plan rung — the fourth rung of the building ladder (owner, 2026-09-26: "a coherent floor plan of the building …
taking and tailoring to the building type and function"; item 28; J-A28.21; the Dwellings synthesis,
`research/findings/dwellings-synthesis.md`, ideas only).** Stage 3's ladder is outline → wings → rooms → plan
(`Composition.lod`); the plan is the building's floor plan per storey, derived by `BuildingGenerator.plan` from the
composed exterior and the building's content — never from a shape of its own — and staged with the Fantasy-Manor
buildings in the owner's order. The base carries the records above, the step's signature, the streams (§6.1), the events
(§7.1), the elaboration record and cache (§2.8, §2.9), the trigger policy (§4.1), the draw, export and budget rows (§8.5,
§11.1, §12.7), F-PLAN (§5.2) and §13.2's bars; adding the rung later is a registration. It runs **function first** —
the reverse of the reference's partition-then-label:
1. *Inputs — nothing is rolled.* The wings that reach each storey (`BaseWing.ring` or the composed `Wing.footprint`,
   with their `spans` (on the base or the composed wing) at level ≥ 1 and, at the ground storey, the spanned passage's
   span ring), each wing's `Heights.floors`, the basement (`Basement.ring`, `Basement.floors`), the entrance set, the
   composed towers, courts and porch, the class and its designation template's `programme` row (§10.2, read at the
   occupants' band — the plot's `fieldBand`, §2.5, J-A19.43), the use, assignment and sub-locations (one room each), the
   households housed (`Building.households`) and each spanned passage (`spans`): at the ground storey its span ring is a
   seed ring and a fixed ring, the passage room (J-A30.23). A plan is therefore a pure function of the building's
   committed state and its own streams (§4.1's contract, §6.2).
2. *Programme.* From the programme row and the interior ladder (below): a `ProgramRoom` list — each household's unit at
   its ladder row's form, the shared, service and staff rooms the row allows, the class's own rooms (a smithy's forge, an
   inn's common room, a chapel's nave), one room per sub-location — each sized in m² (the row's triple × the ladder row's
   size factor, interpolated along the occupants' value) with its storey rule, exterior demand, opening kind, adjacencies,
   hearth and priority; counts by the row's law (`const`, `perStorey`, `perHousehold`, `perCapacity`, `perSubLocation`; a
   fractional count drawn on `plan.program`).
3. *Allocation and anchors.* Each storey's capacity is the area of the extents of the wings that reach it (the passage
   room excluded) less the row's circulation share; hard rooms go by their storey rule, soft rooms by priority until the
   capacity is met, the household units first (F-PLAN tier 0, §5.2: a unit falls to the next poorer form before anything
   is dropped, and no tier drops a unit). The **stair core** (`StairCore`: a bay of the wing the row's `stair.placement`
   names, or the composed tower as a spiral — standing against the wall of any composer's room it lies in, a tower's round room among them, by the stage-3 contract) is placed before any cut and serves every storey of its wing, the basement
   as `Basement.access` says — `core`: the core takes a bay that lies inside `Basement.ring` as well as inside its
   wing's seed piece at every storey it serves (the placement's candidates filtered by exact containment, as §3.4
   requires of a `fixed` ring; the container's piece where the clip order leaves the wing none, the stage-3 contract);
   `trapdoor`, or the fallback where no candidate fits the ring (the core then stopping at the ground storey): a core of
   kind `trapdoor` serving the basement storeys and the ground storey, its bay inside the ring and inside one
   ground-storey seed, placed from the same filtered candidates — the fallback reported, writing no building record
   (`Basement.access` stays as derived; a click changes no digest, §6.2), and where not even that bay fits the basement
   is unreachable, which F-PLAN takes (§5.2, tier 1; J-A29.25); `external`, a walk-out's outside stair: the core
   stopping at the ground storey, a door (an `Opening` of kind `door`) opens the basement in the side of `Basement.ring`, among those at least two of step 4's wing-local modules long (a door's width), whose midpoint samples lowest on the terrain (the sampler `deriveBase` reads; ties by ring index) — where no side is that long, the basement is joined by the `trapdoor` fallback above, reported —; the entrance rooms
   (one per entrance) and the hearth rooms are anchors fixed in their wing and side before any cut, and the passage room
   is its span ring, fixed whole (step 1), so stairs are stacked by construction.
4. *Partition to targets.* Each wing of each storey is cut on the rung's **transient arena** (§3.4; J-A28.31) — its seed
   rings the extents of the wings that reach the storey, clipped to tile (where wings overlap, rule 4 (iii), each extent
   less the union of the extents before it in the clip order, which the stage-3 contract states, by §3.4's seed clip, `tileRings`), and at the ground storey each span ring (step 1); its fixed
   rings the stair core's bay, the chimney stacks, the passage room (a span ring, both seed and fixed) and the
   composer's rooms, each less a bay or stack it holds (the stage-3 contract) — by the storey's **layout pattern** (`LayoutPattern`, a weighted row per storey class in the
   programme row: `bisect`, recursive cuts across the region's short axis from a re-entrant corner where one exists;
   `follow`, cuts parallel to the long sides — a gallery on the court or street side; `spine`, a corridor along the
   wing's axis with rooms off it, the lodging house's and the inn's upper floors; `hall_and_parlour`, one cross cut with
   the hearth room larger; `cross_passage`, a through passage at the entrance with rooms either side; `enfilade`, rooms
   in a row with aligned doors; `nave`, one room), with the remaining rooms' target areas as the stop rule and the
   pieces assigned to programme rooms as they are cut, so no room waits for a label. Cuts are planned on a **wing-local
   module** — a table row, default 50 cm, in the wing's OBB frame; the planner's grid, never a second lattice — and
   written back as world lattice points (`Room.ring`), so walls are exact centimetre polylines, never cells; slivers and
   one-bay strips merge into circulation.
5. *Circulation and openings.* The room graph is built as a spanning tree first — priced by the programme, the pattern's
   hub (the spine, the hall, the stair hall) preferred, a bedroom's or a store's degree capped by its row — and loops
   are added by rule, never by chance (a kitchen to the yard door; a hall to the parlour and the stair; an enfilade's
   doors); a door at every entrance, rooted at the main one, the side, rear, yard and service doors secondary roots
   (item 29 (5)), and a walk-out basement's outside door, where step 3 opens one (`external`), the root of the basement's storeys; stair-core doors on every storey it serves; each unit's own entry door (the ladder, below); a
   `passage` opening in each end wall of the passage room (item 30). Openings and windows are records on wall segments.
6. *Exterior coherence.* Per storey the rooms tile the extents of the wings that reach it (the contract's fourth rung,
   above; a wing of fewer floors is roof at that level; a basement's outline is `Basement.ring`); chimneys are derived
   from hearth columns and rise to the roof (`Chimney`, drawn by §8.6); dormers are placed from the top storey's roofed
   rooms with exterior demand (`Wing.dormers` becomes derived, one per such room's façade bay, capped by the eave
   length); the porch sits at the main entrance; a composed tower is a round room per storey with the spiral inside
   (`radialSplit` for two), its bay against the room's wall (the stage-3 contract); windows follow each room's exterior demand, one per façade bay of its exterior wall, aligned
   across storeys where a wall stacks; furniture is abstract shapes by role from the row's `furnish` columns, never
   blocking an opening or the stair bay. Materials stay texture only (above).
7. *Streams, re-rolls, edits, failure, cost.* The rung's four concerns — `plan.program`, `plan.layout`, `plan.roles`,
   `plan.furnish` — are keyed with the rung's own reroll (§6.1): New random on `plan.layout` (`regenerate` with `rung`,
   §7.1) re-partitions and keeps the wings, the entrances and the stair core; on `plan.roles` re-assigns roles and what
   hangs off them (windows, door kinds, furniture) and moves no wall — the reference's restrictive re-rolls as our own
   rule. Room roles, walls, openings, windows, the stair core and a room's unit are events scoped to the building (§7.1:
   `setRoomRole`, `moveWall`, `splitRoom`, `mergeRooms`, `setOpening`, `setWindow`, `moveStairCore`, `setRoomUnit`; a
   room is lockable on its path); the first plan edit stores the composition with its plan, whose rings and points
   `carryWings` carries with the wings (J-P48, above). A programme that does not fit is F-PLAN's (§5.2), per building,
   never whole-house. **Rooms are values**, never L4 faces, so a click changes no plat and no digest (§6.2). Cost: one
   plan per click within §12.7's row; the room graph is exported in our own schema (§11.1).

**Elaboration by click, and the rung states (owner: "once generated it is saved … until something changes in them from
the simulator"; item 28 (b)–(c); J-A28.22).** When a rung is derived is the viewer's `elaborate` key (§2.9; `click`, the
owner's default, or `view` within §12's budgets — §4.1 states the policy); what it derives is fixed. Per building and per
lazy rung an **elaboration record** (§2.8) holds the state `absent` / `current` / `stale` / `edited` with the digest of the
rung's recorded inputs; a batch that changes one of them marks the rung `stale`, the cached result stays on view with a
change marker at every zoom (§8.5), and the next click re-derives it as a mutation from its **canonical prior** — the
stored plan where one exists, else the as-built plan carried along the interior ladder (below) — never from the cache
and never by a re-roll (§7.3); viewing never re-derives a `current` rung. Pre-assigned plots are the eager content
decision of §2.5 and §4.1: assigned at the city level, "just not generated" until the click.

**The interior ladder — the interior has no floor (owner, 2026-09-27: "following on the fact that we put a floor to the
geometry regarding prosperity, that does not mean the interior has to be … same building geometry but not the interior";
item 28 (f); J-A28.23 – J-A28.29).** Item 31's geometry floor bounds what is BUILT: a plot's shell never reads poorer
than its `geometryFloor` by wealth change alone (§4.11). The interior reads WHO IS THERE: the plan rung's programme is
written for the **occupants' band** — the plot's current prosperity **field** value and its band: the field at the
plot's sample point now (the sample §7.2's brush compares), banded by §4.5's rule (the plot's `fieldBand`, §2.5, kept
until the value crosses a cut by more than the hysteresis and re-banded at every epoch, so the band's memory moves with
it), which is `ContextVector.prosperity` and `prosperityBand` at the plot's derivation and follows the field after it
without re-deriving the plot (J-A19.43, J-A31.43, J-A28.29), never the manifested band and never `geometryFloor` — and
for the household count (`Building.households`), and the plan is re-cut inside the unchanged shell as they change. So a
mansion district that grows poor keeps its big shells while their interiors fill with families; the poor of a developed
town live in re-cut interiors behind grand fronts (this rule), in the back courts behind them (item 30, §4.11 rung 2)
and in the cheap stock of the edge (item 27's shanty rule, §4.5). The rule is **one table**, keyed by the band names of
§4.5's band set (`FieldBands.bands`; its middle row is the band `FieldBands.middle` names, so the shell's floor and the
interior's middle agree per settlement), read at the occupants' band and interpolated along the value inside a row; the
per-class programme rows (§10.2) follow it and add what a class needs. Its rows are `InteriorLadderRow`s (above), the
`interiorLadder` table of `roomProgram.json` (§7.6); the default rows (our own; calibratable, §13.9; tendencies
changeable per region and era, item 23 — no reference has interiors that follow their occupants, and with no epoch every
residential building houses what §4.7's generation fill gives it — at least one household and never above its capacity —
so the static baseline is unchanged):

| band (the default set) | form of one household's unit (`UnitForm`) | households per shell (clamped into [1, capacity]) | the unit's rooms (scope `unit`) | shared rooms (scope `shared`) | staff rooms (scope `service`): count; size as a share of the owners' principal chamber's target; placement | circulation (scope `circulation`) | room-size factor |
|---|---|---|---|---|---|---|---|
| `rich` | `house` — the whole shell | [1, 1] | hall, parlours, chambers, a solar, kitchen with hearth, buttery and stores | none | staff chambers, one per two principal chambers; 0.35; in the attic, the basement or the service wing, never beside the owners' rooms on a storey that has them | few corridors: a stair hall; `enfilade` or `hall_and_parlour` | 1.25 |
| `prosperous` | `house` | [1, 1] | hall or parlour, chambers, kitchen with hearth, a store | none | one staff chamber; 0.40; the service side or the attic | a stair hall | 1.10 |
| `comfortable` (the middle) | `dwelling` — a kitchen with hearth, a parlour and chambers | [1, 2] | kitchen, parlour, chambers | none: two households divide the shell by storey or by wing, each with its own door off the stair hall | none | a stair hall | 1.00 |
| `modest` (the lodging house) | `lodging` — a chamber and a parlour | [2, capacity] | chamber, parlour | a shared kitchen with hearth on the ground storey by the stair core; a common room where the class row allows | none | a corridor or stair hall inserted so that every unit has its own door (`spine` on the upper storeys) | 0.85 |
| `poor` (the tenement) | `apartment` — a bedroom and a small cooking place | [3, capacity] | bedroom, cooking place (a hearth where the class row allows) | shared facilities where the class row says | none | a double-loaded corridor (`spine`) on every storey, the stair core its hub | 0.65 |
| `squalid` (destitute) | `room` — a single room off the corridor | [4, capacity] | one room; no cooking place | shared facilities, or none | none | `spine` | 0.50 |

* **The dwelling unit (J-A28.25).** Every room of scope `unit` belongs to exactly one household (`Room.unit`); `Plan.units`
  lists each household's form and entry door; a household's unit is the rooms of its building's plan carrying its id
  (§2.7). **The unit-door rule:** each unit has its own entry door onto circulation — a corridor, stair hall or landing —
  or onto the street (an entrance), and never opens through another unit's room (§5.3's row; a `setRoomUnit` or plan
  edit that would break it is refused, F-EDIT, §5.2). Shared and service rooms open onto circulation. Units are given to
  households in address order by default; `setRoomUnit` overrides.
* **One capacity function (J-A28.23, J-A28.28).** `capacity(b) = min(households.max of the designation template at the
  plot's builtBand (§10.2), floor(Σ over the storeys s at or above the ground of A(s) × (den − num) ÷ (2 · den ·
  minRoomCm2)))` — `A(s)` the exact integer twice-area (`area2`, §3.2 (6)) of the union of the extents of the building's base wings (`Building.wings`, with their `spans`) that reach storey `s` (the contract's fourth rung, above) — never a composition's wings, stored or derived, so neither a click nor a stored composition moves it (§6.2): at the ground the footprint face's `area2` (the passage room,
  circulation, excluded); above it the sum of the extents' `area2` where the building's pairing holds (rule 4: tiled
  wings, whose rings never overlap; a span ring lies outside every wing ring) and the kernel's boolean union on the
  arrangement (§3.7) where it fails, so overlapping wings count once; `num/den` the circulation share
  (`RoomProgramRow.circulation`, an integer fraction, §10.2) and `minRoomCm2` the minimum area of the `room` form's one
  room (its `RoomRuleRow.area[0]`, in cm²), both read from one row — the class's programme at the band set's first,
  poorest band (`FieldBands.bands[0]`) — so the capacity is a property of the shell alone and never moves with its
  occupants; basement storeys excluded. A building S11 builds for a slot without `houses` (§10.2, §4.7) has capacity 0 — the slot's typing, like the template row, a fact of what the shell was built as, never of its occupants. Every host computes the same integer. The generation fill (§4.7: S10b places the
  households on the plot; S11, which creates the building and its wings, writes each residential building's `Building.households` clamped into [1,
  capacity]), §4.11's `relet` and F-PLAN (§5.2) read this one function, so the solver and the plan never disagree on how
  many households a shell holds. The bound holds through every change: a committed change that lowers a building's
  capacity below its `households` count — S11's operator (§4.7), a rewrite of the plot's `builtBand` (J-A31.44's paths),
  a change of its wings' extents (the carry after a `warp` or a `moveVertex`, by the wing-carrying rule above, or a
  moved face of a passage it spans, which moves its span rings, `Wing.spans`), a `setAttr` of its heights or its class,
  or a §7.6 edit of a table this function reads (the designation template's `households.max` or a structure's `houses` cell, the class's `liveIn`, the `circulation` share or
  the least `room`-form area in the class's programme row at the first band, or the band set, whose first band names
  that row) — re-homes the households past the capacity, the last in address order passing over a locked or pinned one (§7.2), which keeps its building, by §4.7's overflow pass inside the
  causing event, each move a lifecycle event of it (`relocate`, §2.8); a hand edit lists the moves among its dry-run
  fates (§7.3 item 4) and takes the receiving buildings into its effective scope (§7.3 item 1), and its undo restores
  them (§7.4). No such change is refused for it, except a hand edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or a household of no dossier's roster that no residential building of the district has room for (a dossier roster's household is re-housed by §4.7's re-provision) — which returns F-EDIT naming them, as a hand `relet` above the capacity does; S11's operator and an epoch's step leave a building whose locked or pinned households alone would exceed its new capacity unchanged, as a lock stops a rung-3 re-cut (§4.11) and any locked entity is a fixed input (§7.2), and a household no building of the district can take in a generation run or an epoch is F-SITING's (§5.2, J-A28.46). The capacity is the
  owner's "the more rooms for more occupying families the richer a building gets", read on the building: a shell built
  richer has more rooms to let — its `households.max` rises with `builtBand` — while the households actually housed
  follow the occupants' band.
* **Never omit a household.** The count the plan must house is bounded by the capacity, which is computed with the
  smallest form, so the `room` form always fits: a unit falls to the next poorer form (`house → dwelling → lodging →
  apartment → room`) before any room is dropped, and no tier of F-PLAN omits a unit (§5.2, J-A28.51); a hand `relet`
  above the capacity is refused (F-EDIT).
* **The re-cut, both ways (J-A28.26).** A change of the occupants' band or of the household count re-cuts the plan as
  item 18's mutation applied to rooms. FIXED, each in the form the transient arena takes it (§3.4; J-A28.33): the shell
  — each storey's seed rings (the extents of the wings that reach it, clipped to tile as step 4 passes them; at the
  ground storey each span ring; below the ground `Basement.ring`), opened again unchanged as the arena's seeds; every
  entrance and its door and the hearths — anchors placed before any cut, each in its wing and on its side (step 3); and,
  passed as `fixed` rings, the stair core's bay, the chimney stacks, the passage room (the span ring, both seed and
  fixed), the composer's rooms (each less a bay or stack it holds, the stage-3 contract) and the rooms the least-disruption rule below keeps. RE-DERIVED: partition walls,
  corridors, doors, roles and units. LEAST DISRUPTION: a room whose seed ring — the one it lies in: its wing's extent at
  that storey clipped to tile as step 4 passes it, or `Basement.ring` — is unchanged and whose ring fits a role of the
  new programme (its area inside the role's [min, max], its storey rule met) keeps its ring and address even when its
  role or unit changes; a shell mutation by item 18 keeps nothing in a wing whose clipped seed changed — which re-cuts a
  wing's rooms too wherever a change to an overlapping wing, earlier or later in the clip order, alters that wing's
  clipped seed (the clip's crossing vertices included, §3.4). Re-uniting the households removes what the subdivision
  added — exactly for an unstored plan, whose canonical chain (below) returns the earlier plan; a stored plan's re-cut (below) keeps by least disruption the subdivided rooms that still fit a role, and its rings keep the `composition`-role vertices its re-cuts added (J-P48 (1)), which the shell's identity reads without; its undo restores it exactly (§7.4). **The canonical chain:** the plan for (band row r, count n) is derived from the **as-built plan** — the class's
  programme at the plot's `builtBand` row with the template's `households.built` clamped into [1, capacity], whatever
  that row's household range (the ranges bound `relet` and the chain's row steps only; J-A28.28) — by a fixed order of
  least-disruption steps, each a re-cut from the previous step as its `prior`: first the ROWS, one band at a time from
  the built row toward r along `FieldBands.bands`, the count at each step clamped into that row's household range; then
  the HOUSEHOLDS, one at a time from the clamped count to n. The result depends on (r, n) alone — never on when a click,
  an epoch or a `relet` reached it (§6.2, §6.5 (9); each step's draws keyed by its target, §6.1; the cache memoises
  steps, §2.9) — and a return to the as-built row and count is the as-built plan exactly. A STORED plan is instead
  re-cut inside the event that changes its inputs, around its edited and locked rooms, with the inverse recorded (§7.3,
  §7.4; J-A28.72); that re-cut establishes J-P48 (1) for its new walls in the same event — a same-level split that moves
  nothing — so the shell's identity across a re-cut is read on its rings with the `composition`-role vertices removed,
  as §7.3 item 7 (ii) reads them (§5.3, T28-14). Each step is one open, cut and read-back of the transient arena,
  counted by §12.7's plan row.
* **Staff and shared rooms (J-A28.27).** Staff rooms are dwarfed beside the owners' — their size a share of the owners'
  principal chamber's target (the row's column) — and sit where a house keeps its service: the attic, the basement or the
  service wing before a storey the owners' rooms occupy; a lodging house's shared kitchen or common room sits on the
  ground storey by the stair core, the circulation hub. Both are programme rows (`scope` `service` and `shared`), so a class
  or a culture may keep a common kitchen down to the poor row or drop it earlier.
* **Editable.** A room's unit (`setRoomUnit`), its role and walls (the plan events) and the household count by hand
  (`relet`, a `convert` on the building, §7.1) are events; the ladder's rows are §7.6 tables.
* **Bars:** §13.2's T28-13 – T28-18.
=== END ===

=== J-ROWS ===
| J-A28.23 | the owner's "the more rooms for more occupying families the richer a building gets" read as the shell's capacity, and one integer capacity function stated in §2.6 that the generation fill (S10b's placement, S11's write), `relet` and F-PLAN all read; the bound kept through every change that lowers a capacity by re-homing the excess (§4.7's overflow pass, inside the causing event), never by refusing the change, except a hand edit whose excess cannot be re-homed, which returns F-EDIT; the re-homing passes over locked and pinned households; a building built for a slot without `houses` has capacity 0, so a change that leaves a building no residential slot re-homes its households | §2.6 |
| J-A28.26 | the re-cut's canonical chain — rows first, then households, from the as-built plan — with the shell reopened as the arena's seed rings (the wings' extents clipped to tile, the span ring, the basement ring), the entrances and hearths as anchors, the stair bay, stacks, passage room, composer's rooms and kept rooms as `fixed` rings, and the kept-room rule read on the room's clipped seed ring; a stored plan re-cut inside its changing event, the shell's identity across it read without the `composition`-role vertices its new walls add; the seed clip in the clip order — wing order, a wing wholly inside another's at a storey after that container; the composed towers before all the wings in `Composition.towers` order, but a tower wholly inside a wing that overlaps no wing taken before that container directly after it, and no tower wholly inside another — so no piece has a hole, every composer's room inside one seed piece; a stair bay or chimney stack inside a composer's room stands against its wall, the room passed less it (a tower's spiral core; a stair turret's bay alone) | §2.6 |
=== END ===

=== RATIONALE-A ===
| J-A28.23 | Chose to read the owner's last sentence — "the more rooms for more occupying families the richer a building gets" — on the building, as its capacity, and to state one integer capacity function in §2.6 (the smaller of the template row's `households.max` at the plot's `builtBand` and the storeys' exact twice-area less the circulation share over the smallest unit form's minimum area) that the generation fill (S10b's placement, written by S11 once the building's wings exist, since the capacity reads their extents and S10b runs before them), `relet` and F-PLAN all read, over reading the sentence on the occupants or letting each path compute its own bound, because read on the occupants the sentence contradicts the same message's first clause ("more prosperity means a larger home for a smaller family"), while read on the building it is exactly the shell's rooms to let, rising with the band it was built for; and one function in exact integers is the only way the solver and the plan agree on every host (§2.6; item 28 (f); with the pipeline's J-A28.44; repair round 2: V-MAB1-03). The bound is kept through every change that lowers the capacity — S11's operator, a new `builtBand`, a carry that shrinks the wings, a moved face of a spanned passage, a change of heights or class, an edit of a table the function reads or of the band set — by re-homing the households past it, the last in address order, by §4.7's overflow pass inside the causing event, never by refusing the change, because refusing would make an ordinary edit fail on a count the user never set, while re-homing is exactly what the generation fill already does with a household its shell cannot hold (repair round 3: V-MAB2-01). A locked or pinned household keeps its building and the re-homing passes over it; a hand edit whose excess cannot be placed is refused rather than dropping a household, because a user's edit must never delete population the dossier or the roster supplied (verify-model-r3 V-MAB3-01 with VD3-11 and VP3-07). A building built for a slot without `houses` has capacity 0, over a shell-only capacity that such a building never uses, so every change that leaves a building no residential slot — a `houses` or `liveIn` table edit, a designation mutation — re-homes its households by this rule, with its fates, its F-EDIT refusal and its undo (verify-pipeline-r1 VPH1-02). |
| J-A28.26 | Chose the canonical chain as the re-cut's definition — the plan for a band row and a household count derived from the as-built plan by least-disruption steps in one fixed order, the rows first (one band at a time, the count clamped into each row's range) and then the households (one at a time) — with what stays stated once in the forms the kernel's transient arena takes (the shell — each storey's seed rings: the wings' extents clipped to tile, the span ring at the ground storey, the basement ring below it — opened again unchanged as the arena's seeds; the entrances and the hearths as anchors placed before any cut; the stair core's bay, the chimney stacks, the passage room, the composer's rooms and the kept rooms as `fixed` rings), the kept-room rule read on the seed ring the room lies in as the arena clips it, and a stored plan re-cut inside its changing event with the shell's identity across it read on rings stripped of the `composition`-role vertices its new walls add, over the cached result at click time or households-first, over a fixed list that passed seeds and vertices as `fixed` rings, and over a kept-room rule read on the wing's unclipped ring, because a chain from committed state makes the plan a function of its inputs alone (§6.2, §6.5 (9)) and returns the as-built plan exactly when the households are re-united; rows first lets each household step happen with the final unit form, so the interior degrades before it multiplies, which is cheaper and what real subdivision did; a wing ring or a basement ring passed as a `fixed` ring would be one uncut face and an entrance is a vertex, not a ring (§3.4's contract); after item 18 changes an earlier overlapping wing a later wing's clipped seed moves although its ring does not, so a room kept by its wing ring would be refused by the arena (`overlap`); and J-P48 (1) makes every new wall end on an exterior wall a footprint vertex in the same event — a split that moves nothing — so the shell's byte-identity bars read the shell without those vertices, as §7.3 item 7 (ii) does (§2.6; item 28 (f); with J-A28.71 amended and the kernel's J-A28.33; repair round 2: V-MAB1-06, V-MAB1-08, V-MAB1-09, VK1-03). A wing whose extent at a storey lies wholly inside another's is clipped after that container (two identical extents keep wing order), so it has no piece there — its floor is the container's — and no piece has a hole, which §3.4's seed clip refuses, because a seed is one ring; and since the one overlay puts every crossing vertex on the earlier ring too, a change of an overlapping wing re-cuts the rooms of the wing before it as well as after it (repair round 3: V-MAB2-09 with VK2-05 and VD2-09). A composed tower stands in the clip order before every wing it engages, over taking it last with its room clipped to a partial disk, because a round tower keeps its round room (the realism tiebreaker; a composer's towers are whole) and the engaged wing's rooms take the arc as a wall; every other composer's room lies inside its own wing's piece, so every fixed ring lies inside one seed (verify-kernel-r3 VK3-01; closing ruling). The composed towers take one of two places in the clip order — before all the wings, in `Composition.towers` order, or, for a tower wholly inside a wing that overlaps no wing taken before that container, directly after its container — and no tower lies wholly inside another, over ordering a tower before each wing it engages and after each wing that contains it, which gives no order for two engaged towers or for a tower inside one wing that engages an earlier wing, and over clipping such a tower's round room to its container's piece, because the two places always give one order with no holed piece; a tower that engages a wing taken before its container keeps its whole round room there, since that wing already carries its cut to the container's edge (the realism tiebreaker; a composer's towers are whole); of two engaged towers — a stair turret on a tower — the later in the composer's order takes the earlier's arc; and a tower inside another tower would give two overlapping round rooms, which the arena refuses, or a round room with a hole, while a stair inside a tower is its spiral core (handfix-b verify-model-r0 VHM-04 with verify-kernel-r0 VKH-01, reconciled). A stair core's bay or a chimney stack placed inside a composer's room stands against the room's wall, and the room is passed less it — the bay of a spiral core inside its tower's round room, the bay alone where it fills the room (a stair turret) — over passing the bay and the whole round room, which §3.4's transient arena refuses as overlapping fixed rings, so that every tower carrying its spiral would fail, and over a bay in the middle of the room, which would leave the room a ring with a hole; a spiral stair in a round tower stands against its wall or fills a stair turret (the realism tiebreaker), and a hall's stair or its hearth's stack is the same fixed ring inside a composer's room, so one rule serves them all (handfix-b verify-model-r1 VHM1-03, widened by repair-model-r2 to the stack and the hall's stair). |
=== END ===
