// M0-d-09's second test: a planted nondeterminism in a scratch stage is caught by the first differing seed — the
// scratch table's `scratch.planted` reads Math.random at seed 3 alone; the runner's cross-host legs (workers off and on:
// two processes, two draws) and its in-process check runs (dilation, op order: a draw each) both part at seed 3 in that
// stage, and the report names seed 3 and `scratch.planted` as the first difference. The control — the same table over
// the seeds without the plant — differs nowhere.
import { describe, expect, it } from 'vitest';
import { runDeterminism } from '../../src/determinism/index.js';
import { CLOCK_BUDGET_MS, CLOCK_SEED, CLOCK_SLEEP_MS } from './fixtures/clock-stages.js';
import { PLANTED_SEED } from './fixtures/planted-stages.js';
import { CLOCK_ENTRY, CLOCK_STAGES, PLANTED_ENTRY, PLANTED_STAGES, SLOW, testConfig } from './support.js';

describe('a planted nondeterminism', () => {
  it('is caught by the first differing seed, on the legs and in the check runs', { timeout: SLOW }, async () => {
    expect(PLANTED_SEED).toBe(3);
    const cfg = await testConfig({ entry: PLANTED_ENTRY, stages: PLANTED_STAGES, seeds: [1, 2, 3, 4, 5], checks: 5, workers: ['off', 'on'] });
    const r = await runDeterminism(cfg);
    expect(r.verdict).toBe('fail');
    expect(r.firstDifference).toMatchObject({ seed: 3, stage: 'scratch.planted' });
    // the legs: workers on differs from off, first at seed 3 in the planted stage
    expect(r.crosshost.verdict).toBe('fail');
    expect(r.crosshost.runs[1]).toMatchObject({ run: `${cfg.legs[0]}/on`, agrees: false, firstDifference: 'scratch.planted at seed 3 (model)' });
    // the in-process checks: each dilation and op-order run differs at seed 3, and only there
    expect(r.dilation).toMatchObject({ runs: 10, differing: 2, pass: false, first: { seed: 3, stage: 'scratch.planted' } });
    expect(r.opOrder).toMatchObject({ runs: 5, differing: 1, pass: false, first: { seed: 3, stage: 'scratch.planted' } });
    expect(r.failures.some((f) => f.startsWith('cross-host'))).toBe(true);
  });
  it('the control: without the plant nothing differs', { timeout: SLOW }, async () => {
    const cfg = await testConfig({ entry: PLANTED_ENTRY, stages: PLANTED_STAGES, seeds: [1, 2, 4, 5], checks: 4, workers: ['off', 'on'] });
    const r = await runDeterminism(cfg);
    expect(r.firstDifference).toBeNull();
    expect(r.crosshost.verdict).toBe('pass');
    expect(r.inProcess.agrees).toBe(true);
    expect(r.dilation).toMatchObject({ runs: 8, differing: 0, pass: true });
    expect(r.opOrder).toMatchObject({ runs: 4, differing: 0, pass: true });
    // a scratch table has no spike: no stream key or lineage to census, so distinctness has nothing to stand on
    expect(r.distinctness.pass).toBe(false);
    expect(r.failures).toEqual([expect.stringMatching(/^distinctness/), expect.stringMatching(/^oracle/)]);
  });
});

describe('a planted clock read (hardening S1, check note 4)', () => {
  it('is named by the dilation runs as the first difference, and by nothing else', { timeout: SLOW }, async () => {
    expect([CLOCK_SEED, CLOCK_SLEEP_MS * 5]).toEqual([2, CLOCK_BUDGET_MS]);
    const cfg = await testConfig({ entry: CLOCK_ENTRY, stages: CLOCK_STAGES, seeds: [1, 2, 3], checks: 3 });
    const r = await runDeterminism(cfg);
    // un-dilated the ladder is deterministic: the legs and the instrumented run agree, the op-order run too
    expect(r.crosshost).toMatchObject({ verdict: 'pass', differences: 0 });
    expect(r.inProcess.agrees).toBe(true);
    expect(r.opOrder).toMatchObject({ runs: 3, differing: 0, pass: true });
    // the dilation runs scale the clock it reads (2 reads under each factor at seed 2): × 10 takes the other rung
    expect(r.dilation).toMatchObject({ seeds: 3, factors: [10, 0.1], runs: 6, differing: 1, reads: 4, pass: false });
    expect(r.dilation.first).toEqual({ seed: CLOCK_SEED, stage: 'scratch.clocked', check: 'dilation x10' });
    expect(r.firstDifference).toEqual({ seed: CLOCK_SEED, stage: 'scratch.clocked', check: 'dilation x10' });
    expect(r.failures).toContain('dilation: 1 of 6 runs differ');
    expect(r.verdict).toBe('fail');
  });
});
