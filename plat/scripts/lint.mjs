#!/usr/bin/env node
// `corepack pnpm lint` (C-0060): ESLint over plat/ with zero warnings allowed, then every whole-tree check the lint
// plugin exports (`checks` in tools/lint/index.mjs — probe-red, vendor-scan, repository-path, inline-directives,
// model-coverage, no-bare-pnpm, licences, kernel-boundary, bench-boundary, each described in its module).
// Exit 0 only when ESLint reports nothing and every check passes.
import { ESLint } from 'eslint';
import { fileURLToPath } from 'node:url';
import plat from '../tools/lint/index.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const eslint = new ESLint({ cwd: root });
const results = await eslint.lintFiles(['.']);
const formatter = await eslint.loadFormatter('stylish');
const text = await formatter.format(results);
const errors = results.reduce((n, r) => n + r.errorCount, 0); // fatal errors are counted inside errorCount
const warnings = results.reduce((n, r) => n + r.warningCount, 0);
if (text) process.stdout.write(text);
let failed = errors > 0 || warnings > 0;
process.stdout.write(`lint: eslint ${results.length} files, ${errors} errors, ${warnings} warnings\n`);

for (const check of plat.checks) {
  const r = await check.run(root);
  for (const p of r.problems) process.stderr.write(`lint ${check.name}: ${p}\n`);
  process.stdout.write(`lint: ${check.name} ${r.ok ? 'ok' : 'FAIL'}\n`);
  if (!r.ok) failed = true;
}
process.stdout.write(`lint: ${plat.checks.length} whole-tree checks\n`);
if (failed) process.exit(1);
