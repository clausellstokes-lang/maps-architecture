// The entry `corepack pnpm bench -- fusion-ng --phase a | b` (M0-c-07; C-0113's dispatcher entry; C-0117: "the entry with
// --phase a | b"; the checker's line: "the entry's two phases dispatch and the folder has one owner"). Its arguments and
// refusals, both phases dispatched in-process on in-memory inputs (C-0105: no tier script, no file outside plat/), the
// report removed before a run (M0-k-05's closing check, N-h), and the run item's summary only behind --summary (N-03).
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { afterAll, describe, expect, it, vi } from 'vitest';
import type { MetricDoc } from '@plat/testkit';
import { DEFAULT_SIZES, parseArgs, PLAT_ROOT, run, SUMMARY_FILES, type FusionStatisticsReport, type HoodRecord, type HoodTask } from '../../src/fusion-ng/index.js';
import type { SeedRecord, Task } from '../../src/fusion/index.js';
import { goodRecord } from '../fusion/support.js';
import { baselinesText, got, MEM_ROOT, ngFacesText, ngFile, put, resetMem, row, scalar, SIZE_ARGS, twoHoods } from './support.js';

const mem = vi.hoisted(() => ({ root: '', files: new Map<string, Uint8Array>(), log: [] as { op: string; path: string; virtual: boolean }[] }));
vi.mock('node:fs', async (orig) => (await import('../bentcut-ng/memfs.js')).memFs(await orig<typeof import('node:fs')>(), mem));

const tmp = mkdtempSync(join(tmpdir(), 'fusion-ng-entry-'));
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

let seedsRun: number[] = [];
const plantedSeed = (seed: number): { record: SeedRecord; doc: MetricDoc } => {
  seedsRun.push(seed);
  return { record: goodRecord(seed, 'integrated'), doc: { ways: [], blocks: [] } };
};
let hoodsRun: string[] = [];
const plantedHood = (t: HoodTask): HoodRecord => {
  hoodsRun.push(`${String(t.hood.id)}/${String(t.seedIndex)}`);
  return {
    hood: t.hood.id,
    template: t.hood.template,
    seedIndex: t.seedIndex,
    seed: 1,
    setup: null,
    refused: null,
    outline: [{ x: 0, y: 0 }, { x: 5_000, y: 0 }, { x: 10_000, y: 0 }, { x: 10_000, y: 10_000 }, { x: 5_000, y: 10_000 }, { x: 0, y: 10_000 }, { x: 0, y: 0 }],
    lanes: [[{ x: 5_000, y: 0 }, { x: 5_000, y: 10_000 }]],
    blocks: [{ ring: [{ x: 0, y: 0 }, { x: 5_000, y: 0 }, { x: 5_000, y: 10_000 }, { x: 0, y: 10_000 }], content: 'ordinary', depthClass: 'standard', interior: 'none' }],
    warnings: {},
    census: { s8: 0, kernelDowngrades: 0, kernelWorkLimitHits: 0, unplaced: 0, degraded: 0, bugs: 0 },
  };
};

async function entry(args: string[], extra: { runHood?: (t: HoodTask) => HoodRecord; gateRunner?: (t: Task) => SeedRecord } = {}): Promise<{ code: number; lines: string; report: FusionStatisticsReport | undefined }> {
  const spy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  let report: FusionStatisticsReport | undefined;
  try {
    const code = await run(args, { out: tmp, platRoot: MEM_ROOT, runSeed: plantedSeed, runHood: plantedHood, onReport: (r) => (report = r), ...extra });
    return { code, lines: spy.mock.calls.map((c) => String(c[0])).join(''), report };
  } finally {
    spy.mockRestore();
  }
}

describe('bench -- fusion-ng: its arguments', () => {
  it('takes a phase; the rest defaulted to the run sizes (phase a 20 fixture seeds, phase b 5 derivation seeds per hood, the gate re-run 5)', () => {
    const a = parseArgs(['--phase', 'a'], {});
    expect(a).toEqual({ phase: 'a', baselines: 'packages/testkit/baselines/baselines.json', faces: 'packages/testkit/baselines/ng-faces.json', from: 1, seeds: 20, seed: 1, size: { frameHa: null, walledHa: null }, cells: undefined, recalibrate: undefined, missFrom: undefined, apply: false, gateRerun: false, gateSeeds: 5, workers: 1, summary: false });
    expect(DEFAULT_SIZES).toEqual({ from: 1, seedsA: 20, seedsB: 5, seed: 1, gateSeeds: 5 });
    const b = parseArgs(['--phase', 'b', '--seeds', '2', '--seed', '9', '--from', '4', '--gate-rerun', '--gate-seeds', '3', '--recalibrate', 'r.json', '--miss-from', 's.json', '--apply', '--workers', '3', ...SIZE_ARGS], {});
    expect(typeof b !== 'string' && [b.phase, b.seeds, b.seed, b.from, b.gateRerun, b.gateSeeds, b.recalibrate, b.missFrom, b.apply, b.workers, b.size]).toEqual(['b', 2, 9, 4, true, 3, 'r.json', 's.json', true, 3, { frameHa: 900, walledHa: 30 }]);
    expect(parseArgs(['--phase', 'b'], { PLAT_BENCH_WORKERS: '4' })).toMatchObject({ workers: 4, seeds: 5 });
  });

  it('refuses a run without a phase, an unknown or repeated argument, a phase\'s flag in the other phase, a half test size, --apply without its file, --summary at a test size (exit 64, nothing run)', async () => {
    const bad = [
      [],
      ['--phase', 'c'],
      ['--phase', 'a', '--nope'],
      ['--phase', 'a', '--seeds', '1', '--seeds', '2'],
      ['--phase', 'a', '--faces', 'x.json'],
      ['--phase', 'a', '--gate-rerun'],
      ['--phase', 'a', '--recalibrate', 'x.json'],
      ['--phase', 'b', '--cells', 'x.json'],
      ['--phase', 'a', '--frame-ha', '900'],
      ['--phase', 'a', '--seeds', '0'],
      ['--phase', 'a', '--seeds', 'x'],
      ['--phase', 'a', '--workers', '0'],
      ['--phase', 'a', '--apply'],
      ['--phase', 'b', '--apply'],
      ['--phase', 'b', '--miss-from', 's.json'],
      ['--phase', 'b', '--gate-seeds', '2'],
      ['--phase', 'a', '--summary', ...SIZE_ARGS],
      ['--phase', 'a', '--summary', '--summary'],
      ['--phase', 'a', '--seeds'],
    ];
    for (const args of bad) expect(typeof parseArgs(args, {}), args.join(' ')).toBe('string');
    expect(typeof parseArgs(['--phase', 'a'], { PLAT_BENCH_WORKERS: 'many' })).toBe('string');
    seedsRun = [];
    const r = await entry(['--phase', 'a', '--bogus']);
    expect(r.code).toBe(64);
    expect(r.lines).toMatch(/^fusion-ng: unknown argument "--bogus"; usage: corepack pnpm bench -- fusion-ng --phase a\|b/);
    expect(seedsRun).toEqual([]);
  });
});

describe('bench -- fusion-ng: both phases dispatch', () => {
  it('the dispatcher names this folder and this item; its index exports run', async () => {
    const bench = (await import(pathToFileURL(join(PLAT_ROOT, 'scripts', 'bench.mjs')).href)) as { resolveHarness: (n: string, env: object) => { ok: boolean; item: string; index: string } };
    const h = bench.resolveHarness('fusion-ng', {});
    expect([h.ok, h.item]).toEqual([true, 'M0-c-07']);
    expect(h.index).toBe(join(PLAT_ROOT, 'bench', 'src', 'fusion-ng', 'index.ts'));
    expect(typeof run).toBe('function');
  });

  it('phase a runs the fixture seeds from --from through M0-c-06\'s entry; phase b every hood at every derivation seed; an earlier report is removed first; no summary without --summary', async () => {
    resetMem(mem);
    put(mem, 'packages/testkit/baselines/baselines.json', baselinesText([row('junction.share4', 'all', 'NG', scalar(0.05))]));
    put(mem, 'packages/testkit/baselines/ng-faces.json', ngFacesText(ngFile(twoHoods())));
    seedsRun = [];
    const a = await entry(['--phase', 'a', '--from', '4', '--seeds', '3']);
    expect(a.code).toBe(1);
    expect(seedsRun).toEqual([4, 5, 6]);
    expect(a.report?.phase).toBe('a');
    expect(a.report?.sizes).toEqual({ from: 4, seeds: 3, size: { frameHa: null, walledHa: null } });
    expect(existsSync(join(tmp, 'fusion-ng', 'report-a.json'))).toBe(true);
    hoodsRun = [];
    const b = await entry(['--phase', 'b', '--seeds', '2']);
    expect(b.report?.phase).toBe('b');
    expect(hoodsRun).toEqual(['1/0', '2/0', '1/1', '2/1']);
    expect(JSON.parse(readFileSync(join(tmp, 'fusion-ng', 'report-b.json'), 'utf8')).phase).toBe('b');
    expect(got(mem, SUMMARY_FILES.a)).toBeUndefined();
    expect(got(mem, SUMMARY_FILES.b)).toBeUndefined();
    // a run that stops leaves no earlier report standing beside its exit code
    const stop = await entry(['--phase', 'b', '--seeds', '2', '--faces', 'none.json']);
    expect(stop.code).toBe(2);
    expect(existsSync(join(tmp, 'fusion-ng', 'report-b.json'))).toBe(false);
    expect(existsSync(join(tmp, 'fusion-ng', 'report-a.json'))).toBe(true);
  });

  it('--summary writes phase b\'s numbers-only summary with its reviewed block (baselines.json and ng-faces.json by sha256) and our side', async () => {
    resetMem(mem);
    put(mem, 'packages/testkit/baselines/baselines.json', baselinesText([row('junction.share4', 'all', 'NG', scalar(0.05))]));
    put(mem, 'packages/testkit/baselines/ng-faces.json', ngFacesText(ngFile(twoHoods())));
    const b = await entry(['--phase', 'b', '--seeds', '1', '--summary']);
    const r = b.report as FusionStatisticsReport;
    const s = JSON.parse(got(mem, SUMMARY_FILES.b) as string) as Record<string, unknown>;
    expect([s['item'], s['harness'], s['phase'], s['pass']]).toEqual(['M0-c-07b', 'M0-c-07', 'b', r.pass]);
    expect(s['reviewed']).toEqual({ 'packages/testkit/baselines/baselines.json': r.inputs.baselines.sha256, 'packages/testkit/baselines/ng-faces.json': r.inputs.ngFaces?.sha256 });
    expect(s['parityOurs']).toEqual(r.parityOurs);
    expect(s['failing']).toEqual(r.failing);
    expect(b.lines).toContain(`fusion-ng: summary ${SUMMARY_FILES.b}`);
  });
});

describe('bench -- fusion-ng --phase b --gate-rerun: the statistics fallback\'s gate re-run through M0-c-06\'s entry is the gating `gate` clause (§4.4, C-0440 (7))', () => {
  /** One `area` hood, rows its planted record meets (block.area/all and template-area hold; the junction row descriptive): the statistics hold. */
  function holdingInputs(): void {
    resetMem(mem);
    put(mem, 'packages/testkit/baselines/ng-faces.json', ngFacesText(ngFile([twoHoods()[0]])));
    put(mem, 'packages/testkit/baselines/baselines.json', baselinesText([
      row('block.area', 'all', 'NG', { bins: [50, 500, 5_000], histogram: [0, 0, 10, 0], n: 10, seeds: 10 }, { spreadKS: { p90: 0.9, pairs: 45 } }),
      row('block.area', 'template-area', 'NG', { bins: [50, 500, 5_000], histogram: [0, 0, 10, 0], n: 10, seeds: 10 }, { spreadKS: { p90: 0.9, pairs: 45 } }),
      row('junction.share4', 'all', 'NG', { n: 0, seeds: 0 }, { role: 'descriptive', sample: { family: 'test/plain', indices: [0, 1], failed: [{ index: 0, reason: 'not measured' }] } }),
    ]));
  }
  /** The planted hood with one kernel downgrade: a hood-run census class beside the re-run's (merged, never replaced). */
  const downgraded = (t: HoodTask): HoodRecord => ({ ...plantedHood(t), census: { s8: 0, kernelDowngrades: 1, kernelWorkLimitHits: 0, unplaced: 0, degraded: 0, bugs: 0 } });
  const B = ['--phase', 'b', '--seeds', '1', '--gate-rerun', '--gate-seeds', '2', ...SIZE_ARGS];
  const HOODS = 'phase b: the hood runs (S1 + S8 on an outline)';
  const FUSION = 'gate re-run: the fusion run (M0-c-06\'s census)';
  const INTEGRATED = 'gate re-run: the integrated run (M0-c-06\'s census)';

  it('without --gate-rerun there is no gate clause: the statistics alone decide (exit 0 here)', async () => {
    holdingInputs();
    const r = await entry(['--phase', 'b', '--seeds', '1', ...SIZE_ARGS], { runHood: downgraded });
    expect(r.code).toBe(0);
    expect(r.report?.failing).toEqual([]);
    expect(r.report?.clauses.some((c) => c.id === 'gate')).toBe(false);
    expect(r.report?.gate).toBeUndefined();
    expect(r.report?.census).toMatchObject({ total: 1, classes: [{ source: HOODS, code: 'kernelDowngrades', count: 1 }] });
  });

  it('a passing re-run: a gating `gate` clause with verdict pass and exit 0 when the statistics hold; the re-run\'s census merged into the report\'s', { timeout: 120_000 }, async () => {
    holdingInputs();
    const seen: string[] = [];
    const r = await entry(B, {
      runHood: downgraded,
      gateRunner: (t) => {
        seen.push(`${t.run}/${String(t.seed)}`);
        return goodRecord(t.seed, t.run);
      },
    });
    const rep = r.report as FusionStatisticsReport;
    expect(new Set(seen)).toEqual(new Set(['fusion/1', 'fusion/2', 'integrated/1', 'integrated/2']));
    expect(seen.length).toBe(4);
    const gate = rep.clauses.filter((c) => c.id === 'gate');
    expect(gate.map((c) => [c.metric, c.key, c.verdict, c.gating])).toEqual([['gate', 'all', 'pass', true]]);
    expect(gate[0].note).toMatch(/^M0-c-06's gate re-run \(bench -- fusion --from 1 --seeds 2 --workers 1 --frame-ha 900 --walled-ha 30\): exit 0, bars HOLD /);
    expect(rep.gate?.entry).toBe('bench -- fusion');
    expect(rep.gate?.args).toEqual(['--from', '1', '--seeds', '2', '--workers', '1', ...SIZE_ARGS]);
    expect([rep.gate?.exit, rep.gate?.report.pass, rep.gate?.report.item]).toEqual([0, true, 'M0-c-06']);
    expect(rep.sizes).toMatchObject({ gateSeeds: 2 });
    expect(rep.failing).toEqual([]);
    expect(rep.pass).toBe(true);
    expect(r.code).toBe(0);
    // the census: the hood runs' class and the re-run's (M0-c-06's planted record: one roof and one spine downgrade per seed of each run)
    expect(rep.census.classes.map((c) => [c.source, c.code, c.count, c.seeds])).toEqual([
      [FUSION, 'corpusRoof', 2, [1, 2]],
      [FUSION, 'corpusSpine', 2, [1, 2]],
      [INTEGRATED, 'corpusRoof', 2, [1, 2]],
      [INTEGRATED, 'corpusSpine', 2, [1, 2]],
      [HOODS, 'kernelDowngrades', 1, [1]],
    ]);
    expect(rep.census.total).toBe(9);
  });

  it('a re-run failing a bar (strips): `gate` fails, `failing` names it alone, exit 1; the re-run\'s planted refusals are classes of the report\'s census', { timeout: 120_000 }, async () => {
    holdingInputs();
    const refusals = { s8: 2, s9: 0, kerbReads: 1, corpusRoof: 0, corpusSpine: 0, kernelDowngrades: 0, kernelWorkLimitHits: 0, unplaced: 0, degraded: 0 };
    const r = await entry(B, { runHood: downgraded, gateRunner: (t) => goodRecord(t.seed, t.run, t.run === 'integrated' ? { refusals, strips: { faces: 1, lanes: 1, crossings: 1 } } : {}) });
    const rep = r.report as FusionStatisticsReport;
    const gate = rep.clauses.filter((c) => c.id === 'gate');
    expect(gate.map((c) => [c.verdict, c.gating])).toEqual([['fail', true]]);
    expect(gate[0].note).toMatch(/: exit 1, bars FAIL /);
    expect([rep.gate?.exit, rep.gate?.report.pass, rep.gate?.report.verdicts.strips]).toEqual([1, false, false]);
    expect(rep.failing).toEqual(['gate']);
    expect(rep.pass).toBe(false);
    expect(r.code).toBe(1);
    expect(r.lines).toContain('fusion-ng: failing: gate;');
    expect(rep.census.classes.map((c) => [c.source, c.code, c.inputKind, c.verdict, c.count, c.seeds])).toEqual([
      [FUSION, 'corpusRoof', 'OUR OWN INTERMEDIATE', 'MAKE-IT-SUCCEED', 2, [1, 2]],
      [FUSION, 'corpusSpine', 'OUR OWN INTERMEDIATE', 'MAKE-IT-SUCCEED', 2, [1, 2]],
      [INTEGRATED, 'kerbReads', 'OUR OWN INTERMEDIATE', 'MAKE-IT-SUCCEED', 2, [1, 2]],
      [INTEGRATED, 's8', 'OUR OWN INTERMEDIATE', 'MAKE-IT-SUCCEED', 4, [1, 2]],
      [HOODS, 'kernelDowngrades', 'LAWFUL', 'MAKE-IT-SUCCEED', 1, [1]],
    ]);
    expect(rep.census.total).toBe(11);
    expect(r.lines).toMatch(/fusion-ng: refusals 11: /);
  });
});
