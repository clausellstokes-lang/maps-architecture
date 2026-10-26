// The test support's `faceCase` finds the district face by a point inside it, not by ring equality (the check's note
// N-14; C-0423): on round-joined faces the insertion's snapping moves the inserted ring's vertices off the generator's
// polygon, so the old ring match threw "the district face was not found" — at seedFamily
// `check-m0b03/s/round-joined` face 2 (the note's case) and at faces 3, 18, 26, 34 of the one-face draws there.
import fc from 'fast-check';
import { area2, faceRings } from '@plat/kernel';
import { runS8 } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { arb, seedFamily } from '../../../src/fuzz/index.js';
import { faceCase, ownerOf } from './support.js';

/** The note's draws: face i of a run of round-joined faces at the family's seed 0, and the one-face draw at seed i. */
function noteFace(i: number) {
  const seed = seedFamily('check-m0b03/s/round-joined', 0) | 0;
  return { polygon: fc.sample(arb.faceSet('round-joined'), { seed, numRuns: i + 1 })[i].polygon, seed: (seed + i) >>> 0 };
}
function oneFace(i: number) {
  const seed = seedFamily('check-m0b03/s/round-joined', i) | 0;
  return { polygon: fc.sample(arb.faceSet('round-joined'), { seed, numRuns: 1 })[0].polygon, seed: seed >>> 0 };
}

describe('faceCase locates the district face by a point inside it (notes N-14)', () => {
  const cases = [{ name: 'the note’s face 2', ...noteFace(2) }, ...[3, 18, 26, 34].map((i) => ({ name: `one-face draw ${String(i)}`, ...oneFace(i) }))];
  for (const c of cases) {
    it(`round-joined, ${c.name}: the case builds, its district owns the face the polygon drew, and S8 runs on it`, { timeout: 300_000 }, () => {
      const fcase = faceCase(c.polygon, c.seed);
      // The district's one face: its area that of the drawn outer ring (to the snapping's centimetres along it).
      let owned = 0;
      let area = 0;
      for (let f = 0; f < fcase.plat.slots.face[1].top; f += 1) {
        if (ownerOf(fcase.plat, f) !== fcase.district) continue;
        owned += 1;
        area = Math.abs(area2(faceRings(fcase.plat, 1, f)[0])) / 2;
      }
      expect(owned).toBe(1);
      const drawn = Math.abs(area2(c.polygon[0].map((q) => ({ x: q.x, y: q.y }) as never))) / 2;
      expect(Math.abs(area - drawn)).toBeLessThan(0.01 * drawn);
      const r = runS8(fcase.input, { report: undefined } as never);
      expect(r.ok).toBe(true);
      if (r.ok) expect(r.value.infill.report.refused).toEqual([]);
    });
  }
});
