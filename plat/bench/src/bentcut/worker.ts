// The worker thread of the task pool (M0-b-04; pool.ts): each message is a chunk of tasks; the reply is their records.
import { parentPort } from 'node:worker_threads';
import { runTask, type Task } from './runs.js';

parentPort?.on('message', (c: { at: number; tasks: Task[] }) => {
  parentPort?.postMessage({ at: c.at, records: c.tasks.map(runTask) });
});
