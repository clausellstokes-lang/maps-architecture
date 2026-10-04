// xoshiro128**'s known-answer tests (item M0-d-01; §6.1, §17.1 (8), §16 M0 (d); C-0029): Stream.u32 bit-identical to the
// authors' C, compiled with Apple clang in C-0029's strict mode for arm64 and for x86-64 (run under Rosetta 2); the two
// vector sets identical to each other. The same check runs on Node arm64 and on Node x64 under Rosetta through
// kat-hosts.mjs (the exit bar; vitest's own bundler cannot start under x64 here); the browsers and the workers are
// M0-d-06's cross-host harness.
import { describe, expect, it } from 'vitest';
import { ARCHES, FILES, katOf, readCases, setsIdentical } from './kat-run.js';
import { streamFromKey } from '../../src/rng/stream.js';

describe('xoshiro128** against the authors\' C (known-answer vectors, both architectures)', () => {
  for (const file of FILES) {
    describe(file, () => {
      it('the arm64 and x86-64 vector sets are byte-identical (C-0029)', () => {
        expect(setsIdentical(file)).toBe(true);
      });
      for (const arch of ARCHES) {
        it(`Stream.u32 equals every ${arch} known answer`, () => {
          const r = katOf(file, arch);
          expect(r.cases).toBeGreaterThanOrEqual(file === 'xoshiro128ss.txt' ? 4096 : 8);
          expect(r.misses, `${String(r.missCount)} of ${String(r.cases)} cases differ`).toEqual([]);
        }, 120_000);
      }
    });
  }

  it('reads the authors\' customary state (1, 2, 3, 4): 11520, 0, 5927040, 70819200, … (the first values by hand)', () => {
    // rotl(2 · 5, 7) · 9 = 1280 · 9 = 11520; the vector file's first line carries the same eight values.
    const s = streamFromKey([1, 2, 3, 4]);
    expect([s.u32(), s.u32(), s.u32(), s.u32()]).toEqual([11520, 0, 5927040, 70819200]);
    const first = readCases('arm64', 'xoshiro128ss.txt')[0];
    expect(first.state).toEqual([1, 2, 3, 4]);
    expect(first.expected.slice(0, 4)).toEqual([11520, 0, 5927040, 70819200]);
  });

  it('covers every single-bit state and the all-zero nudge among its cases', () => {
    const cases = readCases('arm64', 'xoshiro128ss.txt');
    const singles = cases.filter((c) => c.state.filter((w) => w !== 0).length === 1 && c.state.every((w) => (w & (w - 1)) === 0 || w === 0x80000000));
    expect(singles.length).toBeGreaterThanOrEqual(128);
    expect(cases.some((c) => c.state.join() === [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a].join())).toBe(true);
  }, 120_000);
});
