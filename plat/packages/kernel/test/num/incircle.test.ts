// M0-a-01: the incircle adapter over robust-predicates 3.0.3 (§3.1, J-K36) — its sign against the exact BigInt
// determinant on integer points, random and constructed cocircular, in the +y-north convention (C-0134 (5)).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { incircle } from '../../src/num/index.js';
import { MAX, coord, generator, incircleBig, intIn, signOf } from './support.js';

describe('incircle (§3.1)', () => {
  it('is 1 inside, −1 outside, 0 on the circle through a counter-clockwise triangle (+y north)', () => {
    // a = (0, 0), b = (10, 0), c = (0, 10): counter-clockwise; the circle's centre (5, 5)
    expect(incircle(0, 0, 10, 0, 0, 10, 1, 1)).toBe(1);
    expect(incircle(0, 0, 10, 0, 0, 10, 20, 20)).toBe(-1);
    expect(incircle(0, 0, 10, 0, 0, 10, 10, 10)).toBe(0);
    // clockwise a, b, c: the sign reverses
    expect(incircle(0, 0, 0, 10, 10, 0, 1, 1)).toBe(-1);
    expect(Object.is(incircle(0, 0, 10, 0, 0, 10, 10, 10), 0)).toBe(true);
  });

  it('is 0 on lattice points of one circle (Pythagorean radii), at the range\'s extremes too', () => {
    // the twelve lattice points of x² + y² = 25 scaled, about a far centre
    const rnd = generator(0x0a03);
    const base: [number, number][] = [
      [5, 0], [4, 3], [3, 4], [0, 5], [-3, 4], [-4, 3], [-5, 0], [-4, -3], [-3, -4], [0, -5], [3, -4], [4, -3],
    ];
    for (let i = 0; i < 2000; i += 1) {
      const scale = intIn(rnd, 1, 1_000_000);
      const ox = intIn(rnd, -MAX + 5_000_000, MAX - 5_000_000);
      const oy = intIn(rnd, -MAX + 5_000_000, MAX - 5_000_000);
      const pick = () => base[intIn(rnd, 0, base.length - 1)];
      const [a, b, c, d] = [pick(), pick(), pick(), pick()].map(([x, y]) => [ox + x * scale, oy + y * scale]);
      expect(incircle(a[0], a[1], b[0], b[1], c[0], c[1], d[0], d[1])).toBe(0);
    }
  });

  it('property: the sign equals the exact BigInt determinant on integer points across the range', () => {
    fc.assert(
      fc.property(coord(), coord(), coord(), coord(), coord(), coord(), coord(), coord(), (ax, ay, bx, by, cx, cy, dx, dy) => {
        return incircle(ax, ay, bx, by, cx, cy, dx, dy) === signOf(incircleBig(ax, ay, bx, by, cx, cy, dx, dy));
      }),
    );
  });

  it('property: the same on near-cocircular points (a fourth point one lattice unit off a circle\'s lattice point)', () => {
    const near = fc
      .tuple(fc.integer({ min: 1, max: 100_000 }), fc.integer({ min: -3_000_000, max: 3_000_000 }), fc.integer({ min: -3_000_000, max: 3_000_000 }))
      .chain(([s, ox, oy]) =>
        fc.tuple(fc.constant([s, ox, oy] as const), fc.integer({ min: -1, max: 1 }), fc.integer({ min: -1, max: 1 }), fc.integer({ min: 0, max: 11 })),
      );
    const base: [number, number][] = [
      [5, 0], [4, 3], [3, 4], [0, 5], [-3, 4], [-4, 3], [-5, 0], [-4, -3], [-3, -4], [0, -5], [3, -4], [4, -3],
    ];
    fc.assert(
      fc.property(near, ([[s, ox, oy], ex, ey, k]) => {
        const [a, b, c] = [base[0], base[3], base[6]].map(([x, y]) => [ox + x * s, oy + y * s]);
        const d = [ox + base[k][0] * s + ex, oy + base[k][1] * s + ey];
        return incircle(a[0], a[1], b[0], b[1], c[0], c[1], d[0], d[1]) === signOf(incircleBig(a[0], a[1], b[0], b[1], c[0], c[1], d[0], d[1]));
      }),
    );
  });
});
