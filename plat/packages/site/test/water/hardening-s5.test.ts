// M0-e-03's hardening round S5 (lane build/M0-e-03-fix-s5; leg 2 of the merged round M0-e-02 S3 → M0-e-03 S5; the
// queue row Q193 (a), the closing check of round S4's note N-s4c-1), pinned here:
//
// * N-s4c-1 — round S4's `provedRings` dropped a hole before the proofs when the kernel MADE it under SLIVER_AREA_CM2
//   (4 m²) AND the clean LEFT it under 4 m². The two clauses are not one rule: a hole whose area crosses 4 m² under
//   the clean falls on either side, and a hole the kernel made just over 4 m² that the clean leaves under it was still
//   proved before `partsOf` dropped it — a refusal (`rings meet`) on a ring that was about to be dropped. The rule is
//   now ONE measure, the one `partsOf` judges by: a hole (a ring the kernel made clockwise) the clean leaves under 4 m²
//   is dropped before the proofs, whatever area the kernel made it; every other ring is proved — an outer ring whatever
//   its area, a hole the clean leaves at or over 4 m² whatever it was made. Two crafted holes 10 cm off the outer ring
//   pin both sides of the band: a 2 m rectangle with a 15 cm bump (made 4.07 m², cleaned 3.92 m²: dropped, the body
//   kept) and with a 15 cm dent (made 3.93 m², cleaned 4.08 m²: kept, proved, refused `rings meet`). Each area is read
//   by this test's own shoelace, the made one on the ring given and the cleaned one on `cleanRing`'s result (the bump
//   or the dent is 15 cm off the chord, under the clean's 20 cm tolerance, so the clean leaves the plain rectangle).
//   Round S4's own pins (the 3.3 m² and 5 m² pockets, the 3.3 m² outer ring; hardening-s4.test.ts) stand unchanged.
import type { LatticePoint } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { cleanRing } from '../../src/water/offset.js';
import { SLIVER_AREA_CM2 } from '../../src/water/params.js';
import { provedRings } from '../../src/water/polygons.js';
import { pt, SMALL_ARENA } from './support.js';

/** The test's own shoelace: a ring's signed area in cm² (positive counter-clockwise; 1 m² = 10 000 cm²). */
function shoelace(ring: readonly { x: number; y: number }[]): number {
  let s = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    s += a.x * b.y - b.x * a.y;
  }
  return s / 2;
}

describe('N-s4c-1 (S1): one measure — a hole the clean leaves under SLIVER_AREA_CM2 is dropped before the proofs, whatever area the kernel made it; every other ring is proved', () => {
  const { REACH } = SMALL_ARENA;
  /** A 100 m square of water, counter-clockwise, its south side at y = −5 000. */
  const outer: LatticePoint[] = [pt(-5000, -5000), pt(5000, -5000), pt(5000, 5000), pt(-5000, 5000)];
  /** The south-side gap of every crafted hole to the square's south side (cm): within RING_CLEAR_CM, so they meet. */
  const BASE = -4990;
  /**
   * A clockwise 2 m wide rectangle of `heightCm` whose base lies 10 cm above the square's south side, its north side
   * carrying a 1 m wide notch `notchCm` deep in its middle: outward (a bump) when positive, inward (a dent) when
   * negative.
   */
  function hole(heightCm: number, notchCm: number): LatticePoint[] {
    const top = BASE + heightCm;
    return [pt(0, BASE), pt(0, top), pt(50, top), pt(50, top + notchCm), pt(150, top + notchCm), pt(150, top), pt(200, top), pt(200, BASE)];
  }
  const bump = hole(196, 15);
  const dent = hole(204, -15);

  it('the crafted holes cross the sliver area under the clean (the test\'s own shoelace): the bump made 4.07 m², cleaned 3.92 m²; the dent made 3.93 m², cleaned 4.08 m² — the clean leaves the plain rectangle', () => {
    expect(shoelace(bump)).toBe(-40_700);
    expect(shoelace(dent)).toBe(-39_300);
    const cb = cleanRing(bump);
    const cd = cleanRing(dent);
    expect(cb).toEqual([pt(0, BASE), pt(0, BASE + 196), pt(200, BASE + 196), pt(200, BASE)]);
    expect(cd).toEqual([pt(0, BASE), pt(0, BASE + 204), pt(200, BASE + 204), pt(200, BASE)]);
    expect(shoelace(cb as LatticePoint[])).toBe(-39_200);
    expect(shoelace(cd as LatticePoint[])).toBe(-40_800);
    // the sliver area lies between: 4 m² = 40 000 cm²
    expect(SLIVER_AREA_CM2).toBe(40_000);
  });

  it('the bump hole (made 4.07 m², cleaned 3.92 m²) is dropped before the proofs: the body is kept, its one ring the outer — no refusal on a ring `partsOf` drops', () => {
    expect(provedRings([outer, bump], REACH, [])).toEqual([outer]);
    // in either order
    expect(provedRings([bump, outer], REACH, [])).toEqual([outer]);
  });

  it('the dent hole (made 3.93 m², cleaned 4.08 m²) is a ring the body keeps: proved, and refused `rings meet`', () => {
    expect(provedRings([outer, dent], REACH, [])).toBe('not clear (rings meet)');
  });

  it('an outer ring (counter-clockwise) the clean leaves under the sliver area is proved whatever its area: the bump reversed, made 4.07 m² and cleaned 3.92 m², refused `rings meet`', () => {
    expect(provedRings([outer, bump.slice().reverse()], REACH, [])).toBe('not clear (rings meet)');
  });
});
