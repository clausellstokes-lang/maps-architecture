// The legs' bundles (M0-d-06; the item's "esbuild bundle of the kernel, model and the M0 stages for browsers and for
// Node"): one stage table (a fixture's entry module, inside plat/) with the leg runtime, bundled by esbuild from source
// (the `plat-source` condition, C-0013) into
//   node     one ESM file a Node leg runs as a child process (and as its own worker_thread with workers on);
//   browser  one classic script (IIFE) a browser leg loads into its page (and into a Web Worker built from its text).
// Bundled in the runner's process (the reference Mac's arm64 Node), so no leg needs a TypeScript loader.
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

async function bundle(contents: string, entryPath: string, platform: 'node' | 'browser'): Promise<string> {
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
  });
  const file = out.outputFiles[0];
  if (file === undefined) throw new Error(`crosshost: esbuild wrote no ${platform} bundle`);
  return file.text;
}

/** Bundles a stage table (a module exporting `crosshostStages`) for the Node legs and the browser legs. */
export async function buildCrossHostBundles(entryPath: string): Promise<CrossHostBundles> {
  const entry = JSON.stringify(entryPath);
  const node = await bundle(
    [`import { crosshostStages } from ${entry};`, `import { crossHostNodeMain } from ${JSON.stringify(NODE_MAIN)};`, 'await crossHostNodeMain(crosshostStages, new URL(import.meta.url));'].join('\n'),
    entryPath,
    'node',
  );
  const browser = await bundle(
    [`import { crosshostStages } from ${entry};`, `import { crossHostBrowserMain } from ${JSON.stringify(BROWSER_MAIN)};`, 'crossHostBrowserMain(crosshostStages);'].join('\n'),
    entryPath,
    'browser',
  );
  return { entryPath, node, browser };
}
