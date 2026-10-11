// The plugin's wiring (C-0060, M0.md §4): the tree's ESLint configuration applies the model rule set to the five model
// packages' sources (and to the digest closure beyond them), dependency-direction to packages/ and bench/,
// repository-path to every linted file and no-bare-pnpm's spawn part to scripts/ and tools/ — each over every code
// extension (C-0128); a test-kit file at any depth is test-kit code (C-0127 (1)). The digest closure walk is built now
// and seeded with the model packages (the labels / render seeds are M1's), and its files outside the model packages are
// linted under the model rule set: plat/'s closure has none at M0, so that entry is proved on a fixture closure built
// in the OS temporary folder (C-0129). Configurations are computed for paths, and sources are linted as text at a path
// (`lintText`), never written into the tree. Every test that runs ESLint carries an explicit timeout (LINT_TIMEOUT):
// wall time grows with the load of the shared machine.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';
import tseslint from 'typescript-eslint';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { digestClosure } from './digest-closure.mjs';
import plugin, { closure, recommendedFor } from './index.mjs';
import { plantedLines } from './probe.mjs';
import { MODEL_RULES, MODEL_RULE_NAMES, rules } from './rules/index.mjs';
import { CODE_EXTENSIONS, CODE_FILE, PLAT_ROOT } from './rules/shared.mjs';
import { LINT_TIMEOUT, VETTED_DIVISION, platRuleNames, removeTempTrees, tempTree } from './test-support.mjs';

afterAll(removeTempTrees);

const eslint = new ESLint({ cwd: PLAT_ROOT });
async function platRules(rel) {
  const config = await eslint.calculateConfigForFile(join(PLAT_ROOT, ...rel.split('/')));
  return config === undefined ? null : platRuleNames(config);
}
const MODEL = [...MODEL_RULE_NAMES].sort();

/**
 * The tree's configuration linting source text as if it lay at a plat/-relative path. A path that does not exist is
 * outside every TypeScript project, so the TypeScript family is parsed here without type information (the one
 * difference from the tree lint; ratio-division's typed reading has its own fixtures in rules.test.mjs).
 */
const textLint = new ESLint({
  cwd: PLAT_ROOT,
  overrideConfig: [{ files: ['**/*.{ts,tsx,mts,cts}'], languageOptions: { parserOptions: { projectService: false, project: null } } }],
});
async function lintAt(rel, code) {
  const [r] = await textLint.lintText(code, { filePath: join(PLAT_ROOT, ...rel.split('/')), warnIgnored: true });
  return r.messages.map((m) => `${m.line} ${m.ruleId ?? (m.fatal ? `fatal: ${m.message}` : m.message)}`);
}
const SCOPE = fileURLToPath(new URL('./fixtures/model-scope/', import.meta.url));

describe('the plugin', () => {
  it('registers the nine rules and the nine whole-tree checks', () => {
    expect(Object.keys(plugin.rules).sort()).toEqual(Object.keys(rules).sort());
    expect(Object.keys(rules)).toHaveLength(9);
    expect(plugin.checks.map((c) => c.name)).toEqual(['probe-red', 'vendor-scan', 'repository-path', 'inline-directives', 'model-coverage', 'no-bare-pnpm', 'licences', 'kernel-boundary', 'bench-boundary']);
    for (const c of plugin.checks) expect(typeof c.run).toBe('function');
  });
});

describe('the tree configuration (eslint.config.js with configs.recommended)', () => {
  it('applies the model rule set to every model package source of every code extension, with the path rules (C-0128)', async () => {
    expect(CODE_EXTENSIONS).toEqual(['ts', 'tsx', 'mts', 'cts', 'js', 'jsx', 'mjs', 'cjs']);
    for (const pkg of ['kernel', 'model', 'tables', 'site', 'layout']) {
      for (const ext of CODE_EXTENSIONS) {
        expect(await platRules(`packages/${pkg}/src/zz-any/deep/file.${ext}`), `${pkg} .${ext}`).toEqual([...MODEL, 'dependency-direction', 'repository-path'].sort());
      }
    }
  }, LINT_TIMEOUT);

  it('applies the graph and path rules to every code extension outside the model packages too (C-0128)', async () => {
    const graph = ['dependency-direction', 'repository-path'];
    for (const ext of CODE_EXTENSIONS) {
      expect(await platRules(`packages/testkit/src/zz/x.${ext}`), `testkit .${ext}`).toEqual(graph);
      expect(await platRules(`bench/src/zz/x.${ext}`), `bench .${ext}`).toEqual(graph);
      expect(await platRules(`tools/zz/x.${ext}`), `tools .${ext}`).toEqual(['no-bare-pnpm', 'repository-path']);
      expect(await platRules(`scripts/x.${ext}`), `scripts .${ext}`).toEqual(['no-bare-pnpm', 'repository-path']);
    }
  }, LINT_TIMEOUT);

  it('keeps model rules off tests, the test kit (N-12: at every depth), the bench and the tools', async () => {
    const graph = ['dependency-direction', 'repository-path'];
    expect(await platRules('packages/kernel/test/scaffold/smoke.test.ts')).toEqual(graph);
    expect(await platRules('packages/testkit/src/oracles/index.ts')).toEqual(graph);
    expect(await platRules('packages/testkit/test/kernel/zz-folder/x.test.ts')).toEqual(graph);
    expect(await platRules('packages/testkit/test/layout/zz-folder/x.test.ts')).toEqual(graph);
    expect(await platRules('bench/src/calibrate/index.ts')).toEqual(graph);
    expect(await platRules('tools/landed/landed.mjs')).toEqual(['no-bare-pnpm', 'repository-path']);
    expect(await platRules('scripts/lint.mjs')).toEqual(['no-bare-pnpm', 'repository-path']);
    expect(await platRules('eslint.config.js')).toEqual(['repository-path']);
  }, LINT_TIMEOUT);

  it('ignores the lint fixtures and the vendored libraries in the tree lint (the probe and the scan read them)', async () => {
    expect(await eslint.isPathIgnored(join(PLAT_ROOT, 'tools/lint/fixtures/probe/zz-probe.ts'))).toBe(true);
    expect(await eslint.isPathIgnored(join(PLAT_ROOT, 'vendor/flatbush@4.6.2/index.js'))).toBe(true);
  }, LINT_TIMEOUT);
});

describe('a model-package source of every code extension (C-0128, the checker\'s F3)', () => {
  const names = readdirSync(SCOPE).filter((n) => n.startsWith('fail-')).sort();

  it('has a fail fixture per code extension', () => {
    expect(names.map((n) => n.slice(n.lastIndexOf('.') + 1)).sort()).toEqual([...CODE_EXTENSIONS].sort());
  });

  for (const name of names) {
    it(`${name}: the tree lint reports exactly its planted lines, each by its rule`, async () => {
      const code = readFileSync(join(SCOPE, name), 'utf8');
      const planted = plantedLines(code).flatMap(({ line, what }) => what.split(',').map((r) => `${line} plat/${r.trim()}`));
      expect(planted).toHaveLength(8);
      expect((await lintAt(`packages/kernel/src/zz-scope/${name}`, code)).sort()).toEqual(planted.sort());
    }, LINT_TIMEOUT);
  }
});

describe('C-0125 (6)\'s vetted division in the tree lint (C-0128, the checker\'s F2)', () => {
  it('passes with its directive and reason, and the division is reported without it', async () => {
    expect(await lintAt('packages/kernel/src/zz-vetted/vetted.ts', VETTED_DIVISION)).toEqual([]);
    const bare = VETTED_DIVISION.split('\n').filter((l) => !l.includes('eslint-disable')).join('\n');
    expect(await lintAt('packages/kernel/src/zz-vetted/vetted.ts', bare)).toEqual(['2 plat/ratio-division']);
  }, LINT_TIMEOUT);

  it('fails as an unused directive above a division that needs none', async () => {
    const unused = VETTED_DIVISION.replace('x / y', 'x / 2');
    const messages = await lintAt('packages/kernel/src/zz-vetted/vetted.ts', unused);
    expect(messages).toHaveLength(1);
    expect(messages[0]).toMatch(/^2 .*[Uu]nused eslint-disable directive/);
  }, LINT_TIMEOUT);
});

describe('the digest closure', () => {
  it('is seeded with the model packages and stays inside them at M0', () => {
    expect(closure.seeds.length).toBeGreaterThan(20);
    expect(closure.seeds.every((s) => /^packages\/(kernel|model|tables|site|layout)\/src\//.test(s))).toBe(true);
    expect(closure.outside).toEqual([]);
    expect(closure.external).toEqual([]);
    expect(closure.unresolved).toEqual([]);
    // Its files are code only: JSON data (C-0005's registries, from wave 3) is listed apart and nothing else non-code
    // is reached (C-0131).
    expect(closure.files.every((f) => CODE_FILE.test(f))).toBe(true);
    expect(closure.data.every((f) => f.endsWith('.json'))).toBe(true);
    expect(closure.unjudged).toEqual([]);
  });

  it('finds a module outside the model packages that a model file imports, of every code extension', () => {
    const base = tempTree('plat-closure-', {
      'packages/kernel/src/index.ts': "export * from './num/index.js';\nexport { h } from '../../../shared/helper.js';\n",
      'packages/kernel/src/num/index.ts': "import Flatbush from 'flatbush';\nexport const n = Flatbush;\n",
      'packages/model/src/index.ts': "import * as k from '@plat/kernel';\nimport 'node:fs';\nimport x from 'left-pad';\nexport { k, x };\n",
      'shared/helper.ts': "export { deeper } from './deeper.js';\nexport const h = 1;\n",
      'shared/deeper.ts': 'export const deeper = 2;\n',
      'tools/unrelated.ts': 'export const u = 3;\n',
      'vendor/flatbush@4.6.2/package.json': '{}\n',
      // every code extension seeds the walk and is followed (C-0128): TypeScript's `.js` spelling names a `.tsx`
      'packages/site/src/extra.mts': "export { t } from '../../../shared/view.js';\n",
      'shared/view.tsx': "export { c } from './legacy.cjs';\nexport const t = 4;\n",
      'shared/legacy.cjs': 'module.exports = { c: 5 };\n',
    });
    const c = digestClosure(base);
    expect(c.outside).toEqual(['shared/deeper.ts', 'shared/helper.ts', 'shared/legacy.cjs', 'shared/view.tsx']);
    expect(c.seeds).toContain('packages/site/src/extra.mts');
    expect(c.files).toContain('packages/kernel/src/num/index.ts');
    expect(c.files).not.toContain('tools/unrelated.ts');
    expect(c.vendored).toEqual(['flatbush']);
    expect(c.external).toEqual(['left-pad']);
  }, LINT_TIMEOUT);

  it('builds the tree\'s configuration from plat/\'s own closure (recommendedFor, C-0129)', () => {
    expect(plugin.configs.recommended).toEqual(recommendedFor(closure));
    expect(plugin.configs.recommended.map((c) => c.name)).toEqual([
      'plat/parse-typescript', 'plat/parse-jsx', 'plat/parse-cjs', 'plat/model-packages', 'plat/package-graph', 'plat/repository-path', 'plat/no-bare-pnpm',
    ]); // no plat/digest-closure entry while plat/'s closure stays inside the model packages (M0)
  });

  it('feeds the closure index.mjs computes into the tree\'s configuration (its wiring, C-0129)', async () => {
    // plat/'s closure is empty beyond the model packages at M0, so the wiring is proved with the walk's result replaced:
    // a fresh index.mjs over a closure with a file outside them must carry that file in its plat/digest-closure entry.
    const fake = { ...closure, outside: ['packages/kernel/data-zz/x.mjs'] };
    vi.resetModules();
    vi.doMock('./digest-closure.mjs', async (importOriginal) => ({ ...(await importOriginal()), digestClosure: () => fake }));
    try {
      const fresh = await import('./index.mjs');
      expect(fresh.closure).toBe(fake);
      expect(fresh.default.configs.recommended.filter((c) => c.name === 'plat/digest-closure')).toEqual([
        { name: 'plat/digest-closure', files: fake.outside, rules: MODEL_RULES },
      ]);
    } finally {
      vi.doUnmock('./digest-closure.mjs');
      vi.resetModules();
    }
  }, LINT_TIMEOUT);

  it('lints the closure\'s files outside the model packages under the model rule set (§6.5 (3), C-0125 (1), C-0129)', async () => {
    // A kernel file outside src/ that a kernel source re-exports (C-0129 (1)), and a file outside packages/ that one
    // reaches; a file no model source reaches stays outside the model rule set.
    const base = tempTree('plat-closure-lint-', {
      'packages/kernel/src/index.ts': "export { s } from '../data-zz/x.mjs';\nexport { h } from '../../../shared/helper.js';\n",
      'packages/kernel/data-zz/x.mjs': 'export const s = Math.sin(1);\n',
      'shared/helper.ts': 'export const h = Date.now() + 2 ** 0.5;\n',
      'tools/unrelated.mjs': 'export const u = Math.sin(1);\n',
    }, { real: true });
    const c = digestClosure(base);
    expect(c.outside).toEqual(['packages/kernel/data-zz/x.mjs', 'shared/helper.ts']);
    const entry = recommendedFor(c).find((x) => x.name === 'plat/digest-closure');
    expect(entry).toEqual({ name: 'plat/digest-closure', files: c.outside, rules: MODEL_RULES });

    /** ESLint over the fixture tree with the plugin's configurations for a closure (the tree's parsers, no types). */
    const eslintFor = (digest) => new ESLint({
      cwd: base,
      overrideConfigFile: true,
      overrideConfig: [
        { files: ['**/*.ts'], languageOptions: { parser: tseslint.parser, parserOptions: { sourceType: 'module' } }, plugins: { plat: plugin } },
        { files: ['**/*.mjs'], languageOptions: { ecmaVersion: 2022, sourceType: 'module' }, plugins: { plat: plugin } },
        ...recommendedFor(digest),
        { settings: { plat: { root: base } } },
      ],
    });
    const rulesOf = async (e, rel) => platRuleNames(await e.calculateConfigForFile(join(base, ...rel.split('/'))));
    const reports = async (e) => Object.fromEntries((await e.lintFiles(['packages/kernel/data-zz/x.mjs', 'shared/helper.ts', 'tools/unrelated.mjs']))
      .map((r) => [r.filePath.slice(base.length + 1), r.messages.map((m) => `${m.line} ${m.ruleId ?? m.message}`).sort()]));

    const withClosure = eslintFor(c);
    expect(await rulesOf(withClosure, 'packages/kernel/data-zz/x.mjs')).toEqual([...MODEL, 'dependency-direction', 'repository-path'].sort());
    expect(await rulesOf(withClosure, 'shared/helper.ts')).toEqual([...MODEL, 'repository-path'].sort());
    expect(await rulesOf(withClosure, 'tools/unrelated.mjs')).toEqual(['no-bare-pnpm', 'repository-path']);
    expect(await reports(withClosure)).toEqual({
      'packages/kernel/data-zz/x.mjs': ['1 plat/math-allowlist'],
      'shared/helper.ts': ['1 plat/no-exponent-operator', '1 plat/no-nondeterminism'],
      'tools/unrelated.mjs': [],
    });

    // Without the closure's entry the same files escape every model rule — what this test exists to catch.
    const withoutEntry = eslintFor({ ...c, outside: [] });
    expect(await rulesOf(withoutEntry, 'packages/kernel/data-zz/x.mjs')).toEqual(['dependency-direction', 'repository-path']);
    expect(await reports(withoutEntry)).toEqual({ 'packages/kernel/data-zz/x.mjs': [], 'shared/helper.ts': [], 'tools/unrelated.mjs': [] });
  }, LINT_TIMEOUT);
});
