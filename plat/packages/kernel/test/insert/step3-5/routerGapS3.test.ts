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
import { describe, expect, it } from 'vitest';
import { allocVertex, createPlat, type Plat, type VertexId } from '../../../src/arena/index.js';
import { attachIndex, indexAdd, ITEM_VERTEX } from '../../../src/index/index.js';
import { exactCrossings, placeAcross } from '../../../src/insert/crossings.js';
import { chainJournal, type ChainCtx } from '../../../src/insert/stretch.js';
import type { Cm } from '../../../src/types/index.js';
import { GROUND, pt } from '../../arena/support.js';
import { allProblems, edgeRows, framed, ins, liveEdges, tx } from './support.js';

/** §3.6 *Existing geometry wins*: an incoming chain vertex moves at most √2 · attractCm (the attracted bound of §3.7). */
const ATTRACTED_BOUND = Math.SQRT2 * 26;

/** M0-a-08's arena: a ground arena 2²⁴ cm wide (no margin), its index on a grid of `cell` cm. */
function wideArena(cell: number): Plat {
  const p = createPlat(GROUND, { widthCm: (1 << 24) as Cm, heightCm: (1 << 24) as Cm, aspect: 1, marginShare: 0 });
  attachIndex(p, { gridCellCm: cell });
  return p;
}

/** The distance from (px, py) to the segment a–b. */
function segDist(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(ax + t * dx - px, ay + t * dy - py);
}

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

// ---- (a) ----------------------------------------------------------------------------------------------------------------

const FRAME: readonly (readonly [number, number])[] = [[26030, 29363], [38207, 29363], [38207, 41692], [26030, 41692]];
const CHAINS: readonly (readonly [readonly [number, number], readonly [number, number]])[] = [
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
    for (let i = 0; i < 8; i++) expect(ins(t, CHAINS[i], [{ role: 'invisible', entity: `s${i}` }]).ok).toBe(true);
    expect(edgeRows(p, [31868, 35406], [30183, 35876])).not.toBeNull();
    expect(edgeRows(p, [31926, 35390], [30615, 35718])).not.toBeNull();
    const c1 = cross(CHAINS[8][0], CHAINS[8][1], [31868, 35406], [30183, 35876]);
    const c2 = cross(CHAINS[8][0], CHAINS[8][1], [31926, 35390], [30615, 35718]);
    expect(Math.hypot(c1[0] - c2[0], c1[1] - c2[1])).toBeLessThan(25);
    expect(Math.hypot(c1[0] - c2[0], c1[1] - c2[1])).toBeCloseTo(19.42, 2);
  });

  // placeAcross on its own (crossings.ts): the segment's remainder from the crossing it placed on (31879, 35456)–(31311,
  // 35898), i.e. (31834, 35491) → (30953, 35363), stood up as two free vertices on the eighth chain's arena.
  it('placeAcross: the near crossing qualifies only with the far side\'s sub-edge left out of (iii) — (31656, 35465), W_PLACED; with any other partner no point qualifies (the far edge stands 19.4 cm off)', () => {
    const p = wideArena(64);
    const t = tx(p, 0);
    for (let i = 0; i < 8; i++) expect(ins(t, CHAINS[i], [{ role: 'invisible', entity: `s${i}` }]).ok).toBe(true);
    const free = (x: number, y: number): VertexId => {
      const v = allocVertex(p, pt(x, y), 0, 0);
      indexAdd(p, { kind: ITEM_VERTEX, level: 0, slot: v });
      return v;
    };
    const a = free(31834, 35491);
    const b = free(30953, 35363);
    const ctx: ChainCtx = { tx: t, p, n: 0, cls: 'mandatory', rows: [], warnings: [], journal: chainJournal(t), maxPass: 0, strict: false, undo: [] };
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
          if (frame) expect(ins(t, FRAME, [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true }).ok).toBe(true);
          for (let i = 0; i < CHAINS.length; i++) {
            const c = reversed && i === 8 ? [CHAINS[i][1], CHAINS[i][0]] : CHAINS[i];
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
          const move = chainMove(p, 's8', CHAINS[8][0], CHAINS[8][1]);
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

// ---- (b) ----------------------------------------------------------------------------------------------------------------

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
