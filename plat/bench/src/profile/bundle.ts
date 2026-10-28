// bench/src/profile/bundle.ts — R7's build-bundle.mjs: the production bundle of the driver. esbuild (plat's), bundle,
// format esm, target es2022 (as scripts/build.mjs), platform node, the plat-source condition, no keepNames, an inline
// source map (the analysers map every frame back to TypeScript through it), playwright-core external, each module's
// import.meta.url replaced by its own file URL, and `define PLAT_DEBUG_BUILD=false` (the production bundle
// kernel/src/invariants/debug.ts names: the slot-stamp assertions off). The entry is a two-line stdin module that runs
// driver.ts's main on the child's argv, so driver.ts itself has no side effect on import.
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build, type Plugin } from 'esbuild';

const HERE = dirname(fileURLToPath(import.meta.url));
/** plat/ (this file is bench/src/profile/bundle.ts). */
export const PLAT_ROOT = join(HERE, '..', '..', '..');

const metaUrl: Plugin = {
  name: 'import-meta-url',
  setup(b) {
    b.onLoad({ filter: /\.(m?ts|m?js)$/ }, async (args) => {
      if (args.path.includes('/node_modules/')) return undefined;
      const text = await readFile(args.path, 'utf8');
      if (!text.includes('import.meta.url')) return undefined;
      return { contents: text.replaceAll('import.meta.url', JSON.stringify(pathToFileURL(args.path).href)), loader: args.path.endsWith('js') ? 'js' : 'ts' };
    });
  },
};

/** What the build reported, and what the bundle text shows of the two production properties R7 checked. */
export interface BundleReport {
  readonly outfile: string;
  readonly errors: number;
  readonly warnings: number;
  readonly bytes: number;
  /** `__name(` occurrences (esbuild's keepNames helper): 0 in the production bundle. */
  readonly keepNames: number;
  /** The free identifier PLAT_DEBUG_BUILD still in the text: false when the define took. */
  readonly debugFlagLeft: boolean;
}

/** Builds the driver's production bundle into `outfile`. */
export async function buildBundle(outfile: string): Promise<BundleReport> {
  const r = await build({
    stdin: { contents: "import { main } from './driver.ts';\nmain(process.argv.slice(2));\n", resolveDir: HERE, sourcefile: 'profile-entry.ts', loader: 'ts' },
    outfile,
    bundle: true,
    format: 'esm',
    target: 'es2022',
    platform: 'node',
    conditions: ['plat-source'],
    external: ['playwright-core'],
    sourcemap: 'inline',
    define: { PLAT_DEBUG_BUILD: 'false' },
    plugins: [metaUrl],
    logLevel: 'silent',
    absWorkingDir: PLAT_ROOT,
  });
  const text = await readFile(outfile, 'utf8');
  const code = text.slice(0, text.lastIndexOf('//# sourceMappingURL='));
  return { outfile, errors: r.errors.length, warnings: r.warnings.length, bytes: Buffer.byteLength(text, 'utf8'), keepNames: code.split('__name(').length - 1, debugFlagLeft: /\bPLAT_DEBUG_BUILD\b/.test(code) };
}
