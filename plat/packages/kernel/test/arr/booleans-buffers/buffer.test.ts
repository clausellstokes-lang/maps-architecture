// M0-a-08's buffer (§3.4; §3.7 *Decision*: strips, joins and ends; §13.1's further limits: `buffer` with miter and
// square joins and flat ends; §3.11's empty result): exact rectangles and trapezoids where the construction is exact,
// the corner of each join kind, the miter limit, the round chords' sagitta rule (≈ 27 chords per full circle at a 3 m
// radius), the half-width arguments and the empty result. The oracle agreement is the testkit folder's (C-0122).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { arcSteps, buffer, bufferParts, maxArcStep, SAGITTA_CM, type Ring } from '../../../src/arr/index.js';
import { divScaled } from '../../../src/num/exact.js';
import { ratio } from '../../../src/num/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { area2Exact, areaOf, distToSegment, pt, R, rect, simpleRing, TIMEOUT } from './support.js';

const MOVES = ['W_ATTRACTED', 'W_STRETCH_SHARED', 'W_WEDGE_ROUTED', 'W_PLACED'];

function rings(r: ReturnType<typeof buffer>): Ring[] {
  if (!r.ok) throw new Error(`refused: ${r.code} ${r.detail}`);
  return r.value;
}

function vertices(rs: readonly Ring[]): LatticePoint[] {
  return rs.flat();
}

function hasVertex(rs: readonly Ring[], x: number, y: number): boolean {
  return vertices(rs).some((p) => p.x === x && p.y === y);
}

/** The largest distance of any output vertex from the chain. */
function maxDistFromChain(rs: readonly Ring[], chain: readonly LatticePoint[]): number {
  let m = 0;
  for (const p of vertices(rs)) {
    let d = Infinity;
    for (let i = 0; i + 1 < chain.length; i += 1) d = Math.min(d, distToSegment(p.x, p.y, chain[i], chain[i + 1]));
    m = Math.max(m, d);
  }
  return m;
}

describe('buffer: strips and ends on one straight segment', () => {
  const seg = [pt(0, 0), pt(1000, 0)];

  it('a flat end stops the strip at its end point: the exact rectangle', () => {
    expect(rings(buffer([seg], 100, 'round', 'flat'))).toEqual([rect(0, -100, 1000, 100)]);
  });

  it('a square end extends the strip by the half-width beyond its end point', () => {
    expect(rings(buffer([seg], 100, 'round', 'square'))).toEqual([rect(-100, -100, 1100, 100)]);
  });

  it('a round end is a fan of chords on the circle (every vertex within the half-width, none beyond it by more than the snap)', () => {
    const r = rings(buffer([seg], 300, 'round', 'round'));
    expect(r).toHaveLength(1);
    expect(simpleRing(r[0])).toBe(true);
    expect(maxDistFromChain(r, seg)).toBeLessThanOrEqual(300 + 0.71);
    for (const p of r[0]) expect(distToSegment(p.x, p.y, seg[0], seg[1])).toBeGreaterThanOrEqual(300 - 0.71);
    // area: the strip plus a disc of radius 300, less the chords' segments (sagitta ≤ 2 cm)
    const full = 1000 * 600 + Math.PI * 300 * 300;
    expect(areaOf(r)).toBeLessThanOrEqual(full + 2000);
    expect(areaOf(r)).toBeGreaterThan(full - 2 * Math.PI * 300 * SAGITTA_CM);
  });

  it('reports no move warning: nothing moved beyond the hot pixel (an unattracted case of §3.7)', () => {
    const r = buffer([seg], 100, 'square', 'square');
    expect(r.ok && r.warnings.filter((w) => MOVES.includes(w.code))).toEqual([]);
  });
});

describe('the round chords: the sagitta rule (§3.7)', () => {
  it('≈ 27 chords per full circle at a 3 m radius (27 or 28, the ceiling of 2π ÷ 2·acos(1 − 2 ÷ 300))', () => {
    const n = arcSteps(2 * Math.PI, 300);
    expect(n).toBeGreaterThanOrEqual(27);
    expect(n).toBeLessThanOrEqual(28);
    expect(n).toBe(Math.ceil((2 * Math.PI) / (2 * Math.acos(1 - 2 / 300))));
  });

  it('every step keeps a sagitta of at most 2 cm, and one step fewer would not', () => {
    for (const r of [30, 100, 300, 1000, 5000, 40_000]) {
      const step = maxArcStep(r);
      expect(r * (1 - Math.cos(step / 2))).toBeLessThanOrEqual(SAGITTA_CM + 1e-9);
      const n = arcSteps(2 * Math.PI, r);
      expect(r * (1 - Math.cos(Math.PI / n))).toBeLessThanOrEqual(SAGITTA_CM + 1e-9);
      if (n > 1) expect(r * (1 - Math.cos(Math.PI / (n - 1)))).toBeGreaterThan(SAGITTA_CM);
    }
  });

  it('a round end of 3 m takes half a circle of chords: 13–15 arc vertices beyond the end point', () => {
    const r = rings(buffer([[pt(0, 0), pt(2000, 0)]], 300, 'round', 'round'));
    const beyond = r[0].filter((p) => p.x > 2000).length;
    expect(beyond).toBeGreaterThanOrEqual(12);
    expect(beyond).toBeLessThanOrEqual(15);
    // each chord between consecutive arc vertices keeps its sagitta ≤ 2 cm (+ 1 cm for the snap of its ends)
    const arc = r[0].filter((p) => p.x >= 2000);
    for (let i = 0; i + 1 < arc.length; i += 1) {
      const a = arc[i];
      const b = arc[i + 1];
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      expect(300 - Math.hypot(mid.x - 2000, mid.y)).toBeLessThanOrEqual(SAGITTA_CM + 1);
    }
  });
});

describe('buffer: joins (§3.7; §13.1 further limits)', () => {
  const L = [pt(0, 0), pt(1000, 0), pt(1000, 1000)];

  it('a miter join extends the two outer edges to their meeting point', () => {
    const r = rings(buffer([L], 100, 'miter', 'flat'));
    expect(r).toHaveLength(1);
    expect(hasVertex(r, 1100, -100)).toBe(true);
    // two 1000 × 200 strips overlapping in 100 × 100 at the inner corner, plus the 100 × 100 miter square outside
    expect(areaOf(r)).toBe(400_000);
    expect(r[0]).toEqual(R([0, -100], [1100, -100], [1100, 1000], [900, 1000], [900, 100], [0, 100]));
  });

  it('a square join cuts the corner square at the half-width from the vertex', () => {
    const r = rings(buffer([L], 100, 'square', 'flat'));
    // the cut is perpendicular to the bisector (1, −1)/√2 at distance 100 from (1000, 0)
    const b = { x: Math.SQRT1_2, y: -Math.SQRT1_2 };
    const proj = vertices(r).map((p) => (p.x - 1000) * b.x + (p.y - 0) * b.y);
    expect(Math.max(...proj)).toBeLessThanOrEqual(100 + 0.71);
    expect(Math.max(...proj)).toBeGreaterThanOrEqual(100 - 0.71);
    expect(hasVertex(r, 1100, -100)).toBe(false);
  });

  it('a round join keeps every vertex within the half-width of the chain', () => {
    const r = rings(buffer([L], 100, 'round', 'flat'));
    expect(maxDistFromChain(r, L)).toBeLessThanOrEqual(100 + 0.71);
  });

  it('the miter limit: a sharp turn is cut square at twice the half-width from the vertex', () => {
    // a turn of about 160°: the outer edges would meet ≈ 5.8 w from the vertex
    const sharp = [pt(0, 0), pt(2000, 0), pt(0, 700)];
    const r = rings(buffer([sharp], 100, 'miter', 'flat'));
    const v = sharp[1];
    // the bisector of the outer normals points away from the turn: +x, roughly
    const u1 = { x: 1, y: 0 };
    const len = Math.hypot(-2000, 700);
    const u2 = { x: -2000 / len, y: 700 / len };
    const bis = { x: u1.x - u2.x, y: u1.y - u2.y };
    const bl = Math.hypot(bis.x, bis.y);
    const proj = vertices(r).map((p) => ((p.x - v.x) * bis.x + (p.y - v.y) * bis.y) / bl);
    expect(Math.max(...proj)).toBeLessThanOrEqual(200 + 1);
    expect(Math.max(...proj)).toBeGreaterThanOrEqual(200 - 1);
  });

  it('a miter within the limit (a right angle: √2 · w < 2 w) is not cut', () => {
    const r = rings(buffer([L], 300, 'miter', 'square'));
    expect(hasVertex(r, 1300, -300)).toBe(true);
  });

  it('a reversal (a 180° turn) joins ahead of the vertex under every join kind', () => {
    const back = [pt(0, 0), pt(1000, 0), pt(0, 0)];
    for (const j of ['round', 'square', 'miter'] as const) {
      const r = rings(buffer([back], 100, j, 'flat'));
      expect(r).toHaveLength(1);
      const maxX = Math.max(...r[0].map((p) => p.x));
      expect(maxX).toBeGreaterThanOrEqual(1100 - 1);
      expect(maxX).toBeLessThanOrEqual(1000 + 200 + 1);
    }
  });

  /** The largest projection of the output's vertices on the outer bisector of a left turn at v (u1 in, u2 out). */
  function bisectorReach(r: readonly Ring[], v: LatticePoint, u1: { x: number; y: number }, u2: { x: number; y: number }): number {
    const bis = { x: u1.x - u2.x, y: u1.y - u2.y };
    const bl = Math.hypot(bis.x, bis.y);
    return Math.max(...vertices(r).map((p) => ((p.x - v.x) * bis.x + (p.y - v.y) * bis.y) / bl));
  }

  it('the miter limit on both sides of its bound: a 110° turn keeps its miter point (w ÷ cos 55° ≈ 1.74 w), a 125° turn is cut at 2 w', () => {
    // the miter point lies w ÷ cos(θ/2) from the vertex: nearer than 2 w below a 120° turn, farther above it (§3.7)
    const at = (deg: number): { chain: LatticePoint[]; u2: { x: number; y: number } } => {
      const t = (deg * Math.PI) / 180;
      const q = pt(1000 + Math.round(1000 * Math.cos(t)), Math.round(1000 * Math.sin(t)));
      const len = Math.hypot(q.x - 1000, q.y);
      return { chain: [pt(0, 0), pt(1000, 0), q], u2: { x: (q.x - 1000) / len, y: q.y / len } };
    };
    const kept = at(110);
    const reachKept = bisectorReach(rings(buffer([kept.chain], 100, 'miter', 'flat')), pt(1000, 0), { x: 1, y: 0 }, kept.u2);
    const miter = 100 / Math.cos((55 * Math.PI) / 180);
    expect(reachKept).toBeGreaterThanOrEqual(miter - 1.5);
    expect(reachKept).toBeLessThanOrEqual(miter + 1.5);
    const cut = at(125);
    const reachCut = bisectorReach(rings(buffer([cut.chain], 100, 'miter', 'flat')), pt(1000, 0), { x: 1, y: 0 }, cut.u2);
    expect(reachCut).toBeGreaterThanOrEqual(200 - 1);
    expect(reachCut).toBeLessThanOrEqual(200 + 1);
  });

  it('with per-point half-widths a join uses its vertex’s own half-width (C-0196 (2))', () => {
    // the join at (1000, 0) is the miter of the vertex's 300 cm: its point (1300, −300), beyond both neighbours' 100 cm
    const r = rings(buffer([[pt(0, 0), pt(1000, 0), pt(1000, 1000)]], [100, 300, 100], 'miter', 'flat'));
    expect(r).toHaveLength(1);
    expect(hasVertex(r, 1300, -300)).toBe(true);
  });

  it('a straight-on vertex has no join: the strip is the one rectangle', () => {
    expect(rings(buffer([[pt(0, 0), pt(500, 0), pt(1000, 0)]], 100, 'miter', 'flat'))).toEqual([rect(0, -100, 1000, 100)]);
  });
});

describe('buffer: half-widths', () => {
  it('per-point half-widths make each segment a trapezoid (§3.7: sampled at each end)', () => {
    const r = rings(buffer([[pt(0, 0), pt(1000, 0)]], [100, 300], 'round', 'flat'));
    expect(r).toEqual([R([1000, -300], [1000, 300], [0, 100], [0, -100])]);
  });

  it('one half-width per input point of every chain, in order', () => {
    const r = rings(buffer([[pt(0, 0), pt(1000, 0)], [pt(0, 5000), pt(1000, 5000)]], [100, 100, 200, 200], 'round', 'flat'));
    expect(r).toEqual([rect(0, -100, 1000, 100), rect(0, 4800, 1000, 5200)]);
  });

  it('a list of another length, a negative or a non-finite half-width is the caller’s error', () => {
    expect(() => buffer([[pt(0, 0), pt(1000, 0)]], [100], 'round', 'flat')).toThrow(RangeError);
    expect(() => buffer([[pt(0, 0), pt(1000, 0)]], -1, 'round', 'flat')).toThrow(RangeError);
    expect(() => buffer([[pt(0, 0), pt(1000, 0)]], Number.NaN, 'round', 'flat')).toThrow(RangeError);
    expect(() => buffer([[pt(0, 0), pt(1000, 0)]], 10, 'bevel' as never, 'flat')).toThrow(RangeError);
  });

  it('a coordinate off the lattice is E_OUT_OF_RANGE', () => {
    expect(buffer([[pt(0, 0), pt(0.5, 0)]], 10, 'round', 'flat')).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
  });
});

describe('buffer: the empty result (§3.11)', () => {
  it('no chain, a zero half-width and a chain of one distinct point are E_DEGENERATE empty', () => {
    expect(buffer([], 100, 'round', 'round')).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    expect(buffer([[pt(0, 0), pt(1000, 0)]], 0, 'round', 'round')).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    expect(buffer([[pt(5, 5), pt(5, 5)]], 100, 'round', 'round')).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
  });

  it('a part the first union level would leave alone still passes the insertion rules: a 3 cm buffer collapses to empty, no sub-minEdge ring', () => {
    // nine parts (four strips, three square joins, two round ends): the ninth, the far end's 3 cm cap, is a group of
    // one at the union tree's first level; it must enter an overlay (where its sub-minEdge segments collapse) rather
    // than reach the result as drawn (C-0196 (6))
    const chain = [pt(-3825, -6840), pt(-3800, -6890), pt(-7297, -4449), pt(-10660, -2472), pt(-10618, -2507)];
    const parts = bufferParts([chain], 3, 'square', 'round');
    expect(parts.ok && parts.value.length % 8).toBe(1);
    const r = buffer([chain], 3, 'square', 'round');
    expect(r).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    // emptied by attraction: the refusal carries the move, so §3.7's split reads the case as attracted (C-0196 (4))
    expect(((r as { warnings?: { code: string; count: number }[] }).warnings ?? []).some((w) => MOVES.includes(w.code) && w.count > 0)).toBe(true);
  });
});

describe('a property over random chains: valid output covering every chain point, inside the half-width', () => {
  const chain = fc.array(fc.record({ x: fc.integer({ min: -20_000, max: 20_000 }), y: fc.integer({ min: -20_000, max: 20_000 }) }), { minLength: 2, maxLength: 6 }).map((ps) => ps.map((p) => pt(p.x, p.y)));
  const join = fc.constantFrom('round', 'square', 'miter' as const);
  const end = fc.constantFrom('round', 'square', 'flat' as const);
  it('every output ring simple, outer rings counter-clockwise, every vertex within 2 w (+ √2 · attractCm when attracted) of the chain', { timeout: TIMEOUT }, () => {
    fc.assert(
      fc.property(chain, fc.integer({ min: 30, max: 3000 }), join, end, (c, w, j, e) => {
        const r = buffer([c], w, j as 'round', e as 'round');
        const distinct = new Set(c.map((p) => `${String(p.x)},${String(p.y)}`)).size;
        const ws = r.ok ? r.warnings : 'warnings' in r ? (r as { warnings: { code: string; count: number }[] }).warnings : [];
        const moved = ws.some((x) => MOVES.includes(x.code) && x.count > 0);
        // empty only with nothing to widen, or where attraction merged a part narrower than attractCm away (§3.7's attracted side)
        if (!r.ok) return r.code === 'E_DEGENERATE' && r.detail === 'empty' && (distinct < 2 || moved);
        for (const ring of r.value) if (!simpleRing(ring)) return false;
        if (!r.value.some((ring) => area2Exact(ring) > 0n)) return false;
        const slack = moved ? Math.SQRT2 * 26 : 1;
        // a square end reaches √2 · w from its end point, a miter at most 2 w / cos … cut at 2 w: within 2·√2 · w
        return maxDistFromChain(r.value, c) <= 2 * Math.SQRT2 * w + slack;
      }),
      { numRuns: 300 },
    );
  });

  it('bufferParts gives counter-clockwise lattice parts only', () => {
    const p = bufferParts([[pt(0, 0), pt(1000, 0), pt(1000, 1000)]], 100, 'round', 'round');
    expect(p.ok).toBe(true);
    if (p.ok) for (const ring of p.value) expect(area2Exact(ring) > 0n).toBe(true);
  });
});

describe('the scaled quotient: buffer and insetRing divide through num/exact.ts divScaled (§3.2 (8), C-0044)', () => {
  // the quotient both files wrote out before sharing it, kept here as the oracle: num and den scaled by 2²⁰, then ratio()
  // under the length floor; null below the floor
  const written = (num: number, den: number): number | null => {
    const q = ratio(num * 1_048_576, den * 1_048_576, 'length');
    return q.ok ? q.value : null;
  };
  // Object.is: the same double bit for bit (−0 apart from 0, NaN equal to NaN), or both null
  const same = (num: number, den: number): void => {
    expect(Object.is(divScaled(num, den, 'length'), written(num, den)), `${String(num)} ÷ ${String(den)}`).toBe(true);
  };
  const BOUNDARY = [0, -0, 1, -1, 0.5, -0.5, 1.5, -1.5, 2, 300, 1 / 1_048_576, -1 / 1_048_576, 0.99 / 1_048_576, 0.5 / 1_048_576, 1e-300,
    5e-324, 8_388_607, -8_388_607, 9_007_199_254_740_992, 1e300, -1e300, Number.MAX_VALUE, -Number.MAX_VALUE, Infinity, -Infinity, NaN,
    0.1, 0.7071067811865476, 3.141592653589793];

  it('the same value — or the same null — on the boundary values (negative, half, the floor 2⁻²⁰, max, infinite, NaN)', () => {
    for (const num of BOUNDARY) for (const den of BOUNDARY) same(num, den);
    expect(divScaled(1, 1 / 1_048_576, 'length')).toBe(1_048_576);
    expect(divScaled(1, 0.99 / 1_048_576, 'length')).toBeNull();
    expect(divScaled(-3, 2, 'length')).toBe(-1.5);
    expect(divScaled(1, NaN, 'length')).toBeNull();
  });

  it('the same value on the quotients the folder’s constructions take: sagitta, arc steps, miter, cut legs, clips', () => {
    // maxArcStep's 2 ÷ r, arcSteps' θ ÷ step, a miter's w ÷ cos(θ/2), a cut's leg over a dot product, a clip's sp ÷ (sp − sq)
    for (const r of [0.5, 1, 2, 3, 100, 300, 301, 1000, 1e6]) same(SAGITTA_CM, r);
    for (const theta of [0.1, 1, Math.PI / 2, Math.PI, 2 * Math.PI]) for (const r of [1, 3, 300, 5000]) same(theta, maxArcStep(r));
    for (const w of [1, 100, 300]) for (const c of [0.5, 0.7071067811865476, 0.9999, 1]) same(w, c);
    for (const t of [-250.5, -0.25, 0, 1e-7, 73.25]) for (const d of [-1, -0.7071067811865476, 1e-6, 1e-7, 0.5]) same(t, d);
    fc.assert(fc.property(fc.double(), fc.double(), (num, den) => {
      same(num, den);
    }), { numRuns: 2000 });
  });
});
