// The detector's sampler through a batch (C-0103: "sampled every 30 s through every batch and tier run"). A batch's
// workload may hold the main thread for up to 60 s, so the samples are taken on a worker thread of this process: it
// runs `ps` (and `pmset`) every `everyMs` and posts the raw readings, which the main thread judges after the batch.
// The worker's probes are children of this process, so the detector never counts them.
// The worker's life is followed by its three events, so every wait settles (fix round 1, checks/M0-f-01.md F-2; C-0139):
// the start and stop()'s handshake each end on the worker's answer or on its death — an uncaught error, or an exit
// before it answered stop — and a dead worker makes stop() reject with the cause, so a batch whose sampler died fails
// instead of hanging the timing phase. stop() runs its handshake once; a second call answers as the first.
import { Worker } from 'node:worker_threads';
import { parsePower, parsePs, type MachineSample } from './contention.js';

interface RawSample {
  at: string;
  loadAverage: number;
  ps: string | null;
  batt: string | null;
}

/** The detector's sampling period through a batch (C-0103: every 30 s). */
export const SAMPLE_EVERY_MS = 30_000;

/** The worker's source: plain JavaScript evaluated by the worker (CommonJS: `eval: true`). */
export const SAMPLER_WORKER_SOURCE = `
const { parentPort, workerData } = require('node:worker_threads');
const { execFileSync } = require('node:child_process');
const { loadavg } = require('node:os');
const env = { ...process.env, LC_ALL: 'C' };
const read = (file, args) => {
  try { return execFileSync(file, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], env, maxBuffer: 64 * 1024 * 1024 }); }
  catch { return null; }
};
const sample = () => parentPort.postMessage({
  at: new Date().toISOString(),
  loadAverage: loadavg()[0],
  ps: read(workerData.ps, ['-axo', 'pid,ppid,pcpu,comm']),
  batt: workerData.pmset === null ? null : read(workerData.pmset, ['-g', 'batt']),
});
const timer = setInterval(sample, workerData.everyMs);
parentPort.on('message', (m) => {
  if (m === 'stop') { clearInterval(timer); parentPort.postMessage('stopped'); parentPort.close(); }
});
parentPort.postMessage('started');
`;

export interface Sampler {
  /**
   * Stops the sampler and returns every reading it took, in order; rejects with the cause when the worker has died
   * (it never hangs). A second call answers as the first.
   */
  stop(): Promise<MachineSample[]>;
}

export interface SamplerOptions {
  /** The sampling period (default SAMPLE_EVERY_MS). */
  everyMs?: number;
  /** A test hook: the worker's source (default SAMPLER_WORKER_SOURCE); the tests plant a worker that dies. */
  source?: string;
}

/**
 * Starts sampling every `everyMs` (default SAMPLE_EVERY_MS, 30 000) on a worker thread; resolves once the worker runs
 * and rejects when it dies before it started.
 */
export async function startSampler(opts: SamplerOptions = {}): Promise<Sampler> {
  const everyMs = opts.everyMs ?? SAMPLE_EVERY_MS;
  if (!(everyMs > 0)) throw new Error(`sampler: everyMs ${everyMs} must be positive`);
  const darwin = process.platform === 'darwin';
  const worker = new Worker(opts.source ?? SAMPLER_WORKER_SOURCE, {
    eval: true,
    workerData: { everyMs, ps: darwin ? '/bin/ps' : 'ps', pmset: darwin ? '/usr/bin/pmset' : null },
  });
  const raw: RawSample[] = [];
  // `failure` is set once the worker errs, or exits before it answered stop (a death before the start included);
  // `wake` re-checks whichever wait is open — the start, or stop()'s handshake.
  let failure: Error | null = null;
  let started = false;
  let answered = false;
  let wake = (): void => undefined;
  const failed = (): Error | null => failure;
  worker.on('message', (m: unknown) => {
    if (m === 'started') started = true;
    else if (m === 'stopped') answered = true;
    else {
      raw.push(m as RawSample);
      return;
    }
    wake();
  });
  worker.on('error', (e: Error) => {
    failure ??= e;
    wake();
  });
  worker.on('exit', (code: number) => {
    if (!answered) failure ??= new Error(`sampler: the worker exited (code ${code}) before ${started ? 'stop() was answered' : 'it started'}`);
    wake();
  });
  /** Resolves once `done()` holds or the worker has failed. */
  const until = (done: () => boolean): Promise<void> =>
    new Promise((resolve) => {
      wake = () => {
        if (done() || failure !== null) resolve();
      };
      wake();
    });

  await until(() => started);
  const early = failed();
  if (early !== null) {
    await worker.terminate();
    throw early;
  }

  const finish = async (): Promise<MachineSample[]> => {
    if (failed() === null) {
      worker.postMessage('stop');
      await until(() => answered);
    }
    await worker.terminate();
    const dead = failed();
    if (dead !== null) throw dead;
    const out: MachineSample[] = [];
    for (const r of raw) {
      if (r.ps === null) throw new Error(`sampler: ps failed at ${r.at}`);
      out.push({
        at: r.at,
        loadAverage: r.loadAverage,
        processes: parsePs(r.ps),
        power: darwin ? parsePower(r.batt) : 'unknown',
        selfPid: process.pid,
      });
    }
    return out;
  };
  let stopping: Promise<MachineSample[]> | null = null;
  return { stop: () => (stopping ??= finish()) };
}
