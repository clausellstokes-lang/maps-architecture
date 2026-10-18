// Districts, blocks, frontages, plots, reservations, allocations and the field bands (§2.5's head; M0-m-01). Field
// names, order and types as §2.5 declares them. `District` carries the fields M0's S6 writes (M0-e-04) and the
// optional fields whose types §2.5 and §2.8 state; its other required fields, and `Block.frontages` (S9's, M1), are
// staged (schema/staged.ts, C-0142 (2)). `Plot` and `Allocation` are declared whole: no M0 stage writes them, and the
// digest's schema-shaped workload reads their shape (C-0015). Types only.
import type {
  AssignmentRef,
  BuildingClass,
  ChainRef,
  Cdeg,
  Cm,
  DerivationRecord,
  DistrictKind,
  EdgeSetRef,
  FabricStrategyId,
  FaceRef,
  Id,
  Lifecycle,
  M,
  NameRef,
  PlotUse,
  PointCm,
  StageId,
  TextRef,
  VertexRef,
} from '../types/index.js';
import type { WayClass } from './network.js';

/** A district (§2.5): feature-named, data-defined, never a social class — the fields M0 writes (C-0142 (2)). */
export interface District {
  id: Id;
  kind: DistrictKind;
  /** The label-level grouping (§9.1). */
  quarter: Id;
  /** L1 coarse faces, before and after infill. */
  faces: FaceRef;
  /** Its Seam records (II.1). */
  seams: Id[];
  growthStage: number;
  /** Item 72 (d′): its quarter identity (§4.5 (4)). */
  identity?: { row: string; source: 'dossier' | 'emergent' | 'dominant' | 'plain'; sinceWeek: number };
  /** Item 72 (c): the names a rename replaced, oldest first. */
  nameHistory?: NameRef[];
  /** Item 65: an undercity neighbourhood's surface district (II.7.5). */
  parent?: Id;
  /** Item 110 (a): a declared terracing (V01 §2.2). */
  terrace?: 'on' | 'off';
  /** Item 65: an undercity neighbourhood's sewer-front blocks in part 0 (II.7.3). */
  outskirts?: Id[];
  /** Item 65: an undercity neighbourhood's main chamber (II.7.5). */
  core?: Id;
  /** A registered fabric: 'bent-cut' in the base and the parity presets. */
  fabric: FabricStrategyId;
  /** The template's parameters. */
  fabricParams: Record<string, number>;
  /** A generated one-line summary of the mix and features (§10.4). */
  description?: TextRef;
  namingFeature?: Id;
  name?: NameRef;
  lifecycle: Lifecycle;
}

/** S9b's dispatch output (V01 §3.5); 'ordinary' in every document written before M5. */
export type BlockKind = 'ordinary' | 'manor' | 'square' | 'green' | 'yard';

/** A square's function (V01 §3.5.3). */
export type SquareType = 'forecourt' | 'crossroads' | 'bridgehead' | 'trading' | 'well' | 'plain';

/** §2.7's uniform instance-override field: written when the instance event applies. */
export type InstanceOverride = { seq: number; at?: PointCm; recorded?: PointCm };

/** A block (§2.5): S8 writes its deep-interior treatment at M0; its frontages are S9's (staged, M1). */
export interface Block {
  id: Id;
  /** L2 built block(s). */
  face: FaceRef;
  district: Id;
  subDistrict?: Id;
  /** S8's deep-interior test (§4.6). */
  depthClass: 'standard' | 'deep';
  /** The deep-interior treatment, decided in S8 (§4.6). */
  interior:
    | 'plots'
    | 'court'
    | 'back_lane'
    | 'through_alley'
    | 'rear_plots'
    | 'green'
    | 'landmark'
    | 'reserved'
    | 'wall_strip'
    | 'empty'
    | 'rim_strip';
  /** Item 30: how a court or rear-row interior is reached from the public way (§4.6). */
  reach: 'open' | 'passage' | 'gated';
  /** Item 31: the block's value crossed a cut past the hysteresis at an epoch. */
  due?: { band: string; since: number; epochs: number };
  reservation?: Id;
  content: BlockKind;
  squareType?: SquareType;
  ringCentre?: true;
  voidCorner?: { junction: VertexRef; radiusCm: Cm };
  overrides?: InstanceOverride[];
  /** Item 110 (a): the platform datum of a levelled block. */
  platformCm?: Cm;
  platformSteps?: { line: ChainRef; datumCm: Cm }[];
  lifecycle: Lifecycle;
}

/** A block's frontage on one way (§2.5). */
export interface Frontage {
  id: Id;
  way: Id;
  /** ('frontage', frontage id): the L2 kerb edges of this block on this way. */
  edges: EdgeSetRef;
  class: WayClass;
  /** Written by S9 with the edges. */
  lengthCm: Cm;
  lifecycle: Lifecycle;
}

/** The boundary treatment of a plot edge (§2.5; VIS-8). */
export interface PlotBound {
  id: Id;
  /** ('treatment', bound id): the treated sub-edges. */
  edges: EdgeSetRef;
  side: 'frontage' | 'side' | 'rear';
  treatment: 'none' | 'fence' | 'hedge' | 'wall' | 'railing';
  heightCm: Cm;
  gates: { opening: EdgeSetRef; widthCm: Cm }[];
  ownedBy: Id;
  lifecycle: Lifecycle;
}

/** A typed yard sub-area (§2.5). */
export interface YardPart {
  id: Id;
  /** Data-defined: yard, garden, court, orchard, midden, … */
  kind: string;
  /** L4. */
  face: FaceRef;
  lifecycle: Lifecycle;
}

/** A site plan slot (§2.5): persisted, no polygon. */
export interface BuildingSlot {
  role: string;
  /** ('access', plot id): the access edges the slot's main entrance faces. */
  entranceOn: EdgeSetRef;
  frontage?: 'none' | 'lean_to' | 'stall' | 'shopfront' | 'arcade' | 'gate' | 'wall';
  unhoused?: true;
}

/** A plot's site plan (§2.5). */
export interface SitePlan {
  arrangement: 'row' | 'compound' | 'detached' | 'hovel' | 'tents' | 'institution' | 'cluster' | 'none';
  coverage: number;
  slots: BuildingSlot[];
  /** The drawn front-line recession h (§4.7 S11, item 43). */
  frontJitterCm: Cm;
  ruleRow: string;
}

/** The one per-plot vector every rule table reads (§2.5). */
export interface ContextVector {
  areaM2: number;
  shape: { obbW: M; obbD: M; compactness: number; reflex: number; corner: boolean; wedge: boolean };
  frontageM: number;
  roadClass: WayClass;
  roadWidthM: number;
  districtKind: DistrictKind;
  quarter: Id;
  venueMix: Id;
  prosperity: number;
  prosperityBand: string;
  density: number;
  greenery: number;
  dist: { centre: M; plaza: M; market: M; gate: M; wall?: M; water: M; shore: M; harbour?: M };
  upstream: number;
  slope: number;
  aspect: Cdeg;
  upwind: number;
  baseCm: Cm;
  terrainClass: 'high' | 'mid' | 'low' | 'damp' | 'flood' | 'rock';
  growthStage: number;
  epoch: number;
  buildingScale: number;
  arena: 'ground' | 'underground' | 'sky';
  rosterAssignment?: AssignmentRef;
  assignment?: AssignmentRef;
}

/** A plot (§2.5): the parcel. No M0 stage writes it; its shape is declared whole. */
export interface Plot {
  id: Id;
  /** L3. */
  face: FaceRef;
  block: Id;
  district: Id;
  /** ('frontage', plot id). */
  frontage: EdgeSetRef;
  /** ('access', plot id): ≥ 1 edge always (§5.2 F-PLOT). */
  access: EdgeSetRef;
  depthCm: Cm;
  frontageCm: Cm;
  exposure: 'street' | 'lane' | 'alley' | 'court' | 'hidden' | 'sealed';
  knownTo: 'public' | 'local' | 'secret';
  tenure: 'owned' | 'rented' | 'common' | 'informal';
  /** ('party_wall', plot id). */
  partyWalls: EdgeSetRef;
  bounds: PlotBound[];
  owner?: Id;
  use: PlotUse;
  sitePlan: SitePlan;
  buildings: Id[];
  yard: YardPart[];
  builtBand: string;
  builtProsperity: number;
  fieldBand: string;
  ctx: ContextVector;
  /** §2.8: outside the model digest, inside the records digest (§6.2). */
  derivedFrom: DerivationRecord;
  assignment?: AssignmentRef;
  /** Joined plots. */
  members?: Id[];
  /** G item 110 (d): a plot on a bridge, pier, mole or quay platform (§2.7's Deck plots). */
  deck?: { host: Id; kind: 'bridge' | 'pier' | 'mole' | 'quay'; surfaceCm: Cm | null; landmark: boolean };
  platformCm?: Cm;
  platformSteps?: { line: ChainRef; datumCm: Cm }[];
  lifecycle: Lifecycle;
}

/** A large claim made before the streets or before the lanes (§2.5). */
export interface Reservation {
  id: Id;
  kind:
    | 'castle'
    | 'plaza'
    | 'market'
    | 'precinct'
    | 'institution'
    | 'park'
    | 'harbour_basin'
    | 'moat'
    | 'canal'
    | 'landing'
    | 'green';
  /** Market kinds only (item 24). */
  rank?: 'principal' | 'secondary';
  /** L1 barrier face(s); water kinds are L0 faces. */
  face: FaceRef;
  areaBandM2: [number, number];
  compactnessMin?: number;
  /** Castle, institution, commons. */
  owner?: Id;
  handedFrom?: Id;
  /** ('attach', reservation id, i): perimeter vertices arterials end at (§2.2 rule 5). */
  attach: VertexRef[];
  /** S3, S7 (gate plazas), S7b, or S8 — the stage-id registry's id (C-0112, C-0134 (9)). */
  stage: StageId;
  lifecycle: Lifecycle;
}

/** The persisted content decision (§2.5, §4.5 S7b). Declared whole; no M0 stage writes it. */
export interface Allocation {
  id: Id;
  level: 'town' | 'district' | 'block';
  target: Id;
  rows: {
    cls: BuildingClass;
    band: string;
    count: number;
    claim?: Id;
    subDistrict?: Id;
    near?: Id;
    areaM2?: number;
    /** A positioned row: a sky landing's foot (V05 §3.10). */
    at?: PointCm;
    access?: Id;
  }[];
  lifecycle: Lifecycle;
}

/** The band cuts of one field, computed once per town at S6 (§2.5, §4.5). */
export interface FieldBands {
  field: 'prosperity' | 'density' | 'greenery';
  /** Ascending, on the field's [0, 1] value. */
  cuts: number[];
  /** Default 0.02. */
  hysteresis: number;
  /** The band set's ids in order — cuts.length + 1 of them. */
  bands: string[];
  /** The settlement's middle band (§4.5; J-A27.42). */
  middle: string;
  source: 'roster-shares' | 'table' | 'edit';
  epoch: number;
}
