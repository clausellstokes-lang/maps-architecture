// M0-d-05b: the overlap-anchored kinds (§6.3) — the listed test "a way matched by end junctions, else by overlap ≥ 50 %",
// an area by IoU ≥ 0.5, and the geometry under them (the IoU of two areas, the share of a spine lying on another within
// the kernel's attraction distance), checked against closed forms.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { match, M0_ANCHORS, resolveAnchors, WAY_OVERLAP_CM, type MatchEntity } from '../../src/index.js';
import { coversPoint, intersectionArea, iou, lineShare, prepareArea, prepareLine } from '../../src/match/geometry.js';
import { areaEntity, P, pointEntity, rect, wayEntity } from './support.js';

const TABLE = resolveAnchors(M0_ANCHORS, () => 30);
const J = (id: string, x: number, y: number, o: { survives?: boolean } = {}): MatchEntity => pointEntity('junction', id, x, y, o);

describe('a way matched by end junctions, else by overlap ≥ 50 % (§6.3)', () => {
  it('by its end junctions\' addresses, read through their succession, in either order, whatever its spine', () => {
    const old = [J('junction:a', 0, 0), J('junction:b', 10_000, 0), wayEntity('way:w', ['junction:a', 'junction:b'], [[0, 0], [10_000, 0]])];
    const fresh = [
      J('junction:A', 30, 0),
      J('junction:B', 10_000, 40),
      // The spine bent far away: no overlap, yet the ends match.
      wayEntity('way:v', ['junction:B', 'junction:A'], [[10_000, 40], [5_000, 8_000], [30, 0]]),
    ];
    const r = match(old, fresh, TABLE);
    expect(r.old.get('way:w')).toMatchObject({ outcome: 'succeed', fresh: 'way:v', by: 'key', score: 0 });
  });

  it('the end pair is unordered on both sides: the old way\'s ends reversed, and both reversed (C-0188 (5))', () => {
    const js = [J('junction:a', 0, 0), J('junction:b', 10_000, 0)];
    const freshJs = [J('junction:A', 30, 0), J('junction:B', 10_000, 40)];
    // No spine overlap: only the ends can match.
    const farSpine: [number, number][] = [[0, 40_000], [10_000, 40_000]];
    for (const [oldEnds, freshEnds] of [
      [['junction:b', 'junction:a'], ['junction:A', 'junction:B']],
      [['junction:b', 'junction:a'], ['junction:B', 'junction:A']],
      [['junction:a', 'junction:b'], ['junction:B', 'junction:A']],
    ] as [[string, string], [string, string]][]) {
      const old = [...js, wayEntity('way:w', oldEnds, [[0, 0], [10_000, 0]])];
      const fresh = [...freshJs, wayEntity('way:v', freshEnds, farSpine)];
      expect(match(old, fresh, TABLE).old.get('way:w')).toMatchObject({ outcome: 'succeed', fresh: 'way:v', by: 'key', score: 0 });
    }
  });

  it('by surviving end junctions too; two fresh ways on one pair of ends go by fresh id', () => {
    const old = [J('junction:a', 0, 0, { survives: true }), J('junction:b', 10_000, 0, { survives: true }), wayEntity('way:w', ['junction:a', 'junction:b'], [[0, 0], [10_000, 0]])];
    const fresh = [wayEntity('way:y', ['junction:a', 'junction:b'], [[0, 0], [10_000, 0]]), wayEntity('way:x', ['junction:b', 'junction:a'], [[0, 0], [5_000, 50], [10_000, 0]])];
    const r = match(old, fresh, TABLE);
    expect(r.old.get('way:w')).toMatchObject({ outcome: 'succeed', fresh: 'way:x', by: 'key' });
  });

  it('else by the overlap of its length: 60 % within the attraction distance succeeds, 40 % does not', () => {
    // The old ends leave no successor (re-derived far away), so the ends cannot match.
    const base = [J('junction:a', 0, 0), J('junction:b', 10_000, 0), wayEntity('way:w', ['junction:a', 'junction:b'], [[0, 0], [10_000, 0]])];
    const ends = [J('junction:p', 0, 50_000), J('junction:q', 9_000, 50_000)];
    const at = (x1: number, off: number): MatchEntity[] => [...ends, wayEntity('way:v', ['junction:p', 'junction:q'], [[0, off], [x1, off], [x1, 30_000]])];
    const r60 = match(base, at(6_000, 20), TABLE);
    expect(r60.old.get('way:w')).toMatchObject({ outcome: 'succeed', fresh: 'way:v', by: 'overlap' });
    // 6 000 cm along the first segment plus the reach of the bend's 26 cm disk past it at a 20 cm offset.
    expect((r60.old.get('way:w') as { score: number }).score).toBeCloseTo((6_000 + Math.sqrt(26 * 26 - 20 * 20)) / 10_000, 12);
    // Exactly half: the threshold is inclusive.
    expect(match(base, at(5_000, 20), TABLE).old.get('way:w')?.outcome).toBe('succeed');
    const r40 = match(base, at(4_000, 20), TABLE);
    expect(r40.old.get('way:w')).toMatchObject({ outcome: 'tombstone', supersededBy: 'way:v' });
    // Beyond the attraction distance (26 cm) nothing lies on the old spine.
    const far = match(base, at(9_000, WAY_OVERLAP_CM + 1), TABLE);
    expect(far.old.get('way:w')).toEqual({ outcome: 'tombstone', kind: 'way', id: 'way:w', lineage: base[2].lineage });
  });

  it('the larger overlap wins; the class family must agree', () => {
    const old = [wayEntity('way:w', [null, null], [[0, 0], [10_000, 0]], { family: 'street' })];
    const fresh = [
      wayEntity('way:a', [null, null], [[0, 10], [7_000, 10]], { family: 'street' }),
      wayEntity('way:b', [null, null], [[0, -10], [9_000, -10]], { family: 'street' }),
      wayEntity('way:c', [null, null], [[0, 0], [10_000, 0]], { family: 'lane' }),
    ];
    const r = match(old, fresh, TABLE);
    expect(r.old.get('way:w')).toMatchObject({ fresh: 'way:b', by: 'overlap' });
  });

  it('refuses a spine of fewer than two points or with a repeated point', () => {
    expect(() => match([wayEntity('way:w', [null, null], [[0, 0]])], [], TABLE)).toThrow(/two points/);
    expect(() => match([wayEntity('way:w', [null, null], [[0, 0], [0, 0], [5, 5]])], [], TABLE)).toThrow(/zero-length/);
    expect(() => match([{ ...wayEntity('way:w', [null, null], [[0, 0], [5, 5]]), anchor: { ends: ['a'], line: [] } } as never], [], TABLE)).toThrow(/two ends/);
  });
});

describe('an area matched by IoU ≥ 0.5 (§6.3: enceinte, water body)', () => {
  it('succeeds at IoU ≥ 0.5 and not below; the larger IoU wins', () => {
    const old = [areaEntity('enceinte', 'enceinte:o', rect(0, 0, 1000, 1000))];
    // Shifted by 333 cm: IoU 667 / 1333 ≥ 0.5; by 334 cm: 666 / 1334 < 0.5.
    const half = match(old, [areaEntity('enceinte', 'enceinte:f', rect(0, 333, 1000, 1333))], TABLE);
    expect(half.old.get('enceinte:o')?.outcome).toBe('succeed');
    const below = match(old, [areaEntity('enceinte', 'enceinte:f', rect(0, 334, 1000, 1334))], TABLE);
    expect(below.old.get('enceinte:o')).toMatchObject({ outcome: 'tombstone', supersededBy: 'enceinte:f' });
    // IoU exactly 0.5 (I = 10⁶ cm², U = 2 · 10⁶ cm²): the threshold is inclusive.
    const exact = match(old, [areaEntity('enceinte', 'enceinte:f', rect(0, 0, 1000, 2000))], TABLE);
    expect(exact.old.get('enceinte:o')).toMatchObject({ outcome: 'succeed', score: 0.5 });
    const two = match(old, [areaEntity('enceinte', 'enceinte:a', rect(0, 100, 1000, 1100)), areaEntity('enceinte', 'enceinte:b', rect(0, 50, 1000, 1050))], TABLE);
    expect(two.old.get('enceinte:o')).toMatchObject({ fresh: 'enceinte:b', by: 'overlap' });
    expect((two.old.get('enceinte:o') as { score: number }).score).toBeCloseTo(950 / 1050, 12);
  });
});

describe('the geometry (closed forms)', () => {
  const box = (a: number[]): { x0: number; y0: number; x1: number; y1: number } => ({ x0: Math.min(a[0], a[2]), y0: Math.min(a[1], a[3]), x1: Math.max(a[0], a[2]), y1: Math.max(a[1], a[3]) });

  it('the intersection of two rectangles equals the closed form, in either ring orientation (property)', () => {
    const coord = fc.integer({ min: -2000, max: 2000 });
    fc.assert(
      fc.property(fc.array(coord, { minLength: 4, maxLength: 4 }), fc.array(coord, { minLength: 4, maxLength: 4 }), fc.boolean(), (a, b, flip) => {
        const A = box(a);
        const B = box(b);
        fc.pre(A.x1 > A.x0 && A.y1 > A.y0 && B.x1 > B.x0 && B.y1 > B.y0);
        const ra = rect(A.x0, A.y0, A.x1, A.y1);
        const rb = flip ? ([[...rect(B.x0, B.y0, B.x1, B.y1)[0]].reverse()] as typeof ra) : rect(B.x0, B.y0, B.x1, B.y1);
        const w = Math.max(0, Math.min(A.x1, B.x1) - Math.max(A.x0, B.x0));
        const h = Math.max(0, Math.min(A.y1, B.y1) - Math.max(A.y0, B.y0));
        const pa = prepareArea(ra, 'a');
        const pb = prepareArea(rb, 'b');
        // Crossing parameters are ordinary doubles (§6.5): the area agrees to a part in 10⁹.
        const tol = 1e-9 * Math.max(1, w * h) + 1e-6;
        expect(Math.abs(intersectionArea(pa, pb) - w * h)).toBeLessThan(tol);
        expect(Math.abs(intersectionArea(pb, pa) - w * h)).toBeLessThan(tol);
        const u = (A.x1 - A.x0) * (A.y1 - A.y0) + (B.x1 - B.x0) * (B.y1 - B.y0) - w * h;
        expect(iou(pa, pb)).toBeCloseTo((w * h) / u, 9);
      }),
    );
  });

  it('identical areas have IoU 1; touching areas 0; a hole is left out', () => {
    const a = prepareArea(rect(0, 0, 100, 100), 'a');
    expect(iou(a, prepareArea(rect(0, 0, 100, 100), 'b'))).toBe(1);
    expect(iou(a, prepareArea(rect(100, 0, 200, 100), 'b'))).toBe(0);
    const ring = (rect(0, 0, 100, 100) as unknown as unknown[][])[0];
    const hole = (rect(25, 25, 75, 75) as unknown as unknown[][])[0];
    const holed = prepareArea([ring, hole] as never, 'h');
    expect(holed.area).toBe(7500);
    expect(intersectionArea(holed, a)).toBe(7500);
    expect(intersectionArea(holed, prepareArea(rect(25, 25, 75, 75), 'c'))).toBe(0);
    expect(coversPoint(holed, 50, 50)).toBe(false);
    expect(coversPoint(holed, 25, 50)).toBe(true);
    expect(coversPoint(holed, 10, 10)).toBe(true);
    expect(coversPoint(holed, 100, 100)).toBe(true);
    expect(coversPoint(holed, 101, 100)).toBe(false);
    // A triangle against a square: the closed form 0.5 · 100 · 100 ∩ the lower half → 3750.
    const tri = prepareArea([[P(0, 0), P(100, 0), P(0, 100)]] as never, 't');
    expect(intersectionArea(tri, prepareArea(rect(0, 0, 100, 50), 's'))).toBe(3750);
  });

  it('the share of a spine within d of another', () => {
    const a = prepareLine([P(0, 0), P(1000, 0)], 'a');
    expect(lineShare(a, prepareLine([P(0, 10), P(600, 10)], 'b'), 26)).toBeCloseTo((600 + Math.sqrt(26 * 26 - 10 * 10)) / 1000, 12);
    expect(lineShare(a, prepareLine([P(0, 27), P(1000, 27)], 'b'), 26)).toBe(0);
    expect(lineShare(a, prepareLine([P(1000, 0), P(0, 0)], 'b'), 26)).toBe(1);
    // A crossing spine covers only the stretch near the crossing: 2 · 26 cm.
    expect(lineShare(a, prepareLine([P(500, -500), P(500, 500)], 'b'), 26)).toBeCloseTo(52 / 1000, 12);
    // Overlapping pieces are counted once.
    expect(lineShare(a, prepareLine([P(0, 0), P(800, 0), P(200, 5)], 'b'), 26)).toBeCloseTo(826 / 1000, 12);
  });
});
