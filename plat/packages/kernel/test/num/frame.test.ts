// M0-a-01: the lattice constants (§2.2's LatticeSpec) and the frame law (§3.2 (9)): width = √(A · aspect),
// height = √(A / aspect), aspect ∈ [0.5, 2], centred on (0, 0); the range bound of §3.2 (1) at the largest arena
// (C-0134 (6)).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { LATTICE, frameOf } from '../../src/num/index.js';

describe('LatticeSpec (§2.2)', () => {
  it('holds §2.2\'s constants and cannot be changed', () => {
    expect(LATTICE).toEqual({ unitCm: 1, minEdgeCm: 25, attractCm: 26, minFaceAngleCdeg: 500, rangeCm: 8_388_608 });
    expect(LATTICE.rangeCm).toBe(2 ** 23);
    expect(LATTICE.attractCm).toBe(LATTICE.minEdgeCm + LATTICE.unitCm);
    expect(Object.isFrozen(LATTICE)).toBe(true);
  });
});

describe('the frame law (§3.2 (9))', () => {
  it('property: width = √(A · aspect) and height = √(A / aspect), each to the nearest centimetre', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 1, max: 2e8, noNaN: true }), // m²: up to 200 km², past the METROPOLIS cap's 154 km²
        fc.double({ min: 0.5, max: 2, noNaN: true }),
        fc.double({ min: 0, max: 0.5, noNaN: true }),
        (areaM2, aspect, marginShare) => {
          // every input here keeps the arena inside the range: at most 20 km a side, 1 side of margin
          const r = frameOf(areaM2, aspect, marginShare);
          const w = Math.sqrt(areaM2 * 10_000 * aspect);
          const h = Math.sqrt((areaM2 * 10_000) / aspect);
          if (!r.ok) return false;
          const f = r.value;
          return (
            Number.isInteger(f.widthCm) &&
            Number.isInteger(f.heightCm) &&
            Math.abs(f.widthCm - w) <= 0.5 &&
            Math.abs(f.heightCm - h) <= 0.5 + 1e-6 &&
            f.aspect === aspect &&
            f.marginShare === marginShare
          );
        },
      ),
    );
  });

  it('a square at aspect 1, the two extremes, and the largest arena of §3.2 (1)', () => {
    expect(frameOf(1_000_000, 1, 0.3)).toEqual({
      ok: true,
      value: { widthCm: 100_000, heightCm: 100_000, aspect: 1, marginShare: 0.3 },
      warnings: [],
    });
    expect(frameOf(2_000_000, 2, 0.3)).toMatchObject({ ok: true, value: { widthCm: 200_000, heightCm: 100_000 } });
    expect(frameOf(2_000_000, 0.5, 0.3)).toMatchObject({ ok: true, value: { widthCm: 100_000, heightCm: 200_000 } });
    // METROPOLIS at the population cap at aspect 2: 17.53 km × 8.76 km, |x| ≤ 0.8 × 17.53 km ≈ 2^20.4 (§3.2 (1))
    const cap = frameOf(17_530 * 8_765, 2, 0.3);
    expect(cap.ok).toBe(true);
    if (cap.ok) {
      expect(Math.abs(cap.value.widthCm - 1_753_000)).toBeLessThan(200);
      expect(cap.value.widthCm * 0.8).toBeLessThan(2 ** 20.5);
    }
  });

  it('refuses an aspect outside [0.5, 2], a non-positive or non-finite area, a bad margin, and an arena past 2²³', () => {
    for (const aspect of [0.49, 2.01, 0, -1, Number.NaN, Infinity]) {
      expect(frameOf(1e6, aspect, 0.3), String(aspect)).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'aspect' });
    }
    for (const area of [0, -5, Number.NaN, Infinity]) {
      expect(frameOf(area, 1, 0.3), String(area)).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'area' });
    }
    for (const m of [-0.01, Number.NaN, Infinity]) {
      expect(frameOf(1e6, 1, m), String(m)).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'margin' });
    }
    // a 150 km square with the 30 % margin reaches 0.8 × 15 000 000 cm > 2²³
    expect(frameOf(150_000 * 150_000, 1, 0.3)).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'range' });
    // an area too small for a 1 cm side: the height's ratio refuses it
    expect(frameOf(1e-5, 1, 0.3)).toEqual({ ok: false, code: 'E_DEGENERATE', detail: 'ratio' });
  });
});
