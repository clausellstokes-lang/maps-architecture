// M0-s-02: §4.5's two readings of a band-keyed table — the four granularity rows served at six bands (comfortable
// interpolated between modest and prosperous, squalid reading the poor row) and the discrete-cell rule (a discrete
// cell at comfortable reads the modest cell, V03's J-V3.28) — over the default band set and over a town's cuts.
//
// The rules are read on FIXTURE tables this test owns, parsed through parseTable with the design's default rows and band
// set (§4.5, §4.7), so a run item's hand-over of granularity.json or bands.json (M0.md §2) never edits this test; the
// shipped tables are read through the same rules with expectations derived from their own rows (C-0162 (1)).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  BAND_IDS,
  bandCentres,
  bandInterpolate,
  bandOf,
  bandRows,
  defaultBandCuts,
  discreteCell,
  loadTable,
  middleBand,
  parseTable,
  type BandCuts,
  type BandRows,
  type Table,
} from '../../src/index.js';

const cell = (value: unknown, unit: string, calibratable = true): Record<string, unknown> => ({ value, unit, provenance: 'own', calibratable });

/** The design's band set (§4.5): FTG's shares 1 / 1 / 20 / 40 / 20 / 10 normalised, the cuts their cumulative sums. */
const FIXTURE_BANDS = parseTable('bands', {
  table: 'bands',
  version: 1,
  section: '§4.5 (test fixture)',
  rows: {
    settings: { order: cell([...BAND_IDS], 'none', false), defaultCuts: cell([0.011, 0.022, 0.239, 0.674, 0.891], 'share') },
    squalid: { share: cell(0.011, 'share') },
    poor: { share: cell(0.011, 'share') },
    modest: { share: cell(0.217, 'share') },
    comfortable: { share: cell(0.435, 'share') },
    prosperous: { share: cell(0.217, 'share') },
    rich: { share: cell(0.109, 'share') },
  },
});

/** The design's four granularity rows (§4.7). */
const FIXTURE_GRANULARITY = parseTable('granularity', {
  table: 'granularity',
  version: 1,
  section: '§4.7 (test fixture)',
  rows: {
    poor: { frontageM: cell([4, 6], 'm'), depthM: cell([12, 20], 'm'), joinMax: cell(1, 'count') },
    modest: { frontageM: cell([6, 9], 'm'), depthM: cell([18, 30], 'm'), joinMax: cell(2, 'count') },
    prosperous: { frontageM: cell([9, 14], 'm'), depthM: cell([25, 40], 'm'), joinMax: cell(3, 'count') },
    rich: { frontageM: cell([14, 25], 'm'), depthM: cell([30, 60], 'm'), joinMax: cell(5, 'count') },
  },
});

/** A band-keyed table's cell as BandRows (bandRows' reading, over any parsed table). */
function rowsOf<T>(t: Table, c: string): BandRows<T> {
  const out: Record<string, T> = {};
  for (const b of BAND_IDS) if (t.has(b, c)) out[b] = t.value(b, c) as T;
  return out;
}

const DEPTH = rowsOf<readonly number[]>(FIXTURE_GRANULARITY, 'depthM');
const FRONTAGE = rowsOf<readonly number[]>(FIXTURE_GRANULARITY, 'frontageM');
const JOIN = rowsOf<number>(FIXTURE_GRANULARITY, 'joinMax');
const SET: BandCuts = { bands: FIXTURE_BANDS.strs('settings', 'order'), cuts: FIXTURE_BANDS.nums('settings', 'defaultCuts') };
const SHARES = rowsOf<number>(FIXTURE_BANDS, 'share');
const CENTRE = new Map(BAND_IDS.map((b, i) => [b, bandCentres(SET)[i]] as const));
const at = (band: string): number => CENTRE.get(band as (typeof BAND_IDS)[number]) as number;
/** Entry by entry within 1e-9 (a blend's rounding). */
function near(actual: readonly number[], expected: readonly number[]): void {
  expect(actual).toHaveLength(expected.length);
  actual.forEach((a, i) => expect(a).toBeCloseTo(expected[i], 9));
}

describe('the band set (§4.5)', () => {
  it('has the six bands in order and the default cuts at the cumulative default shares', () => {
    expect(SET.bands).toEqual(['squalid', 'poor', 'modest', 'comfortable', 'prosperous', 'rich']);
    expect(SET.cuts).toEqual([0.011, 0.022, 0.239, 0.674, 0.891]);
    let cum = 0;
    SET.cuts.forEach((c, i) => {
      cum += SHARES[BAND_IDS[i]] as number;
      expect(c).toBeCloseTo(cum, 12);
    });
  });

  it('places each band at its centre and a cut in the band above it', () => {
    for (const b of BAND_IDS) expect(bandOf(at(b), SET)).toBe(b);
    expect(bandOf(0, SET)).toBe('squalid');
    expect(bandOf(0.239, SET)).toBe('comfortable');
    expect(bandOf(0.2389999, SET)).toBe('modest');
    expect(bandOf(1, SET)).toBe('rich');
  });

  it('designates comfortable the middle band under the default shares (0.239 after modest, 0.674 after comfortable)', () => {
    expect(middleBand(SHARES)).toBe('comfortable');
    expect(middleBand({ squalid: 0.3, poor: 0.3, rich: 0.4 })).toBe('poor');
  });
});

describe('the four granularity rows served at six bands', () => {
  it('serves the four rowed bands their own rows at their centres', () => {
    expect(bandInterpolate(DEPTH, at('poor'), SET)).toEqual([12, 20]);
    expect(bandInterpolate(DEPTH, at('modest'), SET)).toEqual([18, 30]);
    expect(bandInterpolate(DEPTH, at('prosperous'), SET)).toEqual([25, 40]);
    expect(bandInterpolate(DEPTH, at('rich'), SET)).toEqual([30, 60]);
    expect(bandInterpolate(FRONTAGE, at('rich'), SET)).toEqual([14, 25]);
  });

  it('interpolates comfortable between modest and prosperous along the value', () => {
    // comfortable's centre lies midway between modest's and prosperous's under the default cuts
    near(bandInterpolate(DEPTH, at('comfortable'), SET), [21.5, 35]);
    near(bandInterpolate(FRONTAGE, at('comfortable'), SET), [7.5, 11.5]);
    const q = bandInterpolate(DEPTH, 0.3, SET);
    expect(q[0]).toBeGreaterThan(18);
    expect(q[0]).toBeLessThan(21.5);
  });

  it('reads the poor row at squalid, and flat beyond the end rows', () => {
    expect(bandInterpolate(DEPTH, at('squalid'), SET)).toEqual([12, 20]);
    expect(bandInterpolate(DEPTH, 0, SET)).toEqual([12, 20]);
    expect(bandInterpolate(DEPTH, 1, SET)).toEqual([30, 60]);
    expect(bandInterpolate(DEPTH, -5, SET)).toEqual([12, 20]);
  });

  it("reads a town's cuts (a FieldBands passes as a band set)", () => {
    const town: BandCuts = { bands: [...BAND_IDS], cuts: [0.05, 0.1, 0.3, 0.6, 0.8] };
    const centres = bandCentres(town);
    near(centres, [0.025, 0.075, 0.2, 0.45, 0.7, 0.9]);
    near(bandInterpolate(DEPTH, centres[3], town), [21.5, 35]);
    expect(bandInterpolate(DEPTH, centres[2], town)).toEqual([18, 30]);
    expect([bandOf(0.06, town), bandOf(0.06, SET)]).toEqual(['poor', 'modest']);
    expect(discreteCell(JOIN, bandOf(0.62, town))).toBe(3);
  });

  it('property: every value reads between the rows, exactly a row at its centre, continuously', () => {
    fc.assert(
      fc.property(fc.double({ min: 0, max: 1, noNaN: true }), (v) => {
        const [lo, hi] = bandInterpolate(DEPTH, v, SET);
        return lo >= 12 && lo <= 30 && hi >= 20 && hi <= 60 && lo < hi;
      }),
    );
    fc.assert(
      fc.property(fc.double({ min: 0, max: 0.999, noNaN: true }), (v) => {
        const a = bandInterpolate(JOIN, v, SET);
        const b = bandInterpolate(JOIN, v + 0.001, SET);
        return b >= a && b - a < 0.02;
      }),
    );
  });

  it('refuses rows of different shapes, a set without rows and malformed cuts', () => {
    expect(() => bandInterpolate({ poor: [1, 2], rich: [1, 2, 3] }, 0.5, SET)).toThrow(/differ in shape/);
    expect(() => bandInterpolate({}, 0.5, SET)).toThrow(/no band of the set has a row/);
    expect(() => bandInterpolate(DEPTH, Number.NaN, SET)).toThrow(/finite/);
    expect(() => bandCentres({ bands: ['a', 'b'], cuts: [] })).toThrow(/one cut fewer/);
    expect(() => bandCentres({ bands: ['a', 'b', 'c'], cuts: [0.5, 0.4] })).toThrow(/ascend/);
  });
});

describe('the discrete-cell rule (§4.5; J-V3.28)', () => {
  const ROWS = { poor: 'p', modest: 'm', prosperous: 'pr', rich: 'r' };

  it('reads the modest cell at comfortable and the poor cell at squalid', () => {
    expect(discreteCell(ROWS, 'comfortable')).toBe('m');
    expect(discreteCell(ROWS, 'squalid')).toBe('p');
    expect(discreteCell(JOIN, 'comfortable')).toBe(2);
    expect(discreteCell(JOIN, 'squalid')).toBe(1);
  });

  it('reads a rowed band its own cell', () => {
    for (const b of ['poor', 'modest', 'prosperous', 'rich'] as const) expect(discreteCell(ROWS, b)).toBe(ROWS[b]);
  });

  it('switches at the lower cut of the next rowed band above', () => {
    const read = (v: number): string => discreteCell(ROWS, bandOf(v, SET));
    expect(read(0.6739)).toBe('m');
    expect(read(0.674)).toBe('pr');
  });

  it('refuses a band outside the set and a set without rows', () => {
    expect(() => discreteCell(ROWS, 'gold')).toThrow(/not a band/);
    expect(() => discreteCell({}, 'poor')).toThrow(/no band of the set has a row/);
  });
});

describe("the shipped tables read through the same rules (expectations derived from their own rows)", () => {
  const live = defaultBandCuts();
  const bands = loadTable('bands');
  const depth = bandRows('granularity', 'depthM') as BandRows<readonly number[]>;
  const centres = bandCentres();

  it("serves bands.json's order and default cuts, the cuts at its cumulative shares", () => {
    expect(live).toEqual({ bands: bands.strs('settings', 'order'), cuts: bands.nums('settings', 'defaultCuts') });
    expect(live.bands).toEqual([...BAND_IDS]);
    let cum = 0;
    live.cuts.forEach((c, i) => {
      cum += bands.num(BAND_IDS[i], 'share');
      expect(Math.abs(c - cum)).toBeLessThan(1e-9);
    });
    expect(middleBand()).toBe(middleBand(bandRows('bands', 'share') as BandRows<number>));
    for (let i = 0; i < BAND_IDS.length; i += 1) expect(bandOf(centres[i])).toBe(BAND_IDS[i]);
  });

  it("serves granularity.json's four rows at six bands: its own row at a rowed centre, the blend between, the end row flat", () => {
    expect(Object.keys(depth).sort()).toEqual(['modest', 'poor', 'prosperous', 'rich']);
    const g = loadTable('granularity');
    for (const b of ['poor', 'modest', 'prosperous', 'rich']) expect(bandInterpolate(depth, centres[BAND_IDS.indexOf(b as never)])).toEqual(g.pair(b, 'depthM'));
    expect(bandInterpolate(depth, centres[0])).toEqual(g.pair('poor', 'depthM'));
    const [cm, cc, cp] = [centres[2], centres[3], centres[4]];
    const t = (cc - cm) / (cp - cm);
    const [m, p] = [g.pair('modest', 'depthM'), g.pair('prosperous', 'depthM')];
    near(bandInterpolate(depth, cc), [m[0] + t * (p[0] - m[0]), m[1] + t * (p[1] - m[1])]);
    expect(discreteCell(bandRows('granularity', 'joinMax'), 'comfortable')).toBe(g.num('modest', 'joinMax'));
    expect(discreteCell(bandRows('granularity', 'joinMax'), 'squalid')).toBe(g.num('poor', 'joinMax'));
  });
});
