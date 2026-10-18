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
interface Passage { id: Id; face: FaceRef /* the L3 face of kind passage: a covered alley-as-face cut along one side line of the front plot, from the kerb to the court or rear row it serves (§4.6, §4.7 S10 (9)); the kernel's J-A30.31 */; block: Id; frontPlot: Id; frontBuilding?: Id /* the building whose wing spans it (BaseWing.spans, §2.6) */;
  widthCm: Cm; headroomCm: Cm /* the ground storey's cells it takes; the storeys above keep the frontage continuous (§2.6) */; sealed: boolean /* item 30 (e): a bricked arch — sealPassage / openPassage (§4.11, §7.1), no geometry change; the one stored bit behind "a sealed access edge" and a plot's exposure 'sealed' (§4.6) */; lifecycle: Lifecycle }   // item 30; the entity registry (§2.8)
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
  spans?: FaceRef /* item 30: the Passage face (§2.5) this wing spans — on each base wing whose ring runs along the passage's edge (a stepped front building's quads each); written and cleared only by S11, when it builds or re-fits the passage's front building or the passage goes (§4.6, §4.7 S10 (9); a drawPassage or a thin … back_court reaches it through that re-fit, §7.1, §4.11); absent on every other wing. Its span ring and its extent above the ground are as Wing.spans below, so the capacity (below), the leaf digest of the building and §8.5's span mark read them before any composition exists, and a composition inherits them */;
  heights: Heights; roof: RoofSpec }
interface Building {
  id: Id; plot: Id; slot: number; footprint: FaceRef /* L4 */; wings: BaseWing[] /* ≥ 1; the footprint is their union exactly, kept so through every move by the wing-carrying rule (rectangle = 1, L = 2, T = 2–3, templates n; a clipped row house = 1 quad, or stepped quads on a slope) */;
  class: BuildingClass /* hovel, cottage, house, row_house, hall, inn, workshop, warehouse, chapel, church, temple, manor, keep, tower, mill, tent, … data-defined */;
  use?: Id /* the current Use record (§2.7): the roster class it houses, its specialisation and assignment; absent: vacant (item 17) */; formerUses: Id[] /* the Use records that occupied it before, newest last — the traces item 17 (c) keeps (a former inn, a guildhall turned tenement) */;
  dwelling?: Id /* the household living in a workplace (live-in), §4.7 S10b */; households: Id[] /* the Household records housed (§2.7): the reverse of Household.building, kept by the writer that sets it — the generation fill (S10b's placement, written by S11 once the wings exist, clamped into [1, capacity], §4.7), §4.11's relet, item 17's relocation (§10.3); its length is the count the plan rung houses and the interior ladder reads (below, item 28 (f)), never above the capacity (below) */;
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
type RoofSpec = { kind: 'gable'|'hip'|'flat'|'pyramid'|'cone'|'dome'|'skeleton'|'tent'|'plain' /* the F-SKELETON downgrade: no ridge or hip lines, §3.8 */|'none' /* a ruined building's roofless state (§2.8 decline hooks) */; pitch?: number /* a ratio, not an angle */; material?: string };
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
  spans?: FaceRef /* item 30: the Passage face (§2.5) the wing spans — a composed wing takes it from the base wing it covers (BaseWing.spans, above), so a composition inherits the span and never decides it. Its span ring — the part of that face under the wing: the face's ring cut by the lines that continue across it the end segments of the two wing-ring sides meeting the passage's edge (a row quad's front and rear chains), a boolean on the arrangement (§3.7), or the whole ring where the wing covers it all — is derived at read, never stored. The wing's ground ring ends at the passage's edge (the stage-3 contract reads that ring) and every storey above extends over the span ring (the wing's extent at level ≥ 1 is its ring ∪ the span ring); at the ground storey the plan rung adds the span ring as a seed ring and passes it as a fixed ring — the passage room (role passage, scope circulation), never cut, its two end walls carrying the passage openings (J-A30.23); read, on the base or the composed wing, by the capacity (below), the plan rung, §8.5's span mark, the shadow pass and the 3-D export */ }
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
  access: 'core'|'trapdoor'|'external' /* how the plan rung joins it: the stair core — where no bay of the core fits inside the ring, a trapdoor core the plan reports (the plan rung, step 3) —, a trapdoor, or an outside stair (a walk-out) */ }   // item 29 (b); the decision is "Basements" below
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
footprint hash at every LOD holds by construction (its test: §13.2). The contract reads the wings' **ground rings**: a
wing that spans a passage (`spans` on the base or the composed wing, item 30) contributes its ground ring, its span ring
lying outside the union at the ground and inside the wing's extent above it. The plan's seed rings — base or composed,
clipped to tile (the plan rung's step 4) — stand at least `attractCm` apart except where they share a joint, so the plan
rung's transient arena inserts them unmoved (§3.4's seed contract). **Its fourth rung** (item 28): per storey, the union
of the plan's rooms equals the union of the **extents** of the wings that reach the storey — a wing's extent is its ring
and, above the ground, its ring ∪ the span ring of the passage it spans (`spans`, on the base or the composed wing) —
and, at the ground storey, also the span ring of each passage a wing of the building spans, which the plan reserves
before any cut as one room of role `passage`, scope `circulation`, its two end edges exterior walls carrying the
passage's arch openings (the plan rung, below; §3.10's seed-tiling row; J-A30.23).
* **Stage-3 intake measurement and fallback.** The stage-3 intake measures the generator's `outline()` time per building
  class on B-CITY METROPOLIS seeds. If it exceeds §12.7's 10 µs median, `outline()` runs the generator's own massing step
  only (its wing rectangles without roofs or rooms); if that still exceeds the budget, the base `OutlineBuildingGenerator`
  keeps producing the outline and stage-3 `compose()` is constrained to it (its wings must union to the base outline).
  Diversity "from a giant manor to a small hovel" stays a property of `ClassRules` (data keyed by the context vector),
  not of the generator. The intake also runs §2.6's test with every fixture building's composition stored (§13.2), so a
  stage-3 generator is admitted only with compositions the base can carry.

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
the depth per storey) and is joined by the stair core, a trapdoor or an outside stair (`Basement.access`, read by the
plan rung). Its ring follows every change of the footprint by the wing-carrying rule (rule 2 (b); rule 4 says what
becomes of a ring that no longer fits; J-A29.23). It is editable (`setAttr(basement)`, §7.1; an edited basement is kept
through terrain changes, §7.3 (a)) and re-derived when its terrain gate changes. **A cellar never joins a sewer as a
room** (item 12: underground neighbourhoods front sewer tunnels only; J-A12.42): a cellar stair down to a tunnel is an
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
   by the row's `basementAccess` — a core that serves the basement takes a bay that lies inside `Basement.ring` as well
   as inside its wing's seed at every storey it serves (the placement's candidates filtered by exact containment, as
   §3.4 requires of a `fixed` ring); a `trapdoor` access — the row's, or the fallback where no candidate fits the ring,
   the core then stopping at the ground storey — is a core of kind `trapdoor` serving the basement storeys and the
   ground storey, its bay inside the ring and inside one ground-storey seed, placed from the same filtered candidates;
   the fallback is reported and writes no building record (`Basement.access` stays as derived; a click changes no
   digest, §6.2), and where not even that bay fits the basement is unreachable, which F-PLAN takes (§5.2, tier 1;
   J-A29.25); the entrance rooms (one per entrance) and the hearth rooms are anchors fixed in their wing and side before
   any cut, and the passage room is its span ring, fixed whole (step 1), so stairs are stacked by construction.
4. *Partition to targets.* Each wing of each storey is cut on the rung's **transient arena** (§3.4; J-A28.31) — its seed
   rings the extents of the wings that reach the storey, clipped to tile (where wings overlap, rule 4 (iii), each extent
   less the union of the extents before it in wing order: §3.4's seed contract), and at the ground storey each span ring
   (step 1); its fixed rings the stair core's bay, the chimney stacks, the passage room (a span ring, both seed and
   fixed) and the composer's rooms — by the storey's **layout pattern** (`LayoutPattern`, a weighted row per storey
   class in the programme row: `bisect`, recursive cuts across the region's short axis from a re-entrant corner where
   one exists; `follow`, cuts parallel to the long sides — a gallery on the court or street side; `spine`, a corridor
   along the wing's axis with rooms off it, the lodging house's and the inn's upper floors; `hall_and_parlour`, one
   cross cut with the hearth room larger; `cross_passage`, a through passage at the entrance with rooms either side;
   `enfilade`, rooms in a row with aligned doors; `nave`, one room), with the remaining rooms' target areas as the stop
   rule and the pieces assigned to programme rooms as they are cut, so no room waits for a label. Cuts are planned on a
   **wing-local module** — a table row, default 50 cm, in the wing's OBB frame; the planner's grid, never a second
   lattice — and written back as world lattice points (`Room.ring`), so walls are exact centimetre polylines, never
   cells; slivers and one-bay strips merge into circulation.
5. *Circulation and openings.* The room graph is built as a spanning tree first — priced by the programme, the pattern's
   hub (the spine, the hall, the stair hall) preferred, a bedroom's or a store's degree capped by its row — and loops
   are added by rule, never by chance (a kitchen to the yard door; a hall to the parlour and the stair; an enfilade's
   doors); a door at every entrance, rooted at the main one, the side, rear, yard and service doors secondary roots
   (item 29 (5)); stair-core doors on every storey it serves; each unit's own entry door (the ladder, below); a
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
building houses its template row's `households.built`, clamped into [1, capacity], so the static baseline is unchanged):

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
  minRoomCm2)))` — `A(s)` the exact integer twice-area (`area2`, §3.2 (6)) of the union of the extents of the wings that
  reach storey `s` (the contract's fourth rung, above): at the ground the footprint face's `area2` (the passage room,
  circulation, excluded); above it the sum of the extents' `area2` where the building's pairing holds (rule 4: tiled
  wings, whose rings never overlap; a span ring lies outside every wing ring) and the kernel's boolean union on the
  arrangement (§3.7) where it fails, so overlapping wings count once; `num/den` the circulation share
  (`RoomProgramRow.circulation`, an integer fraction, §10.2) and `minRoomCm2` the minimum area of the `room` form's one
  room (its `RoomRuleRow.area[0]`, in cm²), both read from one row — the class's programme at the band set's first,
  poorest band (`FieldBands.bands[0]`) — so the capacity is a property of the shell alone and never moves with its
  occupants; basement storeys excluded. Every host computes the same integer. The generation fill (§4.7: S10b places the
  households on the plot; S11, which creates the building and its wings, writes `Building.households` clamped into [1,
  capacity]), §4.11's `relet` and F-PLAN (§5.2) read this one function, so the solver and the plan never disagree on how
  many households a shell holds. The capacity is the owner's "the more rooms for more occupying families the richer a
  building gets", read on the building: a shell built richer has more rooms to let — its `households.max` rises with
  `builtBand` — while the households actually housed follow the occupants' band.
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
  role or unit changes; a shell mutation by item 18 keeps nothing in a wing whose clipped seed changed — so a later
  wing's rooms are re-cut too where an earlier overlapping wing changed. Re-uniting the households removes what the
  subdivision added. **The canonical chain:** the plan for (band row r, count n) is derived from the **as-built plan** —
  the class's programme at the plot's `builtBand` row with the template's `households.built` clamped into [1, capacity],
  whatever that row's household range (the ranges bound `relet` and the chain's row steps only; J-A28.28) — by a fixed
  order of least-disruption steps, each a re-cut from the previous step as its `prior`: first the ROWS, one band at a
  time from the built row toward r along `FieldBands.bands`, the count at each step clamped into that row's household
  range; then the HOUSEHOLDS, one at a time from the clamped count to n. The result depends on (r, n) alone — never on
  when a click, an epoch or a `relet` reached it (§6.2, §6.5 (9); each step's draws keyed by its target, §6.1; the cache
  memoises steps, §2.9) — and a return to the as-built row and count is the as-built plan exactly. A STORED plan is
  instead re-cut inside the event that changes its inputs, around its edited and locked rooms, with the inverse recorded
  (§7.3, §7.4; J-A28.72); that re-cut establishes J-P48 (1) for its new walls in the same event — a same-level split
  that moves nothing — so the shell's identity across a re-cut is read on its rings with the `composition`-role vertices
  removed, as §7.3 item 7 (ii) reads them (§5.3, T28-14). Each step is one open, cut and read-back of the transient
  arena, counted by §12.7's plan row.
* **Staff and shared rooms (J-A28.27).** Staff rooms are dwarfed beside the owners' — their size a share of the owners'
  principal chamber's target (the row's column) — and sit where a house keeps its service: the attic, the basement or the
  service wing before a storey the owners' rooms occupy; a lodging house's shared kitchen or common room sits on the
  ground storey by the stair core, the circulation hub. Both are programme rows (`scope` `service` and `shared`), so a class
  or a culture may keep a common kitchen down to the poor row or drop it earlier.
* **Editable.** A room's unit (`setRoomUnit`), its role and walls (the plan events) and the household count by hand
  (`relet`, a `convert` on the building, §7.1) are events; the ladder's rows are §7.6 tables.
* **Bars:** §13.2's T28-13 – T28-18.

=== REPLACE ### 2.8 Identity, lifecycle, provenance, the entity registry ===
### 2.8 Identity, lifecycle, provenance, the entity registry

Every entity record has five parts — and a kind with lazily derived rungs (a building, a stage-2 close-up) a sixth, its
elaboration record (below; item 28): an **identity** (what it is and where its random numbers come from — persisted, in
the model digest), a **lifecycle** (does it exist, and what has the user fixed about it — persisted, in the digest), its
**attributes and geometry references** (the model content of §2.2–§2.7; geometry is reached through the kernel's owner
and role tables, never through stored slots), a **derivation record** (the inputs of its derivation — persisted for the
kinds whose stage declares one, outside the model digest), and a **provenance** record (how it was last derived —
rebuilt by every derivation, never persisted, never in the model digest; LC-25). An entity that carries a generated name
also persists that name's **naming record** (the naming inputs of its last draw — outside the model digest). The
persisted derivation and naming records form the snapshot's **records digest** (§6.2), checked at every in-window load
and by the verification replay (§2.9 step 3).

```ts
// @plat/model
type Hash64 = [number, number]; type Hash128 = [number, number, number, number];   // u32 lanes
type LineageHash = Hash64;
type PointCm = LatticePoint; type Point = PointCm; type VecCm = PointCm;             // one point shape (§2.2), three names
type Polygon = PointCm[] /* one ring */; type PolygonCm = PointCm[][] /* outer ring, then holes */;
type M = number /* metres: a derived or reported length, never an arena coordinate */; type Cdeg = number /* i32 centidegrees */; type CmArray = Int32Array /* integer centimetres per element */;   // unit-branded types (§2.1)
interface Identity { id: Id /* address id, §6.3 */; kind: string; parent?: Id /* containment parent: a field, never parsed from the id */;
  key: PlatKey /* the arena: layer and part, §2.2 */; lineage: LineageHash /* stream identity, §6.3 */; reroll: number /* reroll count of this entity as a derivation unit, §6.1 */;
  dossier?: DossierRef /* item 20: the dossier element this entity exists for (§7.1's DossierRef, set by the host door, §11.4) — persisted identity in the model digest; carried by the entity the element is — its Use (§2.7), a dossier institution's Institution record (§2.7), and for an element that is neither (a named feature: a bridge, a well, a gate) the feature the assignment placed (§7.7) — and moved with it on every re-placement; a building or a plot, which only houses a use, never carries it, a building-granularity assignment's placed member included (a rejectSite relocates the use, item 17; J-A20.22); such an entity is never removed by a map edit, only rejected from a site (§7.7) */ }
type Existence = 'generated'|'built'|'altered'|'converted'|'abandoned'|'decayed'|'ruined'|'cleared'|'reused'|'demolished';   // cleared and reused: item 8's traces (the decline hooks, below; J-A8.46)
interface LifecycleFlags { locked: boolean; pinned: boolean; edited: boolean; assigned: boolean;
  lockedPaths?: string[] /* attribute-level locks (§7.2); absent = the whole entity */; editedPaths?: string[] /* attributes the user set; each is implicitly pinned (§7.2) */ }
interface Lifecycle { existence: Existence; flags: LifecycleFlags; since: { epoch: number; seq: number } /* the event that last changed `existence` */ }
interface LifecycleEvent { id: Id; seq: number /* the causing EditEvent's seq; 0 for the generation run */; epoch: number;
  kind: Existence | 'lock'|'unlock'|'pin'|'unpin'|'edit'|'assign'|'unassign'|'reparent'|'carry'|'supersede'|'resurrect'
    | 'open'|'close'|'relocate' /* item 17: a Use opened, closed or relocated; detail.from / to name the buildings */ | 'mutate' /* item 18: a designation mutation; detail.mutation names its record */
    | 'reject'|'lapse'|'place' /* item 20: a placement rejection, its lapse, a positive placement (§7.7) */ | 'relet' /* item 31 rung 1: the household count changed (§4.11); the plan rung goes stale */;
  cause: EditRef | RuleRef | 'generation'; detail?: { from?: Id; to?: Id; lineageFrom?: LineageHash; lineageTo?: LineageHash; path?: string; mutation?: number /* index into the causing event's mutations (EditBase.mutations, §7.1): the MutationRecord of §4.7 S11 */ } }
interface Tombstone { id: Id; kind: string; lineage: LineageHash; supersededBy?: Id; seq: number; last: Uint8Array /* the compressed last record: orphan reports, resurrection (§6.3) */ }
interface DerivationRecord {            // the one definition: persisted with plots, blocks and buildings (the kinds whose stage declares it); outside the model digest, inside the records digest (§6.2)
  ctx: Hash64 /* digest of the context vector read */; fields?: { prosperity?: number; density?: number; greenery?: number }; band?: string /* the recorded band hysteresis reads — for a plot, the band its derivation read; the plot's band memory after it is Plot.fieldBand (§2.5) */;
  allocationRow?: number /* the Allocation row the entity filled (§4.5 S7b) */; epoch: number /* the epoch of the derivation that wrote it */;
  params: Hash64 /* digest of the effective parameters read */; slices: SliceRef[] /* the table slices consulted */ }
interface NamingRecord {                // persisted with every generated name S13a draws; outside the model digest, inside the records digest (§6.2) and hashed with provenance; handed to a successor with the name (§6.3); dormant while the name is protected (below)
  slices: SliceRef[] /* the naming slices the last draw consulted: the grammar rows and weight vectors of the effective naming table, and, for every culture or ancestry row that chose a grammar or a corpus for it (§10.4), one slice per field of that row the draw read — kind 'row', key '<rowKey>/<field>', hashed over the field's value and, for a corpus field, the named corpus's content hash (§7.6) */;
  salt: number /* the naming salt the last draw used: the town salt, or the per-entity salt of the ids-scoped rerollLayer that drew it (§6.3) */; epoch: number }
interface Provenance {                  // derived: rebuilt by every derivation and by replay; stored as columns; never persisted, never in the model digest
  run: StageRunRef;                     // index into the stage-run table { stage, outputVersion, tablePins } — interned once per stage run, not copied per entity
  attempt: number;                      // the ladder attempt that committed it (§5.1)
  rules: SliceRef[];                    // every table slice the derivation consulted (§7.4, §7.6)
  deps: Handle[] }                      // u32 handles of the entities it read (the locality audit, §7.3)
interface SliceRef { table: TableId; version: string; kind: 'row'|'weights'|'bracket'|'thresholds'|'match'; key: string /* a row key; '<rowKey>/<field>' for a slice that is one field of a row (§7.6) */; hash: Hash64 }
```

* **One existence state plus orthogonal flags** (LC-26). A pin followed by an assignment leaves the entity both pinned
  and assigned; no code tests a single state value. `existence` moves through: `generated` (made by the pipeline);
  `built` (created by a user or an epoch: `build`, `drawFootprint`, drawn features); `altered` (a structural edit or a
  transformation changed it: split, join, densify, a re-cut by F-REDERIVE); `converted` (retyped: wall → ring road,
  gate → junction); `abandoned`, `decayed`, `ruined`, `cleared` and `reused` (decline and its traces — the hooks below); `demolished`
  (removed; the record becomes a tombstone).
* **The decline and regrowth hooks** (owner's decline instruction; item 8; COV-NG-XA36, COV-VG-VN-090 —
  STAGED-BY-OWNER). One existence state serves every kind, and §4.11's ladders map their plain names onto it per kind
  (J-A8.46, J-A8.21): *buildings* occupied → vacant (`abandoned`) → derelict (`decayed`, roofless: `RoofSpec.kind
  'none'`) → ruin (`ruined`) → robbed or cleared (`cleared`: a footprint trace — the face persists, the heights are
  zeroed in the record and its material is credited to the `MaterialLedger`, §2.7) → reused (`reused`: the trace keeps
  its face and is worked as a garden, orchard or field — `Building.reusedAs`, §2.6, drawn as that kind, §8.2 — or a
  successor is raised on the old foundations, `Building.predecessor`, §2.6; J-A8.22); *walls and gates* in use →
  neglected (`abandoned`) → breached or partly dismantled (`decayed`) → superseded by a shorter inner ring
  (`Enceinte.supersededBy`, §2.7 — a link, not a state); *tunnels* in use → silted (`abandoned`) → caved in (`decayed`)
  → collapsed or sealed (`ruined` with `Tunnel.closure`, §2.7; item 11 — their condition reading and its `open` column
  are II.6's); *islands* `SkyIsland.state` (§2.7). Which conversion (`ConversionOp`, §4.11) moves which state is a data
  table, its inverse the undo record's (§7.4); every state exists in the base schema and can be applied by hand (§7.1);
  a cleared or reused building is a **live record** at its address until `demolish` or a successor takes it (J-A8.42),
  never a tombstone; a ruined building keeps its footprint and heights and draws with the ruin program (§8.2).
  `Building.condition` (§2.6: kept, worn, neglected — item 31's wear) is not an existence state but an attribute of an
  occupied building; a sealed passage's plots (item 30) enter the ladder as vacant (§4.11). When and where the evolution
  program applies the ladders is §4.11's.
* **The elaboration record — a sixth part, per lazy rung, outside both digests** (item 28 (c); J-A28.22 with J-A28.62).
  A building carries one record per lazily derived rung — `wings`, `rooms`, `plan` — and, at stage 2, a district one for
  its close-up (`closeup`, II.4):

  ```ts
  interface ElaborationRecord { entity: Id /* the building, or for closeup the district */; rung: 'closeup'|'wings'|'rooms'|'plan'; state: 'absent'|'current'|'stale'|'edited';
    inputs: Hash64 /* the digest of the rung's recorded inputs — for a building: its leaf digest (wings, heights, entrances, basement, class, use, assignment, sub-locations, the wings' spans), the occupants' band (Plot.fieldBand) and value (the value at §7.2's τ) and the households housed in address order (item 28 (f)), and the slices below */;
    slices: SliceRef[] /* the table slices the rung consulted — programme, pattern, furniture and interior-ladder rows; §7.6 invalidates by slice */; epoch: number; since: { epoch: number; seq: number } }   // no reroll here: a rung's reroll count is what the log's regenerate events with rung give it (§6.1, §7.1)
  ```

  `absent`: never derived, or evicted — nothing is lost, a rung is a pure function; `current`: the cached result's input
  digest equals the digest of the inputs now; `stale`: an input changed — a designation, an assignment, the band, the
  storeys, the wing rings, the households, a slice, a dossier event of items 18, 22 or 31 — marked by the batch that changed
  it, with no derivation run; `edited`: a stored composition with plan events in the log. The state is recomputed from
  `inputs` against the current digest at load and after every batch that touches the entity. The record and the cached
  result live in the document's non-canonical blocks (§2.9) — outside the model digest and outside the records digest —
  because a click logs nothing and writes nothing a replay must reproduce (§6.2, §6.5 (9)); what a click derives enters a
  digest only when an edit stores it (§2.6).
* **History lives outside the entity** (SCL-20). The document keeps one **lifecycle event block** keyed by id and
  ordered by `seq` — each entry's `seq` is the causing event's (0 for the generation run); an entity holds only its
  `Lifecycle`. The block is not append-only (J-DET-33): an `undo` removes the entries whose `seq` is its target's, and a
  `redo` re-inserts them in `seq` order (the re-applied target's events cite the target's `seq`, §7.4); neither writes
  an entry of its own. So the block is always the block of the log with its undone pairs left out — the identity the
  unshared-document truncation relies on (§7.4, §6.5 (9)). Demolished and superseded entities move to the **archive**
  as tombstones: out of the working set, the spatial indexes and the display list; their ids and `supersededBy` links
  stay in the identity subtree of the model digest (§6.2) so an id is never minted twice (§6.3); a tombstone carries its
  causing event's `seq`, so an `undo` returns its target's tombstones to live and a `redo` archives them again. *Growth
  budget:* the working set grows only with live entities; the document grows by at most the bytes of new or changed
  records plus 64 B per lifecycle event (its M4 epoch test: §13.2). *Pre-decided fallback:* the archive and the
  lifecycle event block are held compressed in memory and decompressed only for an orphan report, a resurrection or an
  export — output-neutral.
* **Derivation records** (LC-12). A plot, block or building persists the inputs of its derivation — context and
  parameter digests, field samples, band, the table slices consulted — so "Regenerate (keep settings)" reproduces it
  from what it was made from, across saves, epochs and field edits elsewhere (§7.3 item 5). The record is excluded from
  the model digest (it is hashed with provenance and in the records digest). Every derivation that changes the entity's
  leaf digest (§6.2) rewrites it; a re-derivation that reproduces the leaf digest exactly keeps the old record, as the
  dependency-graph route, which never touches it, does — so the record never depends on which route re-derived the
  entity (§7.3 items 6–7). **Three band memories, kept apart** (items 31, 28 (f)): `DerivationRecord.band` is the band
  the last derivation read — in the records digest, rewritten by every derivation that changes the leaf;
  `Plot.builtBand` (§2.5) is the band the stock was built for — in the model digest, rewritten only by rung-3 events and
  the redevelopment-class edits J-A31.44 lists (§4.11); `Plot.fieldBand` (§2.5) is the band the plot's occupants live at
  — in the model digest, set by every derivation that reads the current field and re-banded after S6 at every epoch, so
  the interior's hysteresis follows the field (J-A28.29); a document written before these attributes existed gets
  `builtBand` and `fieldBand` from `DerivationRecord.band` and `builtProsperity` from the recorded sample (§7.5). A
  plot's record may also cite the designation-template and compatibility slices item 18's mutator read (`slices`).
* **Naming records.** Every time S13a draws a generated name it writes the name's `NamingRecord`: the naming slices the
  draw consulted and the salt it used. The record travels with the name when the address passes to a successor (§6.3),
  is rewritten by every draw, and is what §6.3's draw case (4) and §7.6's invalidation by slice compare with the current
  effective slices to find the names whose naming inputs changed. It is persisted, like a derivation record and unlike
  provenance, so a rebased document — whose provenance no replay can rebuild — still knows which names drew from a
  changed grammar row or corpus (J-DET-41). It is stored as offsets into the deduplicated slice-reference pool (below):
  ≈ 4–8 slices per name, ≈ 20–40 B raw per name, ≈ 0.1 MB raw for the ≈ 3 500 names of a CITY before compression,
  counted in §2.9's per-building document budget. **A protected name keeps its record dormant** (J-DET-46): while the
  name is protected — a `setAttr` on it, a lock on its path (a whole-entity lock included) or an assignment that sets it
  (§7.7) — its record stays in place, and no draw case reads, compares or rewrites it; it still travels with the address
  to a successor. The event that ends the protection returns the name to unedited with the record of its last draw and
  runs §6.3's case (4) for it, the event's undo record keeping the former name and record. An entity whose name was
  never drawn has no record and nothing to re-draw.
* **Provenance is compact and outside the digest** (LC-25, SCL-5). Version stamps live once in the stage-run table, not
  in each entity; `rules` are offsets into a deduplicated slice-reference pool; `deps` are u32 handles into a pool; all
  of it is stored as struct-of-arrays columns per kind (target ≤ 64 B per entity at CITY, measured at M1 with the
  entity-memory test of §12; *pre-decided fallback:* `deps` are recorded per derivation unit — per block, per plot —
  instead of per entity, which makes the audit coarser, never unsound). Provenance, derivation records and naming
  records share the provenance digest, used only by the locality audit (§2.9 "Canonical form and digests"; §6.2).
* **Rules cite slices, not rows** (LC-21). A derivation records every table slice it consulted, by the slice's hash: the
  whole weight vector for a weighted draw or a deck, both bracketing rows for an interpolated rule, the threshold set
  for a band lookup, the row for a direct lookup — for a naming draw, one slice per culture or ancestry field it read
  (§7.6) — and the table's match predicate set for a rule that selects rows by predicate. §7.6 invalidates on
  slice-hash change.
* **The entity registry** (`@plat/model`) declares per entity type: generator stage and **lineage unit** (§6.3);
  **anchor encoding, hysteresis radius and class family** (§6.3); **digest encoding** (§6.2); **invariant scopes**
  (§5.3); renderer symbols per LOD; export mapping per format; persistence encoding (§2.9), the naming record included
  for a named kind; pick behaviour; **edit kinds with their undo path and lifecycle row** (§7.1, §7.4); migration hooks
  (§7.5). Its completeness test — a CI test fails when a type is missing from any of those paths — is §13.2's (O11 a;
  §7.1, owner amendment 5). The amendments of 2026-09-25 add to it: `Use` (§2.7; lineage unit the creating event or the
  epoch's use step, anchor the plot's address and role), `Passage` (§2.5), `MaterialLedger` (§2.7, one per document),
  `Rejection` (declared with its mechanism in §7.7: model data in the digest, keyed by element and site, with its lapse
  and its migration hook), `AccessPoint` (II.7.4), the underground plots' and buildings' fields (II.7.3), the plan's
  `Room` with its `unit` (§2.6; anchored by its centroid within its wing), a building's `Entrance` and `Basement`
  sub-records and its base wings' `spans` (§2.6), the plot's `builtBand`, `builtProsperity` and `fieldBand` with their
  migration hook (§7.5), the tunnel's `navigable`, `headroomCm` and `closure` (§2.7), and the elaboration record's cache
  path (§2.9); each enters §13.2's path-completeness test, and every new attribute has its edit kind or is declared
  derived (§7.1).

=== REPLACE ### 2.9 The document and serialisation ===
### 2.9 The document and serialisation

A document is **a base plus an ordered log**: the base is either the canonical recipe (the town replays from its seed)
or, after a rebase, a materialised state; the log is every event since the document was created, in `seq` order.
Everything else in the file is the canonical style state, input recorded for replay (setting-pack content, host
outputs), a verified cache, or per-user state.

```ts
interface Document {
  docId: Uuid;                  // minted at creation by @plat/api (outside the model packages); kept on save; re-minted on clone and save-as (§6.3)
  schemaVersion: string;        // the file format (§7.5)
  outputVersion: string;        // the model packages whose output this document replays under (§6.4)
  base: Base;
  log: EditEvent[];             // the single source of truth for every edit, lock, assignment, table edit, epoch, rebase, upgrade, undo and redo (§7.1, §7.4); a rebase never removes events
  nextSeq: number;              // the seq the next event takes; never decreases — also when an unshared document truncates an undone pair (§7.4)
  packs: PackData[];            // the content of every non-shipped pack of the pack set and of every pack a truncated event held on a saved redo stack names (below) — a selected user corpus is one — canonical, outside the model digest
  hostContent: HostContent[];   // outputs of host-registered providers, keyed for replay (§6.5, §11.4) — canonical, outside the model digest
  style: StyleState;            // sheet id@version (a non-shipped sheet's content included), style row operations, ground-cover regions — canonical, outside the model digest
  model?: Snapshot;             // the materialised model at the log head: a cache checked against its own model and records digests and verified by replay (load step 3); always written on save
  view?: ViewState;             // per-user and shared view keys (below), the stored authoring `session` included — never in a digest
  derived?: { report: GenerationReport; stats: StatisticsRecord; epochs: EpochRecord[]; locks: Id[]; orphans: OrphanRecord[];
              features: Features /* II.7.4: the resolved feature set (sewers by tier) — recomputed on load with the report; every dependant reads it from the model, never from a layer's visibility (item 14) */;
              elaborations: ElaborationRecord[] /* §2.8: one per entity and lazy rung, derived from the cache below against the current digests (item 28) */ };   // caches rebuilt from base + log; never canonical
  undo?: UndoRecord[];          // the session's undo records carried across a reload (their cap: §7.4), with the truncated targets its redo stack holds; never canonical
  elaborations?: ElaborationChunk[];   // the elaboration cache (below), kept across zoom-outs and sessions so that "once generated it is saved" holds without storing derived rungs in the model (item 28); never canonical
}
type Base =
  | { kind: 'recipe'; recipe: Recipe }                                                     // replay = G(outputVersion, recipe), then fold the log
  | { kind: 'rebased'; recipe: Recipe; state: Snapshot; seq: number; reason: RebaseReason }; // replay starts from `state` — checked against its root of record (load step 3) — and folds the events after `seq` (= the rebase event's `at`, §7.1); a `rebase` event is a no-op in the fold of a client whose base it already is (a bridged client that holds another base installs it, load step 4); the town is not seed-reproducible before `seq`
type Seed = number;             // a u32, 0 … 2³² − 1: records write it as its decimal string (§13.3), permalinks in base 36 (§6.4); the D-5 panel seeds are H32 values (§13.6 (2))
interface Recipe {              // the canonical recipe: every model-affecting input and nothing else (§6.2; LC-15)
  seed: Seed; rung: Rung; tablePins: Record<TableId, string>;
  packs: { id: string /* a selected user corpus: 'user:<content hash, base 32>' */; version: string; hash: Hash128 /* of the pack's canonical JSON */; shipped: boolean /* in the shipped set of the output version that wrote the entry — informative only: a load resolves each pack by hash (below), the link rule reads the link's output version (§6.4), and an upgrade to a version that stops shipping it copies its content into `packs` (§7.5 (2)); always false for a user corpus */ }[];   // setting packs and selected user corpora (§7.6, §10.4)
  params: ParamDelta;           // the full effective delta over the pinned shipped defaults — pack, preset, user-global and document overrides folded in at creation (§7.6)
  presetId?: string;            // provenance only: the delta already holds the preset's values, so an edited preset elsewhere cannot change this town
  intent: Intent; character: CharacterVector[];
  circumstances?: CircumstanceTimeline;   // schedules epoch events (the app proposes them); never applied except through `epoch` events (§7.1)
  entryMode: 'contentFirst'|'layoutFirst';  // S10b's entry point (§4.7) — a recipe field, not session state (LC-30)
  salts: Record<RerollableConcern, number> }   // initial salts of the rerollable concerns only (normally 0), keyed by §6.1's registry-generated type; the schema refuses any other key, so a geometry concern can never carry a salt; rerollLayer events in the log advance them (§6.1)
interface PackData { id: string; version: string; hash: Hash128; author: string; content: SettingPack /* §10.4, schema-validated */ }
interface HostContent { provider: string; version: string; inputHash: Hash128; output: unknown }   // read on replay instead of calling the host (§11.4)
interface Snapshot { seq: number /* the log head it materialises */; chunks: ChunkRef[] /* content-addressed, below */;
  digest: Hash128 /* the model's Merkle root, §6.2 — recomputed from the decoded state at every in-window load (step 3), under the model packages of the output version that recorded it, and compared */;
  recordsDigest: Hash128 /* the root of the records tree over the persisted derivation and naming records, §6.2 — recomputed at every in-window load and by the verification replay (step 3), and compared */ }
interface ElaborationChunk { entity: Id; rung: ElaborationRecord['rung']; inputs: Hash64; hash: Hash128; bytes: Uint8Array }   // item 28 (c): the elaboration cache — a derived Composition, Plan or close-up, or one memoised step of a re-cut chain (§2.6), keyed by (entity, rung, inputs digest); content-addressed and non-canonical: checked by hash, dropped on mismatch or eviction (§12.8), never a base, never in a digest (§6.2)
interface ChunkRef { block: 'geometry'|'entities'|'archive'|'history'|'fields'; partition: string /* PlatKey and 'L0-1' (the level-≤ 1 routes) or a static-index partition (§3.3) — or, under the size fallback below, a block group — or 'town' */; hash: Hash128 }
interface ViewState { keys: Record<string, { value: unknown; lamport: number; session: string }> }   // the keys of "View state" below, `session` included; each key last-writer-wins by (Lamport counter, session id)
interface EpochRecord { epoch: number; seq: number; inputs: EpochInputs; postDigest: Hash128 }   // derived from the log's epoch events (§7.1)
type RebaseReason = 'keptSnapshot'|'drawnConstraintsRebuilt'|'frozenImport';   // keeping the old model at an upgrade needs no rebase: the document stays at its own output version (§7.5), so no reason names it
interface UndoRecord { session: string; of: number /* the seq of the event this record undoes */; record: Uint8Array /* its §7.4 undo record, compressed */;
  redo?: EditEvent /* an unshared document's truncated target held on this session's redo stack (§7.4): the event itself with its original seq, so a redo after a reload re-appends it; every pack it names stays in `packs` while it is held */ }
```

* **One source of truth** (LC-24). Locks, assignments, table and preset edits (including tables a host supplies, which
  arrive as `editTable` / `editPreset` / `setStyle` events whose content is copied into the log with provenance `host`),
  epochs, undo and redo exist only as log events; their current effect lives in the entity records (flags, attributes)
  and in `derived` caches rebuilt from the base and the log. The blueprint's own assignments and edits enter as the log's
  first events (§7.7); dossier events (items 20 and 22) enter the log through the host door (§11.4) with `author: 'host'`
  and `EditBase.dossier` set, in the host's order — so the log is the ordered dossier history the map is a function of
  (§6.2), every map edit lives here and never in the dossier, and the module never writes the dossier (§11.3); the report,
  the statistics and the timings are §5.4's. A rebase never deletes events: the events
  before it stay in the log as history and as the rebase's undo path (§7.4), and the fold skips them while the base is
  the rebased state.
* **Model inputs that are not in the recipe's parameters; the pack set (J-DET-35, J-DET-50).** Every setting pack is identified by
  id, version and content hash. The document's **pack set** is every pack that the base recipe's `packs` names or that
  the `value` of any `adjust` of the pack list in the log (`param: 'packs'`, §7.6) names — an undone, superseded or
  deselected selection included, because its event stays in the log and every replay folds it. When a document is
  created — or an `adjust` adds a pack (§7.6) — the content of every pack of the pack set that is not in the output
  version's shipped set is copied into `packs`, and it **stays there while the base recipe or any event of the log names
  the pack, or a truncated event held on a saved redo stack (`UndoRecord.redo`, §7.4) does**: its content leaves
  `packs`, at the next save, only once none names it — a truncation (§7.4) removed the last logged event naming it, and
  the redo entry holding that event was cleared by a new event from its session or left the `undo` section's cap. A pack
  a new output version stops shipping is copied into `packs` by the upgrade (§7.5 (2)). **A user-uploaded corpus is a
  pack like any other** (§10.4): selecting it wherever a corpus is chosen is an `adjust` of the recipe's pack list
  (§7.6) that enters it as `{ id: 'user:<content hash, base 32>', version: '1', hash, shipped: false }` with its content
  in `packs` — the corpus and the keyed row operation that binds it to the culture or ancestry row the user chose, so
  the binding is part of its content hash (§7.6); deselecting it is a second `adjust`, and its content stays saved
  because the first still names it — so a replay of the log always resolves it, and a town that has selected a user
  corpus can never emit a link that replays with other names (§6.4); an uploaded corpus outside the pack set is not a
  model input and is not saved. A host provider's outputs are copied into `hostContent` as they are produced (§11.4).
  On load each pack of the pack set is resolved by hash, first from `packs`, then from the library's shipped packs; a
  missing pack or a hash mismatch opens the document read-only with a message naming the pack, never a replay with other
  content. So a document replays on a machine that has neither the pack nor the host. Pack data and host content are
  counted outside the per-building budget below and **capped at 2 MB gzipped together**: a pack (a user corpus
  included) that would pass the cap is refused when it is added, with a message; a host provider's output that would
  pass it is refused at the provider call — nothing is recorded in `hostContent` — and the edit that requested it
  returns an **F-EDIT conflict** (§5.2) naming the provider and the size: an `ApplyResult` `conflict` through the API
  and, for an edit that came over the bridge, `doc.rejected { reason: 'invalid', conflicts }` (§11.2, §11.3). So nothing
  is ever committed with content a replay could not read.
* **Load.**
  1. A `schemaVersion` newer than the library's opens **read-only** with a message: view and export only. A document
     whose canonical form fails its schema — a `Recipe.salts` key that is not a rerollable concern among them — opens
     read-only with a message naming the field, never replayed.
  2. An `outputVersion` outside the retention window (§6.4) opens as a **frozen view** from `model`: view and export;
     the one edit offered is `rebase` (reason `frozenImport`), after which the document edits under the current version
     and records that it is not seed-reproducible before the rebase. **A frozen view is never checked against its
     recorded model root** (J-DET-44): that root was computed by its own output version's model packages — their leaf
     encoding and field drivers among them — which the browser no longer holds. The view checks each chunk against its
     content hash, which depends on the bytes alone, and is labelled "made with o<k>; not verified by this version"
     beside the CLI command that replays and checks it under its own output version (§6.4). A chunk whose bytes miss
     their content hash is reported as damage ("part of the saved copy is damaged"), its partitions drawn marked, and the
     `frozenImport` rebase is refused — a damaged copy is never a base — with the same CLI command. The `frozenImport`
     rebase decodes the state under the current version — its fields recomputed from their drivers and the stroke list
     (below), never from the Uint8 display copy —, checks its records root against `model.recordsDigest` (the records'
     encoding is the file schema's, so any version can check it, §6.2; a mismatch refuses the rebase as damage), records
     the model root the current version computes as its `stateDigest`, with `version` = the current output version
     (§7.1), and re-draws the names whose naming inputs changed as §7.4's rebase row states; it resolves the pack set as
     a load does, and a pack that neither `packs` nor the current version's shipped packs hold refuses the rebase with a
     message naming the pack and the CLI command that installs the document's own output version, copies the pack's
     content into `packs` (the cap above applies) and rebases. A document without `model` outside the window (only the
     CLI writes one, below) cannot be shown as a frozen view: the app says so and shows the CLI command that replays it
     under its own output version (§6.4), and offers to open its recipe under the current version as a new document with
     §6.4's notice.
  3. Otherwise the document's output version is the current one or a retained N−1 or N−2 (§6.4), and everything below
     runs under **that version's model packages** — its decoder, its field drivers and its digest leaf encoding, the ones
     that recorded the roots it checks.
     * **Decode and check.** The load decodes `model` — each chunk checked against its content hash, the arena rebuilt
       (§3.9), the entity columns decoded, the fields recomputed from their drivers and the stroke list (below) — and
       displays it at once. Before the decoded state accepts its first edit, the load recomputes its digest tree — every
       leaf and interior node of §6.2, one full recomputation from the decoded state, within §6.2's bar — and compares
       its root with `model.digest`; in the same pass it builds the records tree over the decoded derivation and naming
       records (§6.2) and compares its root with `model.recordsDigest`. The trees it builds are the working state's
       maintained trees from then on: every edit updates them at commit (§6.2 "Maintenance").
     * **Corrupt cache.** A model root or a records root that differs, or a chunk whose bytes miss their content hash, is
       a **corrupt cache**: the report says so ("the saved copy of this town does not match its own fingerprint; it is
       being rebuilt from its recipe and edits"), the decoded picture stays on screen read-only and marked as damaged,
       and the document loads by replay (step 5), the replay's state becoming the working state when it reaches the log
       head; a corrupt cache is never verified, never a base and never offered as the saved town.
     * **A rebased base.** A rebased document's `base.state` is checked the same way when a replay starts from it: its
       records root against `base.state.recordsDigest`, and its model root, computed under the packages the replay runs
       under, against **its root of record for that output version** — the `stateDigest` of the `rebase` that installed
       it when that event's `version` is the replay's version, else the `baseDigest` of the later `upgrade` whose `to` is
       (every `upgrade` of a rebased document records one, §7.5 (2)). The document's output version is always the
       `version` of its latest rebase or the `to` of its latest upgrade, so an ordinary load always finds a root of
       record for its version, and the undo of an upgrade, replaying under `from`, finds the one recorded before it; a
       base kept under o5 and upgraded to o6 is therefore checked under o6 against the root o6 computed at the upgrade,
       never against o5's. A mismatch there opens the document read-only with a message, because no replay can rebuild
       a state that is not seed-reproducible.
     * **Working state and verification replay.** On a matching root the decoded `model` is at once the **working
       state**: the user edits it immediately, and each edit is dry-run, logged and applied to it exactly as in a
       verified session, at §12.6's edit cost — no edit waits for the verification replay. In parallel a **verification
       replay** folds (base, log) up to `h₀`, the log head `model` materialises (`model.seq`), in replay mode — every
       model stage at its event's log position exactly as in the session, S13a's scoped delta included; only the view
       stages S14 and S13b suppressed (§7.3) — and compares its model root and its records root at `h₀` with
       `model.digest` and `model.recordsDigest`. It runs in a pool worker on its own arena, its own per-district stages
       with pool size 0 on that worker — the same overlay-and-merge path, identical digests by construction (§3.3 pool step 5),
       each freeze it reaches first rebuilding the partitions its folded edits left dirty (§3.3 pool step 1) — so **no copy
       is frozen while it runs**, and §12.8 counts the replay's model in place of the pool's frozen arena copies: every
       edit made meanwhile runs its per-district stages (S10, S10b, S11, S12b) in the generation worker by the
       pool-size-0 path (§3.3 pool step 5), which gives the digests the pool gives by construction, so the replay's worker is
       never contended and the working set stays on its counted line; an edit whose scope spans several districts costs
       its single-worker figure (§12.4) until verification ends. With pool size 0 the replay runs in the generation
       worker, on its own arena beside the working state, and yields to each user edit at its next batch boundary
       (J-I14).
     * **Edits held for provenance.** `editTable` and `editPreset`, whose invalidation reads recorded slices (§7.6),
       need provenance, which only the replay rebuilds (the snapshot does not store it): they are held until the replay
       reaches `h₀` and hands its provenance to the working state (for every entity the edits made meanwhile did not
       re-derive), and every event after a held one waits behind it, so the fold keeps log order. An `Adjust` made
       meanwhile uses tree scoping, which §7.3 items 6–7 prove output-identical to the dependency-graph route.
     * **Verified.** The working state is verified only when both model roots equal `model.digest` and both records
       roots equal `model.recordsDigest` — the decoded state's, checked before its first edit (or under §6.2 (iii)), and
       the replay's at `h₀`; the edits made meanwhile are then verified with it, because they were applied to a state
       proven equal to the replay's at `h₀`.
     * **Records mismatch (J-DET-52).** When the replay's model root at `h₀` equals `model.digest` while its records
       root does not — as when a writer stored a wrong derivation or naming record and hashed what it wrote — no model
       changes and nothing is asked: the replay's state at `h₀`, records included, replaces the working state, and every
       event logged after `h₀` is re-applied to it in log order as "take the replayed town" re-applies them (step 4),
       because an edit made meanwhile may have read a wrong record (Regenerate (keep settings) reads derivation records,
       and case (4) naming records and their salts, §6.3); their fates and renames are recomputed and differences
       reported, the report says "the saved copy's derivation or naming records differed from what its recipe gives and
       were rebuilt", and the working state is then verified.
     * **Trust the saved town.** The user may end the wait by choosing "trust the saved town", which keeps the saved
       town as in step 4. It is offered only once the decoded state's own model and records roots have matched; when that
       is, and what waits for the recomputation meanwhile, is §6.2 (iii)'s.
     * **Budget and measurement (M2a; METROPOLIS at M2b).** **Open-to-editable** — from the file's bytes in memory to
       the working state accepting its first edit — is ≤ the time §12.5's law gives to generate a town of the document's
       building count with the pool, T(B) (at CITY ≤ 60 ms + 60 µs × B: 330–420 ms at the default request), so opening
       a saved town is never slower than generating it; on the reference 300-edit CITY document, with pool size ≥ 1, an
       edit made 100 ms after the state becomes editable applies within its §12.6 cost + 10 ms; with pool size 0, within
       its cost + the longest replay batch at the rung (reported); the picture is on screen before the state is editable
       (S14 from the decoded model). *Pre-decided fallbacks:* if the recomputation passes §6.2's bar, it leaves the edit
       path by §6.2 (iii); if open-to-editable then still passes T(B), the kernel rebuilds each L2–L4 static index
       partition at the first query that reads it instead of at load (§3.9) — output-neutral, because every query
       result is sorted by its canonical key whichever structure holds an item (§3.3) — and if the bar still fails it
       is restated at the measured value as a declared budget amendment in the release notes and the judgment table,
       reported for the owner's veto, the picture still appearing at once; if the pool-size-≥ 1 edit bar fails for CPU
       contention, the verification replay pauses while an edit is applied and while the user has edited within the
       last 2 s, then resumes — scheduling only, never a model change. The load-verification fixtures (corrupt
       snapshots, a forced §6.2 (iii), an altered naming record) are §13.2's.
  4. A **mismatch is never silent** and is resolved once, by the user's choice (J-DET-38). **Keep the saved town**
     (offered only once the saved copy's own roots have matched, step 3): the base becomes the rebased state `model` at
     `h₀` (`Base.seq = h₀`) and a `rebase` event with `at = h₀`, `stateDigest = model.digest` and `version` = the
     document's output version (reason `keptSnapshot`) is appended at the head (`EditEngine.rebase(doc, 'keptSnapshot',
     h₀)`, §14); the edits made during verification already stand on that state and stay as they are. **Take the
     replayed town:** the replay's state at `h₀` (its arena and entity columns, transferred to the generation worker)
     replaces `model`, and every event logged after `h₀` is re-applied to it in log order through the ordinary fold —
     they are log events, so this is their replay; each one's confirmed fates are recomputed and a difference is
     reported as §7.3 item 4 requires, and their undo records are rebuilt by the re-application. Either way the document
     is consistent after the choice, the next load does not report it again, and undo below a rebase uses the rebased
     state, never a replay from the seed. A rebase fills in, from the rebased state, the derivation record of every
     entity of a kind that declares one (§2.8) and lacks it, so Regenerate (keep settings) stays defined for every such
     entity. **In a document attached to a host bridge** (J-DET-42) the policy — which client may keep the saved town,
     and what every other client does, reports, records and keeps meanwhile — is §11.3's ("Bridged load verification");
     what follows is the install mechanics. A client that receives a `rebase` with reason `keptSnapshot` whose `at`
     lies behind its log head and whose `stateDigest` differs from its own root at `at` **installs that base**: it
     decodes `model` from the `doc.load` bytes it kept (§11.3) and checks it as in step 3, makes it the rebased base
     (`Base.seq = at`), re-applies every event after `at` through the ordinary fold — their fates recomputed and
     differences reported (§7.3 item 4), their undo records rebuilt — and tells its user that the owner kept the saved
     town. A client whose verification is still running when that `rebase`
     arrives stops it, because the base is settled; a client whose root at `at` equals the `stateDigest` changes
     nothing; any other `rebase` whose `at` lies behind the head (possible only in a hand-built log) is a reported no-op,
     identically everywhere. A client that loads a document whose log already holds a `keptSnapshot` rebase with `at =
     model.seq` and `stateDigest = model.digest` — the host kept serving the bytes from before the owner's choice — takes
     `model` as that rebased base after step 3's check, without a verification replay and without asking, since the
     owner has chosen; the next owner save writes the base in its rebased form. So every client of a bridged document
     reaches the owner's state, as §11.3's convergence rule requires. The mismatch fixtures are §13.2's, and §11.3's
     convergence test includes a forced mismatch settled by an owner's keep.
  5. A document without `model` inside the window loads by replay — as does a corrupt cache (step 3); `model` is a
     cache, never the only copy of anything. So does a document of the running output version written by M1's
     generated-town format, before the records digest existed (§16): nothing recorded a records root for it, so the
     schema transform that adds `recordsDigest` (§7.5) drops its `model`, and the load regenerates the town from its
     recipe and its empty log, never reporting it verified — a *preview* file (§13.3) loses nothing by it (J-I19). M1's
     reader never root-checks a document of another output version: it opens as step 2's frozen view (§16 M1).
* **What the snapshot holds** (FTG-21, SCL-11). Geometry is stored **once**: per arena (`PlatKey`) every boundary — a
  shore, a kerb, a plot line, a party wall — is written once with its birth level, and faces, twins and parents are
  rebuilt on load (§3.9); every level is present, so a frozen view needs no pipeline code of its own version. Entities
  are stored as columns (identity, lifecycle, attributes, derivation records and naming records, §2.8); **provenance is
  not stored** — verification replays rebuild it. The **prosperity, density and greenery fields are not stored** at full
  resolution: an editable document recomputes them from their drivers and the stroke list on load (§4.5, §7.2); the
  snapshot carries only a Uint8 copy of each field at 32 m (≈ 40 KB at CITY), used for thematic display if the document
  is ever opened as a frozen view. Neither digest tree is stored: the snapshot holds the two roots, `digest` and
  `recordsDigest`, and the load recomputes both trees (step 3).
* **Content-addressed chunks; one copy of a rebased state (J-DET-36, J-DET-19).** A snapshot is serialised as chunks, each keyed
  by its 128-bit content hash and written once in the container however many snapshots reference it. The geometry chunks
  — one per arena for its level-≤ 1 routes and one per static-index partition (one per district plus one outside
  districts, §3.3; the same units as §7.4's copy-on-write checkpoints) — are laid out by §3.9: what each holds, how a
  chunk names geometry another chunk holds (by lattice point) and which edits rewrite which chunks. Entity columns are
  chunked per partition; the archive, the lifecycle history and the field cache are town chunks. A rebased document's
  `model` therefore shares every unchanged chunk with `base.state`: while the post-rebase log is empty `model` is only a
  chunk list naming `base.state`'s chunks (the same digest), and after edits only the chunks those edits rewrote are
  stored twice.
* **Size budget.** TOWN ≤ 0.6 MB, CITY ≤ 3 MB, METROPOLIS ≤ 8 MB gzipped, and **≤ 320 B per building at CITY**, counted
  over the unique chunks plus the manifest, measured against FTG's 593 KB for 2 798 buildings with their population (≈
  212 B per building; PLAT also stores plots, yards, heights, lifecycle and the naming records of §2.8, and derives
  people); pack data and host content are counted separately (above). This section holds the document budget (§12
  carries memory, not the document). *Measurement:* a document-size test per rung in B-CITY-lite at M1, and at M2a one
  on a CITY document rebased by keeping the saved town, after 20 edits (≤ 1.25 × the unrebased document; §16).
  *Pre-decided fallback if CITY exceeds 320 B per building:* the vertex stream switches to second-order (predictive)
  delta coding — each vertex stored as its difference from the straight-line continuation of the previous two along its
  first edge — with x and y in separate streams; the change is lossless and output-neutral, so no golden moves.
  *Pre-decided fallback if the rebased document exceeds 1.25 ×:* the L2–L4 geometry and entity chunks are cut per
  **block group** instead of per district — a district's blocks grouped by the 200 m world-grid cell that holds each
  block's lowest-leftmost vertex, so an edit rewrites only the groups whose blocks it touched — and the test re-runs; if
  the ratio still exceeds 1.25 ×, the bar is restated at the measured ratio as a declared budget amendment in the
  release notes and the judgment table, reported for the owner's veto, while the rung's absolute budget above (CITY ≤ 3
  MB) stays the hard bar for rebased documents too. Both steps are output-neutral: chunking changes bytes on disk, never
  the model or its digest.
* **Formats.** Canonical: a `.plat` container = a JSON manifest (schema-validated, human-diffable: versions, `docId`,
  `nextSeq`, base recipe, log, pack data, host content, style, the snapshot chunk lists) + binary blocks (the chunks, by
  hash) as typed arrays. Saving from the app or the API **always writes `model`**; only the CLI's `--recipe-only` export
  writes a document without it (test fixtures and files made from links), and it refuses a rebased base, whose state its
  recipe cannot rebuild. The compact twin for embeds is §11.1's — the same schema in world coordinates, round-tripping
  exactly (O11 c); exports are views (§11) and carry address ids plus a supersedes table (§6.3).
* **Canonical form and digests.** The canonical document is `docId`, `schemaVersion`, `outputVersion`, `nextSeq`,
  `base`, `log`, `packs`, `hostContent`, `style` and `model` (when present); `view`, `derived` and `undo` are never
  canonical. Four digests: the **model digest** and the **records digest** (§6.2), the **provenance digest** (provenance,
  derivation records and naming records, §2.8 — the locality audit only), and the **document digest** (over the
  canonical bytes — save → load → save identity). The bridge's concurrency token `logHead` is §11.3's.
* **View state** (FTG-12, LC-16): time, location, favourites, notes and public notes, view pins, layer choices,
  `stylePreset` (a per-viewer preset that never writes `setStyle`, §11.3), `elaborate` (`click` or `view`: when a lazy
  rung is derived, never what — §4.1, item 28; `click` by default), `storey` (the storey the building band draws; its
  default is §8.5's, J-A28.82), `depthBand` (the underground depth band the cut-away draws; its default is §8.4's,
  J-A12.81), `plotsOnly` (the cadastral plots-only view; §8.5, item 28), `knowledge` (item 30: `{ tier:
  'public'|'local'|'secret'; places: Id[] }` — the viewer's tier and the addresses of the places it has learned, which
  §9.2's label policy, the reader (§11.2) and every picture and interchange export (§11.1) admit by §9.2's table; its
  default by role and who may set it are §11.3's, J-A30.82; every golden is taken at tier `public` with no places),
  season, weather, frame, map rotation, compass, legend and emblem settings, `exportAnchor` (§11.1) and the people a
  user has opened live in `view`, outside every digest; the document's `style` stays canonical; each key is
  last-writer-wins by (Lamport counter, session id), so a viewer never writes the model. The key `session` holds an
  unshared document's authoring session (§7.4 "Sessions"); a client attached to a host bridge takes its session from
  `doc.load` instead and never writes this key (§11.3).
* **Permalinks** are §6.4; **migrations** are §7.5; the **edit log's replay semantics**, undo and redo are §7.4; the
  export → import → export round trip over the canonical form is a hard test (§13.2).

=== J-ROWS ===
| J-A30.23 | the passage a wing spans is a room of the spanning building's plan at the ground storey: its span ring (the part of the `Passage` face under the wing) a seed ring and a `fixed` ring there, the wing's extent above; `spans` on the base wing, which S11 writes and a composition inherits, so the capacity, the leaf digest and the span mark read it before any composition exists; the carry also runs when the spanned passage face changes under a stored composition; the fourth rung and J-P48's room check read the storeys' extents; the arches are `passage` openings, not entrances (amends J-A30.21's union sentence and J-A28.26's "reserved passage cells") | §2.6, §2.5 |
| J-A28.23 | the owner's "the more rooms for more occupying families the richer a building gets" read as the shell's capacity, and one integer capacity function stated in §2.6 that the generation fill (S10b's placement, S11's write), `relet` and F-PLAN all read | §2.6 |
| J-A28.26 | the re-cut's canonical chain — rows first, then households, from the as-built plan — with the shell reopened as the arena's seed rings (the wings' extents clipped to tile, the span ring, the basement ring), the entrances and hearths as anchors, the stair bay, stacks, passage room, composer's rooms and kept rooms as `fixed` rings, and the kept-room rule read on the room's clipped seed ring; a stored plan re-cut inside its changing event, the shell's identity across it read without the `composition`-role vertices its new walls add | §2.6 |
| J-A28.29 | who occupies a building, at which band: the housed are `households` (with the live-in `dwelling`) and `Building.occupants` is retired; the occupants' band is the plot's current field sample banded by §4.5's rule against the plot's own band memory, `Plot.fieldBand`, which every epoch re-bands; `ClassRules.pick` takes the field band and the manifested band as explicit inputs | §2.6, §2.5 |
| J-A29.25 | a stair core that serves the basement takes a bay inside `Basement.ring` as well as its wing; where none fits, a `trapdoor` core inside the ring joins the basement, reported, and no building record changes | §2.6 |
| J-A20.22 | `Identity.dossier` is carried by the entity the dossier element is — its `Use`, a dossier institution's `Institution`, or the named feature an assignment placed — never by the building or plot that houses a use, a `building`-granularity assignment's placed member included | §2.8 |

=== RATIONALE-A ===
| J-A30.23 | Chose to make the passage a wing spans a room of the spanning building's plan at the ground storey — its span ring, the part of the `Passage` face under the wing (the face cut by the lines that continue the wing's front and rear sides across it), added as a seed ring and passed whole as a `fixed` ring of role `passage` and scope `circulation`, its two end walls carrying the arch openings — while the stage-3 union contract keeps reading the wings' ground rings and every storey above extends over the span ring, and to read the plan's fourth rung, its capacity and J-P48's room check on each storey's extents, over leaving the passage outside the ground storey's plan or folding it into the wing's ground ring, because item 30 (c) has the plan rung reserve the passage cells before partitioning as a room of kind passage, the kernel's transient arena accepts a `fixed` ring only inside its seeds (the kernel verifier's VK-04), a passage face that runs on past the building to its court must not put yard ground into the plan, and a ground ring left unchanged keeps the footprint, O17 (i)'s footprint hash and the passage face's own L3 identity as they were; the arches are openings of the passage room, not entrances of the building — a door from the building onto the passage is a side entrance facing `passage` — because an `Entrance` is a footprint vertex and the arch is a public way. The span is recorded on the base wing (`BaseWing.spans`), which S11 writes when it builds or re-fits the passage's front building and a composition inherits, over a field of the composed wing alone, because the capacity the generation fill reads, the building's leaf digest and §8.5's span mark all need the span before any composition exists, and a stepped front building has several quads, of which only those along the passage span it; and the carry also runs when the spanned passage face or one of its vertices changes under a stored composition, because the span ring is derived from that face, so a move of the passage's far side, kerb or court end would otherwise leave the stored rooms over it untiled. Amends J-A30.21's union sentence and J-A28.26's "reserved passage cells" (§2.6, §2.5; items 28, 30; repair round 1: V-MAB-01, VK-04, VK-21; repair round 2: V-MAB1-01, V-MAB1-12). |
| J-A28.23 | Chose to read the owner's last sentence — "the more rooms for more occupying families the richer a building gets" — on the building, as its capacity, and to state one integer capacity function in §2.6 (the smaller of the template row's `households.max` at the plot's `builtBand` and the storeys' exact twice-area less the circulation share over the smallest unit form's minimum area) that the generation fill (S10b's placement, written by S11 once the building's wings exist, since the capacity reads their extents and S10b runs before them), `relet` and F-PLAN all read, over reading the sentence on the occupants or letting each path compute its own bound, because read on the occupants the sentence contradicts the same message's first clause ("more prosperity means a larger home for a smaller family"), while read on the building it is exactly the shell's rooms to let, rising with the band it was built for; and one function in exact integers is the only way the solver and the plan agree on every host (§2.6; item 28 (f); with the pipeline's J-A28.44; repair round 2: V-MAB1-03). |
| J-A28.26 | Chose the canonical chain as the re-cut's definition — the plan for a band row and a household count derived from the as-built plan by least-disruption steps in one fixed order, the rows first (one band at a time, the count clamped into each row's range) and then the households (one at a time) — with what stays stated once in the forms the kernel's transient arena takes (the shell — each storey's seed rings: the wings' extents clipped to tile, the span ring at the ground storey, the basement ring below it — opened again unchanged as the arena's seeds; the entrances and the hearths as anchors placed before any cut; the stair core's bay, the chimney stacks, the passage room, the composer's rooms and the kept rooms as `fixed` rings), the kept-room rule read on the seed ring the room lies in as the arena clips it, and a stored plan re-cut inside its changing event with the shell's identity across it read on rings stripped of the `composition`-role vertices its new walls add, over the cached result at click time or households-first, over a fixed list that passed seeds and vertices as `fixed` rings, and over a kept-room rule read on the wing's unclipped ring, because a chain from committed state makes the plan a function of its inputs alone (§6.2, §6.5 (9)) and returns the as-built plan exactly when the households are re-united; rows first lets each household step happen with the final unit form, so the interior degrades before it multiplies, which is cheaper and what real subdivision did; a wing ring or a basement ring passed as a `fixed` ring would be one uncut face and an entrance is a vertex, not a ring (§3.4's contract); after item 18 changes an earlier overlapping wing a later wing's clipped seed moves although its ring does not, so a room kept by its wing ring would be refused by the arena (`overlap`); and J-P48 (1) makes every new wall end on an exterior wall a footprint vertex in the same event — a split that moves nothing — so the shell's byte-identity bars read the shell without those vertices, as §7.3 item 7 (ii) does (§2.6; item 28 (f); with J-A28.71 amended and the kernel's J-A28.33; repair round 2: V-MAB1-06, V-MAB1-08, V-MAB1-09, VK1-03). |
| J-A28.29 | Chose to state once who occupies a building and at which band — the housed are `Building.households` (with a workplace's live-in `dwelling`), the people who work there are §10's `Posting` records, and the undefined `Building.occupants` list is retired; the occupants' band and value are the plot's current prosperity field sample banded by §4.5's rule, which is the context vector's at the plot's derivation and follows the field after it without re-deriving the plot, its hysteresis read against the plot's own persisted band memory, `Plot.fieldBand` — set by every derivation that reads the current field and re-banded after S6 at every epoch, in the model digest; and `ClassRules.pick` takes the field band and the manifested band as explicit inputs — over a third list of people on the building, an interior read from the context vector as it stood at derivation, a hysteresis read against `DerivationRecord.band`, or a `pick` left to find a manifested band its arguments cannot give, because people are derived and never materialised (§10.3); an epoch moves the field without re-deriving plots (item 31), so a band frozen at derivation would leave interiors behind their occupants, and a memory only a derivation rewrites lets a value that fell past a cut and came part of the way back return the old band without re-crossing the cut — a value oscillating about the cut would flip the band and re-cut a stored plan at every epoch (J-A28.72), against §4.5's rule that a band is kept until its value crosses a cut by more than the hysteresis; and the manifested band needs `builtBand` and `FieldBands.middle`, which the context vector does not carry (§2.6, §2.5, §2.8; items 28 (f), 19, 31; repair round 1: V-MAB-22, V-MAB-23, V-MAB-32; repair round 2: V-MAB1-05). |
| J-A29.25 | Chose to place a stair core that serves the basement on a bay inside `Basement.ring` as well as inside its wing's seed at every storey it serves — the placement's candidates filtered by exact containment — and, where no candidate fits, to stop the core at the ground storey and join the basement by a core of kind `trapdoor` inside the ring, reported, the plan writing no building record, over letting the core's bay cross the basement ring or re-deriving the basement to fit the core, because the kernel's transient arena refuses a `fixed` ring that does not lie inside one seed ring (§3.4), the basement ring is inset from the ground storey's wings by the class row's `cellar.insetCm` while the row's stair placement often puts the core against an exterior wall, and a click must change no digest (§6.2), so the building's `Basement` record stays as derived and only the plan adapts; a trapdoor is the plain historic way into a small cellar, so the fallback still reads as a real house (§2.6; items 28, 29; repair round 2: VK1-04). |
| J-A20.22 | Chose that `Identity.dossier` is carried by the entity the dossier element is — its `Use`, for a dossier institution its `Institution` record, and for an element that is neither (a named feature: a bridge, a well, a gate) the feature the assignment placed — and moves with it on every re-placement, never by the building or the plot that houses a use, a `building`-granularity assignment's placed member included, over carrying it on the assignment's placed member whatever its kind, because a use relocates while its building stays (item 17: a `rejectSite` moves the use and leaves the building, vacant or re-let, at its address), so a building carrying the dossier fact would keep claiming an element that has left it, and a `building`-granularity assignment — the commonest dossier element — places a building (§2.8; item 20; repair round 1: VD-36; repair round 2: VD1-17). |
=== END ===
