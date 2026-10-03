// The whole-tree check inline-directives (C-0128; the checker's note N3, which F2's fix opens): model code — the five
// model packages' sources and the digest closure beyond them — carries no ESLint directive but C-0125 (6)'s vetted
// division with its reason, so no `/* eslint-disable */` switches the determinism rules off; every other plat/ file
// keeps ESLint's directives. Fixture trees are built in the OS temporary folder; nothing is written into plat/.
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { ALLOWED_DIRECTIVE, checkInlineDirectives } from './directives.mjs';
import { PLAT_ROOT } from './rules/shared.mjs';

/** Every test that parses a tree carries an explicit timeout: wall time grows with the load of the shared machine. */
const LINT = 60_000;
const temps = [];
afterAll(() => {
  for (const t of temps) rmSync(t, { recursive: true, force: true });
});

function tree(files) {
  const root = mkdtempSync(join(tmpdir(), 'plat-directives-'));
  temps.push(root);
  for (const [rel, text] of Object.entries(files)) {
    mkdirSync(join(root, rel, '..'), { recursive: true });
    writeFileSync(join(root, rel), text);
  }
  return root;
}

const VETTED = [
  'export function vetted(x: number, y: number): number {',
  "  // eslint-disable-next-line plat/ratio-division -- an fdlibm routine's division, vetted",
  '  return x / y;',
  '}',
  '',
].join('\n');

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
      'packages/kernel/src/vetted.ts': VETTED,
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
  }, LINT);

  it('passes a model tree whose only directives are vetted divisions', () => {
    const r = checkInlineDirectives(tree({ 'packages/kernel/src/vetted.ts': VETTED }));
    expect(r).toMatchObject({ ok: true, problems: [], counts: { files: 1, directives: 1 } });
  }, LINT);

  it('passes the real plat/ tree', () => {
    const r = checkInlineDirectives(PLAT_ROOT);
    expect(r.problems).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.counts.files).toBeGreaterThan(20);
  }, LINT);
});
