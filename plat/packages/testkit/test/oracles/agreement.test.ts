// M0-k-03's test "the two oracles agree with each other on 10⁴ random cases within 1 cm × perimeter" (§3.7, §13.1):
// Clipper2 in Node and polygon-clipping, each on the same random boolean and buffer cases, their results' symmetric
// difference — measured through each oracle's own xor — at most the case's perimeter × 1 cm. Every answer has passed
// the region check; an answer or measurement a library refuses (C-0150) compares nothing and is counted, at most
// `MAX_REFUSALS` per family. The size is the test's own 10⁴ per family, not PLAT_FUZZ_RUNS (C-0144 (7)); the seed is
// fast-check's, fresh on every run, and PLAT_FUZZ_SEED replays a failure (C-0057).
import fc from 'fast-check';
import { beforeAll, describe, expect, it } from 'vitest';
import { loadOracles, oracleBoolean, oracleBuffer } from '../../src/oracles/index.js';
import { booleanCase, bufferCase, newTally, oraclesAgree, refusalCount } from './support.js';

const CASES = 10_000;

/**
 * Refused answers and measurements allowed per 10⁴ cases (C-0150): 0.1 %. None was measured in 1.2 × 10⁵ boolean and
 * 2 × 10⁴ buffer cases; a check that refused correct answers wholesale would exceed it at once.
 */
const MAX_REFUSALS = 10;

beforeAll(async () => {
  await loadOracles();
});

describe('the two oracles agree with each other on 10⁴ random cases within 1 cm × perimeter', () => {
  it('booleans: union, intersection, difference, xor under both fill rules', { timeout: 600_000 }, () => {
    const tally = newTally();
    fc.assert(
      fc.property(booleanCase, ({ op, fill, a, b }) => {
        const c = oracleBoolean(op, a, b, fill, 'clipper2');
        const p = oracleBoolean(op, a, b, fill, 'polygon-clipping');
        return oraclesAgree(c, p, tally);
      }),
      { numRuns: CASES },
    );
    expect(tally.cases).toBe(CASES);
    expect(refusalCount(tally)).toBeLessThanOrEqual(MAX_REFUSALS);
    expect(tally.compared).toBeGreaterThanOrEqual(CASES - MAX_REFUSALS);
    console.info(
      `oracles/booleans: ${tally.compared} of ${tally.cases} cases compared and agree; refusals ${JSON.stringify(tally.refusals)}; face counts equal on ${tally.faceAgree}; worst |Δ| ÷ perimeter ${tally.worstShare.toFixed(4)} cm`,
    );
  });

  it('buffers: round, square and miter joins; round, square and flat ends; uniform and per-point half-widths', { timeout: 600_000 }, () => {
    const tally = newTally();
    fc.assert(
      fc.property(bufferCase, ({ chains, w, joins, ends }) => {
        const c = oracleBuffer(chains, w, joins, ends, 'clipper2');
        const p = oracleBuffer(chains, w, joins, ends, 'polygon-clipping');
        return oraclesAgree(c, p, tally);
      }),
      { numRuns: CASES },
    );
    expect(tally.cases).toBe(CASES);
    expect(refusalCount(tally)).toBeLessThanOrEqual(MAX_REFUSALS);
    expect(tally.compared).toBeGreaterThanOrEqual(CASES - MAX_REFUSALS);
    console.info(
      `oracles/buffers: ${tally.compared} of ${tally.cases} cases compared and agree; refusals ${JSON.stringify(tally.refusals)}; face counts equal on ${tally.faceAgree}; worst |Δ| ÷ perimeter ${tally.worstShare.toFixed(4)} cm`,
    );
  });
});
