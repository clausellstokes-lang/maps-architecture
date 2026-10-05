// M0-a-15: §13.1's round trip on the kernel's own arenas (the unit and property tests the item adds beside the
// testkit-side bar runs, C-0122): random batch sequences of M0-a-06's generator — ways, lanes, finer chains along ways,
// stretch removals, re-owns and clears, so promotions, demotions, Steiner splits and finer rows on coarser edges all
// occur — saved, loaded and saved again byte for byte, the loaded arena equal to the original and passing every hard
// invariant.
import { describe, expect, it } from 'vitest';
import { encodeArena } from '../../src/io/index.js';
import { ALONG_MIX, DEFAULT_MIX } from '../tx/fuzzgen.js';
import { framed, randomArena, roundTrip } from './support.js';

describe('the arena block round trip (§13.1, §3.9)', () => {
  it('the framed square alone: one routes chunk, one face, byte-identical', () => {
    const p = framed();
    const { chunks, loaded } = roundTrip(p);
    expect(chunks.length).toBe(1);
    expect(loaded.slots.face[0].live).toBe(1);
    expect(loaded.version).toBe(0);
  });

  for (const [name, mix] of [['default', DEFAULT_MIX], ['along', ALONG_MIX]] as const) {
    it(`random batch arenas (${name} mix): save → load → save byte-identical, equal, every hard invariant`, () => {
      let partitions = 0;
      for (let seed = 1; seed <= 24; seed++) {
        const p = randomArena(seed * 7919, 40, mix);
        const { chunks } = roundTrip(p);
        partitions += chunks.length - 1;
        expect(encodeArena(p).length).toBe(chunks.length);
      }
      // L2–L4 content occurred, so partition chunks were written and read.
      expect(partitions).toBeGreaterThan(0);
    });
  }
});
