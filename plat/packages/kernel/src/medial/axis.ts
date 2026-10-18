// medialAxis(rings, stepCm): §3.8's sampled medial axis — "a Voronoi of boundary samples at 1 m (`sampleBoundary`) …,
// pruned by clearance" — built over delaunator's triangulation with our own circumcentres (C-0007), the `spine`
// reader's typed downgrade (§3.8, §5.2 F-SKELETON: label spines §9.3, S1's coast clamp, the plan rung's room spines).
// M0-a-12. Like the skeleton it never writes an arena and nothing of it is stored: a value derived again from the same
// rings, identically on every host. It is not a façade member (C-0078); `skeleton(rings, 'spine', { medialAxis })`
// takes it injected (C-0168 (6)). Its open cases are decided in C-0172, the graph's construction as C-0176 replaces
// C-0172 (5) – (6):
//   * the samples are `sampleBoundary`'s at `stepCm`, each rounded to the lattice (within 0.71 cm of the boundary), so
//     the adapter's duplicate merge and collinearity test are exact (C-0172 (2)); then refined — a piece (two
//     consecutive samples of a ring) whose diametral disc, widened by 2 cm, holds another site is split at its
//     midpoint, down to an 8 cm floor — so no Voronoi vertex lies within 1 cm of the sampled boundary (C-0176 (1));
//   * the graph is the dual of the Delaunay triangles inside the sampled boundary (an exact parity walk across the
//     pieces, each an edge of the triangulation): connected, one independent cycle per hole (C-0176 (2));
//   * pruned by clearance from its leaves only — a leaf's arc goes when its two sites lie no farther apart along their
//     ring than π × its least clearance, so a corner of 90° or more leaves no branch — which never splits the graph
//     and never opens a hole's loop (C-0176 (3));
//   * centres within 1 mm are one node, nodes in (x, y, t) order, arcs (a < b) in order; a face whose graph is all
//     prunable is the one node of greatest clearance (a square's centre) (C-0172 (6), C-0176 (3));
//   * a centre within 10⁻⁶ cm of a ring edge is not inside and an arc passing that near one meets it, so a face the
//     construction cannot resolve still answers every node inside and no arc meeting a ring, in world cm (C-0176 (4)).
import { delaunay } from '../adapters/delaunator.js';
import { packBoxes, searchPacked, type PackedTree } from '../adapters/flatbush.js';
import { sampleBoundary } from '../geom/boundary.js';
import { distinctRing, lp, offLattice, PI, type XY } from '../geom/common.js';
import { roundHalfAway } from '../num/lattice.js';
import { err, ok, orient2d, ratio, type KernelResult } from '../num/index.js';
import { segmentsMeet } from '../num/exact.js';
import type { Cm, LatticePoint, Polygon } from '../types/index.js';
import { circumcentres, voronoiEdges } from './dual.js';

/** §3.8's sample step: boundary samples at 1 m. */
export const MEDIAL_STEP_CM = 100;
/** The pruning ratio: a leaf's arc goes when its two samples lie no farther apart along their ring than this × its least clearance. */
export const MEDIAL_PRUNE_RATIO = PI;
/** Circumcentres closer than this (1 mm) are one node (a cocircular set's repeated centre). */
export const MEDIAL_MERGE_CM = 0.1;
/** The slack beyond half a step under which an arc is tested against the ring edges (the samples' rounding, 0.71 cm, and more). */
export const MEDIAL_CROSS_SLACK_CM = 1;
/**
 * A node nearer a ring edge than this (10⁻⁶ cm), or an arc passing that near one, is taken as touching it: far above the
 * world shift's rounding (≤ 2 × 10⁻⁹ cm within ±10⁷ cm), so every node stays inside and no arc meets a ring read in world
 * cm too (C-0176 (4)).
 */
export const MEDIAL_TOUCH_CM = 1e-6;
/** The refinement's widening of a piece's diametral disc: twice the 1 cm every Voronoi vertex then keeps from the sampled boundary. */
export const MEDIAL_REFINE_MARGIN_CM = 2;
/** A piece no longer than this is not split again (its halves would be under 4 cm, the samples' rounding scale). */
export const MEDIAL_REFINE_FLOOR_CM = 8;
/** The refinement stops before the sites would exceed this × the step's samples + 256 (a bound on the work, never a timeout; the round is undone). */
export const MEDIAL_REFINE_CAP = 8;

/** A node of the axis: a Voronoi vertex in world centimetres (doubles) and its clearance `t`, its distance to its nearest boundary samples. */
export interface MedialNode {
  x: number;
  y: number;
  t: number;
}

/** An arc of the axis between nodes `a` < `b`. */
export interface MedialArc {
  a: number;
  b: number;
}

/**
 * The sampled medial axis (§3.8): a planar graph in canonical order — nodes sorted by x, then y, then t; arcs with
 * a < b, sorted by (a, b). Its clearance `t` stands where the skeleton's offset time does for the `spine` readers (§9.3's
 * maximum-clearance spanning tree reads the smaller `t` of an arc's ends).
 */
export interface MedialAxis {
  kind: 'medialAxis';
  stepCm: number;
  /** The distinct lattice sites triangulated (the rounded samples at the step and the refinement's, duplicates merged). */
  sites: number;
  /** The samples the refinement added (C-0176 (1)). */
  refined: number;
  /**
   * True when the construction met its conditions (C-0176 (4)): the refinement left no piece crowded (none at its floor or
   * its cap), every piece is an edge of the triangulation with a consistent inside parity, and no node or arc had to
   * be dropped except from a leaf. Then the axis is the dual graph of the triangles inside the sampled boundary pruned
   * from its leaves — for a face the skeleton's contract accepts, connected with one independent cycle per hole.
   * False marks a face the guarantee does not cover (rings within about 9 cm of each other, touching or crossing rings,
   * a cap hit); its axis is still answered, every node inside (at least MEDIAL_TOUCH_CM from every ring edge) and no
   * arc meeting a ring.
   */
  resolved: boolean;
  nodes: MedialNode[];
  arcs: MedialArc[];
}

const emptyAxis = (stepCm: number, sites: number, refined: number, resolved: boolean): MedialAxis => ({
  kind: 'medialAxis',
  stepCm,
  sites,
  refined,
  resolved,
  nodes: [],
  arcs: [],
});

/** The least distance from p to the segment u v (each point of a Voronoi edge is that far from its generator). */
function leastClearance(px: number, py: number, ux: number, uy: number, vx: number, vy: number): number {
  const dx = vx - ux;
  const dy = vy - uy;
  const wx = px - ux;
  const wy = py - uy;
  const along = wx * dx + wy * dy;
  const len2 = dx * dx + dy * dy;
  const toU = Math.sqrt(wx * wx + wy * wy);
  const toV = Math.sqrt((px - vx) * (px - vx) + (py - vy) * (py - vy));
  if (along <= 0) return toU;
  if (along >= len2) return toV;
  const off = ratio(Math.abs(wx * dy - wy * dx), Math.sqrt(len2), 'length');
  // an edge shorter than 1 cm: its nearer end, within the edge's length of the true least distance
  return off.ok ? off.value : Math.min(toU, toV);
}

/** One ring's samples in the local frame: exact points on the ring, their lattice roundings, arc-length positions, and the ring's length. */
interface RingSamples {
  x: number[];
  y: number[];
  lx: number[];
  ly: number[];
  pos: number[];
  perimeter: number;
}

function ringSamples(s: readonly XY[]): RingSamples {
  const x: number[] = [];
  const y: number[] = [];
  const pos: number[] = [];
  let acc = 0;
  for (let j = 0; j < s.length; j += 1) {
    if (j > 0) {
      const dx = s[j].x - s[j - 1].x;
      const dy = s[j].y - s[j - 1].y;
      acc += Math.sqrt(dx * dx + dy * dy);
    }
    x.push(s[j].x);
    y.push(s[j].y);
    pos.push(acc);
  }
  if (s.length > 1) {
    const dx = s[0].x - s[s.length - 1].x;
    const dy = s[0].y - s[s.length - 1].y;
    acc += Math.sqrt(dx * dx + dy * dy);
  }
  return { x, y, lx: x.map(roundHalfAway), ly: y.map(roundHalfAway), pos, perimeter: acc };
}

/**
 * Splits each flagged piece (i, i + 1) of a ring at its exact midpoint — on the ring, since every ring vertex is a
 * sample and a piece's two samples lie on one ring edge — and rounds the new sample to the lattice.
 */
function splitPieces(rs: RingSamples, flag: Uint8Array): void {
  const n = rs.x.length;
  const x: number[] = [];
  const y: number[] = [];
  const pos: number[] = [];
  for (let i = 0; i < n; i += 1) {
    x.push(rs.x[i]);
    y.push(rs.y[i]);
    pos.push(rs.pos[i]);
    if (flag[i] === 1) {
      const j = i + 1 === n ? 0 : i + 1;
      const dx = rs.x[j] - rs.x[i];
      const dy = rs.y[j] - rs.y[i];
      x.push((rs.x[i] + rs.x[j]) / 2);
      y.push((rs.y[i] + rs.y[j]) / 2);
      pos.push(rs.pos[i] + Math.sqrt(dx * dx + dy * dy) / 2);
    }
  }
  rs.x = x;
  rs.y = y;
  rs.pos = pos;
  rs.lx = x.map(roundHalfAway);
  rs.ly = y.map(roundHalfAway);
}

/**
 * One refinement round (C-0176 (1)): a piece is crowded when its diametral disc, widened by MEDIAL_REFINE_MARGIN_CM
 * (closed, on the lattice samples), holds a sample other than its own two ends and the ring neighbours just before and
 * after them (a corner's own other leg, judged by the parity walk and the leaf rule instead). A crowded piece longer than
 * MEDIAL_REFINE_FLOOR_CM is split; one at the floor is counted as stuck.
 */
function refineRound(rings: RingSamples[]): { split: number; stuck: number } {
  let total = 0;
  for (const r of rings) total += r.x.length;
  if (total === 0) return { split: 0, stuck: 0 };
  const boxes = new Float64Array(4 * total);
  const ringOf = new Int32Array(total);
  const idxOf = new Int32Array(total);
  let k = 0;
  for (let r = 0; r < rings.length; r += 1) {
    const rs = rings[r];
    for (let i = 0; i < rs.x.length; i += 1) {
      boxes[4 * k] = rs.lx[i];
      boxes[4 * k + 1] = rs.ly[i];
      boxes[4 * k + 2] = rs.lx[i];
      boxes[4 * k + 3] = rs.ly[i];
      ringOf[k] = r;
      idxOf[k] = i;
      k += 1;
    }
  }
  const tree = packBoxes(boxes, total);
  let split = 0;
  let stuck = 0;
  const flags: Uint8Array[] = [];
  for (let r = 0; r < rings.length; r += 1) {
    const rs = rings[r];
    const n = rs.x.length;
    const flag = new Uint8Array(n);
    flags.push(flag);
    if (n < 2) continue;
    for (let i = 0; i < n; i += 1) {
      const j = i + 1 === n ? 0 : i + 1;
      const ex = rs.lx[i];
      const ey = rs.ly[i];
      const fx = rs.lx[j];
      const fy = rs.ly[j];
      if (ex === fx && ey === fy) continue;
      const mx = (ex + fx) / 2;
      const my = (ey + fy) / 2;
      const rho = Math.sqrt((fx - ex) * (fx - ex) + (fy - ey) * (fy - ey)) / 2 + MEDIAL_REFINE_MARGIN_CM;
      const before = i === 0 ? n - 1 : i - 1;
      const after = j + 1 === n ? 0 : j + 1;
      let crowded = false;
      for (const c of searchPacked(tree, mx - rho, my - rho, mx + rho, my + rho)) {
        if (ringOf[c] === r) {
          const ic = idxOf[c];
          if (ic === i || ic === j || ic === before || ic === after) continue;
        }
        const cx = boxes[4 * c] - mx;
        const cy = boxes[4 * c + 1] - my;
        if (cx * cx + cy * cy <= rho * rho) {
          crowded = true;
          break;
        }
      }
      if (!crowded) continue;
      const dx = rs.x[j] - rs.x[i];
      const dy = rs.y[j] - rs.y[i];
      if (dx * dx + dy * dy > MEDIAL_REFINE_FLOOR_CM * MEDIAL_REFINE_FLOOR_CM) {
        flag[i] = 1;
        split += 1;
      } else {
        stuck += 1;
      }
    }
  }
  for (let r = 0; r < rings.length; r += 1) if (flags[r].includes(1)) splitPieces(rings[r], flags[r]);
  return { split, stuck };
}

/** A binary min-heap of node ids by (key, id) — the peeling order: the leaf of least clearance first. */
class LeafHeap {
  private readonly items: number[] = [];
  constructor(private readonly key: Float64Array) {}
  get size(): number {
    return this.items.length;
  }
  private less(a: number, b: number): boolean {
    return this.key[a] < this.key[b] || (this.key[a] === this.key[b] && a < b);
  }
  push(t: number): void {
    const h = this.items;
    h.push(t);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!this.less(h[i], h[p])) break;
      const s = h[i];
      h[i] = h[p];
      h[p] = s;
      i = p;
    }
  }
  pop(): number {
    const h = this.items;
    const top = h[0];
    const last = h.pop() as number;
    if (h.length > 0) {
      h[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let s = i;
        if (l < h.length && this.less(h[l], h[s])) s = l;
        if (r < h.length && this.less(h[r], h[s])) s = r;
        if (s === i) break;
        const x = h[i];
        h[i] = h[s];
        h[s] = x;
        i = s;
      }
    }
    return top;
  }
}

/**
 * §3.8's sampled medial axis of the face the rings bound (`rings[0]` the outer ring, the rest its holes, lattice
 * points in either orientation; inside is read by the even–odd rule over all rings, so a ring set the skeleton's
 * contract refuses — a touching hole, a sharp corner, a crossing ring — is still answered). An off-lattice coordinate is
 * E_OUT_OF_RANGE; `stepCm` must be finite and ≥ 1 (a RangeError otherwise, as `sampleBoundary` asserts). No rings, fewer
 * than three distinct samples or collinear samples give the empty axis (§3.11 *no input*).
 */
export function medialAxis(rings: readonly Polygon[], stepCm: number = MEDIAL_STEP_CM): KernelResult<MedialAxis> {
  if (!(stepCm >= 1 && stepCm < Infinity)) throw new RangeError(`medialAxis: stepCm must be finite and ≥ 1, got ${String(stepCm)}`);
  for (const ring of rings) {
    const bad = offLattice<MedialAxis>(ring);
    if (bad !== null) return bad;
  }
  // the local frame: the rings' bounding-box corner, an exact integer translation, so the samples, their rounding and
  // every computation below are the same for a translated face (C-0172 (2))
  let ox = Infinity;
  let oy = Infinity;
  for (const ring of rings) {
    for (const p of ring) {
      if (p.x < ox) ox = p.x;
      if (p.y < oy) oy = p.y;
    }
  }
  if (ox === Infinity) return ok(emptyAxis(stepCm, 0, 0, true));
  const clean = rings.map((r) => distinctRing(r.map((p) => lp(p.x - ox, p.y - oy))));
  const rs = sampleBoundary(clean, stepCm).map(ringSamples);
  const latticeSamples = (): LatticePoint[] => {
    const out: LatticePoint[] = [];
    for (const r of rs) for (let i = 0; i < r.lx.length; i += 1) out.push({ x: r.lx[i] as Cm, y: r.ly[i] as Cm });
    return out;
  };
  const initial = latticeSamples();

  // fewer than three distinct or collinear samples: no triangle (§3.11), before any refinement
  {
    let a = -1;
    let b = -1;
    let flat = true;
    for (let i = 0; i < initial.length && flat; i += 1) {
      const p = initial[i];
      if (a < 0) a = i;
      else if (b < 0) {
        if (p.x !== initial[a].x || p.y !== initial[a].y) b = i;
      } else if (orient2d(initial[a].x, initial[a].y, initial[b].x, initial[b].y, p.x, p.y) !== 0) flat = false;
    }
    if (flat) {
      const t0 = delaunay(initial);
      if (!t0.ok) return err(t0.code, t0.detail);
      return ok(emptyAxis(stepCm, t0.value.sites.length, 0, true));
    }
  }

  // (1) the refinement: crowded pieces split at their midpoints until none is left, or the floor, or the cap
  let resolved = true;
  const cap = MEDIAL_REFINE_CAP * initial.length + 256;
  for (;;) {
    const saved = rs.map((r) => ({ ...r }));
    const { split, stuck } = refineRound(rs);
    let total = 0;
    for (const r of rs) total += r.x.length;
    if (total > cap) {
      for (let r = 0; r < rs.length; r += 1) rs[r] = saved[r];
      resolved = false;
      break;
    }
    if (split === 0) {
      if (stuck > 0) resolved = false;
      break;
    }
  }

  const points = latticeSamples();
  const refined = points.length - initial.length;
  const ringOfPoint: number[] = [];
  const posOfPoint: number[] = [];
  for (let r = 0; r < rs.length; r += 1) {
    for (let i = 0; i < rs[r].x.length; i += 1) {
      ringOfPoint.push(r);
      posOfPoint.push(rs[r].pos[i]);
    }
  }
  const tri = delaunay(points);
  if (!tri.ok) return err(tri.code, tri.detail);
  const d = tri.value;
  const m = d.sites.length;
  if (d.triangles.length === 0) return ok(emptyAxis(stepCm, m, refined, resolved));

  // each site's ring and position: its first sample's
  const ringOf = new Int32Array(m).fill(-1);
  const posOf = new Float64Array(m);
  for (let i = 0; i < points.length; i += 1) {
    const s = d.siteOf[i];
    if (ringOf[s] < 0) {
      ringOf[s] = ringOfPoint[i];
      posOf[s] = posOfPoint[i];
    }
  }
  const sx = new Float64Array(m);
  const sy = new Float64Array(m);
  for (let k = 0; k < m; k += 1) {
    sx[k] = d.sites[k].x;
    sy[k] = d.sites[k].y;
  }

  // the ring edges and their packed index: every node strictly inside the face, no arc meeting a ring
  const ex: number[] = [];
  for (const ring of clean) {
    const n = ring.length;
    if (n < 2) continue;
    for (let i = 0; i < n; i += 1) {
      const a = ring[i];
      const b = ring[i + 1 === n ? 0 : i + 1];
      ex.push(a.x, a.y, b.x, b.y);
    }
  }
  const edgeCount = ex.length / 4;
  if (edgeCount === 0) return ok(emptyAxis(stepCm, m, refined, resolved));
  const boxes = new Float64Array(4 * edgeCount);
  let maxX = 0;
  for (let e = 0; e < edgeCount; e += 1) {
    const ax = ex[4 * e];
    const ay = ex[4 * e + 1];
    const bx = ex[4 * e + 2];
    const by = ex[4 * e + 3];
    boxes[4 * e] = Math.min(ax, bx);
    boxes[4 * e + 1] = Math.min(ay, by);
    boxes[4 * e + 2] = Math.max(ax, bx);
    boxes[4 * e + 3] = Math.max(ay, by);
    if (boxes[4 * e + 2] > maxX) maxX = boxes[4 * e + 2];
  }
  const tree: PackedTree = packBoxes(boxes, edgeCount);

  const centre = circumcentres(d, 0, 0);
  const tris = d.triangles;
  const half = d.halfedges;
  const triCount = tris.length / 3;
  // a centre strictly inside the face by the even–odd rule (a ray to +x, each edge counted when the centre lies on its
  // inner side) and at least MEDIAL_TOUCH_CM from every ring edge: the half-open count alone takes a point of a left or
  // lower edge for inside, and an unresolved face's centre can fall on a wall or within rounding of it (C-0176 (4))
  const goodMemo = new Int8Array(triCount).fill(-1);
  const good = (t: number): boolean => {
    const known = goodMemo[t];
    if (known >= 0) return known === 1;
    const cx = centre[2 * t];
    const cy = centre[2 * t + 1];
    let odd = false;
    if (!Number.isNaN(cx) && !Number.isNaN(cy)) {
      for (const e of searchPacked(tree, cx, cy, maxX, cy)) {
        const ay = ex[4 * e + 1];
        const by = ex[4 * e + 3];
        if (ay > cy === by > cy) continue;
        const o = orient2d(ex[4 * e], ay, ex[4 * e + 2], by, cx, cy);
        if (by > ay ? o > 0 : o < 0) odd = !odd;
      }
      if (odd) {
        for (const e of searchPacked(tree, cx - MEDIAL_TOUCH_CM, cy - MEDIAL_TOUCH_CM, cx + MEDIAL_TOUCH_CM, cy + MEDIAL_TOUCH_CM)) {
          if (leastClearance(cx, cy, ex[4 * e], ex[4 * e + 1], ex[4 * e + 2], ex[4 * e + 3]) < MEDIAL_TOUCH_CM) {
            odd = false;
            break;
          }
        }
      }
    }
    goodMemo[t] = odd ? 1 : 0;
    return odd;
  };
  // an arc meets a ring when it crosses or touches one of its edges — num/exact.ts's closed-segment contact test: a
  // proper crossing, an end on the other segment, a collinear overlap (C-0314) — or passes within MEDIAL_TOUCH_CM of it;
  // the arc's ends are circumcentres, doubles off the lattice, where the test's signs are orient2d's double evaluation,
  // the same on every IEEE host
  const crossesRing = (ux: number, uy: number, vx: number, vy: number): boolean => {
    const d = MEDIAL_TOUCH_CM;
    for (const e of searchPacked(tree, Math.min(ux, vx) - d, Math.min(uy, vy) - d, Math.max(ux, vx) + d, Math.max(uy, vy) + d)) {
      const ax = ex[4 * e];
      const ay = ex[4 * e + 1];
      const bx = ex[4 * e + 2];
      const by = ex[4 * e + 3];
      if (segmentsMeet(ax, ay, bx, by, ux, uy, vx, vy)) return true;
      const near = Math.min(
        leastClearance(ux, uy, ax, ay, bx, by),
        leastClearance(vx, vy, ax, ay, bx, by),
        leastClearance(ax, ay, ux, uy, vx, vy),
        leastClearance(bx, by, ux, uy, vx, vy),
      );
      if (near < d) return true;
    }
    return false;
  };

  // (2) the triangles inside the sampled boundary (C-0176 (2)): every piece must be an edge of the triangulation; the
  // parity walks from the hull (outside, or inside across a piece on the hull) and flips across each piece — a site
  // pair two rings share counts twice, the even–odd rule's reading
  const nextH = (h: number): number => (h % 3 === 2 ? h - 2 : h + 1);
  const pairKey = (a: number, b: number): number => (a < b ? a * m + b : b * m + a);
  const pieceCount = new Map<number, number>();
  const pieceKeys: number[] = [];
  {
    let base = 0;
    for (const r of rs) {
      const n = r.x.length;
      if (n >= 2) {
        for (let i = 0; i < n; i += 1) {
          const a = d.siteOf[base + i];
          const b = d.siteOf[base + (i + 1 === n ? 0 : i + 1)];
          if (a === b) continue;
          const k = pairKey(a, b);
          const c = pieceCount.get(k);
          if (c === undefined) pieceKeys.push(k);
          pieceCount.set(k, (c ?? 0) + 1);
        }
      }
      base += n;
    }
  }
  const isPiece = (h: number): boolean => ((pieceCount.get(pairKey(tris[h], tris[nextH(h)])) ?? 0) & 1) === 1;
  const inside = new Int8Array(triCount).fill(-1);
  let walked = true;
  {
    const dtEdges = new Set<number>();
    for (let h = 0; h < tris.length; h += 1) dtEdges.add(pairKey(tris[h], tris[nextH(h)]));
    for (const k of pieceKeys) if (!dtEdges.has(k)) walked = false;
  }
  if (walked) {
    const queue: number[] = [];
    for (let h = 0; h < tris.length && walked; h += 1) {
      if (half[h] >= 0) continue;
      const t = (h - (h % 3)) / 3;
      const p = isPiece(h) ? 1 : 0;
      if (inside[t] < 0) {
        inside[t] = p;
        queue.push(t);
      } else if (inside[t] !== p) walked = false;
    }
    for (let qi = 0; qi < queue.length && walked; qi += 1) {
      const t = queue[qi];
      for (let k = 0; k < 3; k += 1) {
        const h = 3 * t + k;
        const tw = half[h];
        if (tw < 0) continue;
        const u = (tw - (tw % 3)) / 3;
        const p = inside[t] ^ (isPiece(h) ? 1 : 0);
        if (inside[u] < 0) {
          inside[u] = p;
          queue.push(u);
        } else if (inside[u] !== p) {
          walked = false;
          break;
        }
      }
    }
    for (let t = 0; t < triCount && walked; t += 1) if (inside[t] < 0) walked = false;
  }
  if (!walked) {
    // a piece missing from the triangulation (crossing or touching rings at the floor): the centres' own position decides
    resolved = false;
    for (let t = 0; t < triCount; t += 1) inside[t] = good(t) ? 1 : 0;
  }

  // the dual graph: one arc per Delaunay edge between two inside triangles; good centres within 1 mm are one node
  // (union along those arcs, the lowest triangle the root — a contraction, so the graph's topology stands)
  const edges = voronoiEdges(d).filter((e) => inside[e.u] === 1 && inside[e.v] === 1);
  const parent = new Int32Array(triCount);
  for (let t = 0; t < triCount; t += 1) parent[t] = t;
  const find = (t: number): number => {
    let r = t;
    while (parent[r] !== r) r = parent[r];
    let c = t;
    while (parent[c] !== r) {
      const next = parent[c];
      parent[c] = r;
      c = next;
    }
    return r;
  };
  for (const { u, v } of edges) {
    const gx = centre[2 * u] - centre[2 * v];
    const gy = centre[2 * u + 1] - centre[2 * v + 1];
    if (!(gx * gx + gy * gy < MEDIAL_MERGE_CM * MEDIAL_MERGE_CM) || !good(u) || !good(v)) continue;
    const a = find(u);
    const b = find(v);
    if (a < b) parent[b] = a;
    else if (b < a) parent[a] = b;
  }
  const clearance = (t: number): number => {
    const s = tris[3 * t];
    const gx = centre[2 * t] - sx[s];
    const gy = centre[2 * t + 1] - sy[s];
    return Math.sqrt(gx * gx + gy * gy);
  };

  // the arcs between roots: prunable when each of its Voronoi edges fails the ratio test (its two sites no farther apart
  // along their ring — the shorter way round; different rings: never — than π × its least clearance); bad when it meets
  // a ring (tested when its least clearance is at most half a step + 1 cm: an arc with more clearance cannot reach the
  // boundary, every boundary point lying within half a step + 0.71 cm of a site)
  const crossLimit = stepCm / 2 + MEDIAL_CROSS_SLACK_CM + MEDIAL_MERGE_CM;
  const arcAt = new Map<number, number>();
  const arcA: number[] = [];
  const arcB: number[] = [];
  const prunable: number[] = [];
  const arcRMin: number[] = [];
  for (const { u, v, p, q } of edges) {
    const a = find(u);
    const b = find(v);
    if (a === b) continue;
    const rMin = leastClearance(sx[p], sy[p], centre[2 * u], centre[2 * u + 1], centre[2 * v], centre[2 * v + 1]);
    let apart = Infinity;
    if (ringOf[p] === ringOf[q]) {
      const along = Math.abs(posOf[p] - posOf[q]);
      apart = Math.min(along, rs[ringOf[p]].perimeter - along);
    }
    const cut = !(apart > MEDIAL_PRUNE_RATIO * rMin);
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    const key = lo * triCount + hi;
    const at = arcAt.get(key);
    if (at === undefined) {
      arcAt.set(key, arcA.length);
      arcA.push(lo);
      arcB.push(hi);
      prunable.push(cut ? 1 : 0);
      arcRMin.push(rMin);
    } else {
      if (!cut) prunable[at] = 0;
      if (rMin < arcRMin[at]) arcRMin[at] = rMin;
    }
  }
  const arcCount = arcA.length;
  const badArc = new Uint8Array(arcCount);
  for (let i = 0; i < arcCount; i += 1) {
    const a = arcA[i];
    const b = arcB[i];
    if (good(a) && good(b) && arcRMin[i] <= crossLimit && crossesRing(centre[2 * a], centre[2 * a + 1], centre[2 * b], centre[2 * b + 1])) badArc[i] = 1;
  }

  // (3) pruned from the leaves only (C-0176 (3)): the leaf of least clearance first, its arc removed when prunable, bad,
  // or the leaf's centre is not inside the face — so the graph never splits and no hole's loop opens
  const nodes: number[] = [];
  const deg = new Int32Array(triCount);
  const incidence = new Map<number, number[]>();
  for (let i = 0; i < arcCount; i += 1) {
    for (const t of [arcA[i], arcB[i]]) {
      let list = incidence.get(t);
      if (list === undefined) {
        list = [];
        incidence.set(t, list);
        nodes.push(t);
      }
      list.push(i);
      deg[t] += 1;
    }
  }
  const leafKey = new Float64Array(triCount);
  for (const t of nodes) leafKey[t] = clearance(t);
  const arcAlive = new Uint8Array(arcCount).fill(1);
  const nodeAlive = new Uint8Array(triCount);
  for (const t of nodes) nodeAlive[t] = 1;
  const peel = (): void => {
    const heap = new LeafHeap(leafKey);
    for (const t of nodes) if (nodeAlive[t] === 1 && deg[t] === 1) heap.push(t);
    while (heap.size > 0) {
      const u = heap.pop();
      if (nodeAlive[u] === 0 || deg[u] !== 1) continue;
      let arc = -1;
      for (const i of incidence.get(u) ?? []) if (arcAlive[i] === 1) arc = i;
      if (arc < 0 || !(prunable[arc] === 1 || badArc[arc] === 1 || !good(u))) continue;
      arcAlive[arc] = 0;
      nodeAlive[u] = 0;
      deg[u] = 0;
      const v = arcA[arc] === u ? arcB[arc] : arcA[arc];
      deg[v] -= 1;
      if (deg[v] === 1) heap.push(v);
      else if (deg[v] === 0 && !good(v)) nodeAlive[v] = 0;
    }
  };
  peel();
  // a bad node or arc left inside the graph (not reachable from a leaf): dropped, the face marked unresolved, and the
  // leaves pruned again
  let forced = false;
  for (let i = 0; i < arcCount; i += 1) {
    if (arcAlive[i] === 1 && (badArc[i] === 1 || !good(arcA[i]) || !good(arcB[i]))) {
      arcAlive[i] = 0;
      deg[arcA[i]] -= 1;
      deg[arcB[i]] -= 1;
      forced = true;
    }
  }
  for (const t of nodes) {
    if (nodeAlive[t] === 1 && !good(t)) {
      nodeAlive[t] = 0;
      forced = true;
    }
  }
  if (forced) {
    resolved = false;
    peel();
  }

  // the nodes left: those with arcs, and the last node of a graph pruned to one (its node of greatest clearance); a
  // face whose triangles give no arc at all is its inside node of greatest clearance
  const used: number[] = [];
  for (const t of nodes) if (nodeAlive[t] === 1) used.push(t);
  if (used.length === 0) {
    let best = -1;
    let bestT = -1;
    for (let t = 0; t < triCount; t += 1) {
      if (inside[t] !== 1 || !good(t)) continue;
      const c = clearance(t);
      if (c > bestT) {
        best = t;
        bestT = c;
      }
    }
    if (best < 0) return ok(emptyAxis(stepCm, m, refined, resolved));
    used.push(find(best));
  }

  // canonical order: nodes by (x, y, t) in the local frame, then their root; arcs by (a, b)
  const nodeOf = used.map((t) => ({ t, x: centre[2 * t], y: centre[2 * t + 1], c: clearance(t) }));
  nodeOf.sort((g, h) => g.x - h.x || g.y - h.y || g.c - h.c || g.t - h.t);
  const index = new Int32Array(triCount).fill(-1);
  nodeOf.forEach((g, i) => {
    index[g.t] = i;
  });
  const arcs: MedialArc[] = [];
  for (let i = 0; i < arcCount; i += 1) {
    if (arcAlive[i] !== 1) continue;
    const a = index[arcA[i]];
    const b = index[arcB[i]];
    arcs.push(a < b ? { a, b } : { a: b, b: a });
  }
  arcs.sort((g, h) => g.a - h.a || g.b - h.b);
  return ok({
    kind: 'medialAxis',
    stepCm,
    sites: m,
    refined,
    resolved,
    nodes: nodeOf.map((g) => ({ x: g.x + ox, y: g.y + oy, t: g.c })),
    arcs,
  });
}
