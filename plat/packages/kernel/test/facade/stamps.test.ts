// M0-a-16's slot-stamp tests (M0-work.json builds: "slot stamping of every result (key, version) in the debug build";
// §3.4 *Arenas, keys and services*: every slot a caller holds comes from a result stamped with its ArenaKey and arena
// version, valid until that arena's next commit, and a debug build asserts the key and the version wherever the slot is
// passed; §3.11 "a stale or foreign slot: a debug-build assertion, never a silent read"; readings C-0219 (3)).
import { afterEach, describe, expect, it } from 'vitest';
import { setDebugAssertions } from '../../src/arena/index.js';
import { stampOf } from '../../src/facade/index.js';
import type { KernelResult } from '../../src/num/index.js';
import { emptyOn, framed, GROUND, kernelOver, pt, RAISED, spec } from './support.js';

const WAY = [{ role: 'way', entity: 'way:1' }];
const okv = <T>(value: T): KernelResult<T> => ({ ok: true, value, warnings: [] });

afterEach(() => setDebugAssertions(true));

describe('every façade result is stamped with its arena\'s key and version (the debug build)', () => {
  it('a commit is stamped at the version it committed; an op\'s result inside the batch is re-stamped to it', () => {
    const p = framed();
    const k = kernelOver([p]);
    const v0 = p.version;
    let inside: unknown = null;
    let stampInside: unknown = null;
    const r = k.tx(spec(1), (o) => {
      const ins = k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], WAY, 'mandatory');
      inside = ins;
      stampInside = stampOf(ins);
      // current inside the batch: the arena's version as the batch found it
      k.assertCurrent(ins, GROUND);
      return ins;
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.record?.version).toBe(v0 + 1);
    expect(p.version).toBe(v0 + 1);
    expect(stampInside).toEqual({ key: GROUND, version: v0 });
    expect(stampOf(r)).toEqual({ key: GROUND, version: v0 + 1 });
    expect(stampOf(r.value)).toEqual({ key: GROUND, version: v0 + 1 });
    // the batch's own values are current at the version it committed (ChainInsert.placed, §3.4)
    expect(stampOf(inside)).toEqual({ key: GROUND, version: v0 + 1 });
    k.assertCurrent(inside, GROUND);
    k.assertCurrent(r);
    k.assertCurrent(r.value.record);
  });

  it('after the next commit every earlier value is stale: assertCurrent throws, naming both versions', () => {
    const p = framed();
    const k = kernelOver([p]);
    const a = k.tx(spec(1), (o) => k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], WAY, 'mandatory'));
    const res = k.resolve({ role: 'way', entity: 'way:1' }, GROUND);
    const q = k.index.query(GROUND, 1, { minX: 0, minY: 0, maxX: 4000, maxY: 4000 });
    k.assertCurrent(a);
    k.assertCurrent(res);
    k.assertCurrent(q, GROUND);
    k.tx(spec(1), (o) => k.geom.insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    for (const stale of [a, res, q]) expect(() => k.assertCurrent(stale, GROUND)).toThrow(/a stale slot: stamped at version 1, arena ground\/0 is at version 2/);
    expect(() => k.assertCurrent(a)).toThrow(/stale/);
  });

  it('a value of another arena is foreign: assertCurrent against this arena\'s key throws', () => {
    const p = framed();
    const q = emptyOn(RAISED);
    const k = kernelOver([p, q]);
    const res = k.resolve({ role: 'margin', entity: 'terrain:1' }, GROUND);
    expect(() => k.assertCurrent(res, RAISED)).toThrow(/stamped for arena ground\/0 was passed to arena ground\/1/);
    k.assertCurrent(res, GROUND);
    k.assertCurrent(res);
  });

  it('a rejected batch\'s values are never current: the arena kept its version, the slots name nothing', () => {
    const p = framed();
    const k = kernelOver([p]);
    const v0 = p.version;
    let inside: unknown = null;
    const r = k.tx(spec(1), (o) => {
      inside = k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], WAY, 'mandatory');
      return { ok: false, code: 'E_INVARIANT', detail: 'refused by the stage' };
    });
    expect(r.ok).toBe(false);
    expect(p.version).toBe(v0);
    expect(stampOf(inside)).toEqual({ key: GROUND, version: -1 });
    expect(() => k.assertCurrent(inside, GROUND)).toThrow(/stale/);
    // the refusal itself is stamped at the version the arena kept
    expect(stampOf(r)).toEqual({ key: GROUND, version: v0 });
  });

  it('a batch that throws (a programming error) leaves its values never current too', () => {
    const p = framed();
    const k = kernelOver([p]);
    let inside: unknown = null;
    expect(() =>
      k.tx(spec(1), (o) => {
        inside = k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], WAY, 'mandatory');
        throw new Error('boom');
      }),
    ).toThrow('boom');
    expect(stampOf(inside)?.version).toBe(-1);
  });

  it('a declared batch\'s op results are stamped and re-stamped at the commit', () => {
    const p = framed();
    const k = kernelOver([p]);
    const seen: unknown[] = [];
    const op = {
      kind: 'insertChain' as const,
      lineage: [1, 0] as [number, number],
      index: 0,
      apply: (o: Parameters<typeof k.geom.insertChain>[0]) => {
        const r = k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], WAY, 'mandatory');
        seen.push(r);
        return r;
      },
    };
    const r = k.tx(spec(1, { ops: [op] }));
    expect(r.ok).toBe(true);
    expect(seen).toHaveLength(1);
    expect(stampOf(seen[0])).toEqual({ key: GROUND, version: p.version });
  });

  it('a view asserts its own stamp on every read: taken before a commit, it is stale after it', () => {
    const p = framed();
    const k = kernelOver([p]);
    const v = k.view(GROUND, 1);
    // the frame's L0 face is its own child at L1: no L1 record yet (§2.2 rule 2)
    expect(v.faces()).toHaveLength(0);
    expect(v.pointLocate(pt(10, 10))).toMatchObject({ on: 'face', level: 0 });
    k.tx(spec(1), (o) => k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], WAY, 'mandatory'));
    expect(() => v.faces()).toThrow(/stale/);
    expect(() => v.rings(0)).toThrow(/stale/);
    expect(() => v.owner(0)).toThrow(/stale/);
    expect(() => v.query({ minX: 0, minY: 0, maxX: 10, maxY: 10 })).toThrow(/stale/);
    expect(() => v.pointLocate(pt(10, 10))).toThrow(/stale/);
    expect(() => v.neighbours(0)).toThrow(/stale/);
    expect(k.view(GROUND, 1).faces()).toHaveLength(2);
  });

  it('an unstamped value, or one stamped for no arena of this kernel, asserts', () => {
    const p = framed();
    const k = kernelOver([p]);
    expect(() => k.assertCurrent({}, GROUND)).toThrow(/carries no stamp/);
    expect(() => k.assertCurrent(7)).toThrow(/stamped for no arena/);
    expect(() => k.assertCurrent({ key: RAISED, version: 0 })).toThrow(/stamped for no arena/);
    expect(stampOf(7)).toBeUndefined();
    expect(stampOf(null)).toBeUndefined();
  });
});

describe('a production build stamps nothing and asserts nothing', () => {
  it('with the debug assertions off: no side-table stamp, assertCurrent and a stale view read are no-ops', () => {
    setDebugAssertions(false);
    const p = framed();
    const k = kernelOver([p]);
    const v = k.view(GROUND, 1);
    let inside: unknown = null;
    const r = k.tx(spec(1), (o) => {
      inside = k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], WAY, 'mandatory');
      return okv(inside);
    });
    expect(r.ok).toBe(true);
    expect(stampOf(r)).toBeUndefined();
    expect(stampOf(inside)).toBeUndefined();
    expect(() => k.assertCurrent(r, GROUND)).not.toThrow();
    expect(() => k.assertCurrent({}, GROUND)).not.toThrow();
    // the stale view still reads (no assertion): the live arena's faces
    expect(v.faces()).toHaveLength(2);
    // values that carry their stamp inline keep it in every build
    expect(stampOf(k.resolve({ role: 'way', entity: 'way:1' }, GROUND))).toEqual({ key: GROUND, version: p.version });
  });
});
