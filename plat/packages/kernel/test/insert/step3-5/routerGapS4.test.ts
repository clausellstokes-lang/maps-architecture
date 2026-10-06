// M0-a-05 session fix round S4 (C-0215): the S3 closing check's failing lines (checks/M0-a-05-s3.md) under the session's
// rulings N-43 (J199) and N-44 (OWNER-APPROVED, J201) — N-43 B's fidelity bound and its measure, the two passes of
// insertChain (the S1 – S3 router judged by §3.10 whole and the bound; then, only for a chain it refuses, the anchored
// routes, the split route and an optional chain's precision refusal), the safety nets that turn an invariant failure
// into a refusal (N-44 (1)), and constructed cases that pin each bound C-0209 states for N-42's fallback routes — the
// re-landing bound and its candidates (mutants KA, KP), "free" (KC), the sliver partner (KF), the across placement's
// reach (KG), where the step across a sliver applies (KE), and "E_WORK_LIMIT ends the op" (KN).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { allocVertex, type Plat, type VertexId } from '../../../src/arena/index.js';
import { indexAdd, ITEM_VERTEX } from '../../../src/index/index.js';
import { acrossApplies, exactCrossings, placeAcross, sliverPartner } from '../../../src/insert/crossings.js';
import { FIDELITY_SQ, freeSince, inFidelity, relandCandidates } from '../../../src/insert/insertChain.js';
import { chainJournal, type ChainCtx } from '../../../src/insert/stretch.js';
import type { Level } from '../../../src/types/index.js';
import type { ArenaSpec } from '../step1-2/support.js';
import { FIDELITY_CM, fidelityProblems } from './fidelity.js';
import { allProblems, contentPrint, framed, indexed, ins, pt, TIMEOUT, tx } from './support.js';

/** The L0 square [0, 4 000]² as a hand-built arena's outer ring (spec vertices 0 – 3, edges 0 – 3). */
const SQUARE: ArenaSpec = {
  vertices: [[0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0]],
  edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0]],
};

/** The square with more vertices and edges. */
function square(vertices: ArenaSpec['vertices'], edges: ArenaSpec['edges']): ArenaSpec {
  return { vertices: [...SQUARE.vertices, ...vertices], edges: [...SQUARE.edges, ...edges] };
}

/** A free vertex (no edge) at (x, y) of `level`, entered in the index. */
function free(p: Plat, x: number, y: number, level: Level = 0): VertexId {
  const v = allocVertex(p, pt(x, y), level, 0);
  indexAdd(p, { kind: ITEM_VERTEX, level, slot: v });
  return v;
}

/** A chain context over a transaction (the tests call the router's parts on their own). */
function ctxOf(p: Plat, level: Level = 0): ChainCtx {
  const t = tx(p, level);
  return { tx: t, p, n: level, cls: 'mandatory', rows: [], warnings: [], journal: chainJournal(t), maxPass: 0, strict: false, undo: [] };
}

const at = (p: Plat, v: VertexId): [number, number] => [p.vertices.x[v], p.vertices.y[v]];

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

/** A commit's warnings as [code, count] pairs. */
const codes = (r: ReturnType<typeof ins>): [string, number][] => (r.ok ? r.warnings.map((w) => [w.code, w.count] as [string, number]) : []);

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

  it('an optional chain whose every route keeping §3.10 leaves the bound is refused for precision, E_BELOW_MIN_EDGE (§3.6 *Chain classes*), writing nothing', () => {
    const { p, r, before } = replayPass2('optional-out-of-bound');
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_BELOW_MIN_EDGE');
    expect(r.detail).toContain('fidelity bound');
    expect(contentPrint(p)).toBe(before);
  }, TIMEOUT);
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

/** The shrunk counterexample of B-FUZZ's random family at seed −1863295922 (routerGapS3.test.ts), run-length coded. */
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
