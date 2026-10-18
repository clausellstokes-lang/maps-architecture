// validateSkeleton: §3.8's post-condition validator (M0-a-11). Every skeleton result is checked before any use, from
// its rings, nodes and arcs alone — never from the engine's state:
//   (1) planarity — no two arcs cross and no arc crosses or runs along an input edge, by exact orientation on the
//       nodes rounded to the millimetre in bounding-box-relative integers (two nodes on one millimetre point are one
//       point; an arc between them has no length at this resolution); every node lies inside the face;
//   (2) exactly one skeleton face per input edge: the arcs carrying the edge form one path from the edge's end back to
//       its start, each arc with the face on the side its label names, the face monotone along the edge's direction
//       (its projections rise once and fall once round it, each step within 1 cm), and the faces' areas sum to the
//       rings' area;
//   (3) heights consistent — each node's offset time equals its distance to the supporting line of every face it
//       bounds within 1 cm, every interior node's time is positive, and times increase along the arcs away from the
//       boundary: no node is a pit (each is reached from the boundary along arcs whose time never falls by more than
//       1 mm);
//   (4) the graph is connected, every input vertex has exactly one arc, and it has exactly h independent cycles for h
//       holes (a tree when there are none).
// C-0168 (8) records the reading of each check.
import { ratio } from '../num/index.js';
import type { SkeletonGraph, SkeletonVerdict, ValidatorCheck } from './types.js';

/** §3.8 (2), (3)'s tolerance: 1 cm. */
const CM = 1;
/** §3.8 (3)'s time step tolerance along an arc: 1 mm. */
const MM = 0.1;
/** 2²⁶: below it every product of two coordinate differences is below 2⁵² and orientation is exact in doubles. */
const EXACT = 67_108_864;

/** Is v an integer index below lim? */
function index(v: number, lim: number): boolean {
  return Number.isInteger(v) && v >= 0 && v < lim;
}

function fail(check: ValidatorCheck, detail: string): SkeletonVerdict {
  return { ok: false, check, detail };
}

/** The sign of the orientation of three integer points, exact (doubles below 2²⁶ per difference, else BigInt). */
function orientI(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): number {
  const ux = bx - ax;
  const uy = by - ay;
  const vx = cx - ax;
  const vy = cy - ay;
  if (Math.abs(ux) < EXACT && Math.abs(uy) < EXACT && Math.abs(vx) < EXACT && Math.abs(vy) < EXACT) {
    const d = ux * vy - uy * vx;
    return d > 0 ? 1 : d < 0 ? -1 : 0;
  }
  const d = BigInt(ux) * BigInt(vy) - BigInt(uy) * BigInt(vx);
  return d > 0n ? 1 : d < 0n ? -1 : 0;
}

/** Is the integer point (px, py) on the closed segment (ax, ay)–(bx, by), given that the three are collinear? */
function within(ax: number, ay: number, bx: number, by: number, px: number, py: number): boolean {
  return (ax < bx ? ax <= px && px <= bx : bx <= px && px <= ax) && (ay < by ? ay <= py && py <= by : by <= py && py <= ay);
}

/** Is the integer point on the ring's boundary? */
function onRing(xs: Float64Array, ys: Float64Array, px: number, py: number): boolean {
  const n = xs.length;
  for (let i = 0, j = n - 1; i < n; j = i, i += 1) {
    if (orientI(xs[j], ys[j], xs[i], ys[i], px, py) === 0 && within(xs[j], ys[j], xs[i], ys[i], px, py)) return true;
  }
  return false;
}

/** Even–odd containment of an integer point strictly inside an integer ring (a point on it is not inside). */
function strictlyIn(xs: Float64Array, ys: Float64Array, px: number, py: number): boolean {
  let inside = false;
  const n = xs.length;
  for (let i = 0, j = n - 1; i < n; j = i, i += 1) {
    if (ys[j] > py !== ys[i] > py) {
      const o = orientI(xs[j], ys[j], xs[i], ys[i], px, py);
      if (ys[i] > ys[j] ? o > 0 : o < 0) inside = !inside;
    }
  }
  return inside;
}

/**
 * §3.8 (3)'s "times increase along every arc away from the boundary": the first interior node with an arc that is not
 * reached from the input vertices (nodes 0 … n − 1) along arcs whose time never falls by more than 1 mm — a pit — or −1.
 */
export function pitOf(nodes: readonly { t: number }[], arcs: readonly { a: number; b: number }[], n: number): number {
  const m = nodes.length;
  const adj: number[][] = [];
  for (let i = 0; i < m; i += 1) adj.push([]);
  for (const e of arcs) {
    adj[e.a].push(e.b);
    adj[e.b].push(e.a);
  }
  const reached = new Uint8Array(m);
  const stack: number[] = [];
  for (let i = 0; i < n && i < m; i += 1) {
    reached[i] = 1;
    stack.push(i);
  }
  while (stack.length > 0) {
    const v = stack.pop() as number;
    for (const w of adj[v]) {
      if (reached[w] === 0 && nodes[w].t >= nodes[v].t - MM) {
        reached[w] = 1;
        stack.push(w);
      }
    }
  }
  for (let i = n; i < m; i += 1) if (adj[i].length > 0 && reached[i] === 0) return i;
  return -1;
}

/**
 * §3.8's validator over a skeleton graph: `ok` with the face of each input edge (its node cycle, counter-clockwise),
 * or the first failing check with what failed. Never throws on a malformed graph.
 */
export function validateSkeleton(sk: SkeletonGraph): SkeletonVerdict {
  const rings = sk.rings;
  const nodes = sk.nodes;
  const arcs = sk.arcs;
  // the input: vertex i of the rings is node i; edge i runs from it to the next vertex of its ring
  let n = 0;
  for (const ring of rings) n += ring.length;
  if (rings.length === 0 || n < 3) return fail('topology', 'no input rings');
  const px = new Float64Array(n);
  const py = new Float64Array(n);
  const nextOf = new Int32Array(n);
  let ox = Number.POSITIVE_INFINITY;
  let oy = Number.POSITIVE_INFINITY;
  {
    let i = 0;
    for (const ring of rings) {
      const base = i;
      for (let j = 0; j < ring.length; j += 1) {
        px[i] = ring[j].x;
        py[i] = ring[j].y;
        if (px[i] < ox) ox = px[i];
        if (py[i] < oy) oy = py[i];
        nextOf[i] = base + ((j + 1) % ring.length);
        i += 1;
      }
    }
  }
  const m = nodes.length;
  if (m < n) return fail('topology', 'fewer nodes than input vertices');
  for (let i = 0; i < m; i += 1) {
    const q = nodes[i];
    if (!(Number.isFinite(q.x) && Number.isFinite(q.y) && Number.isFinite(q.t))) return fail('heights', `node ${i} is not finite`);
    if (i < n && (q.x !== px[i] || q.y !== py[i] || q.t !== 0)) return fail('heights', `node ${i} is not input vertex ${i} at time 0`);
    if (i >= n && !(q.t > 0)) return fail('heights', `interior node ${i} has time ${q.t}`);
  }
  for (let k = 0; k < arcs.length; k += 1) {
    const e = arcs[k];
    if (!index(e.a, m) || !index(e.b, m) || e.a === e.b) return fail('topology', `arc ${k} has bad ends`);
    if (!index(e.left, n) || !index(e.right, n) || e.left === e.right) return fail('faces', `arc ${k} has bad face labels`);
  }

  // (1) planarity on millimetre-rounded bounding-box-relative integers
  const X = new Float64Array(m);
  const Y = new Float64Array(m);
  for (let i = 0; i < m; i += 1) {
    X[i] = Math.round((nodes[i].x - ox) * 10);
    Y[i] = Math.round((nodes[i].y - oy) * 10);
  }
  const same = (a: number, b: number): boolean => X[a] === X[b] && Y[a] === Y[b];
  const segA: number[] = [];
  const segB: number[] = [];
  const segName: string[] = [];
  for (let i = 0; i < n; i += 1) {
    segA.push(i);
    segB.push(nextOf[i]);
    segName.push(`edge ${i}`);
  }
  for (let k = 0; k < arcs.length; k += 1) {
    if (same(arcs[k].a, arcs[k].b)) continue; // a sub-millimetre arc: one point at this resolution
    segA.push(arcs[k].a);
    segB.push(arcs[k].b);
    segName.push(`arc ${k}`);
  }
  const S = segA.length;
  const lox = new Float64Array(S);
  const hix = new Float64Array(S);
  const loy = new Float64Array(S);
  const hiy = new Float64Array(S);
  for (let s = 0; s < S; s += 1) {
    const a = segA[s];
    const b = segB[s];
    lox[s] = X[a] < X[b] ? X[a] : X[b];
    hix[s] = X[a] < X[b] ? X[b] : X[a];
    loy[s] = Y[a] < Y[b] ? Y[a] : Y[b];
    hiy[s] = Y[a] < Y[b] ? Y[b] : Y[a];
  }
  for (let s = 0; s < S; s += 1) {
    for (let r = s + 1; r < S; r += 1) {
      if (lox[r] > hix[s] || hix[r] < lox[s] || loy[r] > hiy[s] || hiy[r] < loy[s]) continue;
      const a = segA[s];
      const b = segB[s];
      const c = segA[r];
      const d = segB[r];
      const o1 = orientI(X[a], Y[a], X[b], Y[b], X[c], Y[c]);
      const o2 = orientI(X[a], Y[a], X[b], Y[b], X[d], Y[d]);
      const o3 = orientI(X[c], Y[c], X[d], Y[d], X[a], Y[a]);
      const o4 = orientI(X[c], Y[c], X[d], Y[d], X[b], Y[b]);
      let bad = false;
      if (o1 * o2 < 0 && o3 * o4 < 0) bad = true; // a proper crossing
      else if (o1 === 0 && o2 === 0) {
        // collinear: overlapping interiors conflict (a shared end alone does not)
        const horiz = X[a] !== X[b];
        const s0 = horiz ? lox[s] : loy[s];
        const s1 = horiz ? hix[s] : hiy[s];
        const r0 = horiz ? lox[r] : loy[r];
        const r1 = horiz ? hix[r] : hiy[r];
        bad = (s1 < r1 ? s1 : r1) > (s0 > r0 ? s0 : r0);
      } else if (!(same(a, c) || same(a, d) || same(b, c) || same(b, d))) {
        // an end of one on the other away from a shared end: a touch
        bad =
          (o1 === 0 && within(X[a], Y[a], X[b], Y[b], X[c], Y[c])) ||
          (o2 === 0 && within(X[a], Y[a], X[b], Y[b], X[d], Y[d])) ||
          (o3 === 0 && within(X[c], Y[c], X[d], Y[d], X[a], Y[a])) ||
          (o4 === 0 && within(X[c], Y[c], X[d], Y[d], X[b], Y[b]));
      }
      if (bad) return fail('planarity', `${segName[s]} crosses ${segName[r]}`);
    }
  }
  const ringX: Float64Array[] = [];
  const ringY: Float64Array[] = [];
  for (const ring of rings) {
    const xs = new Float64Array(ring.length);
    const ys = new Float64Array(ring.length);
    for (let j = 0; j < ring.length; j += 1) {
      xs[j] = Math.round((ring[j].x - ox) * 10);
      ys[j] = Math.round((ring[j].y - oy) * 10);
    }
    ringX.push(xs);
    ringY.push(ys);
  }
  for (let i = n; i < m; i += 1) {
    if (!strictlyIn(ringX[0], ringY[0], X[i], Y[i]) && !onRing(ringX[0], ringY[0], X[i], Y[i])) return fail('planarity', `node ${i} lies outside the outer ring`);
    for (let h = 1; h < rings.length; h += 1) {
      if (strictlyIn(ringX[h], ringY[h], X[i], Y[i]) && !onRing(ringX[h], ringY[h], X[i], Y[i])) return fail('planarity', `node ${i} lies inside hole ${h}`);
    }
  }

  // (2) one face per input edge, (3) heights along it
  const byFace: number[][] = [];
  for (let i = 0; i < n; i += 1) byFace.push([]);
  for (let k = 0; k < arcs.length; k += 1) {
    byFace[arcs[k].left].push(k);
    byFace[arcs[k].right].push(k);
  }
  const usedBy = new Int32Array(arcs.length).fill(-1);
  const faces: number[][] = [];
  let areaSum = 0;
  for (let i = 0; i < n; i += 1) {
    const A = i;
    const B = nextOf[i];
    const ex = px[B] - px[A];
    const ey = py[B] - py[A];
    const len = Math.sqrt(ex * ex + ey * ey);
    const ux = ratio(ex, len, 'length');
    const uy = ratio(ey, len, 'length');
    if (!ux.ok || !uy.ok) return fail('faces', `input edge ${i} has no length`);
    const dx = ux.value;
    const dy = uy.value;
    const cycle = [A, B];
    let used = 0;
    let cur = B;
    while (cur !== A) {
      let step = -1;
      for (const k of byFace[i]) {
        if (usedBy[k] === i) continue;
        if (arcs[k].a === cur || arcs[k].b === cur) {
          if (step >= 0) return fail('faces', `face ${i} branches at node ${cur}`);
          step = k;
        }
      }
      if (step < 0) return fail('faces', `face ${i} is open at node ${cur}`);
      usedBy[step] = i;
      used += 1;
      const e = arcs[step];
      const forward = e.a === cur;
      // walking the face counter-clockwise from the edge's end, the face lies left of each step
      if ((forward && e.left !== i) || (!forward && e.right !== i)) return fail('faces', `arc ${step} carries face ${i} on the wrong side`);
      cur = forward ? e.b : e.a;
      if (cur !== A) cycle.push(cur);
      if (cycle.length > m + 2) return fail('faces', `face ${i} does not close`);
    }
    if (used !== byFace[i].length) return fail('faces', `face ${i} has ${byFace[i].length - used} arcs off its path`);
    // monotone along the edge's direction: the projections round the face rise from their least to their greatest
    // and fall back, each step within 1 cm — every line across the edge's direction meets the face in one segment
    const c = cycle.length;
    const s = new Float64Array(c);
    let lo = 0;
    let hi = 0;
    for (let k = 0; k < c; k += 1) {
      s[k] = dx * (nodes[cycle[k]].x - px[A]) + dy * (nodes[cycle[k]].y - py[A]);
      if (s[k] < s[lo]) lo = k;
      if (s[k] > s[hi]) hi = k;
    }
    for (let k = lo; k !== hi; k = (k + 1) % c) {
      if (s[(k + 1) % c] < s[k] - CM) return fail('faces', `face ${i} is not monotone along its edge at node ${cycle[(k + 1) % c]}`);
    }
    for (let k = hi; k !== lo; k = (k + 1) % c) {
      if (s[(k + 1) % c] > s[k] + CM) return fail('faces', `face ${i} is not monotone along its edge at node ${cycle[(k + 1) % c]}`);
    }
    // (3) every node of the face at its offset time from the edge's line, within 1 cm
    for (let k = 2; k < c; k += 1) {
      const q = nodes[cycle[k]];
      const h = -dy * (q.x - px[A]) + dx * (q.y - py[A]);
      if (!(Math.abs(h - q.t) <= CM)) return fail('heights', `node ${cycle[k]} lies ${h} from edge ${i}'s line at time ${q.t}`);
    }
    // the face's area, about its edge's start
    let a2 = 0;
    for (let k = 1; k + 1 < c; k += 1) {
      const p = nodes[cycle[k]];
      const q = nodes[cycle[k + 1]];
      a2 += (p.x - px[A]) * (q.y - py[A]) - (q.x - px[A]) * (p.y - py[A]);
    }
    if (!(a2 > 0)) return fail('faces', `face ${i} has no area`);
    areaSum += a2;
    faces.push(cycle);
  }
  let ringArea = 0;
  for (const ring of rings) {
    for (let j = 1; j + 1 < ring.length; j += 1) {
      ringArea += (ring[j].x - ring[0].x) * (ring[j + 1].y - ring[0].y) - (ring[j + 1].x - ring[0].x) * (ring[j].y - ring[0].y);
    }
  }
  if (!(Math.abs(areaSum - ringArea) <= ringArea * 1e-9 + 2)) return fail('faces', `the faces cover ${areaSum * 0.5} cm² of ${ringArea * 0.5}`);

  // (3) no pit: every node reached from the boundary along arcs whose time never falls by more than 1 mm
  const pit = pitOf(nodes, arcs, n);
  if (pit >= 0) return fail('heights', `node ${pit} is a pit: its time falls from every neighbour`);
  const deg = new Int32Array(m);
  for (const e of arcs) {
    deg[e.a] += 1;
    deg[e.b] += 1;
  }
  const start = new Int32Array(m + 1);
  for (let i = 0; i < m; i += 1) start[i + 1] = start[i] + deg[i];
  const fill = start.slice(0, m);
  const nbr = new Int32Array(start[m]);
  for (const e of arcs) {
    nbr[fill[e.a]++] = e.b;
    nbr[fill[e.b]++] = e.a;
  }
  const stack: number[] = [];

  // (4) connected, one arc per input vertex, h independent cycles
  let usedNodes = 0;
  for (let i = 0; i < m; i += 1) {
    if (i < n && deg[i] !== 1) return fail('topology', `input vertex ${i} has ${deg[i]} arcs`);
    if (deg[i] > 0) usedNodes += 1;
    else if (i >= n) return fail('topology', `node ${i} has no arc`);
  }
  const seen = new Uint8Array(m);
  seen[0] = 1;
  stack.push(0);
  let count = 1;
  while (stack.length > 0) {
    const v = stack.pop() as number;
    for (let j = start[v]; j < start[v + 1]; j += 1) {
      const w = nbr[j];
      if (seen[w] === 0) {
        seen[w] = 1;
        count += 1;
        stack.push(w);
      }
    }
  }
  if (count !== usedNodes) return fail('topology', `the graph has ${usedNodes - count} nodes unreached from node 0`);
  const cycles = arcs.length - usedNodes + 1;
  if (cycles !== rings.length - 1) return fail('topology', `${cycles} independent cycles for ${rings.length - 1} holes`);
  return { ok: true, faces };
}
