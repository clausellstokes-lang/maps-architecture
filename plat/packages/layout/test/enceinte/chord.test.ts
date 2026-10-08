// M0-c-02 session round s2 (N-54 (1) residual; M0-e-06 s1 check note 14): a water gate's wet side IS its chord — one
// wall edge between its two gate_end vertices. On relief-60 CITY seed 9 (stage 2) gate:w0's chord ran from its bank pin
// (−13928, −90189) past the shore vertex (−13908, −90171), 27 cm along the shore and 11 cm off the chord, so the
// insertion routed it through that vertex (§3.6 step 3): a 27 cm shore edge carrying wall_gate, then a 47.25 m wet side
// ending on one pin only. The banks are now settled on the arena's vertices before they are pinned (water.ts), and the
// strategy's proofs are strict: a crossing with no clear chord is refused before the pull, and inside the batch each
// water gate's wall_gate run must be exactly one edge joining its two gate_end vertices (E_INVARIANT `water`, nothing
// written). The strict reading here is M0-e-06's receipt's, measured from the arena's own tables: a wall edge over the
// water (sampled every 25 cm, strictly inside and more than 2 cm from the shore) is gated only when it carries exactly
// one wall_gate row and joins that gate's two gate_end vertices.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { err, STAGES, type Kernel, type KernelTx, type LatticePoint, type StageId } from '@plat/kernel';
import type { GateSite, WaterSet } from '@plat/model';
import { commitOuterRing, crossWater, siteContext, traceBase, WET_TOL_CM } from '../../src/index.js';
import { ccw, lat, openRing } from '../../src/enceinte/plane.js';
import { densify, edgesWith, GROUND, handBuildWater, incidentRows, insideRing, kernelFor, P, ringDist, smallSite, verticesWith, type EdgeInfo } from './support.js';

type Pt = { x: number; y: number };
const same = (a: Pt, b: Pt): boolean => a.x === b.x && a.y === b.y;

/** The deepest point of segment ab inside the ring (cm; 0 when none lies inside), sampled every 25 cm. */
function depthOf(a: Pt, b: Pt, ring: readonly Pt[]): number {
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const dm = ringDist(mid, ring);
  if (dm > len / 2 + 10) return insideRing(ring, mid) ? dm : 0;
  const n = Math.max(2, Math.ceil(len / 25));
  let worst = 0;
  for (let s = 1; s < n; s += 1) {
    const q = { x: a.x + ((b.x - a.x) * s) / n, y: a.y + ((b.y - a.y) * s) / n };
    if (insideRing(ring, q)) worst = Math.max(worst, ringDist(q, ring));
  }
  return worst;
}

/** The strict reading (M0-e-06's): every wall edge of `entity` over the water, and how many of them are no gate's chord. */
function strictReading(plat: Parameters<typeof edgesWith>[0], entity: string, gates: readonly string[], ring: readonly Pt[]): { wet: EdgeInfo[]; ungated: EdgeInfo[] } {
  const wet = edgesWith(plat, 'wall', entity).filter((e) => depthOf(e.a, e.b, ring) > WET_TOL_CM);
  const ungated = wet.filter((e) => {
    const gs = e.rows.filter((r) => r.role === 'wall_gate' && gates.includes(r.entity));
    if (gs.length !== 1) return true;
    const ends = [0, 1].map((o) => verticesWith(plat, 'gate_end', gs[0].entity, o));
    if (ends.some((v) => v.length !== 1)) return true;
    return !((same(e.a, ends[0][0]) && same(e.b, ends[1][0])) || (same(e.a, ends[1][0]) && same(e.b, ends[0][0])));
  });
  return { wet, ungated };
}

/** An L1 open chain carrying stage 1's wall, hand-built through the façade (what a stage-2 trace meets in the arena). */
function handBuildWall(k: Kernel, pts: readonly LatticePoint[]): void {
  const spec: KernelTx = {
    key: GROUND,
    level: 1,
    ops: [],
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: STAGES.S5 as StageId },
    stage: STAGES.S5 as StageId,
    rederivesFrom: STAGES.S5 as StageId,
    workLimit: 10_000_000,
  };
  const r = k.tx(spec, (o) => {
    const a = k.geom.insertChain(o, pts, [{ role: 'wall', entity: 'enceinte:1' }], 'mandatory', {});
    return a.ok ? a : err(a.code, a.detail);
  });
  if (!r.ok) throw new Error(`chord.test: the stage-1 wall stub was refused: ${r.code} ${r.detail}`);
}

describe('the relief-60 CITY seed 9 stage-2 replay: gate:w0\'s chord from pin to pin (N-54 (1) residual)', () => {
  interface Fixture {
    frame: { widthCm: number; heightCm: number; aspect: number; marginShare: number };
    boundary: [number, number][];
    gateSites: { ordinal: number; at: [number, number]; bearingCdeg: number }[];
    plaza: [number, number][];
    core: [number, number][][];
    water: { body: string; ring: [number, number][]; within: [number, number] };
    costs: Record<string, number>;
  }
  const fx = JSON.parse(readFileSync(new URL('./fixtures/relief60-s9-stage2.json', import.meta.url), 'utf8')) as Fixture;
  const pts = (l: readonly [number, number][]): LatticePoint[] => l.map(([x, y]) => P(x, y));
  const RING = pts(fx.water.ring);
  /** The old pin, the shore vertex 27 cm from it the chord passed 11 cm off, and the far pin (gate:w0). */
  const OLD_PIN = P(-13928, -90189);
  const SHORE_V = P(-13908, -90171);
  const FAR_PIN = P(-9391, -88784);

  function replay(stub?: readonly LatticePoint[]): { plat: ReturnType<typeof kernelFor>['plat']; water: WaterSet; r: ReturnType<typeof traceBase> } {
    const base = smallSite(1);
    const site = { ...base, frame: fx.frame as unknown as typeof base.frame };
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const water = handBuildWater(k, RING, fx.water.body, P(fx.water.within[0], fx.water.within[1]));
    if (stub !== undefined) handBuildWall(k, stub);
    const gates: GateSite[] = fx.gateSites.map((g) => ({ ordinal: g.ordinal, at: P(g.at[0], g.at[1]), bearingCdeg: g.bearingCdeg as GateSite['bearingCdeg'], kind: 'main', forced: false }));
    const r = traceBase(pts(fx.boundary), gates, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, {
      stage: 2,
      enceinteId: 'enceinte:2',
      core: [pts(fx.plaza), ...fx.core.map(pts)],
      costField: (p) => fx.costs[`${String(p.x)},${String(p.y)}`] ?? 0,
    });
    return { plat, water, r };
  }

  it('commits with every water gate\'s chord one wall edge from gate_end 0 to gate_end 1: 0 ungated wet sides under the strict reading', () => {
    const { plat, r } = replay();
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const wgs = r.value.traced.waterGates;
    expect(wgs.map((g) => g.id)).toEqual(['gate:w0', 'gate:w1', 'gate:w2', 'gate:w3']);
    for (const g of wgs) {
      const mine = edgesWith(plat, 'wall_gate', g.id);
      const ends = [0, 1].map((o) => verticesWith(plat, 'gate_end', g.id, o));
      expect({ gate: g.id, edges: mine.length, ends: ends.map((v) => v.length) }).toEqual({ gate: g.id, edges: 1, ends: [1, 1] });
      const e = mine[0];
      expect((same(e.a, ends[0][0]) && same(e.b, ends[1][0])) || (same(e.a, ends[1][0]) && same(e.b, ends[0][0]))).toBe(true);
      // Both ends on the river's shore.
      for (const v of ends) expect(incidentRows(plat, v[0]).some((q) => q.role === 'shore' && q.entity === fx.water.body)).toBe(true);
    }
    const s = strictReading(plat, 'enceinte:2', wgs.map((g) => g.id), RING);
    expect(s.wet).toHaveLength(4);
    expect(s.ungated).toEqual([]);
    // gate:w0: its bank 0 settled onto the shore vertex the chord used to pass, and the chord runs from it to the far pin;
    // the old pin is no wall vertex and the 27 cm shore edge carries no wall row.
    expect(verticesWith(plat, 'gate_end', 'gate:w0', 0)).toEqual([SHORE_V]);
    expect(verticesWith(plat, 'gate_end', 'gate:w0', 1)).toEqual([FAR_PIN]);
    expect(wgs[0].bankAt.map((q) => ({ x: q.x, y: q.y }))).toEqual([SHORE_V, FAR_PIN]);
    const wall = edgesWith(plat, 'wall', 'enceinte:2');
    expect(wall.some((e) => same(e.a, OLD_PIN) || same(e.b, OLD_PIN))).toBe(false);
    expect(edgesWith(plat, 'wall_gate', 'gate:w0').map((e) => [e.a, e.b])).toEqual([expect.arrayContaining([SHORE_V, FAR_PIN])]);
  }, 300_000);

  it('the twin with the pin withheld — a stage-1 wall vertex in the water 10 cm off the chord, no shore vertex to settle on — is refused E_INVARIANT `water` before the pull, nothing written', () => {
    // A stub of stage 1's wall from 9.6 cm off gate:w0's chord (at 40 % of it) 3 m out into the river.
    const { plat, r } = replay([P(-12104, -89607), P(-12189, -89329)]);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toMatch(/^water: the crossing from -13908,-90171 to -9391,-88784 has no clear chord between its two bank pins \(its chord passes an existing vertex no shore holds/);
    expect(edgesWith(plat, 'wall', 'enceinte:2')).toEqual([]);
    expect(edgesWith(plat, 'wall_gate')).toEqual([]);
  }, 300_000);

  it('the twin whose chord the insertion splits — a stage-1 wall stub crossing gate:w0\'s chord in the water, 3 m each side — is refused inside the batch (the wall_gate run is 2 edges), nothing written', () => {
    const { plat, r } = replay([P(-11561, -89764), P(-11738, -89191)]);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toMatch(/^water: the water gate gate:w0's wall_gate run between -13908,-90171 and -9391,-88784 is 2 edges, not its one chord/);
    expect(edgesWith(plat, 'wall', 'enceinte:2')).toEqual([]);
    expect(edgesWith(plat, 'wall_gate')).toEqual([]);
    expect(verticesWith(plat, 'gate_end', 'gate:w0')).toEqual([]);
  }, 300_000);
});

describe('a synthetic graze: a shore vertex 27 cm from the bank and 10 cm off the chord (crossWater\'s settling)', () => {
  // A 16 m river (in x; about 15 m across) whose shores run at 22° to the boundary's west side x = −300 m, so the side
  // crosses it along a 40 m chord from (−300, 5) m on the west shore to (−300, −35) m on the east shore. The west shore
  // carries a vertex V at (−300.10, 4.75) m: 26.9 cm along the shore from the bank point, 10 cm off the chord.
  const RIVER = [P(-54000, -59500), P(-30010, 475), P(-6000, 60500), P(-4400, 60500), P(-52400, -59500)];
  const V = P(-30010, 475);
  const BANK = P(-30000, 500);
  const EXIT = P(-30000, -3500);
  const BOUNDARY = densify([[-30000, -30000], [30000, -30000], [30000, 30000], [-30000, 30000]]);

  it('crossWater moves the bank onto V (an L0 shore vertex where the trace attracts, C-0087): the chord V → exit is clear', () => {
    const ring = ccw(openRing(BOUNDARY.map(lat)));
    const r = crossWater(ring, new Set(), [{ body: 'river:1', ring: RIVER }]);
    const west = r.crossings.filter((c) => c.entry.x <= -30000 && c.exit.x <= -30000);
    expect(west).toHaveLength(1);
    const c = west[0];
    expect([c.entry, c.exit, c.chord, c.clear]).toEqual([V, EXIT, true, true]);
    expect(c.course).toEqual([V, EXIT]);
    expect(r.ring.some((q) => same(q, BANK))).toBe(false);
    expect(r.ring.some((q) => same(q, V))).toBe(true);
    expect(r.keep.has('-30010,475')).toBe(true);
    expect(r.keep.has('-30000,500')).toBe(false);
    // Every crossing is clear (the top side's chord passes no vertex).
    expect(r.crossings.every((q) => q.chord && q.clear)).toBe(true);
  });

  it('a vertex near the chord that no shore holds leaves the chord not clear; one that stays farther than 26 cm moves nothing', () => {
    const ring = ccw(openRing(BOUNDARY.map(lat)));
    const near = (extra: Pt) => (box: { minX: number; minY: number; maxX: number; maxY: number }) =>
      [...RIVER, extra].filter((q) => q.x >= box.minX && q.x <= box.maxX && q.y >= box.minY && q.y <= box.maxY);
    const blocked = crossWater(ring, new Set(), [{ body: 'river:1', ring: RIVER }], near(P(-29990, -2000)));
    const bc = blocked.crossings.find((c) => c.exit.x === -30000 && c.exit.y === -3500);
    expect(bc?.clear).toBe(false);
    const far = crossWater(ring, new Set(), [{ body: 'river:1', ring: RIVER }], near(P(-29970, -2000)));
    const fc = far.crossings.find((c) => c.exit.x === -30000 && c.exit.y === -3500);
    expect(fc?.clear).toBe(true);
    expect(fc?.entry).toEqual(V);
  });

  it('through the strategy: the trace commits with gate_end 0 on V and the chord V → exit one wall_gate edge; no wall edge leaves the old bank point', () => {
    const site = smallSite(2);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const water = handBuildWater(k, RIVER, 'river:1', P(-30000, -1500));
    const gates: GateSite[] = [
      { ordinal: 0, at: P(0, -30000), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false },
      { ordinal: 1, at: P(30000, 0), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false },
    ];
    const r = traceBase(BOUNDARY, gates, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const wgs = r.value.traced.waterGates;
    expect(wgs).toHaveLength(2);
    const w = wgs.find((g) => same(g.bankAt[0], V) || same(g.bankAt[1], V));
    expect(w).toBeDefined();
    if (w === undefined) return;
    expect(edgesWith(plat, 'wall_gate', w.id)).toHaveLength(1);
    const ends = [0, 1].map((o) => verticesWith(plat, 'gate_end', w.id, o)[0]);
    expect(ends).toEqual([V, EXIT]);
    const e = edgesWith(plat, 'wall_gate', w.id)[0];
    expect((same(e.a, V) && same(e.b, EXIT)) || (same(e.a, EXIT) && same(e.b, V))).toBe(true);
    expect(edgesWith(plat, 'wall').some((q) => same(q.a, BANK) || same(q.b, BANK))).toBe(false);
    const s = strictReading(plat, 'enceinte:1', wgs.map((g) => g.id), RIVER);
    expect(s.wet).toHaveLength(2);
    expect(s.ungated).toEqual([]);
  }, 120_000);
});
