// M0-a-10: the curves — §3.1 and the item's tests: "Chaikin×2 on a closed and an open polyline; Catmull–Rom through
// control points; Laplacian with pinned ends unmoved; a fillet skipped when a leg is shorter than the chord" — plus each
// operation's own contract (pure point lists; the fillet's arc tangent to both legs, its radius from the legs).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { catmullRom, chaikin, fillet, laplacianPinned, sampleCubics } from '../../src/geom/index.js';
import { TIMEOUT, area2D, type XY } from './support.js';

const close = (a: XY, b: XY, eps = 1e-9): boolean => Math.hypot(a.x - b.x, a.y - b.y) <= eps;

describe('chaikin (§3.1)', () => {
  it('Chaikin×2 on a closed square: 16 points at the quarter rules, inside the square, area shrinking', () => {
    const sq: XY[] = [{ x: 0, y: 0 }, { x: 1600, y: 0 }, { x: 1600, y: 1600 }, { x: 0, y: 1600 }];
    const one = chaikin(sq, { closed: true });
    expect(one).toEqual([
      { x: 400, y: 0 }, { x: 1200, y: 0 }, { x: 1600, y: 400 }, { x: 1600, y: 1200 },
      { x: 1200, y: 1600 }, { x: 400, y: 1600 }, { x: 0, y: 1200 }, { x: 0, y: 400 },
    ]);
    const two = chaikin(sq, { closed: true, iterations: 2 });
    expect(two).toHaveLength(16);
    expect(two).toEqual(chaikin(one, { closed: true }));
    for (const p of two) expect(p.x >= 0 && p.x <= 1600 && p.y >= 0 && p.y <= 1600).toBe(true);
    expect(area2D(two)).toBeLessThan(area2D(one));
    expect(area2D(one)).toBeLessThan(area2D(sq));
  });

  it('Chaikin×2 on an open polyline keeps both ends exactly and cuts every interior corner', () => {
    const line: XY[] = [{ x: 0, y: 0 }, { x: 1000, y: 0 }, { x: 1000, y: 1000 }, { x: 2000, y: 1000 }];
    const two = chaikin(line, { closed: false, iterations: 2 });
    expect(two[0]).toEqual(line[0]);
    expect(two[two.length - 1]).toEqual(line[3]);
    expect(two.some((p) => close(p, line[1]) || close(p, line[2]))).toBe(false); // the corners are cut
    expect(chaikin([{ x: 1, y: 2 }, { x: 3, y: 4 }], { closed: false, iterations: 2 })).toEqual([{ x: 1, y: 2 }, { x: 3, y: 4 }]);
    expect(() => chaikin(line, { closed: false, iterations: -1 })).toThrow(RangeError);
  });
});

describe('catmullRom (§3.1: centripetal Catmull–Rom → cubic)', () => {
  it('passes through every control point, open and closed, with continuous tangents at the joints', () => {
    fc.assert(
      fc.property(fc.array(fc.tuple(fc.integer({ min: -1e6, max: 1e6 }), fc.integer({ min: -1e6, max: 1e6 })), { minLength: 3, maxLength: 12 }), fc.boolean(), (raw, closed) => {
        const pts = raw.map(([x, y]) => ({ x, y })).filter((p, i, a) => i === 0 || !close(p, a[i - 1], 1));
        if (pts.length < 3 || (closed && close(pts[0], pts[pts.length - 1], 1))) return;
        const cubics = catmullRom(pts, { closed });
        expect(cubics).toHaveLength(closed ? pts.length : pts.length - 1);
        cubics.forEach((c, i) => {
          expect(c.p0).toEqual(pts[i]);
          expect(c.p1).toEqual(pts[(i + 1) % pts.length]);
        });
        // C¹ at each interior joint: c2 of span i, the joint and c1 of span i + 1 are collinear, the joint between them
        for (let i = 0; i + 1 < cubics.length; i += 1) {
          const a = cubics[i].c2;
          const j = cubics[i].p1;
          const b = cubics[i + 1].c1;
          const cr = (j.x - a.x) * (b.y - j.y) - (j.y - a.y) * (b.x - j.x);
          const scale = Math.hypot(j.x - a.x, j.y - a.y) * Math.hypot(b.x - j.x, b.y - j.y);
          expect(Math.abs(cr)).toBeLessThanOrEqual(1e-6 * scale + 1e-6);
          expect((j.x - a.x) * (b.x - j.x) + (j.y - a.y) * (b.y - j.y)).toBeGreaterThanOrEqual(-1e-6 * scale);
        }
        const samples = sampleCubics(cubics, 8);
        for (const p of pts) expect(samples.some((q) => q.x === p.x && q.y === p.y)).toBe(true);
      }),
      { numRuns: 500 },
    );
  }, TIMEOUT);

  it('merges points closer than 1 cm, gives straight end spans and no span for too few points', () => {
    const c = catmullRom([{ x: 0, y: 0 }, { x: 0.4, y: 0 }, { x: 900, y: 0 }], { closed: false });
    expect(c).toHaveLength(1);
    expect(c[0].c1).toEqual({ x: 300, y: 0 });
    expect(c[0].c2).toEqual({ x: 600, y: 0 });
    expect(catmullRom([{ x: 0, y: 0 }], { closed: false })).toEqual([]);
    expect(catmullRom([{ x: 0, y: 0 }, { x: 10, y: 0 }], { closed: true })).toEqual([]);
    expect(() => sampleCubics(c, 0)).toThrow(RangeError);
  });
});

describe('laplacianPinned (§3.1)', () => {
  it('leaves pinned vertices and an open polyline\'s ends unmoved, bit for bit, and smooths the rest', () => {
    const zig: XY[] = Array.from({ length: 11 }, (_, i) => ({ x: i * 100, y: i % 2 === 0 ? 0 : 80 }));
    const out = laplacianPinned(zig, { closed: false, pinned: [5], iterations: 4 });
    expect(out[0]).toEqual(zig[0]);
    expect(out[10]).toEqual(zig[10]);
    expect(out[5]).toEqual(zig[5]);
    const amp = (ps: XY[]): number => Math.max(...ps.slice(1, -1).map((p, i) => Math.abs(p.y - (ps[i].y + ps[i + 2].y) / 2)));
    expect(amp(out)).toBeLessThan(amp(zig));
    const ring = laplacianPinned(zig, { closed: true, iterations: 2 });
    expect(ring[0]).not.toEqual(zig[0]); // a closed ring has no ends
    expect(laplacianPinned(zig, { closed: true, pinned: [0, 3], iterations: 3 })[3]).toEqual(zig[3]);
    expect(() => laplacianPinned(zig, { closed: false, lambda: 0 })).toThrow(RangeError);
  });
});

describe('fillet (§3.1, §4.6 step 6)', () => {
  it('rounds a corner with an arc tangent to both legs, spanning the shorter leg, sampled in equal chords ≥ the chord', () => {
    const a = { x: 0, y: 0 };
    const k = { x: 3000, y: 0 };
    const b = { x: 3000, y: 5000 };
    const f = fillet(a, k, b, { chordCm: 200 });
    expect(f.filleted).toBe(true);
    // the shorter leg (a–k, 30 m) is spanned entirely: the arc starts at a; along k–b it ends 30 m from k
    expect(f.points[0]).toEqual(a);
    expect(f.points[f.points.length - 1]).toEqual(b);
    const arc = f.points.slice(0, -1); // a … tb
    expect(close(arc[arc.length - 1], { x: 3000, y: 3000 }, 1e-6)).toBe(true);
    // centre (0, 3000), radius 3000: the 90° corner's r = t · tan(45°) = t
    for (const p of arc) expect(Math.abs(Math.hypot(p.x - 0, p.y - 3000) - 3000)).toBeLessThan(1e-6);
    const chords = arc.slice(1).map((p, i) => Math.hypot(p.x - arc[i].x, p.y - arc[i].y));
    for (const c of chords) {
      expect(c).toBeGreaterThanOrEqual(200 * (2 / Math.PI) * 0.99); // the arc length per chord ≥ 200; the chord ≥ that × its sinc
      expect(Math.abs(c - chords[0])).toBeLessThan(1e-6);
    }
    expect(arc.length).toBeGreaterThanOrEqual(3);
  });

  it('is skipped when a leg is shorter than the chord, the legs are collinear, or the arc would hold under three points', () => {
    const sharp = (a: XY, k: XY, b: XY) => ({ points: [a, k, b], filleted: false });
    const a = { x: 0, y: 0 };
    const k = { x: 150, y: 0 };
    const b = { x: 150, y: 5000 };
    expect(fillet(a, k, b, { chordCm: 200 })).toEqual(sharp(a, k, b)); // leg a–k (150) shorter than the chord
    expect(fillet({ x: 0, y: 0 }, { x: 1000, y: 0 }, { x: 2000, y: 0 }, { chordCm: 100 })).toEqual(sharp({ x: 0, y: 0 }, { x: 1000, y: 0 }, { x: 2000, y: 0 }));
    // a deflection so slight that t·(1 + cos φ) falls below ratio()'s 1 cm floor: the legs read as collinear
    const s = fillet({ x: 0, y: 0 }, { x: 1000, y: 0 }, { x: 2000, y: 20 }, { chordCm: 100 });
    expect(s.filleted).toBe(false);
    // a right angle with 3 m legs and a 2.5 m chord: an arc of 4.7 m holds one chord, two points — sharp
    expect(fillet({ x: 0, y: 0 }, { x: 300, y: 0 }, { x: 300, y: 300 }, { chordCm: 250 }).filleted).toBe(false);
    expect(fillet({ x: 0, y: 0 }, { x: 300, y: 0 }, { x: 300, y: 300 }, { chordCm: 200 }).filleted).toBe(true); // two chords: three points
    // the lattice minimum edge floors the chord
    expect(fillet({ x: 0, y: 0 }, { x: 20, y: 0 }, { x: 20, y: 20 }, { chordCm: 1 }).filleted).toBe(false);
    // a tangent length beyond a leg
    expect(fillet({ x: 0, y: 0 }, { x: 1000, y: 0 }, { x: 1000, y: 1000 }, { chordCm: 100, tangentCm: 1200 }).filleted).toBe(false);
  });
});
