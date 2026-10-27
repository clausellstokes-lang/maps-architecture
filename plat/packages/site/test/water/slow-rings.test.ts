// C-0307 (refining C-0229 (2)): the kernel's rings — the slow path, §3.4's `buffer` of the course clipped to the arena
// less the earlier bodies (C-0229 (2)) — are cleaned and proved as the fast ring is before any batch (`provedRings`:
// `cleanRing` with the arena's edge and the earlier rings fixed, then `isSimple`, `clearRing`, `ringsApart`,
// `clearOf`). Uncleaned, the buffer's round joins leave clusters of vertices 17–25 cm apart (below minEdgeCm 25) within
// 17–26 cm of a neighbouring side (below attractCm 26); the insertion welds them, the shore role branches and §3.10's
// role consistency refuses the batch — on the river, the first body, the whole stage: a lawful SMALL_RIVER town with no
// water (0.5 % of seeds). Pinned here:
// * a hand-built shore ring carrying 17 cm hairpins is cleaned of them (every edge ≥ minEdgeCm, 60 cm clear) and commits
//   with every hard row green — role consistency among them;
// * the four class-A rings the kernel built (fixtures/q20-slow-rings.json, captured by the ruling N-56's probe on the
//   seeds named in C-0307 (4)): raw, each is refused at commit by role consistency, `(shore, water:river:0)
//   branches` — the hazard, reproduced (the control); proved, each commits with every hard row green;
// * a ring the clean cannot make clear is refused with its cause, never handed to the kernel; a body so refused is
//   dropped `refused` with the cause in `fallbacks`; the river so refused is the stage's refusal, the cause named;
// * the five class-A seeds and the x-06 checker's two (SMALL_RIVER, unplanted) commit through the registered S1's
//   composition — the base TerrainStrategy, the base RiverStrategy and `s1Stage`, under the runner's town key and the
//   base arena's index cell (C-0264; equal to the registered run on all seven, measured in the round's mirror) — run
//   here under a hand-built StageContext, never through @plat/layout's runner (§14; C-0123). Since Q45's prolongation
//   (hardening round S3) their fast rings stand; the test refuses each fast ring's insertion once (a planted kernel
//   refusal on the façade), so the stage's slow-only retry takes the kernel's proved ring, as it did before;
// * (notes 13, 14) the loop river's refusal names its fast ring's own cause; and a body refused on both polygons does
//   not stop the slow-only retry of a river whose fast ring the kernel refuses (the `fast` flag counts reaches).
import { readFileSync } from 'node:fs';
import { attachIndex, checkCI, createKernel, createPlat, createRng, err, rowKey, rowsOn, seedKey, STAGES, type Frame, type Hash128, type Kernel, type LatticePoint, type Ring } from '@plat/kernel';
import { mintTownRoot, type Cm, type GeomRef, type StageContext, type Terrain, type WaterBody } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { baseRivers } from '../../src/hydro/index.js';
import { baseTerrain, GROUND_KEY, TOWN_ROOT, type SiteEnv } from '../../src/terrain/index.js';
import { cleanRing, clearRing, isSimple } from '../../src/water/offset.js';
import { provedRings } from '../../src/water/polygons.js';
import { insideRings, leftFaces, outerRingBatch, reachOf, ringsDist2, runS1, s1Stage, waterFaces, waterPolygons, type S1Output } from '../../src/water/index.js';
import { everyL0EdgeShoreOrRing, frameOf, ground, hardFailures, heldRefs, pt, siteContext, SMALL_ARENA, waterBody } from './support.js';

/** A 1 000 m × 600 m arena (frame 500 m × 300 m, margin ½). */
const { FRAME, REACH, OPTS } = SMALL_ARENA;

/** A body on `[x, y]` course pairs, a width per point or one for all (support's `waterBody`). */
function body(id: string, kind: WaterBody['kind'], course: [number, number][], width: number | number[]): WaterBody {
  return waterBody(id, kind, course.map(([x, y]) => pt(x, y)), width);
}

/**
 * The hand-built shore of a 20 m river across the arena (y = ±1 000 cm, west edge to east edge), counter-clockwise, its
 * two banks bent gently (a sagging arc, as the buffer's joins leave them) and carrying every `step` cm a hairpin: three
 * vertices 17 cm apart, the middle one 17 cm off the next one's side — the q20 class-A rings' shape (minEdgeCm 25,
 * attractCm 26).
 */
function hairpinRing(step = 2200): LatticePoint[] {
  const out: LatticePoint[] = [];
  const x0 = -REACH.x;
  const x1 = REACH.x;
  const sag = (x: number): number => Math.round(((x * x) / (x1 * x1)) * 400);
  const side = (y: number, dir: 1 | -1): void => {
    for (let x = dir > 0 ? x0 : x1; dir > 0 ? x < x1 : x > x0; x += dir * step) {
      out.push(pt(x, y + sag(x)));
      if ((dir > 0 && x + step >= x1) || (dir < 0 && x - step <= x0) || x === (dir > 0 ? x0 : x1)) continue;
      // the hairpin: 17 cm on, then 17 cm on again with a 4 cm kink
      out.push(pt(x + dir * 17, y + sag(x) + 4));
      out.push(pt(x + dir * 34, y + sag(x)));
    }
  };
  side(-1000, 1);
  side(1000, -1);
  return out;
}

/** The ring as the batch's one body part: the river's seeds every 50 m on y = sag. */
function reachOfRing(rings: Ring[]): { body: WaterBody; parts: { rings: Ring[]; seeds: LatticePoint[] }[] } {
  const b = body('water:river:0', 'river', [
    [-REACH.x, 0],
    [REACH.x, 0],
  ], 2000);
  const seeds: LatticePoint[] = [];
  for (let x = -REACH.x + 5000; x < REACH.x; x += 5000) {
    const q = pt(x, Math.round(((x * x) / (REACH.x * REACH.x)) * 400));
    if (insideRings(rings, q) && ringsDist2(rings, q) >= 100 * 100) seeds.push(q);
  }
  return { body: b, parts: [{ rings, seeds }] };
}

describe('provedRings: the kernel\'s ring cleaned and proved as the fast ring is (N-56 (1))', () => {
  it('a hand-built shore with 17 cm hairpins: raw it is not clear (edges under minEdgeCm, vertices within attractCm of a side); proved, every hairpin gone, simple and 60 cm clear', () => {
    const raw = hairpinRing();
    expect(isSimple(raw)).toBe(true);
    expect(clearRing(raw)).toBe(false);
    const p = provedRings([raw], REACH, []);
    expect(typeof p).not.toBe('string');
    if (typeof p === 'string') return;
    expect(p).toHaveLength(1);
    const ring = p[0];
    expect(isSimple(ring) && clearRing(ring)).toBe(true);
    // no two consecutive vertices closer than minEdgeCm (25 cm): every hairpin removed
    for (let i = 0; i < ring.length; i += 1) {
      const a = ring[i];
      const b = ring[(i + 1) % ring.length];
      expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeGreaterThanOrEqual(25);
    }
    // the four corners on the arena's edge stay where they were (fixed): the shared stretches of the ring need them
    for (const c of raw.filter((q) => Math.abs(q.x) === REACH.x)) expect(ring.some((q) => q.x === c.x && q.y === c.y)).toBe(true);
    expect(ring.length).toBeLessThan(raw.length / 2);
  });

  it('the proved ring commits as the river\'s shore: one water face, every L0 edge a shore or the ring, every hard row of the CI sweep green (role consistency among them)', () => {
    const p = provedRings([hairpinRing()], REACH, []);
    if (typeof p === 'string') throw new Error(p);
    const { plat, kernel } = ground(FRAME);
    expect(outerRingBatch(kernel, 'terrain:ground', REACH, OPTS).ok).toBe(true);
    const reach = reachOfRing(p);
    expect(reach.parts[0].seeds.length).toBeGreaterThan(10);
    const r = waterFaces([reach], kernel, { ...OPTS, sites: [], bridgeIds: [] });
    if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
    const refs: GeomRef[] = [{ role: 'margin', entity: 'terrain:ground' }, reach.body.face, reach.body.shore, ...r.value.land.map((c) => c.face)];
    const live = new Set(['terrain:ground', reach.body.id, ...r.value.land.map((c) => c.id)]);
    expect(hardFailures(plat, refs, live)).toEqual([]);
    expect(checkCI(plat, { refs, isLive: (id) => live.has(id) }).some((x) => /role/.test(x.name) && x.holds)).toBe(true);
    const res = kernel.resolve(reach.body.face, GROUND_KEY);
    expect(res.view === 'faces' && res.faces.length).toBe(1);
    everyL0EdgeShoreOrRing(plat);
  });

  it('a ring the clean cannot make clear is refused with its cause: two rings 50 cm apart (rings meet), a ring crossing an earlier body\'s ring (meets an earlier body), a ring folding within 40 cm of itself (near-touch), a figure-eight (not simple)', () => {
    const square = (x: number, y: number, s: number): LatticePoint[] => [pt(x, y), pt(x + s, y), pt(x + s, y + s), pt(x, y + s)];
    // an outer ring and a hole 50 cm inside it along one side
    const hole = square(-950, -950, 1900).reverse();
    expect(provedRings([square(-1000, -1000, 4000), hole], REACH, [])).toBe('not clear (rings meet)');
    // a ring crossing an earlier body's ring, never along it (the difference would have cut it there)
    expect(provedRings([square(0, 0, 2000)], REACH, [square(1000, 500, 2000)])).toBe('not clear (meets an earlier body)');
    // the same ring meeting the earlier one along a shared side passes: a shared stretch is no meeting
    expect(typeof provedRings([square(0, 0, 2000)], REACH, [square(2000, 0, 2000)])).not.toBe('string');
    // a U whose two arms run 40 cm apart for 20 m: no vertex the clean may drop, the arms too close
    const u = [pt(0, 0), pt(3000, 0), pt(3000, 2040), pt(1000, 2040), pt(1000, 2000), pt(2960, 2000), pt(2960, 40), pt(0, 40)];
    expect(isSimple(u)).toBe(true);
    expect(provedRings([u], REACH, [])).toBe('not clear (near-touch)');
    // a figure-eight: its two lobes cross at one point, every vertex metres from every side not its own — clear by the
    // vertices, not simple (only isSimple sees the crossing)
    const eight = [pt(0, 0), pt(6000, 3000), pt(8000, 1500), pt(6000, 0), pt(0, 3000)];
    expect(isSimple(eight)).toBe(false);
    expect(clearRing(eight)).toBe(true);
    expect(provedRings([eight], REACH, [])).toBe('not clear (not simple)');
    // a ring the clean empties (a sliver of three collinear-ish points) is dropped, never refused
    expect(provedRings([[pt(0, 0), pt(500, 1), pt(1000, 0), pt(500, 0)]], REACH, [])).toEqual([]);
  });

  it('a ring the slow path keeps is the clean of the kernel\'s: the cleaned ring with the arena\'s edge and the earlier rings fixed, nothing else changed', () => {
    const raw = hairpinRing();
    const fixed = (q: { x: number; y: number }): boolean => Math.abs(q.x) >= REACH.x || Math.abs(q.y) >= REACH.y;
    expect(provedRings([raw], REACH, [])).toEqual([cleanRing(raw, fixed)]);
  });

  it('the fixed vertices stay: a vertex on the arena\'s edge, or on an earlier body\'s ring, 29 cm after the vertex before it is kept (the clean drops any other such vertex), so the shared stretch keeps its end', () => {
    const R = REACH.x;
    // on the arena's edge: c = (R, −1 000) follows b by 29 cm
    const a = pt(-5000, -1000);
    const ring = [a, pt(R - 15, -1025), pt(R, -1000), pt(R, 1000), pt(-5000, 1000)];
    expect(provedRings([ring], REACH, [])).toEqual([ring]);
    // the same off the edge, unfixed: c is dropped
    const off = [a, pt(R - 1015, -1025), pt(R - 1000, -1000), pt(R - 1000, 1000), pt(-5000, 1000)];
    expect(provedRings([off], REACH, [])).toEqual([[off[0], off[1], off[3], off[4]]]);
    // on an earlier body's ring (its side x = 0): c = (0, −1 000) kept
    const earlier = [pt(0, -3000), pt(3000, -3000), pt(3000, 3000), pt(0, 3000)];
    const beside = [pt(-5000, -1000), pt(-15, -1025), pt(0, -1000), pt(0, 1000), pt(-5000, 1000)];
    expect(provedRings([beside], REACH, [earlier])).toEqual([beside]);
  });
});

/** The four class-A rings (see the header): each seed's frame and the kernel's raw ring. */
const Q20 = (JSON.parse(readFileSync(new URL('./fixtures/q20-slow-rings.json', import.meta.url), 'utf8')) as { rings: { seed: number; frame: Frame; ring: [number, number][] }[] }).rings;

/** One ring set as the river's one part through the ring's and the water's batches; the CI sweep's failing hard rows, or the refusal. */
function commitRings(frame: Frame, rings: Ring[]): string[] | string {
  const reach = reachOf(frame);
  const seeds: LatticePoint[] = [];
  for (let x = -reach.x; x < reach.x; x += 2000) for (let y = -reach.y; y < reach.y; y += 2000) {
    const q = pt(x, y);
    if (insideRings(rings, q) && ringsDist2(rings, q) >= 100 * 100) seeds.push(q);
  }
  const { plat, kernel } = ground(frame);
  if (!outerRingBatch(kernel, 'terrain:ground', reach, OPTS).ok) return 'the outer ring';
  const b = body('water:river:0', 'river', [[0, 0], [1000, 0]], 2000);
  const r = waterFaces([{ body: b, parts: [{ rings, seeds }] }], kernel, { ...OPTS, sites: [], bridgeIds: [] });
  if (!r.ok) return `${r.code} ${r.detail}`;
  const refs: GeomRef[] = [{ role: 'margin', entity: 'terrain:ground' }, b.face, b.shore, ...r.value.land.map((c) => c.face)];
  return hardFailures(plat, refs, new Set(['terrain:ground', b.id, ...r.value.land.map((c) => c.id)]));
}

describe('Q20 class A\'s own rings: the kernel\'s slow rings S1 handed to the insertion uncleaned (N-56 (1))', () => {
  it.each(Q20.map((q) => [q.seed, q] as const))('seed %i: raw, the batch is refused by role consistency (the shore branches); proved, it commits with every hard row green', (_seed, q) => {
    const raw: LatticePoint[] = q.ring.map(([x, y]) => pt(x, y));
    expect(isSimple(raw)).toBe(true);
    expect(clearRing(raw)).toBe(false);
    expect(commitRings(q.frame, [raw])).toMatch(/^E_INVARIANT .*\(shore, water:river:0\) branches/);
    const p = provedRings([raw], reachOf(q.frame), []);
    if (typeof p === 'string') throw new Error(p);
    expect(p[0].length).toBeLessThan(raw.length);
    expect(commitRings(q.frame, p)).toEqual([]);
  });
});

describe('waterPolygons and S1: a body whose kernel ring stays unclear is refused, its cause named (N-56 (1))', () => {
  // A river 50 cm wide that loops round a 20 m square and crosses its own course: on both rings — the fast ring's and
  // the kernel's (the buffer's union) — the two banks run 50 cm apart, under the 60 cm clearance, so neither is clear.
  const loop: [number, number][] = [
    [-3000, 0],
    [1000, 0],
    [1000, 2000],
    [-1000, 2000],
    [-1000, -2000],
  ];

  it('waterPolygons: the loop river is dropped `refused`, the fast ring\'s cause and the kernel ring\'s side by side in `fallbacks`', () => {
    const r = waterPolygons([body('water:river:0', 'river', loop, 50)], REACH);
    if (!r.ok) throw new Error(r.detail);
    expect(r.value.reaches).toEqual([]);
    expect(r.value.dropped).toEqual([{ id: 'water:river:0', reason: 'refused' }]);
    expect(r.value.fallbacks).toHaveLength(1);
    expect(r.value.fallbacks[0].why).toMatch(/^hole outside; the kernel's ring: not clear \(/);
  });

  it('S1: the river so refused is the stage\'s refusal E_INVARIANT, the fast ring\'s cause and the kernel ring\'s named, no further rung; nothing of the water written', () => {
    const { plat, kernel } = ground(FRAME);
    const terrain = { id: 'terrain:ground' } as unknown as Terrain;
    const r = runS1({ terrain, water: { bodies: [body('water:river:0', 'river', loop, 50)], bridges: [] }, kernel }, siteContext(1, 'CITY'));
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toMatch(/^S1 water: the river's ring was refused on the kernel's polygons \(the fast ring: hole outside\); no further rung — the kernel's ring not clear \(/);
    // the outer ring's batch alone committed (the runner restores it, C-0295); no shore anywhere
    expect(plat.version).toBe(1);
    for (const h of leftFaces(plat).keys()) expect(rowsOn(plat, 'edge', h).map((q) => rowKey(plat, q).role)).toEqual(['margin']);
  });
});

/** The registered S1's composition on SMALL_RIVER (EP-01's small river frame: CITY, 30 ha, the river from the west, no mouth). */
const SMALL_RIVER = { size: { rung: 'CITY', aspect: 1, areaHa: 30 }, site: { relief: 'plain' as const, river: { inflowBearingCdeg: 27_000, mouth: 'none' as const } } };

/** The façade with its first insertion of the river's shore refused (a planted kernel refusal: the batch writes nothing). */
function refusingFirstRiverShore(kernel: Kernel): Kernel {
  let refused = false;
  const geom = {
    ...kernel.geom,
    insertChain: ((o, pts, rows, cls, opts) => {
      if (!refused && rows.some((r) => r.role === 'shore' && r.entity === 'water:river:0')) {
        refused = true;
        return err('E_INVARIANT', 'role consistency: (shore, water:river:0) branches (planted)');
      }
      return kernel.geom.insertChain(o, pts, rows, cls, opts);
    }) as Kernel['geom']['insertChain'],
  };
  return { ...kernel, geom };
}

function registeredS1(seed: number): { out: ReturnType<typeof runS1>; plat: ReturnType<typeof createPlat> } {
  // the runner's StageContext for S1 (M0-x-02): the town root's key minted from the seed, one Rng per stage run
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
  const terrain = baseTerrain.terrain({ size: SMALL_RIVER.size, site: SMALL_RIVER.site } as never, ctx, null as never);
  if (!terrain.ok) throw new Error(terrain.detail);
  const water = baseRivers.rivers({ size: SMALL_RIVER.size, site: { river: SMALL_RIVER.site.river } } as never, terrain.value, { bodies: [], bridges: [] }, ctx, null as never);
  if (!water.ok) throw new Error(water.detail);
  // the base arena (layout's baseArena): the frame, one index cell of 50 m
  const plat = createPlat(GROUND_KEY, frameOf(SMALL_RIVER.size as never));
  attachIndex(plat, { gridCellCm: 5000 });
  const kernel = refusingFirstRiverShore(createKernel(new Map([[GROUND_KEY, plat]])));
  const stage = s1Stage();
  return { out: stage.run(stage.inputsOf({ terrain: terrain.value, water: water.value, mouth: 'none', kernel } as never, { kind: 'all' }), ctx), plat };
}

describe('Q20 class A: the lawful SMALL_RIVER river commits on the seeds S1 refused (N-56 (1))', () => {
  // seeds 2651453823, 1314904401, 186973829, 1117762784, 4230160953 (the ruling's, EP-01/S1/self-touching's family
  // unplanted) and 676291635, 1595424233 (the x-06 checker's river × frame seeds): on the kernel's ring uncleaned each
  // is refused E_INVARIANT "(shore, water:river:0) branches"; each takes the slow path — before Q45 the fast ring was
  // refused 'near the edge'; now its insertion is refused once (planted), so the stage retries on the kernel's rings
  it.each([2651453823, 1314904401, 186973829, 1117762784, 4230160953, 676291635, 1595424233])('seed %i: S1 commits the river on the kernel\'s proved ring, every hard row green, its shore clear', (seed) => {
    const { out, plat } = registeredS1(seed);
    if (!out.ok) throw new Error(`${out.code} ${out.detail}`);
    const o: S1Output = out.value;
    expect(o.water.bodies.map((b) => b.id)).toEqual(['water:river:0']);
    expect(o.report.fallbacks).toEqual([{ id: 'water:river:0', why: 'slow only' }]);
    expect(o.report.retried).toBe(true);
    expect(o.report.dropped).toEqual([]);
    expect(o.water.bridges.length).toBeGreaterThan(0);
    const { refs, live } = heldRefs(o.terrain.id, o);
    expect(hardFailures(plat, refs, live)).toEqual([]);
  });
});

/** A terrain record over the small arena with no drainage (every D8 code 8: no step), so S1 writes no outfall. */
function dryTerrain(): Terrain {
  const cols = 40;
  const rows = 24;
  return {
    id: 'terrain:ground',
    key: { layer: 'ground', part: 0 },
    cellCm: 2500 as Cm,
    cols: 1,
    rows: 1,
    originX: -50_000 as Cm,
    originY: -30_000 as Cm,
    datumCm: 0 as Cm,
    heightCm: new Int32Array(1),
    reliefLimitCm: 1_000_000 as Cm,
    hydro: { cellCm: 2500 as Cm, cols, rows, originX: -50_000 as Cm, originY: -30_000 as Cm },
    flowDir: new Uint8Array(cols * rows).fill(8),
    flatRank: new Uint32Array(cols * rows),
    flowAccum: new Uint32Array(cols * rows),
    outfalls: [],
    seaLevelCm: 0 as Cm,
    wind: { bearingCdeg: 0, strength: 0 },
    features: [],
    lifecycle: { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } },
  };
}

describe('note 14: a body refused on both polygons does not stop the slow-only retry (the `fast` flag counts reaches)', () => {
  it('a river across the arena (its fast ring\'s insertion refused once) and a looped tributary refused on both polygons: the river commits on the retry, the tributary reported `refused`', () => {
    const { plat, kernel } = ground(FRAME);
    const loopTrib: [number, number][] = [
      [-3000, 15_000],
      [1000, 15_000],
      [1000, 17_000],
      [-1000, 17_000],
      [-1000, 13_000],
    ];
    const water = { bodies: [body('water:river:0', 'river', [[-REACH.x, 0], [-20_000, 0], [20_000, 0], [REACH.x, 0]], 2000), body('water:tributary:0', 'tributary', loopTrib, 50)], bridges: [] };
    const r = runS1({ terrain: dryTerrain(), water, kernel: refusingFirstRiverShore(kernel) }, siteContext(1, 'CITY'));
    if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
    expect(r.value.report.retried).toBe(true);
    expect(r.value.report.dropped).toEqual([{ id: 'water:tributary:0', reason: 'refused' }]);
    expect(r.value.water.bodies.map((b) => b.id)).toEqual(['water:river:0']);
    expect(plat.version).toBe(2);
  });
});
