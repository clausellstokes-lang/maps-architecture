// The table-cell writers (M0-c-07; C-0117; §4.6's deep-interior shares, §4.4's statistics fallback; §7.6, §17.1 (6)).
// The listed tests: "the applied interior shares carry provenance M-1 ⟨date⟩ and a version bump; the file round-trips
// through M0-s-02's loader" and "the recalibration, when taken, is a table change with provenance and a choices row (a
// test over the diff)". Every table written here is a SCRATCH copy — in memory, or in the output folder — never the
// committed tables under plat/packages/tables/data (other items' owns, the session note's (2)).
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { parseTable, TABLE_SOURCES } from '@plat/tables';
import type { MetricDoc } from '@plat/testkit';
import { CellWriteRefusal, type RawTable } from '../../src/bentcut-ng/index.js';
import type { SeedRecord } from '../../src/fusion/index.js';
import { interiorShares, NO_MISS, PLAT_ROOT, readConstants, recalibrate, run, type FusionStatisticsReport, type HoodRecord, type HoodTask } from '../../src/fusion-ng/index.js';
import { goodRecord } from '../fusion/support.js';
import { baselinesText, cellsText, changedLines, fittedCells, FITTED_SHARES, got, MEM_ROOT, ngFacesText, ngFile, put, resetMem, row, scalar, TABLE_TEXT, twoHoods } from './support.js';

const mem = vi.hoisted(() => ({ root: '', files: new Map<string, Uint8Array>(), log: [] as { op: string; path: string; virtual: boolean }[] }));
vi.mock('node:fs', async (orig) => (await import('../bentcut-ng/memfs.js')).memFs(await orig<typeof import('node:fs')>(), mem));

const tmp = mkdtempSync(join(tmpdir(), 'fusion-ng-t-'));
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

const sha = (p: string): string => createHash('sha256').update(readFileSync(p)).digest('hex');
const DATA = (id: string): string => join(PLAT_ROOT, 'packages', 'tables', 'data', `${id}.json`);
/** The committed tables' hashes before any test here runs (none of them is ever written). */
const committed = Object.fromEntries(['interior', 'cut', 'bands'].map((id) => [id, sha(DATA(id))]));

const raw = (id: string): RawTable => JSON.parse(TABLE_TEXT(id as 'cut')) as RawTable;

/** A planted seed of phase a (no derivation: the writer is under test, not the statistics). */
const plantedSeed = (seed: number): { record: SeedRecord; doc: MetricDoc } => ({ record: goodRecord(seed, 'integrated'), doc: { ways: [], blocks: [] } });

async function entry(args: string[], extra: { runHood?: (t: HoodTask) => HoodRecord } = {}): Promise<{ code: number; lines: string; report: FusionStatisticsReport | undefined }> {
  const spy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  let report: FusionStatisticsReport | undefined;
  try {
    const code = await run(args, { out: tmp, platRoot: MEM_ROOT, runSeed: plantedSeed, onReport: (r) => (report = r), ...extra });
    return { code, lines: spy.mock.calls.map((c) => String(c[0])).join(''), report };
  } finally {
    spy.mockRestore();
  }
}

describe('phase a: §4.6\'s fitted deep-interior shares as cells of interior.json', () => {
  it('the written table carries the shares with provenance M-1 ⟨date⟩ and a version bump, round-trips through M0-s-02\'s loader, and differs from the shipped one in those cells\' lines and the version line alone', () => {
    const w = interiorShares(raw('interior'), cellsText('M-1 2026-10-04', { interior: fittedCells() }), 'cells.json', 'proposed');
    expect([w.table.table, w.table.from, w.table.to, w.table.provenance, w.table.mode]).toEqual(['interior', 1, 2, 'M-1 2026-10-04', 'proposed']);
    expect(w.table.changes.length).toBe(16);
    const t = parseTable('interior', JSON.parse(w.text));
    expect(t.version).toBe(2);
    const names = ['shares.court', 'shares.backLane', 'shares.throughAlley', 'shares.rearPlots'];
    for (const [band, shares] of Object.entries(FITTED_SHARES)) {
      shares.forEach((v, i) => {
        expect(t.num(band, names[i]), `${band}.${names[i]}`).toBe(v);
        expect(t.cell(band, names[i]).provenance, `${band}.${names[i]}`).toBe('M-1 2026-10-04');
      });
    }
    // a cell the cells file does not name is unchanged, provenance and all
    expect(t.cell('modest', 'reach.open')).toEqual(parseTable('interior', TABLE_SOURCES.get('interior')).cell('modest', 'reach.open'));
    const lines = changedLines(TABLE_TEXT('interior'), w.text);
    const changed = lines.map((i) => w.text.split('\n')[i]);
    expect(changed.length).toBe(17);
    expect(changed[0]).toBe('  "version": 2,');
    for (const l of changed.slice(1)) expect(l).toMatch(/^ {6}"shares\.(court|backLane|throughAlley|rearPlots)": \{"value": [0-9.]+, "unit": "share", "provenance": "M-1 2026-10-04", "calibratable": true\},?$/);
  });

  it('refuses a cell that is not a share, a band row without its four shares, a row that does not sum to 1, a share outside [0, 1], a provenance of another form, a table phase a does not write — naming the file, the row and the cell', () => {
    const refusal = (tables: Record<string, { row: string; cell: string; value: unknown }[]>, provenance = 'M-1 2026-10-04'): string => {
      try {
        interiorShares(raw('interior'), cellsText(provenance, tables), 'cells.json', 'proposed');
      } catch (e) {
        expect(e).toBeInstanceOf(CellWriteRefusal);
        return (e as Error).message;
      }
      return 'written';
    };
    expect(refusal({ interior: [{ row: 'modest', cell: 'reach.open', value: 0.5 }] })).toMatch(/^cells\.json: table 'interior', row 'modest', cell 'reach\.open': not a deep-interior share/);
    expect(refusal({ interior: fittedCells({ modest: [0.457, 0.296, 0.148, 0.099] }).slice(0, 3) })).toMatch(/^cells\.json: table 'interior', row 'modest': shares\.rearPlots not given/);
    expect(refusal({ interior: fittedCells({ modest: [0.457, 0.296, 0.148, 0.2] }) })).toMatch(/^cells\.json: table 'interior', row 'modest': the shares sum to 1\.101, not 1/);
    expect(refusal({ interior: fittedCells({ modest: [1.2, -0.2, 0, 0] }) })).toMatch(/row 'modest', cell 'shares\.court': 1\.2 is not a share in \[0, 1\]/);
    expect(refusal({ interior: fittedCells() }, 'own')).toMatch(/provenance 'own' is not of the form M-1/);
    expect(refusal({ cut: [{ row: 'settings', cell: 'flattenM', value: 1 }] })).toMatch(/table 'cut' is not one this phase writes \(interior\)/);
    expect(refusal({ interior: fittedCells({ squalid: [0.5, 0.2, 0.2, 0.1] }) })).toMatch(/table 'interior', row 'squalid', cell 'shares\.court': no such cell/);
    expect(refusal({ interior: fittedCells({ modest: [0.458, 0.296, 0.148, 0.099] }) })).toMatch(/row 'modest': the shares sum to 1\.001\d*, not 1/);
    // a sum off by less than half a unit of the third decimal is a rounding, not a refusal
    expect(refusal({ interior: fittedCells({ modest: [0.4572, 0.296, 0.148, 0.099] }) })).toBe('written');
  });

  it('through the entry: --cells proposes the table into the output folder; --apply writes the scratch data folder — never the committed table', async () => {
    resetMem(mem);
    put(mem, 'packages/testkit/baselines/baselines.json', baselinesText([row('junction.share4', 'all', 'NG', scalar(0.05))]));
    put(mem, 'cells.json', cellsText('M-1 2026-10-04', { interior: fittedCells() }));
    const p = await entry(['--phase', 'a', '--seeds', '2', '--cells', 'cells.json']);
    expect(p.report?.tables?.[0]).toMatchObject({ table: 'interior', from: 1, to: 2, provenance: 'M-1 2026-10-04', mode: 'proposed' });
    expect(p.report?.inputs.cells?.path).toBe('cells.json');
    const proposed = readFileSync(join(tmp, 'fusion-ng', 'interior.json'), 'utf8');
    expect(parseTable('interior', JSON.parse(proposed)).version).toBe(2);
    expect(got(mem, 'packages/tables/data/interior.json')).toBe(TABLE_TEXT('interior'));
    const a = await entry(['--phase', 'a', '--seeds', '2', '--cells', 'cells.json', '--apply']);
    expect(a.report?.tables?.[0].mode).toBe('applied');
    expect(got(mem, 'packages/tables/data/interior.json')).toBe(proposed);
    expect(a.lines).toMatch(/fusion-ng: applied interior\.json version 1 → 2, 16 cells, provenance M-1 2026-10-04; the run fails \(exit 1\)/);
    put(mem, 'bad.json', cellsText('M-1 2026-10-04', { interior: fittedCells({ modest: [0.5, 0.5, 0.5, 0] }) }));
    const bad = await entry(['--phase', 'a', '--seeds', '2', '--cells', 'bad.json', '--apply']);
    expect(bad.code).toBe(2);
    expect(bad.lines).toMatch(/fusion-ng stopped: bad\.json: table 'interior', row 'modest': the shares sum to 1\.5, not 1/);
    for (const id of ['interior', 'cut', 'bands']) expect(sha(DATA(id)), id).toBe(committed[id]);
  });
});

describe('phase b: the recalibration — recalibrate(constants, miss): a table change with provenance and its choices row', () => {
  const constants = readConstants(cellsText('M-1 2026-10-27', { cut: [{ row: 'settings', cell: 'flattenM', value: 0.9 }], bands: [{ row: 'settings', cell: 'defaultCuts', value: [0.012, 0.023, 0.24, 0.675, 0.892] }] }), 'recal.json');

  it('is refused without a miss (§4.4: the fallback follows a failure on statistics)', () => {
    expect(() => recalibrate(constants, [], { cut: raw('cut'), bands: raw('bands') }, 'proposed')).toThrow(NO_MISS);
  });

  it('bumps each table it touches by one version, sets the cells and their provenance, and nothing else (a test over the diff)', () => {
    const r = recalibrate(constants, ['block.area/all'], { cut: raw('cut'), bands: raw('bands') }, 'proposed');
    expect(r.writes.map((w) => [w.table.table, w.table.from, w.table.to, w.table.provenance, w.table.changes.length])).toEqual([
      ['cut', 1, 2, 'M-1 2026-10-27', 1],
      ['bands', 1, 2, 'M-1 2026-10-27', 1],
    ]);
    const cut = r.writes[0];
    const diff = changedLines(TABLE_TEXT('cut'), cut.text).map((i) => cut.text.split('\n')[i]);
    expect(diff.length).toBe(2);
    expect(diff[0]).toBe('  "version": 2,');
    // the cell's value and provenance change; its unit, calibratable flag and preset values stay
    expect(diff[1]).toMatch(/^ {6}"flattenM": \{"value": 0\.9, "unit": "m", "provenance": "M-1 2026-10-27", "calibratable": true, "presets": \{"MFCG": \{"value": 8, /);
    const bands = r.writes[1];
    const bdiff = changedLines(TABLE_TEXT('bands'), bands.text).map((i) => bands.text.split('\n')[i]);
    expect(bdiff[0]).toBe('  "version": 2,');
    expect(bdiff.length).toBe(2);
    expect(bdiff[1]).toMatch(/^ {6}"defaultCuts": \{"value": \[0\.012, 0\.023, 0\.24, 0\.675, 0\.892\], "unit": "share", "provenance": "M-1 2026-10-27", "calibratable": true/);
    expect(parseTable('cut', JSON.parse(cut.text)).num('settings', 'flattenM')).toBe(0.9);
    expect(parseTable('bands', JSON.parse(bands.text)).version).toBe(2);
    expect(r.choicesRow).toMatch(/^§4\.4 \(the fusion gate's statistics fallback/);
    expect(r.choicesRow).toContain('the statistics miss block.area/all answered by a table-version bump: cut.json 1 → 2 (settings.flattenM); bands.json 1 → 2 (settings.defaultCuts)');
    expect(r.choicesRow).toContain("provenance 'M-1 2026-10-27'");
  });

  it('refuses a cell outside the cut and band tables, a cell that is not calibratable, a provenance of another form — naming the table, the row and the cell', () => {
    const msg = (text: string): string => {
      try {
        recalibrate(readConstants(text, 'recal.json'), ['x'], { cut: raw('cut'), bands: raw('bands') }, 'proposed');
      } catch (e) {
        return (e as Error).message;
      }
      return 'written';
    };
    expect(msg(cellsText('M-1 2026-10-27', { interior: fittedCells() }))).toMatch(/table 'interior' is not one this phase writes \(cut, bands\)/);
    expect(msg(cellsText('M-1 2026-10-27', { cut: [{ row: 'settings', cell: 'flattenShare', value: 0.05 }] }))).toMatch(/table 'cut', row 'settings', cell 'flattenShare': not calibratable/);
    expect(msg(cellsText('M0 spike 2026-10-27', { cut: [{ row: 'settings', cell: 'flattenM', value: 0.9 }] }))).toMatch(/is not of the form M-1/);
  });

  it('through the entry: taken on this run\'s statistics miss and a phase-a summary\'s, the hood runs re-judged with the recalibrated cut table; refused with no miss; never the committed tables', { timeout: 300_000 }, async () => {
    resetMem(mem);
    put(mem, 'packages/testkit/baselines/ng-faces.json', ngFacesText(ngFile(twoHoods())));
    put(mem, 'recal.json', cellsText('M-1 2026-10-27', { cut: [{ row: 'settings', cell: 'flattenM', value: 30 }] }));
    put(mem, 'a-summary.json', JSON.stringify({ item: 'M0-c-07a', failing: ['sgd.tShare/all'] }));
    const seen: (number | null)[] = [];
    const planted = (t: HoodTask): HoodRecord => {
      seen.push(t.cut === undefined ? null : t.cut.num('settings', 'flattenM'));
      return {
        hood: t.hood.id,
        template: t.hood.template,
        seedIndex: t.seedIndex,
        seed: 1,
        setup: null,
        refused: null,
        // a square with one lane across: two T junctions (degree 3, no 4-way), two 5 000 m² blocks
        outline: [{ x: 0, y: 0 }, { x: 5_000, y: 0 }, { x: 10_000, y: 0 }, { x: 10_000, y: 10_000 }, { x: 5_000, y: 10_000 }, { x: 0, y: 10_000 }, { x: 0, y: 0 }],
        lanes: [[{ x: 5_000, y: 0 }, { x: 5_000, y: 10_000 }]],
        blocks: [
          { ring: [{ x: 0, y: 0 }, { x: 5_000, y: 0 }, { x: 5_000, y: 10_000 }, { x: 0, y: 10_000 }], content: 'ordinary', depthClass: 'standard', interior: 'none' },
          { ring: [{ x: 5_000, y: 0 }, { x: 10_000, y: 0 }, { x: 10_000, y: 10_000 }, { x: 5_000, y: 10_000 }], content: 'ordinary', depthClass: 'standard', interior: 'none' },
        ],
        warnings: {},
        census: { s8: 0, kernelDowngrades: 0, kernelWorkLimitHits: 0, unplaced: 0, degraded: 0, bugs: 0 },
      };
    };
    // a passing block.area row, no template rows (⟨M-1⟩ cells: fail) and no junction row (missingBaseline gates): a miss
    put(mem, 'packages/testkit/baselines/baselines.json', baselinesText([row('block.area', 'all', 'NG', { bins: [50, 500, 5_000], histogram: [0, 0, 10, 0], n: 10, seeds: 10 }, { spreadKS: { p90: 0.9, pairs: 45 } })]));
    const r = await entry(['--phase', 'b', '--seeds', '1', '--recalibrate', 'recal.json', '--miss-from', 'a-summary.json'], { runHood: planted });
    expect(r.code).toBe(1);
    const rec = r.report?.recalibration;
    expect(rec?.miss).toEqual(['block.area/template-area', 'block.area/template-street', 'junction.share4/all', 'phase a: sgd.tShare/all']);
    expect(rec?.tables.map((t) => [t.table, t.from, t.to, t.mode])).toEqual([['cut', 1, 2, 'proposed']]);
    expect(rec?.rejudged?.map((c) => c.id)).toEqual(['run', 'block.area/all', 'block.area/template-area', 'block.area/template-street', 'junction.share4/all']);
    expect(seen).toEqual([null, null, 30, 30]);
    expect(r.report?.inputs.recalibrate?.path).toBe('recal.json');
    expect(r.report?.inputs.missFrom?.path).toBe('a-summary.json');
    expect(parseTable('cut', JSON.parse(readFileSync(join(tmp, 'fusion-ng', 'cut.json'), 'utf8'))).num('settings', 'flattenM')).toBe(30);
    expect(r.lines).toMatch(/fusion-ng: the recalibration's choices row: §4\.4/);
    // --miss-from reads a phase-a summary only
    put(mem, 'other-summary.json', JSON.stringify({ item: 'M0-b-05a', failing: [] }));
    const other = await entry(['--phase', 'b', '--seeds', '1', '--recalibrate', 'recal.json', '--miss-from', 'other-summary.json'], { runHood: planted });
    expect(other.code).toBe(2);
    expect(other.lines).toMatch(/fusion-ng stopped: other-summary\.json: not a phase-a summary \(item M0-c-07a with a failing list\)/);
    // --apply writes the scratch data folder
    const ap = await entry(['--phase', 'b', '--seeds', '1', '--recalibrate', 'recal.json', '--apply'], { runHood: planted });
    expect(ap.report?.recalibration?.tables[0].mode).toBe('applied');
    expect(parseTable('cut', JSON.parse(got(mem, 'packages/tables/data/cut.json') as string)).version).toBe(2);
    // no miss: every gating clause holds — the recalibration is refused (exit 2), nothing written
    resetMem(mem);
    put(mem, 'packages/testkit/baselines/ng-faces.json', ngFacesText(ngFile([twoHoods()[0]])));
    put(mem, 'recal.json', cellsText('M-1 2026-10-27', { cut: [{ row: 'settings', cell: 'flattenM', value: 30 }] }));
    put(mem, 'packages/testkit/baselines/baselines.json', baselinesText([
      row('block.area', 'all', 'NG', { bins: [50, 500, 5_000], histogram: [0, 0, 10, 0], n: 10, seeds: 10 }, { spreadKS: { p90: 0.9, pairs: 45 } }),
      row('block.area', 'template-area', 'NG', { bins: [50, 500, 5_000], histogram: [0, 0, 10, 0], n: 10, seeds: 10 }, { spreadKS: { p90: 0.9, pairs: 45 } }),
      row('junction.share4', 'all', 'NG', { n: 0, seeds: 0 }, { role: 'descriptive', sample: { family: 'test/plain', indices: [0, 1], failed: [{ index: 0, reason: 'not measured' }] } }),
    ]));
    const none = await entry(['--phase', 'b', '--seeds', '1', '--recalibrate', 'recal.json', '--apply'], { runHood: planted });
    expect(none.code).toBe(2);
    expect(none.lines).toContain(`fusion-ng stopped: ${NO_MISS}`);
    expect(got(mem, 'packages/tables/data/cut.json')).toBe(TABLE_TEXT('cut'));
    for (const id of ['interior', 'cut', 'bands']) expect(sha(DATA(id)), id).toBe(committed[id]);
  });
});
