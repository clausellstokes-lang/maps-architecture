// M0-d-09: the runner's command line, its defaults (§16 M0 (d)'s 100 seeds, C-0090's 20 pairs, the five legs with
// workers off and on) and its sharding helpers — the shards joined in seed order whatever their number.
import { describe, expect, it } from 'vitest';
import { CROSSHOST_LEGS, type CrossHostRun } from '@plat/testkit';
import { defaultConfig, isBarRun, joinRuns, parseDeterminismArgs, parseSeeds, pool, shards, SPIKE_ENTRY, SPIKE_STAGE_IDS, tasksOf } from '../../src/determinism/index.js';

describe('the defaults are the bar run', () => {
  it('100 seeds 1 … 100 of the spike city at CITY, 20 pairs, 2 check seeds, the five legs with workers off and on, timing stamped', () => {
    const c = defaultConfig();
    expect(c.seeds).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
    expect(c.pairs).toBe(20);
    expect(c.checks).toBe(2);
    expect(c.legs).toEqual([...CROSSHOST_LEGS]);
    expect(c.workers).toEqual(['off', 'on']);
    expect(c.size).toBe('city');
    expect(c.entry).toBe(SPIKE_ENTRY);
    expect(c.stages).toEqual([...SPIKE_STAGE_IDS]);
    expect(c.timing).toBe(true);
    expect(c.jobs).toBe(1);
    expect(isBarRun(c)).toBe(true);
    expect(isBarRun({ ...c, size: 'test' })).toBe(false);
    expect(isBarRun({ ...c, entry: 'bench/x.ts' })).toBe(false);
  });
});

describe('the command line', () => {
  it('reads every option', () => {
    const p = parseDeterminismArgs(['--seeds', '5..9', '--pairs', '2', '--checks', '1', '--size', 'test', '--legs', 'webkit,node-arm64', '--workers', 'on', '--jobs', '4', '--no-timing', '--idle-ms', '0', '--repeats', '3']);
    expect(p).toMatchObject({ ok: true, config: { seeds: [5, 6, 7, 8, 9], pairs: 2, checks: 1, size: 'test', legs: ['node-arm64', 'webkit'], workers: ['on'], jobs: 4, timing: false, idleMs: 0, repeats: 3 } });
    expect(parseDeterminismArgs(['run'])).toMatchObject({ ok: true, config: { seeds: defaultConfig().seeds } });
    expect(parseDeterminismArgs(['--entry', 'bench/x.ts', '--stages', 'a,b'])).toMatchObject({ ok: true, config: { entry: 'bench/x.ts', stages: ['a', 'b'] } });
  });
  it('refuses a bad argument, naming it', () => {
    for (const bad of [
      ['--seeds', '0'],
      ['--seeds', '3..1'],
      ['--seeds', '1,1'],
      ['--seeds', 'x'],
      ['--pairs', '-1'],
      ['--jobs', '0'],
      ['--jobs', '65'],
      ['--size', 'metropolis'],
      ['--legs', 'chrome'],
      ['--legs', 'webkit,webkit'],
      ['--workers', 'all'],
      ['--entry', 'bench/x.ts'],
      ['--stages', 'a,a'],
      ['--seeds', '3', '--pairs', '4'],
      ['--seeds', '3', '--checks', '4'],
      ['--pairs', '1', '--pairs', '2'],
      ['--nope'],
      ['loose'],
    ]) {
      const p = parseDeterminismArgs(bad);
      expect(p.ok, bad.join(' ')).toBe(false);
    }
  });
  it('reads a seed list as a count, a range or a list', () => {
    expect(parseSeeds('3')).toEqual([1, 2, 3]);
    expect(parseSeeds('4294967294..4294967295')).toEqual([4294967294, 4294967295]);
    expect(parseSeeds('7,2,9')).toEqual([7, 2, 9]);
    expect(parseSeeds('4294967296,1')).toBeNull();
  });
});

describe('the tasks and the shards', () => {
  it('pairs on the first `pairs` seeds, checks on the first `checks`', () => {
    const c = { ...defaultConfig(), seeds: [11, 12, 13, 14], pairs: 3, checks: 1 };
    expect(tasksOf(c)).toEqual([
      { seed: 11, pair: true, check: true },
      { seed: 12, pair: true, check: false },
      { seed: 13, pair: true, check: false },
    ]);
    expect(tasksOf({ ...c, pairs: 0, checks: 2 })).toEqual([
      { seed: 11, pair: false, check: true },
      { seed: 12, pair: false, check: true },
    ]);
    expect(tasksOf({ ...c, pairs: 0, checks: 0 })).toEqual([]);
  });
  it('splits seeds into contiguous shards, none empty, every seed once in order', () => {
    const xs = Array.from({ length: 10 }, (_, i) => i + 1);
    for (const n of [1, 2, 3, 4, 7, 10, 25]) {
      const s = shards(xs, n);
      expect(s.length).toBe(Math.min(n, 10));
      expect(s.flat()).toEqual(xs);
      expect(s.every((p) => p.length > 0)).toBe(true);
      expect(Math.max(...s.map((p) => p.length)) - Math.min(...s.map((p) => p.length))).toBeLessThanOrEqual(1);
    }
  });
  it('pools work with at most `jobs` at once, results in the items order', async () => {
    let live = 0;
    let peak = 0;
    const out = await pool([5, 1, 4, 2, 3], 2, async (x) => {
      live += 1;
      peak = Math.max(peak, live);
      await new Promise((r) => setTimeout(r, x * 3));
      live -= 1;
      return x * 10;
    });
    expect(out).toEqual([50, 10, 40, 20, 30]);
    expect(peak).toBe(2);
  });
  it('joins the shards of one run in shard order; a blocked or failed part makes the whole so', () => {
    const cell = (seed: number) => ({ stage: 's', seed, model: '0'.repeat(32), records: null });
    const ran = (seeds: number[]): CrossHostRun => ({ leg: 'node-x64-rosetta', workers: 'off', status: 'ran', thread: 'main', cells: seeds.map(cell), wallMs: 2 });
    const j = joinRuns([ran([1, 2]), ran([3])]);
    expect(j.status).toBe('ran');
    expect(j.cells?.map((c) => c.seed)).toEqual([1, 2, 3]);
    expect(j.wallMs).toBe(4);
    expect(joinRuns([ran([1]), { leg: 'node-x64-rosetta', workers: 'off', status: 'blocked', reason: 'b' }])).toMatchObject({ status: 'blocked', reason: 'b' });
    expect(joinRuns([{ leg: 'node-x64-rosetta', workers: 'off', status: 'blocked', reason: 'b' }, { leg: 'node-x64-rosetta', workers: 'off', status: 'failed', reason: 'f' }])).toMatchObject({ status: 'failed', reason: 'f' });
    expect(() => joinRuns([])).toThrow();
  });
});
