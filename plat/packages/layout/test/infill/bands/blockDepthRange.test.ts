// M0-b-01: the block-depth range (§4.6 step 1, stated there once): e_lo = max(2 · d_lo, r_lo), e_hi = max(2 · d_hi, r_hi),
// [d_lo, d_hi] the plot-depth band granularityBands gives at the district's value and rung, [r_lo, r_hi] the stage
// regime's block-depth band floor (§4.4: dense core 30–45 m, walled rings 45–70 m), both 0 for a regime without a row
// or whose row gives none; the band's plot depth d̄ = (d_lo + d_hi) / 2 and its upper block area e_hi² (J-A34.42).
// The design's arithmetic is read on this folder's fixture tables (C-0162 (1)).
import { parseTable, type Row } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { bandPlotDepth, blockDepthRange, granularityBands, regimeFloor, upperBlockArea, type GranularityBands } from '../../../src/infill/granularityBands.js';
import { centre, CITY, FIXTURE, FIXTURE_REGIMES, METROPOLIS, near, TOWN } from './support.js';

const DENSE: Row = FIXTURE_REGIMES.row('dense_core');
const WALLED: Row = FIXTURE_REGIMES.row('walled_rings');
const LINEAR: Row = FIXTURE_REGIMES.row('linear_street');

/** The design's arithmetic at CITY (scale 1) for each band's centre: [no regime, dense core, walled rings]. */
const CITY_CASES: [band: string, none: [number, number], dense: [number, number], walled: [number, number]][] = [
  // poor 12–20: 2d = 24–40, under both floors
  ['squalid', [24, 40], [30, 45], [45, 70]],
  ['poor', [24, 40], [30, 45], [45, 70]],
  // modest 18–30: 2d = 36–60 — above the dense floor on both ends, under the walled floor on both
  ['modest', [36, 60], [36, 60], [45, 70]],
  // comfortable 21.5–35: 2d = 43–70 — the dense floor lifts the low end only; walled ties at 70
  ['comfortable', [43, 70], [43, 70], [45, 70]],
  // prosperous 25–40: 2d = 50–80 — above both floors
  ['prosperous', [50, 80], [50, 80], [50, 80]],
  // rich 30–60: 2d = 60–120
  ['rich', [60, 120], [60, 120], [60, 120]],
];

describe('the block-depth range (§4.6 step 1)', () => {
  for (const [band, none, dense, walled] of CITY_CASES) {
    it(`${band} at CITY: ${none.join('–')} m without a regime, ${dense.join('–')} m in the dense core, ${walled.join('–')} m in the walled rings`, () => {
      const b = granularityBands(centre(band), CITY, FIXTURE);
      near(blockDepthRange(b, undefined), none);
      near(blockDepthRange(b, DENSE), dense);
      near(blockDepthRange(b, WALLED), walled);
    });
  }

  it("takes each end's max on its own: the dense core's floor lifts e_lo while 2 · d_hi keeps e_hi, and the reverse", () => {
    // Four tenths of the way from poor's centre to modest's: depth 14.4–24, 2d = 28.8–48 → 30–48 in the dense core.
    const v = centre('poor') + 0.4 * (centre('modest') - centre('poor'));
    const b = granularityBands(v, CITY, FIXTURE);
    near(b.depthM, [14.4, 24]);
    near(blockDepthRange(b, DENSE), [30, 48]);
    // A depth band 20–21 (2d = 40–42): the low end is 2 · d_lo, the high end the floor's 45.
    const narrow: GranularityBands = { frontageM: [6, 9], depthM: [20, 21] };
    expect(blockDepthRange(narrow, DENSE)).toEqual([40, 45]);
  });

  it('gives both floors 0 for a regime without a row (undefined) and for a row that gives none (linear_street)', () => {
    expect(regimeFloor(undefined)).toEqual([0, 0]);
    expect(regimeFloor(LINEAR)).toEqual([0, 0]);
    expect(regimeFloor(FIXTURE_REGIMES.rows.get('american'))).toEqual([0, 0]);
    const b = granularityBands(centre('poor'), CITY, FIXTURE);
    expect(blockDepthRange(b, LINEAR)).toEqual([24, 40]);
    expect(blockDepthRange(b)).toEqual([24, 40]);
  });

  it("reads each regime's floor from its row: dense core 30–45, walled rings 45–70, ribbon 30–50, suburb 40–60", () => {
    expect(regimeFloor(DENSE)).toEqual([30, 45]);
    expect(regimeFloor(WALLED)).toEqual([45, 70]);
    expect(regimeFloor(FIXTURE_REGIMES.row('ribbon'))).toEqual([30, 50]);
    expect(regimeFloor(FIXTURE_REGIMES.row('suburb'))).toEqual([40, 60]);
  });

  it('takes the rung-scaled depth band: TOWN poor 13.2–22 → 26.4–44 bare, 30–45 in the dense core; METROPOLIS rich 28.5–57 → 57–114', () => {
    const town = granularityBands(centre('poor'), TOWN, FIXTURE);
    near(blockDepthRange(town), [26.4, 44]);
    near(blockDepthRange(town, DENSE), [30, 45]);
    near(blockDepthRange(town, WALLED), [45, 70]);
    const metro = granularityBands(centre('rich'), METROPOLIS, FIXTURE);
    near(blockDepthRange(metro, WALLED), [57, 114]);
    // METROPOLIS modest 17.1–28.5: 2d = 34.2–57, under the walled floor on both ends; above the dense floor on both.
    near(blockDepthRange(granularityBands(centre('modest'), METROPOLIS, FIXTURE), WALLED), [45, 70]);
    near(blockDepthRange(granularityBands(centre('modest'), METROPOLIS, FIXTURE), DENSE), [34.2, 57]);
  });
});

describe("the band's plot depth d̄ and upper block area e_hi² (§4.6 step 1; J-A34.42)", () => {
  it('d̄ = (d_lo + d_hi) / 2', () => {
    expect(bandPlotDepth(granularityBands(centre('poor'), CITY, FIXTURE))).toBe(16);
    expect(bandPlotDepth(granularityBands(centre('modest'), CITY, FIXTURE))).toBe(24);
    expect(bandPlotDepth(granularityBands(centre('rich'), CITY, FIXTURE))).toBe(45);
    expect(bandPlotDepth(granularityBands(centre('comfortable'), CITY, FIXTURE))).toBeCloseTo(28.25, 9);
    expect(bandPlotDepth(granularityBands(centre('poor'), TOWN, FIXTURE))).toBeCloseTo(17.6, 9);
  });

  it('e_hi² is the square of the range’s high end', () => {
    const poor = granularityBands(centre('poor'), CITY, FIXTURE);
    expect(upperBlockArea(blockDepthRange(poor, DENSE))).toBe(2025);
    expect(upperBlockArea(blockDepthRange(poor, WALLED))).toBe(4900);
    expect(upperBlockArea(blockDepthRange(poor))).toBe(1600);
    expect(upperBlockArea(blockDepthRange(granularityBands(centre('rich'), CITY, FIXTURE), DENSE))).toBe(14400);
  });
});

describe('refusals', () => {
  const regimes = (floor: unknown, unit = 'm'): Row =>
    parseTable('regimes', {
      table: 'regimes',
      version: 1,
      section: 'x',
      rows: { r: { blockDepthFloorM: { value: floor, unit, provenance: 'own', calibratable: true } } },
    }).row('r');

  it('refuses a regime floor that is not a metre range 0 ≤ lo ≤ hi', () => {
    const b = granularityBands(centre('poor'), CITY, FIXTURE);
    expect(() => blockDepthRange(b, regimes([30, 45], 'cm'))).toThrow(/blockDepthFloorM is in 'cm', not metres/);
    expect(() => blockDepthRange(b, regimes([45, 30]))).toThrow(/blockDepthFloorM is not a range 0 ≤ lo ≤ hi/);
    expect(() => blockDepthRange(b, regimes([30, 45, 60]))).toThrow(/is not a range \[lo, hi\]/);
    expect(() => regimeFloor(regimes(30))).toThrow(/is not a range \[lo, hi\]/);
  });

  it('refuses a depth band that is not a range 0 ≤ d_lo ≤ d_hi', () => {
    for (const depthM of [[20, 12], [-1, 12], [Number.NaN, 12], [12, Number.POSITIVE_INFINITY]] as [number, number][]) {
      expect(() => blockDepthRange({ frontageM: [4, 6], depthM }, DENSE)).toThrow(/depth band is not a range/);
    }
  });
});
