// S6 as a Stage on the district fixture (M0-e-04; §4.5; §4.1's S6 row; §5.3's containment row; §6.3; §9.1; C-0046,
// C-0085): containment 100 % by construction (every land face inside the perimeter a district's, every one outside the
// hinterland's), the edge test (no district crosses an arterial ≥ primary, the wall or a reservation boundary), the
// patch test on every patch the grower held, the merge rule's records, the minimal seams and their `district_bound`
// rows (laid over the edges already there: no geometry added), typing on the stage, the quarter tree, the District
// records, F-WORK's work_cut, a single coarse face, determinism, and the Stage object itself. The identity laws S6
// locks in — each grower's seed lineage (its feature's address; a remainder or leftover seed's face after Lloyd),
// each district's creation index (its seed's order) and typing's `district.type` stream — are held by keys the test
// derives from the input and the committed arena, never read back from S6's own records (C-0245 (5), (12), (17)) —
// the run units' keys (the hinterland, the seams' run, the quarter nodes' run) among them. S6's hand-over is held from
// its output: the band's top to the grower, each district's family to the quarter tree, the run's `s6` table through
// its tables, the default arena key; and an outside region cut off from the frame by an arterial ring is the
// hinterland's.
import { CONCERNS, createRng, entityKey, faceKey, insertChain, seedKey, STAGES, type KernelTx, type LatticePoint, type LineageHash } from '@plat/kernel';
import { addressOf, lineageHash, TOWN_ROOT, type District, type Id } from '@plat/model';
import { tableView } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { boundaryLoops, faceGraph, faceLineage, runS6, s6Stage, s6Table, settlementPerimeter, textLineage, typingCells, type S6Input, type S6Output } from '../../src/index.js';
import { bySeed, edgesL1, GROUND, gridArena, hullArea, insidePoly, layChain, liveL1, ownerAt, ownerOfL1, P, s6Run, s6With, tableWith, town, townS6, wayRecord, withS6, type Town } from './support.js';

const run = bySeed((seed) => townS6(seed));

const SEEDS = [4, 11];
/** A town whose merge rule removes districts ahead of surviving ones (5 merges, 7 leftover seeds): a district's seed order is not its place among the survivors. */
const MERGED = 121;

/** The ground arena's L1 face graph after S6 (the district_bound runs add no geometry: the faces S6 grew over). */
function graphOf(t: Town & { out: S6Output }) {
  return faceGraph(t.plat, { ways: new Map(t.ways.map((w) => [w.id, w.class])), minBarrierClass: 'primary', perimeter: t.out.hinterland, water: new Set() });
}

/**
 * Each grower's seed lineage as §4.5 keys it, derived from the input and the committed arena: a sited feature's —
 * the features in input order less those reported dropped — is the H64 of its address; a remainder or leftover seed's
 * is its seed face's canonical key (the face it holds after Lloyd, read from the arena through the kernel's faceKey).
 */
function seedLineages(t: Town & { out: S6Output }): Map<number, LineageHash> {
  const g = graphOf(t);
  const dropped = new Set(t.out.report.seedsDropped);
  const featureSeeds = t.input.features.filter((f) => !dropped.has(f.id));
  const out = new Map<number, LineageHash>();
  let remainders = 0;
  for (const d of t.out.grow.grown) {
    const sd = d.seed;
    expect(d.faces[0]).toBe(sd.face);
    if (sd.order < featureSeeds.length) {
      const f = featureSeeds[sd.order];
      expect([sd.kind, sd.feature]).toEqual([f.kind, f.id]);
      out.set(sd.order, textLineage(f.id));
    } else {
      expect(['remainder', 'leftover']).toContain(sd.kind);
      const P0 = t.plat;
      const [a, b] = faceKey(P0, 1, g.faces[sd.face].face);
      out.set(sd.order, faceLineage([P0.vertices.x[a], P0.vertices.y[a], P0.vertices.x[b], P0.vertices.y[b]]));
      remainders += 1;
    }
    expect(sd.lineage).toEqual(out.get(sd.order));
  }
  expect(remainders).toBeGreaterThan(3);
  return out;
}

/** A district's lineage under the town (§6.3: S6 districts keyed by the town, in seed order). */
function districtLineage(index: number): LineageHash {
  return lineageHash({ arena: GROUND, unit: lineageHash(TOWN_ROOT), stage: STAGES.S6, epoch: 0, index, reroll: 0 });
}

/**
 * Each district's seed order, from the input and the arena: the seed orders whose seed face the district owns in the
 * committed arena (its own, and those of the districts merged into it), and among them the one whose address is its
 * id — exactly one; a district named by a feature takes that feature's place among the features seeded.
 */
function districtOrders(t: Town & { out: S6Output }): Map<Id, number> {
  const g = graphOf(t);
  const dropped = new Set(t.out.report.seedsDropped);
  const featureSeeds = t.input.features.filter((f) => !dropped.has(f.id));
  const held = new Map<Id, number[]>();
  for (const d of t.out.grow.grown) {
    const owner = ownerOfL1(t.plat, g.faces[d.seed.face].face);
    if (owner !== null) held.set(owner, [...(held.get(owner) ?? []), d.seed.order]);
  }
  const out = new Map<Id, number>();
  for (const d of t.out.districts) {
    const orders = held.get(d.id) ?? [];
    const match = orders.filter((k) => addressOf('district', districtLineage(k)) === d.id);
    expect(match.length).toBe(1);
    if (d.namingFeature !== undefined) expect(match[0]).toBe(featureSeeds.findIndex((f) => f.id === d.namingFeature));
    out.set(d.id, match[0]);
  }
  return out;
}
const ARTERIAL = new Set(['through', 'primary']);

/** Sample points every `stepCm` over the frame: inside the perimeter or outside it. */
function samples(t: Town & { out: S6Output }, stepCm: number): { q: LatticePoint; inside: boolean }[] {
  const per = t.out.perimeter;
  const out: { q: LatticePoint; inside: boolean }[] = [];
  const half = t.frame[1].x;
  for (let x = -half + stepCm / 2; x < half; x += stepCm) {
    for (let y = -half + stepCm / 2; y < half; y += stepCm) {
      const q = P(x, y);
      out.push({ q, inside: insidePoly(per, q) });
    }
  }
  return out;
}

describe('containment 100 % by construction (§4.5; §5.3)', () => {
  it('every land point inside the perimeter lies on a district’s face, every point outside on the hinterland’s', { timeout: 120_000 }, () => {
    for (const seed of SEEDS) {
      const t = run(seed);
      const ids = new Set(t.out.districts.map((d) => d.id));
      let inside = 0;
      for (const { q, inside: isIn } of samples(t, 2500)) {
        const o = ownerAt(t, q);
        if (o === undefined) continue;
        if (isIn) {
          if (o === 'plaza:0') continue;
          expect(o !== null && ids.has(o)).toBe(true);
          inside += 1;
        } else expect(o).toBe(t.out.hinterland);
      }
      expect(inside).toBeGreaterThan(2000);
      expect(t.out.report.unowned).toBe(0);
    }
  });

  it('the perimeter is laid as one closed L1 chain carrying district_bound on the hinterland, 50 m out from the boundary', { timeout: 120_000 }, () => {
    const t = run(SEEDS[0]);
    const per = edgesL1(t.plat).filter((e) => e.rows.some((r) => r.role === 'district_bound' && r.entity === t.out.hinterland));
    expect(per.length).toBeGreaterThan(50);
    let len = 0;
    for (const e of per) len += Math.hypot(e.b.x - e.a.x, e.b.y - e.a.y);
    let ringLen = 0;
    const ring = t.out.perimeter;
    for (let i = 0; i < ring.length; i += 1) ringLen += Math.hypot(ring[(i + 1) % ring.length].x - ring[i].x, ring[(i + 1) % ring.length].y - ring[i].y);
    expect(Math.abs(len - ringLen) / ringLen).toBeLessThan(1e-3);
    // every face across it: a district's inside, the hinterland's outside
    for (const e of per) {
      const owners = [ownerOfL1(t.plat, e.left), ownerOfL1(t.plat, e.right)];
      expect(owners).toContain(t.out.hinterland);
    }
  });
});

describe('the edge test and the patch test (§4.5)', () => {
  it('no district holds both sides of an arterial ≥ primary, a wall, a reservation boundary, water or the perimeter', { timeout: 120_000 }, () => {
    for (const seed of SEEDS) {
      const t = run(seed);
      const classOf = new Map(t.ways.map((w) => [w.id, w.class]));
      const ids = new Set(t.out.districts.map((d) => d.id));
      let inner = 0;
      for (const e of edgesL1(t.plat)) {
        const l = ownerOfL1(t.plat, e.left);
        if (l === null || l !== ownerOfL1(t.plat, e.right) || !ids.has(l)) continue;
        inner += 1;
        for (const r of e.rows) {
          expect(r.role === 'way' && ARTERIAL.has(classOf.get(r.entity) as string)).toBe(false);
          expect(['wall', 'wall_gate', 'setback', 'reserved', 'shore', 'bank', 'border', 'margin']).not.toContain(r.role);
          expect(r.role === 'district_bound' && r.entity === t.out.hinterland).toBe(false);
        }
      }
      expect(inner).toBeGreaterThan(50);
    }
  });

  it('every patch the grower held passed the patch test: area within the band’s top, compactness ≥ 0.5, no hole', { timeout: 120_000 }, () => {
    for (const seed of SEEDS) {
      const t = townS6(seed);
      // Replay the turns on a graph of the same arena (the faces S6 committed are the coarse faces it grew over).
      const g = faceGraph(t.plat, { ways: new Map(t.ways.map((w) => [w.id, w.class])), minBarrierClass: 'primary', perimeter: t.out.hinterland, water: new Set() });
      const top = t.out.report.bandHa[1] * 1e8;
      const held = new Map<number, number[]>();
      for (const d of t.out.grow.grown) held.set(d.seed.order, [d.seed.face]);
      let checked = 0;
      for (const l of t.out.grow.log) {
        if (l.what !== 'absorb') continue;
        const h = held.get(l.seed) as number[];
        h.push(l.face as number);
        let area = 0;
        const pts: { x: number; y: number }[] = [];
        for (const i of h) {
          area += g.faces[i].areaCm2;
          for (const e of g.rings[i][0]) pts.push({ x: t.plat.vertices.x[t.plat.halfEdges.origin[e]], y: t.plat.vertices.y[t.plat.halfEdges.origin[e]] });
        }
        expect(area).toBeLessThanOrEqual(top);
        expect(area / hullArea(pts)).toBeGreaterThanOrEqual(0.5 - 1e-12);
        expect(boundaryLoops(g, h, (i) => h.includes(i))).toBe(1);
        checked += 1;
      }
      expect(checked).toBeGreaterThan(50);
    }
  });

  it('N_d seeds in all; each turn’s skip is district.seed keyed by (the grower’s seed lineage, its turn number)', { timeout: 120_000 }, () => {
    let skips = 0;
    let takes = 0;
    for (const seed of [...SEEDS, MERGED]) {
      const t = run(seed);
      expect(t.out.report.seeds).toBe(t.out.report.nd);
      const rng = createRng();
      const bySeed = new Map(t.out.grow.grown.map((d) => [d.seed.order, d.seed]));
      // the lineage half of the key, from the input and the arena alone (never sd.lineage)
      const lineageOf = seedLineages(t);
      for (const l of t.out.grow.log) {
        if (l.what === 'done') continue;
        const sd = bySeed.get(l.seed);
        if (sd === undefined) throw new Error('no seed');
        const unit = lineageOf.get(l.seed) as LineageHash;
        const key = entityKey(seedKey(seed), lineageHash({ arena: GROUND, unit, stage: STAGES.S6, epoch: 0, index: l.turn, reroll: 0 }), GROUND);
        const skip = !rng.stream(key, STAGES.S6, CONCERNS['district.seed'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 }).bool(sd.rate);
        expect(skip).toBe(l.what === 'skip');
        if (sd.rate < 1) {
          if (skip) skips += 1;
          else takes += 1;
        }
      }
    }
    // the slow (gate) growers both skip and take: the check has teeth on both sides
    expect(skips).toBeGreaterThan(30);
    expect(takes).toBeGreaterThan(6);
  });

  it('the merge rule: every merged district was below the floor and of rate 1; none of rate < 1 merged away', { timeout: 120_000 }, () => {
    for (const seed of SEEDS) {
      const t = run(seed);
      const floor = t.out.report.bandHa[0] * 1e8;
      for (const m of t.out.grow.merges) {
        const d = t.out.grow.grown[m.from];
        expect(m.areaCm2).toBeLessThan(floor);
        expect(d.seed.rate).toBe(1);
        expect(t.out.grow.grown[m.into].mergedInto).toBe(-1);
      }
      for (const d of t.out.grow.grown) if (d.seed.rate < 1) expect(d.mergedInto).toBe(-1);
    }
  });
});

describe('the identity laws S6 locks in, from keys the test derives (C-0245 (5), (12), (17))', () => {
  it('every grower’s seed lineage: a feature’s address hashed; a remainder or leftover seed’s face after Lloyd, keyed from the arena', { timeout: 120_000 }, () => {
    for (const seed of [SEEDS[0], MERGED]) {
      const t = run(seed);
      const lineages = seedLineages(t);
      expect(lineages.size).toBe(t.out.grow.grown.length);
      // no two growers share a lineage: each keys its own turns
      expect(new Set([...lineages.values()].map((l) => JSON.stringify(l))).size).toBe(lineages.size);
    }
  });

  it('every district’s id and lineage: (the town, S6, its seed’s order) — a merge ahead of it shifts no index', { timeout: 120_000 }, () => {
    let shifted = 0;
    for (const seed of [SEEDS[0], MERGED]) {
      const t = run(seed);
      const orders = districtOrders(t);
      expect(orders.size).toBe(t.out.districts.length);
      t.out.districts.forEach((d, place) => {
        const k = orders.get(d.id) as number;
        expect(d.id).toBe(addressOf('district', districtLineage(k)));
        expect(t.out.lineages.get(d.id)).toEqual(districtLineage(k));
        if (k !== place) shifted += 1;
      });
    }
    // the case has teeth: some district's seed order is not its place among the survivors
    expect(shifted).toBeGreaterThan(0);
  });

  it('typing’s scores replay from a district.type stream on each district’s lineage (one uniform per kind, in table order)', { timeout: 120_000 }, () => {
    const cells = typingCells(s6Table());
    for (const seed of [SEEDS[0], MERGED]) {
      const t = run(seed);
      const orders = districtOrders(t);
      const g = graphOf(t);
      // each district's land, from the committed arena's owners
      const area = new Map<Id, number>();
      for (const f of g.faces) if (f.owner !== null && orders.has(f.owner)) area.set(f.owner, (area.get(f.owner) ?? 0) + f.areaCm2);
      let land = 0;
      for (const a of area.values()) land += a;
      const remaining = new Map(cells.kinds.map((k) => [k.kind, k.share * land]));
      const typed = [...t.out.typing].sort((a, b) => (area.get(b.district) as number) - (area.get(a.district) as number) || (a.district < b.district ? -1 : a.district > b.district ? 1 : 0));
      const rng = createRng();
      let replayed = 0;
      for (const x of typed) {
        const k = orders.get(x.district) as number;
        const s = rng.stream(entityKey(seedKey(seed), districtLineage(k), GROUND), STAGES.S6, CONCERNS['district.type'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
        cells.kinds.forEach((kind, ki) => {
          const u = s.float01();
          const [name, score] = x.scores[ki];
          expect(name).toBe(kind.kind);
          if (score === null) {
            expect(kind.relations.some((r) => r.mode === 'require')).toBe(true);
            return;
          }
          // score − the random term − the demand term is the weight of the relation rows that hold: every require
          // row's and some of the prefer rows'
          const rest = score - cells.randomWeight * u - cells.demandWeight * (Math.max(0, remaining.get(kind.kind) as number) / land);
          let sums = [kind.relations.filter((r) => r.mode === 'require').reduce((a, r) => a + r.weight, 0)];
          for (const r of kind.relations) if (r.mode === 'prefer') sums = [...sums, ...sums.map((v) => v + r.weight)];
          expect(sums.some((v) => Math.abs(rest - v) < 1e-9)).toBe(true);
          replayed += 1;
        });
        remaining.set(x.kind, (remaining.get(x.kind) as number) - (area.get(x.district) as number));
      }
      expect(replayed).toBeGreaterThan(3 * t.out.districts.length);
    }
  });
});

describe('the minimal seams (C-0046) and their district_bound rows', () => {
  it('every edge between two districts, or a district and the hinterland, carries the district_bound row of the one seam naming both', { timeout: 120_000 }, () => {
    for (const seed of SEEDS) {
      const t = run(seed);
      const ids = new Set(t.out.districts.map((d) => d.id));
      const seamById = new Map(t.out.seams.map((s) => [s.id, s]));
      let shared = 0;
      for (const e of edgesL1(t.plat)) {
        const l = ownerOfL1(t.plat, e.left);
        const r = ownerOfL1(t.plat, e.right);
        if (l === r || !((l !== null && ids.has(l)) || (r !== null && ids.has(r)))) continue;
        const bound = e.rows.filter((x) => x.role === 'district_bound' && seamById.has(x.entity));
        expect(bound.length).toBe(1);
        const seam = seamById.get(bound[0].entity);
        const sides = [l, r].map((x) => (x !== null && (ids.has(x) || x === t.out.hinterland) ? x : null));
        const want = sides.filter((x) => x !== null).sort();
        expect(seam?.sides.filter((x) => x !== null).slice().sort()).toEqual(want);
        if (want.length === 2) shared += 1;
        // the seam's edges name the chains the edge lies on
        const chains = new Set(seam?.edges.map((x) => `${x.chain.role}|${x.chain.entity}`));
        expect(e.rows.some((x) => chains.has(`${x.role}|${x.entity}`))).toBe(true);
      }
      expect(shared).toBeGreaterThan(30);
      // every district lists exactly the seams that name it
      for (const d of t.out.districts) {
        const named = t.out.seams.filter((s) => s.sides.includes(d.id)).map((s) => s.id);
        expect(d.seams.slice().sort()).toEqual(named.sort());
      }
      for (const s of t.out.seams) {
        expect(s.portals).toEqual([]);
        expect(s.edges.length).toBeGreaterThan(0);
      }
    }
  });

  it('the district_bound runs add no geometry: the faces after S6 are the faces after the perimeter alone', { timeout: 120_000 }, () => {
    const seed = SEEDS[0];
    const t = run(seed);
    const fresh = town(seed);
    const per = settlementPerimeter(fresh.boundary, fresh.k, { frame: fresh.frame });
    expect(per.ok).toBe(true);
    if (!per.ok) return;
    const spec: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S6 }, stage: STAGES.S6, rederivesFrom: STAGES.S6, workLimit: 1e9 };
    const r = fresh.k.tx(spec, (o) => insertChain(o, per.value, [{ role: 'district_bound', entity: t.out.hinterland }], 'mandatory', { closed: true }));
    expect(r.ok).toBe(true);
    expect(liveL1(t.plat)).toBe(liveL1(fresh.plat));
  });
});

describe('typing, quarters and the District records on the stage', () => {
  it('one market district, seeded at the plaza; gate wards exactly at the gates; every kind the table’s', { timeout: 120_000 }, () => {
    for (const seed of SEEDS) {
      const t = run(seed);
      const market = t.out.districts.filter((d) => d.kind === 'market');
      expect(market.map((d) => d.namingFeature)).toEqual(['plaza:0']);
      const gateIds = new Set(t.gates.map((g) => g.id));
      for (const d of t.out.districts) expect(d.kind === 'gate').toBe(d.namingFeature !== undefined && gateIds.has(d.namingFeature));
      for (const x of t.out.typing) expect(x.mix[0][1]).toBeCloseTo(0.8, 12);
    }
  });

  it('the quarter tree: one root, the cut at min(N_q, L), each district’s quarter the cut node holding it', { timeout: 120_000 }, () => {
    for (const seed of SEEDS) {
      const t = run(seed);
      const L = t.out.districts.length;
      const children = new Set(t.out.quarters.flatMap((q) => q.children ?? []));
      expect(t.out.quarters.filter((q) => !children.has(q.id)).length).toBe(1);
      const cut = t.out.quarters.filter((q) => q.cityCut);
      expect(cut.length).toBe(Math.min(t.out.report.nq, L));
      for (const d of t.out.districts) expect(cut.find((q) => q.members.includes(d.id))?.id).toBe(d.quarter);
    }
  });

  it('District records: faces a FaceRef at L1 resolving to its faces, keyed by the town in seed order, its growth stage', { timeout: 120_000 }, () => {
    const t = run(SEEDS[0]);
    const town0 = lineageHash(TOWN_ROOT);
    for (const d of t.out.districts) {
      expect(d.faces).toEqual({ owner: d.id, level: 1 });
      const res = t.k.resolve(d.faces, GROUND);
      expect(res.view).toBe('faces');
      const grown = t.out.grow.grown.find((x) => addressOf('district', lineageHash({ arena: GROUND, unit: town0, stage: STAGES.S6, epoch: 0, index: x.seed.order, reroll: 0 })) === d.id);
      expect(grown).toBeDefined();
      expect(t.out.lineages.get(d.id)).toEqual(lineageHash({ arena: GROUND, unit: town0, stage: STAGES.S6, epoch: 0, index: grown?.seed.order as number, reroll: 0 }));
      expect(d.fabric).toBe('bent-cut');
      // growth stage: 1 when the seed face's centroid lies within the wall, else 2
      const c = faceCentroid(t, grown?.seed.face as number, t.out);
      expect(d.growthStage).toBe(insidePoly(t.wall, c) ? 1 : 2);
    }
  });
});

/** The centroid of a district's seed face, through the same graph S6 grew over (a face index of that graph). */
function faceCentroid(t: Town & { out: S6Output }, i: number, out: S6Output): { x: number; y: number } {
  const g = faceGraph(t.plat, { ways: new Map(t.ways.map((w) => [w.id, w.class])), minBarrierClass: 'primary', perimeter: out.hinterland, water: new Set() });
  return g.faces[i].centroid;
}

describe('F-WORK (C-0085), the edges of the input, determinism, the Stage', () => {
  it('a low grower.turns limit ends the grower by the leftover rule with work_cut; containment still 100 %', { timeout: 120_000 }, () => {
    const t = townS6(SEEDS[0], {}, { turnLimit: 25 });
    expect(t.out.report.workCut).toEqual({ code: 'work_cut', count: 25, limit: 25 });
    expect(t.out.report.unowned).toBe(0);
    const ids = new Set(t.out.districts.map((d) => d.id));
    for (const { q, inside } of samples(t, 2500)) {
      const o = ownerAt(t, q);
      if (o === undefined || o === 'plaza:0') continue;
      if (inside) expect(o !== null && ids.has(o)).toBe(true);
      else expect(o).toBe(t.out.hinterland);
    }
    // the work-cut districts pass the edge test too: none holds both sides of an arterial ≥ primary or the wall
    const classOf = new Map(t.ways.map((w) => [w.id, w.class]));
    for (const e of edgesL1(t.plat)) {
      const l = ownerOfL1(t.plat, e.left);
      if (l === null || l !== ownerOfL1(t.plat, e.right) || !ids.has(l)) continue;
      for (const r of e.rows) {
        expect(r.role === 'way' && ARTERIAL.has(classOf.get(r.entity) as string)).toBe(false);
        expect(['wall', 'reserved', 'border']).not.toContain(r.role);
      }
    }
    expect(run(SEEDS[0]).out.report.workCut).toBeNull();
  });

  it('a settlement with a single coarse face is one district', () => {
    const a = gridArena(1, 1, 400, () => 'secondary');
    const sq = [P(5000, 5000), P(35_000, 5000), P(35_000, 35_000), P(5000, 35_000)];
    const r = runS6({ kernel: a.k, key: GROUND, seedKey: [1, 2, 3, 4], rung: 'CITY', boundary: sq, frame: [P(0, 0), P(40_000, 0), P(40_000, 40_000), P(0, 40_000)], ways: a.ways, features: [] });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.districts.length).toBe(1);
    expect(r.value.report.unowned).toBe(0);
    expect(r.value.quarters.length).toBe(1);
  });

  it('a way row naming no way of the input is refused (the edge test cannot be decided), the arena unchanged', () => {
    const a = gridArena(2, 2, 200, () => 'secondary');
    const before = liveL1(a.plat);
    const r = runS6({ kernel: a.k, key: GROUND, seedKey: [1, 2, 3, 4], rung: 'CITY', boundary: [P(5000, 5000), P(35_000, 5000), P(35_000, 35_000), P(5000, 35_000)], ways: [], features: [] });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_INVARIANT');
    expect(liveL1(a.plat)).toBe(before);
  });

  it('two runs of one seed are identical (districts, seams, quarters, typing, the turn log)', { timeout: 120_000 }, () => {
    const a = run(SEEDS[1]).out;
    const b = townS6(SEEDS[1]).out;
    const strip = (o: S6Output) => JSON.stringify({ d: o.districts, s: o.seams, q: o.quarters, t: o.typing, l: o.grow.log, r: o.report });
    expect(strip(b)).toBe(strip(a));
  });

  it('the Stage: id S6, callback form, district.seed and district.type, the town its lineage unit; inputsOf checks its record', () => {
    const st = s6Stage();
    expect(st.id).toBe(STAGES.S6);
    expect(st.txForm).toBe('callback');
    expect(st.streamKeys).toEqual(['district.seed', 'district.type']);
    expect(st.lineageUnit).toBe('town');
    expect(st.outputs).toContain('districts');
    expect(st.workLimits.map((l) => l.counter)).toContain('grower.turns');
    expect(() => st.inputsOf({}, { kind: 'all' })).toThrow(TypeError);
    const t = town(SEEDS[0]);
    expect(st.inputsOf({ get: (k: string) => (k === 's6' ? t.input : undefined) }, { kind: 'all' })).toBe(t.input);
    const viaStage = st.run(t.input, {} as never);
    expect(viaStage.ok).toBe(true);
    if (viaStage.ok) expect(JSON.stringify(viaStage.value.districts)).toBe(JSON.stringify(run(SEEDS[0]).out.districts as District[]));
  });
});

/** A unit's lineage under the town in S6's run (C-0245 (17)): (the town, S6, index). */
function townUnit(index: number): LineageHash {
  return lineageHash({ arena: GROUND, unit: lineageHash(TOWN_ROOT), stage: STAGES.S6, epoch: 0, index, reroll: 0 });
}

/** The lineage of the `index`-th entity minted under a run unit. */
function under(unit: LineageHash, index: number): LineageHash {
  return lineageHash({ arena: GROUND, unit, stage: STAGES.S6, epoch: 0, index, reroll: 0 });
}

describe('the run units’ keys, derived from the town and the arena (C-0245 (17); note 13)', () => {
  it('the hinterland (the town, S6, 2³² − 1); each seam under (the town, S6, 2³² − 2) by its run’s lowest-then-leftmost vertex; each quarter node under (the town, S6, 2³² − 3) in creation order', { timeout: 120_000 }, () => {
    for (const seed of [SEEDS[0], MERGED]) {
      const t = run(seed);
      expect(t.out.hinterland).toBe(addressOf('hinterland', townUnit(4_294_967_295)));
      // the seams: the id of the i-th under the seams' run unit, and the runs in the order of their lowest-then-leftmost
      // vertex, read from the arena's district_bound rows of each seam (runs meeting at a vertex may share it)
      const seamRun = townUnit(4_294_967_294);
      const seamIds = new Set(t.out.seams.map((x) => x.id));
      const low = new Map<Id, LatticePoint>();
      for (const e of edgesL1(t.plat)) {
        for (const r of e.rows) {
          if (r.role !== 'district_bound' || !seamIds.has(r.entity)) continue;
          for (const q of [e.a, e.b]) {
            const cur = low.get(r.entity);
            if (cur === undefined || q.y < cur.y || (q.y === cur.y && q.x < cur.x)) low.set(r.entity, q);
          }
        }
      }
      expect(t.out.seams.length).toBeGreaterThan(30);
      t.out.seams.forEach((sm, i) => {
        expect(sm.id).toBe(addressOf('seam', under(seamRun, i)));
        if (i === 0) return;
        const a = low.get(t.out.seams[i - 1].id) as LatticePoint;
        const b = low.get(sm.id) as LatticePoint;
        expect(a.y < b.y || (a.y === b.y && a.x <= b.x)).toBe(true);
      });
      // the quarter nodes: 2L − 1 of them, the i-th under the quarters' run unit
      const quarterRun = townUnit(4_294_967_293);
      expect(t.out.quarters.length).toBe(2 * t.out.districts.length - 1);
      t.out.quarters.forEach((q, i) => expect(q.id).toBe(addressOf('quarter', under(quarterRun, i))));
    }
  });
});

describe('S6’s hand-over, read from its output (N-c1b-3, N-c1c-1, note 4)', () => {
  it('the arena key defaults to the ground arena: S6 with `key` omitted equals the keyed run, by runS6 and by the Stage', { timeout: 120_000 }, () => {
    const keyed = run(SEEDS[0]).out;
    const strip = (o: S6Output) => JSON.stringify({ d: o.districts, s: o.seams, q: o.quarters, t: o.typing, l: o.grow.log, r: o.report, h: o.hinterland, p: o.perimeter, n: [...o.lineages] });
    for (const via of ['runS6', 'stage'] as const) {
      const t = town(SEEDS[0]);
      const { key: _key, ...rest } = t.input;
      const input = rest as S6Input;
      expect(input.key).toBeUndefined();
      const r = via === 'runS6' ? runS6(input) : s6Stage().run(input, {} as never);
      expect(r.ok).toBe(true);
      if (r.ok) expect(strip(r.value)).toBe(strip(keyed));
    }
  });

  it('the band’s top reaches the grower: no district it held without a merge into it ends above law.bandHa[1]', { timeout: 120_000 }, () => {
    let atTop = 0;
    for (const seed of [...SEEDS, MERGED]) {
      const t = run(seed);
      expect(t.out.report.workCut).toBeNull();
      const top = t.out.report.bandHa[1] * 1e8;
      const into = new Set(t.out.grow.merges.map((m) => m.into));
      for (const d of t.out.grow.grown) {
        if (d.mergedInto >= 0 || into.has(d.seed.order)) continue;
        expect(d.areaCm2).toBeLessThanOrEqual(top);
        if (d.areaCm2 > 0.75 * top) atTop += 1;
      }
    }
    // the case has teeth: districts grow up to the top
    expect(atTop).toBeGreaterThan(3);
  });

  it('each district’s family reaches the quarter tree: one family for every kind gives the tree of no family penalty, not the shipped one', { timeout: 300_000 }, () => {
    const seed = SEEDS[0];
    const base = run(seed).out;
    const noPenalty = townS6(seed, {}, { tables: tableWith('district', 'quarters', 'familyCostHa', 0) }).out;
    const kinds = typingCells().kinds.map((k) => k.kind);
    const oneFamily = townS6(seed, {}, { tables: withS6(s6With(kinds.map((k) => [`demand.${k}`, 'family', 'core'] as const))) }).out;
    // the districts and their kinds are the same three times; the tree is the families'
    for (const o of [noPenalty, oneFamily]) expect(o.typing).toEqual(base.typing);
    expect(oneFamily.quarters).toEqual(noPenalty.quarters);
    expect(oneFamily.quarters).not.toEqual(base.quarters);
  });

  it('the run’s tables carry S6’s own table: an `s6` whose edge test starts at secondary stops growth at every grid street', { timeout: 300_000 }, () => {
    const seed = SEEDS[0];
    const crossed = (t: Town, out: S6Output): number => {
      const classOf = new Map(t.ways.map((w) => [w.id, w.class]));
      const ids = new Set(out.districts.map((d) => d.id));
      let n = 0;
      for (const e of edgesL1(t.plat)) {
        const l = ownerOfL1(t.plat, e.left);
        if (l === null || l !== ownerOfL1(t.plat, e.right) || !ids.has(l)) continue;
        if (e.rows.some((r) => r.role === 'way' && classOf.get(r.entity) === 'secondary')) n += 1;
      }
      return n;
    };
    const base = run(seed);
    expect(crossed(base, base.out)).toBeGreaterThan(10);
    const t = townS6(seed, {}, { tables: withS6(s6With([['edge', 'minBarrierClass', 'secondary']])) });
    expect(crossed(t, t.out)).toBe(0);
    expect(t.out.report.unowned).toBe(0);
  });
});

describe('an outside region cut off from the frame is the hinterland’s (C-0245 (2); note 9)', () => {
  it('a primary ring road between the perimeter and the frame: every face it encloses outside the perimeter takes the hinterland’s id', { timeout: 120_000 }, () => {
    const t = town(SEEDS[0]);
    const R = 140_000;
    layChain(t.k, [P(-R, -R), P(R, -R), P(R, R), P(-R, R)], [{ role: 'way', entity: 'way:ring' }], { closed: true });
    const out = s6Run({ ...t.input, ways: [...t.input.ways, wayRecord('way:ring', 'primary')] });
    for (const q of out.perimeter) expect(Math.abs(q.x) < R - 10_000 && Math.abs(q.y) < R - 10_000).toBe(true);
    let between = 0;
    for (let x = -R + 1250; x < R; x += 2500) {
      for (let y = -R + 1250; y < R; y += 2500) {
        const q = P(x, y);
        if (insidePoly(out.perimeter, q)) continue;
        const o = ownerAt(t, q);
        if (o === undefined) continue;
        expect(o).toBe(out.hinterland);
        between += 1;
      }
    }
    expect(between).toBeGreaterThan(1000);
    expect(out.report.unowned).toBe(0);
  });
});

describe('the test helper’s view registers S6’s own table (Q99, RL8; M0-e-04 round S4)', () => {
  it('withS6(variant) carries the registered `s6` and its hash covers it: the hash differs from the registry view’s with a variant and between variants, and equals it with none', () => {
    const base = tableView();
    const shipped = withS6(s6With([]));
    const secondary = withS6(s6With([['edge', 'minBarrierClass', 'secondary']]));
    expect(shipped.table('s6').rows).toEqual(s6Table().rows);
    expect(secondary.table('s6').cell('edge', 'minBarrierClass').value).toBe('secondary');
    expect(String(shipped.hash)).not.toBe(String(base.hash));
    expect(String(secondary.hash)).not.toBe(String(shipped.hash));
    expect(String(withS6().hash)).toBe(String(base.hash));
    expect(String(withS6(s6With([['edge', 'minBarrierClass', 'secondary']])).hash)).toBe(String(secondary.hash));
    // every shipped table reads as the registry view's
    expect(secondary.table('district').hash).toEqual(base.table('district').hash);
    // and with no variant the view lists no `s6` (S6 then reads its folder's own table, `s6TableIn`)
    expect(() => withS6().table('s6')).toThrow();
  });
});
