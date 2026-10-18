// The whole-tree check inline-directives (C-0128 (5)): model code — the five model packages' sources and the digest
// closure beyond them — carries no ESLint directive but C-0125 (6)'s vetted division with its reason, so no
// `/* eslint-disable */` switches the determinism rules off; every other plat/ file keeps ESLint's directives. Fixture
// trees are built in the OS temporary folder; nothing is written into plat/. Every test that parses a tree carries an
// explicit timeout.
import { Linter } from 'eslint';
import { afterAll, describe, expect, it } from 'vitest';
import { ALLOWED_DIRECTIVE, checkInlineDirectives, directivesOf } from './directives.mjs';
import { PLAT_ROOT } from './rules/shared.mjs';
import { LINT_TIMEOUT, VETTED_DIVISION, removeTempTrees, tempTree } from './test-support.mjs';

afterAll(removeTempTrees);

const tree = (files) => tempTree('plat-directives-', files);

describe('ALLOWED_DIRECTIVE', () => {
  it('admits only a vetted division naming plat/ratio-division alone, with its reason', () => {
    for (const ok of [
      'eslint-disable-next-line plat/ratio-division -- vetted',
      'eslint-disable-line plat/ratio-division -- fdlibm e_rem_pio2.c, exact',
      'eslint-disable-next-line plat/ratio-division --- a longer separator',
    ]) expect(ALLOWED_DIRECTIVE.test(ok), ok).toBe(true);
    for (const bad of [
      'eslint-disable-next-line plat/ratio-division',
      'eslint-disable-next-line plat/ratio-division --',
      'eslint-disable-next-line plat/ratio-division--glued',
      'eslint-disable-next-line plat/ratio-division, plat/math-allowlist -- two rules',
      'eslint-disable-next-line -- every rule',
      'eslint-disable plat/ratio-division -- a whole file',
      'eslint-disable-next-line plat/math-allowlist -- another rule',
    ]) expect(ALLOWED_DIRECTIVE.test(bad), bad).toBe(false);
  });
});

describe('the whole-tree check inline-directives', () => {
  it('refuses every other directive in model code, every code extension and the closure, and leaves the rest of plat/ alone', () => {
    const root = tree({
      'packages/kernel/src/index.ts': "export * from './vetted.js';\nexport { h } from '../../../shared/helper.js';\n",
      'packages/kernel/src/vetted.ts': VETTED_DIVISION,
      'packages/kernel/src/line.mjs': 'export const r = (x, y) => x / y; // eslint-disable-line plat/ratio-division -- vetted\n',
      'packages/kernel/src/no-reason.ts': '// eslint-disable-next-line plat/ratio-division\nexport const r = (x: number, y: number): number => x / y;\n',
      'packages/model/src/all.ts': '/* eslint-disable */\nexport const a = Math.sin(1);\n',
      'packages/tables/src/config.ts': '/* eslint plat/math-allowlist: off */\nexport const a = 1;\n',
      'packages/site/src/global.mts': '/* global Date */\nexport const a = 1;\n',
      'packages/layout/src/other.tsx': '// eslint-disable-next-line plat/math-allowlist -- not a division\nexport const a = Math.sin(1);\n',
      'packages/layout/src/enable.cjs': '/* eslint-enable */\nmodule.exports = {};\n',
      'shared/helper.ts': '/* eslint-disable plat/no-nondeterminism */\nexport const h = 1;\n',
      'packages/kernel/test/t.test.ts': '/* eslint-disable */\nexport {};\n',
      'tools/x.mjs': '/* eslint-disable */\nexport {};\n',
    });
    const r = checkInlineDirectives(root);
    expect(r.ok).toBe(false);
    expect(r.problems.map((p) => p.replace(/ is not allowed in model code — .*$/, ''))).toEqual([
      'packages/kernel/src/no-reason.ts:1: the inline directive "// eslint-disable-next-line plat/ratio-division"',
      'packages/layout/src/enable.cjs:1: the inline directive "/* eslint-enable */"',
      'packages/layout/src/other.tsx:1: the inline directive "// eslint-disable-next-line plat/math-allowlist -- not a division"',
      'packages/model/src/all.ts:1: the inline directive "/* eslint-disable */"',
      'packages/site/src/global.mts:1: the inline directive "/* global Date */"',
      'packages/tables/src/config.ts:1: the inline directive "/* eslint plat/math-allowlist: off */"',
      'shared/helper.ts:1: the inline directive "/* eslint-disable plat/no-nondeterminism */"',
    ]);
    expect(r.counts).toEqual({ files: 10, directives: 9 });
  }, LINT_TIMEOUT);

  it('passes a model tree whose only directives are vetted divisions', () => {
    const r = checkInlineDirectives(tree({ 'packages/kernel/src/vetted.ts': VETTED_DIVISION }));
    expect(r).toMatchObject({ ok: true, problems: [], counts: { files: 1, directives: 1 } });
  }, LINT_TIMEOUT);

  it('fails closed on a closure file its configuration does not reach (C-0128 (5), C-0129; the checker\'s mutant MC)', () => {
    // A kernel source imports a library by a path into node_modules, which the closure follows and ESLint's
    // configuration never reaches; dependency-direction names the import too (C-0129), and this check refuses
    // the file it cannot read rather than passing it with no directives.
    const root = tree({
      'packages/kernel/src/index.ts': "export { default } from '../node_modules/zz-lib/index.js';\n",
      'packages/kernel/node_modules/zz-lib/index.js': '/* eslint-disable */\nexport default Math.sin(1);\n',
    });
    const r = checkInlineDirectives(root);
    expect(r.ok).toBe(false);
    expect(r.problems).toHaveLength(1);
    expect(r.problems[0]).toMatch(/^packages\/kernel\/node_modules\/zz-lib\/index\.js:0: cannot be read \(No matching configuration found for .*\)$/);
    expect(directivesOf(new Linter({ cwd: root }), root, 'packages/kernel/node_modules/zz-lib/index.js')).toEqual({ fatal: r.problems[0] });
    expect(directivesOf(new Linter({ cwd: root }), root, 'packages/kernel/src/index.ts')).toEqual({ directives: [] });
  }, LINT_TIMEOUT);

  it('fails closed on a closure file that parses only as a classic script: model code is module code (C-0128 (5))', () => {
    // No script-mode retry here, unlike the path check and the vendored scan: such a file cannot be read as model code.
    const root = tree({ 'packages/kernel/src/legacy.js': 'var o = {}; with (o) {}\n' });
    const r = directivesOf(new Linter({ cwd: root }), root, 'packages/kernel/src/legacy.js');
    expect(r.fatal).toMatch(/^packages\/kernel\/src\/legacy\.js:1: cannot be read \(.+\)$/);
    expect(checkInlineDirectives(root)).toEqual({ ok: false, problems: [r.fatal], counts: { files: 1, directives: 0 } });
  }, LINT_TIMEOUT);

  it('reads no JSON data the closure reaches: C-0005\'s registries are data, not model code (the checker\'s B1, C-0131)', () => {
    const root = tree({
      'packages/kernel/src/arena/roles.json': '{ "version": 1, "roles": [{ "id": 0, "name": "zz-wall" }] }\n',
      'packages/kernel/src/arena/zz-read.ts': "import roles from './roles.json';\nexport const zzRoleCount: number = roles.roles.length;\n",
      'packages/tables/data/zz.json': '{ "n": 1 }\n',
      'packages/tables/src/zz-read.mjs': "import t from '../data/zz.json' with { type: 'json' };\nexport const n = t.n;\n",
    });
    expect(checkInlineDirectives(root)).toEqual({ ok: true, problems: [], counts: { files: 2, directives: 0 } });
  }, LINT_TIMEOUT);

  it('passes the real plat/ tree', () => {
    const r = checkInlineDirectives(PLAT_ROOT);
    expect(r.problems).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.counts.files).toBeGreaterThan(20);
  }, LINT_TIMEOUT);
});
