// M0-a-02: the arena's size (§2.2 *Size*) on a CITY-shaped synthetic arena — ≈ 80 k vertices, ≈ 240 k half-edges, their
// role rows, five face tables and the two lookup tables — within ≈ 12 MB (reported; PLAUSIBLE until M1 measures a real
// CITY). The counts the design does not state are this test's assumptions (C-0146 (9)): 150 000 role rows over
// 60 000 keys, faces per level 50 / 2 000 / 10 000 / 25 000 / 40 000, owners per level 30 / 500 / 4 000 / 8 000 /
// 16 000. The index home (§3.3's column, ≈ 0.5 MB in the design's count) and the interned ids are reported apart, as
// the design counts them apart. A size, never a timing.
import { describe, expect, it } from 'vitest';
import {
  addRoleRow,
  allocEdgePair,
  allocFace,
  allocVertex,
  createPlat,
  intern,
  roleIdOf,
  type Five,
  type Plat,
  type PlatCapacity,
} from '../../src/arena/index.js';
import type { Level } from '../../src/types/index.js';
import { FRAME, GROUND, pt } from './support.js';

const V = 80_000;
const PAIRS = 120_000;
const ROWS = 150_000;
const KEYS = 60_000;
const FACES: Five<number> = [50, 2_000, 10_000, 25_000, 40_000];
const OWNERS: Five<number> = [30, 500, 4_000, 8_000, 16_000];
const MiB = 1024 * 1024;

function bytesOf(v: unknown, seen = new Set<unknown>()): number {
  if (v === null || typeof v !== 'object' || seen.has(v)) return 0;
  seen.add(v);
  if (ArrayBuffer.isView(v)) return v.byteLength;
  let n = 0;
  for (const k of Reflect.ownKeys(v)) n += bytesOf((v as Record<string | symbol, unknown>)[k], seen);
  return n;
}

function city(capacity: Partial<PlatCapacity>): Plat {
  const p = createPlat(GROUND, FRAME, capacity);
  const side = 400;
  for (let i = 0; i < V; i++) allocVertex(p, pt((i % side) * 30, Math.floor(i / side) * 30), (i % 5) as Level);
  for (let e = 0; e < PAIRS; e++) allocEdgePair(p, e % V, (e * 7 + 1) % V === e % V ? (e + 1) % V : (e * 7 + 1) % V, 0);
  const entities: number[] = [];
  for (let k = 0; k < KEYS; k++) entities.push(intern(p, `plot:${k.toString(36).padStart(4, '0')}`));
  const roles = [roleIdOf('way'), roleIdOf('kerb'), roleIdOf('plot_line'), roleIdOf('frontage'), roleIdOf('party_wall')];
  // ROWS rows over KEYS keys, each key on 2 or 3 edge pairs, no pair carrying one key twice
  for (let r = 0; r < ROWS; r++) {
    const k = r % KEYS;
    const copy = Math.floor(r / KEYS);
    addRoleRow(p, 2 * ((k * 2 + copy * 40_001) % PAIRS), roles[k % 5], entities[k], 2, 0);
  }
  for (let l = 0; l < 5; l++) {
    for (let f = 0; f < FACES[l]; f++) {
      allocFace(p, l as Level, { outer: 2 * (f % PAIRS), kind: 1, owner: entities[f % OWNERS[l]], stage: l, parent: l === 0 ? -1 : f % FACES[l - 1] });
    }
  }
  return p;
}

function report(p: Plat): { arena: number; indexHome: number; handles: number } {
  const all = bytesOf(p);
  const indexHome = bytesOf(p.indexHome);
  const handles = bytesOf(p.handles);
  return { arena: all - indexHome - handles, indexHome, handles };
}

describe('the arena\'s size at CITY (§2.2 Size; PLAUSIBLE until M1)', () => {
  it('sized to its counts: the tables within ≈ 12 MB (≤ 12 MiB), the index home ≈ 0.5 MB', () => {
    const p = city({ vertices: V, edgePairs: PAIRS, faces: FACES, roleRows: ROWS, roleKeys: KEYS, owners: OWNERS, handles: KEYS, idUnits: KEYS * 9, holes: 16 });
    expect([p.slots.vertex.live, 2 * p.slots.pair.live, p.slots.role.live, p.roles.head.count]).toEqual([V, 2 * PAIRS, ROWS, KEYS]);
    expect(p.roles.head.first.length).toBe(131_072); // ≈ 1.5 MB of role heads at 12 B a slot
    expect(p.faces.reduce((s, f) => s + f.ownerHead.head.length, 0)).toBe(64 + 1_024 + 8_192 + 16_384 + 32_768); // ≈ 0.47 MB at 8 B
    const r = report(p);
    console.info(`M0-a-02 size (PLAUSIBLE until M1): arena tables ${(r.arena / MiB).toFixed(2)} MiB, index home ${(r.indexHome / MiB).toFixed(2)} MiB, interned ids ${(r.handles / MiB).toFixed(2)} MiB`);
    expect(r.arena).toBeLessThanOrEqual(12 * MiB);
    expect(r.arena).toBeGreaterThan(9 * MiB);
    expect(r.indexHome).toBeLessThanOrEqual(0.6 * MiB);
  });

  it('grown from the default sizes by doubling: at most twice the sized arena (slots are compacted on save, §3.9)', () => {
    const sized = report(city({ vertices: V, edgePairs: PAIRS, faces: FACES, roleRows: ROWS, roleKeys: KEYS, owners: OWNERS, handles: KEYS, idUnits: KEYS * 9, holes: 16 }));
    const grown = report(city({}));
    console.info(`M0-a-02 size grown by doubling: arena tables ${(grown.arena / MiB).toFixed(2)} MiB`);
    expect(grown.arena).toBeGreaterThanOrEqual(sized.arena);
    expect(grown.arena).toBeLessThanOrEqual(2 * sized.arena);
  }, 120_000);
});
