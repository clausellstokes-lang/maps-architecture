// M0-e-02: rivers by descent (§4.2 S1 (3); §5.2 F-RIVER) on the small CITY fixtures — the bed descends monotonically
// to the outfall and no cell is carved past carveMaxCm, a course that would need more is re-routed and never trenched,
// knot offsets stay within half the control spacing, a self-touching course is re-traced with the offsets halved, the
// width law, F-RIVER's three M0 rungs each reached by a fixture and reported, tributaries, the basic estuary.
import { CONCERNS, dmath, streamFromKey } from '@plat/kernel';
import type { HydroGrid, Terrain, WaterBody } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { hydroGridOver, TOWN_ROOT } from '../../src/terrain/index.js';
import {
  accumulate,
  carveCourse,
  cellAt,
  d8,
  fieldOf,
  firstSelfTouch,
  inletMasks,
  inletOf,
  knotVertices,
  KNOT_DEVIATION_CELLS,
  MeanderDraws,
  MEANDER_MIN_SHARE,
  MEANDER_SAME_SIDE,
  planCarve,
  pointSegDist2,
  priorityFlood,
  rasterGeom,
  rasterise,
  resolveFlats,
  riverSurface,
  runRivers,
  segSegDist2,
  surfaceCapCm,
  traceRiver,
  widthCm,
  type RiverReport,
  type RiverRequest,
  type XY,
} from '../../src/hydro/index.js';
import { bowl, eastward, RIDGE_Y_CM, SMALL, valley, valleyFallingEast, valleyWithCrater, valleyWithRidge, valleyWithSide, valleyWithSink } from './fixtures.js';
import { bedAlong, carveBars, CITY, cityHydrology, courseOf, drainPath, frameOf, heightsOf, nonIncreasing, northInlet, reachOf, riverBp, siteContext, terrainFrom, traceOpts } from './support.js';

interface Run {
  terrain: Terrain;
  before: Int32Array;
  bodies: WaterBody[];
  report: RiverReport;
}

function run(h: (x: number, y: number) => number, river: RiverRequest | null, seed = 1, opts: Parameters<typeof runRivers>[4] = {}): Run {
  const terrain = terrainFrom(SMALL, h);
  const before = heightsOf(terrain);
  const r = runRivers(riverBp(SMALL, river), terrain, { bodies: [], bridges: [] }, siteContext(seed), opts);
  if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
  return { terrain, before, bodies: r.value.water.bodies, report: r.value.report };
}

/** The carve bars on a run: the bed under every course never rises; no cell lowered past the cap; no cell raised. */
function expectCarveBars(r: Run, carveMaxCm = CITY.carveMaxCm): void {
  carveBars(r.before, r.terrain, r.bodies, carveMaxCm);
}

describe('rivers by descent: the bed and the carve (§4.2 S1 (3); the exit bar)', () => {
  it('a river from the north edge runs down the valley through the core to the south edge: bed monotone, carve ≤ carveMaxCm', () => {
    const r = run(valley, { inflowBearingCdeg: 0 });
    expect(r.bodies).toHaveLength(1);
    const b = r.bodies[0];
    expect(b.kind).toBe('river');
    expect(r.report.rivers[0]).toMatchObject({ fits: true, reachesCore: true, outfall: 'frame', corridor: true, attempt: 0 });
    expect(r.report.requested).toEqual([{ feature: 'river', delivered: 'full', tier: 0, entity: b.id }]);
    const reach = reachOf(frameOf(SMALL));
    const c = courseOf(b);
    expect(c[0]).toEqual({ x: 0, y: reach.y });
    expect(c[c.length - 1].y).toBe(-reach.y);
    expectCarveBars(r);
    expect(r.report.hydrology.d8Undefined).toBe(0);
  });

  it('the corridor drains along the course and off the frame; D8 stays defined and acyclic everywhere (accumulation once)', () => {
    const r = run(valley, { inflowBearingCdeg: 0 });
    const t = r.terrain;
    const field = { grid: t.hydro, flowDir: t.flowDir };
    const n = t.hydro.cols * t.hydro.rows;
    for (let c = 0; c < n; c += 1) expect(drainPath(field, c)).not.toBeNull();
    // The cells under the course, in order, each drain into the next; the last leaves the grid.
    const cells = rasterise(t.hydro, courseOf(r.bodies[0]), true).cells;
    const path = drainPath(field, cells[0]);
    expect(path).not.toBeNull();
    expect(path?.slice(0, cells.length - 1)).toEqual(cells.slice(0, cells.length - 1));
    // Accumulation along the course grows: every corridor cell takes the one before it.
    for (let k = 1; k < cells.length - 1; k += 1) expect(t.flowAccum[cells[k]]).toBeGreaterThan(t.flowAccum[cells[k - 1]]);
  });

  it('a sink in the course: F-RIVER carves it deeper (rung 1, reported with its depth), within carveMaxCm', () => {
    const r = run(valleyWithSink, { inflowBearingCdeg: 0 });
    const carves = r.report.ladderUses.filter((u) => u.cause === 'F-RIVER' && u.name === 'carve');
    expect(carves.length).toBeGreaterThan(0);
    expect(carves.every((u) => u.rung === 1 && u.tier === 2 && u.entity === 'water:river:0' && u.key === 'S1/water.river@town')).toBe(true);
    expect(Math.max(...carves.map((u) => u.value))).toBeGreaterThan(0);
    expect(r.report.rivers[0]).toMatchObject({ fits: true, reachesCore: true, outfall: 'frame', attempt: 0 });
    expect(r.report.rivers[0].maxCarveCm).toBeGreaterThan(0);
    // C-0173 (6)'s rule: delivered full at tier 2 after a carve or re-trace (tier 0 only with no rung used).
    expect(r.report.requested[0]).toEqual({ feature: 'river', delivered: 'full', tier: 2, entity: 'water:river:0' });
    expectCarveBars(r);
    // The sink is crossed, not filled: the bed through it lies below the sink's rim.
    expect(r.report.hydrology.depressions.length).toBeGreaterThan(0);
  });

  it('a course that would need more than carveMaxCm is re-routed, never trenched: the river goes round the crater', () => {
    // The hydrology's own D8 line from the north inlet runs into the 12 m crater: a bed along it would cut far past the cap.
    const terrain = terrainFrom(SMALL, valleyWithCrater);
    const hyd = cityHydrology(terrain);
    const g = hyd.field.grid;
    const reach = reachOf(frameOf(SMALL));
    const inlet = northInlet(g, reach);
    const inletCell = inlet.cell;
    const d8Line = drainPath(hyd.field, inletCell - g.cols) ?? [];
    const centres = d8Line.map((c) => ({ x: g.originX + ((c % g.cols) + 0.5) * g.cellCm, y: g.originY + (Math.floor(c / g.cols) + 0.5) * g.cellCm }));
    expect(planCarve(terrain, centres, CITY.carveMaxCm).maxCarveCm).toBeGreaterThan(2 * CITY.carveMaxCm);
    // The river's surface leaves the crater's floor out (a bed through it would trench): its lowest cell is not admitted.
    const m = inletMasks(g, inletCell, undefined);
    const surface = riverSurface(hyd.field, m.outlet, m.edge, surfaceCapCm(CITY.carveMaxCm));
    const floor = cellAt(g, 0, 40_000);
    expect(surface.admitted[floor.j * g.cols + floor.i]).toBe(0);
    // The trace goes round it and fits; nothing it delivers is trenched.
    const tr = traceRiver(hyd.field, inlet, streamFromKey([9, 9, 9, 9]), traceOpts(terrain, CITY.riverBandCm[0]));
    expect([tr.ok, tr.end.kind]).toEqual([true, 'frame']);
    expect(tr.plan.maxCarveCm).toBeLessThanOrEqual(CITY.carveMaxCm);
    const r = run(valleyWithCrater, { inflowBearingCdeg: 0 });
    expect(r.report.rivers[0]).toMatchObject({ fits: true, outfall: 'frame', corridor: true });
    expectCarveBars(r);
    expect(r.report.rivers[0].maxCarveCm).toBeLessThanOrEqual(CITY.carveMaxCm);
  });

  it('carveCourse refuses a course needing more than the cap and writes nothing; within the cap it writes the bed', () => {
    // Ground falling 1 % southward with a 6 m ridge 40 m wide across the line: the monotone bed must cut ≈ 6 m.
    const terrain = terrainFrom(SMALL, (_x, y) => 50 + (Math.abs(y) < 2000 ? 6 : 0) + 0.01 * (y / 100));
    const before = heightsOf(terrain);
    const line: XY[] = [
      { x: 0, y: 50_000 },
      { x: 0, y: -50_000 },
    ];
    const refused = carveCourse(terrain, line, 400);
    expect(refused.ok).toBe(false);
    expect([...terrain.heightCm]).toEqual([...before]);
    const fits = carveCourse(terrain, line, 800);
    expect(fits.ok).toBe(true);
    expect(nonIncreasing(bedAlong(terrain, line))).toBe(true);
    expect(planCarve(terrain, line, 800).maxCarveCm).toBe(0);
  });
});

describe('the control knots (GEO-36)', () => {
  it('knot offsets stay within half the control spacing; the knots are recorded with ordinals in course order', () => {
    for (let seed = 1; seed <= 12; seed += 1) {
      const r = run(valley, { inflowBearingCdeg: 0 }, seed);
      const b = r.bodies[0];
      const controls = b.controls ?? [];
      expect(controls.map((k) => k.ordinal)).toEqual(controls.map((_, o) => o));
      expect(b.nextControl).toBe(controls.length);
      expect(controls.length).toBeGreaterThan(3);
      const c = courseOf(b);
      expect(controls[0].at).toEqual(c[0]);
      expect(controls[controls.length - 1].at).toEqual(c[c.length - 1]);
    }
    // The offsets themselves, on traces.
    const terrain = terrainFrom(SMALL, valley);
    const hyd = cityHydrology(terrain);
    const inlet = northInlet(hyd.field.grid, reachOf(frameOf(SMALL)));
    let offsets = 0;
    for (let seed = 1; seed <= 40; seed += 1) {
      const tr = traceRiver(hyd.field, inlet, streamFromKey([seed, 7, 7, 7]), traceOpts(terrain, CITY.riverBandCm[1]));
      for (const k of tr.knots) {
        expect(k.offsetCm).toBeLessThanOrEqual(CITY.controlSpacingCm / 2);
        const dx = k.at.x - k.base.x;
        const dy = k.at.y - k.base.y;
        expect(Math.hypot(dx, dy)).toBeCloseTo(k.offsetCm, 6);
        if (k.offsetCm > 0) offsets += 1;
      }
    }
    expect(offsets).toBeGreaterThan(40);
  });

  it('knots sit mostly on alternating sides: a knot keeps the previous side with chance MEANDER_SAME_SIDE (C-0173 (4))', () => {
    // The rule on the draws, replayed on a twin stream: knot 1's side by u1 < ½; every later knot the previous knot's
    // side when u1 < MEANDER_SAME_SIDE, the other side otherwise; its share MEANDER_MIN_SHARE + (1 − MEANDER_MIN_SHARE) u2.
    const draws = new MeanderDraws(streamFromKey([5, 6, 7, 8]));
    const twin = streamFromKey([5, 6, 7, 8]);
    const K = 4000;
    let prev = 0;
    let changes = 0;
    for (let k = 1; k <= K; k += 1) {
      const u1 = twin.float01();
      const u2 = twin.float01();
      const side = prev === 0 ? (u1 < 0.5 ? 1 : -1) : u1 < MEANDER_SAME_SIDE ? prev : -prev;
      expect(draws.get(k)).toEqual({ side, share: MEANDER_MIN_SHARE + (1 - MEANDER_MIN_SHARE) * u2 });
      if (prev !== 0 && side !== prev) changes += 1;
      prev = side;
    }
    // "Mostly on alternating sides": the side changes at 1 − MEANDER_SAME_SIDE of the knots (± 3 %, ≈ 4.7 σ at K = 4 000).
    expect(Math.abs(changes / (K - 1) - (1 - MEANDER_SAME_SIDE))).toBeLessThan(0.03);
    // And on traced rivers: the recorded knots' offsets fall on alternating sides of their chords at that rate. The
    // streams are the stage's own (water.river on the town root, hashed keys): a raw xoshiro state of small words
    // (streamFromKey([seed, 3, 3, 3])) gives near-zero first draws, which would keep every trace's first knots on one side.
    const terrain = terrainFrom(SMALL, valley);
    const hyd = cityHydrology(terrain);
    const inlet = northInlet(hyd.field.grid, reachOf(frameOf(SMALL)));
    const concern = CONCERNS['water.river'];
    let pairs = 0;
    let flips = 0;
    for (let seed = 1; seed <= 60; seed += 1) {
      const ctx = siteContext(seed);
      const tr = traceRiver(hyd.field, inlet, ctx.stream(concern, TOWN_ROOT, ctx.streamOpts(concern, TOWN_ROOT, 0)), traceOpts(terrain, CITY.riverBandCm[0]));
      let last = 0;
      for (let k = 1; k + 1 < tr.knots.length; k += 1) {
        const a = tr.knots[k - 1].base;
        const b = tr.knots[k].base;
        const o = tr.knots[k].at;
        const cross = (b.x - a.x) * (o.y - b.y) - (b.y - a.y) * (o.x - b.x);
        const side = cross > 0 ? 1 : cross < 0 ? -1 : 0;
        if (side !== 0 && last !== 0) {
          pairs += 1;
          if (side !== last) flips += 1;
        }
        if (side !== 0) last = side;
      }
    }
    expect(pairs).toBeGreaterThan(300);
    expect(flips / pairs).toBeGreaterThan(0.7);
  });

  it('knots follow the descent line’s bends: no line cell between two knots lies more than one cell off their chord (C-0175 (4))', () => {
    // An L-shaped trough on the hydrology grid: south from the north edge for 29 cells (not a multiple of the spacing's
    // cells), then east to the east edge. The chord rule alone would cut the corner by ≈ 3 cells.
    const terrain = terrainFrom(SMALL, () => 50);
    const grid = hydroGridOver(rasterGeom(terrain), CITY.hydroCellCm);
    const cols = grid.cols;
    const col = 20;
    const turnRow = grid.rows - 1 - 29;
    const path: number[] = [];
    for (let j = grid.rows - 1; j >= turnRow; j -= 1) path.push(j * cols + col);
    for (let i = col + 1; i < cols; i += 1) path.push(turnRow * cols + i);
    const heights = new Array<number>(cols * grid.rows).fill(20_000);
    path.forEach((c, k) => (heights[c] = 10_000 - 10 * k));
    const field = fieldOf(grid, heights);
    const reach = reachOf(frameOf(SMALL));
    const inlet = { cell: path[0], at: { x: Math.round(grid.originX + (col + 0.5) * grid.cellCm), y: reach.y } };
    const tr = traceRiver(field, inlet, streamFromKey([2, 2, 2, 2]), traceOpts(terrain, CITY.riverBandCm[0]));
    expect([tr.ok, tr.end.kind]).toEqual([true, 'frame']);
    const index = (p: XY): number => {
      const { i, j } = cellAt(grid, p.x, p.y);
      return path.indexOf(j * cols + i);
    };
    const centre = (c: number): XY => ({ x: grid.originX + ((c % cols) + 0.5) * grid.cellCm, y: grid.originY + (Math.floor(c / cols) + 0.5) * grid.cellCm });
    let spans = 0;
    for (let k = 1; k + 1 < tr.knots.length; k += 1) {
      const a = index(tr.knots[k - 1].base);
      const b = index(tr.knots[k].base);
      expect(a).toBeGreaterThanOrEqual(0);
      expect(b).toBeGreaterThan(a);
      for (let q = a + 1; q < b; q += 1) {
        expect(Math.sqrt(pointSegDist2(centre(path[q]), tr.knots[k - 1].base, tr.knots[k].base))).toBeLessThanOrEqual(KNOT_DEVIATION_CELLS * grid.cellCm + 1);
        spans += 1;
      }
    }
    expect(spans).toBeGreaterThan(40);
    // A knot's base sits at the corner itself or the cell before it.
    const corner = path.indexOf(turnRow * cols + col);
    expect(tr.knots.some((kn) => Math.abs(index(kn.base) - corner) <= 1)).toBe(true);
  });

  it('firstSelfTouch (bucketed) returns what the definition’s scan returns: the least j, then the least i', () => {
    const brute = (pts: readonly XY[], c: number): { i: number; j: number } | null => {
      const arcs = [0];
      for (let v = 1; v < pts.length; v += 1) arcs.push(arcs[v - 1] + Math.hypot(pts[v].x - pts[v - 1].x, pts[v].y - pts[v - 1].y));
      for (let j = 1; j + 1 < pts.length; j += 1) {
        for (let i = 0; i + 1 < j; i += 1) {
          if (arcs[j] - arcs[i + 1] <= 2 * c) break;
          const d = segSegDist2(pts[i], pts[i + 1], pts[j], pts[j + 1]);
          if (d < c * c) return { i, j };
        }
      }
      return null;
    };
    const s = streamFromKey([11, 12, 13, 14]);
    let touches = 0;
    for (let trial = 0; trial < 300; trial += 1) {
      // A random walk with turning steps of 5 – 60 m: it often folds back on itself.
      const pts: XY[] = [{ x: 0, y: 0 }];
      let th = s.float01() * 6.283;
      const n = 3 + Math.floor(s.float01() * 120);
      for (let v = 0; v < n; v += 1) {
        th += (s.float01() - 0.5) * 2.4;
        const len = 500 + s.float01() * 5500;
        const p = pts[pts.length - 1];
        pts.push({ x: Math.round(p.x + len * Math.cos(th)), y: Math.round(p.y + len * Math.sin(th)) });
      }
      const want = brute(pts, 1000);
      expect(firstSelfTouch(pts, 1000)).toEqual(want);
      if (want !== null) touches += 1;
    }
    expect(touches).toBeGreaterThan(50);
  });

  it('a self-touching course is re-traced with the offsets halved (F-RIVER rung 2), until it no longer touches', () => {
    // A hairpin trough on the hydrology grid — east along one row, six cells north, back west, then north to the north
    // edge (a river never leaves by its own edge) — its legs 150 m apart;
    // every knot pushed the full half spacing to the left of its chord, so the legs' knots close on each other and the
    // course crosses itself. The raster is level, so only the touch can fail; the clearance is the river band's
    // narrowest channel (the stage's, C-0173 (5)).
    const terrain = terrainFrom(SMALL, () => 50);
    const grid = hydroGridOver(rasterGeom(terrain), CITY.hydroCellCm);
    const cols = grid.cols;
    const r0 = 20;
    const turn = 44;
    const path: number[] = [];
    for (let i = 0; i <= turn; i += 1) path.push(r0 * cols + i);
    for (let j = r0 + 1; j <= r0 + 6; j += 1) path.push(j * cols + turn);
    for (let i = turn - 1; i >= 8; i -= 1) path.push((r0 + 6) * cols + i);
    for (let j = r0 + 7; j < grid.rows; j += 1) path.push(j * cols + 8);
    const heights = new Array<number>(cols * grid.rows).fill(20_000);
    path.forEach((c, k) => (heights[c] = 10_000 - 10 * k));
    const field = fieldOf(grid, heights);
    // The flood, flats, D8 and accumulation on the hand-built field (the descent follows its D8).
    priorityFlood(field);
    resolveFlats(field);
    d8(field);
    accumulate(field);
    class Left extends MeanderDraws {
      override get(): { side: number; share: number } {
        return { side: 1, share: 1 };
      }
    }
    const reach = reachOf(frameOf(SMALL));
    const startY = grid.originY + (r0 + 0.5) * grid.cellCm;
    const clearance = CITY.riverBandCm[0];
    const opts = traceOpts(terrain, clearance);
    const tr = traceRiver(field, { cell: path[0], at: { x: -reach.x, y: startY } }, new Left(streamFromKey([1, 1, 1, 1])), opts);
    const retraces = tr.events.filter((e) => e.rung === 'retrace');
    expect(retraces.length).toBeGreaterThan(0);
    expect(retraces.every((e) => e.cause === 'touch' && e.value === 0)).toBe(true);
    expect(tr.ok).toBe(true);
    expect(tr.scale).toBe(0.5 ** retraces.length);
    expect(firstSelfTouch(tr.course, clearance)).toBeNull();
    for (const k of tr.knots) expect(k.offsetCm).toBeLessThanOrEqual((CITY.controlSpacingCm / 2) * tr.scale + 1);
    // The control spacing halves with the offsets (C-0175 (4)): the re-traced knots stand at most the scaled spacing
    // plus a cell's diagonal apart along their chords (the next knot is the first line cell that far on).
    for (let k = 1; k + 1 < tr.knots.length; k += 1) {
      const a = tr.knots[k - 1].base;
      const b = tr.knots[k].base;
      expect(Math.hypot(b.x - a.x, b.y - a.y)).toBeLessThanOrEqual(CITY.controlSpacingCm * tr.scale + 1.5 * grid.cellCm);
    }
    // The descent line is the trough itself: the course ends on the north edge.
    expect(tr.end).toEqual({ kind: 'frame', cell: path[path.length - 1] });
    expect(tr.course[tr.course.length - 1].y).toBe(reach.y);
  });
});

describe('F-RIVER and F-WORK: each M0 rung reached by a fixture and reported (§5.2; C-0085)', () => {
  it('the inlet rung (rung 3, an attempt): a course leaving the frame before the core moves the inlet along its edge', () => {
    const r = run(eastward, { inflowBearingCdeg: 0 });
    const inlets = r.report.ladderUses.filter((u) => u.name === 'inlet');
    expect(inlets.map((u) => [u.rung, u.tier, u.value, u.key])).toEqual([
      [3, 3, 1, 'S1/water.river@town/a=1'],
      [3, 3, 2, 'S1/water.river@town/a=2'],
    ]);
    expect(r.report.rivers[0].reachesCore).toBe(false);
    expect(r.report.requested[0]).toMatchObject({ feature: 'river', delivered: 'degraded', tier: 4, cause: 'F-RIVER' });
    // The attempts drew their own streams: attempt 1 and 2 on water.river.
    expectCarveBars(r);
  });

  it('the inlet rung moves the inlet: attempt a ≥ 1 is shifted along its edge by (u − ½) × the frame’s half side, clamped (C-0173 (2))', () => {
    // A plane rising northward on a grid about the frame's centre: the river descends from every cell of the north edge,
    // so the inlet stays where the bearing and the shift put it.
    const g = { cellCm: 2500, cols: 32, rows: 32, originX: -40_000, originY: -40_000 } as HydroGrid;
    const field = fieldOf(g, Array.from({ length: 32 * 32 }, (_, c) => 100_000 + 50 * Math.floor(c / 32)));
    const reach = { x: 40_000, y: 40_000 };
    const half = { x: 25_000, y: 25_000 };
    const at = (bearing: number, u: number | null, fh = half): XY => inletOf(field, reach, fh, bearing, u, -1, CITY.carveMaxCm).inlet.at;
    expect(at(0, null)).toEqual({ x: 0, y: 40_000 });
    for (const u of [0, 0.25, 0.5, 0.9, 1]) expect(at(0, u)).toEqual({ x: Math.round((u - 0.5) * half.x), y: 40_000 });
    // At 40° the ray meets the north edge 335 m east (read where no clamp applies: a frame as wide as the arena); the
    // point is kept beside the frame — clamped to its half side — before and after the shift.
    const px = at(4000, null, { x: 40_000, y: 40_000 }).x;
    expect(px).toBeGreaterThan(33_000);
    expect(at(4000, null)).toEqual({ x: 25_000, y: 40_000 });
    expect(at(4000, 0)).toEqual({ x: Math.round(px - 12_500), y: 40_000 });
    expect(at(4000, 1)).toEqual({ x: 25_000, y: 40_000 });
    // The inlet's cell is the north edge's cell under that point.
    const { inlet, edge } = inletOf(field, reach, half, 0, 0.9, -1, CITY.carveMaxCm);
    expect(edge).toBe(1);
    expect(inlet.cell).toBe(31 * 32 + cellAt(g, inlet.at.x, 0).i);
  });

  it('the inlet rung delivers: attempt 1 shifted west of the divide runs through the core — full at tier 3 (C-0173 (6))', () => {
    // Seed 3's attempt 1 draws u = 0.18…: its inlet moves 160 m west of attempt 0's, off the east-falling side.
    const ctx = siteContext(3);
    const u1 = ctx.stream(CONCERNS['water.river'], TOWN_ROOT, ctx.streamOpts(CONCERNS['water.river'], TOWN_ROOT, 1)).float01();
    expect(u1).toBeLessThan(0.2);
    const r = run(valleyFallingEast, { inflowBearingCdeg: 2363 }, 3);
    expect(r.report.rivers[0]).toMatchObject({ attempt: 1, fits: true, reachesCore: true, outfall: 'frame', corridor: true });
    expect(r.report.requested[0]).toEqual({ feature: 'river', delivered: 'full', tier: 3, entity: 'water:river:0' });
    expect(r.report.ladderUses.filter((u) => u.name === 'inlet').map((u) => u.value)).toEqual([1]);
    // The delivered river arrives at attempt 0's inlet shifted along the north edge by (u − ½) × 500 m.
    const reach = reachOf(frameOf(SMALL));
    const f = frameOf(SMALL);
    const plain = terrainFrom(SMALL, valleyFallingEast);
    const hyd = cityHydrology(plain);
    const x0 = inletOf(hyd.field, reach, { x: f.widthCm / 2, y: f.heightCm / 2 }, 2363, null, -1, CITY.carveMaxCm).inlet.at.x;
    expect(x0).toBeGreaterThan(30_000);
    const first = courseOf(r.bodies[0])[0];
    expect(first).toEqual({ x: Math.round(x0 + (u1 - 0.5) * 50_000), y: reach.y });
    expectCarveBars(r);
  });

  it('re-trace from the last good knot (rung 2): a carve failure past the second knot re-roots at the knot before the last knot ahead of it', () => {
    // The one-row ridge is invisible to the hydrology grid, so the first try is the plain valley's trace; the carve plan
    // on the ridged raster fails where that course crosses the ridge.
    const plain = terrainFrom(SMALL, valley);
    const ridged = terrainFrom(SMALL, valleyWithRidge);
    const grid = hydroGridOver(rasterGeom(plain), CITY.hydroCellCm);
    const h0 = cityHydrology(plain, grid);
    const h1 = cityHydrology(ridged, grid);
    expect(Buffer.from(h1.field.heightCm.buffer).equals(Buffer.from(h0.field.heightCm.buffer))).toBe(true);
    const inlet = northInlet(grid, reachOf(frameOf(SMALL)));
    const opts = (terrain: Terrain): Parameters<typeof traceRiver>[3] => traceOpts(terrain, CITY.riverBandCm[0]);
    const tr0 = traceRiver(h0.field, inlet, streamFromKey([4, 4, 4, 4]), opts(plain));
    expect(tr0.ok).toBe(true);
    const failAt = planCarve(ridged, tr0.course, CITY.carveMaxCm).firstExceed;
    expect(failAt).toBeGreaterThan(0);
    const near = knotVertices(tr0.course, tr0.knots);
    let lastBefore = 0;
    for (let k = 0; k < tr0.knots.length; k += 1) if (near[k] < failAt) lastBefore = k;
    const root = lastBefore - 1;
    expect(root).toBeGreaterThanOrEqual(2);
    const tr1 = traceRiver(h1.field, inlet, streamFromKey([4, 4, 4, 4]), opts(ridged));
    const retraces = tr1.events.filter((e) => e.rung === 'retrace');
    expect(retraces[0]).toMatchObject({ rung: 'retrace', cause: 'carve', value: root });
    // The line itself crosses the ridge (halving cannot cure it): the re-trace closes the failing cell.
    expect(retraces[0].closed?.length).toBe(1);
    // The knots kept before the root are the first try's, unchanged.
    expect(tr1.knots.slice(0, root + 1)).toEqual(tr0.knots.slice(0, root + 1));
    // The ridge spans the arena: no re-route avoids it — the trace fails on the carve and is never trenched.
    expect([tr1.ok, tr1.failure]).toEqual([false, 'carve']);
  });

  it('a degraded river reports reachesCore on the course it delivers, cut before its failure (C-0173 (6))', () => {
    const r = run(valleyWithRidge, { inflowBearingCdeg: 0 });
    const out = r.report.rivers[0];
    expect(out).toMatchObject({ fits: false, outfall: 'sink', corridor: false, reachesCore: false });
    expect(r.report.requested[0]).toMatchObject({ delivered: 'degraded', tier: 4, cause: 'F-RIVER' });
    // The delivered stub stops north of the ridge, outside the 250 m core; the whole trace ran on through the centre.
    const core = 0.25 * Math.min(frameOf(SMALL).widthCm, frameOf(SMALL).heightCm);
    const c = courseOf(r.bodies[0]);
    const nearest = Math.min(...c.map((p) => Math.hypot(p.x, p.y)));
    expect(nearest).toBeGreaterThan(core);
    expect(Math.min(...c.map((p) => p.y))).toBeGreaterThan(RIDGE_Y_CM - 400);
    expectCarveBars(r);
  });

  it('with no bearing the inlet lies on the highest edge by mean height, ties E, N, W, S (§4.2 S1 (3); C-0173 (2))', () => {
    const g = { cellCm: 2500, cols: 32, rows: 32, originX: -40_000, originY: -40_000 } as HydroGrid;
    const edgeOf = (h: (i: number, j: number) => number): number => {
      const field = fieldOf(g, Array.from({ length: 32 * 32 }, (_, c) => h(c % 32, Math.floor(c / 32))));
      const { inlet, edge } = inletOf(field, { x: 40_000, y: 40_000 }, { x: 25_000, y: 25_000 }, undefined, null, -1, CITY.carveMaxCm);
      const i = inlet.cell % 32;
      const j = Math.floor(inlet.cell / 32);
      // The inlet's cell lies on that edge, and its point on the arena's edge there.
      expect([edge === 0 && i === 31, edge === 1 && j === 31, edge === 2 && i === 0, edge === 3 && j === 0].some(Boolean)).toBe(true);
      return edge;
    };
    expect(edgeOf((_i, j) => 100_000 + 40 * j)).toBe(1); // north highest
    expect(edgeOf((_i, j) => 100_000 - 40 * j)).toBe(3); // south highest
    expect(edgeOf((i) => 100_000 - 40 * i)).toBe(2); // west highest
    expect(edgeOf((i) => 100_000 + 40 * i)).toBe(0); // east highest
    expect(edgeOf(() => 100_000)).toBe(0); // all four tie: E
    expect(edgeOf((i, j) => 100_000 + 40 * Math.max(j, 31 - i))).toBe(1); // N and W tie: N
    expect(edgeOf((i, j) => 100_000 + 40 * Math.max(31 - i, 31 - j))).toBe(2); // W and S tie: W
    expect(edgeOf((i, j) => 100_000 + 40 * Math.max(i, 31 - j))).toBe(0); // E and S tie: E
    // On the edge, the cell of its middle half whose descent passes nearest the frame's centre (C-0175 (6)): on a plane
    // rising northward every descent runs straight south and equally long, so the two middle columns tie on the distance
    // and the length, and the first (column 15, centred 12.5 m west of the centre) is taken — not the middle half's first.
    const plane = fieldOf(g, Array.from({ length: 32 * 32 }, (_, c) => 100_000 + 40 * Math.floor(c / 32)));
    const north = inletOf(plane, { x: 40_000, y: 40_000 }, { x: 25_000, y: 25_000 }, undefined, null, -1, CITY.carveMaxCm);
    expect(north).toEqual({ inlet: { cell: 31 * 32 + 15, at: { x: -1250, y: 40_000 } }, edge: 1 });
    // `exclude` (a tributary's) skips the river's edge: the next highest.
    const field = fieldOf(g, Array.from({ length: 32 * 32 }, (_, c) => 100_000 + 40 * Math.floor(c / 32) + 10 * (c % 32)));
    expect(inletOf(field, { x: 40_000, y: 40_000 }, { x: 25_000, y: 25_000 }, undefined, null, -1, CITY.carveMaxCm).edge).toBe(1);
    expect(inletOf(field, { x: 40_000, y: 40_000 }, { x: 25_000, y: 25_000 }, undefined, null, 1, CITY.carveMaxCm).edge).toBe(0);
  });

  it('F-WORK: a low hydro.cells limit coarsens the grid one step and reports work_cut with the count; D8 still 100 %', () => {
    const r = run(valley, { inflowBearingCdeg: 0 }, 1, { hydroCellsLimit: 100 });
    expect(r.report.workCut).toEqual({ counter: 'hydro.cells', count: 64 * 64, limit: 100, coarsened: true, fromCellCm: 2500, toCellCm: 3200 });
    expect(r.report.ladderUses.filter((u) => u.cause === 'F-WORK')).toEqual([
      { cause: 'F-WORK', code: 'work_cut', rung: 1, name: 'coarsen', tier: 4, entity: 'terrain:test', key: 'S1/water.river@town', value: 4096 },
    ]);
    expect(r.report.hydrology.cellCm).toBe(3200);
    expect(r.terrain.hydro.cellCm).toBe(3200);
    expect(r.report.hydrology.d8Undefined).toBe(0);
    expect(r.terrain.flowDir.length).toBe(r.terrain.hydro.cols * r.terrain.hydro.rows);
    expect(r.report.work['hydro.cells']).toBe(r.terrain.hydro.cols * r.terrain.hydro.rows);
    expectCarveBars(r);
    // Under the limit nothing is cut.
    const free = run(valley, { inflowBearingCdeg: 0 }, 1, { hydroCellsLimit: 4096 });
    expect(free.report.workCut).toBeNull();
    expect(free.report.hydrology.cellCm).toBe(2500);
  });
});

describe('the width law (§4.2 S1 (3))', () => {
  it('w = w0 · acc^0.4 through dmath.pow, clamped to the class band', () => {
    const band = CITY.riverBandCm;
    for (const acc of [1, 2, 10, 100, 1000, 4567, 10_000, 31_623, 100_000, 1_000_000]) {
      const raw = CITY.w0Cm * dmath.pow(acc, 0.4);
      const want = Math.round(Math.min(band[1], Math.max(band[0], raw)));
      expect(widthCm(CITY, acc, CITY.hydroCellCm, band)).toBe(want);
    }
    expect(widthCm(CITY, 1, CITY.hydroCellCm, band)).toBe(band[0]);
    expect(widthCm(CITY, 1e7, CITY.hydroCellCm, band)).toBe(band[1]);
    // At the coarser cell, the accumulation is counted in the rung's cells: (32 / 25)² of them per coarse cell.
    expect(widthCm(CITY, 1000, 3200, band)).toBe(Math.round(Math.min(band[1], Math.max(band[0], CITY.w0Cm * dmath.pow(1000 * 1.6384, 0.4)))));
  });

  it("a river's width profile follows its corridor's accumulation, never narrows downstream, inside the band", () => {
    const r = run(valley, { inflowBearingCdeg: 0 });
    const b = r.bodies[0];
    const w = [...(b.widthProfile ?? [])];
    expect(w).toHaveLength((b.course ?? []).length);
    for (let k = 1; k < w.length; k += 1) expect(w[k]).toBeGreaterThanOrEqual(w[k - 1]);
    for (const v of w) {
      expect(v).toBeGreaterThanOrEqual(CITY.riverBandCm[0]);
      expect(v).toBeLessThanOrEqual(CITY.riverBandCm[1]);
    }
    // The outlet's width is the law at the last corridor cell's accumulation.
    const t = r.terrain;
    const cells = rasterise(t.hydro, courseOf(b), true).cells;
    const last = cells[cells.length - 1];
    expect(w[w.length - 1]).toBe(widthCm(CITY, t.flowAccum[last], CITY.hydroCellCm, CITY.riverBandCm));
  });

  it('the basic estuary widens the last 400 m of the course to 2.5 times its width (§4.2 S1 (3) Mouths)', () => {
    const plain = run(valley, { inflowBearingCdeg: 0 }).bodies[0];
    const mouth = run(valley, { inflowBearingCdeg: 0, mouth: 'estuary' }).bodies[0];
    expect(mouth.course).toEqual(plain.course);
    const a = [...(plain.widthProfile ?? [])];
    const b = [...(mouth.widthProfile ?? [])];
    expect(b[b.length - 1]).toBe(Math.round(a[a.length - 1] * 2.5));
    expect(b[0]).toBe(a[0]);
    let widened = 0;
    for (let k = 0; k < a.length; k += 1) {
      expect(b[k]).toBeGreaterThanOrEqual(a[k]);
      if (b[k] > a[k]) widened += 1;
    }
    expect(widened).toBeGreaterThan(0);
    expect(widened).toBeLessThan(a.length / 2);
  });
});

describe('tributaries, by the same rule from secondary inlets', () => {
  it('a tributary from the east edge joins the river: flowTo, the tributary band, its corridor draining into the river', () => {
    const r = run(valleyWithSide, { inflowBearingCdeg: 0, tributaries: [{ inflowBearingCdeg: 9000 }] });
    expect(r.bodies.map((b) => [b.id, b.kind])).toEqual([
      ['water:river:0', 'river'],
      ['water:tributary:0', 'tributary'],
    ]);
    const trib = r.bodies[1];
    expect(trib.flowTo).toBe('water:river:0');
    expect(r.report.rivers[1]).toMatchObject({ kind: 'tributary', fits: true, outfall: 'join', corridor: true });
    for (const v of trib.widthProfile ?? []) {
      expect(v).toBeGreaterThanOrEqual(CITY.tributaryBandCm[0]);
      expect(v).toBeLessThanOrEqual(CITY.tributaryBandCm[1]);
    }
    expectCarveBars(r);
    // The tributary's corridor drains into the river's, which carries its flow to the frame.
    const t = r.terrain;
    const field = { grid: t.hydro, flowDir: t.flowDir };
    const tc = rasterise(t.hydro, courseOf(trib), true).cells;
    const mainCells = new Set(rasterise(t.hydro, courseOf(r.bodies[0]), true).cells);
    const path = drainPath(field, tc[0]);
    expect(path).not.toBeNull();
    expect(path?.some((c) => mainCells.has(c))).toBe(true);
  });

  it('a request for river islands or a delta at M0 is reported, never silent (M1, §4b)', () => {
    const r = run(valley, { inflowBearingCdeg: 0, islands: 2, mouth: 'delta' });
    expect(r.report.requested.slice(1)).toEqual([
      { feature: 'river.mouth.delta', delivered: 'degraded', tier: 4, entity: 'water:river:0', cause: 'M1: distributaries (§4b); the estuary widening built' },
      { feature: 'river.islands', delivered: 'omitted', tier: 6, entity: 'water:river:0', cause: 'M1: river islands (§4b)' },
    ]);
  });
});
