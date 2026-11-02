// M0-a-06 hardening round S8, line 1's pins: THE WRITE DOOR (kernel/src/arena/write.ts) — every column id's typed setter
// stores into the column the id names; with a recorder attached, every store and every replacement (a slot table's
// growth, a hash table's rehash, the hole pool's compaction) is undone by `undoArena` to its mark, the arena then equal to
// its mark bit for bit (support.ts `arenaBits`); an undo a throw interrupts resumes and never re-applies an entry;
// `forEachEntry` visits the log in order and `entryCounts` counts the two forms apart; a table no arena registered logs
// nothing; and a Plat that had a recorder is the object it would have been without one. Run at the default sizes and, in
// the kernel-tiny project, with every table at capacity 1 (every allocation a growth).
import { describe, expect, it } from 'vitest';
import {
  createHandleTable,
  createRoleHeadTable,
  internId,
  roleHeadSet,
  type Plat,
} from '../../src/arena/index.js';
import * as door from '../../src/arena/write.js';
import {
  attachRecorder,
  COLUMN_COUNT,
  columnName,
  columnOf,
  detachRecorder,
  entryCounts,
  FACE_BASE,
  FACE_STRIDE,
  FK_FACES_HOLES,
  forEachEntry,
  HANDLES_BASE,
  markArena,
  OBJ_HALF_EDGES,
  OBJ_VERTICES,
  OWNER_HEAD_BASE,
  ROLE_HEAD_BASE,
  setUndoFaultHook,
  undoArena,
  type ArenaMark,
  type Column,
} from '../../src/arena/write.js';
import type { Level } from '../../src/types/index.js';
import { TINY_TABLES } from '../arena/tiny.js';
import { arenaBits, churn, framed } from './support.js';

const LV: readonly Level[] = [0, 1, 2, 3, 4];

/** One column id's setter and the column it must store into, read by its path from the Plat (never through the door). */
interface ColumnCase {
  readonly id: number;
  readonly label: string;
  readonly set: (p: Plat, slot: number, x: number) => void;
  readonly column: (p: Plat) => Column;
}

/** Every column id, its setter, and its column read by its own path (written out, so a mis-mapped id goes red). */
function columnCases(): ColumnCase[] {
  const c: ColumnCase[] = [
    { id: door.COL_VERTICES_X, label: 'vertices.x', set: door.setVerticesX, column: (p) => p.vertices.x },
    { id: door.COL_VERTICES_Y, label: 'vertices.y', set: door.setVerticesY, column: (p) => p.vertices.y },
    { id: door.COL_VERTICES_OUT, label: 'vertices.out', set: door.setVerticesOut, column: (p) => p.vertices.out },
    { id: door.COL_VERTICES_LEVEL, label: 'vertices.level', set: door.setVerticesLevel, column: (p) => p.vertices.level },
    { id: door.COL_VERTICES_FLAGS, label: 'vertices.flags', set: door.setVerticesFlags, column: (p) => p.vertices.flags },
    { id: door.COL_HALF_EDGES_ORIGIN, label: 'halfEdges.origin', set: door.setHalfEdgesOrigin, column: (p) => p.halfEdges.origin },
    { id: door.COL_HALF_EDGES_NEXT, label: 'halfEdges.next', set: door.setHalfEdgesNext, column: (p) => p.halfEdges.next },
    { id: door.COL_HALF_EDGES_PREV, label: 'halfEdges.prev', set: door.setHalfEdgesPrev, column: (p) => p.halfEdges.prev },
    { id: door.COL_HALF_EDGES_LEVEL, label: 'halfEdges.level', set: door.setHalfEdgesLevel, column: (p) => p.halfEdges.level },
    { id: door.COL_ROLES_EDGE_FIRST, label: 'roles.edgeFirst', set: door.setRolesEdgeFirst, column: (p) => p.roles.edgeFirst },
    { id: door.COL_ROLES_VERTEX_FIRST, label: 'roles.vertexFirst', set: door.setRolesVertexFirst, column: (p) => p.roles.vertexFirst },
    { id: door.COL_ROLES_KIND, label: 'roles.kind', set: door.setRolesKind, column: (p) => p.roles.kind },
    { id: door.COL_ROLES_ENTITY, label: 'roles.entity', set: door.setRolesEntity, column: (p) => p.roles.entity },
    { id: door.COL_ROLES_LEVEL, label: 'roles.level', set: door.setRolesLevel, column: (p) => p.roles.level },
    { id: door.COL_ROLES_ORDINAL, label: 'roles.ordinal', set: door.setRolesOrdinal, column: (p) => p.roles.ordinal },
    { id: door.COL_ROLES_NEXT_IN_SET, label: 'roles.nextInSet', set: door.setRolesNextInSet, column: (p) => p.roles.nextInSet },
    { id: door.COL_ROLES_NEXT_SAME_KEY, label: 'roles.nextSameKey', set: door.setRolesNextSameKey, column: (p) => p.roles.nextSameKey },
    { id: door.COL_INDEX_HOME_VERTEX, label: 'indexHome.vertex', set: door.setIndexHomeVertex, column: (p) => p.indexHome.vertex },
    { id: door.COL_INDEX_HOME_EDGE, label: 'indexHome.edge', set: door.setIndexHomeEdge, column: (p) => p.indexHome.edge },
  ];
  for (const l of LV) {
    const id = (k: number): number => FACE_BASE + FACE_STRIDE * l + k;
    c.push(
      { id: id(door.FK_FACES_OUTER), label: `faces[${l}].outer`, set: (p, s, x) => door.setFacesOuter(p, l, s, x), column: (p) => p.faces[l].outer },
      { id: id(door.FK_FACES_HOLES_START), label: `faces[${l}].holesStart`, set: (p, s, x) => door.setFacesHolesStart(p, l, s, x), column: (p) => p.faces[l].holesStart },
      { id: id(door.FK_FACES_HOLES), label: `faces[${l}].holes`, set: (p, s, x) => door.setFacesHoles(p, l, s, x), column: (p) => p.faces[l].holes },
      { id: id(door.FK_FACES_KIND), label: `faces[${l}].kind`, set: (p, s, x) => door.setFacesKind(p, l, s, x), column: (p) => p.faces[l].kind },
      { id: id(door.FK_FACES_OWNER), label: `faces[${l}].owner`, set: (p, s, x) => door.setFacesOwner(p, l, s, x), column: (p) => p.faces[l].owner },
      { id: id(door.FK_FACES_PARENT), label: `faces[${l}].parent`, set: (p, s, x) => door.setFacesParent(p, l, s, x), column: (p) => p.faces[l].parent },
      { id: id(door.FK_FACES_STAGE), label: `faces[${l}].stage`, set: (p, s, x) => door.setFacesStage(p, l, s, x), column: (p) => p.faces[l].stage },
      { id: id(door.FK_FACES_NEXT_OF_OWNER), label: `faces[${l}].nextOfOwner`, set: (p, s, x) => door.setFacesNextOfOwner(p, l, s, x), column: (p) => p.faces[l].nextOfOwner },
      { id: id(door.FK_INDEX_HOME_FACE), label: `indexHome.face[${l}]`, set: (p, s, x) => door.setIndexHomeFace(p, l, s, x), column: (p) => p.indexHome.face[l] },
    );
  }
  c.push(
    { id: ROLE_HEAD_BASE, label: 'roles.head.k0', set: (p, s, x) => door.setRoleHeadK0(p.roles.head, s, x), column: (p) => p.roles.head.k0 },
    { id: ROLE_HEAD_BASE + 1, label: 'roles.head.k1', set: (p, s, x) => door.setRoleHeadK1(p.roles.head, s, x), column: (p) => p.roles.head.k1 },
    { id: ROLE_HEAD_BASE + 2, label: 'roles.head.first', set: (p, s, x) => door.setRoleHeadFirst(p.roles.head, s, x), column: (p) => p.roles.head.first },
  );
  for (const l of LV) {
    c.push(
      { id: OWNER_HEAD_BASE + 2 * l, label: `faces[${l}].ownerHead.owner`, set: (p, s, x) => door.setOwnerHeadOwner(p.faces[l].ownerHead, s, x), column: (p) => p.faces[l].ownerHead.owner },
      { id: OWNER_HEAD_BASE + 2 * l + 1, label: `faces[${l}].ownerHead.head`, set: (p, s, x) => door.setOwnerHeadHead(p.faces[l].ownerHead, s, x), column: (p) => p.faces[l].ownerHead.head },
    );
  }
  c.push(
    { id: HANDLES_BASE, label: 'handles.units', set: (p, s, x) => door.setHandlesUnits(p.handles, s, x), column: (p) => p.handles.units },
    { id: HANDLES_BASE + 1, label: 'handles.start', set: (p, s, x) => door.setHandlesStart(p.handles, s, x), column: (p) => p.handles.start },
    { id: HANDLES_BASE + 2, label: 'handles.hash', set: (p, s, x) => door.setHandlesHash(p.handles, s, x), column: (p) => p.handles.hash },
    { id: HANDLES_BASE + 3, label: 'handles.slots', set: (p, s, x) => door.setHandlesSlots(p.handles, s, x), column: (p) => p.handles.slots },
  );
  return c;
}

/** A sentinel the column's element type holds exactly, distinct from every fill (0, −1, FREE_KIND, VERTEX_FREE). */
function sentinel(a: Column): number {
  if (a instanceof Uint8Array) return 0xa5;
  if (a instanceof Uint16Array) return 0xbeef;
  if (a instanceof Int16Array) return -1234;
  return -0x12345678;
}

/** The labels of the lines two prints differ in (support.ts `arenaBits` labels each column's line). */
function changedLines(a: string, b: string): string[] {
  const la = a.split('\n');
  const lb = b.split('\n');
  const out: string[] = [];
  for (let i = 0; i < Math.max(la.length, lb.length); i++) if (la[i] !== lb[i]) out.push((la[i] ?? lb[i] ?? '').split(' ')[0]);
  return out;
}

describe(`the write door: the column ids${TINY_TABLES ? ' (tiny tables)' : ''}`, () => {
  it('there is one setter per column id, every id once, and columnOf names the column the id names', () => {
    const cases = columnCases();
    expect(cases.map((c) => c.id).sort((a, b) => a - b)).toEqual(Array.from({ length: COLUMN_COUNT }, (_, i) => i));
    const p = framed();
    for (const c of cases) {
      expect(columnOf(p, c.id), c.label).toBe(c.column(p));
      expect(columnName(c.id), String(c.id)).toBe(c.label);
    }
  });

  it('every setter stores a sentinel that reads back from the column its id names, and from no other column', () => {
    const p = framed();
    for (const c of columnCases()) {
      const before = arenaBits(p);
      const col = c.column(p);
      const x = sentinel(col);
      const old = col[0];
      c.set(p, 0, x);
      expect(c.column(p)[0], c.label).toBe(x);
      expect(changedLines(before, arenaBits(p)), c.label).toEqual([c.label]);
      c.set(p, 0, old);
      expect(arenaBits(p), `${c.label}: put back`).toBe(before);
    }
  });

  it('with a recorder attached, each setter logs (column id, slot, old value) and undoArena undoes it to its mark', () => {
    const p = framed();
    attachRecorder(p);
    try {
      for (const c of columnCases()) {
        const m = markArena(p);
        const at = arenaBits(p);
        const col = c.column(p);
        const slot = col.length - 1;
        const old = col[slot];
        c.set(p, slot, sentinel(col));
        const seen: [number, number, number][] = [];
        forEachEntry(p, m, { column: (id, s, o) => seen.push([id, s, o]), replacement: () => seen.push([-1, -1, -1]) });
        expect(seen, c.label).toEqual([[c.id, slot, old]]);
        undoArena(p, m);
        expect(arenaBits(p), c.label).toBe(at);
      }
    } finally {
      detachRecorder(p);
    }
  });
});

/** Each replacement entry since the mark, in log order: (index, id, the replaced reference). */
function replacements(p: Plat, m: ArenaMark): { index: number; id: number; ref: unknown }[] {
  const out: { index: number; id: number; ref: unknown }[] = [];
  let i = m.log;
  forEachEntry(p, m, { column: () => { i++; }, replacement: (id, ref) => { out.push({ index: i, id, ref }); i++; } });
  return out;
}

const HOLES1 = FACE_BASE + FACE_STRIDE * 1 + FK_FACES_HOLES;

describe(`the write door: the recorder${TINY_TABLES ? ' (tiny tables)' : ''}`, () => {
  it('growths of every slot table, rehashes of roles.head, an ownerHead and handles.slots and a pool compaction are undone to the mark', () => {
    const p = framed();
    attachRecorder(p);
    try {
      const m = markArena(p);
      const at = arenaBits(p);
      churn(p);
      const ids = new Set(replacements(p, m).map((r) => r.id));
      for (const id of [OBJ_VERTICES, OBJ_HALF_EDGES, door.COL_ROLES_KIND, ROLE_HEAD_BASE, OWNER_HEAD_BASE + 2, HANDLES_BASE + 3, HOLES1]) expect(ids.has(id), columnName(id)).toBe(true);
      for (const l of [1, 2, 3, 4]) expect(ids.has(FACE_BASE + FACE_STRIDE * l), `grow faces[${l}]`).toBe(true);
      // the pool was compacted at least once (a swap for an array of the same length)
      const holes = replacements(p, m).filter((r) => r.id === HOLES1);
      const lengths = holes.map((r, k) => [(r.ref as Int32Array).length, (k + 1 < holes.length ? (holes[k + 1].ref as Int32Array) : p.faces[1].holes).length]);
      expect(lengths.some(([a, b]) => a === b), `a compaction among the pool's swaps ${JSON.stringify(lengths)}`).toBe(true);
      expect(arenaBits(p)).not.toBe(at);
      undoArena(p, m);
      expect(arenaBits(p)).toBe(at);
    } finally {
      detachRecorder(p);
    }
  });

  /** An undo the fault hook interrupts right after the entry at `index` is undone, then the undo to the same mark. */
  function interrupted(pick: (p: Plat, m: ArenaMark) => number): void {
    const p = framed();
    attachRecorder(p);
    try {
      const m = markArena(p);
      const at = arenaBits(p);
      churn(p);
      const index = pick(p, m);
      expect(index).toBeGreaterThanOrEqual(m.log);
      setUndoFaultHook((i) => {
        if (i === index) throw new Error('fault: the undo interrupted');
      });
      try {
        expect(() => undoArena(p, m)).toThrow('fault: the undo interrupted');
      } finally {
        setUndoFaultHook(null);
      }
      expect(entryCounts(p, m).column + entryCounts(p, m).replacement).toBe(index - m.log);
      undoArena(p, m);
      expect(arenaBits(p)).toBe(at);
    } finally {
      detachRecorder(p);
    }
  }

  it('an undo interrupted right after a roles.head rehash\'s replacement entries are undone resumes, and never re-applies an entry', () => {
    // the rehash's three replacements are logged k0, k1, first; undone last-first, so k0's is the last of them undone
    interrupted((p, m) => {
      const r = replacements(p, m).filter((x) => x.id === ROLE_HEAD_BASE);
      expect(r.length).toBeGreaterThan(0);
      return r[r.length - 1].index;
    });
  });

  it('an undo interrupted right after a hole pool\'s compaction swap is undone resumes, and never re-applies an entry', () => {
    interrupted((p, m) => {
      const holes = replacements(p, m).filter((r) => r.id === HOLES1);
      const swaps = holes.filter((r, k) => (r.ref as Int32Array).length === (k + 1 < holes.length ? (holes[k + 1].ref as Int32Array) : p.faces[1].holes).length);
      expect(swaps.length).toBeGreaterThan(0);
      return swaps[swaps.length - 1].index;
    });
  });

  it('forEachEntry visits a frame\'s entries in log order (a slot-table growth, a roles.head rehash), and entryCounts counts them apart', () => {
    const p = framed();
    attachRecorder(p);
    try {
      const m = markArena(p);
      churn(p);
      const order: string[] = [];
      let column = 0;
      let replacement = 0;
      forEachEntry(p, m, {
        column: () => { column++; },
        replacement: (id) => {
          replacement++;
          order.push(columnName(id));
        },
      });
      expect(entryCounts(p, m)).toEqual({ column, replacement });
      expect(column).toBeGreaterThan(0);
      // a vertex growth: the object, then its two companion columns, in that order; a rehash: k0, k1, first
      const v = order.indexOf('vertices');
      expect(order.slice(v, v + 3)).toEqual(['vertices', 'roles.vertexFirst', 'indexHome.vertex']);
      const h = order.indexOf('roles.head.k0');
      expect(order.slice(h, h + 3)).toEqual(['roles.head.k0', 'roles.head.k1', 'roles.head.first']);
      // the rehash's re-inserting stores come after its replacements (the log interleaves both forms)
      const seq: string[] = [];
      forEachEntry(p, m, { column: (id) => seq.push(`c ${columnName(id)}`), replacement: (id) => seq.push(`r ${columnName(id)}`) });
      const r = seq.indexOf('r roles.head.first');
      expect(seq.slice(r + 1).some((s) => s === 'c roles.head.first')).toBe(true);
    } finally {
      detachRecorder(p);
    }
  });

  it('a table no arena registered stores plainly and logs nothing', () => {
    const p = framed();
    attachRecorder(p);
    try {
      const m = markArena(p);
      const t = createRoleHeadTable();
      for (let i = 0; i < 40; i++) roleHeadSet(t, i, i + 1, i);
      const h = createHandleTable(1, 1);
      for (let i = 0; i < 40; i++) internId(h, `entity:${i}`);
      expect(entryCounts(p, m)).toEqual({ column: 0, replacement: 0 });
      expect(h.count).toBe(40);
    } finally {
      detachRecorder(p);
    }
  });

  it('a Plat whose recorder was attached and detached is toEqual and structuredClone-equal to its twin that never had one', () => {
    const a = framed();
    const b = framed();
    attachRecorder(a);
    const m = markArena(a);
    churn(a);
    undoArena(a, m);
    detachRecorder(a);
    expect(a).toEqual(b);
    expect(structuredClone(a)).toEqual(structuredClone(b));
  });

  it('a second attach is refused, a detach of none is nothing, and an undo past an undone mark is refused', () => {
    const p = framed();
    detachRecorder(p);
    attachRecorder(p);
    try {
      expect(() => attachRecorder(p)).toThrow('already attached');
      const m0 = markArena(p);
      churn(p);
      const m1 = markArena(p);
      undoArena(p, m0);
      expect(() => undoArena(p, m1)).toThrow('already undone past');
    } finally {
      detachRecorder(p);
    }
    expect(() => markArena(p)).toThrow('no recorder');
  });
});
