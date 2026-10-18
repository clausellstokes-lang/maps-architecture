// M0-d-06's test "a planted difference (a Math.random in a test bundle) is detected and named by leg, stage and seed"
// (§6.5 (9): "naming the first differing stage and seed"). The test bundle's `planted` stage digests a Math.random
// draw; every run that is not the compared run must differ from it first at stage `planted`, at the fixture's FIRST
// seed (the stages before it agree), and the report and its printed line name the leg, the workers setting, the stage
// and the seed.
import { describe, expect, it } from 'vitest';
import { crossHostReportLines, formatCrossHostDifference, runCrossHost, type CrossHostReport } from '@plat/testkit';
import { RUN_TIMEOUT_MS, runnableNodeLegs, testFixture } from './support.js';

const ENTRY = 'packages/testkit/test/crosshost/planted-stages.ts';

describe('a planted Math.random is detected and named by leg, stage and seed', () => {
  it(
    'every run differs from the compared run first at stage planted, seed 7, in the model digest',
    async () => {
      const legs = await runnableNodeLegs();
      expect(legs.length).toBeGreaterThanOrEqual(1);
      const report: CrossHostReport = await runCrossHost(testFixture(ENTRY, [7, 8], ['steady', 'planted', 'after'], 'planted'), { legs });
      const ran = report.runs.filter((r) => r.status === 'ran');
      expect(ran.length).toBe(2 * legs.length);
      expect(report.verdict).toBe('fail');
      const base = report.comparedWith;
      expect(base).not.toBeNull();
      const others = ran.filter((r) => !(r.leg === base?.leg && r.workers === base.workers));
      expect(report.differences.map((d) => `${d.leg}/${d.workers}`)).toEqual(others.map((r) => `${r.leg}/${r.workers}`));
      for (const d of report.differences) {
        expect(d.difference.stage).toBe('planted');
        expect(d.difference.seed).toBe(7);
        expect(d.difference.field).toBe('model');
        expect(d.difference.reference).toMatch(/^[0-9a-f]{32}$/);
        expect(d.difference.got).toMatch(/^[0-9a-f]{32}$/);
        expect(d.difference.got).not.toBe(d.difference.reference);
        const line = formatCrossHostDifference(d.leg, d.workers, d.difference);
        expect(line).toContain(`${d.leg} workers ${d.workers}`);
        expect(line).toContain('stage planted seed 7');
      }
      for (const r of others) expect(r.agrees).toBe(false);
      const printed = crossHostReportLines(report).join('\n');
      expect(printed).toContain('stage planted seed 7');
      expect(printed).toContain('verdict: fail');
      // the stages around the plant agree on every run: the steady cells and the planted stage's records digest
      const cellsOf = (r: (typeof ran)[number]) => (r.cells ?? []).filter((c) => c.stage !== 'planted').map((c) => [c.stage, c.seed, c.model, c.records]);
      for (const r of ran) expect(cellsOf(r)).toEqual(cellsOf(ran[0]));
    },
    RUN_TIMEOUT_MS,
  );

  it(
    'the same table without the planted stage agrees on every run, and an error thrown alike on every leg agrees too',
    async () => {
      const legs = await runnableNodeLegs();
      const report = await runCrossHost(testFixture(ENTRY, [7, 8], ['steady', 'after', 'throws'], 'unplanted'), { legs });
      expect(report.differences).toEqual([]);
      expect(report.runs.filter((r) => r.status === 'ran').every((r) => r.agrees !== false)).toBe(true);
      const ran = report.runs.find((r) => r.status === 'ran');
      const thrown = ran?.cells?.filter((c) => c.stage === 'throws') ?? [];
      expect(thrown.map((c) => c.error)).toEqual(['RangeError: refused at seed 7', 'RangeError: refused at seed 8']);
      expect(thrown.every((c) => c.model === null && c.records === null)).toBe(true);
      if (legs.length * 2 === report.runs.length) expect(report.verdict).toBe('pass');
    },
    RUN_TIMEOUT_MS,
  );
});
