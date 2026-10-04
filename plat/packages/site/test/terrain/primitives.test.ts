// M0-e-01: the authored site primitives in their basic form (§4.2 S1 (1): hill, valley, terrace, cliff; C-0165 (2)) —
// each offset's shape, the compass-bearing convention, the request's parameters read and nothing drawn, the refusals,
// and their sum added to the fBm at the stored cells.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { cdeg, streamFromKey } from '@plat/kernel';
import { buildTerrain, GROUND_KEY, preparePrimitive, primitivesOffsetCm, sitePrimitives, type SitePrimitive } from '../../src/terrain/index.js';
import { frame, paramsOf, pt } from './support.js';

const at0 = pt(0, 0);

describe('hill', { timeout: 60_000 }, () => {
  const hill = sitePrimitives.hill({ kind: 'hill', at: pt(1000, -2000), radiusM: 100, heightM: 30 });
  it('is its height at its centre, 0 at and beyond its radius, H · (1 − t²)² between', () => {
    expect(hill.offsetCm(1000, -2000)).toBe(3000);
    expect(hill.offsetCm(1000 + 10000, -2000)).toBe(0);
    expect(hill.offsetCm(1000, -2000 - 25000)).toBe(0);
    fc.assert(
      fc.property(fc.double({ min: 0, max: 1.5, noNaN: true }), fc.double({ min: 0, max: 6.3, noNaN: true }), (t, a) => {
        const x = 1000 + t * 10000 * Math.cos(a);
        const y = -2000 + t * 10000 * Math.sin(a);
        const t2 = ((x - 1000) / 10000) ** 2 + ((y + 2000) / 10000) ** 2;
        expect(hill.offsetCm(x, y)).toBeCloseTo(t2 < 1 ? 3000 * (1 - t2) ** 2 : 0, 6);
      }),
    );
  });
});

describe('valley (along a compass bearing)', { timeout: 60_000 }, () => {
  it('is its depth below its line, 0 at half its width, and runs along the bearing: 0 (north) along y, 9000 (east) along x', () => {
    const north = sitePrimitives.valley({ kind: 'valley', at: pt(500, 0), bearingCdeg: cdeg(0), widthM: 200, depthM: 12 });
    expect(north.offsetCm(500, 0)).toBe(-1200);
    expect(north.offsetCm(500, 987654)).toBe(-1200);
    expect(north.offsetCm(500 + 10000, 3)).toBeCloseTo(0, 9);
    expect(north.offsetCm(500 - 5000, 0)).toBeCloseTo(-1200 * 0.75 ** 2, 6);
    const east = sitePrimitives.valley({ kind: 'valley', at: at0, bearingCdeg: cdeg(90), widthM: 200, depthM: 12 });
    expect(east.offsetCm(-777777, 0)).toBeCloseTo(-1200, 6);
    expect(east.offsetCm(0, 10000)).toBeCloseTo(0, 6);
    const diag = sitePrimitives.valley({ kind: 'valley', at: at0, bearingCdeg: cdeg(45), widthM: 200, depthM: 12 });
    expect(diag.offsetCm(30000, 30000)).toBeCloseTo(-1200, 6);
    expect(diag.offsetCm(30000, -30000)).toBe(0);
  });
});

describe('terrace', { timeout: 60_000 }, () => {
  it('cuts the hill\'s profile into `steps` level treads: every value a multiple of H ÷ steps, the top tread at the centre', () => {
    const t = sitePrimitives.terrace({ kind: 'terrace', at: at0, radiusM: 200, heightM: 40, steps: 4 });
    expect(t.offsetCm(0, 0)).toBe(4000);
    expect(t.offsetCm(30000, 0)).toBe(0);
    const levels = new Set<number>();
    for (let x = 0; x <= 20000; x += 50) {
      const v = t.offsetCm(x, 0);
      expect(v / 1000).toBeCloseTo(Math.round(v / 1000), 9);
      levels.add(Math.round(v / 1000));
      const hill = 4000 * Math.max(0, 1 - (x / 20000) ** 2) ** 2;
      expect(v).toBeLessThanOrEqual(hill + 1e-6);
      expect(v).toBeGreaterThan(hill - 1000 - 1e-6);
    }
    expect([...levels].sort()).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('cliff', { timeout: 60_000 }, () => {
  const c = sitePrimitives.cliff({ kind: 'cliff', at: at0, bearingCdeg: cdeg(0), lengthM: 100, heightM: 20, widthM: 4 });
  it('raises the ground to the right of its bearing by its height, rising across its width, tapered past its ends', () => {
    expect(c.offsetCm(1000, 0)).toBe(2000); // east of a northward scarp: the right-hand side
    expect(c.offsetCm(-1000, 0)).toBe(0);
    expect(c.offsetCm(0, 0)).toBe(1000); // its line: half way up
    expect(c.offsetCm(1000, 4999)).toBe(2000); // inside its length
    expect(c.offsetCm(1000, 5000 + 200)).toBeCloseTo(1000, 6); // half way through the taper
    expect(c.offsetCm(1000, 5000 + 400)).toBe(0); // past the taper
    expect(c.offsetCm(1000, -5000 - 400)).toBe(0);
  });
  it('is steep across its width: a rise of its height over its width', () => {
    const rise = c.offsetCm(200, 0) - c.offsetCm(-200, 0);
    expect(rise).toBe(2000);
  });
});

describe('the primitives together', { timeout: 60_000 }, () => {
  it('add in order; the four kinds are the preparers of sitePrimitives', () => {
    expect(Object.keys(sitePrimitives).sort()).toEqual(['cliff', 'hill', 'terrace', 'valley']);
    const list: SitePrimitive[] = [
      { kind: 'hill', at: at0, radiusM: 50, heightM: 10 },
      { kind: 'valley', at: at0, bearingCdeg: cdeg(30), widthM: 40, depthM: 3 },
    ];
    const prepared = list.map(preparePrimitive);
    expect(primitivesOffsetCm(prepared, 0, 0)).toBe(1000 - 300);
    expect(primitivesOffsetCm([], 0, 0)).toBe(0);
  });

  it('refuse a radius, width or step count under one, and a non-finite value — and buildTerrain reports which', () => {
    const bad: SitePrimitive[] = [
      { kind: 'hill', at: at0, radiusM: 0, heightM: 10 },
      { kind: 'hill', at: at0, radiusM: 10, heightM: Number.NaN },
      { kind: 'valley', at: at0, bearingCdeg: cdeg(0), widthM: 0.01, depthM: 3 },
      { kind: 'terrace', at: at0, radiusM: 10, heightM: 3, steps: 0 },
      { kind: 'terrace', at: at0, radiusM: 10, heightM: 3, steps: 1.5 },
      { kind: 'cliff', at: at0, bearingCdeg: cdeg(0), lengthM: 10, heightM: 3, widthM: 0 },
      { kind: 'cliff', at: at0, bearingCdeg: cdeg(0), lengthM: -10, heightM: 3, widthM: 2 },
      { kind: 'cliff', at: at0, bearingCdeg: Number.POSITIVE_INFINITY as never, lengthM: 10, heightM: 3, widthM: 2 },
    ];
    for (const p of bad) expect(() => preparePrimitive(p)).toThrow(RangeError);
    const r = buildTerrain({ id: 'terrain:t', key: GROUND_KEY, frame: frame(0.2), params: paramsOf('TOWN'), epoch: 0 }, { relief: 'plain', primitives: [{ kind: 'hill', at: at0, radiusM: 5, heightM: 1 }, bad[0]] }, streamFromKey([1, 1, 1, 1]));
    expect(r.ok).toBe(false);
    expect(!r.ok && r.code).toBe('E_OUT_OF_RANGE');
    expect(!r.ok && r.detail.startsWith('primitive 1: ')).toBe(true);
  });

  it('are added to the fBm at every stored cell: a terrain with a primitive minus the same terrain without it is its offset', () => {
    const params = paramsOf('TOWN');
    const f = frame(0.3);
    const hill: SitePrimitive = { kind: 'hill', at: pt(2000, 1000), radiusM: 120, heightM: 45 };
    const make = (prims: SitePrimitive[]) => {
      const r = buildTerrain({ id: 'terrain:t', key: GROUND_KEY, frame: f, params, epoch: 0 }, { relief: 'rolling', primitives: prims }, streamFromKey([2, 4, 6, 8]));
      if (!r.ok) throw new Error(r.detail);
      return r.value;
    };
    const bare = make([]);
    const with1 = make([hill]);
    const prep = preparePrimitive(hill);
    for (let j = 0; j < bare.rows; j += 1) {
      for (let i = 0; i < bare.cols; i += 1) {
        const x = bare.originX + (i + 0.5) * bare.cellCm;
        const y = bare.originY + (j + 0.5) * bare.cellCm;
        const d = with1.heightCm[j * bare.cols + i] - bare.heightCm[j * bare.cols + i];
        expect(Math.abs(d - prep.offsetCm(x, y))).toBeLessThanOrEqual(1);
      }
    }
  });
});
