// C-0284 (3) (session round S7; C-0297): insertChain's own clearance wrappers round a split are retired. C-0177 (11) had
// insertChain's step 2 (`land`, after `planAttraction`) and step 3's landing (`planLanding`, after `placePoint`) test the
// placed split's sub-edge with `splitBreaksClearance` and fall back onto its nearer end. Since C-0284 the placement rule's
// (iii) applies §3.10's clearance at the split sub-edge's own ends itself (`splitEndsBreachClearance`): a candidate on a
// sub-edge whose ends cannot clear each other's edges once split never qualifies, so `placePoint` answers the endpoint
// fallback (W_PLACED) and the wrappers could no longer see a breaching split. `splitBreaksClearance` (still read by
// `placeOnRun`, which searches a run itself, and by the face partitioners) now IS that predicate. These pins hold the
// claim on the arena of C-0284's own fixture — the shallow corner at the frame: an L1 chord E (3 034, 4 000) – P (2 912,
// 3 984) – (2 000, 2 000) – (2 000, 0), P 16 cm inside the frame at 7.5°, so no point of P–E keeps clearance once split —
// at each door the wrappers stood in: both land on P with W_PLACED and write no vertex on P–E. The control: P 30 cm in.
import { describe, expect, it } from 'vitest';
import { isHalfEdgeLive, isVertexLive, outgoing, type HalfEdgeId, type Plat, type VertexId } from '../../../src/arena/index.js';
import { query } from '../../../src/index/index.js';
import { insertTx } from '../../../src/insert/classes.js';
import { insertChain } from '../../../src/insert/insertChain.js';
import { splitEndsBreachClearance } from '../../../src/insert/placement.js';
import { pieceOf, planLanding, splitBreaksClearance } from '../../../src/insert/stretch.js';
import type { Level } from '../../../src/types/index.js';
import { allProblems, fingerprint, indexed, pt } from './support.js';

/** C-0284's arena (splitThrough.test.ts `nearFrame`): the L0 frame [0, 4 000]² and the L1 chord E – P – (2 000, 2 000) – (2 000, 0). */
function nearFrame(d: number): ReturnType<typeof indexed> {
  return indexed({
    vertices: [
      [0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0], // 0 – 3
      [3034, 4000, 1], [2912, 4000 - d, 1], [2000, 2000, 1], [2000, 0, 1], // 4 E, 5 P, 6, 7
    ],
    edges: [
      [0, 7, 0], [7, 1, 0], [1, 2, 0], [2, 4, 0], [4, 3, 0], [3, 0, 0],
      [4, 5, 1], [5, 6, 1], [6, 7, 1],
    ],
  });
}

/** The half-edge the level-n index names the edge P–E by (its route edge, as step 3's query answers it). */
function routeEdge(p: Plat, n: Level, a: VertexId, b: VertexId): HalfEdgeId {
  const O = p.halfEdges.origin;
  const box = { minX: 2800, minY: 3900, maxX: 3100, maxY: 4000 };
  const h = query(p, p.key, n, box, { edges: true }).edges.find((g) => (O[g] === a && O[g ^ 1] === b) || (O[g] === b && O[g ^ 1] === a));
  if (h === undefined) throw new Error('the index names no route edge P–E');
  return h;
}

/** Every live vertex of the arena lying strictly between P and E on their segment (a split of P–E). */
function onPE(p: Plat, P: VertexId, E: VertexId): VertexId[] {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const out: VertexId[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (v === P || v === E || !isVertexLive(p, v)) continue;
    const cross = (X[E] - X[P]) * (Y[v] - Y[P]) - (Y[E] - Y[P]) * (X[v] - X[P]);
    const dot = (X[v] - X[P]) * (X[E] - X[P]) + (Y[v] - Y[P]) * (Y[E] - Y[P]);
    const l2 = (X[E] - X[P]) * (X[E] - X[P]) + (Y[E] - Y[P]) * (Y[E] - Y[P]);
    if (cross * cross <= 2 * l2 && dot > 0 && dot < l2) out.push(v); // within 1.42 cm of the segment, inside it
  }
  return out;
}

describe('C-0284 (3): a split\'s own-end breach is refused by the placement rule before insertChain\'s retired wrappers could see it (C-0297)', () => {
  it('splitBreaksClearance is the placement rule\'s (iii) at the split\'s ends: equal to splitEndsBreachClearance on every edge, both ways, of the shallow corner and its control', () => {
    for (const d of [16, 30]) {
      const p = nearFrame(d).plat;
      let breaching = 0;
      for (let e = 0; e < p.slots.pair.top; e++) {
        if (!isHalfEdgeLive(p, 2 * e)) continue;
        const [s, t] = [p.halfEdges.origin[2 * e], p.halfEdges.origin[2 * e + 1]];
        expect(splitBreaksClearance(p, s, t)).toBe(splitEndsBreachClearance(p, s, t));
        expect(splitBreaksClearance(p, t, s)).toBe(splitEndsBreachClearance(p, t, s));
        if (splitBreaksClearance(p, s, t)) breaching += 1;
      }
      // P–E alone breaches, and only on the shallow corner (not vacuous)
      expect(breaching).toBe(d === 16 ? 1 : 0);
    }
  });

  for (const level of [1, 2] as const) {
    it(`step 3's landing at L${level} (planLanding, the contact, join or leave point door): a position on P–E lands on P by the placement's own fallback, W_PLACED — no split planned`, () => {
      const b = nearFrame(16);
      const p = b.plat;
      const [E, P] = [b.v[4], b.v[5]];
      const t = insertTx(p, level);
      const before = fingerprint(p);
      const l = planLanding(t, pieceOf(p, routeEdge(p, level, P, E), level), 2966, 3991.08);
      expect(l.ok && l.value).toEqual({ kind: 'vertex', vertex: P, onto: 'fallback', warnings: [{ code: 'W_PLACED', count: 1, at: pt(2912, 3984) }] });
      expect(fingerprint(p)).toBe(before);
    });

    it(`step 2 at L${level} (insertChain's land, the attraction door): a chain point 6 cm off P–E lands on P, W_PLACED; no vertex written on P–E; §3.10 holds`, () => {
      const b = nearFrame(16);
      const p = b.plat;
      const [E, P] = [b.v[4], b.v[5]];
      const t = insertTx(p, level);
      const r = insertChain(t, [pt(2966, 3985), pt(3600, 3200)], [{ role: 'way', entity: 'way:t' }], 'mandatory');
      expect(r.ok ? r.value.placed[0] : `${r.code} ${r.detail}`).toBe(P);
      expect(r.warnings.filter((w) => w.code === 'W_PLACED')).toEqual([{ code: 'W_PLACED', count: 1, at: pt(2912, 3984) }]);
      expect(onPE(p, P, E)).toEqual([]);
      expect(outgoing(p, P).map((h) => p.halfEdges.origin[h ^ 1]).includes(E)).toBe(true); // P–E still one edge
      expect(allProblems(p)).toEqual([]);
    });
  }

  it('the control: P 30 cm inside the frame — the same chain point splits P–E (the placement places it), §3.10 holds', () => {
    const b = nearFrame(30);
    const p = b.plat;
    const [E, P] = [b.v[4], b.v[5]];
    const t = insertTx(p, 1);
    const r = insertChain(t, [pt(2966, 3985), pt(3600, 3200)], [{ role: 'way', entity: 'way:t' }], 'mandatory');
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.placed[0]).not.toBe(P);
    expect(onPE(p, P, E)).toEqual([r.value.placed[0]]);
    expect(allProblems(p)).toEqual([]);
  });
});
