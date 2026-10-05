// The invariant suite's types (§3.10, §5.3): a row as the suite declares it, one row's verdict on one evaluation, the
// cost meter of §13.2's cost-model test, and the context a batch's caller can hand the batch-local rows that read more
// than the commit record. M0-a-14. Readings: C-0217.
import type { FaceId, VertexId } from '../arena/index.js';
import type { ChangedItem } from '../index/index.js';
import type { ChainProfile, ChainRef, GeomRef, Id, Invariant, Level, Order, RoleName } from '../types/index.js';

/**
 * One §3.10 row as the suite declares it: §5.3's `Invariant` (its `check` is the row's name) with the clause it checks,
 * the scope text of §3.10's third column (`when`) and, for a row whose subject M0 lacks, the milestone that brings the
 * subject (`deferredTo`). Such a row is still evaluated by its predicate and holds vacuously with a count of 0 (§5.3).
 */
export interface RowDecl extends Invariant {
  readonly name: string;
  readonly scope: Invariant['scope'];
  readonly class: 'hard' | 'soft';
  readonly kind: 'check';
  readonly check: string;
  /** §3.10's scope column, as the design words it. */
  readonly when: string;
  /** The row's clause, shortened from §3.10's first column. */
  readonly clause: string;
  /** The milestone whose subject the row waits for (vacuous, count 0, until then); absent: the subject exists at M0. */
  readonly deferredTo?: string;
}

/** What one row read: the cost meter of §13.2's cost-model test (distinct faces walked, vertices and edges examined). */
export interface Checked {
  readonly faces: number;
  readonly vertices: number;
  readonly edges: number;
}

/** One row's verdict on one evaluation (§5.4's per-invariant report line: its name, class, count and problems). */
export interface InvariantResult {
  readonly name: string;
  readonly scope: Invariant['scope'];
  readonly class: 'hard' | 'soft';
  /** True when no problem was found (a soft row that does not hold goes to the report, never into an abort). */
  readonly holds: boolean;
  /** The row's subjects in this evaluation — 0 when the subject is absent (the row holds vacuously, §5.3). */
  readonly subjects: number;
  /** One line per violation, each naming the row. */
  readonly problems: readonly string[];
  readonly checked: Checked;
  /** Why a row is vacuous (its subject's milestone) or what context it lacked. */
  readonly note?: string;
}

/** A ChainProfile the reference row reads: the profiled chain, its knot role and the stored profile (§2.2 rule 5). */
export interface StoredProfile {
  readonly chain: ChainRef;
  readonly knotRole: RoleName;
  readonly profile: ChainProfile<number> | ChainProfile<string> | ChainProfile<Order>;
}

/**
 * What the batch-local rows read beyond the commit record and the arena (C-0217 (3)). Every field is optional: a row
 * whose input is absent reads only the record (its default) or, where it reads nothing else, holds vacuously with a
 * note saying which input it lacked — never silently.
 */
export interface BatchContext {
  /** The vertices the batch placed, re-seated or slid (`ChainInsert.placed`, `MoveReport.moves`): the placement bound's subjects beside the record's `moved`. */
  readonly placed?: readonly VertexId[];
  /** The held set of a warp or smoothing step (`heldSet(…).vertices`, §3.6). */
  readonly held?: readonly VertexId[];
  /** The vertices an optional chain placed: an acute corner at one is hard (§3.10's corner row). */
  readonly optional?: readonly VertexId[];
  /** Kept content's inputs: the rank of `rederivesFrom` and each finer face's stage, owner and area before the batch. */
  readonly kept?: KeptBefore;
  /** A clear-region batch's resolved prepared set (`KernelTx.prepared`, M3a): the prepared-contacts row's subject. */
  readonly prepared?: readonly VertexId[];
  /** The batch's op kinds (its declared ops): the role row's structural clause reads `mergeFaces` and `absorbSliver`. */
  readonly opKinds?: readonly string[];
  /** Role consistency's declared part counts (default: the transaction's `LINEAR_PARTS`). */
  readonly chainParts?: (role: RoleName, entity: Id) => number | null;
  /** The batch's changed index items (the transaction's journal); default: what the record names (C-0217 (6)). */
  readonly indexChanged?: readonly ChangedItem[];
}

/** A finer face's record before the batch, for kept content (§3.3 *Kept content*). */
export interface FaceBefore {
  readonly stage: number;
  /** The owner's interned handle, −1 for none. */
  readonly owner: number;
  /** Twice its area over its own-level route rings, cm². */
  readonly area2: number;
}

/** Kept content's inputs (§3.3): the rank below which finer faces are kept, and the before-image of the finer faces. */
export interface KeptBefore {
  readonly keptBelow: number;
  readonly before: (level: Level, face: FaceId) => FaceBefore | null;
}

/** What the stage-end and save rows read beyond the arena (the kernel holds no entity store, §14). */
export interface WholeContext {
  /** The stored references live entities hold (`FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef`). */
  readonly refs?: readonly GeomRef[];
  /** The stored ChainProfiles. */
  readonly profiles?: readonly StoredProfile[];
  /** Whether an entity is live (absent: the dead-entity clause holds vacuously, with a note). */
  readonly isLive?: (id: Id) => boolean;
}
