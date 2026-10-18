// M0-k-01's listed test "the holed polygons' holes are inside the outer ring; the self-touching chains touch" (§13.1
// (1)), with each hole's stated contact checked exactly — disjoint, touching at one point, or sharing a stretch of an
// edge — and the self-touching rings' touches, every check by integer orient2d.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { orient, type LatticePoint } from '@plat/kernel';
import { arb, fuzzParams, fuzzSelfTouches, type FuzzHoleContact, type FuzzHoledPolygon } from '@plat/testkit';
import { isSimpleRing, segmentsMeet } from '../../src/oracles/rings.js';
import { SELF_TEST_RUNS, adjacent, edgesOf, overlap, pointInRing, properCross, twice, within } from './support.js';

/** The points where a hole's boundary meets the outer ring's, as "x,y" keys (exact), and whether they share a stretch. */
function meeting(outer: readonly LatticePoint[], hole: readonly LatticePoint[]): { points: Set<string>; stretch: boolean; crossing: boolean } {
  const points = new Set<string>();
  let stretch = false;
  let crossing = false;
  const oe = edgesOf(outer, true);
  const he = edgesOf(hole, true);
  for (const [a, b] of oe) {
    for (const [c, d] of he) {
      if (properCross(a, b, c, d)) crossing = true;
      if (overlap(a, b, c, d)) stretch = true;
      for (const p of [c, d]) if (pointInRing(p, [a, b]) === 'on') points.add(`${p.x},${p.y}`);
      for (const p of [a, b]) if (pointInRing(p, [c, d]) === 'on') points.add(`${p.x},${p.y}`);
    }
  }
  return { points, stretch, crossing };
}

/**
 * Whether the hole lies inside the outer ring (its closed region): every hole vertex and every hole edge's midpoint in
 * or on the outline, no hole edge crossing an outer edge, no outer vertex inside a hole edge — so each hole edge meets
 * the outline only at its ends or along it, and its midpoint places the rest.
 */
function holeInside(outer: readonly LatticePoint[], hole: readonly LatticePoint[]): boolean {
  const outer2 = outer.map(twice);
  for (const p of hole) if (pointInRing(p, outer) === 'outside') return false;
  for (const [c, d] of edgesOf(hole, true)) {
    if (pointInRing({ x: c.x + d.x, y: c.y + d.y } as LatticePoint, outer2) === 'outside') return false;
    for (const v of outer) {
      const onLine = (d.x - c.x) * (v.y - c.y) - (d.y - c.y) * (v.x - c.x) === 0;
      const atEnd = (v.x === c.x && v.y === c.y) || (v.x === d.x && v.y === d.y);
      if (onLine && within(c, d, v) && !atEnd) return false;
    }
    for (const [a, b] of edgesOf(outer, true)) if (properCross(a, b, c, d)) return false;
  }
  return true;
}

/** Every check of one holed polygon; the failures, empty when all hold. */
function holedProblems(h: FuzzHoledPolygon): string[] {
  const [outer, ...holes] = h.polygon;
  const out: string[] = [];
  if (holes.length === 0 || holes.length !== h.contacts.length) out.push('holes and contacts disagree');
  if (!isSimpleRing(outer) || orient(outer) <= 0) out.push('outer ring not simple and counter-clockwise');
  holes.forEach((hole, j) => {
    const contact: FuzzHoleContact = h.contacts[j];
    if (!isSimpleRing(hole) || orient(hole) >= 0) out.push(`hole ${j} not simple and clockwise`);
    if (!holeInside(outer, hole)) out.push(`hole ${j} not inside the outer ring`);
    const m = meeting(outer, hole);
    if (m.crossing) out.push(`hole ${j} crosses the outer ring`);
    if (contact === 'disjoint') {
      if (m.points.size !== 0 || m.stretch) out.push(`hole ${j} (disjoint) meets the outer ring`);
      if (!hole.every((p) => pointInRing(p, outer) === 'inside')) out.push(`hole ${j} (disjoint) not strictly inside`);
    }
    if (contact === 'vertex' && (m.points.size !== 1 || m.stretch)) out.push(`hole ${j} (vertex) meets the outer ring at ${m.points.size} points`);
    if (contact === 'edge' && !m.stretch) out.push(`hole ${j} (edge) shares no stretch with the outer ring`);
    holes.forEach((other, k) => {
      if (k <= j) return;
      for (const [a, b] of edgesOf(hole, true)) for (const [c, d] of edgesOf(other, true)) if (segmentsMeet(a, b, c, d)) out.push(`holes ${j} and ${k} meet`);
      if (pointInRing(other[0], hole) !== 'outside' || pointInRing(hole[0], other) !== 'outside') out.push(`holes ${j} and ${k} nest`);
    });
  });
  return out;
}

describe("the holed polygons' holes are inside the outer ring (§13.1 (1))", () => {
  for (const contact of ['mixed', 'disjoint', 'vertex', 'edge'] as const) {
    it(`arb.holedPolygon({ contact: '${contact}' }): each hole inside, with its stated contact`, () => {
      fc.assert(
        fc.property(arb.holedPolygon({ contact }), (h) => {
          expect(holedProblems(h)).toEqual([]);
          if (contact !== 'mixed') expect(h.contacts.every((c) => c === contact)).toBe(true);
        }),
        { ...fuzzParams(`fuzz/test/holed/${contact}`), numRuns: SELF_TEST_RUNS },
      );
    }, 120_000);
  }

  it("arb.faceSet('holed'): disjoint holes strictly inside the face", () => {
    fc.assert(
      fc.property(arb.faceSet('holed'), (f) => {
        expect(f.polygon.length).toBeGreaterThanOrEqual(2);
        expect(holedProblems({ polygon: f.polygon, contacts: f.polygon.slice(1).map(() => 'disjoint' as const) })).toEqual([]);
      }),
      { ...fuzzParams('fuzz/test/holed/face'), numRuns: SELF_TEST_RUNS },
    );
  }, 120_000);

  it('the check fails a hole outside, a hole crossing the outline and a disjoint hole touching it (negative controls)', () => {
    const P = (x: number, y: number) => ({ x, y }) as LatticePoint;
    const outer = [P(0, 0), P(100, 0), P(100, 100), P(0, 100)];
    const inside = [P(10, 10), P(10, 20), P(20, 20), P(20, 10)];
    expect(holedProblems({ polygon: [outer, inside], contacts: ['disjoint'] })).toEqual([]);
    const outside = [P(110, 10), P(110, 20), P(120, 20), P(120, 10)];
    expect(holedProblems({ polygon: [outer, outside], contacts: ['disjoint'] })).toContain('hole 0 not inside the outer ring');
    const crossing = [P(90, 10), P(90, 20), P(120, 20), P(120, 10)];
    expect(holedProblems({ polygon: [outer, crossing], contacts: ['disjoint'] })).toContain('hole 0 crosses the outer ring');
    const touching = [P(0, 10), P(10, 20), P(20, 10)];
    expect(holedProblems({ polygon: [outer, touching], contacts: ['disjoint'] })).toContain('hole 0 (disjoint) meets the outer ring');
    expect(holedProblems({ polygon: [outer, touching], contacts: ['vertex'] })).toEqual([]);
    const sharing = [P(0, 20), P(10, 15), P(0, 10)];
    expect(holedProblems({ polygon: [outer, sharing], contacts: ['edge'] })).toEqual([]);
    expect(holedProblems({ polygon: [outer, sharing], contacts: ['vertex'] })).toContain('hole 0 (vertex) meets the outer ring at 2 points');
  });
});

/** The proper crossings between non-adjacent edges of a ring or chain (exact). */
function crossings(r: readonly LatticePoint[], closed: boolean): number {
  const e = edgesOf(r, closed);
  let n = 0;
  for (let i = 0; i < e.length; i += 1) {
    for (let j = i + 1; j < e.length; j += 1) {
      if (adjacent(i, j, e.length, closed)) continue;
      if (properCross(e[i][0], e[i][1], e[j][0], e[j][1])) n += 1;
    }
  }
  return n;
}

describe('the self-touching chains touch (§13.1 (1))', () => {
  it("arb.selfTouching({ shape: 'chain' }): the chain's last vertex lies on an earlier vertex or edge, and nowhere else does it meet itself", () => {
    fc.assert(
      fc.property(arb.selfTouching({ shape: 'chain' }), (c) => {
        const touches = fuzzSelfTouches(c, false);
        expect(touches.length).toBeGreaterThan(0);
        const last = c[c.length - 1];
        for (const t of touches) expect(c[t.vertex]).toEqual(last);
        expect(touches.some((t) => t.vertex === c.length - 1)).toBe(true);
        expect(crossings(c, false)).toBe(0);
      }),
      { ...fuzzParams('fuzz/test/touch/chain'), numRuns: SELF_TEST_RUNS },
    );
  }, 120_000);

  it('arb.selfTouching(): the ring touches itself at one or more points, never crosses, and is counter-clockwise', () => {
    fc.assert(
      fc.property(arb.selfTouching(), (r) => {
        expect(fuzzSelfTouches(r, true).length).toBeGreaterThan(0);
        expect(crossings(r, true)).toBe(0);
        expect(orient(r)).toBe(1);
      }),
      { ...fuzzParams('fuzz/test/touch/ring'), numRuns: SELF_TEST_RUNS },
    );
  }, 120_000);

  it('a simple ring and a crossing-free chain show no touch (negative controls)', () => {
    const P = (x: number, y: number) => ({ x, y }) as LatticePoint;
    expect(fuzzSelfTouches([P(0, 0), P(10, 0), P(10, 10), P(0, 10)], true)).toEqual([]);
    expect(fuzzSelfTouches([P(0, 0), P(10, 0), P(10, 10)], false)).toEqual([]);
    expect(fuzzSelfTouches([P(0, 0), P(10, 0), P(10, 10), P(5, 0)], false).length).toBeGreaterThan(0);
  });
});
