// M0-k-03's unit tests of the two oracle adapters (§3.7, §3.4's `booleans` and `buffer` arguments): known areas and
// face counts on both engines, the fill rules (polygon-clipping's conversion, C-0144 (2)), the integer frame of every
// output, the refusals, and §3.7's buffer construction — strips, the three joins, the three ends, varying half-widths —
// against hand-computed areas and against Clipper2's own offsetting (an independent algorithm, C-0144 (4)) — and the
// retries and typed refusal behind every library answer (C-0150).
import { beforeAll, describe, expect, it } from 'vitest';
import { loadOracles, oracleBoolean, oracleBuffer, symDiffArea } from '../../src/oracles/index.js';
import { resultOfThrow } from '../../src/oracles/oracles.js';
import { polygonClippingUnionPieces, underTurns, type PcMultiPolygon } from '../../src/oracles/polygon-clipping.js';
import { clipper2BooleanRaw, clipper2UnionPieces } from '../../src/oracles/clipper2.js';
import { OracleRefusal, isOracleRefusal, replaySeed } from '../../src/oracles/refusal.js';
import { arcSteps, bufferParts, maxArcStep, SAGITTA_CM } from '../../src/oracles/buffer-parts.js';
import { clipper2Inflate } from '../../src/oracles/clipper2.js';
import { faceCount } from '../../src/oracles/faces.js';
import { area2Of, perimeterOf } from '../../src/oracles/rings.js';
import { ORACLE_ENGINES, type OracleEngine, type OracleResult, type Ring } from '../../src/oracles/types.js';
import { P, R, rect, reversed } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

function rings(r: OracleResult): Ring[] {
  if (!r.ok) throw new Error(`oracle failed: ${r.error}`);
  return r.rings;
}

function area(r: OracleResult): number {
  return Number(area2Of(rings(r))) / 2;
}

/** The farthest `snap` moves a point (half a lattice diagonal): an area moves at most this × the boundary it moves. */
const SNAP = Math.SQRT1_2;

const A = [rect(0, 0, 1_000, 1_000)];
const B = [rect(500, 500, 1_500, 1_500)];

describe.each(ORACLE_ENGINES.map((e) => [e]))('the %s oracle', (engine: OracleEngine) => {
  it('computes the four operations on two overlapping squares', () => {
    expect(area(oracleBoolean('union', A, B, 'nonzero', engine))).toBe(1_750_000);
    expect(area(oracleBoolean('intersection', A, B, 'nonzero', engine))).toBe(250_000);
    expect(area(oracleBoolean('difference', A, B, 'nonzero', engine))).toBe(750_000);
    expect(area(oracleBoolean('xor', A, B, 'nonzero', engine))).toBe(1_500_000);
    expect(faceCount(rings(oracleBoolean('union', A, B, 'evenodd', engine)))).toBe(1);
    // A \ B and B \ A meet at two corner points only: two faces.
    expect(faceCount(rings(oracleBoolean('xor', A, B, 'evenodd', engine)))).toBe(2);
  });

  it('returns no rings for an empty result, and two faces for a disjoint union', () => {
    const far = [rect(5_000, 0, 6_000, 1_000)];
    expect(rings(oracleBoolean('intersection', A, far, 'nonzero', engine))).toEqual([]);
    expect(faceCount(rings(oracleBoolean('union', A, far, 'nonzero', engine)))).toBe(2);
  });

  it('reads each operand by the declared fill rule', () => {
    const twoSquares = [rect(0, 0, 1_000, 1_000), rect(500, 500, 1_500, 1_500)];
    expect(area(oracleBoolean('union', twoSquares, [], 'nonzero', engine))).toBe(1_750_000);
    expect(area(oracleBoolean('union', twoSquares, [], 'evenodd', engine))).toBe(1_500_000);
    // A counter-clockwise ring inside another: winding 2 (filled under non-zero, a hole under even-odd).
    const nestedSame = [rect(0, 0, 1_000, 1_000), rect(250, 250, 750, 750)];
    expect(area(oracleBoolean('union', nestedSame, [], 'nonzero', engine))).toBe(1_000_000);
    expect(area(oracleBoolean('union', nestedSame, [], 'evenodd', engine))).toBe(750_000);
    // b's rule as well: under even-odd b is a frame and a less b keeps the middle; under non-zero b covers all of a
    expect(area(oracleBoolean('difference', [rect(0, 0, 1_000, 1_000)], nestedSame, 'evenodd', engine))).toBe(250_000);
    expect(rings(oracleBoolean('difference', [rect(0, 0, 1_000, 1_000)], nestedSame, 'nonzero', engine))).toEqual([]);
    // A clockwise hole: a hole under both rules.
    const holed = [rect(0, 0, 1_000, 1_000), reversed(rect(250, 250, 750, 750))];
    expect(area(oracleBoolean('union', holed, [], 'nonzero', engine))).toBe(750_000);
    expect(area(oracleBoolean('union', holed, [], 'evenodd', engine))).toBe(750_000);
  });

  it('reads a self-crossing ring by the fill rule: the pentagram keeps its centre only under non-zero', () => {
    const star: Ring = [0, 2, 4, 1, 3].map((k) => {
      const t = Math.PI / 2 + (k * 2 * Math.PI) / 5;
      return P(1_000 * Math.cos(t), 1_000 * Math.sin(t));
    });
    const nz = area(oracleBoolean('union', [star], [], 'nonzero', engine));
    const eo = area(oracleBoolean('union', [star], [], 'evenodd', engine));
    // The centre pentagon of a radius-1000 pentagram has area ≈ 0.1459 × the outer pentagon's (≈ 2 377 641 cm²).
    expect(nz - eo).toBeGreaterThan(330_000);
    expect(nz - eo).toBeLessThan(365_000);
    expect(faceCount(rings(oracleBoolean('union', [star], [], 'evenodd', engine)))).toBe(5);
  });

  it('returns rings in our integer frame', () => {
    const tilted = [R([0, 0], [1_001, 337], [640, 1_500], [-200, 880])];
    const out = rings(oracleBoolean('xor', tilted, B, 'nonzero', engine));
    for (const r of out) for (const p of r) expect(Number.isInteger(p.x) && Number.isInteger(p.y)).toBe(true);
    expect(out.length).toBeGreaterThan(0);
  });

  it('refuses inputs off the lattice', () => {
    const bad = [[{ x: 0.5, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }]];
    const r = oracleBoolean('union', bad, B, 'nonzero', engine);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/^input/);
    const far = [[{ x: 8_388_608, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 5 }]];
    expect(oracleBoolean('union', far, B, 'nonzero', engine).ok).toBe(false);
    expect(oracleBuffer([[{ x: 0, y: 0.25 }, { x: 9, y: 9 }]], 10, 'round', 'flat', engine).ok).toBe(false);
  });

  it('reports a boolean case perimeter as the summed boundary length of both operands', () => {
    const r = oracleBoolean('intersection', A, B, 'nonzero', engine);
    expect(r.ok && r.perimeterCm).toBe(8_000);
  });

  describe('buffers (§3.7: strips, joins and ends)', () => {
    const seg = [[P(0, 0), P(1_000, 0)]];
    it('one segment: flat, square and round ends', () => {
      expect(area(oracleBuffer(seg, 100, 'round', 'flat', engine))).toBe(200_000);
      expect(area(oracleBuffer(seg, 100, 'round', 'square', engine))).toBe(240_000);
      // Two half-discs, each 8 equal chords (sagitta ≤ 2 cm at r = 1 m): together a regular 16-gon of radius 100.
      expect(arcSteps(Math.PI, 100)).toBe(8);
      const sixteenGon = 8 * 100 * 100 * Math.sin((2 * Math.PI) / 16);
      const arcs = 2 * Math.PI * 100; // the snapped arc vertices move only the arcs
      expect(Math.abs(area(oracleBuffer(seg, 100, 'round', 'round', engine)) - (200_000 + sixteenGon))).toBeLessThan(SNAP * arcs);
    });

    const ell = [[P(0, 0), P(1_000, 0), P(1_000, 1_000)]];
    it('a left turn of 90°: the square, miter and round joins', () => {
      const strips = 400_000 - 10_000;
      const t = 100 * Math.tan(Math.PI / 8); // the square cut's legs beyond the strips' corners
      const squareJoin = 10_000 - ((100 - t) * (100 - t)) / 2;
      const cutEdges = 2 * t + Math.SQRT2 * (100 - t); // the two legs and the cut, whose ends are snapped
      expect(Math.abs(area(oracleBuffer(ell, 100, 'square', 'flat', engine)) - (strips + squareJoin))).toBeLessThan(SNAP * cutEdges);
      expect(area(oracleBuffer(ell, 100, 'miter', 'flat', engine))).toBe(strips + 10_000);
      const quarter = 2 * 100 * 100 * Math.sin(Math.PI / 8); // four chords of π/8
      expect(Math.abs(area(oracleBuffer(ell, 100, 'round', 'flat', engine)) - (strips + quarter))).toBeLessThan(SNAP * 50 * Math.PI);
    });

    it('a right turn joins on the left side, the same areas by symmetry', () => {
      const mirror = [[P(0, 0), P(1_000, 0), P(1_000, -1_000)]];
      for (const j of ['square', 'miter', 'round'] as const) {
        const d = Math.abs(area(oracleBuffer(mirror, 100, j, 'flat', engine)) - area(oracleBuffer(ell, 100, j, 'flat', engine)));
        expect(d).toBeLessThan(2 * SNAP * 50 * Math.PI);
      }
    });

    it('a sharp turn cuts the miter at twice the half-width, the square join at the half-width', () => {
      const spike = [[P(0, 0), P(1_000, 0), P(500, 0)]]; // a reversal: the join lies ahead of the vertex
      expect(area(oracleBuffer(spike, 100, 'miter', 'flat', engine))).toBe(240_000);
      expect(area(oracleBuffer(spike, 100, 'square', 'flat', engine))).toBe(220_000);
      const halfSixteenGon = 4 * 100 * 100 * Math.sin((2 * Math.PI) / 16);
      expect(Math.abs(area(oracleBuffer(spike, 100, 'round', 'flat', engine)) - (200_000 + halfSixteenGon))).toBeLessThan(SNAP * 100 * Math.PI);
    });

    it('takes one half-width per input point, chain after chain, a trapezoid per segment', () => {
      expect(area(oracleBuffer(seg, [0, 100], 'round', 'flat', engine))).toBe(100_000);
      const two = [[P(0, 0), P(1_000, 0)], [P(0, 5_000), P(1_000, 5_000)]];
      expect(area(oracleBuffer(two, [100, 100, 50, 50], 'round', 'flat', engine))).toBe(300_000);
      const r = oracleBuffer(two, [100, 100, 50], 'round', 'flat', engine);
      expect(r.ok).toBe(false);
      expect(oracleBuffer(seg, -1, 'round', 'flat', engine).ok).toBe(false);
    });

    it('a chain of fewer than two distinct points, or of zero half-width, adds nothing', () => {
      expect(rings(oracleBuffer([[P(5, 5), P(5, 5)]], 100, 'round', 'round', engine))).toEqual([]);
      expect(rings(oracleBuffer(seg, 0, 'round', 'round', engine))).toEqual([]);
      expect(rings(oracleBuffer([], 100, 'round', 'round', engine))).toEqual([]);
    });

    it('treats a closed-looking chain as open: its first and last points are two ends', () => {
      const loop = [[P(0, 0), P(1_000, 0), P(1_000, 1_000), P(0, 1_000), P(0, 0)]];
      const flat = area(oracleBuffer(loop, 100, 'miter', 'flat', engine));
      const square = area(oracleBuffer(loop, 100, 'miter', 'square', engine));
      // The square ends add the two 100 × 200 boxes less what the strips already cover there.
      expect(square).toBeGreaterThan(flat);
    });

    it("reports a buffer's perimeter as its result's boundary length", () => {
      const r = oracleBuffer(seg, 100, 'round', 'flat', engine);
      expect(r.ok && r.perimeterCm).toBe(2_400);
    });
  });
});

describe('the buffer construction against Clipper2’s own offsetting (an independent algorithm)', () => {
  const chains: Ring[][] = [
    [[P(0, 0), P(3_000, 0), P(3_000, 2_000), P(-500, 2_600)]],
    [[P(-880, 833), P(-142, -299), P(2_692, -595), P(-1_958, 305), P(2_237, -433)]],
    [[P(0, 0), P(1_000, 50), P(2_000, 0), P(2_100, 900)], [P(500, 500), P(500, -900)]],
  ];
  it.each(chains.map((c, i) => [i, c]))('case %i: round and square joins, every end, within perimeter × 1 cm', (_i, c) => {
    for (const joins of ['round', 'square'] as const) {
      for (const ends of ['flat', 'square', 'round'] as const) {
        for (const w of [40, 300, 800]) {
          const ours = rings(oracleBuffer(c as Ring[], w, joins, ends, 'clipper2'));
          const theirs = clipper2Inflate(c as Ring[], w, joins, ends, SAGITTA_CM);
          expect(theirs).not.toBeNull();
          const d = symDiffArea(ours, theirs as Ring[], 'clipper2');
          expect(d, `${joins} ${ends} w=${w}`).toBeLessThanOrEqual(perimeterOf(ours));
        }
      }
    }
  });
});

describe('the arc rule (§3.7: chords of at most 2 cm sagitta)', () => {
  it('gives about 27 chords per full circle at a 3 m radius, every chord within the sagitta', () => {
    const n = arcSteps(2 * Math.PI, 300);
    expect(n).toBeGreaterThanOrEqual(27);
    expect(n).toBeLessThanOrEqual(28);
    for (const r of [5, 30, 100, 300, 1_000, 10_000]) {
      const step = (2 * Math.PI) / arcSteps(2 * Math.PI, r);
      expect(r * (1 - Math.cos(step / 2))).toBeLessThanOrEqual(SAGITTA_CM + 1e-9);
      expect(maxArcStep(r)).toBeGreaterThanOrEqual(step);
    }
  });

  it('builds every part counter-clockwise', () => {
    const parts = bufferParts([[P(0, 0), P(1_000, 0), P(1_000, 1_000), P(0, 1_100), P(400, 300)]], 120, 'round', 'round');
    expect(Array.isArray(parts)).toBe(true);
    if (!Array.isArray(parts)) return;
    for (const part of parts) {
      let s = 0;
      for (let i = 0; i < part.length; i += 1) {
        const [ax, ay] = part[i];
        const [bx, by] = part[(i + 1) % part.length];
        s += ax * by - bx * ay;
      }
      expect(s).toBeGreaterThan(0);
    }
  });
});

describe('every library answer passes the region check, or the library refuses (C-0150)', () => {
  const square: PcMultiPolygon = [
    [
      [
        [0, 0],
        [10, 0],
        [10, 20],
        [0, 20],
      ],
    ],
  ];
  it('polygon-clipping: takes the first quarter turn the check accepts, turned back; throws and wrong regions set aside', () => {
    const seen: number[] = [];
    const out = underTurns(
      (k) => {
        seen.push(k);
        if (k === 0) throw new Error('planted throw');
        return k === 1 ? [] : square;
      },
      (mp) => (mp.length === 0 ? 'planted wrong region' : null),
    );
    expect(seen).toEqual([0, 1, 2]);
    // the answer under the 180° turn, turned back
    expect(out).toEqual([
      [
        [
          [-0, -0],
          [-10, -0],
          [-10, -20],
          [-0, -20],
        ],
      ],
    ]);
    expect(underTurns(() => square, () => null)).toBe(square);
  });

  it('polygon-clipping: refuses, naming every turn, when no turn gives an accepted region', () => {
    let k = 0;
    let caught: unknown = null;
    try {
      underTurns(
        () => {
          k += 1;
          if (k % 2 === 1) throw new Error(`boom ${k}`);
          return square;
        },
        () => 'off',
      );
    } catch (e) {
      caught = e;
    }
    expect(isOracleRefusal(caught)).toBe(true);
    const r = caught as OracleRefusal;
    expect(r.engine).toBe('polygon-clipping');
    expect(r.message).toBe(
      "polygon-clipping: no quarter turn gave the operands' region — turn 0°: threw (boom 1); turn 90°: off; turn 180°: threw (boom 3); turn 270°: off",
    );
  });

  it('turns a refusal into a refused result; a usage error is rethrown; anything else is a failed result', () => {
    for (const engine of ORACLE_ENGINES) {
      // a refused result carries the refusal's replay seed and its overrun mark (KI-6, L18; C-0414)
      expect(resultOfThrow(engine, new OracleRefusal(engine, 'planted'))).toEqual({ ok: false, engine, error: `${engine}: planted`, refused: true, seed: replaySeed(), overran: false });
      expect(resultOfThrow(engine, new OracleRefusal(engine, 'planted', { overran: true }))).toEqual({ ok: false, engine, error: `${engine}: planted`, refused: true, seed: replaySeed(), overran: true });
      expect(resultOfThrow(engine, new Error('planted'))).toEqual({ ok: false, engine, error: `${engine}: planted` });
    }
    expect(() => resultOfThrow('clipper2', new Error('oracles: await loadOracles() first'))).toThrow(/^oracles:/);
    expect(isOracleRefusal(new Error('polygon-clipping: no'))).toBe(false);
  });

  it('checks a union of pieces against the pieces’ non-zero region: a clockwise piece over a counter-clockwise one', () => {
    // polygon-clipping unites the two squares; under non-zero their overlap has winding 0 — on every turn the
    // library's answer is not the pieces' region, so it refuses. Clipper2 reads the pieces by non-zero itself.
    const ccwPiece: [number, number][] = [
      [0, 0],
      [1_000, 0],
      [1_000, 1_000],
      [0, 1_000],
    ];
    const cwPiece: [number, number][] = [
      [500, 500],
      [500, 1_500],
      [1_500, 1_500],
      [1_500, 500],
    ];
    let caught: unknown = null;
    try {
      polygonClippingUnionPieces([ccwPiece, cwPiece]);
    } catch (e) {
      caught = e;
    }
    expect(isOracleRefusal(caught)).toBe(true);
    expect((caught as Error).message).toMatch(/^polygon-clipping: no quarter turn gave the operands' region — turn 0°: a wrong region \(250000\.0 cm²/);
    const both = polygonClippingUnionPieces([ccwPiece, cwPiece.slice().reverse()]);
    expect(both !== null && Number(area2Of(both)) / 2).toBe(1_750_000);
    const nonzero = clipper2UnionPieces([ccwPiece, cwPiece]);
    expect(nonzero !== null && Number(area2Of(nonzero)) / 2).toBe(1_500_000);
  });

  it('a library that throws refuses: Clipper2 beyond its coordinate range', () => {
    const huge = [
      [
        { x: 0, y: 0 },
        { x: 3e15, y: 0 },
        { x: 3e15, y: 3e15 },
      ],
    ] as unknown as Ring[];
    let caught: unknown = null;
    try {
      clipper2BooleanRaw('union', huge, [], 'nonzero');
    } catch (e) {
      caught = e;
    }
    expect(isOracleRefusal(caught)).toBe(true);
    expect((caught as Error).message).toMatch(/^clipper2: threw/);
    expect(() => symDiffArea(huge, [], 'clipper2')).toThrow(OracleRefusal);
  });

  it('answers the known cases unrefused on both engines', () => {
    for (const engine of ORACLE_ENGINES) {
      for (const op of ['union', 'intersection', 'difference', 'xor'] as const) {
        for (const fill of ['nonzero', 'evenodd'] as const) {
          const r = oracleBoolean(op, A, B, fill, engine);
          expect(r.ok, `${engine} ${op} ${fill}`).toBe(true);
        }
      }
      expect(oracleBuffer([[P(0, 0), P(1_000, 0), P(1_000, 1_000)]], 100, 'round', 'round', engine).ok).toBe(true);
    }
  });
});
