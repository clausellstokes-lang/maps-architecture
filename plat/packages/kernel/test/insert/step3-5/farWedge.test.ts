// M0-a-05 fix round S1: the session's rulings N-38 as amended by N-40 (J186, J188; C-0200). §3.6 step 4 resolves two
// consecutive crossings closer than `minEdge` at the acute corner they straddle, a move of at most minEdge / (2 tan(θ/2))
// — a bound with no limit as θ → 0. A mandatory chain is therefore wedge-routed only where the move is at most
// 2 · √2 · `attractCm` ≈ 73.5 cm (θ ≥ 19.3° at minEdge 25), the largest move under which §3.7's attracted bound still
// holds; beyond it its crossings are placed in turn by the placement rule (the second at least `minEdge` from the first,
// a step across the sliver) or by its endpoint fallback. An optional chain is still refused E_BELOW_MIN_EDGE above
// `attractCm` (unchanged). Each far case below is a sliver corner whose wedge route would move the chain metres; its
// negative control is the optional twin, whose refusal reports the move the wedge route would make (the route the code
// took before the ruling). At the cap: a 73 cm move keeps its wedge route, a 74 cm move is placed in turn. A wedge route
// moving the chain at most `attractCm` is unchanged.
import { describe, expect, it } from 'vitest';
import { outgoing, type Plat } from '../../../src/arena/index.js';
import { allProblems, contentPrint, edgeRows, indexed, ins, liveEdges, tx, vertexAtPoint } from './support.js';

const ATTRACT = 26;
/** §3.6 *Existing geometry wins*: an incoming chain vertex moves at most √2 · attractCm (the attracted bound of §3.7). */
const ATTRACTED_BOUND = Math.SQRT2 * ATTRACT;
/** N-40: the largest wedge move a mandatory chain takes, 2 · √2 · attractCm ≈ 73.54 cm. */
const WEDGE_CAP = 2 * Math.SQRT2 * ATTRACT;

/** The distance from (px, py) to the segment a–b. */
function segDist(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(ax + t * dx - px, ay + t * dy - py);
}

/** Every vertex of an edge carrying the entity's row, with its distance from the input polyline. */
function chainMove(p: Plat, entity: string, input: readonly (readonly [number, number])[]): number {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  let most = 0;
  for (const [a, b] of liveEdges(p)) {
    const rows = edgeRows(p, [X[a], Y[a]], [X[b], Y[b]]) ?? [];
    if (!rows.some((r) => r.endsWith(`/${entity}`))) continue;
    for (const v of [a, b]) {
      let d = Infinity;
      for (let i = 0; i + 1 < input.length; i++) d = Math.min(d, segDist(X[v], Y[v], input[i][0], input[i][1], input[i + 1][0], input[i + 1][1]));
      most = Math.max(most, d);
    }
  }
  return most;
}

/** The move an optional chain's E_BELOW_MIN_EDGE detail reports for its wedge route, in cm. */
function reportedMove(detail: string): number {
  const m = /\(([0-9.]+) cm\)/.exec(detail);
  expect(m).not.toBeNull();
  return Number(m?.[1]);
}

/** An L0 frame round ±30 000 cm and an L1 sliver: corner (−10 000, 0), arms to (10 000, 0) and (10 000, h). */
function sliver(h: number): Plat {
  const b = indexed({
    vertices: [[-30000, -30000, 0], [30000, -30000, 0], [30000, 30000, 0], [-30000, 30000, 0], [-10000, 0, 1], [10000, 0, 1], [10000, h, 1]],
    edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [4, 5, 1], [4, 6, 1]],
  });
  expect(allProblems(b.plat)).toEqual([]);
  return b.plat;
}

describe('N-38/N-40: no wedge route beyond 2 · √2 · attractCm (the arrangement\'s sliver corner)', () => {
  // N-38 asks for a 0.5° sliver crossed 100 m from its corner; two crossings of a 0.5° corner closer than minEdge lie
  // within 28.6 m of it (25 / tan 0.5°), so both figures are kept in two cases (C-0200): a 0.12° sliver crossed 100 m
  // from its corner (crossings 21 cm apart) and a 0.5° sliver crossed 25 m from it (21.9 cm apart).
  for (const [title, h, x, wedgeMove] of [
    ['a 0.12° sliver with 200 m arms crossed 100 m from its corner', 42, 0, 10000],
    ['a 0.5° sliver with 200 m arms crossed 25 m from its corner', 175, -7500, 2500],
  ] as const) {
    const input = [[x, -2000], [x, 2000]] as const;

    it(`${title}: the mandatory chain moves ≤ attractCm, keeps §3.10's invariants and the attracted bound; the corner is not on it`, () => {
      const p = sliver(h);
      const r = ins(tx(p, 1), input, [{ role: 'way', entity: 'way:c' }]);
      expect(r.ok).toBe(true);
      expect(allProblems(p)).toEqual([]);
      if (!r.ok) return;
      expect(r.warnings.map((w) => w.code)).not.toContain('W_WEDGE_ROUTED');
      const move = chainMove(p, 'way:c', input);
      expect(move).toBeLessThanOrEqual(ATTRACT);
      expect(move).toBeLessThanOrEqual(ATTRACTED_BOUND);
      // The corner is not on the chain: no edge at it carries the chain's row.
      const k = vertexAtPoint(p, -10000, 0);
      for (const g of outgoing(p, k)) {
        const w = p.halfEdges.origin[g ^ 1];
        expect(edgeRows(p, [-10000, 0], [p.vertices.x[w], p.vertices.y[w]])).not.toContain('way/way:c');
      }
      // Both arms crossed: a crossing vertex on each, the span between them at least minEdge.
      const X = p.vertices.x;
      const Y = p.vertices.y;
      const span = liveEdges(p).filter(([a, b]) => (edgeRows(p, [X[a], Y[a]], [X[b], Y[b]]) ?? []).includes('way/way:c') && Math.abs(Y[a]) < 200 && Math.abs(Y[b]) < 200);
      expect(span.length).toBeGreaterThanOrEqual(1);
      for (const [a, b] of liveEdges(p)) expect((X[a] - X[b]) ** 2 + (Y[a] - Y[b]) ** 2).toBeGreaterThanOrEqual(625);
    });

    it(`${title}: negative control — the optional twin is refused E_BELOW_MIN_EDGE, the wedge route it reports moving the chain ${wedgeMove / 100} m (the route taken before N-38), nothing written`, () => {
      const p = sliver(h);
      const before = contentPrint(p);
      const r = ins(tx(p, 1), input, [{ role: 'way', entity: 'way:c' }], 'optional');
      expect(r.ok).toBe(false);
      if (r.ok) return;
      expect(r.code).toBe('E_BELOW_MIN_EDGE');
      expect(Math.abs(reportedMove(r.detail) - wedgeMove)).toBeLessThanOrEqual(1);
      expect(contentPrint(p)).toBe(before);
    });
  }
});

describe('N-38/N-40 at the chain\'s own corner: a V whose tip stands 100 m past a street, its arms crossing it 13 cm apart', () => {
  const street = (): Plat => {
    const b = indexed({
      vertices: [[-30000, -30000, 0], [30000, -30000, 0], [30000, 30000, 0], [-30000, 30000, 0], [-10000, 0, 1], [10000, 0, 1]],
      edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [4, 5, 1]],
    });
    return b.plat;
  };
  const input = [[-10, -5000], [0, 10000], [10, -5000]] as const;

  it('the mandatory V keeps its tip (no wedge route); its crossings are placed in turn — the second arm routed through the first crossing; the chain moves ≤ attractCm', () => {
    const p = street();
    const r = ins(tx(p, 1), input, [{ role: 'way', entity: 'way:v' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    expect(r.warnings.map((w) => w.code)).not.toContain('W_WEDGE_ROUTED');
    const tip = r.value.placed[1];
    expect([p.vertices.x[tip], p.vertices.y[tip]]).toEqual([0, 10000]);
    expect(chainMove(p, 'way:v', input)).toBeLessThanOrEqual(ATTRACT);
  });

  it('negative control: the optional twin reports a wedge route moving the tip 100 m (the route taken before N-38) and is refused E_BELOW_MIN_EDGE', () => {
    const p = street();
    const before = contentPrint(p);
    const r = ins(tx(p, 1), input, [{ role: 'way', entity: 'way:v' }], 'optional');
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_BELOW_MIN_EDGE');
    expect(Math.abs(reportedMove(r.detail) - 10000)).toBeLessThanOrEqual(1);
    expect(contentPrint(p)).toBe(before);
  });
});

describe('N-38/N-40: a wedge route moving the chain at most attractCm is unchanged', () => {
  it('a segment leaving a vertex 26 cm along one arm of a 30° corner crosses the other arm 15 cm from its start: routed through the corner (W_WEDGE_ROUTED, a move of 26 cm), the arm unsplit', () => {
    // The corner k = (0, 0); one arm k – (26, 0) – (4000, 0), the other k – (3464, 2000) at 30°. The segment from (26, 0)
    // straight up crosses the second arm at (26, 15.0): closer than minEdge to its start, the corner beside it (C-0177
    // (5) (b)), 26 cm from the segment — at attractCm, so the wedge route stands.
    const b = indexed({
      vertices: [[-6000, -6000, 0], [6000, -6000, 0], [6000, 6000, 0], [-6000, 6000, 0], [0, 0, 1], [26, 0, 1], [4000, 0, 1], [3464, 2000, 1]],
      edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [4, 5, 1], [5, 6, 1], [4, 7, 1]],
    });
    const p = b.plat;
    expect(allProblems(p)).toEqual([]);
    const r = ins(tx(p, 1), [[26, 0], [26, 2000]], [{ role: 'way', entity: 'way:w' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    expect(r.warnings.map((w) => w.code)).toContain('W_WEDGE_ROUTED');
    expect(edgeRows(p, [26, 0], [0, 0])).toContain('way/way:w');
    expect(edgeRows(p, [0, 0], [26, 2000])).toEqual(['way/way:w']);
    expect(edgeRows(p, [0, 0], [3464, 2000])).not.toBeNull(); // the arm unsplit
    expect(edgeRows(p, [0, 0], [3464, 2000])).not.toContain('way/way:w');
  });
});

describe('N-40 at the cap: a 73 cm wedge move keeps its route, a 74 cm move is placed in turn', () => {
  // A 19° corner k = (0, 0) of two L1 arms to (4000, ±669); a vertical L1 chain at x = d crosses both arms 2 · d ·
  // 669 / 4000 apart (24.4 cm at 73, 24.8 cm at 74: closer than minEdge, so step 4's wedge test reads the corner), and
  // the wedge route through k would move it d. The cap is 2 · √2 · attractCm ≈ 73.54 cm.
  const corner = (): Plat => {
    const b = indexed({
      vertices: [[-6000, -6000, 0], [6000, -6000, 0], [6000, 6000, 0], [-6000, 6000, 0], [0, 0, 1], [4000, 669, 1], [4000, -669, 1]],
      edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [4, 5, 1], [4, 6, 1]],
    });
    expect(allProblems(b.plat)).toEqual([]);
    return b.plat;
  };

  it('d = 73 cm (≤ the cap): the mandatory chain is routed through the corner (W_WEDGE_ROUTED), the arms unsplit; the optional twin is refused E_BELOW_MIN_EDGE (73 > attractCm, unchanged)', () => {
    expect(73).toBeLessThanOrEqual(WEDGE_CAP);
    const p = corner();
    const input = [[73, -2000], [73, 2000]] as const;
    const r = ins(tx(p, 1), input, [{ role: 'way', entity: 'way:c' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    expect(r.warnings.map((w) => w.code)).toContain('W_WEDGE_ROUTED');
    expect(edgeRows(p, [73, -2000], [0, 0])).toEqual(['way/way:c']);
    expect(edgeRows(p, [0, 0], [73, 2000])).toEqual(['way/way:c']);
    expect(edgeRows(p, [0, 0], [4000, 669])).not.toBeNull();
    expect(edgeRows(p, [0, 0], [4000, -669])).not.toBeNull();
    expect(Math.abs(chainMove(p, 'way:c', input) - 73)).toBeLessThanOrEqual(0.01);

    const q = corner();
    const before = contentPrint(q);
    const o = ins(tx(q, 1), input, [{ role: 'way', entity: 'way:c' }], 'optional');
    expect(o.ok).toBe(false);
    if (o.ok) return;
    expect(o.code).toBe('E_BELOW_MIN_EDGE');
    expect(Math.abs(reportedMove(o.detail) - 73)).toBeLessThanOrEqual(0.1);
    expect(contentPrint(q)).toBe(before);
  });

  it('d = 74 cm (> the cap): the mandatory chain has its crossings placed in turn — no wedge route, the corner not on it, every edge ≥ minEdge, the chain within the attracted bound', () => {
    expect(74).toBeGreaterThan(WEDGE_CAP);
    const p = corner();
    const input = [[74, -2000], [74, 2000]] as const;
    const r = ins(tx(p, 1), input, [{ role: 'way', entity: 'way:c' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    expect(r.warnings.map((w) => w.code)).not.toContain('W_WEDGE_ROUTED');
    const k = vertexAtPoint(p, 0, 0);
    for (const g of outgoing(p, k)) {
      const w = p.halfEdges.origin[g ^ 1];
      expect(edgeRows(p, [0, 0], [p.vertices.x[w], p.vertices.y[w]])).not.toContain('way/way:c');
    }
    expect(chainMove(p, 'way:c', input)).toBeLessThanOrEqual(ATTRACTED_BOUND);
    const X = p.vertices.x;
    const Y = p.vertices.y;
    for (const [a, b] of liveEdges(p)) expect((X[a] - X[b]) ** 2 + (Y[a] - Y[b]) ** 2).toBeGreaterThanOrEqual(625);
  });
});
