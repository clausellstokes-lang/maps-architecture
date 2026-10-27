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
// Round S16's declared shift (the faithful read, kerb.ts's module comment; C-0430): the four networks below now read face 1
// faithfully — each first read held a vertex deeper than attractCm in a band (the run vertex (1538, 3986) of draw 1263
// stood 260 cm inside way:1's band, the round S15 reads' ends at the frame 25 – 30 cm inside the frame-side band) — and
// the outline ends on F's boundary with no piece left as a tip: corridorUnion makes no closing at all, the committed
// blocks are the read and the read after the commit is the read before it. C-0421's own mechanism stays pinned by the
// round-S15 outline of face 1 planted through bandCore's `pieces` seam (the third block below), and B-FUZZ's judge
// `closingsBeyond` holds on every closing its family still makes (bfuzz.test.ts).
import { describe, expect, it } from 'vitest';
import { idOf } from '../../../src/arena/index.js';
import { kerbCensus, readKerb, type KerbRead, type Spine } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandClosings, bandCore, outlinePieces, type BandResult } from '../../../src/arr/bandUnion.js';
import { LATTICE } from '../../../src/num/index.js';
import { tx } from '../../../src/tx/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { AT_S9, closingsBeyond, commit, hausdorffCm, healthy, network, normals, readIn, ringsOf, spec, spineDepth, splitsBetweenBlocks, tilesExactly, widthsOf, type Chord } from './support.js';

/** Normal-form rings back to points. */
const parsed = (rs: readonly string[] | null | undefined): LatticePoint[][] =>
  (rs ?? []).map((r) =>
    r.split(' ').map((q) => {
      const [x, y] = q.split(',').map(Number);
      return { x, y } as LatticePoint;
    }),
  );

/** The network's L1 reads before and after corridorUnion's L2 commit, the commit's closings and B-FUZZ's judge on them. */
function run(chords: readonly Chord[]): { faces: number[]; before: Map<number, string[] | null>; after: Map<number, string[] | null>; reads: Map<number, KerbRead>; faithful: Map<number, string>; closings: ReturnType<typeof bandClosings>; beyond: string[]; cu: BandResult; blocks: Map<number, string[]> } {
  const { p, faces, table } = network(chords);
  const ws = widthsOf(table);
  const kerbOf = (f: number) => {
    const k = readIn(p, 1, (o) => readKerb(o, f, ws));
    return k.ok ? k.value : null;
  };
  const before = new Map<number, string[] | null>();
  const reads = new Map<number, KerbRead>();
  const faithful = new Map<number, string>();
  for (const f of faces) {
    const k = kerbOf(f);
    faithful.set(f, kerbCensus(p)?.faithful ?? 'none');
    before.set(f, k === null ? null : normals(k.kerb));
    if (k !== null) reads.set(f, k);
  }
  const cu = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9).value as BandResult;
  healthy(p);
  expect(tilesExactly(p, 2, faces)).toEqual([]);
  const closings = bandClosings(p);
  const after = new Map<number, string[] | null>();
  for (const f of faces) {
    const k = kerbOf(f);
    after.set(f, k === null ? null : normals(k.kerb));
  }
  const blocks = new Map<number, string[]>();
  for (const f of faces) blocks.set(f, normals(cu.blocks.filter((b) => p.faces[2].parent[b] === f).flatMap((b) => ringsOf(p, 2, b))).sort());
  return { faces, before, after, reads, faithful, closings, beyond: closingsBeyond(closings, (f) => kerbOf(f)?.kerb ?? null), cu, blocks };
}

/**
 * Round S16: face 1 read faithfully, its kerb clear of every band (no vertex deeper than attractCm in a band), no closing
 * made; S8 ≡ S9 — every face's committed blocks are its read before the commit (one point set: Hausdorff within the
 * lattice's centimetre); a read after the commit within N-43's bound of the read before it (2 · √2 · attractCm: the
 * committed kerb is new L2 content the after-read's parts meet).
 */
function faithfulNoClosing(r: ReturnType<typeof run>): void {
  expect(r.faithful.get(1)).toBe('taken');
  const k = r.reads.get(1) as KerbRead;
  for (const s of k.spines.values()) expect(spineDepth(k.kerb, s as Spine).depth, s.key).toBeLessThanOrEqual(LATTICE.attractCm);
  expect(r.closings).toEqual([]);
  expect(r.beyond).toEqual([]);
  for (const f of r.faces) {
    if (r.before.get(f) === null || r.cu.whole.includes(f)) continue;
    expect(hausdorffCm(parsed(r.blocks.get(f)), parsed(r.before.get(f))), `face ${String(f)}: S8 ≡ S9`).toBeLessThanOrEqual(1);
    expect(hausdorffCm(parsed(r.after.get(f)), parsed(r.before.get(f))), `face ${String(f)}: after the commit`).toBeLessThanOrEqual(2 * Math.SQRT2 * LATTICE.attractCm);
  }
}

describe('an along-run closing’s run vertex is a vertex kerb(F) holds after the commit (C-0421; B-CLOSE, N-57 (2)) — round S16: the faithful read leaves these four with no closing', () => {
  it('seed 20261011 draw 1263: face 1 read faithfully, no closing (before: folded, its run vertex (1538, 3986) 260 cm inside way:1’s band); the read after the commit the same region', () => {
    const r = run([
      { a: 11_708, b: 7960, hw: 29, knots: null, ends: 'round' },
      { a: 13_806, b: 10_441, hw: 260, knots: null, ends: 'square' },
      { a: 15_104, b: 7783, hw: 8, knots: null, ends: 'square' },
    ]);
    faithfulNoClosing(r);
    // the pre-round run vertex is no vertex of the read; the read after the commit is the read before it, one point set
    // (but for a vertex on a straight edge of it the commit's split made)
    expect((r.before.get(1) ?? []).join(' ')).not.toContain('1538,3986');
    expect(hausdorffCm(parsed(r.after.get(1)), parsed(r.before.get(1)))).toBeLessThanOrEqual(1);
    for (const f of r.faces) if (f !== 1) expect(r.after.get(f)).toEqual(r.before.get(f));
    expect(r.cu.blocks.length).toBe(2);
    expect(r.cu.wholeBand).toEqual([3]);
  });

  it('seed 1012 draw 3369: face 1 read faithfully, no closing (before: along to (2251, 3991)); the read after the commit within N-43’s bound of it', () => {
    const r = run([
      { a: 10_565, b: 7996, hw: 390, knots: null, ends: 'square' },
      { a: 11_994, b: 7972, hw: 29, knots: null, ends: 'square' },
      { a: 13_848, b: 9725, hw: 9, knots: [362, 58], ends: 'square' },
    ]);
    faithfulNoClosing(r);
    expect(r.cu.blocks.length).toBe(2);
    expect(r.cu.wholeBand).toEqual([0, 3]);
  });

  it('fast-check’s shrunk counterexample of seed 20261011: face 1 read faithfully, no closing (before: along to (2546, 3998)); every read after the commit the read before it', () => {
    const r = run([
      { a: 9517, b: 7960, hw: 27, knots: null, ends: 'round' },
      { a: 0, b: 9429, hw: 30, knots: null, ends: 'round' },
      { a: 0, b: 0, hw: 1, knots: null, ends: 'round' },
    ]);
    faithfulNoClosing(r);
    expect([...r.after]).toEqual([...r.before]);
    expect(r.cu.blocks.length).toBe(2);
    expect(r.cu.wholeBand).toEqual([0, 3]);
  });

  it('fast-check’s shrunk counterexample of seed 1012: face 1 read faithfully, no closing (before: folded onto (3693, 3985)); every read after the commit the read before it', () => {
    const r = run([
      { a: 8489, b: 7960, hw: 30, knots: null, ends: 'round' },
      { a: 0, b: 8389, hw: 1, knots: null, ends: 'round' },
    ]);
    faithfulNoClosing(r);
    expect([...r.after]).toEqual([...r.before]);
    expect(r.cu.blocks.length).toBe(2);
    expect(r.cu.wholeBand).toEqual([0, 3]);
  });
});

/** The round S15 read of face 1 (the S13 – S15 pins' kerb(F)), its outline planted through bandCore's `pieces` seam. */
function planted(chords: readonly Chord[], ring: string): { closings: ReturnType<typeof bandClosings>; beyond: string[]; after: string[] | null } {
  const { p, faces, table } = network(chords);
  const ws = widthsOf(table);
  const old = [ring.split(' ').map((q) => {
    const [x, y] = q.split(',').map(Number);
    return { x, y } as LatticePoint;
  })];
  const r = tx(p, spec(2, AT_S9), (o) =>
    bandCore(o as Parameters<typeof bandCore>[0], faces, {
      widths: ws,
      edgeRole: 'kerb',
      entityOf: (f) => idOf(p, p.faces[1].owner[f]),
      owner: null,
      vertexContacts: true,
      pieces: (read) => outlinePieces(read.face === 1 ? { ...read, kerb: old } : read),
    }),
  );
  expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
  healthy(p);
  const kerbOf = (f: number) => {
    const k = readIn(p, 1, (o) => readKerb(o, f, ws));
    return k.ok ? k.value.kerb : null;
  };
  const closings = bandClosings(p);
  const after = kerbOf(1);
  return { closings, beyond: closingsBeyond(closings, kerbOf), after: after === null ? null : normals(after) };
}

describe('C-0421’s mechanism on round S15’s outline planted (bandCore’s `pieces` seam): an along closing only to a run vertex kerb(F) holds after the op, else pinned first or folded', () => {
  it('seed 20261011 draw 1263, round S15’s face 1 outline: its end at (4000, 3931) is folded onto (2362, 3977), never closed along to (1538, 3986); B-FUZZ’s judge holds', () => {
    const r = planted(
      [
        { a: 11_708, b: 7960, hw: 29, knots: null, ends: 'round' },
        { a: 13_806, b: 10_441, hw: 260, knots: null, ends: 'square' },
        { a: 15_104, b: 7783, hw: 8, knots: null, ends: 'square' },
      ],
      '0,896 4000,3783 4000,3931 2362,3977 1853,3983 1538,3986 1735,3817 1689,3764 197,2025 28,1827 0,1851',
    );
    expect(r.beyond).toEqual([]);
    expect(r.closings.some((q) => q.kind === 'along' && q.pin.x === 1538 && q.pin.y === 3986)).toBe(false);
    expect(r.closings.map((q) => q.kind)).toEqual(['folded']);
  });

  it('seed 1012 draw 3369, round S15’s face 1 outline: its end at (2693, 3986) never closed along to (2251, 3991), which kerb(F) no longer holds after the op — pinned first, then folded; B-FUZZ’s judge holds', () => {
    const r = planted(
      [
        { a: 10_565, b: 7996, hw: 390, knots: null, ends: 'square' },
        { a: 11_994, b: 7972, hw: 29, knots: null, ends: 'square' },
        { a: 13_848, b: 9725, hw: 9, knots: [362, 58], ends: 'square' },
      ],
      '0,0 4000,0 4000,3943 2693,3986 2251,3991 2289,3944 229,1872 166,1830 95,1803 0,1792',
    );
    expect(r.beyond).toEqual([]);
    expect((r.after ?? []).join(' ')).not.toContain('2251,3991');
    expect(r.closings.some((q) => q.kind === 'along' && q.pin.x === 2251 && q.pin.y === 3991)).toBe(false);
    expect(r.closings.map((q) => q.kind)).toEqual(['folded']);
  });

  it('seed 20261011 draw 1109 (B-FUZZ’s family under round S16): face 0’s end at (15, 887) closed along to (0, 1631), a vertex kerb(F) holds after the op; B-FUZZ’s judge holds', () => {
    const { p, faces, table } = network([
      { a: 10_602, b: 8022, hw: 44, knots: null, ends: 'square' },
      { a: 14_369, b: 33, hw: 7, knots: null, ends: 'square' },
      { a: 15_061, b: 19, hw: 587, knots: [14, 240], ends: 'square' },
    ]);
    const ws = widthsOf(table);
    commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
    healthy(p);
    expect(tilesExactly(p, 2, faces)).toEqual([]);
    const kerbOf = (f: number) => {
      const k = readIn(p, 1, (o) => readKerb(o, f, ws));
      return k.ok ? k.value.kerb : null;
    };
    const closings = bandClosings(p);
    expect(closings).toMatchObject([{ kind: 'along', face: 0, piece: 0, end: 0, contact: { x: 15, y: 887 }, pin: { x: 0, y: 1631 }, tip: { x: 41, y: 887 } }]);
    expect(closingsBeyond(closings, kerbOf)).toEqual([]);
    expect(normals(kerbOf(0) ?? []).join(' ')).toContain('0,1631');
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
