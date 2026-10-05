// M0-k-02's listed test "a deferred case is counted, never silently skipped" and its bar's "the whole constructive set
// enumerated with milestone tags" (C-0038, C-0110): every later-milestone case's generator is a stub returning
// `deferred` with its own tag; the set's iteration counts each deferred case by its milestone and each M0 case without
// a judge as pending its runner, the counts adding up to the set; `casesAt` partitions the set; and the tags follow
// C-0038's milestone table.
import { describe, expect, it } from 'vitest';
import {
  CONSTRUCTIVE_MILESTONES,
  CONSTRUCTIVE_SET,
  casesAt,
  constructiveTally,
  runConstructive,
  type ConstructiveCase,
  type ConstructiveMilestone,
} from '@plat/testkit';

const LATER = CONSTRUCTIVE_SET.filter((c) => c.milestone !== 'M0');

describe('a deferred case is counted, never silently skipped', () => {
  it.each(LATER.map((c) => [c.id, c] as const))('%s: its stub returns deferred with its own tag on every seed', (id, c: ConstructiveCase) => {
    for (const seed of [0, 1, 7, 0xffffffff]) expect(c.generate(seed)).toEqual({ kind: 'deferred', id, milestone: c.milestone });
  });

  it('counts every case in one iteration: judged + pending + deferred = the set, deferred by milestone as tagged', () => {
    const r = runConstructive(CONSTRUCTIVE_SET, 3);
    const tally = constructiveTally();
    let deferred = 0;
    for (const m of CONSTRUCTIVE_MILESTONES) {
      if (m === 'M0') expect(r.deferred.M0).toBe(0);
      else expect(r.deferred[m], m).toBe(tally.byMilestone[m]);
      deferred += r.deferred[m];
    }
    expect(r.cases).toBe(CONSTRUCTIVE_SET.length);
    expect(r.judged + r.pending.length + deferred).toBe(r.cases);
    expect(r.judged).toBe(tally.numericCore);
    expect(r.pending.sort()).toEqual(casesAt('M0').filter((c) => !c.numericCore).map((c) => c.id).sort());
    expect(r.failures).toEqual([]);
    expect(r.failedCases).toBe(0);
  }, 120_000);

  it('counts a case added at a later milestone, and fails a stub that returns another tag or an input', () => {
    const base = runConstructive(CONSTRUCTIVE_SET, 1);
    const extra: ConstructiveCase = { ...LATER[0], id: 'kept/extra-probe', milestone: 'M5', generate: () => ({ kind: 'deferred', id: 'kept/extra-probe', milestone: 'M5' }) };
    const withExtra = runConstructive([...CONSTRUCTIVE_SET, extra], 1);
    expect(withExtra.deferred.M5).toBe(base.deferred.M5 + 1);
    const lying: ConstructiveCase = { ...extra, id: 'kept/lying-probe', generate: () => ({ kind: 'deferred', id: 'kept/lying-probe', milestone: 'M3a' }) };
    const r = runConstructive([lying], 1);
    expect(r.failedCases).toBe(1);
    expect(r.deferred.M5).toBe(1);
    const m0 = casesAt('M0')[0];
    const leaking: ConstructiveCase = { ...extra, id: 'kept/leaking-probe', generate: (s) => m0.generate(s) };
    expect(runConstructive([leaking], 1).failedCases).toBe(1);
  });

  it('refuses an empty seed family: no iteration judges or greens a case with nothing drawn (negative controls, C-0187 (6))', () => {
    const m0 = casesAt('M0');
    for (const bad of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) expect(() => runConstructive(m0, bad), String(bad)).toThrow(RangeError);
    expect(() => runConstructive(m0, [])).toThrow(RangeError);
    for (const bad of [[-1], [0.5], [2 ** 32]]) expect(() => runConstructive(m0, bad), String(bad)).toThrow(RangeError);
    // A judge that fails every draw fails every case it judges, on a count and on a list.
    const failing = () => ({ ok: false as const, reason: 'always fails' });
    for (const seeds of [3, [5, 9]] as const) {
      const r = runConstructive(m0.slice(0, 3), seeds, failing);
      expect([r.judged, r.green, r.failedCases, r.draws]).toEqual([3, 0, 3, 3 * (typeof seeds === 'number' ? seeds : seeds.length)]);
    }
  });

  it('fails a case the judge stops answering after a verdict, and keeps draws = judged × seeds (negative control, C-0187 (6))', () => {
    const m0 = casesAt('M0').filter((c) => !c.numericCore).slice(0, 2);
    const partial = (_c: ConstructiveCase, input: { seed: number }) => (input.seed === 0 ? { ok: true as const } : undefined);
    const r = runConstructive(m0, 4, partial);
    expect([r.judged, r.green, r.failedCases, r.pending.length, r.draws]).toEqual([2, 0, 2, 0, 8]);
    expect(r.failures[0]?.reason).toContain('no verdict');
    // No verdict on the first seed: pending, nothing drawn; a verdict on every seed: green, draws = judged × seeds.
    expect(runConstructive(m0, 4, () => undefined).pending).toEqual(m0.map((c) => c.id));
    const all = runConstructive(m0, 4, () => ({ ok: true }));
    expect([all.judged, all.green, all.draws]).toEqual([2, 2, 8]);
    const numeric = runConstructive(CONSTRUCTIVE_SET, 5);
    expect(numeric.draws).toBe(numeric.judged * 5);
  }, 120_000);

  it('counts a deferred stub that throws as a failure, still counted by its milestone (N-3)', () => {
    const later = LATER[0];
    const throwing: ConstructiveCase = {
      ...later,
      id: 'kept/throwing-probe',
      generate: () => {
        throw new Error('stub bug');
      },
    };
    const r = runConstructive([throwing], 1);
    expect([r.failedCases, r.deferred[later.milestone]]).toEqual([1, 1]);
    expect(r.failures[0]?.reason).toContain('stub bug');
  });

  it('counts an M0 case whose generator throws as failed, never pending or skipped', () => {
    const m0 = casesAt('M0').find((c) => !c.numericCore);
    if (m0 === undefined) throw new Error('no M0 case');
    const broken: ConstructiveCase = {
      ...m0,
      id: 'geom/broken-probe',
      generate: () => {
        throw new Error('generator bug');
      },
    };
    const r = runConstructive([broken], 2);
    expect(r.failedCases).toBe(1);
    expect(r.pending).toEqual([]);
    expect(r.failures[0]?.reason).toContain('generator bug');
  });
});

describe('the set enumerated with milestone tags (C-0038)', () => {
  it('partitions the set by casesAt, every milestone of the item’s defers present', () => {
    let n = 0;
    for (const m of CONSTRUCTIVE_MILESTONES) n += casesAt(m).length;
    expect(n).toBe(CONSTRUCTIVE_SET.length);
    for (const m of ['M0', 'M1', 'M2a', 'M2b', 'M3a', 'M4', 'M5', 'M6-P', 'M6-U'] as ConstructiveMilestone[]) expect(casesAt(m).length, m).toBeGreaterThan(0);
    expect(() => casesAt('M9' as ConstructiveMilestone)).toThrow(RangeError);
  });

  it('tags the classes C-0038 dates later with their milestones', () => {
    const tagOf = (pred: (c: ConstructiveCase) => boolean) => new Set(CONSTRUCTIVE_SET.filter(pred).map((c) => c.milestone));
    expect(tagOf((c) => c.class === 'kept-carves-water')).toEqual(new Set(['M3a']));
    expect(tagOf((c) => c.class === 'stretch-state-writes')).toEqual(new Set(['M2b']));
    expect(tagOf((c) => c.id.startsWith('neighbour/') || c.id === 'index/neighbour-step-queries')).toEqual(new Set(['M5']));
    expect(tagOf((c) => c.id.startsWith('index/pool-'))).toEqual(new Set(['M1']));
    expect(tagOf((c) => c.id.startsWith('fix/transient-') || c.id === 'fix/recut' || c.id === 'limit/no-input-transient-arena')).toEqual(new Set(['M6-P']));
    expect(tagOf((c) => c.id.startsWith('fix/underground-'))).toEqual(new Set(['M6-U']));
    expect(tagOf((c) => c.id.startsWith('further/frame-') || c.id.startsWith('further/fold-') || c.id === 'limit/cap-frame-no-growth')).toEqual(new Set(['M4']));
    expect(tagOf((c) => c.id.startsWith('further/raised-') || c.id === 'limit/data-clear-region-level')).toEqual(new Set(['M3a']));
    expect(tagOf((c) => c.id === 'index/replay-move-vertex' || c.id === 'limit/undo-redo')).toEqual(new Set(['M2a']));
    // Every class M0 builds keeps M0 cases (C-0038's list).
    for (const k of ['geometry', 'quantisation', 'attraction-moves', 'removals-profiles-neighbours', 'indexes-slots-pool', 'skeleton-fixtures', 'kernel-limits', 'expectations', 'further-limits'] as const) {
      expect(CONSTRUCTIVE_SET.some((c) => c.class === k && c.milestone === 'M0'), k).toBe(true);
    }
    expect(CONSTRUCTIVE_SET.filter((c) => c.class === 'quantisation' || c.class === 'geometry' || c.class === 'attraction-moves' || c.class === 'expectations').every((c) => c.milestone === 'M0')).toBe(true);
  });

  it('reports the whole list’s milestones: the tally by milestone and by class adds up to the set', () => {
    const t = constructiveTally();
    expect(t.total).toBe(CONSTRUCTIVE_SET.length);
    expect(Object.values(t.byMilestone).reduce((a, b) => a + b, 0)).toBe(t.total);
    let byClass = 0;
    for (const per of Object.values(t.byClass)) for (const n of Object.values(per)) byClass += n ?? 0;
    expect(byClass).toBe(t.total);
    expect(t.numericCore).toBe(7);
  });
});
