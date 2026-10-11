// M0-c-06's test support: the test size of the flat fixture (C-0264 (10): a 900 ha frame, 30 ha walled — every growth
// stage runs, K = 3), at which one derivation takes seconds; the CITY size is the harness's run.
export const TEST_SIZE = Object.freeze({ frameHa: 900, walledHa: 30 });

import type { SeedRecord } from '../../src/fusion/index.js';

/** A synthetic seed record that passes every clause (the folds' tests plant one fault at a time). */
export function goodRecord(seed: number, run: 'fusion' | 'integrated', over: Partial<SeedRecord> = {}): SeedRecord {
  const bins = new Array<number>(40).fill(0);
  for (let i = 0; i < 30; i += 1) bins[i] = 100 - 3 * i;
  let steps = 0;
  for (const b of bins) steps += b;
  return {
    seed,
    run,
    bugs: [],
    order: ['S1', 'S3', 'S4', 'S5', 'S8'],
    restarts: 0,
    invocations: { S1: 1, S3: 1, S4: 1, S5: 1, S8: 1 },
    s5: { growth: [1, 2, 3], prune: [1, 2, 3], capacity: [1, 2, 3], topUps: [0, 1, 0] },
    ladder: { 'S8/F-CUT/a': 3 },
    stampsMs: { S1: 1, S3: 2, S4: 3, S5: 4, S8: 5 },
    faces: { districts: 25, cuts: 1_500, blocks: 1_400, s8Refused: 0 },
    junction: { p5: 60, median: 90, share4: 0.05, nodes: 20, nodes4: 1, gaps: [60, 85, 88, 90, 90, 91, 92, 95, 120, 180] },
    turns: { steps, bins, cliff: false },
    drift: [20, 22],
    bands: { comfortable: { blockAreasM2: [3_000, 4_000], cutLengthsM: [80, 120] } },
    roads: [{ k: 1, n: 7, leaving: 7 }, { k: 2, n: 8, leaving: 8 }],
    strips: { faces: 4, lanes: 100, crossings: 0 },
    hausdorff: { blocks: 10, compared: 10, zero: 10, within1cm: 10, beyond: 0, maxCm: 0, split: 0, drifted: 0, driftMaxCm: 0, driftBeyond: 0, commit: 0, s9Refused: 0, kerbReads: 0, missCm: [], misses: [] },
    refusals: { s8: 0, s9: 0, kerbReads: 0, corpusRoof: 1, corpusSpine: 1, kernelDowngrades: 0, kernelWorkLimitHits: 0, unplaced: 0, degraded: 0 },
    corpus: { faces: 300, roof: { faces: 300, downgrades: 1, workLimitHits: 0, failures: 0 }, spine: { faces: 300, downgrades: 1, workLimitHits: 0, failures: 0 } },
    work: [{ counter: 'cut.kernelCalls', stage: 'S8', work: 30, limit: 400, units: 10 }],
    root: `root${String(seed)}`,
    rootS5: `s5-${String(seed)}`,
    ...over,
  };
}
