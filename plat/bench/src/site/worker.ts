// The worker thread of the site spike's task pool (M0-e-06; pool.ts): each message is one derivation; the reply is its
// receipts and its stage times.
import { parentPort } from 'node:worker_threads';
import { runSpikeTask, type SpikeTask } from './pool.js';

parentPort?.on('message', (m: { at: number; task: SpikeTask }) => {
  parentPort?.postMessage({ at: m.at, result: runSpikeTask(m.task) });
});
