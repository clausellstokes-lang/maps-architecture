// J318 (the session's reading of §3.7, M0-a-09 session fix round S6; C-0380): a corridor is a reservation, and a block
// never overlaps one — the spines kerb(F) subtracts are every (role, entity) chain INCIDENT to F, on a route edge of F's
// boundary AND through a route vertex of it (a vertex-only contact), whose buffer meets F. The class-B defect of
// M0-c-06's 50-seed CITY smoke: two narrow ways leave one vertex of a wide arterial on the same side, the L1 face
// between them touches the arterial at that ONE vertex only, so kerb(F) kept the corner where the two lanes' inner
// edges meet — inside the arterial's band — and S9 committed it (fusion 33 block:58dw3agfevyfv, 142 cm inside way:11's
// 500 cm band). The reading, written here from the design's corridor statement and never from c-06's measure: every
// vertex of a block ring stands at least its way's half-width from the centreline of every way incident to the face
// (on its edges or through its vertices; a vertex on the band's edge within the lattice's rounding).
//
// The pins: (1) a hand-built face touching a wide way at one vertex, two narrow lanes leaving that vertex as its
// boundary — kerb(F)'s corner clipped by the wide way's band (the clip on the band's edge, 500 cm from the centreline;
// before, the inner edges' meet 288 cm inside the band), and corridorUnion's block that kerb (S8 ≡ S9, §13.2); its
// mirror, where the wide way's band does not reach kerb(F) (wider lanes): nothing changes; (2) the fusion fixture's
// class-B faces (CITY seeds 3, 33, 44), read after S8 by build/M0-a-09-fix-s6 (vertexcontact-faces.json): before — the
// kerb without the vertex-only way — inside its band; after, kerb(F) and the committed block clear of every incident
// way's band. (3) J264 (C-0381): where the one overlay of F's rings and every spine's parts finds no route, the staged
// read — the edge spines' kerb less the vertex-only spines' parts — gives the same region (B-FUZZ seed 1012 network
// 1855 and seed 20261011 network 2182, refused by the one overlay after J318's census and committed before it) —
// accepted where no vertex reaches into a vertex-only band deeper than an overlay moves a boundary point (§3.7's
// attracted cases: √2 · attractCm, plus the chords; `clearOf`). (4) C-0380 (2)'s two census promises (round S7, the
// S6 closing check's blockers Z3 and Z5): where the edge spines' kerb itself refuses, no vertex-only spine is added and
// the read refuses as before — never ok([]) and a `wholeBand` commit (B-FUZZ seed 20261011 draws 1000 and 4776); and
// the reach test reads a segment's LARGER end half-width, so a profile band reaching kerb(F) only by its wider end is
// subtracted (B-FUZZ seed 1012 draw 4102 face 0).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { clearOf, DRY_MOVE_CM, kerb, kerbParts, readFace, readKerb, UNLAID_DEEP, type KerbRead, type Spine } from '../../../src/arr/kerb.js';
import { canonicalRing, compareRings, overlayRegion, type Ring } from '../../../src/arr/winding.js';
import { ok, type KernelResult } from '../../../src/num/index.js';
import { LATTICE } from '../../../src/num/index.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandUnion, type BandResult } from '../../../src/arr/bandUnion.js';
import { SAGITTA_CM } from '../../../src/arr/buffer.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { ins, tx as shell, emptyArena } from '../../insert/step3-5/support.js';
import { setOwner, tx as txn } from '../../../src/tx/index.js';
import { AT_S9, commit, framed, hausdorffCm, healthy, network, normals, own, profile, pt, readIn, ringsOf, spec, state, tilesExactly, way, widthsOf, type Chord, shifted } from './support.js';

type XY = { readonly x: number; readonly y: number };

/** The distance from q to the polyline (cm, doubles). */
function distToLine(q: XY, line: readonly XY[]): number {
  let d = Infinity;
  for (let i = 0; i + 1 < line.length; i += 1) {
    const a = line[i];
    const b = line[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const l2 = dx * dx + dy * dy;
    const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / l2));
    d = Math.min(d, Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy));
  }
  return d;
}

/**
 * How deep the rings reach into a way's band (cm): its half-width less the least distance of any ring vertex from its
 * centreline — > 0 inside the band, ≤ 0 clear of it (the design's corridor statement read at the vertices).
 */
function depthIn(rings: readonly (readonly XY[])[], line: readonly XY[], hw: number): number {
  let d = Infinity;
  for (const r of rings) for (const q of r) d = Math.min(d, distToLine(q, line));
  return hw - d;
}

/**
 * A vertex on a band's edge (cm): a round join's or end's arc is chords within `SAGITTA_CM` of it (M0-a-08), so a kerb
 * vertex where a chord meets another band's edge stands up to the sagitta inside the arc's circle — plus the lattice's
 * rounding (the hot pixel, under 1 cm).
 */
const ON_EDGE_CM = SAGITTA_CM + 1;

/** kerb(F) read in a batch of `level` that writes nothing (the read-only service on the open overlay). */
function kerbIn(p: Plat, face: number, widths: ReturnType<typeof widthsOf>): LatticePoint[][] {
  let out: ReturnType<typeof kerb> | null = null;
  commit(p, 1, (o) => {
    out = kerb(o, face, widths);
    return { ok: true, value: null, warnings: [] };
  });
  const k = out as unknown as ReturnType<typeof kerb>;
  expect(k.ok).toBe(true);
  return k.ok ? k.value.map((r) => r.slice()) : [];
}

/**
 * kerb(F) as the scratch overlay read it before round S9 (F's route rings one operand, every part of `spines` the other,
 * on a fresh arrangement: M0-a-08's `overlayRegion`, kept where F is inside and no part is) — the one overlay these pins
 * name as history (C-0381); kerb.ts reads the dry-run on the real arena now (C-0417), so this is the test's own replay.
 */
function scratchKerb(rings: LatticePoint[][], spines: ReadonlyMap<string, Spine>): KernelResult<Ring[]> {
  const own = (): KernelResult<Ring[]> => ok([canonicalRing(rings[0]), ...rings.slice(1).map(canonicalRing).sort(compareRings)]);
  if (spines.size === 0) return own();
  const pr = kerbParts(rings, spines);
  if (!pr.ok) return pr;
  if (pr.value.length === 0) return own();
  return overlayRegion([rings, pr.value], (w) => w[0] !== 0 && w[1] === 0);
}

/** The read (in an L1 batch) and the census's staged parts: the edge spines' kerb (`base`) and the vertex-only spines it added. */
function stagedRead(p: Plat, face: number, widths: ReturnType<typeof widthsOf>): { read: KerbRead; base: Ring[]; through: Spine[] } {
  const f = readFace(p, face, widths);
  const r = readIn(p, 1, (o) => readKerb(o, face, widths));
  expect(r.ok).toBe(true);
  const read = (r as { value: KerbRead }).value;
  const reaching = new Set(read.census?.reaching ?? []);
  const base = read.census?.base;
  return { read, base: base !== undefined && base.ok ? base.value : [], through: f.through.filter((s) => reaching.has(s.key)) };
}

/** The spines F's read subtracts (the edge spines and the vertex-only spines its census added; read in an L1 batch). */
function censusSpines(p: Plat, face: number, widths: ReturnType<typeof widthsOf>): ReadonlyMap<string, Spine> {
  return stagedRead(p, face, widths).read.spines;
}

/**
 * The hand-built T: the wide way W straight along y = 1000 across the frame; two lanes leaving its vertex J = (2000,
 * 1000) on the same side — A to (4000, 3000), B to (0, 3000) — so the face F between them (above J, up to the frame's
 * top) touches W at J only. W's half-width 500 cm; the lanes' `lane` cm.
 */
function tee(lane: number): { p: Plat; f: number; all: ReturnType<typeof widthsOf>; lanesOnly: ReturnType<typeof widthsOf>; W: XY[] } {
  const p = framed();
  way(p, 'way:w', [[0, 1000], [2000, 1000], [4000, 1000]]);
  way(p, 'way:a', [[2000, 1000], [4000, 3000]]);
  way(p, 'way:b', [[2000, 1000], [0, 3000]]);
  const [f] = own(p, 'district:1', [[2000, 3500]]);
  return {
    p,
    f,
    all: widthsOf({ 'way:w': 500, 'way:a': lane, 'way:b': lane }),
    lanesOnly: widthsOf({ 'way:a': lane, 'way:b': lane }),
    W: [{ x: 0, y: 1000 }, { x: 4000, y: 1000 }],
  };
}

describe('J318: kerb(F) subtracts every spine incident to F, through a route vertex of it as on a route edge', () => {
  it('a face touching a wide way at one vertex, two narrow lanes leaving it: the corner clipped on the wide band’s edge; corridorUnion commits that kerb', () => {
    const { p, f, all, lanesOnly, W } = tee(150);
    // the census: W bounds no route edge of F, so it is no edge's spine — it is F's spine through J
    const read = readFace(p, f, all);
    expect(read.edges.flat().some((e) => e.spines.includes('way:way:w'))).toBe(false);
    expect([...censusSpines(p, f, all).keys()].sort()).toEqual(['way:way:a', 'way:way:b', 'way:way:w']);
    // before (the band set without the vertex-only contact): the lanes' inner edges meet at (2000, 1000 + 150·√2),
    // 212 cm from W's centreline — 288 cm inside its 500 cm band
    const before = kerbIn(p, f, lanesOnly);
    expect(depthIn(before, W, 500)).toBeGreaterThan(287);
    expect(depthIn(before, W, 500)).toBeLessThan(289);
    // after: clear of W's band, the clip on its edge — the two points where the inner edges reach y = 1500
    // (x = 2000 ∓ (500 − 150·√2) = 1712.13 / 2287.87), each within the lattice's rounding of 500 cm from W
    const after = kerbIn(p, f, all);
    expect(depthIn(after, W, 500)).toBeLessThanOrEqual(ON_EDGE_CM);
    const onEdge = after.flat().filter((q) => Math.abs(distToLine(q, W) - 500) <= ON_EDGE_CM);
    expect(onEdge.map((q) => `${String(q.x)},${String(q.y)}`).sort()).toEqual(['1712,1500', '2288,1500']);
    // and nothing else changed: kerb(F) is the lanes-only kerb with its corner (the inner edges' meet) cut off there
    expect(before.length).toBe(1);
    const corner = before[0].reduce((a, q) => (Math.hypot(q.x - 2000, q.y - 1000) < Math.hypot(a.x - 2000, a.y - 1000) ? q : a));
    expect(Math.hypot(corner.x - 2000, corner.y - 1000)).toBeLessThan(213);
    const clipped = before[0].slice();
    clipped.splice(clipped.indexOf(corner), 1, pt(1712, 1500), pt(2288, 1500));
    expect(normals(after)).toEqual(normals([clipped]));
    // S9 commits it (§13.2's S8 ≡ S9: the one function), the block clear of W's band
    const r = commit(p, 2, (o) => corridorUnion(o, [f], all), AT_S9);
    healthy(p);
    expect(tilesExactly(p, 2, [f])).toEqual([]);
    const v = r.value as BandResult;
    expect(v.blocks.length).toBe(1);
    const block = ringsOf(p, 2, v.blocks[0]);
    expect(normals(block)).toEqual(normals(after));
    expect(depthIn(block, W, 500)).toBeLessThanOrEqual(ON_EDGE_CM);
  });

  for (const [lane, short] of [[400, 66], [370, 23]] as const) {
    it(`the mirror: a vertex-only contact whose band stops ${String(short)} cm short of kerb(F) (lanes ${String(lane)} cm) is left out — nothing changes`, () => {
      // the inner edges meet at (2000, 1000 + lane·√2), beyond W's 500 cm band — at 370 cm by 23 cm, within attractCm:
      // W is left out of F's spines (C-0380's reach test); where such a band is read, the overlay can attract its
      // vertices onto the kerb (the fusion 33 fixture below: way:fg57keftp9vga, 16 cm short, bends kerb(F) when read)
      const { p, f, all, lanesOnly, W } = tee(lane);
      const without = kerbIn(p, f, lanesOnly);
      // (the kerb's corner a lattice point: within 2 cm of the meet)
      expect(Math.abs(-depthIn(without, W, 500) - short)).toBeLessThanOrEqual(2);
      expect(censusSpines(p, f, all).has('way:way:w')).toBe(false);
      const withW = kerbIn(p, f, all);
      expect(normals(withW)).toEqual(normals(without));
      const r = commit(p, 2, (o) => corridorUnion(o, [f], all), AT_S9);
      healthy(p);
      const v = r.value as BandResult;
      expect(v.blocks.flatMap((b) => normals(ringsOf(p, 2, b))).sort()).toEqual(normals(without));
    });
  }

  it('a square end ON F’s spine — a T-junction — takes no cap (round S15’s start-cap rule): its corner no longer reaches F; the census still reads the square cap’s reach (a superset of the band)', () => {
    // S along y = 1000 (half-width 300), F above it; W arrives from below at 45° and ends on S at J = (2000, 1000),
    // declared square (half-width 250). Before round S15 its square cap's far corner stood 250·√2 = 354 cm above J — 54 cm
    // into kerb(F) — and was clipped; an end on another chain's line (S passes through J) is no free end: the strip stops
    // on the line through J square to W, its corners (1823, 1177) and (2177, 823) within S's band, so kerb(F) is S's
    const p = framed();
    way(p, 'way:s', [[0, 1000], [2000, 1000], [4000, 1000]]);
    way(p, 'way:w', [[1000, 0], [2000, 1000]]);
    const [f] = own(p, 'district:1', [[2000, 3000]]);
    const ws = widthsOf({ 'way:s': 300, 'way:w': { halfWidthCm: 250, ends: 'square' } });
    const sOnly = widthsOf({ 'way:s': 300 });
    // the reach test reads the square cap (1.5 half-widths at an open run's end): W is still F's spine by the census
    expect(censusSpines(p, f, ws).has('way:way:w')).toBe(true);
    const w = censusSpines(p, f, ws).get('way:way:w') as Spine;
    expect(w.lines.map((l) => l.junction)).toEqual([[false, true]]);
    // kerb(F) is S's kerb: (2000, 1340), inside the old cap, is kerb; every vertex at least 300 cm above S's centreline
    const after = kerbIn(p, f, ws);
    expect(normals(after)).toEqual(normals(kerbIn(p, f, sOnly)));
    expect(after.flat().every((v) => v.y >= 1300)).toBe(true);
    const r = commit(p, 2, (o) => corridorUnion(o, [f], ws), AT_S9);
    healthy(p);
    expect(normals((r.value as BandResult).blocks.flatMap((b) => ringsOf(p, 2, b)))).toEqual(normals(after));
  });

  it('bandUnion’s per-side parts read the chain’s edge faces only (C-0380): a face touching the chain at a vertex holds no part of it', () => {
    const { p, f } = tee(150);
    // the band of W alone (half-width 500) over every L1 face: F touches W at J only
    const faces: number[] = [];
    for (let g = 0; g < p.slots.face[1].top; g += 1) if (p.faces[1].kind[g] !== 0xffff) faces.push(g);
    commit(p, 1, (o) => setOwner(o, faces.filter((g) => g !== f), 'district:2'));
    const r = commit(p, 2, (o) => bandUnion(o, [{ ref: { role: 'way', entity: 'way:w' }, halfWidthCm: 500, ends: 'round' }], faces, 'band', 'band:1'));
    healthy(p);
    const v = r.value as BandResult;
    // F is left whole — its own child at L2, one built block — while the faces along W hold its parts
    expect(v.whole).toContain(f);
    expect(v.band.length).toBeGreaterThan(0);
    expect(v.band.every((b) => p.faces[2].parent[b] !== f)).toBe(true);
  });

  it('a way through a vertex of F that declares no half-width adds nothing (the census keys a spine by its declaration)', () => {
    const { p, f, lanesOnly } = tee(150);
    const read = readFace(p, f, lanesOnly);
    expect([...read.spines.keys()].sort()).toEqual(['way:way:a', 'way:way:b']);
  });

  it('the vertex census reads the route (§2.2 rule 3): a finer chain leaving a finer vertex on F’s boundary adds nothing', () => {
    const { p, f } = tee(150);
    const ws = widthsOf({ 'way:w': 500, 'way:a': 150, 'way:b': 150, 'way:fine': 400 });
    const k0 = normals(kerbIn(p, f, ws));
    // an L2 chain from a point on lane A into F: a finer vertex on F's boundary, a level-2 edge leaving it (declared
    // 400 cm wide: were it read, kerb(F) would lose a 400 cm band round it)
    commit(p, 2, (o) => insertChain(o, [pt(3000, 2000), pt(3000, 2500)], [{ role: 'way', entity: 'way:fine' }], 'mandatory'));
    expect(normals(kerbIn(p, f, ws))).toEqual(k0);
  });
});

/** A class-B face of the fusion fixture (vertexcontact-faces.json; see the module comment). */
interface Fixture {
  readonly seed: number;
  readonly face: number;
  readonly block: string;
  readonly owner: string;
  /** A point inside the block (its seed). */
  readonly at: [number, number];
  /** The way F touches at one route vertex only, that vertex, and how deep the pre-J318 kerb reached into its band. */
  readonly vertexOnly: { readonly role: string; readonly entity: string; readonly at: [number, number]; readonly depthBeforeCm: number };
  /** F's L1 route ring as the derivation left it after S8. */
  readonly ring: [number, number][];
  /** Every L1 chain with an edge within 30 m of F's box: its route there and its declared half-width (null: none). */
  readonly chains: { readonly role: string; readonly entity: string; readonly hw: number | null; readonly points: [number, number][] }[];
  /** kerb(F) as the pre-J318 census read it there, and as J318's reads it. */
  readonly kerbBefore: [number, number][][];
  readonly kerbAfter: [number, number][][];
}

const FIXTURES = (JSON.parse(readFileSync(new URL('./vertexcontact-faces.json', import.meta.url), 'utf8')) as { faces: Fixture[] }).faces;

/** One run of a fixture chain as the rebuilt arena holds it: a chain's second and later runs (the route cut by the box) its own entity. */
interface Run {
  readonly role: string;
  /** The entity the run was inserted as: the chain's, or `<entity>-<k>` for its k-th further run. */
  readonly entity: string;
  /** The chain's entity. */
  readonly of: string;
  readonly hw: number | null;
  readonly points: XY[];
}

/** The arterials first (§4.1's order: S4's ways before S5's streets and S8's lanes), then every other chain in key order. */
function order(fx: Fixture): Fixture['chains'] {
  const rank = (c: Fixture['chains'][number]): number => (c.role !== 'way' ? 0 : c.entity.length <= 7 ? 1 : 2);
  return fx.chains.slice().sort((a, b) => rank(a) - rank(b) || (a.entity < b.entity ? -1 : a.entity > b.entity ? 1 : 0));
}

/** The fixture's arena: a margin ring round it at L0, then its chains' runs at L1; F the face holding the block's seed. */
function build(fx: Fixture): { p: Plat; face: number; runs: Run[]; widths: ReturnType<typeof widthsOf>; without: ReturnType<typeof widthsOf> } {
  const all = [...fx.ring, ...fx.chains.flatMap((c) => c.points)];
  const x0 = Math.min(...all.map((q) => q[0])) - 3000;
  const y0 = Math.min(...all.map((q) => q[1])) - 3000;
  const x1 = Math.max(...all.map((q) => q[0])) + 3000;
  const y1 = Math.max(...all.map((q) => q[1])) + 3000;
  const p = emptyArena();
  const m = ins(shell(p, 0), [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true });
  if (!m.ok) throw new Error(`the margin ring was refused: ${m.code}`);
  const table: Record<string, number> = {};
  const seen = new Map<string, number>();
  const runs: Run[] = [];
  for (const c of order(fx)) {
    const k = seen.get(`${c.role}:${c.entity}`) ?? 0;
    seen.set(`${c.role}:${c.entity}`, k + 1);
    const entity = k === 0 ? c.entity : `${c.entity}-${String(k)}`;
    commit(p, 1, (o) => insertChain(o, c.points.map((q) => pt(q[0], q[1])), [{ role: c.role, entity }], 'mandatory'));
    if (c.role === 'way' && c.hw !== null) table[entity] = c.hw;
    runs.push({ role: c.role, entity, of: c.entity, hw: c.hw, points: c.points.map(([x, y]) => ({ x, y })) });
  }
  const [face] = own(p, fx.owner, [fx.at]);
  const rest: Record<string, number> = {};
  for (const r of runs) if (r.role === 'way' && r.hw !== null && r.of !== fx.vertexOnly.entity) rest[r.entity] = r.hw;
  return { p, face, runs, widths: widthsOf(table), without: widthsOf(rest) };
}

const pairsOf = (rs: readonly (readonly LatticePoint[])[]): [number, number][][] => rs.map((r) => r.map((q): [number, number] => [q.x, q.y]));

/** How deep the rings reach into the bands of every way with a declared half-width that does not bound F (cm, the deepest). */
function deepestOffF(runs: readonly Run[], bounding: ReadonlySet<string>, rings: readonly (readonly XY[])[]): { way: string; depth: number } {
  let worst = { way: '', depth: -Infinity };
  for (const r of runs) {
    if (r.role !== 'way' || r.hw === null || bounding.has(`way:${r.entity}`)) continue;
    const d = depthIn(rings, r.points, r.hw);
    if (d > worst.depth) worst = { way: r.entity, depth: d };
  }
  return worst;
}

/**
 * Round S9's declared shift of the fusion fixture's kerbs (C-0417; the choices row): kerb(F) read by the dry-run on the
 * real arena, where the strips are cut at F's own L1 edges (the attractor: level 1, distance 0 — the vertices on F's edges
 * below are placed on them by the insertion; the corners inside F the strips' meetings beside those cuts, 1–8 cm). The
 * smoke's records (vertexcontact-faces.json) stay as read before the round; the depth before is the shifted kerb's.
 */
const S9_SHIFT: Record<number, { before: [[number, number], [number, number] | null][]; after: [[number, number], [number, number] | null][]; depthBeforeCm: number }> = {
  // the corner where way:3's strip meets way:2's (8 cm); after: (−1483, −76158) on F's L1 edge (−970, −76050)–(−1405, −76295),
  // and (−1601, −75786) held straight through by the dry-run's region (dropped)
  3: { before: [[[-1234, -76010], [-1227, -76014]]], after: [[[-1483, -76158], [-1482, -76158]], [[-1601, -75786], null]], depthBeforeCm: 294.07 },
  // the corner where two strips meet beside F's L1 edge (83013, −23567)–(83445, −23070) (6 cm)
  33: { before: [[[83180, -23209], [83184, -23204]]], after: [], depthBeforeCm: 135.98 },
  // (2339, 2855) and (2149, 2885) on F's L1 edge (2503, 2829)–(1986, 2910); after: the strips' corner beside it (1 cm)
  // round S15 (the start-cap rule, `junctionEnd`): (2149, 2885) in the before read and (2165, 3042) in the after read stand
  // where the record has them, 1 cm from round S9's (a lane starting on F's L1 edge there takes no cap now, so the
  // strips' corners beside it are attracted no more); way:8 itself ends where another way ends — a continuation, its
  // round cap kept — so J318's class-B reading of the face stands
  44: { before: [[[2339, 2855], [2338, 2855]]], after: [], depthBeforeCm: 232.96 },
};

describe('J318 on the fusion fixture (CITY seeds 3, 33, 44 of M0-c-06’s smoke; class B): a block never overlaps a corridor', () => {
  for (const fx of FIXTURES) {
    it(`fusion ${String(fx.seed)} ${fx.block}: F touches ${fx.vertexOnly.entity} at (${String(fx.vertexOnly.at[0])}, ${String(fx.vertexOnly.at[1])}) only — inside its band before, kerb(F) and S9's block clear of every way's band after`, () => {
      const { p, face, runs, widths, without } = build(fx);
      const read = readFace(p, face, widths);
      // the fixture is the smoke's face: its route ring as the derivation left it
      expect(pairsOf(read.rings.slice(0, 1))).toEqual([fx.ring]);
      const bounding = new Set(read.edges.flat().flatMap((e) => e.spines));
      const vo = `way:${fx.vertexOnly.entity}`;
      expect(bounding.has(vo)).toBe(false);
      expect(censusSpines(p, face, widths).has(vo)).toBe(true);
      const voRuns = runs.filter((r) => r.role === 'way' && r.of === fx.vertexOnly.entity);
      const depth = (rings: readonly (readonly XY[])[]): number => Math.max(...voRuns.map((r) => depthIn(rings, r.points, r.hw as number)));
      // before (the band set without the vertex-only contact — exactly the pre-J318 census, which never read it; F's
      // other vertex-only contacts reach no kerb and are left out, C-0380): the kerb's corner inside the way's band
      // (round S9, C-0417: the smoke's record with the declared shift, `S9_SHIFT`)
      const sh = S9_SHIFT[fx.seed];
      const before = kerbIn(p, face, without);
      expect(pairsOf(before)).toEqual(shifted(fx.kerbBefore, sh.before));
      expect(depth(before)).toBeGreaterThan(100);
      expect(Math.abs(depth(before) - sh.depthBeforeCm)).toBeLessThan(0.01);
      // after: kerb(F) clear of the band of every way that does not bound F, the vertex-only way's among them (its band
      // also read by the start-cap rule, round S15: an end on another chain's line takes no cap, `depthInSpine`)
      const after = kerbIn(p, face, widths);
      const voSpine = censusSpines(p, face, widths).get(vo) as Spine;
      expect(pairsOf(after)).toEqual(shifted(fx.kerbAfter, sh.after));
      expect(depth(after)).toBeLessThanOrEqual(ON_EDGE_CM);
      expect(deepestOffF(runs, bounding, after).depth).toBeLessThanOrEqual(ON_EDGE_CM);
      expect(depthInSpine(after, voSpine)).toBeLessThanOrEqual(ON_EDGE_CM);
      // S9 commits that kerb (S8 ≡ S9, §13.2), its block clear of every such band
      const r = commit(p, 2, (o) => corridorUnion(o, [face], widths), AT_S9);
      healthy(p);
      expect(tilesExactly(p, 2, [face])).toEqual([]);
      const v = r.value as BandResult;
      const blocks = v.blocks.flatMap((b) => ringsOf(p, 2, b));
      expect(normals(blocks)).toEqual(normals(after));
      expect(deepestOffF(runs, bounding, blocks).depth).toBeLessThanOrEqual(ON_EDGE_CM);
      expect(depthInSpine(blocks, voSpine)).toBeLessThanOrEqual(ON_EDGE_CM);
    });
  }
});

/**
 * How deep the rings reach into a spine's buffer at their vertices (cm): its half-width there, interpolated along each
 * segment, less the distance — and at a JUNCTION end (round S15's start-cap rule: an end on another chain's line takes no
 * cap, the band stops on the line through the end square to its last segment) no deeper than the vertex stands behind that
 * line, in the end's reach (written from the rule's definition).
 */
function depthInSpine(rings: readonly (readonly XY[])[], s: Spine): number {
  let worst = -Infinity;
  for (const line of s.lines) {
    const n = line.points.length;
    const segs = line.closed ? n : n - 1;
    const ends: { e: XY; ux: number; uy: number; r: number }[] = [];
    if (!line.closed && n >= 2) {
      for (const [at, from, j] of [[0, 1, 0], [n - 1, n - 2, 1]] as const) {
        if (!line.junction[j]) continue;
        const e = line.points[at];
        const o = line.points[from];
        const l = Math.hypot(e.x - o.x, e.y - o.y);
        if (l > 0) ends.push({ e, ux: (e.x - o.x) / l, uy: (e.y - o.y) / l, r: 1.5 * line.hw[at] });
      }
    }
    for (const r of rings) {
      for (const q of r) {
        let depth = -Infinity;
        for (let k = 0; k < segs; k += 1) {
          const a = line.points[k];
          const b = line.points[(k + 1) % n];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const l2 = dx * dx + dy * dy;
          const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / l2));
          const hw = line.hw[k] + t * (line.hw[(k + 1) % n] - line.hw[k]);
          depth = Math.max(depth, hw - Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy));
        }
        for (const c of ends) if (Math.hypot(q.x - c.e.x, q.y - c.e.y) <= c.r) depth = Math.min(depth, -((q.x - c.e.x) * c.ux + (q.y - c.e.y) * c.uy));
        worst = Math.max(worst, depth);
      }
    }
  }
  return worst;
}

/** Is q inside or on the rings (non-zero winding; on an edge counts as inside)? */
function insideOrOn(rings: readonly (readonly XY[])[], q: XY): boolean {
  let w = 0;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      const side = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
      if (side === 0 && q.x >= Math.min(a.x, b.x) && q.x <= Math.max(a.x, b.x) && q.y >= Math.min(a.y, b.y) && q.y <= Math.max(a.y, b.y)) return true;
      if (a.y <= q.y) {
        if (b.y > q.y && side > 0) w += 1;
      } else if (b.y <= q.y && side < 0) w -= 1;
    }
  }
  return w !== 0;
}

const chord = (a: number, b: number, hw: number, knots: [number, number] | null, ends: 'round' | 'square' = 'round'): Chord => ({ a, b, hw, knots, ends });

/** The least distance from q to the rings' edges (cm). */
function distToRings(rings: readonly (readonly XY[])[], q: XY): number {
  return Math.min(...rings.flatMap((r) => r.map((a, i) => distToLine(q, [a, r[(i + 1) % r.length]]))));
}

/** The farthest an overlay moves a boundary point (§3.7's attracted cases: √2 · attractCm), plus the chords (kerb.ts). */
const MOVE_CM = Math.sqrt(2) * LATTICE.attractCm + SAGITTA_CM;

describe('J264 (C-0381): where the one overlay finds no route, kerb(F) is read in two steps — the edge spines’ kerb less the vertex-only spines’ parts', () => {
  it('B-FUZZ seed 1012 network 1855 (three chords converging on the frame corner, a square profile band up to 595 cm through F’s vertex): the one overlay refuses; the staged read commits, clear of the vertex-only band, within the edge spines’ kerb', () => {
    const { p, faces, table } = network([chord(5475, 2, 5, [7, 125]), chord(15_991, 6620, 31, [11, 84]), chord(5, 4236, 9, [595, 545], 'square')]);
    const ws = widthsOf(table);
    const kerbs: LatticePoint[][] = [];
    let staged = 0;
    for (const f of faces) {
      const read = readFace(p, f, ws);
      const st = stagedRead(p, f, ws);
      // the scratch's one overlay of F's rings and every spine's parts (the edge spines' and the reaching vertex-only ones)
      const one = scratchKerb(read.rings, new Map([...read.spines, ...st.through.map((s) => [s.key, s] as const)]));
      const k = kerbIn(p, f, ws);
      kerbs.push(...k);
      // the one function: kerb(F) is the read's kerb
      expect(normals(k)).toEqual(normals(st.read.kerb));
      if (one.ok) continue;
      // the staged path: the one overlay's refusal is insertChain's, the edge spines' kerb read, a vertex-only spine reaching it
      expect(one.ok ? '' : one.detail).toMatch(/^insert: no route from/);
      expect(st.through.map((s) => s.key)).toContain('way:way:2');
      staged += 1;
      // the region F − (E ∪ V) reached as (F − E) − V: within the edge spines' kerb (to the hot pixel), clear of the
      // vertex-only band (to the arcs' chords), which the edge spines' kerb reached deep into
      expect(k.length).toBeGreaterThan(0);
      expect(k.flat().every((q) => insideOrOn(st.base, q) || distToRings(st.base, q) <= 1)).toBe(true);
      expect(Math.max(...st.through.map((s) => depthInSpine(st.base, s)))).toBeGreaterThan(100);
      for (const s of st.through) expect(depthInSpine(k, s), s.key).toBeLessThanOrEqual(ON_EDGE_CM);
    }
    expect(staged).toBe(2);
    // S9 commits it (the one function): healthy, the faces tiled, the blocks kerb(F) — within N-57 (2)'s closing bound
    // (attractCm + 1 cm): in this corner cluster two faces' kerb vertices stand within reach of each other across a thin
    // band, and the commit's closings join them (blocks 20 cm off the kerbs there, as on the pre-J318 engine's closings)
    const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
    healthy(p);
    expect(tilesExactly(p, 2, faces)).toEqual([]);
    const v = r.value as BandResult;
    const blocks = v.blocks.flatMap((b) => ringsOf(p, 2, b));
    expect(blocks.length).toBe(kerbs.length);
    expect(hausdorffCm(blocks, kerbs)).toBeLessThanOrEqual(LATTICE.attractCm + 1);
  });

  it('B-FUZZ seed 20261011 network 2182 (chords 0.29° apart from the frame corner, bands of 26 and 37 cm, thinner than the attraction): the one overlay refuses; the staged region is an attracted case (§3.7) — within an overlay’s move of the vertex-only band — and commits', () => {
    const { p, faces, table } = network([chord(11, 7986, 37, null, 'square'), chord(6, 7960, 26, null, 'square'), chord(5265, 2, 17, [6, 455])]);
    const ws = widthsOf(table);
    const kerbs: LatticePoint[][] = [];
    let staged = 0;
    for (const f of faces) {
      const read = readFace(p, f, ws);
      const st = stagedRead(p, f, ws);
      const one = scratchKerb(read.rings, new Map([...read.spines, ...st.through.map((s) => [s.key, s] as const)]));
      const k = kerbIn(p, f, ws);
      kerbs.push(...k);
      expect(normals(k)).toEqual(normals(st.read.kerb));
      if (one.ok) continue;
      expect(one.ok ? '' : one.detail).toMatch(/^insert: no route from/);
      expect(st.through.map((s) => s.key)).toEqual(['way:way:0']);
      staged += 1;
      // way:0's 37 cm band and way:1's 26 cm band leave the corner 0.29° apart: the overlays attract them together, so a
      // kerb vertex stands 4 cm off way:0's centreline — 33 cm into its band, within the farthest an overlay moves a
      // boundary point (√2 · attractCm + the chords); clearOf accepts it
      const d = depthInSpine(k, st.through[0]);
      expect(d).toBeGreaterThan(ON_EDGE_CM);
      expect(d).toBeLessThanOrEqual(MOVE_CM);
      expect(clearOf(k, st.through[0])).toBe(true);
      expect(k.flat().every((q) => insideOrOn(st.base, q) || distToRings(st.base, q) <= 1)).toBe(true);
    }
    expect(staged).toBe(1);
    const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
    healthy(p);
    expect(tilesExactly(p, 2, faces)).toEqual([]);
    const v = r.value as BandResult;
    const blocks = v.blocks.flatMap((b) => ringsOf(p, 2, b));
    expect(blocks.length).toBe(kerbs.length);
    expect(hausdorffCm(blocks, kerbs)).toBeLessThanOrEqual(LATTICE.attractCm + 1);
  });

  it('the staged read’s post-condition (clearOf): a vertex deeper into a band than an overlay’s move (√2 · attractCm + the chords) is refused; the half-width read along a profile and at an end', () => {
    const spine = (hw: [number, number]): Spine => ({
      key: 'way:way:t',
      chain: { role: 'way', entity: 'way:t' },
      ends: 'round',
      lines: [{ points: [pt(0, 0), pt(1000, 0)], hw: [hw[0], hw[1]], closed: false, junction: [false, false] }],
      hwAt: new Map(),
    });
    const ring = (x: number, y: number): LatticePoint[][] => [[pt(x, y), pt(x + 400, y + 400), pt(x - 400, y + 400)]];
    // a scalar band of 100 cm: 38 cm deep is within the move (38.77 cm), 40 cm is not
    expect(MOVE_CM).toBeGreaterThan(38.7);
    expect(MOVE_CM).toBeLessThan(38.8);
    expect(clearOf(ring(500, 62), spine([100, 100]))).toBe(true);
    expect(clearOf(ring(500, 60), spine([100, 100]))).toBe(false);
    // a profile 100 → 200 cm: 150 cm at the middle, read by the foot of the perpendicular
    expect(clearOf(ring(500, 113), spine([100, 200]))).toBe(true);
    expect(clearOf(ring(500, 110), spine([100, 200]))).toBe(false);
    // beyond the end: the round end's radius (100 cm at x = 1000)
    expect(clearOf([[pt(1062, 0), pt(1500, -400), pt(1500, 400)]], spine([100, 100]))).toBe(true);
    expect(clearOf([[pt(1059, 0), pt(1500, -400), pt(1500, 400)]], spine([100, 100]))).toBe(false);
    // round S15 (the start-cap rule, every reader of ends): at a JUNCTION end the band stops on the line through the end
    // square to the segment — a vertex beyond it, or within the move behind it, is clear; 40 cm behind it, on the
    // centreline, is not
    const junction = (s: Spine): Spine => ({ ...s, lines: s.lines.map((l) => ({ ...l, junction: [false, true] as const })) });
    expect(clearOf([[pt(1059, 0), pt(1500, -400), pt(1500, 400)]], junction(spine([100, 100])))).toBe(true);
    expect(clearOf([[pt(1001, 0), pt(1500, -400), pt(1500, 400)]], junction(spine([100, 100])))).toBe(true);
    expect(clearOf([[pt(962, 0), pt(1500, -400), pt(1500, 400)]], junction(spine([100, 100])))).toBe(true);
    expect(clearOf([[pt(960, 0), pt(1500, -400), pt(1500, 400)]], junction(spine([100, 100])))).toBe(false);
  });
});

/** kerb(F) read in a batch of level 1 that writes nothing, as a result (a refusal kept). */
function kerbRead(p: Plat, face: number, widths: ReturnType<typeof widthsOf>): ReturnType<typeof kerb> {
  let out: ReturnType<typeof kerb> | null = null;
  commit(p, 1, (o) => {
    out = kerb(o, face, widths);
    return { ok: true, value: null, warnings: [] };
  });
  return out as unknown as ReturnType<typeof kerb>;
}

/** Every spine of the network as an edge of some face reads it (the census's vertex contacts aside), by key. */
function edgeSpines(p: Plat, faces: readonly number[], widths: ReturnType<typeof widthsOf>): Map<string, Spine> {
  const all = new Map<string, Spine>();
  for (const f of faces) for (const [k, s] of readFace(p, f, widths, undefined, false).spines) all.set(k, s);
  return all;
}

/** The square metres of F (a 1 m grid of cell centres) clear of every band — the region a correct kerb(F) holds. */
function clearSquareMetres(rings: readonly (readonly XY[])[], spines: Iterable<Spine>): number {
  const ss = [...spines];
  let n = 0;
  for (let x = 50; x < 4000; x += 100) for (let y = 50; y < 4000; y += 100) if (insideOrOn(rings, { x, y }) && ss.every((s) => depthInSpine([[{ x, y }]], s) < 0)) n += 1;
  return n;
}

describe('C-0380 (2): the census’s two promises — a refused edge spines’ kerb stays refused; the reach test reads a profile band’s wider end', () => {
  // The promise: where the edge spines' kerb refuses, the census adds no vertex-only spine and the read refuses as before —
  // never the staged read on an empty base, which gives ok([]) (an empty kerb: F wholly band) and lets corridorUnion
  // commit F as `wholeBand` while much of F lies outside every band (a built block silently erased, N-45 (a)).
  // Round S9 (C-0417), the declared shift: B-FUZZ seed 20261011 draws 1000 (face 1) and 4776 (face 0), which pinned it
  // before the round (the edge spines' kerb found no route, insertChain's class), are read by the dry-run on the real
  // arena and succeed (the drain): kerb(F) clear of the vertex-only band, corridorUnion commits. The promise is pinned on
  // draw 1525 (face 1), whose edge spines' kerb the dry-run refuses (UNLAID_DEEP) with a vertex-only contact present.
  for (const [draw, chords, face, vertexOnly] of [
    [1000, [chord(13_701, 8004, 366, [71, 13]), chord(10_997, 7981, 27, [432, 490], 'square'), chord(7687, 8005, 419, null)], 1, 'way:way:1'],
    [4776, [chord(15_998, 8039, 194, [6, 138], 'square'), chord(15_994, 7978, 1, [563, 528]), chord(14_167, 6, 8, [26, 170])], 0, 'way:way:1'],
  ] as const) {
    it(`B-FUZZ seed 20261011 draw ${String(draw)} face ${String(face)} (pre-S9: the edge spines’ kerb refused 'no route'): read now, kerb(F) clear of the vertex-only band, corridorUnion commits`, () => {
      const { p, faces, table } = network(chords);
      const ws = widthsOf(table);
      expect(faces).toContain(face);
      const all = edgeSpines(p, faces, ws);
      const read = readFace(p, face, ws);
      const bounding = new Set(read.edges.flat().flatMap((e) => e.spines));
      expect(bounding.has(vertexOnly)).toBe(false);
      const vo = all.get(vertexOnly) as Spine;
      const base = readIn(p, 1, (o) => readKerb(o, face, ws, undefined, false));
      expect(base.ok).toBe(true);
      const k = kerbRead(p, face, ws);
      expect(k.ok).toBe(true);
      if (!k.ok) return;
      expect(depthInSpine(k.value, vo)).toBeLessThanOrEqual(DRY_MOVE_CM);
      const r = txn(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    });
  }

  it('B-FUZZ seed 20261011 draw 1525 face 1: the edge spines’ kerb refuses, so kerb(F) refuses with it (never ok([])) and corridorUnion refuses, nothing written (never F all band)', () => {
    const { p, faces, table } = network([chord(10_550, 7964, 3, [75, 14], 'square'), chord(9525, 7966, 595, [580, 270], 'square'), chord(14_872, 8030, 26, [549, 567], 'square')]);
    const ws = widthsOf(table);
    const face = 1;
    expect(faces).toContain(face);
    // the census meets a vertex-only contact of declared width (it bounds no route edge of F)
    const read = readFace(p, face, ws);
    expect(read.through.length).toBeGreaterThan(0);
    const bounding = new Set(read.edges.flat().flatMap((e) => e.spines));
    for (const s of read.through) expect(bounding.has(s.key)).toBe(false);
    // the edge spines' kerb refuses (a run the insertion could not lay, deeper in a face than its move: UNLAID_DEEP)
    const base = readIn(p, 1, (o) => readKerb(o, face, ws, undefined, false));
    expect(base.ok).toBe(false);
    const detail = base.ok ? '' : base.detail;
    expect(detail).toBe(UNLAID_DEEP);
    // kerb(F) refuses with the edge spines' kerb's refusal — never an empty kerb
    const k = kerbRead(p, face, ws);
    expect(k.ok).toBe(false);
    expect(k.ok ? 'ok' : `${k.code} ${k.detail}`).toBe(`E_INVARIANT ${detail}`);
    // corridorUnion (S9) refuses typed, the arena put back — never a commit of F as wholeBand
    const before = state(p);
    const r = txn(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
    expect(r.ok ? `committed ${JSON.stringify(r.value.value)}` : `${r.code} ${r.detail}`).toBe(`E_INVARIANT ${UNLAID_DEEP}`);
    expect(state(p)).toBe(before);
  });

  it('a profile band (14 → 479 cm) passing through F’s vertex and reaching kerb(F) only by its wider end is subtracted — kerb(F) and corridorUnion’s block clear of it (round S15: B-FUZZ seed 1012 draw 4102’s band reached F by its wider END, a junction end that takes no cap now)', () => {
    // S along y = 2000 (half-width 100), F above it (its edge spines' kerb from y = 2100); P passes through S's vertex
    // J = (2000, 2000) — a vertex-only contact of F — from (0, 0) to (4000, 1800), its half-width 14 cm at J widening
    // linearly to 479 cm at (4000, 1800): read with its segment's SMALLER end half-width (14 cm, at J, 100 cm below the
    // edge spines' kerb) the band does not reach; with its larger (C-0380 (2)'s reach test) it reaches 179 cm into it
    const p = framed();
    way(p, 'way:s', [[0, 2000], [4000, 2000]]);
    way(p, 'way:p', [[0, 0], [2000, 2000], [4000, 1800]], [0, 1, 2]);
    const [f] = own(p, 'district:1', [[2000, 3000]]);
    const ws = widthsOf({ 'way:s': 100, 'way:p': profile([14, 14, 479]) });
    const pre = readIn(p, 1, (o) => readKerb(o, f, ws, undefined, false));
    expect(pre.ok).toBe(true);
    const preRings = pre.ok ? pre.value.kerb : [];
    const w0 = (readFace(p, f, ws).through.find((s) => s.key === 'way:way:p') as Spine);
    expect(w0.lines.map((l) => l.hw)).toEqual([[14, 14, 479]]);
    const narrow: Spine = { ...w0, lines: w0.lines.map((l) => ({ ...l, hw: l.hw.map(() => Math.min(...l.hw)) })) };
    expect(depthInSpine(preRings, narrow)).toBeLessThan(-50);
    expect(depthInSpine(preRings, w0)).toBeGreaterThan(150);
    // the census reads it as F's spine; kerb(F) clear of its band (on its edge within the lattice's rounding)
    expect(stagedRead(p, f, ws).read.spines.has('way:way:p')).toBe(true);
    const k = kerbIn(p, f, ws);
    expect(normals(k)).toEqual(['0,2100 2738,2100 4000,2271 4000,4000 0,4000']);
    // P's band edge crosses the edge spines' kerb line at 7.4°: the corner, attracted along it, stands 66 cm east of the
    // exact meet (2672, 2100) and 8.6 cm inside the band — an attracted case, within an overlay's move (§3.7)
    expect(depthInSpine(k, w0)).toBeLessThanOrEqual(MOVE_CM);
    expect(depthInSpine(k, w0)).toBeGreaterThan(0);
    // S9 commits that kerb (S8 ≡ S9): F's block clear of P's band too
    const r = commit(p, 2, (o) => corridorUnion(o, [f], ws), AT_S9);
    healthy(p);
    expect(tilesExactly(p, 2, [f])).toEqual([]);
    const v = r.value as BandResult;
    const mine = v.blocks.filter((b) => p.faces[2].parent[b] === f).flatMap((b) => ringsOf(p, 2, b));
    expect(mine.length).toBeGreaterThan(0);
    expect(normals(mine)).toEqual(normals(k));
    expect(depthInSpine(mine, w0)).toBeLessThanOrEqual(MOVE_CM);
  });
});
