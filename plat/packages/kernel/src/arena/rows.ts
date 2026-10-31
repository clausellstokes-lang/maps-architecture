// Role rows (§2.2 rule 7): each edge pair and each vertex carries a small sorted set of (role, entity, level, ordinal)
// rows, and the reverse index — the role-head table and the same-key chains — finds every row of a (role, entity,
// ordinal) key. A set is kept in rule 7's order: the role's rank in the registry, then the entity's address id, then
// the ordinal — never an interned handle's value. M0-a-02 builds the table and its raw maintenance (add a row, remove
// a row); the doors that decide which rows an op adds or strips — insertChain's knots, splitThrough's row, removeEdges,
// retypeEdges' rekey (§3.4) — are M0-a-04 … M0-a-06's.
import type { Handle, Id, Level, RoleKey, RoleName } from '../types/index.js';
import { check } from './debug.js';
import { compareHandleIds, compareHandleToId, handleOfId, idOfHandle, internId } from './handles.js';
import { FREE_KIND, growRoleRows, isHalfEdgeLive, isLevel, isVertexLive, type HalfEdgeId, type Plat, type VertexId } from './plat.js';
import { compareRoleRank, roleIdOf, roleInfo, type RoleKind } from './registry.js';
import { roleHeadDelete, roleHeadGet, roleHeadSet } from './tables.js';
import {
  setRolesEdgeFirst,
  setRolesEntity,
  setRolesKind,
  setRolesLevel,
  setRolesNextInSet,
  setRolesNextSameKey,
  setRolesOrdinal,
  setRolesVertexFirst,
} from './write.js';

/** A row a writer adds (§2.2); its level is always the adding batch's (rules 3, 7). */
export type RoleRow = { role: RoleName; entity: Id; ordinal?: number };

/** The largest ordinal a row carries (`RoleTable.ordinal` is a u16). */
export const MAX_ORDINAL = 0xffff;

/** The role-head table's second key word: role << 16 | ordinal. */
export function roleKeyWord(role: number, ordinal: number): number {
  return (role << 16) | ordinal;
}

/** Rule 7's order of two rows' keys: role rank, then the entity's address id, then the ordinal. */
export function compareRowKeys(p: Plat, roleA: number, entityA: Handle, ordinalA: number, roleB: number, entityB: Handle, ordinalB: number): number {
  if (roleA !== roleB) {
    const d = roleInfo(roleA).rank - roleInfo(roleB).rank;
    return d < 0 ? -1 : 1;
  }
  const e = compareHandleIds(p.handles, entityA, entityB);
  if (e !== 0) return e;
  return ordinalA === ordinalB ? 0 : ordinalA < ordinalB ? -1 : 1;
}

function firstOf(p: Plat, kind: RoleKind, element: number): number {
  return kind === 'edge' ? p.roles.edgeFirst[element] : p.roles.vertexFirst[element];
}

function setFirst(p: Plat, kind: RoleKind, element: number, row: number): void {
  if (kind === 'edge') setRolesEdgeFirst(p, element, row);
  else setRolesVertexFirst(p, element, row);
}

/** The set's element a role kind names: an edge role's rows sit on the pair of the half-edge given, a vertex role's on the vertex. */
function elementOf(p: Plat, kind: RoleKind, element: number): number {
  if (kind === 'edge') {
    check(isHalfEdgeLive(p, element), `half-edge ${element} is not live`);
    return element >> 1;
  }
  check(isVertexLive(p, element), `vertex ${element} is not live`);
  return element;
}

function allocRow(p: Plat): number {
  const s = p.slots.role;
  let r: number;
  if (s.free !== -1) {
    r = s.free;
    s.free = p.roles.nextSameKey[r];
  } else {
    if (s.top === p.roles.kind.length) growRoleRows(p);
    r = s.top++;
  }
  s.live++;
  return r;
}

/** Where a new row goes — found, with every refusal of the insertion, before anything is written (C-0149 (2)). */
interface RowPlace {
  kind: RoleKind;
  /** The edge pair or vertex whose set takes the row. */
  e: number;
  /** The row it follows in the set, −1 at the set's front. */
  prev: number;
  /** The row it precedes, −1 at the set's end. */
  cur: number;
  /** Its key's chain head now (the new row is prepended), −1 for a key no row carries. */
  first: number;
}

/**
 * A set's row against the new row's key in rule 7's order. The new entity is `entity`'s handle, or, when `id` is
 * given, an address id the handle table has not interned yet (`addRole`), compared by its code units — an id no
 * interned id equals, so there the ordinal never decides.
 */
function compareRowToKey(p: Plat, r: number, role: number, entity: Handle, id: Id | null, ordinal: number): number {
  const t = p.roles;
  if (id === null) return compareRowKeys(p, t.kind[r], t.entity[r], t.ordinal[r], role, entity, ordinal);
  if (t.kind[r] !== role) return compareRoleRank(t.kind[r], role) < 0 ? -1 : 1;
  return compareHandleToId(p.handles, t.entity[r], id);
}

/**
 * Every check of an insertion, and the place it would write — reads only, so a refusal here leaves the tables as they
 * were: the element live as the role's kind reads it, the level, the ordinal, the set position by a bounded walk (a key
 * the element already carries refused), and the key's chain head, a lookup that a malformed (full) role-head table
 * refuses. `entity` is the row's handle, or with `id` the handle interning `id` will give, which no row names yet.
 */
function placeRow(p: Plat, element: HalfEdgeId | VertexId, role: number, entity: Handle, id: Id | null, level: Level, ordinal: number): RowPlace {
  const info = roleInfo(role);
  const e = elementOf(p, info.kind, element);
  check(isLevel(level), 'a row level is 0 … 4');
  check(Number.isInteger(ordinal) && ordinal >= 0 && ordinal <= MAX_ORDINAL, 'an ordinal is a u16');
  check(info.indexed || ordinal === 0, `role ${info.name} is not indexed: its ordinal is 0 (rule 7)`);
  const t = p.roles;
  // The set position: before the first row that sorts after the new key. A set holds at most every row slot once, so
  // a walk longer than the high-water mark has met a cycle (C-0146 (10)).
  let prev = -1;
  let cur = firstOf(p, info.kind, e);
  let steps = 0;
  while (cur >= 0) {
    check(++steps <= p.slots.role.top, `the role set of ${info.kind} ${element} does not end`);
    const c = compareRowToKey(p, cur, role, entity, id, ordinal);
    if (c === 0) check(false, `the element already carries (${info.name}, ${id ?? idOfHandle(p.handles, entity)}, ${ordinal})`);
    if (c > 0) break;
    prev = cur;
    cur = t.nextInSet[cur];
  }
  return { kind: info.kind, e, prev, cur, first: roleHeadGet(t.head, entity, roleKeyWord(role, ordinal)) };
}

/**
 * Writes the row at its place: nothing here refuses — the slot allocation only grows the columns, and the role-head
 * write finds the key's slot exactly as `placeRow`'s lookup did (the head table is untouched in between).
 */
function writeRow(p: Plat, at: RowPlace, role: number, entity: Handle, level: Level, ordinal: number): number {
  const r = allocRow(p);
  const t = p.roles;
  setRolesKind(p, r, role);
  setRolesEntity(p, r, entity);
  setRolesLevel(p, r, level);
  setRolesOrdinal(p, r, ordinal);
  setRolesNextInSet(p, r, at.cur >= 0 ? at.cur : -2 - at.e);
  if (at.prev === -1) setFirst(p, at.kind, at.e, r);
  else setRolesNextInSet(p, at.prev, r);
  setRolesNextSameKey(p, r, at.first);
  roleHeadSet(t.head, entity, roleKeyWord(role, ordinal), r);
  return r;
}

/**
 * Adds the row (role id, entity handle, level, ordinal) to `element` — a half-edge for an edge role (the row sits on
 * its pair), a vertex for a vertex role — in rule 7's set order, and links it into the reverse index. Returns the row
 * slot. A raw primitive: no level rule is applied here (the doors apply rule 3's), but a key the element already
 * carries, an ordinal on a role the registry does not index, and an element slot that is not live as the role's kind
 * reads it are refused. Slots are plain numbers, so the role's kind decides how `element` is read: a vertex slot number
 * that is also a live half-edge is taken as that half-edge by an edge role (the doors pass the right element; C-0149).
 * Every refusal comes before the first write (C-0149 (2)).
 */
export function addRoleRow(p: Plat, element: HalfEdgeId | VertexId, role: number, entity: Handle, level: Level, ordinal: number): number {
  check(Number.isInteger(entity) && entity >= 0 && entity < p.handles.count, `entity handle ${entity} was never interned`);
  return writeRow(p, placeRow(p, element, role, entity, null, level, ordinal), role, entity, level, ordinal);
}

/** Is `r` a live role-row slot? */
export function isRoleRowLive(p: Plat, r: number): boolean {
  return Number.isInteger(r) && r >= 0 && r < p.slots.role.top && p.roles.kind[r] !== FREE_KIND;
}

/** The edge pair or vertex a row sits on (its kind is its role's). */
export function rowElement(p: Plat, r: number): number {
  check(isRoleRowLive(p, r), `role row ${r} is not live`);
  let n = p.roles.nextInSet[r];
  for (let guard = 0; n >= 0; n = p.roles.nextInSet[n]) check(++guard <= p.slots.role.top, `the set of role row ${r} does not end`);
  check(n <= -2, `role row ${r}'s set has no element mark`);
  return -2 - n;
}

/**
 * Removes a row from its set and from the reverse index, and frees its slot. Both predecessors are found before
 * anything is written, so a malformed set or chain (one that does not end, or does not hold the row) is refused with
 * the tables untouched (C-0146 (10)); the one write that can refuse — deleting the key from a malformed (full)
 * role-head table — is the first (C-0149 (2)).
 */
export function removeRoleRow(p: Plat, r: number): void {
  const e = rowElement(p, r);
  const t = p.roles;
  const top = p.slots.role.top;
  const kind = roleInfo(t.kind[r]).kind;
  const first = firstOf(p, kind, e);
  let setPrev = -1;
  if (first !== r) {
    let steps = 0;
    for (setPrev = first; t.nextInSet[setPrev] !== r; setPrev = t.nextInSet[setPrev]) {
      check(t.nextInSet[setPrev] >= 0, `role row ${r} is missing from its set`);
      check(++steps <= top, `the role set of ${kind} ${e} does not end`);
    }
  }
  const k1 = roleKeyWord(t.kind[r], t.ordinal[r]);
  const head = roleHeadGet(t.head, t.entity[r], k1);
  let keyPrev = -1;
  if (head !== r) {
    let steps = 0;
    for (keyPrev = head; t.nextSameKey[keyPrev] !== r; keyPrev = t.nextSameKey[keyPrev]) {
      check(t.nextSameKey[keyPrev] >= 0, `role row ${r} is missing from its key's chain`);
      check(++steps <= top, `the chain of role row ${r}'s key does not end`);
    }
  }
  if (keyPrev !== -1) setRolesNextSameKey(p, keyPrev, t.nextSameKey[r]);
  else if (t.nextSameKey[r] === -1) roleHeadDelete(t.head, t.entity[r], k1);
  else roleHeadSet(t.head, t.entity[r], k1, t.nextSameKey[r]);
  if (setPrev === -1) setFirst(p, kind, e, t.nextInSet[r] >= 0 ? t.nextInSet[r] : -1);
  else setRolesNextInSet(p, setPrev, t.nextInSet[r]);
  const s = p.slots.role;
  setRolesKind(p, r, FREE_KIND);
  setRolesEntity(p, r, -1);
  setRolesLevel(p, r, 0);
  setRolesOrdinal(p, r, 0);
  setRolesNextInSet(p, r, -1);
  setRolesNextSameKey(p, r, s.free);
  s.free = r;
  s.live--;
}

/** The rows on an edge pair (named by either half-edge) or a vertex, in set order (rule 7). */
export function rowsOn(p: Plat, kind: RoleKind, element: HalfEdgeId | VertexId): number[] {
  const e = elementOf(p, kind, element);
  const out: number[] = [];
  for (let r = firstOf(p, kind, e); r >= 0; r = p.roles.nextInSet[r]) {
    out.push(r);
    check(out.length <= p.slots.role.top, `the role set of ${kind} ${element} does not end`);
  }
  return out;
}

/** The rows of a (role id, entity handle, ordinal) key, in chain order (kernel-internal; never an output order). */
export function rowsOfKey(p: Plat, role: number, entity: Handle, ordinal: number): number[] {
  const out: number[] = [];
  if (entity < 0) return out;
  for (let r = roleHeadGet(p.roles.head, entity, roleKeyWord(role, ordinal)); r !== -1; r = p.roles.nextSameKey[r]) {
    out.push(r);
    check(out.length <= p.slots.role.top, `the chain of role ${role}, entity ${entity}, ordinal ${ordinal} does not end`);
  }
  return out;
}

/** A row's key by name (role name, address id, ordinal) — its level aside. */
export function rowKey(p: Plat, r: number): RoleKey {
  check(isRoleRowLive(p, r), `role row ${r} is not live`);
  return { role: roleInfo(p.roles.kind[r]).name, entity: idOfHandle(p.handles, p.roles.entity[r]), ordinal: p.roles.ordinal[r] };
}

/** The entity's handle in this arena, interning its address id when absent. */
export function intern(p: Plat, id: Id): Handle {
  return internId(p.handles, id);
}

/** The entity's handle in this arena, or −1 when no row or owner of the arena has named it (never interns). */
export function handleOf(p: Plat, id: Id): Handle {
  return handleOfId(p.handles, id);
}

/** The address id of a handle of this arena. */
export function idOf(p: Plat, h: Handle): Id {
  return idOfHandle(p.handles, h);
}

/**
 * Adds a row given by name (§2.2's `RoleRow`) at `level`: the role looked up in the registry, the entity interned. An
 * indexed role's row carries its ordinal — the allocation of an `anchor` contact name's is splitThrough's (§3.3 rule
 * 2; M0-a-04) — and every other role's ordinal is 0. An entity this arena has not interned is interned only after
 * every check has passed, so a refused call leaves the handle table as it was too (C-0149 (2)).
 */
export function addRole(p: Plat, element: HalfEdgeId | VertexId, row: RoleRow, level: Level): number {
  const role = roleIdOf(row.role);
  check(role >= 0, `no role named ${row.role}`);
  const info = roleInfo(role);
  check(row.ordinal !== undefined || !info.indexed, `an indexed role's row (${row.role}) carries its ordinal here; allocation is splitThrough's`);
  const ordinal = row.ordinal ?? 0;
  check(typeof row.entity === 'string' && row.entity.length > 0, 'an address id is a non-empty string');
  const known = handleOfId(p.handles, row.entity);
  if (known !== -1) return addRoleRow(p, element, role, known, level, ordinal);
  // A new entity takes the next handle (interning order), so the row is placed against that handle and the id's code
  // units; interning — the first write — refuses only before writing (`internId`), and the row's writes never refuse.
  const at = placeRow(p, element, role, p.handles.count, row.entity, level, ordinal);
  return writeRow(p, at, role, internId(p.handles, row.entity), level, ordinal);
}
