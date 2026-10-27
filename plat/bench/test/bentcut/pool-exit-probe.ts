// The task pool with a planted dying worker (pool-exit-worker.ts), run by pool.test.ts in a process of its own (tsx with
// the plat-source condition; vitest cannot load a worker's .ts). It prints how runTasks settled: rejected with its
// message, or resolved. Without the pool's `exit` handler the promise never settles (the process ends on its unsettled
// top-level await, exit 13). Its six tasks are never run (the planted worker answers placeholders); no input file is read.
import { runTask, runTasks, type Task } from '../../src/bentcut/index.js';

const tasks: Task[] = [];
for (let i = 0; i < 6; i += 1) tasks.push({ phase: 'fcut', kind: i % 2 === 0 ? 'concave' : 'holed', i, seed: 1 });
let settled: { rejected?: string; resolved?: number };
try {
  const r = await runTasks(tasks, 2, 1, undefined, runTask, new URL('./pool-exit-worker.ts', import.meta.url));
  settled = { resolved: r.length };
} catch (e) {
  settled = { rejected: e instanceof Error ? e.message : String(e) };
}
process.stdout.write(`${JSON.stringify(settled)}\n`);
