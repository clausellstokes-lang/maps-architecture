# repair-r1-model — lane handfix-b/repair-model-r1 (MODEL part): block file per the BLOCK PROTOCOL; text before the first
# "=== " line is ignored by apply-blocks.py. Rulings, receipts and the issue table: repair-model-r1-report.md (this folder).
# ASSEMBLER HAND-OFF — after apply-blocks.py has applied every repair-r1-*.md, in this order (both checked on a combined copy):
# (1) RESTATED ROWS. J-ROWS restates J-A28.23, J-A28.26, J-A28.28 and J-A29.25, RATIONALE-A restates J-A28.26 (same ids):
#     move each restated row into its older row's place and delete the older (assemble-r1-handoff.py's swap_restated).
#     J-A30.26 is new (index row and Part A entry) and needs no swap.
# (2) TWO ONE-STRING SUBSTITUTIONS in text other lanes' blocks carry (each old string occurs exactly once after the blocks):
#  H1 §7.3 item 1 (repair-r1-determinism.md's §7.3 block) — old:
#     composition has a wing spanning the passage (§2.6's carry trigger);
#   new:
#     composition has a wing spanning the passage (§2.6's carry trigger); an event that changes a spanning wing's heights, or makes its building a footprint trace or a tombstone, holds the passage it spans, whose `headroomCm` or `frontBuilding` it rewrites (§2.5's `Passage`, §2.6's `BaseWing.spans`);
#  H2 §13.2 T8-3 (repair-r1-scope.md's §13.2 block) — old:
#     demolished or succeeded;
#   new:
#     demolished or succeeded, and a front building made a footprint trace or demolished leaves its passage with no `frontBuilding` and no base wing spanning it, the undo restoring both (§2.6's `BaseWing.spans`);
# VHM-01 (3), the T30-4 clause, is already carried by repair-r1-scope.md's §13.2 block; this file has no §13.2 block.

=== REPLACE ### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector ===
### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector

```ts
interface District { id: Id; kind: DistrictKind /* feature-named: central, market (one per market of either rank, item 24), docks, gate, riverbank, castle, temple, park, craft, sprawl, suburb, shanty, hinterland, underground (the owner-staged layer's pseudo-district, II.7.3 — a pseudo-district like hinterland), … data-defined; never a social class */;
  quarter: Id /* the label-level grouping (§9.1) */; faces: FaceRef /* L1 coarse faces, before and after infill */; boundary: TypedBoundary; seams: Id[] /* its Seam records (II.1): one per boundary run, shared with the neighbour across it; the district's SeamContract is the view assembled from them — from milestone 1 */;
  character: CharacterVector; venueMix: Record<string, number>; prosperity: { mean: number; band: string }; growthStage: number;
  fabric: FabricStrategyId /* 'bent-cut' in the base; ring / square / street at stage 2 */; fabricParams: Record<string, number>;
  buildingScale: number /* 0.5–2, default 1: FTG's "smaller / bigger" knob as a continuous multiplier on footprint targets (§4.7 S11) */;
  materialOverride?: Partial<MaterialRow> /* §2.6 */; allocation: Id /* the district's Allocation record (§4.5 S7b) */; subDistricts: Id[];
  description?: TextRef /* a generated one-line summary of the mix and features (§10.4), regenerated when the mix changes, editable */;
  namingFeature?: Id; name?: NameRef; lifecycle: Lifecycle }   // labels: LabelEntity (§9.1)
// Quarters are §9.1's QuarterNode merge tree, built by S6 (§4.5); its city cut is the city-LOD label unit (§9.4)
interface SubDistrict { id: Id; district: Id; blocks: Id[]; cluster: string /* roster cluster tag, e.g. a trade group */ }             // FTG's sub-district: a contiguous block group a cluster is placed into (§4.7 S10a)
interface Reservation { id: Id; kind: 'castle'|'plaza'|'market'|'precinct'|'institution'|'park'|'harbour_basin'|'moat'|'canal';
  rank?: 'principal'|'secondary' /* market kinds only (item 24): the principal market — the plaza when it wins S3 (12)'s trade score, else a flanking site — or one of S7b's secondary markets (§4.2, §4.5); setAttr-editable */;
  face: FaceRef /* L1 barrier face(s); water kinds are L0 faces */; areaBandM2: [number, number]; compactnessMin?: number; owner?: Id /* castle, institution, commons */;
  attach: VertexRef[] /* ('attach', reservation id, i): perimeter vertices arterials end at (plaza) or the wall welds through (castle on the enceinte) (§2.2 rule 5) */; stage: StageId /* S3, S7 (gate plazas) or S7b */; lifecycle: Lifecycle }
interface Allocation { id: Id; level: 'town'|'district'|'block'; target: Id /* town, district, block, the hinterland pseudo-district, a sky pseudo-district (II.6) or the underground pseudo-district (II.7.3) */;
  rows: { cls: string; band: string; count: number; claim?: Id /* Reservation for items larger than a block */; subDistrict?: Id;
    near?: Id /* hinterland rows only: the district an edge orchard serves (§4.9) */; areaM2?: number /* area-sized rows: edge orchards, sky capacity */ }[];
  lifecycle: Lifecycle }   // persisted; the eager content decision every lazy or per-district stage honours (§4.1 laziness contract); stores no stream key (§2.4)
interface FieldBands { field: 'prosperity'|'density'|'greenery'; cuts: number[] /* ascending, on the field's [0, 1] value */; hysteresis: number /* default 0.02 */;
  bands: string[] /* the band set's ids in order — cuts.length + 1 of them — from §4.5's `prosperity.bands` table (item 27); every band-keyed row key is one of them */;
  middle: string /* the settlement's middle band — the band that holds its median household under the roster's wealth shares, designated at S6 with the cuts (§4.5; J-A27.42): the band §4.11's geometry floor bounds a plot's manifested geometry to (item 31), and the row §2.6's interior ladder reads as its middle (item 28 (f)) */;
  source: 'roster-shares'|'table'|'edit'; epoch: number }   // computed once per town at S6 and changed only by an explicit edit or an epoch (§4.5)
interface Block { id: Id; face: FaceRef /* L2 built block(s) */; district: Id; subDistrict?: Id; frontages: Frontage[]; depthClass: string;
  interior: 'plots'|'court'|'back_lane'|'through_alley'|'rear_plots'|'green'|'landmark'|'reserved'|'wall_strip'|'empty' /* the deep-interior treatment, decided in S8 (§4.6); 'wall_strip': an enceinte's band, setback and glacis block, never plotted (§4.8) */;
  reach: 'open'|'passage'|'gated' /* item 30: how a court or rear-row interior is reached from the public way — drawn with the treatment in S8 (§4.6); 'open' for every other interior and in the parity presets */;
  due?: { band: string; since: number /* the epoch of the crossing */; epochs: number /* epochs spent in that band since */ } /* item 31: the block's value crossed a cut past the hysteresis at an epoch and its stock has not yet met the new band; written and cleared by §4.11's wealth ladder, never by a brush */; reservation?: Id }
interface Frontage { id: Id; way: Id; edges: EdgeSetRef /* ('frontage', frontage id): the L2 kerb edges of this block on this way */; class: WayClass; lengthCm: Cm }
interface Plot {
  id: Id; face: FaceRef /* L3 */; block: Id; district: Id;
  frontage: EdgeSetRef /* ('frontage', plot id) */; access: EdgeSetRef /* ('access', plot id): ≥ 1 edge always (§5.2 F-PLOT); an access edge lying on a sealed Passage face (below) is a sealed access edge */; depthCm: Cm; frontageCm: Cm;
  exposure: 'street'|'lane'|'alley'|'court'|'hidden'|'sealed' /* item 30: how the plot is reached — derived at §4.6 from the block's interior access graph when S10 types the access edges (by adjacency and reach depth, never a sight line, J-A30.42); 'hidden': every reach to a public kerb passes a passage, a gated opening or two or more interior faces; 'sealed': every reach passes a sealed passage */;
  knownTo: 'public'|'local'|'secret' /* item 30: who knows the place — defaults from exposure (hidden → local, sealed → secret — item 30 (e)'s lost place, J-A30.24 — else public), otherwise a dossier fact (§7.7) or a setAttr; read by §9.2's label policy and the reader (§11.2), never by geometry */;
  partyWalls: EdgeSetRef /* ('party_wall', plot id): one shared edge per wall; the neighbour is the owner of the face across */;
  bounds: PlotBound[] /* the boundary treatment of every non-party-wall edge (VIS-8) */;
  owner?: Id /* household | business | institution */; use: PlotUse; sitePlan: SitePlan;
  buildings: Id[] /* 0..n footprints */; yard: YardPart[] /* typed sub-areas (YardPart, below) */;
  builtBand: string; builtProsperity: number /* item 31: the band and the field value on [0, 1] the plot's present stock was built for — persisted attribute columns, in schema order in the leaf digest (§6.2) and in the snapshot (§2.9), never recomputed from the field (J-DET-12); written by generation and the paths J-A31.44 lists (§4.11) and by no bare setAttr (§7.1); `geometryFloor` is derived from it at read (below) */;
  fieldBand: string /* item 28 (f): the occupants' band — the plot's prosperity band by §4.5's rule with its hysteresis read against this column, so the band's memory moves with the band (J-A28.29); set by every derivation that reads the current field (= its ctx.prosperityBand, banded against this column, by the cuts alone at the plot's first derivation — a field brush's re-derivation past τ among them, §7.2; Regenerate (keep settings), which reads the recorded inputs, keeps it as it keeps builtBand) and re-banded after S6 at every epoch (§4.11); a persisted attribute column, in the leaf digest (§6.2) and the snapshot (§2.9), derived — no setAttr (§7.1); read by §2.6's interior ladder, ClassRules.pick and the plan rung's recorded inputs (§2.8) */;
  ctx: ContextVector; derivedFrom: DerivationRecord /* §2.8 */; assignment?: AssignmentRef; members?: Id[] /* joined plots (EVO; item 31's fusion, §7.1) */; lifecycle: Lifecycle;
}
interface PlotBound { id: Id; edges: EdgeSetRef /* ('treatment', bound id): the treated sub-edges; a gate opening is the sub-edge carrying the indexed `gate_opening` role instead of `treatment` (splitThrough at the gate ends) */;
  side: 'frontage'|'side'|'rear'; treatment: 'none'|'fence'|'hedge'|'wall'|'railing';
  heightCm: Cm; gates: { opening: EdgeSetRef /* ('gate_opening', bound id, i): the open sub-edge */; widthCm: Cm }[] /* every access edge with a treatment has ≥ 1 */; ownedBy: Id /* one owner per shared edge */ }
interface YardPart { id: Id; kind: string /* data-defined — the designation templates' yard rows name them (§10.2 DesignationTemplateRow.yard): yard, garden, court, orchard, midden, pen, vacant, formal_garden, forecourt, churchyard, shore, … */;
  face: FaceRef /* L4: a yard sub-area bounded by 'yard_part' edges (§2.2 rule 7), made by S11's yard partition (§4.7 S11, §4.9) */; lifecycle: Lifecycle }   // the lineage unit of its address is the plot (§6.3)
// DerivationRecord (what S10–S12b read last time; Regenerate (keep) re-reads it, §4.5, §4.11) is defined once, in §2.8.
interface SitePlan { arrangement: 'row'|'compound'|'detached'|'hovel'|'tents'|'institution'|'none'; coverage: number; slots: BuildingSlot[]; frontJitterCm: Cm; ruleRow: string }
interface Passage { id: Id; face: FaceRef /* the L3 face of kind passage: a covered alley-as-face cut along one side line of the front plot, from the kerb to the court or rear row it serves (§4.6, §4.7 S10 (9)); the kernel's J-A30.31 */; block: Id; frontPlot: Id; frontBuilding?: Id /* the building whose wing spans it — written by S11 with its wings' BaseWing.spans and cleared as §2.6's BaseWing.spans states */;
  widthCm: Cm; headroomCm: Cm /* the passage's clear height — the ground storey it takes, the storeys above keeping the frontage continuous (§2.6): derived, written by S11 whenever it writes the spanning wings' BaseWing.spans (§4.7 S11, §2.6), and so on every re-fit, and re-derived inside every other event that changes a spanning wing's heights (a `setAttr` of heights, §7.1, or the `undo` of one, §7.4), which holds the passage in its effective scope (§7.3 item 1), as the least ground-storey height (eaveCm ÷ floors, rounded down to the centimetre) over the base wings that span it — kept as it stands, and read by no reader, while none does (a front building made a footprint trace or a tombstone, §2.6's BaseWing.spans), until S11 writes it with a successor's spans; S11 gives every spanning wing at least two floors (raising its class row's floors to two where they would be one), so each spanning wing's eave stands above the headroom (§8.5 (2)'s span mark, §8.4, §11.1); a heights edit that would leave a spanning wing below two floors is refused (F-EDIT, §5.2) */; sealed: boolean /* item 30 (e): a bricked arch — sealPassage / openPassage (§4.11, §7.1), no geometry change; the one stored bit behind "a sealed access edge" and a plot's exposure 'sealed' (§4.6) */; lifecycle: Lifecycle }   // item 30; the entity registry (§2.8)
interface BuildingSlot { role: string /* house, hall, stables, workshop, chapel, barn, kitchen, brewhouse, tent, … */; entranceOn: EdgeSetRef /* ('access', plot id): the access edges the slot's main entrance may lie on — the frontage for a front slot, the court or the path from the plot's street gate for a set-back one (§2.6's entrance rules, item 29); side, rear and yard doors read the plot's other access edges and yard parts there */;
  frontage?: 'none'|'lean_to'|'stall'|'shopfront'|'arcade'|'gate'|'wall' /* the designation template's frontage treatment for the main slot (§4.7 S11, item 19), persisted with the slot */ }   // persisted: no polygon
interface SlotPlan extends BuildingSlot { hint: Polygon /* S11's working shape for the slot — transient, never stored; a later outline() or compose() call gets the building's current footprint ring, resolved from its FaceRef at the call (§2.6) */ }
interface ContextVector {   // the per-plot vector every rule table reads (owner hook; O7 / O17 / O18 / O19)
  areaM2: number; shape: { obbW: M; obbD: M; compactness: number; reflex: number; corner: boolean; wedge: boolean };
  frontageM: number; roadClass: WayClass; roadWidthM: number;
  districtKind: DistrictKind; quarter: Id; venueMix: Id /* the district's mix, read through the district, never copied per plot (SCL-5) */;
  prosperity: number; prosperityBand: string; density: number; greenery: number;   // continuous values + banded class (O18), as sampled at the plot's derivation; after it a building's interior reads the current sample and the plot's fieldBand (above) — §2.6's occupants' band (J-A28.29)
  dist: { centre: M; plaza: M; market: M /* the nearest market of either rank (item 24) */; gate: M; wall: M; water: M; shore: M; harbour?: M };
  upstream: number /* 0 = upstream … 1 = downstream along drainage */; slope: number; aspect: Cdeg; upwind: number; baseCm: Cm;
  terrainClass: 'high'|'mid'|'low'|'damp'|'flood'|'rock'; growthStage: number; epoch: number; buildingScale: number;
  arena: 'ground'|'underground' /* item 12: keys the arena-specific rows of the granularity table and of the designation templates' arrangement (II.7.3) */;
  rosterAssignment?: Id; assignment?: Id;
}
```

The context vector is stored as struct-of-arrays columns per district partition (one typed column per field), not as an
object per plot (SCL-5). A plot is the parcel (the owner's stage-3 wording and the references' code say *lot* for the
same thing; this document says *plot* except when quoting them, and *building* only for a footprint with heights
standing on a plot); rendering never draws a plot outline as a building (a cadastral outline group is an optional
toggle). A plot's coverage, arrangement, separation and boundary treatment come from S11's designation templates (§4.7).
A slot's shape is S11's working data, never a stored polygon: after S11 the building's footprint face and its wings
(§2.6) are the slot's geometry, so no plot record holds a world position that a warp would leave behind (§2.2 rule 5;
J-P50).

**What the records are for.**

* **Districts are feature-named, never class-named (J-P1).** A district's kind names its feature or function (market,
  docks, gate, castle, temple, craft, riverbank …); "rich quarter" and "poor quarter" are *descriptions* derived from
  the prosperity field for naming and the description line only. Wealth varies continuously through the prosperity
  field (MFP-7).
* **Reservations** are the large claims made before the streets (§4.2 S3) or before the lanes (§4.5 S7b): castle bailey,
  main plaza, market, church or cathedral precinct, large institutions, parks, and the water kinds (harbour basin, moat,
  canal) that are carved into L0 before any way is routed. A reservation is a barrier to growth and infill; the claimed
  entity is built inside it.
* **Allocations** are the persisted content decision: which classes and how many, in which wealth band, go to each
  district, sub-district and block — and, for the outside classes and the edge orchards, to the hinterland
  pseudo-district, and, when the owner-staged island toggle is on, to the sky pseudo-districts (II.6). They are computed
  eagerly for the whole town (§4.1) and every per-district stage reads them, so the town's content never depends on the
  order districts are derived or viewed (LC-2). An allocation stores no stream key — S7b and S10a draw from
  lineage-derived streams (§6.1) — so a district's New random re-draws its own block allocation and nothing else.
* **DerivationRecord** is a plot's, block's or building's memory of the derivation inputs §2.8 records for it.
  "Regenerate (keep settings)" re-derives from these recorded inputs (faithful, byte-identical); re-deriving with
  current inputs is `Adjust`; a field brush compares each plot's current sample with the recorded one and re-derives only
  what §7.2's τ rule selects (τ = 0.01 of the field range, the same τ on replay; LC-6) — an authorial re-derivation that
  sets `builtBand` in its scope (J-A31.44); **an epoch never re-derives plots by τ**: it acts on survivors only through
  §4.11's wealth ladder, at due blocks, bounded by the geometry floor (item 31; LC-12).
* **PlotBound** gives every plot edge a treatment — none, fence, hedge, wall or railing — with gate openings on access
  edges, chosen by the designation template (§4.7 S11). It is what draws a walled manor compound, a fenced garden, a
  hedged field edge, and it exports as VTT walls and GeoJSON lines (VIS-8; NG's walled manor compound, COV-NG-N27; FTG's
  fences, COV-FTG-F23).
* **The built band and the geometry floor (item 31).** `builtBand` and `builtProsperity` remember what the plot's stock
  was built for; **`geometryFloor` is derived at read and never stored**, from `builtBand` and `FieldBands.middle` by
  §4.11's floor rule, so a changed middle designation needs no migration; that rule, the manifested band a plot's
  geometry reads and what writes `builtBand` are stated once in §4.11 (J-A31.43, J-A31.44); a block's `due` mark is that
  ladder's trigger. With no epoch the manifested band is the field band everywhere (item 23).
* **Exposure, passages and knowledge (item 30).** `exposure` names how a plot is reached, derived at §4.6 by S10 from the block's
  interior access graph and its `reach`; a `Passage` is the covered way under a front building that a `passage` reach cuts,
  its `sealed` bit the one stored fact behind a sealed access edge and exposure `sealed` (its plots then enter §4.11's
  ladder as vacant, §2.8); `knownTo` is knowledge, not geometry — the place is always on the map, and only its name and
  purpose are withheld (§9.2, §11.2). A hidden plot keeps the access guarantee: ≥ 1 access edge and a chain of access
  faces to a public kerb (§5.2 F-PLOT, §5.3).
* **Seams** (II.1), **FieldBands** (§4.5) and **vacant frontage runs** — ordinary plots with `use = 'vacant'` or a `yard`
  part joined to the neighbour (§4.7 S10 (8); COV-VG-VN-170) — are stated at their homes.
=== END ===

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
  dwelling?: Id /* the household living in a workplace (live-in), §4.7 S10b */; households: Id[] /* the Household records housed (§2.7): the reverse of Household.building, kept by the writer that sets it — the generation fill (S10b's placement, written by S11 once the wings exist, clamped into [1, capacity] for a residential building and empty for every other, §4.7), §4.11's relet, item 17's relocation (§10.3); its length is the count the plan rung houses and the interior ladder reads (below, item 28 (f)), never above the capacity (below) */;
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
  rooms?: Room[] /* the rooms rung: the principal rooms a Fantasy-Manor-class composer emits with its wings (a hall, a tower's round room), each with its storey; the plan rung takes them as fixed rings (below); optional, and absent from the base's outline builder */;
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
  access: 'core'|'trapdoor'|'external' /* how the plan rung joins it — the stair core (where no bay of the core fits inside the ring, a trapdoor core the plan reports: the plan rung, step 3), a trapdoor, or an outside stair; derived with the basement, a shell fact (Basements, below) */ }   // item 29 (b); the decision is "Basements" below
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
that storey lies in the container's piece — and no piece has a hole, which the clip refuses. The composed towers — each a round wing to the plan rung (`Composition.towers`) — join the clip order at every storey they reach: a tower whose ring there lies wholly inside the extent of a wing and overlaps no wing taken before the first such wing in the clip order (its container) is taken directly after that container, towers sharing a container in `Composition.towers` order; every other tower is taken before all the wings, in `Composition.towers` order; and no tower's ring lies wholly inside another tower's at a storey both reach (a stair inside a tower is its spiral core, `StairCore.tower`). So the clip order stays one order and no piece has a hole. Each tower's round room is its ring less those of the earlier towers in the clip order that it overlaps — its own piece when it precedes the wings, each wing's piece taking the arcs; a tower wholly inside a wing that overlaps a wing taken before that container is taken before the wings too, the earlier wing, not wholly inside the container, carrying the tower's cut to the container's edge; a tower that follows its container has no piece there, and its round room lies inside the container's piece. Every composer's room (`Composition.rooms`), a tower's round room included, lies inside one seed piece at its storey — the composer emits it inside its own wing's or tower's extent less the extents before that wing or tower in the clip order, or inside its container's piece where the clip order leaves it none — so every fixed ring the plan rung passes lies inside one seed piece (§3.4's `transientArena`), and F-PLAN's abort on a refused composer's room (§5.2) marks a composer's bug. **Its fourth rung** (item
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
   names, or the composed tower as a spiral) is placed before any cut and serves every storey of its wing, the basement
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
   composer's rooms — by the storey's **layout pattern** (`LayoutPattern`, a weighted row per storey class in the
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
   (item 29 (5)), and a walk-out basement's outside door (step 3, `external`) the root of the basement's storeys; stair-core doors on every storey it serves; each unit's own entry door (the ladder, below); a
   `passage` opening in each end wall of the passage room (item 30). Openings and windows are records on wall segments.
6. *Exterior coherence.* Per storey the rooms tile the extents of the wings that reach it (the contract's fourth rung,
   above; a wing of fewer floors is roof at that level; a basement's outline is `Basement.ring`); chimneys are derived
   from hearth columns and rise to the roof (`Chimney`, drawn by §8.6); dormers are placed from the top storey's roofed
   rooms with exterior demand (`Wing.dormers` becomes derived, one per such room's façade bay, capped by the eave
   length); the porch sits at the main entrance; a composed tower is a round room per storey with the spiral inside
   (`radialSplit` for two); windows follow each room's exterior demand, one per façade bay of its exterior wall, aligned
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
  occupants; basement storeys excluded. Every host computes the same integer. The generation fill (§4.7: S10b places the
  households on the plot; S11, which creates the building and its wings, writes each residential building's `Building.households` clamped into [1,
  capacity]), §4.11's `relet` and F-PLAN (§5.2) read this one function, so the solver and the plan never disagree on how
  many households a shell holds. The bound holds through every change: a committed change that lowers a building's
  capacity below its `households` count — S11's operator (§4.7), a rewrite of the plot's `builtBand` (J-A31.44's paths),
  a change of its wings' extents (the carry after a `warp` or a `moveVertex`, by the wing-carrying rule above, or a
  moved face of a passage it spans, which moves its span rings, `Wing.spans`), a `setAttr` of its heights or its class,
  or a §7.6 edit of a table this function reads (the designation template's `households.max`, the `circulation` share or
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
  fixed), the composer's rooms and the rooms the least-disruption rule below keeps. RE-DERIVED: partition walls,
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

=== REPLACE ### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation ===
### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation

```ts
interface EditBase { seq: number /* from the document's nextSeq; never reset; survives rebase; an event an epoch carries in `EpochInputs.dossier` takes its seq when the epoch is appended (§7.7 item 6; J-A22.76) */; author: 'user'|'host'|'epoch'|'migration';
  session: string /* the authoring session, per document and author (§7.4): its undo and redo stacks; never read by the fold */; group?: number /* one undo step */;
  renames?: Rename[] /* on every event whose fold re-draws a name by §6.3's case (4): the renames its dry run listed and the user confirmed (§7.3 item 4) */;
  dossier?: DossierRef /* set by the host door (§11.4) on every event a dossier change generates: the dossier's own element id, opaque to the module (§7.7, item 20) */;
  creation?: true /* set by `generate` on the blueprint's and the creation dossier's `assign` events at positions 0…k — the log's creation prefix, which the base derivation's S2 reads ahead as fixed rows (§7.4, §4.2; J-A22.74); never an undo, redo or revert target and never truncated (§7.4) */;
  mutations?: MutationRecord[] /* §4.7 S11's records of the designation mutations the event ran, persisted with it like `renames` (item 18) */;
  disruption?: DisruptionReport /* a dossier event's, a positive placement's or a relocation's consequences — what moved, was joined or vacated, and why — as its dry run listed them (§7.3 item 4, §7.7, item 22 (b)) */ }
type Rename = { id: Id; from: string; to: string };   // the name's text before and after, as the user saw them
type DossierRef = { element: string; version?: string };   // the dossier's identifier for the element; the module reads it, never writes it (§7.7)
type RungKey = string;   // `${Id}#${rung}`: a stage-3 rung's reroll counter in a `regenerate` event's map — `<building id>#wings` … `#plan.furnish` (§6.1)
interface DisruptionReport { cost: number; budget: number /* the request kind's row, §7.7 */; overBudget: boolean; moved: { use: Id; from: Id; to: Id | null }[]; joined: Id[][]; vacated: Id[]; mutated: Id[]; why: { id: Id; rule: string }[] }
type EditScope = { ids: Id[] } | { ring: PolygonCm; key: PlatKey; level: Level };   // resolved to the effective scope at dry run and stored resolved
type EditFate = { id: Id; fate: 'kept'|'carried'|'orphaned'|'discarded'; to?: Id; reason: string };
type FieldStroke = { path: PointCm[]; radiusCm: Cm; falloff: 'linear'|'cosine'; amount: number /* relative Δ: field units, or cm for terrain */;
  water?: 'locked'|'follow' /* terrain only; default 'locked' (§7.2, §7.3) */ };
type EditEvent = EditBase & (
  | { t: 'lock'; ids: Id[]; paths?: string[] } | { t: 'unlock'; ids: Id[]; paths?: string[] }          // paths: attribute-level locks
  | { t: 'pin'; ids: Id[] } | { t: 'unpin'; ids: Id[] }                                                  // only ever an explicit user action — never emitted by viewing
  | { t: 'moveVertex'; key: PlatKey; at: LatticePoint /* the vertex's position before the move */; sig: VertexSig /* its role signature at the edit, §2.2 rule 5 */; to: LatticePoint }
  | { t: 'moveCourseKnot'; water: Id; ordinal: number /* the knot's ordinal in WaterBody.controls, §2.3 */; at: PointCm /* its position before the move */; to: PointCm }   // a river's control knot is S1's recorded input, not an arena vertex
  | { t: 'warp'; key: PlatKey; fromLevel: 0 | 1 /* 1 by default; 0 also moves water and coast */; strokes: WarpStroke[] }   // one staged warp session, committed on Apply
  | { t: 'drawWay'; points: PointCm[]; class: WayClass; widthCm: Cm }
  | { t: 'drawWater'; kind: WaterKind; add: PolygonCm[]; subtract?: PolygonCm[]; line?: PointCm[]; widthCm?: Cm }   // add rings unioned, subtract rings = land brush (islands)
  | { t: 'drawWall'; points: PointCm[]; kind: Enceinte['kind']; closed: boolean }
  | { t: 'drawGreen'; polygon: PolygonCm; kind: Greenery['kind']; densityPerHa?: number }
  | { t: 'drawBoundary'; polygon: PolygonCm; district?: Id }                                           // snaps to whole L1 cells
  | { t: 'drawFootprint'; polygon: PolygonCm; cls?: BuildingClass; use?: Id; heights?: Partial<Heights> }
  | { t: 'build'; plot: Id; cls: BuildingClass; use?: Id; footprint?: PolygonCm; heights?: Partial<Heights> }
  | { t: 'moveFootprint'; id: Id; deltaCm: VecCm; rotateCdeg?: number }
  | { t: 'swapUse'; a: Id; b: Id }
  | { t: 'fill'; scope: EditScope; arrangement: SitePlan['arrangement']; cls?: BuildingClass }
  | { t: 'setAttr'; id: Id; path: string; value: unknown }
  | { t: 'setAttrMany'; ids: Id[] /* resolved at dry run */; query?: Query /* what the user asked, kept for display */; path: string; value: unknown }
  | { t: 'paint'; target: 'roofKind'|'roofColour'|'wallColour'; ids: Id[] /* resolved under the brush */; brush: BrushPath; value: string }
  | { t: 'paintGround'; region: PolygonCm; cover: string; colour?: string }                           // a style region (FTG's texture brush) — outside the model digest
  | { t: 'instance'; entity: Id; ordinal?: string; point?: PointCm; op: 'add'|'move'|'remove'|'restyle'; to?: PointCm; style?: Partial<InstanceStyle> }   // for an ordinal-addressed event the dry run also fills `point` with the instance's generated position; `InstanceStyle` is §8.10's
  | { t: 'delete'; id: Id } | { t: 'merge'; ids: Id[] } | { t: 'split'; id: Id; cut: PointCm[] } | { t: 'join'; ids: Id[] }   // on plots, split and join are item 31's splitting and fusion (below); delete never removes a dossier-backed element — it becomes rejectSite (§7.7)
  | { t: 'rejectSite'; element: Id /* the dossier-backed assignment or its placed member */; site: Id /* the plot */; op: 'reject'|'lift' }   // item 20 (b): a rejection, never a removal; its lapse is written by the epoch or dossier event that causes it (§7.7)
  | { t: 'placeAt'; plot: Id; element?: Id /* a dossier-backed element or assignment member pinned here */; designation?: Designation /* §4.7 S11: a use the generator controls, designated here */; lift?: boolean }   // item 20 (g): positive placement; lift frees the plot
  | { t: 'setEntrance'; building: Id; op: 'add'|'move'|'remove'; index?: number /* the entrance edited, by its indexed role */; role?: Entrance['role']; wing?: number; side?: number; offsetCm?: Cm }   // item 29: the main entrance may be moved along its street-facing side, never removed
  | { t: 'drawPassage'; plot: Id; from: PointCm; to: PointCm; widthCm: Cm }   // item 30 (c): a covered passage under the front building's ground storey, as §2.5's passage face; sealing and reopening are convert ops (§4.11)
  | { t: 'drawTunnel'; points: PointCm[]; kind: Tunnel['kind']; widthCm?: Cm; headroomCm?: Cm }   // items 11, 12: a `tunnel` chain on the underground arena — never a `drawWay`, which U2 forbids there (II.7.3); width and headroom default to II.7.2's profile row, `navigable` derived from them (§2.7)
  | { t: 'placeAccess'; kind: AccessPoint['kind']; role: AccessPoint['role']; ground: PointCm; tunnel: Id }   // item 12 (d): a new AccessPoint (II.7.4) opening at `ground`, its `access_point` vertex placed on `tunnel`'s kerb at the nearest point; its tunnel end moved by `moveVertex` on that vertex, its opening by `setAttr` on `ground.at` (re-hosted by `pointLocate` on the ground's `PlatKey`, `ground.host` rewritten, refused as F-EDIT outside II.7.3's admitted ground); removed by `delete`
  | { t: 'setRoomRole'; building: Id; storey: number; room: Id; role: RoomRole }   // the plan events (item 28; the records are §2.6's): a role change re-derives what hangs off roles — windows, door kinds, furniture — and moves no wall
  | { t: 'moveWall'; building: Id; storey: number; wall: Id; deltaCm: Cm }         // slides a partition wall along its normal (mergeFaces then splitFace on the rung's transient arena, §3.4); both rooms re-checked against their rows' minimum area — F-EDIT when one falls below it
  | { t: 'splitRoom'; building: Id; storey: number; room: Id; cut: [PointCm, PointCm]; roles?: [RoomRole, RoomRole] }   // splitFace
  | { t: 'mergeRooms'; building: Id; storey: number; rooms: [Id, Id]; role?: RoomRole }   // mergeFaces, refused across a wing joint; one room, the surviving role chosen or given, the removed wall's openings dropped
  | { t: 'setOpening'; building: Id; storey: number; wall: Id; at?: Cm; kind: 'door'|'arch'|'open'|'none' }   // an entrance's door moves with its entrance (setEntrance) and is never removed here
  | { t: 'setWindow'; building: Id; storey: number; wall: Id; at?: Cm; op: 'add'|'move'|'remove' }   // exterior walls only
  | { t: 'moveStairCore'; building: Id; core: Id; bay: Polygon }                      // moves the bay on every storey it serves; each storey's partition re-runs around it, plan.layout kept where the wing is unchanged
  | { t: 'setRoomUnit'; building: Id; storey: number; room: Id; unit?: Id }             // item 28 (f): the household whose dwelling unit the room belongs to (§2.6's `Room.unit`); absent for a shared, service or circulation room; F-EDIT when it would leave a unit without its own door onto circulation or the street
  | { t: 'revert'; id: Id }   // "reset to generated": one undoable event that applies, in reverse log order, the inverses of every logged event whose target is this entity (its own edits only, never a `creation` or dossier event, §7.4); ctrl / cmd+click (§14's keymap, MFCG's ctrl-click reset)
  | { t: 'regenerate'; scope: EditScope; mode: 'keep'|'newRandom'; rerolls: Record<Id | RungKey, number> /* absolute, per scope entity — with `rung`, the rung's counter: the rerolls actually used (§5.1 (6)) */; rung?: 'wings'|'rooms'|'plan'|'plan.layout'|'plan.roles'|'plan.furnish' /* item 28: New random on one rung of one building, advancing that rung's counter only (§6.1; the map's key is `<building id>#<rung>`); absent: the whole scope as today */; discardEdits?: boolean; fates: EditFate[] }
  | { t: 'adjust'; param: string; value: unknown; fromStage: StageId; fates: EditFate[] }                 // Adjust, and Re-derive from stage k
  | { t: 'setField'; field: 'prosperity'|'density'|'greenery'|'terrain'; stroke: FieldStroke }          // a relative Δ; the stroke list is composited once (§7.2)
  | { t: 'assign'; assignment: Assignment } | { t: 'unassign'; id: Id }
  | { t: 'moveLabel'; id: Id; placement: Placement } | { t: 'hideLabel'; id: Id; hidden: boolean }      // LabelEntity.pinned / hidden — model data (§9)
  | { t: 'setLayer'; layer: Layer; spec: Partial<LayerSpec> }
  | { t: 'editTable'; table: TableId; ops: RowOp[]; provenance?: 'host'; fates?: EditFate[] /* the confirmed fates of §7.6's fallback re-derivation from the table's first reader stage */ }
  | { t: 'editPreset'; preset: string; ops: RowOp[]; provenance?: 'host'; fates?: EditFate[] /* as for editTable */ } | { t: 'setStyle'; ops: RowOp[]; provenance?: 'host' }
  | { t: 'rerollLayer'; concern: RerollableConcern /* generated from the concern registry (§6.1) */; salt: number /* town-wide: the concern's new salt; 0 with `ids` */;
      ids?: Id[] /* `naming` only: re-draw these entities' names */; salts?: Record<Id, number> /* with `ids`: the per-entity salts actually used (§6.3) */ }
  | { t: 'convert'; op: ConversionOp /* §4.11 */ }
  | { t: 'closeup'; district: Id; strategy: FabricStrategyId; params: Record<string, number> }         // logged before the first edit inside a close-up (PART II)
  | { t: 'epoch'; epoch: number; inputs: EpochInputs }                                                  // an epoch is an event in the log (§4.11)
  | { t: 'rebase'; reason: RebaseReason; stateDigest: Hash128; version: string /* the output version whose model packages computed stateDigest — the document's output version from this event on; a frozenImport sets it to the library's current version (§2.9 steps 2–3) */;
      at: number /* the log head its state materialises: the previous event's seq, or h₀ when kept after edits made during load verification (§2.9 step 4); any other value is refused with E_REBASE_AT and nothing is appended (§14) */ }   // §2.9
  | { t: 'upgrade'; from: string; to: string; mapping: MigrationMap /* §7.5 */; baseDigest?: Hash128 /* with a rebased base: base.state's model root computed under `to`, the root later loads under `to` check it against (§2.9 step 3, §7.5) */ }   // undoable
  | { t: 'undo'; of: number /* seq of the event undone, or of the first event of its group */ }        // applied at the head through the same fold (§7.4)
  | { t: 'redo'; of: number /* seq of the undo it reverses */ } );
type RowOp = { op: 'set'|'insert'|'delete'; rowKey: string; field?: string; value?: unknown; baseRowHash?: Hash64 };   // rows by stable key, never by position
type WarpKernel = 'displace'|'liquify'|'relax'|'bloat'|'pinch'|'equalize'|'swirl'|'jitter';
type WarpStroke = { kernel: WarpKernel; centre: PointCm; radiusCm: Cm; innerRadiusCm?: Cm; strength: number; dragCm?: VecCm };
// Designation and MutationRecord are §4.7 S11's, RoomRole and Entrance §2.6's, ConversionOp §4.11's
```

No event stores a `VertexId`, `HalfEdgeId` or `FaceId` (§2.2 rule 5): geometry is addressed by entity address, by
lattice point with a role signature (bound by `resolveVertexAt`, never by distance alone), by a water body's address
with a course-knot ordinal (bound as §7.4's `moveCourseKnot` row states), or by a ring. Undo and redo are events like
the rest (§7.4): the log only grows, which is what lets a host store it (§11.3).

**The named actions** (G-R4; O16-core) are separate operations with distinct semantics, never one flag:
* **Regenerate (keep settings)** re-derives the scope with each entity's *recorded* inputs and unchanged rerolls
  (§7.3): faithful, and byte-identical when nothing upstream changed; used after a lock or a drawn constraint.
* **New random** advances the reroll of every scope entity by one, written into the event as an absolute map, so a
  replay is exact and blocks at different rerolls each move on; a scope entity whose content comes out unchanged
  advances again under §5.1 (6)'s check, and the map records the rerolls used.
* **A designation change is neither.** `assign`, `unassign`, a `setAttr` on a plot's use or class, a relocated use and
  a dossier event run §4.7 S11's mutation of the standing design toward the new designation's template — kept parts
  kept, additions and subtractions recorded — never a re-derivation and never a re-roll (§7.3 item 8, item 18); a click
  on a stale elaboration rung re-derives it the same way, from its canonical prior (§7.3's table: the stored plan, else
  the as-built plan carried along §2.6's interior ladder — never the cache; item 28, item 28 (f)).
* **Adjust** re-solves with a changed parameter. Locality is promised only for parameters the control registry (§7.8)
  lists as consumed at S10 or later, or that carry a spatial scope (a district's density, a block's granularity). A
  parameter consumed earlier (seed, rung, water setting and side, walls, castle option, gate count, planned ↔ organic,
  wealth level, the recipe's pack list) has no local operator and is offered as **Re-derive from stage k**: everything
  from Sk down re-derives with carry-over (§6.3), and the user confirms the edit-fate report first.
* **Same kind, new seed** is Enter's successor — a new document with seed + 1 that keeps the recipe and the
  dossier (§6.1); per district
  (PART II) it is New random on the district. **Surprise me** is a new document whose intent is drawn from the
  `intent.surprise` stream of a fresh seed and written into its recipe (§7.7).

**Warp is MFCG's staged edit.** Strokes in a warp session preview on the L1 overlay at interactive rate — vertex moves
and a redraw of the affected tiles, no invariants (§8.8) — and **Apply** commits one `warp` event holding the strokes
in order (a warp event is committed only on Apply); **Discard** drops them. On Apply, and on every replay, each stroke
is applied as its **operation** to the geometry current at that log position, never as stored displacements: the
operation computes, from the current geometry, a displacement field over the vertices under the brush, and the kernel's
`warp(field, fromLevel, region)` applies it with §3.6's whole-step validation, halving, re-seating, sliding and held
vertices (the dry run lists the held entities), re-deriving locally any face that then fails a class floor, logged.
Records that stand on a point rather than a vertex move with their host face, and every footprint, trace and deck the
warp moved is re-based on the ground it now stands on (§7.4, "Warp and what stands on the ground"). A warp with
`fromLevel = 0` that moves water hands the moved shores to S1's water operator as its new water (§7.3 (b) 1).

| MFCG tool | PLAT | semantics |
|---|---|---|
| Displace | `displace` | drags vertices under the brush by `dragCm`: full weight inside `innerRadiusCm`, falling linearly to 0 at `radiusCm` |
| Liquify (a softer Displace) | `liquify` | as `displace` with a smooth cosine falloff over the whole radius |
| Relax (repairs too-short mesh edges) | `relax` | Laplacian relaxation of the vertices under the brush toward equal edge lengths |
| Bloat (enlarges cells) | `bloat` | each L1 cell under the brush grows about its centroid by `strength`, neighbours yielding |
| Pinch (inverse of Bloat) | `pinch` | each L1 cell under the brush shrinks about its centroid |
| Equalize (regularises one cell's angles) | `equalize` | each cell under the brush moves its vertices toward equal interior angles |
| Rotate (the whole map about its centre) | the `rotation` view key (§2.9) | a whole-map rotation about the frame centre as view state — never a vertex operation, which would re-snap every vertex (§3.6): model north (+y) is unchanged; the compass is decoupled — its view key is `trueNorth` (default: it keeps pointing at model north) or `free` (its own angle, MFCG's behaviour); exports apply the rotation as §11.1 states (J-DET-15) |
| Measure (a ruler, not a warp) | the measure tool of §9.5 | view data — no model event |
| — | `swirl` | our local rotation about the brush centre (not an MFCG tool) |
| — | `jitter` | seeded random displacement from the `warp.jitter` stream |

**Drawing at the authoring boundary.** Pointer samples are resampled along arc length to a spacing of at least
`minEdge`, simplified with a topology-preserving Visvalingam at `minEdge`, and a self-crossing stroke is split into
simple runs before `insertChain` (§3.4). `drawWater` takes `add` rings, unioned by the boolean engine, and `subtract`
rings — a land brush — so an island is a subtract ring inside an add ring and two overlapping sea shapes simply union
(FTG's documented method); rivers and canals take a `line` and a width. `drawBoundary` selects the L1 cells whose area
lies at least 50 % inside the drawn polygon, and the district boundary becomes the boundary of those cells; the dry run
shows the snapped boundary before commit (J-DET-14). A `drawWay` of class `bridge` across a river face places its
`Bridge` by §4.2 S1 (5)'s rule for a drawn bridge; S4's operator routes the drawn way's ends to its deck (§7.3).

**Building-level editing**, each acting through the plot model: `drawFootprint` places a hand-drawn footprint
(concave allowed, simple) on the plot that contains it — a footprint spanning several plots proposes their JOIN in the
dry run; one on unplotted land (a green, a residue, a field) creates a plot around it with access to the nearest way,
or returns a conflict if none is reachable — and the host plot's site plan is re-fitted around it as a fixed slot
(buildings that no longer fit are listed in the fate report). `build` places a building of a class on a plot (the site
plan picks the footprint when none is given) — §4.11's `build(...)`. `moveFootprint` moves or turns a footprint;
leaving its plot re-homes it to the plot it lands on, with both site plans re-fitted. `swapUse` exchanges two
buildings' uses, households and assignments atomically, footprints staying — two `relocateUse` conversions under one
event (§4.11, item 17); a use is opened, closed or relocated by hand through `convert` with `openUse`, `closeUse` and
`relocateUse`, the building persisting vacant or converted (§4.11). `fill` forces an arrangement (dense row
fill, for instance) on the scope's plots and re-runs S11 there.

**Entrances, basements, passages and plans (items 28–30).** `setEntrance` adds, moves or removes a side, rear, yard or
service door under §2.6's rules — it never removes the main entrance, which may only move along its street-facing side —
and `setAttr(basement)` overrides the derived basement decision (an edited attribute, §7.2); `drawPassage` reserves a
covered passage under the front building of a plot as a passage face (§2.5) that gives the plots behind it their access
rows, and `convert` with `sealPassage` / `openPassage` (§4.11) seals or reopens one by setting `Passage.sealed` (§2.5); `Passage.headroomCm` and `Passage.frontBuilding` are derived — S11 writes them with the spanning wings' `spans`, a heights edit of a spanning wing re-derives the headroom, and the event that makes the front building a footprint trace or a tombstone clears `frontBuilding` (§2.5's `Passage`, §2.6's `BaseWing.spans`) — and have no edit kind of their own;
`setAttr(knownTo)` hides or reveals a place's name and purpose for §9.2's label policy, a dossier-backed institution's
`knownTo` being the dossier's fact,
which a later dossier event re-imposes over a map override, reported (§7.7, item 30); the plan events above edit a
building's stored plan storey by storey, the first of them storing the composition (§2.6), each dry-run against §13.2's
plan bars on the overlay, so a move that would leave a room below its row's minimum or unreachable, or a unit without
its own door (item 28 (f)), returns F-EDIT and never a silent repair; a building's household count is changed by hand
through `convert` with `relet` (§4.11) within §2.6's capacity, which marks an unstored plan stale and re-cuts a stored
one inside the event (§7.3); an edit that lowers a building's capacity below its households — any change §2.6's capacity rule lists — re-homes the excess by that rule, each move among its fates (§7.3 item 4); a click on a building or a neighbourhood logs nothing
(item 28 (c)).

**Brushes.** `paint` sets roof kind, roof colour or wall colour on every building whose footprint centroid lies under
the brush path (ids resolved at dry run and stored). `paintGround` records a ground-cover region in the style (FTG's
texture brush): pixels only. The tree brush is a batch of `instance` events on the entities under the brush (§8.10),
one undo step; painting trees where no green entity exists first logs a `drawGreen` (a `wood` on open land, a
`yard_planting` in a yard) to host them. `instance` events also carry close-up presentation edits (II.4). The field
brushes are `setField` strokes (§7.2); the terrain brush's `water` mode chooses whether water stays where it is
(`locked`, the default) or follows the new ground (`follow`).

**People.** A lock with `paths` fixes chosen attributes of a person (name, age, role …); New random on a person
re-derives it with a new reroll keeping locked paths; relations and schedules are not re-derived by a person reroll
(they are town-wide, §10). `setAttrMany` edits many entities at once — job, workplace, schedule, household
(relocation) — from a query whose result is resolved to ids at dry run and stored, so a replay never re-runs the query;
it is one undo step.

**Edit targets — owner amendment 5.** Every generated element is editable (the table below); every rule table and
preset is editable (§7.6), by a user through the preference layer and by us through new table versions; edits are
first-class events that persist (the log, §2.9), undo (§7.4 — undo and redo are log events, so they work in a shared
document too), survive regeneration (§7.2–§7.3: protection, carry-over and fates) and migrate between versions (§7.5);
the generator repairs around them locally (§7.3's operators, F-REDERIVE); the preference and override layer sits above
the defaults (§7.6). The entity registry (§2.8) declares each type's edit kinds with their undo path and lifecycle row;
its completeness test is §13.2's (§2.8).

| element | edit events |
|---|---|
| terrain | `setField(terrain)` with `water: 'locked'` or `'follow'`, `drawWater` (hollows and lakes), `setAttr` on site features |
| water, coast, rivers | `drawWater`, `moveVertex` on shores and coasts, `moveCourseKnot` on a river's control knots, `setAttr` (bank class), `delete` |
| ways, junctions, bridges | `drawWay` (class `bridge` for a new crossing), `moveVertex`, `warp`, `split`, `merge`, `delete`, `setAttr` (class, width, surface, name; a bridge's kind) |
| districts | `drawBoundary`, `merge`, `split`, `setAttr` (kind, character, name), `regenerate`, `adjust`; `setAttr(fabric)` + `regenerate` is a stage-2 template replacement |
| reservations (§2.5) | `setAttr` on a market's `rank` (`principal` or `secondary`, item 24): a Re-derive from S3 with its fate report, §4.2 S3 (12)'s batch taking the edited rank as a fixed input (J-A24.71) |
| blocks, plots | `split` and `join` (item 31's splitting and fusion: the least-disruption re-cut of §4.7 S10 (7) with S11's mutator, neighbours fixed, undo exact — §7.4), `merge`, `fill`, `setAttr` (use, owner, `knownTo`; a block's `reach` — `open`, `passage` or `gated` — which re-derives the block's interior by S10 (7)'s re-cut with its neighbours fixed, J-A30.72; never `builtBand` or `builtProsperity`, derived state written only by the paths §4.11's floor paragraph lists — J-A31.44, J-A31.71; never `fieldBand`, derived state written only by a derivation that reads the current field and by the epoch's re-banding (§2.5, J-A28.29); never `exposure`, derived from the access rows; never a block's `due`, derived and written only by §4.11's ladder), `regenerate`, `lock`, `assign`, `placeAt`, `rejectSite`, `drawPassage`, `convert` (`plotToGarden`, `amalgamate`, `subdivide`, `densify` (`infill`, `back_court`), `thin` (`infill`, `back_court`), `sealPassage`, `openPassage`; §4.11) |
| buildings | `drawFootprint`, `build`, `moveFootprint`, `swapUse`, `paint`, `setAttr` (class, heights, roof, basement, `knownTo`, `condition` — an edited attribute §4.11's rung 1 then leaves as set, §7.2, J-A31.76), `setEntrance`, `delete` (a generator-added building only; a dossier-backed one becomes `rejectSite`, §7.7), `convert` (demolish, abandon, decay, ruin, clear, rebuild; vacate, reoccupy, reuse; openUse, closeUse, relocateUse, mutate; `relet` — the household count within §2.6's capacity, item 28 (f) — §4.11), `assign`, `regenerate` with `rung`, the plan events (item 28; `setRoomUnit`, item 28 (f)), `lock` on a room's path (`plan/rooms/<id>`); derived, no edit kind of their own: `nextEntrance` (written by §2.6's entrance derivation and `setEntrance`), `reusedAs` (written by `convert` `reuse`, §4.11), `formerUses` (written by the use conversions that close a building's use or move it elsewhere, §4.11), `predecessor` (written by `reuse … build`, §4.11), each base wing's `spans` (written only by S11 when it builds or re-fits a passage's front building, and cleared by S11 or by the event that makes that building a footprint trace or a tombstone, §2.6) and each slot's `frontage` (§2.5's `BuildingSlot`: from the designation template, re-derived by S11's mutator) |
| walls, gates, towers | `drawWall`, `moveVertex`, `setAttr`, `delete`, `convert` (wallToWay, gateToJunction; neglect, breach, dismantle, contractWall — §4.11); derived, no edit kind of its own: an enceinte's `supersededBy` (written by `contractWall`, §4.11) |
| uses (§2.7) | `convert` (openUse, closeUse, relocateUse — §4.11), `swapUse`, `setAttr` (specialisation), `assign` / `unassign` and the assignment's `pinned` (§7.7); a use's address moves with it (§6.3) |
| institutions (§2.7) | `setAttr` (`knownTo`, name), `assign` / `unassign` (§7.7); a dossier-backed institution's `knownTo` is the dossier's fact, which the next dossier event setting it re-imposes over a map override, reported (§7.7 item 7; J-A30.72) |
| tunnels, access points (II.6, II.7; staged, editable in the base) | tunnels: `drawTunnel`, `moveVertex`, `setAttr` (kind, `widthCm`, `headroomCm` — `navigable` re-derived from them, §2.7), `delete`, `convert` (silt, caveIn, seal, reopen) — a tunnel's condition is no `setAttr` path: it reads `existence` and `closure`, so a condition change is the matching `convert` (J-A11.21), and the profile preset is II.7.2's network choice, not a tunnel field; access points: `placeAccess`, `moveVertex` on the `access_point` vertex (the tunnel end), `setAttr` (kind, role; `ground.at`, the opening — re-hosted by `pointLocate` on the ground's `PlatKey` and refused as F-EDIT outside II.7.3's admitted ground), `delete`; `setLayer` on `underground` is the CITY / METROPOLIS visibility toggle (§7.8); J-A12.71 |
| sky islands (II.6; staged, editable in the base) | `setAttr` (area, altitude, state), `lock`, `convert` (resizeIsland, settleIsland, fallIsland, refloatIsland, raiseIsland); `recipe.layers.islands` is an `adjust` that re-derives from S7b (§7.8) |
| terrain and water conversions (§4.11, item 25) | `convert` (`reclaim`, `siltReach`, `shiftCourse`, `digCanal` — the slow conversions the evolution engine will schedule, usable by hand now), repaired through S1's terrain or water operator or the carve: a marsh's `reclaim` by the terrain operator (§7.3 (a)), a foreshore's `reclaim`, `siltReach` and `shiftCourse` by the water operator (§7.3 (b)), `digCanal` by the carve (§4.11); derived, no edit kind of its own: `LandUse.reclaimed` (written by `reclaim`, §2.3, §4.11) |
| greenery, trees | `drawGreen`, tree brush, `instance`, `setAttr`, `delete` |
| fields | `setField` (prosperity, density, greenery); `setAttr` on the town's `FieldBands` (an explicit re-banding) — both authorial: the blocks they re-derive past τ take the new field as their built state and their plots' `builtBand` (§7.2, item 31) |
| names, labels | `setAttr` (text), `moveLabel`, `hideLabel`, `rerollLayer(naming)` town-wide or on chosen entities (`ids`) |
| layers, style | `setLayer`, `setStyle`, `paintGround`; view keys are not logged (§2.9) |
| people, households | `setAttr`, `setAttrMany`, `lock` with paths, `regenerate` (person scope), `pin`; a household's building and its dwelling unit (§2.7, item 28 (f)) follow `relet` and item 17's relocation (§4.11, §10.3), never a bare `setAttr` |
| close-ups (stage 2) | every kind above on close-up entities, after `closeup`; `instance` for presentation edits |
| rule tables, presets | `editTable`, `editPreset` (row operations, §7.6) |
| history | `epoch`, `convert`, `rebase`, `upgrade`, `undo`, `redo`; the dossier events — `assign`, `unassign` and `setAttr` with `EditBase.dossier` set, in the host's order (§7.7); the creation prefix's `assign` events carry `EditBase.creation` (§7.4) |

**Dry-run validation (G-R10).** Every event is validated before commit on the scratch overlay: the schema, the
batch-local and stage-end invariants of its scope (§5.3), and the edit-fate report of its effective scope with its
case-(4) renames (§7.3 item 4) — for a chained operator (§7.3 item 3) the whole chain runs on the overlay, so the report
lists every re-sited bridge, re-routed or cut way and re-based building before anything commits; for an `undo` or
`redo`, the independence check of §7.4. Conflicts come back as actions (§5.2 F-EDIT), never silently resolved; a warp
that would break an invariant is halved and reported. An `E_KEPT` conflict (the edit would cross or clear finer content
an earlier stage made, or content outside a coarse edit's clear region, §3.3) is offered with one resolution: start the
re-derivation at the stage that made that content (for a wall's band parts or a margin band's part, S10's step (0) for
the wall strips of the touched run or for the scope's side of the touched stretch, §4.7, §7.3 item 2). A host's bridge
commands map onto these events (§11.3).
A dossier event or a positive placement is dry-run like any edit: its disruption — every moved use, joined or vacated
plot and mutated building, each with the rule that caused it — is computed against the request kind's budget row
(§7.7) and stored in the event (`EditBase.disruption`); a dossier event over budget still lands, because the dossier's
authority is absolute (§7.7), and is reported over budget, while a user's positive placement over budget, or one that no
plot satisfies inside the hard rows, returns F-EDIT with the closest acceptable sites (§4.7 S10b). A `join` or `split`
of plots that would remove an occupied building returns F-EDIT — "vacate first", item 17's relocation — unless the user
confirms the demolition as a fate (item 31). A map event — one a user, or a host's map edit, appends without
`EditBase.dossier` — that would close, remove or re-designate a dossier-backed element (§7.7 item 2's list) returns
F-EDIT with `rejectSite` and `placeAt` offered (J-A20.75).
=== END ===

=== J-ROWS ===
| J-A28.23 | the owner's "the more rooms for more occupying families the richer a building gets" read as the shell's capacity, and one integer capacity function stated in §2.6 that the generation fill (S10b's placement, S11's write), `relet` and F-PLAN all read; the bound kept through every change that lowers a capacity by re-homing the excess (§4.7's overflow pass, inside the causing event), never by refusing the change, except a hand edit whose excess cannot be re-homed, which returns F-EDIT; the re-homing passes over locked and pinned households | §2.6 |
| J-A28.26 | the re-cut's canonical chain — rows first, then households, from the as-built plan — with the shell reopened as the arena's seed rings (the wings' extents clipped to tile, the span ring, the basement ring), the entrances and hearths as anchors, the stair bay, stacks, passage room, composer's rooms and kept rooms as `fixed` rings, and the kept-room rule read on the room's clipped seed ring; a stored plan re-cut inside its changing event, the shell's identity across it read without the `composition`-role vertices its new walls add; the seed clip in the clip order — wing order, a wing wholly inside another's at a storey after that container; the composed towers before all the wings in `Composition.towers` order, but a tower wholly inside a wing that overlaps no wing taken before that container directly after it, and no tower wholly inside another — so no piece has a hole, every composer's room inside one seed piece | §2.6 |
| J-A28.28 | the capacity a property of the shell alone: per storey the union of the wings' extents (an overlap counted once; the base wings only, never a composition's, every composition keeping at least their area at each storey they reach) and one programme row, the class's at the band set's poorest band, for the circulation share and the smallest room; the as-built count `households.built` clamped to [1, capacity], a ladder row's household range bounding `relet` and the chain's row steps only (amends J-A28.23) | §2.6 |
| J-A29.25 | a stair core that serves the basement takes a bay inside `Basement.ring` as well as its wing; where none fits, a `trapdoor` core inside the ring joins the basement, reported, and no building record changes; `Basement.access` derived — `external` for a walk-out, else the programme row's `basementAccess` at `builtBand` — a walk-out's outside stair a door in the lowest of the basement ring's sides at least two wing-local modules long — else the `trapdoor` fallback —, the core stopping at the ground storey; a programme row's `basementAccess` names `core` or `trapdoor` only | §2.6 |
| J-A30.26 | a passage's span kept true through every change of its front building: `Passage.headroomCm` re-derived inside every event that changes a spanning wing's heights; a front building made a footprint trace (`robStone`, `clear`) or a tombstone (`demolish`) uncovers its passage — its wings' `spans` and `Passage.frontBuilding` cleared in that event — the event holding the passage in its effective scope, the passage open above with its face, `sealed` bit and plots' access kept until S11 raises a successor over it (amends J-A30.25) | §2.5, §2.6 |
=== END ===

=== RATIONALE-A ===
| J-A28.26 | Chose the canonical chain as the re-cut's definition — the plan for a band row and a household count derived from the as-built plan by least-disruption steps in one fixed order, the rows first (one band at a time, the count clamped into each row's range) and then the households (one at a time) — with what stays stated once in the forms the kernel's transient arena takes (the shell — each storey's seed rings: the wings' extents clipped to tile, the span ring at the ground storey, the basement ring below it — opened again unchanged as the arena's seeds; the entrances and the hearths as anchors placed before any cut; the stair core's bay, the chimney stacks, the passage room, the composer's rooms and the kept rooms as `fixed` rings), the kept-room rule read on the seed ring the room lies in as the arena clips it, and a stored plan re-cut inside its changing event with the shell's identity across it read on rings stripped of the `composition`-role vertices its new walls add, over the cached result at click time or households-first, over a fixed list that passed seeds and vertices as `fixed` rings, and over a kept-room rule read on the wing's unclipped ring, because a chain from committed state makes the plan a function of its inputs alone (§6.2, §6.5 (9)) and returns the as-built plan exactly when the households are re-united; rows first lets each household step happen with the final unit form, so the interior degrades before it multiplies, which is cheaper and what real subdivision did; a wing ring or a basement ring passed as a `fixed` ring would be one uncut face and an entrance is a vertex, not a ring (§3.4's contract); after item 18 changes an earlier overlapping wing a later wing's clipped seed moves although its ring does not, so a room kept by its wing ring would be refused by the arena (`overlap`); and J-P48 (1) makes every new wall end on an exterior wall a footprint vertex in the same event — a split that moves nothing — so the shell's byte-identity bars read the shell without those vertices, as §7.3 item 7 (ii) does (§2.6; item 28 (f); with J-A28.71 amended and the kernel's J-A28.33; repair round 2: V-MAB1-06, V-MAB1-08, V-MAB1-09, VK1-03). A wing whose extent at a storey lies wholly inside another's is clipped after that container (two identical extents keep wing order), so it has no piece there — its floor is the container's — and no piece has a hole, which §3.4's seed clip refuses, because a seed is one ring; and since the one overlay puts every crossing vertex on the earlier ring too, a change of an overlapping wing re-cuts the rooms of the wing before it as well as after it (repair round 3: V-MAB2-09 with VK2-05 and VD2-09). A composed tower stands in the clip order before every wing it engages, over taking it last with its room clipped to a partial disk, because a round tower keeps its round room (the realism tiebreaker; a composer's towers are whole) and the engaged wing's rooms take the arc as a wall; every other composer's room lies inside its own wing's piece, so every fixed ring lies inside one seed (verify-kernel-r3 VK3-01; closing ruling). The composed towers take one of two places in the clip order — before all the wings, in `Composition.towers` order, or, for a tower wholly inside a wing that overlaps no wing taken before that container, directly after its container — and no tower lies wholly inside another, over ordering a tower before each wing it engages and after each wing that contains it, which gives no order for two engaged towers or for a tower inside one wing that engages an earlier wing, and over clipping such a tower's round room to its container's piece, because the two places always give one order with no holed piece; a tower that engages a wing taken before its container keeps its whole round room there, since that wing already carries its cut to the container's edge (the realism tiebreaker; a composer's towers are whole); of two engaged towers — a stair turret on a tower — the later in the composer's order takes the earlier's arc; and a tower inside another tower would give two overlapping round rooms, which the arena refuses, or a round room with a hole, while a stair inside a tower is its spiral core (handfix-b verify-model-r0 VHM-04 with verify-kernel-r0 VKH-01, reconciled). |
| J-A30.26 | Chose to keep a passage's span true through every change of its front building — to re-derive `Passage.headroomCm` inside every event that changes a spanning wing's heights (a `setAttr` of heights and its undo), and, when the front building becomes a footprint trace (`robStone` or `clear`, which zero its heights) or a tombstone (`demolish`), to clear its wings' `spans` and the passage's `frontBuilding` in that event, each such event holding the passage in its effective scope, the passage staying a passage face, open above, with its `sealed` bit and its plots' access unchanged until S11 raises a successor over it — over re-fitting the building by S11 after a heights edit, refusing to clear or demolish a front building, keeping the spans on a building with no height, or retyping the passage as an open alley, because a heights edit is an input override at S11, not a re-fit (§7.4), so without the re-derivation the span mark could be left with a height of zero or less; decline and demolition stay applicable to every building (item 8; every state applies by hand, §2.8); a robbed-out building covers nothing, and every reader of the span — the span mark, its shadow caster, the 3-D export, the arch glyph — keys on `spans` or on `frontBuilding`, so clearing both makes each read right with no rendering change; a decline step changes a building's existence and drawing only, never the plots' access or exposure (§2.8, §4.11; exposure is never a sight line, J-A30.42), and a successor raised on the old foundations spans the passage again; and holding the passage in the event's scope keeps the locality oracle's byte identity outside the scope (§7.3 items 1 and 7) (handfix-b verify-model-r0 VHM-01, VHM-02; amends J-A30.25). |
=== END ===
