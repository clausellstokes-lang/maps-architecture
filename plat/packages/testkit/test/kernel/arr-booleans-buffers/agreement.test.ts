// M0-a-08's differential agreement with both oracles (§3.7 "Oracles, not fallbacks"; §13.1 "CI oracles … on booleans
// … and buffers, split by attraction"; the exit bar §3.7 (i)): every case of every operation runs our engine — reached
// only through @plat/kernel's export — and Clipper2 and polygon-clipping (M0-k-03), and is split by what OUR engine
// reported: unattracted cases need equal face counts after snapping and |Δ| ≤ perimeter × 1 cm; attracted cases every
// hard ring check and |Δ| ≤ perimeter × √2 · attractCm. Our output is also held to the ring checks on every case
// (0 invalid outputs) and a throw fails the property (0 crashes). The cases are M0-k-01's arbitraries and the
// booleans, buffer, offsetFace and inset cases of M0-k-02's constructive set (support.ts). The size is PLAT_FUZZ_RUNS
// per operation (10⁴ on a PR, 10⁶ nightly; C-0057); the vacuity guard asserts min(10⁵, ⌈¼ × runs⌉) unattracted draws
// per operation, so the nightly run asserts §13.1's 10⁵ and every run reports its count (C-0193 (6), the spec note
// N-14). The placement is C-0122's: the one package test project that sees the oracles.
import fc from 'fast-check';
import { beforeAll, describe, expect, it } from 'vitest';
import { fuzzRuns } from '../../../src/fuzz/index.js';
import { loadOracles, UNATTRACTED_DRAW_MIN } from '../../../src/oracles/index.js';
import {
  booleanCaseArb,
  bufferCaseArb,
  guardFor,
  insetCaseArb,
  judgeBoolean,
  judgeBuffer,
  judgeInset,
  judgeOffset,
  newHarness,
  offsetCaseArb,
  type Harness,
} from './support.js';

const RUNS = fuzzRuns();
const TIMEOUT = 3_600_000;

/** Oracle refusals allowed (C-0150): 0.1 % of the cases, as M0-k-03's own agreement test allows. */
const MAX_REFUSAL_SHARE = 0.001;

beforeAll(async () => {
  await loadOracles();
});

function verdict(h: Harness, op: string): void {
  const line = h.report.line(op);
  const refusals = Object.values(line.refusals).reduce((s, n) => s + n, 0);
  const settled = Object.values(h.settled).reduce((s, n) => s + n, 0);
  console.info(
    `arr/${op}: ${String(RUNS)} cases — drawn ${String(line.draws)} (unattracted ${String(line.unattracted)}, share ${line.unattractedShare.toFixed(3)}; attracted ${String(line.attracted)}, share ${line.attractedShare.toFixed(3)}); passed ${String(line.unattractedPass)} + ${String(line.attractedPass)}; refusals ${JSON.stringify(line.refusals)}; unjudged ${String(line.unjudged)}; settled ${JSON.stringify(h.settled)}; sources ${JSON.stringify(h.sources)}; guard ${String(guardFor(RUNS, UNATTRACTED_DRAW_MIN))}`,
  );
  expect(h.failures).toEqual([]);
  expect(h.invalid).toEqual([]);
  expect(line.failures).toEqual({});
  expect(line.unattractedPass + line.attractedPass).toBe(line.draws);
  expect(line.draws + line.unjudged + settled).toBe(RUNS);
  expect(refusals).toBeLessThanOrEqual(Math.ceil(MAX_REFUSAL_SHARE * RUNS));
  // §13.1's vacuity guard (C-0193 (6)): 10⁵ unattracted draws at the nightly size, a quarter of the draws below it
  expect(line.unattracted).toBeGreaterThanOrEqual(guardFor(RUNS, UNATTRACTED_DRAW_MIN));
  expect(h.report.meetsDrawCount(op, guardFor(RUNS, UNATTRACTED_DRAW_MIN))).toBe(true);
}

describe('booleans agree with both oracles, split by attraction (§3.7, §13.1)', () => {
  for (const op of ['union', 'intersection', 'difference', 'xor'] as const) {
    it(`${op}: nonzero and evenodd over M0-k-01's families and M0-k-02's empty case`, { timeout: TIMEOUT }, () => {
      const h = newHarness();
      fc.assert(
        fc.property(booleanCaseArb(op), (c) => {
          judgeBoolean(h, c);
        }),
        { numRuns: RUNS },
      );
      verdict(h, op);
    });
  }
});

describe('buffer agrees with both oracles, split by attraction (§3.7, §13.1)', () => {
  it('buffer: round, square and miter joins; round, square and flat ends; one or per-point half-widths', { timeout: TIMEOUT }, () => {
    const h = newHarness();
    fc.assert(
      fc.property(bufferCaseArb, (c) => {
        judgeBuffer(h, c);
      }),
      { numRuns: RUNS },
    );
    verdict(h, 'buffer');
  });
});

describe('offsetFace and insetRing agree with the oracles’ own constructions (§3.4, §3.7 Insets)', () => {
  it('offsetFace: face − ⋃ buffer(edgeᵢ, dᵢ) through each oracle’s buffer and difference', { timeout: TIMEOUT }, () => {
    const h = newHarness();
    fc.assert(
      fc.property(offsetCaseArb, (c) => {
        judgeOffset(h, c);
      }),
      { numRuns: RUNS },
    );
    verdict(h, 'offsetFace');
  });

  it('insetRing: the half-plane intersection through each oracle’s difference; E_NON_CONVEX exactly on the non-convex faces', { timeout: TIMEOUT }, () => {
    const h = newHarness();
    fc.assert(
      fc.property(insetCaseArb, (c) => {
        judgeInset(h, c);
      }),
      { numRuns: RUNS },
    );
    verdict(h, 'insetRing');
  });
});
