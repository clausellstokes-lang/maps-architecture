// M0-a-15: §3.9's corrupt cache — "a chunk that fails to decode, a lattice-point reference that finds no vertex …
// makes the stored geometry a corrupt cache: the document loads by replay, never as a partial arena" (§3.11's row;
// the replay is M1's, so M0 returns the typed failure, C-0037). Every refusal here is the typed result — E_INVARIANT
// with the corrupt-cache detail, no `partial` — and decodeArena never throws on any bytes.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { H128 } from '../../src/hash/index.js';
import { ByteWriter, decodeArena, encodeArena, isCorruptCache, type Chunk } from '../../src/io/index.js';
import { FORMAT_VERSION, KIND_PARTITION, KIND_ROUTES, MAGIC } from '../../src/io/format.js';
import { ROLE_REGISTRY, ROLE_REGISTRY_VERSION, roleIdOf } from '../../src/arena/index.js';
import type { KernelResult } from '../../src/num/index.js';
import type { PlatKey } from '../../src/types/index.js';
import { ALONG_MIX } from '../tx/fuzzgen.js';
import { CELLS, print, randomArena } from './support.js';

const GROUND: PlatKey = { layer: 'ground', part: 0 };

type Ref = number | readonly [number, number];
type Row = readonly [number, number, number, number];
interface Craft {
  readonly routes?: boolean;
  readonly level?: number;
  readonly key?: string;
  readonly magic?: readonly number[];
  readonly version?: number;
  readonly part?: number;
  readonly entities?: readonly string[];
  readonly vertices?: readonly (readonly [number, number, number, number])[];
  readonly splits?: readonly (readonly [number, Ref, Ref])[];
  readonly edges?: readonly (readonly [Ref, Ref, number])[];
  readonly vertexRows?: readonly (readonly [Ref, readonly Row[]])[];
  readonly edgeRows?: readonly (readonly [Ref, Ref, readonly Row[]])[];
  readonly faces?: readonly (readonly [number, Ref, Ref, number, number, number, readonly (readonly [Ref, Ref])[]])[];
  readonly trailing?: readonly number[];
}

/** A chunk written field by field as the format states (format.ts), with its true content hash. */
function craft(c: Craft): Chunk {
  const w = new ByteWriter();
  const ref = (r: Ref): void => {
    if (typeof r === 'number') {
      w.uv(r + 1);
    } else {
      w.uv(0);
      w.sv(r[0]);
      w.sv(r[1]);
    }
  };
  const rows = (list: readonly Row[]): void => {
    w.uv(list.length);
    for (const [role, entity, level, ordinal] of list) {
      w.uv(role);
      w.uv(entity);
      w.u8(level);
      w.u16(ordinal);
    }
  };
  const routes = c.routes ?? true;
  w.raw([...(c.magic ?? MAGIC)]);
  w.uv(c.version ?? FORMAT_VERSION);
  w.u8(routes ? KIND_ROUTES : KIND_PARTITION);
  w.uv(ROLE_REGISTRY_VERSION);
  w.u8(0);
  w.uv(c.part ?? 0);
  if (routes) {
    w.uv(200_000);
    w.uv(200_000);
    w.f64(1);
    w.f64(0.3);
  } else {
    w.u8(c.level ?? 2);
    w.str(c.key ?? '');
  }
  const entities = c.entities ?? [];
  w.uv(entities.length);
  for (const id of entities) w.str(id);
  const vs = c.vertices ?? [];
  w.uv(vs.length);
  let px = 0;
  let py = 0;
  for (const [x, y, level, flags] of vs) {
    w.sv(x - px);
    w.sv(y - py);
    px = x;
    py = y;
    w.u8(level);
    w.u8(flags);
  }
  const splits = c.splits ?? [];
  w.uv(splits.length);
  for (const [v, a, b] of splits) {
    w.uv(v);
    ref(a);
    ref(b);
  }
  const edges = c.edges ?? [];
  w.uv(edges.length);
  for (const [a, b, l] of edges) {
    ref(a);
    ref(b);
    w.u8(l);
  }
  const vr = c.vertexRows ?? [];
  w.uv(vr.length);
  for (const [v, list] of vr) {
    ref(v);
    rows(list);
  }
  const er = c.edgeRows ?? [];
  w.uv(er.length);
  for (const [a, b, list] of er) {
    ref(a);
    ref(b);
    rows(list);
  }
  const faces = c.faces ?? [];
  w.uv(faces.length);
  for (const [level, a, b, kind, owner, stage, holes] of faces) {
    w.u8(level);
    ref(a);
    ref(b);
    w.u16(kind);
    w.uv(owner);
    w.u8(stage);
    w.uv(holes.length);
    for (const [ha, hb] of holes) {
      ref(ha);
      ref(hb);
    }
  }
  w.raw([...(c.trailing ?? [])]);
  const bytes = w.bytes();
  return { ref: H128(bytes), bytes };
}

const MARGIN = roleIdOf('margin');
const KERB = roleIdOf('kerb');
const JUNCTION = roleIdOf('junction');

/** The 40 m square's routes chunk, its outer ring a `margin` chain on terrain:1, one L0 face — a valid block. */
function square(over: Partial<Craft> = {}): Craft {
  return {
    entities: ['terrain:1'],
    vertices: [[0, 0, 0, 0], [4000, 0, 0, 0], [0, 4000, 0, 0], [4000, 4000, 0, 0]],
    edges: [[0, 1, 0], [0, 2, 0], [1, 3, 0], [2, 3, 0]],
    edgeRows: [[0, 1, [[MARGIN, 0, 0, 0]]], [0, 2, [[MARGIN, 0, 0, 0]]], [1, 3, [[MARGIN, 0, 0, 0]]], [2, 3, [[MARGIN, 0, 0, 0]]]],
    faces: [[0, 0, 1, 0, 0, 0, []]],
    ...over,
  };
}

function rehash(c: Chunk, bytes: Uint8Array): Chunk {
  return { ref: H128(bytes), bytes };
}

function expectCorrupt(r: KernelResult<unknown>, detail?: RegExp): void {
  expect(r.ok).toBe(false);
  expect(isCorruptCache(r)).toBe(true);
  if (!r.ok) {
    expect(r.code).toBe('E_INVARIANT');
    expect('partial' in r).toBe(false);
    if (detail !== undefined) expect(r.detail).toMatch(detail);
  }
}

describe('the crafted chunks (positive control of the hand-written format)', () => {
  it('a crafted square loads to one L0 face, and an L2 partition crafted beside it loads too', () => {
    const r = decodeArena([craft(square())], GROUND, { index: { gridCellCm: CELLS } });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.slots.face[0].live).toBe(1);
      expect(r.value.slots.pair.live).toBe(4);
    }
    const lane = craft({
      routes: false,
      level: 2,
      key: '',
      entities: ['lane:1'],
      vertices: [[1000, 2000, 2, 0], [3000, 2000, 2, 0]],
      edges: [[0, 1, 2]],
      edgeRows: [[0, 1, [[KERB, 0, 2, 0]]]],
    });
    const r2 = decodeArena([craft(square()), lane], GROUND);
    expect(r2.ok).toBe(true);
    if (r2.ok) expect(r2.value.slots.pair.live).toBe(5);
  });
});

describe('splits from several partitions on one edge (§3.9 *Load*: "its splits first, sorted along each coarser edge by position")', () => {
  it('two partitions split the square\'s south edge, their vertices out of positional order: the load sorts them along it', () => {
    // Partition 'a' (taken first) splits at x = 3000, partition 'b' at x = 1000: in chunk order the splits run backwards.
    const a = craft({ routes: false, level: 2, key: 'a', vertices: [[3000, 0, 2, 6]], splits: [[0, [0, 0], [4000, 0]]] });
    const b = craft({ routes: false, level: 2, key: 'b', vertices: [[1000, 0, 2, 6]], splits: [[0, [0, 0], [4000, 0]]] });
    const r = decodeArena([craft(square()), a, b], GROUND, { index: { gridCellCm: CELLS } });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const q = r.value;
    const ends = (x: number, y: number): string[] => {
      const out: string[] = [];
      for (let h = 0; h < 2 * q.slots.pair.top; h++) {
        const o = q.halfEdges.origin[h];
        const d = q.halfEdges.origin[h ^ 1];
        if (q.vertices.x[o] === x && q.vertices.y[o] === y) out.push(`${q.vertices.x[d]},${q.vertices.y[d]}`);
      }
      return out.sort();
    };
    expect(ends(0, 0)).toEqual(['0,4000', '1000,0']);
    expect(ends(1000, 0)).toEqual(['0,0', '3000,0']);
    expect(ends(3000, 0)).toEqual(['1000,0', '4000,0']);
    // The split pieces keep the edge's level and its margin row (§2.2 rule 5).
    expect(q.slots.pair.live).toBe(6);
    expect(q.slots.face[0].live).toBe(1);
  });
});

describe('the corrupt cache (§3.9, §3.11)', () => {
  const p = randomArena(4242, 60, ALONG_MIX);
  const block = encodeArena(p);

  it('the random arena has partitions to tamper with', () => {
    expect(block.length).toBeGreaterThan(2);
    const r = decodeArena(block, p.key, { index: { gridCellCm: CELLS } });
    expect(r.ok && print(r.value) === print(p)).toBe(true);
  });

  it('a tampered chunk — one byte changed, its ref kept — is a corrupt cache', () => {
    for (let i = 0; i < block.length; i++) {
      const bytes = block[i].bytes.slice();
      bytes[bytes.length >> 1] ^= 0x10;
      const chunks = block.slice();
      chunks[i] = { ref: block[i].ref, bytes };
      expectCorrupt(decodeArena(chunks, p.key), /does not hash to its ref/);
    }
  });

  it('a chunk that fails to decode — truncated, extended, wrong magic or version — is a corrupt cache', () => {
    const cut = block.slice();
    cut[0] = rehash(block[0], block[0].bytes.slice(0, block[0].bytes.length - 3));
    expectCorrupt(decodeArena(cut, p.key), /fails to decode/);
    const long = block.slice();
    long[1] = rehash(block[1], Uint8Array.from([...block[1].bytes, 0]));
    expectCorrupt(decodeArena(long, p.key), /bytes after the last section/);
    expectCorrupt(decodeArena([craft(square({ magic: [0x50, 0x4c, 0x42, 0x4c] }))], GROUND), /magic/);
    expectCorrupt(decodeArena([craft(square({ version: FORMAT_VERSION + 1 }))], GROUND), /format version/);
    expectCorrupt(decodeArena([craft(square({ trailing: [7] }))], GROUND), /bytes after the last section/);
  });

  it('a varint not in its minimal form, or past 32 bits, fails to decode', () => {
    // The crafted square with its part number written as the two bytes 0x80 0x00 (0 in a non-minimal form).
    const good = craft(square()).bytes;
    const at = MAGIC.length + 4; // magic, version, kind, registry version, layer: the part's varint follows
    expect(good[at]).toBe(0);
    const long = Uint8Array.from([...good.slice(0, at), 0x80, 0x00, ...good.slice(at + 1)]);
    expectCorrupt(decodeArena([{ ref: H128(long), bytes: long }], GROUND), /minimal form/);
    const huge = Uint8Array.from([...good.slice(0, at), 0xff, 0xff, 0xff, 0xff, 0x7f, ...good.slice(at + 1)]);
    expectCorrupt(decodeArena([{ ref: H128(huge), bytes: huge }], GROUND), /exceeds 32 bits/);
  });

  it('a dangling lattice-point reference is a corrupt cache, never a partial arena', () => {
    const dangling = craft({ routes: false, level: 2, vertices: [[1000, 2000, 2, 0]], edges: [[0, [1500, 2500], 2]] });
    expectCorrupt(decodeArena([craft(square()), dangling], GROUND), /lattice-point reference \(1500, 2500\) finds no vertex/);
    // A finer partition whose coarser partner is missing: its references to the coarser chunk's vertices dangle.
    const l2 = block.findIndex((c, i) => i > 0 && block.slice(i + 1).length > 0);
    expect(l2).toBeGreaterThan(0);
    const dropped = block.filter((_, i) => i !== l2);
    expectCorrupt(decodeArena(dropped, p.key));
  });

  it('chunks that do not fit one arena are a corrupt cache', () => {
    // No routes chunk; two; two chunks for one partition; a chunk of another arena.
    expectCorrupt(decodeArena(block.slice(1), p.key), /no level-≤ 1 routes chunk/);
    expectCorrupt(decodeArena([block[0], ...block], p.key), /two routes chunks/);
    expectCorrupt(decodeArena([...block, block[1]], p.key), /two chunks for one partition/);
    expectCorrupt(decodeArena(block, { layer: 'ground', part: 1 }), /another arena/);
    // Two vertices on one lattice point (a partition re-stating a routes vertex).
    const twin = craft({ routes: false, level: 2, vertices: [[0, 0, 2, 0]] });
    expectCorrupt(decodeArena([craft(square()), twin], GROUND), /two vertices on the lattice point/);
    // An edge twice; an edge row on no edge; a role the registry lacks; a row coarser than its vertex; an edge role on a vertex.
    expectCorrupt(decodeArena([craft(square({ edges: [[0, 1, 0], [0, 1, 0], [0, 2, 0], [1, 3, 0], [2, 3, 0]] }))], GROUND), /two route edges/);
    expectCorrupt(decodeArena([craft(square({ edgeRows: [[0, 3, [[MARGIN, 0, 0, 0]]]] }))], GROUND), /no route edge joins/);
    expectCorrupt(decodeArena([craft(square({ edgeRows: [[0, 1, [[ROLE_REGISTRY.length, 0, 0, 0]]]] }))], GROUND), /role id outside the registry/);
    const fine = square({ vertices: [[0, 0, 1, 0], [4000, 0, 0, 0], [0, 4000, 0, 0], [4000, 4000, 0, 0]], vertexRows: [[0, [[JUNCTION, 0, 0, 0]]]] });
    expectCorrupt(decodeArena([craft(fine)], GROUND), /row coarser than its vertex/);
    expectCorrupt(decodeArena([craft(square({ vertexRows: [[0, [[MARGIN, 0, 0, 0]]]] }))], GROUND), /edge role on a vertex/);
  });

  it('face rows that do not name one ring each are a corrupt cache', () => {
    // A key that is not its ring's own; the clockwise (outside) ring as an outer ring; one ring claimed twice; no ring.
    expectCorrupt(decodeArena([craft(square({ faces: [[0, 1, 3, 0, 0, 0, []]] }))], GROUND), /not its ring's own key/);
    expectCorrupt(decodeArena([craft(square({ faces: [[0, 0, 2, 0, 0, 0, []]] }))], GROUND), /not counter-clockwise/);
    expectCorrupt(decodeArena([craft(square({ faces: [[0, 0, 1, 0, 0, 0, []], [0, 0, 1, 0, 0, 0, []]] }))], GROUND), /claim one ring/);
    expectCorrupt(decodeArena([craft(square({ faces: [[0, 0, 3, 0, 0, 0, []]] }))], GROUND), /does not exist/);
    // An L1 face whose parent cannot be found: an L1 face row inside a square with no L0 face record.
    expectCorrupt(decodeArena([craft(square({ faces: [[1, 0, 1, 0, 0, 0, []]] }))], GROUND), /no L0 face record/);
  });

  it('decodeArena never throws: any bytes give the arena or the typed corrupt cache (fast-check)', () => {
    fc.assert(
      fc.property(fc.nat({ max: block.length - 1 }), fc.nat(), fc.integer({ min: 0, max: 2 }), fc.nat({ max: 255 }), (i, at, mode, value) => {
        const src = block[i].bytes;
        const k = at % src.length;
        let bytes: Uint8Array;
        if (mode === 0) {
          bytes = src.slice();
          bytes[k] = value;
        } else if (mode === 1) {
          bytes = src.slice(0, k);
        } else {
          bytes = Uint8Array.from([...src.slice(0, k), value, ...src.slice(k)]);
        }
        const chunks = block.slice();
        chunks[i] = rehash(block[i], bytes);
        const r = decodeArena(chunks, p.key);
        expect(r.ok || isCorruptCache(r)).toBe(true);
      }),
      { numRuns: 300 },
    );
  });
});
