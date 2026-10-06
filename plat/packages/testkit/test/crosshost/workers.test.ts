// Workers on is observed, not labelled (M0-d-06 fix round 1, check B-2; the interface's "× workers on/off", the first
// test's and the exit bar's "workers on and off"): a stage that digests whether it runs on the main thread
// (thread-stages.ts) gives 'main' with workers off and 'not main' with workers on, on every leg that runs here — the
// Node legs on this machine; the browser legs give the same check on the reference Mac (C-0228 (6)), blocked here with
// their reason.
import { describe, expect, it } from 'vitest';
import { CROSSHOST_LEGS, runCrossHost } from '@plat/testkit';
import { ON_REFERENCE_MAC, RUN_TIMEOUT_MS, runnableNodeLegs, testFixture } from './support.js';
import { crossHostThreadDigest } from './thread-stages.js';

const ENTRY = 'packages/testkit/test/crosshost/thread-stages.ts';
const SEEDS = [0, 7];

describe('workers on runs the stages off the main thread, observed from inside a stage', () => {
  it(
    "every ran run's cells say 'main' with workers off and 'not main' with workers on",
    async () => {
      const nodeLegs = await runnableNodeLegs();
      expect(nodeLegs.length).toBeGreaterThanOrEqual(1);
      const report = await runCrossHost(testFixture(ENTRY, SEEDS, ['thread'], 'thread'));
      expect(report.runs.length).toBe(2 * CROSSHOST_LEGS.length);
      expect(report.runs.some((r) => r.status === 'failed')).toBe(false);
      const ran = report.runs.filter((r) => r.status === 'ran');
      for (const leg of nodeLegs) expect(ran.filter((r) => r.leg === leg).map((r) => r.workers)).toEqual(['off', 'on']);
      if (ON_REFERENCE_MAC) expect(ran.length).toBe(2 * CROSSHOST_LEGS.length);
      for (const r of ran) {
        const want = r.workers === 'on' ? 'not main' : 'main';
        expect(
          r.cells?.map((c) => c.model),
          `${r.leg}/${r.workers}`,
        ).toEqual(SEEDS.map((s) => crossHostThreadDigest(want, s)));
      }
      for (const r of report.runs.filter((x) => x.status === 'blocked')) expect(r.reason).toMatch(/Mac step|not in the Playwright cache/);
    },
    RUN_TIMEOUT_MS,
  );
});
