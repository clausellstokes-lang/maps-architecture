// M0-f-01's host tests (C-0025, C-0075, C-0114): the host record names §12.1's reference machine on both Node legs
// (arm64 natively, x64 under Rosetta 2), and the reference-score file exists at null, is written once and only from an
// authoritative run.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  NO_REFERENCE_SCORE,
  REFERENCE_SCORE,
  REFERENCE_SCORE_PATH,
  describeHost,
  hostKind,
  hostRecord,
  readReferenceScore,
  writeReferenceScore,
  type HostRecord,
} from '../../src/host/index.js';

const RECORD_TS = fileURLToPath(new URL('../../src/host/record.ts', import.meta.url));
const GIB = 1024 * 1024 * 1024;

/** §12.1's reference machine as M0.md §0.2 probed it (2026-10-03). */
function expectReferenceMachine(h: HostRecord): void {
  expect(h.cpu).toBe('Apple M1');
  expect(h.cores).toBe(8);
  expect(h.performanceCores).toBe(4);
  expect(h.efficiencyCores).toBe(4);
  expect(h.memoryBytes).toBe(16 * GIB);
  expect(h.os.name).toBe('macOS');
  expect(h.os.version).toBe('14.7.8');
  expect(h.os.build).toBe('23H730');
  expect(h.node).toBe('v24.12.0');
  expect(h.browser).toBeNull();
}

describe('the host record (§12.1)', () => {
  it('names this machine: Apple M1, 8 cores (4P + 4E), 16 GB, macOS 14.7.8, Node 24.12.0, arm64 native', () => {
    const h = hostRecord();
    expectReferenceMachine(h);
    expect(h.arch).toBe('arm64');
    expect(h.kind).toBe('native-arm64');
    expect(describeHost(h)).toBe('Apple M1, 8 cores (4P + 4E), 16 GiB, macOS 14.7.8 (23H730), node v24.12.0 arm64 native-arm64');
  });

  it('names the same machine with arch x64 and kind rosetta under Rosetta 2 (the universal binary\'s x86_64 slice)', () => {
    // record.ts is self-contained, so the x64 Node runs it with its own type stripping (tsx's esbuild is arm64-only here).
    const script = `const m = await import(${JSON.stringify(pathToFileURL(RECORD_TS).href)}); process.stdout.write(JSON.stringify(m.hostRecord()));`;
    const out = execFileSync('/usr/bin/arch', ['-x86_64', process.execPath, '--no-warnings', '--input-type=module', '-e', script], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 30_000,
    });
    const h = JSON.parse(out) as HostRecord;
    expectReferenceMachine(h);
    expect(h.arch).toBe('x64');
    expect(h.kind).toBe('rosetta');
  }, 60_000);

  it('derives the kind from the architecture and the translation flag', () => {
    expect(hostKind('arm64', 'darwin', () => '0')).toBe('native-arm64');
    expect(hostKind('x64', 'darwin', () => '1')).toBe('rosetta');
    expect(hostKind('x64', 'darwin', () => '0')).toBe('native-x64');
    expect(hostKind('x64', 'darwin', () => null)).toBe('native-x64');
    expect(hostKind('x64', 'linux', () => '1')).toBe('native-x64');
    expect(() => hostKind('ia32', 'win32', () => null)).toThrow(/unsupported architecture/);
  });
});

describe('the reference score (C-0075)', () => {
  it('exists at null in bench/src/host/reference-score.json', () => {
    expect(REFERENCE_SCORE_PATH.endsWith(join('bench', 'src', 'host', 'reference-score.json'))).toBe(true);
    const raw = JSON.parse(readFileSync(REFERENCE_SCORE_PATH, 'utf8')) as Record<string, unknown>;
    expect(raw['score']).toBeNull();
    expect(REFERENCE_SCORE.score).toBeNull();
    expect(readReferenceScore().score).toBeNull();
  });

  const host = hostRecord();
  const scratch = (): { dir: string; path: string } => {
    const base = process.env['PLAT_BENCH_OUT'] || tmpdir();
    mkdirSync(base, { recursive: true });
    const dir = mkdtempSync(join(base, 'f01-ref-'));
    const path = join(dir, 'reference-score.json');
    writeFileSync(path, readFileSync(REFERENCE_SCORE_PATH, 'utf8'));
    return { dir, path };
  };

  it('is written once, from an authoritative run: the mean of two agreeing scores with the host record', () => {
    const { dir, path } = scratch();
    try {
      const rec = writeReferenceScore(
        { scores: [30, 31], calibrateVersion: 1, host, reasons: [NO_REFERENCE_SCORE] },
        { writtenBy: 'test', path, at: '2026-10-03T00:00:00.000Z' },
      );
      expect(rec.score).toBe(30.5);
      const back = readReferenceScore(path);
      expect(back).toEqual(rec);
      expect(back.host).toEqual(host);
      expect(back.calibration?.drift).toBeCloseTo(1 / 30, 12);
      expect((JSON.parse(readFileSync(path, 'utf8')) as Record<string, unknown>)['$comment']).toMatch(/M0-t-01/);
      expect(() =>
        writeReferenceScore({ scores: [30, 30], calibrateVersion: 1, host, reasons: [NO_REFERENCE_SCORE] }, { writtenBy: 'test', path }),
      ).toThrow(/already written/);
      expect(readReferenceScore(path).score).toBe(30.5);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('refuses a contended run (any reason but "no reference score") and two scores more than 5 % apart', () => {
    const { dir, path } = scratch();
    try {
      expect(() =>
        writeReferenceScore({ scores: [30, 30], calibrateVersion: 1, host, reasons: [NO_REFERENCE_SCORE, 'process: python3 (Python, pid 1)'] }, { writtenBy: 'test', path }),
      ).toThrow(/contended/);
      expect(() =>
        writeReferenceScore({ scores: [100, 106], calibrateVersion: 1, host, reasons: [] }, { writtenBy: 'test', path }),
      ).toThrow(/6\.0 %/);
      expect(readReferenceScore(path).score).toBeNull();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('rejects a malformed file', () => {
    const { dir, path } = scratch();
    try {
      writeFileSync(path, JSON.stringify({ score: -1, unit: 'ms' }));
      expect(() => readReferenceScore(path)).toThrow(/positive number/);
      writeFileSync(path, JSON.stringify({ score: 30, unit: 'ms', host: null, calibrateVersion: null }));
      expect(() => readReferenceScore(path)).toThrow(/host record/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
