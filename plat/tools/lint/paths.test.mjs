// The repository path rule (§17.1 (3)): a fixture importing ../../research/x.json fails (the rule's fixtures, linted
// as a script of plat/ — rules.test.mjs); a symbolic link out of plat/ fails; build inputs and fixture paths that
// leave plat/ fail; the real tree passes. Fixture trees are built in the OS temporary folder (a "plat" folder beside an
// "outside" one), so nothing is written into plat/ and nothing outside the temporary folder is touched. Every test that
// lints a tree carries an explicit timeout.
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Linter } from 'eslint';
import { afterAll, describe, expect, it } from 'vitest';
import { checkRepositoryPaths, judgePath, judgeSpecifier } from './paths.mjs';
import repositoryPath from './rules/repository-path.mjs';
import { CODE_EXTENSIONS, PLAT_ROOT } from './rules/shared.mjs';

const temps = [];
afterAll(() => {
  for (const t of temps) rmSync(t, { recursive: true, force: true });
});

/** A fixture tree: <tmp>/plat (the root) and <tmp>/outside, with the files given (path → text) under plat/. */
function tree(files = {}) {
  const base = mkdtempSync(join(tmpdir(), 'plat-paths-'));
  temps.push(base);
  const root = join(base, 'plat');
  const outside = join(base, 'outside');
  mkdirSync(root);
  mkdirSync(join(outside, 'pkg'), { recursive: true });
  writeFileSync(join(outside, 'x.mjs'), 'export default 1;\n');
  writeFileSync(join(outside, 'pkg', 'package.json'), '{ "name": "pkg", "version": "1.0.0" }\n');
  for (const [rel, text] of Object.entries(files)) {
    mkdirSync(join(root, rel, '..'), { recursive: true });
    writeFileSync(join(root, rel), text);
  }
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
  }, 60_000);
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
  }, 60_000);

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
  }, 60_000);

  it('is neither failed nor silenced by a source\'s inline directives (C-0125 (6)\'s vetted division; C-0128)', () => {
    const { root } = tree({
      'packages/kernel/src/vetted.ts': [
        'export function vetted(x: number, y: number): number {',
        "  // eslint-disable-next-line plat/ratio-division -- an fdlibm routine's division, vetted",
        '  return x / y;',
        '}',
        '',
      ].join('\n'),
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
  }, 60_000);

  it('passes the real plat/ tree', () => {
    const r = checkRepositoryPaths(PLAT_ROOT);
    expect(r.problems).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.counts.sources).toBeGreaterThan(50);
    expect(r.counts.nodeModulesLinks).toBeGreaterThan(0);
  }, 60_000);
});
