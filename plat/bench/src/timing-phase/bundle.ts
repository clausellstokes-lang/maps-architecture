// The timing phase's production bundle (M0-t-00 hardening round S1, RL10 (a); Q72; the session's ruling on Q1, J725).
// The timing phase times the PRODUCT, never a debug source run: a source run (tsx, the plat-source condition) is a debug
// build — kernel/src/invariants/debug.ts's slot-stamp assertions on — with tsx's keepNames (`__name`), which cost the
// CITY stages 1.6 – 2× and more (checks/profile-city-stages.md §2.5, §5 fix 3, §6 (1)) while §12.4 budgets the product.
//
// THE RECIPE is a STATED COPY of bench/src/profile/bundle.ts's (R7's build-bundle.mjs; the session's profile tool, J622):
// esbuild (plat's), bundle, format esm, target es2022, platform node, the plat-source condition, no keepNames, an inline
// source map, each module's import.meta.url replaced by its own file URL (so every path a module computes from it still
// points into plat/ — the record, the work file, the reference score, the gate-stages table), and
// `define PLAT_DEBUG_BUILD=false` (the production bundle debug.ts names). There is no seam on profile/bundle.ts (its
// `buildBundle` hard-codes its driver as the entry); the two copies are pass B's to unify, and
// bench/test/timing-phase/bundle.test.ts reads both sources and turns red when either recipe changes. What this copy
// adds, and why:
//   * its entry is a two-line stdin module that runs ./child.ts's `childMain` on the child's argv (the bundle's own file
//     URL handed in, so the child can read what it is);
//   * it is written under $PLAT_BENCH_OUT/timing-phase/bundle/ (C-0067: outputs go out, never into plat/), so the run-time
//     externals — esbuild (the Chromium leg's bundler, M0-d-06's buildCrossHostBundles) and playwright-core (the browser)
//     — are resolved FROM plat/ by esbuild's own resolver at build time and imported by absolute file URL, so the bundle
//     loads outside plat/ (profile's bundle names playwright-core external by its bare name, which resolves only beside
//     plat/'s node_modules);
//   * esbuild's service is stopped after the build, so the launcher leaves no esbuild child of its own beside the
//     measuring process;
//   * the report adds the bundle's sha256 (the record's build block, RL10 (iv)).
import { createHash } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build, stop, transform, type Plugin } from 'esbuild';
import type { LegBuild } from './protocol.js';

const HERE = dirname(fileURLToPath(import.meta.url));
/** plat/ (this file is bench/src/timing-phase/bundle.ts). */
const PLAT_DIR = join(HERE, '..', '..', '..');

/** The recipe's home (the record's build block names it, RL10 (iv)). */
export const RECIPE = 'bench/src/timing-phase/bundle.ts — a stated copy of bench/src/profile/bundle.ts\'s production recipe (J622)';

/**
 * Each module's import.meta.url replaced by its own file URL — profile's plugin, with ONE stated difference: the
 * replacement is made on the module's CODE (esbuild's `define` on the module, through esbuild's own `transform`, the
 * TypeScript of tsconfig.base.json's ES2022 target, an inline source map the bundle chains), never on its text. Profile's
 * textual `replaceAll` also rewrites the words inside a string literal, and the timing phase bundles two such strings —
 * @plat/testkit's crosshost/bundle.ts:29 (NODE_BANNER) and :67 (the Node leg's stdin) — where the rewrite is a syntax
 * error the build refuses (and, inside a single-quoted string, a silent change of the Node leg's own URL). Profile's
 * driver bundles neither file, so its copy is unaffected (reported to the session for pass B's unification).
 */
const metaUrl: Plugin = {
  name: 'import-meta-url',
  setup(b) {
    b.onLoad({ filter: /\.(m?ts|m?js)$/ }, async (args) => {
      if (args.path.includes('/node_modules/')) return undefined;
      const text = await readFile(args.path, 'utf8');
      if (!text.includes('import.meta.url')) return undefined;
      const t = await transform(text, {
        loader: args.path.endsWith('js') ? 'js' : 'ts',
        format: 'esm',
        target: 'es2022',
        sourcemap: 'inline',
        sourcefile: args.path,
        tsconfigRaw: { compilerOptions: { target: 'ES2022', useDefineForClassFields: true } },
        define: { 'import.meta.url': JSON.stringify(pathToFileURL(args.path).href) },
      });
      return { contents: t.code, loader: 'js' };
    });
  },
};

/** The packages the child imports at run time and the bundle leaves out (resolved from plat/, by file URL). */
export const RUNTIME_EXTERNALS = ['esbuild', 'playwright-core'] as const;

const RESOLVING = 'timing-phase-externals';

const runtimeExternals: Plugin = {
  name: RESOLVING,
  setup(b) {
    b.onResolve({ filter: /^(esbuild|playwright-core)$/ }, async (args) => {
      if (args.pluginData === RESOLVING) return undefined;
      const r = await b.resolve(args.path, { kind: args.kind, resolveDir: args.resolveDir, importer: args.importer, pluginData: RESOLVING });
      if (r.errors.length > 0) return { errors: r.errors };
      return { path: pathToFileURL(r.path).href, external: true };
    });
  },
};

/** What the build reported, and what the bundle text shows of the production properties (profile's BundleReport + sha256). */
export interface PhaseBundleReport {
  readonly outfile: string;
  readonly errors: number;
  readonly warnings: number;
  readonly bytes: number;
  readonly sha256: string;
  /** `__name(` occurrences (esbuild's keepNames helper) in the code: 0 in the production bundle. */
  readonly keepNames: number;
  /** The free identifier PLAT_DEBUG_BUILD still in the code: false when the define took. */
  readonly debugFlagLeft: boolean;
}

// The two production properties are read from the bundle's CODE (the text before its inline source map) as profile's
// BundleReport reads them, with one stated difference: the timing phase's bundle holds this scanner and M0-d-06's bundler
// (crosshost/bundle.ts: `{ PLAT_DEBUG_BUILD: 'false' }`), so a bare-word search finds the flag's NAME where no free
// identifier is left. The flag counts only as an identifier — not an object key, a property, or inside a string or a
// regular expression — and the scanner's own needles are assembled at run time, so the scanner never finds itself.
const FLAG = ['PLAT', 'DEBUG', 'BUILD'].join('_');
const KEEP_NAMES = ['__name', '('].join('');
const FREE_FLAG = new RegExp(`(?<![\\w$.'"\`/])${FLAG}(?![\\w$'"\`])(?!\\s*:)`);

/** The facts of a bundle's text (its code: the text before the inline source map). */
export function bundleFacts(text: string): { bytes: number; sha256: string; keepNames: number; debugFlagLeft: boolean } {
  const cut = text.lastIndexOf('//# sourceMappingURL=');
  const code = cut < 0 ? text : text.slice(0, cut);
  return {
    bytes: Buffer.byteLength(text, 'utf8'),
    sha256: createHash('sha256').update(text, 'utf8').digest('hex'),
    keepNames: code.split(KEEP_NAMES).length - 1,
    debugFlagLeft: FREE_FLAG.test(code),
  };
}

/**
 * A leg's build read from its bundle's text (RL10 (c)), as profile/bundle.ts:57-59 scans: production when the free
 * identifier PLAT_DEBUG_BUILD is gone (the define took) and no `__name(` is left; otherwise debug.
 */
export function legBuildOf(text: string, from: string): LegBuild {
  const f = bundleFacts(text);
  return { build: !f.debugFlagLeft && f.keepNames === 0 ? 'production' : 'debug', from, debugFlagLeft: f.debugFlagLeft, keepNames: f.keepNames };
}

/** The bundle's entry: runs child.ts's childMain on the argv, handing it the bundle's own URL; exits with its code. */
export const ENTRY = "import { childMain } from './child.ts';\nprocess.exit(await childMain(process.argv.slice(2), { bundle: new URL(import.meta.url) }));\n";

/** Builds the timing phase's production bundle into `outfile` (its folder made), then stops esbuild's service. */
export async function buildPhaseBundle(outfile: string): Promise<PhaseBundleReport> {
  mkdirSync(dirname(outfile), { recursive: true });
  let r;
  try {
    r = await build({
      stdin: { contents: ENTRY, resolveDir: HERE, sourcefile: 'timing-phase-entry.ts', loader: 'ts' },
      outfile,
      bundle: true,
      format: 'esm',
      target: 'es2022',
      platform: 'node',
      conditions: ['plat-source'],
      sourcemap: 'inline',
      define: { PLAT_DEBUG_BUILD: 'false' },
      plugins: [runtimeExternals, metaUrl],
      logLevel: 'silent',
      absWorkingDir: PLAT_DIR,
    });
  } catch (e) {
    await stop();
    const n = (e as { errors?: unknown[] }).errors?.length ?? 1;
    return { outfile, errors: n, warnings: 0, bytes: 0, sha256: '', keepNames: 0, debugFlagLeft: true };
  }
  await stop();
  const text = await readFile(outfile, 'utf8');
  return { outfile, errors: r.errors.length, warnings: r.warnings.length, ...bundleFacts(text) };
}
