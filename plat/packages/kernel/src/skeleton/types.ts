// The straight skeleton's types (M0-a-11; §3.4's `skeleton(rings, use): KernelResult<Skeleton>`, §3.8, §5.2
// F-SKELETON). `Skeleton` is what §3.4 names: the validated output — nodes with offset times, arcs, the face of each
// input edge — or a typed downgrade, one per reader (§3.8 *Readers and their downgrades*). Values only: nothing of the
// skeleton is stored (§3.8 *Decision*), so a load, an undo or a regeneration derives it again from the same rings.
import type { LatticePoint, Polygon } from '../types/index.js';

/** §3.8's three readers. */
export type SkeletonUse = 'roof' | 'spine' | 'regions';

/** A skeleton node: a point in world centimetres (doubles, never arena coordinates) and its offset time in cm. */
export interface SkeletonNode {
  x: number;
  y: number;
  /** The offset time: the node's distance to the supporting lines of its faces (§3.8 (3)); 0 on the input rings. */
  t: number;
}

/**
 * A skeleton arc from node `a` to node `b`, traced by one wavefront vertex from where it was born to where it died;
 * `left` and `right` are the input edges (indices into `SkeletonGraph.edges`) whose faces lie left and right of a → b.
 */
export interface SkeletonArc {
  a: number;
  b: number;
  left: number;
  right: number;
}

/**
 * An input edge of the cleaned rings (§3.8's pre-clean merges collinear vertices and drops spurs — exact zero-width
 * ones, C-0276, and inexact ones within `attractCm`, the hardening round S3): `ring` is the caller's ring index, `from`
 * and `to` the caller's vertex indices of its two ends in that ring (a merged run, or a dropped spur, spans the vertices
 * between; an exact spur's root keeps its first visit in walk order, read cyclically from the tip, C-0283 (2)).
 */
export interface SkeletonEdge {
  ring: number;
  from: number;
  to: number;
}

/**
 * The validated output (§3.8): every one passed `validateSkeleton` before it was returned. Nodes 0 … n − 1 are the
 * cleaned rings' vertices in ring order (t = 0); input edge i runs from node i to the next vertex of its ring, and its
 * face is `faces[i]` — the node cycle i, next(i), …, back along the arcs, counter-clockwise.
 */
export interface SkeletonGraph {
  kind: 'skeleton';
  use: SkeletonUse;
  /** The rings as the engine read them: collinear vertices merged and spurs dropped (a hole that is all spur dropped whole), the outer ring counter-clockwise first, every hole clockwise, each started at its lowest-leftmost vertex (world lattice points). */
  rings: Polygon[];
  edges: SkeletonEdge[];
  nodes: SkeletonNode[];
  arcs: SkeletonArc[];
  faces: number[][];
  /** The events the queue processed — what the caller charges to `skeleton.events` (M0.md §2.2). */
  events: number;
}

/** The numeric contract's refusals and the input checks that precede it (§3.8 *Numeric contract*; C-0168 (3)). */
export type ContractRefusal = 'empty' | 'degenerate' | 'notSimple' | 'sharpCorner' | 'holeContact' | 'holeOutside';

/** The four post-conditions of §3.8's validator. */
export type ValidatorCheck = 'planarity' | 'faces' | 'heights' | 'topology';

/** Why a reader took its downgrade (§3.8: a validator failure, `E_WORK_LIMIT`, or an input the contract refuses). */
export type SkeletonFailure =
  | { code: 'contract'; refusal: ContractRefusal; at?: LatticePoint }
  | { code: 'E_WORK_LIMIT'; count: number; limit: number }
  | { code: 'validator'; check: ValidatorCheck; detail: string };

/** Each reader's typed downgrade (§3.8, §5.2 F-SKELETON). */
export type DowngradePath = 'plainRoof' | 'medialAxis' | 'reflexPreCut';

/**
 * A reader's downgrade, reported `W_DOWNGRADE`: `roof` → a plain roof (the footprint without ridge or hip lines,
 * heights unchanged); `spine` → the sampled medial axis, filled from the caller's injected sampler (`axis`, M0-a-12's);
 * `regions` → the caller's reflex pre-cut partition (§4.7, §5.2 F-PLOT; M1). `events` counts what ran (0 when the
 * contract refused the rings without running).
 */
export interface SkeletonDowngrade<A = unknown> {
  kind: 'downgrade';
  use: SkeletonUse;
  to: DowngradePath;
  cause: SkeletonFailure;
  events: number;
  /** The injected sampler's axis (`spine` only, when `SkeletonOptions.medialAxis` is given). */
  axis?: A;
}

/** §3.4's `Skeleton`: the validated output or a typed downgrade. */
export type Skeleton<A = unknown> = SkeletonGraph | SkeletonDowngrade<A>;

/** Options of `skeleton()` beyond §3.4's two arguments (C-0168 (6)). */
export interface SkeletonOptions<A = unknown> {
  /** The `spine` reader's sampled medial axis (§3.8), injected by the caller — M0-a-12 builds it. */
  medialAxis?: (rings: readonly Polygon[]) => A;
  /**
   * A caller's own event limit from its `workLimits.json` law (C-0021); §3.8's 4 · (n + r) + 64 stays the floor, so a
   * smaller value is raised to it (M0.md §2.2).
   */
  maxEvents?: number;
}

/** The validator's verdict (§3.8 *Post-condition validator*). */
export type SkeletonVerdict = { ok: true; faces: number[][] } | { ok: false; check: ValidatorCheck; detail: string };
