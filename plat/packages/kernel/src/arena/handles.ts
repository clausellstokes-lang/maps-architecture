// The interned-handle table (§2.1 Ids: "in memory addresses are interned u32 handles, which the kernel's owner and role
// tables hold"): an entity's address id ↔ a handle. Handles are numbered 0, 1, 2 … in interning order and never
// reused, so their values depend on the order a session interned the ids — and no output reads one (§2.2 rule 7): sets
// are read by the address id, which `compareHandleIds` compares. Typed arrays only — the ids' UTF-16 code units back
// to back, an offset per handle and an open-addressing index — so the table travels inside a frozen copy with the
// arena it belongs to (§3.3 pool step 2: a district's new handles go above the base's high-water mark). M0-a-02.
import type { Handle, Id } from '../types/index.js';
import { check, tinyTables } from './debug.js';
import { MIN_TABLE_CAPACITY, mix32, tableCapacityFor } from './tables.js';

/** An address id ↔ handle table. */
export interface HandleTable {
  /** The ids' UTF-16 code units, back to back, in interning order. */
  units: Uint16Array;
  /** start[h]: handle h's first code unit; start[count]: the end of the last id. */
  start: Int32Array;
  /** Per handle: its id's hash (re-insertion on doubling never re-reads the units). */
  hash: Int32Array;
  /** Open addressing over the handles: a handle, or −1 = empty; a power of two kept at load ≤ 0.5. */
  slots: Int32Array;
  /** Handles interned (the high-water mark). */
  count: number;
}

/** The hash of an address id: FNV-1a over its UTF-16 code units, then the 32-bit finaliser. */
export function hashId(id: string): number {
  let h = 0x811c9dc5 | 0;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return mix32(h);
}

/** An empty table sized for `ids` handles and `units` code units (its index at 1 slot in the tiny-tables mode, C-XXXX). */
export function createHandleTable(ids: number = MIN_TABLE_CAPACITY, units: number = ids * 16): HandleTable {
  check(Number.isInteger(ids) && ids >= 1 && Number.isInteger(units) && units >= 1, 'handle-table sizes are positive integers');
  return {
    units: new Uint16Array(units),
    start: new Int32Array(ids + 1),
    hash: new Int32Array(ids),
    slots: new Int32Array(tinyTables() ? 1 : tableCapacityFor(ids)).fill(-1),
    count: 0,
  };
}

function sameId(t: HandleTable, h: number, id: string): boolean {
  const a = t.start[h];
  if (t.start[h + 1] - a !== id.length) return false;
  for (let i = 0; i < id.length; i++) if (t.units[a + i] !== id.charCodeAt(i)) return false;
  return true;
}

function slotOf(t: HandleTable, id: string, hash: number): number {
  const mask = t.slots.length - 1;
  let i = hash & mask;
  for (let probes = 0; t.slots[i] !== -1 && !(t.hash[t.slots[i]] === (hash | 0) && sameId(t, t.slots[i], id)); i = (i + 1) & mask) {
    check(++probes < t.slots.length, 'the handle index is full (its load is kept ≤ 0.5)');
  }
  return i;
}

/** The handle of an address id, or −1 when the table has not interned it (a lookup never interns). */
export function handleOfId(t: HandleTable, id: Id): Handle {
  return t.slots[slotOf(t, id, hashId(id))];
}

function growSlots(t: HandleTable): void {
  const cap = t.slots.length * 2;
  t.slots = new Int32Array(cap).fill(-1);
  const mask = cap - 1;
  for (let h = 0; h < t.count; h++) {
    let i = (t.hash[h] >>> 0) & mask;
    while (t.slots[i] !== -1) i = (i + 1) & mask;
    t.slots[i] = h;
  }
}

/** The handle of an address id, interning it (the next handle) when absent. */
export function internId(t: HandleTable, id: Id): Handle {
  check(typeof id === 'string' && id.length > 0, 'an address id is a non-empty string');
  const hash = hashId(id);
  let i = slotOf(t, id, hash);
  if (t.slots[i] !== -1) return t.slots[i];
  const h = t.count;
  check(h < 0x7fffffff, 'the handle table is full');
  if (h + 1 >= t.start.length) {
    const start = new Int32Array(t.start.length * 2);
    start.set(t.start);
    t.start = start;
    const hashes = new Int32Array(start.length - 1);
    hashes.set(t.hash);
    t.hash = hashes;
  }
  const at = t.start[h];
  if (at + id.length > t.units.length) {
    let cap = t.units.length * 2;
    while (cap < at + id.length) cap *= 2;
    const units = new Uint16Array(cap);
    units.set(t.units);
    t.units = units;
  }
  for (let k = 0; k < id.length; k++) t.units[at + k] = id.charCodeAt(k);
  t.start[h + 1] = at + id.length;
  t.hash[h] = hash | 0;
  t.count = h + 1;
  if (t.count * 2 > t.slots.length) {
    growSlots(t);
    i = slotOf(t, id, hash);
  }
  t.slots[i] = h;
  return h;
}

/** The address id of a handle (a handle the table never issued is a programming error). */
export function idOfHandle(t: HandleTable, h: Handle): Id {
  check(Number.isInteger(h) && h >= 0 && h < t.count, `no handle ${h}`);
  let s = '';
  for (let i = t.start[h]; i < t.start[h + 1]; i++) s += String.fromCharCode(t.units[i]);
  return s;
}

/**
 * Two handles in their address ids' order — UTF-16 code units, a shorter id before every longer id it begins (the
 * order `<` gives two strings): the total order rule 7 reads a role set in, never the handles' values.
 */
export function compareHandleIds(t: HandleTable, a: Handle, b: Handle): number {
  if (a === b) return 0;
  const a0 = t.start[a];
  const b0 = t.start[b];
  const la = t.start[a + 1] - a0;
  const lb = t.start[b + 1] - b0;
  const n = la < lb ? la : lb;
  for (let i = 0; i < n; i++) {
    const d = t.units[a0 + i] - t.units[b0 + i];
    if (d !== 0) return d < 0 ? -1 : 1;
  }
  return la === lb ? 0 : la < lb ? -1 : 1;
}

/**
 * A handle's address id against an id the table has not interned (yet), in `compareHandleIds`' order: how `addRole`
 * places a new entity's row before it interns the id, so a refused call leaves the table as it was (C-0149 (2)).
 */
export function compareHandleToId(t: HandleTable, a: Handle, id: Id): number {
  const a0 = t.start[a];
  const la = t.start[a + 1] - a0;
  const lb = id.length;
  const n = la < lb ? la : lb;
  for (let i = 0; i < n; i++) {
    const d = t.units[a0 + i] - id.charCodeAt(i);
    if (d !== 0) return d < 0 ? -1 : 1;
  }
  return la === lb ? 0 : la < lb ? -1 : 1;
}
