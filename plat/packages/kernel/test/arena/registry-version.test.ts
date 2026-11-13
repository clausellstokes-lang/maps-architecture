// M0-a-02, hardening round S4 (J757 RL4; J776 R7, R17): the role registry's version in the arena block's bytes. Every
// encoded chunk's header carries the registry version as the varint after the kind byte (offset 6: four magic bytes, the
// format version, the kind); version 2 appended `shape`, so a chunk now carries 2. This pins the BYTE FORMAT's reading
// of that field, through io/'s exports alone: a chunk whose bytes say version 1 decodes under version 2 (the rows of a
// version-1 registry are a prefix of version 2's), and a chunk written under a newer registry (3) is a corrupt cache.
// It is NEVER a promise that an old cache's CONTENT is current: a version-1 cache of an arena holding RQ2's class lacks
// the `shape` rows a replay would write (R17; review F10). Whether decode refuses a row whose role's `since` exceeds its
// chunk's version (M0-a-15) and whether an older registry's cache may be used at all (M1's loader) are the queue's.
import { describe, expect, it } from 'vitest';
import { ROLE_REGISTRY_VERSION } from '../../src/arena/index.js';
import { H128 } from '../../src/hash/index.js';
import { decodeArena, encodeArena, isCorruptCache, type Chunk } from '../../src/io/index.js';
import { tx } from '../../src/tx/index.js';
import type { Plat } from '../../src/arena/index.js';
import { CELLS } from '../insert/step1-2/support.js';
import { ALONG_MIX, randomBatch, type Live } from '../tx/fuzzgen.js';
import { framed, spec } from '../tx/support.js';
import { rng } from './support.js';

/** The registry version's offset in a chunk: magic (4 bytes), the format version's varint (1 byte), the kind (1 byte). */
const AT = 6;

/** A committed arena: the framed square and `steps` batches of M0-a-06's generator (a refused batch leaves nothing). */
function committed(seed: number, steps: number): Plat {
  const r = rng(seed);
  const p = framed();
  const live: Live = { ways: [], kerbs: [], next: 0 };
  for (let i = 0; i < steps; i++) {
    const snap: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
    const b = randomBatch(p, live, r, ALONG_MIX);
    if (!tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn).ok) {
      live.ways = snap.ways;
      live.kerbs = snap.kerbs;
    }
  }
  return p;
}

/** The chunk with its registry-version byte set to `v` and its ref re-hashed by H128 (a well-formed chunk of that version). */
function patched(c: Chunk, v: number): Chunk {
  const bytes = c.bytes.slice();
  bytes[AT] = v;
  return { ref: H128(bytes), bytes };
}

/** Two blocks equal byte for byte, refs included. */
function sameBlock(a: readonly Chunk[], b: readonly Chunk[]): boolean {
  return a.length === b.length && a.every((c, i) =>
    c.bytes.length === b[i].bytes.length && c.bytes.every((x, k) => x === b[i].bytes[k]) && c.ref.every((w, k) => w === b[i].ref[k]));
}

describe('the role registry version in the block bytes (hardening round S4; J776 R17: the byte format, never an old cache\'s currency)', () => {
  const p = committed(40_961, 60);
  const block = encodeArena(p);

  it('writes registry version 2 at offset 6 of every chunk, one byte, after the magic, the format version and the kind', () => {
    expect(ROLE_REGISTRY_VERSION).toBe(2);
    expect(block.length).toBeGreaterThan(1);
    for (const c of block) expect(c.bytes[AT]).toBe(2);
  });

  it('decodes a chunk whose header says registry version 1 (re-hashed) — the byte format\'s reading, not a promise that an old cache is current — and the loaded arena re-encodes to the original version-2 bytes', () => {
    const opts = { index: { gridCellCm: CELLS } };
    // each chunk alone at version 1, then every chunk at version 1
    const cases: Chunk[][] = block.map((_, i) => block.map((c, k) => (k === i ? patched(c, 1) : c)));
    cases.push(block.map((c) => patched(c, 1)));
    for (const chunks of cases) {
      expect(chunks.some((c, k) => c.bytes[AT] === 1 && block[k].bytes[AT] === 2)).toBe(true);
      const r = decodeArena(chunks, p.key, opts);
      expect(r.ok, r.ok ? '' : r.detail).toBe(true);
      if (r.ok) expect(sameBlock(encodeArena(r.value), block)).toBe(true);
    }
  });

  it('refuses a chunk whose header says registry version 3 (re-hashed) as a corrupt cache naming a newer role registry', () => {
    for (let i = 0; i < block.length; i++) {
      const chunks = block.map((c, k) => (k === i ? patched(c, 3) : c));
      const r = decodeArena(chunks, p.key, { index: { gridCellCm: CELLS } });
      expect(isCorruptCache(r)).toBe(true);
      expect(r.ok ? '' : r.detail).toMatch(/a chunk written under a newer role registry/);
    }
  });
});
