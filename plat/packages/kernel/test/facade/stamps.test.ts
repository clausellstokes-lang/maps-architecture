// M0-a-16's slot-stamp tests (M0-work.json builds: "slot stamping of every result (key, version) in the debug build";
// §3.4 *Arenas, keys and services*: every slot a caller holds comes from a result stamped with its ArenaKey and arena
// version, valid until that arena's next commit, and a debug build asserts the key and the version wherever the slot is
// passed; §3.11 "a stale or foreign slot: a debug-build assertion, never a silent read"; readings C-0220 (3)).
import { afterEach, describe, expect, it } from 'vitest';
import { assertStamp, setDebugAssertions, type Plat, type Stamp } from '../../src/arena/index.js';
import { stampOf, type Kernel } from '../../src/facade/index.js';
import { stampWith } from '../../src/facade/stamp.js';
import type { KernelResult } from '../../src/num/index.js';
import { restoreGeneration, restoreSavepoint, takeSavepoint } from '../../src/tx/index.js';
import { crossing, emptyOn, framed, GROUND, kernelOver, pt, RAISED, spec } from './support.js';

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

// The restore generation (C-0299 (2), C-0313 (5)(a), C-0317): a savepoint put back across committed batches sets the
// version back, so a value read inside the rolled-back commits reaches its version again after as many later commits.
// The façade's stamps carry the arena's restore generation (written only when not 0, absent reading 0) and
// assertStamped asserts the key, then the generation (the arena's message form), then the version: such a value is
// never current again.
describe('Q38: the façade\'s stamps carry the restore generation (the debug build; C-0313 (1), C-0317)', () => {
  const genMsg = (v: number, g: number, at: number, ag: number): string =>
    `a stale slot: stamped at version ${String(v)} in restore generation ${String(g)}, arena ground/0 is at version ${String(at)} in restore generation ${String(ag)}`;
  const way = (n: number) => [{ role: 'way', entity: `way:${String(n)}` }];
  const BOX = { minX: 0, minY: 0, maxX: 4000, maxY: 4000 };

  /** Commits one chain through the façade; the commit is a precondition. */
  function commitChain(k: Kernel, n: number, a: [number, number], b: [number, number]): void {
    const r = k.tx(spec(1), (o) => k.geom.insertChain(o, [pt(a[0], a[1]), pt(b[0], b[1])], way(n), 'mandatory'));
    expect(r.ok).toBe(true);
  }

  /** Puts a savepoint back across one committed batch: the arena keeps its version and moves its generation by one. */
  function restoreAcrossOne(k: Kernel, p: Plat, n: number): void {
    const v0 = p.version;
    const g0 = restoreGeneration(p);
    const image = takeSavepoint(p);
    commitChain(k, n, [0, 3000], [4000, 3000]);
    restoreSavepoint(image);
    expect(p.version).toBe(v0);
    expect(restoreGeneration(p)).toBe(g0 + 1);
  }

  it('probe P4: a Resolved read in (or after) a rolled-back commit fails assertCurrent after the restore and one more commit', () => {
    const p = framed();
    const k = kernelOver([p]);
    const v0 = p.version;
    const image = takeSavepoint(p);
    let inside: unknown = null;
    const a = k.tx(spec(1), (o) => {
      const r = k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], way(1), 'mandatory');
      inside = k.resolve({ role: 'margin', entity: 'terrain:1' }, GROUND);
      return r;
    });
    expect(a.ok).toBe(true);
    const res = k.resolve({ role: 'way', entity: 'way:1' }, GROUND);
    // generation 0: the shape it always had (no generation field)
    expect(stampOf(res)).toEqual({ key: GROUND, version: v0 + 1 });
    k.assertCurrent(res, GROUND);
    restoreSavepoint(image);
    expect(restoreGeneration(p)).toBe(1);
    commitChain(k, 2, [2000, 0], [2000, 4000]);
    // the version the rolled-back reads were stamped at is reached again: the generation names them stale
    expect(p.version).toBe(v0 + 1);
    expect(() => k.assertCurrent(res, GROUND)).toThrow(genMsg(v0 + 1, 0, v0 + 1, 1));
    expect(() => k.assertCurrent(res)).toThrow(genMsg(v0 + 1, 0, v0 + 1, 1));
    expect(() => k.assertCurrent(inside, GROUND)).toThrow(genMsg(v0, 0, v0 + 1, 1));
    // the arena's own assertion agrees on the same value (one law, C-0313 (1))
    expect(() => assertStamp(p, res as Stamp)).toThrow(/in restore generation 0, arena ground\/0 is at version \d+ in restore generation 1/);
    // a read after the restore carries generation 1 and is current until the next commit
    const now = k.resolve({ role: 'way', entity: 'way:2' }, GROUND);
    expect(stampOf(now)).toEqual({ key: GROUND, version: v0 + 1, generation: 1 });
    k.assertCurrent(now, GROUND);
    commitChain(k, 3, [0, 1000], [4000, 1000]);
    expect(() => k.assertCurrent(now, GROUND)).toThrow(`a stale slot: stamped at version ${String(v0 + 1)}, arena ground/0 is at version ${String(v0 + 2)}`);
  });

  it('a stampWith value keeps its stamp whole: a commit\'s re-stamped batch value is stale across the restore; a generation-1 stamp is current at 1 and stale at 2', () => {
    const p = framed();
    const k = kernelOver([p]);
    const v0 = p.version;
    const image = takeSavepoint(p);
    let batch: unknown = null;
    const a = k.tx(spec(1), (o) => (batch = k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], way(1), 'mandatory')) as KernelResult<unknown>);
    expect(a.ok).toBe(true);
    // the commit re-stamps the batch's values with stampWith (the arena's stamp at the commit)
    expect(stampOf(batch)).toEqual({ key: GROUND, version: v0 + 1 });
    restoreSavepoint(image);
    commitChain(k, 2, [2000, 0], [2000, 4000]);
    expect(() => k.assertCurrent(batch, GROUND)).toThrow(genMsg(v0 + 1, 0, v0 + 1, 1));
    // after the restore the commit's re-stamp carries the generation and is current
    let after: unknown = null;
    const b = k.tx(spec(1), (o) => (after = k.geom.insertChain(o, [pt(0, 1000), pt(4000, 1000)], way(3), 'mandatory')) as KernelResult<unknown>);
    expect(b.ok).toBe(true);
    expect(stampOf(after)).toEqual({ key: GROUND, version: v0 + 2, generation: 1 });
    k.assertCurrent(after, GROUND);
    // stampWith of a stamp carrying generation 1 stores it whole
    const v = stampWith({ key: GROUND, version: p.version, generation: 1 }, {});
    expect(stampOf(v)).toEqual({ key: GROUND, version: p.version, generation: 1 });
    k.assertCurrent(v, GROUND);
    restoreAcrossOne(k, p, 4);
    expect(() => k.assertCurrent(v, GROUND)).toThrow(genMsg(v0 + 2, 1, v0 + 2, 2));
  });

  it('an inline value carrying generation 1 is current on the arena at generation 1 and stale at generation 2; an absent one reads 0', () => {
    const p = framed();
    const k = kernelOver([p]);
    restoreAcrossOne(k, p, 1);
    const v = p.version;
    const inline = { key: { layer: 'ground', part: 0 }, version: v, generation: 1 };
    const absent = { key: { layer: 'ground', part: 0 }, version: v };
    expect(stampOf(inline)).toEqual({ key: GROUND, version: v, generation: 1 });
    expect(stampOf(absent)).toEqual({ key: GROUND, version: v });
    k.assertCurrent(inline, GROUND);
    k.assertCurrent(inline);
    // an inline stamp without a generation (M0-a-03's QueryResult / Location, M0-a-10's FaceNeighbours on this tree)
    // reads generation 0: loud after a restore, never a silent read
    expect(() => k.assertCurrent(absent, GROUND)).toThrow(genMsg(v, 0, v, 1));
    restoreAcrossOne(k, p, 2);
    expect(p.version).toBe(v);
    expect(() => k.assertCurrent(inline, GROUND)).toThrow(genMsg(v, 1, v, 2));
    // a generation that is no number is not read (absent: 0)
    expect(stampOf({ ...absent, generation: '2' })).toEqual({ key: GROUND, version: v });
  });

  it('every façade result read before the restore is stale after it at the coinciding version; read after, it is current (no false refusal)', () => {
    const p = framed();
    const k = kernelOver([p]);
    const image = takeSavepoint(p);
    const a = k.tx(spec(1), (o) => k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], way(1), 'mandatory'));
    expect(a.ok).toBe(true);
    if (!a.ok) return;
    const read = (): unknown[] => {
      const view = k.view(GROUND, 1);
      const faces = view.faces();
      expect(faces.length).toBeGreaterThan(0);
      return [
        k.resolve({ role: 'margin', entity: 'terrain:1' }, GROUND),
        k.index.query(GROUND, 1, BOX),
        k.index.pointLocate(GROUND, 1, pt(10, 10)),
        k.geom.pointLocate(GROUND, 1, pt(10, 10)),
        k.geom.faceNeighbours(GROUND, faces[0], 1),
        view,
        view.query(BOX),
        view.pointLocate(pt(10, 10)),
        view.neighbours(faces[0]),
      ];
    };
    const before = [a, a.value, a.value.record, ...read()];
    for (const x of before) {
      expect(stampOf(x)).not.toHaveProperty('generation');
      k.assertCurrent(x, GROUND);
    }
    const v1 = p.version;
    restoreSavepoint(image);
    const b = k.tx(spec(1), (o) => k.geom.insertChain(o, [pt(2000, 0), pt(2000, 4000)], way(2), 'mandatory'));
    expect(b.ok).toBe(true);
    if (!b.ok) return;
    expect(p.version).toBe(v1);
    for (const x of before) expect(() => k.assertCurrent(x, GROUND)).toThrow(/in restore generation 0, arena ground\/0 is at version \d+ in restore generation 1/);
    expect(() => (before[before.length - 4] as { faces(): unknown }).faces()).toThrow(/in restore generation 1/);
    const after = [b, b.value, b.value.record, ...read()];
    for (const x of after) {
      expect(stampOf(x)).toMatchObject({ key: GROUND, version: v1, generation: 1 });
      k.assertCurrent(x, GROUND);
      k.assertCurrent(x);
    }
  });

  it('a StretchRef\'s Resolved read after a restore carries the generation in the side table; its inline shape is unchanged', () => {
    const { p } = crossing();
    const k = kernelOver([p]);
    const s = { chain: { role: 'way', entity: 'way:1' }, from: pt(0, 2000), to: pt(2000, 2000) };
    const old = k.resolve(s, GROUND);
    const image = takeSavepoint(p);
    commitChain(k, 3, [100, 100], [500, 100]);
    restoreSavepoint(image);
    commitChain(k, 4, [100, 300], [500, 300]);
    const now = k.resolve(s, GROUND);
    expect(now).toEqual({ key: GROUND, version: p.version, view: 'edges', runs: (now as { runs: unknown }).runs });
    expect(now).not.toHaveProperty('generation');
    expect(stampOf(now)).toEqual({ key: GROUND, version: p.version, generation: 1 });
    k.assertCurrent(now, GROUND);
    expect(() => k.assertCurrent(old, GROUND)).toThrow(/stale slot/);
  });

  it('a production build: nothing is stamped in the side table and no shape gains a generation after a restore (ZERO SHIFT)', () => {
    setDebugAssertions(false);
    const p = framed();
    const k = kernelOver([p]);
    const image = takeSavepoint(p);
    const a = k.tx(spec(1), (o) => k.geom.insertChain(o, [pt(0, 2000), pt(4000, 2000)], way(1), 'mandatory'));
    const stale = k.index.query(GROUND, 1, BOX);
    restoreSavepoint(image);
    expect(restoreGeneration(p)).toBe(1);
    const b = k.tx(spec(1), (o) => k.geom.insertChain(o, [pt(2000, 0), pt(2000, 4000)], way(2), 'mandatory'));
    expect(a.ok && b.ok).toBe(true);
    const view = k.view(GROUND, 1);
    for (const x of [b, view, k.index.query(GROUND, 1, BOX), k.geom.pointLocate(GROUND, 1, pt(10, 10)), view.neighbours(view.faces()[0])]) {
      expect(x).not.toHaveProperty('generation');
    }
    expect(stampOf(b)).toBeUndefined();
    expect(stampOf(view)).toEqual({ key: GROUND, version: p.version });
    expect(() => k.assertCurrent(stale, GROUND)).not.toThrow();
  });
});
