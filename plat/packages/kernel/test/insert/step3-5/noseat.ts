// Round S15 (LINES 2 – 4; RL1 / J238 (1)): the residual certificates of notBuilt #2's classes E and S, written from §3.6's
// placement rule and §3.10's clearance in q104.test.ts `seatsNear`'s form — test-side, importing nothing from insert/
// (the router's own readings are what they certify; a certificate built from them would certify nothing).
//
// noSeat (class E): no seat exists for a chain point c within the fidelity bound 2 · √2 · attractCm of it at level n —
//   (a) no lattice point on a live edge of level ≤ n within the hot pixel of its line, strictly inside it, at least
//       minEdge from its two ends (§3.6 (ii)), at least minEdge from every other live vertex and from every live edge
//       not incident to its two ends (§3.6 (iii), §3.10);
//   (b) no free lattice point: at least minEdge from every live vertex and every live edge, of any level (§3.10);
//   (c) no live vertex of level ≤ n, nor a finer vertex on a route of level ≤ n (an incident edge of level ≤ n: step 3
//       promotes it, stretch.ts), within the bound.
//   All three empty, no landing of c keeps the bound: the endpoint fallback is the only landing step 2 has, and a route
//   from it leaves the bound — the refusal is the design's own (§3.6 *The fidelity bound*: "no route keeps clearance").
//
// noSeatS (class S): for a chain segment a → b crossing level-≤ n runs, every crossed run spans the bound region of the
//   segment (both its ends beyond the bound of the segment) and holds no seat within the bound of the SEGMENT (a lattice
//   point on it keeping (ii) / (iii), as (a)), and no vertex of any level on a route of level ≤ n lies within that bound —
//   so every in-bound route must cross each such run and no crossing can be placed within the bound.
import { edgeLevel, isHalfEdgeLive, isVertexLive, outgoing, type Plat } from '../../../src/arena/index.js';
import { LATTICE } from '../../../src/num/index.js';

/** The fidelity bound, squared: 8 · attractCm² = 5 408 cm² (2 · √2 · attractCm ≈ 73.54 cm). */
export const BOUND_SQ = 8 * LATTICE.attractCm * LATTICE.attractCm;
const MIN = LATTICE.minEdgeCm;
const HOT = 0.71;

interface P2 {
  readonly x: number;
  readonly y: number;
}

/** The squared distance from q to the closed segment a–b. */
function segD2(q: P2, a: P2, b: P2): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / l2));
  const ex = q.x - a.x - t * dx;
  const ey = q.y - a.y - t * dy;
  return ex * ex + ey * ey;
}

interface Live {
  readonly verts: number[];
  readonly edges: { readonly u: number; readonly w: number; readonly level: number }[];
}

function live(p: Plat): Live {
  const X = p.vertices.x;
  const verts: number[] = [];
  for (let v = 0; v < X.length; v += 1) if (isVertexLive(p, v)) verts.push(v);
  const O = p.halfEdges.origin;
  const edges: { u: number; w: number; level: number }[] = [];
  for (let e = 0; 2 * e < O.length; e += 1) if (isHalfEdgeLive(p, 2 * e)) edges.push({ u: O[2 * e], w: O[2 * e + 1], level: edgeLevel(p, 2 * e) });
  return { verts, edges };
}

export interface SeatReport {
  /** (a): lattice points on a level-≤ n edge keeping (ii) / (iii). */
  readonly seats: string[];
  /** (b): free lattice points keeping clearance. */
  readonly free: string[];
  /** (c): vertices of level ≤ n, or finer on a level-≤ n route. */
  readonly vertices: string[];
}

/**
 * The seats of a chain point c at level n within `bound2` (cm², the fidelity bound by default) — `noSeat` is all three
 * lists empty. A full lattice scan of the disc (about 17 000 points at the bound), each tested against every live vertex
 * and edge: a certificate, not a router.
 */
export function seatsOf(p: Plat, n: number, c: P2, bound2: number = BOUND_SQ): SeatReport {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const L = p.vertices.level;
  const { verts, edges } = live(p);
  const at = (v: number): P2 => ({ x: X[v], y: Y[v] });
  const R = Math.ceil(Math.sqrt(bound2));
  // only geometry that can reach the disc matters
  const reach2 = (R + MIN + 2) * (R + MIN + 2);
  const nearV = verts.filter((v) => (X[v] - c.x) ** 2 + (Y[v] - c.y) ** 2 <= reach2);
  const nearE = edges.filter((e) => segD2(c, at(e.u), at(e.w)) <= reach2);
  const seats: string[] = [];
  const free: string[] = [];
  for (let x = c.x - R; x <= c.x + R; x += 1) {
    for (let y = c.y - R; y <= c.y + R; y += 1) {
      if ((x - c.x) ** 2 + (y - c.y) ** 2 > bound2) continue;
      const q = { x, y };
      const clearOfVerts = (skip: (v: number) => boolean): boolean => nearV.every((v) => skip(v) || (X[v] - x) ** 2 + (Y[v] - y) ** 2 >= MIN * MIN);
      // (b) a free point
      if (clearOfVerts(() => false) && nearE.every((e) => segD2(q, at(e.u), at(e.w)) >= MIN * MIN)) free.push(`${x},${y}`);
      // (a) a split of a level-≤ n edge
      for (const e of nearE) {
        if (e.level > n) continue;
        const a = at(e.u);
        const b = at(e.w);
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const l2 = dx * dx + dy * dy;
        const dot = (x - a.x) * dx + (y - a.y) * dy;
        if (dot <= 0 || dot >= l2) continue;
        const o = dx * (y - a.y) - dy * (x - a.x);
        if (o * o > HOT * HOT * l2) continue;
        if ((x - a.x) ** 2 + (y - a.y) ** 2 < MIN * MIN || (x - b.x) ** 2 + (y - b.y) ** 2 < MIN * MIN) continue;
        if (!clearOfVerts((v) => v === e.u || v === e.w)) continue;
        if (!nearE.every((f) => f === e || f.u === e.u || f.u === e.w || f.w === e.u || f.w === e.w || segD2(q, at(f.u), at(f.w)) >= MIN * MIN)) continue;
        seats.push(`${x},${y}`);
        break;
      }
    }
  }
  const onRoute = (v: number): boolean => outgoing(p, v).some((h) => edgeLevel(p, h) <= n);
  const vertices = nearV.filter((v) => (X[v] - c.x) ** 2 + (Y[v] - c.y) ** 2 <= bound2 && (L[v] <= n || onRoute(v))).map((v) => `${X[v]},${Y[v]}`);
  return { seats, free, vertices };
}

/** noSeat: the chain point c has no seat within the fidelity bound at level n (`seatsOf`, all three lists empty). */
export function noSeat(p: Plat, n: number, c: P2, bound2: number = BOUND_SQ): boolean {
  const s = seatsOf(p, n, c, bound2);
  return s.seats.length === 0 && s.free.length === 0 && s.vertices.length === 0;
}

export interface SeatReportS {
  /** The level-≤ n edges the input segment crosses properly. */
  readonly crossed: number;
  /** Crossed edges with an end within the bound of the segment (the run does not span the bound region). */
  readonly notSpanning: string[];
  /** Lattice points on a crossed edge within the bound of the segment keeping (ii) / (iii). */
  readonly seats: string[];
  /** Vertices of any level on a route of level ≤ n within the bound of the segment. */
  readonly vertices: string[];
}

/**
 * The class-S certificate's measures for the input segment a → b at level n (`noSeatS`: crossed > 0 and the three lists
 * empty): every crossed run spans the bound region and holds no seat within it, and no route vertex lies within it.
 */
export function seatsOfSegment(p: Plat, n: number, a: P2, b: P2, bound2: number = BOUND_SQ): SeatReportS {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const { verts, edges } = live(p);
  const at = (v: number): P2 => ({ x: X[v], y: Y[v] });
  const within = (q: P2): boolean => segD2(q, a, b) <= bound2;
  const orient = (u: P2, w: P2, q: P2): number => (w.x - u.x) * (q.y - u.y) - (w.y - u.y) * (q.x - u.x);
  const crosses = (u: P2, w: P2): boolean => {
    const o1 = orient(u, w, a);
    const o2 = orient(u, w, b);
    const o3 = orient(a, b, u);
    const o4 = orient(a, b, w);
    return ((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0));
  };
  const crossed = edges.filter((e) => e.level <= n && crosses(at(e.u), at(e.w)));
  const notSpanning = crossed.filter((e) => within(at(e.u)) || within(at(e.w))).map((e) => `${X[e.u]},${Y[e.u]}-${X[e.w]},${Y[e.w]}`);
  const R = Math.ceil(Math.sqrt(bound2));
  const reach2 = (R + MIN + 2) * (R + MIN + 2);
  const nearV = verts.filter((v) => segD2(at(v), a, b) <= reach2);
  const nearE = edges.filter((e) => Math.min(segD2(at(e.u), a, b), segD2(at(e.w), a, b), segD2(a, at(e.u), at(e.w)), segD2(b, at(e.u), at(e.w))) <= reach2 || crosses(at(e.u), at(e.w)));
  const seats: string[] = [];
  for (const e of crossed) {
    const u = at(e.u);
    const w = at(e.w);
    const dx = w.x - u.x;
    const dy = w.y - u.y;
    const l2 = dx * dx + dy * dy;
    const steps = Math.ceil(Math.sqrt(l2));
    const seen = new Set<string>();
    for (let k = 1; k < steps; k += 1) {
      const fx = u.x + (dx * k) / steps;
      const fy = u.y + (dy * k) / steps;
      for (const x of [Math.floor(fx), Math.ceil(fx)]) {
        for (const y of [Math.floor(fy), Math.ceil(fy)]) {
          const key = `${x},${y}`;
          if (seen.has(key)) continue;
          seen.add(key);
          const q = { x, y };
          if (!within(q)) continue;
          const dot = (x - u.x) * dx + (y - u.y) * dy;
          if (dot <= 0 || dot >= l2) continue;
          const o = dx * (y - u.y) - dy * (x - u.x);
          if (o * o > HOT * HOT * l2) continue;
          if ((x - u.x) ** 2 + (y - u.y) ** 2 < MIN * MIN || (x - w.x) ** 2 + (y - w.y) ** 2 < MIN * MIN) continue;
          if (!nearV.every((v) => v === e.u || v === e.w || (X[v] - x) ** 2 + (Y[v] - y) ** 2 >= MIN * MIN)) continue;
          if (!nearE.every((f) => f === e || f.u === e.u || f.u === e.w || f.w === e.u || f.w === e.w || segD2(q, at(f.u), at(f.w)) >= MIN * MIN)) continue;
          seats.push(key);
        }
      }
    }
  }
  const onRoute = (v: number): boolean => outgoing(p, v).some((h) => edgeLevel(p, h) <= n);
  const vertices = nearV.filter((v) => within(at(v)) && onRoute(v) && !((X[v] === a.x && Y[v] === a.y) || (X[v] === b.x && Y[v] === b.y))).map((v) => `${X[v]},${Y[v]}`);
  return { crossed: crossed.length, notSpanning, seats, vertices };
}

/** noSeatS: the input segment crosses at least one level-≤ n run, every crossed run spans the bound region and has no seat within it, and no route vertex stands within it. */
export function noSeatS(p: Plat, n: number, a: P2, b: P2, bound2: number = BOUND_SQ): boolean {
  const s = seatsOfSegment(p, n, a, b, bound2);
  return s.crossed > 0 && s.notSpanning.length === 0 && s.seats.length === 0 && s.vertices.length === 0;
}
