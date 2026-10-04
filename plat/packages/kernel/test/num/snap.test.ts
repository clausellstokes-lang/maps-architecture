// M0-a-01: snap, the one door (§3.2 (1), (7)) — §13.1's quantisation class: half-centimetre ties before snapping,
// ± (2²³ − 1) accepted, ± 2²³, NaN and ± ∞ refused with E_OUT_OF_RANGE; the rounding rule of C-0134 (1).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { LATTICE, snap } from '../../src/num/index.js';
import { MAX, RANGE, TIMEOUT } from './support.js';

const refused = (x: number, y: number, detail: 'x' | 'y') => {
  expect(snap(x, y)).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail });
};

describe('snap (§3.2 (7))', () => {
  it('accepts ± (2²³ − 1) on both axes and returns the lattice point', () => {
    for (const x of [MAX, -MAX, 0, 1, -1]) {
      for (const y of [MAX, -MAX, 0]) expect(snap(x, y)).toEqual({ ok: true, value: { x, y }, warnings: [] });
    }
  });

  it('refuses ± 2²³, NaN and ± ∞ on either axis with E_OUT_OF_RANGE, naming the coordinate', () => {
    for (const bad of [RANGE, -RANGE, Number.NaN, Infinity, -Infinity, 2 ** 31, -(2 ** 31), 2 ** 32 + 3, 1e300, -1e300]) {
      refused(bad, 0, 'x');
      refused(0, bad, 'y');
      refused(bad, bad, 'x');
    }
    expect(LATTICE.rangeCm).toBe(8_388_608);
    expect(LATTICE.rangeCm).toBe(RANGE);
  });

  it('rounds half-centimetre ties away from zero, symmetrically under reflection (C-0134 (1))', () => {
    const cases: [number, number][] = [
      [0.5, 1],
      [-0.5, -1],
      [1.5, 2],
      [-1.5, -2],
      [2.5, 3],
      [-2.5, -3],
      [12345.5, 12346],
      [-12345.5, -12346],
      [MAX - 0.5, MAX],
      [-(MAX - 0.5), -MAX],
      [0.49999999999999994, 0],
      [-0.49999999999999994, 0],
      [1.4999999999999998, 1],
      [0.5000000000000001, 1],
    ];
    for (const [v, want] of cases) {
      const r = snap(v, -v);
      expect(r, String(v)).toEqual({ ok: true, value: { x: want, y: want === 0 ? 0 : -want }, warnings: [] });
    }
  });

  it('refuses an input that would round onto 2²³: the range check reads the rounded value', () => {
    refused(MAX + 0.5, 0, 'x');
    refused(-(MAX + 0.5), 0, 'x');
    refused(0, MAX + 0.5, 'y');
    refused(0, -(MAX + 0.5), 'y');
    expect(snap(MAX + 0.49, -(MAX + 0.49)).ok).toBe(true);
  });

  it('never mints −0', () => {
    for (const v of [-0, -0.1, -0.5 + 1e-9, -0.49999999999999994]) {
      const r = snap(v, v);
      expect(r.ok).toBe(true);
      if (r.ok) {
        expect(Object.is(r.value.x, 0), String(v)).toBe(true);
        expect(Object.is(r.value.y, 0), String(v)).toBe(true);
      }
    }
  });

  it('is the nearest lattice point within ½ cm of every accepted input, and refuses exactly the out-of-range ones', () => {
    fc.assert(
      fc.property(fc.double({ min: -(RANGE + 4), max: RANGE + 4 }), fc.double({ noDefaultInfinity: false }), (x, y) => {
        const r = snap(x, y);
        const xr = x < 0 ? -Math.round(-x) : Math.round(x);
        const yr = y < 0 ? -Math.round(-y) : Math.round(y);
        const inRange = (v: number) => Math.abs(v) < RANGE;
        if (!inRange(xr)) return r.ok === false && r.code === 'E_OUT_OF_RANGE' && r.detail === 'x';
        if (!inRange(yr)) return r.ok === false && r.code === 'E_OUT_OF_RANGE' && r.detail === 'y';
        if (!r.ok) return false;
        const { x: sx, y: sy } = r.value;
        return (
          Number.isInteger(sx) &&
          Number.isInteger(sy) &&
          Math.abs(sx - x) <= 0.5 &&
          Math.abs(sy - y) <= 0.5 &&
          (Math.abs(sx - x) < 0.5 || Math.abs(sx) > Math.abs(x)) &&
          (Math.abs(sy - y) < 0.5 || Math.abs(sy) > Math.abs(y)) &&
          sx === (sx | 0) &&
          sy === (sy | 0)
        );
      }),
    );
  }, TIMEOUT);
});
