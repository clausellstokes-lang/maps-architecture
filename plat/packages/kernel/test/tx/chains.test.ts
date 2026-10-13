// M0-a-06: `runsOfPairs` is the arena's one run ordering (C-0146 (5); `edgeRuns`, arena/resolve.ts, exported by path).
// The reference below is the transaction's own walk as it stood before the two were one — kept verbatim, so the oracle is
// independent of the delegation — and the property holds all three equal as HalfEdgeId[][] (run order, direction and
// start vertex) on pair sets drawn from the tx fuzz arenas (fuzzgen.ts's randomBatch, both mixes), the fixture
// sequences' arenas, the hand-built QUARTERS and LAKE arenas and the loop off a branch vertex (arena/resolve.test.ts's
// fixtures), each in several allocation orders, with repeated pairs and in any listing order. Its size is PLAT_FUZZ_RUNS
// (10⁴ unset).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  addRole,
  compareVertices,
  dest,
  handleOf,
  isHalfEdgeLive,
  roleIdOf,
  rowElement,
  rowsOfKey,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../../src/arena/index.js';
import { edgeRuns } from '../../src/arena/resolve.js';
import { orient2d } from '../../src/num/index.js';
import { runsOfPairs, tx } from '../../src/tx/index.js';
import { buildArena, dressQuarters, LAKE, permutation, QUARTERS, rng, type ArenaSpec } from '../arena/support.js';
import { runSequence, SEQUENCES } from './fixtures.js';
import { ALONG_MIX, DEFAULT_MIX, randomBatch, type Live } from './fuzzgen.js';
import { framed, spec } from './support.js';

/**
 * The reference: the runs a set of edge pairs forms, in `resolve`'s order (C-0146 (5)) — the transaction's walk, verbatim:
 * maximal paths between vertices where the set does not continue in exactly one way, each open run from its lower (y, x)
 * end (a loop off a branch vertex toward the smaller neighbour), each ring from its lowest-leftmost vertex
 * counter-clockwise; runs by their first two vertices.
 */
function referenceRuns(p: Plat, pairsIn: readonly number[]): HalfEdgeId[][] {
  const pairs = [...new Set(pairsIn)];
  const O = p.halfEdges.origin;
  const at = new Map<VertexId, number[]>();
  for (const e of pairs) {
    for (const v of [O[2 * e], O[2 * e + 1]]) {
      const list = at.get(v) ?? [];
      list.push(e);
      at.set(v, list);
    }
  }
  const used = new Set<number>();
  const walk = (s: VertexId, e0: number): HalfEdgeId[] => {
    const run: HalfEdgeId[] = [];
    let v = s;
    let e = e0;
    for (;;) {
      used.add(e);
      const h = O[2 * e] === v ? 2 * e : 2 * e + 1;
      run.push(h);
      v = O[h ^ 1];
      const inc = at.get(v) as number[];
      if (inc.length !== 2) break;
      const n = inc[0] === e ? inc[1] : inc[0];
      if (used.has(n)) break;
      e = n;
    }
    return run;
  };
  const flip = (run: HalfEdgeId[]): HalfEdgeId[] => run.map((h) => h ^ 1).reverse();
  const runs: HalfEdgeId[][] = [];
  // Open runs from every end or branch vertex, visited in lattice order so no slot decides anything.
  const branch = [...at.keys()].filter((v) => (at.get(v) as number[]).length !== 2).sort((a, b) => compareVertices(p, a, b));
  for (const v of branch) {
    const inc = (at.get(v) as number[]).slice().sort((a, b) => compareVertices(p, O[2 * a] === v ? O[2 * a + 1] : O[2 * a], O[2 * b] === v ? O[2 * b + 1] : O[2 * b]));
    for (const e of inc) {
      if (used.has(e)) continue;
      let run = walk(v, e);
      const a = O[run[0]];
      const b = dest(p, run[run.length - 1]);
      if (a === b) {
        if (compareVertices(p, O[run[run.length - 1]], dest(p, run[0])) < 0) run = flip(run);
      } else if (compareVertices(p, b, a) < 0) {
        run = flip(run);
      }
      runs.push(run);
    }
  }
  // Rings: what is left lies on cycles where the set continues in exactly one way.
  const rest = pairs.filter((e) => !used.has(e)).sort((a, b) => compareVertices(p, O[2 * a], O[2 * b]) || compareVertices(p, O[2 * a + 1], O[2 * b + 1]));
  for (const e0 of rest) {
    if (used.has(e0)) continue;
    let run = walk(O[2 * e0], e0);
    let low = 0;
    for (let k = 1; k < run.length; k++) if (compareVertices(p, O[run[k]], O[run[low]]) < 0) low = k;
    run = run.slice(low).concat(run.slice(0, low));
    const v = O[run[0]];
    const a = dest(p, run[0]);
    const b = O[run[run.length - 1]];
    const X = p.vertices.x;
    const Y = p.vertices.y;
    const turn = orient2d(X[v], Y[v], X[a], Y[a], X[b], Y[b]);
    if (turn < 0 || (turn === 0 && compareVertices(p, b, a) < 0)) run = flip(run);
    runs.push(run);
  }
  runs.sort((r, s) => compareVertices(p, O[r[0]], O[s[0]]) || compareVertices(p, dest(p, r[0]), dest(p, s[0])));
  return runs;
}

/** One arena of the pool: its live edge pairs and the pair sets of its keyed chains (role, entity, ordinal 0). */
interface PoolArena {
  readonly name: string;
  readonly p: Plat;
  readonly pairs: number[];
  readonly chains: number[][];
}

function livePairs(p: Plat): number[] {
  const out: number[] = [];
  for (let e = 0; e < p.slots.pair.top; e++) if (isHalfEdgeLive(p, 2 * e)) out.push(e);
  return out;
}

function chainsOf(p: Plat, keys: readonly (readonly [string, string])[]): number[][] {
  return keys
    .filter(([, entity]) => handleOf(p, entity) >= 0)
    .map(([role, entity]) => rowsOfKey(p, roleIdOf(role), handleOf(p, entity), 0).map((r) => rowElement(p, r)))
    .filter((s) => s.length > 0);
}

function pooled(name: string, p: Plat, keys: readonly (readonly [string, string])[] = []): PoolArena {
  return { name, p, pairs: livePairs(p), chains: chainsOf(p, keys) };
}

/** The square ring with an antenna from its corner (100, 100) — arena/resolve.test.ts's loop off a branch vertex. */
const LOOP: ArenaSpec = {
  vertices: [[0, 0, 0], [100, 0, 0], [100, 100, 0], [0, 100, 0], [150, 150, 0]],
  edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [2, 4, 0]],
};

const DRESSED_KEYS = [['way', 'way:ns'], ['way', 'way:ew'], ['district_bound', 'district:1'], ['margin', 'terrain:1'], ['wall', 'enceinte:1'], ['kerb', 'block:sw'], ['yard_part', 'plot:yard'], ['party_wall', 'building:ne']] as const;

/** The pool: hand-built arenas in six allocation orders each, the fixture sequences' arenas, and the fuzz arenas. */
function pool(): PoolArena[] {
  const out: PoolArena[] = [];
  for (const seed of [0, 1, 2, 3, 4, 5]) {
    const order = (s: ArenaSpec) => (seed === 0 ? {} : { vertices: permutation(s.vertices.length, seed), edges: permutation(s.edges.length, seed * 31) });
    out.push(pooled(`QUARTERS ${seed}`, dressQuarters(buildArena(QUARTERS, order(QUARTERS))).plat, DRESSED_KEYS));
    out.push(pooled(`LAKE ${seed}`, buildArena(LAKE, order(LAKE)).plat));
    const loop = buildArena(LOOP, order(LOOP));
    for (const h of loop.he) addRole(loop.plat, h, { role: 'district_bound', entity: 'district:1' }, 0);
    out.push(pooled(`LOOP ${seed}`, loop.plat, [['district_bound', 'district:1']]));
  }
  for (const seq of SEQUENCES) out.push(pooled(`fixture ${seq.name}`, runSequence(seq).p));
  for (let seed = 1; seed <= 12; seed++) {
    for (const [mix, mult, steps] of [[DEFAULT_MIX, 7919, 14], [ALONG_MIX, 104_729, 16]] as const) {
      const r = rng(seed * mult);
      const p = framed();
      const live: Live = { ways: [], kerbs: [], next: 0 };
      for (let step = 0; step < steps; step++) {
        const snap: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
        const b = randomBatch(p, live, r, mix);
        if (!tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn).ok) {
          live.ways = snap.ways;
          live.kerbs = snap.kerbs;
        }
      }
      out.push(pooled(`fuzz ${mix === ALONG_MIX ? 'along' : 'default'} ${seed}`, p, [...live.ways.map((id) => ['way', id] as const), ...live.kerbs.map((id) => ['kerb', id] as const)]));
    }
  }
  return out;
}

describe('T-tx-new-1: runsOfPairs ≡ edgeRuns ≡ the transaction\'s walk (C-0146 (5))', () => {
  const arenas = pool();

  it('the pool holds every source: hand-built arenas in six orders, the fixture sequences, 24 fuzz arenas with their chains', () => {
    expect(arenas.filter((a) => a.name.startsWith('fuzz')).length).toBe(24);
    expect(arenas.filter((a) => a.name.startsWith('fixture')).length).toBe(SEQUENCES.length);
    expect(arenas.every((a) => a.pairs.length > 0)).toBe(true);
    expect(arenas.reduce((n, a) => n + a.chains.length, 0)).toBeGreaterThan(48);
  });

  it('every keyed chain of every arena of the pool, and every arena\'s whole edge set, gives one answer from the three', () => {
    for (const a of arenas) {
      for (const pairs of [a.pairs, ...a.chains]) {
        const want = referenceRuns(a.p, pairs);
        expect(runsOfPairs(a.p, pairs), a.name).toEqual(want);
        expect(edgeRuns(a.p, pairs), a.name).toEqual(want);
      }
    }
  }, 120_000);

  it('property: any pair subset of a pool arena (repeats and listing order aside) gives one answer from the three', () => {
    // Not vacuous: the drawn sets hold open runs, rings and loops off a branch vertex.
    const seen = { open: 0, ring: 0, loop: 0 };
    fc.assert(
      fc.property(fc.nat(), fc.integer(), fc.double({ min: 0.05, max: 1, noNaN: true }), fc.double({ min: 0, max: 0.5, noNaN: true }), (pick, seed, share, repeat) => {
        const a = arenas[pick % arenas.length];
        const r = rng(seed);
        const subset = a.pairs.filter(() => r() < share);
        const listed = [...subset, ...subset.filter(() => r() < repeat)];
        const given = permutation(listed.length, seed ^ 0x77).map((i) => listed[i]);
        const want = referenceRuns(a.p, given);
        expect(runsOfPairs(a.p, given), a.name).toEqual(want);
        expect(edgeRuns(a.p, given), a.name).toEqual(want);
        const O = a.p.halfEdges.origin;
        const degree = new Map<number, number>();
        for (const e of new Set(given)) for (const v of [O[2 * e], O[2 * e + 1]]) degree.set(v, (degree.get(v) ?? 0) + 1);
        for (const run of want) {
          const s = O[run[0]];
          if (s !== dest(a.p, run[run.length - 1])) seen.open++;
          else if (degree.get(s) === 2) seen.ring++;
          else seen.loop++;
        }
      }),
    );
    expect(seen.open).toBeGreaterThan(0);
    expect(seen.ring).toBeGreaterThan(0);
    expect(seen.loop).toBeGreaterThan(0);
  }, 600_000);
});
