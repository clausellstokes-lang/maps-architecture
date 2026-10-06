// S5a's boundary (§4.4 S5a *Boundary*; C-0017; C-S5AB): stage 1's is S3's contour; for k ≥ 2 the land of
// {T ≤ t_k} ∪ enclosure(k − 1) equals stages 1 … k's land within one cell, the union holds the enclosure, the capped
// case reports its shortfall and a capped stage that adds no land folds; the outline keeps its pins; the crossings of
// ways with an outline and the outline with points put in. On slices only (no arena).
import { describe, expect, it } from 'vitest';
import type { LatticePoint } from '@plat/kernel';
import { flatFixture, s3Slice, type S3Slice } from '../../../src/index.js';
import { boundaryCrossings, HA_CM2, insertOnOutline, landOf, squareGates, stageBoundary, unionField, withPins, type WayLine } from '../../../src/growth/boundary.js';
import { P } from './support.js';

const SLICES = new Map<string, S3Slice>();
function slice(seed: number, frameAreaHa?: number): S3Slice {
  const key = `${String(seed)}:${String(frameAreaHa)}`;
  let s = SLICES.get(key);
  if (s === undefined) {
    s = s3Slice(flatFixture(seed, frameAreaHa === undefined ? {} : { frameAreaHa }));
    SLICES.set(key, s);
  }
  return s;
}

/** The land of the union recounted here: interior dry nodes with T ≤ t or in the enclosure. */
function unionLand(s: S3Slice, T: Float64Array, t: number, enclosure: Uint8Array | null): number {
  let n = 0;
  for (let i = 0; i < T.length; i += 1) {
    if (s.lattice.interior[i] !== 1 || s.lattice.water[i] !== 0) continue;
    if (T[i] <= t || (enclosure !== null && enclosure[i] === 1)) n += 1;
  }
  return n * s.lattice.cellAreaCm2;
}

describe('stageBoundary', () => {
  it('stage 1 is S3\'s contour: its threshold, its selection, its contour', { timeout: 60_000 }, () => {
    const s = slice(1);
    const b = stageBoundary(s.field, 1, s.site.land);
    expect(b.threshold.t).toBe(s.threshold.t);
    expect(b.landCm2).toBe(s.threshold.landCm2);
    expect([...b.set.selected]).toEqual([...s.levelSet.selected]);
    expect(b.set.contour).toEqual(s.levelSet.contour);
    expect(b.enclosureCm2).toBe(0);
    expect(b.folded).toBe(false);
    expect(b.askedCm2).toBe(s.site.land.stagesHa[0] * HA_CM2);
  });

  it('stage k ≥ 2: {T ≤ t_k} ∪ enclosure(k − 1) holds stages 1 … k\'s land within one cell and the enclosure', { timeout: 60_000 }, () => {
    for (const seed of [1, 2]) {
      const s = slice(seed);
      const cell = s.lattice.cellAreaCm2;
      let enclosure = s.levelSet.selected;
      for (const k of [2, 3]) {
        const b = stageBoundary(s.field, k, s.site.land, { enclosure });
        let asked = 0;
        for (let j = 0; j < k; j += 1) asked += s.site.land.stagesHa[j] * HA_CM2;
        expect(b.askedCm2).toBeCloseTo(asked, 0);
        expect(b.capped).toBe(false);
        // The union recounted from T itself (not the held field) equals the threshold's land, within one cell of asked.
        expect(unionLand(s, s.field.T, b.threshold.t, enclosure)).toBe(b.landCm2);
        expect(Math.abs(b.landCm2 - asked)).toBeLessThanOrEqual(cell);
        // The enclosure lies inside; its land and the stage's addition are as reported.
        for (let i = 0; i < enclosure.length; i += 1) if (enclosure[i] === 1) expect(b.set.selected[i]).toBe(1);
        expect(b.enclosureCm2).toBe(landOf(s.field, enclosure));
        expect(b.addedCm2).toBe(b.landCm2 - b.enclosureCm2);
        expect(b.addedCm2).toBeGreaterThan(0);
        // The threshold reads T held at 0 on the enclosure: t is a value of T outside it, the field T itself untouched.
        expect(b.source).toBe(s.field);
        expect(b.field.T).not.toBe(s.field.T);
        enclosure = b.set.selected;
      }
    }
  });

  it('the union field: T held at 0 on the enclosure, unchanged elsewhere; null is T itself', { timeout: 60_000 }, () => {
    const s = slice(1);
    expect(unionField(s.field, null)).toBe(s.field);
    const u = unionField(s.field, s.levelSet.selected);
    for (let i = 0; i < u.T.length; i += 1) expect(u.T[i]).toBe(s.levelSet.selected[i] === 1 ? 0 : s.field.T[i]);
    expect(u.road).toBe(s.field.road);
    expect(u.a).toBe(s.field.a);
    expect(() => unionField(s.field, new Uint8Array(3))).toThrow(RangeError);
  });

  it('a stage on a frame its land cannot fill is capped (the shortfall reported); one that adds no land folds', { timeout: 60_000 }, () => {
    // A 240 ha frame: stages 1 and 2 fit, the ribbon is capped at the reachable land.
    const s = slice(1, 240);
    const cell = s.lattice.cellAreaCm2;
    const b2 = stageBoundary(s.field, 2, s.site.land, { enclosure: s.levelSet.selected });
    expect(b2.capped).toBe(false);
    const b3 = stageBoundary(s.field, 3, s.site.land, { enclosure: b2.set.selected });
    expect(b3.capped).toBe(true);
    let reach = 0;
    for (let i = 0; i < s.field.T.length; i += 1) if (s.lattice.interior[i] === 1 && s.lattice.water[i] === 0 && s.field.T[i] < Infinity) reach += 1;
    expect(b3.landCm2).toBe(reach * cell);
    expect(b3.shortfallCm2).toBeCloseTo(b3.askedCm2 - b3.landCm2, 0);
    expect(b3.addedCm2).toBeGreaterThan(0);
    expect(b3.folded).toBe(false);
    // Stage 3 again over its own (full) enclosure: capped and adding nothing — folded.
    const again = stageBoundary(s.field, 3, s.site.land, { enclosure: b3.set.selected });
    expect(again.capped).toBe(true);
    expect(again.addedCm2).toBe(0);
    expect(again.folded).toBe(true);
    // An uncapped stage never folds, even when it adds no land (its quota already enclosed: t at the enclosure's 0).
    const big = stageBoundary(s.field, 2, s.site.land, { enclosure: b3.set.selected });
    expect(big.capped).toBe(false);
    expect(big.addedCm2).toBe(0);
    expect(big.threshold.t).toBe(0);
    expect(big.folded).toBe(false);
    const fits = stageBoundary(slice(1).field, 2, s.site.land, { enclosure: slice(1).levelSet.selected });
    expect(fits.folded).toBe(false);
  });

  it('refuses a stage out of range and a stage k ≥ 2 without its enclosure', { timeout: 60_000 }, () => {
    const s = slice(1);
    expect(() => stageBoundary(s.field, 0, s.site.land)).toThrow(RangeError);
    expect(() => stageBoundary(s.field, 4, s.site.land)).toThrow(RangeError);
    expect(() => stageBoundary(s.field, 1.5, s.site.land)).toThrow(RangeError);
    expect(() => stageBoundary(s.field, 2, s.site.land)).toThrow(RangeError);
  });

  it('withPins keeps the selection and puts each pin (a contour vertex) in the outline', { timeout: 60_000 }, () => {
    const s = slice(2);
    const b = stageBoundary(s.field, 2, s.site.land, { enclosure: s.levelSet.selected });
    const pins = [b.set.contour[3], b.set.contour[Math.floor(b.set.contour.length / 2)]];
    const p = withPins(b, pins);
    expect([...p.set.selected]).toEqual([...b.set.selected]);
    expect(p.threshold).toBe(b.threshold);
    for (const q of pins) expect(p.set.outline.some((o) => o.x === q.x && o.y === q.y)).toBe(true);
  });
});

describe('boundaryCrossings', () => {
  const square: LatticePoint[] = [P(0, 0), P(10_000, 0), P(10_000, 10_000), P(0, 10_000)];
  const line = (way: string, ...pts: LatticePoint[]): WayLine => ({ way, runs: [{ points: pts, halfEdges: pts.slice(1).map((_p, i) => 2 * i) }] });

  it('counts each crossing once, in way order then along the way, with its side, half-edge and bearing', () => {
    const xs = boundaryCrossings(square, [line('a', P(5_000, 5_000), P(5_000, 20_000)), line('b', P(-5_000, 2_000), P(15_000, 2_000)), line('c', P(1_000, 1_000), P(2_000, 2_000))], P(5_000, 5_000));
    expect(xs.map((x) => [x.way, x.at.x, x.at.y, x.side])).toEqual([
      ['a', 5_000, 10_000, 2],
      ['b', 0, 2_000, 3],
      ['b', 10_000, 2_000, 1],
    ]);
    const bearing = (dx: number, dy: number): number => ((Math.round((Math.atan2(dx, dy) * 18_000) / Math.PI) % 36_000) + 36_000) % 36_000;
    expect(xs[0].bearingCdeg).toBe(0);
    expect(xs[1].bearingCdeg).toBe(bearing(-5_000, -3_000));
    expect(xs[2].bearingCdeg).toBe(bearing(5_000, -3_000));
    expect(xs[0].halfEdge).toBe(0);
  });

  it('a way through an outline vertex counts once; a way that only touches it counts', () => {
    const xs = boundaryCrossings(square, [line('d', P(-5_000, -5_000), P(5_000, 5_000))], P(5_000, 5_000));
    expect(xs.length).toBe(1);
    expect([xs[0].at.x, xs[0].at.y]).toEqual([0, 0]);
    const two = boundaryCrossings(square, [line('e', P(-1_000, 5_000), P(11_000, 5_000), P(11_000, 6_000), P(-1_000, 6_000))], P(5_000, 5_000));
    expect(two.map((x) => [x.at.x, x.at.y])).toEqual([
      [0, 5_000],
      [10_000, 5_000],
      [10_000, 6_000],
      [0, 6_000],
    ]);
  });
});

describe('insertOnOutline', () => {
  it('puts each point in on its side, in order along it, without doubling a vertex', () => {
    const ring: LatticePoint[] = [P(0, 0), P(10_000, 0), P(10_000, 10_000), P(0, 10_000)];
    const out = insertOnOutline(ring, [
      { at: P(7_000, 0), side: 0, u: 0.7 },
      { at: P(2_000, 0), side: 0, u: 0.2 },
      { at: P(10_000, 10_000), side: 1, u: 1 },
      { at: P(0, 5_000), side: 3, u: 0.5 },
    ]);
    expect(out).toEqual([P(0, 0), P(2_000, 0), P(7_000, 0), P(10_000, 0), P(10_000, 10_000), P(0, 10_000), P(0, 5_000)]);
  });
});

describe('squareGates', () => {
  // A 100 m square, counter-clockwise, its bottom side cut every 5 m; a gate at (50 m, 0).
  const bottom = Array.from({ length: 19 }, (_v, i) => P((i + 1) * 500, 0));
  const ring: LatticePoint[] = [P(0, 0), ...bottom, P(10_000, 0), P(10_000, 10_000), P(0, 10_000)];

  it('a way square to the side: the vertices within the reach replaced by the two points on its normal', () => {
    const out = squareGates(ring, [P(5_000, 0)], [{ x: 0, y: 700 }], 1_500);
    const at = out.findIndex((q) => q.x === 5_000 && q.y === 0);
    expect(out[at - 1]).toEqual(P(3_500, 0));
    expect(out[at + 1]).toEqual(P(6_500, 0));
    for (const q of out) if (q.y === 0 && q.x !== 5_000) expect(Math.abs(q.x - 5_000)).toBeGreaterThanOrEqual(1_500);
    expect(out.length).toBe(ring.length - 5 + 2);
  });

  it('an oblique way: the wall crosses it square, the points along its normal in the outline\'s direction', () => {
    const out = squareGates(ring, [P(5_000, 0)], [{ x: 300, y: 300 }], 1_500);
    const at = out.findIndex((q) => q.x === 5_000 && q.y === 0);
    const r = 1_500 / Math.SQRT2;
    expect(out[at - 1]).toEqual(P(Math.round(5_000 - r), Math.round(r)));
    expect(out[at + 1]).toEqual(P(Math.round(5_000 + r), Math.round(-r)));
    // The way's direction and the wall's sides at the gate are square.
    const u = { x: out[at + 1].x - out[at - 1].x, y: out[at + 1].y - out[at - 1].y };
    expect(Math.abs(u.x * 300 + u.y * 300)).toBeLessThan(2 * 300);
  });

  it('stops at another gate and keeps the outline where squaring would make it touch itself', () => {
    const two = squareGates(ring, [P(5_000, 0), P(6_000, 0)], [{ x: 0, y: 1 }, { x: 0, y: 1 }], 1_500);
    expect(two.some((q) => q.x === 6_000 && q.y === 0)).toBe(true);
    expect(two.some((q) => q.x === 5_000 && q.y === 0)).toBe(true);
    // A small ring whose squaring at the reach would cross its far side: kept as it was.
    const tight: LatticePoint[] = [P(0, 0), P(500, 0), P(1_000, 0), P(1_000, 300), P(600, 300), P(400, 300), P(0, 300)];
    expect(squareGates(tight, [P(500, 0)], [{ x: 0, y: 1 }], 1_500)).toEqual(tight);
    const steep = squareGates(tight, [P(500, 0)], [{ x: 1, y: 1 }], 200);
    expect(steep.some((q) => q.x === 500 && q.y === 0)).toBe(true);
  });
});
