// M0-d-08: the negative control of permutationCompare itself (check M0-d-08 B-1). The kernel applies a declared
// batch's ops in canonical order (§3.3 *Two op forms*), so on the true kernel every permutation gives the issued
// order's outcome. Here `@plat/kernel`'s `tx` is wrapped so that, while the fault is on, a declared batch of two ops or
// more runs its ops in the order given — the issue order, the fault of a kernel without the canonical sort — and
// permutationCompare must then report the divergence and name the batch. The same file runs the true kernel (fault
// off) through the same calls, which must pass: the control and its twin. The same wrapper plants a fault in the
// reversal alone (N-10: the first diverging order is the one reported) and records the op orders tx receives (N-11:
// the random orders differ from one another).
import { describe, expect, it, vi } from 'vitest';
import type * as Kernel from '@plat/kernel';
import { permutationCompare } from '@plat/testkit';
import { CROWDED, crowdedSequence } from './support.js';

const fault = vi.hoisted(() => ({ on: false, declared: 0, reversedOnly: false, orders: null as number[][] | null }));

vi.mock('@plat/kernel', async (importOriginal) => {
  const k = await importOriginal<typeof Kernel>();
  const tx: typeof k.tx = (p, spec, fn, env) => {
    if (fn === undefined && spec.ops.length >= 2) fault.orders?.push(spec.ops.map((o) => o.lineage[1]));
    if (!fault.on || fn !== undefined || spec.ops.length < 2) return k.tx(p, spec, fn, env);
    // The reversal-only fault (N-10): the issue order applies only to the batch issued in exactly the reverse of its
    // lineage order (the crowded batches' lineage keys' low words are their chains' indices 0 … n − 1).
    if (fault.reversedOnly && !spec.ops.every((o, i) => i === 0 || o.lineage[1] < spec.ops[i - 1].lineage[1])) return k.tx(p, spec, fn, env);
    fault.declared++;
    const ops = spec.ops;
    // The declared ops applied one after another in the order given (no canonical sort).
    return k.tx(p, { ...spec, ops: [] }, (o) => {
      for (const op of ops) {
        const r = op.apply(o);
        if (!r.ok) return r as never;
      }
      return { ok: true, value: null, warnings: [] } as never;
    }, env);
  };
  return { ...k, tx };
});

// The bars run every fixture through several runs each: more than vitest's default 5 s per test.
vi.setConfig({ testTimeout: 180_000 });

describe('permutationCompare reports a declared batch whose result follows the order its ops were issued in', () => {
  it('the true kernel (canonical order): the crowded declared batches are identical under every permutation', () => {
    fault.on = false;
    fault.declared = 0;
    for (const s of CROWDED) {
      const r = permutationCompare(s, { count: 8 });
      expect(r.divergence, s.name).toBeNull();
      expect(r.identical).toBe(true);
    }
    expect(fault.declared).toBe(0);
  });

  it('a kernel applying declared ops in issue order: permutationCompare finds the divergence and names the batch', () => {
    fault.on = true;
    fault.declared = 0;
    let caught = 0;
    try {
      for (const s of CROWDED) {
        const r = permutationCompare(s, { count: 8 });
        expect(r.permutable).toBe(1);
        if (r.identical) continue;
        caught++;
        expect(r.divergence).not.toBeNull();
        expect(r.divergence?.batch).toBe('declared L1 crowded chains');
        expect(r.divergence?.run.startsWith(`${s.name} (ops `)).toBe(true);
        expect(r.divergence?.expected).not.toBe(r.divergence?.actual);
      }
    } finally {
      fault.on = false;
    }
    // the wrapper was in the harness's path (the mock reaches @plat/testkit's own import of the kernel)
    expect(fault.declared).toBeGreaterThan(0);
    expect(caught).toBeGreaterThanOrEqual(5);
  });

  it('a fault in the reversal alone: the first diverging order is reported, though every later order agrees (hardening round S1, N-10)', () => {
    fault.on = true;
    fault.reversedOnly = true;
    fault.declared = 0;
    let caught = 0;
    try {
      for (const s of CROWDED) {
        const r = permutationCompare(s, { count: 3 });
        if (r.identical) continue;
        caught++;
        // the reversal runs first and the random orders after it agree with the issued order: the report keeps the
        // reversal's divergence (a report of the last order alone would read identical)
        expect(r.divergence?.run, s.name).toBe(`${s.name} (ops reversed)`);
        expect(r.divergence?.batch).toBe('declared L1 crowded chains');
      }
    } finally {
      fault.on = false;
      fault.reversedOnly = false;
    }
    // only the reversal met the fault: one faulty application per crowded batch
    expect(fault.declared).toBe(CROWDED.length);
    expect(caught).toBeGreaterThanOrEqual(3);
  });

  it('the random orders are pairwise distinct, and distinct from the issued order and its reversal (hardening round S1, N-11)', () => {
    const s = crowdedSequence(6, 16);
    fault.orders = [];
    try {
      const r = permutationCompare(s, { count: 8 });
      expect(r.identical).toBe(true);
    } finally {
      // the declared batch's op orders as tx received them: the issued run, the count pass, the reversal, 8 random
      const orders = (fault.orders ?? []).map((o) => o.join(','));
      fault.orders = null;
      expect(orders).toHaveLength(11);
      const issued = Array.from({ length: 16 }, (_, i) => i).join(',');
      expect(orders.slice(0, 2)).toEqual([issued, issued]);
      expect(orders[2]).toBe(Array.from({ length: 16 }, (_, i) => 15 - i).join(','));
      const random = orders.slice(3);
      expect(new Set(random).size).toBe(8);
      for (const o of random) expect([issued, orders[2]]).not.toContain(o);
    }
  });
});
