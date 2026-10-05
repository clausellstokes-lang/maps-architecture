// The time-dilation shim (M0-d-08; §6.5 (9) "the golden suite under a shim that scales every clock read × 10 and × 0.1
// gives byte-identical per-stage digests"; §5.1 (5): wall-clock time is read only by the worker host, never by a model
// package — the lint M0-d-07 holds that statically, and this shim proves it where the host layer does read time).
//
// `withDilation(factor, fn)` runs `fn` with every clock the host layer can read replaced by a scaled one —
// `performance.now`, `Date.now`, `new Date()` / `Date()` without arguments, `process.hrtime` and
// `process.hrtime.bigint` — each anchored at the moment the shim is installed (t ↦ t₀ + (t − t₀) × factor), so time
// still runs forward and starts near the true time, only faster or slower. The originals are restored when `fn`
// returns or throws (or when its promise settles); shims nest, each scaling the clock it found.
//
// A model output that reads a clock — a time-budgeted ladder, a timeout that picks a rung — changes under the shim;
// one that does not is byte-identical (the harness compares per-stage digests, `dilationCompare`).

import { compareOutcomes, runSequenceOutcomes, type DeterminismSequence, type Divergence } from './issue.js';

/** What one dilation saw: `fn`'s value and the clock reads the shim answered while it ran. */
export interface Dilated<T> {
  readonly value: T;
  readonly reads: number;
}

interface Installed {
  restore(): void;
  readonly reads: () => number;
}

type Hrtime = ((prev?: [number, number]) => [number, number]) & { bigint: () => bigint };

function install(factor: number): Installed {
  let reads = 0;
  const g = globalThis as unknown as {
    performance?: { now: () => number };
    Date: DateConstructor;
    process?: { hrtime?: Hrtime };
  };
  const undo: (() => void)[] = [];
  const scale = (t0: number) => (t: number): number => t0 + (t - t0) * factor;

  // performance.now (an inherited method on Node's and the browsers' Performance object: shadowed by an own property).
  const perf = g.performance;
  if (perf !== undefined && typeof perf.now === 'function') {
    const realNow = perf.now.bind(perf);
    const own = Object.getOwnPropertyDescriptor(perf, 'now');
    const s = scale(realNow());
    Object.defineProperty(perf, 'now', { configurable: true, writable: true, value: (): number => (reads++, s(realNow())) });
    undo.push(() => {
      if (own === undefined) delete (perf as { now?: unknown }).now;
      else Object.defineProperty(perf, 'now', own);
    });
  }

  // Date.now and the argument-less Date constructor and call.
  const RealDate = g.Date;
  const realDateNow = RealDate.now.bind(RealDate);
  const sd = scale(realDateNow());
  const dilatedNow = (): number => Math.floor(sd(realDateNow()));
  const DilatedDate = function (this: unknown, ...args: unknown[]): Date | string {
    if (!(this instanceof DilatedDate)) {
      reads++;
      return new RealDate(dilatedNow()).toString();
    }
    if (args.length === 0) reads++;
    return args.length === 0 ? new RealDate(dilatedNow()) : new (RealDate as unknown as new (...a: unknown[]) => Date)(...args);
  } as unknown as DateConstructor;
  Object.setPrototypeOf(DilatedDate, RealDate);
  (DilatedDate as unknown as { prototype: Date }).prototype = RealDate.prototype;
  Object.defineProperty(DilatedDate, 'now', { configurable: true, writable: true, value: (): number => (reads++, dilatedNow()) });
  g.Date = DilatedDate;
  undo.push(() => {
    g.Date = RealDate;
  });

  // process.hrtime and process.hrtime.bigint (Node).
  const proc = g.process;
  if (proc !== undefined && typeof proc.hrtime === 'function') {
    const realHr = proc.hrtime;
    const realBig = realHr.bigint.bind(realHr);
    const b0 = realBig();
    const big = (): bigint => b0 + BigInt(Math.round(Number(realBig() - b0) * factor));
    const hr = ((prev?: [number, number]): [number, number] => {
      reads++;
      const t = big();
      let s = Number(t / 1_000_000_000n);
      let ns = Number(t % 1_000_000_000n);
      if (prev !== undefined) {
        s -= prev[0];
        ns -= prev[1];
        if (ns < 0) {
          s -= 1;
          ns += 1_000_000_000;
        }
      }
      return [s, ns];
    }) as Hrtime;
    hr.bigint = (): bigint => (reads++, big());
    proc.hrtime = hr;
    undo.push(() => {
      proc.hrtime = realHr;
    });
  }

  return {
    restore: () => {
      for (let i = undo.length - 1; i >= 0; i--) undo[i]();
    },
    reads: () => reads,
  };
}

function isThenable(v: unknown): v is PromiseLike<unknown> {
  return typeof v === 'object' && v !== null && typeof (v as { then?: unknown }).then === 'function';
}

/**
 * Runs `fn` under clocks scaled by `factor` (> 0, finite) and counts the clock reads the shim answered. A promise `fn`
 * returns keeps the shim installed until it settles.
 */
export function withDilationCounted<T>(factor: number, fn: () => T): T extends PromiseLike<infer U> ? Promise<Dilated<U>> : Dilated<T> {
  if (!(Number.isFinite(factor) && factor > 0)) throw new Error(`withDilation: a factor is a finite number > 0 (${factor})`);
  const shim = install(factor);
  let value: T;
  try {
    value = fn();
  } catch (e) {
    shim.restore();
    throw e;
  }
  if (isThenable(value)) {
    return Promise.resolve(value).then(
      (v) => {
        shim.restore();
        return { value: v, reads: shim.reads() };
      },
      (e: unknown) => {
        shim.restore();
        throw e;
      },
    ) as never;
  }
  shim.restore();
  return { value, reads: shim.reads() } as never;
}

/** §6.5 (9)'s shim: `fn` run with every clock read scaled by `factor`; returns `fn`'s value (or its promise). */
export function withDilation<T>(factor: number, fn: () => T): T {
  const r = withDilationCounted(factor, fn) as Dilated<T> | Promise<Dilated<unknown>>;
  if (r instanceof Promise) return r.then((d) => d.value) as T;
  return (r as Dilated<T>).value;
}


/** §6.5 (9)'s factors: every clock read scaled × 10 and × 0.1. */
export const DILATION_FACTORS: readonly number[] = [10, 0.1];

/** The time-dilation harness's verdict on one sequence. */
export interface DilationReport {
  readonly name: string;
  readonly factors: readonly number[];
  /** Per factor, the clock reads the shim answered while the sequence ran (0: nothing it ran read a clock). */
  readonly reads: readonly number[];
  /** Per batch, the undilated run's outcome digest (the per-stage digests). */
  readonly digests: readonly string[];
  readonly identical: boolean;
  readonly divergence: Divergence | null;
}

/**
 * §6.5 (9)'s time-dilation test on one sequence: run with the true clocks, then under each factor (default × 10 and
 * × 0.1); every batch's slot-free outcome under a dilated clock equals the undilated one, byte for byte.
 */
export function dilationCompare(seq: DeterminismSequence, factors: readonly number[] = DILATION_FACTORS): DilationReport {
  const ref = runSequenceOutcomes(seq);
  const reads: number[] = [];
  let divergence: Divergence | null = null;
  for (const f of factors) {
    const d = withDilationCounted(f, () => runSequenceOutcomes(seq)) as Dilated<ReturnType<typeof runSequenceOutcomes>>;
    reads.push(d.reads);
    divergence ??= compareOutcomes(`dilation × ${f}`, ref, d.value);
  }
  return { name: seq.name, factors: factors.slice(), reads, digests: ref.map((o) => o.digest), identical: divergence === null, divergence };
}
