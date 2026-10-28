// The profile tool's entry without a run: the arguments (defaults, refusals), the child's argument vector, the cut
// figures and the per-cut log from a record.
import { describe, expect, it } from 'vitest';
import { cutLog, parseArgs, perCut, run } from '../../src/profile/index.js';
import { driverArgv, parseDriverArgv } from '../../src/profile/driver.js';
import { RECORD } from './fixtures.js';

describe('the arguments', () => {
  it('defaults to the fusion run, S8, plain, the idle-box bar 0.3', () => {
    expect(parseArgs(['--seed', '3'])).toMatchObject({ run: 'fusion', seed: 3, stage: 'S8', mode: 'plain', interval: 500, cuts: false, cutCount: true, window: 0, top: 20, loadMax: 0.3, loadWait: 300, out: null, tag: null });
    expect(parseArgs(['--seed', '3', '--mode', 'cpu', '--window', '100', '--cuts'])).toMatchObject({ mode: 'cpu', window: 100, cuts: true });
  });
  it.each([
    [[], /--seed is required/],
    [['--seed', 'x'], /not an integer/],
    [['--seed', '3', '--mode', 'fast'], /--mode/],
    [['--seed', '3', '--run', 'other'], /--run/],
    [['--seed', '3', '--window', '100'], /goes with --mode cpu/],
    [['--seed', '3', '--frame-ha', '900'], /go together/],
    [['--seed', '3', '--seed', '4'], /twice/],
    [['--seed', '3', '--bogus'], /unknown argument/],
    [['--seed', '3', '--tag', 'a/b'], /plain name/],
    [['--seed', '3', '--stage', 'S8;'], /stage name/],
  ])('refuses %j', (args, re) => {
    expect(parseArgs(args)).toMatch(re);
  });
  it('exits 64 on a refused argument', async () => {
    expect(await run(['--mode', 'cpu'], { out: '' })).toBe(64);
  });
  it('hands the child a vector it parses back to the same arguments', () => {
    const d = { run: 'integrated' as const, seed: 4, stage: 'S8', mode: 'count' as const, interval: 250, cuts: true, cutCount: false, out: '/o', tag: 't', frameHa: 900, walledHa: 30 };
    expect(parseDriverArgv(driverArgv(d))).toEqual(d);
  });
});

describe('the cut figures', () => {
  it('reads the cuts from the split and hole logpoints, or from coverage when given', () => {
    expect(perCut(RECORD)).toEqual({ stageMs: 0.5, cuts: 2, msPerCut: 0.25 });
    expect(perCut(RECORD, 5).msPerCut).toBeCloseTo(0.1, 12);
    expect(perCut({ ...RECORD, armed: [] }).cuts).toBeNull();
  });
  it('writes the per-cut log: each hit since the stage start, each cut since the previous cut', () => {
    expect(cutLog(RECORD).trim().split('\n')).toEqual([
      'kind\tcut#\tms since stage start\tms since previous cut',
      'kerbFace\t\t0.050\t',
      'split\t1\t0.150\t',
      'hole\t2\t0.350\t0.200',
    ]);
  });
});
