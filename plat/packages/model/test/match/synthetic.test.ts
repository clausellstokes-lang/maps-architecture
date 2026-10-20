// M0-d-05b: the listed test "the synthetic anchor sets of §6.3 (450-building district, 30 000-entity CITY, 80 000-entity
// METROPOLIS) run and report per-entity time (reported here; gating in the timing phase)", and the timing bar's harness
// and record shape (≤ 2 µs per point-anchored and ≤ 20 µs per overlap-anchored entity, median — the timing phase's
// bar). On this shared machine every time is CONTENDED (M0.md §0.1 (5)): it is printed, never asserted.
import { describe, expect, it, vi } from 'vitest';
import { match, MATCH_BUDGET_US, M0_ANCHORS, resolveAnchors, SYNTHETIC_ANCHORS, syntheticSet, timeMatch, type MatchEntity, type MatchTimingRecord } from '../../src/index.js';
import { L, pointEntity, rect } from './support.js';

const say = (r: MatchTimingRecord): void => {
  const kinds = r.perKind.map((k) => `${k.kind} ${k.medianUs.toFixed(3)}`).join(', ');
  console.log(
    `[M0-d-05b ${r.status}] ${r.set}: point ${r.point.medianUs.toFixed(3)} µs × ${r.point.entities} (budget ${r.point.budgetUs}), ` +
      `overlap ${r.overlap.medianUs.toFixed(3)} µs × ${r.overlap.entities} (budget ${r.overlap.budgetUs}); per kind: ${kinds}`,
  );
};

describe('§6.3\'s synthetic anchor sets (reported here; gating in the timing phase)', () => {
  it('builds the sets at §6.3\'s sizes, deterministically from the seed', () => {
    expect(syntheticSet('district', 1).old).toHaveLength(450);
    const city = syntheticSet('city', 1);
    expect(city.old).toHaveLength(30_000);
    expect(city.point + city.overlap).toBe(30_000);
    expect(city.overlap).toBe(1_000);
    expect(syntheticSet('metropolis', 1).old).toHaveLength(80_000);
    expect(syntheticSet('district', 7)).toEqual(syntheticSet('district', 7));
    expect(syntheticSet('district', 7).fresh).not.toEqual(syntheticSet('district', 8).fresh);
    expect(SYNTHETIC_ANCHORS.find((s) => s.kind === 'building')).toMatchObject({ anchor: 'point', radiusM: 0.5 });
    expect(SYNTHETIC_ANCHORS.some((s) => s.kind === 'bridge')).toBe(false);
    expect(() => syntheticSet('town' as never, 1)).toThrow(/no synthetic set/);
  }, 120_000);

  it('the outcomes: a related re-derivation hands on all but the churned share; an unrelated town hands on next to nothing; 0 duplicate ids', () => {
    for (const name of ['district', 'city', 'city-unrelated', 'metropolis'] as const) {
      const set = syntheticSet(name, 3);
      const r = match(set.old, set.fresh, set.anchors);
      const n = set.old.length;
      expect(r.counts.succeed + r.counts.tombstone).toBe(n);
      expect(r.counts.succeed + r.counts.fresh).toBe(set.fresh.length);
      const addresses = [...r.addressOf.values()];
      expect(new Set(addresses).size).toBe(addresses.length);
      if (name === 'city-unrelated') expect(r.counts.succeed).toBeLessThan(0.1 * n);
      else expect(r.counts.succeed).toBeGreaterThan(0.93 * n);
      console.log(`[M0-d-05b] ${name}: ${JSON.stringify(r.counts)}`);
    }
  }, 120_000);

  it('runs each set through the harness and reports per-entity time in the record shape (CONTENDED; nothing asserted on a time)', () => {
    for (const name of ['district', 'city', 'city-unrelated', 'metropolis'] as const) {
      const set = syntheticSet(name, 11);
      const rec = timeMatch(set, () => performance.now(), 3);
      say(rec);
      expect(rec).toMatchObject({ item: 'M0-d-05b', set: name, seed: 11, repeats: 3, status: 'contended' });
      expect(rec.point.budgetUs).toBe(MATCH_BUDGET_US.point);
      expect(rec.overlap.budgetUs).toBe(MATCH_BUDGET_US.overlap);
      expect(rec.point.entities + rec.overlap.entities).toBe(set.old.length);
      expect(rec.point.samplesUs).toHaveLength(3);
      for (const k of rec.perKind) {
        expect(k.samplesUs).toHaveLength(3);
        expect(Number.isFinite(k.medianUs) && k.medianUs >= 0).toBe(true);
      }
      expect(rec.counts.succeed + rec.counts.tombstone).toBe(set.old.length);
    }
  }, 120_000);

  it('the harness reads only the clock it is handed: a fake clock gives exact per-entity values and medians, the whole call counted', () => {
    const set = syntheticSet('district', 2);
    let t = 0;
    let reads = 0;
    // Each read advances 0.45 ms. Per repeat four reads: the call's begin, building's begin and end, the call's end —
    // the call 1.35 ms, building's span 0.45 ms, the unprobed 0.9 ms all building's (its only kind): 1350 µs / 450 = 3 µs.
    const rec = timeMatch(
      set,
      () => {
        reads += 1;
        return (t += 0.45);
      },
      5,
      'timing-phase',
    );
    expect(reads).toBe(4 * 5);
    expect(rec.status).toBe('timing-phase');
    expect(rec.callMs).toHaveLength(5);
    for (const c of rec.callMs) expect(c).toBeCloseTo(1.35, 9);
    expect(rec.perKind).toHaveLength(1);
    expect(rec.perKind[0]).toMatchObject({ kind: 'building', anchorClass: 'point', entities: 450 });
    for (const v of rec.perKind[0].samplesUs) expect(v).toBeCloseTo(3, 9);
    expect(rec.perKind[0].medianUs).toBeCloseTo(3, 9);
    for (const v of rec.point.samplesUs) expect(v).toBeCloseTo(3, 9);
    expect(rec.point.medianUs).toBeCloseTo(3, 9);
    expect(rec.overlap).toMatchObject({ entities: 0, medianUs: 0 });
    expect(() => timeMatch(set, () => 0, 0)).toThrow(/at least one repeat/);
  });

  it('every millisecond of a call counts: the unprobed time is shared by re-derived entities and the classes add up to the call (C-0190)', () => {
    // One junction (point) and two water bodies (overlap), nothing fresh. Reads at 0.5, 1.0, …: the call begins (0.5),
    // water's span (1.0 – 1.5), junction's span (2.0 – 2.5), the call ends (3.0). The call 2.5 ms; spans 0.5 ms each;
    // the unprobed 1.5 ms shared 1 : 2 — junction 0.5 + 0.5 = 1 ms over 1 entity, water 0.5 + 1 = 1.5 ms over 2.
    const W = (id: string, x: number): MatchEntity => ({ id, kind: 'water', lineage: L(1), anchor: { area: rect(x, 0, x + 1000, 1000) } });
    const pair = { name: 'mixed', seed: 0, old: [pointEntity('junction', 'junction:j', 0, 0), W('water:a', 0), W('water:b', 5000)], fresh: [], anchors: resolveAnchors(M0_ANCHORS, () => 30) };
    let t = 0;
    let reads = 0;
    const rec = timeMatch(
      pair,
      () => {
        reads += 1;
        return (t += 0.5);
      },
      3,
    );
    expect(reads).toBe(6 * 3);
    expect(rec.callMs).toEqual([2.5, 2.5, 2.5]);
    expect(rec.point).toMatchObject({ entities: 1, samplesUs: [1000, 1000, 1000], medianUs: 1000 });
    expect(rec.overlap).toMatchObject({ entities: 2, samplesUs: [750, 750, 750], medianUs: 750 });
    expect(rec.perKind.map((k) => [k.kind, k.medianUs])).toEqual([
      ['water', 750],
      ['junction', 1000],
    ]);
    // The classes' times add up to the whole call, repeat by repeat.
    for (let r = 0; r < 3; r += 1) expect(rec.point.samplesUs[r] * rec.point.entities + rec.overlap.samplesUs[r] * rec.overlap.entities).toBe(rec.callMs[r] * 1000);
    // No re-derived old entity (a survivor and a fresh one only): no per-entity figure, the call still recorded.
    const none = timeMatch({ ...pair, old: [pointEntity('junction', 'junction:j', 0, 0, { survives: true })], fresh: [W('water:c', 0)] }, () => (t += 0.5), 1);
    expect(none.callMs).toEqual([2.5]);
    expect(none.point).toMatchObject({ entities: 0, samplesUs: [0], medianUs: 0 });
    expect(none.overlap).toMatchObject({ entities: 0, samplesUs: [0], medianUs: 0 });
    expect(none.perKind).toEqual([]);
    // One class with no re-derived entity (C-0190 (3), with the exception hardening round S1's choices row states): the
    // junction re-derived, the only water body a survivor and one fresh. Reads at 0.5 ms steps: the call 2.5 ms, water's
    // span 0.5 ms, junction's 0.5 ms, the unprobed 1.5 ms all the junction's — point 2 ms over 1 entity; the overlap
    // class has no per-entity figure (0), and its span is in no figure: the classes add up to the call less the empty
    // class's spans (2000 = 2500 − 500 µs) (N-2).
    const empty = timeMatch({ ...pair, old: [pointEntity('junction', 'junction:j', 0, 0), { ...W('water:a', 0), survives: true }], fresh: [W('water:c', 0)] }, () => (t += 0.5), 2);
    expect(empty.callMs).toEqual([2.5, 2.5]);
    expect(empty.point).toMatchObject({ entities: 1, samplesUs: [2000, 2000], medianUs: 2000 });
    expect(empty.overlap).toMatchObject({ entities: 0, samplesUs: [0, 0], medianUs: 0 });
    expect(empty.perKind.map((k) => [k.kind, k.medianUs])).toEqual([['junction', 2000]]);
    for (let r = 0; r < 2; r += 1) expect(empty.point.samplesUs[r] * empty.point.entities).toBe(empty.callMs[r] * 1000 - 500);
  });

  it('the probe brackets the whole call: its begin comes before the input checks, its end after every kind', () => {
    const log: string[] = [];
    const probe = (kind: string | null, phase: 'begin' | 'end'): void => {
      log.push(`${kind ?? 'call'} ${phase}`);
    };
    const table = resolveAnchors(M0_ANCHORS, () => 30);
    // A refused input: the call's begin was read before the refusal.
    expect(() => match('x' as never, [], table, { probe })).toThrow(/lists of entities/);
    expect(log).toEqual(['call begin']);
    log.length = 0;
    expect(() => match([{ id: 'junction:j' } as never], [], table, { probe })).toThrow(RangeError);
    expect(log).toEqual(['call begin']);
    log.length = 0;
    match([pointEntity('junction', 'junction:j', 0, 0)], [pointEntity('junction', 'junction:k', 0, 0)], table, { probe });
    expect(log).toEqual(['call begin', 'junction begin', 'junction end', 'call end']);
    // C-0190 (1): the call's end probe fires after the frozen result is built — the carry list sorted and every part of
    // the result frozen before it; no freeze (and so no sort of the frozen carry list) after it (N-1).
    const freeze = vi.spyOn(Object, 'freeze');
    let atEnd = -1;
    try {
      const r = match(
        [pointEntity('junction', 'junction:z', 0, 0, { lineage: L(1, 1) }), pointEntity('cell', 'cell:b', 9000, 0, { lineage: L(2, 2) })],
        [pointEntity('junction', 'junction:w', 10, 0, { lineage: L(1, 3) }), pointEntity('cell', 'cell:y', 9010, 0, { lineage: L(2, 4) })],
        table,
        {
          probe: (kind, phase) => {
            if (kind === null && phase === 'end') atEnd = freeze.mock.calls.length;
          },
        },
      );
      const after = freeze.mock.calls.length;
      expect(atEnd).toBeGreaterThan(0);
      expect(after).toBe(atEnd);
      // The junction is matched before the cell, so the sort had work to do before the end probe.
      expect(r.carry.map((c) => c.id)).toEqual(['cell:b', 'junction:z']);
      for (const part of [r, r.outcomes, r.carry, r.counts, r.perKind.get('cell'), r.perKind.get('junction')]) expect(Object.isFrozen(part)).toBe(true);
    } finally {
      freeze.mockRestore();
    }
  });

  it('the classes add up to the whole call on a real set under an irregular clock', () => {
    const set = syntheticSet('city', 4);
    let t = 0;
    let k = 0;
    // A clock advancing by an irregular, deterministic step.
    const rec = timeMatch(set, () => (t += 0.125 * (1 + ((k += 1) % 7))), 2);
    for (let r = 0; r < 2; r += 1) {
      const sum = rec.point.samplesUs[r] * rec.point.entities + rec.overlap.samplesUs[r] * rec.overlap.entities;
      expect(sum).toBeCloseTo(rec.callMs[r] * 1000, 6);
    }
  }, 120_000);
});
