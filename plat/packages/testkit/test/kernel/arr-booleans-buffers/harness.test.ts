// M0-a-08's judge and verdict pinned where the agreement runs cannot fail on them (the spec notes N-39, N-40, N-41 (2);
// C-0150; C-0206): a refused verdict is classified by the step that refused — the oracle's own answer on the case's
// operands, the measurement of |ours Δ oracle| through that oracle's xor, or the cross-check through the other's — and
// an own-operand refusal is excluded from C-0150's 0.1 % allowance only when every oracle that answered still judges the
// case and our result passes the hard ring checks; cases every oracle refused on its own operands are capped at 1 % of
// their family; the far-stretch measure is the farthest vertex of ours from the oracle's boundary. The oracle answers
// here are planted (a refused result; a measuring xor made to refuse through a mock of M0-k-03's `symDiffArea`), so
// each rule meets the input that reaches it.
import type { Cm, LatticePoint } from '@plat/kernel';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { loadOracles, OracleRefusal, type OracleEngine, type OracleResult } from '../../../src/oracles/index.js';
import { perimeterOf } from '../../../src/oracles/rings.js';
import { farthestVertexCm, judge, newHarness, verdict, type Harness } from './support.js';

/** Which engine's measuring xor refuses (null: none) — the planted measurement refusal. */
const plant: { measureRefuses: OracleEngine | null } = { measureRefuses: null };

vi.mock('../../../src/oracles/oracles.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/oracles/oracles.js')>();
  return {
    ...real,
    symDiffArea: (x: Parameters<typeof real.symDiffArea>[0], y: Parameters<typeof real.symDiffArea>[1], engine: OracleEngine): number => {
      if (plant.measureRefuses === engine) throw new OracleRefusal(engine, 'planted refusal of the measuring xor');
      return real.symDiffArea(x, y, engine);
    },
  };
});

const pt = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });
const SQUARE = [pt(0, 0), pt(1000, 0), pt(1000, 1000), pt(0, 1000)];
/** A bow-tie: not a valid output ring (its edges cross), the fault no oracle is needed to see. */
const BOWTIE = [pt(0, 0), pt(1000, 1000), pt(1000, 0), pt(0, 1000)];

const answer = (e: OracleEngine): OracleResult => ({ ok: true, engine: e, rings: [SQUARE.slice()], perimeterCm: 2 * perimeterOf([SQUARE]) });
const refuse = (e: OracleEngine): OracleResult => ({ ok: false, engine: e, error: `${e}: planted refusal on its own operands`, refused: true });

beforeAll(async () => {
  await loadOracles();
});

afterEach(() => {
  plant.measureRefuses = null;
});

describe('refusals classified by step and bounded (N-39 as amended by N-40)', () => {
  it('an own-operand refusal is excluded when the other oracle still judges the case and ours is valid', () => {
    const h = newHarness();
    judge(h, 'op', 'fam', [SQUARE], (e) => (e === 'clipper2' ? refuse(e) : answer(e)), [], () => 'case');
    expect(h.refusalSteps).toEqual({ 'clipper2/own': 1 });
    expect(h.refusalsExcluded).toBe(1);
    expect(h.refusalsCounted).toBe(0);
    expect(h.allOwnRefused).toEqual({});
    expect(h.report.line('op')).toMatchObject({ draws: 1, unattracted: 1, unattractedPass: 1, unjudged: 0 });
  });

  it('it counts against the allowance when ours fails the hard ring checks', () => {
    const h = newHarness();
    judge(h, 'op', 'fam', [BOWTIE], (e) => (e === 'polygon-clipping' ? refuse(e) : answer(e)), [], () => 'case');
    expect(h.refusalSteps).toEqual({ 'polygon-clipping/own': 1 });
    expect(h.refusalsCounted).toBe(1);
    expect(h.refusalsExcluded).toBe(0);
    expect(h.invalid).toHaveLength(1);
  });

  it('it counts when the oracle that answered cannot judge the case (its measurement refused)', () => {
    const h = newHarness();
    plant.measureRefuses = 'polygon-clipping';
    judge(h, 'op', 'fam', [SQUARE], (e) => (e === 'clipper2' ? refuse(e) : answer(e)), [], () => 'case');
    expect(h.refusalSteps).toEqual({ 'clipper2/own': 1, 'polygon-clipping/measure': 1 });
    expect(h.refusalsCounted).toBe(2);
    expect(h.refusalsExcluded).toBe(0);
    expect(h.report.line('op').unjudged).toBe(1);
  });

  it('a refusal of the measuring xor is `measure` against its own oracle and `cross-check` against the other; both count', () => {
    const h = newHarness();
    plant.measureRefuses = 'clipper2';
    judge(h, 'op', 'fam', [SQUARE], answer, [], () => 'case');
    // clipper2's verdict refuses on its own xor (measure); polygon-clipping's on the cross-check through clipper2
    expect(h.refusalSteps).toEqual({ 'clipper2/measure': 1, 'polygon-clipping/cross-check': 1 });
    expect(h.refusalsCounted).toBe(2);
    expect(h.refusalsExcluded).toBe(0);
  });

  it('a case every oracle refused on its own operands is tallied per family (and excluded, ours valid)', () => {
    const h = newHarness();
    judge(h, 'op', 'fam', [SQUARE], refuse, [], () => 'case');
    judge(h, 'op', 'other', [SQUARE], answer, [], () => 'case');
    expect(h.allOwnRefused).toEqual({ fam: 1 });
    expect(h.refusalsExcluded).toBe(2);
    expect(h.refusalsCounted).toBe(0);
    expect(h.report.line('op')).toMatchObject({ draws: 1, unjudged: 1 });
  });
});

describe('the verdict’s refusal and tally bounds', () => {
  /** A harness with nothing drawn, so only the field under test can fail the verdict (a run of 0 cases). */
  const empty = (f: (h: Harness) => void): Harness => {
    const h = newHarness();
    f(h);
    return h;
  };

  it('every case every oracle refused on its own operands: at most 1 % of its family', () => {
    expect(() => {
      verdict(empty((h) => { h.sources.fam = 100; h.allOwnRefused.fam = 1; }), 'op', 0);
    }).not.toThrow();
    expect(() => {
      verdict(empty((h) => { h.sources.fam = 100; h.allOwnRefused.fam = 2; }), 'op', 0);
    }).toThrow();
    expect(() => {
      verdict(empty((h) => { h.sources.fam = 101; h.allOwnRefused.fam = 2; }), 'op', 0);
    }).not.toThrow();
  });

  it('counted refusals: at most 0.1 % of the cases (10 of 10⁴), excluded ones free', () => {
    const run = (counted: number, excluded: number): (() => void) => () => {
      const h = newHarness();
      h.refusalsCounted = counted;
      h.refusalsExcluded = excluded;
      h.report.record('op', [
        { split: 'unattracted', pass: true, refused: false, engine: 'clipper2', faces: { ours: 1, oracle: 1 }, symDiffCm2: 0, crossCheckCm2: 0, crossChecked: true, perimeterCm: 1, boundCm2: 1, failures: [] },
        { split: 'unattracted', pass: true, refused: false, engine: 'polygon-clipping', faces: { ours: 1, oracle: 1 }, symDiffCm2: 0, crossCheckCm2: 0, crossChecked: true, perimeterCm: 1, boundCm2: 1, failures: [] },
      ]);
      h.settled.planted = 9_999;
      verdict(h, 'op', 10_000);
    };
    // the guard at 10⁴ asks 1 000 unattracted draws: this harness has one, so only the guard and the refusals can speak
    expect(run(10, 500)).toThrow(/expected 1 to be greater than or equal to 1000/);
    expect(run(11, 0)).toThrow(/expected 11 to be less than or equal to 10/);
  });

  it('a W_PLACED or far-stretch case that failed fails the verdict', () => {
    expect(() => {
      verdict(empty((h) => { h.placed.cases = 1; h.placed.failed = 1; }), 'op', 0);
    }).toThrow();
    expect(() => {
      verdict(empty((h) => { h.stretchFar.cases = 1; h.stretchFar.failed = 1; }), 'op', 0);
    }).toThrow();
    expect(() => {
      verdict(empty((h) => { h.placed.cases = 3; h.stretchFar.cases = 2; }), 'op', 0);
    }).not.toThrow();
  });
});

describe('the W_PLACED and far-stretch tallies (N-40, N-41 (2))', () => {
  const pushed = [pt(0, 0), pt(1000, 0), pt(1050, 1050), pt(0, 1000)];
  it('a W_PLACED case is tallied, and failed when a verdict fails', () => {
    const h = newHarness();
    judge(h, 'op', 'fam', [SQUARE], answer, [{ code: 'W_PLACED', count: 1 }], () => 'case');
    judge(h, 'op', 'fam', [SQUARE], answer, [{ code: 'W_ATTRACTED', count: 2 }], () => 'case');
    expect(h.placed).toMatchObject({ cases: 1, failed: 0 });
    // ours 3 × 10⁶ cm² off the oracle's square: beyond the attracted bound (perimeter 8 000 cm × 36.8 cm ≈ 294 000 cm²)
    judge(h, 'op', 'fam', [[pt(0, 0), pt(2000, 0), pt(2000, 2000), pt(0, 2000)]], answer, [{ code: 'W_PLACED', count: 1 }], () => 'case');
    expect(h.placed).toMatchObject({ cases: 2, failed: 1 });
  });

  it('a W_STRETCH_SHARED case is tallied when a vertex of ours lies beyond √2 · attractCm of the oracle’s boundary', () => {
    const h = newHarness();
    // 50·√2 ≈ 70.7 cm out: tallied; the area (≈ 50 000 cm²) within the attracted bound, so it passes
    judge(h, 'op', 'fam', [pushed], answer, [{ code: 'W_STRETCH_SHARED', count: 1 }], () => 'case');
    // 20·√2 ≈ 28.3 cm out: within √2 · attractCm (36.8 cm), not tallied
    judge(h, 'op', 'fam', [[pt(0, 0), pt(1000, 0), pt(1020, 1020), pt(0, 1000)]], answer, [{ code: 'W_STRETCH_SHARED', count: 1 }], () => 'case');
    // far, but no shared stretch reported: not tallied
    judge(h, 'op', 'fam', [pushed], answer, [{ code: 'W_ATTRACTED', count: 1 }], () => 'case');
    expect(h.stretchFar.cases).toBe(1);
    expect(h.stretchFar.failed).toBe(0);
    expect(h.stretchFar.maxCm).toBeCloseTo(50 * Math.SQRT2, 9);
    expect(h.failures).toEqual([]);
  });
});

describe('the far-stretch measure (N-41 (2))', () => {
  it('is the farthest vertex of ours from the oracle’s boundary', () => {
    expect(farthestVertexCm([SQUARE], [SQUARE])).toBe(0);
    // one vertex pushed 50 cm out past the corner (1000, 1000): 50·√2 from it
    const pushed = [pt(0, 0), pt(1000, 0), pt(1050, 1050), pt(0, 1000)];
    expect(farthestVertexCm([pushed], [SQUARE])).toBeCloseTo(50 * Math.SQRT2, 9);
    // a vertex 40 cm inside an edge's middle
    expect(farthestVertexCm([[pt(0, 0), pt(1000, 0), pt(500, 40)]], [SQUARE])).toBeCloseTo(40, 9);
    expect(farthestVertexCm([SQUARE], [])).toBe(Infinity);
    expect(farthestVertexCm([], [SQUARE])).toBe(0);
  });
});
