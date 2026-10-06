// S8 never throws on a valid district (N-44 (1), N-45 (a); session fix round S1 of M0-b-03, J219; C-0243). F-CUT's
// whole-district runs (M0-b-04, seed 1) found S8 throwing 'tx: face N is not live at L1' on holed #330 and #464: a
// candidate refused after the kernel split ('floor': a child below the block floor, the lane taken out again by
// removeEdges) left the face merged back under a new slot, and the next candidate that reached the kernel split the
// dead slot. The ladder now reads the face's slot again after every refusal that re-walked it, so the next rung cuts
// the live face. Pinned here: both faces, drawn exactly as F-CUT draws them (M0-k-01's `arb.faceSet('holed')` at the
// seed H32("bentcut/holed/1/<i>"), the district built the bench's way), and a property over random holed districts:
// S8 returns (a district it cannot cut is a typed refusal in its report), never throws, and every ladder keeps F-CUT's
// per-face counts.
import fc from 'fast-check';
import { runS8 } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { arb, seedFamily } from '../../../src/fuzz/index.js';
import { districtCase, faceAt } from './support.js';

/** F-CUT's face i of the holed set at seed 1 (M0-b-04's faceSeed and districtSeed, C-0242 (2)). */
function fcutHoled(i: number): ReturnType<typeof districtCase> {
  const s = seedFamily('bentcut/holed/1', i);
  const [face] = fc.sample(arb.faceSet('holed', { scale: 'block' }), { seed: s | 0, numRuns: 1 });
  return districtCase(face.polygon, s >>> 0);
}

/** Random holed districts the property draws (each S8 run is about a second on the kernel's kerb). */
const RUNS = 24;

describe('S8 after a refusal that re-walked the face (C-0243)', () => {
  // #330: a0 'contact', a1 'floor' (the lane taken out: the face under a new slot), a2 'width', then rung (b) cuts.
  // #464: a0, a1 'width', a2 'floor', (b) 'width', then rung (c) cuts. Both threw at that last kernel call before.
  for (const [i, rung] of [
    [330, 'b'],
    [464, 'c'],
  ] as const) {
    it(`F-CUT holed #${String(i)} (seed 1): the rung after the 'floor' refusal cuts the live face`, { timeout: 120_000 }, () => {
      const c = fcutHoled(i);
      const r = runS8(c.input, { report: undefined } as never);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.value.infill.report.refused).toEqual([]);
      const rep = r.value.infill.report.districts[0];
      // The face the 'floor' refusal re-walked: its ladder went on past it and cut on the named rung.
      const floor = rep.rungs.filter((x) => x.why === 'floor');
      expect(floor.length).toBeGreaterThan(0);
      const face = floor[0].face;
      const on = rep.rungs.filter((x) => x.face === face);
      const k = on.findIndex((x) => x.why === 'floor');
      const after = on.slice(k + 1);
      expect(after.at(-1)).toMatchObject({ rung, outcome: 'cut' });
      const ladder = rep.faces.filter((x) => x.face === face);
      expect(ladder).toHaveLength(1);
      expect(ladder[0]).toMatchObject({ outcome: 'cut', facesAfter: 2 });
      // F-CUT on the district: ≤ 6 kernel calls per ladder; the face count never decreases.
      for (const fl of rep.faces) {
        expect(fl.kernelCalls).toBeLessThanOrEqual(6);
        expect(fl.facesAfter).toBeGreaterThanOrEqual(1);
      }
      // Every block's seed points find a live L1 face of the committed arena.
      for (const bf of r.value.infill.blockFaces) for (const q of bf.seeds) expect(faceAt(c.plat, q)).toBeGreaterThanOrEqual(0);
    });
  }

  it('holed districts: S8 never throws; a district it cannot cut is a typed refusal; F-CUT’s per-face counts hold', { timeout: 600_000 }, () => {
    let built = 0;
    fc.assert(
      fc.property(arb.faceSet('holed', { scale: 'block' }), fc.integer({ min: 0, max: 0x7fffffff }), (face, seed) => {
        let c: ReturnType<typeof districtCase>;
        try {
          c = districtCase(face.polygon, seed);
        } catch {
          // A ring the arena refuses is no district (the case builder's, not S8's): skipped.
          return true;
        }
        built += 1;
        let r: ReturnType<typeof runS8>;
        try {
          r = runS8(c.input, { report: undefined } as never);
        } catch (e) {
          throw new Error(`S8 threw on a valid holed district: ${(e as Error).message}`);
        }
        expect(r.ok).toBe(true);
        if (!r.ok) return false;
        for (const x of r.value.infill.report.refused) {
          expect(typeof x.code).toBe('string');
          expect(x.code.length).toBeGreaterThan(0);
        }
        for (const d of r.value.infill.report.districts) {
          for (const fl of d.faces) {
            expect(fl.kernelCalls).toBeLessThanOrEqual(6);
            expect(fl.facesAfter).toBeGreaterThanOrEqual(1);
          }
        }
        return true;
      }),
      { seed: seedFamily('m0b03/fix-s1/holed-never-throws', 0) | 0, numRuns: RUNS },
    );
    // Not vacuous: the draws built districts (the re-walk itself is pinned by the two faces above).
    expect(built).toBeGreaterThanOrEqual(RUNS - 2);
  });
});
