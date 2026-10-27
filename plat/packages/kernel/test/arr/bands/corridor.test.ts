// M0-a-09: corridorUnion (§3.4; §3.7 *The kerb, defined once*, *The same functions on every arena*; §2.2 rule 1's L2;
// §4.6's contract S8 ≡ S9; §13.1 "corridorUnion faces disjoint and covering"; §13.2 "S8's working block ≡ S9's committed
// block, Hausdorff 0" — run here on synthetic L1 faces, re-run on the spike's faces by M0-c-06). The block S8 reads on
// the open overlay and the block S9 commits are compared by their rings' normal forms (equal normal forms bound one
// point set: Hausdorff 0).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { createPlat, idOf, isVertexLive, roleInfo, rowsOn, type FaceId, type Plat } from '../../../src/arena/index.js';
import { attachIndex } from '../../../src/index/index.js';
import { err, LATTICE, ok } from '../../../src/num/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { setOwner, tx } from '../../../src/tx/index.js';
import type { Cm, PlatKey, StageId } from '../../../src/types/index.js';
import { kerb, readKerb } from '../../../src/arr/kerb.js';
import { corridorUnion, opCorridorUnion } from '../../../src/arr/corridorUnion.js';
import { outlinePieces, type BandResult } from '../../../src/arr/bandUnion.js';
import { booleans } from '../../../src/arr/booleans.js';
import { CELLS } from '../../insert/step1-2/support.js';
import { lin } from '../../tx/support.js';
import {
  AT_S9,
  area2Of,
  attemptAt,
  commit,
  edgesWithRole,
  faceAt,
  framed,
  hausdorffCm,
  healthy,
  normalHot,
  normals,
  own,
  profile,
  pt,
  readIn,
  ringsOf,
  spec,
  splitsBetweenBlocks,
  splitsBeyondReach,
  state,
  tilesExactly,
  TIMEOUT,
  way,
  widthsOf,
} from './support.js';

const W = widthsOf({ 'way:1': 300, 'way:2': 300 });

/** Each block's rings as normal forms, by its L1 face. */
/**
 * The outline of a union of rings that meet only along shared edges (blocks of one face): every directed edge whose
 * reverse is another ring's dropped, the rest chained into rings (each edge's end to the edge leaving it).
 */
function unionOutline(rings: readonly (readonly ReturnType<typeof pt>[])[]): ReturnType<typeof pt>[][] {
  const key = (q: { x: number; y: number }): string => `${String(q.x)},${String(q.y)}`;
  const edges = new Map<string, [ReturnType<typeof pt>, ReturnType<typeof pt>]>();
  for (const r of rings) for (let i = 0; i < r.length; i += 1) edges.set(`${key(r[i])}>${key(r[(i + 1) % r.length])}`, [r[i], r[(i + 1) % r.length]]);
  for (const k of [...edges.keys()]) {
    const [a, b] = k.split('>');
    if (edges.has(`${b}>${a}`)) {
      edges.delete(k);
      edges.delete(`${b}>${a}`);
    }
  }
  const from = new Map<string, [ReturnType<typeof pt>, ReturnType<typeof pt>]>();
  for (const e of edges.values()) from.set(key(e[0]), e);
  const out: ReturnType<typeof pt>[][] = [];
  while (from.size > 0) {
    const [start] = from.keys();
    const ring: ReturnType<typeof pt>[] = [];
    let at = start;
    while (from.has(at)) {
      const e = from.get(at) as [ReturnType<typeof pt>, ReturnType<typeof pt>];
      from.delete(at);
      ring.push(e[0]);
      at = key(e[1]);
    }
    out.push(ring);
  }
  return out;
}

function blocksByFace(p: Plat, faces: readonly FaceId[], r: BandResult): Map<FaceId, string[]> {
  const out = new Map<FaceId, string[]>();
  for (const f of faces) out.set(f, []);
  for (const b of r.blocks) {
    let g = b;
    g = p.faces[2].parent[g];
    out.get(g)?.push(...normals(ringsOf(p, 2, b)));
  }
  for (const [f, list] of out) out.set(f, list.sort());
  return out;
}

describe('corridorUnion (§3.4, §3.7)', () => {
  it('commits kerb(F) at L2: kerb edges, the corner splits, the strips, junction wedges and built blocks of a crossing', () => {
    const p = framed();
    way(p, 'way:1', [[0, 2000], [4000, 2000]]);
    way(p, 'way:2', [[2000, 0], [2000, 4000]]);
    const faces = own(p, 'district:1', [[1000, 1000], [3000, 1000], [1000, 3000], [3000, 3000]]);
    const r = commit(p, 2, (o) => corridorUnion(o, faces, W), AT_S9);
    healthy(p);
    const v = r.value as BandResult;
    expect(v.blocks.length).toBe(4);
    expect(v.wedges.length).toBe(4);
    expect(v.strips.length).toBe(8);
    expect(v.band).toEqual([...v.strips, ...v.wedges].sort((a, b) => v.band.indexOf(a) - v.band.indexOf(b)));
    expect(v.whole).toEqual([]);
    expect(v.wholeBand).toEqual([]);
    // the wedges are the junction's four corner squares (half the crossed street's width short of J on each side)
    expect(v.wedges.map((w) => normals(ringsOf(p, 2, w))[0]).sort()).toEqual(
      ['1700,1700 2000,1700 2000,2000 1700,2000', '2000,1700 2300,1700 2300,2000 2000,2000', '1700,2000 2000,2000 2000,2300 1700,2300', '2000,2000 2300,2000 2300,2300 2000,2300'].sort(),
    );
    expect(edgesWithRole(p, 'corridor_split').length).toBe(8);
    // every kerb and corridor_split edge is an L2 edge carrying the L1 face's owner
    for (let e = 0; e < p.slots.pair.top; e += 1) {
      if (p.halfEdges.origin[2 * e] < 0) continue;
      for (const row of rowsOn(p, 'edge', 2 * e)) {
        const name = roleInfo(p.roles.kind[row]).name;
        if (name !== 'kerb' && name !== 'corridor_split') continue;
        expect(p.halfEdges.level[e]).toBe(2);
        expect(p.roles.level[row]).toBe(2);
        expect(idOf(p, p.roles.entity[row])).toBe('district:1');
      }
    }
    expect(tilesExactly(p, 2, faces)).toEqual([]);
    // the strips and wedges inherit the L1 face's owner until the stage re-owns them (§2.2 rule 4)
    for (const f of [...v.band, ...v.blocks]) expect(idOf(p, p.faces[2].owner[f])).toBe('district:1');
  });

  it('§13.2: S8’s working block (kerb on the open overlay) ≡ S9’s committed block, Hausdorff 0', () => {
    const p = framed();
    way(p, 'way:1', [[0, 2000], [4000, 2000]], [0, 1]);
    way(p, 'way:2', [[2600, 0], [2600, 4000]]);
    const [low] = own(p, 'district:1', [[1000, 1000]]);
    const ws = widthsOf({ 'way:1': profile([200, 600]), 'way:2': 350, 'lane:1': 150, 'lane:2': 120 });
    // S8: in its district batch it inserts a bent lane and then a straight one at L1 as T-junctions, and reads its
    // children's kerbs on the open overlay
    const s8 = new Map<string, string[]>();
    commit(p, 1, (o) => {
      const a = insertChain(o, [pt(900, 0), pt(1400, 900), pt(1100, 2000)], [{ role: 'way', entity: 'lane:1' }], 'mandatory');
      if (!a.ok) return err(a.code, a.detail);
      const b = insertChain(o, [pt(0, 900), pt(1290, 720)], [{ role: 'way', entity: 'lane:2' }], 'mandatory');
      if (!b.ok) return err(b.code, b.detail);
      for (const [x, y] of [[300, 300], [300, 1500], [2000, 1000]] as const) {
        const f = faceAt(p, 1, x, y);
        const k = kerb(o, f, ws);
        if (!k.ok) return err(k.code, k.detail);
        s8.set(`${String(x)},${String(y)}`, normals(k.value));
      }
      return ok(null);
    });
    expect(low).toBeGreaterThanOrEqual(0);
    const kids = [[300, 300], [300, 1500], [2000, 1000]].map(([x, y]) => faceAt(p, 1, x, y));
    commit(p, 1, (o) => setOwner(o, kids, 'district:1'));
    const r = commit(p, 2, (o) => corridorUnion(o, kids, ws), AT_S9);
    healthy(p);
    const blocks = blocksByFace(p, kids, r.value as BandResult);
    const keys = ['300,300', '300,1500', '2000,1000'];
    kids.forEach((f, i) => {
      expect(s8.get(keys[i])?.length).toBeGreaterThan(0);
      expect(blocks.get(f)).toEqual(s8.get(keys[i]));
    });
    expect(tilesExactly(p, 2, kids)).toEqual([]);
  });

  it('§13.2 across two faces (N-52 (5), round S9): F’s and G’s reads in one batch give one contact on their shared edge, and one S9 batch commits both exactly', () => {
    // T = way:t along y = 2000 (half-width 300: its inner edge above at y = 2300); F and G the faces above it, either side
    // of the spine-less edge e from v = (2000, 2000) slanting up to (2600, 4000), so T's strip corner (2000, 2300) lies in
    // F and its inner edge meets e at the contact c = (2090, 2300); F holds a spine-less stub from e at (2180, 2600) down
    // to u = (2050, 2318), 18 cm off T's inner edge, 40 cm beside c (not on e: 43 cm from it). The read of F and of G is a
    // dry-run on the one arena, which holds u: both meet e at c. Before round S9 a scratch overlay of F's operands routed
    // the inner edge through u and on to e at (2095, 2318), while G's (which never held u) met e at c — 19 cm apart, within
    // attractCm — and the commit attracted G's kerb onto F's contact: G's block was no longer kerb(G) (the pin is red
    // under the pre-S9 engine, the lane's self-check)
    const p = framed();
    way(p, 'way:t', [[0, 2000], [4000, 2000]]);
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2600, 4000)], [{ role: 'district_bound', entity: 'district:e' }], 'mandatory'));
    commit(p, 1, (o) => insertChain(o, [pt(2180, 2600), pt(2050, 2318)], [{ role: 'district_bound', entity: 'district:u' }], 'mandatory'));
    const [F, G] = own(p, 'district:1', [[1000, 3000], [3600, 3000]]);
    const ws = widthsOf({ 'way:t': 300 });
    const onLineE = (q: { x: number; y: number }): boolean => (q.x - 2000) * 2000 - (q.y - 2000) * 600 === 0 && q.y > 2000 && q.y < 2600;
    const s8 = new Map<FaceId, string[]>();
    const onE = new Map<FaceId, string[]>();
    commit(p, 1, (o) => {
      for (const f of [F, G]) {
        const k = kerb(o, f, ws);
        if (!k.ok) return err(k.code, k.detail);
        s8.set(f, normals(k.value));
        onE.set(f, k.value.flat().filter(onLineE).map((q) => `${String(q.x)},${String(q.y)}`));
      }
      return ok(null);
    });
    // the precondition: u is a vertex of F's boundary within attractCm of T's inner edge, not on e, not G's
    expect(ringsOf(p, 1, F).flat().some((q) => q.x === 2050 && q.y === 2318)).toBe(true);
    expect(ringsOf(p, 1, G).flat().some((q) => q.x === 2050 && q.y === 2318)).toBe(false);
    // one contact on e, read alike from both faces
    expect(onE.get(F)).toEqual(['2090,2300']);
    expect(onE.get(G)).toEqual(onE.get(F));
    // corridorUnion of both in one L2 batch commits both exactly (Hausdorff 0 by normal forms): F's blocks — the stub
    // splits F's at L2 into two, the triangle u, (2180, 2600) and c — tile kerb(F) exactly, their outline its ring
    const r = commit(p, 2, (o) => corridorUnion(o, [F, G], ws), AT_S9);
    healthy(p);
    const v = r.value as BandResult;
    const outline = (f: FaceId): string[] => normals(unionOutline(v.blocks.filter((b) => p.faces[2].parent[b] === f).flatMap((b) => ringsOf(p, 2, b))));
    expect(v.blocks.filter((b) => p.faces[2].parent[b] === F).length).toBe(2);
    expect(outline(F)).toEqual(s8.get(F));
    expect(outline(G)).toEqual(s8.get(G));
    expect(tilesExactly(p, 2, [F, G])).toEqual([]);
  });

  it('§13.2 at a junction where F turns away: the split end spliced into kerb(F) is in S8’s working block and in S9’s committed block', () => {
    // two ways meeting end to end at a bend J = (2100, 2050) on slanted lines; the face below and right of them wraps
    // round J (F turns away there, C-0212 (4)): its corridor_split runs from J to the nearest kerb point, which lies on
    // the round join between two kerb vertices, so readKerb splices it into kerb(F) as a vertex (C-0212 (5)). kerb()
    // must return the spliced ring — the one S9 commits — not the overlay's plain ring (one kerb, §3.7; §4.6's S8 ≡ S9)
    const p = framed();
    way(p, 'way:1', [[0, 1700], [2100, 2050]]);
    const ws = widthsOf({ 'way:1': 310, 'way:2': 270 });
    const keys = [[3000, 1000], [1000, 3000]] as const;
    // S8: way:2 inserted at L1 in the open batch, then the two faces' kerbs read on the open overlay
    const s8 = new Map<string, string[]>();
    const plain = new Map<string, string[]>();
    commit(p, 1, (o) => {
      const a = insertChain(o, [pt(2100, 2050), pt(2600, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
      if (!a.ok) return err(a.code, a.detail);
      for (const [x, y] of keys) {
        const f = faceAt(p, 1, x, y);
        const k = kerb(o, f, ws);
        if (!k.ok) return err(k.code, k.detail);
        s8.set(`${String(x)},${String(y)}`, normals(k.value));
        // the region the read's dry-run traced, before the split's end was spliced into it
        const u = readKerb(o, f, ws);
        if (!u.ok) return err(u.code, u.detail);
        plain.set(`${String(x)},${String(y)}`, normals(u.value.region));
      }
      return ok(null);
    });
    const kids = keys.map(([x, y]) => faceAt(p, 1, x, y));
    commit(p, 1, (o) => setOwner(o, kids, 'district:1'));
    const r = commit(p, 2, (o) => corridorUnion(o, kids, ws), AT_S9);
    healthy(p);
    const v = r.value as BandResult;
    const blocks = blocksByFace(p, kids, v);
    // S8 ≡ S9: the block committed in each face is the kerb S8 read, by normal forms (Hausdorff 0)
    kids.forEach((f, i) => {
      const key = `${String(keys[i][0])},${String(keys[i][1])}`;
      expect(s8.get(key)?.length).toBeGreaterThan(0);
      expect(blocks.get(f)).toEqual(s8.get(key));
    });
    // not vacuous: the turned-away face's kerb is the overlay's ring with the split end spliced in — the fixture
    // reaches the splice (no straight-through T does: the buffer's join already has a vertex there)
    expect(s8.get('3000,1000')).not.toEqual(plain.get('3000,1000'));
    expect(s8.get('3000,1000')?.[0].split(' ')).toContain('2308,1823');
    expect(plain.get('3000,1000')?.[0].split(' ')).not.toContain('2308,1823');
    // the face on J's convex side has no split end to splice
    expect(s8.get('1000,3000')).toEqual(plain.get('1000,3000'));
    // C-0212 (4): the turned-away face's one corridor_split runs from J to the spliced kerb point; the convex side's
    // corner (the offset lines' meeting point (1893, 2330)) splits to its feet on way:1 and way:2
    expect(edgesWithRole(p, 'corridor_split')).toEqual(['1944,2024-1893,2330', '2155,2263-1893,2330', '2308,1823-2100,2050']);
    expect(tilesExactly(p, 2, kids)).toEqual([]);
  });

  it('§13.2 with a dead-end lane on a spine-less boundary: the kerb piece’s closing chord within attractCm is in S8’s working block and in S9’s committed block (N-57 (2))', () => {
    // a spine-less edge from (1500, 4000) down to (2497, 0) (14° off the vertical) and, in S8's open batch, a lane of
    // half-width 157.5 from the frame's west side ending on it at (2003, 1983), turned 9.5° from its normal: the round
    // cap meets the edge and the lane's kerb piece below closes on it by a 25.96 cm chord (≤ attractCm) — the case the
    // insertion lost, committing the piece dangling and the strip and block one face (integrated seeds 34 and 47)
    const b = (14 * Math.PI) / 180;
    const E: [number, number] = [Math.round(1500 + 2017 * Math.tan(b)), 2017];
    const ang = Math.PI + b + (9.5 * Math.PI) / 180;
    const L: [number, number] = [Math.round(E[0] + Math.cos(ang) * 1400), Math.round(E[1] - Math.sin(ang) * 1400)];
    const T = (q: readonly [number, number]): ReturnType<typeof pt> => pt(q[0], 4000 - q[1]);
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [T([1500, 0]), T(E), T([Math.round(1500 + 4000 * Math.tan(b)), 4000])], [{ role: 'way', entity: 'way:edge' }], 'mandatory'));
    const ws = widthsOf({ 'lane:1': 157.5 });
    const keys = [[200, 200], [200, 3800]] as const;
    const s8 = new Map<string, string[]>();
    const chords: number[] = [];
    commit(p, 1, (o) => {
      const a = insertChain(o, [T([0, L[1]]), T(L), T(E)], [{ role: 'way', entity: 'lane:1' }], 'mandatory');
      if (!a.ok) return err(a.code, a.detail);
      for (const [x, y] of keys) {
        const f = faceAt(p, 1, x, y);
        const k = kerb(o, f, ws);
        if (!k.ok) return err(k.code, k.detail);
        s8.set(`${String(x)},${String(y)}`, normals(k.value));
        const rk = readKerb(o, f, ws);
        if (!rk.ok) return err(rk.code, rk.detail);
        for (const q of outlinePieces(rk.value)) if (!q.closed) chords.push(Math.hypot(q.points[q.points.length - 1].x - q.points[q.points.length - 2].x, q.points[q.points.length - 1].y - q.points[q.points.length - 2].y));
      }
      return ok(null);
    });
    // the precondition before round S9: a piece closed on the spine-less edge by a 25.96 cm chord (≤ attractCm) as its
    // last point. Round S9 (C-0417), the declared shift: the dry-run lays the cap on the real arena, where its clip point
    // on the spine-less edge, (1965, 2134), stands 25.96 cm from the strip's corner (1940, 2127) the read laid first —
    // within attractCm, so the insertion attracts it there and the piece closes at the lane's end E by the strip's end
    // edge (157 cm). The cap's sector beside it (≤ attractCm wide along F's edge) stays in the block: an attracted case
    // (the KI row of round S9). S8's working block and S9's committed block agree exactly all the same
    expect(chords.some((c) => c > 157 && c < 158)).toBe(true);
    const kids = keys.map(([x, y]) => faceAt(p, 1, x, y));
    commit(p, 1, (o) => setOwner(o, kids, 'district:1'));
    const r = commit(p, 2, (o) => corridorUnion(o, kids, ws), AT_S9);
    healthy(p);
    const blocks = blocksByFace(p, kids, r.value as BandResult);
    kids.forEach((f, i) => {
      const key = `${String(keys[i][0])},${String(keys[i][1])}`;
      expect(s8.get(key)?.length).toBeGreaterThan(0);
      expect(blocks.get(f)).toEqual(s8.get(key));
    });
    expect(tilesExactly(p, 2, kids)).toEqual([]);
  });

  it('§13.1: corridorUnion faces disjoint and covering, every block kerb(F) exactly, on random street networks; S8’s kerb ≡ S9’s block over every face, at least the share measured before round S9 (N-52 (5))', { timeout: TIMEOUT }, () => {
    // S8 reads every face's kerb in its L1 batch; S9 commits the network's faces in ONE batch, as the stage does
    // (corridorUnion over the face set, every kerb read in the commit's own L2 transaction before it writes): so S9's
    // reads see the arena S8's saw, and a block that is not S8's kerb is the commit's own attraction (N-52's class (b))
    const tally = { cases: 0, exact: 0, unmoved: 0, unmovedExact: 0, refused: 0 };
    const residuals: Residual[] = [];
    let draw = 0;
    const chord = fc.record({ a: fc.integer({ min: 0, max: 15_999 }), b: fc.integer({ min: 0, max: 15_999 }), hw: fc.integer({ min: 0, max: 450 }), knots: fc.option(fc.tuple(fc.integer({ min: 40, max: 500 }), fc.integer({ min: 40, max: 500 }))) });
    fc.assert(
      fc.property(fc.array(chord, { minLength: 1, maxLength: 4 }), (chords) => {
        draw += 1;
        const p = framed();
        const table: Record<string, number | ReturnType<typeof profile>> = {};
        chords.forEach((c, i) => {
          const a = onFrame(c.a);
          const b = onFrame(c.b);
          if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 500 || a[0] === b[0] && (a[0] === 0 || a[0] === 4000) || a[1] === b[1] && (a[1] === 0 || a[1] === 4000)) return;
          const r = tx(p, spec(1), (o) => insertChain(o, [pt(a[0], a[1]), pt(b[0], b[1])], [{ role: 'way', entity: `way:${String(i)}` }], 'mandatory', c.knots === null ? {} : { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }] }));
          if (!r.ok) return;
          table[`way:${String(i)}`] = c.knots === null ? c.hw : profile([c.knots[0], c.knots[1]]);
        });
        const faces = l1Faces(p);
        commit(p, 1, (o) => setOwner(o, faces, 'district:1'));
        const ws = widthsOf(table);
        const k = new Map<FaceId, { rings: string[]; moved: boolean } | null>();
        for (const f of faces) {
          k.set(f, kerbRead(p, f, ws));
          // N-52 (2), C-0277 (1): every split chain within its junction's reach (none to a far kerb vertex)
          const rk = readIn(p, 1, (o) => readKerb(o, f, ws));
          if (rk.ok) expect(splitsBeyondReach(p, rk.value)).toEqual([]);
        }
        const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
        if (!r.ok) {
          // the insertion's own refusal on a degenerate network (a kerb within attractCm of a far feature)
          expect(['E_KEPT', 'E_INVARIANT']).toContain(r.code);
          tally.refused += 1;
          return;
        }
        const v = r.value.value as BandResult;
        // N-52 (2): a corridor_split lies in the band — never between two built blocks, attracted or not
        expect(splitsBetweenBlocks(p, 2, v.blocks)).toEqual([]);
        const blocks = blocksByFace(p, faces, v);
        for (const f of faces) {
          const read = k.get(f);
          expect(read).not.toBeNull();
          if (read === null || read === undefined) continue;
          const want = read.rings;
          // §3.7's split: where S8's read moved no vertex, the blocks are kerb(F) exactly; where it attracted one, they
          // stay within √2 · attractCm × the perimeter of it
          const moved = read.moved;
          tally.cases += 1;
          if (!moved) tally.unmoved += 1;
          // the committed block: F itself where nothing was written inside it, else the L2 blocks
          const have = v.whole.includes(f) ? normals(ringsOf(p, 1, f)) : v.wholeBand.includes(f) ? [] : (blocks.get(f) ?? []);
          // exact up to a same-level split a neighbouring face's pieces placed on a boundary the two share (§2.2 rule 3)
          const got = have.map((q) => normalHot(parseRing(q))).sort();
          const exp = want.map((q) => normalHot(parseRing(q))).sort();
          const exact = JSON.stringify(got) === JSON.stringify(exp);
          if (exact) tally.exact += 1;
          else residuals.push(residualOf(p, draw, f, got, exp));
          if (!moved) {
            tally.unmovedExact += exact ? 1 : 0;
            expect(got).toEqual(exp);
          } else {
            const g = have.map(parseRing);
            const e = want.map(parseRing);
            // §3.7's attracted bound: perimeter × √2 · attractCm, the perimeter the operands' (F's) and both results' —
            // on the SYMMETRIC difference (hardening round S14, notes row 11: |area(g) − area(e)| let a block moved off
            // kerb(F) by any distance pass at equal area)
            const per = ringsOf(p, 1, f).reduce((t, q) => t + perimeter(q), 0) + e.reduce((t, q) => t + perimeter(q), 0) + g.reduce((t, q) => t + perimeter(q), 0);
            expect(withinAttractedBound(g, e, per)).toBe(true);
          }
        }
        healthy(p);
        expect(tilesExactly(p, 2, faces)).toEqual([]);
      }),
      // the share's seed (N-52 (5)'s ratchet reads one seed: the share measured on it before round S9)
      { numRuns: 150, seed: SHARE_SEED },
    );
    // the exact comparison is not vacuous: at least a tenth of the faces move nothing (a chord's round end cap crossing
    // the frame within attractCm attracts a chord vertex, so a face beside a chord's end is mostly an attracted case)
    const share = tally.exact / tally.cases;
    const classB = residuals.filter((x) => x.classB).length;
    console.info(`corridorUnion networks (seed ${String(SHARE_SEED)}, S9 in one batch): ${String(tally.cases)} faces, ${String(tally.exact)} S8 ≡ S9 exactly (share ${share.toFixed(4)}; before round S9 ${String(SHARE_BEFORE.exact)}/${String(SHARE_BEFORE.cases)} = ${(SHARE_BEFORE.exact / SHARE_BEFORE.cases).toFixed(4)}; N-52 (5)'s target 0.95), ${String(tally.unmoved)} unattracted (${String(tally.unmovedExact)} exact), ${String(tally.refused)} networks refused; residuals ${String(residuals.length)} (class (b) ${String(classB)})`);
    for (const x of residuals) console.info(`S8≢S9 RESIDUAL ${JSON.stringify(x)}`);
    expect(tally.unmoved).toBeGreaterThanOrEqual(Math.ceil(tally.cases / 10));
    expect(tally.refused).toBe(0);
    // the HARD pin (the ratchet): the share over every face never below the share measured before the round
    expect(share).toBeGreaterThanOrEqual(SHARE_BEFORE.exact / SHARE_BEFORE.cases);
    // every residual N-52's class (b): the commit's attraction, within N-43's bound of kerb(F)
    expect(residuals.filter((x) => !x.classB)).toEqual([]);
  });

  it('a kerb sliver thinner than attractCm that the commit folds onto F’s boundary leaves F all band, not one built block', () => {
    // §13.1's random networks, seed 240394668 (shrunk): two profiled ways leave the face between them and the frame's
    // east side a kerb sliver (area 2 613 cm², its inner vertex 26 cm from the side); attraction folds its one outline
    // piece onto the side, so nothing is written inside F — F is its own child at L2, and it lies in the band
    const p = framed();
    way(p, 'way:0', [[4000, 317], [3599, 4000]], [0, 1]);
    way(p, 'way:1', [[715, 0], [4000, 3513]], [0, 1]);
    const faces = own(p, 'district:1', [[3950, 2000]]);
    const ws = widthsOf({ 'way:0': profile([344, 183]), 'way:1': profile([494, 493]) });
    let k: string[] = [];
    commit(p, 1, (o) => {
      const r = kerb(o, faces[0], ws);
      if (!r.ok) return err(r.code, r.detail);
      k = normals(r.value);
      return ok(null);
    });
    // the precondition: kerb(F) is a sliver, a small fraction of F
    expect(k.length).toBe(1);
    const kArea = Number(area2Of(k.map((s) => s.split(' ').map((t) => pt(Number(t.split(',')[0]), Number(t.split(',')[1])))))) / 2;
    const fArea = Number(area2Of(ringsOf(p, 1, faces[0]))) / 2;
    expect(kArea).toBeGreaterThan(0);
    expect(kArea).toBeLessThan(fArea / 100);
    const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
    healthy(p);
    const v = r.value as BandResult;
    expect(v.whole).toEqual([]);
    expect(v.wholeBand).toEqual(faces);
    expect(v.blocks).toEqual([]);
  });

  it('a block whose kerb edge the commit bent through a vertex of F within attractCm stays a built block', () => {
    // §13.1's random networks, seed −1921412460 (shrunk): the kerb edge (0, 1720) – (3172, 4000) passes 25 cm from F's
    // vertex (884, 2324) and the commit routes it through that vertex, so an ear's centroid beside the bend lay outside
    // kerb(F) and the long thin block was read as band (C-0218 (10)); its widest cross-section is inside kerb(F)
    const p = framed();
    way(p, 'way:0', [[1, 0], [0, 1692]], [0, 1]);
    way(p, 'way:1', [[3231, 4000], [0, 1718]]);
    way(p, 'way:2', [[3059, 4000], [0, 2431]], [0, 1]);
    // the property's order: every L1 face owned, each banded in a batch of its own in slot order (the face below first)
    const all = own(p, 'district:1', [[3000, 1000], [600, 2300], [300, 3800]]);
    const faces = [all[1]];
    const ws = widthsOf({ 'way:0': profile([40, 40]), 'way:1': 34, 'way:2': profile([40, 166]) });
    let k: ReturnType<typeof pt>[][] = [];
    commit(p, 1, (o) => {
      const r = kerb(o, faces[0], ws);
      if (!r.ok) return err(r.code, r.detail);
      k = r.value;
      return ok(null);
    });
    // the precondition: kerb(F) most of F — before round S9 one ring; round S9 (C-0417), the declared shift: the dry-run
    // meets F's own L1 vertices and the L0 frame there, so the long ring is pinched at (3092, 3943) beside F's corner,
    // leaving a small triangle at the frame (every ring a block all the same)
    expect(k.length).toBe(2);
    const areas = k.map((q) => Math.abs(Number(area2Of([q]))) / 2).sort((x, y) => y - x);
    expect(areas[0]).toBeGreaterThan(100 * areas[1]);
    expect(all[0]).toBeLessThan(all[1]);
    commit(p, 2, (o) => corridorUnion(o, [all[0]], ws), AT_S9);
    const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
    healthy(p);
    const v = r.value as BandResult;
    // every kerb ring a built block: none read as band
    expect(v.blocks.length).toBe(k.length);
    const got = v.blocks.reduce((t, b) => t + Number(area2Of(ringsOf(p, 2, b))) / 2, 0);
    const want = Number(area2Of(k)) / 2;
    // §3.7's attracted bound, as the random property reads it
    const per = [ringsOf(p, 1, faces[0])[0], ...k, ...v.blocks.map((b) => ringsOf(p, 2, b)[0])].reduce((t, q) => t + perimeter(q), 0);
    expect(Math.abs(got - want)).toBeLessThanOrEqual(per * Math.SQRT2 * 26);
  });

  it('a face holding an earlier stage’s finer content refuses E_KEPT, writing nothing; kept content elsewhere is untouched', () => {
    // the insertion's kept-content rule (§3.3; C-0177 (4)): an L2 edge inside a finer face record of an earlier stage is
    // E_KEPT — the kept ring's residue face covers the rest of F, so no kerb can enter F (C-0212 (6))
    const build = (): { p: Plat; faces: FaceId[] } => {
      const p = framed();
      way(p, 'way:1', [[0, 2000], [4000, 2000]]);
      way(p, 'way:2', [[2000, 0], [2000, 4000]]);
      const faces = own(p, 'district:1', [[1000, 1000], [3000, 1000], [1000, 3000], [3000, 3000]]);
      commit(p, 3, (o) => insertChain(o, [pt(200, 200), pt(800, 200), pt(800, 800), pt(200, 800)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory', { closed: true }), { stage: 8 as StageId, rederivesFrom: 8 as StageId });
      return { p, faces };
    };
    const a = build();
    const before = state(a.p);
    const refused = attemptAt(a.p, 2, (o) => corridorUnion(o, a.faces, W), AT_S9);
    expect(refused.ok).toBe(false);
    if (!refused.ok) expect(refused.code).toBe('E_KEPT');
    expect(state(a.p)).toBe(before);
    // the op inside a batch that goes on: the lower-left face (the kept one) is the first in canonical order, so the
    // refusal comes before anything is written and the rest never start — the batch commits nothing
    const again = commit(a.p, 2, (o) => {
      const c = corridorUnion(o, [a.faces[3], a.faces[0]], W);
      expect(c.ok).toBe(false);
      return { ok: true, value: null, warnings: [] };
    }, AT_S9);
    expect(again.record).toBeNull();
    expect(state(a.p)).toBe(before);
    // atomic after writing: the kept ring in the upper-right face, the last in canonical order, so the three faces before
    // it are written when its kerb refuses — the op puts the batch back as it found it, and the batch commits nothing
    const late = framed();
    way(late, 'way:1', [[0, 2000], [4000, 2000]]);
    way(late, 'way:2', [[2000, 0], [2000, 4000]]);
    const lf = own(late, 'district:1', [[1000, 1000], [3000, 1000], [1000, 3000], [3000, 3000]]);
    commit(late, 3, (o) => insertChain(o, [pt(3200, 3200), pt(3800, 3200), pt(3800, 3800), pt(3200, 3800)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory', { closed: true }), { stage: 8 as StageId, rederivesFrom: 8 as StageId });
    const lateBefore = state(late);
    const third = commit(late, 2, (o) => {
      const c = corridorUnion(o, lf, W);
      expect(c.ok).toBe(false);
      if (!c.ok) expect(c.code).toBe('E_KEPT');
      return { ok: true, value: null, warnings: [] };
    }, AT_S9);
    expect(third.record).toBeNull();
    expect(state(late)).toBe(lateBefore);
    // the three other faces band; the kept ring's faces are untouched
    const b = build();
    const keptBefore = normals(ringsOf(b.p, 3, faceAt(b.p, 3, 500, 500)));
    const r = commit(b.p, 2, (o) => corridorUnion(o, b.faces.slice(1), W), AT_S9);
    healthy(b.p);
    expect((r.value as BandResult).blocks.length).toBe(3);
    expect(normals(ringsOf(b.p, 3, faceAt(b.p, 3, 500, 500)))).toEqual(keptBefore);
  });

  it('refuses E_LEVEL off L2, writing nothing; the declared op commits what the callback commits', () => {
    for (const level of [1, 3] as const) {
      const { p, faces } = crossingFaces();
      const before = state(p);
      const r = attemptAt(p, level, (o) => corridorUnion(o, faces, W), AT_S9);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe('E_LEVEL');
      expect(state(p)).toBe(before);
    }
    const a = crossingFaces();
    const b = crossingFaces();
    commit(a.p, 2, (o) => corridorUnion(o, a.faces, W), AT_S9);
    const d = tx(b.p, spec(2, { ...AT_S9, ops: [opCorridorUnion(lin(7), 0, b.faces, W)] }));
    expect(d.ok).toBe(true);
    expect(state(b.p)).toBe(state(a.p));
    // the faces are read in canonical order: a list in any order commits the same arena
    const e = crossingFaces();
    commit(e.p, 2, (o) => corridorUnion(o, e.faces.slice().reverse(), W), AT_S9);
    expect(state(e.p)).toBe(state(a.p));
    // where two faces' wedge feet fall within attractCm of each other on one spine, the later attracts onto the earlier:
    // the canonical face order, not the caller's, decides which (two T-junctions 40 cm apart across way:1)
    const tee = (): { p: Plat; faces: FaceId[] } => {
      const q = framed();
      way(q, 'way:1', [[0, 2000], [4000, 2000]]);
      way(q, 'way:2', [[2000, 4000], [2000, 2000]]);
      way(q, 'way:3', [[2040, 0], [2040, 2000]]);
      return { p: q, faces: own(q, 'district:1', [[1000, 1000], [3000, 1000], [1000, 3000], [3000, 3000]]) };
    };
    const tw = widthsOf({ 'way:1': 300, 'way:2': 300, 'way:3': 280 });
    const t1 = tee();
    const t2 = tee();
    commit(t1.p, 2, (o) => corridorUnion(o, t1.faces, tw), AT_S9);
    commit(t2.p, 2, (o) => corridorUnion(o, t2.faces.slice().reverse(), tw), AT_S9);
    healthy(t1.p);
    expect(state(t2.p)).toBe(state(t1.p));
    for (const order of [[1, 0, 3, 2], [2, 3, 0, 1], [3, 1, 2, 0]]) {
      const t3 = tee();
      commit(t3.p, 2, (o) => corridorUnion(o, order.map((i) => t3.faces[i]), tw), AT_S9);
      expect(state(t3.p)).toBe(state(t1.p));
    }
    // a FaceRef of L1 faces names its owner's faces
    const c = crossingFaces();
    commit(c.p, 2, (o) => corridorUnion(o, { owner: 'district:1', level: 1 }, W), AT_S9);
    expect(state(c.p)).toBe(state(a.p));
  });

  it('a kerb meeting a slanted boundary that declares no half-width ends on it: that boundary is never inserted again as kerb', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(0, 500), pt(4000, 3700)], [{ role: 'district_bound', entity: 'district:2' }], 'mandatory'));
    way(p, 'way:1', [[1700, 4000], [2600, 0]]);
    const faces = own(p, 'district:1', [[300, 3000], [3500, 3900], [3500, 500], [600, 300]]);
    const ws = widthsOf({ 'way:1': 300 });
    commit(p, 2, (o) => corridorUnion(o, faces, ws), AT_S9);
    healthy(p);
    // no edge carries both the boundary's row and a kerb row: the kerb ends on the boundary where its strip line meets it
    for (let e = 0; e < p.slots.pair.top; e += 1) {
      if (p.halfEdges.origin[2 * e] < 0) continue;
      const names = rowsOn(p, 'edge', 2 * e).map((r) => roleInfo(p.roles.kind[r]).name);
      expect(names.includes('district_bound') && names.includes('kerb')).toBe(false);
    }
    expect(tilesExactly(p, 2, faces)).toEqual([]);
  });

  it('the same function on another arena, by its key: tunnel chains on the underground’s part 0, a gallery on part 1 (J-A12.31)', () => {
    for (const [key, role, hw] of [[{ layer: 'underground', part: 0 }, 'tunnel', 250], [{ layer: 'underground', part: 1 }, 'gallery', 250 / 2 + 30]] as const) {
      const p = createPlat(key as PlatKey, { widthCm: 4000 as Cm, heightCm: 4000 as Cm, aspect: 1, marginShare: 0 });
      attachIndex(p, { gridCellCm: CELLS });
      const k = { key: key as PlatKey };
      commit(p, 0, (o) => insertChain(o, [pt(0, 0), pt(4000, 0), pt(4000, 4000), pt(0, 4000)], [{ role: 'margin', entity: 'system:1' }], 'mandatory', { closed: true }), k);
      commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role, entity: 'trunk:1' }], 'mandatory'), k);
      commit(p, 1, (o) => insertChain(o, [pt(2400, 2000), pt(2400, 4000)], [{ role, entity: 'branch:1' }], 'mandatory'), k);
      const faces = [faceAt(p, 1, 1000, 1000), faceAt(p, 1, 1000, 3000), faceAt(p, 1, 3000, 3000)];
      commit(p, 1, (o) => setOwner(o, faces, 'pseudo:1'), k);
      const ws = widthsOf({ 'trunk:1': hw, 'branch:1': hw }, [role]);
      const r = commit(p, 2, (o) => corridorUnion(o, faces, ws), { ...AT_S9, ...k });
      healthy(p);
      const v = r.value as BandResult;
      // the kerb is the tunnel's external wall: the trunk's band below it ends at y = 2000 − hw
      const low = v.blocks.find((b) => p.faces[2].parent[b] === faces[0]) as FaceId;
      expect(normals(ringsOf(p, 2, low))).toEqual([`0,0 4000,0 4000,${String(2000 - hw)} 0,${String(2000 - hw)}`]);
      // a tunnel junction yields wedges like a street junction
      expect(v.wedges.length).toBe(2);
      // a plot line ending 1–25 cm short of the kerb lands on it by attraction
      const short = 17;
      const pl = commit(p, 3, (o) => insertChain(o, [pt(700, 100), pt(700, 2000 - hw - short)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'), k);
      const placed = (pl.value as { placed: number[] }).placed;
      expect(p.vertices.y[placed[1]]).toBe(2000 - hw);
      healthy(p);
    }
  });
});

/** A normal form back to its points. */
function parseRing(s: string): ReturnType<typeof pt>[] {
  return s.split(' ').map((t) => {
    const [x, y] = t.split(',').map(Number);
    return pt(x, y);
  });
}

/**
 * §3.7's attracted bound on two ring sets (non-zero): |g Δ e| ≤ perimeter × √2 · attractCm, the symmetric difference by
 * the kernel's own boolean (`xor`, M0-a-08; an empty xor is 0).
 */
function withinAttractedBound(g: readonly ReturnType<typeof pt>[][], e: readonly ReturnType<typeof pt>[][], per: number): boolean {
  if (g.length === 0 && e.length === 0) return true;
  const x = g.length === 0 ? ok(e.map((r) => r.slice())) : e.length === 0 ? ok(g.map((r) => r.slice())) : booleans('xor', g, e, 'nonzero');
  const area = x.ok ? Math.abs(Number(area2Of(x.value))) / 2 : x.code === 'E_DEGENERATE' && x.detail === 'empty' ? 0 : Infinity;
  return area <= per * Math.SQRT2 * LATTICE.attractCm;
}

/** A ring's boundary length. */
function perimeter(r: readonly { x: number; y: number }[]): number {
  let s = 0;
  for (let i = 0; i < r.length; i += 1) s += Math.hypot(r[(i + 1) % r.length].x - r[i].x, r[(i + 1) % r.length].y - r[i].y);
  return s;
}

function crossingFaces(): { p: Plat; faces: FaceId[] } {
  const p = framed();
  way(p, 'way:1', [[0, 2000], [4000, 2000]]);
  way(p, 'way:2', [[2000, 0], [2000, 4000]]);
  const faces = own(p, 'district:1', [[1000, 1000], [3000, 1000], [1000, 3000], [3000, 3000]]);
  return { p, faces };
}

/** A point on the frame [0, 4000]²'s boundary, by its arc position (0 … 15 999 cm, counter-clockwise from (0, 0)). */
function onFrame(s: number): [number, number] {
  if (s < 4000) return [s, 0];
  if (s < 8000) return [4000, s - 4000];
  if (s < 12_000) return [12_000 - s, 4000];
  return [0, 16_000 - s];
}

/** The live L1 face records. */
function l1Faces(p: Plat): FaceId[] {
  const out: FaceId[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (p.faces[1].kind[f] !== 0xffff) out.push(f);
  return out;
}

/** §3.7's four warnings that mark a case attracted. */
function attracted(ws: readonly { code: string }[]): boolean {
  return ws.some((w) => ['W_ATTRACTED', 'W_PLACED', 'W_WEDGE_ROUTED', 'W_STRETCH_SHARED'].includes(w.code));
}

/**
 * kerb(F)'s normal forms and whether its overlay moved a vertex, read in a batch that writes nothing; null where the
 * overlay's insertion refused a route (N-43, insertChain's PENDING-S3 line B — a typed refusal the batch meets again).
 */
function kerbRead(p: Plat, f: FaceId, ws: ReturnType<typeof widthsOf>): { rings: string[]; moved: boolean } | null {
  let out: { rings: string[]; moved: boolean } | null = null;
  const r = tx(p, spec(1), (o) => {
    const k = kerb(o, f, ws);
    if (!k.ok) return err(k.code, k.detail);
    out = { rings: normals(k.value), moved: attracted(k.warnings) };
    return ok(null);
  });
  if (!r.ok) {
    expect(r.code).toBe('E_INVARIANT');
    return null;
  }
  return out;
}

/** The random networks' share seed (N-52 (5)'s ratchet: the share is measured on one seed, before and after a round). */
const SHARE_SEED = 20_261_019;

/**
 * The share measured on SHARE_SEED on the tree as round S9 found it (build/M0-a-09-fix-s9's CHECKPOINT of 2026-10-19
 * 02:58, before any edit; the scratch-overlay kerb): of 453 faces committed, 444 S8 ≡ S9 exactly — with each face in a
 * batch of its own, and alike with the network's faces in one S9 batch (the found code's kerb read no arena, so the
 * protocol moved nothing; re-measured on the found sources in the lane's mirror, C-0417).
 */
const SHARE_BEFORE = { exact: 444, cases: 453 };

/** N-43's bound (cm): how far a committed block may stand off kerb(F) — 2·√2·attractCm (≈ 73.5 cm). */
const N43_CM = 2 * Math.SQRT2 * LATTICE.attractCm;

/** One face whose committed block is not S8's kerb (N-52's residual): what the read had, what the commit laid, the attraction. */
interface Residual {
  readonly seed: number;
  readonly draw: number;
  readonly face: FaceId;
  /** S8's kerb vertices the block does not hold (the contacts), and the block's vertices kerb(F) does not. */
  readonly read: string[];
  readonly commit: string[];
  /** Per block-only vertex: its level in the arena (the commit's L2 vertex), and the S8 kerb vertex nearest it with the distance (cm). */
  readonly attractors: { readonly at: string; readonly level: number; readonly from: string | null; readonly cm: number | null }[];
  /** The Hausdorff distance (cm) of the block from kerb(F). */
  readonly hausdorffCm: number;
  /** N-52's class (b): every block-only vertex an L2 vertex the commit placed, the block within N-43's bound of kerb(F). */
  readonly classB: boolean;
}

/** The residual of a face: its vertex differences, the commit's attraction points and the bound (the class (b) reading, N-52). */
function residualOf(p: Plat, draw: number, face: FaceId, got: readonly string[], exp: readonly string[]): Residual {
  const hv = new Set(got.flatMap((r) => r.split(' ')));
  const wv = new Set(exp.flatMap((r) => r.split(' ')));
  const commitOnly = [...hv].filter((q) => !wv.has(q));
  const readOnly = [...wv].filter((q) => !hv.has(q));
  const xy = (q: string): [number, number] => q.split(',').map(Number) as [number, number];
  const levels = new Map<string, number>();
  for (let v = 0; v < p.slots.vertex.top; v += 1) if (isVertexLive(p, v)) levels.set(`${String(p.vertices.x[v])},${String(p.vertices.y[v])}`, p.vertices.level[v]);
  const attractors = commitOnly.map((at) => {
    const [x, y] = xy(at);
    let from: string | null = null;
    let cm: number | null = null;
    for (const q of readOnly.length > 0 ? readOnly : [...wv]) {
      const [u, w] = xy(q);
      const d = Math.hypot(u - x, w - y);
      if (cm === null || d < cm) {
        cm = Math.round(d * 100) / 100;
        from = q;
      }
    }
    return { at, level: levels.get(at) ?? -1, from, cm };
  });
  const hausdorff = Math.round(hausdorffCm(got.map(parseRing), exp.map(parseRing)) * 100) / 100;
  const classB = hausdorff <= N43_CM && attractors.every((a) => a.level === 2);
  return { seed: SHARE_SEED, draw, face, read: readOnly, commit: commitOnly, attractors, hausdorffCm: hausdorff, classB };
}

describe('the random-network property’s attracted bound reads the symmetric difference (hardening round S14, notes row 11)', () => {
  it('a block of kerb(F)’s area moved 40 cm off it fails the bound; kerb(F) itself and a block within the attraction envelope pass', () => {
    const sq = (x: number, y: number, w: number): ReturnType<typeof pt>[] => [pt(x, y), pt(x + w, y), pt(x + w, y + w), pt(x, y + w)];
    const e = [sq(0, 0, 1000)];
    const per = 3 * 4000;
    expect(withinAttractedBound([sq(0, 0, 1000)], e, per)).toBe(true);
    // equal areas: |Δ area| = 0 — the old reading passed it; the symmetric difference is 2 × 1000 × 400 cm²
    expect(withinAttractedBound([sq(400, 0, 1000)], e, per)).toBe(false);
    // a block 10 cm inside kerb(F) along one side: |Δ| = 10 000 cm² ≤ 12 000 × √2 × 26
    expect(withinAttractedBound([[pt(0, 0), pt(990, 0), pt(990, 1000), pt(0, 1000)]], e, per)).toBe(true);
  });
});
