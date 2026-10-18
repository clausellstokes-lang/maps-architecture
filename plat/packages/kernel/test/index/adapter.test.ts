// M0-a-03: the flatbush adapter (§3.1's adopted packed static index; the one file that imports the library, §14) —
// a built tree answers exactly the boxes that meet a closed query box (touching counts), against brute force, for node
// counts around the node size; its bytes are §2.2's PackedIndex (a double-precision box and a 32-bit index per node,
// one inner node per 16 below it: 38.4 B per item once the indices are 32-bit, §3.3); bad input is refused.
import { describe, expect, it } from 'vitest';
import { PACKED_NODE_SIZE, packBoxes, searchPacked } from '../../src/adapters/flatbush.js';
import { generator, intIn } from './support.js';

/** A generous timeout: the machine is shared (C-0025), so a test's wall-clock is contended. */
const SLOW = 120_000;

function boxes(n: number, seed: number): Float64Array {
  const rnd = generator(seed);
  const b = new Float64Array(4 * n);
  for (let i = 0; i < n; i++) {
    const x = intIn(rnd, -10_000, 10_000) - (rnd() < 0.5 ? 0.71 : 0);
    const y = intIn(rnd, -10_000, 10_000);
    b.set([x, y, x + intIn(rnd, 0, 500), y + (rnd() < 0.2 ? 0 : intIn(rnd, 0, 500))], 4 * i);
  }
  return b;
}

describe('the flatbush adapter', () => {
  it('answers exactly the boxes meeting a closed query box, for 1 … 5 000 boxes', () => {
    for (const n of [1, 2, 15, 16, 17, 255, 256, 257, 5000]) {
      const b = boxes(n, n);
      const tree = packBoxes(b, n);
      expect(tree.size).toBe(n);
      const rnd = generator(1000 + n);
      for (let q = 0; q < 200; q++) {
        const x = intIn(rnd, -10_500, 10_500);
        const y = intIn(rnd, -10_500, 10_500);
        const w = q % 5 === 0 ? 0 : intIn(rnd, 0, 3000);
        const qb = [x, y, x + w, y + w];
        const got = searchPacked(tree, qb[0], qb[1], qb[2], qb[3]).sort((a, c) => a - c);
        const want: number[] = [];
        for (let i = 0; i < n; i++) if (b[4 * i] <= qb[2] && qb[0] <= b[4 * i + 2] && b[4 * i + 1] <= qb[3] && qb[1] <= b[4 * i + 3]) want.push(i);
        expect(got).toEqual(want);
      }
      // touching edges and corners count
      expect(searchPacked(tree, b[2], b[3], b[2], b[3])).toContain(0);
    }
  }, SLOW);

  it('takes §2.2’s packed form: node size 16, 38.4 B per item with 32-bit indices', () => {
    expect(PACKED_NODE_SIZE).toBe(16);
    const n = 20_000;
    const tree = packBoxes(boxes(n, 7), n);
    expect(tree.byteLength / n).toBeCloseTo(38.4, 1);
  });

  it('refuses no boxes, a short array, a box with min > max or a NaN', () => {
    expect(() => packBoxes(new Float64Array(0), 0)).toThrow(/n ≥ 1/);
    expect(() => packBoxes(new Float64Array(4), 2)).toThrow(/n ≥ 1/);
    expect(() => packBoxes(Float64Array.from([1, 0, 0, 1]), 1)).toThrow(/min ≤ max/);
    expect(() => packBoxes(Float64Array.from([Number.NaN, 0, 0, 1]), 1)).toThrow(/min ≤ max/);
  });
});
