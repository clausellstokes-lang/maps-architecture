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
import { describe, expect, it } from 'vitest';
import { type FaceId, type Plat } from '../../../src/arena/index.js';
import { err, ok } from '../../../src/num/index.js';
import { insertChain } from '../../../src/insert/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { entersKerb, kerb, readKerb, type SpineWidths } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import type { BandResult } from '../../../src/arr/bandUnion.js';
import { AT_S9, commit, faceAt, framed, healthy, normals, own, pt, ringsOf, tilesExactly, TIMEOUT, way, widthsOf } from './support.js';

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
  const r = commit(p, 2, (o) => corridorUnion(o, [f], ws), AT_S9);
  healthy(p);
  expect(tilesExactly(p, 2, [f])).toEqual([]);
  const result = r.value as BandResult;
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
    for (const c of r.splits) expect(entersKerb([r.s8[0].split(' ').map((t) => pt(Number(t.split(',')[0]), Number(t.split(',')[1])))], c)).toBe(false);
  });

  it('§13.2 at a width step swept over 0.01°–5° (both turns, both width orders): every split within reach, S8’s working block ≡ S9’s block', { timeout: TIMEOUT }, () => {
    // a trapezoid face: way:a from P0 to J along y = 1000, way:b from J on to P1 (the step's turn: dy over 6 000 cm),
    // then up the slanted east side, across the top and down the slanted west side back to P0 — the slants put the far
    // kerb corners across the block from J. way:a is S8's: inserted at L1 in the open batch, kerb(F) read there.
    const P0: [number, number] = [3000, 1000];
    const J: [number, number] = [9000, 1000];
    const cases: { dy: number; hwA: number; hwB: number }[] = [];
    for (const dy of [1, 2, 5, 10, 52, 105, 210, 314, 420, 524, 525]) for (const sign of [1, -1]) for (const [hwA, hwB] of [[163, 300], [300, 163], [120, 450]]) cases.push({ dy: sign * dy, hwA, hwB });
    let corners = 0;
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
      if (c.dy > 0) corners += 1;
      expect(r.s8.length, label).toBe(1);
      expect(r.s9, label).toEqual(r.s8);
      expect(r.result.blocks.length, label).toBe(1);
    }
    expect(corners).toBe(33);
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

describe('entersKerb: a split never crosses a block (N-52 (2))', () => {
  const sq: LatticePoint[][] = [[pt(0, 0), pt(1000, 0), pt(1000, 1000), pt(0, 1000)]];
  it('a chain outside or along the kerb does not enter it; one through its interior does', () => {
    expect(entersKerb(sq, [pt(-100, -100), pt(0, 0)])).toBe(false);
    expect(entersKerb(sq, [pt(-100, 500), pt(0, 500)])).toBe(false);
    expect(entersKerb(sq, [pt(0, -100), pt(0, 0), pt(0, 1000)])).toBe(false);
    expect(entersKerb(sq, [pt(-100, -100), pt(1000, 1000)])).toBe(true);
    expect(entersKerb(sq, [pt(-100, 500), pt(500, 500)])).toBe(true);
    // entering through a vertex, no proper crossing: the piece past the vertex is read at its middle
    expect(entersKerb(sq, [pt(-500, -500), pt(0, 0), pt(500, 500)])).toBe(true);
    expect(entersKerb(sq, [pt(-500, -500), pt(500, 500)])).toBe(true);
    // a hole (clockwise) is outside the kerb
    const holed: LatticePoint[][] = [sq[0], [pt(300, 300), pt(300, 700), pt(700, 700), pt(700, 300)]];
    expect(entersKerb(holed, [pt(400, 400), pt(600, 600)])).toBe(false);
    expect(entersKerb(holed, [pt(400, 400), pt(200, 200)])).toBe(true);
  });
});
