// M0-a-08's judge and verdict pinned where the agreement runs cannot fail on them (the spec notes N-39, N-40, N-41 (2);
// C-0150; C-0206): a refused verdict is classified by the step that refused — the oracle's own answer on the case's
// operands, the measurement of |ours Δ oracle| through that oracle's xor, or the cross-check through the other's — and
// an own-operand refusal is excluded from C-0150's 0.1 % allowance only when every oracle that answered still judges the
// case and our result passes the hard ring checks; cases every oracle refused on its own operands are capped at 1 % of
// their family; the far-stretch measure is the farthest vertex of ours from the oracle's boundary. The oracle answers
// here are planted (a refused result; a measuring xor made to refuse through a mock of M0-k-03's `symDiffArea`), so
// each rule meets the input that reaches it. The agreement runs' seed, size and cap per size, and the seed every
// verdict line, message and logged refusal carries (L18's test half; Q97), are pinned in the last describe.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import fc from 'fast-check';
import { faceEdges, insetRing, type Cm, type KernelResult, type LatticePoint } from '@plat/kernel';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { compareSplit, loadOracles, OracleRefusal, type OracleEngine, type OracleResult } from '../../../src/oracles/index.js';
import { perimeterOf } from '../../../src/oracles/rings.js';
import { replaySeed } from '../../../src/oracles/refusal.js';
import { seedFamily } from '../../../src/fuzz/index.js';
import {
  agreementParams,
  agreementRefusalCap,
  arenaFace,
  classifyRefusal,
  farthestVertexCm,
  insertChainRefusalCap,
  INSET_FRAME_CM,
  insetFrameExponent,
  insetLeavesLattice,
  judge,
  judgeInset,
  newHarness,
  oracleInset,
  oracleOffset,
  ownRefusalCap,
  poissonCap,
  REFUSAL_MEASURE,
  refusalCapPer1e4,
  replayOverlay,
  replayTag,
  ringsOfEdges,
  RUNS,
  runAgreement,
  separateRefusal,
  touchMergedFaceCount,
  verdict,
  warningsOf,
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

const sq = (x: number, y: number, s: number): LatticePoint[] => [pt(x, y), pt(x + s, y), pt(x + s, y + s), pt(x, y + s)];
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

  it('ours is held to the hard ring checks on an unattracted case too: a duplicated face passes the region comparison, not the judge (M0-k-03 N1)', () => {
    // ours [square, square, triangle] against the union of the square and the triangle: the same region, two faces
    // each side, |Δ| 0 — the comparison passes; the doubled square's overlapping edges are an invalid output
    const tri = [pt(3000, 0), pt(4000, 0), pt(3500, 800)];
    const union = (e: OracleEngine): OracleResult => ({ ok: true, engine: e, rings: [SQUARE.slice(), tri.slice()], perimeterCm: 2 * perimeterOf([SQUARE, tri]) });
    expect(compareSplit([SQUARE, SQUARE, tri], union('clipper2'), [])).toMatchObject({ split: 'unattracted', pass: true });
    const h = newHarness();
    judge(h, 'op', 'fam', [SQUARE, SQUARE, tri], union, [], () => 'case');
    expect(h.report.line('op')).toMatchObject({ draws: 1, unattracted: 1, unattractedPass: 1 });
    expect(h.invalid).toEqual(['op [fam]: invalid: crossing edges — case']);
    expect(h.failures).toEqual([]);
    h.settled.planted = 9_999;
    // the verdict's first failing line is the invalid output's (the comparison and the failures list are clean)
    expect(() => {
      verdict(h, 'op', 10_000);
    }).toThrow(/expected \[ Array\(1\) \] to deeply equal \[\]/);
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

  it('the snap-rounded re-judge excuses the face count alone, never an area its snapped rings take past the bound (C-0196 (7))', () => {
    // ours: two squares touching at a corner; the oracle: the same squares joined by a neck whose corners stand 2.6 cm
    // from the touch point (the two triangles outside ours: 6.76 cm²). With the bound planted at 8 cm² the first verdict
    // fails on the face count alone; snap-rounded, the neck's corners round to 3 cm (9 cm²), so the re-judged verdict
    // fails on the area too — and stays a failure, though the touch-merged counts agree (1 and 1)
    const joined = (e: OracleEngine): OracleResult => ({
      ok: true,
      engine: e,
      rings: [[pt(0, 0), pt(1000, 0), pt(1000, 997.4), pt(1002.6, 1000), pt(2000, 1000), pt(2000, 2000), pt(1000, 2000), pt(1000, 1002.6), pt(997.4, 1000), pt(0, 1000)]],
      perimeterCm: 8,
    });
    const touching = [sq(0, 0, 1000), sq(1000, 1000, 1000)];
    const first = compareSplit(touching, joined('clipper2'), []);
    expect(first.failures).toEqual(['faces']);
    const h = newHarness();
    judge(h, 'op', 'fam', touching, joined, [], () => 'case');
    expect(h.snapRounded).toEqual({ clipper2: 1, 'polygon-clipping': 1 });
    expect(h.failures).toHaveLength(1);
    expect(h.failures[0]).toMatch(/: faces, area \(faces 2\/1, \|Δ\| 9\.0 ≤ 8\.0\?\)/);
    expect(h.report.line('op')).toMatchObject({ draws: 1, unattractedPass: 0 });
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

describe('the inset oracle’s scaled frame (C-0261)', () => {
  it('takes the largest power of two that keeps the strips’ reach inside the frame, and refuses past it', () => {
    expect(insetFrameExponent(INSET_FRAME_CM)).toBe(-1);
    expect(insetFrameExponent(Number.POSITIVE_INFINITY)).toBe(-1);
    expect(insetFrameExponent(Number.NaN)).toBe(-1);
    expect(insetFrameExponent(INSET_FRAME_CM - 1)).toBe(0);
    expect(insetFrameExponent(INSET_FRAME_CM / 2)).toBe(0);
    expect(insetFrameExponent(INSET_FRAME_CM / 2 - 1)).toBe(1);
    for (const reach of [1, 4_321, 123_456.7, 1_999_999]) {
      const k = insetFrameExponent(reach);
      expect(2 ** k * reach).toBeLessThan(INSET_FRAME_CM);
      expect(2 ** (k + 1) * reach).toBeGreaterThanOrEqual(INSET_FRAME_CM);
    }
  });
});

describe('the inset oracle’s construction at the largest k, and its rounding back (C-0261)', () => {
  // thin triangles inset outward whose strips' reach leaves k = 1: a frame of 2¹ keeps the construction's error far
  // inside the bound, where the unscaled frame (S = 1) puts it near 0.7 of the bound on a correct answer of ours
  const thin: [[number, number][], number][] = [
    [[[59244, -45249], [59551, -45129], [47908, -15657]], -1622],
    [[[-19690, 3888], [-19453, 3930], [-23533, 26231]], -2412],
  ];
  it('builds in the frame 2ᵏ for the largest k that fits, also where k is 1 – 3', () => {
    for (const [xy, d] of thin) {
      const af = arenaFace([xy.map(([x, y]) => pt(x, y))]);
      expect(af).not.toBeNull();
      if (af === null) return;
      const [face] = ringsOfEdges(faceEdges(af.tx, af.face));
      const ours = insetRing(af.tx, af.face, d);
      expect(ours.ok).toBe(true);
      for (const e of ['clipper2', 'polygon-clipping'] as const) {
        const v = compareSplit(ours, oracleInset(face, d, e), warningsOf(ours));
        expect(v.split, e).toBe('unattracted');
        expect(v.pass, e).toBe(true);
        expect(v.symDiffCm2 / v.boundCm2, e).toBeLessThan(0.3);
      }
    }
  });

  it('drops a ring the final rounding leaves without area: a sub-centimetre sliver is no face (the exact inset is not empty)', () => {
    // inradius 275.11 cm: inset by 275 the exact result is a triangle about 0.7 cm across, which rounds to one or two
    // lattice points
    const tri = [pt(0, 0), pt(674, -37), pt(753, 1713)];
    for (const e of ['clipper2', 'polygon-clipping'] as const) {
      const r = oracleInset(tri, 275, e);
      expect(r).toMatchObject({ ok: true, rings: [] });
      expect(oracleInset(tri, 274, e)).toMatchObject({ ok: true, rings: [expect.any(Array)] });
    }
  });
});

describe('the face services’ judges on planted answers (C-0206 (9); §3.7 Insets)', () => {
  const OCTAGON = [pt(-14207, 9163), pt(-13985, 9255), pt(-13893, 9477), pt(-13985, 9699), pt(-14207, 9791), pt(-14429, 9699), pt(-14521, 9477), pt(-14429, 9255)];
  const L_FACE = [pt(0, 0), pt(3000, 0), pt(3000, 1000), pt(1000, 1000), pt(1000, 3000), pt(0, 3000)];
  const planted = (r: KernelResult<LatticePoint[][]>): typeof insetRing => () => r;

  it('an E_OUT_OF_RANGE on a face whose exact outward inset stays inside the lattice is a failure, never settled', () => {
    const h = newHarness();
    judgeInset(h, { rings: [OCTAGON], dists: [-100], source: 'planted' }, planted({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'planted' }));
    expect(h.settled).toEqual({});
    expect(h.failures.length).toBeGreaterThan(0);
    expect(h.failures[0]).toMatch(/^insetRing \[planted\]: E_OUT_OF_RANGE planted on a convex face/);
    // the same answer where the exact inset does leave the lattice (pins.test.ts' gate face) is settled
    const edge = [pt(8222703, 1266939), pt(8388126, 1419952), pt(8371635, 1644687), pt(8185648, 1771914), pt(7970217, 1705829), pt(7887566, 1496194), pt(7999933, 1300870)];
    const h2 = newHarness();
    judgeInset(h2, { rings: [edge], dists: [-634], source: 'planted' }, planted({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'planted' }));
    expect(h2.settled).toEqual({ 'E_OUT_OF_RANGE: the outward inset leaves the lattice': 1 });
    expect(h2.failures).toEqual([]);
  });

  it('a non-convex face is settled only on E_NON_CONVEX: any other answer of ours is a failure', () => {
    const h = newHarness();
    judgeInset(h, { rings: [L_FACE], dists: [100], source: 'planted' }, planted({ ok: true, value: [L_FACE.slice()], warnings: [] }));
    judgeInset(h, { rings: [L_FACE], dists: [100], source: 'planted' }, planted({ ok: false, code: 'E_DEGENERATE', detail: 'collapsed' }));
    expect(h.settled).toEqual({});
    expect(h.failures).toHaveLength(2);
    for (const f of h.failures) expect(f).toMatch(/^insetRing \[planted\]: a non-convex face not refused E_NON_CONVEX/);
    // our real answer on it is settled
    const h2 = newHarness();
    judgeInset(h2, { rings: [L_FACE], dists: [100], source: 'planted' });
    expect(h2.settled).toEqual({ 'E_NON_CONVEX on a non-convex face': 1 });
    expect(h2.failures).toEqual([]);
  });

  it('oracleOffset’s covered face: empty only where an edge’s distance reaches its farthest vertex', () => {
    // a 10 m square, its bottom edge set back by d: every face vertex lies within 10 m of it (the top ones farthest)
    const square = [pt(0, 0), pt(1000, 0), pt(1000, 1000), pt(0, 1000)];
    const edges = square.map((a, i) => ({ a, b: square[(i + 1) % 4] }));
    for (const e of ['clipper2', 'polygon-clipping'] as const) {
      // 7 m: past half the farthest distance, short of it — the 3 m strip along the top is left
      const r = oracleOffset([square], edges, [700, 0, 0, 0], e);
      expect(r.ok, e).toBe(true);
      if (!r.ok) return;
      expect(r.rings, e).toHaveLength(1);
      const area = Math.abs(r.rings[0].reduce((s, q, i) => s + q.x * r.rings[0][(i + 1) % r.rings[0].length].y - r.rings[0][(i + 1) % r.rings[0].length].x * q.y, 0)) / 2;
      expect(Math.abs(area - 300_000), e).toBeLessThan(2_000);
      // 10 m: the whole face
      expect(oracleOffset([square], edges, [1000, 0, 0, 0], e)).toMatchObject({ ok: true, rings: [] });
    }
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

  it('binds each family to its own measured cap: the guard alone at the cap, the cap’s failure one above it', () => {
    for (const op of Object.keys(REFUSAL_MEASURE)) {
      const cap = insertChainRefusalCap(op, 10_000);
      const run = (ic: number): (() => void) => () => {
        const h = newHarness();
        h.engineRefusals.insertChain = ic;
        h.settled.planted = 10_000 - ic;
        verdict(h, op, 10_000);
      };
      expect(run(cap), op).toThrow(/expected 0 to be greater than or equal to 1000/);
      expect(run(cap + 1), op).toThrow(`insertChain's refusals in ${op} against the measured cap`);
    }
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

describe('the agreement runs replay from their seed and cap refusals per size (L18’s test half; Q97)', () => {
  /** Runs `fn` with fast-check's global seed set to `seed` (as PLAT_FUZZ_SEED sets it), the configuration restored after. */
  function withGlobalSeed<T>(seed: number, fn: () => T): T {
    const before = fc.readConfigureGlobal();
    fc.configureGlobal({ ...before, seed });
    try {
      return fn();
    } finally {
      fc.configureGlobal(before);
    }
  }
  const OPS = ['union', 'intersection', 'difference', 'xor', 'buffer', 'offsetFace', 'insetRing'] as const;
  /** Each operation's fixed H32 seed, `arr/agreement/<op>` (M0-k-01's seedFamily, read as fast-check's 32-bit integer). */
  const FIXED: Record<(typeof OPS)[number], number> = {
    union: 97_611_058,
    intersection: 282_201_358,
    difference: 1_687_073_738,
    xor: 1_396_134_398,
    buffer: 1_944_718_479,
    offsetFace: 1_708_969_334,
    insetRing: 1_915_370_055,
  };

  it('each operation’s seed: PLAT_FUZZ_SEED’s when set, else its fixed H32 seed; the size PLAT_FUZZ_RUNS', () => {
    for (const op of OPS) {
      expect(seedFamily(`arr/agreement/${op}`, 0) | 0, op).toBe(FIXED[op]);
      expect(agreementParams(op), op).toEqual({ numRuns: RUNS, seed: replaySeed() ?? FIXED[op] });
      expect(withGlobalSeed(1595, () => agreementParams(op)), op).toEqual({ numRuns: RUNS, seed: 1595 });
    }
    expect(new Set(OPS.map((op) => FIXED[op])).size).toBe(OPS.length);
  });

  it('caps the counted oracle refusals at max(1, ⌈0.001 × runs⌉): 1 at 10³, 10 at 10⁴, 1 000 at 10⁶', () => {
    expect([1_000, 10_000, 1_000_000, 12_345, 1, 0].map(agreementRefusalCap)).toEqual([1, 10, 1_000, 13, 1, 1]);
  });

  it('a run hands its seed to fast-check with its size: the same seed draws the same cases, another seed others', () => {
    /** The cases one planted run draws (each settled, so only the vacuity guard can fail its verdict) and its verdict's message. */
    const drawn = (seed: number): { cases: number[]; message: string } => {
      const cases: number[] = [];
      let message = '';
      try {
        runAgreement('op', fc.integer(), (h, c) => {
          cases.push(c);
          h.settled.planted = (h.settled.planted ?? 0) + 1;
        }, { numRuns: 20, seed });
      } catch (e) {
        message = (e as Error).message;
      }
      return { cases, message };
    };
    const a = drawn(1595);
    expect(a.cases).toHaveLength(20);
    expect(drawn(1595).cases).toEqual(a.cases);
    expect(drawn(1596).cases).not.toEqual(a.cases);
    // the planted run draws no unattracted case: its verdict fails on the guard alone, the message naming the seed
    expect(a.message).toBe('arr/op (seed 1595; replay with PLAT_FUZZ_SEED=1595): the vacuity guard: expected 0 to be greater than or equal to 2');
  });

  it('a refusal line carries the seed that replays it: a planted refusal through the harness, the line and the message pinned', () => {
    const h = newHarness(1595);
    // clipper2 refuses on its own operands and polygon-clipping's measuring xor refuses: two counted refusals, one case
    plant.measureRefuses = 'polygon-clipping';
    judge(h, 'op', 'fam', [SQUARE], (e) => (e === 'clipper2' ? refuse(e) : answer(e)), [], () => 'case');
    expect(h.refusalsCounted).toBe(2);
    const lines: string[] = [];
    const spy = vi.spyOn(console, 'info').mockImplementation((m: string) => {
      lines.push(m);
    });
    try {
      expect(() => {
        verdict(h, 'op', 1);
      }).toThrow('arr/op (seed 1595; replay with PLAT_FUZZ_SEED=1595): counted oracle refusals against the cap 1 at 1 cases: expected 2 to be less than or equal to 1');
    } finally {
      spy.mockRestore();
    }
    expect(lines).toEqual([
      'arr/op: seed 1595 — 1 cases — drawn 0 (unattracted 0, share 0.000; attracted 0, share 0.000); passed 0 + 0; refusals {"clipper2":1,"polygon-clipping":1} by step {"clipper2/own":1,"polygon-clipping/measure":1} (counted 2 of cap 1, excluded 0, every oracle on its own operands {}); unjudged 1; settled {}; W_PLACED cases 0 (failed 0); stretch beyond √2·attractCm 0 (failed 0, farthest 0.0 cm); snap-rounded {}; sources {"fam":1}; guard 1; refused by our engine: insertChain\'s 0 (setup 0; cap 1), own 0 (cap 1) {} (seed 1595; replay with PLAT_FUZZ_SEED=1595)',
    ]);
    expect(replayTag(null)).toBe('seed none (an unseeded harness)');
  });

  it('a refused case logged for the register carries the harness’s seed (PLAT_REFUSALS_OUT)', () => {
    const dir = mkdtempSync(join(tmpdir(), 'a08-s5-'));
    const file = join(dir, 'refused.jsonl');
    vi.stubEnv('PLAT_REFUSALS_OUT', file);
    try {
      const noRoute = { ok: false, code: 'E_INVARIANT', detail: 'insert: no route from (0, 0) to (10, 0) keeps clearance (§3.10) within the fidelity bound (N-43)' } as KernelResult<LatticePoint[][]>;
      expect(separateRefusal(newHarness(1595), 'buffer', 'fam', noRoute, () => null, { case: 1 })).toBe(true);
      const logged = readFileSync(file, 'utf8').trim().split('\n').map((l) => JSON.parse(l) as { seed: string | null; op: string; cls: string });
      expect(logged).toHaveLength(1);
      expect(logged[0]).toMatchObject({ op: 'buffer', cls: 'own', seed: '1595' });
    } finally {
      vi.unstubAllEnvs();
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
