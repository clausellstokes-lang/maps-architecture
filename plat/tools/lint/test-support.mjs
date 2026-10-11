// What the lint's test files share (not a test file: the tools project collects only `*.test.mjs` and `*.test.ts`):
// fixture trees in the OS temporary folder, each removed when its test file ends; the explicit timeouts of a test that
// runs ESLint or scans libraries (C-0128 (6)); C-0125 (6)'s vetted division; and the plat/ rules a computed ESLint
// configuration sets. Nothing here writes into plat/.
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/**
 * The timeout of a test that runs ESLint, walks a tree or lints a file: wall time grows with the load of the shared
 * machine, and vitest's 5 s default is no bar of the lint. Informative headroom, never a timing.
 */
export const LINT_TIMEOUT = 60_000;
/** The timeout of a test that scans whole vendored libraries. */
export const SCAN_TIMEOUT = 120_000;

const temps = [];

/** Registers a path (a folder or a link) for removal by removeTempTrees. */
export function removeLater(path) {
  temps.push(path);
  return path;
}

/** Writes `files` (relative path → text) under root, creating their folders. */
export function writeTree(root, files) {
  for (const [rel, text] of Object.entries(files)) {
    mkdirSync(join(root, rel, '..'), { recursive: true });
    writeFileSync(join(root, rel), text);
  }
}

/**
 * A new folder `<tmp>/<prefix>…` holding `files`, registered for removal; `real` returns its real path (so ESLint's
 * paths and the test's agree where the OS temporary folder is reached through a link).
 */
export function tempTree(prefix, files = {}, { real = false } = {}) {
  const made = mkdtempSync(join(tmpdir(), prefix));
  const root = removeLater(real ? realpathSync(made) : made);
  writeTree(root, files);
  return root;
}

/** Removes every registered path; each test file calls it in its own afterAll. */
export function removeTempTrees() {
  for (const t of temps.splice(0)) rmSync(t, { recursive: true, force: true });
}

/** C-0125 (6)'s vetted division: a kernel division carrying its one allowed directive with the reason. */
export const VETTED_DIVISION = [
  'export function vetted(x: number, y: number): number {',
  "  // eslint-disable-next-line plat/ratio-division -- an fdlibm routine's division, vetted",
  '  return x / y;',
  '}',
  '',
].join('\n');

/** The plat/ rules a computed configuration sets at severity 2 ("error"), without the prefix, sorted. */
export function platRuleNames(config) {
  return Object.entries(config.rules ?? {})
    .filter(([name, v]) => name.startsWith('plat/') && (Array.isArray(v) ? v[0] : v) === 2)
    .map(([name]) => name.slice('plat/'.length))
    .sort();
}
