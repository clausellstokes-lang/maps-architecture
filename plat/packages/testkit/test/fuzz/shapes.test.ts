// M0-k-01's unit and property tests of each arbitrary's own promises (the module comments of src/fuzz/): simple and
// counter-clockwise where a ring is built simple, the vertex counts, the near-collinear offsets, the snapped shapes'
// circle, the zero areas, the fields' falloff and bound, the face kinds' shapes and scales, the options' refusals, and
// one seed giving one sample.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { area2Big, orient, snap, type LatticePoint } from '@plat/kernel';
import {
  FUZZ_FACE_KINDS,
  FUZZ_FACE_SCALES,
  FUZZ_FIELD_KINDS,
  arb,
  fuzzHasDuplicateVertex,
  fuzzIsConcaveRing,
  fuzzIsNearCollinear,
  fuzzIsThin,
  fuzzIsZeroAreaChain,
  fuzzIsZeroAreaRing,
  fuzzParams,
} from '@plat/testkit';
import { isSimpleRing } from '../../src/oracles/rings.js';
import { QUADRATIC_RUNS, SELF_TEST_RUNS, allArbitraries, pointInRing } from './support.js';

const runs = (name: string, numRuns = SELF_TEST_RUNS) => ({ ...fuzzParams(`fuzz/test/shapes/${name}`), numRuns });

/** No two consecutive vertices equal (a ring's closing pair too). */
function noDuplicates(r: readonly LatticePoint[], closed: boolean): boolean {
  return !fuzzHasDuplicateVertex(r, closed);
}

describe('rings built simple are simple and counter-clockwise', () => {
  const cases: [string, fc.Arbitrary<LatticePoint[]>, number][] = [
    ['arb.polygon()', arb.polygon(), SELF_TEST_RUNS],
    ['arb.polygon({ vertices: [3, 4], sizeCm: [1, 40] })', arb.polygon({ vertices: [3, 4], sizeCm: [1, 40] }), SELF_TEST_RUNS],
    ['arb.thin()', arb.thin(), SELF_TEST_RUNS],
    ['arb.nearCollinear()', arb.nearCollinear(), SELF_TEST_RUNS],
    ['arb.large()', arb.large(), QUADRATIC_RUNS],
  ];
  for (const [name, a, n] of cases) {
    it(name, () => {
      fc.assert(
        fc.property(a, (r) => {
          expect(isSimpleRing(r)).toBe(true);
          expect(orient(r)).toBe(1);
          expect(noDuplicates(r, true)).toBe(true);
        }),
        runs(name, n),
      );
    }, 120_000);
  }
});

describe('the arbitraries keep their stated counts and classes', () => {
  it('arb.polygon draws 3–40 vertices by default, the stated range when given, exactly k from its sectors', () => {
    fc.assert(
      fc.property(arb.polygon(), arb.polygon({ vertices: [7, 9] }), (a, b) => {
        expect(a.length).toBeGreaterThanOrEqual(3);
        expect(a.length).toBeLessThanOrEqual(40);
        expect(b.length).toBeGreaterThanOrEqual(7);
        expect(b.length).toBeLessThanOrEqual(9);
      }),
      runs('counts'),
    );
  });

  it('arb.large draws ≥ 300 vertices, rings and chains', () => {
    fc.assert(
      fc.property(arb.large(), arb.large({ shape: 'chain' }), (r, c) => {
        expect(r.length).toBeGreaterThanOrEqual(300);
        expect(r.length).toBeLessThanOrEqual(600);
        expect(c.length).toBeGreaterThanOrEqual(300);
        expect(noDuplicates(c, false)).toBe(true);
      }),
      runs('large', QUADRATIC_RUNS),
    );
  });

  it('arb.chain and arb.stroke: 2 or more vertices, no consecutive duplicate', () => {
    fc.assert(
      fc.property(arb.chain(), arb.stroke(), arb.chain({ vertices: [5, 6] }), (c, s, d) => {
        expect(c.length).toBeGreaterThanOrEqual(2);
        expect(c.length).toBeLessThanOrEqual(40);
        expect(s.length).toBeGreaterThanOrEqual(2);
        expect(noDuplicates(c, false) && noDuplicates(s, false)).toBe(true);
        expect([5, 6]).toContain(d.length);
      }),
      runs('chains'),
    );
  });

  it('arb.thin: every ring and chain is thin by the classifier', () => {
    fc.assert(
      fc.property(arb.thin(), arb.thin({ shape: 'chain' }), (r, c) => {
        expect(fuzzIsThin(r)).toBe(true);
        expect(fuzzIsThin(c)).toBe(true);
      }),
      runs('thin'),
    );
  });

  it('arb.nearCollinear: a vertex 0 < d ≤ 2 cm off its neighbours\' line, rings and chains', () => {
    fc.assert(
      fc.property(arb.nearCollinear(), arb.nearCollinear({ shape: 'chain' }), (r, c) => {
        expect(fuzzIsNearCollinear(r, true)).toBe(true);
        expect(fuzzIsNearCollinear(c, false)).toBe(true);
        expect(noDuplicates(c, false)).toBe(true);
      }),
      runs('near'),
    );
  });

  it('arb.regularSnapped: each vertex within √2 / 2 cm of one circle about a lattice-free centre — checked against the vertex mean within 3 cm', () => {
    fc.assert(
      fc.property(arb.regularSnapped({ sizeCm: [100, 1_000_000] }), (r) => {
        expect(r.length).toBeGreaterThanOrEqual(3);
        expect(r.length).toBeLessThanOrEqual(12);
        const cx = r.reduce((s, p) => s + p.x, 0) / r.length;
        const cy = r.reduce((s, p) => s + p.y, 0) / r.length;
        const d = r.map((p) => Math.hypot(p.x - cx, p.y - cy));
        expect(Math.max(...d) - Math.min(...d)).toBeLessThanOrEqual(3);
        expect(isSimpleRing(r)).toBe(true);
        expect(orient(r)).toBe(1);
      }),
      runs('regular'),
    );
  });

  it('arb.zeroArea: an exact twice-area of 0 (rings), one line (chains), no consecutive duplicate', () => {
    fc.assert(
      fc.property(arb.zeroArea(), arb.zeroArea({ shape: 'chain' }), (r, c) => {
        expect(area2Big(r)).toBe(0n);
        expect(fuzzIsZeroAreaRing(r)).toBe(true);
        expect(fuzzIsZeroAreaChain(c)).toBe(true);
        expect(noDuplicates(r, true) && noDuplicates(c, false)).toBe(true);
      }),
      runs('zero'),
    );
  });

  it('arb.duplicated: the base shape with vertices repeated in place, and nothing else', () => {
    fc.assert(
      fc.property(arb.duplicated(), arb.duplicated({ shape: 'chain' }), (r, c) => {
        expect(fuzzHasDuplicateVertex(r, true)).toBe(true);
        expect(fuzzHasDuplicateVertex(c, false)).toBe(true);
        // Without its repeats the ring is a simple counter-clockwise star ring again.
        const base = r.filter((p, i) => i === 0 || p.x !== r[i - 1].x || p.y !== r[i - 1].y);
        if (base.length > 1 && base[0].x === base[base.length - 1].x && base[0].y === base[base.length - 1].y) base.pop();
        expect(isSimpleRing(base)).toBe(true);
      }),
      runs('dup'),
    );
  });
});

describe('arb.field: displacement fields for warps', () => {
  it('draws every kind', () => {
    const kinds = new Set(fc.sample(arb.field(), { ...fuzzParams('fuzz/test/field/kinds'), numRuns: 300 }).map((f) => f.kind));
    expect([...kinds].sort()).toEqual([...FUZZ_FIELD_KINDS].sort());
  });

  it('is 0 at and beyond its radius, bounded by maxDisplacementCm, finite, pure, and keeps every moved point in range', () => {
    fc.assert(
      fc.property(arb.field(), fc.array(fc.tuple(fc.integer({ min: -2000, max: 2000 }), fc.integer({ min: -2000, max: 2000 })), { minLength: 1, maxLength: 20 }), (f, offs) => {
        const R = f.radiusCm;
        const c = f.centre;
        // On and outside the circle: held.
        for (const [a, b] of [[R, 0], [0, -R], [2 * R, R], [-R, -R]]) expect(f.displacement(c.x + a, c.y + b)).toEqual({ x: 0, y: 0 });
        const points = [c, ...f.region, ...offs.map(([a, b]) => ({ x: c.x + Math.round((a * R) / 2000), y: c.y + Math.round((b * R) / 2000) }))];
        const bad = points.filter((p) => {
          const d = f.displacement(p.x, p.y);
          const again = f.displacement(p.x, p.y);
          return !(
            Number.isFinite(d.x) &&
            Number.isFinite(d.y) &&
            Math.hypot(d.x, d.y) <= f.maxDisplacementCm * (1 + 1e-12) + 1e-9 &&
            Object.is(again.x, d.x) &&
            Object.is(again.y, d.y) &&
            snap(p.x + d.x, p.y + d.y).ok
          );
        });
        expect(bad).toEqual([]);
        expect(f.region.length).toBe(16);
        expect(orient(f.region)).toBe(1);
        expect(f.maxDisplacementCm).toBeLessThanOrEqual(R);
      }),
      runs('field'),
    );
  });

  it('displace drags by dragCm at full weight inside innerRadiusCm; swirl keeps the distance to the centre', () => {
    const fs = fc.sample(arb.field(), { ...fuzzParams('fuzz/test/field/kinds2'), numRuns: 400 });
    const displace = fs.filter((f) => f.kind === 'displace' && f.innerRadiusCm >= 1);
    expect(displace.length).toBeGreaterThan(0);
    for (const f of displace) expect(f.displacement(f.centre.x, f.centre.y)).toEqual({ x: f.dragCm.x, y: f.dragCm.y });
    const swirl = fs.filter((f) => f.kind === 'swirl');
    expect(swirl.length).toBeGreaterThan(0);
    for (const f of swirl) {
      const p = { x: f.centre.x + Math.floor(f.radiusCm / 3), y: f.centre.y + 1 };
      const d = f.displacement(p.x, p.y);
      const before = Math.hypot(p.x - f.centre.x, p.y - f.centre.y);
      const after = Math.hypot(p.x + d.x - f.centre.x, p.y + d.y - f.centre.y);
      expect(Math.abs(after - before)).toBeLessThan(1e-6 * before + 1e-9);
    }
  });
});

describe('arb.faceSet(kind): the M0 (b) face set and F-CUT\'s random faces', () => {
  for (const kind of FUZZ_FACE_KINDS) {
    for (const scale of ['block', 'plot'] as const) {
      it(`${kind} at ${scale} scale: simple counter-clockwise outline inside CITY's frame, at its scale, centre placed, reach honest`, () => {
        const [rMin, rMax] = FUZZ_FACE_SCALES[scale];
        fc.assert(
          fc.property(arb.faceSet(kind, { scale }), (f) => {
            expect(f.kind).toBe(kind);
            const outer = f.polygon[0];
            expect(isSimpleRing(outer)).toBe(true);
            expect(orient(outer)).toBe(1);
            // Every vertex inside the frame and within the reach (exact integers); one expectation for the lot.
            const strays = f.polygon
              .flat()
              .filter((p) => Math.abs(p.x) > 250_000 || Math.abs(p.y) > 250_000 || (p.x - f.centre.x) ** 2 + (p.y - f.centre.y) ** 2 > f.radiusCm ** 2);
            expect(strays).toEqual([]);
            expect(f.radiusCm).toBeGreaterThanOrEqual(Math.floor(0.3 * rMin));
            expect(f.radiusCm).toBeLessThanOrEqual(Math.ceil(1.2 * rMax));
            expect(pointInRing(f.centre, outer)).toBe(kind === 'C-shaped' ? 'outside' : 'inside');
            if (kind === 'holed') expect(f.polygon.length).toBeGreaterThanOrEqual(2);
            else expect(f.polygon.length).toBe(1);
            if (kind === 'concave') expect(fuzzIsConcaveRing(outer)).toBe(true);
            if (kind === 'C-shaped') expect(fuzzIsConcaveRing(outer)).toBe(true);
          }),
          runs(`face/${kind}/${scale}`),
        );
      }, 120_000);
    }
  }

  it('the kinds differ as stated: triangular faces have three corners, curved and round-joined ones many vertices', () => {
    const tri = fc.sample(arb.faceSet('triangular'), { ...fuzzParams('fuzz/test/face/tri'), numRuns: 200 });
    for (const f of tri) {
      // At most three vertices turn by more than 5° (the others are kerb vertices on the sides, within 1 cm of them).
      const r = f.polygon[0];
      const n = r.length;
      let sharp = 0;
      for (let i = 0; i < n; i += 1) {
        const a = r[(i + n - 1) % n];
        const b = r[i];
        const c = r[(i + 1) % n];
        const t = Math.atan2((b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x), (b.x - a.x) * (c.x - b.x) + (b.y - a.y) * (c.y - b.y));
        if (Math.abs(t) > (5 * Math.PI) / 180) sharp += 1;
      }
      expect(sharp).toBe(3);
    }
    for (const kind of ['curved', 'round-joined'] as const) {
      const fs = fc.sample(arb.faceSet(kind), { ...fuzzParams(`fuzz/test/face/${kind}`), numRuns: 100 });
      expect(fs.every((f) => f.polygon[0].length >= 9)).toBe(true);
    }
  });

  it('refuses an unknown kind or scale and a size that does not fit the frame', () => {
    expect(() => arb.faceSet('round' as never)).toThrow(RangeError);
    expect(() => arb.faceSet('curved', { scale: 'district' as never })).toThrow(RangeError);
    expect(() => arb.faceSet('curved', { sizeCm: [1_000, 200_000] })).toThrow(RangeError);
    expect(() => arb.faceSet('curved', { sizeCm: [50, 100] })).toThrow(RangeError);
  });
});

describe('options and determinism', () => {
  it('refuses a limit outside [65 536, 2²³ − 1], a bad size or count range, an unknown contact', () => {
    for (const limitCm of [65_535, 8_388_608, 1.5]) expect(() => arb.polygon({ limitCm })).toThrow(RangeError);
    expect(() => arb.polygon({ sizeCm: [0, 10] })).toThrow(RangeError);
    expect(() => arb.polygon({ sizeCm: [10, 5] })).toThrow(RangeError);
    expect(() => arb.polygon({ vertices: [2, 5] })).toThrow(RangeError);
    expect(() => arb.chain({ vertices: [1, 5] })).toThrow(RangeError);
    expect(() => arb.holedPolygon({ holes: [0, 1] })).toThrow(RangeError);
    expect(() => arb.holedPolygon({ contact: 'side' as never })).toThrow(RangeError);
    expect(() => arb.field({ sizeCm: [100, 8_000_000] })).toThrow(RangeError);
  });

  it('keeps every coordinate inside a given limit', () => {
    const limit = 70_000;
    for (const c of [arb.polygon({ limitCm: limit }), arb.chain({ limitCm: limit }), arb.thin({ limitCm: limit }), arb.selfTouching({ shape: 'chain', limitCm: limit })]) {
      for (const r of fc.sample(c, { ...fuzzParams('fuzz/test/limit'), numRuns: 300 })) {
        for (const p of r) expect(Math.max(Math.abs(p.x), Math.abs(p.y))).toBeLessThanOrEqual(limit);
      }
    }
  });

  it('one seed gives one sample, for every arbitrary', () => {
    for (const c of allArbitraries()) {
      const p = { ...fuzzParams(`fuzz/test/determinism/${c.name}`), numRuns: 20 };
      const a = fc.sample(c.arbitrary, p).map((v) => c.points(v));
      const b = fc.sample(c.arbitrary, p).map((v) => c.points(v));
      expect(a, c.name).toEqual(b);
    }
  });
});
