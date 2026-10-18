// The M0 close gate, rows K2 and K8 (check/M0-world-sites-gate; docs/build/M0-world-sites-gate.md): `PlatKey.part`
// round-trips through encode and decode with an independent frame per part, nothing assumes the parts are dense from
// 0, every persistent reference form resolves against each part under a separately supplied key, and encode → decode
// is digest-equal on a part ≥ 1 with the maintained digests re-attached by the load (K8's "reattach" golden) while
// `compactSlots` is deterministic there. Three arenas: ground/0, ground/7 and underground/3 — the parts 7 and 3 with
// no part between them and 0 — each over its own frame.
import { describe, expect, it } from 'vitest';
import { attachLevelDigests, hasLevelDigests, levelDigest, levelDigestBuilds, recomputeLevelDigest, updateLevelDigests } from '../../src/digest/index.js';
import { createKernel } from '../../src/facade/index.js';
import { LEVELS, type Plat } from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import { frameOf, type Frame } from '../../src/num/index.js';
import { compactSlots, decodeArena, encodeArena, isCorruptCache, type Chunk } from '../../src/io/index.js';
import type { GeomRef, PlatKey } from '../../src/types/index.js';
import { print, sameBlock } from '../io/support.js';
import { commit, pt } from '../tx/support.js';
import { CELLS, digestsOf, dressedOn, idsOf, keyName } from './support.js';

/** A frame of its own per part (areas and aspects that differ; `frameOf` is the kernel's one frame law). */
function frameFor(areaM2: number, aspect: number): Frame {
  const f = frameOf(areaM2, aspect, 0.3);
  if (!f.ok) throw new Error(`support: frameOf refused: ${f.code} ${f.detail}`);
  return f.value;
}

const PARTS: readonly { key: PlatKey; frame: Frame }[] = [
  { key: { layer: 'ground', part: 0 }, frame: frameFor(160_000, 1) },
  { key: { layer: 'ground', part: 7 }, frame: frameFor(250_000, 1.25) },
  { key: { layer: 'underground', part: 3 }, frame: frameFor(90_000, 0.8) },
];

function load(chunks: readonly Chunk[], key: PlatKey, digests = false): Plat {
  const r = decodeArena(chunks, key, { index: { gridCellCm: CELLS }, digests });
  if (!r.ok) throw new Error(`the block of ${keyName(key)} did not load: ${r.code} ${r.detail}`);
  return r.value;
}

/** Every persistent reference form of §2.2, aimed at the entities of `key`'s arena, plus the batch-local stretch. */
function refsOf(key: PlatKey): { name: string; ref: GeomRef; view: 'faces' | 'edges' | 'vertices' }[] {
  const ids = idsOf(key);
  return [
    { name: 'FaceRef', ref: { owner: ids.terrain, level: 1 }, view: 'faces' },
    { name: 'ChainRef', ref: { role: 'way', entity: ids.way }, view: 'edges' },
    { name: 'EdgeSetRef', ref: { role: 'kerb', entity: ids.lane, ordinal: 0 }, view: 'edges' },
    { name: 'VertexRef', ref: { role: 'junction', entity: ids.junction, ordinal: 0 }, view: 'vertices' },
    { name: 'StretchRef', ref: { chain: { role: 'way', entity: ids.way }, from: pt(0, 2000), to: pt(4000, 2000) }, view: 'edges' },
  ];
}

function found(r: { view: string; faces?: number[]; runs?: number[][]; vertices?: number[] }): number {
  return r.view === 'faces' ? (r.faces as number[]).length : r.view === 'edges' ? (r.runs as number[][]).length : (r.vertices as number[]).length;
}

describe('K2: PlatKey.part round-trips with its own frame; parts need not be dense from 0', () => {
  it('each part encodes under its key and frame, loads under that key alone, and re-encodes byte for byte', () => {
    for (const { key, frame } of PARTS) {
      const p = dressedOn(key, frame);
      expect(p.frame).toEqual(frame);
      const chunks = encodeArena(p);
      expect(chunks.length).toBeGreaterThanOrEqual(2); // the routes chunk and the lane's L2 partition
      const q = load(chunks, key);
      expect(q.key).toEqual(key);
      expect(q.frame).toEqual(frame);
      expect(print(q)).toBe(print(p));
      expect(sameBlock(encodeArena(q), chunks)).toBe(true);
      // The block names its arena: the same chunks under any other part or layer are a corrupt cache, never an arena.
      for (const other of PARTS) {
        if (other.key === key) continue;
        const r = decodeArena(chunks, other.key);
        expect(r.ok).toBe(false);
        expect(isCorruptCache(r)).toBe(true);
        if (!r.ok) expect(r.detail).toMatch(/another arena/);
      }
    }
  });

  it('the three parts encode to three different blocks under three different frames (the fixture is not degenerate)', () => {
    const blocks = PARTS.map(({ key, frame }) => encodeArena(dressedOn(key, frame)));
    expect(sameBlock(blocks[0], blocks[1])).toBe(false);
    expect(sameBlock(blocks[1], blocks[2])).toBe(false);
    expect(new Set(PARTS.map((x) => `${x.frame.widthCm}x${x.frame.heightCm}`)).size).toBe(3);
  });

  it('every reference form resolves against each part under its own key, and finds nothing on the other parts', () => {
    const plats = new Map<PlatKey, Plat>();
    for (const { key, frame } of PARTS) plats.set(key, dressedOn(key, frame));
    const k = createKernel(plats);
    for (const { key } of PARTS) {
      for (const { name, ref, view } of refsOf(key)) {
        const r = k.resolve(ref, key);
        expect(r.key, `${name} on ${keyName(key)}`).toEqual(key);
        expect(r.view, `${name} on ${keyName(key)}`).toBe(view);
        expect(found(r), `${name} on ${keyName(key)}`).toBeGreaterThan(0);
        // The same reference against another part: a reference embeds no key, so it is the key that chooses the
        // arena, and there it resolves empty (§3.11) — never a foreign slot.
        for (const other of PARTS) {
          if (other.key === key) continue;
          const o = k.resolve(ref, other.key);
          expect(o.key, `${name} of ${keyName(key)} on ${keyName(other.key)}`).toEqual(other.key);
          expect(found(o), `${name} of ${keyName(key)} on ${keyName(other.key)}`).toBe(0);
        }
      }
      expect(k.view(key, 1).faces().length).toBe(2);
      expect(k.plat(key).key).toEqual(key);
    }
  });
});

describe('K8: encode → decode is digest-equal on a part ≥ 1; the load re-attaches the digests; compactSlots is deterministic', () => {
  it('the reattach golden on ground/7 and underground/3: loaded with digests, maintained equals recomputed, and stays so over a further batch', () => {
    for (const { key, frame } of PARTS.slice(1)) {
      const p = dressedOn(key, frame);
      const want = digestsOf(p);
      const q = load(encodeArena(p), key, true);
      expect(hasLevelDigests(q)).toBe(true);
      expect(LEVELS.map((l) => levelDigest(q, l).map((w) => w >>> 0))).toEqual(LEVELS.map((l) => recomputeLevelDigest(p, l).map((w) => w >>> 0)));
      expect(digestsOf(q)).toEqual(want);
      expect(levelDigestBuilds(q)).toBe(1);
      // A further batch on the loaded part, its digests maintained through the listener: no rebuild, oracle equal.
      const ids = idsOf(key);
      commit(q, 2, (o) => insertChain(o, [pt(3000, 500), pt(3000, 1500)], [{ role: 'kerb', entity: `${ids.lane}b` }], 'mandatory'), { key }, { onCommit: updateLevelDigests });
      expect(levelDigestBuilds(q)).toBe(1);
      expect(LEVELS.map((l) => levelDigest(q, l).map((w) => w >>> 0))).toEqual(LEVELS.map((l) => recomputeLevelDigest(q, l).map((w) => w >>> 0)));
      expect(digestsOf(q)).not.toEqual(want);
    }
  });

  it('compactSlots on a part ≥ 1 is deterministic and keeps the key, the frame, the print, the bytes and the digests', () => {
    for (const { key, frame } of PARTS.slice(1)) {
      const p = dressedOn(key, frame);
      attachLevelDigests(p);
      const a = compactSlots(p);
      const b = compactSlots(p);
      const c = compactSlots(a);
      for (const q of [a, b, c]) {
        expect(q.key).toEqual(key);
        expect(q.frame).toEqual(frame);
        expect(print(q)).toBe(print(p));
        expect(digestsOf(q)).toEqual(digestsOf(p));
        expect(hasLevelDigests(q)).toBe(true);
      }
      const bytes = encodeArena(p);
      expect(sameBlock(encodeArena(a), bytes)).toBe(true);
      expect(sameBlock(encodeArena(b), bytes)).toBe(true);
      expect(sameBlock(encodeArena(c), bytes)).toBe(true);
      // Dense: every slot table's top equals its live count.
      expect(a.slots.vertex.top).toBe(a.slots.vertex.live);
      expect(a.slots.pair.top).toBe(a.slots.pair.live);
      // Byte-identical typed tables between two compactions of one arena (the same renaming, twice).
      expect(Array.from(a.vertices.x)).toEqual(Array.from(b.vertices.x));
      expect(Array.from(a.halfEdges.origin)).toEqual(Array.from(b.halfEdges.origin));
    }
  });
});
