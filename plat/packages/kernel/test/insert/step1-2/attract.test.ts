// M0-a-04: insertion step 2 — vertex attraction (§3.6 step 2; §13.1's attraction class). The item's listed test
// "§13.1 attraction: a vertex at (20, 20) against (0, 0)–(1 000, 0) moves onto (0, 0), no sub-minEdge edge" is here,
// with the candidates of level ≤ the batch's, the ties, the endpoint rule, W_ATTRACTED, the merge rule of attractRun,
// candidate (c)'s staged branch and the work charge (C-0169 (6)), and the placement's fallback on a valid thin wedge — the
// one path the √2 · attractCm bound does not cover (C-0170 (1)).
import { describe, expect, it } from 'vitest';
import { VERTEX_SPLIT, VERTEX_STEINER, type Plat } from '../../../src/arena/index.js';
import { query } from '../../../src/index/index.js';
import { attractRun, attractVertex, nearestRoutePiece, planAttraction } from '../../../src/insert/attractVertex.js';
import { INSERT_ATTRACT_QUERIES, INSERT_PLACEMENT_CANDIDATES, INSERT_POINTS, insertTx } from '../../../src/insert/classes.js';
import { placePoint } from '../../../src/insert/placement.js';
import type { Level } from '../../../src/types/index.js';
import { fingerprint, indexed, liveEdges, liveVertices, permutation, problems, pt, SLANT, type ArenaSpec } from './support.js';

/** The L0 frame ±5000 cm with an L1 line along y = 0 whose shape vertices stand at (0, 0) and (1 000, 0). */
export const LINE: ArenaSpec = {
  vertices: [
    [-5000, -5000, 0], [5000, -5000, 0], [5000, 5000, 0], [-5000, 5000, 0], // 0 – 3
    [-5000, 0, 1], [0, 0, 1], [1000, 0, 1], [5000, 0, 1], // 4 – 7
  ],
  edges: [
    [0, 1, 0], [1, 7, 0], [7, 2, 0], [2, 3, 0], [3, 4, 0], [4, 0, 0],
    [4, 5, 1], [5, 6, 1], [6, 7, 1],
  ],
};

/** LINE with a parallel L1 line along y = 50 (two edges 50 cm apart) and an L3 spur whose end is an L3 vertex on y = 0. */
const TWIN: ArenaSpec = {
  vertices: [
    [-5000, -5000, 0], [5000, -5000, 0], [5000, 5000, 0], [-5000, 5000, 0], // 0 – 3
    [-5000, 0, 1], [0, 0, 1], [1000, 0, 1], [5000, 0, 1], // 4 – 7
    [-5000, 50, 1], [5000, 50, 1], // 8, 9
    [300, 0, 3], [300, -800, 3], // 10, 11: an L3 vertex on the L1 line and the spur's far end
  ],
  edges: [
    [0, 1, 0], [1, 7, 0], [7, 9, 0], [9, 2, 0], [2, 3, 0], [3, 8, 0], [8, 4, 0], [4, 0, 0],
    [4, 5, 1], [5, 10, 1], [10, 6, 1], [6, 7, 1], [8, 9, 1],
    [10, 11, 3],
  ],
};

/** A corner at (0, 0) on an L1 line with two L1 antennas to (0, 40) and … — vertices (0, 0) and (0, 40) are 40 cm apart. */
const CORNER: ArenaSpec = {
  vertices: [
    [-5000, -5000, 0], [5000, -5000, 0], [5000, 5000, 0], [-5000, 5000, 0], // 0 – 3
    [-5000, 0, 1], [0, 0, 1], [0, 40, 1], [0, 5000, 1], // 4 – 7
  ],
  edges: [
    [0, 1, 0], [1, 2, 0], [2, 7, 0], [7, 3, 0], [3, 4, 0], [4, 0, 0],
    [4, 5, 1], [5, 6, 1], [6, 7, 1],
  ],
};

/** An acute corner: two L1 antennas from (0, 0) to (30, 0) and (30, 10), whose ends stand 10 cm apart (one-ring). */
const ACUTE: ArenaSpec = {
  vertices: [
    [-5000, -5000, 0], [5000, -5000, 0], [5000, 5000, 0], [-5000, 5000, 0], // 0 – 3
    [-5000, 0, 1], [0, 0, 1], [30, 0, 1], [30, 10, 1], // 4 – 7
  ],
  edges: [
    [0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 4, 0], [4, 0, 0],
    [4, 5, 1], [5, 6, 1], [5, 7, 1],
  ],
};

/**
 * A thin wedge (B-FUZZ's chordArena(720867645), hand-built): the frame [0, 4 000]² and an L1 chord (897, 4 000) →
 * (287, 3 214) → (723, 3 092) → (0, 3 282). Its corner at (723, 3 092) is 0.9°, so (287, 3 214) stands 7.18 cm from the
 * edge (723, 3 092)–(0, 3 282) — allowed, that edge's end (723, 3 092) being its neighbour (one-ring, §3.10).
 */
const WEDGE: ArenaSpec = {
  vertices: [
    [0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0], // 0 – 3
    [897, 4000, 1], [287, 3214, 1], [723, 3092, 1], [0, 3282, 1], // 4 – 7
  ],
  edges: [
    [0, 1, 0], [1, 2, 0], [2, 4, 0], [4, 3, 0], [3, 7, 0], [7, 0, 0],
    [4, 5, 1], [5, 6, 1], [6, 7, 1],
  ],
};

const at = (p: Plat, v: number): [number, number] => [p.vertices.x[v], p.vertices.y[v]];

describe('§13.1 attraction: a vertex at (20, 20) against (0, 0)–(1 000, 0)', () => {
  it('moves onto (0, 0), splits nothing and leaves no sub-minEdge edge', () => {
    for (const level of [1, 2, 3, 4] as Level[]) {
      const b = indexed(LINE);
      const before = fingerprint(b.plat);
      const t = insertTx(b.plat, level);
      const r = attractVertex(t, pt(20, 20));
      expect(r.ok).toBe(true);
      if (!r.ok) continue;
      expect(r.value).toEqual({ kind: 'vertex', at: { x: 0, y: 0 }, vertex: b.v[5], onto: 'endpoint' });
      expect(r.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 20, y: 20 } }]);
      expect(t.warnings).toEqual(r.warnings);
      expect(fingerprint(b.plat)).toBe(before); // nothing written: no split off a 20 cm edge
      expect(problems(b.plat)).toEqual([]);
      for (const [u, w] of liveEdges(b.plat)) expect((b.plat.vertices.x[u] - b.plat.vertices.x[w]) ** 2 + (b.plat.vertices.y[u] - b.plat.vertices.y[w]) ** 2).toBeGreaterThanOrEqual(625);
    }
  });

  it('is not vertex-attracted: (0, 0) is 28.3 cm off; the edge is 20 cm off and its foot (20, 0) within attractCm of (0, 0)', () => {
    const b = indexed(LINE);
    const plan = planAttraction(insertTx(b.plat, 1), pt(20, 20));
    expect(plan.ok && plan.value.kind === 'vertex' && plan.value.onto === 'endpoint').toBe(true);
  });
});

describe('vertex candidates (§3.6 step 2)', () => {
  it('within attractCm is inclusive: 26 cm attracts, 26.02 cm does not', () => {
    const b = indexed(LINE);
    const r = attractVertex(insertTx(b.plat, 1), pt(0, 26));
    expect(r.ok && r.value.kind === 'vertex' && r.value.onto === 'vertex' && r.value.vertex === b.v[5]).toBe(true);
    const s = planAttraction(insertTx(b.plat, 1), pt(1, 26)); // √677: not a vertex candidate; the edge, 26 cm, is
    expect(s.ok && s.value.kind === 'vertex' && s.value.onto === 'endpoint').toBe(true);
  });

  it('a coincident point is one vertex, not a move (no W_ATTRACTED)', () => {
    const b = indexed(LINE);
    const t = insertTx(b.plat, 1);
    const r = attractVertex(t, pt(1000, 0));
    expect(r.ok && r.value.kind === 'vertex' && r.value.vertex === b.v[6]).toBe(true);
    expect(t.warnings).toEqual([]);
  });

  it('ties to the smaller lattice position, y then x, under any allocation order', () => {
    for (let seed = 1; seed <= 5; seed++) {
      const b = indexed(CORNER, { vertices: permutation(CORNER.vertices.length, seed), edges: permutation(CORNER.edges.length, seed + 9) });
      const r = attractVertex(insertTx(b.plat, 1), pt(15, 20)); // 25 cm from (0, 0) and from (0, 40)
      expect(r.ok && at(b.plat, r.value.kind === 'free' ? -1 : r.value.vertex)).toEqual([0, 0]);
    }
  });

  it('reads only candidates of level ≤ the batch’s: an L3 vertex is no candidate at L2 and the nearest at L3', () => {
    const b = indexed(TWIN);
    const at2 = planAttraction(insertTx(b.plat, 2), pt(310, -10));
    // at L2 the L3 vertex is unseen; the L1 edge's foot (310, 0) lies within attractCm of that finer vertex: candidate
    // (b), whose promotion is M0-a-05's — a typed refusal, nothing written
    expect(at2).toMatchObject({ ok: false, code: 'E_LEVEL' });
    const before = fingerprint(b.plat);
    expect(attractVertex(insertTx(b.plat, 2), pt(310, -10))).toMatchObject({ ok: false, code: 'E_LEVEL' });
    expect(fingerprint(b.plat)).toBe(before);
    const at3 = attractVertex(insertTx(b.plat, 3), pt(310, -10));
    expect(at3.ok && at3.value.kind === 'vertex' && at3.value.vertex === b.v[10]).toBe(true);
  });
});

describe('edge candidates (§3.6 step 2)', () => {
  it('beside an edge’s middle: a split at the foot’s placement point — Steiner when the edge is coarser', () => {
    for (const level of [1, 2, 4] as Level[]) {
      const b = indexed(LINE);
      const nv = liveVertices(b.plat).length;
      const t = insertTx(b.plat, level);
      const r = attractVertex(t, pt(500, 26));
      expect(r.ok).toBe(true);
      if (!r.ok || r.value.kind !== 'split') continue;
      expect(r.value.at).toEqual({ x: 500, y: 0 });
      const v = r.value.vertex;
      expect(b.plat.vertices.level[v]).toBe(level);
      expect(b.plat.vertices.flags[v]).toBe(level > 1 ? VERTEX_SPLIT | VERTEX_STEINER : VERTEX_SPLIT);
      expect(liveVertices(b.plat)).toHaveLength(nv + 1);
      expect(t.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 500, y: 26 } }]);
      expect(problems(b.plat)).toEqual([]);
    }
  });

  it('27 cm off every geometry: free, nothing written, no warning', () => {
    const b = indexed(LINE);
    const before = fingerprint(b.plat);
    const t = insertTx(b.plat, 1);
    expect(attractVertex(t, pt(500, 27))).toEqual({ ok: true, value: { kind: 'free', at: { x: 500, y: 27 } }, warnings: [] });
    expect(fingerprint(b.plat)).toBe(before);
  });

  it('the endpoint rule is inclusive: a foot 26 cm from an endpoint moves onto it, 27 cm splits', () => {
    const b = indexed(LINE);
    const r = attractVertex(insertTx(b.plat, 1), pt(974, 10)); // foot (974, 0): 26 cm from (1 000, 0)
    expect(r.ok && r.value.kind === 'vertex' && r.value.vertex === b.v[6]).toBe(true);
    const s = attractVertex(insertTx(b.plat, 1), pt(973, 10));
    expect(s.ok && s.value.kind === 'split' && s.value.at.x === 973 && s.value.at.y === 0).toBe(true);
  });

  it('a foot within attractCm of both ends of a short edge: the nearer end', () => {
    // An L1 line whose shape vertices (0, 0) and (40, 0) are 40 cm apart; (15, 25) is 29 and 35 cm from them, 25 cm from
    // the edge; its foot (15, 0) lies 15 cm from (0, 0) and 25 cm from (40, 0).
    const b = indexed({
      vertices: [[-5000, -5000, 0], [5000, -5000, 0], [5000, 5000, 0], [-5000, 5000, 0], [-5000, 0, 1], [0, 0, 1], [40, 0, 1], [5000, 0, 1]],
      edges: [[0, 1, 0], [1, 7, 0], [7, 2, 0], [2, 3, 0], [3, 4, 0], [4, 0, 0], [4, 5, 1], [5, 6, 1], [6, 7, 1]],
    });
    const near = attractVertex(insertTx(b.plat, 1), pt(15, 25));
    expect(near.ok && near.value).toMatchObject({ kind: 'vertex', vertex: b.v[5], onto: 'endpoint' });
    const far = attractVertex(insertTx(b.plat, 1), pt(25, 25)); // foot (25, 0): 15 cm from (40, 0)
    expect(far.ok && far.value).toMatchObject({ kind: 'vertex', vertex: b.v[6], onto: 'endpoint' });
  });

  it('a foot exactly as far from both ends of the edge (25 cm each): the endpoint with the smaller y, then x', () => {
    // SLANT: (23, 14) is 10 cm off the 50 cm edge (0, 0)–(30, 40) and 26.9 cm from both ends; its foot (15, 20) ties
    for (const level of [1, 2, 3, 4] as Level[]) {
      for (const order of [{}, { vertices: permutation(SLANT.vertices.length, level), edges: permutation(SLANT.edges.length, level + 5) }]) {
        const b = indexed(SLANT, order);
        expect(problems(b.plat)).toEqual([]);
        const before = fingerprint(b.plat);
        const t = insertTx(b.plat, level);
        const r = attractVertex(t, pt(23, 14));
        expect(r.ok && r.value).toEqual({ kind: 'vertex', at: { x: 0, y: 0 }, vertex: b.v[5], onto: 'endpoint' });
        expect(t.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 23, y: 14 } }]);
        expect(fingerprint(b.plat)).toBe(before);
      }
    }
  });

  it('two edges equally near: the one first by canonical key (its lower endpoint, y then x) takes the vertex', () => {
    const b = indexed(TWIN);
    const r = attractVertex(insertTx(b.plat, 1), pt(500, 25)); // 25 cm from y = 0 and from y = 50
    expect(r.ok && r.value.kind === 'split' && r.value.at.y === 0).toBe(true);
    expect(problems(b.plat)).toEqual([]);
  });
});

describe('attractRun: chain vertices attraction brings within minEdge merge, the later into the earlier', () => {
  it('two consecutive vertices landing on one vertex: the later merges, nothing written for it (W_ATTRACTED)', () => {
    const b = indexed(LINE);
    const t = insertTx(b.plat, 1);
    const r = attractRun(t, [pt(20, 20), pt(15, 24), pt(300, 100)]);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.map((x) => [x.attraction, x.vertex, x.mergedInto])).toEqual([
      ['vertex', b.v[5], -1], ['merged', b.v[5], 0], ['free', -1, -1],
    ]);
    expect(t.warnings).toEqual([{ code: 'W_ATTRACTED', count: 2, at: { x: 20, y: 20 } }]);
  });

  it('two consecutive vertices landing on two vertices 10 cm apart (an acute corner’s legs): the later merges', () => {
    const b = indexed(ACUTE);
    expect(problems(b.plat)).toEqual([]);
    const r = attractRun(insertTx(b.plat, 1), [pt(31, -3), pt(31, 12)]);
    expect(r.ok && r.value.map((x) => [x.attraction, x.mergedInto, x.vertex])).toEqual([['vertex', -1, b.v[6]], ['merged', 0, b.v[6]]]);
  });

  it('two targets 25.5 cm apart — beyond minEdge, within attractCm — do not merge', () => {
    const b = indexed(LINE);
    const t = insertTx(b.plat, 1);
    const r = attractRun(t, [pt(500, 100), pt(525, 105)]);
    expect(r.ok && r.value).toEqual([
      { at: { x: 500, y: 100 }, vertex: -1, attraction: 'free', mergedInto: -1 },
      { at: { x: 525, y: 105 }, vertex: -1, attraction: 'free', mergedInto: -1 },
    ]);
    expect(r.ok && r.warnings).toEqual([]);
    expect(t.warnings).toEqual([]);
  });

  it('a later vertex beside the earlier one’s split lands on it (the run reads the arena as the earlier left it)', () => {
    const b = indexed(LINE);
    const r = attractRun(insertTx(b.plat, 2), [pt(500, 20), pt(510, -15)]);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value[0].attraction).toBe('split');
    expect(r.value[1]).toMatchObject({ attraction: 'merged', mergedInto: 0, vertex: r.value[0].vertex });
    expect(problems(b.plat)).toEqual([]);
  });
});

describe('the staged branch and the charges', () => {
  it('candidate (c) — a clear-region batch’s prepared vertices — is notBuilt(M3a)', () => {
    const b = indexed(LINE);
    const t = insertTx(b.plat, 1, { prepared: [{ role: 'anchor', entity: 'district:1', ordinal: 0 }] });
    expect(() => attractVertex(t, pt(20, 20))).toThrow("notBuilt('M3a')");
    expect(attractVertex(insertTx(b.plat, 1, { prepared: [] }), pt(20, 20)).ok).toBe(true);
  });

  it('one attraction query per vertex; at the work limit E_WORK_LIMIT with nothing written', () => {
    const b = indexed(LINE);
    const t = insertTx(b.plat, 1);
    expect(attractVertex(t, pt(20, 20)).ok).toBe(true);
    expect(t.work.counts.get(INSERT_ATTRACT_QUERIES)).toBe(1);
    const before = fingerprint(b.plat);
    expect(attractVertex(insertTx(b.plat, 2, { workLimit: 0 }), pt(500, 20))).toEqual({ ok: false, code: 'E_WORK_LIMIT', detail: INSERT_ATTRACT_QUERIES });
    expect(fingerprint(b.plat)).toBe(before);
    // the split's placement charges too: a limit of 1 lets the query through and stops at the placement's own query
    expect(attractVertex(insertTx(b.plat, 2, { workLimit: 1 }), pt(500, 20))).toMatchObject({ ok: false, code: 'E_WORK_LIMIT' });
    expect(fingerprint(b.plat)).toBe(before);
  });

  it('a split charges no insert.points (step 1 charged the chain vertex) — one query for the attraction, one for the placement', () => {
    const b = indexed(LINE);
    const t = insertTx(b.plat, 2);
    const r = attractVertex(t, pt(500, 20));
    expect(r.ok && r.value.kind).toBe('split');
    expect(t.work.counts.get(INSERT_POINTS) ?? 0).toBe(0);
    expect(t.work.counts.get(INSERT_ATTRACT_QUERIES)).toBe(2);
    expect(t.work.counts.get(INSERT_PLACEMENT_CANDIDATES)).toBe(1);
    expect(t.work.total).toBe(3);
  });

  it('a point snap refuses: E_OUT_OF_RANGE', () => {
    const b = indexed(LINE);
    expect(attractVertex(insertTx(b.plat, 1), { x: Number.NaN, y: 0 } as never)).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
  });
});

describe('the placement’s fallback on a valid thin wedge (§3.6 *The placement rule*; C-0170 (1))', () => {
  it('no candidate qualifies, so the vertex lands on the nearer endpoint of its sub-edge — 327.2 cm, beyond √2 · attractCm — W_PLACED, nothing written', () => {
    for (const level of [1, 2, 3, 4] as Level[]) {
      const b = indexed(WEDGE);
      expect(problems(b.plat)).toEqual([]);
      const before = fingerprint(b.plat);
      const t = insertTx(b.plat, level);
      // (314, 3 190): 36.1 cm from (287, 3 214), so no vertex candidate; 9.17 cm from the edge (723, 3 092)–(0, 3 282),
      // its foot (316.3, 3 198.9) 420 cm and 327 cm from that edge's ends — a split, whose every band point within
      // attractCm would leave (287, 3 214) within minEdge of the new sub-edge towards (0, 3 282): (iii) refuses them all
      const r = attractVertex(t, pt(314, 3190));
      expect(r.ok && r.value).toEqual({ kind: 'vertex', at: { x: 0, y: 3282 }, vertex: b.v[7], onto: 'endpoint' });
      expect(t.warnings).toEqual([
        { code: 'W_PLACED', count: 1, at: { x: 0, y: 3282 } },
        { code: 'W_ATTRACTED', count: 1, at: { x: 314, y: 3190 } },
      ]);
      expect(Math.hypot(314 - 0, 3190 - 3282)).toBeGreaterThan(Math.SQRT2 * 26); // 327.2 cm: the bound's one exception
      expect(fingerprint(b.plat)).toBe(before);
      expect(t.journal.vertices).toEqual([]);
    }
  });

  it('the placement itself: every band point within attractCm tried and refused, then the nearer endpoint (W_PLACED)', () => {
    const b = indexed(WEDGE);
    const t = insertTx(b.plat, 3);
    // the exact position: (314, 3 190)'s foot on the edge (723, 3 092) → (0, 3 282)
    const ux = -723;
    const uy = 190;
    const s = ((314 - 723) * ux + (3190 - 3092) * uy) / (ux * ux + uy * uy);
    const r = placePoint(t, b.he[8], { x: 723 + s * ux, y: 3092 + s * uy });
    expect(r.ok && r.value).toMatchObject({ kind: 'endpoint', vertex: b.v[7] });
    expect(r.ok && r.warnings).toEqual([{ code: 'W_PLACED', count: 1, at: { x: 0, y: 3282 } }]);
    if (!r.ok) return;
    expect(r.value.tried).toBeGreaterThan(40); // the band's lattice points within attractCm, each charged
    expect(t.work.counts.get(INSERT_PLACEMENT_CANDIDATES)).toBe(r.value.tried);
    expect(t.warnings).toEqual([]); // a plan: the writer that commits it reports the warning
  });
});

describe('nearestRoutePiece: step 2’s edge candidate over one query’s edges (C-0321)', () => {
  const pieceAt = (p: Plat, level: Level, x: number, y: number) => {
    const near = query(p, p.key, level, { minX: x - 26, minY: y - 26, maxX: x + 26, maxY: y + 26 }, { vertices: true, edges: true });
    const pc = nearestRoutePiece(p, near.edges, pt(x, y), level);
    // its two ends, lower (y, x) first: the piece's direction along its run is not the claim
    return pc === null ? null : { ends: [at(p, pc.a), at(p, pc.b)].sort((u, v) => u[1] - v[1] || u[0] - v[0]) };
  };

  it('the nearest level-n piece holding the foot; ties to the first in the query’s canonical order; null beyond attractCm or at an end', () => {
    const b = indexed(TWIN);
    const p = b.plat;
    // 25 cm from y = 0 and from y = 50: the piece of the lower line, first by canonical key
    expect(pieceAt(p, 1, 500, 25)).toEqual({ ends: [[0, 0], [1000, 0]] });
    expect(pieceAt(p, 1, 500, 26)).toEqual({ ends: [[-5000, 50], [5000, 50]] }); // 24 cm from y = 50
    // at L1 the L3 vertex (300, 0) cuts no piece: the L1 piece (0, 0)–(1 000, 0); at L3 it does
    expect(pieceAt(p, 1, 200, -20)).toEqual({ ends: [[0, 0], [1000, 0]] });
    expect(pieceAt(p, 3, 200, -20)).toEqual({ ends: [[0, 0], [300, 0]] });
    expect(pieceAt(p, 1, 500, -27)).toBeNull(); // 27 cm off every edge
    expect(pieceAt(p, 1, 0, 10)).toBeNull(); // its foot at the vertex (0, 0): no piece holds it inside
    expect(pieceAt(p, 1, -2500, -5)).toEqual({ ends: [[-5000, 0], [0, 0]] });
    expect(nearestRoutePiece(p, [], pt(500, 25), 1)).toBeNull();
  });

  it('is planAttraction’s choice: the split lands on the piece it names, and it reads no index and charges nothing', () => {
    const b = indexed(TWIN);
    const p = b.plat;
    const t = insertTx(p, 1);
    const near = query(p, p.key, 1, { minX: 474, minY: -1, maxX: 526, maxY: 51 }, { edges: true });
    expect(nearestRoutePiece(p, near.edges, pt(500, 25), 1)).not.toBeNull();
    expect(t.work.total).toBe(0);
    const plan = planAttraction(t, pt(500, 25));
    expect(plan.ok && plan.value.kind === 'split' && plan.value.at).toEqual({ x: 500, y: 0 });
  });
});
