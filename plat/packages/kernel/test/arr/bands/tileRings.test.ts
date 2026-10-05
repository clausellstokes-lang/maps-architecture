// M0-a-09: tileRings — the seed clip (§3.4 *Transient arenas*; §13.1's fixtures: "tileRings on a ring the earlier rings
// cover (no piece), on one they cut in two (two pieces, each simple and counter-clockwise) and on an earlier ring wholly
// inside a later one (refused, E_DEGENERATE, detail overlap, naming a vertex of the hole)"; the rotated T's two wings
// clipped to tile — every crossing vertex a vertex of both rings, the joint shared vertex for vertex). Expected areas
// come from a coordinate-compressed grid of the rectangles, written here (never the code under test).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { dmath } from '../../../src/dmath/index.js';
import { snap } from '../../../src/num/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { tileRings, type TileOverlap } from '../../../src/arr/tileRings.js';
import { area2, area2Of, P, simpleRing, TIMEOUT } from './support.js';

/** An axis-aligned rectangle, counter-clockwise. */
function rect(x0: number, y0: number, x1: number, y1: number): LatticePoint[] {
  return [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
}

const key = (q: LatticePoint): string => `${String(q.x)},${String(q.y)}`;

describe('tileRings (§3.4 the seed clip)', () => {
  it('no rings → []', () => {
    const r = tileRings([]);
    expect(r).toEqual({ ok: true, value: [], warnings: [] });
  });

  it('a ring the earlier rings cover has no piece', () => {
    const r = tileRings([rect(0, 0, 3000, 2000), rect(500, 0, 1500, 2000), rect(800, 600, 1200, 900)]);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.map((ps) => ps.length)).toEqual([1, 0, 0]);
    expect(area2Of(r.value[0])).toBe(area2(rect(0, 0, 3000, 2000)));
  });

  it('a ring the earlier rings cut in two has two pieces, each simple and counter-clockwise; the joints share their vertices', () => {
    const cutter = rect(1000, -400, 1600, 2400);
    const cut = rect(0, 0, 3000, 2000);
    const r = tileRings([cutter, cut]);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const [c, pieces] = r.value;
    expect(pieces.length).toBe(2);
    for (const q of pieces) {
      expect(area2(q) > 0n).toBe(true);
      expect(simpleRing(q)).toBe(true);
    }
    expect(pieces.map((q) => area2(q))).toEqual([2n * 1000n * 2000n, 2n * 1400n * 2000n]);
    // the earlier ring carries each crossing vertex the overlay placed on its sides
    const cv = new Set(c[0].map(key));
    for (const x of ['1000,0', '1600,0', '1000,2000', '1600,2000']) expect(cv.has(x)).toBe(true);
    expect(area2Of(c)).toBe(area2(cutter));
    for (const q of pieces) for (const v of q) if (v.x === 1000 || v.x === 1600) expect(cv.has(key(v))).toBe(true);
  });

  it('a later ring meeting an earlier one’s side at a vertex or along a stretch: the contact points are vertices of both pieces', () => {
    const base = rect(0, 0, 2000, 1000);
    const diamond = [P(1000, 1000), P(1500, 1500), P(1000, 2000), P(500, 1500)];
    const box = rect(1700, 1000, 2600, 1600);
    const r = tileRings([base, diamond, box]);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const [b, d, x] = r.value.map((ps) => new Set(ps.flat().map(key)));
    // the diamond's tip on the base's top side, and the box's corner on it: vertices of the base's piece too
    for (const q of ['1000,1000', '1700,1000']) expect(b.has(q)).toBe(true);
    expect(d.has('1000,1000')).toBe(true);
    expect(x.has('1700,1000') && x.has('2000,1000')).toBe(true);
    expect(b.has('2000,1000')).toBe(true);
    expect(r.value.map((ps) => area2Of(ps))).toEqual([area2(base), area2(diamond), area2(box)]);
  });

  it('an earlier ring wholly inside a later one: E_DEGENERATE overlap, naming the later ring and a vertex of the hole', () => {
    const r = tileRings([rect(1000, 700, 1400, 1100), rect(0, 0, 3000, 2000)]);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_DEGENERATE');
    expect(r.detail).toBe('overlap');
    const o = r as TileOverlap;
    expect(o.ring).toBe(1);
    expect(o.at).toEqual(P(1000, 700));
    // touching the later ring's side, it is no hole: a notch
    const ok = tileRings([rect(1000, 0, 1400, 1100), rect(0, 0, 3000, 2000)]);
    expect(ok.ok).toBe(true);
    if (ok.ok) expect(ok.value[1].length).toBe(1);
  });

  it('a rotated T: the bar, then the stem crossing its lower side — every crossing vertex a vertex of both pieces', () => {
    for (const deg of [0, 17, 33.3, 61, 90, 135.7, 222]) {
      const t = (deg * 3.141592653589793) / 180;
      const turn = (x: number, y: number): LatticePoint => {
        const s = snap(x * dmath.cos(t) - y * dmath.sin(t) + 50_000, x * dmath.sin(t) + y * dmath.cos(t) + 50_000);
        if (!s.ok) throw new Error('range');
        return s.value;
      };
      const bar = [turn(0, 0), turn(6000, 0), turn(6000, 1200), turn(0, 1200)];
      const stem = [turn(2000, -5000), turn(3500, -5000), turn(3500, 800), turn(2000, 800)];
      const r = tileRings([bar, stem]);
      expect(r.ok).toBe(true);
      if (!r.ok) continue;
      const [b, s] = r.value;
      expect([b.length, s.length]).toEqual([1, 1]);
      expect(simpleRing(b[0]) && simpleRing(s[0])).toBe(true);
      const bv = new Set(b[0].map(key));
      const sv = new Set(s[0].map(key));
      // the stem's piece ends on the bar's lower side: its two vertices there are vertices of the bar's piece too
      const shared = [...sv].filter((x) => bv.has(x));
      expect(shared.length).toBe(2);
      // the pieces tile: no overlap, their areas sum to the union's (bar + the stem below the bar's lower side)
      const lower = Number(area2(s[0])) / 2;
      expect(Math.abs(lower - 1500 * 5000)).toBeLessThanOrEqual(6000 * 2);
      expect(Math.abs(Number(area2(b[0])) / 2 - 6000 * 1200)).toBeLessThanOrEqual(15000 * 2);
    }
  });

  it('random rectangles: each ring’s pieces are it less every earlier ring, exactly; the pieces never overlap', { timeout: TIMEOUT }, () => {
    const box = fc.tuple(fc.integer({ min: 0, max: 20 }), fc.integer({ min: 0, max: 20 }), fc.integer({ min: 1, max: 12 }), fc.integer({ min: 1, max: 12 }));
    fc.assert(
      fc.property(fc.array(box, { minLength: 1, maxLength: 5 }), (boxes) => {
        const rs = boxes.map(([x, y, w, h]) => [x * 100, y * 100, (x + w) * 100, (y + h) * 100] as const);
        const r = tileRings(rs.map(([a, b, c, d]) => rect(a, b, c, d)));
        const grid = compress(rs);
        if (!r.ok) {
          expect(r.code).toBe('E_DEGENERATE');
          const o = r as TileOverlap;
          expect(o.detail).toBe('overlap');
          // the named vertex is a corner of an earlier ring strictly inside the later one
          const [a, b, c, d] = rs[o.ring];
          expect(o.at.x > a && o.at.x < c && o.at.y > b && o.at.y < d).toBe(true);
          expect(rs.slice(0, o.ring).some(([e, f, g, h]) => (o.at.x === e || o.at.x === g) && (o.at.y === f || o.at.y === h))).toBe(true);
          return;
        }
        let union = 0n;
        r.value.forEach((pieces, i) => {
          for (const q of pieces) {
            expect(area2(q) > 0n).toBe(true);
            expect(simpleRing(q)).toBe(true);
          }
          const got = area2Of(pieces);
          expect(got).toBe(2n * grid.minus(i));
          union += got;
        });
        expect(union).toBe(2n * grid.union());
      }),
      { numRuns: 400 },
    );
  });
});

/** The rectangles' cells on their compressed coordinates: ring i less every earlier ring, and the union, exactly. */
function compress(rs: readonly (readonly [number, number, number, number])[]): { minus: (i: number) => bigint; union: () => bigint } {
  const xs = [...new Set(rs.flatMap(([a, , c]) => [a, c]))].sort((a, b) => a - b);
  const ys = [...new Set(rs.flatMap(([, b, , d]) => [b, d]))].sort((a, b) => a - b);
  const inside = (k: number, x: number, y: number): boolean => x >= rs[k][0] && x < rs[k][2] && y >= rs[k][1] && y < rs[k][3];
  const cells = (want: (x: number, y: number) => boolean): bigint => {
    let s = 0n;
    for (let i = 0; i + 1 < xs.length; i += 1) {
      for (let j = 0; j + 1 < ys.length; j += 1) if (want(xs[i], ys[j])) s += BigInt(xs[i + 1] - xs[i]) * BigInt(ys[j + 1] - ys[j]);
    }
    return s;
  };
  return {
    minus: (i) => cells((x, y) => inside(i, x, y) && !rs.slice(0, i).some((_, k) => inside(k, x, y))),
    union: () => cells((x, y) => rs.some((_, k) => inside(k, x, y))),
  };
}
