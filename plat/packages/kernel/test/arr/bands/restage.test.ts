// The restaged read (round S12, C-0420; kerb.ts `restagedRead` and its module comment): where J318's census lays the
// reaching vertex-only spines' parts on the arena that holds the edge spines' and its post-condition (C-0381, `clearOf`'s
// reading at DRY_MOVE_CM) finds a vertex of the region deep in a vertex-only band, the read is rolled back and read once
// more on a fresh dry-run with the vertex-only parts laid FIRST and the edge spines' after them, accepted only where no
// vertex lies deeper in any of F's spines' buffers than an insertion's move; refused too, the census's refusal stands.
// ZERO REFUSALS (J264) and N-58: the two networks below are LAWFUL inputs that round S11's NEAR at the PR size (a random
// seed) met refused by the census with the insertChain-alone replay holding the refusing part exactly (J433 'own'; kerb
// own 2 and corridorUnion own 2 against B-FUZZ's own cap of 1, bfuzz.test.ts; notes row 65, C-0419) — MAKE-IT-SUCCEED.
// Before this round (kerb.ts sha256 17a8a408…, round S9's record) both reads refused E_INVARIANT CENSUS_DEEP:
//   N1 face 2: the census laid way:1's end strip on the arena holding way:0's and way:2's held edges; its end edge was
//     routed through their meeting vertex (366, 12) and its corner (450, 10) placed at (463, 41), so the region kept the
//     wedge between them, its tip (366, 12) 84 cm into way:1's round end (hw 399; DRY_MOVE_CM ≈ 75.5 cm);
//   N2 face 0: way:2's end cap was laid apart from its strip (the strip's run was itself laid along a join's held
//     edges, so its own end edge was never recorded for `sharedPath`) and routed back along the frame, its held cycle
//     bounding nothing; the cap's sliver was kept, its vertex (3943, 4000) 492 cm into way:2's end (hw 520).
// Restaged, each read succeeds with the region below, every vertex of it within §3.7's attracted-case bound
// (√2 · attractCm + SAGITTA_CM ≈ 38.8 cm, `clearOf`'s default) of every spine's band — edge and vertex-only — and
// corridorUnion commits exactly it (S8 ≡ S9 by normal forms), the L2 tiling exact, the arena healthy; bandUnion commits.
// The guard stands: on B-FUZZ's fixed seeds the census refuses 11 reads with CENSUS_DEEP (20261011: 7, 1012: 4; every
// one a collapse or a displacement at the frame, J433 insertChain's), each restaged and refused again by the restaged
// read's own post-condition — the third case pins one (the census's refusal and place returned).
import { describe, expect, it, vi } from 'vitest';

const counts = { opSave: 0 };

vi.mock('../../../src/faces/common.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/faces/common.js')>();
  return { ...real, opSave: (...a: Parameters<typeof real.opSave>) => { counts.opSave += 1; return real.opSave(...a); } };
});

import type { FaceId } from '../../../src/arena/index.js';
import { CENSUS_DEEP, clearOf, kerbCensus, readKerb, type LastRead } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandClosings, bandUnion, type BandResult } from '../../../src/arr/bandUnion.js';
import { AT_S9, closingsBeyond, commit, firstBand, healthy, network, normals, readIn, ringsOf, tilesExactly, widthsOf, type Chord } from './support.js';

/** One face's read in the network's L1 batch: its kerb in normal form (or the refusal), its savepoints, its census. */
interface Read {
  readonly kerb: string[] | string;
  readonly saves: number;
  readonly census: LastRead | null;
  /** Does every vertex of the region and of the kerb stand within §3.7's bound of every spine's band (`clearOf`)? */
  readonly clear: boolean;
}

/** Every face's kerb read in one L1 batch, then corridorUnion's L2 commit and bandUnion's L3 commit along the first chain. */
function run(chords: readonly Chord[]): { faces: FaceId[]; reads: Map<FaceId, Read>; cu: BandResult; blocksIn: Map<FaceId, string[]>; band: BandResult | null } {
  const { p, faces, table } = network(chords);
  const ws = widthsOf(table);
  const reads = new Map<FaceId, Read>();
  readIn(p, 1, (o) => {
    for (const f of faces) {
      counts.opSave = 0;
      const k = readKerb(o, f, ws);
      const saves = counts.opSave;
      const census = kerbCensus(p);
      if (!k.ok) {
        reads.set(f, { kerb: `${k.code} ${k.detail}`, saves, census, clear: false });
        continue;
      }
      const clear = [...k.value.spines.values()].every((s) => clearOf(k.value.region, s) && clearOf(k.value.kerb, s));
      reads.set(f, { kerb: normals(k.value.kerb), saves, census, clear });
    }
    return null;
  });
  const cu = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9).value as BandResult;
  healthy(p);
  expect(tilesExactly(p, 2, faces)).toEqual([]);
  const kerbOf = (f: number) => {
    const k = readIn(p, 1, (o) => readKerb(o, f, ws));
    return k.ok ? k.value.kerb : null;
  };
  expect(closingsBeyond(bandClosings(p), kerbOf)).toEqual([]);
  const blocksIn = new Map<FaceId, string[]>();
  for (const b of cu.blocks) {
    const f = p.faces[2].parent[b];
    blocksIn.set(f, [...(blocksIn.get(f) ?? []), ...normals(ringsOf(p, 2, b))].sort());
  }
  const chain = firstBand(table);
  let band: BandResult | null = null;
  if (chain.length > 0) {
    band = commit(p, 3, (o) => bandUnion(o, chain, faces, 'band', 'band:1'), AT_S9).value as BandResult;
    healthy(p);
    expect(tilesExactly(p, 3, faces)).toEqual([]);
  }
  return { faces, reads, cu, blocksIn, band };
}

/** S8 ≡ S9: every face's kerb read is the blocks corridorUnion committed in it (an empty read: no block, the face whole to the band). */
function s8s9(r: ReturnType<typeof run>): void {
  for (const [f, k] of r.reads) expect(r.blocksIn.get(f) ?? [], `face ${String(f)}`).toEqual(Array.isArray(k.kerb) ? [...k.kerb].sort() : k.kerb);
}

describe('the restaged read: a lawful read the census refused succeeds within the bound (C-0420; J264, N-58)', () => {
  it('N1 (round S11 NEAR, random seed): face 2’s tip stands on way:1’s band edge, not 84 cm inside its round end', () => {
    const r = run([
      { a: 15_997, b: 2390, hw: 170, knots: [7, 92], ends: 'square' },
      { a: 13_944, b: 51, hw: 399, knots: null, ends: 'round' },
      { a: 67, b: 7156, hw: 429, knots: [168, 495], ends: 'square' },
    ]);
    expect(r.faces).toEqual([0, 1, 2]);
    const f2 = r.reads.get(2) as Read;
    // the census refused (one savepoint) and the restaged read was accepted (a second); the census's place cleared
    expect(f2.kerb).toEqual(['449,0 712,0 2390,92 2425,85 2455,65 2475,35 2482,0 4000,0 4000,2553 447,72']);
    // round S16 (C-0425): its region holds a vertex deeper than attractCm, so the face is read once more, faithfully (a
    // third savepoint); that read is not shallower, so the restaged read stands
    expect(f2.saves).toBe(3);
    expect(f2.census).toEqual({ face: 2, reaching: ['way:way:1'], refusedAt: null, faithful: 'tried' });
    expect(f2.clear).toBe(true);
    // the pre-round tip, 84 cm into way:1's end, is no vertex of the read
    expect((f2.kerb as string[]).join(' ')).not.toContain('366,12');
    // the other faces read as before, by the census alone (one savepoint at most)
    expect(r.reads.get(0)?.kerb).toEqual(['436,578 3691,3543 3763,3590 3842,3625 3926,3645 4000,3650 4000,4000 0,4000 0,2454 68,2449 144,2428 213,2393 275,2345 326,2286 365,2218 389,2144 399,2066']);
    expect(r.reads.get(1)?.kerb).toEqual([]);
    for (const f of [0, 1]) expect(r.reads.get(f)?.saves).toBeLessThanOrEqual(1);
    for (const k of r.reads.values()) expect(k.clear).toBe(true);
    s8s9(r);
    expect(r.cu.wholeBand).toEqual([1]);
    expect(r.cu.blocks.length).toBe(2);
    expect(r.band).not.toBeNull();
  });

  it('N2 (round S11 NEAR, random seed): face 0’s kerb leaves way:2’s end cap whole, not its sliver kept 492 cm into it', () => {
    const r = run([
      { a: 15_521, b: 12_686, hw: 11, knots: [35, 591], ends: 'square' },
      { a: 4099, b: 8029, hw: 28, knots: null, ends: 'square' },
      { a: 7473, b: 8030, hw: 20, knots: [157, 520], ends: 'round' },
    ]);
    expect(r.faces).toEqual([0, 1, 2]);
    const f0 = r.reads.get(0) as Read;
    // round S15 (the held cycle along each segment's own edges, `rowPath`): the census read is accepted alone (one
    // savepoint) — the corner where way:1's strip edge (x = 3948 at y = 3321) meets way:2's start cap stands on that edge,
    // where the restaged read of round S11 left it on way:1's CENTRELINE (3976, 3321), 28 cm deep in its band
    expect(f0.kerb).toEqual(['0,0 4000,0 4000,71 3972,71 3972,99 3948,3321 3915,3341 3878,3374 3854,3416 3843,3464 3452,3971 3453,4000 0,4000']);
    expect(f0.saves).toBe(1);
    expect(f0.census).toEqual({ face: 0, reaching: ['way:way:2'], refusedAt: null, faithful: 'none' });
    expect(f0.clear).toBe(true);
    expect((f0.kerb as string[]).join(' ')).not.toContain('3943,4000');
    for (const f of [1, 2]) {
      expect(r.reads.get(f)?.kerb).toEqual([]);
      expect(r.reads.get(f)?.saves).toBeLessThanOrEqual(1);
    }
    s8s9(r);
    expect([...r.cu.wholeBand].sort()).toEqual([1, 2]);
    expect(r.cu.blocks.length).toBe(1);
    expect(r.band).not.toBeNull();
  });

  it('accepted only within the bound: where the restaged region is deep too, the census’s refusal and its place stand (B-FUZZ seed 20261011 draw 1425)', () => {
    // way:0's parts collapse onto the frame at (0, 441) in both orders (J433: 'merged', insertChain's class); the
    // restaged region's vertex there lies deeper in way:0's band than DRY_MOVE_CM, so the restaged read is refused and
    // the census's refusal is returned with the census's place, which the refusal replay reads (replay.ts, J433)
    const { p, faces, table } = network([
      { a: 15_650, b: 4140, hw: 428, knots: [408, 311], ends: 'round' },
      { a: 15_666, b: 11_919, hw: 2, knots: null, ends: 'round' },
      { a: 14_083, b: 8016, hw: 149, knots: null, ends: 'square' },
    ]);
    const ws = widthsOf(table);
    expect(faces).toContain(2);
    const got = readIn(p, 1, (o) => {
      counts.opSave = 0;
      const k = readKerb(o, 2, ws);
      return { k: k.ok ? 'ok' : `${k.code} ${k.detail}`, saves: counts.opSave, census: kerbCensus(p) };
    });
    expect(got.k).toBe(`E_INVARIANT ${CENSUS_DEEP}`);
    expect(got.saves).toBe(2);
    // (round S16: a refused read is never read faithfully — the faithful read follows a read that is ok, C-0425)
    expect(got.census).toEqual({ face: 2, reaching: ['way:way:0'], refusedAt: { part: 3, x: 0, y: 441 }, faithful: 'none' });
  });
});
