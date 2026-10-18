// The site spike's task pool (M0-e-06; M0-b-04's pattern, C-0242 (7)): each task is one derivation (a fixture, a
// configuration, a seed); tasks run in order in this thread (one worker) or in chunks of one across worker threads,
// each result put back at its task's place — so the records, and every fold over them, are the same for any number of
// workers. A worker loads worker.ts through the loader the dispatcher runs under (tsx with the plat-source condition).
import { Worker } from 'node:worker_threads';
import { deriveSpike, type SpikeConfig } from './compose.js';
import { fixtureNamed, type SiteFixture, type SpikeSize } from './fixtures.js';
import { runRecord, type RunRecord } from './receipts.js';
import { stageTimesOf, type StageTimes } from './timing.js';

/** One derivation to run. */
export interface SpikeTask {
  readonly fixture: string;
  readonly config: SpikeConfig;
  readonly seed: number;
  readonly size: SpikeSize;
}

/** A derivation's receipts and its stage times. */
export interface SpikeResult {
  readonly record: RunRecord;
  readonly times: StageTimes;
}

/** Runs one task in this thread (a fixture named by the task, or one passed by a test). */
export function runSpikeTask(t: SpikeTask, fixtures: readonly SiteFixture[] = []): SpikeResult {
  const f = fixtures.find((x) => x.name === t.fixture) ?? fixtureNamed(t.fixture);
  if (f === undefined) throw new Error(`site spike: no fixture named ${t.fixture}`);
  const d = deriveSpike(f, t.seed, t.config, t.size);
  return { record: runRecord(d), times: stageTimesOf(d) };
}

/** The worker thread's module (worker.ts, loaded through the dispatcher's tsx loader). */
export const SPIKE_WORKER_URL = new URL('./worker.ts', import.meta.url);

/**
 * Runs the tasks and returns their results in task order, whatever order the workers finish in. `fixtures` (a test's)
 * run in this thread only. `workerUrl` is the worker's module — worker.ts unless a test plants one that answers
 * `{ at, task }` with `{ at, result }` in an order it chooses (C-0275 (1)).
 */
export async function runSpikeTasks(tasks: readonly SpikeTask[], workers: number, progress?: (done: number, total: number) => void, fixtures: readonly SiteFixture[] = [], workerUrl: URL = SPIKE_WORKER_URL): Promise<SpikeResult[]> {
  if (workers <= 1 || tasks.length <= 1 || fixtures.length > 0) {
    const out: SpikeResult[] = [];
    for (const t of tasks) {
      out.push(runSpikeTask(t, fixtures));
      progress?.(out.length, tasks.length);
    }
    return out;
  }
  const out: SpikeResult[] = new Array<SpikeResult>(tasks.length);
  let next = 0;
  let done = 0;
  const pool = Math.min(workers, tasks.length);
  await new Promise<void>((resolve, reject) => {
    let live = pool;
    let failed = false;
    const all: Worker[] = [];
    for (let w = 0; w < pool; w += 1) {
      const worker = new Worker(workerUrl);
      all.push(worker);
      const give = (): void => {
        if (failed) return;
        if (next >= tasks.length) {
          void worker.terminate();
          live -= 1;
          if (live === 0) resolve();
          return;
        }
        const at = next;
        next += 1;
        worker.postMessage({ at, task: tasks[at] });
      };
      worker.on('message', (m: { at: number; result: SpikeResult }) => {
        out[m.at] = m.result;
        done += 1;
        progress?.(done, tasks.length);
        give();
      });
      worker.on('error', (e) => {
        failed = true;
        for (const x of all) void x.terminate();
        reject(e);
      });
      give();
    }
  });
  return out;
}
