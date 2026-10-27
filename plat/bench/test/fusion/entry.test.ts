// M0-c-06's entry: `corepack pnpm bench -- fusion …` — its arguments, its exit codes, the report and stamps it writes in
// the output folder, and the numbers-only summary only with --summary on the whole CITY run (N-03).
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { DEFAULT_SEEDS, parseArgs, run, type Task } from '../../src/fusion/index.js';
import { goodRecord } from './support.js';

const tmp = mkdtempSync(join(tmpdir(), 'fusion-entry-'));
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

describe('the entry’s arguments', () => {
  it('defaults: 1 000 seeds from 1, both runs, the CITY size, one worker', () => {
    const a = parseArgs([], {});
    expect(a).toEqual({ sizes: { from: 1, seeds: DEFAULT_SEEDS, runs: ['fusion', 'integrated'], frameHa: null, walledHa: null }, workers: 1, summary: false, timing: null });
    expect(DEFAULT_SEEDS).toBe(1_000);
  });

  it('reads every option; PLAT_BENCH_WORKERS stands in for --workers', () => {
    expect(parseArgs(['--from', '7', '--seeds', '3', '--runs', 'integrated', '--workers', '4', '--frame-ha', '900', '--walled-ha', '30'], {})).toEqual({ sizes: { from: 7, seeds: 3, runs: ['integrated'], frameHa: 900, walledHa: 30 }, workers: 4, summary: false, timing: null });
    expect(parseArgs([], { PLAT_BENCH_WORKERS: '6' })).toMatchObject({ workers: 6 });
    expect(parseArgs(['--timing', '--timing-seeds', '9'], {})).toMatchObject({ timing: { seeds: 9 } });
    expect(parseArgs(['--timing'], {})).toMatchObject({ timing: { seeds: 5 } });
    expect(parseArgs(['--summary'], {})).toMatchObject({ summary: true });
  });

  it('refuses a bad argument (exit 64)', () => {
    for (const bad of [['--bogus'], ['--seeds'], ['--seeds', 'x'], ['--seeds', '0'], ['--workers', '0'], ['--runs', 'fusion,nope'], ['--frame-ha', '900'], ['--seeds', '2', '--seeds', '3'], ['--timing-seeds', '3']]) {
      expect(typeof parseArgs(bad, {}), bad.join(' ')).toBe('string');
    }
    expect(typeof parseArgs([], { PLAT_BENCH_WORKERS: 'many' })).toBe('string');
    // --summary only on a CITY run of both runs from seed 1 (it states its seed count; C-0272's pattern, N-52 (6))
    for (const bad of [['--summary', '--from', '2'], ['--summary', '--runs', 'fusion'], ['--summary', '--runs', 'fusion,integrated'], ['--summary', '--frame-ha', '900', '--walled-ha', '30'], ['--summary', '--timing']]) {
      expect(parseArgs(bad, {}), bad.join(' ')).toMatch(/--summary/);
    }
    expect(typeof parseArgs(['--summary', '--seeds', '1000', '--from', '1'], {})).toBe('object');
    expect(parseArgs(['--summary', '--seeds', '50'], {})).toMatchObject({ summary: true, sizes: { from: 1, seeds: 50 } });
  });
});

describe('the entry’s run (planted records)', () => {
  it('exit 0 when every bar holds, the report and stamps written; no summary without --summary', async () => {
    const out = join(tmp, 'a');
    const summary = join(tmp, 'a-summary.json');
    let seen: Task[] = [];
    const code = await run(['--seeds', '2', '--frame-ha', '900', '--walled-ha', '30'], {
      out,
      summary,
      runTask: (t) => {
        seen.push(t);
        return goodRecord(t.seed, t.run);
      },
    });
    expect(code).toBe(0);
    expect(seen.map((t) => `${String(t.seed)}${t.run}`)).toEqual(['1fusion', '1integrated', '2fusion', '2integrated']);
    expect(seen.every((t) => t.frameHa === 900 && t.walledHa === 30)).toBe(true);
    const report = JSON.parse(readFileSync(join(out, 'fusion', 'report.json'), 'utf8'));
    expect(report.item).toBe('M0-c-06');
    expect(report.pass).toBe(true);
    expect(JSON.parse(readFileSync(join(out, 'fusion', 'stamps.json'), 'utf8')).authority).toBe('contended');
    expect(existsSync(summary)).toBe(false);
    seen = [];
  });

  it('exit 1 when a bar fails', async () => {
    const code = await run(['--seeds', '1', '--runs', 'fusion'], { out: join(tmp, 'b'), runTask: (t) => goodRecord(t.seed, t.run, { strips: { faces: 1, lanes: 1, crossings: 1 } }) });
    expect(code).toBe(1);
  });

  it('exit 64 on a bad argument, nothing run', async () => {
    let ran = 0;
    expect(await run(['--nope'], { out: join(tmp, 'c'), runTask: (t) => (ran++, goodRecord(t.seed, t.run)) })).toBe(64);
    expect(ran).toBe(0);
  });

  it('--summary writes the numbers-only summary on the whole run', async () => {
    const summary = join(tmp, 'd-summary.json');
    const code = await run(['--summary'], { out: join(tmp, 'd'), summary, runTask: (t) => goodRecord(t.seed, t.run) });
    expect(code).toBe(0);
    const s = JSON.parse(readFileSync(summary, 'utf8'));
    expect(s.item).toBe('M0-c-06');
    expect(s.longRun).toEqual({ seedsAsked: 1_000, seedsRun: 1_000, status: 'complete' });
    expect(s.sizes).toEqual({ from: 1, seeds: 1_000, runs: ['fusion', 'integrated'], frameHa: null, walledHa: null });
    expect(s.runs[0].seedRows).toBe(1_000);
    expect(Object.keys(s.timing.r12_4)).toEqual(['S3', 'S4', 'S5', 'S8']);
    expect(s.runs[0].work['cut.kernelCalls'].perUnit).toMatchObject({ n: 1_000, p50: 3, p99: 3, p999: 3, max: 3 });
    // numbers only: no sample arrays, no per-seed table
    expect(JSON.stringify(s)).not.toMatch(/gaps|blockAreasM2|"perSeed":\[/);
  });

  it('--summary on a smaller CITY run (the builder’s smoke) states its seed count and reads PENDING-LONG-RUN', async () => {
    const summary = join(tmp, 'e-summary.json');
    const out = join(tmp, 'e');
    const code = await run(['--summary', '--seeds', '3'], { out, summary, runTask: (t) => goodRecord(t.seed, t.run) });
    expect(code).toBe(0);
    const s = JSON.parse(readFileSync(summary, 'utf8'));
    expect(s.longRun).toEqual({ seedsAsked: 1_000, seedsRun: 3, status: 'PENDING-LONG-RUN' });
    expect(s.sizes.seeds).toBe(3);
    // The full report keeps the per-seed table (the refusal census by seed).
    const report = JSON.parse(readFileSync(join(out, 'fusion', 'report.json'), 'utf8'));
    expect(report.runs[1].perSeed.map((x: { seed: number }) => x.seed)).toEqual([1, 2, 3]);
    expect(report.runs[1].perSeed[0]).toMatchObject({ seed: 1, compared: 10, exact: 10, beyond: 0, corpusDowngrades: [1, 1], refusals: { s8: 0, corpusRoof: 1 } });
  });
});
