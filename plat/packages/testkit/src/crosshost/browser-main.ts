// The browser legs' bootstrap (M0-d-06): bundled with a stage table into one classic script (IIFE). Loaded into a page
// it installs `globalThis.__platCrossHost.run(job)` (workers off: the stages on the page's main thread); loaded into a
// dedicated Web Worker (the page builds the worker from the same script text as a Blob, workers on) it answers one
// posted job with `{ result }` or `{ error }`. No Node API and no DOM API beyond the global scope's `performance`,
// `postMessage` and `onmessage`, which the harness reads — the stages themselves read none (§6.5 (3)).
import { runCrossHostJob, type CrossHostStageTable } from './leg.js';
import type { CrossHostJob, CrossHostLegResult } from './types.js';

/** What the page sees: the main-thread runner. */
export interface CrossHostBrowserApi {
  run(job: CrossHostJob): CrossHostLegResult;
}

/** The global the page's driver reads. */
export const CROSSHOST_BROWSER_GLOBAL = '__platCrossHost';

interface WorkerScope {
  postMessage(m: unknown): void;
  onmessage: ((e: { data: unknown }) => void) | null;
}

/** The bundle's entry: a worker scope answers posted jobs; a page scope installs the main-thread runner. */
export function crossHostBrowserMain(table: CrossHostStageTable): void {
  const g = globalThis as unknown as Record<string, unknown>;
  const perf = g['performance'] as { now(): number } | undefined;
  const clock = perf !== undefined ? () => perf.now() : undefined;
  const isWorker = typeof g['importScripts'] === 'function' && typeof g['document'] === 'undefined';
  if (isWorker) {
    const scope = globalThis as unknown as WorkerScope;
    scope.onmessage = (e) => {
      try {
        scope.postMessage({ result: runCrossHostJob(table, e.data as CrossHostJob, 'worker', clock) });
      } catch (err) {
        scope.postMessage({ error: err instanceof Error ? `${err.name}: ${err.message}` : String(err) });
      }
    };
    return;
  }
  const api: CrossHostBrowserApi = { run: (job) => runCrossHostJob(table, job, 'main', clock) };
  g[CROSSHOST_BROWSER_GLOBAL] = api;
}
