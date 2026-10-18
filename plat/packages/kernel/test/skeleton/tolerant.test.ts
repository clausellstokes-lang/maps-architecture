// M0-a-11, the hardening round S3 (census D-02 and Q73; §3.8 *Numeric contract*'s 1 mm / 1 cm coalescing, *Post-condition
// validator*): the engine reads the rings strictly — every output before the round — and, only when that gives no
// validated graph, a second time tolerantly, under what is left of the same work law: a vertex next to an event's
// vertices standing within 1 cm of its point joins the event, and an angular order within 1° of one direction that
// does not alternate takes the adjacent swap that makes it alternate. The faces below took the reader's downgrade before
// the round and now validate (the round's declared shift, §3.8 *Decision*): corpus footprints 1144 and 1840 (strict:
// `arc 3 crosses arc 10`, `arc 6 crosses arc 9` — two near-collinear lines 1.9 mm apart leave a face less than 1 mm
// wide, which millimetre rounding cannot hold) and a constant-width river of near-collinear chords (strict: the
// banks meet all along the centre line within a millimetre and the order at a node does not alternate — the relief
// fixtures' water faces' class).
import { describe, expect, it } from 'vitest';
import { runSkeleton } from '../../src/skeleton/skeleton.js';
import { skeleton, skeletonEventLimit, validateSkeleton, type SkeletonGraph, type SkeletonUse } from '../../src/skeleton/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { arcsInFace, pt } from './support.js';

const USES: SkeletonUse[] = ['roof', 'spine', 'regions'];

function ring(flat: readonly number[]): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (let k = 0; k < flat.length; k += 2) out.push(pt(flat[k], flat[k + 1]));
  return out;
}

/** Corpus footprint 1144 (`bench/fixtures/skeleton-corpus/`, seed 20261004): a lattice-snapped cross. */
const C1144 = ring([68822, -389780, 67915, -389937, 68098, -391001, 67182, -391159, 67316, -391937, 68232, -391779, 68382, -392647, 69288, -392491, 69139, -391623, 70617, -391369, 70483, -390590, 69005, -390845]);
/** Corpus footprint 1840. */
const C1840 = ring([-294018, 11106, -293277, 10993, -293224, 11338, -292028, 11155, -291940, 11728, -293136, 11912, -292984, 12900, -293725, 13014, -293877, 12026, -294994, 12197, -295082, 11624, -293965, 11452]);
/** A river 12 m wide, 160 m long: 40 chords of 4 m on each bank, a slow bend, the banks snapped to the lattice. */
const RIVER = ring([
  4325, -1834, 4726, -1832, 5130, -1827, 5533, -1820, 5936, -1811, 6339, -1799, 6741, -1786, 7143, -1771, 7545, -1755, 7946, -1737, 8347, -1719, 8748, -1700, 9148, -1680, 9547, -1660,
  9947, -1640, 10345, -1620, 10744, -1601, 11142, -1584, 11540, -1567, 11937, -1551, 12334, -1537, 12731, -1525, 13128, -1515, 13525, -1507, 13921, -1501, 14318, -1498, 14714, -1497,
  15111, -1498, 15507, -1501, 15904, -1507, 16301, -1515, 16697, -1525, 17094, -1537, 17492, -1551, 17889, -1567, 18287, -1584, 18685, -1601, 19083, -1620, 19482, -1640, 19881, -1660,
  20281, -1680, 20341, -481, 19941, -461, 19541, -441, 19141, -422, 18740, -403, 18339, -385, 17938, -368, 17536, -352, 17133, -338, 16731, -326, 16328, -316, 15925, -307, 15521, -302,
  15118, -298, 14714, -297, 14311, -298, 13907, -302, 13504, -307, 13101, -316, 12698, -326, 12295, -338, 11893, -352, 11491, -368, 11090, -385, 10688, -403, 10288, -422, 9887, -441,
  9488, -461, 9088, -481, 8689, -501, 8291, -520, 7892, -539, 7495, -556, 7097, -572, 6700, -587, 6302, -600, 5906, -611, 5509, -620, 5112, -627, 4716, -632, 4317, -634,
]);

/**
 * A river 8 m wide, 40 m long: 20 chords of 2 m on each bank, almost straight — its banks' edges meet within 1° (not
 * within 1 mrad) of one direction, so the order the tolerant reading takes needs §3.8's 1° and not the 1 mrad of the
 * strict reading's fold rule.
 */
const RIVER_8M = ring([
  4325, -1634, 4526, -1632, 4728, -1629, 4929, -1625, 5127, -1621, 5324, -1618, 5521, -1618, 5717, -1618, 5914, -1621, 6113, -1625, 6314, -1629, 6516, -1632, 6719, -1634, 6923, -1634,
  7126, -1632, 7328, -1629, 7528, -1625, 7727, -1621, 7924, -1618, 8121, -1618, 8319, -1618, 8323, -818, 8121, -818, 7917, -819, 7714, -821, 7513, -825, 7313, -829, 7116, -832, 6919,
  -834, 6723, -834, 6526, -832, 6328, -829, 6129, -825, 5927, -821, 5724, -819, 5521, -818, 5317, -819, 5114, -821, 4913, -825, 4714, -829, 4516, -832, 4317, -834,
]);

/** Runs the service counting the readings that ran to the end of the wavefront. */
function readings(rings: LatticePoint[][], use: SkeletonUse): { finished: number; graph: SkeletonGraph } {
  let finished = 0;
  const r = runSkeleton(rings, use, {}, { finished: () => void (finished += 1) });
  if (!r.ok || r.value.kind !== 'skeleton') throw new Error(`expected a skeleton, got ${JSON.stringify(r).slice(0, 300)}`);
  expect(r.warnings).toEqual([]);
  return { finished, graph: r.value };
}

/** n + r of the cleaned rings: §3.8's work law's arguments. */
function law(g: SkeletonGraph): number {
  let n = 0;
  let r = 0;
  for (const q of g.rings) {
    n += q.length;
    for (let i = 0; i < q.length; i += 1) {
      const a = q[(i + q.length - 1) % q.length];
      const b = q[i];
      const c = q[(i + 1) % q.length];
      if ((b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x) < 0) r += 1;
    }
  }
  return skeletonEventLimit(n, r);
}

describe('the tolerant second reading validates what the strict reading could not (census D-02, Q73)', () => {
  it('corpus footprints 1144 and 1840: validated for every reader, every arc inside the face, within the work law', () => {
    for (const face of [C1144, C1840]) {
      for (const use of USES) {
        const { finished, graph } = readings([face], use);
        // the strict reading collapsed and failed the validator; the tolerant one collapsed and passed
        expect(finished).toBe(2);
        expect(validateSkeleton(graph).ok).toBe(true);
        expect(arcsInFace(graph)).toBe(true);
        expect(graph.events).toBeLessThanOrEqual(law(graph));
      }
    }
  });

  it('a constant-width river of near-collinear chords: the strict reading stops at a node whose order does not alternate, the tolerant one validates', () => {
    for (const use of USES) for (const river of [RIVER, RIVER_8M]) {
      const { finished, graph } = readings([river], use);
      // the strict reading never collapsed (its pairing failed); only the tolerant reading reached the end
      expect(finished).toBe(1);
      expect(validateSkeleton(graph).ok).toBe(true);
      expect(arcsInFace(graph)).toBe(true);
      expect(graph.events).toBeLessThanOrEqual(law(graph));
    }
  });

  it('a face the strict reading validates never reaches the tolerant one', () => {
    const L = [pt(0, 0), pt(2_000, 0), pt(2_000, 500), pt(500, 500), pt(500, 2_000), pt(0, 2_000)];
    for (const face of [L, ring([186023, -286571, 185748, -286371, 185548, -286646, 184998, -286246, 184598, -286796, 184873, -286996, 185073, -286721, 185348, -286921, 185148, -287196, 185423, -287396])]) {
      expect(readings([face], 'roof').finished).toBe(1);
    }
  });

  it('one work law for both readings: the tolerant reading runs under what the strict one left (E_WORK_LIMIT never exceeded twice over)', () => {
    // the strict reading runs as it is; the tolerant reading's every event is left unresolved (the work-limit hook), so it
    // stops at the law less the strict reading's events — the face's downgrade then carries the strict reading's failure
    let runs = 0;
    const r = runSkeleton([RIVER], 'spine', {}, {
      skipResolution: (events) => {
        if (events === 1) runs += 1;
        return runs >= 2;
      },
    });
    if (!r.ok || r.value.kind !== 'downgrade') throw new Error('expected a downgrade');
    expect(r.value.cause.code).toBe('validator');
    // the law's floor of the cleaned ring; the queue charges the event that reaches it, once
    expect(r.value.events).toBe(law(readings([RIVER], 'spine').graph) + 1);
  });
});

describe('the public call takes the same path', () => {
  it('skeleton() validates the three faces', () => {
    for (const face of [C1144, C1840, RIVER, RIVER_8M]) {
      const r = skeleton([face], 'spine');
      expect(r.ok && r.value.kind).toBe('skeleton');
    }
  });
});
