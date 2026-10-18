// M0-a-10: hexLattice — §3.4 and §4.3: "six neighbours per interior point, no two edges cross, an empty region gives
// no points, the asserts fire on bad cells"; points strictly inside the region, a symmetric adjacency, distinct points,
// the draws a function of the stream key; and the strict reading it keeps candidates by — even–odd over the rings, on
// lattice points, a point on a ring outside (kernel-plan.md §1.12 G-2) — with its outputs pinned.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { hexLattice, type HexLattice } from '../../src/geom/index.js';
import { streamFromKey } from '../../src/rng/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { strictlyInside } from '../arena/support.js';
import { TIMEOUT, generator, intIn, properCross, pt, segmentsMeet, snapped, starShaped } from './support.js';

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
    // fewer than three edges over all its rings (a one-point ring, a two-point ring, two one-point rings): no points, and
    // nothing drawn — the stream's next draw is a fresh stream's (the exit before the lattice, hex-lattice.ts's edgeCount)
    for (const region of [[[pt(0, 0)]], [[pt(0, 0), pt(10_000, 5000)]], [[pt(0, 0)], [pt(10_000, 5000)]], [[], [pt(5000, 5000), pt(-5000, 0)]]]) {
      const t = streamFromKey(key(3));
      expect(hexLattice(region, 1000, 300, t), JSON.stringify(region)).toEqual({ points: [], adjacency: new Int32Array(0) });
      expect(t.u32(), JSON.stringify(region)).toBe(streamFromKey(key(3)).u32());
    }
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

/** The oracle of the strict reading: outside when q lies on an edge of any ring, else inside on an odd count of rings. */
function strictlyInsideRegion(region: readonly (readonly LatticePoint[])[], q: LatticePoint): boolean {
  for (const ring of region) {
    for (let i = 0; i < ring.length; i += 1) {
      if (segmentsMeet(ring[i], ring[(i + 1) % ring.length], q, q)) return false;
    }
  }
  return region.filter((r) => strictlyInside(r, q)).length % 2 === 1;
}

/** A 53-bit digest of a lattice: every point and every adjacency entry, in order. */
function digest(h: HexLattice): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  const mix = (v: number): void => {
    h1 = Math.imul(h1 ^ v, 2654435761);
    h2 = Math.imul(h2 ^ v, 1597334677);
  };
  mix(h.points.length);
  for (const p of h.points) {
    mix(p.x | 0);
    mix(p.y | 0);
  }
  for (const a of h.adjacency) mix(a);
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return `${h.points.length}:${(4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16)}`;
}

const sq = (x0: number, y0: number, x1: number, y1: number, ccw = true): LatticePoint[] =>
  ccw ? [pt(x0, y0), pt(x1, y0), pt(x1, y1), pt(x0, y1)] : [pt(x0, y0), pt(x0, y1), pt(x1, y1), pt(x1, y0)];

/** Regions whose readings differ: candidates on ring edges, holes of either orientation, nested rings, self-crossing rings. */
const FIXTURES: readonly (readonly [string, LatticePoint[][], number, number])[] = [
  ['a square whose edges carry lattice points', [sq(-3000, -3000, 3000, 3000)], 1000, 0],
  ['a rectangle whose bottom edge is row 0', [sq(0, 0, 20_000, 17_320)], 1000, 0],
  ['a hole of the opposite orientation', [sq(0, 0, 20_000, 20_000), sq(5000, 5000, 15_000, 15_000, false)], 1000, 0],
  ['a hole of the same orientation', [sq(0, 0, 20_000, 20_000), sq(5000, 5000, 15_000, 15_000)], 1000, 0],
  ['three nested squares', [sq(0, 0, 30_000, 30_000), sq(5000, 5000, 25_000, 25_000), sq(10_000, 10_000, 20_000, 20_000)], 1000, 0],
  ['a bow-tie', [[pt(0, 0), pt(20_000, 20_000), pt(20_000, 0), pt(0, 20_000)]], 1000, 0],
  ['a pentagram', [[0, 1, 2, 3, 4].map((k) => snapped(15_000 * Math.cos(Math.PI / 2 + (4 * Math.PI * k) / 5), 15_000 * Math.sin(Math.PI / 2 + (4 * Math.PI * k) / 5)))], 700, 0],
  ['two disjoint rings far apart, the rows between reading neither', [sq(0, 0, 5000, 5000), sq(0, 40_000, 5000, 45_000)], 800, 0],
];

describe('the strict reading: even–odd over the rings, on lattice points, a point on a ring outside (kernel-plan.md §1.12 G-2)', () => {
  it('with no jitter, keeps exactly the nominal points strictly inside — on-ring candidates, holes of either orientation, nested and self-crossing rings', () => {
    for (const [name, region, s] of FIXTURES) {
      const h = hexLattice(region, s, 0, streamFromKey(key(9)));
      const rowH = 1.7320508075688772 * s * 0.5;
      const ys = region.flat().map((p) => p.y);
      const xs = region.flat().map((p) => p.x);
      const want = new Set<string>();
      let onRing = 0;
      for (let j = Math.floor(Math.min(...ys) / rowH) - 2; j <= Math.ceil(Math.max(...ys) / rowH) + 2; j += 1) {
        for (let i = Math.floor(Math.min(...xs) / s) - 2; i <= Math.ceil(Math.max(...xs) / s) + 2; i += 1) {
          const q = snapped(i * s + ((j & 1) === 1 ? s * 0.5 : 0), j * rowH);
          if (strictlyInsideRegion(region, q)) want.add(`${q.x},${q.y}`);
          else if (region.some((r) => r.some((a, k) => segmentsMeet(a, r[(k + 1) % r.length], q, q)))) onRing += 1;
        }
      }
      expect(new Set(h.points.map((p) => `${p.x},${p.y}`)), name).toEqual(want);
      expect(h.points.length, name).toBe(want.size);
      if (name.startsWith('a square') || name.startsWith('a rectangle')) expect(onRing, `${name}: candidates on the ring`).toBeGreaterThan(0);
    }
  }, TIMEOUT);

  it('the readings the fixtures separate: a same-orientation hole and the middle of three nested squares and a pentagram\'s doubly wound core are outside', () => {
    const at = (name: string, x: number, y: number): boolean => {
      const f = FIXTURES.find(([n]) => n === name);
      if (f === undefined) throw new Error(name);
      const h = hexLattice(f[1], f[2], 0, streamFromKey(key(9)));
      return h.points.some((p) => Math.abs(p.x - x) <= f[2] && Math.abs(p.y - y) <= f[2]);
    };
    expect(at('a hole of the same orientation', 10_000, 10_000)).toBe(false);
    expect(at('a hole of the same orientation', 2000, 2000)).toBe(true);
    expect(at('three nested squares', 7000, 15_000)).toBe(false);
    expect(at('three nested squares', 15_000, 15_000)).toBe(true);
    expect(at('a pentagram', 0, 0)).toBe(false);
    expect(at('a pentagram', 0, 12_000)).toBe(true);
  });

  // Each digest is the lattice the case gave before the reading moved to num/exact.ts's strictlyInsideRings (the
  // pre-round tree, build/M0-a-10-consolidate-1's before-image): the outputs are pinned, not only their properties.
  const PINNED_FIXTURES: readonly string[] = [
    '39:85ddd855c3810', '41:14c80b16553bbd', '371:5d2d8ead7c130', '404:176e1624047a93', '323:1f8ade52078fa6',
    '344:1c86af1cbeeffc', '323:1f8ade52078fa6', '344:1c86af1cbeeffc', '645:1ee1efb93dc694', '690:19b8994d7a43dd',
    '220:1a0e2eaf0cc7a0', '228:34a310f69ea2', '405:7c4ca7f3b9a46', '408:199cd1f8165229', '84:c7fdd6f8a1209',
    '94:6547a44af045a',
  ];
  const PINNED_SAMPLE: readonly string[] = [
    '41:3c16993c748dc', '23:1dae0e61d5cedb', '63:d4dec62f0a305', '230:8e335cc74d490', '180:37b5d7c0cb2df',
    '39:b88438e9b095a', '33:12ae8e4b67f010', '95:3725618b68069', '975:fc0cba64c725c', '254:1997e9bc2345b3',
    '13:d9661f4f2bdf7', '4:179339648eed44', '21:1868bfa7a4c9d9', '1230:efa06ddeb7d40', '59:14f28462b99a67',
    '368:5bbe5d9d912f9', '52:19315152da3a90', '171:14fea713ba9c80', '110:b23ca15c66c82', '2:de7f7a8a512c4',
    '33:1f23f938cd095c', '22:1c1a7d8d8b6011', '14:24f6eb8f33301', '34:1d70987ada72f3', '444:12b684da5de115',
    '128:c45213a3f0846', '74:1fac832fcd8fc4', '42:6ee6af4024d0e', '22:3d1d055e7c4c9', '51:180179f56be38f',
    '36:b342c446093c', '212:5b64029311372', '29:ea9e2d69171f0', '36:5c816ccd20dba', '26:1b082add604de1',
    '25:154f681963a8cc', '37:3655cce6ecac7', '114:1f4ec1f328f005', '200:119a0ad6d02971', '36:1372d4f687b75d',
    '82:56228a4891248', '3:7c3ea2d150347', '501:bd77a3e417282', '66:19bcedbeeb0a11', '131:914fff88db60c',
    '47:a88ee2db9a223', '64:1320a10558d343', '45:1fb3535be29aec',
  ];

  it('the fixtures\' lattices, at jitter 0 and at a drawn jitter, are pinned (points and adjacency)', () => {
    const got: string[] = [];
    for (const [, region, s] of FIXTURES) {
      got.push(digest(hexLattice(region, s, 0, streamFromKey(key(11)))));
      got.push(digest(hexLattice(region, s, 0.37 * s, streamFromKey(key(11)))));
    }
    expect(got).toEqual(PINNED_FIXTURES);
  }, TIMEOUT);

  it('a seeded sample of regions — star-shaped rings, self-crossing rings, rings with holes — gives its pinned lattices', () => {
    const rnd = generator(0x6e2);
    const got: string[] = [];
    for (let c = 0; c < 48; c += 1) {
      const kind = c % 3;
      const cx = intIn(rnd, -40_000, 40_000);
      const cy = intIn(rnd, -40_000, 40_000);
      const outer = kind === 1
        ? Array.from({ length: intIn(rnd, 3, 9) }, () => pt(cx + intIn(rnd, -15_000, 15_000), cy + intIn(rnd, -15_000, 15_000)))
        : starShaped(rnd, intIn(rnd, 3, 14), 2000, 15_000, cx, cy);
      const region = kind === 2 ? [outer, starShaped(rnd, intIn(rnd, 3, 8), 300, 1800, cx, cy)] : [outer];
      const s = intIn(rnd, 300, 2500);
      const jitter = rnd() < 0.25 ? 0 : rnd() * 0.4999 * s;
      got.push(digest(hexLattice(region, s, jitter, streamFromKey(key(c)))));
    }
    expect(got).toEqual(PINNED_SAMPLE);
  }, TIMEOUT);
});
