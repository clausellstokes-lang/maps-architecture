// M0-a-06, hardening round S7 (lane build/M0-a-06-fix-s7; checks/M0-a-06-notes.md 'Hardening round S7'): the round's
// constructed pins, each red on the code before the round or on the mutant its row names — the coarser-record lookup's
// reach (queue Q57), rule 3 (c)'s single-run reading at every level between (Q61's tx part), and the constant boundaries
// the consolidation re-homed (N-c1-4: the on-run hot pixel and the clearance row).
import { describe, expect, it } from 'vitest';
import { addRoleRow, faceWalk, intern, roleIdOf, VERTEX_SPLIT, VERTEX_STEINER, type HalfEdgeId, type Plat } from '../../src/arena/index.js';
import { attachIndex, checkIndexState } from '../../src/index/index.js';
import { insertChain } from '../../src/insert/index.js';
import { ok } from '../../src/num/index.js';
import { recordLeftOf } from '../../src/tx/relevel.js';
import { removeEdges, tx } from '../../src/tx/index.js';
import type { OpenTx } from '../../src/tx/state.js';
import type { Level } from '../../src/types/index.js';
import { buildArena, CELLS } from '../insert/step3-5/support.js';
import { ALONG_MIX, DEFAULT_MIX, randomBatch, rng, type Live, type Mix } from './fuzzgen.js';
import { allProblems, commit, contentPrint, degreeAt, edgeRows, framed, pt, readable, spec, state, vertexAtPoint } from './support.js';

/** A built arena (M0-a-02's raw primitives, records materialised), its rows written, then its index attached. */
function built(
  vertices: readonly (readonly [number, number, Level, number?])[],
  edges: readonly (readonly [number, number, Level])[],
  rows: readonly { edge: number; role: string; entity: string; level: Level }[] = [],
): { p: Plat; he: HalfEdgeId[]; v: number[]; faces: number[][] } {
  const b = buildArena({ vertices, edges });
  for (const r of rows) addRoleRow(b.plat, b.he[r.edge], roleIdOf(r.role), intern(b.plat, r.entity), r.level, 0);
  attachIndex(b.plat, { gridCellCm: CELLS });
  return { p: b.plat, he: b.he, v: b.v, faces: b.faces };
}

const FRAME_V = [[0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0]] as const;
const FRAME_E = [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0]] as const;

describe('Q57: the coarser record a half-edge lies on is asked of the index WALK_REACH_CM past its ends', () => {
  /**
   * An L1 square inside the frame whose south side carries two L4 Steiner vertices 2 cm south of its L1 route (three
   * levels finer: within 3 × 0.71 cm, §2.2 rule 3). The index reads the square's record on its L1 route (y ≥ 1000); the
   * half-edge between the two Steiner vertices lies at y = 998, so a box 1 cm past its ends misses the record, while its
   * walk at L1 holds the half-edge. `recordLeftOf` must return that record (before the round: −1, a "no record" that
   * plans own children where a record stands — the demotion's materialise path, C-0349's class).
   */
  it('the half-edge between two Steiner vertices 2 cm off an L1 route: the record holding it, not −1', () => {
    const S = VERTEX_STEINER | VERTEX_SPLIT;
    const { p, he, faces } = built(
      [...FRAME_V, [1000, 1000, 1], [3000, 1000, 1], [3000, 3000, 1], [1000, 3000, 1], [1500, 998, 4, S], [1600, 998, 4, S]],
      [...FRAME_E, [4, 8, 1], [8, 9, 1], [9, 5, 1], [5, 6, 1], [6, 7, 1], [7, 4, 1]],
    );
    expect(allProblems(p)).toEqual([]);
    const h = he[5];
    const square = faces[1].find((f) => faceWalk(p, 1, f).some((ring) => ring.includes(h)));
    expect(square).toBeDefined();
    let got = -2;
    const r = tx(p, spec(1), (o) => {
      got = recordLeftOf(o as OpenTx, 1, h);
      return ok(null);
    });
    expect(r.ok).toBe(true);
    expect(got).toBe(square);
  });
});

describe('Q61 (tx part): rule 3 (c) reads a vertex finer than its edges as one run only when their rows match at every level between', () => {
  /**
   * A way a–v–b at L1 with v an L3 vertex (an L3 plot line v–c ends there), and an L2 kerb row on v–b only: the two L1
   * edges match at L1 but differ at L2, which v (L3) stands inside — the in-between case N-s6c-3 names (the validator's
   * level-consistency row reads L1 only; the encoder refuses the L2 rows differing along the L2 route edge a–b). Removing
   * the plot line puts v in (c): before the round `single` compared L1 only and left v at L3 (the arena still unreadable);
   * now the pair is no single run at L2, so v becomes the run's own vertex (promoted, its lowest level, L1) and the
   * arena reads.
   */
  const way = (kerbBothSides: boolean): ReturnType<typeof built> =>
    built(
      [...FRAME_V, [0, 2000, 1], [4000, 2000, 1], [2000, 2000, 3, VERTEX_STEINER], [2000, 3000, 3]],
      [[0, 1, 0], [1, 5, 0], [5, 2, 0], [2, 3, 0], [3, 4, 0], [4, 0, 0], [4, 6, 1], [6, 5, 1], [6, 7, 3]],
      [
        { edge: 6, role: 'way', entity: 'way:1', level: 1 },
        { edge: 7, role: 'way', entity: 'way:1', level: 1 },
        { edge: 7, role: 'kerb', entity: 'kerb:1', level: 2 },
        ...(kerbBothSides ? [{ edge: 6, role: 'kerb', entity: 'kerb:1', level: 2 as Level }] : []),
        { edge: 8, role: 'plot_line', entity: 'plot:1', level: 3 },
      ],
    );

  it('a mismatched pair (an L2 row on one side), removed by an L1 batch: not one run — the vertex is promoted to L1, the arena reads', () => {
    const { p, v } = way(false);
    expect(allProblems(p)).toEqual([]);
    expect(() => readable(p)).toThrow();
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'plot_line', entity: 'plot:1' }), { rederivesFrom: 0 as never });
    expect(allProblems(p)).toEqual([]);
    expect(p.vertices.level[v[6]]).toBe(1);
    expect(p.vertices.flags[v[6]] & VERTEX_STEINER).toBe(0);
    expect(c.record?.promoted).toContain(v[6]);
    readable(p);
  });

  it('a mismatched pair removed by an L3 batch: not one run — the promotion would rewrite the L1 route, so the batch refuses and writes nothing', () => {
    const { p } = way(false);
    const before = state(p);
    const r = tx(p, spec(3, { rederivesFrom: 0 as never }), (o) => removeEdges(o, { role: 'plot_line', entity: 'plot:1' }));
    expect(r.ok ? 'committed' : `${r.code} ${r.detail.replace(/\d+/g, '#')}`).toBe('E_INVARIANT an L# batch wrote the L# index (tombstone of route edge # (L#)) outside its promotions and demotions');
    expect(state(p)).toBe(before);
  });

  it('a matched pair (the L2 row on both sides), removed by an L3 batch: one run at L1 and L2 — the vertex stays an L3 Steiner vertex', () => {
    const { p, v } = way(true);
    expect(allProblems(p)).toEqual([]);
    const c = commit(p, 3, (o) => removeEdges(o, { role: 'plot_line', entity: 'plot:1' }), { rederivesFrom: 0 as never });
    expect(allProblems(p)).toEqual([]);
    expect(p.vertices.level[v[6]]).toBe(3);
    expect(p.vertices.flags[v[6]] & VERTEX_STEINER).toBe(VERTEX_STEINER);
    expect(c.record?.promoted).not.toContain(v[6]);
    readable(p);
  });
});

describe('N-c1-4 / N-c1-8: the boundaries of the constants the consolidation re-homed', () => {
  it('the on-run test reads one hot pixel (HOT_PIXEL_SQ): a chain\'s own corner 0.89 cm off its neighbours\' segment is no run — the spine removed, the corner kept, its flag cleared', () => {
    // way:b's corner (2000, 2002) landed on the spine's edge (a split vertex). Its neighbours' segment (0, 1000)–(4000,
    // 3002) passes 4000 / √20 008 004 ≈ 0.894 cm from it: beyond the hot pixel (0.71 cm), inside twice it (1.42 cm), so
    // reading 4 · HOT_PIXEL_SQ would call the pair a run and the dissolution would straighten the chain's own corner.
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(0, 2002), pt(4000, 2002)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    commit(p, 1, (o) => insertChain(o, [pt(0, 1000), pt(2000, 2002), pt(4000, 3002)], [{ role: 'way', entity: 'way:b' }], 'mandatory'));
    const v = vertexAtPoint(p, 2000, 2002);
    expect(v).toBeGreaterThanOrEqual(0);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:1' }));
    expect(allProblems(p)).toEqual([]);
    expect(vertexAtPoint(p, 2000, 2002)).toBe(v);
    expect(degreeAt(p, 2000, 2002)).toBe(2);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(0);
    expect(c.record?.unflagged).toContain(v);
  });

  it('the clearance row reads minEdge (25 cm), strictly: a removal leaving a vertex 24 cm from an edge it was joined to is refused, 25 and 26 cm commit', () => {
    // Built raw (no attraction): a way A (1000, 1000)–(1500, 1000)–(2000, 1000), a way C from A's vertex w = (1500, 1000)
    // to u = (1530, 1000 + d) and on to (1530, 3000), a way D from u. u stands d cm from A's edge w–(2000, 1000), exempt
    // while C joins it to w (its one-ring). Removing C ends that one-ring (C-0185 (4)), so the row reads u against A's edge.
    // The refusal at 24 cm is the open lawful-removal class of N-c1-3 (routed to the session for a ruling); the pin holds
    // the row's boundary as the code reads it today (mutants N1: one cm short; C12: two cm wide).
    const outcome = (d: number): string => {
      const { p } = built(
        [...FRAME_V, [1000, 1000, 1], [1500, 1000, 1], [2000, 1000, 1], [1530, 1000 + d, 1], [1530, 3000, 1], [3000, 3000, 1]],
        [...FRAME_E, [4, 5, 1], [5, 6, 1], [5, 7, 1], [7, 8, 1], [7, 9, 1]],
        [
          { edge: 4, role: 'way', entity: 'way:a', level: 1 },
          { edge: 5, role: 'way', entity: 'way:a', level: 1 },
          { edge: 6, role: 'way', entity: 'way:c', level: 1 },
          { edge: 7, role: 'way', entity: 'way:c', level: 1 },
          { edge: 8, role: 'way', entity: 'way:d', level: 1 },
        ],
      );
      expect(allProblems(p)).toEqual([]);
      const before = state(p);
      const r = tx(p, spec(1, { rederivesFrom: 0 as never }), (o) => removeEdges(o, { role: 'way', entity: 'way:c' }));
      if (!r.ok) {
        expect(state(p)).toBe(before);
        return `${r.code} ${r.detail}`;
      }
      expect(allProblems(p)).toEqual([]);
      return 'committed';
    };
    expect(outcome(24)).toBe('E_INVARIANT clearance: the vertex (1530, 1024) stands within minEdge of the edge (1500, 1000)–(2000, 1000) (§3.10)');
    expect(outcome(25)).toBe('committed');
    expect(outcome(26)).toBe('committed');
  });
});

/** Replays a family sequence (fuzz.test.ts's generator and loop) up to and including batch `at`; returns the arena. */
function replayTo(seed: number, mult: number, mix: Mix, at: number, reattach = false): { p: Plat; kinds: string[]; outcomes: string[] } {
  const r = rng(seed * mult);
  const p = framed();
  const live: Live = { ways: [], kerbs: [], next: 0 };
  const kinds: string[] = [];
  const outcomes: string[] = [];
  for (let step = 0; step <= at; step++) {
    if (reattach) attachIndex(p, { gridCellCm: CELLS });
    const before = state(p);
    const snapshot: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
    const b = randomBatch(p, live, r, mix);
    const res = tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn);
    kinds.push(b.kind);
    outcomes.push(res.ok ? (res.value.record === null ? 'empty' : `ok work ${res.value.record.work}`) : `${res.code} ${res.detail}`);
    if (res.ok) {
      expect(allProblems(p)).toEqual([]);
      expect(checkIndexState(p)).toEqual([]);
    } else {
      expect(state(p)).toBe(before);
      live.ways = snapshot.ways;
      live.kerbs = snapshot.kerbs;
    }
  }
  return { p, kinds, outcomes };
}

describe('N-16: the on-run readings of round S2 (C-0223, C-0225), each pinned where it decides', () => {
  it('X06 — wasOnRun follows an edge through the merges made before it: default × 7919 seed 374, batch 9 (remove way) dissolves (2014, 2806) on way:6', () => {
    const { p, kinds } = replayTo(374, 7919, DEFAULT_MIX, 9);
    expect(kinds[9]).toBe('remove way');
    expect(vertexAtPoint(p, 2014, 2806)).toBe(-1);
    expect(edgeRows(p, [0, 3341], [3290, 2468])).toEqual(['way/way:6']);
  });

  it('X09 — the second on-run reading is offered only to a vertex of its pair\'s level: default × 7919 seed 437, batch 12 (clear) clears (561, 1428)\'s split flag', () => {
    const { p, kinds } = replayTo(437, 7919, DEFAULT_MIX, 12);
    expect(kinds[12]).toBe('clear');
    const v = vertexAtPoint(p, 561, 1428);
    expect(v).toBeGreaterThanOrEqual(0);
    expect(p.vertices.level[v]).toBe(2);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(0);
  });

  it('X10 — a vertex beyond its neighbours\' segment (a spike tip within the hot pixel of the line, not of the segment) is no run: kept, its flag cleared', () => {
    // a = (1000, 1000), b = (2000, 1001), v = (3001, 1002): v lies 1 / 1000 cm from the line a–b but projects past b.
    const { p, v } = built(
      [...FRAME_V, [1000, 1000, 1], [2000, 1001, 1], [3001, 1002, 1, VERTEX_SPLIT], [3001, 3000, 1]],
      [...FRAME_E, [4, 6, 1], [6, 5, 1], [6, 7, 1]],
      [
        { edge: 4, role: 'way', entity: 'way:s', level: 1 },
        { edge: 5, role: 'way', entity: 'way:s', level: 1 },
        { edge: 6, role: 'way', entity: 'way:t', level: 1 },
      ],
    );
    expect(allProblems(p)).toEqual([]);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:t' }), { rederivesFrom: 0 as never });
    expect(allProblems(p)).toEqual([]);
    expect(vertexAtPoint(p, 3001, 1002)).toBe(v[6]);
    expect(degreeAt(p, 3001, 1002)).toBe(2);
    expect(p.vertices.flags[v[6]] & VERTEX_SPLIT).toBe(0);
    expect(c.record?.unflagged).toContain(v[6]);
  });

  it('X11 — the stretch walk passes only vertices the dissolution would remove (identical rows): v, 1 cm off its piece, is no run — kept', () => {
    // a = (1000, 1000), v = (1500, 1000), u = (2500, 1003) (an L2 Steiner vertex where a kerb along u–w ends), w = (3000,
    // 1000). v stands 1 cm off a–u, on a–w; u's two edges differ (the kerb), so the walk stops at u and v is no run.
    const S = VERTEX_STEINER | VERTEX_SPLIT;
    const { p, v } = built(
      [...FRAME_V, [1000, 1000, 1], [1500, 1000, 1, VERTEX_SPLIT], [2500, 1003, 2, S], [3000, 1000, 1], [1500, 3000, 1]],
      [...FRAME_E, [4, 5, 1], [5, 6, 1], [6, 7, 1], [5, 8, 1]],
      [
        { edge: 4, role: 'way', entity: 'way:s', level: 1 },
        { edge: 5, role: 'way', entity: 'way:s', level: 1 },
        { edge: 6, role: 'way', entity: 'way:s', level: 1 },
        { edge: 6, role: 'kerb', entity: 'kerb:k', level: 2 },
        { edge: 7, role: 'way', entity: 'way:t', level: 1 },
      ],
    );
    expect(allProblems(p)).toEqual([]);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:t' }), { rederivesFrom: 0 as never });
    expect(allProblems(p)).toEqual([]);
    expect(vertexAtPoint(p, 1500, 1000)).toBe(v[5]);
    expect(degreeAt(p, 1500, 1000)).toBe(2);
    expect(c.record?.unflagged).toContain(v[5]);
  });
});

describe('N-12: the work a removal charges for the own-child ancestors it reads (K05, K14)', () => {
  it('K14 — the N-47 fixtures removed at their own level charge their ancestor walks: L2 39, L3 25, L4 15 operations', () => {
    const work = ([2, 3, 4] as const).map((lt) => {
      const p = framed(4000);
      commit(p, 0, (o) => insertChain(o, [pt(1553, 1708), pt(2317, 1842)], [{ role: 'way', entity: 'way:b0' }], 'mandatory'));
      const role = lt === 2 ? 'kerb' : 'plot_line';
      commit(p, lt, (o) => insertChain(o, [pt(285, 882), pt(1317, 314), pt(2233, 691)], [{ role, entity: 'x:1' }], 'mandatory'));
      return commit(p, lt, (o) => removeEdges(o, { role, entity: 'x:1' }), { rederivesFrom: 0 as never }).record?.work;
    });
    expect(work).toEqual([39, 25, 15]);
  });

  it('K05 — a coarser record a demoted edge\'s own children hang from is never walked as an ancestor: along × 104 729 seed 111, batch 13 (clear) charges 212', () => {
    const { kinds, outcomes } = replayTo(111, 104_729, ALONG_MIX, 13);
    expect(kinds[13]).toBe('clear');
    expect(outcomes[13]).toBe('ok work 212');
  });
});

describe('S7: a batch on an arena whose index was rebuilt (every record in a partition, as after a load, §3.9) commits as on the incremental index', () => {
  // A record the rewrite freed whose slot it handed out again had its home entry reset by the allocation, its static copy
  // left untombstoned: before the round the commit's own queries then threw ('index: partition … answers a stale item …
  // that no tombstone filters') — 17 of the 52 940 golden batches with the index rebuilt before each, fuzz.test.ts's
  // regression 51 among them. Now every outcome equals the incremental index's and every commit passes checkIndexState.
  const CASES: { name: string; seed: number; mult: number; mix: Mix; at: number }[] = [
    { name: 'regression 51 × 15 485 863 (default mix), 20 batches', seed: 51, mult: 15_485_863, mix: DEFAULT_MIX, at: 19 },
    { name: 'regression 93 × 15 485 863 (along mix), 20 batches', seed: 93, mult: 15_485_863, mix: ALONG_MIX, at: 19 },
    { name: 'along × 104 729 seed 222, 16 batches', seed: 222, mult: 104_729, mix: ALONG_MIX, at: 15 },
  ];
  for (const k of CASES) {
    it(k.name, () => {
      const fresh = replayTo(k.seed, k.mult, k.mix, k.at);
      const rebuilt = replayTo(k.seed, k.mult, k.mix, k.at, true);
      expect(rebuilt.outcomes).toEqual(fresh.outcomes);
      expect(contentPrint(rebuilt.p)).toBe(contentPrint(fresh.p));
    }, 120_000);
  }
});
