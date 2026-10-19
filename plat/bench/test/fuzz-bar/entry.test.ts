// The bench entry `corepack pnpm bench -- fuzz-bar` (M0-k-04; §13.8: B-FUZZ as the tier's entry at its size; C-0067's
// summary, C-0105: a vitest test of the item spawns no tier script — the entry's `run` is called in-process at a toy
// size, its output and summary redirected to a temporary folder): the arguments it refuses, the counts report it writes,
// and the summary — numbers and ids only, the same bytes run to run, written only for a whole run.
import { mkdtempSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { runFuzz } from '@plat/testkit';
import { run, s11Workload, SUMMARY_PATH } from '../../src/fuzz-bar/index.js';

const dir = mkdtempSync(join(tmpdir(), 'fuzz-bar-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

describe('bench -- fuzz-bar', () => {
  it('refuses an unknown argument, a bad size and an unknown primitive (exit 64)', async () => {
    expect(await run(['--nope'], { out: dir })).toBe(64);
    expect(await run(['--runs', '0'], { out: dir })).toBe(64);
    expect(await run(['--primitive', 'noSuch'], { out: dir })).toBe(64);
  });

  it('one primitive alone: its counts, no summary written, exit 0 on a clean run', async () => {
    const summary = join(dir, 'one.json');
    expect(await run(['--primitive', 'obb', '--runs', '20', '--s11', '2'], { out: dir, summary })).toBe(0);
    expect(existsSync(summary)).toBe(false);
    const report = JSON.parse(readFileSync(join(dir, 'fuzz-bar', 'report.json'), 'utf8')) as { primitives: { primitive: string; runs: number }[] };
    expect(report.primitives.map((p) => [p.primitive, p.runs])).toEqual([['obb', 20]]);
  }, 300_000);

  it('exits 1 on a primitive report with 1 crash, 1 hang, 1 invalid output or 1 bugs entry, each on its own (a planted runFuzz)', async () => {
    const bug = { cls: 'F-NUM', entity: 'way:fuzz', key: 'bfuzz/obb#0', stage: 'B-FUZZ' };
    const planted: [string, Record<string, unknown>][] = [
      ['crash', { crashes: 1 }],
      ['hang', { hangs: 1 }],
      ['invalid', { invalid: 1 }],
      ['bug', { bugs: [bug] }],
    ];
    for (const [what, over] of planted) {
      const fake: typeof runFuzz = (name, n, opts) => ({ ...runFuzz(name, n, opts), ...over });
      expect([what, await run(['--primitive', 'obb', '--runs', '3', '--s11', '1'], { out: dir, runFuzz: fake })]).toEqual([what, 1]);
    }
    expect(await run(['--primitive', 'obb', '--runs', '3', '--s11', '1'], { out: dir, runFuzz })).toBe(0);
  }, 600_000);

  it('a partition unit leaves the ladders and the S11 workload out with --no-ladders --no-s11; a whole run refuses both (exit 64) (M0-f-02a N-5)', async () => {
    let s11Calls = 0;
    const spy: typeof s11Workload = (seed, n, opts) => {
      s11Calls++;
      return s11Workload(seed, n, opts);
    };
    expect(await run(['--primitive', 'obb', '--runs', '3', '--no-ladders', '--no-s11'], { out: dir, s11Workload: spy })).toBe(0);
    expect(s11Calls).toBe(0);
    const report = JSON.parse(readFileSync(join(dir, 'fuzz-bar', 'report.json'), 'utf8')) as { primitives: { primitive: string }[]; ladders: { rows: unknown[]; covered: boolean }; s11: unknown };
    expect([report.primitives.map((p) => p.primitive), report.ladders.rows.length, report.ladders.covered, report.s11]).toEqual([['obb'], 0, false, null]);
    // without the flags the unit runs both (the work the flags leave out)
    expect(await run(['--primitive', 'obb', '--runs', '3', '--s11', '1'], { out: dir, s11Workload: spy })).toBe(0);
    expect(s11Calls).toBe(1);
    const full = JSON.parse(readFileSync(join(dir, 'fuzz-bar', 'report.json'), 'utf8')) as { ladders: { rows: unknown[] }; s11: { plots: number } };
    expect([full.ladders.rows.length > 0, full.s11.plots]).toEqual([true, 1]);
    for (const flag of ['--no-ladders', '--no-s11']) expect([flag, await run(['--runs', '1', flag], { out: dir, s11Workload: spy })]).toEqual([flag, 64]);
    expect(s11Calls).toBe(1);
  }, 300_000);

  it('the exit reads the S11 call-list check: a planted call list with a missing lir exits 1 (N-5)', async () => {
    const short: typeof s11Workload = async (seed, n, opts) => {
      const w = await s11Workload(seed, n, opts);
      return { ...w, calls: w.calls.map((p, i) => (i === 0 ? { ...p, calls: p.calls.filter((c) => c.op !== 'lir') } : p)) };
    };
    expect(await run(['--primitive', 'obb', '--runs', '3', '--s11', '2'], { out: dir, s11Workload: short })).toBe(1);
    const report = JSON.parse(readFileSync(join(dir, 'fuzz-bar', 'report.json'), 'utf8')) as { s11: { problems: string[] } };
    expect(report.s11.problems).toHaveLength(1);
    expect(await run(['--primitive', 'obb', '--runs', '3', '--s11', '2'], { out: dir, s11Workload })).toBe(0);
  }, 300_000);

  it('a whole run exits 1 on a planted crash in one primitive report, its summary failing the bar (N-16)', async () => {
    const summary = join(dir, 'crash.json');
    const fake: typeof runFuzz = (name, n, opts) => (name === 'obb' ? { ...runFuzz(name, n, opts), crashes: 1 } : runFuzz(name, n, opts));
    expect(await run(['--runs', '1', '--constructive-seeds', '1', '--s11', '1', '--no-sweeps'], { out: dir, summary, runFuzz: fake })).toBe(1);
    const s = JSON.parse(readFileSync(summary, 'utf8')) as { pass: boolean; totals: { crashes: number }; constructive: { failing: string[] } };
    expect([s.pass, s.totals.crashes, s.constructive.failing]).toEqual([false, 1, []]);
  }, 600_000);

  it('a whole toy run: the counts report, the numbers-only summary (the same bytes twice), the bar decided', async () => {
    const summary = join(dir, 'whole.json');
    const args = ['--runs', '3', '--constructive-seeds', '1', '--s11', '3', '--no-sweeps'];
    const code = await run(args, { out: dir, summary });
    const text = readFileSync(summary, 'utf8');
    const s = JSON.parse(text) as Record<string, unknown> & { constructiveDraws: unknown; pass: boolean; primitives: Record<string, { runs: number }>; constructive: { known: string[]; failing: string[]; deferred: Record<string, number> }; totals: { bugs: number } };
    expect(code).toBe(s.pass ? 0 : 1);
    expect(s.pass).toBe(true);
    expect(Object.keys(s.primitives).length).toBe(24);
    for (const p of Object.values(s.primitives)) expect(p.runs).toBe(3);
    expect(s.constructive.failing).toEqual([]);
    expect(s.constructive.known.length).toBeGreaterThan(0);
    expect(s.totals.bugs).toBe(0);
    expect(s.constructiveDraws).toEqual({ perCase: 1, sweepsWhole: false });
    expect(text).not.toMatch(/"(at|seconds|wallMs|cpuMs)"/);
    expect(await run(args, { out: dir, summary })).toBe(code);
    expect(readFileSync(summary, 'utf8')).toBe(text);
    expect(SUMMARY_PATH).toMatch(/docs[/\\]build[/\\]summaries[/\\]M0-k-04\.json$/);
  }, 1_200_000);
});
