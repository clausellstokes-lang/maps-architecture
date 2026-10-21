// The rule tests of the PLAT determinism lint (M0-d-07): every rule through ESLint's RuleTester over its fixtures in
// tools/lint/fixtures/<rule>/ — each pass fixture lints clean and each fail fixture reports exactly its planted lines
// (the `// planted: <messageId>, …` markers, in column order) and nothing else. The fixtures are read, never written.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Linter, RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';
import { afterAll, describe, expect, it } from 'vitest';
import { plantedLines } from './probe.mjs';
import { rules } from './rules/index.mjs';
import { PLAT_ROOT } from './rules/shared.mjs';
import { LINT_TIMEOUT } from './test-support.mjs';

// Every rule case carries an explicit timeout: a case's wall time grows with the load of the shared machine (the typed
// cases build a TypeScript program; C-0128 (6)).
RuleTester.describe = describe;
RuleTester.it = (title, fn) => it(title, fn, LINT_TIMEOUT);
RuleTester.itOnly = (title, fn) => it.only(title, fn, LINT_TIMEOUT);
RuleTester.afterAll = afterAll;

const FIXTURES = fileURLToPath(new URL('./fixtures/', import.meta.url));
const CODE = /\.(ts|mjs|js)$/;

/** A fixture's test case: its code, the path it is linted as, its options and its planted errors. */
function fixtureCase(rule, name, dir = join(FIXTURES, rule)) {
  const code = readFileSync(join(dir, name), 'utf8');
  const lines = code.split('\n');
  const lintAs = /^\/\/ lint-as: (\S+)/.exec(lines[0] ?? '');
  const opts = lines.slice(0, 3).map((l) => /^\/\/ options: (.+)$/.exec(l)).find(Boolean);
  const errors = plantedLines(code).flatMap(({ line, what }) => what.split(',').map((s) => ({ line, messageId: s.trim() })));
  const rel = lintAs ? lintAs[1] : `packages/kernel/src/zz-fixture/${name}`;
  return {
    name: `${rule}/${name}`,
    code,
    filename: join(PLAT_ROOT, ...rel.split('/')),
    ...(opts ? { options: [JSON.parse(opts[1])] } : {}),
    errors,
  };
}

/** The fixtures of one rule folder (code files only, no sub-folders), split into valid and invalid cases. */
function fixtureCases(rule) {
  const dir = join(FIXTURES, rule);
  const names = readdirSync(dir).filter((n) => CODE.test(n) && statSync(join(dir, n)).isFile()).sort();
  const pass = names.filter((n) => n.startsWith('pass-')).map((n) => fixtureCase(rule, n));
  const fail = names.filter((n) => n.startsWith('fail-')).map((n) => fixtureCase(rule, n));
  return { pass, fail };
}

const testers = {
  ts: new RuleTester({ languageOptions: { parser: tseslint.parser, parserOptions: { sourceType: 'module' } } }),
  js: new RuleTester({ languageOptions: { ecmaVersion: 'latest', sourceType: 'module' } }),
};

const RULES = Object.keys(rules).sort();

describe('the lint fixtures', () => {
  it('give every rule pass fixtures and fail fixtures with planted lines', () => {
    for (const rule of RULES) {
      const { pass, fail } = fixtureCases(rule);
      expect(pass.length, `${rule} pass fixtures`).toBeGreaterThan(0);
      expect(fail.length, `${rule} fail fixtures`).toBeGreaterThan(0);
      for (const f of fail) expect(f.errors.length, `${f.name} planted lines`).toBeGreaterThan(0);
      for (const p of pass) expect(p.errors, `${p.name} has no planted line`).toEqual([]);
    }
  });

  it('name each planted messageId among its rule\'s messages', () => {
    for (const rule of RULES) {
      const ids = new Set(Object.keys(rules[rule].meta.messages));
      for (const f of fixtureCases(rule).fail) for (const e of f.errors) expect(ids.has(e.messageId), `${f.name}:${e.line} ${e.messageId}`).toBe(true);
    }
  });
});

for (const rule of RULES) {
  const { pass, fail } = fixtureCases(rule);
  const strip = ({ errors: _planted, ...rest }) => rest;
  for (const kind of ['ts', 'js']) {
    const valid = pass.filter((c) => (kind === 'ts') === c.filename.endsWith('.ts')).map(strip);
    const invalid = fail.filter((c) => (kind === 'ts') === c.filename.endsWith('.ts'));
    if (valid.length + invalid.length === 0) continue;
    testers[kind].run(`plat/${rule} (${kind} fixtures)`, rules[rule], { valid, invalid });
  }
}

// ratio-division with type information: an imported const of a non-zero literal type is a literal divisor.
const typedDir = join(FIXTURES, 'ratio-division', 'typed');
const typed = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: { projectService: false, project: ['./tsconfig.json'], tsconfigRootDir: typedDir },
  },
});
const typedCase = (name) => ({ ...fixtureCase('ratio-division', name, typedDir), filename: join(typedDir, name) });
const { errors: _none, ...typedPass } = typedCase('pass-typed.ts');
typed.run('plat/ratio-division (typed fixtures)', rules['ratio-division'], {
  valid: [typedPass],
  invalid: [typedCase('fail-typed.ts')],
});

// Hardening round S1 (note N12): a rule judges the file on disk — lintedFile reads a processor's `physicalFilename`
// before the virtual block name ESLint gives a code block (`<file>/<i>_<name>`, one folder deeper). A processor pulls
// one JavaScript block out of a Markdown file at packages/kernel/src/zz-fixture/notes.md; its relative imports resolve
// from the Markdown file's folder. (ratio-division's kernel exemption reads the path too, but a block's virtual name
// always lies under its file's, so no processor separates the two there.)
describe('a processor\'s code block (lintedFile reads physicalFilename)', () => {
  const blocks = {
    preprocess: (text) => [{ text: text.split('```js\n')[1].split('```')[0], filename: 'block.js' }],
    postprocess: (lists) => lists.flat(),
  };
  const lintBlock = (rel, js, rule) => new Linter({ cwd: PLAT_ROOT }).verify(`# notes\n\n\`\`\`js\n${js}\`\`\`\n`, [
    { files: ['**/*.md'], processor: blocks },
    {
      files: ['**/*.md/*.js'],
      languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      plugins: { plat: { rules } },
      rules: { [`plat/${rule}`]: 'error' },
    },
  ], { filename: join(PLAT_ROOT, ...rel.split('/')) }).map((m) => `${m.line} ${m.ruleId ?? m.message} ${m.messageId ?? ''}`.trim());

  it('judges a block\'s relative import from the file on disk: the kernel importing the model by path fails', () => {
    const js = "import * as model from '../../../model/src/index.js';\nexport { model };\n";
    expect(lintBlock('packages/kernel/src/zz-fixture/notes.md', js, 'dependency-direction')).toEqual(['1 plat/dependency-direction direction']);
    // from the virtual block's folder (notes.md/) the same path would stay inside the kernel and pass
    expect(lintBlock('packages/kernel/src/zz-fixture/deeper/notes.md', js, 'dependency-direction')).toEqual([]);
  }, LINT_TIMEOUT);

  it('judges a block\'s path against plat/ from the file on disk: a path one folder above plat/ fails', () => {
    const js = "import x from '../zz-outside.mjs';\nexport { x };\n";
    expect(lintBlock('notes.md', js, 'repository-path')).toEqual(['1 plat/repository-path outside']);
  }, LINT_TIMEOUT);
});
