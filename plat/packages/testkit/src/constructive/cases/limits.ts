// §13.1 (2) *the kernel at its limits (§3.11)*: "every case its rows name — no input, one item, the caps, degenerate
// geometry, missing or contradictory data, every rung from THORP to the METROPOLIS cap, every toggle and preset, and
// save, load, undo, redo, regenerate and migrate — each built on purpose and returning the outcome and tier its row
// states". One case per item of each row's outcome cell (the range invariant's is quantisation's refusal case, area2's
// flush the star rings', a collinear overlap the geometry overlaps'); the items whose mechanism lands later are stubs
// with their milestones (C-0038): the Poisson sampler (M1), `transientArena` (M6-P), the clear-region contact rule
// (M3a), frame growth (M4), undo and redo (M2a, the edit log), the declared shift and migration (M1, the goldens and
// the document). The F-NUM inputs of §13.1's ladder coverage are tagged here (M0-x-06 reads them by id).
import { ATTRACT, MIN_EDGE, cw, deferredCase, m0Case, makeInput, place, primitiveDir, rect, step, type Draw, type P } from '../draw.js';
import { footInside } from '../exact.js';
import { refArea2, refCross } from '../numeric.js';
import type { ConstructiveCase, ConstructiveExpect, ConstructiveInput, ConstructiveMilestone } from '../types.js';

const NO_INPUT = '§3.11 no input';
const ONE_ITEM = '§3.11 one item';
const CAPS = '§3.11 the caps';
const DEGENERATE = '§3.11 degenerate geometry';
const MISSING = '§3.11 missing, empty or contradictory data';
const RUNG = '§3.11 every rung, THORP to the METROPOLIS cap';
const TOGGLE = '§3.11 every toggle and preset';
const PERSIST = '§3.11 save, load, undo, redo, regenerate, migrate';

const faceIn = (ring = 'face', role = 'way') => step('insertChain', { ring, level: 1, cls: 'mandatory', role });

/** A rectangle face w × h with sides in [min, 2¹⁸]. */
function face(d: Draw, min = 400): P[] {
  return rect(0, 0, d.log(min, 1 << 18), d.log(min, 1 << 18));
}

/** A face and nothing else. */
function faceOnly(id: string, d: Draw, params: Record<string, number | string | boolean>, steps: ReturnType<typeof step>[], extra: Record<string, P[]> = {}): ConstructiveInput {
  return makeInput(id, d.seed, place(d, { rings: { face: face(d), ...extra } }), params, [faceIn(), ...steps]);
}

/** Points within r cm of a centre (1 to n of them), so snapping and decimation leave fewer than two distinct points. */
function cluster(d: Draw, r: number): P[] {
  const c = { x: 0, y: 0 };
  const n = d.int(1, 5);
  const out: P[] = [c];
  for (let i = 1; i < n; i += 1) out.push({ x: d.int(-r, r), y: d.int(-r, r) });
  return out;
}

/** A chain whose every point lies within minEdge / 2 of its first: < 2 distinct points after snapping and decimation. */
function tinyChain(d: Draw): P[] {
  const c = cluster(d, Math.floor(MIN_EDGE / 2 / Math.SQRT2));
  return c.length === 1 ? [c[0], { ...c[0] }] : c;
}

/** At most two distinct points, repeated: fewer than three distinct points. */
function twoPoints(d: Draw): P[] {
  const a = { x: 0, y: 0 };
  const b = { x: d.log(1, 1 << 16), y: d.int(-(1 << 16), 1 << 16) };
  const pts: P[] = d.bool() ? [a, b] : [a];
  while (pts.length < d.int(1, 4)) pts.push({ ...d.pick(pts) });
  return pts;
}

const ref = (outcome: 'refused', code: ConstructiveExpect['code'], detail: string | undefined, clause: string): ConstructiveExpect => ({
  outcome,
  code,
  ...(detail !== undefined ? { detail } : {}),
  tier: 1,
  holds: ['version-kept'],
  clause,
});

function deferredLimit(id: string, milestone: Exclude<ConstructiveMilestone, 'M0'>, source: string, ops: string[], expect: ConstructiveExpect): ConstructiveCase {
  return deferredCase({ id, class: 'kernel-limits', milestone, source, ops, expect });
}

// ── no input ──

function buildNoInputQuery(d: Draw): ConstructiveInput {
  const f = face(d);
  const w = f[2].x;
  const gap = d.log(100, 1 << 18);
  return makeInput('limit/no-input-query', d.seed, place(d, { rings: { face: f, box: rect(w + gap, 0, d.log(1, 1 << 16), d.log(1, 1 << 16)) } }), {}, [
    faceIn(),
    step('query', { box: 'box', level: d.int(0, 4) }),
  ]);
}

function buildDelaunay(d: Draw): ConstructiveInput {
  const variant = (['fewer-than-three', 'collinear', 'coincident-third'] as const)[d.seed % 3];
  let sites: P[];
  if (variant === 'fewer-than-three') sites = twoPoints(d);
  else if (variant === 'collinear') {
    const p = primitiveDir(d, 64);
    const n = d.int(3, 12);
    const ks = new Set<number>();
    while (ks.size < n) ks.add(d.int(0, 4096));
    sites = [...ks].map((k) => ({ x: k * p.x, y: k * p.y }));
  } else {
    const a = { x: 0, y: 0 };
    const b = { x: d.log(1, 1 << 16), y: d.int(-(1 << 16), 1 << 16) };
    sites = [a, b, d.bool() ? { ...a } : { ...b }];
  }
  return makeInput('limit/no-input-delaunay', d.seed, place(d, { pointSets: { sites } }), { variant }, [step('delaunay', { sites: 'sites' })]);
}

function buildBooleansEmpty(d: Draw): ConstructiveInput {
  const a = face(d);
  const disjoint = d.bool();
  const b = disjoint ? rect(a[1].x + d.log(1, 1 << 16), 0, d.log(400, 1 << 16), d.log(400, 1 << 16)) : rect(-d.int(0, 100), -d.int(0, 100), a[1].x + 200, a[2].y + 200);
  return makeInput('limit/no-input-booleans-empty', d.seed, place(d, { rings: { a, b } }), { op: disjoint ? 'intersection' : 'difference', fill: 'nonzero' }, [
    step('booleans', { op: disjoint ? 'intersection' : 'difference', a: 'a', b: 'b', fill: 'nonzero' }),
  ]);
}

function buildBufferEmpty(d: Draw): ConstructiveInput {
  const none = d.bool();
  const chain = [{ x: 0, y: 0 }, { x: d.log(100, 1 << 16), y: d.int(-500, 500) }];
  return makeInput('limit/no-input-buffer-empty', d.seed, place(d, { chains: none ? {} : { chain } }), { halfWidthCm: none ? d.int(1, 500) : 0, joins: 'round', ends: 'round' }, [
    step('buffer', { chains: none ? '' : 'chain', halfWidthCm: 'halfWidthCm', joins: 'round', ends: 'round' }),
  ]);
}

function buildOffsetEmpty(d: Draw): ConstructiveInput {
  const f = face(d);
  const big = Math.ceil(Math.max(f[2].x, f[2].y) / 2) + d.int(1, 1000);
  return makeInput('limit/no-input-offsetface-empty', d.seed, place(d, { rings: { face: f } }), { perEdgeCm: [big, big, big, big] }, [faceIn(), step('offsetFace', { face: 'face', perEdgeCm: 'perEdgeCm' })]);
}

function buildInsetEmpty(d: Draw): ConstructiveInput {
  const f = face(d);
  return makeInput('limit/no-input-insetring-empty', d.seed, place(d, { rings: { face: f } }), { dCm: Math.ceil(Math.min(f[2].x, f[2].y) / 2) + d.int(0, 1000) }, [
    faceIn(),
    step('insetRing', { face: 'face', dCm: 'dCm' }),
  ]);
}

function buildSampleProfileEmpty(d: Draw): ConstructiveInput {
  const L = d.log(400, 1 << 16);
  return makeInput('limit/no-input-sampleprofile', d.seed, place(d, { chains: { way: [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: L, y: d.log(400, 1 << 16) }] } }), { knots: [0, 2], knotValues: [d.int(100, 600), d.int(100, 600)], knotRole: 'width_knot' }, [
    step('insertChain', { chain: 'way', level: 1, cls: 'mandatory', role: 'way', profile: 'knots' }),
    step('removeEdges', { chain: 'way' }),
    step('sampleProfile', { chain: 'way', atCm: 'perVertex' }),
  ]);
}

// ── one item ──

function buildOneItemChain(id: string, cls: 'optional' | 'mandatory') {
  return (d: Draw): ConstructiveInput => makeInput(id, d.seed, place(d, { chains: { chain: tinyChain(d) } }), {}, [step('insertChain', { chain: 'chain', level: 1, cls, role: 'way' })]);
}

function buildFewPoints(id: string, op: string) {
  return (d: Draw): ConstructiveInput => makeInput(id, d.seed, place(d, { rings: { ring: twoPoints(d) } }), {}, [step(op, { ring: 'ring' })]);
}

function buildOneKnot(d: Draw): ConstructiveInput {
  const r = face(d);
  return makeInput('limit/one-item-profile-knot', d.seed, place(d, { rings: { ring: r } }), { knots: [d.int(0, 3)], knotValues: [d.int(100, 900)], knotRole: 'base_knot' }, [
    step('insertChain', { ring: 'ring', level: 1, cls: 'mandatory', role: 'wall', profile: 'knots' }),
    step('sampleProfile', { ring: 'ring', atCm: d.int(25, 1000) }),
  ]);
}

// ── the caps ──

function buildWorkLimit(d: Draw): ConstructiveInput {
  const n = d.int(10, 200);
  const chain: P[] = [];
  let x = 0;
  for (let i = 0; i < n; i += 1) {
    chain.push({ x, y: d.int(-200, 200) * (i % 2 === 0 ? 1 : -1) });
    x += d.int(100, 1000);
  }
  return makeInput('limit/cap-tx-work-limit', d.seed, place(d, { chains: { chain } }), { workLimit: Math.floor(n / 2) }, [
    step('insertChain', { chain: 'chain', level: 1, cls: 'mandatory', role: 'way', workLimit: 'workLimit' }),
  ]);
}

function buildComb(d: Draw): ConstructiveInput {
  // A comb: k teeth of width t and depth h above a spine of height b — many reflex vertices, many split events.
  const k = d.int(8, 64);
  const t = d.int(100, 1000);
  const g = d.int(100, 1000);
  const h = d.int(200, 5000);
  const b = d.int(200, 2000);
  const ring: P[] = [{ x: 0, y: 0 }, { x: k * (t + g) - g, y: 0 }];
  for (let i = k - 1; i >= 0; i -= 1) {
    const x0 = i * (t + g);
    ring.push({ x: x0 + t, y: b + h }, { x: x0, y: b + h });
    if (i > 0) ring.push({ x: x0, y: b }, { x: x0 - g, y: b });
  }
  return makeInput('limit/cap-skeleton-events', d.seed, place(d, { rings: { outer: dedupe(ring) } }), { teeth: k }, [step('skeleton', { rings: 'outer', use: 'roof' })]);
}

/** Drops consecutive repeats. */
function dedupe(r: P[]): P[] {
  return r.filter((p, i) => i === 0 || p.x !== r[i - 1].x || p.y !== r[i - 1].y);
}

function buildSnapPasses(d: Draw): ConstructiveInput {
  // A pencil of k chains crossing within a few centimetres of the origin, at slightly different slopes: their exact
  // crossings fall between lattice points, so snap rounding iterates (≤ 3 passes, then planar with W_SNAP_PASSES).
  const k = d.int(3, 12);
  const L = d.int(500, 5000);
  const chains: Record<string, P[]> = {};
  const used = new Set<number>();
  for (let i = 0; i < k; i += 1) {
    let a = d.int(-40, 40);
    while (used.has(a)) a = d.int(-40, 40);
    used.add(a);
    chains[`c${String(i)}`] = [{ x: -L, y: a }, { x: L, y: -a + d.int(-3, 3) }];
  }
  return makeInput('limit/cap-snap-passes', d.seed, place(d, { chains }), { chains: k }, Object.keys(chains).map((c) => step('insertChain', { chain: c, level: 1, cls: 'mandatory', role: 'way' })));
}

function buildHalvings(d: Draw): ConstructiveInput {
  // p stands exactly minEdge from q; the drag pulls p toward q by δ ≥ 512 cm, so even δ / 2⁸ shortens the edge.
  const delta = d.int(512, 2048);
  const r = { x: MIN_EDGE, y: d.log(300, 1 << 16) };
  const placed = place(d, {
    chains: { chain: [{ x: 0, y: 0 }, { x: MIN_EDGE, y: 0 }, r] },
    rings: { region: rect(MIN_EDGE - 10, -10, 20, 20) },
    points: { origin: { x: 0, y: 0 }, drag: { x: -delta, y: 0 } },
  });
  const o = placed.points.origin;
  return makeInput('limit/cap-move-halvings', d.seed, { chains: placed.chains, rings: placed.rings }, { dragX: placed.points.drag.x - o.x, dragY: placed.points.drag.y - o.y }, [
    step('insertChain', { chain: 'chain', level: 1, cls: 'mandatory', role: 'way' }),
    step('warp', { region: 'region', dragX: 'dragX', dragY: 'dragY', fromLevel: 1 }),
  ]);
}

function buildHeldClosure(d: Draw): ConstructiveInput {
  // A held vertex g on an L1 chain, and finer chains hanging from it to L4, each from the previous one's far end.
  const s = () => d.int(300, 3000);
  const g = { x: 0, y: 0 };
  const b = { x: s(), y: s() };
  const c = { x: b.x + s(), y: b.y - s() };
  const e = { x: c.x + s(), y: c.y + s() };
  const placed = place(d, {
    chains: { l1: [{ x: -s(), y: 0 }, g, { x: s(), y: -s() }], l2: [g, b], l3: [b, c], l4: [c, e] },
    rings: { region: rect(-5000, -5000, e.x + 10_000, 20_000) },
    points: { origin: { x: 0, y: 0 }, held: g, drag: { x: d.int(-100, 100), y: d.int(-100, 100) } },
  });
  const o = placed.points.origin;
  return makeInput('limit/cap-held-closure', d.seed, { chains: placed.chains, rings: placed.rings, points: { held: placed.points.held } }, { dragX: placed.points.drag.x - o.x, dragY: placed.points.drag.y - o.y, held: ['held'] }, [
    step('insertChain', { chain: 'l1', level: 1, cls: 'mandatory', role: 'wall', gateEnd: 'held' }),
    step('insertChain', { chain: 'l2', level: 2, cls: 'mandatory', role: 'kerb' }),
    step('insertChain', { chain: 'l3', level: 3, cls: 'mandatory', role: 'plot_line' }),
    step('insertChain', { chain: 'l4', level: 4, cls: 'mandatory', role: 'party_wall' }),
    step('warp', { region: 'region', dragX: 'dragX', dragY: 'dragY', fromLevel: 1 }),
  ]);
}

function buildPlacementSearch(d: Draw): ConstructiveInput {
  // A steep primitive direction holds few lattice points near its line: the placement search runs out to attractCm.
  let p = primitiveDir(d, 4000);
  while (Math.abs(p.x) < 1000 || Math.abs(p.y) < 1000) p = primitiveDir(d, 4000);
  const k = d.int(2, 64);
  const t = d.int(1, 1000) / 1000;
  const foot = { x: Math.round(p.x * k * t), y: Math.round(p.y * k * t) };
  const len = Math.hypot(p.x, p.y);
  const off = d.int(1, ATTRACT - 2);
  const near = { x: foot.x + Math.round((-p.y * off) / len), y: foot.y + Math.round((p.x * off) / len) };
  const far = { x: near.x + Math.round((-p.y * 600) / len), y: near.y + Math.round((p.x * 600) / len) };
  return makeInput('limit/cap-placement-search', d.seed, place(d, { chains: { edge: [{ x: 0, y: 0 }, { x: k * p.x, y: k * p.y }], incoming: [far, near] } }), {}, [
    step('insertChain', { chain: 'edge', level: 1, cls: 'mandatory', role: 'way' }),
    step('insertChain', { chain: 'incoming', level: 1, cls: 'mandatory', role: 'way' }),
  ]);
}

function buildRebuildThreshold(d: Draw): ConstructiveInput {
  const S = d.int(10, 1200);
  const E = Math.max(256, Math.ceil((3 * S) / 4)) + 50;
  const grid = (n: number, y0: number): P[] => Array.from({ length: n }, (_, i) => ({ x: (i % 40) * 200, y: y0 + Math.floor(i / 40) * 200 }));
  return makeInput('limit/cap-rebuild-threshold', d.seed, place(d, { pointSets: { staticSites: grid(S, 0), editSites: grid(E, 200 * (Math.ceil(S / 40) + 1)) } }), { staticChains: S, editChains: E, segmentCm: 30 }, [
    step('insertSegments', { sites: 'staticSites', lengthCm: 30, level: 2, role: 'plot_line' }),
    step('rebuildPartitions', { level: 2 }),
    step('insertSegments', { sites: 'editSites', lengthCm: 30, level: 2, role: 'plot_line', oneBatchEach: true }),
  ]);
}

/** §3.2 (1): METROPOLIS at the cap, aspect 2 — 17.53 km × 8.76 km plus the 30 % margin on every side. */
const CAP_HALF_X = 1_402_400;
const CAP_HALF_Y = 700_800;

function buildLargestArena(d: Draw): ConstructiveInput {
  const chains: Record<string, P[]> = {};
  for (let i = 0; i < 4; i += 1) {
    const x = d.int(-CAP_HALF_X + 1000, CAP_HALF_X - 5000);
    const y = d.int(-CAP_HALF_Y + 1000, CAP_HALF_Y - 5000);
    chains[`way${String(i)}`] = [{ x, y }, { x: x + d.int(500, 4000), y: y + d.int(500, 4000) }];
  }
  return makeInput('limit/cap-largest-arena', d.seed, place(d, { rings: { outer: rect(-CAP_HALF_X, -CAP_HALF_Y, 2 * CAP_HALF_X, 2 * CAP_HALF_Y) }, chains }, { fixed: true }), {}, [
    step('insertChain', { ring: 'outer', level: 0, cls: 'mandatory', role: 'margin' }),
    ...Object.keys(chains).map((c) => step('insertChain', { chain: c, level: 1, cls: 'mandatory', role: 'way' })),
  ]);
}

// ── degenerate geometry ──

function buildCoincidentPoints(d: Draw): ConstructiveInput {
  const n = d.int(3, 6);
  const A: P[] = [];
  let x = 0;
  for (let i = 0; i < n; i += 1) {
    A.push({ x, y: d.int(-500, 500) });
    if (d.bool()) A.push({ ...A[A.length - 1] }); // a coincident repeat
    x += d.log(100, 1 << 14);
  }
  const v = A[d.int(1, A.length - 2)];
  const B = [{ x: v.x, y: v.y + 600 + d.log(0, 1 << 14) }, { ...v }];
  return makeInput('limit/degen-coincident-points', d.seed, place(d, { chains: { A, B } }), {}, [
    step('insertChain', { chain: 'A', level: 1, cls: 'mandatory', role: 'way' }),
    step('insertChain', { chain: 'B', level: 1, cls: 'mandatory', role: 'way' }),
  ]);
}

function buildSelfTouchingChain(d: Draw): ConstructiveInput {
  const s = d.log(100, 1 << 14);
  const cross = d.bool();
  // A loop back to its first vertex (a touch), or a figure eight (a crossing).
  const chain: P[] = cross
    ? [{ x: 0, y: 0 }, { x: 2 * s, y: 2 * s }, { x: 2 * s, y: 0 }, { x: 0, y: 2 * s }]
    : [{ x: 0, y: 0 }, { x: 2 * s, y: 0 }, { x: 2 * s, y: 2 * s }, { x: 0, y: 0 }, { x: -2 * s, y: d.int(-s, s) }];
  return makeInput('limit/degen-self-touching-chain', d.seed, place(d, { chains: { chain } }), { variant: cross ? 'crossing' : 'touching' }, [
    step('insertChain', { chain: 'chain', level: 1, cls: 'mandatory', role: 'way' }),
  ]);
}

function buildCollinearChain(d: Draw): ConstructiveInput {
  const p = primitiveDir(d, 64);
  const a = d.int(0, 100);
  const b = a + d.int(2, 2000);
  const c = d.int(a + 1, b - 1);
  return makeInput('limit/degen-collinear-chain', d.seed, place(d, { chains: { chain: [a, b, c].map((k) => ({ x: k * p.x, y: k * p.y })) } }), {}, [
    step('insertChain', { chain: 'chain', level: 1, cls: 'optional', role: 'way' }),
  ]);
}

function buildDecimate(d: Draw): ConstructiveInput {
  const L = d.log(200, 1 << 14);
  const near = d.int(1, MIN_EDGE - 1);
  const chain = [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: L + near, y: 0 }, { x: L + near + d.log(200, 1 << 14), y: d.int(-500, 500) }];
  return makeInput('limit/degen-decimate', d.seed, place(d, { chains: { chain }, points: { dropped: chain[2] } }), { nearCm: near }, [step('insertChain', { chain: 'chain', level: 1, cls: 'mandatory', role: 'way' })]);
}

function buildZeroAreaFace(d: Draw): ConstructiveInput {
  const L = d.log(200, 1 << 16);
  const m = d.int(1, L - 1);
  return makeInput('limit/degen-zero-area-face', d.seed, place(d, { rings: { ring: [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: m, y: 0 }] } }), {}, [
    step('insertChain', { ring: 'ring', level: 1, cls: 'mandatory', role: 'district_bound' }),
  ]);
}

/**
 * The pinched face (C-0187 (5)): a face and a cut from a point on the side leaving its corner v to a point on the side
 * arriving at it, each within minEdge of v, through the face's interior. §3.6's contact rule (1) lands both ends on v
 * (each foot lies within attractCm of that edge's endpoint), so the cut would close a lobe at v and leave the face's
 * remainder pinched there; rule (2) refuses a cut "whose two endpoints land on one vertex" — `splitFace` never lets
 * attraction bend a cut into a pinch — so the batch returns E_NOT_TWO_CROSSINGS and commits nothing.
 */
function buildPinchedFace(d: Draw): ConstructiveInput {
  const w = d.log(400, 1 << 18);
  const h = d.log(400, 1 << 18);
  const a = d.int(1, MIN_EDGE);
  const b = d.int(1, MIN_EDGE);
  const m = { x: d.int(100, w - 100), y: d.int(100, h - 100) };
  const placed = place(d, { rings: { face: rect(0, 0, w, h) }, chains: { cut: [{ x: a, y: 0 }, m, { x: 0, y: b }] }, points: { vertex: { x: 0, y: 0 } } });
  return makeInput('limit/degen-pinched-face', d.seed, placed, { endsCm: [a, b] }, [faceIn(), step('splitFace', { face: 'face', cut: 'cut' })]);
}

function witnessPinched(input: ConstructiveInput): string | null {
  const f = input.rings.face;
  const v = input.points.vertex;
  const i = f.findIndex((p) => p.x === v.x && p.y === v.y);
  if (i < 0) return 'the corner is not a vertex of the face';
  const next = f[(i + 1) % f.length];
  const prev = f[(i + f.length - 1) % f.length];
  const cut = input.chains.cut;
  const [e1, e2] = [cut[0], cut[cut.length - 1]];
  // Each end on one of the corner's two sides (a reflection of the placement swaps which), within minEdge of the corner.
  const near = (e: P, other: P) => refCross(v, other, e) === 0n && footInside(e, v, other) && d2(e, v) <= MIN_EDGE * MIN_EDGE;
  if (!((near(e1, next) && near(e2, prev)) || (near(e1, prev) && near(e2, next)))) return 'a cut end is not on a side at the corner within minEdge of it';
  for (const p of cut.slice(1, -1)) for (let k = 0; k < f.length; k += 1) if (refCross(f[k], f[(k + 1) % f.length], p) <= 0n) return "the cut's interior vertex is not inside the face";
  return null;
}

function buildSkeletonHoleTouch(d: Draw): ConstructiveInput {
  const W = d.log(2000, 1 << 18);
  const H = d.log(2000, 1 << 18);
  const outer = rect(0, 0, W, H);
  const toOuter = d.bool();
  const holes: Record<string, P[]> = {};
  if (toOuter) {
    const x = d.int(400, W - 400);
    holes.hole0 = cw([{ x, y: 0 }, { x: x + 200, y: 300 }, { x: x - 200, y: 300 }]);
  } else {
    const cx = Math.floor(W / 2);
    const cy = Math.floor(H / 2);
    holes.hole0 = cw([{ x: cx, y: cy }, { x: cx - 300, y: cy - 200 }, { x: cx - 300, y: cy + 200 }].reverse());
    holes.hole1 = cw([{ x: cx, y: cy }, { x: cx + 300, y: cy + 200 }, { x: cx + 300, y: cy - 200 }].reverse());
  }
  const fixed: Record<string, P[]> = {};
  for (const [k, r] of Object.entries(holes)) fixed[k] = refArea2(r) > 0n ? cw(r) : r;
  return makeInput('limit/degen-skeleton-hole-touch', d.seed, place(d, { rings: { outer, ...fixed } }), { variant: toOuter ? 'hole-on-outer' : 'holes-touching' }, [
    step('skeleton', { rings: ['outer', ...Object.keys(fixed)].join(','), use: 'roof' }),
  ]);
}

function buildSharpCorner(d: Draw): ConstructiveInput {
  const L = d.log(1000, 1 << 18);
  const h = Math.max(1, Math.floor((L * d.int(1, 80)) / 1000)); // tan θ ≤ 0.08: θ < 4.6° < 5°
  return makeInput('limit/degen-skeleton-sharp-corner', d.seed, place(d, { rings: { outer: [{ x: 0, y: 0 }, { x: L, y: 0 }, { x: L, y: h }] } }), { tanTimes1000: Math.round((1000 * h) / L) }, [
    step('skeleton', { rings: 'outer', use: d.pick(['roof', 'spine']) }),
  ]);
}

function buildHexAssert(d: Draw): ConstructiveInput {
  const smallSpacing = d.bool();
  const spacing = smallSpacing ? d.int(1, MIN_EDGE - 1) : d.int(MIN_EDGE, 2000);
  const jitter = smallSpacing ? d.int(0, Math.max(0, Math.floor(spacing / 2) - 1)) : d.int(Math.ceil(spacing / 2), spacing * 2);
  return makeInput('limit/degen-hexlattice-assert', d.seed, place(d, { rings: { region: face(d) } }), { spacingCm: spacing, jitterCm: jitter }, [
    step('hexLattice', { region: 'region', spacingCm: 'spacingCm', jitterCm: 'jitterCm' }),
  ]);
}

// ── missing, empty or contradictory data ──

function buildRefNoGeometry(d: Draw): ConstructiveInput {
  const L = d.log(200, 1 << 16);
  return makeInput('limit/data-ref-no-geometry', d.seed, place(d, { chains: { way: [{ x: 0, y: 0 }, { x: L, y: d.int(-500, 500) }] } }), {}, [
    step('insertChain', { chain: 'way', level: 1, cls: 'mandatory', role: 'way', owner: 'E' }),
    step('removeEdges', { chain: 'way' }),
    step('resolve', { chainOf: 'E', stored: true }),
  ]);
}

function buildStretchRefParts(d: Draw): ConstructiveInput {
  const L = d.log(400, 1 << 16);
  const gap = d.log(400, 1 << 16);
  const placed = place(d, {
    chains: { part1: [{ x: 0, y: 0 }, { x: L, y: 0 }], part2: [{ x: L + gap, y: 0 }, { x: 2 * L + gap, y: 0 }] },
    points: { from: { x: Math.floor(L / 2), y: 0 }, to: { x: L + gap + Math.floor(L / 2), y: 0 } },
  });
  return makeInput('limit/data-stretchref-parts', d.seed, placed, {}, [
    step('insertChain', { chain: 'part1', level: 1, cls: 'mandatory', role: 'way', owner: 'E' }),
    step('insertChain', { chain: 'part2', level: 1, cls: 'mandatory', role: 'way', owner: 'E' }),
    step('removeEdges', { stretchOf: 'E', from: 'from', to: 'to' }),
  ]);
}

function buildStaleSlot(d: Draw): ConstructiveInput {
  const foreign = d.bool();
  const L = d.log(200, 1 << 16);
  return makeInput('limit/data-stale-slot', d.seed, place(d, { chains: { a: [{ x: 0, y: 0 }, { x: L, y: 0 }], b: [{ x: 0, y: 1000 }, { x: L, y: 1000 }] } }), { variant: foreign ? 'foreign-arena' : 'stale-version' }, [
    step('insertChain', { chain: 'a', level: 1, cls: 'mandatory', role: 'way' }),
    step('resolve', { chain: 'a', keep: 'slots' }),
    step('insertChain', { chain: 'b', level: 1, cls: 'mandatory', role: 'way', arena: foreign ? 'other' : 'same' }),
    step('readSlots', { slots: 'slots', arena: foreign ? 'other' : 'same' }),
  ]);
}

function buildCorruptChunk(d: Draw): ConstructiveInput {
  const L = d.log(400, 1 << 16);
  const corrupt = d.pick(['flip-byte', 'truncate', 'dangling-reference'] as const);
  return makeInput('limit/data-corrupt-chunk', d.seed, place(d, { rings: { outer: rect(-L, -L, 2 * L, 2 * L) }, chains: { way: [{ x: -L, y: 0 }, { x: L, y: 0 }], kerb: [{ x: 0, y: -L }, { x: 0, y: L }] } }), { corrupt, at: d.int(0, 1_000_000) / 1_000_000 }, [
    step('insertChain', { ring: 'outer', level: 0, cls: 'mandatory', role: 'margin' }),
    step('insertChain', { chain: 'way', level: 1, cls: 'mandatory', role: 'way' }),
    step('insertChain', { chain: 'kerb', level: 2, cls: 'mandatory', role: 'kerb' }),
    step('encodeArena', {}),
    step('corruptChunk', { how: corrupt, at: 'at' }),
    step('decodeArena', {}),
  ]);
}

// ── every rung; save, load, regenerate ──

function buildEveryRung(d: Draw): ConstructiveInput {
  // A face at an extent from a hamlet's 10 m to the METROPOLIS cap's arena, cut across: the same code at every size.
  const hx = d.log(500, CAP_HALF_X - 1);
  const hy = Math.min(d.log(500, CAP_HALF_X - 1), CAP_HALF_Y - 1);
  const f = rect(-hx, -hy, 2 * hx, 2 * hy);
  const cut = [{ x: d.int(-hx + 60, hx - 60), y: -hy }, { x: d.int(-hx + 60, hx - 60), y: hy }];
  return makeInput('limit/every-rung', d.seed, place(d, { rings: { face: f }, chains: { cut } }, { fixed: true }), { halfExtentXcm: hx, halfExtentYcm: hy }, [
    faceIn(),
    step('splitFace', { face: 'face', cut: 'cut' }),
  ]);
}

function buildArenaScenario(id: string, d: Draw, last: ReturnType<typeof step>[]): ConstructiveInput {
  const L = d.log(2000, 1 << 18);
  const placed = place(d, {
    rings: { outer: rect(-L, -L, 2 * L, 2 * L), water: rect(-L, -Math.floor(L / 4), 2 * L, Math.floor(L / 8)) },
    chains: { way: [{ x: -L, y: Math.floor(L / 2) }, { x: L, y: Math.floor(L / 2) + d.int(-200, 200) }], lane: [{ x: d.int(-L + 300, L - 300), y: Math.floor(L / 2) }, { x: d.int(-L + 300, L - 300), y: L }] },
  });
  return makeInput(id, d.seed, placed, {}, [
    step('insertChain', { ring: 'outer', level: 0, cls: 'mandatory', role: 'margin' }),
    step('insertChain', { ring: 'water', level: 0, cls: 'mandatory', role: 'shore' }),
    step('insertChain', { chain: 'way', level: 1, cls: 'mandatory', role: 'way' }),
    step('insertChain', { chain: 'lane', level: 2, cls: 'mandatory', role: 'kerb' }),
    ...last,
  ]);
}

const STATIC: ConstructiveExpect['holds'] = ['kernel-reads-no-model'];

const d2 = (a: P, b: P) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

/** Every pair of points closer than minEdge: snapping and decimation leave one point. */
function witnessTiny(input: ConstructiveInput): string | null {
  const c = input.chains.chain;
  for (const p of c) for (const q of c) if (d2(p, q) >= MIN_EDGE * MIN_EDGE) return 'two points of the chain stand minEdge apart';
  return c.length >= 2 ? null : 'the chain has fewer than two points';
}

/** Fewer than three distinct points. */
function witnessFew(input: ConstructiveInput): string | null {
  return new Set(input.rings.ring.map((p) => `${String(p.x)},${String(p.y)}`)).size < 3 ? null : 'three distinct points';
}

export const LIMIT_CASES: readonly ConstructiveCase[] = Object.freeze([
  // no input — ok, or tier 1
  m0Case({
    id: 'limit/no-input-query',
    class: 'kernel-limits',
    source: NO_INPUT,
    ops: ['query'],
    expect: { outcome: 'ok', holds: ['empty-result'], clause: 'a query whose box meets nothing … returns an empty value' },
    build: buildNoInputQuery,
  }),
  m0Case({
    id: 'limit/no-input-hexlattice',
    class: 'kernel-limits',
    source: NO_INPUT,
    ops: ['hexLattice'],
    expect: { outcome: 'ok', holds: ['empty-result'], clause: '`hexLattice` of an empty region … returns an empty value' },
    build: (d) => makeInput('limit/no-input-hexlattice', d.seed, {}, { spacingCm: d.int(MIN_EDGE, 2000), jitterCm: 0 }, [step('hexLattice', { region: '', spacingCm: 'spacingCm', jitterCm: 'jitterCm' })]),
  }),
  m0Case({
    id: 'limit/no-input-tilerings',
    class: 'kernel-limits',
    source: NO_INPUT,
    ops: ['tileRings'],
    expect: { outcome: 'ok', holds: ['empty-result'], clause: '`tileRings` of no rings … returns an empty value' },
    build: (d) => makeInput('limit/no-input-tilerings', d.seed, {}, {}, [step('tileRings', { rings: '' })]),
  }),
  deferredLimit('limit/no-input-poisson', 'M1', NO_INPUT, ['poisson'], { outcome: 'ok', holds: ['empty-result'], clause: 'the Poisson sampler on an empty domain returns an empty value (the sampler is M1’s, §8.10)' }),
  m0Case({
    id: 'limit/no-input-delaunay',
    class: 'kernel-limits',
    source: NO_INPUT,
    ops: ['delaunay'],
    sweep: 3,
    expect: { outcome: 'ok', holds: ['empty-result'], clause: 'a Delaunay of fewer than three distinct, or of collinear, sites returns no triangle' },
    build: buildDelaunay,
  }),
  m0Case({
    id: 'limit/no-input-booleans-empty',
    class: 'kernel-limits',
    source: NO_INPUT,
    ops: ['booleans'],
    expect: ref('refused', 'E_DEGENERATE', 'empty', '`booleans` … whose result is empty return E_DEGENERATE (empty)'),
    build: buildBooleansEmpty,
  }),
  m0Case({
    id: 'limit/no-input-buffer-empty',
    class: 'kernel-limits',
    source: NO_INPUT,
    ops: ['buffer'],
    expect: ref('refused', 'E_DEGENERATE', 'empty', '`buffer` … whose result is empty return E_DEGENERATE (empty)'),
    build: buildBufferEmpty,
  }),
  m0Case({
    id: 'limit/no-input-offsetface-empty',
    class: 'kernel-limits',
    source: NO_INPUT,
    ops: ['offsetFace'],
    expect: ref('refused', 'E_DEGENERATE', 'empty', '`offsetFace` … whose result is empty return E_DEGENERATE (empty)'),
    build: buildOffsetEmpty,
  }),
  m0Case({
    id: 'limit/no-input-insetring-empty',
    class: 'kernel-limits',
    source: NO_INPUT,
    ops: ['insetRing'],
    expect: ref('refused', 'E_DEGENERATE', 'empty', '`insetRing` whose result is empty return E_DEGENERATE (empty)'),
    build: buildInsetEmpty,
  }),
  deferredLimit('limit/no-input-transient-arena', 'M6-P', NO_INPUT, ['transientArena'], ref('refused', 'E_DEGENERATE', 'seed', '`transientArena` with no seed ring, E_DEGENERATE (seed)')),
  m0Case({
    id: 'limit/no-input-empty-tx',
    class: 'kernel-limits',
    source: NO_INPUT,
    ops: ['tx'],
    expect: { outcome: 'ok', holds: ['version-kept'], clause: "a transaction with no op commits nothing and keeps its arena's version (§3.3)" },
    build: (d) => faceOnly('limit/no-input-empty-tx', d, {}, [step('tx', { ops: '' })]),
  }),
  m0Case({
    id: 'limit/no-input-sampleprofile',
    class: 'kernel-limits',
    source: NO_INPUT,
    ops: ['sampleProfile'],
    expect: { outcome: 'ok', holds: ['empty-result'], clause: '`sampleProfile` of a chain that resolves to no edge returns an empty list' },
    build: buildSampleProfileEmpty,
  }),
  // one item — ok, or tier 1
  m0Case({
    id: 'limit/one-item-chain-optional',
    class: 'kernel-limits',
    source: ONE_ITEM,
    ops: ['insertChain'],
    ladder: { failureClass: 'F-NUM', kind: 'zero-length' },
    expect: ref('refused', 'E_BELOW_MIN_EDGE', undefined, 'a chain with fewer than two distinct points after snapping and decimation: E_BELOW_MIN_EDGE if optional (§3.6 step 1)'),
    build: buildOneItemChain('limit/one-item-chain-optional', 'optional'),
    witness: witnessTiny,
  }),
  m0Case({
    id: 'limit/one-item-chain-mandatory',
    class: 'kernel-limits',
    source: ONE_ITEM,
    ops: ['insertChain'],
    expect: ref('refused', 'E_DEGENERATE', 'empty', 'a chain with fewer than two distinct points after snapping and decimation: E_DEGENERATE (empty) if mandatory (§3.6 step 1)'),
    build: buildOneItemChain('limit/one-item-chain-mandatory', 'mandatory'),
    witness: witnessTiny,
  }),
  ...(['obb', 'hull', 'lir'] as const).map((op) =>
    m0Case({
      id: `limit/one-item-${op}`,
      class: 'kernel-limits',
      source: ONE_ITEM,
      ops: [op],
      expect: ref('refused', 'E_DEGENERATE', 'collinear', `\`${op}\` of fewer than 3 distinct points: collinear`),
      build: buildFewPoints(`limit/one-item-${op}`, op),
      witness: witnessFew,
    }),
  ),
  m0Case({
    id: 'limit/one-item-regularfit',
    class: 'kernel-limits',
    source: ONE_ITEM,
    ops: ['regularFit'],
    expect: ref('refused', 'E_DEGENERATE', 'fit', '`regularFit` of fewer than 3 vertices: fit'),
    build: buildFewPoints('limit/one-item-regularfit', 'regularFit'),
    witness: witnessFew,
  }),
  m0Case({
    id: 'limit/one-item-cut',
    class: 'kernel-limits',
    source: ONE_ITEM,
    ops: ['splitFace'],
    expect: ref('refused', 'E_NOT_TWO_CROSSINGS', undefined, 'a cut of one point: E_NOT_TWO_CROSSINGS (§3.6)'),
    build: (d) => {
      const f = face(d);
      return makeInput('limit/one-item-cut', d.seed, place(d, { rings: { face: f }, chains: { cut: [{ x: d.int(1, f[2].x - 1), y: d.int(1, f[2].y - 1) }] } }), {}, [faceIn(), step('splitFace', { face: 'face', cut: 'cut' })]);
    },
  }),
  m0Case({
    id: 'limit/one-item-profile-knot',
    class: 'kernel-limits',
    source: ONE_ITEM,
    ops: ['sampleProfile'],
    expect: { outcome: 'ok', holds: ['value-everywhere'], clause: "a ring's profile with one knot: that value everywhere (§2.2 rule 5)" },
    build: buildOneKnot,
  }),
  m0Case({
    id: 'limit/one-item-kerb-no-spine',
    class: 'kernel-limits',
    source: ONE_ITEM,
    ops: ['kerb'],
    expect: { outcome: 'ok', holds: ['kerb-equals-face'], clause: 'a face with no bounding spine: kerb(F) = F, one built block (§3.7)' },
    build: (d) => makeInput('limit/one-item-kerb-no-spine', d.seed, place(d, { rings: { face: face(d) } }), {}, [faceIn('face', 'district_bound'), step('kerb', { face: 'face' })]),
  }),
  // the caps — tier 1, or a reported warning
  m0Case({
    id: 'limit/cap-tx-work-limit',
    class: 'kernel-limits',
    source: CAPS,
    ops: ['insertChain', 'tx'],
    expect: ref('refused', 'E_WORK_LIMIT', undefined, "each transaction's workLimit (E_WORK_LIMIT, §3.3)"),
    build: buildWorkLimit,
  }),
  m0Case({
    id: 'limit/cap-skeleton-events',
    class: 'kernel-limits',
    source: CAPS,
    ops: ['skeleton'],
    expect: { outcome: 'ok', holds: ['work-within-limit', 'skeleton-valid-or-downgrade'], clause: "the skeleton's event limit (E_WORK_LIMIT, §3.8): 4 · (n + r) + 64 events, then the reader's downgrade" },
    build: buildComb,
  }),
  m0Case({
    id: 'limit/cap-snap-passes',
    class: 'kernel-limits',
    source: CAPS,
    ops: ['insertChain'],
    expect: { outcome: 'ok', holds: ['planar', 'hard-invariants'], clause: '≤ 3 snap-rounding passes, an unconverged result committing planar with W_SNAP_PASSES' },
    build: buildSnapPasses,
  }),
  m0Case({
    id: 'limit/cap-move-halvings',
    class: 'kernel-limits',
    source: CAPS,
    ops: ['warp'],
    expect: { outcome: 'ok', holds: ['step-halved', 'hard-invariants'], clause: '≤ 8 halvings of a move step, then a reported no-op (§3.6)' },
    build: buildHalvings,
    witness: (input) => {
      const [q, p] = input.chains.chain;
      const drag = (input.params.dragX as number) ** 2 + (input.params.dragY as number) ** 2;
      return d2(q, p) === MIN_EDGE * MIN_EDGE && drag >= 512 * 512 ? null : 'the edge is not exactly minEdge or the drag is below 2⁹ cm';
    },
  }),
  m0Case({
    id: 'limit/cap-held-closure',
    class: 'kernel-limits',
    source: CAPS,
    ops: ['warp'],
    expect: { outcome: 'ok', holds: ['held-unmoved', 'hard-invariants'], clause: "the held set's closure within four rounds (§3.6)" },
    build: buildHeldClosure,
  }),
  m0Case({
    id: 'limit/cap-placement-search',
    class: 'kernel-limits',
    source: CAPS,
    ops: ['insertChain'],
    expect: { outcome: 'ok', holds: ['no-short-edge', 'hard-invariants'], clause: 'the placement search within attractCm (§3.6)' },
    build: buildPlacementSearch,
  }),
  m0Case({
    id: 'limit/cap-rebuild-threshold',
    class: 'kernel-limits',
    source: CAPS,
    ops: ['insertChain', 'query'],
    expect: { outcome: 'ok', holds: ['rebuild-at-threshold', 'query-equals-rebuild'], clause: 'the rebuild threshold (§3.3): a partition rebuilt when its grid overflow exceeds max(256, ¼ of its static size)' },
    build: buildRebuildThreshold,
  }),
  m0Case({
    id: 'limit/cap-largest-arena',
    class: 'kernel-limits',
    source: CAPS,
    ops: ['insertChain'],
    expect: { outcome: 'ok', holds: ['in-range', 'hard-invariants'], clause: 'the largest arena, METROPOLIS at the cap (§3.2 (1))' },
    build: buildLargestArena,
  }),
  deferredLimit('limit/cap-frame-no-growth', 'M4', CAPS, ['frameGrowth'], { outcome: 'ok', holds: ['in-range'], clause: 'the largest arena … whose frame grows no further (§3.2 (9); frame growth is M4’s)' }),
  // degenerate geometry — tier 1; tier 4 for a skeleton reader
  m0Case({
    id: 'limit/degen-coincident-points',
    class: 'kernel-limits',
    source: DEGENERATE,
    ops: ['insertChain'],
    ladder: { failureClass: 'F-NUM', kind: 'coincident' },
    expect: { outcome: 'ok', holds: ['one-vertex', 'hard-invariants'], clause: 'coincident points are one vertex (attraction)' },
    build: buildCoincidentPoints,
  }),
  m0Case({
    id: 'limit/degen-self-touching-chain',
    class: 'kernel-limits',
    source: DEGENERATE,
    ops: ['insertChain'],
    ladder: { failureClass: 'F-NUM', kind: 'self-touching' },
    expect: { outcome: 'ok', holds: ['simple-runs', 'hard-invariants'], clause: 'a self-touching or self-crossing chain is split into simple runs' },
    build: buildSelfTouchingChain,
  }),
  m0Case({
    id: 'limit/degen-collinear-chain',
    class: 'kernel-limits',
    source: DEGENERATE,
    ops: ['insertChain'],
    ladder: { failureClass: 'F-NUM', kind: 'collinear' },
    expect: {
      outcome: 'typed',
      codes: ['E_BELOW_MIN_EDGE', 'E_DEGENERATE'],
      holds: ['simple-runs', 'hard-invariants'],
      clause: 'an optional chain folding back along itself (collinear) — split into simple runs, or refused with its typed code, never a throw (F-NUM’s kernel side)',
    },
    build: buildCollinearChain,
  }),
  m0Case({
    id: 'limit/degen-decimate',
    class: 'kernel-limits',
    source: DEGENERATE,
    ops: ['insertChain'],
    expect: { outcome: 'ok', holds: ['decimated', 'no-short-edge'], clause: 'a point within minEdge of its predecessor is decimated' },
    build: buildDecimate,
    witness: (input) => {
      const [, b, c] = input.chains.chain;
      const g = d2(b, c);
      return g >= 1 && g < MIN_EDGE * MIN_EDGE && d2(c, input.points.dropped) === 0 ? null : 'the dropped point is not within minEdge of its predecessor';
    },
  }),
  m0Case({
    id: 'limit/degen-zero-area-face',
    class: 'kernel-limits',
    source: DEGENERATE,
    ops: ['insertChain'],
    ladder: { failureClass: 'F-NUM', kind: 'zero-area' },
    expect: {
      outcome: 'typed',
      codes: ['E_INVARIANT', 'E_DEGENERATE', 'E_BELOW_MIN_EDGE', 'E_SELF_INTERSECT'],
      holds: ['hard-invariants'],
      clause: "a zero-area or pinched face never commits: a batch whose result would break a §3.10 row returns that row's code or E_INVARIANT and commits nothing",
    },
    build: buildZeroAreaFace,
  }),
  m0Case({
    id: 'limit/degen-pinched-face',
    class: 'kernel-limits',
    source: DEGENERATE,
    ops: ['splitFace'],
    expect: {
      outcome: 'refused',
      code: 'E_NOT_TWO_CROSSINGS',
      tier: 1,
      holds: ['version-kept'],
      clause:
        "a zero-area or pinched face never commits: a batch whose result would break a §3.10 row returns that row's code or E_INVARIANT and commits nothing — a cut whose two ends land on one boundary vertex would leave the face pinched there, refused E_NOT_TWO_CROSSINGS by §3.6's contact rule (2)",
    },
    build: buildPinchedFace,
    witness: witnessPinched,
  }),
  m0Case({
    id: 'limit/degen-skeleton-hole-touch',
    class: 'kernel-limits',
    source: DEGENERATE,
    ops: ['skeleton'],
    expect: { outcome: 'downgrade', tier: 4, holds: ['skeleton-valid-or-downgrade'], clause: "a skeleton input with a hole touching the outer ring or another hole … takes its reader's downgrade (§3.8)" },
    build: buildSkeletonHoleTouch,
  }),
  m0Case({
    id: 'limit/degen-skeleton-sharp-corner',
    class: 'kernel-limits',
    source: DEGENERATE,
    ops: ['skeleton'],
    expect: { outcome: 'downgrade', tier: 4, holds: ['skeleton-valid-or-downgrade'], clause: "a skeleton input with … a corner sharper than 5°, takes its reader's downgrade (§3.8)" },
    build: buildSharpCorner,
    witness: (input) => {
      // tan of the angle at the first vertex: |(b − a) × (c − a)| / (b − a) · (c − a), below tan 5° ≈ 0.0875.
      const [a, b, c] = input.rings.outer;
      const cr = Number(refCross(a, b, c));
      const dot = (b.x - a.x) * (c.x - a.x) + (b.y - a.y) * (c.y - a.y);
      return cr > 0 && dot > 0 && cr < 0.0874 * dot ? null : 'the corner is not sharper than 5°';
    },
  }),
  m0Case({
    id: 'limit/degen-hexlattice-assert',
    class: 'kernel-limits',
    source: DEGENERATE,
    ops: ['hexLattice'],
    expect: { outcome: 'assertion', holds: [], clause: "`hexLattice`'s spacing below minEdge or jitter at or above half the spacing is an assertion (§3.4)" },
    build: buildHexAssert,
    witness: (input) => {
      const s = input.params.spacingCm as number;
      const j = input.params.jitterCm as number;
      return s < MIN_EDGE || 2 * j >= s ? null : 'neither the spacing nor the jitter breaks the contract';
    },
  }),
  // missing, empty or contradictory data — tier 1; replay for a corrupt cache
  m0Case({
    id: 'limit/data-no-dossier',
    class: 'kernel-limits',
    source: MISSING,
    ops: [],
    expect: { outcome: 'static', holds: STATIC, clause: 'the kernel reads no dossier field' },
    build: (d) => makeInput('limit/data-no-dossier', d.seed, {}),
  }),
  m0Case({
    id: 'limit/data-ref-no-geometry',
    class: 'kernel-limits',
    source: MISSING,
    ops: ['resolve'],
    expect: { outcome: 'ok', holds: ['resolves-empty'], clause: "a ref that finds no geometry resolves empty, and a stored one fails §3.10's stored-references row (E_INVARIANT; F-REDERIVE after an edit)" },
    build: buildRefNoGeometry,
  }),
  m0Case({
    id: 'limit/data-stretchref-parts',
    class: 'kernel-limits',
    source: MISSING,
    ops: ['removeEdges'],
    expect: ref('refused', 'E_DEGENERATE', 'stretch', 'a StretchRef whose ends are not on one part of its chain: stretch'),
    build: buildStretchRefParts,
  }),
  m0Case({
    id: 'limit/data-stale-slot',
    class: 'kernel-limits',
    source: MISSING,
    ops: ['resolve'],
    expect: { outcome: 'assertion', holds: [], clause: 'a stale or foreign slot: a debug-build assertion, never a silent read (§3.4)' },
    build: buildStaleSlot,
  }),
  deferredLimit('limit/data-clear-region-level', 'M3a', MISSING, ['tx'], ref('refused', 'E_LEVEL', undefined, 'a clear-region batch meeting finer geometry away from its prepared contacts: E_LEVEL')),
  m0Case({
    id: 'limit/data-corrupt-chunk',
    class: 'kernel-limits',
    source: MISSING,
    ops: ['encodeArena', 'decodeArena'],
    expect: { outcome: 'refused', holds: ['corrupt-cache'], clause: 'a snapshot chunk that fails to decode, or a lattice-point reference with no vertex: a corrupt cache, loaded by replay (§3.9; the replay is M1’s, M0 returns the typed failure)' },
    build: buildCorruptChunk,
  }),
  // every rung, every toggle and preset — no tier
  m0Case({
    id: 'limit/every-rung',
    class: 'kernel-limits',
    source: RUNG,
    ops: ['insertChain', 'splitFace'],
    expect: {
      outcome: 'ok',
      holds: ['same-code-every-rung', 'in-range', 'children-tile-parent'],
      clause: 'one kernel with no rung-specific number: the lattice constants fixed, the range invariant at the largest frame, the bands, the skeleton and the booleans the same code at every size',
    },
    build: buildEveryRung,
  }),
  m0Case({
    id: 'limit/every-toggle-preset',
    class: 'kernel-limits',
    source: TOGGLE,
    ops: [],
    expect: { outcome: 'static', holds: STATIC, clause: 'the kernel reads no toggle, preset or style: each arena runs the same code with the same constants, on every host' },
    build: (d) => makeInput('limit/every-toggle-preset', d.seed, {}),
  }),
  // save, load, undo, redo, regenerate, migrate
  m0Case({
    id: 'limit/save-load-round-trip',
    class: 'kernel-limits',
    source: PERSIST,
    ops: ['encodeArena', 'decodeArena'],
    expect: { outcome: 'ok', holds: ['round-trip'], clause: 'only the arenas persist (§3.9): save → load → save byte-identical' },
    build: (d) => buildArenaScenario('limit/save-load-round-trip', d, [step('encodeArena', {}), step('decodeArena', {}), step('encodeArena', { compare: 'first' })]),
  }),
  deferredLimit('limit/undo-redo', 'M2a', PERSIST, ['tx'], { outcome: 'ok', holds: ['same-arena'], clause: "undo and redo re-run the log's events through the same transactions, the undo record restoring promotions, demotions and flags (§3.3, §7.4; the edit log is M2a's)" }),
  m0Case({
    id: 'limit/regenerate-same',
    class: 'kernel-limits',
    source: PERSIST,
    ops: ['insertChain', 'encodeArena'],
    expect: { outcome: 'ok', holds: ['same-arena'], clause: 'a regeneration from the same inputs yields the same arena (canonical order, §3.3; §6)' },
    build: (d) => buildArenaScenario('limit/regenerate-same', d, [step('encodeArena', {}), step('regenerate', { permuteDeclared: true }), step('encodeArena', { compare: 'first' })]),
  }),
  deferredLimit('limit/declared-shift', 'M1', PERSIST, ['tx'], { outcome: 'ok', holds: ['same-arena'], clause: 'a kernel code change that moves output is a declared shift (§6.4; the goldens are M1’s)' }),
  deferredLimit('limit/migrate', 'M1', PERSIST, ['decodeArena'], { outcome: 'ok', holds: ['round-trip'], clause: 'a document of another output version opens as §2.9 states (the .plat document is M1’s)' }),
]);
