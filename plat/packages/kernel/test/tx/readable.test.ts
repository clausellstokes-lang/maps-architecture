// M0-a-06, session round S6 (C-0356; checks/M0-a-06-notes.md N-c1-5, N-c1-6; docs/M0-FIX-QUEUE.md Q54): the fourteen
// lawful batch sequences of this item's own fuzz families whose committed arena, before the round, broke the constancy
// of an intermediate level's rows along a coarser route edge — split restoration (§2.2 rule 3 (c)) lowered a junction
// past the level of a finer chain ending at it along the run, so `encodeArena` refused the arena and `routeLines` of
// that chain threw. Each is pinned at the batch that broke it (its kind and its commit) and read after every batch:
// committed, valid (`healthy`) and read by the encoder and every chain's own-level route (`readable`).
import { describe, expect, it } from 'vitest';
import { tx } from '../../src/tx/index.js';
import { ALONG_MIX, randomBatch, rng, type Live, type Mix } from './fuzzgen.js';
import { framed, healthy, readable, spec, state } from './support.js';

/** The heavy mix of fuzz.test.ts's regressions 52 and 106 (× 15 485 863). */
const HEAVY: Mix = { way: 0.2, lane: 0.3, along: 0.25 };

/** A sequence: its family (seed × mult into the generator, its mix and length) and the batch (0-based) that broke it. */
interface Sequence {
  readonly seed: number;
  readonly mult: number;
  readonly mix: Mix;
  readonly steps: number;
  readonly batch: number;
  readonly kind: string;
}

const along = (seed: number, batch: number, kind: string): Sequence => ({ seed, mult: 104_729, mix: ALONG_MIX, steps: 16, batch, kind });
const heavy = (seed: number, batch: number, kind: string): Sequence => ({ seed, mult: 15_485_863, mix: HEAVY, steps: 20, batch, kind });

/** The fourteen (N-c1-6): 'remove way' 10, 'stretch' 2, 'stretch (rekeyed)' 2. */
export const SEQUENCES: readonly Sequence[] = [
  along(91, 10, 'remove way'),
  along(235, 14, 'remove way'),
  along(307, 7, 'remove way'),
  along(719, 10, 'remove way'),
  along(980, 7, 'stretch (rekeyed)'),
  heavy(106, 18, 'remove way'),
  heavy(210, 12, 'stretch (rekeyed)'),
  heavy(213, 11, 'stretch'),
  heavy(333, 10, 'remove way'),
  heavy(361, 19, 'remove way'),
  heavy(395, 10, 'remove way'),
  heavy(402, 9, 'stretch'),
  heavy(443, 13, 'remove way'),
  heavy(739, 19, 'remove way'),
];

describe('S6: the fourteen sequences whose committed arena the encoder refused commit encodable, readable arenas', () => {
  for (const s of SEQUENCES) {
    it(`seed ${s.seed} × ${s.mult}, batch ${s.batch} (${s.kind})`, () => {
      const r = rng(s.seed * s.mult);
      const p = framed();
      const live: Live = { ways: [], kerbs: [], next: 0 };
      for (let step = 0; step < s.steps; step++) {
        const before = state(p);
        const snapshot: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
        const b = randomBatch(p, live, r, s.mix);
        const res = tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn);
        if (step === s.batch) {
          expect(b.kind).toBe(s.kind);
          expect(res.ok && res.value.record !== null).toBe(true);
        }
        if (res.ok) {
          healthy(p);
          readable(p);
        } else {
          expect(state(p)).toBe(before);
          live.ways = snapshot.ways;
          live.kerbs = snapshot.kerbs;
        }
      }
    }, 120_000);
  }
});
