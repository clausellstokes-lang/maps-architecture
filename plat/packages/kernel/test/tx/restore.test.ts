// M0-a-06, session fix round S1 (N-47, C-0219): remove(insert(x)) restores the arena — the face records included. A
// finer chain's insertion materialises its own children at the levels between its parent record and its own (§2.2 rule
// 2, insertChain's re-walk, C-0177 (9)); a later removeEdges must free each record its level no longer needs, up to L1
// (rule 2: "until then the parent face is its own child"; C-0185 (3)'s keep rule), list it among the batch's removed
// records and tombstone its index item. Level digests keep own children out (C-0194), so equality is judged on the
// slot-free content print, the live records per level and the encoded chunks (`encodeArena` writes every live record),
// with the level digests beside them. Fix round S2 (checks/M0-a-06-s1.md B-1, B-2; C-0223): a chain crossing one run
// twice dissolves both crossings whatever the order (the on-run test decided before the batch), split restoration alike,
// and a coarser batch's record lists the own-child ancestors it frees in key order. Fix round S3
// (checks/M0-a-06-s2.md B-1, C-0225): a chain crossing one EDGE three or more times — a middle crossing judged against
// every piece of the stretch it could have split, so cases 817 and 1526 restore; the zigzag property draws that class and
// the targeted property screens candidates for its rare cases. Session round S4 (N-55 (1), C-0287): a chain sharing a
// stretch of a run AT THE RUN'S OWN LEVEL (same-level W_STRETCH_SHARED) and then removed restores the run — rule 3 (b)'s
// "identical rows before the batch" read with the batch's stripped rows left out; cases 1630 and 2337 pinned, the
// quay-on-shore inverse control beside them, and the three properties no longer count a shared-stretch end.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { faceKey, isFaceLive, isVertexLive, outgoing, roleIdOf, rowsOn, VERTEX_PINNED, VERTEX_SPLIT, VERTEX_STEINER, type FaceId, type Plat } from '../../src/arena/index.js';
import { recomputeLevelDigest } from '../../src/digest/index.js';
import { insertChain } from '../../src/insert/index.js';
import { encodeArena } from '../../src/io/index.js';
import { removeEdges, tx, type CommitRecord } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { rng } from './fuzzgen.js';
import { between, commit, contentPrint, degreeAt, edgeRows, framed, healthy, pt, spec, vertexAtPoint } from './support.js';

const LEVELS: readonly Level[] = [0, 1, 2, 3, 4];

/** Live face records per level. */
function facesPerLevel(p: Plat): number[] {
  return LEVELS.map((l) => {
    let n = 0;
    for (let f = 0; f < p.slots.face[l].top; f++) if (isFaceLive(p, l, f)) n++;
    return n;
  });
}

/** The encoded chunks' refs, in encoding order (the persisted form, §11). */
function chunkRefs(p: Plat): string {
  return JSON.stringify(encodeArena(p).map((c) => c.ref));
}

/** The level digests L0 – L4 (§3.9), as text. */
function digests(p: Plat): string {
  return JSON.stringify(LEVELS.map((l) => Array.from(recomputeLevelDigest(p, l) as ArrayLike<number>)));
}

/** The arena's slot-free print, its records per level, its encoded chunks and its level digests. */
function snapshot(p: Plat): { print: string; faces: number[]; refs: string; digests: string } {
  return { print: contentPrint(p), faces: facesPerLevel(p), refs: chunkRefs(p), digests: digests(p) };
}

const roleAt = (l: Level): string => (l <= 1 ? 'way' : l === 2 ? 'kerb' : 'plot_line');

/** N-13's first example: an L0 way across a framed 4000 square. */
function withWay(): Plat {
  const p = framed(4000);
  commit(p, 0, (o) => insertChain(o, [pt(1553, 1708), pt(2317, 1842)], [{ role: 'way', entity: 'way:b0' }], 'mandatory'));
  return p;
}

/**
 * Inserts `pts` at `level`, checks the own children it made, removes it in a later batch at `removeAt` (`between` reads
 * the arena between the two batches).
 */
function roundTrip(
  p: Plat,
  level: Level,
  pts: readonly { x: number; y: number }[],
  removeAt: Level = level,
  between?: (p: Plat) => void,
): { made: number[]; removal: CommitRecord } {
  const before = snapshot(p);
  const role = roleAt(level);
  commit(p, level, (o) => insertChain(o, pts.map(({ x, y }) => pt(x, y)), [{ role, entity: 'x:1' }], 'mandatory'));
  healthy(p);
  const made = facesPerLevel(p);
  between?.(p);
  // rederivesFrom 0: no stage's content is kept from the removing batch (§3.3 *Kept content*), whatever its level.
  const c = commit(p, removeAt, (o) => removeEdges(o, { role, entity: 'x:1' }), { rederivesFrom: 0 as never });
  healthy(p);
  const after = snapshot(p);
  expect(after.print).toBe(before.print);
  expect(after.faces).toEqual(before.faces);
  expect(after.refs).toBe(before.refs);
  expect(after.digests).toBe(before.digests);
  return { made, removal: c.record as CommitRecord };
}

describe('N-47: removeEdges frees the own children a finer insertion materialised (§2.2 rule 2, C-0185 (3))', () => {
  it('an L3 chain inside the framed square beside an L0 way: removed in a later L3 batch, the L1 and L2 records are freed', () => {
    const p = withWay();
    expect(facesPerLevel(p)).toEqual([1, 0, 0, 0, 0]);
    const { made } = roundTrip(p, 3, [{ x: 285, y: 882 }, { x: 1317, y: 314 }, { x: 2233, y: 691 }]);
    expect(made).toEqual([1, 1, 1, 1, 0]); // the insertion made one own child at L1 and at L2
  });

  it('the L2 variant: an L2 chain, removed, frees the L1 own child', () => {
    const p = withWay();
    const { made } = roundTrip(p, 2, [{ x: 285, y: 882 }, { x: 1317, y: 314 }, { x: 2233, y: 691 }]);
    expect(made).toEqual([1, 1, 1, 0, 0]);
  });

  it('the L4 variant: an L4 chain, removed, frees the L1 – L3 own children', () => {
    const p = withWay();
    const { made } = roundTrip(p, 4, [{ x: 285, y: 882 }, { x: 1317, y: 314 }, { x: 2233, y: 691 }]);
    expect(made).toEqual([1, 1, 1, 1, 1]);
  });

  it('a chain touching the frame (an L3 corner cut): removed, the arena is as before', () => {
    const p = withWay();
    const { made } = roundTrip(p, 3, [{ x: 0, y: 800 }, { x: 700, y: 650 }, { x: 900, y: 0 }]);
    expect(made).toEqual([1, 1, 1, 2, 0]); // the cut splits the L3 view in two
  });

  it('an own child that keeps another child survives: two L3 chains, one removed, the L1 / L2 records stay', () => {
    const p = withWay();
    commit(p, 3, (o) => insertChain(o, [pt(285, 882), pt(1317, 314), pt(2233, 691)], [{ role: 'plot_line', entity: 'keep:1' }], 'mandatory'));
    const kept = facesPerLevel(p);
    const before = snapshot(p);
    commit(p, 3, (o) => insertChain(o, [pt(800, 3000), pt(2600, 3400)], [{ role: 'plot_line', entity: 'x:1' }], 'mandatory'));
    commit(p, 3, (o) => removeEdges(o, { role: 'plot_line', entity: 'x:1' }));
    healthy(p);
    expect(facesPerLevel(p)).toEqual(kept);
    expect(snapshot(p)).toEqual(before);
  });

  it('the commit record lists each freed record: the L3 chain removed by an L1 batch — faces[L1].removed and faces[L2].removed of length 1', () => {
    // §3.3: the record's dirty set covers the levels at and below (finer than) the batch's, so an L1 batch shows the L1
    // and L2 records it freed; an L3 batch frees them alike (the test above) and its record lists levels 3 and 4 only.
    const p = withWay();
    const { removal } = roundTrip(p, 3, [{ x: 285, y: 882 }, { x: 1317, y: 314 }, { x: 2233, y: 691 }], 1);
    const at = (l: Level) => removal.faces.find((d) => d.level === l);
    expect(at(1)?.removed.length).toBe(1);
    expect(at(2)?.removed.length).toBe(1);
    expect(at(3)?.removed.length).toBe(1);
    expect(at(1)?.created.length).toBe(0);
    expect(at(2)?.created.length).toBe(0);
  });
});

// ---- fix round S2: B-1 (crossings of one run) and B-2 (the coarser batch's record) --------------------------------------

type Pts = readonly (readonly [number, number])[];

/** A framed arena with base chains (each at its level, entity `base:<i>`), every one committed. */
function based(bases: readonly { level: Level; pts: Pts; i: number }[]): Plat {
  const p = framed();
  for (const b of bases) commit(p, b.level, (o) => insertChain(o, b.pts.map(([x, y]) => pt(x, y)), [{ role: roleAt(b.level), entity: `base:${b.i}` }], 'mandatory'));
  healthy(p);
  return p;
}

const xy = (q: Pts): { x: number; y: number }[] => q.map(([x, y]) => ({ x, y }));

/**
 * checks/M0-a-06-s1.md B-1: a chain crossing one run twice (or three times) splits it at each crossing, each vertex placed
 * within the hot pixel of the PIECE it split. The dissolution runs in canonical (y, x) order; once the first crossing
 * merges, the next one's far end is the restored edge's, and measured there it may lie past the hot pixel (case 496:
 * 0.76 cm against 0.48 cm before the merge). The on-run test is decided before the batch (C-0223), so every crossing
 * dissolves; and a crossing that stands off its LATER neighbour's segment is judged on the stretch the dissolution
 * restores. The arenas are the closing check's repro and its generator's cases (probe-own.mts; the bases its generator
 * drew and the kernel refused are left out — a refused batch leaves the arena as it was), and the property's case 855.
 */
describe('B-1: remove(insert(x)) dissolves every crossing of one run, whatever the dissolution order (C-0185 (4), C-0223)', () => {
  const CASES: { name: string; bases: { level: Level; pts: Pts; i: number }[]; level: Level; pts: Pts; removeAt: Level }[] = [
    {
      name: 'the repro (own case 3946 at ×1 299 709): an L3 chain across an L3 plot line, removed by an L3 batch',
      bases: [{ level: 3, i: 0, pts: [[0, 3630], [1807, 2567], [4000, 1554]] }],
      level: 3,
      pts: [[4000, 3213], [2529, 2056], [1905, 2653], [2805, 1434]],
      removeAt: 3,
    },
    {
      name: 'own case 496 at ×40 503: three bases (L2, L3, L3), an L3 chain crossing base:2 twice, an L3 batch',
      bases: [
        { level: 2, i: 0, pts: [[0, 1586], [3211, 3157], [4000, 1216]] },
        { level: 3, i: 1, pts: [[3988, 0], [383, 1016], [2990, 4000]] },
        { level: 3, i: 2, pts: [[0, 1364], [1882, 2197], [4000, 1155]] },
      ],
      level: 3,
      pts: [[1784, 4000], [3183, 1074], [1969, 2512], [3412, 3577]],
      removeAt: 3,
    },
    {
      name: 'own case 2563 at ×40 503: two L2 kerbs, an L2 chain, removed by a coarser (L0) batch',
      bases: [
        { level: 2, i: 0, pts: [[655, 0], [1566, 2916], [1023, 4000]] },
        { level: 2, i: 1, pts: [[0, 726], [3623, 1260], [4000, 3833]] },
      ],
      level: 2,
      pts: [[943, 1807], [1898, 1108], [3776, 1527], [1073, 2493]],
      removeAt: 0,
    },
    {
      name: 'own case 2619 at ×1 299 709: an L3 plot line, an L3 chain, removed by a coarser (L0) batch',
      bases: [{ level: 3, i: 0, pts: [[3527, 0], [1310, 712], [649, 4000]] }],
      level: 3,
      pts: [[3143, 829], [1790, 912], [180, 2861], [1750, 1419]],
      removeAt: 0,
    },
    {
      // The other side of the same class: (2311,2576) split the kerb's edge first, (2053,3044) then split the piece
      // (1524,4000)–(2311,2576); measured before the batch against that later neighbour, the first stands off the run, so
      // it is judged on the stretch the dissolution restores, (1524,4000)–(3583,278) (onStretch).
      name: 'the widened property\'s case 855: an L2 chain crossing an L2 kerb twice, the earlier crossing off its later neighbour\'s segment',
      bases: [{ level: 2, i: 0, pts: [[2363, 0], [3583, 278], [1524, 4000]] }],
      level: 2,
      pts: [[1008, 1861], [3196, 3062], [277, 3015], [983, 332]],
      removeAt: 2,
    },
    {
      // checks/M0-a-06-s2.md B-1 (probe-double.mts, seeds c × 104 729 + 31 337): the chain crosses the kerb's edge
      // (0,3687)–(2834,2004) four times, inserted in the order (1022,3080), (1489,2803), (2108,2436), (2751,2053).
      // (2108,2436) split the piece (1489,2803)–(2834,2004) and lies 0.62 cm from it, but 0.75 cm from its pre-batch
      // neighbours' segment and 0.74 cm from the restored edge: on-run only against that piece (onStretch, C-0225).
      name: 'the S2 check\'s case 817: an L2 chain crossing one L2 kerb edge four times, removed by an L2 batch',
      bases: [{ level: 2, i: 0, pts: [[0, 3687], [2834, 2004], [4000, 443]] }],
      level: 2,
      pts: [[553, 3657], [1299, 2739], [1845, 2922], [2605, 1514], [2761, 2090]],
      removeAt: 2,
    },
    {
      // The same class at L3 (seeds c × 15 485 863 + 31 337): (1816,2154) is 0.64 cm from the piece it split,
      // (1375,2475)–(2692,1514), 0.79 cm from its neighbours' segment and 0.73 cm from the restored edge.
      name: 'the S2 check\'s case 1526: an L3 chain crossing one L3 plot line edge four times, removed by an L3 batch',
      bases: [{ level: 3, i: 0, pts: [[0, 3478], [2692, 1514], [4000, 531]] }],
      level: 3,
      pts: [[1244, 2928], [1599, 1703], [1957, 2448], [2762, 740], [3409, 1160]],
      removeAt: 3,
    },
  ];
  for (const k of CASES) {
    it(`${k.name}: the content print, records, chunk refs and level digests as before the insert`, () => {
      const p = based(k.bases);
      roundTrip(p, k.level, xy(k.pts), k.removeAt);
    });
  }

  it('the same double crossing at L1 and L2: restored at every level', () => {
    for (const l of [1, 2] as Level[]) {
      const p = based([{ level: l, i: 0, pts: [[0, 3630], [1807, 2567], [4000, 1554]] }]);
      roundTrip(p, l, xy([[4000, 3213], [2529, 2056], [1905, 2653], [2805, 1434]]));
    }
  });

  it('split restoration after an earlier dissolution on the run: the last crossing, still meeting a finer chain, becomes its Steiner vertex', () => {
    // The L2 chain crosses the L2 kerb at (2671,2168), (2170,2399) and (2052,2453); an L4 stub ends on the last. Removing
    // the chain dissolves the first two; the third keeps the stub, so split restoration makes it an L4 Steiner vertex of
    // the restored kerb — decided on the run before the batch, not on the far ends the dissolutions moved.
    const p = based([{ level: 2, i: 0, pts: [[0, 3630], [1807, 2567], [4000, 1554]] }]);
    const kerb = digests(p);
    commit(p, 2, (o) => insertChain(o, [pt(4000, 3213), pt(2529, 2056), pt(1905, 2653), pt(2805, 1434)], [{ role: 'kerb', entity: 'x:1' }], 'mandatory'));
    const v = vertexAtPoint(p, 2052, 2453);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    expect(p.vertices.level[v]).toBe(2);
    commit(p, 4, (o) => insertChain(o, [pt(2052, 2453), pt(2002, 2344)], [{ role: 'plot_line', entity: 'y:1' }], 'mandatory'));
    commit(p, 2, (o) => removeEdges(o, { role: 'kerb', entity: 'x:1' }), { rederivesFrom: 0 as never });
    healthy(p);
    expect(vertexAtPoint(p, 2052, 2453)).toBe(v);
    expect(degreeAt(p, 2052, 2453)).toBe(3);
    expect(p.vertices.level[v]).toBe(4);
    expect(p.vertices.flags[v] & (VERTEX_SPLIT | VERTEX_STEINER)).toBe(VERTEX_SPLIT | VERTEX_STEINER);
    expect(vertexAtPoint(p, 2170, 2399)).toBe(-1);
    expect(vertexAtPoint(p, 2671, 2168)).toBe(-1);
    // The kerb's route at L0 – L2 is the one before the chain (the stub and its Steiner vertex are L4 content).
    const now = JSON.parse(digests(p)) as unknown[];
    const was = JSON.parse(kerb) as unknown[];
    expect(now.slice(0, 3)).toEqual(was.slice(0, 3));
  });
});

/** The lattice points of a record's canonical key (§3.3's face key), as a sortable pair. */
function keyPoints(p: Plat, level: Level, f: FaceId): [number, number, number, number] {
  const k = faceKey(p, level, f);
  return [p.vertices.y[k[0]], p.vertices.x[k[0]], p.vertices.y[k[1]], p.vertices.x[k[1]]];
}

/**
 * checks/M0-a-06-s1.md B-2: a batch coarser than the chain frees own-child ancestors beside other records at levels its
 * record covers. C-0219 (1) lists each freed ancestor among `faces[l].removed` with the key it had; the record orders
 * them by those keys, which no slot can stand for. Own case 52 at ×40 503: an L0 way and an L1 way, an L4 chain, removed
 * by an L0 batch, frees two records at L2 and two at L3.
 */
describe('B-2: a coarser batch\'s record lists the own-child ancestors it frees, in key order (C-0219 (1))', () => {
  it('own case 52: the L4 chain removed by an L0 batch — faces[L2].removed and faces[L3].removed, two each, by key', () => {
    const p = based([
      { level: 0, i: 0, pts: [[1954, 3576], [3517, 2133], [3248, 217]] },
      { level: 1, i: 1, pts: [[1005, 0], [3238, 2216], [649, 4000]] },
    ]);
    const keys = new Map<string, [number, number, number, number]>();
    const { removal } = roundTrip(p, 4, xy([[583, 2808], [3144, 1247]]), 0, (q) => {
      for (const l of LEVELS) for (let f = 0; f < q.slots.face[l].top; f++) if (isFaceLive(q, l, f)) keys.set(`${l}:${f}`, keyPoints(q, l, f));
    });
    const cmp = (a: readonly number[], b: readonly number[]): number => {
      for (let i = 0; i < 4; i++) if (a[i] !== b[i]) return a[i] - b[i];
      return 0;
    };
    for (const l of [2, 3] as Level[]) {
      const d = removal.faces.find((x) => x.level === l);
      expect(d?.removed.length, `L${l} removed`).toBe(2);
      const removed = d?.removed ?? [];
      for (const f of removed) {
        expect(keys.has(`${l}:${f}`), `L${l} record ${f} was live before the removal`).toBe(true);
        expect(isFaceLive(p, l, f), `L${l} record ${f} is freed`).toBe(false);
      }
      const byKey = removed.slice().sort((a, b) => cmp(keys.get(`${l}:${a}`) ?? [], keys.get(`${l}:${b}`) ?? []));
      expect(removed, `L${l} removed in key order`).toEqual(byKey);
      expect(cmp(keys.get(`${l}:${removed[0]}`) ?? [], keys.get(`${l}:${removed[1]}`) ?? [])).not.toBe(0);
    }
  });
});

// ---- session round S4: the same-level shared stretch (N-55 (1)) ------------------------------------------------------

/**
 * N-55 (1), Q9 of docs/M0-FIX-QUEUE.md: a chain that shares a stretch of a run at the run's OWN level (same-level
 * W_STRETCH_SHARED) splits the run at the stretch's ends; at each end the run's two edges carried {R} and {R, X} before
 * the removing batch (X's row on the shared side only), so rule 3 (b) read on the raw pre-batch rows saw no run, cleared
 * the flag and left the end as an unflagged degree-2 vertex — chunks and level digests differing. Read with the batch's
 * stripped rows left out (C-0287), the run survives whole and the end dissolves. The cases are C-0219 (4)'s, from the
 * S1-round generator (bases the kernel refused are left out: a refused batch leaves the arena as it was).
 */
describe('N-55 (1): a chain sharing a run at the run\'s own level, removed, restores the run (rule 3 (b) without the stripped rows)', () => {
  const CASES: { name: string; bases: { level: Level; pts: Pts; i: number }[]; level: Level; pts: Pts; ends: Pts }[] = [
    {
      name: 'case 1630: an L0 chain sharing the L0 way base:0 from (271,330) to (523,1158), removed by an L0 batch',
      bases: [
        { level: 0, i: 0, pts: [[170, 0], [1082, 2992], [3594, 4000]] },
        { level: 0, i: 1, pts: [[898, 0], [958, 352], [106, 4000]] },
      ],
      level: 0,
      pts: [[218, 0], [1023, 3346]],
      ends: [[271, 330], [523, 1158]],
    },
    {
      name: 'case 2337: an L1 chain sharing the L1 way base:0 from (1076,1911) to (2942,2070), removed by an L1 batch',
      bases: [{ level: 1, i: 0, pts: [[0, 3277], [1076, 1911], [4000, 2160]] }],
      level: 1,
      pts: [[726, 3204], [327, 1904], [3580, 2078]],
      ends: [[2942, 2070]],
    },
  ];
  for (const k of CASES) {
    it(`${k.name}: the print, records per level, chunk refs and level digests as before the insert; nothing unflagged`, () => {
      const p = based(k.bases);
      const { removal } = roundTrip(p, k.level, xy(k.pts), k.level, (q) => {
        // Between the batches: the chain shares the run at its level, and each stretch end is a split vertex of degree 3.
        for (const [x, y] of k.ends) {
          const v = vertexAtPoint(q, x, y);
          expect(v, `the stretch end (${x},${y})`).toBeGreaterThanOrEqual(0);
          expect(q.vertices.flags[v] & VERTEX_SPLIT, `(${x},${y}) split`).toBe(VERTEX_SPLIT);
          expect(degreeAt(q, x, y), `(${x},${y}) degree`).toBe(3);
        }
      });
      expect(removal.unflagged).toEqual([]);
      for (const [x, y] of k.ends) expect(vertexAtPoint(p, x, y), `(${x},${y}) dissolved`).toBe(-1);
    });
  }

  it('the inverse control (§2.2 rule 3 (b)\'s quay): an L0 shore, an L1 way sharing a stretch and leaving; the SHORE removed — the leave point stays the way\'s shape vertex', () => {
    // With the shore's rows left out, the shore's two L0 edges at the leave point read as one run before the batch, but
    // the batch deletes one of them: the run does not survive, so the flag is cleared and the way keeps its corner. The
    // amended reading cannot straighten a surviving chain.
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'shore', entity: 'water:1' }], 'mandatory'));
    const way = commit(p, 1, (o) => insertChain(o, [pt(1000, 2000), pt(2500, 2000), pt(3000, 3500)], [{ role: 'way', entity: 'quay:1' }], 'mandatory'));
    healthy(p);
    expect((way.record?.warnings ?? []).some((w) => w.code === 'W_STRETCH_SHARED')).toBe(true);
    const v = vertexAtPoint(p, 2500, 2000);
    expect(v).toBeGreaterThanOrEqual(0);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    expect(degreeAt(p, 2500, 2000)).toBe(3);
    expect(edgeRows(p, [1000, 2000], [2500, 2000])).toEqual(['shore/water:1', 'way/quay:1']);
    const c = commit(p, 0, (o) => removeEdges(o, { role: 'shore', entity: 'water:1' }), { rederivesFrom: 0 as never });
    healthy(p);
    // The leave point survives as a degree-2 vertex whose two L1 edges carry identical rows: only its cleared flag keeps
    // the dissolution from straightening the way's corner.
    expect(vertexAtPoint(p, 2500, 2000)).toBe(v);
    expect(degreeAt(p, 2500, 2000)).toBe(2);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(0);
    expect(c.record?.unflagged).toContain(v);
    expect(edgeRows(p, [1000, 2000], [2500, 2000])).toEqual(['way/quay:1']);
    expect(edgeRows(p, [2500, 2000], [3000, 3500])).toEqual(['way/quay:1']);
    const h = between(p, [1000, 2000], [2500, 2000]);
    expect(p.halfEdges.level[h >> 1]).toBe(1); // demoted (rule 3 (a))
    expect(rowsOn(p, 'edge', h).map((r) => p.roles.kind[r])).toEqual([roleIdOf('way')]);
  });
});

// ---- the property ----------------------------------------------------------------------------------------------------

/** A ring of a face line, rotated to its least rotation (a ring through one vertex twice prints from either visit). */
function canonRing(s: string): string {
  const t = s.split(' ').filter((x) => x !== '');
  let best = '';
  for (let i = 0; i < t.length; i++) {
    const r = t.slice(i).concat(t.slice(0, i)).join(' ');
    if (i === 0 || r < best) best = r;
  }
  return best;
}

/**
 * The content print with each face line's rings at their least rotation. contentPrint starts a ring at its least point
 * from the stored half-edge; where the ring passes that point twice (a dangling tree) the start depends on which visit
 * the record stores, which the encoded form does not keep (the chunks are compared exactly beside this).
 */
function canonPrint(print: string): string {
  return print
    .split('\n')
    .map((line) => {
      const m = /^(f\d) (.*?) \| (.*) (k\S+ o\S+ s\S+) p\((.*)\)$/.exec(line);
      if (m === null) return line;
      const holes = m[3] === '' ? [] : m[3].split(' | ').map(canonRing).sort();
      return `${m[1]} ${canonRing(m[2])} | ${holes.join(' | ')} ${m[4]} p(${canonRing(m[5])})`;
    })
    .sort()
    .join('\n');
}

/**
 * Does the arena already hold a vertex the dissolution rule would remove the moment a batch touched it — `split`, no
 * vertex row, no pin, degree 2, its edges of one level with identical rows? insertChain leaves one where a chain folds
 * back over its own edge (its far point lands on it: the property's case 5317 at 20 000 cases); a later chain attached
 * there and then removed leaves it to the dissolution, so the arena ends one vertex SIMPLER than before the insert —
 * §2.2 rule 3 as worded (C-0223 (5)). Counted, not judged, until N-55 (5)'s M0-a-05 round s7 clears the flag (Q10).
 */
function holdsDissolvable(p: Plat): boolean {
  const T = p.halfEdges;
  const rows = (h: number): string => rowsOn(p, 'edge', h).map((r) => `${p.roles.kind[r]}/${p.roles.entity[r]}/${p.roles.ordinal[r]}/${p.roles.level[r]}`).join(' ');
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (!isVertexLive(p, v)) continue;
    const f = p.vertices.flags[v];
    if ((f & VERTEX_SPLIT) === 0 || (f & VERTEX_PINNED) !== 0 || rowsOn(p, 'vertex', v).length > 0) continue;
    const out = outgoing(p, v);
    if (out.length === 2 && T.level[out[0] >> 1] === T.level[out[1] >> 1] && rows(out[0]) === rows(out[1])) return true;
  }
  return false;
}

/** PLAT_FUZZ_RUNS (10⁴ in the PR tier, 10⁶ nightly; C-0057): a quarter of it in cases. */
const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
const CASES = Math.max(250, Math.floor(RUNS / 4));

describe(`N-47 property: ${CASES} random insertions at every level, each removed by a later batch, restore the arena`, () => {
  it('the content print (rings at their least rotation), the records per level, the encoded chunk refs and the level digests as before', () => {
    const tally = { inserted: 0, refusedInsert: 0, refusedRemove: 0, exact: 0, rotated: 0, sharedEnd: 0, foldedBase: 0, ownChildren: 0, coarserBatch: 0, threeSegments: 0 };
    const byLevel = LEVELS.map(() => 0);
    const baseLevels = LEVELS.map(() => 0);
    for (let c = 1; c <= CASES; c++) {
      const r = rng(c * 2_654_435_761);
      const at = (): number => Math.floor(r() * 4001);
      const inner = (): number => 200 + Math.floor(r() * 3601);
      const p = framed();
      // 0 – 3 chains first (L0 – L3: across the frame either way, or a 3-point interior chain), then the chain at a random
      // level (2 – 4 points: up to three segments, so one run can be crossed twice — B-1), then its removal: in a quarter
      // of the cases by a batch coarser than the chain (its record then covers the own-child levels it frees — B-2).
      const nb = Math.floor(r() * 4);
      for (let i = 0; i < nb; i++) {
        const l = Math.floor(r() * 4) as Level;
        const k = r();
        const pts = k < 0.35 ? [pt(0, at()), pt(inner(), inner()), pt(4000, at())] : k < 0.7 ? [pt(at(), 0), pt(inner(), inner()), pt(at(), 4000)] : [pt(inner(), inner()), pt(inner(), inner()), pt(inner(), inner())];
        const b = tx(p, spec(l, { rederivesFrom: 0 as never }), (o) => insertChain(o, pts, [{ role: roleAt(l), entity: `base:${i}` }], 'mandatory'));
        if (b.ok) baseLevels[l]++;
      }
      const lt = Math.floor(r() * 5) as Level;
      const n = 2 + Math.floor(r() * 3);
      const pts = Array.from({ length: n }, () => pt(inner(), inner()));
      if (r() < 0.3) pts[0] = r() < 0.5 ? pt(0, inner()) : pt(inner(), 0);
      const removeAt = (r() < 0.25 ? Math.floor(r() * (lt + 1)) : lt) as Level;
      const before = snapshot(p);
      const folded = holdsDissolvable(p);
      const a = tx(p, spec(lt, { rederivesFrom: 0 as never }), (o) => insertChain(o, pts, [{ role: roleAt(lt), entity: 'x:1' }], 'mandatory'));
      if (!a.ok) {
        tally.refusedInsert++;
        continue;
      }
      tally.inserted++;
      byLevel[lt]++;
      const mid = facesPerLevel(p);
      if (mid.some((k, l) => l > 0 && l < lt && k > before.faces[l])) tally.ownChildren++;
      if (n === 4) tally.threeSegments++;
      if (removeAt < lt) tally.coarserBatch++;
      const b = tx(p, spec(removeAt, { rederivesFrom: 0 as never }), (o) => removeEdges(o, { role: roleAt(lt), entity: 'x:1' }));
      if (!b.ok) {
        tally.refusedRemove++;
        continue;
      }
      healthy(p);
      const after = snapshot(p);
      // No record of any level is left behind (N-47) — in every case.
      expect(after.faces, `case ${c}: live records per level`).toEqual(before.faces);
      // The record accounts for every record it covers: each listed level's live count fell by removed − created.
      for (const d of (b.value.record as CommitRecord).faces) {
        expect(mid[d.level] - after.faces[d.level], `case ${c}: the record's L${d.level} removed − created`).toBe(d.removed.length - d.created.length);
      }
      const shared = (a.value.record?.warnings ?? []).some((w) => w.code === 'W_STRETCH_SHARED');
      // A shared stretch's end is judged like any other case since N-55 (1) (C-0287 supersedes C-0219 (4)'s count): the
      // tally only names the class of a failing case in the printed line.
      if (shared && after.refs !== before.refs) tally.sharedEnd++;
      if (folded && after.refs !== before.refs) {
        tally.foldedBase++;
        continue;
      }
      expect(after.refs, `case ${c}: encoded chunk refs`).toBe(before.refs);
      expect(after.digests, `case ${c}: level digests`).toBe(before.digests);
      if (after.print === before.print) tally.exact++;
      else {
        tally.rotated++;
        expect(canonPrint(after.print), `case ${c}: content print`).toBe(canonPrint(before.print));
      }
    }
    console.info(`N-47 property: ${JSON.stringify({ cases: CASES, ...tally, byLevel, baseLevels })}`);
    // Not vacuous: insertions at every level over bases at L0 – L3, own children made and freed, three-segment chains,
    // coarser removing batches, the removals all committed.
    for (const l of LEVELS) expect(byLevel[l], `insertions at L${l}`).toBeGreaterThan(0);
    for (const l of [0, 1, 2, 3]) expect(baseLevels[l], `bases at L${l}`).toBeGreaterThan(0);
    expect(tally.threeSegments).toBeGreaterThan(CASES / 20);
    expect(tally.coarserBatch).toBeGreaterThan(CASES / 20);
    expect(tally.ownChildren).toBeGreaterThan(CASES / 20);
    expect(tally.refusedRemove).toBe(0);
    expect(tally.exact).toBeGreaterThan(tally.inserted * 0.95);
    expect(tally.sharedEnd).toBe(0);
    expect(tally.foldedBase).toBeLessThanOrEqual(Math.max(2, tally.inserted / 1000));
  }, 600_000);
});

/** Does segment p1–p2 cross segment q1–q2 properly (each strictly separates the other's ends; exact on lattice points)? */
function crosses(p1: readonly number[], p2: readonly number[], q1: readonly number[], q2: readonly number[]): boolean {
  const o = (a: readonly number[], b: readonly number[], c: readonly number[]): number => Math.sign((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]));
  return o(p1, p2, q1) * o(p1, p2, q2) < 0 && o(q1, q2, p1) * o(q1, q2, p2) < 0;
}

/** The most times the polyline `chain` crosses any one segment of the polyline `base`. */
function maxCrossingsOfOneEdge(base: Pts, chain: Pts): number {
  let most = 0;
  for (let i = 0; i + 1 < base.length; i++) {
    let n = 0;
    for (let j = 0; j + 1 < chain.length; j++) if (crosses(base[i], base[i + 1], chain[j], chain[j + 1])) n++;
    most = Math.max(most, n);
  }
  return most;
}

/**
 * checks/M0-a-06-s2.md B-1: the zigzag property. A base run across the frame with one interior bend (L0 – L3; in 30 % of
 * the cases a second, crossing it), then a chain of 4 – 7 points at the base's level or finer zigzagging across the
 * base, so most cases cross ONE base edge three or more times — the class whose middle crossings stand within the hot
 * pixel only of the piece they split. Removed by a later batch (30 % coarser), in 15 % after a second zigzag inserted and
 * removed on top (LIFO). The arena must come back: records per level, encoded chunk refs, level digests, content print.
 */
const ZCASES = Math.max(200, Math.floor(RUNS / 5));

describe(`B-1 zigzag property: ${ZCASES} chains crossing one base edge repeatedly, each removed by a later batch, restore the arena`, () => {
  it('the records per level, the encoded chunk refs, the level digests and the content print as before the insert', () => {
    const tally = { inserted: 0, refusedInsert: 0, refusedRemove: 0, threePlus: 0, exact: 0, rotated: 0, sharedEnd: 0, foldedBase: 0, coarserBatch: 0, lifo: 0 };
    const byLevel = LEVELS.map(() => 0);
    const clamp = (x: number): number => Math.max(120, Math.min(3880, Math.round(x)));
    for (let c = 1; c <= ZCASES; c++) {
      const r = rng((c * 2_246_822_519 + 7_919) >>> 0);
      const p = framed();
      const lb = Math.floor(r() * 4) as Level;
      const y0 = 300 + Math.floor(r() * 3400);
      const y1 = 300 + Math.floor(r() * 3400);
      const ym = 300 + Math.floor(r() * 3400);
      const xm = 800 + Math.floor(r() * 2400);
      const base: Pts = [[0, y0], [xm, ym], [4000, y1]];
      commit(p, lb, (o) => insertChain(o, base.map(([x, y]) => pt(x, y)), [{ role: roleAt(lb), entity: 'base:0' }], 'mandatory'), { rederivesFrom: 0 as never });
      if (r() < 0.3) {
        const l2 = Math.floor(r() * 4) as Level;
        const x0 = 300 + Math.floor(r() * 3400);
        const x1 = 300 + Math.floor(r() * 3400);
        tx(p, spec(l2, { rederivesFrom: 0 as never }), (o) => insertChain(o, [pt(x0, 0), pt(x1, 4000)], [{ role: roleAt(l2), entity: 'base:1' }], 'mandatory'));
      }
      const yAt = (x: number): number => (x <= xm ? y0 + ((ym - y0) * x) / xm : ym + ((y1 - ym) * (x - xm)) / (4000 - xm));
      const lt = (lb + Math.floor(r() * (5 - lb))) as Level;
      const n = 4 + Math.floor(r() * 4);
      const sign = r() < 0.5 ? 1 : -1;
      const chain: [number, number][] = [];
      let x = 200 + Math.floor(r() * 1000);
      for (let i = 0; i < n; i++) {
        const d = 30 + Math.floor(r() * 600);
        chain.push([clamp(x), clamp(yAt(x) + sign * (i % 2 === 0 ? 1 : -1) * d)]);
        x += 120 + Math.floor(r() * 500);
        if (x > 3850) x = 3850 - Math.floor(r() * 2000);
      }
      const removeAt = (r() < 0.3 ? Math.floor(r() * (lt + 1)) : lt) as Level;
      const lifo = r() < 0.15;
      const before = snapshot(p);
      const folded = holdsDissolvable(p);
      const role = roleAt(lt);
      const a = tx(p, spec(lt, { rederivesFrom: 0 as never }), (o) => insertChain(o, chain.map(([u, w]) => pt(u, w)), [{ role, entity: 'x:1' }], 'mandatory'));
      if (!a.ok) {
        tally.refusedInsert++;
        continue;
      }
      tally.inserted++;
      byLevel[lt]++;
      if (maxCrossingsOfOneEdge(base, chain) >= 3) tally.threePlus++;
      if (removeAt < lt) tally.coarserBatch++;
      let shared = (a.value.record?.warnings ?? []).some((w) => w.code === 'W_STRETCH_SHARED');
      if (lifo) {
        tally.lifo++;
        const mid = snapshot(p);
        const q = chain.map(([u, w]) => pt(clamp(u + 97), clamp(w + 61)));
        const b2 = tx(p, spec(lt, { rederivesFrom: 0 as never }), (o) => insertChain(o, q, [{ role, entity: 'x:2' }], 'mandatory'));
        if (b2.ok) {
          const shared2 = (b2.value.record?.warnings ?? []).some((w) => w.code === 'W_STRETCH_SHARED');
          shared ||= shared2;
          commit(p, lt, (o) => removeEdges(o, { role, entity: 'x:2' }), { rederivesFrom: 0 as never });
          healthy(p);
          const back = snapshot(p);
          expect(back.faces, `case ${c}: LIFO records per level`).toEqual(mid.faces);
          if (!shared2) {
            expect(back.refs, `case ${c}: LIFO chunk refs`).toBe(mid.refs);
            expect(back.digests, `case ${c}: LIFO level digests`).toBe(mid.digests);
          }
        }
      }
      const b = tx(p, spec(removeAt, { rederivesFrom: 0 as never }), (o) => removeEdges(o, { role, entity: 'x:1' }));
      if (!b.ok) {
        tally.refusedRemove++;
        continue;
      }
      healthy(p);
      const after = snapshot(p);
      expect(after.faces, `case ${c}: live records per level`).toEqual(before.faces);
      if (shared && after.refs !== before.refs) tally.sharedEnd++; // judged since N-55 (1) (C-0287); named in the printed line
      if (folded && after.refs !== before.refs) {
        tally.foldedBase++; // C-0223 (5): counted, not judged — until N-55 (5)'s M0-a-05 round s7 (Q10)
        continue;
      }
      expect(after.refs, `case ${c}: encoded chunk refs (base ${JSON.stringify(base)}, chain ${JSON.stringify(chain)}, L${lt} at L${removeAt})`).toBe(before.refs);
      expect(after.digests, `case ${c}: level digests`).toBe(before.digests);
      if (after.print === before.print) tally.exact++;
      else {
        tally.rotated++;
        expect(canonPrint(after.print), `case ${c}: content print`).toBe(canonPrint(before.print));
      }
    }
    console.info(`B-1 zigzag property: ${JSON.stringify({ cases: ZCASES, ...tally, byLevel })}`);
    // Not vacuous: most inserted chains cross one base edge three or more times; every chain level, coarser batches and
    // LIFO pairs drawn; every removal committed.
    expect(tally.threePlus).toBeGreaterThan(tally.inserted / 2);
    for (const l of LEVELS) expect(byLevel[l], `insertions at L${l}`).toBeGreaterThan(0);
    expect(tally.coarserBatch).toBeGreaterThan(ZCASES / 20);
    expect(tally.lifo).toBeGreaterThan(ZCASES / 20);
    expect(tally.refusedRemove).toBe(0);
    expect(tally.exact).toBeGreaterThan(tally.inserted * 0.95);
    expect(tally.sharedEnd).toBe(0);
    expect(tally.foldedBase).toBeLessThanOrEqual(Math.max(2, tally.inserted / 1000));
  }, 600_000);
});

// ---- the targeted property: crossings on the piece they split only ----------------------------------------------------

type XY = readonly [number, number];

/** The distance from v to the segment a–b when v projects onto it, else Infinity (as the kernel's on-run test reads). */
function segmentDistance(v: XY, a: XY, b: XY): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l2 = dx * dx + dy * dy;
  const dot = (v[0] - a[0]) * dx + (v[1] - a[1]) * dy;
  if (l2 === 0 || dot < 0 || dot > l2) return Infinity;
  return Math.abs(dx * (v[1] - a[1]) - dy * (v[0] - a[0])) / Math.sqrt(l2);
}

/**
 * The crossings a same-level chain makes with ONE base edge S–E, as a test-side model of insertion: each chain segment in
 * order meets the edge's current pieces, each crossing rounded to the nearest lattice point and splitting the piece it
 * lies on (case 817's four crossings and their pieces come out exactly). Returns each crossing with its stretch
 * neighbours at the end and the piece it split.
 */
function modelCrossings(S: XY, E: XY, chain: readonly XY[]): { v: XY; prev: XY; next: XY; piece: [XY, XY] }[] | null {
  const along: XY[] = [S, E];
  const made: { v: XY; piece: [XY, XY] }[] = [];
  for (let j = 0; j + 1 < chain.length; j++) {
    const a = chain[j];
    const b = chain[j + 1];
    const hits: { t: number; q: XY }[] = [];
    for (let i = 0; i + 1 < along.length; i++) {
      const c = along[i];
      const d = along[i + 1];
      const den = (b[0] - a[0]) * (d[1] - c[1]) - (b[1] - a[1]) * (d[0] - c[0]);
      if (den === 0) continue;
      const t = ((c[0] - a[0]) * (d[1] - c[1]) - (c[1] - a[1]) * (d[0] - c[0])) / den;
      const u = ((c[0] - a[0]) * (b[1] - a[1]) - (c[1] - a[1]) * (b[0] - a[0])) / den;
      if (t <= 0 || t >= 1 || u <= 0 || u >= 1) continue;
      hits.push({ t, q: [Math.round(a[0] + t * (b[0] - a[0])), Math.round(a[1] + t * (b[1] - a[1]))] });
    }
    hits.sort((x, y) => x.t - y.t);
    for (const h of hits) {
      if (along.some((q) => q[0] === h.q[0] && q[1] === h.q[1])) return null; // two crossings on one point: not modelled
      let i = -1;
      let best = Infinity;
      for (let k = 0; k + 1 < along.length; k++) {
        const dd = segmentDistance(h.q, along[k], along[k + 1]);
        if (dd < best) {
          best = dd;
          i = k;
        }
      }
      if (i < 0) return null;
      made.push({ v: h.q, piece: [along[i], along[i + 1]] });
      along.splice(i + 1, 0, h.q);
    }
  }
  return made.map(({ v, piece }) => {
    const i = along.findIndex((q) => q[0] === v[0] && q[1] === v[1]);
    return { v, prev: along[i - 1], next: along[i + 1], piece };
  });
}

/**
 * Which reading of the on-run test a crossing needs (HOT = §3.6's 0.71 cm): 'neighbours' or 'ends' (the S2 code's two
 * readings), 'near-end' (its nearest neighbour on one side, the stretch's end on the other — case 817's piece) or 'inner'
 * (a piece whose ends are both other crossings, neither its nearest) — or null where no piece of the stretch holds it.
 */
function readingNeeded(c: { v: XY; prev: XY; next: XY }, S: XY, E: XY): 'neighbours' | 'ends' | 'near-end' | 'inner' {
  const HOT = 0.71;
  if (segmentDistance(c.v, c.prev, c.next) <= HOT) return 'neighbours';
  if (segmentDistance(c.v, S, E) <= HOT) return 'ends';
  if (segmentDistance(c.v, c.prev, E) <= HOT || segmentDistance(c.v, S, c.next) <= HOT) return 'near-end';
  return 'inner';
}

/**
 * checks/M0-a-06-s2.md B-1, aimed: crossings that stand within the hot pixel of the piece they split and off both readings
 * the S2 code had arise about once in 5 000 random zigzags (the rounding must fall just so), too rarely for a PR-size
 * draw to meet. So the candidates — a 3-point base across the frame at L0 – L3 and a zigzag of 3 – 6 points at the same
 * level, probe-double.mts's shape — are screened by the test-side model above (no kernel call) until a crossing needs
 * a reading other than the neighbours' or the ends'; each one kept is inserted, checked to have made the modelled
 * crossings, and removed by a later batch (30 % coarser). Quotas: `HARD` cases needing 'near-end' or 'inner', and at
 * least `INNER` needing 'inner' (rarer still, ~1 in 100 000 candidates).
 */
const HARD = Math.max(12, Math.floor(RUNS / 500));
const INNER = Math.max(2, Math.floor(RUNS / 5000));

describe(`B-1 targeted property: ${HARD} chains whose crossings lie only on the piece they split, removed, restore the arena`, () => {
  it('every kept case restores the records per level, the encoded chunk refs, the level digests and the content print', () => {
    const tally = { candidates: 0, nearEnd: 0, inner: 0, realised: 0, refused: 0, sharedEnd: 0, foldedBase: 0, exact: 0, coarserBatch: 0 };
    const clamp = (x: number): number => Math.max(120, Math.min(3880, Math.round(x)));
    const r = rng(0x5eed_b1);
    const cap = Math.max(4_000_000, RUNS * 400);
    while ((tally.nearEnd + tally.inner < HARD || tally.inner < INNER) && tally.candidates < cap) {
      tally.candidates++;
      const y0 = 300 + Math.floor(r() * 3400);
      const y1 = 300 + Math.floor(r() * 3400);
      const ym = 300 + Math.floor(r() * 3400);
      const xm = 800 + Math.floor(r() * 2400);
      const yAt = (x: number): number => (x <= xm ? y0 + ((ym - y0) * x) / xm : ym + ((y1 - ym) * (x - xm)) / (4000 - xm));
      const n = 3 + Math.floor(r() * 4);
      const sign = r() < 0.5 ? 1 : -1;
      const chain: XY[] = [];
      let x = 200 + Math.floor(r() * 1200);
      for (let i = 0; i < n; i++) {
        const d = 30 + Math.floor(r() * 700);
        chain.push([clamp(x), clamp(yAt(x) + sign * (i % 2 === 0 ? 1 : -1) * d)]);
        x += 150 + Math.floor(r() * 700);
        if (x > 3850) x = 3850 - Math.floor(r() * 2000);
      }
      const base: XY[] = [[0, y0], [xm, ym], [4000, y1]];
      let need: 'near-end' | 'inner' | null = null;
      const crossings: XY[] = [];
      let modelled = true;
      for (const [S, E] of [[base[0], base[1]], [base[1], base[2]]] as [XY, XY][]) {
        const cs = modelCrossings(S, E, chain);
        if (cs === null) {
          modelled = false;
          break;
        }
        for (const c of cs) {
          crossings.push(c.v);
          const k = readingNeeded(c, S, E);
          if (k === 'inner') need = 'inner';
          else if (k === 'near-end' && need === null) need = 'near-end';
        }
      }
      if (!modelled || need === null) continue;
      if (need === 'near-end' && tally.nearEnd + tally.inner >= HARD) continue;
      // A kept candidate: build it in the kernel at one level, every lattice decision drawn from the case's own stream.
      const q = rng(tally.candidates);
      const level = Math.floor(q() * 4) as Level;
      const removeAt = (q() < 0.3 ? Math.floor(q() * (level + 1)) : level) as Level;
      const role = roleAt(level);
      const p = framed();
      commit(p, level, (o) => insertChain(o, base.map(([u, w]) => pt(u, w)), [{ role, entity: 'base:0' }], 'mandatory'), { rederivesFrom: 0 as never });
      const before = snapshot(p);
      const folded = holdsDissolvable(p);
      const a = tx(p, spec(level, { rederivesFrom: 0 as never }), (o) => insertChain(o, chain.map(([u, w]) => pt(u, w)), [{ role, entity: 'x:1' }], 'mandatory'));
      if (!a.ok) {
        tally.refused++;
        continue;
      }
      if (need === 'inner') tally.inner++;
      else tally.nearEnd++;
      // The kernel made the modelled crossings (each a vertex where the model put it).
      if (crossings.every(([u, w]) => vertexAtPoint(p, u, w) >= 0)) tally.realised++;
      if (removeAt < level) tally.coarserBatch++;
      const shared = (a.value.record?.warnings ?? []).some((w) => w.code === 'W_STRETCH_SHARED');
      commit(p, removeAt, (o) => removeEdges(o, { role, entity: 'x:1' }), { rederivesFrom: 0 as never });
      healthy(p);
      const after = snapshot(p);
      const what = `candidate ${tally.candidates} (${need}; L${level} at L${removeAt}; base ${JSON.stringify(base)}, chain ${JSON.stringify(chain)})`;
      expect(after.faces, `${what}: live records per level`).toEqual(before.faces);
      if (shared && after.refs !== before.refs) tally.sharedEnd++; // judged since N-55 (1) (C-0287); named in the printed line
      if (folded && after.refs !== before.refs) {
        tally.foldedBase++; // C-0223 (5): counted, not judged — until N-55 (5)'s M0-a-05 round s7 (Q10)
        continue;
      }
      expect(after.refs, `${what}: encoded chunk refs`).toBe(before.refs);
      expect(after.digests, `${what}: level digests`).toBe(before.digests);
      expect(canonPrint(after.print), `${what}: content print`).toBe(canonPrint(before.print));
      if (after.print === before.print) tally.exact++;
    }
    console.info(`B-1 targeted property: ${JSON.stringify({ HARD, INNER, ...tally })}`);
    // Not vacuous: the quotas met, the model right about the kernel's crossings in most kept cases.
    expect(tally.nearEnd + tally.inner).toBeGreaterThanOrEqual(HARD);
    expect(tally.inner).toBeGreaterThanOrEqual(INNER);
    // (The model ignores attraction and hot pixels of other vertices, so some kept cases place a crossing elsewhere: 18
    // of 22 at the PR size, 163 of 211 at 10⁵ runs; those are still judged.)
    expect(tally.realised).toBeGreaterThanOrEqual(0.6 * (tally.nearEnd + tally.inner));
    expect(tally.sharedEnd).toBe(0);
    expect(tally.foldedBase).toBeLessThanOrEqual(Math.max(2, (tally.nearEnd + tally.inner) / 50));
  }, 600_000);
});
