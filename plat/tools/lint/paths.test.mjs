// The repository path rule (§17.1 (3)): a fixture importing ../../research/x.json fails (the rule's fixtures, linted
// as a script of plat/ — rules.test.mjs, one planted line per specifier form, C-0130); a symbolic link out of plat/
// fails, the node_modules links of every kind among them; every build-input form the check names (tsconfig and
// package.json keys, workspace globs) and fixture paths that leave plat/ fail, each by its own case (C-0130); the real
// tree passes. Fixture trees are built in the OS temporary folder (a "plat" folder beside an
// "outside" one), so nothing is written into plat/ and nothing outside the temporary folder is touched. Every test that
// lints a tree carries an explicit timeout.
import { mkdirSync, symlinkSync } from 'node:fs';
import { join } from 'node:path';
import { Linter } from 'eslint';
import { afterAll, describe, expect, it } from 'vitest';
import { checkRepositoryPaths, isDirectiveNote, judgePath, judgeSpecifier, lintFile } from './paths.mjs';
import repositoryPath from './rules/repository-path.mjs';
import { CODE_EXTENSIONS, PLAT_ROOT } from './rules/shared.mjs';
import { LINT_TIMEOUT, VETTED_DIVISION, removeTempTrees, tempTree, writeTree } from './test-support.mjs';

afterAll(removeTempTrees);

/** A fixture tree: <tmp>/plat (the root) and <tmp>/outside, with the files given (path → text) under plat/. */
function tree(files = {}) {
  const base = tempTree('plat-paths-');
  const root = join(base, 'plat');
  const outside = join(base, 'outside');
  mkdirSync(root);
  writeTree(outside, { 'x.mjs': 'export default 1;\n', 'pkg/package.json': '{ "name": "pkg", "version": "1.0.0" }\n' });
  writeTree(root, files);
  return { root, outside };
}

function lint(root, rel, code) {
  const linter = new Linter({ cwd: root });
  return linter.verify(code, [{
    files: ['**/*.mjs'],
    plugins: { plat: { rules: { 'repository-path': repositoryPath } } },
    rules: { 'plat/repository-path': 'error' },
    settings: { plat: { root } },
  }], { filename: join(root, rel) }).map((m) => `${m.line}:${m.messageId}`);
}

describe('judgePath / judgeSpecifier', () => {
  it('refuses a path that leaves plat/ lexically, before touching it', () => {
    const { root } = tree();
    expect(judgePath(root, join(root, '..', 'research', 'x.json'))).toMatchObject({ ok: false, reason: 'outside' });
    expect(judgeSpecifier(root, join(root, 'scripts', 'a.mjs'), '../../research/x.json')).toMatchObject({ ok: false, reason: 'outside' });
  });

  it('follows a path inside plat/ through its links', () => {
    const { root, outside } = tree({ 'src/a.mjs': '' });
    symlinkSync(outside, join(root, 'src', 'out'));
    symlinkSync(join(root, 'src'), join(root, 'here'));
    expect(judgeSpecifier(root, join(root, 'src', 'a.mjs'), './out/x.mjs')).toMatchObject({ ok: false, reason: 'link' });
    expect(judgeSpecifier(root, join(root, 'src', 'a.mjs'), './out/missing/y.mjs')).toMatchObject({ ok: false, reason: 'link' });
    expect(judgeSpecifier(root, join(root, 'src', 'a.mjs'), '../here/a.mjs')).toEqual({ ok: true });
    expect(judgeSpecifier(root, join(root, 'src', 'a.mjs'), './not-yet.js')).toEqual({ ok: true });
  });

  it('finds a bare package in a node_modules folder inside plat/, its link resolved', () => {
    const { root, outside } = tree({ 'src/a.mjs': '', 'node_modules/inside/package.json': '{}' });
    symlinkSync(join(outside, 'pkg'), join(root, 'node_modules', 'pkg'));
    expect(judgeSpecifier(root, join(root, 'src', 'a.mjs'), 'inside/sub.js')).toEqual({ ok: true });
    expect(judgeSpecifier(root, join(root, 'src', 'a.mjs'), 'pkg')).toMatchObject({ ok: false, reason: 'link' });
    expect(judgeSpecifier(root, join(root, 'src', 'a.mjs'), 'nowhere')).toMatchObject({ ok: false, reason: 'unresolved' });
    expect(judgeSpecifier(root, join(root, 'src', 'a.mjs'), 'node:fs')).toEqual({ ok: true });
  });

  it('resolves a package\'s import of its own name (Node\'s self-reference) inside plat/', () => {
    const { root } = tree({ 'packages/k/package.json': '{ "name": "@plat/k" }', 'packages/k/test/a.test.ts': '' });
    expect(judgeSpecifier(root, join(root, 'packages', 'k', 'test', 'a.test.ts'), '@plat/k')).toEqual({ ok: true });
    expect(judgeSpecifier(root, join(root, 'packages', 'k', 'test', 'a.test.ts'), '@plat/other')).toMatchObject({ ok: false, reason: 'unresolved' });
    expect(judgeSpecifier(PLAT_ROOT, join(PLAT_ROOT, 'packages', 'kernel', 'test', 'zz.test.ts'), '@plat/kernel')).toEqual({ ok: true });
  });
});

describe('plat/repository-path on a fixture tree', () => {
  it('fails an import through a symbolic link out of plat/ and passes one inside', () => {
    const { root, outside } = tree({ 'scripts/inside.mjs': 'export default 2;\n' });
    symlinkSync(outside, join(root, 'scripts', 'out'));
    const code = [
      "import a from './out/x.mjs';",
      "import b from './inside.mjs';",
      "const c = new URL('./out/x.mjs', import.meta.url);",
      "const d = new URL('../../outside/x.mjs', import.meta.url);",
      'export { a, b, c, d };',
    ].join('\n');
    expect(lint(root, 'scripts/run.mjs', code)).toEqual(['1:link', '3:link', '4:outside']);
  }, LINT_TIMEOUT);
});

describe('the whole-tree check repository-path', () => {
  it('fails a symbolic link out of plat/, build inputs and fixture paths that leave it, and an ignored source', () => {
    const { root, outside } = tree({
      'tsconfig.json': JSON.stringify({ extends: '../outside/base.json', references: [{ path: 'pkg' }] }),
      'pkg/tsconfig.json': JSON.stringify({ include: ['src/**/*', '../../outside/**/*.ts'] }),
      'pkg/package.json': JSON.stringify({ name: 'p', main: '../../outside/x.mjs', scripts: { run: 'node ../../outside/x.mjs', ok: 'node scripts/a.mjs' } }),
      'pnpm-workspace.yaml': 'packages:\n  - "pkg"\n  - "../outside/*"\n',
      'pkg/test/fixtures/case.json': JSON.stringify({ input: '../../../../research/x.json', fine: '../ok.json' }),
      'vitest.config.ts': "import x from '../outside/x.mjs';\nexport default x;\n",
      'tools/lint/fixtures/red.mjs': "import x from '../../../../research/x.json';\n",
      'README.md': 'not judged\n',
    });
    symlinkSync(outside, join(root, 'out-link'));
    symlinkSync(join(root, 'README.md'), join(root, 'in-link'));
    const r = checkRepositoryPaths(root);
    expect(r.ok).toBe(false);
    expect(r.problems.map((p) => p.replace(/ \(to .*\)$/, '').replace(/ \(to .*\)/, ''))).toEqual([
      'out-link: symbolic link resolves outside plat/',
      'pkg/package.json: main "../../outside/x.mjs" resolves outside plat/',
      'pkg/package.json: scripts.run "../../outside/x.mjs" resolves outside plat/',
      'pkg/test/fixtures/case.json: $.input "../../../../research/x.json" resolves outside plat/',
      'pkg/tsconfig.json: include "../../outside/**/*.ts" resolves outside plat/',
      'pnpm-workspace.yaml: packages "../outside/*" resolves outside plat/',
      'tsconfig.json: extends "../outside/base.json" resolves outside plat/',
      'vitest.config.ts:1: The import "../outside/x.mjs" resolves outside plat/ (§17.1 (3)).',
    ]);
  }, LINT_TIMEOUT);

  it('judges every link and build-input form the check names, each with a case that leaves plat/ (C-0127 (2), C-0130; the checker\'s H2 mutants MX, MY1 – MY3)', () => {
    const { root, outside } = tree({
      'packages/k/package.json': '{ "name": "@plat/k" }\n',
      // tsconfig: every path-valued key (paths relative to baseUrl when it is set)
      'forms/tsconfig.json': JSON.stringify({
        extends: ['./base.json', '../../outside/base.json'],
        references: [{ path: '../../outside/ref' }, { path: '../packages/k' }],
        files: ['../../outside/a.ts', 'src/a.ts'],
        include: ['src/**/*'],
        exclude: ['../../outside/**'],
        compilerOptions: {
          rootDir: '../../outside/root',
          outDir: '../../outside/out',
          outFile: '../../outside/out.js',
          baseUrl: '../../outside/base',
          declarationDir: '../../outside/decl',
          tsBuildInfoFile: '../../outside/x.tsbuildinfo',
          typeRoots: ['../../outside/types', './types'],
          rootDirs: ['../../outside/rootdirs', 'src'],
        },
      }),
      'forms/tsconfig.paths.json': JSON.stringify({ compilerOptions: { paths: { 'zz/*': ['../../outside/*'], 'ok/*': ['src/*'] } } }),
      'forms/tsconfig.base-paths.json': JSON.stringify({ compilerOptions: { baseUrl: 'sub', paths: { y: ['../../../outside/y'], in: ['../../inside'] } } }),
      'forms/tsconfig.pkg.json': JSON.stringify({ extends: '@zz/missing-config' }),
      // package.json: every path-valued field
      'forms/pkg-a/package.json': JSON.stringify({
        name: 'a',
        main: './index.js',
        module: '../../../outside/m.mjs',
        types: '../../../outside/t.d.ts',
        typings: '../../../outside/ty.d.ts',
        browser: '../../../outside/b.js',
        bin: '../../../outside/bin.mjs',
        exports: { '.': { import: '../../../outside/x.mjs', default: './index.js' }, './*': '../../../outside/*.mjs' },
        dependencies: { d: 'file:../../../outside/d', w: 'workspace:*' },
        devDependencies: { e: 'link:../../../outside/e' },
        optionalDependencies: { f: 'file:../../../outside/f' },
        peerDependencies: { g: 'link:../../../outside/g', h: '^1.0.0' },
      }),
      'forms/pkg-b/package.json': JSON.stringify({
        name: 'b',
        bin: { zz: '../../../outside/zz.mjs', ok: './ok.mjs' },
        browser: { './a.js': '../../../outside/a.js', './c.js': false, fs: './shim.js' },
        exports: '../../../outside/only.mjs',
      }),
    });
    // node_modules links of every kind nodeModulesLinks reads: a member's package, a scoped one, .bin, .pnpm's hoisted
    // and per-package links, another member's; one link inside plat/ passes.
    for (const d of ['node_modules/@zz', 'node_modules/.bin', 'node_modules/.pnpm/node_modules', 'node_modules/.pnpm/zz@1.0.0/node_modules', 'packages/k/node_modules']) {
      mkdirSync(join(root, d), { recursive: true });
    }
    symlinkSync(outside, join(root, 'node_modules', 'zz-out'));
    symlinkSync(join(outside, 'pkg'), join(root, 'node_modules', '@zz', 'scoped'));
    symlinkSync(join(outside, 'x.mjs'), join(root, 'node_modules', '.bin', 'zz'));
    symlinkSync(outside, join(root, 'node_modules', '.pnpm', 'node_modules', 'zz-hoisted'));
    symlinkSync(join(outside, 'pkg'), join(root, 'node_modules', '.pnpm', 'zz@1.0.0', 'node_modules', 'zz'));
    symlinkSync(outside, join(root, 'packages', 'k', 'node_modules', 'zz-dep'));
    symlinkSync(join(root, 'packages', 'k'), join(root, 'node_modules', 'zz-in'));
    const r = checkRepositoryPaths(root);
    expect(r.ok).toBe(false);
    expect(r.counts.nodeModulesLinks).toBe(7);
    const out = 'resolves outside plat/';
    expect(r.problems.map((p) => p.replace(/ \(to .*\)$/, '')).sort()).toEqual([
      `node_modules/.bin/zz: symbolic link ${out}`,
      `node_modules/.pnpm/node_modules/zz-hoisted: symbolic link ${out}`,
      `node_modules/.pnpm/zz@1.0.0/node_modules/zz: symbolic link ${out}`,
      `node_modules/@zz/scoped: symbolic link ${out}`,
      `node_modules/zz-out: symbolic link ${out}`,
      `packages/k/node_modules/zz-dep: symbolic link ${out}`,
      `forms/tsconfig.json: extends "../../outside/base.json" ${out}`,
      `forms/tsconfig.json: references "../../outside/ref" ${out}`,
      `forms/tsconfig.json: files "../../outside/a.ts" ${out}`,
      `forms/tsconfig.json: exclude "../../outside/**" ${out}`,
      `forms/tsconfig.json: compilerOptions.rootDir "../../outside/root" ${out}`,
      `forms/tsconfig.json: compilerOptions.outDir "../../outside/out" ${out}`,
      `forms/tsconfig.json: compilerOptions.outFile "../../outside/out.js" ${out}`,
      `forms/tsconfig.json: compilerOptions.baseUrl "../../outside/base" ${out}`,
      `forms/tsconfig.json: compilerOptions.declarationDir "../../outside/decl" ${out}`,
      `forms/tsconfig.json: compilerOptions.tsBuildInfoFile "../../outside/x.tsbuildinfo" ${out}`,
      `forms/tsconfig.json: compilerOptions.typeRoots "../../outside/types" ${out}`,
      `forms/tsconfig.json: compilerOptions.rootDirs "../../outside/rootdirs" ${out}`,
      `forms/tsconfig.paths.json: compilerOptions.paths.zz/* "../../outside/*" ${out}`,
      `forms/tsconfig.base-paths.json: compilerOptions.paths.y "../../../outside/y" ${out}`,
      'forms/tsconfig.pkg.json: extends "@zz/missing-config" is found nowhere inside plat/',
      `forms/pkg-a/package.json: module "../../../outside/m.mjs" ${out}`,
      `forms/pkg-a/package.json: types "../../../outside/t.d.ts" ${out}`,
      `forms/pkg-a/package.json: typings "../../../outside/ty.d.ts" ${out}`,
      `forms/pkg-a/package.json: browser "../../../outside/b.js" ${out}`,
      `forms/pkg-a/package.json: bin "../../../outside/bin.mjs" ${out}`,
      `forms/pkg-a/package.json: exports...import "../../../outside/x.mjs" ${out}`,
      `forms/pkg-a/package.json: exports../* "../../../outside/*.mjs" ${out}`,
      `forms/pkg-a/package.json: dependencies.d "../../../outside/d" ${out}`,
      `forms/pkg-a/package.json: devDependencies.e "../../../outside/e" ${out}`,
      `forms/pkg-a/package.json: optionalDependencies.f "../../../outside/f" ${out}`,
      `forms/pkg-a/package.json: peerDependencies.g "../../../outside/g" ${out}`,
      `forms/pkg-b/package.json: bin.zz "../../../outside/zz.mjs" ${out}`,
      `forms/pkg-b/package.json: browser../a.js "../../../outside/a.js" ${out}`,
      `forms/pkg-b/package.json: exports "../../../outside/only.mjs" ${out}`,
    ].sort());
  }, LINT_TIMEOUT);

  it('judges a source of every code extension, declarations included (C-0128)', () => {
    const files = {};
    for (const ext of CODE_EXTENSIONS) {
      files[`src/a-${ext}.${ext}`] = ext === 'cjs'
        ? "const x = require('../../outside/x.mjs');\nmodule.exports = x;\n"
        : `import x from '../../outside/x.mjs';\nexport default x;\n${ext.endsWith('x') ? 'export const v = <div />;\n' : ''}`;
    }
    files['src/types.d.ts'] = "import type { T } from '../../outside/x.mjs';\nexport type U = T;\n";
    const { root } = tree(files);
    const r = checkRepositoryPaths(root);
    expect(r.problems).toEqual([
      ...CODE_EXTENSIONS.map((ext) => `src/a-${ext}.${ext}:1: The import "../../outside/x.mjs" resolves outside plat/ (§17.1 (3)).`).sort(),
      'src/types.d.ts:1: The import "../../outside/x.mjs" resolves outside plat/ (§17.1 (3)).',
    ]);
  }, LINT_TIMEOUT);

  it('is neither failed nor silenced by a source\'s inline directives (C-0125 (6)\'s vetted division; C-0128)', () => {
    const { root } = tree({
      'packages/kernel/src/vetted.ts': VETTED_DIVISION,
      'packages/kernel/src/silenced.mjs': [
        '/* eslint-disable */',
        '// eslint-disable-next-line plat/repository-path',
        "import x from '../../../../research/x.json';",
        'export default x;',
        '',
      ].join('\n'),
      'scripts/unknown-rule.mjs': '// eslint-disable-next-line some/unknown-rule -- a directive for a rule no config knows\nexport const a = 1;\n',
    });
    const r = checkRepositoryPaths(root);
    expect(r.problems).toEqual(['packages/kernel/src/silenced.mjs:3: The import "../../../../research/x.json" resolves outside plat/ (§17.1 (3)).']);
    expect(r.counts.sources).toBe(3);
  }, LINT_TIMEOUT);

  it('fails closed on a source its configuration does not reach (C-0128 (5), C-0129; the checker\'s mutant MB)', () => {
    // The walk skips node_modules, so no tree reaches this through checkRepositoryPaths; the per-file lint is the
    // guard, and a message without a rule that is not ESLint's directive note is a problem, never dropped.
    const { root } = tree({
      'node_modules/zz-lib/x.mjs': "import y from '../../../outside/x.mjs';\nexport default y;\n",
      'src/noted.mjs': '/* eslint-disable */\nexport default 1;\n',
    });
    const linter = new Linter({ cwd: root });
    const unreached = lintFile(linter, root, 'node_modules/zz-lib/x.mjs');
    expect(unreached).toHaveLength(1);
    expect(unreached[0]).toMatch(/^node_modules\/zz-lib\/x\.mjs:0: No matching configuration found for .*node_modules\/zz-lib\/x\.mjs\.$/);
    expect(lintFile(linter, root, 'src/noted.mjs')).toEqual([]); // the directive note alone is not a path problem
  }, LINT_TIMEOUT);

  it('re-parses a JavaScript source valid only as a classic script, so lintFile reports nothing (C-0128 (5), C-0129 (2))', () => {
    const { root } = tree({ 'scripts/legacy.js': 'var o = {}; with (o) {}\n' });
    expect(lintFile(new Linter({ cwd: root }), root, 'scripts/legacy.js')).toEqual([]);
  }, LINT_TIMEOUT);

  it('tells ESLint\'s note on a directive from every other message without a rule (C-0128 (5))', () => {
    const [note] = new Linter().verify('/* eslint-disable */\nexport default 1;\n', [{ linterOptions: { noInlineConfig: true } }], { filename: 'a.mjs' });
    expect(note).toMatchObject({ ruleId: null, line: 1 });
    expect(isDirectiveNote(note)).toBe(true);
    expect(isDirectiveNote({ ruleId: null, severity: 1, message: 'No matching configuration found for /x/node_modules/a.mjs.', line: 0, column: 0 })).toBe(false);
    expect(isDirectiveNote({ ...note, fatal: true })).toBe(false);
    expect(isDirectiveNote({ ...note, ruleId: 'plat/repository-path' })).toBe(false);
  });

  it('passes the real plat/ tree', () => {
    const r = checkRepositoryPaths(PLAT_ROOT);
    expect(r.problems).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.counts.sources).toBeGreaterThan(50);
    expect(r.counts.nodeModulesLinks).toBeGreaterThan(0);
  }, LINT_TIMEOUT);
});
