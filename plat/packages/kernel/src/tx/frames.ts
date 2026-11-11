// THE FRAMES (M0-a-06 hardening round S9, ROUND 1B of the kernel amendment z, item 985 as J627 corrects it): the undo
// log replaces the before-image for every op savepoint and dry run, and for the batch itself. Kernel-internal, by path
// only — no folder index or barrel line (rule 5; J627 (3)).
//
// THE LOG. An open batch keeps one undo log of its own writes, in two halves: the ARENA half is the door's recorder
// (arena/write.ts, S8): every column store as (column, slot, old value), every replacement of an array or a table as one
// entry holding the replaced reference, and the slot counters, holesTop, the version, the frame and the three tables'
// counts saved by value at a mark (`markArena` / `undoArena`). The INDEX half is the batch's IndexBatchLog
// (index/spatial.ts): every index write in order, an insert and a delete holding the grid entry it replaced or removed;
// the partition lists' and each level's static and tombstone lists' lengths, and the index's work counts, are saved by
// value at a mark. An undo applies the entries from the log's end and cuts the log past each as soon as it is undone, so
// an undo a throw interrupts is RESUMED by an older frame's undo, never re-applied.
//
// FRAMES ARE MARKS on that log. `mark(t)` opens one on the open batch and `undoTo(t, m)` undoes every entry above it and
// DISCARDS it and every frame opened after it (as S7's killAfter discards later images, savepoint.ts); a frame its caller
// drops is committed into its parent implicitly — its entries stay, and it stays on the stack until an undo of an older
// frame, or the batch's end, discards it. An undo of a frame already undone or discarded, and an undo from another
// batch, are programming errors: they throw and change nothing. An undo inside an open batch moves neither the version
// (it puts back the version the mark saved, which is the batch's) nor the restore generation (C-0299, C-0313).
//
// THE BATCH FRAME is the stack's floor: `markBatch` (tx.ts `open`, before the index's batch log opens) attaches the
// arena's recorder and saves the batch's mark; `undoBatch` (the three undo paths: a rejection, a throw, a batch that
// wrote nothing) undoes to it and closes the index's batch log, as the before-image's put-back did; `endBatch` (the
// commit) discards the frames. Every path ends with the recorder detached. The commit record reads the before-values from
// the batch frame (`beforeView`): a slot at or above the frame's saved counter is fresh; below it, a column's FIRST logged
// old value in the batch's surviving log, or its current value where no entry names it.
//
// THE OBSERVER. A test-side hook (null in production) called at each frame point: the batch frame marked, an op frame
// marked, a frame about to be undone and just undone, the commit. Only the test-side observer installs one
// (kernel/test/tx/support.ts `installFrameObserver`), to compare the arena and its index after every undo with the state
// it printed at the mark (the oracle).
import type { Plat } from '../arena/index.js';
import {
  attachRecorder,
  COL_ROLES_ENTITY,
  COL_ROLES_KIND,
  COL_ROLES_LEVEL,
  COL_ROLES_ORDINAL,
  detachRecorder,
  entryCounts,
  FACE_BASE,
  FACE_STRIDE,
  FK_FACES_KIND,
  FK_FACES_OWNER,
  forEachEntry,
  hasRecorder,
  markArena,
  undoArena,
  type ArenaMark,
} from '../arena/write.js';
import { gridPut, gridTake } from '../index/grid.js';
import { itemKey } from '../index/items.js';
import type { IndexWrite, PackedIndex, SpatialIndex } from '../index/spatial.js';
import type { Level } from '../types/index.js';

/** The index half of a mark: the batch log's length and the list lengths and counts saved by value. */
interface IndexMark {
  readonly writes: number;
  readonly partitions: number;
  readonly statics: readonly number[];
  readonly tombstones: readonly number[];
  readonly rebuilds: number;
  readonly items: number;
}

/** One batch's frames: its own mark (the stack's floor) and the op frames opened above it, oldest first. */
export interface BatchFrame {
  readonly plat: Plat;
  readonly arena: ArenaMark;
  readonly index: IndexMark;
  readonly stack: Frame[];
  /** False once the batch has ended or its undo began: its frames are dead. */
  open: boolean;
  /** True once the batch's undo (or its commit) has completed: a later `undoBatch` is a no-op. */
  done: boolean;
}

/** An op frame: a mark on its batch's log. */
export interface Frame {
  readonly batch: BatchFrame;
  /** Its place on the batch's stack while it is alive. */
  readonly pos: number;
  readonly arena: ArenaMark;
  readonly index: IndexMark;
}

/** What the transaction layer tells an installed observer. A test may let a method throw (an interrupted undo's pin). */
export interface FrameObserver {
  /** The batch frame of `p` was marked (the recorder attached, the index's batch log not yet open). */
  batchMarked(p: Plat, b: BatchFrame): void;
  /** An op frame was marked on `p`. */
  marked(p: Plat, f: Frame): void;
  /** `f` (an op frame or the batch frame) is about to be undone on `p` (its refusal checks passed). */
  beforeUndo(p: Plat, f: Frame | BatchFrame): void;
  /** `f` was just undone on `p` (the batch frame: its index log closed too). */
  afterUndo(p: Plat, f: Frame | BatchFrame): void;
  /** The batch open on `p` commits (its recorder still attached, its index log still open). */
  commit(p: Plat, b: BatchFrame): void;
}

/** The installed observer; null in production. */
export let frameObserver: FrameObserver | null = null;

/** Installs `o` (null: none) and returns the observer it replaces. Tests only. */
export function setFrameObserver(o: FrameObserver | null): FrameObserver | null {
  const was = frameObserver;
  frameObserver = o;
  return was;
}

/** A test-only hook called between the index undo's writes and its truncation; null in production. */
let indexFault: (() => void) | null = null;

/** Sets the index undo's test-only fault hook (null: none). */
export function setIndexUndoFaultHook(hook: (() => void) | null): void {
  indexFault = hook;
}

/**
 * The entries the op frames' undos took back (line 5 (d)'s size counter): the index writes always (one subtraction an
 * undo); the column and replacement entries only while `setUndoTally(true)` (a test or a scratch measurement: counting
 * them reads the log once more).
 */
interface Tally {
  undos: number;
  column: number;
  replacement: number;
  index: number;
}
const tally: Tally = { undos: 0, column: 0, replacement: 0, index: 0 };
let tallyArena = false;

/** Turns the arena half of the undo tally on or off, and starts the tally afresh. */
export function setUndoTally(on: boolean): void {
  tallyArena = on;
  tally.undos = 0;
  tally.column = 0;
  tally.replacement = 0;
  tally.index = 0;
}

/** The op frames' undos since the last `setUndoTally`: their count and the entries they took back, by half. */
export function undoTally(): Readonly<Tally> {
  return { ...tally };
}

function indexOfPlat(p: Plat): SpatialIndex {
  const idx = p.index;
  if (idx === undefined) throw new Error('tx: a frame needs the arena\'s spatial index (attachIndex)');
  return idx;
}

function markIndex(idx: SpatialIndex): IndexMark {
  const L = idx.levels;
  return {
    writes: idx.log === null ? 0 : idx.log.writes.length,
    partitions: idx.partitions.length,
    statics: [L[0].static.length, L[1].static.length, L[2].static.length, L[3].static.length, L[4].static.length],
    tombstones: [L[0].tombstones.length, L[1].tombstones.length, L[2].tombstones.length, L[3].tombstones.length, L[4].tombstones.length],
    rebuilds: idx.work.rebuilds,
    items: idx.work.items,
  };
}

/**
 * Undoes one index write on the index as it stands right after it (the writes above it already undone): a tombstone's key
 * leaves its partition's tombstone set (its home entry is a column store, the arena half's); an insert's entry leaves
 * the grid and its partition's grid share, the entry it replaced, if any, going back with its share; a delete's entry
 * goes back with its share. The grid and the sets are written directly, never through `record`.
 *
 * A logged write the index does not hold — an insert whose key's grid entry is not the one it put (its partition), a
 * delete with no removed entry or whose key the grid holds again, a tombstone whose partition is not of its level or
 * does not hold the key — was never this index's write (a write planted in the log: invariants/fixtures.test.ts's
 * negative controls) and is skipped, so a batch's undo stays total; a real write's undo always finds the index as the
 * write left it, its later writes undone, so none is ever skipped (the oracle's CHECK A would name one).
 */
function undoWrite(idx: SpatialIndex, w: IndexWrite): void {
  const key = itemKey(w.kind, w.slot);
  const own = (id: number): PackedIndex | undefined => {
    const part = Number.isInteger(id) && id >= 0 ? idx.partitions[id] : undefined;
    return part !== undefined && part.level === w.level ? part : undefined;
  };
  if (w.op === 'tombstone') {
    const part = own(w.partition);
    if (part !== undefined) idx.levels[part.level].tombstones[part.pos].delete(key);
    return;
  }
  const grid = idx.levels[w.level].dynamic;
  const old = w.old;
  if (w.op === 'insert') {
    const part = own(w.partition);
    if (part === undefined || grid.entries.get(key)?.partition !== w.partition) return;
    gridTake(grid, key);
    part.pending.delete(key);
  } else if (old === undefined || grid.entries.has(key)) {
    return;
  }
  if (old !== undefined && own(old.partition) !== undefined) {
    gridPut(grid, key, old.partition, old.box);
    idx.partitions[old.partition].pending.add(key);
  }
}

/**
 * The index half of an undo: the batch log's writes above the mark undone one at a time from its end, the log cut past
 * each as soon as it is undone; then the partitions made since the mark truncated — their byKey entries deleted, the
 * partition list and each level's static and tombstone lists cut to the mark's lengths — after the writes, since an
 * undone insert into such a partition reads its grid share first; then the work counts the mark saved. Returns the
 * writes undone.
 */
function undoIndex(idx: SpatialIndex, m: IndexMark): number {
  let undone = 0;
  const log = idx.log;
  if (log !== null) {
    const W = log.writes;
    if (m.writes > W.length) throw new Error('tx: an undo to a mark the index log was already undone past');
    while (W.length > m.writes) {
      undoWrite(idx, W[W.length - 1]);
      W.pop();
      undone++;
    }
  }
  if (indexFault !== null) indexFault();
  const parts = idx.partitions as PackedIndex[];
  for (let id = parts.length - 1; id >= m.partitions; id--) {
    const part = parts[id];
    const byKey = idx.byKey[part.level];
    if (byKey.get(part.key) === id) byKey.delete(part.key);
  }
  if (parts.length > m.partitions) parts.length = m.partitions;
  for (let l = 0; l < 5; l++) {
    const L = idx.levels[l as Level];
    if (L.static.length > m.statics[l]) L.static.length = m.statics[l];
    if (L.tombstones.length > m.tombstones[l]) L.tombstones.length = m.tombstones[l];
  }
  idx.work.rebuilds = m.rebuilds;
  idx.work.items = m.items;
  return undone;
}

// ---- the batch frame (tx.ts only: `open`, the three undo paths, the commit) --------------------------------------------

/**
 * The batch frame of a batch opening on `p` (tx.ts `open`, BEFORE the index's batch log opens): the arena's recorder
 * attached and the batch's mark saved. Called only from `open`.
 */
export function markBatch(p: Plat): BatchFrame {
  const idx = indexOfPlat(p);
  if (hasRecorder(p)) throw new Error('tx: a recorder is already attached to this arena (a batch that never ended)');
  attachRecorder(p);
  const b: BatchFrame = { plat: p, arena: markArena(p), index: markIndex(idx), stack: [], open: true, done: false };
  if (frameObserver !== null) frameObserver.batchMarked(p, b);
  return b;
}

function discardAbove(b: BatchFrame, pos: number): void {
  if (b.stack.length > pos) b.stack.length = pos;
}

/**
 * Undoes the batch to its frame (a rejection, a throw, a batch that wrote nothing): every op frame discarded, the arena
 * half and the index half undone to the batch's mark, the index's batch log CLOSED (idx.log = null, as the image's
 * put-back closed it: a log left open would refuse the next batch and compactSlots), the recorder detached. Called only
 * from tx.ts's three undo paths. Resumable: a throw inside it leaves every entry not yet undone in the logs, and a second
 * call (the catch path's) resumes.
 */
export function undoBatch(b: BatchFrame): void {
  if (b.done) return;
  const p = b.plat;
  const idx = indexOfPlat(p);
  b.open = false;
  discardAbove(b, 0);
  if (frameObserver !== null) frameObserver.beforeUndo(p, b);
  undoArena(p, b.arena);
  undoIndex(idx, b.index);
  idx.log = null;
  detachRecorder(p);
  b.done = true;
  if (frameObserver !== null) frameObserver.afterUndo(p, b);
}

/** The batch commits (tx.ts, after the index's batch log closed): its frames discarded, the recorder detached. */
export function endBatch(b: BatchFrame): void {
  b.open = false;
  discardAbove(b, 0);
  detachRecorder(b.plat);
  b.done = true;
}

/** Tells the observer the batch open on `p` commits (before its index log closes). */
export function observeCommit(b: BatchFrame): void {
  if (frameObserver !== null) frameObserver.commit(b.plat, b);
}

// ---- op frames (faces/common.ts opSave / rollback; the kerb read's dry run through them) --------------------------------

/** The open batch a frame acts on (state.ts's OpenTx carries it; typed here structurally to keep the import one-way). */
interface Framed {
  readonly plat: Plat;
  readonly batch: BatchFrame;
}

/** Opens an op frame on the open batch `t`: a mark on its log, pushed on its stack. */
export function mark(t: Framed): Frame {
  const b = t.batch;
  if (!b.open) throw new Error('tx: a frame is marked on a batch that has ended');
  const p = b.plat;
  const f: Frame = { batch: b, pos: b.stack.length, arena: markArena(p), index: markIndex(indexOfPlat(p)) };
  b.stack.push(f);
  if (frameObserver !== null) frameObserver.marked(p, f);
  return f;
}

/**
 * Undoes every entry of `t`'s log above the frame `m` — the arena half (`undoArena`), then the index half — and DISCARDS
 * `m` and every frame opened after it. Refused, as a programming error that throws and changes nothing: an undo of a
 * frame already undone or discarded, and an undo of a frame of another batch. The frames are discarded before the
 * entries are undone, so an undo a throw interrupts is resumed by an older frame's undo (the batch's), never retried.
 */
export function undoTo(t: Framed, m: Frame): void {
  const b = t.batch;
  if (m.batch !== b || !b.open) throw new Error('tx: an undo to a frame of another batch (a frame is undone only inside its own batch)');
  if (b.stack[m.pos] !== m) throw new Error('tx: an undo to a frame already undone or discarded (a frame is undone at most once, the frames after it with it)');
  const p = b.plat;
  const idx = indexOfPlat(p);
  discardAbove(b, m.pos);
  if (frameObserver !== null) frameObserver.beforeUndo(p, m);
  tally.undos++;
  if (tallyArena) {
    const c = entryCounts(p, m.arena);
    tally.column += c.column;
    tally.replacement += c.replacement;
  }
  undoArena(p, m.arena);
  tally.index += undoIndex(idx, m.index);
  if (frameObserver !== null) frameObserver.afterUndo(p, m);
}

// ---- the before-values (the commit record's three readers, tx.ts) ----------------------------------------------------

/** The lookup's key of (column id, slot): ids are below 128. */
const keyOf = (id: number, slot: number): number => slot * 128 + id;

/** What the batch's arena held where its frame was marked, read from its log (`beforeView`). */
export interface BeforeView {
  /** Was face slot `f` of `level` live at the batch's mark? */
  faceLive(level: Level, f: number): boolean;
  /** The face's owner handle at the mark (−1 when it had none or was not live). */
  ownerOf(level: Level, f: number): number;
  /** A role column's value at the mark for a row below the mark's role top (`id`: one of the four row-key columns). */
  role(id: number, r: number): number;
  /** The role rows the batch's log names in a row-key column (kind, entity, level, ordinal). */
  readonly rolesLogged: readonly number[];
  /** The role table's top at the mark: a row at or above it is fresh. */
  readonly roleTop: number;
}

/**
 * The before-values of the batch `b` (still open, its recorder attached), in one pass over its log from its mark: for a
 * face's kind and owner and a role row's four key columns, each slot's FIRST logged old value (the entry nearest the
 * batch's mark that names it), else its current value; a slot at or above the mark's counter for its table is fresh.
 * O(entries), never a scan per face or per role slot; no image of any column is kept.
 */
export function beforeView(b: BatchFrame): BeforeView {
  const p = b.plat;
  const first = new Map<number, number>();
  const rows: number[] = [];
  const faceKinds = new Set<number>();
  const faceOwners = new Set<number>();
  for (let l = 0; l < 5; l++) {
    faceKinds.add(FACE_BASE + FACE_STRIDE * l + FK_FACES_KIND);
    faceOwners.add(FACE_BASE + FACE_STRIDE * l + FK_FACES_OWNER);
  }
  forEachEntry(p, b.arena, {
    column(id, slot, old) {
      const isRole = id === COL_ROLES_KIND || id === COL_ROLES_ENTITY || id === COL_ROLES_LEVEL || id === COL_ROLES_ORDINAL;
      if (!isRole && !faceKinds.has(id) && !faceOwners.has(id)) return;
      const k = keyOf(id, slot);
      if (first.has(k)) return;
      first.set(k, old);
      if (isRole) rows.push(slot);
    },
    replacement() {},
  });
  const value = (id: number, slot: number, now: number): number => {
    const v = first.get(keyOf(id, slot));
    return v === undefined ? now : v;
  };
  const faceTop = b.arena.face;
  const faceLive = (level: Level, f: number): boolean => {
    if (f < 0 || f >= faceTop[level].top) return false;
    return value(FACE_BASE + FACE_STRIDE * level + FK_FACES_KIND, f, p.faces[level].kind[f]) !== 0xffff;
  };
  return {
    faceLive,
    ownerOf: (level, f) => (faceLive(level, f) ? value(FACE_BASE + FACE_STRIDE * level + FK_FACES_OWNER, f, p.faces[level].owner[f]) : -1),
    role: (id, r) => {
      const R = p.roles;
      const now = id === COL_ROLES_KIND ? R.kind[r] : id === COL_ROLES_ENTITY ? R.entity[r] : id === COL_ROLES_LEVEL ? R.level[r] : R.ordinal[r];
      return value(id, r, now);
    },
    rolesLogged: [...new Set(rows)],
    roleTop: b.arena.role.top,
  };
}
