// The runner judges a Node leg's answer, not only the leg's honesty (M0-d-06, hardening round S1, row 1; note 1 of
// checks/M0-d-06-notes.md): a leg stub — a plain script handed to the runner as the fixture's Node bundle — answers
// with a result whose thread is the wrong one for the workers setting, and the run is failed with the thread check's
// reason; the same stub answering the right thread runs, and one that never answers is killed at the time limit. The
// browser leg's half of the thread check is browser-stub.test.ts (a stubbed playwright-core); the real browsers are
// the Mac step (C-0228 (6)).
import { describe, expect, it } from 'vitest';
import { crossHostNodeHost, crossHostThreadProblem, runCrossHost, type CrossHostWorkers } from '@plat/testkit';
import { RUN_TIMEOUT_MS, runnableNodeLegs, smallKernelFixture } from './support.js';

type Mode = 'wrong-thread' | 'right-thread' | 'silent';

/** A Node leg stub: reads the job on stdin and answers as `mode` says, with this process's host record. */
function stub(mode: Mode): string {
  const host = JSON.stringify(crossHostNodeHost());
  return [
    "let text = '';",
    "process.stdin.setEncoding('utf8');",
    "process.stdin.on('data', (d) => { text += d; });",
    "process.stdin.on('end', () => {",
    '  const { workers } = JSON.parse(text);',
    `  const mode = ${JSON.stringify(mode)};`,
    "  if (mode === 'silent') { setInterval(() => undefined, 1000); return; }",
    "  const right = workers === 'on' ? 'worker' : 'main';",
    "  const thread = mode === 'right-thread' ? right : (right === 'main' ? 'worker' : 'main');",
    `  process.stdout.write(JSON.stringify({ host: ${host}, result: { cells: [], thread } }) + '\\n');`,
    '});',
  ].join('\n');
}

const fixture = () => smallKernelFixture([1], ['xoshiro'], 'answers');
const WORKERS: readonly CrossHostWorkers[] = ['off', 'on'];

describe("the runner checks the thread a Node leg's answer names", () => {
  it(
    'a leg answering on the wrong thread is failed with the mismatch reason, workers off and on',
    async () => {
      const legs = await runnableNodeLegs();
      expect(legs.length).toBeGreaterThanOrEqual(1);
      const f = fixture();
      const report = await runCrossHost(f, { legs, bundles: { entryPath: f.entryPath, node: stub('wrong-thread'), browser: '' } });
      expect(report.runs.length).toBe(2 * legs.length);
      for (const r of report.runs) {
        const answered = r.workers === 'on' ? 'main' : 'worker';
        expect(r.status, `${r.leg}/${r.workers}`).toBe('failed');
        expect(r.reason, `${r.leg}/${r.workers}`).toBe(crossHostThreadProblem(r.leg, r.workers, answered));
        expect(r.reason).toBe(`${r.leg} workers ${r.workers}: the stages ran on the ${answered} thread, not the ${r.workers === 'on' ? 'worker' : 'main'}`);
        expect(r.cells).toBeUndefined();
      }
      expect(report.verdict).toBe('fail');
    },
    RUN_TIMEOUT_MS,
  );

  it(
    'the control: the same stub answering on the right thread runs',
    async () => {
      const legs = await runnableNodeLegs();
      const f = fixture();
      const report = await runCrossHost(f, { legs, bundles: { entryPath: f.entryPath, node: stub('right-thread'), browser: '' } });
      expect(report.runs.map((r) => `${r.leg}/${r.workers}/${r.status}/${String(r.thread)}`)).toEqual(legs.flatMap((l) => WORKERS.map((w) => `${l}/${w}/ran/${w === 'on' ? 'worker' : 'main'}`)));
    },
    RUN_TIMEOUT_MS,
  );

  it(
    'a leg that never answers is killed at the time limit and failed with "no answer within <ms> ms"',
    async () => {
      const legs = await runnableNodeLegs();
      const f = fixture();
      const report = await runCrossHost(f, { legs, workers: ['off'], timeoutMs: 1500, bundles: { entryPath: f.entryPath, node: stub('silent'), browser: '' } });
      for (const r of report.runs) {
        expect(r.status).toBe('failed');
        expect(r.reason).toBe('no answer within 1500 ms');
      }
    },
    RUN_TIMEOUT_MS,
  );
});
