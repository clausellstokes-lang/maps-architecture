// Terrain and water (§2.3; M0-m-01): the records S1 writes at M0. Field names, order and types as §2.3 declares them;
// Terrain's `geology` and `mining` are staged to M1 with the geology flag (§4b, C-0048; schema/staged.ts). `Polyline`
// and `SiteFeature`, which §2.3 names without declaring, are read as C-0142 (4) states. Types only.
import type { ChainProfile, ChainRef, Cm, CmArray, FaceRef, Id, PlatKey, Point, PointCm } from '../types/index.js';
import type { Lifecycle } from '../types/identity.js';

/** An open polyline in arena coordinates (C-0142 (4)): a river's course, the entity's own derived line (§2.3). */
export type Polyline = PointCm[];

/** The site feature kinds §2.3 lists (`Terrain.features`). */
export type SiteFeatureKind = 'hill' | 'spur' | 'valley' | 'terrace' | 'cliff' | 'ravine';

/**
 * A site feature (C-0142 (4)): its kind and its anchor point — a point that is no vertex, an ordinary attribute of
 * the record (§2.2 rule 5); terrain is not in the plat (§2.3). A feature's ordinal is its index in
 * `Terrain.features` (§2.7's RaisedReasonKey reads it).
 */
export interface SiteFeature {
  kind: SiteFeatureKind;
  at: PointCm;
}

/** The hydrology raster (§2.3): frame + margin, coarser than the height raster. */
export interface HydroGrid {
  /** TOWN 1 600, CITY 2 500, METROPOLIS 3 200 (table values at creation; kept through frame growth). */
  cellCm: Cm;
  cols: number;
  rows: number;
  /** The same extent as the height raster. */
  originX: Cm;
  originY: Cm;
}

/** The receiving water of an outfall (§2.3; V04 §2.1 cites it). */
export type OutfallInto = 'sea' | 'lake' | 'river' | 'canal' | 'ditch' | 'moat' | 'frame' | 'stream' | 'field';

/** A drainage outlet (§2.3; §4.2 S1 (9)). */
export interface Outfall {
  into: OutfallInto;
  /** The receiving WaterBody; null for 'frame' and 'field'. */
  water: Id | null;
  /** The bank point, the frame-edge point, or the field's point: a point-anchored value (§7.4's point rule). */
  at: PointCm;
  /** The `hydro` cell containing `at`, re-found whenever `at` moves. */
  cell: number;
}

/** A site's terrain (§2.3): the ground's, or one sky island's own. */
export interface Terrain {
  id: Id;
  key: PlatKey;
  /** The height raster: frame + margin (§3.2 (9)). */
  cellCm: Cm;
  cols: number;
  rows: number;
  originX: Cm;
  originY: Cm;
  /** The elevation that height 0 represents, relative to mean sea level; set by S1. */
  datumCm: Cm;
  /** Above datum. */
  heightCm: Int32Array;
  /** 1 000 000 (10 km): the declared range every write is checked against. */
  reliefLimitCm: Cm;
  hydro: HydroGrid;
  /** On `hydro`: D8, defined on every land cell of frame and margin, flats included. */
  flowDir: Uint8Array;
  /** On `hydro`: flat-resolution order; 0 off flats. */
  flatRank: Uint32Array;
  /** On `hydro`. */
  flowAccum: Uint32Array;
  /** S1 (3)'s drainage outlets (§4.2 S1 (9)). */
  outfalls: Outfall[];
  /** In the datum frame. */
  seaLevelCm: Cm;
  wind: { bearingCdeg: number; strength: number };
  features: SiteFeature[];
  lifecycle: Lifecycle;
}

/** Point queries on the terrain (§2.3): bilinear; the 2.5 m refinement is computed on demand, never stored. */
export interface TerrainSampler {
  heightAt(p: Point): Cm;
  slopeAt(p: Point): number;
  /** The `hydro` cell containing p. */
  flowAt(p: Point): { dir: number; accum: number };
}

/** A body of water (§2.3). */
export interface WaterBody {
  id: Id;
  kind:
    | 'sea'
    | 'lake'
    | 'river'
    | 'tributary'
    | 'distributary'
    | 'islet_channel'
    | 'pond'
    | 'moat'
    | 'estuary'
    | 'harbour_basin'
    | 'canal'
    | 'ditch'
    | 'oxbow';
  /** L0. */
  face: FaceRef;
  /** ('shore', id): its ring(s). */
  shore: ChainRef;
  /** Rivers: the reach's centreline downstream, kept in step with the shores. */
  course?: Polyline;
  /** Rivers: S1's control knots in course order — recorded inputs, not arena vertices (§2.2 rule 5). */
  controls?: { ordinal: number; at: PointCm }[];
  /** The next free knot ordinal. */
  nextControl?: number;
  /** Per `course` vertex. */
  widthProfile?: CmArray;
  depthCm?: Int16Array;
  flowFrom?: Id;
  flowTo?: Id;
  /** A sky island's conjured river whose outfall is the rim (V05 §3.8). */
  fall?: true;
  /** Oxbow: the river it was cut off from. */
  cutFrom?: Id;
  /** Oxbow: the epoch of its cut-off. */
  epoch?: number;
  /** Item 111: a spring-fed pond or small lake — an oasis's water. */
  spring?: { at: PointCm; flow: number };
  /** Step, on the shore chain (G-R5). */
  bankKinds?: ChainProfile<'beach' | 'rock' | 'cliff' | 'quay' | 'marsh'>;
  /** Step, on the shore chain. */
  shoreClass?: ChainProfile<'bay' | 'headland' | 'straight'>;
  lifecycle: Lifecycle;
}
