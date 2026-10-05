// M0-a-08's offsetFace and insetRing (§3.4; §3.7 *Insets*; §3.11; §13.1's properties "offset(−d) ∘ offset(+d) ⊆
// original and insetRing empties monotonically" and its further limits "insetRing at 0 (the face's ring), below 0
// (outward, never collapsing) and on a non-convex face (E_NON_CONVEX)"). Faces are built in an arena through the
// insertion door (support.ts); offsetFace's positive distances are inward setbacks, so offset(+d) is the inset and
// offset(−d) the outward offset — the face united with a round buffer of its rings (§3.7: "unites the face with a
// buffer of its ring for an outward one").
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { booleans, buffer, faceEdges, insetRing, offsetFace, type InsetCollapsed, type Ring } from '../../../src/arr/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { area2Exact, areaOf, arenaFace, distToSegment, insideRings, perimeterOf, R, rect, simpleRing, TIMEOUT } from './support.js';

function rings(r: { ok: boolean; value?: Ring[]; code?: string; detail?: string }): Ring[] {
  if (!r.ok || r.value === undefined) throw new Error(`refused: ${String(r.code)} ${String(r.detail)}`);
  return r.value;
}

/** Twice the area of x less y (cm²), through booleans; 0 when the difference is empty. */
function areaOutside(x: readonly Ring[], y: readonly Ring[]): number {
  const d = booleans('difference', x, y, 'nonzero');
  return d.ok ? areaOf(d.value) : 0;
}

const MOVES = ['W_ATTRACTED', 'W_STRETCH_SHARED', 'W_WEDGE_ROUTED', 'W_PLACED'];

/** Did the result report a move (§3.7's split)? A refusal's warnings count too. */
function moved(r: { ok: boolean; warnings?: readonly { code: string; count: number }[] }): boolean {
  return (r.warnings ?? []).some((w) => MOVES.includes(w.code) && w.count > 0);
}

/** The outward offset of a ring set by d: the set united with a round buffer of its rings (§3.7 *Insets*), and whether it moved anything. */
function outward(x: readonly Ring[], d: number): { rings: Ring[]; moved: boolean } {
  const chains = x.map((r) => [...r, r[0]]);
  const b = buffer(chains, d, 'round', 'round');
  const u = booleans('union', x, b.ok ? b.value : [], 'nonzero');
  return { rings: rings(u), moved: moved(b) || moved(u) };
}

const L_FACE = R([0, 0], [3000, 0], [3000, 1000], [1000, 1000], [1000, 3000], [0, 3000]);

describe('offsetFace (§3.7: face − ⋃ buffer(edgeᵢ, dᵢ))', () => {
  it('a uniform setback of a square is the inner square, exactly', () => {
    const { tx, face } = arenaFace([rect(0, 0, 1000, 1000)]);
    expect(rings(offsetFace(tx, face, [100, 100, 100, 100]))).toEqual([rect(100, 100, 900, 900)]);
  });

  it('per-edge distances in faceEdges order: from the lowest-leftmost vertex, counter-clockwise', () => {
    const { tx, face } = arenaFace([rect(0, 0, 1000, 1000)]);
    const edges = faceEdges(tx, face);
    expect(edges.map((e) => [e.a.x, e.a.y])).toEqual([[0, 0], [1000, 0], [1000, 1000], [0, 1000]]);
    expect(rings(offsetFace(tx, face, [100, 0, 200, 0]))).toEqual([rect(0, 100, 1000, 800)]);
  });

  it('a concave face: the reflex corner rounded, every point at least d from the boundary (less the snap)', () => {
    const { tx, face } = arenaFace([L_FACE]);
    const out = rings(offsetFace(tx, face, [200, 200, 200, 200, 200, 200]));
    expect(out).toHaveLength(1);
    expect(simpleRing(out[0])).toBe(true);
    for (const p of out[0]) {
      let d = Infinity;
      for (let i = 0; i < L_FACE.length; i += 1) d = Math.min(d, distToSegment(p.x, p.y, L_FACE[i], L_FACE[(i + 1) % L_FACE.length]));
      expect(d).toBeGreaterThanOrEqual(200 - 1);
      expect(insideRings([L_FACE], p.x, p.y)).toBe(true);
    }
    expect(areaOutside(out, [L_FACE])).toBe(0);
  });

  it('a face with a hole is set back from the hole too', () => {
    const { tx, face } = arenaFace([rect(0, 0, 3000, 3000), rect(1000, 1000, 2000, 2000).reverse()]);
    const n = faceEdges(tx, face).length;
    expect(n).toBe(8);
    const out = rings(offsetFace(tx, face, new Array<number>(n).fill(100)));
    expect(out).toHaveLength(2);
    expect(area2Exact(out[0]) > 0n).toBe(true);
    expect(area2Exact(out[1]) < 0n).toBe(true);
  });

  it('distances follow faceEdges’ order across holes: the outer ring, then each hole from its lowest-leftmost vertex, in that vertex order', () => {
    const A = rect(1000, 1000, 2000, 2000).reverse();
    const B = rect(4000, 1000, 5000, 2000).reverse();
    // B entered before A: the order is the lattice points', never the insertion's or the slots'
    const { tx, face } = arenaFace([rect(0, 0, 6000, 3000), B, A]);
    const edges = faceEdges(tx, face);
    expect(edges.map((e) => [e.a.x, e.a.y])).toEqual([
      [0, 0], [6000, 0], [6000, 3000], [0, 3000],
      [1000, 1000], [1000, 2000], [2000, 2000], [2000, 1000],
      [4000, 1000], [4000, 2000], [5000, 2000], [5000, 1000],
    ]);
    // only hole A's edges set back by 1 m: hole A grows into a rounded square, hole B and the outer ring stay
    const out = rings(offsetFace(tx, face, [0, 0, 0, 0, 100, 100, 100, 100, 0, 0, 0, 0]));
    expect(out).toHaveLength(3);
    expect(out[0]).toEqual(rect(0, 0, 6000, 3000));
    expect(out).toContainEqual(R([4000, 1000], [4000, 2000], [5000, 2000], [5000, 1000]));
    const grown = out.find((r) => area2Exact(r) < 0n && r.some((p) => p.x < 3000));
    expect(grown).toBeDefined();
    const xs = (grown ?? []).map((p) => p.x);
    expect(Math.min(...xs)).toBe(900);
    expect(Math.max(...xs)).toBe(2100);
    // 1 m² + the four 10 m × 1 m strips + a disc of 1 m radius less its chords' segments
    const want = 1_000_000 + 400_000 + Math.PI * 10_000;
    expect(-areaOf([grown ?? []])).toBeLessThanOrEqual(want + 1_000);
    expect(-areaOf([grown ?? []])).toBeGreaterThan(want - 2 * Math.PI * 100 * 2 - 1_000);
  });

  it('a setback deeper than half the face but short of its reach leaves the face beyond it (the empty shortcut only past the reach)', () => {
    const { tx, face } = arenaFace([rect(0, 0, 1000, 1000)]);
    expect(rings(offsetFace(tx, face, [800, 0, 0, 0]))).toEqual([rect(0, 800, 1000, 1000)]);
    expect(rings(offsetFace(tx, face, [900, 0, 0, 0]))).toEqual([rect(0, 900, 1000, 1000)]);
  });

  it('a setback past the middle is E_DEGENERATE empty; a wrong distance list is the caller’s error', () => {
    const { tx, face } = arenaFace([rect(0, 0, 1000, 1000)]);
    expect(offsetFace(tx, face, [600, 600, 600, 600])).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    expect(() => offsetFace(tx, face, [100, 100, 100])).toThrow(RangeError);
    expect(() => offsetFace(tx, face, [100, 100, -1, 100])).toThrow(RangeError);
  });

  it('zero distances leave the face', () => {
    const { tx, face } = arenaFace([L_FACE]);
    expect(rings(offsetFace(tx, face, [0, 0, 0, 0, 0, 0]))).toEqual([L_FACE]);
  });
});

describe('insetRing (§3.7 Insets; §13.1 further limits)', () => {
  it('at 0: the face’s ring', () => {
    const { tx, face } = arenaFace([rect(0, 0, 1000, 600)]);
    expect(rings(insetRing(tx, face, 0))).toEqual([rect(0, 0, 1000, 600)]);
  });

  it('inward by d: the half-plane inset, exactly on a rectangle', () => {
    const { tx, face } = arenaFace([rect(0, 0, 1000, 600)]);
    expect(rings(insetRing(tx, face, 100))).toEqual([rect(100, 100, 900, 500)]);
  });

  it('below 0: outward on the same path (the corners sharp), never collapsing', () => {
    const { tx, face } = arenaFace([rect(0, 0, 1000, 600)]);
    expect(rings(insetRing(tx, face, -100))).toEqual([rect(-100, -100, 1100, 700)]);
    expect(insetRing(tx, face, -1_000_000).ok).toBe(true);
  });

  it('on a non-convex face, and on a face with a hole: E_NON_CONVEX', () => {
    const l = arenaFace([L_FACE]);
    expect(insetRing(l.tx, l.face, 100)).toMatchObject({ ok: false, code: 'E_NON_CONVEX' });
    const h = arenaFace([rect(0, 0, 3000, 3000), rect(1000, 1000, 2000, 2000).reverse()]);
    expect(insetRing(h.tx, h.face, 100)).toMatchObject({ ok: false, code: 'E_NON_CONVEX' });
  });

  it('past the inradius: E_DEGENERATE collapsed, carrying the last non-empty distance and its inset', () => {
    const { tx, face } = arenaFace([rect(0, 0, 1000, 600)]);
    const r = insetRing(tx, face, 400);
    expect(r).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'collapsed' });
    const c = r as InsetCollapsed;
    expect(c.lastCm).toBeGreaterThan(0);
    expect(c.lastCm).toBeLessThan(300);
    expect(insetRing(tx, face, c.lastCm)).toMatchObject({ ok: true, value: c.partial });
    expect(insetRing(tx, face, c.lastCm + 1).ok).toBe(false);
  });

  it('an inset the half-planes leave thinner than attraction keeps is collapsed, carrying the move (C-0196 (5))', () => {
    // a 1 m wide rectangle inset by 45 cm leaves a 10 cm strip in doubles, which attraction folds to nothing
    const { tx, face } = arenaFace([rect(0, 0, 1000, 100)]);
    const r = insetRing(tx, face, 45);
    expect(r).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'collapsed' });
    const c = r as InsetCollapsed;
    expect(c.warnings.some((w) => MOVES.includes(w.code) && w.count > 0)).toBe(true);
    expect(c.lastCm).toBeLessThan(45);
    expect(insetRing(tx, face, c.lastCm)).toMatchObject({ ok: true, value: c.partial });
  });

  it('a whole number of centimetres only', () => {
    const { tx, face } = arenaFace([rect(0, 0, 1000, 600)]);
    expect(() => insetRing(tx, face, 1.5)).toThrow(RangeError);
  });
});

const convexFace = fc.oneof(
  fc.record({ w: fc.integer({ min: 200, max: 20_000 }), h: fc.integer({ min: 200, max: 20_000 }) }).map(({ w, h }) => rect(0, 0, w, h)),
  fc.record({ n: fc.integer({ min: 3, max: 12 }), r: fc.integer({ min: 300, max: 20_000 }), phi: fc.integer({ min: 0, max: 359 }) }).map(({ n, r, phi }) =>
    Array.from({ length: n }, (_, j) => {
      const t = ((phi + (360 * j) / n) * Math.PI) / 180;
      return { x: Math.round(r * Math.cos(t)), y: Math.round(r * Math.sin(t)) } as LatticePoint;
    }),
  ),
);

describe('§13.1 properties', () => {
  it('insetRing empties monotonically: each inset inside the one before, the area never growing, once collapsed always collapsed', { timeout: TIMEOUT }, () => {
    fc.assert(
      fc.property(convexFace, fc.array(fc.integer({ min: 1, max: 4000 }), { minLength: 2, maxLength: 5 }), (ring, ds) => {
        const { tx, face } = arenaFace([ring]);
        const steps = [0, ...ds.sort((a, b) => a - b)];
        let prev: Ring[] | null = null;
        let collapsed = false;
        for (const d of steps) {
          const r = insetRing(tx, face, d);
          if (!r.ok) {
            if (r.code !== 'E_DEGENERATE') return false;
            collapsed = true;
            continue;
          }
          if (collapsed) return false;
          if (prev !== null) {
            if (areaOf(r.value) > areaOf(prev)) return false;
            if (areaOutside(r.value, prev) > perimeterOf(r.value) * 1) return false;
          }
          prev = r.value;
        }
        return true;
      }),
      { numRuns: 60 },
    );
  });

  it('offset(−d) ∘ offset(+d) ⊆ original (within the snap, perimeter × 1 cm; within perimeter × √2 · attractCm where a step moved a feature, §3.7 — the perimeter of both sets)', { timeout: TIMEOUT }, () => {
    const face = fc.oneof(
      convexFace,
      fc.record({ w: fc.integer({ min: 1500, max: 8000 }), h: fc.integer({ min: 1500, max: 8000 }), a: fc.integer({ min: 500, max: 1400 }), b: fc.integer({ min: 500, max: 1400 }) }).map(({ w, h, a, b }) =>
        R([0, 0], [w, 0], [w, b], [a, b], [a, h], [0, h]),
      ),
    );
    fc.assert(
      fc.property(face, fc.integer({ min: 30, max: 400 }), (ring, d) => {
        const { tx, face: f } = arenaFace([ring]);
        const n = faceEdges(tx, f).length;
        const inner = offsetFace(tx, f, new Array<number>(n).fill(d));
        if (!inner.ok) return inner.code === 'E_DEGENERATE';
        const back = outward(inner.value, d);
        const slack = moved(inner) || back.moved ? Math.SQRT2 * 26 : 1;
        // §3.7's perimeter: the summed boundary length of both sets compared — the original and the round trip, whose
        // outward step carries a move of the inward one round the longer, rounded boundary (C-0198)
        return areaOutside(back.rings, [ring]) <= (perimeterOf([ring]) + perimeterOf(back.rings)) * slack;
      }),
      { numRuns: 40 },
    );
  });
});
