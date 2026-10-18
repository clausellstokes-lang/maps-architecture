// M0-a-13's exit bar, B-FUZZ (§13.1; marked *here* in M0-work.json): 0 crashes, 0 hangs, 0 invalid outputs on random
// fields over random arrangements — PLAT_FUZZ_RUNS cases (10⁴ in the PR tier, 10⁶ nightly; C-0057). Each case builds an
// arrangement from random insertion batches (ways, lanes, finer chains along the ways, owned blocks — M0-a-06's
// generator), optionally adds an L1 chain whose first vertex is a bridge's `deck_end` or a water gate's `gate_end` (the
// brush then centred on it), optionally locks a random way or a random owned block (the lock layer's injected list), and
// runs one warp batch of a random level 0 – 3 with one of §7.1's pointwise brushes (displace, pinch, bloat, swirl,
// jitter) over a random region. A committed step leaves the arena valid by every oracle (§3.10's half-edge
// links, minEdge from any writer, one vertex per lattice point, no crossing, clearance ≥ minEdge, level consistency,
// the face records, nesting, Euler per level, the index state), no held vertex moved, the held set's rules read
// independently — a locked block's route vertices held (1), a crossing end inside the region held (2) unless fromLevel
// = 0, nothing held at fromLevel = 0 with no lock — every reported move where the
// arena now has it, the commit record's `moved` equal to the reported moves (by lattice position), §3.10's placement
// bound on every finer vertex the step touched, and at most 8 halvings; a step that halves to its end is a reported no-op that leaves the arena as
// it was (§3.6). The item's own fast-check properties meet the bar (the spec note N-16).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { idOf, isFaceLive, isVertexLive, rowsOn, roleIdOf, type Plat, type VertexId } from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import { setOwner, tx } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { randomBatch, rng, type Live } from '../tx/fuzzgen.js';
import { allProblems, box, brush, framed, movedLists, pt, spec, state, warpBatch, type BrushKind } from './support.js';
import { routeOf } from '../../src/warp/held.js';
import { placementBoundProblem } from '../../src/warp/validate.js';
import { StepView } from '../../src/warp/view.js';
import { checkIndexState, faceRouteRings } from '../../src/index/index.js';
import { insideRegion, MAX_HALVINGS } from '../../src/warp/index.js';

const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
/** The hard timeout (0 hangs): a few times the contended cost per case at the PR size. */
const TIMEOUT = Math.max(600_000, RUNS * 60);
const INSERTS = { way: 0.35, lane: 0.75, along: 0.25 };

/** A random arrangement: `n` insertion batches (refusals skipped), and its live ways. */
function arrangement(seed: number, n: number): { p: Plat; live: Live } {
  const p = framed();
  const r = rng(seed);
  const live: Live = { ways: [], kerbs: [], next: 0 };
  for (let i = 0; i < n; i++) {
    const b = randomBatch(p, live, r, INSERTS);
    tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn);
  }
  return { p, live };
}

const G = { layer: 'ground' as const, part: 0 };
const kinds: BrushKind[] = ['displace', 'pinch', 'bloat', 'swirl', 'jitter'];
const tally = { committed: 0, halved: 0, noops: 0, moved: 0, level0: 0, crossings: 0, crossingsHeld: 0, faceLocks: 0 };
/** What a case adds before its warp: nothing, or an L1 chain whose first vertex is a `deck_end` or a `gate_end`. */
type Crossing = 'none' | 'deck_end' | 'gate_end';
/** What the lock layer's injected list holds: nothing, a random live way, or a random owned L1 block. */
type Lock = 'none' | 'way' | 'face';
const CROSSING_ROLES = [roleIdOf('deck_end'), roleIdOf('gate_end')];

/** Does the vertex carry a `deck_end` or `gate_end` row? */
function crossingEnd(p: Plat, v: VertexId): boolean {
  return rowsOn(p, 'vertex', v).some((r) => CROSSING_ROLES.includes(p.roles.kind[r]));
}

/** One B-FUZZ case: an arrangement, a brush near a movable vertex, one warp batch, and every check on its outcome. */
function oneCase(seed: number, n: number, wanted: Level, kind: BrushKind, centre: number, offMille: number, radius: number, strengthMille: number, dx: number, dy: number, pick: number, lock: Lock, crossing: Crossing = 'none', cpts: readonly number[] = []): void {
  const { p, live } = arrangement(seed, n);
  // An L1 chain whose first vertex is a crossing's end (§3.6 held (2)); a refused insertion adds nothing.
  let knotAt = -1;
  if (crossing !== 'none' && cpts.length >= 4) {
    const a = pt(200 + (cpts[0] % 3601), 200 + (cpts[1] % 3601));
    const b = pt(200 + (cpts[2] % 3601), 200 + (cpts[3] % 3601));
    const c = tx(p, spec(1, { rederivesFrom: 0 as never }), (o) => insertChain(o, [a, b], [{ role: 'way', entity: 'crossing:1' }], 'mandatory', { knots: [{ index: 0, role: crossing, ordinal: 0, entity: 'crossing:1' }] }));
    if (c.ok) {
      for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v) && crossingEnd(p, v)) knotAt = v;
      tally.crossings++;
    }
  }
  // The lock layer's injected list: one random live way, or one random L1 block (its route vertices held (1)), owned
  // first when the arrangement left it unowned.
  const way = live.ways.length > 0 ? live.ways[pick % live.ways.length] : null;
  let held: { entity: string; ref: { role: string; entity: string } | { owner: string; level: Level } }[] = [];
  let lockedCorners: VertexId[] = [];
  if (lock === 'way' && way !== null) held = [{ entity: way, ref: { role: 'way', entity: way } }];
  if (lock === 'face') {
    const blocks: number[] = [];
    for (let f = 0; f < p.slots.face[1].top; f++) if (isFaceLive(p, 1, f)) blocks.push(f);
    if (blocks.length > 0) {
      const f = blocks[pick % blocks.length];
      if (p.faces[1].owner[f] < 0) tx(p, spec(1, { rederivesFrom: 0 as never }), (o) => setOwner(o, [f], 'locked:1'));
      const owner = p.faces[1].owner[f] >= 0 ? idOf(p, p.faces[1].owner[f]) : null;
      if (owner !== null) {
        held = [{ entity: owner, ref: { owner, level: 1 } }];
        for (let g = 0; g < p.slots.face[1].top; g++) {
          if (isFaceLive(p, 1, g) && p.faces[1].owner[g] >= 0 && idOf(p, p.faces[1].owner[g]) === owner) lockedCorners.push(...faceRouteRings(p, 1, g, 1).flat());
        }
        lockedCorners = [...new Set(lockedCorners)];
        tally.faceLocks++;
      }
    }
  }
  const off = offMille / 1000;
  const strength = strengthMille / 1000;
  // The batch's level: the one drawn, or the finest level the arrangement holds a vertex of if that is coarser.
  let top = 1;
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v)) top = Math.max(top, p.vertices.level[v]);
  const level = Math.min(wanted, top) as Level;
  // The brush centred near a vertex the warp may move (of level ≥ the batch's), so most cases move something.
  const movable: number[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v) && p.vertices.level[v] >= level) movable.push(v);
  const c = knotAt >= 0 ? knotAt : movable.length > 0 ? movable[centre % movable.length] : -1;
  const cx = Math.round(c >= 0 ? p.vertices.x[c] + off * radius : 2000);
  const cy = Math.round(c >= 0 ? p.vertices.y[c] - off * radius * 0.7 : 2000);
  const before = state(p);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const points = new Map<number, string>();
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v)) points.set(v, `${X[v]},${Y[v]}`);
  const s = kind === 'jitter' ? Math.abs(strength) * 120 : kind === 'swirl' ? strength * 0.8 : Math.abs(strength) * 0.9;
  const field = brush(kind, cx, cy, radius, s, dx, dy);
  const region = box(Math.max(-10, cx - radius), Math.max(-10, cy - radius), Math.min(4010, cx + radius), Math.min(4010, cy + radius));
  // The crossing ends the rule (2) reads: those among the step's region vertices of level ≥ the batch's.
  const crossingsIn: VertexId[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (isVertexLive(p, v) && p.vertices.level[v] >= level && crossingEnd(p, v) && insideRegion(region, X[v], Y[v])) crossingsIn.push(v);
  }
  if (level === 0) tally.level0++;
  const r = warpBatch(p, level, field, region, { warp: { held: held as never } });
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  const rep = r.value.value;
  expect(rep.halvings).toBeLessThanOrEqual(MAX_HALVINGS);
  // The held set's rules, read independently of computeHeld: (1) a locked block's route vertices, (2) a crossing end in
  // the region unless fromLevel = 0, and nothing at all at fromLevel = 0 with nothing locked (no raised foot, no smoothing).
  const heldSet = new Set(rep.held);
  for (const v of lockedCorners) expect(heldSet.has(v)).toBe(true);
  if (level !== 0) {
    for (const v of crossingsIn) expect(heldSet.has(v)).toBe(true);
    tally.crossingsHeld += crossingsIn.length;
  }
  if (level === 0 && held.length === 0) expect(rep.held).toEqual([]);
  if (!rep.applied) {
    tally.noops++;
    expect(state(p)).toBe(before);
    return;
  }
  if (rep.halvings > 0) tally.halved++;
  if (r.value.record !== null) tally.committed++;
  tally.moved += rep.moves.length;
  for (const v of rep.held) {
    expect(rep.moves.some((m) => m.vertex === v)).toBe(false);
    expect(`${X[v]},${Y[v]}`).toBe(points.get(v));
  }
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (!isVertexLive(p, v) || rep.moves.some((m) => m.vertex === v)) continue;
    expect(`${X[v]},${Y[v]}`).toBe(points.get(v));
  }
  for (const m of rep.moves) {
    expect(X[m.vertex]).toBe(m.to.x);
    expect(Y[m.vertex]).toBe(m.to.y);
  }
  // The commit record lists every moved vertex, slides and re-seats included, by lattice position (§3.3, §3.6).
  const listed = movedLists(p, r.value.record?.moved, [rep]);
  expect(listed.record).toEqual(listed.reported);
  // §3.10's placement bound on every finer vertex the step touched — moved, or on a run an end of which moved — held
  // ones included (a held finer vertex whose run's end moved would leave its route; §3.6 held (5)).
  const movedSet = new Set(rep.moves.map((m) => m.vertex));
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (!isVertexLive(p, v)) continue;
    const route = routeOf(p, v);
    if (route === null || !(movedSet.has(v) || movedSet.has(route.a) || movedSet.has(route.b))) continue;
    expect(placementBoundProblem(new StepView(p, G), [{ v, route }])).toBeNull();
  }
  expect(allProblems(p)).toEqual([]);
  expect(checkIndexState(p)).toEqual([]);
}


describe('B-FUZZ: random fields over random arrangements (warp)', () => {
  it(`${RUNS} cases: every committed step valid, held vertices unmoved, ≤ 8 halvings, a no-op writes nothing`, () => {
    tally.committed = 0;
    tally.halved = 0;
    tally.noops = 0;
    tally.moved = 0;
    tally.level0 = 0;
    tally.crossings = 0;
    tally.crossingsHeld = 0;
    tally.faceLocks = 0;
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 0x3fffffff }),
        fc.integer({ min: 3, max: 9 }),
        fc.constantFrom<Level>(0, 1, 2, 3),
        fc.constantFrom(...kinds),
        fc.nat(),
        fc.integer({ min: -500, max: 500 }),
        fc.integer({ min: 100, max: 1500 }),
        fc.integer({ min: -1000, max: 1000 }),
        fc.integer({ min: -300, max: 300 }),
        fc.integer({ min: -300, max: 300 }),
        fc.nat(),
        fc.constantFrom<Lock>('none', 'none', 'way', 'face'),
        fc.constantFrom<Crossing>('none', 'none', 'deck_end', 'gate_end'),
        fc.array(fc.nat(), { minLength: 4, maxLength: 4 }),
        oneCase,
      ),
    );
    // The cases reach the outcomes: most commit a move (8 558 of 10⁴ at the PR size, 334 after halving; measured
    // 2026-10-05, CONTENDED); a no-op is the fixtures' (fixtures.test.ts).
    expect(tally.committed).toBeGreaterThan(RUNS / 2);
    expect(tally.moved).toBeGreaterThan(RUNS);
    if (RUNS >= 1000) expect(tally.halved).toBeGreaterThan(0);
    // The generator reaches the held set's branches (note 8): fromLevel = 0, locked blocks, crossing ends held by (2).
    if (RUNS >= 1000) expect({ level0: tally.level0 > 0, faceLocks: tally.faceLocks > 0, crossings: tally.crossings > 0, crossingsHeld: tally.crossingsHeld > 0 }).toEqual({ level0: true, faceLocks: true, crossings: true, crossingsHeld: true });
  }, TIMEOUT);

  it('a found case: a free chain dragged over an unmoved edge into the next face halves (each path crosses no unmoved edge)', () => {
    // fast-check seed 137587846, shrunk: the L2 chain (2612, 2202)–(2391, 2235) jumped the L1 edge (2139, 1576)–(4000, 3044)
    // whole at strength 1, neither end nor the edge's ends in the triangles it swept; the face records then disagreed.
    tally.halved = 0;
    oneCase(17, 8, 3, 'displace', 115099409, 0, 487, 0, 293, -295, 0, 'none');
    expect(tally.halved).toBe(1);
  });

  it('a found case: a hole carried over an edge whose end slides halves (each mover keeps its side of every moved ring)', () => {
    // fast-check seed −17487670, shrunk: the L2 hole (1694, 3495)–(1599, 3533) dragged 283 cm up over the L1 edge
    // (1072, 3523)–(2387, 3751) while that edge's end slid to (2388, 3751): its path met no unmoved edge and the edge swept
    // no unmoved vertex, and the hole landed in the next face (the face records then disagreed). It commits at ⅛.
    tally.halved = 0;
    oneCase(742479849, 7, 3, 'displace', 0, 0, 746, 0, 0, 283, 0, 'none');
    expect(tally.halved).toBe(1);
  });
});
