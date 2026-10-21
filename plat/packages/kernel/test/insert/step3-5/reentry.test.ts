// RQ1 across a chain's segments (N-61 (1); item 130 (d), §3.6 step 4; the S9 closing check's failing line, round S10):
// "a route never re-enters a vertex already on the chain's path ... the path is cut back to that vertex and routed on
// from it". The S9 cut kept one SEGMENT's path; a chain's next segment could still be attracted (step 3) back through a
// vertex its earlier segment routed through, sharing the chain's own edge back to it — a retraced edge, the vertex of
// degree 3 in the chain's row set, the chain's own corner a dead end. insertChain's passes now watch the run's committed
// route so far (its new and shared edges before the segment); a chain whose segment retraces it is routed again with
// that segment cut back (insertChain.ts `cutBack`, C-0361 (1)): the path is cut back to the vertex it re-entered and
// routed on from it — the corner's input point lands on that vertex, within √2 · attractCm (the bound attraction moves
// an incoming vertex by), so no landed input point is left off the route — and neither route retraces the path again.
//
// The arrangements are the S9 closing check's probe (`zzreenter`): the framed 4 000 cm square, an existing L0 `way` whose
// end W stands 30 cm from the chain's corner V (beyond attractCm = 26, so step 2 leaves V free) inside the corner's
// wedge, both arms passing within attractCm of W (18.8 cm at ±38.7°, 18.0 cm at ±36.9°). Before the round the chain
// committed A–W, W–V, W–B (W of degree 3, V a dead end, W_STRETCH_SHARED on its own edge V–W) and was refused '(way,
// way:c1) branches' under a linear key. Now it commits A–W–B, its corner's point on W (30 cm), a simple path. The
// constructive cases are the three the S9 check's class dump found at the census seed 20261013 (generator seeds below).
import { describe, expect, it } from 'vitest';
import type { Plat, VertexId } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/insertChain.js';
import { suiteEnv, suiteReport } from '../../../src/invariants/index.js';
import { ok } from '../../../src/num/index.js';
import { tx as txn } from '../../../src/tx/index.js';
import type { Level } from '../../../src/types/index.js';
import { spec } from '../../tx/support.js';
import { genChain } from './gen.js';
import { allProblems, dissolvableProblems, edgeRows, framed, generator, ins, intIn, liveEdges, pt, tx, vertexAtPoint } from './support.js';

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

// notBuilt #3 (M4; C-0361 (1)): a retrace no cut back routes. The same arrangement with W 40 cm from the corner — the
// arms still pass within attractCm of W (25.0 cm), so step 3 routes both through it — but V's input point stands beyond
// √2 · attractCm (36.8 cm) of W, so its point may not land there, and no other vertex of the path is near: the chain is
// routed as before, its rows A–W, W–V, W–B (W of degree 3, V a dead end), and under a linear key the transaction refuses
// it '(way, way:c1) branches'. Keeping the corner on a simple route there (A–W–V–B, the route leaving V with W left out
// of step 3) is what the class needs; that form, tried for every retrace, raised the census's counted refusals at seed
// 20261013 from 2 to 16 (the thin faces it leaves refuse later chains), so it waits for M4's hardening pass.
describe('notBuilt #3 (M4): a retrace whose corner stands beyond √2 · attractCm of the junction is routed as before', () => {
  const existing: readonly (readonly [number, number])[] = [[2040, 2000], [3500, 2000]];
  const chain: readonly (readonly [number, number])[] = [[2500, 2400], [2000, 2000], [2500, 1600]];
  it('under `invisible`: committed as before — W (2 040, 2 000) of degree 3, the corner V a dead end', () => {
    const p = framed(4000);
    expect(ins(tx(p, 0), existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
    const r = ins(tx(p, 0), chain, [{ role: 'invisible', entity: 'c1' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(r.value.placed.map((v) => at(p, v))).toEqual(chain.map(([x, y]) => `${x},${y}`));
    const deg = rowDegrees(p, 'invisible/c1');
    expect(deg.get('2040,2000')).toBe(3);
    expect(deg.get('2000,2000')).toBe(1);
    expect(allProblems(p)).toEqual([]);
  });
  it('under a `way` key through M0-a-06\'s transaction: refused \'(way, way:c1) branches\' (the class named, not fixed)', () => {
    const p = framed(4000);
    expect(ins(tx(p, 0), existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
    const r = txn(p, spec(0), (o) => {
      const k = insertChain(o, chain.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: 'way:c1' }], 'mandatory');
      if (!k.ok) return k;
      return ok(null);
    }, suiteEnv({ report: suiteReport() }));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(`${r.code} ${r.detail}`).toContain('E_INVARIANT (way, way:c1) branches');
  });
});
