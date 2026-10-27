// The NG face tasks' pool (M0-b-05; M0-b-04's rule, C-0242 (7)): the records do not depend on the worker count. The
// worker-thread path runs in a process of its own (pool-probe.ts under tsx), which reads no input file — its faces are
// built in memory.
import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';
import { PLAT_ROOT, runNgTasks, type NgRecord, type NgTask } from '../../src/bentcut-ng/index.js';
import { threeFaces } from './support.js';

describe('runNgTasks', () => {
  it('gives the same records in task order across two worker threads as in this thread', { timeout: 600_000 }, () => {
    const p = spawnSync('corepack', ['pnpm', '--silent', 'exec', 'tsx', '--conditions=plat-source', 'bench/test/bentcut-ng/pool-probe.ts'], { cwd: PLAT_ROOT, encoding: 'utf8', timeout: 540_000 });
    expect([p.status, p.stderr.slice(0, 400)]).toEqual([0, '']);
    const out = JSON.parse(p.stdout) as { inThread: NgRecord[]; pooled: NgRecord[] };
    expect(out.pooled.length).toBe(6);
    expect(out.pooled).toEqual(out.inThread);
    expect(out.pooled.map((r) => [r.faceId, r.seedIndex])).toEqual([[7, 0], [8, 0], [9, 0], [7, 1], [8, 1], [9, 1]]);
    // The two seeds differ (each face's derivation seed is its own).
    expect(out.pooled[0].cuts).not.toEqual(out.pooled[3].cuts);
  });

  it('a worker that exits without an error event fails the run, naming the exit — never hangs (hardening S1, note 5)', { timeout: 600_000 }, () => {
    const probe = (mode: string) => {
      const p = spawnSync('corepack', ['pnpm', '--silent', 'exec', 'tsx', '--conditions=plat-source', 'bench/test/bentcut-ng/pool-exit-probe.ts'], {
        cwd: PLAT_ROOT,
        encoding: 'utf8',
        timeout: 120_000,
        env: { ...process.env, PLAT_TEST_POOL_EXIT: mode },
      });
      return { status: p.status, err: p.stderr.slice(0, 400), out: p.stdout.trim() };
    };
    // On its first chunk, with code 3 (an out-of-memory kill's shape) and with code 0: no records came back.
    expect(probe('first')).toEqual({ status: 0, err: '', out: JSON.stringify({ rejected: 'bentcut-ng: a pool worker exited (code 3) before the pool retired it; 0 of 6 tasks done' }) });
    expect(probe('zero')).toEqual({ status: 0, err: '', out: JSON.stringify({ rejected: 'bentcut-ng: a pool worker exited (code 0) before the pool retired it; 0 of 6 tasks done' }) });
    // After answering a chunk each, the two workers die on their next: the run fails, the done count named.
    const second = probe('second');
    expect([second.status, second.err]).toEqual([0, '']);
    expect(second.out).toMatch(/^\{"rejected":"bentcut-ng: a pool worker exited \(code 3\) before the pool retired it; [12] of 6 tasks done"\}$/);
  });

  it('runs a test\'s runner in this thread, in task order, whatever the worker count', async () => {
    const tasks: NgTask[] = threeFaces().map((face, i) => ({ face, seed: 1, seedIndex: i, bars: false }));
    const seen: number[] = [];
    const runner = (t: NgTask): NgRecord => {
      seen.push(t.face.id);
      return { faceId: t.face.id } as NgRecord;
    };
    const r = await runNgTasks(tasks, 4, 1, undefined, runner);
    expect(seen).toEqual([7, 8, 9]);
    expect(r.map((x) => x.faceId)).toEqual([7, 8, 9]);
  });
});
