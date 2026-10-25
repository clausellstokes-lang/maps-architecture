// An along-run closing commits only a run vertex kerb(F) holds as an L1 read reads it after the op (round S13, C-0421;
// bandUnion.ts `offRead` and its module comment; N-57 (2), N-45 (a); B-CLOSE of checks/M0-a-09-s12.md).
// An L1 read lays its parts at L2 (kerb.ts `dryLevel`), so after corridorUnion's L2 commit it meets what the commit
// wrote. Where the insertion left an open piece's end as a tip off its contact and the closing joined it to the run's
// vertex along F's boundary (`runVertex`), the tip and that chord are new L2 content beside F's boundary, and the L1 read
// after the commit read F's outline there otherwise: B-FUZZ's own judge (`closingsBeyond`, N-57 (2): "the run's vertex
// on kerb(F)") went red at its two fixed census seeds — seed 20261011 draw 1263 (face 1's run vertex (1538, 3986)
// 259.6 cm off the after-commit kerb, its tip (2362, 3977) read at (2362, 3952)) and seed 1012 draw 3369 ((2251, 3991)
// 34.8 cm off), with fast-check's shrunk counterexamples of both. Before this round (bandUnion.ts sha256 45137034…, the
// S9 engine) each of the four networks below committed that 'along' closing and failed the judge. Now the op reads each
// face with an along closing again on the arena its run left (in its L2 batch: the read a later L1 read makes) and an end
// whose run vertex stands off that outline is pinned first on the next run (the closing's own fallback, N-57 (2)); here
// the contact cannot be pinned within attractCm and the piece — a sliver within attractCm of F's boundary — is folded
// onto it (C-0218 (7)), so the committed block and every L1 read after the commit agree on the closing.
//
// The second describe (round S13, C-0422; bandUnion.ts `cutSplits`; B-SPLIT, found by this round's NEAR at the PR size —
// testkit agreement-corridor.test.ts holds that case): a split guarded on its input chain may still be laid by the
// insertion between two faces of F that read outside the band — a split cutting a block (N-52 (2)). The op judges its
// splits on the faces the arena holds and runs again with such a split left out. B-FUZZ's own family meets it at seed
// 1012 draw 7964: face 1's wedge split J (3940, 3447) → K (3917, 3019) → (3891, 3022) laid its last
// leg onto (3888, 2999), so the sliver (3888, 2999) – (3917, 3019) – (3940, 3447) was committed as a second block of
// face 1, the split edge (3917, 3019) – (3888, 2999) between the two (round S9's engine; no B-FUZZ judge reads it).
import { describe, expect, it } from 'vitest';
import { readKerb } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandClosings, type BandResult } from '../../../src/arr/bandUnion.js';
import { LATTICE } from '../../../src/num/index.js';
import { AT_S9, closingsBeyond, commit, healthy, network, normals, readIn, splitsBetweenBlocks, tilesExactly, widthsOf, type Chord } from './support.js';

/** The network's L1 reads before and after corridorUnion's L2 commit, the commit's closings and B-FUZZ's judge on them. */
function run(chords: readonly Chord[]): { faces: number[]; before: Map<number, string[] | null>; after: Map<number, string[] | null>; closings: ReturnType<typeof bandClosings>; beyond: string[]; cu: BandResult } {
  const { p, faces, table } = network(chords);
  const ws = widthsOf(table);
  const kerbOf = (f: number) => {
    const k = readIn(p, 1, (o) => readKerb(o, f, ws));
    return k.ok ? k.value.kerb : null;
  };
  const before = new Map<number, string[] | null>();
  for (const f of faces) {
    const k = kerbOf(f);
    before.set(f, k === null ? null : normals(k));
  }
  const cu = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9).value as BandResult;
  healthy(p);
  expect(tilesExactly(p, 2, faces)).toEqual([]);
  const closings = bandClosings(p);
  const after = new Map<number, string[] | null>();
  for (const f of faces) {
    const k = kerbOf(f);
    after.set(f, k === null ? null : normals(k));
  }
  return { faces, before, after, closings, beyond: closingsBeyond(closings, kerbOf), cu };
}

/**
 * The one closing of face 1's piece 0: no along-run closing to the pre-round run vertex — its end pinned first, the
 * contact not placeable within attractCm, the piece (a sliver within attractCm of F's boundary) folded (C-0218 (7)).
 */
function folded(r: ReturnType<typeof run>, contact: readonly [number, number], pin: readonly [number, number], pre: readonly [number, number]): void {
  expect(r.beyond).toEqual([]);
  expect(r.closings.length).toBe(1);
  const c = r.closings[0];
  expect(c).toMatchObject({ kind: 'folded', face: 1, piece: 0, end: 0, contact: { x: contact[0], y: contact[1] }, pin: { x: pin[0], y: pin[1] } });
  expect(c.kind === 'folded' && c.widthCm <= LATTICE.attractCm).toBe(true);
  expect(r.closings.some((q) => q.kind === 'along' && q.pin.x === pre[0] && q.pin.y === pre[1])).toBe(false);
}

describe('an along-run closing’s run vertex is a vertex kerb(F) holds after the commit (C-0421; B-CLOSE, N-57 (2))', () => {
  it('seed 20261011 draw 1263: face 1’s end is not closed along to (1538, 3986); the read is the same before and after the commit', () => {
    const r = run([
      { a: 11_708, b: 7960, hw: 29, knots: null, ends: 'round' },
      { a: 13_806, b: 10_441, hw: 260, knots: null, ends: 'square' },
      { a: 15_104, b: 7783, hw: 8, knots: null, ends: 'square' },
    ]);
    folded(r, [4000, 3931], [2362, 3977], [1538, 3986]);
    // every L1 read after the commit is the read before it (the committed outline is the read's, the sliver folded)
    expect([...r.after]).toEqual([...r.before]);
    expect(r.before.get(1)).toEqual(['0,896 4000,3783 4000,3931 2362,3977 1853,3983 1538,3986 1735,3817 1689,3764 197,2025 28,1827 0,1851']);
    expect(r.cu.blocks.length).toBe(2);
    expect(r.cu.wholeBand).toEqual([0, 3]);
  });

  it('seed 1012 draw 3369: face 1’s end is not closed along to (2251, 3991)', () => {
    const r = run([
      { a: 10_565, b: 7996, hw: 390, knots: null, ends: 'square' },
      { a: 11_994, b: 7972, hw: 29, knots: null, ends: 'square' },
      { a: 13_848, b: 9725, hw: 9, knots: [362, 58], ends: 'square' },
    ]);
    folded(r, [4000, 3943], [2693, 3986], [2251, 3991]);
    expect(r.before.get(1)).toEqual(['0,0 4000,0 4000,3943 2693,3986 2251,3991 2273,3964 2289,3944 229,1872 166,1830 95,1803 0,1792']);
    expect(r.cu.blocks.length).toBe(2);
    expect(r.cu.wholeBand).toEqual([0, 3]);
  });

  it('fast-check’s shrunk counterexample of seed 20261011: face 1’s end is not closed along to (2546, 3998)', () => {
    const r = run([
      { a: 9517, b: 7960, hw: 27, knots: null, ends: 'round' },
      { a: 0, b: 9429, hw: 30, knots: null, ends: 'round' },
      { a: 0, b: 0, hw: 1, knots: null, ends: 'round' },
    ]);
    folded(r, [4000, 3933], [2699, 3994], [2546, 3998]);
    expect(r.cu.blocks.length).toBe(2);
    expect(r.cu.wholeBand).toEqual([0, 3]);
  });

  it('fast-check’s shrunk counterexample of seed 1012: face 1’s end is not closed along to (3586, 3994)', () => {
    const r = run([
      { a: 8489, b: 7960, hw: 30, knots: null, ends: 'round' },
      { a: 0, b: 8389, hw: 1, knots: null, ends: 'round' },
    ]);
    folded(r, [4000, 3930], [3693, 3985], [3586, 3994]);
    expect(r.cu.blocks.length).toBe(1);
    expect(r.cu.wholeBand).toEqual([0, 3]);
  });
});

describe('a split never cuts a block of its face: one the insertion laid between two of them is left out (C-0422; B-SPLIT, N-52 (2))', () => {
  it('seed 1012 draw 7964: face 1 keeps one block, no split between two blocks', () => {
    const { p, faces, table } = network([
      { a: 3542, b: 7964, hw: 26, knots: null, ends: 'round' },
      { a: 12_289, b: 11_202, hw: 12, knots: [238, 372], ends: 'square' },
      { a: 7467, b: 13_887, hw: 7, knots: [399, 372], ends: 'square' },
    ]);
    const ws = widthsOf(table);
    const cu = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9).value as BandResult;
    healthy(p);
    expect(tilesExactly(p, 2, faces)).toEqual([]);
    expect(splitsBetweenBlocks(p, 2, cu.blocks)).toEqual([]);
    const inFace1 = cu.blocks.filter((b) => p.faces[2].parent[b] === 1);
    expect(inFace1.length).toBe(1);
    expect(cu.blocks.length).toBe(3);
    expect([...cu.wholeBand].sort()).toEqual([2, 3]);
  });
});
