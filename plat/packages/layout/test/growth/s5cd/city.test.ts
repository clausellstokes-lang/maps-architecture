// S5 whole on the flat fixture (§4.4 S5a – S5d in §4.1's order; C-0016; C-0254): S5c's streets stay in their stage's land
// and never cross a wall, its records agree with the arena, the run is deterministic, the growth stage's ways are keyed
// in acceptance order, each sub-step runs once per stage (no restart path: one S5c, one prune and trim, one S5d each, at
// most one top-up), and the Stage declarations of S5c and S5d (callback form, their concerns and ladders).
import { describe, expect, it } from 'vitest';
import { CONCERNS, recomputeLevelDigest, STAGES, type StageId } from '@plat/kernel';
import { lineageHash, TOWN_ROOT } from '@plat/model';
import { loadWorkLimits } from '@plat/tables';
import { s5dStage } from '../../../src/growth/capacity.js';
import { growthStageLineage, s5cStage } from '../../../src/growth/proposals.js';
import { baseRun, fixtureGrown, grownRun, GROUND, insideRing, properCross, roleEdges, segDist, SMALL } from './support.js';
import { growthArea, growthStart, wayLines } from '../../../src/growth/index.js';
import { flatFixture } from '../../../src/index.js';

describe('S5 on the flat fixture', () => {
  for (const [seed, fx] of [
    [1, SMALL],
    [2, SMALL],
    [1, {}],
  ] as const) {
    it(`seed ${String(seed)} ${JSON.stringify(fx)}: streets in their stage, no wall crossed, records = arena`, { timeout: 240_000 }, () => {
      const g = fixtureGrown(seed, fx);
      const st = g.run.state;
      expect(g.run.growth.map((r) => r.k)).toEqual([1, 2, 3]);
      expect(g.run.prune.map((r) => r.k)).toEqual([1, 2, 3]);
      expect(g.run.capacity.map((r) => r.k)).toEqual([1, 2, 3]);
      expect(g.run.capacity.every((d) => d.rungs.filter((r) => r.rung === 'top_up').length <= 1)).toBe(true);
      const walls = st.stages.map((s) => s.wall);
      const wallEdges = [...roleEdges(g.plat, 'wall').values(), ...roleEdges(g.plat, 'setback').values()].flat();
      const wayEdges = roleEdges(g.plat, 'way');
      let streets = 0;
      for (const rec of g.run.growth) {
        const k = rec.k;
        const gs = st.stages[k - 1];
        expect(rec.walled).toBe(gs.walled);
        for (const s of rec.streets) {
          streets += 1;
          expect(s.way.growthStage).toBe(k);
          expect(st.ways).toContain(s.way);
          // In the stage's land: inside its wall (walled) or boundary (the provisional ends trimmed), outside the last wall.
          const outer = gs.walled ? walls[k - 1]! : gs.boundary!.set.outline;
          const inner = k >= 2 ? walls[k - 2] : null;
          for (const q of s.points) {
            expect(insideRing(outer, q) || outer.some((o) => Math.hypot(o.x - q.x, o.y - q.y) < 2)).toBe(true);
            if (inner !== null) expect(insideRing(inner, q)).toBe(false);
          }
          // No edge of it crosses a wall or a setback line.
          for (const [a, b] of wayEdges.get(s.way.id) ?? []) for (const [c, d] of wallEdges) expect(properCross(a, b, c, d)).toBe(false);
        }
        // Junctions in the record are in the state and in the arena.
        for (const j of rec.junctions) {
          expect(st.junctions.some((x) => x.id === j.id)).toBe(true);
          const r = g.k.resolve(j.vertex, GROUND);
          expect(r.view === 'vertices' ? r.vertices.length : 0).toBe(1);
        }
      }
      expect(streets).toBeGreaterThan(0);
      // Ids are unique across the network.
      expect(new Set(st.ways.map((w) => w.id)).size).toBe(st.ways.length);
      expect(new Set(st.junctions.map((j) => j.id)).size).toBe(st.junctions.length);
    });
  }

  it('is deterministic: two runs give the same records and the same level digests', { timeout: 240_000 }, () => {
    const a = grownRun(flatFixture(3, SMALL));
    const b = grownRun(flatFixture(3, SMALL));
    expect(JSON.stringify(b.run.growth)).toBe(JSON.stringify(a.run.growth));
    expect(JSON.stringify(b.run.prune)).toBe(JSON.stringify(a.run.prune));
    expect(JSON.stringify(b.run.capacity.map((d) => d.check))).toBe(JSON.stringify(a.run.capacity.map((d) => d.check)));
    for (const level of [0, 1] as const) expect(recomputeLevelDigest(b.plat, level)).toEqual(recomputeLevelDigest(a.plat, level));
  });

  it('the growth stage keys its ways in acceptance order (§6.3): the stage’s lineage unit, S5, the acceptance index', { timeout: 240_000 }, () => {
    const g = fixtureGrown(1, SMALL);
    const rec = g.run.growth[0];
    expect(growthStageLineage(GROUND, 1)).toEqual(lineageHash({ arena: GROUND, unit: lineageHash(TOWN_ROOT), stage: STAGES.S5 as StageId, epoch: 0, index: 1, reroll: 0 }));
    rec.streets.forEach((s, i) => {
      // After the prune the indices keep their acceptance order (pruned ones leave gaps).
      if (i > 0) expect(s.index).toBeGreaterThan(rec.streets[i - 1].index);
      expect(s.lineage).toEqual(lineageHash({ arena: GROUND, unit: growthStageLineage(GROUND, 1), stage: STAGES.S5 as StageId, epoch: 0, index: s.index, reroll: 0 }));
    });
    const nums = rec.streets.map((s) => Number(s.way.id.slice(4)));
    for (let i = 1; i < nums.length; i += 1) expect(nums[i]).toBeGreaterThan(nums[i - 1]);
  });
});

describe('the seeds (C-0254 (3))', () => {
  it('lie on the arterials inside stage 1’s wall, half a seed spacing apart along each, their sides alternating, clear of the bands', { timeout: 240_000 }, () => {
    const b = baseRun(flatFixture(1, SMALL));
    const state = growthStart({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k });
    const area = growthArea(state, 1);
    const S = area.rules.seedSpacingCm;
    const D = area.rules.legality.clearanceCm('secondary');
    expect(area.seeds.length).toBeGreaterThan(0);
    const lines = new Map(wayLines(b.k, state.ways.map((w) => w.id), GROUND).map((l) => [l.way, l.runs.flatMap((r) => r.points)]));
    const bands = area.features.filter((f) => f.kind === 'band');
    for (const s of area.seeds) {
      const cls = state.ways.find((w) => w.id === s.way)?.class;
      expect(cls === 'through' || cls === 'primary').toBe(true);
      const pts = lines.get(s.way)!;
      let d = Infinity;
      for (let i = 1; i < pts.length; i += 1) d = Math.min(d, segDist(s.at, pts[i - 1], pts[i]));
      expect(d).toBeLessThan(1);
      expect(insideRing(state.stages[0].wall!, s.at)).toBe(true);
      for (const f of bands) expect(segDist(s.at, f.a, f.b)).toBeGreaterThanOrEqual(D - 1);
      for (const t of area.seeds) if (t !== s) expect(Math.hypot(t.at.x - s.at.x, t.at.y - s.at.y)).toBeGreaterThanOrEqual(S / 4 - 1);
    }
    // The sides alternate along each arterial: both sides seeded, about equally.
    const left = area.seeds.filter((s) => s.side === 1).length;
    const right = area.seeds.filter((s) => s.side === -1).length;
    expect(left + right).toBe(area.seeds.length);
    expect(Math.min(left, right)).toBeGreaterThanOrEqual(Math.floor(area.seeds.length / 3));
  });

  it('each seed’s side follows its position along its run — left at an even n, right at an odd one — never the count of seeds kept (C-0260 (2))', { timeout: 240_000 }, () => {
    let byCountRun = 0;
    let byCountAll = 0;
    let seeds = 0;
    for (const [seed, fx] of [
      [1, SMALL],
      [1, {}],
      [2, {}],
    ] as const) {
      const b = baseRun(flatFixture(seed, fx));
      const state = growthStart({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k });
      const area = growthArea(state, 1);
      const half = area.rules.seedSpacingCm / 2;
      const runsOf = new Map(wayLines(b.k, state.ways.map((w) => w.id), GROUND).map((l) => [l.way, l.runs.map((r) => r.points)]));
      const kept = new Map<string, number>();
      area.seeds.forEach((s, gi) => {
        // The seed's arc length along its run (the first run of its way it lies on).
        let found: { run: number; arc: number } | null = null;
        (runsOf.get(s.way) ?? []).forEach((pts, ri) => {
          let walked = 0;
          for (let i = 1; i < pts.length && found === null; i += 1) {
            const len = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
            if (segDist(s.at, pts[i - 1], pts[i]) < 1) found = { run: ri, arc: walked + Math.hypot(s.at.x - pts[i - 1].x, s.at.y - pts[i - 1].y) };
            walked += len;
          }
        });
        expect(found, `seed ${String(gi)} on its way`).not.toBeNull();
        const { run, arc } = found as unknown as { run: number; arc: number };
        const n = Math.round(arc / half) - 1;
        expect(Math.abs(arc - (n + 1) * half)).toBeLessThan(2);
        expect(s.side, `seed ${String(gi)} at n = ${String(n)}`).toBe(n % 2 === 0 ? 1 : -1);
        const key = `${s.way}#${String(run)}`;
        const c = kept.get(key) ?? 0;
        kept.set(key, c + 1);
        if (c % 2 !== n % 2) byCountRun += 1;
        if (gi % 2 !== n % 2) byCountAll += 1;
        seeds += 1;
      });
    }
    // Not vacuous: positions are skipped (a junction, a band near), so a side by the count of seeds kept would differ.
    expect(seeds).toBeGreaterThan(20);
    expect(byCountRun).toBeGreaterThan(0);
    expect(byCountAll).toBeGreaterThan(0);
  });

  // The plain CITY fixture (the small one's core holds two seeds per radial, the outer one too near the wall to grow).
  for (const [seed, fx] of [
    [1, {}],
    [2, {}],
  ] as const) {
    it(`seed ${String(seed)} ${JSON.stringify(fx)}: S5c's streets leave their arterials on both sides`, { timeout: 240_000 }, () => {
      const g = fixtureGrown(seed, fx);
      const st = g.run.state;
      const cls = new Map(st.ways.map((w) => [w.id, w.class]));
      const lines = new Map(wayLines(g.k, st.ways.map((w) => w.id), GROUND).map((l) => [l.way, l.runs.map((r) => r.points)]));
      let left = 0;
      let right = 0;
      for (const rec of g.run.growth) {
        for (const s of rec.streets) {
          const c = cls.get(s.parent);
          if (c !== 'through' && c !== 'primary') continue;
          const o = s.points[0];
          // The arterial's direction at the street's origin (a vertex of it): from its vertex before to its vertex after.
          for (const run of lines.get(s.parent) ?? []) {
            const i = run.findIndex((q) => q.x === o.x && q.y === o.y);
            if (i <= 0 || i + 1 >= run.length) continue;
            const d = { x: run[i + 1].x - run[i - 1].x, y: run[i + 1].y - run[i - 1].y };
            const f = { x: s.points[1].x - o.x, y: s.points[1].y - o.y };
            if (d.x * f.y - d.y * f.x > 0) left += 1;
            else right += 1;
          }
        }
      }
      // Both sides grow (one proposal per seed, the sides alternating), neither below a fifth of the streets the arterials
      // seeded (a seed's first step may be illegal: it is rejected there).
      expect(left, `left ${String(left)} right ${String(right)}`).toBeGreaterThan(0);
      expect(right, `left ${String(left)} right ${String(right)}`).toBeGreaterThan(0);
      expect(Math.min(left, right) * 5, `left ${String(left)} right ${String(right)}`).toBeGreaterThanOrEqual(left + right);
    });
  }
});

describe('the Stage declarations', () => {
  it('S5c: callback form under S5, the three growth concerns, F-NUM and F-WORK, the growth counters’ laws', () => {
    const s = s5cStage(2);
    expect(s.id).toBe(STAGES.S5);
    expect(s.txForm).toBe('callback');
    expect(s.streamKeys).toEqual(['growth.heading', 'growth.curvature', 'growth.branch']);
    for (const c of s.streamKeys) expect(CONCERNS[c as keyof typeof CONCERNS]).toBeDefined();
    expect(s.ladder).toEqual([
      { failureClass: 'F-NUM', rungs: ['re_propose', 'reject'] },
      { failureClass: 'F-WORK', rungs: ['work_cut'] },
    ]);
    const wl = loadWorkLimits();
    expect(s.workLimits).toEqual([{ ...wl.law('growth.proposals') }, { ...wl.law('growth.candidates') }]);
    expect(s.workLimits.map((l) => l.unit)).toEqual(['landHa', 'landHa']);
    expect(s.inputs).toEqual(['s5.growth']);
    expect(() => s.inputsOf({}, { kind: 'all' })).toThrow(TypeError);
  });

  it('S5d: under S5, F-BUDGET-STAGE’s two rungs', () => {
    const s = s5dStage(3);
    expect(s.id).toBe(STAGES.S5);
    expect(s.ladder).toEqual([{ failureClass: 'F-BUDGET-STAGE', rungs: ['top_up', 'accept_shortfall'] }]);
    expect(() => s.inputsOf(null, { kind: 'all' })).toThrow(TypeError);
  });
});
