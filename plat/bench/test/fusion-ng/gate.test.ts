// The gate re-run through M0-c-06's harness (M0-c-07; §4.4's statistics fallback; C-0117; N-03). The listed test: "the
// gate re-run reproduces M0-c-06's report shape on the fixture at a few seeds" — here seed 1, both runs, at M0-c-06's
// test size (≈ 45 s), through M0-c-06's exported entry, its report compared with the one that entry wrote; M0-c-06's
// summary is never written (N-03). And the refusal census (J264, N-58): every refusal the re-run's stages raise, by
// class, counted from M0-c-06's own census.
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { loadTable } from '@plat/tables';
import { hash128Hex } from '@plat/testkit';
import { SUMMARY_PATH, type FusionGateReport } from '../../src/fusion/index.js';
import { gateArgs, gateRerun, reportShape, tablesLoaded } from '../../src/fusion-ng/index.js';
import { goodRecord } from '../fusion/support.js';
import { TEST_SIZE } from './support.js';

const tmp = mkdtempSync(join(tmpdir(), 'fusion-ng-gate-'));
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

const sha = (p: string): string | null => (existsSync(p) ? createHash('sha256').update(readFileSync(p)).digest('hex') : null);
const SIZE = { frameHa: TEST_SIZE.frameHa, walledHa: TEST_SIZE.walledHa };

async function quiet<T>(f: () => Promise<T>): Promise<T> {
  const spy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  try {
    return await f();
  } finally {
    spy.mockRestore();
  }
}

describe('the gate re-run through M0-c-06\'s entry', () => {
  it('seed 1, both runs, the test size: M0-c-06\'s report shape as its entry wrote it, its bars, the tables loaded, nothing refused; M0-c-06\'s summary untouched (N-03)', { timeout: 600_000 }, async () => {
    const before = sha(SUMMARY_PATH);
    const out = join(tmp, 'real');
    const { gate, census } = await quiet(() => gateRerun({ from: 1, seeds: 1, size: SIZE, out }));
    expect(gate.entry).toBe('bench -- fusion');
    expect(gate.args).toEqual(['--from', '1', '--seeds', '1', '--workers', '1', '--frame-ha', '900', '--walled-ha', '30']);
    expect(gate.args).not.toContain('--summary');
    expect(gate.exit).toBe(gate.report.pass ? 0 : 1);
    // the report M0-c-06's entry wrote to the output folder is the one the record carries (its per-seed rows aside)
    const written = JSON.parse(readFileSync(join(out, 'fusion', 'report.json'), 'utf8')) as FusionGateReport;
    expect(gate.report).toEqual(reportShape(written));
    expect(gate.report.item).toBe('M0-c-06');
    expect(gate.report.sizes).toEqual({ from: 1, seeds: 1, runs: ['fusion', 'integrated'], frameHa: 900, walledHa: 30 });
    expect(gate.report.runs.map((r) => [r['run'], r['seeds'], r['seedRows']])).toEqual([['fusion', 1, 1], ['integrated', 1, 1]]);
    expect(Object.keys(gate.report.verdicts).sort()).toEqual(['bugs', 'cliff', 'corpus', 'drift', 'junction', 'restarts', 'roads', 's8s9', 'sharedS5', 'strips']);
    expect(gate.report.sharedS5).toEqual({ compared: 1, equal: 1 });
    // the tables the re-run's process read, as M0-s-02's loader holds them
    for (const id of ['cut', 'bands', 'granularity', 'interior']) expect(gate.tables[id]).toEqual({ version: loadTable(id).version, hash: hash128Hex(loadTable(id).hash) });
    expect(gate.recalibrationInEffect).toBe(false);
    // the census of the fixture's stages at this seed: 0 refusals (after M0-c-06's fix rounds)
    expect(census).toEqual({ classes: [], total: 0 });
    expect(sha(SUMMARY_PATH)).toBe(before);
  });

  it('a re-run whose records carry refusals: the census classes each by its source and code, of our own intermediate geometry, a finding with its seeds; a failing bar fails the re-run', async () => {
    const refusals = { s8: 2, s9: 0, kerbReads: 1, corpusRoof: 0, corpusSpine: 0, kernelDowngrades: 0, kernelWorkLimitHits: 0, unplaced: 0, degraded: 0 };
    const { gate, census } = await quiet(() =>
      gateRerun({ from: 3, seeds: 2, size: SIZE, out: join(tmp, 'planted'), runner: (t) => goodRecord(t.seed, t.run, t.run === 'integrated' ? { refusals, strips: { faces: 1, lanes: 1, crossings: 1 } } : {}) }),
    );
    expect(gate.exit).toBe(1);
    expect(gate.report.pass).toBe(false);
    expect(gate.report.verdicts.strips).toBe(false);
    // M0-c-06's planted record counts one corpus downgrade per use on the fusion run's seeds; the integrated run's are planted
    expect(census.total).toBe(10);
    expect(census.classes.map((c) => [c.source, c.code, c.inputKind, c.verdict, c.count, c.seeds])).toEqual([
      ['gate re-run: the fusion run (M0-c-06\'s census)', 'corpusRoof', 'OUR OWN INTERMEDIATE', 'MAKE-IT-SUCCEED', 2, [3, 4]],
      ['gate re-run: the fusion run (M0-c-06\'s census)', 'corpusSpine', 'OUR OWN INTERMEDIATE', 'MAKE-IT-SUCCEED', 2, [3, 4]],
      ['gate re-run: the integrated run (M0-c-06\'s census)', 'kerbReads', 'OUR OWN INTERMEDIATE', 'MAKE-IT-SUCCEED', 2, [3, 4]],
      ['gate re-run: the integrated run (M0-c-06\'s census)', 's8', 'OUR OWN INTERMEDIATE', 'MAKE-IT-SUCCEED', 4, [3, 4]],
    ]);
  });

  it('the arguments: from, seeds, workers and the size — never --summary; the CITY size passes no size; a recalibration is in effect only when the loaded versions are the ones it wrote', async () => {
    expect(gateArgs(5, 7, { frameHa: null, walledHa: null }, 3)).toEqual(['--from', '5', '--seeds', '7', '--workers', '3']);
    const tables = tablesLoaded(['cut', 'bands']);
    const w = (table: string, to: number) => ({ table, from: to - 1, to, provenance: 'M-1 2026-10-27', changes: [], mode: 'applied' as const });
    const run = (rec: ReturnType<typeof w>[]) => quiet(() => gateRerun({ from: 1, seeds: 1, size: SIZE, out: join(tmp, 'flag'), recalibrated: rec, runner: (t) => goodRecord(t.seed, t.run) }));
    expect((await run([w('cut', (tables['cut']?.version ?? 0) + 1)])).gate.recalibrationInEffect).toBe(false);
    expect((await run([w('cut', tables['cut']?.version ?? 0), w('bands', tables['bands']?.version ?? 0)])).gate.recalibrationInEffect).toBe(true);
    expect((await run([w('cut', tables['cut']?.version ?? 0), w('bands', (tables['bands']?.version ?? 0) + 1)])).gate.recalibrationInEffect).toBe(false);
    expect((await run([])).gate.recalibrationInEffect).toBe(false);
  });
});
