// The detector's sampler through a batch (C-0103: "sampled every 30 s through every batch and tier run"). A batch's
// workload may hold the main thread for up to 60 s, so the samples are taken on a worker thread of this process: it
// runs `ps` (and `pmset`) every `everyMs` and posts the raw readings, which the main thread judges after the batch.
// The worker's probes are children of this process, so the detector never counts them.
import { Worker } from 'node:worker_threads';
import { parsePower, parsePs, type MachineSample } from './contention.js';

interface RawSample {
  at: string;
  loadAverage: number;
  ps: string | null;
  batt: string | null;
}

// Plain JavaScript evaluated by the worker (CommonJS: `eval: true`).
const WORKER = `
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
  /** Stops the sampler and returns every reading it took, in order. */
  stop(): Promise<MachineSample[]>;
}

/** Starts sampling every `everyMs` (default 30 000) on a worker thread; resolves once the worker runs. */
export async function startSampler(opts: { everyMs?: number } = {}): Promise<Sampler> {
  const everyMs = opts.everyMs ?? 30_000;
  if (!(everyMs > 0)) throw new Error(`sampler: everyMs ${everyMs} must be positive`);
  const darwin = process.platform === 'darwin';
  const worker = new Worker(WORKER, {
    eval: true,
    workerData: { everyMs, ps: darwin ? '/bin/ps' : 'ps', pmset: darwin ? '/usr/bin/pmset' : null },
  });
  const raw: RawSample[] = [];
  let failure: Error | null = null;
  let onStopped: (() => void) | null = null;
  await new Promise<void>((resolve, reject) => {
    worker.on('message', (m: unknown) => {
      if (m === 'started') resolve();
      else if (m === 'stopped') onStopped?.();
      else raw.push(m as RawSample);
    });
    worker.on('error', (e) => {
      failure = e;
      reject(e);
      onStopped?.();
    });
  });
  return {
    async stop(): Promise<MachineSample[]> {
      await new Promise<void>((resolve) => {
        onStopped = resolve;
        worker.postMessage('stop');
      });
      await worker.terminate();
      if (failure !== null) throw failure;
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
    },
  };
}
