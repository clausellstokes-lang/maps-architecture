// M0-a-07: splitFace's contact semantics (§3.6 (1) – (5)) and the children's exact tiling (§13.1), on constructed faces:
// the lower half of a framed square (margin and way), an L-shaped face with a reflex vertex, a face with an antenna, a
// face with a hole. Every refusal writes nothing (the content print unchanged). The contact decision reads exact
// orient2d on lattice points: the ± 1 lattice-unit grazing fixtures are its witnesses (§13.1's geometry classes).
import { describe, expect, it } from 'vitest';
import { faceWalk, type FaceId, type HalfEdgeId, type Plat } from '../../src/arena/index.js';
import { splitFace } from '../../src/faces/index.js';
import { insertChain } from '../../src/insert/index.js';
import type { Level } from '../../src/types/index.js';
import { attempt, commit, content, faceArea2Big, faceAt, halves, ownedHalves, pt, ringArea2, withHoles } from './support.js';

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
 * §13.1's tiling identity at the child level: the children's exact areas sum to the area of the parent's boundary at
 * that level — the children's half-edges whose twin bounds neither child (the cut's edges cancel) — and no half-edge
 * bounds both children.
 */
function tiles(p: Plat, a: FaceId, b: FaceId, level: Level = 1): bigint {
  const ra = faceWalk(p, level, a).flat();
  const rb = faceWalk(p, level, b).flat();
  const all = new Set<HalfEdgeId>([...ra, ...rb]);
  expect(ra.some((h) => rb.includes(h))).toBe(false);
  const boundary = [...all].filter((h) => !all.has(h ^ 1));
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  let s = 0n;
  for (const h of boundary) s += BigInt(X[O[h]]) * BigInt(Y[O[h ^ 1]]) - BigInt(X[O[h ^ 1]]) * BigInt(Y[O[h]]);
  expect(faceArea2Big(p, level, a) + faceArea2Big(p, level, b)).toBe(s);
  return s;
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
    const before = faceArea2Big(p, 1, f);
    const [l, r] = split(p, f, [[1000, 0], [1000, 2000]]);
    expect(faceAt(p, 1, 500, 500)).toBe(l);
    expect(faceAt(p, 1, 3000, 500)).toBe(r);
    expect(tiles(p, l, r)).toBe(before);
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
    const before = faceArea2Big(p, 1, f);
    const [l, r] = split(p, f, [[1000, 0], [2000, 1000], [3000, 0]]);
    expect(faceAt(p, 1, 2000, 1500)).toBe(l);
    expect(faceAt(p, 1, 2000, 300)).toBe(r);
    expect(tiles(p, l, r)).toBe(before);
    content(p);
  });

  it('a slanted cut whose ends split the boundary edges: the tiling identity at the child level', () => {
    const p = halves();
    const f = faceAt(p, 1, 500, 500);
    const [l, r] = split(p, f, [[1237, 0], [2911, 2000]]);
    tiles(p, l, r);
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
    const [l, r] = split(p, f, [[10, 1990], [2000, 0]]);
    tiles(p, l, r);
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
    const [l, r] = split(p, f, [[0, 1500], [1000, 1500]]);
    expect(l).not.toBe(r);
    tiles(p, l, r);
    expect(faceAt(p, 1, 500, 1800)).toBe(l);
    content(p);
  });

  it('a cut ending on the antenna\'s dead end splits the face', () => {
    const { p, f } = antenna();
    const [l, r] = split(p, f, [[0, 1000], [1000, 1000]]);
    tiles(p, l, r);
  });

  it('a cut crossing the antenna is refused', () => {
    const { p, f } = antenna();
    expect(refused(p, f, [[0, 1500], [4000, 1500]])).toBe('E_NOT_TWO_CROSSINGS');
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
    const [l, r] = split(p, f, [[1000, 0], [1000, 2000]]);
    expect(faceWalk(p, 1, r)).toHaveLength(2);
    expect(faceWalk(p, 1, l)).toHaveLength(1);
    expect(ringArea2(p, faceWalk(p, 1, r)[1])).toBeLessThan(0n);
    content(p);
  });
});
