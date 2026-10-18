// no-bare-pnpm's whole-tree part (C-0093 (a) and (c)), one fixture per case: a script `pnpm test` fails and
// `corepack pnpm test` passes; a fenced `pnpm install` line and an inline `pnpm -v` span fail; prose `pnpm 10.28` and
// `"packageManager": "pnpm@10.34.6"` pass; a docs/build/ record holding `pnpm` is skipped (the spawn case (b) is the
// ESLint rule's, in rules.test.mjs). Trees are assembled from the fixtures in the OS temporary folder.
import { cpSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import { checkNoBarePnpm, outsideScope, runsBarePnpm, scanMarkdown, scanPackageJson } from './rules/no-bare-pnpm.mjs';
import { PLAT_ROOT } from './rules/shared.mjs';
import { LINT_TIMEOUT, removeTempTrees, tempTree } from './test-support.mjs';

const FIX = fileURLToPath(new URL('./fixtures/no-bare-pnpm/', import.meta.url));
const read = (name) => readFileSync(join(FIX, name), 'utf8');
const plantedMd = (text) => text.split('\n').flatMap((l, i) => (l.includes('<!-- planted -->') ? [i + 1] : []));
afterAll(removeTempTrees);

describe('the command reader', () => {
  it('finds pnpm as the first word of any command of a line, after a prompt and assignments', () => {
    expect(runsBarePnpm('pnpm test')).toBe(true);
    expect(runsBarePnpm('corepack pnpm test')).toBe(false);
    expect(runsBarePnpm('CI=1 FOO=bar pnpm install')).toBe(true);
    expect(runsBarePnpm('$ pnpm -v')).toBe(true);
    expect(runsBarePnpm('node x.mjs && pnpm build')).toBe(true);
    expect(runsBarePnpm('node x.mjs || corepack pnpm build; echo pnpm')).toBe(false);
    expect(runsBarePnpm('pnpm-lock.yaml')).toBe(false);
    expect(runsBarePnpm('pnpm@10.34.6')).toBe(false);
  });
});

describe('package.json scripts (C-0093 (a))', () => {
  it('fail on a bare pnpm command, chained or after assignments', () => {
    expect(scanPackageJson(read('fail-script.package.json')).map((p) => p.script)).toEqual(['test', 'chain', 'env']);
  });
  it('pass corepack pnpm and the packageManager pin', () => {
    expect(scanPackageJson(read('pass-script.package.json'))).toEqual([]);
  });
});

describe('Markdown command lines (C-0093 (c))', () => {
  it('fail on fenced lines (``` and ~~~) exactly at the planted lines', () => {
    const text = read('fail-fenced.md');
    expect(scanMarkdown(text).map((p) => p.line)).toEqual(plantedMd(text));
    expect(scanMarkdown(text).every((p) => p.kind === 'fenced')).toBe(true);
  });
  it('fail on inline spans exactly at the planted lines', () => {
    const text = read('fail-inline.md');
    expect(scanMarkdown(text).map((p) => `${p.line} ${p.text}`)).toEqual(['3 pnpm -v', '4 pnpm test']);
    expect(scanMarkdown(text).map((p) => p.line)).toEqual(plantedMd(text));
  });
  it('pass prose, the pin in a fenced JSON block, and corepack pnpm', () => {
    expect(scanMarkdown(read('pass-prose.md'))).toEqual([]);
  });
});

describe('the whole-tree check no-bare-pnpm', () => {
  it('scans package.json files and Markdown outside the records, vendored libraries and the lint fixtures', () => {
    const root = tempTree('plat-pnpm-');
    const put = (fixture, rel) => {
      mkdirSync(join(root, rel, '..'), { recursive: true });
      cpSync(join(FIX, fixture), join(root, rel));
    };
    put('fail-script.package.json', 'package.json');
    put('pass-script.package.json', 'packages/kernel/package.json');
    put('fail-fenced.md', 'README.md');
    put('fail-inline.md', 'vendor/README.md');
    put('pass-prose.md', 'docs/digest/README.md');
    put('record.md', 'docs/build/zz-record.md');
    put('record.md', 'CLEAN-ROOM.md');
    put('record.md', 'vendor/lib@1.0.0/README.md');
    put('fail-script.package.json', 'vendor/lib@1.0.0/package.json');
    put('record.md', 'tools/lint/fixtures/zz.md');
    put('fail-script.package.json', 'node_modules/x/package.json');
    const r = checkNoBarePnpm(root);
    expect(r.ok).toBe(false);
    expect(r.scanned).toBe(5);
    const where = r.problems.map((p) => p.split(' runs a bare pnpm')[0]);
    expect(where).toEqual([
      'README.md:5: a fenced command line',
      'README.md:6: a fenced command line',
      'README.md:7: a fenced command line',
      'README.md:8: a fenced command line',
      'README.md:12: a fenced command line',
      'package.json: scripts.test',
      'package.json: scripts.chain',
      'package.json: scripts.env',
      'vendor/README.md:3: an inline command',
      'vendor/README.md:4: an inline command',
    ]);
  }, LINT_TIMEOUT);

  it('never scans the records or third-party bytes', () => {
    expect(outsideScope('CLEAN-ROOM.md')).toBe(true);
    expect(outsideScope('docs/build/M0.md')).toBe(true);
    expect(outsideScope('docs/build/checks/x.md')).toBe(true);
    expect(outsideScope('vendor/flatbush@4.6.2/README.md')).toBe(true);
    expect(outsideScope('vendor/README.md')).toBe(false);
    expect(outsideScope('README.md')).toBe(false);
    expect(outsideScope('packages/testkit/baselines/README.md')).toBe(false);
  }, LINT_TIMEOUT);

  it('passes the real plat/ tree', () => {
    const r = checkNoBarePnpm(PLAT_ROOT);
    expect(r.problems).toEqual([]);
    expect(r.scanned).toBeGreaterThan(5);
  }, LINT_TIMEOUT);
});
