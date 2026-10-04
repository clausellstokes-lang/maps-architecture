// M0-a-02: the interned-handle table (§2.1 Ids) — an address id ↔ u32 handle, handles in interning order and never
// reused, a lookup that never interns, and the id order rule 7 reads sets in (never the handle's value).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { compareHandleIds, compareKeys, createHandleTable, handleOfId, idOfHandle, internId } from '../../src/arena/index.js';
import { hashId } from '../../src/arena/handles.js';

/** The hard timeout of a property at PLAT_FUZZ_RUNS on the shared machine (M0-a-01's convention); never a timing. */
const TIMEOUT = 600_000;

describe('the interned-handle table (§2.1)', () => {
  it('interns ids as handles 0, 1, 2 … in order; interning again returns the same handle; lookups never intern', () => {
    const t = createHandleTable(2, 4);
    expect(handleOfId(t, 'way:1')).toBe(-1);
    expect(t.count).toBe(0);
    expect(internId(t, 'way:1')).toBe(0);
    expect(internId(t, 'district:a')).toBe(1);
    expect(internId(t, 'way:1')).toBe(0);
    expect(internId(t, 'under3/chamber:é∂')).toBe(2);
    expect(t.count).toBe(3);
    expect(handleOfId(t, 'district:a')).toBe(1);
    expect(handleOfId(t, 'district:b')).toBe(-1);
    expect(t.count).toBe(3);
    expect([0, 1, 2].map((h) => idOfHandle(t, h))).toEqual(['way:1', 'district:a', 'under3/chamber:é∂']);
    expect(() => idOfHandle(t, 3)).toThrow(/no handle 3/);
    expect(() => internId(t, '')).toThrow(/non-empty/);
  });

  it('round-trips 20 000 ids through growth of every column (units, offsets, index)', () => {
    const t = createHandleTable(1, 1);
    const ids = Array.from({ length: 20_000 }, (_, i) => `plot:${(i * 7919).toString(36)}-${'x'.repeat(i % 13)}`);
    ids.forEach((id, i) => expect(internId(t, id)).toBe(i));
    ids.forEach((id, i) => {
      expect(handleOfId(t, id)).toBe(i);
      expect(idOfHandle(t, i)).toBe(id);
    });
    expect(t.slots.length & (t.slots.length - 1)).toBe(0);
    expect(t.count * 2).toBeLessThanOrEqual(t.slots.length);
  });

  it('keeps its index at load ≤ 0.5 as it grows, and refuses to probe a full index rather than loop', () => {
    const t = createHandleTable(1, 1);
    for (let i = 0; i < 1000; i++) {
      internId(t, `id:${i}`);
      expect(t.count * 2).toBeLessThanOrEqual(t.slots.length);
    }
    const full = createHandleTable(8);
    for (let i = 0; i < 8; i++) internId(full, `x${i}`);
    full.slots.fill(0);
    expect(() => handleOfId(full, 'absent')).toThrow(/full/);
  });

  it('tells apart ids that share a hash bucket and ids that are prefixes of one another', () => {
    const t = createHandleTable();
    const a = internId(t, 'ab');
    const b = internId(t, 'abc');
    const c = internId(t, 'a');
    expect(new Set([a, b, c]).size).toBe(3);
    expect(handleOfId(t, 'abc')).toBe(b);
    expect(handleOfId(t, 'abd')).toBe(-1);
  });

  it('orders handles by their ids (code units; a prefix first), whatever order they were interned in', () => {
    fc.assert(
      fc.property(fc.uniqueArray(fc.string({ minLength: 1, maxLength: 6 }), { minLength: 1, maxLength: 30 }), (ids) => {
        const t = createHandleTable();
        const hs = ids.map((id) => internId(t, id));
        const byHandle = [...hs].sort((x, y) => compareHandleIds(t, x, y)).map((h) => idOfHandle(t, h));
        expect(byHandle).toEqual([...ids].sort(compareKeys));
        const signs = (f: (x: number, y: number) => number) => hs.map((x) => hs.map((y) => Math.sign(f(x, y))).join(',')).join(';');
        expect(signs((x, y) => compareHandleIds(t, x, y))).toBe(signs((x, y) => compareKeys(ids[x], ids[y])));
      }),
    );
  }, TIMEOUT);

  it('hashes an id by a fixed function of its code units', () => {
    expect(hashId('way:1')).toBe(hashId('way:1'));
    expect(hashId('way:1')).not.toBe(hashId('way:2'));
    // FNV-1a of "a" is 0xe40c292c; its 32-bit finaliser, computed outside the code under test, is 444641715
    expect(hashId('a')).toBe(444641715);
  });
});
