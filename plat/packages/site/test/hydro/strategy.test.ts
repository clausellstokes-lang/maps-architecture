// M0-e-02: the base RiverStrategy — `rivers(bp, terrain, water, ctx, k): KernelResult<WaterSet>` (§4.12) under a
// hand-built StageContext (C-0123's pattern) — its draws (`water.river` on the town root, one stream per attempt), two
// runs byte-identical, the records it writes (the terrain's flow arrays on the `hydro` grid, the WaterBody fields of
// §2.3), the water it passes through, its report sink, its refusals, and §12.4's row record shape.
import { CONCERNS } from '@plat/kernel';
import type { WaterBody } from '@plat/model';
import { rungProfile } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { terrainSampler, TOWN_ROOT } from '../../src/terrain/index.js';
import { baseRivers, HYDROLOGY_ROW, hydroField, riverStrategy, runRivers, type RiverReport } from '../../src/hydro/index.js';
import { centreX, centreY, hydroGridOver } from '../../src/terrain/index.js';
import { SMALL, valley } from './fixtures.js';
import { riverBp, siteContext, terrainFrom } from './support.js';

const WATER = 'water.river';

describe('baseRivers.rivers(bp, terrain, water, ctx, k) (§4.12)', () => {
  it('draws water.river on the town root through the context — attempt 0 first, each later attempt its own stream', () => {
    const ctx = siteContext(3);
    const t = terrainFrom(SMALL, valley);
    const r = baseRivers.rivers(riverBp(SMALL, { inflowBearingCdeg: 0 }), t, { bodies: [], bridges: [] }, ctx, undefined);
    expect(r.ok).toBe(true);
    expect(ctx.requests).toEqual([{ concern: CONCERNS[WATER], entity: TOWN_ROOT, attempt: 0 }]);
    // No river requested: the hydrology runs and nothing is drawn.
    const quiet = siteContext(3);
    const q = baseRivers.rivers(riverBp(SMALL, null), terrainFrom(SMALL, valley), { bodies: [], bridges: [] }, quiet, undefined);
    expect(q.ok && q.value.bodies).toEqual([]);
    expect(quiet.requests).toEqual([]);
  });

  it('two runs of one blueprint and seed are byte-identical; the water and the terrain arrays alike', () => {
    const go = (): { bodies: WaterBody[]; dir: Uint8Array; acc: Uint32Array; rank: Uint32Array; h: Int32Array } => {
      const t = terrainFrom(SMALL, valley);
      const r = baseRivers.rivers(riverBp(SMALL, { inflowBearingCdeg: 0, tributaries: [{}] }), t, { bodies: [], bridges: [] }, siteContext(9), undefined);
      if (!r.ok) throw new Error(r.detail);
      return { bodies: r.value.bodies, dir: t.flowDir, acc: t.flowAccum, rank: t.flatRank, h: t.heightCm };
    };
    const a = go();
    const b = go();
    expect(a.bodies).toEqual(b.bodies);
    expect(Buffer.from(a.dir).equals(Buffer.from(b.dir))).toBe(true);
    expect(Buffer.from(a.acc.buffer).equals(Buffer.from(b.acc.buffer))).toBe(true);
    expect(Buffer.from(a.rank.buffer).equals(Buffer.from(b.rank.buffer))).toBe(true);
    expect(Buffer.from(a.h.buffer).equals(Buffer.from(b.h.buffer))).toBe(true);
  });

  it('writes the terrain record: the hydro grid, flowDir (Uint8), flatRank and flowAccum (Uint32) on it; flowAt reads them', () => {
    const t = terrainFrom(SMALL, valley);
    expect(() => terrainSampler(t, 250).flowAt({ x: 0, y: 0 } as never)).toThrow(/S1 \(3\)/);
    const r = baseRivers.rivers(riverBp(SMALL, null), t, { bodies: [], bridges: [] }, siteContext(1), undefined);
    expect(r.ok).toBe(true);
    const n = t.hydro.cols * t.hydro.rows;
    expect([t.hydro.cellCm, t.hydro.cols, t.hydro.rows]).toEqual([2500, 64, 64]);
    expect(t.flowDir).toBeInstanceOf(Uint8Array);
    expect(t.flatRank).toBeInstanceOf(Uint32Array);
    expect(t.flowAccum).toBeInstanceOf(Uint32Array);
    expect([t.flowDir.length, t.flatRank.length, t.flowAccum.length]).toEqual([n, n, n]);
    const at = terrainSampler(t, 250).flowAt({ x: 0, y: 0 } as never);
    expect(at.dir).toBeLessThanOrEqual(7);
    expect(at.accum).toBeGreaterThanOrEqual(1);
    // No river: the raster is not carved.
    const fresh = terrainFrom(SMALL, valley);
    expect(Buffer.from(t.heightCm.buffer).equals(Buffer.from(fresh.heightCm.buffer))).toBe(true);
  });

  it("each hydro cell's height is the raster's bilinear sample at its centre, rounded to the centimetre (§2.3)", () => {
    const t = terrainFrom(SMALL, (x, y) => 50 + 0.0137 * (x / 100) + 0.0071 * (y / 100) + 0.3 * Math.sin(x / 7000));
    const grid = hydroGridOver({ cellCm: t.cellCm, cols: t.cols, rows: t.rows, originX: t.originX, originY: t.originY }, 2500);
    const field = hydroField(t, grid);
    expect(field.heightCm).toBeInstanceOf(Int32Array);
    const s = terrainSampler(t, 250);
    for (let j = 0; j < grid.rows; j += 5) {
      for (let i = 0; i < grid.cols; i += 3) {
        const p = { x: centreX(grid, i), y: centreY(grid, j) } as never;
        const at = { x: centreX(grid, i), y: centreY(grid, j) };
        // The bilinear surface through the four raster centres around p, by hand.
        const u = (at.x - t.originX) / t.cellCm - 0.5;
        const v = (at.y - t.originY) / t.cellCm - 0.5;
        const i0 = Math.min(t.cols - 2, Math.max(0, Math.floor(u)));
        const j0 = Math.min(t.rows - 2, Math.max(0, Math.floor(v)));
        const a = Math.min(1, Math.max(0, u - i0));
        const b = Math.min(1, Math.max(0, v - j0));
        const hh = (ii: number, jj: number): number => t.heightCm[jj * t.cols + ii];
        const want = (1 - b) * ((1 - a) * hh(i0, j0) + a * hh(i0 + 1, j0)) + b * ((1 - a) * hh(i0, j0 + 1) + a * hh(i0 + 1, j0 + 1));
        expect(field.heightCm[j * grid.cols + i]).toBe(Math.round(want));
        expect(field.heightCm[j * grid.cols + i]).toBe(s.heightAt(p));
      }
    }
  });

  it("returns the input water with the rivers appended (§2.3's WaterBody fields), the bridges passed through", () => {
    const t = terrainFrom(SMALL, valley);
    const existing = { id: 'water:lake:0', kind: 'lake', face: { owner: 'water:lake:0', level: 0 }, shore: { role: 'shore', entity: 'water:lake:0' }, lifecycle: { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } } } as WaterBody;
    const bridges: never[] = [];
    const r = baseRivers.rivers(riverBp(SMALL, { inflowBearingCdeg: 0 }), t, { bodies: [existing], bridges }, siteContext(1, 'CITY', 4), undefined);
    if (!r.ok) throw new Error(r.detail);
    expect(r.value.bodies[0]).toBe(existing);
    expect(r.value.bridges).toBe(bridges);
    const b = r.value.bodies[1];
    expect(b.id).toBe('water:river:0');
    expect(b.kind).toBe('river');
    expect(b.face).toEqual({ owner: 'water:river:0', level: 0 });
    expect(b.shore).toEqual({ role: 'shore', entity: 'water:river:0' });
    expect(b.lifecycle).toEqual({ existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 4, seq: 0 } });
    expect(b.widthProfile).toBeInstanceOf(Int32Array);
    expect(b.widthProfile?.length).toBe(b.course?.length);
    for (const p of b.course ?? []) expect(Number.isInteger(p.x) && Number.isInteger(p.y)).toBe(true);
    // Depth has no law in the design at M0 (C-0173 (7)); the field stays absent, never a stand-in.
    expect(b.depthCm).toBeUndefined();
  });

  it('hands every run its report through onReport (the runner\'s sink) and returns the same water as runRivers', () => {
    const seen: RiverReport[] = [];
    const s = riverStrategy({ onReport: (rep) => seen.push(rep) });
    const t1 = terrainFrom(SMALL, valley);
    const t2 = terrainFrom(SMALL, valley);
    const a = s.rivers(riverBp(SMALL, { inflowBearingCdeg: 0 }), t1, { bodies: [], bridges: [] }, siteContext(2), undefined);
    const b = runRivers(riverBp(SMALL, { inflowBearingCdeg: 0 }), t2, { bodies: [], bridges: [] }, siteContext(2));
    if (!a.ok || !b.ok) throw new Error('refused');
    expect(a.value).toEqual(b.value.water);
    expect(seen).toEqual([b.value.report]);
    expect(seen[0].work).toEqual({ 'hydro.cells': 64 * 64 });
    expect(seen[0].hydrology).toMatchObject({ cellCm: 2500, cols: 64, rows: 64, d8Undefined: 0 });
  });

  it('refuses a rung outside the base ladder and a terrain whose raster does not match its size (E_OUT_OF_RANGE)', () => {
    const ctx = siteContext(1);
    const bad = { ...ctx, rung: { ...rungProfile('CITY'), rung: 'VILLAGE' as never } };
    const r = baseRivers.rivers(riverBp(SMALL, null), terrainFrom(SMALL, valley), { bodies: [], bridges: [] }, bad, undefined);
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('E_OUT_OF_RANGE rung');
    const t = terrainFrom(SMALL, valley);
    const broken = { ...t, heightCm: new Int32Array(3) };
    const q = baseRivers.rivers(riverBp(SMALL, null), broken, { bodies: [], bridges: [] }, siteContext(1), undefined);
    expect(q.ok ? 'ok' : `${q.code} ${q.detail}`).toBe('E_OUT_OF_RANGE terrain');
  });
});

describe('§12.4 hydrology row: the record shape the timing phase reports (the timing is M0-e-06 / M0-t-01\'s)', () => {
  it('names the unit, its four steps in order, the rung reported and the design receipt per rung', () => {
    expect(HYDROLOGY_ROW).toEqual({
      section: '§12.4',
      row: 'S1 hydrology',
      unit: 'hydrology(terrain, grid, lakeThresholdCm)',
      steps: ['priorityFlood', 'resolveFlats', 'd8', 'accumulate'],
      reportedAt: 'CITY',
      designMs: { TOWN: [6.2, 7.0], CITY: [15.9, 17.2], METROPOLIS: [25.3, 26.5] },
      designCellsCity: 102_000,
    });
  });
});
