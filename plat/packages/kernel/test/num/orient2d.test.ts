// M0-a-01: §13.1's property "the orient2d sign equal to a BigInt reference on adversarial triples" — 10⁶ random
// triples (uniform, near-collinear, extreme and small-box-far-out classes) and the gcd-stepped collinear class
// (p₀ + k · d / gcd(dx, dy)), with ± 1 lattice-unit offsets. orient2d is exact, so the whole determinant is compared,
// not only its sign; robust-predicates' orient2d (y axis down, so the opposite sign) is a second reference (C-0127 (1)).
import { orient2d as rpOrient2d } from 'robust-predicates';
import { describe, expect, it } from 'vitest';
import { orient, orient2d } from '../../src/num/index.js';
import { MAX, gcd, generator, intIn, orient2dBig, pt, signOf } from './support.js';

const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));

describe('orient2d (§3.2 (1), §13.1)', () => {
  it('equals the BigInt reference exactly on 10⁶ adversarial random triples', () => {
    const rnd = generator(0x0a01);
    const extremes = [MAX, -MAX, MAX - 1, -(MAX - 1), 0, 1, -1, 2 ** 22, -(2 ** 22)];
    const pick = () => extremes[intIn(rnd, 0, extremes.length - 1)];
    let mismatches = 0;
    let zeros = 0;
    const counts = [0, 0, 0, 0];
    for (let i = 0; i < 1_000_000; i += 1) {
      const cls = i & 3;
      counts[cls] += 1;
      let ax: number;
      let ay: number;
      let bx: number;
      let by: number;
      let cx: number;
      let cy: number;
      if (cls === 0) {
        // uniform over the whole range
        [ax, ay, bx, by, cx, cy] = [0, 0, 0, 0, 0, 0].map(() => intIn(rnd, -MAX, MAX));
      } else if (cls === 1) {
        // near-collinear: c on the line a b (extended), rounded, nudged by at most 2 cm
        [ax, ay, bx, by] = [0, 0, 0, 0].map(() => intIn(rnd, -MAX, MAX));
        const t = rnd() * 5 - 2;
        cx = clamp(Math.round(ax + t * (bx - ax)) + intIn(rnd, -2, 2));
        cy = clamp(Math.round(ay + t * (by - ay)) + intIn(rnd, -2, 2));
      } else if (cls === 2) {
        // extreme coordinates, mixed with random ones
        [ax, ay, bx, by, cx, cy] = [0, 0, 0, 0, 0, 0].map(() => (rnd() < 0.7 ? pick() : intIn(rnd, -MAX, MAX)));
      } else {
        // a small box far from the origin: large equal parts that cancel
        const ox = intIn(rnd, -MAX + 200, MAX - 200);
        const oy = intIn(rnd, -MAX + 200, MAX - 200);
        [ax, ay, bx, by, cx, cy] = [ox, oy, ox, oy, ox, oy].map((o) => o + intIn(rnd, -100, 100));
      }
      const got = orient2d(ax, ay, bx, by, cx, cy);
      const want = orient2dBig(ax, ay, bx, by, cx, cy);
      if (!Number.isInteger(got) || BigInt(got) !== want) mismatches += 1;
      if (signOf(rpOrient2d(ax, ay, bx, by, cx, cy)) !== -signOf(want)) mismatches += 1;
      if (want === 0n) zeros += 1;
    }
    expect(mismatches).toBe(0);
    expect(counts).toEqual([250_000, 250_000, 250_000, 250_000]);
    expect(zeros).toBeGreaterThan(1000); // the near-collinear and small-box classes do reach exact collinearity
  }, 120_000);

  it('is exactly 0 on the gcd-stepped collinear class and equals the reference one lattice unit off it', () => {
    const rnd = generator(0x0a02);
    let mismatches = 0;
    let ran = 0;
    for (let i = 0; i < 200_000; i += 1) {
      const ax = intIn(rnd, -MAX, MAX);
      const ay = intIn(rnd, -MAX, MAX);
      const span = [3, 1000, 2 ** 16, 2 ** 23][i & 3];
      let dx = intIn(rnd, -span, span);
      const dy = intIn(rnd, -span, span);
      if (dx === 0 && dy === 0) dx = 1;
      const g = gcd(dx, dy);
      const sx = dx / g;
      const sy = dy / g;
      // three distinct multiples of the primitive step that stay in range
      const kMax = Math.floor((2 * MAX) / Math.max(Math.abs(sx), Math.abs(sy)));
      const ks = [0, 0, 0].map(() => intIn(rnd, -kMax, kMax));
      const at = (k: number): [number, number] | null => {
        const x = ax + k * sx;
        const y = ay + k * sy;
        return Math.abs(x) <= MAX && Math.abs(y) <= MAX ? [x, y] : null;
      };
      const [p, q, r] = ks.map(at);
      if (p === null || q === null || r === null) continue;
      ran += 1;
      if (orient2d(p[0], p[1], q[0], q[1], r[0], r[1]) !== 0) mismatches += 1;
      for (const [ox, oy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const cx = r[0] + ox;
        const cy = r[1] + oy;
        if (Math.abs(cx) > MAX || Math.abs(cy) > MAX) continue;
        const got = orient2d(p[0], p[1], q[0], q[1], cx, cy);
        if (BigInt(got) !== orient2dBig(p[0], p[1], q[0], q[1], cx, cy)) mismatches += 1;
      }
    }
    expect(mismatches).toBe(0);
    expect(ran).toBeGreaterThan(15_000);
  }, 120_000);

  it('is positive counter-clockwise (+y north) and never returns −0', () => {
    expect(orient2d(0, 0, 10, 0, 0, 10)).toBe(100);
    expect(orient2d(0, 0, 0, 10, 10, 0)).toBe(-100);
    expect(Object.is(orient2d(0, 0, 0, 5, 0, -1), 0)).toBe(true);
    expect(orient(pt(0, 0), pt(10, 0), pt(0, 10))).toBe(1);
    expect(orient(pt(0, 0), pt(0, 10), pt(10, 0))).toBe(-1);
    expect(orient(pt(0, 0), pt(5, 5), pt(-MAX, -MAX))).toBe(0);
  });
});
