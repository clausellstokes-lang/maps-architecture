// S5a / S5b on the CITY fixture's three stages (0.55 / 0.33 walled, ribbon 0.12; §4.4, §4.1's S5 row; C-0016;
// C-0244): every stated promise (./checks.ts) on seeds 1 – 3, and the records, rows and declarations they rest on —
// the stage-2 enceinte and its gates, the S5b roads' ways and junctions, T one field re-settled (never recomputed per
// stage), the run deterministic, the Stage declarations, a folded stage's bookkeeping.
import { describe, expect, it } from 'vitest';
import { STAGES, type ConcernId, type Stream } from '@plat/kernel';
import type { StageContext } from '@plat/model';
import { flatFixture, type EnceinteEnv } from '../../../src/index.js';
import { growthStart, mainRoadsStep, mainRoadStream, runS5ab, s5aStage, s5bStage, traceStep, type GrowthState } from '../../../src/growth/mainRoads.js';
import { s5bStatistics, violations } from './checks.js';
import { baseRun, cityGrown, roleEdges, verticesWith } from './support.js';

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
    expect(s3.roads.length).toBe(Math.max(0, s3.count.n - s3.crossings.length));
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
