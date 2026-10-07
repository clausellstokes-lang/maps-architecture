// The worker thread of the NG face tasks' pool (M0-b-05; pool.ts): each message is a chunk of tasks; the reply is their
// records.
import { parentPort } from 'node:worker_threads';
import { runNgTask, type NgTask } from './ngruns.js';

parentPort?.on('message', (c: { at: number; tasks: NgTask[] }) => {
  parentPort?.postMessage({ at: c.at, records: c.tasks.map(runNgTask) });
});
