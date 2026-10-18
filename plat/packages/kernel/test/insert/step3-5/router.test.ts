// The router's readings and insertChain's passes (§3.6 steps 2 – 4; §3.10; §13.1 "mandatory chains never rejected for
// precision"): every reading the router tries for a segment no earlier reading keeps, each judged by §3.10's clearance
// whole and the fidelity bound, and the passes that add readings for a chain an earlier pass refused for the bound
// (insertChain.ts `routeOne`, `insertChain`; C-0202, C-0209, C-0210, C-0215, C-0217, C-0221). The describes run in the
// order of the readings they pin: the bound's measure; the first pass's fallbacks (the endpoint route and the stretch
// walk, C-0202; the step across a sliver and the re-landing, C-0209, with the bounds C-0209 states, each held by a
// constructed case; a route back over the path's own edge, C-0210; the safety nets, C-0215); the second pass (C-0215);
// the third pass's units, its rescues and the residual register (C-0217); the optional class the bound refuses
// (C-0221); the caps. The register files under register/ pin each case's warnings and refusal text.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { allocVertex, type Plat, type VertexId } from '../../../src/arena/index.js';
import { indexAdd, ITEM_VERTEX } from '../../../src/index/index.js';
import { acrossApplies, exactCrossings, placeAcross, placeOnRun, sliverPartner, stripPartner } from '../../../src/insert/crossings.js';
import { boundRefusal, FIDELITY_SQ, freeSince, freeSpot, inFidelity, land, relandCandidates } from '../../../src/insert/insertChain.js';
import { placePoint } from '../../../src/insert/placement.js';
import { recordHolding } from '../../../src/insert/snapRound.js';
import { chainJournal, inInputBound, type ChainCtx } from '../../../src/insert/stretch.js';
import { belowMinEdge, LATTICE } from '../../../src/num/index.js';
import type { Level } from '../../../src/types/index.js';
import type { ArenaSpec } from '../step1-2/support.js';
import { capPer1e4, countedRefusal, MEASURED_COUNT, MEASURED_PER_1E4, poissonCap, refusalCap } from './caps.js';
import { FIDELITY_CM, fidelityProblems } from './fidelity.js';
import { allProblems, contentPrint, edgeRows, framed, indexed, ins, liveEdges, pt, segDist, TIMEOUT, tx, wideArena } from './support.js';

// ---- the fixtures and helpers the readings share --------------------------------------------------------------------

/** §3.6 *Existing geometry wins*: an incoming chain vertex moves at most √2 · attractCm (the attracted bound of §3.7). */
const ATTRACTED_BOUND = Math.SQRT2 * 26;

/** The L0 square [0, 4 000]² as a hand-built arena's outer ring (spec vertices 0 – 3, edges 0 – 3). */
const SQUARE: ArenaSpec = {
  vertices: [[0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0]],
  edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0]],
};

/** The square with more vertices and edges. */
function square(vertices: ArenaSpec['vertices'], edges: ArenaSpec['edges']): ArenaSpec {
  return { vertices: [...SQUARE.vertices, ...vertices], edges: [...SQUARE.edges, ...edges] };
}

/**
 * A thin strip: arm 1 A (1 000, 1 000) – B (3 000, 1 000); arm 2 D (1 020, 1 015) – C (3 000, 1 040), joined to arm 1 at
 * A by the 25 cm edge A – D. D stands 15 cm from arm 1 — lawful, A is its neighbour (§3.10's one-ring) — and the strip
 * is narrower than minEdge from x = 1 020 to x ≈ 1 812 (20 cm wide at x = 1 400), so no point of either arm there keeps
 * minEdge from the other: the placement rule finds none and falls back on an arm's end, metres away.
 */
const STRIP: ArenaSpec = {
  vertices: [...SQUARE.vertices, [1000, 1000, 0], [3000, 1000, 0], [1020, 1015, 0], [3000, 1040, 0]],
  edges: [...SQUARE.edges, [4, 5, 0], [4, 6, 0], [6, 7, 0]],
};

/**
 * A chain context over a transaction (the tests call the router's parts on their own); `strip` the third pass's reading
 * (then `extended` too), none by default.
 */
function ctxOf(p: Plat, level: Level = 0, strip: 0 | 1 | null = null): ChainCtx {
  const t = tx(p, level);
  return {
    tx: t, p, n: level, cls: 'mandatory', rows: [], warnings: [], journal: chainJournal(t), pairsFrom: chainJournal(t).newPairs.length, txPairsFrom: t.journal.pairs.length, maxPass: 0, strict: false, undo: [],
    ...(strip === null ? {} : { extended: true, strip: { variant: strip, a: null, b: null } }),
  };
}

/** A free vertex (no edge) at (x, y) of `level`, entered in the index. */
function free(p: Plat, x: number, y: number, level: Level = 0): VertexId {
  const v = allocVertex(p, pt(x, y), level, 0);
  indexAdd(p, { kind: ITEM_VERTEX, level, slot: v });
  return v;
}

const at = (p: Plat, v: VertexId): [number, number] => [p.vertices.x[v], p.vertices.y[v]];

/** A commit's warnings as [code, count] pairs. */
const codes = (r: ReturnType<typeof ins>): [string, number][] => (r.ok ? r.warnings.map((w) => [w.code, w.count] as [string, number]) : []);

const d2 = (a: { x: number; y: number }, b: { x: number; y: number }): number => (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);

/** The farthest any vertex of an edge carrying the entity's row stands from the segment a–b, in cm; −1 when none does. */
function chainMove(p: Plat, entity: string, a: readonly [number, number], b: readonly [number, number]): number {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  let most = -1;
  for (const [u, v] of liveEdges(p)) {
    const rows = edgeRows(p, [X[u], Y[u]], [X[v], Y[v]]) ?? [];
    if (!rows.includes(`invisible/${entity}`)) continue;
    for (const w of [u, v]) most = Math.max(most, segDist(X[w], Y[w], a[0], a[1], b[0], b[1]));
  }
  return most;
}

/** The shrunk counterexample of B-FUZZ's random family at seed −1863295922, run-length coded: [x, y, repeats]. */
const WALK: readonly (readonly [number, number, number])[] = [
  [40, 40, 2], [70, 40, 2], [123, 40, 1], [147, 77, 1], [147, 118, 1], [193, 118, 1], [235, 118, 2], [250, 118, 1], [250, 134, 2],
  [310, 144, 3], [332, 144, 10], [332, 196, 10], [332, 226, 1], [363, 182, 1], [412, 222, 1], [412, 181, 1], [400, 183, 1],
  [437, 231, 1], [410, 177, 1], [361, 234, 1], [419, 287, 1], [466, 317, 1], [513, 358, 1], [537, 328, 1], [495, 288, 1],
  [484, 259, 1], [479, 300, 1], [444, 268, 1], [497, 210, 1], [444, 150, 1], [416, 92, 1], [391, 44, 1], [364, 61, 1],
  [421, 53, 1], [373, 57, 1], [380, 76, 1], [428, 52, 1], [387, 67, 1], [378, 84, 1], [384, 95, 1], [370, 138, 1],
  [400, 191, 1], [371, 152, 1], [404, 173, 1], [404, 165, 1], [387, 212, 1], [333, 194, 1], [335, 190, 1], [283, 223, 1],
  [267, 211, 1], [261, 224, 1], [313, 244, 1], [341, 251, 225],
];
const WALK_POINTS: [number, number][] = WALK.flatMap(([x, y, k]) => Array.from({ length: k }, () => [x, y] as [number, number]));

/** One B-FUZZ chain of a case, as B-FUZZ draws it. */
interface FuzzChain {
  readonly level: Level;
  readonly cls: 'mandatory' | 'optional';
  readonly closed: boolean;
  readonly points: readonly (readonly [number, number])[];
  readonly pinned?: readonly number[];
  readonly entity: string;
}

/** One B-FUZZ case: its chains in order, each into the framed 4 000 cm square (support.ts `framed`). */
interface FuzzCase {
  readonly seed?: string;
  readonly family: string;
  readonly case?: number;
  readonly log: readonly FuzzChain[];
}

/**
 * Replays a B-FUZZ case's chains as B-FUZZ judges them, each chain's rows of `role`: a refusal writes nothing; a commit
 * keeps the fidelity bound; the arena valid at the end. Returns the arena, the last chain's result and the content before
 * that chain.
 */
function replay(c: FuzzCase, role = 'way'): { p: Plat; r: ReturnType<typeof ins>; before: string } {
  const p = framed(4000);
  let r: ReturnType<typeof ins> | null = null;
  let before = '';
  c.log.forEach((k) => {
    const t = tx(p, k.level);
    before = contentPrint(p);
    const opts = { closed: k.closed, ...(k.pinned === undefined ? {} : { pinned: k.pinned }) };
    r = ins(t, k.points, [{ role, entity: k.entity }], k.cls, opts);
    if (r.ok) expect(fidelityProblems(p, k.level, k.cls, k.points, opts, r.value.placed, k.entity), k.entity).toEqual([]);
    else expect(contentPrint(p)).toBe(before);
  });
  expect(allProblems(p)).toEqual([]);
  return { p, r: r as unknown as ReturnType<typeof ins>, before };
}

// ---- N-43 B's fidelity bound: the measure ------------------------------------------------------------------------------

describe('N-43 B: the fidelity bound insertChain judges every route by (inFidelity, C-0215)', () => {
  it('the bound is 2 · √2 · attractCm, squared exactly: 8 · 26² = 5 408 (≈ 73.54 cm)', () => {
    expect(FIDELITY_SQ).toBe(5408);
    expect(Math.sqrt(FIDELITY_SQ)).toBeCloseTo(FIDELITY_CM, 12);
  });

  // Route to segment: a route vertex 73 cm off the input segment (0, 0) → (1 000, 0) keeps the bound (73² = 5 329 ≤
  // 5 408), one 74 cm off (5 476) does not. Segment to route: a route that stops 60 cm short of the segment's end keeps
  // it, one that stops 100 cm short does not (the end piece beyond the route's last foot is bisected).
  for (const [label, route, kept] of [
    ['a route vertex 73 cm off', [[1000, 1000], [1500, 1073], [2000, 1000]], true],
    ['a route vertex 74 cm off', [[1000, 1000], [1500, 1074], [2000, 1000]], false],
    ['a route stopping 60 cm short of the segment\'s end', [[1000, 1000], [1940, 1000]], true],
    ['a route stopping 100 cm short of the segment\'s end', [[1000, 1000], [1900, 1000]], false],
    ['a route starting 70 cm before the segment', [[930, 1000], [2000, 1000]], true],
  ] as const) {
    it(`${label}: ${kept ? 'within' : 'beyond'} the bound of the input segment (1 000, 1 000) → (2 000, 1 000)`, () => {
      const p = framed(4000);
      const ctx = ctxOf(p);
      const m = { newPairs: ctx.journal.newPairs.length, shared: ctx.journal.sharedPairs.length };
      const r = ins(ctx.tx, route, [{ role: 'way', entity: 'way:r' }]);
      expect(r.ok).toBe(true);
      expect(inFidelity(ctx, m, pt(1000, 1000), pt(2000, 1000))).toBe(kept);
    });
  }
});

// ---- the endpoint route and the stretch walk (C-0202) -------------------------------------------------------------------
//
// M0-a-05 fix round S1: the session's ruling N-37 (J186; C-0202). The placement rule's clearance test (iii) exempts the
// edges at a crossing's ends, on the assumption that the edge to that end is written; where the re-route then reached
// that end through another vertex instead, the router found no route keeping clearance and threw. §3.6 promises the
// opposite — when no candidate qualifies the vertex moves onto the nearer endpoint and "each such re-route lands on an
// existing vertex, so the loop ends" — so before any refusal `routeSegment` re-routes the segment with every crossing on
// the placement's endpoint fallback (W_PLACED); only a route that still breaks clearance is refused, E_INVARIANT, never
// a bare Error. The repro is M0-a-08's (seven two-point mandatory chains of one self-crossing ring, from its §3.7 (i)
// buffer agreement); the seventh threw "insert: no route … keeps clearance".

const RING: readonly (readonly [number, number])[] = [[-48863, 44833], [-48080, 46354], [-48522, 45607], [-48031, 46325], [-48468, 45739], [-47267, 47616], [-48140, 46382]];

describe('N-37: the router\'s endpoint-fallback route before any refusal', () => {
  it('the seven two-point chains of M0-a-08\'s self-crossing ring all commit, one by one, the arena valid after each (§3.10); the seventh lands its crossing on an existing vertex (W_PLACED)', () => {
    const p = wideArena();
    const t = tx(p, 0);
    for (let i = 0; i < RING.length; i++) {
      const r = ins(t, [RING[i], RING[(i + 1) % RING.length]], [{ role: 'invisible', entity: `s${i}` }]);
      expect(r.ok, `chain ${i}: ${r.ok ? '' : `${r.code} ${r.detail}`}`).toBe(true);
      expect(allProblems(p)).toEqual([]);
      if (i === RING.length - 1 && r.ok) expect(r.warnings.map((w) => w.code)).toContain('W_PLACED');
    }
  });

  // N-37 and C-0202 (1): the endpoint route lands each crossing on the crossed sub-edge's NEARER vertex (the placement
  // rule's fallback, §3.6), its other end only when the nearer one is already on the chain's path. The seventh chain,
  // (−48140, 46382) → (−48863, 44833), crosses the sub-edge (−48450, 45728)–(−48080, 46354) and lands on its nearer end,
  // 4.30 cm from the segment; the farther end stands 66.21 cm from it — beyond √2 · attractCm (fix round S2, mutant K7 of
  // the closing check: a fallback preferring the farther end). Every vertex of the chain's edges then stands within the
  // attracted bound of its segment (the farthest, an attracted vertex, 20.10 cm).
  it('the seventh chain\'s endpoint route lands its crossing on the nearer end of the crossed sub-edge, (−48450, 45728), and the chain stays within √2 · attractCm of its segment', () => {
    const p = wideArena();
    const t = tx(p, 0);
    for (let i = 0; i < RING.length - 1; i++) expect(ins(t, [RING[i], RING[i + 1]], [{ role: 'invisible', entity: `s${i}` }]).ok).toBe(true);
    const last = RING.length - 1;
    const r = ins(t, [RING[last], RING[0]], [{ role: 'invisible', entity: `s${last}` }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(r.warnings.filter((w) => w.code === 'W_PLACED')).toEqual([{ code: 'W_PLACED', count: 1, at: { x: -48450, y: 45728 } }]);
    expect(segDist(-48450, 45728, RING[last][0], RING[last][1], RING[0][0], RING[0][1])).toBeCloseTo(4.30, 2);
    expect(segDist(-48080, 46354, RING[last][0], RING[last][1], RING[0][0], RING[0][1])).toBeGreaterThan(ATTRACTED_BOUND);
    const move = chainMove(p, `s${last}`, RING[last], RING[0]);
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThanOrEqual(ATTRACTED_BOUND);
    expect(allProblems(p)).toEqual([]);
  });

  it('inserted as one closed mandatory chain, the same ring commits and the arena is valid', () => {
    const p = wideArena();
    const r = ins(tx(p, 0), RING, [{ role: 'invisible', entity: 'ring' }], 'mandatory', { closed: true });
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    expect(allProblems(p)).toEqual([]);
  });
});

/**
 * M0-a-08's buffer case 391 of 3 000 (seed 23), the last of its overlays: a frame and 29 two-point mandatory chains. The
 * 29th threw "a stretch's join and leave points lie on one route piece": the route to the stretch's join point had split
 * the piece between join and leave.
 */
const FRAME_391: readonly (readonly [number, number])[] = [[19881, 54480], [30094, 54480], [30094, 66304], [19881, 66304]];
const CHAINS_391: readonly (readonly (readonly [number, number])[])[] = [
  [[24006, 58603], [25002, 60330]],
  [[25002, 60330], [25998, 62057]],
  [[25998, 62057], [25972, 62072]],
  [[25972, 62072], [24976, 60345]],
  [[24976, 60345], [23980, 58618]],
  [[23980, 58618], [24006, 58603]],
  [[25972, 62072], [25967, 62075]],
  [[25967, 62075], [25956, 62082]],
  [[25956, 62082], [25950, 62085]],
  [[25950, 62085], [24976, 60345]],
  [[24002, 58605], [24976, 60345]],
  [[25950, 62085], [25925, 62099]],
  [[25925, 62099], [24951, 60359]],
  [[24951, 60359], [23977, 58619]],
  [[23977, 58619], [24002, 58605]],
  [[25925, 62099], [25918, 62103]],
  [[25918, 62103], [25904, 62111]],
  [[25904, 62111], [25896, 62115]],
  [[25896, 62115], [24951, 60359]],
  [[24006, 58603], [24951, 60359]],
  [[25896, 62115], [25870, 62129]],
  [[25870, 62129], [24925, 60373]],
  [[24925, 60373], [23980, 58617]],
  [[23980, 58617], [24006, 58603]],
  [[25870, 62129], [25851, 62139]],
  [[25851, 62139], [25810, 62160]],
  [[25810, 62160], [25790, 62170]],
  [[25790, 62170], [24925, 60373]],
  [[24060, 58576], [24925, 60373]],
];

describe('N-37: a stretch whose join point\'s route split the piece before its leave point is walked along the run', () => {
  // The S1 – S3 router committed the 29th chain by the run walk (W_STRETCH_SHARED 4, W_ATTRACTED 4) with route vertices
  // up to 84 cm from its segment — beyond N-43 B's fidelity bound of 2 · √2 · attractCm. The S4 router refused it
  // E_INVARIANT (a register case, N-44 (4); C-0215). S5's third pass (C-0217) commits it within the bound, its far
  // fallbacks placed in bound (W_PLACED 4). The walk stays pinned by the same chain 10 cm west, which commits within the
  // bound through it.
  it('M0-a-08\'s buffer case 391: the first 28 chains commit (or collapse, E_DEGENERATE empty), the arena valid; the 29th, beyond the fidelity bound on every route of the first two passes, commits within it on the third (C-0217)', () => {
    const p = wideArena();
    const t = tx(p, 0);
    expect(ins(t, FRAME_391, [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true }).ok).toBe(true);
    CHAINS_391.forEach((c, i) => {
      const last = i === CHAINS_391.length - 1;
      const before = last ? contentPrint(p) : '';
      const r = ins(t, c, [{ role: 'invisible', entity: `arr:s${i}` }]);
      if (!last) {
        if (!r.ok) expect(`${r.code} ${r.detail}`).toBe('E_DEGENERATE empty');
        return;
      }
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(before.length).toBeGreaterThan(0);
      expect(r.warnings.map((w) => [w.code, w.count])).toEqual([['W_PLACED', 4], ['W_ATTRACTED', 3], ['W_ACUTE_CORNER', 5], ['W_STRETCH_SHARED', 2]]);
      expect(fidelityProblems(p, 0, 'mandatory', c, {}, r.value.placed, `arr:s${i}`)).toEqual([]);
    });
    expect(allProblems(p)).toEqual([]);
  });

  // The walk shares the run's pieces from join to leave as they stand. Routing join → leave as any segment instead (the
  // walk's own fallback) re-attracts the vertices the join point's route split in — two W_ATTRACTED and two
  // W_STRETCH_SHARED more (7 and 5, measured with the walk removed), which pins the walk.
  it('the same 28 chains, then the 29th 10 cm west, (24 050, 58 576) → (24 915, 60 373): it commits within the fidelity bound, the arena valid, sharing a stretch by the run walk (W_STRETCH_SHARED 3, W_ATTRACTED 5)', () => {
    const p = wideArena();
    const t = tx(p, 0);
    expect(ins(t, FRAME_391, [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true }).ok).toBe(true);
    CHAINS_391.slice(0, -1).forEach((c, i) => {
      const r = ins(t, c, [{ role: 'invisible', entity: `arr:s${i}` }]);
      if (!r.ok) expect(`${r.code} ${r.detail}`).toBe('E_DEGENERATE empty');
    });
    const west: [number, number][] = [[24050, 58576], [24915, 60373]];
    const r = ins(t, west, [{ role: 'invisible', entity: 'arr:west' }]);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const count = (code: string): number => r.warnings.find((w) => w.code === code)?.count ?? 0;
    expect(count('W_STRETCH_SHARED')).toBe(3);
    expect(count('W_ATTRACTED')).toBe(5);
    expect(fidelityProblems(p, 0, 'mandatory', west, {}, r.value.placed, 'arr:west')).toEqual([]);
    expect(allProblems(p)).toEqual([]);
  });
});

// ---- the step across a sliver and the re-landing (C-0209) ---------------------------------------------------------------
//
// M0-a-05 session fix round S3: the session's ruling N-42 (J192; C-0209). Two mandatory chains that the S1/S2 router
// (N-37's endpoint route included) still refused E_INVARIANT "insert: no route … keeps clearance (§3.10)"; §13.1 and
// C-0177 (14): a mandatory chain is never rejected for precision. Each now commits, §3.10 kept, through a fallback that
// reports W_PLACED (N-40), and moves no vertex beyond §3.6's bounds.
//
// (a) M0-a-08's PR-size buffer agreement (~/maps-scratch/M0-a-08-blockers/einvariant-repro.json): eight two-point
// mandatory chains, then a ninth, (32070, 35526) → (30953, 35363). Its segment crosses the edges (31868, 35406)–(30183,
// 35876) and (31926, 35390)–(30615, 35718) 19.4 cm apart: two edges of a 1.4° corner at (31926, 35390) bridged by the
// 60 cm edge to (31868, 35406), a sliver narrower than minEdge where the segment meets it. The placement rule finds no
// point for the first crossing — (iii) reads the second edge, 19.4 cm off, as outside the new vertex's one-ring — and its
// fallback lands it on (31868, 35406), 212 cm along the edge and 90 cm off the segment; the route from there wedges to
// (31926, 35390), step 3 takes it through (31895, 35384), and the last edge passes 22.6 cm from (31868, 35406). The
// strict route, the route along existing edges and the endpoint route end the same way. The fix places the first
// crossing across the sliver (crossings.ts `placeAcross`): the placement's tests with the second crossed sub-edge left
// out of (iii), the second crossing then placed in its turn at least minEdge away, so each sub-edge lies in the other
// vertex's one-ring; the route is checked whole before it commits.
//
// (b) The kernel's own B-FUZZ, random family, PLAT_FUZZ_SEED=−1863295922 (M0-a-14 close-r1 note 23), shrunk: one L0
// mandatory random walk on the framed arena. Its last segment, (313, 244) → (341, 251), is routed by step 3 through
// (332, 226) — 22.1 cm from it — and then through (361, 234) — 24.6 cm from the rest; the first new edge then stands
// 24.3 cm from the segment's own free end (341, 251), outside its one-ring. No route reaches (341, 251) with clearance:
// the direct edge passes (332, 226) at 22.1 cm, the route through (332, 226) alone passes (361, 234) at 24.6 cm. The fix
// re-lands that free end (insertChain's `reland`) onto the nearest existing vertex within √2 · attractCm whose segment
// routes clear: (361, 234), 26.2 cm off.

const SLIVER_FRAME: readonly (readonly [number, number])[] = [[26030, 29363], [38207, 29363], [38207, 41692], [26030, 41692]];
const SLIVER_CHAINS: readonly (readonly [readonly [number, number], readonly [number, number]])[] = [
  [[32036, 35383], [32004, 36464]],
  [[31986, 35423], [30894, 36279]],
  [[31311, 35898], [31985, 35374]],
  [[32021, 35395], [30183, 35876]],
  [[30615, 35718], [31922, 35376]],
  [[31922, 35376], [30148, 35027]],
  [[31883, 35491], [31873, 35425]],
  [[31882, 35393], [32024, 35436]],
  [[32070, 35526], [30953, 35363]],
];

/** The crossing of the segment a–b with the line u–w (exact enough for a premise check). */
function cross(a: readonly [number, number], b: readonly [number, number], u: readonly [number, number], w: readonly [number, number]): [number, number] {
  const d1 = [b[0] - a[0], b[1] - a[1]];
  const d2 = [w[0] - u[0], w[1] - u[1]];
  const den = d1[0] * d2[1] - d1[1] * d2[0];
  const t = ((u[0] - a[0]) * d2[1] - (u[1] - a[1]) * d2[0]) / den;
  return [a[0] + t * d1[0], a[1] + t * d1[1]];
}

describe('N-42 (a): a crossing on the near side of a sliver is placed across it', () => {
  it('the premise: after the eighth chain the ninth segment meets the edges (31868, 35406)–(30183, 35876) and (31926, 35390)–(30615, 35718) 19.4 cm apart, both standing in the arena', () => {
    const p = wideArena(64);
    const t = tx(p, 0);
    for (let i = 0; i < 8; i++) expect(ins(t, SLIVER_CHAINS[i], [{ role: 'invisible', entity: `s${i}` }]).ok).toBe(true);
    expect(edgeRows(p, [31868, 35406], [30183, 35876])).not.toBeNull();
    expect(edgeRows(p, [31926, 35390], [30615, 35718])).not.toBeNull();
    const c1 = cross(SLIVER_CHAINS[8][0], SLIVER_CHAINS[8][1], [31868, 35406], [30183, 35876]);
    const c2 = cross(SLIVER_CHAINS[8][0], SLIVER_CHAINS[8][1], [31926, 35390], [30615, 35718]);
    expect(Math.hypot(c1[0] - c2[0], c1[1] - c2[1])).toBeLessThan(25);
    expect(Math.hypot(c1[0] - c2[0], c1[1] - c2[1])).toBeCloseTo(19.42, 2);
  });

  // placeAcross on its own (crossings.ts): the segment's remainder from the crossing it placed on (31879, 35456)–(31311,
  // 35898), i.e. (31834, 35491) → (30953, 35363), stood up as two free vertices on the eighth chain's arena.
  it('placeAcross: the near crossing qualifies only with the far side\'s sub-edge left out of (iii) — (31656, 35465), W_PLACED; with any other partner no point qualifies (the far edge stands 19.4 cm off)', () => {
    const p = wideArena(64);
    const t = tx(p, 0);
    for (let i = 0; i < 8; i++) expect(ins(t, SLIVER_CHAINS[i], [{ role: 'invisible', entity: `s${i}` }]).ok).toBe(true);
    const free = (x: number, y: number): VertexId => {
      const v = allocVertex(p, pt(x, y), 0, 0);
      indexAdd(p, { kind: ITEM_VERTEX, level: 0, slot: v });
      return v;
    };
    const a = free(31834, 35491);
    const b = free(30953, 35363);
    const ctx: ChainCtx = { tx: t, p, n: 0, cls: 'mandatory', rows: [], warnings: [], journal: chainJournal(t), pairsFrom: chainJournal(t).newPairs.length, txPairsFrom: t.journal.pairs.length, maxPass: 0, strict: false, undo: [] };
    const cs = exactCrossings(ctx, a, b);
    expect(cs.ok).toBe(true);
    if (!cs.ok) return;
    const X = p.vertices.x;
    const Y = p.vertices.y;
    const on = (u: readonly [number, number], w: readonly [number, number]) => cs.value.find((c) => {
      const ends = [[X[c.piece.a], Y[c.piece.a]], [X[c.piece.b], Y[c.piece.b]]].map((q) => q.join(','));
      return ends.includes(u.join(',')) && ends.includes(w.join(','));
    });
    const near = on([31868, 35406], [30183, 35876]);
    const far = on([31926, 35390], [30615, 35718]);
    expect(near).toBeDefined();
    expect(far).toBeDefined();
    if (near === undefined || far === undefined) return;
    const across = placeAcross(ctx, a, b, near, far);
    expect(across.ok).toBe(true);
    if (!across.ok) return;
    expect(across.value).not.toBeNull();
    if (across.value === null || across.value.kind !== 'split') throw new Error('a split landing');
    expect(across.value.plan.at).toEqual({ x: 31656, y: 35465 });
    expect(across.value.warnings).toEqual([{ code: 'W_PLACED', count: 1, at: { x: 31656, y: 35465 } }]);
    // The near crossing as its own partner: the far edge is read in (iii), and every candidate stands within minEdge of it.
    const alone = placeAcross(ctx, a, b, near, near);
    expect(alone.ok && alone.value).toBe(null);
  });

  for (const cell of [64, 512]) {
    for (const frame of [false, true]) {
      for (const reversed of [false, true]) {
        it(`grid ${cell} cm, ${frame ? 'with' : 'without'} the frame, the ninth chain ${reversed ? 'reversed' : 'as drawn'}: all nine commit, the arena valid after each (§3.10); the ninth reports W_PLACED, first at its crossing placed across the sliver, and stays within √2 · attractCm of its segment`, () => {
          const p = wideArena(cell);
          const t = tx(p, 0);
          if (frame) expect(ins(t, SLIVER_FRAME, [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true }).ok).toBe(true);
          for (let i = 0; i < SLIVER_CHAINS.length; i++) {
            const c = reversed && i === 8 ? [SLIVER_CHAINS[i][1], SLIVER_CHAINS[i][0]] : SLIVER_CHAINS[i];
            const r = ins(t, c, [{ role: 'invisible', entity: `s${i}` }]);
            expect(r.ok, `chain ${i}: ${r.ok ? '' : `${r.code} ${r.detail}`}`).toBe(true);
            expect(allProblems(p)).toEqual([]);
            if (i === 8 && r.ok) {
              // Two placements away from their nearest lattice points: the crossing placed across the sliver (first, so
              // the folded warning's point) and the far side's crossing, placed in its turn at least minEdge from it.
              const at = reversed ? { x: 31637, y: 35462 } : { x: 31656, y: 35465 };
              expect(r.warnings.filter((w) => w.code === 'W_PLACED')).toEqual([{ code: 'W_PLACED', count: 2, at }]);
            }
          }
          const move = chainMove(p, 's8', SLIVER_CHAINS[8][0], SLIVER_CHAINS[8][1]);
          expect(move).toBeGreaterThanOrEqual(0);
          expect(move).toBeLessThanOrEqual(ATTRACTED_BOUND);
          expect(move).toBeCloseTo(reversed ? 2.44 : 2.04, 2);
          // The step across: the two placed crossings stand at least minEdge apart, joined by one edge of the chain.
          const across = reversed ? [[31637, 35462], [31662, 35464]] : [[31656, 35465], [31631, 35464]];
          expect(edgeRows(p, across[0] as [number, number], across[1] as [number, number])).toContain('invisible/s8');
          expect(Math.hypot(across[0][0] - across[1][0], across[0][1] - across[1][1])).toBeGreaterThanOrEqual(25);
        });
      }
    }
  }
});

/**
 * A sliver arena (valid, §3.10): the corner (1 000, 1 000) with its arm to (3 000, 1 000), bridged by the 61.8 cm edge to
 * (1 060, 1 015), whose arm runs to (3 000, 1 030) — the two arms 15.3 cm apart at x = 1 100, 26.1 cm apart at x = 2 500.
 */
const SLIVER = square([[1000, 1000, 0], [3000, 1000, 0], [1060, 1015, 0], [3000, 1030, 0]], [[4, 5, 0], [4, 6, 0], [6, 7, 0]]);

describe('C-0209\'s sliver partner: the next crossing on another piece closer than minEdge (mutant KF)', () => {
  it('a segment down x = 1 100 crosses the two arms 15.3 cm apart: a sliver, its far crossing the partner; down x = 2 500, 26.1 cm apart: none', () => {
    const b = indexed(SLIVER);
    const p = b.plat;
    expect(allProblems(p)).toEqual([]);
    const ctx = ctxOf(p);
    for (const [x, gap, partnered] of [[1100, 15.3, true], [2500, 26.1, false]] as const) {
      const a = free(p, x, 1300);
      const z = free(p, x, 700);
      const cs = exactCrossings(ctx, a, z);
      expect(cs.ok).toBe(true);
      if (!cs.ok) return;
      expect(cs.value).toHaveLength(2);
      expect(Math.abs(cs.value[0].y - cs.value[1].y)).toBeCloseTo(gap, 1);
      const s = sliverPartner(ctx, a, z, cs.value[0]);
      expect(s.ok).toBe(true);
      if (!s.ok) return;
      expect(s.value === null ? null : s.value.y).toBe(partnered ? cs.value[1].y : null);
    }
  });
});

describe('C-0209\'s across placement: the nearest qualifying point within attractCm of the exact crossing, else none (mutant KG)', () => {
  // The edge (1 000, 2 000)–(3 000, 2 000) crossed at (2 000, 2 000) by the segment (2 000, 2 300) → (2 000, 1 700). With a
  // vertex at (2 000, 2 100), every point of the band within attractCm (|dx| ≤ 26) puts the new edge to (2 000, 2 300)
  // within minEdge of it (17.3 cm at dx = 26); the first that clears it lies 38 cm off (25.1 cm) — beyond attractCm.
  for (const [blocked, expected] of [[false, { x: 2000, y: 2000 }], [true, null]] as const) {
    it(blocked ? 'a vertex at (2 000, 2 100): no point within attractCm qualifies — none (the first at 38 cm is not taken)' : 'no vertex beside it: the exact crossing (2 000, 2 000), W_PLACED', () => {
      const b = indexed(square([[1000, 2000, 0], [3000, 2000, 0]], [[4, 5, 0]]));
      const p = b.plat;
      const ctx = ctxOf(p);
      const a = free(p, 2000, 2300);
      const z = free(p, 2000, 1700);
      if (blocked) free(p, 2000, 2100);
      const cs = exactCrossings(ctx, a, z);
      expect(cs.ok && cs.value.length).toBe(1);
      if (!cs.ok) return;
      const l = placeAcross(ctx, a, z, cs.value[0], cs.value[0]);
      expect(l.ok).toBe(true);
      if (!l.ok) return;
      expect(l.value === null ? null : l.value.kind === 'split' ? l.value.plan.at : 'vertex').toEqual(expected);
    });
  }
});

describe('C-0209: the step across a sliver applies only where the placement fell back on its endpoint (mutant KE)', () => {
  it('a fallback landing: yes; a landing on a piece\'s end within attractCm, on a finer vertex, or a split: no', () => {
    expect(acrossApplies({ kind: 'vertex', vertex: 7, onto: 'fallback', warnings: [] })).toBe(true);
    expect(acrossApplies({ kind: 'vertex', vertex: 7, onto: 'endpoint', warnings: [] })).toBe(false);
    expect(acrossApplies({ kind: 'vertex', vertex: 7, onto: 'finer', warnings: [] })).toBe(false);
    expect(acrossApplies({ kind: 'split', plan: { kind: 'new', at: pt(1, 1), sub: 0, row: null, warnings: [] }, warnings: [] })).toBe(false);
  });
});

describe('N-42 (b): a free end no route reaches with clearance is re-landed', () => {
  it('the shrunk walk (301 points) commits on the framed arena, valid (§3.10); its last point lands on (361, 234), 26.2 cm off — within √2 · attractCm — reported W_PLACED there', () => {
    expect(WALK_POINTS).toHaveLength(301);
    const p = framed(4000);
    const r = ins(tx(p, 0), WALK_POINTS, [{ role: 'way', entity: 'way:x' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(allProblems(p)).toEqual([]);
    expect(r.warnings.filter((w) => w.code === 'W_PLACED')).toEqual([{ code: 'W_PLACED', count: 1, at: { x: 361, y: 234 } }]);
    const last = r.value.placed[WALK_POINTS.length - 1];
    expect([p.vertices.x[last], p.vertices.y[last]]).toEqual([361, 234]);
    const moved = Math.hypot(361 - 341, 234 - 251);
    expect(moved).toBeCloseTo(26.2, 1);
    expect(moved).toBeLessThanOrEqual(ATTRACTED_BOUND);
    // Every input point lands within N-40's wedge cap 2 · √2 · attractCm of where it was drawn (the farthest, 42.06 cm
    // at (378, 84), is a wedge route's corner, W_WEDGE_ROUTED — as on the S1/S2 router; the re-landing moves 26.2 cm).
    let most = 0;
    for (let i = 0; i < WALK_POINTS.length; i++) {
      const v = r.value.placed[i];
      most = Math.max(most, Math.hypot(p.vertices.x[v] - WALK_POINTS[i][0], p.vertices.y[v] - WALK_POINTS[i][1]));
    }
    expect(most).toBeLessThanOrEqual(2 * ATTRACTED_BOUND);
    expect(most).toBeCloseTo(42.06, 2);
  });

  it('the start re-landed: after the walk without its last point, a chain from the free point (341, 251) to the walk\'s (313, 244) commits valid, its start on (361, 234) (W_PLACED)', () => {
    const p = framed(4000);
    const cut = WALK_POINTS.findIndex(([x, y]) => x === 341 && y === 251);
    expect(cut).toBe(76);
    expect(ins(tx(p, 0), WALK_POINTS.slice(0, cut), [{ role: 'way', entity: 'way:x' }]).ok).toBe(true);
    const r = ins(tx(p, 0), [[341, 251], [313, 244]], [{ role: 'way', entity: 'way:y' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(allProblems(p)).toEqual([]);
    expect(r.warnings.filter((w) => w.code === 'W_PLACED')).toEqual([{ code: 'W_PLACED', count: 1, at: { x: 361, y: 234 } }]);
    expect(r.value.placed.map((v) => [p.vertices.x[v], p.vertices.y[v]])).toEqual([[361, 234], [313, 244]]);
  });

  it('the same walk reversed commits valid with no fallback (the router reaches (341, 251) first, as a start)', () => {
    const p = framed(4000);
    const r = ins(tx(p, 0), [...WALK_POINTS].reverse(), [{ role: 'way', entity: 'way:x' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(allProblems(p)).toEqual([]);
    expect(r.warnings.filter((w) => w.code === 'W_PLACED')).toEqual([]);
  });
});

// ---- C-0209's stated bounds on N-42's fallback routes -------------------------------------------------------------------

describe('C-0209\'s bounds on N-42 (b)\'s re-landing: candidates within √2 · attractCm, of level ≤ n, nearest first (mutants KA, KP)', () => {
  it('round (2 000, 2 000) at L0: (2 036, 2 000) at 36 cm and (2 030, 2 020) at 36.06 cm are candidates; (2 037, 2 000) at 37 cm and (2 000, 2 050) are beyond √2 · 26 ≈ 36.77 cm; the L1 vertex (1 990, 2 000) at 10 cm is finer', () => {
    const p = framed(4000);
    const ctx = ctxOf(p);
    const near = free(p, 2036, 2000);
    const tie = free(p, 2030, 2020);
    free(p, 2037, 2000);
    free(p, 2000, 2050);
    free(p, 1990, 2000, 1);
    const cs = relandCandidates(ctx, pt(2000, 2000), -1);
    expect(cs.ok).toBe(true);
    if (!cs.ok) return;
    expect(cs.value.map((v) => at(p, v))).toEqual([at(p, near), at(p, tie)]);
  });
});

describe('C-0209\'s "free": a vertex the op placed with no edge yet — not a vertex it placed that has edges (mutant KC)', () => {
  it('the vertices a committed chain placed have edges: not free; a vertex the op placed alone is', () => {
    const p = framed(4000);
    const ctx = ctxOf(p);
    const r = ins(ctx.tx, [[1000, 1000], [2000, 1000]], [{ role: 'way', entity: 'way:w' }]);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    for (const v of r.value.placed) {
      expect(ctx.tx.journal.vertices).toContain(v);
      expect(freeSince(ctx, { vertices: 0 }, v)).toBe(false);
    }
    const alone = free(p, 3000, 3000);
    ctx.tx.journal.vertices.push(alone);
    expect(freeSince(ctx, { vertices: 0 }, alone)).toBe(true);
    expect(freeSince(ctx, { vertices: ctx.tx.journal.vertices.length }, alone)).toBe(false);
  });
});

describe('C-0209: E_WORK_LIMIT ends the op, the re-landing\'s candidate routes included (mutant KN)', () => {
  // The walk commits with its last point re-landed (N-42 (b)); of its whole work, the units 20 – 11 below the total are
  // the re-landing's candidate routes (the last 10, the re-walk's face charges, come several at a time). Under each work
  // limit in that window the op is refused E_WORK_LIMIT at the charge that crosses the limit — the transaction's work
  // stops within one charge (≤ 2 units, step 3's) of it; trying further candidates after the limit was crossed charges
  // more (4 – 5 units here, measured with that stop removed).
  it('the shrunk walk under each work limit inside its re-landing: E_WORK_LIMIT, the work stopping within 2 units of the limit', () => {
    const whole = tx(framed(4000), 0);
    expect(ins(whole, WALK_POINTS, [{ role: 'way', entity: 'way:x' }]).ok).toBe(true);
    const total = whole.work.total;
    for (let limit = total - 20; limit <= total - 11; limit++) {
      const t = tx(framed(4000), 0, limit);
      const r = ins(t, WALK_POINTS, [{ role: 'way', entity: 'way:x' }]);
      expect(r.ok ? 'ok' : r.code, `limit ${limit}`).toBe('E_WORK_LIMIT');
      expect(t.work.total - limit, `limit ${limit}`).toBeLessThanOrEqual(2);
    }
  }, TIMEOUT);
});

// ---- the gate's throw (C-0210) ------------------------------------------------------------------------------------------

// Found by this round's testkit gate (M0-a-08's buffer agreement, seed −1969745361, an `arb-stroke` round buffer of
// 610 cm): the S1/S2 router THREW "the router planned an edge overlapping an edge at (−64719, −64412)" — pre-existing (the
// same throw with N-42's routes off). Reduced to four two-point mandatory chains. The fourth, (−64721, −64385) →
// (−64261, −64493), lands its start on (−64728, −64387), is routed by step 3 through (−64719, −64412), and from there
// wedge-routed to the corner (−64737, −64362) (53.1 cm, under N-40's cap) — straight back over its own start, which the
// path's exclusion hid from step 3, so the planned edge overlapped the existing (−64719, −64412)–(−64728, −64387). The
// router now routes such a segment through the vertex the edge joins it to, sharing the edge (`alongEdge`).
const OVERLAP: readonly (readonly [readonly [number, number], readonly [number, number]])[] = [
  [[-64719, -64412], [-64737, -64362]],
  [[-64310, -64613], [-64737, -64362]],
  [[-64737, -64362], [-64325, -64638]],
  [[-64721, -64385], [-64261, -64493]],
];

describe('C-0210: a route that would run back over an edge of its own path shares it', () => {
  for (const cell of [64, 256, 512]) {
    it(`grid ${cell} cm: the four chains commit, the arena valid after each (§3.10); the fourth shares (−64719, −64412)–(−64728, −64387)–(−64737, −64362) and writes one edge on to its end`, () => {
      const p = wideArena(cell);
      const t = tx(p, 0);
      for (let i = 0; i < OVERLAP.length; i++) {
        const r = ins(t, OVERLAP[i], [{ role: 'invisible', entity: `o${i}` }]);
        expect(r.ok, `chain ${i}: ${r.ok ? '' : `${r.code} ${r.detail}`}`).toBe(true);
        expect(allProblems(p)).toEqual([]);
      }
      expect(edgeRows(p, [-64719, -64412], [-64728, -64387])).toEqual(expect.arrayContaining(['invisible/o0', 'invisible/o3']));
      expect(edgeRows(p, [-64728, -64387], [-64737, -64362])).toEqual(expect.arrayContaining(['invisible/o0', 'invisible/o3']));
      expect(edgeRows(p, [-64737, -64362], [-64261, -64493])).toEqual(['invisible/o3']);
    });
  }
});

// ---- the safety nets (N-44 (1)) -------------------------------------------------------------------------------------------

describe('N-44 (1): an invariant failure inside insertChain is a typed refusal, never a throw', () => {
  // An arena that already breaks §3.10 (built by hand; no valid input reaches this): (1 000, 1 000) stands 22 cm from
  // the edge (978, 900)–(978, 1 100), not joined to it. A chain whose end lands on the edge (1 000, 1 000)–(3 000, 1 000)
  // by a split at (2 000, 1 000) makes (1 000, 1 000) a neighbour of a new vertex, so the op's final clearance check,
  // round everything it wrote, reads the old breach: the S1 – S3 op threw there (as N-43 A's s160 did on the arena s157
  // had broken); now it refuses E_INVARIANT and writes nothing.
  it('the final clearance check: a breach round the chain\'s writes refuses the op E_INVARIANT with the check\'s message', () => {
    const b = indexed(square([[1000, 1000, 0], [3000, 1000, 0], [978, 900, 0], [978, 1100, 0]], [[4, 5, 0], [6, 7, 0]]));
    const p = b.plat;
    expect(allProblems(p).some((s) => s.includes('(1000, 1000)'))).toBe(true);
    const before = contentPrint(p);
    const r = ins(tx(p, 0), [[2000, 2000], [2000, 1010]], [{ role: 'way', entity: 'way:x' }]);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toMatch(/^insert: the vertex \(1000, 1000\) stands within minEdge of the edge \(978, (900|1100)\)–\(978, (900|1100)\)$/);
    expect(contentPrint(p)).toBe(before);
  });

  // Fault injection (no valid input throws, so the net is pinned with a programming error that reaches a check inside the
  // op): a chain class neither mandatory nor optional passes step 1 (no collapse reads it) and meets classOutcome's check
  // at the chain's first corner below minFaceAngle, inside the op; the op refuses E_INVARIANT with the check's message,
  // writing nothing, where the S1 – S3 op threw.
  it('an invariant check\'s throw inside the op is refused E_INVARIANT with the check\'s message, writing nothing', () => {
    const p = framed(4000);
    expect(ins(tx(p, 0), [[1000, 1000], [3000, 1000]], [{ role: 'way', entity: 'way:a' }]).ok).toBe(true);
    const before = contentPrint(p);
    const r = ins(tx(p, 0), [[2000, 1500], [2000, 1000], [2600, 1030]], [{ role: 'way', entity: 'way:x' }], 'bogus' as 'mandatory');
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toBe('insert: a chain class is mandatory or optional, not bogus');
    expect(contentPrint(p)).toBe(before);
  });
});

// ---- the two passes -----------------------------------------------------------------------------------------------------

/** One random-family case of register/pass2.json: the framed arena, earlier chains (coarse first), the chain. */
interface Pass2Case {
  readonly name: string;
  readonly case: {
    readonly level: Level;
    readonly cls: 'mandatory' | 'optional';
    readonly closed: boolean;
    readonly points: readonly (readonly [number, number])[];
    readonly base: readonly { readonly level: Level; readonly cls: 'mandatory' | 'optional'; readonly closed: boolean; readonly points: readonly (readonly [number, number])[] }[];
  };
}

const PASS2 = JSON.parse(readFileSync(new URL('./register/pass2.json', import.meta.url), 'utf8')) as Pass2Case[];

function replayPass2(name: string): { p: Plat; r: ReturnType<typeof ins>; c: Pass2Case['case']; before: string } {
  const e = PASS2.find((x) => x.name === name);
  if (e === undefined) throw new Error(`no case ${name}`);
  const c = e.case;
  const p = framed(4000);
  c.base.forEach((b, k) => expect(ins(tx(p, b.level), b.points, [{ role: 'way', entity: `way:b${k}` }], b.cls, { closed: b.closed }).ok).toBe(true));
  const before = contentPrint(p);
  const r = ins(tx(p, c.level), c.points, [{ role: 'way', entity: 'way:x' }], c.cls, { closed: c.closed });
  return { p, r, c, before };
}
describe('insertChain\'s second pass (C-0215): a chain the first pass refuses E_INVARIANT is tried with the anchored routes and the split route', () => {
  // Each case came from B-FUZZ's random family on this round's first pass (the S1 – S3 router judged by the bound): its
  // design route drifted beyond the bound along a near-parallel random walk, or a crossing fell back far along an edge.
  it('the anchored route (step 3\'s contacts within attractCm of the input segment): an L1 mandatory ring of 8 points commits within the bound', () => {
    const { p, r, c } = replayPass2('r6');
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(codes(r)).toEqual([['W_ATTRACTED', 12], ['W_STRETCH_SHARED', 5], ['W_ACUTE_CORNER', 1]]);
    expect(fidelityProblems(p, c.level, c.cls, c.points, { closed: c.closed }, r.value.placed, 'way:x')).toEqual([]);
    expect(allProblems(p)).toEqual([]);
  }, TIMEOUT);

  it('the anchored route with the bound\'s reach (contacts within 2 · √2 · attractCm of the input segment): an L4 mandatory chain of 9 points commits within the bound', () => {
    const { p, r, c } = replayPass2('r7');
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(codes(r)).toEqual([['W_ATTRACTED', 35], ['W_STRETCH_SHARED', 24]]);
    expect(fidelityProblems(p, c.level, c.cls, c.points, { closed: c.closed }, r.value.placed, 'way:x')).toEqual([]);
    expect(allProblems(p)).toEqual([]);
  }, TIMEOUT);

  it('the split route (the segment halved at its input midpoint, a half halved again): an L2 mandatory chain of 11 points commits within the bound, the split points reported W_PLACED', () => {
    const { p, r, c } = replayPass2('split');
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(codes(r)).toEqual([['W_ATTRACTED', 3], ['W_ACUTE_CORNER', 1], ['W_PLACED', 2]]);
    expect(fidelityProblems(p, c.level, c.cls, c.points, { closed: c.closed }, r.value.placed, 'way:x')).toEqual([]);
    expect(allProblems(p)).toEqual([]);
  }, TIMEOUT);

  // This optional chain's every route of S4's second pass kept §3.10 only beyond the bound, so S4 and S5 refused it
  // E_BELOW_MIN_EDGE with detail 'N-43' (§3.6 *Chain classes*; a refusal the bound caused, counted, N-46 (3)). S6
  // (C-0221) serves such a refusal with the router's further readings as it serves E_INVARIANT: the split route commits
  // it within the bound, its split points W_PLACED. The class's residue is refused as before (routerGapS6.test.ts).
  it('an optional chain whose every route of the first readings leaves the bound — refused E_BELOW_MIN_EDGE \'N-43\' by S4 and S5 — commits within the bound on S6\'s split route (C-0221)', () => {
    const { p, r, c } = replayPass2('optional-out-of-bound');
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(c.cls).toBe('optional');
    expect(codes(r)).toEqual([['W_ATTRACTED', 22], ['W_PLACED', 2], ['W_STRETCH_SHARED', 11]]);
    expect(fidelityProblems(p, c.level, c.cls, c.points, { closed: c.closed }, r.value.placed, 'way:x')).toEqual([]);
    expect(allProblems(p)).toEqual([]);
  }, TIMEOUT);
});

// ---- the third pass (C-0217) --------------------------------------------------------------------------------------------
//
// M0-a-05 session fix round S5 (C-0217): insertChain's third pass, under N-44 as the session applied it for the refusal
// cap (J204, J207, J208). S4's two passes fail safe but refused 5 – 17 chains per 10⁴ random B-FUZZ cases and ≈ 4.5 % of
// M0-a-08's buffer and offsetFace agreement cases. The cause table (C-0217): almost every refusal is a placement whose
// candidates all fail (iii) because a near-parallel edge within minEdge — a thin strip or sliver between two edges joined
// at one end — blocks them, so the endpoint fallback lands 75 – 770 cm along the edge, beyond N-43 B's bound. The third
// pass, run only for a chain both earlier passes refuse E_INVARIANT, keeps every landing within the bound: the step across
// the strip (its far side's sub-edge left out of (iii), `stripPartner`, `placeOnRun`), the nearest qualifying point of the
// run within the bound, the nearest existing vertex within it, a free spot within it (step 2), and a wedge corner only
// within the bound of the input segment; a second reading tries the free spot first. Every route is still judged whole
// (§3.10) and against the bound; whatever no reading commits stays refused E_INVARIANT and counted (the register below).

describe('S5: the bound of the input segment and the strip\'s far side', () => {
  it('inInputBound is N-43 B\'s bound, 8 · 26² = 5 408 squared: a point 73 cm off the input segment is within it, 74 cm is not; so are the ends\' discs', () => {
    expect(FIDELITY_SQ).toBe(5408);
    const a = pt(1000, 1000);
    const b = pt(2000, 1000);
    expect(inInputBound(a, b, 1500, 1073)).toBe(true);
    expect(inInputBound(a, b, 1500, 1074)).toBe(false);
    expect(inInputBound(a, b, 927, 1000)).toBe(true);
    expect(inInputBound(a, b, 926, 1000)).toBe(false);
    expect(inInputBound(a, b, 2052, 1052)).toBe(true);
    expect(inInputBound(a, b, 2053, 1053)).toBe(false);
  });

  // The segment (1 300, 900) → (1 550, 1 150) crosses arm 1 at (1 400, 1 000) and arm 2 at ≈ (1 420, 1 020), 28 cm
  // apart along it: N-42 (a)'s sliver partner (a next crossing closer than minEdge) does not apply, yet every placement
  // candidate of the first crossing stands within minEdge of arm 2.
  it('a segment crossing the strip at 45°: the placement rule falls back on arm 1\'s end; no sliver partner; stripPartner names arm 2; placed with arm 2 left out of (iii), the crossing lands on arm 1 beside its exact position', () => {
    const b = indexed(STRIP);
    const p = b.plat;
    expect(allProblems(p)).toEqual([]);
    const ctx = ctxOf(p);
    const a = free(p, 1300, 900);
    const e = free(p, 1550, 1150);
    const cs = exactCrossings(ctx, a, e);
    expect(cs.ok).toBe(true);
    if (!cs.ok) return;
    expect(cs.value.map((c) => [Math.round(c.x), Math.round(c.y)])).toEqual([[1400, 1000], [1420, 1020]]);
    const first = cs.value[0];
    const pl = placePoint(ctx.tx, first.piece.edge, { x: first.x, y: first.y }, { c: pt(1300, 900), d: pt(1550, 1150) });
    expect(pl.ok && pl.value.kind).toBe('endpoint');
    const sp = sliverPartner(ctx, a, e, first);
    expect(sp.ok && sp.value).toBe(null);
    const tp = stripPartner(ctx, a, e, first);
    expect(tp.ok).toBe(true);
    if (!tp.ok || tp.value === null) throw new Error('no strip partner');
    expect(tp.value.map((v) => [p.vertices.x[v], p.vertices.y[v]]).sort()).toEqual([[1020, 1015], [3000, 1040]]);
    const without = placeOnRun(ctx, first.piece.edge, first, { a, b: e, partner: null, reach: 26 });
    expect(without.ok && without.value).toBe(null);
    const across = placeOnRun(ctx, first.piece.edge, first, { a, b: e, partner: tp.value, reach: 26 });
    expect(across.ok).toBe(true);
    if (!across.ok || across.value === null || across.value.kind !== 'split') throw new Error('not placed across');
    expect(across.value.plan.at).toEqual({ x: 1400, y: 1000 });
  });

  it('the chain itself, (1 300, 900) → (1 550, 1 150), mandatory: S4 refused it (its crossing fell back 400 cm along arm 1); the third pass commits it within the bound, across the strip (W_PLACED), the arena valid', () => {
    const b = indexed(STRIP);
    const p = b.plat;
    const chain: [number, number][] = [[1300, 900], [1550, 1150]];
    const r = ins(tx(p, 0), chain, [{ role: 'way', entity: 'way:s' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(codes(r).find(([c]) => c === 'W_PLACED')).toBeDefined();
    expect(fidelityProblems(p, 0, 'mandatory', chain, {}, r.value.placed, 'way:s')).toEqual([]);
    expect(allProblems(p)).toEqual([]);
  });

  it('step 2 inside the strip: a chain from (1 300, 1 008), 8 cm above arm 1, to (1 300, 1 200) across arm 2 — its first point\'s placement falls back on A, 300 cm off — lands on arm 1 across the strip (the far side the chain crosses left out of (iii)) and commits within the bound', () => {
    const b = indexed(STRIP);
    const p = b.plat;
    const chain: [number, number][] = [[1300, 1008], [1300, 1200]];
    const r = ins(tx(p, 0), chain, [{ role: 'way', entity: 'way:t' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(codes(r).find(([c]) => c === 'W_PLACED')).toBeDefined();
    expect(fidelityProblems(p, 0, 'mandatory', chain, {}, r.value.placed, 'way:t')).toEqual([]);
    expect(allProblems(p)).toEqual([]);
  });
});

describe('F4: the third pass\'s free spot (C-0217: "keeping minEdge from every vertex and edge and the kept-content rule")', () => {
  // Q8: a free vertex of level ≤ n 5 cm from the chain point and nothing else near. The point itself would stand within
  // minEdge of it; the free spot is the nearest lattice point within the bound that does not, 20 – 25 cm off.
  it('the free spot keeps minEdge from every vertex: a vertex 5 cm from the point moves the spot ≥ 25 cm from it, as near the point as the 16 directions allow', () => {
    const b = indexed(SQUARE);
    const p = b.plat;
    const v = allocVertex(p, pt(2000, 2000), 0, 0);
    indexAdd(p, { kind: ITEM_VERTEX, level: 0, slot: v });
    const at = pt(2005, 2000);
    const f = freeSpot(ctxOf(p, 0, 0), at);
    expect(f.ok).toBe(true);
    if (!f.ok || f.value === null) throw new Error('no free spot');
    expect(belowMinEdge(2000, 2000, f.value.x, f.value.y)).toBe(false);
    expect(d2(f.value, at)).toBeLessThanOrEqual(20 * 20);
    expect(d2(f.value, at)).toBeLessThanOrEqual(FIDELITY_SQ);
  });

  // Q10: a level-1 ring 120 cm square round the chain point, inserted into the framed L0 arena: its face record (L1)
  // holds every point inside it, its edges stand 60 cm from the point. A free L0 vertex inside it would sit in a finer
  // face (§3.3's kept content, as `finerNear` refuses E_KEPT); outside it, every point within the bound lies within
  // attractCm of the ring's edges. So no spot qualifies.
  it('the free spot keeps the kept-content rule\'s face records: inside a finer ring whose edges stand beyond attractCm of the point, no spot within the bound qualifies', () => {
    const p = framed(4000);
    const ring: [number, number][] = [[1940, 1940], [2060, 1940], [2060, 2060], [1940, 2060]];
    expect(ins(tx(p, 1), ring, [{ role: 'way', entity: 'way:ring' }], 'mandatory', { closed: true }).ok).toBe(true);
    const ctx = ctxOf(p, 0, 0);
    expect(recordHolding(ctx, 1, 4000, 4000)).toBeGreaterThanOrEqual(0);
    const f = freeSpot(ctx, pt(2000, 2000));
    expect(f.ok && f.value).toBe(null);
    // The same point at L1 (no finer ring round it: the ring is its own level) finds its spot at once.
    const g = freeSpot(ctxOf(p, 1, 0), pt(2000, 2000));
    expect(g.ok && g.value).toEqual({ x: 2000, y: 2000 });
  });
});

describe('F4: the third pass\'s step-2 landing (insertChain `land`, C-0217)', () => {
  // The chain point (1 300, 1 008) stands inside the strip, 8 cm above arm 1: the placement rule falls back on A, 300 cm
  // off, so the third pass lands it in bound — across the strip onto arm 1 at (1 300, 1 000) (reading 0), or at a free
  // spot outside the strip (reading 1, the free spot first).
  it('reading 0 lands the point across the strip on arm 1, a split at (1 300, 1 000) reported W_PLACED; without the third pass it takes the far fallback', () => {
    const p = indexed(STRIP).plat;
    const ctx = ctxOf(p, 0, 0);
    const l = land(ctx, pt(1300, 1008), -1, null, pt(1300, 1200));
    expect(l.ok).toBe(true);
    if (!l.ok) return;
    expect(l.value.merged).toBe(false);
    expect([p.vertices.x[l.value.vertex], p.vertices.y[l.value.vertex]]).toEqual([1300, 1000]);
    expect(ctx.warnings.map((w) => w.code)).toContain('W_PLACED');
    const q = indexed(STRIP).plat;
    const plain = land(ctxOf(q, 0, null), pt(1300, 1008), -1, null, pt(1300, 1200));
    expect(plain.ok).toBe(true);
    if (!plain.ok) return;
    expect(d2({ x: q.vertices.x[plain.value.vertex], y: q.vertices.y[plain.value.vertex] }, pt(1300, 1008))).toBeGreaterThan(FIDELITY_SQ);
  });

  // Q18: the merge rule (§3.6 step 2: a vertex attraction brought within minEdge of the previous one merges into it,
  // W_ATTRACTED) holds for the third pass's landings too. The previous vertex here stands 20 cm from the across landing
  // (it is not entered in the index, so it changes no candidate: only the merge rule reads it).
  it('an in-bound landing within minEdge of the previous vertex merges into it (W_ATTRACTED), writing nothing', () => {
    const p = indexed(STRIP).plat;
    const prev = allocVertex(p, pt(1300, 1020), 0, 0);
    const before = contentPrint(p);
    const ctx = ctxOf(p, 0, 0);
    const l = land(ctx, pt(1300, 1008), prev, pt(1300, 1020), pt(1300, 1200));
    expect(l.ok).toBe(true);
    if (!l.ok) return;
    expect(l.value).toEqual({ vertex: prev, merged: true });
    expect(ctx.warnings.map((w) => w.code)).toEqual(['W_ATTRACTED']);
    expect(contentPrint(p)).toBe(before);
  });

  // Q19: reading 1's free landing is a new vertex of the chain's own: it goes into the transaction's journal like any
  // free chain vertex (insertChain `land`'s last lines), which the whole-route clearance judge (`wholeProblem`), N-42
  // (b)'s `freeSince`, the rollback and the commit record's role keys (M0-a-06's tx.ts reads `journal.vertices`) all read.
  it('reading 1 lands the point at a free spot outside the strip, within the bound, keeping minEdge from both arms — a new vertex in the journal, W_PLACED', () => {
    const p = indexed(STRIP).plat;
    const ctx = ctxOf(p, 0, 1);
    const from = ctx.tx.journal.vertices.length;
    const l = land(ctx, pt(1300, 1008), -1, null, pt(1300, 1200));
    expect(l.ok).toBe(true);
    if (!l.ok) return;
    const v = l.value.vertex;
    const at = { x: p.vertices.x[v], y: p.vertices.y[v] };
    expect(l.value.merged).toBe(false);
    expect(p.vertices.out[v]).toBe(-1);
    expect(ctx.tx.journal.vertices.slice(from)).toEqual([v]);
    expect(d2(at, pt(1300, 1008))).toBeLessThanOrEqual(FIDELITY_SQ);
    expect(at.y < 1000 - LATTICE.minEdgeCm + 1 || at.y > 1040).toBe(true);
    expect(ctx.warnings.find((w) => w.code === 'W_PLACED')?.at).toEqual(at);
    expect(allProblems(p)).toEqual([]);
  });
});

// ---- the cases that found the readings, and the residual register -------------------------------------------------------

/** A rescued case: the mechanism that commits it and the warnings it commits with. */
interface Rescue extends FuzzCase {
  readonly mechanism: string;
  readonly warnings: readonly { readonly code: string; readonly count: number; readonly at?: { readonly x: number; readonly y: number } }[];
}
interface Residual {
  readonly class: string;
  readonly detail: string;
  readonly family: string;
  readonly seed?: string;
  readonly case?: number;
  readonly log?: FuzzCase['log'];
  readonly gridCellCm?: number;
  readonly frame?: readonly (readonly [number, number])[];
  readonly segments?: readonly (readonly (readonly [number, number])[])[];
}

const RESCUES = (JSON.parse(readFileSync(new URL('./register/s5-rescues.json', import.meta.url), 'utf8')) as { cases: Rescue[] }).cases;
const RESIDUAL = (JSON.parse(readFileSync(new URL('./register/s5-register.json', import.meta.url), 'utf8')) as { cases: Residual[] }).cases;

describe('S5\'s third pass on the B-FUZZ cases S4 refused (register/s5-rescues.json): each commits within the bound, the arena valid', () => {
  for (const c of RESCUES) {
    it(`${c.mechanism}: seed ${c.seed}, ${c.family} case ${c.case} (${c.log.length} chain${c.log.length === 1 ? '' : 's'})`, () => {
      const { r } = replay(c);
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(r.warnings).toEqual(c.warnings);
    }, TIMEOUT);
  }
});

describe('N-44 (4): S5\'s residual register (register/s5-register.json) — one case per remaining cause class, each refused E_INVARIANT, writing nothing', () => {
  for (const c of RESIDUAL) {
    it(`${c.class}: ${c.family}${c.seed === undefined ? '' : ` seed ${c.seed} case ${c.case}`} — ${c.detail.slice(0, 60)}…`, () => {
      if (c.log !== undefined) {
        const { r } = replay({ seed: c.seed ?? '', family: c.family, case: c.case ?? 0, log: c.log });
        expect(r.ok).toBe(false);
        if (r.ok) return;
        expect(r.code).toBe('E_INVARIANT');
        expect(r.detail).toBe(c.detail);
        return;
      }
      const p = wideArena(c.gridCellCm ?? 512);
      const t = tx(p, 0);
      expect(ins(t, c.frame ?? [], [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true }).ok).toBe(true);
      const segs = c.segments ?? [];
      segs.forEach((seg, i) => {
        const before = contentPrint(p);
        const warningsBefore = JSON.stringify(t.warnings);
        const r = ins(t, seg, [{ role: 'invisible', entity: `arr:s${i}` }]);
        if (i < segs.length - 1) {
          if (!r.ok) expect(`${r.code} ${r.detail}`).toBe('E_DEGENERATE empty');
          return;
        }
        expect(r.ok).toBe(false);
        if (r.ok) return;
        expect(r.code).toBe('E_INVARIANT');
        expect(r.detail).toBe(c.detail);
        expect(contentPrint(p)).toBe(before);
        expect(JSON.stringify(t.warnings)).toBe(warningsBefore);
      });
      expect(allProblems(p)).toEqual([]);
    }, TIMEOUT);
  }
});

// ---- the optional chain the bound refuses (C-0221) ----------------------------------------------------------------------
//
// M0-a-05 session fix round S6 (C-0221), on the S5 closing check's failing lines (checks/M0-a-05-s3.md, S5 round):
//   F1 / F2 — N-46 (3): an optional chain whose every route keeping §3.10 leaves N-43 B's bound is refused
//     E_BELOW_MIN_EDGE with detail 'N-43'; it is a refusal the bound caused, counted with E_INVARIANT (caps.ts
//     `countedRefusal`), and the router's further readings — S4's split route, N-42 (b)'s re-landing, S5's third pass —
//     now serve it as they serve E_INVARIANT (`boundRefusal`), its code kept when none commits;
//   F4 — the third pass's free spot and landing rules S5 states (C-0217), each pinned by a unit test: the free spot keeps
//     minEdge from every vertex (Q8) and the kept-content rule's face records (Q10); an in-bound landing within minEdge
//     of the previous vertex merges into it (Q18); a free landing is journalled, so the commit record's roles and the
//     whole-route clearance judge read it (Q19).

describe('N-46 (3): a refusal N-43 B\'s bound caused is one class, whatever its code', () => {
  it('boundRefusal (the router\'s gate) and countedRefusal (B-FUZZ\'s tally) agree: E_INVARIANT and an optional chain\'s E_BELOW_MIN_EDGE naming N-43; no other precision refusal', () => {
    const cases: [string, string, boolean][] = [
      ['E_INVARIANT', 'insert: no route from (1, 2) to (3, 4) keeps clearance (§3.10) within the fidelity bound (N-43)', true],
      ['E_INVARIANT', 'insert: the vertex (1, 2) stands within minEdge of the edge (3, 4)–(5, 6)', true],
      ['E_BELOW_MIN_EDGE', 'every route from (1, 2) to (3, 4) keeping clearance leaves the fidelity bound (N-43)', true],
      ['E_BELOW_MIN_EDGE', 'the chain collapses below one edge', false],
      ['E_BELOW_MIN_ANGLE', 'a corner below minFaceAngle', false],
      ['E_KEPT', 'a chain vertex within attractCm of a finer vertex (kept content)', false],
    ];
    for (const [code, detail, want] of cases) {
      expect(boundRefusal({ code: code as 'E_INVARIANT', detail }), `${code} ${detail}`).toBe(want);
      expect(countedRefusal(code, detail), `${code} ${detail}`).toBe(want);
    }
  });
});

/** A case of the lifecycle or the optional class's register: its kind, or its refusal, and the warnings recorded. */
interface RegisterCase extends FuzzCase {
  readonly kind?: string;
  readonly code?: string;
  readonly detail?: string;
  readonly warnings?: readonly { readonly code: string; readonly count: number; readonly at?: { readonly x: number; readonly y: number } }[];
}

const LIFE = (JSON.parse(readFileSync(new URL('./register/s6-lifecycle.json', import.meta.url), 'utf8')) as { cases: RegisterCase[] }).cases;
const REGISTER = (JSON.parse(readFileSync(new URL('./register/s6-register.json', import.meta.url), 'utf8')) as { cases: RegisterCase[] }).cases;

describe('F2: optional chains S5 refused E_BELOW_MIN_EDGE for the bound now commit within it (register/s6-lifecycle.json)', () => {
  // pass2-optional: S5's second pass refused the optional chain's segment for the bound and went no further (its split
  // route and the re-landing ran only on E_INVARIANT); S6's split route commits it, the split point W_PLACED.
  // pass3-optional: S5 never ran the third pass for it (gated on E_INVARIANT); S6's third pass commits it.
  for (const kind of ['pass2-optional', 'pass3-optional']) {
    it(`${kind}: the optional chain commits within the bound, the arena valid, its warnings as recorded`, () => {
      const c = LIFE.find((x) => x.kind === kind);
      if (c === undefined) throw new Error(`no ${kind} case`);
      const { r } = replay(c, 'invisible');
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(c.log[c.log.length - 1].cls).toBe('optional');
      expect(r.warnings).toEqual(c.warnings);
      expect(r.warnings.map((w) => w.code)).toContain('W_PLACED');
    }, TIMEOUT);
  }
});

describe('N-44 (4): S6\'s register of the optional N-43 class (register/s6-register.json) — each refused E_BELOW_MIN_EDGE for the bound, cleanly, and counted', () => {
  for (const c of REGISTER) {
    it(`${c.family} seed ${c.seed} case ${c.case}: ${(c.detail ?? '').slice(0, 70)}…`, () => {
      const { p, r, before } = replay(c, 'way');
      expect(r.ok).toBe(false);
      if (r.ok) return;
      expect(c.log[c.log.length - 1].cls).toBe('optional');
      expect([r.code, r.detail]).toEqual([c.code, c.detail]);
      expect(countedRefusal(r.code, r.detail)).toBe(true);
      expect(contentPrint(p)).toBe(before);
    }, TIMEOUT);
  }
});

describe('N-44 (3) as J207 / J208 apply it, N-46 (3) – (4) (caps.ts, C-0217, C-0221): each property\'s cap is N-46\'s cap per family plus one run\'s noise', () => {
  it('poissonCap is the 99.9 % point of a Poisson count, at least 1', () => {
    expect(poissonCap(0)).toBe(1);
    expect(poissonCap(0.1)).toBe(2);
    expect(poissonCap(1)).toBe(5);
    expect(poissonCap(10)).toBe(21);
  });

  it('N-46 (4)\'s cap per 10⁴ is the measured rate plus 3 · √count on the 31 seeds: 4.45 (random), 2.14 (constructive), 2.26 (mandatory-only), 0.26 (fidelity)', () => {
    const fams = ['random', 'constructive', 'mandatory', 'fidelity'] as const;
    expect(fams.map((f) => Math.round(capPer1e4(f) * 100) / 100)).toEqual([4.45, 2.14, 2.26, 0.26]);
    for (const f of fams) expect(MEASURED_PER_1E4[f]).toBe(MEASURED_COUNT[f] / 31);
  });

  it('the caps at the PR size are 12 (random), 8 (constructive), 8 (mandatory-only) and 3 (the fidelity property), each above the most any of the 31 measured seeds refused (9, 3, 4, 2); 4, 3, 3 and 1 at 10³; 512, 261, 274 and 44 nightly', () => {
    const fams = ['random', 'constructive', 'mandatory', 'fidelity'] as const;
    expect(fams.map((f) => refusalCap(f, 10_000))).toEqual([12, 8, 8, 3]);
    expect(fams.map((f) => refusalCap(f, 1_000))).toEqual([4, 3, 3, 1]);
    expect(fams.map((f) => refusalCap(f, 1_000_000))).toEqual([512, 261, 274, 44]);
    const most = [9, 3, 4, 2];
    fams.forEach((f, i) => expect(refusalCap(f, 10_000)).toBeGreaterThan(most[i]));
    // The target stays 1 per 10⁴ (KI-1): every measured mean is above it, none is below 0.
    for (const f of fams) expect(MEASURED_PER_1E4[f]).toBeGreaterThan(0);
  });
});
