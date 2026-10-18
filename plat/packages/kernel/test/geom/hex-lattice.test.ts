// M0-a-10: hexLattice — §3.4 and §4.3: "six neighbours per interior point, no two edges cross, an empty region gives
// no points, the asserts fire on bad cells"; points strictly inside the region, a symmetric adjacency, distinct points,
// the draws a function of the stream key.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { hexLattice, type HexLattice } from '../../src/geom/index.js';
import { streamFromKey } from '../../src/rng/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { strictlyInside } from '../arena/support.js';
import { TIMEOUT, properCross, pt, segmentsMeet } from './support.js';

const key = (s: number): number[] => [s >>> 0, 0x9e3779b9, 0x7f4a7c15, 0x2545f491];

/** The undirected edges of the adjacency, each once. */
function edgesOf(h: HexLattice): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < h.points.length; i += 1) {
    for (let d = 0; d < 6; d += 1) {
      const j = h.adjacency[6 * i + d];
      if (j > i) out.push([i, j]);
    }
  }
  return out;
}

function checkLattice(h: HexLattice, region: readonly LatticePoint[][]): void {
  const n = h.points.length;
  expect(h.adjacency.length).toBe(6 * n);
  // symmetric: j is i's neighbour in direction d exactly when i is j's in direction d + 3
  for (let i = 0; i < n; i += 1) {
    for (let d = 0; d < 6; d += 1) {
      const j = h.adjacency[6 * i + d];
      if (j === -1) continue;
      expect(j).toBeGreaterThanOrEqual(0);
      expect(h.adjacency[6 * j + ((d + 3) % 6)]).toBe(i);
    }
  }
  // inside the region (even–odd over its rings), distinct
  const seen = new Set<string>();
  for (const p of h.points) {
    const inside = region.filter((r) => strictlyInside(r, p)).length % 2 === 1;
    expect(inside).toBe(true);
    const k = `${p.x},${p.y}`;
    expect(seen.has(k)).toBe(false);
    seen.add(k);
  }
  // no two edges cross, and an edge passes through no third point (pairs whose boxes are apart cannot meet)
  const e = edgesOf(h);
  const box = e.map(([p, q]) => [Math.min(h.points[p].x, h.points[q].x), Math.max(h.points[p].x, h.points[q].x), Math.min(h.points[p].y, h.points[q].y), Math.max(h.points[p].y, h.points[q].y)]);
  for (let a = 0; a < e.length; a += 1) {
    const [p, q] = e[a];
    for (let b = a + 1; b < e.length; b += 1) {
      if (box[a][1] < box[b][0] || box[b][1] < box[a][0] || box[a][3] < box[b][2] || box[b][3] < box[a][2]) continue;
      const [r, s] = e[b];
      const shares = p === r || p === s || q === r || q === s;
      if (shares) continue;
      expect(segmentsMeet(h.points[p], h.points[q], h.points[r], h.points[s])).toBe(false);
    }
  }
}

describe('hexLattice (§3.4, §4.3)', () => {
  const SQUARE = [[pt(0, 0), pt(20_000, 0), pt(20_000, 20_000), pt(0, 20_000)]];

  it('six neighbours per interior point, no two edges cross, every point strictly inside — at moderate and at the largest jitter', () => {
    for (const jitter of [0, 500, 1000, 1249.9]) {
      const h = hexLattice(SQUARE, 2500, jitter, streamFromKey(key(1)));
      checkLattice(h, SQUARE);
      const interior = h.points.map((p, i) => ({ p, i })).filter(({ p }) => p.x > 3 * 2500 && p.x < 20_000 - 3 * 2500 && p.y > 3 * 2500 && p.y < 20_000 - 3 * 2500);
      expect(interior.length).toBeGreaterThan(0);
      for (const { i } of interior) for (let d = 0; d < 6; d += 1) expect(h.adjacency[6 * i + d]).not.toBe(-1);
    }
  }, TIMEOUT);

  it('keeps no point in a hole, and adjacency only between kept points', () => {
    const region = [SQUARE[0], [pt(5000, 5000), pt(5000, 15_000), pt(15_000, 15_000), pt(15_000, 5000)]];
    const h = hexLattice(region, 1000, 300, streamFromKey(key(2)));
    checkLattice(h, region);
    expect(h.points.some((p) => p.x > 5000 && p.x < 15_000 && p.y > 5000 && p.y < 15_000)).toBe(false);
  }, TIMEOUT);

  it('an empty region gives no points (and, with no ring, draws nothing)', () => {
    const s = streamFromKey(key(3));
    expect(hexLattice([], 1000, 300, s)).toEqual({ points: [], adjacency: new Int32Array(0) });
    expect(s.u32()).toBe(streamFromKey(key(3)).u32());
    expect(hexLattice([[pt(0, 0), pt(10_000, 0), pt(20_000, 0)]], 1000, 300, streamFromKey(key(3))).points).toEqual([]); // zero area
    expect(hexLattice([[pt(0, 0), pt(10, 0), pt(10, 10), pt(0, 10)]], 1000, 0, streamFromKey(key(3))).points).toEqual([]); // smaller than a cell, off the lattice
  });

  it('the asserts fire on bad cells: spacing below minEdge, jitter at or above half the spacing, negative or not finite', () => {
    const s = streamFromKey(key(4));
    expect(() => hexLattice(SQUARE, 24, 0, s)).toThrow(RangeError);
    expect(() => hexLattice(SQUARE, Number.NaN, 0, s)).toThrow(RangeError);
    expect(() => hexLattice(SQUARE, Number.POSITIVE_INFINITY, 0, s)).toThrow(RangeError);
    expect(() => hexLattice(SQUARE, 1000, 500, s)).toThrow(RangeError);
    expect(() => hexLattice(SQUARE, 1000, -1, s)).toThrow(RangeError);
    expect(() => hexLattice(SQUARE, 1000, Number.NaN, s)).toThrow(RangeError);
    expect(() => hexLattice([[pt(0, 0), pt(1000, 0), { x: 0.5, y: 900 } as LatticePoint]], 100, 0, s)).toThrow(RangeError);
    expect(hexLattice(SQUARE, 25, 12.49, streamFromKey(key(4))).points.length).toBeGreaterThan(0); // the edge cases pass
  });

  it('with no jitter, points sit on the world-anchored lattice and nothing is drawn', () => {
    const s = streamFromKey(key(5));
    const h = hexLattice([[pt(-3000, -3000), pt(3000, -3000), pt(3000, 3000), pt(-3000, 3000)]], 1000, 0, s);
    expect(s.u32()).toBe(streamFromKey(key(5)).u32());
    const rowH = (1000 * Math.sqrt(3)) / 2;
    for (const p of h.points) {
      const j = Math.round(p.y / rowH);
      expect(Math.abs(p.y - j * rowH)).toBeLessThanOrEqual(0.5);
      const ox = (j & 1) === 1 ? 500 : 0;
      expect(Math.abs((((p.x - ox) % 1000) + 1000) % 1000)).toBe(0);
    }
    expect(h.points.some((p) => p.x === 0 && p.y === 0)).toBe(true);
  });

  it('is a function of the region, the cells and the stream key; random regions keep every property', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 0x7fffffff }),
        fc.integer({ min: 25, max: 3000 }),
        fc.double({ min: 0, max: 0.4999, noNaN: true }),
        fc.array(fc.tuple(fc.integer({ min: -20_000, max: 20_000 }), fc.integer({ min: -20_000, max: 20_000 })), { minLength: 3, maxLength: 9 }),
        (seed, spacing, jf, raw) => {
          const ring = raw.map(([x, y]) => pt(x, y));
          // keep the lattice small (the pairwise crossing check is quadratic): spacing at least the extent ÷ 12
          const ext = Math.max(...ring.map((p) => Math.abs(p.x)), ...ring.map((p) => Math.abs(p.y)), 1);
          const s = Math.max(spacing, Math.ceil((2 * ext) / 12));
          const h1 = hexLattice([ring], s, jf * s, streamFromKey(key(seed)));
          const h2 = hexLattice([ring], s, jf * s, streamFromKey(key(seed)));
          expect(h2).toEqual(h1);
          checkLattice(h1, [ring]);
        },
      ),
      { numRuns: 150 },
    );
  }, TIMEOUT);

  it('no two edges cross even where jitter near half the spacing could flip a triangle (the clamp, C-0159 (7))', () => {
    let crossings = 0;
    for (let seed = 0; seed < 30; seed += 1) {
      const h = hexLattice([[pt(0, 0), pt(4000, 0), pt(4000, 4000), pt(0, 4000)]], 400, 199.99, streamFromKey(key(seed)));
      const e = edgesOf(h);
      for (let a = 0; a < e.length; a += 1) for (let b = a + 1; b < e.length; b += 1) {
        const [p, q] = e[a];
        const [r, s] = e[b];
        if (properCross(h.points[p], h.points[q], h.points[r], h.points[s])) crossings += 1;
      }
    }
    expect(crossings).toBe(0);
  }, TIMEOUT);
});
