#!/usr/bin/env node
// `corepack pnpm build` (M0-s-01; §1.7): `tsc -b` over the project references (type check of every package and its
// tests, declarations to dist/types/), then one esbuild ESM library bundle per package to dist/index.js — workspace and
// vendored dependencies left external, no minification, so /*! */ banners and licence comments stay (§17.4). The bench
// is run from source through tsx and is not bundled. No app exists at M0.
import { spawnSync } from 'node:child_process';
import { readdirSync, existsSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = fileURLToPath(new URL('../', import.meta.url));
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
  const outfile = join(dir, 'dist', 'index.js');
  await build({
    entryPoints: [join(dir, 'src', 'index.ts')],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    target: 'es2022',
    packages: 'external',
    legalComments: 'inline',
    charset: 'utf8',
    logLevel: 'warning',
  });
  process.stdout.write(`build: esbuild @plat/${name} -> packages/${name}/dist/index.js (${statSync(outfile).size} bytes)\n`);
}
