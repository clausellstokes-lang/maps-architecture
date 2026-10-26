// M0-k-05: the `baselines-check` bench entry (C-0113, C-0114) — `corepack pnpm baselines:check -- <file>` on synthetic
// crossing files exits 0 / 1 / 2 / 64 as its case states, writes the report to PLAT_BENCH_OUT, and reads no path
// outside plat/: node:fs is wrapped (a pass-through that records every call while a test asks it to) and the log shows
// the file, the crossings.json beside it and the --previous version read, nothing else.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { CHECK_REPORT_FILE, PLAT_ROOT, run } from '../../src/baselines-check/index.js';

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

const FX = 'bench/test/baselines-check/fixtures';
const WRITES = new Set(['writeFileSync', 'mkdirSync', 'appendFileSync', 'createWriteStream', 'rmSync', 'unlinkSync', 'renameSync', 'copyFileSync']);
const READS = new Set(['readFileSync', 'createReadStream', 'openSync', 'readdirSync']);

let out = '';
beforeAll(() => {
  out = mkdtempSync(join(tmpdir(), 'plat-k05-check-out-'));
});
afterAll(() => rmSync(out, { recursive: true, force: true }));

function logged(args: string[]): { code: number; log: { fn: string; path: string }[] } {
  rmSync(join(out, CHECK_REPORT_FILE), { force: true });
  calls.list = [];
  calls.on = true;
  try {
    return { code: run(args, { out }), log: [...calls.list] };
  } finally {
    calls.on = false;
  }
}
const inPlat = (p: string): boolean => {
  const abs = resolve(PLAT_ROOT, p);
  return abs === resolve(PLAT_ROOT) || abs.startsWith(resolve(PLAT_ROOT) + sep);
};
const reads = (log: { fn: string; path: string }[]): string[] => [...new Set(log.filter((c) => READS.has(c.fn)).map((c) => resolve(PLAT_ROOT, c.path)))].sort();
const report = (): { pass: boolean; checks: { id: string; status: string; note?: string; problems: string[] }[]; record: { status: string; problems: string[] } } =>
  JSON.parse(readFileSync(join(out, CHECK_REPORT_FILE), 'utf8')) as ReturnType<typeof report>;

describe('corepack pnpm baselines:check (M0-k-05, C-0092, C-0113)', () => {
  it('exit 0: a synthetic baselines.json with its record passes; C8 – C10 named as not run; only the file and its crossings.json read', () => {
    const { code, log } = logged([`${FX}/pass/baselines.json`]);
    expect(code).toBe(0);
    const r = report();
    expect(r.pass).toBe(true);
    expect(r.checks.filter((c) => c.status === 'not run').map((c) => [c.id, c.note])).toEqual([
      ['C8', 'not run at M0 (V12 §3.3, M1)'],
      ['C9', 'not run at M0 (V12 §3.3, M1)'],
      ['C10', 'not run at M0 (V12 §3.3, M1)'],
    ]);
    expect(reads(log)).toEqual([resolve(PLAT_ROOT, `${FX}/pass/baselines.json`), resolve(PLAT_ROOT, `${FX}/pass/crossings.json`)].sort());
    for (const c of log.filter((x) => !WRITES.has(x.fn))) expect(inPlat(c.path), `${c.fn} ${c.path}`).toBe(true);
    for (const c of log.filter((x) => WRITES.has(x.fn))) expect(resolve(c.path).startsWith(resolve(out)), `${c.fn} ${c.path}`).toBe(true);
  });

  it('exit 1: a colour value fails C3; a missing record fails the record check', () => {
    expect(logged([`${FX}/fail/baselines.json`]).code).toBe(1);
    expect(report().checks.find((c) => c.id === 'C3')?.problems).toEqual(['a string at [0].note holds a colour value']);
    expect(logged([`${FX}/norecord/baselines.json`]).code).toBe(1);
    expect(report().record.problems[0]).toMatch(/^record missing: no CrossingRecord names bench\/test\/baselines-check\/fixtures\/norecord\/baselines\.json/);
  });

  it('an appended row with its record passes against --previous (C4); without --previous C4 fails', () => {
    const ok = logged([`${FX}/appended/baselines.json`, '--previous', `${FX}/appended/previous.json`]);
    expect(ok.code).toBe(0);
    expect(reads(ok.log)).toEqual(
      [`${FX}/appended/baselines.json`, `${FX}/appended/crossings.json`, `${FX}/appended/previous.json`].map((p) => resolve(PLAT_ROOT, p)).sort(),
    );
    expect(logged([`${FX}/appended/baselines.json`]).code).toBe(1);
    expect(report().checks.find((c) => c.id === 'C4')?.problems[0]).toMatch(/pass --previous <file>/);
  });

  it('exit 0 on a synthetic deny-list (C1 and C3 run)', () => {
    expect(logged([`${FX}/deny/denylist.json`]).code).toBe(0);
    expect(report().checks.filter((c) => c.status === 'pass').map((c) => c.id)).toEqual(['C1', 'C3']);
  });

  it('exit 2: a missing file stops naming it, and no report is written', () => {
    const { code, log } = logged([`${FX}/absent/baselines.json`]);
    expect(code).toBe(2);
    expect(log.filter((x) => WRITES.has(x.fn))).toEqual([]);
  });

  it('exit 64: no file, an unknown file kind, an unknown option, or a path outside plat/', () => {
    expect(logged([]).code).toBe(64);
    expect(logged([`${FX}/pass/crossings.json`]).code).toBe(64);
    expect(logged([`${FX}/pass/baselines.json`, '--strict']).code).toBe(64);
    const outside = logged([join(tmpdir(), 'baselines.json')]);
    expect(outside.code).toBe(64);
    expect(outside.log.filter((c) => READS.has(c.fn))).toEqual([]);
    expect(logged([`${FX}/appended/baselines.json`, '--previous', '/etc/hosts']).code).toBe(64);
  });
});
