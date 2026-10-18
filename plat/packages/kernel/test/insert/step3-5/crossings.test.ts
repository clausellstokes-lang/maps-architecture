// M0-a-05: insertion step 4 — exact crossings, the placement rule on the crossed run, and wedge routing at acute corners
// (§3.6 *Attraction*, step 4; *Existing geometry wins*; *Chain classes*). The arrangement's acute corner (two crossings
// along one new segment closer than minEdge: routed through the corner's vertex) and the chain's own (two crossings
// along one existing edge: its corner vertex onto that edge at the placement point of its foot), the bound
// minEdge / (2 tan(θ/2)), the optional chain moving more than attractCm (E_BELOW_MIN_EDGE, nothing written), the
// crossing next to a vertex 25.0 – 25.7 cm from the crossed edge, and `insert.crossings` charged (C-0177 (5), (6)).
// Fix round 1 (the check's F-1: CC1, XC1) pinned the chain's corner rule at its minEdge bound — arms crossing 24.9 cm
// apart are a wedge; 25.6 cm apart no wedge (step 3 routes the second arm through the first crossing); 30.0 and 34.0 cm
// apart two crossings — and the one `insert.crossings` a corner charges.
//
// The wedge cap (C-0202 (3)) is step 4's wedge routing at its far end: its section follows.
import { describe, expect, it } from 'vitest';
import { outgoing, roleIdOf, rowsOn, type Plat } from '../../../src/arena/index.js';
import { INSERT_CROSSINGS } from '../../../src/insert/crossings.js';
import { wedgeBound } from '../../../src/insert/wedge.js';
import { allProblems, buildArena, contentPrint, edgeRows, framed, indexed, ins, liveEdges, liveVertices, segDist, tx, vertexAtPoint } from './support.js';

const SQ = (x: number): number => x * x;

/** The frame and an L1 corner of 30° at k = (2000, 1000): arms to (2388, 2449) and (1612, 2449) (±15° from north). */
function corner(): ReturnType<typeof framed> {
  const p = framed();
  const r = ins(tx(p, 1), [[2388, 2449], [2000, 1000], [1612, 2449]], [{ role: 'way', entity: 'way:v' }]);
  expect(r.ok).toBe(true);
  expect(allProblems(p)).toEqual([]);
  return p;
}

describe('step 4: exact crossings placed by the placement rule', () => {
  it('a steep crossing makes one vertex on the crossed edge, within its hot pixel and at least minEdge from every end; insert.crossings charged', () => {
    const p = framed();
    ins(tx(p, 1), [[500, 2000], [3500, 2000]], [{ role: 'way', entity: 'way:1' }]);
    const t = tx(p, 2);
    const r = ins(t, [[1700, 1000], [1900, 3000]], [{ role: 'kerb', entity: 'way:2' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    const cross = liveVertices(p).filter((v) => p.vertices.level[v] === 2 && Math.abs(p.vertices.y[v] - 2000) <= 0.71);
    expect(cross).toHaveLength(1);
    for (const h of outgoing(p, cross[0])) {
      const w = p.halfEdges.origin[h ^ 1];
      expect(SQ(p.vertices.x[w] - p.vertices.x[cross[0]]) + SQ(p.vertices.y[w] - p.vertices.y[cross[0]])).toBeGreaterThanOrEqual(625);
    }
    expect(t.work.counts.get(INSERT_CROSSINGS)).toBe(1);
  });

  it('a chain crossing an edge next to a vertex standing 25.0 – 25.7 cm from it leaves no edge below minEdge (the placement rule through insertChain)', () => {
    // Hand-built (insertion would attract a vertex that close): the L1 edge (−5000, 0)–(5000, 0) and an L1 antenna from
    // (517, 5000) down to (517, 25 + k/10) for k = 0 … 7, standing 25.0 – 25.7 cm above it.
    for (let k = 0; k <= 7; k++) {
      const yTip = 25 + k / 10;
      for (const tipY of [Math.floor(yTip), Math.ceil(yTip)]) {
        if (tipY < 25) continue;
        const b = indexed({
          vertices: [[-6000, -6000, 0], [6000, -6000, 0], [6000, 6000, 0], [-6000, 6000, 0], [-6000, 0, 1], [6000, 0, 1], [517, 6000, 1], [517, tipY, 1]],
          edges: [[0, 1, 0], [1, 5, 0], [5, 2, 0], [2, 6, 0], [6, 3, 0], [3, 4, 0], [4, 0, 0], [4, 5, 1], [6, 7, 1]],
        });
        const p = b.plat;
        expect(allProblems(p)).toEqual([]);
        // An L1 chain crossing the edge right beside the tip's foot, steeply.
        const r = ins(tx(p, 1), [[490, -800], [560, 800]], [{ role: 'way', entity: 'way:c' }]);
        expect(r.ok).toBe(true);
        expect(allProblems(p)).toEqual([]);
      }
    }
  });
});

describe('wedge routing at the arrangement\'s acute corner (two crossings along one new segment closer than minEdge)', () => {
  it('a mandatory chain 40 cm from the 30° corner (crossings 21.4 cm apart) is routed through the corner: W_WEDGE_ROUTED, moved ≤ minEdge / (2 tan 15°)', () => {
    const p = corner();
    const r = ins(tx(p, 2), [[1500, 1040], [2500, 1040]], [{ role: 'kerb', entity: 'way:k' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    expect(r.warnings.map((w) => w.code)).toContain('W_WEDGE_ROUTED');
    const k = vertexAtPoint(p, 2000, 1000);
    const kerb = roleIdOf('kerb');
    expect(outgoing(p, k).filter((h) => rowsOn(p, 'edge', h).some((row) => p.roles.kind[row] === kerb))).toHaveLength(2);
    // No vertex was made on either arm: the chain passes through the corner.
    expect(liveVertices(p).filter((v) => p.vertices.level[v] === 2 && p.vertices.y[v] > 1000 && p.vertices.y[v] < 1100 && Math.abs(p.vertices.x[v] - 2000) < 100)).toHaveLength(0);
    expect(40).toBeLessThanOrEqual(wedgeBound(3000));
  });

  it('an optional chain that would move more than attractCm is rejected E_BELOW_MIN_EDGE and writes nothing', () => {
    const p = corner();
    const before = contentPrint(p);
    const t = tx(p, 2);
    const r = ins(t, [[1500, 1040], [2500, 1040]], [{ role: 'kerb', entity: 'way:k' }], 'optional');
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_BELOW_MIN_EDGE');
    expect(contentPrint(p)).toBe(before);
    expect(allProblems(p)).toEqual([]);
    expect(t.warnings).toEqual([]);
  });

  it('at 20 cm the corner stands within attractCm of the chain: step 3 routes through it (W_ATTRACTED, no wedge)', () => {
    const p = corner();
    const r = ins(tx(p, 2), [[1500, 1020], [2500, 1020]], [{ role: 'kerb', entity: 'way:k' }], 'optional');
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.warnings.map((w) => w.code)).toContain('W_ATTRACTED');
    expect(r.warnings.map((w) => w.code)).not.toContain('W_WEDGE_ROUTED');
    expect(allProblems(p)).toEqual([]);
  });

  it('at 60 cm the crossings stand 32 cm apart: two crossing vertices, the span between them at least minEdge (the fourth edge kind)', () => {
    const p = corner();
    const r = ins(tx(p, 2), [[1500, 1060], [2500, 1060]], [{ role: 'kerb', entity: 'way:k' }], 'optional');
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    const onArms = liveVertices(p).filter((v) => p.vertices.level[v] === 2 && Math.abs(p.vertices.y[v] - 1060) <= 2 && Math.abs(p.vertices.x[v] - 2000) < 100);
    expect(onArms).toHaveLength(2);
    const [u, w] = onArms;
    expect(SQ(p.vertices.x[u] - p.vertices.x[w]) + SQ(p.vertices.y[u] - p.vertices.y[w])).toBeGreaterThanOrEqual(625);
  });

  it('wedgeBound: 0.47 m at the 30° junction floor, 1.2 m at the 12° plot floor (§3.6)', () => {
    expect(wedgeBound(3000)).toBeCloseTo(25 / (2 * Math.tan((15 * Math.PI) / 180)), 9);
    expect(Math.round(wedgeBound(3000))).toBe(47);
    expect(wedgeBound(1200)).toBeCloseTo(25 / (2 * Math.tan((6 * Math.PI) / 180)), 9);
    expect(Math.round(wedgeBound(1200) / 10) / 10).toBe(1.2);
    expect(() => wedgeBound(0)).toThrow();
    expect(wedgeBound(1)).toBeGreaterThan(1e5);
    // The quotient through num/exact.ts's divScaled, bit for bit as the inline 2²⁰-scaled ratio() gave it (checks/M0-a-01-notes.md N-c2-4).
    expect([wedgeBound(1), wedgeBound(1200), wedgeBound(3000), wedgeBound(17999)]).toEqual([143239.44841909557, 118.92955567778233, 46.65063509461097, 0.001090830785266204]);
  });
});

describe('wedge routing at the chain\'s own acute corner (two crossings along one existing edge closer than minEdge)', () => {
  /** The frame and an L1 street along y = 2000. */
  function streetY(): ReturnType<typeof framed> {
    const p = framed();
    ins(tx(p, 1), [[300, 2000], [3700, 2000]], [{ role: 'way', entity: 'way:1' }]);
    return p;
  }

  it('a V whose tip stands 60 cm past the street, its arms crossing it 17 cm apart: the tip moves onto the street at its foot (W_WEDGE_ROUTED), ≤ the bound; the corner charges one insert.crossings', () => {
    const p = streetY();
    const t = tx(p, 2);
    const r = ins(t, [[1850, 1000], [2000, 2060], [2150, 1000]], [{ role: 'kerb', entity: 'way:v' }]);
    expect(r.ok).toBe(true);
    // The two crossings resolved at the chain's corner are one crossing resolved (C-0177 (5)): the tip lands on the street,
    // so neither arm crosses it afterwards.
    expect(t.work.counts.get(INSERT_CROSSINGS)).toBe(1);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    expect(r.warnings.map((w) => w.code)).toContain('W_WEDGE_ROUTED');
    const tip = r.value.placed[1];
    expect(Math.abs(p.vertices.y[tip] - 2000)).toBeLessThanOrEqual(0.71);
    expect(Math.abs(p.vertices.x[tip] - 2000)).toBeLessThanOrEqual(1);
    const theta = 2 * Math.atan2(150, 1060); // the V's angle
    expect(60).toBeLessThanOrEqual(wedgeBound(Math.round((theta * 18000) / Math.PI)));
    // The street is not cut twice: one new vertex on it.
    expect(liveVertices(p).filter((v) => Math.abs(p.vertices.y[v] - 2000) <= 0.71 && p.vertices.level[v] === 2)).toHaveLength(1);
  });

  it('the same V as an optional chain moves 60 cm > attractCm: E_BELOW_MIN_EDGE, nothing written', () => {
    const p = streetY();
    const before = contentPrint(p);
    const r = ins(tx(p, 2), [[1850, 1000], [2000, 2060], [2150, 1000]], [{ role: 'kerb', entity: 'way:v' }], 'optional');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_BELOW_MIN_EDGE');
    expect(contentPrint(p)).toBe(before);
  });

  // The arms of a V (2000 ∓ s, 1000), (2000, 2060) cross y = 2000 at 2000 ∓ 60 s / 1060: 120 s / 1060 cm apart. Only two
  // crossings closer than minEdge (25 cm) are the chain's own corner (§3.6 step 4). From 25 cm on they are no wedge: the
  // first arm crosses the street; the second then passes that crossing vertex — the part already inserted is existing
  // geometry (C-0177 (1)) — within attractCm up to about 26.6 cm apart (25.2 cm from it at s = 226), and is routed through
  // it by step 3 (W_ATTRACTED, one crossing vertex both arms share); farther apart the arms make two crossings with a (d)
  // edge between them.
  for (const [s, kind] of [[220, 'wedge'], [226, 'through'], [265, 'two'], [300, 'two']] as const) {
    const apart = (120 * s) / 1060;
    const title = kind === 'wedge' ? 'a wedge: its tip moves onto the street' : kind === 'through' ? 'no wedge: its tip free, the second arm routed through the first crossing (step 3)' : 'no wedge: two crossings, its tip free';
    it(`a V whose arms cross the street ${apart.toFixed(2)} cm apart (s = ${s}) is ${title}`, () => {
      const p = streetY();
      const t = tx(p, 2);
      const r = ins(t, [[2000 - s, 1000], [2000, 2060], [2000 + s, 1000]], [{ role: 'kerb', entity: 'way:v' }]);
      expect(r.ok).toBe(true);
      expect(allProblems(p)).toEqual([]);
      if (!r.ok) return;
      const codes = r.warnings.map((w) => w.code);
      expect(codes.includes('W_WEDGE_ROUTED')).toBe(kind === 'wedge');
      if (kind === 'wedge') expect(Math.abs(p.vertices.y[r.value.placed[1]] - 2000)).toBeLessThanOrEqual(0.71);
      else expect(p.vertices.y[r.value.placed[1]]).toBe(2060);
      const onStreet = liveVertices(p).filter((v) => Math.abs(p.vertices.y[v] - 2000) <= 0.71 && p.vertices.level[v] === 2);
      expect(onStreet).toHaveLength(kind === 'two' ? 2 : 1);
      if (kind === 'through') expect(codes).toContain('W_ATTRACTED');
      // One crossing resolved: at the corner, or the first arm's (the second routed through its vertex); else one per arm.
      expect(t.work.counts.get(INSERT_CROSSINGS)).toBe(kind === 'two' ? 2 : 1);
      if (kind === 'two') {
        const [u, w] = onStreet;
        expect(SQ(p.vertices.x[u] - p.vertices.x[w]) + SQ(p.vertices.y[u] - p.vertices.y[w])).toBeGreaterThanOrEqual(625);
      }
    });
  }

  it('a wide V (arms crossing 120 cm apart) is no wedge: two crossings, its tip free', () => {
    const p = streetY();
    const r = ins(tx(p, 2), [[1500, 1000], [2000, 2300], [2500, 1000]], [{ role: 'kerb', entity: 'way:v' }], 'optional');
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.warnings.map((w) => w.code)).not.toContain('W_WEDGE_ROUTED');
    expect(p.vertices.y[r.value.placed[1]]).toBe(2300);
    expect(liveVertices(p).filter((v) => Math.abs(p.vertices.y[v] - 2000) <= 0.71 && p.vertices.level[v] === 2)).toHaveLength(2);
    expect(allProblems(p)).toEqual([]);
  });
});

it('every edge a crossing makes is at least minEdge long (the arena after a dense crossing grid)', () => {
  const p = framed();
  for (let i = 0; i < 6; i++) ins(tx(p, 1), [[200 + i * 600 + (i % 2) * 7, 100], [260 + i * 600, 3900]], [{ role: 'way', entity: `way:v${i}` }]);
  for (let i = 0; i < 6; i++) ins(tx(p, 2), [[100, 230 + i * 610], [3900, 300 + i * 590]], [{ role: 'kerb', entity: `way:h${i}` }]);
  expect(allProblems(p)).toEqual([]);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  for (const [a, b] of liveEdges(p)) expect(SQ(X[a] - X[b]) + SQ(Y[a] - Y[b])).toBeGreaterThanOrEqual(625);
  void buildArena;
});

// ---- the wedge cap (C-0202 (3)) -----------------------------------------------------------------------------------------
//
// M0-a-05 fix round S1: the session's rulings N-38 as amended by N-40 (J186, J188; C-0202). §3.6 step 4 resolves two
// consecutive crossings closer than `minEdge` at the acute corner they straddle, a move of at most minEdge / (2 tan(θ/2))
// — a bound with no limit as θ → 0. A mandatory chain is therefore wedge-routed only where the move is at most
// 2 · √2 · `attractCm` ≈ 73.5 cm (θ ≥ 19.3° at minEdge 25), the largest move under which §3.7's attracted bound still
// holds; beyond it its crossings are placed in turn by the placement rule (the second at least `minEdge` from the first,
// a step across the sliver) or by its endpoint fallback. An optional chain is still refused E_BELOW_MIN_EDGE above
// `attractCm` (unchanged). Each far case below is a sliver corner whose wedge route would move the chain metres; its
// negative control is the optional twin, whose refusal reports the move the wedge route would make (the route the code
// took before the ruling). At the cap: a 73 cm move keeps its wedge route, a 74 cm move is placed in turn. A wedge route
// moving the chain at most `attractCm` is unchanged.

const ATTRACT = 26;
/** §3.6 *Existing geometry wins*: an incoming chain vertex moves at most √2 · attractCm (the attracted bound of §3.7). */
const ATTRACTED_BOUND = Math.SQRT2 * ATTRACT;
/** N-40: the largest wedge move a mandatory chain takes, 2 · √2 · attractCm ≈ 73.54 cm. */
const WEDGE_CAP = 2 * Math.SQRT2 * ATTRACT;
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
  // within 28.6 m of it (25 / tan 0.5°), so both figures are kept in two cases (C-0202): a 0.12° sliver crossed 100 m
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
