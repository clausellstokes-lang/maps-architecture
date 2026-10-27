// M0-a-09's session fix round S15 (lane build/M0-a-09-fix-s15; J498 / J504: the fusion smoke's REPORTED classes as the
// session's diagnosis seat refined them, and the S14 closing check's one blocker B-NEST): each pin here is red on the
// round's starting engine (round S14's kerb.ts, `checks/M0-a-09-notes.md` 'Hardening round S15' names the mutant that
// restores each cause) and green on this tree. The face fixtures (s15-faces.json) are L1 faces of M0-c-06's CITY
// derivations read after S8, in vertexcontact-faces.json's form, written by the round's probe on the c-06 harness.
import { describe, expect, it } from 'vitest';
import type { FaceId, Plat } from '../../../src/arena/index.js';
import { DRY_MOVE_CM, kerbCensus, readFace, readKerb, type KerbRead, type SpineWidths } from '../../../src/arr/kerb.js';
import { LATTICE } from '../../../src/num/index.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import type { BandResult } from '../../../src/arr/bandUnion.js';
import { AT_S9, buildSmoke, commit, framed, hausdorffCm, healthy, nestingProblems, network, normals, own, P, readIn, ringsOf, smokeFaces, spineDepth, tilesExactly, way, wideNetwork, widthsOf, type Chord, type WideWay } from './support.js';

/** kerb(F) read in an L1 batch (S8's read): the read, or its refusal as "code detail". */
function readL1(p: Plat, f: FaceId, ws: SpineWidths): KerbRead | string {
  const k = readIn(p, 1, (o) => readKerb(o, f, ws));
  return k.ok ? k.value : `${k.code} ${k.detail}`;
}

/** corridorUnion over the faces at L2 (S9): healthy, tiling exactly; its result. */
function s9(p: Plat, faces: readonly FaceId[], ws: SpineWidths): BandResult {
  const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
  healthy(p);
  expect(tilesExactly(p, 2, faces)).toEqual([]);
  return r.value as BandResult;
}

/** Every committed block of the result inside L1 face f, by normal form (an L1 face committed whole: its own rings). */
function blocksIn(p: Plat, v: BandResult, f: FaceId): string[] {
  const out = v.blocks.filter((b) => p.faces[2].parent[b] === f).flatMap((b) => normals(ringsOf(p, 2, b)));
  if (v.whole.includes(f)) out.push(...normals(ringsOf(p, 1, f)));
  return out.sort();
}

describe('B-NEST (the S14 closing check’s blocker): the nesting oracle reads each ring’s depth parity — a kerb island inside a hole of kerb(F) is well nested', () => {
  const sq = (x: number, y: number, s: number, cw = false) => {
    const r = [P(x, y), P(x + s, y), P(x + s, y + s), P(x, y + s)];
    return cw ? r.reverse() : r;
  };

  it('outer ⊃ hole ⊃ outer is well nested; an outer ring inside an outer ring with no hole between, a hole inside a hole or inside nothing, is a fault', () => {
    expect(nestingProblems([sq(0, 0, 100), sq(10, 10, 80, true), sq(30, 30, 20)])).toEqual([]);
    expect(nestingProblems([sq(0, 0, 100), sq(10, 10, 80, true), sq(30, 30, 20), sq(35, 35, 5, true)])).toEqual([]);
    expect(nestingProblems([sq(0, 0, 100), sq(30, 30, 20)])).toEqual(['outer ring 1 inside another outer ring']);
    expect(nestingProblems([sq(0, 0, 100), sq(10, 10, 80, true), sq(30, 30, 20, true)])).toEqual(['hole 2 inside a hole (depth 2)']);
    expect(nestingProblems([sq(0, 0, 100), sq(200, 200, 20, true)])).toEqual(['hole 1 inside no outer ring']);
  });

  it('the widened B-FUZZ family’s network 561 (NEAR #1 of the S14 check; three overlapping ring ways): kerb(F) of the frame face is the frame, one hole round the bands’ union and a 1 436 cm² island inside it — corridorUnion commits it so', () => {
    // the shrunk counterexample of `Property failed after 561 tests { seed: -569349663 }` (checks/M0-a-09-s14.md B-NEST;
    // the check's probe P7): ring A 400..700 × 1819..2119 (hw 30) crosses ring B 400..741 × 1055..1879 (hw 264), ring C
    // 717..1017 × 2411..2711 (hw 242); the three bands come within 26 – 35 cm of one another round the island
    const ways: WideWay[] = [
      { kind: 'ring', a: 0, b: 0, x: 400, y: 1819, w: 300, h: 300, hw: 30, knots: null, ends: 'round' },
      { kind: 'ring', a: 0, b: 0, x: 400, y: 1055, w: 341, h: 824, hw: 264, knots: null, ends: 'round' },
      { kind: 'ring', a: 0, b: 0, x: 717, y: 2411, w: 300, h: 300, hw: 242, knots: null, ends: 'round' },
    ];
    const n = wideNetwork(ways);
    const ws = widthsOf(n.table);
    const island = '700,2119 730,2119 741,2143 717,2169 700,2149';
    const hole =
      '400,791 341,798 285,817 235,849 194,890 162,940 143,996 136,1055 136,1879 143,1938 162,1994 194,2044 235,2085 285,2117 341,2136 370,2119 400,2119 400,2149 663,2149 612,2193 566,2222 528,2260 499,2306 481,2357 475,2411 475,2711 481,2765 499,2816 528,2862 566,2900 612,2929 663,2947 717,2953 1017,2953 1071,2947 1122,2929 1168,2900 1206,2862 1235,2816 1253,2765 1259,2711 1259,2411 1253,2357 1235,2306 1206,2260 1168,2222 1122,2193 1071,2175 1017,2169 800,2136 856,2117 906,2085 947,2044 979,1994 998,1938 1005,1879 1005,1055 998,996 979,940 947,890 906,849 856,817 800,798 741,791';
    const k = readL1(n.p, 1, ws);
    if (typeof k === 'string') throw new Error(k);
    expect(k.kerb.length).toBe(3);
    expect(normals(k.kerb)).toEqual(['0,0 4000,0 4000,4000 0,4000', hole, island].sort());
    // the engine's read is well nested (outer 1 > hole 0 > island 1), and the oracle says so
    expect(nestingProblems(k.kerb)).toEqual([]);
    const v = s9(n.p, n.faces, ws);
    // two blocks in face 1: the frame less the hole, and the island
    expect(v.blocks.filter((b) => n.p.faces[2].parent[b] === 1).map((b) => normals(ringsOf(n.p, 2, b)).join(' | ')).sort()).toEqual([['0,0 4000,0 4000,4000 0,4000', hole].sort().join(' | '), island].sort());
  });
});

describe('the start-cap rule (the smoke’s Q60 class and fusion 21; §3.7’s ends): a spine’s end on another chain’s line — a T-junction — takes no cap; every reader of ends follows it', () => {
  it('a lane in the neighbour face starting at a vertex on F’s zero-width edge (a setback line): kerb(F) = F there — no round bite across the line — and corridorUnion’s block is F', () => {
    // round S14's engine: the lane's round start cap (r 170) bites a half-disc out of F across the setback line
    const p = framed();
    way(p, 'enceinte:1', [[2000, 0], [2000, 4000]], [], 'setback');
    way(p, 'way:L', [[2000, 2000], [3000, 2000], [3500, 2600]]);
    const [f] = own(p, 'district:1', [[1000, 1000]]);
    const ws = widthsOf({ 'way:L': 170 });
    const k = readL1(p, f, ws);
    if (typeof k === 'string') throw new Error(k);
    expect(normals(k.kerb)).toEqual(['0,0 2000,0 2000,4000 0,4000']);
    // the census still names the lane (its strip reaches F's boundary at the junction; `reaches` is a superset)
    expect(kerbCensus(p)?.reaching).toEqual(['way:way:L']);
    const v = s9(p, [f], ws);
    expect(blocksIn(p, v, f)).toEqual(['0,0 2000,0 2000,4000 0,4000']);
  });

  it('every reader of ends: a lane whose first segment is 50 cm long starts on F’s zero-width edge — the census’s post-condition reads F’s vertex at the lane’s start on its flat end, not 120 cm deep in the next vertex’s join (river integrated 4’s face 19, CENSUS_DEEP)', () => {
    const p = framed();
    way(p, 'enceinte:1', [[2000, 0], [2000, 4000]], [], 'setback');
    way(p, 'way:L', [[2000, 2000], [2050, 2000], [3000, 2400]]);
    const [f] = own(p, 'district:1', [[1000, 1000]]);
    const ws = widthsOf({ 'way:L': 170 });
    const k = readL1(p, f, ws);
    if (typeof k === 'string') throw new Error(k);
    expect(normals(k.kerb)).toEqual(['0,0 2000,0 2000,4000 0,4000']);
    expect(kerbCensus(p)?.refusedAt).toBeNull();
    const v = s9(p, [f], ws);
    expect(blocksIn(p, v, f)).toEqual(['0,0 2000,0 2000,4000 0,4000']);
  });

  it('the T-junction into a narrower spine (fusion 21: hw 233.2 starting on hw 157.8): the wider lane’s cap no longer overhangs the narrower band into F', () => {
    const p = framed();
    way(p, 'way:N', [[2000, 0], [2000, 4000]]);
    way(p, 'way:L', [[2000, 2000], [3000, 2000], [3500, 2600]]);
    const [f] = own(p, 'district:1', [[1000, 1000]]);
    const ws = widthsOf({ 'way:L': 233, 'way:N': 158 });
    const k = readL1(p, f, ws);
    if (typeof k === 'string') throw new Error(k);
    // round S14's engine: a 75 cm bite of the lane's start cap past x = 1842 round (2000, 2000)
    expect(normals(k.kerb)).toEqual(['0,0 1842,0 1842,4000 0,4000']);
    const v = s9(p, [f], ws);
    expect(blocksIn(p, v, f)).toEqual(['0,0 1842,0 1842,4000 0,4000']);
  });

  it('a FREE end keeps its declared cap (a dead end’s turning head; bandUnion’s dead-end cap, notes row 43): the lane starts on the spine (no cap there) and ends inside F (round)', () => {
    const p = framed();
    way(p, 'way:N', [[2000, 0], [2000, 4000]]);
    way(p, 'way:D', [[2000, 2000], [1200, 2000]]);
    const fs = own(p, 'district:1', [[1000, 1000], [3000, 1000]]);
    const ws = widthsOf({ 'way:D': 150, 'way:N': 158 });
    const k = readL1(p, fs[0], ws);
    if (typeof k === 'string') throw new Error(k);
    expect(normals(k.kerb)).toEqual(['0,0 1842,0 1842,1850 1200,1850 1154,1857 1112,1879 1079,1912 1057,1954 1050,2000 1057,2046 1079,2088 1112,2121 1154,2143 1200,2150 1842,2150 1842,4000 0,4000']);
    // no kerb vertex deeper in the dead end's band than an insertion's move
    expect(k.kerb.flat().every((q) => !(q.x > 1200 + DRY_MOVE_CM && q.x < 1842 && Math.abs(q.y - 2000) < 150 - DRY_MOVE_CM))).toBe(true);
  });
});

/** A smoke face read and committed on its rebuilt arena (s15-faces.json): the read, the census, the deepest spine depth (the rule's reading) and S9's blocks. */
function smoke(name: string): { read: KerbRead; census: ReturnType<typeof kerbCensus>; deepest: { depth: number; at: string; spine: string }; blocks: string[]; hausdorff: number } {
  const fx = smokeFaces().get(name);
  if (fx === undefined) throw new Error(`no smoke face ${name}`);
  const { p, face, widths } = buildSmoke(fx);
  // the fixture is the smoke's face: its route ring as the derivation left it after S8
  expect(readFace(p, face, widths).rings[0].map((q) => [q.x, q.y])).toEqual(fx.ring);
  const k = readL1(p, face, widths);
  if (typeof k === 'string') throw new Error(`${name}: ${k}`);
  const census = kerbCensus(p);
  let deepest = { depth: -Infinity, at: '', spine: '' };
  for (const s of k.spines.values()) {
    const d = spineDepth(k.kerb, s);
    if (d.depth > deepest.depth) deepest = { ...d, spine: s.key };
  }
  const r = commit(p, 2, (o) => corridorUnion(o, [face], widths), AT_S9);
  healthy(p);
  expect(tilesExactly(p, 2, [face])).toEqual([]);
  const v = r.value as BandResult;
  const rings = [...v.blocks.flatMap((b) => ringsOf(p, 2, b)), ...(v.whole.includes(face) ? ringsOf(p, 1, face) : [])];
  return { read: k, census, deepest, blocks: normals(rings).sort(), hausdorff: hausdorffCm(rings, k.kerb) };
}

describe('line 1 (the smoke’s KEPT_DEEP class, (a)): a part’s held cycle runs along each segment’s own held edges — never back round the part through its other placed vertices (kerb.ts `rowPath`)', () => {
  it('fusion 4 face 1015 (district:cb5t8yvkp46x0): the read round S14 refused KEPT_DEEP at part 88 (−159.74, 7452) — the strip of way:9v7nb4krsm5be’s segment whose inner side the arena holds as 7 sub-edges — reads, and S9 commits it', () => {
    const s = smoke('fusion 4 face 1015');
    expect(s.census?.refusedAt).toBeNull();
    expect(s.read.kerb.length).toBe(2);
    // no kerb vertex deeper in any of F's spines' bands than the lattice's rounding and an attraction (the rule's reading)
    expect(s.deepest.depth).toBeLessThanOrEqual(LATTICE.attractCm);
    // S8 ≡ S9: corridorUnion's blocks are the read, by normal forms
    expect(s.blocks).toEqual(normals(s.read.kerb).sort());
  });

  it('integrated 4 face 1422 (district:fw3g616078gbw): the 6-against-6 hop tie the lattice order broke the wrong way — round S14 refused KEPT_DEEP at part 8 (−30507.08, 42830.5) — reads, and S9 commits it', () => {
    const s = smoke('integrated 4 face 1422');
    expect(s.census?.refusedAt).toBeNull();
    expect(normals(s.read.kerb)).toEqual(['-37484,36728 -29882,39695 -29933,39799 -31010,42322 -31022,42363 -31024,42407 -31015,42449 -30995,42488 -30967,42521 -30321,43140 -33809,42626 -38730,41899 -38648,41378 -38499,40571 -38328,39766 -38277,39554 -38136,38968 -37923,38173 -37690,37386']);
    expect(s.deepest.depth).toBeLessThanOrEqual(LATTICE.attractCm);
    expect(s.blocks).toEqual(normals(s.read.kerb).sort());
  });

  it('fusion 1 face 559 (block:3fhrnvq8q9jy0’s face): the 2-against-2 tie on the round join at F’s vertex 20 — round S14’s kerb held F’s vertex (−29028, 53796) on way:0bn7zbp1cnetr’s centreline, a needle 171.6 cm deep that S9 folded (the smoke’s 170.93 cm) — is gone', () => {
    const s = smoke('fusion 1 face 559');
    expect(s.read.kerb.flat().some((q) => q.x === -29028 && q.y === 53796)).toBe(false);
    expect(s.deepest.depth).toBeLessThanOrEqual(1);
    expect(s.blocks).toEqual(normals(s.read.kerb).sort());
    expect(s.hausdorff).toBeLessThan(0.01);
  });
});

describe('line 3 (the attraction-radius straddle, (b)): a part’s corner within minEdge of a corner an earlier part of its spine run was held off is laid at that vertex (kerb.ts `coincident`)', () => {
  it('integrated 10 face 665 (block:71kx740v1n6nh’s face): the strip’s corner held 24.8 cm off at (43137, −76766), the next strip’s 1.4 cm away left 26.2 cm off — round S14 kept the wedge between them, a needle to F’s vertex (43016, −76636) on way:d0452rfb7n1sp’s centreline (176.6 cm; S9 folded it: the smoke’s 176.39 cm); now held at one vertex, no needle', () => {
    const s = smoke('integrated 10 face 665');
    expect(s.read.kerb.flat().some((q) => q.x === 43016 && q.y === -76636)).toBe(false);
    expect(normals(s.read.kerb)).toEqual(['46222,-79590 47803,-77999 44503,-74976 44459,-75066 44029,-75631 43594,-76192 43137,-76766 43582,-77143 44150,-77631 44708,-78130 45256,-78642 45791,-79162']);
    expect(s.deepest.depth).toBeLessThanOrEqual(LATTICE.attractCm);
    expect(s.blocks).toEqual(normals(s.read.kerb).sort());
  });

  it('only an ATTRACTION holds a point off: a point merged into its own run’s exact vertex is no hold-off, and the reads round S14 made there stand — a dead end’s round cap keeps its arc, not its centreline end (notes row 113)', () => {
    // two draws of the round's differential probe (the mirror; the coincident rule without the exclusion of a merge into
    // the run's own exact vertex, mutant ME, against this engine): a widened-family dead end (hw 130 → 42) whose cap arc
    // ends merged into the run's exact vertices — ME carries the next part's corner onto the lane's END point (3508, 1940),
    // on its centreline 42 cm inside the cap; a chord (hw 30) ending on the frame whose band corner (3506, 29) ME lays at
    // the chord's end (3500, 0). Both reads are round S14's, unchanged by the round.
    const wide: WideWay[] = [
      { kind: 'dead', a: 6937, b: 1272, x: 3508, y: 1940, w: 1285, h: 1524, hw: 180, knots: [130, 42], ends: 'round' },
      { kind: 'bent', a: 1428, b: 15829, x: 1738, y: 687, w: 634, h: 563, hw: 22, knots: [167, 49], ends: 'round' },
      { kind: 'dead', a: 10578, b: 8575, x: 3206, y: 2928, w: 1095, h: 426, hw: 4, knots: null, ends: 'square' },
    ];
    const w = wideNetwork(wide);
    const kw = readL1(w.p, w.faces[0], widthsOf(w.table));
    if (typeof kw === 'string') throw new Error(kw);
    expect(kw.kerb.flat().some((q) => q.x === 3508 && q.y === 1940)).toBe(false);
    expect(normals(kw.kerb)).toEqual(['1607,0 4000,0 4000,2683 3546,1921 3511,1898 3473,1917 3470,1959 3883,2995 3910,3031 3948,3056 4000,3066 4000,4000 0,4000 0,223 1700,814 1743,819 1785,811 1822,789 1851,757 1867,717 1870,674 1859,633']);
    const chords: Chord[] = [
      { a: 3500, b: 15304, hw: 30, knots: null, ends: 'round' },
      { a: 6973, b: 49, hw: 1, knots: [32, 59], ends: 'round' },
    ];
    const c = network(chords);
    const kc = readL1(c.p, c.faces[1], widthsOf(c.table));
    if (typeof kc === 'string') throw new Error(kc);
    expect(normals(kc.kerb)).toEqual(['3500,0 4000,0 4000,2933 873,553 3506,29']);
  });

  it('a point held off FARTHER than attractCm (§3.6’s placement fallback) holds nothing off: the face wholly inside its bands stays empty, no needle to a way’s bend (notes row 113)', () => {
    // a draw of the round's differential probe (the coincident rule recording placement-fallback holds too, mutant FH,
    // against this engine): face 4 lies wholly within the bent ways' bands — round S14's read and this round's are
    // empty; FH lays a later part's corner at a vertex held off by the fallback and keeps a needle of the band from
    // (1898, 1481) to way:1's bend (1786, 2658) on its centreline
    const wide: WideWay[] = [
      { kind: 'bent', a: 12803, b: 9125, x: 2072, y: 1260, w: 653, h: 1507, hw: 85, knots: [177, 261], ends: 'square' },
      { kind: 'bent', a: 2038, b: 1968, x: 1786, y: 2658, w: 744, h: 565, hw: 20, knots: null, ends: 'square' },
      { kind: 'ring', a: 7106, b: 4812, x: 3100, y: 1432, w: 600, h: 959, hw: 22, knots: null, ends: 'round' },
    ];
    const w = wideNetwork(wide);
    const k = readL1(w.p, w.faces[4], widthsOf(w.table));
    if (typeof k === 'string') throw new Error(k);
    expect(normals(k.kerb)).toEqual([]);
  });
});

describe('line 2 (the start-cap rule, (c) and (d)) on the smoke’s faces: a lane’s start on F’s zero-width edge, or on a narrower spine, bites no round cap out of F', () => {
  it('river integrated 2 face 192 (Q60, block:223ebebtrn8m3): way:72aqbdpft7199 starts at F’s vertex (24354, 4071) on a seam / setback line — round S14’s kerb carried its start cap, an arc of radius 172.6 cm, into F; now none', () => {
    const s = smoke('river integrated 2 face 192');
    expect(s.census?.reaching).toEqual(['way:way:72aqbdpft7199']);
    expect(s.census?.refusedAt).toBeNull();
    // the lane's start is a corner of kerb(F) — no cap round it (round S14: the arc (24527, 4070) … (24328, 3900) of radius
    // 172.6 cm, F's corner inside it) — and no kerb vertex lies inside that disc but the corner itself
    expect(s.read.kerb.flat().some((q) => q.x === 24354 && q.y === 4071)).toBe(true);
    expect(s.read.kerb.flat().filter((q) => Math.hypot(q.x - 24354, q.y - 4071) < 170)).toEqual([P(24354, 4071)]);
    expect(s.deepest.depth).toBeLessThanOrEqual(LATTICE.attractCm);
    expect(s.hausdorff).toBeLessThanOrEqual(1);
  });

  it('river integrated 4 face 9 (block:a7rbrrfn5c1t9): way:3dp6cgg39cxpr starts at F’s vertex (13908, −18344) on F’s zero-width edge — round S14 bit a 151 cm cap out of F; now kerb(F) is F, committed whole', () => {
    const s = smoke('river integrated 4 face 9');
    expect(s.census?.reaching).toEqual(['way:way:3dp6cgg39cxpr']);
    // kerb(F) is F, within the lattice's rounding (the vertices the read laid on F's edges aside; round S14: a 151 cm bite)
    const ring = (smokeFaces().get('river integrated 4 face 9')?.ring ?? []).map(([x, y]) => P(x, y));
    expect(hausdorffCm(s.read.kerb, [ring])).toBeLessThanOrEqual(1);
    expect(s.deepest.depth).toBeLessThanOrEqual(1);
    expect(s.hausdorff).toBeLessThanOrEqual(1);
  });

  it('fusion 21 face 576 (block:b3xpcp1x3fad2): way:b3n1efpggn7ps (hw 233.2) starts on the narrower way:brhahesh2amgg (hw 157.8) at F’s vertex (30578, 21378) — round S14’s start cap overhung the narrower band by 75.4 cm; now kerb(F) runs straight on along that band’s edge', () => {
    const s = smoke('fusion 21 face 576');
    expect(s.census?.reaching).toEqual(['way:way:b3n1efpggn7ps']);
    // the arc (30411, 21223) … (30429, 21552) of round S14 is gone: the kerb runs (30406, 21129) → (30420, 21387) → (30481, 22464)
    expect(normals(s.read.kerb)[0]).toContain('30406,21129 30420,21387 30481,22464');
    expect(s.deepest.depth).toBeLessThanOrEqual(LATTICE.attractCm);
    expect(s.blocks).toEqual(normals(s.read.kerb).sort());
  });
});
