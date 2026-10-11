// The seed pool (M0-c-06; M0-b-04's pattern, C-0242 (7)): the tasks — one (seed, run) each — run in order in this thread
// (one worker), or one at a time across worker threads, each record put back at its task's place; so the records, and
// the report folded from them, are the same for any number of workers. A worker loads worker.ts through the loader the
// dispatcher runs under (tsx with the plat-source condition; Node hands a worker the parent's execArgv); a vitest run
// uses one worker (in this thread).
import { Worker } from 'node:worker_threads';
import { measure, type SeedRecord } from './measure.js';
import { derive, type FixtureSize, type RunKind } from './runs.js';

/** One task: a seed's run at a size. */
export interface Task extends FixtureSize {
  readonly seed: number;
  readonly run: RunKind;
}

/** A task's record: the run derived and measured. */
export function runTask(t: Task): SeedRecord {
  const d = derive(t.run, t.seed, { ...(t.frameHa === undefined ? {} : { frameHa: t.frameHa }), ...(t.walledHa === undefined ? {} : { walledHa: t.walledHa }) });
  return measure(d);
}

/** Runs the tasks and returns their records in task order (a test's `runner` runs them all in this thread). */
export async function runTasks(tasks: readonly Task[], workers: number, progress?: (done: number, total: number) => void, runner: (t: Task) => SeedRecord = runTask): Promise<SeedRecord[]> {
  if (workers <= 1 || tasks.length <= 1 || runner !== runTask) {
    const out: SeedRecord[] = [];
    for (const t of tasks) {
      out.push(runner(t));
      progress?.(out.length, tasks.length);
    }
    return out;
  }
  const out: SeedRecord[] = new Array<SeedRecord>(tasks.length);
  let next = 0;
  let done = 0;
  const pool = Math.min(workers, tasks.length);
  await new Promise<void>((resolve, reject) => {
    let live = pool;
    let failed = false;
    const all: Worker[] = [];
    for (let w = 0; w < pool; w += 1) {
      const worker = new Worker(new URL('./worker.ts', import.meta.url));
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
      worker.on('message', (m: { at: number; record: SeedRecord }) => {
        out[m.at] = m.record;
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
