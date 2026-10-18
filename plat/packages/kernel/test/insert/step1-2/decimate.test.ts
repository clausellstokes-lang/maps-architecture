// M0-a-04: insertion step 1 — snap and decimate (§3.6 step 1; §3.2 (7); §13.1's quantisation class). Decimation with
// opts.pinned and knots exempt, the merge at the first (W_ATTRACTED) with a merged knot vertex carrying both ordinals,
// the closing pair of a closed chain, and the split into simple runs (C-0169 (3)).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { createPlat } from '../../../src/arena/index.js';
import { insertTx } from '../../../src/insert/classes.js';
import { decimate, simpleRuns, type Decimated } from '../../../src/insert/decimate.js';
import { snap } from '../../../src/num/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { FRAME, GROUND, pt, segmentsShare, TIMEOUT } from './support.js';

const tx = () => insertTx(createPlat(GROUND, FRAME), 1);
const xy = (pts: readonly LatticePoint[]): [number, number][] => pts.map((q) => [q.x, q.y]);
const done = (r: ReturnType<typeof decimate>): Decimated => {
  if (!r.ok) throw new Error(`refused: ${r.code} ${r.detail}`);
  return r.value;
};

describe('snap (§3.2 (7); §13.1 quantisation)', () => {
  it('rounds half-centimetre ties away from zero and keeps ±(2²³ − 1)', () => {
    const d = done(decimate(tx(), [{ x: 0.5, y: -0.5 }, { x: 100.5, y: 49.5 }, { x: 2 ** 23 - 1, y: -(2 ** 23 - 1) }], 'mandatory'));
    expect(xy(d.points)).toEqual([[1, -1], [101, 50], [2 ** 23 - 1, -(2 ** 23 - 1)]]);
  });

  it('refuses ±2²³, NaN and ±∞ with E_OUT_OF_RANGE naming the point and its axis', () => {
    const bad: [number, number, string][] = [
      [2 ** 23, 0, 'point 1 x'], [0, -(2 ** 23), 'point 1 y'], [Number.NaN, 0, 'point 1 x'],
      [0, Number.POSITIVE_INFINITY, 'point 1 y'], [Number.NEGATIVE_INFINITY, 0, 'point 1 x'], [2 ** 23 - 0.5, 0, 'point 1 x'],
    ];
    for (const [x, y, detail] of bad) {
      for (const cls of ['mandatory', 'optional'] as const) {
        expect(decimate(tx(), [{ x: 0, y: 0 }, { x, y }, { x: 500, y: 0 }], cls)).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail });
      }
    }
  });
});

describe('decimation (§3.6 step 1)', () => {
  it('drops the later of two points closer than minEdge; exactly minEdge stays', () => {
    const d = done(decimate(tx(), [{ x: 0, y: 0 }, { x: 15, y: 19 }, { x: 15, y: 20 }, { x: 300, y: 0 }], 'optional'));
    // (15, 19) is 24.2 cm from (0, 0): dropped; (15, 20) is 25 cm: kept.
    expect(xy(d.points)).toEqual([[0, 0], [15, 20], [300, 0]]);
    expect(d.of).toEqual([0, 0, 1, 2]);
    expect(d.runs).toEqual([{ vertices: [0, 1, 2], closed: false }]);
  });

  it('a pinned or knot point is never the one dropped: the earlier, if it is neither, goes instead', () => {
    for (const opts of [{ pinned: [2] }, { knots: [{ index: 2, role: 'width_knot', ordinal: 0 }] }]) {
      const d = done(decimate(tx(), [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 110, y: 0 }, { x: 300, y: 0 }], 'optional', opts));
      expect(xy(d.points)).toEqual([[0, 0], [110, 0], [300, 0]]);
      expect(d.of).toEqual([0, 1, 1, 2]);
    }
  });

  it('dropping the earlier re-tests the later against the one before it', () => {
    // (110, 0) is pinned; (100, 0) goes; then (110, 0) is 20 cm from (90, 0): that one goes too.
    const d = done(decimate(tx(), [{ x: 0, y: 0 }, { x: 90, y: 0 }, { x: 100, y: 5 }, { x: 110, y: 0 }], 'optional', { pinned: [3] }));
    expect(xy(d.points)).toEqual([[0, 0], [110, 0]]);
    expect(d.of).toEqual([0, 1, 1, 1]);
  });

  it('two exempt points closer than minEdge merge at the first (W_ATTRACTED, in the result only); the merged knot vertex carries both ordinals', () => {
    const t = tx();
    const r = decimate(t, [{ x: 0, y: 0 }, { x: 200, y: 0 }, { x: 210, y: 8 }, { x: 500, y: 0 }], 'mandatory', {
      knots: [{ index: 1, role: 'width_knot', ordinal: 1 }, { index: 2, role: 'width_knot', ordinal: 2 }],
      pinned: [1],
    });
    const d = done(r);
    expect(xy(d.points)).toEqual([[0, 0], [200, 0], [500, 0]]);
    expect(d.of).toEqual([0, 1, 1, 2]);
    expect(d.knots).toEqual([{ index: 1, role: 'width_knot', ordinal: 1 }, { index: 1, role: 'width_knot', ordinal: 2 }]);
    expect(d.pinned).toEqual([false, true, false]);
    expect(r.ok && r.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 200, y: 0 } }]);
    // step 1 is a plan: insertChain (M0-a-05) folds its warnings into the transaction when the chain goes on (C-0170 (2))
    expect(t.warnings).toEqual([]);
  });

  it('a refused decimate leaves the transaction’s warnings as they were, its merges reported nowhere (C-0169 (1), C-0170 (2))', () => {
    // (0, 0) and (10, 0) both pinned: they merge (a W_ATTRACTED decided), then the chain is one point — refused.
    for (const [cls, code] of [['optional', 'E_BELOW_MIN_EDGE'], ['mandatory', 'E_DEGENERATE']] as const) {
      const t = tx();
      expect(decimate(t, [{ x: 0, y: 0 }, { x: 10, y: 0 }], cls, { pinned: [0, 1] })).toMatchObject({ ok: false, code });
      expect(t.warnings).toEqual([]);
      // a transaction that already holds warnings keeps exactly them
      const u = tx();
      u.warnings.push({ code: 'W_PLACED', count: 2, at: { x: 5, y: 5 } as LatticePoint });
      expect(decimate(u, [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 12 }], cls, { pinned: [0, 1, 2] })).toMatchObject({ ok: false, code });
      expect(u.warnings).toEqual([{ code: 'W_PLACED', count: 2, at: { x: 5, y: 5 } }]);
    }
  });

  it('a dropped point reports no warning; a knot keeps its entity', () => {
    const t = tx();
    const r = decimate(t, [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 400, y: 0 }], 'optional', {
      knots: [{ index: 2, role: 'deck_end', ordinal: 1, entity: 'bridge:7' }],
    });
    const d = done(r);
    expect(r.ok && r.warnings).toEqual([]);
    expect(t.warnings).toEqual([]);
    expect(d.knots).toEqual([{ index: 1, role: 'deck_end', ordinal: 1, entity: 'bridge:7' }]);
  });

  it('a closed chain’s closing pair: the last point is the later one', () => {
    const ring = [{ x: 0, y: 0 }, { x: 400, y: 0 }, { x: 400, y: 400 }, { x: 0, y: 400 }, { x: 10, y: 10 }];
    const d = done(decimate(tx(), ring, 'mandatory', { closed: true }));
    expect(xy(d.points)).toEqual([[0, 0], [400, 0], [400, 400], [0, 400]]);
    expect(d.of).toEqual([0, 1, 2, 3, 0]);
    expect(d.runs).toEqual([{ vertices: [0, 1, 2, 3], closed: true }]);
    // The last point pinned: the first (not exempt) goes, and the ring starts at its old second point.
    const e = done(decimate(tx(), ring, 'mandatory', { closed: true, pinned: [4] }));
    expect(xy(e.points)).toEqual([[400, 0], [400, 400], [0, 400], [10, 10]]);
    expect(e.of).toEqual([3, 0, 1, 2, 3]);
    // Both exempt: the last merges into the first.
    const t = tx();
    const fr = decimate(t, ring, 'mandatory', { closed: true, pinned: [0, 4] });
    const f = done(fr);
    expect(xy(f.points)).toEqual([[0, 0], [400, 0], [400, 400], [0, 400]]);
    expect(fr.ok && fr.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 0, y: 0 } }]);
    expect(t.warnings).toEqual([]);
  });

  it('a closed chain of two distinct points is one edge both ways, not a refusal: two open runs (step 1: only fewer than two distinct points refuse)', () => {
    for (const cls of ['mandatory', 'optional'] as const) {
      const d = done(decimate(tx(), [{ x: 0, y: 0 }, { x: 100, y: 0 }], cls, { closed: true }));
      expect(xy(d.points)).toEqual([[0, 0], [100, 0]]);
      expect(d.closed).toBe(true);
      expect(d.runs).toEqual([{ vertices: [0, 1], closed: false }, { vertices: [1, 0], closed: false }]);
    }
  });
});

describe('simple runs (§3.6 step 1: a chain that touches or crosses itself)', () => {
  const runs = (pts: [number, number][], closed = false) => simpleRuns(pts.map(([x, y]) => pt(x, y)), closed);

  it('a simple chain is one run; a simple ring one closed run', () => {
    expect(runs([[0, 0], [100, 0], [100, 100]])).toEqual([{ vertices: [0, 1, 2], closed: false }]);
    expect(runs([[0, 0], [100, 0], [100, 100], [0, 100]], true)).toEqual([{ vertices: [0, 1, 2, 3], closed: true }]);
  });

  it('a self-crossing chain (a figure eight) is cut before the segment that crosses', () => {
    expect(runs([[0, 0], [100, 100], [100, 0], [0, 100]])).toEqual([{ vertices: [0, 1, 2], closed: false }, { vertices: [2, 3], closed: false }]);
  });

  it('a chain returning to its first vertex, or touching an earlier segment, is cut there', () => {
    // returns to (0, 0): the third segment ends on the run's first vertex
    expect(runs([[0, 0], [100, 0], [100, 100], [0, 0], [-100, 50]])).toEqual([
      { vertices: [0, 1, 2], closed: false }, { vertices: [2, 3, 4], closed: false },
    ]);
    // touches the first segment at (50, 0) with its end
    expect(runs([[0, 0], [100, 0], [100, 100], [50, 0]])).toEqual([{ vertices: [0, 1, 2], closed: false }, { vertices: [2, 3], closed: false }]);
  });

  it('a collinear fold-back is a touch; a straight continuation is not', () => {
    expect(runs([[0, 0], [100, 0], [50, 0]])).toEqual([{ vertices: [0, 1], closed: false }, { vertices: [1, 2], closed: false }]);
    expect(runs([[0, 0], [100, 0], [200, 0]])).toEqual([{ vertices: [0, 1, 2], closed: false }]);
  });

  it('a ring whose last segments touch its first, or a two-point ring, is open runs', () => {
    expect(runs([[0, 0], [100, 0], [100, 100], [50, 0]], true)).toEqual([
      { vertices: [0, 1, 2], closed: false }, { vertices: [2, 3, 0], closed: false },
    ]);
    expect(runs([[0, 0], [100, 0]], true)).toEqual([{ vertices: [0, 1], closed: false }, { vertices: [1, 0], closed: false }]);
  });

  it('a long segment held in the bucket grid’s large list still cuts', () => {
    expect(runs([[0, 0], [8_000_000, 0], [8_000_000, 100], [4_000_000, -100]])).toEqual([
      { vertices: [0, 1, 2], closed: false }, { vertices: [2, 3], closed: false },
    ]);
  });
});

/** A chain family for the properties: dense, duplicated, near-collinear and long chains, some far out. */
const chains = fc.oneof(
  fc.array(fc.record({ x: fc.integer({ min: -60, max: 60 }), y: fc.integer({ min: -60, max: 60 }) }), { maxLength: 40 }),
  fc.array(fc.record({ x: fc.integer({ min: -2000, max: 2000 }), y: fc.integer({ min: -2000, max: 2000 }) }), { minLength: 2, maxLength: 320 }),
  fc.array(fc.record({ x: fc.double({ min: -1000, max: 1000, noNaN: true }), y: fc.double({ min: -1000, max: 1000, noNaN: true }) }), { maxLength: 30 }),
  fc.tuple(fc.integer({ min: -(2 ** 23 - 1), max: 2 ** 23 - 5000 }), fc.integer({ min: -(2 ** 23 - 1), max: 2 ** 23 - 5000 }), fc.array(fc.integer({ min: 0, max: 4000 }), { minLength: 2, maxLength: 20 }))
    .map(([x0, y0, ds]) => ds.map((d, i) => ({ x: x0 + d, y: y0 + ((i * 37) % 4000) }))),
);

/** Is a run simple (no two non-adjacent segments meeting, no adjacent pair folding back)? Brute force, BigInt-exact. */
function runIsSimple(pts: readonly LatticePoint[], run: readonly number[], closed: boolean): boolean {
  const segs: [LatticePoint, LatticePoint][] = [];
  for (let i = 0; i + 1 < run.length; i++) segs.push([pts[run[i]], pts[run[i + 1]]]);
  if (closed) segs.push([pts[run[run.length - 1]], pts[run[0]]]);
  const m = segs.length;
  for (let i = 0; i < m; i++) {
    for (let j = i + 1; j < m; j++) {
      const [a, b] = segs[i];
      const [c, d] = segs[j];
      const adjacent = j === i + 1 || (closed && i === 0 && j === m - 1);
      if (adjacent) {
        const [o, s, q] = j === i + 1 ? [a, b, d] : [c, d, b]; // o → s, then s → q
        const cross = (s.x - o.x) * (q.y - o.y) - (s.y - o.y) * (q.x - o.x);
        if (cross === 0 && (q.x - s.x) * (o.x - s.x) + (q.y - s.y) * (o.y - s.y) > 0) return false;
        continue;
      }
      if (segmentsShare(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y)) return false;
    }
  }
  return true;
}

/** One kept point of the reference decimation: its position, whether it is exempt, the input indices that became it. */
interface RefPoint {
  readonly x: number;
  readonly y: number;
  readonly exempt: boolean;
  members: number[];
}

/** Are two lattice points closer than minEdge (25 cm)? Exact (BigInt). */
const refClose = (a: RefPoint, b: RefPoint): boolean => (BigInt(a.x) - BigInt(b.x)) ** 2n + (BigInt(a.y) - BigInt(b.y)) ** 2n < 625n;

/**
 * The reference decimation the property judges with, written in the test from §3.6 step 1's rule and C-0169 (3)'s
 * readings (never with the code under test; `snap` is M0-a-01's): every point snapped; then, in chain order, a point closer
 * than minEdge to the last kept one drops the non-exempt of the two — the later when neither is exempt — and a dropped
 * earlier point hands its inputs to the later, which is then tested against the point before; two exempt points merge at
 * the first (one W_ATTRACTED each). A closed chain's last kept point is then tested against its first the same way, the
 * last counted the later. 'range' when a point does not snap; otherwise the kept points and the merges.
 */
function referenceDecimate(input: readonly { x: number; y: number }[], exempt: (i: number) => boolean, closed: boolean): 'range' | { kept: RefPoint[]; merges: number } {
  const pts: RefPoint[] = [];
  for (let i = 0; i < input.length; i++) {
    const s = snap(input[i].x, input[i].y);
    if (!s.ok) return 'range';
    pts.push({ x: s.value.x, y: s.value.y, exempt: exempt(i), members: [i] });
  }
  const kept: RefPoint[] = [];
  let merges = 0;
  for (const p of pts) {
    let later: RefPoint | null = p;
    while (later !== null) {
      const earlier = kept.at(-1);
      if (earlier === undefined || !refClose(earlier, later)) {
        kept.push(later);
        later = null;
      } else if (!later.exempt) {
        earlier.members.push(...later.members);
        later = null;
      } else if (earlier.exempt) {
        earlier.members.push(...later.members);
        merges += 1;
        later = null;
      } else {
        kept.pop();
        later.members = [...earlier.members, ...later.members];
      }
    }
  }
  while (closed && kept.length >= 2 && refClose(kept[0], kept[kept.length - 1])) {
    const first = kept[0];
    const last = kept[kept.length - 1];
    if (!last.exempt || first.exempt) {
      kept.pop();
      first.members.push(...last.members);
      if (last.exempt) merges += 1;
    } else {
      kept.shift();
      last.members = [...first.members, ...last.members];
    }
  }
  return { kept, merges };
}

describe('B-FUZZ: decimate on random chains (§13.1 (1); the item’s exit bar, PLAT_FUZZ_RUNS)', () => {
  it('never throws; a result keeps step 1’s contract and equals the reference decimation; a refusal is the class code exactly where the reference keeps fewer than two points', () => {
    fc.assert(
      fc.property(chains, fc.boolean(), fc.boolean(), fc.integer({ min: 0, max: 0xffff }), (input, closed, mandatory, salt) => {
        const n = input.length;
        const pinned = input.map((_, i) => i).filter((i) => (i * 7 + salt) % 5 === 0);
        const knots = input.map((_, i) => i).filter((i) => (i * 3 + salt) % 7 === 0).map((i, k) => ({ index: i, role: 'width_knot', ordinal: k }));
        const exempt = new Set([...pinned, ...knots.map((k) => k.index)]);
        const ref = referenceDecimate(input, (i) => exempt.has(i), closed);
        const t = tx();
        const r = decimate(t, input, mandatory ? 'mandatory' : 'optional', { closed, pinned, knots });
        expect(t.warnings).toEqual([]); // a plan: its warnings are in its result only (C-0170 (2))
        if (ref === 'range') {
          expect(r).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
          return true;
        }
        if (ref.kept.length < 2) {
          // the reference keeps fewer than two distinct points: the class's code (§3.6 step 1), and only then
          expect(r).toMatchObject(mandatory ? { ok: false, code: 'E_DEGENERATE', detail: 'empty' } : { ok: false, code: 'E_BELOW_MIN_EDGE' });
          return true;
        }
        expect(r.ok).toBe(true);
        if (!r.ok) return true;
        const d = r.value;
        expect(xy(d.points)).toEqual(ref.kept.map((q) => [q.x, q.y]));
        const refOf = new Array<number>(n).fill(-1);
        ref.kept.forEach((q, idx) => {
          for (const i of q.members) refOf[i] = idx;
        });
        expect(d.of).toEqual(refOf);
        expect(r.warnings).toEqual(ref.merges === 0 ? [] : [expect.objectContaining({ code: 'W_ATTRACTED', count: ref.merges })]);
        const k = d.points.length;
        expect(k).toBeGreaterThanOrEqual(2);
        expect(d.of).toHaveLength(n);
        for (const o of d.of) expect(o >= 0 && o < k).toBe(true);
        const pairs = closed ? k : k - 1;
        for (let i = 0; i < pairs; i++) {
          const a = d.points[i];
          const b = d.points[(i + 1) % k];
          expect((a.x - b.x) ** 2 + (a.y - b.y) ** 2).toBeGreaterThanOrEqual(625);
        }
        if (!closed) for (let i = 1; i < n; i++) expect(d.of[i]).toBeGreaterThanOrEqual(d.of[i - 1]);
        expect(d.knots).toHaveLength(knots.length);
        for (const kn of knots) expect(d.knots.some((o) => o.ordinal === kn.ordinal && o.index === d.of[kn.index])).toBe(true);
        for (const i of pinned) expect(d.pinned[d.of[i]]).toBe(true);
        // runs: in order, sharing boundaries, covering every segment once, each simple
        let covered = 0;
        for (let r2 = 0; r2 < d.runs.length; r2++) {
          const run = d.runs[r2];
          expect(runIsSimple(d.points, run.vertices, run.closed)).toBe(true);
          covered += run.vertices.length - (run.closed ? 0 : 1);
          if (r2 > 0) expect(run.vertices[0]).toBe(d.runs[r2 - 1].vertices[d.runs[r2 - 1].vertices.length - 1]);
        }
        expect(covered).toBe(pairs);
        return true;
      }),
    );
  }, TIMEOUT);
});
