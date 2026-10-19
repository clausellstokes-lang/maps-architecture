// M0-a-06: random batch sequences (§13.1's B-FUZZ bar for this item's writers — 0 crashes, 0 invalid outputs): ways,
// finer chains, whole-chain and stretch removals (a stretch's far part rekeyed first, or not — then role consistency
// refuses), re-owns and clears, each batch either committed — the arena then passes every oracle (§3.10's rows as
// M0-a-04 / M0-a-05's validator and M0-a-03's index-state check judge them) — or refused with the arena as it was.
import { describe, expect, it } from 'vitest';
import { tx } from '../../src/tx/index.js';
import { ALONG_MIX, DEFAULT_MIX, randomBatch, rng, type Live, type Mix } from './fuzzgen.js';
import { framed, healthy, spec, state } from './support.js';

/** Commits and refusals per batch kind over every seed (the last test checks each kind ran). */
const tally = new Map<string, { committed: number; refused: number }>();

describe('random batch sequences: every commit valid, every refusal a no-op', () => {
  for (let seed = 1; seed <= 24; seed++) {
    it(`seed ${seed}`, () => {
      const r = rng(seed * 7919);
      const p = framed();
      const live: Live = { ways: [], kerbs: [], next: 0 };
      let committed = 0;
      let refused = 0;
      for (let step = 0; step < 14; step++) {
        const before = state(p);
        const snapshot: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
        const b = randomBatch(p, live, r);
        const res = tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn);
        const row = tally.get(b.kind) ?? { committed: 0, refused: 0 };
        tally.set(b.kind, row);
        if (res.ok) {
          if (res.value.record !== null) {
            committed++;
            row.committed++;
          }
          healthy(p);
        } else {
          row.refused++;
          refused++;
          expect(state(p)).toBe(before);
          live.ways = snapshot.ways;
          live.kerbs = snapshot.kerbs;
        }
      }
      expect(committed + refused).toBeGreaterThan(0);
    }, 120_000);
  }
});

/**
 * The sequences that found this item's defects in wide runs (seeds × 7919 into the generator; C-0185 (3), (4)): a chain's
 * own corner on a split vertex straightened by a dissolution (286); an own-child region's rings missing from a removal's
 * re-walk (418, 1072) and a demoted edge's side materialised twice (649); a removal ending a one-ring beside an edge
 * (5413, 5606, a lane-heavy mix). Each must now end valid.
 */
const REGRESSIONS: { seed: number; steps: number; mix: Mix; mult?: number }[] = [
  { seed: 286, steps: 20, mix: DEFAULT_MIX },
  { seed: 418, steps: 20, mix: DEFAULT_MIX },
  { seed: 649, steps: 20, mix: DEFAULT_MIX },
  { seed: 1072, steps: 20, mix: DEFAULT_MIX },
  { seed: 5413, steps: 30, mix: { way: 0.25, lane: 0.5 } },
  { seed: 5606, steps: 30, mix: { way: 0.25, lane: 0.5 } },
  // Fix round 1 (checks/M0-a-06.md F-1), seeds × 15 485 863: a face record freed by the face pass whose slot a
  // materialised record re-used, deleted from the index (default 51, along 93); the own child made twice and a finer
  // record missing where two demoted edges' targets nest (along-heavy 52); a Steiner vertex left an end of a coarser run
  // (along-heavy 106) — C-0189.
  { seed: 51, steps: 20, mix: DEFAULT_MIX, mult: 15_485_863 },
  { seed: 93, steps: 20, mix: ALONG_MIX, mult: 15_485_863 },
  { seed: 52, steps: 20, mix: { way: 0.2, lane: 0.3, along: 0.25 }, mult: 15_485_863 },
  { seed: 106, steps: 20, mix: { way: 0.2, lane: 0.3, along: 0.25 }, mult: 15_485_863 },
];

describe('the wide runs\' regression sequences', () => {
  for (const { seed, steps, mix, mult } of REGRESSIONS) {
    it(`seed ${seed}${mult === undefined ? '' : ` × ${mult}`}`, () => {
      const r = rng(seed * (mult ?? 7919));
      const p = framed();
      const live: Live = { ways: [], kerbs: [], next: 0 };
      for (let step = 0; step < steps; step++) {
        const before = state(p);
        const snapshot: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
        const b = randomBatch(p, live, r, mix);
        const res = tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn);
        if (res.ok) healthy(p);
        else {
          expect(state(p)).toBe(before);
          live.ways = snapshot.ways;
          live.kerbs = snapshot.kerbs;
        }
      }
    }, 120_000);
  }
});

/** Batches of the along-mix run that demoted an edge (rule 3 (a)) — F-1's case. */
let alongDemotions = 0;

describe('random batch sequences with finer chains along the ways: every commit valid (checks/M0-a-06.md F-1)', () => {
  for (let seed = 1; seed <= 24; seed++) {
    it(`seed ${seed}`, () => {
      const r = rng(seed * 104_729);
      const p = framed();
      const live: Live = { ways: [], kerbs: [], next: 0 };
      for (let step = 0; step < 16; step++) {
        const before = state(p);
        const snapshot: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
        const b = randomBatch(p, live, r, ALONG_MIX);
        const res = tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn);
        const row = tally.get(`along ${b.kind}`) ?? { committed: 0, refused: 0 };
        tally.set(`along ${b.kind}`, row);
        if (res.ok) {
          if (res.value.record !== null) row.committed++;
          if ((res.value.record?.demoted.edges.length ?? 0) > 0) alongDemotions++;
          healthy(p);
        } else {
          row.refused++;
          expect(state(p)).toBe(before);
          live.ways = snapshot.ways;
          live.kerbs = snapshot.kerbs;
        }
      }
    }, 120_000);
  }
});

describe('the fuzz reached every writer', () => {
  it('the along mix inserted finer chains along ways and demoted edges by removing ways', () => {
    expect(tally.get('along insert along')?.committed ?? 0).toBeGreaterThan(0);
    expect(alongDemotions).toBeGreaterThan(0);
  });

  it('ways and lanes inserted and removed, stretches removed (rekeyed first and not: refused by role consistency), re-owns, clears', () => {
    for (const k of ['insert way', 'insert lane', 'remove way', 'remove lane', 'stretch (rekeyed)', 'setOwner']) expect(tally.get(k)?.committed ?? 0).toBeGreaterThan(0);
    expect((tally.get('stretch')?.refused ?? 0) + (tally.get('stretch')?.committed ?? 0)).toBeGreaterThan(0);
  });
});
