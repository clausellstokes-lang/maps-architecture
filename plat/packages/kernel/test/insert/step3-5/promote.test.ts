// M0-a-05: candidate (b) and its promotion (§3.6's candidates; §2.2 rule 3 *Promotion*, J-K11; §3.3's kept content).
// A coarser chain ending on a route beside a finer vertex — II.1 (3)'s neighbour step: a street ending on a kerb beside
// a plot line's end — attracts onto that vertex and promotes it to the batch's level (W_PROMOTED; its split flag kept),
// adding it to the coarser route without moving it or touching the finer faces beside it; one ending farther splits the
// route, each finer ring beside it equal to its prior ring with the vertex added (the seam exception, §3.3). Finer
// geometry off every coarser route is kept content: E_KEPT, nothing written (C-0177 (3), (4)). Every promotion is listed
// in the journal's `promoted` (the commit record's, §3.3; fix round 1, the check's PJ1).
import { describe, expect, it } from 'vitest';
import { faceWalk, VERTEX_SPLIT, VERTEX_STEINER, type Plat } from '../../../src/arena/index.js';
import { checkIndexState } from '../../../src/index/index.js';
import { chainJournal, promote } from '../../../src/insert/stretch.js';
import type { Level } from '../../../src/types/index.js';
import { fidelityProblems } from './fidelity.js';
import { allProblems, contentPrint, facesAt, framed, indexed, ins, tx, vertexAtPoint } from './support.js';
import type { ArenaSpec } from '../step1-2/support.js';

/** The rings of a level's records as point texts (each ring from its lowest point), sorted. */
function rings(p: Plat, level: Level): string[] {
  const O = p.halfEdges.origin;
  return facesAt(p, level).map((f) => faceWalk(p, level, f).map((r) => {
    const pts = r.map((h) => `${p.vertices.x[O[h]]},${p.vertices.y[O[h]]}`);
    let low = 0;
    for (let i = 1; i < pts.length; i++) if (pts[i] < pts[low]) low = i;
    return pts.slice(low).concat(pts.slice(0, low)).join(' ');
  }).join(' | ')).sort();
}

/** The frame, an L1 street along y = 2000, and an L3 plot line from the north ending on it at (2000, 2000). */
function neighbourStep(): Plat {
  const p = framed();
  expect(ins(tx(p, 1), [[0, 2000], [4000, 2000]], [{ role: 'way', entity: 'way:1' }]).ok).toBe(true);
  expect(ins(tx(p, 3), [[2000, 3500], [2000, 2000]], [{ role: 'plot_line', entity: 'plot:1' }]).ok).toBe(true);
  expect(allProblems(p)).toEqual([]);
  const s = vertexAtPoint(p, 2000, 2000);
  expect(p.vertices.level[s]).toBe(3);
  return p;
}

describe('candidate (b): a coarser chain ending beside a finer vertex on its route promotes it', () => {
  it('an L2 chain from the south ending 18 cm from the plot line\'s end: that L3 vertex is promoted to L2 (W_PROMOTED, its split flag kept, still finer than the L1 street), every finer ring unchanged', () => {
    const p = neighbourStep();
    const s = vertexAtPoint(p, 2000, 2000);
    const l2 = rings(p, 2);
    const l3 = rings(p, 3);
    const flags = p.vertices.flags[s];
    const t = tx(p, 2);
    const r = ins(t, [[2015, 1000], [2015, 1990]], [{ role: 'corridor_split', entity: 'way:n' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    expect(r.value.placed[1]).toBe(s);
    expect(r.warnings.map((w) => w.code)).toContain('W_PROMOTED');
    // Listed in the commit record (§3.6 W_PROMOTED; §3.3 `CommitRecord.promoted`): the journal M0-a-06 reads.
    expect(chainJournal(t).promoted).toEqual([s]);
    expect(p.vertices.level[s]).toBe(2);
    expect(p.vertices.flags[s] & VERTEX_SPLIT).toBe(flags & VERTEX_SPLIT);
    expect(p.vertices.flags[s] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    expect(p.vertices.flags[s] & VERTEX_STEINER).toBe(VERTEX_STEINER);
    // The finer faces beside it are untouched; the L2 rings on the north side are those before (the vertex was on
    // them already), the south L1 face's own child materialised at L2 now.
    expect(rings(p, 3)).toEqual(l3);
    for (const ring of l2) expect(rings(p, 2)).toContain(ring);
    expect(checkIndexState(p)).toEqual([]);
  });

  it('one ending 60 cm from it splits the street instead (an L2 Steiner vertex): each finer ring beside it is its prior ring with the vertex added', () => {
    const p = neighbourStep();
    const l3 = rings(p, 3);
    const t = tx(p, 2);
    const r = ins(t, [[2060, 1000], [2060, 1990]], [{ role: 'corridor_split', entity: 'way:n' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    const v = r.value.placed[1];
    expect([p.vertices.x[v], p.vertices.y[v], p.vertices.level[v]]).toEqual([2060, 2000, 2]);
    expect(r.warnings.map((w) => w.code)).not.toContain('W_PROMOTED');
    expect(chainJournal(t).promoted).toEqual([]);
    const after = rings(p, 3);
    // The L3 face east of the plot line now passes the new vertex: removing it gives back the prior ring.
    const strip = (ring: string): string => ring.split(' | ').map((r0) => r0.split(' ').filter((pt) => pt !== '2060,2000').join(' ')).join(' | ');
    expect(after.map((x) => strip(x)).map((x) => {
      // re-rotate each ring to its lowest point after the removal
      return x.split(' | ').map((r0) => {
        const pts = r0.split(' ');
        let low = 0;
        for (let i = 1; i < pts.length; i++) if (pts[i] < pts[low]) low = i;
        return pts.slice(low).concat(pts.slice(0, low)).join(' ');
      }).join(' | ');
    }).sort()).toEqual(l3);
  });

  it('promote(vertex, level) directly: to a level still finer than its run keeps the steiner flag; to its run\'s own level clears it and cuts the run in two route items (the index stays exact)', () => {
    const p = neighbourStep();
    const s = vertexAtPoint(p, 2000, 2000);
    const t2 = tx(p, 2);
    promote(t2, s, 2);
    expect(p.vertices.level[s]).toBe(2);
    expect(p.vertices.flags[s] & VERTEX_STEINER).toBe(VERTEX_STEINER);
    expect(checkIndexState(p)).toEqual([]);
    expect(t2.warnings.map((w) => w.code)).toEqual(['W_PROMOTED']);
    expect(chainJournal(t2).promoted).toEqual([s]);
    const t1 = tx(p, 1);
    promote(t1, s, 1);
    expect(p.vertices.level[s]).toBe(1);
    expect(p.vertices.flags[s] & VERTEX_STEINER).toBe(0);
    expect(p.vertices.flags[s] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    expect(checkIndexState(p)).toEqual([]);
    expect(allProblems(p)).toEqual([]);
    // A vertex already of the level is left as it is: no second warning, no second listing.
    promote(t1, s, 1);
    expect(t1.warnings).toEqual([{ code: 'W_PROMOTED', count: 1, at: { x: 2000, y: 2000 } }]);
    expect(chainJournal(t1).promoted).toEqual([s]);
  });
});

describe('finer geometry off every coarser route is kept content (E_KEPT, nothing written)', () => {
  it('an L2 chain into the north face, which holds L3 records: E_KEPT', () => {
    const p = neighbourStep();
    const before = contentPrint(p);
    const t = tx(p, 2);
    const r = ins(t, [[1000, 2500], [1500, 3000]], [{ role: 'kerb', entity: 'way:k' }], 'mandatory');
    expect(r.ok).toBe(false);
    // Refused at its first vertex, a free vertex inside an L3 record (step 2's kept-content test), before any write.
    if (!r.ok) expect([r.code, r.detail.includes('a chain vertex inside a finer face')]).toEqual(['E_KEPT', true]);
    expect(contentPrint(p)).toBe(before);
    expect(allProblems(p)).toEqual([]);
    expect(t.warnings).toEqual([]);
  });

  it('an L2 chain between two coarser points across the north face — its ends on the street and the frame, its edge through an L3 record but crossing no finer edge: E_KEPT', () => {
    const p = neighbourStep();
    const before = contentPrint(p);
    const r = ins(tx(p, 2), [[0, 2000], [1000, 4000]], [{ role: 'kerb', entity: 'way:k' }], 'mandatory');
    expect(r.ok).toBe(false);
    if (!r.ok) expect([r.code, r.detail.includes('would split a finer face')]).toEqual(['E_KEPT', true]);
    expect(contentPrint(p)).toBe(before);
  });

  it('an L1 chain crossing the L3 plot line: E_KEPT', () => {
    const p = neighbourStep();
    const before = contentPrint(p);
    const r = ins(tx(p, 1), [[1500, 2800], [2500, 2900]], [{ role: 'way', entity: 'way:k' }], 'mandatory');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_KEPT');
    expect(contentPrint(p)).toBe(before);
  });

  it('an L1 chain from the south ending 18 cm from the L3 vertex promotes it to L1 (its run\'s own level): the street cut in two route items', () => {
    const p = neighbourStep();
    const s = vertexAtPoint(p, 2000, 2000);
    const r = ins(tx(p, 1), [[2015, 1000], [2015, 1990]], [{ role: 'way', entity: 'way:2' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    expect(p.vertices.level[s]).toBe(1);
    expect(p.vertices.flags[s] & VERTEX_STEINER).toBe(0);
  });
});

describe('the placement\'s fallback onto the nearer end of the sub-edge, on a run with a finer vertex (the M0-a-04 closing check\'s N-6)', () => {
  /**
   * M0-a-04's thin wedge with an L2 vertex S = (181, 3 234) on the long L1 edge (723, 3 092)–(0, 3 282), 0.42 cm off its
   * line (the check's probe WEDGE_S): every band point beside (314, 3 190)'s foot fails clearance at the acute corner,
   * so the vertex falls back onto the nearer end of the sub-edge its exact position falls on — S, not the run's end.
   * S lies 139.9 cm from (314, 3 190), beyond N-43 B's fidelity bound of 2 · √2 · attractCm: the S1 – S3 router committed
   * the chain there (S promoted at L1); the S4 router refused it E_INVARIANT — no route from (1 500, 2 000) reached a
   * vertex within the bound of its end (a register case, N-44 (4); C-0215). S5's third pass (C-0217) lands the end on
   * the nearest existing vertex within the bound instead, the wedge's own (287, 3 214), 36.1 cm off (W_PLACED): the chain
   * commits within the bound, S untouched.
   */
  const WEDGE_S: ArenaSpec = {
    vertices: [[0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0], [897, 4000, 1], [287, 3214, 1], [723, 3092, 1], [0, 3282, 1], [181, 3234, 2]],
    edges: [[0, 1, 0], [1, 2, 0], [2, 4, 0], [4, 3, 0], [3, 7, 0], [7, 0, 0], [4, 5, 1], [5, 6, 1], [6, 8, 1], [8, 7, 1]],
  };

  it('a chain ending at (314, 3 190) at L1 – L4 — whose end falls back onto S, 139.9 cm off — lands instead on the nearest vertex within the bound, (287, 3 214), on the third pass (C-0217); S keeps its level, nothing is promoted', () => {
    for (const level of [1, 2, 3, 4] as Level[]) {
      const b = indexed(WEDGE_S);
      const p = b.plat;
      expect(allProblems(p)).toEqual([]);
      expect(Math.hypot(181 - 314, 3234 - 3190)).toBeGreaterThan(2 * Math.SQRT2 * 26);
      const t = tx(p, level);
      const before = contentPrint(p);
      const r = ins(t, [[1500, 2000], [314, 3190]], [{ role: 'way', entity: 'way:w' }]);
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) continue;
      expect(contentPrint(p)).not.toBe(before);
      expect(r.value.placed.map((v) => [p.vertices.x[v], p.vertices.y[v]])).toEqual([[1500, 2000], [287, 3214]]);
      expect(r.warnings).toEqual([{ code: 'W_PLACED', count: 2, at: { x: 287, y: 3214 } }, { code: 'W_ATTRACTED', count: 1, at: { x: 314, y: 3190 } }]);
      expect(fidelityProblems(p, level, 'mandatory', [[1500, 2000], [314, 3190]], {}, r.value.placed, 'way:w')).toEqual([]);
      expect(allProblems(p)).toEqual([]);
      expect(p.vertices.level[b.v[8]]).toBe(2);
      expect(chainJournal(t).promoted).toEqual([]);
    }
  });
});
