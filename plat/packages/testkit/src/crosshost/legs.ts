// The legs (M0-d-06; §6.5 (9), C-0028, C-0051): which engine each leg runs, and whether this machine can run it.
//   node-arm64        an arm64 Node: `arch -arm64 <node>` on an arm64 Mac (the reference engine), the Node itself on an
//                     arm64 host of another OS; blocked on an x86-64 host.
//   node-x64-rosetta  an x86-64 Node: `arch -x86_64 <node>` on an arm64 Mac (the universal binary's x86-64 slice under
//                     Rosetta 2 — the leg stamps host.kind 'rosetta'); the Node itself on an x86-64 host (a native x86-64
//                     host attached — the leg stamps 'native-x64', C-0028); blocked elsewhere.
//   chromium, firefox, webkit
//                     the pinned playwright-core's builds (1.60.0, C-0051) FROM THE LOCAL CACHE ONLY: the executable is
//                     the pinned revision's path under the cache root, launched by that explicit path; absent → blocked
//                     with the no-download rule's reason (never downloaded, never faked, C-0028).
// PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 is set before playwright-core is first loaded, as in every install script.
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import type { CrossHostLegId } from './types.js';

/** The three browser legs and the playwright-core browser type each launches. */
export const CROSSHOST_BROWSERS = ['chromium', 'firefox', 'webkit'] as const;
export type CrossHostBrowser = (typeof CROSSHOST_BROWSERS)[number];

/** How a leg runs here, or why it cannot. */
export type CrossHostLegPlan =
  | { readonly leg: CrossHostLegId; readonly runnable: true; readonly kind: 'node'; readonly command: string; readonly args: readonly string[] }
  | { readonly leg: CrossHostLegId; readonly runnable: true; readonly kind: 'browser'; readonly browser: CrossHostBrowser; readonly executable: string; readonly cacheRoot: string }
  | { readonly leg: CrossHostLegId; readonly runnable: false; readonly reason: string };

/** The machine a plan is made for (defaults: this process). */
export interface CrossHostMachine {
  readonly platform: string;
  readonly arch: string;
  /** The Node binary the Node legs start (on the Mac the universal binary: both slices). */
  readonly execPath: string;
}

export const CROSSHOST_THIS_MACHINE: CrossHostMachine = Object.freeze({ platform: process.platform, arch: process.arch, execPath: process.execPath });

/**
 * The Playwright cache root, as playwright-core reads it: PLAYWRIGHT_BROWSERS_PATH when set (relative to the working
 * folder), else the OS cache folder — ~/Library/Caches/ms-playwright on macOS, $XDG_CACHE_HOME (or ~/.cache)/ms-playwright
 * on Linux, %LOCALAPPDATA%\ms-playwright on Windows. null for PLAYWRIGHT_BROWSERS_PATH=0 (a package-local folder, not
 * the cache).
 */
export function crossHostCacheRoot(env: Readonly<Record<string, string | undefined>> = process.env, platform: string = process.platform, home: string = homedir()): string | null {
  const set = env['PLAYWRIGHT_BROWSERS_PATH'];
  if (set !== undefined && set !== '') return set === '0' ? null : resolve(set);
  if (platform === 'darwin') return join(home, 'Library', 'Caches', 'ms-playwright');
  if (platform === 'win32') return join(env['LOCALAPPDATA'] ?? join(home, 'AppData', 'Local'), 'ms-playwright');
  return join(env['XDG_CACHE_HOME'] ?? join(home, '.cache'), 'ms-playwright');
}

/** The Node legs' plans. */
export function planCrossHostNodeLeg(leg: 'node-arm64' | 'node-x64-rosetta', m: CrossHostMachine = CROSSHOST_THIS_MACHINE): CrossHostLegPlan {
  const here = `this host is ${m.platform} ${m.arch}`;
  if (leg === 'node-arm64') {
    if (m.arch === 'arm64') return m.platform === 'darwin' ? { leg, runnable: true, kind: 'node', command: 'arch', args: ['-arm64', m.execPath] } : { leg, runnable: true, kind: 'node', command: m.execPath, args: [] };
    return { leg, runnable: false, reason: `needs an arm64 Node and ${here} — the reference Mac's leg (C-0028), a Mac step` };
  }
  if (m.arch === 'arm64' && m.platform === 'darwin') return { leg, runnable: true, kind: 'node', command: 'arch', args: ['-x86_64', m.execPath] };
  if (m.arch === 'x64') return { leg, runnable: true, kind: 'node', command: m.execPath, args: [] };
  return { leg, runnable: false, reason: `needs an x86-64 Node (Rosetta 2 on an arm64 Mac, or a native x86-64 host) and ${here}` };
}

/** playwright-core, loaded once, with downloads switched off first; and the cache root it was loaded under. */
let loaded: { pw: typeof import('playwright-core'); root: string | null } | null = null;

/** Loads playwright-core with PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 (C-0028). */
export async function crossHostPlaywright(): Promise<{ pw: typeof import('playwright-core'); root: string | null }> {
  if (loaded === null) {
    process.env['PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD'] = '1';
    const root = crossHostCacheRoot(process.env);
    const pw = await import('playwright-core');
    loaded = { pw, root };
  }
  return loaded;
}

/**
 * A browser leg's plan: the pinned revision's executable under the cache root `env` names (its path inside the cache
 * as playwright-core lays it out), present → runnable; absent → blocked by the no-download rule.
 */
export async function planCrossHostBrowserLeg(browser: CrossHostBrowser, env: Readonly<Record<string, string | undefined>> = process.env): Promise<CrossHostLegPlan> {
  const leg: CrossHostLegId = browser;
  const root = crossHostCacheRoot(env);
  if (root === null) return { leg, runnable: false, reason: 'PLAYWRIGHT_BROWSERS_PATH=0 names a package-local folder, not the Playwright cache; launched only from the cache (C-0028)' };
  const { pw, root: pwRoot } = await crossHostPlaywright();
  if (pwRoot === null) return { leg, runnable: false, reason: 'playwright-core was loaded with PLAYWRIGHT_BROWSERS_PATH=0; launched only from the cache (C-0028)' };
  const pinned = pw[browser].executablePath();
  const inCache = relative(pwRoot, pinned);
  if (inCache === '' || inCache.startsWith('..') || isAbsolute(inCache)) {
    return { leg, runnable: false, reason: `playwright-core names ${pinned}, outside its cache root ${pwRoot}; launched only from the cache (C-0028)` };
  }
  const executable = join(root, inCache);
  if (!existsSync(executable)) {
    return { leg, runnable: false, reason: `${browser}'s pinned build (playwright-core 1.60.0, C-0051) is not in the Playwright cache: no ${executable}; never downloaded (the no-download rule, C-0028) — a Mac step` };
  }
  if (!(executable === root || executable.startsWith(root + sep))) return { leg, runnable: false, reason: `${executable} lies outside the cache root ${root}` };
  return { leg, runnable: true, kind: 'browser', browser, executable, cacheRoot: root };
}

/** A leg's plan on this machine. */
export async function planCrossHostLeg(leg: CrossHostLegId, env: Readonly<Record<string, string | undefined>> = process.env, m: CrossHostMachine = CROSSHOST_THIS_MACHINE): Promise<CrossHostLegPlan> {
  if (leg === 'node-arm64' || leg === 'node-x64-rosetta') return planCrossHostNodeLeg(leg, m);
  return planCrossHostBrowserLeg(leg, env);
}
