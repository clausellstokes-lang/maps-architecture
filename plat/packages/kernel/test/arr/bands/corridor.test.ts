// M0-a-09: corridorUnion (§3.4; §3.7 *The kerb, defined once*, *The same functions on every arena*; §2.2 rule 1's L2;
// §4.6's contract S8 ≡ S9; §13.1 "corridorUnion faces disjoint and covering"; §13.2 "S8's working block ≡ S9's committed
// block, Hausdorff 0" — run here on synthetic L1 faces, re-run on the spike's faces by M0-c-06). The block S8 reads on
// the open overlay and the block S9 commits are compared by their rings' normal forms (equal normal forms bound one
// point set: Hausdorff 0).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { createPlat, idOf, roleInfo, rowsOn, type FaceId, type Plat } from '../../../src/arena/index.js';
import { attachIndex } from '../../../src/index/index.js';
import { err, ok } from '../../../src/num/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { setOwner, tx } from '../../../src/tx/index.js';
import type { Cm, PlatKey, StageId } from '../../../src/types/index.js';
import { kerb } from '../../../src/arr/kerb.js';
import { corridorUnion, opCorridorUnion } from '../../../src/arr/corridorUnion.js';
import type { BandResult } from '../../../src/arr/bandUnion.js';
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
  healthy,
  normals,
  own,
  profile,
  pt,
  ringsOf,
  spec,
  state,
  tilesExactly,
  TIMEOUT,
  way,
  widthsOf,
} from './support.js';

const W = widthsOf({ 'way:1': 300, 'way:2': 300 });

/** Each block's rings as normal forms, by its L1 face. */
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

  it('§13.1: corridorUnion faces disjoint and covering, every block kerb(F) exactly, on random street networks', { timeout: TIMEOUT }, () => {
    const tally = { cases: 0, exact: 0, refused: 0 };
    const chord = fc.record({ a: fc.integer({ min: 0, max: 15_999 }), b: fc.integer({ min: 0, max: 15_999 }), hw: fc.integer({ min: 0, max: 450 }), knots: fc.option(fc.tuple(fc.integer({ min: 40, max: 500 }), fc.integer({ min: 40, max: 500 }))) });
    fc.assert(
      fc.property(fc.array(chord, { minLength: 1, maxLength: 4 }), (chords) => {
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
        const k = new Map<FaceId, { rings: string[]; moved: boolean }>();
        for (const f of faces) k.set(f, kerbRead(p, f, ws));
        // each face in a batch of its own, so each face's commit warnings are its own (§3.7's split per case)
        for (const f of faces) {
          const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, [f], ws));
          if (!r.ok) {
            // the insertion's own refusal on a degenerate network (a kerb within attractCm of a far feature)
            expect(['E_KEPT', 'E_INVARIANT']).toContain(r.code);
            tally.refused += 1;
            continue;
          }
          const v = r.value.value as BandResult;
          const blocks = blocksByFace(p, [f], v);
          const read = k.get(f) as { rings: string[]; moved: boolean };
          const want = read.rings;
          // §3.7's split: where neither the kerb's overlay nor the commit moved a vertex, the blocks are kerb(F)
          // exactly; where either attracted one, they stay within √2 · attractCm × the perimeter of it
          const moved = read.moved || attracted(r.value.record?.warnings ?? []);
          tally.cases += 1;
          if (!moved) tally.exact += 1;
          // the committed block: F itself where nothing was written inside it, else the L2 blocks
          const have = v.whole.includes(f) ? normals(ringsOf(p, 1, f)) : v.wholeBand.includes(f) ? [] : (blocks.get(f) ?? []);
          if (!moved) expect(have).toEqual(want);
          else {
            const got = have.map(parseRing);
            const exp = want.map(parseRing);
            const per = exp.reduce((t, q) => t + perimeter(q), 0) + got.reduce((t, q) => t + perimeter(q), 0);
            expect(Math.abs(Number(area2Of(got) - area2Of(exp))) / 2).toBeLessThanOrEqual(per * Math.SQRT2 * 26);
          }
        }
        healthy(p);
        expect(tilesExactly(p, 2, faces)).toEqual([]);
      }),
      { numRuns: 150 },
    );
    // the exact comparison is not vacuous: at least a tenth of the faces move nothing (a chord's round end cap crossing
    // the frame within attractCm attracts a chord vertex, so a face beside a chord's end is mostly an attracted case)
    console.info(`corridorUnion networks: ${String(tally.cases)} faces, ${String(tally.exact)} compared exactly, ${String(tally.refused)} refused`);
    expect(tally.exact).toBeGreaterThanOrEqual(Math.ceil(tally.cases / 10));
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
    // the op is atomic inside its batch: refused after the faces before the kept one were written (the lower-left face
    // is the first in canonical order, so the refusal comes there; the rest never start) — the batch commits nothing
    const again = commit(a.p, 2, (o) => {
      const c = corridorUnion(o, [a.faces[3], a.faces[0]], W);
      expect(c.ok).toBe(false);
      return { ok: true, value: null, warnings: [] };
    }, AT_S9);
    expect(again.record).toBeNull();
    expect(state(a.p)).toBe(before);
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
    // a FaceRef of L1 faces names its owner's faces
    const c = crossingFaces();
    commit(c.p, 2, (o) => corridorUnion(o, { owner: 'district:1', level: 1 }, W), AT_S9);
    expect(state(c.p)).toBe(state(a.p));
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

/** kerb(F)'s normal forms and whether its overlay moved a vertex, read in a batch that writes nothing. */
function kerbRead(p: Plat, f: FaceId, ws: ReturnType<typeof widthsOf>): { rings: string[]; moved: boolean } {
  let out = { rings: [] as string[], moved: false };
  commit(p, 1, (o) => {
    const k = kerb(o, f, ws);
    if (!k.ok) return err(k.code, k.detail);
    out = { rings: normals(k.value), moved: attracted(k.warnings) };
    return ok(null);
  });
  return out;
}
