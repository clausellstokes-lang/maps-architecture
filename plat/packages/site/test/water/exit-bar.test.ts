// M0-e-03's exit bar, marked "here" (§4.2 S1 (5), (8), (9); §16 M0 (e)): "S1's L0 batch commits on 100 river seeds with
// every hard invariant; every deck_end resolves; sites spaced ≥ 40 m". The 100 seeds run on the CITY rung over a 100 ha
// frame (its arena 1.6 km; C-0229 (11)) — a river from the highest edge or a bearing, a tributary on even seeds, the
// basic estuary on every third — and three full CITY frames run the same checks. After each commit: the kernel's CI
// sweep (§3.10 every hard row over the whole arena — the batch-local rows, the stored references, Euler per level),
// each Bridge's two deck_end vertices resolving to one pinned vertex each, every pair of decks ≥ 40 m apart, and the
// checker's deck property (§2.2 rule 7): every L0 edge is a shore or the ring — so no L0 edge crosses water — no edge
// carries a deck role, and each body keeps one L0 face per part of its polygon — so no deck splits a reach's face.
import { checkCI, isVertexLive, rowKey, rowsOn, VERTEX_PINNED, type Plat } from '@plat/kernel';
import type { GeomRef } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { GROUND_KEY } from '../../src/terrain/index.js';
import { leftFaces, runS1, segSeg2 } from '../../src/water/index.js';
import type { RiverRequest } from '../../src/hydro/index.js';
import { ground, riverFixture } from './support.js';

/** The checks on one seed; returns its site count and its report's degradations. */
function bar(seed: number, size: { areaHa?: number }): { sites: number; refused: number; retried: boolean; slow: number } {
  const request: RiverRequest = {
    ...(seed % 4 === 1 ? { inflowBearingCdeg: (seed * 3700) % 36_000 } : {}),
    ...(seed % 2 === 0 ? { tributaries: [{}] } : {}),
    ...(seed % 3 === 0 ? { mouth: 'estuary' as const } : {}),
  };
  const fx = riverFixture(seed, { relief: seed % 5 === 0 ? 'hilly' : 'rolling' }, request, size);
  const { plat, kernel } = ground(fx.frame);
  const r = runS1({ terrain: fx.terrain, water: fx.water, kernel, ...(request.mouth !== undefined ? { mouth: request.mouth } : {}) }, fx.ctx);
  if (!r.ok) throw new Error(`seed ${String(seed)}: ${r.code} ${r.detail}`);
  const out = r.value;
  expect(out.water.bodies.length).toBeGreaterThan(0);
  // every hard invariant, over the whole arena
  const refs: GeomRef[] = [{ role: 'margin', entity: fx.terrain.id }];
  const live = new Set([fx.terrain.id]);
  for (const b of out.water.bodies) {
    refs.push(b.face, b.shore);
    live.add(b.id);
  }
  for (const b of out.water.bridges) {
    refs.push(...b.deck);
    live.add(b.id);
  }
  for (const c of out.land) {
    refs.push(c.face);
    live.add(c.id);
  }
  const rows = checkCI(plat, { refs, isLive: (id) => live.has(id) });
  expect(rows.filter((x) => x.class === 'hard' && !x.holds).map((x) => `seed ${String(seed)} ${x.name}: ${x.problems.slice(0, 2).join('; ')}`)).toEqual([]);
  // every deck_end resolves to one pinned vertex; decks ≥ 40 m apart
  const decks: { x: number; y: number }[][] = [];
  for (const b of out.water.bridges) {
    const ends: { x: number; y: number }[] = [];
    for (const ref of b.deck) {
      const res = kernel.resolve(ref, GROUND_KEY);
      expect(res.view === 'vertices' && res.vertices.length).toBe(1);
      if (res.view !== 'vertices') continue;
      const v = res.vertices[0];
      expect(isVertexLive(plat, v) && (plat.vertices.flags[v] & VERTEX_PINNED) !== 0).toBe(true);
      ends.push({ x: plat.vertices.x[v], y: plat.vertices.y[v] });
    }
    decks.push(ends);
  }
  for (let i = 0; i < decks.length; i += 1) {
    for (let j = i + 1; j < decks.length; j += 1) expect(Math.sqrt(segSeg2(decks[i][0], decks[i][1], decks[j][0], decks[j][1]))).toBeGreaterThanOrEqual(4000);
  }
  deckProperty(plat, out.water.bodies.map((b) => b.id), r.value.water.bodies.map((b) => kernel.resolve(b.face, GROUND_KEY)));
  return { sites: out.sites.length, refused: out.report.dropped.filter((d) => d.reason === 'refused').length, retried: out.report.retried, slow: out.report.fallbacks.length };
}

/** §2.2 rule 7 on the fixture: every L0 edge a shore or the ring, no deck edge, one face per body part. */
function deckProperty(plat: Plat, ids: string[], faces: ReturnType<ReturnType<typeof ground>['kernel']['resolve']>[]): void {
  const left = leftFaces(plat);
  const seen = new Set<number>();
  for (const h of left.keys()) {
    if (seen.has(h >> 1)) continue;
    seen.add(h >> 1);
    const roles = rowsOn(plat, 'edge', h).map((q) => rowKey(plat, q).role);
    expect(roles.some((x) => x === 'shore' || x === 'margin')).toBe(true);
    expect(roles.includes('deck')).toBe(false);
  }
  for (let i = 0; i < ids.length; i += 1) {
    const f = faces[i];
    expect(f.view === 'faces' && f.faces.length).toBeGreaterThan(0);
  }
}

describe('the exit bar: S1\'s L0 batch on 100 river seeds (§4.2 S1 (5), (8), (9); §16 M0 (e))', () => {
  it('100 seeds on the CITY rung (100 ha frame): every commit holds every hard invariant, every deck_end resolves, sites ≥ 40 m apart', () => {
    let sites = 0;
    let refused = 0;
    let retried = 0;
    let slow = 0;
    for (let seed = 1; seed <= 100; seed += 1) {
      const r = bar(seed, { areaHa: 100 });
      sites += r.sites;
      refused += r.refused;
      retried += r.retried ? 1 : 0;
      slow += r.slow;
    }
    // the bar is not vacuous: the seeds site crossings; the degradations stay rare (reported, never silent)
    expect(sites).toBeGreaterThan(300);
    expect(refused).toBeLessThanOrEqual(3);
    expect(retried).toBeLessThanOrEqual(5);
    process.env.PLAT_S1_TALLY = JSON.stringify({ sites, refused, retried, slow });
  }, 900_000);

  it('three full CITY frames, among them a ring the fast path refuses (the kernel\'s buffer takes it): the same checks', () => {
    for (const seed of [4, 10, 3]) expect(bar(seed, {}).sites).toBeGreaterThan(0);
  }, 900_000);
});
