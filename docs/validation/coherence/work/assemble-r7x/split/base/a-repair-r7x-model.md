=== REPLACE ### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records ===
### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records

```ts
type BarrierKind = 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte';   // J-VI.3: the barrier vocabulary of a closure arc — `sheer` an island's rim (V05 §3.21), `enceinte` an earlier ring closing a later one (g item 106 (f)); V11's `walls.barriers` rows are defensibility classes keyed by these kinds
interface Enceinte { id: Id; kind: 'citadel'|'inner'|'outer'|'suburb'|'bailey'|'palisade'|'earthwork';
  trace: ChainRef /* ('wall', id): the L1 wall chain — a ring, an open chain, or, under a barrier closure, the open stretches that wall the approachable arcs */;
  closure: 'ring'|'shore'|'barrier' /* 'shore': an open chain whose enclosure is closed by the L0 shoreline; 'barrier' (g item 106 (a)): open stretches whose enclosure is closed by natural barrier edges — a shoreline, a cliff or escarpment, a gorge or ravine, deep marsh, an island's rim, an earlier ring — for every "enclosed" and "sealed" test */;
  anchors?: { end: number /* stretch k's ends are 2k and 2k + 1, in trace order */; on: 'shore'|'bank'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte'; vertex: VertexRef /* ('anchor', enceinte id, end) */ }[] /* typed end anchors of the open stretches, a tower at each (§4.8) */;
  arcs?: { from: number; to: number /* the two anchor ends it joins */; barrier: BarrierKind }[] /* g item 106 (a): the closing arcs of a 'shore' or 'barrier' closure, in trace order — written with the anchors by S5a's classification (§4.4) and re-evaluated by a shoreline change by item 22's least disruption; read by the enclosed and sealed tests, volume 1's seam typing (V01 §3.11 (7)), §11.1's `closure` LineStrings, V09's preview and the clerk */;
  waterfront: 'open'|'quay_wall'|'sea_wall' /* 'open': no wall along quays and beaches (MFCG's default; FTG's captured open chain); 'quay_wall': a wall along the waterfront, with sea gates; 'sea_wall': a full wall — open by default; `quay_wall` where the dossier's threats come by sea or on a sea-exposed port above a table size (§7.7 DR2; g item 106 (d)); `sea_wall` only by preset or request; the preset row overrides; where the water gates stand is §4.4 S5a's */;
  placement: 'aroundAll'|'aroundStage' /* aroundStage walls only a stage's new ring, anchored on the previous enceinte (FTG's "around stage lots") */;
  strips: { inner: FaceRef; outer: FaceRef } /* the two L1 wall-strip faces S7 cuts off beside the trace (§4.8): inside, band + inner setback (bounded by the setback line or the
                                                intervallum); outside, band + outer setback + glacis, or the berm up to a moat; S8 never cuts them and lanes end on them (§4.6) */;
  band: { inner: FaceRef; outer: FaceRef } /* L3 half-bands on each side of the L1 wall chain, built by bandUnion inside the strips by S10's step (0) (§4.7); nesting holds */; glacis?: { inner?: FaceRef; outer: FaceRef };
  thicknessCm: Cm; walkCm: Cm /* the wall-walk's width: written by S7 with the curtain's other values (§4.8); read by §11.1's glTF wall top */; heightCm: Cm /* the three are the full curtain's values; a graded stretch reads its class's row (stretchClass) */;
  stretchClass?: 'full'|'parapet' | ChainProfile<'full'|'parapet'> /* g item 106 (c): the stretch's defensibility grade — 'wall_class_knot' on the trace, step (§2.2 rule 5): the full curtain on open approaches, a lighter parapet on cliff tops, steep slopes and waterfronts; its thickness, height, walk and tower spacing are V11's `walls.barriers` row for the class, the enceinte's own values the 'full' row's; absent: 'full' throughout, today's uniform wall */;
  base: ChainProfile /* 'base_knot' on the trace: the wall's base elevation, one knot per trace vertex S7 places, linear between (§2.2 rule 5) */; setbackCm: { inner: Cm; outer: Cm } /* both faces unbuildable (below) */;
  intervallum?: Id /* the lane inside the wall when the era row asks for it */; material: string;
  supersededBy?: Id /* item 8: the shorter inner ring that replaced this one (§4.11's contractWall); the old ring's record stays live and its line persists as a trace */;
  pathway?: { since: number /* the week it was superseded or neglected */; cause: 'superseded'|'neglected'|'contracted'; fate: 'road'|'absorb'|'keep'; eligibleWeek: number; source: 'engine'|'edit' } /* a ring's road out of use — written by volume 6's fortification phase and by setAttr; the rules are V06 §2.7, V06 §3.7 */;
  underuseSince?: number /* the week the ring's intramural occupied-plot share first fell below V11's contract.occupiedShareMax; cleared when it rises above it; written by volume 6's fortification phase only (V06 §3.7.4) */;
  condition?: WallCondition | ChainProfile<WallCondition> /* the wall's condition by run — a stretch-state profile (§2.2 rule 5) on 'wall_state_knot'; absent: 'standing' throughout (below) */;
  conditionMaterial?: string | ChainProfile<string> /* g item 114 (b): each run's material — 'robust' (the wall's own `material`) or the key (`wallKind/id`) of the V11 `walls.patchMaterials` row it was closed with (V11 §3.25.3) — a stretch-state profile on 'wall_material_knot'; absent: 'robust' throughout (below) */;
  conditionEpoch?: number | ChainProfile<number> /* g item 114 (b): the epoch of each run's last change of condition or material (an EpochRecord's epoch, numbered by §6.1; 0 the original town) — a stretch-state profile on 'wall_epoch_knot'; absent: 0 throughout (below) */;
  laidAt?: Order | ChainProfile<Order> /* each run's order: the step that fixed its line (§2.7's laws' *Order*: a stage's trace by the step that picked its boundary — S3 (6) for stage 1, which S5a commits for k = 1, stage k's S5a boundary —, a castle's walls by its claim, S3 (8) or a stage citadel's trace batch) — a stretch-state profile on the trace (§2.2 rule 5) on 'wall_order_knot', written by every op that lays or re-traces a run (S3 (9), S5a, VS3, S7's run re-trace, V06 §3.7's circuits, contractions and re-anchored stretches, S1's water operator's and a carve's re-trace, §7.3's S7 operator for every hand stroke) and kept by every other; a stretch an op moves keeps its former order at each crossing it had before the op and still has, and an undo or a redo restores or re-applies its target's (§2.7's laws' *Order*) */;
  gates: Id[]; towers: Id[]; moat?: Id /* the wet moat WaterBody along the trace, named as `Castle.moat` is: carved at S3 for the innermost enceinte, by S5a's carve for an outer one (§4.2, §4.4); a dry ditch is residue, never this field (§4.7 S10 (0), §4.8) */; stage: number; lifecycle: Lifecycle }
type WallCondition = 'standing'|'worn'|'patched'|'breached'|'dismantled';   // g item 114 (b): the condition ladder of a run (below)
interface Gate { id: Id; enceinte: Id; junction: Id; way: Id | null /* null: a postern or water gate without an outward way */;
  kind: 'main'|'postern'|'water'|'gatehouse'|'castle'; heights: Heights; footprint: { inner: FaceRef; outer: FaceRef }; plaza?: FaceRef;
  banks?: [VertexRef, VertexRef] /* a water gate: ('gate_end', gate id, 0 | 1), its two bank vertices on the trace; the wall's edge between them lies across the water (§2.2 rule 7); held under a warp unless fromLevel = 0, as a Bridge's deck ends are (§3.6) */;
  mouth?: true /* g item 106 (e): a walled port's harbour-mouth chain — a `water` gate across the harbour entrance, its banks the two mole or breakwater heads (or the shores), a tower at each; S7 furniture (§4.8), drawn raised or lowered by the era row (§8.2) */; lifecycle: Lifecycle }
interface Tower { id: Id; enceinte: Id; vertex: VertexRef /* ('tower', id) */; radiusCm: Cm; heights: Heights; kind: 'round'|'square'|'bastion'|'octagonal'; footprint: { inner: FaceRef; outer: FaceRef }; lifecycle: Lifecycle }   // a wall tower; a composition's tower is §2.6's ComposedTower
interface Castle { id: Id; plot: Id; reservation: Id; curtain: Id /* its own Enceinte, kind 'bailey', closed by the same closure kinds (g item 106 (f)) */; cityWeld?: [VertexRef, VertexRef] /* ('weld', castle id, 0 | 1): ends of the shared wall stretch (one edge carrying both enceintes' 'wall' roles) when on the enceinte */;
  keep: Id; keepShape: 'rect'|'square'|'octagon'|'round'|'cruciform'; keepAt: 'opposite_gate'|'highest'|'centre'; innerWard?: FaceRef; gatehouse: Id /* one town-side gate, sited at S3 on the bailey side facing the plaza by least cost (§4.2 S3) */;
  paths: Id[] /* keep ↔ gate ↔ wall stairs, 'path' ways inside the bailey */; bailey: FaceRef; moat?: Id /* the castle moat WaterBody */;
  surround: 'none'|'esplanade'|'park'|'plaza'|'cliff' /* the surround row (§4.8): esplanade, park with a perimeter path, plaza, cliff skirt; a moat is the separate `moat` field */; siteScore: number; template: string; lifecycle: Lifecycle }
interface Bridge { id: Id; state: 'site' | 'built' /* site: two pinned bank vertices, no span, no way, no furniture, not drawn; built: a way's span laid through them */;
  way: Id | null /* the way whose L1 edge between the two deck ends is the span; null while a site */;
  deck: [VertexRef, VertexRef] /* ('deck_end', bridge id, 0 | 1): the pinned bank-to-bank deck, perpendicular to the local flow or channel; once built, its span carries the structural `deck` role (§2.2 rule 7); held under a warp unless fromLevel = 0 (§3.6) */;
  over: 'river'|'moat'|'castle_moat'|'canal'|'carve'|'added' /* who emitted the deck: S1, S3, S5a, a carve edit, or the one L0 shore-split batch of a deck no site offered on standing water (§4.2 S1 (5)); a deck F-ROUTE's extra-bridge rung sites inside S1's water operator or a carve takes the value of that operator's other decks */;
  spanCm: Cm; deckCm?: Cm; kind?: 'stone'|'timber'|'draw'|'ford'; piers?: number /* deckCm, kind and piers are set by S7 when the bridge is built (§4.8) */; lifecycle: Lifecycle }
interface RaisedWayRecord {   // g item 110 (b): on Way.raised (§2.4) — a way on a ground arena part ≥ 1 (§2.1), one record for every volume
  kind: RaisedKind; reason?: RaisedReasonKey /* generated ways only (below); the reason WORD readers and exports show is derived: viaduct → 'drop', elevated → 'link', aqueduct → 'water' (J-VI.2) */;
  underuseSince?: number /* written by volume 6's pass (V06 §3.19) */;
  feet: [RaisedFoot, RaisedFoot] /* the deck's two ends in spine order — where its ramps or stairs meet ground part 0, or a deck end on the arena's outer ring (RaisedFoot, below; §3.4) */;
  supports: { key: number /* minted once in order along the deck, never reused: a pier's identity with its way's lineage */; ring: Polygon /* its footprint on ground part 0, a point attribute (§2.2 rule 5) */; state?: 'ruined'|'cleared' /* V06's decline (V06 §3.19.2; the DeclineOp raised members, §4.11) */ }[];
  spans: { a: number; b: number /* the bounding piers' keys, a before b along the deck */; use: 'open'|'vault'; reason: 'way'|'water'|'flood'|'clear'|'tall'|'low'|'slope'|'country'|'chance'|'cap'|'land'|'user' /* the span rule's step (below) */;
    soffitCm: Cm /* derived: the deck's level at the span's crown less `raisedWays.structure.span.deckDepthCm` */; held?: true /* a user's setAttr on spans/<a>-<b>/use: an input override every regeneration keeps (§7.2) */; state?: 'ruined'|'cleared' }[];
  terminal?: { kind: 'basin'|'cistern'|'fountain' /* 'cistern' only under a conduit house the roster or dossier holds (J-VI.9) */; at: PointCm; building?: Id /* its conduit house */ } /* an aqueduct's */;
  feeds?: Id[] /* an aqueduct's: the public fountains it supplies */;
  waterUse?: Id /* an aqueduct's terminal use when a dossier-bound conduit house took it (V08 §2.6b (1) (e)): the use's closure leaves the aqueduct dry and disused, its ruin ruins the arches by least disruption, its infrastructure impairment applies the condition steps; removing the use never removes the aqueduct */;
  clearanceCm?: Cm /* held once a user edits it (V09); absent: derived (below) */; spanSpacingCm?: Cm /* held once edited; absent: drawn (below) */;
  courseAt?: Order | ChainProfile<Order> /* the order of the step that fixed the course of each stretch of the deck's centre-line (§2.7's laws' *Order*) — a stretch-state profile on its spine (§2.2 rule 5) on 'deck_order_knot', written by the op that fixes or moves the course (S3 (7) for S3 (5)'s gate routes' raised stretches, S4, S5b, S6's end, V06 §3.19's founding, a declaration, a re-shape, a warp, a `revert`, an extension bent past a bound) and kept by every other; a stretch an op moves keeps its former order at each crossing it had before the op and still has, and an undo or a redo restores or re-applies its target's (§2.7's laws' *Order*) */ }
type RaisedKind = 'viaduct'|'elevated'|'aqueduct';   // a raised way's kind and the reason vocabulary item 110 (f) records (drop, link, water need); declared here — V06 §2.13 and V11 §2.8c cite it
type Order = { seq: number /* the laying event's place in §2.7's laws' order: a creation prefix's declarations, then a generation run's stages, then each later event (a regeneration's stages at its own event's place, after every structure it keeps: §2.7's laws' *Newer*) */; step: number /* its step's place in the order the event runs its steps — at generation, a regeneration and an epoch's new walled stage each stage's S5 steps its own, after the stage before's (§2.7's laws' *Order*); 0 by hand */ }
  // `Enceinte.laidAt` and `RaisedWayRecord.courseAt` are record fields outside the model digest and inside the records digest (§6.2), as a `DerivationRecord` is — so a line a regeneration lays again where it stood, or a declaration a skeleton's import moves into the creation prefix, re-dates its `seq` without moving the model digest —, restored by an undo record as every field is, and written on an older document by its upgrade (§7.5) from the last event in its log that fixed or moved each run's line and each deck stretch (§2.7's laws' *Order*: a re-trace, a re-shape, a warp, a `revert` or a bent extension, else the record's creation), so none is absent on a current document; §5.3's law-1 row reads them.
interface RaisedReasonKey { kind: RaisedKind; a: Id; b?: Id }   // a generated raised way's reason and its derivation unit (§4.3); declared here, V06 §2.13 cites it
  // viaduct: a = the carried way's lineage, b = the crossed ravine or valley feature (the terrain's lineage and the feature's ordinal in Terrain.features);
  // elevated: a, b = its two endpoints' lineages (a high ward's district, a terrace district, the citadel's or a great temple's reservation), in address order;
  // aqueduct: a = the settlement root, b = the source (a spring as S1 records it, or a river WaterBody's lineage).
  // Address: 'raisedReason:' + hash64(kind, a, b) (§6.3).
interface RaisedFoot {   // foot i of a raised way: one vertex in each of the two parts it joins, as an UndergroundLink's ends (§3.4)
  ground: { part: 0; at: VertexRef /* ('raised_foot', way id, i) on ground part 0: where the ramp or stair meets the ground; at a deck end on the arena's outer ring, that ring point (below) */ };
  deck: { part: number /* the way's own part, its Identity.key.part */; at: VertexRef /* ('raised_foot', way id, i): the spine's end on that part */ } }
  // placed by the raised-way generator and by a declared or drawn way's operator, each end by a transaction on its own part; re-placed by the way's
  // re-derivation, one transaction per part (§3.4), a ring-end foot's ground end moved first by a frame growth's foot batch (§3.2 (9); below); read by the
  // support step and the span rule (the deck runs between the feet), §4.6's ramp-or-stair rule at each end, §3.4's resolve and §3.10's stored-reference and
  // arena-isolation rows; persisted as the two parts' role rows; undone with the event that placed them; a raised way carries them from its first commit
  // (item 110 (b)), so no document holds one without them.
  // At a deck end on the arena's outer ring — an aqueduct sourced beyond the frame, a declared course bent to the ring (*At the frame*, below) — foot i is
  // that ring point: its ground end a `raised_foot` vertex placed by `splitThrough` on ground part 0's `margin` chain at the deck's end point, its deck end
  // the spine's end on the part's own `margin` ring; no ramp or stair is drawn there. A frame growth (§3.2 (9)) first moves the foot's ground end onto the new
  // ring (its foot batch, between part 0's two L0 batches), then extends the deck to the new ring as §4.11 continues a through-road (the old deck's stations
  // kept and its end span's condition carried, the support step's (7)), the raised way's re-derivation re-placing both ends of that foot on the new rings, one
  // transaction per part (§3.4)
interface RetainingWall {   // g item 110 (a): one record for every volume — never an Enceinte: no gate, no circuit, no barrier closure
  id: Id; chain: ChainRef /* on the arena whose terrain it levels — the ground's, or a sky island's (V05 §3.22 (4)) */;
  highSide: 'left'|'right' /* resolved at the dry run when drawn without it; generated: the side the district holds (§4.7 S10's district-edge source) */;
  closed: boolean /* a platform, high side inside */; material: string /* a V11 MaterialRow key: dry stone, earth bank, timber crib … */;
  buttresses?: …; towers?: … /* decorative, a V11 table row */; source: 'generated'|'declared';
  state?: RetainingState | ChainProfile<RetainingState> /* a stretch-state profile (§2.2 rule 5) on 'retaining_state_knot'; absent: 'standing' throughout */; lifecycle: Lifecycle }
type RetainingState = 'standing'|'decayed'|'ruined';
declare function stepProfile(wall: RetainingWall): { atCm: Cm; stepCm: Cm }[];   // a derived view, never stored (V01 §2.3): computed on read from the committed levels on each side — levelledGroundCm for ground (§4.7), a way's level where a way bounds it — read by §8's shadow, §11.1's exports and the VTT threshold, volume 4's buried floor, §2.6's walk-out and basementDoor(b)
type InstanceOverride = { seq: number /* the instance event */; at?: PointCm /* the current position of a move's `to` or an add's `point` */; recorded?: PointCm /* a line layout's recorded generated point */ };   // the uniform instance-override field: written when the instance event applies, moved only by a warp or vertex move (§7.4); model data, hashed with the entity; every kind that carries an `instances` mark has it (§2.8's registry)
interface Greenery { id: Id; kind: 'park'|'garden'|'formal_garden'|'orchard'|'green'|'commons'|'avenue'|'street_trees'|'churchyard'|'market_green'|'esplanade'|'grove'
    |'wood'|'coppice'|'meadow'|'hedgerow'|'shore_band'|'ambient'|'yard_planting';
  face?: FaceRef; line?: ChainRef /* ('green_line', id): hedgerows, a role on L3 field boundaries */;
  along?: { way?: Id /* absent only for the rim walk's row, whose trees run along the rim strip's inner setback line (V01 §3.10.3) */; strip: FaceRef /* one half-corridor strip on the planting district's own side, or the rim strip */; offsetCm: Cm } /* avenues and street trees: a row derived along the strip; no plat edge (§4.9) */;
  fedBy?: Id /* item 111: an oasis grove's spring-fed WaterBody (§2.3) */;
  owner?: Id | 'commons'; rule: string; density: number;
  species: { kind: string; inner: number; outer: number; leafType?: 'deciduous'|'evergreen' /* read by §8.2's season rows; deciduous when absent */ }[] /* shares per species kind (§4.9) */;
  layout?: 'fan'|'semi_fan'|'grid'|'free' /* parks and groves, §4.9 */; paths?: FaceRef /* L3 path faces of a park layout (§4.9) */;
  overrides?: InstanceOverride[]; lifecycle: Lifecycle }
  // tree instances are generated at render and never stored (§8.1, §8.10); overrides are `instance` events (§7.1) whose current positions `overrides` holds (§7.4)
interface LandUse { id: Id; kind: 'arable'|'strip_field'|'meadow'|'pasture'|'commons'|'orchard'|'vineyard'|'coppice'|'wildwood'|'quarry'|'claypit'|'mine'|'lumber'|'fishery'|'saltpan'|'marsh'|'reserve'|'garden' /* item 111: an oasis's irrigated garden */;
  face: FaceRef /* L3 faces — inside the hinterland's blocks: furlongs and woods (§4.9; the outside plots are Plot records) — and wherever a reclaim or a course shift leaves land, in the town too (§2.3) */; owner?: Id; furrowAxisCdeg?: number; crop?: string /* from the era / region crop table */; livestock?: string; rotation?: { scheme: string; slot: number };
  reclaimed?: { from: 'marsh'|'foreshore'; epoch: number } /* item 25: ground won from water by a reclaim conversion (§2.3, §4.11) — a trace the style sheet may draw */;
  source?: Id /* a `fallen_island` decoration whose rubble this `quarry` works (V05 §3.16): a surface rubble working that sources no underground quarry system, no mine–cavern breach and no dig-down draw (II.7.6) */;
  fedBy?: Id /* item 111: a garden's spring-fed WaterBody (§2.3) */; lifecycle: Lifecycle }
interface SiteResources { cellCm: Cm; ore: Float32Array; stone: Float32Array; timber: Float32Array; fish: Float32Array; clay: Float32Array; fertile: Float32Array;
  wellYield: Float32Array /* item 111 (b): the well yield, from the ground class by V11's water table — written by S1 (10) with the other rasters; read by S3's water pull (§4.2 S3 (6)), §4.5's water term, S10b's well and public-fountain classes (§4.7 *Water in dry country*) and the decoration rows' well or pump (§4.7); absent in an older document: computed from the site's terrain and ground class by S1 (10)'s rule when first read */ }   // S1 output on the terrain grid, 0..1 per cell (§4.2)
interface Decoration { id: Id; kind: string /* pond, copse, stone circle, ruin, wayside shrine, boundary stone, gallows hill, fallen_island (V05 §3.16), … data-defined */; face?: FaceRef; point?: Point /* moves with its host face under a warp or a vertex move (§7.4) */;
  trail?: FaceRef /* the L3 path face to the nearest way corridor (§4.9) */; keepClearCm: Cm; rule: string;
  members?: DecorationMember[] /* what a fallen island covers, drawn with the ruin program (V05 §3.16 (5)); volume 6's clearance writes it, volume 4's closures read it */; source?: Id /* the fallen island */; name?: NameRef; lifecycle: Lifecycle }
type DecorationMember = Id /* a plot, land use, reservation, way or retaining wall */ | { raised: Id; span: [number, number] /* the span between two support keys (RaisedWayRecord's a and b) */ } | { raised: Id; support: number /* a support key */ };
  // a raised member's keys are minted once and never reused, so a member names the same pier or span for its raised way's whole lineage — never volume 6's batch-local SpanRef; its geometry is resolved at read through the raised way's record: a span's deck band in plan, a support's ring
interface Pin { id: Id; kind: 'well'|'fountain'|'large_tree'|'cross'|'market_cross'|'shrine'|'pump'|'gallows'|'statue'|'monument'|'bandstand'|'campfire'|'fire_pit'|'stall'|'trough'|'lamp'|'notice' /* item 82: a notice post, a landmark a named-feature claim may name (§7.7) */|'stocks'|'maypole' /* (V07 §3.10) */;
    point: Point /* moves with its host face under a warp or a vertex move (§7.4) */; host: Id /* the yard, square, corridor or plot face */;
    light?: Id /* item 68: an emitting pin's LightSource (lamp, campfire, fire_pit; §4.7's Light sources) */; rule: string; lifecycle: Lifecycle }   // in the entity registry (§2.8) from M1; placed by §4.7 S11 / §4.9 rules and by stage 2 (II.3)
interface HoodPlace {   // a named local place (V01 §3.7.1) — declared with its registry row at M1, no producer before M5 (volume 1's creation and naming passes)
  id: Id; kind: 'square'|'green'|'yard'|'court'|'opening';
  subtype?: 'sinkhole'|'mouth'|'collapsed_shaft'|'ruin_entrance'|'catacomb' /* 'opening' only: a public opening's AccessPoint kind, or 'catacomb' for a catacomb entrance — selected by the host's record fields, never by its kind alone */;
  host: Id /* the Block (the square, green or yard block itself, or the block whose court residue it names — never a footprint's court, which is only its building's yard part); for 'opening', the AccessPoint */;
  courtOrdinal?: number /* 'court' only: the court's ordinal among the block's court residues (§4.7 S10 (6)) */; name?: NameRef /* absent between the creation pass and the naming pass of S13a; a catacomb opening reads its catacomb's name and holds none of its own */;
  knownTo: 'public'|'local'|'secret' /* default by V01's `hood.placeKnowledge`; an opening's is its AccessPoint's; a dossier fact or a setAttr otherwise */; lifecycle: Lifecycle }
// Labels are the model records LabelEntity and QuarterNode of §9.1
interface Institution { id: Id; kind: string; plots: Id[]; buildings: Id[]; faction?: Id /* the module's materialised Faction, when it exists (§10.1) */; roster: RosterRef; name: NameRef; reservation?: Id;
  knownTo?: 'public'|'local'|'secret' /* item 30: a dossier fact (§7.7) or an edit, defaulting from its plots' exposure; a local or secret institution prefers hidden plots (§4.7 S10b) and, underground, a cellar stair (II.7.3) */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: the dossier's fact, or the mode its concealed use resolved (§4.7's Concealed institutions (1)); absent: none */;
  powers?: { power: string /* a PowerStanding key (§7.7 layer 2) */; weight: number }[] /* item 79: the powers it answers to, weights Σ = 1 (below) */; lifecycle: Lifecycle }
interface Use { id: Id /* the address: moves with the use when it relocates (§6.3); a building keeps its own */; cls: BuildingClass /* the roster class it is (§2.6) */;
  specialisation?: string /* the designation template's discrete row at the band (§4.7 S11, item 19), or a culture specialisation of V11 §3.24.3 drawn once at the use's first building (item 110 (c)) and held once set */;
  plot: Id; buildings: Id[] /* the building(s) it occupies — several for a compound or a joined plot */; assignment?: AssignmentRef; owner?: Id /* household | business | institution */; pinned: boolean /* item 17 (d): stays under an epoch, the town adapts around it (§7.7) */;
  branchOf?: Id /* g item 105 (h): a split site's shop — the works' Use it is a branch of: one institution, one dossier binding, two buildings; written by S10b's split placement (§4.7), which creates both as one item; a state, closure or removal of the institution reaches both (item 14's spread), relocation moves each by its own rows, undo restores both, a merge back onto one plot clears it; read by V02 §3.14.3 (the split.shop family), V03 §3.2 (the half's programme), the reader and the exports; absent: no split (migration) */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: a concealed use's mode, resolved when it is first placed (§4.7's Concealed institutions (1)) and re-resolved only when a dossier event withdraws the dossier's mode (concealmentSource, next); absent: none, an open use */;
  concealmentSource?: 'assignment'|'class'|'edit' /* the map-side origin of a mode the dossier did not set — written with the mode by §4.7's placement rule (Concealed institutions (1)) and by setAttr(concealment) (`edit`); absent while the dossier sets it. A dossier event that sets the mode clears it (an `edit` it displaces is reported and orphaned, §7.7 item 5; J-A20.73); one that withdraws the dossier's mode re-resolves it from the map-side sources and re-places the use by §4.7's Concealed institutions (1), writing their source here (J-A63.22). Whether the mode is a dossier fact is factTier's (§2.8); a mode the dossier set is dossier-owned, so a map setAttr of it is refused (§7.7 items 7, 11; J-A20.77, J-A63.22). Read by §11.2's `why` on the use's `concealment`, under the caller's key */;
  front?: Id /* item 63: the front's Use — the working business whose building (Building.use) it hides in; absent for a bare hidden or underground use */; knownTo?: 'public'|'local'|'secret' /* item 63: a concealed use's own knowledge, 'secret' by default; absent on an open use, which the reader reads through its building and institution (§9.2) */;
  opened: { epoch: number; seq: number }; closed?: { epoch: number; seq: number };
  strain?: { kind: 'demand'|'supply'; sinceWeek: number /* the epoch week the condition began */ } /* file f item 429: the use step's memory (V06 §3.9.2) — set by §4.11's use step when the class's demand ratio falls below its closing share (`demand`) or a hard supply edge fails (`supply`), its kind updated and `sinceWeek` kept when the other condition takes over, cleared when neither holds, each write a setAttr inside the epoch (so its undo is the epoch's); a user's setAttr clears it ("give this shop time"); read by the use step's close rule (closeAfterYears or starveAfterYears of §10.2's UseRuleRow, V06 §3.9.3), the surplus order (V06 §3.9.4), volume 6's `use` explainer (V06 §4.5) and the CSV and GeoJSON exports (`plat:strain`); model data in the use's leaf digest; absent: no strain */;
  lifecycle: Lifecycle }   // item 17: a use is separate from the building that houses it — it opens, closes and relocates (§4.11's use step; §7.1's openUse / closeUse / relocateUse) while the building persists, vacant or re-let; Building.use points at it (§2.6)
interface MaterialLedger { rows: { epoch: number; material: string; m3: number; from: Id /* the robbed, cleared, dismantled or demolished entity */; to?: Id /* the build or repair it fed */ }[] }   // item 8 (d): one per document, changed only by §4.11's salvage events, so inside the model digest; its only effect on the map is to weight clearance toward nearby building (§4.11)
interface Household { id: Id /* the address: stable across re-derivation of its plot (§6.3); people are keyed by it */; plot: Id; building: Id /* its dwelling unit is the rooms of that building's plan carrying its id (Room.unit, §2.6; item 28 (f)); its interior is cut for the plot's field band, not for `wealth` (J-A28.24) */; members: number /* size; people derived lazily */; wealth: number; tableVersion: string /* the person tables its people derive under: those current at the household's creation, advanced by a `regenerate` of scope `people` (§10.3's re-derive people; §7.4) */;
  transit?: { cause: DisplaceCause; since: number /* the week it was displaced */ } /* file f item 335: epoch-local — written by the batch of an epoch event that displaces the household (the ledger's `displace`, V06 §2.1), cleared by the `relocate` that places it (V06 §3.8.1), never present after the epoch's last batch, so never in a snapshot, a saved model or an export; read by the epoch's siting (V06 §3.8.1), the runner's close (V06 §2.1: the ledger's pool empty at the epoch's end, T-V6-52) and §5.3's Works row */;
  lifecycle: Lifecycle }
type DisplaceCause = 'fire'|'flood'|'topple'|'contraction'|'works'|'island'|'void'|'clearance'|'redevelopment'|'destruction';   // why an epoch's op emptied a household's dwelling without housing it — 'destruction' the history replay's destruction epoch (V06 §3.20.5 (2)); declared here, V06 §2.1's ledger cites it
interface Person { id: Id; key: { household: Id; ordinal: number; bornEpoch: number; bornWeek?: number /* a successor's birth week — its predecessor's death week (§10.3; V06 §3.14), its bornEpoch then held as 0; absent on a founding member */ }; status: 'worker'|'unemployed'|'retired'|'student'|'dependent';
  role: string; workplace?: Id; carer?: Id /* dependent → the person whose schedule it follows */; derived: true; pinned?: Partial<PersonFields> /* only by an explicit edit — or, for a dossier-backed notable (item 88; below), pinned whole by the port */; lifecycle: Lifecycle }
type PersonFields = Omit<Person, 'id'|'key'|'derived'|'pinned'|'lifecycle'>;   // the person's pinnable fields
interface Faction { id: Id; kind: 'guild'|'religion'|'lordship'|'company'|'criminal'|'council'|'military'|'arcane' /* item 79: military and arcane for the dossier's power categories (the port's category-and-name rows, §7.7 layer 2) */; seats: Id[]; turf?: Id[];
  influence: number /* the module's reading of its power's standing (§10.3; the base's standings are §7.7's PowerStanding) */; secret: boolean /* a hidden power keeps its kind and sets it (below) */;
  goals: { id: string; method: string; progress: number }[]; roles: { name: string; criteria: string; count: number }[]; template: string; lifecycle: Lifecycle }
interface Government { kind: 'crown'|'seigneurial'|'ecclesiastical'|'chartered_commune'|'merchant_oligarchy'; seat: Id /* the institution */; offices: { name: string; seatClass: string; count: number }[] }
interface Religion { id: Id; name: NameRef; deities: { name: NameRef; domain: string }[]; practiceShare: number; clergyPerThousand: number; temples: Id[]; faction: Id; lifecycle: Lifecycle }
// The relation store (FTG-9; when it is materialised and persisted: §10.1, §10.3)
interface FamilyUnit { id: Id; kind: 'couple'|'parents_children'|'single_parent'|'extended'; members: Id[]; households: Id[]; lifecycle: Lifecycle }
interface Relation { id: Id; a: Id; b: Id; kind: 'partner'|'parent'|'sibling'|'carer'|'friend'|'rival'|'business'|'religious'|'affair'; since: number; lifecycle: Lifecycle }
interface Membership { id: Id; person: Id; faction: Id; role: string; since: number; lifecycle: Lifecycle }
interface Posting { id: Id; workplace: Id; profession: string; filledBy?: Id; lifecycle: Lifecycle }
```

```ts
// The staged layers' records (II.6, II.7): schema-complete and empty in the base (§2.1); each built by its volume
// — the sky island (volume 5, M6-sky): `SkyIsland`, `UndersideProfile` and `ShadeBasis` are declared in @plat/model as V05 §2.1 gives
//   them, and `SkyAccess` as V05 §2.2 gives it (the rules are V05's); the base reads of them: SkyIsland.key (a sky part, §2.1), `slot` (the count law's
//   1–3), `rim: ChainRef` ('rim', island id) and `land: FaceRef` — the island arena's own ring, no stored position (§2.2 rule 5) —, `anchor`
//   (the one world translation of the island's local frame), `elevationCm` read as groundRefCm + altitudeCm, `state` ('floating'|'waning'|'settled'|
//   'fallen'|'removed'; II.6's lifecycle over epochs, §4.11), `shadeBasis` (the island as the field's shade last read it, written only by a shade
//   evaluation, in the model digest; read on load, §2.9), `removed` and `removedAccesses` (the suppression's island form, §2.8),
//   `supply` (item 10's S_town and S_carried), `districts`, `allocation`, `reason`, `institution`, `terrain`, `terrainEcho` and `lifecycle`; and
//   SkyAccess.top ('sky_access', access id), `ground.at` (a point attribute carried with its host, §7.4), `state` and `knownTo`
// — the sewer network and the underground's other systems (volume 4, M6-U; items 11, 12, 65; II.7): each in its own arena part (§2.1, §2.2 rule 1)
interface Tunnel { id: Id; kind: 'drain'|'main'|'culvert'|'passage' /* a walkable side passage of the network — not item 30's surface passage face (§2.5) */; centreline: ChainRef /* ('tunnel', id) in part 0 */;
  widthCm: Cm /* the bore; the corridor half-width is widthCm ÷ 2 + the profile row's wall thickness (II.7.2, §3.7) */; headroomCm: Cm /* II.7.2's profile row */; navigable: boolean /* derived from widthCm and headroomCm against II.7.2's thresholds when the tunnel is made or edited, and stored: what may carry underground plots (item 12) */;
  invert: ChainProfile /* 'invert_knot' on the centreline, below ground (§2.2 rule 5) */; depthOffsetCm?: Cm /* a hand offset added to the derived invert at every knot; absent 0; setAttr only */;
  follows?: Id /* way */; outfall?: Outfall /* §2.3; re-seated when its shore moves (II.7.2) */; serves: Id[] /* the plots drained, sorted by address; a plot's buildings drain through it */;
  chambers?: FaceRef /* a view: the wedges of its end junctions whose Junction.chamber is set, never stored separately */; name?: NameRef /* a trunk's or a culvert's name (S13a); a setAttr protects it (§2.8) */;
  grilles?: Cm[] /* a view, never stored: the stations along the centreline where the run crosses a wall_strip, a quay wall or a sea wall (item 106) */; rule: string;
  closure?: 'collapsed'|'sealed' /* item 11: how a ruined tunnel closed (§4.11's tunnel ladder) */; lifecycle: Lifecycle /* its condition — in use, neglected, caved in, collapsed, sealed — is a reading of existence and closure through II.6's condition table (whose open column says whether plots may front it, II.7.3), never a second stored state; a setAttr on the condition is the matching convert (§7.1; J-A11.21) */ }
interface UndergroundSystem { id: Id; kind: 'sewer'|'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug'|'ruin' /* one system per kind (II.7.6); dug: the private passages an access edit makes (item 66); ruin: item 109 (b)'s ruins of an older civilisation */;
  variant?: 'fissure' /* a cavern of ordinary rock at hilly or mountainous relief (item 109 (a) (2)) */; name?: NameRef /* its label's text (V04 §5.4) */;
  part: number /* its arena part (Identity.key.part): 0 for the sewer, the next unused at creation for the others (§2.1 Arena parts) */;
  sources: Id[] /* what explains it (II.7.6): the cemetery, churchyard or religious institution a catacomb lies under, the stone stock a quarry fed, the blocks or districts a `raiseGrade` buried (its `region`) or, at generation, the growth-stage-1 districts a `fire` or `flood` scar buried (J-A88.42), the building whose access edit dug a passage (`addUndergroundAccess`, item 66), the building of a subterranean dossier institution whose passage the connection stage dug, or the undercity neighbourhood's District whose lifeline closure dug one (§7.3 item 9 (d)) */;
  depthM: [number, number] /* its row's depth range below the ground datum */; rule: string; lifecycle: Lifecycle }   // part 0's margin role is the underground pseudo-district's (§2.2 rule 1)
interface Gallery { id: Id; system: Id; centreline: ChainRef /* ('gallery', id) in its system's part */; widthCm: Cm; wallCm: Cm /* the kerb at widthCm ÷ 2 + wallCm (§3.7) */; headroomCm: Cm; elevationCm: Cm /* its floor */;
  water?: true /* below the local water table: it carries water (II.7.6) */; walkway?: true /* an undercity's street (II.7.5) */; closure?: 'collapsed'|'sealed'|'flooded' /* how it closed, read through II.6's condition table */; knownTo?: 'public'|'local'|'secret';
  reusedBy?: { system: Id; since: number } /* an element another system adopted (item 109 (d)) */; rule: string; lifecycle: Lifecycle }
type ChamberKind = 'ossuary'|'hall'|'breakdown'|'workings'|'cistern'|'streetVault'|'bridgeVault'|'archVault'|'square'|'storey'|'market'|'cellar'|'storage'|'temple'|'court'|'tomb'|'vault'|'room'|'gate';   // ossuary (catacomb); hall, breakdown (cavern); workings (quarry); cistern, streetVault, bridgeVault, archVault — the walled-in arch of a raised way's span, at grade (vaults); square, storey (buried); market (the undercity's carved main chamber); cellar, storage (dug); temple, court, tomb, vault, room, gate (ruin; hall and cistern also serve a ruin) — V04 §2.2
interface Chamber { id: Id; system: Id; kind: ChamberKind; outline: ChainRef /* ('chamber_wall', id): its closed L1 chain */; floor: FaceRef /* L1 */; elevationCm: Cm /* its floor */; ceilingCm: Cm /* clear height above the floor: caps what stands in it (II.7.5) */;
  closure?: 'collapsed'|'sealed'|'flooded'; knownTo?: 'public'|'local'|'secret'; reusedBy?: { system: Id; since: number };
  span?: { raised: Id; a: number; b: number } /* an arch vault's span — the raised way and its two bounding piers' keys (II.7.6's Vaults) */;
  monument?: { host: 'temple'|'hall'|'tomb'; lay: TierLay; standing: number; moundCm: Cm; count?: number } /* a ruin chamber's stepped monument (item 110 (c)), laid by volume 2's layTiers and decayed from the top (V04 §3.5.0a) */; rule: string; lifecycle: Lifecycle }
interface TierLay { wings: LaidWing[] /* ST7's order */; stairs: 'axial' | 'flights' | 'internal' | 'none' /* the form laid */; aspect: number /* the laid tier-0 aspect (a rect stack) */; truncated: number; entrance: { wing: number; side: number } | null /* ST7's hint, by index */ }   // a stepped stack as volume 2's layTiers lays it (V02 §3.15.1); a ruin chamber's monument holds one; declared here, V02 §2.6 cites it
interface LaidWing { ring: PointCm[]; kind: 'rect' | 'polygon'; role: 'tier' | 'shrine' | 'stair'; on: number | null /* index in the lay's order */; solid: boolean; floors: number; eaveCm: Cm; ridgeCm: Cm; roof: RoofSpec }   // one wing of a TierLay; declared here, V02 §2.6 cites it
interface UndergroundLink { id: Id; a: { part: number; element: Id; at: VertexRef /* ('link_end', link id, 0) */ }; b: { part: number; element: Id; at: VertexRef /* ('link_end', link id, 1) */ };
  kind: 'open'|'gated'|'secret'|'collapsed'|'flooded'; via: 'breach'|'stair'|'shaft'|'door'; knownTo: 'public'|'local'|'secret';
  cause: 'proximity'|'overlap'|'mineBreach'|'reuse'|'lifeline'|'edit'|'dig'|'dossier'|'crypt'|'legacy' /* why it exists — item 109's "breach" is via 'breach' and its "reuse" is cause 'reuse' */; rule: string; lifecycle: Lifecycle }   // item 65 (d): a connection between elements of two parts, never guaranteed and never a shared vertex (II.7.6; J-A65.31); the links to the surface are AccessPoints
// AccessPoint — a stair, ladder, hatch, door, shaft, well, cellar stair, grating or mouth linking the ground and an underground part by entity ids, with its state, knowledge and source (items 64–66) — is declared with its mechanism in II.7.4 and listed in §2.8's entity registry; its underground-side vertex carries the `access_point` role on its element's kerb or wall (§2.2 rule 7)
// Works and lights (items 67, 68)
interface Works { id: Id; kind: 'build'|'extend'|'demolish'|'repair'|'convert'|'decay'|'clear';
  target: { building?: Id; plots?: Id[] } /* the building it works on, or the plots a join or a split re-draws (§4.11's Works (7)) */;
  startWeek: number; durationWeeks: number /* integer working weeks: its WorksTable row's range drawn on `works` (§6.1) × the band's labour factor (§4.11) */; row: string /* the WorksTable row it reads */;
  cause: { seq: number /* the event that decided the change */; mutation?: number /* index into that event's mutations: the MutationRecord whose parts it shows, in order (§4.7 S11) */ };
  before?: { parts: { ring: Polygon; heights: Heights; roof: RoofSpec['kind'] }[] /* the parts the change subtracted, drawn through the demolition stages */; bounds: { line: PointCm[]; treatment: PlotBound['treatment'] }[] /* the boundary lines it removed, drawn until the clearing stage */ } /* world lattice points that are no vertex (§2.2 rule 5): carried with the target's plot face — the building's plot, or for a join or a split the target plot whose face holds the point — under a warp or a vertex move by §7.4's mean-value rule, never re-seated or orphaned (a drawn trace keeps no clearance); the undo record keeps the former rings and lines (J-A67.22) */;
  lifecycle: Lifecycle }   // item 67: a physical change with its timetable — model data in the model digest (§6.2); its stage at a week derived by §4.11, never stored; retired by the epoch after it has stood finished for works.retainWeeks
interface LightSource { id: Id; kind: string /* a light-rule row's kind: torch, lantern, lamp post, brazier, fire pit, campfire, magical orb, shrine lamp … data (§4.7's LightRule) */; source: 'fire'|'magic';
  point: Point /* moves with its host under a warp or a vertex move (§7.4) */; host: Id /* the building, way, square, gate, bridge, castle, pin, decoration (a wayside shrine), tunnel, gallery, chamber or access point it belongs to — for a hand-placed light, the entity `placeLight` names or finds under its point (§7.1); its arena is its Identity.key's */; entrance?: number /* a door light: its building's entrance ordinal */;
  heightCm: Cm /* above the host's surface */; intensityCd: number /* candela */; radiusCm: Cm /* the smooth cutoff of §8.4's falloff */; sizeCm: Cm /* the flame's or orb's own radius, which sets §8.4's penumbra — written at placement from its kind's light-table row (§4.7) */; colour: string /* sRGB: fire warm, magic cool — its row's, written at placement (§4.7), the colour the light pass lights with (§8.4 (c)); the vector rung's glyph and glow take §8.2's roles instead */;
  flicker?: true /* a fire light flickers — written at placement from its row (§4.7): §8.4 (f) animates it as a pure function of its render key and the view's time (§6.1; J-A68.61), never drawn or stored; absent: steady */; rule: string; lifecycle: Lifecycle }   // item 68: a point light placed by rule (§4.7's Light sources) or by hand (placeLight, §7.1); lit windows, the plan rung's room lights and light shafts are derived sources, never records (§8.4; J-A28.32); unlit while its host is abandoned, decayed or under Works before FINISHED — a reading, never a stored state
// The dossier's staged records (item 88; volume 8, the SettlementForge stage; §2.1): the port fills them (§7.7 item 8, §14)
interface ConditionOverlay { id: Id; key: string /* its binding key, cond:<id> (§7.7 item 12) */; archetype: string; severity: number /* 0–1 */; sinceWeek: number; untilWeek?: number /* both in the document's own weeks (§4.11's clock) */; lifecycle: Lifecycle }   // a condition standing between epochs, no geometry: read by §8.2's thematic overlay, §4.11's Works share, the clerk and the crisis look (g item 122) — §7.7's DR44 maps it through §10.2's crisis tables to a look kind or none, which §8.2's look rows draw while it stands in the view: §2.9's `week` in [sinceWeek, untilWeek), or from sinceWeek on while its lifecycle has not ended where untilWeek is absent (never `yearWeek`), under §2.9's `crises` key and the viewer's key (a withheld condition never drawn); a look only (*The dossier's staged records*, below)
interface DepositSite { id: Id; key: string /* res:<key>, or res:uid:<localUid> for a custom resource */; family: string /* ore, stone, clay, salt … data */; state: 'available'|'depleted'|'removed'|'discovered'; bearingCdeg: Cdeg /* its bearing from the centre */; landUse?: Id /* the quarry, mine or claypit LandUse it anchors (§4.9) */; lifecycle: Lifecycle }   // a state change converts the land use it anchors (§4.11)
interface PowerRelation { id: Id; key: string /* its two powers' binding keys (§7.7 item 12) joined in address order — unordered, no key form of its own */; a: string; b: string /* PowerStanding keys (§7.7 layer 2) */;
  kind: string /* the neutral kind of tables/dossier/relations: ally, dependent, subordinate, rival, tense, corrupt, neutral */; sign: -1 | 0 | 1 /* attraction or repulsion for §4.5's typing */; hidden: boolean /* never named on a public view (DR20) */; strength: number /* 0–1, the row's strength × its trend factor */; lifecycle: Lifecycle }   // read by §4.5's typing as a soft adjacency row and by item 72 (a)(2)'s political component
interface CustomChainRecord { id: Id; key: string /* chain:<chainId> */; label: string; active: boolean; nodes: { role: 'resource'|'processor'|'output'; key?: string; name: string }[] /* flow order */;
  endpoints: { flow: 'import'|'export'; label: string; partner?: string }[]; volume: 'minor'|'moderate'|'major'|'backbone'; crossLinks: { from: string; to: string; via: 'requires'|'produces'|'requiredInstitution'|'requiredResources' }[]; lifecycle: Lifecycle }   // g item 104: filled only by `dossierRecord`; the fields' rules and readers are V08 §2.8's; retired when the dossier no longer lists the chain
interface CustomServiceRecord { id: Id; key: string /* svc:uid:<localUid> */; name: string; serviceCategory: string; provider?: string /* the provider institution's binding key */; lifecycle: Lifecycle }   // V08 §2.8
interface HistoryHint {   // Recipe.history (§2.9): the dossier's history up to and including the present at creation (§4.11 *The clock* (1)), written once by the port's creation (V08 §3.15); standalone, the blueprint's history option (§4.2 S0; V09 §4.21.3 (1), V10 §4.1's T1 row) writes `ageYears`, `scars: []` and `peak: { tier: <the picked rung>, symbolic: false, evidence: [] }` — a declared peak, as a recorded `peakTier` is; no population: DR36 sizes the peak by its tier — the item-113 lists absent
  ageYears: number /* the settlement's age at the present at creation (§4.11 *The clock* (1)) — never advanced by §4.11's clock */;
  scars: { type: string /* fire, flood, siege, plague … data */; yearsAgo: number; severity: number /* 0–1 */ }[] /* one per history event, by V08's `historyScars` row */;
  // item 113's fields (V08 §3.15 (2) reads them in)
  founding?: { yearsAgo: number } /* history.founding.age, else history.age; absent both: the midpoint of the tier's AGE_BY_TIER range by V08's `tiers` row, noted history_gap */;
  events?: { key: string /* V08's `historyEvents` row's neutral key */; type: string /* the line's type word */; yearsAgo: number;
    severity: number /* V08's `historyScars` severity words: minor 0.3, major 0.6, catastrophic 0.9, else 0.5 */; name: string }[] /* every history event, oldest first (DR37) */;
  tiers?: { from: string; to: string; direction: 'promotion'|'demotion'; yearsAgo?: number /* from the outcome id's week suffix */ }[] /* tierHistory, oldest first */;
  population?: { yearsAgo: number; population: number }[] /* populationHistory, oldest first, each tick read as (week − tick) ÷ 52 years ago, the week the present at creation */;
  calamities?: { yearsAgo: number; type: string; deaths: number; exodus: number; severity: 'minor'|'moderate'|'major'|'catastrophic' }[] /* calamityHistory up to and including the present at creation (§4.11 *The clock* (1)) — every calamity the creation carries (DR36's losses; DR37's events) */;
  lifecycle?: { died: boolean; resettled: boolean; yearsAgo?: number /* the resettlement's tick, else the current settlement's founding */ } /* DR38 */;
  ancientFall?: { name: string; yearsAgo: number /* the founding's yearsAgo + its years before the founding */ } /* DR38's ancient "Fall of" event on the site */;
  peak?: { tier: string; population?: number; symbolic: boolean; evidence: string[] /* the evidence kinds present, strongest first */ } /* DR36's input (V08 §3.15 (3)), or the standalone option's declared peak (above) */ }
  // readers: S2's growth-stage count (`ageYears`, `scars`; §4.2 S2), II.7.6's catacomb age (`ageYears`) and, for a `fire` or `flood` scar, its buried old town (J-A88.42);
  // item 113's fields by §7.7's DR36–DR39, §4.11's history-first generation (V06 §3.20's replay) and II.7.6's buried former settlement. Declared here, V08 §3.15 (2) cites it;
  // an absent list reads as []: a recipe written before item 113 holds neither the lists nor `peak`, so no replay runs; the standalone form's declared peak
  // alone drives DR36 and the replay
interface HistoryRecord {   // g item 113 (a): the history replay's record — one per document, as the MaterialLedger is, written once at generation by the replay (V06; §4.11), model data in the digest; read by the clerk and the reader (the story, "the walls were built when this was a city of twelve thousand"), §7.7's history rows and the exports
  peak?: { rung: Rung; population: number; symbolic: boolean /* g item 113 (f): the effective peak, sized at its tier range's table cell and marked symbolic */; evidence: string[] /* the evidence fields used, strongest first (§7.7) */ };
  epochs: { epoch: number; fromYearsAgo: number; toYearsAgo: number; events: { type: string; yearsAgo: number; severity: number }[] /* the history events §7.7's event → epoch rows mapped to it */ }[] /* the coarse epochs the replay ran, oldest first */;
  refounded?: { yearsAgo: number; cause: string }[] /* g item 113 (b): destructions the new settlement was generated over */;
  buried?: Id[] /* g item 113 (c): the `buried` systems derived from the former settlement's own geometry (II.7.6) */ }
```

People are derived, and never materialised in the document unless an explicit edit pins them (§10.3); which people a
user has opened is per-user view state (§2.9), outside every digest. Content references geometry by id and never the
reverse, so the map can be regenerated without deleting content and content re-solved without moving the map.

**Both faces of a wall are unbuildable (MFP-9).** `setbackCm.inner` and `setbackCm.outer` are both unbuildable bands; the
invariant "footprints ∩ (band ⊕ setback) = ∅ on both faces" is hard (§5.3), and ribbon plots start beyond the outer
setback (§4.4). How S5a lays open traces, barrier closures, waterfronts and stage rings is §4.4's; how S7 cuts the wall
strips and builds bands, towers, gatehouses, the harbour-mouth chain and the castle is §4.8's; how bridges are sited,
built and kept as sites is §4.2 S1 (5)'s and §4.8's (COV-FTG-G09, COV-FTG-G10, FTG-8). The arc classification reads V11's
`walls.barriers` (`WallBarrierRow`) and `walls.waterfront` (`WaterfrontThreatRow`) rows (V11 §2.7, V11 §3.16).

**An enceinte's condition by run (file f item 575; g item 114).** `condition` is a stretch-state profile (§2.2 rule 5):
values `standing` (the wall whole, in its own robust material) · `worn` (weathered, its parapet broken; still a wall) ·
`patched` (a former gap closed in a cheaper material than the wall's own — timber hoarding, wattle or hurdles, an earth
bank or dry-stone infill in a masonry wall; odd stakes, hurdles or brush in a palisade) · `breached` (a gap with rubble) ·
`dismantled` (its stone taken; a gap for good), knot role `wall_state_knot`, default `standing`. Each run also records its
**material**, `conditionMaterial` (knot role `wall_material_knot`, default `robust`, the wall's own `material`; else the
`walls.patchMaterials` row it was closed with, V11 §3.25.3), and the **epoch of its last change**, `conditionEpoch` (knot
role `wall_epoch_knot`, default 0); the three are written over the same stretch in one batch. A `worn` or `patched` run is
wall and a `breached` or `dismantled` run a gap for every reader that draws or exports a run (the towers and gates drawn
with their run; a battle-map export, item 114 (f)), while the enclosed and sealed tests read the trace and its closure
whatever a run's condition (§4.4), so a breach opens no enclosure. *Writers:* `DeclineOp`'s `breach` (→ `breached`) and
`dismantle` (→ `dismantled`) over their `stretch`, the whole trace when they name none; `wearWall` (a `standing` run →
`worn`; §7.1, V06 §2.8); volume 5's landfall over the walls it covers (→ `breached`); `repairWall` with its material
(§7.1, V06 §2.8: a `breached` run → `standing` when robust or `patched` with a patch row; a `worn` or `patched` run →
`standing` robust, a patch row named there bent to robust at the dry run, item 101 R2, as V09 §4.21.4 offers only robust;
on a `dismantled` run it bends as V06 §2.8 states; with no stretch it lifts the ring's `neglect`) —
volume 6 issuing these over epochs by need and means (V06 §3.7.7); at generation with no history replay, S3 and S7 —
and VS3 for a village palisade (V07 §3.4 (8)) — by §7.7's DR41 (the item-114 row: the dossier's defence readiness and
the wealth, at V11 §3.25.3's shares; item 114 (d)), every run's epoch 0, and with the replay the replay's own epochs
(V06 §3.20). Every writer sets `conditionEpoch` to the epoch in force at its event over the stretch it changes; only
`repairWall` and the generation row set a material, the decay ops keeping the run's (a `breached` patch keeps its patch
row until a repair writes another: the patch gave way). The record's `lifecycle` stays the ops': `abandoned` on
`neglect`, until volume 6's no-stretch `repairWall` lifts it — back to the pre-neglect existence when every run is
`standing`, else `decayed`; `decayed` while any run is not `standing`; back to its former state when `repairWall` leaves
every run `standing` (V06 §2.8; J-V6.115). *The castle's welded stretch:* along an `on_enceinte` castle's shared stretch
(`Castle.cityWeld`, one wall carrying both enceintes' `wall` roles, §4.8) the town enceinte's three profiles are the
stretch's one condition, material and epoch: the bailey's profiles there mirror them, written in the same batch by every
writer — S7's generation row (one draw for the stretch, on the town enceinte), `DeclineOp`'s `breach` and `dismantle`,
`wearWall`, `repairWall` and V06 §3.7.7's transitions (the stretch decaying and repaired on the town ring's draws and
weight), whichever of the two enceintes the op names, an op whose stretch overlaps the welded stretch writing the
overlap on both — and never written apart; a stored pair that differs there (a hand-built document) is read as the
town's. So §8.2 draws one state there and §11.1 exports one wall-or-opening answer per edge. *Readers:* §8.2's state
rows and legend (each value, a `patched` run in its patch row's `look`; item 114 (e)); §11.1's wall LineStrings split
per run of equal condition and material, each carrying its enceinte's `id` and `run`, its ordinal from the trace's first
vertex in vertex order, `condition` absent when standing and `material` absent when robust; volume 6's transitions (V06
§3.7.7 (3), which orders the patches' rebuilding); volume 9's repair tool and legend; volume 10's story of each run;
volume 12 merges the runs by the enceinte's `id` (V12 §2.2, T-V12-4). *Undo:* the writing op's undo record restores the
three profiles (on both enceintes along a welded stretch). *Migrate:* a document without them reads `standing`, `robust`
and epoch 0 throughout.

**Raised ways (g item 110 (b); J-VI.2, J-VI.15, J-VI.21, J-VI.27).** A raised way is a `Way` whose deck
lives in its own ground arena part ≥ 1 (§2.1), so the ground's planar rule is untouched: it crosses the ways beneath
without a junction, its two ends ramps or stairs joined to ground vertices, or an end on the arena's outer ring (below,
*At the frame*), and its piers footprints on ground part 0.
* **The support step**, run for every raised way — generated, declared or drawn — after its course and deck level are
  fixed and before the span rule, from ground part 0 only: (1) the deck's centre-line between its two feet
  (`RaisedWayRecord.feet`) has length L m; the pitch p is `spanSpacingCm` ÷ 100 where held, else one uniform on
  `raised.reason` (§6.1) keyed by (the way's lineage, `pitch`) inside the `raisedWays.structure.pierSpacingM` band of
  the way's material (drawn by the `material` row by band; an aqueduct never timber); (2) n = max(1, round(L ÷ p))
  spans, the n − 1 interior stations evenly spaced at L ÷ n; (3) a station whose pier would meet an **obstacle** — a
  part-0 way's corridor (a bridge's, a pier's, a mole's or a quay's deck among them), and along a bank of kind `quay`
  (§4.2 S1 (7)) the corridor of the quay S7 lays there (§4.8), a water face (a river's, a canal's, a moat's and an
  oasis's water among them), a square (a `square` block, §2.5) or a reservation, an enceinte's band (`Enceinte.band`, or
  before S10 has built it the band beside the standing trace, read as these laws' *the band* and *Not yet built* read
  it), whatever its runs' condition, and, once `absorbWall` has merged a ring's band into the blocks (V06 §2.8), that
  band as it stood over each run of the absorbed record not yet `dismantled` (these laws' *what stands of a wall*; its
  worked example the crossing table, row W8) — never a wall
  strip's setback, glacis or berm, in which a support may stand (these laws, law 1 (4); the crossing table, (6) (d)) —,
  or an oasis's grove (a `grove` `Greenery` with `fedBy`) — slides along the deck to the nearest clear position at which
  both neighbouring spans stay ≤ `raisedWays.structure.slideMaxFactor` × the `pierSpacingM` band's upper bound ((1)),
  else it is omitted and the merged span is ruled by the span rule, whose step (2) opens a span over every such obstacle
  but an enceinte's band (there ruled as anywhere and read by these laws, law 1 (8); the crossing table's *beneath*); a
  merged clear span longer than `raisedWays.structure.maxClearSpanM` for the way's material class (masonry or timber, as
  `pierSpacingM` is keyed; V11 §3.24.2) — a crossing too wide for one arch, as a broad river or a wide square is — drops
  a generated course (`raised_too_long`, which waits as `raised_too_tall` does, V06 §3.19 (5)) and makes a declared
  one's dry run bend it to the nearest course whose clear spans fit (item 101 R2), so a river is spanned within that
  bound and `viaduct.maxSpanM` both (§4.3); a course across an enceinte's band crosses it on a span by this rule — an
  aqueduct's, a road deck never crossing a trace standing when its course is laid (these laws, law 1 (3); §4.3 *Where it
  may not go*; a frame growth's extension, which keeps the deck's course, excepted: (7)) — and meets the wall by these
  laws (law 1 (2), (3); their worked example the crossing table, (6) (d)); (4) each pier's `ring` is a rectangle centred
  on its station, across the deck of the deck's width and along it of max(`pierWidthShare` × the realised span,
  `pierMinCm` ÷ 100) m; a pier higher than `maxPierM[kind]` (the deck's level less `levelledGroundCm` at its station)
  drops a generated course (`raised_too_tall`) and makes a declared one's dry run bend it to the nearest course the pier
  heights admit (item 101 R2); (5) keys are minted in order along the deck and never reused: an unchanged course
  re-derives the same stations from the same stream key and so keeps its keys; a changed course keeps the key of every
  station within p ÷ 2 of a former one and mints the rest after the largest key the way has held; (6) **Kept from its
  creation; later work gives way.** A raised way's stations, keys and spans are placed by (1)–(5) at the commit that
  creates it — at generation inside S4's or a stage's S5b route solve or at S6's end, at an epoch by V06 §3.19's
  founding, by hand at its declaration's commit — against the obstacles standing then, each span's `use` ruled once by
  the span rule (below); from that commit, at generation as after it, it is **kept**: nothing laid later re-runs this
  step on it, moves, adds or omits a station, mints a key, re-rules a span or drops it; only an op that names it changes
  it (its edits, V06 §3.19's ops, a landfall, a frame growth's extension of its deck by (7)); a wall meets it, whichever
  was laid first and with either side held, by these laws ((0); their worked example the crossing table, (d)). A lock
  holds the same, on its axis — a placement lock or pin its placement, never its shape where a wall meets it, a shape
  lock its outline and size besides (these laws, law 2, law 1 (10); its worked example the crossing table's lock
  sentence); at a regeneration a raised way stands before every stage as these laws' *Newer* gives it (§7.2). Its
  supports, its ramps, stairs and feet (`RaisedWayRecord.feet`) and, once the span rule has run, the under-deck strip of
  each `vault` span — but one these laws read `open` (law 1 (8); its worked example the crossing table's *beneath*) —
  are a **reservation** on ground part 0, and everything laid after the raised way gives way to it:
  * (0) **§2.7's laws** — the raised-way × wall family's laws, normative (J146):

    **Terms** — each defined once, as a function of what stands when it is read; where several raised ways stand, law 1
    reads each one's own strip, ends, zone, deck line and spans, a thing lawful only where it is so against each, every
    move and search reading it so.
    * A **meeting** is any contact of a **wall-like structure** — an enceinte of any kind (a town or stage ring, a
      castle's curtain and inner ward, a citadel, a village's palisade, earthwork or inner circuit), a quay wall or a
      retaining wall, with its runs, gates (posterns, water gates and a harbour-mouth chain among them), towers, moat
      and the ways its own law lays (an intervallum, a quay, a castle's paths) — with a **raised way** — a viaduct or an
      elevated road (each a **road deck**) or an aqueduct, with its supports, ramps, stairs, feet, spans, arch vaults
      and the way it carries (by hand, the declared way to its stroke's end; a generated road deck's, the route it was
      priced on, past each foot). An **enclosing wall** is every wall-like structure but a retaining wall.
    * **What stands of a wall** is read run by run. Each run of a wall record stands, whatever its condition, with its
      line, its band, its wall strips and the gates, towers and fixed places on it — save a run its record no longer has
      (a hand `delete` of a run, or a burial of the runs it lists, V06 §3.20.5 (4), cause `rule:burial`) and every run
      of a record tombstoned, `converted` by `wallToWay` (its line the ring road's spine, a way) or cleared by any cause
      but `absorbWall`, which stand nowhere; and a run of a record `absorbWall` cleared (cause `convert:absorbWall`, V06
      §2.8), which stands while its condition is not `dismantled`, with its band as it stood and its wall strips merged
      into the blocks. A gate `gateToJunction` converted is a junction, no gate. Every wall, line, band, wall strip,
      run, gate, tower and fixed place these laws read is of what stands.
    * **The band** of a wall at a point is its section there by the rows of the construction that laid it or last
      re-sectioned it (its derivation record, §2.8) — V07 §3.4's for an enceinte laid by VS3's construction (VS3 at a
      village derivation, and every op that runs VS3's form at a village rung: a village kind's `drawWall`, by hand or
      for a dossier wall record, and `repairWall`'s new stretch, V07's edit table) or rebuilt by V07 §3.11's REPLACEMENT
      (the palisade's stakes, the earthwork's bank with its ditch, the inner circuit's wall), and §4.8's along its
      stretch profile for every other (a town's `inner` ring, and a village kind drawn at a TOWN rung or above, among
      them), at whatever rung each stands, so no change of product or rung alters a band or wall strips —; a retaining
      wall's band is its line. **The wall's top** at a point is its base there raised by its **height** there, as its
      section's rows give it, whatever its runs' condition, law 1 (7)'s cap a reading beside it. **The wall strips** are
      the band with its inner setback inside and, outside, its outer setback with its glacis — on a moated stretch its
      berm up to the moat (§4.8); **their width** at a place is the band's half there plus the wider of the inner
      setback and the outer setback with its glacis, read so whether or not a moat runs or will run there (a berm never
      narrowing it), and for a band V07 §3.4 gives `palisade.bandM` from its line; where two walls' lines meet or run
      together (a castle's welded stretch and weld vertices, a stretch anchored on an earlier enceinte) the band and the
      width there are the wider, the top the higher, of the two walls'.
    * **The strip** of a raised way is its under-deck strip — the deck's plan between its feet widened each side by
      `raisedWays.structure.stripMarginM` (§4.6) — read from its record whatever its spans' and supports' `state`; **a
      span's strip** is the span rule's, the deck's plan between its two piers' inner faces without that margin (the
      span rule's (1), below), law 1 (8) and (9) reading each span's own; **the ends** are its ramps, stairs and feet,
      each widened by the same margin. A **standing span** is one whose `state` is absent, a **standing support** one
      whose `state` is absent or `ruined`; a `cleared` one's ring is open ground. A point of a road deck's carried way
      past its foot is **beyond the foot** where a wall's line, band and wall strips and a gate's footprint there are
      all clear of the ends and the strip; the nearest such point is **the first point beyond the foot**, which every
      rule that places or moves a crossing or a gate there takes (S5a's pin, the bent group's (i)).
    * A **footprint** is a tower's (`Tower.footprint`, an end post's, a retaining wall's decorative tower's), a gate's
      (its gatehouse with its passage, else its passage across the band; a harbour-mouth chain's water gate across the
      entrance with the tower at each head) and a fixed place's (its own points — `Gate.banks`, an anchor, a weld vertex
      — with the footprint standing there).
    * A **fixed place** is a place a wall's own law ties to something other than the spacing along its line, so that it
      is laid only along that tie: a river's water gate (tied to the river), an anchor with its tower (to the barrier's
      edge), a harbour-mouth chain (to the heads it spans), and a castle's weld vertices, town-side gate and vertex
      towers (to its claim, which moves only whole, by its siting). Every other gate, postern and tower is laid along
      its wall's line by the law that lays it; none, once standing, is moved by a meeting. **The zone** of a road deck,
      for a fixed place of a wall, is its strip widened each side by that wall's strips' width at that place — at a
      place off the wall's line (a harbour-mouth chain across an entrance the trace does not reach), the width at the
      point of the line nearest it; an aqueduct has none (law 1 (6)).
    * **The tiers** (J148: the owner's rule and choice; the tier texts the program's). **Tier 1** — gates (posterns,
      water gates and a harbour-mouth chain among
      them), towers and the fixed places — is never moved by a meeting (law 1 (11)). **Tier 2** — wall runs (their
      lines, bands and strips) and raised ways (their courses, supports, spans and ends) — is hard: where two meet, the
      newer bends itself locally. **Tier 3** — ground ways (a wall's own ways and a road deck's carried way among them),
      plots and unlocked buildings — is soft, moved round the hard ones. A held building and anything shape-locked is
      moved by no meeting (law 1 (9), (10)); every new thing first plans round the hard ones (law 2 (a)).
    * A **held building's strip** is the strip of a `vault` span whose chamber seats a held building (one seated there,
      V04 §3.5.4 (d), and locked on either axis), widened all round by the meeting wall's strips' width.
    * **Anything across a strip** is whatever is laid on the ground within it, and wet ground: a wall's band or wall
      strips, a run that stands, a retaining wall's line, a way's corridor, water, a flood cell or marsh, a square or
      plaza, a reservation other than a raised way's, a plot or building, a grove; and, of another raised way, its
      supports, ramps, stairs and feet and, across a span whose deck was fixed after that raised way's there (*Order*),
      its whole under-deck strip, whatever its spans' reading. A raised way's own reservation (its supports, ends and
      `vault` spans' under-deck strips, (6)'s lead) and its own arch vault with what the chamber seats (a declared
      placement's plot and building, V04 §3.5.4 (d)), its door, links and accesses are never across its own strips, so
      no span's reading turns on its own chamber or on a raised way fixed after it. **Open ground** — ground holding
      only its terrain and a dry land use, a `cleared` support's ring among it — is nothing across.
    * **Held** is locked, on the axis named, and nothing else (J147): **held in placement** is
      placement-locked — the lock the user makes (T10 `hold`, UC18), a pin among them — and holds where a thing is, its
      shape still changing at a meeting (J144); **held in shape** is shape-locked and holds its outline and size
      (*shape*, below), its cosmetics still following the neighbourhood (law 1 (10)). A lock on a wall-like structure or
      a raised way holds it, on its axis, with its parts (its runs, gates, posterns and towers; its supports, spans and
      arch vaults), so at a regeneration they stand with it before every stage. A thing drawn, dragged, declared or
      placed by hand holds nothing unless locked: it keeps its existence and meets as an unlocked thing of its kind. The
      support step's keeping of every raised way's stations, keys and spans from its creation ((6)'s lead) is no hold.
    * **Placement** is where a structure is, as its record's fields hold it — a wall-like structure's trace (its line as
      a curve, a vertex inserted on it without moving it changing none) with the place of each gate, postern and tower
      standing on it (a gate newly laid moving none), a raised way's course, deck line, stations, keys and feet, an arch
      vault's span and key, a ground way's two ends; **shape** is what a meeting may change of a standing thing — the
      soft readings (law 2), a gate *Carried way* makes in it, an arch vault's chamber and a Tier-3 thing's local course
      (law 2 (b)) — and, for a shape lock, its outline and size besides: a wall-like structure's section, band and
      width, a raised way's deck width and its spans' `use`, a building's footprint and plot. **The reach** of a meeting
      is the strips, zones, ends and Tier-1 footprints it meets and, along each line through them, the nearest points
      clear of them.
    * **Order.** Lines are fixed in one order: a creation prefix's declarations in log order; then a generation run's or
      a village derivation's steps in the order it runs them — S3's numbered steps, S4, then for each
      stage k in turn its S5a boundary, S5b, S5a trace, S5c and S5d, then S6 onward; VS3 and the village steps in theirs
      —; then each later event in log order, an epoch's or a replay's ops in its op order (an epoch's new walled stage
      running its S5 steps in that order inside its op); two lines one step fixes are ordered by address, the lower
      first. Each run of an enclosing wall records the order of the step that fixed its line (`Enceinte.laidAt`), and
      each stretch of a raised way's deck line that of the step that fixed its course (`RaisedWayRecord.courseAt`) —
      stretch-state profiles of `{ seq, step }`, `seq` the event's place in that order and `step` its step's place in
      the order the event runs its steps (0 by hand), a knot reading its earlier side. A line is dated by the step that
      fixes it, whichever step commits it: a stage's trace by the step that picked its boundary (S3 (6) for stage 1,
      whose trace S5a commits for k = 1; stage k's S5a boundary, before its own S5b), a castle's curtain, inner ward and
      arcs by its claim (S3 (8), or a stage citadel's trace batch), a raised stretch by the step that fixed its course
      (S3 (5)'s gate routes' by S3 (7)). The op that lays or moves a line writes its order — a re-shape, a warp, a
      `revert`, a re-trace and an extension bent past a bound date what they move —; every other op keeps it — a
      re-section on its kept trace, a Deck height or Arch spacing edit, an extension that keeps its course and a repair
      (the line they continue), a `split` or `merge` (each piece its own), an undo or a redo (each restoring or
      re-applying its target's record), and at a regeneration a structure it keeps where it stands. A stretch a commit
      moves keeps its former order at each crossing it had as the commit began and still has (law 1 (3)).
    * A **commit** is one event with every batch it chains (§5.3), the unit at whose end law 1 holds: an edit (by hand,
      or an absorb with no epoch), V04's arch-vault reconcile in it; an epoch — a replay's, a village's and a derivation
      it runs among them — from its first batch through `afterGrowth`'s `under.extend`, whose reconcile lays and removes
      chambers (V06 §3.2); at generation, a regeneration and a village derivation each stage (§3.3's `StageId`), law 1
      holding at its stage end, the arch vaults laid by the underground tail's vaults step (V04's T2) after the first
      map. Every op resolves the meetings it makes by laws 2–3 as it acts, inside its commit. What stood **as a commit
      began** is read by hand and at an epoch from its undo record (§7.4 *Application*), at a stage from what the stages
      before left (the first's, the records the event keeps); a meeting standing at its end whose two things did not
      meet so then — a line, band or strip in a strip it did not lie in, a deck line across a line it did not cross,
      whichever side moved or grew — it makes **newly**, and one whose reading is deeper than then (a span read `open`;
      a merge, a cap or a lower soffit over a point) it **deepens**, no other being either, whatever order its fields
      hold.

    **LAW 1 — what a valid meeting is.** At the end of every commit, on every path, at every rung:
    1. no raised way has a junction with ground part 0: its deck shares no vertex or edge with a ground way but at its
       two ends, no gate stands on it, and a deck passing over a wall is no crossing of the gate law (item 110 (b),
       (f));
    2. an enclosing wall's line crosses an aqueduct's deck line (law 1 (4)) at the aqueduct's level, in the form that
       level there gives, nothing of either record written (J149) — its levels read from the records,
       each span's soffit standing or fallen, whatever either side's condition (item 114): **over**, where its channel
       there lies above the wall's top — no standing support in the band there and every span above the band clearing
       the wall's top, the band passing beneath the arch; **merged**, where its channel lies within the wall's height —
       the band built up to and around what stands of the aqueduct's arch or pier there (none standing, the band whole)
       at the wall's own top, the water passing through it in the channel, the arch no gate (no way passes it) and no
       gate, postern or tower in it (law 1 (5)); each keeping its own condition (item 114); a crossing that fits neither
       form is unlawful; so every aqueduct crosses every wall through an arch, over it or within it (item 110 (b):
       "crossing the wall through an arch"; the program's reading, J122); a retaining wall's line meets any deck line
       anywhere, the deck passing over it and a support on its line built against it;
    3. a road deck's deck line crosses an enclosing wall's line only where that run's line was fixed after the deck line
       there (*Order*: its `laidAt` later than that stretch's `courseAt` — a stage's trace dated by its boundary's pick,
       so never at a boundary its stage picked before solving the deck's route), the band then built through each of the
       deck's supports it meets; across a run fixed before the deck line there, the deck comes down before it and its
       carried way crosses on ground part 0 through a gate beyond the foot;
    4. no enclosing wall's line, band or wall strips lie over a raised way's ends, and its band lies in a raised way's
       strip only to cross its deck line — entering on one long side, leaving by the other, meeting the deck line once
       there;
    5. no gate's, postern's or tower's footprint lies in a strip, under a standing span or a fallen one, but in an
       aqueduct's crossing law 1 (2) reads over whose every span over it clears its top, never on a support's ring;
    6. no fixed place, with its footprint, lies in a road deck's zone, nor in an aqueduct's strip but where law 1 (5)
       admits a gate or tower there;
    7. wherever any part of a wall's band lies beneath a standing span of a road deck (or a standing support bearing
       one), its top and walk are no higher than the lowest road deck's soffit there, an aqueduct capping none (law 1
       (2));
    8. a `vault` span is read `open` while anything lies across its strip and `vault` while nothing does, its record
       unchanged either way; from the commit that lays its raised way's arch vaults on that path — by hand the edit's
       own, at an epoch its `under.extend`, at generation and a regeneration the underground tail's vaults step; never
       before the underground layer (M6-U), where the reading alone holds — a span read `vault` has the chamber V04
       §3.5.4 (d) lays and a span read `open` none;
    9. a held building's chamber, footprint and door are unchanged by any meeting: nothing lies across the strip of the
       span whose chamber seats it, and no wall's line lies newly (*commit*) in the held building's strip of a building
       held at a commit's end;
    10. a thing held in placement keeps its placement and a thing held in shape its outline and size (*held*), changed
        by no op but one that names it — a meeting changing a placement-held thing's shape alone (J144) —, and no op
        makes or deepens (*commit*) a meeting with a shape-held thing that changes it: a wall-like line, band or strip
        newly across the strip of a `vault`-use span of it, an aqueduct merged into it, a soffit lowered over a run of
        it, a gate made in it (J147, J150);
    11. no gate, postern, tower or fixed place standing as a commit begins, laid by an earlier batch of it or fixed by
        an earlier step of its event (*Not yet built*) is moved or removed by a meeting: at its end each stands where it
        stood, was laid or was fixed, or where the op's own edit of it or of what carries it puts it (a gate the user
        places or slides, a warp, a re-section's re-derived footprint), save one the op removes, or lays again on a line
        its own law re-traces, by that law or law 2 (c) (a run deleted, buried, converted or dismantled; the run a moved
        vertex or a water op re-traces between the towers its own law leaves unaffected; an unwalled stage's gates and
        welded castle).

    **LAW 2 — one way to resolve any meeting**, whatever op makes it: (a), then (b), then (c), each tried only where the
    one before leaves no lawful shape, for every op on every path — the newer bending itself round the hard ones, then
    the soft ones moved, then the op giving way.
    * *Entry.* Whether an op may act on its own target at all is settled before any meeting: by hand by §7.1's lock row
      (a target the user locked refused, `refuse.locked`, as that row refuses one; a target drawn, dragged, declared or
      placed by hand and not locked changed as an unlocked one is), by the engine or a hazard by §7.2 *Protection*, V06
      §3.1 and V05 §3.16 (2) (a part they protect never struck, decayed or covered). No placement lock or pin on a
      wall-like structure, a raised way or an arch vault refuses, skips or alters a meeting (J144: it holds placement,
      not shape); a shape lock is honoured (law 1 (10)); a held building keeps its chamber (law 1 (9)).
    * *Newer.* Of a meeting's two sides the newer is the op's own structure — the one it names as its target, creating
      or changing it; a structure it changes only at the meeting (a gate *Carried way* makes, a Tier-3 thing law 2 (b)
      moves, a soft reading) is the standing side; where the op names both or neither (a warp), the raised way is the
      older (its stations kept from its creation, (6)'s lead). Between structures standing before the op the newer is
      the later by *Order* where they meet — a creation prefix's declarations before every stage, and at a regeneration
      every structure it keeps where it stands (each locked one, on either axis, and each one §7.2 keeps so) older than
      every stage, keeping its date, one it lays again taking the stage's. A meeting of two held structures stays as
      their last commit left it.
    * *Not yet built.* A part not yet built when a step, law 1 or the check reads it, whose structure's course, place or
      section is already fixed — a gate's or fixed place's footprint, a band's width, a wall's top and its gates' and
      towers' heights before S7 writes them, the stations and spans of a raised stretch whose course S3 (7) fixed, a
      castle's curtain from its claim's commit — is read as the rows that build it will build it from what stands then,
      and the step that builds it builds exactly that; a part whose place the step that lays it chooses by its own law —
      every tower and postern S7 lays, at a turn vertex or by spacing, but a fixed place's — is that step's own, the
      newer when it is laid.
    * *The soft readings.* A `vault` span read `open` with no chamber (law 1 (8)), a wall merged round an aqueduct's
      arch or pier (law 1 (2)) and a run's top capped beneath a road deck's span (law 1 (7)) are no move: each follows
      of itself from what stands, at every step — whichever side's op puts something across a strip or takes the last
      thing off it, a chamber following at the commit's end —, so law 3 never ranks them.
    * *Carried way.* A road deck's carried way meets every enclosing wall on its ground course by the gate law (§5.3's
      gate row), its gate where the wall crosses that course beyond the foot: by hand §7.3's S7 operator makes it in
      every wall the declared way crosses, a placement-locked one too, inserted on the wall's standing line, which it
      neither re-traces nor moves (a gate the op lays, standing from its commit as every gate, kept when its carried way
      goes; the wall's shape change shown by law 4's (G2)); off the hand path only the gate law of a stage that lays its
      trace after the route is solved makes one (S3 (7)'s, S5b's), never in a trace laid before, whose standing gates
      the route takes — a carried way standing before the stage (a creation prefix's, or one a regeneration keeps where
      it stands, *Newer*) taking its gate where that stage's boundary crosses its ground course or ends (at stage 1 S3
      (7)'s once S3 (6) has fixed the boundary, a gate beside `N₁`, decked and counted as the harbour gate is; at a
      stage k ≥ 2 a lawful pin of S5a, one of S5b's `c`), none where the boundary crosses only its deck, which the trace
      keeps (law 1 (3)). Where the wall is shape-locked, or law 2 (a) leaves the way no lawful gate in it, the carried
      way — a Tier-3 way, unless itself shape-locked — is re-routed by law 2 (b) from the first point beyond the foot
      through the nearest gate of that wall that a way of its class may pass (§4.8 *Gates*: no postern, water gate or
      chain), never past its ends, else the op takes law 2 (c). A generated deck's route is solved again by its stage
      and meets the deck by the way-and-channel table's row (a) and law 1 (3), a lock on the deck holding its parts,
      never its route.
    * *A warp* is one op: each step is applied by §3.6, whose halving answers the kernel's own checks and never these
      laws, and its result is a given shape law 2 resolves before law 1 is checked at the commit's end.

    (a) The newer structure is laid lawfully first — law 1 holding and every rule of its own derivation, §4.3's crossing
    rule among them for a way, a gate's too, laid beneath a standing raised way, never for a raised way laid over a
    standing way —, within its own reach, planned round every Tier-1 thing law 1 (11) holds that it does not lay again,
    one its own edit carries among them, and the other side's Tier-2 structure: each thing it lays — newly, or again on
    a run its own law re-traces (law 1 (11)) — or places — a gate, postern or tower of its own along its own wall's
    line, a fixed place along its tie, a crossing along the line it crosses, a station along its deck, an end it lays
    back along its own line — moved along that line or tie, and each stretch of its own line, course or way it changes
    re-laid only locally, between the nearest points clear of what it meets on either side (a bent-group move, a
    re-section's local re-trace, a course bent clear of a gate or tower); every change no further than the meeting's
    nearest clear points (*the reach*), within the bound its own law gives it (the pull's search band, the support
    step's slide bound, `wall.barrierReachM` for an anchor, a siting's candidates, an edited value's declared range) and
    never past its line's ends: a line, point or value an event or costless rule sets (a stroke, a drag of a vertex,
    gate or grip — a castle's among them —, an edit's value, a warp's result) takes the lawful shape law 3 picks nearest
    it, and every other op (a pull or cost field, a route solve, a siting, a points-form `drawWall`'s trace) searches
    only shapes law 1 admits, its own cost choosing among them; (a) fails where none lies within that reach.

    (b) Failing that, the soft give way to the hard: the op's shape is taken as (a) would take it with those Tier-3
    things passable that (b) may move — a ground way not shape-locked (a wall's own way, a road deck's carried way), a
    plot, an unlocked building —, every other thing as impassable to it as to (a), a searched shape by its own cost, a
    given one by law 3; and each such thing that shape meets is moved by its own law within its own reach (G1): a ground
    way re-routed by the router that laid it (§4.3; by hand §7.3's S4 operator) between its nearest unmoved nodes either
    side (a carried way as *Carried way* says) — a placement-locked one's local course a shape change shown by law 4's
    (G2) —, a plot re-cut (S10 on the touched blocks), an unlocked building as the op's own law moves or clears one.
    Never a Tier-1 thing, a Tier-2 structure's line, band, supports, spans or ends, a held building or anything
    shape-locked (law 1 (9), (10)); the soft readings follow as at (a).

    (c) Failing that, the op gives way (G3), neither side moved or broken. **By hand:** refused,
    `refuse.raised.meeting`, offering the nearest lawful declarations (item 101 R2; `PreviewResult.alternatives`) and
    **Show me why** — never an Unlock (no placement lock decides a meeting). **At generation, a regeneration and a
    village derivation (a palisade VS3 lays where no user runs it):** the newer structure is not built — a raised way
    dropped, reported; a castle's claim passed for the siting's next candidate, then F-CASTLE's ladder — or, where its
    stage must lay it, that stage's raised-way rung runs alone (F-WALL's; F-V-RAISED at a village): re-laid once with
    law 1's exclusions impassable and its search band widened to `wall.barrierReachM` beyond the stage's boundary (§4.4
    S5a (1)'s reach to a barrier; at a village VS3's), so that it may pass round the raised way, else the stage left
    unwalled, which then reads as §4.2 S3 (9) (a)'s unwalled stage — no `Enceinte`, `Gate`, moat or chain recorded for
    it, its gate routes and spawned primaries crossing its boundary ungated, the harbour route an unwalled town's, a
    castle welded to it re-sited by F-CASTLE else kept `inside`, the wall listed in `requestedVsBuilt` and
    `W_RAISED_MEETING` reported. **At an epoch and in a replay:** the op waits that epoch (`walls.waited`,
    `raised.waited`), a water op (`shiftCourse`, an avulsion, `digCanal`) being checked on its new water before the
    water is inserted and waiting likewise where the run its own law re-traces has no lawful shape, never widened past
    it (F-REDERIVE's rung; law 1 (11)); the one op that cannot wait is a frame growth, whose extension keeps the deck's
    course and, wherever a wall-like structure crosses the old end span, that span as it stood (the old foot's point its
    first new station), and past a bound no fitting course meets places each station off every Tier-1 footprint and
    every other obstacle but the one it fails, reported (`raised.extendedPastBound`, V06 §2.10; (7)).

    **LAW 3 — one total order.** Among the lawful shapes law 2 (a) or (b) leaves open, the first by these keys in turn.
    (1) **What changes:** a shape that keeps the value the op set comes before one that bends it (no lawful shape
    re-lays its course or trace past law 2 (a)'s local reach). (2) **Least displacement:** the value's difference; then
    the largest distance any changed thing moves; then the sum of those distances; then the area between each re-laid
    line and its old — a thing moved along a line (a gate, postern or tower the op lays or places, along its own wall's
    line; a gate the op's own wall lays on a standing way, along that way; a fixed place the op lays, along its tie; a
    crossing along the deck line it crosses; a station along its deck) measured along that line, a thing the op itself
    drags measured back along its drag, so that it stops on the side it came from, and a re-laid or re-routed line,
    course or way by the largest distance of the new from the old. (3) **A canonical key** no two distinct shapes share:
    their changes, listed in the address order of what each changes, compared item by item — the lower address, then the
    smaller value, then the point (a moved thing's new place; a re-laid line's vertices in order, a prefix first) first
    by x, then by y, in the arena's frame. A line's part inside a strip that crosses no deck line there leaves it on the
    side it entered from. A bend that would leave the op with no effect is no lawful shape of (a):
    law 2 (b) is tried, then (c).

    **LAW 4 — every op re-checks.** Every op on every path that changes the geometry, kind, section, width, class,
    condition, existence or held state of a wall-like structure or a raised way, or anything law 1 (8) reads across a
    strip — each stage, epoch, replay or village op (a burial and a silting among them), each hand tool (a castle's
    grip, a terrain stroke, a retaining wall's chain grip, a terrace level), a warp, a revert, a split or merge, a
    width, class or table edit, a skeleton's import and an undo — re-checks law 1 for the meetings it touches and
    resolves them by laws 2–3 as it acts, law 1 holding at its commit's end. An undo or a redo is its event's exact
    inverse or re-application, never bent: where law 1 would not then hold it is refused (§7.4 *Independence*:
    `refuse.undo.dependent`), naming each later live event whose structure or lock it would meet to undo first, else
    what it would meet (a lock's part by law 1 (10)). **(G2)** Every change a meeting makes to the shape of a thing held
    in placement — a placement-locked structure, part or way other than the op's own target, or a placement-locked part
    of the op's own (an arch vault; no meeting moves a gate or tower, law 1 (11)) — is shown, by hand as the fate
    **reshaped** (`EditFate.fate` `'reshaped'`, with `met`, the structure it met, and `change`, as §5.4's `reshaped`
    entry's), off the hand path as a `reshaped` entry in the report's changes (§5.4), and the event's undo restores it.
    Every other change of the op's own structure is its bend line, never a fate; every change of an unheld structure at
    a meeting (an unheld chamber removed or laid again among them) is one of the op's consequences (§7.3 item 4), never
    a fate.

    **The check.** Law 1 is checked at runtime by one §5.3 row at the end of every commit, each clause from what the
    commit leaves, its event and what stood as it began (*commit*) — its spatial clauses by query between every part the
    commit touched (a wall-like structure, gate, tower, fixed place, raised way, arch vault or held building; for (8)
    and (9), every span whose own strip meets anything the commit laid, moved, re-classed or removed) and every part of
    the other side it meets, touched or not: a raised way against every wall-like structure, gate, tower, fixed place
    and held building, and these against the union of every standing raised way's strips, zones, ends and deck lines and
    each span's own strip, whatever the op; (3) by the stored *Order* of the lines that cross; (9) and (10) by the
    meetings the commit made newly or deepened, (11) by what it moved or removed, against what stood as it began or, for
    a thing laid or fixed earlier in its event, the place its laying batch or fixing step recorded (its `Gate`, `Tower`
    or `Castle` record, or the stage plan S3 (6)–(9) fixed); (10)'s placement by each held structure the commit touched
    — its placement as the event began, and a shape-held one's outline and size, unchanged unless the event names it as
    its own target (a generation, a regeneration and a village derivation naming none); (11)'s exceptions read from the
    event (its target, its edit, the run its own law re-traces, its law 2 (c) outcomes) — and by one property bar,
    §13.2's **T110-4**: law 1 after every commit across the family's fixtures, the state sweep, a randomised op sequence
    on fixed seeds, and every path, with its structures unlocked, placement-locked and shape-locked, and a skeleton's
    round trip (§13.2). That bar is what makes a missing example harmless.

  **Worked examples** (non-normative: each illustrates the law it cites; where an example and the laws differ, the laws
  govern, and a case no example lists is decided by the laws):
  * (a)–(b) *a part-0 way or a channel laid after the raised way* — at generation, at a regeneration, at an epoch, at a
    village derivation or by hand, the raised way locked on either axis or not — meets its under-deck strip by this
    table, **the way-and-channel table** (these laws, law 1 (1), (8), with §4.3's crossing rule); §4.3 *Lattice and
    costs* is the crossing rule's home:

    The crossing rule is §4.3 *Lattice and costs*' (a span whose clear width between the standing supports' rings is at
    least the way's width + `raisedWays.structure.clearWidthM`, whose soffit meets *The clearance* for the crossed way,
    within ± `raisedWays.structure.squareDeg` of square to the deck; never over a standing support's ring — its `state`
    absent or `ruined`, a `cleared` one's ground open —, a ramp, stair, foot or a `vault` span's under-deck strip; never
    along the strip), whatever a span's `state`: a `ruined` or `cleared` span's strip is crossed by this rule as a
    standing one's, a `vault` span's kept closed by its `collapsed` arch vault (V04 §3.5.4 (d) (2)). Throughout this
    table, and in every bar that counts way corridors over a support ring or a `vault` span's strip, a ring is a
    standing support's and a `vault` span is read as these laws read it (law 1 (8); its worked example the crossing
    table's *beneath*), citing that reading and never restating its cases. A lock on the raised way, on either axis (a
    pin among them), never refuses any row (none changes it; law 2 *Entry*, law 1 (10)).

    | row | outcome | ladder · bend | gates | test |
    |---|---|---|---|---|
    | **(a)** a route, S5c's proposal, a stage-2 seed's way, a village tracker, S7's quay, intervallum or castle path | crosses the under-deck strip only by the crossing rule | its own ladder: §4.3's F-ROUTE for a route; §4.4's deflection along the strip or its end there for S5c; V01 §3.17.3 (3)'s F-TEMPLATE rungs and §4.6's lane ladder; V07 §3.5a (3)'s turn; S7's way ending at the strip as at a reservation (an intervallum ending so, the inner strip bounded across the under-deck strip by its inner setback line, §4.8's lead) | — | T110-2 (3) (the intervallum and the castle paths), (5); T-V1-51 (c); T-V7-48 |
    | **(b)** a hand `drawWay` or a moved way | the same | `bend.raised.underSpan` (moved along the deck to cross under the nearest span that admits it); none admits it: `bend.raised.around` (another course by §4.3's router, round the raised way, else the nearest routable pair, §4.3 *Two-point roads*) | a way crossing a trace makes its gate there on ground part 0 (§7.3's S7 row), never where these laws bar a gate (law 1 (5), read with their terms; a gate's way under an aqueduct passing the strip by the crossing rule, law 2 (a)): such a crossing of the trace is moved along the deck to the nearest crossing at which these laws admit its gate (law 1 (5), law 2 (a), law 3; `bend.raised.underSpan`, its wall form), else the way takes another course (`bend.raised.around`); a `placeGate`'s stub and a slid gate are the crossing table's row W13 | T110-2 (4), (5); T-V9-52 |
    | **(c)** the ring road `wallToWay` makes | the same, the old line being where it is laid, read as after the op: each `vault` span the old wall stood over read as these laws read it once the op commits (law 1 (8); the crossing table's *beneath*) — `vault`, its strip closed and its chamber laid again by V04 in the commit, where they read it so; else `open` (the ring road itself read as laid after the op) | in the dry run its spine there is re-routed by §7.3's S4 local operator, between its nearest nodes on either side of the under-deck strip, to cross under the nearest span the rule admits; none admits it: it ends at the strip's edges as at a reservation, reported | its gates become junctions on ground part 0; none with the raised way | T110-2 (8); T-V6-47 |
    | **(d)** S5b's spawned primary | its course comes down before the stage's picked boundary (*down before the wall*; law 1 (3)), so it crosses the boundary on ground part 0 | §4.3's ladder | each spawned primary a main gate; an earlier arterial crossing the new boundary under a deck's span is no gate and no part of `c`, and one whose gate these laws bar where the boundary crosses it (law 1 (1), (4), (5)) is a gate and one of `c` where S5a moves its pin to a lawful place (law 2 (a), *Not yet built*; §4.4 S5a *Trace* (2)), else its way re-routed through a gate S5b spawns (law 2 (b)), so the stage reaches `N_k` gates on ground part 0 (§4.4 S5b; §4.8 *Gates*; §5.3's gate row) | T110-2 (2), (3) |
    | **(e)** a channel — a moat (S3 (10)'s; S5a's outer moat), a canal or a hand carve | passes beneath where its crossing of the under-deck strip meets no support, ramp, stair, foot or `vault` span's strip; elsewhere it stops at the strip's edges, ending against the ground as against a berm (§4.2 S3 (10)) — a moat stopped so leaving the wall's outer strip closed across the under-deck strip by its glacis line and typed there as on a dry stretch (§4.7 S10 (0); §4.8 *Wall strips*); a raised way created across a standing channel keeps its supports out of its water ((3)); a stopped channel reported by what carves it: S3's or S5a's `W_RAISED_CROSSING` at generation and at a regeneration (§4.2 S3 (10); §4.4 *Outer moats*), `walls.raisedCrossings` at an epoch | a hand carve: its crossing first moved along the deck to the nearest crossing that meets none of these (`bend.raised.underSpan`), else stopped at the strip's edges (`bend.raised.around`) | an arterial's deck across a moat by S5a *Outer moats* | T110-2 (1), (3), (5), (6) |

  * (c) *a face* — S8 holes its plots round the reservation and the under-deck strip (§4.6); a square, a reservation or
    a gate plaza is cut round the reservation; S7 roots no pier, mole or breakwater on it, a root moved along the shore
    to the nearest clear one;
  * (d) *a wall and a raised way* meet by this table, **the crossing table**, whichever was laid first, on every path —
    generation, a regeneration, an epoch, a village derivation and a hand edit — and with either side held or neither,
    each sentence and cell a worked example of these laws naming the law it illustrates: its lock sentence, *Strips,
    zones and nearest points*, its four outcomes, its bent-group sentence and its fixed-place sentence are named here
    once, and every other text cites these laws with the law's number, adding an example's name, row or cell where
    useful:

    **The lock sentence** (these laws, law 2; the owner's rule, J144: "Locked regarding walls and aqueduct and similar
    structure should be considered for placement, not permanent shape"). The **similar structures** are walls of every
    kind — an enceinte with its stretches, gates and towers, a palisade, a quay wall, a retaining wall — and the raised
    ways — a viaduct, an elevated road, an aqueduct — with their supports, ramps, stairs, feet, spans and arch vaults
    (these laws' *meeting*). A placement lock or a pin (§7.2; T10 `hold`; these laws' *held*) holds a similar
    structure's **placement** — a wall's trace and course, a raised way's course and deck line, an arch vault's span —
    and never its **shape** where two of them meet: each soft reading this table gives at a meeting — a `vault` span
    read `open` with no chamber while a wall stands over it and its chamber laid again once none does, a run's top
    capped beneath a road deck's span, a wall merged round an aqueduct's arch or pier — and a gate made by hand where a
    road deck's carried way crosses a wall (*down before the wall*) is made whether either side is placement-locked or
    neither, the newer structure's own bends (a stretch bent locally, a support slid off a band) being its own (law 2
    (a)), and what a meeting reshapes stays locked (a locked arch vault's lock kept with its key, so the chamber V04
    lays again carries it). No meeting of two similar structures is refused, skipped or altered for a placement lock or
    pin: that axis is one case (column C8). A shape lock is honoured: no op makes or deepens a meeting that changes a
    shape-locked thing — no wall line, band or strip newly across its `vault`-use spans' strips, no aqueduct merged into
    it, no soffit lowered over it, no gate made in it —, the newer bending itself, else giving way (law 1 (10)). A thing
    drawn, dragged, declared or placed by hand and not locked holds nothing and meets as an unlocked one (these laws'
    *held*). **Its reach** is law 2's *Entry*: whether an event may act on its own target at all is settled before any
    meeting — by hand a target the user locked (T10 `hold`) refused by §7.1's lock row, nothing written, and a target
    drawn or declared and not locked changed as an unlocked one, its event then taking its cell; a carve or a moved
    river that would re-trace a run of a locked wall refused as across any locked wall (`refuse.water`; §4.11 *Other
    crossings*), so the bent group's carved or river-moved run is never locked; by the engine or a hazard a target §7.2
    *Protection*, V06 §3.1 and V05 §3.16 (2) protect kept as they keep it, the ruin lapping round it. Once the event
    acts, the meeting it makes takes its cell. **The three guards** are J144's guardrails as these laws state them:
    **(G1) Local** is law 2 (a)–(b)'s reach — a held structure's shape changed only inside the meeting's reach, its
    course or trace never re-routed; **(G2) Shown** is law 4's (G2) — the fate **reshaped** by hand (§7.3 item 4), a
    `reshaped` entry in the report's changes at generation, a regeneration, an epoch and a village derivation (§5.4's
    `ReportEntry`), the event's undo restoring it; **(G3) No lawful local shape** is law 2 (c) — by hand
    `refuse.raised.meeting` (§7.1; item 101 R2); at generation or a regeneration the newer structure not built (a raised
    way, reported) or its trace taking F-WALL's raised-way rung (§5.2); at an epoch waiting (`raised.waited`,
    `walls.waited`, V06 §2.10), a run an epoch's water op would re-trace taking F-REDERIVE's raised-way rung, never
    widened past the towers the water leaves unaffected, that op itself waiting where the rung finds no shape; at a
    village derivation VS3's F-V-RAISED (V07 §3.13); each ladder's raised-way rung running alone; neither held thing
    moved or broken. A building is held only on the axis the user locks (these laws' *held*), and a wall gives way to a
    held building seated in an arch vault (law 1 (9); *beneath*, *A held building in an arch vault*). A **retaining
    wall** has no strip, gate or closure, so no row of this table reads it — its band is its line, and its
    decorative towers' footprints are kept where law 1 (5) admits them, as any tower's (one it lays moved
    along its line to the nearest place these laws admit it, law 2 (a), law 3; a standing one never moved, law
    1 (11)) —, and *beneath* reads its line once: a `vault` span whose under-deck strip it crosses is read
    `open` while it lies there, whichever was laid first and whatever its condition, so no chamber stands
    across its step (law 1 (8); *A `vault` span under the wall*). The deck passes over it as over the ground
    it levels and a support stands on its line built against it, its height read at its station on the low
    side ((4): the deck's level less the lower `levelledGroundCm` there); generated levelling never reaches an
    under-deck strip (a hole for S10 and S11, §4.6); a retaining wall drawn or moved across a standing raised way (T3
    `retaining`, a T2 terrace stroke, its chain grip's `moveVertex`, a terrace level's re-expansion: law 4) levels no
    ground inside its under-deck strip and passes beneath it as any part-0 line, through a support built against it,
    nothing of the raised way written but the chamber V04's reconcile removes from a `vault` span it crosses (one of the
    stroke's consequences; a placement-locked one's *reshaped*, its lock kept with its key) — save that it gives way to
    a held building as a wall does, and to a `vault`-use span of a shape-locked raised way (law 1 (9), (10); *A held
    building in an arch vault*): a stroke across the strip of such a span is moved to the nearest place these laws admit
    it (law 2 (a), law 3; item 101 R2; part of the stroke's bend in §7.1's catch-all line, a
    retaining wall's move: law 4), and with none is refused, `refuse.raised.meeting` naming the nearest such building or
    raised way, no Unlock offered (law 2 (c)); and its own events (`DeclineOp`'s retaining member, `repairRetaining`, a
    landfall's row, a hand `delete`) write it alone (T110-1), a chamber its removal lets V04 lay again excepted.

    **Strips, zones and nearest points** (these laws' terms and law 3). A raised way's under-deck strip — and with it a
    road deck's fixed-place zone and a held building's widened strip (*beneath*) — is read from its record whatever its
    spans' and supports' `state` (the deck's plan, §4.6, as the way-and-channel table's lead reads a fallen span's
    strip), so every rule below that keeps a gate, a tower, a fixed place or a line out of one holds under a fallen span
    as under a standing one — an aqueduct's over crossing admitting what law 1 (5) and (6) admit, each span read by its
    recorded soffit —, and a span or support `repairRaised` raises again stands over
    nothing those rules keep out. **Several raised ways:** every rule below reads the standing raised ways one by one —
    a thing kept or moved out of one's strip or zone stopping only where these laws admit it against each, never in
    another's that bars it (these laws' terms, law 1 (4)–(6)) — and where the bent group's strips of two or more raised
    ways meet, the bent-group sentence makes its moves on their union as it says, which law 1 (4) read against each
    gives a line. **Footprints:** a tower or a gate is in a strip or zone where its footprint meets it — the tower's
    (`Tower.footprint`) or an end post's, the gatehouse's with its passage, and a gate with no gatehouse its passage
    across the band (§4.8; S10's step (0); V07 §3.4) —, and a fixed place where its own points (a river crossing's
    `Gate.banks`, an anchor) or the footprint of the gate or tower standing there meet it; every text and bar of the set
    that keeps a gate, a tower or a fixed place out of a strip or zone, or counts one in it, reads it so. **Nearest
    points:** wherever a rule below places a thing the op itself lays or places along a line at the nearest point clear
    of a strip or zone (law 2 (a): a place an event or costless rule sets, a pull's or cost field's place being its own
    cost's; a standing one is never moved, law 1 (11)) — a tower along the trace, a gate along
    its way or along the trace, a river crossing along the river, an anchor along its barrier's edge — it goes to the
    nearest point of that line, in either direction from where the rule would place it and never past the line's ends,
    at which these laws admit it against each raised way (a line that crosses their strips more than once has one such
    point each way), ties by law 3's key; a fixed place with none within its reach takes (G3) (the fixed-place
    sentence); a gate the user slides into a strip goes back along the trace, on the side its grip came from, to the
    first point at which these laws admit its footprint; the bent-group sentence's moves keep their own ties; and
    nothing the castle's law fixes is moved by this rule (the fixed-place sentence).

    **The four outcomes** (each named here once; every other text cites these laws with the outcome's name):

    * ***over the band*** (law 1 (2), (4)–(6) with law 2 (a)–(b)) — an aqueduct created across a standing wall, held or
      not (a road deck takes *down before the wall*): it crosses each wall at its level (law 1 (2)), its supports kept
      off the band by (3) (its own derivation) — **over** where its channel there runs above the wall's top, every span
      over the band clearing the wall's top, the band beneath an arch (item 110 (b)); **merged** where its channel runs
      within the wall's height, the band built up to and around its arch there at the wall's own top, no gate, postern
      or tower in it —, and its ends kept by its course off the band and the wall strips (law 1 (4), these laws' *ends*;
      §4.3 *Where it may not go*), whatever the runs' condition; each span over the band is ruled by the span rule as
      anywhere, a `vault` one read `open` while the wall stands (*beneath*); a gate, postern, tower or fixed place of
      the trace stands under it only where these laws admit it, the course otherwise keeping clear of it (law 1 (4)–(6),
      read with their terms; §4.3 *Where it may not go*; V06 §3.19 (5); the fixed-place sentence; a hand course
      bent there, §7.1) — and at generation, where S7 lays the towers after an aqueduct at S6's end, a tower its spacing
      or a turn would place where law 1 (5) bars it is placed along the trace at the nearest lawful point (law 2 (a),
      law 3), unreported, S6's aqueduct having planned round the fixed places the trace and the
      castle record —; nothing of the wall is written, the run beneath keeping its own condition (a `breached` or
      `dismantled` run a gap beneath the arch); the meeting then reads as *beneath*. A course that cannot cross so
      within (3)'s and (4)'s bounds is (3)'s and (4)'s: a generated one dropped (at an epoch waiting, `raised.waited`),
      a declared one bent to the nearest course that can, else refused (`refuse.raised.meeting`, law 2 (c)); a
      placement-locked wall is met as an unlocked one, a merge round the aqueduct's arch or pier shown by law 4's (G2),
      a shape-locked one never merged into (law 1 (10)).
    * ***down before the wall*** (law 1 (3) with law 2 (a) and *Carried way*) — a road deck (a viaduct's or an elevated
      road's) never crosses a trace standing when its course is laid — at S3 (7) the stage-1 boundary (from S3 (9) on,
      its trace) and at S5b the stage's picked boundary counting as standing; a frame growth's extension, which keeps
      the deck's course, is no course laid (C12). A deck that is a priced option of a route's solve (S4's or S5b's
      viaduct, an epoch route's) comes down to a ground vertex before the trace (§4.3 *Where it may not go*), its route
      crossing the trace on ground part 0 at a gate of its path's own gate law (§5.3's gate row; §4.8 *Gates*), decided
      by whether the trace stands when the route is solved: across a boundary the route's own derivation lays after
      solving it — at generation, at a regeneration that re-derives the trace, and at an epoch's new walled stage for
      the routes that stage solves before its trace (V06 §3.2's `growth` step: a new stage through S5–S13 on its new
      faces) — a gate that stage's gate law places (S3's — a gate route re-solved by §4.2 S3 (7) —, S5a's pins, S5b's
      spawned primaries' main gates, the way-and-channel table's row (d)); across a trace standing when the route is
      solved — at an epoch every such trace, at a regeneration one it keeps where it stands (*Newer*) — a gate standing
      in that trace (an epoch's growth crossing standing traces at gates alone, §5.3; a kept wall's gates its own), the
      route solved to one of them — so a deck makes no gate its path's gate law would not, and a gate is made in a
      standing wall by hand alone —; one that cannot is re-routed by the solver's ladder or not built, reported; a
      raised way whose two ends are fixed before its course is solved — an elevated road (`P1` to `P2`) at S6's end or
      founded, V06 §3.19's founded viaduct (`A` to `B`) — is not built where its course would cross a standing trace: at
      generation not built, reported; at an epoch waiting (`raised.waited`, V06 §3.19 (5)). By hand the course comes
      down before the trace (§7.1, `bend.raised.wall`), its ground way making its gate there by §7.3's S7 operator as
      any drawn way's (§5.3's gate row; *Carried way*) — in a placement-locked wall the fate *reshaped* (law 4's (G2)),
      §7.1's lock row not refusing it (law 2 *Entry*); in a shape-locked one no gate, the way re-routed through the
      nearest gate of that wall a way of its class may pass, else refused (law 1 (10); *Carried way*) — and the stroke's
      course beyond the trace carried on as that ground way on ground part 0 to the stroke's end, a second raised way
      only by a second declaration; a course that cannot come down there is refused (`refuse.raised.meeting`, law 2
      (c)). The meeting does not arise.
    * ***beneath*** (law 1 (2)–(9) with law 2 (a)–(b)) — a wall's run and a standing raised way, read from what stands,
      never stored: the trace keeps its course but where a crossing below bends it, and its strips, band, towers and
      gates are laid as anywhere (S7, S10, VS3, V06 §3.7, §7.3's S7 operator). *Where the line crosses* (law 1 (2)–(4)):
      a trace's line, band and wall strips never lie over a raised way's ends (law 1 (4), these laws' *ends*). It
      crosses an aqueduct's deck line wherever it meets it, entering its strip on one long side, leaving by the
      other and meeting the deck line once there, in the form the aqueduct's level there gives (law 1 (2)): over where
      its channel runs above the wall's top — under a span that clears the wall's top, or through a
      `cleared` support's ring (open ground: both its spans fallen, C5) where every span above the band,
      standing or fallen, clears that top, never through a standing support (its `state` absent or `ruined`)
      —; merged where its channel runs within the wall's height, the band built up to and around the arch or pier there;
      so an aqueduct crosses every wall through one of its arches, over it or within it (item 110 (b); the program's
      reading, J122), a trace passing round its end crossing nothing of it; a road deck's deck line under a span or at a
      support, the trace's run dated after that stretch of the deck (law 1 (3)); and a road deck's carried way on its
      ground course beyond a foot, through a gate there on ground part 0 (these laws' *beyond the foot*). **Line and
      band**: every keep-clear these laws state for a wall's line, band or wall strips binds its line — a
      line admitted only where it and the band and wall strips it carries there (§4.8's rows along the
      stretch profile) keep each clause, so that the line is kept from a raised way's ends by the wall
      strips' width there (law 1 (4)) and, where an aqueduct's crossing is over, from its standing support by
      the band's half there (law 1 (2); *the edge*) —; a road deck's support keeps nothing off (the band laid
      through it, law 1 (3)), nor an aqueduct's where the crossing is merged (the band built round it, law 1
      (2)); a held building's widened strip and the bent group's strip each count the band's half already, so
      a line is kept out of them as they are drawn. A trace laid by the `EnceinteStrategy`'s pull or a cost
      field — S3's (reading the raised stretches of (5)'s routes, re-solved by §4.2 S3 (7), as standing)
      and S5a's at generation and at a regeneration, an epoch's circuit, contraction, re-anchored stretch (V06 §3.7.6
      (1)) or dossier-admitted circuit, and a hand `contractWall`'s (§4.11: S5a's trace
      step) — searches only the shapes these laws admit, its line read with the band and wall strips it carries there
      (law 1 (2)–(6), (9)–(11) and *Carried way*, read with their terms; law 2 (a): its own cost choosing among them;
      *Line and band*), as §4.4 S5a *Trace* (2)'s pull and V06 §3.7.4 (2)'s cost field do; S5a's pull keeps each
      arterial's crossing of the boundary as the stage's picked boundary had it, at its pin or under its deck, and a pin
      these laws bar there is resolved by law 2 in its order — (a) moved along its way, the trace laid through it, (b)
      its way re-routed, (c) F-WALL's raised-way rung, law 2 (c)'s outcome on its path (§4.4 S5a *Trace* (2)) —; a way
      S5a pins no gate for meets the trace as anywhere on ground part 0. A stretch laid by neither takes the bent-group
      sentence (below). The band is laid through every road deck's support standing in it, against an aqueduct's support
      whose ring its band's half touches at **the edge** (the ring's boundary, the band entering no further) where the
      crossing is over, and round its arch or pier where merged, built into the run's line, never cut round it, so where
      one goes the run stands whole across its footprint. *The cap* (law 1 (7)): beneath a standing part of a road deck
      — a span whose `state` is absent, or a standing support (its `state` absent or `ruined`) bearing a standing span —
      the run's top and walk, wherever any part of its band lies beneath it, are the lower of its own top and the lowest
      soffit there (the span's own, or that of each standing span the support bears) (the soffit lower: the arch walled
      up to its crown; the run lower: the arch open above it); beneath an aqueduct, over or merged, and beneath a fallen
      span, a support bearing none or no deck, its own top (§4.5's daylight casters, §8.4's casters and heightfield,
      §11.1's glTF wall and CityJSON wall objects read it). *A `vault` span under the wall* (law 1 (8)) — one whose
      under-deck strip a wall's band or wall strip meets, whichever was laid first, or, once `absorbWall` has merged a
      ring's band and strips into the blocks (V06 §2.8), a run of that absorbed record not yet `dismantled` crosses (row
      W8), or a retaining wall's line crosses, whichever was laid first and whatever its condition (the lock sentence's
      retaining wall) — is read `open` by every reader of its `use` while that band, strip, run or line lies there,
      whatever the runs' condition: no arch vault in it (V04 §3.5.4 (d) (1)), no end walls (§11.1's 3-D row) and no
      `BridgeRoom` (its CityJSON row), `open` in §11.1's GeoJSON `span` and in the tellings of V09 §4.20.6 (2) and V10's
      raised-way read, its
      under-deck strip no reservation ((6)'s lead) and an `open` span to §4.3's crossing rule, the way-and-channel table
      and V01 §3.17.3 (2)–(3), the band, strips, moat and retaining wall laid through it — each of those readers, and
      every other text of the set, citing this reading (§2.7's laws, law 1 (8), with its worked example "a `vault` span
      §2.7's crossing table's *beneath* reads `open`") and never restating its cases; its record unchanged (the span
      rule never reads a wall: its step (2), below), so it reads `vault` again, V04 laying its chamber again, once none
      lies there and nothing else these laws' *anything across a strip* finds there — no way's corridor or channel laid
      while it read `open` (an intervallum, a quay, a street, a lane, a track, the moat) — crosses its under-deck strip:
      such a span read `open` while that corridor or water lies there, so no chamber is laid across a way or in water,
      and a removal or re-route of that way or channel off the strip running V04's reconcile (V04 §1b.2) — every "laid
      again" of this table meaning so. A placement-locked or pinned arch vault (V04 §3.11's UC18) is read so too, by the
      lock sentence: its span held, its chamber not laid while *beneath* reads the span `open` (a wall over it, or any
      case above), its lock kept with its key so the chamber laid again carries it; each removal and re-lay of a
      placement-locked raised way's or arch vault's chamber is shown by (G2); and no wall-like line, band or strip is
      newly laid across a `vault`-use span of a shape-locked raised way, the wall bending itself, else giving way (law 1
      (10)). *A held building in an arch vault* (law 1 (9)) — a `vault` span whose chamber seats a held building (one
      seated there, V04 §3.5.4 (d), and locked by the user on either axis) — holds its span against every wall,
      whichever op would bring the wall there: the raised way's own op gives way to it as a wall does — a hand re-shape
      of its course or an Arch spacing edit (C13; a Deck height edit moves no span) that would bring a wall's band or
      wall strips across that span's strip is bent, as C13 bends an edit (3) or (4) cannot place, to the nearest course
      or spacing that keeps every such band and strip off it (item 101 R2; in that edit's own bend line), else refused,
      `refuse.raised.meeting` naming the building, no Unlock offered (law 2 (c)), and every other op that would move a
      span or widen its strip — a width or class edit, a `split`, `merge`, `warp` or `revert` — gives way the same (law
      4), a frame growth's extension keeping the old deck's stations ((7)). **A held building's widened strip** is these
      laws' held building's strip: that span's own strip (the span rule's, between its piers' inner faces) widened all
      round by the wall strips' widths (§4.8: the band's half and the wider of the inner setback and the outer setback
      with its glacis, a berm never narrowing it), so a line kept out of it keeps a wall's band and strips off that
      span's strip: a trace laid by the pull or a cost field treats it as impassable; a stretch of the bent group keeps
      its line out of it, a crossing that would enter it moved by the bent-group sentence's (i) to the nearest lawful
      crossing (by hand part of its bend, named in `bend.wall.raisedCrossing`'s line); a trace that can then cross the
      deck nowhere takes its own ladder ((G3)'s for its path: F-WALL at generation and at a regeneration, at an epoch
      `walls.waited` or, for a run an epoch's water op would re-trace, F-REDERIVE's raised-way rung, F-V-RAISED at a
      village), and by hand a stroke with no lawful crossing is refused, `refuse.raised.meeting`, naming the nearest
      held building where held buildings' widened strips alone bar it, no Unlock offered (law 2 (c)); so the building,
      its chamber and its door stand and no footprint enters a band or setback (§5.3). A building seated there and not
      locked holds nothing: its chamber is removed under a wall laid later as any chamber is, the building kept in
      existence as its kind's are. *No gate and no tower in the under-deck strip* (law 1 (5), (6), (11) with law 2 (a))
      — wherever law 1 (5) bars it —
      one whose footprint the wall's law would place there, the op itself laying or placing it (law 2 (a)), is placed at
      the nearest lawful point (*Strips, zones and nearest points*: its footprint, each raised way read alone, the
      nearest point, its ties, a slid gate's way back): a tower along the trace (S7's towers beside a trace an aqueduct
      at S6's end crossed among them, *over the band*); a gate along its way, the trace passing through it
      there — at generation and in an epoch circuit S5a's pin resolved by law 2 in its order and the trace
      laid through it (§4.4 S5a *Trace* (2)), a trace laid through no pin (a contraction, a dossier-admitted
      circuit by the hand operator's path, a stretch of the bent group) bent locally, between its nearest
      points clear of the strip on either side of the way, to pass through the gate (by hand part of its
      bend, named in `bend.wall.raisedCrossing`'s line); along the trace where the way is laid after the
      gate and follows it (a village track, V07 §3.5a (4)); and a gate the user places or slides there
      (`placeGate`, a gate's grip) along the trace, its stub or way following, the trace unchanged (row W13). A gate,
      postern or tower standing as the op begins is never moved for a meeting (law 1 (11)): the newer bends itself round
      it (law 2 (a)), else Tier-3 things move (law 2 (b)), else the op gives way (law 2 (c)). A gate or tower whose
      place the wall's own law fixes — a river's water gate, an anchor's tower, a harbour-mouth chain, a castle's
      town-side gate and vertex towers (these laws' fixed places) — never moves along: whichever is laid later keeps it
      where law 1 (4)–(6) admit it (the fixed-place sentence); a
      postern, which has no way, is placed along the trace as a tower is (law 2 (a), law 3), a
      standing one never moved for a meeting. No gate on the deck, which passes over the run and is no crossing of the
      gate law (law 1 (1); gates counted on ground part 0: §4.8 *Gates*, §5.3's gate row; a raised arterial over a
      stage's boundary pins no gate, §4.4 S5a); the moat a channel by the way-and-channel table (row e); the run's
      condition its own (item 114: a `breached` or `dismantled` run a gap beneath the deck, the deck on its own
      supports). *Reported* once per crossing of a trace laid after a raised way with that raised way's deck line, a
      trace crossing one deck line twice reported twice: at generation, at a regeneration and at a village derivation in
      `W_RAISED_CROSSING` — S7's for S3's and S5a's traces alike, VS3's for its palisade (§4.8; §5.4; V07 §3.5a) —, at
      an epoch in `walls.raisedCrossings` (V06 §2.10), by hand in `bend.wall.raisedCrossing`'s line at the dry run (a
      hand `contractWall`'s in its dry run's effects); each reshape of a placement-locked thing besides by (G2).
    * ***unchanged meeting*** (law 4: a re-check that finds nothing to resolve) — the event writes only its own records,
      as on any run or gate; nothing of the raised way is written or passed over and nothing is bent for it; the meeting
      re-reads as *beneath*.

    **The bent-group sentence** (law 2 (a) with law 3). The **bent group** is every stretch laid by neither the
    `EnceinteStrategy`'s pull nor a cost field: VS3's palisade, a stretch re-anchored by hand (an epoch's re-anchored
    stretch is the `EnceinteStrategy`'s, V06 §3.7.6 (1), and takes *beneath*'s pull), V06 §3.7.6 (3)'s quay wall, a hand
    `drawWall` (a village T3 `wall` among them), a moved trace vertex, `repairWall`'s new stretch, a run a carve or a
    moved river re-traces (§4.11 *Other crossings*; §7.3 (b) 3), and a run re-sectioned on its kept trace (row W14).
    Whatever its shape — crossing the deck, running along beneath it, entering and leaving on one side, ending at a
    support, or carrying a gate into the strip — it meets a standing raised way by one rule: **inside the raised way's
    strip its line holds lawful crossings only** (law 1 (4)), the strip here being the under-deck strip widened each
    side by the band's half there (§4.8's rows along the stretch profile) together with every place meeting it where
    these laws bar the line itself — a held building's widened strip (law 1 (9)) and, of a shape-locked raised way, each
    place from which the line's band or wall strips would lie newly across one of its `vault`-use spans' strips (law 1
    (10)) — (*beneath*), so that every part and edge below is the band's. A **lawful crossing** is a part of the line
    that enters the strip on one long side and leaves it on the other, meeting the deck line once, where these laws
    admit it with its band and wall strips (law 1 (2)–(4), (9), (10), read with their terms; its worked example *Where
    the line crosses*: of an aqueduct at its level, over or merged; of a road deck under its span or at its support, the
    band laid through it). (The strip's long sides are its edges left and right of the
    deck in spine order, each passing outside every such place on its side; a point on an end cap
    belongs to the nearer long side.) **Several raised ways**: where the strips of two or more standing raised ways meet
    (*Strips, zones and nearest points*), the rule holds for each — inside each one's strip the line holds that one's
    lawful crossings only — and the moves below are made on their union as one strip: its edge is the union's boundary,
    (ii)'s the arc of it between the entry and exit points that encloses with the replaced part no point of a deck line,
    (iii)'s the nearest point of it the end reaches without crossing a deck line, and (i)'s nearest lawful crossing the
    one law 3 picks (its crossings' moves measured along the deck lines they cross, the largest first) among those
    lawful for every raised way whose strip it enters and that its entry and exit points reach along the union's
    boundary without crossing a deck line. Every other part of the line inside the strip is replaced, between the points
    where the line enters and leaves the strip: (i) an unlawful crossing by the nearest lawful one along the deck from
    the point where it met the deck line (ties by law 3) — the line from its entry point along that side's edge to it,
    across the strip there and along the other edge to its exit point — and a crossing over a road deck's ends (these
    laws' term) by the nearer, by law 3, of the first lawful crossing under its deck and the one beyond the foot, the
    latter crossing the carried way's ground course on ground part 0 through a gate there (the form *down before the
    wall* gives a road deck); (ii) a part that enters and leaves on one side — running along beneath the deck, turning
    back, or meeting a support — by that side's edge between its entry and exit points; (iii) an end inside the strip —
    a stretch drawn, a vertex moved or a stretch re-anchored to end at a support or under the deck — by the line to the
    nearest point of the edge on the side it entered from (a stretch wholly inside the strip: the nearer side by law 3),
    an anchor so moved being the fixed-place sentence's and a standing weld vertex never moved (law 1 (11)); (iv) a gate
    whose footprint meets the under-deck strip where law 1 (5) bars it — not the widened strip above — by *beneath*'s
    *No gate and no tower*: one the user places or slides along the trace, its stub or way following (row W13); one the
    stretch makes for a ground way crossing it there along that way, the line bent through it by (i)'s path. Each move
    is by hand part of the stroke's bend, named in `bend.wall.raisedCrossing`'s one line (the op's own structure, never
    a fate: law 4), and at an epoch the stretch's crossings of the deck line are counted in `walls.raisedCrossings` as
    *Reported* says, a move being no count; a moved line stays within (G1)'s reach. With no lawful crossing along the
    deck — rare while every span's clear width between standing rings exceeds the wall's band, as V11 §3.24.2's and
    §4.8's rows give, and made possible by a table edit, held buildings' widened strips or a shape-locked raised way's
    `vault`-use spans — (G3) holds (law 2 (c)): by hand `refuse.raised.meeting`; at an epoch the stretch's op waits
    (`walls.waited`), and for a run an epoch's water op — a moved river or a carve — would re-trace, which cannot wait
    once the water has moved, F-REDERIVE's raised-way rung decides before the water is inserted (§5.2: the run never
    widened past the towers the water leaves unaffected, that water op itself waiting); at a village derivation VS3's
    ladder (V07 §3.13's F-V-RAISED).

    **The fixed-place sentence** (law 1 (6) with law 2). **Fixed places** are what the wall's own law fixes — these
    laws' fixed places: a river's water gate (the trace's crossing of a river, its bank vertices `Gate.banks`, §4.4
    *Water and the waterfront*), a stretch's anchor on its barrier with the tower item 106 (a) stands there
    (`Enceinte.anchors`, §4.4 S5a (1), §4.8 *Towers*), an `on_enceinte` castle's weld vertices (`Castle.cityWeld`, §4.2
    S3 (8)), every castle's town-side gate (§4.2 S3 (8); §4.8's pinned vertices), a castle's vertex towers, and a walled
    port's harbour-mouth chain (`Gate.mouth`: its water gate across the entrance and the tower at each head; §4.8) —
    each read with the footprint of the gate or tower standing there (*Strips, zones and nearest points*). The
    **fixed-place zone** of a road deck is these laws' zone: its under-deck strip widened each side by the wall strips'
    widths (§4.8: the band's half and the wider of the inner setback and the outer setback with its glacis, a berm never
    narrowing it) of the wall whose fixed place it is, at that place; an aqueduct has none, a fixed place standing in
    its strip only where law 1 (4)–(6) admit it. No fixed place stands where law 1 (6) bars
    it, and none, once standing, moves along the trace off its place (law 1 (11)): whichever of the wall and the raised
    way is laid later keeps them apart (law 2 (a)). **A trace laid after the raised way** places its own fixed places —
    its river crossing along the river, its anchor along its barrier's edge (the shore, bank, cliff top, gorge rim or
    marsh edge, or the earlier enceinte) — clear of the zone: a trace by the pull or a cost field treating the river's
    water and the barrier's edge inside the zone as no crossing or anchor site, its own cost choosing among the rest
    (law 2 (a)), and a place an event or costless rule sets (a stroke's crossing or anchor) at the nearest point clear
    of it (law 2 (a), law 3), a stretch of the bent group bent locally to the moved place (by hand part of its bend,
    named in `bend.wall.raisedCrossing`'s line);
    with no such point within the trace's reach (its search band; `wall.barrierReachM` for an anchor), the trace takes
    (G3) (F-WALL at generation and at a regeneration, `walls.waited` at an epoch — a run an epoch's water op would
    re-trace taking F-REDERIVE's raised-way rung, §5.2, that op waiting where the rung finds no shape —, F-V-RAISED at a
    village, `refuse.raised.meeting` by hand). **A castle sited after the raised way** is sited clear of it, never
    reshaped, nothing the castle's law fixes being moved: §4.2 S3 (8)'s hard filter takes no claim whose
    weld vertices lie where law 1 (6) bars them, and S3 (8) fixes the town-side gate at the midpoint of the
    side with the least-cost path to the plaza among the sides whose gate, with its footprint, lies where
    law 1 (5) and (6) admit it, a claim with no such side failing the filter; a claim the filter rejects is
    the siting's as any — its next candidate, then F-CASTLE's ladder from its re-site rung (§5.2: re-sited,
    reported, else kept without a bailey, reported) —; by hand a castle sited or resized (`setAttr(castle,
    'site' | 'baileyArea')`, T3) is sited so, its claim moving whole to the nearest lawful site — or,
    for a bailey edit, its area to the nearest lawful value —, measured back along the drag, else refused (law 2 (a): a
    given value, law 3 picking the nearest; (c)); and its curtain, inner ward and outer arc, fixed by its claim, are a
    wall line law 1 governs, so the siting admits no claim whose curtain law 1 bars and S6 reads the curtain from the
    claim's commit (law 2 *Not yet built*). **A harbour-mouth chain laid after the raised way** (S7, V06 §3.7.6 (3), a
    hand `placeGate` re-adding it) is laid across the entrance at the nearest heads or shore points, along the entrance,
    whose gate and towers lie where law 1 (5) and (6) admit them; with none it is not laid at generation
    (`W_RAISED_MEETING`), waits at an epoch (`walls.waited`) and is refused by hand (law 1 (6), law 2). **A raised way
    created after the wall** plans round every fixed place (law 2 (a)): it keeps each where law 1
    (4)–(6) admit it (its zone, strip and ends read by these laws' terms), as it keeps the trace's
    gates and towers where law 1 (5) admits them (*over the band*; at generation S6's aqueduct reads
    the fixed places the trace and the castle record before S7 lays their towers), a course that cannot
    taking (G3); every text that keeps a road deck's strip clear of fixed places means this zone.

    **What *beneath* reads from each raised-way state** (the columns, each a state law 1 reads, C8 law 2's *Entry*): C1
    created across the wall, held or not, and C11 created across a `breached` or `dismantled` run — *over the band* or
    *down before the wall*; C2 standing, in use or `abandoned` (V06 §3.19.2 (2)) — the cap beneath a standing road deck
    (an aqueduct capping none, law 1 (7)); C3 one span over the band fallen (`ruined` or `cleared`) — the run at its own
    top beneath it; C4 every span over the band fallen — its own top throughout; C5 a support in or by the band cleared
    or toppled — a support `cleared` only once both its spans have fallen (V06 §3.19.2 (3)), a `topple` ruining it and
    both its spans (V06 §3.19.2 (4)) — the band whole across its footprint (a `ruined` support's stump drawn in it, a
    `cleared` one's not); a trace laid after a support is `cleared` meets its ring as open ground, crossing through it
    only where these laws admit the crossing (law 1 (2); *Where the line crosses*), one laid
    after it is `ruined` meets the stump as a standing support (law 1 (2); no ramp or stair stands in a band,
    *beneath*); C6 a `vault` span over the trace breached with its chamber — no chamber stood under the wall (V04), the
    span `ruined` read as C3; C7 deleted or suppressed — no raised way stands, so no meeting: the row's event acts as on
    any wall, V04's vaults of the way gone with it, a suppressed generated way staying removed (item 110 (f), T110-3);
    the column's cells name no test of this table, the event's own wall tests at its home holding it (§4.8, §4.11, V06
    §3.7, V07 §3.4); C8 held — the raised way, the wall or both locked by the user (a pin among them; these laws'
    *held*): placement-locked, as the same cell unheld, by the lock sentence — no refusal of the meeting, each reshape
    of the held thing shown (G2); shape-locked, no meeting made or deepened that changes it, the newer bending itself,
    else giving way (law 1 (10), law 2 (c)); whether the row's event may act on its own target at all is the lock
    sentence's reach (law 2 *Entry*): an op whose own target — a wall it converts, deletes, repairs, gates, re-sections,
    moves or re-anchors, a raised way it edits — the user locked (T10 `hold`) is refused by §7.1's lock row before any
    meeting, nothing written, while a wall drawn or a raised way declared and not locked is changed as an unlocked one
    and takes its cell, and a carve or a moved river across a locked run is refused as across any locked wall; so "no
    `refuse.locked`" in a C8 cell means the meeting refuses nothing, and each C8 cell's outcome holds once its event
    acts; C9 carried down to the village product — as C2 (V07 §3.12: the standing fabric unchanged); C10 repaired by
    `repairRaised` — as C2, the repair writing the raised way alone, the span or support standing again over a strip
    this table kept clear whatever its state (*Strips, zones and nearest points*), and a hand repair of a dismantled
    span or a `cleared` support, which bends to a new raised part on the way's line (V06 §2.8), keeping the way's course
    as C12's extension does: it is no course laid — a span over a trace laid after the way stands over it again as the
    fallen one did (*beneath*), its new supports placed by (1)–(5) against the obstacles standing then and slid off
    every standing band by (3), aqueduct or road deck alike, its strip and a road deck's zone already clear (*Strips,
    zones and nearest points*) —, and a part whose supports (3) and (4) cannot place off a standing band within their
    bounds is refused (`refuse.raised.meeting`, (G3)), a part another obstacle bars taking the support step's own
    outcome for a declared part (these laws govern meetings only), and a repair that would cap a shape-locked run
    beneath a road deck refused, at an epoch waiting (law 1 (10)); C12 extended by a frame growth — the old deck as it
    stood, its old end span kept as it stood wherever a wall-like structure crosses it (law 2 (c)); the extension keeps
    the deck's course ((7)), so it is no course laid: where it crosses a band its new supports are slid off that band by
    (3), aqueduct or road deck alike, and the run beneath is read by *beneath*; past a bound the extension that bends by
    (7)'s bound sentence is a course laid then, meeting each standing wall as C13's re-shaped stretch does; C13 edited
    by its own op — a hand re-shape of its course (`moveVertex` on a course vertex), `spanSpacingCm` (V09's Arch
    spacing) or `clearanceCm` (Deck height), and every other op that names it — its width or class (`setAttr`,
    `downgradeWay`, `upgradeWay`), a `split` or `merge`, a `warp` that moves it, a `revert` —, each re-checking by law 4
    and bent by law 2 (a) to the nearest lawful value, a class change that only its old class makes lawful taking law 2
    (b), then (c) (law 3's last sentence) — the support step re-run where (1)–(5) say, against the obstacles standing
    then: a station in a band laid after slid off it, the band whole across its old footprint (*beneath*); a re-shaped
    aqueduct stretch across a standing band *over the band*; a re-shaped road deck stretch — a re-shape lays no end, so
    one that would carry a standing deck newly across a trace is bent back along its drag, else refused
    (`refuse.raised.meeting`), a crossing it keeps keeping its date (these laws' *Order*, law 2 (a)) —; an edit (3) or
    (4) cannot place bent to the nearest lawful value of what was edited — a spacing or a height to the nearest that
    places every station, never another course; a re-shape to the nearest course (item 101 R2) —; a held building in an
    arch vault kept as *beneath* says, the edit bent to keep law 1 (9) for that building, else refused naming the
    building; every other wall event meets an edited raised way as it stands, as C2.

    **Paths and tests.** Each row names its paths — generation (G), a regeneration (R), an epoch (E), a village
    derivation (V), a hand edit (H) — and is law 4's re-check on them; each cell holds on each of its row's paths. Each
    cell names the test that holds it: "·S" after a test clause is that clause run over §13.2's **state sweep** at the
    column's state (each state on its own run, made by the sweep's scripted ops before the row's event); "as Wn·Cm"
    gives that cell's outcome, the cell still naming its own test; "—" in C1 and C11 means a raised way created after
    this event meets the wall as the event left it, by W1·C1 or W1·C11. C1 and C11 are the raised way's creation, not
    the row's event: their records are the raised way's creating commit ((6): at generation inside S4's or a stage's S5b
    route solve or at S6's end, at an epoch V06 §3.19's founding, by hand its declaration's commit), nothing of the wall
    written but *down before the wall*'s gate, nothing reported but each reshape of a placement-locked wall law 4's (G2)
    shows (a merge round the new aqueduct's arch or pier, or a gate *down before the wall* makes by hand: by hand the
    fate *reshaped*, else a `reshaped` entry) — `W_RAISED_CROSSING` and `walls.raisedCrossings` count
    only a trace laid after a raised way crossing its deck line (*beneath*) and a channel stopped at an under-deck strip
    (row e) —; by hand its dry run bends the course, one line each: an aqueduct's to the nearest course that crosses
    each wall at its level, no gate, postern, tower or fixed place under it but where law 1 (4)–(6) admit it
    (`bend.wall.aqueductArch`), a road deck down before the trace (`bend.raised.wall`); a course that cannot is refused
    by hand (`refuse.raised.meeting`), at generation not built, reported, and at an epoch waits (`raised.waited`, V06
    §3.19 (5)). C12's and C13's records are the raised way's own op's ((7); its edit event). The last column gives what
    the event itself writes (its op and records), the gates and §5.3's checks, and a hand edit's bend, fate and report —
    the same for every cell of its row.

    | wall event (paths) | C1 created across it | C2 standing | C3 one span fallen | C4 all spans fallen | C5 support cleared or toppled | C6 `vault` span breached | C7 deleted or suppressed | C8 held (either side) | C9 carried down | C10 repaired | C11 created across a breached or dismantled run | C12 frame growth | C13 edited by its own op | the event's op and records · gates and §5.3 · bend, fate and report |
    |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
    | **W1** a trace the engine lays — S3's or S5a's with S7's strips, towers and gates and S10's band (G); VS3's palisade (V); an epoch's circuit, contraction or re-anchored stretch (V06 §3.7), V06 §3.7.6 (3)'s waterfront quay wall and (4)'s dossier-admitted circuit (laid through the hand `drawWall` operator's path, counted in `walls.raisedCrossings`, no bend line), and a run an epoch's moved river or carve re-traces (E); a hand `contractWall` (H: S5a's trace step, §4.11); a regeneration's is W3 | *over the band* (an aqueduct at S6's end crossing at its level, a gate, tower or fixed place of the trace under it only where law 1 (4)–(6) admit it, S7's towers after it placed clear by law 2 (a); or V06's founding) or *down before the wall* (S4's viaducts, an S3 gate route re-solved by §4.2 S3 (7), and S5b's come down; S6's elevated road and a founded road deck, their ends fixed, not built, at an epoch waiting); a placement-locked wall met as an unlocked one, each reshape of it shown (law 4's (G2)), a shape-locked one never merged into (law 1 (10)) · T110-2 (1), (2), T-V7-48 (V) | *beneath* · T110-2 (3) (G), T110-2 (4) and T-V6-47 (E), T-V7-48 (V) | *beneath*, own top beneath the fallen span (at a first generation it cannot occur: every raised way is new) · T110-2 (4)·S, T110-2 (7), T-V6-47, T-V7-48·S (V) | *beneath*, own top · T110-2 (4)·S, T-V7-48·S (V) | *beneath*, the band whole across the footprint; a `cleared` ring open ground, crossed where *Where the line crosses* admits it, a `ruined` stump met as a standing support · T110-2 (4)·S, T110-2 (7), T-V6-47, T-V7-48·S (V) | *beneath*, no chamber, read as C3 · T110-2 (4)·S, T-V4-63, T-V7-48·S (V) | no meeting · — | as W1·C2, by the lock sentence; a creation prefix's declared walls and raised ways (a skeleton's; **Rebuild around my drawings**') meet each other in its log order, each as its declaration's commit resolved and stored it, and every generated structure meets them as structures standing before its stage, each locked one on its axis (law 2 *Newer*) · T101-4, T110-2 (4)·S (E), T110-4 (c) (V: its village rung, a raised way placement-locked) | *beneath* (VS3's palisade laid after it) · T-V7-48 | as W1·C2 (a repaired span stands) · T110-2 (4)·S | *over the band* at its level, the gap left a gap, no repair; a road deck *down before the wall* · T110-2 (1), (2), T-V6-73 | the extension keeping the deck's course, its new supports off a standing band, the run beneath *beneath*; the old deck as it stood · T110-2's frame clause (the extension after the trace), T110-2 (4)·S (E) and T-V7-48's frame-growth clause (V) (the trace after the extension) | as W1·C2 on the edited deck · T110-2 (4)·S | the trace's own batches (S3 or S5a L1; S7's L1 strips, towers and gates; S10's band; VS3's; V06's fortification batch; S1's water operator's re-trace) · gates on ground part 0: S5a pins none on a deck and resolves a pin these laws bar by law 2 in its order (§4.4 S5a *Trace* (2)), S5b spawns to `N_k` (way-and-channel table, row d); §5.3's gate row on ground part 0 · reported by *beneath* (S7's `W_RAISED_CROSSING` at G, `walls.raisedCrossings` at E), each placement-locked thing's reshape a `reshaped` entry (G2); no bend (the bent group's local moves are no hand bend); a hand `contractWall`'s dry run a hand `convert`'s line, its crossings in its effects, each placement-locked thing's change the fate *reshaped*; no lawful shape: (G3) — a hand op refused once its own pull, within its own search band, finds no lawful shape, its band never widened and never a stage left unwalled (law 2 (a), (c)) |
    | **W2** a hand stretch (H) — a `drawWall` (a village T3 `wall` among them), a moved trace vertex, a re-anchored stretch, and a run a hand carve or a moved river re-traces (§4.11 *Other crossings*; §7.3 (b) 3: a run not locked, the lock sentence's reach); a gate's slid crossing is W13, a run re-sectioned on its kept trace W14 | — | *beneath*, the stretch by the bent-group sentence (beyond a road deck's foot, across an aqueduct at its level, along the strip's edge, an end moved to it, through a gate it makes placed where law 1 (5) admits it); an arch vault in a `vault` span now under the wall removed by V04's reconcile in the commit · T110-2 (4), T110-2 (5) (a carve's re-trace), T-V9-52, T-V4-63 | *beneath*, own top beneath the fallen span · T110-2 (4)·S | *beneath*, own top · T110-2 (4)·S | *beneath*, the band whole; a `cleared` ring open ground, a `ruined` stump a standing support · T110-2 (4)·S | *beneath*, no chamber · T110-2 (4)·S | no meeting · — | as W2·C2, no `refuse.locked`; a placement-locked arch vault's chamber removed, the fate *reshaped*; a shape-locked raised way's `vault`-use spans kept clear (law 1 (10)) · T110-2 (4)·S | *beneath* (a village T3 `wall`) · T-V7-48 | as W2·C2 · T110-2 (4)·S | — | as W2·C2 · T110-2's frame clause (its ring drawn by hand: the extension after the stretch), T110-2 (4)·S (the stretch after the extension) | as W2·C2 · T110-2 (4)·S | §7.3's S7 operator over the run (a carve's or a moved river's re-trace by §4.11 *Other crossings*, a standing raised way and its reservation no F-EDIT conflict) · a gate it makes for a ground way where law 1 (5) bars one placed along that way at the nearest point these laws admit it (law 2 (a), law 3), the stretch bent through it; §5.3's gate row on ground part 0 · `bend.wall.raisedCrossing`, one line; each local move part of that bend (the op's own stroke, never a fate: law 4), a vault's removal one of its consequences, a placement-locked one's *reshaped*; no lawful shape: `refuse.raised.meeting`; the undo restores the run and the vault with the same id |
    | **W3** a regeneration re-deriving a ring under a raised way it keeps where it stands (law 2 *Newer*: a locked one) (R: Regenerate (keep), New random, a re-derivation from a stage, a village Regenerate) | — (a kept way is not re-created; a generated one the regeneration lays is W1·C1, a placement-locked wall standing before every stage met as an unlocked one, each reshape of it shown (law 4's (G2)), a shape-locked one never merged into) | *beneath*, laid by W1's rules after the kept way: a ring re-derived after the kept way (*Order*) passes beneath a kept road deck's deck line where its old trace did (law 1 (3)), keeps off its ends (law 1 (4)) and takes its carried way's gate by *Carried way*, so a ring re-derived on its old trace reproduces its strips, band, towers, gates and vaults; the routes it is derived from are laid after the kept raised way and cross it by §4.3's crossing rule (way-and-channel table, row a), so a route the raised way crossed where that rule does not admit it is re-solved, and the boundary and ring with it, every meeting still *beneath*; a pulled trace crosses an aqueduct at its level (law 1 (2)), by its own path · T110-2 (6) | *beneath* as read · T110-2 (6)·S | *beneath* as read · T110-2 (6)·S | *beneath* as read: a `cleared` ring open ground, crossed where *Where the line crosses* admits it, clear of a `ruined` stump as of a standing support · T110-2 (6)·S | *beneath* as read, no chamber · T110-2 (6)·S | a suppressed way stays removed · T110-3 | as W3·C2, a placement-locked arch vault's chamber under the ring not laid (a `reshaped` entry), a shape-locked raised way's `vault`-use spans kept clear (law 1 (10)) · T110-2 (6)·S | as W3·C2 (a village Regenerate) · T-V7-48's Regenerate clause | as W3·C2 · T110-2 (6)·S | as W3·C2 (the kept way as it stands) · T110-2 (6) | as W3·C2 · T110-2 (6)·S | as W3·C2 (the kept way as its edits left it) · T110-2 (6)·S | the regenerated stages' batches; the kept raised way written by none; V04's T2 vaults step reads the trace · gates on ground part 0 · reported as W1; no bend |
    | **W4** `DeclineOp`'s `breach` or `dismantle` of a run (E: the pathway's dismantling, V06 §3.7.2 (2); H: a `convert`); a breach by decay is W5 | — | *unchanged meeting* · T110-2 (4) (H), T-V6-11 (E) | *unchanged meeting* · T110-2 (4)·S | *unchanged meeting* · T110-2 (4)·S | *unchanged meeting* · T110-2 (4)·S | *unchanged meeting* · T110-2 (4)·S | no meeting · — | *unchanged meeting*, no `refuse.locked` · T110-2 (4)·S | *unchanged meeting* — at a village epoch by the pathway's dismantling (V06 §3.7.2 (2)) and by a hand `convert` (law 4) · T-V7-48's hand `breach` and `dismantle` clause, T110-4 | *unchanged meeting* · T110-2 (4)·S | — | *unchanged meeting* · T110-2 (4)·S | *unchanged meeting* · T110-2 (4)·S | the runs' `condition`, `conditionEpoch` and material over the op's stretch (§2.7), nothing passed over; the `dismantle` that takes the last run of an absorbed record over a `vault` span lays its chamber again (row W8) · gates unchanged · a hand op's line as any `convert`, a chamber it lays again one of its consequences (a placement-locked one's *reshaped*; at an epoch a placement-locked one's `reshaped` entry); no bend |
    | **W5** V06 §3.7.7's decay (`wearWall`, a breach by neglect or poverty) (E; V: V07 §3.4 (8); H: a hand `convert` `wearWall` or `neglect`) | — | *unchanged meeting* · T114-3, T-V6-73, T110-2 (4) (H), T-V7-48's decay clause (V) | *unchanged meeting* · T-V6-73·S | *unchanged meeting* · T-V6-73·S | *unchanged meeting* · T-V6-73·S | *unchanged meeting* · T-V6-73·S | no meeting · — | *unchanged meeting* · T-V6-73·S | *unchanged meeting* (V07 §3.4 (8)'s decay) · T-V7-48's decay clause | *unchanged meeting* · T-V6-73·S | — | *unchanged meeting* · T-V6-73·S | *unchanged meeting* · T-V6-73·S | the draws over every run alike, none filtered for a deck · gates unchanged · by hand a `convert`'s line; no bend |
    | **W6** V06 §3.7.2 (1)'s gate opening, `gateToJunction` (E; H: a `convert`) | — | *unchanged meeting*: no gate stands under a road deck, so none it opens lies under one; a gate it opens under an aqueduct's arch that clears it (these laws, law 1 (5)) becomes a junction there, its square laid as at any gate and read across the span's strip by law 1 (8) · T-V6-47, T110-2 (4) (H) | as W6·C2 · T-V6-47·S | as W6·C2 · T-V6-47·S | as W6·C2 · T-V6-47·S | as W6·C2 · T-V6-47·S | no meeting · — | as W6·C2 · T-V6-47·S | as W6·C2, at a village epoch's pathway (a palisade neglected or superseded, V06 §3.7.3, V06 §3.7.6 (4)) and by a hand `convert` (law 4) · T-V7-48's hand `gateToJunction` clause, T110-4 | as W6·C2 · T-V6-47·S | — | as W6·C2 · T-V6-47·S | as W6·C2 · T-V6-47·S | the junction (and square) as at any gate · gates on ground part 0 · a hand `convert`'s line; no bend |
    | **W7** `wallToWay` (E; H: a `convert`) | — | the ring road by the way-and-channel table (row c), read in the dry run as after the op: each `vault` span the old wall stood over read as *beneath* reads it then — `vault` where *beneath* reads it so once the op commits, its chamber laid again by V04 in the commit and the ring road kept off its strip; else `open`, the ring road crossing under it by the crossing rule · T110-2 (8), T-V6-47 | as W7·C2 at that state, a re-laid vault `collapsed` where its span or a bounding support has fallen (V04 §3.5.4 (d) (2)) · T110-2 (8)·S | as W7·C2 · T110-2 (8)·S | as W7·C2 · T110-2 (8)·S | as W7·C2 · T110-2 (8)·S | no meeting · — | as W7·C2, no `refuse.locked` · T110-2 (8)·S | as W7·C2, at a village epoch at a superseded palisade's pathway's end (V06 §3.7.2 (3)) and by a hand `convert` (law 4) · T-V7-48's hand `wallToWay` clause, T110-4 | as W7·C2 · T110-2 (8)·S | — | as W7·C2 · T110-2 (8)·S | as W7·C2 · T110-2 (8)·S | `retypeEdges`, S9's `corridorUnion`, the ring road's re-route by §7.3's S4 operator in the dry run · gates become junctions (none under a road deck; one under an aqueduct's arch that clears it a junction there, as W6·C2); no junction with the raised way · the re-route its own, the vault one of its consequences (a placement-locked vault's *reshaped*) |
    | **W8** `absorbWall` (E; H: a `convert`) | a raised way created across the absorbed record's line (V06 §3.19's founding; a hand declaration) meets each of its runs not yet `dismantled` as a standing wall — the band as it stood over that run before the absorb an obstacle of (3), so an aqueduct *over the band* at its level and a road deck *down before the wall* (that run's line a standing trace), no gate, tower or fixed place of theirs under it but where law 1 (4)–(6) admit it, and a road deck's zone clear of their fixed places —, a `dismantled` run none · T-V6-11 | *unchanged meeting*: the band and strips merged into the blocks (V06 §2.8), the runs standing and dismantled in time as any (row W4); a `vault` span the old wall stood over read `open` while a run of the absorbed record not yet `dismantled` crosses its under-deck strip (*beneath*), V04 laying its chamber again in the commit of the `dismantle` that takes the last such run, or in `absorbWall`'s own where none is left · T-V6-11, T110-2 (4) (H) | as W8·C2 · T-V6-11·S | as W8·C2 · T-V6-11·S | as W8·C2 · T-V6-11·S | as W8·C2 · T-V6-11·S | no meeting · — | as W8·C2 · T-V6-11·S | as W8·C2, at a village epoch at a superseded palisade's pathway's end (V06 §3.7.2 (3)) and by a hand `convert` (law 4) · T-V7-48's hand `absorbWall` clause, T110-4 | as W8·C2 · T-V6-11·S | as W8·C1, a `breached` run standing and a `dismantled` one none · T-V6-11 | as W8·C2 · T-V6-11·S | as W8·C2 · T-V6-11·S | `absorbWall` (V06 §2.8) and V06 §3.7.2 (2)–(3)'s dismantling · gates go with their runs · a hand `convert`'s line, a chamber laid again by hand one of its consequences (a placement-locked one's *reshaped*; at an epoch a placement-locked one's `reshaped` entry) |
    | **W9** the hand-off down that makes the enceinte the village's palisade (E) | — | *unchanged meeting* (V07 §3.12: the standing fabric unchanged); VS3's later re-lay is W1·C9 · T-V7-48 | as W9·C2 · T-V7-48·S | as W9·C2 · T-V7-48·S | as W9·C2 · T-V7-48·S | as W9·C2 · T-V7-48·S | no meeting · — | as W9·C2 · T-V7-48·S | as W9·C2 (this column) · T-V7-48 | as W9·C2 · T-V7-48·S | — | as W9·C2 · T-V7-48's frame-growth clause | as W9·C2 · T-V7-48·S | the plan's revival (V07 §3.12) · the palisade's gates on ground part 0 · — |
    | **W10** `repairWall` (E; H) — on a `dismantled` run its bend, a new stretch drawn on its line | — | *unchanged meeting*; the bend's new stretch is a stretch of the bent group, W2·C2 · T110-2 (4), T114-3's landfall clause (E) | as W10·C2 · T110-2 (4)·S | as W10·C2 · T110-2 (4)·S | as W10·C2 · T110-2 (4)·S | as W10·C2 · T110-2 (4)·S | no meeting · — | as W10·C2 · T110-2 (4)·S | as W10·C2 · T-V7-48's `repairWall` clause | as W10·C2, neither repair waiting on the other · T110-2 (4)·S | — | as W10·C2 · T110-2 (4)·S | as W10·C2 · T110-2 (4)·S | `repairWall` (V06 §2.8) · gates unchanged · `bend.wall.newStretch` on a dismantled run, its new stretch's moves in `bend.wall.raisedCrossing`'s line |
    | **W11** a hand `delete` of a run or of the enceinte (H) | — | *unchanged meeting*: the run (its band, towers, gates) removed, the raised way untouched; V04 lays again an arch vault the run stood over · T110-2 (4), T-V4-63 | as W11·C2, a re-laid vault `collapsed` where its span has fallen · T110-2 (4)·S | as W11·C2 · T110-2 (4)·S | as W11·C2 · T110-2 (4)·S | as W11·C2 · T110-2 (4)·S | no meeting · — | as W11·C2 · T110-2 (4)·S | as W11·C2 · T-V7-48's hand `delete` clause | as W11·C2 · T110-2 (4)·S | — | as W11·C2 · T110-2 (4)·S | as W11·C2 · T110-2 (4)·S | §7.1's `delete` · its gates go with it · fates in the dry run (a placement-locked chamber laid again *reshaped*), an unheld one among its consequences; no bend; the undo restores the run and removes the vault again |
    | **W12** V05's landfall over a run beneath a deck (V05 §3.16 (4)) (E) | — | *unchanged meeting* for each record: the run `breached` by the landfall's wall row, the spans and supports its footprint covers `ruined` by theirs — one already `ruined` kept, one already `cleared` kept `cleared` and no member (V05 §3.16 (4)) —, each repaired by its own op (`repairWall`, `repairRaised`), neither waiting on the other · T114-3's landfall clause, T-V5-14 | as W12·C2 · T-V5-14 | as W12·C2 · T-V5-14 | as W12·C2 · T-V5-14 | as W12·C2 · T-V5-14 | no meeting · — | the locked side kept, never covered — content the ruin laps around, no member (V05 §3.16 (2); F-SKY-LANDFALL; the lock sentence's reach, law 2 *Entry*) — and the other side as W12·C2: a locked raised way's spans and supports kept and the run beneath `breached`, a locked run kept and the spans and supports over it `ruined` · T-V5-14 | as W12·C2 (`sky.islands` runs at every rung, V06 §3.2) · T-V5-14 | as W12·C2 · T114-3's landfall clause | — | as W12·C2 · T-V5-14 | as W12·C2 · T-V5-14 | the landfall's batch (V05 §3.16 (4)–(5)) · a covered tower or gate lies inside its `breached` run (no state of its own), as on any landfall · its undo restores the run and the raised way's parts |
    | **W13** a hand `placeGate` (§7.1's sugar: a stub crossing the trace at `at`), or a gate's crossing slid along the trace by its grip (`moveVertex`, §7.1's T3 row) (H) | — | at an `at` or a slide's end where law 1 (5) bars a gate (read with these laws' terms; its way under an aqueduct passing the strip by the crossing rule, law 2 (a)), moved along the trace to the nearest point these laws admit — a placed gate to the nearer such point, ties by *Strips, zones and nearest points*, a slid one back to the first such point on the side its grip came from (law 3's drag clause) —, the stub or the gate's way following, the trace unchanged, else refused (`refuse.raised.meeting`, law 2 (c)); elsewhere *unchanged meeting* · T110-2 (4), T-V9-52 | as W13·C2 · T110-2 (4)·S | as W13·C2 · T110-2 (4)·S | as W13·C2 · T110-2 (4)·S | as W13·C2 · T110-2 (4)·S | no meeting · — | as W13·C2, no `refuse.locked` · T110-2 (4)·S | as W13·C2 · T-V7-48's hand `placeGate` clause and its bar (0 gates where law 1 (5) bars one) | as W13·C2 · T110-2 (4)·S | — | as W13·C2 · T110-2 (4)·S | as W13·C2 · T110-2 (4)·S | the sugar's expansion (§7.3's S7 operator makes the gate at the stub's crossing, §7.1) or the slide's `moveVertex` · gates on ground part 0, none where law 1 (5) bars one · `bend.wall.raisedCrossing`'s gate form, one line |
    | **W14** a standing wall re-sectioned on its kept trace — a hand `setAttr` of a stretch's grade (`profile/<arc ordinal>/grade`) or of the enceinte's kind, re-derived by §7.3's S7 operator (H); V07 §3.11's palisade REPLACEMENT, rebuilt in stone on the palisade's trace, its gates kept, never moved for a meeting (law 1 (11)) — the REPLACEMENT waiting where a standing gate's stone footprint would lie where law 1 (5) bars it, or its new top would rise past the soffit of an aqueduct's arch over a kept gate (law 1 (5)) (E: a village epoch; law 2 (a), (c)) | — | the run laid again in its new section on its kept trace as a stretch of the bent group (the bent-group sentence: its line kept where its new band crosses lawfully, re-traced locally where it would not), its standing towers and gates kept, a re-section whose new footprint of one would lie where law 1 (5) bars it, or whose new top would leave one in a crossing law 1 (5) bars (an aqueduct's arch no longer clearing the wall), having no lawful shape there (law 2 (c)), each `vault` span its new band or strips meet read `open` and each they leave laid again (*beneath*) · T110-2 (4) (H), T-V7-48 (E) | as W14·C2 · T110-2 (4)·S | as W14·C2 · T110-2 (4)·S | as W14·C2 · T110-2 (4)·S | as W14·C2 · T110-2 (4)·S | no meeting · — | as W14·C2 · T110-2 (4)·S | as W14·C2 (the REPLACEMENT under a carried-down raised way) · T-V7-48 | as W14·C2 · T110-2 (4)·S | — | as W14·C2 · T110-2 (4)·S | as W14·C2 · T110-2 (4)·S | §7.3's S7 operator over the run, its strips re-cut by S10's step (0); V07's REPLACEMENT batch · gates kept, on ground part 0 · by hand `bend.wall.raisedCrossing`'s line, each local move part of that bend (law 4), a placement-locked structure other than the run's own *reshaped*; at an epoch each crossing counted in `walls.raisedCrossings` and each placement-locked thing's reshape a `reshaped` entry; no lawful shape: (G3) — at a village epoch the REPLACEMENT waiting, `walls.waited` (law 2 (c)) |

  Nothing waits for a raised way but by the crossing table's (G3) (these laws, law 2 (c)) — a trace that no lawful
  crossing or fixed place admits — or for a held building in an arch vault or a shape-locked raised way's `vault`-use
  span (law 1 (9), (10); *beneath*), and no generated course is dropped for later work (T110-2).

  (7) **A frame growth's extension** (§3.2 (9)) keeps every station of the old deck — its key, position, support `ring`
  and `state` — and every span between two of them as it stands (`use`, `reason`, `state`, `held`); (1)–(5) and the span
  rule run on the extension alone, from the old deck's last interior station (with none, from its other foot) — or,
  wherever a wall-like structure crosses the old end span, from the old foot's point, that span kept as it stands (these
  laws, law 2 (c)) — to the deck's new end on the new ring, against the obstacles standing then — where (3)'s clear-span
  bound or (4)'s pier bound fails on it (a water face or a valley the grown frame reveals), the way being kept ((6)),
  the extension is neither dropped nor left waiting: its course bends, as (3) and (4) bend a declared course, to the
  nearest course from that station to the new ring whose clear spans and piers fit, its ring-end foot re-placed where
  that course meets the new rings (`RaisedFoot`), and meeting each standing wall as a course laid then (these laws, law
  1 (2)–(6); their worked examples the crossing table's C12 and C13) — an aqueduct at its level (*over the band*), a
  road deck never across a standing trace (law 1 (3)), no gate, postern, tower or fixed place under it but where law 1
  (4)–(6) admit it —; with none, it keeps its course (the way's line), each station (1)–(2) place slid by
  (3) off every obstacle but the water or valley whose bound it fails and off every gate's, postern's, tower's and fixed
  place's footprint (law 2 (c)), never omitted — a support in a water face kept there, a pier past `maxPierM` kept — and
  each is reported (`raised.extendedPastBound`, V06 §2.10; at a hand Re-derive, a row of its dry run's effects) —, its
  stations' keys minted after the largest the way has held ((5)); the deck's condition at the old ring carries over:
  each span the extension lays takes the old end span's `state` (a `ruined` or `cleared` end span leaving each new span
  `ruined` or `cleared`, so only a repair raises it — V06 §3.19.2 (5)'s for a generated way, a hand Repair for a
  declared one, V06 §3.19.2 (1)) and, where that span's `use` was `held`, the same `use` held (an input override the
  extension keeps as a regeneration does, §7.2), its new supports standing (supports outlast spans, V06 §3.19.2 (3));
  with no interior station, the one old span is that end span; so no pier of the old deck moves and no footing leaves
  (V04 §3.5.0 *At an epoch*). Across a band the extension keeps the deck's course, its new supports slid off the band by
  (3) — an aqueduct's or a road deck's — and the run beneath read by these laws (law 1 (2), (7), (8); their worked
  example the crossing table, C12).
* **The clearance.** Over each crossed part-0 way the deck stands at least `clearanceCm` + `span.deckDepthCm` above that
  way's levelled ground, `clearanceCm` the held value or, absent, V11's `raisedWays.structure.clearanceCm` for the crossed
  class (cart or foot); the course solver reads it as the deck's lower bound there (the cells bound the deck's level,
  never set it), and a held value below the crossed class's is bent up to it (`bend.raised.clearance`).
* **The span rule**, run eagerly at the end of the raised way's generation (after §4.6's cut) for every raised way —
  generated, declared or drawn, the user's operator running it on a new way — from ground part 0 only: (1) the span's
  strip is the deck's plan outline between the two piers' inner faces — its stretch of the under-deck strip (§4.6)
  without that strip's margin (`raisedWays.structure.stripMarginM`); (2) the span is `open` where the strip meets a
  part-0 way's corridor (`way`), a water face (`water`), a flood cell (`flood`) or another of the support step's
  obstacles — a square, a reservation, an oasis's grove (`clear`: ground that stays open), never an enceinte's band or
  wall strip, under which a span is ruled as anywhere and read by these laws (law 1 (8); the crossing table's *beneath*)
  —, where `soffitCm` less `levelledGroundCm` at the span's axis midpoint exceeds `span.maxHeightCm` (`tall`) or falls
  below `span.minHeadroomCm` (`low`), where `levelledGroundCm` under the strip falls more than `span.maxFallCm`
  (`slope`), or where the strip lies wholly on hinterland land-use faces — field, meadow, common, pasture, wood — at
  every rung (`country`: country arcades stand open; J-C4, the realism tiebreaker); (3) otherwise one uniform on
  `raised.reason` (§6.1) keyed by (the way's lineage, `a`, `b`) decides it against `span.vaultShare[kind]` × V11's
  `era.raisedVaultM` × `culture.raisedVaultM`, capped at 1: `vault` (`land`) below it, else `open` (`chance`); (4) at
  most `span.vaultCap[rung]` spans are `vault` in the settlement, counted in the order the raised ways were founded
  (their creation event, then address) and along each deck, the rest `open` (`cap`); (5) a `setAttr` on a span's `use`
  is a held user edit (`user`). `span.supportFoundationCm` is each pier's depth below the levelled ground, which the
  underground's foundation rule reads (V04 §3.5.0). Every cell named here is V11 row 80's `raisedWays.structure` (V11
  §2.8c, V11 §3.24.2). Each span the record marks `vault` — but one these laws read `open` (law 1 (8); its worked
  example the crossing table's *beneath*) and one whose inset rectangle V04 §3.5.4 (d) (1) finds too small, reported —
  holds one arch vault at grade (a `Chamber` of kind `archVault`, II.7.6's
  Vaults), built with the underground layer (M6-U).
* **Readers.** The piers are read by volume 1's crossings and under-deck strip, volume 4's arch vaults and foundations,
  volume 5's access siting, volume 6's decay and clearance, volume 7's obstacles, volume 9's **Deck height** and **Arch
  spacing** steppers and the exports (§11.1).
* **Source and lifecycle.** A raised way's **source** is derived at read, never stored: `declared` when the way's
  lifecycle cause is an edit or a skeleton file, else `generated` (V06 §3.19.1 (2)); there is no `carried` value — a
  reader that says "carried down from year N" reads the lifecycle and the epochs' rungs (V06 §4.5) — and no stored
  founding rung (the founding epoch's `EpochRecord` holds it). Generated ways re-derive with their reason key; declared
  ways are held; a removal of a generated way is a suppression (§2.8); undo is the log's; migration: absent `raised` is a
  ground way. The aqueduct's need test, delivery points (`terminal.at`, `feeds`) and the cistern rule's reading of them
  are §4.3's (the need test) and II.7.6's (the cistern rule, which reads the delivery points).

**Retaining walls (g item 110 (a)).** A line record on the arena whose terrain it levels, holding level
ground on its high side; its step profile is the derived view `stepProfile` (above), never stored, so a re-derivation of
the district on one side writes no record of the other (V01 §3.11 (7)). *Sources:* the generator raises one where a
block, a plot or a ward is levelled on ground steeper than `terrace.slopeMin` and the step exceeds `terrace.stepMinCm`
(S10 and S11's levelling, and S10's district-edge source along a terraced district's edge, §4.7); the author draws one
with T3 `wall` in its `retaining` kind or as the edge of a T2 `ground` terrace stroke (§7.1); on a sky island the
island's unit run generates it, T3 `retaining` or a T2 terrace stroke with the island's `key` draws it, never on the rim
strip. A way that crosses it becomes a stair or a ramp by its slope (a way-class rule, never a gap in the wall). *State*
is a stretch-state profile (§2.2 rule 5): values `standing` · `decayed` · `ruined`, knot role `retaining_state_knot`,
default `standing`; *writers* volume 6's retaining `DeclineOp` (`breach` → `decayed`, `dismantle` → `ruined`),
`repairRetaining` (a `decayed` run back to `standing`; V06 §2.8), volume 5's landfall (`decayed` over its covered length,
V05 §3.16 (4)), and volume 7's house-platform walls through volume 6's pool (V07 §3.12); a generated wall re-derived where
an epoch levels keeps its profile while it is not restored (V06 §3.19.4 (1), (6)), and the restoration writes `standing`
over the re-levelled length; *readers* the pool and the restoration rule (V06 §3.19.4), volume 4's footings (a footing
stands where the wall stands), the renderer (each run drawn by its state row, §8.2), §11.1's export (per run) and the
clerk. *Lifecycle:* generated walls re-derive with their terrain; drawn ones are held; a removal of a generated wall is a
suppression (§2.8); undo is the log's; a document without them has none; on a sky island the wall is tombstoned with the
island at a fall (V05 §3.16 (7)). Rendered as a wall line with its shadow on the low side (heights feed §8.4).

**Deck plots (g item 110 (d)).** A deck plot is a `Plot` whose `deck` names its host: `deck.host` a
`Bridge` for a bridge deck and a `pier` or `quay` way for a mole, pier or quay platform; `surfaceCm` null for a quay
platform built on the bank (ground); `landmark` for a mole's head or mid-mole slot or a bridge's mid-span slot. S11 copies
it to `BuildingInput.deck` (§2.6's `DeckContext`). A `Bridge` of kind `ford` or `draw`, or with no `deckCm`, offers no
deck plot, nor does a moat deck at a gate — a bridge `over` a `moat` or `castle_moat` whose way is a `Gate.way` (§4.7:
the gate's approach stays clear); a raised way's deck carries none. The landmark slots are a mole's head and midpoint and, on a bridge whose
deck span is at least V11's `deck.landmarks/bridgeMid/minSpanM`, one mid-span slot, offered to a tower or fort class only;
registry path `deck/landmarks/<head|mid>`. Budget and admission are V11's `deck` rows and `deckOk` column. A deck's
condition is its host's lifecycle existence: volume 6's `breach` makes the host `decayed`, `ruin` makes it `ruined` and
`repairRaised` restores its former existence from the op's undo record (V06 §3.19.5 (4); §4.11's `DeclineOp` deck member); `Bridge.state` (`site`|`built`)
is untouched, a ruined bridge's crossing closed by its way's existence. Removing or ruining the deck ruins what stands on
it by least disruption; rebuilding it re-offers the plots (item 110 (d)). A removal of a generated deck plot is a
suppression keyed by its deck host's id and its slot ordinal along the deck (§2.8).

**At the frame (the combinations of item 110's pieces with §3.2 (9)'s frame).** A raised way's course never leaves the
ground's frame plus margin: its part's arena is sized to that extent, as an underground part's is, and grows with it
(§3.2 (9)); an aqueduct whose source lies beyond the frame is laid up to the arena's outer ring, its deck ending there
without a ramp, on a foot at the ring point (`RaisedFoot`, above: re-placed on the new ring by a frame growth) — the
source recorded as a bearing, as a through road's is — and a declared course drawn beyond the frame
bends to the ring (item 101 R2). A retaining wall's chain meeting the outer ring ends on it, as any open chain does. A
deck slot whose face would cross the outer ring is not offered (left out and reported), and an epoch's frame growth
re-offers it. Tests: §13.2's T110-1 (a retaining wall ending on the outer ring), T110-2 (a raised part at the frame) and T110-5 (a
deck slot left out and re-offered).

**What the content records settle.** `Faction` gains goals, named roles with member criteria and a secret flag
(COV-FTG-B12), and the kinds `military` and `arcane` (item 79, below); `Government` is a blueprint circumstance whose
offices force seats (COV-FTG-B13, §10.2); `Religion` carries a generated pantheon, practice share and clergy rate
(COV-FTG-B14); `Person` carries a status and a carer (COV-FTG-C08); the relation store holds family units, relations,
memberships and postings (FTG-9, COV-FTG-C04). `SiteResources` makes raw-resource availability a site property
(COV-FTG-B09), `LandUse` carries crop and livestock (COV-NG-VS27), `Greenery.species` the species mix (COV-FTG-I11),
`Decoration` the hinterland decoration table's output (COV-FTG-I12), and `Pin` the complete furniture vocabulary: statue,
monument, bandstand, market cross, campfire, fire pit, stall (COV-FTG-J02, COV-NG-XB23, COV-NG-CR23, COV-MFCG-I01,
COV-FTG-J05, COV-FTG-E07), the notice post (item 82) and the village's stocks and maypole. The placement rules are in §4.7
S11 and §4.9; the point lights' are §4.7's *Light sources*, their lighting §8.4's (item 68).

**The powers an institution answers to (item 79; J-A79.21 – J-A79.23).** The base types the settlement's powers as
**standings**, never as entities: each power is a `PowerStanding` of §7.7's circumstance slice — its key, its kind, its
share of standing and the value the dials last applied — and `Faction` stays the module's materialised record (§10.1,
J-9). `Institution.powers` is the partition item 72 (d5) needs. Absent, the institution answers to its class's powers
(§10.2's `BuildingClassRow.powers` and `RosterTables.powerLinks`, item 72 (d″)(1)). Present, it is the dossier's override:
the port writes it from the powers' controlled-institution lists (`controlledInstitutions`, resolved by the key law of
§7.7 item 12) and moves it only at an epoch past the dials' hysteresis (§4.11), two powers that control one institution
sharing it by their relative standing (§4.5 (7)); the dossier's declared link lists would enter, were they ever present,
before that partition — controls at full weight, funds at 0.6, staffs at 0.5 and protects at 0.4. A `powers` the
dossier set is a dossier fact (§2.8's fact tiers); otherwise `setAttr` overrides it (§7.1). An `arcane` power is a dossier
fact, or, standalone, exists only under the `magic` circumstance (§7.7 layer 2; D-3); a hidden power keeps its kind and
sets `secret` — `PowerStanding.secret` in the base (§7.7 layer 2), `Faction.secret` when the module materialises it
(§10.1; J-A79.23).

**The staged layers (AM-2, DEF-7; items 10–15, 65).** `SkyIsland` and `Tunnel` give the owner-staged layers their data
model now: an island exists **only where prosperity supplies it** (items 10, 13, 15 — II.6's supply law, its two
reasons, its echoed terrain and its waning, settling and falling as its supply fails are II.6's and V05's) and has no
relation to the underground layer; a
tunnel records what it drains (`serves`), where it falls (its invert profile), where it discharges (`outfall`), whether
it is navigable and how it closed — the underground fades like the walls, caving in or being sealed, never demolished by
the engine (item 11); the underground neighbourhoods along navigable tunnels are ordinary blocks, plots and buildings in
part 0 (II.7.3; §2.2 rule 1), reached through `AccessPoint` records (II.7.4). The underground layer's other systems
(item 65) — `UndergroundSystem`, `Gallery`, `Chamber` and `UndergroundLink`, each in its system's arena part, and the
undercity's neighbourhoods as `undercity` districts (§2.5) — are the same kind of hook, a `dug` system included: the base
carries the access edit `addUndergroundAccess` and its closure rule (§7.3 item 9 (d)), whose underground pieces run once
the layer's stages exist (II.7.4; item 66). A void whose every open path to the surface closes is **lost** (g item 113
(e)): access counts only through open links; the state belongs to volume 4's access-state set (V04 §2.2) —
remembered as once known, drawn faded like an unexcavated void, until it is refound — and a lost void's dwellings empty by
the vacancy rules. Their rules are II.6's, II.7's and volumes 4 and 5's.

**The dossier's staged records (item 88; J-A88.21, J-A88.22).** `ConditionOverlay`, `DepositSite`, `PowerRelation`,
`CustomChainRecord`, `CustomServiceRecord` and `HistoryHint` (on the recipe, §2.9), with the dossier-backed `Person`,
give every optional input of the dossier a home now (§2.1's staged records): the port fills them at the
SettlementForge stage (§7.7 item 8), and their readers — §4.11's Works share and land-use conversions, §4.5's typing, item
72's political component, S2's stage count (§4.2 S2), II.7.6's catacomb age and buried old town, the supply web's chains
(g item 104), the crisis look (§7.7's DR44) — read nothing until then. A **crisis look** (g item 122; J135) reads the
standing `ConditionOverlay`s and adds nothing to the model: no record, field, digest input or hash moves with it, so one
document hashes identically with crises on and off and in every week (T122-1), and a week inside no condition's weeks
draws none; what a crisis leaves — deaths, ruined institutions, a burned quarter, settled newcomers — reaches the map only
through the epoch path (DR28's calamity in `EpochInputs.events` and the population change; V06's hazard phase and
growth), the look handing over to it (a disaster's ruined look giving way to `reconstruction`'s Works, V06).
A dossier-backed `Person` is a notable the dossier names: pinned whole (never
derived away by a re-roll), carrying `Identity.dossier`, housed by rule in the district of its institution or its power's
seat, with a `Posting` at its named institution and a `Membership` in its named power; a successor re-binds to its record
through the receipt §7.7 item 12 names. The `HistoryRecord` is written by the history replay at generation (g item 113;
V06), its fields traced to §7.7's history rows; with no history replay it is absent.
=== END ===

