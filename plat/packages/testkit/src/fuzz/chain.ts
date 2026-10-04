// arb.chain and arb.stroke (M0-k-01; §13.1 (1) chains; the builds' "random chains and strokes"). A chain is a random
// walk of integer steps — any direction, any length from 1 cm up, so it crosses itself, doubles back and runs
// collinear as it happens — placed anywhere in the range. A stroke is a pointer stroke: a smooth curve (an arc, a wave,
// a spiral or a looping curl) sampled in doubles and snapped, consecutive duplicates dropped — the input §7.1's
// authoring boundary hands `insertChain`.
import fc from 'fast-check';
import { dmath } from '@plat/kernel';
import { TAU, dedupePoints, fitIntoRange, place, posArb, pt, resolveCount, resolveLimit, resolveSize, scaleArb, type Vec } from './lattice.js';
import type { FuzzBoundsOptions, FuzzChain } from './types.js';

/** arb.chain's options. */
export interface FuzzChainOptions extends FuzzBoundsOptions {
  /** The vertex count, [2, 40] by default (at most 4 096). */
  vertices?: readonly [number, number];
}

/** A step: a direction (an angle in 2¹⁶ steps of a turn) and a length. */
const stepRow = (len: fc.Arbitrary<number>) => fc.record({ turn: fc.integer({ min: 0, max: 65_535 }), len });

/** The walk's vectors from its first vertex: steps of length ≥ 1 cm rounded to the lattice, never zero. */
function walk(steps: readonly { turn: number; len: number }[]): Vec[] {
  const out: Vec[] = [{ x: 0, y: 0 }];
  let x = 0;
  let y = 0;
  for (const { turn, len } of steps) {
    const theta = (TAU * turn) / 65_536;
    let dx = Math.round(len * dmath.cos(theta));
    const dy = Math.round(len * dmath.sin(theta));
    if (dx === 0 && dy === 0) dx = 1;
    x += dx;
    y += dy;
    out.push({ x, y });
  }
  return out;
}

/** Random walks of `vertices` vertices with step lengths in `stepCm`, fitted into ±limit. */
export function walkArb(vertices: readonly [number, number], stepCm: readonly [number, number], limit: number): fc.Arbitrary<FuzzChain> {
  return fc
    .record({
      steps: fc.array(stepRow(scaleArb(stepCm[0], stepCm[1])), { minLength: vertices[0] - 1, maxLength: vertices[1] - 1 }),
      fx: posArb,
      fy: posArb,
    })
    .map(({ steps, fx, fy }) => fitIntoRange(walk(steps), limit, fx, fy));
}

/**
 * Random chains (§13.1 (1)): walks of 2–40 vertices whose steps are drawn log-uniformly in [1 cm, `sizeCm` max] (by
 * default 2¹⁷ cm, so 4 096 steps still fit the range), no step zero; they cross, touch and double back as they happen.
 */
export function chain(opts: FuzzChainOptions = {}): fc.Arbitrary<FuzzChain> {
  const limit = resolveLimit(opts.limitCm);
  const vertices = resolveCount('vertices', opts.vertices, [2, 40], 2, 4_096);
  const step = resolveSize(opts.sizeCm, [1, 131_072], Math.floor((2 * limit) / (2 * vertices[1])));
  return walkArb(vertices, step, limit);
}

/** The stroke kinds. */
export type FuzzStrokeKind = 'arc' | 'wave' | 'spiral' | 'curl';

const STROKE_KINDS: readonly FuzzStrokeKind[] = ['arc', 'wave', 'spiral', 'curl'];

/**
 * Pointer strokes (the builds' "strokes"): 2–64 samples of an arc (sweep 30°–330°), a wave (0.5–4 cycles), a spiral
 * (0.5–3 turns) or a curl (a line with 1–6 loops, crossing itself), of size R drawn log-uniformly in [1 cm, `sizeCm`
 * max] (2²⁰ cm by default), rotated, sampled in doubles, snapped, consecutive duplicates dropped; at least two vertices.
 */
export function stroke(opts: FuzzBoundsOptions = {}): fc.Arbitrary<FuzzChain> {
  const limit = resolveLimit(opts.limitCm);
  const size = resolveSize(opts.sizeCm, [1, 1_048_576], Math.floor(limit / 4));
  return fc
    .record({
      kind: fc.integer({ min: 0, max: STROKE_KINDS.length - 1 }),
      samples: fc.integer({ min: 2, max: 64 }),
      R: scaleArb(size[0], size[1]),
      a: fc.integer({ min: 0, max: 1000 }),
      b: fc.integer({ min: 0, max: 1000 }),
      turn: fc.integer({ min: 0, max: 65_535 }),
      fx: posArb,
      fy: posArb,
    })
    .map(({ kind, samples, R, a, b, turn, fx, fy }) => {
      const k = STROKE_KINDS[kind];
      const phi = (TAU * turn) / 65_536;
      const cosP = dmath.cos(phi);
      const sinP = dmath.sin(phi);
      // The curve inside the disc of radius 2R about its centre.
      const cx = place(-limit + 2 * R, limit - 2 * R, fx);
      const cy = place(-limit + 2 * R, limit - 2 * R, fy);
      const pts = [];
      for (let j = 0; j < samples; j += 1) {
        const t = j / (samples - 1);
        let x: number;
        let y: number;
        if (k === 'arc') {
          const th = (TAU * (30 + (300 * a) / 1000) * t) / 360;
          x = R * dmath.cos(th);
          y = R * dmath.sin(th);
        } else if (k === 'wave') {
          x = R * (2 * t - 1);
          y = ((R * a) / 2000) * dmath.sin(TAU * (0.5 + (3.5 * b) / 1000) * t);
        } else if (k === 'spiral') {
          const th = TAU * (0.5 + (2.5 * a) / 1000) * t;
          x = R * t * dmath.cos(th);
          y = R * t * dmath.sin(th);
        } else {
          const loops = 1 + Math.floor((5 * b) / 1000);
          const rho = (R * (200 + (600 * a) / 1000)) / 1000;
          x = R * (2 * t - 1) + rho * dmath.cos(TAU * loops * t);
          y = rho * dmath.sin(TAU * loops * t);
        }
        pts.push(pt(cx + x * cosP - y * sinP, cy + x * sinP + y * cosP));
      }
      return dedupePoints(pts, false);
    })
    .filter((c) => c.length >= 2);
}
