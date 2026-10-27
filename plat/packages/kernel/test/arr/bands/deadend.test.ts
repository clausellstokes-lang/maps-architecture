// N-57 (2) (M0-a-09 session fix round S3): a dead-end lane whose round end cap meets a spine-less boundary edge. kerb(F)'s
// outline piece along the lane closes on that edge by a short chord — 25.94 / 25.71 cm, within attractCm — and the
// insertion attracted the contact onto the piece's vertex beside it: the piece was committed dangling, the half-corridor
// strip and the block one L2 face (integrated CITY seeds 34 and 47 of M0-c-06's smoke; §13.2's S8 ≡ S9 431.7 / 157.9 cm,
// a silently wrong committed block, N-45 (a)). bandCore now closes such an end: the contact pinned on F's boundary
// (`splitThrough` of the edge it lies on), the chord inserted between the tip and it — and refuses E_INVARIANT, the batch
// put back, where a piece would still end on a dangling tip (the post-condition). The pins: faces 871 and 822 as
// fixtures (corridorUnion's block ≡ kerb(F), Hausdorff 0 by normal forms; no kerb edge with one face on both sides); the
// lost chord planted (the pre-round behaviour) refused with the piece named; synthetic dead-end lanes on a spine-less
// edge — near perpendicular to an edge slanted 10–20°, and meeting an edge at 10–20° — their last chords swept 20–40 cm,
// closing in every case. Round S4 (checks/M0-a-09-s3.md, line 1): the contact is pinned only AT its place (where the
// placement falls back, round S3 closed onto the route piece's far endpoint, blocks up to 343 cm beyond kerb(F)); the
// two B-FUZZ networks the checker named are pinned here — every closing by kerb(F), the block within attractCm of
// kerb(F) where the contact alone cannot stand (seed 20261011 case 3140) and within 2·√2·attractCm where kerb(F) itself
// cannot be laid in the arena (seed 1012 case 3186), never reaching round S3's far vertex, and bandUnion committing.
// Round S9 (C-0417; RULING J433): kerb(F) is read by a dry-run on the real arena, and cases 3186 and 3070 (and 4722) now
// refuse KEPT_DEEP — a strip's run end on F's L1 edge within minEdge of the L0 frame is placed off its point — a refusal
// insertChain's by its cause (replay.ts), pinned as the declared shift (`refusedByDisplacement`).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { faceWalk, idOf, roleIdOf, roleInfo, rowsOn, type FaceId, type Plat } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { tx } from '../../../src/tx/index.js';
import { KEPT_DEEP, kerbCensus, readKerb, type KerbRead } from '../../../src/arr/kerb.js';
import { LATTICE } from '../../../src/num/index.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandClosings, bandCore, bandUnion, outlinePieces, type BandResult } from '../../../src/arr/bandUnion.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { emptyArena, ins, tx as shell } from '../../insert/step3-5/support.js';
import { classify, replayKerb } from './replay.js';
import { AT_S9, closingsBeyond, commit, firstBand, framed, hausdorffCm, healthy, network, normals, own, pt, ringsOf, shifted, spec, spineDepth, state, tilesExactly, TIMEOUT, widthsOf, readIn, type Chord } from './support.js';

interface Fixture {
  seed: number;
  face: number;
  block: string;
  lane: string;
  owner: string;
  at: [number, number];
  ring: [number, number][];
  boundary: [number, number][];
  stubs: [[number, number], [number, number]][];
  spines: { role: string; entity: string; hw: number; points: [number, number][] }[];
  kerb: [number, number][][];
}

const FIXTURES = (JSON.parse(readFileSync(new URL('./deadend-faces.json', import.meta.url), 'utf8')) as { faces: Fixture[] }).faces;

/** The outline edges (`kerb` rows at L2) with one L2 face on both sides, each as "x,y" of its even half-edge's origin. */
function danglingKerb(p: Plat): string[] {
  const side = new Map<number, number>();
  for (let f = 0; f < p.slots.face[2].top; f += 1) {
    if (p.faces[2].kind[f] === 0xffff) continue;
    for (const ring of faceWalk(p, 2, f)) for (const h of ring) side.set(h, f);
  }
  const out: string[] = [];
  for (const [h, f] of side) {
    if ((h & 1) === 1 || side.get(h ^ 1) !== f) continue;
    if (!rowsOn(p, 'edge', h).some((r) => roleInfo(p.roles.kind[r]).name === 'kerb')) continue;
    out.push(`${String(p.vertices.x[p.halfEdges.origin[h]])},${String(p.vertices.y[p.halfEdges.origin[h]])}`);
  }
  return out.sort();
}

/**
 * Two ring sets (normal forms) alike vertex for vertex up to `tol` cm — as many rings, each with as many vertices, every
 * vertex of either within `tol` of one of the other's (a contact the placement put on its lattice point beside the
 * slanted edge moves by at most the hot pixel; a lost chord loses a vertex).
 */
/** A normal form back as a ring (support.ts `normals`: x,y pairs joined by spaces). */
function parseNormal(r: string): LatticePoint[] {
  return r.split(' ').map((t) => pt(Number(t.split(',')[0]), Number(t.split(',')[1])));
}

function sameUpTo(got: readonly string[], want: readonly string[], tol: number): boolean {
  const parse = (r: string): number[][] => r.split(' ').map((t) => t.split(',').map(Number));
  const a = got.map(parse).sort((u, w) => u.length - w.length || u[0][0] - w[0][0]);
  const b = want.map(parse).sort((u, w) => u.length - w.length || u[0][0] - w[0][0]);
  if (a.length !== b.length) return false;
  const near = (u: number[][], w: number[][]): boolean => u.every((q) => w.some((r) => Math.hypot(q[0] - r[0], q[1] - r[1]) <= tol));
  return a.every((u, i) => u.length === b[i].length && near(u, b[i]) && near(b[i], u));
}

/** The fixture's arena: a margin ring round it at L0, then at L1 its spines, the T-junction stubs and the spine-less edge. */
function build(fx: Fixture): { p: Plat; face: FaceId; widths: ReturnType<typeof widthsOf> } {
  const all = [...fx.ring, ...fx.spines.flatMap((s) => s.points)];
  const x0 = Math.min(...all.map((q) => q[0])) - 3000;
  const y0 = Math.min(...all.map((q) => q[1])) - 3000;
  const x1 = Math.max(...all.map((q) => q[0])) + 3000;
  const y1 = Math.max(...all.map((q) => q[1])) + 3000;
  const p = emptyArena();
  const m = ins(shell(p, 0), [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true });
  if (!m.ok) throw new Error(`the margin ring was refused: ${m.code}`);
  const table: Record<string, number> = {};
  for (const s of fx.spines) {
    commit(p, 1, (o) => insertChain(o, s.points.map((q) => pt(q[0], q[1])), [{ role: s.role, entity: s.entity }], 'mandatory'));
    table[s.entity] = s.hw;
  }
  fx.stubs.forEach(([a, b], i) => commit(p, 1, (o) => insertChain(o, [pt(a[0], a[1]), pt(b[0], b[1])], [{ role: 'way', entity: `way:stub${String(i)}` }], 'mandatory')));
  commit(p, 1, (o) => insertChain(o, fx.boundary.map((q) => pt(q[0], q[1])), [{ role: 'way', entity: 'way:edge' }], 'mandatory'));
  const [face] = own(p, fx.owner, [fx.at]);
  return { p, face, widths: widthsOf(table) };
}

const pairs = (r: readonly LatticePoint[]): [number, number][] => r.map((q) => [q.x, q.y]);

/** Round S9's declared shift of the fixtures' kerb(F) (C-0417; the choices row): per face, each vertex moved. */
const S9_SHIFT: Record<number, [[number, number], [number, number] | null][]> = {
  // round S9: (50557, -47030) → (50556, -47032), placed on F's L1 edge; round S15 (coincident corners at one vertex,
  // kerb.ts `coincident`): the lane's end parts share the corner (50556, -47033), which the cap part's run holds at
  // (50580, -47042), 25.6 cm off (attracted); the next part of the run lays it there too, so the piece runs on from
  // (50580, -47042) along the strip's side to F's route vertex (50618, -46881) and ends there — before, the two parts held
  // the corner apart and the piece closed on the edge by a 25.94 cm chord
  871: [[[50557, -47030], [50618, -46881]]],
};

/** Round S15: the faces whose piece now ends at F's route vertex (the coincident corner laid at one vertex: no closing chord). */
const NO_CHORD: ReadonlySet<number> = new Set([871]);

/**
 * Round S16 (the faithful read, kerb.ts's module comment; C-0425): the faces read faithfully. Face 871's round S15 read
 * ran its piece to F's route vertex (50618, −46881) on the spine-less edge, 163.9 cm inside the lane way:1bzfw948gxbkz's
 * band (its end there no junction: the band ends with its cap); its first read holding a vertex deeper than attractCm, it
 * is read once more, faithfully — every vertex of it within 15 cm of its bands' edges, its one piece ending on F's
 * boundary at (50556, −47032), where no closing is needed — and corridorUnion commits it (S8 ≡ S9 by normal forms).
 */
const FAITHFUL: ReadonlySet<number> = new Set([871]);

/**
 * RULING J433 (the session; N-44 (3)'s 'a refusal caused in the item's own code'), the DECLARED SHIFT of a B-FUZZ case
 * round S9's dry-run refuses: kerb(F) of the face refuses KEPT_DEEP — its post-condition, never a silently wrong read
 * (N-45 (a)) — and corridorUnion refuses with it, nothing written; the replay of the same parts through insertChain
 * alone (replay.ts) holds the refusing part's run end off its input point, so the refusal is insertChain's (class (a)):
 * the end lies on F's L1 edge (a chord within minEdge of the L0 frame, the attractor), where no vertex can stand
 * minEdge clear of the frame, and §3.6's placement puts it `cm` into F.
 */
function refusedByDisplacement(chords: Chord[], face: number, at: [number, number], vertex: [number, number], cm: number): void {
  const { p, faces, table } = network(chords);
  const ws = widthsOf(table);
  const b0 = state(p);
  readIn(p, 1, (o) => {
    const k = readKerb(o, face, ws);
    expect(k.ok).toBe(false);
    if (k.ok) return null;
    expect(k.detail).toBe(KEPT_DEEP);
    const rp = replayKerb(o, face, ws);
    expect(classify(k, rp)).toBe('insertChain');
    expect(rp?.held).toMatchObject({ reading: 'displaced', at: pt(at[0], at[1]), vertex: pt(vertex[0], vertex[1]), cm, level: null });
    return null;
  });
  const c = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
  expect(c.ok).toBe(false);
  if (!c.ok) expect(c.detail).toBe(KEPT_DEEP);
  expect(state(p)).toBe(b0);
}

describe('N-57 (2): a kerb piece closing on a spine-less edge by a chord within attractCm', () => {
  for (const fx of FIXTURES) {
    it(`face ${String(fx.face)} (integrated seed ${String(fx.seed)}, ${fx.block}): corridorUnion's block ≡ kerb(F), Hausdorff 0, no kerb edge with one face on both sides`, () => {
      const { p, face, widths } = build(fx);
      const rk = readIn(p, 1, (o) => readKerb(o, face, widths));
      expect(rk.ok).toBe(true);
      const read = (rk as { value: KerbRead }).value;
      // the fixture is the smoke's face: its route ring and kerb(F) exactly as read there — kerb(F) with round S9's
      // declared shift (C-0417): the vertex where the lane's strip meets F's own L1 edge (50618, -46881)–(49823, -48814)
      // (the attractor, level 1, 0.1 cm) is placed by the insertion on that edge, 2 cm from the scratch's crossing
      expect(pairs(read.rings[0])).toEqual(fx.ring);
      if (FAITHFUL.has(fx.face)) {
        // round S16: the faithful read (no vertex deeper than attractCm in any band); its piece ends on F's boundary
        expect(kerbCensus(p)?.faithful).toBe('taken');
        for (const s of read.spines.values()) expect(spineDepth(read.kerb, s).depth, s.key).toBeLessThanOrEqual(LATTICE.attractCm);
        const pieces = outlinePieces(read);
        expect(pieces.map((q) => q.closed)).toEqual([false]);
        const end = pieces[0].points[pieces[0].points.length - 1];
        expect([end.x, end.y]).toEqual([50556, -47032]);
        const before = normals(read.kerb);
        const r = commit(p, 2, (o) => corridorUnion(o, [face], widths), AT_S9);
        healthy(p);
        const v = r.value as BandResult;
        expect(danglingKerb(p)).toEqual([]);
        expect(bandClosings(p)).toEqual([]);
        expect(v.blocks.flatMap((b) => normals(ringsOf(p, 2, b))).sort()).toEqual(before);
        expect(v.blocks.length).toBe(fx.kerb.length);
        expect(tilesExactly(p, 2, [face])).toEqual([]);
        return;
      }
      expect(read.kerb.map(pairs)).toEqual(shifted(fx.kerb, S9_SHIFT[fx.face] ?? []));
      // the precondition: the lane's piece closes on the spine-less edge by a chord within attractCm — or (face 871,
      // round S15) the piece ends at F's route vertex on it
      const open = outlinePieces(read).filter((q) => !q.closed);
      expect(open.length).toBe(1);
      const q = open[0].points;
      const chord = Math.hypot(q[q.length - 1].x - q[q.length - 2].x, q[q.length - 1].y - q[q.length - 2].y);
      if (NO_CHORD.has(fx.face)) {
        expect(fx.ring.some(([x, y]) => x === q[q.length - 1].x && y === q[q.length - 1].y)).toBe(true);
      } else {
        expect(chord).toBeGreaterThan(25);
        expect(chord).toBeLessThanOrEqual(26);
      }
      const before = normals(read.kerb);
      const r = commit(p, 2, (o) => corridorUnion(o, [face], widths), AT_S9);
      healthy(p);
      const v = r.value as BandResult;
      expect(danglingKerb(p)).toEqual([]);
      // no closing where the piece ends on F's vertex (face 871, round S15)
      if (NO_CHORD.has(fx.face)) expect(bandClosings(p)).toEqual([]);
      // S8 ≡ S9 (§13.2): the committed blocks are kerb(F), by normal forms (one point set: Hausdorff 0)
      expect(v.blocks.flatMap((b) => normals(ringsOf(p, 2, b))).sort()).toEqual(before);
      expect(v.blocks.length).toBe(fx.kerb.length);
      // the closing chord is an L2 kerb edge, its contact a vertex on F's boundary
      const kerbRole = roleIdOf('kerb');
      const end = q[q.length - 1];
      const prev = q[q.length - 2];
      let found = false;
      for (let e = 0; e < p.slots.pair.top; e += 1) {
        const a = p.halfEdges.origin[2 * e];
        const b = p.halfEdges.origin[2 * e + 1];
        if (a < 0) continue;
        const ends = [`${String(p.vertices.x[a])},${String(p.vertices.y[a])}`, `${String(p.vertices.x[b])},${String(p.vertices.y[b])}`].sort().join(' ');
        if (ends !== [`${String(end.x)},${String(end.y)}`, `${String(prev.x)},${String(prev.y)}`].sort().join(' ')) continue;
        found = rowsOn(p, 'edge', 2 * e).some((row) => p.roles.kind[row] === kerbRole && idOf(p, p.roles.entity[row]) === fx.owner);
      }
      expect(found).toBe(true);
      expect(tilesExactly(p, 2, [face])).toEqual([]);
      // the face holding the block's seed at L2 is the block (the harness's reading, M0-c-06)
      const seedBlock = v.blocks.find((b) => normals(ringsOf(p, 2, b))[0] === before[0]);
      expect(seedBlock).toBeDefined();
    });
  }

  it('the lost chord planted (the pre-round behaviour) is refused E_INVARIANT with the piece named, the arena put back', () => {
    // (round S15: face 871's piece ends at F's vertex (50618, -46881); without that end it ends on the dangling tip
    // (50580, -47042), as the lost chord left it before; round S16, the faithful read: the piece ends at (50556, −47032)
    // on F's boundary, and without that end on the dangling tip (50601, −47051))
    const fx = FIXTURES[0];
    const { p, face, widths } = build(fx);
    const b0 = state(p);
    // the piece without its contact: it ends on the vertex the insertion attracted the contact onto
    const lost = (read: KerbRead): { points: LatticePoint[]; closed: boolean }[] =>
      outlinePieces(read).map((q) => (q.closed ? q : { points: q.points.slice(0, -1), closed: false }));
    const r = tx(p, spec(2, AT_S9), (o) => {
      const t = o as Parameters<typeof bandCore>[0];
      return bandCore(t, [face], { widths, edgeRole: 'kerb', entityOf: () => fx.owner, owner: null, pieces: lost, vertexContacts: true });
    });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    // the post-condition: the piece named, ending on the dangling tip the insertion attracted the contact onto
    expect(r.detail).toContain(`piece 0 of the face ${String(face)} ends on a dangling tip at (50601, -47051)`);
    expect(state(p)).toBe(b0);
    // the op is atomic inside a batch that goes on: its refusal leaves the batch as the op found it, so the batch
    // commits nothing (M0-a-07's op savepoint)
    const again = commit(p, 2, (o) => {
      const c = bandCore(o as Parameters<typeof bandCore>[0], [face], { widths, edgeRole: 'kerb', entityOf: () => fx.owner, owner: null, pieces: lost, vertexContacts: true });
      expect(c.ok).toBe(false);
      return { ok: true, value: null, warnings: [] };
    }, AT_S9);
    expect(again.record).toBeNull();
    expect(state(p)).toBe(b0);
  });

  it('the fallback, pinned first (N-57 (2)\'s own mechanism): face 822\'s contact placed before its piece, the vertex beside it dropped — the block within attractCm of kerb(F)', () => {
    // reached through bandCore's `pinFirst` seam (on the families no end needs it: the closing at the contact or along
    // the kerb's run serves them): the contact pinned on F's boundary first, the piece's vertex 25.71 cm from it dropped,
    // the piece inserted onto the pin — the error at most attractCm, the dropped vertex's (C-0327 (2)). Round S15: face
    // 871 (this pin's face before) closes by no chord now (its coincident corner laid at one vertex), so face 822's is pinned
    const fx = FIXTURES.find((f) => f.face === 822) as Fixture;
    const { p, face, widths } = build(fx);
    const rk = readIn(p, 1, (o) => readKerb(o, face, widths));
    expect(rk.ok).toBe(true);
    const read = (rk as { value: KerbRead }).value;
    const open = outlinePieces(read).findIndex((q) => !q.closed);
    expect(open).toBe(0);
    const q = outlinePieces(read)[open].points;
    const r = tx(p, spec(2, AT_S9), (o) => bandCore(o as Parameters<typeof bandCore>[0], [face], { widths, edgeRole: 'kerb', entityOf: () => fx.owner, owner: null, pinFirst: [[face, open, 1]], vertexContacts: true }));
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    healthy(p);
    expect(tilesExactly(p, 2, [face])).toEqual([]);
    expect(danglingKerb(p)).toEqual([]);
    const closings = bandClosings(p);
    expect(closings.map((c) => c.kind)).toEqual(['pinned']);
    const c = closings[0] as Extract<(typeof closings)[number], { kind: 'pinned' }>;
    expect(c.contact).toEqual(q[q.length - 1]);
    expect(c.dropped).toEqual([q[q.length - 2]]);
    expect(Math.hypot(c.pin.x - c.contact.x, c.pin.y - c.contact.y)).toBeLessThanOrEqual(1.71);
    expect(closingsBeyond(closings, () => read.kerb)).toEqual([]);
    const v = (r as { value: { value: BandResult } }).value.value;
    expect(hausdorffCm(v.blocks.flatMap((b) => ringsOf(p, 2, b)), read.kerb)).toBeLessThanOrEqual(26);
  });

  it('a synthetic dead-end lane meeting a spine-less edge at 10–20°, its round cap’s last chord swept 20–40 cm: every case closes', { timeout: TIMEOUT }, () => {
    // the frame [0, 4000]²; a spine-less edge from (300, 1000) to (3700, 1000 + 3400·tan γ) (γ 7° or 16°) and a lane
    // toward it at x = 2000 + δ (δ 0 or 13 cm), arriving from the upper left at α = 10°–20° to the edge: on the obtuse
    // side the round cap meets the edge, its last chord clipped; mirrored (y → 4000 − y) or not. Judged: every case
    // whose contact on the edge closes a chord of 20–40 cm. Round S15 (the start-cap rule): a lane ENDING ON the edge
    // ends on its line — a junction end, no cap, no chord to close — so the lane is a dead end that stops SHORT of the
    // edge (40 cm off it, a free end: `GAP_CM`), its round cap meeting the edge as the class's caps do
    const tally = { cases: 0, judged: 0, near: 0, nearLast: 0, exact: 0 };
    const misses: string[] = [];
    for (const gamma of [7, 16]) {
      for (const delta of [0, 13]) {
        for (const hw of [157.5, 188.4]) {
          for (const mirror of [false, true]) {
            for (let k = 0; k <= 100; k += 1) {
              const alpha = 10 + k * 0.1;
              const g = (gamma * Math.PI) / 180;
              const A: [number, number] = [300, 1000];
              const B: [number, number] = [3700, Math.round(1000 + 3400 * Math.tan(g))];
              const ex = 2000 + delta;
              const E: [number, number] = [ex, Math.round(1000 + (ex - 300) * Math.tan(g))];
              const ang = Math.PI - g - (alpha * Math.PI) / 180;
              const L: [number, number] = [Math.round(E[0] + Math.cos(ang) * 1500), Math.round(E[1] + Math.sin(ang) * 1500)];
              const back = GAP_CM / Math.sin((alpha * Math.PI) / 180);
              const S: [number, number] = [Math.round(E[0] + Math.cos(ang) * back), Math.round(E[1] + Math.sin(ang) * back)];
              const T = (q: [number, number]): LatticePoint => pt(q[0], mirror ? 4000 - q[1] : q[1]);
              const p = framed();
              commit(p, 1, (o) => insertChain(o, [T([0, A[1]]), T(A), T(E), T(B), T([4000, B[1]])], [{ role: 'way', entity: 'way:edge' }], 'mandatory'));
              commit(p, 1, (o) => insertChain(o, [T([L[0], 4000]), T(L), T(S)], [{ role: 'way', entity: 'way:lane' }], 'mandatory'));
              const faces = [...new Set(own(p, 'district:1', [[3900, 3900], [100, 3900]].map(([x, y]) => [x, mirror ? 4000 - y : y] as [number, number])))];
              const ws = widthsOf({ 'way:lane': hw });
              tally.cases += 1;
              const off = (q: LatticePoint): number => {
                const y = mirror ? 4000 - q.y : q.y;
                return Math.abs((B[0] - A[0]) * (y - A[1]) - (B[1] - A[1]) * (q.x - A[0])) / Math.hypot(B[0] - A[0], B[1] - A[1]);
              };
              const want: string[] = [];
              let judged = false;
              let nearLast = false;
              for (const f of faces) {
                const rk = readIn(p, 1, (o) => readKerb(o, f, ws));
                expect(rk.ok).toBe(true);
                if (!rk.ok) continue;
                want.push(...normals(rk.value.kerb));
                for (const piece of outlinePieces(rk.value)) {
                  if (piece.closed) continue;
                  const q = piece.points;
                  for (const [c, w, last] of [[q[0], q[1], false], [q[q.length - 1], q[q.length - 2], true]] as const) {
                    if (off(c) >= 2) continue;
                    const len = Math.hypot(w.x - c.x, w.y - c.y);
                    if (len < 20 || len > 40) continue;
                    judged = true;
                    if (len <= 26) {
                      tally.near += 1;
                      if (last) nearLast = true;
                    }
                  }
                }
              }
              if (!judged) continue;
              tally.judged += 1;
              if (nearLast) tally.nearLast += 1;
              const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
              const at = `γ ${String(gamma)} δ ${String(delta)} hw ${String(hw)} α ${alpha.toFixed(1)}${mirror ? ' mirrored' : ''}`;
              if (!r.ok) {
                misses.push(`${at}: refused ${r.code} ${r.detail}`);
                continue;
              }
              healthy(p);
              expect(tilesExactly(p, 2, faces)).toEqual([]);
              const d = danglingKerb(p);
              if (d.length > 0) misses.push(`${at}: kerb edges with one face on both sides at ${d.join(' ')}`);
              // round S9 (the read's dry-run meets the arena the commit meets): every judged case's blocks within N-43's
              // bound of kerb(F) (N-52 (1)'s hard bar), and the exact ones counted (the share, reported)
              const v = r.value.value as BandResult;
              const got = v.blocks.flatMap((c) => normals(ringsOf(p, 2, c)));
              if (sameUpTo(got, want, 2)) tally.exact += 1;
              else expect(hausdorffCm(v.blocks.flatMap((c) => ringsOf(p, 2, c)), want.map(parseNormal)), at).toBeLessThanOrEqual(2 * Math.SQRT2 * 26);
            }
          }
        }
      }
    }
    console.info(`dead-end sweep at 10–20°: ${JSON.stringify(tally)}`);
    expect(misses).toEqual([]);
    expect(tally.judged).toBeGreaterThanOrEqual(100);
    // round S9 (C-0417), the declared shift: no last chord of 20–26 cm is left — the dry-run lays the cap on the real
    // arena, where the chord's contact stands within attractCm of the strip's corner the read laid first and is
    // attracted onto it (the piece closes at the lane's end by the strip's end edge; the cap's sector beside it, ≤
    // attractCm wide along F's edge, stays in the block: the KI row of round S9). Before the round: nearLast ≥ 1
    expect(tally.nearLast).toBe(0);
    // the exact share, a ratchet on the measure (round S9: 548 of 556 judged with the lane ending ON the edge; round S15,
    // the lane 40 cm off it: 136 of 148 judged; the rest within N-43's bound, above)
    expect(tally.exact).toBeGreaterThanOrEqual(136);
  });

  it('a synthetic dead-end lane whose round cap meets a spine-less edge slanted 10–20°, the last chord swept 20–40 cm: every case closes', { timeout: TIMEOUT }, () => {
    // the frame [0, 4000]²; a spine-less edge from (1500, 0) up at β off the vertical, a lane from the frame's west side
    // toward it at y = 2000 or 2017, near perpendicular to it (turned by φ); the arena mirrored (y → 4000 − y) or not, so the
    // contact is a piece's last point (the case the insertion lost) or its first. Judged: every case whose contact on
    // the slanted edge closes a chord of 20–40 cm. Round S15 (the start-cap rule): the lane stops 40 cm off the edge
    // (a free end, its round cap meeting the edge: `GAP_CM`), as the sweep above
    const tally = { cases: 0, judged: 0, near: 0, nearLast: 0, exact: 0 };
    const misses: string[] = [];
    for (let beta = 10; beta <= 20; beta += 1) {
      for (const hw of [157.5, 163.8]) {
        for (const mirror of [false, true]) {
          for (const [ey, phi] of [2000, 2017].flatMap((y) => [...Array.from({ length: 13 }, (_, k) => 8 + k * 0.5), 9.1, 9.2, 9.3, 9.4, 9.6].map((f) => [y, f] as const))) {
            const b = (beta * Math.PI) / 180;
            const A: [number, number] = [1500, 0];
            const B: [number, number] = [Math.round(1500 + 4000 * Math.tan(b)), 4000];
            const E: [number, number] = [Math.round(1500 + ey * Math.tan(b)), ey];
            const ang = Math.PI + b + (phi * Math.PI) / 180;
            const L: [number, number] = [Math.round(E[0] + Math.cos(ang) * 1400), Math.round(E[1] - Math.sin(ang) * 1400)];
            const back = GAP_CM / Math.cos((phi * Math.PI) / 180);
            const S: [number, number] = [Math.round(E[0] + Math.cos(ang) * back), Math.round(E[1] - Math.sin(ang) * back)];
            const T = (q: [number, number]): LatticePoint => pt(q[0], mirror ? 4000 - q[1] : q[1]);
            const p = framed();
            commit(p, 1, (o) => insertChain(o, [T(A), T(E), T(B)], [{ role: 'way', entity: 'way:edge' }], 'mandatory'));
            commit(p, 1, (o) => insertChain(o, [T([0, L[1]]), T(L), T(S)], [{ role: 'way', entity: 'way:lane' }], 'mandatory'));
            const faces = [...new Set(own(p, 'district:1', [[200, 200], [200, 3800]]))];
            const ws = widthsOf({ 'way:lane': hw });
            tally.cases += 1;
            const off = (q: LatticePoint): number => {
              const y = mirror ? 4000 - q.y : q.y;
              return Math.abs((B[0] - A[0]) * (y - A[1]) - (B[1] - A[1]) * (q.x - A[0])) / Math.hypot(B[0] - A[0], B[1] - A[1]);
            };
            const want: string[] = [];
            let judged = false;
            let nearLast = false;
            for (const f of faces) {
              const rk = readIn(p, 1, (o) => readKerb(o, f, ws));
              expect(rk.ok).toBe(true);
              if (!rk.ok) continue;
              want.push(...normals(rk.value.kerb));
              for (const piece of outlinePieces(rk.value)) {
                if (piece.closed) continue;
                const q = piece.points;
                for (const [c, w, last] of [[q[0], q[1], false], [q[q.length - 1], q[q.length - 2], true]] as const) {
                  if (off(c) >= 2) continue;
                  const len = Math.hypot(w.x - c.x, w.y - c.y);
                  if (len < 20 || len > 40) continue;
                  judged = true;
                  if (len <= 26) {
                    tally.near += 1;
                    if (last) nearLast = true;
                  }
                }
              }
            }
            if (!judged) continue;
            tally.judged += 1;
            if (nearLast) tally.nearLast += 1;
            const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
            const at = `β ${String(beta)} hw ${String(hw)} y ${String(ey)} φ ${phi.toFixed(2)}${mirror ? ' mirrored' : ''}`;
            if (!r.ok) {
              misses.push(`${at}: refused ${r.code} ${r.detail}`);
              continue;
            }
            healthy(p);
            expect(tilesExactly(p, 2, faces)).toEqual([]);
            const d = danglingKerb(p);
            if (d.length > 0) misses.push(`${at}: kerb edges with one face on both sides at ${d.join(' ')}`);
            // where the contact is a piece's last point the commit is kerb(F), vertex for vertex up to the placement's
            // hot pixel on the slanted edge (the chord kept: a lost chord drops a vertex)
            // round S9: on every judged case, the read's dry-run meeting the arena the commit meets; round S15 (the lane
            // 40 cm off the edge): 4 of 376 judged cases commit the cap's last two arc vertices as one, 6.3 cm off the
            // read — within N-43's bound (N-52 (1)'s hard bar), the exact ones counted (a ratchet below)
            const v = r.value.value as BandResult;
            if (sameUpTo(v.blocks.flatMap((c) => normals(ringsOf(p, 2, c))), want, 2)) tally.exact += 1;
            else expect(hausdorffCm(v.blocks.flatMap((c) => ringsOf(p, 2, c)), want.map(parseNormal)), at).toBeLessThanOrEqual(2 * Math.SQRT2 * 26);
          }
        }
      }
    }
    console.info(`dead-end sweep: ${JSON.stringify(tally)}`);
    expect(misses).toEqual([]);
    // not vacuous: the sweep meets closing chords within attractCm, as a piece's last point (the lost case) among them
    expect(tally.judged).toBeGreaterThanOrEqual(200);
    // the exact share, a ratchet on round S15's measure (372 of 376 judged)
    expect(tally.exact).toBeGreaterThanOrEqual(372);
    // round S9 (C-0417), the declared shift: no last chord within attractCm is left (see the sweep above); before the
    // round: nearLast ≥ 8
    expect(tally.nearLast).toBe(0);
  });
});

/**
 * How far from the spine-less edge the synthetic sweeps' dead-end lane stops (cm, perpendicular; round S15): a lane ending
 * ON the edge ends on its line, a junction end that takes no cap (kerb.ts `junctionEnd`), so the class's round cap meeting
 * the edge is a free end's — the lane's end back along it where it stands 40 cm off the edge, beyond the attraction that
 * would put it on the edge, its cap (radius ≥ 157 cm) still meeting the edge.
 */
const GAP_CM = 40;

/** The band outline edges (`band` rows at L3) with one L3 face on both sides. */
function danglingBand(p: Plat): string[] {
  const side = new Map<number, number>();
  for (let f = 0; f < p.slots.face[3].top; f += 1) {
    if (p.faces[3].kind[f] === 0xffff) continue;
    for (const ring of faceWalk(p, 3, f)) for (const h of ring) side.set(h, f);
  }
  const out: string[] = [];
  for (const [h, f] of side) {
    if ((h & 1) === 1 || side.get(h ^ 1) !== f) continue;
    if (!rowsOn(p, 'edge', h).some((r) => roleInfo(p.roles.kind[r]).name === 'band')) continue;
    out.push(`${String(p.vertices.x[p.halfEdges.origin[h]])},${String(p.vertices.y[p.halfEdges.origin[h]])}`);
  }
  return out.sort();
}

describe('N-57 (2), round S4: B-FUZZ networks where round S3 closed a dangling tip onto a far boundary vertex', () => {
  // the closing checker's sweep (checks/M0-a-09-s3.md, line 1): the insertion leaves the contact a minEdge off a
  // boundary edge that runs within minEdge of other geometry, the contact cannot stand at its place beside the tip
  // (§3.6's placement falls back onto the route piece's endpoint, C-0284), and round S3 drew the "closing chord" to
  // that endpoint whichever side it lay — 344 cm to (0, 1510), 96 cm to (954, 3997) — committing the block that far
  // beyond kerb(F); at seed 1012 the bogus kerb edge also made bandUnion refuse. Round S4 closes the tip along the kerb's
  // own run on F's boundary (or pins the contact first): every closing by kerb(F)
  // `within`: the block's Hausdorff bound from kerb(F). Case 3140: the contact cannot stand beside the tip, the tip is
  // closed along the run, the block within the tip's 25 cm (≤ attractCm). Case 3186: kerb(F)'s two contacts lie on one
  // L1 edge that runs within minEdge of the frame (a near-corner sliver), and either one placed makes the other
  // unplaceable (§3.6's placement (iii), C-0284: placed first at (7, 1167), (24, 382) falls back onto (31, 0); placed
  // first at (23, 382), (7, 1167) falls back onto (0, 1510)) — kerb(F) cannot stand in the arena; the along closing's
  // chord, pulled through the kerb vertex (49, 403) 25.8 cm from it (§3.6's stretch attraction), leaves kerb(F)'s corner
  // (24, 382) 32.65 cm from the block, within 2·√2·attractCm (C-0327 (3)'s bound)
  // (a chord with knots takes its profile, never its `hw`: the checker's report gives none for case 3186's third chord)
  const cases: { at: string; chords: Chord[]; face: number; far: [number, number]; within: number }[] = [
    {
      at: 'PLAT_FUZZ_SEED 20261011, case 3140',
      chords: [{ a: 11336, b: 7968, hw: 2, knots: [6, 10], ends: 'square' }, { a: 4005, b: 11071, hw: 61, knots: [516, 68], ends: 'square' }, { a: 9, b: 7960, hw: 8, knots: [159, 600], ends: 'square' }],
      face: 5,
      far: [954, 3997],
      within: 26,
    },
  ];
  it('PLAT_FUZZ_SEED 1012, case 3186 (round S9, J433\'s declared shift): face 1\'s read refuses KEPT_DEEP — its strip\'s run end (23, 397) on F\'s L1 edge, 23 cm from the L0 frame, placed 39 cm into F — insertChain\'s by cause, nothing written', () => {
    // before round S9: kerb(F)'s two contacts on that edge, either one placed made the other unplaceable, and the along
    // closing kept the block within 2·√2·attractCm of kerb(F); the dry-run lays the part on the arena, where the end
    // cannot stand (the L0 frame (0, 0)–(0, 1510) 23 cm away, F's edge (0, 1510)–(31, 0) 0.15 cm), so the read refuses
    refusedByDisplacement([{ a: 14490, b: 4331, hw: 327, knots: null, ends: 'square' }, { a: 12403, b: 31, hw: 20, knots: null, ends: 'square' }, { a: 7677, b: 3, hw: 1, knots: [61, 310], ends: 'round' }], 1, [23, 397], [62, 397], 39);
  });
  for (const c of cases) {
    it(`${c.at}: corridorUnion's block of face ${String(c.face)} stays within ${c.within.toFixed(1)} cm of kerb(F), never at the far vertex, and bandUnion commits`, () => {
      const { p, faces, table } = network(c.chords);
      const ws = widthsOf(table);
      const rk = readIn(p, 1, (o) => readKerb(o, c.face, ws));
      expect(rk.ok).toBe(true);
      const kerbF = (rk as { value: KerbRead }).value.kerb;
      const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
      healthy(p);
      expect(tilesExactly(p, 2, faces)).toEqual([]);
      expect(danglingKerb(p)).toEqual([]);
      // round S9 (C-0417), the declared shift: kerb(F) is read on the arena the commit meets (the dry-run), so the
      // contact stands where the read put it and no closing runs on the face (before the round: an 'along' closing;
      // the mechanism is pinned on a network that still reaches it, below); every closing stays by kerb(F)
      const closings = bandClosings(p);
      expect(closings.filter((q) => q.face === c.face)).toEqual([]);
      // bandUnion's kerb reads the chain's edge spines only (C-0380); corridorUnion's its vertex contacts too
      const kerbOf = (w: typeof ws, vertexContacts = true) => (f: number) => {
        const k = readIn(p, 1, (o) => readKerb(o, f, w, undefined, vertexContacts));
        return k.ok ? k.value.kerb : null;
      };
      expect(closingsBeyond(closings, kerbOf(ws))).toEqual([]);
      // the face's block: within the case's bound of kerb(F), never reaching round S3's far vertex
      const v = r.value as BandResult;
      const mine = v.blocks.filter((b) => p.faces[2].parent[b] === c.face);
      expect(mine.length).toBeGreaterThan(0);
      const rings = mine.flatMap((b) => ringsOf(p, 2, b));
      expect(hausdorffCm(rings, kerbF)).toBeLessThanOrEqual(c.within);
      // round S3's far vertex only where kerb(F) itself holds it (round S9: case 3140's read meets the arena vertex
      // (954, 3997) within attractCm of its part's edge, the declared shift's attractor; S8 ≡ S9 there)
      const at = (rs: readonly (readonly LatticePoint[])[]): boolean => rs.flat().some((q) => q.x === c.far[0] && q.y === c.far[1]);
      expect(at(rings)).toBe(at(kerbF));
      // bandUnion along the first chain at L3 commits (round S3 refused it at seed 1012), no band edge dangling
      const chain = firstBand(table);
      expect(chain.length).toBe(1);
      const b = tx(p, spec(3, AT_S9), (o) => bandUnion(o, chain, faces, 'band', 'band:1'));
      expect(b.ok, b.ok ? '' : `${b.code} ${b.detail}`).toBe(true);
      healthy(p);
      expect(tilesExactly(p, 3, faces)).toEqual([]);
      expect(danglingBand(p)).toEqual([]);
      expect(closingsBeyond(bandClosings(p), kerbOf(widthsOf({ [chain[0].ref.entity]: { halfWidthCm: chain[0].halfWidthCm, ends: chain[0].ends } }), false))).toEqual([]);
    });
  }
});

describe('N-57 (2): the closing along the kerb\'s run, on a network round S9\'s dry-run still sends there', () => {
  it('PLAT_FUZZ_SEED 1012, draw 2243 (a sweep of 10⁴ draws under round S9: 3 along closings, no other kind): face 2 closed along its run, by kerb(F)', () => {
    const chords: Chord[] = [{ a: 5179, b: 8038, hw: 16, knots: null, ends: 'square' }, { a: 15475, b: 6156, hw: 11, knots: [543, 492], ends: 'round' }];
    const { p, faces, table } = network(chords);
    const ws = widthsOf(table);
    const rk = readIn(p, 1, (o) => readKerb(o, 2, ws));
    expect(rk.ok).toBe(true);
    const kerbF = (rk as { value: KerbRead }).value.kerb;
    const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
    healthy(p);
    expect(tilesExactly(p, 2, faces)).toEqual([]);
    expect(danglingKerb(p)).toEqual([]);
    const closings = bandClosings(p);
    expect(closings.some((q) => q.face === 2 && q.kind === 'along')).toBe(true);
    const kerbOf = (f: number) => {
      const k = readIn(p, 1, (o) => readKerb(o, f, ws));
      return k.ok ? k.value.kerb : null;
    };
    expect(closingsBeyond(closings, kerbOf)).toEqual([]);
    const v = r.value as BandResult;
    const mine = v.blocks.filter((b) => p.faces[2].parent[b] === 2);
    expect(mine.length).toBeGreaterThan(0);
    expect(hausdorffCm(mine.flatMap((b) => ringsOf(p, 2, b)), kerbF)).toBeLessThanOrEqual(2 * Math.SQRT2 * 26);
  });
});

describe('N-57 (2), round S4: what the closing leaves alone, and the sliver it folds (B-FUZZ networks, PLAT_FUZZ_SEED 1012)', () => {
  it('case 3070 (round S9, J433\'s declared shift): face 0\'s read refuses KEPT_DEEP — way:1\'s run end (12, 1809) on F\'s L1 edge, 12 cm from the L0 frame, placed 25 cm into F — insertChain\'s by cause, nothing written', () => {
    // before round S9: face 1's piece's contact (12, 1794) was left across F's boundary in face 0 and the commit kept
    // every face's block (face 0 within 13 cm of its kerb); the dry-run lays face 0's parts on the arena, where way:1's
    // strip end cannot stand on F's edge (4, 2293)–(41, 0) (0.19 cm) within minEdge of the L0 frame (0, 0)–(0, 2318)
    // (12 cm): placed 25 cm into F, the strip's face is left unclosed and the read refuses
    refusedByDisplacement([{ a: 13411, b: 41, hw: 6, knots: null, ends: 'square' }, { a: 2607, b: 13682, hw: 536, knots: [598, 331], ends: 'round' }, { a: 4863, b: 11579, hw: 328, knots: [554, 432], ends: 'square' }], 0, [12, 1809], [37, 1809], 25);
  });

  it('pinned first where the contact cannot stand within attractCm: refused E_INVARIANT naming the contact, the arena put back (never a far pin)', () => {
    // round S5 (checks/M0-a-09-s4.md, line 1's "where neither works, refuse E_INVARIANT"): through bandCore's `pinFirst`
    // seam, a piece pinned first at a contact on F's boundary where no vertex can stand within attractCm of it; the piece
    // is no sliver to fold, so the op refuses fail-safe rather than commit a block reaching a far vertex. Round S9
    // (C-0417), the declared shift: the pre-S9 input (seed 1012, case 4722, face 4's contact (11, 1490)) no longer
    // reaches it — the dry-run reads that face on the arena (its kept face holding way:1's strip: KEPT_DEEP, refused) —
    // so the seam is pinned on the network a sweep of seed 20261011's draws found reaching it (draw 1110, face 0,
    // piece 0 pinned at its first end, the contact (15, 887))
    const chords: Chord[] = [{ a: 10602, b: 8022, hw: 44, knots: null, ends: 'square' }, { a: 14369, b: 33, hw: 7, knots: null, ends: 'square' }, { a: 15061, b: 19, hw: 587, knots: [14, 240], ends: 'square' }];
    const { p, faces, table } = network(chords);
    const ws = widthsOf(table);
    // the precondition: face 0's piece 0 is open and starts on the contact (15, 887)
    const rk = readIn(p, 1, (o) => readKerb(o, 0, ws));
    expect(rk.ok).toBe(true);
    const piece = outlinePieces((rk as { value: KerbRead }).value)[0];
    expect(piece.closed).toBe(false);
    expect(piece.points[0]).toEqual(pt(15, 887));
    const b0 = state(p);
    const engine = (o: unknown) =>
      bandCore(o as Parameters<typeof bandCore>[0], faces, { widths: ws, edgeRole: 'kerb', entityOf: (f) => idOf(p, p.faces[1].owner[f]), owner: null, pinFirst: [[0, 0, 0]], vertexContacts: true });
    const r = tx(p, spec(2, AT_S9), engine);
    expect(r.ok, r.ok ? 'committed: the contact pinned off attractCm' : '').toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toContain('piece 0 of the face 0 cannot pin its contact at (15, 887) within attractCm');
    expect(state(p)).toBe(b0);
    // atomic inside a batch that goes on: the batch commits nothing
    const again = commit(p, 2, (o) => {
      const c = engine(o);
      expect(c.ok).toBe(false);
      if (!c.ok) expect(c.detail).toContain('cannot pin its contact at (15, 887)');
      return { ok: true, value: null, warnings: [] };
    }, AT_S9);
    expect(again.record).toBeNull();
    expect(state(p)).toBe(b0);
    // without the seam the op commits (the families never reach the refusal)
    const plain = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
    expect(plain.ok, plain.ok ? '' : `${plain.code} ${plain.detail}`).toBe(true);
  });

  it('case 4722 (pre-S9: face 4\'s contact (11, 1490)): the dry-run\'s kept face would hold way:1\'s strip, so the read refuses KEPT_DEEP, nothing written (N-45 (a))', () => {
    // way:1's strip run starts on F's west edge, within attractCm of way:0's strip (half-width 23, folded onto that
    // edge): the insertion places it 25 cm into F, the strip's laid edges do not close round it, and the face its
    // interior shares with the kept region is read whole at one point — a 322 cm wide band read as kerb, refused
    const chords: Chord[] = [{ a: 13590, b: 27, hw: 23, knots: null, ends: 'square' }, { a: 14162, b: 4998, hw: 30, knots: [322, 91], ends: 'square' }, { a: 10493, b: 4928, hw: 7, knots: null, ends: 'square' }];
    const { p, faces, table } = network(chords);
    const ws = widthsOf(table);
    const b0 = state(p);
    const rk = readIn(p, 1, (o) => readKerb(o, 4, ws));
    expect(rk.ok).toBe(false);
    if (!rk.ok) expect(rk.detail).toBe(KEPT_DEEP);
    const c = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
    expect(c.ok).toBe(false);
    if (!c.ok) expect(c.detail).toBe(KEPT_DEEP);
    expect(state(p)).toBe(b0);
    // J433: insertChain's by cause — the run end (11, 1490) on F's L1 edge (7, 1814)–(27, 0), 11 cm from the L0 frame,
    // placed 25 cm into F (class (a))
    refusedByDisplacement(chords, 4, [11, 1490], [36, 1490], 25);
  });

  it('case 367: a kerb sliver 10.8 cm thin whose piece no closing can close is folded onto F\'s boundary — F all band, the op commits', () => {
    // face 2 is a 41 cm sliver against the frame; its kerb(F) a triangle at most 22 cm tall, every point of its piece
    // within 10.8 cm of F's boundary. The insertion leaves the piece's contact (1717, 12) at (1717, 38), across F's
    // boundary, and no vertex can stand at the contact (the sliver's edge runs within minEdge of the frame): the
    // pre-round engine committed it dangling (a block 103 cm beyond kerb(F)); folded (C-0218 (7)), F is one band face
    const chords: Chord[] = [{ a: 5448, b: 10167, hw: 338, knots: null, ends: 'round' }, { a: 6454, b: 2291, hw: 28, knots: [592, 384], ends: 'round' }, { a: 1452, b: 4119, hw: 30, knots: null, ends: 'round' }];
    const { p, faces, table } = network(chords);
    const ws = widthsOf(table);
    const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
    healthy(p);
    expect(tilesExactly(p, 2, faces)).toEqual([]);
    // round S9 (C-0417), the declared shift: the dry-run reads face 2's sliver on the arena, where its strip edges are
    // attracted onto F's own L1 edges — kerb(F) is empty, F all band with no closing (before the round: the commit
    // folded the piece, 'folded')
    const closings = bandClosings(p);
    expect(closings).toEqual([]);
    const kerbOf = (f: number) => {
      const k = readIn(p, 1, (o) => readKerb(o, f, ws));
      return k.ok ? k.value.kerb : null;
    };
    expect(kerbOf(2)).toEqual([]);
    const v = r.value as BandResult;
    expect(v.blocks.filter((b) => p.faces[2].parent[b] === 2)).toEqual([]);
    expect(v.wholeBand).toContain(2);
    // the band union along the first chain commits on it
    const chain = firstBand(table);
    const b = tx(p, spec(3, AT_S9), (o) => bandUnion(o, chain, faces, 'band', 'band:1'));
    expect(b.ok, b.ok ? '' : `${b.code} ${b.detail}`).toBe(true);
  });
});
