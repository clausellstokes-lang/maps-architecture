// arb.regularSnapped (M0-k-01; §13.1 (1) snapped polygons and chains; the builds' "snapped rotated regular shapes").
// A rectangle (aspect 1 : 1 to 1 : 8), a square or a regular n-gon (n = 3 … 12) about a lattice centre, its
// circumradius drawn log-uniformly in [1 cm, `sizeCm` max] (2²² cm by default), turned by a random angle in 2¹⁶ steps,
// its corners computed in doubles (`dmath`, the same on every host) and snapped by the kernel's `snap` — the way a
// fitted or drawn shape reaches the arena. Consecutive duplicates that rounding makes are dropped; what else rounding
// does to a small shape (a fold, a collinear run) is the class. Every vertex lies within √2 / 2 cm of the shape's
// circle. Chains: the same outline left open (its closing edge missing).
import fc from 'fast-check';
import { area2Big, dmath } from '@plat/kernel';
import { TAU, dedupePoints, place, posArb, pt, resolveLimit, resolveSize, scaleArb } from './lattice.js';
import type { FuzzBoundsOptions, FuzzRing, FuzzShapeOptions } from './types.js';

/** The kinds of regular shape. */
const KINDS = ['rectangle', 'square', 'regular'] as const;

/** arb.regularSnapped's options. */
export interface FuzzRegularOptions extends FuzzShapeOptions {
  /** As `FuzzBoundsOptions.sizeCm`: the circumradius. */
  sizeCm?: FuzzBoundsOptions['sizeCm'];
}

/** Snapped rotated rectangles, squares and regular n-gons (the default) or their open outlines; see the module comment. */
export function regularSnapped(opts: FuzzRegularOptions = {}): fc.Arbitrary<FuzzRing> {
  const limit = resolveLimit(opts.limitCm);
  const size = resolveSize(opts.sizeCm, [1, 4_194_304], limit);
  const chainForm = opts.shape === 'chain';
  return fc
    .record({
      kind: fc.integer({ min: 0, max: KINDS.length - 1 }),
      n: fc.integer({ min: 3, max: 12 }),
      aspect: fc.integer({ min: 1000, max: 8000 }),
      R: scaleArb(size[0], size[1]),
      turn: fc.integer({ min: 0, max: 65_535 }),
      fx: posArb,
      fy: posArb,
    })
    .map(({ kind, n, aspect, R, turn, fx, fy }) => {
      const k = KINDS[kind];
      const cx = place(-limit + R, limit - R, fx);
      const cy = place(-limit + R, limit - R, fy);
      const phi = (TAU * turn) / 65_536;
      // The corners' angles about the centre: n equal steps, or a rectangle's four at ±α and π ± α.
      const angles: number[] = [];
      if (k === 'regular') for (let j = 0; j < n; j += 1) angles.push(phi + (TAU * j) / n);
      else {
        // tan α = 1 / aspect (1 for a square): the half-diagonal makes angle α with the long side.
        const alpha = k === 'square' ? Math.PI / 4 : dmath.atan(1000 / aspect);
        angles.push(phi + alpha, phi + Math.PI - alpha, phi + Math.PI + alpha, phi + TAU - alpha);
      }
      const ring = dedupePoints(
        angles.map((a) => pt(cx + R * dmath.cos(a), cy + R * dmath.sin(a))),
        !chainForm,
      );
      return ring;
    })
    .filter((r) => (chainForm ? r.length >= 2 : r.length >= 3 && area2Big(r) !== 0n));
}
