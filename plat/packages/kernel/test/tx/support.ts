// Test support for M0-a-06's transactions: a transaction spec with the defaults a test changes one field of, a callback
// runner, a slot-free fingerprint of an arena and its index, the arena bit for bit, the arena's snapshot (its print, live
// records per level, encoded chunks and level digests; T-support-3), and the oracles M0-a-04 / M0-a-05's tests judge an
// arena with (re-exported, read-only: §3.10's half-edge links, minEdge, one vertex per lattice point, no crossing,
// clearance, level consistency, the face records against the level views, nesting, Euler per level), with `readable`
// beside them: the encoder's block and every chain's own-level route read the arena (session round S6, C-0356).
import { afterEach, expect } from 'vitest';
import {
  addRole,
  allocEdgePair,
  allocFace,
  allocVertex,
  freeVertex,
  handleOf,
  idOf,
  internId,
  isFaceLive,
  isRoleRowLive,
  isVertexLive,
  outgoing,
  roleIdOf,
  roleInfo,
  rowElement,
  rowsOfKey,
  setFaceHoles,
  setFaceOwner,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../../src/arena/index.js';
import {
  attachRecorder,
  COL_ROLES_KIND,
  COLUMN_COUNT,
  columnName,
  columnOf,
  detachRecorder,
  FACE_BASE,
  FACE_STRIDE,
  FK_FACES_HOLES,
  FK_FACES_OUTER,
  forEachEntry,
  HANDLES_BASE,
  hasRecorder,
  markArena,
  OBJ_HALF_EDGES,
  OBJ_VERTICES,
  OWNER_HEAD_BASE,
  ROLE_HEAD_BASE,
  undoArena,
  type ArenaMark,
} from '../../src/arena/write.js';
import { checkIndexState } from '../../src/index/index.js';
import { encodeArena } from '../../src/io/index.js';
import type { KernelResult } from '../../src/num/index.js';
import { routeLines, tx, type Committed, type KernelOp, type KernelTx, type Overlay, type TxEnv } from '../../src/tx/index.js';
import { setFrameObserver, type FrameObserver } from '../../src/tx/frames.js';
import type { Savepoint } from '../../src/tx/savepoint.js';
import type { ChainRef, LatticePoint, Level, StageId } from '../../src/types/index.js';
import { allProblems, contentPrint, edgeRows, framed, halfEdgeBetween, ins, pt, snapshot as shellSnapshot, tx as shell, vertexAtPoint } from '../insert/step3-5/support.js';

export { allProblems, contentPrint, edgeRows, framed, halfEdgeBetween, ins, pt, shell, vertexAtPoint };

/** The base's stages by their registry ids (C-0020's order: their ids are their §4.1 ranks at M0). */
export const S4 = 4 as StageId;
export const S5 = 5 as StageId;
export const S6 = 6 as StageId;
export const S8 = 8 as StageId;
export const S10 = 10 as StageId;

/** A spec at `level` with every other field defaulted: declared form, no expectation, reject, a large work limit. */
export function spec(level: Level, over: Partial<KernelTx> = {}): KernelTx {
  return {
    key: { layer: 'ground', part: 0 },
    level,
    ops: [],
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: over.stage ?? S8 },
    stage: S8,
    rederivesFrom: S8,
    workLimit: 1_000_000,
    ...over,
  };
}

/** A callback-form batch; throws on a refusal (for setup), returns the commit. */
export function commit<T>(p: Plat, level: Level, fn: (o: Overlay) => KernelResult<T>, over: Partial<KernelTx> = {}, env: TxEnv = {}): Committed<T> {
  const r = tx(p, spec(level, over), fn, env);
  if (!r.ok) throw new Error(`support: the batch was refused: ${r.code} ${r.detail}`);
  return r.value as Committed<T>;
}

/** A declared batch's result. */
export function declared(p: Plat, level: Level, ops: KernelOp[], over: Partial<KernelTx> = {}, env: TxEnv = {}): ReturnType<typeof tx> {
  return tx(p, spec(level, { ...over, ops }), undefined, env);
}

/** Unwraps an op's result inside a callback (a refusal there is a test's failure). */
export function must<T>(r: KernelResult<T>): T {
  if (!r.ok) throw new Error(`support: an op was refused: ${r.code} ${r.detail}`);
  return r.value;
}

/** The arena's content and index state, slot-free, plus its version: what a rejected batch must leave unchanged. */
export function state(p: Plat): string {
  return `${contentPrint(p)}\n#v${p.version}`;
}

/**
 * The arena bit for bit (N-53 (3), N-55 (6)), split in two by hardening round S8 (line 4 (b)): `arenaBits` — every typed
 * column of §2.2's tables up to its capacity (the doubling capacity included), the slot counters, the hash tables with
 * their counts, indexHome, the handle table, the frame and the version — and `indexBits` — the index's mutable state:
 * the dynamic grids, tombstones, partition keys, pending sets and trees' identity, the partition lists and whether the
 * batch log is open, every Map and Set printed SORTED BY KEY, never in iteration order (no output reads a Map's order,
 * index/grid.ts, query.ts; an O(change) undo does not restore it). `bits` is both. Each line is labelled with its
 * column's path, so a first differing line names the column (written from the Plat's shape, never from the door's
 * column map, which the door test checks against it).
 */
export function arenaBits(p: Plat): string {
  const col = (name: string, a: ArrayLike<number>): string => `${name} ${a.length}:${Array.from(a).join(',')}`;
  const out: string[] = [`v${p.version}`, `frame ${JSON.stringify(p.frame)}`, `slots ${JSON.stringify(p.slots)}`];
  const V = p.vertices;
  const T = p.halfEdges;
  const R = p.roles;
  out.push(col('vertices.x', V.x), col('vertices.y', V.y), col('vertices.out', V.out), col('vertices.level', V.level), col('vertices.flags', V.flags));
  out.push(col('halfEdges.origin', T.origin), col('halfEdges.next', T.next), col('halfEdges.prev', T.prev), col('halfEdges.level', T.level));
  out.push(col('roles.edgeFirst', R.edgeFirst), col('roles.vertexFirst', R.vertexFirst), col('roles.kind', R.kind), col('roles.entity', R.entity), col('roles.level', R.level));
  out.push(col('roles.ordinal', R.ordinal), col('roles.nextInSet', R.nextInSet), col('roles.nextSameKey', R.nextSameKey));
  out.push(col('roles.head.k0', R.head.k0), col('roles.head.k1', R.head.k1), col('roles.head.first', R.head.first), `roles.head.count ${R.head.count}`);
  p.faces.forEach((F, l) => {
    out.push(col(`faces[${l}].outer`, F.outer), col(`faces[${l}].holesStart`, F.holesStart), col(`faces[${l}].holes`, F.holes), col(`faces[${l}].kind`, F.kind));
    out.push(col(`faces[${l}].owner`, F.owner), col(`faces[${l}].parent`, F.parent), col(`faces[${l}].stage`, F.stage), col(`faces[${l}].nextOfOwner`, F.nextOfOwner));
    out.push(col(`faces[${l}].ownerHead.owner`, F.ownerHead.owner), col(`faces[${l}].ownerHead.head`, F.ownerHead.head), `faces[${l}].ownerHead.count ${F.ownerHead.count}`);
  });
  out.push(col('indexHome.vertex', p.indexHome.vertex), col('indexHome.edge', p.indexHome.edge), ...p.indexHome.face.map((a, l) => col(`indexHome.face[${l}]`, a)));
  const H = p.handles;
  out.push(col('handles.units', H.units), col('handles.start', H.start), col('handles.hash', H.hash), col('handles.slots', H.slots), `handles.count ${H.count}`);
  return out.join('\n');
}

/** The index's mutable state, every Map and Set sorted by key (see `arenaBits`). */
export function indexBits(p: Plat): string {
  const idx = p.index;
  if (idx === undefined) return 'index none';
  const num = (a: number, b: number): number => a - b;
  const sorted = (xs: Iterable<number>): number[] => [...xs].sort(num);
  const out: string[] = [`log ${idx.log === null ? 'none' : 'open'}`, `work ${idx.work.rebuilds}/${idx.work.items}`];
  for (const L of idx.levels) {
    out.push(`static ${L.static.map((q) => q.id).join(',')}`);
    out.push(`tomb ${L.tombstones.map((t) => sorted(t).join(',')).join('|')}`);
    out.push(`cells ${JSON.stringify([...L.dynamic.cells].sort((a, b) => a[0] - b[0]).map(([k, v]) => [k, sorted(v)]))}`);
    out.push(`large ${sorted(L.dynamic.large).join(',')}`);
    out.push(`entries ${JSON.stringify([...L.dynamic.entries].sort((a, b) => a[0] - b[0]))}`);
  }
  for (const q of idx.partitions) out.push(`part ${q.id} ${q.key} ${q.tree === null ? 'empty' : 'tree'} ${q.keys.length}:${Array.from(q.keys).join(',')} ${sorted(q.pending).join(',')}`);
  for (const m of idx.byKey) out.push(`byKey ${JSON.stringify([...m].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)))}`);
  return out.join('\n');
}

/** The arena and its index bit for bit: `arenaBits` + `indexBits`. */
export function bits(p: Plat): string {
  return `${arenaBits(p)}\n${indexBits(p)}`;
}

/** Live face records per level, L0 – L4. */
export function facesPerLevel(p: Plat): number[] {
  return ([0, 1, 2, 3, 4] as const).map((l) => {
    let n = 0;
    for (let f = 0; f < p.slots.face[l].top; f++) if (isFaceLive(p, l, f)) n++;
    return n;
  });
}

/**
 * The arena's slot-free print, its live records per level, its encoded chunks' refs in encoding order (the persisted form,
 * §11; `encodeArena` writes every live record) and its level digests L0 – L4 (§3.9), as text — what an edit and its
 * inverse must leave equal (step 3–5's snapshot with the records per level beside it).
 */
export function snapshot(p: Plat): { print: string; faces: number[]; refs: string; digests: string } {
  const s = shellSnapshot(p);
  return { print: s.print, faces: facesPerLevel(p), refs: s.refs, digests: s.digests };
}

/** Every oracle at once: the arena's validity (M0-a-04 / M0-a-05's) and the index state (M0-a-03's). */
export function healthy(p: Plat): void {
  expect(allProblems(p)).toEqual([]);
  expect(checkIndexState(p)).toEqual([]);
}

/**
 * Every chain the arena carries — each (edge role, entity) key of a live row, by role name then entity id — read from the
 * role table itself, so no caller's bookkeeping can miss one.
 */
export function chainsOf(p: Plat): ChainRef[] {
  const R = p.roles;
  const seen = new Map<string, ChainRef>();
  for (let r = 0; r < p.slots.role.top; r++) {
    if (!isRoleRowLive(p, r)) continue;
    const info = roleInfo(R.kind[r]);
    if (info.kind !== 'edge' || info.indexed) continue;
    const ref: ChainRef = { role: info.name, entity: idOf(p, R.entity[r]) };
    seen.set(`${ref.role}\u0000${ref.entity}`, ref);
  }
  return [...seen.values()].sort((a, b) => (a.role < b.role ? -1 : a.role > b.role ? 1 : a.entity < b.entity ? -1 : a.entity > b.entity ? 1 : 0));
}

/**
 * The committed arena as its readers read it (session round S6, C-0356; checks/M0-a-06-notes.md N-c1-6): the persisted
 * form (`encodeArena`, which refuses rows of one level that differ along a route edge of that level — the constancy
 * §3.10's validator rows do not read) and the own-level route of every chain (`routeLines`, which refuses a run without
 * two route vertices of the chain's level). Both must read every committed arena of the registered families.
 */
export function readable(p: Plat): void {
  expect(() => encodeArena(p)).not.toThrow();
  const key = { layer: 'ground', part: 0 } as const;
  for (const c of chainsOf(p)) expect(() => routeLines(p, c, key), `routeLines (${c.role}, ${c.entity})`).not.toThrow();
}

/** The vertices carrying a vertex row's key. */
export function carrying(p: Plat, role: string, entity: string, ordinal: number): VertexId[] {
  const h = handleOf(p, entity);
  if (h < 0) return [];
  return rowsOfKey(p, roleIdOf(role), h, ordinal).map((r) => rowElement(p, r));
}

/** The lattice point of the vertex carrying a vertex row's key, as "x,y" (or "" when none). */
export function pointOfKey(p: Plat, role: string, entity: string, ordinal: number): string {
  const vs = carrying(p, role, entity, ordinal);
  return vs.length === 1 ? `${p.vertices.x[vs[0]]},${p.vertices.y[vs[0]]}` : vs.length === 0 ? '' : `×${vs.length}`;
}

/** The half-edge leaving the vertex at a toward the vertex at b, asserted present. */
export function between(p: Plat, a: readonly [number, number], b: readonly [number, number]): HalfEdgeId {
  const h = halfEdgeBetween(p, a, b);
  if (h < 0) throw new Error(`support: no edge ${a} → ${b}`);
  return h;
}

/** The degree of the vertex at a lattice point (−1 when there is none). */
export function degreeAt(p: Plat, x: number, y: number): number {
  const v = vertexAtPoint(p, x, y);
  return v < 0 || !isVertexLive(p, v) ? -1 : outgoing(p, v).length;
}

/** A lineage key (Hash64, low word first) from a small number. */
export function lin(n: number, hi = 0): [number, number] {
  return [n >>> 0, hi >>> 0];
}

/**
 * fast-check's parameters for one of this folder's properties: a fixed seed per property (queue L10, hardening round S7:
 * an unseeded `fc.assert` draws other cases each run, so a count read off a run is noise), derived from its name by
 * FNV-1a; PLAT_FUZZ_SEED, when set, replaces it (the replay contract of tools/vitest/fast-check.setup.mjs, C-0057). The
 * run count stays the global PLAT_FUZZ_RUNS.
 */
export function seeded(name: string): { seed: number } {
  const raw = process.env.PLAT_FUZZ_SEED;
  if (raw !== undefined && raw !== '') return { seed: Number(raw) | 0 };
  let h = 0x811c9dc5;
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return { seed: h | 0 };
}

/** Writes through the arena's primitives that grow every slot table, rehash every hash table and compact a hole pool. */
export function churn(p: Plat): { faces: FaceId[] } {
  const pts = (i: number): LatticePoint => ({ x: 10 + 7 * (i % 50), y: 10 + 7 * Math.floor(i / 50) }) as LatticePoint;
  // vertices and pairs past their capacity (the default 64; one slot at a time in the tiny mode)
  const vs: number[] = [];
  for (let i = 0; i < 80; i++) vs.push(allocVertex(p, pts(i), 1));
  const hs: number[] = [];
  for (let i = 0; i + 1 < vs.length; i += 1) hs.push(allocEdgePair(p, vs[i], vs[i + 1], 1));
  // a slot freed and taken again from the free list (allocation reads `free` before `top`)
  freeVertex(p, allocVertex(p, pts(99), 1));
  vs.push(allocVertex(p, pts(98), 1));
  // role rows past their capacity, and keys past the role-head table's load (a rehash)
  for (let i = 0; i < hs.length; i++) addRole(p, hs[i], { role: 'way', entity: `way:${i}` }, 1);
  // faces at every level past capacity (parent chains L0 → L4), owners past each owner table's load (rehashes)
  const faces: FaceId[] = [];
  const parentAt: number[] = [-1];
  for (let f = 0; f < p.slots.face[0].top; f++) if (p.faces[0].kind[f] !== 0xffff) parentAt[0] = f;
  for (const l of [1, 2, 3, 4] as const) {
    for (let i = 0; i < 20; i++) {
      const f = allocFace(p, l, { outer: hs[i], kind: 1, owner: -1, stage: 1, parent: parentAt[l - 1] });
      if (i === 0) parentAt[l] = f;
      if (l === 1) faces.push(f);
      setFaceOwner(p, l, f, internId(p.handles, `owner:${l}:${i}`));
    }
  }
  // the hole pool: runs set and reset on one face until the pool is compacted (and grown)
  for (let i = 0; i < 24; i++) setFaceHoles(p, 1, faces[i % 3], [hs[i % hs.length], hs[(i + 1) % hs.length]]);
  return { faces };
}

// ---- the frame observer (hardening round S8, line 4 (b)): the oracle round 1B (S9) inherits -------------------------

/** A frame's kind: the batch's, an op's (`opSave`), or the kerb read's dry run (an op frame `dryInsert` opens). */
export type FrameKind = 'batch' | 'op' | 'dry-run';

interface ObservedMark {
  readonly kind: FrameKind;
  readonly image: Savepoint;
  readonly mark: ArenaMark;
  readonly arena: string;
  readonly all: string;
}

/** What the observer saw: marks taken and compared per frame kind, the growths its undos replayed, every failure. */
export interface FrameStats {
  readonly marks: Record<FrameKind, number>;
  readonly compared: Record<FrameKind, number>;
  /** Replacement entries the observer's undos put back, by kind of replacement (inside frames that were undone). */
  readonly undone: Map<string, number>;
  readonly failures: string[];
}

const FRAME_KINDS: readonly FrameKind[] = ['batch', 'op', 'dry-run'];

function freshStats(): FrameStats {
  return { marks: { batch: 0, op: 0, 'dry-run': 0 }, compared: { batch: 0, op: 0, 'dry-run': 0 }, undone: new Map(), failures: [] };
}

let stats: FrameStats = freshStats();
const stacks = new WeakMap<Plat, ObservedMark[]>();
let installed = false;
/** The failures an afterEach has already reported (PLAT_UNDO_ORACLE=1). */
let reported = 0;

/** The kind of growth a replacement entry undoes (the oracle's coverage counts). */
function replacementKind(id: number, old: unknown, now: unknown): string {
  if (id === OBJ_VERTICES) return 'grow vertices';
  if (id === OBJ_HALF_EDGES) return 'grow pairs';
  if (id === COL_ROLES_KIND) return 'grow role rows';
  if (id === ROLE_HEAD_BASE) return 'rehash roles.head';
  if (id === HANDLES_BASE + 3) return 'rehash handles.slots';
  if (id >= OWNER_HEAD_BASE && id < HANDLES_BASE && (id - OWNER_HEAD_BASE) % 2 === 0) return `rehash faces[${(id - OWNER_HEAD_BASE) / 2}].ownerHead`;
  if (id >= FACE_BASE && id < ROLE_HEAD_BASE) {
    const l = Math.floor((id - FACE_BASE) / FACE_STRIDE);
    const k = (id - FACE_BASE) % FACE_STRIDE;
    if (k === FK_FACES_OUTER) return `grow faces[${l}]`;
    if (k === FK_FACES_HOLES) return (old as Int32Array).length === (now as Int32Array).length ? `compact faces[${l}].holes` : `grow faces[${l}].holes`;
  }
  return `replace ${columnName(id)}`;
}

/** The first difference of two labelled prints: its line's label and, for a column, the first differing slot. */
function firstDifference(a: string, b: string): string {
  const la = a.split('\n');
  const lb = b.split('\n');
  for (let i = 0; i < Math.max(la.length, lb.length); i++) {
    if (la[i] === lb[i]) continue;
    const x = la[i] ?? '';
    const y = lb[i] ?? '';
    const m = /^([\w.[\]]+) (\d+):(.*)$/.exec(x);
    const n = /^([\w.[\]]+) (\d+):(.*)$/.exec(y);
    if (m !== null && n !== null && m[1] === n[1]) {
      const va = m[3].split(',');
      const vb = n[3].split(',');
      for (let s = 0; s < Math.max(va.length, vb.length); s++) {
        if (va[s] !== vb[s]) return `column ${m[1]} slot ${s}: ${va[s] ?? '(beyond capacity)'} at the mark, ${vb[s] ?? '(beyond capacity)'} now${m[2] !== n[2] ? ` (capacity ${m[2]} at the mark, ${n[2]} now)` : ''}`;
      }
    }
    return `line ${i + 1}: ${x.slice(0, 160)} | now: ${y.slice(0, 160)}`;
  }
  return 'no difference';
}

function fail(msg: string): void {
  stats.failures.push(msg);
}

const OBSERVER: FrameObserver = {
  batchOpen(p, image) {
    try {
      if (hasRecorder(p)) {
        fail('a batch opened on an arena whose recorder was still attached (a batch that never ended)');
        detachRecorder(p);
      }
      attachRecorder(p);
      stacks.set(p, []);
      push(p, 'batch', image);
    } catch (e) {
      fail(`batch open: ${(e as Error).message}`);
    }
  },
  opOpen(p, image) {
    try {
      if (!hasRecorder(p)) return;
      const stack = new Error().stack ?? '';
      push(p, stack.includes('dryInsert') ? 'dry-run' : 'op', image);
    } catch (e) {
      fail(`op open: ${(e as Error).message}`);
    }
  },
  beforePutBack(p, image) {
    try {
      const marks = stacks.get(p);
      if (marks === undefined) return;
      const i = marks.findIndex((m) => m.image === image);
      if (i < 0) return;
      marks.length = i + 1; // a put-back discards the marks above it (their frames were dropped into it)
      const m = marks[i];
      const latest = new Map<number, unknown[]>();
      forEachEntry(p, m.mark, {
        column() {},
        replacement(id, ref) {
          const l = latest.get(id) ?? [];
          l.push(ref);
          latest.set(id, l);
        },
      });
      for (const [id, olds] of latest) {
        olds.forEach((old, k) => {
          const now = k + 1 < olds.length ? olds[k + 1] : id < COLUMN_COUNT ? columnOf(p, id) : null;
          const key = replacementKind(id, old, now);
          stats.undone.set(key, (stats.undone.get(key) ?? 0) + 1);
        });
      }
      try {
        undoArena(p, m.mark);
      } catch (e) {
        fail(`CHECK B (${m.kind} frame): undoArena threw: ${(e as Error).message}`);
        return;
      }
      const now = arenaBits(p);
      if (now !== m.arena) fail(`CHECK B (${m.kind} frame): the door's log does not undo the frame — ${firstDifference(m.arena, now)}`);
    } catch (e) {
      fail(`before put-back: ${(e as Error).message}`);
    }
  },
  afterPutBack(p, image) {
    try {
      const marks = stacks.get(p);
      if (marks === undefined) return;
      const i = marks.findIndex((m) => m.image === image);
      if (i < 0) return;
      const m = marks[i];
      marks.length = i;
      stats.compared[m.kind]++;
      const now = bits(p);
      if (now !== m.all) fail(`CHECK A (${m.kind} frame): the put-back is not exact — ${firstDifference(m.all, now)}`);
      if (m.kind === 'batch') end(p);
    } catch (e) {
      fail(`after put-back: ${(e as Error).message}`);
    }
  },
  commit(p) {
    try {
      end(p);
    } catch (e) {
      fail(`commit: ${(e as Error).message}`);
    }
  },
};

function push(p: Plat, kind: FrameKind, image: Savepoint): void {
  const marks = stacks.get(p);
  if (marks === undefined) return;
  stats.marks[kind]++;
  marks.push({ kind, image, mark: markArena(p), arena: arenaBits(p), all: bits(p) });
}

function end(p: Plat): void {
  stacks.delete(p);
  detachRecorder(p);
}

/**
 * Installs the frame observer (idempotent): from now on every batch frame attaches its arena's recorder, every frame's
 * mark keeps `markArena` and `bits`, and every put-back of a marked image is preceded by `undoArena` to its mark —
 * CHECK B, `arenaBits` equal to the mark's: the door's log is complete — and followed by CHECK A, `bits` whole equal to
 * the mark's: the restore is exact. A mismatch or a throw never reaches the kernel: it is recorded in `frameStats()`.
 */
export function installFrameObserver(): void {
  if (installed) return;
  installed = true;
  setFrameObserver(OBSERVER);
}

/** Removes the frame observer (the arenas' recorders are detached as their batches end). */
export function uninstallFrameObserver(): void {
  installed = false;
  setFrameObserver(null);
}

/** The observer's counts and failures since the last `resetFrameStats`. */
export function frameStats(): FrameStats {
  return stats;
}

/** Starts the counts afresh. */
export function resetFrameStats(): void {
  stats = freshStats();
  reported = 0;
}

export { FRAME_KINDS };

// PLAT_UNDO_ORACLE=1 (read test-side, as arena/tiny.ts reads PLAT_TINY_TABLES): the observer over every test that
// imports this file; a failure fails the test it occurred in.
if (process.env.PLAT_UNDO_ORACLE === '1') {
  installFrameObserver();
  afterEach(() => {
    const f = stats.failures.slice(reported);
    reported = stats.failures.length;
    expect(f, 'the frame observer (PLAT_UNDO_ORACLE=1)').toEqual([]);
  });
}
