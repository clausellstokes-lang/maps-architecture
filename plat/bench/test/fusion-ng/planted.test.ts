// Planted tables and planted S8 faults (M0-c-07's hardening round S1, C-0469). Two promises that only a changed table or
// a refused district can show, each held here with @plat/tables' and @plat/layout's own entry points wrapped — they
// pass through untouched until a test plants something:
//
//   * integration-g17 N-3: the gate re-run's `tables` record names every table its statistics rest on, workLimits.json
//     among them (S8 reads its cut.* laws and the district batch's kernel laws, §5.1 (5)). A re-run under a changed
//     work-limit table (a planted version, or a planted row at the same version) differs in its tables record.
//   * the M0-c-07 notes' row 3: a hood S8 refuses. The refusal is S8's own (its test-side faults, `FabricFaults`: the
//     first candidate's end rows fail and the lane cannot be taken out again — C-0243 (3)'s abandonment, the district's
//     batch refused E_INVARIANT, nothing committed); the hood stage and runHood are the item's, unchanged. The record
//     carries the refusal, the run clause fails, the hood is left out of the statistics and the census classes it LAWFUL
//     / MAKE-IT-SUCCEED with its seed.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { H128, utf8Bytes } from '@plat/kernel';
import type { S8Input } from '@plat/layout';
import { loadWorkLimits, parseWorkLimits, type WorkLimitsTable } from '@plat/tables';
import { hash128Hex } from '@plat/testkit';
import { failingOf, GATE_TABLES, gateRerun, hoodDocs, hoodSeed, judgeHoods, PLAT_ROOT, runHood, tablesLoaded } from '../../src/fusion-ng/index.js';
import { goodRecord } from '../fusion/support.js';
import { areaHistogram, ngFile, row, scalar, TEST_SIZE, twoHoods } from './support.js';

const plant = vi.hoisted(() => ({ workLimits: undefined as unknown, faults: undefined as unknown }));
vi.mock('@plat/tables', async (orig) => {
  const m = await orig<typeof import('@plat/tables')>();
  return { ...m, loadWorkLimits: (): WorkLimitsTable => (plant.workLimits as WorkLimitsTable | undefined) ?? m.loadWorkLimits() };
});
vi.mock('@plat/layout', async (orig) => {
  const m = await orig<typeof import('@plat/layout')>();
  return { ...m, runS8: (input: Parameters<typeof m.runS8>[0], ctx: Parameters<typeof m.runS8>[1]) => m.runS8(plant.faults === undefined ? input : { ...input, faults: plant.faults as FabricFaults }, ctx) };
});

const SIZE = { frameHa: TEST_SIZE.frameHa, walledHa: TEST_SIZE.walledHa };

/** S8's test-side faults (`FabricFaults`, read through S8Input: the layout index exports the input, not the fault type). */
type FabricFaults = NonNullable<S8Input['faults']>;

const tmp = mkdtempSync(join(tmpdir(), 'fusion-ng-planted-'));
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

/** workLimits.json as committed (raw JSON, read from inside plat/). */
const shippedRaw = (): { version: number; rows: Record<string, Record<string, { value: unknown }>> } =>
  JSON.parse(readFileSync(join(PLAT_ROOT, 'packages', 'tables', 'data', 'workLimits.json'), 'utf8')) as { version: number; rows: Record<string, Record<string, { value: unknown }>> };

async function quiet<T>(f: () => Promise<T>): Promise<T> {
  const spy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  try {
    return await f();
  } finally {
    spy.mockRestore();
  }
}

describe('the gate re-run\'s tables record names workLimits.json (integration-g17 N-3)', () => {
  it('the shipped table: recorded at its version and pinning hash beside cut, bands, granularity and interior', () => {
    plant.workLimits = undefined;
    expect([...GATE_TABLES]).toEqual(['cut', 'bands', 'granularity', 'interior', 'workLimits']);
    const t = loadWorkLimits().table;
    expect(tablesLoaded()['workLimits']).toEqual({ version: t.version, hash: hash128Hex(t.hash) });
    expect(Object.keys(tablesLoaded())).toEqual([...GATE_TABLES]);
  });

  it('a planted version, or a planted row at the same version, gives another tables record — the other tables\' entries unchanged', () => {
    plant.workLimits = undefined;
    const shipped = tablesLoaded();
    const raw = shippedRaw();
    try {
      plant.workLimits = parseWorkLimits({ ...raw, version: raw.version + 1 });
      const bumped = tablesLoaded();
      expect(bumped).not.toEqual(shipped);
      expect(bumped['workLimits']?.version).toBe((shipped['workLimits']?.version ?? 0) + 1);
      const law = raw.rows['cut.kernelCalls'];
      plant.workLimits = parseWorkLimits({ ...raw, rows: { ...raw.rows, 'cut.kernelCalls': { ...law, perUnit: { ...law['perUnit'], value: (law['perUnit'].value as number) / 2 } } } });
      const halved = tablesLoaded();
      expect(halved['workLimits']?.version).toBe(shipped['workLimits']?.version);
      expect(halved['workLimits']?.hash).not.toBe(shipped['workLimits']?.hash);
      for (const id of ['cut', 'bands', 'granularity', 'interior']) {
        expect(bumped[id], id).toEqual(shipped[id]);
        expect(halved[id], id).toEqual(shipped[id]);
      }
    } finally {
      plant.workLimits = undefined;
    }
  });

  it('two re-runs with the same records, one under a changed work-limit table: equal reports, different tables records', { timeout: 120_000 }, async () => {
    const raw = shippedRaw();
    const rerun = (out: string) => quiet(() => gateRerun({ from: 1, seeds: 1, size: SIZE, out: join(tmp, out), runner: (t) => goodRecord(t.seed, t.run) }));
    plant.workLimits = undefined;
    const before = await rerun('shipped');
    try {
      plant.workLimits = parseWorkLimits({ ...raw, version: raw.version + 1 });
      const after = await rerun('planted');
      expect(after.gate.report).toEqual(before.gate.report);
      expect(after.gate.tables).not.toEqual(before.gate.tables);
      expect(after.gate.tables['workLimits']?.version).toBe(raw.version + 1);
      expect(before.gate.tables['workLimits']?.version).toBe(raw.version);
    } finally {
      plant.workLimits = undefined;
    }
  });
});

describe('a hood S8 refuses (the M0-c-07 notes\' row 3)', () => {
  const HASH = H128(utf8Bytes('planted baselines'));
  const areas = Array.from({ length: 200 }, (_, i) => 300 + 15 * i);
  const rows = [
    row('block.area', 'all', 'NG', areaHistogram(areas), { spreadKS: { p90: 0.4, pairs: 190 } }),
    row('block.area', 'template-area', 'NG', areaHistogram(areas), { spreadKS: { p90: 0.8, pairs: 190 } }),
    row('block.area', 'template-street', 'NG', areaHistogram(areas), { spreadKS: { p90: 0.8, pairs: 190 } }),
    row('junction.share4', 'all', 'NG', scalar(0.05, 0.01, 0.12)),
  ];

  it('the real hood run records S8\'s refusal; the run clause fails, the hood is left out of the statistics, the census classes it LAWFUL / MAKE-IT-SUCCEED with its seed', { timeout: 300_000 }, () => {
    const [h1, h2] = twoHoods();
    let refused: ReturnType<typeof runHood>;
    try {
      plant.faults = { endRowsFailAt: 1, takeOutFails: true } satisfies FabricFaults;
      refused = runHood({ hood: h1, seed: 1, seedIndex: 0, size: SIZE });
    } finally {
      plant.faults = undefined;
    }
    const fine = runHood({ hood: h2, seed: 1, seedIndex: 0, size: SIZE });
    // the record: placed and run, S8's refusal kept with its code, nothing committed
    expect(refused.setup).toBeNull();
    expect(refused.refused).toMatch(/^E_INVARIANT S8 .*: a lane whose end rows failed could not be taken out again/);
    expect(refused.seed).toBe(hoodSeed(1, h1.id, 0));
    expect(refused.blocks).toEqual([]);
    expect(refused.census.s8).toBe(1);
    expect([fine.setup, fine.refused]).toEqual([null, null]);
    expect(fine.blocks.length).toBeGreaterThan(3);
    // judged as compare judges it
    const j = judgeHoods({ rows, info: [], hash: HASH, seed: 1, seeds: 1, ng: ngFile([h1, h2]), records: [refused, fine] });
    const run = j.clauses.find((c) => c.id === 'run');
    expect([run?.verdict, run?.gating]).toEqual(['fail', true]);
    expect(run?.note).toBe(`2 hood runs: 0 not placed, 1 refused by the runner or S8; ${String(fine.blocks.length)} blocks measured`);
    expect(failingOf(j.clauses)[0]).toBe('run');
    // left out of the statistics: the seed's doc holds the other hood alone, and the area sample its blocks alone
    expect(hoodDocs([refused, fine], 1)[0].districts?.map((d) => d.id)).toEqual(['hood-2']);
    const area = j.ours.entries.find((e) => e.metric === 'block.area' && e.key === 'all');
    expect(area?.samples?.[0].length).toBe(fine.blocks.length);
    expect(j.ours.entries.filter((e) => e.metric === 'block.area').map((e) => e.key)).toEqual(['all', 'template-street']);
    // the census: one class, a lawful outline S8 refused — a finding for the session with its seed
    expect(j.census.total).toBe(1);
    expect(j.census.classes.map((c) => [c.source, c.code, c.inputKind, c.verdict, c.count, c.seeds])).toEqual([['phase b: the hood runs (S1 + S8 on an outline)', 'refused: E_INVARIANT', 'LAWFUL', 'MAKE-IT-SUCCEED', 1, [refused.seed]]]);
  });
});
