// Test support for M0-d-08's harness: the kernel fixtures the bars run over, each as a DeterminismSequence —
// M0-a-06's batch fixtures (packages/kernel/test/tx/fixtures/sequences.json, read here: the file's `$comment` names this
// harness as its reader), crowded declared batches as M0-a-06's order test builds them, declared batches of M0-a-07's
// partitioners, claim, hole and sliver fixtures, batches whose commit record lists several items of a kind, and the
// constructive arenas of M0-k-02's set in both op forms (C-0199; hardening round S1, N-2, N-3, N-6, N-7).
import { readFileSync } from 'node:fs';
import {
  insertChain,
  opAbsorbSliver,
  opClaimSubFace,
  opConnectHole,
  opInsertChain,
  opMergeFaces,
  opPinVertices,
  opRadialSplit,
  opRingBand,
  opSplitFace,
  pointLocate,
  removeEdges,
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

/** A 4000 cm frame cut in two by an L1 way at y = 2000 (M0-a-07's `halves()`, kernel/test/faces/support.ts). */
function halves(): DeterminismBatch {
  return cb('L1 way:1 across', 1, (o) => insertChain(o, [lp(0, 2000), lp(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
}

const DB = [{ role: 'district_bound', entity: 'd:1' }];

/**
 * M0-a-07's inline declared fixture (kernel/test/faces/claim.test.ts, "a declared batch of a split and a pin commits"):
 * the halves, a second way carrying a junction knot, then one declared batch pinning the junction and splitting the
 * lower-left face (hardening round S1, N-6).
 */
export function claimSequence(): DeterminismSequence {
  return {
    name: 'M0-a-07 claim.test: declared pinVertices + splitFace',
    arena: () => framedArena(0, 0, 4000, 4000),
    batches: [
      halves(),
      cb('L1 way:2 with a junction knot', 1, (o) =>
        insertChain(o, [lp(0, 1000), lp(2000, 1000), lp(4000, 1000)], [{ role: 'way', entity: 'way:2' }], 'mandatory', { knots: [{ index: 1, role: 'junction', ordinal: 0 }] }),
      ),
      {
        name: 'declared L1 pinVertices + splitFace',
        build: (p) => ({
          spec: fixtureSpec(1, {
            ops: [opPinVertices([2, 0], 0, [{ role: 'junction', entity: 'way:2' }]), opSplitFace([1, 0], 0, faceOn(p, 1, 100, 100), [lp(1000, 0), lp(1000, 1000)], { rows: DB })],
          }),
        }),
      },
    ],
  };
}

/** M0-a-07's connectHole (kernel/test/faces/hole.test.ts's first fixture) beside a split, as one declared batch (N-6). */
export function holeSequence(): DeterminismSequence {
  return {
    name: 'M0-a-07 hole.test: declared connectHole + splitFace',
    arena: () => framedArena(0, 0, 4000, 4000),
    batches: [
      halves(),
      cb('L1 two holes in the lower half', 1, (o) => {
        const a = insertChain(o, [lp(1500, 500), lp(2000, 500), lp(2000, 1000), lp(1500, 1000)], [{ role: 'district_bound', entity: 'hole:1' }], 'mandatory', { closed: true });
        if (!a.ok) return a;
        return insertChain(o, [lp(2500, 500), lp(3000, 500), lp(3000, 1000), lp(2500, 1000)], [{ role: 'district_bound', entity: 'hole:2' }], 'mandatory', { closed: true });
      }),
      {
        name: 'declared L1 connectHole + splitFace',
        build: (p) => ({
          spec: fixtureSpec(1, {
            ops: [opConnectHole([31, 0], 0, faceOn(p, 1, 500, 500), [lp(1000, 0), lp(1500, 500)], { rows: DB }), opSplitFace([32, 0], 0, faceOn(p, 1, 1000, 3000), [lp(1000, 2000), lp(1000, 4000)], { rows: DB })],
          }),
        }),
      },
    ],
  };
}

/**
 * absorbSliver on a 60 cm strip between two L1 partition lines whose two neighbours share equal lengths with it (4000 cm
 * each): its merge partner is decided by the tie-break (§3.3: the canonical face key, never a slot) — declared beside a
 * split of a third face (N-6; N-3's equal-length merge, K08).
 */
export function sliverSequence(): DeterminismSequence {
  return {
    name: 'M0-a-07 absorbSliver: an equal-length tie, declared with splitFace',
    arena: () => framedArena(0, 0, 4000, 4000),
    batches: [
      cb('L1 three partition lines, the lower two 60 cm apart', 1, (o) => {
        for (const [y, e] of [[2000, 'd:a'], [2060, 'd:b'], [3000, 'd:c']] as const) {
          const r = insertChain(o, [lp(0, y), lp(4000, y)], [{ role: 'district_bound', entity: e }], 'mandatory');
          if (!r.ok) return r;
        }
        return { ok: true, value: null, warnings: [] };
      }),
      {
        // The split cuts the top face, so the strip's two neighbours (below y = 2000, between 2060 and 3000) keep their
        // equal 4000 cm boundaries with it whichever op applies first.
        name: 'declared L1 absorbSliver + splitFace',
        build: (p) => ({
          spec: fixtureSpec(1, {
            ops: [opAbsorbSliver([41, 0], 0, faceOn(p, 1, 2000, 2030), { minWidthCm: 100, minAreaCm2: 1 }), opSplitFace([42, 0], 0, faceOn(p, 1, 2000, 3500), [lp(2000, 3000), lp(2000, 4000)], { rows: DB })],
          }),
        }),
      },
    ],
  };
}

/** Every M0-a-07 declared fixture the permutation bar runs: the partitioners, the claim, the hole and the sliver. */
export function a07Sequences(): DeterminismSequence[] {
  return [partitionerSequence(), claimSequence(), holeSequence(), sliverSequence()];
}

/**
 * Batches whose commit record lists two or more items of one kind (hardening round S1, N-2 and N-3): the record's
 * orders are canonical (§3.3; C-0185 (17)), and a list kept in slot order would read differently on a renumbered arena.
 * Each sequence's last batch is the one; its record's list is asserted by the test that uses it.
 */
export function recordOrderSequences(): { name: string; seq: DeterminismSequence; list: 'promoted' | 'demoted.edges' | 'roles' }[] {
  return [
    {
      // An L1 way, two L3 plot lines ending on it, then two L2 chains each ending 10 cm from a plot line's end in one
      // batch: both L3 vertices promoted (§3.6 candidate (b), as promote.test's neighbour step).
      name: 'two promotions in one batch',
      list: 'promoted',
      seq: {
        name: 'record order: two promotions',
        arena: () => framedArena(0, 0, 4000, 4000),
        batches: [
          halves(),
          cb('L3 two plot lines ending on the way', 3, (o) => {
            const a = insertChain(o, [lp(1000, 3500), lp(1000, 2000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory');
            if (!a.ok) return a;
            return insertChain(o, [lp(3000, 3500), lp(3000, 2000)], [{ role: 'plot_line', entity: 'plot:2' }], 'mandatory');
          }),
          cb('L2 two chains promoting the plot lines\' ends', 2, (o) => {
            const a = insertChain(o, [lp(1010, 1000), lp(1010, 1990)], [{ role: 'corridor_split', entity: 'way:n1' }], 'mandatory');
            if (!a.ok) return a;
            return insertChain(o, [lp(3010, 1000), lp(3010, 1990)], [{ role: 'corridor_split', entity: 'way:n2' }], 'mandatory');
          }),
        ],
      },
    },
    {
      // An L0 lake and two L1 quays on its south and north sides; removing the shore demotes both sides' edges to L1
      // in one batch (§2.2 rule 3 (a), as removals.test's quay).
      name: 'two demoted edges in one batch',
      list: 'demoted.edges',
      seq: {
        name: 'record order: two demotions',
        arena: () => framedArena(0, 0, 4000, 4000),
        batches: [
          cb('L0 lake', 0, (o) => insertChain(o, [lp(1000, 1000), lp(3000, 1000), lp(3000, 3000), lp(1000, 3000)], [{ role: 'shore', entity: 'water:1' }], 'mandatory', { closed: true })),
          cb('L1 two quays', 1, (o) => {
            const a = insertChain(o, [lp(1000, 1000), lp(3000, 1000)], [{ role: 'way', entity: 'quay:1' }], 'mandatory');
            if (!a.ok) return a;
            return insertChain(o, [lp(3000, 3000), lp(1000, 3000)], [{ role: 'way', entity: 'quay:2' }], 'mandatory');
          }),
          cb('L0 the shore removed', 0, (o) => removeEdges(o, { role: 'shore', entity: 'water:1' })),
        ],
      },
    },
    {
      // A batch writing rows of several roles and entities whose issue order is not rule 7's (a plot line, then a kerb,
      // then a district line, then a second kerb, each crossing an earlier way that carries knots).
      name: 'a multi-role batch',
      list: 'roles',
      seq: {
        name: 'record order: several role keys',
        arena: () => framedArena(0, 0, 4000, 4000),
        batches: [
          cb('L1 way:k with three width knots', 1, (o) =>
            insertChain(o, [lp(0, 2000), lp(1000, 2000), lp(2000, 2000), lp(3000, 2000), lp(4000, 2000)], [{ role: 'way', entity: 'way:k' }], 'mandatory', {
              knots: [{ index: 1, role: 'width_knot', ordinal: 0 }, { index: 2, role: 'width_knot', ordinal: 1 }, { index: 3, role: 'width_knot', ordinal: 2 }],
            }),
          ),
          cb('L2 a plot line, a kerb and a district line, issued against rule 7', 2, (o) => {
            for (const [x, role, entity] of [[3500, 'plot_line', 'plot:z'], [2500, 'kerb', 'kerb:y'], [1500, 'district_bound', 'd:x'], [500, 'kerb', 'kerb:a']] as const) {
              const r = insertChain(o, [lp(x, 500), lp(x, 3500)], [{ role, entity }], 'mandatory');
              if (!r.ok) return r;
            }
            return { ok: true, value: null, warnings: [] };
          }),
          // Its removal strips the way's row and its three knot keys, met along the way's rows.
          cb('L1 way:k removed', 1, (o) => removeEdges(o, { role: 'way', entity: 'way:k' })),
        ],
      },
    },
  ];
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

/** Every M0 constructive case that yields a sequence, drawn at `seed` (the callback form, or the declared form, N-7). */
export function constructiveSequences(seed: number, form: 'callback' | 'declared' = 'callback'): DeterminismSequence[] {
  const out: DeterminismSequence[] = [];
  for (const c of casesAt('M0')) {
    const s = constructiveSequence(c, seed, { form });
    if (s !== null) out.push(s);
  }
  return out;
}
