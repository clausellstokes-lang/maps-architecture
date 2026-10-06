// M0-a-06, session fix round S1 (N-47, C-0219): remove(insert(x)) restores the arena — the face records included. A
// finer chain's insertion materialises its own children at the levels between its parent record and its own (§2.2 rule
// 2, insertChain's re-walk, C-0177 (9)); a later removeEdges must free each record its level no longer needs, up to L1
// (rule 2: "until then the parent face is its own child"; C-0185 (3)'s keep rule), list it among the batch's removed
// records and tombstone its index item. Level digests keep own children out (C-0194), so equality is judged on the
// slot-free content print, the live records per level and the encoded chunks (`encodeArena` writes every live record),
// with the level digests beside them. Fix round S2 (checks/M0-a-06-s1.md B-1, B-2; C-0223): a chain crossing one run
// twice dissolves both crossings whatever the order (the on-run test decided before the batch), split restoration alike,
// and a coarser batch's record lists the own-child ancestors it frees in key order.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { faceKey, isFaceLive, VERTEX_SPLIT, VERTEX_STEINER, type FaceId, type Plat } from '../../src/arena/index.js';
import { recomputeLevelDigest } from '../../src/digest/index.js';
import { insertChain } from '../../src/insert/index.js';
import { encodeArena } from '../../src/io/index.js';
import { removeEdges, tx, type CommitRecord } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { rng } from './fuzzgen.js';
import { commit, contentPrint, degreeAt, framed, healthy, pt, spec, vertexAtPoint } from './support.js';

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

/** PLAT_FUZZ_RUNS (10⁴ in the PR tier, 10⁶ nightly; C-0057): a quarter of it in cases. */
const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
const CASES = Math.max(250, Math.floor(RUNS / 4));

describe(`N-47 property: ${CASES} random insertions at every level, each removed by a later batch, restore the arena`, () => {
  it('the content print (rings at their least rotation), the records per level, the encoded chunk refs and the level digests as before', () => {
    const tally = { inserted: 0, refusedInsert: 0, refusedRemove: 0, exact: 0, rotated: 0, sharedEnd: 0, ownChildren: 0, coarserBatch: 0, threeSegments: 0 };
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
      if (shared && after.refs !== before.refs) {
        // A shared stretch's end where the chain left the run it shared: rule 3 (b) as §2.2 words it clears the end's
        // split flag (no pair of its edges carried identical rows before the batch), so the run stays split there — the
        // arena valid, the run's route unchanged. A design question for the session (C-0219 (4)), counted, not judged.
        tally.sharedEnd++;
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
    expect(tally.sharedEnd).toBeLessThanOrEqual(Math.max(2, tally.inserted / 200));
  }, 600_000);
});
