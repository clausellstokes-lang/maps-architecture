// M0-a-08's judge and verdict pinned where the agreement runs cannot fail on them (the spec notes N-39, N-40, N-41 (2);
// C-0150; C-0206): a refused verdict is classified by the step that refused — the oracle's own answer on the case's
// operands, the measurement of |ours Δ oracle| through that oracle's xor, or the cross-check through the other's — and
// an own-operand refusal is excluded from C-0150's 0.1 % allowance only when every oracle that answered still judges the
// case and our result passes the hard ring checks; cases every oracle refused on its own operands are capped at 1 % of
// their family; the far-stretch measure is the farthest vertex of ours from the oracle's boundary. The oracle answers
// here are planted (a refused result; a measuring xor made to refuse through a mock of M0-k-03's `symDiffArea`), so
// each rule meets the input that reaches it.
import type { Cm, KernelResult, LatticePoint } from '@plat/kernel';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { loadOracles, OracleRefusal, type OracleEngine, type OracleResult } from '../../../src/oracles/index.js';
import { perimeterOf } from '../../../src/oracles/rings.js';
import {
  classifyRefusal,
  farthestVertexCm,
  insertChainRefusalCap,
  insetLeavesLattice,
  judge,
  newHarness,
  ownRefusalCap,
  poissonCap,
  REFUSAL_MEASURE,
  refusalCapPer1e4,
  replayOverlay,
  separateRefusal,
  touchMergedFaceCount,
  verdict,
  type Harness,
  type OverlayReplay,
} from './support.js';

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

describe('faces touching at a point counted as one (C-0206 (8))', () => {
  const sq = (x: number, y: number, s: number): LatticePoint[] => [pt(x, y), pt(x + s, y), pt(x + s, y + s), pt(x, y + s)];
  it('joins faces that share a vertex or meet at a vertex inside an edge, and nothing else', () => {
    expect(touchMergedFaceCount([sq(0, 0, 1000), sq(1000, 1000, 1000)])).toBe(1);
    expect(touchMergedFaceCount([sq(0, 0, 1000), [pt(1000, 500), pt(1500, 0), pt(2000, 500), pt(1500, 1000)]])).toBe(1);
    expect(touchMergedFaceCount([sq(0, 0, 1000), sq(1001, 1001, 1000)])).toBe(2);
    expect(touchMergedFaceCount([sq(0, 0, 1000), sq(1000, 1000, 1000), sq(5000, 0, 10)])).toBe(2);
    expect(touchMergedFaceCount([])).toBe(0);
    // a corner of the first face on an edge of the second (the edge x + y = 2 000 through (1 000, 1 000))
    expect(touchMergedFaceCount([sq(0, 0, 1000), [pt(500, 1500), pt(1500, 500), pt(2000, 2000)]])).toBe(1);
    expect(touchMergedFaceCount([sq(0, 0, 1000), [pt(500, 1501), pt(1500, 501), pt(2000, 2000)]])).toBe(2);
  });

  it('excuses an unattracted face-count mismatch only when the touch-merged counts agree', () => {
    const touching = [sq(0, 0, 1000), sq(1000, 1000, 1000)];
    const joined: OracleResult[] = (['clipper2', 'polygon-clipping'] as const).map((e) => ({
      ok: true,
      engine: e,
      // the same two squares joined by an 18 cm² neck at the corner, its corners 3 cm apart (no hot-pixel cluster): one face
      rings: [[pt(0, 0), pt(1000, 0), pt(1000, 997), pt(1003, 1000), pt(2000, 1000), pt(2000, 2000), pt(1000, 2000), pt(1000, 1003), pt(997, 1000), pt(0, 1000)]],
      perimeterCm: 16_000,
    }));
    const h = newHarness();
    judge(h, 'op', 'fam', touching, (e) => joined[e === 'clipper2' ? 0 : 1], [], () => 'case');
    expect(h.failures).toEqual([]);
    expect(h.snapRounded).toMatchObject({ 'clipper2/touch': 1, 'polygon-clipping/touch': 1 });
    // two faces apart against one: not excused
    const h2 = newHarness();
    judge(h2, 'op', 'fam', [sq(0, 0, 1000), sq(1002, 1002, 1000)], (e) => joined[e === 'clipper2' ? 0 : 1], [], () => 'case');
    expect(h2.failures).toHaveLength(1);
  });
});

describe('an outward inset that leaves the lattice (C-0206 (9))', () => {
  const ring = [pt(8222703, 1266939), pt(8388126, 1419952), pt(8371635, 1644687), pt(8185648, 1771914), pt(7970217, 1705829), pt(7887566, 1496194), pt(7999933, 1300870)];
  it('is settled only when the exact inset reaches 2²³', () => {
    expect(insetLeavesLattice(ring, -634)).toBe(true);
    // the face's rightmost vertex stands 481 cm inside the lattice's edge: an outward inset of 400 cm stays inside
    expect(insetLeavesLattice(ring, -400)).toBe(false);
    expect(insetLeavesLattice(ring.map((p) => pt(p.x - 10_000, p.y)), -634)).toBe(false);
  });
});

describe('our engine’s refusals, out of the oracle comparison and classed by replay (N-44 (3), N-46 (5); C-0231)', () => {
  const noRoute = { code: 'E_INVARIANT', detail: 'insert: no route from (0, 0) to (10, 0) keeps clearance (§3.10) within the fidelity bound (N-43)' };
  const refused = (r: { code: string; detail: string }): KernelResult<LatticePoint[][]> => ({ ok: false, code: r.code as 'E_INVARIANT', detail: r.detail });
  const replayed = (r: { code: string; detail: string }, chain = [pt(0, 0), pt(10, 0)]): OverlayReplay => ({ ...r, chain, closed: false });

  it('a refusal insertChain alone meets again (same code and detail, a chain of distinct points) is insertChain’s', () => {
    expect(classifyRefusal(noRoute, replayed(noRoute))).toBe('insertChain');
    expect(classifyRefusal(noRoute, null)).toBe('own');
    expect(classifyRefusal(noRoute, replayed({ ...noRoute, detail: `${noRoute.detail} ` }))).toBe('own');
    expect(classifyRefusal(noRoute, replayed({ ...noRoute, code: 'E_BELOW_MIN_EDGE' }))).toBe('own');
    expect(classifyRefusal(noRoute, replayed(noRoute, [pt(0, 0), pt(0, 0)]))).toBe('own');
  });

  it('takes out E_INVARIANT and E_BELOW_MIN_EDGE refusals only, tallied by class; a commit and any other refusal go to the judge', () => {
    const h = newHarness();
    let replays = 0;
    const rp = (r: OverlayReplay | null) => (): OverlayReplay | null => {
      replays += 1;
      return r;
    };
    expect(separateRefusal(h, 'buffer', 'fam', refused(noRoute), rp(replayed(noRoute)), { case: 1 })).toBe(true);
    expect(separateRefusal(h, 'buffer', 'fam', refused({ code: 'E_INVARIANT', detail: 'winding' }), rp(null), { case: 2 })).toBe(true);
    expect(separateRefusal(h, 'buffer', 'fam', refused({ code: 'E_BELOW_MIN_EDGE', detail: 'x (N-43)' }), rp(replayed({ code: 'E_BELOW_MIN_EDGE', detail: 'x (N-43)' })), {})).toBe(true);
    expect(replays).toBe(3);
    // a committed result — even one far from the oracle — and an empty or out-of-range refusal are the judge's
    expect(separateRefusal(h, 'buffer', 'fam', { ok: true, value: [SQUARE], warnings: [] }, rp(null), {})).toBe(false);
    expect(separateRefusal(h, 'buffer', 'fam', refused({ code: 'E_DEGENERATE', detail: 'empty' }), rp(null), {})).toBe(false);
    expect(separateRefusal(h, 'buffer', 'fam', refused({ code: 'E_OUT_OF_RANGE', detail: 'buffer' }), rp(null), {})).toBe(false);
    expect(replays).toBe(3);
    expect(h.engineRefusals).toMatchObject({ insertChain: 2, own: 1, setup: 0, byCode: { 'insertChain/E_INVARIANT': 1, 'own/E_INVARIANT': 1, 'insertChain/E_BELOW_MIN_EDGE': 1 } });
    expect(h.engineRefusals.ownCases).toEqual([`buffer [fam]: E_INVARIANT 'winding' — {"case":2}`]);
    expect(h.report.line('buffer').draws).toBe(0);
    expect(h.failures).toEqual([]);
  });

  it('a committed result that disagrees with the oracle stays a failure', () => {
    const h = newHarness();
    const ours: KernelResult<LatticePoint[][]> = { ok: true, value: [[pt(0, 0), pt(2000, 0), pt(2000, 2000), pt(0, 2000)]], warnings: [] };
    if (!separateRefusal(h, 'op', 'fam', ours, () => null, {})) judge(h, 'op', 'fam', ours, answer, [], () => 'case');
    expect(h.failures).toHaveLength(1);
    expect(h.engineRefusals).toMatchObject({ insertChain: 0, own: 0 });
  });

  it('the replay on insertChain alone commits a plain overlay and meets nothing (null)', () => {
    expect(replayOverlay([[SQUARE], [[pt(500, 500), pt(1500, 500), pt(1500, 1500), pt(500, 1500)]]])).toBeNull();
    expect(replayOverlay([[]])).toBeNull();
  });
});

describe('the refusal caps (N-44 (3); N-46 (4), (5); C-0231)', () => {
  it('this item’s own: 1 per 10⁴ cases', () => {
    expect(ownRefusalCap(10_000)).toBe(1);
    expect(ownRefusalCap(1_000)).toBe(1);
    expect(ownRefusalCap(1_000_000)).toBe(100);
    expect(ownRefusalCap(0)).toBe(0);
  });

  it('insertChain’s: (count + 3 · √count) ÷ seeds per 10⁴, one run’s 99.9 % Poisson point of it scaled to the run', () => {
    expect(poissonCap(0)).toBe(1);
    expect(poissonCap(1)).toBe(5);
    expect(poissonCap(10)).toBe(21);
    // the nightly size: a mean where exp(−mean) underflows still ends, near the normal 99.9 % point mean + 3.09 · √mean
    for (const mean of [700, 7_637, 36_459]) {
      const c = poissonCap(mean);
      expect(c).toBeGreaterThan(mean + 3 * Math.sqrt(mean));
      expect(c).toBeLessThan(mean + 3.3 * Math.sqrt(mean));
    }
    expect(insertChainRefusalCap('buffer', 1_000_000)).toBe(poissonCap(refusalCapPer1e4('buffer')! * 100));
    for (const [op, m] of Object.entries(REFUSAL_MEASURE)) {
      expect(m.seeds, op).toBeGreaterThanOrEqual(12);
      expect(refusalCapPer1e4(op)).toBeCloseTo((m.count + 3 * Math.sqrt(m.count)) / m.seeds, 12);
      expect(insertChainRefusalCap(op, 10_000)).toBe(poissonCap(((m.count + 3 * Math.sqrt(m.count)) / m.seeds)));
    }
    // an operation not measured is held to the own cap
    expect(refusalCapPer1e4('op')).toBeNull();
    expect(insertChainRefusalCap('op', 10_000)).toBe(1);
  });

  it('the verdict counts both classes in its accounting and fails above either cap', () => {
    const cap = insertChainRefusalCap('buffer', 10_000);
    const run = (ic: number, own: number, settled = 10_000 - ic - own): (() => void) => () => {
      const h = newHarness();
      h.engineRefusals.insertChain = ic;
      h.engineRefusals.own = own;
      h.settled.planted = settled;
      verdict(h, 'buffer', 10_000);
    };
    // within both caps: only the vacuity guard (no unattracted draw here) speaks
    expect(run(cap, 1)).toThrow(/expected 0 to be greater than or equal to 1000/);
    expect(run(cap + 1, 0)).toThrow(/insertChain's refusals in buffer against the measured cap/);
    expect(run(0, 2)).toThrow(/refusals caused in arr\/ \(or without a replay\) in buffer/);
    // a refused case is a case of the run: left out of the accounting, the sum misses it
    expect(run(1, 0, 10_000)).toThrow(/expected 10001 to be 10000/);
  });
});
