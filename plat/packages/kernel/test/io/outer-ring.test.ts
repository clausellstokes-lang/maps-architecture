// M0-a-15: §13.1's further limit "an arena holding only its outer ring saved and loaded (one face, §3.9)" — §3.9: "An
// arena that holds only its outer ring writes its level-≤ 1 chunk alone and loads to that one face."
import { describe, expect, it } from 'vitest';
import { describeChunk, encodeArena } from '../../src/io/index.js';
import { ins, tx } from '../insert/step3-5/support.js';
import { emptyArena } from '../insert/step3-5/support.js';
import { framed, print, roundTrip } from './support.js';

describe('an arena holding only its outer ring (§13.1, §3.9)', () => {
  it('the framed square writes its routes chunk alone and loads to its one face', () => {
    const p = framed();
    const { chunks, loaded } = roundTrip(p);
    expect(chunks.length).toBe(1);
    const s = describeChunk(chunks[0].bytes);
    expect(s).toMatchObject({ kind: 'routes', vertices: 4, edges: 4, faces: 1, holes: 0, splits: 0, foreignRefs: 0 });
    expect([0, 1, 2, 3, 4].map((l) => loaded.slots.face[l as 0].live)).toEqual([1, 0, 0, 0, 0]);
    expect(print(loaded)).toBe(print(p));
  });

  it('an irregular outer ring (a skewed heptagon) alone: one chunk, one face, its ring and margin rows kept', () => {
    const p = emptyArena();
    const ring: [number, number][] = [[0, 0], [5200, 300], [9100, 2600], [9900, 7000], [6000, 9800], [1500, 8800], [-700, 4100]];
    const r = ins(tx(p, 0), ring, [{ role: 'margin', entity: 'terrain:7' }], 'mandatory', { closed: true });
    expect(r.ok).toBe(true);
    const { chunks, loaded } = roundTrip(p);
    expect(chunks.length).toBe(1);
    expect(describeChunk(chunks[0].bytes)).toMatchObject({ vertices: 7, edges: 7, faces: 1, entities: 1, edgeRows: 7 });
    expect(loaded.slots.face[0].live).toBe(1);
    expect(encodeArena(loaded)[0].bytes).toEqual(chunks[0].bytes);
  });

  it('an empty arena (no ring yet) writes one empty routes chunk and loads empty', () => {
    const p = emptyArena();
    const { chunks, loaded } = roundTrip(p);
    expect(chunks.length).toBe(1);
    expect(describeChunk(chunks[0].bytes)).toMatchObject({ vertices: 0, edges: 0, faces: 0 });
    expect(loaded.slots.vertex.live).toBe(0);
  });
});
