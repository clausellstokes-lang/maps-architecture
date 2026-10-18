// M0-a-15: "the loaded arena's per-level route digests equal the original's (with M0-d-04)" — §3.9 *Chunks*: "the
// rebuild below then yields the same arena and per-level digests (they read routes, not slots)"; *Load*: "The per-level
// digests are recomputed from the rebuilt arena". Both M0-d-04 readings: recomputed from nothing, and maintained (the
// load attaches them when asked).
import { describe, expect, it } from 'vitest';
import { hasLevelDigests, levelDigest, recomputeLevelDigest } from '../../src/digest/index.js';
import { LEVELS } from '../../src/arena/index.js';
import { decodeArena, encodeArena } from '../../src/io/index.js';
import { ALONG_MIX, DEFAULT_MIX } from '../tx/fuzzgen.js';
import { CELLS, digests, framed, load, randomArena } from './support.js';

describe('the loaded arena\'s per-level route digests (§3.9, M0-d-04)', () => {
  it('equal the original\'s on every level, recomputed and maintained, over random arenas', () => {
    for (let seed = 1; seed <= 16; seed++) {
      const p = randomArena(seed * 104_729, 45, seed % 2 === 0 ? ALONG_MIX : DEFAULT_MIX);
      const want = digests(p);
      const loaded = load(encodeArena(p), p);
      expect(digests(loaded)).toEqual(want);
      // The maintained digests are attached by the load itself when asked (`opts.digests`), not recomputed by
      // `levelDigest`'s fallback on an arena that carries none (checks/M0-a-15-notes.md note 5): hasLevelDigests tells
      // the two apart, and the load without the option attaches nothing.
      expect(hasLevelDigests(loaded)).toBe(false);
      const r = decodeArena(encodeArena(p), p.key, { index: { gridCellCm: CELLS }, digests: true });
      expect(r.ok).toBe(true);
      if (r.ok) {
        expect(hasLevelDigests(r.value)).toBe(true);
        expect(LEVELS.map((l) => levelDigest(r.value, l).map((w) => w >>> 0))).toEqual(want);
      }
    }
  });

  it('the comparison is sensitive: a different arena\'s digests differ (negative control)', () => {
    const a = randomArena(77, 30, DEFAULT_MIX);
    const b = randomArena(78, 30, DEFAULT_MIX);
    const la = load(encodeArena(a), a);
    expect(digests(la)).not.toEqual(digests(b));
    // and the frame alone differs from the loaded arena (its L2 content at least).
    const f = framed();
    expect(digests(f)).not.toEqual(digests(la));
    expect(recomputeLevelDigest(f, 0)).toEqual(recomputeLevelDigest(la, 0));
  });
});
