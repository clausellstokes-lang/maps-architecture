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
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { faceWalk, idOf, roleIdOf, roleInfo, rowsOn, type FaceId, type Plat } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { tx } from '../../../src/tx/index.js';
import { readKerb, type KerbRead } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandClosings, bandCore, bandUnion, outlinePieces, type BandResult } from '../../../src/arr/bandUnion.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { emptyArena, ins, tx as shell } from '../../insert/step3-5/support.js';
import { AT_S9, closingsBeyond, commit, firstBand, framed, hausdorffCm, healthy, network, normals, own, pt, ringsOf, spec, state, tilesExactly, TIMEOUT, widthsOf, type Chord } from './support.js';

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

describe('N-57 (2): a kerb piece closing on a spine-less edge by a chord within attractCm', () => {
  for (const fx of FIXTURES) {
    it(`face ${String(fx.face)} (integrated seed ${String(fx.seed)}, ${fx.block}): corridorUnion's block ≡ kerb(F), Hausdorff 0, no kerb edge with one face on both sides`, () => {
      const { p, face, widths } = build(fx);
      const rk = readKerb(p, face, widths);
      expect(rk.ok).toBe(true);
      const read = (rk as { value: KerbRead }).value;
      // the fixture is the smoke's face: its route ring and kerb(F) exactly as read there
      expect(pairs(read.rings[0])).toEqual(fx.ring);
      expect(read.kerb.map(pairs)).toEqual(fx.kerb);
      // the precondition: the lane's piece closes on the spine-less edge by a chord within attractCm
      const open = outlinePieces(read).filter((q) => !q.closed);
      expect(open.length).toBe(1);
      const q = open[0].points;
      const chord = Math.hypot(q[q.length - 1].x - q[q.length - 2].x, q[q.length - 1].y - q[q.length - 2].y);
      expect(chord).toBeGreaterThan(25);
      expect(chord).toBeLessThanOrEqual(26);
      const before = normals(read.kerb);
      const r = commit(p, 2, (o) => corridorUnion(o, [face], widths), AT_S9);
      healthy(p);
      const v = r.value as BandResult;
      expect(danglingKerb(p)).toEqual([]);
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
    const fx = FIXTURES[0];
    const { p, face, widths } = build(fx);
    const b0 = state(p);
    // the piece without its contact: it ends on the vertex the insertion attracted the contact onto
    const lost = (read: KerbRead): { points: LatticePoint[]; closed: boolean }[] =>
      outlinePieces(read).map((q) => (q.closed ? q : { points: q.points.slice(0, -1), closed: false }));
    const r = tx(p, spec(2, AT_S9), (o) => {
      const t = o as Parameters<typeof bandCore>[0];
      return bandCore(t, [face], { widths, edgeRole: 'kerb', entityOf: () => fx.owner, owner: null, pieces: lost });
    });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    // the post-condition: the piece named, ending on the dangling tip the insertion attracted the contact onto
    expect(r.detail).toContain(`piece 0 of the face ${String(face)} ends on a dangling tip at (50580, -47042)`);
    expect(state(p)).toBe(b0);
    // the op is atomic inside a batch that goes on: its refusal leaves the batch as the op found it, so the batch
    // commits nothing (M0-a-07's op savepoint)
    const again = commit(p, 2, (o) => {
      const c = bandCore(o as Parameters<typeof bandCore>[0], [face], { widths, edgeRole: 'kerb', entityOf: () => fx.owner, owner: null, pieces: lost });
      expect(c.ok).toBe(false);
      return { ok: true, value: null, warnings: [] };
    }, AT_S9);
    expect(again.record).toBeNull();
    expect(state(p)).toBe(b0);
  });

  it('the fallback, pinned first (N-57 (2)\'s own mechanism): face 871\'s contact placed before its piece, the vertex beside it dropped — the block within attractCm of kerb(F)', () => {
    // reached through bandCore's `pinFirst` seam (on the families no end needs it: the closing at the contact or along
    // the kerb's run serves them): the contact pinned on F's boundary first, the piece's vertex 25.94 cm from it dropped,
    // the piece inserted onto the pin — the error at most attractCm, the dropped vertex's (C-0327 (2): 1.84 cm)
    const fx = FIXTURES[0];
    const { p, face, widths } = build(fx);
    const rk = readKerb(p, face, widths);
    expect(rk.ok).toBe(true);
    const read = (rk as { value: KerbRead }).value;
    const open = outlinePieces(read).findIndex((q) => !q.closed);
    expect(open).toBe(0);
    const q = outlinePieces(read)[open].points;
    const r = tx(p, spec(2, AT_S9), (o) => bandCore(o as Parameters<typeof bandCore>[0], [face], { widths, edgeRole: 'kerb', entityOf: () => fx.owner, owner: null, pinFirst: [[face, open, 1]] }));
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
    // ending on it at x = 2000 + δ (δ 0 or 13 cm), arriving from the upper left at α = 10°–20° to the edge: on the obtuse
    // side the round cap meets the edge, its last chord clipped; mirrored (y → 4000 − y) or not. Judged: every case
    // whose contact on the edge closes a chord of 20–40 cm
    const tally = { cases: 0, judged: 0, near: 0, nearLast: 0 };
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
              const T = (q: [number, number]): LatticePoint => pt(q[0], mirror ? 4000 - q[1] : q[1]);
              const p = framed();
              commit(p, 1, (o) => insertChain(o, [T([0, A[1]]), T(A), T(E), T(B), T([4000, B[1]])], [{ role: 'way', entity: 'way:edge' }], 'mandatory'));
              commit(p, 1, (o) => insertChain(o, [T([L[0], 4000]), T(L), T(E)], [{ role: 'way', entity: 'way:lane' }], 'mandatory'));
              const faces = own(p, 'district:1', [[3900, 3900], [100, 3900]].map(([x, y]) => [x, mirror ? 4000 - y : y] as [number, number]));
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
                const rk = readKerb(p, f, ws);
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
              const v = r.value.value as BandResult;
              if (nearLast) expect(sameUpTo(v.blocks.flatMap((c) => normals(ringsOf(p, 2, c))), want, 2), at).toBe(true);
            }
          }
        }
      }
    }
    console.info(`dead-end sweep at 10–20°: ${JSON.stringify(tally)}`);
    expect(misses).toEqual([]);
    expect(tally.judged).toBeGreaterThanOrEqual(100);
    expect(tally.nearLast).toBeGreaterThanOrEqual(1);
  });

  it('a synthetic dead-end lane whose round cap meets a spine-less edge slanted 10–20°, the last chord swept 20–40 cm: every case closes', { timeout: TIMEOUT }, () => {
    // the frame [0, 4000]²; a spine-less edge from (1500, 0) up at β off the vertical, a lane from the frame's west side
    // ending on it at y = 2000 or 2017, near perpendicular to it (turned by φ); the arena mirrored (y → 4000 − y) or not, so the
    // contact is a piece's last point (the case the insertion lost) or its first. Judged: every case whose contact on
    // the slanted edge closes a chord of 20–40 cm
    const tally = { cases: 0, judged: 0, near: 0, nearLast: 0 };
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
            const T = (q: [number, number]): LatticePoint => pt(q[0], mirror ? 4000 - q[1] : q[1]);
            const p = framed();
            commit(p, 1, (o) => insertChain(o, [T(A), T(E), T(B)], [{ role: 'way', entity: 'way:edge' }], 'mandatory'));
            commit(p, 1, (o) => insertChain(o, [T([0, L[1]]), T(L), T(E)], [{ role: 'way', entity: 'way:lane' }], 'mandatory'));
            const faces = own(p, 'district:1', [[200, 200], [200, 3800]]);
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
              const rk = readKerb(p, f, ws);
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
            const v = r.value.value as BandResult;
            if (nearLast) expect(sameUpTo(v.blocks.flatMap((c) => normals(ringsOf(p, 2, c))), want, 2), at).toBe(true);
          }
        }
      }
    }
    console.info(`dead-end sweep: ${JSON.stringify(tally)}`);
    expect(misses).toEqual([]);
    // not vacuous: the sweep meets closing chords within attractCm, as a piece's last point (the lost case) among them
    expect(tally.judged).toBeGreaterThanOrEqual(200);
    expect(tally.nearLast).toBeGreaterThanOrEqual(8);
  });
});

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
      at: 'PLAT_FUZZ_SEED 1012, case 3186',
      chords: [{ a: 14490, b: 4331, hw: 327, knots: null, ends: 'square' }, { a: 12403, b: 31, hw: 20, knots: null, ends: 'square' }, { a: 7677, b: 3, hw: 1, knots: [61, 310], ends: 'round' }],
      face: 1,
      far: [0, 1510],
      within: 2 * Math.SQRT2 * 26,
    },
    {
      at: 'PLAT_FUZZ_SEED 20261011, case 3140',
      chords: [{ a: 11336, b: 7968, hw: 2, knots: [6, 10], ends: 'square' }, { a: 4005, b: 11071, hw: 61, knots: [516, 68], ends: 'square' }, { a: 9, b: 7960, hw: 8, knots: [159, 600], ends: 'square' }],
      face: 5,
      far: [954, 3997],
      within: 26,
    },
  ];
  for (const c of cases) {
    it(`${c.at}: corridorUnion's block of face ${String(c.face)} stays within ${c.within.toFixed(1)} cm of kerb(F), never at the far vertex, and bandUnion commits`, () => {
      const { p, faces, table } = network(c.chords);
      const ws = widthsOf(table);
      const rk = readKerb(p, c.face, ws);
      expect(rk.ok).toBe(true);
      const kerbF = (rk as { value: KerbRead }).value.kerb;
      const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
      healthy(p);
      expect(tilesExactly(p, 2, faces)).toEqual([]);
      expect(danglingKerb(p)).toEqual([]);
      // the closing ran on the face, along the kerb's run, and every closing stays by kerb(F)
      const closings = bandClosings(p);
      expect(closings.some((q) => q.face === c.face && q.kind === 'along')).toBe(true);
      const kerbOf = (w: typeof ws) => (f: number) => {
        const k = readKerb(p, f, w);
        return k.ok ? k.value.kerb : null;
      };
      expect(closingsBeyond(closings, kerbOf(ws))).toEqual([]);
      // the face's block: within the case's bound of kerb(F), never reaching round S3's far vertex
      const v = r.value as BandResult;
      const mine = v.blocks.filter((b) => p.faces[2].parent[b] === c.face);
      expect(mine.length).toBeGreaterThan(0);
      const rings = mine.flatMap((b) => ringsOf(p, 2, b));
      expect(hausdorffCm(rings, kerbF)).toBeLessThanOrEqual(c.within);
      expect(rings.flat().some((q) => q.x === c.far[0] && q.y === c.far[1])).toBe(false);
      // bandUnion along the first chain at L3 commits (round S3 refused it at seed 1012), no band edge dangling
      const chain = firstBand(table);
      expect(chain.length).toBe(1);
      const b = tx(p, spec(3, AT_S9), (o) => bandUnion(o, chain, faces, 'band', 'band:1'));
      expect(b.ok, b.ok ? '' : `${b.code} ${b.detail}`).toBe(true);
      healthy(p);
      expect(tilesExactly(p, 3, faces)).toEqual([]);
      expect(danglingBand(p)).toEqual([]);
      expect(closingsBeyond(bandClosings(p), kerbOf(widthsOf({ [chain[0].ref.entity]: { halfWidthCm: chain[0].halfWidthCm, ends: chain[0].ends } })))).toEqual([]);
    });
  }
});

describe('N-57 (2), round S4: what the closing leaves alone, and the sliver it folds (B-FUZZ networks, PLAT_FUZZ_SEED 1012)', () => {
  it('case 3070: a tip the insertion left across F\'s boundary is not closed from F — the neighbour face\'s piece reaches it, every face keeps its block', () => {
    // face 1 (a sliver along the frame) has its kerb piece's contact (12, 1794) on the edge it shares with face 0; the
    // insertion leaves that end at (38, 1794), inside face 0, where face 0's own piece ends later. Closed from face 1
    // (round S4's first cut), the chord's band side fell in face 0 and face 0 lost its block; left alone, the commit is
    // the pre-round engine's (face 0 within 13 cm of its kerb)
    const chords: Chord[] = [{ a: 13411, b: 41, hw: 6, knots: null, ends: 'square' }, { a: 2607, b: 13682, hw: 536, knots: [598, 331], ends: 'round' }, { a: 4863, b: 11579, hw: 328, knots: [554, 432], ends: 'square' }];
    const { p, faces, table } = network(chords);
    const ws = widthsOf(table);
    const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
    healthy(p);
    expect(tilesExactly(p, 2, faces)).toEqual([]);
    expect(danglingKerb(p)).toEqual([]);
    expect(bandClosings(p)).toEqual([]);
    const v = r.value as BandResult;
    for (const f of [0, 1]) {
      const k = readKerb(p, f, ws);
      expect(k.ok).toBe(true);
      const mine = v.blocks.filter((b) => p.faces[2].parent[b] === f);
      expect(mine.length, `face ${String(f)}`).toBe(1);
      expect(hausdorffCm(mine.flatMap((b) => ringsOf(p, 2, b)), (k as { value: KerbRead }).value.kerb)).toBeLessThanOrEqual(14);
    }
  });

  it('case 4722, pinned first where the contact cannot stand within attractCm: refused E_INVARIANT naming the contact, the arena put back (never a far pin)', () => {
    // round S5 (checks/M0-a-09-s4.md, line 1's "where neither works, refuse E_INVARIANT"): through bandCore's `pinFirst`
    // seam, face 4's piece 0 pinned first at its last end, the contact (11, 1490) on F's boundary. No vertex can stand
    // within attractCm of it (§3.6's placement falls back onto (7, 1814), 324.02 cm off: round S3's far pin), and the
    // piece is no sliver to fold, so the op refuses fail-safe rather than commit a block reaching that far vertex
    const chords: Chord[] = [{ a: 13590, b: 27, hw: 23, knots: null, ends: 'square' }, { a: 14162, b: 4998, hw: 30, knots: [322, 91], ends: 'square' }, { a: 10493, b: 4928, hw: 7, knots: null, ends: 'square' }];
    const { p, faces, table } = network(chords);
    const ws = widthsOf(table);
    // the precondition: face 4's piece 0 is open and ends on the contact (11, 1490)
    const rk = readKerb(p, 4, ws);
    expect(rk.ok).toBe(true);
    const piece = outlinePieces((rk as { value: KerbRead }).value)[0];
    expect(piece.closed).toBe(false);
    expect(piece.points[piece.points.length - 1]).toEqual(pt(11, 1490));
    const b0 = state(p);
    const engine = (o: unknown) =>
      bandCore(o as Parameters<typeof bandCore>[0], faces, { widths: ws, edgeRole: 'kerb', entityOf: (f) => idOf(p, p.faces[1].owner[f]), owner: null, pinFirst: [[4, 0, 1]] });
    const r = tx(p, spec(2, AT_S9), engine);
    expect(r.ok, r.ok ? 'committed: the contact pinned off attractCm' : '').toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toContain('piece 0 of the face 4 cannot pin its contact at (11, 1490) within attractCm');
    expect(state(p)).toBe(b0);
    // atomic inside a batch that goes on: the batch commits nothing
    const again = commit(p, 2, (o) => {
      const c = engine(o);
      expect(c.ok).toBe(false);
      if (!c.ok) expect(c.detail).toContain('cannot pin its contact at (11, 1490)');
      return { ok: true, value: null, warnings: [] };
    }, AT_S9);
    expect(again.record).toBeNull();
    expect(state(p)).toBe(b0);
    // without the seam the op commits (the families never reach the refusal: the closing along the kerb's run serves it)
    const plain = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
    expect(plain.ok, plain.ok ? '' : `${plain.code} ${plain.detail}`).toBe(true);
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
    const closings = bandClosings(p);
    expect(closings.map((c) => [c.kind, c.face, c.piece])).toEqual([['folded', 2, 0]]);
    const kerbOf = (f: number) => {
      const k = readKerb(p, f, ws);
      return k.ok ? k.value.kerb : null;
    };
    expect(closingsBeyond(closings, kerbOf)).toEqual([]);
    const v = r.value as BandResult;
    expect(v.blocks.filter((b) => p.faces[2].parent[b] === 2)).toEqual([]);
    // the band union along the first chain commits on it
    const chain = firstBand(table);
    const b = tx(p, spec(3, AT_S9), (o) => bandUnion(o, chain, faces, 'band', 'band:1'));
    expect(b.ok, b.ok ? '' : `${b.code} ${b.detail}`).toBe(true);
  });
});
