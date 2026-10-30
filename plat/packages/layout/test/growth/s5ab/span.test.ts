// S5a's trace on a stage boundary that crosses a bridge's span (N-54 (3); C-0285, C-0292, C-0303). The gate is the
// bridgehead — the deck end on the stage's side — and the span stays one edge between its two deck ends; the gate
// splits run inside the trace's own batch, so a refused trace leaves the arena as it found it; a crossing that cannot be
// put lawfully (two deck ends on one side, the water off every span) refuses, nothing written; the stage's strips keep
// off the water and their batch refuses rather than break a span. On a hand-built site: the small flat site, S3's
// commits, a pond east of the town with one crossing site, and one way laid over its deck by S4's commit.
import { describe, expect, it } from 'vitest';
import { err, isVertexLive, outgoing, dest, rowKey, rowsOn, STAGES, type Kernel, type KernelTx, type LatticePoint, type Plat, type StageId } from '@plat/kernel';
import type { Bridge, Cm, Lifecycle, WaterBody, WaterSet } from '@plat/model';
import { tableView } from '@plat/tables';
import { commitOuterRing, commitRoutes, commitS3Slice, flatFixture, s3Slice, type RoutePoint, type S3Commit, type S3Slice, type S4Route, type Site } from '../../../src/index.js';
import { LOOSE_GATE_TAG } from '../../../src/enceinte/trace.js';
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

/** A river band x 700 – 740 m across the whole frame, laid on L0 as the pond is (no crossing site). */
const BAND = rect(70_000, 74_000, -100_000, 100_000);

function layBand(k: Kernel): WaterBody {
  const id = 'river:2';
  const r = k.tx(l0(), (o) => {
    const ins = k.geom.insertChain(o, BAND, [{ role: 'shore', entity: id }, { role: 'bank', entity: id }], 'mandatory', { closed: true });
    if (!ins.ok) return err(ins.code, ins.detail);
    const loc = k.geom.pointLocate(GROUND, 0, P(72_000, 50_000));
    if (loc.on !== 'face') throw new Error('span.test: no band face');
    return k.geom.setOwner(o, [loc.face], id);
  });
  if (!r.ok) throw new Error(`span.test: the band was refused: ${r.code} ${r.detail}`);
  return { id, kind: 'river', face: { owner: id, level: 0 }, shore: { role: 'shore', entity: id }, lifecycle: GENERATED } as WaterBody;
}

function fixture(decks = true, band = false): Fixture {
  const site = flatFixture(1, { frameAreaHa: 400, walledHa: 30 });
  const slice = s3Slice(site);
  const { plat, k } = kernelFor(site);
  expect(commitOuterRing(site, k).ok).toBe(true);
  const pond = layPond(k, decks);
  const water: WaterSet = band ? { bodies: [...pond.bodies, layBand(k)], bridges: pond.bridges } : pond;
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

  // With the pond given, the wall crossing the span is water gate gate:w0's chord, bank to bank, and the deck lies across
  // it; the insertion's split of that chord is refused inside the trace's batch by the enceinte's strict chord proof
  // (C-0300), before this item's span proof is reached (C-0303). The pin keeps its purpose (typed, caused, the span
  // whole, nothing of the stage written); its twin below keeps the span proof's own refusal pinned on an input the chord
  // proof admits.
  it('a trace whose wall crosses a span over the water is refused in its own batch by the chord proof, nothing written', { timeout: 120_000 }, () => {
    const f = fixture();
    // The crossings withheld (a caller's miss): the wall meets the way over the deck with no gate there.
    const version = f.plat.version;
    const vertices = liveVertices(f.plat);
    const t = traceStage(2, OUTLINE, [], f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok).toBe(false);
    if (t.ok) return;
    expect(t.code).toBe('E_INVARIANT');
    // The chord proof's stable tag (M0-c-02's `LOOSE_GATE_TAG`; N-19, C-0452 (19)), never its coordinates.
    expect(t.detail.endsWith(`[${LOOSE_GATE_TAG}]`), t.detail).toBe(true);
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

  // The stage's strips keep off the water as stage 1's do, and a crossing on the dry approach edge (one deck end) is
  // split where it lies (C-0292 (1), (3)).
  it('an outline crossing the dry approach edge 3 m before the bridgehead: the gate split at the crossing, the strips off the pond, the span whole', { timeout: 120_000 }, () => {
    const f = fixture();
    const xs = boundaryCrossings(slanted(49_700), wayLines(f.k, f.ways), f.site.centre);
    expect(xs).toHaveLength(2);
    const east = xs.findIndex((c) => Math.abs(c.at.y) <= 1);
    expect(xs[east].at).toEqual(P(49_700, 0));
    const t = traceStage(2, slanted(49_700), xs, f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok, t.ok ? '' : `${t.code} ${t.detail}`).toBe(true);
    if (!t.ok) return;
    // The approach edge (49 000, 0) – (50 000, 0) carries one deck end: no span, so the way is split at the crossing
    // and the gate stands there, not at a way vertex or the bridgehead.
    expect(verticesWith(f.plat, 'gate', `gate:${String(100 + east)}`)).toEqual([P(49_700, 0)]);
    expect(t.value.gates.find((g) => g.id === `gate:${String(100 + east)}`)?.way).toBe(xs[east].way);
    // Both sides' strips laid, no setback vertex in the pond, the span one edge (C-0292 (1), (2)).
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

  // The batches S5a's trace makes (N-10, N-14; C-0452 (10), (14)): the gate plan (always rejected, nothing written), the
  // trace's one callback batch (the splits inside it) and the strips' one — so the seam arms the trace's commit and the
  // strips' commit, and a strategy or strip stand-in that opened another batch would show here (and be refused).
  it('the trace makes one callback batch and the strips one, after the gate plan; nothing else is opened', { timeout: 120_000 }, () => {
    const f = fixture();
    const xs = boundaryCrossings(OUTLINE, wayLines(f.k, f.ways), f.site.centre);
    const seen: { level: number; form: string; ok: boolean; detail: string }[] = [];
    const tx = (spec: KernelTx, fn?: never): ReturnType<Kernel['tx']> => {
      const r = f.k.tx(spec, fn);
      seen.push({ level: spec.level, form: fn === undefined ? 'declared' : 'callback', ok: r.ok, detail: r.ok ? '' : r.detail });
      return r;
    };
    const watched = Object.freeze({ ...f.k, tx: tx as Kernel['tx'] }) as Kernel;
    const t = traceStage(2, OUTLINE, xs, f.slice, f.commit.plaza, f.commit.traced.line, watched, { water: f.water, firstOrdinal: 100 });
    expect(t.ok, t.ok ? '' : `${t.code} ${t.detail}`).toBe(true);
    expect(seen).toEqual([
      { level: 1, form: 'callback', ok: false, detail: 'S5a: the gate plan (a batch always rejected)' },
      { level: 1, form: 'callback', ok: true, detail: '' },
      { level: 1, form: 'callback', ok: true, detail: '' },
    ]);
  });

  // Two crossings meeting one bridgehead (N-11): the outline cut by a 10 cm slot from the north beside the west deck end
  // (its two sides cross the way 50 and 40 cm before it, each taking that deck end, the way's own vertex there) and
  // crossing the span at mid-span (whose bridgehead is that same deck end): refused before anything is written.
  it('two gates at one bridgehead are refused, named, nothing written', { timeout: 120_000 }, () => {
    const f = fixture();
    const slot = densify([P(-40_000, -40_000), P(11_000, -40_000), P(51_000, 0), P(91_000, 40_000), P(49_960, 40_000), P(49_960, -1_000), P(49_950, -1_000), P(49_950, 40_000), P(-40_000, 40_000)]);
    const xs = boundaryCrossings(slot, wayLines(f.k, f.ways), f.site.centre);
    const east = xs.filter((c) => Math.abs(c.at.y) <= 1);
    expect(east.map((c) => c.at.x)).toEqual([49_950, 49_960, 51_000]);
    const version = f.plat.version;
    const vertices = liveVertices(f.plat);
    const t = traceStage(2, slot, xs, f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok).toBe(false);
    if (t.ok) return;
    expect(t.code).toBe('E_INVARIANT');
    expect(t.detail).toBe("S5a: the gate vertices could not be put on their ways: S5a: two gates at bridge:1's bridgehead (50000, 0) (N-54 (3))");
    expect(f.plat.version).toBe(version);
    expect(liveVertices(f.plat)).toBe(vertices);
    expect(spanOf(f.plat)).toEqual({ joined: true, between: 0 });
  });

  // The precedence of the way-vertex snap over the span rule (N-13; C-0452 (13)): a crossing within twice the attraction
  // distance of a deck end is that deck end — the way's own vertex — though the deck end lies just outside the outline
  // as given; the span stays one edge, the gate on land, the outline moved at most 26 cm.
  it('a crossing 20 cm from the far deck end gates at that deck end (the vertex snap first), the span whole', { timeout: 120_000 }, () => {
    const f = fixture();
    const xs = boundaryCrossings(slanted(51_980), wayLines(f.k, f.ways), f.site.centre);
    const east = xs.findIndex((c) => Math.abs(c.at.y) <= 1);
    expect(xs[east].at).toEqual(P(51_980, 0));
    const t = traceStage(2, slanted(51_980), xs, f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok, t.ok ? '' : `${t.code} ${t.detail}`).toBe(true);
    if (!t.ok) return;
    expect(verticesWith(f.plat, 'gate', `gate:${String(100 + east)}`)).toEqual([DECK.b]);
    expect(spanOf(f.plat)).toEqual({ joined: true, between: 0 });
  });

  // The gate's snap to its way's own vertex (N-4; C-0244, C-0452 (4)): a crossing of the dry approach edge 40 cm before
  // the bridge's west deck end takes that deck end — the way's own vertex there, no sub-edge shorter than twice the
  // attraction distance beside a gate — and nothing is split at the crossing.
  it('a crossing 40 cm from a way vertex takes that vertex as its gate; nothing split beside it', { timeout: 120_000 }, () => {
    const f = fixture();
    const xs = boundaryCrossings(slanted(49_960), wayLines(f.k, f.ways), f.site.centre);
    const east = xs.findIndex((c) => Math.abs(c.at.y) <= 1);
    expect(xs[east].at).toEqual(P(49_960, 0));
    const t = traceStage(2, slanted(49_960), xs, f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok, t.ok ? '' : `${t.code} ${t.detail}`).toBe(true);
    if (!t.ok) return;
    expect(verticesWith(f.plat, 'gate', `gate:${String(100 + east)}`)).toEqual([DECK.a]);
    expect(vertexAt(f.plat, P(49_960, 0))).toBe(-1);
    expect(spanOf(f.plat)).toEqual({ joined: true, between: 0 });
  });

  // L31 (C-0324 (3); C-0452 (L31)): a later stage's trace crossing water while an earlier enceinte holds water gates
  // commits, its water gates the lowest gate:w<i> no earlier gate holds — the earlier enceinte's ids untouched. A river
  // band across the frame east of the pond: stage 2's outline crosses it twice (its two water gates gate:w0, gate:w1),
  // stage 3's, 100 m outside it, twice again.
  it('a stage-3 trace over the water after stage 2\'s water gates commits with the lowest free ones, gate:w2 and gate:w3', { timeout: 120_000 }, () => {
    const f = fixture(true, true);
    const o2 = densify([P(-40_000, -40_000), P(80_000, -40_000), P(80_000, 40_000), P(-40_000, 40_000)]);
    const t2 = traceStage(2, o2, boundaryCrossings(o2, wayLines(f.k, f.ways), f.site.centre), f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t2.ok, t2.ok ? '' : `${t2.code} ${t2.detail}`).toBe(true);
    if (!t2.ok) return;
    expect(t2.value.waterGates.map((g) => g.id)).toEqual(['gate:w0', 'gate:w1']);
    const o3 = densify([P(-50_000, -50_000), P(90_000, -50_000), P(90_000, 50_000), P(-50_000, 50_000)]);
    const t3 = traceStage(3, o3, boundaryCrossings(o3, wayLines(f.k, f.ways), f.site.centre), f.slice, f.commit.plaza, t2.value.traced.line, f.k, { water: f.water, firstOrdinal: 200, earlierWaterGates: 2 });
    expect(t3.ok, t3.ok ? '' : `${t3.code} ${t3.detail}`).toBe(true);
    if (!t3.ok) return;
    expect(t3.value.waterGates.map((g) => g.id).sort()).toEqual(['gate:w2', 'gate:w3']);
    expect(t2.value.enceinte.gates.filter((g) => g.startsWith('gate:w'))).toEqual(['gate:w0', 'gate:w1']);
    for (const id of ['gate:w0', 'gate:w1', 'gate:w2', 'gate:w3']) expect(verticesWith(f.plat, 'gate_end', id), id).toHaveLength(2);
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
