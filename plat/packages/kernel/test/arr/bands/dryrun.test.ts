// kerb(F)'s read is a dry-run on the real arena (session round S9, the ruling on KI-12; C-0387; kerb.ts's module
// comment): no scratch arrangement is built for a read — `createPlat`, the door a scratch overlay is built through
// (winding.ts imports it from ../arena/index.js), is never called by one — its parts go through `insertChain` (the door,
// imported by kerb.ts from ../insert/insertChain.js) under ONE op savepoint (`opSave`, ../faces/common.js), and the read
// leaves the arena bit-identical and the batch's work, warnings and journals as it found them. Counted through vitest
// module mocks of those three modules, each spreading the real module and wrapping the one function in a counter; the
// counter is reset after the fixture's own build (the fixtures call createPlat and insertChain themselves) and read
// after each read, on the fusion fixture's faces (vertexcontact-faces.json), the dead-end fixture's (deadend-faces.json)
// and B-FUZZ's networks (bfuzz.test.ts's chord arbitrary, a fixed sample). Before round S9 every non-trivial read built
// at least one arena (fusion 3/33/44: 2 each, with 334/338/548 two-point insertions; dead end: 1, with 198; 200 networks
// of seed 20261019: 422 reads, 434 arenas, 21 613 insertions, no savepoint — the CHECKPOINT of 2026-10-19 02:58).
import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';

const counts = { createPlat: 0, insertChain: 0, opSave: 0 };

vi.mock('../../../src/arena/index.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/arena/index.js')>();
  return { ...real, createPlat: (...a: Parameters<typeof real.createPlat>) => { counts.createPlat += 1; return real.createPlat(...a); } };
});
vi.mock('../../../src/insert/insertChain.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/insert/insertChain.js')>();
  return { ...real, insertChain: (...a: Parameters<typeof real.insertChain>) => { counts.insertChain += 1; return real.insertChain(...a); } };
});
vi.mock('../../../src/faces/common.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/faces/common.js')>();
  return { ...real, opSave: (...a: Parameters<typeof real.opSave>) => { counts.opSave += 1; return real.opSave(...a); } };
});

import type { FaceId, Plat } from '../../../src/arena/index.js';
import { CENSUS_DEEP, kerb, kerbCensus, readKerb, type SpineWidths } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandUnion, type BandResult } from '../../../src/arr/bandUnion.js';
import { bits } from '../../tx/support.js';
import { AT_S9, buildContact, buildDeadEnd, commit, contactFixtures, deadEndFixtures, firstBand, healthy, network, normals, readIn, ringsOf, state, tilesExactly, widthsOf, type Chord } from './support.js';

type Counts = typeof counts;

/** One read's counts and what it left behind. */
interface ReadCount extends Counts {
  readonly ok: boolean;
  /** Parts the read laid (insertChain calls; 0: a spine-less face or no part near F). */
  readonly parts: number;
  /** The arena bit for bit, the batch's work, warnings and journals unchanged across the read. */
  readonly untouched: boolean;
  /**
   * May the read have been restaged (C-0390: a second dry-run follows only a census refusal, CENSUS_DEEP)? Its census
   * added vertex-only spines and the read ended ok or with that refusal.
   */
  readonly restageable: boolean;
}

/** Every face's kerb read in one L1 batch, each counted on its own. */
function countReads(p: Plat, faces: readonly FaceId[], ws: SpineWidths): ReadCount[] {
  const out: ReadCount[] = [];
  const before = state(p);
  commit(p, 1, (o) => {
    for (const f of faces) {
      const b0 = bits(p);
      const w0 = { work: o.work.total, counts: JSON.stringify([...o.work.counts]), warnings: JSON.stringify(o.warnings), journal: JSON.stringify(o.journal) };
      counts.createPlat = 0;
      counts.insertChain = 0;
      counts.opSave = 0;
      const k = kerb(o, f, ws);
      const c = { ...counts };
      const w1 = { work: o.work.total, counts: JSON.stringify([...o.work.counts]), warnings: JSON.stringify(o.warnings), journal: JSON.stringify(o.journal) };
      const restageable = (kerbCensus(p)?.reaching.length ?? 0) > 0 && (k.ok || k.detail === CENSUS_DEEP);
      out.push({ ...c, ok: k.ok, parts: c.insertChain, untouched: bits(p) === b0 && JSON.stringify(w1) === JSON.stringify(w0), restageable });
    }
    return { ok: true, value: null, warnings: [] };
  });
  // and the batch committed nothing (the read-only service writes nothing)
  expect(state(p).replace(/#v\d+$/, '')).toBe(before.replace(/#v\d+$/, ''));
  return out;
}

/**
 * No scratch arena; one savepoint per read that lays a part, none for one that lays none — a second only where the
 * census refused and the read was restaged (C-0390, round S12); the arena and batch untouched.
 */
function expectDryRun(per: readonly ReadCount[], label: string): void {
  for (const [i, c] of per.entries()) {
    expect(c.createPlat, `${label} read ${String(i)}: arenas built`).toBe(0);
    expect(c.opSave, `${label} read ${String(i)}: savepoints`).toBeLessThanOrEqual(c.restageable ? 2 : 1);
    if (c.parts > 0) expect(c.opSave, `${label} read ${String(i)}: one savepoint (two restaged)`).toBeGreaterThanOrEqual(1);
    if (c.parts > 0 && !c.restageable) expect(c.opSave, `${label} read ${String(i)}: one savepoint`).toBe(1);
    expect(c.untouched, `${label} read ${String(i)}: the arena and the batch as the read found them`).toBe(true);
  }
}

describe('kerb(F) is a dry-run on the real arena: no scratch arrangement, one savepoint, nothing left behind (C-0387; KI-12)', () => {
  it('the fusion fixture’s faces (CITY seeds 3/33/44, vertexcontact-faces.json)', () => {
    const fx = contactFixtures();
    expect(fx.map((f) => f.seed)).toEqual([3, 33, 44]);
    for (const f of fx) {
      const { p, face, widths } = buildContact(f);
      const per = countReads(p, [face], widths);
      expect(per[0].ok).toBe(true);
      expect(per[0].parts).toBeGreaterThan(0);
      expectDryRun(per, `fusion ${String(f.seed)}`);
    }
  });

  it('the dead-end fixture’s faces (deadend-faces.json)', () => {
    for (const f of deadEndFixtures()) {
      const { p, face, widths } = buildDeadEnd(f);
      const per = countReads(p, [face], widths);
      expect(per[0].ok).toBe(true);
      expect(per[0].parts).toBeGreaterThan(0);
      expectDryRun(per, `dead end ${String(f.face)}`);
    }
  });

  it('B-FUZZ’s networks (a fixed sample of bfuzz.test.ts’s chords, seed 20261019): every read, refused or not', { timeout: 1_800_000 }, () => {
    const chordArb: fc.Arbitrary<Chord> = fc.record({
      a: fc.integer({ min: 0, max: 15_999 }),
      b: fc.oneof(fc.integer({ min: 0, max: 15_999 }), fc.integer({ min: 0, max: 60 }), fc.integer({ min: 7_960, max: 8_040 })),
      hw: fc.oneof(fc.integer({ min: 1, max: 30 }), fc.integer({ min: 30, max: 600 })),
      knots: fc.option(fc.tuple(fc.integer({ min: 5, max: 600 }), fc.integer({ min: 5, max: 600 })), { freq: 3 }),
      ends: fc.constantFrom<'round' | 'square'>('round', 'square'),
    });
    const nets = fc.sample(fc.array(chordArb, { minLength: 1, maxLength: 3 }), { seed: 20_261_019, numRuns: 100 });
    let reads = 0;
    let laid = 0;
    for (const chords of nets) {
      const { p, faces, table } = network(chords);
      const per = countReads(p, faces, widthsOf(table));
      expectDryRun(per, JSON.stringify(chords));
      reads += per.length;
      laid += per.filter((c) => c.parts > 0).length;
    }
    console.info(`dry-run census: ${String(reads)} reads on 100 networks, ${String(laid)} laid parts (one savepoint each), 0 arenas built`);
    // not vacuous: most reads lay parts
    expect(laid).toBeGreaterThan(reads / 2);
  });

  it('the overlay must be open: a shell transaction is a programming error (openTx), never a read on a bare arena', () => {
    const { p, faces, table } = network([{ a: 2000, b: 10_000, hw: 200, knots: null, ends: 'round' }]);
    const shell = { plat: p, key: p.key, level: 1, workLimit: 1e9, work: { total: 0, counts: new Map<string, number>() }, warnings: [], journal: { vertices: [], pairs: [], split: [], steiner: 0, changed: [] }, open: true } as unknown as Parameters<typeof readKerb>[0];
    expect(() => readKerb(shell, faces[0], widthsOf(table))).toThrow(/no open transaction/);
  });
});

// The dry-run labels each face inside F by its winding against every part AS THE ARENA HOLDS IT — the cycle of edges
// carrying the part's row from `ChainInsert.placed` (kerb.ts `cycleOf`) — never the part's clipped input ring (C-0387;
// kerb.ts's module comment; N-45 (a)). Where the insertion moves a part's point (a run end on a window line attracted
// to a vertex within attractCm, or two points closer than minEdge merged), the held cycle and the input ring bound
// different regions, and a face between them is kerb by the held cycle and band by the input: labelled from the input,
// the corner face's kerb reads EMPTY at S8 and corridorUnion commits no block there at S9 (S8 ≡ S9 kept, but both wrong
// — a block the arena holds outside every band is lost). The closing check of round S9 (checks/M0-a-09-s9.md, B-ME)
// found these networks in B-FUZZ's chord arbitrary, seed 20261011 (draws 532, 275 and 71); the probe of round S10 read
// the two labels at each face's interior point:
//   draw 532, L2 face inside F 2 at (3956.25, 3983.5): the input ring `4000,3967 4000,3980 3825,4000 1585,4000` winds 1,
//     the held cycle `4000,3967 3825,4000 1585,4000` winds 0 — the input point (4000, 3980) merged into (4000, 3967);
//   draw 275, L2 face inside F 2 at (2765.25, 3715): part 1's input `40,0 194,172 2967,3986 2948,4000` winds 1, its held
//     cycle `194,172 2534,3430 2948,4000 40,0` winds 0 — the strip's edge attracted to the vertex (2534, 3430);
//   draw 71, bandUnion's L3 read, face at (9.9, 20): the band's input `0,0 4000,4000 3980,4000 0,20` winds 1, its held
//     cycle `4000,4000 3960,4000 0,0` winds 0 — (3980, 4000) attracted to the kerb vertex (3960, 4000), (0, 20) to (0, 0).
// Each case is red under the mutant that labels from `d.clipped` (the round S10 self-check: ME).
describe('the dry-run labels against the parts as the arena holds them, never the clipped input ring (C-0387; B-ME)', () => {
  /** kerb(F) of every face read in one L1 batch, in normal form, with corridorUnion's L2 commit after it. */
  function s8s9(chords: readonly Chord[]): { p: Plat; faces: FaceId[]; table: ReturnType<typeof network>['table']; kerbs: Map<FaceId, string[] | string>; cu: BandResult; blockOf: Map<FaceId, string[]> } {
    const { p, faces, table } = network(chords);
    const ws = widthsOf(table);
    const kerbs = new Map<FaceId, string[] | string>();
    readIn(p, 1, (o) => {
      for (const f of faces) {
        const k = kerb(o, f, ws);
        kerbs.set(f, k.ok ? normals(k.value) : `${k.code} ${k.detail}`);
      }
      return null;
    });
    const cu = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9).value as BandResult;
    healthy(p);
    expect(tilesExactly(p, 2, faces)).toEqual([]);
    const blockOf = new Map<FaceId, string[]>();
    for (const b of cu.blocks) blockOf.set(p.faces[2].parent[b], normals(ringsOf(p, 2, b)));
    return { p, faces, table, kerbs, cu, blockOf };
  }

  it('draw 532 (seed 20261011): the corner face an attracted run end leaves outside the held part is kerb at S8 and a block at S9', () => {
    const { faces, kerbs, cu, blockOf } = s8s9([
      { a: 3, b: 4054, hw: 432, knots: [14, 456], ends: 'square' },
      { a: 10_415, b: 7967, hw: 138, knots: [256, 13], ends: 'square' },
    ]);
    expect(faces).toEqual([0, 1, 2]);
    const corner = ['4000,3967 4000,4000 3825,4000'];
    expect(kerbs.get(2)).toEqual(corner);
    // S8 ≡ S9 on that face: the committed block is the kerb read (Hausdorff 0 by normal forms)
    expect(blockOf.get(2)).toEqual(corner);
    expect(cu.blocks.length).toBe(2);
    expect(cu.wholeBand).toEqual([1]);
    for (const [f, k] of kerbs) if (Array.isArray(k) && k.length > 0) expect(blockOf.get(f), `face ${String(f)}`).toEqual(k);
  });

  it('draw 275 (seed 20261011): the face between a strip’s input edge and its held edge is kerb at S8 and a block at S9', () => {
    const { faces, kerbs, cu, blockOf } = s8s9([
      { a: 6007, b: 40, hw: 13, knots: [369, 590], ends: 'round' },
      { a: 8372, b: 29, hw: 434, knots: null, ends: 'round' },
      { a: 9052, b: 59, hw: 23, knots: null, ends: 'round' },
    ]);
    expect(faces).toEqual([0, 1, 2, 3]);
    const sliver = ['2534,3430 3045,4000 2948,4000'];
    expect(kerbs.get(2)).toEqual(sliver);
    expect(blockOf.get(2)).toEqual(sliver);
    expect(cu.blocks.length).toBe(4);
    expect(cu.wholeBand).toEqual([]);
  });

  it('draw 71 (seed 20261011): bandUnion’s L3 read keeps the corner face its band’s held cycle leaves out', () => {
    const { p, faces, table, kerbs, cu } = s8s9([{ a: 15_996, b: 8002, hw: 28, knots: null, ends: 'round' }]);
    expect(faces).toEqual([0, 1]);
    expect(kerbs.get(0)).toEqual(['0,40 3960,4000 0,4000']);
    expect(kerbs.get(1)).toEqual(['40,0 4000,0 4000,3960']);
    expect(cu.blocks.length).toBe(2);
    const b = commit(p, 3, (o) => bandUnion(o, firstBand(table), faces, 'band', 'band:1'), AT_S9).value as BandResult;
    healthy(p);
    expect(b.blocks.length).toBe(2);
    expect(b.whole).toEqual([]);
    const blocks = b.blocks.map((f) => normals(ringsOf(p, 3, f))[0]).sort();
    expect(blocks).toEqual(['0,0 3960,4000 0,40', '0,0 40,0 4000,3960'].sort());
  });
});

// The held cycle runs along the part's EDGES, never the straight chords between its placed vertices (C-0387, C-0388;
// kerb.ts `cycleOf`: "from each vertex an input point became to the next along its row's edges"; round S11, the
// closing check of round S10's blocker B-ME2, checks/M0-a-09-s10.md (3)). Where the arena holds a vertex on the part's
// row between two placed vertices (a crossing, an attracted or a Steiner vertex off the chord), a face between the
// chord and the held edges is labelled by the held edges; labelled by the chord (the mutant ME2: `cyc.push(at(a))`,
// the row's path unread) it reads the wrong side: a block the arena holds outside every band is lost at S8 and at S9,
// or a ring is read that the commit does not hold (S8 ≢ S9). The networks are draws of B-FUZZ's chord arbitrary, seed
// 20261011, that the checker's outcome census found moved under ME2 (draws 1682, 3213, 389, 1109); each case is red
// under ME2 and under ME in the round S11 self-check, green on the tree.
describe('the held cycle runs along the part’s row edges, never the chords between its placed vertices (C-0387; B-ME2)', () => {
  /** kerb(F) of every face in one L1 batch, then corridorUnion's L2 commit: every block's rings by the L1 face it lies in. */
  function readAndCommit(chords: readonly Chord[]): { faces: FaceId[]; kerbs: Map<FaceId, string[] | string>; cu: BandResult; blocksIn: Map<FaceId, string[]> } {
    const { p, faces, table } = network(chords);
    const ws = widthsOf(table);
    const kerbs = new Map<FaceId, string[] | string>();
    readIn(p, 1, (o) => {
      for (const f of faces) {
        const k = kerb(o, f, ws);
        kerbs.set(f, k.ok ? normals(k.value) : `${k.code} ${k.detail}`);
      }
      return null;
    });
    const cu = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9).value as BandResult;
    healthy(p);
    expect(tilesExactly(p, 2, faces)).toEqual([]);
    const blocksIn = new Map<FaceId, string[]>();
    for (const b of cu.blocks) {
      const f = p.faces[2].parent[b];
      blocksIn.set(f, [...(blocksIn.get(f) ?? []), ...normals(ringsOf(p, 2, b))].sort());
    }
    return { faces, kerbs, cu, blocksIn };
  }

  it('draw 1682 (seed 20261011): face 0’s small corner ring is kerb at S8 and a block at S9', () => {
    const { faces, kerbs, cu, blocksIn } = readAndCommit([
      { a: 15_325, b: 3139, hw: 430, knots: [559, 488], ends: 'round' },
      { a: 14_782, b: 0, hw: 200, knots: [405, 455], ends: 'round' },
      { a: 4320, b: 13_582, hw: 236, knots: [430, 199], ends: 'square' },
    ]);
    expect(faces).toEqual([0, 1, 2]);
    const face0 = ['2702,606 0,2188 0,1233 118,1222', '3626,0 3697,0 3622,67'];
    expect(kerbs.get(0)).toEqual(face0);
    expect(blocksIn.get(0)).toEqual([...face0].sort());
    expect(cu.blocks.length).toBe(4);
    expect(cu.wholeBand).toEqual([]);
    for (const [f, k] of kerbs) expect(blocksIn.get(f) ?? [], `face ${String(f)}`).toEqual(Array.isArray(k) ? [...k].sort() : k);
  });

  it('draw 3213 (seed 20261011): face 0’s kerb is the ring beside the held edges and a block at S9', () => {
    const { faces, kerbs, cu, blocksIn } = readAndCommit([
      { a: 2153, b: 8005, hw: 313, knots: [532, 291], ends: 'round' },
      { a: 4624, b: 50, hw: 473, knots: [261, 182], ends: 'round' },
      { a: 15_322, b: 5857, hw: 14, knots: [419, 141], ends: 'square' },
    ]);
    expect(faces).toEqual([0, 1, 2, 3, 4, 5]);
    const face0 = ['1386,0 1623,0 1624,54 1562,40'];
    expect(kerbs.get(0)).toEqual(face0);
    expect(blocksIn.get(0)).toEqual(face0);
    expect(cu.blocks.length).toBe(6);
    for (const [f, k] of kerbs) expect(blocksIn.get(f) ?? [], `face ${String(f)}`).toEqual(Array.isArray(k) ? [...k].sort() : k);
  });

  it('draws 389 and 1109 (seed 20261011): a face the held parts cover reads EMPTY and corridorUnion commits it whole to the band (S8 ≡ S9)', () => {
    const d389 = readAndCommit([
      { a: 5208, b: 8033, hw: 10, knots: null, ends: 'square' },
      { a: 14_675, b: 7961, hw: 481, knots: [217, 486], ends: 'square' },
    ]);
    expect(d389.faces).toEqual([0, 1, 2, 3]);
    expect(d389.kerbs.get(3)).toEqual([]);
    expect(d389.blocksIn.has(3)).toBe(false);
    expect(d389.cu.wholeBand).toEqual([3]);
    expect(d389.cu.blocks.length).toBe(3);
    const d1109 = readAndCommit([
      { a: 10_602, b: 8022, hw: 44, knots: null, ends: 'square' },
      { a: 14_369, b: 33, hw: 7, knots: null, ends: 'square' },
      { a: 15_061, b: 19, hw: 587, knots: [14, 240], ends: 'square' },
    ]);
    expect(d1109.faces).toEqual([0, 1, 2]);
    expect(d1109.kerbs.get(1)).toEqual([]);
    expect(d1109.blocksIn.has(1)).toBe(false);
    expect([...d1109.cu.wholeBand].sort()).toEqual([1, 2]);
    expect(d1109.cu.blocks.length).toBe(1);
  });
});
