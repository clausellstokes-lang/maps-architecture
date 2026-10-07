// S5c's growth on hand-built arenas (§4.4 S5c; §4.1 callback form; §6.3 ways keyed by the growth stage in acceptance
// order; §5.2 F-NUM, F-WORK; C-0085; C-0254): the records agree with the arena (every street's way and junction read
// back from the arena's own rows), ids and lineages in acceptance order, the run deterministic, the wall never crossed,
// junction arms ≥ 30° apart; F-WORK's low floor closes the queue (work_cut, the map valid); F-NUM's planted refusal
// re-proposes from the next attempt stream, then rejects with a report line; the lanesInfillOnly switch changes only
// extramural growth classes.
import { describe, expect, it } from 'vitest';
import { createRng, err, recomputeLevelDigest, seedKey, STAGES, CONCERNS, type Kernel, type StageId, type Stream } from '@plat/kernel';
import { lineageHash } from '@plat/model';
import { loadWorkLimits, type WorkLimitsTable } from '@plat/tables';
import { growStreets, type GrowthStreams, type S5cRecord, type StreetGrowOptions } from '../../../src/growth/proposals.js';
import { bentArterial, GROUND, handCase, lineAngleDeg, P, properCross, roleEdges, type HandCase } from './support.js';

function streams(seed: number): GrowthStreams {
  const rng = createRng();
  const s = (c: keyof typeof CONCERNS, attempt: number): Stream => rng.stream(seedKey(seed), STAGES.S5 as StageId, CONCERNS[c], { reroll: 0, attempt, epoch: 0, salt: 0 });
  return { heading: s('growth.heading', 0), retry: s('growth.heading', 1), curvature: s('growth.curvature', 0), branch: s('growth.branch', 0) };
}

function grow(c: HandCase, seed: number, opts: StreetGrowOptions = {}): S5cRecord {
  const r = growStreets(c.k, c.area, streams(seed), opts);
  if (!r.ok) throw new Error(`grow: ${r.code} ${r.detail}`);
  return r.value;
}

/** A record as data (its functions and cycles aside). */
function data(rec: S5cRecord): string {
  return JSON.stringify(rec);
}

/** The live vertex a junction's row names (the arena's own rows), as a point. */
function junctionAt(k: Kernel, id: string): { x: number; y: number } | null {
  const r = k.resolve({ role: 'junction', entity: id, ordinal: 0 }, GROUND);
  if (r.view !== 'vertices' || r.vertices.length !== 1) return null;
  const p = k.plat(GROUND);
  return { x: p.vertices.x[r.vertices[0]], y: p.vertices.y[r.vertices[0]] };
}

describe('S5c on a walled hand case', () => {
  it('grows streets whose records agree with the arena: ways, junctions, ids and lineage in acceptance order', () => {
    const c = handCase('dense_core');
    const rec = grow(c, 1);
    expect(rec.streets.length).toBeGreaterThan(4);
    const edges = roleEdges(c.plat, 'way');
    rec.streets.forEach((st, i) => {
      // Ids and lineage in acceptance order: the growth stage's unit, S5, the acceptance index.
      expect(st.way.id).toBe(`way:${String(1 + i)}`);
      expect(st.index).toBe(i);
      expect(st.lineage).toEqual(lineageHash({ arena: GROUND, unit: c.area.unit, stage: STAGES.S5 as StageId, epoch: 0, index: i, reroll: 0 }));
      expect(st.way.class).toBe('secondary');
      expect(st.way.growthStage).toBe(1);
      expect(st.way.provisional).toBe(false);
      // Every recorded step is in the arena: each recorded point a vertex of the way's own edges.
      const mine = edges.get(st.way.id) ?? [];
      expect(mine.length).toBeGreaterThan(0);
      const verts = new Set(mine.flatMap(([a, b]) => [`${a.x},${a.y}`, `${b.x},${b.y}`]));
      for (const q of st.points) expect(verts.has(`${q.x},${q.y}`)).toBe(true);
      // Its origin junction (a T on its parent) and its end junction stand where the record says.
      expect(st.way.from.kind).toBe('junction');
      const from = st.way.from.kind === 'junction' ? junctionAt(c.k, st.way.from.id) : null;
      expect(from).toEqual({ x: st.points[0].x, y: st.points[0].y });
      expect(st.ends).not.toBeNull();
      if (st.way.to.kind === 'junction' && st.ends !== 'snap') {
        const last = st.points[st.points.length - 1];
        expect(junctionAt(c.k, st.way.to.id)).toEqual({ x: last.x, y: last.y });
      }
    });
    // Junction ids follow every standing one's, each named once, each in the arena.
    const ids = rec.junctions.map((j) => j.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const j of rec.junctions) expect(junctionAt(c.k, j.id)).not.toBeNull();
    // The first street leaves the arterial in a T.
    const t0 = rec.junctions.find((j) => j.id === (rec.streets[0].way.from as { id: string }).id);
    expect(t0?.kind).toBe('T');
    expect(t0?.arms).toEqual(['way:0', 'way:1']);
  });

  it('the wall is never crossed: no S5c edge crosses the setback band, every point inside it', () => {
    const c = handCase('dense_core');
    const rec = grow(c, 2);
    const band = [P(-40_000, -40_000), P(40_000, -40_000), P(40_000, 40_000), P(-40_000, 40_000)];
    const edges = roleEdges(c.plat, 'way');
    for (const st of rec.streets) {
      for (const q of st.points) expect(Math.max(Math.abs(q.x), Math.abs(q.y))).toBeLessThanOrEqual(40_000);
      for (const [a, b] of edges.get(st.way.id) ?? []) for (let i = 0; i < 4; i += 1) expect(properCross(a, b, band[i], band[(i + 1) % 4])).toBe(false);
    }
    expect(rec.streets.some((s) => s.ends === 'band')).toBe(true);
  });

  it('every junction it made has its arms ≥ 30° apart (the 30° rule)', () => {
    for (const seed of [1, 2, 3, 4, 5, 6, 7, 8]) {
      const c = handCase('dense_core');
      const rec = grow(c, seed);
      const edges = [...roleEdges(c.plat, 'way').values()].flat();
      for (const j of rec.junctions) {
        if (j.kind === 'end') continue;
        const at = junctionAt(c.k, j.id);
        if (at === null) continue;
        const arms = edges.filter(([a, b]) => (a.x === at.x && a.y === at.y) || (b.x === at.x && b.y === at.y)).map(([a, b]) => (a.x === at.x && a.y === at.y ? { x: b.x - a.x, y: b.y - a.y } : { x: a.x - b.x, y: a.y - b.y }));
        for (let i = 0; i < arms.length; i += 1) {
          for (let k = i + 1; k < arms.length; k += 1) {
            const dot = arms[i].x * arms[k].x + arms[i].y * arms[k].y;
            const ang = (Math.acos(Math.max(-1, Math.min(1, dot / (Math.hypot(arms[i].x, arms[i].y) * Math.hypot(arms[k].x, arms[k].y))))) * 180) / Math.PI;
            expect(ang).toBeGreaterThanOrEqual(29.5);
          }
        }
      }
    }
  });

  it('both sides of the arterial grow streets: the seeds alternate sides along it (C-0254 (3)), walled and ribbon', () => {
    for (const regime of ['dense_core', 'ribbon'] as const) {
      for (const seed of [1, 2, 3, 4]) {
        const c = handCase(regime);
        expect(c.area.seeds.map((s) => s.side)).toEqual([1, -1, 1]);
        const rec = grow(c, seed);
        // The side a street leaves the arterial (way:0, along +x) on: its first step's y.
        const off = rec.streets.filter((s) => s.parent === 'way:0').map((s) => Math.sign(s.points[1].y - s.points[0].y));
        expect(off.filter((x) => x > 0).length, `${regime} ${String(seed)} left`).toBeGreaterThan(0);
        expect(off.filter((x) => x < 0).length, `${regime} ${String(seed)} right`).toBeGreaterThan(0);
        // Each seed's one proposal leaves square to the arterial on its own side (a street leaves its junction square).
        for (const st of rec.streets.filter((x) => x.parent === 'way:0')) {
          const seedOf = c.area.seeds.find((x) => x.at.x === st.points[0].x && x.at.y === st.points[0].y);
          expect(seedOf).toBeDefined();
          expect(Math.sign(st.points[1].y - st.points[0].y)).toBe(seedOf!.side);
          expect(st.points[1].x).toBe(st.points[0].x);
          // The street records the side of the arterial it left, read where it leaves (C-0263 (1)).
          expect(st.side).toBe(seedOf!.side);
        }
      }
    }
  });

  it('at growthArea’s own spacing — seeds half a seed spacing apart, the sides alternating — every seed’s street grows, on both sides (C-0260 (1))', () => {
    for (const regime of ['dense_core', 'ribbon'] as const) {
      const rules = handCase(regime).area.rules;
      const half = rules.seedSpacingCm / 2;
      const D = rules.legality.clearanceCm('secondary');
      // Every half spacing along the arterial, clear of the band or boundary (at ±400 m) by the clearance.
      const m = Math.floor((40_000 - D - 100) / half);
      const xs = Array.from({ length: 2 * m + 1 }, (_, i) => (i - m) * half);
      expect(xs.length).toBeGreaterThanOrEqual(7);
      for (const seed of [1, 2, 3, 4, 5, 6, 7, 8]) {
        const c = handCase(regime, { seeds: xs });
        const rec = grow(c, seed);
        const firsts = rec.streets.filter((s) => s.parent === 'way:0');
        // Each seed's first step is legal, judged against the street across the arterial half a spacing back.
        expect(firsts.length, `${regime} ${String(seed)}: streets from the arterial`).toBe(xs.length);
        const left = firsts.filter((s) => s.points[1].y > s.points[0].y).length;
        const right = firsts.filter((s) => s.points[1].y < s.points[0].y).length;
        expect([left, right], `${regime} ${String(seed)}`).toEqual([m + 1, m]);
      }
    }
  });

  it('walled, at growthArea’s spacing and at 0.9 of it, no street leaving the arterial dead-ends after one or two steps: every later step reads the far side of the way its street left (C-0263 (1))', () => {
    // The seeds half a spacing apart (80 m) and at 0.9 of it (72 m): the flat fixture's pairs, lattice-rounded and on bent
    // runs, lie 77 – 83 m apart, so a street's second step (from ≥ 25 m off the arterial) runs inside the 83 m clearance
    // of the street across. Without the far side read at later steps, 3 – 6 streets per seed at 72 m stop after one step
    // (N-23). The ribbon's 33 m clearance is beyond a second step there at its 30 m stagger.
    const rules = handCase('dense_core').area.rules;
    const D = rules.legality.clearanceCm('secondary');
    for (const share of [1, 0.9]) {
      const pitch = Math.round((rules.seedSpacingCm / 2) * share);
      const m = Math.floor((40_000 - D - 100) / pitch);
      const xs = Array.from({ length: 2 * m + 1 }, (_, i) => (i - m) * pitch);
      for (const seed of [1, 2, 3, 4, 5, 6, 7, 8]) {
        const rec = grow(handCase('dense_core', { seeds: xs }), seed);
        const firsts = rec.streets.filter((s) => s.parent === 'way:0');
        expect(firsts.length, `${String(share)} ${String(seed)}`).toBe(xs.length);
        // A street may end at the band or on a way; none is left a stub by a rejected second or third step.
        const stubs = firsts.filter((s) => s.points.length <= 3 && s.ends === 'dead').map((s) => `${s.way.id}:${String(s.points.length - 1)}`);
        expect(stubs, `${String(share)} ${String(seed)}: dead after one or two steps`).toEqual([]);
      }
    }
  });

  it('on a bent arterial at growthArea’s spacing — 8° (walled) and 6° (ribbon) per seed spacing, short segments — every seed’s street grows, on its own side (C-0262 (1))', () => {
    for (const regime of ['dense_core', 'ribbon'] as const) {
      const rules = handCase(regime).area.rules;
      const half = rules.seedSpacingCm / 2;
      const D = rules.legality.clearanceCm('secondary');
      // Walled: 20 m segments turning 1° each (8° per 160 m spacing); ribbon: 10 m segments turning 1° (6° per 60 m).
      const segCm = regime === 'dense_core' ? 2_000 : 1_000;
      const bent = bentArterial(segCm, 1, Math.ceil(120_000 / segCm), half, 40_000 - D - 100);
      expect(bent.seeds.length).toBeGreaterThanOrEqual(7);
      for (const seed of [1, 2, 3, 4, 5, 6, 7, 8]) {
        const c = handCase(regime, { road: bent.road, seedsAlong: bent.seeds });
        const rec = grow(c, seed);
        const firsts = rec.streets.filter((s) => s.parent === 'way:0');
        expect(firsts.length, `${regime} ${String(seed)}: streets from the arterial`).toBe(bent.seeds.length);
        // Each seed's street leaves on the seed's own side of the arterial (the cross product with its segment there).
        const sides = c.area.seeds.map((sd) => {
          const st = firsts.find((s) => s.points[0].x === sd.at.x && s.points[0].y === sd.at.y);
          if (st === undefined) return 0;
          return Math.sign(sd.along.x * (st.points[1].y - st.points[0].y) - sd.along.y * (st.points[1].x - st.points[0].x));
        });
        expect(sides, `${regime} ${String(seed)}`).toEqual(c.area.seeds.map((sd) => sd.side));
      }
    }
  });

  it('branches: a walled regime grows secondaries only (its lanes are S8’s), branches leaving their parent streets', () => {
    const c = handCase('dense_core');
    const rec = grow(c, 4);
    expect(rec.streets.every((s) => s.way.class === 'secondary')).toBe(true);
    const ids = new Set(rec.streets.map((s) => s.way.id));
    expect(rec.streets.some((s) => ids.has(s.parent))).toBe(true);
  });

  it('is deterministic: two runs on fresh arenas give the same records and the same level digests', () => {
    const a = handCase('dense_core');
    const b = handCase('dense_core');
    const ra = grow(a, 5);
    const rb = grow(b, 5);
    expect(data(rb)).toBe(data(ra));
    for (const level of [0, 1] as const) expect(recomputeLevelDigest(b.plat, level)).toEqual(recomputeLevelDigest(a.plat, level));
  });
});

/** The shipped work-limit table with one counter's law floored at `floor` (per unit 0). */
function lowFloor(counter: string, floor: number): WorkLimitsTable {
  const wl = loadWorkLimits();
  return { table: wl.table, laws: wl.laws, has: (c) => wl.has(c), law: (c) => (c === counter ? { ...wl.law(c), floor, perUnit: 0 } : wl.law(c)) };
}

describe('F-WORK (C-0085)', () => {
  for (const counter of ['growth.candidates', 'growth.proposals'] as const) {
    it(`a low ${counter} floor closes the queue and reports work_cut with the count, the map valid`, () => {
      const c = handCase('dense_core');
      const full = grow(handCase('dense_core'), 6);
      const rec = grow(c, 6, { workLimits: lowFloor(counter, 12) });
      expect(rec.workCut).toEqual({ counter, count: 12, limit: 12 });
      expect(rec.rungs).toContainEqual({ cause: 'F-WORK', rung: 'work_cut', counter, count: 12, limit: 12 });
      expect(rec.work[counter]).toBe(12);
      expect(rec.steps.accepted).toBeLessThan(full.steps.accepted);
      // The streets it accepted stand, each ended (a dead end where the queue closed) and in the arena.
      for (const st of rec.streets) {
        expect(st.ends).not.toBeNull();
        expect(st.way.to.kind === 'junction' && st.way.to.id !== '').toBe(true);
      }
      for (const level of [0, 1] as const) expect(() => recomputeLevelDigest(c.plat, level)).not.toThrow();
    });
  }
});

describe('F-NUM (C-0085)', () => {
  it('a planted precision refusal on one proposal re-proposes it from the next attempt stream; the re-proposal stands', () => {
    const c = handCase('dense_core');
    let planted = false;
    const rec = grow(c, 7, {
      insert: (o, points, wayId, knots, at) => {
        if (!planted && at.proposal === 2 && at.attempt === 0) {
          planted = true;
          return err('E_BELOW_MIN_EDGE', 'planted');
        }
        return c.k.geom.insertChain(o, points, [{ role: 'way', entity: wayId }], 'optional', { pinned: points.map((_, i) => i), knots });
      },
    });
    expect(planted).toBe(true);
    expect(rec.rungs).toContainEqual({ cause: 'F-NUM', rung: 're_propose', proposal: 2, code: 'E_BELOW_MIN_EDGE' });
    expect(rec.rungs.some((r) => r.cause === 'F-NUM' && r.rung === 'reject' && r.proposal === 2)).toBe(false);
    expect(rec.streets.some((s) => s.proposal === 2)).toBe(true);
  });

  it('the re-proposal draws from the next attempt stream: its step length is growth.heading at attempt 1’s first draw', () => {
    const c = handCase('dense_core');
    const [lo, hi] = c.area.rules.stepCm('secondary');
    const u = createRng().stream(seedKey(7), STAGES.S5 as StageId, CONCERNS['growth.heading'], { reroll: 0, attempt: 1, epoch: 0, salt: 0 }).float01();
    const expected = Math.round(lo + (hi - lo) * u);
    let got = -1;
    let planted = false;
    grow(c, 7, {
      insert: (o, points, wayId, knots, at) => {
        if (!planted && at.proposal === 0 && at.attempt === 0) {
          planted = true;
          return err('E_BELOW_MIN_EDGE', 'planted');
        }
        if (got < 0 && at.proposal === 0 && at.attempt === 1) got = Math.hypot(points[points.length - 1].x - points[0].x, points[points.length - 1].y - points[0].y);
        return c.k.geom.insertChain(o, points, [{ role: 'way', entity: wayId }], 'optional', { pinned: points.map((_, i) => i), knots });
      },
    });
    expect(Math.abs(got - expected)).toBeLessThanOrEqual(2);
  });

  it('refused again, the step is rejected with a report line: the proposal ends, the rest grows, the map valid', () => {
    const c = handCase('dense_core');
    const rec = grow(c, 7, {
      insert: (o, points, wayId, knots, at) =>
        at.proposal === 2 ? err('E_SELF_INTERSECT', 'planted') : c.k.geom.insertChain(o, points, [{ role: 'way', entity: wayId }], 'optional', { pinned: points.map((_, i) => i), knots }),
    });
    expect(rec.rungs.filter((r) => r.cause === 'F-NUM' && r.proposal === 2)).toEqual([
      { cause: 'F-NUM', rung: 're_propose', proposal: 2, code: 'E_SELF_INTERSECT' },
      { cause: 'F-NUM', rung: 'reject', proposal: 2, code: 'E_SELF_INTERSECT' },
    ]);
    expect(rec.streets.some((s) => s.proposal === 2)).toBe(false);
    expect(rec.streets.length).toBeGreaterThan(2);
    for (const level of [0, 1] as const) expect(() => recomputeLevelDigest(c.plat, level)).not.toThrow();
  });

  it('a refusal outside F-NUM’s codes is not re-proposed: the step is left out and counted', () => {
    const c = handCase('dense_core');
    const rec = grow(c, 7, {
      insert: (o, points, wayId, knots, at) =>
        at.proposal === 2 ? err('E_INVARIANT', 'planted') : c.k.geom.insertChain(o, points, [{ role: 'way', entity: wayId }], 'optional', { pinned: points.map((_, i) => i), knots }),
    });
    expect(rec.rungs.some((r) => r.cause === 'F-NUM' && r.proposal === 2)).toBe(false);
    expect(rec.refused['E_INVARIANT']).toBe(1);
  });
});

describe('the lanesInfillOnly switch (§4.4: the fusion gate’s time fallback)', () => {
  it('changes nothing in a walled regime: the same records and arena with the switch on and off', () => {
    const off = handCase('dense_core', { lanesInfillOnly: false });
    const on = handCase('dense_core', { lanesInfillOnly: true });
    const a = grow(off, 8);
    const b = grow(on, 8);
    expect(data({ ...b, lanesInfillOnly: false })).toBe(data(a));
    for (const level of [0, 1] as const) expect(recomputeLevelDigest(on.plat, level)).toEqual(recomputeLevelDigest(off.plat, level));
  });

  it('extramurally it stops growth at secondary: lanes grow with it off, none with it on, secondaries in both', () => {
    let lanesOff = 0;
    for (const seed of [8, 9, 10]) {
      const off = grow(handCase('ribbon', { lanesInfillOnly: false, reachCm: 30_000 }), seed);
      lanesOff += off.streets.filter((s) => s.way.class === 'lane').length;
      const on = grow(handCase('ribbon', { lanesInfillOnly: true, reachCm: 30_000 }), seed);
      expect(on.streets.some((s) => s.way.class === 'lane')).toBe(false);
      expect(on.streets.some((s) => s.way.class === 'secondary')).toBe(true);
      expect(on.lanesInfillOnly).toBe(true);
    }
    expect(lanesOff).toBeGreaterThan(0);
  });

  it('defaults to regimes.json’s setting (off)', () => {
    expect(handCase('ribbon').area.rules.lanesInfillOnly).toBe(false);
  });
});

describe('an unwalled stage’s boundary', () => {
  it('a street crossing it is provisional, ends beyond it, and its last step leaves it', () => {
    const c = handCase('ribbon', { reachCm: 30_000 });
    const rec = grow(c, 11);
    const prov = rec.streets.filter((s) => s.provisional);
    expect(prov.length).toBeGreaterThan(0);
    for (const s of prov) {
      expect(s.way.provisional).toBe(true);
      expect(s.ends).toBe('boundary');
      const last = s.points[s.points.length - 1];
      expect(Math.max(Math.abs(last.x), Math.abs(last.y))).toBeGreaterThan(30_000);
      const prev = s.points[s.points.length - 2];
      expect(Math.max(Math.abs(prev.x), Math.abs(prev.y))).toBeLessThanOrEqual(30_000);
    }
    for (const s of rec.streets.filter((x) => !x.provisional)) for (const q of s.points) expect(Math.max(Math.abs(q.x), Math.abs(q.y))).toBeLessThanOrEqual(30_000);
  });

  it('the angle between a street’s steps is the walk’s or a deflection, never a fold back', () => {
    const c = handCase('ribbon', { reachCm: 30_000 });
    const rec = grow(c, 12);
    for (const s of rec.streets) {
      for (let i = 2; i < s.points.length; i += 1) {
        const u = { x: s.points[i - 1].x - s.points[i - 2].x, y: s.points[i - 1].y - s.points[i - 2].y };
        const v = { x: s.points[i].x - s.points[i - 1].x, y: s.points[i].y - s.points[i - 1].y };
        expect(u.x * v.x + u.y * v.y).toBeGreaterThan(-1e-9 * Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
        expect(lineAngleDeg(u, v)).toBeLessThanOrEqual(90);
      }
    }
  });
});
