// M0-x-05: F-RIVER's M0 rungs and F-WORK's hydrology rung on S1's registered RiverStrategy through the base chain (§4.2 S1
// (3), §5.2 F-RIVER and F-WORK; C-0085, C-0173, C-0268) — each on a test-side TerrainStrategy's analytic ground (a sink
// carved deeper, a one-row ridge re-traced from the last good knot, ground falling east moving the inlet) or a low
// hydro.cells floor (the coarser grid), each landing in the river report on S1's record and as a ladder use of S1 in the
// generation report (§5.4); F-WALL's trace rungs on the registered EnceinteStrategy (a notch the pull closes: the
// re-offset; a gate on a second notch: the union-simplify); the kernel's own counter handing E_WORK_LIMIT to its caller.
// The plain valley, the plain square and the ample limit leave none of them.
import type { RiverReport } from '@plat/site';
import { describe, expect, it } from 'vitest';
import { LADDER_CONTROLS, LADDER_FIXTURES, ladderChain, ladderHeightStrategy, ladderLowFloor, ladderSmallRiver } from '@plat/testkit';
import { eastward, valley, valleyWithRidge, valleyWithSink } from '../../src/ladders/support.js';

const fixture = (id: string) => {
  const f = LADDER_FIXTURES.find((x) => x.id === id) ?? LADDER_CONTROLS.find((x) => x.id === id);
  if (f === undefined) throw new Error(`no fixture ${id}`);
  return f;
};

const NORTH = { inflowBearingCdeg: 0, mouth: 'none' as const };

/** S1 on a test-side terrain (100 ha frame, a river from the north): its river report and its generation-report ladder uses. */
function s1On(h: (x: number, y: number) => number) {
  const run = ladderChain({ blueprint: ladderSmallRiver('x05-test', 100, NORTH), terrains: { 'x05-test': ladderHeightStrategy(h) }, seed: 1, until: 'S1' });
  expect(run.report.bugs).toEqual([]);
  const river = (run.model.data.get('s1') as { river: RiverReport }).river;
  const uses = run.report.stages.find((s) => s.name === 'S1')?.ladderUses ?? [];
  return { river, uses };
}

describe('F-RIVER on S1’s RiverStrategy', () => {
  it('river/sink — a 3 m sink on the valley’s axis: carved deeper (rung 1, tier 2), within carveMaxCm, delivered full', { timeout: 120_000 }, () => {
    expect(fixture('river/sink').run()).toEqual({ 'S1 F-RIVER carve': 1 });
    const { river, uses } = s1On(valleyWithSink);
    const carves = river.ladderUses.filter((u) => u.name === 'carve');
    expect(carves.length).toBe(1);
    expect(carves[0]).toMatchObject({ cause: 'F-RIVER', rung: 1, tier: 2, entity: 'water:river:0' });
    expect(carves[0].value).toBeGreaterThan(0);
    expect(river.rivers[0]).toMatchObject({ fits: true, reachesCore: true, attempt: 0 });
    expect(river.requested[0]).toMatchObject({ feature: 'river', delivered: 'full', tier: 2 });
    // §5.4: the rung reaches the generation report as S1's ladder use (rung 1, tier 2, its replayable key).
    expect(uses.map((u) => [u.cause, u.rung, u.tier])).toEqual([['F-RIVER', 1, 2]]);
    expect(uses[0].key).toMatch(/^S1\/water\.river@town/);
  });

  it('river/ridge — a one-row ridge the hydrology cannot see: the carve plan fails past the second knot, re-traced from the last good knot (rung 2)', { timeout: 120_000 }, () => {
    expect(fixture('river/ridge').run()).toEqual({ 'S1 F-RIVER inlet': 2, 'S1 F-RIVER retrace': 9 });
    const { river, uses } = s1On(valleyWithRidge);
    const re = river.ladderUses.filter((u) => u.name === 'retrace');
    expect(re.length).toBe(9);
    for (const u of re) expect(u).toMatchObject({ cause: 'F-RIVER', rung: 2, tier: 2 });
    // The ridge spans the arena: no attempt avoids it; the river is degraded and reported, never trenched.
    expect(river.rivers[0].fits).toBe(false);
    expect(river.requested[0]).toMatchObject({ delivered: 'degraded', tier: 4, cause: 'F-RIVER' });
    expect(uses.filter((u) => u.rung === 2).length).toBe(9);
  });

  it('river/eastward — ground falling east: the course leaves the frame before the core; the inlet moved along its edge (rung 3, attempts 1 and 2)', { timeout: 120_000 }, () => {
    expect(fixture('river/eastward').run()).toEqual({ 'S1 F-RIVER inlet': 2 });
    const { river, uses } = s1On(eastward);
    expect(river.ladderUses.filter((u) => u.name === 'inlet').map((u) => [u.rung, u.tier, u.value])).toEqual([
      [3, 3, 1],
      [3, 3, 2],
    ]);
    // Each attempt's stream key names its attempt component (§5.1 (6): retries draw from `attempt`).
    expect(uses.filter((u) => u.rung === 3).map((u) => u.key.split('/').at(-1))).toEqual(['a=1', 'a=2']);
    expect(river.rivers[0].reachesCore).toBe(false);
  });

  it('work/hydro — hydro.cells floor 1: the hydrology one step coarser (R12-5’s cell), work_cut with the count', { timeout: 120_000 }, () => {
    expect(fixture('work/hydro').run()).toEqual({ 'S1 F-RIVER carve': 8, 'S1 F-WORK work_cut': 1 });
    const run = ladderChain({ blueprint: ladderSmallRiver(), seed: 1, until: 'S1', workLimits: ladderLowFloor('hydro.cells', 1) });
    const river = (run.model.data.get('s1') as { river: RiverReport }).river;
    expect(river.workCut).toMatchObject({ counter: 'hydro.cells', limit: 1, coarsened: true });
    expect(river.workCut?.toCellCm).toBeGreaterThan(river.workCut?.fromCellCm ?? Infinity);
    expect(river.hydrology.cellCm).toBe(river.workCut?.toCellCm);
    const w = run.report.stages.find((s) => s.name === 'S1')?.ladderUses.filter((u) => u.cause === 'F-WORK') ?? [];
    expect(w.map((u) => [u.code, u.rung, u.tier])).toEqual([['work_cut', 1, 4]]);
  });

  it('plain/river — the plain valley: no rung, no work_cut, the river whole at tier 0', { timeout: 120_000 }, () => {
    expect(fixture('plain/river').run()).toEqual({});
    const { river, uses } = s1On(valley);
    expect(river.ladderUses).toEqual([]);
    expect(uses).toEqual([]);
    expect(river.workCut).toBeNull();
    expect(river.requested[0]).toMatchObject({ delivered: 'full', tier: 0 });
  });
});

describe('F-WALL’s trace rungs on the registered EnceinteStrategy', () => {
  it('wall/reoffset — a 60 m notch whose walls the pull brings together: the re-offset rung holds', { timeout: 120_000 }, () => {
    expect(fixture('wall/reoffset').run()).toEqual({ 'S3/S5a trace F-WALL reoffset': 1 });
  });
  it('wall/union-simplify — a gate on a second notch the re-offset would close over: the re-offset loses the gate, the union-simplify holds', { timeout: 120_000 }, () => {
    expect(fixture('wall/union-simplify').run()).toEqual({ 'S3/S5a trace F-WALL union_simplify': 1 });
  });
  it('plain/trace — the square without a notch takes no rung', { timeout: 120_000 }, () => {
    expect(fixture('plain/trace').run()).toEqual({});
  });
});

describe('F-WORK on the kernel’s own counters', () => {
  it('work/kernel — a closed ring under a batch limit of 1: the typed E_WORK_LIMIT to the caller; under an ample limit none', () => {
    expect(fixture('work/kernel').run()).toEqual({ 'kernel F-WORK E_WORK_LIMIT': 1 });
    expect(fixture('plain/kernel').run()).toEqual({});
  });
});
