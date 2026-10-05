// Test support for M0-d-08's harness: the kernel fixtures the bars run over, each as a DeterminismSequence —
// M0-a-06's batch fixtures (packages/kernel/test/tx/fixtures/sequences.json, read here: the file's `$comment` names this
// harness as its reader), crowded declared batches as M0-a-06's order test builds them, declared batches of M0-a-07's
// partitioners, and the constructive arenas of M0-k-02's set (C-0199).
import { readFileSync } from 'node:fs';
import {
  insertChain,
  opClaimSubFace,
  opInsertChain,
  opMergeFaces,
  opRadialSplit,
  opRingBand,
  opSplitFace,
  pointLocate,
  setOwner,
  type KernelResult,
  type Level,
  type Overlay,
  type Plat,
} from '@plat/kernel';
import {
  casesAt,
  constructiveSequence,
  determinismPoint as lp,
  fixtureSequence,
  fixtureSequences,
  fixtureSpec,
  FIXTURE_KEY,
  framedArena,
  type DeterminismBatch,
  type DeterminismSequence,
  type FixtureSequenceData,
} from '@plat/testkit';

/** M0-a-06's batch fixtures, as data (read from the kernel's test folder, inside plat/). */
export const SEQUENCE_DATA: readonly FixtureSequenceData[] = fixtureSequences(
  JSON.parse(readFileSync(new URL('../../../kernel/test/tx/fixtures/sequences.json', import.meta.url), 'utf8')) as unknown,
);

/** M0-a-06's batch fixtures as determinism sequences. */
export const KERNEL_SEQUENCES: readonly DeterminismSequence[] = SEQUENCE_DATA.map(fixtureSequence);

/** mulberry32, as M0-a-06's order test draws its crowded fixtures. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * `n` L1 chains in a 4000 cm frame whose ends crowd each other (each start 5 – 25 cm from an earlier chain's end,
 * inside attraction's 26 cm reach), as one declared batch — M0-a-06's order-test fixture, drawn here per seed.
 */
export function crowdedSequence(seed: number, n: number): DeterminismSequence {
  const r = rng(seed);
  const at = (): number => 300 + Math.floor(r() * 3400);
  const chains: { a: [number, number]; b: [number, number] }[] = [];
  for (let i = 0; i < n; i++) {
    let a: [number, number];
    if (i > 0 && r() < 0.8) {
      const prev = chains[Math.floor(r() * chains.length)].b;
      const ang = r() * 6.283;
      const d = 5 + r() * 20;
      a = [Math.round(prev[0] + d * Math.cos(ang)), Math.round(prev[1] + d * Math.sin(ang))];
    } else a = [at(), at()];
    chains.push({ a, b: [at(), at()] });
  }
  return {
    name: `crowded ends ${seed}×${n}`,
    arena: () => framedArena(0, 0, 4000, 4000),
    batches: [
      {
        name: 'declared L1 crowded chains',
        build: () => ({
          spec: fixtureSpec(1, {
            ops: chains.map((c, i) => opInsertChain([(0x9e3779b1 * (i + 1)) >>> 0, i], 0, [lp(c.a[0], c.a[1]), lp(c.b[0], c.b[1])], [{ role: 'way', entity: `way:${i}` }], 'mandatory')),
          }),
        }),
      },
    ],
  };
}

/** The face of `level` holding a lattice point, read on the arena a batch is built on. */
export function faceOn(p: Plat, level: Level, x: number, y: number): number {
  const loc = pointLocate(p, FIXTURE_KEY, level, lp(x, y));
  if (loc.on !== 'face' || loc.level !== level) throw new Error(`support: no L${level} face at ${x},${y}`);
  return loc.face;
}

function cb(name: string, level: Level, fn: (o: Overlay) => KernelResult<unknown>): DeterminismBatch {
  return { name, build: () => ({ spec: fixtureSpec(level), fn }) };
}

/** A 4000 cm frame cut by two L1 ways into four 2000 cm blocks, each owned. */
function quarters(): DeterminismBatch[] {
  return [
    cb('L1 ways', 1, (o) => {
      const a = insertChain(o, [lp(2000, 0), lp(2000, 4000)], [{ role: 'way', entity: 'way:v' }], 'mandatory');
      if (!a.ok) return a;
      return insertChain(o, [lp(0, 2000), lp(4000, 2000)], [{ role: 'way', entity: 'way:h' }], 'mandatory');
    }),
    cb('L1 owners', 1, (o) => {
      const at = (x: number, y: number): number => faceOn(o.plat, 1, x, y);
      for (const [x, y, w] of [[1000, 1000, 'sw'], [3000, 1000, 'se'], [1000, 3000, 'nw'], [3000, 3000, 'ne']] as const) {
        const r = setOwner(o, [at(x, y)], `block:${w}`);
        if (!r.ok) return r;
      }
      return { ok: true, value: null, warnings: [] };
    }),
  ];
}

/**
 * M0-a-07's partitioners as declared ops (§3.3 *Two op forms*): one batch splitting, fanning, banding and claiming
 * four blocks at once, then one merging the split block's halves back with a second split elsewhere.
 */
export function partitionerSequence(): DeterminismSequence {
  return {
    name: 'M0-a-07 partitioners, declared',
    arena: () => framedArena(0, 0, 4000, 4000),
    batches: [
      ...quarters(),
      {
        name: 'declared L1 splitFace + radialSplit + ringBand + claimSubFace',
        build: (p) => ({
          spec: fixtureSpec(1, {
            ops: [
              opSplitFace([11, 0], 0, faceOn(p, 1, 500, 500), [lp(1000, 0), lp(1000, 2000)]),
              opRadialSplit([12, 0], 0, faceOn(p, 1, 3000, 1000), lp(3000, 1000), [0, 9000, 18000, 27000]),
              opRingBand([13, 0], 0, faceOn(p, 1, 1000, 3000), 300),
              opClaimSubFace([14, 0], 0, { ring: [lp(2500, 2500), lp(3500, 2500), lp(3500, 3500), lp(2500, 3500)] }, 'claim:1'),
            ],
          }),
        }),
      },
      {
        name: 'declared L1 mergeFaces + splitFace',
        build: (p) => ({
          spec: fixtureSpec(1, {
            ops: [
              opMergeFaces([21, 0], 0, faceOn(p, 1, 500, 1000), faceOn(p, 1, 1500, 1000)),
              opSplitFace([22, 0], 0, faceOn(p, 1, 2200, 3800), [lp(2000, 3700), lp(2400, 4000)]),
            ],
          }),
        }),
      },
    ],
  };
}

/** The crowded fixtures the bars run over (six, as M0-a-06's order test). */
export const CROWDED: readonly DeterminismSequence[] = [
  crowdedSequence(1, 6),
  crowdedSequence(2, 8),
  crowdedSequence(3, 10),
  crowdedSequence(4, 12),
  crowdedSequence(5, 14),
  crowdedSequence(6, 16),
];

/** Every M0 constructive case that yields a sequence, drawn at `seed`. */
export function constructiveSequences(seed: number): DeterminismSequence[] {
  const out: DeterminismSequence[] = [];
  for (const c of casesAt('M0')) {
    const s = constructiveSequence(c, seed);
    if (s !== null) out.push(s);
  }
  return out;
}
