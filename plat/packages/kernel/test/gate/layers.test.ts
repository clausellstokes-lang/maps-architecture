// The M0 close gate, row K1 (check/M0-world-sites-gate; docs/build/M0-world-sites-gate.md): the `Layer` codes are
// append-only in the block format and the level digest, and no kernel path assumes 'ground' is the root of every
// document. The kernel keeps no layer registry — the vocabulary sits in three places (types/ids.ts's union,
// io/format.ts's `LAYERS` list for the block header, rng/layer.ts's `layerCode` switch for the entity key and the
// digest) — so this test pins what an append must keep: the three codes (ground 0, underground 1, sky 2) agree
// between the block header and the entity key, code 3 is unassigned on both sides, the header carries the code in one
// byte at a fixed offset, and a document whose only arena is underground or sky round-trips and digests like a ground
// one. The spec's "append a fourth value in a test registry" cannot be written against this code: the report records
// the gap.
import { describe, expect, it } from 'vitest';
import { isPlatKey } from '../../src/arena/index.js';
import { decodeArena, encodeArena } from '../../src/io/index.js';
import { layerCodeOf, layerOfCode } from '../../src/io/format.js';
import { createKernel } from '../../src/facade/index.js';
import { layerCode } from '../../src/rng/index.js';
import type { Layer, PlatKey } from '../../src/types/index.js';
import { print } from '../io/support.js';
import { CELLS, digestsOf, dressedOn, idsOf, sameBytes } from './support.js';

const LAYERS: readonly Layer[] = ['ground', 'underground', 'sky'];

describe('K1: the Layer codes are append-only (block header and entity key)', () => {
  it('the block header and the entity key give one code per layer: ground 0, underground 1, sky 2', () => {
    for (const layer of LAYERS) expect(layerCodeOf(layer), layer).toBe(layerCode(layer));
    expect(LAYERS.map(layerCodeOf)).toEqual([0, 1, 2]);
    expect(LAYERS.map((l) => layerOfCode(layerCodeOf(l)))).toEqual(LAYERS);
  });

  it('code 3 is unassigned on both sides, so a fourth layer appends at 3 without moving a code', () => {
    const fourth = 'world' as Layer;
    expect(layerOfCode(3)).toBeNull();
    expect(() => layerCodeOf(fourth)).toThrow(/no layer/);
    expect(() => layerCode(fourth)).toThrow();
    expect(isPlatKey({ layer: fourth, part: 0 })).toBe(false);
  });

  it('the routes chunk carries the layer code in one byte at a fixed offset: the three layers differ there only', () => {
    // One content (the ground arena's entity ids) under each layer: the chunks differ in the layer byte and nowhere else.
    const ids = idsOf({ layer: 'ground', part: 0 });
    const chunks = LAYERS.map((layer) => encodeArena(dressedOn({ layer, part: 0 }, undefined, ids))[0].bytes);
    // magic (4) + format version (1) + kind (1) + role registry version (1), then the layer byte (encode.ts `write`).
    const LAYER_AT = 7;
    for (let i = 0; i < chunks.length; i++) {
      expect(chunks[i][LAYER_AT]).toBe(i);
      expect(chunks[i].length).toBe(chunks[0].length);
      const differing: number[] = [];
      for (let k = 0; k < chunks[i].length; k++) if (chunks[i][k] !== chunks[0][k]) differing.push(k);
      expect(differing).toEqual(i === 0 ? [] : [LAYER_AT]);
    }
  });

  it('the level digest reads the layer code: one content digests differently under each layer', () => {
    const ids = idsOf({ layer: 'ground', part: 0 });
    const d = LAYERS.map((layer) => digestsOf(dressedOn({ layer, part: 0 }, undefined, ids)));
    expect(d[0]).not.toEqual(d[1]);
    expect(d[1]).not.toEqual(d[2]);
    expect(d[0]).not.toEqual(d[2]);
  });

  it('no path assumes a ground root: a document whose one arena is underground or sky round-trips, digests and runs a kernel', () => {
    for (const layer of ['underground', 'sky'] as const) {
      const key: PlatKey = { layer, part: 0 };
      const p = dressedOn(key);
      const chunks = encodeArena(p);
      const r = decodeArena(chunks, key, { index: { gridCellCm: CELLS }, digests: true });
      expect(r.ok).toBe(true);
      if (!r.ok) continue;
      expect(print(r.value)).toBe(print(p));
      expect(digestsOf(r.value)).toEqual(digestsOf(p));
      expect(sameBytes(encodeArena(r.value)[0].bytes, chunks[0].bytes)).toBe(true);
      // A kernel over that arena alone: §14's doors answer with the arena's key, no ground arena present.
      const k = createKernel(new Map([[key, p]]));
      const ids = idsOf(key);
      const faces = k.resolve({ owner: ids.terrain, level: 1 }, key);
      expect(faces.key).toEqual(key);
      expect(faces.view === 'faces' && faces.faces.length).toBe(1);
      expect(k.view(key, 1).faces().length).toBe(2);
    }
  });
});
