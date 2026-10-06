// M0-f-02a: the two timing modes M0-t-01 alone invokes (C-0097) over a FIXTURE manifest with PLANTED unit durations
// (C-0105): batched — every unit one batch through M0-f-01's timeBatch with two calibrate scores, every batch ≤ 60 s or
// flagged long-batch (a planted 90 s unit), a planted drift re-run at most twice then flagged throttled, the summed
// wall-clock and CPU time equal to the planted sums, a pending job in no batch; whole — one run with its two scores and
// the drift, the detector's sampler through it, the job processes counted as the runner's own.
import { afterAll, describe, expect, it, vi } from 'vitest';
import { runTier } from '../../src/tiers/runner.js';
import type { MachineSample } from '../../src/timing/contention.js';
import { IDLE_MS } from '../../src/timing/harness.js';
import { SAMPLE_EVERY_MS, type Sampler } from '../../src/timing/sampler.js';
import type { Unit } from '../../src/tiers/types.js';
import { HOST, fixtureManifest, job, plantedExec, quiet, readings, removeTrees, scoreQueue, stubSampler, tree } from './fixture.js';
// (the batched tests below pass idleMs: 0 through readings(); one test runs the batched mode with §12.1's defaults)

afterAll(removeTrees);

const root = (): string => tree({ 'scripts/ok.mjs': '' });

describe('the batched timing mode (C-0097)', () => {
  const plants = {
    u1: { wallMs: 12_000, cpuMs: 30_000 },
    u2: { wallMs: 59_000, cpuMs: 100_000 },
    long: { wallMs: 90_000, cpuMs: 150_000 },
    v1: { wallMs: 1_500, cpuMs: 1_700 },
  };
  const manifest = () =>
    fixtureManifest([job('a', { unitNames: ['u1', 'u2'] }), job('b', { unitNames: ['long'] }), job('c', { unitNames: ['v1'] }), job('waits', { inputs: ['x/absent.json'] })], {
      budget: { ms: 900_000, cores: 8, projected: false },
    });

  it('every unit is one batch with two calibrate scores; each batch ≤ 60 s or flagged long-batch; the sums equal the planted sums', async () => {
    const log: string[] = [];
    const calls: Unit[] = [];
    const r = await runTier(manifest(), { root: root(), out: tree({}), mode: 'batched', exec: plantedExec(plants, calls), ...readings([100, 101], { log }) });
    expect(r.batches.map((b) => [b.job, b.unit])).toEqual([
      ['a', 'u1'],
      ['a', 'u2'],
      ['b', 'long'],
      ['c', 'v1'],
    ]);
    for (const b of r.batches) {
      expect(b.calibration.before).toBe(100);
      expect(b.calibration.after).toBe(101);
      expect(b.calibration.attempts).toBe(1);
      expect(b.wallMs <= 60_000 || b.flags.includes('long-batch')).toBe(true);
    }
    expect(r.batches.find((b) => b.unit === 'long')?.flags).toEqual(['long-batch']);
    expect(r.batches.filter((b) => b.flags.length > 0).map((b) => b.unit)).toEqual(['long']);
    expect(r.wallMs).toBe(12_000 + 59_000 + 90_000 + 1_500);
    expect(r.cpuMs).toBe(30_000 + 100_000 + 150_000 + 1_700);
    expect(r.jobs.map((j) => [j.name, j.wallMs, j.cpuMs])).toEqual([
      ['a', 71_000, 130_000],
      ['b', 90_000, 150_000],
      ['c', 1_500, 1_700],
      ['waits', 0, 0],
    ]);
    // one sampler start and stop per batch (the detector through every batch, C-0103)
    expect(log.filter((l) => l.startsWith('start')).length).toBe(4);
    expect(log.filter((l) => l === 'stop').length).toBe(4);
    // the pending job is in no batch, listed with its reason, and the gating sum says so (C-0121)
    expect(calls.map((u) => u.name)).toEqual(['u1', 'u2', 'long', 'v1']);
    expect(r.pending.map((p) => p.name)).toEqual(['waits']);
    expect(r.covers).toBe('the sum over the 3 built job(s); pending, never run or timed: waits (after-M-1: absent.json)');
    // the normalised figure: each batch by its own score (mean 100.5 ÷ reference 100)
    expect(r.normalised).toBeCloseTo(162_500 / 1.005, 6);
    expect(r.normalisation).toBeCloseTo(1.005, 10);
    expect(r.authority).toBe('authoritative');
    expect(r.mode).toBe('batched');
  });

  it('a planted drift is re-run at most twice, then the batch is flagged throttled; a drift that clears is re-run once and not flagged', async () => {
    // before and after per attempt: u1 drifts on all three attempts (100 → 110); v1 drifts once then agrees
    const queue = [100, 110, 100, 110, 100, 110, /* u1 */ 100, 100, /* u2 */ 100, 100, /* long */ 100, 107, 100, 102 /* v1 */];
    const calls: Unit[] = [];
    const scores: number[] = [];
    const r = await runTier(manifest(), {
      root: root(),
      out: tree({}),
      mode: 'batched',
      exec: plantedExec(plants, calls),
      ...readings([0]),
      calibrate: scoreQueue(queue, scores),
    });
    expect(scores).toEqual([100, 110, 100, 110, 100, 110, 100, 100, 100, 100, 100, 107, 100, 102]);
    const u1 = r.batches.find((b) => b.unit === 'u1');
    expect(u1?.calibration).toEqual({ before: 100, after: 110, drift: 0.1, attempts: 3 });
    expect(u1?.flags).toEqual(['throttled']);
    expect(calls.filter((u) => u.name === 'u1').length).toBe(3); // the unit itself re-run, at most twice more
    const v1 = r.batches.find((b) => b.unit === 'v1');
    expect(v1?.calibration.attempts).toBe(2);
    expect(v1?.flags).toEqual([]);
    expect(calls.filter((u) => u.name === 'v1').length).toBe(2);
    // a re-run batch counts once in the sums: its accepted attempt's figures
    expect(r.wallMs).toBe(162_500);
    expect(r.batches.length).toBe(4);
  });

  it('a contended batch makes the run contended and the budget not gating; the job processes are the runner\'s own', async () => {
    // during the batch the sampler sees a python3 beside the runner (contends) and the unit's own child (does not)
    const during: MachineSample = { ...quiet(), processes: [...quiet().processes, { pid: 900_000, ppid: process.pid, pcpu: 90, comm: 'node' }, { pid: 900_100, ppid: 900_000, pcpu: 80, comm: 'vitest' }, { pid: 4242, ppid: 1, pcpu: 0, comm: 'python3' }] };
    const r = await runTier(fixtureManifest([job('a')]), { root: root(), out: tree({}), mode: 'batched', exec: plantedExec(), ...readings([100, 100]), sampler: stubSampler([], [during]) });
    expect(r.batches[0].reasons).toEqual(['process: python3 (python3, pid 4242)']);
    expect(r.authority).toBe('contended');
    expect(r.budget.gating).toBe(false);
    const own: MachineSample = { ...during, processes: during.processes.filter((p) => p.pid !== 4242) };
    const clean = await runTier(fixtureManifest([job('a')]), { root: root(), out: tree({}), mode: 'batched', exec: plantedExec(), ...readings([100, 100]), sampler: stubSampler([], [own]) });
    expect(clean.batches[0].reasons).toEqual([]);
    expect(clean.authority).toBe('authoritative');
  });

  it('§12.1 by default: 30 s idle before every batch attempt (re-runs included) and the detector sampling every 30 s (C-0097, C-0103)', async () => {
    // The caller passes neither idleMs nor sampleEveryMs (the gating tier:pr figure, M0-t-00). setTimeout and Date are
    // faked, every other reading is a stub that takes no time, so the fake clock moves only by the idle waits: each
    // attempt's sampler must start ≥ 30 000 ms after the previous attempt's sampler stopped (or the run began).
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
    try {
      const t0 = Date.now();
      const log: string[] = [];
      const sampler = (everyMs: number): Promise<Sampler> => {
        log.push(`start ${String(everyMs)} @${String(Date.now() - t0)}`);
        return Promise.resolve({
          stop: () => {
            log.push(`stop @${String(Date.now() - t0)}`);
            return Promise.resolve([]);
          },
        });
      };
      // u1 drifts once (100 → 110) and is re-run: the idle wait precedes the re-run attempt too
      const { idleMs: _noIdle, ...rest } = readings([0]);
      expect(_noIdle).toBe(0); // the fixture's helper sets it; this run drops it
      let settled = false;
      const run = runTier(fixtureManifest([job('a', { unitNames: ['u1', 'u2'] })]), {
        root: root(),
        out: tree({}),
        mode: 'batched',
        exec: plantedExec(),
        ...rest,
        sampler,
        calibrate: scoreQueue([100, 110, 100, 100, 100, 100]),
      }).finally(() => {
        settled = true;
      });
      for (let i = 0; i < 1_000 && !settled; i++) {
        await new Promise((r) => setImmediate(r)); // let real I/O (the status probe, the log files) move
        await vi.advanceTimersToNextTimerAsync();
      }
      const r = await run;
      expect(log).toEqual(['start 30000 @30000', 'stop @30000', 'start 30000 @60000', 'stop @60000', 'start 30000 @90000', 'stop @90000']);
      expect(r.batches.map((b) => [b.unit, b.calibration.attempts])).toEqual([
        ['u1', 2],
        ['u2', 1],
      ]);
      expect([IDLE_MS, SAMPLE_EVERY_MS]).toEqual([30_000, 30_000]);
    } finally {
      vi.useRealTimers();
    }
  });

  it('the batch cap is 60 s by default: a unit at 60 s is not flagged, one at 60.001 s is long-batch', async () => {
    const r = await runTier(fixtureManifest([job('a', { unitNames: ['at60', 'over60'] })]), {
      root: root(),
      out: tree({}),
      mode: 'batched',
      exec: plantedExec({ at60: { wallMs: 60_000, cpuMs: 1 }, over60: { wallMs: 60_001, cpuMs: 1 } }),
      ...readings([100, 100]),
    });
    expect(r.batches.map((b) => [b.unit, b.flags])).toEqual([
      ['at60', []],
      ['over60', ['long-batch']],
    ]);
  });
});

describe('the whole timing mode (C-0097)', () => {
  it('records one run with its two calibrate scores and their drift, the sampler started once and stopped once', async () => {
    const log: string[] = [];
    const scores: number[] = [];
    const calls: Unit[] = [];
    const r = await runTier(fixtureManifest([job('a', { unitNames: ['a1', 'a2'] }), job('b')]), {
      root: root(),
      out: tree({}),
      mode: 'whole',
      exec: plantedExec({ a1: { wallMs: 1_000, cpuMs: 2_000 }, a2: { wallMs: 3_000, cpuMs: 4_000 }, b: { wallMs: 5_000, cpuMs: 6_000 } }, calls),
      ...readings([100, 104], { log, calls: scores }),
    });
    expect(scores).toEqual([100, 104]);
    expect(r.calibration).toEqual({ before: 100, after: 104, drift: 0.04 });
    expect(log).toEqual(['start 30000', 'stop']);
    expect(calls.map((u) => u.name)).toEqual(['a1', 'a2', 'b']);
    expect(r.batches).toEqual([]);
    expect([r.wallMs, r.cpuMs]).toEqual([9_000, 12_000]);
    expect(r.normalisation).toBeCloseTo(1.02, 10);
    expect(r.authority).toBe('authoritative');
    expect(r.host).toBe(HOST);
  });

  it('a drift over 5 % is reported and contends the run (never repeated here: the repeat is M0-t-00\'s script)', async () => {
    const scores: number[] = [];
    const r = await runTier(fixtureManifest([job('a')]), { root: root(), out: tree({}), mode: 'whole', exec: plantedExec(), ...readings([100, 110], { calls: scores }) });
    expect(scores).toEqual([100, 110]);
    expect(r.calibration?.drift).toBeCloseTo(0.1, 10);
    expect(r.authority).toBe('contended');
    expect(r.reasons).toEqual(['calibrate drift 10.0 % > 5 %']);
  });

  it("the detector's samples through the run count every other process, never the job processes", async () => {
    const child = { pid: 900_000, ppid: process.pid, pcpu: 95, comm: 'node' };
    const grandchild = { pid: 900_001, ppid: 900_000, pcpu: 95, comm: 'tsc' };
    const chrome = { pid: 5150, ppid: 1, pcpu: 1, comm: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' };
    const during: MachineSample = { ...quiet(), processes: [...quiet().processes, child, grandchild] };
    const own = await runTier(fixtureManifest([job('a')]), { root: root(), out: tree({}), mode: 'whole', exec: plantedExec(), ...readings([100, 100]), sampler: stubSampler([], [during]) });
    expect(own.reasons).toEqual([]);
    const other = await runTier(fixtureManifest([job('a')]), { root: root(), out: tree({}), mode: 'whole', exec: plantedExec(), ...readings([100, 100]), sampler: stubSampler([], [{ ...during, processes: [...during.processes, chrome] }]) });
    expect(other.authority).toBe('contended');
    expect(other.reasons.length).toBe(1);
    expect(other.reasons[0]).toMatch(/^process: chrome/);
  });
});
