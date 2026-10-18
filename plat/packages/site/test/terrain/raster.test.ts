// M0-e-01: the rasters' geometry (§2.3 *The rasters*, §3.2 (9)). The item's test: "the raster's cols × rows follow the
// frame's width × height and the margin" — plus the resolution by rung (TOWN 5 m, CITY 8 m, METROPOLIS 10 m), the
// hydrology grid over the same extent (200², 320², 400² cells at the rungs' targets, §2.3's own receipt), the frame law
// (siteFrame), a cell number's centre (cellCentre, the grids' one reader of it) and the flat fixture's constant raster
// (M0-c-01's).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { cdeg } from '@plat/kernel';
import { rungProfile } from '@plat/tables';
import { arenaReach, centreX, centreY, coveringGrid, flatTerrain, GROUND_KEY, heightGrid, hydroGridOver, siteFrame } from '../../src/terrain/index.js';
import { cellCentre } from '../../src/terrain/grid.js';
import { frame, paramsOf, pt, TABLES, terrainOf } from './support.js';

describe('the height raster follows the frame and its margin (§2.3, §3.2 (9))', { timeout: 60_000 }, () => {
  it('cols × rows = ⌈2 · ⌈w · (½ + m)⌉ ÷ cell⌉ × ⌈2 · ⌈h · (½ + m)⌉ ÷ cell⌉, centred on the frame, covering the arena by under a cell', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.5, max: 80, noNaN: true }),
        fc.double({ min: 0.5, max: 2, noNaN: true }),
        fc.constantFrom(0, 0.1, 0.3, 0.45),
        fc.constantFrom(500, 800, 1000, 333, 1),
        (areaKm2, aspect, margin, cell) => {
          const f = frame(areaKm2, aspect, margin);
          const g = heightGrid(f, cell);
          const reachX = Math.ceil(f.widthCm * (0.5 + margin));
          const reachY = Math.ceil(f.heightCm * (0.5 + margin));
          expect(g.cols).toBe(Math.ceil((2 * reachX) / cell));
          expect(g.rows).toBe(Math.ceil((2 * reachY) / cell));
          expect(g.originX).toBe(-Math.floor((g.cols * cell) / 2));
          expect(g.originY).toBe(-Math.floor((g.rows * cell) / 2));
          expect(g.originX).toBeLessThanOrEqual(-reachX);
          expect(g.originX + g.cols * cell).toBeGreaterThanOrEqual(reachX);
          expect(g.cols * cell - 2 * reachX).toBeLessThan(cell);
          expect(g.originY + g.rows * cell).toBeGreaterThanOrEqual(reachY);
          expect(arenaReach(f)).toEqual({ x: reachX, y: reachY });
        },
      ),
      { numRuns: 2000 },
    );
  });

  it('a terrain carries that grid at its rung\'s cell: TOWN 5 m, CITY 8 m, METROPOLIS 10 m', () => {
    const expected = { TOWN: 500, CITY: 800, METROPOLIS: 1000 } as const;
    for (const rung of ['TOWN', 'CITY', 'METROPOLIS'] as const) {
      const p = paramsOf(rung);
      expect(p.cellCm).toBe(expected[rung]);
      const f = frame(2, 1.5);
      const { terrain } = terrainOf(f, { relief: 'plain' }, p);
      const g = heightGrid(f, p.cellCm);
      expect([terrain.cellCm, terrain.cols, terrain.rows, terrain.originX, terrain.originY]).toEqual([g.cellCm, g.cols, g.rows, g.originX, g.originY]);
      expect(terrain.heightCm).toBeInstanceOf(Int32Array);
      expect(terrain.heightCm.length).toBe(g.cols * g.rows);
    }
  });

  it('the margin widens the raster: margin 0 covers the frame alone, 30 % the frame and 30 % of each side beyond it', () => {
    const bare = heightGrid(frame(25, 1, 0), 800);
    const base = heightGrid(frame(25, 1, 0.3), 800);
    expect([bare.cols, bare.rows]).toEqual([625, 625]);
    expect([base.cols, base.rows]).toEqual([1000, 1000]);
    const wide = heightGrid(frame(25, 2, 0.3), 800);
    expect(wide.cols).toBe(Math.ceil((2 * Math.ceil(707107 * 0.8)) / 800));
    expect(wide.rows).toBe(Math.ceil((2 * Math.ceil(353553 * 0.8)) / 800));
  });

  it('the frame law (siteFrame): the rung\'s target area at its target population, scaled by population, at the aspect', () => {
    const city = siteFrame({}, rungProfile('CITY'), TABLES);
    expect(city.ok && city.value).toEqual({ widthCm: 500000, heightCm: 500000, aspect: 1, marginShare: 0.3 });
    const half = siteFrame({ population: 10000 }, rungProfile('CITY'), TABLES);
    expect(half.ok && half.value.widthCm * half.value.heightCm).toBeCloseTo(0.5 * 500000 * 500000, -8);
    const byArea = siteFrame({ areaHa: 100, aspect: 2 }, rungProfile('TOWN'), TABLES);
    expect(byArea.ok && byArea.value).toEqual({ widthCm: 141421, heightCm: 70711, aspect: 2, marginShare: 0.3 });
    expect(siteFrame({ aspect: 3 }, rungProfile('TOWN'), TABLES)).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'aspect' });
    expect(siteFrame({ population: 0 }, rungProfile('TOWN'), TABLES)).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
  });
});

describe('the hydrology grid over the same extent (§2.3, J-K12)', { timeout: 60_000 }, () => {
  it('at the rungs\' targets: 200², 320² and 400² cells of 16, 25 and 32 m, the height raster\'s corner, its arrays empty until S1 (3)', () => {
    const expected = { TOWN: [1600, 200], CITY: [2500, 320], METROPOLIS: [3200, 400] } as const;
    for (const rung of ['TOWN', 'CITY', 'METROPOLIS'] as const) {
      const p = paramsOf(rung);
      const f = siteFrame({}, rungProfile(rung), TABLES);
      if (!f.ok) throw new Error(f.detail);
      const r = flatTerrain({ id: 'terrain:flat', key: GROUND_KEY, frame: f.value, params: p, epoch: 0 });
      if (!r.ok) throw new Error(r.detail);
      const t = r.value;
      expect([t.hydro.cellCm, t.hydro.cols, t.hydro.rows]).toEqual([expected[rung][0], expected[rung][1], expected[rung][1]]);
      expect([t.hydro.originX, t.hydro.originY]).toEqual([t.originX, t.originY]);
      expect(t.hydro.cols * t.hydro.cellCm).toBeGreaterThanOrEqual(t.cols * t.cellCm);
      expect((t.hydro.cols - 1) * t.hydro.cellCm).toBeLessThan(t.cols * t.cellCm);
      expect([t.flowDir.length, t.flatRank.length, t.flowAccum.length, t.outfalls.length]).toEqual([0, 0, 0, 0]);
    }
  });

  it('coveringGrid: the least cols × rows of a cell that cover an extent, from its corner', () => {
    const g = heightGrid(frame(3), 500);
    for (const cell of [1, 777, 1600, 3200, 100000]) {
      const c = coveringGrid(g, cell);
      expect([c.originX, c.originY]).toEqual([g.originX, g.originY]);
      expect(c.cols * cell).toBeGreaterThanOrEqual(g.cols * g.cellCm);
      expect((c.cols - 1) * cell).toBeLessThan(g.cols * g.cellCm);
      expect(c.rows * cell).toBeGreaterThanOrEqual(g.rows * g.cellCm);
      expect((c.rows - 1) * cell).toBeLessThan(g.rows * g.cellCm);
    }
    expect(() => coveringGrid(g, 0)).toThrow(RangeError);
    expect(() => heightGrid(frame(3), 2.5)).toThrow(RangeError);
  });

  it('cellCentre: cell c\'s centre is centreX, centreY of its column c % cols and its row by the reciprocal, to the double', () => {
    // Every cell of the height raster and of the hydrology and resource grids over it, at two rungs' cells.
    for (const cell of [500, 800]) {
      const g = heightGrid(frame(0.7, 1.4), cell);
      for (const grid of [g, hydroGridOver(g, 2500), coveringGrid(g, 3200)]) {
        const inv = 1 / grid.cols;
        for (let j = 0; j < grid.rows; j += 1) {
          for (let i = 0; i < grid.cols; i += 1) {
            const p = cellCentre(grid, j * grid.cols + i, inv);
            if (p.x !== centreX(grid, i) || p.y !== centreY(grid, j)) expect([i, j, p]).toEqual([i, j, { x: centreX(grid, i), y: centreY(grid, j) }]);
          }
        }
      }
    }
    // Any grid: the column and row recovered exactly, the centre origin + (i + ½) · cell on each axis.
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 5000 }),
        fc.integer({ min: 1, max: 5000 }),
        fc.integer({ min: 1, max: 100_000 }),
        fc.integer({ min: -(2 ** 24), max: 2 ** 24 }),
        fc.integer({ min: -(2 ** 24), max: 2 ** 24 }),
        fc.double({ min: 0, max: 1, maxExcluded: true, noNaN: true }),
        fc.double({ min: 0, max: 1, maxExcluded: true, noNaN: true }),
        (cols, rows, cellCm, originX, originY, u, v) => {
          const grid = { cellCm, cols, rows, originX, originY };
          const i = Math.floor(u * cols);
          const j = Math.floor(v * rows);
          const p = cellCentre(grid, j * cols + i, 1 / cols);
          expect(p.x).toBe(centreX(grid, i));
          expect(p.y).toBe(centreY(grid, j));
          expect([p.x, p.y]).toEqual([originX + (i + 0.5) * cellCm, originY + (j + 0.5) * cellCm]);
        },
      ),
      { numRuns: 2000 },
    );
  });
});

describe('the flat fixture\'s constant raster (M0-c-01; C-0016)', { timeout: 60_000 }, () => {
  it('is one height everywhere, on buildTerrain\'s grid, through the range check, with no feature', () => {
    const f = frame(25);
    const p = paramsOf('CITY');
    const flat = flatTerrain({ id: 'terrain:flat', key: GROUND_KEY, frame: f, params: p, epoch: 0 }, 1234, 50000);
    if (!flat.ok) throw new Error(flat.detail);
    const t = flat.value;
    expect(flat.warnings).toEqual([]);
    expect(t.heightCm.every((v) => v === 1234)).toBe(true);
    const g = heightGrid(f, p.cellCm);
    expect([t.cols, t.rows, t.originX, t.originY]).toEqual([g.cols, g.rows, g.originX, g.originY]);
    expect(t.features).toEqual([]);
    expect(t.datumCm).toBe(50000);
    expect(t.seaLevelCm).toBe(-50000);
    expect(t.lifecycle).toEqual({ existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } });
    const zero = flatTerrain({ id: 'terrain:flat', key: GROUND_KEY, frame: f, params: p, epoch: 0 });
    expect(zero.ok && zero.value.heightCm.every((v) => v === 0)).toBe(true);
    expect(zero.ok && Object.is(zero.value.seaLevelCm, 0)).toBe(true);
  });

  it('a constant beyond the limit clamps every cell and counts them all', () => {
    const p = paramsOf('TOWN');
    const r = flatTerrain({ id: 'terrain:flat', key: GROUND_KEY, frame: frame(1), params: p, epoch: 0 }, 4_000_000);
    if (!r.ok) throw new Error(r.detail);
    expect(r.warnings).toEqual([{ code: 'W_HEIGHT_CLAMPED', count: r.value.heightCm.length }]);
    expect(r.value.heightCm.every((v) => v === p.reliefLimitCm)).toBe(true);
    expect(flatTerrain({ id: 'terrain:flat', key: GROUND_KEY, frame: frame(1), params: p, epoch: 0 }, 0, 0.5)).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'datum' });
  });

  it('records the request\'s primitives as site features, in order', () => {
    const { terrain } = terrainOf(frame(1), {
      relief: 'plain',
      primitives: [
        { kind: 'hill', at: pt(100, 200), radiusM: 50, heightM: 10 },
        { kind: 'cliff', at: pt(-300, 0), bearingCdeg: cdeg(90), lengthM: 200, heightM: 20, widthM: 10 },
      ],
    }, paramsOf('TOWN'));
    expect(terrain.features).toEqual([
      { kind: 'hill', at: { x: 100, y: 200 } },
      { kind: 'cliff', at: { x: -300, y: 0 } },
    ]);
  });
});
