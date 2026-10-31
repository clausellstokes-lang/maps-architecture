// RQ1 across a chain's segments (N-61 (1); item 130 (d), §3.6 step 4; the S9 closing check's failing line, round S10):
// "a route never re-enters a vertex already on the chain's path ... the path is cut back to that vertex and routed on
// from it". The S9 cut kept one SEGMENT's path; a chain's next segment could still be attracted (step 3) back through a
// vertex its earlier segment routed through, sharing the chain's own edge back to it — a retraced edge, the vertex of
// degree 3 in the chain's row set, the chain's own corner a dead end. insertChain's passes now watch the run's committed
// route so far (its new and shared edges before the segment); a chain whose segment retraces it is routed again with
// that segment cut back (insertChain.ts `cutBack`, C-0423 (1)): the path is cut back to the vertex it re-entered and
// routed on from it — the corner's input point lands on that vertex, within √2 · attractCm (the bound attraction moves
// an incoming vertex by), so no landed input point is left off the route — and neither route retraces the path again.
//
// The arrangements are the S9 closing check's probe (`zzreenter`): the framed 4 000 cm square, an existing L0 `way` whose
// end W stands 30 cm from the chain's corner V (beyond attractCm = 26, so step 2 leaves V free) inside the corner's
// wedge, both arms passing within attractCm of W (18.8 cm at ±38.7°, 18.0 cm at ±36.9°). Before the round the chain
// committed A–W, W–V, W–B (W of degree 3, V a dead end, W_STRETCH_SHARED on its own edge V–W) and was refused '(way,
// way:c1) branches' under a linear key. Now it commits A–W–B, its corner's point on W (30 cm), a simple path. The
// constructive cases are the three the S9 check's class dump found at the census seed 20261013 (generator seeds below).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { addRole, type Plat, type VertexId } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/insertChain.js';
import { suiteEnv, suiteReport } from '../../../src/invariants/index.js';
import { ok } from '../../../src/num/index.js';
import { tx as txn } from '../../../src/tx/index.js';
import type { Level } from '../../../src/types/index.js';
import { spec } from '../../tx/support.js';
import { genChain } from './gen.js';
import { allProblems, dissolvableProblems, edgeRows, framed, generator, indexed, ins, intIn, liveEdges, pt, tx, vertexAtPoint } from './support.js';

/** The degree of every vertex in one row's edge set (`role/entity`), keyed by its lattice position. */
function rowDegrees(p: Plat, row: string): Map<string, number> {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const deg = new Map<string, number>();
  for (const [u, v] of liveEdges(p)) {
    if (!(edgeRows(p, [X[u], Y[u]], [X[v], Y[v]]) ?? []).includes(row)) continue;
    for (const w of [u, v]) deg.set(`${X[w]},${Y[w]}`, (deg.get(`${X[w]},${Y[w]}`) ?? 0) + 1);
  }
  return deg;
}

/** A simple open run: two vertices of degree 1, every other of degree 2 (none of degree 3 or more). */
function simpleOpen(deg: Map<string, number>): boolean {
  const ds = [...deg.values()];
  return ds.every((d) => d <= 2) && ds.filter((d) => d === 1).length === 2;
}

const at = (p: Plat, v: VertexId): string => `${p.vertices.x[v]},${p.vertices.y[v]}`;

/**
 * Every arrangement's warnings: one W_ATTRACTED, at the corner's input point (2 000, 2 000) — its point cut back onto W
 * (`cutBack`); no W_STRETCH_SHARED (no edge of the chain's own path shared again).
 */
const WARNINGS = [{ code: 'W_ATTRACTED', count: 1, at: { x: 2000, y: 2000 } }];

interface Arrangement {
  readonly name: string;
  /** The existing L0 way, W its end beside the corner. */
  readonly existing: readonly (readonly [number, number])[];
  readonly w: readonly [number, number];
  readonly chain: readonly (readonly [number, number])[];
}

const ARRANGEMENTS: readonly Arrangement[] = [
  { name: 'W east of V, arms at ±38.7°', existing: [[2030, 2000], [3500, 2000]], w: [2030, 2000], chain: [[2500, 2400], [2000, 2000], [2500, 1600]] },
  { name: 'W east of V, arms at ±36.9°', existing: [[2030, 2000], [3500, 2000]], w: [2030, 2000], chain: [[2400, 2300], [2000, 2000], [2400, 1700]] },
  { name: 'W west of V, arms at ±38.7°', existing: [[500, 2000], [1970, 2000]], w: [1970, 2000], chain: [[1500, 2400], [2000, 2000], [1500, 1600]] },
  { name: 'W north of V (the dead end of an existing way), arms at ±38.7°', existing: [[2000, 3500], [2000, 2030]], w: [2000, 2030], chain: [[1600, 2500], [2000, 2000], [2400, 2500]] },
];

describe('RQ1 across segments (item 130 (d)): a chain\'s next segment never re-enters a vertex its earlier segment routed through', () => {
  for (const c of ARRANGEMENTS) {
    it(`${c.name} — under \`invisible\`: commits A–W–B, the corner cut back onto W — a simple path (every vertex of degree ≤ 2), no W_STRETCH_SHARED on its own edge`, () => {
      const p = framed(4000);
      expect(ins(tx(p, 0), c.existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
      const r = ins(tx(p, 0), c.chain, [{ role: 'invisible', entity: 'c1' }]);
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      // The corner's point is cut back onto W (30 cm, within √2 · attractCm); the ends where they were drawn.
      expect(r.value.placed.map((v) => at(p, v))).toEqual([c.chain[0], c.w, c.chain[2]].map(([x, y]) => `${x},${y}`));
      const deg = rowDegrees(p, 'invisible/c1');
      expect([...deg.values()].every((d) => d <= 2), JSON.stringify([...deg])).toBe(true);
      expect(simpleOpen(deg)).toBe(true);
      // The route: A–W–B — W of degree 2, the ends of degree 1; no spur to V, and V gone (a free vertex, undone).
      expect(deg.get(`${c.w[0]},${c.w[1]}`)).toBe(2);
      expect(deg.size).toBe(3);
      expect(edgeRows(p, c.chain[0], c.w)).toEqual(['invisible/c1']);
      expect(edgeRows(p, c.w, c.chain[2])).toEqual(['invisible/c1']);
      expect(vertexAtPoint(p, c.chain[1][0], c.chain[1][1])).toBe(-1);
      expect(r.warnings).toEqual(WARNINGS);
      expect(allProblems(p)).toEqual([]);
      expect(dissolvableProblems(p)).toEqual([]);
    });

    it(`${c.name} — under a \`way\` key through M0-a-06's transaction (the suite wired in): the batch commits, the key a simple run`, () => {
      const p = framed(4000);
      expect(ins(tx(p, 0), c.existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
      const r = txn(p, spec(0), (o) => {
        const k = insertChain(o, c.chain.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: 'way:c1' }], 'mandatory');
        if (!k.ok) return k;
        return ok(null);
      }, suiteEnv({ report: suiteReport() }));
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      expect(simpleOpen(rowDegrees(p, 'way/way:c1'))).toBe(true);
      expect(allProblems(p)).toEqual([]);
    });
  }
});

// The cut back's candidates are taken nearest first (insertChain.ts `cutBack`; round S10's mutant ORDER): an existing L0
// way W2 (2 020, 2 028) – W (2 030, 2 000) – (3 500, 2 000) beside the corner V (2 000, 2 000); the first arm from
// A (2 300, 2 500) routes through both, A–W2–W, and the second arm goes back through W (a retrace of W–V). Both W
// (30.0 cm) and W2 (34.4 cm) stand within √2 · attractCm of V's input point; the corner lands on the nearer, W: the route
// A–W2–W–B, W2 and W of degree 2 (taken farthest first, the corner would land on W2).
describe('RQ1 across segments: the cut back takes the nearest vertex of the path first', () => {
  const existing: readonly (readonly [number, number])[] = [[2020, 2028], [2030, 2000], [3500, 2000]];
  const chain: readonly (readonly [number, number])[] = [[2300, 2500], [2000, 2000], [2500, 1600]];
  it('two candidates within √2 · attractCm (30.0 and 34.4 cm): the corner lands on the nearer, W (2 030, 2 000); the route A–W2–W–B a simple path', () => {
    const p = framed(4000);
    expect(ins(tx(p, 0), existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
    const r = ins(tx(p, 0), chain, [{ role: 'invisible', entity: 'c1' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(r.value.placed.map((v) => at(p, v))).toEqual(['2300,2500', '2030,2000', '2500,1600']);
    const deg = rowDegrees(p, 'invisible/c1');
    expect(simpleOpen(deg)).toBe(true);
    expect(deg.size).toBe(4);
    expect(edgeRows(p, [2300, 2500], [2020, 2028])).toEqual(['invisible/c1']);
    expect(edgeRows(p, [2020, 2028], [2030, 2000])).toEqual(['invisible/c1', 'way/way:ex']);
    expect(edgeRows(p, [2030, 2000], [2500, 1600])).toEqual(['invisible/c1']);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(-1);
    expect(allProblems(p)).toEqual([]);
    expect(dissolvableProblems(p)).toEqual([]);
  });
});

// The constructive family at the census seed 20261013 (bfuzz.test.ts's constructive property, PLAT_FUZZ_SEED=20261013):
// three well-separated simple three-point chains committed with a branch in their own row set before the round — each at
// an existing vertex 28.9 – 30.4 cm from the chain's corner, the chain's spur to the corner. Each sequence is replayed
// from its generator seed; the chain named commits, its row set a simple run.
const CONSTRUCTIVE: readonly { readonly seed: number; readonly step: number; readonly points: readonly (readonly [number, number])[]; readonly branch: readonly [number, number] }[] = [
  { seed: 577274053, step: 3, points: [[1237, 474], [286, 846], [1688, 3058]], branch: [315, 855] },
  { seed: 1991312356, step: 6, points: [[1554, 2783], [1708, 3030], [3513, 470]], branch: [1705, 3001] },
  { seed: 1683288088, step: 2, points: [[1796, 1447], [1712, 1533], [478, 258]], branch: [1705, 1505] },
];

describe('RQ1 across segments: the constructive family\'s three cases at seed 20261013 commit as simple runs', () => {
  for (const c of CONSTRUCTIVE) {
    it(`generator seed ${c.seed}, way:${c.step} (${c.points.map(([x, y]) => `(${x}, ${y})`).join(' ')}): committed, its rows a simple run — no branch at (${c.branch[0]}, ${c.branch[1]})`, () => {
      const rnd = generator(c.seed);
      const p = framed(4000);
      const steps = intIn(rnd, 1, 8);
      let level = intIn(rnd, 0, 2) as Level;
      let seen = false;
      for (let s = 0; s < steps; s++) {
        if (rnd() < 0.3 && level < 4) level = (level + 1) as Level;
        const lv = rnd() < 0.1 ? (intIn(rnd, 0, 4) as Level) : level;
        const g = genChain(p, rnd, 4000, lv);
        const r = ins(tx(p, lv), g.points, [{ role: 'way', entity: `way:${s}` }], g.cls, { closed: g.closed, ...(g.pinned === undefined ? {} : { pinned: g.pinned }) });
        if (s !== c.step) continue;
        seen = true;
        expect(g.points.map(([x, y]) => [Math.round(x), Math.round(y)])).toEqual(c.points);
        expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
        const deg = rowDegrees(p, `way/way:${s}`);
        expect([...deg.values()].every((d) => d <= 2), JSON.stringify([...deg])).toBe(true);
        expect(simpleOpen(deg)).toBe(true);
        expect((deg.get(`${c.branch[0]},${c.branch[1]}`) ?? 0)).toBeLessThanOrEqual(2);
        expect(allProblems(p)).toEqual([]);
        expect(dissolvableProblems(p)).toEqual([]);
      }
      expect(seen).toBe(true);
    });
  }
});

/** A chain inserted under a `way` key through M0-a-06's transaction with the invariant suite wired in. */
function throughTx(p: Plat, level: Level, chain: readonly (readonly [number, number])[], cls: 'mandatory' | 'optional', closed: boolean) {
  return txn(p, spec(level), (o) => {
    const k = insertChain(o, chain.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: 'way:c1' }], cls, { closed });
    if (!k.ok) return k;
    return ok(null);
  }, suiteEnv({ report: suiteReport() }));
}

/** The vertices of degree ≥ 3 in a row set, as [position, degree]. */
const high = (deg: Map<string, number>): [string, number][] => [...deg].filter(([, d]) => d >= 3);

// notBuilt #3 (M4; C-0423 (1), C-0424 (3) as C-0456 amends it): a retrace of the chain's own path that the cut back does
// not route. Round S12 (N-64; J515) builds its forms (3) – (5) and form (1) within the corner bound; round S13 builds
// form (1) at every corner within that bound (C-0455: an obtuse tip too, form (1″)); forms (1′) and (2) stay, with
// J238 (1)'s proof in C-0456.
//
// Form (1), built: the arrangement with W 40 cm from the corner — the arms still pass within attractCm of W (25.0 cm),
// so step 3 routes both through it, and V's input point stands beyond √2 · attractCm (36.8 cm) of W. Before round S12 it
// was routed as before (W of degree 3, V a dead end, refused '(way, way:c1) branches' under a linear key). §3.6
// *Existing geometry wins* lets a tip move by the corner bound 2 · √2 · attractCm: the cut back takes such a vertex
// within that bound, and the chain commits A–W–B, the corner's point on W (40 cm).
describe('notBuilt #3, form (1) built (round S12): a corner beyond √2 · attractCm of the junction, within the corner bound, is cut back onto it', () => {
  const existing: readonly (readonly [number, number])[] = [[2040, 2000], [3500, 2000]];
  const chain: readonly (readonly [number, number])[] = [[2500, 2400], [2000, 2000], [2500, 1600]];
  it('under `invisible`: commits A–W–B, the corner (2 000, 2 000) cut back onto W (2 040, 2 000), 40 cm — a simple path', () => {
    const p = framed(4000);
    expect(ins(tx(p, 0), existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
    const r = ins(tx(p, 0), chain, [{ role: 'invisible', entity: 'c1' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(r.value.placed.map((v) => at(p, v))).toEqual(['2500,2400', '2040,2000', '2500,1600']);
    const deg = rowDegrees(p, 'invisible/c1');
    expect(simpleOpen(deg)).toBe(true);
    expect(deg.get('2040,2000')).toBe(2);
    expect(deg.size).toBe(3);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(-1);
    expect(r.warnings).toEqual(WARNINGS);
    expect(allProblems(p)).toEqual([]);
    expect(dissolvableProblems(p)).toEqual([]);
  });
  it('under a `way` key through M0-a-06\'s transaction: the batch commits, the key a simple run', () => {
    const p = framed(4000);
    expect(ins(tx(p, 0), existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
    const r = throughTx(p, 0, chain, 'mandatory', false);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    expect(simpleOpen(rowDegrees(p, 'way/way:c1'))).toBe(true);
    expect(allProblems(p)).toEqual([]);
  });
});

// Form (1″), built (round S13, C-0455; the S12 closing check's failing line, its family T case seed 503 740): a corner
// WIDER than 90° within the corner bound. The S12 engine took the corner-bound tier only at a tip of at most a right
// angle, on the claim that no wider corner re-enters a vertex beyond √2 · attractCm — false: the second arm need not
// pass within attractCm of W, step 3's stretch along W's edge and the wedge routing at the corner bring it there. Here
// the existing ways meet at the junction W (1 635, 2 421); the mandatory open chain A (1 445, 2 274) → V (1 644, 2 461) →
// B (2 135, 2 081) has its corner V 41.0 cm from W (beyond √2 · attractCm = 36.8, within the corner bound 73.5), the
// corner 99.0° wide (obtuse as `cutBack` measures it, between the landed A and B's input point). The first arm passes
// 23 cm from W. Before the round it committed with W of degree 3 in the chain's own rows and V a dead end (W_STRETCH_SHARED
// ×2, W_WEDGE_ROUTED ×1) and was refused '(way, way:c1) branches' under a linear key; now the corner's point is cut back
// onto W (41 cm, within the corner bound and the fidelity bound) and the chain commits a simple path under every key.
describe('notBuilt #3, form (1″) built (round S13): an obtuse corner beyond √2 · attractCm of a junction, within the corner bound, is cut back onto it', () => {
  const existing: readonly (readonly (readonly [number, number])[])[] = [
    [[2532, 2733], [1635, 2421], [950, 1779]],
    [[1635, 2421], [2539, 3023]],
    [[1431, 2297], [1364, 2459]],
    [[2126, 2067], [2611, 2070]],
  ];
  const chain: readonly (readonly [number, number])[] = [[1445, 2274], [1644, 2461], [2135, 2081]];
  const arena = (): Plat => {
    const p = framed(4000);
    existing.forEach((e, i) => expect(ins(tx(p, 0), e, [{ role: 'way', entity: `way:e${i}` }]).ok).toBe(true));
    return p;
  };
  it('the arrangement: V 41.0 cm from W (beyond √2 · attractCm, within 2 · √2 · attractCm), the corner at V obtuse (99.0°)', () => {
    const [a, v, b] = chain;
    const d = Math.hypot(v[0] - 1635, v[1] - 2421);
    expect(d).toBeGreaterThan(Math.SQRT2 * 26);
    expect(d).toBeLessThan(2 * Math.SQRT2 * 26);
    const ang = (Math.acos(((a[0] - v[0]) * (b[0] - v[0]) + (a[1] - v[1]) * (b[1] - v[1])) / (Math.hypot(a[0] - v[0], a[1] - v[1]) * Math.hypot(b[0] - v[0], b[1] - v[1]))) * 180) / Math.PI;
    expect(ang).toBeGreaterThan(90);
    expect(Math.round(ang)).toBe(99);
  });
  it('under `invisible`: commits, the corner (1 644, 2 461) cut back onto the junction W (1 635, 2 421) — a simple path, W of degree 2', () => {
    const p = arena();
    const r = ins(tx(p, 0), chain, [{ role: 'invisible', entity: 'c1' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(r.value.placed.map((v) => at(p, v))).toEqual(['1461,2257', '1635,2421', '2126,2067']);
    const deg = rowDegrees(p, 'invisible/c1');
    expect(high(deg)).toEqual([]);
    expect(simpleOpen(deg)).toBe(true);
    expect(deg.get('1635,2421')).toBe(2);
    expect(deg.has('1644,2461')).toBe(false);
    expect(allProblems(p)).toEqual([]);
    expect(dissolvableProblems(p)).toEqual([]);
  });
  it('under a `way` key through M0-a-06\'s transaction: the batch commits, the key a simple run (refused \'branches\' before the round)', () => {
    const p = arena();
    const r = throughTx(p, 0, chain, 'mandatory', false);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    expect(simpleOpen(rowDegrees(p, 'way/way:c1'))).toBe(true);
    expect(allProblems(p)).toEqual([]);
  });
});

// Form (1′), kept (C-0456): a corner beyond the corner bound of every vertex of the path it re-enters — W 80 cm from the
// corner of a narrow V (arms at ±14°, both passing 19.4 cm from W). A cut back there would move the corner beyond the
// fidelity bound; keeping the corner (the segment routed with the path left out of step 3) measured a census rise at
// 20261013 (random 2 → 13, constructive 1 → 8, C-0456), so it is routed as before: W of degree 3, V a dead end, refused
// '(way, way:c1) branches' under a linear key.
describe('notBuilt #3, form (1′) kept: a corner beyond 2 · √2 · attractCm of the junction is routed as before', () => {
  const existing: readonly (readonly [number, number])[] = [[2080, 2000], [3500, 2000]];
  const chain: readonly (readonly [number, number])[] = [[2500, 2125], [2000, 2000], [2500, 1875]];
  it('under `invisible`: committed as before — W (2 080, 2 000) of degree 3, the corner V a dead end', () => {
    const p = framed(4000);
    expect(ins(tx(p, 0), existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
    const r = ins(tx(p, 0), chain, [{ role: 'invisible', entity: 'c1' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(r.value.placed.map((v) => at(p, v))).toEqual(chain.map(([x, y]) => `${x},${y}`));
    const deg = rowDegrees(p, 'invisible/c1');
    expect(deg.get('2080,2000')).toBe(3);
    expect(deg.get('2000,2000')).toBe(1);
    expect(allProblems(p)).toEqual([]);
  });
  it('under a `way` key through M0-a-06\'s transaction: refused \'(way, way:c1) branches\' (the form named, kept)', () => {
    const p = framed(4000);
    expect(ins(tx(p, 0), existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
    const r = throughTx(p, 0, chain, 'mandatory', false);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(`${r.code} ${r.detail}`).toBe('E_INVARIANT (way, way:c1) branches: a linear role forms simple chains or rings (§3.10 role consistency)');
  });
});

// Form (2), kept (C-0456): a corner whose first arm is shorter than √2 · attractCm folds the second arm back over it. A
// (2 031, 2 000) → V (2 000, 2 000) → B (2 433, 2 250): the corner 30°, the arm A–V 31 cm, so the second arm passes
// 15.5 cm from A and step 3 routes it back through A — the edge V–A retraced. The only vertex of the path near V's input
// point is A, the segment's own start, which the cut back never takes (its segment would vanish), so the chain is routed
// as before: the rows V–A, A–B — a simple run, committed under every key (§3.6's preamble: "a chain that doubles back
// near itself attracts onto itself as onto any other edge"); V the run's end and A inside it, W_STRETCH_SHARED at V. The
// drawn order needs the corner kept off A, the census-raising form C-0456 measured.
describe('notBuilt #3, form (2) kept: a short first arm folded back over itself is routed as before (a simple run)', () => {
  it('A (2 031, 2 000) → V (2 000, 2 000) → B (2 433, 2 250) under `invisible`: committed, the rows V–A and A–B, W_STRETCH_SHARED at V', () => {
    const p = framed(4000);
    const r = ins(tx(p, 0), [[2031, 2000], [2000, 2000], [2433, 2250]], [{ role: 'invisible', entity: 'c1' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(r.value.placed.map((v) => at(p, v))).toEqual(['2031,2000', '2000,2000', '2433,2250']);
    const deg = rowDegrees(p, 'invisible/c1');
    expect(simpleOpen(deg)).toBe(true);
    expect(deg.get('2000,2000')).toBe(1);
    expect(deg.get('2031,2000')).toBe(2);
    expect(edgeRows(p, [2031, 2000], [2433, 2250])).toEqual(['invisible/c1']);
    expect(r.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 2031, y: 2000 } }, { code: 'W_STRETCH_SHARED', count: 1, at: { x: 2000, y: 2000 } }]);
    expect(allProblems(p)).toEqual([]);
  });
  it('under a `way` key through M0-a-06\'s transaction: the batch commits (a simple run, no refusal)', () => {
    const p = framed(4000);
    const r = throughTx(p, 0, [[2031, 2000], [2000, 2000], [2433, 2250]], 'mandatory', false);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    expect(simpleOpen(rowDegrees(p, 'way/way:c1'))).toBe(true);
  });
});

// Form (3), built (round S12): a closed run's seam. The closing segment had no cut back; now a ring whose back pass
// retraced its path at the seam is walked again from its last point, then from the point before it (insertChain.ts
// `walk`, SEAM), so the seam's corner stands second and the cut back reaches it as any other. The S9 arrangement closed
// with the corner V (2 000, 2 000) at the seam — the first segment leaves V through W (30 cm, within the bound) and the
// closing segment came back to V through W — commits the ring W–P1–P2, V's point on W (W_ATTRACTED ×1 at V's input
// point), every vertex of the row set of degree 2; the same reversed, for W west of V, and for the corner as the ring's
// last point (then walked from the point before it). Before the round each committed with W of degree 3 and V a spur,
// refused '(way, way:c1) branches' under a linear key.
const SEAMS: readonly Arrangement[] = [
  { name: 'W east of V, V the ring\'s first point', existing: [[2030, 2000], [3500, 2000]], w: [2030, 2000], chain: [[2000, 2000], [2500, 1600], [2500, 2400]] },
  { name: 'W east of V, the ring reversed', existing: [[2030, 2000], [3500, 2000]], w: [2030, 2000], chain: [[2000, 2000], [2500, 2400], [2500, 1600]] },
  { name: 'W west of V, V the ring\'s first point', existing: [[500, 2000], [1970, 2000]], w: [1970, 2000], chain: [[2000, 2000], [1500, 1600], [1500, 2400]] },
  { name: 'W east of V, V the ring\'s last point', existing: [[2030, 2000], [3500, 2000]], w: [2030, 2000], chain: [[2500, 1600], [2500, 2400], [2000, 2000]] },
];

// N-s11c-1 (the S11 closing check): the cut back on a ring's interior corner (not the seam) — right before round S12 and
// unpinned (mutant SEAMOFF, the watch off for any chain with a closed run, survived the folder). The S9 arrangement with
// the corner V at an interior index, W east and west, and a four-point ring: each commits a simple ring, V's point on W.
const INTERIOR: readonly Arrangement[] = [
  { name: 'W east of V, V the ring\'s second point', existing: [[2030, 2000], [3500, 2000]], w: [2030, 2000], chain: [[2500, 2400], [2000, 2000], [2500, 1600]] },
  { name: 'W west of V, V the ring\'s second point', existing: [[500, 2000], [1970, 2000]], w: [1970, 2000], chain: [[1500, 2400], [2000, 2000], [1500, 1600]] },
  { name: 'W east of V, a four-point ring', existing: [[2030, 2000], [3500, 2000]], w: [2030, 2000], chain: [[2500, 2400], [2000, 2000], [2500, 1600], [3000, 2000]] },
];

describe('notBuilt #3, form (3) built (round S12), and the ring\'s interior corner (N-s11c-1): the corner beside W is cut back onto W — a simple ring', () => {
  for (const c of [...SEAMS, ...INTERIOR]) {
    it(`${c.name} — under \`invisible\`: commits a simple ring, the corner V (2 000, 2 000) on W (${c.w[0]}, ${c.w[1]})`, () => {
      const p = framed(4000);
      expect(ins(tx(p, 0), c.existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
      const r = ins(tx(p, 0), c.chain, [{ role: 'invisible', entity: 'c1' }], 'mandatory', { closed: true });
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(r.value.placed.map((v) => at(p, v))).toEqual(c.chain.map(([x, y]) => (x === 2000 && y === 2000 ? `${c.w[0]},${c.w[1]}` : `${x},${y}`)));
      const deg = rowDegrees(p, 'invisible/c1');
      expect([...deg.values()].every((d) => d === 2), JSON.stringify([...deg])).toBe(true);
      expect(deg.get(`${c.w[0]},${c.w[1]}`)).toBe(2);
      expect(vertexAtPoint(p, 2000, 2000)).toBe(-1);
      expect(r.warnings).toEqual(WARNINGS);
      expect(allProblems(p)).toEqual([]);
      expect(dissolvableProblems(p)).toEqual([]);
    });

    it(`${c.name} — under a \`way\` key through M0-a-06's transaction: the batch commits, the key a simple ring`, () => {
      const p = framed(4000);
      expect(ins(tx(p, 0), c.existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
      const r = throughTx(p, 0, c.chain, 'mandatory', true);
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      expect([...rowDegrees(p, 'way/way:c1').values()].every((d) => d === 2)).toBe(true);
      expect(allProblems(p)).toEqual([]);
    });
  }
});

// Forms (3) – (5) in the registered constructive family (bfuzz.test.ts's constructive property; the S10 closing check's
// oracle at the fuzz seeds named), built by round S12. The S11 pins replayed each sequence from its generator seed; on
// round S12's engine the sequences' earlier chains commit otherwise (generator seed 1 880 377 805's first chain is a
// ring with a seam retrace of its own), so the arrangements are pinned as round S11's engine left them before the step
// (register/s12-forms.json: the arena dumped, the step's chain). Each commits with no vertex of degree 3 in its own rows
// (the S11 branch gone) and, under a `way` key through M0-a-06's transaction, commits — but generator seed 823 490 252's
// chain, which crosses itself (its vertex of degree 4 at (2 427, 2 893), split into simple runs, §3.6 step 1), and is
// refused 'branches' under a linear key for that self-crossing, the branch at the wedge vertex gone. (3) the ring walked
// again from another seam; (4) the cut back's route arriving at x and leaving it along an edge it meets there within
// minFaceAngle (C-0456's `cutStretch`); (5) the wedge vertex the undo removed landed again at its position.
interface FormCase {
  readonly form: string;
  readonly fuzzSeed: number;
  readonly seed: number;
  readonly step: number;
  readonly level: Level;
  readonly cls: 'mandatory' | 'optional';
  readonly closed: boolean;
  readonly points: readonly (readonly [number, number])[];
  readonly arena: { readonly vertices: readonly (readonly [number, number, Level])[]; readonly edges: readonly (readonly [number, number, Level])[] };
}
const FORMS = (JSON.parse(readFileSync(new URL('./register/s12-forms.json', import.meta.url), 'utf8')) as { cases: FormCase[] }).cases;

/** The S11 arena of a form case, every edge carrying one row of its own level (the earlier chains', as one key). */
function formArena(c: FormCase): Plat {
  const b = indexed(c.arena);
  c.arena.edges.forEach((e, i) => addRole(b.plat, b.he[i], { role: 'invisible', entity: 's11' }, e[2]));
  return b.plat;
}

const OUTCOMES: Readonly<Record<number, { readonly placed: readonly string[]; readonly warnings: readonly { code: string; count: number; at: { x: number; y: number } }[]; readonly high: readonly [string, number][]; readonly tx?: string }>> = {
  1677770628: { placed: ['1281,2651', '1177,2705', '1053,2539', '1212,2435'], warnings: [{ code: 'W_ATTRACTED', count: 3, at: { x: 1307, y: 2631 } }], high: [] },
  1665516641: { placed: ['2652,2644', '2041,2991', '1577,2245', '2395,1888'], warnings: [{ code: 'W_ATTRACTED', count: 2, at: { x: 2679, y: 2638 } }, { code: 'W_STRETCH_SHARED', count: 2, at: { x: 2497, y: 2269 } }], high: [] },
  1720240219: { placed: ['1910,3946', '1429,3970', '1118,3970', '1157,3706', '1703,3626'], warnings: [{ code: 'W_ATTRACTED', count: 4, at: { x: 1903, y: 3970 } }, { code: 'W_STRETCH_SHARED', count: 2, at: { x: 1897, y: 3913 } }], high: [] },
  1880377805: { placed: ['3747,806', '2279,1267', '2358,3679'], warnings: [{ code: 'W_ATTRACTED', count: 2, at: { x: 2259, y: 1246 } }, { code: 'W_STRETCH_SHARED', count: 1, at: { x: 3478, y: 863 } }], high: [] },
  1300412224: { placed: ['940,2523', '1820,2012', '622,1229'], warnings: [{ code: 'W_ATTRACTED', count: 4, at: { x: 1850, y: 1994 } }, { code: 'W_STRETCH_SHARED', count: 3, at: { x: 966, y: 2494 } }], high: [] },
  823490252: { placed: ['1435,3348', '3691,2339', '2729,436', '2452,591', '793,2323', '3830,3382'], warnings: [{ code: 'W_ATTRACTED', count: 4, at: { x: 3723, y: 2331 } }], high: [['2427,2893', 4]], tx: 'E_INVARIANT (way, way:c1) branches: a linear role forms simple chains or rings (§3.10 role consistency)' },
};

describe('notBuilt #3, forms (3) – (5) built (round S12): the constructive family\'s S11 arrangements commit with no branch in their own rows', () => {
  for (const c of FORMS) {
    const want = OUTCOMES[c.seed];
    it(`form ${c.form}: seed ${c.fuzzSeed}, generator seed ${c.seed}, way:${c.step} — committed, no vertex of degree 3 in its own rows`, () => {
      const p = formArena(c);
      expect(allProblems(p)).toEqual([]);
      const r = ins(tx(p, c.level), c.points, [{ role: 'way', entity: 'way:c1' }], c.cls, { closed: c.closed });
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(r.value.placed.map((v) => at(p, v))).toEqual(want.placed);
      expect(r.warnings).toEqual(want.warnings);
      expect(high(rowDegrees(p, 'way/way:c1'))).toEqual(want.high);
      expect(allProblems(p)).toEqual([]);
    });
    it(`form ${c.form}: generator seed ${c.seed} through M0-a-06's transaction under a \`way\` key — ${want.tx === undefined ? 'commits' : 'refused for its self-crossing only'}`, () => {
      const p = formArena(c);
      const r = throughTx(p, c.level, c.points, c.cls, c.closed);
      if (want.tx === undefined) {
        expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
        expect(high(rowDegrees(p, 'way/way:c1'))).toEqual([]);
        return;
      }
      expect(r.ok).toBe(false);
      if (!r.ok) expect(`${r.code} ${r.detail}`).toBe(want.tx);
    });
  }
});
