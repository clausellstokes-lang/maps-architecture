// The paths after a refusal that re-walked the face, held by fault injection on the faces F-CUT found them on (holed
// #330 and #464 at seed 1; C-0243; the check's notes N-16, N-17, N-19; C-0423). No honest input reaches them (removeEdges
// restores the face, §2.2 rule 3), so S8's test-side `faults` force each one:
//   N-16  an end row that cannot be written ('end-rows', the lane taken out again) marks the refusal touched: the ladder
//         reads the face's slot again and a later candidate cuts the live face — no throw, the district commits;
//   N-17  a lane `takeOut` cannot remove, or a face not found as it was, abandons the district's run (detect-and-refuse,
//         C-0243 (3)): a typed E_INVARIANT refusal naming the cause, never a throw, nothing committed — the arena's
//         L0–L2 digests recomputed from nothing as before the stage;
//   N-19  the refused batch leaves the shared width map as it was (no width of a lane that does not exist).
import fc from 'fast-check';
import { recomputeLevelDigest, seedKey, type Hash128 } from '@plat/kernel';
import { runS8 } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { arb, seedFamily } from '../../../src/fuzz/index.js';
import { districtCase, GROUND, twoCase } from './support.js';

/** F-CUT's face i of the holed set at seed 1 (M0-b-04's faceSeed and districtSeed, C-0242 (2)), as relocate.test.ts. */
function fcutHoled(i: number): ReturnType<typeof districtCase> {
  const s = seedFamily('bentcut/holed/1', i);
  const [face] = fc.sample(arb.faceSet('holed', { scale: 'block' }), { seed: s | 0, numRuns: 1 });
  return districtCase(face.polygon, s >>> 0);
}

const digests = (c: ReturnType<typeof districtCase>): Hash128[] => [0, 1, 2].map((l) => recomputeLevelDigest(c.plat, l as 0 | 1 | 2));

describe('an end row that cannot be written is a touched refusal: the ladder goes on on the live face (notes N-16)', () => {
  for (const i of [330, 464]) {
    it(`F-CUT holed #${String(i)}, the first end rows failing: no throw, the district commits, the face is cut by a later candidate`, { timeout: 300_000 }, () => {
      const c = fcutHoled(i);
      const r = runS8({ ...c.input, faults: { endRowsFailAt: 1 } }, { report: undefined } as never);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.value.infill.report.refused).toEqual([]);
      const rep = r.value.infill.report.districts[0];
      const refusal = rep.rungs.find((x) => x.why === 'end-rows');
      expect(refusal).toBeDefined();
      if (refusal === undefined) return;
      const on = rep.rungs.filter((x) => x.face === refusal.face);
      const after = on.slice(on.indexOf(refusal) + 1);
      expect(after.some((x) => x.outcome === 'cut')).toBe(true);
      expect(rep.faces.find((x) => x.face === refusal.face)).toMatchObject({ outcome: 'cut', facesAfter: 2 });
      for (const fl of rep.faces) {
        expect(fl.kernelCalls).toBeLessThanOrEqual(6);
        expect(fl.facesAfter).toBeGreaterThanOrEqual(1);
      }
      // The lane taken out again left nothing: every committed lane is in the report and holds its width.
      for (const w of r.value.lanes) expect(c.input.widths.get(w.id)).toBe(w.width);
    });
  }
});

describe('an end-rows refusal re-reads its face like every touched refusal (notes N-16, K03)', () => {
  it('the two-district case, the first end rows failing and the face then not found: the run is abandoned naming the end-rows refusal', { timeout: 300_000 }, () => {
    const c = twoCase();
    const made = c.build();
    const r = runS8({ kernel: made.k, key: GROUND, seedKey: seedKey(c.seed), rung: 'CITY', districts: c.districts, ways: c.ways, seams: c.seams, widths: made.widths, faults: { endRowsFailAt: 1, faceLost: true } }, { report: undefined } as never);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const refused = r.value.infill.report.refused;
    expect(refused.length).toBeGreaterThanOrEqual(1);
    expect(refused[0].detail).toContain("was not found as it was after a 'end-rows' refusal");
  });
});

describe('the run abandoned: a typed refusal, nothing committed, the width map as it was (notes N-17, N-19)', () => {
  const cases = [
    { fault: { takeOutFails: true }, why: 'a lane refused by the floor could not be taken out again' },
    { fault: { faceLost: true }, why: "was not found as it was after a 'floor' refusal" },
  ] as const;
  for (const { fault, why } of cases) {
    it(`F-CUT holed #330 with ${Object.keys(fault)[0]}: E_INVARIANT '${why}', no lane, no block, the digests and widths unchanged`, { timeout: 300_000 }, () => {
      const c = fcutHoled(330);
      const before = digests(c);
      const version = c.plat.version;
      const widths = [...c.input.widths];
      c.input.widths.set('way:a-foreign-way', 450);
      const r = runS8({ ...c.input, faults: fault }, { report: undefined } as never);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      const refused = r.value.infill.report.refused;
      expect(refused).toHaveLength(1);
      expect(refused[0].district).toBe(c.district);
      expect(refused[0].code).toBe('E_INVARIANT');
      expect(refused[0].detail.startsWith(`S8 ${c.district}: `)).toBe(true);
      expect(refused[0].detail).toContain(why);
      expect(r.value.lanes).toEqual([]);
      expect(r.value.blocks).toEqual([]);
      expect(r.value.infill.report.districts).toEqual([]);
      // The transaction left the arena as it was: no commit (the version), the levels' digests recomputed from nothing.
      expect(c.plat.version).toBe(version);
      expect(digests(c)).toEqual(before);
      // The shared width map: what it held before the district's batch, nothing of the refused run's lanes.
      expect([...c.input.widths]).toEqual([...widths, ['way:a-foreign-way', 450]]);
    });
  }
});
