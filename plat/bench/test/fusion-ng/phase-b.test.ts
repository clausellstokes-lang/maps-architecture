// Phase b on synthetic hood outlines (M0-c-07; §16 M0 (c): "block-area and junction-degree distributions inside the NG
// bands on the same district shapes"; C-0101, C-0116, C-0117). The listed test: "phase b reads the outlines through
// loadNgFaces and stops on a refused record or a missing file naming it; S8 runs on synthetic hood outlines and the
// report carries the block-area and junction-degree distributions"; and "the report reproduces byte for byte (seeded)".
// The files are synthetic and in memory; the hood runs are real (S1 + S8 through the base registration, seconds each).
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { parseTable } from '@plat/tables';
import { junctionDegreeHistogram, streetGraph } from '@plat/testkit';
import type { RawTable } from '../../src/bentcut-ng/index.js';
import { hoodDocs, HOOD_SPACING_CM, hoodSeed, placedOutline, readConstants, recalibrate, run, runHood, type FusionStatisticsReport, type HoodRecord, type HoodTask } from '../../src/fusion-ng/index.js';
import { areaHistogram, baselinesText, cellsText, closed, hood, MEM_ROOT, ngFacesText, ngFile, put, resetMem, row, scalar, SIZE_ARGS, TABLE_TEXT, TEST_SIZE, twoHoods } from './support.js';

const mem = vi.hoisted(() => ({ root: '', files: new Map<string, Uint8Array>(), log: [] as { op: string; path: string; virtual: boolean }[] }));
vi.mock('node:fs', async (orig) => (await import('../bentcut-ng/memfs.js')).memFs(await orig<typeof import('node:fs')>(), mem));

const tmp = mkdtempSync(join(tmpdir(), 'fusion-ng-b-'));
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

/** The real hood runner, each task run once (the tests below share its records). */
const cache = new Map<string, HoodRecord>();
function cached(t: HoodTask): HoodRecord {
  const k = JSON.stringify([t.hood.id, t.hood.outlineCm.length, t.seed, t.seedIndex, t.size, t.cut === undefined ? null : t.cut.version]);
  let r = cache.get(k);
  if (r === undefined) {
    r = runHood(t);
    cache.set(k, r);
  }
  return r;
}

async function entry(args: string[], runHoodFn: (t: HoodTask) => HoodRecord = cached): Promise<{ code: number; lines: string; report: FusionStatisticsReport | undefined }> {
  const spy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  let report: FusionStatisticsReport | undefined;
  try {
    const code = await run(args, { out: tmp, platRoot: MEM_ROOT, runHood: runHoodFn, onReport: (r) => (report = r) });
    return { code, lines: spy.mock.calls.map((c) => String(c[0])).join(''), report };
  } finally {
    spy.mockRestore();
  }
}

const B = ['--phase', 'b', '--seeds', '1', ...SIZE_ARGS];

/** Rows of the blocks and junction rows, wide enough for the synthetic hoods. */
function rows(): string {
  const areas = Array.from({ length: 200 }, (_, i) => 300 + 15 * i);
  return baselinesText([
    row('block.area', 'all', 'NG', areaHistogram(areas), { spreadKS: { p90: 0.4, pairs: 190 } }),
    row('block.area', 'template-area', 'NG', areaHistogram(areas), { spreadKS: { p90: 0.8, pairs: 190 } }),
    row('block.area', 'template-street', 'NG', areaHistogram(areas), { spreadKS: { p90: 0.8, pairs: 190 } }),
    row('junction.share4', 'all', 'NG', scalar(0.05, 0.01, 0.12)),
  ]);
}

describe('phase b: the loader\'s refusals stop the run naming the file and the record (exit 2, C-0101)', () => {
  it('a missing ng-faces.json, a missing baselines.json, a refused face record, a refused hood, a row lacking provenance', async () => {
    resetMem(mem);
    put(mem, 'packages/testkit/baselines/baselines.json', rows());
    let ran = 0;
    const never = (t: HoodTask): HoodRecord => {
      ran += 1;
      return cached(t);
    };
    const missing = await entry(B, never);
    expect(missing.code).toBe(2);
    expect(missing.lines).toMatch(/fusion-ng stopped: packages\/testkit\/baselines\/ng-faces\.json: missing file/);
    const f = ngFile(twoHoods());
    const noBuild = { ...f, faces: f.faces.map((x, i) => (i === 1 ? (({ referenceBuild: _drop, ...rest }) => rest)(x) : x)) };
    put(mem, 'faces-a.json', ngFacesText(noBuild as never));
    const a = await entry([...B, '--faces', 'faces-a.json'], never);
    expect(a.code).toBe(2);
    expect(a.lines).toMatch(/fusion-ng stopped: .*faces-a\.json: faces\[1\] \(id 2\): referenceBuild missing/);
    const badHood = { ...f, hoods: f.hoods.map((h, i) => (i === 0 ? { ...h, outlineCm: [...h.outlineCm].reverse() } : h)) };
    put(mem, 'faces-b.json', ngFacesText(badHood));
    const b = await entry([...B, '--faces', 'faces-b.json'], never);
    expect(b.code).toBe(2);
    expect(b.lines).toMatch(/fusion-ng stopped: .*faces-b\.json: hoods\[0\] \(id 1\): outlineCm clockwise/);
    put(mem, 'faces.json', ngFacesText(f));
    const noBase = await entry([...B, '--faces', 'faces.json', '--baselines', 'none.json'], never);
    expect(noBase.code).toBe(2);
    expect(noBase.lines).toMatch(/fusion-ng stopped: none\.json: missing file/);
    const r = JSON.parse(rows()) as Record<string, unknown>[];
    delete r[0]['capture'];
    put(mem, 'b-bad.json', JSON.stringify(r));
    const prov = await entry([...B, '--faces', 'faces.json', '--baselines', 'b-bad.json'], never);
    expect(prov.code).toBe(2);
    expect(prov.lines).toMatch(/fusion-ng stopped: b-bad\.json: row "test\/ng\/block\.area\/all": unreadable row: lacks capture \(T-RIG-1\)/);
    expect(ran).toBe(0);
    expect(mem.log.some((e) => e.op === 'write' && e.path.endsWith('report-b.json'))).toBe(false);
  });
});

describe('phase b: S8 on synthetic hood outlines', () => {
  it('each hood runs as one district through S1 + S8: its blocks, its lanes, the outline as the arena holds it with every lane junction on it', { timeout: 300_000 }, () => {
    const [h1, h2] = twoHoods();
    const size = { frameHa: TEST_SIZE.frameHa, walledHa: TEST_SIZE.walledHa };
    for (const h of [h1, h2]) {
      const r = cached({ hood: h, seed: 1, seedIndex: 0, size });
      expect([r.setup, r.refused], String(h.id)).toEqual([null, null]);
      expect(r.seed).toBe(hoodSeed(1, h.id, 0));
      expect(r.blocks.length, String(h.id)).toBeGreaterThan(3);
      expect(r.lanes.length, String(h.id)).toBeGreaterThan(0);
      expect(r.outline[0]).toEqual(r.outline[r.outline.length - 1]);
      // every lane end that lies on the outline is a vertex of it (a shared vertex: the junction is counted)
      const onOutline = new Set(r.outline.map((p) => `${String(p.x)},${String(p.y)}`));
      const ends = r.lanes.flatMap((l) => [l[0], l[l.length - 1]]);
      expect(ends.some((p) => onOutline.has(`${String(p.x)},${String(p.y)}`))).toBe(true);
      expect(r.census).toEqual({ s8: 0, kernelDowngrades: 0, kernelWorkLimitHits: 0, unplaced: 0, degraded: 0, bugs: 0 });
    }
    // the outline is moved to the frame's centre, its shape kept (a translation by whole centimetres)
    const placed = placedOutline(h1, 150_000);
    expect(typeof placed).not.toBe('string');
    if (typeof placed === 'string') return;
    const dx = placed[0].x - h1.outlineCm[0][0];
    const dy = placed[0].y - h1.outlineCm[0][1];
    expect(placed.map((p) => [p.x - dx, p.y - dy])).toEqual(h1.outlineCm.slice(0, -1));
  });

  it('a recalibrated cut table reaches S8 in the real hood stage (S8Input.tables.cut, C-0442 (6)): the shipped table given explicitly changes nothing, settings.flattenM 30 changes the hood\'s lanes and blocks', { timeout: 300_000 }, () => {
    const [h1] = twoHoods();
    const size = { frameHa: TEST_SIZE.frameHa, walledHa: TEST_SIZE.walledHa };
    const shippedRaw = JSON.parse(TABLE_TEXT('cut')) as RawTable;
    // the table the in-memory re-judgement hands the hood runs: recalibrate's cut write, read through M0-s-02's loader
    const recal = recalibrate(readConstants(cellsText('M-1 2026-10-27', { cut: [{ row: 'settings', cell: 'flattenM', value: 30 }] }), 'recal.json'), ['block.area/all'], { cut: shippedRaw, bands: JSON.parse(TABLE_TEXT('bands')) as RawTable }, 'proposed');
    const cut30 = parseTable('cut', JSON.parse(recal.writes[0].text) as Parameters<typeof parseTable>[1]);
    expect([cut30.version, cut30.num('settings', 'flattenM')]).toEqual([2, 30]);
    const base = cached({ hood: h1, seed: 1, seedIndex: 0, size });
    const shipped = runHood({ hood: h1, seed: 1, seedIndex: 0, size, cut: parseTable('cut', shippedRaw as Parameters<typeof parseTable>[1]) });
    const flat = runHood({ hood: h1, seed: 1, seedIndex: 0, size, cut: cut30 });
    for (const r of [base, shipped, flat]) expect([r.setup, r.refused]).toEqual([null, null]);
    // the table, not its presence, is what S8 reads: the shipped one passed in gives the same record
    expect(shipped).toEqual(base);
    // a coarser flattening threshold gives another subdivision of the same outline
    expect(flat.seed).toBe(base.seed);
    expect(flat.blocks.length).toBeGreaterThan(0);
    expect(flat.blocks.length).not.toBe(base.blocks.length);
    expect(flat.lanes).not.toEqual(base.lanes);
  });

  it('the report carries the block-area and junction-degree distributions, judged by the band rule; NG\'s own areas beside; nothing refused', { timeout: 300_000 }, async () => {
    resetMem(mem);
    put(mem, 'packages/testkit/baselines/baselines.json', rows());
    put(mem, 'packages/testkit/baselines/ng-faces.json', ngFacesText(ngFile(twoHoods())));
    const a = await entry(B);
    const r = a.report as FusionStatisticsReport;
    expect(r.phase).toBe('b');
    const area = r.parityOurs.entries.find((e) => e.metric === 'block.area' && e.key === 'all');
    expect(area?.samples?.length).toBe(1);
    let blocks = 0;
    for (const k of cache.values()) blocks += k.blocks.length;
    expect(area?.samples?.[0].length).toBe(blocks);
    expect(r.parityOurs.entries.filter((e) => e.metric === 'block.area').map((e) => e.key)).toEqual(['all', 'template-area', 'template-street']);
    const s4 = r.parityOurs.entries.find((e) => e.metric === 'junction.share4');
    expect(s4?.perSeed?.length).toBe(1);
    // the junction-degree share is the 4-way share of the doc's L1 junctions (degree ≥ 3) — M0-k-05's own measure
    const docs = hoodDocs([...cache.values()], 1);
    const h = junctionDegreeHistogram(streetGraph(docs[0]));
    let n3 = 0;
    for (let d = 3; d < h.length; d += 1) n3 += h[d];
    expect(n3).toBeGreaterThan(0);
    expect(s4?.perSeed?.[0]).toBeCloseTo((h[4] ?? 0) / n3, 12);
    expect(r.clauses.filter((c) => c.gating).map((c) => c.id)).toEqual(['run', 'block.area/all', 'block.area/template-area', 'block.area/template-street', 'junction.share4/all']);
    for (const c of r.clauses.filter((x) => x.metric === 'block.area')) expect(c.band.ksMax, c.id).toBeGreaterThan(0);
    expect(r.clauses.find((c) => c.id === 'run')?.verdict).toBe('pass');
    expect((r.beside['ngBlockAreasM2'] as Record<string, { n: number }>)['all'].n).toBe(6);
    expect(r.census.total).toBe(0);
    expect(r.inputs.ngFaces).toMatchObject({ path: 'packages/testkit/baselines/ng-faces.json', referenceBuild: 'NG-1.2.2', hoods: 2, faces: 2 });
    // byte for byte (seeded): the same files and seeds give the same report
    const first = readFileSync(join(tmp, 'fusion-ng', 'report-b.json'));
    expect((await entry(B)).code).toBe(a.code);
    expect(Buffer.compare(readFileSync(join(tmp, 'fusion-ng', 'report-b.json')), first)).toBe(0);
  });

  it('a hood larger than the frame is not run: the run clause fails and the census names it (lawful input, a finding)', { timeout: 300_000 }, async () => {
    resetMem(mem);
    put(mem, 'packages/testkit/baselines/baselines.json', rows());
    const big = hood(9, 'square', closed([[0, 0], [400_000, 0], [400_000, 300_000], [0, 300_000]]));
    put(mem, 'packages/testkit/baselines/ng-faces.json', ngFacesText(ngFile([twoHoods()[1], big])));
    const a = await entry(B);
    expect(a.code).toBe(1);
    const r = a.report as FusionStatisticsReport;
    expect(r.failing[0]).toBe('run');
    expect(r.clauses[0].note).toMatch(/^2 hood runs: 1 not placed, 0 refused/);
    expect(r.census.total).toBe(1);
    expect(r.census.classes[0]).toMatchObject({ code: 'setup', inputKind: 'LAWFUL', verdict: 'MAKE-IT-SUCCEED', count: 1 });
  });

  it('the seed docs keep each hood apart (a whole x step per hood), and a refused run measures nothing', () => {
    const rec = (hoodId: number, seedIndex: number, refused: string | null): HoodRecord => ({
      hood: hoodId,
      template: 'area',
      seedIndex,
      seed: 7,
      setup: null,
      refused,
      outline: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 0 }],
      lanes: [],
      blocks: [{ ring: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }], content: 'ordinary', depthClass: 'standard', interior: 'none' }],
      warnings: {},
      census: { s8: 0, kernelDowngrades: 0, kernelWorkLimitHits: 0, unplaced: 0, degraded: 0, bugs: 0 },
    });
    const docs = hoodDocs([rec(5, 0, null), rec(3, 0, null), rec(5, 1, 'E_X'), rec(3, 1, null)], 2);
    expect(docs.length).toBe(2);
    expect(docs[0].districts?.map((d) => [d.id, d.ring[1].x])).toEqual([['hood-5', 100 + HOOD_SPACING_CM], ['hood-3', 100]]);
    expect(docs[1].blocks?.map((b) => b.district)).toEqual(['hood-3']);
  });
});
