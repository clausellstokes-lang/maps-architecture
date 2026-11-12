// The held enclosure (M0-c-04 hardening round S5; C-0475 (2); §4.4 S5a *Boundary*: "the union keeps the stages nested
// even where a moat raised T just outside the previous wall"). Stage 1's pull (§4.4 S5a *Trace* (2)) can carry its wall
// up to its 40 m band beyond stage 1's own boundary, and stage 2's boundary — the level set of T over stage 1's selection
// alone — then let points of that wall stand outside it, so the boundary handed to the stage-2 trace crossed the previous
// enceinte (the trace's `core`) before any pull ran. With a walled stage's enclosure held with the standing wall and its
// clearance, the wall stands inside the stage's boundary.
// * Q88 (M0-c-05 N-s2c-4: the site harness on relief-60, default configuration, at its test size — M0-x-04's 900 ha
//   frame with 30 ha walled — seeds 1 and 2): seed 2's stage-1 wall stood up to 22 m outside stage 2's boundary (two
//   points). Its S5 still refuses after the round — the wall's share (the water splice self-touches; REPORTED to M0-c-02
//   S6) — so the pin runs the base registration through S4, then S5's growth start and stage 2's S5a / S5b
//   (`mainRoadsStep`) on S5's rank, and reads the boundary handed to the trace (about 20 – 40 s). Q88's CITY reading,
//   relief-60 default seed 1, the same (nine points up to 2.3 m outside; about 1 – 2 min).
//   SINCE M0-e-02 S2 (C-0498: a river whose re-traces fail is re-traced along its descent line; the session's seam at
//   that landing, J786) seed 2 derives another river at the test size — its stage-1 wall stands inside stage 2's plain
//   boundary and the repair no longer runs there — so the test-size case is SEED 12, the first seed of 1 – 70 on which
//   the plain boundary leaves the wall outside on that tree (nine points up to 5.4 m; seeds 13, 22, 38, 58 and 68 likewise).
// * The seeds whose S5 now commits (M0-e-06 S3's relief-60 default S5 E_SELF_INTERSECT seeds 13, 84, 156, 162: the trace
//   handed a boundary through stage 1's wall): each derived through S5 at CITY (about 1 – 3.5 min each; ≈ 5 – 14 min).
// The coarse configuration's seeds are held-coarse.test.ts's.
import { ok, stageText, type Cm, type Seed } from '@plat/kernel';
import type { WaterSet } from '@plat/model';
import { describe, expect, it } from 'vitest';
import {
  baseArena,
  createRegistry,
  defectOf,
  growthStart,
  landOf,
  mainRoadsStep,
  mainRoadStream,
  registerBase,
  RIVER_BLUEPRINT,
  run,
  stageBoundary,
  type BaseBlueprint,
  type S3Commit,
  type S3Slice,
  type S4Output,
} from '../../../src/index.js';
import { deriveThroughS5, insideOf, RELIEF_60, roundBreaks, testSized } from './sitefix.js';

/** Stage 2's S5a / S5b over the base registration's S1, S3 and S4 at `seed`: stage 1's wall and stage 2's record. */
function stage2(bp: BaseBlueprint, seed: number): { line: readonly { x: Cm; y: Cm }[]; selection: Uint8Array; state: ReturnType<typeof growthStart>; plain: ReturnType<typeof stageBoundary>; m: ReturnType<typeof mainRoadsStep> } {
  const registry = createRegistry();
  registerBase(registry);
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('held.test: the registry holds no base product');
  // S1, S3 and S4 as registered; S5 kept in the order (its rank, §4.1) with a run that writes nothing, so stage 2's
  // S5a / S5b run below on S5's rank, as the registered S5 runs them, and stop before its trace.
  const kept = product.stages
    .filter((s) => ['S1', 'S3', 'S4', 'S5'].includes(stageText(s.id)))
    .map((s) => (stageText(s.id) === 'S5' ? Object.freeze({ ...s, run: () => ok({}) }) : s));
  product.stages.splice(0, product.stages.length, ...kept);
  const out = run(registry, { ...bp, seed: seed as Seed }, { kind: 'all' }, { arenas: () => [baseArena(bp)] });
  expect(out.report.bugs.filter((x) => x.stage !== 'S5')).toEqual([]);
  const data = out.model.data;
  const slice = data.get('s3.slice') as S3Slice;
  const commit = data.get('s3.commit') as S3Commit;
  const s4 = data.get('s4') as S4Output;
  const water = data.get('water') as WaterSet;
  const state = growthStart({ slice, commit, s4, kernel: out.model.kernel, water });
  const wall = state.stages[0].wall;
  expect(wall).not.toBeNull();
  const selection = state.enclosure;
  expect(selection).not.toBeNull();
  // Stage 2's boundary over stage 1's selection alone, read before the step re-settles T.
  const plain = stageBoundary(state.field, 2, slice.site.land, { enclosure: selection });
  const m = mainRoadsStep(state, 2, mainRoadStream(slice));
  return { line: wall as readonly { x: Cm; y: Cm }[], selection: selection as Uint8Array, state, plain, m };
}

describe('the enclosure of stage k − 1 is held with the standing wall (C-0475 (2))', () => {
  const handed: readonly [string, BaseBlueprint, number, string][] = [
    ['relief-60 default at the test size, seed 12 (Q88\'s class; seed 2 until M0-e-02 S2 moved its river)', testSized(RELIEF_60), 12, 'nine points up to 5.4 m'],
    ['relief-60 default at CITY, seed 1 (Q88\'s CITY reading)', RELIEF_60, 1, 'nine points up to 2.3 m'],
  ];
  for (const [name, bp, seed, was] of handed) {
    it(`${name}: stage 2's boundary holds stage 1's wall (was ${was} outside), the handed boundary clear of it`, { timeout: 600_000 }, () => {
      const { line, selection, state, plain, m } = stage2(bp, seed);
      // The plain boundary (over stage 1's selection alone) leaves points of stage 1's wall outside it: the repair runs.
      expect(line.filter((p) => !insideOf(plain.set.outline, p)).length).toBeGreaterThan(0);
      expect(m.ok).toBe(true);
      if (!m.ok) return;
      const b = m.value.boundary;
      expect(b).not.toBeNull();
      if (b === null) return;
      const outline = b.set.outline;
      // Every point of stage 1's wall inside stage 2's boundary.
      expect(line.filter((p) => !insideOf(outline, p))).toEqual([]);
      // The boundary the stage-2 trace is handed crosses neither stage 1's wall nor its own line (`defectOf`, the trace's
      // own detection, with stage 1's line as the core): it read 'core' before the round.
      expect(defectOf(outline, [line])).toBeNull();
      // The land is exact as before: the enclosure's land is stage 1's selection's, the held nodes land the stage adds.
      expect(b.enclosureCm2).toBe(landOf(state.field, selection));
      expect(b.addedCm2).toBe(b.landCm2 - b.enclosureCm2);
      expect(b.folded).toBe(false);
    });
  }

  it('a boundary that already holds the wall before it is the plain one (the repair\'s trigger): RIVER 900 ha / 30 ha seed 2, its wall 6.6 m inside', { timeout: 600_000 }, () => {
    // M0-c-02's bend.test fixture (Q40): stage 1's wall lies inside stage 2's plain boundary, nearer it than the
    // clearance; the held set would add nodes there and move the boundary, so the repair must not run.
    const bp: BaseBlueprint = { ...RIVER_BLUEPRINT, size: { ...RIVER_BLUEPRINT.size, areaHa: 900 }, walledHa: 30 };
    const { line, plain, m } = stage2(bp, 2);
    expect(line.filter((p) => !insideOf(plain.set.outline, p))).toEqual([]);
    expect(m.ok).toBe(true);
    if (!m.ok) return;
    const b = m.value.boundary;
    expect(b).not.toBeNull();
    if (b === null) return;
    expect(b.threshold.t).toBe(plain.threshold.t);
    expect(Array.from(b.set.selected)).toEqual(Array.from(plain.set.selected));
    expect(b.enclosureCm2).toBe(plain.enclosureCm2);
  });

  for (const seed of [13, 84, 156, 162]) {
    it(`relief-60 default seed ${String(seed)} at CITY: S5 commits (was E_SELF_INTERSECT, F-WALL), every walled stage's boundary holding the wall before it`, { timeout: 900_000 }, () => {
      const d = deriveThroughS5(RELIEF_60, seed, 'default');
      expect(d.bugs).toEqual([]);
      expect(d.growth).toBeDefined();
      if (d.growth === undefined) return;
      expect(d.growth.stages.length).toBe(3);
      expect(d.growth.stages[1].walled).toBe(true);
      expect(roundBreaks(d.growth)).toEqual([]);
    });
  }
});
