// M0-a-11: the straight skeleton's known answers (§3.8; §17.1 (8): Aichholzer et al.'s definition — every edge moves
// inward at unit speed, each face is the region its edge sweeps) on shapes whose skeletons are known in closed form, the
// output's form (§3.4: nodes with offset times, arcs, the face of each input edge), the canonical start that makes it
// independent of the ring's first vertex and orientation (§3.8: ties by the index from the lowest-leftmost vertex), and
// "nothing stored" (§3.8 *Decision*): a pure function of its rings.
import { describe, expect, it } from 'vitest';
import { skeleton, validateSkeleton, type SkeletonGraph } from '../../src/skeleton/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { pt, regularNgon } from './support.js';

function graph(rings: LatticePoint[][]): SkeletonGraph {
  const r = skeleton(rings, 'roof');
  if (!r.ok) throw new Error(`refused: ${r.code}`);
  if (r.value.kind !== 'skeleton') throw new Error(`downgraded: ${JSON.stringify(r.value.cause)}`);
  return r.value;
}

/** The interior nodes as rounded [x, y, t] triples, sorted. */
function interior(g: SkeletonGraph, digits = 6): number[][] {
  let n = 0;
  for (const r of g.rings) n += r.length;
  const f = 10 ** digits;
  return g.nodes
    .slice(n)
    .map((q) => [Math.round(q.x * f) / f, Math.round(q.y * f) / f, Math.round(q.t * f) / f])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
}

/** The arcs as sorted pairs of node points, rounded. */
function arcSet(g: SkeletonGraph): string[] {
  const p = (i: number): string => `${Math.round(g.nodes[i].x * 1e6) / 1e6},${Math.round(g.nodes[i].y * 1e6) / 1e6}`;
  return g.arcs.map((e) => [p(e.a), p(e.b)].sort().join(' ')).sort();
}

describe('known answers', () => {
  it('a square: one apex at the centre at half the side, four hips', () => {
    const g = graph([[pt(0, 0), pt(1_000, 0), pt(1_000, 1_000), pt(0, 1_000)]]);
    expect(interior(g)).toEqual([[500, 500, 500]]);
    expect(g.arcs.length).toBe(4);
    expect(g.faces.map((f) => f.length)).toEqual([3, 3, 3, 3]);
  });

  it('a 20 × 10 m rectangle: the ridge from 5 m in at each end at time 5 m, five arcs', () => {
    const g = graph([[pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(0, 1_000)]]);
    expect(interior(g)).toEqual([
      [500, 500, 500],
      [1_500, 500, 500],
    ]);
    expect(g.arcs.length).toBe(5);
    expect(arcSet(g)).toContain('1500,500 500,500');
  });

  it('a right triangle: the incentre at the inradius', () => {
    const g = graph([[pt(0, 0), pt(1_000, 0), pt(0, 1_000)]]);
    const r = (2_000 - Math.SQRT2 * 1_000) / 2;
    const [[x, y, t]] = interior(g);
    expect(x).toBeCloseTo(r, 6);
    expect(y).toBeCloseTo(r, 6);
    expect(t).toBeCloseTo(r, 6);
    expect(g.arcs.length).toBe(3);
  });

  it('an L of 5 m arms: two ridges meeting at the corner, the reflex vertex reaching it with the outer corner', () => {
    const g = graph([[pt(0, 0), pt(2_000, 0), pt(2_000, 500), pt(500, 500), pt(500, 2_000), pt(0, 2_000)]]);
    expect(interior(g)).toEqual([
      [250, 250, 250],
      [250, 1_750, 250],
      [1_750, 250, 250],
    ]);
    expect(g.arcs.length).toBe(8);
    expect(arcSet(g)).toEqual(
      [
        '0,0 250,250',
        '500,500 250,250',
        '2000,0 1750,250',
        '1750,250 2000,500',
        '250,1750 500,2000',
        '0,2000 250,1750',
        '1750,250 250,250',
        '250,1750 250,250',
      ]
        .map((s) => s.split(' ').sort().join(' '))
        .sort(),
    );
  });

  it('a square band around a square hole: one cycle (h = 1), the medial square at half the band', () => {
    const g = graph([
      [pt(0, 0), pt(3_000, 0), pt(3_000, 3_000), pt(0, 3_000)],
      [pt(1_000, 1_000), pt(2_000, 1_000), pt(2_000, 2_000), pt(1_000, 2_000)],
    ]);
    expect(interior(g)).toEqual([
      [500, 500, 500],
      [500, 2_500, 500],
      [2_500, 500, 500],
      [2_500, 2_500, 500],
    ]);
    expect(g.arcs.length).toBe(12);
    // the hole is read clockwise and its faces lie outside it
    expect(g.rings[1].map((p) => [p.x, p.y])).toEqual([
      [1_000, 1_000],
      [1_000, 2_000],
      [2_000, 2_000],
      [2_000, 1_000],
    ]);
  });

  it('an exactly symmetric plus: the four reflex corners and the four arm ridges meet at the centre in one event', () => {
    const w = 250;
    const a = 2_000;
    const plus = [pt(-w, -a), pt(w, -a), pt(w, -w), pt(a, -w), pt(a, w), pt(w, w), pt(w, a), pt(-w, a), pt(-w, w), pt(-a, w), pt(-a, -w), pt(-w, -w)];
    const g = graph([plus]);
    expect(interior(g)).toEqual([
      [-1_750, 0, 250],
      [0, -1_750, 250],
      [0, 0, 250],
      [0, 1_750, 250],
      [1_750, 0, 250],
    ]);
    expect(g.arcs.length).toBe(16);
    const centre = g.nodes.findIndex((q) => q.x === 0 && q.y === 0);
    expect(g.arcs.filter((e) => e.a === centre || e.b === centre).length).toBe(8);
  });

  it('every node of every face at its offset time from the face edge’s line (the validator’s (3), re-derived here)', () => {
    const g = graph([regularNgon(9, 3_000, 0.2, 100, 200)]);
    for (let i = 0; i < g.faces.length; i += 1) {
      const a = g.nodes[g.faces[i][0]];
      const b = g.nodes[g.faces[i][1]];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      for (const v of g.faces[i].slice(2)) {
        const q = g.nodes[v];
        const h = ((b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x)) / len;
        expect(Math.abs(h - q.t)).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe('the output form (§3.4: nodes with offset times, arcs, the face of each input edge)', () => {
  it('nodes 0 … n − 1 are the cleaned rings’ vertices at time 0, faces start with their edge, every arc names two faces', () => {
    const g = graph([[pt(0, 0), pt(2_000, 0), pt(2_000, 500), pt(500, 500), pt(500, 2_000), pt(0, 2_000)]]);
    g.rings[0].forEach((p, i) => expect(g.nodes[i]).toEqual({ x: p.x, y: p.y, t: 0 }));
    g.faces.forEach((f, i) => {
      expect(f[0]).toBe(i);
      expect(f[1]).toBe((i + 1) % 6);
    });
    for (const e of g.arcs) expect(e.left).not.toBe(e.right);
    expect(validateSkeleton(g)).toEqual({ ok: true, faces: g.faces });
  });

  it('collinear vertices are merged and each merged edge names the caller’s vertex range', () => {
    const g = graph([[pt(0, 0), pt(500, 0), pt(1_000, 0), pt(2_000, 0), pt(2_000, 1_000), pt(0, 1_000), pt(0, 500)]]);
    expect(g.rings[0].length).toBe(4);
    expect(g.edges).toEqual([
      { ring: 0, from: 0, to: 3 },
      { ring: 0, from: 3, to: 4 },
      { ring: 0, from: 4, to: 5 },
      { ring: 0, from: 5, to: 0 },
    ]);
    expect(interior(g)).toEqual([
      [500, 500, 500],
      [1_500, 500, 500],
    ]);
  });
});

describe('canonical and pure', () => {
  const L = [pt(0, 0), pt(2_000, 0), pt(2_000, 500), pt(500, 500), pt(500, 2_000), pt(0, 2_000)];
  const holed = [
    [pt(-100, 0), pt(3_000, 40), pt(2_900, 3_100), pt(30, 2_950)],
    [pt(1_000, 1_000), pt(2_000, 1_100), pt(1_900, 1_900), pt(1_100, 2_050)],
  ];

  it('the same skeleton from every start vertex and either orientation (ties from the lowest-leftmost vertex)', () => {
    const base = graph([L]);
    for (let k = 0; k < L.length; k += 1) {
      const rot = [...L.slice(k), ...L.slice(0, k)];
      for (const ring of [rot, [...rot].reverse()]) {
        const g = graph([ring]);
        expect(g.nodes).toEqual(base.nodes);
        expect(g.arcs).toEqual(base.arcs);
        expect(g.faces).toEqual(base.faces);
      }
    }
    const hb = graph(holed);
    const hr = graph([[...holed[0]].reverse(), [...holed[1].slice(2), ...holed[1].slice(0, 2)]]);
    expect(hr.nodes).toEqual(hb.nodes);
    expect(hr.arcs).toEqual(hb.arcs);
  });

  it('nothing stored: the input is untouched and a second call returns an equal result', () => {
    const rings = holed.map((r) => r.map((p) => ({ ...p })));
    const before = JSON.stringify(rings);
    const a = skeleton(rings, 'spine');
    const b = skeleton(rings, 'spine');
    expect(JSON.stringify(rings)).toBe(before);
    expect(a).toEqual(b);
  });
});
