// Phase a on M0-c-06's fixture (M0-c-07; §16 M0 (c), §13.5; C-0072, C-0094, C-0116, C-0117, C-0121): seed 1 of the
// integrated run at the test size, derived once by M0-c-06's `derive` and read both by M0-c-06's `measure` (its report
// shape, its junction verdict) and as M0-k-05's MetricDoc; then the entry over a synthetic baselines.json in memory.
// The listed tests: "the report reproduces byte for byte (seeded)"; the checker's lines: every test input is synthetic
// or M0-c-06's fixture (no path outside plat/), and the parity CLI compares the statistics (C-0117: "the fusion
// harness's statistics fed to the parity CLI") — the run item's summary carries our side, which `runParity` re-reads.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { metricById, runParity, type MetricDoc } from '@plat/testkit';
import { BAND_IDS } from '@plat/tables';
import type { SeedRecord } from '../../src/fusion/index.js';
import { courtBeside, PLAT_ROOT, run, seedRun, SUMMARY_FILES, type FusionStatisticsReport, type RunSize } from '../../src/fusion-ng/index.js';
import { baselinesText, got, MEM_ROOT, put, resetMem, row, scalar, SIZE_ARGS, TEST_SIZE } from './support.js';

const mem = vi.hoisted(() => ({ root: '', files: new Map<string, Uint8Array>(), log: [] as { op: string; path: string; virtual: boolean }[] }));
vi.mock('node:fs', async (orig) => (await import('../bentcut-ng/memfs.js')).memFs(await orig<typeof import('node:fs')>(), mem));

const tmp = mkdtempSync(join(tmpdir(), 'fusion-ng-a-'));
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

/** Seed 1 at the test size, derived once (≈ 40 s) and shared by the tests below. */
const cache = new Map<number, { record: SeedRecord; doc: MetricDoc }>();
function cached(seed: number, size: RunSize): { record: SeedRecord; doc: MetricDoc } {
  let r = cache.get(seed);
  if (r === undefined) {
    expect(size).toEqual({ frameHa: TEST_SIZE.frameHa, walledHa: TEST_SIZE.walledHa });
    r = seedRun(seed, size);
    cache.set(seed, r);
  }
  return r;
}
/** The planted runner for a CITY-sized entry run (--summary): the test size's record stands in. */
const atTestSize = (seed: number): { record: SeedRecord; doc: MetricDoc } => cached(seed, { frameHa: TEST_SIZE.frameHa, walledHa: TEST_SIZE.walledHa });

function measured(doc: MetricDoc, id: string, key = 'all'): number {
  const v = metricById(id)?.measure(doc);
  if (v === undefined || 'notApplicable' in v) throw new Error(`${id}: not measured`);
  return v.values.get(key) as number;
}

async function entry(args: string[], runSeed = cached): Promise<{ code: number; lines: string; report: FusionStatisticsReport | undefined }> {
  const spy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  let report: FusionStatisticsReport | undefined;
  try {
    const code = await run(args, { out: tmp, platRoot: MEM_ROOT, runSeed, onReport: (r) => (report = r) });
    return { code, lines: spy.mock.calls.map((c) => String(c[0])).join(''), report };
  } finally {
    spy.mockRestore();
  }
}

describe('phase a on the fixture (seed 1, the test size)', () => {
  it('the seed\'s doc: every working block of S8 with its district, band, depth class and interior; the wall; the junction row equal to M0-c-06\'s measure', { timeout: 300_000 }, () => {
    const { record, doc } = cached(1, { frameHa: TEST_SIZE.frameHa, walledHa: TEST_SIZE.walledHa });
    expect(record.run).toBe('integrated');
    expect(record.seed).toBe(1);
    const blocks = doc.blocks ?? [];
    expect(blocks.length).toBe(record.faces.blocks);
    expect(blocks.length).toBeGreaterThan(20);
    for (const b of blocks) {
      expect(b.district, b.id).toMatch(/^district:/);
      expect(BAND_IDS as readonly string[], b.id).toContain(b.band);
      expect(['deep', 'standard'], b.id).toContain(b.depthClass);
      expect(b.ring.length, b.id).toBeGreaterThanOrEqual(3);
    }
    expect(blocks.some((b) => b.depthClass === 'deep' && b.interior === 'court')).toBe(true);
    expect((doc.wall ?? []).length).toBeGreaterThanOrEqual(3);
    // one metric function and one metricVersion with M0-c-06 (C-0122's rule): the junction row it judged is ours
    expect(measured(doc, 'junction.angles', 'all/p5')).toBe(record.junction.p5);
    expect(measured(doc, 'junction.angles', 'all/median')).toBe(record.junction.median);
    expect(measured(doc, 'junction.share4')).toBe(record.junction.share4);
    // the per-band court share beside the row reads the deep blocks of each band and the band row's court cell
    const beside = courtBeside([doc]);
    for (const [band, v] of Object.entries(beside)) {
      const deep = blocks.filter((b) => b.band === band && b.depthClass === 'deep');
      expect(v.ours, band).toBeCloseTo(deep.filter((b) => b.interior === 'court').length / deep.length, 12);
    }
    expect(beside['modest']?.target ?? 0.45).toBe(0.45);
  });

  it('through the entry: the junction row judged against the planted band, M0-c-06\'s verdict beside it, nothing refused; the report reproduces byte for byte', { timeout: 300_000 }, async () => {
    resetMem(mem);
    const { doc } = cached(1, { frameHa: TEST_SIZE.frameHa, walledHa: TEST_SIZE.walledHa });
    const share4 = measured(doc, 'junction.share4');
    put(mem, 'b.json', baselinesText([
      row('junction.angles', 'all/median', 'NG', scalar(measured(doc, 'junction.angles', 'all/median'))),
      row('junction.angles', 'all/p5', 'NG', scalar(measured(doc, 'junction.angles', 'all/p5'))),
      row('junction.share4', 'all', 'NG', scalar(share4)),
      row('sgd.tShare', 'all', 'MFCG', scalar(measured(doc, 'sgd.tShare'))),
    ]));
    const a = await entry(['--phase', 'a', '--baselines', 'b.json', '--seeds', '1', ...SIZE_ARGS]);
    expect(a.code).toBe(1);
    const r = a.report as FusionStatisticsReport;
    expect(r.item).toBe('M0-c-07');
    expect(r.phase).toBe('a');
    expect(r.clauses.filter((c) => c.gating && c.verdict === 'pass').map((c) => c.id)).toEqual(['junction.angles/all/median', 'junction.angles/all/p5', 'junction.share4/all', 'sgd.tShare/all']);
    expect(r.failing).toEqual(['sgd.deadEnds/all', 'blockc.perHa/all', 'block.courtShare/all@NG']);
    expect(r.shift?.m0c06).toBe(true);
    expect(r.shift?.direction).toBe('none');
    expect((r.beside['m0c06'] as { pass: boolean }).pass).toBe(true);
    expect(r.census).toEqual({ classes: [], total: 0 });
    expect(r.inputs.baselines.path).toBe('b.json');
    expect(r.sizes).toEqual({ from: 1, seeds: 1, size: { frameHa: 900, walledHa: 30 } });
    expect(a.lines).toMatch(/fusion-ng: junction row: M0-c-06 pass, the band rule pass; shift none/);
    const first = readFileSync(join(tmp, 'fusion-ng', 'report-a.json'));
    const b = await entry(['--phase', 'a', '--baselines', 'b.json', '--seeds', '1', ...SIZE_ARGS]);
    expect(b.code).toBe(1);
    expect(Buffer.compare(readFileSync(join(tmp, 'fusion-ng', 'report-a.json')), first)).toBe(0);
    // nothing but the memory's files read (the test's own reads of the output folder aside); nothing written into the real plat/
    for (const e of mem.log) if (e.op === 'read' && !e.path.startsWith(tmp)) expect(e.virtual, e.path).toBe(true);
    for (const e of mem.log) if (e.op === 'write' && !e.virtual) expect(e.path.startsWith(PLAT_ROOT), e.path).toBe(false);
  });

  it('--summary writes the run item\'s numbers-only summary with its reviewed block; the parity CLI re-reads it as our side and gives the report\'s rows', { timeout: 300_000 }, async () => {
    resetMem(mem);
    const { doc } = atTestSize(1);
    put(mem, 'packages/testkit/baselines/baselines.json', baselinesText([row('junction.share4', 'all', 'NG', scalar(measured(doc, 'junction.share4') * 3))]));
    const a = await entry(['--phase', 'a', '--seeds', '1', '--summary'], (s) => atTestSize(s));
    expect(a.code).toBe(1);
    const r = a.report as FusionStatisticsReport;
    expect(r.shift?.declared).toBe(true);
    expect(r.notes[0]).toMatch(/^DECLARED SHIFT \(§13\.5, C-0094\): the junction row passes M0-c-06's thresholds and fails the recomputed band: junction\.share4\/all ours /);
    const text = got(mem, SUMMARY_FILES.a);
    expect(text).toBeDefined();
    const s = JSON.parse(text as string) as { item: string; harness: string; reviewed: Record<string, string>; pass: boolean; shift: { declared: boolean } };
    expect([s.item, s.harness, s.pass, s.shift.declared]).toEqual(['M0-c-07a', 'M0-c-07', false, true]);
    expect(s.reviewed).toEqual({ 'packages/testkit/baselines/baselines.json': r.inputs.baselines.sha256 });
    expect(got(mem, SUMMARY_FILES.b)).toBeUndefined();
    const p = runParity({ platRoot: MEM_ROOT, oursPath: join(MEM_ROOT, SUMMARY_FILES.a) });
    expect(p.code).toBe(1);
    expect(p.report?.rows).toEqual(r.parity.rows);
    expect(p.report?.summary).toEqual(r.parity.summary);
    expect(p.report?.runId).toBe(r.parity.runId);
  });
});
