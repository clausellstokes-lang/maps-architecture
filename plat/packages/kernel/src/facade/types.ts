// The façade's types (M0-a-16; §14 `interface Kernel`, §3.4 *Kernel operations the pipeline needs (complete list)*,
// *Arenas, keys and services*, *Transient arenas*; §3.3 *Two op forms*; C-0041, C-0078, C-0089, C-0112; readings
// C-0219). Types only.
//
// * `Kernel` is §14's six members — `plat(key)`, `view(key, level)`, `resolve(ref, key)`, `geom`, `index`, `tx` — plus
//   the derivation's `rng()` (§14's `Rng`, M0-d-01's one mixer, wired here and declared nowhere else) and `pool`, the
//   derivation pool's overlay API, a `notBuilt('M1')` stub (§3.3; M0.md §4b).
// * `GeomOps` is §3.4's complete list under its design names, in §3.4's order: the seventeen writers (each takes the
//   open transaction's overlay first, §3.3), the services, and the transient arena's three functions as
//   `notBuilt('M6-P')` stubs (C-0041); `resolveVertexAt` is a `notBuilt('M2a')` stub (C-0089). The arena block
//   (`encodeArena` / `decodeArena`) and the sampled medial axis are no members (C-0078).
// * A stub is a `NotBuiltStub`: an object no call can reach — calling it is a type error (TS2349) and, through a cast, a
//   TypeError — listed in `STUB_TABLE` with its milestone and its M0.md §4b row.
import type { FaceId, Plat, Resolved, RoleRow, Stamp } from '../arena/index.js';
import type { BandResult, bandUnion, booleans, buffer, Ring, tileRings } from '../arr/index.js';
import type { absorbSliver, claimSubFace, connectHole, mergeFaces, pinVertices, radialSplit, ringBand, splitFace } from '../faces/index.js';
import type { FaceNeighbours, FaceRings, hexLattice, hull, lir, obb, regularFit, Run, sampleBoundary, SideRunOptions } from '../geom/index.js';
import type { Box, Location, QueryKinds, QueryResult } from '../index/index.js';
import type { insertChain, splitThrough } from '../insert/index.js';
import type { area2, area2Big, KernelResult, orient } from '../num/index.js';
import type { Rng, RngOptions } from '../rng/index.js';
import type { skeleton } from '../skeleton/index.js';
import type { AnyProfile, clearFiner, Committed, KernelTx, Overlay, removeEdges, retypeEdges, setOwner } from '../tx/index.js';
import type { Cm, FaceRef, GeomRef, Id, LatticePoint, Level, PlatKey, VertexRef, VertexSig } from '../types/index.js';
import type { simplify, warp } from '../warp/index.js';

/** §3.4's transient arena key: the entity whose derivation opened it and a per-call number, never persisted (C-0041). */
export type TransientKey = { readonly transient: true; readonly owner: Id; readonly n: number };

/** §3.4: what `KernelTx.key` and `CommitRecord.key` name; `pointLocate`, `faceNeighbours` and `view` accept it (C-0041). */
export type ArenaKey = PlatKey | TransientKey;

/** §6.3's supersedes table — an old address → its successor — as `resolveVertexAt` reads it (§3.4; C-0089). */
export type CarryMap = ReadonlyMap<Id, Id>;

/** The milestones M0 stages kernel members and branches to (M0.md §4b). */
export type Milestone = 'M1' | 'M2a' | 'M2b' | 'M3a' | 'M4' | 'M6-P' | 'M6-U';

/**
 * A façade member staged to `M` (J156 (2)): a frozen object, never a function, so no call reaches it — `stub(…)` is a
 * type error, and through a cast a TypeError. `member` is its design name, `why` the §4b reason.
 */
export interface NotBuiltStub<M extends Milestone = Milestone> {
  readonly notBuilt: M;
  readonly member: string;
  readonly why: string;
}

/** The writer `F` with its first parameter — the transaction — read as the open overlay §3.3 hands a callback. */
export type OnTx<F> = F extends (tx: never, ...rest: infer R) => infer O ? (tx: Overlay, ...rest: R) => O : never;

/** §3.4's `claimSubFace` claim as the façade takes it: the ring form only — the score form is S7b's (M1, a stub row). */
export type RingClaim = { readonly ring: readonly { readonly x: number; readonly y: number }[] };

/**
 * §3.4's complete list (writers, services, the transient arena's functions) under its design names. Writers take the
 * open transaction's overlay (§3.3). The services `kerb`, `offsetFace` and `insetRing` take the design's forms without
 * the transaction — the façade binds the open one (they "read the open transaction's arena and are called only inside
 * one", §3.4); `sideRuns` and `sampleBoundary` take a face of the open transaction, or rings as values.
 */
export interface GeomOps {
  // ---- writers (§3.4's order: a declared batch's op-kind rank, M0-a-06's OP_KINDS) ----
  readonly insertChain: OnTx<typeof insertChain>;
  readonly splitThrough: OnTx<typeof splitThrough>;
  readonly removeEdges: OnTx<typeof removeEdges>;
  readonly clearFiner: OnTx<typeof clearFiner>;
  readonly retypeEdges: OnTx<typeof retypeEdges>;
  readonly setOwner: OnTx<typeof setOwner>;
  readonly splitFace: OnTx<typeof splitFace>;
  readonly connectHole: OnTx<typeof connectHole>;
  readonly mergeFaces: OnTx<typeof mergeFaces>;
  readonly absorbSliver: OnTx<typeof absorbSliver>;
  /** The ring form; the score form `{ areaCm2, within, score }` is S7b's (M1): unreachable here (STUB_TABLE). */
  readonly claimSubFace: (tx: Overlay, claim: RingClaim, owner: Id, opts?: { readonly rows?: readonly RoleRow[] }) => ReturnType<typeof claimSubFace>;
  readonly radialSplit: OnTx<typeof radialSplit>;
  readonly ringBand: OnTx<typeof ringBand>;
  /** §3.4's two-argument form: the spines' half-widths are the kernel's `spineWidths` (C-0212 (1)). */
  readonly corridorUnion: (tx: Overlay, l1Faces: FaceRef | readonly FaceId[]) => KernelResult<BandResult>;
  readonly bandUnion: OnTx<typeof bandUnion>;
  readonly warp: OnTx<typeof warp>;
  readonly pinVertices: OnTx<typeof pinVertices>;
  // ---- services ----
  readonly resolve: (ref: GeomRef, key: PlatKey) => Resolved;
  /** `notBuilt('M2a')`: the edit log's replay of a `moveVertex` is its first reader (C-0089). */
  readonly resolveVertexAt: NotBuiltStub<'M2a'>;
  readonly signature: (key: PlatKey, v: VertexRef | LatticePoint) => VertexSig;
  readonly sampleProfile: (p: AnyProfile, owner: Id, key: PlatKey, atCm: Cm | 'perVertex') => number[] | string[];
  readonly kerb: (face: FaceId) => KernelResult<Ring[]>;
  readonly booleans: typeof booleans;
  readonly tileRings: typeof tileRings;
  readonly buffer: typeof buffer;
  readonly offsetFace: (face: FaceId, perEdgeCm: readonly (Cm | number)[]) => KernelResult<Ring[]>;
  readonly insetRing: (face: FaceId, dCm: Cm | number) => KernelResult<Ring[]>;
  readonly skeleton: typeof skeleton;
  readonly simplify: typeof simplify;
  readonly hexLattice: typeof hexLattice;
  readonly obb: typeof obb;
  readonly hull: typeof hull;
  readonly lir: typeof lir;
  readonly sideRuns: (face: FaceId | FaceRings, turnTolCdeg: number, opts?: SideRunOptions) => Run[];
  readonly sampleBoundary: (face: FaceId | FaceRings, stepCm: number) => ReturnType<typeof sampleBoundary>;
  readonly pointLocate: (key: ArenaKey, level: Level, p: LatticePoint) => Location;
  readonly faceNeighbours: (key: ArenaKey, face: FaceId, level: Level) => FaceNeighbours;
  readonly area2: typeof area2;
  readonly area2Big: typeof area2Big;
  readonly orient: typeof orient;
  readonly regularFit: typeof regularFit;
  // ---- the transient arena (§3.4; M6-P, C-0041) ----
  readonly transientArena: NotBuiltStub<'M6-P'>;
  readonly readBack: NotBuiltStub<'M6-P'>;
  readonly release: NotBuiltStub<'M6-P'>;
}

/**
 * §14's `view(key, level)`: the level-n view of one arena (§2.2 rule 2), stamped with the arena's key and version and
 * valid until its next commit — in a debug build every read asserts the stamp is current (§3.4).
 */
export interface LevelView extends Stamp {
  readonly level: Level;
  /**
   * The live face records of this level, in canonical face order (§3.3's keys). A coarser face that is its own child
   * here holds no record of this level (§2.2 rule 2) and is not listed: `pointLocate` names it (C-0219 (4)).
   */
  faces(): FaceId[];
  /** A face's rings in this view: the outer ring counter-clockwise, then the holes (values that outlive the commit). */
  rings(face: FaceId): LatticePoint[][];
  /** A face's owner (an address id), or null. */
  owner(face: FaceId): Id | null;
  /** The canonical query of this level (§3.3 *Queries*). */
  query(box: Box, kinds?: QueryKinds): QueryResult;
  /** §3.4's `pointLocate` at this level. */
  pointLocate(at: LatticePoint): Location;
  /** §3.4's `faceNeighbours` at this level. */
  neighbours(face: FaceId): FaceNeighbours;
}

/** §14's `index`: the spatial index's doors, by key (§3.3 *Spatial indexes*, *Tombstones and rebuilds*). */
export interface IndexOps {
  /** The canonical level-n query over the static partitions and the grid (§3.3 *Queries*). */
  query(key: PlatKey, level: Level, box: Box, kinds?: QueryKinds): QueryResult;
  /** §3.4's `pointLocate(key, level, p)`. */
  pointLocate(key: ArenaKey, level: Level, at: LatticePoint): Location;
  /** Rebuild moment (1), a stage's end: every dirty partition, or a district's own (§3.3); the partitions rebuilt. */
  rebuildAtStageEnd(key: PlatKey, district?: string): number;
}

/** §14's `interface Kernel`: the doors a stage sees. */
export interface Kernel {
  /** The arena a key names (a programming error for a key this kernel does not hold). */
  plat(key: PlatKey): Plat;
  /** The level-n view of an arena; a transient arena's (level 0 only) is M6-P's. */
  view(key: ArenaKey, level: Level): LevelView;
  /** §3.4's `resolve(ref, key)`: current slots stamped with the arena's key and version; no geometry resolves empty. */
  resolve(ref: GeomRef, key: PlatKey): Resolved;
  readonly geom: GeomOps;
  readonly index: IndexOps;
  /**
   * §14's `tx(tx, fn?)`: exactly one form — `tx.ops` (declared) or `fn` (callback), never both (an assertion, §3.3).
   * Returns the commit (its record, null when nothing was written, and the ops' or the callback's value).
   */
  tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<Committed<T | KernelResult<unknown>[]>>;
  /** A derivation's `Rng` (§14): M0-d-01's one mixer, created per stage run or scope it derives (§6.1). */
  rng(options?: RngOptions): Rng;
  /** The derivation pool's overlays (§3.3): M1's (§4b). */
  readonly pool: NotBuiltStub<'M1'>;
  /**
   * The debug build's stamp check on a value a façade call returned: it names `key`'s arena (or, without `key`, an
   * arena of this kernel) at its current version, else it throws (a stale or foreign slot, §3.4, §3.11). A no-op when
   * the build does not assert.
   */
  assertCurrent(value: unknown, key?: PlatKey): void;
}
