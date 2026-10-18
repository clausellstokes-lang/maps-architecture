// The open transaction's state (§3.3): the overlay every writer takes — §14's `Overlay`, which is also the insertion's
// `InsertTx` (C-0169 (1): "M0-a-06's open transaction supplies these fields") — and what this item's writers journal
// for the commit record. Kernel-internal. M0-a-06.
import type { FaceId, Five, HalfEdgeId, Plat, VertexId } from '../arena/index.js';
import { roleIdOf, roleInfo, idOf } from '../arena/index.js';
import type { IndexBatchLog } from '../index/index.js';
import { TX_FACES_WALKED, type InsertJournal, type WorkCharged } from '../insert/index.js';
import { err, type KernelError, type KernelResult, type Warning } from '../num/index.js';
import type { Id, LatticePoint, Level, PlatKey, RoleKey, VertexRef } from '../types/index.js';
import type { Savepoint } from './savepoint.js';
import type { KernelTx, Overlay, TxEnv } from './types.js';

/** The face records one level's writes created, changed and removed (a log in write order; the commit takes the set). */
export interface FaceLog {
  readonly created: FaceId[];
  readonly changed: FaceId[];
  readonly removed: FaceId[];
}

/** What this item's writers (removeEdges, clearFiner, retypeEdges, setOwner) journal for the commit record. */
export interface TxLog {
  readonly faces: Five<FaceLog>;
  edgesRemoved: number;
  steinerDissolved: number;
  readonly promoted: VertexId[];
  readonly demotedVertices: VertexId[];
  readonly demotedEdges: HalfEdgeId[];
  readonly unflagged: VertexId[];
  /** Entities whose faces changed (address ids; a lookup, sorted at commit). */
  readonly owners: Set<Id>;
  /** (role, entity, ordinal) keys whose chains changed, by their text (a lookup, sorted at commit). */
  readonly roles: Map<string, RoleKey>;
  /** The canonical key (its first two route vertices' lattice points) each removed record had: the record orders them by it. */
  readonly removedKeys: Map<string, readonly [LatticePoint, LatticePoint]>;
  /** Vertices and edge pairs this item's writers touched: level consistency is checked on them at commit. */
  readonly vertices: VertexId[];
  readonly pairs: number[];
  /** Vertices a warp or smoothing step moved (§3.3's `moved`; journalled by M0-a-13's commit, C-0197). */
  readonly moved: VertexId[];
}

/** The open transaction: the overlay of §3.3 with its spec, environment, before-image and journals. */
export interface OpenTx extends Overlay {
  readonly plat: Plat;
  readonly key: PlatKey;
  readonly level: Level;
  readonly workLimit: number;
  readonly work: WorkCharged;
  readonly warnings: Warning[];
  readonly journal: InsertJournal;
  readonly prepared?: readonly VertexRef[];
  readonly spec: KernelTx;
  readonly env: TxEnv;
  /** §4.1 rank of `spec.stage`: the faces this batch re-owns take it. */
  readonly stageRank: number;
  /** §4.1 rank of `spec.rederivesFrom`: finer faces ranked below it are kept content. */
  readonly keptBelow: number;
  readonly savepoint: Savepoint;
  readonly indexLog: IndexBatchLog | null;
  readonly log: TxLog;
  /** A refusal that dooms the whole batch (E_WORK_LIMIT): every later op refuses with it, and the batch rejects. */
  failed: { readonly code: KernelError; readonly detail: string } | null;
  /**
   * Set at commit, reject and rollback; every writer asserts it first — a stale overlay never writes (tx's own writers,
   * faces' and warp's through `openTx`, the insertion's through `InsertTx.closed`; C-0287).
   */
  closed: boolean;
  /**
   * Names the running op in a rethrown error's prefix (C-0287): `open` until the batch runs; `order` while a declared
   * batch sorts its ops (`canonicalOrder`), `<kind> (prepare)` while a declared op reads the arena before any applies, then
   * that op's kind while it applies; `fn` while a callback runs (one of this module's writers names itself while it runs:
   * `removeEdges`, `clearFiner`, `retypeEdges`, `setOwner`); `commit` for the expectations, the kernel rows and the commit
   * (a throw from the digest listener after the commit is prefixed `…/commit:` and leaves the commit standing).
   */
  op: string;
}

const open = new WeakSet<object>();

/** Marks an object as an open transaction (the one place an OpenTx is minted). */
export function markOpen(t: OpenTx): void {
  open.add(t);
}

/**
 * Is `o` an open transaction: an overlay `tx` minted (the open set) and not yet closed (committed, rejected or rolled
 * back)? False for anything else — a closed overlay, a fabricated shell carrying `open: true`, any other object. The
 * predicate a writer outside this module checks before it writes (rulings-hardening-1.md RQ4; N-61 (4)); file-level,
 * imported by path.
 */
export function isOpenTx(o: object): boolean {
  return open.has(o) && !(o as OpenTx).closed;
}

/** The open transaction behind an overlay; a writer handed anything else (or a closed one) is a programming error. */
export function openTx(o: Overlay): OpenTx {
  check(open.has(o), 'the writer was handed no open transaction (tx(tx, fn) hands fn the overlay)');
  const t = o as OpenTx;
  check(!t.closed, 'the transaction is closed (committed or rejected)');
  return t;
}

/**
 * Runs one of this module's writers with the batch's `op` naming it: put back when the writer returns, left naming it
 * when the writer throws, so the transaction's rethrown error names the op that threw (C-0287). A nested writer call (a
 * writer calling another) keeps the outer name.
 */
export function asOp<T>(o: Overlay, kind: string, run: () => T): T {
  const t = openTx(o);
  const was = t.op;
  if (was === 'fn') t.op = kind;
  const r = run();
  t.op = was;
  return r;
}

/** A fresh journal. */
export function emptyLog(): TxLog {
  const f = (): FaceLog => ({ created: [], changed: [], removed: [] });
  return {
    faces: [f(), f(), f(), f(), f()],
    edgesRemoved: 0,
    steinerDissolved: 0,
    promoted: [],
    demotedVertices: [],
    demotedEdges: [],
    unflagged: [],
    owners: new Set(),
    roles: new Map(),
    removedKeys: new Map(),
    vertices: [],
    pairs: [],
    moved: [],
  };
}

/** The text of a role key (a lookup key only). */
export function roleKeyText(k: RoleKey): string {
  return `${k.role}\u0000${k.entity}\u0000${k.ordinal}`;
}

/** Notes a (role, entity, ordinal) key whose chain the batch changed. */
export function noteRole(t: OpenTx, k: RoleKey): void {
  t.log.roles.set(roleKeyText(k), { role: k.role, entity: k.entity, ordinal: k.ordinal });
}

/** Notes the key of a role row by its slot's columns (role id, entity handle, ordinal). */
export function noteRow(t: OpenTx, role: number, entity: number, ordinal: number): void {
  noteRole(t, { role: roleInfo(role).name, entity: idOf(t.plat, entity), ordinal });
}

/** The role id of a name, a name outside the registry being a programming error. */
export function roleId(name: string): number {
  const id = roleIdOf(name);
  check(id >= 0, `no role named ${name}`);
  return id;
}

/**
 * Charges `n` operations to `counter` (§3.3 *Work limits*): false when the batch now exceeds its limit — the batch is
 * then doomed (E_WORK_LIMIT), and the writer refuses before it writes where it still can.
 */
export function chargeTx(t: OpenTx, counter: string, n: number): boolean {
  check(Number.isInteger(n) && n >= 0, 'a charge is a whole number of operations');
  t.work.total += n;
  t.work.counts.set(counter, (t.work.counts.get(counter) ?? 0) + n);
  if (t.work.total > t.workLimit) {
    if (t.failed === null) t.failed = { code: 'E_WORK_LIMIT', detail: counter };
    return false;
  }
  return true;
}

/** The refusal a doomed batch gives every later op. */
export function doomed<T>(t: OpenTx): KernelResult<T> | null {
  return t.failed === null ? null : err<T>(t.failed.code, t.failed.detail);
}

/**
 * A writer's entry (§3.3 *Work limits*): the open transaction behind the overlay, and the refusal of a doomed batch —
 * one an earlier op took past its limit (E_WORK_LIMIT, 'the batch exceeded its work limit' when no op named the counter),
 * which the writer returns before it reads or writes anything.
 */
export function enterWriter<T>(o: Overlay): { t: OpenTx; refused: KernelResult<T> | null } {
  const t = openTx(o);
  if (t.failed === null && t.work.total > t.workLimit) t.failed = { code: 'E_WORK_LIMIT', detail: 'the batch exceeded its work limit' };
  return { t, refused: doomed<T>(t) };
}

/** E_WORK_LIMIT from a writer whose face walks took the batch past its limit (TX_FACES_WALKED): the batch doomed. */
export function overLimit<T>(t: OpenTx): KernelResult<T> {
  if (t.failed === null) t.failed = { code: 'E_WORK_LIMIT', detail: TX_FACES_WALKED };
  return doomed<T>(t) as KernelResult<T>;
}

/** A structural precondition of the transaction module: a programming error (throws in every build). */
export function check(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(`tx: ${message}`);
}

/** A staged branch (J156 (2)): reaching it is a programming error at M0, naming the milestone that builds it. */
export function notBuilt(milestone: string, what: string): never {
  throw new Error(`notBuilt('${milestone}'): ${what}`);
}
