// M0-a-14's listed test: "each row has a positive fixture (holds) and a negative control (a hand-corrupted arena fails
// naming the row)". Every §3.10 row (KERNEL_ROWS) has a describe here: the positive fixture is a real committed batch
// (or a real arena) on which the row holds with its subjects counted; the negative control corrupts the arena, the
// record or the row's context by hand and the row — named in the problem — fails. Rows whose subjects M0 lacks are
// shown vacuous in the batch (count 0) and their predicates judged directly.
import { describe, expect, it } from 'vitest';
import {
  addRole,
  faceHoles,
  isFaceLive,
  outgoing,
  rowsOn,
  setFaceHoles,
  VERTEX_FREE,
  walkRing,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import { WALK_REACH_CM } from '../../src/insert/rewalk.js';
import { HOT_PIXEL_CM, indexChange, indexOf, itemKey, ITEM_FACE, rebuildAtStageEnd, rebuildForFreeze } from '../../src/index/index.js';
import { faceArea2 as itemsFaceArea2 } from '../../src/index/items.js';
import {
  checkBatch,
  checkCI,
  checkFreeze,
  checkSave,
  checkStageEnd,
  eulerCounts,
  faceArea2,
  KERNEL_ROWS,
  poolScopeProblems,
  seedTilingProblems,
  touchedSet,
  wholeRecord,
  type BatchContext,
  type FaceBefore,
  type InvariantResult,
} from '../../src/invariants/index.js';
import { faceLeftOf, Meter } from '../../src/invariants/common.js';
import type { KernelResult } from '../../src/num/index.js';
import { clearFiner, removeEdges, setOwner, tx, type CommitRecord, type Overlay } from '../../src/tx/index.js';
import type { Level, StageId } from '../../src/types/index.js';
import { warp } from '../../src/warp/index.js';
import { box, drag } from '../warp/support.js';
import { ALONG_MIX, randomBatch, type Live, type Mix } from '../tx/fuzzgen.js';
import { contentPrint, vertexAtPoint } from '../tx/support.js';
import { allProblems, commit, facesAt, framed, must, pt, rng, rowOf, spec, suiteTx } from './support.js';

const done = (): KernelResult<null> => ({ ok: true, value: null, warnings: [] });

/** The frame [0, 4000]² crossed by an L1 way each way at 2000: four L1 blocks. */
function blocks(): Plat {
  const p = framed();
  commit(p, 1, (o) => {
    must(insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:v' }], 'mandatory'));
    must(insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:h' }], 'mandatory'));
    return done();
  });
  return p;
}

/** An L2 kerb across the lower-left block, wall to wall: two L2 faces there. Returns its commit record. */
function withKerb(p: Plat): CommitRecord {
  return commit(p, 2, (o) => insertChain(o, [pt(0, 1000), pt(2000, 1000)], [{ role: 'kerb', entity: 'kerb:1' }], 'mandatory')).record as CommitRecord;
}

/** A fresh arena with the kerb, and the kerb's record. */
function base(): { p: Plat; r: CommitRecord } {
  const p = blocks();
  const r = withKerb(p);
  return { p, r };
}

function v(p: Plat, x: number, y: number): VertexId {
  const w = vertexAtPoint(p, x, y);
  if (w < 0) throw new Error(`fixture: no vertex at (${x}, ${y})`);
  return w;
}

/** The half-edge from (ax, ay) to (bx, by). */
function he(p: Plat, a: VertexId, b: VertexId): HalfEdgeId {
  const h = outgoing(p, a).find((g) => p.halfEdges.origin[g ^ 1] === b);
  if (h === undefined) throw new Error('fixture: no such edge');
  return h;
}

function holds(results: readonly InvariantResult[], name: string): InvariantResult {
  const r = rowOf(results, name);
  expect(r.problems, `${name} on the positive fixture`).toEqual([]);
  expect(r.holds).toBe(true);
  return r;
}

function fails(results: readonly InvariantResult[], name: string): InvariantResult {
  const r = rowOf(results, name);
  expect(r.holds, `${name} on the negative control`).toBe(false);
  expect(r.problems.length).toBeGreaterThan(0);
  for (const x of r.problems) expect(x.startsWith(`${name}: `)).toBe(true);
  return r;
}

describe('every §3.10 row is declared, and this file has a fixture for each', () => {
  it('the rows', () => {
    expect(KERNEL_ROWS.map((r) => r.name)).toEqual([
      'lattice-range', 'min-edge', 'clearance', 'one-vertex-per-point', 'simple-faces', 'nesting', 'placement-bound',
      'level-consistency', 'held-vertices', 'prepared-contacts', 'kept-content', 'role-consistency', 'references-resolve',
      'frozen-base', 'index-freshness', 'pool-scope', 'arena-isolation', 'seed-tiling', 'face-corners',
      'face-corners-optional', 'euler',
    ]);
  });
});

describe('the batch-local subjects: the record\'s faces, its vertex lists and their one-ring', () => {
  it('a record naming only moved, promoted, demoted or unflagged vertices touches them and their incident edges', () => {
    const { p, r } = base();
    const w = v(p, 2000, 3000 - 1000);
    const bare: CommitRecord = { ...r, faces: [], moved: [], promoted: [], demoted: { vertices: [], edges: [] }, unflagged: [] };
    expect(touchedSet(p, bare).vertices).toEqual([]);
    for (const k of ['moved', 'promoted', 'unflagged'] as const) {
      const t = touchedSet(p, { ...bare, [k]: [w] });
      expect(t.vertices).toEqual([w]);
      expect(t.pairs.length).toBe(outgoing(p, w).length);
    }
    expect(touchedSet(p, { ...bare, demoted: { vertices: [w], edges: [] } }).vertices).toEqual([w]);
    const h = outgoing(p, w)[0];
    expect(touchedSet(p, { ...bare, demoted: { vertices: [], edges: [h] } }).pairs).toEqual([h >> 1]);
  });
  it('a record\'s created and changed faces bring their rings\' vertices; removed ones do not', () => {
    const { p, r } = base();
    const t = touchedSet(p, r);
    expect(t.faces.length).toBe(r.faces.reduce((n, d) => n + d.created.length + d.changed.length, 0));
    expect(t.vertices).toContain(v(p, 0, 1000));
    expect(t.vertices).toContain(v(p, 2000, 1000));
  });
});

describe('lattice-range', () => {
  it('holds on a committed batch; a coordinate at the range fails', () => {
    const { p, r } = base();
    expect(holds(checkBatch(r, p), 'lattice-range').subjects).toBeGreaterThan(0);
    p.vertices.x[v(p, 2000, 1000)] = p.lattice.rangeCm;
    fails(checkBatch(r, p), 'lattice-range');
  });
  it('the bound is strict: rangeCm − 1 holds, −rangeCm fails', () => {
    const { p, r } = base();
    const w = v(p, 2000, 1000);
    p.vertices.x[w] = p.lattice.rangeCm - 1;
    expect(rowOf(checkBatch(r, p), 'lattice-range').problems).toEqual([]);
    p.vertices.x[w] = 2000;
    p.vertices.y[w] = -p.lattice.rangeCm;
    fails(checkBatch(r, p), 'lattice-range');
  });
});

describe('min-edge', () => {
  it('holds on a committed batch; an edge of 24 cm fails, of 25 cm holds', () => {
    const { p, r } = base();
    expect(holds(checkBatch(r, p), 'min-edge').subjects).toBeGreaterThan(0);
    // The kerb's end on the frame at (0, 1000): its neighbour on the frame is (0, 0); shrink the kerb's run by moving its
    // west end along the frame next to the kerb's east end's mirror — instead move the kerb's own end 1976 cm east.
    const a = v(p, 0, 1000);
    const b = v(p, 2000, 1000);
    p.vertices.x[a] = 1976; // the kerb edge (1976, 1000)–(2000, 1000): 24 cm
    fails(checkBatch(r, p), 'min-edge');
    p.vertices.x[a] = 1975; // 25 cm: at minEdge, not shorter
    expect(rowOf(checkBatch(r, p), 'min-edge').problems.filter((x) => x.includes(`(${p.vertices.x[a]}, 1000)–(${p.vertices.x[b]}, 1000)`))).toEqual([]);
  });
  it('the length is Euclidean: a diagonal (17, 17) edge of 24.04 cm fails; a (15, 20) edge of exactly 25 cm holds', () => {
    // An L2 lane (500, 500)–(1500, 1500) inside the lower-left block: its far end has the lane as its only edge.
    const p = blocks();
    const r = commit(p, 2, (o) => insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory')).record as CommitRecord;
    holds(checkBatch(r, p), 'min-edge');
    const e = v(p, 1500, 1500);
    p.vertices.x[e] = 517;
    p.vertices.y[e] = 517; // √(17² + 17²) = 24.04 cm (|dx| + |dy| = 34, max(|dx|, |dy|) = 17)
    const res = fails(checkBatch(r, p), 'min-edge');
    expect(res.problems).toEqual(['min-edge: the edge (500, 500)–(517, 517) is shorter than minEdge (25 cm)']);
    p.vertices.x[e] = 515;
    p.vertices.y[e] = 520; // √(15² + 20²) = 25 cm exactly (max(|dx|, |dy|) = 20): at minEdge, not shorter
    holds(checkBatch(r, p), 'min-edge');
  });
});

describe('clearance', () => {
  it('holds on a committed batch; a vertex moved 10 cm from an edge outside its one-ring fails', () => {
    const p = blocks();
    const r = commit(p, 2, (o) => insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory')).record as CommitRecord;
    expect(holds(checkBatch(r, p), 'clearance').subjects).toBeGreaterThan(0);
    const e = v(p, 1500, 1500);
    p.vertices.y[e] = 1990; // 10 cm below the way y = 2000, which is outside its one-ring
    p.vertices.x[e] = 1500;
    const res = fails(checkBatch(r, p), 'clearance');
    expect(res.problems.some((x) => x.includes('(1500, 1990)'))).toBe(true);
  });
  it('exactly minEdge away holds (the bound is strict)', () => {
    const p = blocks();
    const r = commit(p, 2, (o) => insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory')).record as CommitRecord;
    p.vertices.y[v(p, 1500, 1500)] = 1975;
    holds(checkBatch(r, p), 'clearance');
  });
});

describe('one-vertex-per-point', () => {
  it('holds on a committed batch; a vertex moved onto another vertex\'s lattice point fails', () => {
    const p = blocks();
    const r = commit(p, 2, (o) => insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory')).record as CommitRecord;
    expect(holds(checkBatch(r, p), 'one-vertex-per-point').subjects).toBeGreaterThan(0);
    const e = v(p, 1500, 1500);
    p.vertices.x[e] = 500;
    p.vertices.y[e] = 500; // onto the lane's other end
    fails(checkBatch(r, p), 'one-vertex-per-point');
  });
});

describe('simple-faces', () => {
  it('holds on a committed batch; a lane end moved across a way (two edges cross) fails', () => {
    const p = blocks();
    const r = commit(p, 2, (o) => insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory')).record as CommitRecord;
    expect(holds(checkBatch(r, p), 'simple-faces').subjects).toBeGreaterThan(0);
    p.vertices.y[v(p, 1500, 1500)] = 2500;
    const res = fails(checkBatch(r, p), 'simple-faces');
    expect(res.problems.some((x) => x.includes('cross'))).toBe(true);
  });
  it('a rotation out of angular order (a face ring crossing itself at a vertex) fails', () => {
    const { p, r } = base();
    // The T-junction (2000, 1000): the kerb arrives from the west. Move the kerb's far end east of the way — the kerb
    // edge now leaves eastward, but the rotation still holds it on the west.
    const a = v(p, 0, 1000);
    p.vertices.x[a] = 2600;
    const res = fails(checkBatch(r, p), 'simple-faces');
    expect(res.problems.some((x) => x.includes('angular order') || x.includes('counter-clockwise') || x.includes('cross') || x.includes('overlap'))).toBe(true);
  });
  it('a rotation swapped at a crossing (no coordinate moved) fails on the angular order', () => {
    const { p } = base();
    holds(checkCI(p), 'simple-faces');
    const c = v(p, 2000, 2000);
    const out = outgoing(p, c);
    const order = [out[0], out[2], out[1], out[3]];
    for (let i = 0; i < 4; i++) {
      p.halfEdges.next[order[i] ^ 1] = order[(i + 1) % 4];
      p.halfEdges.prev[order[(i + 1) % 4]] = order[i] ^ 1;
    }
    const res = fails(checkBatch(wholeRecord(p), p), 'simple-faces');
    expect(res.problems.some((x) => x.includes('angular order'))).toBe(true);
  });
  it('a face record whose outer ring is walked clockwise (its outer half-edge on the far side) fails on the winding', () => {
    const { p } = base();
    let f0 = -1;
    for (let f = 0; f < p.slots.face[0].top; f++) if (isFaceLive(p, 0, f)) f0 = f;
    p.faces[0].outer[f0] ^= 1; // the frame's outside: walked clockwise
    const res = fails(checkBatch(wholeRecord(p), p), 'simple-faces');
    expect(res.problems.some((x) => x.includes('does not wind counter-clockwise'))).toBe(true);
    expect(res.problems.some((x) => x.includes('angular order') || x.includes('cross'))).toBe(false);
  });
  it('a face record whose outer ring has no area (a floating antenna\'s cycle) fails on the winding', () => {
    const p = blocks();
    const r = commit(p, 2, (o) => insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory')).record as CommitRecord;
    holds(checkBatch(r, p), 'simple-faces');
    const f = r.faces.find((d) => d.level === 2)?.created[0] ?? r.faces.find((d) => d.level === 2)?.changed[0] as FaceId;
    p.faces[2].outer[f] = he(p, v(p, 500, 500), v(p, 1500, 1500));
    const res = fails(checkBatch(r, p), 'simple-faces');
    expect(res.problems.some((x) => x.includes('twice its area 0'))).toBe(true);
  });
  it('a hole ring stored on its island side (wound counter-clockwise) fails on the winding', () => {
    // An L2 island ring [500, 1500]² in the lower-left block: the block's other L2 face holds it as a hole, wound clockwise.
    const p = blocks();
    commit(p, 2, (o) => insertChain(o, [pt(500, 500), pt(1500, 500), pt(1500, 1500), pt(500, 1500)], [{ role: 'kerb', entity: 'ring:1' }], 'mandatory', { closed: true }));
    holds(checkBatch(wholeRecord(p), p), 'simple-faces');
    let host = -1;
    for (let f = 0; f < p.slots.face[2].top; f++) if (isFaceLive(p, 2, f) && faceHoles(p, 2, f).length > 0) host = f;
    expect(host).toBeGreaterThanOrEqual(0);
    const holes = faceHoles(p, 2, host);
    setFaceHoles(p, 2, host, holes.map((h) => h ^ 1)); // each hole ring now walked on the island's side: counter-clockwise
    const res = fails(checkBatch(wholeRecord(p), p), 'simple-faces');
    expect(res.problems.some((x) => x.includes('hole ring winds counter-clockwise'))).toBe(true);
  });
  it('a face whose outer ring winds clockwise fails', () => {
    const { p, r } = base();
    // Mirror the lower-left block's whole content in x = 1000: every ring's winding reverses, nothing crosses.
    for (let w = 0; w < p.slots.vertex.top; w++) {
      if (p.vertices.x[w] <= 2000 && p.vertices.y[w] <= 1000) p.vertices.y[w] = 1000 - p.vertices.y[w];
    }
    fails(checkBatch(r, p), 'simple-faces');
  });
});

describe('nesting', () => {
  it('holds on a committed batch; an L2 face re-parented to another block fails', () => {
    const { p, r } = base();
    expect(holds(checkBatch(r, p), 'nesting').subjects).toBeGreaterThan(0);
    const f = r.faces.find((d) => d.level === 2)?.created[0] as FaceId;
    const par = p.faces[2].parent[f];
    let other = -1;
    for (let g = 0; g < p.slots.face[1].top; g++) if (isFaceLive(p, 1, g) && g !== par) other = g;
    p.faces[2].parent[f] = other;
    fails(checkBatch(r, p), 'nesting');
  });
  it('a dead parent fails', () => {
    const { p, r } = base();
    const f = r.faces.find((d) => d.level === 2)?.created[0] as FaceId;
    p.faces[2].parent[f] = p.slots.face[1].top + 3;
    fails(checkBatch(r, p), 'nesting');
  });
  it('an island face (an L2 ring with no coarser edge) holds, and fails when its parent is another block', () => {
    const p = blocks();
    const r = commit(p, 2, (o) => insertChain(o, [pt(500, 500), pt(1500, 500), pt(1500, 1500), pt(500, 1500)], [{ role: 'kerb', entity: 'ring:1' }], 'mandatory', { closed: true })).record as CommitRecord;
    holds(checkBatch(r, p), 'nesting');
    const created = r.faces.find((d) => d.level === 2)?.created ?? [];
    const island = created.find((f) => p.faces[2].parent[f] >= 0 && faceArea2(p, 2, f) === 2 * 1000 * 1000) as FaceId;
    expect(island).toBeGreaterThanOrEqual(0);
    const par = p.faces[2].parent[island];
    let other = -1;
    for (let g = 0; g < p.slots.face[1].top; g++) if (isFaceLive(p, 1, g) && g !== par) other = g;
    p.faces[2].parent[island] = other;
    fails(checkBatch(r, p), 'nesting');
  });
});

describe('nesting: the record left of a half-edge, asked of the index past the walk\'s reach (N-s8c-1, C-0349 (1), C-0359)', () => {
  /**
   * A sliver's shape (N-s8c-1): an L1 route (0, 3000)–(4000, 3002), 0.3 to 0.4 cm above the lattice row y = 3000 over
   * x ∈ [600, 800]; an L2 chain ends on it at (600, 3000) and (800, 3000) — two L2 Steiner vertices off the route on its
   * lower side. The sub-edge between them has a ±0 box (y = 3000) the route misses, and its corner lies in the lower L1
   * face: the upper face, whose walk holds the half-edge going +x, met the index only past the box.
   */
  function sliver(): { p: Plat; a: VertexId; b: VertexId } {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(0, 3000), pt(4000, 3002)], [{ role: 'way', entity: 'way:s' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(600, 3000), pt(600, 3500), pt(800, 3500), pt(800, 3000)], [{ role: 'kerb', entity: 'kerb:u' }], 'mandatory'));
    return { p, a: v(p, 600, 3000), b: v(p, 800, 3000) };
  }
  it('the reach is rewalk.ts\'s one definition: ⌈4 · HOT_PIXEL_CM⌉ = 3 cm', () => {
    expect(WALK_REACH_CM).toBe(Math.ceil(4 * HOT_PIXEL_CM));
    expect(WALK_REACH_CM).toBe(3);
  });
  it('two L2 Steiner vertices off the L1 route: faceLeftOf finds the record whose walk holds the sub-edge (−1 with a ±0 box)', () => {
    const { p, a, b } = sliver();
    expect([p.vertices.level[a], p.vertices.level[b]]).toEqual([2, 2]);
    const h = he(p, a, b);
    expect(p.halfEdges.level[h >> 1]).toBe(1); // a sub-edge of the L1 route, both its ends L2
    const L1 = facesAt(p, 1);
    expect(L1).toHaveLength(2);
    const holder = (g: HalfEdgeId): FaceId => {
      const ring = new Set<HalfEdgeId>(walkRing(p, 1, g));
      const f = L1.find((x) => ring.has(p.faces[1].outer[x]) || faceHoles(p, 1, x).some((k) => ring.has(k)));
      if (f === undefined) throw new Error('fixture: no L1 record holds the half-edge');
      return f;
    };
    const up = holder(h);
    const down = holder(h ^ 1);
    expect(up).not.toBe(down);
    const m = new Meter();
    expect(faceLeftOf(p, 1, h, m)).toBe(up);
    expect(faceLeftOf(p, 1, h ^ 1, new Meter())).toBe(down);
    expect(m.read().faces).toBe(2); // both L1 records are candidates: the exact test decides
    expect(allProblems(p)).toEqual([]);
  });
});

describe('placement-bound', () => {
  it('a kerb end placed on the way (a finer vertex on a coarser run) holds; moved 3 cm off the route fails', () => {
    const { p, r } = base();
    const end = v(p, 2000, 1000);
    expect(p.vertices.level[end]).toBe(2);
    const ctx: BatchContext = { placed: [end] };
    expect(holds(checkBatch(r, p, ctx), 'placement-bound').subjects).toBe(1);
    p.vertices.x[end] = 2003;
    fails(checkBatch(r, p, ctx), 'placement-bound');
  });
  it('0.71 cm is the bound: 1 cm off fails; a vertex on no coarser edge is no subject', () => {
    const { p, r } = base();
    const end = v(p, 2000, 1000);
    p.vertices.x[end] = 2001;
    fails(checkBatch(r, p, { placed: [end] }), 'placement-bound');
    p.vertices.x[end] = 2000;
    // The kerb's interior has no vertex; the frame-side end (0, 1000) lies on the L0 frame: a subject too.
    const west = v(p, 0, 1000);
    expect(rowOf(checkBatch(r, p, { placed: [west] }), 'placement-bound').subjects).toBe(1);
    const corner = v(p, 2000, 2000);
    expect(rowOf(checkBatch(r, p, { placed: [corner] }), 'placement-bound').subjects).toBe(0);
  });
  it('half a lattice diagonal off a 45° route (d² = 0.5 cm²) holds; a whole diagonal off fails', () => {
    const p = blocks();
    commit(p, 1, (o) => insertChain(o, [pt(2100, 2000), pt(4000, 3900)], [{ role: 'way', entity: 'way:d' }], 'mandatory'));
    const r = commit(p, 2, (o) => insertChain(o, [pt(3000, 4000), pt(3000, 2900)], [{ role: 'kerb', entity: 'kerb:d' }], 'mandatory')).record as CommitRecord;
    const end = v(p, 3000, 2900);
    expect(p.vertices.level[end]).toBe(2);
    holds(checkBatch(r, p, { placed: [end] }), 'placement-bound');
    p.vertices.y[end] = 2901; // |3000 − 2901 − 100| / √2 = 0.7071 cm
    holds(checkBatch(r, p, { placed: [end] }), 'placement-bound');
    p.vertices.y[end] = 2902; // 1.41 cm
    fails(checkBatch(r, p, { placed: [end] }), 'placement-bound');
  });
  it('a vertex named more than once (placed twice, moved, on a moved run) is one subject, reported once', () => {
    const { p, r } = base();
    const end = v(p, 2000, 1000);
    const rec: CommitRecord = { ...r, moved: [end] };
    const ctx: BatchContext = { placed: [end, end] };
    expect(holds(checkBatch(rec, p, ctx), 'placement-bound').subjects).toBe(1);
    p.vertices.x[end] = 2003;
    expect(fails(checkBatch(rec, p, ctx), 'placement-bound').problems).toHaveLength(1);
  });
  it('a finer vertex on a run through a moved vertex is a subject though it did not move itself', () => {
    const { p, r } = base();
    const crossing = v(p, 2000, 2000);
    const end = v(p, 2000, 1000); // the kerb's end, on the way's run (2000, 0)–(2000, 2000)
    const rec: CommitRecord = { ...r, moved: [crossing] };
    const ok = holds(checkBatch(rec, p), 'placement-bound');
    expect(ok.subjects).toBe(1); // the kerb's end: the crossing itself is on no coarser edge
    p.vertices.x[end] = 2003;
    fails(checkBatch(rec, p), 'placement-bound');
  });
  it('a warp\'s moved vertices are subjects without a context', () => {
    const { p } = base();
    const res = commit(p, 2, (o) => warp(o, drag(0, 40), 2, box(-10, 900, 900, 1100)), { rederivesFrom: 0 as StageId });
    const r = res.record as CommitRecord;
    expect(r.moved.length).toBeGreaterThan(0);
    expect(holds(checkBatch(r, p), 'placement-bound').subjects).toBeGreaterThan(0);
  });
});

describe('level-consistency', () => {
  it('holds on a committed batch; an edge whose birth level is not its rows\' lowest fails', () => {
    const { p, r } = base();
    expect(holds(checkBatch(r, p), 'level-consistency').subjects).toBeGreaterThan(0);
    const h = he(p, v(p, 0, 1000), v(p, 2000, 1000));
    for (const x of rowsOn(p, 'edge', h)) p.roles.level[x] = 3; // its rows now all L3, the edge still L2
    fails(checkBatch(r, p), 'level-consistency');
  });
  it('a finer vertex whose two coarser edges carry different rows lies inside no single run: fails', () => {
    const { p, r } = base();
    const end = v(p, 2000, 1000);
    const up = outgoing(p, end).find((h) => p.vertices.y[p.halfEdges.origin[h ^ 1]] > 1000) as HalfEdgeId;
    addRole(p, up, { role: 'way', entity: 'way:x' }, 1);
    const res = fails(checkBatch(r, p), 'level-consistency');
    expect(res.problems.some((x) => x.includes('no single run'))).toBe(true);
  });
  it('a vertex coarser than everything at it fails', () => {
    const { p, r } = base();
    p.vertices.level[v(p, 2000, 1000)] = 0; // coarser than the L1 way and the L2 kerb at it, and no row
    fails(checkBatch(r, p), 'level-consistency');
  });
});

describe('level-consistency at every level between (N-s6-2, C-0359): a finer vertex inside one run at each level', () => {
  /** An L1 way at x = 2000 and an L3 chain ending on it at (2000, 1000): an L3 Steiner vertex on two L1 sub-edges. */
  function deep(): { p: Plat; r: CommitRecord; w: VertexId; up: HalfEdgeId; down: HalfEdgeId } {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:v' }], 'mandatory'));
    const r = commit(p, 3, (o) => insertChain(o, [pt(1000, 1000), pt(2000, 1000)], [{ role: 'kerb', entity: 'kerb:3' }], 'mandatory')).record as CommitRecord;
    const w = v(p, 2000, 1000);
    return { p, r, w, up: he(p, w, v(p, 2000, 4000)), down: he(p, w, v(p, 2000, 0)) };
  }
  it('the row\'s clause reads the run at every level between', () => {
    expect(KERNEL_ROWS.find((x) => x.name === 'level-consistency')?.clause).toBe('an edge\'s birth level is the lowest among its rows; no vertex coarser than everything at it; a finer vertex inside one run at every level between: its coarser edges exactly two, of one level, with identical rows of each level r from theirs to its own − 1 (of level ≤ 1 at r = 1)');
  });
  it('an L3 vertex on L1 edges whose L2 rows differ fails, naming the vertex, the level and the two rows', () => {
    const { p, r, w, up, down } = deep();
    expect(p.vertices.level[w]).toBe(3);
    expect([p.halfEdges.level[up >> 1], p.halfEdges.level[down >> 1]]).toEqual([1, 1]);
    expect(holds(checkBatch(r, p), 'level-consistency').subjects).toBeGreaterThan(0);
    addRole(p, up, { role: 'kerb', entity: 'kerb:x' }, 2); // an L2 row on one side of the L3 vertex only
    expect(fails(checkBatch(r, p), 'level-consistency').problems).toEqual([
      'level-consistency: the vertex (2000, 1000) (L3), finer than its L1 edges, lies inside no single L2 run: their rows of level 2 differ ([1/3/0] and [])',
    ]);
  });
  it('the same L2 row on both sides holds: the in-between rows agree', () => {
    const { p, r, up, down } = deep();
    addRole(p, up, { role: 'kerb', entity: 'kerb:x' }, 2);
    addRole(p, down, { role: 'kerb', entity: 'kerb:x' }, 2);
    holds(checkBatch(r, p), 'level-consistency');
  });
  it('one problem per vertex, at the first level that differs: the edges\' own level keeps its text', () => {
    const { p, r, up } = deep();
    addRole(p, up, { role: 'kerb', entity: 'kerb:x' }, 2);
    addRole(p, up, { role: 'way', entity: 'way:x' }, 1); // the L1 rows differ too: the run is broken at L1 already
    expect(fails(checkBatch(r, p), 'level-consistency').problems).toEqual([
      'level-consistency: the vertex (2000, 1000) (L3), finer than its edges, lies inside no single run',
    ]);
  });
  it('coarser edges of two levels at a finer vertex: no single run', () => {
    const { p, r, up } = deep();
    p.halfEdges.level[up >> 1] = 2; // its rows L1: the edge clause fails as well, on the record's edges
    expect(fails(checkBatch(r, p), 'level-consistency').problems).toContain('level-consistency: the vertex (2000, 1000) (L3), finer than its edges, lies inside no single run');
  });
  it('an L2 vertex on L0 edges reads level ≤ 1 at r = 1: an L1 row on one side fails', () => {
    const p = framed();
    const r = commit(p, 2, (o) => insertChain(o, [pt(1000, 1000), pt(1000, 0)], [{ role: 'kerb', entity: 'kerb:2' }], 'mandatory')).record as CommitRecord;
    const w = v(p, 1000, 0);
    expect(p.vertices.level[w]).toBe(2);
    const east = he(p, w, v(p, 4000, 0));
    expect(p.halfEdges.level[east >> 1]).toBe(0);
    holds(checkBatch(r, p), 'level-consistency');
    addRole(p, east, { role: 'way', entity: 'way:e' }, 1);
    expect(fails(checkBatch(r, p), 'level-consistency').problems).toEqual([
      'level-consistency: the vertex (1000, 0) (L2), finer than its L0 edges, lies inside no single L1 run: their rows of level ≤ 1 differ ([0/2/0;9/0/0] and [9/0/0])',
    ]);
  });
  // Round S4 (checks/M0-a-14-s3.md line 3, mutant B11-upto-e+1): the loop reads every r up to lv − 1, not the first
  // level or two above e. Vertices three levels finer than their coarser edges (lv − e = 3), whose rows agree at r = e
  // and r = e + 1 and differ at r = e + 2 only.
  /** An L3 kerb ending on the L0 frame at (1000, 0): an L3 Steiner vertex on two L0 frame sub-edges. */
  function onFrame(): { p: Plat; r: CommitRecord; w: VertexId; east: HalfEdgeId; west: HalfEdgeId } {
    const p = framed();
    const r = commit(p, 3, (o) => insertChain(o, [pt(1000, 1000), pt(1000, 0)], [{ role: 'kerb', entity: 'kerb:3' }], 'mandatory')).record as CommitRecord;
    const w = v(p, 1000, 0);
    return { p, r, w, east: he(p, w, v(p, 4000, 0)), west: he(p, w, v(p, 0, 0)) };
  }
  it('an L3 vertex on L0 edges whose rows agree at L0 and L1 and differ at L2 fails at r = 2 (lv − e = 3)', () => {
    const { p, r, w, east, west } = onFrame();
    expect(p.vertices.level[w]).toBe(3);
    expect([p.halfEdges.level[east >> 1], p.halfEdges.level[west >> 1]]).toEqual([0, 0]);
    holds(checkBatch(r, p), 'level-consistency');
    addRole(p, east, { role: 'kerb', entity: 'kerb:x' }, 2); // an L2 row on one side only: L0 and ≤ 1 rows still agree
    expect(fails(checkBatch(r, p), 'level-consistency').problems).toEqual([
      'level-consistency: the vertex (1000, 0) (L3), finer than its L0 edges, lies inside no single L2 run: their rows of level 2 differ ([1/2/0] and [])',
    ]);
  });
  it('the same L2 row on both sides of the L3 vertex on L0 edges holds', () => {
    const { p, r, east, west } = onFrame();
    addRole(p, east, { role: 'kerb', entity: 'kerb:x' }, 2);
    addRole(p, west, { role: 'kerb', entity: 'kerb:x' }, 2);
    holds(checkBatch(r, p), 'level-consistency');
  });
  /** An L1 way at x = 2000 and an L4 chain ending on it at (2000, 1000): an L4 Steiner vertex on two L1 sub-edges. */
  function deeper(): { p: Plat; r: CommitRecord; w: VertexId; up: HalfEdgeId; down: HalfEdgeId } {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:v' }], 'mandatory'));
    const r = commit(p, 4, (o) => insertChain(o, [pt(1000, 1000), pt(2000, 1000)], [{ role: 'kerb', entity: 'kerb:4' }], 'mandatory')).record as CommitRecord;
    const w = v(p, 2000, 1000);
    return { p, r, w, up: he(p, w, v(p, 2000, 4000)), down: he(p, w, v(p, 2000, 0)) };
  }
  it('an L4 vertex on L1 edges whose rows agree at L1 and L2 and differ at L3 fails at r = 3 (lv − e = 3)', () => {
    const { p, r, w, up, down } = deeper();
    expect(p.vertices.level[w]).toBe(4);
    expect([p.halfEdges.level[up >> 1], p.halfEdges.level[down >> 1]]).toEqual([1, 1]);
    holds(checkBatch(r, p), 'level-consistency');
    addRole(p, up, { role: 'kerb', entity: 'kerb:x' }, 2); // the same L2 row on both sides: the L2 run holds
    addRole(p, down, { role: 'kerb', entity: 'kerb:x' }, 2);
    addRole(p, up, { role: 'kerb', entity: 'kerb:y' }, 3); // an L3 row on one side only
    expect(fails(checkBatch(r, p), 'level-consistency').problems).toEqual([
      'level-consistency: the vertex (2000, 1000) (L4), finer than its L1 edges, lies inside no single L3 run: their rows of level 3 differ ([1/4/0] and [])',
    ]);
  });
  it('the same L2 and L3 rows on both sides of the L4 vertex on L1 edges hold', () => {
    const { p, r, up, down } = deeper();
    for (const h of [up, down]) {
      addRole(p, h, { role: 'kerb', entity: 'kerb:x' }, 2);
      addRole(p, h, { role: 'kerb', entity: 'kerb:y' }, 3);
    }
    holds(checkBatch(r, p), 'level-consistency');
  });
  /** An L4 kerb ending on the L0 frame at (1000, 0): an L4 Steiner vertex on two L0 frame sub-edges (lv − e = 4). */
  function deepest(): { p: Plat; r: CommitRecord; w: VertexId; east: HalfEdgeId; west: HalfEdgeId } {
    const p = framed();
    const r = commit(p, 4, (o) => insertChain(o, [pt(1000, 1000), pt(1000, 0)], [{ role: 'kerb', entity: 'kerb:4' }], 'mandatory')).record as CommitRecord;
    const w = v(p, 1000, 0);
    return { p, r, w, east: he(p, w, v(p, 4000, 0)), west: he(p, w, v(p, 0, 0)) };
  }
  it('an L4 vertex on L0 edges whose rows agree at L0, L1 and L2 and differ at L3 fails at r = 3 (lv − e = 4, the deepest)', () => {
    const { p, r, w, east, west } = deepest();
    expect(p.vertices.level[w]).toBe(4);
    expect([p.halfEdges.level[east >> 1], p.halfEdges.level[west >> 1]]).toEqual([0, 0]);
    holds(checkBatch(r, p), 'level-consistency');
    addRole(p, east, { role: 'kerb', entity: 'kerb:x' }, 2); // the same L2 row on both sides
    addRole(p, west, { role: 'kerb', entity: 'kerb:x' }, 2);
    addRole(p, east, { role: 'kerb', entity: 'kerb:y' }, 3); // an L3 row on one side only
    expect(fails(checkBatch(r, p), 'level-consistency').problems).toEqual([
      'level-consistency: the vertex (1000, 0) (L4), finer than its L0 edges, lies inside no single L3 run: their rows of level 3 differ ([1/3/0] and [])',
    ]);
    addRole(p, west, { role: 'kerb', entity: 'kerb:y' }, 3); // and on both: the run holds again
    holds(checkBatch(r, p), 'level-consistency');
  });
});

/** HEAVY: fuzz.test.ts's regressions' mix (× 15 485 863), as `test/tx/readable.test.ts` reads it. */
const HEAVY: Mix = { way: 0.2, lane: 0.3, along: 0.25 };

describe('level-consistency on Q54\'s fourteen arenas (N-s6-2; checks/M0-a-06-s6.md): the in-between rows read', () => {
  // Each sequence of `test/tx/readable.test.ts` replayed to the batch that broke it before M0-a-06's round S6, and the
  // one vertex that round moved (C-0356: L3 → L2 at these coordinates) put back at L3 — the arena the encoder refused,
  // an L3 vertex inside an L2 run whose L2 rows change at it — read by the row over the whole arena.
  const Q54: readonly { seed: number; mult: number; mix: Mix; batch: number; x: number; y: number; rows: string }[] = [
    { seed: 91, mult: 104_729, mix: ALONG_MIX, batch: 10, x: 1110, y: 791, rows: '[] and [1/5/0;1/6/0]' },
    { seed: 235, mult: 104_729, mix: ALONG_MIX, batch: 14, x: 3002, y: 1064, rows: '[] and [1/6/0]' },
    { seed: 307, mult: 104_729, mix: ALONG_MIX, batch: 7, x: 1555, y: 2313, rows: '[1/5/0] and []' },
    { seed: 719, mult: 104_729, mix: ALONG_MIX, batch: 10, x: 1603, y: 2179, rows: '[] and [1/5/0;1/7/0]' },
    { seed: 980, mult: 104_729, mix: ALONG_MIX, batch: 7, x: 2856, y: 2732, rows: '[] and [1/4/0]' },
    { seed: 106, mult: 15_485_863, mix: HEAVY, batch: 18, x: 2398, y: 2399, rows: '[] and [1/10/0]' },
    { seed: 210, mult: 15_485_863, mix: HEAVY, batch: 12, x: 3300, y: 3035, rows: '[] and [1/9/0]' },
    { seed: 213, mult: 15_485_863, mix: HEAVY, batch: 11, x: 1480, y: 1041, rows: '[] and [1/4/0]' },
    { seed: 333, mult: 15_485_863, mix: HEAVY, batch: 10, x: 2726, y: 1325, rows: '[1/9/0] and []' },
    { seed: 361, mult: 15_485_863, mix: HEAVY, batch: 19, x: 2783, y: 2771, rows: '[1/10/0;1/13/0;1/9/0] and []' },
    { seed: 395, mult: 15_485_863, mix: HEAVY, batch: 10, x: 3426, y: 3439, rows: '[1/6/0] and []' },
    { seed: 402, mult: 15_485_863, mix: HEAVY, batch: 9, x: 969, y: 2146, rows: '[1/8/0] and []' },
    { seed: 443, mult: 15_485_863, mix: HEAVY, batch: 13, x: 726, y: 719, rows: '[] and [1/6/0]' },
    { seed: 739, mult: 15_485_863, mix: HEAVY, batch: 19, x: 2536, y: 3540, rows: '[] and [1/12/0]' },
  ];
  for (const s of Q54) {
    it(`seed ${s.seed} × ${s.mult}, batch ${s.batch}: the vertex (${s.x}, ${s.y}) back at L3 fails the row`, () => {
      const r = rng(s.seed * s.mult);
      const p = framed();
      const live: Live = { ways: [], kerbs: [], next: 0 };
      for (let step = 0; step <= s.batch; step++) {
        const snapshot: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
        const b = randomBatch(p, live, r, s.mix);
        const res = tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn);
        if (!res.ok) {
          live.ways = snapshot.ways;
          live.kerbs = snapshot.kerbs;
        }
        if (step === s.batch) expect(res.ok).toBe(true);
      }
      const w = v(p, s.x, s.y);
      expect(p.vertices.level[w]).toBe(2);
      const whole = wholeRecord(p);
      holds(checkBatch(whole, p), 'level-consistency');
      p.vertices.level[w] = 3;
      const res = fails(checkBatch(whole, p), 'level-consistency');
      expect(res.problems).toEqual([`level-consistency: the vertex (${s.x}, ${s.y}) (L3), finer than its L1 edges, lies inside no single L2 run: their rows of level 2 differ (${s.rows})`]);
    }, 120_000);
  }
});

describe('held-vertices', () => {
  it('a warp step holds against its held set; a moved vertex in the held set fails; no move: vacuous', () => {
    const { p, r: kerb } = base();
    const quiet = rowOf(checkBatch(kerb, p), 'held-vertices');
    expect(quiet.subjects).toBe(0);
    expect(quiet.holds).toBe(true);
    const res = commit(p, 2, (o) => warp(o, drag(0, 40), 2, box(-10, 900, 900, 1100)), { rederivesFrom: 0 as StageId });
    const r = res.record as CommitRecord;
    const moved = r.moved[0];
    const other = v(p, 2000, 1000);
    expect(holds(checkBatch(r, p, { held: [other] }), 'held-vertices').subjects).toBe(r.moved.length);
    fails(checkBatch(r, p, { held: [other, moved] }), 'held-vertices');
  });
});

describe('prepared-contacts (subject M3a: a clear-region batch)', () => {
  it('vacuous without a clear-region batch; with one, a promotion outside the prepared set fails, inside holds', () => {
    const { p, r } = base();
    const res = rowOf(checkBatch(r, p), 'prepared-contacts');
    expect([res.holds, res.subjects]).toEqual([true, 0]);
    expect(res.note).toContain('M3a');
    const end = v(p, 2000, 1000);
    const promoted: CommitRecord = { ...r, promoted: [end] };
    expect(holds(checkBatch(promoted, p, { prepared: [end] }), 'prepared-contacts').subjects).toBeGreaterThan(0);
    fails(checkBatch(promoted, p, { prepared: [] }), 'prepared-contacts');
  });
  it('a promoted prepared vertex still carrying an anchor name fails', () => {
    const { p, r } = base();
    const end = v(p, 2000, 1000);
    addRole(p, end, { role: 'anchor', entity: 'enceinte:1', ordinal: 2 }, 2);
    fails(checkBatch({ ...r, promoted: [end] }, p, { prepared: [end] }), 'prepared-contacts');
  });
  it('an edge of the batch\'s level that shares a finer edge (carries a finer row) fails; without the finer row holds', () => {
    const p = blocks();
    const r = commit(p, 1, (o) => insertChain(o, [pt(0, 3000), pt(2000, 3000)], [{ role: 'way', entity: 'way:3' }], 'mandatory')).record as CommitRecord;
    expect(holds(checkBatch(r, p, { prepared: [] }), 'prepared-contacts').subjects).toBeGreaterThan(0);
    addRole(p, he(p, v(p, 0, 3000), v(p, 2000, 3000)), { role: 'kerb', entity: 'kerb:9' }, 2);
    const res = fails(checkBatch(r, p, { prepared: [] }), 'prepared-contacts');
    expect(res.problems.some((x) => x.includes('shares a finer edge'))).toBe(true);
  });
});

/** The before-image kept content reads: every face of the levels finer than `level`. */
function beforeImage(p: Plat, level: Level): (l: Level, f: FaceId) => FaceBefore | null {
  const m = new Map<string, FaceBefore>();
  for (let l = level + 1; l <= 4; l++) {
    const lv = l as Level;
    for (let f = 0; f < p.slots.face[lv].top; f++) {
      if (isFaceLive(p, lv, f)) m.set(`${lv}:${f}`, { stage: p.faces[lv].stage[f], owner: p.faces[lv].owner[f], area2: faceArea2(p, lv, f) });
    }
  }
  return (l, f) => m.get(`${l}:${f}`) ?? null;
}

describe('kept-content', () => {
  it('an L2 batch clearing L3 faces of an earlier stage: holds when nothing is kept, fails when they are; no image: vacuous', () => {
    const { p } = base();
    const l2: FaceId[] = [];
    for (let f = 0; f < p.slots.face[2].top; f++) if (isFaceLive(p, 2, f)) l2.push(f);
    commit(p, 2, (o: Overlay) => setOwner(o, l2, 'block:1'));
    // L3 content (stage rank 8) inside the lower-left block's lower L2 face [0, 2000] × [0, 1000].
    commit(p, 3, (o) => insertChain(o, [pt(0, 500), pt(2000, 500)], [{ role: 'plot_line', entity: 'plots:1' }], 'mandatory'));
    const before = beforeImage(p, 2);
    // An L2 re-derivation from rank 0 (nothing kept, so the writer clears it) of the block's finer content.
    const r = commit(p, 2, (o: Overlay) => clearFiner(o, { owner: 'block:1', level: 2 }, 2), { rederivesFrom: 0 as StageId }).record as CommitRecord;
    const finer = r.faces.filter((d) => d.level > 2).reduce((s0, d) => s0 + d.changed.length + d.removed.length, 0);
    expect(finer).toBeGreaterThan(0);
    expect(holds(checkBatch(r, p, { kept: { keptBelow: 0, before } }), 'kept-content').subjects).toBe(finer);
    expect(holds(checkBatch(r, p, { kept: { keptBelow: 8, before } }), 'kept-content').subjects).toBe(finer);
    const res = fails(checkBatch(r, p, { kept: { keptBelow: 9, before } }), 'kept-content');
    expect(res.problems.some((x) => x.includes('cleared'))).toBe(true);
    const none = rowOf(checkBatch(r, p), 'kept-content');
    expect([none.holds, none.subjects]).toEqual([true, 0]);
    expect(none.note).toContain('before-image');
  });
  it('a kept face re-owned fails', () => {
    const { p } = base();
    commit(p, 3, (o) => insertChain(o, [pt(0, 500), pt(2000, 500)], [{ role: 'plot_line', entity: 'plots:1' }], 'mandatory'));
    const before = beforeImage(p, 2);
    const l3: FaceId[] = [];
    for (let f = 0; f < p.slots.face[3].top; f++) if (isFaceLive(p, 3, f)) l3.push(f);
    const r = commit(p, 3, (o: Overlay) => setOwner(o, l3, 'district:9'), { rederivesFrom: 0 as StageId }).record as CommitRecord;
    // Read as a coarser batch's record (its L3 faces finer than the batch): the re-own of kept content.
    const coarser: CommitRecord = { ...r, level: 2 };
    holds(checkBatch(coarser, p, { kept: { keptBelow: 0, before } }), 'kept-content');
    const res = fails(checkBatch(coarser, p, { kept: { keptBelow: 200, before } }), 'kept-content');
    expect(res.problems.some((x) => x.includes('re-owned'))).toBe(true);
  });
});

describe('kept-content: a split', () => {
  it('a kept face split (its area changed) fails', () => {
    const { p } = base();
    commit(p, 3, (o) => insertChain(o, [pt(0, 500), pt(2000, 500)], [{ role: 'plot_line', entity: 'plots:1' }], 'mandatory'));
    const before = beforeImage(p, 2);
    const r = commit(p, 3, (o) => insertChain(o, [pt(1000, 0), pt(1000, 500)], [{ role: 'plot_line', entity: 'plots:2' }], 'mandatory'), { rederivesFrom: 0 as StageId }).record as CommitRecord;
    const coarser: CommitRecord = { ...r, level: 2 };
    holds(checkBatch(coarser, p, { kept: { keptBelow: 0, before } }), 'kept-content');
    const res = fails(checkBatch(coarser, p, { kept: { keptBelow: 200, before } }), 'kept-content');
    expect(res.problems.some((x) => x.includes('split'))).toBe(true);
  });
  it('the measure is index/items.ts\'s faceArea2 under the suite\'s name (C-0345): one body, twice the area of the own-level route rings', () => {
    expect(faceArea2).toBe(itemsFaceArea2);
    const { p } = base();
    commit(p, 3, (o) => insertChain(o, [pt(0, 500), pt(2000, 500)], [{ role: 'plot_line', entity: 'plots:1' }], 'mandatory'));
    const areas = facesAt(p, 3).map((f) => faceArea2(p, 3, f)).sort((x, y) => x - y);
    expect(areas).toContain(2 * 2000 * 500);
  });
});

describe('role-consistency', () => {
  it('holds on a committed batch; a way row on a second, disconnected edge (two parts) fails', () => {
    const p = blocks();
    const r = commit(p, 1, (o) => insertChain(o, [pt(0, 3000), pt(2000, 3000)], [{ role: 'way', entity: 'way:3' }], 'mandatory')).record as CommitRecord;
    expect(holds(checkBatch(r, p), 'role-consistency').subjects).toBeGreaterThan(0);
    const far = he(p, v(p, 2000, 0), v(p, 2000, 2000));
    addRole(p, far, { role: 'way', entity: 'way:3' }, 1);
    fails(checkBatch(r, p), 'role-consistency');
  });
  it('a branching linear role fails', () => {
    const p = blocks();
    const r = commit(p, 1, (o) => insertChain(o, [pt(0, 3000), pt(2000, 3000)], [{ role: 'way', entity: 'way:3' }], 'mandatory')).record as CommitRecord;
    addRole(p, he(p, v(p, 2000, 3000), v(p, 2000, 4000)), { role: 'way', entity: 'way:3' }, 1);
    addRole(p, he(p, v(p, 2000, 2000), v(p, 2000, 3000)), { role: 'way', entity: 'way:3' }, 1);
    fails(checkBatch(r, p), 'role-consistency');
  });
  it('a structural role left without an edge by a merge fails; the same record without a merge holds', () => {
    const { p, r } = base();
    const lost: CommitRecord = { ...r, roles: [...r.roles, { role: 'wall', entity: 'enceinte:7', ordinal: 0 }] };
    holds(checkBatch(lost, p), 'role-consistency');
    fails(checkBatch(lost, p, { opKinds: ['mergeFaces'] }), 'role-consistency');
  });
});

describe('references-resolve (stage end, save)', () => {
  it('holds on the arena with its stored references; a reference to a missing entity fails', () => {
    const { p } = base();
    const refs = [{ role: 'way', entity: 'way:v' }, { role: 'kerb', entity: 'kerb:1' }];
    expect(holds(checkStageEnd(p, { refs }), 'references-resolve').subjects).toBeGreaterThan(0);
    holds(checkSave(p, { refs }), 'references-resolve');
    fails(checkStageEnd(p, { refs: [...refs, { role: 'way', entity: 'way:gone' }] }), 'references-resolve');
    fails(checkSave(p, { refs: [{ owner: 'district:none', level: 2 }] }), 'references-resolve');
  });
  it('geometry carrying a dead entity fails', () => {
    const { p } = base();
    holds(checkStageEnd(p, { isLive: () => true }), 'references-resolve');
    fails(checkStageEnd(p, { isLive: (id) => id !== 'kerb:1' }), 'references-resolve');
  });
  it('an indexed vertex role finding two vertices for one ordinal fails', () => {
    const { p } = base();
    addRole(p, v(p, 2000, 1000), { role: 'deck_end', entity: 'bridge:1', ordinal: 0 }, 2);
    holds(checkStageEnd(p), 'references-resolve');
    addRole(p, v(p, 0, 1000), { role: 'deck_end', entity: 'bridge:1', ordinal: 0 }, 2);
    fails(checkStageEnd(p), 'references-resolve');
  });
  it('an indexed vertex role on a dead vertex slot finds no live geometry: fails', () => {
    const { p } = base();
    const w = v(p, 2000, 2000);
    addRole(p, w, { role: 'deck_end', entity: 'bridge:1', ordinal: 0 }, 2);
    holds(checkStageEnd(p), 'references-resolve');
    p.vertices.flags[w] |= VERTEX_FREE; // the row's vertex freed under it
    const res = fails(checkStageEnd(p), 'references-resolve');
    expect(res.problems.some((x) => x.includes('deck_end row names a dead vertex slot'))).toBe(true);
  });
  it('a face owned by a dead entity fails (the owner clause, not only a role row\'s entity)', () => {
    const { p } = base();
    let f1 = -1;
    for (let f = 0; f < p.slots.face[1].top; f++) if (isFaceLive(p, 1, f)) f1 = f;
    commit(p, 1, (o: Overlay) => setOwner(o, [f1], 'block:dead'));
    holds(checkStageEnd(p, { isLive: () => true }), 'references-resolve');
    const res = fails(checkStageEnd(p, { isLive: (id) => id !== 'block:dead' }), 'references-resolve');
    expect(res.problems).toEqual(['references-resolve: geometry carries the dead entity block:dead']);
  });
});

describe('references-resolve: stored profiles\' knots', () => {
  /** A way along y = 3000 with width knots at three of its points, ordinals in the order given. */
  function profiled(ordinals: readonly number[]): Plat {
    const p = blocks();
    const xs = [200, 1000, 1800];
    commit(p, 1, (o) => insertChain(o, xs.map((x) => pt(x, 3000)), [{ role: 'way', entity: 'way:k' }], 'mandatory', {
      knots: xs.map((_, i) => ({ index: i, role: 'width_knot', entity: 'way:k', ordinal: ordinals[i] })),
    }));
    return p;
  }
  const profile = (n: number) => ({ chain: { role: 'way', entity: 'way:k' }, knotRole: 'width_knot', profile: { knotRole: 'width_knot', values: Array.from({ length: n }, (_, i) => 500 + i), interp: 'linear' as const } });
  it('knots on the chain in ordinal order (either way along it) hold; out of order, missing or off the chain fail', () => {
    holds(checkStageEnd(profiled([0, 1, 2]), { profiles: [profile(3)] }), 'references-resolve');
    holds(checkStageEnd(profiled([2, 1, 0]), { profiles: [profile(3)] }), 'references-resolve');
    const order = fails(checkStageEnd(profiled([0, 2, 1]), { profiles: [profile(3)] }), 'references-resolve');
    expect(order.problems.some((x) => x.includes('not in ordinal order'))).toBe(true);
    const missing = fails(checkStageEnd(profiled([0, 1, 2]), { profiles: [profile(4)] }), 'references-resolve');
    expect(missing.problems.some((x) => x.includes('knot 3') && x.includes('finds 0 vertices'))).toBe(true);
    const p = profiled([0, 1, 2]);
    addRole(p, v(p, 2000, 1000 + 1000), { role: 'width_knot', entity: 'way:k', ordinal: 3 }, 1);
    const off = fails(checkStageEnd(p, { profiles: [profile(4)] }), 'references-resolve');
    expect(off.problems.some((x) => x.includes('lies off its chain'))).toBe(true);
  });
  it('a ring carries at least one knot: a closed kerb ring with one knot holds, with a profile of no knot fails', () => {
    const p = blocks();
    const ring = [pt(500, 500), pt(1500, 500), pt(1500, 1500), pt(500, 1500)];
    commit(p, 2, (o) => insertChain(o, ring, [{ role: 'kerb', entity: 'ring:k' }], 'mandatory', {
      closed: true,
      knots: [{ index: 0, role: 'width_knot', entity: 'ring:k', ordinal: 0 }],
    }));
    const ringProfile = (n: number) => ({ chain: { role: 'kerb', entity: 'ring:k' }, knotRole: 'width_knot', profile: { knotRole: 'width_knot', values: Array.from({ length: n }, (_, i) => 300 + i), interp: 'linear' as const } });
    holds(checkStageEnd(p, { profiles: [ringProfile(1)] }), 'references-resolve');
    const res = fails(checkStageEnd(p, { profiles: [ringProfile(0)] }), 'references-resolve');
    expect(res.problems.some((x) => x.includes('carries no knot'))).toBe(true);
  });
});

describe('frozen-base (subject M1: the pool freeze)', () => {
  it('vacuous at stage end; its predicate holds after the freeze\'s rebuild and fails with a grid item left', () => {
    const { p } = base();
    const r = rowOf(checkStageEnd(p), 'frozen-base');
    expect([r.holds, r.subjects]).toEqual([true, 0]);
    fails(checkFreeze(p), 'frozen-base');
    rebuildForFreeze(p);
    holds(checkFreeze(p), 'frozen-base');
  });
});

describe('index-freshness', () => {
  it('holds inside and right after the batch; a created face missing from its grid fails', () => {
    const { p, r } = base();
    expect(holds(checkBatch(r, p), 'index-freshness').subjects).toBeGreaterThan(0);
    const f = r.faces.find((d) => d.level === 2)?.created[0] as FaceId;
    indexOf(p).levels[2].dynamic.entries.delete(itemKey(ITEM_FACE, f));
    fails(checkBatch(r, p), 'index-freshness');
  });
  it('an L2 batch writing the L1 index (no promotion or demotion) fails inside the batch', () => {
    const p = blocks();
    let l1 = -1;
    for (let f = 0; f < p.slots.face[1].top; f++) if (isFaceLive(p, 1, f)) l1 = f;
    const { res, report } = suiteTx(p, 2, (o: Overlay) => {
      const x = insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory');
      indexChange(o.plat, { kind: ITEM_FACE, level: 1, slot: l1 });
      return x;
    });
    expect(res.ok).toBe(false);
    const line = report.batches[0].results;
    const r = fails(line, 'index-freshness');
    expect(r.problems.some((x) => x.includes('wrote the L1 index'))).toBe(true);
  });
  it('an L3 batch in a block with no L2 record (the re-walk materialises its own child) holds', () => {
    const p = blocks();
    const { res, report } = suiteTx(p, 3, (o: Overlay) => insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'plot_line', entity: 'plots:1' }], 'mandatory'));
    expect(res.ok).toBe(true);
    holds(report.batches[0].results, 'index-freshness');
  });
  it('the CI sweep folds in the index state: a stale grid entry fails there', () => {
    const { p } = base();
    holds(checkCI(p), 'index-freshness');
    const f = (() => {
      for (let g = 0; g < p.slots.face[2].top; g++) if (isFaceLive(p, 2, g)) return g;
      return -1;
    })();
    indexOf(p).levels[2].dynamic.entries.delete(itemKey(ITEM_FACE, f));
    fails(checkCI(p), 'index-freshness');
  });
});

describe('index-freshness: a removal that frees coarser own children (N-49, C-0219 (2))', () => {
  // N-13's example (checks/M0-a-05-notes.md): a framed square, an L0 way, a finer chain inside — its insertion
  // materialises own children at the levels between (§2.2 rule 2), and its removal in a later batch frees them, their
  // ITEM_FACE items tombstoned and deleted in the coarser grids (N-47). The suite admits those writes as tx.ts does: a
  // coarser face write whose op is a tombstone or delete and whose slot is no longer live is a record the batch freed.
  const way = (): Plat => {
    const p = framed(4000);
    commit(p, 0, (o) => insertChain(o, [pt(1553, 1708), pt(2317, 1842)], [{ role: 'way', entity: 'way:b0' }], 'mandatory'));
    return p;
  };
  const chain = [pt(285, 882), pt(1317, 314), pt(2233, 691)];
  const roleAt = (l: Level): string => (l === 2 ? 'kerb' : 'plot_line');
  type Write = { op: string; kind: number; level: Level; slot: number };
  /** The index log's writes as the batch's `invariants` hook sees them (the log still open). */
  const logged = (into: Write[]) => ({ invariants: (q: Plat): string[] => {
    into.push(...(indexOf(q).log?.writes ?? []).map((w) => ({ op: w.op, kind: w.kind, level: w.level, slot: w.slot })));
    return [];
  } });

  for (const level of [3, 2] as const) {
    it(`the L${level} chain inserted and removed through tx with the suite: both commit, the arena valid and its print restored`, () => {
      const p = way();
      const before = contentPrint(p);
      const role = roleAt(level);
      const a = suiteTx(p, level, (o: Overlay) => insertChain(o, chain, [{ role, entity: 'x:1' }], 'mandatory'));
      expect(a.res.ok, a.res.ok ? '' : `${a.res.code} ${a.res.detail}`).toBe(true);
      expect(allProblems(p)).toEqual([]);
      const own = [1, 2].filter((l) => l < level).map((l) => [...Array(p.slots.face[l].top).keys()].filter((f) => isFaceLive(p, l as Level, f)).length);
      expect(own).toEqual(level === 3 ? [1, 1] : [1]); // the insertion made one own child at each level between
      const writes: Write[] = [];
      const b = suiteTx(p, level, (o: Overlay) => removeEdges(o, { role, entity: 'x:1' }), { rederivesFrom: 0 as never }, {}, logged(writes));
      expect(b.res.ok, b.res.ok ? '' : `${b.res.code} ${b.res.detail}`).toBe(true);
      expect(allProblems(p)).toEqual([]);
      expect(contentPrint(p)).toBe(before);
      const row = holds(b.report.batches[0].results, 'index-freshness');
      expect(row.subjects).toBeGreaterThan(0);
      // Not vacuous: the batch did write the coarser index — the freed own children's tombstones / deletes, every one at
      // a level coarser than the batch's, and of a slot now free.
      const coarser = writes.filter((w) => w.kind === ITEM_FACE && w.level < level);
      expect(coarser.length).toBeGreaterThan(0);
      expect(new Set(coarser.map((w) => w.level))).toEqual(new Set(level === 3 ? [1, 2] : [1]));
      for (const w of coarser) {
        expect(['tombstone', 'delete']).toContain(w.op);
        expect(isFaceLive(p, w.level, w.slot)).toBe(false);
      }
    });

    it(`the L${level} chain inserted, the partitions rebuilt at the stage end, then removed through tx with the suite: the freed own children are tombstoned and admitted`, () => {
      // The regeneration path (N-49's own evidence, B-1 of checks/M0-a-14-s1.md): after rebuildAtStageEnd the own
      // children sit in a static partition, so the removal writes a coarser 'tombstone' (not only a grid 'delete').
      const p = way();
      const before = contentPrint(p);
      const role = roleAt(level);
      const a = suiteTx(p, level, (o: Overlay) => insertChain(o, chain, [{ role, entity: 'x:1' }], 'mandatory'));
      expect(a.res.ok, a.res.ok ? '' : `${a.res.code} ${a.res.detail}`).toBe(true);
      expect(rebuildAtStageEnd(p)).toBeGreaterThan(0);
      expect(allProblems(p)).toEqual([]);
      const writes: Write[] = [];
      const b = suiteTx(p, level, (o: Overlay) => removeEdges(o, { role, entity: 'x:1' }), { rederivesFrom: 0 as never }, {}, logged(writes));
      expect(b.res.ok, b.res.ok ? '' : `${b.res.code} ${b.res.detail}`).toBe(true);
      expect(allProblems(p)).toEqual([]);
      expect(contentPrint(p)).toBe(before);
      const row = holds(b.report.batches[0].results, 'index-freshness');
      expect(row.subjects).toBeGreaterThan(0);
      const coarser = writes.filter((w) => w.kind === ITEM_FACE && w.level < level);
      expect(coarser.some((w) => w.op === 'tombstone'), JSON.stringify(coarser)).toBe(true);
      for (const w of coarser) {
        expect(['tombstone', 'delete']).toContain(w.op);
        expect(isFaceLive(p, w.level, w.slot)).toBe(false);
      }
    });
  }

  it('negative control: the same removal with a hand-logged coarser insert of the freed L1 slot still refuses, naming the row', () => {
    const p = way();
    must(suiteTx(p, 3, (o: Overlay) => insertChain(o, chain, [{ role: 'plot_line', entity: 'x:1' }], 'mandatory')).res);
    const l1 = [...Array(p.slots.face[1].top).keys()].find((f) => isFaceLive(p, 1, f)) as FaceId;
    const committed = contentPrint(p);
    const { res, report } = suiteTx(p, 3, (o: Overlay) => {
      const x = removeEdges(o, { role: 'plot_line', entity: 'x:1' });
      indexOf(o.plat).log?.writes.push({ op: 'insert', kind: ITEM_FACE, level: 1, slot: l1, partition: -1 });
      return x;
    }, { rederivesFrom: 0 as never });
    expect(res.ok).toBe(false);
    expect(contentPrint(p)).toBe(committed);
    const r = fails(report.batches[0].results, 'index-freshness');
    expect(r.problems.some((x) => x.includes('wrote the L1 index (insert of'))).toBe(true);
    expect(r.problems.some((x) => x.includes('(tombstone of') || x.includes('(delete of'))).toBe(false); // the lawful writes stay admitted
  });

  it('negative control: a removal beside live L1 faces with L1 edges — a hand-logged insert or tombstone of one still refuses, naming the row', () => {
    // blocks(): four L1 blocks; an L3 chain in one materialises an L2 own child there; its removal frees it (a lawful
    // coarser write), while a write of a live L1 block — a face with edges of its own level — is refused.
    for (const op of ['insert', 'tombstone'] as const) {
      const p = blocks();
      must(suiteTx(p, 3, (o: Overlay) => insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'plot_line', entity: 'plots:1' }], 'mandatory')).res);
      const l1 = [...Array(p.slots.face[1].top).keys()].find((f) => isFaceLive(p, 1, f)) as FaceId;
      const { res, report } = suiteTx(p, 3, (o: Overlay) => {
        const x = removeEdges(o, { role: 'plot_line', entity: 'plots:1' });
        indexOf(o.plat).log?.writes.push({ op, kind: ITEM_FACE, level: 1, slot: l1, partition: op === 'insert' ? -1 : 0 });
        return x;
      }, { rederivesFrom: 0 as never });
      expect(res.ok, op).toBe(false);
      expect(isFaceLive(p, 1, l1)).toBe(true);
      const r = fails(report.batches[0].results, 'index-freshness');
      expect(r.problems.some((x) => x.includes(`wrote the L1 index (${op} of`)), op).toBe(true);
      expect(r.problems.some((x) => x.includes('wrote the L2 index')), op).toBe(false); // the freed L2 own child is admitted
    }
  });
});

describe('pool-scope (subject M1: the pool merge)', () => {
  it('vacuous at stage end; its predicate: a write outside a scope, a record two overlays copied, a record changed live, fail', () => {
    const { p } = base();
    const r = rowOf(checkStageEnd(p), 'pool-scope');
    expect([r.holds, r.subjects, r.note?.includes('M1')]).toEqual([true, 0, true]);
    expect(poolScopeProblems([{ district: 'a', copied: [1, 2], outOfScope: [] }, { district: 'b', copied: [3], outOfScope: [] }], [4])).toEqual([]);
    expect(poolScopeProblems([{ district: 'a', copied: [1], outOfScope: [9] }], [])).toHaveLength(1);
    expect(poolScopeProblems([{ district: 'a', copied: [1], outOfScope: [] }, { district: 'b', copied: [1], outOfScope: [] }], [])).toHaveLength(1);
    expect(poolScopeProblems([{ district: 'a', copied: [5], outOfScope: [] }], [5])).toHaveLength(1);
  });
});

describe('arena-isolation', () => {
  it('holds on its own arena; a record of another arena, or naming a dead slot, fails', () => {
    const { p, r } = base();
    expect(holds(checkBatch(r, p), 'arena-isolation').subjects).toBeGreaterThan(0);
    fails(checkBatch({ ...r, key: { layer: 'ground', part: 1 } }, p), 'arena-isolation');
    fails(checkBatch({ ...r, unflagged: [p.slots.vertex.top + 5] }, p), 'arena-isolation');
  });
});

describe('seed-tiling (subject M6-P: transient arenas)', () => {
  it('vacuous on a plat\'s batch; its predicate holds on a tiling and fails on a gap or a face outside every seed', () => {
    const { p, r } = base();
    const res = rowOf(checkBatch(r, p), 'seed-tiling');
    expect([res.holds, res.subjects, res.note?.includes('M6-P')]).toEqual([true, 0, true]);
    const sq = (x0: number, y0: number, x1: number, y1: number) => [pt(x0, y0), pt(x1, y0), pt(x1, y1), pt(x0, y1)];
    const seeds = [sq(0, 0, 1000, 1000)];
    expect(seedTilingProblems([sq(0, 0, 500, 1000), sq(500, 0, 1000, 1000)], seeds)).toEqual([]);
    expect(seedTilingProblems([sq(0, 0, 500, 1000)], seeds).length).toBeGreaterThan(0);
    expect(seedTilingProblems([sq(0, 0, 500, 1000), sq(1000, 0, 1500, 1000)], seeds).length).toBeGreaterThan(0);
  });
  it('the containment reading is closed and non-zero (num/exact.ts insideOrOnRing): a seed\'s edges and vertices, a doubly wound seed\'s interior and a two-point seed\'s segment hold their points', () => {
    const outside = (faces: ReturnType<typeof pt>[][], seeds: ReturnType<typeof pt>[][]): boolean => seedTilingProblems(faces, seeds).some((x) => x.includes('inside no seed ring'));
    const sq = [pt(0, 0), pt(4, 0), pt(4, 4), pt(0, 4)];
    expect(outside([[pt(0, 0), pt(2, 0), pt(4, 4)]], [sq])).toBe(false);
    expect(outside([[pt(1, 1), pt(2, 3), pt(3, 1)]], [[...sq, ...sq]])).toBe(false);
    expect(outside([[pt(0, 0), pt(2, 0), pt(4, 0)]], [[pt(0, 0), pt(4, 0)]])).toBe(false);
    expect(outside([[pt(1, 1), pt(2, 3), pt(5, 1)]], [sq])).toBe(true);
    expect(outside([[pt(2, 1)]], [[pt(0, 0), pt(4, 0)]])).toBe(true);
  });
});

describe('face-corners (soft) and face-corners-optional (hard)', () => {
  /** A kerb meeting the way at a 3.6° corner: a mandatory chain commits it with W_ACUTE_CORNER. */
  function acute(): { p: Plat; r: CommitRecord; tip: VertexId } {
    const p = blocks();
    const r = commit(p, 2, (o) => insertChain(o, [pt(1100, 1950), pt(1900, 2000)], [{ role: 'kerb', entity: 'lane:9' }], 'mandatory')).record as CommitRecord;
    return { p, r, tip: v(p, 1900, 2000) };
  }
  it('the soft row reports an acute corner of a mandatory chain (the batch still commits), and holds on right angles', () => {
    const { p, r } = base();
    holds(checkBatch(r, p), 'face-corners');
    const a = acute();
    expect(a.r.warnings.some((w) => w.code === 'W_ACUTE_CORNER')).toBe(true);
    const res = fails(checkBatch(a.r, a.p), 'face-corners');
    expect(res.class).toBe('soft');
    expect(res.problems.some((x) => x.includes('(1900, 2000)'))).toBe(true);
  });
  it('the hard row: the same corner at a vertex an optional chain placed fails; elsewhere holds; without a context vacuous', () => {
    const a = acute();
    expect(rowOf(checkBatch(a.r, a.p), 'face-corners-optional').subjects).toBe(0);
    holds(checkBatch(a.r, a.p, { optional: [v(a.p, 1100, 1950)] }), 'face-corners-optional');
    const res = fails(checkBatch(a.r, a.p, { optional: [a.tip] }), 'face-corners-optional');
    expect(res.class).toBe('hard');
  });
});

describe('euler (CI)', () => {
  it('holds on every level of a real arena; a rotation made non-planar fails', () => {
    const { p } = base();
    const ok = holds(checkCI(p), 'euler');
    expect(ok.subjects).toBeGreaterThanOrEqual(3);
    // The crossing (2000, 2000): four outgoing edges; swap two of them in the rotation (next(twin) order).
    const c = v(p, 2000, 2000);
    const out = outgoing(p, c);
    expect(out).toHaveLength(4);
    const order = [out[0], out[2], out[1], out[3]];
    const H = p.halfEdges;
    for (let i = 0; i < 4; i++) {
      const e = order[i];
      const n = order[(i + 1) % 4];
      H.next[e ^ 1] = n;
      H.prev[n] = e ^ 1;
    }
    fails(checkCI(p), 'euler');
  });
  /**
   * Swaps the successors of two half-edges of the lower-left L1 block's ring — the one entering (0, 0) from the north and
   * the one entering (2000, 2000) from the south — re-linking that ring into two cycles (prev kept consistent).
   */
  function splitRing(p: Plat, northOfOrigin: VertexId, southOfCrossing: VertexId): void {
    const H = p.halfEdges;
    const h1 = he(p, northOfOrigin, v(p, 0, 0));
    const h2 = he(p, southOfCrossing, v(p, 2000, 2000));
    const n1 = H.next[h1];
    const n2 = H.next[h2];
    expect([H.origin[n1 ^ 1], H.origin[n2 ^ 1]]).toEqual([v(p, 2000, 0), v(p, 0, 2000)]);
    H.next[h1] = n2;
    H.prev[n2] = h1;
    H.next[h2] = n1;
    H.prev[n1] = h2;
  }
  const chi = (p: Plat, level: Level): number => {
    const k = eulerCounts(p, level);
    return k.v - k.e + k.f - (1 + k.c);
  };
  it('one face too many fails: the block\'s ring split into two cycles that each enclose area (V − E + F = 2 + C)', () => {
    // With the kerb, the block's L1 ring passes (0, 1000) and (2000, 1000): each of the two cycles keeps three corners.
    const { p } = base();
    holds(checkCI(p), 'euler');
    splitRing(p, v(p, 0, 1000), v(p, 2000, 1000));
    expect(chi(p, 1)).toBe(1);
    const res = fails(checkCI(p), 'euler');
    expect(res.problems.some((x) => x.startsWith('euler: L1: '))).toBe(true);
  });
  it('a deficit of exactly one face fails: the block\'s ring split so one cycle encloses no area (V − E + F = C)', () => {
    // Without the kerb, the block's ring is its four corners: one cycle keeps two vertices (no area), so a bounded face is lost.
    const p = blocks();
    holds(checkCI(p), 'euler');
    splitRing(p, v(p, 0, 2000), v(p, 2000, 0));
    expect(chi(p, 1)).toBe(-1);
    const res = fails(checkCI(p), 'euler');
    expect(res.problems.some((x) => x.startsWith('euler: L1: '))).toBe(true);
  });
});
