// Test support for M0-a-07's face partitioners: arenas with faces to cut (a framed square split by a way, a face with
// holes, a face with an antenna), the face record holding a lattice point, a face's rings as lattice points, and the
// exact area identity the children of a split are judged by (§13.1: integer area2 equality, BigInt here, written
// without the code under test).
import { faceWalk, isFaceLive, isVertexLive, outgoing, type FaceId, type HalfEdgeId, type Plat, type VertexId } from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import type { KernelResult } from '../../src/num/index.js';
import { removeEdges, setOwner, tx, type Overlay } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { facesAt, ringArea2, strictlyInsideRing } from '../insert/step3-5/support.js';
import { commit, framed, healthy, pt, spec, state } from '../tx/support.js';

export { commit, facesAt, framed, healthy, pt, ringArea2, spec, state };

/** A batch's result without throwing (the refusal tests read its code). */
export function attempt<T>(p: Plat, level: Level, fn: (o: Overlay) => KernelResult<T>): KernelResult<unknown> {
  return tx(p, spec(level), fn);
}

/** The live record of `level` whose region holds the lattice point strictly (inside its outer ring, inside no hole), or −1. */
export function faceAt(p: Plat, level: Level, x: number, y: number): FaceId {
  for (const f of facesAt(p, level)) {
    const rings = faceWalk(p, level, f);
    if (!strictlyInsideRing(p, rings[0], x, y)) continue;
    if (rings.slice(1).some((r) => strictlyInsideRing(p, r, x, y))) continue;
    return f;
  }
  return -1;
}

/** Twice a face's exact area over every ring of its level (outer positive, holes negative). */
export function faceArea2Big(p: Plat, level: Level, f: FaceId): bigint {
  let s = 0n;
  for (const r of faceWalk(p, level, f)) s += ringArea2(p, r);
  return s;
}

/** A face's rings as "x,y" lists from each ring's lowest-leftmost point (a slot-free ring print). */
export function ringPrint(p: Plat, level: Level, f: FaceId): string[] {
  return faceWalk(p, level, f).map((ring) => {
    const pts = ring.map((h: HalfEdgeId) => [p.vertices.x[p.halfEdges.origin[h]], p.vertices.y[p.halfEdges.origin[h]]] as const);
    let k = 0;
    for (let i = 1; i < pts.length; i++) if (pts[i][1] < pts[k][1] || (pts[i][1] === pts[k][1] && pts[i][0] < pts[k][0])) k = i;
    return [...pts.slice(k), ...pts.slice(0, k)].map(([x, y]) => `${x},${y}`).join(' ');
  });
}

/** Whether a face record is live. */
export function live(p: Plat, level: Level, f: FaceId): boolean {
  return isFaceLive(p, level, f);
}

/** The frame [0, 4000]² with an L1 way along y = 2000: two L1 faces, the lower [0, 4000] × [0, 2000]. */
export function halves(): Plat {
  const p = framed();
  commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
  return p;
}

/** An L1 block owned by `block:1`: the lower half of `halves()`, owned (its cuts default to `plot_line` rows). */
export function ownedHalves(): { p: Plat; lower: FaceId; upper: FaceId } {
  const p = halves();
  const lower = faceAt(p, 1, 1000, 1000);
  const upper = faceAt(p, 1, 1000, 3000);
  commit(p, 1, (o) => {
    const r = setOwner(o, [lower], 'block:1');
    if (!r.ok) return r;
    return setOwner(o, [upper], 'block:2');
  });
  return { p, lower, upper };
}

/** Closed L1 rings as holes inside the lower half (each a `district_bound` ring of its own entity). */
export function withHoles(rings: readonly (readonly [number, number])[][]): Plat {
  const p = halves();
  rings.forEach((ring, i) => {
    commit(p, 1, (o) => insertChain(o, ring.map(([x, y]) => pt(x, y)), [{ role: 'district_bound', entity: `hole:${i + 1}` }], 'mandatory', { closed: true }));
  });
  return p;
}

/** Verifies the arena with every oracle and returns its slot-free content print (version stripped). */
export function content(p: Plat): string {
  healthy(p);
  return state(p).replace(/#v\d+$/, '');
}

/** The live vertex at the lattice point with no edge (an isolated vertex), or −1. */
export function isolatedAt(p: Plat, x: number, y: number): VertexId {
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (isVertexLive(p, v) && p.vertices.x[v] === x && p.vertices.y[v] === y && outgoing(p, v).length === 0) return v;
  }
  return -1;
}

/**
 * An isolated vertex-role point at (x, y) (integration g8 B-1): an `entrance` knot at the start of a short L1 chain
 * toward (x + dx, y + dy), the chain then removed, as mergeFaces, absorbSliver and claimSubFace leave a removed chain's
 * knots inside the merged face. Each step its own batch; false where a step was refused or attraction put the knot
 * elsewhere (no isolated point at (x, y)).
 */
export function isolate(p: Plat, x: number, y: number, entity = 'iso:1', dx = 150, dy = 90): boolean {
  const a = tx(p, spec(1), (o) => insertChain(o, [pt(x, y), pt(x + dx, y + dy)], [{ role: 'district_bound', entity }], 'mandatory', { knots: [{ index: 0, role: 'entrance', ordinal: 0 }] }));
  if (!a.ok) return false;
  const b = tx(p, spec(1), (o) => removeEdges(o, { role: 'district_bound', entity }));
  return b.ok && isolatedAt(p, x, y) >= 0;
}
