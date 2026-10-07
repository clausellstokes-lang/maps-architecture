// kernel-boundary (J224; tools/lint/kernel-boundary.mjs): the check passes on the tree, and proves itself red — a planted file (scanned in memory
// at packages/kernel/src/zz-probe/leak.ts, never written into a package folder) is reported at exactly its planted
// lines; one more use of an allowed noun in an allowed file fails; a loosened dependency table fails; a stale allowlist
// row fails as slack.
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { MAY_IMPORT } from './rules/dependency-direction.mjs';
import { KERNEL_SRC, checkKernelBoundary, importProblems, loadAllow, scanText, vocabularyProblems } from './kernel-boundary.mjs';

const PLAT = process.env.PLAT_ROOT_UNDER_TEST ?? fileURLToPath(new URL('../../', import.meta.url));
const FIX = fileURLToPath(new URL('./fixtures/kernel-boundary/', import.meta.url));
const ALLOW = process.env.KB_ALLOW ? JSON.parse(readFileSync(process.env.KB_ALLOW, 'utf8')) : loadAllow(PLAT);
const read = (n) => readFileSync(join(FIX, n), 'utf8');
const planted = (text) => text.split('\n').flatMap((l, i) => (/\/\/ planted: /.test(l) ? [i + 1] : []));
const PROBE = `${KERNEL_SRC}/zz-probe/leak.ts`;
const linesOf = (problems, rel) => problems
  .filter((p) => p.startsWith(`${rel}:`))
  .flatMap((p) => p.slice(rel.length + 1).split(':')[0].split(', ').map(Number))
  .sort((a, b) => a - b);

describe('kernel-boundary', () => {
  it('passes on the tree as it stands', () => {
    const r = checkKernelBoundary(PLAT, { allow: ALLOW });
    expect(r.problems).toEqual([]);
    expect(r.ok).toBe(true);
  });

  it('reports a planted file at exactly its planted lines (probe-red)', () => {
    const text = read('fail-town-leak.ts');
    const r = checkKernelBoundary(PLAT, { allow: ALLOW, extra: [{ rel: PROBE, text }] });
    expect(r.ok).toBe(false);
    expect(linesOf(r.problems, PROBE)).toEqual(planted(text));
    expect(r.problems.filter((p) => !p.startsWith(`${PROBE}:`))).toEqual([]);
  });

  it('leaves a geometry-only file and every comment alone', () => {
    expect(scanText(PROBE, read('pass-geometry.ts'))).toEqual([]);
  });

  it('fails one more use of an allowed noun in an allowed file', () => {
    const rel = `${KERNEL_SRC}/arr/kerb.ts`;
    const text = `${readFileSync(join(PLAT, rel), 'utf8')}\nexport const kerbExtra = 0;\n`;
    const r = vocabularyProblems(PLAT, ALLOW, [{ rel, text }]);
    expect(r.problems.length).toBe(1);
    expect(r.problems[0]).toMatch(/arr\/kerb\.ts:.*"kerb" in an identifier \(\d+ uses, the allowlist caps \d+/);
  });

  it('fails when the dependency table lets the kernel import a town package', () => {
    expect(importProblems(PLAT)).toEqual([]);
    expect(importProblems(PLAT, { ...MAY_IMPORT, kernel: ['kernel', 'model'] })[0]).toMatch(/MAY_IMPORT\.kernel/);
  });

  it("fails when the kernel's manifest depends on another @plat package", () => {
    const root = mkdtempSync(join(tmpdir(), 'plat-kernel-boundary-'));
    try {
      mkdirSync(join(root, 'packages', 'kernel'), { recursive: true });
      const m = JSON.parse(readFileSync(join(PLAT, 'packages', 'kernel', 'package.json'), 'utf8'));
      writeFileSync(join(root, 'packages', 'kernel', 'package.json'), JSON.stringify(m));
      expect(importProblems(root)).toEqual([]);
      writeFileSync(join(root, 'packages', 'kernel', 'package.json'), JSON.stringify({ ...m, devDependencies: { '@plat/model': 'workspace:*' } }));
      expect(importProblems(root)).toEqual(['packages/kernel/package.json: devDependencies names @plat/model (the kernel depends on no @plat package)']);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it('documents in the allowlist that it may only shrink and that a new town noun needs an owner-visible reason', () => {
    expect(ALLOW.$comment).toMatch(/MAY ONLY SHRINK/);
    expect(ALLOW.$comment).toMatch(/owner-visible reason/);
    for (const r of ALLOW.rows) {
      expect(['a-geometry', 'a-homonym', 'b-debt']).toContain(r.class);
      expect(typeof r.reason === 'string' && r.reason.length > 0, `${r.file} ${r.noun}`).toBe(true);
      if (r.class === 'b-debt') expect(typeof r.clean === 'string' && r.clean.length > 0, `${r.file} ${r.noun} clean`).toBe(true);
      expect(Number.isInteger(r.max) && r.max > 0).toBe(true);
    }
  });

  it('fails a stale allowlist row (the ratchet only shrinks)', () => {
    const loose = { rows: ALLOW.rows.map((r, i) => (i === 0 ? { ...r, max: r.max + 1 } : r)) };
    const r = vocabularyProblems(PLAT, loose);
    expect(r.problems).toEqual([]);
    expect(r.slack).toHaveLength(1);
  });
});
