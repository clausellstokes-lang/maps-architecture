// The straight skeleton's wavefront (M0-a-11; §3.8; §17.1 (8): P. Felkel and Š. Obdržálek, "Straight skeleton
// implementation", SCCG 1998; O. Aichholzer, F. Aurenhammer, D. Alberts and B. Gärtner, "A novel type of skeleton for
// polygons", J. UCS 1 (1995)). Built in-house from the papers (§3.1). Doubles with + − × ÷ √ only, on coordinates
// relative to the rings' bounding-box corner (§3.8 *Numeric contract*), so every IEEE engine gives the same bits.
//
// Every edge of the input moves inward at unit speed; the wavefront is a set of rings of vertices, each vertex between
// the moving lines of two input edges. A vertex between lines a and b turning by θ (sin θ = C / (|eₐ||e_b|), cos θ =
// D / (|eₐ||e_b|), C and D the exact integer cross and dot of the two input edge vectors) moves with w = nₐ − k · dₐ =
// n_b + k · d_b, k = tan(θ / 2) = C / (|eₐ||e_b| + D) when D ≥ 0, (|eₐ||e_b| − D) / C otherwise — both forms free of
// cancellation, so a near-antiparallel pair (a ridge being drawn) keeps its precision. A wavefront edge u → v
// therefore shortens at the rate k_u + k_v, and a reflex vertex v meets the line of input edge g when its height above
// it, n_g · p − c_g − t, reaches 0. A vertex starts on its own two lines (their meeting point at its birth time), so
// two vertices between the same lines are one point.
//
// The queue (§3.8): the earliest event of the current wavefront — an edge collapsing, or a reflex or straight vertex
// reaching an edge from its front — is taken (ties by the vertex's index in the canonical rings, the edge events
// first), with every event and vertex that coincides with it (within `eps`, the rounding scale of the coordinates):
// one multi-edge event, resolved at one node by the angular order of the edges meeting there (each outgoing edge pairs
// with the next incoming edge counter-clockwise; a valid wavefront alternates, and two opposite edges within 1 mrad of
// one direction are read as a fold, the outgoing first). Two millimetre rules make the events §3.8 coalesces one: a
// vertex reaching an edge's line within 1 mm past its end, at the moment that end vertex takes part in an event within
// 1 mm of it, joins that event (a vertex event missed by less than 1 mm); a fold reaching its two neighbours within
// 1 mm of each other takes both. A vertex between exactly antiparallel lines — or between lines that would make it an
// exterior crack, reflex within 1° of 360°, which no valid wavefront has — is a fold: its region has no width and it
// reaches its nearer neighbour along the shared line at once (a ridge). A ring left with two vertices, which has no
// area, collapses at once. §3.8's 1 cm coalescing is applied to the finished graph (coalesce.ts). C-0168 (2), (4)
// record the construction. The queue is charged one event per resolution and stops at its law (§3.8's
// 4 · (n + r) + 64, or a larger table law) with E_WORK_LIMIT (F-WORK): a count, never a time.
import { ratio } from '../num/index.js';
import { halfPlaneOf } from '../num/exact.js';

/** 2⁴⁰: quotients of small dimensionless denominators are scaled by it so ratio()'s floor of 1 reads them (exact). */
const SCALE = 1_099_511_627_776;

/** The coincidence scale: 10⁻⁹ of the rings' extent, at least 10⁻⁵ cm — far above rounding, far below 1 mm. */
const EPS_REL = 1e-9;
const EPS_MIN = 1e-5;

/** The millimetre rules' 1 mm (C-0168 (4)): in position, and in offset time for the near miss's moment. */
const NEAR_CM = 0.1;
/** The angle under which two edges meeting at a node are read as one direction: 1 mrad (its sine). */
const NEAR_RAD = 0.001;
/** sin 1°, to the double nearest it. */
const SIN_1_DEG = 0.01745240643728351;

/** How far a new vertex's own lines may meet from its node before the node is its start instead (an ill-conditioned near-fold). */
const ANCHOR_CM = 1e-3;

/** The work law of §3.8: 4 · (n + r) + 64 events for n vertices and r reflex vertices. */
export function skeletonEventLimit(n: number, r: number): number {
  return 4 * (n + r) + 64;
}

/** num ÷ den through ratio() at a power-of-two scale (exact), or NaN when |den| < 2⁻⁴⁰. */
function quot(num: number, den: number): number {
  const q = ratio(num * SCALE, den * SCALE, 'count');
  return q.ok ? q.value : Number.NaN;
}

/** The input to the engine: vertex coordinates relative to the bounding-box corner, ring by ring. */
export interface EngineInput {
  xs: Float64Array;
  ys: Float64Array;
  /** ringStart[k] … ringStart[k + 1] − 1 are ring k's vertices; edge i runs from vertex i to the next of its ring. */
  ringStart: Int32Array;
}

export interface RawNode {
  x: number;
  y: number;
  t: number;
}

export interface RawArc {
  a: number;
  b: number;
  left: number;
  right: number;
}

/** `ok`: the wavefront collapsed; `workLimit`: the queue's law was reached; `stalled` / `pairing`: the construction could not continue (the output is incomplete and fails the validator). */
export type EngineStatus = 'ok' | 'workLimit' | 'stalled' | 'pairing';

export interface EngineResult {
  status: EngineStatus;
  nodes: RawNode[];
  arcs: RawArc[];
  events: number;
  limit: number;
}

/**
 * Test-only hooks: fault injection (the work-limit test — when `skipResolution` returns true the event is charged and
 * left unresolved; the validator-failure test — `finished` is called once with a run's nodes and arcs when the
 * wavefront has collapsed, status `ok`, before they are returned, and may corrupt them, C-0171) and a trace of the queue.
 */
export interface EngineHooks {
  skipResolution?: (events: number) => boolean;
  finished?: (nodes: RawNode[], arcs: RawArc[]) => void;
  trace?: (line: string) => void;
}

/** The input edges' lines: direction, inward (left) normal, offset c = n · (start) — values, never arena coordinates. */
export interface Lines {
  ex: Float64Array;
  ey: Float64Array;
  len: Float64Array;
  dx: Float64Array;
  dy: Float64Array;
  nx: Float64Array;
  ny: Float64Array;
  c: Float64Array;
}

/** A split candidate of a reflex vertex: the time it reaches line g, and where. */
interface Cand {
  t: number;
  g: number;
  qx: number;
  qy: number;
}

/** A wavefront vertex: between line `a` (the edge before it) and line `b` (the edge after it). */
interface WV {
  id: number;
  a: number;
  b: number;
  prev: WV;
  next: WV;
  /** The node it was born at. */
  node: number;
  t0: number;
  x0: number;
  y0: number;
  wx: number;
  wy: number;
  /** tan(θ / 2): > 0 convex, < 0 reflex, 0 straight, +∞ a fold. */
  k: number;
  alive: boolean;
  pseudo: boolean;
  cand: Cand[];
  ci: number;
}

/** An event of the current wavefront: the edge u → v collapsing, or the reflex vertex u reaching `target`'s edge. */
interface Ev {
  t: number;
  x: number;
  y: number;
  u: WV;
  v: WV | null;
  target: WV | null;
}

/** An edge meeting an event's node: kind 0 leaves it (an outgoing edge), kind 1 arrives at it. */
interface Spoke {
  kind: 0 | 1;
  line: number;
  outside: WV;
  vx: number;
  vy: number;
  order: number;
}

/** The input edges' lines (relative coordinates): what the engine moves and the coalescing pass fits nodes to. */
export function buildLines(inp: EngineInput): Lines {
  const n = inp.xs.length;
  const L: Lines = {
    ex: new Float64Array(n),
    ey: new Float64Array(n),
    len: new Float64Array(n),
    dx: new Float64Array(n),
    dy: new Float64Array(n),
    nx: new Float64Array(n),
    ny: new Float64Array(n),
    c: new Float64Array(n),
  };
  const R = inp.ringStart;
  for (let k = 0; k + 1 < R.length; k += 1) {
    for (let i = R[k]; i < R[k + 1]; i += 1) {
      const j = i + 1 < R[k + 1] ? i + 1 : R[k];
      const ex = inp.xs[j] - inp.xs[i];
      const ey = inp.ys[j] - inp.ys[i];
      const len = Math.sqrt(ex * ex + ey * ey);
      const dx = ratio(ex, len, 'length');
      const dy = ratio(ey, len, 'length');
      L.ex[i] = ex;
      L.ey[i] = ey;
      L.len[i] = len;
      L.dx[i] = dx.ok ? dx.value : 0; // len ≥ 1: the cleaned rings have no repeated vertex
      L.dy[i] = dy.ok ? dy.value : 0;
      L.nx[i] = -L.dy[i];
      L.ny[i] = L.dx[i];
      L.c[i] = L.nx[i] * inp.xs[i] + L.ny[i] * inp.ys[i];
    }
  }
  return L;
}

/** tan(θ / 2) of the turn from line a to line b; +∞ for exactly antiparallel lines (a fold). */
function turnK(L: Lines, a: number, b: number): number {
  const C = L.ex[a] * L.ey[b] - L.ey[a] * L.ex[b];
  const D = L.ex[a] * L.ex[b] + L.ey[a] * L.ey[b];
  if (C === 0) return D > 0 ? 0 : Number.POSITIVE_INFINITY;
  const LL = L.len[a] * L.len[b];
  const q = D >= 0 ? ratio(C, LL + D, 'area') : ratio(LL - D, C, 'area');
  return q.ok ? q.value : 0;
}

/**
 * Runs the wavefront to its end. `limit` is the event law (the caller passes §3.8's 4 · (n + r) + 64, or a larger
 * table law); the result is complete only with status `ok`.
 */
export function runEngine(inp: EngineInput, limit: number, hooks: EngineHooks = {}): EngineResult {
  const L = buildLines(inp);
  const n = inp.xs.length;
  let extent = 0;
  for (let i = 0; i < n; i += 1) {
    if (inp.xs[i] > extent) extent = inp.xs[i];
    if (inp.ys[i] > extent) extent = inp.ys[i];
  }
  const eps = extent * EPS_REL > EPS_MIN ? extent * EPS_REL : EPS_MIN;
  const nodes: RawNode[] = [];
  const arcs: RawArc[] = [];
  for (let i = 0; i < n; i += 1) nodes.push({ x: inp.xs[i], y: inp.ys[i], t: 0 });
  const onLine: Set<WV>[] = [];
  for (let g = 0; g < n; g += 1) onLine.push(new Set());
  const verts: WV[] = [];
  const folds: WV[] = [];
  let alive = 0;
  let nextId = 0;
  let T = 0;
  let events = 0;

  const posX = (v: WV, t: number): number => v.x0 + (t - v.t0) * v.wx;
  const posY = (v: WV, t: number): number => v.y0 + (t - v.t0) * v.wy;
  /** The projection of vertex v's position at t on line g's direction. */
  const along = (v: WV, g: number, t: number): number => L.dx[g] * posX(v, t) + L.dy[g] * posY(v, t);

  /** Every line a reflex or straight vertex reaches from its front, with the time and point, earliest first (ties by line index). */
  function candidates(v: WV): Cand[] {
    const out: Cand[] = [];
    for (let g = 0; g < n; g += 1) {
      if (g === v.a || g === v.b) continue;
      const rate = 1 - (L.nx[g] * v.wx + L.ny[g] * v.wy);
      if (!(rate > 1e-12)) continue;
      const h0 = L.nx[g] * v.x0 + L.ny[g] * v.y0 - L.c[g] - v.t0;
      if (!(h0 > eps)) continue; // a line through its own node was the event's to split; behind it, never reached
      const dt = quot(h0, rate);
      if (!(dt >= 0 && dt < Number.POSITIVE_INFINITY)) continue;
      const t = v.t0 + dt;
      out.push({ t, g, qx: posX(v, t), qy: posY(v, t) });
    }
    out.sort((p, q) => p.t - q.t || p.g - q.g);
    return out;
  }

  /**
   * The point where lines a and b stand at time t, solved about (px, py) — so two vertices between the same lines
   * coincide whatever node they were born at — or (px, py) itself when the lines are parallel or meet farther than
   * ANCHOR_CM from it (a near-fold, whose meeting point is ill-conditioned: the node is the better start).
   */
  function anchor(a: number, b: number, px: number, py: number, t: number): [number, number] {
    const C = L.ex[a] * L.ey[b] - L.ey[a] * L.ex[b];
    if (C === 0) return [px, py];
    const s = ratio(C, L.len[a] * L.len[b], 'area');
    if (!s.ok) return [px, py];
    const ra = L.c[a] + t - (L.nx[a] * px + L.ny[a] * py);
    const rb = L.c[b] + t - (L.nx[b] * px + L.ny[b] * py);
    const dx = quot(ra * L.ny[b] - rb * L.ny[a], s.value);
    const dy = quot(L.nx[a] * rb - L.nx[b] * ra, s.value);
    if (!(dx * dx + dy * dy <= ANCHOR_CM * ANCHOR_CM)) return [px, py];
    return [px + dx, py + dy];
  }

  function makeVertex(a: number, b: number, node: number, t0: number, px: number, py: number, pseudo: boolean): WV {
    const k0 = pseudo ? 0 : turnK(L, a, b);
    // a vertex that would turn back on itself (an exterior crack, within 1° of 360°) stands between lines that have
    // met: its region has no width, so it is a fold
    const k = k0 < 0 && crack(a, b) ? Number.POSITIVE_INFINITY : k0;
    const fold = k === Number.POSITIVE_INFINITY;
    const [x0, y0] = pseudo || fold || node < n ? [px, py] : anchor(a, b, px, py, t0);
    const v: WV = {
      id: pseudo ? -1 : nextId,
      a,
      b,
      prev: undefined as unknown as WV,
      next: undefined as unknown as WV,
      node,
      t0,
      x0,
      y0,
      wx: fold ? 0 : L.nx[a] - k * L.dx[a],
      wy: fold ? 0 : L.ny[a] - k * L.dy[a],
      k,
      alive: !pseudo,
      pseudo,
      cand: [],
      ci: 0,
    };
    if (pseudo) return v;
    nextId += 1;
    verts.push(v);
    alive += 1;
    onLine[b].add(v);
    if (fold) folds.push(v);
    else if (k <= 0) v.cand = candidates(v);
    return v;
  }

  /**
   * Would a vertex between lines a and b turn back on itself — reflex with an interior angle within 1° of 360°, an
   * exterior crack no valid wavefront has? A coalescing that would make one is not taken.
   */
  function crack(a: number, b: number): boolean {
    const C = L.ex[a] * L.ey[b] - L.ey[a] * L.ex[b];
    const D = L.ex[a] * L.ex[b] + L.ey[a] * L.ey[b];
    return a !== b && C <= 0 && D < 0 && -C < SIN_1_DEG * L.len[a] * L.len[b];
  }

  function kill(v: WV): void {
    if (!v.alive) return;
    v.alive = false;
    alive -= 1;
    onLine[v.b].delete(v);
  }

  // the initial wavefront: one vertex per ring vertex, between the edge before it and the edge after it
  const R = inp.ringStart;
  for (let k = 0; k + 1 < R.length; k += 1) {
    const first = verts.length;
    for (let i = R[k]; i < R[k + 1]; i += 1) {
      const before = i > R[k] ? i - 1 : R[k + 1] - 1;
      makeVertex(before, i, i, 0, inp.xs[i], inp.ys[i], false);
    }
    const m = R[k + 1] - R[k];
    for (let j = 0; j < m; j += 1) {
      const v = verts[first + j];
      v.next = verts[first + ((j + 1) % m)];
      v.prev = verts[first + ((j + m - 1) % m)];
    }
  }

  /** The node at (x, y, t): an interior node coinciding with it (within eps), or a new one. */
  function nodeFor(x: number, y: number, t: number): number {
    for (let j = nodes.length - 1; j >= n; j -= 1) {
      const q = nodes[j];
      if (q.t < t - 1) break; // nodes are made in time order, to within the coincidence scale
      const dt = q.t - t;
      if (dt <= eps && dt >= -eps && (q.x - x) * (q.x - x) + (q.y - y) * (q.y - y) <= eps * eps) return j;
    }
    nodes.push({ x, y, t });
    return nodes.length - 1;
  }

  /**
   * Resolves one (multi-edge) event at time tc at (px, py). `forced` vertices join whatever their distance (the
   * participants of the events coinciding with it); `targets` are its split events' edges (their start vertices). A
   * vertex at the point (within eps of its own travel) joins too, and an edge whose line passes through the point
   * (within eps) is split there. Returns false when the angular order at the node does not alternate.
   */
  function resolve(tc: number, px: number, py: number, forced: WV[], targets: WV[]): boolean {
    const inC = new Set<WV>();
    const C: WV[] = [];
    const add = (v: WV): void => {
      if (!inC.has(v)) {
        inC.add(v);
        C.push(v);
      }
    };
    for (const v of forced) if (v.alive) add(v);
    for (const v of verts) {
      if (!v.alive || inC.has(v)) continue;
      const dx = posX(v, tc) - px;
      const dy = posY(v, tc) - py;
      const speed = v.k === Number.POSITIVE_INFINITY ? 0 : Math.sqrt(v.wx * v.wx + v.wy * v.wy);
      const rad = speed < 100 ? eps * (1 + speed) : eps * 101;
      if (dx * dx + dy * dy <= rad * rad) add(v);
    }
    // the edges the event splits: its split events' targets, then every edge whose line passes through the point
    // with the point's foot strictly between its ends
    const splits: WV[] = [];
    for (const target of targets) {
      if (!target.alive || inC.has(target) || inC.has(target.next) || splits.includes(target)) continue;
      const g = target.b;
      const s = L.dx[g] * px + L.dy[g] * py;
      const sa = along(target, g, tc);
      const sb = along(target.next, g, tc);
      if (s > sa && s < sb) splits.push(target);
      else add(s <= sa ? target : target.next);
    }
    for (const u of verts) {
      if (!u.alive || inC.has(u) || inC.has(u.next) || splits.includes(u)) continue;
      const g = u.b;
      const h = L.nx[g] * px + L.ny[g] * py - L.c[g] - tc;
      if (!(h <= eps && h >= -eps)) continue;
      const s = L.dx[g] * px + L.dy[g] * py;
      if (s > along(u, g, tc) && s < along(u.next, g, tc)) splits.push(u);
    }
    const N = nodeFor(px, py, tc);
    const nx = nodes[N].x;
    const ny = nodes[N].y;
    const nt = nodes[N].t;
    // split edges take a pseudo-vertex at the node, linked into their rings
    for (const u of splits) {
      const w = u.next;
      const p = makeVertex(u.b, u.b, N, nt, nx, ny, true);
      p.prev = u;
      p.next = w;
      u.next = p;
      w.prev = p;
      add(p);
    }
    // runs of consecutive event vertices; each run's incoming and outgoing edges are the spokes at the node
    const spokes: Spoke[] = [];
    let order = 0;
    for (const v of C) {
      if (inC.has(v.prev)) continue;
      let z = v;
      while (inC.has(z.next)) z = z.next;
      spokes.push({ kind: 1, line: v.a, outside: v.prev, vx: -L.ex[v.a], vy: -L.ey[v.a], order: order++ });
      spokes.push({ kind: 0, line: z.b, outside: z.next, vx: L.ex[z.b], vy: L.ey[z.b], order: order++ });
    }
    // every event vertex dies at the node (a ring wholly inside the event vanishes)
    for (const v of C) {
      if (v.pseudo) continue;
      if (v.node !== N) arcs.push({ a: v.node, b: N, left: v.a, right: v.b });
      kill(v);
    }
    if (spokes.length === 0) return true;
    spokes.sort((p, q) => {
      const hp = halfPlaneOf(p.vx, p.vy);
      const hq = halfPlaneOf(q.vx, q.vy);
      if (hp !== hq) return hp - hq;
      const cr = p.vx * q.vy - p.vy * q.vx;
      if (cr !== 0) return cr > 0 ? -1 : 1;
      return p.kind - q.kind || p.order - q.order; // one direction: the outgoing edge first (a fold pairs with itself)
    });
    const m = spokes.length;
    // an incoming edge just before an outgoing one, within 1 mrad: the pair is a fold, the outgoing first (the other
    // order would be an exterior crack, which a valid wavefront never has)
    for (let pass = 0; pass < m; pass += 1) {
      let swapped = false;
      for (let i = 0; i < m; i += 1) {
        const p = spokes[i];
        const q = spokes[(i + 1) % m];
        if (p.kind !== 1 || q.kind !== 0) continue;
        const cr = p.vx * q.vy - p.vy * q.vx;
        const dt = p.vx * q.vx + p.vy * q.vy;
        const lp = Math.sqrt(p.vx * p.vx + p.vy * p.vy) * Math.sqrt(q.vx * q.vx + q.vy * q.vy);
        if (dt > 0 && Math.abs(cr) <= NEAR_RAD * lp) {
          spokes[i] = q;
          spokes[(i + 1) % m] = p;
          swapped = true;
        }
      }
      if (!swapped) break;
    }
    const pairs: [Spoke, Spoke][] = [];
    for (let i = 0; i < m; i += 1) {
      const s = spokes[i];
      if (s.kind !== 0) continue;
      const nxt = spokes[(i + 1) % m];
      if (nxt.kind !== 1) {
        if (hooks.trace !== undefined) hooks.trace(`  pairing fails: C ${C.map((w) => `${w.id}${w.pseudo ? 'p' : ''}(${w.a},${w.b})`).join(' ')} spokes ${spokes.map((q) => `${q.kind === 1 ? 'in' : 'out'}${q.line}[${q.vx},${q.vy}]`).join(' ')}`);
        return false;
      }
      pairs.push([s, nxt]);
    }
    if (hooks.trace !== undefined) {
      hooks.trace(`  C ${C.map((w) => `${w.id}${w.pseudo ? 'p' : ''}(${w.a},${w.b})`).join(' ')} spokes ${spokes.map((q) => `${q.kind === 1 ? 'in' : 'out'}${q.line}`).join(' ')} node ${N}`);
    }
    const made: WV[] = [];
    for (const [out, inn] of pairs) {
      const prev = inn.outside;
      const next = out.outside;
      if (inn.line === out.line) {
        prev.next = next;
        next.prev = prev;
        made.push(prev);
        continue;
      }
      const x = makeVertex(inn.line, out.line, N, nt, nx, ny, false);
      x.prev = prev;
      x.next = next;
      prev.next = x;
      next.prev = x;
      made.push(x);
    }
    // a ring left with two vertices has no area: its two edges join the same two points, so it collapses now
    for (const x of made) if (x.alive && x.next.next === x && x.next !== x) collapsePair(x, x.next, tc);
    return true;
  }

  /**
   * A two-vertex ring at time tc: where its vertices meet both die at one node; apart, the ring is a zero-width spike
   * and its one segment is a ridge — each vertex ends at its place and the ridge arc joins them: the edge x → y lies on
   * x's outgoing line, whose swept face is behind it (right of x → y), x's incoming line's on its left.
   */
  function collapsePair(x: WV, y: WV, tc: number): void {
    const xx = posX(x, tc);
    const xy = posY(x, tc);
    const yx = posX(y, tc);
    const yy = posY(y, tc);
    const close = (xx - yx) * (xx - yx) + (xy - yy) * (xy - yy) <= eps * eps;
    const Nx = close ? nodeFor((xx + yx) * 0.5, (xy + yy) * 0.5, tc) : endNode(x, xx, xy, tc);
    const Ny = close ? Nx : endNode(y, yx, yy, tc);
    if (x.node !== Nx) arcs.push({ a: x.node, b: Nx, left: x.a, right: x.b });
    if (y.node !== Ny) arcs.push({ a: y.node, b: Ny, left: y.a, right: y.b });
    if (Nx !== Ny) arcs.push({ a: Nx, b: Ny, left: x.a, right: x.b });
    kill(x);
    kill(y);
  }

  /** The node where vertex v stands at time tc: its own birth node when it has not left it, else a node there. */
  function endNode(v: WV, px: number, py: number, tc: number): number {
    const q = nodes[v.node];
    if (v.node >= n && (q.x - px) * (q.x - px) + (q.y - py) * (q.y - py) <= eps * eps) return v.node;
    return nodeFor(px, py, tc);
  }

  const result = (status: EngineStatus): EngineResult => ({ status, nodes, arcs, events, limit });

  while (alive > 0) {
    // folds first: a vertex between exactly antiparallel lines reaches its nearer neighbour at once
    if (folds.length > 0) {
      const x = folds.shift() as WV;
      if (!x.alive) continue;
      events += 1;
      if (events > limit) return result('workLimit');
      if (hooks.skipResolution?.(events) === true) {
        folds.push(x);
        continue;
      }
      const p = x.prev;
      const q = x.next;
      const ppx = posX(p, T);
      const ppy = posY(p, T);
      const qpx = posX(q, T);
      const qpy = posY(q, T);
      const dp = Math.sqrt((ppx - x.x0) * (ppx - x.x0) + (ppy - x.y0) * (ppy - x.y0));
      const dq = Math.sqrt((qpx - x.x0) * (qpx - x.x0) + (qpy - x.y0) * (qpy - x.y0));
      let ok: boolean;
      if (Math.abs(dp - dq) <= eps || (Math.abs(dp - dq) <= NEAR_CM && !crack(p.a, q.b))) ok = resolve(T, (ppx + qpx) * 0.5, (ppy + qpy) * 0.5, [x, p, q], []);
      else if (dp < dq) ok = resolve(T, ppx, ppy, [x, p], []);
      else ok = resolve(T, qpx, qpy, [x, q], []);
      if (!ok) return result('pairing');
      continue;
    }
    // the events of the current wavefront: each edge's collapse, then each reflex or straight vertex's first reach of
    // an edge — its candidates read only up to the earliest event found so far
    const found: Ev[] = [];
    const near: Ev[] = [];
    let bt = Number.POSITIVE_INFINITY;
    for (const u of verts) {
      if (!u.alive) continue;
      const v = u.next;
      const rate = u.k + v.k;
      const g = u.b;
      const len = along(v, g, T) - along(u, g, T);
      let dt: number;
      if (len <= 0) dt = 0;
      else if (rate > 1e-12) dt = quot(len, rate);
      else continue;
      if (!(dt >= 0)) continue;
      const t = T + dt;
      found.push({ t, x: (posX(u, t) + posX(v, t)) * 0.5, y: (posY(u, t) + posY(v, t)) * 0.5, u, v, target: null });
      if (t < bt) bt = t;
    }
    for (const v of verts) {
      if (!v.alive || !(v.k <= 0)) continue;
      while (v.ci < v.cand.length && v.cand[v.ci].t < T - eps) v.ci += 1;
      for (let i = v.ci; i < v.cand.length; i += 1) {
        const c = v.cand[i];
        if (c.t > bt + eps) break;
        const te = c.t > T ? c.t : T;
        const g = c.g;
        const sq = L.dx[g] * c.qx + L.dy[g] * c.qy;
        let hit: WV | null = null;
        for (const u of onLine[g]) {
          if (u === v || u.next === v) continue;
          const sa = along(u, g, te);
          const sb = along(u.next, g, te);
          if (sq >= sa - eps && sq <= sb + eps) {
            hit = u;
            break;
          }
          // just past an end: a near miss of the end vertex, kept aside
          if (sq < sa && sq >= sa - NEAR_CM) near.push({ t: te, x: c.qx, y: c.qy, u: v, v: null, target: u });
          else if (sq > sb && sq <= sb + NEAR_CM) near.push({ t: te, x: c.qx, y: c.qy, u: v, v: null, target: u.next });
        }
        if (hit !== null) {
          found.push({ t: te, x: c.qx, y: c.qy, u: v, v: null, target: hit });
          if (te < bt) bt = te;
          break;
        }
      }
    }
    // the earliest (ties: the first found — edge events before split events, each in vertex order)
    let best: Ev | null = null;
    for (const e of found) if (best === null || e.t < best.t) best = e;
    if (best === null) return result('stalled');
    events += 1;
    if (events > limit) return result('workLimit');
    if (hooks.skipResolution?.(events) === true) continue;
    const tc = best.t > T ? best.t : T;
    T = tc;
    // the events coinciding with it join it: one multi-edge event
    const forced: WV[] = [];
    const targets: WV[] = [];
    for (const e of found) {
      if (e !== best && !(e.t <= best.t + eps && (e.x - best.x) * (e.x - best.x) + (e.y - best.y) * (e.y - best.y) <= eps * eps)) continue;
      forced.push(e.u);
      if (e.v !== null) forced.push(e.v);
      if (e.target !== null) targets.push(e.target);
    }
    // a near miss of a participating vertex at the same moment joins too (its reflex vertex meets that vertex)
    for (const e of near) {
      if (!(e.target !== null && forced.includes(e.target) && e.t <= best.t + NEAR_CM && e.t >= best.t - NEAR_CM)) continue;
      if ((e.x - best.x) * (e.x - best.x) + (e.y - best.y) * (e.y - best.y) <= NEAR_CM * NEAR_CM) forced.push(e.u);
    }
    if (hooks.trace !== undefined) {
      const ids = (ws: WV[]): string => ws.map((w) => `${w.id}(${w.a},${w.b})`).join(' ');
      hooks.trace(`event ${events} t ${tc} at ${best.x} ${best.y} ${best.v === null ? 'split' : 'edge'} forced ${ids(forced)} targets ${ids(targets)}`);
    }
    if (!resolve(tc, best.x, best.y, forced, targets)) return result('pairing');
  }
  hooks.finished?.(nodes, arcs);
  return result('ok');
}
