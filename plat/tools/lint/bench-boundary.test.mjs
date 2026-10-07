// bench-boundary (J224; tools/lint/bench-boundary.mjs): the check passes on the tree, and fails — naming the folder or
// file:line — on every planted fault, each in a fixture tree built in the OS temporary folder (nothing is written into
// plat/): an unclassified folder, a folder listed twice, a listed folder that is absent, and a KERNEL folder that
// reaches a town package by name, by a relative path into packages/<town>/, or through a bench-internal relative import.
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import { TOWN, check, checkBenchBoundary } from './bench-boundary.mjs';

const PLAT = fileURLToPath(new URL('../../', import.meta.url));
const temps = [];
afterAll(() => {
  for (const t of temps) rmSync(t, { recursive: true, force: true });
});

/** A fixture root holding `files` ({ plat/-relative path: text }) and bench/manifest.json = `manifest`. */
function tree(files, manifest) {
  const root = mkdtempSync(join(tmpdir(), 'plat-bench-boundary-'));
  temps.push(root);
  const all = { ...files, 'bench/manifest.json': JSON.stringify(manifest) };
  for (const [rel, text] of Object.entries(all)) {
    const abs = join(root, ...rel.split('/'));
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, text);
  }
  mkdirSync(join(root, 'bench', 'src'), { recursive: true });
  mkdirSync(join(root, 'bench', 'test'), { recursive: true });
  return root;
}

const CLEAN = {
  'bench/src/kk/index.ts': "import { createPlat } from '@plat/kernel';\nimport { fuzz } from '@plat/testkit';\nexport const k = [createPlat, fuzz];\n",
  'bench/test/kk/kk.test.ts': "import { k } from '../../src/kk/index.js';\nexport const t = k;\n",
  'bench/src/tt/index.ts': "import { growTown } from '@plat/layout';\nexport const t = growTown;\n",
  'bench/src/infra/index.ts': "export const run = 1;\n",
};
const MANIFEST = { kernel: ['src/kk', 'test/kk'], town: ['src/tt'], infra: ['src/infra'] };

describe('bench-boundary', () => {
  it('passes on the tree as it stands (every bench folder classified, no kernel bench reaching a town package)', () => {
    const r = check.run(PLAT);
    expect(r.problems).toEqual([]);
    expect(r.ok).toBe(true);
  });

  it('passes a clean fixture: a KERNEL bench may import the kernel and the test kit, a TOWN bench anything', () => {
    expect(TOWN).toEqual(['layout', 'site', 'model', 'tables']);
    expect(checkBenchBoundary(tree(CLEAN, MANIFEST))).toEqual({ ok: true, problems: [] });
  });

  it('fails an unclassified folder, a folder listed twice and a listed folder that is absent', () => {
    const r = checkBenchBoundary(tree({ ...CLEAN, 'bench/src/zz-new/index.ts': 'export {};\n' }, {
      ...MANIFEST,
      town: ['src/tt', 'src/kk', 'src/gone'],
    }));
    expect(r.ok).toBe(false);
    expect(r.problems).toEqual([
      'bench/manifest.json: src/kk is listed as kernel and town',
      'bench/manifest.json: src/gone is listed but absent',
      'bench/src/zz-new: not classified in bench/manifest.json (kernel | town | infra)',
    ]);
  });

  it('fails a KERNEL bench that imports a town package by name, naming file:line', () => {
    const r = checkBenchBoundary(tree({
      ...CLEAN,
      'bench/src/kk/leak.ts': "import { a } from '@plat/kernel';\nimport { growTown } from '@plat/layout';\nexport const x = [a, growTown];\n",
    }, MANIFEST));
    expect(r.problems).toEqual(['bench/src/kk/leak.ts:2: a KERNEL bench (bench/src/kk) reaches @plat/layout']);
  });

  it('fails a relative import into packages/<town>/ and a reach through a bench-internal relative import', () => {
    const r = checkBenchBoundary(tree({
      ...CLEAN,
      'bench/src/kk/rel.ts': "export { s } from '../../../packages/site/src/index.js';\n",
      'bench/test/kk/via.test.ts': "import { m } from '../../src/shared/model.js';\nexport const v = m;\n",
      'bench/src/shared/model.ts': "\nimport { tables } from '@plat/tables';\nexport const m = tables;\n",
    }, { ...MANIFEST, infra: ['src/infra', 'src/shared'] }));
    expect(r.problems).toEqual([
      'bench/src/kk/rel.ts:1: a KERNEL bench (bench/src/kk) reaches @plat/site',
      'bench/src/shared/model.ts:2: a KERNEL bench (bench/test/kk) reaches @plat/tables',
    ]);
  });

  it('leaves a TOWN or INFRA folder free to import a town package', () => {
    const r = checkBenchBoundary(tree({ ...CLEAN, 'bench/src/infra/x.ts': "import { m } from '@plat/model';\nexport const x = m;\n" }, MANIFEST));
    expect(r.ok).toBe(true);
  });
});
