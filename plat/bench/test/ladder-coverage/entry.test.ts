// The bench entry `corepack pnpm bench -- ladder-coverage` (M0-x-05; C-0067's summary, C-0095's dispatcher entry, C-0105:
// a vitest test spawns no tier script — the entry's `run` is called in-process on a fixture registry, its output and
// summary redirected to a temporary folder; C-0114: the harness's tests live in bench/test/ladder-coverage/): the
// arguments it refuses (exit 64), the report it writes and its shape, the numbers-only summary (written only for a whole
// run, the same bytes twice), and the exit code: 0 when every rung is covered, 1 when a fixture reaches nothing.
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { ladderCoverage, ladderLeafOf, STAGE_LADDERS, stageLadderCoverage, type CoverageReport, type LadderFixture, type StageCoverageOptions, type StageCoverageReport } from '@plat/testkit';
import { run, SUMMARY_PATH } from '../../src/ladder-coverage/index.js';

const dir = mkdtempSync(join(tmpdir(), 'ladder-coverage-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let k: CoverageReport | null = null;
const kernel = (): CoverageReport => (k ??= ladderCoverage({ draws: 1 }));
const built = STAGE_LADDERS.filter((r) => r.milestone === undefined);

/** A fixture registry: each built row's fixture leaving its leaf once, but `silent` (reaching nothing). */
function registry(silent: readonly string[] = []): readonly LadderFixture[] {
  return built.map((r) => ({ id: r.fixture, forces: 'planted', run: () => (silent.includes(r.fixture) ? {} : { [ladderLeafOf(r)]: 1 }) }));
}

/** The coverage run on the fixture registry; the plain baseline planted (the entry passes `plain` on a whole run). */
function planted(silent: readonly string[] = [], seen: StageCoverageOptions[] = []): (opts: StageCoverageOptions) => StageCoverageReport {
  return (opts) => {
    seen.push(opts);
    const r = stageLadderCoverage({ kernel: kernel(), fixtures: registry(silent), controls: [] });
    const leaves: Record<string, number> = {};
    for (const x of built) leaves[ladderLeafOf(x)] = x.ladder === 'F-CUT' ? 2 : 0;
    return { ...r, plain: opts.plain === undefined ? null : { seed: opts.plain, leaves, reached: Object.keys(leaves).filter((l) => leaves[l] > 0), bugs: 0 } };
  };
}

describe('bench -- ladder-coverage', () => {
  it('refuses an unknown argument, a bad seed and a bad draw count (exit 64), running nothing', () => {
    const seen: StageCoverageOptions[] = [];
    for (const args of [['--nope'], ['--plain'], ['--plain', 'x'], ['--kernel-draws', '0'], ['--kernel-draws', '-1']]) expect([args.join(' '), run(args, { out: dir, coverage: planted([], seen) })]).toEqual([args.join(' '), 64]);
    expect(seen).toEqual([]);
  });

  it('the summary’s home is docs/build/summaries/M0-x-05.json (C-0067)', () => {
    expect(SUMMARY_PATH.replace(/\\/g, '/')).toMatch(/\/plat\/docs\/build\/summaries\/M0-x-05\.json$/);
  });

  it('a whole run on the fixture registry: the plain baseline asked for at seed 1, the report written, the summary the same bytes twice, exit 0', () => {
    const summary = join(dir, 'whole.json');
    const seen: StageCoverageOptions[] = [];
    expect(run([], { out: dir, summary, coverage: planted([], seen) })).toBe(0);
    expect(seen).toEqual([{ plain: 1 }]);
    const report = JSON.parse(readFileSync(join(dir, 'ladder-coverage', 'report.json'), 'utf8')) as StageCoverageReport;
    expect(Object.keys(report).sort()).toEqual(['covered', 'kernel', 'ladders', 'plain', 'rows', 'stage', 'stageCovered', 'tableProblems']);
    expect(report.covered).toBe(true);
    expect(report.stage.length).toBe(STAGE_LADDERS.length);
    expect(report.rows.length).toBe(kernel().rows.length + STAGE_LADDERS.length);
    expect(report.plain?.seed).toBe(1);
    const text = readFileSync(summary, 'utf8');
    const s = JSON.parse(text) as { item: string; covered: boolean; builtRows: number; rungs: Record<string, { fixture: number; control: number; plain: number }>; plain: { seed: number; reached: number; bugs: number } };
    expect(s.item).toBe('M0-x-05');
    expect(s.covered).toBe(true);
    expect(s.builtRows).toBe(built.length);
    expect(s.rungs['S8 F-CUT pre']).toEqual({ fixture: 1, control: 0, plain: 2 });
    expect(s.rungs['S4 F-ROUTE slope']).toEqual({ fixture: 1, control: 0, plain: 0 });
    expect(s.plain).toEqual({ seed: 1, reached: built.filter((x) => x.ladder === 'F-CUT').length, bugs: 0 });
    expect(text).not.toMatch(/"(at|seconds|wallMs|cpuMs|ms)"/);
    expect(run([], { out: dir, summary, coverage: planted() })).toBe(0);
    expect(readFileSync(summary, 'utf8')).toBe(text);
  });

  it('`--plain 7` asks for the baseline at seed 7; `--no-plain`, `--kernel-draws` and `--no-summary` write no summary', () => {
    const seen: StageCoverageOptions[] = [];
    const s7 = join(dir, 'seven.json');
    expect(run(['--plain', '7'], { out: dir, summary: s7, coverage: planted([], seen) })).toBe(0);
    expect(JSON.parse(readFileSync(s7, 'utf8')).plain.seed).toBe(7);
    for (const [args, name] of [[['--no-plain'], 'np.json'], [['--kernel-draws', '2'], 'kd.json'], [['--no-summary'], 'ns.json']] as const) {
      const p = join(dir, name);
      expect(run([...args], { out: dir, summary: p, coverage: planted([], seen) })).toBe(0);
      expect([args.join(' '), existsSync(p)]).toEqual([args.join(' '), false]);
    }
    expect(seen).toEqual([{ plain: 7 }, {}, { plain: 1, kernelDraws: 2 }, { plain: 1 }]);
  });

  it('exits 1 when a planted fixture reaches no rung, its row reported not reached', () => {
    const victim = built[4];
    const summary = join(dir, 'fail.json');
    expect(run([], { out: dir, summary, coverage: planted([victim.fixture]) })).toBe(1);
    const report = JSON.parse(readFileSync(join(dir, 'ladder-coverage', 'report.json'), 'utf8')) as StageCoverageReport;
    expect(report.covered).toBe(false);
    expect(report.stage.find((r) => r.fixture === victim.fixture)?.exercised).toEqual({ fixture: 0, control: 0 });
    expect(JSON.parse(readFileSync(summary, 'utf8')).builtReached).toBe(built.length - 1);
  });
});
