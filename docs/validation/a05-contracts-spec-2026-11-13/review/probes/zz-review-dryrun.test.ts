// zz REVIEW PROBE (mirror only; the adversarial review of the contracts round): the prototype dryRun against a rejected
// batch, bit for bit; RL13's field on a constructed branching refusal.
import { describe, expect, it } from 'vitest';
import { createKernel } from '../../src/facade/index.js';
import { insertChain, splitThrough } from '../../src/insert/index.js';
import { err } from '../../src/num/index.js';
import { restoreGeneration, tx } from '../../src/tx/index.js';
import { dryRun } from '../../src/tx/tx.js';
import { undoTally, setUndoTally } from '../../src/tx/frames.js';
import { between, bits, commit, framed, must, pt, spec, state } from './support.js';

function spined() {
  const p = framed();
  commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
  return p;
}

describe('zz review: dryRun = a rejected batch, bit for bit', () => {
  it('two splits on one way edge, then everything undone: bits, generation, version, slots equal to a rejected batch\'s', () => {
    const a = spined();
    const b = spined();
    expect(bits(a)).toBe(bits(b));
    const before = bits(a);
    const gen = restoreGeneration(a);
    setUndoTally(true);
    const t0 = undoTally();
    const plan: number[][] = [];
    const ra = tx(a, spec(1), (o) => {
      const v1 = must(splitThrough(o, between(a, [0, 2000], [4000, 2000]), pt(1500, 2000)));
      const v2 = must(splitThrough(o, between(a, [1500, 2000], [4000, 2000]), pt(1540, 2000)));
      plan.push([v1, v2]);
      return err('E_INVARIANT', 'the plan (a batch always rejected)');
    });
    expect(ra.ok).toBe(false);
    const t1 = JSON.stringify(undoTally());
    const dplan: number[][] = [];
    const rb = dryRun(b, spec(1), (o) => {
      const v1 = must(splitThrough(o, between(b, [0, 2000], [4000, 2000]), pt(1500, 2000)));
      const v2 = must(splitThrough(o, between(b, [1500, 2000], [4000, 2000]), pt(1540, 2000)));
      dplan.push([v1, v2]);
      return { ok: true as const, value: [v1, v2], warnings: [] };
    });
    expect(rb.ok).toBe(true);
    console.log('undo tally', JSON.stringify(t0), t1, JSON.stringify(undoTally()));
    expect(dplan).toEqual(plan);
    expect(bits(a)).toBe(before);
    expect(bits(b)).toBe(bits(a));
    expect(restoreGeneration(b)).toBe(gen);
    expect(b.version).toBe(a.version);
    // the next committed batch takes the same slots on both
    const ca = commit(a, 1, (o) => splitThrough(o, between(a, [0, 2000], [4000, 2000]), pt(1500, 2000)));
    const cb = commit(b, 1, (o) => splitThrough(o, between(b, [0, 2000], [4000, 2000]), pt(1500, 2000)));
    expect(cb.value).toBe(ca.value);
    expect(bits(b)).toBe(bits(a));
    setUndoTally(false);
  });

  it('a per-split plan of the second crossing on the untouched arena differs from the sequence (the dependence the draft names)', () => {
    const a = spined();
    // the sequence: 1500 then 1540 (40 cm on: within 2 · TOUCH_CM of the first gate's vertex, a gate would snap; a split lands)
    let seq: [number, number][] = [];
    dryRun(a, spec(1), (o) => {
      const v1 = must(splitThrough(o, between(a, [0, 2000], [4000, 2000]), pt(1500, 2000)));
      const v2 = must(splitThrough(o, between(a, [1500, 2000], [4000, 2000]), pt(1530, 2000)));
      seq = [[a.vertices.x[v1], a.vertices.y[v1]], [a.vertices.x[v2], a.vertices.y[v2]]];
      return { ok: true as const, value: null, warnings: [] };
    });
    let iso: [number, number] = [0, 0];
    dryRun(a, spec(1), (o) => {
      const v2 = must(splitThrough(o, between(a, [0, 2000], [4000, 2000]), pt(1530, 2000)));
      iso = [a.vertices.x[v2], a.vertices.y[v2]];
      return { ok: true as const, value: null, warnings: [] };
    });
    console.log('sequence', JSON.stringify(seq), 'isolated second', JSON.stringify(iso));
  });

  it('a dry run inside an open batch on the arena throws; work limit; a throw undone', () => {
    const a = spined();
    const before = bits(a);
    expect(() => commit(a, 1, (o) => {
      dryRun(a, spec(1), () => ({ ok: true as const, value: null, warnings: [] }));
      return splitThrough(o, between(a, [0, 2000], [4000, 2000]), pt(1500, 2000));
    })).toThrow(/another batch is open on this arena/);
    expect(bits(a)).toBe(before);
    const w = dryRun(a, spec(1, { workLimit: 0 }), (o) => {
      const r = splitThrough(o, between(a, [0, 2000], [4000, 2000]), pt(1500, 2000));
      return r.ok ? { ok: true as const, value: r.value, warnings: [] } : r;
    });
    console.log('work limit 0:', JSON.stringify(w));
    expect(bits(a)).toBe(before);
    expect(() => dryRun(a, spec(1), (o) => {
      must(splitThrough(o, between(a, [0, 2000], [4000, 2000]), pt(1500, 2000)));
      throw new Error('boom');
    })).toThrow(/^tx 8\/L1\/dry\/fn: boom/);
    expect(bits(a)).toBe(before);
  });

  it('through the façade: no tx watcher sees a dry run; onCommit never called; a spread wrapper passes dryRun to the inner kernel', () => {
    const a = spined();
    let commits = 0;
    const k = createKernel(new Map([[{ layer: 'ground', part: 0 }, a]]), { env: { onCommit: () => { commits += 1; } } });
    const seen: string[] = [];
    const watched = Object.freeze({ ...k, tx: ((s: never, f: never) => { seen.push('tx'); return k.tx(s, f); }) as typeof k.tx });
    const before = state(a);
    const r = watched.dryRun(spec(1), (o) => k.geom.splitThrough(o, between(a, [0, 2000], [4000, 2000]), pt(1500, 2000)));
    expect(r.ok).toBe(true);
    expect(seen).toEqual([]);
    expect(commits).toBe(0);
    expect(state(a)).toBe(before);
  });

  it('RL13: a way that branches at commit is refused with the key it prints; a callback refusal carries no key', () => {
    const a = spined();
    const r = tx(a, spec(1), (o) => insertChain(o, [pt(2000, 2000), pt(2000, 3500)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    console.log('branch refusal', JSON.stringify(r));
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.detail).toBe('(way, way:1) branches: a linear role forms simple chains or rings (§3.10 role consistency)');
      expect((r as { refused?: unknown }).refused).toEqual({ role: 'way', entity: 'way:1', ordinal: 0 });
    }
    const c = tx(a, spec(1), () => err('E_INVARIANT', '(shore, water:river:0) branches (planted)'));
    expect('refused' in c).toBe(false);
  });

  it('M6 (the façade member without within): a façade writer still accepts the module dry run\'s overlay; its value stays CURRENT after; a resolve inside reads current after', () => {
    const a = spined();
    const key = { layer: 'ground', part: 0 } as const;
    const k = createKernel(new Map([[key, a]]));
    // M6: the module dryRun, the façade's writer inside, no `within`
    let wv: object | null = null;
    const m6 = dryRun(a, spec(1), (o) => {
      const r = k.geom.splitThrough(o, between(a, [0, 2000], [4000, 2000]), pt(1500, 2000));
      wv = r;
      return r;
    });
    console.log('M6 split ok:', m6.ok);
    let m6Current = true;
    try { k.assertCurrent(wv, key); } catch { m6Current = false; }
    console.log('M6 writer value reads current after the dry run:', m6Current);
    // the prototype member (with within): the writer value is restamped -1; a resolve made inside is not
    let wv2: object | null = null;
    let res: object | null = null;
    const ok2 = k.dryRun(spec(1), (o) => {
      const r = k.geom.splitThrough(o, between(a, [0, 2000], [4000, 2000]), pt(1500, 2000));
      wv2 = r;
      res = k.resolve({ role: 'way', entity: 'way:1' }, key);
      return r;
    });
    let wvCurrent = true;
    try { k.assertCurrent(wv2, key); } catch { wvCurrent = false; }
    let resCurrent = true;
    try { k.assertCurrent(res, key); } catch { resCurrent = false; }
    let rCurrent = true;
    try { k.assertCurrent(ok2, key); } catch { rCurrent = false; }
    console.log('member: writer value current after:', wvCurrent, '; resolve made inside current after:', resCurrent, JSON.stringify((res as unknown as { runs: number[][] }).runs), '; result current after:', rCurrent);
  });
});
