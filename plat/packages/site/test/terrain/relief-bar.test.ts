// M0-e-01's exit bar, marked "here" (§13.1; §16 M0 (e); §2.3 Heights, GEO-15): "a 3 000 m relief fixture with a
// hill-acropolis site stores without a clamp; a 40 000 m value clamps and reports W_HEIGHT_CLAMPED with its cell count
// (never wraps)". Each fixture is built twice — under the table's declared limit (10 km) and under the Int32 raster's
// own bound (2³¹ − 1 cm, where nothing these fixtures make is clamped) — so the second build is the unclamped heights
// and the first must equal it wherever it lies in range, equal ± the limit elsewhere, and count exactly those cells.
import { describe, expect, it } from 'vitest';
import { INT32_HEIGHT_MAX, siteFrame, type SiteRequest, type TerrainParams } from '../../src/terrain/index.js';
import { rungProfile } from '@plat/tables';
import { extremes, paramsOf, pt, TABLES, terrainOf } from './support.js';

const CITY = paramsOf('CITY');
const CITY_FRAME = (() => {
  const f = siteFrame({}, rungProfile('CITY'), TABLES);
  if (!f.ok) throw new Error(f.detail);
  return f.value;
})();

/** A hill-acropolis site: a hill under the town's centre on hilly ground. */
function acropolis(heightM: number): SiteRequest {
  return { relief: 'hilly', primitives: [{ kind: 'hill', at: pt(0, 0), radiusM: 1200, heightM }] };
}

/** These fixtures build CITY rasters of 10⁶ cells, several per test: a generous timeout for a contended machine. */
const HEAVY = 180_000;

function unclamped(params: TerrainParams): TerrainParams {
  return { ...params, reliefLimitCm: INT32_HEIGHT_MAX };
}

describe('§13.1 / §16 M0 (e): the relief fixtures (the exit bar)', () => {
  it('the 3 000 m relief fixture with a hill-acropolis site stores without a clamp (CITY, the table\'s 10 km limit)', () => {
    expect(CITY.reliefLimitCm).toBe(1_000_000);
    const { terrain, warnings } = terrainOf(CITY_FRAME, acropolis(3000), CITY, [3, 0, 0, 0]);
    const { min, max } = extremes(terrain.heightCm);
    expect(max - min).toBeGreaterThanOrEqual(300_000);
    expect(warnings.filter((w) => w.code === 'W_HEIGHT_CLAMPED')).toEqual([]);
    const raw = terrainOf(CITY_FRAME, acropolis(3000), unclamped(CITY), [3, 0, 0, 0]).terrain;
    expect(Buffer.from(terrain.heightCm.buffer).equals(Buffer.from(raw.heightCm.buffer))).toBe(true);
    expect(terrain.reliefLimitCm).toBe(1_000_000);
  }, HEAVY);

  it('a 40 000 m value clamps to the limit and reports W_HEIGHT_CLAMPED with its cell count — never wraps', () => {
    const { terrain, warnings } = terrainOf(CITY_FRAME, acropolis(40_000), CITY, [4, 0, 0, 0]);
    const raw = terrainOf(CITY_FRAME, acropolis(40_000), unclamped(CITY), [4, 0, 0, 0]);
    expect(raw.warnings).toEqual([]);
    const lim = CITY.reliefLimitCm;
    let over = 0;
    const wrong: number[] = [];
    for (let i = 0; i < raw.terrain.heightCm.length; i += 1) {
      const u = raw.terrain.heightCm[i];
      const s = terrain.heightCm[i];
      const want = u > lim ? lim : u < -lim ? -lim : u;
      if (want !== u) over += 1;
      if (s !== want && wrong.length < 5) wrong.push(i);
    }
    expect(wrong).toEqual([]);
    expect(over).toBeGreaterThan(1000);
    expect(warnings).toEqual([{ code: 'W_HEIGHT_CLAMPED', count: over }]);
    const { min, max } = extremes(terrain.heightCm);
    expect(max).toBe(lim);
    expect(min).toBeGreaterThanOrEqual(-lim);
    // The hill's top is 4 000 000 cm above the datum: an Int16 cell would hold it as 4 000 000 − 61 · 65 536 = 2 304,
    // an Int32 cell holds it; the range check stores the limit instead, a positive height where the ground is high.
    expect(raw.terrain.heightCm[terrain.cols * (terrain.rows >> 1) + (terrain.cols >> 1)]).toBeGreaterThan(3_900_000);
    expect(terrain.heightCm[terrain.cols * (terrain.rows >> 1) + (terrain.cols >> 1)]).toBe(lim);
  }, HEAVY);

  it('the same bar at TOWN and METROPOLIS: the 3 000 m fixture stores unclamped, the 40 000 m one clamps and counts', () => {
    for (const rung of ['TOWN', 'METROPOLIS'] as const) {
      const p = paramsOf(rung);
      const f = siteFrame({}, rungProfile(rung), TABLES);
      if (!f.ok) throw new Error(f.detail);
      const low = terrainOf(f.value, acropolis(3000), p, [5, 0, 0, 0]);
      expect(low.warnings).toEqual([]);
      const { min, max } = extremes(low.terrain.heightCm);
      expect(max - min).toBeGreaterThanOrEqual(300_000);
      const high = terrainOf(f.value, acropolis(40_000), p, [5, 0, 0, 0]);
      expect(high.warnings).toHaveLength(1);
      expect(high.warnings[0].code).toBe('W_HEIGHT_CLAMPED');
      expect(high.warnings[0].count).toBeGreaterThan(0);
      expect(extremes(high.terrain.heightCm).max).toBe(p.reliefLimitCm);
    }
  }, HEAVY);
});
