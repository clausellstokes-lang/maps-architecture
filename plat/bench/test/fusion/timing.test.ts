// M0-c-06's time clause (§4.4's gate S4 + S5 + S8 ≤ 100 ms at CITY; R12-4's rows): the harness and its record shape only
// — the timing is the timing phase's (M0-t-01). Driven with built readings (no idle wait, a stub machine, sampler and
// calibration): no timing here is a measurement, and a built or contended result is never judged.
import { describe, expect, it } from 'vitest';
import { hostRecord } from '../../src/host/index.js';
import { judge, type TimeBatchOptions } from '../../src/timing/harness.js';
import type { MachineSample } from '../../src/timing/contention.js';
import type { Sampler } from '../../src/timing/sampler.js';
import { GATE_ROW, R12_4_ROWS, timeFusionGate } from '../../src/fusion/index.js';
import { TEST_SIZE } from './support.js';

const HOST = hostRecord();
const quiet = (): MachineSample => ({ at: '2026-10-07T00:00:00.000Z', loadAverage: 0.3, power: 'ac', selfPid: process.pid, processes: [{ pid: process.pid, ppid: 1, pcpu: 100, comm: 'node' }] });
const sampler = (): Promise<Sampler> => Promise.resolve({ stop: () => Promise.resolve([]) });
const built = (extra: TimeBatchOptions = {}): TimeBatchOptions => ({ idleMs: 0, machine: quiet, sampler, calibrate: () => 100, referenceScore: 100, host: HOST, ...extra });

describe('the fusion gate’s time clause: the harness and its record (judged only in the timing phase)', () => {
  it('the register row: ≤ 100 ms, in Node and Chromium’s worker, lanesInfillOnly on a miss (C-0080, C-0082)', () => {
    expect(GATE_ROW).toMatchObject({ budget: 100, unit: 'ms' });
    expect(GATE_ROW.measuredAt).toMatch(/Chromium/);
    expect(GATE_ROW.changeOnMiss).toMatch(/lanesInfillOnly/);
    expect(R12_4_ROWS.map((r) => [r.stage, r.figureMs])).toEqual([
      ['S3', 11],
      ['S4', 10],
      ['S5', 40],
      ['S8', 20],
    ]);
  });

  it('times the fusion run in one stamped batch: the median S4 + S5 + S8 and the R12-4 rows; built readings are re-queued', { timeout: 300_000 }, async () => {
    const t = await timeFusionGate({ seeds: [1], ...TEST_SIZE, batch: built() });
    expect(t.result.unit).toBe('ms');
    expect(t.result.readings).toBe('built');
    expect(t.result.host).toEqual(HOST);
    expect(t.result.value).toBe(t.gateMs.p50);
    expect(t.gateMs.n).toBe(1);
    expect(t.gateMs.p50).toBeCloseTo(t.stages['S4'].p50 + t.stages['S5'].p50 + t.stages['S8'].p50, 6);
    expect(Object.keys(t.stages)).toEqual(['S1', 'S3', 'S4', 'S5', 'S8']);
    expect(t.r12_4.map((r) => r.stage)).toEqual(['S3', 'S4', 'S5', 'S8']);
    for (const r of t.r12_4) expect(r.exceeds).toBe(r.p50 > r.figureMs);
    expect(t.judgement.verdict).toBe('requeue');
    expect(judge(t.result, GATE_ROW).verdict).toBe('requeue');
  });

  it('a contended result (no reference score) is re-queued, never a pass or a miss', { timeout: 300_000 }, async () => {
    const t = await timeFusionGate({ seeds: [1], ...TEST_SIZE, batch: built({ referenceScore: null }) });
    expect(t.result.authority).toBe('contended');
    expect(t.judgement.verdict).toBe('requeue');
    expect(t.judgement.normalised).toBeNull();
  });
});
