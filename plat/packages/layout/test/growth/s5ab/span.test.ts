// M0-c-04 session rounds s1 (N-54 (3); C-0285), s2 (F-1, F-2; C-0292) and s3 (pin 5 re-pinned after M0-c-02's round
// s2, C-0300; C-0303): a stage boundary that crosses a bridge's span. The gate is the bridgehead
// — the deck end on the stage's side — and the span stays one edge between its two deck ends; the gate splits run inside
// the trace's own batch, so a refused trace leaves the arena as it found it; a crossing that cannot be put lawfully (two
// deck ends on one side, the water off every span) refuses, nothing written. On a hand-built site: the small flat site,
// S3's commits, a pond east of the town with one crossing site, and one way laid over its deck by S4's commit.
import { describe, expect, it } from 'vitest';
import { err, isVertexLive, outgoing, dest, rowKey, rowsOn, STAGES, type Kernel, type KernelTx, type LatticePoint, type Plat, type StageId } from '@plat/kernel';
import type { Bridge, Cm, Lifecycle, WaterBody, WaterSet } from '@plat/model';
import { tableView } from '@plat/tables';
import { commitOuterRing, commitRoutes, commitS3Slice, flatFixture, s3Slice, type RoutePoint, type S3Commit, type S3Slice, type S4Route, type Site } from '../../../src/index.js';
import { boundaryCrossings, traceStage, wayLines } from '../../../src/growth/boundary.js';
import { GROUND, kernelFor, P, roleEdges, verticesWith } from './support.js';

const GENERATED: Lifecycle = { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };

/** An L0 batch spec at S1 (the water's). */
function l0(): KernelTx {
  return { key: GROUND, level: 0, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S1 as StageId }, stage: STAGES.S1 as StageId, rederivesFrom: STAGES.S1 as StageId, workLimit: 10_000_000 };
}

/** A rectangular pond x0 … x1 × y0 … y1 (counter-clockwise). */
function rect(x0: number, x1: number, y0: number, y1: number): LatticePoint[] {
  return [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
}

const POND = rect(50_000, 52_000, -3000, 3000);
const DECK = { id: 'bridge:1', a: P(50_000, 0), b: P(52_000, 0) };

/**
 * The pond laid on L0 (written here): its ring one closed chain carrying `shore` and `bank`, the deck's two ends on its
 * west and east sides as vertices carrying ('deck_end', bridge:1, 0 | 1), pinned; the face owned by the body.
 */
function layPond(k: Kernel, decks: boolean): WaterSet {
  const id = 'river:1';
  const pts = decks ? [POND[0], POND[1], DECK.b, POND[2], POND[3], DECK.a] : POND.slice();
  const knots = decks
    ? [
        { index: 2, role: 'deck_end', ordinal: 1, entity: DECK.id },
        { index: 5, role: 'deck_end', ordinal: 0, entity: DECK.id },
      ]
    : [];
  const r = k.tx(l0(), (o) => {
    const ins = k.geom.insertChain(o, pts, [{ role: 'shore', entity: id }, { role: 'bank', entity: id }], 'mandatory', { closed: true, knots, pinned: knots.map((x) => x.index) });
    if (!ins.ok) return err(ins.code, ins.detail);
    const loc = k.geom.pointLocate(GROUND, 0, P(51_000, 1500));
    if (loc.on !== 'face') throw new Error('span.test: no pond face');
    const own = k.geom.setOwner(o, [loc.face], id);
    if (!own.ok) return own;
    if (!decks) return own;
    return k.geom.pinVertices(o, [
      { role: 'deck_end', entity: DECK.id, ordinal: 0 },
      { role: 'deck_end', entity: DECK.id, ordinal: 1 },
    ]);
  });
  if (!r.ok) throw new Error(`span.test: the pond was refused: ${r.code} ${r.detail}`);
  const body = { id, kind: 'river', face: { owner: id, level: 0 }, shore: { role: 'shore', entity: id }, lifecycle: GENERATED } as WaterBody;
  const bridges: Bridge[] = decks
    ? [
        {
          id: DECK.id,
          state: 'site',
          way: null,
          deck: [
            { role: 'deck_end', entity: DECK.id, ordinal: 0 },
            { role: 'deck_end', entity: DECK.id, ordinal: 1 },
          ],
          over: 'river',
          spanCm: 2000 as Cm,
          lifecycle: GENERATED,
        },
      ]
    : [];
  return { bodies: [body], bridges };
}

/** A ring densified to sides of at most `step` cm (its vertices kept). */
function densify(ring: readonly LatticePoint[], step = 2500): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / step));
    for (let s = 0; s < n; s += 1) out.push(P(Math.round(a.x + ((b.x - a.x) * s) / n), Math.round(a.y + ((b.y - a.y) * s) / n)));
  }
  return out;
}

/**
 * Stage 2's outline: a ring about the town whose east side runs at 45° through the pond, x = y + 51 000 — it enters the
 * pond on the west bank at y = −1 000, crosses the deck at mid-span (51 000, 0) and leaves on the east bank at y = 1 000.
 */
const OUTLINE = densify([P(-40_000, -40_000), P(11_000, -40_000), P(91_000, 40_000), P(-40_000, 40_000)]);

/** A site, its arena, S3's commits, the pond and the way over the deck (`decks` false: a pond with no crossing site). */
interface Fixture {
  site: Site;
  slice: S3Slice;
  plat: Plat;
  k: Kernel;
  commit: S3Commit;
  water: WaterSet;
  ways: string[];
}

function fixture(decks = true): Fixture {
  const site = flatFixture(1, { frameAreaHa: 400, walledHa: 30 });
  const slice = s3Slice(site);
  const { plat, k } = kernelFor(site);
  expect(commitOuterRing(site, k).ok).toBe(true);
  const water = layPond(k, decks);
  const c = commitS3Slice(slice, k, { outerRing: 'present', water });
  if (!c.ok) throw new Error(`span.test: S3's commits were refused: ${c.code} ${c.detail}`);
  // The town's wall stays well inside the outline: the fixture's geometry holds.
  for (const q of c.value.traced.line) expect(Math.max(Math.abs(q.x), Math.abs(q.y))).toBeLessThan(31_000);
  if (!decks) {
    // No crossing site: a way chain laid straight over the pond (no S4 commit lays one; the arena's own insertion).
    const spec: KernelTx = { ...l0(), level: 1, batch: { kind: 'stage', stage: STAGES.S4 as StageId }, stage: STAGES.S4 as StageId, rederivesFrom: STAGES.S4 as StageId };
    const w = k.tx(spec, (o) => k.geom.insertChain(o, [P(44_000, 0), P(47_000, 0), P(55_000, 0), P(58_000, 0)], [{ role: 'way', entity: 'way:77' }], 'mandatory', {}));
    if (!w.ok) throw new Error(`span.test: the bare way was refused: ${w.code} ${w.detail}`);
    return { site, slice, plat, k, commit: c.value, water, ways: ['way:77'] };
  }
  const xs = [34_000, 36_500, 39_000, 41_500, 44_000, 46_500, 49_000];
  const points: RoutePoint[] = [
    ...xs.map((x, i): RoutePoint => (i === 0 ? { at: P(x, 0), pin: 'gate', pinId: 'gate:9' } : { at: P(x, 0) })),
    { at: DECK.a, pin: 'deck_end', pinId: DECK.id, pinOrdinal: 0 },
    { at: DECK.b, pin: 'deck_end', pinId: DECK.id, pinOrdinal: 1 },
    { at: P(54_500, 0) },
    { at: P(57_000, 0) },
    { at: P(59_500, 0), pin: 'frame' },
  ];
  const route: S4Route = { id: 'gate:9/out', order: 0, part: 'outward', class: 'through', points, spans: [{ at: xs.length, bridge: DECK.id }], from: { kind: 'gate', id: 'gate:9' }, to: { kind: 'bearing', bearingCdeg: 9000 as never } };
  // A second way, north over dry land: its crossing of the outline is a split.
  const ys = [34_000, 36_500, 39_000, 41_500, 44_000, 46_500, 49_000];
  const north: S4Route = {
    id: 'gate:8/out',
    order: 1,
    part: 'outward',
    class: 'through',
    points: ys.map((y, i): RoutePoint => (i === 0 ? { at: P(0, y), pin: 'gate', pinId: 'gate:8' } : i === ys.length - 1 ? { at: P(0, y), pin: 'frame' } : { at: P(0, y) })),
    spans: [],
    from: { kind: 'gate', id: 'gate:8' },
    to: { kind: 'bearing', bearingCdeg: 0 as never },
  };
  const r = commitRoutes([route, north], k, { tables: site.tables, rung: 'CITY', spacingCm: 2500, water: [POND], bridges: water.bridges });
  if (!r.ok) throw new Error(`span.test: the way was refused: ${r.code} ${r.detail}`);
  return { site, slice, plat, k, commit: c.value, water, ways: r.value.network.ways.map((w) => w.id) };
}

/** The live vertex at a point, or −1. */
function vertexAt(p: Plat, q: LatticePoint): number {
  for (let v = 0; v < p.slots.vertex.top; v += 1) if (isVertexLive(p, v) && p.vertices.x[v] === q.x && p.vertices.y[v] === q.y) return v;
  return -1;
}

/** The span as the arena holds it: is one edge carrying a `way` row joining the deck ends, and the live vertices between them. */
function spanOf(p: Plat): { joined: boolean; between: number } {
  const a = vertexAt(p, DECK.a);
  const b = vertexAt(p, DECK.b);
  const edge = a < 0 ? undefined : outgoing(p, a as never).find((h) => dest(p, h) === b);
  const joined = edge !== undefined && rowsOn(p, 'edge', edge).map((r) => rowKey(p, r)).some((r) => r.role === 'way');
  let between = 0;
  for (let v = 0; v < p.slots.vertex.top; v += 1) {
    if (!isVertexLive(p, v) || v === a || v === b) continue;
    if (p.vertices.y[v] === 0 && p.vertices.x[v] > DECK.a.x && p.vertices.x[v] < DECK.b.x) between += 1;
  }
  return { joined, between };
}

function liveVertices(p: Plat): number {
  let n = 0;
  for (let v = 0; v < p.slots.vertex.top; v += 1) if (isVertexLive(p, v)) n += 1;
  return n;
}

/** The live vertices on a `setback` edge of `enceinte`, and those deeper than 2 cm inside the pond (the receipt's depth). */
function setbackOf(p: Plat, enceinte: string): { total: number; wet: number } {
  let total = 0;
  let wet = 0;
  for (let v = 0; v < p.slots.vertex.top; v += 1) {
    if (!isVertexLive(p, v)) continue;
    if (!outgoing(p, v as never).some((h) => rowsOn(p, 'edge', h).some((r) => rowKey(p, r).role === 'setback' && rowKey(p, r).entity === enceinte))) continue;
    total += 1;
    const x = p.vertices.x[v];
    const y = p.vertices.y[v];
    if (x > POND[0].x + 2 && x < POND[1].x - 2 && y > POND[0].y + 2 && y < POND[2].y - 2) wet += 1;
  }
  return { total, wet };
}

/** An outline whose east side is the line x = x0 + y (45°): it crosses the way (y = 0) at x0. */
function slanted(x0: number): LatticePoint[] {
  return densify([P(-40_000, -40_000), P(x0 - 40_000, -40_000), P(x0 + 40_000, 40_000), P(-40_000, 40_000)]);
}

describe('S5a: a stage boundary crossing a bridge\'s span (N-54 (3))', () => {
  it('the gate is the bridgehead on the stage\'s side, the span stays one edge between its deck ends', { timeout: 120_000 }, () => {
    const f = fixture();
    expect(spanOf(f.plat)).toEqual({ joined: true, between: 0 });
    const xs = boundaryCrossings(OUTLINE, wayLines(f.k, f.ways), f.site.centre);
    expect(xs).toHaveLength(2);
    // The outline meets the east way over the water, at mid-span, and the north way on dry land.
    const deck = xs.findIndex((c) => Math.abs(c.at.x - 51_000) <= 1 && Math.abs(c.at.y) <= 1);
    expect(deck).toBeGreaterThanOrEqual(0);
    const gate = `gate:${String(100 + deck)}`;
    const t = traceStage(2, OUTLINE, xs, f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok, t.ok ? '' : `${t.code} ${t.detail}`).toBe(true);
    if (!t.ok) return;
    // The gate at the west deck end (inside the outline), on the trace, on the way.
    expect(verticesWith(f.plat, 'gate', gate)).toEqual([DECK.a]);
    expect(t.value.gates.find((g) => g.id === gate)?.way).toBe(xs[deck].way);
    // The north way's gate split onto it where the outline crosses it.
    const other = xs[1 - deck];
    expect(verticesWith(f.plat, 'gate', `gate:${String(101 - deck)}`)).toEqual([P(Math.round(other.at.x), Math.round(other.at.y))]);
    expect(t.value.traced.line.some((q) => q.x === DECK.a.x && q.y === DECK.a.y)).toBe(true);
    // No vertex between the deck ends: the span is whole.
    expect(spanOf(f.plat)).toEqual({ joined: true, between: 0 });
  });

  it('a refused trace leaves the arena as it found it: no gate split, the span whole, the version unchanged', { timeout: 120_000 }, () => {
    const f = fixture();
    const xs = boundaryCrossings(OUTLINE, wayLines(f.k, f.ways), f.site.centre);
    const version = f.plat.version;
    const vertices = liveVertices(f.plat);
    // The previous enceinte's line reaching out through the outline's west side: F-WALL's rungs cannot clear the core.
    const core = [P(-20_000, -2000), P(-70_000, -2000), P(-70_000, 2000), P(-20_000, 2000)];
    const t = traceStage(2, OUTLINE, xs, f.slice, f.commit.plaza, core, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok).toBe(false);
    expect(f.plat.version).toBe(version);
    expect(liveVertices(f.plat)).toBe(vertices);
    expect(spanOf(f.plat)).toEqual({ joined: true, between: 0 });
    expect(xs).toHaveLength(2);
    expect(verticesWith(f.plat, 'gate', 'gate:100')).toEqual([]);
    expect(verticesWith(f.plat, 'gate', 'gate:101')).toEqual([]);
  });

  it('a boundary crossing the span twice (no single deck end on the stage\'s side) is refused, nothing written', { timeout: 120_000 }, () => {
    const f = fixture();
    // A slot 8 m wide cut down from the north through the pond to y = −10 m: both deck ends inside the outline.
    const slotted = densify([P(-40_000, -40_000), P(60_000, -40_000), P(60_000, 40_000), P(51_400, 40_000), P(51_400, -1000), P(50_600, -1000), P(50_600, 40_000), P(-40_000, 40_000)]);
    const xs = boundaryCrossings(slotted, wayLines(f.k, f.ways), f.site.centre);
    expect(xs.filter((c) => Math.abs(c.at.y) <= 1 && c.at.x > DECK.a.x && c.at.x < DECK.b.x)).toHaveLength(2);
    const version = f.plat.version;
    const t = traceStage(2, slotted, xs, f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok).toBe(false);
    if (t.ok) return;
    expect(t.code).toBe('E_INVARIANT');
    expect(t.detail).toMatch(/bridge:1's span .* 2 of its deck ends on the stage's side/);
    expect(f.plat.version).toBe(version);
    expect(spanOf(f.plat)).toEqual({ joined: true, between: 0 });
  });

  it('a crossing in the water off every span is refused, nothing written', { timeout: 120_000 }, () => {
    const f = fixture(false);
    const xs = boundaryCrossings(OUTLINE, wayLines(f.k, f.ways), f.site.centre);
    expect(xs).toHaveLength(1);
    const version = f.plat.version;
    const vertices = liveVertices(f.plat);
    const t = traceStage(2, OUTLINE, xs, f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok).toBe(false);
    if (t.ok) return;
    expect(t.code).toBe('E_INVARIANT');
    expect(t.detail).toMatch(/lies in river:1 off every bridge span/);
    expect(f.plat.version).toBe(version);
    expect(liveVertices(f.plat)).toBe(vertices);
  });

  // Session round s3 (C-0303): with the pond given, the wall crossing the span is water gate gate:w0's chord, bank to
  // bank, and the deck lies across it; since M0-c-02's round s2 (C-0300) the insertion's split of that chord is refused
  // inside the trace's batch by M0-c-02's strict chord proof, before this item's span proof is reached. The pin keeps
  // its purpose (typed, caused, the span whole, nothing of the stage written); its twin below keeps the span proof's own
  // refusal pinned on an input the chord proof admits.
  it('a trace whose wall crosses a span over the water is refused in its own batch by the chord proof, nothing written', { timeout: 120_000 }, () => {
    const f = fixture();
    // The crossings withheld (a caller's miss): the wall meets the way over the deck with no gate there.
    const version = f.plat.version;
    const vertices = liveVertices(f.plat);
    const t = traceStage(2, OUTLINE, [], f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok).toBe(false);
    if (t.ok) return;
    expect(t.code).toBe('E_INVARIANT');
    expect(t.detail).toMatch(/water: the water gate gate:w0's wall_gate run between 50000,-1000 and 52000,1000 is 2 edges, not its one chord/);
    expect(f.plat.version).toBe(version);
    expect(liveVertices(f.plat)).toBe(vertices);
    expect(spanOf(f.plat)).toEqual({ joined: true, between: 0 });
    expect(verticesWith(f.plat, 'gate_end', 'gate:w0')).toEqual([]);
    expect(roleEdges(f.plat, 'wall').get('enceinte:2') ?? []).toEqual([]);
  });

  it('a trace whose wall would put a vertex on a span is refused in its own batch by the span proof, nothing written (the pond withheld: a caller\'s miss)', { timeout: 120_000 }, () => {
    const f = fixture();
    // The crossings withheld and the pond not given, its bridge given: the trace lays no water gate and its wall runs
    // straight over the deck, splitting the span; only the span proof (C-0285 (2)) stands between that and a commit.
    const version = f.plat.version;
    const vertices = liveVertices(f.plat);
    const t = traceStage(2, OUTLINE, [], f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: { bodies: [], bridges: f.water.bridges }, firstOrdinal: 100 });
    expect(t.ok).toBe(false);
    if (t.ok) return;
    expect(t.code).toBe('E_INVARIANT');
    expect(t.detail).toMatch(/^S5a: the trace put a vertex on bridge:1's span between its deck ends/);
    expect(f.plat.version).toBe(version);
    expect(liveVertices(f.plat)).toBe(vertices);
    expect(spanOf(f.plat)).toEqual({ joined: true, between: 0 });
    expect(roleEdges(f.plat, 'wall').get('enceinte:2') ?? []).toEqual([]);
  });

  // Session round s2 (the closing check's F-1 and F-2; C-0292): the stage's strips keep off the water as stage 1's do,
  // and a crossing on the dry approach edge (one deck end) is split where it lies.
  it('an outline crossing the dry approach edge 3 m before the bridgehead: the gate split at the crossing, the strips off the pond, the span whole', { timeout: 120_000 }, () => {
    const f = fixture();
    const xs = boundaryCrossings(slanted(49_700), wayLines(f.k, f.ways), f.site.centre);
    expect(xs).toHaveLength(2);
    const east = xs.findIndex((c) => Math.abs(c.at.y) <= 1);
    expect(xs[east].at).toEqual(P(49_700, 0));
    const t = traceStage(2, slanted(49_700), xs, f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok, t.ok ? '' : `${t.code} ${t.detail}`).toBe(true);
    if (!t.ok) return;
    // F-2: the approach edge (49 000, 0) – (50 000, 0) carries one deck end: no span, so the way is split at the crossing
    // and the gate stands there, not at a way vertex or the bridgehead.
    expect(verticesWith(f.plat, 'gate', `gate:${String(100 + east)}`)).toEqual([P(49_700, 0)]);
    expect(t.value.gates.find((g) => g.id === `gate:${String(100 + east)}`)?.way).toBe(xs[east].way);
    // F-1: both sides' strips laid, no setback vertex in the pond, the span one edge.
    expect(t.value.strips.faces.inner).toBeGreaterThan(0);
    expect(t.value.strips.faces.outer).toBeGreaterThan(0);
    const sb = setbackOf(f.plat, 'enceinte:2');
    expect(sb.total).toBeGreaterThan(0);
    expect(sb.wet).toBe(0);
    expect(spanOf(f.plat)).toEqual({ joined: true, between: 0 });
  });

  it('an outline crossing the way 20 m before the bridge: the strips end at the banks, none in the pond', { timeout: 120_000 }, () => {
    const f = fixture();
    const xs = boundaryCrossings(slanted(48_000), wayLines(f.k, f.ways), f.site.centre);
    const t = traceStage(2, slanted(48_000), xs, f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok, t.ok ? '' : `${t.code} ${t.detail}`).toBe(true);
    if (!t.ok) return;
    expect(t.value.waterGates).toHaveLength(0);
    const sb = setbackOf(f.plat, 'enceinte:2');
    expect(sb.total).toBeGreaterThan(0);
    expect(sb.wet).toBe(0);
    expect(spanOf(f.plat)).toEqual({ joined: true, between: 0 });
  });

  it('strips that would break a span are refused in their own batch, no setback line written (the pond withheld: a caller\'s miss)', { timeout: 120_000 }, () => {
    const f = fixture();
    const xs = boundaryCrossings(slanted(49_700), wayLines(f.k, f.ways), f.site.centre);
    // The bridge given, its pond not: the strips get no water stop and their lines run over the deck.
    const t = traceStage(2, slanted(49_700), xs, f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: { bodies: [], bridges: f.water.bridges }, firstOrdinal: 100 });
    expect(t.ok).toBe(false);
    if (t.ok) return;
    expect(t.code).toBe('E_INVARIANT');
    expect(t.detail).toMatch(/S5a's strips: .*bridge:1's span/);
    expect(setbackOf(f.plat, 'enceinte:2').total).toBe(0);
    expect(spanOf(f.plat)).toEqual({ joined: true, between: 0 });
  });
});
