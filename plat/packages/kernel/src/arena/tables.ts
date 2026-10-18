// The arena's two lookup tables (§2.2, J-K22): `RoleHeadTable` — (entity handle, role << 16 | ordinal) → the first
// role-row slot of that key — and `OwnerTable` — owner handle → the first face of that owner at one level. Typed-array
// hash tables: open addressing, linear probing, a capacity that is a power of two kept at load ≤ 0.5 (doubled and
// re-inserted in slot order when an insert would exceed it), a fixed integer hash of the key words, deletion by
// backward shift (no tombstones). Lookups only — nothing iterates a table — so its layout never reaches an output, and
// the tables travel inside a frozen copy as plain typed arrays (no `Map` rebuilt per pool worker, §2.2 *Size*). M0-a-02.
import { check, tinyTables } from './debug.js';

/** (role, entity, ordinal) → first role-row slot (§2.2). `first` −1 marks an empty slot. */
export interface RoleHeadTable {
  /** The entity handle. */
  k0: Int32Array;
  /** role << 16 | ordinal. */
  k1: Int32Array;
  /** The first role-row slot of the key; −1 = empty. */
  first: Int32Array;
  /** Occupied slots. */
  count: number;
}

/** Owner handle → first FaceId of that owner at one level (§2.2). `head` −1 marks an empty slot. */
export interface OwnerTable {
  owner: Int32Array;
  head: Int32Array;
  count: number;
}

/** The smallest capacity a table takes. */
export const MIN_TABLE_CAPACITY = 16;

/** The capacity that holds `keys` keys at load ≤ 0.5: a power of two, at least MIN_TABLE_CAPACITY. */
export function tableCapacityFor(keys: number): number {
  check(Number.isInteger(keys) && keys >= 0, 'a key count is a non-negative integer');
  let cap = MIN_TABLE_CAPACITY;
  while (cap < keys * 2) cap *= 2;
  return cap;
}

/** A lawful capacity: a power of two ≥ MIN_TABLE_CAPACITY — or ≥ 1 in the tiny-tables mode (C-0286 (2)). */
function powerOfTwo(cap: number): boolean {
  return Number.isInteger(cap) && cap >= (tinyTables() ? 1 : MIN_TABLE_CAPACITY) && (cap & (cap - 1)) === 0 && cap <= 0x40000000;
}

/** MurmurHash3's 32-bit finaliser (a published avalanche step; our own copy, the arena reads no other module's hash). */
export function mix32(h: number): number {
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/** The fixed hash of two key words. */
export function hash2(k0: number, k1: number): number {
  return mix32(Math.imul(k0, 0x9e3779b1) ^ Math.imul(k1 ^ 0x7f4a7c15, 0x85ebca77));
}

/** The fixed hash of one key word. */
export function hash1(k0: number): number {
  return mix32(Math.imul(k0 ^ 0x3c6ef372, 0x9e3779b1));
}

// ---- RoleHeadTable ------------------------------------------------------------------------------------------------

/** An empty role-head table of `capacity` slots (a power of two ≥ 16; ≥ 1 in the tiny-tables mode). */
export function createRoleHeadTable(capacity: number = MIN_TABLE_CAPACITY): RoleHeadTable {
  check(powerOfTwo(capacity), `a table capacity is a power of two ≥ ${MIN_TABLE_CAPACITY}`);
  return { k0: new Int32Array(capacity), k1: new Int32Array(capacity), first: new Int32Array(capacity).fill(-1), count: 0 };
}

/** The slot holding the key, or the empty slot where it would go. */
function roleHeadSlot(t: RoleHeadTable, k0: number, k1: number): number {
  const mask = t.first.length - 1;
  let i = hash2(k0, k1) & mask;
  for (let probes = 0; t.first[i] !== -1 && (t.k0[i] !== k0 || t.k1[i] !== k1); i = (i + 1) & mask) {
    check(++probes < t.first.length, 'a role-head table is full (its load is kept ≤ 0.5)');
  }
  return i;
}

/** The first role-row slot of the key, or −1. */
export function roleHeadGet(t: RoleHeadTable, k0: number, k1: number): number {
  return t.first[roleHeadSlot(t, k0, k1)];
}

function roleHeadGrow(t: RoleHeadTable): void {
  const { k0, k1, first } = t;
  const cap = first.length * 2;
  t.k0 = new Int32Array(cap);
  t.k1 = new Int32Array(cap);
  t.first = new Int32Array(cap).fill(-1);
  for (let s = 0; s < first.length; s++) {
    if (first[s] === -1) continue;
    const i = roleHeadSlot(t, k0[s], k1[s]);
    t.k0[i] = k0[s];
    t.k1[i] = k1[s];
    t.first[i] = first[s];
  }
}

/** Sets the key's first row slot (≥ 0), inserting the key when absent; doubles the table before load would pass 0.5. */
export function roleHeadSet(t: RoleHeadTable, k0: number, k1: number, firstSlot: number): void {
  check(Number.isInteger(firstSlot) && firstSlot >= 0, 'a role head is a row slot ≥ 0');
  let i = roleHeadSlot(t, k0, k1);
  if (t.first[i] === -1) {
    if ((t.count + 1) * 2 > t.first.length) {
      roleHeadGrow(t);
      i = roleHeadSlot(t, k0, k1);
    }
    t.k0[i] = k0;
    t.k1[i] = k1;
    t.count++;
  }
  t.first[i] = firstSlot;
}

/** Removes the key (absent: nothing) by backward shift; returns whether it was present. */
export function roleHeadDelete(t: RoleHeadTable, k0: number, k1: number): boolean {
  let i = roleHeadSlot(t, k0, k1);
  if (t.first[i] === -1) return false;
  const mask = t.first.length - 1;
  // The cluster's end, found before anything moves: a table kept at load ≤ 0.5 holds an empty slot within length − 1
  // steps; a full one is refused untouched (C-0146 (10)).
  let end = i;
  for (let probes = 0; ; ) {
    check(++probes < t.first.length, 'a role-head table is full (its load is kept ≤ 0.5)');
    end = (end + 1) & mask;
    if (t.first[end] === -1) break;
  }
  for (let j = (i + 1) & mask; j !== end; j = (j + 1) & mask) {
    const home = hash2(t.k0[j], t.k1[j]) & mask;
    // The entry at j may fill the hole at i only when i lies on its probe path, cyclically in [home, j).
    if (((j - home) & mask) >= ((j - i) & mask)) {
      t.k0[i] = t.k0[j];
      t.k1[i] = t.k1[j];
      t.first[i] = t.first[j];
      i = j;
    }
  }
  t.first[i] = -1;
  t.k0[i] = 0;
  t.k1[i] = 0;
  t.count--;
  return true;
}

// ---- OwnerTable ---------------------------------------------------------------------------------------------------

/** An empty owner table of `capacity` slots (a power of two ≥ 16; ≥ 1 in the tiny-tables mode). */
export function createOwnerTable(capacity: number = MIN_TABLE_CAPACITY): OwnerTable {
  check(powerOfTwo(capacity), `a table capacity is a power of two ≥ ${MIN_TABLE_CAPACITY}`);
  return { owner: new Int32Array(capacity), head: new Int32Array(capacity).fill(-1), count: 0 };
}

function ownerSlot(t: OwnerTable, owner: number): number {
  const mask = t.head.length - 1;
  let i = hash1(owner) & mask;
  for (let probes = 0; t.head[i] !== -1 && t.owner[i] !== owner; i = (i + 1) & mask) {
    check(++probes < t.head.length, 'an owner table is full (its load is kept ≤ 0.5)');
  }
  return i;
}

/** The first face of the owner, or −1. */
export function ownerGet(t: OwnerTable, owner: number): number {
  return t.head[ownerSlot(t, owner)];
}

function ownerGrow(t: OwnerTable): void {
  const { owner, head } = t;
  const cap = head.length * 2;
  t.owner = new Int32Array(cap);
  t.head = new Int32Array(cap).fill(-1);
  for (let s = 0; s < head.length; s++) {
    if (head[s] === -1) continue;
    const i = ownerSlot(t, owner[s]);
    t.owner[i] = owner[s];
    t.head[i] = head[s];
  }
}

/** Sets the owner's first face (≥ 0), inserting the owner when absent; doubles before load would pass 0.5. */
export function ownerSet(t: OwnerTable, owner: number, firstFace: number): void {
  check(Number.isInteger(firstFace) && firstFace >= 0, 'an owner head is a face slot ≥ 0');
  let i = ownerSlot(t, owner);
  if (t.head[i] === -1) {
    if ((t.count + 1) * 2 > t.head.length) {
      ownerGrow(t);
      i = ownerSlot(t, owner);
    }
    t.owner[i] = owner;
    t.count++;
  }
  t.head[i] = firstFace;
}

/** Removes the owner (absent: nothing) by backward shift; returns whether it was present. */
export function ownerDelete(t: OwnerTable, owner: number): boolean {
  let i = ownerSlot(t, owner);
  if (t.head[i] === -1) return false;
  const mask = t.head.length - 1;
  let end = i;
  for (let probes = 0; ; ) {
    check(++probes < t.head.length, 'an owner table is full (its load is kept ≤ 0.5)');
    end = (end + 1) & mask;
    if (t.head[end] === -1) break;
  }
  for (let j = (i + 1) & mask; j !== end; j = (j + 1) & mask) {
    const home = hash1(t.owner[j]) & mask;
    if (((j - home) & mask) >= ((j - i) & mask)) {
      t.owner[i] = t.owner[j];
      t.head[i] = t.head[j];
      i = j;
    }
  }
  t.head[i] = -1;
  t.owner[i] = 0;
  t.count--;
  return true;
}
