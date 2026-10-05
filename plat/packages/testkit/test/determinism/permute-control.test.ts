// M0-d-08: the negative control of permutationCompare itself (check M0-d-08 B-1). The kernel applies a declared
// batch's ops in canonical order (§3.3 *Two op forms*), so on the true kernel every permutation gives the issued
// order's outcome. Here `@plat/kernel`'s `tx` is wrapped so that, while the fault is on, a declared batch of two ops or
// more runs its ops in the order given — the issue order, the fault of a kernel without the canonical sort — and
// permutationCompare must then report the divergence and name the batch. The same file runs the true kernel (fault
// off) through the same calls, which must pass: the control and its twin.
import { describe, expect, it, vi } from 'vitest';
import type * as Kernel from '@plat/kernel';
import { permutationCompare } from '@plat/testkit';
import { CROWDED } from './support.js';

const fault = vi.hoisted(() => ({ on: false, declared: 0 }));

vi.mock('@plat/kernel', async (importOriginal) => {
  const k = await importOriginal<typeof Kernel>();
  const tx: typeof k.tx = (p, spec, fn, env) => {
    if (!fault.on || fn !== undefined || spec.ops.length < 2) return k.tx(p, spec, fn, env);
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
});
