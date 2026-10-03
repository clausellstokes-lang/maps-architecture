// The whole-tree check model-coverage (C-0130; the checker's H1, round r2): every model-code file — the digest closure —
// is linted by the tree lint under the whole model rule set. Its cases run through the tree's own configuration: plat/'s
// eslint.config.js itself (the checker's plant paths, judged without being written), and fixture trees built in the OS
// temporary folder whose eslint.config.js is plat/'s array as the tree's would be for that tree's closure — its ignores
// in force — so a file under a package's test/fixtures/ or dist/ that a model source reaches is ignored exactly as in
// plat/. Nothing is written into plat/. Every test that loads ESLint carries an explicit timeout (wall time grows with
// the load of the shared machine).
import { mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ESLint } from 'eslint';
import { afterAll, describe, expect, it } from 'vitest';
import { CONFIG_FILE, check, checkModelCoverage, missingModelRules, normalizedSetting } from './coverage.mjs';
import { digestClosure } from './digest-closure.mjs';
import { checkInlineDirectives } from './directives.mjs';
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
  if (/neither code the tree lint reads nor JSON data/.test(rest)) return `${rel} unjudged`;
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
    // Not ignored, yet no configuration computed (unreachable in ESLint 10.12, the closing check's note N3): every model
    // rule is missing, so the file is refused, not counted as linted.
    const unmatched = { isPathIgnored: async () => false, calculateConfigForFile: async () => undefined };
    const u = await checkModelCoverage(root, { eslint: unmatched });
    expect(u.problems.map(brief)).toEqual([`packages/kernel/src/a.mjs without ${ALL}`]);
    expect(u).toMatchObject({ ok: false, counts: { files: 1, linted: 0 } });
  });

  // C-0005's registries: versioned JSON inside @plat/kernel that the kernel reads (model code may not import node:fs).
  const JSON_DATA = {
    'eslint.config.js': treeConfig(),
    // the checker's plant (checks/M0-d-07.md, closing round r3, B1), at C-0005's path
    'packages/kernel/src/arena/roles.json': '{ "version": 1, "roles": [{ "id": 0, "name": "zz-wall" }] }\n',
    'packages/kernel/src/arena/zz-read.ts': "import roles from './roles.json';\nexport const zzRoleCount: number = roles.roles.length;\n",
    'packages/kernel/src/registry/stages.json': '{ "version": 1, "stages": ["S0"] }\n',
    'packages/kernel/src/registry/zz-stages.ts': "import stages from './stages.json';\nexport const zzStageCount: number = stages.stages.length;\n",
    // the same in @plat/tables, a JSON file outside a package's src/, and one in an ignored folder: all data
    'packages/tables/src/zz-table.json': '{ "cells": [1, 2] }\n',
    'packages/tables/src/zz-read.ts': "import table from './zz-table.json';\nexport const zzCells: number = table.cells.length;\n",
    'packages/kernel/data/zz-outside.json': '{ "n": 1 }\n',
    'packages/kernel/src/zz-outside.ts': "import outside from '../data/zz-outside.json';\nexport const zzN: number = outside.n;\n",
    'packages/site/test/fixtures/zz/table.json': '{ "n": 2 }\n',
    'packages/site/src/zz-fixture.ts': "import table from '../test/fixtures/zz/table.json';\nexport const zzT: number = table.n;\n",
  };
  const DATA = ['packages/kernel/data/zz-outside.json', 'packages/kernel/src/arena/roles.json', 'packages/kernel/src/registry/stages.json', 'packages/site/test/fixtures/zz/table.json', 'packages/tables/src/zz-table.json'];

  it('passes model code that imports its JSON data (C-0005\'s registries) through the tree lint, inline-directives and model-coverage (the checker\'s B1, C-0131)', async () => {
    const root = tree(JSON_DATA);
    const closure = digestClosure(root);
    expect(closure.data).toEqual(DATA);
    expect(closure.files).toEqual(['packages/kernel/src/arena/zz-read.ts', 'packages/kernel/src/registry/zz-stages.ts', 'packages/kernel/src/zz-outside.ts', 'packages/site/src/zz-fixture.ts', 'packages/tables/src/zz-read.ts']);
    expect(closure.outside).toEqual([]); // no JSON file in the plat/digest-closure entry: ESLint would parse it as code
    expect(closure.unjudged).toEqual([]);

    // The tree lint through plat/'s own configuration array: every source read, nothing reported, no JSON parsed as code.
    const results = await new ESLint({ cwd: root }).lintFiles(['.']);
    expect(results.map((x) => x.filePath.slice(root.length + 1)).sort()).toEqual(['eslint.config.js', ...closure.files]);
    expect(results.flatMap((x) => x.messages)).toEqual([]);

    expect(checkInlineDirectives(root)).toEqual({ ok: true, problems: [], counts: { files: 5, directives: 0 } });
    const r = await check.run(root); // the check as `corepack pnpm lint` runs it
    expect(r).toEqual({ ok: true, problems: [], counts: { files: 5, linted: 5, vendored: 0, data: 5 } });
  }, LINT);

  it('still refuses a code file reached the same way under test/fixtures/ (C-0130 (1), C-0131)', async () => {
    const root = tree({
      ...JSON_DATA,
      'packages/kernel/test/fixtures/zz-q/x.mjs': 'export const q = Math.cos(1);\n',
      'packages/kernel/src/arena/zz-code.ts': "export { q } from '../../test/fixtures/zz-q/x.mjs';\n",
    });
    const closure = digestClosure(root);
    expect(closure.data).toEqual(DATA);
    expect(closure.outside).toEqual(['packages/kernel/test/fixtures/zz-q/x.mjs']);
    const r = await check.run(root);
    expect(r.problems.map(brief)).toEqual(['packages/kernel/test/fixtures/zz-q/x.mjs ignored']);
    expect(r).toMatchObject({ ok: false, counts: { files: 7, linted: 6, vendored: 0, data: 5 } });
  }, LINT);

  it('refuses a file model code reaches that is neither code nor JSON data (C-0131)', async () => {
    const root = tree({
      'eslint.config.js': treeConfig(),
      'packages/kernel/src/accel.wasm': '\0asm',
      'packages/kernel/src/addon.node': 'native',
      'packages/kernel/src/zz-accel.ts': "import accel from './accel.wasm';\nimport addon = require('./addon.node');\nexport const a = [accel, addon];\n",
    });
    const closure = digestClosure(root);
    expect(closure).toMatchObject({ files: ['packages/kernel/src/zz-accel.ts'], data: [], unjudged: ['packages/kernel/src/accel.wasm', 'packages/kernel/src/addon.node'] });
    const r = await check.run(root);
    expect(r.problems.map(brief)).toEqual(['packages/kernel/src/accel.wasm unjudged', 'packages/kernel/src/addon.node unjudged']);
    expect(r).toMatchObject({ ok: false, counts: { files: 1, linted: 1, vendored: 0, data: 0 } });
    expect(checkInlineDirectives(root)).toMatchObject({ ok: true, counts: { files: 1 } }); // read by neither check as code
  }, LINT);

  it('takes a path into node_modules for the vendored library it names when its bytes are the library\'s (the closing check\'s note N4, C-0131)', async () => {
    const root = tree({
      'eslint.config.js': treeConfig(),
      'vendor/zz-lib@1.0.0/package.json': '{ "name": "zz-lib", "version": "1.0.0" }\n',
      'vendor/zz-lib@1.0.0/index.js': 'export default 1;\n',
      'packages/kernel/package.json': '{ "name": "@plat/kernel", "dependencies": { "zz-lib": "workspace:*" } }\n',
      // the adapter's node_modules spelling, which dependency-direction allows (C-0129 (3))
      'packages/kernel/src/adapters/zz-lib.ts': "export { default } from '../../node_modules/zz-lib/index.js';\n",
      // a copy of the library's name that is not the vendored bytes: still model code the tree lint never reads
      'packages/layout/node_modules/zz-lib/index.js': 'export default Math.sin(1);\n',
      'packages/layout/src/zz-copy.ts': "export { default as c } from '../node_modules/zz-lib/index.js';\n",
      // a link of the name into the library's own node_modules, whose files the scan does not read: the same
      'vendor/zz-lib@1.0.0/node_modules/zz-lib/index.js': 'export default Math.cos(1);\n',
      'packages/site/src/zz-inner.ts': "export { default as i } from '../node_modules/zz-lib/index.js';\n",
      // a link of the name to another vendored library's folder: not the named library's bytes, the same
      'vendor/zz-other@1.0.0/package.json': '{ "name": "zz-other", "version": "1.0.0" }\n',
      'vendor/zz-other@1.0.0/index.js': 'export default 2;\n',
      'packages/tables/src/zz-other.ts': "export { default as o } from '../node_modules/zz-lib/index.js';\n",
    });
    mkdirSync(join(root, 'packages/kernel/node_modules'), { recursive: true });
    symlinkSync('../../../vendor/zz-lib@1.0.0', join(root, 'packages/kernel/node_modules/zz-lib'));
    mkdirSync(join(root, 'packages/site/node_modules'), { recursive: true });
    symlinkSync('../../../vendor/zz-lib@1.0.0/node_modules/zz-lib', join(root, 'packages/site/node_modules/zz-lib'));
    mkdirSync(join(root, 'packages/tables/node_modules'), { recursive: true });
    symlinkSync('../../../vendor/zz-other@1.0.0', join(root, 'packages/tables/node_modules/zz-lib'));

    const closure = digestClosure(root);
    expect(closure).toMatchObject({
      files: [
        'packages/kernel/src/adapters/zz-lib.ts',
        'packages/layout/node_modules/zz-lib/index.js', 'packages/layout/src/zz-copy.ts',
        'packages/site/node_modules/zz-lib/index.js', 'packages/site/src/zz-inner.ts',
        'packages/tables/node_modules/zz-lib/index.js', 'packages/tables/src/zz-other.ts',
      ],
      vendored: ['zz-lib'],
      data: [],
      unjudged: [],
    });
    // The library's folder is judged by its real path: the same closure through a root reached by a link.
    const alias = join(realpathSync(tmpdir()), `plat-coverage-alias-${process.pid}-${Date.now()}`);
    symlinkSync(root, alias);
    temps.push(alias);
    expect(digestClosure(alias)).toEqual(closure);

    // The adapter passes the tree lint and both checks; the copy and the two other links fail closed in both.
    const [adapter] = await new ESLint({ cwd: root }).lintFiles(['packages/kernel/src/adapters/zz-lib.ts']);
    expect(adapter.messages).toEqual([]);
    const unread = ['packages/layout/node_modules/zz-lib/index.js', 'packages/site/node_modules/zz-lib/index.js', 'packages/tables/node_modules/zz-lib/index.js'];
    const r = await check.run(root);
    expect(r.problems.map(brief)).toEqual(unread.map((f) => `${f} ignored`));
    const d = checkInlineDirectives(root);
    expect(d.problems.map((p) => p.replace(/ \(No matching configuration found.*$/, ''))).toEqual(unread.map((f) => `${f}:0: cannot be read`));
  }, LINT);

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
