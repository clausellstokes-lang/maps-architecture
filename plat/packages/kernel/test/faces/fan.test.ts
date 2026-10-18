// M0-a-07: radialSplit and ringBand (§3.4): the sectors of a fan from an interior apex and from a boundary apex in
// counter-clockwise order, the band faces and the core of a ring band, each tiling its parent exactly; the refusals,
// and atomicity — a later cut refused after an earlier one wrote leaves the arena as it was.
import { describe, expect, it } from 'vitest';
import { type FaceId, type Plat } from '../../src/arena/index.js';
import { dmath } from '../../src/dmath/index.js';
import { radialSplit, ringBand, splitFace } from '../../src/faces/index.js';
import { insertChain } from '../../src/insert/index.js';
import { attempt, commit, content, faceArea2Big, faceAt, halves, pt, withHoles } from './support.js';

const DB = [{ role: 'district_bound', entity: 'd:1' }];
type P = readonly [number, number];
const pts = (xs: readonly P[]) => xs.map(([x, y]) => pt(x, y));

function areaSum(p: Plat, fs: readonly FaceId[]): bigint {
  let s = 0n;
  for (const f of fs) s += faceArea2Big(p, 1, f);
  return s;
}

function refusal(p: Plat, run: Parameters<typeof attempt>[2]): string {
  const before = content(p);
  const r = attempt(p, 1, run);
  expect(content(p)).toBe(before);
  return r.ok ? 'ok' : r.code;
}

/** A point at `cdeg` and distance d from (ax, ay), rounded. */
function polar(ax: number, ay: number, cdeg: number, d: number): [number, number] {
  const a = (cdeg * 3.141592653589793) / 18_000;
  return [Math.round(ax + d * dmath.cos(a)), Math.round(ay + d * dmath.sin(a))];
}

describe('radialSplit: a fan from an interior apex (§3.4)', () => {
  it('four rays: the sectors counter-clockwise from the smallest angle, tiling the face', () => {
    const p = halves();
    const f = faceAt(p, 1, 100, 100);
    const area = faceArea2Big(p, 1, f);
    const s = commit(p, 1, (o) => radialSplit(o, f, pt(2000, 1000), [0, 9000, 18_000, 27_000], { rows: DB })).value as FaceId[];
    expect(s).toHaveLength(4);
    expect(faceAt(p, 1, 3000, 1500)).toBe(s[0]);
    expect(faceAt(p, 1, 1000, 1500)).toBe(s[1]);
    expect(faceAt(p, 1, 1000, 500)).toBe(s[2]);
    expect(faceAt(p, 1, 3000, 500)).toBe(s[3]);
    expect(areaSum(p, s)).toBe(area);
    content(p);
  });

  it('rays in any order, repeated or a full turn apart, give the same fan', () => {
    const a = halves();
    const b = halves();
    commit(a, 1, (o) => radialSplit(o, faceAt(a, 1, 100, 100), pt(2000, 1000), [0, 12_000, 24_000], { rows: DB }));
    commit(b, 1, (o) => radialSplit(o, faceAt(b, 1, 100, 100), pt(2000, 1000), [24_000, 36_000, -24_000, 12_000, 0], { rows: DB }));
    expect(content(a)).toBe(content(b));
  });

  it('two rays: a bent cut through the apex', () => {
    const p = halves();
    const f = faceAt(p, 1, 100, 100);
    const s = commit(p, 1, (o) => radialSplit(o, f, pt(2000, 1000), [4500, 31_500], { rows: DB })).value as FaceId[];
    expect(s).toHaveLength(2);
    expect(faceAt(p, 1, 3500, 1000)).toBe(s[1]);
    expect(faceAt(p, 1, 500, 1000)).toBe(s[0]);
    content(p);
  });
});

describe('radialSplit: a fan from the boundary (§3.4)', () => {
  it('an apex on an edge: the sectors counter-clockwise from the edge leaving the apex', () => {
    const p = halves();
    const f = faceAt(p, 1, 100, 100);
    const area = faceArea2Big(p, 1, f);
    const s = commit(p, 1, (o) => radialSplit(o, f, pt(2000, 0), [9000, 4500, 13_500], { rows: DB })).value as FaceId[];
    expect(s).toHaveLength(4);
    for (const [i, a] of [2000, 6700, 11_200, 16_000].entries()) expect(faceAt(p, 1, ...polar(2000, 0, a, 800))).toBe(s[i]);
    expect(areaSum(p, s)).toBe(area);
    content(p);
  });

  it('an apex at a corner vertex', () => {
    const p = halves();
    const f = faceAt(p, 1, 100, 100);
    const s = commit(p, 1, (o) => radialSplit(o, f, pt(0, 0), [3000, 6000], { rows: DB })).value as FaceId[];
    expect(s).toHaveLength(3);
    for (const [i, a] of [1500, 4500, 7500].entries()) expect(faceAt(p, 1, ...polar(0, 0, a, 1000))).toBe(s[i]);
    content(p);
  });
});

describe('radialSplit: refusals, nothing written', () => {
  it('no ray: E_DEGENERATE; one ray from an interior apex, or an apex outside the face: E_NOT_TWO_CROSSINGS', () => {
    const p = halves();
    const f = faceAt(p, 1, 100, 100);
    expect(refusal(p, (o) => radialSplit(o, f, pt(2000, 1000), [], { rows: DB }))).toBe('E_DEGENERATE');
    expect(refusal(p, (o) => radialSplit(o, f, pt(2000, 1000), [9000], { rows: DB }))).toBe('E_NOT_TWO_CROSSINGS');
    expect(refusal(p, (o) => radialSplit(o, f, pt(2000, 3000), [0, 18_000], { rows: DB }))).toBe('E_NOT_TWO_CROSSINGS');
  });

  it('atomic: a ray 1° from another is refused after the first cuts wrote, and nothing is left', () => {
    const p = halves();
    const f = faceAt(p, 1, 100, 100);
    expect(refusal(p, (o) => radialSplit(o, f, pt(2000, 1000), [0, 9000, 18_000, 18_100], { rows: DB }))).toBe('E_NOT_TWO_CROSSINGS');
    expect(refusal(p, (o) => radialSplit(o, f, pt(2000, 0), [4500, 4600], { rows: DB }))).toBe('E_NOT_TWO_CROSSINGS');
  });

  it('two rays from an interior apex closer than minFaceAngle: refused, not thrown (B-FUZZ seed -1225756674)', () => {
    // The found case: a regular decagon (radius 754 about (2000, 1000), phase 76.79°), apex (1960.25, 1038.5), rays 2.11° apart.
    const p = halves();
    const deca = Array.from({ length: 10 }, (_, i) => polar(2000, 1000, 7679 + i * 3600, 754));
    commit(p, 1, (o) => insertChain(o, pts(deca), [{ role: 'district_bound', entity: 'star:1' }], 'mandatory', { closed: true }));
    const f = faceAt(p, 1, 2300, 1000);
    expect(refusal(p, (o) => radialSplit(o, f, pt(1960.25, 1038.5), [41_856, 42_067], { rows: DB }))).toBe('E_NOT_TWO_CROSSINGS');
    // In the plain lower half: 2° refused, 6° a fan of two sectors (the negative control).
    const q = halves();
    const g = faceAt(q, 1, 100, 100);
    expect(refusal(q, (o) => radialSplit(o, g, pt(2000, 1000), [9000, 9200], { rows: DB }))).toBe('E_NOT_TWO_CROSSINGS');
    expect(commit(q, 1, (o) => radialSplit(o, g, pt(2000, 1000), [9000, 9600], { rows: DB })).value).toHaveLength(2);
  });

  it('a ray into a hole from an interior apex: E_HOLE_CONTACT', () => {
    const p = withHoles([[[2500, 800], [3000, 800], [3000, 1200], [2500, 1200]]]);
    const f = faceAt(p, 1, 100, 100);
    expect(refusal(p, (o) => radialSplit(o, f, pt(2000, 1000), [0, 18_000], { rows: DB }))).toBe('E_HOLE_CONTACT');
  });

  it('an apex inside a hole lies outside the face (insideRegion reads the holes): E_NOT_TWO_CROSSINGS', () => {
    const p = withHoles([[[2500, 800], [3000, 800], [3000, 1200], [2500, 1200]]]);
    const f = faceAt(p, 1, 100, 100);
    expect(refusal(p, (o) => radialSplit(o, f, pt(2750, 1000), [0, 18_000], { rows: DB }))).toBe('E_NOT_TWO_CROSSINGS');
  });
});

describe('ringBand (§3.4): a band of one face per side and the core', () => {
  it('a rectangle: four band faces counter-clockwise from the lowest-leftmost corner, and the core, tiling it', () => {
    const p = halves();
    const f = faceAt(p, 1, 100, 100);
    const area = faceArea2Big(p, 1, f);
    const r = commit(p, 1, (o) => ringBand(o, f, 300, { rows: DB })).value as { band: FaceId[]; core: FaceId };
    expect(r.band).toHaveLength(4);
    expect(faceAt(p, 1, 2000, 150)).toBe(r.band[0]);
    expect(faceAt(p, 1, 3850, 1000)).toBe(r.band[1]);
    expect(faceAt(p, 1, 2000, 1850)).toBe(r.band[2]);
    expect(faceAt(p, 1, 150, 1000)).toBe(r.band[3]);
    expect(faceAt(p, 1, 2000, 1000)).toBe(r.core);
    expect(areaSum(p, [...r.band, r.core])).toBe(area);
    expect(faceArea2Big(p, 1, r.core)).toBe(2n * 3400n * 1400n);
    content(p);
  });

  it('a triangle', () => {
    const p = halves();
    const [tri] = commit(p, 1, (o) => splitFace(o, faceAt(p, 1, 100, 100), pts([[3000, 0], [0, 1500]]), { rows: DB })).value as [FaceId, FaceId];
    expect(faceAt(p, 1, 300, 300)).toBe(tri);
    const area = faceArea2Big(p, 1, tri);
    const r = commit(p, 1, (o) => ringBand(o, tri, 150, { rows: DB })).value as { band: FaceId[]; core: FaceId };
    expect(r.band).toHaveLength(3);
    expect(areaSum(p, [...r.band, r.core])).toBe(area);
    content(p);
  });

  it('refusals: a non-convex face or one with a hole (E_NON_CONVEX), a band within attractCm (E_BELOW_MIN_WIDTH), a collapsed core', () => {
    const p = halves();
    commit(p, 1, (o) => insertChain(o, pts([[2000, 0], [2000, 1000], [4000, 1000]]), [{ role: 'district_bound', entity: 'd:0' }], 'mandatory'));
    const ell = faceAt(p, 1, 500, 500);
    expect(refusal(p, (o) => ringBand(o, ell, 200, { rows: DB }))).toBe('E_NON_CONVEX');
    const q = halves();
    const f = faceAt(q, 1, 100, 100);
    expect(refusal(q, (o) => ringBand(o, f, 20, { rows: DB }))).toBe('E_BELOW_MIN_WIDTH');
    expect(refusal(q, (o) => ringBand(o, f, 1500, { rows: DB }))).toBe('E_DEGENERATE');
    const h = withHoles([[[1500, 500], [2500, 500], [2500, 1500], [1500, 1500]]]);
    expect(refusal(h, (o) => ringBand(o, faceAt(h, 1, 100, 100), 200, { rows: DB }))).toBe('E_NON_CONVEX');
  });
});
