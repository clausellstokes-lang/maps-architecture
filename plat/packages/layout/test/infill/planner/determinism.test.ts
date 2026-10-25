// The planner is deterministic under slot renumbering (M0-b-02's listed test; §13.2's renumbering identity): its
// inputs are rings and streams, never slots — the same face given from any first vertex, in either orientation, its
// holes in any order, plans the same cut from the same draws; the same streams give the same plan in a fresh
// derivation, and another face's plan in the same derivation leaves it unchanged (its streams are keyed by its own
// lineage, §6.1).
import { createRng, type LatticePoint } from '@plat/kernel';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { planCut, type KerbFace } from '../../../src/infill/planner.js';
import { CTX, FACE_NAMES, FACES, streamsFor } from './support.js';

/** The plan as plain data (DrawRecord's text included). */
function snapshot(r: ReturnType<typeof planCut>): string {
  return JSON.stringify(r, (k, v: unknown) => (v instanceof Object && 'text' in v && 'concern' in v ? { ...v, text: (v as { text: string }).text } : v));
}

function rotate<T>(xs: readonly T[], k: number): T[] {
  const n = xs.length;
  const s = ((k % n) + n) % n;
  return xs.slice(s).concat(xs.slice(0, s));
}

/** The face renumbered: each ring started at another vertex, maybe reversed, the holes permuted. */
function renumbered(face: KerbFace, starts: readonly number[], reverse: readonly boolean[], holeOrder: readonly number[]): KerbFace {
  const rings = face.rings.map((r, i) => {
    const turned = rotate(r, starts[i % starts.length]);
    return reverse[i % reverse.length] ? turned.slice().reverse() : turned;
  });
  const holes = rings.slice(1);
  const order = holeOrder.length === holes.length ? holeOrder : holes.map((_, i) => i);
  return { rings: [rings[0], ...order.map((i) => holes[i])] as LatticePoint[][], spines: face.spines };
}

describe('the planner is deterministic under slot renumbering', () => {
  for (const name of FACE_NAMES) {
    it(`${name}: any first vertex, either orientation, any hole order → the same plan`, () => {
      const face = FACES[name];
      fc.assert(
        fc.property(
          fc.array(fc.nat(400), { minLength: 1, maxLength: 3 }),
          fc.array(fc.boolean(), { minLength: 1, maxLength: 3 }),
          fc.integer({ min: 1, max: 1000 }),
          (starts, reverse, seed) => {
            const want = snapshot(planCut(face, CTX, streamsFor(seed)));
            const got = snapshot(planCut(renumbered(face, starts, reverse, []), CTX, streamsFor(seed)));
            expect(got).toBe(want);
          },
        ),
        { numRuns: 200 },
      );
    });
  }

  it('a holed face with two holes in either order plans the same cut', () => {
    const outer = FACES.holed.rings[0];
    const h1 = [{ x: 2000, y: 2000 }, { x: 2000, y: 3000 }, { x: 3000, y: 3000 }, { x: 3000, y: 2000 }] as LatticePoint[];
    const h2 = [{ x: 9000, y: 6000 }, { x: 9000, y: 8000 }, { x: 12000, y: 8000 }, { x: 12000, y: 6000 }] as LatticePoint[];
    for (let seed = 1; seed <= 40; seed += 1) {
      const a = snapshot(planCut({ rings: [outer, h1, h2], spines: FACES.holed.spines }, CTX, streamsFor(seed)));
      const b = snapshot(planCut({ rings: [outer, h2, h1], spines: FACES.holed.spines }, CTX, streamsFor(seed)));
      expect(b).toBe(a);
    }
  });

  it('the same streams in a fresh derivation give the same plan; another face planned first changes nothing', () => {
    for (let seed = 1; seed <= 30; seed += 1) {
      const a = snapshot(planCut(FACES.trapezoid, CTX, streamsFor(seed)));
      const rng = createRng();
      planCut(FACES.triangle, CTX, streamsFor(seed, [99, 98], rng));
      const b = snapshot(planCut(FACES.trapezoid, CTX, streamsFor(seed, undefined, rng)));
      expect(b).toBe(a);
    }
  });

  it('a second plan of the same face in one derivation continues its streams (one plan per face and attempt)', () => {
    const rng = createRng();
    const a = planCut(FACES.trapezoid, CTX, streamsFor(3, undefined, rng));
    const b = planCut(FACES.trapezoid, CTX, streamsFor(3, undefined, rng));
    expect(a.ok && b.ok).toBe(true);
    if (a.ok && b.ok) expect(b.value.stop.uniforms).not.toEqual(a.value.stop.uniforms);
  });
});
