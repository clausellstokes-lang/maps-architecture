// dmath's known-answer tests (M0-d-03; §3.1, §6.5 (2), §16 M0 (d); C-0029, C-0039, C-0135): every ported routine
// bit-identical to fdlibm 5.3's C, compiled with Apple clang in strict IEEE mode for arm64 and for x86-64 (run under
// Rosetta 2); the two vector sets identical to each other, at least 10⁴ cases per routine. The same check runs on Node
// arm64 and on Node x64 under Rosetta through kat-hosts.mjs (the exit bar; vitest's own bundler cannot start under x64
// here); the browsers and the workers are M0-d-06's cross-host harness.
import { describe, expect, it } from 'vitest';
import { katOf, setsIdentical } from './kat-run.js';
import { ARCHES, NAN_BITS, ROUTINES, bitsOf, fromHex, hexOf, matches } from './vectors.js';

describe('the known-answer comparison itself', () => {
  it('reads and writes the 16-digit bit patterns exactly, signed zeros and subnormals included', () => {
    for (const h of ['0000000000000000', '8000000000000000', '0000000000000001', '7fefffffffffffff', '3ff0000000000001', 'fff0000000000000']) {
      expect(hexOf(fromHex(h))).toBe(h);
    }
    expect(fromHex('3ff0000000000000')).toBe(1);
    expect(bitsOf(-0)).toBe(0x8000000000000000n);
  });

  it('accepts only the same 64 bits, or NaN for the one canonical NaN (C-0135)', () => {
    expect(matches(1, bitsOf(1))).toBe(true);
    expect(matches(1, bitsOf(1) + 1n)).toBe(false); // one unit in the last place is a miss
    expect(matches(-0, bitsOf(0))).toBe(false); // the sign of zero is a miss
    expect(matches(Number.NaN, NAN_BITS)).toBe(true);
    expect(matches(0, NAN_BITS)).toBe(false);
    expect(matches(Number.NaN, bitsOf(1))).toBe(false);
  });
});

describe('dmath against fdlibm 5.3 (known-answer vectors, both architectures)', () => {
  for (const { name } of ROUTINES) {
    describe(`dmath.${name}`, () => {
      it('the arm64 and x86-64 vector sets are byte-identical (C-0029)', () => {
        expect(setsIdentical(name)).toBe(true);
      });

      for (const arch of ARCHES) {
        it(`is bit-identical to every ${arch} known answer (at least 10⁴ cases)`, () => {
          const r = katOf(name, arch);
          expect(r.cases).toBeGreaterThanOrEqual(10_000);
          expect(r.misses, `${r.missCount} of ${r.cases} cases differ`).toEqual([]);
        });
      }
    });
  }
});
