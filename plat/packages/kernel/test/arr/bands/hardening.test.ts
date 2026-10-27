// M0-a-09's hardening round S14 (lane build/M0-a-09-fix-s14; J237 (2), the hardening inventory's rows for the item and
// the census's MAKE-IT-SUCCEED classes; the choices row of the round): each pin here is red on the round's starting
// engine (round S13's kerb.ts and bandUnion.ts) or under the mutant the round's notes name, and green on this tree.
// The B-FUZZ networks are drawn by bfuzz.test.ts's own chord arbitrary (`fc.sample` at the seed, draw numbers 1-based),
// written out as chords.
import { describe, expect, it } from 'vitest';
import { outgoing, type FaceId, type Plat } from '../../../src/arena/index.js';
import type { OpenTx } from '../../../src/tx/state.js';
import { kerb, readFace, readKerb, splitsOn, UNLAID_DEEP, type KerbRead } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandUnion, closeEnds, outlinePieces, pinContact, runVertex, type BandResult, type Closing } from '../../../src/arr/bandUnion.js';
import { setOwner, tx } from '../../../src/tx/index.js';
import { classify, causeOf, replayKerb } from './replay.js';
import { AT_S9, childrenOf, closingsBeyond, commit, spursOf, edgesWithRole, faceAt, firstBand, framed, hausdorffCm, healthy, network, normals, own, pt, readIn, ringsOf, spec, state, tilesExactly, way, widthsOf, type Chord } from './support.js';
import { insertChain } from '../../../src/insert/index.js';

/** corridorUnion over every face of the network at L2 (and bandUnion along its first chain at L3 where `band`): healthy, tiling. */
function committed(chords: readonly Chord[], band = false): { p: Plat; faces: FaceId[]; v: BandResult; reads: Map<FaceId, KerbRead> } {
  const n = network(chords);
  const ws = widthsOf(n.table);
  const reads = new Map<FaceId, KerbRead>();
  readIn(n.p, 1, (o) => {
    for (const f of n.faces) {
      const k = readKerb(o, f, ws);
      if (k.ok) reads.set(f, k.value);
    }
    return null;
  });
  const r = commit(n.p, 2, (o) => corridorUnion(o, n.faces, ws), AT_S9);
  healthy(n.p);
  expect(tilesExactly(n.p, 2, n.faces)).toEqual([]);
  if (band) {
    const chain = firstBand(n.table);
    commit(n.p, 3, (o) => bandUnion(o, chain, n.faces, 'band', 'band:1'), AT_S9);
    healthy(n.p);
    expect(tilesExactly(n.p, 3, n.faces)).toEqual([]);
  }
  return { p: n.p, faces: n.faces, v: r.value as BandResult, reads };
}

describe('KI-1 (notes row 1; C-0212 (8), C-0218 (5)): no spur left in a committed corridor or band face', () => {
  it('seed 20261011 draw 1043: a wedge split’s foot on a spine 15 cm from the L0 frame — its leg to the foot taken out, the leg J → K kept', () => {
    // face 0's read splits at J = (10, 2244): J → K (412, 1824) → the foot (15, 1820) on way:0's edge (34, 0)–(10, 2244),
    // which runs within minEdge of the frame x = 0: §3.6's placement puts the foot 25 cm into F, (40, 1820), and the leg
    // K → (40, 1820) dangled (round S13: the band face's ring ran it twice)
    const { p, faces, reads } = committed([
      { a: 12_903, b: 34, hw: 321, knots: [260, 593], ends: 'round' },
      { a: 10_246, b: 13_779, hw: 585, knots: null, ends: 'round' },
      { a: 8505, b: 7978, hw: 411, knots: [467, 529], ends: 'square' },
    ]);
    expect(reads.get(0)?.splits.map((s) => s.map((q) => `${String(q.x)},${String(q.y)}`).join(' '))).toEqual(['10,2244 412,1824 15,1820']);
    expect(spursOf(p, 2, faces)).toEqual([]);
    const splits = edgesWithRole(p, 'corridor_split');
    expect(splits).toContain('412,1824-10,2244');
    expect(splits.some((e) => e.includes('40,1820'))).toBe(false);
  });

  it('seed 20261011 draw 2345: a kerb spike thinner than attractCm whose insertion retraced a stretch — the tip edge taken out, the block as before', () => {
    // face 1's kerb ring 3439,899 3445,994 3521,4000 2561,4000: its tip (3439, 899) between two edges converging to
    // 17 cm apart; the insertion laid the piece 2561,4000 → 3439,899 → 3445,994 along one stretch and back (A–P–T–P–B,
    // N-61 (1)), leaving the spur (3438, 992)–(3462, 909) in the band face
    const { p, faces, v } = committed([
      { a: 4994, b: 8012, hw: 146, knots: [555, 479], ends: 'square' },
      { a: 3702, b: 9468, hw: 28, knots: null, ends: 'round' },
      { a: 10_354, b: 15_545, hw: 379, knots: [477, 207], ends: 'square' },
    ]);
    expect(spursOf(p, 2, faces)).toEqual([]);
    expect(edgesWithRole(p, 'kerb').some((e) => e.includes('3462,909'))).toBe(false);
    // round S16's declared shift (the faithful read, C-0425): face 1's first read kept way:1's band from its start on the
    // frame (3702, 0) to (3490, 724) — 28 cm deep — and its blocks were the spike's ['3438,992 3521,4000 2561,4000',
    // '3702,0 4000,0 4000,441 3954,441 3864,456 3777,486 3696,529 3624,586 3562,653 3490,724']; read faithfully, every
    // vertex lies within 2.3 cm of its bands' edges, and the blocks are that read (the spike's tip edge still gone)
    expect(v.blocks.filter((b) => p.faces[2].parent[b] === 1).flatMap((b) => normals(ringsOf(p, 2, b))).sort()).toEqual(['3446,1046 3448,1098 3520,3948 3521,4000 2561,4000 2576,3950 2590,3900 2605,3850 2619,3800 2634,3751 2649,3701 2663,3651 2678,3601 2692,3551 2722,3451 2736,3401 2751,3351 2765,3301 2780,3252 2795,3202 2809,3152 2824,3102 2838,3052 2868,2952 2882,2902 2897,2852 2911,2802 2926,2753 2941,2703 2955,2653 2970,2603 2984,2553 3014,2453 3028,2403 3043,2353 3057,2303 3072,2254 3087,2204 3101,2154 3116,2104 3130,2054 3160,1954 3174,1904 3189,1854 3203,1804 3218,1755 3233,1705 3247,1655 3262,1605 3276,1555 3306,1455 3320,1405 3335,1355 3349,1305 3364,1256 3379,1206 3393,1156 3408,1106', '3729,0 4000,0 4000,441 3954,441 3864,456 3777,486 3696,529 3624,586 3593,620 3562,653 3554,607 3568,557 3598,457 3612,407 3627,357 3641,307 3656,258 3671,208 3685,158 3700,108 3714,58']);
  });

  it('seed 20261011 draw 3066: a spur of two edges loses both (its tip edge first); at L3 bandUnion leaves none either', () => {
    const { p, faces } = committed(
      [
        { a: 7554, b: 4, hw: 110, knots: null, ends: 'round' },
        { a: 8118, b: 496, hw: 210, knots: null, ends: 'square' },
        { a: 7168, b: 9210, hw: 27, knots: [18, 232], ends: 'round' },
      ],
      true,
    );
    expect(spursOf(p, 2, faces)).toEqual([]);
    expect(spursOf(p, 3, faces)).toEqual([]);
    expect(edgesWithRole(p, 'kerb').some((e) => e.includes('3713,3457') || e.includes('3682,3418'))).toBe(false);
  });

  it('seed 20261011 draws 5811 and 6773: no spur at L2, and none in bandUnion’s band at L3 (a split foot by the frame; a kerb sliver’s retrace)', () => {
    for (const chords of [
      [
        { a: 11_940, b: 22, hw: 22, knots: [495, 207], ends: 'square' },
        { a: 14_730, b: 40, hw: 14, knots: [180, 303], ends: 'square' },
      ],
      [
        { a: 4951, b: 59, hw: 23, knots: [579, 543], ends: 'square' },
        { a: 6126, b: 4860, hw: 26, knots: null, ends: 'square' },
        { a: 6290, b: 2899, hw: 126, knots: [119, 308], ends: 'round' },
      ],
    ] as Chord[][]) {
      const { p, faces } = committed(chords, true);
      expect(spursOf(p, 2, faces), JSON.stringify(chords)).toEqual([]);
      expect(spursOf(p, 3, faces), JSON.stringify(chords)).toEqual([]);
    }
  });

  it('an along chord laid back onto its own piece (B-FUZZ at seed -1784686652, found by this round’s self-check): the tip a spur taken out, the closing read without it — committed, no throw', () => {
    // bandUnion at L3 along way:0 (a profile 338 → 539 cm): face 1's piece ends on a tip 25 cm from its contact
    // (1618, 1286), and the along chord from the tip to the run's vertex (3404, 2705) passes within attractCm of the
    // piece's vertices (2550, 2071) and (3092, 2474), so the insertion laid it back along the piece: the tip kept one
    // edge, `dropSpurs` took it out, and the read-back read the closing's dead tip (arena: vertex 20 is not live)
    const { p, faces } = committed(
      [
        { a: 15_589, b: 7960, hw: 1, knots: [338, 539], ends: 'round' },
        { a: 7179, b: 0, hw: 24, knots: null, ends: 'round' },
      ],
      true,
    );
    expect(spursOf(p, 3, faces)).toEqual([]);
    expect(childrenOf(p, 3, 1).flatMap((c) => normals(ringsOf(p, 3, c)))).toContain('3092,2474 3404,2705 4000,3179 4000,3263');
  });
});

describe('note 28 (notes rows 28, 34; C-0327 (3)): a block beyond 2·√2·attractCm of kerb(F) with no closing — the wrong unions made right', () => {
  it('seed 1012 draw 4066: kerb(F)’s corner triangles (472 × 552 cm and 866 × 1 084 cm) are committed as blocks, not band', () => {
    // the read's vertex (472, 2857) the commit placed at (496, 2849) (W_PLACED): the triangle's widest cross-section lay
    // in that 8 cm sliver, where its interior point read outside kerb(F) as read — the block was classed band (the face
    // F all band but a lost block 147 cm deep); its deepest point (labelPoint) reads inside
    const { p, v, reads } = committed([
      { a: 6888, b: 13_157, hw: 19, knots: null, ends: 'square' },
      { a: 3887, b: 11_990, hw: 32, knots: [596, 407], ends: 'round' },
      { a: 15_992, b: 7972, hw: 13, knots: [594, 6], ends: 'square' },
    ]);
    for (const f of [1, 6]) {
      const mine = v.blocks.filter((b) => childrenOf(p, 2, f).includes(b));
      expect(mine.length).toBe(1);
      expect(hausdorffCm(ringsOf(p, 2, mine[0]), reads.get(f)?.kerb ?? [])).toBeLessThanOrEqual(26);
    }
  });

  it('seed 1012 draw 8706: a junction wedge 204 cm deep in way:1’s band is band, not a block', () => {
    const { p, v, reads } = committed([
      { a: 2375, b: 15_080, hw: 14, knots: null, ends: 'square' },
      { a: 1000, b: 4053, hw: 492, knots: null, ends: 'square' },
    ]);
    const mine = v.blocks.filter((b) => childrenOf(p, 2, 1).includes(b));
    expect(mine.length).toBe(1);
    expect(hausdorffCm(ringsOf(p, 2, mine[0]), reads.get(1)?.kerb ?? [])).toBeLessThanOrEqual(26);
    // the wedge (J = (2375, 0)) is band
    const wedge = childrenOf(p, 2, 1).find((c) => ringsOf(p, 2, c)[0].some((q) => q.x === 2375 && q.y === 0));
    expect(wedge !== undefined && v.band.includes(wedge)).toBe(true);
  });

  it('seed 20261011 draw 8999: the strip of way:1 along the frame (42 cm deep in way:0’s band) is band; seed 1012 draw 6781: the corner block is a block', () => {
    const a = committed([
      { a: 4228, b: 26, hw: 263, knots: [541, 536], ends: 'square' },
      { a: 11_299, b: 0, hw: 7, knots: null, ends: 'square' },
    ]);
    const blocks2 = a.v.blocks.filter((b) => childrenOf(a.p, 2, 2).includes(b));
    expect(blocks2.length).toBe(1);
    expect(hausdorffCm(ringsOf(a.p, 2, blocks2[0]), a.reads.get(2)?.kerb ?? [])).toBeLessThanOrEqual(26);
    const b = committed([
      { a: 13_843, b: 5767, hw: 76, knots: [70, 417], ends: 'round' },
      { a: 3507, b: 7961, hw: 18, knots: null, ends: 'square' },
      { a: 7001, b: 53, hw: 15, knots: [245, 92], ends: 'square' },
    ]);
    const blocks4 = b.v.blocks.filter((c) => childrenOf(b.p, 2, 4).includes(c));
    expect(blocks4.length).toBe(1);
    expect(hausdorffCm(ringsOf(b.p, 2, blocks4[0]), b.reads.get(4)?.kerb ?? [])).toBeLessThanOrEqual(26);
  });
});

describe('row 23 (notes rows 22, 23; C-0281 (1)): a junction whose every target the guard dropped splits to J’s nearest kerb point', () => {
  it('seed 20261011 draw 3620, face 2: J = (17, 1389) — the wedge and the straight-through split both cross the block; J → its nearest kerb point (0, 1370)', () => {
    const { reads } = committed([
      { a: 8200, b: 39, hw: 30, knots: null, ends: 'round' },
      { a: 13_585, b: 41, hw: 18, knots: null, ends: 'square' },
      { a: 14_630, b: 8005, hw: 168, knots: null, ends: 'square' },
    ]);
    expect(reads.get(2)?.splits.map((s) => s.map((q) => `${String(q.x)},${String(q.y)}`).join(' '))).toEqual(['17,1389 0,1370']);
  });
});

describe('row 24 (notes row 24, XR1): the retry after the first corner target', () => {
  it('seed 20261011 draw 390, face 1: target (i)’s wedge crosses the block, the wedge through the kerb point nearest the meeting point is drawn', () => {
    const n = network([
      { a: 5208, b: 8033, hw: 10, knots: null, ends: 'square' },
      { a: 14_675, b: 7961, hw: 481, knots: [217, 486], ends: 'square' },
    ]);
    const ws = widthsOf(n.table);
    const k = readIn(n.p, 1, (o) => readKerb(o, 1, ws));
    expect(k.ok).toBe(true);
    if (!k.ok) return;
    expect(k.value.splits.map((s) => s.map((q) => `${String(q.x)},${String(q.y)}`).join(' '))).toEqual(['3968,3940 3977,3410 3974,3410']);
  });
});

describe('row 21 X11 (notes row 21; DONE per plan, its fixture re-targeted under S9’s read): the splice of a target the guard dropped is taken out of the kerb', () => {
  it('seed 20261011 draw 268, face 2: target (ii)’s wedge through the kerb point spliced nearest the meeting point crosses the block — dropped, its splice taken out; kerb(F) without it, the straight-through split from J = (3975, 2802) drawn', () => {
    // widthstep.test.ts's case 43 (the fixture the plan named) no longer reaches a spliced target under S9's read (its
    // region holds a vertex at the corner), and where the straight-through split lands on the dropped splice's own point
    // the splice comes back (draw 101): keeping it changes kerb(F) on 107 of 10⁴ B-FUZZ networks at this seed (round
    // S14's census under the mutant), here by a vertex left beside the kerb's corner
    const n = network([
      { a: 4207, b: 8036, hw: 4, knots: null, ends: 'square' },
      { a: 6820, b: 36, hw: 454, knots: [288, 28], ends: 'round' },
    ]);
    const ws = widthsOf(n.table);
    const k = readIn(n.p, 1, (o) => readKerb(o, 2, ws));
    expect(k.ok).toBe(true);
    if (!k.ok) return;
    // round S16's declared shift (the faithful read, C-0425): the first read's ['0,0 36,0 89,38 3705,2951 3809,3035 3832,3054
    // 3888,3085 3972,3105 3964,4000 0,4000'] held (89, 38) 31.2 cm inside way:1's band; read faithfully, way:1's edge is
    // laid through stepped points (the deepest vertex its start on the frame, (36, 0), 28 cm) and the split from J stands
    expect(normals(k.value.kerb)).toEqual(['0,0 36,0 61,55 101,88 142,120 182,152 223,184 263,217 345,281 385,313 426,346 466,378 507,410 547,442 588,475 628,507 710,571 3704,2952 3833,3055 3889,3086 3920,3095 3972,3105 3964,4000 0,4000']);
    expect(k.value.splits.map((q) => `${String(q[0].x)},${String(q[0].y)}`)).toEqual(['3975,2802']);
  });
});

describe('Q58 / Q59 (the census’s MAKE-IT-SUCCEED classes; C-0349 (4), J348 (4)): replayed under round S13’s engine', () => {
  it('Q58: seed 20261011 draw 8897 (0-based; 8898 1-based) commits — corridorUnion (with an along closing) and bandUnion', () => {
    const { p, faces } = committed(
      [
        { a: 521, b: 7967, hw: 26, knots: [274, 293], ends: 'square' },
        { a: 6, b: 4180, hw: 10, knots: [12, 26], ends: 'round' },
      ],
      true,
    );
    expect(spursOf(p, 2, faces)).toEqual([]);
  });

  it('Q59: seed 20261011 draw 7644 (0-based; 7645 1-based) commits — no N-57 (2) refusal', () => {
    committed(
      [
        { a: 10_140, b: 27, hw: 35, knots: null, ends: 'square' },
        { a: 9, b: 7990, hw: 8, knots: null, ends: 'round' },
        { a: 6, b: 8035, hw: 593, knots: [8, 207], ends: 'round' },
      ],
      true,
    );
  });

  it('Q58’s partner: seed 20261011 draw 1524 (0-based; 1525 1-based) refuses UNLAID_DEEP, insertChain’s by cause (a run with no route), nothing written', () => {
    const { p, faces, table } = network([
      { a: 10_550, b: 7964, hw: 3, knots: [75, 14], ends: 'square' },
      { a: 9525, b: 7966, hw: 595, knots: [580, 270], ends: 'square' },
      { a: 14_872, b: 8030, hw: 26, knots: [549, 567], ends: 'square' },
    ]);
    const ws = widthsOf(table);
    const b0 = state(p);
    const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.detail).toBe(UNLAID_DEEP);
    expect(state(p)).toBe(b0);
    let cause = '';
    readIn(p, 1, (o) => {
      for (const f of faces) {
        const k = readKerb(o, f, ws);
        if (k.ok) continue;
        const rp = replayKerb(o, f, ws);
        expect(classify(k, rp)).toBe('insertChain');
        cause = causeOf(rp);
        break;
      }
      return null;
    });
    expect(cause).toMatch(/^no-route /);
  });
});

describe('K34 (notes row 3): the near filter keeps a non-bounding segment of a bounding spine that reaches F', () => {
  it('a way bounding F that leaves F’s boundary and turns back 40 cm beyond F’s box: its round end, inside its half-width of F, bites kerb(F)', () => {
    // F = [0, 2000] × [0, 1000] less way:1's strip: way:1 runs along F's top (y = 1000) to (2000, 1000), on to
    // (2600, 1000), down to (2600, 300) and back to (2040, 300) — 40 cm right of F's box, beyond attractCm of its edge
    // x = 2000 (a district boundary, no half-width) — its round end (radius 200 about (2040, 300)) reaching 160 cm into F.
    // A filter with no reach (the segment's box beyond F's box) leaves the segment out and the bite with it
    const p = framed();
    way(p, 'way:1', [[0, 1000], [2000, 1000], [2600, 1000], [2600, 300], [2040, 300]]);
    commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 1000)], [{ role: 'district_bound', entity: 'district:2' }], 'mandatory'));
    const [f] = own(p, 'district:1', [[1000, 500]]);
    const k = readIn(p, 1, (o) => readKerb(o, f, widthsOf({ 'way:1': 200 })));
    expect(k.ok).toBe(true);
    if (!k.ok) return;
    const pts = k.value.kerb.flat();
    // the bite: kerb vertices on the end's circle inside F (x < 1900), none deeper inside the disk than the arc's
    // sagitta (SAGITTA_CM, 2 cm: a chord's crossing with F's edge) and the lattice
    expect(pts.some((q) => q.x < 1900 && q.y > 150 && q.y < 450)).toBe(true);
    for (const q of pts) expect(Math.hypot(q.x - 2040, q.y - 300)).toBeGreaterThanOrEqual(196);
    // and it is committed so: S9's blocks are the read (Hausdorff 0)
    const r = commit(p, 2, (o) => corridorUnion(o, [f], widthsOf({ 'way:1': 200 })), AT_S9);
    healthy(p);
    const v = r.value as BandResult;
    expect(v.blocks.flatMap((b) => normals(ringsOf(p, 2, b))).sort()).toEqual(normals(k.value.kerb).sort());
  });
});

describe('K35 (notes row 4): a kerb edge is on F’s boundary only within the 1 cm boundary reading (ON_BOUNDARY_SQ)', () => {
  it('a kerb edge 5 cm off and parallel to a spine-less boundary is an outline piece of its own (inserted); one within 1 cm is F’s edge', () => {
    // the outline's reading (bandUnion.ts `outlinePieces`, the tolerance ON_BOUNDARY_SQ = 1 cm²): F the frame square, its
    // kerb the square less a 5 cm strip along the shore y = 0 — the edge (4000, 5)–(0, 5) runs 5 cm off F's edge, so the
    // commit inserts it (a 10 cm tolerance read it as F's own edge and left the strip in the block). On the families the
    // dry-run lays a part edge within attractCm of F's edge along it (W_STRETCH_SHARED: the round S14 probe of a lane's
    // cap 3 – 12 cm off a shore), so this reading is pinned here on the function itself
    const F = [[pt(0, 0), pt(4000, 0), pt(4000, 4000), pt(0, 4000)]];
    const at = (d: number): string[] =>
      outlinePieces({ rings: F, kerb: [[pt(0, d), pt(4000, d), pt(4000, 4000), pt(0, 4000)]] } as unknown as KerbRead).map((q) => `${q.closed ? 'closed' : 'open'} ${q.points.map((z) => `${String(z.x)},${String(z.y)}`).join(' ')}`);
    expect(at(5)).toEqual(['open 0,5 4000,5']);
    expect(at(2)).toEqual(['open 0,2 4000,2']);
    // within the 1 cm reading the edge is F's own: no piece
    expect(at(1)).toEqual([]);
  });
});

describe('K05 / R04 (notes rows 5, 18): the kerb’s final rings — spikes dropped, each canonical, in compareRings order', () => {
  it('splitsOn on a recorded region with a zero-width spike and its rings out of order: the spike dropped, the rings sorted (raw)', () => {
    // round S9's dry-run makes no spike on the families (a probe of 2 × 10⁴ B-FUZZ networks at seeds 20261011 and 1012,
    // every face read: unspiked dropped no vertex), so the final pass is pinned on a recorded region (`splitsOn`: the
    // junction rules on any region of the face) — a region as the scratch overlay's trace once left it (C-0212 (8)): the
    // block left of x = 800 with a spike out along its upper edge to (300, 1700) and back, given after the block right of it
    const p = framed();
    way(p, 'way:1', [[0, 2000], [4000, 2000]]);
    way(p, 'way:2', [[2000, 0], [2000, 4000]]);
    const [ll] = own(p, 'district:1', [[1000, 1000]]);
    const ws = widthsOf({ 'way:1': 300, 'way:2': 250 });
    const f = readFace(p, ll, ws);
    const right = [pt(1000, 0), pt(1750, 0), pt(1750, 1700), pt(1000, 1700)];
    const spiked = [pt(0, 0), pt(800, 0), pt(800, 1700), pt(300, 1700), pt(600, 1700), pt(0, 1700)];
    const sp = splitsOn(p, f.edges, f.spines, [right, spiked]);
    expect(sp.ok).toBe(true);
    if (!sp.ok) return;
    expect(sp.value.rings).toEqual([
      [pt(0, 0), pt(800, 0), pt(800, 1700), pt(600, 1700), pt(0, 1700)],
      [pt(1000, 0), pt(1750, 0), pt(1750, 1700), pt(1000, 1700)],
    ]);
  });

  it('kerb() of the turn-away face (corridor.test.ts’s fixture: the split end spliced in) — its raw rings', () => {
    const p = framed();
    way(p, 'way:1', [[0, 1700], [2100, 2050]]);
    const ws = widthsOf({ 'way:1': 310, 'way:2': 270 });
    const raw = readIn(p, 1, (o) => {
      const a = insertChain(o, [pt(2100, 2050), pt(2600, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
      expect(a.ok).toBe(true);
      const k = kerb(o, faceAt(p, 1, 3000, 1000), ws);
      return k.ok ? k.value.map((r) => r.map((q) => `${String(q.x)},${String(q.y)}`).join(' ')) : [k.detail];
    });
    expect(raw).toEqual(TURN_AWAY_RAW);
  });
});

/**
 * The turn-away face's kerb() as this tree reads it, raw (ring order, each ring's start and every vertex): the split end
 * (2308, 1823) spliced into the round join's chord, the ring from its lowest-leftmost vertex.
 */
const TURN_AWAY_RAW: string[] = ['0,0 4000,0 4000,4000 2870,4000 2862,3933 2406,2101 2409,2032 2398,1963 2371,1899 2330,1843 2308,1823 2279,1797 2218,1763 2151,1744 51,1394 0,1392'];

// ---- the closing's guards (notes rows 27, 30, 31): pinContact, runVertex and closeEnds on a hand-built face ------------

/** The vertex at a lattice point (−1: none). */
function vertexAt(p: Plat, x: number, y: number): number {
  for (let v = 0; v < p.slots.vertex.top; v += 1) if (p.vertices.x[v] === x && p.vertices.y[v] === y && p.vertices.level[v] !== 0xff) return v;
  return -1;
}

/**
 * The closing's stage: the frame [0, 4000]², a spine-less shore (a district boundary) along y = 1000 with a vertex at
 * (960, 1000), F the face above it (owned); `run` gets the L2 batch's open transaction and F's reading with kerb(F) = F
 * (no spine: its kerb follows F's boundary everywhere), and a refusal of the batch is the test's.
 */
function onShore<T>(run: (t: OpenTx, read: KerbRead, p: Plat, below: number) => T): T {
  const p = framed();
  commit(p, 1, (o) => insertChain(o, [pt(0, 1000), pt(960, 1000), pt(4000, 1000)], [{ role: 'district_bound', entity: 'district:2' }], 'mandatory'));
  const [F, G] = own(p, 'district:1', [[2000, 2000], [2000, 500]]);
  const rings = ringsOf(p, 1, F);
  const read = { face: F, rings, kerb: rings.map((r) => r.slice()) } as unknown as KerbRead;
  let out: { v: T } | null = null;
  commit(p, 2, (o) => {
    out = { v: run(o as unknown as OpenTx, read, p, G) };
    return { ok: true, value: null, warnings: [] };
  }, AT_S9);
  return (out as unknown as { v: T }).v;
}

const KERB_ROWS = [{ role: 'kerb', entity: 'district:1' }] as const;
const PIN_SQ_CM2 = (1 + 0.71) * (1 + 0.71);

describe('the closing’s guards (notes rows 27, 30, 31; N-57 (2)): each pinned on a hand-built face', () => {
  it('pinContact: a vertex already at the contact is the pin, nothing written (C9)', () => {
    onShore((t, read, p) => {
      const before = p.slots.vertex.top;
      const v = pinContact(t, read.rings, pt(960, 1000), PIN_SQ_CM2);
      expect(v.ok && v.value).toBe(vertexAt(p, 960, 1000));
      expect(p.slots.vertex.top).toBe(before);
      return null;
    });
  });

  it('pinContact: a contact on another face’s boundary is not pinned from this face — the route piece’s ends must lie on its rings (C7)', () => {
    onShore((t, read, p, below) => {
      // the frame's left edge (0, 0)–(0, 1000) bounds the face below the shore, not F
      const g = ringsOf(p, 1, below);
      expect(g.flat().some((q) => q.x === 0 && q.y === 0)).toBe(true);
      const before = p.slots.vertex.top;
      const v = pinContact(t, read.rings, pt(0, 500), PIN_SQ_CM2);
      expect(v.ok && v.value).toBe(null);
      expect(p.slots.vertex.top).toBe(before);
      return null;
    });
  });

  it('closeEnds: a tip whose contact stands 25 cm from a shore vertex is closed ALONG the run to that vertex, never by a chord pinned 25 cm off its contact (N3: the pin within the contact’s 1 cm and the hot pixel, not attractCm)', () => {
    const log = onShore((t, read, p) => {
      // a piece of the kerb down to its contact (985, 1000) on the shore, laid only to (985, 1027): a tip 27 cm above
      // the contact (within attractCm + 1 cm; beyond attractCm of the shore, so no insertion moved it); the contact's
      // placement on the shore is the shore's vertex (960, 1000), 25 cm off it (§3.6's end rule)
      const ins = insertChain(t, [pt(985, 1600), pt(985, 1027)], [...KERB_ROWS], 'mandatory');
      expect(ins.ok).toBe(true);
      if (!ins.ok) return [];
      const tip = ins.value.placed[1];
      expect([p.vertices.x[tip], p.vertices.y[tip], outgoing(p, tip).length]).toEqual([985, 1027, 1]);
      const piece = { points: [pt(985, 1600), pt(985, 1000)], closed: false };
      const log: Closing[] = [];
      const r = closeEnds(t, read, [pt(985, 1000)], 0, piece, ins.value.placed, [...KERB_ROWS], new Set(), log, []);
      expect(r.ok).toBe(true);
      return log;
    });
    expect(log.map((c) => c.kind)).toEqual(['along']);
    expect(log[0]?.pin).toEqual(pt(960, 1000));
    // N-57 (2)'s bound (B-FUZZ's judge): no chord's pin off its contact by more than the 1 cm reading and the hot pixel
    expect(closingsBeyond(log, () => [[pt(0, 1000), pt(4000, 1000), pt(4000, 4000), pt(0, 4000)]])).toEqual([]);
  });

  it('closeEnds: an end with two edges is no tip — nothing closed, no re-run asked (C6)', () => {
    onShore((t, read, p) => {
      const a = insertChain(t, [pt(1500, 2000), pt(1500, 1500)], [...KERB_ROWS], 'mandatory');
      const b = insertChain(t, [pt(1500, 1500), pt(1800, 1500)], [...KERB_ROWS], 'mandatory');
      expect(a.ok && b.ok).toBe(true);
      const v = vertexAt(p, 1500, 1500);
      expect(outgoing(p, v).length).toBe(2);
      // the piece's end placed at (1500, 1500), its contact given on the shore 500 cm away
      const piece = { points: [pt(1500, 1000), pt(1800, 1500)], closed: false };
      const log: Closing[] = [];
      const r = closeEnds(t, read, [pt(1500, 1000)], 0, piece, [v, vertexAt(p, 1800, 1500)], [...KERB_ROWS], new Set(), log, []);
      expect(r.ok && r.value.retry).toEqual([]);
      expect(log).toEqual([]);
      return null;
    });
  });

  it('closeEnds asks for the pinned-first re-run where no closing goes in — a tip beyond 2·√2·attractCm, or one the run cannot reach — never a refusal (N12)', () => {
    onShore((t, read) => {
      // a tip 100 cm above its contact: beyond the along bound — the end named for the next run (pinned first)
      const ins = insertChain(t, [pt(2600, 1600), pt(2600, 1100)], [...KERB_ROWS], 'mandatory');
      expect(ins.ok).toBe(true);
      if (!ins.ok) return null;
      const far = closeEnds(t, read, [pt(2600, 1000)], 3, { points: [pt(2600, 1600), pt(2600, 1000)], closed: false }, ins.value.placed, [...KERB_ROWS], new Set(), [], []);
      expect(far.ok && far.value.retry).toEqual([`${String(read.face)} 3 1`]);
      // a tip 40 cm above its contact with no run to close along (kerb(F) read empty there): the same
      const near = insertChain(t, [pt(3300, 1600), pt(3300, 1040)], [...KERB_ROWS], 'mandatory');
      expect(near.ok).toBe(true);
      if (!near.ok) return null;
      const none = closeEnds(t, { ...read, kerb: [] } as unknown as KerbRead, [pt(3300, 1000)], 4, { points: [pt(3300, 1600), pt(3300, 1000)], closed: false }, near.value.placed, [...KERB_ROWS], new Set(), [], []);
      expect(none.ok && none.value.retry).toEqual([`${String(read.face)} 4 1`]);
      return null;
    });
  });

  it('runVertex: the run’s first vertex with no other piece’s contact between — the far end where a contact stands on the near side (N6)', () => {
    onShore((t, read, p) => {
      const c = pt(2000, 1000);
      // no other contact: the nearer end of the shore's route piece, (960, 1000)
      expect(runVertex(t, read.rings, read.kerb, [c], c)).toBe(vertexAt(p, 960, 1000));
      // another piece's contact (1500, 1000) between: the far end (4000, 1000)
      expect(runVertex(t, read.rings, read.kerb, [c, pt(1500, 1000)], c)).toBe(vertexAt(p, 4000, 1000));
      return null;
    });
  });
});

describe('L21 (docs/M0-FIX-QUEUE.md; N-57 (4)): the kerb read before its T-junctions exist and the commit after them — the long edge’s offset per block', () => {
  it('a long spine read alone (S8), lanes then inserted as T-junctions on it, the corridors committed (S9): every block’s long edge at the spine’s half-width, offset 0', () => {
    // way:1 along y = 1000 (half-width 300) under F; S8 reads kerb(F) — its long edge y = 1300 — and then inserts its
    // lanes (half-width 100) from the frame down to way:1 at x = 1000 and x = 2950, T-junctions on the spine; S9 commits
    // the faces the lanes made. Before round S9 the read's overlay and the commit saw different attractors and the long
    // edge pivoted at its two end intersections (up to 2·attractCm, 49 cm on fusion 30's way d2rb); read on the real
    // arena, each block's long edge stands at y = 1300 between the lanes' strips — the offset 0 per block
    const p = framed();
    way(p, 'way:1', [[0, 1000], [4000, 1000]]);
    const [f] = own(p, 'district:1', [[2000, 2500]]);
    const ws = widthsOf({ 'way:1': 300, 'lane:1': 100, 'lane:2': 100 });
    const before = readIn(p, 1, (o) => readKerb(o, f, ws));
    expect(before.ok && normals(before.value.kerb)).toEqual(['0,1300 4000,1300 4000,4000 0,4000']);
    commit(p, 1, (o) => {
      const a = insertChain(o, [pt(1000, 4000), pt(1000, 1000)], [{ role: 'way', entity: 'lane:1' }], 'mandatory');
      if (!a.ok) return a;
      return insertChain(o, [pt(2950, 4000), pt(2950, 1000)], [{ role: 'way', entity: 'lane:2' }], 'mandatory');
    });
    const kids = [[500, 2500], [2000, 2500], [3500, 2500]].map(([x, y]) => faceAt(p, 1, x, y));
    commit(p, 1, (o) => setOwner(o, kids, 'district:1'));
    const r = commit(p, 2, (o) => corridorUnion(o, kids, ws), AT_S9);
    healthy(p);
    const v = r.value as BandResult;
    const offsets: number[] = [];
    for (const k of kids) {
      const blocks = v.blocks.filter((b) => p.faces[2].parent[b] === k);
      expect(blocks.length).toBe(1);
      // the block's vertices below the lanes' ends: on the long edge, each at its design position y = 1300
      for (const q of ringsOf(p, 2, blocks[0]).flat()) if (q.y < 2000) offsets.push(Math.abs(q.y - 1300));
    }
    expect(offsets.length).toBeGreaterThanOrEqual(6);
    expect(Math.max(...offsets)).toBe(0);
  });
});
