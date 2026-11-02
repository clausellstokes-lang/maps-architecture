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

// notBuilt #3 (M4; C-0423 (1), C-0424 (3) as C-0425 amends it): a retrace of the chain's own path that the cut back does
// not route. Form (1), the corner beyond the bound: the same arrangement with W 40 cm from the corner — the
// arms still pass within attractCm of W (25.0 cm), so step 3 routes both through it — but V's input point stands beyond
// √2 · attractCm (36.8 cm) of W, so its point may not land there, and no other vertex of the path is near: the chain is
// routed as before, its rows A–W, W–V, W–B (W of degree 3, V a dead end), and under a linear key the transaction refuses
// it '(way, way:c1) branches'. Keeping the corner on a simple route there (A–W–V–B, the route leaving V with W left out
// of step 3) is what the class needs; that form, tried for every retrace, raised the census's counted refusals at seed
// 20261013 from 2 to 16 (the thin faces it leaves refuse later chains), so it waits for M4's hardening pass.
describe('notBuilt #3 (M4), form (1): a retrace whose corner stands beyond √2 · attractCm of the junction is routed as before', () => {
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

// notBuilt #3 (M4), form (2): a corner whose first arm is shorter than √2 · attractCm folds the second arm back over
// it. A (2 031, 2 000) → V (2 000, 2 000) → B (2 433, 2 250): the corner 30°, the arm A–V 31 cm, so the second arm passes
// 15.5 cm from A and step 3 routes it back through A — the edge V–A retraced. The only vertex of the path near V's input
// point is A, the segment's own start, which the cut back never takes (its segment would vanish), so the chain is routed
// as before: the rows V–A, A–B (a simple run, every vertex of degree ≤ 2, but V the run's end and A inside it), the
// W_STRETCH_SHARED at V naming the retraced edge. The row set commits under a linear key; the drawn order (A an end)
// needs the corner kept off A, which is the class's M4 work.
describe('notBuilt #3 (M4), form (2): a short first arm folded back over itself is routed as before', () => {
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
});

// notBuilt #3 (M4) is every retrace of the chain's own path that the cut back does not route (C-0424 (3) as round S11
// amends it, C-0425; N-s10-3). Its forms (3) – (5) below are the S10 closing check's (N-s10c-1); each is lawful input, the
// corner within √2 · attractCm of the re-entered vertex, routed as before (`passes(null)`): committed with a vertex of
// degree 3 in the chain's own rows, refused 'branches' under a linear key. The pins hold that outcome so that the M4 fix
// (the seam cut back, a re-landing on a vertex the earlier segment placed, the precision rules on the cut back's route)
// is a declared shift.
//
// Form (3), a closed run's seam: the closing segment (insertChain.ts `run`, `if (run.closed && …)`) is routed without the
// cut back the open loop has. The S9 arrangement closed with the corner V (2 000, 2 000) at the seam: the first segment
// leaves V through W (30 cm from it, within the bound) and the closing segment comes back to V through W, retracing W–V;
// the watching and back passes refuse it (the chain re-enters its own path) and it commits as before — W of degree 3, V a
// spur of degree 1, W_ATTRACTED ×2 and W_STRETCH_SHARED ×1. The same for the ring reversed, for W west of V, and for the
// corner as the ring's last point (the closing segment then leaves V through W, and the first returns).
const SEAMS: readonly (Arrangement & { readonly sharedAt: readonly [number, number] })[] = [
  { name: 'W east of V, V the ring\'s first point', existing: [[2030, 2000], [3500, 2000]], w: [2030, 2000], chain: [[2000, 2000], [2500, 1600], [2500, 2400]], sharedAt: [2030, 2000] },
  { name: 'W east of V, the ring reversed', existing: [[2030, 2000], [3500, 2000]], w: [2030, 2000], chain: [[2000, 2000], [2500, 2400], [2500, 1600]], sharedAt: [2030, 2000] },
  { name: 'W west of V, V the ring\'s first point', existing: [[500, 2000], [1970, 2000]], w: [1970, 2000], chain: [[2000, 2000], [1500, 1600], [1500, 2400]], sharedAt: [1970, 2000] },
  { name: 'W east of V, V the ring\'s last point', existing: [[2030, 2000], [3500, 2000]], w: [2030, 2000], chain: [[2500, 1600], [2500, 2400], [2000, 2000]], sharedAt: [2000, 2000] },
];

describe('notBuilt #3 (M4), form (3): a closed run\'s seam is never cut back — the ring routed as before', () => {
  for (const c of SEAMS) {
    it(`${c.name} — under \`invisible\`: committed as before, W (${c.w[0]}, ${c.w[1]}) of degree 3, the corner V (2 000, 2 000) a spur`, () => {
      const p = framed(4000);
      expect(ins(tx(p, 0), c.existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
      const r = ins(tx(p, 0), c.chain, [{ role: 'invisible', entity: 'c1' }], 'mandatory', { closed: true });
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(r.value.placed.map((v) => at(p, v))).toEqual(c.chain.map(([x, y]) => `${x},${y}`));
      const deg = rowDegrees(p, 'invisible/c1');
      expect(deg.get(`${c.w[0]},${c.w[1]}`)).toBe(3);
      expect(deg.get('2000,2000')).toBe(1);
      expect(deg.size).toBe(5);
      expect([...deg.values()].filter((d) => d === 3).length).toBe(1);
      expect(r.warnings).toEqual([
        { code: 'W_ATTRACTED', count: 2, at: { x: c.w[0], y: c.w[1] } },
        { code: 'W_STRETCH_SHARED', count: 1, at: { x: c.sharedAt[0], y: c.sharedAt[1] } },
      ]);
      expect(allProblems(p)).toEqual([]);
      expect(dissolvableProblems(p)).toEqual([]);
    });

    it(`${c.name} — under a \`way\` key through M0-a-06's transaction: refused '(way, way:c1) branches' (the form named, not fixed)`, () => {
      const p = framed(4000);
      expect(ins(tx(p, 0), c.existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
      const r = txn(p, spec(0), (o) => {
        const k = insertChain(o, c.chain.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: 'way:c1' }], 'mandatory', { closed: true });
        if (!k.ok) return k;
        return ok(null);
      }, suiteEnv({ report: suiteReport() }));
      expect(r.ok).toBe(false);
      if (!r.ok) expect(`${r.code} ${r.detail}`).toBe('E_INVARIANT (way, way:c1) branches: a linear role forms simple chains or rings (§3.10 role consistency)');
    });
  }
});

// Forms (3) – (5) in the registered constructive family (bfuzz.test.ts's constructive property; the S10 closing check's
// oracle at the fuzz seeds named), each sequence replayed from its generator seed, the chain at `step` inserted under
// `way:<step>`: its points, its placed vertices and warnings, and the vertex of degree 3 in its own rows at the
// re-entered vertex (`branch`) — routed as before. (4) the cut back's one candidate is refused by the optional class's
// precision rules (E_BELOW_MIN_ANGLE on pprev → x or on x → the next point); (5) the one candidate is a vertex the
// chain's earlier segment placed (a wedge vertex), which the cut back's undo to prev's landing removes, so it is passed
// over. `tx` names the refusal through M0-a-06's transaction where the chain's own key is the one refused (in the other
// replays an earlier chain of the sequence, inserted without role consistency, already branches, and its key is named).
interface Replay {
  readonly form: string;
  readonly fuzzSeed: number;
  readonly seed: number;
  readonly step: number;
  readonly points: readonly (readonly [number, number])[];
  readonly placed: readonly string[];
  readonly warnings: readonly { code: string; count: number; at: { x: number; y: number } }[];
  readonly branch: readonly [number, number];
  /** Every vertex of degree ≥ 3 in the chain's own rows (the branch, and a self-crossing's vertex of degree 4). */
  readonly high: readonly (readonly [string, number])[];
  readonly tx?: string;
}

const REPLAYS: readonly Replay[] = [
  {
    form: '(3) a ring\'s seam', fuzzSeed: 8101, seed: 1677770628, step: 3,
    points: [[1307, 2631], [1177, 2705], [1053, 2539], [1212, 2435]],
    placed: ['1308,2650', '1177,2705', '1053,2539', '1212,2435'],
    warnings: [{ code: 'W_ATTRACTED', count: 5, at: { x: 1307, y: 2631 } }, { code: 'W_STRETCH_SHARED', count: 2, at: { x: 1308, y: 2650 } }],
    branch: [1281, 2651], high: [['1281,2651', 3]],
    tx: 'E_INVARIANT (way, way:3) branches: a linear role forms simple chains or rings (§3.10 role consistency)',
  },
  {
    form: '(3) a ring\'s seam', fuzzSeed: 8101, seed: 1665516641, step: 5,
    points: [[2679, 2638], [2041, 2991], [1577, 2245], [2395, 1888]],
    placed: ['2679,2646', '2041,2991', '1577,2245', '2395,1888'],
    warnings: [{ code: 'W_ATTRACTED', count: 4, at: { x: 2679, y: 2638 } }, { code: 'W_STRETCH_SHARED', count: 5, at: { x: 2679, y: 2646 } }],
    branch: [2652, 2644], high: [['2652,2644', 3]],
  },
  {
    form: '(3) a ring\'s seam', fuzzSeed: -5203, seed: 1720240219, step: 4,
    points: [[1903, 3970], [1429, 3970], [1118, 3970], [1157, 3706], [1703, 3626]],
    placed: ['1920,3970', '1429,3970', '1118,3970', '1157,3706', '1703,3626'],
    warnings: [{ code: 'W_ATTRACTED', count: 5, at: { x: 1903, y: 3970 } }, { code: 'W_STRETCH_SHARED', count: 3, at: { x: 1920, y: 3970 } }],
    branch: [1910, 3946], high: [['1910,3946', 3]],
    tx: 'E_INVARIANT (way, way:4) branches: a linear role forms simple chains or rings (§3.10 role consistency)',
  },
  {
    form: '(4) the cut back refused by the precision rules (pprev → x, E_BELOW_MIN_ANGLE)', fuzzSeed: -5203, seed: 1880377805, step: 2,
    points: [[3747, 806], [2259, 1246], [2358, 3679]],
    placed: ['3747,806', '2267,1242', '2358,3679'],
    warnings: [{ code: 'W_ATTRACTED', count: 4, at: { x: 2259, y: 1246 } }, { code: 'W_STRETCH_SHARED', count: 4, at: { x: 3598, y: 823 } }],
    branch: [2279, 1267], high: [['2279,1267', 3]],
  },
  {
    form: '(4) the cut back refused by the precision rules (x → the next point, E_BELOW_MIN_ANGLE)', fuzzSeed: 5101, seed: 1300412224, step: 5,
    points: [[940, 2523], [1850, 1994], [622, 1229]],
    placed: ['940,2523', '1850,1994', '622,1229'],
    warnings: [{ code: 'W_ATTRACTED', count: 3, at: { x: 966, y: 2494 } }, { code: 'W_STRETCH_SHARED', count: 4, at: { x: 966, y: 2494 } }],
    branch: [1820, 2012], high: [['1820,2012', 3]],
    tx: 'E_INVARIANT (way, way:5) branches: a linear role forms simple chains or rings (§3.10 role consistency)',
  },
  {
    form: '(5) the re-entered vertex placed by the chain\'s own earlier segment (a wedge vertex)', fuzzSeed: 8101, seed: 823490252, step: 4,
    points: [[1435, 3348], [3723, 2331], [2725, 433], [2452, 591], [793, 2323], [3830, 3382]],
    placed: ['1435,3348', '3719,2330', '2729,436', '2452,591', '793,2323', '3830,3382'],
    warnings: [{ code: 'W_ATTRACTED', count: 4, at: { x: 3723, y: 2331 } }, { code: 'W_WEDGE_ROUTED', count: 1, at: { x: 3691, y: 2339 } }, { code: 'W_STRETCH_SHARED', count: 1, at: { x: 3719, y: 2330 } }],
    branch: [3691, 2339], high: [['2427,2893', 4], ['3691,2339', 3]],
  },
];

/** Replays a constructive sequence from its generator seed up to `step`; inserts the step's chain with `insert` and returns its outcome. */
function replay<T>(c: Replay, insert: (p: Plat, lv: Level, g: ReturnType<typeof genChain>, key: string) => T): T | undefined {
  const rnd = generator(c.seed);
  const p = framed(4000);
  const steps = intIn(rnd, 1, 8);
  let level = intIn(rnd, 0, 2) as Level;
  for (let s = 0; s < steps; s++) {
    if (rnd() < 0.3 && level < 4) level = (level + 1) as Level;
    const lv = rnd() < 0.1 ? (intIn(rnd, 0, 4) as Level) : level;
    const g = genChain(p, rnd, 4000, lv);
    if (s === c.step) {
      expect(g.points.map(([x, y]) => [Math.round(x), Math.round(y)])).toEqual(c.points);
      return insert(p, lv, g, `way:${s}`);
    }
    ins(tx(p, lv), g.points, [{ role: 'way', entity: `way:${s}` }], g.cls, { closed: g.closed, ...(g.pinned === undefined ? {} : { pinned: g.pinned }) });
  }
  return undefined;
}

describe('notBuilt #3 (M4), forms (3) – (5) in the constructive family: replayed from their generator seeds, routed as before', () => {
  for (const c of REPLAYS) {
    it(`form ${c.form}: seed ${c.fuzzSeed}, generator seed ${c.seed}, way:${c.step} — committed with (${c.branch[0]}, ${c.branch[1]}) of degree 3 in its own rows`, () => {
      const seen = replay(c, (p, lv, g, key) => {
        const r = ins(tx(p, lv), g.points, [{ role: 'way', entity: key }], g.cls, { closed: g.closed, ...(g.pinned === undefined ? {} : { pinned: g.pinned }) });
        expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
        if (!r.ok) return true;
        expect(r.value.placed.map((v) => at(p, v))).toEqual(c.placed);
        expect(r.warnings).toEqual(c.warnings);
        const deg = rowDegrees(p, `way/${key}`);
        expect(deg.get(`${c.branch[0]},${c.branch[1]}`)).toBe(3);
        expect([...deg].filter(([, d]) => d >= 3)).toEqual(c.high);
        expect(allProblems(p)).toEqual([]);
        expect(dissolvableProblems(p)).toEqual([]);
        return true;
      });
      expect(seen).toBe(true);
    });
    const refusal = c.tx;
    if (refusal === undefined) continue;
    it(`form ${c.form}: generator seed ${c.seed}, way:${c.step} through M0-a-06's transaction under its own key — refused '(way, way:${c.step}) branches'`, () => {
      const seen = replay(c, (p, lv, g, key) => {
        const r = txn(p, spec(lv), (o) => {
          const k = insertChain(o, g.points.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: key }], g.cls, { closed: g.closed, ...(g.pinned === undefined ? {} : { pinned: g.pinned }) });
          if (!k.ok) return k;
          return ok(null);
        }, suiteEnv({ report: suiteReport() }));
        expect(r.ok).toBe(false);
        if (!r.ok) expect(`${r.code} ${r.detail}`).toBe(refusal);
        return true;
      });
      expect(seen).toBe(true);
    });
  }
});
