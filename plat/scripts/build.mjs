#!/usr/bin/env node
// `corepack pnpm build` (M0-s-01; §1.7): `tsc -b` over the project references (type check of every package and its
// tests, declarations to dist/types/), then one esbuild ESM library bundle per package to dist/index.js — workspace and
// vendored dependencies left external, no minification, so /*! */ banners and licence comments stay (§17.4). The bench
// is run from source through tsx and is not bundled. No app exists at M0.
// Notices (the kernel reuse round, J224): each bundle's dist/ also receives plat/LICENSE and THIRD-PARTY-NOTICES.txt,
// so a packed package (its manifest's "files": ["dist"]) carries them; fdlibm's notice stays in the bundle itself as
// dmath's /*! */ legal comments. Importable: the bundle options and the notice copy are exported for
// tools/notices/shipped.test.mjs, and the build runs only when this file is the script.
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = fileURLToPath(new URL('../', import.meta.url));

/** The files every bundled package's dist/ carries beside index.js (plat/-relative). */
export const SHIPPED_NOTICES = Object.freeze(['LICENSE', 'THIRD-PARTY-NOTICES.txt']);

/** esbuild's options for one package's library bundle (`dir` the package folder). */
export function bundleOptions(dir) {
  return {
    entryPoints: [join(dir, 'src', 'index.ts')],
    outfile: join(dir, 'dist', 'index.js'),
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    target: 'es2022',
    packages: 'external',
    legalComments: 'inline',
    charset: 'utf8',
    logLevel: 'warning',
  };
}

/** Copies SHIPPED_NOTICES from `platRoot` into `dir`/dist/; a missing notice throws (a package never ships without it). */
export function copyNotices(platRoot, dir) {
  const out = join(dir, 'dist');
  mkdirSync(out, { recursive: true });
  return SHIPPED_NOTICES.map((name) => {
    const from = join(platRoot, name);
    if (!existsSync(from)) throw new Error(`build: ${name} is missing from plat/; a package never ships without it`);
    copyFileSync(from, join(out, name));
    return join(out, name);
  });
}

async function main() {
  const require = createRequire(import.meta.url);
  const tsc = join(dirname(require.resolve('typescript/package.json')), 'bin', 'tsc');

  const t = spawnSync(process.execPath, [tsc, '-b', 'tsconfig.json'], { cwd: root, stdio: 'inherit' });
  if (t.status !== 0) {
    process.stderr.write(`build: tsc -b failed (exit ${t.status})\n`);
    process.exit(t.status ?? 1);
  }
  process.stdout.write('build: tsc -b ok\n');

  const packagesDir = join(root, 'packages');
  const names = readdirSync(packagesDir).filter((n) => existsSync(join(packagesDir, n, 'src', 'index.ts'))).sort();
  for (const name of names) {
    const dir = join(packagesDir, name);
    const options = bundleOptions(dir);
    await build(options);
    copyNotices(root, dir);
    process.stdout.write(
      `build: esbuild @plat/${name} -> packages/${name}/dist/index.js (${statSync(options.outfile).size} bytes) + ${SHIPPED_NOTICES.join(', ')}\n`,
    );
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
