// The worker thread of the seed pool (M0-c-06; pool.ts): each message is one task; the reply is its record.
import { parentPort } from 'node:worker_threads';
import { runTask, type Task } from './pool.js';

parentPort?.on('message', (m: { at: number; task: Task }) => {
  parentPort?.postMessage({ at: m.at, record: runTask(m.task) });
});
