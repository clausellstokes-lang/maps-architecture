// Chain classes (§3.6 *Chain classes*) and the open transaction as insertion's steps 1–2 read it. M0-a-04.
//
// A chain is `mandatory` — coast, shore, bank, river, wall trace, arterial, band and kerb edges, plot lines,
// user-drawn geometry — or `optional` — growth proposals, optional lanes, decorative lines. A mandatory chain cannot
// fail for a precision reason: after attraction and placement no precision error is left, only §3.1's non-precision
// codes reject one, and a corner below `minFaceAngle` commits with W_ACUTE_CORNER. An optional chain is also rejected
// for the precision reasons, which F-NUM's ladder takes (§5.2): a proposal that cannot be inserted is not a street.
// `CLASS_OUTCOMES` is that table — the one place the class codes are decided; every step reads it.
//
// The transaction (§3.3's KernelTx, its overlay, canonical op order and commit) is M0-a-06's. Until it lands, steps 1–2
// read a bare shell, `InsertTx`: the arena its key names, the batch's level, its work limit and the work charged
// (operation counts, never a clock — §3.3 *Work limits*), the warnings, and a journal of what the writers changed, for
// M0-a-05's re-walk and M0-a-06's commit record. M0-a-06's open transaction supplies these fields (C-0169 (1)).
import { sameKey, type HalfEdgeId, type Plat, type VertexId } from '../arena/index.js';
import type { ChangedItem } from '../index/index.js';
import { err, type KernelError, type KernelResult, type Warning, type WarningCode } from '../num/index.js';
import type { LatticePoint, Level, PlatKey, VertexRef } from '../types/index.js';

/** §3.4's `cls`: a mandatory chain never fails for precision; an optional one does (§3.6 *Chain classes*). */
export type ChainClass = 'mandatory' | 'optional';

/** Both classes, mandatory first. */
export const CHAIN_CLASSES: readonly ChainClass[] = Object.freeze(['mandatory', 'optional'] as const);

/**
 * The reasons a chain's class decides (§3.6): `belowOneEdge` — fewer than two distinct points left after snapping and
 * decimation (step 1); `acuteCorner` — a face corner below `minFaceAngle`; `wedgeBeyondAttract` — wedge routing at an
 * acute corner would move the chain more than `attractCm` (step 4); `notSimpleRing` — a ring whose role requires a
 * simple polygon (a claim, a drawn boundary) crosses itself.
 */
export type ClassReason = 'belowOneEdge' | 'acuteCorner' | 'wedgeBeyondAttract' | 'notSimpleRing';

/** What a class does for a reason: refuse with a code (and §3.1's detail), or commit with a warning. */
export type ClassOutcome =
  | { readonly refuse: KernelError; readonly detail: string }
  | { readonly commit: WarningCode };

/**
 * §3.6's class codes. A mandatory chain refuses only for §3.1's non-precision codes — `E_DEGENERATE` (`empty`, a stage's
 * bug or an empty stroke, §3.11) and `E_SELF_INTERSECT` (F-OUTLINE; an edit's dry run, §3.1) — and commits an acute
 * corner (W_ACUTE_CORNER) or a long wedge route (W_WEDGE_ROUTED); an optional chain refuses for each (C-0169 (2)).
 */
export const CLASS_OUTCOMES: Readonly<Record<ClassReason, Readonly<Record<ChainClass, ClassOutcome>>>> = Object.freeze({
  belowOneEdge: Object.freeze({
    mandatory: Object.freeze({ refuse: 'E_DEGENERATE', detail: 'empty' }),
    optional: Object.freeze({ refuse: 'E_BELOW_MIN_EDGE', detail: 'fewer than two distinct points after decimation' }),
  }),
  acuteCorner: Object.freeze({
    mandatory: Object.freeze({ commit: 'W_ACUTE_CORNER' }),
    optional: Object.freeze({ refuse: 'E_BELOW_MIN_ANGLE', detail: 'a corner below minFaceAngle' }),
  }),
  wedgeBeyondAttract: Object.freeze({
    mandatory: Object.freeze({ commit: 'W_WEDGE_ROUTED' }),
    optional: Object.freeze({ refuse: 'E_BELOW_MIN_EDGE', detail: 'wedge routing would move it more than attractCm' }),
  }),
  notSimpleRing: Object.freeze({
    mandatory: Object.freeze({ refuse: 'E_SELF_INTERSECT', detail: 'a ring its role requires simple crosses itself' }),
    optional: Object.freeze({ refuse: 'E_SELF_INTERSECT', detail: 'a ring its role requires simple crosses itself' }),
  }),
} as const);

/** The outcome a class takes for a reason. */
export function classOutcome(cls: ChainClass, reason: ClassReason): ClassOutcome {
  check(cls === 'mandatory' || cls === 'optional', `a chain class is mandatory or optional, not ${String(cls)}`);
  return CLASS_OUTCOMES[reason][cls];
}

/** The refusal a class gives for a reason, or null where the class commits (with the outcome's warning). */
export function classRefusal<T = never>(cls: ChainClass, reason: ClassReason): Extract<KernelResult<T>, { ok: false }> | null {
  const o = classOutcome(cls, reason);
  return 'refuse' in o ? err<T>(o.refuse, o.detail) : null;
}

// ---- the transaction shell ---------------------------------------------------------------------------------------

/** M0.md §2.2's work-limit counters that steps 1–2 charge (one `workLimits.json` row each, unit `vertices`). */
export const INSERT_POINTS = 'insert.points';
export const INSERT_ATTRACT_QUERIES = 'insert.attractQueries';
export const INSERT_PLACEMENT_CANDIDATES = 'insert.placementCandidates';

/** The work a transaction has charged: the total its `workLimit` bounds, and each counter's share (C-0169 (1)). */
export interface WorkCharged {
  total: number;
  /** Per counter name; a lookup, never iterated into an output. */
  readonly counts: Map<string, number>;
}

/** What the step-1–2 writers changed in the arena — the touched set M0-a-05's re-walk and M0-a-06's commit record read. */
export interface InsertJournal {
  /** Vertices the writers created (split feet, Steiner vertices), in creation order. */
  readonly vertices: VertexId[];
  /** Edge pairs the splits created. */
  readonly pairs: number[];
  /** The half-edges split, each the part kept at its run's handle end (from its old origin to the new vertex). */
  readonly split: HalfEdgeId[];
  /** Steiner vertices among `vertices` (the commit record's `steinerAdded`). */
  steiner: number;
  /** The index items the writers changed or deleted, with their homes before — §3.10's freshness row reads them. */
  readonly changed: ChangedItem[];
}

/**
 * The open transaction as steps 1–2 read it — a bare shell until M0-a-06's `KernelTx` and overlay supply it (C-0169
 * (1)). `plat` is the arena `key` names; `level` the batch's level (§3.3: one level per transaction).
 */
export interface InsertTx {
  readonly plat: Plat;
  readonly key: PlatKey;
  readonly level: Level;
  /** Operations, from the stage's declaration (§3.3); exceeding it returns E_WORK_LIMIT. */
  readonly workLimit: number;
  readonly work: WorkCharged;
  /** Every warning the batch's ops report, aggregated by code (§3.3's `CommitRecord.warnings`). */
  readonly warnings: Warning[];
  readonly journal: InsertJournal;
  /**
   * §3.3's `KernelTx.prepared` (a clear-region batch's prepared vertices): declared; candidate (c) is M3a's, so a
   * non-empty list is refused with notBuilt('M3a') by the attraction (C-0169 (6)).
   */
  readonly prepared?: readonly VertexRef[];
}

/** A shell transaction on `plat` at `level` — what tests and, until M0-a-06, M0-a-05's harness hand the writers. */
export function insertTx(plat: Plat, level: Level, opts: { key?: PlatKey; workLimit?: number; prepared?: readonly VertexRef[] } = {}): InsertTx {
  const key = opts.key ?? plat.key;
  check(sameKey(key, plat.key), 'a transaction acts on the arena its key names');
  check(level === 0 || level === 1 || level === 2 || level === 3 || level === 4, 'a batch level is 0 … 4');
  const workLimit = opts.workLimit ?? Number.MAX_SAFE_INTEGER;
  check(Number.isInteger(workLimit) && workLimit >= 0, 'a work limit is a whole number of operations');
  return {
    plat,
    key: { layer: key.layer, part: key.part },
    level,
    workLimit,
    work: { total: 0, counts: new Map() },
    warnings: [],
    journal: { vertices: [], pairs: [], split: [], steiner: 0, changed: [] },
    ...(opts.prepared === undefined ? {} : { prepared: opts.prepared }),
  };
}

/**
 * Charges `n` operations to `counter`; false when the transaction's total now exceeds its work limit — the op then
 * returns E_WORK_LIMIT before it writes anything (§3.3).
 */
export function charge(tx: InsertTx, counter: string, n: number): boolean {
  check(Number.isInteger(n) && n >= 0, 'a charge is a whole number of operations');
  tx.work.total += n;
  tx.work.counts.set(counter, (tx.work.counts.get(counter) ?? 0) + n);
  return tx.work.total <= tx.workLimit;
}

/** The E_WORK_LIMIT refusal, naming the counter that crossed the limit. */
export function workLimitHit<T = never>(counter: string): Extract<KernelResult<T>, { ok: false }> {
  return err<T>('E_WORK_LIMIT', counter);
}

/** A callee's refusal as the caller's own result type (its code and detail; a partial value is the callee's and dropped). */
export function passOn<T = never>(r: { readonly code: KernelError; readonly detail: string }): Extract<KernelResult<T>, { ok: false }> {
  return err<T>(r.code, r.detail);
}

/** Counts one occurrence of `code` in a warning list (aggregated by code; `at` the first occurrence's point). */
export function addWarning(list: Warning[], code: WarningCode, at?: LatticePoint): void {
  for (const w of list) {
    if (w.code === code) {
      w.count += 1;
      return;
    }
  }
  list.push(at === undefined ? { code, count: 1 } : { code, count: 1, at: { x: at.x, y: at.y } });
}

/** Reports a warning event once: into the op's own list and into the transaction's. */
export function warn(tx: InsertTx, own: Warning[], code: WarningCode, at?: LatticePoint): void {
  addWarning(own, code, at);
  addWarning(tx.warnings, code, at);
}

/** Folds a callee's warnings into an op's own list (the callee already reported them to the transaction). */
export function foldWarnings(own: Warning[], from: readonly Warning[]): void {
  for (const w of from) {
    let found = false;
    for (const o of own) {
      if (o.code === w.code) {
        o.count += w.count;
        found = true;
        break;
      }
    }
    if (!found) own.push(w.at === undefined ? { code: w.code, count: w.count } : { code: w.code, count: w.count, at: { x: w.at.x, y: w.at.y } });
  }
}

/** A structural precondition of insertion (a programming error: it throws in every build, as the arena's `check`). */
export function check(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(`insert: ${message}`);
}

/** A staged branch (J156 (2)): reaching it is a programming error at M0, naming the milestone that builds it. */
export function notBuilt(milestone: string, what: string): never {
  throw new Error(`notBuilt('${milestone}'): ${what}`);
}
