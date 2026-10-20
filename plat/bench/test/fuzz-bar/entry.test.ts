// The bench entry `corepack pnpm bench -- fuzz-bar` (M0-k-04; §13.8: B-FUZZ as the tier's entry at its size; C-0067's
// summary, C-0105: a vitest test of the item spawns no tier script — the entry's `run` is called in-process at a toy
// size, its output and summary redirected to a temporary folder): the arguments it refuses, the counts report it writes,
// and the summary — numbers and ids only, the same bytes run to run, written only for a whole run.
import { mkdtempSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { runFuzz } from '@plat/testkit';
import { run, SUMMARY_PATH } from '../../src/fuzz-bar/index.js';

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
