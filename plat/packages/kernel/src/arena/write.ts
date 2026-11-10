// THE WRITE DOOR (M0-a-06 hardening round S8; amendment z item 985 (b) as J627 corrects it): every store into an arena
// column passes this file — a typed setter per column, the column fixed in the setter's body — and every replacement of
// a column's array or of a table object (a growth, a rehash, the hole pool's compaction) is one replacement call here.
// JavaScript's typed arrays have no write hook, so the door is the only place a store can be seen: while an arena's
// RECORDER is attached, a setter first appends (column id, slot, old value) to the arena's undo log, and a replacement
// appends (id, the replaced array or object, by reference); with no recorder attached anywhere (every arena in
// production), a store is one comparison and the store itself, and the door changes no store's value, slot or order.
//
// THE COLUMN IDS. One per arena column, the per-level ones once per level: the Plat's columns (vertices, halfEdges, roles,
// indexHome.vertex / edge), then per level faces[l].outer … nextOfOwner and indexHome.face[l], then roles.head's k0, k1,
// first, each faces[l].ownerHead's owner, head, and the handle table's units, start, hash, slots — and two object ids,
// p.vertices and p.halfEdges, whose growths replace those objects whole. An id names a PATH from the Plat: `columnOf`
// returns the array the arena holds for it now, never an array object kept from earlier (C-0286 (4)).
//
// THREE SIGNATURE FORMS. `(p, slot, value)` for the Plat's columns; `(p, level, slot, value)` for faces[l].* and
// indexHome.face[l]; `(table, slot, value)` for the roles.head, ownerHead and handles columns, whose writers (tables.ts,
// handles.ts) have no Plat in scope and also run on tables no arena owns (the runner's handle table, renumber's and
// compact's fresh tables). A table reaches its arena — and its level, for an owner table — through the REGISTRY beside
// the door, a WeakMap from the table object filled for p.roles.head, every p.faces[l].ownerHead and p.handles while a
// recorder is attached (those objects live as long as their arena: growth and the image's put-back swap their arrays,
// never them); an unregistered table's store is a plain store.
//
// THE REPLACEMENTS. Nothing writes a replaced array after its swap (C-0286 (4)), so an entry holding it by reference holds
// its content at the swap. Undoing the entry puts the old array or object back: entries logged before it then replay into
// the array they were logged against, and entries logged after it go with the new one. Logging every store is correct
// between two replacements, never across one; with the replacements put back, every column's capacity is the mark's.
//
// SAVED BY VALUE at a mark, never logged: every SlotCounter whole ({top, free, live}: allocation reads `free` before
// `top`), holesTop[0 … 4] (the compaction lowers it), the version, p.frame (by reference: it is replaced, never mutated)
// and the COUNTS of roles.head, of each faces[l].ownerHead and of the handle table — fields, not columns, whose writers
// stay as they are.
//
// THE RECORDER lives BESIDE the arena (a WeakMap keyed by the Plat, as tx/savepoint.ts keeps TAKEN and RESTORES), never
// on it: a Plat that never had one is the object it always was (a structuredClone and toEqual see nothing new) and no Map
// or Set becomes reachable from a Plat (plat.ts's Plat). In S8 only the test-side frame observer attaches one (tx/frames.ts,
// kernel/test/tx/support.ts) to prove the log complete; S9's frames read it through `forEachEntry` / `entryCounts` and
// undo through `undoArena`. Every export here is kernel-internal, by path only (arena/index.ts gains no line; rule 5).
import type { HandleTable } from './handles.js';
import type { HalfEdgeTable, Plat, VertexTable } from './plat.js';
import type { OwnerTable, RoleHeadTable } from './tables.js';

/** An arena column: every typed array of §2.2's tables. */
export type Column = Int32Array | Int16Array | Uint16Array | Uint8Array;

// ---- the recorder ----------------------------------------------------------------------------------------------------

/**
 * One arena's undo log: parallel typed arrays (id / slot / old), grown by doubling, and a side list of the replaced
 * references. A column entry's slot is ≥ 0; a replacement entry's slot is −1 and its old field indexes the side list,
 * so the log's order interleaves both forms.
 */
interface Recorder {
  ids: Int32Array;
  slots: Int32Array;
  olds: Int32Array;
  n: number;
  readonly side: unknown[];
}

/** The attached recorders, by arena (beside it, never on it). */
const RECORDERS = new WeakMap<Plat, Recorder>();
/** The registry: a registered table → its arena's recorder and the id of its first column. */
const REGISTRY = new WeakMap<object, { readonly rec: Recorder; readonly base: number }>();
/** How many recorders are attached: 0 lets every setter skip the lookup (the production path). */
let attached = 0;

function push(r: Recorder, id: number, slot: number, old: number): void {
  if (r.n === r.ids.length) {
    const cap = r.ids.length * 2;
    const ids = new Int32Array(cap);
    ids.set(r.ids);
    r.ids = ids;
    const slots = new Int32Array(cap);
    slots.set(r.slots);
    r.slots = slots;
    const olds = new Int32Array(cap);
    olds.set(r.olds);
    r.olds = olds;
  }
  r.ids[r.n] = id;
  r.slots[r.n] = slot;
  r.olds[r.n] = old;
  r.n++;
}

function logP(p: Plat, id: number, slot: number, old: number): void {
  const r = RECORDERS.get(p);
  if (r !== undefined) push(r, id, slot, old);
}

function logT(t: object, k: number, slot: number, old: number): void {
  const e = REGISTRY.get(t);
  if (e !== undefined) push(e.rec, e.base + k, slot, old);
}

function logRefP(p: Plat, id: number, old: unknown): void {
  const r = RECORDERS.get(p);
  if (r === undefined) return;
  r.side.push(old);
  push(r, id, -1, r.side.length - 1);
}

function logRefT(t: object, k: number, old: unknown): void {
  const e = REGISTRY.get(t);
  if (e === undefined) return;
  e.rec.side.push(old);
  push(e.rec, e.base + k, -1, e.rec.side.length - 1);
}

// ---- the column ids (generated list; the order is the log's id space) ----------------------------------------------

/** `p.vertices.x`. */
export const COL_VERTICES_X = 0;
/** `p.vertices.y`. */
export const COL_VERTICES_Y = 1;
/** `p.vertices.out`. */
export const COL_VERTICES_OUT = 2;
/** `p.vertices.level`. */
export const COL_VERTICES_LEVEL = 3;
/** `p.vertices.flags`. */
export const COL_VERTICES_FLAGS = 4;
/** `p.halfEdges.origin`. */
export const COL_HALF_EDGES_ORIGIN = 5;
/** `p.halfEdges.next`. */
export const COL_HALF_EDGES_NEXT = 6;
/** `p.halfEdges.prev`. */
export const COL_HALF_EDGES_PREV = 7;
/** `p.halfEdges.level`. */
export const COL_HALF_EDGES_LEVEL = 8;
/** `p.roles.edgeFirst`. */
export const COL_ROLES_EDGE_FIRST = 9;
/** `p.roles.vertexFirst`. */
export const COL_ROLES_VERTEX_FIRST = 10;
/** `p.roles.kind`. */
export const COL_ROLES_KIND = 11;
/** `p.roles.entity`. */
export const COL_ROLES_ENTITY = 12;
/** `p.roles.level`. */
export const COL_ROLES_LEVEL = 13;
/** `p.roles.ordinal`. */
export const COL_ROLES_ORDINAL = 14;
/** `p.roles.nextInSet`. */
export const COL_ROLES_NEXT_IN_SET = 15;
/** `p.roles.nextSameKey`. */
export const COL_ROLES_NEXT_SAME_KEY = 16;
/** `p.indexHome.vertex`. */
export const COL_INDEX_HOME_VERTEX = 17;
/** `p.indexHome.edge`. */
export const COL_INDEX_HOME_EDGE = 18;
/** The first per-level column id: `p.faces[l].<column>` and `p.indexHome.face[l]` take FACE_BASE + 9·l + k. */
export const FACE_BASE = 19;
/** Columns per level. */
export const FACE_STRIDE = 9;
/** k of `FacesOuter` in a level's ids. */
export const FK_FACES_OUTER = 0;
/** k of `FacesHolesStart` in a level's ids. */
export const FK_FACES_HOLES_START = 1;
/** k of `FacesHoles` in a level's ids. */
export const FK_FACES_HOLES = 2;
/** k of `FacesKind` in a level's ids. */
export const FK_FACES_KIND = 3;
/** k of `FacesOwner` in a level's ids. */
export const FK_FACES_OWNER = 4;
/** k of `FacesParent` in a level's ids. */
export const FK_FACES_PARENT = 5;
/** k of `FacesStage` in a level's ids. */
export const FK_FACES_STAGE = 6;
/** k of `FacesNextOfOwner` in a level's ids. */
export const FK_FACES_NEXT_OF_OWNER = 7;
/** k of `IndexHomeFace` in a level's ids. */
export const FK_INDEX_HOME_FACE = 8;
/** `p.roles.head`'s columns k0, k1, first: ROLE_HEAD_BASE + 0 … 2. */
export const ROLE_HEAD_BASE = 64;
/** `p.faces[l].ownerHead`'s columns owner, head: OWNER_HEAD_BASE + 2·l + 0 … 1. */
export const OWNER_HEAD_BASE = 67;
/** `p.handles`' columns units, start, hash, slots: HANDLES_BASE + 0 … 3. */
export const HANDLES_BASE = 77;
/** The number of column ids (0 … COLUMN_COUNT − 1). */
export const COLUMN_COUNT = 81;
/** The object id of `p.vertices` (replaced whole by its growth). */
export const OBJ_VERTICES = 81;
/** The object id of `p.halfEdges` (replaced whole by its growth). */
export const OBJ_HALF_EDGES = 82;
/** Every id: the columns, then the two objects. */
export const ID_COUNT = 83;

/** The array the arena holds NOW for column id `id` (never an array kept from earlier: a growth replaces arrays, C-0286 (4)). */
export function columnOf(p: Plat, id: number): Column {
  switch (id) {
    case 0: return p.vertices.x;
    case 1: return p.vertices.y;
    case 2: return p.vertices.out;
    case 3: return p.vertices.level;
    case 4: return p.vertices.flags;
    case 5: return p.halfEdges.origin;
    case 6: return p.halfEdges.next;
    case 7: return p.halfEdges.prev;
    case 8: return p.halfEdges.level;
    case 9: return p.roles.edgeFirst;
    case 10: return p.roles.vertexFirst;
    case 11: return p.roles.kind;
    case 12: return p.roles.entity;
    case 13: return p.roles.level;
    case 14: return p.roles.ordinal;
    case 15: return p.roles.nextInSet;
    case 16: return p.roles.nextSameKey;
    case 17: return p.indexHome.vertex;
    case 18: return p.indexHome.edge;
    default: break;
  }
  if (id >= FACE_BASE && id < ROLE_HEAD_BASE) {
    const l = ((id - FACE_BASE) / FACE_STRIDE) | 0;
    const f = p.faces[l];
    switch ((id - FACE_BASE) % FACE_STRIDE) {
      case 0: return f.outer;
      case 1: return f.holesStart;
      case 2: return f.holes;
      case 3: return f.kind;
      case 4: return f.owner;
      case 5: return f.parent;
      case 6: return f.stage;
      case 7: return f.nextOfOwner;
      case 8: return p.indexHome.face[l];
      default: break;
    }
  }
  if (id >= ROLE_HEAD_BASE && id < OWNER_HEAD_BASE) return id === ROLE_HEAD_BASE ? p.roles.head.k0 : id === ROLE_HEAD_BASE + 1 ? p.roles.head.k1 : p.roles.head.first;
  if (id >= OWNER_HEAD_BASE && id < HANDLES_BASE) {
    const t = p.faces[((id - OWNER_HEAD_BASE) / 2) | 0].ownerHead;
    return (id - OWNER_HEAD_BASE) % 2 === 0 ? t.owner : t.head;
  }
  const h = p.handles;
  switch (id - HANDLES_BASE) {
    case 0: return h.units;
    case 1: return h.start;
    case 2: return h.hash;
    case 3: return h.slots;
    default: break;
  }
  throw new Error(`arena: no column id ${id}`);
}

/** A column id's path from the Plat, for messages (`vertices.x`, `faces[2].owner`, `roles.head.first`, …). */
export function columnName(id: number): string {
  const plat = ['vertices.x', 'vertices.y', 'vertices.out', 'vertices.level', 'vertices.flags', 'halfEdges.origin', 'halfEdges.next', 'halfEdges.prev', 'halfEdges.level', 'roles.edgeFirst', 'roles.vertexFirst', 'roles.kind', 'roles.entity', 'roles.level', 'roles.ordinal', 'roles.nextInSet', 'roles.nextSameKey', 'indexHome.vertex', 'indexHome.edge'];
  if (id >= 0 && id < FACE_BASE) return plat[id];
  const face = ['outer', 'holesStart', 'holes', 'kind', 'owner', 'parent', 'stage', 'nextOfOwner', ''];
  if (id >= FACE_BASE && id < ROLE_HEAD_BASE) { const l = ((id - FACE_BASE) / FACE_STRIDE) | 0; const k = (id - FACE_BASE) % FACE_STRIDE; return k === FK_INDEX_HOME_FACE ? `indexHome.face[${l}]` : `faces[${l}].${face[k]}`; }
  if (id >= ROLE_HEAD_BASE && id < OWNER_HEAD_BASE) return `roles.head.${['k0', 'k1', 'first'][id - ROLE_HEAD_BASE]}`;
  if (id >= OWNER_HEAD_BASE && id < HANDLES_BASE) return `faces[${((id - OWNER_HEAD_BASE) / 2) | 0}].ownerHead.${(id - OWNER_HEAD_BASE) % 2 === 0 ? 'owner' : 'head'}`;
  if (id >= HANDLES_BASE && id < COLUMN_COUNT) return `handles.${['units', 'start', 'hash', 'slots'][id - HANDLES_BASE]}`;
  if (id === OBJ_VERTICES) return 'vertices';
  if (id === OBJ_HALF_EDGES) return 'halfEdges';
  return `#${id}`;
}

/** Puts a replaced array or object back in the place `id` names (the undo of a replacement entry). */
function assign(p: Plat, id: number, ref: unknown): void {
  if (id === OBJ_VERTICES) { p.vertices = ref as VertexTable; return; }
  if (id === OBJ_HALF_EDGES) { p.halfEdges = ref as HalfEdgeTable; return; }
  switch (id) {
    case 0: p.vertices.x = ref as Int32Array; return;
    case 1: p.vertices.y = ref as Int32Array; return;
    case 2: p.vertices.out = ref as Int32Array; return;
    case 3: p.vertices.level = ref as Uint8Array; return;
    case 4: p.vertices.flags = ref as Uint8Array; return;
    case 5: p.halfEdges.origin = ref as Int32Array; return;
    case 6: p.halfEdges.next = ref as Int32Array; return;
    case 7: p.halfEdges.prev = ref as Int32Array; return;
    case 8: p.halfEdges.level = ref as Uint8Array; return;
    case 9: p.roles.edgeFirst = ref as Int32Array; return;
    case 10: p.roles.vertexFirst = ref as Int32Array; return;
    case 11: p.roles.kind = ref as Uint16Array; return;
    case 12: p.roles.entity = ref as Int32Array; return;
    case 13: p.roles.level = ref as Uint8Array; return;
    case 14: p.roles.ordinal = ref as Uint16Array; return;
    case 15: p.roles.nextInSet = ref as Int32Array; return;
    case 16: p.roles.nextSameKey = ref as Int32Array; return;
    case 17: p.indexHome.vertex = ref as Int16Array; return;
    case 18: p.indexHome.edge = ref as Int16Array; return;
    default: break;
  }
  if (id >= FACE_BASE && id < ROLE_HEAD_BASE) {
    const l = ((id - FACE_BASE) / FACE_STRIDE) | 0;
    const f = p.faces[l];
    switch ((id - FACE_BASE) % FACE_STRIDE) {
      case 0: f.outer = ref as Int32Array; return;
      case 1: f.holesStart = ref as Int32Array; return;
      case 2: f.holes = ref as Int32Array; return;
      case 3: f.kind = ref as Uint16Array; return;
      case 4: f.owner = ref as Int32Array; return;
      case 5: f.parent = ref as Int32Array; return;
      case 6: f.stage = ref as Uint8Array; return;
      case 7: f.nextOfOwner = ref as Int32Array; return;
      case 8: p.indexHome.face[l] = ref as Int16Array; return;
      default: break;
    }
  }
  if (id >= ROLE_HEAD_BASE && id < OWNER_HEAD_BASE) {
    const t = p.roles.head;
    if (id === ROLE_HEAD_BASE) t.k0 = ref as Int32Array;
    else if (id === ROLE_HEAD_BASE + 1) t.k1 = ref as Int32Array;
    else t.first = ref as Int32Array;
    return;
  }
  if (id >= OWNER_HEAD_BASE && id < HANDLES_BASE) {
    const t = p.faces[((id - OWNER_HEAD_BASE) / 2) | 0].ownerHead;
    if ((id - OWNER_HEAD_BASE) % 2 === 0) t.owner = ref as Int32Array;
    else t.head = ref as Int32Array;
    return;
  }
  const h = p.handles;
  switch (id - HANDLES_BASE) {
    case 0: h.units = ref as Uint16Array; return;
    case 1: h.start = ref as Int32Array; return;
    case 2: h.hash = ref as Int32Array; return;
    case 3: h.slots = ref as Int32Array; return;
    default: break;
  }
  throw new Error(`arena: no replaceable id ${id}`);
}

// ---- the typed setters: one per column id, the column fixed in the body (rule: the store goes into the array the arena
// holds now, and an attached recorder first appends (column id, slot, old value)) ---------------------------------------

/** `p.vertices.x[v] = x` through the door. */
export function setVerticesX(p: Plat, v: number, x: number): void {
  const a = p.vertices.x;
  if (attached !== 0) logP(p, 0, v, a[v]);
  a[v] = x;
}

/** `p.vertices.y[v] = x` through the door. */
export function setVerticesY(p: Plat, v: number, x: number): void {
  const a = p.vertices.y;
  if (attached !== 0) logP(p, 1, v, a[v]);
  a[v] = x;
}

/** `p.vertices.out[v] = x` through the door. */
export function setVerticesOut(p: Plat, v: number, x: number): void {
  const a = p.vertices.out;
  if (attached !== 0) logP(p, 2, v, a[v]);
  a[v] = x;
}

/** `p.vertices.level[v] = x` through the door. */
export function setVerticesLevel(p: Plat, v: number, x: number): void {
  const a = p.vertices.level;
  if (attached !== 0) logP(p, 3, v, a[v]);
  a[v] = x;
}

/** `p.vertices.flags[v] = x` through the door. */
export function setVerticesFlags(p: Plat, v: number, x: number): void {
  const a = p.vertices.flags;
  if (attached !== 0) logP(p, 4, v, a[v]);
  a[v] = x;
}

/** `p.halfEdges.origin[h] = x` through the door. */
export function setHalfEdgesOrigin(p: Plat, h: number, x: number): void {
  const a = p.halfEdges.origin;
  if (attached !== 0) logP(p, 5, h, a[h]);
  a[h] = x;
}

/** `p.halfEdges.next[h] = x` through the door. */
export function setHalfEdgesNext(p: Plat, h: number, x: number): void {
  const a = p.halfEdges.next;
  if (attached !== 0) logP(p, 6, h, a[h]);
  a[h] = x;
}

/** `p.halfEdges.prev[h] = x` through the door. */
export function setHalfEdgesPrev(p: Plat, h: number, x: number): void {
  const a = p.halfEdges.prev;
  if (attached !== 0) logP(p, 7, h, a[h]);
  a[h] = x;
}

/** `p.halfEdges.level[e] = x` through the door. */
export function setHalfEdgesLevel(p: Plat, e: number, x: number): void {
  const a = p.halfEdges.level;
  if (attached !== 0) logP(p, 8, e, a[e]);
  a[e] = x;
}

/** `p.roles.edgeFirst[e] = x` through the door. */
export function setRolesEdgeFirst(p: Plat, e: number, x: number): void {
  const a = p.roles.edgeFirst;
  if (attached !== 0) logP(p, 9, e, a[e]);
  a[e] = x;
}

/** `p.roles.vertexFirst[v] = x` through the door. */
export function setRolesVertexFirst(p: Plat, v: number, x: number): void {
  const a = p.roles.vertexFirst;
  if (attached !== 0) logP(p, 10, v, a[v]);
  a[v] = x;
}

/** `p.roles.kind[r] = x` through the door. */
export function setRolesKind(p: Plat, r: number, x: number): void {
  const a = p.roles.kind;
  if (attached !== 0) logP(p, 11, r, a[r]);
  a[r] = x;
}

/** `p.roles.entity[r] = x` through the door. */
export function setRolesEntity(p: Plat, r: number, x: number): void {
  const a = p.roles.entity;
  if (attached !== 0) logP(p, 12, r, a[r]);
  a[r] = x;
}

/** `p.roles.level[r] = x` through the door. */
export function setRolesLevel(p: Plat, r: number, x: number): void {
  const a = p.roles.level;
  if (attached !== 0) logP(p, 13, r, a[r]);
  a[r] = x;
}

/** `p.roles.ordinal[r] = x` through the door. */
export function setRolesOrdinal(p: Plat, r: number, x: number): void {
  const a = p.roles.ordinal;
  if (attached !== 0) logP(p, 14, r, a[r]);
  a[r] = x;
}

/** `p.roles.nextInSet[r] = x` through the door. */
export function setRolesNextInSet(p: Plat, r: number, x: number): void {
  const a = p.roles.nextInSet;
  if (attached !== 0) logP(p, 15, r, a[r]);
  a[r] = x;
}

/** `p.roles.nextSameKey[r] = x` through the door. */
export function setRolesNextSameKey(p: Plat, r: number, x: number): void {
  const a = p.roles.nextSameKey;
  if (attached !== 0) logP(p, 16, r, a[r]);
  a[r] = x;
}

/** `p.indexHome.vertex[v] = x` through the door. */
export function setIndexHomeVertex(p: Plat, v: number, x: number): void {
  const a = p.indexHome.vertex;
  if (attached !== 0) logP(p, 17, v, a[v]);
  a[v] = x;
}

/** `p.indexHome.edge[e] = x` through the door. */
export function setIndexHomeEdge(p: Plat, e: number, x: number): void {
  const a = p.indexHome.edge;
  if (attached !== 0) logP(p, 18, e, a[e]);
  a[e] = x;
}

/** `p.faces[level].outer[f] = x` through the door. */
export function setFacesOuter(p: Plat, level: number, f: number, x: number): void {
  const a = p.faces[level].outer;
  if (attached !== 0) logP(p, FACE_BASE + FACE_STRIDE * level + 0, f, a[f]);
  a[f] = x;
}

/** `p.faces[level].holesStart[f] = x` through the door. */
export function setFacesHolesStart(p: Plat, level: number, f: number, x: number): void {
  const a = p.faces[level].holesStart;
  if (attached !== 0) logP(p, FACE_BASE + FACE_STRIDE * level + 1, f, a[f]);
  a[f] = x;
}

/** `p.faces[level].holes[f] = x` through the door. */
export function setFacesHoles(p: Plat, level: number, f: number, x: number): void {
  const a = p.faces[level].holes;
  if (attached !== 0) logP(p, FACE_BASE + FACE_STRIDE * level + 2, f, a[f]);
  a[f] = x;
}

/** `p.faces[level].kind[f] = x` through the door. */
export function setFacesKind(p: Plat, level: number, f: number, x: number): void {
  const a = p.faces[level].kind;
  if (attached !== 0) logP(p, FACE_BASE + FACE_STRIDE * level + 3, f, a[f]);
  a[f] = x;
}

/** `p.faces[level].owner[f] = x` through the door. */
export function setFacesOwner(p: Plat, level: number, f: number, x: number): void {
  const a = p.faces[level].owner;
  if (attached !== 0) logP(p, FACE_BASE + FACE_STRIDE * level + 4, f, a[f]);
  a[f] = x;
}

/** `p.faces[level].parent[f] = x` through the door. */
export function setFacesParent(p: Plat, level: number, f: number, x: number): void {
  const a = p.faces[level].parent;
  if (attached !== 0) logP(p, FACE_BASE + FACE_STRIDE * level + 5, f, a[f]);
  a[f] = x;
}

/** `p.faces[level].stage[f] = x` through the door. */
export function setFacesStage(p: Plat, level: number, f: number, x: number): void {
  const a = p.faces[level].stage;
  if (attached !== 0) logP(p, FACE_BASE + FACE_STRIDE * level + 6, f, a[f]);
  a[f] = x;
}

/** `p.faces[level].nextOfOwner[f] = x` through the door. */
export function setFacesNextOfOwner(p: Plat, level: number, f: number, x: number): void {
  const a = p.faces[level].nextOfOwner;
  if (attached !== 0) logP(p, FACE_BASE + FACE_STRIDE * level + 7, f, a[f]);
  a[f] = x;
}

/** `p.indexHome.face[level][f] = x` through the door. */
export function setIndexHomeFace(p: Plat, level: number, f: number, x: number): void {
  const a = p.indexHome.face[level];
  if (attached !== 0) logP(p, FACE_BASE + FACE_STRIDE * level + 8, f, a[f]);
  a[f] = x;
}

/** `t.k0[i] = x` on a RoleHeadTable through the door (logged only for a registered table of an arena whose recorder is attached). */
export function setRoleHeadK0(t: RoleHeadTable, i: number, x: number): void {
  const a = t.k0;
  if (attached !== 0) logT(t, 0, i, a[i]);
  a[i] = x;
}

/** `t.k1[i] = x` on a RoleHeadTable through the door (logged only for a registered table of an arena whose recorder is attached). */
export function setRoleHeadK1(t: RoleHeadTable, i: number, x: number): void {
  const a = t.k1;
  if (attached !== 0) logT(t, 1, i, a[i]);
  a[i] = x;
}

/** `t.first[i] = x` on a RoleHeadTable through the door (logged only for a registered table of an arena whose recorder is attached). */
export function setRoleHeadFirst(t: RoleHeadTable, i: number, x: number): void {
  const a = t.first;
  if (attached !== 0) logT(t, 2, i, a[i]);
  a[i] = x;
}

/** `t.owner[i] = x` on a OwnerTable through the door (logged only for a registered table of an arena whose recorder is attached). */
export function setOwnerHeadOwner(t: OwnerTable, i: number, x: number): void {
  const a = t.owner;
  if (attached !== 0) logT(t, 0, i, a[i]);
  a[i] = x;
}

/** `t.head[i] = x` on a OwnerTable through the door (logged only for a registered table of an arena whose recorder is attached). */
export function setOwnerHeadHead(t: OwnerTable, i: number, x: number): void {
  const a = t.head;
  if (attached !== 0) logT(t, 1, i, a[i]);
  a[i] = x;
}

/** `t.units[i] = x` on a HandleTable through the door (logged only for a registered table of an arena whose recorder is attached). */
export function setHandlesUnits(t: HandleTable, i: number, x: number): void {
  const a = t.units;
  if (attached !== 0) logT(t, 0, i, a[i]);
  a[i] = x;
}

/** `t.start[i] = x` on a HandleTable through the door (logged only for a registered table of an arena whose recorder is attached). */
export function setHandlesStart(t: HandleTable, i: number, x: number): void {
  const a = t.start;
  if (attached !== 0) logT(t, 1, i, a[i]);
  a[i] = x;
}

/** `t.hash[i] = x` on a HandleTable through the door (logged only for a registered table of an arena whose recorder is attached). */
export function setHandlesHash(t: HandleTable, i: number, x: number): void {
  const a = t.hash;
  if (attached !== 0) logT(t, 2, i, a[i]);
  a[i] = x;
}

/** `t.slots[i] = x` on a HandleTable through the door (logged only for a registered table of an arena whose recorder is attached). */
export function setHandlesSlots(t: HandleTable, i: number, x: number): void {
  const a = t.slots;
  if (attached !== 0) logT(t, 3, i, a[i]);
  a[i] = x;
}

// ---- the replacement calls: one per array or object a growth, a rehash or the pool swap replaces ----------------------

/** `p.vertices = v` (its growth) through the door: an attached recorder first keeps the replaced object by reference. */
export function replaceVertices(p: Plat, v: VertexTable): void {
  if (attached !== 0) logRefP(p, OBJ_VERTICES, p.vertices);
  p.vertices = v;
}

/** `p.halfEdges = h` (its growth) through the door. */
export function replaceHalfEdges(p: Plat, h: HalfEdgeTable): void {
  if (attached !== 0) logRefP(p, OBJ_HALF_EDGES, p.halfEdges);
  p.halfEdges = h;
}

/** `p.roles.edgeFirst = a` (a growth) through the door. */
export function replaceRolesEdgeFirst(p: Plat, a: Int32Array): void {
  if (attached !== 0) logRefP(p, 9, p.roles.edgeFirst);
  p.roles.edgeFirst = a;
}

/** `p.roles.vertexFirst = a` (a growth) through the door. */
export function replaceRolesVertexFirst(p: Plat, a: Int32Array): void {
  if (attached !== 0) logRefP(p, 10, p.roles.vertexFirst);
  p.roles.vertexFirst = a;
}

/** `p.roles.kind = a` (a growth) through the door. */
export function replaceRolesKind(p: Plat, a: Uint16Array): void {
  if (attached !== 0) logRefP(p, 11, p.roles.kind);
  p.roles.kind = a;
}

/** `p.roles.entity = a` (a growth) through the door. */
export function replaceRolesEntity(p: Plat, a: Int32Array): void {
  if (attached !== 0) logRefP(p, 12, p.roles.entity);
  p.roles.entity = a;
}

/** `p.roles.level = a` (a growth) through the door. */
export function replaceRolesLevel(p: Plat, a: Uint8Array): void {
  if (attached !== 0) logRefP(p, 13, p.roles.level);
  p.roles.level = a;
}

/** `p.roles.ordinal = a` (a growth) through the door. */
export function replaceRolesOrdinal(p: Plat, a: Uint16Array): void {
  if (attached !== 0) logRefP(p, 14, p.roles.ordinal);
  p.roles.ordinal = a;
}

/** `p.roles.nextInSet = a` (a growth) through the door. */
export function replaceRolesNextInSet(p: Plat, a: Int32Array): void {
  if (attached !== 0) logRefP(p, 15, p.roles.nextInSet);
  p.roles.nextInSet = a;
}

/** `p.roles.nextSameKey = a` (a growth) through the door. */
export function replaceRolesNextSameKey(p: Plat, a: Int32Array): void {
  if (attached !== 0) logRefP(p, 16, p.roles.nextSameKey);
  p.roles.nextSameKey = a;
}

/** `p.indexHome.vertex = a` (a growth) through the door. */
export function replaceIndexHomeVertex(p: Plat, a: Int16Array): void {
  if (attached !== 0) logRefP(p, 17, p.indexHome.vertex);
  p.indexHome.vertex = a;
}

/** `p.indexHome.edge = a` (a growth) through the door. */
export function replaceIndexHomeEdge(p: Plat, a: Int16Array): void {
  if (attached !== 0) logRefP(p, 18, p.indexHome.edge);
  p.indexHome.edge = a;
}

/** `p.faces[level].outer = a` (a growth) through the door. */
export function replaceFacesOuter(p: Plat, level: number, a: Int32Array): void {
  if (attached !== 0) logRefP(p, FACE_BASE + FACE_STRIDE * level + 0, p.faces[level].outer);
  p.faces[level].outer = a;
}

/** `p.faces[level].holesStart = a` (a growth) through the door. */
export function replaceFacesHolesStart(p: Plat, level: number, a: Int32Array): void {
  if (attached !== 0) logRefP(p, FACE_BASE + FACE_STRIDE * level + 1, p.faces[level].holesStart);
  p.faces[level].holesStart = a;
}

/** `p.faces[level].holes = a` (a growth or the pool compaction's swap) through the door. */
export function replaceFacesHoles(p: Plat, level: number, a: Int32Array): void {
  if (attached !== 0) logRefP(p, FACE_BASE + FACE_STRIDE * level + 2, p.faces[level].holes);
  p.faces[level].holes = a;
}

/** `p.faces[level].kind = a` (a growth) through the door. */
export function replaceFacesKind(p: Plat, level: number, a: Uint16Array): void {
  if (attached !== 0) logRefP(p, FACE_BASE + FACE_STRIDE * level + 3, p.faces[level].kind);
  p.faces[level].kind = a;
}

/** `p.faces[level].owner = a` (a growth) through the door. */
export function replaceFacesOwner(p: Plat, level: number, a: Int32Array): void {
  if (attached !== 0) logRefP(p, FACE_BASE + FACE_STRIDE * level + 4, p.faces[level].owner);
  p.faces[level].owner = a;
}

/** `p.faces[level].parent = a` (a growth) through the door. */
export function replaceFacesParent(p: Plat, level: number, a: Int32Array): void {
  if (attached !== 0) logRefP(p, FACE_BASE + FACE_STRIDE * level + 5, p.faces[level].parent);
  p.faces[level].parent = a;
}

/** `p.faces[level].stage = a` (a growth) through the door. */
export function replaceFacesStage(p: Plat, level: number, a: Uint8Array): void {
  if (attached !== 0) logRefP(p, FACE_BASE + FACE_STRIDE * level + 6, p.faces[level].stage);
  p.faces[level].stage = a;
}

/** `p.faces[level].nextOfOwner = a` (a growth) through the door. */
export function replaceFacesNextOfOwner(p: Plat, level: number, a: Int32Array): void {
  if (attached !== 0) logRefP(p, FACE_BASE + FACE_STRIDE * level + 7, p.faces[level].nextOfOwner);
  p.faces[level].nextOfOwner = a;
}

/** `p.indexHome.face[level] = a` (a growth) through the door. */
export function replaceIndexHomeFace(p: Plat, level: number, a: Int16Array): void {
  if (attached !== 0) logRefP(p, FACE_BASE + FACE_STRIDE * level + 8, p.indexHome.face[level]);
  p.indexHome.face[level] = a;
}

/** `t.k0 = a` on a RoleHeadTable (its rehash or growth) through the door. */
export function replaceRoleHeadK0(t: RoleHeadTable, a: Int32Array): void {
  if (attached !== 0) logRefT(t, 0, t.k0);
  t.k0 = a;
}

/** `t.k1 = a` on a RoleHeadTable (its rehash or growth) through the door. */
export function replaceRoleHeadK1(t: RoleHeadTable, a: Int32Array): void {
  if (attached !== 0) logRefT(t, 1, t.k1);
  t.k1 = a;
}

/** `t.first = a` on a RoleHeadTable (its rehash or growth) through the door. */
export function replaceRoleHeadFirst(t: RoleHeadTable, a: Int32Array): void {
  if (attached !== 0) logRefT(t, 2, t.first);
  t.first = a;
}

/** `t.owner = a` on a OwnerTable (its rehash or growth) through the door. */
export function replaceOwnerHeadOwner(t: OwnerTable, a: Int32Array): void {
  if (attached !== 0) logRefT(t, 0, t.owner);
  t.owner = a;
}

/** `t.head = a` on a OwnerTable (its rehash or growth) through the door. */
export function replaceOwnerHeadHead(t: OwnerTable, a: Int32Array): void {
  if (attached !== 0) logRefT(t, 1, t.head);
  t.head = a;
}

/** `t.units = a` on a HandleTable (its rehash or growth) through the door. */
export function replaceHandlesUnits(t: HandleTable, a: Uint16Array): void {
  if (attached !== 0) logRefT(t, 0, t.units);
  t.units = a;
}

/** `t.start = a` on a HandleTable (its rehash or growth) through the door. */
export function replaceHandlesStart(t: HandleTable, a: Int32Array): void {
  if (attached !== 0) logRefT(t, 1, t.start);
  t.start = a;
}

/** `t.hash = a` on a HandleTable (its rehash or growth) through the door. */
export function replaceHandlesHash(t: HandleTable, a: Int32Array): void {
  if (attached !== 0) logRefT(t, 2, t.hash);
  t.hash = a;
}

/** `t.slots = a` on a HandleTable (its rehash or growth) through the door. */
export function replaceHandlesSlots(t: HandleTable, a: Int32Array): void {
  if (attached !== 0) logRefT(t, 3, t.slots);
  t.slots = a;
}

// ---- the recorder's API (kernel-internal; S8: the test-side frame observer; S9: the frames) -------------------------

/** A mark on an arena's log: the log's and the side list's lengths, and every value saved by value (above). */
export interface ArenaMark {
  readonly log: number;
  readonly side: number;
  readonly vertex: { readonly top: number; readonly free: number; readonly live: number };
  readonly pair: { readonly top: number; readonly free: number; readonly live: number };
  readonly face: readonly { readonly top: number; readonly free: number; readonly live: number }[];
  readonly role: { readonly top: number; readonly free: number; readonly live: number };
  readonly holesTop: readonly number[];
  readonly version: number;
  readonly frame: Plat['frame'];
  readonly headCount: number;
  readonly ownerCounts: readonly number[];
  readonly handleCount: number;
}

/** Attaches a recorder to `p` (one at a time; a second attach is a programming error) and registers its tables. */
export function attachRecorder(p: Plat): void {
  if (RECORDERS.has(p)) throw new Error('arena: a recorder is already attached to this arena');
  const rec: Recorder = { ids: new Int32Array(64), slots: new Int32Array(64), olds: new Int32Array(64), n: 0, side: [] };
  RECORDERS.set(p, rec);
  REGISTRY.set(p.roles.head, { rec, base: ROLE_HEAD_BASE });
  for (let l = 0; l < 5; l++) REGISTRY.set(p.faces[l].ownerHead, { rec, base: OWNER_HEAD_BASE + 2 * l });
  REGISTRY.set(p.handles, { rec, base: HANDLES_BASE });
  attached++;
}

/** Detaches `p`'s recorder (none attached: nothing) and empties its registry entries. */
export function detachRecorder(p: Plat): void {
  if (!RECORDERS.delete(p)) return;
  REGISTRY.delete(p.roles.head);
  for (let l = 0; l < 5; l++) REGISTRY.delete(p.faces[l].ownerHead);
  REGISTRY.delete(p.handles);
  attached--;
}

/** Is a recorder attached to `p`? */
export function hasRecorder(p: Plat): boolean {
  return RECORDERS.has(p);
}

function recorderOf(p: Plat): Recorder {
  const r = RECORDERS.get(p);
  if (r === undefined) throw new Error('arena: no recorder is attached to this arena');
  return r;
}

const counterOf = (s: { top: number; free: number; live: number }): { top: number; free: number; live: number } => ({ top: s.top, free: s.free, live: s.live });

/** A mark on `p`'s log now (its recorder attached): the log's length, the side list's and the values saved by value. */
export function markArena(p: Plat): ArenaMark {
  const r = recorderOf(p);
  const s = p.slots;
  return {
    log: r.n,
    side: r.side.length,
    vertex: counterOf(s.vertex),
    pair: counterOf(s.pair),
    face: s.face.map(counterOf),
    role: counterOf(s.role),
    holesTop: [...s.holesTop],
    version: p.version,
    frame: p.frame,
    headCount: p.roles.head.count,
    ownerCounts: p.faces.map((f) => f.ownerHead.count),
    handleCount: p.handles.count,
  };
}

/** A test-only hook called after each undone entry's cut (its index); null in production. */
let undoFault: ((entry: number) => void) | null = null;

/** Sets the test-only fault hook of `undoArena` (null: none). */
export function setUndoFaultHook(hook: ((entry: number) => void) | null): void {
  undoFault = hook;
}

/**
 * Undoes `p`'s log from its end down to `mark`, ONE ENTRY AT A TIME, onto the live arena — a column entry writes its old
 * value into `columnOf(p, id)`, a replacement entry puts its old array or object back — cutting the log past each entry
 * as soon as it is undone (apply, then cut), then restores the mark's saved values. An undo a throw interrupts resumes
 * at the first entry not yet undone and never re-applies one: a column entry is idempotent only while the array it was
 * logged against is its column's, and re-applied once its rehash or pool swap is back, an entry logged after the swap
 * would write the new array's fill into the old array. A mark above the log's length (one already undone past) is a
 * programming error.
 */
export function undoArena(p: Plat, mark: ArenaMark): void {
  const r = recorderOf(p);
  if (mark.log > r.n || mark.side > r.side.length) throw new Error('arena: an undo to a mark the log was already undone past');
  while (r.n > mark.log) {
    const i = r.n - 1;
    const id = r.ids[i];
    const slot = r.slots[i];
    const old = r.olds[i];
    if (slot >= 0) {
      columnOf(p, id)[slot] = old;
      r.n = i;
    } else {
      assign(p, id, r.side[old]);
      r.n = i;
      r.side.length = old;
    }
    if (undoFault !== null) undoFault(i);
  }
  const s = p.slots;
  const put = (c: { top: number; free: number; live: number }, m: ArenaMark['vertex']): void => {
    c.top = m.top;
    c.free = m.free;
    c.live = m.live;
  };
  put(s.vertex, mark.vertex);
  put(s.pair, mark.pair);
  for (let l = 0; l < 5; l++) put(s.face[l], mark.face[l]);
  put(s.role, mark.role);
  for (let l = 0; l < 5; l++) s.holesTop[l] = mark.holesTop[l];
  p.version = mark.version;
  p.frame = mark.frame;
  p.roles.head.count = mark.headCount;
  for (let l = 0; l < 5; l++) p.faces[l].ownerHead.count = mark.ownerCounts[l];
  p.handles.count = mark.handleCount;
}

/** A visitor of the log's entries: a column entry (column id, slot, old value) or a replacement entry (id, the replaced reference). */
export interface EntryVisitor {
  column(id: number, slot: number, old: number): void;
  replacement(id: number, ref: unknown): void;
}

/** Visits the entries logged after the mark `from`, in log order (read-only; S9's commit record and size counter). */
export function forEachEntry(p: Plat, from: ArenaMark, visit: EntryVisitor): void {
  const r = recorderOf(p);
  for (let i = from.log; i < r.n; i++) {
    if (r.slots[i] >= 0) visit.column(r.ids[i], r.slots[i], r.olds[i]);
    else visit.replacement(r.ids[i], r.side[r.olds[i]]);
  }
}

/** The column and replacement entries logged since the mark `from`. */
export function entryCounts(p: Plat, from: ArenaMark): { column: number; replacement: number } {
  const r = recorderOf(p);
  let column = 0;
  let replacement = 0;
  for (let i = from.log; i < r.n; i++) {
    if (r.slots[i] >= 0) column++;
    else replacement++;
  }
  return { column, replacement };
}
