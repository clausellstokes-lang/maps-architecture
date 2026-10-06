// The transaction's public types (§3.3: KernelTx, BatchScope, CommitRecord; §3.4: the writers' result shapes; §14's
// `tx(tx, fn?)` and its `Overlay`). M0-a-06. Readings: C-0185.
//
// `BatchScope` is declared here, in the kernel (C-0112's pattern: the kernel cannot import @plat/model, and §3.3's
// `KernelTx.batch` reads it); @plat/model's structurally identical declaration (M0-m-01, C-0142 (8)) can become a
// re-export of this one in its owner's file. `KernelTx.key` names a PlatKey; a transient arena's key (§3.4's
// `TransientKey`, M0-a-16's declaration, C-0041) is accepted by shape and refused `notBuilt('M6-P')` (§4b).
import type { FaceId, HalfEdgeId, Plat, VertexId } from '../arena/index.js';
import type { LineageHash } from '../hash/index.js';
import type { InsertTx } from '../insert/index.js';
import type { KernelResult, Warning } from '../num/index.js';
import type { ChainProfile, Id, Invariant, Level, Order, PlatKey, Polygon, RoleKey, RoleName, StageId, VertexRef } from '../types/index.js';

/** §3.3's batch scope: one growth stage, one district's infill, one block's subdivision, one edit, or a transient arena's entity. */
export type BatchScope =
  | { kind: 'stage'; stage: StageId }
  | { kind: 'district'; id: Id }
  | { kind: 'block'; id: Id }
  /** `edit` is an event's `seq` (§7.1's EditId, the model's name for a number). */
  | { kind: 'edit'; edit: number }
  | { kind: 'entity'; id: Id };

/** §3.4's TransientKey by shape (its declaration is M0-a-16's, C-0041); a transaction on one is M6-P's (§4b). */
export interface TransientKeyShape {
  readonly transient: true;
  readonly owner: Id;
  readonly n: number;
}

/** What `KernelTx.key` names: §3.3's ArenaKey — a PlatKey, or a transient arena's key. */
export type TxKey = PlatKey | TransientKeyShape;

/** §3.3's onFail: the §5.1 tier a failed expect entry enters (reject 1, repair 2, downgrade 4). */
export type OnFail = 'reject' | 'repair' | 'downgrade';

/** §3.3's KernelTx. */
export interface KernelTx {
  key: TxKey;
  /** The batch's one level (§3.3 *One level per transaction*). */
  level: Level;
  /** Declared form only: independent ops, applied in canonical order; [] in the callback form. */
  ops: KernelOp[];
  /** §5.3's batch-scope hard rows the batch is checked against (class floors and named checks). */
  expect: Invariant[];
  onFail: OnFail;
  batch: BatchScope;
  /** The stage whose code issues the batch (its rank is the faces' `stage` when the batch re-owns them). */
  stage: StageId;
  /** The earliest stage this batch re-derives: finer faces of a stage ranked before it are kept content (§3.3). */
  rederivesFrom: StageId;
  /** Declared; a clear-region batch is M3a's (`notBuilt('M3a')`, §4b). */
  clearRegion?: Polygon[];
  /** Declared; a clear-region batch's prepared contacts are M3a's (`notBuilt('M3a')`, §4b). */
  prepared?: VertexRef[];
  /** Operations (a count, never a clock), from the stage's declaration; any finite value ≥ 0 (C-0185 (5)). */
  workLimit: number;
}

/**
 * §3.4's writers, in the order §3.4 lists them: a declared batch's op-kind rank is the position here (C-0185 (2)).
 * The writers later items build (the face partitioners, the arrangement's bands, warp, pinVertices) run in a declared
 * batch through `kernelOp` with their own `apply`.
 */
export const OP_KINDS = Object.freeze([
  'insertChain', 'splitThrough', 'removeEdges', 'clearFiner', 'retypeEdges', 'setOwner', 'splitFace', 'connectHole',
  'mergeFaces', 'absorbSliver', 'claimSubFace', 'radialSplit', 'ringBand', 'corridorUnion', 'bandUnion', 'warp',
  'pinVertices',
] as const);

/** One of §3.4's writers. */
export type OpKind = (typeof OP_KINDS)[number];

/**
 * One op of a declared batch (§3.3 *Two op forms*): its kind, the owning entity's lineage key (§6.3, its 64-bit hash),
 * the op's index within that entity's stream path — the three parts of the canonical sort key — and the writer call it
 * stands for, applied to the open overlay.
 */
export interface KernelOp<T = unknown> {
  readonly kind: OpKind;
  readonly lineage: LineageHash;
  readonly index: number;
  readonly apply: (overlay: Overlay) => KernelResult<T>;
  /**
   * Reads, never writes or charges: called for every op of a declared batch, in canonical order, when the batch opens and
   * before any op applies, so an op can name what it acts on as the batch found it (a splitThrough op's edge piece,
   * C-0189).
   */
  readonly prepare?: (overlay: Overlay) => void;
}

/** A per-level dirty set entry: the face records a batch created, changed and removed at one level (§3.3). */
export interface LevelDirt {
  readonly level: Level;
  readonly created: FaceId[];
  readonly changed: FaceId[];
  readonly removed: FaceId[];
}

/** §3.3's CommitRecord: returned by every commit; kernel-internal slots, never persisted. */
export interface CommitRecord {
  readonly version: number;
  readonly key: PlatKey;
  readonly level: Level;
  /** The dirty set, per level ≥ the batch's level (one entry per level, coarsest first). */
  readonly faces: LevelDirt[];
  readonly edgesAdded: number;
  readonly edgesRemoved: number;
  readonly steinerAdded: number;
  readonly steinerDissolved: number;
  /** The operations the batch charged (its work-limit total). */
  readonly work: number;
  /** Vertices a warp or smoothing moved, Steiner re-seats and slides included, by lattice position (M0-a-13's commit journals them, C-0197). */
  readonly moved: VertexId[];
  readonly promoted: VertexId[];
  readonly demoted: { readonly vertices: VertexId[]; readonly edges: HalfEdgeId[] };
  readonly unflagged: VertexId[];
  /** Entities whose faces changed, in address-id order. */
  readonly owners: Id[];
  /** (role, entity, ordinal) keys whose chains changed, in rule 7's order. */
  readonly roles: RoleKey[];
  readonly warnings: Warning[];
}

/**
 * The digest hook's input (§3.3 *The commit record*: "at commit the kernel re-hashes the leaves the batch touched"):
 * what M0-d-04's Merkle update reads — the arena, its new version, the per-level dirty faces and the touched entity
 * leaves. Handed to `TxEnv.onCommit` after every commit.
 */
export interface DirtySet {
  readonly key: PlatKey;
  readonly version: number;
  readonly faces: readonly LevelDirt[];
  readonly owners: readonly Id[];
  readonly roles: readonly RoleKey[];
}

/** A locked or pinned owner `clearFiner` meets (§3.3's clear rule): returned, never removed. Locks and pins are M2a's. */
export interface Conflict {
  readonly entity: Id;
  readonly reason: 'locked' | 'pinned';
}

/** A profile value (§2.2's ChainProfile values). */
export type ProfileValue = number | string | Order;

/** A part's profile after a cut or a join: the knot profile, or the scalar a part with no knot left takes (§2.2 rule 5). */
export type ProfileOut = ChainProfile<number> | ChainProfile<string> | ChainProfile<Order> | number | string | Order;

/** `retypeEdges`' result (§3.4): both entities' new profiles per knot role (`from` absent when `from` keeps no edge). */
export interface RetypeResult {
  readonly profiles: { readonly knotRole: RoleName; readonly from?: ProfileOut; readonly to: ProfileOut }[];
}

/** `removeEdges`' result: the remaining part's profile per knot role handed in (C-0185 (9)); [] when none is. */
export interface RemoveResult {
  readonly profiles: { readonly knotRole: RoleName; readonly value?: ProfileOut }[];
}

/** A class floor's values (§4.7's class-floor row): a width, an area and an angle, each optional. */
export interface ClassFloor {
  readonly minWidthCm?: number;
  readonly minAreaCm2?: number;
  readonly minAngleCdeg?: number;
}

/** What a class floor or a check reads: the open overlay and the faces the batch touched at its level, canonically ordered. */
export interface ExpectView {
  readonly plat: Plat;
  readonly level: Level;
  readonly faces: readonly FaceId[];
}

/**
 * The services a transaction is handed (injected — the kernel imports no table and no later item, §14): the class
 * floors and named checks of `expect`, the stage ranks, the repairer of `onFail: 'repair'` (M0-a-07's `absorbSliver`
 * until it lands), role consistency's declared part counts, the invariant suite's hook (M0-a-14) and the digest
 * listener (M0-d-04).
 */
export interface TxEnv {
  /** §4.7's class-floor row for a face class (the tables' cell); absent: the class declares no floor. */
  readonly floors?: (faceClass: string) => ClassFloor | undefined;
  /** Whether a touched face of the batch's level is of the class (default: every touched face is, C-0185 (11)). */
  readonly appliesTo?: (faceClass: string, plat: Plat, level: Level, face: FaceId) => boolean;
  /** A face's width in centimetres (default: its own-level outer ring's OBB minor extent, C-0185 (11)). */
  readonly width?: (plat: Plat, level: Level, face: FaceId) => number;
  /** §5.3's named checks: null when the row holds, else the failure's detail. */
  readonly checks?: Readonly<Record<string, (view: ExpectView) => string | null>>;
  /** The §4.1 rank of a stage (M0-x-04's table; default: the stage id, the base's stages registered in §4.1's order). */
  readonly rankOf?: (stage: StageId) => number;
  /** §3.6's sliver rule on the overlay (M0-a-07's absorbSliver): repair a face below its width or area floor. */
  readonly repair?: (overlay: Overlay, face: FaceId, floor: { minWidthCm: number; minAreaCm2: number }) => KernelResult<FaceId>;
  /** How many connected parts an entity's linear role declares (default: C-0185 (8)'s table); null: not counted. */
  readonly chainParts?: (role: RoleName, entity: Id) => number | null;
  /** M0-a-14's batch-local suite: problems found on the committed-to-be arena, [] when every row holds. */
  readonly invariants?: (plat: Plat, record: CommitRecord) => string[];
  /** M0-d-04's digest listener: called once per commit with the dirty set. */
  readonly onCommit?: (plat: Plat, dirty: DirtySet, record: CommitRecord) => void;
}

/** The open overlay `fn` is handed (§14's `Overlay`): the transaction every writer takes. */
export type Overlay = InsertTx & { readonly open: true };
