// A test stage table (M0-d-06 fix round 1, check B-2): one stage that digests whether it runs on the engine's main thread,
// read from INSIDE the stage — so "workers on" is observed, never taken from the label the leg writes. Engine-neutral
// (the runner bundles it for Node and for browsers): in Node, worker_threads' isMainThread through
// process.getBuiltinModule (no static node: import, so the browser bundle holds none); elsewhere, a dedicated Web
// Worker's global scope has importScripts and a page's has not.
import { H128, utf8Bytes } from '@plat/kernel';
import type { CrossHostStage } from '@plat/testkit';

interface Scope {
  readonly process?: { readonly getBuiltinModule?: (id: string) => unknown };
  readonly importScripts?: unknown;
}

/** 'main' when the stage runs on the engine's main thread, 'not main' inside a worker. */
export function crossHostTestThread(): 'main' | 'not main' {
  const g = globalThis as unknown as Scope;
  const wt = g.process?.getBuiltinModule?.('node:worker_threads') as { readonly isMainThread?: unknown } | undefined;
  if (wt !== undefined && typeof wt.isMainThread === 'boolean') return wt.isMainThread ? 'main' : 'not main';
  return typeof g.importScripts === 'function' ? 'not main' : 'main';
}

/** The digest the stage writes for a thread at a seed. */
export function crossHostThreadDigest(thread: 'main' | 'not main', seed: number): string {
  return H128(utf8Bytes(`thread/${String(seed)}/${thread}`))
    .map((w) => w.toString(16).padStart(8, '0'))
    .join('');
}

export const crosshostStages: readonly CrossHostStage[] = [{ id: 'thread', run: (seed) => ({ model: crossHostThreadDigest(crossHostTestThread(), seed), records: null }) }];
