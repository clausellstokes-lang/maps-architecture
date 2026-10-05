// M0-a-07: connectHole (§3.6 (4)): a cut from the outer ring to a hole leaves the same face count and one hole fewer (the
// slit of §4.6); §13.1's classes — holes touching the outer ring at a vertex and along an edge, and holes touching each
// other — and the refusals (E_HOLE_CONTACT), each writing nothing.
import { describe, expect, it } from 'vitest';
import { faceWalk, type FaceId, type Plat } from '../../src/arena/index.js';
import { connectHole, splitFace } from '../../src/faces/index.js';
import { attempt, commit, content, faceAt, facesAt, pt, withHoles } from './support.js';

const DB = [{ role: 'district_bound', entity: 'd:1' }];
type P = readonly [number, number];
const pts = (xs: readonly P[]) => xs.map(([x, y]) => pt(x, y));
const sq = (x0: number, y0: number, x1: number, y1: number): P[] => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];

/** Connects and checks the post-condition: the same face, the same face count, one hole fewer. */
function connected(p: Plat, f: FaceId, cut: readonly P[]): FaceId {
  const faces = facesAt(p, 1).length;
  const holes = faceWalk(p, 1, f).length - 1;
  const g = commit(p, 1, (o) => connectHole(o, f, pts(cut), { rows: DB })).value as FaceId;
  expect(facesAt(p, 1)).toHaveLength(faces);
  expect(faceWalk(p, 1, g)).toHaveLength(holes);
  content(p);
  return g;
}

/** The refusal code, asserting the arena unchanged. */
function refusal(p: Plat, run: (o: Parameters<typeof connectHole>[0]) => { ok: boolean; code?: string }): string {
  const before = content(p);
  const r = attempt(p, 1, run as never);
  expect(content(p)).toBe(before);
  return r.ok ? 'ok' : r.code;
}

describe('connectHole: one hole fewer, the same face count (§3.6 (4))', () => {
  it('one of two separate holes', () => {
    const p = withHoles([sq(1500, 500, 2000, 1000), sq(2500, 500, 3000, 1000)]);
    const f = faceAt(p, 1, 500, 500);
    expect(faceWalk(p, 1, f)).toHaveLength(3);
    const g = connected(p, f, [[1000, 0], [1500, 500]]);
    expect(g).toBe(f);
    // The other hole can be connected next, through the slit face.
    connected(p, g, [[3500, 0], [3000, 500]]);
  });

  it('a bent slit (three vertices)', () => {
    const p = withHoles([sq(1500, 500, 2500, 1500)]);
    const f = faceAt(p, 1, 500, 500);
    connected(p, f, [[1000, 0], [1200, 800], [1500, 1000]]);
  });

  it('holes touching each other at a vertex are one hole ring: one slit removes it', () => {
    const p = withHoles([sq(1500, 500, 2000, 1000), sq(2000, 1000, 2500, 1500)]);
    const f = faceAt(p, 1, 500, 500);
    expect(faceWalk(p, 1, f)).toHaveLength(2);
    connected(p, f, [[1000, 0], [1500, 500]]);
  });

  it('holes touching each other along an edge are one hole ring: one slit removes it', () => {
    const p = withHoles([sq(1500, 500, 2000, 1000), sq(2000, 500, 2500, 1000)]);
    const f = faceAt(p, 1, 500, 500);
    expect(faceWalk(p, 1, f)).toHaveLength(2);
    connected(p, f, [[3000, 0], [2500, 500]]);
  });
});

describe('connectHole and splitFace on rings touching the outer ring (§13.1)', () => {
  it('a ring touching the outer ring at a vertex is no hole: connectHole refuses E_HOLE_CONTACT; splitFace cuts the face', () => {
    const p = withHoles([[[1500, 1500], [2500, 1500], [2000, 2000]]]);
    const f = faceAt(p, 1, 500, 500);
    expect(faceWalk(p, 1, f)).toHaveLength(1);
    expect(refusal(p, (o) => connectHole(o, f, pts([[1000, 0], [1500, 1500]]), { rows: DB }))).toBe('E_HOLE_CONTACT');
    const c = commit(p, 1, (o) => splitFace(o, f, pts([[1000, 0], [1500, 1500]]), { rows: DB }));
    expect((c.value as FaceId[]).length).toBe(2);
    content(p);
  });

  it('a ring touching the outer ring along an edge is no hole: connectHole refuses E_HOLE_CONTACT', () => {
    const p = withHoles([sq(1500, 1000, 2500, 2000)]);
    const f = faceAt(p, 1, 500, 500);
    expect(faceWalk(p, 1, f)).toHaveLength(1);
    expect(refusal(p, (o) => connectHole(o, f, pts([[1000, 0], [1500, 1000]]), { rows: DB }))).toBe('E_HOLE_CONTACT');
  });
});

describe('connectHole: refusals (E_HOLE_CONTACT), nothing written', () => {
  it('outer ring to outer ring, hole to hole, and a face with no hole', () => {
    const p = withHoles([sq(1500, 500, 2000, 1000), sq(2500, 500, 3000, 1000)]);
    const f = faceAt(p, 1, 500, 500);
    expect(refusal(p, (o) => connectHole(o, f, pts([[1000, 0], [1000, 2000]]), { rows: DB }))).toBe('E_HOLE_CONTACT');
    expect(refusal(p, (o) => connectHole(o, f, pts([[2000, 1000], [2500, 1000]]), { rows: DB }))).toBe('E_HOLE_CONTACT');
    expect(refusal(p, (o) => splitFace(o, f, pts([[2000, 1000], [2500, 1000]]), { rows: DB }))).toBe('E_HOLE_CONTACT');
    const hole = faceAt(p, 1, 1700, 700);
    expect(refusal(p, (o) => connectHole(o, hole, pts([[1500, 600], [2000, 600]]), { rows: DB }))).toBe('E_HOLE_CONTACT');
  });

  it('a slit with a bad contact is E_NOT_TWO_CROSSINGS', () => {
    const p = withHoles([sq(1500, 500, 2000, 1000)]);
    const f = faceAt(p, 1, 500, 500);
    // A cut ending inside the face, and one crossing the hole on its way to the far side.
    expect(refusal(p, (o) => connectHole(o, f, pts([[1000, 0], [1200, 300]]), { rows: DB }))).toBe('E_NOT_TWO_CROSSINGS');
    expect(refusal(p, (o) => connectHole(o, f, pts([[1000, 2000], [2500, 500]]), { rows: DB }))).toBe('E_NOT_TWO_CROSSINGS');
  });
});
