// The task pool (M0-b-04; C-0242 (7)): tasks run in order in this thread (one worker), or in chunks across worker
// threads, each chunk's records put back at the chunk's place — so the records, and every fold over them, are the same
// for any number of workers. A worker thread loads worker.ts through the loader the dispatcher runs under (tsx with the
// plat-source condition; Node hands a worker the parent's execArgv); a vitest run uses one worker (in this thread).
//
// A worker that ends before the pool retires it — an `error` event, or an `exit` with no error event (an
// out-of-memory kill, a process.exit in the thread) — fails the run: the other workers are terminated and the promise
// rejects naming the exit, never hangs (hardening round S3, N-8; M0-b-05's pool, its note 5, the same shape).
import { Worker } from 'node:worker_threads';
import { runTask, type FaceRecord, type Task } from './runs.js';

/** The worker thread's module (a test hands the pool another to plant a dying worker). */
const WORKER_URL = new URL('./worker.ts', import.meta.url);

/** Runs the tasks and returns their records in task order (a test's `runner` runs them all in this thread). */
export async function runTasks(
  tasks: readonly Task[],
  workers: number,
  chunk: number,
  progress?: (done: number, total: number) => void,
  runner: (t: Task) => FaceRecord = runTask,
  workerUrl: URL = WORKER_URL,
): Promise<FaceRecord[]> {
  if (workers <= 1 || tasks.length <= chunk || runner !== runTask) {
    const out: FaceRecord[] = [];
    for (const t of tasks) {
      out.push(runner(t));
      if (progress !== undefined && out.length % chunk === 0) progress(out.length, tasks.length);
    }
    return out;
  }
  const chunks: { at: number; tasks: Task[] }[] = [];
  for (let at = 0; at < tasks.length; at += chunk) chunks.push({ at, tasks: tasks.slice(at, at + chunk) });
  const out: FaceRecord[] = new Array<FaceRecord>(tasks.length);
  let next = 0;
  let done = 0;
  const pool = Math.min(workers, chunks.length);
  await new Promise<void>((resolve, reject) => {
    let live = pool;
    let settled = false;
    const all: Worker[] = [];
    const retired = new Set<Worker>();
    const fail = (e: Error): void => {
      if (settled) return;
      settled = true;
      for (const x of all) {
        retired.add(x);
        void x.terminate();
      }
      reject(e);
    };
    for (let w = 0; w < pool; w += 1) {
      const worker = new Worker(workerUrl);
      all.push(worker);
      const give = (): void => {
        if (settled) return;
        const c = chunks[next];
        if (c === undefined) {
          retired.add(worker);
          void worker.terminate();
          live -= 1;
          if (live === 0) {
            settled = true;
            resolve();
          }
          return;
        }
        next += 1;
        worker.postMessage(c);
      };
      worker.on('message', (m: { at: number; records: FaceRecord[] }) => {
        if (settled) return;
        for (let i = 0; i < m.records.length; i += 1) out[m.at + i] = m.records[i];
        done += m.records.length;
        if (progress !== undefined) progress(done, tasks.length);
        give();
      });
      worker.on('error', (e) => fail(e));
      worker.on('exit', (code) => {
        if (retired.has(worker)) return;
        fail(new Error(`bentcut: a pool worker exited (code ${String(code)}) before the pool retired it; ${String(done)} of ${String(tasks.length)} tasks done`));
      });
      give();
    }
  });
  return out;
}
