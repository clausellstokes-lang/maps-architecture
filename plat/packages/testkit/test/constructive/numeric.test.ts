// M0-k-02's listed test "the numeric-core cases (quantisation, the collinear class, the star rings) run green against
// M0-a-01 here" (C-0110): each numeric-core case's run on 10³ seeds and on fast-check's seeds through the set's own
// iteration, the judge's exact references checked against known answers, and the judge shown to fail a draw whose
// stated outcome is wrong — so green means the kernel met the outcome, not that the judge cannot fail.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { area2Big, orient2d, snap, type LatticePoint } from '@plat/kernel';
import { CONSTRUCTIVE_REFERENCE as REF, CONSTRUCTIVE_SET, constructiveCase, fuzzParams, runConstructive, type ConstructiveCase, type ConstructiveInput } from '@plat/testkit';
import { DRAWS } from './support.js';

const NUMERIC = CONSTRUCTIVE_SET.filter((c) => c.numericCore);
const caseOf = (id: string): ConstructiveCase => {
  const c = constructiveCase(id);
  if (c === undefined) throw new Error(id);
  return c;
};
const draw = (id: string, seed: number) => caseOf(id).generate(seed) as ConstructiveInput;
const verdict = (id: string, input: ConstructiveInput) => {
  const run = caseOf(id).run;
  if (run === undefined) throw new Error(`${id} has no run`);
  return run(input);
};
/** A copy of an input with some of its records replaced (the judge's negative controls). */
const tamper = (input: ConstructiveInput, patch: Partial<ConstructiveInput>): ConstructiveInput => ({ ...input, ...patch });

describe('the numeric-core cases run green against M0-a-01', () => {
  it(`runs every numeric-core case on ${String(DRAWS)} seeds through the set's iteration: all green`, () => {
    const r = runConstructive(NUMERIC, DRAWS);
    expect(r.failures).toEqual([]);
    expect(r.judged).toBe(NUMERIC.length);
    expect(r.green).toBe(NUMERIC.length);
    expect(r.draws).toBe(NUMERIC.length * DRAWS);
    expect(r.pending).toEqual([]);
  }, 120_000);

  it.each(NUMERIC.map((c) => [c.id, c] as const))('%s is green on fast-check’s seeds too', (id, c: ConstructiveCase) => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 0xffffffff }), (seed) => {
        const g = c.generate(seed) as ConstructiveInput;
        const v = c.run?.(g);
        if (v === undefined || !v.ok) throw new Error(`${id} seed ${String(seed)}: ${v === undefined ? 'no run' : v.reason}`);
        return c.witness === undefined || c.witness(g) === null;
      }),
      { ...fuzzParams(`constructive/test/numeric/${id}`), numRuns: 500 },
    );
  }, 120_000);

  it('draws both star rings — the simple ring and the winding polygram whose partial sums take the flush at 2⁵²', () => {
    let winding = 0;
    let simple = 0;
    for (let seed = 0; seed < 200; seed += 1) {
      const g = draw('geom/star-ring-max-radius', seed);
      if (g.params.variant === 'winding') {
        winding += 1;
        expect(REF.largestPartial(g.rings.star) >= 2n ** 52n).toBe(true);
      } else simple += 1;
    }
    expect(winding).toBeGreaterThan(50);
    expect(simple).toBeGreaterThan(50);
  });

  it('draws every refused magnitude: 2²³, the half below it, past 2³¹ and NaN / ±∞, naming x and y', () => {
    const details = new Set<string>();
    const kinds = new Set<string>();
    for (let seed = 0; seed < DRAWS; seed += 1) {
      for (const id of ['quant/refuse-out-of-range', 'quant/refuse-non-finite']) {
        const g = draw(id, seed);
        details.add(String(g.params.detail));
        for (const v of g.params.raw as readonly number[]) {
          const m = Math.abs(v);
          kinds.add(Number.isNaN(v) ? 'NaN' : m === Infinity ? 'inf' : m === 2 ** 23 ? '2^23' : m >= 2 ** 23 - 0.5 && m < 2 ** 23 ? 'half-below' : m >= 2 ** 31 ? 'past-2^31' : m > 2 ** 23 ? 'beyond' : 'in-range');
        }
      }
    }
    expect([...details].sort()).toEqual(['x', 'y']);
    for (const k of ['NaN', 'inf', '2^23', 'half-below', 'past-2^31', 'beyond', 'in-range']) expect(kinds, k).toContain(k);
  });
});

describe("the judge's exact references", () => {
  it('rounds a half away from zero, never −0, and passes NaN and ±∞ through (C-0134 (1))', () => {
    const cases: [number, number][] = [
      [0.5, 1],
      [-0.5, -1],
      [1.5, 2],
      [-1.5, -2],
      [2.5, 3],
      [-2.5, -3],
      [0.49999999999999994, 0],
      [-0.4, 0],
      [8_388_606.5, 8_388_607],
      [8_388_607.5, 8_388_608],
    ];
    for (const [v, want] of cases) {
      const r = REF.roundHalfAway(v);
      expect(r, String(v)).toBe(want);
      expect(Object.is(r, -0), String(v)).toBe(false);
    }
    expect(Number.isNaN(REF.roundHalfAway(Number.NaN))).toBe(true);
    expect(REF.roundHalfAway(-Infinity)).toBe(-Infinity);
  });

  it('agrees with snap on random doubles, ties and the range’s edges (two computations of one rule)', () => {
    fc.assert(
      fc.property(fc.oneof(fc.double({ min: -9e6, max: 9e6, noNaN: false }), fc.integer({ min: -9e6, max: 9e6 }).map((k) => k + 0.5)), fc.integer({ min: -100, max: 100 }), (x, y) => {
        const r = REF.snap(x, y);
        const s = snap(x, y);
        if (r.ok !== s.ok) return false;
        return r.ok && s.ok ? r.x === s.value.x && r.y === s.value.y : !s.ok && !r.ok && s.detail === r.detail;
      }),
      { ...fuzzParams('constructive/test/numeric/ref-snap'), numRuns: 5000 },
    );
  });

  it('computes the cross product and twice the area in BigInt, the cross unit with d × q = 1', () => {
    expect(REF.cross({ x: 0, y: 0 }, { x: 1000, y: 9 }, { x: 517, y: 30 })).toBe(25_347n);
    expect(REF.area2([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }])).toBe(12n);
    expect(REF.sign(-5n)).toBe(-1);
    fc.assert(
      fc.property(fc.integer({ min: -(2 ** 20), max: 2 ** 20 }), fc.integer({ min: -(2 ** 20), max: 2 ** 20 }), (x, y) => {
        let [a, b] = [Math.abs(x), Math.abs(y)];
        while (b !== 0) [a, b] = [b, a % b];
        if (a !== 1) return true;
        const q = REF.crossUnit({ x, y });
        return x * q.y - y * q.x === 1;
      }),
      { ...fuzzParams('constructive/test/numeric/cross-unit'), numRuns: 5000 },
    );
    expect(() => REF.crossUnit({ x: 4, y: 6 })).toThrow();
  });

  it('agrees with area2Big on random rings (the reference is a second computation of §3.2 (6))', () => {
    const pt = fc.record({ x: fc.integer({ min: -8_388_607, max: 8_388_607 }), y: fc.integer({ min: -8_388_607, max: 8_388_607 }) });
    fc.assert(
      fc.property(fc.array(pt, { minLength: 3, maxLength: 40 }), (ring) => REF.area2(ring) === area2Big(ring as LatticePoint[])),
      { ...fuzzParams('constructive/test/numeric/ref-area2'), numRuns: 2000 },
    );
  });
});

describe('the judge fails a draw whose stated outcome is wrong (negative controls)', () => {
  it('fails a quantisation draw whose expected point or refused coordinate is not the rule’s', () => {
    const g = draw('quant/half-ties', 3);
    expect(verdict('quant/half-ties', g).ok).toBe(true);
    const e = g.points.expected;
    expect(verdict('quant/half-ties', tamper(g, { points: { expected: { ...e, x: (e.x - 1) as typeof e.x } } })).ok).toBe(false);
    const r = draw('quant/refuse-out-of-range', 5);
    expect(verdict('quant/refuse-out-of-range', r).ok).toBe(true);
    expect(verdict('quant/refuse-out-of-range', tamper(r, { params: { ...r.params, detail: r.params.detail === 'x' ? 'y' : 'x' } })).ok).toBe(false);
    expect(verdict('quant/refuse-out-of-range', tamper(r, { params: { ...r.params, raw: [1.5, 2] } })).ok).toBe(false);
  });

  it('fails an on-segment draw whose "on" point stands off the segment, or whose off point is collinear', () => {
    const g = draw('geom/on-segment-gcd', 7);
    expect(verdict('geom/on-segment-gcd', g).ok).toBe(true);
    const off = g.pointSets.off[0];
    expect(verdict('geom/on-segment-gcd', tamper(g, { pointSets: { ...g.pointSets, on: [off] } })).ok).toBe(false);
    // An off point the judge reads must match the BigInt reference exactly; a collinear one has orient2d 0 and the
    // reference 0 — the judge accepts it as off (sign 0 = 0), so the witness is what refuses it.
    const c = caseOf('geom/on-segment-gcd');
    const on = g.pointSets.on[0];
    expect(c.witness?.(tamper(g, { pointSets: { ...g.pointSets, off: [on] } }))).not.toBeNull();
    expect(orient2d(g.points.a.x, g.points.a.y, g.points.b.x, g.points.b.y, off.x, off.y)).not.toBe(0);
  });

  it('fails a collinear-triple draw whose triple turns, and a star ring whose area the reference does not give', () => {
    const t = draw('geom/collinear-triple', 2);
    expect(verdict('geom/collinear-triple', t).ok).toBe(true);
    const c = t.points.c;
    expect(verdict('geom/collinear-triple', tamper(t, { points: { ...t.points, c: { ...c, y: (c.y + (c.y > 0 ? -1 : 1)) as typeof c.y } } })).ok).toBe(false);
    const s = draw('geom/star-ring-max-radius', 1);
    expect(verdict('geom/star-ring-max-radius', s).ok).toBe(true);
    // A ring winding 301 times round a (2²⁴ − 2) × (2²⁴ − 6) rectangle: 2A = 2408 · R · R′ (301 · R · R′ odd, above
    // 2⁵³), which no double holds — area2's value is rounded, so the judge's exactness check fails it.
    const R = 8_388_607;
    const R2 = 8_388_605;
    const quad = [
      { x: -R, y: -R2 },
      { x: R, y: -R2 },
      { x: R, y: R2 },
      { x: -R, y: R2 },
    ] as LatticePoint[];
    const big: LatticePoint[] = [];
    for (let j = 0; j < 301; j += 1) big.push(...quad);
    expect(REF.area2(big)).toBe(2408n * BigInt(R) * BigInt(R2));
    expect(REF.area2(big) > 2n ** 53n).toBe(true);
    expect(verdict('geom/star-ring-max-radius', tamper(s, { rings: { star: big } })).ok).toBe(false);
  });
});
