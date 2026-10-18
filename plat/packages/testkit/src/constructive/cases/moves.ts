// §13.1 (2) *attraction and moves*: the twelve fixtures of §13.1's list (§3.6's attraction, placement rule and moves;
// warp included, C-0038), each built in local coordinates where its distances are exact — the vertex at (20, 20)
// against (0, 0)–(1 000, 0), the crossing 25.0–25.7 cm from a vertex, the kerb (0, 0)–(1 000, 9) past (517, 30) — and
// placed by a lattice isometry, which keeps every distance. A warp's field is data: `params.dragX` / `dragY` move every
// vertex inside `rings.region` by that vector, nothing outside it (a uniform drag; M0-k-04 builds the
// `DisplacementField`). Run by M0-k-04 (C-0110).
import { ATTRACT, MIN_EDGE, m0Case, makeInput, place, rect, step, type Draw, type P } from '../draw.js';
import { crossingWithin, footInside, len2, lineDistCmp, lineDistIn, projectionGapIn, properCrossing, roundsTo, roundsToSelf, segFartherThan } from '../exact.js';
import { at, refCross } from '../numeric.js';
import type { ConstructiveCase, ConstructiveInput } from '../types.js';

const SOURCE = '§13.1 attraction and moves';
const dist2 = (a: P, b: P) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

/** A square region of half-size r about c, counter-clockwise. */
function around(c: P, r: number): P[] {
  return rect(c.x - r, c.y - r, 2 * r, 2 * r);
}

/** Whether p lies strictly inside the axis-aligned box of a placed square region. */
function insideBox(region: readonly P[], p: P): boolean {
  const xs = region.map((q) => q.x);
  const ys = region.map((q) => q.y);
  return p.x > Math.min(...xs) && p.x < Math.max(...xs) && p.y > Math.min(...ys) && p.y < Math.max(...ys);
}

const way = (chain: string, level = 1) => step('insertChain', { chain, level, cls: 'mandatory', role: 'way' });

function buildVertexNearEndpoint(d: Draw): ConstructiveInput {
  const L = d.log(1000, 1 << 20);
  const v = { x: 20, y: 20 };
  const far = { x: 20 + d.int(-100, 100), y: 20 + d.log(200, 1 << 16) };
  const placed = place(d, { chains: { edge: [{ x: 0, y: 0 }, { x: L, y: 0 }], incoming: [far, v] }, points: { target: { x: 0, y: 0 }, vertex: v } });
  return makeInput('move/vertex-near-endpoint', d.seed, placed, {}, [way('edge'), way('incoming')]);
}

/**
 * §3.6's placement-rule case (C-0187 (3)): a vertex W standing off the crossed edge, between minEdge and minEdge + 0.71
 * cm from it — "a gap a previous rounding or a warp can leave" — and a chain crossing that edge next to W. Insertion alone
 * cannot stand W that close (every chain vertex within attractCm of an edge lands on it, every segment within attractCm
 * of a vertex is routed through it), so the gap is left by a previous rounding, built here: the edge E along (4, 3), W
 * at the end of a lane 26.2 cm off E (beyond attractCm, so it stands), then a same-level splitter landing on E at X, the
 * lattice point 0.6 cm off E's line towards W (the nearest lattice point to its own foot, so the placement rule puts
 * the split there) 30.8 – 55.8 cm along past W's foot — the sub-edge A–X now passes 25.6 cm from W. The crossing chain
 * runs at 45° away from W, crossing A–X 13.4 or 18.4 cm along from W's foot, so it passes more than attractCm from W
 * (never routed through it) while its rounded crossing would bend A–X towards W.
 */
function buildCrossingNearVertex(d: Draw): ConstructiveInput {
  const a = d.int(200, 4000);
  const b = d.int(200, 4000);
  const W = { x: -1, y: 32 }; // 4y − 3x = 131: 26.2 cm off E's line, 18.4 cm along it from the origin
  const mX = d.int(10, 15);
  const X = { x: -1 + 4 * mX, y: 3 * mX }; // 4y − 3x = 3: 0.6 cm off E's line on W's side, 49.2 – 74.2 cm along
  const hW = d.log(40, 1 << 12);
  const tS = d.int(10, 300);
  const mP = d.int(0, 1);
  const P0 = { x: 4 * mP, y: 3 * mP }; // a point of E's line 18.4 or 13.4 cm along before W's foot
  const t1 = d.int(10, 300);
  const t2 = d.int(10, 300);
  const placed = place(d, {
    chains: {
      edge: [{ x: -4 * a, y: -3 * a }, { x: 4 * (15 + b), y: 3 * (15 + b) }],
      lane: [{ x: W.x - 3 * hW, y: W.y + 4 * hW }, W],
      splitter: [{ x: X.x + 7 * tS, y: X.y - tS }, X],
      crossing: [{ x: P0.x + 7 * t1, y: P0.y - t1 }, { x: P0.x - 7 * t2, y: P0.y + t2 }],
    },
    points: { vertex: W, split: X },
  });
  return makeInput('move/crossing-near-vertex', d.seed, placed, { offsetCm: 26.2, splitOffsetCm: 0.6, alongCm: 5 * mX - 19.2 }, [
    way('edge'),
    way('lane'),
    way('splitter'),
    way('crossing'),
  ]);
}

function witnessCrossingNearVertex(input: ConstructiveInput): string | null {
  const [a, b] = input.chains.edge;
  const w = input.points.vertex;
  const x = input.points.split;
  const [s0, s1] = input.chains.splitter;
  const [c0, c1] = input.chains.crossing;
  const lane = input.chains.lane;
  if (!same(lane[lane.length - 1], w) || !segFartherThan(w, a, b, ATTRACT)) return 'the vertex does not end its lane beyond attractCm of the edge (attraction would take it)';
  if (!same(s1, x) || !footInside(x, a, b) || lineDistCmp(x, a, b, 71, 100) >= 0 || !roundsToSelf(x, a, b)) return "the splitter's end is not the edge's placement point";
  if (len2(x, w) <= BigInt(ATTRACT * ATTRACT) || !segFartherThan(w, s0, s1, ATTRACT)) return 'the splitter comes within attractCm of the vertex';
  if (!footInside(w, a, x) || !lineDistIn(w, a, x, 250, 257, 10)) return 'the vertex does not stand 25.0–25.7 cm from the split edge';
  const cr = properCrossing(c0, c1, a, x);
  if (cr === null) return 'the chain does not cross the split edge';
  if (!segFartherThan(w, c0, c1, ATTRACT)) return 'the chain passes within attractCm of the vertex (it would be routed through it)';
  return crossingWithin(c0, c1, cr, w, 40) ? null : 'the crossing is not next to the vertex (over 40 cm from it)';
}

const same = (p: P, q: P) => p.x === q.x && p.y === q.y;

function buildStretchJoin(d: Draw): ConstructiveInput {
  const L = d.log(1000, 1 << 20);
  const j = d.int(1, ATTRACT - 1);
  const m = d.int(j + 200, L - 200);
  const H = d.log(200, 1 << 16);
  const H2 = d.log(200, 1 << 16);
  const placed = place(d, {
    chains: { edge: [{ x: 0, y: 0 }, { x: L, y: 0 }], stretch: [{ x: j, y: -H }, { x: j, y: 0 }, { x: m, y: 0 }, { x: m, y: H2 }] },
    points: { join: { x: j, y: 0 }, endpoint: { x: 0, y: 0 } },
  });
  return makeInput('move/stretch-join-near-endpoint', d.seed, placed, { joinCm: j }, [way('edge'), step('insertChain', { chain: 'stretch', level: 1, cls: 'mandatory', role: 'field_bound' })]);
}

/** A warp step: the region, the drag, the level. */
const warp = (fromLevel: number, extra: Record<string, string | number | boolean> = {}) => step('warp', { region: 'region', dragX: 'dragX', dragY: 'dragY', fromLevel, ...extra });

function buildPinch(d: Draw): ConstructiveInput {
  const l = d.int(MIN_EDGE + 5, 60);
  const delta = d.int(l - MIN_EDGE + 1, l - 1); // the step would leave l − δ ∈ [1, 24] cm: below minEdge
  const c = { x: l, y: d.log(300, 1 << 16) };
  const r = Math.floor(l / 2);
  const placed = place(d, { chains: { chain: [{ x: 0, y: 0 }, { x: l, y: 0 }, c] }, rings: { region: around({ x: l, y: 0 }, r) }, points: { moved: { x: l, y: 0 }, fixed: { x: 0, y: 0 }, target: { x: l - delta, y: 0 } } });
  return makeInput('move/pinch-halves', d.seed, placed, dragOf(placed.points.moved, placed.points.target), [way('chain'), warp(1)]);
}

/** The drag that takes `from` to `to`, as parameters. */
function dragOf(from: P, to: P): { dragX: number; dragY: number } {
  return { dragX: to.x - from.x, dragY: to.y - from.y };
}

function buildCoincide(d: Draw): ConstructiveInput {
  const D = d.int(MIN_EDGE + 5, 500);
  const p = { x: 0, y: 0 };
  const q = { x: D, y: 0 };
  const placed = place(d, {
    chains: { A: [p, { x: 0, y: -d.log(300, 1 << 16) }], B: [q, { x: D, y: d.log(300, 1 << 16) }] },
    rings: { region: around(p, Math.floor(D / 2)) },
    points: { moved: p, target: q },
  });
  return makeInput('move/coincide-halves', d.seed, placed, dragOf(placed.points.moved, placed.points.target), [way('A'), way('B'), warp(1)]);
}

function witnessHalving(input: ConstructiveInput): string | null {
  const { region } = input.rings;
  if (!insideBox(region, input.points.moved)) return 'the moved vertex is outside the region';
  for (const [k, p] of Object.entries(input.points)) if (k !== 'moved' && k !== 'target' && insideBox(region, p)) return `${k} lies inside the region`;
  return null;
}

function buildJunctionOnShore(d: Draw): ConstructiveInput {
  const L = d.log(5000, 1 << 18);
  const R = d.int(600, 2000);
  const H = R + d.log(200, 1 << 16);
  const dx = d.sign() * d.int(30, 500);
  const dy = d.int(-200, 200);
  const placed = place(d, {
    chains: { shore: [{ x: -L, y: 0 }, { x: L, y: 0 }], street: [{ x: 0, y: H }, { x: 0, y: 0 }] },
    rings: { region: around({ x: 0, y: 0 }, R) },
    points: { junction: { x: 0, y: 0 }, drag: { x: dx, y: dy } },
  });
  const drag = placed.points.drag;
  const o = placed.points.junction;
  return makeInput(
    'move/warp-junction-on-shore',
    d.seed,
    { chains: placed.chains, rings: placed.rings, points: { junction: o } },
    { dragX: drag.x - placedOrigin(placed).x, dragY: drag.y - placedOrigin(placed).y, slider: 'junction' },
    [step('insertChain', { chain: 'shore', level: 0, cls: 'mandatory', role: 'shore' }), way('street'), warp(1)],
  );
}

/**
 * The placed image of the local origin: a drag is a vector, so it is placed as the difference of two placed points.
 * Every builder that places a drag puts the local origin among its points as `junction`, `fixed` or `origin`.
 */
function placedOrigin(placed: { points: Record<string, P> }): P {
  const o = placed.points.junction ?? placed.points.origin;
  if (o === undefined) throw new Error('constructive: a placed drag needs the local origin among its points');
  return o;
}

/**
 * §3.6 *Re-seats*' constructive case as the design states it (C-0187 (1)): "a kerb warped to run (0, 0)–(1 000, 9) past a
 * vertex at (517, 30), 25.35 cm from it, with a plot-line end re-seated at that vertex's foot". The kerb is inserted D cm
 * short of that route (D ≥ 2, so the vertex stands beyond attractCm of it and its neighbour's insertion keeps it), the
 * plot line ends on the kerb at the lattice point the warp's drag (dx, D) takes to (517, 5) — the nearest lattice point to
 * the vertex's foot on the warped kerb, where plain rounding leaves the vertex 24.999 cm from the edge to (1 000, 9) — and
 * the region holds the kerb and that end, never the vertex, its neighbour or the line's far end.
 */
function buildKerbNearVertex(d: Draw): ConstructiveInput {
  const dx = d.int(-20, 20);
  const D = d.int(2, 400);
  const end = { x: 517 - dx, y: 5 - D };
  const placed = place(d, {
    chains: {
      kerb: [{ x: -dx, y: -D }, { x: 1000 - dx, y: 9 - D }],
      kerbAfter: [{ x: 0, y: 0 }, { x: 1000, y: 9 }],
      neighbour: [{ x: 517, y: 30 }, { x: 517, y: 30 + d.log(200, 1 << 14) }],
      line: [{ x: end.x, y: end.y - d.log(200, 1 << 14) }, end],
    },
    rings: { region: rect(-80, -D - 30, 1160, 50) },
    points: { origin: { x: 0, y: 0 }, vertex: { x: 517, y: 30 }, end, drag: { x: dx, y: D } },
  });
  const o = placedOrigin(placed);
  return makeInput(
    'move/warp-kerb-near-vertex',
    d.seed,
    { chains: placed.chains, rings: placed.rings, points: { vertex: placed.points.vertex, end: placed.points.end } },
    { dragX: placed.points.drag.x - o.x, dragY: placed.points.drag.y - o.y, insertedShortCm: D },
    [
      step('insertChain', { chain: 'kerb', level: 2, cls: 'mandatory', role: 'kerb' }),
      step('insertChain', { chain: 'neighbour', level: 2, cls: 'mandatory', role: 'plot_line' }),
      step('insertChain', { chain: 'line', level: 3, cls: 'mandatory', role: 'plot_line' }),
      warp(2),
    ],
  );
}

function witnessKerb(input: ConstructiveInput): string | null {
  const [k0, k1] = input.chains.kerb;
  const [a, b] = input.chains.kerbAfter;
  const { vertex: v, end: e } = input.points;
  const moved = (p: P): P => ({ x: p.x + (input.params.dragX as number), y: p.y + (input.params.dragY as number) });
  if (!same(moved(k0), a) || !same(moved(k1), b)) return 'the drag does not take the kerb to (0, 0)–(1 000, 9)';
  // 25.3 cm ≤ distance < 25.4 cm from the warped kerb (the design's 25.35), its foot inside the kerb.
  if (!footInside(v, a, b) || lineDistCmp(v, a, b, 253, 10) < 0 || lineDistCmp(v, a, b, 254, 10) >= 0) return 'the vertex does not stand 25.3–25.4 cm from the warped kerb';
  if (!segFartherThan(v, k0, k1, ATTRACT)) return 'the vertex stands within attractCm of the kerb as inserted (attraction would take it)';
  const n = input.chains.neighbour;
  if (!same(n[0], v)) return "the vertex is not its neighbour chain's end";
  const line = input.chains.line;
  if (!same(line[line.length - 1], e) || !footInside(e, k0, k1) || lineDistCmp(e, k0, k1, 71, 100) >= 0 || !roundsToSelf(e, k0, k1)) return "the plot line does not end at the kerb's placement point";
  // The re-seat's plain rounding is the vertex's foot's: the nearest lattice point to the end's projection onto the
  // warped kerb is r, so is the vertex's foot's, and r leaves the vertex under minEdge from an edge at r.
  const r = moved(e);
  if (!roundsToSelf(r, a, b) || !roundsTo(v, r, a, b)) return "the end's re-seat does not round to the vertex's foot";
  if (lineDistCmp(v, r, b, MIN_EDGE) >= 0 && lineDistCmp(v, a, r, MIN_EDGE) >= 0) return 'plain rounding at the foot would keep minEdge (no placement-rule case)';
  const region = input.rings.region;
  for (const p of [k0, k1, e]) if (!insideBox(region, p)) return 'the region misses the kerb or its plot-line end';
  for (const p of [v, n[n.length - 1], line[0]]) if (insideBox(region, p)) return 'the region holds the vertex, its neighbour or the line’s far end';
  return null;
}

/** Whether S1 + drag and S2 project onto the warped route within [minEdge, minEdge + 1] of each other (local; exact). */
function pairGapIn(g0: number, L: number, delta: number, dy: number): boolean {
  const n = BigInt(g0 - delta) * BigInt(L - delta) + BigInt(dy) * BigInt(dy);
  const m2 = BigInt(L - delta) * BigInt(L - delta) + BigInt(dy) * BigInt(dy);
  return n > 0n && n * n >= 625n * m2 && n * n <= 676n * m2;
}

/**
 * §3.6 *Order within a step*'s pair (C-0187 (2)): two Steiner vertices inserted 40 – 200 cm apart on an L1 route (beyond
 * attractCm, so both stand), the region holding the route's end B and the first, S1, but not the second, S2; the drag
 * (−δ, dy) moves B (the route turns about A) and takes S1 along the route towards S2, δ drawn among the values whose
 * projections onto the warped route — S1's field target's and S2's own (zero displacement outside the region) — lie
 * minEdge to minEdge + 1 cm apart.
 */
function buildSteinerPair(d: Draw): ConstructiveInput {
  const L = d.log(2000, 1 << 18);
  const x2 = d.int(400, L - 700);
  const g0 = d.int(40, 200);
  const x1 = x2 + g0;
  const dy = d.int(-100, 100);
  const deltas: number[] = [];
  for (let delta = g0 - 30; delta <= g0 - 20; delta += 1) if (pairGapIn(g0, L, delta, dy)) deltas.push(delta);
  if (deltas.length === 0) throw new Error(`move/warp-steiner-pair-renumbering: no drag brings the pair within minEdge + 1 (g0 ${String(g0)}, L ${String(L)}, dy ${String(dy)})`);
  const delta = d.pick(deltas);
  const left = x1 - Math.floor(g0 / 2);
  const placed = place(d, {
    chains: { route: [{ x: 0, y: 0 }, { x: L, y: 0 }], first: [{ x: x1, y: d.log(300, 1 << 14) }, { x: x1, y: 0 }], second: [{ x: x2, y: -d.log(300, 1 << 14) }, { x: x2, y: 0 }] },
    rings: { region: rect(left, -100, L + 100 - left, 200) },
    points: { origin: { x: 0, y: 0 }, drag: { x: -delta, y: dy }, s1: { x: x1, y: 0 }, s2: { x: x2, y: 0 } },
  });
  const o = placedOrigin(placed);
  return makeInput(
    'move/warp-steiner-pair-renumbering',
    d.seed,
    { chains: placed.chains, rings: placed.rings, points: { s1: placed.points.s1, s2: placed.points.s2 } },
    { dragX: placed.points.drag.x - o.x, dragY: placed.points.drag.y - o.y, insertedGapCm: g0 },
    [way('route'), step('insertChain', { chain: 'first', level: 2, cls: 'mandatory', role: 'plot_line' }), step('insertChain', { chain: 'second', level: 2, cls: 'mandatory', role: 'plot_line' }), warp(1, { renumberThenRepeat: true })],
  );
}

function witnessSteinerPair(input: ConstructiveInput): string | null {
  const [a, b] = input.chains.route;
  const { s1, s2 } = input.points;
  const first = input.chains.first;
  const second = input.chains.second;
  if (!same(first[first.length - 1], s1) || !same(second[second.length - 1], s2)) return 'the plot lines do not end at the pair';
  for (const s of [s1, s2]) {
    if (refCross(a, b, s) !== 0n || !footInside(s, a, b)) return 'a Steiner vertex is not on the route';
    if (len2(s, a) <= BigInt(ATTRACT * ATTRACT) || len2(s, b) <= BigInt(ATTRACT * ATTRACT)) return "a Steiner vertex stands within attractCm of the route's end";
  }
  if (len2(s1, s2) <= BigInt(ATTRACT * ATTRACT)) return 'the pair is inserted within attractCm (attraction would merge it)';
  const region = input.rings.region;
  if (!insideBox(region, s1) || !insideBox(region, b)) return "the region misses S1 or the route's end";
  for (const p of [a, s2, first[0], second[0]]) if (insideBox(region, p)) return 'the region holds S2, the fixed end or a plot line’s far end';
  const drag = { x: input.params.dragX as number, y: input.params.dragY as number };
  const t1 = { x: s1.x + drag.x, y: s1.y + drag.y };
  const bt = { x: b.x + drag.x, y: b.y + drag.y };
  return projectionGapIn(t1, s2, a, bt, MIN_EDGE, MIN_EDGE + 1) ? null : 'the projections onto the warped route are not minEdge to minEdge + 1 cm apart';
}

function buildHeldCorners(d: Draw): ConstructiveInput {
  const W = d.int(800, 4000);
  const D = d.int(1500, 6000);
  const y1 = d.int(200, Math.floor(D / 2) - 100);
  const y2 = d.int(Math.floor(D / 2) + 100, D - 200);
  const bw = d.int(400, 1500);
  const gap = d.int(300, 800);
  const placed = place(d, {
    rings: {
      plot: rect(0, 0, W, D),
      neighbour: [{ x: W, y: y1 }, { x: W + 600, y: y1 }, { x: W + 600, y: y2 }, { x: W, y: y2 }],
      building: rect(W + 600 + gap, 200, bw, bw),
      region: rect(-500, -500, W + 600 + gap + bw + 1000, D + 1000),
    },
    points: { origin: { x: 0, y: 0 }, drag: { x: d.int(-100, 100), y: d.int(-100, 100) } },
  });
  const o = placedOrigin(placed);
  return makeInput(
    'move/warp-held-corners',
    d.seed,
    { rings: placed.rings },
    { dragX: placed.points.drag.x - o.x, dragY: placed.points.drag.y - o.y, held: ['plot', 'building'], slider: 'neighbour' },
    [
      step('insertChain', { ring: 'plot', level: 3, cls: 'mandatory', role: 'plot_line' }),
      step('insertChain', { ring: 'neighbour', level: 4, cls: 'mandatory', role: 'party_wall' }),
      step('insertChain', { ring: 'building', level: 4, cls: 'mandatory', role: 'party_wall' }),
      step('pinVertices', { ring: 'building' }),
      warp(3, { held: 'plot' }),
    ],
  );
}

function buildFinishedFabric(d: Draw): ConstructiveInput {
  const S = d.int(4000, 20_000);
  const k = d.int(300, 600);
  const midY = d.int(k + 300, S - k - 300);
  const fx = d.int(k + 100, S - k - 1200);
  const placed = place(d, {
    rings: { street: rect(0, 0, S, S), kerb: rect(k, k, S - 2 * k, S - 2 * k), footprint: rect(fx, k + 100, 800, Math.min(800, midY - k - 200)), region: rect(S - 600, S - 600, 1200, 1200) },
    chains: { plotLine: [{ x: k, y: midY }, { x: S - k, y: midY }] },
    points: { origin: { x: 0, y: 0 }, drag: { x: d.int(-100, 100), y: d.int(-100, 100) } },
  });
  const o = placedOrigin(placed);
  return makeInput(
    'move/warp-finished-fabric',
    d.seed,
    { rings: placed.rings, chains: placed.chains },
    { dragX: placed.points.drag.x - o.x, dragY: placed.points.drag.y - o.y },
    [
      step('insertChain', { ring: 'street', level: 1, cls: 'mandatory', role: 'way' }),
      step('insertChain', { ring: 'kerb', level: 2, cls: 'mandatory', role: 'kerb' }),
      step('insertChain', { chain: 'plotLine', level: 3, cls: 'mandatory', role: 'plot_line' }),
      step('insertChain', { ring: 'footprint', level: 4, cls: 'mandatory', role: 'party_wall' }),
      warp(1),
    ],
  );
}

function buildWaterGates(d: Draw): ConstructiveInput {
  const L = d.log(5000, 1 << 18);
  const Wr = d.int(500, 5000);
  const Dw = d.int(500, 3000);
  const g1 = d.int(-L + 1000, -500);
  const g2 = d.int(500, L - 1000);
  const wall = (g: number): P[] => [{ x: g, y: -Dw }, { x: g, y: 0 }, { x: g, y: Wr }, { x: g, y: Wr + Dw }];
  const placed = place(d, {
    rings: { river: rect(-L, 0, 2 * L, Wr), region: rect(-L + 200, -Dw + 200, 2 * L - 400, Wr + 2 * Dw - 400) },
    chains: { generatedWall: wall(g1), editedWall: wall(g2) },
    pointSets: { gateEnds: [{ x: g1, y: 0 }, { x: g1, y: Wr }, { x: g2, y: 0 }, { x: g2, y: Wr }] },
    points: { origin: { x: 0, y: 0 }, drag: { x: d.int(-150, 150), y: d.int(-150, 150) } },
  });
  const o = placedOrigin(placed);
  return makeInput(
    'move/warp-water-gates',
    d.seed,
    { rings: placed.rings, chains: placed.chains, pointSets: placed.pointSets },
    { dragX: placed.points.drag.x - o.x, dragY: placed.points.drag.y - o.y, held: ['gateEnds'] },
    [
      step('insertChain', { ring: 'river', level: 0, cls: 'mandatory', role: 'bank' }),
      step('insertChain', { chain: 'generatedWall', level: 1, cls: 'mandatory', role: 'wall', gateEnds: 'gateEnds' }),
      step('insertChain', { chain: 'editedWall', level: 1, cls: 'mandatory', role: 'wall', gateEnds: 'gateEnds' }),
      warp(1),
    ],
  );
}

function buildSpineTJunction(d: Draw): ConstructiveInput {
  const L = d.log(2000, 1 << 18);
  const j = d.int(-L + 500, L - 500);
  const over = d.seed % 2 === 0; // even seeds: the warp moves the junction; odd: the spine's vertices around it
  const region = over ? rect(j - 300, -300, 600, 600) : rect(L - 300, -300, 600, 600);
  const placed = place(d, {
    chains: { spine: [{ x: -L, y: 0 }, { x: L, y: 0 }], lane: [{ x: j, y: d.log(300, 1 << 16) }, { x: j, y: 0 }] },
    rings: { region },
    points: { origin: { x: 0, y: 0 }, junction: { x: j, y: 0 }, drag: { x: d.int(-100, 100), y: d.int(50, 200) } },
  });
  const o = placed.points.origin;
  return makeInput(
    'move/warp-spine-tjunction',
    d.seed,
    { chains: placed.chains, rings: placed.rings, points: { junction: placed.points.junction } },
    { dragX: placed.points.drag.x - o.x, dragY: placed.points.drag.y - o.y, variant: over ? 'over-junction' : 'around-junction' },
    [way('spine'), way('lane'), warp(1), step('removeEdges', { chain: 'lane' })],
  );
}

function buildReseatClearFiner(d: Draw): ConstructiveInput {
  const L = d.log(2000, 1 << 18);
  const x = d.int(500, L - 500);
  const placed = place(d, {
    chains: { route: [{ x: 0, y: 0 }, { x: L, y: 0 }], finer: [{ x, y: d.log(300, 1 << 16) }, { x, y: 0 }] },
    rings: { region: around({ x: L, y: 0 }, 100) },
    points: { origin: { x: 0, y: 0 }, drag: { x: 0, y: d.sign() * d.int(30, 400) } },
  });
  const o = placedOrigin(placed);
  return makeInput(
    'move/warp-reseat-clearfiner',
    d.seed,
    { chains: placed.chains, rings: placed.rings },
    { dragX: placed.points.drag.x - o.x, dragY: placed.points.drag.y - o.y },
    [way('route'), step('insertChain', { chain: 'finer', level: 2, cls: 'mandatory', role: 'plot_line' }), warp(1), step('clearFiner', { side: 'finer', level: 1 })],
  );
}

export const MOVE_CASES: readonly ConstructiveCase[] = Object.freeze([
  m0Case({
    id: 'move/vertex-near-endpoint',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['insertChain'],
    expect: {
      outcome: 'ok',
      holds: ['lands-on-target', 'no-short-edge', 'hard-invariants'],
      clause: 'a vertex at (20, 20) against the edge (0, 0)–(1 000, 0) moves onto (0, 0), leaving no sub-minEdge edge',
    },
    build: buildVertexNearEndpoint,
    witness: (input) => {
      const { vertex: v, target: t } = input.points;
      const [a, b] = input.chains.edge;
      return dist2(v, t) === 800 && dist2(a, t) === 0 && Number(refCross(a, b, v)) ** 2 === 400 * dist2(a, b) ? null : `the vertex ${at(v)} is not at (20, 20) from ${at(t)}`;
    },
  }),
  m0Case({
    id: 'move/crossing-near-vertex',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['insertChain'],
    expect: {
      outcome: 'ok',
      holds: ['no-short-edge', 'hard-invariants', 'euler'],
      clause: "a chain crossing an edge next to a vertex standing 25.0–25.7 cm from it — the vertex off the edge, its gap left by a previous same-level split's rounding (§3.6's placement rule: \"a gap a previous rounding or a warp can leave\")",
    },
    build: buildCrossingNearVertex,
    witness: witnessCrossingNearVertex,
  }),
  m0Case({
    id: 'move/stretch-join-near-endpoint',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['insertChain'],
    expect: { outcome: 'ok', holds: ['no-short-edge', 'roles-preserved', 'hard-invariants', 'euler'], clause: 'a stretch whose join point lies within attractCm of an edge endpoint' },
    build: buildStretchJoin,
    witness: (input) => {
      const j2 = dist2(input.points.join, input.points.endpoint);
      return j2 >= 1 && j2 < ATTRACT * ATTRACT ? null : 'the join point is not within attractCm of the endpoint';
    },
  }),
  m0Case({
    id: 'move/pinch-halves',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['warp'],
    expect: { outcome: 'ok', holds: ['step-halved', 'no-short-edge', 'hard-invariants'], clause: 'a pinch that would shorten an edge below minEdge (the step halves)' },
    build: buildPinch,
    witness: (input) => {
      const w = witnessHalving(input);
      if (w !== null) return w;
      const left = dist2(input.points.target, input.points.fixed);
      return left >= 1 && left < MIN_EDGE * MIN_EDGE ? null : 'the full step would not shorten the edge below minEdge';
    },
  }),
  m0Case({
    id: 'move/coincide-halves',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['warp'],
    expect: { outcome: 'ok', holds: ['step-halved', 'no-short-edge', 'hard-invariants'], clause: 'a step that would put two vertices on one lattice point (the step halves)' },
    build: buildCoincide,
    witness: witnessHalving,
  }),
  m0Case({
    id: 'move/warp-junction-on-shore',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['warp'],
    expect: {
      outcome: 'ok',
      holds: ['slides-on-route', 'hard-invariants', 'no-short-edge'],
      clause: 'a warp with fromLevel = 1 over a street ending on a shore (the junction slides along the shore and the step commits)',
    },
    build: buildJunctionOnShore,
    witness: (input) => {
      const [a, b] = input.chains.shore;
      return refCross(a, b, input.points.junction) === 0n ? null : 'the junction is not on the shore';
    },
  }),
  m0Case({
    id: 'move/warp-kerb-near-vertex',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['warp'],
    expect: {
      outcome: 'ok',
      holds: ['placement-rule', 'no-short-edge', 'hard-invariants'],
      clause: 'a warp moving a kerb beside a vertex 25.3 cm from it — the kerb (0, 0)–(1 000, 9) past (517, 30) — commits, its re-seated vertex placed by the placement rule',
    },
    build: buildKerbNearVertex,
    witness: witnessKerb,
  }),
  m0Case({
    id: 'move/warp-steiner-pair-renumbering',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['warp', 'renumberSlots'],
    expect: {
      outcome: 'ok',
      holds: ['renumbering-identity', 'placement-rule', 'hard-invariants'],
      clause: 'a warp re-seating two Steiner vertices whose projections lie within minEdge + 1 cm of each other gives identical output after a slot renumbering',
    },
    build: buildSteinerPair,
    witness: witnessSteinerPair,
  }),
  m0Case({
    id: 'move/warp-held-corners',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['warp', 'pinVertices'],
    expect: {
      outcome: 'ok',
      holds: ['held-unmoved', 'slides-on-route', 'hard-invariants'],
      clause: "a warp over a locked plot and over a pinned building holds every corner (a neighbour's footprint corner on the locked plot's line slides) — the held-entity list injected (M0-a-13; the lock layer M2a's)",
    },
    build: buildHeldCorners,
  }),
  m0Case({
    id: 'move/warp-finished-fabric',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['warp'],
    expect: { outcome: 'ok', holds: ['no-kept-error', 'hard-invariants', 'no-short-edge'], clause: 'a warp with fromLevel = 1 over finished fabric gives 0 E_KEPT' },
    build: buildFinishedFabric,
  }),
  m0Case({
    id: 'move/warp-water-gates',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['warp'],
    expect: {
      outcome: 'ok',
      holds: ['held-unmoved', 'hard-invariants'],
      clause: "a warp with fromLevel = 1 over a generated and an edited water gate moves neither gate's bank vertices (`gate_end` held unless fromLevel = 0)",
    },
    build: buildWaterGates,
  }),
  m0Case({
    id: 'move/warp-spine-tjunction',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['warp', 'removeEdges'],
    sweep: 2,
    expect: {
      outcome: 'ok',
      holds: ['junction-shape-vertex', 'hard-invariants'],
      clause: "a warp over a spine carrying a same-level T-junction, and one moving the spine's vertices around the unmoved junction, then the lane removed — the junction stays a shape vertex of the warped spine",
    },
    build: buildSpineTJunction,
  }),
  m0Case({
    id: 'move/warp-reseat-clearfiner',
    class: 'attraction-moves',
    source: SOURCE,
    ops: ['warp', 'clearFiner'],
    expect: {
      outcome: 'ok',
      holds: ['coarser-edge-restored', 'hard-invariants'],
      clause: 'a warp that re-seats a Steiner vertex, then clearFiner — the vertex dissolves and the coarser edge is restored exactly',
    },
    build: buildReseatClearFiner,
  }),
]);
