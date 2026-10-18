// The pool's worker-thread path, run by pool.test.ts in a process of its own (tsx with the plat-source condition, as
// `corepack pnpm bench` runs the harness; vitest cannot load a worker's .ts). It runs the same NG face tasks — three
// synthetic faces, two seeds — in this thread and across two worker threads, and prints both record lists as JSON.
import { runNgTask, runNgTasks, type NgTask } from '../../src/bentcut-ng/index.js';
import { threeFaces } from './support.js';

const tasks: NgTask[] = [];
for (let s = 0; s < 2; s += 1) for (const face of threeFaces()) tasks.push({ face, seed: 1, seedIndex: s, bars: true });
const inThread = tasks.map(runNgTask);
const pooled = await runNgTasks(tasks, 2, 1);
process.stdout.write(`${JSON.stringify({ inThread, pooled })}\n`);
