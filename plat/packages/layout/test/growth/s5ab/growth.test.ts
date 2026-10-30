// S5a / S5b on the CITY fixture's three stages (0.55 / 0.33 walled, ribbon 0.12; §4.4, §4.1's S5 row; C-0016;
// C-0244): every stated promise (./checks.ts) on seeds 1 – 3, and the records, rows and declarations they rest on —
// the stage-2 enceinte and its gates, the S5b roads' ways and junctions, T one field re-settled (never recomputed per
// stage), the run deterministic, the Stage declarations, a folded stage's bookkeeping.
import { describe, expect, it } from 'vitest';
import { STAGES, type ConcernId, type Kernel, type KernelTx, type StageId, type Stream } from '@plat/kernel';
import { lineageHash, TOWN_ROOT, type StageContext } from '@plat/model';
import { flatFixture, type EnceinteEnv } from '../../../src/index.js';
import { growthStart, mainRoadsStep, mainRoadStream, runS5ab, s5aStage, s5bStage, traceStep, type GrowthState } from '../../../src/growth/mainRoads.js';
import { recountC, s5bStatistics, violations } from './checks.js';
import { baseRun, cityGrown, grow, GROUND, P, roleEdges, verticesWith } from './support.js';

/** Seed 2's S5b roads: each way, the way it leaves and its junction there (N-20; read on the committed tree). */
const FROM_SEED_2: readonly string[] = [
  'way:14 way:13 -7422,77862',
  'way:15 way:11 12015,-94144',
  'way:16 way:7 77028,49706',
  'way:17 way:13 -10717,95941',
  'way:18 way:1 84997,-41209',
  'way:19 way:15 -33425,-79288',
  'way:20 way:15 -10662,-85885',
];

describe('S5a / S5b on the CITY fixture', () => {
  it('every promise holds on seeds 1 – 3 (nesting, N_k − c, gates on their boundary, walls, roads, T)', { timeout: 300_000 }, () => {
    for (const seed of [1, 2, 3]) expect(violations(cityGrown(seed))).toEqual([]);
  });

  it('the stages: walled core, walled rings, ribbon; stage 2 walled with one gate per crossing, the ribbon unwalled', { timeout: 300_000 }, () => {
    const g = cityGrown(1);
    const [s1, s2, s3] = g.growth.stages;
    expect([s1.regime, s2.regime, s3.regime]).toEqual(['dense_core', 'walled_rings', 'ribbon']);
    expect([s1.walled, s2.walled, s3.walled]).toEqual([true, true, false]);
    // Stage 2: N_2 = 8 by the land law on 220 ha, c = 7 (S4's seven arterials), one primary spawned and served.
    expect(s2.count.n).toBe(8);
    expect(s2.crossings.length).toBe(7);
    expect(s2.roads.length).toBe(1);
    const tr = s2.trace;
    expect(tr).not.toBeNull();
    if (tr === null) return;
    expect(tr.enceinte.id).toBe('enceinte:2');
    expect(tr.enceinte.stage).toBe(2);
    expect(tr.enceinte.trace).toEqual({ role: 'wall', entity: 'enceinte:2' });
    const mains = s2.gates.filter((x) => x.kind === 'main');
    expect(mains.length).toBe(8);
    expect(tr.enceinte.gates).toEqual(s2.gates.map((x) => x.id));
    // Gate ids continue after stage 1's: no id is shared.
    const ids1 = new Set(s1.gates.map((x) => x.id));
    for (const x of mains) {
      expect(ids1.has(x.id)).toBe(false);
      expect(x.enceinte).toBe('enceinte:2');
      expect(x.way).not.toBeNull();
    }
    expect(new Set(mains.map((x) => x.id)).size).toBe(8);
    // The spawned road's gate is on that road.
    const road = s2.roads[0];
    expect(mains.some((x) => x.way === road.way.id)).toBe(true);
    // The strip stand-in laid for stage 2 (C-0033): both sides, faces owned as the strategy names them.
    expect(tr.strips.faces.inner).toBeGreaterThan(0);
    expect(tr.strips.faces.outer).toBeGreaterThan(0);
    expect(tr.strips.owners).toEqual({ inner: 'wall_strip:2-inner', outer: 'wall_strip:2-outer' });
    expect(roleEdges(g.plat, 'setback').has('enceinte:2')).toBe(true);
    // The ribbon: no trace, no gate, its roads spawned on its boundary.
    expect(s3.trace).toBeNull();
    expect(s3.gates).toEqual([]);
    expect(s3.wall).toBeNull();
    // c recounted from the arena (the standing ways' meetings with the ribbon's boundary as picked), never the record.
    const c3 = recountC(g, 3);
    expect(c3).toBeGreaterThan(0);
    expect(s3.crossings.length).toBe(c3);
    expect(s3.roads.length).toBe(Math.max(0, s3.count.n - c3));
    expect(s2.crossings.length).toBe(recountC(g, 2));
    // §13.2's statistics on this seed: every gate on a primary.
    expect(s5bStatistics(g).gateShare).toBe(1);
  });

  it('the S5b roads: ways after S4\'s, a T junction on a standing way, an end at the frame, rows in the arena', { timeout: 300_000 }, () => {
    const g = cityGrown(2);
    const s4ways = g.s4.network.ways.length;
    const roads = g.growth.stages.flatMap((s) => s.roads);
    expect(roads.length).toBeGreaterThan(0);
    roads.forEach((r, i) => {
      expect(r.way.id).toBe(`way:${String(s4ways + i)}`);
      expect(r.way.from).toEqual({ kind: 'junction', id: r.from.junction });
      expect(r.way.to.kind).toBe('bearing');
      const jt = g.growth.junctions.find((j) => j.id === r.from.junction);
      const je = g.growth.junctions.find((j) => j.id === r.end);
      expect(jt?.kind).toBe('T');
      expect(jt?.arms).toEqual([r.from.way, r.way.id].sort());
      expect(je?.kind).toBe('end');
      expect(je?.arms).toEqual([r.way.id]);
      expect(verticesWith(g.plat, 'junction', r.from.junction)).toEqual([r.from.at]);
      // The road's edges carry its way row in the arena.
      expect((roleEdges(g.plat, 'way').get(r.way.id) ?? []).length).toBeGreaterThan(0);
      expect(g.growth.ways.some((w) => w.id === r.way.id)).toBe(true);
    });
    // No junction id is minted twice.
    const jids = g.growth.junctions.map((j) => j.id);
    expect(new Set(jids).size).toBe(jids.length);
  });

  it('T is one field: stage 2 reads S3\'s field itself, stage 3 the field S5b re-settled, never a new one', { timeout: 300_000 }, () => {
    const g = cityGrown(3);
    const [, s2, s3] = g.growth.stages;
    expect(s2.boundary?.source).toBe(g.slice.field);
    expect(s3.boundary?.source).not.toBe(g.slice.field);
    expect(s3.boundary?.source.lattice).toBe(g.slice.lattice);
    expect(s3.boundary?.source.a).toBe(g.slice.field.a);
    expect(s2.lowered).toBeGreaterThan(0);
    expect(g.growth.field.lattice).toBe(g.slice.lattice);
    // Re-settled, never recomputed (N-6; C-0449 (6)): the nodes stage 2's roads lowered are exactly those whose T fell
    // between the field stage 2 read and the one stage 3 read — a strict part of the lattice, every other node's T kept
    // bit for bit.
    const before = s2.boundary?.source.T ?? new Float64Array(0);
    const after = s3.boundary?.source.T ?? new Float64Array(0);
    let fell = 0;
    let kept = 0;
    for (let i = 0; i < before.length; i += 1) {
      if (after[i] < before[i]) fell += 1;
      else if (Object.is(after[i], before[i])) kept += 1;
    }
    expect(s2.lowered).toBe(fell);
    expect(fell + kept).toBe(before.length);
    expect(s2.lowered).toBeLessThan(g.slice.lattice.points.length / 2);
  });

  // Each S5b road's junction on seed 2 (N-20; C-0449 (20)): the way vertex its course leaves — the candidate nearest the
  // course's first ring node — pinned, with the way it lies on.
  it('pins the junction each S5b road leaves on seed 2', { timeout: 300_000 }, () => {
    const g = cityGrown(2);
    const got = g.growth.stages.flatMap((s) => s.roads.map((r) => `${r.way.id} ${r.from.way} ${String(r.from.at.x)},${String(r.from.at.y)}`));
    expect(got).toEqual(FROM_SEED_2);
  });

  // The S5b batch's lineage keys (N-23; §6.3: the regeneration key; C-0449 (23)): each road's insertChain op carries
  // its way's index under S5, epoch 0, the town root's unit, reroll 0 — `way:n` the index n.
  it('each S5b road\'s op carries its way\'s lineage key (§6.3)', { timeout: 300_000 }, () => {
    const site = flatFixture(1, { frameAreaHa: 900, walledHa: 90 });
    const b = baseRun(site);
    const ops: { lineage: readonly number[]; index: number; kind: string }[][] = [];
    const tx = (spec: KernelTx, fn?: never): ReturnType<Kernel['tx']> => {
      if (fn === undefined && spec.stage === STAGES.S5) ops.push(spec.ops.map((o) => ({ lineage: [...o.lineage], index: o.index, kind: o.kind })));
      return b.k.tx(spec, fn);
    };
    const kernel = Object.freeze({ ...b.k, tx: tx as Kernel['tx'] }) as Kernel;
    const g = runS5ab({ slice: b.slice, commit: b.commit, s4: b.s4, kernel });
    if (!g.ok) throw new Error(g.detail);
    const perStage = g.value.stages.filter((s) => s.roads.length > 0).map((s) => s.roads.map((r) => r.way.id));
    expect(ops.length).toBe(perStage.length);
    expect(perStage.flat().length).toBeGreaterThan(1);
    const town = lineageHash(TOWN_ROOT);
    ops.forEach((batch, i) => {
      expect(batch.map((o) => [o.kind, o.index, o.lineage])).toEqual(
        perStage[i].map((id) => ['insertChain', 0, [...lineageHash({ arena: GROUND, unit: town, stage: STAGES.S5 as StageId, epoch: 0, index: Number(id.slice(4)), reroll: 0 })]]),
      );
    });
  });

  it('is deterministic: the same seed grows the same stages, roads, gates and walls', { timeout: 300_000 }, () => {
    const site = flatFixture(1, { frameAreaHa: 900, walledHa: 90 });
    const runs = [0, 1].map(() => {
      const b = baseRun(site);
      const g = runS5ab({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k });
      if (!g.ok) throw new Error(g.detail);
      return g.value.stages.map((s) => ({ k: s.k, n: s.count.n, picks: s.picks, roads: s.roads.map((r) => [r.way, r.points, r.nodes]), gates: s.gates, wall: s.wall, t: s.boundary?.threshold.t }));
    });
    expect(runs[1]).toEqual(runs[0]);
  });
});

describe('the steps and the Stage declarations', () => {
  it('s5bStage(k) then s5aStage(k) are runS5ab\'s steps: declared, S5, the town root\'s growth.mainroad stream', { timeout: 300_000 }, () => {
    const site = flatFixture(2, { frameAreaHa: 900, walledHa: 90 });
    const b = baseRun(site);
    const sa = s5aStage(2);
    const sb = s5bStage(2);
    for (const s of [sa, sb]) {
      expect(s.id).toBe(STAGES.S5);
      expect(s.txForm).toBe('declared');
      expect(s.lazy).toBe(false);
      expect(s.inputs).toEqual(['s5.growth']);
      expect(() => s.inputsOf({}, { kind: 'all' } as never)).toThrow(TypeError);
    }
    expect(sb.streamKeys).toEqual(['growth.mainroad']);
    expect(sa.streamKeys).toEqual([]);
    expect(sb.ladder[0].failureClass).toBe('F-ROUTE');
    expect(sa.ladder[0].failureClass).toBe('F-WALL');
    const state: GrowthState = growthStart({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k });
    const asked: { concern: ConcernId }[] = [];
    const stream = mainRoadStream(b.slice);
    const ctx = {
      stream: (concern: ConcernId): Stream => {
        asked.push({ concern });
        return stream;
      },
      streamOpts: () => ({ reroll: 0, attempt: 0, epoch: 0, salt: 0 }),
    } as unknown as StageContext<EnceinteEnv>;
    const m = sb.run(sb.inputsOf({ growth: state }, { kind: 'all' } as never), ctx);
    expect(m.ok).toBe(true);
    expect(asked.length).toBe(1);
    const t = sa.run({ growth: state }, ctx);
    expect(t.ok).toBe(true);
    // The stage's selection is the enclosure the next stage reads, and the stage the last with land.
    expect(state.enclosure).toBe(state.stages[1].boundary?.set.selected);
    expect(state.lastWithLand).toBe(2);
    for (let k = 3; k <= site.land.stagesHa.length; k += 1) {
      expect(mainRoadsStep(state, k, stream).ok).toBe(true);
      expect(traceStep(state, k).ok).toBe(true);
    }
    const b2 = baseRun(site);
    const whole = runS5ab({ slice: b2.slice, commit: b2.commit, s4: b2.s4, kernel: b2.k });
    if (!whole.ok) throw new Error(whole.detail);
    expect(state.stages.map((s) => s.roads.map((r) => r.points))).toEqual(whole.value.stages.map((s) => s.roads.map((r) => r.points)));
    expect(state.stages.map((s) => s.gates)).toEqual(whole.value.stages.map((s) => s.gates));
    // A step out of order is refused.
    expect(() => mainRoadsStep(state, 2, stream)).toThrow(RangeError);
    expect(() => mainRoadsStep(growthStart({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k }), 3, stream)).toThrow(RangeError);
  });

  // The rules' last word end to end (N-3; C-0244 (6), C-0449 (3)): a wall standing across every course — stage 1's line
  // replaced, for stage 3's S5b, by a ring 100 m inside the frame (the walls are among a road's obstacles; the ring and
  // the junctions still read the last wall, stage 2's) — leaves every destination unserved `invalid`, each level's
  // fault named, and commits no road.
  it('a wall across every course: every destination unserved invalid, its faults named, no road committed', { timeout: 300_000 }, () => {
    const site = flatFixture(1, { frameAreaHa: 900, walledHa: 90 });
    const b = baseRun(site);
    const state = growthStart({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k });
    const stream = mainRoadStream(b.slice);
    expect(mainRoadsStep(state, 2, stream).ok).toBe(true);
    expect(traceStep(state, 2).ok).toBe(true);
    const f = b.slice.lattice.frame;
    state.stages[0].wall = [P(f.minX + 10_000, f.minY + 10_000), P(f.maxX - 10_000, f.minY + 10_000), P(f.maxX - 10_000, f.maxY - 10_000), P(f.minX + 10_000, f.maxY - 10_000)];
    const ways = state.ways.length;
    const version = b.plat.version;
    const r3 = mainRoadsStep(state, 3, stream);
    expect(r3.ok).toBe(true);
    if (!r3.ok) return;
    expect(r3.value.picks.length).toBeGreaterThan(0);
    expect(r3.value.roads).toEqual([]);
    expect(r3.value.unserved.length).toBe(r3.value.picks.length);
    for (const u of r3.value.unserved) {
      expect(u.why).toBe('invalid');
      expect(u.faults?.length).toBeGreaterThan(0);
    }
    expect(r3.value.unserved.some((u) => u.faults?.every((x) => x === 'obstacle'))).toBe(true);
    expect(state.ways.length).toBe(ways);
    expect(b.plat.version).toBe(version);
  });

  it('a stage capped with nothing to add folds into the last stage with land, its quota with it', { timeout: 300_000 }, () => {
    // A 240 ha frame: stage 2 fits and is walled; then the enclosure is made every reachable land node, so stage 3 is
    // capped and adds nothing.
    const site = flatFixture(1, { frameAreaHa: 240 });
    const b = baseRun(site);
    const state = growthStart({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k });
    const stream = mainRoadStream(b.slice);
    expect(mainRoadsStep(state, 2, stream).ok).toBe(true);
    expect(traceStep(state, 2).ok).toBe(true);
    expect(state.lastWithLand).toBe(2);
    const all = new Uint8Array(state.enclosure.length);
    const L = b.slice.lattice;
    for (let i = 0; i < all.length; i += 1) all[i] = L.interior[i] === 1 && L.water[i] === 0 && state.field.T[i] < Infinity ? 1 : 0;
    state.enclosure = all;
    const ways = state.ways.length;
    const r3 = mainRoadsStep(state, 3, stream);
    expect(r3.ok).toBe(true);
    if (!r3.ok) return;
    expect(r3.value.boundary).toBeNull();
    expect(r3.value.foldedInto).toBe(2);
    expect(r3.value.roads).toEqual([]);
    expect(r3.value.picks).toEqual([]);
    expect(state.ways.length).toBe(ways);
    expect(state.folded).toEqual([0, site.land.stagesHa[2], 0]);
    expect(traceStep(state, 3).ok).toBe(true);
    expect(state.lastWithLand).toBe(2);
    expect(state.enclosure).toBe(all);
  });
});

// The branches the CITY seeds never take, end to end (N-5, N-3; C-0449 (5), (3)): every stated promise (./checks.ts)
// holds on each, and each branch is the one named.
describe('S5a / S5b on the frames whose stages take the other branches', () => {
  it('N_k ≤ c: a walled stage whose arterials already cross it as often as its gate law asks spawns none, its gates the crossings (900 ha, seed 1)', { timeout: 300_000 }, () => {
    const g = grow(flatFixture(1, { frameAreaHa: 900, walledHa: 90 }));
    expect(violations(g)).toEqual([]);
    const s2 = g.growth.stages[1];
    expect(s2.walled).toBe(true);
    expect(s2.count.n).toBeLessThanOrEqual(s2.crossings.length);
    expect([s2.picks.length, s2.short, s2.roads.length]).toEqual([0, 0, 0]);
    expect(s2.gates.filter((x) => x.kind === 'main').length).toBe(s2.crossings.length);
  });

  it('a capped stage that still adds land runs S5b and reports the destinations no candidate was left for (240 ha, seed 1)', { timeout: 300_000 }, () => {
    const g = grow(flatFixture(1, { frameAreaHa: 240 }));
    expect(violations(g)).toEqual([]);
    const s3 = g.growth.stages[2];
    expect(s3.boundary?.capped).toBe(true);
    expect(s3.foldedInto).toBeNull();
    expect(s3.boundary?.addedCm2).toBeGreaterThan(0);
    expect(s3.count.n).toBeGreaterThan(s3.crossings.length);
    expect(s3.short).toBe(s3.count.n - s3.crossings.length - s3.picks.length);
    expect(s3.short).toBeGreaterThan(0);
  });

  it('a destination whose every course meets a standing way is unserved `invalid`, each level\'s fault named, no road (400 ha, seed 3)', { timeout: 300_000 }, () => {
    const g = grow(flatFixture(3, { frameAreaHa: 400, walledHa: 30 }));
    // Every promise but the one this destination breaks by design: each spawned primary served.
    expect(violations(g)).toEqual([`seed 3: stage 3: 0 primaries added for N_k 5 − c 4 (unserved ${JSON.stringify(g.growth.stages[2].unserved)})`]);
    const s3 = g.growth.stages[2];
    expect(s3.unserved).toEqual([{ stage: 3, pick: 0, why: 'invalid', faults: ['way', 'way', 'way', 'way'] }]);
    expect(s3.roads).toEqual([]);
  });
});
