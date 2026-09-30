=== REPLACE ### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records ===
### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records

```ts
interface Enceinte { id: Id; kind: 'citadel'|'inner'|'outer'|'suburb'|'bailey'|'palisade'|'earthwork';
  trace: ChainRef /* ('wall', id): the L1 wall chain, a ring or an open chain */; closure: 'ring'|'shore' /* 'shore': an open chain whose enclosure is closed by the L0 shoreline for every "enclosed" and "sealed" test */;
  anchors?: { end: 0|1; on: 'shore'|'bank'|'cliff'|'enceinte'; vertex: VertexRef /* ('anchor', enceinte id, end) */ }[] /* typed end anchors of an open chain */;
  waterfront: 'open'|'quay_wall'|'sea_wall' /* a preset row: open (MFCG's default and FTG's captured open chain: no wall along quays and beaches), quay_wall (a wall along the waterfront) or sea_wall (a full wall); where their water gates stand is §4.4 S5a's */;
  placement: 'aroundAll'|'aroundStage' /* aroundStage walls only a stage's new ring, anchored on the previous enceinte (FTG's "around stage lots") */;
  strips: { inner: FaceRef; outer: FaceRef } /* the two L1 wall-strip faces S7 cuts off beside the trace (§4.8): inside, band + inner setback (bounded by the setback line or the
                                                intervallum); outside, band + outer setback + glacis, or the berm up to a moat; S8 never cuts them and lanes end on them (§4.6) */;
  band: { inner: FaceRef; outer: FaceRef } /* L3 half-bands on each side of the L1 wall chain, built by bandUnion inside the strips by S10's step (0) (§4.7); nesting holds */; glacis?: { inner?: FaceRef; outer: FaceRef };
  thicknessCm: Cm; walkCm: Cm; heightCm: Cm; base: ChainProfile /* 'base_knot' on the trace: the wall's base elevation, one knot per trace vertex S7 places, linear between (§2.2 rule 5) */; setbackCm: { inner: Cm; outer: Cm } /* both faces unbuildable (below) */;
  intervallum?: Id /* the lane inside the wall when the era row asks for it */; material: string;
  supersededBy?: Id /* item 8: the shorter inner ring that replaced this one (§4.11's contractWall); the old ring's record stays live and its line persists as a trace */; gates: Id[]; towers: Id[]; moat?: Id /* the wet moat WaterBody along the trace, named as `Castle.moat` is: carved at S3 for the innermost enceinte, by S5a's carve for an outer one (§4.2, §4.4); a dry ditch is residue, never this field (§4.7 S10 (0), §4.8) */; stage: number; lifecycle: Lifecycle }
interface Gate { id: Id; enceinte: Id; junction: Id; way: Id | null /* null: a postern or water gate without an outward way */;
  kind: 'main'|'postern'|'water'|'gatehouse'|'castle'; heights: Heights; footprint: { inner: FaceRef; outer: FaceRef }; plaza?: FaceRef;
  banks?: [VertexRef, VertexRef] /* a water gate: ('gate_end', gate id, 0 | 1), its two bank vertices on the trace; the wall's edge between them lies across the water (§2.2 rule 7); held under a warp unless fromLevel = 0, as a Bridge's deck ends are (§3.6) */ }
interface Tower { id: Id; enceinte: Id; vertex: VertexRef /* ('tower', id) */; radiusCm: Cm; heights: Heights; kind: 'round'|'square'|'bastion'|'octagonal'; footprint: { inner: FaceRef; outer: FaceRef } }   // a wall tower; a composition's tower is §2.6's ComposedTower
interface Castle { id: Id; plot: Id; reservation: Id; curtain: Id /* its own Enceinte, kind 'bailey' */; cityWeld?: [VertexRef, VertexRef] /* ('weld', castle id, 0 | 1): ends of the shared wall stretch (one edge carrying both enceintes' 'wall' roles) when on the enceinte */;
  keep: Id; keepShape: 'rect'|'square'|'octagon'|'round'|'cruciform'; keepAt: 'opposite_gate'|'highest'|'centre'; innerWard?: FaceRef; gatehouse: Id /* one town-side gate, sited at S3 on the bailey side facing the plaza by least cost (§4.2 S3) */;
  paths: Id[] /* keep ↔ gate ↔ wall stairs, 'path' ways inside the bailey */; bailey: FaceRef; moat?: Id /* the castle moat WaterBody */;
  surround: 'none'|'esplanade'|'park'|'plaza'|'cliff' /* the surround row (§4.8): esplanade, park with a perimeter path, plaza, cliff skirt; a moat is the separate `moat` field */; siteScore: number; template: string }
interface Bridge { id: Id; state: 'site' | 'built' /* site: two pinned bank vertices, no span, no way, no furniture, not drawn; built: a way's span laid through them */;
  way: Id | null /* the way whose L1 edge between the two deck ends is the span; null while a site */;
  deck: [VertexRef, VertexRef] /* ('deck_end', bridge id, 0 | 1): the pinned bank-to-bank deck, perpendicular to the local flow or channel; once built, its span carries the structural `deck` role (§2.2 rule 7); held under a warp unless fromLevel = 0 (§3.6) */;
  over: 'river'|'moat'|'castle_moat'|'canal'|'carve'|'added' /* who emitted the deck: S1, S3, S5a, a carve edit, or the one L0 shore-split batch of a deck no site offered on standing water (§4.2 S1 (5)); a deck F-ROUTE's extra-bridge rung sites inside S1's water operator or a carve takes the value of that operator's other decks */;
  spanCm: Cm; deckCm?: Cm; kind?: 'stone'|'timber'|'draw'|'ford'; piers?: number /* deckCm, kind and piers are set by S7 when the bridge is built (§4.8) */ }
interface Greenery { id: Id; kind: 'park'|'garden'|'formal_garden'|'orchard'|'green'|'commons'|'avenue'|'street_trees'|'churchyard'|'market_green'|'esplanade'|'grove'
    |'wood'|'coppice'|'meadow'|'hedgerow'|'shore_band'|'ambient'|'yard_planting';
  face?: FaceRef; line?: ChainRef /* ('green_line', id): hedgerows, a role on L3 field boundaries */;
  along?: { way: Id; strip: FaceRef /* one half-corridor strip on the planting district's own side */; offsetCm: Cm } /* avenues and street trees: a row derived along the strip; no plat edge (§4.9) */;
  owner?: Id | 'commons'; rule: string; density: number;
  species: { kind: string; inner: number; outer: number; leafType?: 'deciduous'|'evergreen' /* read by §8.2's season rows; deciduous when absent */ }[] /* shares per species kind (§4.9) */;
  layout?: 'fan'|'semi_fan'|'grid'|'free' /* parks and groves, §4.9 */; paths?: FaceRef /* L3 path faces of a park layout (§4.9) */;
  overrides?: { seq: number /* the instance event */; at?: PointCm /* the current position of a move's `to` or an add's `point` */; recorded?: PointCm /* a line layout's recorded generated point */ }[] /* written when the instance event applies, moved only by a warp or vertex move (§7.4); model data, hashed with the entity; every kind that carries an `instances` mark has this field, per the entity registry */;
  lifecycle: Lifecycle }
  // tree instances are generated at render and never stored (§8.1, §8.10); overrides are `instance` events (§7.1) whose current positions `overrides` holds (§7.4)
interface LandUse { id: Id; kind: 'arable'|'strip_field'|'meadow'|'pasture'|'commons'|'orchard'|'vineyard'|'coppice'|'wildwood'|'quarry'|'claypit'|'mine'|'lumber'|'fishery'|'saltpan'|'marsh'|'reserve';
  face: FaceRef /* L3 faces — inside the hinterland's blocks: furlongs, lots, woods (§4.9) — and wherever a reclaim or a course shift leaves land, in the town too (§2.3) */; owner?: Id; furrowAxisCdeg?: number; crop?: string /* from the era / region crop table */; livestock?: string; rotation?: { scheme: string; slot: number };
  reclaimed?: { from: 'marsh'|'foreshore'; epoch: number } /* item 25: ground won from water by a reclaim conversion (§2.3, §4.11) — a trace the style sheet may draw */ }
interface SiteResources { cellCm: Cm; ore: Float32Array; stone: Float32Array; timber: Float32Array; fish: Float32Array; clay: Float32Array; fertile: Float32Array }   // S1 output on the terrain grid, 0..1 per cell (§4.2)
interface Decoration { id: Id; kind: string /* pond, copse, stone circle, ruin, wayside shrine, boundary stone, gallows hill, … data-defined */; face?: FaceRef; point?: Point /* moves with its host face under a warp or a vertex move (§7.4) */;
  trail?: FaceRef /* the L3 path face to the nearest way corridor (§4.9) */; keepClearCm: Cm; rule: string; lifecycle: Lifecycle }
interface Pin { id: Id; kind: 'well'|'fountain'|'large_tree'|'cross'|'market_cross'|'shrine'|'pump'|'gallows'|'statue'|'monument'|'bandstand'|'campfire'|'fire_pit'|'stall'|'trough'|'lamp'|'notice' /* item 82: a notice post, a landmark a named-feature claim may name (§7.7) */;
    point: Point /* moves with its host face under a warp or a vertex move (§7.4) */; host: Id /* the yard, square, corridor or plot face */;
    light?: Id /* item 68: an emitting pin's LightSource (lamp, campfire, fire_pit; §4.7's Light sources) */; rule: string; lifecycle: Lifecycle }   // in the entity registry (§2.8) from M1; placed by §4.7 S11 / §4.9 rules and by stage 2 (II.3)
// Labels are the model records LabelEntity and QuarterNode of §9.1
interface Institution { id: Id; kind: string; plots: Id[]; buildings: Id[]; faction?: Id /* the module's materialised Faction, when it exists (§10.1) */; roster: RosterRef; name: NameRef; reservation?: Id;
  knownTo?: 'public'|'local'|'secret' /* item 30: a dossier fact (§7.7) or an edit, defaulting from its plots' exposure; a local or secret institution prefers hidden plots (§4.7 S10b) and, underground, a cellar stair (II.7.3) */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: the dossier's fact, or the mode its concealed use resolved (§4.7's Concealed institutions (1)); absent: none */;
  powers?: { power: string /* a PowerStanding key (§7.7 item 2) */; weight: number }[] /* item 79: the powers it answers to, weights Σ = 1 — absent: its class's rows apply (§10.2); present: the dossier's override or an edit (below) */ }
interface Use { id: Id /* the address: moves with the use when it relocates (§6.3); a building keeps its own */; cls: string /* the roster class it is (§10.2's BuildingClassRow.id) */; specialisation?: string /* the designation template's discrete row at the band (§4.7 S11, item 19) */;
  plot: Id; buildings: Id[] /* the building(s) it occupies — several for a compound or a joined plot */; assignment?: Id; owner?: Id /* household | business | institution */; pinned: boolean /* item 17 (d): stays under an epoch, the town adapts around it (§7.7) */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: a concealed use's mode, resolved when it is first placed (§4.7's Concealed institutions (1)) and re-resolved only when a dossier event withdraws the dossier's mode (concealmentSource, next); absent: none, an open use */; concealmentSource?: 'assignment'|'class'|'edit' /* the map-side origin of a mode the dossier did not set — written with the mode by §4.7's placement rule (Concealed institutions (1)) and by setAttr(concealment) (`edit`); absent while the dossier sets it. A dossier event that sets the mode clears it (an `edit` it displaces is reported and orphaned, §7.7 item 5; J-A20.73); one that withdraws the dossier's mode re-resolves the mode by §4.7's Concealed institutions (1) from the map-side sources — a map assignment's value, else the class table on the institution's `siting` draw, else `none` (the use then placed as an open use) — as that event's least-disruption mutation (§7.7 items 5, 11 (b)), writing their source. Whether the mode is a dossier fact is factTier's (§2.8); a mode the dossier set is dossier-owned, so a map setAttr of it is refused (§7.7 items 7, 11; J-A20.77, J-A63.22). Read by §11.2's `why` on the use's `concealment`, under the caller's key */;
  front?: Id /* item 63: the front's Use — the working business whose building (Building.use) it hides in; absent for a bare hidden or underground use */; knownTo?: 'public'|'local'|'secret' /* item 63: a concealed use's own knowledge, 'secret' by default; absent on an open use, which the reader reads through its building and institution (§9.2) */;
  opened: { epoch: number; seq: number }; closed?: { epoch: number; seq: number }; lifecycle: Lifecycle }   // item 17: a use is separate from the building that houses it — it opens, closes and relocates (§4.11's use step; §7.1's openUse / closeUse / relocateUse) while the building persists, vacant or re-let; Building.use points at it (§2.6)
interface MaterialLedger { rows: { epoch: number; material: string; m3: number; from: Id /* the robbed, cleared, dismantled or demolished entity */; to?: Id /* the build or repair it fed */ }[] }   // item 8 (d): one per document, changed only by §4.11's salvage events, so inside the model digest; its only effect on the map is to weight clearance toward nearby building (§4.11)
interface Household { id: Id /* the address: stable across re-derivation of its plot (§6.3); people are keyed by it */; plot: Id; building: Id /* its dwelling unit is the rooms of that building's plan carrying its id (Room.unit, §2.6; item 28 (f)); its interior is cut for the plot's field band, not for `wealth` (J-A28.24) */; members: number /* size; people derived lazily */; wealth: number; tableVersion: string /* person tables at creation */ }
interface Person { id: Id; key: { household: Id; ordinal: number; bornEpoch: number }; status: 'worker'|'unemployed'|'retired'|'student'|'dependent';
  role: string; workplace?: Id; carer?: Id /* dependent → the person whose schedule it follows */; derived: true; pinned?: Partial<PersonFields> /* only by an explicit edit — or, for a dossier-backed notable (item 88; staged, below), pinned whole by the port */ }
interface Faction { id: Id; kind: 'guild'|'religion'|'lordship'|'company'|'criminal'|'council'|'military'|'arcane' /* item 79: military and arcane for the dossier's power categories (the port's category-and-name rows, §7.7 item 2); a hidden power keeps its kind and sets `secret` — `PowerStanding.secret` in the base (§7.7 item 2), `Faction.secret` when the module materialises it (§10.1) */; seats: Id[]; turf?: Id[];
  influence: number /* the module's reading of its power's standing (§10.3; the base's standings are §7.7's PowerStanding) */; secret: boolean;
  goals: { id: string; method: string; progress: number }[]; roles: { name: string; criteria: string; count: number }[]; template: string }
interface Government { kind: 'crown'|'seigneurial'|'ecclesiastical'|'chartered_commune'|'merchant_oligarchy'; seat: Id /* the institution */; offices: { name: string; seatClass: string; count: number }[] }
interface Religion { id: Id; name: NameRef; deities: { name: NameRef; domain: string }[]; practiceShare: number; clergyPerThousand: number; temples: Id[]; faction: Id }
// The relation store (FTG-9; when it is materialised and persisted: §10.1, §10.3)
interface FamilyUnit { id: Id; kind: 'couple'|'parents_children'|'single_parent'|'extended'; members: Id[]; households: Id[] }
interface Relation { id: Id; a: Id; b: Id; kind: 'partner'|'parent'|'sibling'|'carer'|'friend'|'rival'|'business'|'religious'|'affair'; since: number; lifecycle: Lifecycle }
interface Membership { id: Id; person: Id; faction: Id; role: string; since: number }
interface Posting { id: Id; workplace: Id; profession: string; filledBy?: Id; lifecycle: Lifecycle }
// The owner-staged layers' records (floating islands and sewers, II.6): schema-complete, empty in the base
interface SkyIsland { id: Id; outline: Polygon; elevationCm: Cm; terrain?: Terrain; terrainEcho?: { river?: Id /* the ground river it echoes */; relief?: 'echo'|'own' };
  key: PlatKey /* its own arena, part 1–3 (§2.2) */; districts: Id[]; reason: 'prosperity'|'institution'; institution?: Id; placement: { over: 'water'|'fields'|'outskirts'|'core'; byAssignment: boolean }; occlusion: 'opaque'|'ghost'|'offset';
  supply: { town: number; carried: number } /* item 10: the two prosperity values II.6's supply law read (S_town, S_carried) */; areaHa: number /* the supported area the law gave */; state: 'floating'|'waning'|'settled'|'fallen' /* II.6's island lifecycle over epochs (§4.11) */ }
interface Tunnel { id: Id; kind: 'drain'|'main'|'culvert'|'passage' /* a walkable side passage of the network — not item 30's surface passage face (§2.5) */; centreline: ChainRef /* ('tunnel', id) in the sewer network's part (part 0 of the underground layer) */;
  widthCm: Cm /* the bore; the corridor half-width is widthCm ÷ 2 + the profile row's wall thickness (II.7.2, §3.7) */; headroomCm: Cm /* II.7.2's profile row */; navigable: boolean /* derived from widthCm and headroomCm against II.7.2's thresholds when the tunnel is made or edited, and stored: what may carry underground plots (item 12) */;
  invert: ChainProfile /* 'invert_knot' on the centreline, below ground (§2.2 rule 5) */; follows?: Id /* way */; outfall?: Outfall; serves: Id[] /* plots or buildings drained */; chambers?: FaceRef; rule: string;
  closure?: 'collapsed'|'sealed' /* item 11: how a ruined tunnel closed (§4.11's tunnel ladder) */; lifecycle: Lifecycle /* its condition — in use, neglected, caved in, collapsed, sealed — is a reading of existence and closure through II.6's condition table (whose open column says whether plots may front it, II.7.3), never a second stored state; a setAttr on the condition is the matching convert (§7.1; J-A11.21) */ }
// The underground layer's other systems (item 65; II.7.5, II.7.6): schema-complete, empty in the base, each in its own arena part (§2.2 rule 1)
interface UndergroundSystem { id: Id; kind: 'sewer'|'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug' /* one system per kind (II.7.6); dug: the private passages an access edit makes (item 66) */;
  part: number /* its arena part (Identity.key.part): 0 for the sewer, the next unused at creation for the others — never renumbered or reused (§2.9's nextUndergroundPart) */;
  sources: Id[] /* what explains it (II.7.6): the cemetery, churchyard or religious institution a catacomb lies under, the stone stock a quarry fed, the blocks or districts a `raiseGrade` buried (its `region`, II.7.6) or, at generation, the growth-stage-1 districts a `fire` or `flood` scar buried (II.7.6; J-A88.42), the building whose access edit dug a passage (`addUndergroundAccess`, item 66) */; depthM: [number, number] /* its row's depth range below the ground datum */; rule: string; lifecycle: Lifecycle }
interface Gallery { id: Id; system: Id; centreline: ChainRef /* ('gallery', id) in its system's part */; widthCm: Cm; wallCm: Cm /* the kerb at widthCm ÷ 2 + wallCm (§3.7) */; headroomCm: Cm; elevationCm: Cm /* its floor */;
  water?: true /* below the local water table: it carries water (II.7.6) */; walkway?: true /* an undercity's street (II.7.5) */; closure?: 'collapsed'|'sealed'|'flooded' /* how it closed, read through II.6's condition table */; knownTo?: 'public'|'local'|'secret'; rule: string; lifecycle: Lifecycle }
interface Chamber { id: Id; system: Id; outline: ChainRef /* ('chamber_wall', id): its closed L1 chain */; floor: FaceRef /* L1 */; elevationCm: Cm /* its floor */; ceilingCm: Cm /* clear height above the floor: caps what stands in it (II.7.5) */;
  closure?: 'collapsed'|'sealed'|'flooded'; knownTo?: 'public'|'local'|'secret'; rule: string; lifecycle: Lifecycle }
interface UndergroundLink { id: Id; a: { part: number; element: Id; at: VertexRef /* ('link_end', link id, 0) */ }; b: { part: number; element: Id; at: VertexRef /* ('link_end', link id, 1) */ };
  kind: 'open'|'gated'|'secret'|'collapsed'|'flooded'; via: 'breach'|'stair'|'shaft'|'door'; knownTo: 'public'|'local'|'secret'; rule: string; lifecycle: Lifecycle }   // item 65 (d): a connection between elements of two parts, never guaranteed and never a shared vertex (II.7.6; J-A65.31); the links to the surface are AccessPoints
// AccessPoint — a stair, ladder, hatch, door, shaft, well, cellar stair, grating or mouth linking the ground and an underground part by entity ids, with its state, knowledge and source (items 64–66) — is declared with its mechanism in II.7.4 (R12) and listed in §2.8's entity registry; its underground-side vertex carries the `access_point` role on its element's kerb or wall (§2.2 rule 7)
// Works and lights (items 67, 68)
interface Works { id: Id; kind: 'build'|'extend'|'demolish'|'repair'|'convert'|'decay'|'clear';
  target: { building?: Id; plots?: Id[] } /* the building it works on, or the plots a join or a split re-draws (§4.11's Works (7)) */;
  startWeek: number; durationWeeks: number /* integer working weeks: its WorksTable row's range drawn on `works` (§6.1) × the band's labour factor (§4.11) */; row: string /* the WorksTable row it reads */;
  cause: { seq: number /* the event that decided the change */; mutation?: number /* index into that event's mutations: the MutationRecord whose parts it shows, in order (§4.7 S11) */ };
  before?: { parts: { ring: Polygon; heights: Heights; roof: RoofSpec['kind'] }[] /* the parts the change subtracted, drawn through the demolition stages */; bounds: { line: PointCm[]; treatment: PlotBound['treatment'] }[] /* the boundary lines it removed, drawn until the clearing stage */ } /* world lattice points that are no vertex (§2.2 rule 5): carried with the target's plot face — the building's plot, or for a join or a split the target plot whose face holds the point — under a warp or a vertex move by §7.4's mean-value rule, never re-seated or orphaned (a drawn trace keeps no clearance); the undo record keeps the former rings and lines (J-A67.22) */;
  lifecycle: Lifecycle }   // item 67: a physical change with its timetable — model data in the model digest (§6.2); its stage at a week derived by §4.11, never stored; retired by the epoch after it has stood finished for works.retainWeeks
interface LightSource { id: Id; kind: string /* a light-rule row's kind: torch, lantern, lamp post, brazier, fire pit, campfire, magical orb, shrine lamp … data (§4.7's LightRule) */; source: 'fire'|'magic';
  point: Point /* moves with its host under a warp or a vertex move (§7.4) */; host: Id /* the building, way, square, gate, bridge, castle, pin, decoration (a wayside shrine), tunnel, gallery, chamber or access point it belongs to — for a hand-placed light, the entity `placeLight` names or finds under its point (§7.1); its arena is its Identity.key's */; entrance?: number /* a door light: its building's entrance ordinal */;
  heightCm: Cm /* above the host's surface */; intensityCd: number /* candela */; radiusCm: Cm /* the smooth cutoff of §8.4's falloff */; sizeCm: Cm /* the flame's or orb's own radius, which sets §8.4's penumbra — written at placement from its kind's light-table row (§4.7) */; colour: string /* sRGB: fire warm, magic cool — its row's, written at placement (§4.7), and the colour the light pass lights with (§8.4 (c)); the vector rung's glyph and glow take §8.2's `light` and `lights` roles instead */;
  flicker?: true /* a fire light flickers — written at placement from its row (§4.7): §8.4 (f) animates it as a pure function of its render key and the view's time (§6.1; J-A68.61), never drawn or stored; absent: steady */; rule: string; lifecycle: Lifecycle }   // item 68: a point light placed by rule (§4.7's Light sources) or by hand (placeLight, §7.1); lit windows, the plan rung's room lights and light shafts are derived sources, never records (§8.4; J-A28.32); unlit while its host is abandoned, decayed or under Works before FINISHED — a reading, never a stored state
// The dossier's staged records (item 88): schema-complete, empty in the base; the port fills them at the SettlementForge stage (§7.7 item 8, §14)
interface ConditionOverlay { id: Id; key: string /* its binding key, cond:<id> (§7.7 item 12) */; archetype: string; severity: number /* 0–1 */; sinceWeek: number; untilWeek?: number; lifecycle: Lifecycle }   // a condition standing between epochs, no geometry: §8.2's thematic overlay, §4.11's Works share and the clerk read it
interface DepositSite { id: Id; key: string /* res:<key> */; family: string /* ore, stone, clay, salt … data */; state: 'available'|'depleted'|'removed'|'discovered'; bearingCdeg: Cdeg /* its bearing from the centre */; landUse?: Id /* the quarry, mine or claypit LandUse it anchors (§4.9) */; lifecycle: Lifecycle }   // a state change converts the land use it anchors (§4.11)
interface PowerRelation { id: Id; key: string /* its two powers' binding keys (§7.7 item 12) joined in address order — a pair of existing keys, no key form of its own */; a: string; b: string /* PowerStanding keys (§7.7 item 2) */; kind: string /* the dossier's pair type: alliance, rivalry, feud … data */; strength: number /* 0–1 */; lifecycle: Lifecycle }   // read by §4.5's typing as a soft adjacency row and by item 72 (a)(2)'s political component
interface HistoryHint { ageYears: number /* the settlement's age at creation — never advanced by the host's weeks, whose clock is §4.11's */; scars: { type: string /* fire, flood, siege, plague … data */; yearsAgo: number; severity: number /* 0–1 */ }[] }   // Recipe.history (§2.9): a recipe input read by S2's growth-stage count (§4.2 S2), by II.7.6's catacomb age (`ageYears`) and, for a `fire` or `flood` scar, by II.7.6's buried old town (J-A88.42)
```

People are derived, and never materialised in the document unless an explicit edit pins them (§10.3); which people a
user has opened is per-user view state (§2.9), outside every digest. Content references geometry by id and never the
reverse, so the map can be regenerated without deleting content and content re-solved without moving the map.

**Both faces of a wall are unbuildable (MFP-9).** `setbackCm.inner` and `setbackCm.outer` are both unbuildable bands; the
invariant "footprints ∩ (band ⊕ setback) = ∅ on both faces" is hard (§5.3), and ribbon plots start beyond the outer
setback (§4.4). How S5a lays open traces, waterfronts and stage rings is §4.4's; how S7 cuts the wall strips and builds
bands, towers, gatehouses and the castle is §4.8's; how bridges are sited, built and kept as sites is §4.2 S1 (5)'s and
§4.8's (COV-FTG-G09, COV-FTG-G10, FTG-8).

**What the content records settle.** `Faction` gains goals, named roles with member criteria and a secret flag
(COV-FTG-B12), and the kinds `military` and `arcane` (item 79, below); `Government` is a blueprint circumstance whose offices force seats (COV-FTG-B13, §10.2); `Religion` carries
a generated pantheon, practice share and clergy rate (COV-FTG-B14); `Person` carries a status and a carer (COV-FTG-C08);
the relation store holds family units, relations, memberships and postings (FTG-9, COV-FTG-C04). `SiteResources` makes
raw-resource availability a site property (COV-FTG-B09), `LandUse` carries crop and livestock (COV-NG-VS27),
`Greenery.species` the species mix (COV-FTG-I11), `Decoration` the hinterland decoration table's output (COV-FTG-I12),
and `Pin` the complete furniture vocabulary: statue, monument, bandstand, market cross, campfire, fire pit, stall
(COV-FTG-J02, COV-NG-XB23, COV-NG-CR23, COV-MFCG-I01, COV-FTG-J05, COV-FTG-E07), and the notice post (item 82). The
placement rules are in §4.7 S11 and §4.9; the point lights' are §4.7's *Light sources*, their lighting §8.4's (item 68).

**The powers an institution answers to (item 79; J-A79.21 – J-A79.23).** The base types the settlement's powers as
**standings**, never as entities: each power is a `PowerStanding` of §7.7's circumstance slice — its key, its kind, its
share of standing and the value the dials last applied — and `Faction` stays the module's materialised record (§10.1,
J-9). `Institution.powers` is the partition item 72 (d5) needs. Absent, the institution answers to its class's powers
(§10.2's `BuildingClassRow.powers` and `RosterTables.powerLinks`, item 72 (d″)(1)). Present, it is the dossier's
override: the port writes it from the powers' controlled-institution lists (`controlledInstitutions`, resolved by the key
law of §7.7 item 12) and moves it only at an epoch past the dials' hysteresis (§4.11), two powers that control one
institution sharing it by their relative standing (§4.5 (7)); the dossier's declared link lists would enter, were they ever present, before that partition — controls at full weight,
funds at 0.6, staffs at 0.5 and protects at 0.4. A
`powers` the dossier set is a dossier fact (§2.8's fact tiers); otherwise `setAttr` overrides it (§7.1). An `arcane`
power is a dossier fact, or, standalone, exists only under the `magic` circumstance (§7.7 item 2; D-3); a hidden power
keeps its kind and sets `secret` — `PowerStanding.secret` in the base (§7.7 item 2), `Faction.secret` when the module
materialises it (§10.1; J-A79.23).

**The staged layers (AM-2, DEF-7; items 10–15).** `SkyIsland` and `Tunnel` give the owner-staged layers their data model
now: an island exists **only where prosperity supplies it** (item 10; II.6's supply law — none without it, its area from
the carried districts' and the town's prosperity, its altitude from the town's, only at CITY and METROPOLIS and never
certain, items 13 and 15) for one of two reasons (`reason`) — a very prosperous neighbourhood or set of neighbourhoods,
or a unique institution (a palace overlooking the land, a cathedral, a prison) — by rule or by assignment, may carry its
own terrain that echoes the ground's (`terrainEcho`: a conjured river with the ground river's bearing), wanes, settles or
falls as its supply fails (`state`, §4.11) and has no relation to the underground layer; a tunnel records what it drains
(`serves`), where it falls (its invert profile), where it discharges (`outfall`), whether it is navigable and how it
closed — the underground fades like the walls, caving in or being sealed, never demolished by the engine (item 11); the
underground neighbourhoods along navigable tunnels are ordinary blocks, plots and buildings in the sewer network's part
(part 0 of the underground layer; II.7.3; §2.1, §2.2 rule 1), reached through `AccessPoint` records (II.7.4). The underground layer's other systems
(item 65) are the same kind of hook — `UndergroundSystem`, `Gallery`, `Chamber` and `UndergroundLink`, each in its
system's arena part, and the undercity's neighbourhoods as `undercity` districts (§2.5) — schema-complete and empty until
the owner-staged stages run (II.7.5, II.7.6), a `dug` system included: the base carries the access edit
`addUndergroundAccess` and its closure rule (§7.3 item 9 (d)), whose underground pieces — a `dug` system among them —
run once the layer's stages exist (II.7.4; item 66). Their rules are II.6's and II.7's.

**The dossier's staged records (item 88; J-A88.21, J-A88.22).** `ConditionOverlay`, `DepositSite`, `PowerRelation` and
`HistoryHint` (on the recipe, §2.9), with the dossier-backed `Person`, give every optional input of the dossier a home
now, schema-complete and empty in the base, as the islands' and the tunnels' records are: the port fills them at the
SettlementForge stage (§7.7 item 8), and their readers — §4.11's Works share and land-use conversions, §4.5's typing,
item 72's political component, S2's stage count (§4.2 S2), II.7.6's catacomb age and buried old town — read nothing until then. A dossier-backed `Person` is a notable the
dossier names: pinned whole (never derived away by a re-roll), carrying `Identity.dossier`, housed by rule in the
district of its institution or its power's seat, with a `Posting` at its named institution and a `Membership` in its
named power; a successor re-binds to its record through the receipt §7.7 item 12 names.

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
  nextUndergroundPart: number;  // item 65: the arena part the next underground system takes (II.7.6; 1 at creation, part 0 being the sewer's); never decreases, as nextSeq — an undone or truncated system's number stays spent, so no number is reused (§3.4); the system's record stores it (UndergroundSystem.part, §2.7), as does its address's under<n>/ prefix, so an event that creates a system after generation carries the number in the address it records — a closure's ClosureRecord.created (§7.3 item 9), a raiseGrade conversion's buried system (II.7.6) — and a replay reads it there, never recomputes it; the systems made at generation take theirs in II.7.6's stage order
  packs: PackData[];            // the content of every non-shipped pack of the pack set and of every pack a truncated event held on a saved redo stack names (below) — a selected user corpus is one — canonical, outside the model digest
  hostContent: HostContent[];   // outputs of host-registered providers, keyed for replay (§6.5, §11.4) — canonical, outside the model digest
  dossier?: { binding: DossierBinding; carried: CarriedFacts };   // items 20 (h) (v), 74, 87: the dossier block (below; the types §7.7 item 12's) — canonical, outside the model digest like hostContent; absent without a dossier
  style: StyleState;            // sheet id@version (a non-shipped sheet's content included), style row operations, ground-cover regions — canonical, outside the model digest
  model?: Snapshot;             // the materialised model at the log head: a cache checked against its own model and records digests and verified by replay (load step 3); always written on save
  view?: ViewState;             // per-user and shared view keys (below), the stored authoring `session` included — never in a digest
  derived?: { report: GenerationReport; stats: StatisticsRecord; epochs: EpochRecord[]; locks: Id[]; orphans: OrphanRecord[];
              features: Features /* II.7.4: the resolved feature set (sewers by tier; underground while any system exists, items 65–66) — recomputed on load with the report; every dependant reads it from the model, never from a layer's visibility (item 14) */;
              tradeFlow?: TradeFlow /* item 77: the settlement's derived trade flow (§4.3) — recomputed at creation, at each epoch and on load; never canonical */;
              elaborations: ElaborationRecord[] /* §2.8: one per entity and lazy rung, derived from the cache below against the current digests (item 28) */ };   // caches rebuilt from base + log; never canonical
  undo?: UndoRecord[];          // the session's undo records carried across a reload (their cap: §7.4), with the truncated targets its redo stack holds; never canonical
  elaborations?: ElaborationChunk[];   // the elaboration cache (below), kept across zoom-outs and sessions so that "once generated it is saved" holds without storing derived rungs in the model (item 28); never canonical
}
type Base =
  | { kind: 'recipe'; recipe: Recipe }                                                     // replay = G(outputVersion, recipe), then fold the log
  | { kind: 'rebased'; recipe: Recipe; state: Snapshot; seq: number; reason: RebaseReason }; // replay starts from `state` — checked against its root of record (load step 3) — and folds the events after `seq` (= the rebase event's `at`, §7.1); a `rebase` event is a no-op in the fold of a client whose base it already is (a bridged client that holds another base installs it, load step 4); the town is not seed-reproducible before `seq`
type Seed = number;             // a u32, 0 … 2³² − 1: records write it as its decimal string (§13.3), permalinks in base 36 (§6.4); the D-5 panel seeds are H32 values (§13.6 (2))
interface Recipe {              // the canonical recipe: every model-affecting input and nothing else (§6.2; LC-15)
  seed: Seed /* for a dossier-bound document the port's one-way derivation from the dossier's own seed (§14; item 85) — never the host's seed itself */; rung: Rung; tablePins: Record<TableId, string>;
  packs: { id: string /* a selected user corpus: 'user:<content hash, base 32>' */; version: string; hash: Hash128 /* of the pack's canonical JSON */; shipped: boolean /* in the shipped set of the output version that wrote the entry — informative only: a load resolves each pack by hash (below), the link rule reads the link's output version (§6.4), and an upgrade to a version that stops shipping it copies its content into `packs` (§7.5 (2)); always false for a user corpus */ }[];   // setting packs and selected user corpora (§7.6, §10.4)
  params: ParamDelta;           // the full effective delta over the pinned shipped defaults — pack, preset, user-global and document overrides folded in at creation (§7.6)
  presetId?: string;            // provenance only: the delta already holds the preset's values, so an edited preset elsewhere cannot change this town
  intent: Intent /* §7.7 item 1's outcome targets */; districtIntent: DistrictIntent[] /* §7.7 layer 2: the per-district intent — a town-wide default and each district's override; the input a district is generated from, never item 72's derived CharacterVector (J-A72.21, J-A72.41) */;
  history?: HistoryHint;        // item 88: the dossier's pre-creation history, a recipe input read by S2's growth-stage count and II.7.6's rules (§2.7; §4.2 S2) — staged, absent in the base
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
interface EpochRecord { epoch: number; seq: number; inputs: EpochInputs; postDigest: Hash128 }   // derived from the log's epoch events (§7.1); its week is inputs.week (§4.11). The document's current week is derived too — the week of the last folded event that carries one (§4.11's clock) — never a stored counter; the `week` view key (below) reads it
type RebaseReason = 'keptSnapshot'|'drawnConstraintsRebuilt'|'frozenImport';   // keeping the old model at an upgrade needs no rebase: the document stays at its own output version (§7.5), so no reason names it
interface UndoRecord { session: string; of: number /* the seq of the event this record undoes */; record: Uint8Array /* its §7.4 undo record, compressed */;
  redo?: EditEvent /* an unshared document's truncated target held on this session's redo stack (§7.4): the event itself with its original seq, so a redo after a reload re-appends it; every pack it names stays in `packs` while it is held */ }
```

* **One source of truth** (LC-24). Locks, assignments, table and preset edits (including tables a host supplies, which
  arrive as `editTable` / `editPreset` / `setStyle` events whose content is copied into the log with provenance `host`),
  epochs, undo and redo exist only as log events; their current effect lives in the entity records (flags, attributes)
  and in `derived` caches rebuilt from the base and the log. The blueprint's own assignments and edits enter as the log's
  first events (§7.7); dossier events (items 20, 22 and 73–75) enter the log through the host door (§11.4) — produced by the
  dossier port (§14) — with `author: 'host'`, `EditBase.dossier` and `EditBase.dossierChange` set, in the host's order — so the log is the ordered dossier history the map is a function of
  (§6.2), every map edit lives here and never in the dossier, and the module never writes the dossier (§11.3); the report,
  the statistics and the timings are §5.4's. A rebase never deletes events: the events
  before it stay in the log as history and as the rebase's undo path (§7.4), and the fold skips them while the base is
  the rebased state.
* **The dossier block (items 20 (h) (v), 74, 87; J-A74.71).** `Document.dossier` holds what the map knows of its dossier:
  the binding rows — each dossier key bound to the address that carries its `Identity.dossier` (§2.8) — the facts carried
  under those keys, their hash, and every absorbed state's hash (`DossierBinding`, `CarriedFacts`, declared with their
  mechanism in §7.7 item 12). It is canonical, and the model digest never hashes it, as with `hostContent`: the port writes it at
  creation and at each absorb, the fold rebuilds it from the log's dossier events, and a load checks the stored block
  against that rebuild (§6.2, §7.5). It is what `factTier` reads (§2.8), what an incoming dossier is diffed against (§7.7
  item 1) and where a host's undo finds the earlier state it converges to (`absorbed`, §7.7 item 5). It is counted beside
  the host content, outside the per-building budget below. A document with no dossier has none.
* **The skeleton file (item 101).** A skeleton is a document's declared subset as a file of its own — the ordered
  declarations, the creation prefix's and every event whose entities `factTier` reads `declared` (§2.8), with the
  recipe's seed, rung and pins — exported from any document and imported as a new document's creation prefix (§7.7's one
  path; its format §11.1's, its round trip §6.5 (9)'s).
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
  people); pack data, host content and the dossier block are counted separately (above). This section holds the document budget (§12
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
  `nextUndergroundPart`, `base`, `log`, `packs`, `hostContent`, `dossier` (when present), `style` and `model` (when
  present); `view`, `derived` and `undo` are never
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
  `week` (item 67: the week drawn — by default the document's current week (above); a host sets its campaign week there,
  a user scrubs it, §4.11's *Works* (9)), `light` (item 68: `'day'|'night'|'time'`, default `'day'`; `'time'` follows the
  `time` key's hour through the path sun), `sunMode` (`'cursor'|'fixed'|'path'`, default `'cursor'` where a pointer
  exists), `sunHeight` (s ≥ 1, default 1: the cursor sun stands over the pointer at 1 and recedes toward a near-parallel sun as it rises, §8.4 (d)),
  `handLantern` (underground only; off by default) — the pointer's position itself a transient input, never a view key,
  never stored, logged or shared (§8.4) —, `underlay` (item 101: an image the viewer traces over — the image, held by
  the viewer's app and never embedded in the canonical document, its opacity 0–1 (default 0.5) and its frame, a world-cm
  affine placement; never exported, never read by the model; §9.5 draws it), season, weather, frame, map rotation, compass, legend and emblem settings, `exportAnchor` (§11.1) and the people a
  user has opened live in `view`, outside every digest; the document's `style` stays canonical; each key is
  last-writer-wins by (Lamport counter, session id), so a viewer never writes the model. The key `session` holds an
  unshared document's authoring session (§7.4 "Sessions"); a client attached to a host bridge takes its session from
  `doc.load` instead and never writes this key (§11.3).
* **Permalinks** are §6.4; **migrations** are §7.5; the **edit log's replay semantics**, undo and redo are §7.4; the
  export → import → export round trip over the canonical form is a hard test (§13.2).

=== J-ROWS ===
| J-A88.21 | the dossier's remaining optional inputs declared now, schema-complete and empty: `ConditionOverlay`, `DepositSite` and `PowerRelation` as registry records keyed by their binding keys, `HistoryHint` on the recipe as a generation input (its readers J-A88.42's); the port fills them at the SettlementForge stage | §2.7, §2.9 |

=== RATIONALE-A ===
| J-A88.21 | Chose to declare the dossier's remaining optional inputs now — `ConditionOverlay`, `DepositSite` and `PowerRelation` as registry records keyed by their dossier keys, and `HistoryHint` as a field of the recipe that generation reads (S2's stage count and II.7.6's rules; J-A88.42) — schema-complete and empty in the base, over designing them when the SettlementForge stage opens, because the port must list an input and a derivation for every map fact (item 20 (h) (iv)), the islands' and tunnels' precedent (II.6) shows that empty records cost nothing, and declaring them now makes filling them a registration rather than a redesign. `HistoryHint` sits on the recipe, not on the map, because it is an input to generation, not a thing that stands anywhere (item 88; repair round 3, V-MC2-01). |

=== END ===
