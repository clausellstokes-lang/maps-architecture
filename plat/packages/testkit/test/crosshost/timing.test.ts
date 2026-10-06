// M0-d-06's test "the timing mode returns one figure per stage per seed on the chromium leg, workers on, and changes no
// digest (the digests with timing on equal those with it off)" (C-0082). The figure is the harness's wall-clock taken
// around each stage call inside the worker (performance.now(), never in model code). Built and run here on every leg
// this machine runs with workers on; the chromium leg's run is the Mac step (C-D06 (6)): where the cache holds no
// chromium build the leg is reported blocked with that reason, and on the reference Mac it must run.
import { describe, expect, it } from 'vitest';
import { crossHostTimes, planCrossHostLeg, runCrossHost, type CrossHostLegId } from '@plat/testkit';
import { ON_REFERENCE_MAC, RUN_TIMEOUT_MS, runnableNodeLegs, smallKernelFixture } from './support.js';

const SEEDS = [3, 1, 4];
const STAGES = ['lanes.kat', 'xoshiro', 'regularFit', 'circumcentres'];

describe('the timing mode', () => {
  it(
    'returns one figure per stage per seed on each leg with workers on, and changes no digest',
    async () => {
      const chromium = await planCrossHostLeg('chromium');
      if (ON_REFERENCE_MAC) expect(chromium.runnable).toBe(true);
      const legs: CrossHostLegId[] = [...(await runnableNodeLegs()), 'chromium'];
      const fixture = smallKernelFixture(SEEDS, STAGES);
      const timed = await runCrossHost(fixture, { legs, workers: ['on'], timing: true });
      const plain = await runCrossHost(fixture, { legs, workers: ['on'], timing: false });
      expect(timed.timing).toBe(true);
      for (const r of timed.runs) {
        if (r.leg === 'chromium' && !chromium.runnable) {
          expect(r.status).toBe('blocked');
          expect(r.reason).toBe(chromium.reason);
          continue;
        }
        expect(r.status, r.reason).toBe('ran');
        expect(r.thread).toBe('worker');
        const p = plain.runs.find((x) => x.leg === r.leg && x.workers === r.workers);
        expect(p?.status).toBe('ran');
        // every digest equal with the timing on and off; only the figure is added
        expect(r.cells?.map(({ ms: _ms, ...rest }) => rest)).toEqual(p?.cells);
        expect(p?.cells?.every((c) => c.ms === undefined)).toBe(true);
        for (const c of r.cells ?? []) {
          expect(typeof c.ms).toBe('number');
          expect(c.ms).toBeGreaterThanOrEqual(0);
        }
      }
      const times = crossHostTimes(timed);
      expect(times.map((t) => t.leg)).toEqual(timed.runs.filter((r) => r.status === 'ran').map((r) => r.leg));
      for (const t of times) {
        expect(t.workers).toBe('on');
        expect(t.stages.map((s) => s.stage)).toEqual(STAGES);
        for (const s of t.stages) {
          expect(s.seeds).toEqual(s.stage === 'lanes.kat' ? [null] : SEEDS);
          expect(s.ms.length).toBe(s.seeds.length);
          expect(s.medianMs).toBeGreaterThanOrEqual(Math.min(...s.ms));
          expect(s.medianMs).toBeLessThanOrEqual(Math.max(...s.ms));
        }
      }
      expect(() => crossHostTimes(plain)).toThrow(/without the timing mode/);
    },
    RUN_TIMEOUT_MS,
  );
});
