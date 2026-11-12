// Queue row Q149 (hardening round S3; integration-g15's note N-2): S5c grows no secondary street at flat seeds 2, 3 and 6
// on the 900 ha frame with 30 ha walled — the verdict, pinned with its reason. The base registration through S5 (./through.ts),
// S5 replayed stage by stage as M0-x-04's base composes it (S5b, S5a for k ≥ 2; S5c; the prune and trim; S5d), and before
// each S5c the figures that decide its seeds (C-0254 (3): one seed every half seed spacing S / 2 along each arterial run,
// from S / 2, clear of setback lines, walls, shores and reservations by the clearance D and of standing junctions by S / 2):
//   * stage 1 (dense core, ≈ 18.6 ha): the arterial stretches clear by D and S / 2 exist, but each is shorter than the
//     seeds' pitch S / 2 (80 m), and no seed point falls in one — so no seed (traced at seed 2: each of the three radial
//     runs, 251 – 274 m from the plaza to past the wall, is clear only from ≈ 88 – 112 m to ≈ 140 – 160 m of its length;
//     its seed points at 80 m lie inside the plaza's or the wall's clearance, at 160 m inside the other's);
//   * stage 2 (walled rings, ≈ 11 ha between two walls) and stage 3 (ribbon, ≈ 4 ha): no arterial point of the region is
//     clear of the bands by D (83 m walled, 33 m ribbon) at all — so no seed;
// and §4.4 S5c: "a stage with no seed inside its boundary … grows nothing". The verdict: the EXPECTED OUTCOME of the frame
// (CITY's district-scale rules on a seventh of §12.2's 220 ha walled), not a growth defect; the replay is held to the
// registered run (the same S5 root and the same draws, none).
import { describe, expect, it } from 'vitest';
import { ok, type LatticePoint } from '@plat/kernel';
import type { WaterSet } from '@plat/model';
import { FLAT_BLUEPRINT, growthArea, growthStart, pruneAndTrim, s5aStage, s5bStage, s5cStage, s5dStage, wayLines, type GrowthState, type PipelineContext, type S3Commit, type S3Slice, type S4Output } from '../../../src/index.js';
import { footOn, lat } from '../../../src/enceinte/plane.js';
import { insideRing } from '../../../src/siting/geom.js';
import { GROUND } from './support.js';
import { sized, throughS5 } from './through.js';

type XY = { readonly x: number; readonly y: number };

/** What decided stage k's seeds, read before its S5c. */
interface StageSeeds {
  readonly k: number;
  readonly regime: string;
  readonly seeds: number;
  /** The clearance D and the seeds' pitch S / 2 (cm). */
  readonly clearanceCm: number;
  readonly pitchCm: number;
  /** Arterial length inside the stage's region (cm, sampled every 5 m). */
  readonly arterialCm: number;
  /** The greatest distance any arterial point of the region keeps from the bands, reservations and shores (cm). */
  readonly maxClearCm: number;
  /** The arterial stretches clear of those by D and of the standing junctions by S / 2 (cm each, sampled every 5 m). */
  readonly windowsCm: readonly number[];
  readonly proposals: number;
  readonly streets: number;
}

const STEP = 500;

/** Points every `step` cm along a polyline. */
function samples(pts: readonly XY[], step: number): XY[] {
  const out: XY[] = [];
  for (let i = 0; i + 1 < pts.length; i += 1) {
    const a = pts[i];
    const b = pts[i + 1];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    for (let s = 0; s < len; s += step) out.push({ x: a.x + ((b.x - a.x) * s) / len, y: a.y + ((b.y - a.y) * s) / len });
  }
  return out;
}

/** Stage k's seed figures on the growth state as S5c is about to read it (the region as growthArea reads it). */
function seedFigures(state: GrowthState, k: number): Omit<StageSeeds, 'proposals' | 'streets'> {
  const rec = state.stages[k - 1];
  const area = growthArea(state, k);
  const D = area.rules.legality.clearanceCm('secondary');
  const S = area.rules.seedSpacingCm;
  const outer: readonly XY[] = (rec.walled ? rec.wall : null) ?? rec.boundary!.set.outline;
  let inner: readonly XY[] | null = null;
  for (let j = k - 2; j >= 0 && inner === null; j -= 1) {
    const s = state.stages[j];
    if (s.wall !== null) inner = s.wall;
    else if (s.boundary !== null) inner = s.boundary.set.outline;
  }
  const inRegion = (p: XY): boolean => insideRing(outer, p) && (inner === null || !insideRing(inner, p, true));
  const clearOf = area.features.filter((f) => f.kind === 'band' || f.kind === 'reservation' || f.kind === 'shore');
  const cls = new Map(state.ways.map((w) => [w.id, w.class]));
  let arterialCm = 0;
  let maxClearCm = 0;
  const windowsCm: number[] = [];
  for (const l of wayLines(state.kernel, state.ways.map((w) => w.id), GROUND)) {
    const c = cls.get(l.way);
    if (c !== 'through' && c !== 'primary') continue;
    for (const r of l.runs) {
      let run = 0;
      const close = (): void => {
        if (run > 0) windowsCm.push(run);
        run = 0;
      };
      for (const q0 of samples(r.points, STEP)) {
        const q = lat(q0 as LatticePoint);
        if (!inRegion(q)) {
          close();
          continue;
        }
        arterialCm += STEP;
        let d2 = Infinity;
        for (const f of clearOf) d2 = Math.min(d2, footOn(q, f.a, f.b).d2);
        maxClearCm = Math.max(maxClearCm, Math.sqrt(d2));
        const nearJunction = area.junctions.some((j) => (j.at.x - q.x) * (j.at.x - q.x) + (j.at.y - q.y) * (j.at.y - q.y) < S * S * 0.25);
        if (d2 >= D * D && !nearJunction) run += STEP;
        else close();
      }
      close();
    }
  }
  return { k, regime: rec.regime, seeds: area.seeds.length, clearanceCm: D, pitchCm: S / 2, arterialCm, maxClearCm, windowsCm };
}

interface S5In {
  readonly slice: S3Slice;
  readonly commit: S3Commit;
  readonly s4: S4Output;
  readonly water: WaterSet;
}

/** S5 replayed as the base composes it, each stage's seed figures read before its S5c. */
function traced(seed: number): { stages: StageSeeds[]; root: string; draws: number } {
  const stages: StageSeeds[] = [];
  const t = throughS5(sized(FLAT_BLUEPRINT, 900, 30), seed, {
    s5: (input: unknown, ctx: PipelineContext) => {
      if (input === null) return ok({});
      const i = input as S5In;
      const state = growthStart({ slice: i.slice, commit: i.commit, s4: i.s4, kernel: ctx.kernel, water: i.water, key: GROUND });
      const sctx = ctx as never;
      const all = { kind: 'all' } as const;
      for (let k = 1; k <= i.slice.site.land.stagesHa.length; k += 1) {
        if (k >= 2) {
          const sb = s5bStage(k);
          const m = sb.run(sb.inputsOf({ growth: state }, all), sctx);
          if (!m.ok) return m;
          const sa = s5aStage(k);
          const a = sa.run(sa.inputsOf({ growth: state }, all), sctx);
          if (!a.ok) return a;
        }
        const fig = state.stages[k - 1].boundary === null ? null : seedFigures(state, k);
        const sc = s5cStage(k);
        const g = sc.run(sc.inputsOf({ growth: state }, all), sctx);
        if (!g.ok) return g;
        const pr = pruneAndTrim({ state, k, record: g.value });
        if (!pr.ok) return pr;
        const sd = s5dStage(k);
        const cap = sd.run(sd.inputsOf({ growth: state }, all), sctx);
        if (!cap.ok) return cap;
        if (fig !== null) stages.push({ ...fig, proposals: g.value.proposalsMade, streets: g.value.streets.length + (cap.value.rim?.streets.length ?? 0) });
      }
      return ok({});
    },
  });
  return { stages, root: t.root, draws: t.draws };
}

describe('Q149: no secondary street at flat seeds 2, 3 and 6 on the 900 ha / 30 ha walled frame — the frame, not a defect', () => {
  for (const seed of [2, 3, 6]) {
    it(`seed ${String(seed)}: no stage holds a seed, each for its stated reason; S5c draws nothing and grows nothing`, { timeout: 240_000 }, () => {
      const plain = throughS5(sized(FLAT_BLUEPRINT, 900, 30), seed);
      const t = traced(seed);
      // The replay is the registered composition: the same S5 root, and no draw of the growth stage's streams in either.
      expect(t.root).toBe(plain.root);
      expect(plain.draws).toBe(0);
      expect(t.draws).toBe(0);
      expect(plain.s5?.growth.map((g) => [g.k, g.seeds, g.proposalsMade, g.streets.length])).toEqual([
        [1, 0, 0, 0],
        [2, 0, 0, 0],
        [3, 0, 0, 0],
      ]);
      expect(plain.s5?.capacity.map((c) => c.topUp)).toEqual(['none', 'none', 'none']);
      expect(t.stages.map((s) => s.regime)).toEqual(['dense_core', 'walled_rings', 'ribbon']);
      for (const s of t.stages) {
        expect(s.seeds).toBe(0);
        expect(s.proposals).toBe(0);
        expect(s.streets).toBe(0);
        expect(s.arterialCm).toBeGreaterThan(0);
      }
      const [one, two, three] = t.stages;
      // Stage 1: land clear by D (83 m) and S / 2 (80 m) lies along the arterials, but every stretch of it is shorter than
      // the seeds' pitch (S / 2 = 80 m) and no seed point falls in one.
      expect(one.clearanceCm).toBe(8_300);
      expect(one.pitchCm).toBe(8_000);
      expect(one.windowsCm.length).toBeGreaterThan(0);
      for (const w of one.windowsCm) expect(w).toBeLessThan(one.pitchCm);
      // Stages 2 and 3: no arterial point of the region is clear of the bands by D at all.
      expect(two.clearanceCm).toBe(8_300);
      expect(two.maxClearCm).toBeLessThan(two.clearanceCm);
      expect(two.windowsCm).toEqual([]);
      expect(three.clearanceCm).toBe(3_300);
      expect(three.maxClearCm).toBeLessThan(three.clearanceCm);
      expect(three.windowsCm).toEqual([]);
      // The frame is the cause: the same seed on Q150's boundary frame (1 100 ha, 50 ha walled; stage 1 31.25 ha) seeds
      // stage 1, draws and grows secondary streets.
      const big = throughS5(sized(FLAT_BLUEPRINT, 1_100, 50), seed);
      expect(big.s5?.growth[0].seeds).toBeGreaterThan(0);
      expect(big.draws).toBeGreaterThan(0);
      expect(big.s5?.growth[0].streets.some((s) => s.way.class === 'secondary')).toBe(true);
    });
  }
});
