// The move writer's public types (§3.4 `warp`, §3.6 *Moves: warp and smoothing*): the displacement field a warp reads,
// the held-entity input the lock layer will supply, the held set and the step's report. M0-a-13. Readings: C-0193.
import type { VertexId } from '../arena/index.js';
import type { Warning } from '../num/index.js';
import type { ChainRef, EdgeSetRef, FaceRef, Id, LatticePoint, VertexRef } from '../types/index.js';

/**
 * §3.4's `DisplacementField` (the design names it without a shape; C-0161 (6) gives the test kit's fields this one): the
 * displacement in centimetres (doubles) at a point. The edit layer's brushes (§7.1), a `moveVertex` and the smoother
 * (`smoothCommitted`) supply one; the warp reads it at each vertex's lattice point before the step and scales it by the
 * step's strength (1, ½, ¼ … after each halving).
 */
export interface DisplacementField {
  displacement(x: number, y: number): { readonly x: number; readonly y: number };
}

/** A locked or pinned entity's reference (§7.2's fixed inputs): the lock layer is M2a's, so the list is injected. */
export type HeldRef = FaceRef | ChainRef | EdgeSetRef | VertexRef;

/** The options beyond §3.4's signature (C-0193 (1)): the injected held entities and the smoothing flag. */
export interface WarpOptions {
  /** §3.6 held vertices (1): the locked or pinned entities' references (the lock layer, §7.2, is M2a's). */
  readonly held?: readonly { readonly entity: Id; readonly ref: HeldRef }[];
  /** §3.6 held vertices (4): a smoothing step holds every kernel-pinned vertex; a user's warp moves them. */
  readonly smoothing?: boolean;
}

/** `heldSet`'s answer: the held vertices by lattice position, and the held entities the dry run lists (§3.6). */
export interface HeldSet {
  readonly vertices: VertexId[];
  /** The injected entities whose references resolved to at least one vertex, by address id. */
  readonly entities: Id[];
}

/** How a moved vertex was placed (§3.6): moved by the field, slid along a fixed route, or re-seated onto its route. */
export type MoveKind = 'free' | 'slide' | 'reseat';

/** One moved vertex of a step: values beside the slot, so the edit layer's undo and recordCheck read positions. */
export interface Move {
  /** Valid until the next commit (§2.2 rule 5). */
  readonly vertex: VertexId;
  readonly kind: MoveKind;
  readonly from: LatticePoint;
  readonly to: LatticePoint;
}

/**
 * §3.4's `MoveReport`: what a warp step did. `moves` lists every moved vertex by its lattice position before the step
 * (y, then x) — the order of §3.6's placement — with its kind and both points; `unflagged` the (b′) vertices whose
 * split flag the step cleared without moving them (the commit record's `unflagged`); `flagCleared` the moved vertices
 * whose flag (b) cleared. A step that failed validation at every strength is a reported no-op: `applied` false, no
 * move, `halvings` = 8.
 */
export interface MoveReport {
  readonly applied: boolean;
  /** Halvings taken before the step validated (0 … 8), or 8 for a no-op. */
  readonly halvings: number;
  /** The strength the committed step used: 2^−halvings; 0 for a no-op. */
  readonly strength: number;
  readonly moves: Move[];
  readonly held: VertexId[];
  readonly heldEntities: Id[];
  readonly unflagged: VertexId[];
  readonly flagCleared: VertexId[];
  /** Why the last refused strength failed (the first failing check), '' when the first strength validated. */
  readonly lastFailure: string;
  readonly warnings: Warning[];
}

/** §3.6: at most 8 halvings, then a reported no-op (the `warp.halvings` row of workLimits.json is this fixed floor). */
export const MAX_HALVINGS = 8;

/** M0.md §2.2's counter a halving charges (unit `fixed`, floor 8). */
export const WARP_HALVINGS = 'warp.halvings';
