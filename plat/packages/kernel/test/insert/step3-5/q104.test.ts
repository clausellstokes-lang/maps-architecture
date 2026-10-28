// Round S12, queue row Q104 (ruling N-63 (2); Q58's partner draw 1524 with it; C-0432): Q59's class — corridorUnion's
// own N-57 (2) refusals ("cannot pin its contact at (x, y) within attractCm on the face's boundary"; "ends on a dangling
// tip … off the face's boundary") on lawful B-FUZZ networks — read at its root, §3.6's placement in insertChain. A kerb
// piece's contact c lies on F's boundary edge E where E runs within minEdge of other geometry, so the placement rule
// seats no vertex on E within attractCm of c and falls back onto E's far end (263 cm in case (a)); the fidelity bound
// refuses that route, and the third and fourth passes' in-bound landing put the piece's end at a free spot 25 – 26 cm
// into F: a dangling tip, which corridorUnion's closing cannot pin.
//
// The round builds one rule for an open chain's END in the third and fourth passes (insertChain.ts `endLanding`, the
// end rule W): the end stays on the edge it meets — the nearest qualifying point of the piece it attracts to within the
// fidelity bound, or the nearest existing vertex on that piece within it — before a free spot. The networks below commit
// (case (b) of a-09 S14's hand-back, notes row 101; Q58's draw 8 897), healthy, tiling, with no spur, every closing by
// kerb(F), and every committed block of F within the bound of kerb(F) as read.
//
// The class's residual — sub-class A (the end segment along the edge: case (a), seed 4's draw 9 373) and sub-class B
// (the contact on a way's centreline that runs within minEdge of the L0 frame, met across the way by another kerb) — has
// no lawful vertex on F's boundary within the fidelity bound of the contact: proved here from §3.10's clearance and
// §3.6's placement tests, written from their definitions, not with the code under test. Every route of the piece ends at
// a vertex, so none can keep the piece's end within the bound and insertChain's fidelity bound refuses each: the
// networks stay refused, pinned (notBuilt #4, C-0432; REPORTED to the session — N-57 (2)'s contract for a contact with
// no lawful seat, or the network's T-junction below minFaceAngle, C-0177 (2)). The round first committed sub-class A by
// a second end rule (A: the end absorbed into its neighbour's landing along the edge); census run 3 found it moving a
// mandatory chain's end 166 cm, beyond the bound (seed 7307, pinned below), so it is withdrawn.
import { describe, expect, it } from 'vitest';
import { isHalfEdgeLive, isVertexLive, type Plat } from '../../../src/arena/index.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandClosings, type BandResult } from '../../../src/arr/bandUnion.js';
import { readKerb, UNLAID_DEEP } from '../../../src/arr/kerb.js';
import { tx } from '../../../src/tx/index.js';
import { LATTICE } from '../../../src/num/index.js';
import { HOT_PIXEL_CM } from '../../../src/index/index.js';
import type { LatticePoint, Level } from '../../../src/types/index.js';
import { AT_S9, closingsBeyond, hausdorffCm, healthy, network, readIn, ringsOf, spec, spursOf, state, tilesExactly, wideNetwork, widthsOf, type Chord, type WideWay } from '../../arr/bands/support.js';
import { fidelityProblems } from './fidelity.js';
import { genChain } from './gen.js';
import { allProblems, framed, generator, ins, intIn, tx as insTx } from './support.js';

const ATTRACT = LATTICE.attractCm;
const MIN_EDGE = LATTICE.minEdgeCm;
/** The fidelity bound, 2 · √2 · attractCm (§3.6, N-43). */
const BOUND = 2 * Math.SQRT2 * ATTRACT;

/** A chord list as its name (B-FUZZ's corridor domain; arc positions on the framed square). */
const chords = (xs: readonly (readonly [number, number, number, readonly [number, number] | null, 'round' | 'square'])[]): Chord[] =>
  xs.map(([a, b, hw, knots, ends]) => ({ a, b, hw, knots, ends }));

interface Committed {
  readonly name: string;
  readonly chords: Chord[];
  /** The face whose kerb piece's contact Q104 read (its contact). */
  readonly face: number;
  readonly contact: readonly [number, number];
  /** The bound on the Hausdorff distance of F's committed blocks to kerb(F) as read (cm). */
  readonly within: number;
}

const COMMITTED: readonly Committed[] = [
  // a-09 S14 notes row 101 (b): the contact on a 9° wedge's side, 17.6 cm from its other side (W): the end lands on that
  // side 48 cm farther from the wedge's apex, where the wedge first reaches minEdge across; kerb(F)'s tip between —
  // narrower than minEdge, a sliver no vertex can bound — is band, so F's blocks stand within the fidelity bound of
  // kerb(F) there (49.0 cm), not attractCm
  { name: 'case (b) (unseeded NEAR #2, a-09 S14)', chords: chords([[11_816, 53, 1, [99, 7], 'square'], [13, 11_231, 11, null, 'square']]), face: 3, contact: [85, 442], within: BOUND },
  // Q58: seed 20261011 draw 8 897 (0-based), committed since a-09 S13, held
  { name: 'Q58: seed 20261011, draw 8 897', chords: chords([[521, 7967, 26, [274, 293], 'square'], [6, 4180, 10, [12, 26], 'round']]), face: -1, contact: [0, 0], within: 0 },
];

/** The L2 faces of a corridorUnion result inside the L1 face `f` that are blocks. */
function blocksIn(p: Plat, v: BandResult, f: number): LatticePoint[][] {
  return v.blocks.filter((b) => p.faces[2].parent[b] === f).flatMap((b) => ringsOf(p, 2, b));
}

describe('Q104 (N-63 (2)): the networks whose contact the placement fell back from now commit (the end rule W)', () => {
  for (const c of COMMITTED) {
    it(`${c.name}: corridorUnion commits — healthy, tiling, no spur, every closing by kerb(F)${c.face >= 0 ? `; F = ${String(c.face)}'s blocks within ${c.within === ATTRACT ? 'attractCm' : 'the fidelity bound'} of kerb(F)` : ''}`, () => {
      const n = network(c.chords);
      const ws = widthsOf(n.table);
      const read = c.face >= 0 ? readIn(n.p, 2, (o) => readKerb(o, c.face, ws)) : null;
      if (read !== null) expect(read.ok).toBe(true);
      const r = tx(n.p, spec(2, AT_S9), (o) => corridorUnion(o, n.faces, ws));
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      healthy(n.p);
      expect(tilesExactly(n.p, 2, n.faces)).toEqual([]);
      expect(spursOf(n.p, 2, n.faces)).toEqual([]);
      const kerbOf = (f: number) => {
        const k = readIn(n.p, 1, (o) => readKerb(o, f, ws));
        return k.ok ? k.value.kerb : null;
      };
      expect(closingsBeyond(bandClosings(n.p), kerbOf)).toEqual([]);
      if (read === null || !read.ok) return;
      // the contact: F's committed blocks within attractCm of kerb(F) as read (the end on F's boundary, the kerb's run
      // along it kept) — the Hausdorff distance of the outlines, sampled; case (b) within the fidelity bound (above)
      const h = hausdorffCm(read.value.kerb, blocksIn(n.p, r.value.value as BandResult, c.face));
      expect(h, `Hausdorff ${h.toFixed(2)} cm`).toBeLessThanOrEqual(c.within);
      expect(h, `Hausdorff ${h.toFixed(2)} cm`).toBeGreaterThan(c.within === ATTRACT ? 0 : ATTRACT);
    });
  }
});

// The end rule W's own landing keeps the end ON the edge it meets and replaces only a free spot (C-0432 (1);
// insertChain.ts `endLanding`'s `onEdge`, `stepTwoStrip`'s order): the nearest existing vertex within the bound counts
// there only where it lies on that piece's route, and the first reading's strip and nearest landings come before it.
// Round S12's own bands measure (`arr/bands/bfuzz.test.ts`, before = the round's features switched off) met two networks
// S11 committed and the rule as first built refused: (1) the widened family at PLAT_FUZZ_SEED 20261011 — with any vertex
// within the bound taken, a kerb part's end beside the dead end way:0's band landed on the antenna's tip vertex (400, 402),
// 67.6 cm off, and the dry-run kept a face too deep in the band (KEPT_DEEP; kerb and corridorUnion 7 / 7 → 8 / 8);
// (2) the chord family at PLAT_FUZZ_SEED 4 — with the edge landing first, the kerb piece (2 620, 4 000) → (22, 321) ended
// at (25, 347), 34.9 cm off, where the strip reading seats it on the frame at (0, 321), 22 cm off, and the next piece
// (0, 201) → (280, 4 000) found no route (corridorUnion insertChain 8 → 9). Each now commits as on S11.
describe('the end rule W stays on the edge it meets and replaces only a free spot (C-0432 (1))', () => {
  const WIDE: readonly WideWay[] = [
    { kind: 'dead', a: 9597, b: 10, x: 400, y: 402, w: 308, h: 833, hw: 205, knots: [154, 17], ends: 'round' },
    { kind: 'dead', a: 15_987, b: 10_211, x: 2341, y: 2983, w: 1043, h: 1596, hw: 23, knots: null, ends: 'round' },
    { kind: 'bent', a: 4587, b: 9183, x: 406, y: 402, w: 1596, h: 698, hw: 300, knots: null, ends: 'square' },
  ];
  it('the widened family\'s network at 20261011 (a dead end round (400, 402)): kerb(F) read on every face, corridorUnion commits — healthy, tiling, no spur, every closing by kerb(F)', () => {
    const n = wideNetwork(WIDE);
    const ws = widthsOf(n.table);
    const kerbOf = (f: number) => {
      const k = readIn(n.p, 1, (o) => readKerb(o, f, ws));
      return k.ok ? k.value.kerb : null;
    };
    for (const f of n.faces) {
      const k = readIn(n.p, 1, (o) => readKerb(o, f, ws));
      expect(k.ok, k.ok ? '' : `face ${String(f)}: ${k.code} ${k.detail}`).toBe(true);
    }
    const r = tx(n.p, spec(2, AT_S9), (o) => corridorUnion(o, n.faces, ws));
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    healthy(n.p);
    expect(tilesExactly(n.p, 2, n.faces)).toEqual([]);
    expect(spursOf(n.p, 2, n.faces)).toEqual([]);
    expect(closingsBeyond(bandClosings(n.p), kerbOf)).toEqual([]);
  });
  it('the chord family\'s network at seed 4: corridorUnion commits (the strip reading\'s seat of a kerb piece\'s end kept before the edge landing) — healthy, tiling, no spur, every closing by kerb(F)', () => {
    const n = network(chords([[9011, 49, 377, [143, 113], 'square'], [11_720, 13, 14, null, 'square'], [8810, 48, 150, [466, 207], 'round']]));
    const ws = widthsOf(n.table);
    const kerbOf = (f: number) => {
      const k = readIn(n.p, 1, (o) => readKerb(o, f, ws));
      return k.ok ? k.value.kerb : null;
    };
    const r = tx(n.p, spec(2, AT_S9), (o) => corridorUnion(o, n.faces, ws));
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    healthy(n.p);
    expect(tilesExactly(n.p, 2, n.faces)).toEqual([]);
    expect(spursOf(n.p, 2, n.faces)).toEqual([]);
    expect(closingsBeyond(bandClosings(n.p), kerbOf)).toEqual([]);
  });
});

/** Distance from q to the closed segment a–b. */
function segDist(q: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }): number {
  const l2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((q.x - a.x) * (b.x - a.x) + (q.y - a.y) * (b.y - a.y)) / l2));
  return Math.hypot(q.x - a.x - t * (b.x - a.x), q.y - a.y - t * (b.y - a.y));
}

/**
 * §3.6's placement and §3.10's clearance, written from their definitions: the lattice points within the fidelity bound
 * of `c` where a vertex could be seated on an edge of F's boundary (F's L1 ring edges) — within the hot pixel of the
 * edge's line, strictly inside it and at least minEdge from its two ends (ii), at least minEdge from every other live
 * vertex and from every live edge not incident to the edge's two ends (iii; the new vertex's one-ring) — and the live
 * vertices of F's boundary within the bound. Both empty: no insertion can end on F's boundary within the bound of c.
 */
function seatsNear(p: Plat, face: number, c: { x: number; y: number }): { seats: string[]; vertices: string[] } {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const verts: number[] = [];
  for (let v = 0; v < X.length; v += 1) if (isVertexLive(p, v)) verts.push(v);
  const edges: [number, number][] = [];
  for (let e = 0; 2 * e < O.length; e += 1) if (isHalfEdgeLive(p, 2 * e)) edges.push([O[2 * e], O[2 * e + 1]]);
  const at = (v: number) => ({ x: X[v], y: Y[v] });
  const rings = ringsOf(p, 1, face);
  const boundary: [{ x: number; y: number }, { x: number; y: number }][] = rings.flatMap((r) => r.map((a, i) => [a, r[(i + 1) % r.length]] as [LatticePoint, LatticePoint]));
  const vertexAt = (q: { x: number; y: number }) => verts.find((v) => X[v] === q.x && Y[v] === q.y) ?? -1;
  const seats: string[] = [];
  const R = Math.ceil(BOUND);
  for (const [a, b] of boundary) {
    const u = vertexAt(a);
    const w = vertexAt(b);
    for (let x = c.x - R; x <= c.x + R; x += 1) {
      for (let y = c.y - R; y <= c.y + R; y += 1) {
        const q = { x, y };
        if (Math.hypot(x - c.x, y - c.y) > BOUND) continue;
        const l2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
        const t = ((x - a.x) * (b.x - a.x) + (y - a.y) * (b.y - a.y)) / l2;
        if (t <= 0 || t >= 1) continue;
        if (Math.abs((b.x - a.x) * (y - a.y) - (b.y - a.y) * (x - a.x)) / Math.sqrt(l2) > HOT_PIXEL_CM) continue;
        if (Math.hypot(x - a.x, y - a.y) < MIN_EDGE || Math.hypot(x - b.x, y - b.y) < MIN_EDGE) continue;
        if (verts.some((v) => v !== u && v !== w && Math.hypot(X[v] - x, Y[v] - y) < MIN_EDGE)) continue;
        if (edges.some(([s, z]) => s !== u && s !== w && z !== u && z !== w && segDist(q, at(s), at(z)) < MIN_EDGE)) continue;
        seats.push(`${String(x)},${String(y)}`);
      }
    }
  }
  const vertices = rings.flat().filter((q) => Math.hypot(q.x - c.x, q.y - c.y) <= BOUND).map((q) => `${String(q.x)},${String(q.y)}`);
  return { seats, vertices };
}

interface Residual {
  readonly name: string;
  readonly chords: Chord[];
  readonly face: number;
  readonly contact: readonly [number, number];
  readonly refusal: string;
}

// Sub-class A (the kerb piece's first segment along the edge E it ends on: a-09 S14's case (a) and seed 4's draw 9 373)
// and sub-class B (a-09 S14's measurement seeds and this round's own, 22 seeds × 10⁴ networks, the arbitrary's draws,
// 1-based; C-0432's table: a way chord at 0.6 – 0.7° to a side of the frame, its centreline within minEdge of the frame
// over metres, met there by another way's kerb). The proof holds on the network as the op finds it.
const RESIDUAL: readonly Residual[] = [
  // sub-class A, a-09 S14 notes row 101 (a): the contact 13 cm off the frame on way:0's centreline, its first segment along it
  { name: 'case (a) (unseeded NEAR #2, a-09 S14)', chords: chords([[14_426, 56, 23, null, 'square'], [15_969, 7961, 227, null, 'square'], [14_544, 7980, 25, [76, 559], 'square']]), face: 3, contact: [13, 1218], refusal: 'outline: piece 0 of the face 3 cannot pin its contact at (13, 1218) within attractCm on the face\'s boundary (N-57 (2))' },
  // sub-class A, a-09 S14's measurement, seed 4 draw 9 373 (1-based): the contact 16 cm off the frame x = 4 000, its first segment along the centreline
  { name: 'seed 4, draw 9 373', chords: chords([[8063, 5360, 18, null, 'round'], [5531, 4, 12, [75, 238], 'round'], [1323, 8020, 289, [394, 165], 'round']]), face: 5, contact: [3984, 2017], refusal: 'outline: piece 0 of the face 5 cannot pin its contact at (3984, 2017) within attractCm on the face\'s boundary (N-57 (2))' },
  { name: 'seed 1, draw 8 419', chords: chords([[5852, 50, 64, null, 'round'], [12_517, 35, 22, null, 'round'], [13_486, 8034, 19, [415, 219], 'round']]), face: 1, contact: [20, 2116], refusal: 'outline: piece 0 of the face 1 cannot pin its contact at (20, 2116) within attractCm on the face\'s boundary (N-57 (2))' },
  { name: 'seed 3, draw 7 294', chords: chords([[4199, 127, 18, [231, 463], 'square'], [12_686, 39, 10, null, 'square'], [13_063, 7974, 5, [398, 78], 'square']]), face: 1, contact: [9, 2563], refusal: 'outline: piece 0 of the face 1 cannot pin its contact at (9, 2563) within attractCm on the face\'s boundary (N-57 (2))' },
  { name: 'seed 14, draw 8 616', chords: chords([[4900, 8035, 25, [13, 10], 'square'], [11, 7963, 7, [235, 356], 'square'], [3184, 5607, 349, null, 'round']]), face: 0, contact: [3988, 1933], refusal: 'outline: piece 0 of the face 0 cannot pin its contact at (3988, 1933) within attractCm on the face\'s boundary (N-57 (2))' },
];

describe('Q104\'s residual, sub-classes A and B (notBuilt #4, C-0432; REPORTED): no vertex can stand on F\'s boundary within the fidelity bound of the contact', () => {
  for (const c of RESIDUAL) {
    it(`${c.name}: no seat on F = ${String(c.face)}'s boundary within 2 · √2 · attractCm of the contact (${String(c.contact[0])}, ${String(c.contact[1])}) — corridorUnion refused N-57 (2), nothing written`, () => {
      const n = network(c.chords);
      expect(seatsNear(n.p, c.face, { x: c.contact[0], y: c.contact[1] })).toEqual({ seats: [], vertices: [] });
      const ws = widthsOf(n.table);
      const b0 = state(n.p);
      const r = tx(n.p, spec(2, AT_S9), (o) => corridorUnion(o, n.faces, ws));
      expect(r.ok).toBe(false);
      if (r.ok) return;
      expect([r.code, r.detail]).toEqual(['E_INVARIANT', c.refusal]);
      expect(state(n.p)).toBe(b0);
    });
  }

  // Q58's partner (seed 20261011 draw 1 524, 0-based): kerb(F)'s dry-run lays a part from (3 044, 3 977) on way:0's
  // centreline, 22.5 cm below the frame y = 4 000 — the same class at the kerb's read (UNLAID_DEEP, insertChain's 'no
  // route'): no seat on F's boundary within the bound of that point.
  it('Q58\'s partner, seed 20261011 draw 1 524: no seat on F = 1\'s boundary within the bound of (3 044, 3 977) — kerb(F) refused UNLAID_DEEP, nothing written', () => {
    const n = network(chords([[10_550, 7964, 3, [75, 14], 'square'], [9525, 7966, 595, [580, 270], 'square'], [14_872, 8030, 26, [549, 567], 'square']]));
    expect(seatsNear(n.p, 1, { x: 3044, y: 3977 })).toEqual({ seats: [], vertices: [] });
    const ws = widthsOf(n.table);
    const b0 = state(n.p);
    const k = readIn(n.p, 1, (o) => readKerb(o, 1, ws));
    expect(k.ok).toBe(false);
    if (!k.ok) expect(k.detail).toBe(UNLAID_DEEP);
    expect(state(n.p)).toBe(b0);
  });

  // The control: on case (b) a seat exists (W: `endLanding` takes it), so the proof does not find none everywhere.
  it('the control: case (b) has a seat within the bound (committed by W)', () => {
    const b = network(COMMITTED[0].chords);
    expect(seatsNear(b.p, 3, { x: 85, y: 442 }).seats.length).toBeGreaterThan(0);
  });
});

// The end rule never refuses what the in-bound passes committed before (C-0432 (1)): a third or fourth pass it led to a
// refusal is run again without it, as before round S12. The census's first run on this round (31 seeds × 10⁴) met
// two such chains before the retry existed — the end landed on the edge it meets, whose route then kept nothing in bound
// — both lawful, both committed on S11's engine; each is pinned committed exactly as S11 committed it.
describe('the end rule\'s retry (C-0432 (1)): a pass it led to a refusal runs again as before', () => {
  it('fidelity property, seed −6421, generator seed 697 907 617: the fifth two-point chain (1 717, 1 785) → (1 728, 1 857) commits as on S11 — its end at (1 733, 1 853), W_PLACED', () => {
    const rnd = generator(697_907_617);
    const p = framed(4000);
    const level = intIn(rnd, 0, 2) as Level;
    const at = (): [number, number] => [intIn(rnd, 1400, 2600), intIn(rnd, 1400, 2600)];
    const k = intIn(rnd, 2, 8);
    const cs: [number, number][][] = [];
    for (let i = 0; i < k; i++) cs.push([at(), at()]);
    for (let i = 0; i < 4; i++) expect(ins(insTx(p, level), cs[i], [{ role: 'invisible', entity: `arr:s${String(i)}` }]).ok).toBe(true);
    expect(cs[4]).toEqual([[1717, 1785], [1728, 1857]]);
    const r = ins(insTx(p, level), cs[4], [{ role: 'invisible', entity: 'arr:s4' }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(r.value.placed.map((v) => `${String(p.vertices.x[v])},${String(p.vertices.y[v])}`)).toEqual(['1700,1800', '1733,1853']);
    expect(r.warnings).toEqual([{ code: 'W_ATTRACTED', count: 2, at: { x: 1717, y: 1785 } }, { code: 'W_PLACED', count: 1, at: { x: 1733, y: 1853 } }]);
    expect(allProblems(p)).toEqual([]);
  });

  it('constructive property, seed 6521, generator seed 470 462 672: step 3\'s optional endpoint chain (2 462, 3 944) → (2 878, 337) commits as on S11 — its first point at (2 462, 3 924), W_PLACED', () => {
    const rnd = generator(470_462_672);
    const p = framed(4000);
    const steps = intIn(rnd, 1, 8);
    let level = intIn(rnd, 0, 2) as Level;
    for (let s = 0; s < Math.min(steps, 4); s++) {
      if (rnd() < 0.3 && level < 4) level = (level + 1) as Level;
      const lv = rnd() < 0.1 ? (intIn(rnd, 0, 4) as Level) : level;
      const g = genChain(p, rnd, 4000, lv);
      const r = ins(insTx(p, lv), g.points, [{ role: 'way', entity: `way:${String(s)}` }], g.cls, { closed: g.closed, ...(g.pinned === undefined ? {} : { pinned: g.pinned }) });
      if (s < 3) continue;
      expect([g.kind, g.cls, g.points.map(([x, y]) => [Math.round(x), Math.round(y)])]).toEqual(['endpoint', 'optional', [[2462, 3944], [2878, 337]]]);
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(r.value.placed.map((v) => `${String(p.vertices.x[v])},${String(p.vertices.y[v])}`)).toEqual(['2462,3924', '2878,337']);
      expect(r.warnings).toEqual([{ code: 'W_PLACED', count: 1, at: { x: 2462, y: 3924 } }, { code: 'W_ATTRACTED', count: 1, at: { x: 2462, y: 3944 } }]);
      expect(allProblems(p)).toEqual([]);
    }
  });
});

// The end rule A withdrawn (C-0432 (1)): census run 3 on the round's engine with it met, at PLAT_FUZZ_SEED 7307 (the
// constructive property, fast-check path 2026), the generator seed 1 102 909 027 — its fifth chain, a mandatory collinear
// L4 chain (3 265, 30) → (3 431, 30) → (2 006, 2 232), had its first point absorbed into its second's landing on the frame at
// (3 431, 30), 166 cm off, beyond the fidelity bound: the route vertices (3 431, 30) and (3 414, 57) beyond 73.54 cm of
// every segment, the first segment 139.8 cm from its route — a silently wrong commit (bfuzz's fidelity judge). Without the
// rule the chain commits as on S11, within the bound, its first point at (3 265, 75), W_PLACED.
describe('the end rule A withdrawn (C-0432 (1)): an end is never moved beyond the fidelity bound', () => {
  it('constructive property, seed 7307, generator seed 1 102 909 027: the mandatory collinear chain way:4 commits within the bound — its first point at (3 265, 75), W_PLACED', () => {
    const rnd = generator(1_102_909_027);
    const p = framed(4000);
    const steps = intIn(rnd, 1, 8);
    let level = intIn(rnd, 0, 2) as Level;
    for (let s = 0; s < Math.min(steps, 5); s++) {
      if (rnd() < 0.3 && level < 4) level = (level + 1) as Level;
      const lv = rnd() < 0.1 ? (intIn(rnd, 0, 4) as Level) : level;
      const g = genChain(p, rnd, 4000, lv);
      const opts = { closed: g.closed, ...(g.pinned === undefined ? {} : { pinned: g.pinned }) };
      const r = ins(insTx(p, lv), g.points, [{ role: 'way', entity: `way:${String(s)}` }], g.cls, opts);
      if (s < 4) continue;
      expect([lv, g.kind, g.cls, g.points.map(([x, y]) => [Math.round(x), Math.round(y)])]).toEqual([4, 'collinear', 'mandatory', [[3265, 30], [3431, 30], [2006, 2232]]]);
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(r.value.placed.map((v) => `${String(p.vertices.x[v])},${String(p.vertices.y[v])}`)).toEqual(['3265,75', '3431,30', '2006,2232']);
      expect(r.warnings).toEqual([{ code: 'W_PLACED', count: 1, at: { x: 3265, y: 75 } }, { code: 'W_ATTRACTED', count: 1, at: { x: 3265, y: 30 } }]);
      expect(fidelityProblems(p, lv, g.cls, g.points, opts, r.value.placed, 'way:4')).toEqual([]);
      expect(allProblems(p)).toEqual([]);
    }
  });
});
