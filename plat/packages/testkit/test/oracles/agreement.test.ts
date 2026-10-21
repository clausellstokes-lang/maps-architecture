// M0-k-03's test "the two oracles agree with each other on 10⁴ random cases within 1 cm × perimeter" (§3.7, §13.1):
// Clipper2 in Node and polygon-clipping, each on the same random boolean and buffer cases, their results' symmetric
// difference — measured through each oracle's own xor — at most the case's perimeter × 1 cm. Every answer has passed
// the region check, and every polygon-clipping call ran under its step budget (KI-6); an answer or measurement a
// library refuses (C-0150) compares nothing and is counted.
//
// Size, seed and cap (L18; C-0414): each family runs the test's own 10⁴ cases (`AGREEMENT_CASES`, C-0144 (7)), never
// PLAT_FUZZ_RUNS, so a RELATED run at 1 000 runs it whole; the seed is the family's fixed H32 seed
// (`oracles/agreement/booleans`, `…/buffers`) unless PLAT_FUZZ_SEED replays another (C-0057), passed to fast-check and
// printed in the run's line and in every assertion's message, so a red always carries the seed that replays it; the
// refusals are capped per size at ⌈0.001 × cases⌉ (`agreementRefusalCap`: 10 at 10⁴), C-0150's allowance — none was
// measured in 1.2 × 10⁵ boolean and 2 × 10⁴ buffer cases, and a check refusing correct answers wholesale exceeds it at once.
import fc from 'fast-check';
import { beforeAll, describe, expect, it } from 'vitest';
import { loadOracles, oracleBoolean, oracleBuffer } from '../../src/oracles/index.js';
import {
  agreementLine,
  agreementParams,
  agreementRefusalCap,
  booleanCase,
  bufferCase,
  newTally,
  oraclesAgree,
  refusalCount,
} from './support.js';

beforeAll(async () => {
  await loadOracles();
});

describe('the two oracles agree with each other on 10⁴ random cases within 1 cm × perimeter', () => {
  it('booleans: union, intersection, difference, xor under both fill rules', { timeout: 600_000 }, () => {
    const params = agreementParams('booleans');
    const tally = newTally();
    fc.assert(
      fc.property(booleanCase, ({ op, fill, a, b }) => {
        const c = oracleBoolean(op, a, b, fill, 'clipper2');
        const p = oracleBoolean(op, a, b, fill, 'polygon-clipping');
        return oraclesAgree(c, p, tally);
      }),
      params,
    );
    const line = agreementLine('booleans', params.seed, tally);
    console.info(line);
    expect(tally.cases, line).toBe(params.numRuns);
    expect(refusalCount(tally), line).toBeLessThanOrEqual(agreementRefusalCap(params.numRuns));
    expect(tally.compared, line).toBeGreaterThanOrEqual(params.numRuns - agreementRefusalCap(params.numRuns));
  });

  it('buffers: round, square and miter joins; round, square and flat ends; uniform and per-point half-widths', { timeout: 600_000 }, () => {
    const params = agreementParams('buffers');
    const tally = newTally();
    fc.assert(
      fc.property(bufferCase, ({ chains, w, joins, ends }) => {
        const c = oracleBuffer(chains, w, joins, ends, 'clipper2');
        const p = oracleBuffer(chains, w, joins, ends, 'polygon-clipping');
        return oraclesAgree(c, p, tally);
      }),
      params,
    );
    const line = agreementLine('buffers', params.seed, tally);
    console.info(line);
    expect(tally.cases, line).toBe(params.numRuns);
    expect(refusalCount(tally), line).toBeLessThanOrEqual(agreementRefusalCap(params.numRuns));
    expect(tally.compared, line).toBeGreaterThanOrEqual(params.numRuns - agreementRefusalCap(params.numRuns));
  });
});
