// The pool with a planted dying worker (pool-exit-worker.ts), run by pool.test.ts in a process of its own (tsx with the
// plat-source condition; vitest cannot load a worker's .ts). It prints how runNgTasks settled: rejected with its
// message, or resolved. Without the pool's `exit` handler the promise never settles (the process ends on its unsettled
// top-level await, exit 13). Its faces are built in memory; no input file is read.
import { runNgTask, runNgTasks, type NgTask } from '../../src/bentcut-ng/index.js';
import { threeFaces } from './support.js';

const tasks: NgTask[] = [];
for (let s = 0; s < 2; s += 1) for (const face of threeFaces()) tasks.push({ face, seed: 1, seedIndex: s, bars: false });
let settled: { rejected?: string; resolved?: number };
try {
  const r = await runNgTasks(tasks, 2, 1, undefined, runNgTask, new URL('./pool-exit-worker.ts', import.meta.url));
  settled = { resolved: r.length };
} catch (e) {
  settled = { rejected: e instanceof Error ? e.message : String(e) };
}
process.stdout.write(`${JSON.stringify(settled)}\n`);
