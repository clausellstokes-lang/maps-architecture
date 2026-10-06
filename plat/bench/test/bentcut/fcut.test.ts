// F-CUT's bars (M0-b-04; §4.6 step 8: "on 10⁵ random concave and holed faces the ladder ends in ≤ 6 kernel calls and the
// face count never decreases; each district reports its substitution residue share, soft bound ≤ 5 %"; C-0036): the
// counters reproduce run to run, the bounded run's depth-0 ladder is S8's own, the fold judges what the bar says, and
// the bar holds on the PR tier's sample of the faces (the 10⁵ run is the harness's, `bench -- bentcut`).
import { runS8 } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import {
  depthOneLimits,
  districtSeed,
  faceAt,
  faceDistrict,
  FCUT_MAX_CALLS,
  fcutTasks,
  foldFcut,
  foldResidue,
  NO_DEEP,
  residueTasks,
  runFcut,
  runFull,
  runTask,
  type FcutRecord,
  type FullRecord,
} from '../../src/bentcut/index.js';

const NO_REPORT = { report: undefined } as never;

describe('the F-CUT counters', () => {
  it('reproduce run to run (seeded): the same faces give the same records and the same fold', { timeout: 600_000 }, () => {
    const tasks = fcutTasks(8, 11);
    const a = tasks.map(runFcut);
    const b = tasks.map(runFcut);
    expect(b).toEqual(a);
    expect(foldFcut(b, [])).toEqual(foldFcut(a, []));
    const whole = residueTasks(2, 11);
    const x = whole.map(runFull);
    const y = whole.map(runFull);
    expect(y).toEqual(x);
    // Not vacuous: the faces were cut and their counts read.
    expect(a.some((r) => r.kernelCalls > 0)).toBe(true);
    expect(x.some((r) => r.ladders.n > 1 && r.work.kernelCalls > 0)).toBe(true);
    // Another seed gives other faces and other counts.
    expect(fcutTasks(8, 12).map(runFcut)).not.toEqual(a);
  });

  it('the bounded run’s depth-0 ladder is the whole run’s: the same rungs, kernel calls, outcome and faces left', { timeout: 600_000 }, () => {
    let compared = 0;
    for (const kind of ['concave', 'holed'] as const) {
      for (let i = 0; i < 4; i += 1) {
        const face = faceAt(kind, i, 3);
        const seed = districtSeed(kind, 3, i);
        const bounded = faceDistrict(face.polygon, seed, { workLimits: depthOneLimits(), deepFactor: NO_DEEP });
        const whole = faceDistrict(face.polygon, seed);
        const rb = runS8(bounded.input, NO_REPORT);
        const rw = runS8(whole.input, NO_REPORT);
        expect(rb.ok && rw.ok).toBe(true);
        if (!rb.ok || !rw.ok) continue;
        const db = rb.value.infill.report.districts[0];
        const dw = rw.value.infill.report.districts[0];
        const top = db.faces.find((f) => f.depth === 0);
        expect(top).toBeDefined();
        expect(dw.faces.find((f) => f.depth === 0)).toEqual(top);
        expect(db.stops[0]).toEqual(dw.stops[0]);
        const addr = top?.face;
        expect(db.rungs.filter((r) => r.face === addr)).toEqual(dw.rungs.filter((r) => r.face === addr));
        // The bound took: nothing below depth 1 was cut in the bounded run.
        expect(db.faces.every((f) => f.depth <= 1)).toBe(true);
        expect(db.faces.filter((f) => f.depth === 1).every((f) => f.outcome === 'work_cut' && f.kernelCalls === 0)).toBe(true);
        if (top?.outcome === 'cut' || top?.outcome === 'slit') compared += 1;
      }
    }
    expect(compared).toBeGreaterThan(2);
  });
});

function rec(over: Partial<FcutRecord> = {}): FcutRecord {
  return { phase: 'fcut', kind: 'concave', i: 0, setup: null, refused: null, kernelCalls: 1, outcome: 'cut', facesAfterLadder: 2, facesBefore: 1, facesAfter: 2, ...over };
}

describe('the F-CUT fold judges the bar as §4.6 step 8 states it', () => {
  it('passes at ≤ 6 kernel calls and fails at 7; fails on a decrease, an S8 refusal or no face run', () => {
    expect(FCUT_MAX_CALLS).toBe(6);
    expect(foldFcut([rec(), rec({ kernelCalls: 6 })], []).pass).toBe(true);
    const seven = foldFcut([rec(), rec({ kernelCalls: 7 })], []);
    expect(seven.pass).toBe(false);
    expect(seven.maxKernelCalls).toBe(7);
    expect(seven.callsHistogram).toEqual({ '1': 1, '7': 1 });
    expect(foldFcut([rec(), rec({ facesAfter: 0 })], []).pass).toBe(false);
    expect(foldFcut([rec(), rec({ facesAfterLadder: 0 })], []).decreases).toBe(1);
    expect(foldFcut([rec(), rec({ refused: 'E_WORK_LIMIT x' })], []).pass).toBe(false);
    expect(foldFcut([], []).pass).toBe(false);
    // A face the kernel would not build is no S8 input: counted, outside the bar.
    const setup = foldFcut([rec(), rec({ setup: 'E_X', kernelCalls: 99 })], []);
    expect(setup.pass).toBe(true);
    expect([setup.setupRefused, setup.run, setup.faces]).toEqual([1, 1, 2]);
  });

  it('every depth of the whole districts is judged with it: a decrease, a ladder over 6 calls or a refused district fails', () => {
    const full = { phase: 'full', setup: null, refused: null, ladders: { n: 5, maxCalls: 6, minFacesAfter: 1, decreases: 0 }, facesBefore: 1, facesAfter: 4 } as unknown as FullRecord;
    expect(foldFcut([rec()], [full, full]).pass).toBe(true);
    const lost = { ...full, ladders: { n: 2, maxCalls: 1, minFacesAfter: 0, decreases: 1 }, facesAfter: 0 } as FullRecord;
    const both = foldFcut([rec()], [full, lost]);
    expect(both.allDepths).toEqual({ districts: 2, ladders: 7, maxKernelCalls: 6, decreases: 2, refused: 0 });
    expect(both.pass).toBe(false);
    expect(foldFcut([rec()], [full, { ...full, ladders: { ...full.ladders, maxCalls: 7 } } as FullRecord]).pass).toBe(false);
    expect(foldFcut([rec()], [full, { ...full, facesAfter: 0 } as FullRecord]).pass).toBe(false);
    const threw = foldFcut([rec()], [full, { ...full, refused: 'threw: tx: face 4 is not live at L1' } as FullRecord]);
    expect(threw.allDepths.refused).toBe(1);
    expect(threw.pass).toBe(false);
    // A face the kernel would not build stays outside.
    expect(foldFcut([rec()], [full, { ...full, setup: 'E_X' } as FullRecord]).pass).toBe(true);
  });
});

describe('a throw on a face', () => {
  it('is recorded on that face as a refusal that fails the bar, and the run goes on', () => {
    const bad = runTask({ phase: 'fcut', kind: 'no-such-kind' as never, i: 0, seed: 1 });
    expect(bad.phase).toBe('fcut');
    expect((bad as FcutRecord).refused).toMatch(/^threw: /);
    expect(foldFcut([rec(), bad as FcutRecord], []).pass).toBe(false);
    const whole = runTask({ phase: 'full', kind: 'no-such-kind' as never, i: 0, seed: 1 }) as FullRecord;
    expect(whole.refused).toMatch(/^threw: /);
  });

  it('the two whole districts the 10⁵ run found S8 throwing on (holed #330 and #464, seed 1) run whole and hold the bar', { timeout: 600_000 }, () => {
    // The bar run's find (checkpoint 2026-10-06 15:37; M0-b-03's fix C-0243): a 'floor' refusal left the face under a
    // new slot and the next candidate split the dead slot ('tx: face N is not live at L1'). Pinned here so the harness's
    // own tests, not only the 10⁵ run, fail when S8 throws on them again.
    const whole = [330, 464].map((i) => runTask({ phase: 'full', kind: 'holed', i, seed: 1 }) as FullRecord);
    for (const w of whole) {
      expect(w.setup).toBeNull();
      expect(w.refused).toBeNull();
      expect(w.ladders.n).toBeGreaterThan(1);
    }
    const f = foldFcut([rec()], whole);
    expect(f.allDepths.districts).toBe(2);
    expect(f.allDepths.refused).toBe(0);
    expect(f.pass).toBe(true);
  });
});

describe('the substitution residue per district (soft ≤ 5 %, reported)', () => {
  it('folds each district’s share and soft flag as S8 reports them', () => {
    const d = (share: number, soft: boolean, area: number, built: number): FullRecord => ({ phase: 'full', setup: null, refused: null, residue: { areaCm2: area, builtCm2: built, share, soft } }) as unknown as FullRecord;
    const r = foldResidue([d(0, false, 0, 100), d(0.5, true, 50, 100), d(0.04, false, 4, 100)]);
    expect(r.districts).toBe(3);
    expect(r.softExceeded).toBe(1);
    expect(r.landShare).toBeCloseTo(54 / 300, 12);
    expect(r.perDistrict.max).toBe(0.5);
    expect(r.verdict).toBe('reported');
  });

  it('on whole districts of the faces: each share is residue / built, flagged above 5 %', { timeout: 600_000 }, () => {
    const recs = residueTasks(6, 5).map(runFull);
    for (const r of recs) {
      expect(r.setup).toBeNull();
      expect(r.refused).toBeNull();
      expect(r.residue.builtCm2).toBeGreaterThan(0);
      expect(r.residue.share).toBeCloseTo(r.residue.areaCm2 / r.residue.builtCm2, 12);
      expect(r.residue.soft).toBe(r.residue.areaCm2 > 0.05 * r.residue.builtCm2);
    }
    // The record's ladders are every depth of S8's own report (F-CUT judges them all): read against a direct runS8.
    let deeper = 0;
    // holed #28 of seed 5: a ladder below depth 0 costs more kernel calls (2) than the face's own (1).
    for (const t of [...residueTasks(2, 5), { phase: 'full' as const, kind: 'holed' as const, i: 28, seed: 5 }]) {
      const r = runFull(t);
      const fd = faceDistrict(faceAt(t.kind, t.i, t.seed).polygon, districtSeed(t.kind, t.seed, t.i));
      const own = runS8(fd.input, NO_REPORT);
      expect(own.ok).toBe(true);
      if (!own.ok) continue;
      const faces = own.value.infill.report.districts[0].faces;
      expect(r.ladders.n).toBe(faces.length);
      expect(r.ladders.maxCalls).toBe(Math.max(...faces.map((f) => f.kernelCalls)));
      expect(r.work).toEqual(own.value.infill.report.districts[0].work);
      const top = faces.find((f) => f.depth === 0)?.kernelCalls ?? 0;
      if (faces.some((f) => f.depth > 0 && f.kernelCalls > top)) deeper += 1;
    }
    expect(deeper).toBeGreaterThan(0);
  });
});

describe('F-CUT on the PR tier’s sample', () => {
  it('the ladder ends in ≤ 6 kernel calls and the face count never decreases (60 concave and holed faces)', { timeout: 600_000 }, () => {
    const recs = fcutTasks(60, 1).map(runFcut);
    const f = foldFcut(recs, []);
    expect(f.s8Refused).toBe(0);
    expect(f.run).toBeGreaterThan(50);
    expect(f.maxKernelCalls).toBeLessThanOrEqual(6);
    expect(f.decreases).toBe(0);
    expect(f.pass).toBe(true);
    expect(f.outcomes['cut'] ?? 0).toBeGreaterThan(20);
    expect(f.byKind).toEqual({ concave: 30, holed: 30 });
    // The arena's count is read, not assumed: a cut leaves the district two L1 faces, a block or a slit one — the same
    // count the ladder reports (the bounded run cuts nothing below depth 0).
    for (const r of recs) {
      expect(r.facesBefore).toBe(1);
      expect(r.facesAfter).toBe(r.facesAfterLadder);
      expect(r.facesAfter).toBe(r.outcome === 'cut' ? 2 : 1);
    }
  });

  it('a face count read from the arena below the count before fails the bar (the arena’s count, not the report’s)', () => {
    expect(foldFcut([rec({ facesBefore: 2, facesAfter: 1, facesAfterLadder: 2 })], []).decreases).toBe(1);
  });
});
