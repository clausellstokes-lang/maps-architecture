// M0-a-15: §13.1's round trip on the kernel's own arenas (the unit and property tests the item adds beside the
// testkit-side bar runs, C-0122): random batch sequences of M0-a-06's generator — ways, lanes, finer chains along ways,
// stretch removals, re-owns and clears, so promotions, demotions, Steiner splits and finer rows on coarser edges all
// occur — saved, loaded and saved again byte for byte, the loaded arena equal to the original and passing every hard
// invariant.
import { describe, expect, it } from 'vitest';
import { decodeArena, describeChunk, encodeArena } from '../../src/io/index.js';
import { roomFor } from '../../src/io/format.js';
import { ALONG_MIX, DEFAULT_MIX } from '../tx/fuzzgen.js';
import type { Plat } from '../../src/arena/index.js';
import { tx } from '../../src/tx/index.js';
import { randomBatch, rng, type Live } from '../tx/fuzzgen.js';
import { spec } from '../tx/support.js';
import { CELLS, framed, load, print, randomArena, roundTrip } from './support.js';

describe('the arena block round trip (§13.1, §3.9)', () => {
  it('loads the chunks in any order: partitions are taken level by level, key by key (§3.9 *Load*)', () => {
    for (let seed = 1; seed <= 12; seed++) {
      const p = randomArena(seed * 31_337, 120, ALONG_MIX);
      const chunks = encodeArena(p);
      const shuffled = chunks.slice().reverse();
      const r = decodeArena(shuffled, p.key, { index: { gridCellCm: CELLS } });
      expect(r.ok).toBe(true);
      if (r.ok) {
        expect(print(r.value)).toBe(print(p));
        encodeArena(r.value).forEach((c, i) => expect(c.bytes).toEqual(chunks[i].bytes));
      }
    }
  });

  it('a loaded arena takes further batches as the original does: same arena after each, and round-trips again', () => {
    for (let seed = 1; seed <= 10; seed++) {
      const r0 = rng(seed * 4099);
      const p = framed();
      const live: Live = { ways: [], kerbs: [], next: 0 };
      const grow = (q: Plat, l: Live, r: () => number): boolean => {
        const snap: Live = { ways: l.ways.slice(), kerbs: l.kerbs.slice(), next: l.next };
        const b = randomBatch(q, l, r, ALONG_MIX);
        const ok = tx(q, spec(b.level, { rederivesFrom: 0 as never }), b.fn).ok;
        if (!ok) {
          l.ways = snap.ways;
          l.kerbs = snap.kerbs;
        }
        return ok;
      };
      for (let i = 0; i < 60; i++) grow(p, live, r0);
      const q = load(encodeArena(p), p);
      const liveQ: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
      for (let i = 0; i < 40; i++) {
        const okP = grow(p, live, rng(seed * 7 + i));
        const okQ = grow(q, liveQ, rng(seed * 7 + i));
        expect(okQ).toBe(okP);
        expect(print(q)).toBe(print(p));
      }
      roundTrip(q);
    }
  });

  it('sizes a loaded table at the smallest 64 · 2ᵏ above its count (C-0207 (11))', () => {
    expect([0, 1, 63, 64, 65, 127, 128, 129, 1000].map(roomFor)).toEqual([64, 64, 64, 128, 128, 128, 256, 256, 1024]);
  });

  it('the framed square alone: one routes chunk, one face, byte-identical', () => {
    const p = framed();
    const { chunks, loaded } = roundTrip(p);
    expect(chunks.length).toBe(1);
    expect(loaded.slots.face[0].live).toBe(1);
    expect(loaded.version).toBe(0);
  });

  for (const [name, mix] of [['default', DEFAULT_MIX], ['along', ALONG_MIX]] as const) {
    it(`random batch arenas (${name} mix): save → load → save byte-identical, equal, every hard invariant`, () => {
      const seen = { partitions: 0, l3: 0, splits: 0, holes: 0, foreign: 0 };
      for (let seed = 1; seed <= 24; seed++) {
        const p = randomArena(seed * 7919, 120, mix);
        const { chunks } = roundTrip(p);
        expect(encodeArena(p).length).toBe(chunks.length);
        for (const c of chunks.slice(1)) {
          const s = describeChunk(c.bytes);
          seen.partitions++;
          if (s.level === 3) seen.l3++;
          seen.splits += s.splits;
          seen.holes += s.holes;
          seen.foreign += s.foreignRefs;
        }
      }
      // The arenas reached what the block must carry: L2 and L3 partitions, Steiner splits, holes, cross-chunk references.
      expect(seen.partitions).toBeGreaterThanOrEqual(24);
      // The along mix draws L3 plot lines on the ways' routes (the default mix stops at L2 lanes).
      if (mix === ALONG_MIX) expect(seen.l3).toBeGreaterThan(0);
      expect(seen.splits).toBeGreaterThan(0);
      expect(seen.holes).toBeGreaterThan(0);
      expect(seen.foreign).toBeGreaterThan(0);
    });
  }
});
