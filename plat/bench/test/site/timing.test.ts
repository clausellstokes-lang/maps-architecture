// The site spike's timing-phase mode (M0-e-06; §12.1, §12.4, §12.10 R12-4 / R12-5; C-0047, C-0082, C-0084, C-0271 (4)):
// one M0-f-01 batch per fixture and configuration — the seeds derived in this thread, each stage timed by the harness,
// the figure the p50 of S1 + S4 + S6, §12.4's hydrology row timed on the terrain before the carve — stamped by
// `timeBatch` and judged against R12-5's row only when measured and AUTHORITATIVE (C-0047): here, with built readings
// (no idle, a fixed calibrate), the stamp is `built` and the verdict `requeue`. No timing is taken or judged on this
// machine (the timing reference is the owner's Mac; the figures printed here are informative only).
import { HYDROLOGY_ROW } from '@plat/site';
import { describe, expect, it } from 'vitest';
import { fixtureNamed, gateMs, R12_4_ROWS, SPIKE_STAGES, timeSpike, type SiteFixture } from '../../src/site/index.js';
import type { MachineSample } from '../../src/timing/index.js';
import type { HostRecord } from '../../src/host/index.js';

const HEAVY = 900_000;

const IDLE_MACHINE: MachineSample = { at: '2026-10-07T00:00:00.000Z', loadAverage: 0, processes: [], power: 'ac', selfPid: process.pid } as MachineSample;

describe('timeSpike: one stamped batch, its figure the gate\'s p50, R12-4\'s rows and the hydrology row beside it', () => {
  it('relief-60 at the test size, seed 1, built readings: a stamped result, re-queued (never judged), every stage timed', { timeout: HEAVY }, async () => {
    const f = fixtureNamed('relief-60') as SiteFixture;
    const t = await timeSpike(f, 'default', [1], 'test', {
      idleMs: 0,
      calibrate: () => 100,
      referenceScore: 100,
      machine: () => IDLE_MACHINE,
      sampler: async () => ({ stop: async () => [] }) as never,
      host: { cpu: 'test' } as unknown as HostRecord,
    });
    expect([t.fixture, t.config, t.mode, t.runs]).toEqual(['relief-60', 'default', 'timing-phase', 1]);
    expect(t.stamp).not.toBeNull();
    expect(t.stamp?.readings).toBe('built');
    expect(t.stamp?.unit).toBe('ms');
    expect(t.judgement?.row).toBe('R12-5');
    expect(t.judgement?.verdict).toBe('requeue');
    expect(t.note).toContain('never judged');
    // every stage the derivation ran is timed; the stamp's figure is the gate's sum (one seed: its p50)
    expect(Object.keys(t.stageP50)).toEqual([...SPIKE_STAGES]);
    expect(t.gateRuns).toBe(1);
    expect(t.stamp?.value).toBe(t.gateP50);
    expect(t.gateP50).toBe(gateMs(t.stageP50));
    expect(t.r12_4.map((r) => r.stage)).toEqual(R12_4_ROWS.map((r) => r.stage));
    for (const r of t.r12_4) expect(r.exceeds).toBe((r.p50 as number) > r.figureMs);
    // §12.4's hydrology row, in the record shape M0-e-02 declared (HydrologyRowRecord), at the rung's cell
    expect(t.hydrology).not.toBeNull();
    expect(t.hydrology?.row).toBe(HYDROLOGY_ROW.row);
    expect(t.hydrology?.rung).toBe('CITY');
    expect(t.hydrology?.cellCm).toBe(2500);
    expect(t.hydrology?.cells).toBeGreaterThan(30_000);
    expect(t.hydrology?.ms).toBeGreaterThan(0);
    expect(t.hydrology?.authority).toBe(t.stamp?.authority);
  });

  it('the coarse configuration times its own grid: the hydrology row at the coarser cell', { timeout: HEAVY }, async () => {
    const f = fixtureNamed('relief-60') as SiteFixture;
    const t = await timeSpike(f, 'coarse', [1], 'test', {
      idleMs: 0,
      calibrate: () => 100,
      referenceScore: 100,
      machine: () => IDLE_MACHINE,
      sampler: async () => ({ stop: async () => [] }) as never,
      host: { cpu: 'test' } as unknown as HostRecord,
    });
    expect(t.hydrology?.cellCm).toBe(3200);
    expect(t.judgement?.verdict).toBe('requeue');
  });
});
