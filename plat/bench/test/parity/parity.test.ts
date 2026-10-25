// M0-k-05: the `parity` bench entry (C-0113, C-0114) — `corepack pnpm parity -- --ours <file>` on a synthetic
// baselines.json exits 0 / 1 / 2 / 64 as its case states, writes the report to PLAT_BENCH_OUT (and no report when it
// stops, T-RIG-1), and reads no path outside plat/ — node:fs is wrapped (a pass-through that records every call while a
// test asks it to), so the file-open log is checked against the calls the CLI really made: it opens the baselines file
// and our side's file, nothing else.
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { PARITY_REPORT_FILE, PLAT_ROOT, run } from '../../src/parity/index.js';

const calls = vi.hoisted(() => ({ on: false, list: [] as { fn: string; path: string }[] }));

vi.mock('node:fs', async (importOriginal) => {
  const real = await importOriginal<typeof import('node:fs')>();
  const wrapped: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(real)) {
    if (typeof value !== 'function' || /^[A-Z]/.test(name)) {
      wrapped[name] = value;
      continue;
    }
    const fn = value as (...a: unknown[]) => unknown;
    const w = (...args: unknown[]): unknown => {
      const p = args[0];
      if (calls.on && (typeof p === 'string' || p instanceof URL)) calls.list.push({ fn: name, path: typeof p === 'string' ? p : fileURLToPath(p) });
      return fn(...args);
    };
    wrapped[name] = Object.assign(w, fn);
  }
  return { ...wrapped, default: wrapped };
});

const HERE = dirname(fileURLToPath(import.meta.url));
const FX = join(HERE, 'fixtures');
const BASE = join(FX, 'pass', 'baselines.json');
const WRITES = new Set(['writeFileSync', 'mkdirSync', 'appendFileSync', 'createWriteStream', 'rmSync', 'unlinkSync', 'renameSync', 'copyFileSync']);
const READS = new Set(['readFileSync', 'createReadStream', 'openSync', 'readdirSync']);

let out = '';
beforeAll(() => {
  out = mkdtempSync(join(tmpdir(), 'plat-k05-parity-out-'));
});
afterAll(() => rmSync(out, { recursive: true, force: true }));

/** Runs the entry with the file-open log on; returns the exit code and the log. */
function logged(args: string[], baselines?: string): { code: number; log: { fn: string; path: string }[] } {
  rmSync(join(out, PARITY_REPORT_FILE), { force: true });
  calls.list = [];
  calls.on = true;
  try {
    const code = run(args, { out, ...(baselines === undefined ? {} : { baselines }) });
    return { code, log: [...calls.list] };
  } finally {
    calls.on = false;
  }
}

const inPlat = (p: string): boolean => {
  const abs = resolve(PLAT_ROOT, p);
  const root = resolve(PLAT_ROOT);
  return abs === root || abs.startsWith(root + sep);
};

describe('corepack pnpm parity (M0-k-05, C-0113)', () => {
  it('exit 0: the synthetic rows pass; the report is written to PLAT_BENCH_OUT in canonical form; only the two files are read', () => {
    const { code, log } = logged(['--ours', 'bench/test/parity/fixtures/ours-pass.json'], BASE);
    expect(code).toBe(0);
    const text = readFileSync(join(out, PARITY_REPORT_FILE), 'utf8');
    const rep = JSON.parse(text) as { rows: { metric: string; verdict: string; note?: string }[]; summary: Record<string, number>; metricsVersion: string };
    expect(rep.rows.map((r) => [r.metric, r.verdict])).toEqual([
      ['junction.share4', 'pass'],
      ['sgd.tShare', 'pass'],
      ['block.area', 'pass'],
      ['bldg.r4.60', 'missingBaseline'],
    ]);
    expect(rep.summary).toEqual({ pass: 3, fail: 0, reported: 0 });
    expect(rep.metricsVersion).toBe('1.0.0');
    // the file-open log: every read is one of the two inputs; every path touched for reading lies inside plat/
    const reads = log.filter((c) => READS.has(c.fn)).map((c) => resolve(c.path));
    expect([...new Set(reads)].sort()).toEqual([resolve(BASE), resolve(PLAT_ROOT, 'bench/test/parity/fixtures/ours-pass.json')].sort());
    for (const c of log.filter((x) => !WRITES.has(x.fn))) expect(inPlat(c.path), `${c.fn} ${c.path}`).toBe(true);
    for (const c of log.filter((x) => WRITES.has(x.fn))) expect(resolve(c.path).startsWith(resolve(out)), `${c.fn} ${c.path}`).toBe(true);
  });

  it('T-RIG-2 through the entry: a second run writes the same bytes', () => {
    logged(['--ours', 'bench/test/parity/fixtures/ours-pass.json'], BASE);
    const a = readFileSync(join(out, PARITY_REPORT_FILE));
    logged(['--ours', 'bench/test/parity/fixtures/ours-pass.json'], BASE);
    expect(readFileSync(join(out, PARITY_REPORT_FILE)).equals(a)).toBe(true);
  });

  it("reads our side from a summary's parityOurs member", () => {
    expect(logged(['--ours', 'bench/test/parity/fixtures/summary-with-ours.json'], BASE).code).toBe(0);
  });

  it('exit 1: a row out of its band fails', () => {
    const { code } = logged(['--ours', 'bench/test/parity/fixtures/ours-fail.json'], BASE);
    expect(code).toBe(1);
    const rep = JSON.parse(readFileSync(join(out, PARITY_REPORT_FILE), 'utf8')) as { rows: { metric: string; verdict: string }[] };
    expect(rep.rows.filter((r) => r.verdict === 'fail').map((r) => r.metric)).toEqual(['junction.share4', 'block.area']);
  });

  it('exit 2: a missing file or a row lacking capture stops the CLI naming the file and the row; no report is written (T-RIG-1)', () => {
    const missing = logged(['--ours', 'bench/test/parity/fixtures/ours-pass.json'], join(FX, 'absent', 'baselines.json'));
    expect(missing.code).toBe(2);
    expect(existsSync(join(out, PARITY_REPORT_FILE))).toBe(false);
    for (const c of missing.log.filter((x) => WRITES.has(x.fn))) expect(c.path).toBe('(none)');
    const stop = logged(['--ours', 'bench/test/parity/fixtures/ours-pass.json'], join(FX, 'stop', 'baselines.json'));
    expect(stop.code).toBe(2);
    expect(existsSync(join(out, PARITY_REPORT_FILE))).toBe(false);
    expect(logged(['--ours', 'bench/test/parity/fixtures/none.json'], BASE).code).toBe(2);
  });

  it('exit 2: an empty baselines.json ([]) or an empty our side (seeds 0, no entry) stops naming the file; no report is written (§13.8 Edges, C-0186)', () => {
    const lines: string[] = [];
    const spy = vi.spyOn(process.stdout, 'write').mockImplementation((chunk: string | Uint8Array) => {
      lines.push(String(chunk));
      return true;
    });
    try {
      const emptyBase = join(FX, 'empty', 'baselines.json');
      const a = logged(['--ours', 'bench/test/parity/fixtures/ours-pass.json'], emptyBase);
      expect(a.code).toBe(2);
      expect(existsSync(join(out, PARITY_REPORT_FILE))).toBe(false);
      for (const c of a.log.filter((x) => WRITES.has(x.fn))) expect(c.path).toBe('(none)');
      const b = logged(['--ours', 'bench/test/parity/fixtures/ours-empty.json'], BASE);
      expect(b.code).toBe(2);
      expect(existsSync(join(out, PARITY_REPORT_FILE))).toBe(false);
      for (const c of b.log.filter((x) => WRITES.has(x.fn))) expect(c.path).toBe('(none)');
    } finally {
      spy.mockRestore();
    }
    const text = lines.join('\n');
    expect(text).toContain(`parity stopped: ${join(FX, 'empty', 'baselines.json')}: empty: the file holds no row`);
    expect(text).toMatch(/parity stopped: bench\/test\/parity\/fixtures\/ours-empty\.json: empty seed family: setting\.seeds is 0/);
  });

  it("reads baselines.json from its one place by default (absent at M0: it stops naming the file)", () => {
    const real = join(PLAT_ROOT, 'packages', 'testkit', 'baselines', 'baselines.json');
    const { code, log } = logged(['--ours', 'bench/test/parity/fixtures/ours-pass.json']);
    expect(log.some((c) => resolve(c.path) === resolve(real))).toBe(true);
    if (!existsSync(real)) expect(code).toBe(2);
    else expect([0, 1]).toContain(code);
  });

  it('exit 64: no arguments, an unknown argument, or a path outside plat/', () => {
    expect(logged([], BASE).code).toBe(64);
    expect(logged(['--ours'], BASE).code).toBe(64);
    expect(logged(['--baselines', 'x.json'], BASE).code).toBe(64);
    const outside = logged(['--ours', join(tmpdir(), 'ours.json')], BASE);
    expect(outside.code).toBe(64);
    expect(outside.log.filter((c) => READS.has(c.fn))).toEqual([]);
    expect(logged(['--ours', 'bench/test/parity/fixtures/ours-pass.json'], join(tmpdir(), 'baselines.json')).code).toBe(64);
  });
});
