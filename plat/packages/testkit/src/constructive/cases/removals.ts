// §13.1 (2) *removals, profiles and neighbour steps* (§2.2 rules 3, 5; §3.3; C-0045's ChainProfile reading and
// cutting): the lane removed from its spine, the S8 T-junction on a profiled spine, the split and re-join within
// 10⁻⁹ cm, the stretch removals, the refused two-part way and the promotion beside a finer vertex — M0's, run by
// M0-k-04 (C-0110). The neighbour steps are II.1 (3)'s, M5's (C-0038): their generators are stubs. A profile is data:
// `params.knots` are vertex indices of the chain that carry a knot row of `params.knotRole`, `params.knotValues` the
// knots' values in cm, read by linear interpolation (C-0045).
import { ATTRACT, deferredCase, m0Case, makeInput, place, step, type Draw, type P } from '../draw.js';
import { footInside, len2, lineDistCmp, lineDistIn, roundsToSelf, segFartherThan } from '../exact.js';
import { refCross } from '../numeric.js';
import type { ConstructiveCase, ConstructiveInput } from '../types.js';

const SOURCE = '§13.1 removals, profiles and neighbour steps';
const way = (chain: string, level = 1, extra: Record<string, string | number | boolean> = {}) =>
  step('insertChain', { chain, level, cls: 'mandatory', role: 'way', ...extra });

/**
 * A spine of n shape vertices, x strictly increasing and every coordinate even (so each edge holds a lattice point
 * strictly inside it), y within ±2 000 cm, and its knots' indices and half-widths.
 */
function profiledSpine(d: Draw, n: number): { spine: P[]; knots: number[]; values: number[] } {
  const spine: P[] = [];
  let x = 0;
  for (let i = 0; i < n; i += 1) {
    spine.push({ x, y: 2 * d.int(-1000, 1000) });
    x += 2 * d.log(200, 1 << 13);
  }
  const knots = [0, d.int(1, n - 2), n - 1];
  const values = knots.map(() => d.int(150, 1200) / 2);
  return { spine, knots, values };
}

/** The lattice point nearest the point at share t of the segment a–b. */
function between(a: P, b: P, t: number): P {
  return { x: Math.round(a.x + (b.x - a.x) * t), y: Math.round(a.y + (b.y - a.y) * t) };
}

/**
 * A lane ending at p, straight up (s = 1) or down (s = −1) from beyond the spine's ±2 000 cm band: the vertical through
 * p meets the x-monotone spine once, at p.
 */
function laneTo(d: Draw, p: P, s: number): P[] {
  return [{ x: p.x, y: p.y + s * (4200 + d.log(0, 1 << 14)) }, p];
}

function buildLaneFromSpine(d: Draw): ConstructiveInput {
  const { spine } = profiledSpine(d, d.int(3, 6));
  const i = d.int(0, spine.length - 2);
  const a = spine[i];
  const b = spine[i + 1];
  // The lane ends exactly on the spine's edge: a lattice point of it by gcd stepping.
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  let g = Math.abs(dx);
  let h = Math.abs(dy);
  while (h !== 0) [g, h] = [h, g % h];
  const k = d.int(1, g - 1); // g ≥ 2: every coordinate is even
  const end = { x: a.x + (k * dx) / g, y: a.y + (k * dy) / g };
  const placed = place(d, { chains: { spine, lane: laneTo(d, end, d.sign()) }, points: { end } });
  return makeInput('remove/lane-from-spine', d.seed, placed, {}, [way('spine'), way('lane'), step('removeEdges', { chain: 'lane' })]);
}

function buildTJunctionProfiled(d: Draw): ConstructiveInput {
  const { spine, knots, values } = profiledSpine(d, d.int(4, 7));
  const i = d.int(0, spine.length - 2);
  const end = between(spine[i], spine[i + 1], d.int(250, 750) / 1000);
  const placed = place(d, { chains: { spine, lane: laneTo(d, end, d.sign()) } });
  return makeInput('remove/tjunction-profiled-spine', d.seed, placed, { knots, knotValues: values, knotRole: 'width_knot', interpolation: 'linear', sampleStepCm: d.int(50, 500) }, [
    way('spine', 1, { profile: 'knots' }),
    step('sampleProfile', { chain: 'spine', atCm: 'sampleStepCm', record: 'before' }),
    way('lane'),
    step('sampleProfile', { chain: 'spine', atCm: 'sampleStepCm', record: 'after' }),
  ]);
}

function buildSplitRejoin(d: Draw): ConstructiveInput {
  const { spine, values } = profiledSpine(d, d.int(5, 8));
  const knots = [0, d.int(3, spine.length - 1)];
  const splitAt = d.int(1, knots[1] - 1); // a shape vertex strictly between the two knots
  const placed = place(d, { chains: { spine } });
  return makeInput('remove/split-rejoin-profile', d.seed, placed, { knots, knotValues: values.slice(0, 2), knotRole: 'width_knot', interpolation: 'linear', splitAt, sampleStepCm: d.int(50, 500) }, [
    way('spine', 1, { profile: 'knots' }),
    step('sampleProfile', { chain: 'spine', atCm: 'sampleStepCm', record: 'before' }),
    step('retypeEdges', { chain: 'spine', rekey: 'split', at: 'splitAt' }),
    step('sampleProfile', { chain: 'spine', atCm: 'sampleStepCm', record: 'split' }),
    step('retypeEdges', { chain: 'spine', rekey: 'join', at: 'splitAt' }),
    step('sampleProfile', { chain: 'spine', atCm: 'sampleStepCm', record: 'rejoined' }),
  ]);
}

function buildStretchWay(d: Draw): ConstructiveInput {
  const { spine, knots, values } = profiledSpine(d, d.int(5, 8));
  const i1 = d.int(1, spine.length - 3);
  const i2 = d.int(i1 + 1, spine.length - 2);
  const placed = place(d, { chains: { spine, laneA: laneTo(d, spine[i1], 1), laneB: laneTo(d, spine[i2], -1) }, points: { j1: spine[i1], j2: spine[i2] } });
  return makeInput('remove/stretch-way', d.seed, placed, { knots, knotValues: values, knotRole: 'width_knot', interpolation: 'linear', sampleStepCm: d.int(50, 500) }, [
    way('spine', 1, { profile: 'knots' }),
    way('laneA'),
    way('laneB'),
    step('sampleProfile', { chain: 'spine', atCm: 'sampleStepCm', record: 'before' }),
    step('retypeEdges', { chain: 'spine', rekey: 'farPart', from: 'j2' }),
    step('removeEdges', { stretchOf: 'spine', from: 'j1', to: 'j2' }),
    step('sampleProfile', { chain: 'spine', atCm: 'sampleStepCm', record: 'after' }),
  ]);
}

function buildStretchRing(d: Draw): ConstructiveInput {
  const n = d.int(5, 10);
  const R = d.log(2000, 1 << 18);
  // A convex ring on a lattice octagon-like outline: n points on the box boundary, counter-clockwise.
  const ring: P[] = [];
  for (let i = 0; i < n; i += 1) {
    const t = i / n;
    const side = Math.floor(t * 4);
    const f = t * 4 - side;
    const s = Math.round((2 * f - 1) * R * 0.9);
    ring.push([{ x: s, y: -R }, { x: R, y: s }, { x: -s, y: R }, { x: -R, y: -s }][side]);
  }
  const a0 = d.int(0, n - 1);
  const a1 = (a0 + d.int(2, n - 2)) % n;
  const knots = [a0, (a0 + 1) % n, a1];
  const placed = place(d, { rings: { ring }, points: { anchor0: ring[a0], anchor1: ring[a1] } });
  return makeInput('remove/stretch-ring', d.seed, placed, { knots, knotValues: knots.map(() => d.int(100, 600)), knotRole: 'base_knot', interpolation: 'linear', sampleStepCm: d.int(50, 500) }, [
    step('insertChain', { ring: 'ring', level: 1, cls: 'mandatory', role: 'wall', profile: 'knots', anchors: 'anchor0,anchor1' }),
    step('sampleProfile', { ring: 'ring', atCm: 'sampleStepCm', record: 'before' }),
    step('removeEdges', { stretchOf: 'ring', from: 'anchor0', to: 'anchor1' }),
    step('sampleProfile', { ring: 'ring', atCm: 'sampleStepCm', record: 'after' }),
  ]);
}

function buildTwoPartRefused(d: Draw): ConstructiveInput {
  const { spine } = profiledSpine(d, d.int(4, 7));
  const i1 = d.int(1, spine.length - 3);
  const i2 = d.int(i1 + 1, spine.length - 2);
  const placed = place(d, { chains: { spine }, points: { from: spine[i1], to: spine[i2] } });
  return makeInput('remove/two-part-way-refused', d.seed, placed, {}, [way('spine'), step('removeEdges', { stretchOf: 'spine', from: 'from', to: 'to' })]);
}

/**
 * §3.6's promotion beside a finer vertex (C-0187 (4)): an L0 frame, an L1 street R from its west side to its east side
 * along (4, 3) — so the street parts the frame into a north and a south face — two L3 plot lines from the north ending on
 * R at P, the lattice point 0.6 cm north of R's line, and Q, 0.6 cm south of it, 31.6 – 51.6 cm further along (each the
 * nearest lattice point to its own foot, so the placement rule lands each end there), and an L1 street from the south
 * face ending at P: candidate (b), P promoted to L1, R's route cut at P. The new route edge P–B passes ≈ 0.6 cm north of R
 * at Q, so Q, which no same-level change moves, stands 1.17 – 1.20 cm from it (§3.6: "up to ≈ 1.25 cm").
 */
function buildPromotionNearFiner(d: Draw): ConstructiveInput {
  const r = d.int(400, 4000);
  const Hs = d.log(500, 1 << 14);
  const Hn = d.log(500, 1 << 14);
  const mp = d.int(100, r - 200);
  const mq = mp + d.int(6, 10);
  const A = { x: 0, y: 0 };
  const B = { x: 4 * r, y: 3 * r };
  const P0 = { x: 4 * mp - 1, y: 3 * mp }; // 4y − 3x = 3: 0.6 cm north of R's line
  const Q = { x: 4 * mq + 1, y: 3 * mq }; // 4y − 3x = −3: 0.6 cm south
  const hp = d.int(20, 100);
  const hq = d.int(20, 100);
  const hc = d.int(20, 100);
  const placed = place(d, {
    rings: { frame: [{ x: 0, y: -Hs }, { x: 4 * r, y: -Hs }, B, { x: 4 * r, y: 3 * r + Hn }, { x: 0, y: 3 * r + Hn }, A] },
    chains: {
      route: [A, B],
      plotP: [{ x: P0.x - 3 * hp, y: P0.y + 4 * hp }, P0],
      plotQ: [{ x: Q.x - 3 * hq, y: Q.y + 4 * hq }, Q],
      street: [{ x: P0.x + 3 * hc, y: P0.y - 4 * hc }, P0],
    },
    points: { promoted: P0, vertex: Q, routeEnd: B },
  });
  return makeInput('remove/promotion-near-finer-vertex', d.seed, placed, {}, [
    step('insertChain', { ring: 'frame', level: 0, cls: 'mandatory', role: 'margin' }),
    way('route'),
    step('insertChain', { chain: 'plotP', level: 3, cls: 'mandatory', role: 'plot_line' }),
    step('insertChain', { chain: 'plotQ', level: 3, cls: 'mandatory', role: 'plot_line' }),
    way('street'),
    step('query', { around: 'vertex', levels: '1,3' }),
  ]);
}

function witnessPromotion(input: ConstructiveInput): string | null {
  const [a, b] = input.chains.route;
  const { promoted: p, vertex: q, routeEnd: e } = input.points;
  const same = (u: P, v: P) => u.x === v.x && u.y === v.y;
  if (!same(e, b)) return "the route's end is not the new route edge's end";
  const plotP = input.chains.plotP;
  const plotQ = input.chains.plotQ;
  const street = input.chains.street;
  if (!same(plotP[plotP.length - 1], p) || !same(plotQ[plotQ.length - 1], q) || !same(street[street.length - 1], p)) return 'the plot lines and the street do not end at the two finer vertices';
  for (const v of [p, q]) {
    if (!footInside(v, a, b) || lineDistCmp(v, a, b, 71, 100) >= 0 || !roundsToSelf(v, a, b)) return "a plot-line end is not the route's placement point";
    if (len2(v, a) <= BigInt(ATTRACT * ATTRACT) || len2(v, b) <= BigInt(ATTRACT * ATTRACT)) return "a plot-line end stands within attractCm of the route's end";
  }
  if (len2(p, q) <= BigInt(ATTRACT * ATTRACT)) return 'the two finer vertices stand within attractCm of each other';
  if (!segFartherThan(q, street[0], p, ATTRACT)) return 'the street passes within attractCm of the other finer vertex';
  // ≈ 1.2 cm from the new route edge P–B: 1.15 ≤ distance ≤ 1.25 (§3.6's bound), its foot inside the edge.
  return footInside(q, p, b) && lineDistIn(q, p, b, 115, 125, 100) ? null : 'the finer vertex does not stand 1.15–1.25 cm from the new route edge';
}

function deferredNeighbour(id: string, clause: string, holds: ConstructiveCase['expect']['holds']): ConstructiveCase {
  return deferredCase({ id, class: 'removals-profiles-neighbours', milestone: 'M5', source: SOURCE, ops: ['insertChain', 'removeEdges'], expect: { outcome: 'ok', holds, clause } });
}

export const REMOVAL_CASES: readonly ConstructiveCase[] = Object.freeze([
  m0Case({
    id: 'remove/lane-from-spine',
    class: 'removals-profiles-neighbours',
    source: SOURCE,
    ops: ['removeEdges'],
    expect: {
      outcome: 'ok',
      holds: ['chain-restored', 'hard-invariants'],
      clause: "a lane removed from a spine it ended on — the spine's chain restored exactly, its own shape vertices untouched (the split flag, §2.2 rule 3)",
    },
    build: buildLaneFromSpine,
    witness: (input) => {
      // The end lies on an edge of the spine strictly between its two vertices: the lane's end splits that edge.
      const s = input.chains.spine;
      const e = input.points.end;
      if (s.some((v) => v.x === e.x && v.y === e.y)) return "the lane's end is a shape vertex of the spine";
      for (let i = 0; i + 1 < s.length; i += 1) {
        const [a, b] = [s[i], s[i + 1]];
        const dot = (e.x - a.x) * (b.x - a.x) + (e.y - a.y) * (b.y - a.y);
        if (refCross(a, b, e) === 0n && dot > 0 && dot < (b.x - a.x) ** 2 + (b.y - a.y) ** 2) return null;
      }
      return "the lane's end is not inside an edge of the spine";
    },
  }),
  m0Case({
    id: 'remove/tjunction-profiled-spine',
    class: 'removals-profiles-neighbours',
    source: SOURCE,
    ops: ['insertChain', 'sampleProfile'],
    expect: { outcome: 'ok', holds: ['profile-unchanged', 'hard-invariants'], clause: 'an S8 T-junction on a spine with a width profile — every sampled half-width unchanged' },
    build: buildTJunctionProfiled,
  }),
  m0Case({
    id: 'remove/split-rejoin-profile',
    class: 'removals-profiles-neighbours',
    source: SOURCE,
    ops: ['retypeEdges', 'sampleProfile'],
    expect: {
      outcome: 'ok',
      holds: ['profile-within-1e-9', 'profile-bit-identical', 'hard-invariants'],
      clause: 'a way split between two width knots — every sampled half-width within 10⁻⁹ cm of its value before — then re-joined, giving the original profile bit for bit',
    },
    build: buildSplitRejoin,
  }),
  m0Case({
    id: 'remove/stretch-way',
    class: 'removals-profiles-neighbours',
    source: SOURCE,
    ops: ['retypeEdges', 'removeEdges', 'sampleProfile'],
    expect: {
      outcome: 'ok',
      holds: ['profile-within-1e-9', 'other-roles-unchanged', 'hard-invariants'],
      clause: 'a stretch of a way removed between two junctions — the rest of the chain unchanged, every remaining profile sample within 10⁻⁹ cm of its value before and every other role unchanged (its far part rekeyed first, §3.3 rule 2)',
    },
    build: buildStretchWay,
  }),
  m0Case({
    id: 'remove/stretch-ring',
    class: 'removals-profiles-neighbours',
    source: SOURCE,
    ops: ['removeEdges', 'sampleProfile'],
    expect: {
      outcome: 'ok',
      holds: ['profile-within-1e-9', 'other-roles-unchanged', 'hard-invariants'],
      clause: 'a stretch of a ring removed between two anchors — the rest of the chain unchanged, every remaining profile sample within 10⁻⁹ cm and every other role unchanged',
    },
    build: buildStretchRing,
    witness: (input) => (refCross(input.rings.ring[0], input.rings.ring[1], input.rings.ring[2]) >= 0n ? null : 'the ring turns clockwise'),
  }),
  m0Case({
    id: 'remove/two-part-way-refused',
    class: 'removals-profiles-neighbours',
    source: SOURCE,
    ops: ['removeEdges'],
    expect: {
      outcome: 'refused',
      code: 'E_INVARIANT',
      tier: 1,
      holds: ['version-kept'],
      clause: 'a removal that leaves a way in two parts without a rekey, refused by role consistency (§3.10; §3.11: that row’s code or E_INVARIANT)',
    },
    build: buildTwoPartRefused,
  }),
  m0Case({
    id: 'remove/promotion-near-finer-vertex',
    class: 'removals-profiles-neighbours',
    source: SOURCE,
    ops: ['insertChain', 'query'],
    expect: {
      outcome: 'ok',
      holds: ['query-returns-item', 'hard-invariants'],
      clause: 'a promotion that leaves another finer vertex 1.2 cm from its new route edge commits with no E_INVARIANT, and every index query whose box meets that vertex returns it',
    },
    build: buildPromotionNearFiner,
    witness: witnessPromotion,
  }),
  deferredNeighbour('neighbour/foot-near-promoted', "II.1 (3)'s neighbour step beside finished plots — a plot-line end within attractCm of the foot (promoted; every plot ring unchanged)", ['hard-invariants']),
  deferredNeighbour('neighbour/foot-far-kerb-split', 'II.1 (3)\'s neighbour step — a plot-line end farther than attractCm from the foot (a kerb split; each ring equal to its prior ring with the vertex removed)', ['hard-invariants']),
  deferredNeighbour(
    'neighbour/removed-by-undo-and-reroll',
    "the street removed again, by an undo and by a reroll, at a promoted plot-line end and at a promoted footprint corner: the kerb's L2 route, index and digest and the block's, the plot's and the wing rings equal to those before the step",
    ['hard-invariants'],
  ),
  deferredNeighbour('neighbour/two-steps-one-kerb', "two neighbour steps on one kerb edge, the first street removed by a reroll — its plot-line end back at L3 and the kerb's L2 route equal to the route with only the second step", ['hard-invariants']),
]);
