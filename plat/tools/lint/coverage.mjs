// The whole-tree check `model-coverage` (C-0130; the checker's H1, round r2): every file of model code — the digest
// closure: the five model packages' sources and every file they reach (digest-closure.mjs) — is linted by the tree lint
// under the whole model rule set, or the lint fails. The configuration decides what ESLint reads, and three things in it
// can take model code out of the model rule set without any rule reporting:
//   (1) eslint.config.js's ignores (`**/test/fixtures/**`, `**/dist/**`, `**/coverage/**`, `vendor/**`, ESLint's own
//       `**/node_modules/`): a model source that imports a file there, or a model source placed there, is never read;
//   (2) a later configuration entry that turns a model rule off for some files, or weakens its options;
//   (3) a second ESLint configuration file below plat/: ESLint 10 looks a configuration up from each file's folder, so
//       a nested `eslint.config.js` replaces plat/'s own for its folder (one exporting `[{}]` lints with no rule).
// So for each closure file the check asks the tree's ESLint (`new ESLint({ cwd: root })`, plat/'s eslint.config.js)
// whether the file is ignored and which rules its configuration sets, and refuses — naming the file — model code that is
// ignored or lacks a model rule at its MODEL_RULES setting; and it refuses every ESLint configuration file in plat/ but
// the root's. A file is refused, not linted on the side: the tree lint (with its type information, dependency-direction
// and repository-path) stays the one judge of model code, and the file moves out of the ignored folder. The files the
// vendored scan reads (a code file of `vendor/<name>@<version>/`; §6.5 (4)) are the scan's, and are counted apart.
// What the closure reaches that is not code is not model code (C-0131): its JSON data (`closure.data`, C-0005's
// registries) carries nothing a model rule judges and is counted only; any other file that is neither code nor JSON
// (`closure.unjudged`: a WebAssembly module, a native addon, an asset) is refused, since no rule can judge it.
import { join, resolve } from 'node:path';
import { ESLint } from 'eslint';
import { stableJson } from '../vendor/common.mjs';
import { digestClosure } from './digest-closure.mjs';
import { walkTree } from './paths.mjs';
import { MODEL_RULES } from './rules/index.mjs';
import { PLAT_ROOT, byCodeUnit } from './rules/shared.mjs';
import { isScannedFile } from './vendor-scan.mjs';

/** An ESLint configuration file's name (the names ESLint 10 looks up). */
export const CONFIG_FILE = /^eslint\.config\.(js|mjs|cjs|ts|mts|cts)$/;

const SEVERITY = { off: 0, warn: 1, error: 2 };
/** A rule setting in ESLint's normalized form: [severity, ...options]. */
export function normalizedSetting(v) {
  const a = Array.isArray(v) ? v : [v];
  const severity = typeof a[0] === 'string' ? SEVERITY[a[0]] : a[0];
  return [severity, ...a.slice(1)];
}

/** The model rules a computed configuration lacks at their MODEL_RULES setting (severity and options), sorted. */
export function missingModelRules(config) {
  const set = config?.rules ?? {};
  return Object.keys(MODEL_RULES)
    .filter((name) => !Object.hasOwn(set, name) || stableJson(normalizedSetting(set[name])) !== stableJson(normalizedSetting(MODEL_RULES[name])))
    .sort(byCodeUnit);
}

/**
 * The whole-tree check: { ok, problems, counts }. `eslint` and `closure` default to the tree's own (plat/'s
 * eslint.config.js, as `corepack pnpm lint` loads it, and digestClosure(root)).
 */
export async function checkModelCoverage(root = PLAT_ROOT, { eslint = new ESLint({ cwd: root }), closure = digestClosure(root) } = {}) {
  const problems = [];
  let linted = 0;
  let vendored = 0;
  for (const rel of walkTree(root).files) {
    const base = rel.split('/').pop();
    if (rel !== base && CONFIG_FILE.test(base)) {
      problems.push(`${rel}: a second ESLint configuration — ESLint looks a configuration up from each file's folder, so it replaces plat/'s eslint.config.js for its folder; plat/ has one (C-0130)`);
    }
  }
  for (const rel of closure.unjudged ?? []) {
    problems.push(`${rel}: a file model code (the digest closure) reaches that is neither code the tree lint reads nor JSON data (a WebAssembly module, a native addon, an asset), so no model rule can judge it (§6.5 (3), C-0131)`);
  }
  for (const rel of closure.files) {
    if (isScannedFile(root, rel)) {
      vendored += 1;
      continue;
    }
    const abs = join(root, ...rel.split('/'));
    let ignored;
    let config;
    try {
      ignored = await eslint.isPathIgnored(abs);
      config = ignored ? undefined : await eslint.calculateConfigForFile(abs);
    } catch (err) {
      problems.push(`${rel}: model code for which the tree's ESLint configuration cannot be computed (${String(err.message).split('\n')[0]}) (§6.5 (3), C-0130)`);
      continue;
    }
    if (ignored) {
      problems.push(`${rel}: model code (the digest closure) that the tree lint never reads — eslint.config.js ignores it (a test/fixtures/, dist/, coverage/ or node_modules/ folder, or vendor/ outside a scanned library), or no configuration entry matches it, so no model rule reaches it; move it where the tree lint reads it (§6.5 (3), C-0130, C-0131)`);
      continue;
    }
    const missing = config === undefined ? Object.keys(MODEL_RULES).sort(byCodeUnit) : missingModelRules(config);
    if (missing.length > 0) {
      problems.push(`${rel}: model code (the digest closure) that the tree's ESLint configuration lints without ${missing.join(', ')} at the model setting ("error"), so those rules do not reach it (§6.5 (3), C-0130)`);
      continue;
    }
    linted += 1;
  }
  return { ok: problems.length === 0, problems, counts: { files: closure.files.length, linted, vendored, data: closure.data?.length ?? 0 } };
}

export const check = {
  name: 'model-coverage',
  run(root) {
    return checkModelCoverage(resolve(root));
  },
};
