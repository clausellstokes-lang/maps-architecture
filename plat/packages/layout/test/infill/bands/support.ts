// M0-b-01's test fixtures: the design's default rows as parsed tables this folder owns, so a run item's re-fit of the
// shipped granularity.json or regimes.json (M0-b-05a, AFTER-M-1) never edits these tests (C-0162 (1)'s pattern). The
// rows are §4.7's granularity table, §4.4's stage-regime floors and §4.5's band set; the rung profiles are the shipped
// CITY profile with §1.1's granularity scales written in (TOWN 1.10 / 1.10, CITY 1.00 / 1.00, METROPOLIS 0.90 / 0.95).
import { BAND_IDS, bandCentres, parseTable, rungProfile, type BandCuts, type RungProfile, type Table } from '@plat/tables';
import { expect } from 'vitest';

const cell = (value: unknown, unit: string, calibratable = true): Record<string, unknown> => ({ value, unit, provenance: 'own', calibratable });

/** §4.7's four rows: frontage width and depth (m). */
export const DESIGN_ROWS = {
  poor: { frontageM: [4, 6], depthM: [12, 20] },
  modest: { frontageM: [6, 9], depthM: [18, 30] },
  prosperous: { frontageM: [9, 14], depthM: [25, 40] },
  rich: { frontageM: [14, 25], depthM: [30, 60] },
} as const;

/** The design's granularity table (§4.7), four rows over six bands. */
export const FIXTURE_GRANULARITY: Table = parseTable('granularity', {
  table: 'granularity',
  version: 1,
  section: '§4.7 (M0-b-01 test fixture)',
  rows: {
    poor: { frontageM: cell([4, 6], 'm'), depthM: cell([12, 20], 'm'), joinMax: cell(1, 'count') },
    modest: { frontageM: cell([6, 9], 'm'), depthM: cell([18, 30], 'm'), joinMax: cell(2, 'count') },
    prosperous: { frontageM: cell([9, 14], 'm'), depthM: cell([25, 40], 'm'), joinMax: cell(3, 'count') },
    rich: { frontageM: cell([14, 25], 'm'), depthM: cell([30, 60], 'm'), joinMax: cell(5, 'count') },
  },
});

/** §4.4's stage-regime table: the four block-depth band floors, and `linear_street`, a row that gives none. */
export const FIXTURE_REGIMES: Table = parseTable('regimes', {
  table: 'regimes',
  version: 1,
  section: '§4.4 (M0-b-01 test fixture)',
  rows: {
    dense_core: { blockDepthFloorM: cell([30, 45], 'm'), a: cell(1.3, 'ratio') },
    walled_rings: { blockDepthFloorM: cell([45, 70], 'm'), a: cell(1.8, 'ratio') },
    ribbon: { blockDepthFloorM: cell([30, 50], 'm'), a: cell(4, 'ratio') },
    suburb: { blockDepthFloorM: cell([40, 60], 'm'), a: cell(3, 'ratio') },
    linear_street: { a: cell(8, 'ratio') },
  },
});

/** §4.5's band set: the six bands, the default cuts at FTG's cumulative shares 1 / 1 / 20 / 40 / 20 / 10. */
export const FIXTURE_SET: BandCuts = { bands: [...BAND_IDS], cuts: [0.011, 0.022, 0.239, 0.674, 0.891] };

/** Each band's centre under the fixture set. */
export const CENTRE: ReadonlyMap<string, number> = new Map(BAND_IDS.map((b, i) => [b, bandCentres(FIXTURE_SET)[i]] as const));

export function centre(band: string): number {
  const c = CENTRE.get(band);
  if (c === undefined) throw new Error(`no band '${band}'`);
  return c;
}

/** A rung profile with §1.1's granularity scales written in (the rest of the shipped CITY row). */
export function withScales(rung: RungProfile['rung'], frontageScale: number, depthScale: number): RungProfile {
  const base = rungProfile('CITY');
  return { ...base, rung, granularity: { ...base.granularity, frontageScale, depthScale } };
}

/** §1.1's granularity columns: frontage × / depth ×. */
export const DESIGN_SCALES = { TOWN: [1.1, 1.1], CITY: [1, 1], METROPOLIS: [0.9, 0.95] } as const;
export const TOWN = withScales('TOWN', ...DESIGN_SCALES.TOWN);
export const CITY = withScales('CITY', ...DESIGN_SCALES.CITY);
export const METROPOLIS = withScales('METROPOLIS', ...DESIGN_SCALES.METROPOLIS);

/** The fixture options: the design's rows and band set. */
export const FIXTURE = { table: FIXTURE_GRANULARITY, set: FIXTURE_SET } as const;

/** Entry by entry within 1e-9 (an interpolation's or a scale's rounding). */
export function near(actual: readonly number[], expected: readonly number[]): void {
  expect(actual).toHaveLength(expected.length);
  actual.forEach((a, i) => expect(a, `entry ${i}`).toBeCloseTo(expected[i], 9));
}
