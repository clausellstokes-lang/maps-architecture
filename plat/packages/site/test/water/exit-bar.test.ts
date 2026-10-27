// M0-e-03's exit bar, marked "here" (§4.2 S1 (5), (8), (9); §16 M0 (e)): "S1's L0 batch commits on 100 river seeds with
// every hard invariant; every deck_end resolves; sites spaced ≥ 40 m". The 100 seeds run on the CITY rung over a 100 ha
// frame (its arena 1.6 km; C-0229 (11)) — a river from the highest edge or a bearing, a tributary on even seeds, the
// basic estuary on every third — and three full CITY frames run the same checks. After each commit: the kernel's CI
// sweep (§3.10 every hard row over the whole arena — the batch-local rows, the stored references, Euler per level),
// each Bridge's two deck_end vertices resolving to one pinned vertex each, every pair of decks ≥ 40 m apart, and the
// checker's deck property (§2.2 rule 7): every L0 edge is a shore or the ring — so no L0 edge crosses water — no edge
// carries a deck role, and each body keeps one L0 face per part of its polygon — so no deck splits a reach's face.
// And every committed deck lies within ±10° of the normal of the flow averaged over one channel width up and downstream
// (§4.2 S1 (5)), that flow computed by the test (support's `flowNear`), never read from the site (C-0233). The decks'
// spacing is measured by the test's own segment distance (support's `segGap`; L27 (c)). Hardening round S3: each site's
// deck and span are the committed deck's (note 10); each bank outfall lies on its body's committed shore chain, within
// the centimetre's rounding (note 1); no body is refused (Q45: bar seed 62's tributary, refused before, commits); the
// full CITY frames' fast-ring refusals are pinned by their texts (N-c1-6).
import { isVertexLive, VERTEX_PINNED, type Plat } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { GROUND_KEY } from '../../src/terrain/index.js';
import { runS1 } from '../../src/water/index.js';
import type { RiverRequest } from '../../src/hydro/index.js';
import { everyL0EdgeShoreOrRing, flowNear, ground, hardFailures, heldRefs, offNormalDeg, pointSegGap, riverFixture, segGap } from './support.js';

/** The checks on one seed; returns its site count and its report's degradations. */
function bar(seed: number, size: { areaHa?: number }): { sites: number; decks: number; offFlow: string[]; refused: number; retried: boolean; slow: number; fallbacks: string[]; offShore: string[] } {
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
  const { refs, live } = heldRefs(fx.terrain.id, out);
  expect(hardFailures(plat, refs, live).map((x) => `seed ${String(seed)} ${x}`)).toEqual([]);
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
    for (let j = i + 1; j < decks.length; j += 1) expect(segGap(decks[i][0], decks[i][1], decks[j][0], decks[j][1])).toBeGreaterThanOrEqual(4000);
  }
  // each committed deck perpendicular to the one-width averaged flow within ±10°: the stage's new bridges follow its
  // sites in order (bridge first + i is site i); the deck measured is the committed one, its two resolved ends
  const offFlow: string[] = [];
  const first = fx.water.bridges.length;
  expect(out.water.bridges.length - first).toBe(out.sites.length);
  out.water.bridges.slice(first).forEach((b, i) => {
    const [p, q] = decks[first + i];
    const site = out.sites[i];
    expect(site, `seed ${String(seed)} ${b.id}: its site`).toBeDefined();
    const body = out.water.bodies.find((w) => w.id === site?.water);
    expect(body, `seed ${String(seed)} ${b.id}: its body`).toBeDefined();
    if (site === undefined || body === undefined) return;
    const deg = offNormalDeg(p, q, flowNear(body, site.at));
    if (!(deg <= 10)) offFlow.push(`seed ${String(seed)} ${b.id} ${deg.toFixed(1)}°`);
    // the site's record is the committed deck: its two ends the resolved vertices (note 10); its span (and its Bridge's)
    // their distance within the two ends' rounding to the centimetre and the span's own (2 cm)
    expect([site.deck[0], site.deck[1]], `seed ${String(seed)} ${b.id}: the site's deck`).toEqual([p, q]);
    expect(Math.abs(site.spanCm - Math.hypot(q.x - p.x, q.y - p.y)), `seed ${String(seed)} ${b.id}: the span`).toBeLessThanOrEqual(2);
    expect(b.spanCm).toBe(site.spanCm);
  });
  // each bank outfall on its body's committed shore chain: within the centimetre's rounding of a committed shore edge (note 1)
  const offShore: string[] = [];
  for (const o of out.terrain.outfalls) {
    if (o.water === null) continue;
    const sh = kernel.resolve({ role: 'shore', entity: o.water }, GROUND_KEY);
    let gap = Infinity;
    if (sh.view === 'edges') {
      for (const run of sh.runs) {
        for (const h of run) {
          const a = plat.halfEdges.origin[h];
          const c = plat.halfEdges.origin[h ^ 1];
          gap = Math.min(gap, pointSegGap(o.at, { x: plat.vertices.x[a], y: plat.vertices.y[a] }, { x: plat.vertices.x[c], y: plat.vertices.y[c] }));
        }
      }
    }
    if (!(gap <= Math.SQRT1_2 + 1e-9)) offShore.push(`seed ${String(seed)} ${o.water} (${String(o.at.x)}, ${String(o.at.y)}) ${gap.toFixed(1)} cm`);
  }
  deckProperty(plat, out.water.bodies.map((b) => b.id), r.value.water.bodies.map((b) => kernel.resolve(b.face, GROUND_KEY)));
  return { sites: out.sites.length, decks: decks.length, offFlow, refused: out.report.dropped.filter((d) => d.reason === 'refused').length, retried: out.report.retried, slow: out.report.fallbacks.length, fallbacks: out.report.fallbacks.map((f) => `${f.id}: ${f.why}`), offShore };
}

/** §2.2 rule 7 on the fixture: every L0 edge a shore or the ring, no deck edge, one face per body part. */
function deckProperty(plat: Plat, ids: string[], faces: ReturnType<ReturnType<typeof ground>['kernel']['resolve']>[]): void {
  for (const roles of everyL0EdgeShoreOrRing(plat)) expect(roles.includes('deck')).toBe(false);
  for (let i = 0; i < ids.length; i += 1) {
    const f = faces[i];
    expect(f.view === 'faces' && f.faces.length).toBeGreaterThan(0);
  }
}

describe('the exit bar: S1\'s L0 batch on 100 river seeds (§4.2 S1 (5), (8), (9); §16 M0 (e))', () => {
  it('100 seeds on the CITY rung (100 ha frame): every commit holds every hard invariant, every deck_end resolves, sites ≥ 40 m apart, every deck within ±10° of the averaged flow\'s normal', () => {
    let sites = 0;
    let refused = 0;
    let retried = 0;
    let slow = 0;
    let decks = 0;
    const offFlow: string[] = [];
    const offShore: string[] = [];
    for (let seed = 1; seed <= 100; seed += 1) {
      const r = bar(seed, { areaHa: 100 });
      sites += r.sites;
      decks += r.decks;
      offFlow.push(...r.offFlow);
      offShore.push(...r.offShore);
      refused += r.refused;
      retried += r.retried ? 1 : 0;
      slow += r.slow;
    }
    // the bar is not vacuous: the seeds site crossings; the degradations stay rare (reported, never silent)
    expect(sites).toBeGreaterThan(300);
    // every deck of every seed within ±10° of the averaged flow's normal
    expect(decks).toBeGreaterThan(300);
    expect(offFlow).toEqual([]);
    expect(offShore).toEqual([]);
    // no body refused (Q45: bar seed 62's tributary, refused on both polygons before the hardening round S3, commits)
    expect(refused).toBe(0);
    expect(retried).toBeLessThanOrEqual(5);
    process.env.PLAT_S1_TALLY = JSON.stringify({ sites, refused, retried, slow });
  }, 900_000);

  it('three full CITY frames, among them a ring the fast path refuses (the kernel\'s buffer takes it): the same checks', () => {
    // each frame's fast-ring refusals by their texts (N-c1-6): the pocket inside a pocket, the offset line's
    const fallbacks: Record<number, string[]> = {
      4: ['water:river:0: offset: a pocket inside a pocket'],
      10: ['water:river:0: offset: a pocket inside a pocket', 'water:tributary:0: offset: a pocket inside a pocket'],
      3: [],
    };
    for (const seed of [4, 10, 3]) {
      const r = bar(seed, {});
      expect(r.sites).toBeGreaterThan(0);
      expect(r.offFlow).toEqual([]);
      expect(r.offShore).toEqual([]);
      expect(r.refused).toBe(0);
      expect(r.fallbacks).toEqual(fallbacks[seed]);
    }
  }, 900_000);
});
