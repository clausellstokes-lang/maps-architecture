// M0-a-11: §3.8 *Decision* — "Nothing of the skeleton is stored, so a load, an undo or redo and a regeneration derive it
// again from the same inputs, identically on every host; a skeleton code change that moves any output is a declared
// shift (§6.4)". The whole `skeleton(rings, 'roof')` result of six faces is pinned by its SHA-256 (numbers as JSON
// writes them, which round-trips every double, and −0 marked): a code change that moves a node by one ulp, reorders a
// node, an arc or a face, or changes the event count turns this red, and is then a declared shift with its choices row.
// The faces are lattice rings written out here, so no generator stands between a pin and its input: two footprints of
// the skeleton corpus (`bench/fixtures/skeleton-corpus/`, faces 556 and 1236) and four of §13.1's holed rectilinear
// polygons at seed 1 (faces 137, 189, 261 and 331; a 50 cm grid, so simultaneous events by construction) — faces whose
// output depends on the angular order in which the edges meeting at a node are read, counter-clockwise from +x by the
// direction half-plane (`halfPlaneOf`, C-0314).
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { skeleton } from '../../src/skeleton/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { pt } from './support.js';

interface Pinned {
  name: string;
  /** Each ring as x0, y0, x1, y1, … (world lattice centimetres), the outer ring first. */
  rings: number[][];
  /** The first 16 hex digits of the SHA-256 of the result's JSON. */
  digest: string;
}

const PINNED: Pinned[] = [
  {
    name: 'corpus 556',
    rings: [
      [186023, -286571, 185748, -286371, 185548, -286646, 184998, -286246, 184598, -286796, 184873, -286996, 185073, -286721, 185348, -286921, 185148, -287196, 185423, -287396],
    ],
    digest: '9e7614a1162a2a1e',
  },
  {
    name: 'corpus 1236',
    rings: [
      [84976, 384401, 84966, 383761, 85286, 383756, 85291, 384076, 86251, 384061, 86236, 383101, 86556, 383096, 86571, 384056, 86891, 384051, 86896, 384371],
    ],
    digest: 'ec1f211fb44bc179',
  },
  {
    name: 'holed 1.189',
    rings: [
      [6700, -950, 9200, -950, 9200, 500, 6700, 500],
      [8650, -550, 9150, -550, 9150, -300, 8650, -300],
      [8350, -250, 9150, -250, 9150, 100, 8350, 100],
    ],
    digest: '0bc43619e0005893',
  },
  {
    name: 'holed 1.331',
    rings: [
      [-8000, 4950, -6600, 4950, -6600, 6350, -8000, 6350],
      [-7100, 5500, -6700, 5500, -6700, 5600, -7100, 5600],
      [-6950, 6050, -6700, 6050, -6700, 6150, -6950, 6150],
      [-7550, 5050, -7150, 5050, -7150, 5450, -7550, 5450],
      [-7000, 5700, -6700, 5700, -6700, 5800, -7000, 5800],
    ],
    digest: 'dec0f4ed3be62276',
  },
  {
    name: 'holed 1.137',
    rings: [
      [-450, 8250, 1150, 8250, 1150, 11700, -450, 11700],
      [750, 9750, 950, 9750, 950, 10350, 750, 10350],
      [200, 9750, 600, 9750, 600, 10200, 200, 10200],
      [-300, 8350, 200, 8350, 200, 9100, -300, 9100],
    ],
    digest: 'f75e8d4636027d97',
  },
  {
    name: 'holed 1.261',
    rings: [
      [5850, 1350, 7900, 1350, 7900, 2650, 5850, 2650],
      [7350, 2250, 7750, 2250, 7750, 2400, 7350, 2400],
      [7150, 1600, 7800, 1600, 7800, 2000, 7150, 2000],
      [5900, 1400, 6450, 1400, 6450, 1750, 5900, 1750],
      [6850, 2200, 7150, 2200, 7150, 2600, 6850, 2600],
    ],
    digest: 'ec1ac2101fc0914f',
  },
];

function ringsOf(flat: readonly number[][]): LatticePoint[][] {
  return flat.map((r) => {
    const ring: LatticePoint[] = [];
    for (let k = 0; k < r.length; k += 2) ring.push(pt(r[k], r[k + 1]));
    return ring;
  });
}

/** The result's JSON with −0 marked (JSON writes −0 as 0) and its SHA-256's first 16 hex digits. */
function digestOf(v: unknown): string {
  const text = JSON.stringify(v, (_k, x: unknown) => (typeof x === 'number' && Object.is(x, -0) ? '-0' : x));
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

describe('§3.8 *Decision*: a skeleton code change that moves any output is a declared shift — whole results pinned by digest', () => {
  it.each(PINNED.map((c) => [c.name, c] as const))('%s: the validated skeleton, byte for byte', (_name, c) => {
    const r = skeleton(ringsOf(c.rings), 'roof');
    expect(r.ok && r.value.kind).toBe('skeleton');
    expect(digestOf(r)).toBe(c.digest);
  });
});
