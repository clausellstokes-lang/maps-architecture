// M0-e-03's hardening round S4 (lane build/M0-e-03-fix-s4; leg 3 of the merged round M0-e-01 S2 → M0-e-02 S2 →
// M0-e-03 S4; the queue rows Q114, Q115, Q122's S1 share), each row pinned here:
//
// * Q114 — the snap's `cell` re-finding (`onCommittedShores`, §2.3: `cell` is "the hydro cell containing `at`"). On
//   every input met the snap moves a bank point by about a centimetre and never across a hydro cell edge, so nothing
//   there could tell a stale `cell` from a re-found one. A planted façade moves every shore vertex off the arena's edge
//   by 1.2 m on each axis before inserting it: the committed shore no longer lies where `outfalls` read the polygon,
//   the snap moves bank points up to 1.7 m, across cell edges, and each `cell` must be the cell holding its moved `at`
//   (the test's own floor arithmetic on the hydro grid, never the code's `cellAt`).
// * Q115 — SMALL_RIVER seeds 1890815356 and 2893352673's `near the edge` fallback is pinned LAWFUL. The river S1 (3)
//   traced runs within metres of the arena's edge: a course point lies only its half-width plus 18 cm (2893352673) or
//   29 cm (1890815356) inside the edge, so the river's own bank there passes under RING_CLEAR_CM (60 cm) from the edge
//   without lying on it — the input's geometry, read by this test from the course and its widths, not a Douglas–Peucker
//   artefact. The fast ring's guard (a vertex near the edge but off it would be drawn onto the outer ring) routes the
//   body to the kernel's construction (C-0229 (2)), which commits with every hard row green: a fallback, never a
//   refusal (the stage's census stays 0).
// * Q122 (S1) — relief-3000 (the site spike's hill-acropolis fixture) at the default configuration, seed 184: the
//   river's fast ring is refused `offset: a pocket inside a pocket` and the kernel's buffer of its meandering course
//   leaves two pockets of 1 m² and 3.3 m² beside the outer ring; cleaned, each triangle meets the cleaned outer ring,
//   and proved before the sliver drop they refused the stage `rings meet` — a lawful input refused. `provedRings` now
//   drops, before the proofs, a HOLE the kernel made under SLIVER_AREA_CM2 that the clean leaves under it too (an islet
//   `partsOf` drops from the body and the fast ring never keeps as a hole), and seed 184 commits. (Round S5, N-s4c-1:
//   the made-area clause withdrawn — a hole the clean leaves under SLIVER_AREA_CM2 is dropped whatever area the kernel
//   made it, the measure `partsOf` drops by; hardening-s5.test.ts pins the band. This file's pins stand unchanged.)
//   An outer ring is proved
//   whatever its area: slow-rings.test.ts's loop river (50 cm wide across its own course: the kernel's buffer gives
//   four small outer rings, one of 2.4 m²) stays refused with its cause, never dropped `empty`; and here a small outer
//   ring beside the water is still refused.
//
// The two seeded rows run through the registered S1's composition — the base TerrainStrategy, the base RiverStrategy and
// `s1Stage`, under the runner's town key and the base arena's index cell (C-0264) — under a hand-built StageContext,
// never through @plat/layout's runner (§14; C-0123), as slow-rings.test.ts's Q20 seeds do; the blueprints are restated
// here (the testkit's SMALL_RIVER; the bench's relief-3000 on M0-x-04's RIVER_BLUEPRINT), since this package's tests
// cannot import those packages.
import { attachIndex, createKernel, createPlat, createRng, seedKey, STAGES, type Hash128, type Kernel, type LatticePoint, type Plat } from '@plat/kernel';
import { mintTownRoot, type Cm, type Outfall, type StageContext } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { baseRivers } from '../../src/hydro/index.js';
import { baseTerrain, GROUND_KEY, TOWN_ROOT, type SiteEnv } from '../../src/terrain/index.js';
import { provedRings } from '../../src/water/polygons.js';
import { reachOf, runS1, s1Stage, type S1Output } from '../../src/water/index.js';
import { frameOf, ground, hardFailures, heldRefs, pointSegGap, pt, riverFixture, siteContext, SMALL_ARENA } from './support.js';

/** The hydro cell holding (x, y): the test's own floor arithmetic on the grid, clamped (§2.3's "the cell containing"). */
function cellHolding(g: { cellCm: number; cols: number; rows: number; originX: number; originY: number }, x: number, y: number): number {
  const i = Math.min(g.cols - 1, Math.max(0, Math.floor((x - g.originX) / g.cellCm)));
  const j = Math.min(g.rows - 1, Math.max(0, Math.floor((y - g.originY) / g.cellCm)));
  return j * g.cols + i;
}

describe('Q114: a bank outfall the snap moves across a hydro cell edge takes the cell holding its moved point', () => {
  /** The shift (cm, on each axis) the planted façade gives every shore vertex off the arena's edge. */
  const SHIFT = 120;

  /** S1 on seed `seed`'s 100 ha river (a tributary on even seeds), the façade planted or not. */
  function runOn(seed: number, planted: boolean): { out: S1Output; plat: Plat; kernel: Kernel } {
    const fx = riverFixture(seed, { relief: 'rolling' }, seed % 2 === 0 ? { tributaries: [{}] } : {}, { areaHa: 100 });
    const g = ground(fx.frame);
    const reach = reachOf(fx.frame);
    const geom = {
      ...g.kernel.geom,
      insertChain: ((o, pts, rows, cls, opts) => {
        if (!planted || !rows.some((r) => r.role === 'shore')) return g.kernel.geom.insertChain(o, pts, rows, cls, opts);
        const moved = pts.map((q) => (Math.abs(q.x) === reach.x || Math.abs(q.y) === reach.y ? q : { x: (q.x + SHIFT) as Cm, y: (q.y + SHIFT) as Cm }));
        return g.kernel.geom.insertChain(o, moved, rows, cls, opts);
      }) as Kernel['geom']['insertChain'],
    };
    const r = runS1({ terrain: fx.terrain, water: fx.water, kernel: { ...g.kernel, geom } }, fx.ctx);
    if (!r.ok) throw new Error(`seed ${String(seed)}: ${r.code} ${r.detail}`);
    // the outfalls are the terrain record's (S1 writes them in place); copied before the next run on a fresh fixture
    return { out: { ...r.value, terrain: { ...r.value.terrain, outfalls: r.value.terrain.outfalls.slice() } }, plat: g.plat, kernel: g.kernel };
  }

  it.each([1, 2])('seed %i (100 ha): the shores committed 1.2 m off the polygon, every bank outfall on its committed shore in the cell holding it — and some moved across a cell edge', (seed) => {
    const plain = runOn(seed, false).out.terrain.outfalls;
    const { out, plat, kernel } = runOn(seed, true);
    const outs: Outfall[] = out.terrain.outfalls;
    const g = out.terrain.hydro;
    // the same outfalls (one per stretch, from the same polygons), each bank point moved onto the moved shore
    expect(outs.map((o) => o.water)).toEqual(plain.map((o) => o.water));
    let across = 0;
    let moved = 0;
    outs.forEach((o, i) => {
      expect(o.cell, `outfall ${String(i)} at (${String(o.at.x)}, ${String(o.at.y)})`).toBe(cellHolding(g, o.at.x, o.at.y));
      if (o.water === null) return;
      if (o.at.x !== plain[i].at.x || o.at.y !== plain[i].at.y) moved += 1;
      if (cellHolding(g, plain[i].at.x, plain[i].at.y) !== cellHolding(g, o.at.x, o.at.y)) across += 1;
      // on its body's committed shore within the centimetre's rounding (note 1, under the plant)
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
      expect(gap, `outfall ${String(i)} off its shore`).toBeLessThanOrEqual(Math.SQRT1_2 + 1e-9);
    });
    // not vacuous: the plant moved bank points, and some across a hydro cell edge (a stale `cell` would show there)
    expect(moved).toBeGreaterThan(10);
    expect(across).toBeGreaterThan(0);
  });
});

/** The registered S1's composition (see the header) on `bp` at `seed`: its output, the arena and the S1 input's water. */
function registeredS1(bp: { size: { rung: 'CITY'; aspect: number; areaHa?: number }; site: Record<string, unknown> & { river: unknown } }, seed: number): { out: ReturnType<typeof runS1>; plat: Plat; course: readonly { x: number; y: number }[]; widths: Int32Array } {
  const base = siteContext(seed, 'CITY');
  const rng = createRng();
  const key = mintTownRoot(seedKey(seed)).entityKey as Hash128;
  const ctx: StageContext<SiteEnv> = {
    ...base,
    stream(concern, entity, opts) {
      if (entity !== TOWN_ROOT) throw new Error(`no entity key for handle ${String(entity)}`);
      return rng.stream(key, STAGES.S1, concern, opts);
    },
  };
  const terrain = baseTerrain.terrain({ size: bp.size, site: bp.site } as never, ctx, null as never);
  if (!terrain.ok) throw new Error(terrain.detail);
  const water = baseRivers.rivers({ size: bp.size, site: { river: bp.site.river } } as never, terrain.value, { bodies: [], bridges: [] }, ctx, null as never);
  if (!water.ok) throw new Error(water.detail);
  const river = water.value.bodies[0];
  // the base arena (layout's baseArena): the frame, one index cell of 50 m
  const plat = createPlat(GROUND_KEY, frameOf(bp.size as never));
  attachIndex(plat, { gridCellCm: 5000 });
  const kernel = createKernel(new Map([[GROUND_KEY, plat]]));
  const stage = s1Stage();
  const out = stage.run(stage.inputsOf({ terrain: terrain.value, water: water.value, mouth: 'none', kernel } as never, { kind: 'all' }), ctx);
  return { out, plat, course: river?.course ?? [], widths: river?.widthProfile ?? new Int32Array() };
}

/** EP-01's small river frame (the testkit's SMALL_RIVER): CITY, 30 ha, the river from the west, no mouth, plain relief. */
const SMALL_RIVER = { size: { rung: 'CITY' as const, aspect: 1, areaHa: 30 }, site: { relief: 'plain' as const, river: { inflowBearingCdeg: 27_000, mouth: 'none' as const } } };

describe('Q115: SMALL_RIVER seeds 1890815356 and 2893352673 — the fast ring\'s `near the edge` is the river\'s own bank grazing the edge; the kernel\'s ring commits (lawful)', () => {
  it.each([
    [1890815356, 29],
    [2893352673, 18],
  ])('seed %i: a course point lies its half-width plus %i cm inside the edge; the fast ring is refused `near the edge`, the kernel\'s ring commits with every hard row green, nothing refused', (seed, inside) => {
    const { out, plat, course, widths } = registeredS1(SMALL_RIVER, seed);
    if (!out.ok) throw new Error(`${out.code} ${out.detail}`);
    // the input's geometry: the least positive (distance to the arena's edge − half the width) over the course points
    const reach = reachOf(frameOf(SMALL_RIVER.size as never));
    let least = Infinity;
    course.forEach((q, i) => {
      const gap = Math.min(reach.x - Math.abs(q.x), reach.y - Math.abs(q.y));
      const bank = gap - widths[i] * 0.5;
      if (bank > 0 && bank < least) least = bank;
    });
    expect(Math.round(least)).toBe(inside);
    expect(least).toBeLessThan(60);
    // the fallback, never a refusal: the kernel's construction took the ring; the stage retried nothing, dropped nothing
    const o: S1Output = out.value;
    expect(o.report.fallbacks).toEqual([{ id: 'water:river:0', why: 'near the edge' }]);
    expect(o.report.dropped).toEqual([]);
    expect(o.report.retried).toBe(false);
    expect(o.water.bodies.map((b) => b.id)).toEqual(['water:river:0']);
    const { refs, live } = heldRefs(o.terrain.id, o);
    expect(hardFailures(plat, refs, live)).toEqual([]);
  });
});

/** The site spike's relief-3000 (a 3 000 m hill of 1 200 m radius under the town's centre, hilly) on RIVER_BLUEPRINT. */
const RELIEF_3000 = {
  size: { rung: 'CITY' as const, aspect: 1 },
  site: { relief: 'hilly' as const, primitives: [{ kind: 'hill' as const, at: { x: 0 as Cm, y: 0 as Cm }, radiusM: 1200, heightM: 3000 }], river: { inflowBearingCdeg: 27_000, mouth: 'none' as const } },
};

describe('Q122 (S1): a ring the clean leaves under SLIVER_AREA_CM2 is dropped before the proofs — relief-3000 seed 184 commits', () => {
  const { REACH } = SMALL_ARENA;
  /** A 100 m square of water, counter-clockwise, its south side at y = −5 000. */
  const outer: LatticePoint[] = [pt(-5000, -5000), pt(5000, -5000), pt(5000, 5000), pt(-5000, 5000)];
  /** A clockwise triangle (a hole) of `areaM2` m² whose base lies 10 cm above the square's south side (inside the water). */
  function pocket(areaM2: number): LatticePoint[] {
    const base = Math.round(Math.sqrt(areaM2 * 2) * 100);
    return [pt(0, -4990), pt(Math.round(base / 2), -4990 + base), pt(base, -4990)];
  }

  it('a pocket (a hole) of 3.3 m² 10 cm off the outer ring is an islet below the sliver area: dropped, the outer ring kept; a pocket of 5 m², or an outer ring of 3.3 m², there is still refused `rings meet`', () => {
    expect(provedRings([outer, pocket(3.3)], REACH, [])).toEqual([outer]);
    expect(provedRings([outer, pocket(5)], REACH, [])).toBe('not clear (rings meet)');
    // an outer ring (counter-clockwise) of 3.3 m² 10 cm off the water's side is no islet: proved, and refused
    expect(provedRings([outer, pocket(3.3).reverse()], REACH, [])).toBe('not clear (rings meet)');
  });

  it('relief-3000 (default configuration) seed 184: the river\'s fast ring refused `a pocket inside a pocket`, the kernel\'s ring commits — S1 no longer refuses the lawful river', () => {
    const { out, plat, course } = registeredS1(RELIEF_3000, 184);
    if (!out.ok) throw new Error(`${out.code} ${out.detail}`);
    // the composition traced the spike's river (its course as the runner's capture holds it: 1 672 points)
    expect(course.length).toBe(1672);
    const o: S1Output = out.value;
    expect(o.report.fallbacks).toEqual([{ id: 'water:river:0', why: 'offset: a pocket inside a pocket' }]);
    expect(o.report.dropped).toEqual([]);
    expect(o.water.bodies.map((b) => b.id)).toEqual(['water:river:0']);
    const { refs, live } = heldRefs(o.terrain.id, o);
    expect(hardFailures(plat, refs, live)).toEqual([]);
  }, 300_000);
});
