// J318 (the session's reading of §3.7, M0-a-09 session fix round S6; C-0348): a corridor is a reservation, and a block
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
// way's band.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { kerb, readFace } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandUnion, type BandResult } from '../../../src/arr/bandUnion.js';
import { SAGITTA_CM } from '../../../src/arr/buffer.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { ins, tx as shell, emptyArena } from '../../insert/step3-5/support.js';
import { setOwner } from '../../../src/tx/index.js';
import { AT_S9, commit, framed, healthy, normals, own, pt, ringsOf, tilesExactly, way, widthsOf } from './support.js';

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
    expect([...read.spines.keys()].sort()).toEqual(['way:way:a', 'way:way:b', 'way:way:w']);
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
      // W is left out of F's spines (C-0348's reach test); where such a band is read, the overlay can attract its
      // vertices onto the kerb (the fusion 33 fixture below: way:fg57keftp9vga, 16 cm short, bends kerb(F) when read)
      const { p, f, all, lanesOnly, W } = tee(lane);
      const without = kerbIn(p, f, lanesOnly);
      // (the kerb's corner a lattice point: within 2 cm of the meet)
      expect(Math.abs(-depthIn(without, W, 500) - short)).toBeLessThanOrEqual(2);
      expect(readFace(p, f, all).spines.has('way:way:w')).toBe(false);
      const withW = kerbIn(p, f, all);
      expect(normals(withW)).toEqual(normals(without));
      const r = commit(p, 2, (o) => corridorUnion(o, [f], all), AT_S9);
      healthy(p);
      const v = r.value as BandResult;
      expect(v.blocks.flatMap((b) => normals(ringsOf(p, 2, b))).sort()).toEqual(normals(without));
    });
  }

  it('a square end reaching F by its corner only: the reach reads the square cap (√2 half-widths off the end), so the corner is clipped', () => {
    // S along y = 1000 (half-width 300), F above it; W arrives from below at 45° and ends on S at J = (2000, 1000),
    // declared square (half-width 250): its cap's far corner stands 250·√2 = 354 cm above J — 54 cm into kerb(F) —
    // while the cap's middle reaches only 177 cm (within S's band)
    const p = framed();
    way(p, 'way:s', [[0, 1000], [2000, 1000], [4000, 1000]]);
    way(p, 'way:w', [[1000, 0], [2000, 1000]]);
    const [f] = own(p, 'district:1', [[2000, 3000]]);
    const ws = widthsOf({ 'way:s': 300, 'way:w': { halfWidthCm: 250, ends: 'square' } });
    const sOnly = widthsOf({ 'way:s': 300 });
    expect(readFace(p, f, ws).spines.has('way:way:w')).toBe(true);
    const inside = (rings: readonly (readonly XY[])[], q: XY): boolean => {
      let w = 0;
      for (const r of rings) {
        for (let i = 0; i < r.length; i += 1) {
          const a = r[i];
          const b = r[(i + 1) % r.length];
          const side = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
          if (a.y <= q.y) {
            if (b.y > q.y && side > 0) w += 1;
          } else if (b.y <= q.y && side < 0) w -= 1;
        }
      }
      return w !== 0;
    };
    // (2000, 1340): above S's band, inside W's square cap (240 cm along W past J, 240 cm off its axis)
    const q = { x: 2000, y: 1340 };
    expect(inside(kerbIn(p, f, sOnly), q)).toBe(true);
    const after = kerbIn(p, f, ws);
    expect(inside(after, q)).toBe(false);
    // the cap's corner clipped, the rest of kerb(F) S's: every vertex at least 300 cm above S's centreline
    expect(after.flat().every((v) => v.y >= 1300)).toBe(true);
  });

  it('bandUnion’s per-side parts read the chain’s edge faces only (C-0348): a face touching the chain at a vertex holds no part of it', () => {
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
      expect(read.spines.has(vo)).toBe(true);
      const voRuns = runs.filter((r) => r.role === 'way' && r.of === fx.vertexOnly.entity);
      const depth = (rings: readonly (readonly XY[])[]): number => Math.max(...voRuns.map((r) => depthIn(rings, r.points, r.hw as number)));
      // before (the band set without the vertex-only contact — exactly the pre-J318 census, which never read it; F's
      // other vertex-only contacts reach no kerb and are left out, C-0348): the kerb's corner inside the way's band
      const before = kerbIn(p, face, without);
      expect(pairsOf(before)).toEqual(fx.kerbBefore);
      expect(depth(before)).toBeGreaterThan(100);
      expect(Math.abs(depth(before) - fx.vertexOnly.depthBeforeCm)).toBeLessThan(0.01);
      // after: kerb(F) clear of the band of every way that does not bound F, the vertex-only way's among them
      const after = kerbIn(p, face, widths);
      expect(pairsOf(after)).toEqual(fx.kerbAfter);
      expect(depth(after)).toBeLessThanOrEqual(ON_EDGE_CM);
      expect(deepestOffF(runs, bounding, after).depth).toBeLessThanOrEqual(ON_EDGE_CM);
      // S9 commits that kerb (S8 ≡ S9, §13.2), its block clear of every such band
      const r = commit(p, 2, (o) => corridorUnion(o, [face], widths), AT_S9);
      healthy(p);
      expect(tilesExactly(p, 2, [face])).toEqual([]);
      const v = r.value as BandResult;
      const blocks = v.blocks.flatMap((b) => ringsOf(p, 2, b));
      expect(normals(blocks)).toEqual(normals(after));
      expect(deepestOffF(runs, bounding, blocks).depth).toBeLessThanOrEqual(ON_EDGE_CM);
    });
  }
});
