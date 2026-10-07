// The Gaussian of one block width as an O(N) three-box blur (§4.5; §17.1 (8): Wells 1986, each box extended by its end
// weights, Gwosdek et al. 2011; C-0255 (4)): on a point source the blurred raster's σ along each axis equals 60 m within
// 2 % at the 32 m cell and at R12-5's 48 m step, its mass is kept, it is symmetric and close to the sampled Gaussian;
// a constant raster stays constant; the blur is linear.
import { describe, expect, it } from 'vitest';
import { blur3, boxFor, fieldsCells } from '../../src/index.js';
import { TABLES } from './support.js';

function pointSource(cellM: number): { a: Float64Array; n: number; c: number } {
  const n = 61;
  const c = 30;
  const a = new Float64Array(n * n);
  a[c * n + c] = 1;
  blur3(a, n, n, boxFor(60 / cellM));
  return { a, n, c };
}

function moments(a: Float64Array, n: number, c: number): { mass: number; sx: number; sy: number; mx: number; my: number } {
  let mass = 0;
  let mx = 0;
  let my = 0;
  let vx = 0;
  let vy = 0;
  for (let j = 0; j < n; j += 1) {
    for (let i = 0; i < n; i += 1) {
      const w = a[j * n + i];
      mass += w;
      mx += w * (i - c);
      my += w * (j - c);
      vx += w * (i - c) ** 2;
      vy += w * (j - c) ** 2;
    }
  }
  return { mass, mx, my, sx: Math.sqrt(vx / mass), sy: Math.sqrt(vy / mass) };
}

describe('the three-box blur', () => {
  it("σ is fields.json's one block width at CITY: 60 m", () => {
    expect(fieldsCells(TABLES).sigmaCm('CITY')).toBe(6000);
  });

  for (const cellM of [32, 48]) {
    it(`a point source at ${String(cellM)} m cells: σ = 60 m within 2 % on both axes, the mass kept, centred and symmetric`, () => {
      const { a, n, c } = pointSource(cellM);
      const m = moments(a, n, c);
      expect(Math.abs(m.mass - 1)).toBeLessThan(1e-12);
      expect(Math.abs(m.mx)).toBeLessThan(1e-12);
      expect(Math.abs(m.my)).toBeLessThan(1e-12);
      expect(Math.abs(m.sx * cellM - 60) / 60).toBeLessThan(0.02);
      expect(Math.abs(m.sy * cellM - 60) / 60).toBeLessThan(0.02);
      for (let j = 0; j < n; j += 1) for (let i = 0; i < n; i += 1) {
        expect(a[j * n + i]).toBeCloseTo(a[i * n + j], 15);
        expect(a[j * n + i]).toBeCloseTo(a[j * n + (2 * c - i)], 15);
      }
      // close to the sampled Gaussian of σ = 60 m: L1 distance ≤ 0.07 (a three-box blur's shape; 0.052 at 32 m, 0.062 at 48 m)
      const s = 60 / cellM;
      let norm = 0;
      for (let k = -c; k <= c; k += 1) norm += Math.exp(-(k * k) / (2 * s * s));
      let l1 = 0;
      for (let j = 0; j < n; j += 1) for (let i = 0; i < n; i += 1) {
        const g = (Math.exp(-((i - c) ** 2) / (2 * s * s)) * Math.exp(-((j - c) ** 2) / (2 * s * s))) / (norm * norm);
        l1 += Math.abs(a[j * n + i] - g);
      }
      expect(l1).toBeLessThan(0.07);
    });
  }

  it('a plain three-box blur would miss the bar: the extended box reaches the variance a whole-cell box cannot', () => {
    // σ² ÷ 3 per box at 32 m: 1.172 cells²; plain boxes give r(r + 1) ÷ 3 ∈ {0, 0.667, 2}; the extended box's α fills the gap
    const b = boxFor(60 / 32);
    expect(b.radius).toBe(1);
    expect(b.alpha).toBeGreaterThan(0.2);
    expect(b.alpha).toBeLessThan(0.35);
    const v = (b.radius * (b.radius + 1) * (2 * b.radius + 1) / 3 + 2 * b.alpha * (b.radius + 1) ** 2) * b.norm;
    expect(v * 3).toBeCloseTo((60 / 32) ** 2, 12);
    const c = boxFor(60 / 48);
    expect(c.radius).toBe(0);
    expect((2 * c.alpha * c.norm) * 3).toBeCloseTo((60 / 48) ** 2, 12);
  });

  it('a constant raster stays constant (the edge repeats its last cell); the blur is linear', () => {
    const n = 17;
    const k = new Float64Array(n * 9).fill(0.37);
    blur3(k, n, 9, boxFor(60 / 32));
    for (const v of k) expect(v).toBeCloseTo(0.37, 14);
    const a = new Float64Array(n * 9).map((_, i) => Math.sin(i));
    const b = new Float64Array(n * 9).map((_, i) => Math.cos(3 * i));
    const sum = a.map((v, i) => 2 * v + b[i]);
    const box = boxFor(1.7);
    blur3(a, n, 9, box);
    blur3(b, n, 9, box);
    blur3(sum, n, 9, box);
    for (let i = 0; i < sum.length; i += 1) expect(sum[i]).toBeCloseTo(2 * a[i] + b[i], 13);
  });

  it('a σ that is not a positive length is refused; a raster of the wrong size is refused', () => {
    expect(() => boxFor(0)).toThrow(RangeError);
    expect(() => boxFor(Number.NaN)).toThrow(RangeError);
    expect(() => blur3(new Float64Array(5), 2, 2, boxFor(1))).toThrow(RangeError);
  });
});
