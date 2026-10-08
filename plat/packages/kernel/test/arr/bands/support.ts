// Test support for M0-a-09's kernel-side tests (kerb, corridorUnion, bandUnion, tileRings; §3.7, §3.4, §13.1, §13.2):
// L1 street networks in a framed square, width declarations, the faces of a level inside an L1 face, ring
// normalisation for the Hausdorff-0 comparison (a ring's point set: straight-through vertices dropped, started at its
// lowest-leftmost vertex — two rings with one normal form bound one point set) and exact areas (BigInt shoelace),
// written here from their definitions, never with the code under test.
import { faceWalk, idOf, isFaceLive, rowsOn, roleInfo, type FaceId, type Plat } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/index.js';
import type { KernelResult } from '../../../src/num/index.js';
import { setOwner, tx, type KernelTx, type Overlay } from '../../../src/tx/index.js';
import type { ChainProfile, ChainRef, Cm, LatticePoint, Level, StageId } from '../../../src/types/index.js';
import type { SpineWidth, SpineWidths } from '../../../src/arr/kerb.js';
import { commit, framed, healthy, pt, spec, state } from '../../tx/support.js';
import { faceAt } from '../../faces/support.js';

export { commit, faceAt, framed, healthy, pt, spec, state };

export const TIMEOUT = 600_000;

/** S9's registry id (C-0020's order: the base's ids are their §4.1 ranks at M0). */
export const S9 = 9 as StageId;

/** A corridorUnion batch's spec overrides: stage S9, re-deriving from S9. */
export const AT_S9 = { stage: S9, rederivesFrom: S9 };

/** A lattice point from a pair. */
export const P = (x: number, y: number): LatticePoint => pt(x, y);

/** Widths: every `way` (and `tunnel`, `gallery`) chain by its entity's half-width (a number or a profile), others none. */
export function widthsOf(table: Readonly<Record<string, number | ChainProfile<number> | SpineWidth>>, roles: readonly string[] = ['way', 'tunnel', 'gallery']): SpineWidths {
  return (c: ChainRef) => {
    if (!roles.includes(c.role)) return null;
    const w = table[c.entity];
    if (w === undefined) return null;
    if (typeof w === 'number' || 'knotRole' in w) return { halfWidthCm: w };
    return w;
  };
}

/** Inserts an L1 way chain in its own batch; its knots (width_knot ordinals) on the listed point indices. */
export function way(p: Plat, entity: string, pts: readonly (readonly [number, number])[], knots: readonly number[] = [], role = 'way'): void {
  commit(p, 1, (o) =>
    insertChain(
      o,
      pts.map(([x, y]) => pt(x, y)),
      [{ role, entity }],
      'mandatory',
      knots.length > 0 ? { knots: knots.map((index, ordinal) => ({ index, role: 'width_knot', ordinal })) } : {},
    ),
  );
}

/** Owns the L1 faces holding each point by `owner`. */
export function own(p: Plat, owner: string, points: readonly (readonly [number, number])[]): FaceId[] {
  const fs = points.map(([x, y]) => faceAt(p, 1, x, y));
  commit(p, 1, (o) => setOwner(o, fs, owner));
  return fs;
}

/** The frame [0, 4000]² with ways along y = 2000 and x = 2000 (way:1, way:2): four L1 faces owned by district:1. */
export function crossing(): { p: Plat; faces: FaceId[] } {
  const p = framed();
  way(p, 'way:1', [[0, 2000], [4000, 2000]]);
  way(p, 'way:2', [[2000, 0], [2000, 4000]]);
  const faces = own(p, 'district:1', [[1000, 1000], [3000, 1000], [1000, 3000], [3000, 3000]]);
  return { p, faces };
}

/** The live records of `level` whose L1 ancestor is `f`. */
export function childrenOf(p: Plat, level: Level, f: FaceId): FaceId[] {
  const out: FaceId[] = [];
  for (let c = 0; c < p.slots.face[level].top; c += 1) {
    if (!isFaceLive(p, level, c)) continue;
    let g = c;
    for (let l = level; l > 1; l -= 1) g = p.faces[l].parent[g];
    if (g === f) out.push(c);
  }
  return out;
}

/** A face's rings at its level as lattice points (walk order). */
export function ringsOf(p: Plat, level: Level, f: FaceId): LatticePoint[][] {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  return faceWalk(p, level, f).map((r) => r.map((h) => pt(X[O[h]], Y[O[h]])));
}

/** Twice the signed area of a ring, exact. */
export function area2(ring: readonly LatticePoint[]): bigint {
  let s = 0n;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    s += BigInt(a.x) * BigInt(b.y) - BigInt(b.x) * BigInt(a.y);
  }
  return s;
}

/** Twice the signed area of a ring set. */
export function area2Of(rings: readonly (readonly LatticePoint[])[]): bigint {
  let s = 0n;
  for (const r of rings) s += area2(r);
  return s;
}

/** Twice a face record's area at its level (outer positive, holes negative). */
export function faceArea2(p: Plat, level: Level, f: FaceId): bigint {
  return area2Of(ringsOf(p, level, f));
}

/** A ring's normal form: consecutive repeats and straight-through vertices dropped, from its lowest-leftmost vertex. */
export function normal(ring: readonly LatticePoint[]): string {
  let pts = ring.filter((q, i) => {
    const r = ring[(i + ring.length - 1) % ring.length];
    return q.x !== r.x || q.y !== r.y;
  });
  let changed = true;
  while (changed && pts.length >= 3) {
    changed = false;
    const n = pts.length;
    for (let i = 0; i < n; i += 1) {
      const a = pts[(i + n - 1) % n];
      const v = pts[i];
      const b = pts[(i + 1) % n];
      const cross = (BigInt(v.x) - BigInt(a.x)) * (BigInt(b.y) - BigInt(v.y)) - (BigInt(v.y) - BigInt(a.y)) * (BigInt(b.x) - BigInt(v.x));
      const dot = (BigInt(v.x) - BigInt(a.x)) * (BigInt(b.x) - BigInt(v.x)) + (BigInt(v.y) - BigInt(a.y)) * (BigInt(b.y) - BigInt(v.y));
      if (cross === 0n && dot > 0n) {
        pts = [...pts.slice(0, i), ...pts.slice(i + 1)];
        changed = true;
        break;
      }
    }
  }
  let k = 0;
  for (let i = 1; i < pts.length; i += 1) if (pts[i].y < pts[k].y || (pts[i].y === pts[k].y && pts[i].x < pts[k].x)) k = i;
  return [...pts.slice(k), ...pts.slice(0, k)].map((q) => `${String(q.x)},${String(q.y)}`).join(' ');
}

/**
 * A ring's normal form up to the hot pixel: as `normal`, and a vertex within the hot pixel (0.71 cm) of the segment
 * its two neighbours span dropped too — the vertex a same-level split places on a route (§2.2 rule 3: it moves the
 * route by at most the hot pixel), which a neighbouring face's batch may leave on a boundary two faces share.
 */
export function normalHot(ring: readonly LatticePoint[]): string {
  let pts = ring.slice();
  let changed = true;
  while (changed && pts.length > 3) {
    changed = false;
    const n = pts.length;
    for (let i = 0; i < n; i += 1) {
      const a = pts[(i + n - 1) % n];
      const v = pts[i];
      const b = pts[(i + 1) % n];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const l2 = dx * dx + dy * dy;
      const t = l2 === 0 ? -1 : ((v.x - a.x) * dx + (v.y - a.y) * dy) / l2;
      const d = l2 === 0 ? Infinity : Math.abs((v.x - a.x) * dy - (v.y - a.y) * dx) / Math.sqrt(l2);
      if (t > 0 && t < 1 && d <= 0.71) {
        pts = [...pts.slice(0, i), ...pts.slice(i + 1)];
        changed = true;
        break;
      }
    }
  }
  return normal(pts);
}

/** A ring set's normal form, sorted (the point set of a region's boundary). */
export function normals(rings: readonly (readonly LatticePoint[])[]): string[] {
  return rings.map(normal).sort();
}

/** The (role, entity) texts on the edges of a face record's boundary at its level, sorted, deduplicated. */
export function boundaryRows(p: Plat, level: Level, f: FaceId): string[] {
  const out = new Set<string>();
  for (const ring of faceWalk(p, level, f)) {
    for (const h of ring) {
      for (const r of rowsOn(p, 'edge', h)) out.add(`${roleInfo(p.roles.kind[r]).name}/${idOf(p, p.roles.entity[r])}`);
    }
  }
  return [...out].sort();
}

/** The live edge pairs carrying a role (any entity), as "x,y–x,y" with the smaller end first, sorted. */
export function edgesWithRole(p: Plat, role: string): string[] {
  const out: string[] = [];
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  for (let e = 0; e < p.slots.pair.top; e += 1) {
    if (O[2 * e] < 0) continue;
    if (!rowsOn(p, 'edge', 2 * e).some((r) => roleInfo(p.roles.kind[r]).name === role)) continue;
    const a = [X[O[2 * e]], Y[O[2 * e]]];
    const b = [X[O[2 * e + 1]], Y[O[2 * e + 1]]];
    const [u, w] = a[1] < b[1] || (a[1] === b[1] && a[0] < b[0]) ? [a, b] : [b, a];
    out.push(`${String(u[0])},${String(u[1])}-${String(w[0])},${String(w[1])}`);
  }
  return out.sort();
}

/**
 * The corridor_split edges with a built block on both sides — a split laid across a block, which §3.7 never makes (a
 * split lies in the band; N-52 (2)) — each as "x,y-x,y" from its even half-edge's origin. `blocks` are faces of `level`.
 */
export function splitsBetweenBlocks(p: Plat, level: Level, blocks: readonly FaceId[]): string[] {
  const side = new Map<number, FaceId>();
  for (const b of blocks) for (const ring of faceWalk(p, level, b)) for (const h of ring) side.set(h, b);
  const O = p.halfEdges.origin;
  const out: string[] = [];
  for (const [h, b] of side) {
    const o = side.get(h ^ 1);
    if (o === undefined || o === b || (h & 1) === 1) continue;
    if (!rowsOn(p, 'edge', h).some((r) => roleInfo(p.roles.kind[r]).name === 'corridor_split')) continue;
    out.push(`${String(p.vertices.x[O[h]])},${String(p.vertices.y[O[h]])}-${String(p.vertices.x[O[h ^ 1]])},${String(p.vertices.y[O[h ^ 1]])}`);
  }
  return out.sort();
}

/** The live records of `level` whose parent is the face `parent` of level − 1. */
function kidsOf(p: Plat, level: Level, parent: FaceId): FaceId[] {
  const out: FaceId[] = [];
  for (let c = 0; c < p.slots.face[level].top; c += 1) if (isFaceLive(p, level, c) && p.faces[level].parent[c] === parent) out.push(c);
  return out;
}

/**
 * §13.1's "corridorUnion faces disjoint and covering", read on the arena down to `level`: under each L1 face, the
 * records of every finer level down to `level` — a record with no child standing as its own child (§2.2 rule 2) — sum
 * to their parent's area exactly (integer area2), each with a positive area, so the faces cover their parent with no
 * overlap (a planar subdivision's faces are interior-disjoint, which the oracle `healthy` holds).
 */
export function tilesExactly(p: Plat, level: Level, faces: readonly FaceId[]): string[] {
  const out: string[] = [];
  const check = (l: Level, f: FaceId): void => {
    if (l >= level) return;
    const kids = kidsOf(p, (l + 1) as Level, f);
    if (kids.length === 0) return;
    let sum = 0n;
    for (const c of kids) {
      const a = faceArea2(p, (l + 1) as Level, c);
      if (a <= 0n) out.push(`face ${String(c)} at L${String(l + 1)} has area2 ${String(a)}`);
      sum += a;
      check((l + 1) as Level, c);
    }
    const parent = faceArea2(p, l, f);
    if (sum !== parent) out.push(`L${String(l)} face ${String(f)}: its L${String(l + 1)} faces sum to ${String(sum)}, not ${String(parent)}`);
  };
  for (const f of faces) check(1, f);
  return out;
}

/** A batch's result without throwing. */
export function attemptAt<T>(p: Plat, level: Level, fn: (o: Overlay) => KernelResult<T>, over: Partial<KernelTx> = {}): KernelResult<unknown> {
  return tx(p, spec(level, over), fn);
}

/** A width profile of half-widths on an entity's width_knot rows. */
export function profile(values: readonly number[]): ChainProfile<number> {
  return { knotRole: 'width_knot', values: values.slice(), interp: 'linear' };
}

/** Cm from a number the test holds integral. */
export const cm = (n: number): Cm => n as Cm;

/** Is the ring simple — no two non-adjacent edges meeting, no repeated point (exact orientation tests, BigInt)? */
export function simpleRing(r: readonly LatticePoint[]): boolean {
  const n = r.length;
  if (n < 3) return false;
  if (new Set(r.map((q) => `${String(q.x)},${String(q.y)}`)).size !== n) return false;
  const o = (a: LatticePoint, b: LatticePoint, c: LatticePoint): number => {
    const v = (BigInt(b.x) - BigInt(a.x)) * (BigInt(c.y) - BigInt(a.y)) - (BigInt(b.y) - BigInt(a.y)) * (BigInt(c.x) - BigInt(a.x));
    return v > 0n ? 1 : v < 0n ? -1 : 0;
  };
  const on = (a: LatticePoint, b: LatticePoint, c: LatticePoint): boolean =>
    Math.min(a.x, b.x) <= c.x && c.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= c.y && c.y <= Math.max(a.y, b.y);
  const meet = (p1: LatticePoint, p2: LatticePoint, q1: LatticePoint, q2: LatticePoint): boolean => {
    const d1 = o(q1, q2, p1);
    const d2 = o(q1, q2, p2);
    const d3 = o(p1, p2, q1);
    const d4 = o(p1, p2, q2);
    if (d1 * d2 < 0 && d3 * d4 < 0) return true;
    return (d1 === 0 && on(q1, q2, p1)) || (d2 === 0 && on(q1, q2, p2)) || (d3 === 0 && on(p1, p2, q1)) || (d4 === 0 && on(p1, p2, q2));
  };
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      if (j === i + 1 || (i === 0 && j === n - 1)) continue;
      if (meet(r[i], r[(i + 1) % n], r[j], r[(j + 1) % n])) return false;
    }
  }
  return true;
}

/** A B-FUZZ chord: arc positions on the frame [0, 4000]², a half-width or a two-knot profile, the ends. */
export interface Chord {
  readonly a: number;
  readonly b: number;
  readonly hw: number;
  readonly knots: readonly [number, number] | null;
  readonly ends: 'round' | 'square';
}

/** A point on the frame [0, 4000]²'s boundary by its arc position (counter-clockwise from (0, 0)). */
export function onFrame(s: number): [number, number] {
  if (s < 4000) return [s, 0];
  if (s < 8000) return [4000, s - 4000];
  if (s < 12_000) return [12_000 - s, 4000];
  return [0, 16_000 - s];
}

/** A chord's width declaration: its scalar half-width and ends, or its two-knot profile. */
export type ChordWidth = ChainProfile<number> | { halfWidthCm: number; ends: 'round' | 'square' };

/**
 * B-FUZZ's street network from its chords (a fresh arena each call): each chord far enough from the frame's own sides
 * inserted as an L1 way (its two knots on its ends where it carries a profile), the L1 faces owned by district:1.
 */
export function network(chords: readonly Chord[]): { p: Plat; faces: FaceId[]; table: Record<string, ChordWidth> } {
  const p = framed();
  const table: Record<string, ChordWidth> = {};
  chords.forEach((c, i) => {
    const a = onFrame(c.a);
    const b = onFrame(c.b);
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 300 || (a[0] === b[0] && (a[0] === 0 || a[0] === 4000)) || (a[1] === b[1] && (a[1] === 0 || a[1] === 4000))) return;
    const knots = c.knots === null ? {} : { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }] };
    const r = tx(p, spec(1), (o) => insertChain(o, [pt(a[0], a[1]), pt(b[0], b[1])], [{ role: 'way', entity: `way:${String(i)}` }], 'mandatory', knots));
    if (!r.ok) return;
    table[`way:${String(i)}`] = c.knots === null ? { halfWidthCm: c.hw, ends: c.ends } : profile([c.knots[0], c.knots[1]]);
  });
  const faces: FaceId[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (p.faces[1].kind[f] !== 0xffff) faces.push(f);
  commit(p, 1, (o) => setOwner(o, faces, 'district:1'));
  return { p, faces, table };
}

/** B-FUZZ's wall band along the network's first chain (in key order): half its half-width (≥ 1) or its profile. */
export function firstBand(table: Readonly<Record<string, ChordWidth>>): { ref: ChainRef; halfWidthCm: number | ChainProfile<number>; ends: 'round' | 'square' }[] {
  const first = Object.keys(table).sort()[0];
  if (first === undefined) return [];
  const w = table[first];
  return 'knotRole' in w ? [{ ref: { role: 'way', entity: first }, halfWidthCm: w, ends: 'round' }] : [{ ref: { role: 'way', entity: first }, halfWidthCm: Math.max(1, Math.floor(w.halfWidthCm / 2)), ends: w.ends }];
}
