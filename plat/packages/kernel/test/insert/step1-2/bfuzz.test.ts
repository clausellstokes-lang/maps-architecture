// M0-a-04's exit bar, B-FUZZ (§13.1; marked *here* in M0-work.json): PLAT_FUZZ_RUNS random cases per primitive — 10⁴
// in the PR tier, 10⁶ nightly (C-0057) — plus §13.1's attraction and quantisation classes, with 0 crashes (a throw
// fails the property), 0 hangs (each test's hard timeout) and 0 invalid outputs (§3.10's rows these writers keep, read
// by the support's validator on the whole arena after every write; a refusal writes nothing). The item's own
// fast-check properties meet it (the spec note N-16): the writers land before the test kit's generators and
// constructive set. The two listed properties are here: every placed vertex lies within 0.71 cm of its edge's route
// and at least minEdge from the edge's endpoints; an incoming vertex moves at most √2 · attractCm on every path but the
// placement's fallback, which lands — judged by an independent oracle — on the nearer endpoint of the sub-edge its exact
// position falls on, with W_PLACED and nothing written (C-0169 (6), C-0170 (1), superseding C-0169 (4)'s "no fallback
// fires": an acute corner inside a vertex's one-ring can refuse every candidate; attract.test.ts's thin wedge shows one).
// decimate's random-chain property is in decimate.test.ts.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { handleOf, isHalfEdgeLive, outgoing, roleIdOf, rowsOfKey, type Plat, type VertexId } from '../../../src/arena/index.js';
import { routeRun } from '../../../src/index/index.js';
import { attractVertex } from '../../../src/insert/attractVertex.js';
import { insertTx } from '../../../src/insert/classes.js';
import { placePoint } from '../../../src/insert/placement.js';
import { splitThrough } from '../../../src/insert/splitThrough.js';
import type { Level } from '../../../src/types/index.js';
import { chordArena, fingerprint, liveEdges, liveVertices, problems, pt, TIMEOUT } from './support.js';

const B = (v: number): bigint => BigInt(v);

/** Is the lattice point q within the hot pixel (0.71 cm) of the closed segment a–b's line, its foot inside? Exact. */
function onRoute(qx: number, qy: number, ax: number, ay: number, bx: number, by: number): boolean {
  const o = (B(bx) - B(ax)) * (B(qy) - B(ay)) - (B(by) - B(ay)) * (B(qx) - B(ax));
  const l2 = (B(bx) - B(ax)) ** 2n + (B(by) - B(ay)) ** 2n;
  const dot = (B(qx) - B(ax)) * (B(bx) - B(ax)) + (B(qy) - B(ay)) * (B(by) - B(ay));
  return 10_000n * o * o <= 5_041n * l2 && dot > 0n && dot < l2;
}

/**
 * The own-level route a vertex was placed on: the run through it when it is finer (a Steiner vertex), else the far ends
 * of the two runs it cut (a same-level split).
 */
function routeOf(p: Plat, v: VertexId): [VertexId, VertexId] {
  const O = p.halfEdges.origin;
  const far: VertexId[] = [];
  for (const h of outgoing(p, v)) {
    const run = routeRun(p, h).halfEdges;
    const a = O[run[0]];
    const b = O[run[run.length - 1] ^ 1];
    if (a !== v && b !== v) return [a, b];
    far.push(a === v ? b : a);
  }
  return [far[0], far[1]];
}

/**
 * Where the placement's fallback may put an incoming lattice point q at level n, judged from §3.6's text independently of
 * the code: the level-n route pieces (a run cut at its vertices of level ≤ n, §3.3) whose interior holds q's foot and
 * lies within attractCm of q — the nearest of them (exact, ties all kept) — and for each, the nearer endpoint (ties y then
 * x) of the sub-edge of its run that q's exact position, its foot on the run's own-level route clamped to it, falls on.
 */
function fallbackLandings(p: Plat, qx: number, qy: number, n: number): Set<VertexId> {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const O = p.halfEdges.origin;
  const runs = new Set<number>();
  const near: { o2: bigint; l2: bigint; run: VertexId[] }[] = [];
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e) || p.halfEdges.level[e] > n) continue;
    const hs = routeRun(p, 2 * e).halfEdges;
    const id = Math.min(...hs.map((h) => h >> 1));
    if (runs.has(id)) continue;
    runs.add(id);
    const run = [...hs.map((h) => O[h]), O[hs[hs.length - 1] ^ 1]];
    let i0 = 0;
    for (let i = 1; i < run.length; i++) {
      if (i < run.length - 1 && L[run[i]] > n) continue;
      const a = run[i0];
      const b = run[i];
      i0 = i;
      const ux = B(X[b]) - B(X[a]);
      const uy = B(Y[b]) - B(Y[a]);
      const l2 = ux * ux + uy * uy;
      const dot = (B(qx) - B(X[a])) * ux + (B(qy) - B(Y[a])) * uy;
      const o = ux * (B(qy) - B(Y[a])) - uy * (B(qx) - B(X[a]));
      if (dot > 0n && dot < l2 && o * o <= 676n * l2) near.push({ o2: o * o, l2, run });
    }
  }
  const out = new Set<VertexId>();
  if (near.length === 0) return out;
  let best = near[0];
  for (const c of near) if (c.o2 * best.l2 < best.o2 * c.l2) best = c;
  for (const c of near) {
    if (c.o2 * best.l2 !== best.o2 * c.l2) continue;
    const run = c.run;
    const A = run[0];
    const Bv = run[run.length - 1];
    const ux = B(X[Bv]) - B(X[A]);
    const uy = B(Y[Bv]) - B(Y[A]);
    const l2 = ux * ux + uy * uy;
    let tq = (B(qx) - B(X[A])) * ux + (B(qy) - B(Y[A])) * uy;
    if (tq < 0n) tq = 0n;
    if (tq > l2) tq = l2;
    // the exact position e = A + u · tq / l2; a vertex's squared distance to it, scaled by l2², exactly
    const far = (v: VertexId): bigint => ((B(X[A]) - B(X[v])) * l2 + ux * tq) ** 2n + ((B(Y[A]) - B(Y[v])) * l2 + uy * tq) ** 2n;
    const proj = (v: VertexId): bigint => (B(X[v]) - B(X[A])) * ux + (B(Y[v]) - B(Y[A])) * uy;
    for (let j = 0; j + 1 < run.length; j++) {
      // the sub-edge(s) e falls on: its projection between its ends' (both, where e projects onto a run vertex)
      if (!(proj(run[j]) <= tq && tq <= proj(run[j + 1]))) continue;
      const s = run[j];
      const t = run[j + 1];
      const ds = far(s);
      const dt = far(t);
      out.add(ds < dt || (ds === dt && (Y[s] < Y[t] || (Y[s] === Y[t] && X[s] < X[t]))) ? s : t);
    }
  }
  return out;
}

/** A point for the writers: along an edge with a perpendicular offset (near an endpoint sometimes), or anywhere. */
function pointNear(p: Plat, edge: [VertexId, VertexId], t: number, offset: number, mode: number): { x: number; y: number } {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const [a, b] = edge;
  const dx = X[b] - X[a];
  const dy = Y[b] - Y[a];
  const l = Math.hypot(dx, dy);
  if (mode === 0) return { x: Math.round(t * 4000), y: Math.round(offset * 125 + 2000) }; // anywhere in the frame
  // mode 1: along the edge; mode 2: within 40 cm of its first endpoint (the endpoint rule's region)
  const along = mode === 1 ? t * l : t * 40;
  return { x: Math.round(X[a] + (dx / l) * along - (dy / l) * offset), y: Math.round(Y[a] + (dy / l) * along + (dx / l) * offset) };
}

const cases = fc.record({
  seed: fc.integer({ min: 1, max: 0x7fffffff }),
  pick: fc.nat(),
  t: fc.double({ min: 0, max: 1, noNaN: true }),
  offset: fc.integer({ min: -34, max: 34 }),
  mode: fc.integer({ min: 0, max: 2 }),
  level: fc.integer({ min: 0, max: 4 }),
});

describe('B-FUZZ: attractVertex (the attraction class; the bound of §3.6 Existing geometry wins)', () => {
  it('never throws; the arena keeps §3.10’s rows; an incoming vertex moves at most √2 · attractCm but by the placement’s fallback, which lands on the nearer endpoint of its exact position’s sub-edge; a split vertex lies on its route', () => {
    let runs = 0;
    let fallbacks = 0;
    let fallbackMax = 0;
    const seen = new Map<string, number>();
    const count = (k: string): void => {
      seen.set(k, (seen.get(k) ?? 0) + 1);
    };
    fc.assert(
      fc.property(cases, ({ seed, pick, t, offset, mode, level }) => {
        const { built } = chordArena(seed);
        const p = built.plat;
        const es = liveEdges(p);
        const [a, b] = es[pick % es.length];
        const q = pointNear(p, [a, b], t, offset, mode);
        const tx = insertTx(p, level as Level);
        const nv = liveVertices(p).length;
        const before = fingerprint(p);
        const r = attractVertex(tx, pt(q.x, q.y));
        if (!r.ok) {
          expect(r.code).toBe('E_LEVEL'); // a landing on a vertex finer than the batch (candidate (b), M0-a-05's)
          expect(fingerprint(p)).toBe(before);
          return true;
        }
        runs += 1;
        count(r.value.kind === 'vertex' ? `vertex:${r.value.onto}` : r.value.kind);
        if (tx.warnings.some((w) => w.code === 'W_PLACED')) count('W_PLACED');
        const moved = Math.hypot(r.value.at.x - q.x, r.value.at.y - q.y);
        const fallback = r.value.kind === 'vertex' && tx.warnings.some((w) => w.code === 'W_PLACED');
        if (fallback && r.value.kind === 'vertex') {
          // the placement's fallback (§3.6): no candidate qualified, so the vertex lands on the nearer endpoint of the
          // sub-edge its exact position falls on (ties y then x), reported W_PLACED and W_ATTRACTED, nothing written
          // (the arena's fingerprint and §3.10's rows are checked below); the √2 · attractCm bound does not hold here
          fallbacks += 1;
          fallbackMax = Math.max(fallbackMax, moved);
          expect(r.value.onto).toBe('endpoint');
          expect(fallbackLandings(p, q.x, q.y, level).has(r.value.vertex)).toBe(true);
          expect(tx.warnings).toEqual(expect.arrayContaining([
            expect.objectContaining({ code: 'W_PLACED', count: 1, at: r.value.at }),
            expect.objectContaining({ code: 'W_ATTRACTED', count: 1 }),
          ]));
        } else {
          expect(moved).toBeLessThanOrEqual(Math.SQRT2 * 26 + 1e-9);
        }
        if (r.value.kind === 'split') {
          const v = r.value.vertex;
          const [ra, rb] = routeOf(p, v);
          expect(onRoute(p.vertices.x[v], p.vertices.y[v], p.vertices.x[ra], p.vertices.y[ra], p.vertices.x[rb], p.vertices.y[rb])).toBe(true);
          for (const h of outgoing(p, v)) {
            const w = p.halfEdges.origin[h ^ 1];
            expect((p.vertices.x[w] - p.vertices.x[v]) ** 2 + (p.vertices.y[w] - p.vertices.y[v]) ** 2).toBeGreaterThanOrEqual(625);
          }
          expect(liveVertices(p)).toHaveLength(nv + 1);
        } else {
          expect(fingerprint(p)).toBe(before);
        }
        expect(problems(p)).toEqual([]);
        return true;
      }),
    );
    // Reported, not asserted (informative): the fallback fires on valid arenas, rarely (C-0170 (1)).
    console.log(`B-FUZZ attractVertex: ${runs} written cases; placement fallbacks ${fallbacks}${fallbacks > 0 ? ` (largest move ${fallbackMax.toFixed(1)} cm)` : ''}`);
    // every branch of step 2 is exercised: free, onto a vertex, onto an endpoint, a split
    for (const k of ['free', 'vertex:vertex', 'vertex:endpoint', 'split']) expect(seen.get(k) ?? 0).toBeGreaterThan(0);
  }, TIMEOUT);
});

describe('B-FUZZ: splitThrough (sequences of splits; the listed placement property)', () => {
  it('never throws; every placed vertex lies within 0.71 cm of its edge’s route and ≥ minEdge from the edge’s endpoints; a refusal writes nothing', () => {
    fc.assert(
      fc.property(cases, fc.array(fc.tuple(fc.nat(), fc.double({ min: 0, max: 1, noNaN: true }), fc.integer({ min: -60, max: 60 }), fc.boolean()), { minLength: 1, maxLength: 3 }), ({ seed, level }, splits) => {
        const { built } = chordArena(seed);
        const p = built.plat;
        const X = p.vertices.x;
        const Y = p.vertices.y;
        const tx = insertTx(p, level as Level);
        let anchors = 0;
        for (const [pick, t, offset, withRow] of splits) {
          const pairs: number[] = [];
          for (let e = 0; e < p.slots.pair.top; e++) if (p.halfEdges.origin[2 * e] !== -1) pairs.push(e);
          const e = pairs[pick % pairs.length];
          const q = pointNear(p, [p.halfEdges.origin[2 * e], p.halfEdges.origin[2 * e + 1]], t, offset, 1);
          const before = fingerprint(p);
          const created = tx.journal.vertices.length;
          const r = splitThrough(tx, 2 * e, pt(q.x, q.y), withRow ? { role: 'anchor', entity: 'district:f' } : undefined);
          if (!r.ok) {
            // these arenas hold L0 and L1 only, and every split adds a vertex of the batch's level: a refusal is a finer
            // edge than the batch, or — at L0 — a foot beside a chord's L1 end on the frame (candidate (b), M0-a-05's)
            expect(r.code).toBe('E_LEVEL');
            expect(p.halfEdges.level[e] > level || level === 0).toBe(true);
            expect(fingerprint(p)).toBe(before);
            continue;
          }
          if (withRow) anchors += 1;
          const v = r.value;
          if (tx.journal.vertices.length > created) {
            expect(tx.journal.vertices[created]).toBe(v);
            const [ra, rb] = routeOf(p, v);
            expect(onRoute(X[v], Y[v], X[ra], Y[ra], X[rb], Y[rb])).toBe(true);
            for (const h of outgoing(p, v)) {
              const w = p.halfEdges.origin[h ^ 1];
              expect((X[w] - X[v]) ** 2 + (Y[w] - Y[v]) ** 2).toBeGreaterThanOrEqual(625);
            }
          }
          expect(problems(p)).toEqual([]);
        }
        // every contact name its own ordinal: one vertex per (anchor, district:f, ordinal) key (§3.3 rule 2)
        const h = handleOf(p, 'district:f');
        let rows = 0;
        for (let o = 0; o < anchors + 1 && h >= 0; o++) {
          const n = rowsOfKey(p, roleIdOf('anchor'), h, o).length;
          expect(n).toBeLessThanOrEqual(1);
          rows += n;
        }
        expect(rows).toBe(anchors);
        return true;
      }),
    );
  }, TIMEOUT);
});

describe('B-FUZZ: placePoint (the placement rule; crossings included)', () => {
  it('never throws, writes nothing, and every answer keeps (i) and (ii)', () => {
    fc.assert(
      fc.property(cases, fc.boolean(), fc.integer({ min: 30, max: 400 }), fc.integer({ min: 30, max: 400 }), ({ seed, pick, t }, crossing, cs, ds) => {
        const { built } = chordArena(seed);
        const p = built.plat;
        const es = liveEdges(p);
        const [a, b] = es[pick % es.length];
        const X = p.vertices.x;
        const Y = p.vertices.y;
        const ex = X[a] + t * (X[b] - X[a]);
        const ey = Y[a] + t * (Y[b] - Y[a]);
        const l = Math.hypot(X[b] - X[a], Y[b] - Y[a]);
        const nx = -(Y[b] - Y[a]) / l;
        const ny = (X[b] - X[a]) / l;
        const c = pt(Math.round(ex + nx * cs), Math.round(ey + ny * cs));
        const d = pt(Math.round(ex - nx * ds), Math.round(ey - ny * ds));
        let h = -1;
        for (let e = 0; e < p.slots.pair.top; e++) if (p.halfEdges.origin[2 * e] === a && p.halfEdges.origin[2 * e + 1] === b) h = 2 * e;
        const before = fingerprint(p);
        const r = placePoint(insertTx(p, 4), h, { x: ex, y: ey }, crossing ? { c, d } : undefined);
        expect(fingerprint(p)).toBe(before);
        expect(r.ok).toBe(true);
        if (!r.ok) return true;
        const run = routeRun(p, h).halfEdges;
        const O = p.halfEdges.origin;
        const A = O[run[0]];
        const Bv = O[run[run.length - 1] ^ 1];
        if (r.value.kind === 'placed') {
          const q = r.value.at;
          expect(onRoute(q.x, q.y, X[A], Y[A], X[Bv], Y[Bv])).toBe(true); // (i)
          const s = O[r.value.sub];
          const u = O[r.value.sub ^ 1];
          for (const w of [s, u]) expect((X[w] - q.x) ** 2 + (Y[w] - q.y) ** 2).toBeGreaterThanOrEqual(625); // (ii)
          if (crossing) for (const w of [c, d]) expect((w.x - q.x) ** 2 + (w.y - q.y) ** 2).toBeGreaterThanOrEqual(625);
          expect(Math.hypot(q.x - ex, q.y - ey)).toBeLessThanOrEqual(26); // the search never goes beyond attractCm
        } else {
          const v = r.value.vertex;
          expect(run.some((g) => O[g] === v) || O[run[run.length - 1] ^ 1] === v).toBe(true);
        }
        return true;
      }),
    );
  }, TIMEOUT);
});
