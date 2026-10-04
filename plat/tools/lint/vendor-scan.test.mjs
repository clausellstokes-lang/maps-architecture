// The vendored scan (§6.5 (4); C-0007, C-0010, C-0011, C-0126, C-0152): the unpatched fixture copies of delaunator,
// simplex-noise and flatbush fail (Math.pow; Math.random; the exponent operator), the vendored patched sources pass with
// no reviewed exception open, d3-delaunay's tarball (a fixture copy, never vendored) fails on Math.pow / sin / cos /
// hypot — C-0007's reason reproduced — and the audit record in @plat/kernel equals the scan. Fixtures are read in place;
// the mutated copies live in the OS temporary folder.
// Every test that scans whole libraries carries an explicit timeout (SCAN): a scan's wall time grows with the load of
// the shared machine (up to four build seats and M-1's lane), and vitest's 5 s default is no bar of this item. The scan
// of the real vendor/ tree is taken once (beforeAll) and read by the tests of the audit record.
import { createHash } from 'node:crypto';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AUDIT_FILE, REVIEWED, checkVendorScan, codeFilesOf, outsideAllowlist, scanLibrary } from './vendor-scan.mjs';
import { PLAT_ROOT } from './rules/shared.mjs';

const FIX = fileURLToPath(new URL('./fixtures/vendor-scan/', import.meta.url));
const VENDOR = join(PLAT_ROOT, 'vendor');
const lock = JSON.parse(readFileSync(join(VENDOR, 'vendor.lock.json'), 'utf8')).libraries;
const manifest = JSON.parse(readFileSync(join(FIX, 'MANIFEST.json'), 'utf8')).folders;
const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
/** The timeout of a test that scans libraries — informative headroom on a contended machine, never a timing. */
const SCAN = 120_000;
const temps = [];
afterAll(() => {
  for (const t of temps) rmSync(t, { recursive: true, force: true });
});

describe('the fixture copies', () => {
  it('are the registry bytes the manifest lists, and nothing else', () => {
    for (const [folder, entry] of Object.entries(manifest)) {
      for (const [file, { sha256: hash }] of Object.entries(entry.files)) expect(sha256(join(FIX, folder, file)), `${folder}/${file}`).toBe(hash);
      const code = codeFilesOf(join(FIX, folder));
      expect(code.every((f) => Object.hasOwn(entry.files, f)), `${folder} holds only listed code files`).toBe(true);
    }
  });

  it('of delaunator, simplex-noise and flatbush are the pre-patch bytes vendor.lock.json records', () => {
    for (const [folder, key] of [
      ['delaunator@5.1.0-unpatched', 'delaunator@5.1.0'],
      ['simplex-noise@4.0.3-unpatched', 'simplex-noise@4.0.3'],
      ['flatbush@4.6.2-unpatched', 'flatbush@4.6.2'],
    ]) {
      expect(manifest[folder].integrity).toBe(lock[key].integrity);
      for (const file of codeFilesOf(join(FIX, folder))) {
        const { from } = manifest[folder].files[file];
        expect(sha256(join(FIX, folder, file)), `${folder}/${file} (${from} in the tarball)`).toBe(lock[key].original[from]);
      }
    }
  });
});

describe('scanLibrary', () => {
  it('fails unpatched delaunator on Math.pow (its EPSILON) in each of its three code files', () => {
    const r = scanLibrary(join(FIX, 'delaunator@5.1.0-unpatched'), 'delaunator@5.1.0');
    expect(r.result).toBe('fail');
    expect(outsideAllowlist(r.math)).toEqual(['pow']);
    expect(r.findings.map((f) => `${f.file} ${f.rule}`)).toEqual([
      'delaunator.js plat/math-allowlist',
      'delaunator.min.js plat/math-allowlist',
      'index.js plat/math-allowlist',
    ]);
  }, SCAN);

  it('fails unpatched simplex-noise on its Math.random defaults', () => {
    const r = scanLibrary(join(FIX, 'simplex-noise@4.0.3-unpatched'), 'simplex-noise@4.0.3');
    expect(r.result).toBe('fail');
    expect(outsideAllowlist(r.math)).toEqual(['random']);
    expect(r.math.random).toBe(9); // three defaults in each of the ESM build, the CommonJS build and the source
    expect(new Set(r.findings.map((f) => f.rule))).toEqual(new Set(['plat/math-allowlist', 'plat/no-nondeterminism']));
  }, SCAN);

  it('fails unpatched flatbush on `this.nodeSize ** level` in each of its two builds, and on nothing else (C-0126 (5))', () => {
    const r = scanLibrary(join(FIX, 'flatbush@4.6.2-unpatched'), 'flatbush@4.6.2');
    expect(r.result).toBe('fail');
    expect(outsideAllowlist(r.math)).toEqual([]);
    expect(r.reviewed).toEqual([]);
    expect(r.findings.map((f) => `${f.file}:${f.line} ${f.rule}`)).toEqual([
      'flatbush.js:341 plat/no-exponent-operator',
      'index.js:300 plat/no-exponent-operator',
    ]);
    const lines = (f) => readFileSync(join(FIX, 'flatbush@4.6.2-unpatched', f), 'utf8').split('\n');
    expect(lines('index.js')[299]).toContain('this.nodeSize ** level');
    expect(lines('flatbush.js')[340]).toContain('this.nodeSize ** level');
  }, SCAN);

  it('fails d3-delaunay on Math.pow, sin, cos and hypot (C-0007\'s reason; PI is outside the list too)', () => {
    const r = scanLibrary(join(FIX, 'd3-delaunay@6.0.4'), 'd3-delaunay@6.0.4');
    expect(r.result).toBe('fail');
    expect(outsideAllowlist(r.math)).toEqual(['PI', 'cos', 'hypot', 'pow', 'sin']);
    const src = r.files.find((f) => f.path === 'src/delaunay.js');
    expect(outsideAllowlist(src.math)).toEqual(['PI', 'cos', 'hypot', 'pow', 'sin']);
  }, SCAN);

  it('passes the vendored, patched sources', () => {
    const results = Object.fromEntries(
      ['delaunator@5.1.0', 'flatbush@4.6.2', 'flatqueue@3.1.0', 'robust-predicates@3.0.3', 'simplex-noise@4.0.3'].map((k) => [k, scanLibrary(join(VENDOR, k), k)]),
    );
    expect(results['delaunator@5.1.0'].result).toBe('pass');
    expect(results['flatqueue@3.1.0'].result).toBe('pass');
    expect(results['robust-predicates@3.0.3'].result).toBe('pass');
    expect(results['simplex-noise@4.0.3'].result).toBe('pass');
    expect(results['flatbush@4.6.2'].result).toBe('pass'); // patched (C-0152): no open exception
    for (const r of Object.values(results)) {
      expect(r.findings).toEqual([]);
      expect(r.reviewed).toEqual([]);
      expect(outsideAllowlist(r.math)).toEqual([]);
    }
  }, SCAN);

  it('re-opens a reviewed exception when the library\'s bytes change (a version change is a new review)', () => {
    // No reviewed exception is open in the tree (C-0152 closed the last); the mechanism (C-0126 (4)) is held on an
    // entry pinned to the unpatched fixture copy's bytes.
    const dir = mkdtempSync(join(tmpdir(), 'plat-vendor-scan-'));
    temps.push(dir);
    const file = join(dir, 'index.js');
    cpSync(join(FIX, 'flatbush@4.6.2-unpatched', 'index.js'), file);
    const pinned = [{ library: 'flatbush@4.6.2', file: 'index.js', sha256: sha256(file), line: 300, rule: 'plat/no-exponent-operator', choice: 'C-0126', what: 'test entry', status: 'test' }];
    const judged = scanLibrary(dir, 'flatbush@4.6.2', pinned);
    expect(judged.result).toBe('pass (reviewed exceptions)');
    expect(judged.reviewed.map((e) => `${e.file}:${e.line} ${e.rule}`)).toEqual(['index.js:300 plat/no-exponent-operator']);
    expect(scanLibrary(dir, 'flatbush@4.6.1', pinned).result).toBe('fail'); // another version is another review
    writeFileSync(file, `${readFileSync(file, 'utf8')}\n// changed\n`);
    const r = scanLibrary(dir, 'flatbush@4.6.2', pinned);
    expect(r.result).toBe('fail');
    expect(r.reviewed).toEqual([]);
    expect(r.findings.map((f) => `${f.file}:${f.line} ${f.rule}`)).toEqual(['index.js:300 plat/no-exponent-operator']);
  }, SCAN);

  it('holds no open reviewed exception (C-0152 closed C-0126 (5)), and would pin any to the vendored file it was judged on', () => {
    expect(REVIEWED).toEqual([]);
    for (const e of REVIEWED) {
      const [name, version] = [e.library.slice(0, e.library.lastIndexOf('@')), e.library.slice(e.library.lastIndexOf('@') + 1)];
      expect(sha256(join(VENDOR, `${name}@${version}`, e.file))).toBe(e.sha256);
      expect(lock[e.library].files[e.file]).toBe(e.sha256);
    }
  });
});

describe('the audit record', () => {
  /** The vendor-scan check over the real tree, taken once: { ok, problems, report, audit, text }. */
  let real;
  beforeAll(() => {
    real = checkVendorScan(PLAT_ROOT);
  }, SCAN);

  it('equals the scan, and the vendor-scan check passes (the scanned bytes are the ones that run)', () => {
    expect(real.problems).toEqual([]);
    expect(real.ok).toBe(true);
    expect(readFileSync(join(PLAT_ROOT, ...AUDIT_FILE.split('/')), 'utf8')).toBe(real.text);
  });

  it('holds each library with its version, result and exceptions: the three patches with their rows and wrappers (buildAudit)', () => {
    const audit = real.audit; // checkVendorScan's buildAudit(PLAT_ROOT)
    const by = Object.fromEntries(audit.libraries.map((l) => [l.library, l]));
    expect(Object.keys(by).sort()).toEqual(['delaunator', 'flatbush', 'flatqueue', 'robust-predicates', 'simplex-noise']);
    expect(by.delaunator.exceptions).toMatchObject([{ kind: 'patch', spec: 'vendor/patches/delaunator@5.1.0.json', choice: 'C-0011', wrapper: 'packages/kernel/src/adapters/delaunator.ts' }]);
    expect(by['simplex-noise'].exceptions).toMatchObject([{ kind: 'patch', spec: 'vendor/patches/simplex-noise@4.0.3.json', choice: 'C-0011', wrapper: 'packages/kernel/src/adapters/simplex-noise.ts' }]);
    expect(by.flatbush.exceptions).toMatchObject([{ kind: 'patch', spec: 'vendor/patches/flatbush@4.6.2.json', choice: 'C-0152', files: ['flatbush.js', 'index.js'], wrapper: 'packages/kernel/src/adapters/flatbush.ts' }]);
    expect(by.flatbush.exceptions).toHaveLength(1);
    expect(by.flatbush.result).toBe('pass');
    expect(by.flatqueue.adapter).toMatch(/^none/);
    for (const l of audit.libraries) {
      expect(l.exceptions.filter((e) => e.kind !== 'patch')).toEqual([]); // no reviewed exception open
      expect(l.findings).toEqual([]);
      expect(l.version).toBe(lock[`${l.library}@${l.version}`].version);
      expect(l.runsFrom.length).toBeGreaterThan(0);
      for (const r of l.runsFrom) expect(r.resolves).toBe(l.folder);
    }
  });

  it('fails the check when the record is stale or missing', () => {
    const root = mkdtempSync(join(tmpdir(), 'plat-vendor-audit-'));
    temps.push(root);
    cpSync(join(PLAT_ROOT, 'vendor'), join(root, 'vendor'), { recursive: true, filter: (s) => !s.includes('node_modules') });
    for (const p of ['kernel', 'model', 'tables', 'site', 'layout']) {
      cpSync(join(PLAT_ROOT, 'packages', p, 'package.json'), join(root, 'packages', p, 'package.json'));
    }
    const missing = checkVendorScan(root);
    expect(missing.problems.some((p) => p.startsWith(`${AUDIT_FILE}: missing`))).toBe(true);
    writeFileSync(join(root, ...AUDIT_FILE.split('/')), '{}\n');
    const stale = checkVendorScan(root);
    expect(stale.problems.some((p) => p.startsWith(`${AUDIT_FILE}: differs`))).toBe(true);
    expect(stale.ok).toBe(false);
  }, SCAN);
});
