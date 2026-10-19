// M0-a-05 session fix round S8 (J335, queue row Q53; the diagnosis plat/docs/build/checks/diagnosis-a09-sliver.md): the
// re-walk's coarser record is found in the batch's own reading (§2.2 rule 2; §3.10's nesting row, "by index — never by
// coordinates"; C-0349). Two L1 chords converge so nearly tangentially that the L1 face between them (f4, the triangle
// (4000, 0) (4000, 384) (3967, 3941)) is thinner than the hot pixel for its last metres; a corridor_split chain whose
// first point lands in the hot pixel of both chords commits its first, lawful 25 cm edge inside f4 — the first L2 edge
// there — so the re-walk must materialise f4's L2 records under f4 with its kind, owner and stage (§2.2 rules 2 and 4).
// Before the round `coarserRegion` asked a level-1 query at the edge's midpoint, which reads each L1 face on its level-1
// route (straight chords) and found only f1, then rejected f1 by the walk through the L2 Steiner vertices and fell to the
// L0 frame face: a phantom L1 record (the frame's attributes, f0's ring), the two L2 records under it and an L2 duplicate
// of f0 — committed, `checkIndexState` empty (N-45 (a)'s silently wrong result). B-FUZZ (bands) seed 745761989 case
// 6695, shrunk; the same on K0.
import { describe, expect, it } from 'vitest';
import { faceWalk, handleOf, isFaceLive, type Plat } from '../../../src/arena/index.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { checkIndexState, indexAdd, ITEM_EDGE } from '../../../src/index/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { rewalk } from '../../../src/insert/rewalk.js';
import { linkEdge } from '../../../src/insert/snapRound.js';
import { chainJournal } from '../../../src/insert/stretch.js';
import { tx } from '../../../src/tx/index.js';
import type { Level } from '../../../src/types/index.js';
import { healthy, network, pt, spec, tilesExactly, widthsOf, AT_S9, type Chord } from '../../arr/bands/support.js';
import { allProblems, contentPrint, facesAt, indexed, tx as insertTx, vertexAtPoint } from './support.js';

/** Q53's three lawful chords (arc positions on the framed square, B-FUZZ's corridor domain). */
const CHORDS: Chord[] = [
  { a: 3974, b: 8033, hw: 30, knots: [5, 239], ends: 'round' },
  { a: 7939, b: 8927, hw: 30, knots: [275, 446], ends: 'round' },
  { a: 4384, b: 8017, hw: 1, knots: null, ends: 'round' },
];

/** The L2 records whose parent is the L1 face `f`, each as its parent, owner, stage and kind. */
function childrenOf(p: Plat, f: number): { face: number; parent: number; owner: number; stage: number; kind: number }[] {
  const F = p.faces[2];
  return facesAt(p, 2 as Level)
    .filter((c) => F.parent[c] === f)
    .map((c) => ({ face: c, parent: F.parent[c], owner: F.owner[c], stage: F.stage[c], kind: F.kind[c] }));
}

describe('a first L2 edge inside an L1 face thinner than the hot pixel: its records hang from that face (Q53)', () => {
  it('Q53: corridorUnion over the three-chord sliver commits healthy — L2 f4 and f5 under L1 f4 (district:1, its stage), no phantom L1 record, no duplicate L2 record', () => {
    const { p, faces, table } = network(CHORDS);
    expect(faces).toEqual([0, 1, 2, 3, 4]);
    expect(allProblems(p)).toEqual([]);
    const F1 = p.faces[1];
    const sliver = 4;
    const owner = handleOf(p, 'district:1');
    expect([F1.owner[sliver], F1.parent[sliver]]).toEqual([owner, 0]);
    const ws = widthsOf(table);
    const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    // the band / blocks classes the diagnosis states for the committed batch (its §7)
    expect(r.value.value).toEqual({ band: [4, 1, 3, 5, 2, 7], strips: [1, 3], wedges: [4, 5, 2, 7], blocks: [0, 6], whole: [], wholeBand: [3, 2] });
    healthy(p);
    expect(checkIndexState(p)).toEqual([]);
    expect(tilesExactly(p, 2, faces)).toEqual([]);
    // no phantom: the L1 records are the five the network made, unchanged in number
    expect(facesAt(p, 1 as Level)).toEqual([0, 1, 2, 3, 4]);
    // the sliver's two L2 records hang from L1 f4 with its kind, owner and stage (§2.2 rules 2 and 4)
    expect(childrenOf(p, sliver)).toEqual([
      { face: 4, parent: sliver, owner, stage: F1.stage[sliver], kind: F1.kind[sliver] },
      { face: 5, parent: sliver, owner, stage: F1.stage[sliver], kind: F1.kind[sliver] },
    ]);
    expect(F1.stage[sliver]).toBe(8);
    for (let f = 0; f < p.slots.face[2].top; f += 1) if (isFaceLive(p, 2, f)) expect(F1.kind[p.faces[2].parent[f]]).not.toBe(0xffff);
  });

  it('Q53 through insertChain alone: the corridor_split chain whose first edge lies inside the sliver commits, its L2 records under L1 f4', () => {
    const { p } = network(CHORDS);
    const owner = handleOf(p, 'district:1');
    const pts = [pt(3970, 3641), pt(3753, 3639), pt(3774, 3954)];
    const r = tx(p, spec(2, AT_S9), (o) => insertChain(o, pts, [{ role: 'corridor_split', entity: 'district:1' }], 'mandatory'));
    expect(r.ok).toBe(true);
    healthy(p);
    expect(facesAt(p, 1 as Level)).toEqual([0, 1, 2, 3, 4]);
    const kids = childrenOf(p, 4);
    expect(kids.length).toBe(2);
    for (const k of kids) expect([k.parent, k.owner, k.stage]).toEqual([4, owner, 8]);
  });

  // N-s8c-5 (the hardening round S9): the third door — the same chain after one unrelated L2 chain in the same
  // transaction, so the batch's index log is open and an earlier L2 edge stands, and the reach of `holderAt` is read on the
  // batch path too (mutant ME, no reach, refused the chain alone while corridorUnion's batch still committed).
  it('Q53 through insertChain after an unrelated L2 chain in the same transaction: both commit, the sliver\'s L2 records under L1 f4', () => {
    const { p } = network(CHORDS);
    const owner = handleOf(p, 'district:1');
    const pts = [pt(3970, 3641), pt(3753, 3639), pt(3774, 3954)];
    const r = tx(p, spec(2, AT_S9), (o) => {
      const first = insertChain(o, [pt(600, 300), pt(900, 700)], [{ role: 'corridor_split', entity: 'district:1' }], 'mandatory');
      if (!first.ok) return first;
      return insertChain(o, pts, [{ role: 'corridor_split', entity: 'district:1' }], 'mandatory');
    });
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    healthy(p);
    expect(facesAt(p, 1 as Level)).toEqual([0, 1, 2, 3, 4]);
    const kids = childrenOf(p, 4);
    expect(kids.length).toBe(2);
    for (const k of kids) expect([k.parent, k.owner, k.stage]).toEqual([4, owner, 8]);
  });
});

describe('the premise of a region materialised from a coarser record is checked (C-0349 (2))', () => {
  /**
   * The framed square cut by an L1 line x = 2000 (two L1 records under the L0 face), with the eastern L1 record's
   * stored outer half-edge pointed at the western one's ring — a record lost, as the pre-round lookup lost L1 f4 —
   * then an L2 edge (2000, 1000)–(4000, 1000) linked across the eastern half by the raw primitives and re-walked. No L1
   * record holds the eastern cycles, so the search reaches the L0 face — but L1 records lie under it round the new edge:
   * before this round the re-walk materialised a phantom L1 record from the frame face; now it refuses E_INVARIANT with
   * the pinned text, writing nothing (N-45 (a); expected never on a healthy arena).
   */
  it('a coarser record with records of a finer level under it round the new edge: E_INVARIANT, the text pinned, nothing written', () => {
    const b = indexed({
      vertices: [
        [0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0],
        [2000, 0, 1], [2000, 4000, 1], [2000, 1000, 1], [4000, 1000, 2],
      ],
      edges: [
        [0, 4, 0], [4, 1, 0], [1, 7, 0], [7, 2, 0], [2, 5, 0], [5, 3, 0], [3, 0, 0],
        [4, 6, 1], [6, 5, 1],
      ],
    });
    const p = b.plat;
    expect(allProblems(p)).toEqual([]);
    const l1 = facesAt(p, 1 as Level);
    expect(l1).toHaveLength(2);
    const F1 = p.faces[1];
    const west = l1.find((f) => faceWalk(p, 1, f)[0].some((g) => p.vertices.x[p.halfEdges.origin[g]] === 0)) as number;
    const east = l1.find((f) => f !== west) as number;
    F1.outer[east] = F1.outer[west];
    const h = linkEdge(p, vertexAtPoint(p, 2000, 1000), vertexAtPoint(p, 4000, 1000), 2);
    indexAdd(p, { kind: ITEM_EDGE, level: 2, slot: h >> 1 });
    const before = contentPrint(p);
    const records = [0, 1, 2, 3, 4].map((l) => facesAt(p, l as Level).length);
    const t = insertTx(p, 2);
    const r = rewalk(t, { pairs: [h >> 1] });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toBe(`insert: the L1 record ${String(west)} lies under the L0 face 0 that a region of the L2 batch would be materialised from (§2.2 rule 2)`);
    expect([0, 1, 2, 3, 4].map((l) => facesAt(p, l as Level).length)).toEqual(records);
    expect(contentPrint(p)).toBe(before);
    expect(chainJournal(t).materialised).toEqual([]);
    expect(chainJournal(t).faces[1].created).toEqual([]);
    expect(chainJournal(t).faces[2].created).toEqual([]);
  });
});

// N-s8-3 (the hardening round S9): the reach of the midpoint fallback (`holderAt`, a cycle of new edges alone). A
// hand-built arena no lawful input reaches — the frame's bottom edge split by an L1 vertex 3 cm below it, so the L0
// face's walk leaves its route's box by 3 cm (§2.2 rule 3 allows one hot pixel per finer level) — and an L1 triangle of
// new edges alone inside that dip, linked by the raw primitives and re-walked. Every new edge's midpoint lies inside the
// L0 walk and 1.5 – 2 cm outside the L0 route, so only the box widened by `WALK_REACH_CM` meets the record: the triangle's
// cycles hang from the frame face (its L1 own child and the triangle's face). Mutant M9 (the midpoint box unwidened)
// finds no holder and refuses the batch E_LEVEL. (M10 and M11, the other two widened boxes, are equivalent on every
// arena that reaches them, N-s8c-4: a new edge keeps minEdge from every old vertex before the re-walk runs.)
describe('N-s8-3: the midpoint fallback reads its holder within WALK_REACH_CM (mutant M9)', () => {
  it('an L1 triangle of new edges alone inside the frame walk\'s 3 cm dip below its route: placed under the L0 face, two L1 records', () => {
    const b = indexed({
      vertices: [
        [0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0],
        [2000, -3, 1], [1900, -2, 1], [2100, -2, 1], [2000, -1, 1],
      ],
      edges: [[0, 4, 0], [4, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0]],
    });
    const p = b.plat;
    expect(facesAt(p, 0 as Level)).toHaveLength(1);
    expect(facesAt(p, 1 as Level)).toEqual([]);
    const v = (x: number, y: number): number => vertexAtPoint(p, x, y);
    const pairs = [[v(1900, -2), v(2100, -2)], [v(2100, -2), v(2000, -1)], [v(2000, -1), v(1900, -2)]].map(([a, c]) => {
      const h = linkEdge(p, a, c, 1);
      indexAdd(p, { kind: ITEM_EDGE, level: 1, slot: h >> 1 });
      return h >> 1;
    });
    const t = insertTx(p, 1);
    const r = rewalk(t, { pairs });
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    const l1 = facesAt(p, 1 as Level);
    expect(l1).toHaveLength(2);
    for (const f of l1) expect(p.faces[1].parent[f]).toBe(facesAt(p, 0 as Level)[0]);
  });
});
