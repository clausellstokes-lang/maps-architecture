// M0-c-02, two cuts at one point (C-0282 (7); §4.13 wall × frame): `clipOutside` (the strips' cut by their stops and
// the frame) and `crossWater` (the boundary's water crossings) wrap only on the last cut, so two coincident cuts — a gate
// corridor's flat cap lying on the map border, a boundary side through a shore vertex — are a stretch of no length,
// never the whole line again; and `layStrips` given the frame refuses a setback vertex beyond it (E_INVARIANT), nothing
// written. The registered fixture fixtures/ep20-496296019.json (EP-20 seed 496296019) is the case: a wrap on its
// coincident cuts keeps the whole glacis ring and sets setback vertices up to 125 cm beyond the frame.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { STAGES, type KernelTx, type StageId } from '@plat/kernel';
import type { Enceinte, GateSite } from '@plat/model';
import { commitOuterRing, crossWater, layStrips, siteContext, traceBase } from '../../src/index.js';
import { ccw, clipOutside, lat, openRing } from '../../src/enceinte/plane.js';
import { densify, edgesWith, GROUND, insideRing, kernelFor, P, ringDist, smallSite } from './support.js';

type Pt = { x: number; y: number };

/** Is q strictly inside one of the rings by more than `eps` cm? */
function deepIn(rings: readonly (readonly Pt[])[], q: Pt, eps = 0.01): boolean {
  return rings.some((r) => insideRing(r, q) && ringDist(q, r) > eps);
}

describe('clipOutside: two regions crossing the line at one point', () => {
  it('the line passes from one region into the other at a point: one piece, outside both, never the whole line', () => {
    const line = [P(0, 0), P(1000, 0), P(1000, 1000), P(0, 1000)];
    const A = [P(500, -100), P(1500, -100), P(1500, 100), P(500, 100)];
    const B = [P(-500, -100), P(500, -100), P(500, 100), P(-500, 100)];
    const pieces = clipOutside(line, true, [[A], [B]]);
    expect(pieces).toHaveLength(1);
    const p = pieces[0];
    expect(p.points[0]).toEqual({ x: 1000, y: 100 });
    expect(p.points[p.points.length - 1]).toEqual({ x: 0, y: 100 });
    expect(p.points.slice(1, -1)).toEqual([{ x: 1000, y: 1000 }, { x: 0, y: 1000 }]);
    for (const q of p.points) expect(deepIn([A, B], q)).toBe(false);
    // Each region on its own still clips as before.
    expect(clipOutside(line, true, [[A]])).toHaveLength(1);
    expect(clipOutside(line, true, [[B]])).toHaveLength(1);
  });

  it('a closed line cut twice on one side: the outside stretch still wraps round from the second cut to the first', () => {
    const line = [P(0, 0), P(1000, 0), P(1000, 1000), P(0, 1000)];
    // A triangle whose top corner the line's bottom side cuts through: two cuts on one side, the stretch between them
    // inside it.
    const T = [P(400, -200), P(600, -200), P(500, 100)];
    const pieces = clipOutside(line, true, [[T]]);
    expect(pieces).toHaveLength(1);
    expect(pieces[0].points.length).toBe(2 + 4);
  });
});

describe('crossWater: a boundary side through a shore vertex', () => {
  const ring = ccw(openRing([P(-10000, -10000), P(10000, -10000), P(10000, 10000), P(-10000, 10000)].map(lat)));
  const plain = [P(-2000, -50000), P(2000, -50000), P(2000, 50000), P(-2000, 50000)];
  // The same river with a vertex on its west shore exactly where the boundary's south side crosses it, and one on its
  // east shore where the north side crosses.
  const vertexed = [P(-2000, -50000), P(2000, -50000), P(2000, 10000), P(2000, 50000), P(-2000, 50000), P(-2000, -10000)];

  it('the ring and its crossings are those of the river without the vertex: one crossing per passage, the ring length unchanged', () => {
    const a = crossWater(ring, new Set(), [{ body: 'r', ring: plain }]);
    const b = crossWater(ring, new Set(), [{ body: 'r', ring: vertexed }]);
    expect(a.crossings).toHaveLength(2);
    expect(b.crossings).toHaveLength(2);
    expect(b.ring).toHaveLength(a.ring.length);
    expect(b.ring).toEqual(a.ring);
    expect(b.crossings.map((c) => [c.entry, c.exit, c.chord])).toEqual(a.crossings.map((c) => [c.entry, c.exit, c.chord]));
    expect([...b.keep].sort()).toEqual([...a.keep].sort());
    // Each crossing's course is its chord.
    for (const c of b.crossings) expect(c.course).toEqual([c.entry, c.exit]);
  });
});

/** An L1 spec at stage `s` for the tests' own batches. */
function spec(s: number): KernelTx {
  return { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: s as StageId }, stage: s as StageId, rederivesFrom: s as StageId, workLimit: 10_000_000 };
}

/** A minimal enceinte record over a committed `wall` chain. */
function enceinteOf(id: string): Enceinte {
  return { id, trace: { role: 'wall', entity: id }, gates: [] } as unknown as Enceinte;
}

/** Every live L1 setback vertex's inset in the frame box (cm; negative beyond it). */
function setbackInsets(plat: Parameters<typeof edgesWith>[0], frame: readonly Pt[]): number[] {
  const x0 = Math.min(...frame.map((q) => q.x));
  const x1 = Math.max(...frame.map((q) => q.x));
  const y0 = Math.min(...frame.map((q) => q.y));
  const y1 = Math.max(...frame.map((q) => q.y));
  return edgesWith(plat, 'setback').flatMap((e) => [e.a, e.b]).map((q) => Math.min(q.x - x0, x1 - q.x, q.y - y0, y1 - q.y));
}

describe('the strips at the frame: a corridor cap on the border, and the frame refusal', () => {
  it('a frame-arc gate whose corridor\'s flat cap lies on the map border: every setback vertex inside the frame', () => {
    const site = smallSite(2);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    expect(k.tx(spec(STAGES.S3), (o) => k.geom.insertChain(o, site.frameRing, [{ role: 'border', entity: site.terrain.id }], 'mandatory', { closed: true })).ok).toBe(true);
    const XB = Math.min(...site.frameRing.map((q) => q.x));
    // The town's west side is a 160 m side leaning 10° off the border, its gate at its middle where the glacis line
    // (15 m out along the side's normal) meets the border: the glacis crosses the border 2.6 m from the gate's line,
    // inside the gate corridor's flat cap, which the way's end (at the border) puts on the border's own line.
    const gy = 0;
    // cos 10° = 0.98481, sin 10° = 0.17365: 15 m · cos 10° = 1 477 cm; the side's half 80 m = (1 389, 7 878) cm.
    const gx = XB + 1477;
    const half = { x: 1389, y: 7878 };
    const at = P(gx, gy);
    const boundary = [
      ...densify([[XB + 3000, -30000], [-40000, -30000], [-40000, 30000], [XB + 3000, 30000]]).filter((q) => !(q.x === XB + 3000 && q.y < 30000 && q.y > -30000)),
      ...densify([[gx + half.x, gy + half.y], [gx - half.x, gy - half.y]], 1000).slice(0, 17),
    ];
    expect(boundary.some((q) => q.x === at.x && q.y === at.y)).toBe(true);
    const gates: GateSite[] = [{ ordinal: 0, at, bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false }];
    const t = traceBase(boundary, gates, [], site.terrain, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, { costField: () => 0 });
    expect(t.ok).toBe(true);
    if (!t.ok) return;
    const stops = [{ kind: 'way' as const, gate: 'gate:0', at, path: [{ x: gx + 5000, y: gy }, at, { x: XB, y: gy }], halfWidthCm: 700 }];
    const r = layStrips(t.value, site.tables.table('walls').row('era.default'), k, { stops, frame: site.frameRing });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    for (const l of [...r.value.lines.inner, ...r.value.lines.outer]) for (const q of l) expect(insideRing(site.frameRing, q) || ringDist(q, site.frameRing) <= 0).toBe(true);
    expect(Math.min(...setbackInsets(plat, site.frameRing))).toBeGreaterThanOrEqual(0);
  }, 120_000);

  it('given the frame, a setback vertex beyond it refuses the strips (E_INVARIANT), nothing written', () => {
    const site = smallSite(2);
    const { k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const ring = densify([[-30000, -30000], [30000, -30000], [30000, 30000], [-30000, 30000]]);
    expect(k.tx(spec(STAGES.S5), (o) => k.geom.insertChain(o, ring, [{ role: 'wall', entity: 'enceinte:1' }], 'mandatory', { closed: true })).ok).toBe(true);
    const v = k.plat(GROUND).version;
    // A frame cutting through the town: the inner setback line (never clipped by the frame) runs beyond it.
    const frame = [P(-40000, -40000), P(0, -40000), P(0, 40000), P(-40000, 40000)];
    const r = layStrips(enceinteOf('enceinte:1'), site.tables.table('walls').row('era.default'), k, { stops: [], frame });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe('E_INVARIANT');
      expect(r.detail).toMatch(/beyond the frame/);
    }
    expect(k.plat(GROUND).version).toBe(v);
    // The frame round the whole town: laid.
    const whole = [P(-90000, -90000), P(90000, -90000), P(90000, 90000), P(-90000, 90000)];
    expect(layStrips(enceinteOf('enceinte:1'), site.tables.table('walls').row('era.default'), k, { stops: [], frame: whole }).ok).toBe(true);
  }, 120_000);
});

describe('EP-20 seed 496296019 (wall × frame; N-54 (1) Q6)', () => {
  interface Fixture {
    frame: { widthCm: number; heightCm: number; aspect: number; marginShare: number };
    frameRing: [number, number][];
    trace: [number, number][];
    stops: { gate: string; at: [number, number]; path: [number, number][]; halfWidthCm: number }[];
    widths: { inner: number; outer: number };
  }
  const fx = JSON.parse(readFileSync(new URL('./fixtures/ep20-496296019.json', import.meta.url), 'utf8')) as Fixture;

  it('the seed\'s trace, stops and frame: the strips laid, every setback vertex inside the frame (it was 125 cm beyond)', () => {
    const base = smallSite(1);
    const frameRing = fx.frameRing.map(([x, y]) => P(x, y));
    const site = { ...base, frame: fx.frame as unknown as typeof base.frame, frameRing };
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    expect(k.tx(spec(STAGES.S3), (o) => k.geom.insertChain(o, frameRing, [{ role: 'border', entity: site.terrain.id }], 'mandatory', { closed: true })).ok).toBe(true);
    const trace = fx.trace.map(([x, y]) => P(x, y));
    expect(k.tx(spec(STAGES.S5), (o) => k.geom.insertChain(o, trace, [{ role: 'wall', entity: 'enceinte:1' }], 'mandatory', { closed: true })).ok).toBe(true);
    const stops = fx.stops.map((s) => ({ kind: 'way' as const, gate: s.gate, at: P(s.at[0], s.at[1]), path: s.path.map(([x, y]) => ({ x, y })), halfWidthCm: s.halfWidthCm }));
    const r = layStrips(enceinteOf('enceinte:1'), base.tables.table('walls').row('era.default'), k, { stops, frame: frameRing });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.widthsCm).toEqual(fx.widths);
    for (const l of [...r.value.lines.inner, ...r.value.lines.outer]) for (const q of l) expect(insideRing(frameRing, q) || ringDist(q, frameRing) <= 0).toBe(true);
    const insets = setbackInsets(plat, frameRing);
    expect(insets.length).toBeGreaterThan(50);
    expect(Math.min(...insets)).toBe(0);
  }, 120_000);
});
