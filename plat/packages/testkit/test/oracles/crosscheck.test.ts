// M0-k-03's cross-check (C-0144 (6), C-0148 (2); the check's F1): the symmetric-difference area is taken "through the
// oracle's own boolean, cross-checked between the two oracles". `symDiffArea` reaches the library it names; a verdict's
// `symDiffCm2` is the named oracle's measurement and its `crossCheckCm2` the other oracle's; a disagreement beyond
// perimeter × 1 cm, or a measurement that cannot be taken, fails the verdict with `cross-check`. The libraries agree on
// every case they both measure (agreement.test.ts), so a disagreement and a refusal are planted through
// `CompareOptions.measure`; the refusal of an unloaded Clipper2 is the libraries' own (load.test.ts). A library's own
// refusal of a measurement — an `OracleRefusal`, C-0150 — is no failed cross-check: the verdict is refused (it judges
// nothing), unless ours shows a fault no oracle is needed to see.
import { beforeAll, describe, expect, it } from 'vitest';
import {
  ORACLE_ENGINES,
  UNATTRACTED_CM,
  compareSplit,
  loadOracles,
  oracleBoolean,
  symDiffArea,
  type AreaMeasurer,
} from '../../src/oracles/index.js';
import { otherEngine } from '../../src/oracles/compare.js';
import { OracleRefusal } from '../../src/oracles/refusal.js';
import { clipper2BooleanRaw } from '../../src/oracles/clipper2.js';
import { multiPolygonArea, polygonClippingRaw } from '../../src/oracles/polygon-clipping.js';
import type { OracleEngine, OracleResult, Ring } from '../../src/oracles/types.js';
import { R, rect } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

const square = rect(0, 0, 1_000, 1_000);
// Rings whose edges cross the square's, and each other's, obliquely: the crossings are not lattice points, so
// Clipper2's double API (kept to 10⁻³ cm) and polygon-clipping's doubles place them differently and the two areas
// differ in their fractions (0.27 cm² and 0.76 cm² on this machine) — far inside perimeter × 1 cm, never equal.
const triangle = R([137, -50], [1_290, 377], [211, 983]);
const diamond = R([500, -200], [1_210, 510], [500, 1_220], [-210, 510]);

/** The xor's area straight from Clipper2's boolean. */
function viaClipper2(x: readonly Ring[], y: readonly Ring[]): number {
  return Math.abs(multiPolygonArea([clipper2BooleanRaw('xor', x, y, 'nonzero')]));
}

/** The xor's area straight from polygon-clipping's boolean. */
function viaPolygonClipping(x: readonly Ring[], y: readonly Ring[]): number {
  return Math.abs(multiPolygonArea(polygonClippingRaw('xor', x, y, 'nonzero')));
}

function via(engine: OracleEngine, x: readonly Ring[], y: readonly Ring[]): number {
  return engine === 'clipper2' ? viaClipper2(x, y) : viaPolygonClipping(x, y);
}

function rings(r: OracleResult): Ring[] {
  if (!r.ok) throw new Error(`oracle failed: ${r.error}`);
  return r.rings;
}

describe('the cross-check: the area through the named oracle, confirmed through the other', () => {
  it('symDiffArea measures through the library it names (the two differ on oblique crossings)', () => {
    for (const [x, y] of [
      [[square], [triangle]],
      [[diamond], [triangle]],
    ] as const) {
      const c = symDiffArea(x, y, 'clipper2');
      const p = symDiffArea(x, y, 'polygon-clipping');
      expect(c).toBe(viaClipper2(x, y));
      expect(p).toBe(viaPolygonClipping(x, y));
      expect(c).not.toBe(p);
      expect(Math.abs(c - p)).toBeLessThan(1);
    }
  });

  it('gives a verdict the named oracle’s area and the other oracle’s cross-check', () => {
    for (const engine of ORACLE_ENGINES) {
      const oracle = oracleBoolean('union', [square], [], 'nonzero', engine);
      const ys = rings(oracle);
      const v = compareSplit([triangle], oracle, []);
      expect(v.engine).toBe(engine);
      expect(v.symDiffCm2).toBe(via(engine, [triangle], ys));
      expect(v.crossCheckCm2).toBe(via(otherEngine(engine), [triangle], ys));
      expect(v.symDiffCm2).toBe(symDiffArea([triangle], ys, engine));
      expect(v.crossCheckCm2).toBe(symDiffArea([triangle], ys, otherEngine(engine)));
      expect(v.symDiffCm2).not.toBe(v.crossCheckCm2);
      expect(v.crossChecked).toBe(true);
      // the triangle is not the square: the case fails on its area alone, never on the cross-check
      expect(v.failures).toEqual(['area']);
    }
  });

  it('fails cross-check when the two measurements differ by more than perimeter × 1 cm, on either side', () => {
    for (const engine of ORACLE_ENGINES) {
      const oracle = oracleBoolean('union', [square], [], 'nonzero', engine);
      const ours = rings(oracle);
      const perimeter = 4_000;
      const bound = perimeter * UNATTRACTED_CM;
      const calls: [OracleEngine, Ring[], Ring[]][] = [];
      const planted =
        (own: number, other: number): AreaMeasurer =>
        (x, y, e) => {
          calls.push([e, [...x], [...y]]);
          return e === engine ? own : other;
        };
      // at the bound: confirmed, and the case passes
      const at = compareSplit(ours, oracle, [], { measure: planted(100, 100 + bound) });
      expect(at.perimeterCm).toBe(perimeter);
      expect([at.symDiffCm2, at.crossCheckCm2, at.crossChecked, at.pass]).toEqual([100, 100 + bound, true, true]);
      expect(calls.map(([e]) => e)).toEqual([engine, otherEngine(engine)]);
      for (const [, x, y] of calls) {
        expect(x).toEqual(ours);
        expect(y).toEqual(ours);
      }
      // just beyond it, the other oracle's area the larger: refused although the area and the faces pass
      const far = compareSplit(ours, oracle, [], { measure: planted(100, 100 + bound + 0.5) });
      expect([far.symDiffCm2, far.crossChecked, far.pass]).toEqual([100, false, false]);
      expect(far.failures).toEqual(['cross-check']);
      // beyond it, the named oracle's area the larger
      const big = compareSplit(ours, oracle, [], { measure: planted(100 + bound + 0.5, 100) });
      expect([big.crossChecked, big.pass]).toEqual([false, false]);
      expect(big.failures).toEqual(['cross-check', 'area']);
      // the attracted side cross-checks as well
      const at2 = compareSplit(ours, oracle, [{ code: 'W_ATTRACTED', count: 1 }], { measure: planted(100, 100 + bound + 0.5) });
      expect(at2.split).toBe('attracted');
      expect(at2.failures).toEqual(['cross-check']);
    }
  });

  it('fails cross-check when either measurement cannot be taken', () => {
    for (const engine of ORACLE_ENGINES) {
      const oracle = oracleBoolean('union', [square], [], 'nonzero', engine);
      const ours = rings(oracle);
      const refusing =
        (refused: OracleEngine, how: 'throw' | 'nan'): AreaMeasurer =>
        (_x, _y, e) => {
          if (e !== refused) return 0;
          if (how === 'throw') throw new Error('planted');
          return Number.NaN;
        };
      for (const how of ['throw', 'nan'] as const) {
        const cross = compareSplit(ours, oracle, [], { measure: refusing(otherEngine(engine), how) });
        expect(cross.symDiffCm2).toBe(0);
        expect(cross.crossCheckCm2).toBeNaN();
        expect(cross.crossChecked).toBe(false);
        expect(cross.failures).toEqual(['cross-check']);
        expect(cross.pass).toBe(false);
      }
      const own = compareSplit(ours, oracle, [], { measure: refusing(engine, 'throw') });
      expect(own.symDiffCm2).toBeNaN();
      expect(own.crossCheckCm2).toBe(0);
      expect(own.failures).toEqual([`area: ${engine} could not measure it (planted)`, 'cross-check', 'area']);
      const ownNaN = compareSplit(ours, oracle, [], { measure: refusing(engine, 'nan') });
      expect(ownNaN.failures).toEqual(['cross-check', 'area']);
    }
  });

  it('makes the verdict refused when a library refuses either measurement, never a failed cross-check', () => {
    for (const engine of ORACLE_ENGINES) {
      const oracle = oracleBoolean('union', [square], [], 'nonzero', engine);
      const ours = rings(oracle);
      const refusing =
        (refused: OracleEngine): AreaMeasurer =>
        (_x, _y, e) => {
          if (e === refused) throw new OracleRefusal(e, 'planted refusal');
          return 0;
        };
      for (const refused of [engine, otherEngine(engine)]) {
        const v = compareSplit(ours, oracle, [], { measure: refusing(refused) });
        expect(v.refused).toBe(true);
        expect(v.pass).toBe(false);
        expect(v.crossChecked).toBe(false);
        expect(v.failures).toEqual([`refused: ${refused}: planted refusal`]);
      }
      // the same refusal on an attracted case whose result is not valid: the verdict fails on the fault of ours
      const bowTie = [R([0, 0], [1_000, 1_000], [1_000, 0], [0, 1_000])];
      const v = compareSplit(bowTie, oracle, [{ code: 'W_PLACED', count: 1 }], { measure: refusing(otherEngine(engine)) });
      expect(v.refused).toBe(false);
      expect(v.pass).toBe(false);
      expect(v.failures[0]).toMatch(/^invalid: /);
      expect(v.failures[v.failures.length - 1]).toBe(`refused: ${otherEngine(engine)}: planted refusal`);
    }
  });
});
