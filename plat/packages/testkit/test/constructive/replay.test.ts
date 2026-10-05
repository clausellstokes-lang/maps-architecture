// M0-k-02 fix round 1 (checks/M0-k-02.md F-1, F-2; C-0187 (7)): the insertion prefix of every case whose fixture rests on
// geometry insertion could erase — the warp-kerb, the Steiner pair, the crossing next to a standing vertex, the
// promotion beside a finer vertex, the pinched cut's face — replayed on M0-a-04 / 05's landed `insertChain`
// (`insertTx`, the conservative kept-content reading of C-0177 (4)), in the case's own levels, roles and order. Each
// replay checks that the geometry the fixture names survives to the fixture's own step: the vertex still standing where
// the draw put it, two vertices on the route, the split where the witness put it, the promotion made and the other
// finer vertex standing 1.15 – 1.25 cm from the new route edge — so an attraction that erases a fixture fails here, in
// this item's wave, never silently in M0-k-04's run. Every step that is an insertion runs (the crossing and the
// promotion are insertions themselves, so their own step runs too); warps and cuts are M0-k-04's (C-0110).
import { describe, expect, it } from 'vitest';
import {
  attachIndex,
  createPlat,
  insertChain,
  insertTx,
  isVertexLive,
  outgoing,
  type Cm,
  type Frame,
  type LatticePoint,
  type Level,
  type Plat,
  type VertexId,
} from '@plat/kernel';
import { casesAt, constructiveCase, type ConstructiveCase, type ConstructiveInput } from '@plat/testkit';

/** Draws per case: a tenth of the listed test's 10³ (each draw builds an arena and runs every insertion). */
const REPLAYS = 100;
/** Draws per case for the whole set's prefixes. */
const PREFIX_REPLAYS = 10;
const SIDE = 8_000_000;
const FRAME: Frame = { widthCm: 10_000_000 as Cm, heightCm: 10_000_000 as Cm, aspect: 1, marginShare: 0.3 };
const ATTRACT = 26;

interface Pt {
  x: number;
  y: number;
}

/** A lattice point from integers the test holds in range. */
const lpt = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });

/** A ground arena with the index attached and an L0 frame of ±8 000 000 cm (every recentred draw lies inside it). */
function arena(): Plat {
  const p = createPlat({ layer: 'ground', part: 0 }, FRAME);
  attachIndex(p, { gridCellCm: [800, 400, 200, 100, 50] });
  const ring = [
    { x: -SIDE, y: -SIDE },
    { x: SIDE, y: -SIDE },
    { x: SIDE, y: SIDE },
    { x: -SIDE, y: SIDE },
  ];
  const r = insertChain(insertTx(p, 0), ring, [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true });
  if (!r.ok) throw new Error(`replay: the frame was refused ${r.code}`);
  return p;
}

/** The draw translated so its bounding box is centred on the origin: a lattice isometry, every distance kept. */
function centred(g: ConstructiveInput): ConstructiveInput {
  const all: Pt[] = [...Object.values(g.points)];
  for (const rec of [g.pointSets, g.chains, g.rings]) for (const v of Object.values(rec)) all.push(...v);
  const xs = all.map((q) => q.x);
  const ys = all.map((q) => q.y);
  const dx = -Math.round((Math.min(...xs) + Math.max(...xs)) / 2);
  const dy = -Math.round((Math.min(...ys) + Math.max(...ys)) / 2);
  const m = (q: Pt) => lpt(q.x + dx, q.y + dy);
  const mr = (r: Readonly<Record<string, readonly Pt[]>>) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v.map(m)]));
  return {
    ...g,
    points: Object.fromEntries(Object.entries(g.points).map(([k, v]) => [k, m(v)])),
    pointSets: mr(g.pointSets),
    chains: mr(g.chains),
    rings: mr(g.rings),
  };
}

/** The live vertex at q, or −1. */
function vertexAt(p: Plat, q: Pt): VertexId {
  for (let v = 0; v < p.slots.vertex.top; v += 1) if (isVertexLive(p, v) && p.vertices.x[v] === q.x && p.vertices.y[v] === q.y) return v;
  return -1;
}

/** The points at the other ends of v's edges. */
function neighbours(p: Plat, v: VertexId): Pt[] {
  return outgoing(p, v).map((h) => {
    const o = p.halfEdges.origin[h ^ 1];
    return { x: p.vertices.x[o], y: p.vertices.y[o] };
  });
}

/** Runs one insertChain step of a draw; its result's code, or 'ok' with its warnings. */
function insertStep(p: Plat, g: ConstructiveInput, i: number): { ok: boolean; text: string; warnings: string[] } {
  const a = g.steps[i].args;
  const closed = a.ring !== undefined;
  const pts = closed ? g.rings[a.ring as string] : g.chains[a.chain as string];
  const r = insertChain(insertTx(p, a.level as Level), pts, [{ role: a.role as string, entity: `replay:${String(i)}` }], a.cls as 'mandatory' | 'optional', closed ? { closed: true } : {});
  return r.ok ? { ok: true, text: 'ok', warnings: r.warnings.map((w) => w.code) } : { ok: false, text: `${r.code} ${r.detail}`, warnings: [] };
}

const B = (v: number): bigint => BigInt(v);
const cross = (a: Pt, b: Pt, c: Pt): bigint => (B(b.x) - B(a.x)) * (B(c.y) - B(a.y)) - (B(b.y) - B(a.y)) * (B(c.x) - B(a.x));
const len2 = (a: Pt, b: Pt): bigint => (B(b.x) - B(a.x)) ** 2n + (B(b.y) - B(a.y)) ** 2n;
/** Whether p's distance from the line a–b lies in [lo, hi] / den, exactly. */
const distIn = (p: Pt, a: Pt, b: Pt, lo: number, hi: number, den: number): boolean => {
  const c2 = cross(a, b, p) ** 2n * B(den) ** 2n;
  return c2 >= B(lo) ** 2n * len2(a, b) && c2 <= B(hi) ** 2n * len2(a, b);
};
/** The live vertices other than a and b lying within 1 cm of the open segment a–b. */
function onSegment(p: Plat, a: Pt, b: Pt): Pt[] {
  const out: Pt[] = [];
  const L = len2(a, b);
  for (let v = 0; v < p.slots.vertex.top; v += 1) {
    if (!isVertexLive(p, v)) continue;
    const q = { x: p.vertices.x[v], y: p.vertices.y[v] };
    if ((q.x === a.x && q.y === a.y) || (q.x === b.x && q.y === b.y)) continue;
    const t = (B(q.x) - B(a.x)) * (B(b.x) - B(a.x)) + (B(q.y) - B(a.y)) * (B(b.y) - B(a.y));
    if (t > 0n && t < L && cross(a, b, q) ** 2n <= L) out.push(q);
  }
  return out;
}

/**
 * Replays a draw's insertion steps, up to (and, where it is an insertion, including) the fixture's step, and checks the
 * geometry the fixture names: null when it survives, else the reason.
 */
function replay(id: string, raw: ConstructiveInput): string | null {
  const g = centred(raw);
  const p = arena();
  const level = (q: Pt): number => {
    const v = vertexAt(p, q);
    return v < 0 ? -1 : p.vertices.level[v];
  };
  const results: { ok: boolean; text: string; warnings: string[] }[] = [];
  for (let i = 0; i < g.steps.length; i += 1) {
    if (g.steps[i].op !== 'insertChain') break;
    if (id === 'move/crossing-near-vertex' && i === 3) {
      // Before the fixture's own step: the vertex stands, the split sits at the drawn point, A–X runs 25.0–25.7 cm from W.
      const { vertex: w, split: x } = g.points;
      const [a, b] = g.chains.edge;
      if (level(w) !== 1 || neighbours(p, vertexAt(p, w)).length !== 1) return 'the vertex was attracted or routed through';
      if (level(x) !== 1) return 'the split is not at the drawn point';
      const ns = neighbours(p, vertexAt(p, x));
      if (!ns.some((q) => q.x === a.x && q.y === a.y) || !ns.some((q) => q.x === b.x && q.y === b.y)) return "the split's sub-edges do not run to the edge's ends";
      if (!distIn(w, a, x, 250, 257, 10)) return 'the vertex does not stand 25.0–25.7 cm from the sub-edge after the split';
    }
    const r = insertStep(p, g, i);
    results.push(r);
    if (!r.ok) return `step ${String(i)} (${String(g.steps[i].args.chain ?? g.steps[i].args.ring)}) refused: ${r.text}`;
  }
  switch (id) {
    case 'move/warp-kerb-near-vertex': {
      const { vertex: v, end: e } = g.points;
      const [k0, k1] = g.chains.kerb;
      if (level(v) !== 2) return `the vertex ${String(v.x)}, ${String(v.y)} no longer stands at L2 after the insertions (attracted)`;
      if (neighbours(p, vertexAt(p, v)).length !== 1) return 'the vertex was joined to the kerb';
      if (level(e) !== 3) return "the plot line's end is not an L3 vertex at the drawn point on the kerb";
      if (level(k0) !== 2 || level(k1) !== 2) return "the kerb's ends moved";
      const on = onSegment(p, k0, k1);
      return on.length === 1 && on[0].x === e.x && on[0].y === e.y ? null : `the kerb carries ${String(on.length)} vertices, not its plot-line end alone`;
    }
    case 'move/warp-steiner-pair-renumbering': {
      const { s1, s2 } = g.points;
      const [a, b] = g.chains.route;
      if (level(s1) !== 2 || level(s2) !== 2) return 'a Steiner vertex of the pair is gone (attraction merged the pair)';
      return onSegment(p, a, b).length === 2 ? null : 'the route does not carry exactly the two Steiner vertices';
    }
    case 'move/crossing-near-vertex': {
      // Steps: the edge, the lane, the splitter (checked above), then the fixture's own step, the crossing chain: it is
      // not routed through the vertex (its one lane edge) and leaves one crossing vertex on A–X beside it.
      const { vertex: w, split: x } = g.points;
      const [a] = g.chains.edge;
      if (results.length !== 4) return 'the scenario did not run its four insertions';
      if (level(w) !== 1 || neighbours(p, vertexAt(p, w)).length !== 1) return 'the crossing chain was routed through the vertex';
      const crossings = onSegment(p, a, x);
      if (crossings.length !== 1) return `the crossing chain left ${String(crossings.length)} vertices on the sub-edge, not one crossing`;
      if (len2(crossings[0], w) > 41n * 41n) return 'the crossing is not beside the vertex';
      return null;
    }
    case 'remove/promotion-near-finer-vertex': {
      const { promoted: pp, vertex: q, routeEnd: e } = g.points;
      const last = results[results.length - 1];
      if (results.length !== 5) return 'the scenario did not run its five insertions';
      if (!last.warnings.includes('W_PROMOTED')) return 'the street promoted nothing';
      if (level(pp) !== 1) return 'the promoted vertex is not at L1';
      if (level(q) !== 3) return 'the other finer vertex moved or changed level';
      return distIn(q, pp, e, 115, 125, 100) ? null : 'the other finer vertex does not stand 1.15–1.25 cm from the new route edge';
    }
    case 'limit/degen-pinched-face':
      return level(g.points.vertex) === 1 ? null : "the face's corner is not an L1 vertex";
    default:
      throw new Error(`replay: no check for ${id}`);
  }
}

const REPLAYED = ['move/warp-kerb-near-vertex', 'move/warp-steiner-pair-renumbering', 'move/crossing-near-vertex', 'remove/promotion-near-finer-vertex', 'limit/degen-pinched-face'] as const;

function caseOf(id: string) {
  const c = constructiveCase(id);
  if (c === undefined) throw new Error(`no case ${id}`);
  return c;
}

describe("the fixtures insertion could erase survive their insertion prefix on M0-a-04 / 05's insertChain", () => {
  it.each(REPLAYED.map((id) => [id] as const))('%s: the named geometry stands at the fixture’s step', (id) => {
    const c = caseOf(id);
    for (let seed = 0; seed < REPLAYS; seed += 1) {
      const why = replay(id, c.generate(seed) as ConstructiveInput);
      if (why !== null) expect.fail(`${id} seed ${String(seed)}: ${why}`);
    }
  }, 120_000);

  it('fails the constructions the first round shipped (negative controls: the replay can fail)', () => {
    // The kerb inserted where the warp takes it: the vertex 25.35 cm off is attracted onto it.
    const k = caseOf('move/warp-kerb-near-vertex').generate(3) as ConstructiveInput;
    expect(replay('move/warp-kerb-near-vertex', { ...k, chains: { ...k.chains, kerb: k.chains.kerbAfter } })).toMatch(/no longer stands|joined to the kerb/);
    // The pair inserted 25 cm apart: the second end lands on the first.
    const s = caseOf('move/warp-steiner-pair-renumbering').generate(3) as ConstructiveInput;
    const s1 = s.points.s1;
    const toward = (q: Pt, r: Pt, d: number): LatticePoint => {
      const n = Math.hypot(r.x - q.x, r.y - q.y);
      return lpt(Math.round(q.x + ((r.x - q.x) * d) / n), Math.round(q.y + ((r.y - q.y) * d) / n));
    };
    const near = toward(s1, s.points.s2, 25);
    const second = [lpt(s.chains.second[0].x + near.x - s.points.s2.x, s.chains.second[0].y + near.y - s.points.s2.y), near];
    expect(replay('move/warp-steiner-pair-renumbering', { ...s, chains: { ...s.chains, second }, points: { ...s.points, s2: near } })).toMatch(/is gone/);
    // The standing vertex drawn 2 cm nearer the edge (24.2 cm off it): the lane's end is attracted onto the edge.
    const x = caseOf('move/crossing-near-vertex').generate(3) as ConstructiveInput;
    const w = x.points.vertex;
    const [a, b] = x.chains.edge;
    const t = ((w.x - a.x) * (b.x - a.x) + (w.y - a.y) * (b.y - a.y)) / ((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    const wn = toward(w, { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) }, 2);
    expect(replay('move/crossing-near-vertex', { ...x, chains: { ...x.chains, lane: [x.chains.lane[0], wn] }, points: { ...x.points, vertex: wn } })).toMatch(/attracted or routed through/);
    // The promotion's street from the north face (the finer plot lines' side): refused as kept content.
    const pr = caseOf('remove/promotion-near-finer-vertex').generate(3) as ConstructiveInput;
    const [st0, pp] = pr.chains.street;
    const flipped = lpt(2 * pp.x - st0.x, 2 * pp.y - st0.y);
    expect(replay('remove/promotion-near-finer-vertex', { ...pr, chains: { ...pr.chains, street: [flipped, pp] } })).toMatch(/refused: E_KEPT/);
  });
});

describe("every M0 case's insertion prefix runs on M0-a-04 / 05's insertChain (C-0181 (2): every step before the last returns ok)", () => {
  it.each(casesAt('M0').map((c) => [c.id, c] as const))('%s', (id, c: ConstructiveCase) => {
    for (let seed = 0; seed < PREFIX_REPLAYS; seed += 1) {
      const g = centred(c.generate(seed) as ConstructiveInput);
      const p = arena();
      // The prefix: the insertChain steps before the scenario's last (its outcome is M0-k-04's to judge), up to the
      // first step of another operation or of another arena.
      for (let i = 0; i + 1 < g.steps.length; i += 1) {
        const s = g.steps[i];
        if (s.op !== 'insertChain' || s.args.arena !== undefined) break;
        if (g.chains[s.args.chain as string] === undefined && g.rings[s.args.ring as string] === undefined) expect.fail(`${id} seed ${String(seed)}: step ${String(i)} names no chain or ring`);
        const r = insertStep(p, g, i);
        if (!r.ok) expect.fail(`${id} seed ${String(seed)}: step ${String(i)} refused ${r.text}`);
      }
    }
  }, 120_000);
});
