// M0-f-01's timing-harness tests (§12.1's protocol; C-0025, C-0047, C-0075, C-0097's batch rule, C-0103, C-0114):
// the stamp is measured from the detector's readings before, through and after the batch; a > 5 % calibrate drift
// re-runs the batch at most twice and then flags it `throttled`; a long batch is flagged, never cut; the result names
// its host, normalisation and pool size; a contended result is never judged; while reference-score.json is null no
// result is authoritative. The protocol's clauses are driven with built readings and stub calibrations; the sampler and
// the null-reference refusal also run for real on this machine. Fix round 1 (checks/M0-f-01.md): the defaults themselves
// are pinned — 30 s idle before every attempt (fake timers), the 60 s cap (a stubbed clock), two re-runs, 30 s sampling —
// and a batch whose sampler's worker dies rejects instead of hanging (F-1 (a), F-2). Fix round 2 (the checker's notes
// N-r1-1 and N-r1-3; C-0141): a caller-passed host makes the result built, and a battery reading taken only through the
// batch contends it.
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { hostRecord, NO_REFERENCE_SCORE } from '../../src/host/index.js';
import type { MachineSample, ProcessRow } from '../../src/timing/contention.js';
import { IDLE_MS, MAX_BATCH_MS, MAX_REPEATS, judge, timeBatch, type RegisterRow, type TimeBatchOptions, type TimingResult } from '../../src/timing/harness.js';
import { run } from '../../src/timing/index.js';
import { LINE_CAP, OUT_CAP_BYTES, outDir } from '../../src/timing/output.js';
import { SAMPLE_EVERY_MS, SAMPLER_WORKER_SOURCE, startSampler, type Sampler } from '../../src/timing/sampler.js';

const HOST = hostRecord();

const reading = (rows: ProcessRow[] = [], extra: Partial<MachineSample> = {}): MachineSample => ({
  at: '2026-10-03T00:00:00.000Z',
  loadAverage: 0.3,
  power: 'ac',
  selfPid: process.pid,
  processes: [{ pid: process.pid, ppid: 1, pcpu: 100, comm: 'node' }, ...rows],
  ...extra,
});

/** A calibrate stub returning the given scores in turn, cycling (before, after, before, after, …). */
function scores(...xs: number[]): () => number {
  let i = 0;
  return () => xs[i++ % xs.length];
}

function stubSampler(samples: MachineSample[] = [], log: string[] = []): (everyMs: number) => Promise<Sampler> {
  return (everyMs) => {
    log.push(`start ${everyMs}`);
    return Promise.resolve({
      stop: () => {
        log.push('stop');
        return Promise.resolve(samples);
      },
    });
  };
}

const busy = (ms: number): void => {
  const end = process.hrtime.bigint() + BigInt(Math.round(ms * 1e6));
  while (process.hrtime.bigint() < end) {
    // spin
  }
};

/** The built-reading options: no idle, a quiet machine, a reference score of 100, agreeing calibrations. */
function built(extra: TimeBatchOptions = {}): TimeBatchOptions {
  return { idleMs: 0, machine: () => reading(), sampler: stubSampler(), calibrate: scores(100, 101), referenceScore: 100, host: HOST, ...extra };
}

/** The real setTimeout and clearTimeout, kept before any test fakes the timers. */
const realSetTimeout = setTimeout;
const realClearTimeout = clearTimeout;
const realSleep = (ms: number): Promise<void> => new Promise((r) => realSetTimeout(r, ms));

/** Lets every pending promise continuation run (one macrotask turn; setImmediate is never faked here). */
const flush = (): Promise<void> => new Promise((r) => setImmediate(r));

/** Settles with `p`, or rejects with "HANG …" after `ms` of real time. */
async function within<T>(p: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const hang = new Promise<never>((_, reject) => {
    timer = realSetTimeout(() => reject(new Error(`HANG: no answer within ${ms} ms`)), ms);
  });
  try {
    return await Promise.race([p, hang]);
  } finally {
    realClearTimeout(timer);
  }
}

describe('timeBatch: the protocol on built readings', () => {
  it('a quiet batch is authoritative and stamped with host, normalisation, pool size, calibrations and samples', async () => {
    const log: string[] = [];
    const r = await timeBatch(() => busy(5), built({ label: 'quiet', sampler: stubSampler([reading()], log), sampleEveryMs: 1234 }));
    expect(r.authority).toBe('authoritative');
    expect(r.readings).toBe('built');
    expect(r.reasons).toEqual([]);
    expect(r.label).toBe('quiet');
    expect(r.unit).toBe('ms');
    expect(r.value).toBeGreaterThanOrEqual(5);
    expect(r.value).toBe(r.wallMs);
    expect(r.normalisation).toBeCloseTo(1.005, 12);
    expect(r.poolSize).toBe(0);
    expect(r.host).toEqual(HOST);
    expect(r.calibration).toEqual({ before: 100, after: 101, drift: 0.01, attempts: 1 });
    expect(r.flags).toEqual([]);
    expect(r.samples).toBe(3);
    expect(r.cpuMs).toBeGreaterThan(0);
    expect(log).toEqual(['start 1234', 'stop']);
  });

  it('two calibrate scores 6 % apart re-run the batch at most twice, then flag it throttled and contended', async () => {
    let runs = 0;
    const r = await timeBatch(() => void runs++, built({ calibrate: scores(100, 106) }));
    expect(runs).toBe(3);
    expect(r.calibration.attempts).toBe(3);
    expect(r.flags).toEqual(['throttled']);
    expect(r.authority).toBe('contended');
    expect(r.reasons).toEqual(['calibrate drift 6.0 % > 5 %']);
    const once1 = await timeBatch(() => undefined, built({ calibrate: scores(100, 106), maxRepeats: 0 }));
    expect(once1.calibration.attempts).toBe(1);
    expect(once1.flags).toEqual(['throttled']);
  });

  it('a drifting attempt is re-run and the agreeing re-run is kept', async () => {
    const r = await timeBatch(() => undefined, built({ calibrate: scores(100, 106, 100, 102) }));
    expect(r.calibration).toEqual({ before: 100, after: 102, drift: 0.02, attempts: 2 });
    expect(r.authority).toBe('authoritative');
  });

  it('battery power, a high load average before the batch, and an offender sampled through the batch each contend', async () => {
    expect((await timeBatch(() => undefined, built({ machine: () => reading([], { power: 'battery' }) }))).reasons).toEqual(['power: battery']);
    expect((await timeBatch(() => undefined, built({ machine: () => reading([], { loadAverage: 3 }) }))).reasons).toEqual(['load average 3.00 > 1.5']);
    const during = [reading([], { loadAverage: 3 }), reading([{ pid: 9001, ppid: 1, pcpu: 0, comm: '/usr/bin/python3' }])];
    const r = await timeBatch(() => undefined, built({ sampler: stubSampler(during) }));
    expect(r.reasons).toEqual(['process: python3 (python3, pid 9001)']); // the load clause is the before-batch reading's alone
    const own = await timeBatch(() => undefined, built({ sampler: stubSampler(during), ownPids: () => [9001] }));
    expect(own.authority).toBe('authoritative');
  });

  it('with the reference score null the result is contended ("no reference score") and its normalisation null', async () => {
    const r = await timeBatch(() => undefined, built({ referenceScore: null }));
    expect(r.authority).toBe('contended');
    expect(r.reasons).toEqual([NO_REFERENCE_SCORE]);
    expect(r.normalisation).toBeNull();
  });

  it('a batch past the cap is flagged long-batch with its figure kept; units, ops, a self-measured value and the pool size', async () => {
    const long = await timeBatch(() => busy(15), built({ maxBatchMs: 5 }));
    expect(long.flags).toEqual(['long-batch']);
    expect(long.authority).toBe('authoritative');
    expect(long.value).toBeGreaterThanOrEqual(15);
    const perOp = await timeBatch(() => busy(4), built({ unit: 'µs', ops: 1000, poolSize: 3 }));
    expect(perOp.unit).toBe('µs');
    expect(perOp.value).toBeCloseTo(perOp.wallMs, 9); // wallMs ÷ 1000 ops, in µs
    expect(perOp.poolSize).toBe(3);
    const self = await timeBatch(() => ({ value: 7.5, unit: 'µs' }), built());
    expect([self.value, self.unit]).toEqual([7.5, 'µs']);
    const asyncFn = await timeBatch(async () => {
      await new Promise((r) => setTimeout(r, 10));
    }, built());
    expect(asyncFn.value).toBeGreaterThanOrEqual(9);
    await expect(timeBatch(() => undefined, built({ ops: 0 }))).rejects.toThrow(/ops/);
  });

  it('a throwing workload stops the sampler and rejects', async () => {
    const log: string[] = [];
    await expect(timeBatch(() => {
      throw new Error('boom');
    }, built({ sampler: stubSampler([], log) }))).rejects.toThrow('boom');
    expect(log).toEqual(['start 30000', 'stop']);
  });

  it('waits the idle time before each attempt', async () => {
    const t0 = Date.now();
    await timeBatch(() => undefined, built({ idleMs: 120 }));
    expect(Date.now() - t0).toBeGreaterThanOrEqual(110);
  });
});

describe('timeBatch\'s defaults are §12.1\'s: 30 s idle before every attempt, ≤ 60 s batches, two re-runs, 30 s sampling (F-1 (a))', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('the named defaults', () => {
    expect([IDLE_MS, MAX_BATCH_MS, MAX_REPEATS, SAMPLE_EVERY_MS]).toEqual([30_000, 60_000, 2, 30_000]);
  });

  it('with no idleMs, each attempt starts after 30 s idle and not a millisecond sooner (fake timers)', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const seen: number[] = [];
    const cal = scores(100, 106, 100, 101); // the first attempt drifts 6 %: a second attempt, after its own idle wait
    const p = timeBatch(() => undefined, {
      machine: () => reading(),
      sampler: stubSampler(),
      calibrate: () => {
        const x = cal();
        seen.push(x);
        return x;
      },
      referenceScore: 100,
      host: HOST,
    });
    await vi.advanceTimersByTimeAsync(29_999);
    await flush();
    expect(seen).toEqual([]);
    await vi.advanceTimersByTimeAsync(1);
    await flush();
    expect(seen).toEqual([100, 106]); // the first attempt ran whole, then waited again
    await vi.advanceTimersByTimeAsync(29_999);
    await flush();
    expect(seen).toEqual([100, 106]);
    await vi.advanceTimersByTimeAsync(1);
    const r = await p;
    expect(seen).toEqual([100, 106, 100, 101]);
    expect(r.calibration).toEqual({ before: 100, after: 101, drift: 0.01, attempts: 2 });
  });

  it('with no maxBatchMs, a batch of 60 001 ms is flagged long-batch with its figure kept; 60 000 and 59 999 ms are not (a stubbed clock)', async () => {
    const wall = async (ms: number): Promise<TimingResult> => {
      const t0 = 1_000_000_000n;
      const clock = vi.spyOn(process.hrtime, 'bigint').mockReturnValueOnce(t0).mockReturnValueOnce(t0 + BigInt(ms) * 1_000_000n);
      try {
        return await timeBatch(() => undefined, built()); // built(): idleMs 0, maxBatchMs absent
      } finally {
        clock.mockRestore();
      }
    };
    const over = await wall(60_001);
    expect(over.wallMs).toBe(60_001);
    expect(over.value).toBe(60_001);
    expect(over.flags).toEqual(['long-batch']);
    expect(over.authority).toBe('authoritative'); // long, not contended (C-0138 (6))
    for (const ms of [60_000, 59_999]) {
      const r = await wall(ms);
      expect(r.wallMs).toBe(ms);
      expect(r.flags).toEqual([]);
    }
  });

  it('with no maxRepeats, a batch that keeps drifting runs three times; with no sampleEveryMs the sampler samples every 30 s', async () => {
    const log: string[] = [];
    let runs = 0;
    const r = await timeBatch(() => void runs++, built({ calibrate: scores(100, 106), sampler: stubSampler([], log) }));
    expect(runs).toBe(3);
    expect(r.flags).toEqual(['throttled']);
    expect(log).toEqual(['start 30000', 'stop', 'start 30000', 'stop', 'start 30000', 'stop']);
  });
});

describe('timeBatch with a sampler whose worker dies mid-batch (F-2)', () => {
  // the worker dies 300 ms after it started, while the workload (1.5 s) runs; no ps sample holds its thread (10 s period)
  const dying = `${SAMPLER_WORKER_SOURCE}\nsetTimeout(() => { throw new Error('worker died'); }, 300);\n`;
  const sampler = (ms: number): Promise<Sampler> => startSampler({ everyMs: ms, source: dying });

  it('the batch rejects with the sampler\'s cause within the bound — it never hangs', async () => {
    const p = timeBatch(() => realSleep(1_500), built({ sampler, sampleEveryMs: 10_000 }));
    await expect(within(p, 5_000)).rejects.toThrow('worker died');
  }, 20_000);

  it('a throwing workload keeps its own error when the sampler has died too', async () => {
    const p = timeBatch(async () => {
      await realSleep(1_500);
      throw new Error('workload failed');
    }, built({ sampler, sampleEveryMs: 10_000 }));
    await expect(within(p, 5_000)).rejects.toThrow('workload failed');
  }, 20_000);
});

describe('timeBatch with a battery reading taken only through the batch (fix round 2, note N-r1-3)', () => {
  it('the worker\'s planted battery reading contends the result: the power through the batch is read, never assumed', async () => {
    const battery = SAMPLER_WORKER_SOURCE.replace("read(workerData.pmset, ['-g', 'batt'])", JSON.stringify("Now drawing from 'Battery Power'"));
    expect(battery).not.toBe(SAMPLER_WORKER_SOURCE);
    // built(): the before and after readings are on AC; only the samples through the 800 ms batch see the battery
    const r = await timeBatch(() => realSleep(800), built({ sampler: (ms) => startSampler({ everyMs: ms, source: battery }), sampleEveryMs: 100 }));
    expect(r.samples).toBeGreaterThanOrEqual(3);
    expect(r.reasons).toContain('power: battery');
    expect(r.authority).toBe('contended');
  }, 30_000);
});

describe('timeBatch on this machine', () => {
  const planted: ReturnType<typeof spawn>[] = [];
  afterEach(async () => {
    for (const c of planted.splice(0)) {
      if (c.exitCode === null && c.signalCode === null) {
        c.kill('SIGKILL');
        await once(c, 'exit');
      }
    }
  });

  it('the sampler reads every process through the batch: a python3 alive only during the batch is caught and named', async () => {
    let pid = 0;
    const r = await timeBatch(
      async () => {
        const c = spawn('/usr/bin/python3', ['-c', 'import time; time.sleep(30)'], { stdio: 'ignore' });
        planted.push(c);
        pid = c.pid as number;
        busy(900); // the main thread held, as a CPU-bound batch holds it; the worker samples meanwhile
        c.kill('SIGKILL');
        await once(c, 'exit');
      },
      { idleMs: 0, sampleEveryMs: 150, calibrate: scores(100, 100), referenceScore: 100, host: HOST },
    );
    expect(pid).toBeGreaterThan(0);
    // before and after, and at least one through the batch (a loaded machine's ps can take ~300 ms, so the count varies)
    expect(r.samples).toBeGreaterThanOrEqual(3);
    // named by the samples taken through the batch: as /usr/bin/python3 and, once the shim has exec'd, as the framework's Python
    const mine = r.reasons.filter((x) => x.includes(`pid ${pid})`));
    expect(mine.length).toBeGreaterThanOrEqual(1);
    expect(mine.some((x) => x.startsWith('process: python3 ('))).toBe(true);
    expect(r.authority).toBe('contended');
  }, 30_000);

  it('with the real calibrate and reference-score.json at null, no result is authoritative (C-0075)', async () => {
    const r = await timeBatch(() => busy(5), { idleMs: 0, sampleEveryMs: 30_000 });
    expect(r.authority).toBe('contended');
    expect(r.reasons[0]).toBe(NO_REFERENCE_SCORE);
    expect(r.normalisation).toBeNull();
    expect(r.calibration.before).toBeGreaterThan(0);
    expect(r.calibration.after).toBeGreaterThan(0);
    expect(r.host.kind).toBe('native-arm64');
    expect(r.readings).toBe('measured');
    expect(judge(r, { row: 'probe', budget: 1e9, unit: 'ms', measuredAt: 'test', pass: '≤ budget', changeOnMiss: 'none' }).verdict).toBe('requeue');
  }, 60_000);

  it('a host passed by the caller makes the result built and never judged: a score names the machine the harness read (fix round 2, note N-r1-1)', async () => {
    const other = { ...HOST, cpu: 'Another CPU' };
    const r = await timeBatch(() => busy(5), { idleMs: 0, sampleEveryMs: 30_000, host: other });
    expect(r.host).toEqual(other);
    expect(r.readings).toBe('built');
    const j = judge(r, { row: 'probe', budget: 1e9, unit: 'ms', measuredAt: 'test', pass: '≤ budget', changeOnMiss: 'none' });
    expect(j.verdict).toBe('requeue');
    expect(j.reason).toMatch(/never declared/);
  }, 60_000);
});

describe('judge: a contended result is never judged (§12.10\'s row shape)', () => {
  const row: RegisterRow = { row: 'R-test', budget: 6, unit: 'ms', measuredAt: 'M0 timing phase', pass: '≤ 6 ms', changeOnMiss: 'the pre-decided change' };
  const result = (over: Partial<TimingResult>): TimingResult => ({
    label: 't',
    value: 10,
    unit: 'ms',
    host: HOST,
    authority: 'authoritative',
    readings: 'measured',
    reasons: [],
    normalisation: 2,
    poolSize: 0,
    wallMs: 10,
    cpuMs: 10,
    calibration: { before: 200, after: 200, drift: 0, attempts: 1 },
    flags: [],
    samples: 2,
    at: '2026-10-03T00:00:00.000Z',
    ...over,
  });

  it('re-queues a result stamped from built readings, however quiet they were (measured, never declared — C-0047)', async () => {
    const built1 = await timeBatch(() => undefined, built());
    expect(built1.authority).toBe('authoritative');
    expect(judge(built1, { ...row, budget: 1e9 })).toMatchObject({ verdict: 'requeue', normalised: null });
    expect(judge(result({ readings: 'built' }), row).reason).toMatch(/never declared/);
  });

  it('re-queues a contended result and one without normalisation', () => {
    expect(judge(result({ authority: 'contended', reasons: ['load average 3.00 > 1.5'] }), row)).toMatchObject({ verdict: 'requeue', normalised: null });
    expect(judge(result({ normalisation: null }), row).verdict).toBe('requeue');
  });

  it('divides by the normalisation before the budget; the tolerance and the unit are honoured', () => {
    expect(judge(result({}), row)).toMatchObject({ verdict: 'pass', normalised: 5 });
    expect(judge(result({ value: 13 }), row)).toMatchObject({ verdict: 'miss', normalised: 6.5 });
    expect(judge(result({ value: 13 }), { ...row, tolerance: 0.1 }).verdict).toBe('pass');
    expect(() => judge(result({ unit: 'µs' }), row)).toThrow(/µs/);
  });
});

describe('corepack pnpm bench -- timing (the dispatcher entry run)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  function capture(): string[] {
    const lines: string[] = [];
    vi.spyOn(process.stdout, 'write').mockImplementation((chunk: string | Uint8Array) => {
      lines.push(...String(chunk).split('\n').filter((l) => l !== ''));
      return true;
    });
    return lines;
  }

  it('prints the stamp of the machine now in two capped lines and writes the report truncated', async () => {
    const lines = capture();
    const dir = outDir(join(outDir(), 'f01-timing-test'));
    expect(await run([], { out: dir })).toBe(0);
    vi.restoreAllMocks();
    expect(lines).toHaveLength(2);
    expect(lines[0]).toMatch(/^timing: machine contended — \d+ reason\(s\) over \d+ processes: no reference score/);
    for (const l of lines) expect(l.length).toBeLessThanOrEqual(LINE_CAP);
    const text = readFileSync(join(dir, 'timing-contention.json'), 'utf8');
    expect(Buffer.byteLength(text)).toBeLessThanOrEqual(OUT_CAP_BYTES);
    expect((JSON.parse(text) as { reasons: string[] }).reasons).toContain(NO_REFERENCE_SCORE);
  });

  it('with no --idle-ms the probe batch waits timeBatch\'s own 30 s idle: the command keeps no default of its own (fake timers)', async () => {
    const lines = capture();
    const dir = outDir(join(outDir(), 'f01-timing-test'));
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const p = run(['--batch', '--every-ms', '200'], { out: dir });
    let done = false;
    p.then(
      () => {
        done = true;
      },
      () => {
        done = true;
      },
    );
    try {
      expect(vi.getTimerCount()).toBe(1); // the idle wait, pending before anything is measured
      await vi.advanceTimersByTimeAsync(29_999);
      expect(vi.getTimerCount()).toBe(1);
      await vi.advanceTimersByTimeAsync(1);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      // the batch runs in real time; a drifting attempt's next idle wait is advanced as it comes — and the run is
      // always finished here, so a failed assertion never leaves it printing into the next test
      while (!done) {
        if (vi.getTimerCount() > 0) await vi.advanceTimersByTimeAsync(30_000);
        else await realSleep(20);
      }
      vi.useRealTimers();
      vi.restoreAllMocks();
    }
    expect(await p).toBe(0);
    expect(lines[0]).toMatch(/^timing: probe: fbm × 10 [0-9.]+ ms; contended; /);
  }, 90_000);

  it('times a probe batch and writes the stamped TimingResult; bad arguments exit 64', async () => {
    const lines = capture();
    const dir = outDir(join(outDir(), 'f01-timing-test'));
    expect(await run(['--batch', '--idle-ms', '0', '--every-ms', '200'], { out: dir })).toBe(0);
    expect(await run(['--nope'], { out: dir })).toBe(64);
    expect(await run(['--idle-ms', '0'], { out: dir })).toBe(64);
    expect(await run(['--batch', '--every-ms', '0'], { out: dir })).toBe(64);
    vi.restoreAllMocks();
    expect(lines.length).toBeLessThanOrEqual(6);
    expect(lines[0]).toMatch(/^timing: probe: fbm × 10 [0-9.]+ ms; contended; normalisation null; pool 0; calibrate /);
    const rec = JSON.parse(readFileSync(join(dir, 'timing-batch.json'), 'utf8')) as TimingResult;
    expect(rec.authority).toBe('contended');
    expect(rec.reasons).toContain(NO_REFERENCE_SCORE);
    expect(rec.host.cpu).toBe('Apple M1');
  }, 60_000);
});
