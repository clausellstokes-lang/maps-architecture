// M0-b-01's property tests (PLAT_FUZZ_RUNS cases each, C-0057): the bands are ordered ranges inside the rows' hull,
// rise with the value over the design's ascending rows, and scale linearly with the rung; the block-depth range is
// §4.6 step 1's formula on any depth band and floor, ordered, with e_hi² ≥ e_lo² and d̄ inside the depth band; a reading
// is a pure function of its inputs (a caller's mutation of one result never reaches the next).
import type { Cell, Row } from '@plat/tables';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { bandPlotDepth, blockDepthRange, granularityBands, minFrontage, regimeFloor, upperBlockArea } from '../../../src/infill/granularityBands.js';
import { CITY, DESIGN_ROWS, DESIGN_SCALES, FIXTURE, METROPOLIS, TOWN } from './support.js';

const value = fc.double({ min: 0, max: 1, noNaN: true });
const rung = fc.constantFrom(['TOWN', TOWN] as const, ['CITY', CITY] as const, ['METROPOLIS', METROPOLIS] as const);
const EPS = 1e-9;

/** A regimes row holding only a block-depth floor. */
function floorRow(lo: number, hi: number): Row {
  const c: Cell = { value: [lo, hi], unit: 'm', provenance: 'own', calibratable: true } as Cell;
  return new Map([['blockDepthFloorM', c]]);
}

const ROWS = Object.values(DESIGN_ROWS);
const hull = (k: 'frontageM' | 'depthM', end: 0 | 1): [number, number] => [Math.min(...ROWS.map((r) => r[k][end])), Math.max(...ROWS.map((r) => r[k][end]))];

describe('granularityBands — properties', () => {
  it('gives ordered, positive ranges inside the scaled hull of the design rows', () => {
    fc.assert(
      fc.property(value, rung, (v, [name, profile]) => {
        const g = granularityBands(v, profile, FIXTURE);
        const [f, d] = DESIGN_SCALES[name];
        for (const [k, s] of [['frontageM', f], ['depthM', d]] as const) {
          const band = g[k];
          expect(band[0]).toBeGreaterThan(0);
          expect(band[0]).toBeLessThanOrEqual(band[1]);
          for (const end of [0, 1] as const) {
            const [lo, hi] = hull(k, end);
            expect(band[end]).toBeGreaterThanOrEqual(lo * s - EPS);
            expect(band[end]).toBeLessThanOrEqual(hi * s + EPS);
          }
        }
      }),
    );
  });

  it('scales linearly with the rung: each rung is the CITY reading times its frontage and depth factors', () => {
    fc.assert(
      fc.property(value, rung, (v, [name, profile]) => {
        const city = granularityBands(v, CITY, FIXTURE);
        const got = granularityBands(v, profile, FIXTURE);
        const [f, d] = DESIGN_SCALES[name];
        for (const end of [0, 1] as const) {
          expect(Math.abs(got.frontageM[end] - city.frontageM[end] * f)).toBeLessThanOrEqual(EPS);
          expect(Math.abs(got.depthM[end] - city.depthM[end] * d)).toBeLessThanOrEqual(EPS);
        }
        expect(minFrontage(got)).toBe(got.frontageM[0]);
      }),
    );
  });

  it('rises with the prosperity value over the design rows (each end non-decreasing)', () => {
    fc.assert(
      fc.property(value, value, rung, (a, b, [, profile]) => {
        const [lo, hi] = a <= b ? [a, b] : [b, a];
        const ga = granularityBands(lo, profile, FIXTURE);
        const gb = granularityBands(hi, profile, FIXTURE);
        for (const end of [0, 1] as const) {
          expect(gb.depthM[end]).toBeGreaterThanOrEqual(ga.depthM[end] - EPS);
          expect(gb.frontageM[end]).toBeGreaterThanOrEqual(ga.frontageM[end] - EPS);
        }
      }),
    );
  });

  it('is a pure function of its inputs: equal inputs give equal bits, and a mutated result never reaches the next call', () => {
    fc.assert(
      fc.property(value, rung, (v, [, profile]) => {
        const first = granularityBands(v, profile, FIXTURE);
        const copy = { frontageM: [...first.frontageM], depthM: [...first.depthM] };
        first.depthM[0] = -1;
        first.frontageM[1] = Number.NaN;
        expect(granularityBands(v, profile, FIXTURE)).toEqual(copy);
      }),
    );
  });
});

describe('blockDepthRange — properties', () => {
  const range = fc
    .tuple(fc.double({ min: 0, max: 500, noNaN: true }), fc.double({ min: 0, max: 500, noNaN: true }))
    .map(([a, b]) => (a <= b ? [a, b] : [b, a]) as [number, number]);

  it("is §4.6 step 1's formula on any depth band and regime floor, ordered, with e_hi² ≥ e_lo² and d̄ in the depth band", () => {
    fc.assert(
      fc.property(range, range, (depthM, [rLo, rHi]) => {
        const bands = { frontageM: [1, 2] as [number, number], depthM };
        const [eLo, eHi] = blockDepthRange(bands, floorRow(rLo, rHi));
        expect(eLo).toBe(Math.max(2 * depthM[0], rLo));
        expect(eHi).toBe(Math.max(2 * depthM[1], rHi));
        expect(eLo).toBeLessThanOrEqual(eHi);
        expect(eLo).toBeGreaterThanOrEqual(2 * depthM[0]);
        expect(eLo).toBeGreaterThanOrEqual(rLo);
        expect(eHi).toBeGreaterThanOrEqual(rHi);
        expect(upperBlockArea([eLo, eHi])).toBe(eHi * eHi);
        expect(upperBlockArea([eLo, eHi])).toBeGreaterThanOrEqual(eLo * eLo);
        const dBar = bandPlotDepth(bands);
        expect(dBar).toBeGreaterThanOrEqual(depthM[0]);
        expect(dBar).toBeLessThanOrEqual(depthM[1]);
        // Without a floor the range is the two back-to-back rows alone.
        expect(blockDepthRange(bands)).toEqual([2 * depthM[0], 2 * depthM[1]]);
        expect(regimeFloor(floorRow(rLo, rHi))).toEqual([rLo, rHi]);
      }),
    );
  });
});
