// The whole-tree check model-coverage (C-0130; the checker's H1, round r2): every model-code file — the digest closure —
// is linted by the tree lint under the whole model rule set. Its cases run through the tree's own configuration: plat/'s
// eslint.config.js itself (the checker's plant paths, judged without being written), and fixture trees built in the OS
// temporary folder whose eslint.config.js is plat/'s array as the tree's would be for that tree's closure — its ignores
// in force — so a file under a package's test/fixtures/ or dist/ that a model source reaches is ignored exactly as in
// plat/. Nothing is written into plat/. Every test that loads ESLint carries an explicit timeout (wall time grows with
// the load of the shared machine).
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ESLint } from 'eslint';
import { afterAll, describe, expect, it } from 'vitest';
import { CONFIG_FILE, check, checkModelCoverage, missingModelRules, normalizedSetting } from './coverage.mjs';
import { digestClosure } from './digest-closure.mjs';
import { MODEL_RULES } from './rules/index.mjs';
import { PLAT_ROOT } from './rules/shared.mjs';
import { isScannedFile } from './vendor-scan.mjs';

const LINT = 60_000;
const temps = [];
afterAll(() => {
  for (const t of temps) rmSync(t, { recursive: true, force: true });
});

const url = (rel) => JSON.stringify(pathToFileURL(join(PLAT_ROOT, ...rel.split('/'))).href);

/**
 * A fixture tree's eslint.config.js: plat/'s own configuration array (its ignores, parsers and scopes) with the
 * plat/digest-closure entry recommendedFor gives this tree's closure — what plat/'s would be if this tree were plat/ —
 * then TypeScript parsed without type information (the fixture lies in no TypeScript project) and the path rules judging
 * against this root; `extra` entries follow.
 */
function treeConfig(extra = []) {
  return [
    `import tree from ${url('eslint.config.js')};`,
    `import { recommendedFor } from ${url('tools/lint/index.mjs')};`,
    `import { digestClosure } from ${url('tools/lint/digest-closure.mjs')};`,
    'export default [',
    '  ...tree,',
    "  ...recommendedFor(digestClosure(import.meta.dirname)).filter((c) => c.name === 'plat/digest-closure'),",
    "  { files: ['**/*.{ts,tsx,mts,cts}'], languageOptions: { parserOptions: { projectService: false, project: null } } },",
    '  { settings: { plat: { root: import.meta.dirname } } },',
    ...extra.map((e) => `  ${e},`),
    '];',
    '',
  ].join('\n');
}

/** A fixture tree under the OS temporary folder (its real path, so ESLint's paths and ours agree). */
function tree(files) {
  const root = realpathSync(mkdtempSync(join(tmpdir(), 'plat-coverage-')));
  temps.push(root);
  for (const [rel, text] of Object.entries(files)) {
    mkdirSync(join(root, rel, '..'), { recursive: true });
    writeFileSync(join(root, rel), text);
  }
  return root;
}

/** A problem's file and kind: `<rel> ignored | without <rules> | second configuration | no configuration`. */
function brief(p) {
  const [rel, rest] = [p.slice(0, p.indexOf(': ')), p.slice(p.indexOf(': ') + 2)];
  if (/eslint\.config\.js ignores it/.test(rest)) return `${rel} ignored`;
  const without = / lints without (.+?) at the model setting/.exec(rest);
  if (without) return `${rel} without ${without[1]}`;
  if (/^a second ESLint configuration/.test(rest)) return `${rel} second configuration`;
  if (/cannot be computed/.test(rest)) return `${rel} no configuration`;
  return `${rel} ?? ${rest}`;
}

const ALL = Object.keys(MODEL_RULES).sort().join(', ');

describe('the whole-tree check model-coverage', () => {
  it('refuses closure files in folders the tree\'s own eslint.config.js ignores (the checker\'s H1 paths, plat/\'s configuration)', async () => {
    // plat/'s eslint.config.js as `corepack pnpm lint` loads it, over the checker's plant paths (judged, not written):
    // a closure that reaches a package's test/fixtures/ or dist/ is refused, and a model source is linted.
    const closure = {
      files: ['packages/kernel/src/index.ts', 'packages/kernel/test/fixtures/zz-q/x.mjs', 'packages/model/dist/zz/y.mjs', 'packages/site/src/zz/coverage/c.ts'],
    };
    const r = await checkModelCoverage(PLAT_ROOT, { eslint: new ESLint({ cwd: PLAT_ROOT }), closure });
    expect(r.problems.map(brief)).toEqual([
      'packages/kernel/test/fixtures/zz-q/x.mjs ignored',
      'packages/model/dist/zz/y.mjs ignored',
      'packages/site/src/zz/coverage/c.ts ignored',
    ]);
    expect(r).toMatchObject({ ok: false, counts: { files: 4, linted: 1, vendored: 0 } });
  }, LINT);

  it('refuses the checker\'s H1 plants in a tree under the tree\'s configuration, which the tree lint alone passes', async () => {
    const root = tree({
      'eslint.config.js': treeConfig(),
      'packages/kernel/src/index.ts': "export { s } from '../data-zz/x.mjs';\n",
      'packages/kernel/data-zz/x.mjs': 'export const s = Math.sin(1);\n',
      // the checker's plants (checks/M0-d-07.md, round r2, H1)
      'packages/kernel/src/zz-r/c6.ts': "export { q } from '../../test/fixtures/zz-q/x.mjs';\n",
      'packages/kernel/test/fixtures/zz-q/x.mjs': 'export const q = Math.cos(1) + Date.now() + 2 ** 0.5;\n',
      'packages/model/src/zz-r/c7.ts': "export { y } from '../../dist/zz/y.mjs';\n",
      'packages/model/dist/zz/y.mjs': 'export const y = Math.tan(1) + Object.keys({ b: 1, a: 2 }).length;\n',
      // model sources placed in ignored folders seed the closure themselves
      'packages/layout/src/zz-dist/dist/seed.mjs': 'export const z = Math.exp(1);\n',
      'packages/site/src/zz-cov/coverage/seed.mjs': 'export const c = Math.log(2);\n',
    });
    const closure = digestClosure(root);
    expect(closure.outside).toEqual(['packages/kernel/data-zz/x.mjs', 'packages/kernel/test/fixtures/zz-q/x.mjs', 'packages/model/dist/zz/y.mjs']);

    // What the check exists to catch: the tree lint never reads the ignored files, and reports only the reached one.
    const eslint = new ESLint({ cwd: root });
    for (const rel of ['packages/kernel/test/fixtures/zz-q/x.mjs', 'packages/model/dist/zz/y.mjs', 'packages/layout/src/zz-dist/dist/seed.mjs', 'packages/site/src/zz-cov/coverage/seed.mjs']) {
      expect(await eslint.isPathIgnored(join(root, rel)), rel).toBe(true);
    }
    const results = await eslint.lintFiles(['.']);
    expect(Object.fromEntries(results.map((x) => [x.filePath.slice(root.length + 1), x.messages.map((m) => `${m.line} ${m.ruleId ?? m.message}`)]))).toEqual({
      'eslint.config.js': [],
      'packages/kernel/data-zz/x.mjs': ['1 plat/math-allowlist'],
      'packages/kernel/src/index.ts': [],
      'packages/kernel/src/zz-r/c6.ts': [],
      'packages/model/src/zz-r/c7.ts': [],
    });

    const r = await check.run(root); // the check as `corepack pnpm lint` runs it
    expect(r).toEqual(await checkModelCoverage(root));
    expect(r.problems.map(brief)).toEqual([
      'packages/kernel/test/fixtures/zz-q/x.mjs ignored',
      'packages/layout/src/zz-dist/dist/seed.mjs ignored',
      'packages/model/dist/zz/y.mjs ignored',
      'packages/site/src/zz-cov/coverage/seed.mjs ignored',
    ]);
    expect(r).toMatchObject({ ok: false, counts: { files: 8, linted: 4, vendored: 0 } });
  }, LINT);

  it('refuses model code that a weaker setting or a nested configuration takes model rules from', async () => {
    const root = tree({
      'eslint.config.js': treeConfig([
        "{ files: ['packages/site/src/weak/**'], rules: { 'plat/math-allowlist': 'warn', 'plat/no-nondeterminism': ['error', { globalObjects: false }] } }",
      ]),
      'packages/kernel/src/fine.mjs': 'export const f = 1;\n',
      'packages/site/src/weak/a.mjs': 'export const a = 1;\n',
      'packages/layout/src/nest/b.mjs': 'export const b = Math.sin(1);\n',
      'packages/layout/src/nest/eslint.config.js': 'export default [{}];\n',
      'tools/zz/eslint.config.mjs': 'export default [{}];\n',
    });
    // ESLint looks the configuration up from each file's folder: the nested one lints b.mjs with no rule at all.
    const [b] = await new ESLint({ cwd: root }).lintFiles(['packages/layout/src/nest/b.mjs']);
    expect(b.messages).toEqual([]);

    const r = await checkModelCoverage(root);
    expect(r.problems.map(brief)).toEqual([
      'packages/layout/src/nest/eslint.config.js second configuration',
      'tools/zz/eslint.config.mjs second configuration',
      `packages/layout/src/nest/b.mjs without ${ALL}`,
      `packages/layout/src/nest/eslint.config.js without ${ALL}`,
      'packages/site/src/weak/a.mjs without plat/math-allowlist, plat/no-nondeterminism',
    ]);
    expect(r).toMatchObject({ ok: false, counts: { files: 4, linted: 1, vendored: 0 } });
  }, LINT);

  it('leaves the files the vendored scan reads to it, and refuses every other ignored file under vendor/', async () => {
    const root = tree({
      'eslint.config.js': treeConfig(),
      'vendor/zz-lib@1.0.0/package.json': '{}\n',
      'vendor/zz-lib@1.0.0/index.js': 'export default 1;\n',
      'vendor/zz-lib@1.0.0/view.jsx': 'export const v = 1;\n',
      'vendor/loose/x.mjs': 'export const x = 1;\n',
      'packages/kernel/src/adapters/zz-lib.ts': [
        "export { default } from '../../../../vendor/zz-lib@1.0.0/index.js';",
        "export { v } from '../../../../vendor/zz-lib@1.0.0/view.jsx';",
        "export { x } from '../../../../vendor/loose/x.mjs';",
        '',
      ].join('\n'),
    });
    expect(isScannedFile(root, 'vendor/zz-lib@1.0.0/index.js')).toBe(true);
    for (const rel of ['vendor/zz-lib@1.0.0/view.jsx', 'vendor/zz-lib@1.0.0/index.d.ts', 'vendor/zz-lib@1.0.0/node_modules/q/index.js', 'vendor/loose/x.mjs', 'vendor/zz-lib@1.0.0', 'packages/kernel/src/adapters/zz-lib.ts']) {
      expect(isScannedFile(root, rel), rel).toBe(false);
    }
    const r = await checkModelCoverage(root);
    expect(r.problems.map(brief)).toEqual(['vendor/loose/x.mjs ignored', 'vendor/zz-lib@1.0.0/view.jsx ignored']);
    expect(r).toMatchObject({ ok: false, counts: { files: 4, linted: 1, vendored: 1 } });
  }, LINT);

  it('fails closed when no configuration can be computed for model code', async () => {
    const root = tree({ 'packages/kernel/src/a.mjs': 'export const a = 1;\n' });
    const failing = { isPathIgnored: async () => { throw new Error('Could not find config file.'); } };
    const r = await checkModelCoverage(root, { eslint: failing });
    expect(r.problems.map(brief)).toEqual(['packages/kernel/src/a.mjs no configuration']);
    expect(r.ok).toBe(false);
  });

  it('reads ESLint\'s settings and the configuration files\' names', () => {
    expect(normalizedSetting('error')).toEqual([2]);
    expect(normalizedSetting(['warn', { a: 1 }])).toEqual([1, { a: 1 }]);
    expect(normalizedSetting([2])).toEqual([2]);
    expect(missingModelRules({ rules: Object.fromEntries(Object.keys(MODEL_RULES).map((n) => [n, [2]])) })).toEqual([]);
    expect(missingModelRules({ rules: { 'plat/math-allowlist': [2] } })).toEqual(Object.keys(MODEL_RULES).filter((n) => n !== 'plat/math-allowlist').sort());
    expect(missingModelRules(undefined)).toEqual(Object.keys(MODEL_RULES).sort());
    for (const n of ['eslint.config.js', 'eslint.config.mjs', 'eslint.config.cjs', 'eslint.config.ts', 'eslint.config.mts', 'eslint.config.cts']) expect(CONFIG_FILE.test(n), n).toBe(true);
    for (const n of ['eslint.config.json', 'my-eslint.config.js', '.eslintrc.js']) expect(CONFIG_FILE.test(n), n).toBe(false);
  });

  it('passes the real plat/ tree: every model-code file is linted under the whole model rule set', async () => {
    const r = await checkModelCoverage(PLAT_ROOT);
    expect(r.problems).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.counts.files).toBeGreaterThan(20);
    expect(r.counts.linted).toBe(r.counts.files - r.counts.vendored);
  }, LINT);
});
