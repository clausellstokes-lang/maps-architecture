// M0-a-12: §3.8's timing bar's harness (≤ 20 µs median per footprint; measured only in the timing phase, M0-t-01 —
// this item builds the harness and its record shape, C-0026, C-0172 (9)). The figure is the median per footprint over
// the corpus, handed to M0-f-01's timeBatch, so the result carries the harness's stamp; a built or contended result is
// never judged. Driven with built readings (no idle wait, a stub machine, sampler and calibration) — no timing here is
// a measurement, and none gates.
import { ok, type KernelResult, type MedialAxis, type Polygon, type Skeleton } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { hostRecord } from '../../src/host/index.js';
import { judge, type TimeBatchOptions } from '../../src/timing/harness.js';
import type { MachineSample } from '../../src/timing/contention.js';
import type { Sampler } from '../../src/timing/sampler.js';
import { loadCorpus, SKELETON_TIMING_ROW, timeCorpus, type SkeletonService } from '../../src/skeleton/index.js';

const HOST = hostRecord();
const quiet = (): MachineSample => ({
  at: '2026-10-04T00:00:00.000Z',
  loadAverage: 0.3,
  power: 'ac',
  selfPid: process.pid,
  processes: [{ pid: process.pid, ppid: 1, pcpu: 100, comm: 'node' }],
});
const sampler = (): Promise<Sampler> => Promise.resolve({ stop: () => Promise.resolve([]) });
const built = (extra: TimeBatchOptions = {}): TimeBatchOptions => ({ idleMs: 0, machine: quiet, sampler, calibrate: () => 100, referenceScore: 100, host: HOST, ...extra });

const spin = (us: number): void => {
  const end = process.hrtime.bigint() + BigInt(Math.round(us * 1000));
  while (process.hrtime.bigint() < end) {
    // spin
  }
};

describe("§3.8's timing bar: the harness and its record (judged only in the timing phase)", () => {
  it('the register row is §3.8: ≤ 20 µs median per footprint, with its ordered fallback ladder', () => {
    expect(SKELETON_TIMING_ROW.budget).toBe(20);
    expect(SKELETON_TIMING_ROW.unit).toBe('µs');
    expect(SKELETON_TIMING_ROW.changeOnMiss).toMatch(/C-0098/);
  });

  it('times the committed corpus through timeBatch: a stamped µs figure per footprint, never judged from built readings', async () => {
    const faces = loadCorpus().faces.slice(0, 200);
    const r = await timeCorpus(faces, 'roof', { rounds: 2, batch: built() });
    expect(r.unit).toBe('µs');
    expect(r.value).toBeGreaterThan(0);
    expect(r.label).toMatch(/median µs per footprint over 200 footprints, 2 rounds/);
    expect(r.readings).toBe('built');
    expect(r.host).toEqual(HOST);
    expect(judge(r, SKELETON_TIMING_ROW).verdict).toBe('requeue');
  });

  it('while the reference score is null the result is contended and re-queued, never a pass or a miss', async () => {
    const faces = loadCorpus().faces.slice(0, 20);
    const r = await timeCorpus(faces, 'spine', { rounds: 1, batch: built({ referenceScore: null }) });
    expect(r.authority).toBe('contended');
    expect(r.normalisation).toBeNull();
    const j = judge(r, SKELETON_TIMING_ROW);
    expect(j.verdict).toBe('requeue');
    expect(j.normalised).toBeNull();
  });

  it('the figure is the median per footprint: three slow footprints of seven do not move it', async () => {
    const ring = [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 0, y: 100 }] as Polygon;
    const faces: Polygon[][] = new Array<Polygon[]>(7).fill([ring]);
    let i = 0;
    const result: KernelResult<Skeleton<KernelResult<MedialAxis>>> = ok({ kind: 'skeleton', use: 'roof', rings: [], edges: [], nodes: [], arcs: [], faces: [], events: 1 });
    const service: SkeletonService = () => {
      spin(i++ % 7 < 3 ? 6000 : 40);
      return result;
    };
    const r = await timeCorpus(faces, 'roof', { rounds: 3, service, batch: built() });
    // the median footprint takes 40 µs of spinning (a contended machine: an upper bound well under the slow ones' 6 ms,
    // and under the mean, ≈ 2.6 ms)
    expect(r.value).toBeGreaterThanOrEqual(40);
    expect(r.value).toBeLessThan(1500);
  });

  it('refuses no faces and a bad round count', async () => {
    await expect(timeCorpus([], 'roof', { batch: built() })).rejects.toThrow(/no faces/);
    await expect(timeCorpus(loadCorpus().faces.slice(0, 1), 'roof', { rounds: 0, batch: built() })).rejects.toThrow(/rounds/);
  });
});
