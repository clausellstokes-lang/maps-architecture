// The browser leg's control path with a stubbed playwright-core (M0-d-06, hardening round S1, rows 1 and 5; notes 1
// and 5 of checks/M0-d-06-notes.md). No browser runs here and no cell is faked into a report: the stub stands in for
// the pinned playwright-core so the RUNNER's own handling of a page's answer is exercised on this machine —
//   row 5: a page whose answer never comes (a Web Worker that never posts) is bounded by the run's time limit:
//          page.evaluate is raced against timeoutMs and the run is failed "no answer within <ms> ms", not hung;
//   row 1: a page answering on the wrong thread is failed with the thread check's reason (the browser half).
// The same paths in the three real browsers are the Mac step (C-0228 (6)): PENDING-MAC.
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { crossHostThreadProblem, runCrossHost, type CrossHostWorkers } from '@plat/testkit';
import { smallKernelFixture } from './support.js';

/** What the stubbed page's evaluate does with the driver's argument. */
const state = vi.hoisted(() => ({
  root: '',
  evaluate: (_arg: { workers: string }): Promise<unknown> => Promise.reject(new Error('unset')),
  closed: 0,
}));

vi.mock('playwright-core', () => {
  const type = (name: string) => ({
    executablePath: () => `${state.root}/${name}-stub/exe`,
    launchServer: () =>
      Promise.resolve({
        process: () => ({ pid: undefined }),
        wsEndpoint: () => 'ws://stub.invalid',
        close: () => Promise.resolve(),
      }),
    connect: () =>
      Promise.resolve({
        version: () => 'stub 1',
        close: () => Promise.resolve(),
        newPage: () =>
          Promise.resolve({
            setDefaultTimeout: () => undefined,
            route: () => Promise.resolve(),
            goto: () => Promise.resolve(null),
            addScriptTag: () => Promise.resolve(null),
            evaluate: (_fn: unknown, arg: { workers: string }) => state.evaluate(arg),
            close: () => {
              state.closed += 1;
              return Promise.resolve();
            },
          }),
      }),
  });
  return { chromium: type('chromium'), firefox: type('firefox'), webkit: type('webkit') };
});

// The cache root playwright-core is "loaded" under (read from process.env on the first load) and the runner's env.
const cache = mkdtempSync(join(tmpdir(), 'plat-crosshost-stub-cache-'));
state.root = cache;
const before = process.env['PLAYWRIGHT_BROWSERS_PATH'];
process.env['PLAYWRIGHT_BROWSERS_PATH'] = cache;
const exe = join(cache, 'chromium-stub', 'exe');
mkdirSync(dirname(exe), { recursive: true });
writeFileSync(exe, '');
afterAll(() => {
  if (before === undefined) delete process.env['PLAYWRIGHT_BROWSERS_PATH'];
  else process.env['PLAYWRIGHT_BROWSERS_PATH'] = before;
  rmSync(cache, { recursive: true, force: true });
});

const env = { ...process.env, PLAYWRIGHT_BROWSERS_PATH: cache };
const fixture = () => smallKernelFixture([1], ['xoshiro'], 'browser-stub');
const bundles = () => ({ entryPath: fixture().entryPath, node: '', browser: '/* the stub page never loads it */' });
const right = (w: string): 'main' | 'worker' => (w === 'on' ? 'worker' : 'main');

describe("the browser leg's time limit bounds the page's answer (row 5)", () => {
  it('an answer that never comes fails the run at timeoutMs, workers off and on, and the page is closed', async () => {
    state.evaluate = () => new Promise(() => undefined);
    state.closed = 0;
    const t0 = Date.now();
    const report = await runCrossHost(fixture(), { legs: ['chromium'], env, timeoutMs: 300, bundles: bundles() });
    expect(Date.now() - t0).toBeLessThan(10_000);
    expect(report.runs.map((r) => `${r.leg}/${r.workers}/${r.status}/${String(r.reason)}`)).toEqual(['chromium/off/failed/no answer within 300 ms', 'chromium/on/failed/no answer within 300 ms']);
    expect(state.closed).toBe(2);
    expect(report.verdict).toBe('fail');
  }, 20_000);

  it('an answer inside the limit is taken (the control)', async () => {
    state.evaluate = (arg) => new Promise((resolve) => setTimeout(() => resolve({ nav: { userAgent: 'stub', hardwareConcurrency: 4, deviceMemory: null }, result: { cells: [], thread: right(arg.workers) } }), 20));
    const report = await runCrossHost(fixture(), { legs: ['chromium'], env, timeoutMs: 5000, bundles: bundles() });
    expect(report.runs.map((r) => `${r.leg}/${r.workers}/${r.status}/${String(r.thread)}`)).toEqual(['chromium/off/ran/main', 'chromium/on/ran/worker']);
    for (const r of report.runs) expect(r.host?.engine).toEqual({ name: 'chromium', version: 'stub 1' });
  }, 20_000);

  it('a page that throws is failed with its message, not taken for the time limit', async () => {
    state.evaluate = () => Promise.reject(new Error('the worker failed: boom'));
    const report = await runCrossHost(fixture(), { legs: ['chromium'], env, workers: ['on'], timeoutMs: 5000, bundles: bundles() });
    expect(report.runs.map((r) => r.reason)).toEqual(['the page failed: the worker failed: boom']);
  }, 20_000);
});

describe("the runner checks the thread a browser page's answer names (row 1, the browser half)", () => {
  it('a page answering on the wrong thread is failed with the mismatch reason, workers off and on', async () => {
    const wrong = (w: string): 'main' | 'worker' => (w === 'on' ? 'main' : 'worker');
    state.evaluate = (arg) => Promise.resolve({ nav: { userAgent: 'stub', hardwareConcurrency: 4, deviceMemory: null }, result: { cells: [], thread: wrong(arg.workers) } });
    const report = await runCrossHost(fixture(), { legs: ['chromium'], env, timeoutMs: 5000, bundles: bundles() });
    for (const r of report.runs) {
      expect(r.status).toBe('failed');
      expect(r.reason).toBe(crossHostThreadProblem('chromium', r.workers as CrossHostWorkers, wrong(r.workers)));
      expect(r.cells).toBeUndefined();
    }
    expect(report.runs.length).toBe(2);
  }, 20_000);
});
