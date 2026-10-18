// M0-f-01's sampler tests (C-0103's "sampled every 30 s through every batch", C-0138 (6)'s worker sampler; fix round 1,
// checks/M0-f-01.md F-1 (b) and F-2). Every sample taken through a batch reads EVERY process on the machine — other
// users' processes among them, not only this user's; and stop() settles on every path of the worker's life: answered on
// the normal path (once, however often it is called), rejected — never hung — when the worker has died before or
// during the stop, whether by an uncaught error or by an exit. The deaths are planted through the `source` test hook.
// Fix round 2 (the checker's note N-r1-3; C-0141): the default period as the worker receives it, and each sample's power
// read from the worker's own pmset reading (a planted battery reading, and none), pinned through the same hook.
import { describe, expect, it } from 'vitest';
import { SAMPLE_EVERY_MS, SAMPLER_WORKER_SOURCE, startSampler, type Sampler } from '../../src/timing/sampler.js';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

/** Settles with `p`, or rejects with "HANG …" after `ms` — the bound every test of a dying worker holds stop() to. */
async function within<T>(p: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const hang = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`HANG: no answer within ${ms} ms`)), ms);
  });
  try {
    return await Promise.race([p, hang]);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * The real worker with a death planted `afterMs` after it started. The tests sample every 10 s so no ps call holds the
 * worker's thread, start the death 300 ms after 'started' (so the start is answered first) and call stop() 1.5 s later.
 */
const dying = (death: string, afterMs: number): string => `${SAMPLER_WORKER_SOURCE}\nsetTimeout(() => { ${death} }, ${afterMs});\n`;

describe('the batch sampler reads every process on the machine (C-0103)', () => {
  it('the default period is 30 s; every sample holds launchd (pid 1, root\'s), more than 100 rows and this process', async () => {
    expect(SAMPLE_EVERY_MS).toBe(30_000);
    const s = await startSampler({ everyMs: 100 });
    await sleep(1_500); // a loaded machine's ps takes hundreds of ms: at least one sample is certain, more are likely
    const samples = await within(s.stop(), 10_000);
    expect(samples.length).toBeGreaterThanOrEqual(1);
    for (const m of samples) {
      // ps -axo: every user's processes (ps -xo would hold this user's alone, without launchd)
      expect(m.processes.find((r) => r.pid === 1)?.comm).toBe('/sbin/launchd');
      expect(m.processes.length).toBeGreaterThan(100);
      expect(m.processes.some((r) => r.pid === process.pid)).toBe(true);
      expect(m.selfPid).toBe(process.pid);
      expect(m.power).not.toBe('unknown');
    }
    expect([...samples.map((m) => m.at)].sort()).toEqual(samples.map((m) => m.at)); // in order
  }, 20_000);

  it('rejects a non-positive period', async () => {
    await expect(startSampler({ everyMs: 0 })).rejects.toThrow(/everyMs 0/);
  });

  it('with no period the worker is handed 30 000 ms and takes no sample in its first 1.5 s (fix round 2, note N-r1-3)', async () => {
    // the period as the worker receives it, read back through the source hook: one planted message after the start
    const probe = `${SAMPLER_WORKER_SOURCE}\nparentPort.postMessage({ at: 'everyMs ' + workerData.everyMs, loadAverage: 0, ps: '', batt: null });\n`;
    const handed = await within((await startSampler({ source: probe })).stop(), 10_000);
    expect(handed.map((m) => m.at)).toEqual([`everyMs ${SAMPLE_EVERY_MS}`]);
    const real = await startSampler();
    await sleep(1_500);
    expect(await within(real.stop(), 10_000)).toEqual([]);
  }, 20_000);

  it('each sample\'s power is the worker\'s own pmset reading, never assumed: a planted battery reading is battery, none is unknown (note N-r1-3)', async () => {
    const PMSET_CALL = "read(workerData.pmset, ['-g', 'batt'])";
    expect(SAMPLER_WORKER_SOURCE).toContain(PMSET_CALL);
    for (const [reading, power] of [[JSON.stringify("Now drawing from 'Battery Power'\n -InternalBattery-0 (id=1)\t84%; discharging"), 'battery'], ['null', 'unknown']] as const) {
      const s = await startSampler({ everyMs: 100, source: SAMPLER_WORKER_SOURCE.replace(PMSET_CALL, reading) });
      await sleep(1_000);
      const samples = await within(s.stop(), 10_000);
      expect(samples.length).toBeGreaterThanOrEqual(1);
      for (const m of samples) expect(m.power).toBe(power);
    }
  }, 30_000);
});

describe('stop() settles on every path of the worker\'s life (F-2)', () => {
  it('the normal path: stop() answers with the samples; a second stop() answers the same, without a second handshake', async () => {
    const s = await startSampler({ everyMs: 50 });
    await sleep(1_000);
    const first = await within(s.stop(), 10_000);
    expect(first.length).toBeGreaterThanOrEqual(1);
    const second = await within(s.stop(), 2_000);
    expect(second).toBe(first);
  }, 20_000);

  it('a worker that dies of an uncaught error after it started: stop() rejects with that error within the bound', async () => {
    const s: Sampler = await startSampler({ everyMs: 10_000, source: dying("throw new Error('worker died');", 300) });
    await sleep(1_500); // the worker is dead before stop() is called
    const t0 = Date.now();
    await expect(within(s.stop(), 5_000)).rejects.toThrow('worker died');
    expect(Date.now() - t0).toBeLessThan(5_000);
  }, 20_000);

  it('a worker that exits without an error after it started: stop() rejects naming the exit, within the bound', async () => {
    const s = await startSampler({ everyMs: 10_000, source: dying('process.exit(3);', 300) });
    await sleep(1_500);
    await expect(within(s.stop(), 5_000)).rejects.toThrow(/sampler: the worker exited \(code 3\) before stop\(\) was answered/);
  }, 20_000);

  it('a worker that dies while stop() waits for its answer: stop() rejects within the bound', async () => {
    // the worker ignores 'stop' and dies 300 ms after it started — during the handshake
    const deaf = `${SAMPLER_WORKER_SOURCE.replace("if (m === 'stop')", "if (m === 'never')")}\nsetTimeout(() => { throw new Error('died mid-stop'); }, 300);\n`;
    expect(deaf).not.toBe(SAMPLER_WORKER_SOURCE);
    const s = await startSampler({ everyMs: 10_000, source: deaf });
    await expect(within(s.stop(), 5_000)).rejects.toThrow('died mid-stop');
  }, 20_000);

  it('a worker that dies before it started: the start rejects, by an error or by an exit', async () => {
    await expect(within(startSampler({ source: "throw new Error('no start');" }), 5_000)).rejects.toThrow('no start');
    await expect(within(startSampler({ source: 'process.exit(4);' }), 5_000)).rejects.toThrow(/sampler: the worker exited \(code 4\) before it started/);
  }, 20_000);
});
