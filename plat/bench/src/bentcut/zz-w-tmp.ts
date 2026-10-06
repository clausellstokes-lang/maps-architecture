import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { seedFamily } from '@plat/testkit';
const x: number = 1;
if (isMainThread) {
  const w = new Worker(new URL(import.meta.url), { workerData: 5 });
  w.on('message', (m) => { console.log('main got', m, process.execArgv); w.terminate(); });
  w.on('error', (e) => console.log('ERR', e.message));
} else {
  parentPort!.postMessage({ v: (workerData as number) + x, s: seedFamily('a', 1) });
}
