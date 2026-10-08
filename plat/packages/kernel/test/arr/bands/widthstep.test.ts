// M0-a-09, session fix round S1 (N-52 (2), J239): `splitChain` at a width step between two nearly collinear spines.
// M0-c-06's harness found a corridor_split from a junction J to a FAR kerb corner: the strips' inner edges (half-widths
// 163 and 300 cm, 0.0004 rad apart) meet ~340 m away, no kerb vertex lies near that point, and the old splice took the
// kerb vertex nearest it, 53 m from J — so the split crossed the block and S9 committed a fragment of it (§4.6's S8 ≡ S9
// broken by a silently wrong block). The rule now: a junction's split stays within its reach, 2·max(hwIn, hwOut) +
// attractCm of J; a left turn whose inner edges meet beyond reach (or are near-parallel) is §3.7's straight-through
// case; a split never enters kerb(F)'s interior. Pinned here on the probe's own face (integrated seed 1, the 900 ha
// test size, translated by (−12 000, +13 500) cm) and on a synthetic width step swept over 0.01°–5°, both turns and
// both width orders, read S8's way (kerb on the open overlay, the step's second way inserted in the batch) and
// committed S9's way (corridorUnion) — the blocks equal kerb(F) by normal forms (Hausdorff 0, §13.2).
// Session fix round S2 (checks/M0-a-09-s1.md lines 1–3; C-0280): the sweep runs on to 20° (both sides of the reach),
// a near-equal width step pins meet's near-parallel tolerance, and B-FUZZ chord networks pin each target of a junction
// (the corner's spliced meeting point, the straight-through fallback, the reach of the corner path, the retry after the
// guard drops a corner wedge).
import { describe, expect, it } from 'vitest';
import { type FaceId, type Plat } from '../../../src/arena/index.js';
import { err, ok } from '../../../src/num/index.js';
import { insertChain } from '../../../src/insert/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { entersRegion, kerb, readKerb, type SpineWidths } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import type { BandResult } from '../../../src/arr/bandUnion.js';
import { AT_S9, commit, faceAt, framed, healthy, network, normals, own, pt, ringsOf, splitsBetweenBlocks, splitsBeyondReach, tilesExactly, TIMEOUT, way, widthsOf, type Chord } from './support.js';

const ATTRACT = 26;

/** The probe's face (M0-c-06's readKerb dump, integrated seed 1, test size), translated by (−12 000, +13 500). */
const PROBE = {
  ways: {
    'way:frjb': [[5195, 1194], [5266, 1367], [7332, 6422], [7414, 6622]],
    'way:c78m': [[7414, 6622], [6390, 6891], [3954, 7532]],
    'way:57fm': [[3954, 7532], [3735, 7369], [2140, 6179], [1900, 6000]],
    'way:6': [[1900, 6000], [985, 5317]],
    'way:7br9': [[985, 5317], [1164, 5077], [3564, 1861], [3891, 1727], [5149, 1213], [5195, 1194]],
  } as Record<string, [number, number][]>,
  hw: { 'way:frjb': 113.41898785426733, 'way:c78m': 214.03600165622836, 'way:57fm': 163.2058813131959, 'way:6': 300, 'way:7br9': 187.40661492355628 } as Record<string, number>,
  J: { x: 1900, y: 6000 },
  /** The far kerb corner the old splice took (the probe's (19 223, −7 049)), 53 m from J. */
  farK: { x: 7223, y: 6451 },
};

/**
 * The probe's second face (the same dump, L1 face 150), translated by (+23 000, −1 000): a long face between two nearly
 * parallel ways 345 cm apart (half-widths 179 and 178 cm), all band but a small kerb piece where it widens 60 m away —
 * the old splice joined four junctions at its narrow end to that piece (splits of 16 – 69 m, inside the band).
 */
const PROBE2 = {
  ways: {
    'way:dnsm': [[10295, 1235], [10607, 1387]],
    'way:83hh': [[10607, 1387], [10526, 1552], [8280, 6101], [7424, 7834], [4474, 8456], [1062, 9176]],
    'way:fag1': [[954, 8663], [7356, 7313], [8345, 5267], [10215, 1401], [10295, 1235]],
  } as Record<string, [number, number][]>,
  hw: { 'way:dnsm': 183.5421283797202, 'way:83hh': 179.08591019555453, 'way:fag1': 178.32657723601366 } as Record<string, number>,
  /** The edge (−21 938, 10 176) – (−22 046, 9 663): a boundary that declares no half-width. */
  bound: [[1062, 9176], [954, 8663]] as [number, number][],
  inside: [6000, 7900] as [number, number],
};

/** The longest segment of each split chain of F's reading. */
function chainLengths(read: { splits: LatticePoint[][] }): number[] {
  return read.splits.map((c) => {
    let len = 0;
    for (let i = 0; i + 1 < c.length; i += 1) len = Math.max(len, Math.hypot(c[i + 1].x - c[i].x, c[i + 1].y - c[i].y));
    return len;
  });
}

/** F's blocks at L2 as normal forms. */
function blocksOf(p: Plat, f: FaceId, r: BandResult): string[] {
  if (r.whole.includes(f)) return normals(ringsOf(p, 1, f));
  return r.blocks.filter((b) => p.faces[2].parent[b] === f).flatMap((b) => normals(ringsOf(p, 2, b))).sort();
}

/**
 * S8 then S9 on one face: `late` inserted at L1 in the open batch and kerb(F) read there (S8's working block), the
 * splits read on the committed L1 face, then corridorUnion at L2 (S9's committed block).
 */
function s8s9(p: Plat, inside: readonly [number, number], late: { entity: string; pts: [number, number][] } | null, ws: SpineWidths): { s8: string[]; s9: string[]; splits: LatticePoint[][]; lengths: number[]; result: BandResult; face: FaceId } {
  let s8: string[] = [];
  commit(p, 1, (o) => {
    if (late !== null) {
      const a = insertChain(o, late.pts.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: late.entity }], 'mandatory');
      if (!a.ok) return err(a.code, a.detail);
    }
    const k = kerb(o, faceAt(p, 1, inside[0], inside[1]), ws);
    if (!k.ok) return err(k.code, k.detail);
    s8 = normals(k.value);
    return ok(null);
  });
  const [f] = own(p, 'district:1', [inside]);
  const read = readKerb(p, f, ws);
  expect(read.ok).toBe(true);
  if (!read.ok) throw new Error(read.detail);
  // every split chain within its junction's reach (C-0277 (1), (2))
  expect(splitsBeyondReach(p, read.value)).toEqual([]);
  const r = commit(p, 2, (o) => corridorUnion(o, [f], ws), AT_S9);
  healthy(p);
  expect(tilesExactly(p, 2, [f])).toEqual([]);
  const result = r.value as BandResult;
  // no corridor_split between two built blocks (a split lies in the band)
  expect(splitsBetweenBlocks(p, 2, result.blocks)).toEqual([]);
  return { s8, s9: blocksOf(p, f, result), splits: read.value.splits, lengths: chainLengths(read.value), result, face: f };
}

describe('N-52 (2): a junction’s corridor_split stays within its reach; a width step between near-collinear spines is straight-through', () => {
  it('the probe’s face (integrated seed 1, test size): the split at J reaches the kerb beside J, not the far corner; S9’s block is kerb(F)', () => {
    const p = framed(9000);
    for (const [entity, pts] of Object.entries(PROBE.ways)) way(p, entity, pts);
    const ws = widthsOf(PROBE.hw);
    const r = s8s9(p, [4000, 4000], null, ws);
    // the face's widest spine is way:6 (300 cm): every split chain within 2 · 300 + attractCm
    for (const len of r.lengths) expect(len).toBeLessThanOrEqual(2 * 300 + ATTRACT);
    // the split from J: one edge to the kerb within J's reach, and not the far corner
    const atJ = r.splits.filter((c) => c.some((q) => q.x === PROBE.J.x && q.y === PROBE.J.y));
    expect(atJ.length).toBe(1);
    expect(atJ[0].length).toBe(2);
    const K = atJ[0].find((q) => q.x !== PROBE.J.x || q.y !== PROBE.J.y) as LatticePoint;
    expect(Math.hypot(K.x - PROBE.J.x, K.y - PROBE.J.y)).toBeLessThanOrEqual(2 * 300 + ATTRACT);
    expect(Math.hypot(K.x - PROBE.farK.x, K.y - PROBE.farK.y)).toBeGreaterThan(1000);
    // straight-through at the width step: K lies on the wider strip's side, about its half-width from J
    expect(Math.hypot(K.x - PROBE.J.x, K.y - PROBE.J.y)).toBeGreaterThanOrEqual(163);
    // S8 ≡ S9: one built block, the kerb S8 read (normal forms: Hausdorff 0) — not a fragment cut off by a split
    expect(r.s8.length).toBe(1);
    expect(r.s9).toEqual(r.s8);
    expect(r.result.blocks.length).toBe(1);
    for (const c of r.splits) expect(entersRegion([r.s8[0].split(' ').map((t) => pt(Number(t.split(',')[0]), Number(t.split(',')[1])))], c)).toBe(false);
  });

  it('the probe’s second face: a junction with no kerb within its reach draws no split (never a far kerb piece)', () => {
    const p = framed(12_000);
    for (const [entity, pts] of Object.entries(PROBE2.ways)) way(p, entity, pts);
    commit(p, 1, (o) => insertChain(o, PROBE2.bound.map(([x, y]) => pt(x, y)), [{ role: 'district_bound', entity: 'district:9' }], 'mandatory'));
    const ws = widthsOf(PROBE2.hw);
    const r = s8s9(p, PROBE2.inside, null, ws);
    for (const len of r.lengths) expect(len).toBeLessThanOrEqual(2 * 184 + ATTRACT);
    // the kerb is the small piece where the face widens: no split reaches it from the narrow end's junctions
    expect(r.s8.length).toBe(1);
    for (const c of r.splits) for (const q of c) expect(q.x).toBeLessThan(9000);
    expect(r.s9).toEqual(r.s8);
  });

  it('§13.2 at a width step swept over 0.01°–20° (both turns, both width orders): every split within reach, S8’s working block ≡ S9’s block', { timeout: TIMEOUT }, () => {
    // a trapezoid face: way:a from P0 to J along y = 1000, way:b from J on to P1 (the step's turn: dy over 6 000 cm),
    // then up the slanted east side, across the top and down the slanted west side back to P0 — the slants put the far
    // kerb corners across the block from J. way:a is S8's: inserted at L1 in the open batch, kerb(F) read there. Past
    // 5° the sweep runs on to where the inner edges meet between one and two reaches out (≈ 8°–15° at 163 / 300) and
    // then within reach (a wedge): every point of the step's split within 2·max(hw) + attractCm of J — a reach of
    // 4·max(hw) would draw a wedge there 816 cm out at 10° (checks/M0-a-09-s1.md line 1). At 10° with 300 → 163 the
    // split's nearest kerb point lies 26 cm from the kerb corner (9000, 1300): taken at the corner (C-0280), else S9's
    // commit attracts the corner onto the splice and its block differs from S8's by a sliver.
    const P0: [number, number] = [3000, 1000];
    const J: [number, number] = [9000, 1000];
    const cases: { dy: number; hwA: number; hwB: number }[] = [];
    for (const dy of [1, 2, 5, 10, 52, 105, 210, 314, 420, 524, 525, 631, 843, 1063, 1275, 1393, 1608, 2183]) {
      // a turn away from F past 8° would take way:b below the frame (it turns away: no corner, the reach's other side)
      for (const sign of dy < 1000 ? [1, -1] : [1]) for (const [hwA, hwB] of [[163, 300], [300, 163], [120, 450]]) cases.push({ dy: sign * dy, hwA, hwB });
    }
    let corners = 0;
    const wedges = new Set<string>();
    for (const c of cases) {
      const p = framed(20_000);
      way(p, 'way:b', [J, [15_000, 1000 + c.dy], [17_000, 9000], [1000, 9000], P0]);
      const ws = widthsOf({ 'way:a': c.hwA, 'way:b': c.hwB });
      const r = s8s9(p, [9000, 5000], { entity: 'way:a', pts: [P0, J] }, ws);
      const label = `dy ${String(c.dy)}, hw ${String(c.hwA)} → ${String(c.hwB)}`;
      for (const len of r.lengths) expect(len, label).toBeLessThanOrEqual(2 * Math.max(c.hwA, c.hwB) + ATTRACT);
      // the step's junction has its one split from J
      const atJ = r.splits.filter((s) => s.some((q) => q.x === J[0] && q.y === J[1]));
      expect(atJ.length, label).toBe(1);
      for (const q of atJ[0]) expect(Math.hypot(q.x - J[0], q.y - J[1]), label).toBeLessThanOrEqual(2 * Math.max(c.hwA, c.hwB) + ATTRACT);
      if (atJ[0].length === 3) wedges.add(label);
      if (c.dy > 0) corners += 1;
      expect(r.s8.length, label).toBe(1);
      expect(r.s9, label).toEqual(r.s8);
      expect(r.result.blocks.length, label).toBe(1);
    }
    console.info(`width-step sweep: ${String(cases.length)} cases, ${String(corners)} left turns, wedges at ${JSON.stringify([...wedges])}`);
    expect(corners).toBe(54);
    // not vacuous on either side of the reach: at 15° and 20° the inner edges of 163 / 300 meet within reach (a wedge);
    // from 6° to 13° they meet between one and two reaches out — straight-through, where a reach of 4·max(hw) would
    // already draw the wedge (816 cm from J at 10°)
    expect([...wedges].sort()).toEqual(['dy 1608, hw 163 → 300', 'dy 1608, hw 300 → 163', 'dy 2183, hw 163 → 300', 'dy 2183, hw 300 → 163']);
  });

  it('a right-angle corner and an acute corner keep their kerb-corner splits (the reach changes nothing there)', () => {
    // the crossing's wedges and the 30° corner beyond reach (its kerb corner ~1 159 cm out on the bisector, confirmed by
    // the kerb's own vertex) are kerb.test.ts's; here the rule's two sides at one junction: a 90° turn with a width step
    const p = framed(8000);
    way(p, 'way:a', [[1000, 1000], [5000, 1000]]);
    way(p, 'way:b', [[5000, 1000], [5000, 7000], [1000, 7000], [1000, 1000]]);
    const ws = widthsOf({ 'way:a': 163, 'way:b': 300 });
    const r = s8s9(p, [3000, 4000], null, ws);
    // the corner at J = (5000, 1000): the wedge's kerb corner at (4700, 1163), its feet (4700, 1000) and (5000, 1163)
    expect(r.splits.some((s) => s.length === 3 && s[1].x === 4700 && s[1].y === 1163)).toBe(true);
    expect(r.s9).toEqual(r.s8);
    expect(r.result.wedges.length).toBeGreaterThanOrEqual(1);
  });
});

/** The trapezoid width step of the sweep: way:b from J bent by dy over 6 000 cm; way:a (S8's) from P0 to J. */
function step(dy: number, hwA: number, hwB: number): ReturnType<typeof s8s9> {
  const p = framed(20_000);
  way(p, 'way:b', [[9000, 1000], [15_000, 1000 + dy], [17_000, 9000], [1000, 9000], [3000, 1000]]);
  return s8s9(p, [9000, 5000], { entity: 'way:a', pts: [[3000, 1000], [9000, 1000]] }, widthsOf({ 'way:a': hwA, 'way:b': hwB }));
}

/**
 * A B-FUZZ chord network (support.ts `network`, the chords of the differential probe of checks/M0-a-09-s1.md, drawn by
 * B-FUZZ's own arbitrary): the L1 face holding `inside` read (kerb and splits), then corridorUnion over every face at
 * L2 — healthy, tiling, no split between two blocks, every split of every face within its junction's reach.
 */
function chordFace(chords: readonly Chord[], inside: readonly [number, number]): { kerb: string[]; splits: string[] } {
  const n = network(chords);
  const ws = widthsOf(n.table);
  const f = faceAt(n.p, 1, inside[0], inside[1]);
  const read = readKerb(n.p, f, ws);
  if (!read.ok) throw new Error(read.detail);
  for (const g of n.faces) {
    const rg = readKerb(n.p, g, ws);
    if (!rg.ok) throw new Error(rg.detail);
    expect(splitsBeyondReach(n.p, rg.value)).toEqual([]);
  }
  const r = commit(n.p, 2, (o) => corridorUnion(o, n.faces, ws), AT_S9);
  healthy(n.p);
  expect(tilesExactly(n.p, 2, n.faces)).toEqual([]);
  expect(splitsBetweenBlocks(n.p, 2, (r.value as BandResult).blocks)).toEqual([]);
  const text = (c: readonly LatticePoint[]): string => c.map((q) => `${String(q.x)},${String(q.y)}`).join(' ');
  return { kerb: read.value.kerb.map(text), splits: read.value.splits.map(text) };
}

describe('each target of a junction pinned (checks/M0-a-09-s1.md lines 1–3; C-0277 (2)–(4), C-0280)', () => {
  it('a near-straight width step of nearly equal half-widths (1°–4°, both turns): the two-point split at J, no wedge — meet’s near-parallel tolerance', { timeout: TIMEOUT }, () => {
    // without the tolerance the inner edges of 290 / 300 meet within reach at 2° and the junction becomes a wedge
    // [8709,1000] [8709,1290] [9000,1000]; within minFaceAngle the lines meet nowhere — §3.7's straight-through case
    for (const dy of [105, 210, 314, 420]) {
      for (const sign of [1, -1]) {
        for (const [hwA, hwB] of [[290, 300], [300, 290], [280, 300]]) {
          const label = `dy ${String(sign * dy)}, hw ${String(hwA)} → ${String(hwB)}`;
          const r = step(sign * dy, hwA, hwB);
          const near = r.splits.filter((c) => c.some((q) => Math.hypot(q.x - 9000, q.y - 1000) <= 2 * 300 + ATTRACT));
          expect(near.length, label).toBe(1);
          expect(near[0].length, label).toBe(2);
          expect(near[0][0], label).toEqual(pt(9000, 1000));
          expect(Math.hypot(near[0][1].x - 9000, near[0][1].y - 1000), label).toBeLessThanOrEqual(Math.max(hwA, hwB) + 1);
          expect(r.s9, label).toEqual(r.s8);
        }
      }
    }
    // the left turn of 2° at 290 → 300: the foot of J's perpendicular on way:a's kerb
    expect(step(210, 290, 300).splits.filter((c) => c.length === 2 && c[0].x === 9000 && c[0].y === 1000)[0]).toEqual([pt(9000, 1000), pt(9000, 1290)]);
  });

  it('a corner whose kerb corner lies off the meeting point (more than attractCm): the wedge through the kerb point nearest it', () => {
    // B-FUZZ chords (probe case 23), face 3: J = (2908, 0) and (2970, 224) turn left at corners whose inner edges meet
    // at (3056, 32) and (3054, 23), each within reach; the kerb's vertex (3117, 27) lies 61 and 64 cm from them, so
    // the kerb point nearest the meeting point is the corner — the wedge through it, never a single split
    const chords: Chord[] = [
      { a: 4302, b: 27, hw: 26, knots: [94, 559], ends: 'square' },
      { a: 4015, b: 40, hw: 398, knots: [10, 103], ends: 'round' },
      { a: 2908, b: 7971, hw: 434, knots: [134, 140], ends: 'round' },
    ];
    const r = chordFace(chords, [3700, 100]);
    expect(r.kerb).toEqual(['4000,0 4000,208 3117,27']);
    expect(r.splits.sort()).toEqual(['2930,79 3117,27 3117,0', '3101,234 3117,27 2930,79']);
  });

  it('an acute corner of small half-width whose meeting point lies beyond reach: the one straight-through split', () => {
    // B-FUZZ chords (probe case 67), face 0: J = (1743, 1981), half-widths 35 / 21, reach 96; the inner edges meet
    // ≈ 110 cm out and no kerb vertex lies within attractCm of that point — the straight-through aim's split to the
    // kerb's corner (1772, 1916), never no split
    const chords: Chord[] = [
      { a: 11_146, b: 2616, hw: 21, knots: null, ends: 'round' },
      { a: 12_731, b: 4314, hw: 35, knots: null, ends: 'square' },
    ];
    const r = chordFace(chords, [3500, 100]);
    expect(r.kerb).toEqual(['2616,0 4000,0 4000,265 1772,1916']);
    expect(r.splits).toEqual(['1743,1981 1772,1916']);
  });

  it('a left turn whose inner edges meet far beyond reach, a kerb vertex near that point: no split to it (the corner path has a reach)', () => {
    // B-FUZZ chords (probe case 766), face 2: J = (130, 27); a corner flag or a kerb-vertex acceptance without the
    // reach draws 2972,609 2994,501 130,27 — 2 903 cm from J against a reach of 850; no kerb point lies within reach
    const chords: Chord[] = [
      { a: 15_964, b: 18, hw: 15, knots: [135, 271], ends: 'square' },
      { a: 4819, b: 16, hw: 113, knots: null, ends: 'square' },
      { a: 5184, b: 41, hw: 7, knots: [367, 413], ends: 'round' },
    ];
    const r = chordFace(chords, [3000, 100]);
    expect(r.kerb).toEqual(['1410,0 4000,0 4000,708 2994,501']);
    expect(r.splits).toEqual([]);
  });

  it('a corner wedge the guard drops: the junction’s straight-through split instead, the dropped splice taken out of the kerb (C-0280)', () => {
    // B-FUZZ chords (probe case 43), face 3: J = (3915, 3645) turns sharply left; the kerb's tip (3274, 3711) lies
    // 29.5 cm from the inner edges' meeting point, so the corner target is the kerb point nearest it, (3253, 3690),
    // on the edge short of the tip — and the wedge through it would cross the tip into the block. The guard drops it,
    // takes (3253, 3690) out of the kerb again, and the straight-through aim gives the split J → (3241, 3677)
    const chords: Chord[] = [
      { a: 11_553, b: 7636, hw: 23, knots: null, ends: 'round' },
      { a: 2363, b: 5128, hw: 27, knots: [222, 480], ends: 'round' },
      { a: 263, b: 7730, hw: 174, knots: [471, 502], ends: 'round' },
    ];
    const r = chordFace(chords, [300, 2000]);
    expect(r.kerb).toEqual(['0,404 3241,3677 3274,3711 447,4000 0,4000']);
    expect(r.splits).toEqual(['3915,3645 3241,3677']);
  });
});

describe('entersRegion: a split never crosses a block (N-52 (2))', () => {
  const sq: LatticePoint[][] = [[pt(0, 0), pt(1000, 0), pt(1000, 1000), pt(0, 1000)]];
  it('a chain outside or along the kerb does not enter it; one through its interior does', () => {
    expect(entersRegion(sq, [pt(-100, -100), pt(0, 0)])).toBe(false);
    expect(entersRegion(sq, [pt(-100, 500), pt(0, 500)])).toBe(false);
    expect(entersRegion(sq, [pt(0, -100), pt(0, 0), pt(0, 1000)])).toBe(false);
    expect(entersRegion(sq, [pt(-100, -100), pt(1000, 1000)])).toBe(true);
    expect(entersRegion(sq, [pt(-100, 500), pt(500, 500)])).toBe(true);
    // entering through a vertex, no proper crossing: the piece past the vertex is read at its middle
    expect(entersRegion(sq, [pt(-500, -500), pt(0, 0), pt(500, 500)])).toBe(true);
    expect(entersRegion(sq, [pt(-500, -500), pt(500, 500)])).toBe(true);
    // a hole (clockwise) is outside the kerb
    const holed: LatticePoint[][] = [sq[0], [pt(300, 300), pt(300, 700), pt(700, 700), pt(700, 300)]];
    expect(entersRegion(holed, [pt(400, 400), pt(600, 600)])).toBe(false);
    expect(entersRegion(holed, [pt(400, 400), pt(200, 200)])).toBe(true);
  });
});
