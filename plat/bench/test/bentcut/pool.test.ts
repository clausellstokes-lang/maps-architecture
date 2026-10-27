// The task pool (M0-b-04; C-0242 (7)) and its dying workers (hardening round S3, N-8; M0-b-05's pool, its note 5, the
// same shape): a worker that ends before the pool retires it — with no `error` event, as an out-of-memory kill does —
// fails the run naming the exit, and never hangs. The worker-thread path runs in a process of its own
// (pool-exit-probe.ts under tsx), with a planted worker (pool-exit-worker.ts) that runs no task.
import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';
import { PLAT_ROOT, runTasks, type FaceRecord, type Task } from '../../src/bentcut/index.js';

describe('runTasks', () => {
  it('a worker that exits without an error event fails the run, naming the exit — never hangs (hardening S3, N-8)', { timeout: 600_000 }, () => {
    const probe = (mode: string) => {
      const p = spawnSync('corepack', ['pnpm', '--silent', 'exec', 'tsx', '--conditions=plat-source', 'bench/test/bentcut/pool-exit-probe.ts'], {
        cwd: PLAT_ROOT,
        encoding: 'utf8',
        timeout: 120_000,
        env: { ...process.env, PLAT_TEST_POOL_EXIT: mode },
      });
      return { status: p.status, err: p.stderr.slice(0, 400), out: p.stdout.trim() };
    };
    // On its first chunk, with code 3 (an out-of-memory kill's shape) and with code 0: no records came back.
    expect(probe('first')).toEqual({ status: 0, err: '', out: JSON.stringify({ rejected: 'bentcut: a pool worker exited (code 3) before the pool retired it; 0 of 6 tasks done' }) });
    expect(probe('zero')).toEqual({ status: 0, err: '', out: JSON.stringify({ rejected: 'bentcut: a pool worker exited (code 0) before the pool retired it; 0 of 6 tasks done' }) });
    // After answering a chunk each, the two workers die on their next: the run fails, the done count named.
    const second = probe('second');
    expect([second.status, second.err]).toEqual([0, '']);
    expect(second.out).toMatch(/^\{"rejected":"bentcut: a pool worker exited \(code 3\) before the pool retired it; [12] of 6 tasks done"\}$/);
  });

  it('runs a test’s runner in this thread, in task order, whatever the worker count', async () => {
    const tasks: Task[] = [0, 1, 2].map((i) => ({ phase: 'fcut', kind: 'concave', i, seed: 1 }));
    const seen: number[] = [];
    const runner = (t: Task): FaceRecord => {
      seen.push(t.i);
      return { phase: 'fcut', kind: t.kind, i: t.i } as FaceRecord;
    };
    const r = await runTasks(tasks, 4, 1, undefined, runner);
    expect(seen).toEqual([0, 1, 2]);
    expect(r.map((x) => x.i)).toEqual([0, 1, 2]);
  });
});
