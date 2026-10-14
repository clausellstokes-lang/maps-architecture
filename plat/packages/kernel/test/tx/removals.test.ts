// M0-a-06: removals and their consequences (§2.2 rule 3 *Dissolution*, *Levels follow the rows — demotion (a) – (c)*,
// split restoration; §3.4 removeEdges, clearFiner; §13.1's "removals" fixtures): a lane removed from a spine it ended
// on restores the spine exactly with its own shape vertices untouched (the split flag); a crossing way removed restores
// the way it crossed; clearFiner after a refinement restores the coarser level exactly; kept content survives a clear
// and refuses a removal beside it; a removal leaving a way in two parts without a rekey is refused by role consistency.
import { describe, expect, it } from 'vitest';
import { faceKey, idOf, roleIdOf, rowsOn, VERTEX_SPLIT, VERTEX_STEINER } from '../../src/arena/index.js';
import { insertChain, splitThrough } from '../../src/insert/index.js';
import { clearFiner, removeEdges, retypeEdges, routeLines, setOwner, tx } from '../../src/tx/index.js';
import type { Level, StageId } from '../../src/types/index.js';
import { between, commit, degreeAt, edgeRows, framed, healthy, must, pt, readable, S4, S8, S10, spec, state, vertexAtPoint } from './support.js';

const noVersion = (s: string): string => s.replace(/#v\d+$/, '');

/** The L1 face north of the spine (its key's first vertex on y = 2000). */
function northFace(p: ReturnType<typeof framed>): number {
  const r = resolveFaces(p);
  return r;
}

function resolveFaces(p: ReturnType<typeof framed>): number {
  const F = p.faces[1];
  for (let f = 0; f < p.slots.face[1].top; f++) {
    if (F.kind[f] === 0xffff) continue;
    const k = faceKey(p, 1, f);
    if (p.vertices.y[k[0]] === 2000) return f;
  }
  throw new Error('no north face');
}

/** A frame split by a spine way:1 along y = 2000, committed by an L1 batch. */
function spined(points: readonly (readonly [number, number])[] = [[0, 2000], [4000, 2000]]) {
  const p = framed();
  commit(p, 1, (o) => insertChain(o, points.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: 'way:1' }], 'mandatory'));
  return p;
}

describe('§13.1 removals: a lane removed from a spine it ended on — the spine restored exactly', () => {
  it('an L1 lane (a same-level split of the spine) removed: the junction dissolves, the spine is one edge again', () => {
    const p = spined();
    const before = noVersion(state(p));
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    const j = vertexAtPoint(p, 2000, 2000);
    expect(j).toBeGreaterThanOrEqual(0);
    expect(p.vertices.flags[j] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    healthy(p);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    healthy(p);
    expect(noVersion(state(p))).toBe(before);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(-1);
    expect(c.record?.edgesRemoved).toBeGreaterThanOrEqual(2); // the lane's edge and the spine's second part, merged back
    expect(edgeRows(p, [0, 2000], [4000, 2000])).toEqual(['way/way:1']);
  });

  it('an L2 lane (a Steiner vertex on the L1 spine) removed by an L2 batch: the Steiner vertex dissolves (steinerDissolved)', () => {
    const p = spined();
    const before = noVersion(state(p));
    commit(p, 2, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
    const s = vertexAtPoint(p, 2000, 2000);
    expect(p.vertices.level[s]).toBe(2);
    expect(p.vertices.flags[s] & (VERTEX_SPLIT | VERTEX_STEINER)).toBe(VERTEX_SPLIT | VERTEX_STEINER);
    healthy(p);
    const c = commit(p, 2, (o) => removeEdges(o, { role: 'kerb', entity: 'lane:1' }));
    healthy(p);
    expect(noVersion(state(p))).toBe(before);
    expect(c.record?.steinerDissolved).toBeGreaterThanOrEqual(1);
  });

  it('a lane that ended on the spine\'s own shape vertex: removed, the shape vertex stays (no split flag)', () => {
    const p = spined([[0, 2000], [2000, 2100], [4000, 2000]]);
    const before = noVersion(state(p));
    const shape = vertexAtPoint(p, 2000, 2100);
    expect(shape).toBeGreaterThanOrEqual(0);
    expect(p.vertices.flags[shape] & VERTEX_SPLIT).toBe(0);
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2100), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    expect(degreeAt(p, 2000, 2100)).toBe(3);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    healthy(p);
    expect(noVersion(state(p))).toBe(before);
    expect(degreeAt(p, 2000, 2100)).toBe(2);
  });

  it('a way crossing the spine removed: the crossing vertex dissolves, the spine restored', () => {
    const p = spined();
    const before = noVersion(state(p));
    commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    expect(degreeAt(p, 2000, 2000)).toBe(4);
    healthy(p);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    healthy(p);
    expect(noVersion(state(p))).toBe(before);
  });

  it('split restoration: a junction left between the spine\'s two edges with a finer plot line at it takes the finer level', () => {
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    commit(p, 3, (o) => insertChain(o, [pt(2000, 2000), pt(1000, 1000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    const j = vertexAtPoint(p, 2000, 2000);
    expect(p.vertices.level[j]).toBe(1);
    healthy(p);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    healthy(p);
    expect(p.vertices.level[j]).toBe(3);
    expect(p.vertices.flags[j] & (VERTEX_SPLIT | VERTEX_STEINER)).toBe(VERTEX_SPLIT | VERTEX_STEINER);
    expect(c.record?.demoted.vertices).toContain(j);
  });
});

describe('§13.1: a removal that leaves a way in two parts without a rekey is refused by role consistency', () => {
  it('a stretch from the middle of way:1 removed: E_INVARIANT, the arena as it was', () => {
    const p = spined([[0, 2000], [1000, 2000], [3000, 2100], [4000, 2000]]);
    const before = state(p);
    const r = tx(p, spec(1), (o) => removeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(1000, 2000), to: pt(3000, 2100) }));
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe('E_INVARIANT');
      expect(r.detail).toContain('role consistency');
    }
    expect(state(p)).toBe(before);
  });

  it('the far part handed to way:9 by rekey first: the same removal commits, each way one part', () => {
    const p = spined([[0, 2000], [1000, 2000], [3000, 2100], [4000, 2000]]);
    const c = commit(p, 1, (o) => {
      must(retypeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(3000, 2100), to: pt(4000, 2000) }, [], [], { from: 'way:1', to: 'way:9' }));
      return removeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(1000, 2000), to: pt(3000, 2100) });
    });
    healthy(p);
    expect(edgeRows(p, [3000, 2100], [4000, 2000])).toEqual(['way/way:9']);
    expect(edgeRows(p, [0, 2000], [1000, 2000])).toEqual(['way/way:1']);
    expect(edgeRows(p, [1000, 2000], [3000, 2100])).toBeNull();
    expect(c.record?.roles.map((k) => `${k.role}/${k.entity}`)).toEqual(expect.arrayContaining(['way/way:1', 'way/way:9']));
  });
});

describe('§13.1: clearFiner after a refinement restores the coarser level exactly', () => {
  it('an L1 block refined at L2 (a lane ending on two of its sides) and at L3, then cleared from S8: the L1 arena as before', () => {
    const p = spined();
    // The north block, owned at L1 by S4.
    const blockFace = northFace(p);
    commit(p, 1, (o) => setOwner(o, [blockFace], 'block:n'), { stage: S4, rederivesFrom: S4 });
    const before = noVersion(state(p));
    // The refinement: an L2 lane across the block (ending on the spine and the frame), its faces re-owned at S8.
    const c2 = commit(p, 2, (o) => {
      must(insertChain(o, [pt(1500, 2000), pt(1500, 4000)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
      return { ok: true as const, value: null, warnings: [] };
    });
    const l2 = c2.record?.faces.find((d) => d.level === 2)?.created ?? [];
    expect(l2.length).toBeGreaterThanOrEqual(2);
    commit(p, 2, (o) => setOwner(o, l2, 'cell:1'), { stage: S8, rederivesFrom: S8 });
    commit(p, 3, (o) => insertChain(o, [pt(500, 2000), pt(500, 4000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    healthy(p);
    const cl = commit(p, 1, (o) => clearFiner(o, { owner: 'block:n', level: 1 }, 1), { stage: S8, rederivesFrom: S8 });
    expect(cl.value).toEqual([]);
    healthy(p);
    expect(noVersion(state(p))).toBe(before);
  });

  it('kept content: an L2 face made by S8 survives a clear re-deriving from S10, and a removal beside it is E_KEPT', () => {
    const p = spined();
    const blockFace = northFace(p);
    commit(p, 1, (o) => setOwner(o, [blockFace], 'block:n'), { stage: S4, rederivesFrom: S4 });
    const c2 = commit(p, 2, (o) => insertChain(o, [pt(1500, 2000), pt(1500, 4000)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
    const l2 = c2.record?.faces.find((d) => d.level === 2)?.created ?? [];
    commit(p, 2, (o) => setOwner(o, l2, 'cell:1'), { stage: S8, rederivesFrom: S8 });
    const before = noVersion(state(p));
    const cl = commit(p, 1, (o) => clearFiner(o, { owner: 'block:n', level: 1 }, 1), { stage: S10, rederivesFrom: S10 });
    expect(cl.record).toBeNull(); // nothing cleared: the S8 content is kept, and kept content is never reported
    expect(noVersion(state(p))).toBe(before);
    const r = tx(p, spec(1, { stage: S10, rederivesFrom: S10 }), (o) => removeEdges(o, { role: 'kerb', entity: 'lane:1' }));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_KEPT'); // a finer row beside kept content
    const r2 = tx(p, spec(1, { stage: S10, rederivesFrom: S10 }), (o) => clearFiner(o, { owner: 'block:n', level: 1 }, 0));
    expect(r2.ok).toBe(false);
    if (!r2.ok) expect(r2.code).toBe('E_LEVEL');
  });
});

describe('L8 (judged, hardening round S7): a face split by a batch keeps the split face\'s stage rank, and the kept-content rule reads it', () => {
  it('an L2 cell made by S8, split by an S4 batch\'s lane: both parts rank 8 (§2.2 rule 4, §3.6 step 5) — cleared by an S8 re-derivation, kept from S10', () => {
    // §2.2 rule 4: "a split face's two parts both inherit its owner and stage rank until the stage re-owns one"; §3.3 kept
    // content reads that rank, so the split parts are S8's content, not S4's: S8 clears them, S10 keeps them.
    const run = (from: StageId): { cleared: boolean; ranks: number[] } => {
      const p = spined();
      const blockFace = northFace(p);
      commit(p, 1, (o) => setOwner(o, [blockFace], 'block:n'), { stage: S4, rederivesFrom: S4 });
      const c2 = commit(p, 2, (o) => insertChain(o, [pt(1500, 2000), pt(1500, 4000)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
      const l2 = c2.record?.faces.find((d) => d.level === 2)?.created ?? [];
      commit(p, 2, (o) => setOwner(o, l2, 'cell:1'), { stage: S8, rederivesFrom: S8 });
      const c3 = commit(p, 2, (o) => insertChain(o, [pt(0, 3000), pt(1500, 3000)], [{ role: 'kerb', entity: 'lane:2' }], 'mandatory'), { stage: S4, rederivesFrom: S4 });
      const split = c3.record?.faces.find((d) => d.level === 2);
      const parts = [...(split?.created ?? []), ...(split?.changed ?? [])];
      const ranks = parts.map((f) => p.faces[2].stage[f]).sort((a, b) => a - b);
      const cl = commit(p, 1, (o) => clearFiner(o, { owner: 'block:n', level: 1 }, 1), { stage: from, rederivesFrom: from });
      healthy(p);
      return { cleared: cl.record !== null, ranks };
    };
    const s8 = run(S8);
    expect(s8.ranks.length).toBeGreaterThanOrEqual(2);
    expect([...new Set(s8.ranks)]).toEqual([8]);
    expect(s8.cleared).toBe(true);
    expect(run(S10).cleared).toBe(false);
  });
});

describe('§2.2 rule 3 (a): an edge whose remaining rows are all above its birth level takes the lowest of them', () => {
  it('a quay on a shore: the shore row removed by an L0 batch, the edge becomes L1 (demoted), the L0 faces beside it merge', () => {
    const p = framed();
    // An L0 lake ring and an L1 way sharing its south side.
    commit(p, 0, (o) => insertChain(o, [pt(1000, 1000), pt(3000, 1000), pt(3000, 3000), pt(1000, 3000)], [{ role: 'shore', entity: 'water:1' }], 'mandatory', { closed: true }));
    commit(p, 1, (o) => insertChain(o, [pt(1000, 1000), pt(3000, 1000)], [{ role: 'way', entity: 'quay:1' }], 'mandatory'));
    healthy(p);
    const h = between(p, [1000, 1000], [3000, 1000]);
    expect(p.halfEdges.level[h >> 1]).toBe(0);
    const c = commit(p, 0, (o) => removeEdges(o, { role: 'shore', entity: 'water:1' }));
    healthy(p);
    const h2 = between(p, [1000, 1000], [3000, 1000]);
    expect(p.halfEdges.level[h2 >> 1]).toBe(1);
    expect(c.record?.demoted.edges.length).toBe(1);
    expect(rowsOn(p, 'edge', h2).map((r) => p.roles.kind[r])).toEqual([roleIdOf('way')]);
    expect(c.record?.faces.find((d) => d.level === 0)?.removed.length).toBeGreaterThanOrEqual(1);
  });
});

describe('a VertexRef removal: the vertex role row stripped, the split vertex it held dissolves', () => {
  it('a contact name placed by splitThrough on the spine, then removed by its VertexRef: the spine restored', () => {
    const p = spined();
    const before = noVersion(state(p));
    commit(p, 1, (o) => splitThrough(o, between(p, [0, 2000], [4000, 2000]), pt(1500, 2000), { role: 'anchor', entity: 'district:1' }));
    expect(vertexAtPoint(p, 1500, 2000)).toBeGreaterThanOrEqual(0);
    commit(p, 1, (o) => removeEdges(o, { role: 'anchor', entity: 'district:1', ordinal: 0 }));
    healthy(p);
    expect(noVersion(state(p))).toBe(before);
  });
});

describe('C-0185 (4): which identical-row pairs are runs', () => {
  it('a chain\'s own corner that landed on another way\'s edge (a split vertex): the way removed, the corner kept, its flag cleared', () => {
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 0), pt(2000, 2010), pt(3000, 0)], [{ role: 'way', entity: 'way:b' }], 'mandatory'));
    const v = vertexAtPoint(p, 2000, 2000);
    expect(v).toBeGreaterThanOrEqual(0);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:1' }));
    healthy(p);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(v);
    expect(degreeAt(p, 2000, 2000)).toBe(2);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(0);
    expect(c.record?.unflagged).toContain(v);
    expect(edgeRows(p, [1000, 0], [2000, 2000])).toEqual(['way/way:b']);
  });

  it('a split vertex whose two remaining edges carry different rows (a chain shares one side) is not dissolved', () => {
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'lane:1' }], 'mandatory'));
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(4000, 2000)], [{ role: 'district_bound', entity: 'district:1' }], 'mandatory'));
    expect(edgeRows(p, [2000, 2000], [4000, 2000])).toEqual(['district_bound/district:1', 'way/way:1']);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'lane:1' }));
    healthy(p);
    expect(degreeAt(p, 2000, 2000)).toBe(2);
    expect(edgeRows(p, [0, 2000], [2000, 2000])).toEqual(['way/way:1']);
  });

  it('a split vertex whose remaining edges match at their level but differ in a finer row (an L2 kerb ending on one side): restored to L2, then the kerb\'s removal dissolves it', () => {
    // Session round S7 (census R-10, queue Q62; checks/M0-a-06-notes.md N-s6-1, N-s6c-1): the kerb ENDING at the junction
    // is finer geometry the vertex meets, so split restoration applies with no finer edge or vertex row: the junction
    // takes the kerb's level (a Steiner vertex of the spine's L1 run, flag kept) and the L1 route is restored exactly.
    // Before the round it stayed an L1 route vertex, and the kerb's later removal — a lawful L2 batch — dissolved an L1
    // vertex and was refused by index freshness ('an L2 batch wrote the L1 index (delete of vertex … (L1)) …').
    const p = spined();
    const spine = noVersion(state(p));
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'lane:1' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(2000, 2000), pt(4000, 2000)], [{ role: 'kerb', entity: 'kerb:1' }], 'mandatory'));
    const v = vertexAtPoint(p, 2000, 2000);
    expect(edgeRows(p, [2000, 2000], [4000, 2000])).toEqual(['kerb/kerb:1', 'way/way:1']);
    healthy(p);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'lane:1' }));
    healthy(p);
    readable(p);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(v);
    expect(p.vertices.level[v]).toBe(2);
    expect(p.vertices.flags[v] & (VERTEX_SPLIT | VERTEX_STEINER)).toBe(VERTEX_SPLIT | VERTEX_STEINER);
    expect(c.record?.demoted.vertices).toContain(v);
    expect(degreeAt(p, 2000, 2000)).toBe(2);
    expect(edgeRows(p, [0, 2000], [2000, 2000])).toEqual(['way/way:1']);
    expect(edgeRows(p, [2000, 2000], [4000, 2000])).toEqual(['kerb/kerb:1', 'way/way:1']);
    const way = routeLines(p, { role: 'way', entity: 'way:1' }, { layer: 'ground', part: 0 });
    expect(way.map((ln) => ln.vertices.map((u) => `${p.vertices.x[u]},${p.vertices.y[u]}`))).toEqual([['0,2000', '4000,2000']]);
    // The kerb removed by its own level's batch: committed, the junction dissolved, the spine as before the lane.
    const r = tx(p, spec(2), (o) => removeEdges(o, { role: 'kerb', entity: 'kerb:1' }));
    expect(r.ok ? 'committed' : `${r.code} ${r.detail}`).toBe('committed');
    healthy(p);
    readable(p);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(-1);
    expect(noVersion(state(p))).toBe(spine);
  });

  it('N-19: a split vertex whose run the batch retypes on one side only (a shore row east of it): no run survives whole with identical rows, so (b) clears its flag and lists it', () => {
    // checks/M0-a-06-notes.md N-19 (mutant S06: rule 3 (b)'s survival test without the after-batch row identity).
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    commit(p, 0, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    const v = vertexAtPoint(p, 2000, 2000);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    const c = commit(p, 0, (o) => retypeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(2000, 2000), to: pt(4000, 2000) }, [{ role: 'shore', entity: 'water:1' }], []));
    healthy(p);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(v);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(0);
    expect(c.record?.unflagged).toEqual([v]);
    expect(edgeRows(p, [0, 2000], [2000, 2000])).toEqual(['way/way:1']);
    expect(edgeRows(p, [2000, 2000], [4000, 2000])).toEqual(['shore/water:1', 'way/way:1']);
  });

  it('split restoration with a finer chain ending at the vertex along the run (an L2 kerb on one side, an L3 plot line at it): L2, not L3', () => {
    // Session round S6 (C-0356; checks/M0-a-06-notes.md N-c1-5, N-c1-6): the junction lane:1 leaves on the spine meets
    // the L3 plot line, so split restoration lowers it past L1 — but the kerb along the spine ENDS there, so its level is
    // at most L2: at L3 the spine's L2 rows would differ along the L2 route edge through it (the encoder refuses the
    // arena) and the kerb's L2 route would have no end (routeLines throws).
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'lane:1' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(2000, 2000), pt(4000, 2000)], [{ role: 'kerb', entity: 'kerb:1' }], 'mandatory'));
    commit(p, 3, (o) => insertChain(o, [pt(2000, 2000), pt(1000, 1000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    const v = vertexAtPoint(p, 2000, 2000);
    expect(p.vertices.level[v]).toBe(1);
    healthy(p);
    readable(p);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'lane:1' }));
    healthy(p);
    readable(p);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(v);
    expect(p.vertices.level[v]).toBe(2);
    expect(p.vertices.flags[v] & (VERTEX_SPLIT | VERTEX_STEINER)).toBe(VERTEX_SPLIT | VERTEX_STEINER);
    expect(c.record?.demoted.vertices).toContain(v);
    expect(edgeRows(p, [0, 2000], [2000, 2000])).toEqual(['way/way:1']);
    expect(edgeRows(p, [2000, 2000], [4000, 2000])).toEqual(['kerb/kerb:1', 'way/way:1']);
    const kerb = routeLines(p, { role: 'kerb', entity: 'kerb:1' }, { layer: 'ground', part: 0 });
    expect(kerb.map((ln) => ln.vertices.map((u) => `${p.vertices.x[u]},${p.vertices.y[u]}`))).toEqual([['2000,2000', '4000,2000']]);
  });

  it('N-s6c-2: split restoration lists the faces round the vertex changed only at the levels it leaves, [its level, the level it takes)', () => {
    // checks/M0-a-06-notes.md N-s6c-2 (mutants N12: the bound dropped; N8: the bound read before the ending chain lowers
    // it): the ending fixture with L2 records round the junction (kerbs at x = 1000 south and x = 3000 north) — the
    // junction leaves L1's route only, so only L1 faces round it change; the L2 face south-east of it, whose L2 ring still
    // passes the junction, is not listed (nor any L3 face).
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'lane:1' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(2000, 2000), pt(4000, 2000)], [{ role: 'kerb', entity: 'kerb:1' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(1000, 2000), pt(1000, 0)], [{ role: 'kerb', entity: 'kerb:2' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(3000, 2000), pt(3000, 4000)], [{ role: 'kerb', entity: 'kerb:3' }], 'mandatory'));
    commit(p, 3, (o) => insertChain(o, [pt(2000, 2000), pt(1000, 1000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'lane:1' }));
    healthy(p);
    readable(p);
    expect(p.vertices.level[vertexAtPoint(p, 2000, 2000)]).toBe(2);
    const keyText = (level: Level, f: number): string => {
      const k = faceKey(p, level, f);
      return `(${p.vertices.x[k[0]]},${p.vertices.y[k[0]]})-(${p.vertices.x[k[1]]},${p.vertices.y[k[1]]})`;
    };
    const changed = (c.record?.faces ?? []).map((d) => `L${d.level} ${d.changed.map((f) => keyText(d.level, f)).join(' ')}`);
    expect(changed).toEqual(['L1 (0,0)-(4000,0) (0,2000)-(4000,2000)', 'L2 (0,2000)-(1000,2000)', 'L3 ', 'L4 ']);
  });

  it('split restoration with a finer chain running THROUGH the vertex along the run (an L2 kerb on both sides, an L3 plot line at it): L3', () => {
    // The bound C-0356 adds reads only rows one run edge carries and the other does not: a kerb along the whole spine
    // passes through the junction, so the junction leaves its L2 route too and takes the plot line's level.
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'lane:1' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(0, 2000), pt(2000, 2000), pt(4000, 2000)], [{ role: 'kerb', entity: 'kerb:1' }], 'mandatory'));
    commit(p, 3, (o) => insertChain(o, [pt(2000, 2000), pt(1000, 1000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    const v = vertexAtPoint(p, 2000, 2000);
    healthy(p);
    readable(p);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'lane:1' }));
    healthy(p);
    readable(p);
    expect(p.vertices.level[v]).toBe(3);
    expect(p.vertices.flags[v] & (VERTEX_SPLIT | VERTEX_STEINER)).toBe(VERTEX_SPLIT | VERTEX_STEINER);
    const kerb = routeLines(p, { role: 'kerb', entity: 'kerb:1' }, { layer: 'ground', part: 0 });
    expect(kerb.map((ln) => ln.vertices.map((u) => `${p.vertices.x[u]},${p.vertices.y[u]}`))).toEqual([['0,2000', '4000,2000']]);
  });
});

describe('C-0185 (3): a merged face keeps the record with the smallest canonical key', () => {
  it('four owned blocks, one way removed: the west record survives each merge, the crossing dissolves', () => {
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:v' }], 'mandatory'));
    const ownerAt = (x: number, y: number): string => {
      const F = p.faces[1];
      for (let f = 0; f < p.slots.face[1].top; f++) {
        if (F.kind[f] === 0xffff) continue;
        const k = faceKey(p, 1, f);
        if (p.vertices.x[k[0]] === x && p.vertices.y[k[0]] === y) return String(f);
      }
      return '';
    };
    const sw = Number(ownerAt(0, 0));
    const se = Number(ownerAt(2000, 0));
    const nw = Number(ownerAt(0, 2000));
    const ne = Number(ownerAt(2000, 2000));
    commit(p, 1, (o) => {
      must(setOwner(o, [sw], 'b:sw'));
      must(setOwner(o, [se], 'b:se'));
      must(setOwner(o, [nw], 'b:nw'));
      return setOwner(o, [ne], 'b:ne');
    });
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:v' }));
    healthy(p);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(-1);
    const owners: string[] = [];
    const F = p.faces[1];
    for (let f = 0; f < p.slots.face[1].top; f++) if (F.kind[f] !== 0xffff) owners.push(idOf(p, F.owner[f]));
    expect(owners.sort()).toEqual(['b:nw', 'b:sw']);
    expect(c.record?.faces[0].removed.length).toBe(2);
    expect(c.record?.owners).toEqual(['b:ne', 'b:nw', 'b:se', 'b:sw']);
  });
});

describe('§2.2 rule 3 (a) + rule 2, C-0185 (3): an edge demoted to a level whose sides hold no record gets its own children there', () => {
  // An L1 way w:1 carrying a finer row of its own on the same edge — an L2 kerb, or an L3 plot line (rule 3: a finer
  // batch may add rows of its own level to a coarser edge) — dangling inside the frame or crossing it. The finer level
  // holds no record anywhere before (the finer insert shares the L1 edge). An L1 batch removing the way demotes the edge
  // to the finer row's level; the L1 faces beside it merge into one with no L1 edge, so the face its own children hang
  // from is the merged one, and the batch must leave a record on each side at the new level (checks/M0-a-06.md F-1).
  const cases: { lv: 2 | 3; role: string }[] = [{ lv: 2, role: 'kerb' }, { lv: 3, role: 'plot_line' }];
  function carried(cross: boolean, lv: 2 | 3, role: string): ReturnType<typeof framed> {
    const p = framed();
    const a = cross ? pt(0, 500) : pt(500, 500);
    const b = cross ? pt(4000, 500) : pt(1500, 500);
    commit(p, 1, (o) => insertChain(o, [a, b], [{ role: 'way', entity: 'w:1' }], 'mandatory'));
    commit(p, lv, (o) => insertChain(o, [a, b], [{ role, entity: 'f:1' }], 'mandatory'));
    healthy(p);
    return p;
  }
  const records = (p: ReturnType<typeof framed>, l: number): number => {
    let n = 0;
    for (let f = 0; f < p.slots.face[l].top; f++) if (p.faces[l].kind[f] !== 0xffff) n += 1;
    return n;
  };
  for (const { lv, role } of cases) {
    for (const cross of [false, true]) {
      for (const how of ['removeEdges', 'retypeEdges remove'] as const) {
        it(`an L1 way carrying an L${lv} ${role} row, ${cross ? 'crossing the frame' : 'dangling'}: ${how} commits a valid arena`, () => {
          const p = carried(cross, lv, role);
          const r = tx(p, spec(1), (o) => (how === 'removeEdges'
            ? removeEdges(o, { role: 'way', entity: 'w:1' })
            : retypeEdges(o, { role: 'way', entity: 'w:1' }, [], ['way'])));
          expect(r.ok).toBe(true);
          healthy(p);
          const h = cross ? between(p, [0, 500], [4000, 500]) : between(p, [500, 500], [1500, 500]);
          expect(p.halfEdges.level[h >> 1]).toBe(lv);
          expect(edgeRows(p, cross ? [0, 500] : [500, 500], cross ? [4000, 500] : [1500, 500])).toEqual([`${role}/f:1`]);
          // The new level holds a record each side (one for a dangling edge, two for a crossing one), every level between
          // its own child; the commit record lists them as created.
          const rec = r.ok ? r.value.record : null;
          expect(records(p, lv)).toBe(cross ? 2 : 1);
          expect(rec?.faces.find((d) => d.level === lv)?.created.length).toBe(cross ? 2 : 1);
          for (let l = 1; l < lv; l++) expect(records(p, l)).toBe(1);
        });
      }
    }
  }

  it('the merged L1 record is kept — its owner with it — and the L2 records hang from it', () => {
    const p = carried(true, 2, 'kerb');
    const south = (() => {
      for (let f = 0; f < p.slots.face[1].top; f++) if (p.faces[1].kind[f] !== 0xffff && p.vertices.y[faceKey(p, 1, f)[0]] === 0) return f;
      return -1;
    })();
    const north = (() => {
      for (let f = 0; f < p.slots.face[1].top; f++) if (p.faces[1].kind[f] !== 0xffff && p.vertices.y[faceKey(p, 1, f)[0]] === 500) return f;
      return -1;
    })();
    commit(p, 1, (o) => {
      must(setOwner(o, [south], 'b:s'));
      return setOwner(o, [north], 'b:n');
    });
    const r = tx(p, spec(1), (o) => removeEdges(o, { role: 'way', entity: 'w:1' }));
    expect(r.ok).toBe(true);
    healthy(p);
    // The survivor by canonical key is the south record (its key starts at (0, 0)): kept, not re-made.
    expect(p.faces[1].kind[south]).not.toBe(0xffff);
    expect(idOf(p, p.faces[1].owner[south])).toBe('b:s');
    const rec = r.ok ? r.value.record : null;
    expect(rec?.faces.find((d) => d.level === 1)?.created).toEqual([]);
    for (let f = 0; f < p.slots.face[2].top; f++) if (p.faces[2].kind[f] !== 0xffff) expect(p.faces[2].parent[f]).toBe(south);
  });

  for (const horizontalFiner of [true, false]) {
    it(`two edges of one entity demoted to two levels by one rewrite (an L3 plot line ${horizontalFiner ? 'across' : 'down'}, an L2 kerb ${horizontalFiner ? 'down' : 'across'}): every record nests`, () => {
      // d:1's two crossing chains, one carrying an L3 plot line, the other an L2 kerb; one removeEdges demotes both. The
      // L2 records (either side of the kerb) are made first, then the L3 ones under them (coarser targets first, C-0189).
      const p = framed();
      commit(p, 1, (o) => {
        must(insertChain(o, [pt(0, 1000), pt(4000, 1000)], [{ role: 'district_bound', entity: 'd:1' }], 'mandatory'));
        return insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'district_bound', entity: 'd:1' }], 'mandatory');
      });
      const across = [pt(0, 1000), pt(2000, 1000), pt(4000, 1000)];
      const down = [pt(2000, 0), pt(2000, 1000), pt(2000, 4000)];
      commit(p, 3, (o) => insertChain(o, horizontalFiner ? across : down, [{ role: 'plot_line', entity: 'pl:1' }], 'mandatory'));
      commit(p, 2, (o) => insertChain(o, horizontalFiner ? down : across, [{ role: 'kerb', entity: 'k:1' }], 'mandatory'));
      healthy(p);
      const r = tx(p, spec(1), (o) => removeEdges(o, { role: 'district_bound', entity: 'd:1' }));
      expect(r.ok).toBe(true);
      healthy(p);
      expect(records(p, 1)).toBe(1);
      expect(records(p, 2)).toBe(2);
      expect(records(p, 3)).toBe(4);
      // Each L3 record lies on its L2 parent's side of the kerb.
      const side = (l: 2 | 3, f: number): boolean => {
        const k = faceKey(p, l, f);
        return horizontalFiner ? p.vertices.x[k[0]] < 2000 || (p.vertices.x[k[0]] === 2000 && p.vertices.x[k[1]] < 2000) : p.vertices.y[k[0]] < 1000;
      };
      for (let f = 0; f < p.slots.face[3].top; f++) {
        if (p.faces[3].kind[f] === 0xffff) continue;
        expect(side(3, f)).toBe(side(2, p.faces[3].parent[f]));
      }
    });
  }

  it('the coarser records beside the edge merged by the same rewrite: two crossing district bounds of one entity removed at once', () => {
    // d:1's horizontal chain carries an L2 kerb across the frame; its vertical chain crosses it. One removeEdges strips
    // both: the vertical is deleted, the horizontal demoted to L2, the four L1 records merge into one (no L1 edge left,
    // but the demoted kerb inside it), and the kerb's two sides take L2 records under it.
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(0, 500), pt(4000, 500)], [{ role: 'district_bound', entity: 'd:1' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(0, 500), pt(4000, 500)], [{ role: 'kerb', entity: 'f:1' }], 'mandatory'));
    commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'district_bound', entity: 'd:1' }], 'mandatory'));
    healthy(p);
    expect(records(p, 1)).toBe(4);
    const r = tx(p, spec(1), (o) => removeEdges(o, { role: 'district_bound', entity: 'd:1' }));
    expect(r.ok).toBe(true);
    healthy(p);
    expect(records(p, 1)).toBe(1);
    expect(records(p, 2)).toBe(2);
    expect(edgeRows(p, [0, 500], [4000, 500])).toEqual(['kerb/f:1']);
  });
});
