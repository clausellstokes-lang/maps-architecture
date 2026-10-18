// M0-a-05: insertion step 5 — the local re-walk (§3.6 step 5; §2.2 rules 2 and 4; §3.3's re-parenting; §3.10's faces,
// nesting and Euler rows). The item's listed test "§13.1: Euler characteristic after every insertion; output simple;
// nesting by index" is here (its random form runs in bfuzz.test.ts), with the records' life: the first ring makes the
// first L0 face; a split face's parts both inherit its kind, owner and stage rank; a floating ring is a new face and a
// hole; a chain joining a hole to its outer ring removes the hole; an antenna changes a ring; the first edge of a level
// in a parent materialises that level's records, and a coarser own child where the finer record needs a parent; kept
// finer records are re-parented into the part that holds them (C-0177 (9)) and listed in the journal's level-(n + 1)
// `changed` — "the commit record lists them" (§3.6 step 5; fix round 1, the check's F-2); `tx.facesWalked` charged.
import { describe, expect, it } from 'vitest';
import { allocFace, faceHoles, faceWalk, internId, setFaceOwner, type Plat } from '../../../src/arena/index.js';
import { indexAdd, ITEM_EDGE } from '../../../src/index/index.js';
import { linkEdge } from '../../../src/insert/snapRound.js';
import { rewalk, TX_FACES_WALKED } from '../../../src/insert/rewalk.js';
import { chainJournal } from '../../../src/insert/stretch.js';
import type { Level } from '../../../src/types/index.js';
import { allProblems, contentPrint, emptyArena, eulerCounts, eulerProblems, faceProblems, facesAt, framed, indexed, ins, tx, vertexAtPoint } from './support.js';

describe('the records\' life under insertion', () => {
  it('the first ring into an empty arena makes the first L0 face (kind 0, no owner, stage 0, no parent)', () => {
    const p = emptyArena();
    const t = tx(p, 0);
    const r = ins(t, [[0, 0], [4000, 0], [4000, 4000], [0, 4000]], [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true });
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    const fs = facesAt(p, 0);
    expect(fs).toHaveLength(1);
    const F = p.faces[0];
    expect([F.kind[fs[0]], F.owner[fs[0]], F.stage[fs[0]], F.parent[fs[0]]]).toEqual([0, -1, 0, -1]);
    expect(chainJournal(t).faces[0].created).toEqual(fs);
    expect(t.work.counts.get(TX_FACES_WALKED) ?? 0).toBeGreaterThan(0);
  });

  it('a split face\'s two parts both inherit its kind, owner and stage rank (§2.2 rule 4)', () => {
    const p = framed();
    const f0 = facesAt(p, 0)[0];
    const h = internId(p.handles, 'land:1');
    setFaceOwner(p, 0, f0, h);
    p.faces[0].stage[f0] = 7;
    p.faces[0].kind[f0] = 3;
    const t = tx(p, 0);
    const r = ins(t, [[0, 1500], [4000, 2500]], [{ role: 'shore', entity: 'shore:1' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    const fs = facesAt(p, 0);
    expect(fs).toHaveLength(2);
    for (const f of fs) expect([p.faces[0].kind[f], p.faces[0].owner[f], p.faces[0].stage[f]]).toEqual([3, h, 7]);
    expect(chainJournal(t).faces[0].created).toHaveLength(1);
    expect(chainJournal(t).faces[0].changed).toEqual([f0]);
  });

  it('a floating ring is a new face and a hole of the face round it; a chain joining the hole to the outer ring removes the hole', () => {
    const p = framed();
    const r = ins(tx(p, 0), [[1500, 1500], [2500, 1500], [2500, 2500], [1500, 2500]], [{ role: 'shore', entity: 'lake:1' }], 'mandatory', { closed: true });
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    expect(facesAt(p, 0)).toHaveLength(2);
    const outer = facesAt(p, 0).find((f) => faceHoles(p, 0, f).length === 1);
    expect(outer).toBeDefined();
    const q = ins(tx(p, 0), [[1500, 1500], [0, 0]], [{ role: 'shore', entity: 'river:1' }]);
    expect(q.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    expect(facesAt(p, 0)).toHaveLength(2);
    for (const f of facesAt(p, 0)) expect(faceHoles(p, 0, f)).toHaveLength(0);
  });

  it('an antenna changes the ring of the face it enters (one record, its ring longer)', () => {
    const p = framed();
    const f0 = facesAt(p, 0)[0];
    const before = faceWalk(p, 0, f0)[0].length;
    const t = tx(p, 0);
    const r = ins(t, [[0, 2000], [1500, 2000]], [{ role: 'shore', entity: 'spit:1' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    expect(facesAt(p, 0)).toEqual([f0]);
    expect(faceWalk(p, 0, f0)[0].length).toBe(before + 3); // the split vertex, then there and back along the antenna
    expect(chainJournal(t).faces[0].changed).toEqual([f0]);
  });

  it('the first L1 edge in an L0 face materialises its L1 records; an L2 edge in a region with no L1 record materialises the L1 own child it needs as a parent', () => {
    const p = framed();
    const r1 = ins(tx(p, 1), [[0, 2000], [4000, 2000]], [{ role: 'way', entity: 'way:1' }]);
    expect(r1.ok).toBe(true);
    expect(facesAt(p, 1)).toHaveLength(2);
    expect(allProblems(p)).toEqual([]);
    // A second L0 face (a lake) has no L1 record; an L2 antenna inside it needs an L1 parent.
    const q = framed();
    ins(tx(q, 0), [[1000, 1000], [3000, 1000], [3000, 3000], [1000, 3000]], [{ role: 'shore', entity: 'lake:1' }], 'mandatory', { closed: true });
    expect(facesAt(q, 1)).toHaveLength(0);
    const t = tx(q, 2);
    const r2 = ins(t, [[1500, 1500], [2500, 2500]], [{ role: 'kerb', entity: 'pier:1' }]);
    expect(r2.ok).toBe(true);
    expect(allProblems(q)).toEqual([]);
    expect(facesAt(q, 1)).toHaveLength(1);
    expect(facesAt(q, 2)).toHaveLength(1);
    expect(chainJournal(t).materialised).toEqual([{ level: 1, face: facesAt(q, 1)[0] }]);
  });

  it('§13.1: Euler characteristic after every insertion; output simple; nesting by index (a street grid, level by level)', () => {
    const p = framed();
    const steps: [Level, [number, number][], boolean][] = [
      [0, [[200, 3000], [3800, 3300]], false],
      [1, [[1000, 100], [1000, 3900]], false],
      [1, [[2000, 100], [2100, 3900]], false],
      [1, [[3000, 100], [2900, 3900]], false],
      [1, [[100, 1000], [3900, 1100]], false],
      [2, [[1200, 1200], [1800, 1200], [1800, 1800], [1200, 1800]], true],
      [2, [[1500, 1000], [1500, 1200]], false],
      [3, [[1300, 1300], [1700, 1700]], false],
      [4, [[1350, 1550], [1550, 1350]], false],
    ];
    for (const [level, pts, closed] of steps) {
      const r = ins(tx(p, level), pts, [{ role: 'way', entity: `way:${level}:${pts[0][0]}` }], 'mandatory', { closed });
      expect(r.ok).toBe(true);
      expect(eulerProblems(p)).toEqual([]);
      expect(faceProblems(p)).toEqual([]);
      expect(allProblems(p)).toEqual([]);
    }
    const k = eulerCounts(p, 1);
    expect(k.v - k.e + k.f).toBe(1 + k.c);
    expect(facesAt(p, 4).length).toBeGreaterThan(0);
  });
});

describe('kept finer records are re-parented into the part that holds them (rewalk(touched) directly)', () => {
  /**
   * An L1 face (the frame's inside, cut by an L1 line) holding an L2 floating ring K far to its west; a new L1 edge is
   * linked across the face east of K by the raw primitives, then rewalk reads it: the L1 face splits and K's parent
   * becomes the part that holds it. (insertChain itself refuses a chain into a face with finer records — they are kept
   * content at M0, C-0177 (4) — so the re-walk is driven directly here.)
   */
  function arena(kx = 300): { p: Plat; level: Level } {
    const b = indexed({
      vertices: [
        [0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0],
        [0, 2000, 1], [4000, 2000, 1],
        [kx, 300, 2], [kx + 400, 300, 2], [kx + 400, 700, 2], [kx, 700, 2],
        [2000, 0, 1], [2000, 2000, 1],
      ],
      edges: [
        [0, 10, 0], [10, 1, 0], [1, 5, 0], [5, 2, 0], [2, 3, 0], [3, 4, 0], [4, 0, 0],
        [4, 11, 1], [11, 5, 1],
        [6, 7, 2], [7, 8, 2], [8, 9, 2], [9, 6, 2],
      ],
    });
    return { p: b.plat, level: 1 };
  }

  /** Every live L2 record's parent, by slot (the oracle for which records a re-walk re-parented). */
  function parentsAt2(p: Plat): Map<number, number> {
    return new Map(facesAt(p, 2).map((f) => [f, p.faces[2].parent[f]] as const));
  }

  /** The L2 records whose parent differs between two snapshots, ascending. */
  function reparented(before: Map<number, number>, after: Map<number, number>): number[] {
    return [...after].filter(([f, par]) => before.get(f) !== par).map(([f]) => f).sort((x, y) => x - y);
  }

  it('the L2 ring K stays nested in the western part; the journal lists exactly the L2 records whose parent changed (§3.6 step 5: "the commit record lists them")', () => {
    const { p } = arena();
    expect(allProblems(p)).toEqual([]);
    const k = facesAt(p, 2).find((f) => faceWalk(p, 2, f)[0].some((h) => p.vertices.x[p.halfEdges.origin[h]] === 300));
    expect(k).toBeDefined();
    const parents = parentsAt2(p);
    // The new L1 edge (2000, 0)–(2000, 2000), linked and indexed by hand.
    const a = vertexAtPoint(p, 2000, 0);
    const c = vertexAtPoint(p, 2000, 2000);
    const h = linkEdge(p, a, c, 1);
    indexAdd(p, { kind: ITEM_EDGE, level: 1, slot: h >> 1 });
    const t = tx(p, 1);
    const r = rewalk(t, { pairs: [h >> 1] });
    expect(r.ok).toBe(true);
    expect(faceProblems(p)).toEqual([]);
    expect(eulerProblems(p)).toEqual([]);
    const after = p.faces[2].parent[k as number];
    // The parent is the western L1 part (its outer ring holds (0, 0)).
    expect(faceWalk(p, 1, after)[0].some((g) => p.vertices.x[p.halfEdges.origin[g]] === 0 && p.vertices.y[p.halfEdges.origin[g]] === 0)).toBe(true);
    expect(facesAt(p, 1)).toHaveLength(3);
    const moved = reparented(parents, parentsAt2(p));
    expect([...chainJournal(t).faces[2].changed].sort((x, y) => x - y)).toEqual(moved);
    expect(chainJournal(t).faces[2].changed.includes(k as number)).toBe(after !== parents.get(k as number));
    expect(chainJournal(t).faces[2].created).toEqual([]);
    expect(chainJournal(t).faces[2].removed).toEqual([]);
  });

  it('K in the eastern part instead (so in one of the two arenas the split record keeps the part that does not hold K): K follows the part that holds it, and the journal lists it at L2', () => {
    const { p } = arena(3300);
    const k = facesAt(p, 2).find((f) => faceWalk(p, 2, f)[0].some((g) => p.vertices.x[p.halfEdges.origin[g]] === 3300)) as number;
    const parents = parentsAt2(p);
    const a = vertexAtPoint(p, 2000, 2000);
    const c = vertexAtPoint(p, 2000, 0);
    const h = linkEdge(p, a, c, 1);
    indexAdd(p, { kind: ITEM_EDGE, level: 1, slot: h >> 1 });
    const t = tx(p, 1);
    expect(rewalk(t, { pairs: [h >> 1] }).ok).toBe(true);
    // The L0 and L1 records are the views' faces. The L2 own child holding K as a hole is straddled by the hand-linked
    // edge — outside rewalk's precondition, which insertChain keeps by refusing such an edge E_KEPT (C-0177 (4)) — so
    // the L2 rows are not judged here (in the western arena above it happens to stay whole).
    expect(faceProblems(p).filter((x) => !x.includes('L2'))).toEqual([]);
    const par = p.faces[2].parent[k];
    expect(par).not.toBe(parents.get(k));
    expect(faceWalk(p, 1, par)[0].some((g) => p.vertices.x[p.halfEdges.origin[g]] === 4000 && p.vertices.y[p.halfEdges.origin[g]] === 0)).toBe(true);
    // The re-parented L2 records are in the journal's L2 `changed` (the commit record's dirty set at L2), K among them,
    // and nothing else is: a record left in the part that kept the split record is not dirty.
    const moved = reparented(parents, parentsAt2(p));
    expect(moved).toContain(k);
    expect([...chainJournal(t).faces[2].changed].sort((x, y) => x - y)).toEqual(moved);
    // The split L1 record is listed at L1 (one part kept, one created), as before.
    expect(chainJournal(t).faces[1].changed).toHaveLength(1);
    expect(chainJournal(t).faces[1].created).toHaveLength(1);
    expect(chainJournal(t).faces[1].created).toContain(par);
  });

  it('the re-walk\'s undo log gives every re-parented record its parent back (a refused chain\'s rollback runs it, C-0177 (8))', () => {
    const { p } = arena(3300);
    const parents = parentsAt2(p);
    const h = linkEdge(p, vertexAtPoint(p, 2000, 2000), vertexAtPoint(p, 2000, 0), 1);
    indexAdd(p, { kind: ITEM_EDGE, level: 1, slot: h >> 1 });
    const t = tx(p, 1);
    const undo: (() => void)[] = [];
    expect(rewalk(t, { pairs: [h >> 1] }, undo).ok).toBe(true);
    expect(chainJournal(t).faces[2].changed.length).toBeGreaterThan(0);
    for (let i = undo.length - 1; i >= 0; i--) undo[i]();
    for (const [f, par] of parents) expect(p.faces[2].parent[f]).toBe(par);
  });
});

describe('the re-walk\'s refusal', () => {
  it('a chain of a batch above L0 leaving every L0 face: E_LEVEL, nothing written', () => {
    const p = framed();
    const before = contentPrint(p);
    const t = tx(p, 1);
    const r = ins(t, [[2000, 2000], [5000, 2000]], [{ role: 'way', entity: 'way:out' }]);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_LEVEL');
    expect(contentPrint(p)).toBe(before);
    expect(allProblems(p)).toEqual([]);
  });
});

it('a face record made by the raw primitive is walked by the oracles alike (support check)', () => {
  const p = framed();
  const f = facesAt(p, 0)[0];
  expect(() => allocFace(p, 0, { outer: p.faces[0].outer[f], kind: 0, owner: -1, stage: 0, parent: -1 })).not.toThrow();
  expect(faceProblems(p).length).toBeGreaterThan(0); // two records on one view face: the oracle sees it
});
