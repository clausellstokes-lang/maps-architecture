// M0-d-08: the time-dilation shim (§6.5 (9): "the golden suite under a shim that scales every clock read × 10 and × 0.1
// gives byte-identical per-stage digests"; §5.1 (5): wall-clock time is read only by the worker host, never by a model
// package). The shim's own contract, the bar on the kernel fixtures, and the negative control: a batch whose output
// follows a clock (a time-budgeted rung) is caught.
import { describe, expect, it, vi } from 'vitest';
import { insertChain, type Overlay } from '@plat/kernel';
import {
  DILATION_FACTORS,
  dilationCompare,
  determinismPoint as lp,
  fixtureSpec,
  framedArena,
  withDilation,
  withDilationCounted,
  type DeterminismSequence,
} from '@plat/testkit';
import { constructiveSequences, CROWDED, KERNEL_SEQUENCES, partitionerSequence } from './support.js';

// The bars run every fixture through several runs each: more than vitest's default 5 s per test.
vi.setConfig({ testTimeout: 180_000 });

/** Spins until the (possibly dilated) clock has advanced `ms`, returning how many spins that took. */
function spin(read: () => number, ms: number): number {
  const t0 = read();
  let n = 0;
  while (read() - t0 < ms) n++;
  return n;
}

describe('withDilation: every clock the host layer reads, scaled (§6.5 (9))', () => {
  it('the factors are × 10 and × 0.1', () => {
    expect(DILATION_FACTORS).toEqual([10, 0.1]);
  });

  it('performance.now, Date.now, new Date(), Date(), process.hrtime and hrtime.bigint run × factor', () => {
    for (const factor of [10, 0.1]) {
      const realP0 = performance.now();
      const r = withDilation(factor, () => {
        const p0 = performance.now();
        const d0 = Date.now();
        const h0 = process.hrtime.bigint();
        const hr0 = process.hrtime();
        const real0 = Number(process.hrtime.bigint()); // dilated too; the real elapsed time is read after
        void real0;
        const wall0 = Date.now();
        // Wait 40 ms of true time, measured by spinning on the dilated performance clock for 40 × factor ms.
        spin(() => performance.now(), 40 * factor);
        return {
          p: performance.now() - p0,
          d: Date.now() - d0,
          h: Number(process.hrtime.bigint() - h0) / 1e6,
          hr: ((): number => {
            const [s, ns] = process.hrtime(hr0);
            return s * 1e3 + ns / 1e6;
          })(),
          newDate: new Date().getTime() - wall0,
          call: typeof Date(),
        };
      });
      const real = performance.now() - realP0;
      // Every dilated clock saw ≈ real × factor (the real elapsed time includes the shim's install and the reads).
      for (const v of [r.p, r.d, r.h, r.hr, r.newDate]) {
        expect(v / factor).toBeGreaterThan(real * 0.5);
        expect(v / factor).toBeLessThan(real * 1.5 + 5);
      }
      expect(r.call).toBe('string');
    }
  });

  it('a dated Date is untouched; the clocks start near the true time', () => {
    withDilation(10, () => {
      expect(new Date(0).getTime()).toBe(0);
      expect(new Date(2026, 0, 1).getFullYear()).toBe(2026);
      expect(Math.abs(Date.now() - new Date().getTime())).toBeLessThan(1000);
      expect(new Date() instanceof Date).toBe(true);
      expect(Date.UTC(2026, 0, 1)).toBe(1767225600000);
    });
  });

  it('restores every clock on return, on a throw and when a promise settles; nests', async () => {
    const before = [performance.now, Date, Date.now, process.hrtime, process.hrtime.bigint];
    const same = (): void => {
      expect([performance.now, Date, Date.now, process.hrtime, process.hrtime.bigint]).toEqual(before);
      expect(Object.hasOwn(performance, 'now')).toBe(false);
    };
    withDilation(10, () => 1);
    same();
    expect(() => withDilation(10, () => {
      throw new Error('boom');
    })).toThrow('boom');
    same();
    const v = await withDilation(0.1, async () => {
      await new Promise((r) => setTimeout(r, 5));
      expect(Date).not.toBe(before[1]);
      return 7;
    });
    expect(v).toBe(7);
    same();
    await expect(withDilation(10, () => Promise.reject(new Error('later')))).rejects.toThrow('later');
    same();
    // Nested: × 10 inside × 10 runs × 100.
    const outer = withDilation(10, () => {
      const t0 = performance.now();
      const inner = withDilation(10, () => {
        const s0 = performance.now();
        spin(() => performance.now(), 200);
        return performance.now() - s0;
      });
      return { inner, outer: performance.now() - t0 };
    });
    expect(outer.inner / outer.outer).toBeGreaterThan(5);
    same();
  });

  it('counts the clock reads it answered, and refuses a factor that is not finite and > 0', () => {
    const d = withDilationCounted(10, () => {
      performance.now();
      Date.now();
      void new Date();
      void Date();
      process.hrtime();
      process.hrtime.bigint();
      void new Date(5);
      return 'x';
    }) as { value: string; reads: number };
    expect(d).toEqual({ value: 'x', reads: 6 });
    for (const bad of [0, -1, Number.NaN, Infinity]) expect(() => withDilation(bad, () => 1)).toThrow(/finite number > 0/);
  });
});

/** The bar's fixtures: M0-a-06's sequences, the crowded declared batches, M0-a-07's partitioners, the constructive arenas. */
function barFixtures(): DeterminismSequence[] {
  return [...KERNEL_SEQUENCES, ...CROWDED, partitionerSequence(), ...constructiveSequences(1)];
}

describe('the bar: time dilation × 10 and × 0.1 on the kernel fixtures gives byte-identical digests (§16 M0 (d))', () => {
  it('every batch of every fixture: identical outcome digests, and the kernel read no clock', () => {
    const fx = barFixtures();
    expect(fx.length).toBeGreaterThan(90);
    let batches = 0;
    for (const s of fx) {
      const r = dilationCompare(s);
      expect(r.divergence, s.name).toBeNull();
      expect(r.identical).toBe(true);
      expect(r.factors).toEqual([10, 0.1]);
      // §5.1 (5): nothing the kernel ran read a clock — the shim answered no read at either factor.
      expect(r.reads, s.name).toEqual([0, 0]);
      expect(r.digests).toHaveLength(s.batches.length);
      for (const d of r.digests) expect(d).toMatch(/^[0-9a-f]{32}$/);
      batches += r.digests.length;
    }
    expect(batches).toBeGreaterThan(250);
  });
});

describe('the negative control: an output that follows the clock is caught', () => {
  /** A planted time-budgeted rung: the chain's far end moves with the work done inside a 3 ms budget. */
  function clocked(): DeterminismSequence {
    return {
      name: 'planted clock-budgeted rung',
      arena: () => framedArena(0, 0, 4000, 4000),
      batches: [
        {
          name: 'L1 chain whose end follows the work done in a 3 ms budget',
          build: () => ({
            spec: fixtureSpec(1),
            fn: (o: Overlay) => {
              const n = spin(() => performance.now(), 3);
              const x = 500 + Math.min(3000, Math.floor(Math.log2(n + 1) * 150));
              return insertChain(o, [lp(500, 2000), lp(x, 2500)], [{ role: 'way', entity: 'way:clock' }], 'mandatory');
            },
          }),
        },
      ],
    };
  }

  it('dilationCompare reports the divergence and the reads', () => {
    const r = dilationCompare(clocked());
    expect(r.identical).toBe(false);
    expect(r.divergence?.run).toMatch(/^dilation × /);
    expect(r.divergence?.batch).toBe('L1 chain whose end follows the work done in a 3 ms budget');
    expect(r.reads[0]).toBeGreaterThan(0);
    expect(r.reads[1]).toBeGreaterThan(0);
  });
});
