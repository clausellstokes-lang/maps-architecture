// M0-b-01 over the shipped tables: granularityBands with no options reads granularity.json, bands.json's default cuts
// and the rung's ladder.json scales; blockDepthRange reads regimes.json's floors — each expectation derived from the
// tables' own rows, so a run item's re-fit (M0-b-05a, AFTER-M-1) changes the numbers and never this test (C-0162 (1)).
// The checker's line "every number read comes from a table cell with provenance, none inlined" is held here twice:
// every cell the item reads carries unit, provenance (an admitted form) and calibratable, and the module's source holds
// no numeric literal but the design arithmetic's 0, 1 and 2.
import { readFileSync } from 'node:fs';
import {
  BASE_RUNGS,
  bandCentres,
  bandInterpolate,
  bandRows,
  defaultBandCuts,
  loadTable,
  parseTable,
  provenanceForm,
  rungProfile,
  type BandRows,
} from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { bandPlotDepth, blockDepthRange, granularityBands, minFrontage, regimeFloor, upperBlockArea } from '../../../src/infill/granularityBands.js';
import { centre, FIXTURE, FIXTURE_GRANULARITY, near } from './support.js';

const SET = defaultBandCuts();
const CENTRES = bandCentres(SET);
const GRAN = loadTable('granularity');
const REGIMES = loadTable('regimes');
const range = (rows: BandRows<unknown>, v: number): readonly number[] => bandInterpolate(rows as BandRows<readonly number[]>, v, SET);

describe('granularityBands over the shipped tables (expectations derived from their rows)', () => {
  it('reads granularity.json at the default cuts, scaled by each rung’s ladder.json factors', () => {
    const frontage = bandRows('granularity', 'frontageM');
    const depth = bandRows('granularity', 'depthM');
    for (const r of BASE_RUNGS) {
      const p = rungProfile(r);
      for (const v of [0, ...CENTRES, 0.3, 0.5, 0.8, 1]) {
        const got = granularityBands(v, p);
        const f = range(frontage, v);
        const d = range(depth, v);
        near(got.frontageM, [f[0] * p.granularity.frontageScale, f[1] * p.granularity.frontageScale]);
        near(got.depthM, [d[0] * p.granularity.depthScale, d[1] * p.granularity.depthScale]);
        expect(minFrontage(got)).toBe(got.frontageM[0]);
      }
    }
  });

  it('reads the table it is given: the default reading equals an explicit pass of the shipped tables', () => {
    for (const v of [0.1, 0.45, 0.9]) {
      expect(granularityBands(v, rungProfile('CITY'))).toEqual(granularityBands(v, rungProfile('CITY'), { table: GRAN, set: SET }));
    }
    // and a different table gives that table's reading, not a constant: a fixture whose rich row is twice the
    // shipped one reads twice the shipped band at the rich centre (the rich row is the last rowed band, read flat)
    const city = rungProfile('CITY');
    const s = city.granularity.depthScale;
    const rich = GRAN.pair('rich', 'depthM');
    const doubled = parseTable('granularity', {
      table: 'granularity',
      version: 1,
      section: 'x',
      rows: { rich: { frontageM: { value: [1, 2], unit: 'm', provenance: 'own', calibratable: true }, depthM: { value: [2 * rich[0], 2 * rich[1]], unit: 'm', provenance: 'own', calibratable: true } } },
    });
    const top = CENTRES[CENTRES.length - 1];
    near(granularityBands(top, city, { table: doubled }).depthM, [2 * rich[0] * s, 2 * rich[1] * s]);
    near(granularityBands(top, city).depthM, [rich[0] * s, rich[1] * s]);
    const poor = FIXTURE_GRANULARITY.pair('poor', 'depthM');
    near(granularityBands(centre('poor'), city, FIXTURE).depthM, [poor[0] * s, poor[1] * s]);
  });
});

describe("blockDepthRange over the shipped regimes (each rung's stage regimes)", () => {
  it('floors the two back-to-back rows by each stage regime’s regimes.json row', () => {
    for (const r of BASE_RUNGS) {
      const p = rungProfile(r);
      for (const key of p.stageRows.regimes) {
        const row = REGIMES.rows.get(key);
        const [rLo, rHi] = REGIMES.has(key, 'blockDepthFloorM') ? REGIMES.pair(key, 'blockDepthFloorM') : [0, 0];
        expect(regimeFloor(row)).toEqual([rLo, rHi]);
        for (const v of CENTRES) {
          const b = granularityBands(v, p);
          const e = blockDepthRange(b, row);
          expect(e).toEqual([Math.max(2 * b.depthM[0], rLo), Math.max(2 * b.depthM[1], rHi)]);
          expect(upperBlockArea(e)).toBe(e[1] * e[1]);
          expect(bandPlotDepth(b)).toBe((b.depthM[0] + b.depthM[1]) / 2);
        }
      }
    }
  });

  it("gives both floors 0 for a shipped row without one (linear_street) and for a regime with no row ('american')", () => {
    expect(REGIMES.has('linear_street')).toBe(true);
    expect(REGIMES.has('linear_street', 'blockDepthFloorM')).toBe(false);
    expect(regimeFloor(REGIMES.row('linear_street'))).toEqual([0, 0]);
    expect(REGIMES.has('american')).toBe(false);
    expect(regimeFloor(REGIMES.rows.get('american'))).toEqual([0, 0]);
  });
});

describe('every number read comes from a table cell with provenance, none inlined (the checker’s line)', () => {
  it('each cell the item reads carries unit, an admitted provenance and calibratable', () => {
    const cells: [string, string, string, string][] = [];
    for (const b of SET.bands) {
      for (const c of ['frontageM', 'depthM']) if (GRAN.has(b, c)) cells.push(['granularity', b, c, 'm']);
    }
    for (const [rk] of REGIMES.rows) if (REGIMES.has(rk, 'blockDepthFloorM')) cells.push(['regimes', rk, 'blockDepthFloorM', 'm']);
    for (const r of BASE_RUNGS) {
      cells.push(['ladder', r, 'granularity.frontageScale', 'ratio'], ['ladder', r, 'granularity.depthScale', 'ratio']);
    }
    cells.push(['bands', 'settings', 'order', 'none'], ['bands', 'settings', 'defaultCuts', 'share']);
    // At least the four granularity rows, the four regime floors, three rungs' two scales and the band set's two
    // settings (a run item's re-fit may add rows; it never removes these).
    expect(cells.length).toBeGreaterThanOrEqual(8 + 4 + 6 + 2);
    for (const [t, row, c, unit] of cells) {
      const cell = loadTable(t).cell(row, c);
      expect(cell.unit, `${t}/${row}/${c}`).toBe(unit);
      expect(provenanceForm(cell.provenance), `${t}/${row}/${c} provenance`).not.toBeNull();
      expect(typeof cell.calibratable, `${t}/${row}/${c}`).toBe('boolean');
    }
  });

  it("the module's source holds no numeric literal but the design arithmetic's 0, 1 and 2", () => {
    const src = readFileSync(new URL('../../../src/infill/granularityBands.ts', import.meta.url), 'utf8');
    const code = src
      .replace(/\/\*[\s\S]*?\*\//g, ' ')
      .replace(/\/\/.*$/gm, ' ')
      .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
      .replace(/`(?:[^`\\]|\\.)*`/g, '``');
    const literals = code.match(/(?<![\w.$])(?:\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?|\.\d+)(?![\w$])/gi) ?? [];
    expect(literals.length).toBeGreaterThan(0);
    expect([...new Set(literals)].sort()).toEqual(['0', '1', '2']);
  });
});
