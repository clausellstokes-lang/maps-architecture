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

// Hardening round S2 (Q153): no assertion of this file compares two real-time durations, or a duration with a bound,
// that a preemption can break. A claim about how the shim scales time is read either on a BASE CLOCK the test controls
// (`withBaseClock`: `performance.now` replaced by a counter before the shim captures it, removed after — the shim scales
// whatever clock it finds, its own design, so no export changes) and is then exact, or against the true clocks read
// immediately before and after the dilated reads (a BRACKET), with a tolerance derived from the clock's granularity.

/** The true clocks, captured before any shim of this file replaces them (`Date.now` and `hrtime.bigint` are static). */
const TRUE_PERF = performance.now.bind(performance);
const TRUE_DATE = Date.now.bind(Date);
const TRUE_HR = process.hrtime.bigint.bind(process.hrtime);

/** A real-time busy wait on the true clock — real time passing that no base clock of `withBaseClock` sees. */
function realWait(ms: number): void {
  const end = TRUE_PERF() + ms;
  while (TRUE_PERF() < end);
}

/** A test-side base clock: `t` (ms) is what `performance.now` answers; each read then advances it by `step`. */
interface BaseClock {
  t: number;
  step: number;
}

/**
 * Runs `fn` with `performance.now` answered by a base clock the test controls, installed (an own property shadowing the
 * prototype's method, as the shim installs its own) before any shim inside `fn` captures it, and removed afterwards
 * whatever `fn` does.
 */
function withBaseClock<T>(fn: (clock: BaseClock) => T, start = 1000, step = 0): T {
  const clock: BaseClock = { t: start, step };
  const had = Object.getOwnPropertyDescriptor(performance, 'now');
  Object.defineProperty(performance, 'now', {
    configurable: true,
    writable: true,
    value: (): number => {
      const v = clock.t;
      clock.t += clock.step;
      return v;
    },
  });
  try {
    return fn(clock);
  } finally {
    if (had === undefined) delete (performance as { now?: unknown }).now;
    else Object.defineProperty(performance, 'now', had);
  }
}

/** The three true clocks at one moment: performance (ms), the wall clock (integer ms), hrtime (ns). */
function trueClocks(): { p: number; d: number; h: bigint } {
  return { p: TRUE_PERF(), d: TRUE_DATE(), h: TRUE_HR() };
}

describe('withDilation: every clock the host layer reads, scaled (§6.5 (9))', () => {
  it('the factors are × 10 and × 0.1', () => {
    expect(DILATION_FACTORS).toEqual([10, 0.1]);
  });

  it('performance.now, Date.now, new Date(), Date(), process.hrtime and hrtime.bigint run × factor', () => {
    // Each dilated clock's start reads lie between the true clocks' reads a0 and a1, its end reads between b0 and b1, so
    // its elapsed reading v is factor × (true time between its own two reads), and that true time lies between
    // (b0 − a1) and (b1 − a0) — whatever the scheduler does anywhere in the run (Q153: the old form compared v with the
    // true time of the WHOLE call, install and restore included, and failed under a 40 ms preemption outside v's window).
    // Granularity, per clock: performance.now — doubles below 2^31 ms (ulp 2^-21 ms), each dilated read t0 + (t − t0) ×
    // factor ≤ 2 roundings, the difference and the bracket's product ≤ 2 more: ≤ 8 ulp = 2^-18 ms. Date.now / new
    // Date() — every dilated read is floored to an integer ms: the difference of two floors is within 1 ms of the exact
    // one, plus ≤ 8 ulp at the wall clock's magnitude (< 2^42 ms, ulp 2^-10 ms): 1 + 2^-7 ms. hrtime — each dilated read
    // is rounded to an integer ns: 1 ns = 1e-6 ms for the difference, plus the ns → ms conversion's rounding: 2e-6 ms.
    const EPS = { p: 2 ** -18, d: 1 + 2 ** -7, h: 2e-6 };
    for (const factor of [10, 0.1]) {
      const r = withDilation(factor, () => {
        const a0 = trueClocks();
        const p0 = performance.now();
        const d0 = Date.now();
        const h0 = process.hrtime.bigint();
        const hr0 = process.hrtime();
        const wall0 = Date.now();
        const a1 = trueClocks();
        // Wait 40 ms of true time, measured by spinning on the dilated performance clock for 40 × factor ms.
        spin(() => performance.now(), 40 * factor);
        const b0 = trueClocks();
        const v = {
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
        const b1 = trueClocks();
        return { v, a0, a1, b0, b1 };
      });
      const { v, a0, a1, b0, b1 } = r;
      expect(b1.p).toBeLessThan(2 ** 31); // the performance granularity's premise
      expect(b1.d).toBeLessThan(2 ** 42); // the wall clock's
      // The spin's 40 × factor dilated ms lie inside [a1, b0]: at least 40 true ms (so the lower bounds below bite).
      expect(b0.p - a1.p).toBeGreaterThanOrEqual(40 - EPS.p / factor);
      const ms = (x: bigint): number => Number(x) / 1e6;
      const bracket = {
        p: [b0.p - a1.p, b1.p - a0.p],
        d: [b0.d - a1.d, b1.d - a0.d],
        h: [ms(b0.h - a1.h), ms(b1.h - a0.h)],
      } as const;
      const checks: [string, number, keyof typeof bracket][] = [
        ['performance.now', v.p, 'p'],
        ['Date.now', v.d, 'd'],
        ['hrtime.bigint', v.h, 'h'],
        ['hrtime', v.hr, 'h'],
        ['new Date()', v.newDate, 'd'],
      ];
      for (const [name, got, k] of checks) {
        const [lo, hi] = bracket[k];
        expect(got, `${name} × ${factor}`).toBeGreaterThanOrEqual(lo * factor - EPS[k]);
        expect(got, `${name} × ${factor}`).toBeLessThanOrEqual(hi * factor + EPS[k]);
      }
      expect(v.call).toBe('string');
    }
  });

  it('a dated Date is untouched; the clocks start near the true time', () => {
    const r0 = TRUE_DATE();
    withDilation(10, () => {
      expect(new Date(0).getTime()).toBe(0);
      expect(new Date(2026, 0, 1).getFullYear()).toBe(2026);
      const now = Date.now();
      const made = new Date().getTime();
      const r1 = TRUE_DATE();
      // The shim anchors the wall clock at its install, at a true instant A in [r0, r1] (integer ms); a dilated read at
      // true R in [A, r1] is ⌊A + (R − A) × 10⌋, so it lies in [r0, r1 + 9 (r1 − r0)] — exact in doubles (integers below
      // 2^53), with no tolerance and whatever time the scheduler takes between the reads (Q153: the old form bounded
      // |Date.now() − new Date()| by 1000, which a 100 ms preemption between the two reads broke at × 10).
      for (const t of [now, made]) {
        expect(t).toBeGreaterThanOrEqual(r0);
        expect(t).toBeLessThanOrEqual(r1 + 9 * (r1 - r0));
      }
      expect(made).toBeGreaterThanOrEqual(now);
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
    // Nested: × 10 inside × 10 runs × 100. Read on a base clock the test controls (Q153: the old form divided a × 100
    // reading of a spin by a × 10 reading of the whole outer body, a ratio of 10 only if no true time passed outside the
    // spin, and a 2 ms preemption brought it under its bound of 5): 2 ms of base time is 200 ms to the inner clock and 20
    // ms to the outer one, exactly (integers in doubles); true time passing anywhere in between moves neither.
    const nested = withBaseClock((clock) =>
      withDilation(10, () => {
        const t0 = performance.now();
        realWait(3);
        const inner = withDilation(10, () => {
          const s0 = performance.now();
          realWait(3);
          clock.t += 2;
          const s1 = performance.now();
          realWait(3);
          return { elapsed: s1 - s0, again: performance.now() - s1 };
        });
        realWait(3);
        const mid = performance.now() - t0;
        clock.t += 1;
        return { inner, mid, outer: performance.now() - t0 };
      }),
    );
    // The inner clock ran × 100 of the base, the outer × 10 while the inner was installed and after it was restored.
    expect(nested).toEqual({ inner: { elapsed: 200, again: 0 }, mid: 20, outer: 30 });
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

  // Q153: the planted rung's spin count is read on a base clock that advances 1 ms per read, so its output is exact
  // under each factor (the true clock's count varied with the machine's load, and the control's catch with it): two
  // spins undilated, none at × 10 (one read already passes the 3 ms budget), 29 at × 0.1.
  const stepping = <T>(fn: () => T): T => withBaseClock(() => fn(), 1000, 1);

  it('the planted rung reads the clock: its spin count follows the factor exactly', () => {
    const count = (f: number | null): number =>
      stepping(() => (f === null ? spin(() => performance.now(), 3) : withDilation(f, () => spin(() => performance.now(), 3))));
    expect([count(null), count(10), count(0.1)]).toEqual([2, 0, 29]);
  });

  it('dilationCompare reports the divergence and the reads', () => {
    const r = stepping(() => dilationCompare(clocked()));
    expect(r.identical).toBe(false);
    expect(r.divergence?.run).toMatch(/^dilation × /);
    expect(r.divergence?.batch).toBe('L1 chain whose end follows the work done in a 3 ms budget');
    expect(r.reads[0]).toBeGreaterThan(0);
    expect(r.reads[1]).toBeGreaterThan(0);
  });

  it('each factor is compared on its own: × 10 alone and × 0.1 alone each catch it', () => {
    for (const f of [10, 0.1]) {
      const r = stepping(() => dilationCompare(clocked(), [f]));
      expect(r.identical, `× ${f}`).toBe(false);
      expect(r.divergence?.run).toBe(`dilation × ${f}`);
      expect(r.factors).toEqual([f]);
    }
  });
});
