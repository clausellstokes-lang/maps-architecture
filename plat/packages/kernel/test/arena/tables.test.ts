// M0-a-02: RoleHeadTable and OwnerTable (§2.2, J-K22) — open addressing with linear probing, a power-of-two capacity
// doubled before load passes 0.5 and re-inserted in slot order, deletion by backward shift (no tombstones): insert /
// lookup / delete against a Map reference over 10⁶ random operations, with the table's invariants checked as it goes.
import { describe, expect, it } from 'vitest';
import {
  createOwnerTable,
  createRoleHeadTable,
  MIN_TABLE_CAPACITY,
  ownerDelete,
  ownerGet,
  ownerSet,
  roleHeadDelete,
  roleHeadGet,
  roleHeadSet,
  tableCapacityFor,
  type OwnerTable,
  type RoleHeadTable,
} from '../../src/arena/index.js';
import { hash1, hash2, mix32 } from '../../src/arena/tables.js';
import { generator } from '../num/support.js';

const TIMEOUT = 600_000;

/** Every occupied slot is reachable from its home without crossing an empty slot (what backward shift preserves), and the count and load hold. */
function checkRoleHead(t: RoleHeadTable): void {
  const cap = t.first.length;
  const mask = cap - 1;
  expect(cap & mask).toBe(0);
  let n = 0;
  for (let i = 0; i < cap; i++) {
    if (t.first[i] === -1) continue;
    n++;
    for (let j = hash2(t.k0[i], t.k1[i]) & mask; j !== i; j = (j + 1) & mask) expect(t.first[j]).not.toBe(-1);
  }
  expect(n).toBe(t.count);
  expect(t.count * 2).toBeLessThanOrEqual(cap);
}

function checkOwner(t: OwnerTable): void {
  const cap = t.head.length;
  const mask = cap - 1;
  let n = 0;
  for (let i = 0; i < cap; i++) {
    if (t.head[i] === -1) continue;
    n++;
    for (let j = hash1(t.owner[i]) & mask; j !== i; j = (j + 1) & mask) expect(t.head[j]).not.toBe(-1);
  }
  expect(n).toBe(t.count);
  expect(t.count * 2).toBeLessThanOrEqual(cap);
}

describe('RoleHeadTable (§2.2: open addressing, load ≤ 0.5, backward-shift deletion)', () => {
  it('starts empty at a power-of-two capacity and refuses any other', () => {
    const t = createRoleHeadTable();
    expect(t.first.length).toBe(MIN_TABLE_CAPACITY);
    expect(t.count).toBe(0);
    expect(roleHeadGet(t, 7, 3)).toBe(-1);
    for (const bad of [0, 8, 24, 17, -16, 1.5]) expect(() => createRoleHeadTable(bad)).toThrow(/power of two/);
    expect(tableCapacityFor(0)).toBe(16);
    expect(tableCapacityFor(8)).toBe(16);
    expect(tableCapacityFor(9)).toBe(32);
    expect(tableCapacityFor(60_000)).toBe(131_072);
  });

  it('doubles exactly when an insert would pass load 0.5, re-inserting every key; an update never grows it', () => {
    const t = createRoleHeadTable(16);
    for (let k = 0; k < 8; k++) roleHeadSet(t, k, k << 16, k);
    expect(t.first.length).toBe(16);
    expect(t.count).toBe(8);
    for (let k = 0; k < 8; k++) roleHeadSet(t, k, k << 16, 100 + k); // updates
    expect(t.first.length).toBe(16);
    expect(t.count).toBe(8);
    roleHeadSet(t, 8, 8 << 16, 8);
    expect(t.first.length).toBe(32);
    expect(t.count).toBe(9);
    for (let k = 0; k < 8; k++) expect(roleHeadGet(t, k, k << 16)).toBe(100 + k);
    expect(roleHeadGet(t, 8, 8 << 16)).toBe(8);
    checkRoleHead(t);
  });

  it('keys on both words: (entity, role << 16 | ordinal) — equal entities with other roles or ordinals are other keys', () => {
    const t = createRoleHeadTable();
    roleHeadSet(t, 5, (3 << 16) | 0, 10);
    roleHeadSet(t, 5, (3 << 16) | 1, 11);
    roleHeadSet(t, 5, (4 << 16) | 0, 12);
    roleHeadSet(t, 6, (3 << 16) | 0, 13);
    expect([roleHeadGet(t, 5, 3 << 16), roleHeadGet(t, 5, (3 << 16) | 1), roleHeadGet(t, 5, 4 << 16), roleHeadGet(t, 6, 3 << 16)]).toEqual([10, 11, 12, 13]);
    expect(roleHeadDelete(t, 5, (3 << 16) | 1)).toBe(true);
    expect(roleHeadDelete(t, 5, (3 << 16) | 1)).toBe(false);
    expect([roleHeadGet(t, 5, 3 << 16), roleHeadGet(t, 5, (3 << 16) | 1), roleHeadGet(t, 5, 4 << 16), roleHeadGet(t, 6, 3 << 16)]).toEqual([10, -1, 12, 13]);
    expect(t.count).toBe(3);
    expect(() => roleHeadSet(t, 1, 1, -1)).toThrow(/row slot/);
  });

  it('backward shift keeps a colliding run findable: delete the head of a run, then its middle (no tombstone left)', () => {
    const t = createRoleHeadTable(64);
    const mask = 63;
    // find six keys with one home
    const home = hash2(0, 0) & mask;
    const keys: number[] = [];
    for (let k1 = 0; keys.length < 6; k1++) if ((hash2(0, k1) & mask) === home) keys.push(k1);
    keys.forEach((k1, i) => roleHeadSet(t, 0, k1, i));
    roleHeadDelete(t, 0, keys[0]);
    roleHeadDelete(t, 0, keys[3]);
    keys.forEach((k1, i) => expect(roleHeadGet(t, 0, k1)).toBe(i === 0 || i === 3 ? -1 : i));
    // the run is packed from its home: no empty slot inside it
    for (let s = 0; s < 4; s++) expect(t.first[(home + s) & mask]).not.toBe(-1);
    expect(t.first[(home + 4) & mask]).toBe(-1);
    checkRoleHead(t);
  });

  it('refuses to probe a full table rather than loop (a table kept at load ≤ 0.5 is never full)', () => {
    const t = createRoleHeadTable(16);
    for (let k = 0; k < 16; k++) {
      t.k0[k] = 1000 + k;
      t.first[k] = k;
    }
    t.count = 16;
    expect(() => roleHeadGet(t, 1, 1)).toThrow(/full/);
    const o = createOwnerTable(16);
    for (let k = 0; k < 16; k++) {
      o.owner[k] = 1000 + k;
      o.head[k] = k;
    }
    expect(() => ownerGet(o, 1)).toThrow(/full/);
  });

  it('agrees with a Map over 10⁶ random insert / lookup / delete operations, its invariants holding throughout', () => {
    const rnd = generator(0x0a02);
    const t = createRoleHeadTable();
    const ref = new Map<string, number>();
    let maxCount = 0;
    for (let op = 0; op < 1_000_000; op++) {
      // a small key space so the run grows, shrinks and collides; k0 an entity handle, k1 role << 16 | ordinal
      const k0 = Math.floor(rnd() * 3000);
      const k1 = (Math.floor(rnd() * 56) << 16) | Math.floor(rnd() * 4);
      const key = `${k0}/${k1}`;
      const r = rnd();
      if (r < 0.45) {
        const v = Math.floor(rnd() * 1e9);
        roleHeadSet(t, k0, k1, v);
        ref.set(key, v);
      } else if (r < 0.75) {
        expect(roleHeadDelete(t, k0, k1)).toBe(ref.delete(key));
      } else {
        expect(roleHeadGet(t, k0, k1)).toBe(ref.get(key) ?? -1);
      }
      expect(t.count).toBe(ref.size);
      if (t.count > maxCount) maxCount = t.count;
      if ((op & 0x3ffff) === 0) checkRoleHead(t);
    }
    checkRoleHead(t);
    for (const [key, v] of ref) {
      const [k0, k1] = key.split('/').map(Number);
      expect(roleHeadGet(t, k0, k1)).toBe(v);
    }
    expect(t.first.length).toBe(tableCapacityFor(maxCount)); // grown only by doubling at load 0.5, never shrunk
  }, TIMEOUT);
});

describe('OwnerTable (§2.2)', () => {
  it('doubles exactly when an insert would pass load 0.5; deletes by backward shift', () => {
    const t = createOwnerTable(16);
    for (let k = 0; k < 8; k++) ownerSet(t, k * 7, k);
    expect(t.head.length).toBe(16);
    ownerSet(t, 56, 8);
    expect(t.head.length).toBe(32);
    for (let k = 0; k <= 8; k++) expect(ownerGet(t, k * 7)).toBe(k);
    expect(ownerDelete(t, 14)).toBe(true);
    expect(ownerDelete(t, 14)).toBe(false);
    expect(ownerGet(t, 14)).toBe(-1);
    expect(t.count).toBe(8);
    expect(() => ownerSet(t, 1, -1)).toThrow(/face slot/);
    expect(() => createOwnerTable(12)).toThrow(/power of two/);
    checkOwner(t);
  });

  it('agrees with a Map over 2 · 10⁵ random operations', () => {
    const rnd = generator(0x0a03);
    const t = createOwnerTable();
    const ref = new Map<number, number>();
    for (let op = 0; op < 200_000; op++) {
      const o = Math.floor(rnd() * 2000);
      const r = rnd();
      if (r < 0.45) {
        const v = Math.floor(rnd() * 1e6);
        ownerSet(t, o, v);
        ref.set(o, v);
      } else if (r < 0.75) {
        expect(ownerDelete(t, o)).toBe(ref.delete(o));
      } else {
        expect(ownerGet(t, o)).toBe(ref.get(o) ?? -1);
      }
      expect(t.count).toBe(ref.size);
      if ((op & 0xffff) === 0) checkOwner(t);
    }
    checkOwner(t);
  }, TIMEOUT);
});

describe('the fixed integer hashes', () => {
  it('are fixed functions of the key words (values pinned) and spread a dense key range over a table', () => {
    expect(mix32(0)).toBe(0);
    expect(mix32(1)).toBe(0x514e28b7);
    expect(hash2(0, 0)).toBe(0xa8abffde);
    expect([hash1(1), hash2(1, 65536)]).toEqual([0xb899c278, 0xfef530e7]);
    const mask = 1023;
    const used = new Set<number>();
    for (let k = 0; k < 512; k++) used.add(hash2(k, 0) & mask);
    expect(used.size).toBeGreaterThan(350); // a random function would occupy ≈ 404 of 1024 for 512 keys
  });
});
