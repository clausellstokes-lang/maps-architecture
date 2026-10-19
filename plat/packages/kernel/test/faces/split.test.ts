// M0-a-07: splitFace's contact semantics (§3.6 (1) – (5)) and the children's exact tiling (§13.1), on constructed faces:
// the lower half of a framed square (margin and way), an L-shaped face with a reflex vertex, a face with an antenna, a
// face with a hole. Every refusal writes nothing (the content print unchanged). The contact decision reads exact
// orient2d on lattice points: the ± 1 lattice-unit grazing fixtures are its witnesses (§13.1's geometry classes).
import { describe, expect, it } from 'vitest';
import { addRole, faceWalk, isVertexLive, outgoing, type FaceId, type Plat, type VertexId } from '../../src/arena/index.js';
import { splitFace } from '../../src/faces/index.js';
import { insertChain } from '../../src/insert/index.js';
import type { Level } from '../../src/types/index.js';
import { attachIndex } from '../../src/index/index.js';
import { buildArena } from '../arena/support.js';
import { CELLS } from '../insert/step3-5/support.js';
import { attempt, commit, content, faceArea2Big, faceAt, halves, ownedHalves, parentOf, pt, ringArea2, tileDefect, withHoles, type Parent } from './support.js';

const DB = [{ role: 'district_bound', entity: 'd:1' }];
type P = readonly [number, number];
const pts = (xs: readonly P[]) => xs.map(([x, y]) => pt(x, y));

/** Splits and returns the children (throws on a refusal). */
function split(p: Plat, f: FaceId, cut: readonly P[], level: Level = 1): [FaceId, FaceId] {
  return commit(p, level, (o) => splitFace(o, f, pts(cut), { rows: DB })).value as [FaceId, FaceId];
}

/** The refusal code of a split, asserting the arena unchanged. */
function refused(p: Plat, f: FaceId, cut: readonly P[]): string {
  const before = content(p);
  const r = attempt(p, 1, (o) => splitFace(o, f, pts(cut), { rows: DB }));
  expect(content(p)).toBe(before);
  return r.ok ? 'ok' : r.code;
}

/**
 * §13.1's tiling identity at the child level, against the parent read before the split (note N-1, `tileDefect`): the
 * children's exact areas sum to the parent's area2 plus the moves of the split landings, and no half-edge bounds both
 * children. Returns the children's sum.
 */
function tiles(p: Plat, a: FaceId, b: FaceId, parent: Parent, level: Level = 1): bigint {
  const ra = faceWalk(p, level, a).flat();
  const rb = faceWalk(p, level, b).flat();
  expect(ra.some((h) => rb.includes(h))).toBe(false);
  expect(tileDefect(p, level, a, b, parent)).toBe(0n);
  return faceArea2Big(p, level, a) + faceArea2Big(p, level, b);
}

/** The refusal detail of a split, asserting the arena unchanged ('ok' where it commits nothing to refuse). */
function refusedFor(p: Plat, f: FaceId, cut: readonly P[]): string {
  const before = content(p);
  const r = attempt(p, 1, (o) => splitFace(o, f, pts(cut), { rows: DB }));
  expect(content(p)).toBe(before);
  return r.ok ? 'ok' : r.detail;
}

/** The lower half cut into an L: a `district_bound` chain (2000, 0) → (2000, 1000) → (4000, 1000); the L's reflex vertex is (2000, 1000). */
function ell(): { p: Plat; f: FaceId } {
  const p = halves();
  commit(p, 1, (o) => insertChain(o, pts([[2000, 0], [2000, 1000], [4000, 1000]]), [{ role: 'district_bound', entity: 'd:0' }], 'mandatory'));
  return { p, f: faceAt(p, 1, 500, 500) };
}

describe('splitFace: the children and their order (§3.6 (5), §13.1)', () => {
  it('a straight cut: left of the directed cut first; the children tile the parent exactly', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    const parent = parentOf(p, 1, f);
    const [l, r] = split(p, f, [[1000, 0], [1000, 2000]]);
    expect(faceAt(p, 1, 500, 500)).toBe(l);
    expect(faceAt(p, 1, 3000, 500)).toBe(r);
    expect(tiles(p, l, r, parent)).toBe(parent.area2);
    content(p);
  });

  it('the same cut directed the other way returns the children the other way round', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    const [l, r] = split(p, f, [[1000, 2000], [1000, 0]]);
    expect(faceAt(p, 1, 3000, 500)).toBe(l);
    expect(faceAt(p, 1, 500, 500)).toBe(r);
  });

  it('a bent cut of three vertices (§3.4): the region above the bend is left of it', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    const parent = parentOf(p, 1, f);
    const [l, r] = split(p, f, [[1000, 0], [2000, 1000], [3000, 0]]);
    expect(faceAt(p, 1, 2000, 1500)).toBe(l);
    expect(faceAt(p, 1, 2000, 300)).toBe(r);
    expect(tiles(p, l, r, parent)).toBe(parent.area2);
    content(p);
  });

  it('a slanted cut whose ends split the boundary edges: the tiling identity at the child level', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    const parent = parentOf(p, 1, f);
    const [l, r] = split(p, f, [[1237, 0], [2911, 2000]]);
    // The bottom margin and the top way are axis-aligned: the landings move nothing, the sum is the parent's area.
    expect(tiles(p, l, r, parent)).toBe(parent.area2);
    content(p);
  });

  it('the child keeping the parent record is the one with the smaller canonical key', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    const [l, r] = split(p, f, [[3000, 2000], [3000, 0]]);
    // The lowest-leftmost vertex (0, 0) stays with the part x < 3000, which is the right child of a downward cut.
    expect(r).toBe(f);
    expect(l).not.toBe(f);
  });

  it('an end within attractCm of a boundary vertex lands on that vertex (§3.6 (1))', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    const parent = parentOf(p, 1, f);
    const [l, r] = split(p, f, [[10, 1990], [2000, 0]]);
    expect(tiles(p, l, r, parent)).toBe(parent.area2);
    // The cut runs from the vertex (0, 2000): no new vertex beside it.
    const ring = faceWalk(p, 1, l).flat().map((h) => `${p.vertices.x[p.halfEdges.origin[h]]},${p.vertices.y[p.halfEdges.origin[h]]}`);
    expect(ring).toContain('0,2000');
    expect(ring.filter((s) => s.startsWith('10,') || s.endsWith(',1990'))).toEqual([]);
  });

  it('the cut\'s edges take the face owner\'s plot_line by default (C-0192)', () => {
    const { p, lower } = ownedHalves();
    const c = commit(p, 1, (o) => splitFace(o, lower, pts([[1000, 0], [1000, 2000]])));
    expect(c.record?.roles.some((k) => k.role === 'plot_line' && k.entity === 'block:1')).toBe(true);
  });
});

describe('splitFace: contacts refused E_NOT_TWO_CROSSINGS, nothing written (§3.6 (2), §3.11)', () => {
  it('a cut of one point, and one whose two ends land on one vertex', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    expect(refused(p, f, [[1000, 0]])).toBe('E_NOT_TWO_CROSSINGS');
    expect(refused(p, f, [[1000, 0], [1000, 0]])).toBe('E_NOT_TWO_CROSSINGS');
    expect(refused(p, f, [[5, 5], [10, 12]])).toBe('E_NOT_TWO_CROSSINGS');
    expect(refused(p, f, [[5, 5], [1000, 1000], [12, 3]])).toBe('E_NOT_TWO_CROSSINGS');
  });

  it('a cut through a reflex vertex, and grazing it offset by 0 and ± 1 lattice unit', () => {
    const { p, f } = ell();
    // Through (2000, 1000): x − y = 1000.
    expect(refused(p, f, [[1000, 0], [3000, 2000]])).toBe('E_NOT_TWO_CROSSINGS');
    // Offset 0 (a vertex of the cut on the reflex vertex itself) and ± 1 lattice unit.
    expect(refused(p, f, [[1000, 0], [2000, 1000], [3000, 2000]])).toBe('E_NOT_TWO_CROSSINGS');
    expect(refused(p, f, [[1001, 0], [3001, 2000]])).toBe('E_NOT_TWO_CROSSINGS');
    expect(refused(p, f, [[999, 0], [2999, 2000]])).toBe('E_NOT_TWO_CROSSINGS');
    expect(refused(p, f, [[1000, 1], [3000, 2001]])).toBe('E_NOT_TWO_CROSSINGS');
  });

  it('the vertex rule\'s radius is attractCm: grazing the reflex vertex at 14.1 cm is refused by the judgement, at 28.3 cm the cut splits', () => {
    const { p, f } = ell();
    // x − y = 980 passes (2000, 1000) at 20/√2 ≈ 14.1 cm; x − y = 960 at 40/√2 ≈ 28.3 cm.
    const before = content(p);
    const r = attempt(p, 1, (o) => splitFace(o, f, pts([[980, 0], [2980, 2000]]), { rows: DB }));
    expect(!r.ok && r.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(!r.ok && r.detail).toMatch(/within attractCm of the boundary vertex \(2000, 1000\)/);
    expect(content(p)).toBe(before);
    expect(split(p, f, [[960, 0], [2960, 2000]])).toHaveLength(2);
    content(p);
  });

  it('the interior-point rule\'s radius is attractCm: a cut point 15 cm and 25 cm below the top way is refused by the judgement, 30 cm below the cut splits', () => {
    // A steep cut whose apex comes within attractCm of the way y = 2000 (note N-2's fixture; M02: the radius 26 → 1). The
    // insertion would draw the apex onto the way and its backstop refuse with the same code: the detail is the judgement's.
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    expect(refusedFor(p, f, [[1000, 0], [1500, 1985], [2000, 0]])).toBe('the cut\'s point (1500, 1985) lies within attractCm of the boundary (§3.6 (2))');
    expect(refusedFor(p, f, [[1000, 0], [1500, 1975], [2000, 0]])).toBe('the cut\'s point (1500, 1975) lies within attractCm of the boundary (§3.6 (2))');
    const parent = parentOf(p, 1, f);
    const [l, r] = split(p, f, [[1000, 0], [1500, 1970], [2000, 0]]);
    expect(tiles(p, l, r, parent)).toBe(parent.area2);
    content(p);
  });

  it('a cut overlapping a boundary edge', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    expect(refused(p, f, [[500, 0], [1500, 0]])).toBe('E_NOT_TWO_CROSSINGS');
    expect(refused(p, f, [[500, 0], [2500, 0], [2500, 2000]])).toBe('E_NOT_TWO_CROSSINGS');
  });

  it('a cut crossing the boundary more than twice', () => {
    const { p, f } = ell();
    expect(refused(p, f, [[0, 500], [4000, 500]])).toBe('E_NOT_TWO_CROSSINGS');
  });

  it('a cut running within attractCm of a boundary edge away from its ends, and a cut leaving the face', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    expect(refused(p, f, [[1000, 0], [1500, 20], [1000, 2000]])).toBe('E_NOT_TWO_CROSSINGS');
    expect(refused(p, f, [[1000, 0], [1000, -500], [2000, 0]])).toBe('E_NOT_TWO_CROSSINGS');
    // An end farther than attractCm from every boundary.
    expect(refused(p, f, [[1000, 0], [1000, 1000]])).toBe('E_NOT_TWO_CROSSINGS');
    // An end on another face's boundary only.
    expect(refused(p, f, [[1000, 0], [1000, 2000], [1000, 3000], [1000, 4000]])).toBe('E_NOT_TWO_CROSSINGS');
  });

  it('a cut between two landings of a concave face running outside it (across a U\'s mouth)', () => {
    const p = halves();
    commit(p, 1, (o) => insertChain(o, pts([[1500, 2000], [1500, 800], [2500, 800], [2500, 2000]]), [{ role: 'district_bound', entity: 'd:0' }], 'mandatory'));
    const u = faceAt(p, 1, 500, 500);
    expect(faceAt(p, 1, 2000, 1500)).not.toBe(u);
    expect(refused(p, u, [[1500, 1500], [2500, 1500]])).toBe('E_NOT_TWO_CROSSINGS');
  });

  it('a cut leaving its end along the boundary edge (closer than minFaceAngle)', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    // From (1000, 0) at 2° off the bottom edge: within minFaceAngle (5°).
    expect(refused(p, f, [[1000, 0], [3000, 70], [3000, 2000]])).toBe('E_NOT_TWO_CROSSINGS');
  });

  it('the cut doubling back within attractCm of itself, and crossing itself', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    expect(refused(p, f, [[1000, 0], [1000, 1500], [1010, 400], [3000, 2000]])).toBe('E_NOT_TWO_CROSSINGS');
    expect(refused(p, f, [[1000, 0], [1500, 1500], [2000, 500], [500, 1000], [0, 1500]])).toBe('E_NOT_TWO_CROSSINGS');
    // By the judgement's own rules, before anything is written (C-0192 (1)), not by the insertion's bent-cut backstop
    // (C-0214 (2)), which refuses with the same code (note N-c1c-2).
    expect(refusedFor(p, f, [[1000, 0], [1000, 1500], [1010, 400], [3000, 2000]])).toBe('the cut doubles back within attractCm of itself (§3.6 (2))');
    expect(refusedFor(p, f, [[1000, 0], [1500, 1500], [2000, 500], [500, 1000], [0, 1500]])).toBe('the cut crosses itself (§3.6 (2))');
  });

  it('a figure-eight: the cut crossing itself is refused by the judgement (its detail), nothing written', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    // Two segments crossing at right angles far from every boundary and from each other's ends (note N-c1c-2's X05).
    expect(refusedFor(p, f, [[1000, 0], [1000, 1200], [2000, 1200], [2000, 600], [600, 600], [0, 600]])).toBe('the cut crosses itself (§3.6 (2))');
    expect(refusedFor(p, f, [[1500, 0], [2500, 1500], [3000, 1500], [3000, 500], [1500, 1500], [1500, 2000]])).toBe('the cut crosses itself (§3.6 (2))');
  });

  it('a cut folding back at an interior point sharper than minFaceAngle (insertion would share the arms into an antenna)', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    // Arms 1000 cm long, ends 80 cm apart: 4.58° at the fold, within minFaceAngle (5°) — refused, nothing written.
    expect(refused(p, f, [[1960, 0], [2000, 1000], [2040, 0]])).toBe('E_NOT_TWO_CROSSINGS');
    // 120 cm apart: 6.87°, wider than minFaceAngle — a split whose children tile the face (the negative control).
    const area = faceArea2Big(p, 1, f);
    const [a, b] = split(p, f, [[1940, 0], [2000, 1000], [2060, 0]]);
    expect(faceArea2Big(p, 1, a) + faceArea2Big(p, 1, b)).toBe(area);
  });
});

describe('splitFace: antennae count as boundary (§3.6 (3))', () => {
  /** A dead-end `way` from the top way (1000, 2000) down to (1000, 1000): an antenna inside the lower face. */
  function antenna(): { p: Plat; f: FaceId } {
    const p = halves();
    commit(p, 1, (o) => insertChain(o, pts([[1000, 2000], [1000, 1000]]), [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    return { p, f: faceAt(p, 1, 500, 500) };
  }

  it('a cut ending on the antenna — a declared T-junction — splits the face', () => {
    const { p, f } = antenna();
    const parent = parentOf(p, 1, f);
    const [l, r] = split(p, f, [[0, 1500], [1000, 1500]]);
    expect(l).not.toBe(r);
    // The antenna's two sides cancel in the parent's area as in the children's.
    expect(tiles(p, l, r, parent)).toBe(parent.area2);
    expect(faceAt(p, 1, 500, 1800)).toBe(l);
    content(p);
  });

  it('a cut ending on the antenna\'s dead end splits the face', () => {
    const { p, f } = antenna();
    const parent = parentOf(p, 1, f);
    const [l, r] = split(p, f, [[0, 1000], [1000, 1000]]);
    expect(tiles(p, l, r, parent)).toBe(parent.area2);
  });

  it('a cut crossing the antenna is refused', () => {
    const { p, f } = antenna();
    expect(refused(p, f, [[0, 1500], [4000, 1500]])).toBe('E_NOT_TWO_CROSSINGS');
    // By the judgement's contact rule, before anything is inserted (not by the insertion coming back bent).
    const r = attempt(p, 1, (o) => splitFace(o, f, pts([[0, 1500], [4000, 1500]]), { rows: DB }));
    expect(!r.ok && r.detail).toMatch(/the cut touches or crosses the boundary edge \(1000, \d+\)–\(1000, \d+\)/);
  });
});

describe('splitFace: a cut to a hole is connectHole\'s (§3.6 (4))', () => {
  it('outer ring to hole: E_HOLE_CONTACT, nothing written', () => {
    const p = withHoles([[[1500, 500], [2500, 500], [2500, 1500], [1500, 1500]]]);
    const f = faceAt(p, 1, 500, 500);
    const before = content(p);
    const r = attempt(p, 1, (o) => splitFace(o, f, pts([[1000, 0], [1500, 1000]]), { rows: DB }));
    expect(r.ok ? 'ok' : r.code).toBe('E_HOLE_CONTACT');
    expect(content(p)).toBe(before);
  });

  it('a split of a holed face keeps the hole in the child holding it', () => {
    const p = withHoles([[[1500, 500], [2500, 500], [2500, 1500], [1500, 1500]]]);
    const f = faceAt(p, 1, 500, 500);
    const parent = parentOf(p, 1, f);
    const [l, r] = split(p, f, [[1000, 0], [1000, 2000]]);
    expect(tiles(p, l, r, parent)).toBe(parent.area2);
    expect(faceWalk(p, 1, r)).toHaveLength(2);
    expect(faceWalk(p, 1, l)).toHaveLength(1);
    expect(ringArea2(p, faceWalk(p, 1, r)[1])).toBeLessThan(0n);
    content(p);
  });
});

describe('splitFace: an end beside a sub-edge no split of which keeps clearance lands on its nearer end (C-0192 (1), C-0284; M0-a-05 N-c2-7)', () => {
  // C-0284's shallow corner (M0-a-05's lifecycle.test.ts \`nearFrame\`): the L0 frame [0, 4 000]² and the L1 chord
  // E (3 034, 4 000) – P (2 912, 4 000 − d) – (2 000, 2 000) – (2 000, 0). At d = 16 cm no point of P–E keeps clearance
  // once split (P would come within minEdge of the frame's edge at E): the boundary split must be refused and the end lands
  // on P, as insertChain lands it (\`splitBreaksClearance\`, the placement rule's (iii)). At d = 30 cm the end splits P–E.
  function corner(d: number): { p: Plat; f: FaceId; P: VertexId; E: VertexId } {
    const b = buildArena({
      vertices: [
        [0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0],
        [3034, 4000, 1], [2912, 4000 - d, 1], [2000, 2000, 1], [2000, 0, 1],
      ],
      edges: [
        [0, 7, 0], [7, 1, 0], [1, 2, 0], [2, 4, 0], [4, 3, 0], [3, 0, 0],
        [4, 5, 1], [5, 6, 1], [6, 7, 1],
      ],
    });
    // The frame's margin rows and the chord's district_bound rows, then the index (as M0-a-05's \`indexed\`).
    b.he.forEach((h, i) => addRole(b.plat, h, i < 6 ? { role: 'margin', entity: 'terrain:1' } : { role: 'district_bound', entity: 'd:c' }, i < 6 ? 0 : 1));
    attachIndex(b.plat, { gridCellCm: CELLS });
    return { p: b.plat, f: faceAt(b.plat, 1, 3500, 1000), P: b.v[5], E: b.v[4] };
  }

  /** The live vertices strictly between P and E within 1.42 cm of their segment (a split of P–E). */
  function onPE(p: Plat, P: VertexId, E: VertexId): VertexId[] {
    const X = p.vertices.x;
    const Y = p.vertices.y;
    const out: VertexId[] = [];
    for (let v = 0; v < p.slots.vertex.top; v++) {
      if (v === P || v === E || !isVertexLive(p, v)) continue;
      const cross = (X[E] - X[P]) * (Y[v] - Y[P]) - (Y[E] - Y[P]) * (X[v] - X[P]);
      const dot = (X[v] - X[P]) * (X[E] - X[P]) + (Y[v] - Y[P]) * (Y[E] - Y[P]);
      const l2 = (X[E] - X[P]) * (X[E] - X[P]) + (Y[E] - Y[P]) * (Y[E] - Y[P]);
      if (cross * cross <= 2 * l2 && dot > 0 && dot < l2) out.push(v);
    }
    return out;
  }

  const CUT: readonly P[] = [[2966, 3985], [4000, 3000]];

  it('at 16 cm the end 6 cm off P–E lands on P: no vertex on P–E, P–E one edge, the cut leaves P, the children tile the face', () => {
    const { p, f, P, E } = corner(16);
    expect(f).toBeGreaterThanOrEqual(0);
    const parent = parentOf(p, 1, f);
    const [l, r] = split(p, f, CUT);
    expect(onPE(p, P, E)).toEqual([]);
    const ends = outgoing(p, P).map((h) => p.halfEdges.origin[h ^ 1]);
    expect(ends.includes(E)).toBe(true);
    expect(ends.some((w) => p.vertices.x[w] === 4000 && p.vertices.y[w] === 3000)).toBe(true);
    expect(tiles(p, l, r, parent)).toBe(parent.area2);
    content(p);
  });

  it('the control: at 30 cm the same end splits P–E', () => {
    const { p, f, P, E } = corner(30);
    const parent = parentOf(p, 1, f);
    const [l, r] = split(p, f, CUT);
    const s = onPE(p, P, E);
    expect(s).toHaveLength(1);
    expect(outgoing(p, s[0]).some((h) => p.vertices.x[p.halfEdges.origin[h ^ 1]] === 4000)).toBe(true);
    // The face's ring runs E → P: the split point's hot pixel bends that edge, and the children's sum moves by exactly
    // the area2 of the triangle E, s, P (not 0 on this slanted edge; tileDefect counts it).
    const move = tileMove(p, E, s[0], P);
    expect(move).not.toBe(0n);
    expect(tiles(p, l, r, parent)).toBe(parent.area2 + move);
    content(p);
  });
});

/** The area2 a split point s adds to the edge u–w it splits (u, s, w: exact, BigInt). */
function tileMove(p: Plat, u: VertexId, s: VertexId, w: VertexId): bigint {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  return (BigInt(X[s]) - BigInt(X[u])) * (BigInt(Y[w]) - BigInt(Y[u])) - (BigInt(Y[s]) - BigInt(Y[u])) * (BigInt(X[w]) - BigInt(X[u]));
}
