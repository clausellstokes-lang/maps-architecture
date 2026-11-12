// Q173's cut-down fixtures (M0-c-04 hardening round S6; M0-c-02 S6's N-69 (b) and N-61 (4); M0-e-06 note 25): the S5
// E_INVARIANT refusals of the site spike's stage-2 trace on relief-60 seed 118 and relief-3000 seeds 32, 81, 188 (both
// configurations), diagnosed by the round (checks/M0-c-04-notes.md, section 'Hardening round S6', and the evidence
// folder M0-c-04-s6-evidence/). The boundary this item hands the trace is clean on every one — simple, touching itself
// nowhere at the attraction distance, holding stage 1's wall, each gate squared to its way — and the refusal is made
// inside the trace: its pull (§4.4 S5a *Trace* (2)) draws the gate's squared neighbours 15 – 20 m inward while the gate
// stays pinned, the smoothing and F-WALL's union-simplify rung keep the spike as a V of 30 – 45° whose two sides run
// within about 22° of the gate's way, and the kernel's insertion attracts both sides onto the way's vertex 55 – 81 cm
// beside the gate (§3.6 steps 2 – 3): the wall chain branches there (118, 81) or the gate's vertex leaves the trace
// (32, 188, since M0-c-02 S6). The enceinte's (M0-c-02: `enceinte/trace.ts`, `enceinte/pull.ts`), REPORTED; nothing of
// it is changed here. Each fixture runs the base registration through S4, S5's growth start, stage 2's S5a / S5b
// (`mainRoadsStep`) and its trace (`traceStep`) — the stage-2 trace's refusal, message verbatim — so M0-c-02's next
// round can pin its fix on the same state (the refusal then turns to a commit: a DECLARED move of this file's pins).
// Cost: two derivations through stage 2's trace (about 0.5 – 1.5 min each on the cloud machine).
import { ok, stageText, type Seed } from '@plat/kernel';
import type { WaterSet } from '@plat/model';
import { describe, expect, it } from 'vitest';
import {
  baseArena,
  createRegistry,
  defectOf,
  growthStart,
  mainRoadsStep,
  mainRoadStream,
  registerBase,
  run,
  traceStep,
  type BaseBlueprint,
  type S3Commit,
  type S3Slice,
  type S4Output,
} from '../../../src/index.js';
import { selfTouches } from '../../../src/enceinte/plane.js';
import { insideOf, RELIEF_3000, RELIEF_60 } from './sitefix.js';

/** Stage 2's S5a / S5b and its trace over the base registration's S1, S3 and S4 at `seed` (default configuration). */
function stage2Trace(bp: BaseBlueprint, seed: number): { outline: readonly { x: number; y: number }[]; wall: readonly { x: number; y: number }[]; trace: ReturnType<typeof traceStep> } {
  const registry = createRegistry();
  registerBase(registry);
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('q173.test: the registry holds no base product');
  const kept = product.stages
    .filter((s) => ['S1', 'S3', 'S4', 'S5'].includes(stageText(s.id)))
    .map((s) => (stageText(s.id) === 'S5' ? Object.freeze({ ...s, run: () => ok({}) }) : s));
  product.stages.splice(0, product.stages.length, ...kept);
  const out = run(registry, { ...bp, seed: seed as Seed }, { kind: 'all' }, { arenas: () => [baseArena(bp)] });
  expect(out.report.bugs.filter((x) => x.stage !== 'S5')).toEqual([]);
  const data = out.model.data;
  const state = growthStart({ slice: data.get('s3.slice') as S3Slice, commit: data.get('s3.commit') as S3Commit, s4: data.get('s4') as S4Output, kernel: out.model.kernel, water: data.get('water') as WaterSet });
  const wall = state.stages[0].wall ?? [];
  const m = mainRoadsStep(state, 2, mainRoadStream(state.slice));
  expect(m.ok ? 'ok' : `${m.code} ${m.detail}`).toBe('ok');
  const outline = m.ok && m.value.boundary !== null ? m.value.boundary.set.outline : [];
  return { outline, wall, trace: traceStep(state, 2) };
}

describe('Q173: the stage-2 trace refuses inside the enceinte on a clean handed boundary (REPORTED to M0-c-02)', () => {
  const cases: readonly [string, BaseBlueprint, number, string][] = [
    ['relief-60 default seed 118 (the wall chain branches at the ways\' vertices beside two of its gates)', RELIEF_60, 118, 'E_INVARIANT (wall, enceinte:2) branches: a linear role forms simple chains or rings (§3.10 role consistency)'],
    ['relief-3000 default seed 32 (gate:7\'s vertex leaves the trace for the way\'s vertex 66 cm beside it)', RELIEF_3000, 32, 'E_INVARIANT trace: gate gate:7 is not on the committed trace at its point (§4.2 S3 (9))'],
  ];
  for (const [name, bp, seed, refusal] of cases) {
    it(`${name}: the boundary handed clean, the trace's refusal verbatim`, { timeout: 600_000 }, () => {
      const { outline, wall, trace } = stage2Trace(bp, seed);
      // The item's share is clean: the stage's boundary (the outline the trace's input is made from) simple, touching
      // itself nowhere at the attraction distance, holding stage 1's wall (no point outside, no crossing: the trace's own
      // `defectOf` with that wall as its core).
      expect(outline.length).toBeGreaterThan(3);
      expect(selfTouches(outline)).toBe(false);
      expect(wall.filter((p) => !insideOf(outline, p))).toEqual([]);
      expect(defectOf(outline, [wall])).toBeNull();
      // The trace's refusal, as the site spike records it (M0-e-06's S5 class), verbatim.
      expect(trace.ok ? 'ok' : `${trace.code} ${trace.detail}`).toBe(refusal);
    });
  }
});
