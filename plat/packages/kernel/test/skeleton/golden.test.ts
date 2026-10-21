// M0-a-11: §3.8 *Decision* — "Nothing of the skeleton is stored, so a load, an undo or redo and a regeneration derive it
// again from the same inputs, identically on every host; a skeleton code change that moves any output is a declared
// shift (§6.4)". The whole `skeleton(rings, 'roof')` result of eight faces is pinned by its SHA-256 (numbers as JSON
// writes them, which round-trips every double, and −0 marked): a code change that moves a node by one ulp, reorders a
// node, an arc or a face, or changes the event count turns this red, and is then a declared shift with its choices row.
// The faces are lattice rings written out here, so no generator stands between a pin and its input: two footprints of
// the skeleton corpus (`bench/fixtures/skeleton-corpus/`, faces 556 and 1236) and four of §13.1's holed rectilinear
// polygons at seed 1 (faces 137, 189, 261 and 331; a 50 cm grid, so simultaneous events by construction) — faces whose
// output depends on the angular order in which the edges meeting at a node are read, counter-clockwise from +x by the
// direction half-plane (`halfPlaneOf`, C-0314). The hardening round S3 added two (its declared shift, census D-02): corpus
// footprints 1144 and 1840, a downgrade before the round, now the tolerant second reading's validated skeleton — the
// six earlier digests unchanged, since a face the strict reading validates never reaches the second one. The hardening
// round S4 pins the tolerant reading's water class by one whole face on every reader: relief-60 seed 3's water face
// (`relief-60-3-water.json`, 1 599 vertices; a downgrade `validator: faces` before S3), whose validated graph needs the
// reading's 1 cm join as §3.8 states it — joined vertices within 1 cm of the event's point, never an end of an edge the
// event splits — so a join radius or a join rule moved turns it red (the closing check S3's survivors T3 and T13).
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { runSkeleton } from '../../src/skeleton/skeleton.js';
import { skeleton, validateSkeleton, type SkeletonUse } from '../../src/skeleton/index.js';
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
    name: 'corpus 1144',
    rings: [[68822, -389780, 67915, -389937, 68098, -391001, 67182, -391159, 67316, -391937, 68232, -391779, 68382, -392647, 69288, -392491, 69139, -391623, 70617, -391369, 70483, -390590, 69005, -390845]],
    digest: 'a7c4044236e1e203',
  },
  {
    name: 'corpus 1840',
    rings: [[-294018, 11106, -293277, 10993, -293224, 11338, -292028, 11155, -291940, 11728, -293136, 11912, -292984, 12900, -293725, 13014, -293877, 12026, -294994, 12197, -295082, 11624, -293965, 11452]],
    digest: '48327635fc860a42',
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

/** relief-60 seed 3's water face: the L0 face the river owns at CITY, default config, written out from `bench/src/site`. */
const WATER: { name: string; rings: number[][] } = JSON.parse(readFileSync(new URL('./relief-60-3-water.json', import.meta.url), 'utf8'));

/** The whole result's digest per reader (the same JSON and SHA-256 as above). */
const WATER_DIGESTS: Record<SkeletonUse, string> = { roof: '5a9d3bb6690c0709', spine: '4f9f6abc3bf42fd0', regions: '5bb448fc1a8603c7' };

describe('§3.8 *Decision*: the tolerant reading’s water class pinned by a whole face on every reader (hardening round S4)', () => {
  it.each((['roof', 'spine', 'regions'] as const).map((u) => [u] as const))('relief-60 seed 3’s water face, %s: only the tolerant reading finishes, and its validated skeleton is byte for byte', (use) => {
    const rings = ringsOf(WATER.rings);
    expect(rings.map((r) => r.length)).toEqual([1_599]);
    let finished = 0;
    const r = runSkeleton(rings, use, {}, { finished: () => void (finished += 1) });
    // the strict reading stops at a node whose order does not alternate (it never reaches the end); the tolerant one does
    expect(finished).toBe(1);
    if (!r.ok || r.value.kind !== 'skeleton') throw new Error(`expected a skeleton, got ${JSON.stringify(r).slice(0, 300)}`);
    expect(validateSkeleton(r.value).ok).toBe(true);
    expect([r.value.nodes.length, r.value.arcs.length, r.value.events]).toEqual([2_745, 2_744, 1_698]);
    expect(r.warnings).toEqual([]);
    expect(digestOf(r)).toBe(WATER_DIGESTS[use]);
    // the public call takes the same path
    expect(digestOf(skeleton(rings, use))).toBe(WATER_DIGESTS[use]);
  });
});
