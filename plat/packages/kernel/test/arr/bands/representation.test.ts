// M0-a-09: kerb(F), its corridor splits and corridorUnion are free of the arena's representation (§3.3: "never a
// VertexId, HalfEdgeId or FaceId … identical results for the same next edit"; C-0207 (5): a loaded arena's next
// operation equals the original's; C-0219). The integration check of group 10 (checks/integration-g10.md B-1) found
// the spines keyed by the entity's intern handle and the face's rings walked from the record's stored start, so a save
// and load (ids re-interned, starts re-chosen) or a start re-draw changed the kerb and the S9 commit. Here one arena is
// read three ways — as built, with every L1 face's stored starts re-drawn (another half-edge of each ring, the holes
// in another order) and decoded from its saved block — and the face reads, the kerbs, the splits (in order) and the
// committed corridors must agree. The ways are interned out of id order (way:b before way:a), so the load swaps their
// handles. The testkit twin (testkit/test/kernel/arr-bands/representation.test.ts) runs the same on M0-k-02's set.
import { describe, expect, it } from 'vitest';
import { faceHoles, faceWalk, setFaceHoles, type FaceId, type Plat } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { decodeArena, encodeArena } from '../../../src/io/index.js';
import { readKerb, type KerbRead } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import type { BandResult } from '../../../src/arr/bandUnion.js';
import { AT_S9, commit, edgesWithRole, faceAt, framed, healthy, normal, own, pt, ringsOf, way, widthsOf } from './support.js';

const WS = widthsOf({ 'way:a': 300, 'way:b': 250, 'way:c': 200 });

/** The face points the test names its L1 faces by: lower-left (round two holes), lower-right, upper-left, upper-right. */
const AT: readonly (readonly [number, number])[] = [
  [2600, 2000],
  [4500, 1500],
  [700, 4500],
  [4500, 4500],
];

/**
 * The frame [0, 6000]² crossed by way:b (x = 3000, interned first) and way:a (y = 3000); way:c ends on way:a from above
 * at x = 1500 (a T: a straight-through junction for the face below); two district rings (no half-width) are holes of
 * the lower-left face. Every L1 face owned by district:1.
 */
function build(): Plat {
  const p = framed(6000);
  way(p, 'way:b', [[3000, 0], [3000, 6000]]);
  way(p, 'way:a', [[0, 3000], [6000, 3000]]);
  way(p, 'way:c', [[1500, 3000], [1500, 6000]]);
  for (const [entity, x0] of [['district:7', 500], ['district:8', 1600]] as const) {
    commit(p, 1, (o) => insertChain(o, [pt(x0, 500), pt(x0 + 700, 500), pt(x0 + 700, 1200), pt(x0, 1200)], [{ role: 'district_bound', entity }], 'mandatory', { closed: true }));
  }
  own(p, 'district:1', AT);
  return p;
}

/** Every L1 face's stored starts re-drawn: the outer ring from its third route half-edge, each hole from its second, the holes reversed. */
function redrawStarts(p: Plat): void {
  const route = (ring: readonly number[]): number[] => ring.filter((h) => p.halfEdges.level[h >> 1] <= 1);
  for (const [x, y] of AT) {
    const f = faceAt(p, 1, x, y);
    const [outer, ...holes] = faceWalk(p, 1, f);
    const ro = route(outer);
    p.faces[1].outer[f] = ro[2 % ro.length];
    if (holes.length > 0) setFaceHoles(p, 1, f, holes.map((r) => route(r)[1 % route(r).length]).reverse());
  }
}

/** A face read, slot- and handle-free; every list in the order the read gives it. */
function readText(p: Plat, f: FaceId): string {
  const r = readKerb(p, f, WS);
  expect(r.ok).toBe(true);
  const read = (r as { value: KerbRead }).value;
  const q = (v: number): string => `${String(p.vertices.x[v])},${String(p.vertices.y[v])}`;
  const pts = (ring: readonly { x: number; y: number }[]): string => ring.map((c) => `${String(c.x)},${String(c.y)}`).join(' ');
  return JSON.stringify({
    rings: read.rings.map(pts),
    edges: read.edges.map((es) => es.map((e) => `${q(e.a)}>${q(e.b)} [${e.spines.join(' ')}]`)),
    spines: [...read.spines].map(([k, s]) => `${k} = ${s.chain.role} ${s.chain.entity}`).sort(),
    kerb: read.kerb.map(pts),
    splits: read.splits.map(pts),
  });
}

/** The S9 commit over the four faces: the outcome's shape and every L2 face and kerb / split edge, slot-free. */
function corridors(p: Plat): string {
  const faces = AT.map(([x, y]) => faceAt(p, 1, x, y));
  const r = commit(p, 2, (o) => corridorUnion(o, faces, WS), AT_S9);
  healthy(p);
  const v = r.value as BandResult;
  // a face's rings: the outer ring, then its holes sorted (the record's hole order is representation)
  const l2 = (fs: readonly FaceId[]): string[] =>
    fs
      .map((f) => {
        const [o, ...h] = ringsOf(p, 2, f).map(normal);
        return [o, ...h.sort()].join(' | ');
      })
      .sort();
  return JSON.stringify({
    band: l2(v.band),
    strips: l2(v.strips),
    wedges: l2(v.wedges),
    blocks: l2(v.blocks),
    kerb: edgesWithRole(p, 'kerb'),
    split: edgesWithRole(p, 'corridor_split'),
  });
}

describe('the band ops read the geometry and the ids, never the representation (§3.3, C-0207 (5), C-0219)', () => {
  it('the same face reads, kerbs and splits (in order) with the stored starts re-drawn and after a save and load', () => {
    const p = build();
    const base = AT.map(([x, y]) => readText(p, faceAt(p, 1, x, y)));
    // the fixture exercises what the reads order: a face with two holes, a junction split on each face
    const ll = JSON.parse(base[0]) as { rings: string[]; splits: string[] };
    expect(ll.rings.length).toBe(3);
    expect(ll.splits.length).toBeGreaterThanOrEqual(2);
    expect(faceHoles(p, 1, faceAt(p, 1, AT[0][0], AT[0][1])).length).toBe(2);

    const s = build();
    redrawStarts(s);
    healthy(s);
    // the re-draw moved something the old reads followed
    const starts = (pl: Plat): string[] =>
      AT.map(([x, y]) => faceWalk(pl, 1, faceAt(pl, 1, x, y)).map((r) => `${String(pl.vertices.x[pl.halfEdges.origin[r[0]]])},${String(pl.vertices.y[pl.halfEdges.origin[r[0]]])}`).join(' '));
    const moved = starts(s).filter((t, i) => t !== starts(p)[i]).length;
    expect(moved).toBe(AT.length);
    expect(AT.map(([x, y]) => readText(s, faceAt(s, 1, x, y)))).toEqual(base);

    const d = decodeArena(encodeArena(p), p.key, { index: { gridCellCm: (p.index?.levels.map((l) => l.dynamic.cellCm) ?? []) as [number, number, number, number, number] } });
    expect(d.ok).toBe(true);
    const q = (d as { value: Plat }).value;
    expect(AT.map(([x, y]) => readText(q, faceAt(q, 1, x, y)))).toEqual(base);
  });

  it('the same committed corridors with the stored starts re-drawn and after a save and load', () => {
    const base = corridors(build());
    const s = build();
    redrawStarts(s);
    expect(corridors(s)).toBe(base);
    const p = build();
    const d = decodeArena(encodeArena(p), p.key, { index: { gridCellCm: (p.index?.levels.map((l) => l.dynamic.cellCm) ?? []) as [number, number, number, number, number] } });
    expect(d.ok).toBe(true);
    expect(corridors((d as { value: Plat }).value)).toBe(base);
  });
});
