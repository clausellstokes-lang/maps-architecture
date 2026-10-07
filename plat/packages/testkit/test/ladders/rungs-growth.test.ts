// M0-x-05: the rungs of S3's slice (F-WALL's gate re-draw and drop; F-WORK on route.nodes), S5's Stage objects (F-NUM's
// re-propose and reject on a planted precision refusal; F-WORK's queue on a low growth.proposals floor; F-BUDGET-STAGE's
// top-up and accepted shortfall on a raised demand) and S6's (F-WORK's leftover rule on a low grower.turns floor; the
// fields one step coarser on a low field.cells floor), each through the base chain on the small flat town (400 ha,
// 60 ha walled, seed 1) — and the same chain with nothing forced leaving none of them (§5.2; C-0085, C-0269).
import { capacityCheck, type S3Slice, type S5cRecord, type S5dRecord, type S6Output } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { LADDER_CONTROLS, LADDER_FIXTURES, ladderChain, ladderLowFloor, ladderSmallFlat, type ChainOverrides, type ChainSpec } from '@plat/testkit';
import { plantedInsert, plantedPicks } from '../../src/ladders/fixtures.js';

const fixture = (id: string) => {
  const f = LADDER_FIXTURES.find((x) => x.id === id) ?? LADDER_CONTROLS.find((x) => x.id === id);
  if (f === undefined) throw new Error(`no fixture ${id}`);
  return f;
};

const TOWN = ladderSmallFlat('flat', 60);

function town(until: ChainSpec['until'], override?: ChainOverrides) {
  const run = ladderChain({ blueprint: TOWN, seed: 1, until, ...(override === undefined ? {} : { override }) });
  expect(run.report.bugs).toEqual([]);
  return run.model.data;
}

describe('the plain chain', () => {
  it('plain/chain — the small flat town through S6 and the fields: no stage code at all', { timeout: 300_000 }, () => {
    expect(fixture('plain/chain').run()).toEqual({});
    const d = town('S6');
    const slice = d.get('s3.slice') as S3Slice;
    expect(slice.report.gateRungs).toEqual([]);
    expect(slice.report.unserved).toEqual([]);
    const s5 = d.get('s5') as { growth: S5cRecord[]; capacity: S5dRecord[] };
    expect(s5.growth.flatMap((g) => g.rungs)).toEqual([]);
    expect(s5.capacity.flatMap((c) => c.rungs)).toEqual([]);
    expect(s5.growth[0].streets.length).toBeGreaterThan(0);
    expect((d.get('s6') as S6Output).report.workCut).toBeNull();
    expect((d.get('fields') as { report: { workCut: unknown } }).report.workCut).toBeNull();
  });
});

describe('F-WALL’s gate rungs and F-WORK on S3’s slice', () => {
  it('wall/redraw — two picks at one node: the later is re-drawn from its next candidate, and both stand', { timeout: 300_000 }, () => {
    expect(fixture('wall/redraw').run()).toEqual({ 'S3 F-WALL redraw': 1 });
    const slice = town('S3', { S3: { slice: plantedPicks((a, c) => [a, c]) } }).get('s3.slice') as S3Slice;
    expect(slice.report.gateRungs.length).toBe(1);
    const r = slice.report.gateRungs[0];
    expect(r).toMatchObject({ rung: 'redraw', ordinal: 1, with: 0, attempt: 1 });
    expect(r.to).not.toBe(r.from);
    expect(slice.gates.length).toBe(2);
    expect(slice.gates[0].at).not.toEqual(slice.gates[1].at);
    expect(slice.report.gatesDropped).toBe(0);
  });

  it('wall/drop — the later pick ranks only the same node: three re-draws, then dropped and reported', { timeout: 300_000 }, () => {
    expect(fixture('wall/drop').run()).toEqual({ 'S3 F-WALL drop': 1, 'S3 F-WALL redraw': 3 });
    const slice = town('S3', { S3: { slice: plantedPicks((a) => [a, a, a, a]) } }).get('s3.slice') as S3Slice;
    expect(slice.report.gateRungs.map((r) => [r.rung, r.ordinal, r.attempt])).toEqual([
      ['redraw', 1, 1],
      ['redraw', 1, 2],
      ['redraw', 1, 3],
      ['drop', 1, 0],
    ]);
    expect(slice.gates.length).toBe(1);
    expect(slice.report.gatesDropped).toBe(1);
  });

  it('work/route-s3 — route.nodes’ limit 1: every gate route unserved, work_cut with the count', { timeout: 300_000 }, () => {
    expect(fixture('work/route-s3').run()).toEqual({ 'S3 F-WORK work_cut': 4 });
    const slice = town('S3', { S3: { slice: () => ({ routeNodesLimit: 1 }) } }).get('s3.slice') as S3Slice;
    expect(slice.report.unserved.length).toBe(4);
    for (const u of slice.report.unserved) expect(u).toMatchObject({ code: 'work_cut', limit: 1 });
    expect(slice.gates).toEqual([]);
  });
});

describe('F-NUM, F-WORK and F-BUDGET-STAGE on S5’s Stage objects', () => {
  it('growth/re-propose — proposal 2 refused E_BELOW_MIN_EDGE at attempt 0: re-proposed from the next attempt stream, and it stands', { timeout: 300_000 }, () => {
    expect(fixture('growth/re-propose').run()).toEqual({ 'S5c F-NUM re_propose': 1 });
    const s5 = town('S5', { S5: { growth: (k, kernel) => (k === 1 ? plantedInsert(kernel, 'E_BELOW_MIN_EDGE', (p, a) => p === 2 && a === 0) : {}) } }).get('s5') as { growth: S5cRecord[] };
    expect(s5.growth[0].rungs).toEqual([{ cause: 'F-NUM', rung: 're_propose', proposal: 2, code: 'E_BELOW_MIN_EDGE' }]);
    expect(s5.growth[0].streets.some((st) => st.proposal === 2)).toBe(true);
  });

  it('growth/reject — proposal 2 refused at every attempt: re-proposed once, then rejected with a report line', { timeout: 300_000 }, () => {
    expect(fixture('growth/reject').run()).toEqual({ 'S5c F-NUM re_propose': 1, 'S5c F-NUM reject': 1 });
    const s5 = town('S5', { S5: { growth: (k, kernel) => (k === 1 ? plantedInsert(kernel, 'E_SELF_INTERSECT', (p) => p === 2) : {}) } }).get('s5') as { growth: S5cRecord[] };
    expect(s5.growth[0].rungs).toEqual([
      { cause: 'F-NUM', rung: 're_propose', proposal: 2, code: 'E_SELF_INTERSECT' },
      { cause: 'F-NUM', rung: 'reject', proposal: 2, code: 'E_SELF_INTERSECT' },
    ]);
    expect(s5.growth[0].streets.some((st) => st.proposal === 2)).toBe(false);
    expect(s5.growth[0].streets.length).toBeGreaterThan(0);
  });

  it('work/growth — growth.proposals floor 12: the queue closes at 12, work_cut with the count', { timeout: 300_000 }, () => {
    expect(fixture('work/growth').run()).toEqual({ 'S5c F-WORK work_cut': 1 });
    const s5 = town('S5', { S5: { growth: () => ({ workLimits: ladderLowFloor('growth.proposals', 12) }) } }).get('s5') as { growth: S5cRecord[] };
    expect(s5.growth[0].workCut).toEqual({ counter: 'growth.proposals', count: 12, limit: 12 });
    expect(s5.growth[0].rungs).toEqual([{ cause: 'F-WORK', rung: 'work_cut', counter: 'growth.proposals', count: 12, limit: 12 }]);
    expect(s5.growth[0].work['growth.proposals']).toBe(12);
  });

  it('budget/top-up — stage 3 (unwalled) short by 30 %: one top-up, its shortfall reported', { timeout: 300_000 }, () => {
    expect(fixture('budget/top-up').run()).toEqual({ 'S5d F-BUDGET-STAGE top_up': 1 });
    const s5 = town('S5', { S5: { demand: (k, state) => (k === 3 ? { bandsCm2: capacityCheck({ state, k }).landByBand.map((l) => l * 1.3) } : undefined) } }).get('s5') as { capacity: S5dRecord[] };
    const d = s5.capacity[2];
    expect(d.topUp).toBe('grown');
    expect(d.rungs[0]).toEqual({ cause: 'F-BUDGET-STAGE', rung: 'top_up', shortfallCm2: d.check.shortfallCm2 });
    expect(d.rungs.filter((r) => r.rung === 'top_up')).toHaveLength(1);
    expect(s5.capacity.slice(0, 2).flatMap((c) => c.rungs)).toEqual([]);
  });

  it('budget/accept — stage 1 (walled) short by 50 %: its top-up is M1’s, the shortfall accepted and reported', { timeout: 300_000 }, () => {
    expect(fixture('budget/accept').run()).toEqual({ 'S5d F-BUDGET-STAGE accept_shortfall': 1 });
    const s5 = town('S5', { S5: { demand: (k, state) => (k === 1 ? { bandsCm2: capacityCheck({ state, k }).landByBand.map((l) => l * 1.5) } : undefined) } }).get('s5') as { capacity: S5dRecord[] };
    const d = s5.capacity[0];
    expect(d.topUp).toBe('skipped_walled');
    expect(d.rungs).toEqual([{ cause: 'F-BUDGET-STAGE', rung: 'accept_shortfall', shortfallCm2: d.check.shortfallCm2, why: 'walled' }]);
    expect(d.check.shortfallCm2).toBeGreaterThan(0);
  });
});

describe('F-WORK on S6’s Stage object and the fields’ pass 1', () => {
  it('work/grower — grower.turns floor 5: the grower stops at 5 turns, the leftover rule assigns the rest, work_cut', { timeout: 300_000 }, () => {
    expect(fixture('work/grower').run()).toEqual({ 'S6 F-WORK work_cut': 1 });
    const s6 = town('S6', { S6: { workLimits: ladderLowFloor('grower.turns', 5) } }).get('s6') as S6Output;
    expect(s6.report.workCut).toEqual({ code: 'work_cut', count: 5, limit: 5 });
    expect(s6.report.leftovers).toBeGreaterThan(0);
    expect(s6.districts.length).toBeGreaterThan(0);
  });

  it('work/fields — field.cells floor 1 000: the fields one step coarser, work_cut with the count', { timeout: 300_000 }, () => {
    expect(fixture('work/fields').run()).toEqual({ 'S6 fields F-WORK work_cut': 1 });
    const f = town('S6', { S6: { fields: { workLimits: ladderLowFloor('field.cells', 1000) } } }).get('fields') as { report: { workCut: { code: string; counter: string; limit: number; count: number; coarsened: boolean; fromCellCm: number; toCellCm: number } } };
    expect(f.report.workCut).toMatchObject({ code: 'work_cut', counter: 'field.cells', limit: 1000, coarsened: true });
    expect(f.report.workCut.count).toBeGreaterThan(1000);
    expect(f.report.workCut.toCellCm).toBeGreaterThan(f.report.workCut.fromCellCm);
  });
});

