// The stage strips' water proof with a stop withheld (N-16; C-0292 (2), C-0449 (16)): the strip stand-in is handed
// S5a's stops less the pond's water stop, the pond staying in the water set, so its setback lines run over the pond —
// and S5a's proof inside the strips' batch refuses them, naming the setback vertex or edge in the water, nothing of the
// strips written. On span.test's hand-built site (the pond east of the town, the way over its deck).
import { describe, expect, it, vi } from 'vitest';
import { err, isVertexLive, outgoing, rowKey, rowsOn, STAGES, type Kernel, type KernelTx, type LatticePoint, type Plat, type StageId } from '@plat/kernel';
import type { Bridge, Cm, Lifecycle, WaterBody, WaterSet } from '@plat/model';
import { commitOuterRing, commitRoutes, commitS3Slice, flatFixture, s3Slice, type RoutePoint, type S4Route } from '../../../src/index.js';
import { boundaryCrossings, traceStage, wayLines } from '../../../src/growth/boundary.js';
import { GROUND, kernelFor, P } from './support.js';

/** The water stop the strip stand-in is not handed (a body's id), or none. */
const handed: { withheld: string | null } = { withheld: null };

vi.mock('../../../src/enceinte/strips.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/enceinte/strips.js')>();
  return {
    ...real,
    layStrips: (...args: Parameters<typeof real.layStrips>) => {
      const [enceinte, era, k, opts] = args;
      const stops = handed.withheld === null ? opts?.stops : opts?.stops?.filter((s) => !(s.kind === 'water' && s.gate === handed.withheld));
      return real.layStrips(enceinte, era, k, { ...opts, ...(stops === undefined ? {} : { stops }) });
    },
  };
});

const GENERATED: Lifecycle = { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };

function l0(): KernelTx {
  return { key: GROUND, level: 0, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S1 as StageId }, stage: STAGES.S1 as StageId, rederivesFrom: STAGES.S1 as StageId, workLimit: 10_000_000 };
}

const POND: LatticePoint[] = [P(50_000, -3000), P(52_000, -3000), P(52_000, 3000), P(50_000, 3000)];
const DECK = { id: 'bridge:1', a: P(50_000, 0), b: P(52_000, 0) };

/** The pond on L0 with its deck's two ends (written here, as span.test lays it). */
function layPond(k: Kernel): WaterSet {
  const id = 'river:1';
  const pts = [POND[0], POND[1], DECK.b, POND[2], POND[3], DECK.a];
  const knots = [
    { index: 2, role: 'deck_end', ordinal: 1, entity: DECK.id },
    { index: 5, role: 'deck_end', ordinal: 0, entity: DECK.id },
  ];
  const r = k.tx(l0(), (o) => {
    const ins = k.geom.insertChain(o, pts, [{ role: 'shore', entity: id }, { role: 'bank', entity: id }], 'mandatory', { closed: true, knots, pinned: knots.map((x) => x.index) });
    if (!ins.ok) return err(ins.code, ins.detail);
    const loc = k.geom.pointLocate(GROUND, 0, P(51_000, 1500));
    if (loc.on !== 'face') throw new Error('proof.test: no pond face');
    const own = k.geom.setOwner(o, [loc.face], id);
    if (!own.ok) return own;
    return k.geom.pinVertices(o, [
      { role: 'deck_end', entity: DECK.id, ordinal: 0 },
      { role: 'deck_end', entity: DECK.id, ordinal: 1 },
    ]);
  });
  if (!r.ok) throw new Error(`proof.test: the pond was refused: ${r.code} ${r.detail}`);
  const body = { id, kind: 'river', face: { owner: id, level: 0 }, shore: { role: 'shore', entity: id }, lifecycle: GENERATED } as WaterBody;
  const bridge: Bridge = { id: DECK.id, state: 'site', way: null, deck: [{ role: 'deck_end', entity: DECK.id, ordinal: 0 }, { role: 'deck_end', entity: DECK.id, ordinal: 1 }], over: 'river', spanCm: 2000 as Cm, lifecycle: GENERATED };
  return { bodies: [body], bridges: [bridge] };
}

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
 * A puddle 15 m off the stage's south side (its wall along y = −400 m): a triangle whose tip reaches 13 m from the wall,
 * across the outer strip's 15 m setback line, between two of that line's vertices.
 */
const PUDDLE: LatticePoint[] = [P(1_050, -42_500), P(1_450, -42_500), P(1_250, -41_300)];

function layPuddle(k: Kernel): WaterBody {
  const id = 'river:3';
  const r = k.tx(l0(), (o) => {
    const ins = k.geom.insertChain(o, PUDDLE, [{ role: 'shore', entity: id }, { role: 'bank', entity: id }], 'mandatory', { closed: true });
    if (!ins.ok) return err(ins.code, ins.detail);
    const loc = k.geom.pointLocate(GROUND, 0, P(1_250, -42_000));
    if (loc.on !== 'face') throw new Error('proof.test: no puddle face');
    return k.geom.setOwner(o, [loc.face], id);
  });
  if (!r.ok) throw new Error(`proof.test: the puddle was refused: ${r.code} ${r.detail}`);
  return { id, kind: 'river', face: { owner: id, level: 0 }, shore: { role: 'shore', entity: id }, lifecycle: GENERATED } as WaterBody;
}

/** The site with S3's commits, the pond, the puddle and the way over the deck. */
function fixture(): { plat: Plat; k: Kernel; water: WaterSet; ways: string[]; site: ReturnType<typeof flatFixture>; slice: ReturnType<typeof s3Slice>; commit: Extract<ReturnType<typeof commitS3Slice>, { ok: true }>['value'] } {
  const site = flatFixture(1, { frameAreaHa: 400, walledHa: 30 });
  const slice = s3Slice(site);
  const { plat, k } = kernelFor(site);
  expect(commitOuterRing(site, k).ok).toBe(true);
  const pond = layPond(k);
  const water: WaterSet = { bodies: [...pond.bodies, layPuddle(k)], bridges: pond.bridges };
  const c = commitS3Slice(slice, k, { outerRing: 'present', water });
  if (!c.ok) throw new Error(`proof.test: S3's commits were refused: ${c.code} ${c.detail}`);
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
  const r = commitRoutes([route], k, { tables: site.tables, rung: 'CITY', spacingCm: 2500, water: [POND], bridges: water.bridges });
  if (!r.ok) throw new Error(`proof.test: the way was refused: ${r.code} ${r.detail}`);
  return { plat, k, water, ways: r.value.network.ways.map((w) => w.id), site, slice, commit: c.value };
}

/** The live vertices on a `setback` edge of `enceinte`. */
function setbackVertices(p: Plat, enceinte: string): number {
  let n = 0;
  for (let v = 0; v < p.slots.vertex.top; v += 1) {
    if (!isVertexLive(p, v)) continue;
    if (outgoing(p, v as never).some((h) => rowsOn(p, 'edge', h).some((x) => rowKey(p, x).role === 'setback' && rowKey(p, x).entity === enceinte))) n += 1;
  }
  return n;
}

describe("S5a's strips with the pond's stop withheld (N-16)", () => {
  // The outline's east side x = y + 48 000 meets the way 20 m before the bridge; the strips end at the pond's banks.
  const outline = densify([P(-40_000, -40_000), P(8_000, -40_000), P(88_000, 40_000), P(-40_000, 40_000)]);

  it('handed every stop, the strips are laid and keep off the pond and the puddle', { timeout: 120_000 }, () => {
    handed.withheld = null;
    const f = fixture();
    const t = traceStage(2, outline, boundaryCrossings(outline, wayLines(f.k, f.ways), f.site.centre), f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    expect(t.ok, t.ok ? '' : `${t.code} ${t.detail}`).toBe(true);
    expect(setbackVertices(f.plat, 'enceinte:2')).toBeGreaterThan(0);
  });

  it("the puddle's stop withheld: a setback edge crossing it between two dry vertices refuses the strips' batch, nothing written", { timeout: 120_000 }, () => {
    handed.withheld = 'river:3';
    const f = fixture();
    const t = traceStage(2, outline, boundaryCrossings(outline, wayLines(f.k, f.ways), f.site.centre), f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    handed.withheld = null;
    expect(t.ok).toBe(false);
    if (t.ok) return;
    expect(t.code).toBe('E_INVARIANT');
    expect(t.detail).toMatch(/^S5a's strips: a setback edge of enceinte:2 \(-?\d+, -?\d+\) → \(-?\d+, -?\d+\) crosses river:3 at \(1\d\d\d, -41\d\d\d\) \(§4\.8: the strips end at the banks\)$/);
    expect(setbackVertices(f.plat, 'enceinte:2')).toBe(0);
  });

  it("the pond's stop withheld: a setback vertex in the pond refuses the strips' batch, nothing written", { timeout: 120_000 }, () => {
    handed.withheld = 'river:1';
    const f = fixture();
    const t = traceStage(2, outline, boundaryCrossings(outline, wayLines(f.k, f.ways), f.site.centre), f.slice, f.commit.plaza, f.commit.traced.line, f.k, { water: f.water, firstOrdinal: 100 });
    handed.withheld = null;
    expect(t.ok).toBe(false);
    if (t.ok) return;
    expect(t.code).toBe('E_INVARIANT');
    expect(t.detail).toMatch(/^S5a's strips: a setback vertex of enceinte:2 \(\d+, -?\d+\) lies in river:1 \(§4\.8: the strips end at the banks\)$/);
    expect(setbackVertices(f.plat, 'enceinte:2')).toBe(0);
  });
});
