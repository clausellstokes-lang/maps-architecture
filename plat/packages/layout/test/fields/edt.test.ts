// The exact Euclidean distance transform (§4.5 "one distance transform per driver class"; §17.1 (8): Felzenszwalb and
// Huttenlocher 2012): every output is the integer least Δi² + Δj² to a source, equal to the brute-force minimum on
// random grids and masks; the nearest index names a source at that distance; no source gives +∞ and −1.
import { describe, expect, it } from 'vitest';
import { distanceTransform } from '../../src/index.js';
import { fixtureRandom } from '../districts/support.js';

function brute(mask: Uint8Array, cols: number, rows: number): Float64Array {
  const out = new Float64Array(cols * rows).fill(Infinity);
  const src: number[] = [];
  for (let i = 0; i < mask.length; i += 1) if (mask[i] !== 0) src.push(i);
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      let best = Infinity;
      for (const s of src) {
        const di = (s % cols) - i;
        const dj = Math.floor(s / cols) - j;
        best = Math.min(best, di * di + dj * dj);
      }
      out[j * cols + i] = best;
    }
  }
  return out;
}

describe('distanceTransform: exact (Felzenszwalb–Huttenlocher)', () => {
  it('equals the brute-force squared distance on 300 random grids and masks, its nearest index a source at that distance', () => {
    const rand = fixtureRandom(7);
    for (let t = 0; t < 300; t += 1) {
      const cols = 1 + Math.floor(rand() * 40);
      const rows = 1 + Math.floor(rand() * 40);
      const density = [0, 0.001, 0.01, 0.05, 0.3, 1][t % 6];
      const mask = new Uint8Array(cols * rows);
      for (let i = 0; i < mask.length; i += 1) if (rand() < density) mask[i] = 1;
      if (t % 6 === 1 && mask.every((v) => v === 0)) mask[Math.floor(rand() * mask.length)] = 1;
      const { d2, nearest } = distanceTransform(mask, cols, rows);
      const want = brute(mask, cols, rows);
      expect(Array.from(d2)).toEqual(Array.from(want));
      for (let i = 0; i < d2.length; i += 1) {
        if (d2[i] === Infinity) {
          expect(nearest[i]).toBe(-1);
          continue;
        }
        const s = nearest[i];
        expect(mask[s]).toBe(1);
        const di = (s % cols) - (i % cols);
        const dj = Math.floor(s / cols) - Math.floor(i / cols);
        expect(di * di + dj * dj).toBe(d2[i]);
      }
    }
  });

  it('a single source: d² = Δi² + Δj² everywhere (a 250 × 250 CITY-sized grid); every value a whole number', () => {
    const cols = 250;
    const rows = 250;
    const mask = new Uint8Array(cols * rows);
    mask[117 * cols + 33] = 1;
    const { d2 } = distanceTransform(mask, cols, rows);
    for (let j = 0; j < rows; j += 1) for (let i = 0; i < cols; i += 1) expect(d2[j * cols + i]).toBe((i - 33) ** 2 + (j - 117) ** 2);
  });

  it('two sources on one row: the parabolas meet at their bisector (the envelope pops the dominated parabola)', () => {
    const cols = 21;
    const mask = new Uint8Array(cols * 3);
    mask[cols + 2] = 1;
    mask[cols + 17] = 1;
    const { d2 } = distanceTransform(mask, cols, 3);
    const row = Array.from(d2.slice(cols, 2 * cols));
    expect(row).toEqual(row.map((_, i) => Math.min((i - 2) ** 2, (i - 17) ** 2)));
  });

  it('no source: +∞ and −1 everywhere; a mask of the wrong size is refused', () => {
    const r = distanceTransform(new Uint8Array(12), 4, 3);
    expect(Array.from(r.d2).every((v) => v === Infinity)).toBe(true);
    expect(Array.from(r.nearest).every((v) => v === -1)).toBe(true);
    expect(() => distanceTransform(new Uint8Array(11), 4, 3)).toThrow(RangeError);
  });
});
