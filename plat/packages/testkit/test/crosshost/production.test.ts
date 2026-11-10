// The bundler's production option (M0-d-06, hardening round S2, C-0466; the prerequisite of M0-t-00 S1's RL10 (c), Q72):
// buildCrossHostBundles(entry, { production: true }) adds esbuild's `define: { PLAT_DEBUG_BUILD: 'false' }` and nothing
// else, so the timing phase's Node leg and Chromium-worker leg of one figure can be of one (production) build; the
// default call is unchanged. The pins:
//   (a) the production bundles' text holds no free PLAT_DEBUG_BUILD identifier and the default bundles' does — and the
//       leg observes it: a stage reading the kernel's DEBUG_BUILD digests false in the production bundle and true in the
//       default one, in the browser bundle (run here in a bare node:vm context, the page's main-thread path) and on every
//       Node leg this machine runs, workers off and on, through the runner (its `bundles` option);
//   (b) the default call's output (no option, `{}`, `{ production: false }`) is byte-identical to the before image — the
//       pre-round recipe, restated below verbatim — for this folder's debug-flag table and the committed kernel fixture's;
//   (c) the production output is the before image plus the define and nothing else of bench/src/profile/bundle.ts's
//       recipe (no source map, no keepNames change, no target change, no external).
// The folder's existing parity tests (legs, workers, kat-anchor, planted, ...) build the default bundle and stay as they
// were. The browser legs in the three real browsers stay the Mac step (PENDING-MAC); nothing here launches a browser.
import { dirname, join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { build } from 'esbuild';
import { describe, expect, it } from 'vitest';
import { buildCrossHostBundles, CROSSHOST_BROWSER_GLOBAL, CROSSHOST_PLAT_ROOT, runCrossHost, type CrossHostBundles, type CrossHostCell, type CrossHostJob } from '@plat/testkit';
import { crossHostDebugDigest } from './debug-stages.js';
import { KERNEL_FIXTURE_PATH, kernelFixture, RUN_TIMEOUT_MS, runnableNodeLegs, testFixture } from './support.js';

const DEBUG_ENTRY = 'packages/testkit/test/crosshost/debug-stages.ts';
const debugEntryPath = (): string => join(CROSSHOST_PLAT_ROOT, DEBUG_ENTRY);
const SEEDS = [0, 3];
const FREE_FLAG = /\bPLAT_DEBUG_BUILD\b/;

// ---- The before image: bundle.ts's recipe as it stood before this round (lane build/M0-d-06-fix-s2), verbatim. ----
const NODE_MAIN = join(CROSSHOST_PLAT_ROOT, 'packages/testkit/src/crosshost/node-main.ts');
const BROWSER_MAIN = join(CROSSHOST_PLAT_ROOT, 'packages/testkit/src/crosshost/browser-main.ts');
const NODE_BANNER = "import { createRequire as __platCrossHostRequire } from 'node:module'; const require = __platCrossHostRequire(import.meta.url);";

async function beforeBundle(contents: string, entryPath: string, platform: 'node' | 'browser', define?: Record<string, string>): Promise<string> {
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
    ...(define !== undefined ? { define } : {}),
  });
  const file = out.outputFiles[0];
  if (file === undefined) throw new Error(`before image: esbuild wrote no ${platform} bundle`);
  return file.text;
}

/** The pre-round buildCrossHostBundles, optionally with one define added (pin (c)'s "the image plus the define"). */
async function beforeImage(entryPath: string, define?: Record<string, string>): Promise<CrossHostBundles> {
  const entry = JSON.stringify(entryPath);
  const node = await beforeBundle(
    [`import { crosshostStages } from ${entry};`, `import { crossHostNodeMain } from ${JSON.stringify(NODE_MAIN)};`, 'await crossHostNodeMain(crosshostStages, new URL(import.meta.url));'].join('\n'),
    entryPath,
    'node',
    define,
  );
  const browser = await beforeBundle(
    [`import { crosshostStages } from ${entry};`, `import { crossHostBrowserMain } from ${JSON.stringify(BROWSER_MAIN)};`, 'crossHostBrowserMain(crosshostStages);'].join('\n'),
    entryPath,
    'browser',
    define,
  );
  return { entryPath, node, browser };
}

/** Runs a browser bundle in a bare node:vm context (the page's main-thread path) and returns its cells for a job. */
function browserCells(text: string, job: CrossHostJob): CrossHostCell[] {
  const sandbox: Record<string, unknown> = {};
  runInNewContext(text, sandbox);
  const api = sandbox[CROSSHOST_BROWSER_GLOBAL] as { run(j: CrossHostJob): { cells: CrossHostCell[]; thread: string } } | undefined;
  if (api === undefined) throw new Error('the browser bundle installed no runner');
  const result = JSON.parse(JSON.stringify(api.run(job))) as { cells: CrossHostCell[]; thread: string };
  expect(result.thread).toBe('main');
  return result.cells;
}

const debugJob = (): CrossHostJob => ({ fixture: 'debug-build', seeds: SEEDS, stages: ['debug-build'], inputs: {}, timing: false });
const want = (debugBuild: boolean): string[] => SEEDS.map((s) => crossHostDebugDigest(debugBuild, s));

describe("the cross-host bundler's production option (hardening round S2)", () => {
  it('(a) the production bundles hold no free PLAT_DEBUG_BUILD; the default bundles do', async () => {
    const def = await buildCrossHostBundles(debugEntryPath());
    const prod = await buildCrossHostBundles(debugEntryPath(), { production: true });
    expect(FREE_FLAG.test(def.node), 'default node bundle').toBe(true);
    expect(FREE_FLAG.test(def.browser), 'default browser bundle').toBe(true);
    expect(FREE_FLAG.test(prod.node), 'production node bundle').toBe(false);
    expect(FREE_FLAG.test(prod.browser), 'production browser bundle').toBe(false);
    expect(prod.entryPath).toBe(def.entryPath);
  }, 120_000);

  it('(a) the browser bundle observes its build: DEBUG_BUILD false in production, true by default', async () => {
    const def = await buildCrossHostBundles(debugEntryPath());
    const prod = await buildCrossHostBundles(debugEntryPath(), { production: true });
    expect(browserCells(def.browser, debugJob()).map((c) => c.model)).toEqual(want(true));
    expect(browserCells(prod.browser, debugJob()).map((c) => c.model)).toEqual(want(false));
  }, 120_000);

  it(
    "(a) every Node leg run here observes its build through the runner's bundles option, workers off and on",
    async () => {
      const legs = await runnableNodeLegs();
      expect(legs.length).toBeGreaterThanOrEqual(1);
      const fixture = testFixture(DEBUG_ENTRY, SEEDS, ['debug-build'], 'debug-build');
      for (const production of [false, true]) {
        const bundles = await buildCrossHostBundles(fixture.entryPath, { production });
        const report = await runCrossHost(fixture, { legs, bundles });
        expect(report.runs.map((r) => `${r.leg}/${r.workers}/${r.status}`)).toEqual(legs.flatMap((l) => [`${l}/off/ran`, `${l}/on/ran`]));
        for (const r of report.runs) expect(r.cells?.map((c) => c.model), `${r.leg}/${r.workers} production ${String(production)}`).toEqual(want(!production));
      }
    },
    RUN_TIMEOUT_MS,
  );

  it('(b) the default call is byte-identical to the before image (no option, {}, { production: false })', async () => {
    for (const entryPath of [debugEntryPath(), kernelFixture().entryPath]) {
      const image = await beforeImage(entryPath);
      for (const b of [await buildCrossHostBundles(entryPath), await buildCrossHostBundles(entryPath, {}), await buildCrossHostBundles(entryPath, { production: false })]) {
        expect(b.entryPath).toBe(entryPath);
        expect(b.node === image.node, `${entryPath} node`).toBe(true);
        expect(b.browser === image.browser, `${entryPath} browser`).toBe(true);
      }
    }
    expect(kernelFixture().entryPath).toBe(join(CROSSHOST_PLAT_ROOT, 'packages/testkit/src/crosshost/kernel-stages.ts'));
    expect(KERNEL_FIXTURE_PATH).toBe('bench/src/crosshost/fixtures/kernel.json');
  }, 240_000);

  it('(c) the production call is the before image plus the define PLAT_DEBUG_BUILD=false and nothing else', async () => {
    for (const entryPath of [debugEntryPath(), kernelFixture().entryPath]) {
      const image = await beforeImage(entryPath, { PLAT_DEBUG_BUILD: 'false' });
      const prod = await buildCrossHostBundles(entryPath, { production: true });
      expect(prod.node === image.node, `${entryPath} node`).toBe(true);
      expect(prod.browser === image.browser, `${entryPath} browser`).toBe(true);
    }
  }, 240_000);
});
