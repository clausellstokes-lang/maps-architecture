// M0-a-01: checked ratios (§3.2 (8)) — a denominator below its floor returns E_DEGENERATE with detail `ratio`
// (§3.1's table), for each of the four quantities (length 1 cm, area 1 cm², angle 1 cdeg, count 1).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { RATIO_FLOOR, ratio, type RatioKind } from '../../src/num/index.js';

const KINDS: RatioKind[] = ['length', 'area', 'angle', 'count'];

describe('ratio (§3.2 (8))', () => {
  it('refuses a denominator below its quantity\'s floor with E_DEGENERATE `ratio`', () => {
    expect(RATIO_FLOOR).toEqual({ length: 1, area: 1, angle: 1, count: 1 });
    for (const kind of KINDS) {
      for (const den of [0, -0, 0.5, -0.5, 0.9999999999999999, -0.9999999999999999, 1e-300, Number.NaN]) {
        expect(ratio(7, den, kind), `${kind} ${den}`).toEqual({ ok: false, code: 'E_DEGENERATE', detail: 'ratio' });
      }
    }
  });

  it('divides at and above the floor, ± ∞ included', () => {
    for (const kind of KINDS) {
      expect(ratio(7, 1, kind)).toEqual({ ok: true, value: 7, warnings: [] });
      expect(ratio(7, -1, kind)).toEqual({ ok: true, value: -7, warnings: [] });
      expect(ratio(10, 4, kind)).toEqual({ ok: true, value: 2.5, warnings: [] });
      expect(ratio(10, Infinity, kind)).toEqual({ ok: true, value: 0, warnings: [] });
    }
  });

  it('property: ok exactly when |den| ≥ 1, with the IEEE quotient', () => {
    fc.assert(
      fc.property(fc.double(), fc.double(), fc.constantFrom(...KINDS), (num, den, kind) => {
        const r = ratio(num, den, kind);
        if (Math.abs(den) >= 1) return r.ok && Object.is(r.value, num / den) && r.warnings.length === 0;
        return !r.ok && r.code === 'E_DEGENERATE' && r.detail === 'ratio' && !('partial' in r);
      }),
    );
  });
});
