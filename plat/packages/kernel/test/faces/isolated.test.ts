// M0-a-07, integration g8 B-1 (C-0214): a point inside the face on none of its rings — an isolated vertex-role point,
// the kind mergeFaces, absorbSliver and claimSubFace leave when they remove a chain with knots — is a degenerate antenna
// to the contact decision (§3.6 (2), (3)): a cut passing through it or within attractCm of it is E_NOT_TWO_CROSSINGS,
// decided before any write (the detail names the point), where the insertion would have bent the cut through it and
// thrown 'a judged cut is inserted unbent'. The fixtures are the integration check's probe P6 (`p6-isolated.mts`,
// `p6b.mts`): a cut through the point and 10 / 20 / 40 cm from it, connectHole's slit, ringBand's corner cut and core
// ring, radialSplit's first and later rays. Every refusal writes nothing; every negative control commits with the point
// still isolated.
import { describe, expect, it } from 'vitest';
import { faceWalk, type FaceId, type Plat } from '../../src/arena/index.js';
import { connectHole, radialSplit, ringBand, splitFace } from '../../src/faces/index.js';
import { insertChain } from '../../src/insert/index.js';
import type { KernelResult } from '../../src/num/index.js';
import type { Overlay } from '../../src/tx/index.js';
import { attempt, commit, content, faceArea2Big, faceAt, framed, isolate, isolatedAt, pt } from './support.js';

const DB = [{ role: 'district_bound', entity: 'd:9' }];
const ON_NO_RING = /inside the face on none of its rings/;

/** P6's arena: the frame, one closed L1 ring (`p6-isolated.mts`), and an isolated `entrance` point at (px, py). */
function p6(px: number, py: number): { p: Plat; f: FaceId } {
  const p = framed();
  const ring = [[1058, 701], [1581, 729], [2418, 733], [2813, 1134], [2825, 1713], [1053, 1707]] as const;
  commit(p, 1, (o) => insertChain(o, ring.map(([x, y]) => pt(x, y)), [{ role: 'district_bound', entity: 'r:1' }], 'mandatory', { closed: true }));
  expect(isolate(p, px, py)).toBe(true);
  return { p, f: faceAt(p, 1, 2300, 1000) };
}

/** P6b's arena: the frame, the closed square [1000, 3000] × [500, 1800], optionally a hole, and isolated points. */
function square(points: readonly (readonly [number, number])[], hole?: readonly (readonly [number, number])[]): { p: Plat; f: FaceId } {
  const p = framed();
  const sq = [[1000, 500], [3000, 500], [3000, 1800], [1000, 1800]] as const;
  commit(p, 1, (o) => insertChain(o, sq.map(([x, y]) => pt(x, y)), [{ role: 'district_bound', entity: 'r:1' }], 'mandatory', { closed: true }));
  if (hole !== undefined) commit(p, 1, (o) => insertChain(o, hole.map(([x, y]) => pt(x, y)), [{ role: 'district_bound', entity: 'h:1' }], 'mandatory', { closed: true }));
  points.forEach(([x, y], i) => expect(isolate(p, x, y, `iso:${i + 1}`)).toBe(true));
  return { p, f: faceAt(p, 1, 1100, 600) };
}

/** The op's refusal (code and detail), asserting it wrote nothing; 'ok' where it committed. */
function refusal(p: Plat, op: (o: Overlay) => KernelResult<unknown>): { code: string; detail: string } {
  const before = content(p);
  const r = attempt(p, 1, op);
  if (r.ok) return { code: 'ok', detail: '' };
  expect(content(p)).toBe(before);
  return { code: r.code, detail: r.detail };
}

const CUT = [pt(1055, 1329), pt(2817, 1329)];

describe('splitFace: a cut near an isolated point inside the face (P6)', () => {
  for (const [name, dy] of [['through the point', 0], ['10 cm from it', 10], ['20 cm from it', 20]] as const) {
    it(`a cut ${name}: E_NOT_TWO_CROSSINGS before any write, the point named`, () => {
      const { p, f } = p6(1598, 1329 + dy);
      const r = refusal(p, (o) => splitFace(o, f, CUT, { rows: DB }));
      expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
      expect(r.detail).toMatch(ON_NO_RING);
      expect(r.detail).toContain(`(1598, ${1329 + dy})`);
    });
  }

  it('a cut 26 cm from it (attractCm, inclusive) is refused; 27 cm is not', () => {
    const a = p6(1598, 1355);
    expect(refusal(a.p, (o) => splitFace(o, a.f, CUT, { rows: DB })).code).toBe('E_NOT_TWO_CROSSINGS');
    const { p, f } = p6(1598, 1356);
    const c = commit(p, 1, (o) => splitFace(o, f, CUT, { rows: DB }));
    expect(c.value).toHaveLength(2);
  });

  it('a cut 40 cm from it splits the face; the children tile it and the point stays isolated, in the child above', () => {
    const { p, f } = p6(1598, 1369);
    const [l, r] = commit(p, 1, (o) => splitFace(o, f, CUT, { rows: DB })).value as [FaceId, FaceId];
    // §13.1's tiling at the child level: the children's areas sum to the area of their joint boundary (the cut cancels;
    // the landings' splits move the slanted ring edges by their hot pixel, so the parent's own area is not the measure).
    const all = new Set([...faceWalk(p, 1, l).flat(), ...faceWalk(p, 1, r).flat()]);
    const X = p.vertices.x;
    const Y = p.vertices.y;
    const O = p.halfEdges.origin;
    let s = 0n;
    for (const h of all) if (!all.has(h ^ 1)) s += BigInt(X[O[h]]) * BigInt(Y[O[h ^ 1]]) - BigInt(X[O[h ^ 1]]) * BigInt(Y[O[h]]);
    expect(faceArea2Big(p, 1, l) + faceArea2Big(p, 1, r)).toBe(s);
    expect(isolatedAt(p, 1598, 1369)).toBeGreaterThanOrEqual(0);
    expect(faceAt(p, 1, 1598, 1369)).toBe(l);
    content(p);
  });

  it('a cut ending on the point splits nothing: E_NOT_TWO_CROSSINGS (the landing names the point)', () => {
    const { p, f } = square([[2000, 1100]]);
    const r = refusal(p, (o) => splitFace(o, f, [pt(1000, 1100), pt(2005, 1102)], { rows: DB }));
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(r.detail).toMatch(/splits nothing/);
  });

  it('a bent cut whose corner lies 10 cm from the point, beyond both its segments (no segment passes it)', () => {
    // The corner (2000, 1100); the point above it, its foot beyond the end of both segments: step 2 would draw the
    // corner onto it, so the closed-segment reading refuses it.
    const { p, f } = square([[2000, 1110]]);
    const r = refusal(p, (o) => splitFace(o, f, [pt(1500, 500), pt(2000, 1100), pt(2500, 500)], { rows: DB }));
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(r.detail).toMatch(ON_NO_RING);
  });

  it('P6b: a straight cut over the point 2 cm off it, and the control with no point', () => {
    const { p, f } = square([[2000, 1102]]);
    const r = refusal(p, (o) => splitFace(o, f, [pt(1000, 1100), pt(3000, 1100)], { rows: DB }));
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(r.detail).toMatch(ON_NO_RING);
    const q = square([]);
    expect(commit(q.p, 1, (o) => splitFace(o, q.f, [pt(1000, 1100), pt(3000, 1100)], { rows: DB })).value).toHaveLength(2);
  });
});

describe('connectHole: a slit near an isolated point (P6b)', () => {
  const HOLE = [[1800, 1000], [2200, 1000], [2200, 1200], [1800, 1200]] as const;
  const SLIT = [pt(1000, 1100), pt(1800, 1100)];

  it('the point on the slit: E_NOT_TWO_CROSSINGS, nothing written', () => {
    const { p, f } = square([[1300, 1100]], HOLE);
    const r = refusal(p, (o) => connectHole(o, f, SLIT, { rows: DB }));
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(r.detail).toMatch(ON_NO_RING);
  });

  it('the point 40 cm off the slit: one face, one hole fewer, the point isolated', () => {
    const { p, f } = square([[1300, 1140]], HOLE);
    expect(faceWalk(p, 1, f)).toHaveLength(2);
    const g = commit(p, 1, (o) => connectHole(o, f, SLIT, { rows: DB })).value as FaceId;
    expect(faceWalk(p, 1, g)).toHaveLength(1);
    expect(isolatedAt(p, 1300, 1140)).toBeGreaterThanOrEqual(0);
    content(p);
  });
});

describe('ringBand: a corner cut or the core ring near an isolated point (P6b)', () => {
  it('the point 3 cm from a corner cut: E_NOT_TWO_CROSSINGS, the op\'s savepoint put back', () => {
    const { p, f } = square([[1102, 598]]);
    const r = refusal(p, (o) => ringBand(o, f, 200, { rows: DB }));
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(r.detail).toMatch(ON_NO_RING);
  });

  it('the point 5 cm from a side of the core: E_DEGENERATE collapsed, before any write', () => {
    const { p, f } = square([[1205, 1000]]);
    const r = refusal(p, (o) => ringBand(o, f, 200, { rows: DB }));
    expect(r).toEqual({ code: 'E_DEGENERATE', detail: 'collapsed' });
  });

  it('the point well inside the core: the band commits and the point stays isolated, inside the core', () => {
    const { p, f } = square([[2000, 1100]]);
    const b = commit(p, 1, (o) => ringBand(o, f, 200, { rows: DB })).value as { band: FaceId[]; core: FaceId };
    expect(b.band).toHaveLength(4);
    expect(isolatedAt(p, 2000, 1100)).toBeGreaterThanOrEqual(0);
    expect(faceAt(p, 1, 2000, 1100)).toBe(b.core);
    content(p);
  });
});

describe('radialSplit: a ray near an isolated point (P5, P6b)', () => {
  it('P5 case 1257\'s rays on P6\'s arena: E_NOT_TWO_CROSSINGS, nothing written', () => {
    const { p, f } = p6(1598, 1329);
    const r = refusal(p, (o) => radialSplit(o, f, pt(2000, 1000), [-29849, -21936, 46801, 28370], { rows: DB }));
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(r.detail).toMatch(ON_NO_RING);
  });

  it('the first cut: the point on its first segment (ray 270°) and on its second (ray 90°, 3 cm off)', () => {
    for (const q of [[2000, 800], [2003, 1403]] as const) {
      const { p, f } = square([q]);
      const r = refusal(p, (o) => radialSplit(o, f, pt(2000, 1100), [9000, 27000], { rows: DB }));
      expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
      expect(r.detail).toMatch(ON_NO_RING);
    }
  });

  it('a later ray: the third ray passes the point after the first cut wrote — refused, the op\'s savepoint put back', () => {
    const { p, f } = square([[2000, 800]]);
    const r = refusal(p, (o) => radialSplit(o, f, pt(2000, 1100), [0, 9000, 27000], { rows: DB }));
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(r.detail).toMatch(ON_NO_RING);
  });

  it('the control: the point clear of every ray, three sectors, the point isolated', () => {
    const { p, f } = square([[2400, 800]]);
    const s = commit(p, 1, (o) => radialSplit(o, f, pt(2000, 1100), [0, 9000, 27000], { rows: DB })).value as FaceId[];
    expect(s).toHaveLength(3);
    expect(isolatedAt(p, 2400, 800)).toBeGreaterThanOrEqual(0);
    content(p);
  });
});
