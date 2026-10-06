// The clauses earlier items carry here (M0-d-06):
//   M0-d-02's lane encoder — "the same lanes (u32, i32, f64 bit patterns, UTF-8) on arm64 and under Rosetta — byte-order
//   independence": the committed lane streams (written on the reference Mac's arm64) replayed on every Node leg give
//   the committed lane counts and H128s, and the seeded streams agree across the legs;
//   M0-a-10's regularFit doubles and M0-a-12's circumcentres — "bit-identical across the five legs".
// Every leg this machine can run runs; arm64 and the browsers are the Mac step where they cannot (C-D06 (6)): blocked
// with their reason, never faked; on the reference Mac every leg must run.
import { describe, expect, it } from 'vitest';
import { CROSSHOST_LEGS, crossHostKatExpected, runCrossHost } from '@plat/testkit';
import { ON_REFERENCE_MAC, RUN_TIMEOUT_MS, runnableNodeLegs, smallKernelFixture } from './support.js';

describe('carried cross-architecture clauses', () => {
  it(
    "M0-d-02's lanes: the same lane counts and H128s on every Node leg, workers off and on, equal to the arm64-written vectors",
    async () => {
      const legs = await runnableNodeLegs();
      if (ON_REFERENCE_MAC) expect(legs).toEqual(['node-arm64', 'node-x64-rosetta']);
      const f = smallKernelFixture([0, 9, 4294967295], ['lanes.kat', 'lanes'], 'lanes');
      const r = await runCrossHost(f, { legs });
      expect(r.runs.every((x) => x.status === 'ran')).toBe(true);
      expect(r.differences).toEqual([]);
      expect(r.verdict).toBe('pass');
      const want = crossHostKatExpected('lanes.kat', f.inputs);
      for (const x of r.runs) {
        expect(x.cells?.[0]).toEqual({ stage: 'lanes.kat', seed: null, model: want, records: null });
        expect(x.cells?.length).toBe(4);
      }
    },
    RUN_TIMEOUT_MS,
  );

  it(
    "M0-a-10's regularFit doubles and M0-a-12's circumcentres: bit-identical on every leg that runs here, the others blocked with their reason",
    async () => {
      const r = await runCrossHost(smallKernelFixture([1, 77, 3998735106], ['regularFit', 'circumcentres'], 'fit-dual'));
      expect(r.runs.length).toBe(2 * CROSSHOST_LEGS.length);
      expect(r.runs.some((x) => x.status === 'failed')).toBe(false);
      expect(r.differences).toEqual([]);
      const ran = r.runs.filter((x) => x.status === 'ran');
      expect(ran.length).toBeGreaterThanOrEqual(2);
      for (const x of ran) expect(x.cells).toEqual(ran[0].cells);
      for (const x of r.runs.filter((y) => y.status === 'blocked')) expect(x.reason).toMatch(/Mac step|not in the Playwright cache/);
      if (ON_REFERENCE_MAC) expect(r.verdict).toBe('pass');
    },
    RUN_TIMEOUT_MS,
  );
});
