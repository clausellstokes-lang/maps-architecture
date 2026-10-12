// M0-d-05b: §6.3's matching of point-anchored kinds — candidate pairs within the kind's radius and of one class family,
// sorted by (distance, old id, fresh id) and assigned one-to-one greedily, so coincident anchors resolve by id; the
// grid only gathers candidates (a pair is one by its exact distance, never by sharing a cell). The listed test
// "coincident anchors resolve by id; a one-to-one greedy assignment on 10⁴ random anchor sets equals a brute-force
// reference" is here, with the outcomes (survive / succeed / tombstone / fresh), the carry events, the hand-on of names,
// the supersedes table, the per-partition switch and the refusals.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { checkAnchors, match, M0_ANCHORS, resolveAnchors, type AnchorSpec, type MatchEntity, type MatchResult } from '../../src/index.js';
import { generator, intIn, L, pointEntity, rect } from './support.js';

/** M0's table with the bridge band read as 30 m (a stand-in value for the cell; the tests never read the table). */
const TABLE = resolveAnchors(M0_ANCHORS, () => 30);

const ONE: AnchorSpec[] = [{ kind: 'junction', anchor: 'point', text: 'position', radiusM: 1, family: 'kind' }];

/** The brute-force reference: every pair, exact distance, the sort key spelled out, greedy. Old id → fresh id. */
function reference(old: MatchEntity[], fresh: MatchEntity[], radiusCm: number): Map<string, string> {
  const pairs: { d2: number; o: string; f: string }[] = [];
  for (const o of old) {
    for (const f of fresh) {
      if ((o.family ?? '') !== (f.family ?? '')) continue;
      const a = o.anchor as { point: { x: number; y: number } };
      const b = f.anchor as { point: { x: number; y: number } };
      const d2 = (a.point.x - b.point.x) ** 2 + (a.point.y - b.point.y) ** 2;
      if (d2 <= radiusCm * radiusCm) pairs.push({ d2, o: o.id, f: f.id });
    }
  }
  const cmp = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
  pairs.sort((p, q) => p.d2 - q.d2 || cmp(p.o, q.o) || cmp(p.f, q.f));
  const out = new Map<string, string>();
  const taken = new Set<string>();
  for (const p of pairs) {
    if (out.has(p.o) || taken.has(p.f)) continue;
    out.set(p.o, p.f);
    taken.add(p.f);
  }
  return out;
}

const succession = (r: MatchResult): Map<string, string> => {
  const out = new Map<string, string>();
  for (const o of r.outcomes) if (o.outcome === 'succeed') out.set(o.id, o.fresh);
  return out;
};

describe('the greedy one-to-one assignment (§6.3)', () => {
  it('coincident anchors resolve by id: the lowest old id takes the lowest fresh id', () => {
    const old = [pointEntity('junction', 'junction:b', 500, 500), pointEntity('junction', 'junction:a', 500, 500)];
    const fresh = [pointEntity('junction', 'junction:z', 500, 500), pointEntity('junction', 'junction:y', 500, 500)];
    const r = match(old, fresh, ONE);
    expect(succession(r)).toEqual(new Map([['junction:a', 'junction:y'], ['junction:b', 'junction:z']]));
    // The same in any input order.
    const r2 = match([...old].reverse(), [...fresh].reverse(), ONE);
    expect(succession(r2)).toEqual(succession(r));
    expect(r2.outcomes).toEqual(r.outcomes);
  });

  it('a nearer pair wins before the id order; ties in distance go by old id, then fresh id', () => {
    // o:a is 70.7 cm from f:x and 30 cm from f:y; o:b is 30 cm from f:y and 122 cm from f:x. (30, a, y) sorts first.
    const old = [pointEntity('junction', 'junction:a', 0, 0), pointEntity('junction', 'junction:b', 0, 60)];
    const fresh = [pointEntity('junction', 'junction:x', -50, -50), pointEntity('junction', 'junction:y', 0, 30)];
    expect(succession(match(old, fresh, ONE))).toEqual(new Map([['junction:a', 'junction:y']]));
    // b's only candidate within 1 m is y; a's are y and x; (30, a, y) < (30, b, y) < (70.7, a, x), so b is left and x fresh.
    const r = match(old, fresh, ONE);
    expect(r.old.get('junction:b')?.outcome).toBe('tombstone');
    expect(r.outcomes.filter((o) => o.outcome === 'fresh').map((o) => o.id)).toEqual(['junction:x']);
  });

  it('the radius is inclusive and exact: 100 cm matches, 101 cm and a 71 × 71 cm diagonal (100.4 cm) do not', () => {
    const at = (x: number, y: number): MatchResult => match([pointEntity('junction', 'junction:o', 0, 0)], [pointEntity('junction', 'junction:f', x, y)], ONE);
    expect(at(100, 0).counts.succeed).toBe(1);
    expect(at(0, -100).counts.succeed).toBe(1);
    expect(at(60, 80).counts.succeed).toBe(1);
    expect(at(101, 0).counts.succeed).toBe(0);
    expect(at(71, 71).counts.succeed).toBe(0);
  });

  it('matches by distance, never by quantised cell: pairs across a cell border match, pairs in one cell beyond the radius do not', () => {
    // The grid's cell is the radius (100 cm): (99, 0) and (100, 0) lie in different cells, 1 cm apart.
    const r = match([pointEntity('junction', 'junction:o', 99, 0)], [pointEntity('junction', 'junction:f', 100, 0)], ONE);
    expect(r.counts.succeed).toBe(1);
    // The far corners of one cell, (0, 0) and (99, 99), are 140 cm apart and are no pair.
    const s = match([pointEntity('junction', 'junction:o', 0, 0)], [pointEntity('junction', 'junction:f', 99, 99)], ONE);
    expect(s.counts.succeed).toBe(0);
    // Negative coordinates: the cell index floors.
    const t = match([pointEntity('junction', 'junction:o', -1, -1)], [pointEntity('junction', 'junction:f', -100, -1)], ONE);
    expect(t.counts.succeed).toBe(1);
  });

  it('candidates are of the same class family', () => {
    const old = [pointEntity('junction', 'junction:o', 0, 0, { family: 'gate' })];
    const fresh = [pointEntity('junction', 'junction:f', 0, 0, { family: 'plain' }), pointEntity('junction', 'junction:g', 90, 0, { family: 'gate' })];
    expect(succession(match(old, fresh, ONE))).toEqual(new Map([['junction:o', 'junction:g']]));
  });

  it('equals a brute-force reference on 10⁴ random anchor sets (coincident anchors, two families, radius-edge distances)', () => {
    const rnd = generator(0x05b);
    let pairs = 0;
    for (let s = 0; s < 10_000; s += 1) {
      const no = intIn(rnd, 0, 9);
      const nf = intIn(rnd, 0, 9);
      const spread = intIn(rnd, 0, 3) === 0 ? 2 : 400;
      const make = (side: string, n: number): MatchEntity[] => {
        const out: MatchEntity[] = [];
        const ids = new Set<string>();
        while (out.length < n) {
          const id = `junction:${side}${intIn(rnd, 0, 40)}`;
          if (ids.has(id)) continue;
          ids.add(id);
          // Coordinates on a coarse step so ties in distance are frequent; some exactly 100 cm apart.
          const x = intIn(rnd, -spread, spread) * (spread === 2 ? 50 : 1);
          const y = intIn(rnd, -spread, spread) * (spread === 2 ? 50 : 1);
          out.push(pointEntity('junction', id, x, y, { family: intIn(rnd, 0, 4) === 0 ? 'b' : 'a' }));
        }
        return out;
      };
      const old = make('o', no);
      const fresh = make('f', nf);
      const want = reference(old, fresh, 100);
      const got = succession(match(old, fresh, ONE));
      expect(got).toEqual(want);
      pairs += want.size;
    }
    expect(pairs).toBeGreaterThan(5_000);
  });

  it('is independent of the input order (property)', () => {
    fc.assert(
      fc.property(
        fc.array(fc.tuple(fc.integer({ min: 0, max: 30 }), fc.integer({ min: -300, max: 300 }), fc.integer({ min: -300, max: 300 })), { maxLength: 12 }),
        fc.array(fc.tuple(fc.integer({ min: 0, max: 30 }), fc.integer({ min: -300, max: 300 }), fc.integer({ min: -300, max: 300 })), { maxLength: 12 }),
        fc.integer({ min: 0, max: 1000 }),
        (os, fs, seed) => {
          const dedupe = (xs: [number, number, number][], side: string): MatchEntity[] => {
            const seen = new Set<number>();
            return xs.filter(([i]) => !seen.has(i) && (seen.add(i), true)).map(([i, x, y]) => pointEntity('junction', `junction:${side}${i}`, x, y));
          };
          const old = dedupe(os, 'o');
          const fresh = dedupe(fs, 'f');
          const shuffle = <T>(xs: T[]): T[] => {
            const rnd = generator(seed);
            const a = [...xs];
            for (let i = a.length - 1; i > 0; i -= 1) {
              const j = Math.floor(rnd() * (i + 1));
              [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
          };
          const a = match(old, fresh, ONE);
          const b = match(shuffle(old), shuffle(fresh), ONE);
          expect(b.outcomes).toEqual(a.outcomes);
          expect(succession(a)).toEqual(reference(old, fresh, 100));
        },
      ),
    );
  });
});

describe('the outcomes (§6.3 Carry-over)', () => {
  it('a survivor keeps its address and takes no part in matching; a successor takes the address and the name; the rest are tombstones and fresh', () => {
    const old = [
      pointEntity('block', 'block:keep', 0, 0, { survives: true, name: 'Kept' }),
      pointEntity('block', 'block:a', 1000, 0, { name: 'Alder', lineage: L(1, 1) }),
      pointEntity('block', 'block:gone', 5000, 0),
    ];
    const fresh = [pointEntity('block', 'block:n1', 1150, 0, { lineage: L(9, 9) }), pointEntity('block', 'block:n2', 0, 50), pointEntity('block', 'block:n3', 9000, 0)];
    const r = match(old, fresh, TABLE);
    expect(r.old.get('block:keep')).toEqual({ outcome: 'survive', kind: 'block', id: 'block:keep' });
    expect(r.old.get('block:a')).toEqual({ outcome: 'succeed', kind: 'block', id: 'block:a', fresh: 'block:n1', by: 'point', score: 150, name: { text: 'Alder' } });
    expect(r.old.get('block:gone')?.outcome).toBe('tombstone');
    // A survivor is no candidate: n2 lies on it, yet stays fresh.
    expect(r.outcomes.filter((o) => o.outcome === 'fresh').map((o) => o.id)).toEqual(['block:n2', 'block:n3']);
    expect(r.addressOf.get('block:n1')).toBe('block:a');
    expect(r.addressOf.get('block:n2')).toBe('block:n2');
    expect(r.handedOn).toEqual(new Map([['block:n1', 'block:a']]));
    expect(r.counts).toEqual({ survive: 1, succeed: 1, tombstone: 1, fresh: 2 });
    expect(r.perKind.get('block')).toEqual({ survive: 1, succeed: 1, tombstone: 1, fresh: 2 });
    expect(r.fallback).toBeNull();
  });

  it('writes a carry event only when the successor\'s lineage differs (a faithful re-derivation writes none, J-DET-2)', () => {
    const old = [pointEntity('cell', 'cell:a', 0, 0, { lineage: L(5, 6) }), pointEntity('cell', 'cell:b', 9000, 0, { lineage: L(7, 8) })];
    const fresh = [pointEntity('cell', 'cell:x', 10, 0, { lineage: L(5, 6) }), pointEntity('cell', 'cell:y', 9010, 0, { lineage: L(7, 9) })];
    const r = match(old, fresh, TABLE);
    expect(r.counts.succeed).toBe(2);
    expect(r.carry).toEqual([{ id: 'cell:b', entityKind: 'cell', fresh: 'cell:y', lineageFrom: [7, 8], lineageTo: [7, 9] }]);
    // The carry list is in old-id order (UTF-16 code units) across kinds, not in the table's kind order: the junction is
    // matched before the cell, but 'cell:b' sorts before 'junction:z'.
    const two = match(
      [pointEntity('junction', 'junction:z', 0, 0, { lineage: L(1, 1) }), old[1]],
      [pointEntity('junction', 'junction:w', 10, 0, { lineage: L(1, 2) }), fresh[1]],
      TABLE,
    );
    expect(two.carry.map((c) => c.id)).toEqual(['cell:b', 'junction:z']);
  });

  it('a tombstone is superseded by the fresh entity whose region covers its anchor point (the supersedes table), the successor\'s address when it is one', () => {
    const old = [pointEntity('block', 'block:a', 500, 500), pointEntity('block', 'block:b', 3000, 3000), pointEntity('block', 'block:c', 99_000, 0)];
    const fresh = [
      // The successor of b, whose region also covers a's anchor.
      pointEntity('block', 'block:x', 3100, 3000, { region: rect(0, 0, 4000, 4000) }),
      pointEntity('block', 'block:y', 2000, 2000, { region: rect(400, 400, 600, 600) }),
    ];
    const r = match(old, fresh, TABLE);
    expect(r.old.get('block:b')?.outcome).toBe('succeed');
    // a: covered by x (address handed on: block:b) and by y; ties by fresh id → x.
    expect(r.old.get('block:a')).toMatchObject({ outcome: 'tombstone', supersededBy: 'block:b' });
    expect(r.old.get('block:c')).toEqual({ outcome: 'tombstone', kind: 'block', id: 'block:c', lineage: old[2].lineage });
    expect(r.supersedes).toEqual(new Map([['block:a', 'block:b']]));
  });

  it('a bridge matches only on the same river: the water body\'s address or its successor', () => {
    const W = (id: string, x: number): MatchEntity => ({ id, kind: 'water', lineage: L(1), anchor: { area: rect(x, 0, x + 10_000, 10_000) } });
    const old = [W('water:r', 0), W('water:s', 20_000), pointEntity('bridge', 'bridge:o', 5000, 5000, { on: 'water:r' })];
    // The river is re-derived (water:r2 succeeds water:r); a fresh bridge on another river at the same point is no candidate.
    const fresh = [
      W('water:r2', 100),
      W('water:s2', 20_000),
      pointEntity('bridge', 'bridge:wrong', 5000, 5000, { on: 'water:s2' }),
      pointEntity('bridge', 'bridge:right', 6000, 5000, { on: 'water:r2' }),
    ];
    const r = match(old, fresh, TABLE);
    expect(r.old.get('water:r')).toMatchObject({ outcome: 'succeed', fresh: 'water:r2' });
    expect(r.old.get('bridge:o')).toMatchObject({ outcome: 'succeed', fresh: 'bridge:right', score: 1000 });
    // The band is the table cell's: 30 m read; at 31 m the bridge would not match.
    const far = match(old, [...fresh.slice(0, 2), pointEntity('bridge', 'bridge:far', 8100, 5000, { on: 'water:r2' })], resolveAnchors(M0_ANCHORS, () => 31));
    expect(far.old.get('bridge:o')?.outcome).toBe('succeed');
    const near = match(old, [...fresh.slice(0, 2), pointEntity('bridge', 'bridge:far', 8101, 5000, { on: 'water:r2' })], resolveAnchors(M0_ANCHORS, () => 31));
    expect(near.old.get('bridge:o')?.outcome).toBe('tombstone');
  });

  it('key-anchored kinds match by key through the succession of the kinds before them (district by seed feature; seam by its districts and chain)', () => {
    const J = (id: string, x: number): MatchEntity => pointEntity('junction', id, x, 0);
    const D = (id: string, seed: string, family = 'market'): MatchEntity => ({ id, kind: 'district', family, lineage: L(id.length), anchor: { key: [{ ref: seed }] } });
    const S = (id: string, a: string, b: string, chain: string): MatchEntity => ({ id, kind: 'seam', lineage: L(3), anchor: { key: [{ set: [a, b] }, { ref: chain }] } });
    const old = [J('junction:j', 0), J('junction:k', 5000), D('district:d1', 'junction:j'), D('district:d2', 'junction:k'), S('seam:s', 'district:d1', 'district:d2', 'junction:j')];
    const fresh = [
      J('junction:J', 20),
      J('junction:K', 9000),
      D('district:e1', 'junction:J'),
      D('district:e2', 'junction:K'),
      // The districts listed the other way round: a set is unordered.
      S('seam:t', 'district:e2', 'district:e1', 'junction:J'),
    ];
    const r = match(old, fresh, TABLE);
    expect(r.old.get('junction:j')).toMatchObject({ outcome: 'succeed', fresh: 'junction:J' });
    expect(r.old.get('junction:k')?.outcome).toBe('tombstone');
    expect(r.old.get('district:d1')).toMatchObject({ outcome: 'succeed', fresh: 'district:e1', by: 'key', score: 0 });
    // d2's seed feature has no successor; a fresh district on a fresh feature never takes an old address.
    expect(r.old.get('district:d2')?.outcome).toBe('tombstone');
    expect(r.old.get('seam:s')?.outcome).toBe('tombstone');
    // With d2's seed feature surviving, the seam's key resolves and the seam succeeds.
    const old2 = [J('junction:j', 0), { ...J('junction:k', 5000), survives: true }, ...old.slice(2)];
    const fresh2 = [J('junction:J', 20), D('district:e1', 'junction:J'), D('district:e2', 'junction:k'), S('seam:t', 'district:e2', 'district:e1', 'junction:J')];
    const r2 = match(old2, fresh2, TABLE);
    expect(r2.old.get('district:d2')).toMatchObject({ outcome: 'succeed', fresh: 'district:e2' });
    expect(r2.old.get('seam:s')).toMatchObject({ outcome: 'succeed', fresh: 'seam:t' });
    // The class family is part of the key.
    const r3 = match(old2, [fresh2[0], D('district:e1', 'junction:J', 'harbour'), ...fresh2.slice(2)], TABLE);
    expect(r3.old.get('district:d1')?.outcome).toBe('tombstone');
  });

  it('a fresh reference to a fresh entity never equals an old address, even when its provisional id spells one (C-0188 (2))', () => {
    // The river is re-derived far away under the same natural address: fresh water:a is no successor of old water:a.
    const W = (id: string, x: number): MatchEntity => ({ id, kind: 'water', lineage: L(1), anchor: { area: rect(x, 0, x + 10_000, 10_000) } });
    const oldRiver = W('water:a', 0);
    const freshRiver = W('water:a', 50_000);
    // A bridge on it at the very same point: the old bridge's river and the fresh bridge's river are different entities.
    const rb = match(
      [oldRiver, pointEntity('bridge', 'bridge:o', 5000, 5000, { on: 'water:a' })],
      [freshRiver, pointEntity('bridge', 'bridge:f', 5000, 5000, { on: 'water:a' })],
      TABLE,
    );
    expect(rb.old.get('water:a')?.outcome).toBe('tombstone');
    expect(rb.old.get('bridge:o')?.outcome).toBe('tombstone');
    expect(rb.handedOn.has('bridge:f')).toBe(false);
    expect(rb.outcomes).toContainEqual({ outcome: 'fresh', kind: 'bridge', id: 'bridge:f' });
    // A district whose seed feature is that river: the same key spelled, no succession.
    const D = (id: string): MatchEntity => ({ id, kind: 'district', family: 'market', lineage: L(id.length), anchor: { key: [{ ref: 'water:a' }] } });
    const rd = match([oldRiver, D('district:o')], [freshRiver, D('district:f')], TABLE);
    expect(rd.old.get('district:o')?.outcome).toBe('tombstone');
    expect(rd.handedOn.has('district:f')).toBe(false);
    // The control: the river re-derived in place succeeds, and the bridge and the district succeed with it.
    const near = W('water:a', 100);
    expect(match([oldRiver, pointEntity('bridge', 'bridge:o', 5000, 5000, { on: 'water:a' })], [near, pointEntity('bridge', 'bridge:f', 5000, 5000, { on: 'water:a' })], TABLE).old.get('bridge:o')).toMatchObject({ outcome: 'succeed', fresh: 'bridge:f' });
    expect(match([oldRiver, D('district:o')], [near, D('district:f')], TABLE).old.get('district:o')).toMatchObject({ outcome: 'succeed', fresh: 'district:f' });
  });

  it('the per-partition switch (off by default) takes a same-partition candidate first, and says so (a declared shift)', () => {
    const old = [pointEntity('cell', 'cell:o', 0, 0, { partition: 'district:a' })];
    const fresh = [pointEntity('cell', 'cell:near', 100, 0, { partition: 'district:b' }), pointEntity('cell', 'cell:mine', 400, 0, { partition: 'district:a' })];
    const off = match(old, fresh, TABLE);
    expect(off.old.get('cell:o')).toMatchObject({ fresh: 'cell:near' });
    expect(off.fallback).toBeNull();
    const on = match(old, fresh, TABLE, { perPartition: true });
    expect(on.old.get('cell:o')).toMatchObject({ fresh: 'cell:mine' });
    expect(on.fallback).toBe('per-partition');
    // Left unmatched in its partition, an entity is matched across partitions.
    const cross = match(old, [fresh[0]], TABLE, { perPartition: true });
    expect(cross.old.get('cell:o')).toMatchObject({ fresh: 'cell:near' });
  });
});

describe('the anchor table as data (§6.3; M0\'s kinds)', () => {
  it('holds the eleven M0 kinds with §6.3\'s radii and the bridge band as a table cell', () => {
    expect(M0_ANCHORS.map((s) => s.kind)).toEqual(['water', 'enceinte', 'junction', 'gate', 'portal', 'block', 'cell', 'bridge', 'way', 'district', 'seam']);
    const radius = Object.fromEntries(M0_ANCHORS.map((s) => [s.kind, s.radiusM]));
    expect(radius).toMatchObject({ junction: 1, gate: 2, portal: 1, block: 2, cell: 5 });
    expect(radius.bridge).toEqual({ table: 'terrain', row: 'crossing', cell: 'searchBandM' });
    expect(M0_ANCHORS.filter((s) => s.anchor === 'overlap' || s.anchor === 'ends').every((s) => s.overlap === 0.5)).toBe(true);
    expect(() => checkAnchors(M0_ANCHORS)).toThrow(/not yet read/);
    expect(checkAnchors(TABLE).get('bridge')?.radiusCm).toBe(3000);
  });

  it('refuses a malformed table', () => {
    const j = ONE[0];
    expect(() => checkAnchors([j, j])).toThrow(/twice/);
    expect(() => checkAnchors([{ ...j, anchor: 'nearest' as never }])).toThrow(/anchor type/);
    expect(() => checkAnchors([{ ...j, radiusM: 0.001 }])).toThrow(/below 1 cm/);
    expect(() => checkAnchors([{ ...j, radiusM: undefined }])).toThrow(/radius/);
    expect(() => checkAnchors([{ ...j, on: 'water' }])).toThrow(/does not match before it/);
    expect(() => checkAnchors([{ kind: 'water', anchor: 'overlap', text: '', family: 'kind' }])).toThrow(/overlap threshold/);
    expect(() => resolveAnchors(M0_ANCHORS, () => -1)).toThrow(/positive radius/);
  });

  it('refuses malformed entities and inputs', () => {
    const o = pointEntity('junction', 'junction:a', 0, 0);
    expect(() => match([o, o], [], ONE)).toThrow(/given twice/);
    expect(() => match([], [o, o], ONE)).toThrow(/given twice/);
    // A fresh provisional id may equal a survivor's address (the mint resolves it); naming it from a fresh anchor is ambiguous.
    expect(match([{ ...o, survives: true }], [o], ONE).counts).toEqual({ survive: 1, succeed: 0, tombstone: 0, fresh: 1 });
    const dk = (id: string, ref: string): MatchEntity => ({ id, kind: 'district', lineage: L(1), anchor: { key: [{ ref }] } });
    const jk = pointEntity('junction', 'junction:j', 0, 0);
    expect(() => match([{ ...jk, survives: true }], [jk, dk('district:d', 'junction:j')], TABLE)).toThrow(/both a fresh provisional id and a survivor's address/);
    expect(() => match([{ ...o, kind: 'plot' }], [], ONE)).toThrow(/no row/);
    expect(() => match([{ ...o, anchor: { point: { x: 0.5, y: 0 } } as never }], [], ONE)).toThrow(/lattice point/);
    expect(() => match([{ ...o, anchor: { point: { x: 2 ** 25, y: 0 } } as never }], [], ONE)).toThrow(/lattice point/);
    expect(() => match([{ ...o, lineage: [1] as never }], [], ONE)).toThrow(/u32/);
    expect(() => match([{ ...o, lineage: [-1, 0] as never }], [], ONE)).toThrow(/u32/);
    for (const lineage of [[0, -1], [0, 1.5], [0, 2 ** 32], [1, 2, 3]]) {
      expect(() => match([{ ...o, lineage: lineage as never }], [], ONE)).toThrow(/match: the old entity junction:a's lineage is not two u32 lanes/);
      expect(() => match([], [{ ...o, lineage: lineage as never }], ONE)).toThrow(/match: the fresh entity junction:a's lineage is not two u32 lanes/);
    }
    expect(() => match([], [{ ...o, survives: false }], ONE)).toThrow(/old entity's flag/);
    expect(() => match([{ ...o, anchor: { area: rect(0, 0, 1, 1) } } as never], [], ONE)).toThrow(/not a point/);
    expect(() => match([{ ...o, id: '' }], [], ONE)).toThrow(/no id/);
    expect(() => match([{ id: 'water:w', kind: 'water', lineage: L(1), anchor: { area: rect(0, 0, 0, 5) } }], [], TABLE)).toThrow(/zero area/);
    // An anchor naming an entity the table matches after its own kind.
    const d = { id: 'district:d', kind: 'district', lineage: L(1), anchor: { key: [{ ref: 'seam:s' }] } };
    const s = { id: 'seam:s', kind: 'seam', lineage: L(1), anchor: { key: [] } };
    expect(() => match([d, s], [], TABLE)).toThrow(/matches after it/);
    expect(() => match([], [d, s], TABLE)).toThrow(/matches after it/);
    expect(() => match([{ ...d, anchor: { key: [{ ref: 'x', lit: 'y' }] } } as never], [], TABLE)).toThrow(/one of ref, set, lit/);
  });
});
