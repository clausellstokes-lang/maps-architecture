// M0-e-02's exit bar, marked "here" (§13.1; §16 M0 (e); §2.3 *The hydrology grid*): "D8 defined on 100 % of land
// cells over frame and margin on 60 m and 3 000 m relief; the river's bed monotone to its outfall; carve ≤
// carveMaxCm". The design's measured receipt reproduced in order — the bucket-queue flood, the two-gradient flats, D8,
// accumulation — on the hydrology grid over frame and margin at each rung's cell (§12.4's ≈ 102 000 cells at CITY),
// with a river from the highest edge carved into the same terrains; then the same bars with R12-5's hydroCoarsen
// switch (the cell one step coarser, nothing else changed — every bar still holds at the coarser cell).
import { streamFromKey } from '@plat/kernel';
import type { Cdeg, Cm, Terrain, WaterBody } from '@plat/model';
import { rungProfile, type BaseRung } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { arenaReach, buildTerrain, GROUND_KEY, hydroGridOver, siteFrame, terrainParams, type SiteRequest } from '../../src/terrain/index.js';
import { accumulate, d8, hydroField, hydroParams, priorityFlood, rasterGeom, rasterise, resolveFlats, runRivers, type RiverReport } from '../../src/hydro/index.js';
import { bedAlong, carveBars, courseOf, D8_STEPS, drainPath, nonIncreasing, siteContext, TABLES } from './support.js';

/** The 60 m relief fixture: S0's rolling class (amplitude 60 m). */
const RELIEF_60: SiteRequest = { relief: 'rolling' };
/** The 3 000 m relief fixture: a hill-acropolis site, a 3 000 m hill under the town's centre on hilly ground. */
const RELIEF_3000: SiteRequest = { relief: 'hilly', primitives: [{ kind: 'hill', at: { x: 0 as Cm, y: 0 as Cm }, radiusM: 1200, heightM: 3000 }] };

/** These fixtures build rasters of 0.4 – 1.6 × 10⁶ cells: a generous timeout for a contended machine. */
const HEAVY = 240_000;

function terrainOf(rung: BaseRung, request: SiteRequest, key: number): Terrain {
  const f = siteFrame({}, rungProfile(rung), TABLES);
  if (!f.ok) throw new Error(f.detail);
  const r = buildTerrain({ id: 'terrain:relief', key: GROUND_KEY, frame: f.value, params: terrainParams(TABLES, rung), epoch: 0 }, request, streamFromKey([key, 0, 0, 0]));
  if (!r.ok) throw new Error(r.detail);
  return r.value;
}

function clone(t: Terrain): Terrain {
  return { ...t, heightCm: Int32Array.from(t.heightCm), hydro: { ...t.hydro } };
}

/** The bars on one run: D8 on every cell, each draining off the grid; carve ≤ cap (the bed under the course: expectFrameRiver). */
function expectBars(before: Terrain, after: Terrain, report: RiverReport, rung: BaseRung): void {
  const g = after.hydro;
  const n = g.cols * g.rows;
  expect(report.hydrology.d8Undefined).toBe(0);
  expect(after.flowDir.length).toBe(n);
  let defined = 0;
  for (const k of after.flowDir) if (k <= 7) defined += 1;
  expect(defined / n).toBe(1);
  // Every cell's flow path reaches the frame edge (O1 (b)): the accumulation of the off-grid outlets sums to n.
  let out = 0;
  for (let c = 0; c < n; c += 1) {
    const k = after.flowDir[c];
    const i = (c % g.cols) + D8_STEPS.dx[k];
    const j = Math.floor(c / g.cols) + D8_STEPS.dy[k];
    if (i < 0 || j < 0 || i >= g.cols || j >= g.rows) out += after.flowAccum[c];
  }
  expect(out).toBe(n);
  // The carve: no cell raised, no cell and no river's reported cut past the cap.
  carveBars(before.heightCm, after, [], hydroParams(TABLES, rung).carveMaxCm, report.rivers);
}

/**
 * A river that fits and leaves by the frame: its outcome, its last point on the arena's edge, its corridor's cells
 * draining one into the next along the course and off the grid by the last.
 */
function expectFrameRiver(terrain: Terrain, body: WaterBody, report: RiverReport): void {
  expect(report.rivers[0]).toMatchObject({ fits: true, outfall: 'frame', corridor: true });
  const course = courseOf(body);
  // The bed under the whole course never rises, from the inlet to the outfall.
  const bed = bedAlong(terrain, course);
  expect(bed.length).toBeGreaterThan(100);
  expect(nonIncreasing(bed)).toBe(true);
  const end = course[course.length - 1];
  const f = siteFrame({}, rungProfile('CITY'), TABLES);
  if (!f.ok) throw new Error(f.detail);
  const reach = arenaReach(f.value);
  expect(Math.abs(end.x) === reach.x || Math.abs(end.y) === reach.y).toBe(true);
  const cells = rasterise(terrain.hydro, course, true).cells;
  const path = drainPath({ grid: terrain.hydro, flowDir: terrain.flowDir }, cells[0]);
  expect(path).not.toBeNull();
  expect(path?.slice(0, cells.length - 1)).toEqual(cells.slice(0, cells.length - 1));
  // The drain path ends at a border cell whose D8 leaves the grid (the outfall `frame`).
  const last = path?.[path.length - 1] ?? -1;
  const g = terrain.hydro;
  const i = last % g.cols;
  const j = Math.floor(last / g.cols);
  expect(i === 0 || j === 0 || i === g.cols - 1 || j === g.rows - 1).toBe(true);
}

describe('§13.1 / §2.3: D8 on 100 % of the hydrology grid over frame and margin, 60 m and 3 000 m relief (the exit bar)', () => {
  for (const rung of ['CITY', 'TOWN', 'METROPOLIS'] as const) {
    it(`${rung}: the receipt in order — flood, flats, D8, accumulation — every cell with a defined D8 on both reliefs`, () => {
      const p = hydroParams(TABLES, rung);
      for (const [name, request, key] of [['60 m', RELIEF_60, 60], ['3 000 m', RELIEF_3000, 3000]] as const) {
        const terrain = terrainOf(rung, request, key);
        const grid = hydroGridOver(rasterGeom(terrain), p.hydroCellCm);
        const field = hydroField(terrain, grid);
        const flood = priorityFlood(field, p.lakeThresholdCm);
        const flats = resolveFlats(field);
        const dir = d8(field);
        accumulate(field);
        const n = grid.cols * grid.rows;
        expect([name, flood.cells, flats.unresolved, dir.undefinedCells]).toEqual([name, n, 0, 0]);
        for (let c = 0; c < n; c += 1) expect(field.flowDir[c] <= 7).toBe(true);
        if (rung === 'CITY') {
          // §12.4's S1 row: ≈ 102 000 hydrology cells at CITY (320² at 25 m over frame and margin).
          expect(n).toBeGreaterThan(95_000);
          expect(n).toBeLessThan(110_000);
          expect(grid.cellCm).toBe(2500);
        }
        // The relief really is 60 m or 3 000 m.
        let lo = Infinity;
        let hi = -Infinity;
        for (const v of terrain.heightCm) {
          lo = Math.min(lo, v);
          hi = Math.max(hi, v);
        }
        expect(hi - lo).toBeGreaterThan(name === '60 m' ? 2_000 : 290_000);
      }
    }, HEAVY);
  }

  for (const coarsen of [false, true]) {
    it(`CITY${coarsen ? ' with hydroCoarsen' : ''}: a river from the highest edge on both reliefs fits and leaves by the frame — D8 100 %, bed monotone to that outfall, carve ≤ carveMaxCm`, () => {
      const p = hydroParams(TABLES, 'CITY');
      for (const [request, key] of [[RELIEF_60, 60], [RELIEF_3000, 3000]] as const) {
        const before = terrainOf('CITY', request, key);
        const terrain = clone(before);
        const r = runRivers({ size: {}, site: { river: {} } }, terrain, { bodies: [], bridges: [] }, siteContext(key), { hydroCoarsen: coarsen });
        if (!r.ok) throw new Error(r.detail);
        expect(terrain.hydro.cellCm).toBe(coarsen ? p.hydroCoarseCellCm : p.hydroCellCm);
        expect(r.value.report.hydrology.cellCm).toBe(terrain.hydro.cellCm);
        expectBars(before, terrain, r.value.report, 'CITY');
        expect(r.value.water.bodies).toHaveLength(1);
        // The delivered outcome, asserted without conditions: the course fits, reaches the frame edge (its outfall) and
        // its corridor's D8 is set (C-0175 (1) – (6)).
        expectFrameRiver(terrain, r.value.water.bodies[0], r.value.report);
        // The core (F-RIVER's detection): on these two fixtures the river from the highest edge passes the frame's
        // centre at 2.3 km (60 m) and 2.8 km (3 000 m, the acropolis hill under the centre) — outside the 1.25 km core.
        // M0 declares the miss (C-0175 (8)): delivered `degraded` (tier 4, F-RIVER), its fallback F-RIVER's S3
        // centre-to-bank rung (M1) or the request's valley along the river bearing (S1 (1); the next test).
        expect(r.value.report.rivers[0].reachesCore).toBe(false);
        expect(r.value.report.requested[0]).toEqual({ feature: 'river', delivered: 'degraded', tier: 4, entity: 'water:river:0', cause: 'F-RIVER' });
      }
    }, HEAVY);
  }

  it('CITY: a river along a valley on its bearing (S1 (1)) reaches the core and leaves by the frame on the 60 m relief — full, every bar', () => {
    for (const coarsen of [false, true]) {
      const before = terrainOf('CITY', { relief: 'rolling', primitives: [{ kind: 'valley', at: { x: 0 as Cm, y: 0 as Cm }, bearingCdeg: 18000 as Cdeg, widthM: 800, depthM: 20 }] }, 60);
      const terrain = clone(before);
      const r = runRivers({ size: {}, site: { river: { inflowBearingCdeg: 18000 } } }, terrain, { bodies: [], bridges: [] }, siteContext(60), { hydroCoarsen: coarsen });
      if (!r.ok) throw new Error(r.detail);
      expectBars(before, terrain, r.value.report, 'CITY');
      const b = r.value.water.bodies[0];
      expectFrameRiver(terrain, b, r.value.report);
      // It arrives on the south edge and passes within the core (¼ of the frame's shorter side of the centre).
      const f = siteFrame({}, rungProfile('CITY'), TABLES);
      if (!f.ok) throw new Error(f.detail);
      const course = courseOf(b);
      expect(course[0].y).toBe(-arenaReach(f.value).y);
      expect(Math.min(...course.map((q) => Math.hypot(q.x, q.y)))).toBeLessThanOrEqual(0.25 * Math.min(f.value.widthCm, f.value.heightCm));
      expect(r.value.report.rivers[0].reachesCore).toBe(true);
      expect(r.value.report.requested[0]).toMatchObject({ feature: 'river', delivered: 'full' });
    }
  }, HEAVY);

  it('the switch changes only the cell size: the same request and seed give the same kinds of output on the coarser grid', () => {
    const before = terrainOf('TOWN', RELIEF_60, 61);
    const a = clone(before);
    const b = clone(before);
    const ra = runRivers({ size: {}, site: { river: { inflowBearingCdeg: 0 } } }, a, { bodies: [], bridges: [] }, siteContext(5, 'TOWN'));
    const rb = runRivers({ size: {}, site: { river: { inflowBearingCdeg: 0 } } }, b, { bodies: [], bridges: [] }, siteContext(5, 'TOWN'), { hydroCoarsen: true });
    if (!ra.ok || !rb.ok) throw new Error('refused');
    const p = hydroParams(TABLES, 'TOWN');
    expect([a.hydro.cellCm, b.hydro.cellCm]).toEqual([p.hydroCellCm, p.hydroCoarseCellCm]);
    // The grid covers the same extent from the same corner.
    expect([b.hydro.originX, b.hydro.originY]).toEqual([a.hydro.originX, a.hydro.originY]);
    expect(b.hydro.cols * p.hydroCoarseCellCm).toBeGreaterThanOrEqual(a.cols * a.cellCm);
    expect(rb.value.report.workCut).toBeNull();
    expect(rb.value.water.bodies.map((w) => [w.id, w.kind])).toEqual(ra.value.water.bodies.map((w) => [w.id, w.kind]));
    expect(rb.value.water.bodies[0].course?.[0]).toEqual(ra.value.water.bodies[0].course?.[0]);
    expectBars(before, a, ra.value.report, 'TOWN');
    expectBars(before, b, rb.value.report, 'TOWN');
  }, HEAVY);
});
