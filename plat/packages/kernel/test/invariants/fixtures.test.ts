// M0-a-14's listed test: "each row has a positive fixture (holds) and a negative control (a hand-corrupted arena fails
// naming the row)". Every §3.10 row (KERNEL_ROWS) has a describe here: the positive fixture is a real committed batch
// (or a real arena) on which the row holds with its subjects counted; the negative control corrupts the arena, the
// record or the row's context by hand and the row — named in the problem — fails. Rows whose subjects M0 lacks are
// shown vacuous in the batch (count 0) and their predicates judged directly.
import { describe, expect, it } from 'vitest';
import {
  addRole,
  isFaceLive,
  outgoing,
  rowsOn,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import { indexChange, indexOf, itemKey, ITEM_FACE, rebuildForFreeze } from '../../src/index/index.js';
import {
  checkBatch,
  checkCI,
  checkFreeze,
  checkSave,
  checkStageEnd,
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
import type { KernelResult } from '../../src/num/index.js';
import { clearFiner, setOwner, type CommitRecord, type Overlay } from '../../src/tx/index.js';
import type { Level, StageId } from '../../src/types/index.js';
import { warp } from '../../src/warp/index.js';
import { box, drag } from '../warp/support.js';
import { vertexAtPoint } from '../tx/support.js';
import { commit, framed, must, pt, rowOf, suiteTx } from './support.js';

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
});
