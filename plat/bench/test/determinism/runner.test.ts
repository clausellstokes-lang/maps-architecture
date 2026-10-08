// M0-d-09's first test: the runner reproduces its own report byte for byte on a second run (seeded) — the spike city
// through M0-d-06's legs, the instrumented in-process run with the oracle and the census, a re-derivation pair, the
// dilation and op-order runs; with the timing switch off the report holds no measurement (C-0268 (3)). Beside it, the
// command `corepack pnpm bench -- determinism …` through its run(): the report to PLAT_BENCH_OUT, the summary where it
// is asked, the exit code by the verdict.
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { baseArena } from '@plat/layout';
import { renumberSlots, type CrossHostStage } from '@plat/testkit';
import {
  exitCodeOf,
  OPTIONS_KEY,
  RECORDS_BATCHES,
  REPORT_NAME,
  reportText,
  run,
  runDeterminism,
  runSeedTask,
  spikeBlueprint,
  spikeRun,
  spikeStageIds,
  type DeterminismSpikeReport,
  type SpikeRunOptions,
} from '../../src/determinism/index.js';
import { blockedLeg, nodeLeg, PLANTED_ENTRY, PLANTED_STAGES, SLOW, TEST_SIZE, testConfig } from './support.js';

const scratch = mkdtempSync(join(tmpdir(), 'plat-determinism-'));
afterAll(() => rmSync(scratch, { recursive: true, force: true }));

describe('the runner reproduces its own report', () => {
  it('byte for byte on a second run (seeded): the fusion spike and the records tree at seed 1, a pair and the check runs', { timeout: SLOW }, async () => {
    const cfg = await testConfig({ seeds: [1], pairs: 1, checks: 1, stages: [...spikeStageIds('fusion'), 'records'] });
    const a: DeterminismSpikeReport = await runDeterminism(cfg);
    const b: DeterminismSpikeReport = await runDeterminism(cfg);
    expect(reportText(b)).toBe(reportText(a));
    // and it is a report of the bars, every one held
    expect(a.verdict).toBe('pass');
    expect(a.failures).toEqual([]);
    expect(a.firstDifference).toBeNull();
    expect(a.crosshost).toMatchObject({ verdict: 'pass', cellsPerRun: 9, differences: 0 });
    expect(a.crosshost.runs).toEqual([expect.objectContaining({ run: `${cfg.legs[0]}/off`, status: 'ran' })]);
    expect(a.inProcess).toEqual({ seeds: 1, comparedWith: `${cfg.legs[0]}/off`, agrees: true, firstDifference: null });
    expect(a.distinctness.pass).toBe(true);
    expect(a.distinctness.streams.distinct).toBeGreaterThan(100);
    expect(a.distinctness.lineages.distinct).toBeGreaterThan(100);
    expect(a.distinctness.entityLineages.entities).toBeGreaterThan(0);
    expect(a.oracle.batches).toBeGreaterThan(5);
    expect(a.oracle).toMatchObject({ mismatches: 0, endFailures: 0, pass: true });
    expect(a.dilation).toMatchObject({ runs: 2, differing: 0, reads: 0, pass: true, factors: [10, 0.1] });
    expect(a.opOrder.permutedBatches).toBeGreaterThan(0);
    expect(a.opOrder).toMatchObject({ runs: 1, differing: 0, pass: true });
    expect(a.matching).toMatchObject({ pairs: 1, duplicateIds: 0, silentRebinds: 0, pass: true });
    expect(a.matching.perPair).toEqual([expect.objectContaining({ seed: 1, spike: 'fusion' })]);
    expect(a.matching.totals.survive).toBeGreaterThan(0);
    // the pair's fresh side is C-0090's { S5: 1 } re-derivation, never the old run matched with itself: some re-drawn
    // entity is retired or new (check B-2)
    const pp = a.matching.perPair[0];
    expect((pp?.tombstone ?? 0) + (pp?.fresh ?? 0)).toBeGreaterThan(0);
    // the oracle's tally is every committed batch of the spike plus the records tree's build and each of its batches
    // (C-0268 (5); check B-3)
    expect(a.oracle.batches).toBe(spikeRun('fusion', 1, { size: TEST_SIZE }).commits + RECORDS_BATCHES + 1);
    expect(a.timings).toEqual({ taken: false, stamps: [], contended: 0, authoritative: 0 });
  });
});

describe('the in-process checks hand their switches to the runs', () => {
  it('the instrumented run the oracle, the dilation runs none, the op-order run M0-d-08\'s permutation and renumbering at the seed (check B-5)', async () => {
    const seen: (Omit<SpikeRunOptions, 'size'> | undefined)[] = [];
    const spy: CrossHostStage = {
      id: 'spy',
      run: (_seed, ctx) => {
        seen.push(ctx.carry.get(OPTIONS_KEY) as Omit<SpikeRunOptions, 'size'> | undefined);
        return { model: '0'.repeat(32), records: null };
      },
    };
    const r = await runSeedTask([spy], { stages: ['spy'], inputs: {}, timing: false, idleMs: 0, repeats: 1 }, { seed: 5, pair: false, check: true });
    expect(r.checks?.map((c) => c.what)).toEqual(['dilation x10', 'dilation x0.1', 'op order (ops permuted, slots renumbered)']);
    expect(seen).toHaveLength(4);
    expect(seen[0]).toEqual({ oracle: true });
    expect(seen[1]).toBeUndefined();
    expect(seen[2]).toBeUndefined();
    const op = seen[3];
    expect(op?.oracle).toBeUndefined();
    expect(op?.permute?.seed).toBe(5);
    expect(op?.renumber?.seed).toBe(5);
    // the renumbering is M0-d-08's: a copy of the arena under other slot numbers
    const ground = baseArena(spikeBlueprint('fusion', TEST_SIZE));
    const renumbered = op?.renumber?.apply(ground, 5);
    expect(renumbered).toBeDefined();
    expect(renumbered).not.toBe(ground);
    expect(renumbered).toEqual(renumberSlots(ground, 5));
  });
});

describe('the command', () => {
  it('writes the report and the summary it is asked for, and exits by the verdict (a planted table: fail, 1)', { timeout: SLOW }, async () => {
    const leg = await nodeLeg();
    const summary = join(scratch, 'summary.json');
    const code = await run(['--seeds', '1..4', '--pairs', '0', '--checks', '0', '--legs', leg, '--workers', 'both', '--no-timing', '--entry', PLANTED_ENTRY, '--stages', PLANTED_STAGES.join(',')], { out: scratch, summary });
    expect(code).toBe(1);
    const report = JSON.parse(readFileSync(join(scratch, REPORT_NAME), 'utf8')) as DeterminismSpikeReport;
    expect(report.verdict).toBe('fail');
    expect(report.firstDifference).toMatchObject({ seed: 3, stage: 'scratch.planted' });
    expect(existsSync(summary)).toBe(true);
    const s = JSON.parse(readFileSync(summary, 'utf8')) as { item: string; seeds: number; verdict: string; firstDifference: unknown };
    expect(s).toMatchObject({ item: 'M0-d-09', seeds: 4, verdict: 'fail', firstDifference: { seed: 3, stage: 'scratch.planted' } });
    expect(await run(['--seeds', 'x'], { out: scratch })).toBe(64);
    // the verdict's exits: 0 pass, 1 fail, 3 incomplete — an incomplete run is never a pass (C-0228 (5), C-0268 (9); check B-4)
    expect([exitCodeOf('pass'), exitCodeOf('fail'), exitCodeOf('incomplete')]).toEqual([0, 1, 3]);
    const control = ['--seeds', '1,2,4,5', '--pairs', '0', '--checks', '0', '--workers', 'off', '--no-timing', '--entry', PLANTED_ENTRY, '--stages', PLANTED_STAGES.join(',')];
    expect(await run([...control, '--legs', leg], { out: scratch })).toBe(0);
    expect((JSON.parse(readFileSync(join(scratch, REPORT_NAME), 'utf8')) as DeterminismSpikeReport).verdict).toBe('pass');
    const blocked = await blockedLeg();
    if (blocked !== null) {
      expect(await run([...control, '--legs', `${leg},${blocked}`], { out: scratch })).toBe(3);
      const inc = JSON.parse(readFileSync(join(scratch, REPORT_NAME), 'utf8')) as DeterminismSpikeReport;
      expect(inc.verdict).toBe('incomplete');
      expect(inc.crosshost.runs).toContainEqual(expect.objectContaining({ run: `${blocked}/off`, status: 'blocked' }));
    }
    expect(await run(['--entry', 'nowhere/at-all.ts', '--stages', 'a', '--seeds', '1', '--pairs', '0', '--checks', '0', '--legs', leg], { out: scratch })).toBe(64);
  });
});
