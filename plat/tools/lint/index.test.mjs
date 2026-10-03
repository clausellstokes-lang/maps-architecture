// The plugin's wiring (C-0060, M0.md §4): the tree's ESLint configuration applies the model rule set to the five model
// packages' sources (and to the digest closure beyond them), dependency-direction to packages/ and bench/,
// repository-path to every linted file and no-bare-pnpm's spawn part to scripts/ and tools/ — each over every code
// extension (C-0128); a test-kit file at any depth is test-kit code (N-12). The digest closure walk is built now and
// seeded with the model packages (the labels / render seeds are M1's). Configurations are computed for paths, and
// sources are linted as text at a path (`lintText`), never written into the tree. Every test that runs ESLint carries
// an explicit timeout (LINT): wall time grows with the load of the shared machine.
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';
import { afterAll, describe, expect, it } from 'vitest';
import { digestClosure } from './digest-closure.mjs';
import plugin, { closure } from './index.mjs';
import { MODEL_RULE_NAMES, rules } from './rules/index.mjs';
import { CODE_EXTENSIONS, PLAT_ROOT } from './rules/shared.mjs';

const LINT = 60_000;
const temps = [];
afterAll(() => {
  for (const t of temps) rmSync(t, { recursive: true, force: true });
});

const eslint = new ESLint({ cwd: PLAT_ROOT });
async function platRules(rel) {
  const config = await eslint.calculateConfigForFile(join(PLAT_ROOT, ...rel.split('/')));
  if (config === undefined) return null;
  return Object.entries(config.rules ?? {})
    .filter(([name, v]) => name.startsWith('plat/') && (Array.isArray(v) ? v[0] : v) === 2)
    .map(([name]) => name.slice('plat/'.length))
    .sort();
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
  it('registers the nine rules and the six whole-tree checks', () => {
    expect(Object.keys(plugin.rules).sort()).toEqual(Object.keys(rules).sort());
    expect(Object.keys(rules)).toHaveLength(9);
    expect(plugin.checks.map((c) => c.name)).toEqual(['probe-red', 'vendor-scan', 'repository-path', 'inline-directives', 'no-bare-pnpm', 'licences']);
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
  }, LINT);

  it('applies the graph and path rules to every code extension outside the model packages too (C-0128)', async () => {
    const graph = ['dependency-direction', 'repository-path'];
    for (const ext of CODE_EXTENSIONS) {
      expect(await platRules(`packages/testkit/src/zz/x.${ext}`), `testkit .${ext}`).toEqual(graph);
      expect(await platRules(`bench/src/zz/x.${ext}`), `bench .${ext}`).toEqual(graph);
      expect(await platRules(`tools/zz/x.${ext}`), `tools .${ext}`).toEqual(['no-bare-pnpm', 'repository-path']);
      expect(await platRules(`scripts/x.${ext}`), `scripts .${ext}`).toEqual(['no-bare-pnpm', 'repository-path']);
    }
  }, LINT);

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
  }, LINT);

  it('ignores the lint fixtures and the vendored libraries in the tree lint (the probe and the scan read them)', async () => {
    expect(await eslint.isPathIgnored(join(PLAT_ROOT, 'tools/lint/fixtures/probe/zz-probe.ts'))).toBe(true);
    expect(await eslint.isPathIgnored(join(PLAT_ROOT, 'vendor/flatbush@4.6.2/index.js'))).toBe(true);
  }, LINT);
});

describe('a model-package source of every code extension (C-0128, the checker\'s F3)', () => {
  const names = readdirSync(SCOPE).filter((n) => n.startsWith('fail-')).sort();

  it('has a fail fixture per code extension', () => {
    expect(names.map((n) => n.slice(n.lastIndexOf('.') + 1)).sort()).toEqual([...CODE_EXTENSIONS].sort());
  });

  for (const name of names) {
    it(`${name}: the tree lint reports exactly its planted lines, each by its rule`, async () => {
      const code = readFileSync(join(SCOPE, name), 'utf8');
      const planted = code.split('\n').flatMap((l, i) => {
        const m = /\/\/ planted: ([a-z, -]+?)\s*$/.exec(l);
        return m ? m[1].split(',').map((r) => `${i + 1} plat/${r.trim()}`) : [];
      });
      expect(planted).toHaveLength(8);
      expect((await lintAt(`packages/kernel/src/zz-scope/${name}`, code)).sort()).toEqual(planted.sort());
    }, LINT);
  }
});

describe('C-0125 (6)\'s vetted division in the tree lint (C-0128, the checker\'s F2)', () => {
  const vetted = [
    'export function vetted(x: number, y: number): number {',
    "  // eslint-disable-next-line plat/ratio-division -- an fdlibm routine's division, vetted",
    '  return x / y;',
    '}',
    '',
  ].join('\n');

  it('passes with its directive and reason, and the division is reported without it', async () => {
    expect(await lintAt('packages/kernel/src/zz-vetted/vetted.ts', vetted)).toEqual([]);
    const bare = vetted.split('\n').filter((l) => !l.includes('eslint-disable')).join('\n');
    expect(await lintAt('packages/kernel/src/zz-vetted/vetted.ts', bare)).toEqual(['2 plat/ratio-division']);
  }, LINT);

  it('fails as an unused directive above a division that needs none', async () => {
    const unused = vetted.replace('x / y', 'x / 2');
    const messages = await lintAt('packages/kernel/src/zz-vetted/vetted.ts', unused);
    expect(messages).toHaveLength(1);
    expect(messages[0]).toMatch(/^2 .*[Uu]nused eslint-disable directive/);
  }, LINT);
});

describe('the digest closure', () => {
  it('is seeded with the model packages and stays inside them at M0', () => {
    expect(closure.seeds.length).toBeGreaterThan(20);
    expect(closure.seeds.every((s) => /^packages\/(kernel|model|tables|site|layout)\/src\//.test(s))).toBe(true);
    expect(closure.outside).toEqual([]);
    expect(closure.external).toEqual([]);
    expect(closure.unresolved).toEqual([]);
  });

  it('finds a module outside the model packages that a model file imports, and is linted there', () => {
    const base = mkdtempSync(join(tmpdir(), 'plat-closure-'));
    temps.push(base);
    const files = {
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
    };
    for (const [rel, text] of Object.entries(files)) {
      mkdirSync(join(base, rel, '..'), { recursive: true });
      writeFileSync(join(base, rel), text);
    }
    const c = digestClosure(base);
    expect(c.outside).toEqual(['shared/deeper.ts', 'shared/helper.ts', 'shared/legacy.cjs', 'shared/view.tsx']);
    expect(c.seeds).toContain('packages/site/src/extra.mts');
    expect(c.files).toContain('packages/kernel/src/num/index.ts');
    expect(c.files).not.toContain('tools/unrelated.ts');
    expect(c.vendored).toEqual(['flatbush']);
    expect(c.external).toEqual(['left-pad']);
  }, LINT);
});
