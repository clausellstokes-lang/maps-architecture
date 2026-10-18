// Random and constructive chains for M0-a-05's B-FUZZ (§13.1's two families): random chains anywhere in the frame, and
// the constructive classes §13.1 names for insertion — chains along existing chains (coincident typed chains, jittered
// within attractCm), collinear overlaps of 1 cm to the whole edge in the same and the opposite direction (lattice points
// exactly on the edge's line by gcd stepping), shallow crossings below minFaceAngle, segments grazing a vertex at 0,
// ±1 cm and 24 – 28 cm, rings (closed chains), self-touching and self-crossing zig-zags, duplicated and sub-minEdge
// points, a vertex beside an edge near its endpoint (the endpoint rule), and sharp V corners over an edge (the chain's own
// wedge). Written from the classes' definitions, never with the code under test.
import { isHalfEdgeLive, type Plat } from '../../../src/arena/index.js';
import type { Level } from '../../../src/types/index.js';
import { intIn } from './support.js';

/** One chain to insert. */
export interface GenChain {
  readonly kind: string;
  readonly level: Level;
  readonly points: [number, number][];
  readonly closed: boolean;
  readonly cls: 'mandatory' | 'optional';
  readonly pinned?: number[];
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

/** A random live edge's two ends as points, or null. */
function someEdge(p: Plat, rnd: () => number): [[number, number], [number, number]] | null {
  const pairs: number[] = [];
  for (let e = 0; e < p.slots.pair.top; e++) if (isHalfEdgeLive(p, 2 * e)) pairs.push(e);
  if (pairs.length === 0) return null;
  const e = pairs[intIn(rnd, 0, pairs.length - 1)];
  const O = p.halfEdges.origin;
  const a = O[2 * e];
  const b = O[2 * e + 1];
  return [[p.vertices.x[a], p.vertices.y[a]], [p.vertices.x[b], p.vertices.y[b]]];
}

const clampIn = (v: number, side: number): number => Math.max(30, Math.min(side - 30, Math.round(v)));

/** A chain of one of the classes, inside the frame [0, side]². */
export function genChain(p: Plat, rnd: () => number, side: number, level: Level): GenChain {
  const cls = rnd() < 0.5 ? 'mandatory' : 'optional';
  const r = rnd();
  const any = (): [number, number] => [intIn(rnd, 40, side - 40), intIn(rnd, 40, side - 40)];
  const e = someEdge(p, rnd);
  if (r < 0.3 || e === null) {
    const k = intIn(rnd, 2, 6);
    const pts: [number, number][] = [];
    for (let i = 0; i < k; i++) pts.push(any());
    return { kind: 'random', level, points: pts, closed: k >= 3 && rnd() < 0.25, cls };
  }
  const [[ax, ay], [bx, by]] = e;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy);
  if (r < 0.42) {
    // A collinear overlap: lattice points exactly on the edge's line (gcd stepping), from 1 cm to the whole edge,
    // either direction, possibly continuing past an end.
    const g = gcd(dx, dy);
    const sx = dx / g;
    const sy = dy / g;
    const s0 = intIn(rnd, -Math.min(g, 40), g + Math.min(g, 40));
    const s1 = intIn(rnd, -Math.min(g, 40), g + Math.min(g, 40));
    const pts: [number, number][] = [[ax + s0 * sx, ay + s0 * sy], [ax + s1 * sx, ay + s1 * sy]];
    if (rnd() < 0.5) pts.reverse();
    if (rnd() < 0.4) pts.push(any());
    return { kind: 'collinear', level, points: pts.map(([x, y]) => [clampIn(x, side), clampIn(y, side)]), closed: false, cls };
  }
  if (r < 0.52) {
    // Along an existing edge, jittered within attractCm (a coincident typed chain).
    const j = (): number => intIn(rnd, -30, 30);
    const pts: [number, number][] = [[ax + j(), ay + j()], [bx + j(), by + j()]];
    if (rnd() < 0.5) pts.push(any());
    return { kind: 'coincident', level, points: pts.map(([x, y]) => [clampIn(x, side), clampIn(y, side)]), closed: false, cls };
  }
  if (r < 0.62) {
    // A shallow crossing: through a point of the edge at 0.5° – 9°.
    const t = rnd();
    const mx = ax + t * dx;
    const my = ay + t * dy;
    const ang = Math.atan2(dy, dx) + ((rnd() < 0.5 ? 1 : -1) * (0.5 + 8.5 * rnd()) * Math.PI) / 180;
    const half = 100 + rnd() * 1500;
    return {
      kind: 'shallow', level,
      points: [[clampIn(mx - half * Math.cos(ang), side), clampIn(my - half * Math.sin(ang), side)], [clampIn(mx + half * Math.cos(ang), side), clampIn(my + half * Math.sin(ang), side)]],
      closed: false, cls,
    };
  }
  if (r < 0.72) {
    // Grazing a vertex (the edge's first end): perpendicular offsets 0, ±1, 24 – 28 cm.
    const offs = [0, 1, -1, 24, 25, 26, 27, 28, -25, -26];
    const off = offs[intIn(rnd, 0, offs.length - 1)];
    const nx = len === 0 ? 0 : -dy / len;
    const ny = len === 0 ? 0 : dx / len;
    const tx = rnd() * 2 - 1;
    const ty = rnd() * 2 - 1;
    const tl = Math.hypot(tx, ty) || 1;
    const ux = tx / tl;
    const uy = ty / tl;
    const half = 80 + rnd() * 900;
    const cx = ax + nx * off;
    const cy = ay + ny * off;
    return { kind: 'graze', level, points: [[clampIn(cx - half * ux, side), clampIn(cy - half * uy, side)], [clampIn(cx + half * ux, side), clampIn(cy + half * uy, side)]], closed: false, cls };
  }
  if (r < 0.8) {
    // A ring, sometimes small, sometimes round an existing vertex.
    const k = intIn(rnd, 3, 6);
    const cx = rnd() < 0.5 ? ax : intIn(rnd, 200, side - 200);
    const cy = rnd() < 0.5 ? ay : intIn(rnd, 200, side - 200);
    const rad = 30 + rnd() * 600;
    const pts: [number, number][] = [];
    for (let i = 0; i < k; i++) {
      const a = (2 * Math.PI * i) / k + rnd() * 0.5;
      pts.push([clampIn(cx + rad * Math.cos(a), side), clampIn(cy + rad * Math.sin(a), side)]);
    }
    return { kind: 'ring', level, points: pts, closed: true, cls };
  }
  if (r < 0.86) {
    // A self-touching or self-crossing zig-zag, with duplicated and sub-minEdge points.
    const pts: [number, number][] = [];
    const k = intIn(rnd, 4, 8);
    const c = any();
    for (let i = 0; i < k; i++) {
      const q: [number, number] = [clampIn(c[0] + intIn(rnd, -400, 400), side), clampIn(c[1] + intIn(rnd, -400, 400), side)];
      pts.push(q);
      if (rnd() < 0.2) pts.push([q[0], q[1]]);
      if (rnd() < 0.2) pts.push([clampIn(q[0] + intIn(rnd, -20, 20), side), clampIn(q[1] + intIn(rnd, -20, 20), side)]);
    }
    if (rnd() < 0.3) pts.push(pts[1]);
    return { kind: 'zigzag', level, points: pts, closed: rnd() < 0.2, cls, pinned: rnd() < 0.3 ? [0, pts.length - 1] : undefined };
  }
  if (r < 0.93) {
    // A vertex beside the edge near its endpoint (step 2's endpoint rule), and a crossing next to it.
    const t = (rnd() * 40) / Math.max(1, len);
    const off = intIn(rnd, -30, 30);
    const nx = len === 0 ? 0 : -dy / len;
    const ny = len === 0 ? 0 : dx / len;
    const q: [number, number] = [clampIn(ax + t * dx + nx * off, side), clampIn(ay + t * dy + ny * off, side)];
    return { kind: 'endpoint', level, points: [q, any()], closed: false, cls };
  }
  // A sharp V over the edge: the chain's own acute corner, its two segments crossing the edge close together.
  const t = 0.2 + 0.6 * rnd();
  const mx = ax + t * dx;
  const my = ay + t * dy;
  const nx = len === 0 ? 0 : -dy / len;
  const ny = len === 0 ? 0 : dx / len;
  const depth = 27 + rnd() * 140;
  const spread = 3 + rnd() * 25;
  const far = 150 + rnd() * 500;
  const ex = len === 0 ? 1 : dx / len;
  const ey = len === 0 ? 0 : dy / len;
  const tip: [number, number] = [clampIn(mx + nx * depth, side), clampIn(my + ny * depth, side)];
  const a1: [number, number] = [clampIn(mx - nx * far - ex * spread, side), clampIn(my - ny * far - ey * spread, side)];
  const a2: [number, number] = [clampIn(mx - nx * far + ex * spread, side), clampIn(my - ny * far + ey * spread, side)];
  return { kind: 'vee', level, points: [a1, tip, a2], closed: false, cls };
}
