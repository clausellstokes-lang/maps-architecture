// M0-d-08: the op-permutation harness (§13.1 "a declared batch's result identical under any permutation of its ops";
// §13.2 "a declared batch's ops permuted give the same result"; §3.3 *Two op forms*). permuteOps' contract, the bar on
// every declared-form fixture of M0-a-06 and M0-a-07, and the control: the same ops issued in callback form (issue
// order) give different results in two orders, and the harness's comparison sees it.
import { describe, expect, it, vi } from 'vitest';
import { canonicalOrder, opInsertChain, type KernelOp, type Overlay } from '@plat/kernel';
import {
  compareOutcomes,
  determinismPoint as lp,
  fixtureSpec,
  framedArena,
  permutationCompare,
  permutedSequence,
  permuteOps,
  runSequenceOutcomes,
  type DeterminismSequence,
} from '@plat/testkit';
import { CROWDED, crowdedSequence, KERNEL_SEQUENCES, partitionerSequence, SEQUENCE_DATA } from './support.js';

// The bars run every fixture through several runs each: more than vitest's default 5 s per test.
vi.setConfig({ testTimeout: 180_000 });

function ops(n: number): KernelOp[] {
  return Array.from({ length: n }, (_, i) => opInsertChain([i + 1, 0], i, [lp(100 * i, 0), lp(100 * i, 50)], [{ role: 'way', entity: `way:${i}` }], 'mandatory'));
}

describe('permuteOps(tx): the same transaction, its ops in another order', () => {
  it('keeps the op set and every other field; moves the order; is seeded', () => {
    const tx = fixtureSpec(2, { ops: ops(9), workLimit: 77 });
    const a = permuteOps(tx, 5);
    expect(a).not.toBe(tx);
    expect({ ...a, ops: [] }).toEqual({ ...tx, ops: [] });
    expect(new Set(a.ops)).toEqual(new Set(tx.ops));
    expect(a.ops).toHaveLength(9);
    expect(a.ops).not.toEqual(tx.ops);
    expect(permuteOps(tx, 5).ops).toEqual(a.ops);
    expect(permuteOps(tx, 6).ops).not.toEqual(a.ops);
    expect(tx.ops.map((o) => o.index)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(permuteOps(tx, 1, 'reverse').ops.map((o) => o.index)).toEqual([8, 7, 6, 5, 4, 3, 2, 1, 0]);
    // Over many seeds every op reaches every position (a real shuffle, not a rotation).
    const seen = new Set<string>();
    for (let s = 0; s < 400; s++) permuteOps(tx, s).ops.forEach((o, i) => seen.add(`${o.index}@${i}`));
    expect(seen.size).toBe(81);
    // The kernel's canonical order is the same for every permutation (§3.3).
    const canon = (t: typeof tx): number[] => canonicalOrder(t.ops).map((i) => t.ops[i].index);
    expect(canon(a)).toEqual(canon(tx));
  });

  it('a declared batch of one op is not counted as permutable (no order to move)', () => {
    const one: DeterminismSequence = {
      name: 'one declared op',
      arena: () => framedArena(0, 0, 4000, 4000),
      batches: [{ name: 'one op', build: () => ({ spec: fixtureSpec(1, { ops: ops(1) }) }) }],
    };
    const r = permutationCompare(one, { count: 2 });
    expect(r).toMatchObject({ permutable: 0, orders: 3, identical: true, divergence: null });
  });

  it('permutedSequence permutes only declared batches of two ops or more', () => {
    const seq = KERNEL_SEQUENCES[0];
    const p = permutedSequence(seq, 3);
    const arena = seq.arena();
    const first = p.batches[0].build(arena).spec.ops.map((o) => o.lineage[0]);
    expect(first.slice().sort()).toEqual([1, 2, 3, 4]);
    expect(first).not.toEqual([1, 2, 3, 4]);
    expect(p.batches[1].build(arena).fn).toBeDefined();
    expect(p.batches[1].build(arena).spec.ops).toEqual([]);
  });
});

describe('the bar: op permutation on every declared-form fixture of M0-a-06 and M0-a-07 gives identical results', () => {
  it('M0-a-06\'s batch fixtures (sequences.json): every declared batch, reversed and in 8 random orders', () => {
    const declared = SEQUENCE_DATA.flatMap((s) => s.batches.filter((b) => b.form === 'declared' && b.ops.length >= 2));
    expect(declared.length).toBeGreaterThanOrEqual(5);
    let permutable = 0;
    for (const s of KERNEL_SEQUENCES) {
      const r = permutationCompare(s, { count: 8 });
      expect(r.divergence, s.name).toBeNull();
      expect(r.identical).toBe(true);
      expect(r.orders).toBe(9);
      permutable += r.permutable;
    }
    expect(permutable).toBe(declared.length);
  });

  it('the fixtures\' preconditions hold: every batch ends as its `expect` says', () => {
    SEQUENCE_DATA.forEach((d, k) => {
      const out = runSequenceOutcomes(KERNEL_SEQUENCES[k]);
      d.batches.forEach((b, i) => {
        const first = out[i].print.split('\n', 1)[0];
        if (b.expect === 'commit') expect(first.startsWith('commit '), `${d.name} batch ${i}`).toBe(true);
        else expect(first, `${d.name} batch ${i}`).toBe(`refused ${b.expect.slice('refuse:'.length)}`);
      });
    });
  });

  it('crowded ends (attraction, the order-sensitive rule): six declared batches of 6 – 16 chains, 24 orders each', () => {
    for (const s of CROWDED) {
      const r = permutationCompare(s, { count: 24 });
      expect(r.divergence, s.name).toBeNull();
      expect(r.permutable).toBe(1);
      expect(runSequenceOutcomes(s)[0].print.startsWith('commit ')).toBe(true);
    }
  });

  it('M0-a-07\'s partitioners as declared ops: splitFace, radialSplit, ringBand, claimSubFace; mergeFaces with splitFace', () => {
    const s = partitionerSequence();
    const out = runSequenceOutcomes(s);
    for (const o of out) expect(o.print.startsWith('commit '), o.batch).toBe(true);
    const r = permutationCompare(s, { count: 23 });
    expect(r.divergence).toBeNull();
    expect(r.permutable).toBe(2);
  });
});

describe('the control: order is observable where the form is not declared', () => {
  /** The crowded ops issued one after another in a callback (issue order), in the order given. */
  function issued(seed: number, n: number, reverse: boolean): DeterminismSequence {
    const base = crowdedSequence(seed, n);
    return {
      name: `${base.name} issued${reverse ? ' reversed' : ''}`,
      arena: () => framedArena(0, 0, 4000, 4000),
      batches: [
        {
          name: 'callback L1 crowded chains',
          build: (p) => {
            const list = base.batches[0].build(p).spec.ops;
            const order = reverse ? list.slice().reverse() : list;
            return {
              spec: fixtureSpec(1),
              fn: (o: Overlay) => {
                for (const op of order) {
                  const r = op.apply(o);
                  if (!r.ok) return r;
                }
                return { ok: true, value: null, warnings: [] };
              },
            };
          },
        },
      ],
    };
  }

  it('issued in two orders the crowded chains land differently, and compareOutcomes names the batch', () => {
    let seen = 0;
    for (const [seed, n] of [[1, 6], [2, 8], [3, 10], [4, 12], [5, 14], [6, 16]] as const) {
      const d = compareOutcomes('reversed issue', runSequenceOutcomes(issued(seed, n, false)), runSequenceOutcomes(issued(seed, n, true)));
      if (d !== null) {
        seen++;
        expect(d.batch).toBe('callback L1 crowded chains');
        expect(d.expected).not.toBe(d.actual);
      }
    }
    expect(seen).toBeGreaterThanOrEqual(3);
  });
});
