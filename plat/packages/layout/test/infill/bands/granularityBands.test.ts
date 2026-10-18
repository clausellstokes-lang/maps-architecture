// M0-b-01: granularityBands(ctxValue, rung) — §4.7's four granularity rows served at §4.5's six bands (comfortable
// interpolated between modest and prosperous, squalid reading the poor row, an end row flat beyond its centre), scaled by
// the rung's RungProfile.granularity (§1.1: TOWN 1.10 / 1.10, CITY 1.00 / 1.00, METROPOLIS 0.90 / 0.95), and w_min,
// the low end of frontageM (§4.6 step 6). The design's arithmetic is read on this folder's fixture tables (C-0162 (1)).
import { bandCentres, parseTable } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { granularityBands, minFrontage } from '../../../src/infill/granularityBands.js';
import { centre, CITY, DESIGN_ROWS, FIXTURE, FIXTURE_GRANULARITY, FIXTURE_SET, METROPOLIS, near, TOWN, withScales } from './support.js';

/** The design's defaults at each band's centre (CITY, scale 1): §4.7's rows; comfortable midway (§4.5). */
const AT_CENTRE: Record<string, { frontageM: [number, number]; depthM: [number, number] }> = {
  squalid: { frontageM: [4, 6], depthM: [12, 20] },
  poor: { frontageM: [4, 6], depthM: [12, 20] },
  modest: { frontageM: [6, 9], depthM: [18, 30] },
  comfortable: { frontageM: [7.5, 11.5], depthM: [21.5, 35] },
  prosperous: { frontageM: [9, 14], depthM: [25, 40] },
  rich: { frontageM: [14, 25], depthM: [30, 60] },
};

describe('the four rows at six bands (§4.7, §4.5)', () => {
  for (const [band, want] of Object.entries(AT_CENTRE)) {
    it(`${band}'s centre gives frontage ${want.frontageM.join('–')} m and depth ${want.depthM.join('–')} m`, () => {
      const got = granularityBands(centre(band), CITY, FIXTURE);
      near(got.frontageM, want.frontageM);
      near(got.depthM, want.depthM);
    });
  }

  it('reads the four design rows exactly at their own centres (poor 12–20, modest 18–30, prosperous 25–40, rich 30–60)', () => {
    for (const [band, row] of Object.entries(DESIGN_ROWS)) {
      const got = granularityBands(centre(band), CITY, FIXTURE);
      expect(got.depthM).toEqual([...row.depthM]);
      expect(got.frontageM).toEqual([...row.frontageM]);
    }
  });

  it('applies the end rows flat beyond their centres: 0 and the squalid band read poor, 1 reads rich', () => {
    for (const v of [0, centre('squalid'), 0.011, centre('poor')]) {
      expect(granularityBands(v, CITY, FIXTURE)).toEqual({ frontageM: [4, 6], depthM: [12, 20] });
    }
    for (const v of [centre('rich'), 0.97, 1]) {
      expect(granularityBands(v, CITY, FIXTURE)).toEqual({ frontageM: [14, 25], depthM: [30, 60] });
    }
  });

  it('interpolates linearly along the value between the rowed centres, both ends of each range', () => {
    const lo = centre('modest');
    const hi = centre('prosperous');
    for (const t of [0.1, 0.25, 0.75, 0.9]) {
      const got = granularityBands(lo + t * (hi - lo), CITY, FIXTURE);
      near(got.depthM, [18 + t * 7, 30 + t * 10]);
      near(got.frontageM, [6 + t * 3, 9 + t * 5]);
    }
    const a = centre('poor');
    const b = centre('modest');
    near(granularityBands((a + b) / 2, CITY, FIXTURE).depthM, [15, 25]);
    const c = centre('rich');
    near(granularityBands((hi + c) / 2, CITY, FIXTURE).depthM, [27.5, 50]);
  });

  it("reads a town's own cuts when one is passed (its FieldBands as a BandCuts)", () => {
    // A town whose cuts put comfortable's centre a third of the way from modest's to prosperous's: the centres are
    // modest 0.2, comfortable 0.35, prosperous 0.65 (not the default set's midway comfortable).
    const town = { bands: FIXTURE_SET.bands, cuts: [0.05, 0.1, 0.3, 0.4, 0.9] };
    const got = granularityBands(0.35, CITY, { table: FIXTURE_GRANULARITY, set: town });
    near(got.depthM, [18 + 7 / 3, 30 + 10 / 3]);
    near(got.frontageM, [6 + 3 / 3, 9 + 5 / 3]);
    const [, , modest, comfortable, prosperous] = bandCentres(town);
    near([modest, comfortable, prosperous], [0.2, 0.35, 0.65]);
    expect(granularityBands(modest, CITY, { table: FIXTURE_GRANULARITY, set: town }).depthM).toEqual([18, 30]);
    expect(granularityBands(prosperous, CITY, { table: FIXTURE_GRANULARITY, set: town }).depthM).toEqual([25, 40]);
  });
});

describe('the rung scales (§1.1; RungProfile.granularity on both ends of both bands)', () => {
  it('TOWN 1.10 / 1.10: poor depth 13.2–22 m, frontage 4.4–6.6 m; rich depth 33–66 m', () => {
    near(granularityBands(centre('poor'), TOWN, FIXTURE).depthM, [13.2, 22]);
    near(granularityBands(centre('poor'), TOWN, FIXTURE).frontageM, [4.4, 6.6]);
    near(granularityBands(centre('rich'), TOWN, FIXTURE).depthM, [33, 66]);
  });

  it('METROPOLIS 0.90 / 0.95: rich frontage 12.6–22.5 m and depth 28.5–57 m; poor depth 11.4–19 m', () => {
    near(granularityBands(centre('rich'), METROPOLIS, FIXTURE).frontageM, [12.6, 22.5]);
    near(granularityBands(centre('rich'), METROPOLIS, FIXTURE).depthM, [28.5, 57]);
    near(granularityBands(centre('poor'), METROPOLIS, FIXTURE).depthM, [11.4, 19]);
  });

  it('scales every band: each rung is the CITY reading times its frontage and depth factors', () => {
    for (const band of Object.keys(AT_CENTRE)) {
      const city = granularityBands(centre(band), CITY, FIXTURE);
      for (const [rung, f, d] of [[TOWN, 1.1, 1.1], [METROPOLIS, 0.9, 0.95]] as const) {
        const got = granularityBands(centre(band), rung, FIXTURE);
        near(got.frontageM, [city.frontageM[0] * f, city.frontageM[1] * f]);
        near(got.depthM, [city.depthM[0] * d, city.depthM[1] * d]);
      }
    }
  });

  it('keeps the frontage and depth factors apart (a depth-only scale leaves the frontage alone)', () => {
    const depthOnly = withScales('CITY', 1, 2);
    const got = granularityBands(centre('modest'), depthOnly, FIXTURE);
    expect(got.frontageM).toEqual([6, 9]);
    expect(got.depthM).toEqual([36, 60]);
  });
});

describe('w_min (§4.6 step 6: the low end of frontageM)', () => {
  it('is the scaled low end of the frontage band', () => {
    expect(minFrontage(granularityBands(centre('poor'), CITY, FIXTURE))).toBe(4);
    expect(minFrontage(granularityBands(centre('comfortable'), CITY, FIXTURE))).toBeCloseTo(7.5, 9);
    expect(minFrontage(granularityBands(centre('rich'), METROPOLIS, FIXTURE))).toBeCloseTo(12.6, 9);
  });
});

describe('refusals', () => {
  it('refuses a prosperity value outside [0, 1] or not finite', () => {
    for (const v of [-0.001, 1.0000001, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
      expect(() => granularityBands(v, CITY, FIXTURE)).toThrow(/prosperity value must lie in \[0, 1\]/);
    }
  });

  it('refuses a table other than granularity', () => {
    const other = parseTable('regimes', {
      table: 'regimes',
      version: 1,
      section: 'x',
      rows: { poor: { depthM: { value: [12, 20], unit: 'm', provenance: 'own', calibratable: true } } },
    });
    expect(() => granularityBands(0.5, CITY, { table: other })).toThrow(/read the granularity table, not 'regimes'/);
  });

  it('refuses a band cell that is not a metre range 0 ≤ lo ≤ hi', () => {
    const bad = (depthM: unknown, unit = 'm') =>
      parseTable('granularity', {
        table: 'granularity',
        version: 1,
        section: 'x',
        rows: {
          poor: { frontageM: { value: [4, 6], unit: 'm', provenance: 'own', calibratable: true }, depthM: { value: depthM, unit, provenance: 'own', calibratable: true } },
        },
      });
    expect(() => granularityBands(0.5, CITY, { table: bad([12, 20], 'cm') })).toThrow(/granularity\/poor\/depthM is in 'cm', not metres/);
    expect(() => granularityBands(0.5, CITY, { table: bad([20, 12]) })).toThrow(/granularity\/poor\/depthM is not a range 0 ≤ lo ≤ hi/);
    expect(() => granularityBands(0.5, CITY, { table: bad([-1, 12]) })).toThrow(/not a range 0 ≤ lo ≤ hi/);
    expect(() => granularityBands(0.5, CITY, { table: bad([12, 20, 30]) })).toThrow(/is not a range \[lo, hi\]/);
    expect(() => granularityBands(0.5, CITY, { table: bad(12) })).toThrow(/is not a range \[lo, hi\]/);
  });

  it('refuses a table with no row of the band set for a cell', () => {
    const none = parseTable('granularity', {
      table: 'granularity',
      version: 1,
      section: 'x',
      rows: { settings: { frontageM: { value: [4, 6], unit: 'm', provenance: 'own', calibratable: true } } },
    });
    expect(() => granularityBands(0.5, CITY, { table: none })).toThrow(/no band of the set has a row/);
  });

  it('refuses a rung scale that is not a positive number', () => {
    for (const s of [0, -1.1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => granularityBands(0.5, withScales('CITY', s, 1), FIXTURE)).toThrow(/frontageScale must be a positive number/);
      expect(() => granularityBands(0.5, withScales('CITY', 1, s), FIXTURE)).toThrow(/depthScale must be a positive number/);
    }
  });

});
