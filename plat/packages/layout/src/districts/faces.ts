// The coarse-face graph S6 grows over (M0-e-04; §4.5 *Grower*: "claims adjacent coarse faces of the L1 skeleton"; §3.3's
// canonical face keys; C-0245 (2), (3)). Read from the arena at L1 inside S6's batch, after the perimeter is inserted:
// every live L1 face in canonical face order (§3.3's keys, never slot order), its area, perimeter and owner; whether it
// is water (its L0 face a water body's), outside the frame (the margin), outside the perimeter (the hinterland's) or
// inside; and per neighbour pair the shared boundary's length and the barriers on it — an arterial of class ≥ the
// edge test's (`way` rows), the wall (`wall`, `wall_gate` and the strips' `setback` lines), water (`shore`, `bank`), a
// reservation boundary (`reserved`), the perimeter (its `district_bound` row) and the frame (`border`, `margin`).
// The patch test's hole check walks the boundary of a face set at L1 (`boundaryLoops`). Containment through `parent`
// (§2.8, §5.3's row): `districtOfFace`.
import {
  area2,
  compareFaces,
  hull,
  faceKey,
  faceWalk,
  idOf,
  isFaceLive,
  LaneWriter,
  nextAt,
  ratio,
  roleInfo,
  rowsOn,
  type FaceId,
  type HalfEdgeId,
  type LatticePoint,
  type LineageHash,
  type Plat,
} from '@plat/kernel';
import type { Id, Way } from '@plat/model';
import { PI } from '../siting/geom.js';
import type { XY } from './types.js';

/** The barrier bits of a shared boundary (§4.5's edge test and the quarter tree's penalty). */
export const BARRIER = Object.freeze({
  /** A way of class ≥ the edge test's (`s6.edge.minBarrierClass`, primary). */
  ARTERIAL: 1,
  /** The wall trace: `wall`, `wall_gate`, and the wall strips' `setback` lines (C-0033's stand-in). */
  WALL: 2,
  /** A shore or bank. */
  WATER: 4,
  /** A reservation boundary (`reserved`). */
  RESERVED: 8,
  /** The settlement perimeter (its `district_bound` row). */
  PERIMETER: 16,
  /** The frame (`border`). */
  FRAME: 32,
  /** The arena's outer ring (`margin`). */
  MARGIN: 64,
});

/** Every bit the edge test refuses (no seed kind is granted an exception at M0, C-0245 (3)). */
export const EDGE_TEST_BARRIERS = BARRIER.ARTERIAL | BARRIER.WALL | BARRIER.WATER | BARRIER.RESERVED | BARRIER.PERIMETER | BARRIER.FRAME | BARRIER.MARGIN;

/** The way classes in rank order (the highest first): the edge test's "class ≥ primary" reads this order. */
export const WAY_CLASS_ORDER: readonly string[] = Object.freeze(['through', 'primary', 'secondary', 'lane', 'alley', 'cul_de_sac', 'track', 'path']);

/** Where a coarse face lies. */
export type FaceSide = 'inside' | 'outside' | 'margin';

/** One live L1 face of the graph. */
export interface CoarseFace {
  /** Its slot: valid inside the batch that built the graph only. */
  readonly face: FaceId;
  /** Its canonical key's two vertices (x0, y0, x1, y1): the lowest-then-leftmost vertex and the next (§3.3). */
  readonly key: readonly [number, number, number, number];
  readonly areaCm2: number;
  readonly perimeterCm: number;
  readonly owner: Id | null;
  readonly water: boolean;
  readonly side: FaceSide;
  /** The outer ring's area-weighted centroid. */
  readonly centroid: XY;
}

/** One neighbour of a face: the shared boundary's length and the union of the barrier bits on it. */
export interface FaceLink {
  readonly other: number;
  readonly lengthCm: number;
  readonly barriers: number;
}

/** The coarse-face graph (see the module comment). */
export interface FaceGraph {
  readonly plat: Plat;
  /** The live L1 faces in canonical order: an index is a face's place in that order. */
  readonly faces: readonly CoarseFace[];
  /** Per face, its neighbours by index (a face with no L1 record across an edge is no neighbour). */
  readonly links: readonly ReadonlyMap<number, FaceLink>[];
  /** Per face, its rings' half-edges (outer first). */
  readonly rings: readonly (readonly HalfEdgeId[])[][];
  /** Half-edge → the index of the face on its left. */
  readonly halfFace: ReadonlyMap<HalfEdgeId, number>;
  /** Per face, the barrier bits of every edge of its own rings (its boundary's barriers). */
  readonly ringBarriers: readonly number[];
  /** Per face, the water bodies whose shore or bank rows its rings carry, with their lengths. */
  readonly shores: readonly ReadonlyMap<Id, number>[];
}

/** What the graph reads besides the arena. */
export interface FaceGraphOptions {
  /** Each way's class (the `way` rows' entities); a way row naming no listed way is the input's error. */
  readonly ways: ReadonlyMap<Id, Way['class']>;
  /** The edge test's class (§4.5: primary). */
  readonly minBarrierClass: string;
  /** The perimeter chain's `district_bound` entity. */
  readonly perimeter: Id;
  /** The water bodies' ids (their L0 faces' owners). */
  readonly water: ReadonlySet<Id>;
}

/** The barrier bits of one edge pair's rows. */
function edgeBarriers(p: Plat, h: HalfEdgeId, o: FaceGraphOptions, minRank: number, shore: (body: Id) => void): number {
  let bits = 0;
  for (const r of rowsOn(p, 'edge', h)) {
    const role = roleInfo(p.roles.kind[r]).name;
    const entity = idOf(p, p.roles.entity[r]);
    switch (role) {
      case 'way': {
        const cls = o.ways.get(entity);
        if (cls === undefined) throw new RangeError(`S6: the way row of ${entity} names no way of the input (the ways' classes decide the edge test)`);
        const rank = WAY_CLASS_ORDER.indexOf(cls);
        if (rank >= 0 && rank <= minRank) bits |= BARRIER.ARTERIAL;
        break;
      }
      case 'wall':
      case 'wall_gate':
      case 'setback':
        bits |= BARRIER.WALL;
        break;
      case 'shore':
      case 'bank':
        bits |= BARRIER.WATER;
        shore(entity);
        break;
      case 'reserved':
        bits |= BARRIER.RESERVED;
        break;
      case 'district_bound':
        if (entity === o.perimeter) bits |= BARRIER.PERIMETER;
        break;
      case 'border':
        bits |= BARRIER.FRAME;
        break;
      case 'margin':
        bits |= BARRIER.MARGIN;
        break;
      default:
        break;
    }
  }
  return bits;
}

/** S1's land components' owner ids, `land:<n>` (§4.2 S1 (8); C-0229 (3)). */
const S1_LAND_OWNER = /^land:(0|[1-9][0-9]*)$/;

/**
 * Is `owner` S1's background owner — a land component `land:<n>` (C-0229 (3)), which owns every L0 land face and which
 * the L1 faces inherit (§2.2 rule 4)? S6 re-owns those L1 faces like unowned ones (N-51; C-0265 refining C-0245 (2)).
 */
export function isS1LandOwner(owner: Id | null): boolean {
  return owner !== null && S1_LAND_OWNER.test(owner);
}

/**
 * The one rule by which S6 takes a coarse face on `side` (N-51; C-0265 refining C-0245 (2)): the face lies on that side
 * (inside the perimeter: a district's land, the count law's A; outside it: the hinterland's), is no water, and is either
 * unowned or owned by an S1 land component (`isS1LandOwner`). A reservation's barrier face, the wall strips' faces and
 * any other owner keep their owner. Used at S6's three sites: the claimable faces and both hinterland rules.
 */
export function s6Takes(f: CoarseFace, side: 'inside' | 'outside'): boolean {
  return f.side === side && !f.water && (f.owner === null || isS1LandOwner(f.owner));
}

function edgeLength(p: Plat, h: HalfEdgeId): number {
  const O = p.halfEdges.origin;
  const a = O[h];
  const b = O[h ^ 1];
  const dx = p.vertices.x[b] - p.vertices.x[a];
  const dy = p.vertices.y[b] - p.vertices.y[a];
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * The coarse-face graph of `p` at L1 (see the module comment). Throws a RangeError when a `way` row names a way the
 * options do not list (the input's error: the edge test cannot be decided without the way's class).
 */
export function faceGraph(p: Plat, o: FaceGraphOptions): FaceGraph {
  const minRank = WAY_CLASS_ORDER.indexOf(o.minBarrierClass);
  if (minRank < 0) throw new RangeError(`S6: the edge test's class '${o.minBarrierClass}' is no way class`);
  const slots: FaceId[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (isFaceLive(p, 1, f)) slots.push(f);
  slots.sort((a, b) => compareFaces(p, 1, a, b));
  const index = new Map<FaceId, number>();
  slots.forEach((f, i) => index.set(f, i));
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const rings: HalfEdgeId[][][] = [];
  const halfFace = new Map<HalfEdgeId, number>();
  for (let i = 0; i < slots.length; i += 1) {
    const rs = faceWalk(p, 1, slots[i]);
    rings.push(rs);
    for (const r of rs) for (const h of r) halfFace.set(h, i);
  }
  // Water: the face's own owner or its L0 face's owner is a water body.
  const F1 = p.faces[1];
  const F0 = p.faces[0];
  const ownerId = (h: number): Id | null => (h >= 0 ? idOf(p, h) : null);
  const faces: CoarseFace[] = [];
  const links: Map<number, FaceLink>[] = [];
  const ringBarriers: number[] = [];
  const shores: Map<Id, number>[] = [];
  const barrierOf = new Map<number, number>();
  for (let i = 0; i < slots.length; i += 1) {
    const f = slots[i];
    let a2 = 0;
    let per = 0;
    let cx = 0;
    let cy = 0;
    let outerA2 = 0;
    const lk = new Map<number, { length: number; barriers: number }>();
    const sh = new Map<Id, number>();
    let rb = 0;
    rings[i].forEach((ring, ri) => {
      for (const h of ring) {
        const x0 = X[O[h]];
        const y0 = Y[O[h]];
        const x1 = X[O[h ^ 1]];
        const y1 = Y[O[h ^ 1]];
        const cr = x0 * y1 - x1 * y0;
        a2 += cr;
        if (ri === 0) {
          outerA2 += cr;
          cx += (x0 + x1) * cr;
          cy += (y0 + y1) * cr;
        }
        const len = edgeLength(p, h);
        per += len;
        const pair = h >> 1;
        let bits = barrierOf.get(pair);
        if (bits === undefined) {
          bits = edgeBarriers(p, h, o, minRank, () => undefined);
          barrierOf.set(pair, bits);
        }
        if ((bits & BARRIER.WATER) !== 0) edgeBarriers(p, h, o, minRank, (body) => sh.set(body, (sh.get(body) ?? 0) + len));
        rb |= bits;
        const other = halfFace.get(h ^ 1);
        if (other === undefined || other === i) continue;
        const cur = lk.get(other);
        if (cur === undefined) lk.set(other, { length: len, barriers: bits });
        else {
          cur.length += len;
          cur.barriers |= bits;
        }
      }
    });
    const k = faceKey(p, 1, f);
    const den = 3 * outerA2;
    const c = Math.abs(den) >= 1 ? { x: q(cx, den), y: q(cy, den) } : { x: X[k[0]], y: Y[k[0]] };
    const parent = F1.parent[f];
    const water = o.water.has(ownerId(F1.owner[f]) ?? '') || (parent >= 0 && o.water.has(ownerId(F0.owner[parent]) ?? ''));
    faces.push({ face: f, key: [X[k[0]], Y[k[0]], X[k[1]], Y[k[1]]], areaCm2: a2 / 2, perimeterCm: per, owner: ownerId(F1.owner[f]), water, side: 'inside', centroid: c });
    const m = new Map<number, FaceLink>();
    for (const [other, v] of lk) m.set(other, { other, lengthCm: v.length, barriers: v.barriers });
    links.push(m);
    ringBarriers.push(rb);
    shores.push(sh);
  }
  // Sides: the margin faces (reached from the faces on the arena's outer ring — or, on an arena without one, from the
  // faces with an edge no L1 face lies across — without crossing the frame), then the faces outside the perimeter
  // (reached from the margin without crossing the perimeter); the rest lie inside.
  const side: FaceSide[] = faces.map(() => 'inside');
  let start: number[] = [];
  for (let i = 0; i < faces.length; i += 1) if ((ringBarriers[i] & BARRIER.MARGIN) !== 0) start.push(i);
  if (start.length === 0) {
    for (let i = 0; i < faces.length; i += 1) {
      let open = false;
      for (const r of rings[i]) for (const h of r) if (!halfFace.has(h ^ 1)) open = true;
      if (open) start.push(i);
    }
    start = start.filter((i) => !faces[i].water);
  }
  const reach = (from: readonly number[], blocked: number): Set<number> => {
    const seen = new Set<number>(from);
    const queue = from.slice();
    while (queue.length > 0) {
      const i = queue.pop() as number;
      for (const [j, l] of links[i]) {
        if (seen.has(j) || (l.barriers & blocked) !== 0) continue;
        seen.add(j);
        queue.push(j);
      }
    }
    return seen;
  };
  const margin = reach(start, BARRIER.FRAME);
  const outside = reach([...margin], BARRIER.PERIMETER);
  for (const i of outside) side[i] = 'outside';
  for (const i of margin) side[i] = 'margin';
  const out = faces.map((cf, i) => ({ ...cf, side: side[i] }));
  return { plat: p, faces: out, links, rings, halfFace, ringBarriers, shores };
}

function q(n: number, d: number): number {
  const r = ratio(n, d, 'area');
  if (!r.ok) throw new RangeError('S6: a centroid over an area below 1 cm²');
  return r.value;
}

/**
 * The number of boundary loops of a face set at L1 (a connected set without a hole has one): its boundary half-edges
 * — those whose twin's face is not a member — walked as cycles around the members (§4.5's hole check).
 */
export function boundaryLoops(g: FaceGraph, members: readonly number[], isMember: (i: number) => boolean): number {
  const p = g.plat;
  const interior = (h: HalfEdgeId): boolean => {
    const o = g.halfFace.get(h ^ 1);
    return o !== undefined && isMember(o);
  };
  const seen = new Set<HalfEdgeId>();
  let loops = 0;
  const guard = 4 * (g.halfFace.size + 1);
  for (const m of members) {
    for (const ring of g.rings[m]) {
      for (const h of ring) {
        if (seen.has(h) || interior(h)) continue;
        loops += 1;
        let e = h;
        let steps = 0;
        do {
          seen.add(e);
          let n = nextAt(p, 1, e);
          let spin = 0;
          while (interior(n)) {
            n = nextAt(p, 1, n ^ 1);
            if (++spin > guard) throw new Error('S6: a boundary walk does not close');
          }
          e = n;
          if (++steps > guard) throw new Error('S6: a boundary walk does not close');
        } while (e !== h);
      }
    }
  }
  return loops;
}

/**
 * The patch test's compactness (§4.5: "compactness ≥ 0.5"; C-0245 (7)): the patch's area over the area of the convex
 * hull of its faces' outer rings (the convex-hull ratio, 1 for a convex patch, falling as it bends round or snakes);
 * 0 when the hull has no area.
 */
export function hullCompactness(g: FaceGraph, members: readonly number[], areaCm2: number): number {
  const P = g.plat;
  const O = P.halfEdges.origin;
  const pts: LatticePoint[] = [];
  for (const m of members) for (const h of g.rings[m][0]) pts.push({ x: P.vertices.x[O[h]], y: P.vertices.y[O[h]] } as LatticePoint);
  const hr = hull(pts);
  if (!hr.ok) return 0;
  const r = ratio(2 * areaCm2, area2(hr.value), 'area');
  return r.ok ? r.value : 0;
}

/** Polsby–Popper, 4π·A ÷ P² (reported beside the patch test's measure; the plaza's compactness, §4.2 S3 (2)). */
export function polsbyPopper(areaCm2: number, perimeterCm: number): number {
  const r = ratio(4 * PI * areaCm2, perimeterCm * perimeterCm, 'area');
  return r.ok ? r.value : 0;
}

/** The hash of a string as a lineage-shaped H64 (a feature's address keys its seed lineage, C-0245 (5)). */
export function textLineage(text: string): LineageHash {
  return new LaneWriter().utf8(text).digest64() as LineageHash;
}

/** A face's seed lineage (§4.5: a remainder or leftover seed's first face): H64 of its canonical key's points. */
export function faceLineage(key: readonly [number, number, number, number]): LineageHash {
  const w = new LaneWriter();
  for (const v of key) w.i32(v);
  return w.digest64() as LineageHash;
}

/**
 * Containment through `parent` (§2.8; §5.3's containment row): the owner of the L1 face a face of `level` (≥ 1)
 * descends from — its district — or null.
 */
export function districtOfFace(p: Plat, level: 1 | 2 | 3 | 4, face: FaceId): Id | null {
  let l: number = level;
  let f = face;
  while (l > 1) {
    const parent = p.faces[l].parent[f];
    if (parent < 0) return null;
    f = parent;
    l -= 1;
  }
  const h = p.faces[1].owner[f];
  return h >= 0 ? idOf(p, h) : null;
}
