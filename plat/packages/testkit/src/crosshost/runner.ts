// The cross-host runner (M0-d-06; §6.5 (9), §13.2's stage contract tests, §13.3's five-engine run; C-0028, C-0051,
// C-0082): bundles a fixture's stage table, runs the job on every leg asked for with workers off and on, and compares
// every run with the reference (report.ts). A Node leg is a child process on the leg's Node; a browser leg is the
// cached build launched by its explicit path (legs.ts), one page per run: workers off runs the stages on the page's
// main thread, workers on inside a dedicated Web Worker built from the same bundle. The timing mode (C-0082) adds the
// harness's per-stage wall-clock to every cell and changes nothing else. Every child process the runner starts is
// reported to `onChild` (the timing phase's `ownPids`, C-0103).
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { cpus, tmpdir, totalmem, release } from 'node:os';
import { join } from 'node:path';
import { buildCrossHostBundles, type CrossHostBundles } from './bundle.js';
import { crossHostPlaywright, planCrossHostLeg, type CrossHostLegPlan } from './legs.js';
import { crossHostNodeKind } from './node-main.js';
import { compareCrossHostRuns } from './report.js';
import { CROSSHOST_LEGS, CROSSHOST_WORKERS, type CrossHostFixture, type CrossHostJob, type CrossHostLegHost, type CrossHostLegId, type CrossHostLegResult, type CrossHostReport, type CrossHostRun, type CrossHostWorkers } from './types.js';

/** The runner's options. */
export interface CrossHostRunOptions {
  /** The legs to run (default: all five, CROSSHOST_LEGS). */
  readonly legs?: readonly CrossHostLegId[];
  /** Workers off, on, or both (default both). */
  readonly workers?: readonly CrossHostWorkers[];
  /** The timing mode (C-0082): each cell carries the harness's wall-clock around its stage call. */
  readonly timing?: boolean;
  /** Called with every child process the runner starts (a Node leg, a browser's server process). */
  readonly onChild?: (pid: number, leg: CrossHostLegId) => void;
  /** The environment the browser legs' cache root is read from (default process.env). */
  readonly env?: Readonly<Record<string, string | undefined>>;
  /** Bundles already built for the fixture's entry (default: built here). */
  readonly bundles?: CrossHostBundles;
  /** A run's time limit, ms (default 10 minutes): past it the run is killed and reported failed. */
  readonly timeoutMs?: number;
}

const DEFAULT_TIMEOUT_MS = 600_000;

/** The job a fixture gives every leg. */
export function crossHostJobOf(f: CrossHostFixture, timing: boolean): CrossHostJob {
  return { fixture: f.id, seeds: f.seeds, stages: f.stages, inputs: f.inputs, timing };
}

function firstLine(e: unknown): string {
  return (e instanceof Error ? e.message : String(e)).split('\n')[0] ?? '';
}

/** Why a run's thread is wrong (the stages ran on the main thread with workers on, or in a worker with them off), or null. */
export function crossHostThreadProblem(leg: CrossHostLegId, workers: CrossHostWorkers, thread: 'main' | 'worker'): string | null {
  const want = workers === 'on' ? 'worker' : 'main';
  return thread === want ? null : `${leg} workers ${workers}: the stages ran on the ${thread} thread, not the ${want}`;
}

function checkThread(leg: CrossHostLegId, workers: CrossHostWorkers, result: CrossHostLegResult): string | null {
  return crossHostThreadProblem(leg, workers, result.thread);
}

/** A Node leg's answer line. */
interface NodeAnswer {
  host?: CrossHostLegHost;
  result?: CrossHostLegResult;
  error?: string;
}

/** One Node leg run: the bundle as a child process on the leg's Node, the job on stdin, the answer on stdout. */
function runNodeLeg(plan: Extract<CrossHostLegPlan, { kind: 'node' }>, bundleFile: string, job: CrossHostJob, workers: CrossHostWorkers, opts: CrossHostRunOptions): Promise<CrossHostRun> {
  const leg = plan.leg;
  const t0 = Date.now();
  return new Promise((resolveRun) => {
    const child = spawn(plan.command, [...plan.args, bundleFile], { stdio: ['pipe', 'pipe', 'pipe'] });
    const out: Buffer[] = [];
    const err: Buffer[] = [];
    let settled = false;
    const finish = (r: CrossHostRun): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolveRun(r);
    };
    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      finish({ leg, workers, status: 'failed', reason: `no answer within ${String(opts.timeoutMs ?? DEFAULT_TIMEOUT_MS)} ms` });
    }, opts.timeoutMs ?? DEFAULT_TIMEOUT_MS);
    if (child.pid !== undefined) opts.onChild?.(child.pid, leg);
    child.stdout.on('data', (b: Buffer) => out.push(b));
    child.stderr.on('data', (b: Buffer) => err.push(b));
    child.on('error', (e) => finish({ leg, workers, status: 'failed', reason: `${plan.command} did not start: ${firstLine(e)}` }));
    child.on('close', (code) => {
      const text = Buffer.concat(out).toString('utf8').trim();
      const line = text.slice(text.lastIndexOf('\n') + 1);
      let answer: NodeAnswer | null = null;
      try {
        answer = JSON.parse(line) as NodeAnswer;
      } catch {
        answer = null;
      }
      if (answer === null || answer.result === undefined || answer.host === undefined) {
        const why = answer?.error ?? `exit ${String(code)}; ${Buffer.concat(err).toString('utf8').trim().split('\n').slice(-3).join(' | ').slice(0, 600)}`;
        finish({ leg, workers, status: 'failed', reason: `the leg gave no result: ${why}` });
        return;
      }
      const wrong = checkThread(leg, workers, answer.result);
      if (wrong !== null) {
        finish({ leg, workers, status: 'failed', reason: wrong });
        return;
      }
      finish({ leg, workers, status: 'ran', host: answer.host, thread: answer.result.thread, cells: answer.result.cells, wallMs: Date.now() - t0 });
    });
    child.stdin.on('error', () => undefined);
    child.stdin.end(JSON.stringify({ job, workers }));
  });
}

/** The page's origin (served by the route below; no network). */
const ORIGIN = 'http://crosshost.plat.invalid';

/**
 * The page-side driver, installed as a script: workers off calls the bundle's main-thread runner; workers on builds a
 * dedicated Web Worker from the bundle's text and posts it the job. A plain-JavaScript string, so no transform of this
 * file (tsx's keepNames helpers among them) reaches the page.
 */
const DRIVER = `globalThis.__platCrossHostDrive = function (arg) {
  var nav = { userAgent: String(navigator.userAgent), hardwareConcurrency: Number(navigator.hardwareConcurrency),
    deviceMemory: typeof navigator.deviceMemory === 'number' ? navigator.deviceMemory : null };
  if (arg.workers === 'off') {
    var api = globalThis.__platCrossHost;
    if (!api) return Promise.reject(new Error('the browser bundle installed no __platCrossHost'));
    return Promise.resolve({ nav: nav, result: api.run(arg.job) });
  }
  return new Promise(function (resolve, reject) {
    var url = URL.createObjectURL(new Blob([arg.src], { type: 'text/javascript' }));
    var w = new Worker(url);
    w.onmessage = function (e) {
      w.terminate();
      URL.revokeObjectURL(url);
      if (e.data && e.data.error !== undefined) reject(new Error('the worker failed: ' + e.data.error));
      else resolve({ nav: nav, result: e.data.result });
    };
    w.onerror = function (e) { w.terminate(); reject(new Error('the worker failed to load: ' + (e && e.message ? e.message : 'error'))); };
    w.postMessage(arg.job);
  });
};`;

/** The machine's own fields of a browser leg's host record (the browser runs on this machine). */
function parentHost(): Pick<CrossHostLegHost, 'cpu' | 'cores' | 'memoryBytes' | 'os' | 'arch' | 'kind'> {
  const list = cpus();
  return { cpu: list[0]?.model ?? 'unknown', cores: list.length, memoryBytes: totalmem(), os: `${process.platform} ${release()}`, arch: process.arch, kind: crossHostNodeKind() };
}

/** One browser leg: the cached build launched once by its path, one page per workers setting. */
async function runBrowserLeg(plan: Extract<CrossHostLegPlan, { kind: 'browser' }>, bundles: CrossHostBundles, job: CrossHostJob, list: readonly CrossHostWorkers[], opts: CrossHostRunOptions): Promise<CrossHostRun[]> {
  const leg = plan.leg;
  const { pw } = await crossHostPlaywright();
  const type = pw[plan.browser];
  let server: Awaited<ReturnType<typeof type.launchServer>>;
  try {
    server = await type.launchServer({ headless: true, executablePath: plan.executable, timeout: 120_000 });
  } catch (e) {
    const reason = `${plan.browser} refused to launch from the Playwright cache (${plan.executable}): ${firstLine(e)}; never downloaded (the no-download rule, C-0028)`;
    return list.map((workers) => ({ leg, workers, status: 'blocked' as const, reason }));
  }
  const pid = server.process().pid;
  if (pid !== undefined) opts.onChild?.(pid, leg);
  const runs: CrossHostRun[] = [];
  try {
    const browser = await type.connect(server.wsEndpoint());
    const version = browser.version();
    try {
      for (const workers of list) {
        const t0 = Date.now();
        const page = await browser.newPage();
        try {
          page.setDefaultTimeout(opts.timeoutMs ?? DEFAULT_TIMEOUT_MS);
          await page.route(`${ORIGIN}/**`, (route) => route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: '<!doctype html><meta charset="utf-8"><title>crosshost</title>' }));
          await page.goto(`${ORIGIN}/`);
          await page.addScriptTag({ content: DRIVER });
          if (workers === 'off') await page.addScriptTag({ content: bundles.browser });
          const arg = { job, workers, src: workers === 'on' ? bundles.browser : '' };
          const answer = (await page.evaluate((a) => (globalThis as unknown as { __platCrossHostDrive: (x: unknown) => unknown }).__platCrossHostDrive(a), arg)) as {
            nav: { userAgent: string; hardwareConcurrency: number; deviceMemory: number | null };
            result: CrossHostLegResult;
          };
          const wrong = checkThread(leg, workers, answer.result);
          if (wrong !== null) {
            runs.push({ leg, workers, status: 'failed', reason: wrong });
            continue;
          }
          const host: CrossHostLegHost = {
            ...parentHost(),
            engine: { name: plan.browser, version },
            userAgent: answer.nav.userAgent,
            hardwareConcurrency: answer.nav.hardwareConcurrency,
            deviceMemory: answer.nav.deviceMemory,
            executable: plan.executable,
          };
          runs.push({ leg, workers, status: 'ran', host, thread: answer.result.thread, cells: answer.result.cells, wallMs: Date.now() - t0 });
        } catch (e) {
          runs.push({ leg, workers, status: 'failed', reason: `the page failed: ${firstLine(e)}` });
        } finally {
          await page.close().catch(() => undefined);
        }
      }
    } finally {
      await browser.close().catch(() => undefined);
    }
  } catch (e) {
    for (const workers of list) if (!runs.some((r) => r.workers === workers)) runs.push({ leg, workers, status: 'failed', reason: `the browser failed: ${firstLine(e)}` });
  } finally {
    await server.close().catch(() => undefined);
  }
  return runs;
}

/** Checks a leg list: known legs, none twice. */
function checkLegs(legs: readonly CrossHostLegId[], workers: readonly CrossHostWorkers[]): void {
  if (legs.length === 0) throw new Error('crosshost: no leg asked for');
  if (workers.length === 0) throw new Error('crosshost: no workers setting asked for');
  for (const l of legs) if (!(CROSSHOST_LEGS as readonly string[]).includes(l)) throw new Error(`crosshost: an unknown leg ${JSON.stringify(l)} (one of ${CROSSHOST_LEGS.join(', ')})`);
  for (const w of workers) if (!(CROSSHOST_WORKERS as readonly string[]).includes(w)) throw new Error(`crosshost: an unknown workers setting ${JSON.stringify(w)} (off or on)`);
  if (new Set(legs).size !== legs.length || new Set(workers).size !== workers.length) throw new Error('crosshost: a leg or workers setting is listed twice');
}

/** Runs a fixture on the legs asked for, workers off and on, and returns the report. */
export async function runCrossHost(fixture: CrossHostFixture, opts: CrossHostRunOptions = {}): Promise<CrossHostReport> {
  const legs = opts.legs ?? CROSSHOST_LEGS;
  const workersList = opts.workers ?? CROSSHOST_WORKERS;
  checkLegs(legs, workersList);
  const timing = opts.timing === true;
  const job = crossHostJobOf(fixture, timing);
  const bundles = opts.bundles ?? (await buildCrossHostBundles(fixture.entryPath));
  if (bundles.entryPath !== fixture.entryPath) throw new Error(`crosshost: the bundles are of ${bundles.entryPath}, the fixture's entry is ${fixture.entryPath}`);
  const dir = mkdtempSync(join(tmpdir(), 'plat-crosshost-'));
  const runs: CrossHostRun[] = [];
  try {
    const bundleFile = join(dir, 'leg.mjs');
    writeFileSync(bundleFile, bundles.node);
    for (const leg of legs) {
      const plan = await planCrossHostLeg(leg, opts.env ?? process.env);
      if (!plan.runnable) {
        for (const workers of workersList) runs.push({ leg, workers, status: 'blocked', reason: plan.reason });
        continue;
      }
      if (plan.kind === 'node') {
        for (const workers of workersList) runs.push(await runNodeLeg(plan, bundleFile, job, workers, opts));
      } else {
        runs.push(...(await runBrowserLeg(plan, bundles, job, workersList, opts)));
      }
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  return compareCrossHostRuns({ fixture: fixture.id, source: fixture.source, seeds: fixture.seeds, stages: fixture.stages, timing }, runs);
}
