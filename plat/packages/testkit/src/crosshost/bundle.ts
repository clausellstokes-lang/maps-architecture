// The legs' bundles (M0-d-06; the item's "esbuild bundle of the kernel, model and the M0 stages for browsers and for
// Node"): one stage table (a fixture's entry module, inside plat/) with the leg runtime, bundled by esbuild from source
// (the `plat-source` condition, C-0013) into
//   node     one ESM file a Node leg runs as a child process (and as its own worker_thread with workers on);
//   browser  one classic script (IIFE) a browser leg loads into its page (and into a Web Worker built from its text).
// Bundled in the runner's process (the reference Mac's arm64 Node), so no leg needs a TypeScript loader.
// The production option (hardening round S2, C-0466; the prerequisite of M0-t-00 S1's RL10 (c), Q72): `{ production: true }`
// adds esbuild's `define: { PLAT_DEBUG_BUILD: 'false' }` — the flag kernel/src/invariants/debug.ts names, so the arena's
// slot-stamp assertions are off as in bench/src/profile/bundle.ts's production recipe — and NOTHING else of that recipe;
// the default (no option, or `production: false`) builds byte for byte the bundles it built before the round.
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/** The two bundles of one stage table. */
export interface CrossHostBundles {
  /** The stage table module bundled (absolute path). */
  readonly entryPath: string;
  /** The Node legs' ES module text. */
  readonly node: string;
  /** The browser legs' classic script text. */
  readonly browser: string;
}

const NODE_MAIN = fileURLToPath(new URL('./node-main.ts', import.meta.url));
const BROWSER_MAIN = fileURLToPath(new URL('./browser-main.ts', import.meta.url));

/** A Node ESM bundle may hold CommonJS code that calls require: give it Node's. */
const NODE_BANNER = "import { createRequire as __platCrossHostRequire } from 'node:module'; const require = __platCrossHostRequire(import.meta.url);";

/** The bundler's option: `production` defines the debug flag false (default false: the debug build, unchanged). */
interface CrossHostBundleOptions {
  readonly production?: boolean;
}

/** The production define of kernel/src/invariants/debug.ts's flag (the one key the option adds). */
const PRODUCTION_DEFINE: Readonly<Record<string, string>> = { PLAT_DEBUG_BUILD: 'false' };

async function bundle(contents: string, entryPath: string, platform: 'node' | 'browser', production: boolean): Promise<string> {
  const out = await build({
    stdin: { contents, resolveDir: dirname(entryPath), sourcefile: `crosshost-${platform}-entry.ts`, loader: 'ts' },
    bundle: true,
    platform,
    format: platform === 'node' ? 'esm' : 'iife',
    target: platform === 'node' ? 'node24' : 'es2022',
    conditions: ['plat-source'],
    write: false,
    logLevel: 'silent',
    legalComments: 'none',
    ...(platform === 'node' ? { banner: { js: NODE_BANNER } } : {}),
    ...(production ? { define: { ...PRODUCTION_DEFINE } } : {}),
  });
  const file = out.outputFiles[0];
  if (file === undefined) throw new Error(`crosshost: esbuild wrote no ${platform} bundle`);
  return file.text;
}

/**
 * Bundles a stage table (a module exporting `crosshostStages`) for the Node legs and the browser legs. With
 * `{ production: true }` both bundles are production builds (`PLAT_DEBUG_BUILD` defined false, the slot-stamp assertions
 * off), so a timing figure's Node and Chromium-worker legs are of one build; without it (the default) the debug build.
 */
export async function buildCrossHostBundles(entryPath: string, options: CrossHostBundleOptions = {}): Promise<CrossHostBundles> {
  const production = options.production === true;
  const entry = JSON.stringify(entryPath);
  const node = await bundle(
    [`import { crosshostStages } from ${entry};`, `import { crossHostNodeMain } from ${JSON.stringify(NODE_MAIN)};`, 'await crossHostNodeMain(crosshostStages, new URL(import.meta.url));'].join('\n'),
    entryPath,
    'node',
    production,
  );
  const browser = await bundle(
    [`import { crosshostStages } from ${entry};`, `import { crossHostBrowserMain } from ${JSON.stringify(BROWSER_MAIN)};`, 'crossHostBrowserMain(crosshostStages);'].join('\n'),
    entryPath,
    'browser',
    production,
  );
  return { entryPath, node, browser };
}
