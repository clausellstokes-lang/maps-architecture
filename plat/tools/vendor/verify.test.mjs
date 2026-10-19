// M0-s-01's vendor tests: the committed vendor tree verifies, and a tampered byte, an unapplied patch, an extra file or
// an unlocked folder each fail naming the file (C-0010, C-0011, C-0152).
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { PLAT_ROOT, VENDOR_DIR, listFiles, readJson } from './common.mjs';
import { verifyVendor } from './verify.mjs';

let copy;
beforeEach(() => {
  copy = mkdtempSync(join(tmpdir(), 'plat-vendor-test-'));
  cpSync(VENDOR_DIR, copy, { recursive: true });
});
afterEach(() => rmSync(copy, { recursive: true, force: true }));

describe('vendor:verify', () => {
  it('passes on the committed vendor tree', () => {
    const r = verifyVendor(VENDOR_DIR);
    expect(r.problems).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.checked).toBeGreaterThan(40);
  });

  it('locks exactly the five vendored libraries, with the three patches recorded (C-0011 twice, C-0152)', () => {
    const lock = readJson(join(VENDOR_DIR, 'vendor.lock.json'));
    expect(Object.keys(lock.libraries).sort()).toEqual([
      'delaunator@5.1.0', 'flatbush@4.6.2', 'flatqueue@3.1.0', 'robust-predicates@3.0.3', 'simplex-noise@4.0.3',
    ]);
    const patched = Object.entries(lock.libraries).filter(([, e]) => e.patch !== null).map(([k]) => k).sort();
    expect(patched).toEqual(['delaunator@5.1.0', 'flatbush@4.6.2', 'simplex-noise@4.0.3']);
    expect(Object.keys(lock.libraries['flatbush@4.6.2'].original).sort()).toEqual(['flatbush.js', 'index.js', 'package.json']);
    for (const e of Object.values(lock.libraries)) expect(e.integrity).toMatch(/^sha512-/);
  });

  it('fails naming the file when one byte is tampered', () => {
    const f = join(copy, 'flatbush@4.6.2', 'index.js');
    const bytes = readFileSync(f);
    bytes[100] ^= 1;
    writeFileSync(f, bytes);
    const r = verifyVendor(copy);
    expect(r.ok).toBe(false);
    expect(r.problems.join('\n')).toContain('flatbush@4.6.2/index.js: sha256');
  });

  it('fails when a patch is reverted', () => {
    const f = join(copy, 'delaunator@5.1.0', 'index.js');
    writeFileSync(f, readFileSync(f, 'utf8').replace('2.220446049250313e-16', 'Math.pow(2, -52)'));
    const r = verifyVendor(copy).problems.join('\n');
    expect(r).toContain('delaunator@5.1.0/index.js: patch not applied');
    expect(r).toContain('delaunator@5.1.0/index.js: sha256');
  });

  it('fails when the flatbush patch (C-0152) is reverted in either build', () => {
    const spec = readJson(join(VENDOR_DIR, 'patches', 'flatbush@4.6.2.json'));
    for (const e of spec.edits) {
      const f = join(copy, 'flatbush@4.6.2', e.file);
      writeFileSync(f, readFileSync(f, 'utf8').replace(e.replace, e.find));
    }
    const r = verifyVendor(copy).problems.join('\n');
    for (const file of ['index.js', 'flatbush.js']) {
      expect(r).toContain(`flatbush@4.6.2/${file}: patch not applied`);
      expect(r).toContain(`flatbush@4.6.2/${file}: patch replacement`);
      expect(r).toContain(`flatbush@4.6.2/${file}: sha256`);
    }
  });

  it('fails on an extra file and on an unlocked folder', () => {
    writeFileSync(join(copy, 'simplex-noise@4.0.3', 'extra.js'), 'export {};\n');
    mkdirSync(join(copy, 'stray@1.0.0'));
    const r = verifyVendor(copy).problems.join('\n');
    expect(r).toContain('simplex-noise@4.0.3/extra.js: not in the lock');
    expect(r).toContain('stray@1.0.0/: vendored folder has no vendor.lock.json entry');
  });
});

describe('the vendor tools\' helpers', () => {
  // N-19: the walk visits a folder's files before its next sibling (a/x before a.js); the listing is in full-path order.
  it('lists a folder\'s files in full-path code-unit order: a.js before a/x', () => {
    const dir = join(copy, 'zz-order');
    mkdirSync(join(dir, 'a'), { recursive: true });
    writeFileSync(join(dir, 'a', 'x'), 'x\n');
    writeFileSync(join(dir, 'a.js'), 'a\n');
    expect(listFiles(dir)).toEqual(['a.js', 'a/x']);
  });

  // L14 (S-3): the main-script test compares real paths, so `vendor:verify` named through a symbolic link still runs.
  it('runs vendor:verify when the script is named through a symbolic link', () => {
    const link = join(copy, 'verify-link.mjs');
    symlinkSync(join(PLAT_ROOT, 'tools', 'vendor', 'verify.mjs'), link);
    const r = spawnSync(process.execPath, [link], { cwd: PLAT_ROOT, encoding: 'utf8' });
    expect(r.stderr).toBe('');
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/^vendor:verify ok — \d+ files match vendor\.lock\.json\n$/);
  });
});
