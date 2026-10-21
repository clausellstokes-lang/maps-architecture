// RQ1 across a chain's segments (N-61 (1); item 130 (d), §3.6 step 4; fix round S10 of M0-a-05, the closing check of S9's
// failing line): "A route never re-enters a vertex already on the chain's path" — the CHAIN's path, not one segment's.
// Before the round each segment's route opened a fresh path, so a vertex the previous segment routed through was an
// ordinary step-3 contact for the next one, and the route went back through it: the chain's own edge retraced and a
// branch in its row set (a dead end at the chain's own corner), refused '(way, …) branches' under a linear key (§3.10's
// role consistency). Now the run's committed route so far is carried into every segment's route (`SegmentPath.prior`,
// `runRoute`): step 3 starts with it excluded, and a cut back to one of its vertices would leave the segment's start — a
// landed point of the chain — off the route, so the route goes on with that vertex left out (C-0361 (1) as amended).
//
// The pins: the closing check's four hand-built arrangements (a corner V 30 cm from an existing vertex W, beyond
// attractCm so step 2 leaves V free, both arms passing within attractCm of W), each under `invisible` and under a `way`
// key in one batch of M0-a-06's transaction with the suite wired in; and the three cases of the registered constructive
// family at PLAT_FUZZ_SEED=20261013 (generator seeds found by replaying that run: the chain's points and the branch vertex
// as the check dumped them). Mutant PRIOR (the run's route not carried in: `prior` empty) turns every one red.
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/insertChain.js';
import { suiteEnv, suiteReport } from '../../../src/invariants/index.js';
import { ok } from '../../../src/num/index.js';
import { tx as txn } from '../../../src/tx/index.js';
import type { Level } from '../../../src/types/index.js';
import { spec } from '../../tx/support.js';
import { fidelityProblems } from './fidelity.js';
import { genChain } from './gen.js';
import { allProblems, dissolvableProblems, edgeRows, framed, generator, ins, intIn, liveEdges, pt, tx } from './support.js';

/** The degree of every vertex in the row set of one key (`role/entity`), by lattice position. */
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

/** A simple open run: every vertex of degree ≤ 2, exactly its two ends of degree 1 (so connected and acyclic as a path). */
function expectSimpleRun(deg: Map<string, number>, ends: readonly string[]): void {
  for (const [v, d] of deg) expect(d, `the vertex (${v}) in the chain's row set`).toBe(ends.includes(v) ? 1 : 2);
  for (const e of ends) expect(deg.get(e), `the chain's end (${e})`).toBe(1);
}

const key = (q: readonly [number, number]): string => `${q[0]},${q[1]}`;

/** The closing check's arrangements (s9/probe/zzreenter.test.ts): the existing L0 way, the chain A → V → B, the vertex W. */
const ARRANGEMENTS: readonly { readonly name: string; readonly existing: readonly [number, number][]; readonly chain: readonly [number, number][]; readonly w: readonly [number, number] }[] = [
  { name: 'W east of V, arms at ±38.7°', existing: [[2030, 2000], [3500, 2000]], chain: [[2500, 2400], [2000, 2000], [2500, 1600]], w: [2030, 2000] },
  { name: 'W east of V, arms at ±36.9°', existing: [[2030, 2000], [3500, 2000]], chain: [[2400, 2300], [2000, 2000], [2400, 1700]], w: [2030, 2000] },
  { name: 'W west of V, arms at ±38.7°', existing: [[500, 2000], [1970, 2000]], chain: [[1500, 2400], [2000, 2000], [1500, 1600]], w: [1970, 2000] },
  { name: 'W north of V, the dead end of a way, arms at ±38.7°', existing: [[2000, 3500], [2000, 2030]], chain: [[1600, 2500], [2000, 2000], [2400, 2500]], w: [2000, 2030] },
];

describe('RQ1 across segments (item 130 (d)): a later segment never re-enters the route an earlier segment of the run took', () => {
  for (const c of ARRANGEMENTS) {
    it(`${c.name} — under invisible: the chain commits as the simple path A–W–V–B, its corner V on it (degree 2), W of degree 2, no W_STRETCH_SHARED`, () => {
      const p = framed(4000);
      expect(ins(tx(p, 0), c.existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
      const r = ins(tx(p, 0), c.chain, [{ role: 'invisible', entity: 'c1' }]);
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(r.value.placed.map((v) => `${p.vertices.x[v]},${p.vertices.y[v]}`)).toEqual(c.chain.map(key));
      // Before the round: W_ATTRACTED ×2 at W and W_STRETCH_SHARED ×1 at V — the second arm back along V–W.
      expect(r.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: c.w[0], y: c.w[1] } }]);
      const deg = rowDegrees(p, 'invisible/c1');
      expectSimpleRun(deg, [key(c.chain[0]), key(c.chain[2])]);
      expect(deg.get(key(c.w))).toBe(2);
      expect(deg.get(key(c.chain[1]))).toBe(2);
      expect(edgeRows(p, c.chain[1], c.chain[2])).toEqual(['invisible/c1']);
      expect(allProblems(p)).toEqual([]);
      expect(dissolvableProblems(p)).toEqual([]);
      expect(fidelityProblems(p, 0, 'mandatory', c.chain, {}, r.value.placed, 'c1', 'invisible')).toEqual([]);
    });

    it(`${c.name} — under a way key in one batch of M0-a-06's transaction (the suite wired in): the batch commits, the key a simple run`, () => {
      const p = framed(4000);
      expect(ins(tx(p, 0), c.existing, [{ role: 'way', entity: 'way:ex' }]).ok).toBe(true);
      const r = txn(p, spec(0), (o) => {
        const k = insertChain(o, c.chain.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: 'way:c1' }], 'mandatory');
        if (!k.ok) return k;
        return ok(null);
      }, suiteEnv({ report: suiteReport() }));
      // Before the round: E_INVARIANT '(way, way:c1) branches: a linear role forms simple chains or rings'.
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      expectSimpleRun(rowDegrees(p, 'way/way:c1'), [key(c.chain[0]), key(c.chain[2])]);
      expect(allProblems(p)).toEqual([]);
    });
  }
});

/**
 * The three constructive cases of PLAT_FUZZ_SEED=20261013 (the closing check's class dump): the generator seed of the
 * sequence, the step of the chain, its points, and the vertex its row set branched at before the round (a vertex of the
 * arena 28.9 – 30.4 cm from the chain's corner, which both arms passed within attractCm of).
 */
const CONSTRUCTIVE: readonly { readonly seed: number; readonly step: number; readonly points: readonly [number, number][]; readonly branch: readonly [number, number] }[] = [
  { seed: 577274053, step: 3, points: [[1237, 474], [286, 846], [1688, 3058]], branch: [315, 855] },
  { seed: 1991312356, step: 6, points: [[1554, 2783], [1708, 3030], [3513, 470]], branch: [1705, 3001] },
  { seed: 1683288088, step: 2, points: [[1796, 1447], [1712, 1533], [478, 258]], branch: [1705, 1505] },
];

/** The constructive family's sequence (bfuzz.test.ts) replayed up to and including `step`; the arena and each chain's outcome. */
function replay(seed: number, step: number, last?: (p: Plat, g: ReturnType<typeof genChain>, lv: Level) => void): Plat {
  const rnd = generator(seed);
  const p = framed(4000);
  const steps = intIn(rnd, 1, 8);
  let level = intIn(rnd, 0, 2) as Level;
  for (let s = 0; s <= step && s < steps; s++) {
    if (rnd() < 0.3 && level < 4) level = (level + 1) as Level;
    const lv = rnd() < 0.1 ? (intIn(rnd, 0, 4) as Level) : level;
    const g = genChain(p, rnd, 4000, lv);
    if (s === step && last !== undefined) {
      last(p, g, lv);
      break;
    }
    ins(tx(p, lv), g.points, [{ role: 'way', entity: `way:${s}` }], g.cls, { closed: g.closed, ...(g.pinned === undefined ? {} : { pinned: g.pinned }) });
  }
  return p;
}

describe('RQ1 across segments: the constructive family\'s three branching commits at seed 20261013 now commit as simple runs', () => {
  for (const c of CONSTRUCTIVE) {
    it(`generator seed ${c.seed}, chain ${c.step} (${c.points.map(key).join(' → ')}): its row set a simple run, (${key(c.branch)}) no branch`, () => {
      let seen = false;
      replay(c.seed, c.step, (p, g, lv) => {
        seen = true;
        expect(g.points.map(([x, y]) => [Math.round(x), Math.round(y)])).toEqual(c.points);
        const entity = `way:${c.step}`;
        const r = ins(tx(p, lv), g.points, [{ role: 'way', entity }], g.cls, { closed: g.closed, ...(g.pinned === undefined ? {} : { pinned: g.pinned }) });
        expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
        if (!r.ok) return;
        const X = p.vertices.x;
        const Y = p.vertices.y;
        const pl = r.value.placed;
        const deg = rowDegrees(p, `way/${entity}`);
        expectSimpleRun(deg, [`${X[pl[0]]},${Y[pl[0]]}`, `${X[pl[2]]},${Y[pl[2]]}`]);
        expect(deg.get(key(c.branch)) ?? 0).toBeLessThanOrEqual(2);
        expect(allProblems(p)).toEqual([]);
        expect(dissolvableProblems(p)).toEqual([]);
        expect(fidelityProblems(p, lv, g.cls, g.points, { closed: g.closed }, pl, entity)).toEqual([]);
      });
      expect(seen).toBe(true);
    });

    it(`generator seed ${c.seed}, chain ${c.step}: under a way key in one batch of M0-a-06's transaction (the suite wired in), the batch commits`, () => {
      replay(c.seed, c.step, (p, g, lv) => {
        const entity = `way:c${c.step}`;
        const r = txn(p, spec(lv), (o) => {
          const k = insertChain(o, g.points.map(([x, y]) => pt(x, y)), [{ role: 'way', entity }], g.cls, { closed: g.closed });
          if (!k.ok) return k;
          return ok(null);
        }, suiteEnv({ report: suiteReport() }));
        expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
        expect([...rowDegrees(p, `way/${entity}`).values()].every((d) => d <= 2)).toBe(true);
      });
    });
  }
});
