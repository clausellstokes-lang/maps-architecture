// M0-c-02: the registered EnceinteStrategy `base` on the S3 slice (§4.2 S3 (9), §4.4 S5a *Trace* (1)–(3), §4.12, §2.7;
// C-0032): §4.2 S3 (9)'s test — every gate vertex on the committed trace exactly (lattice equality), the trace within
// 40 m of the boundary everywhere — the mandatory wall chain and its gate vertices, the minimal Enceinte and Gate
// records, the smoothing and the simplify's bounds read from walls.json, barrier closure as the identity, the policy's
// staged branches, and the run's determinism.
import { describe, expect, it } from 'vitest';
import { STAGES, type Kernel, type KernelTx, type LatticePoint, type StageId } from '@plat/kernel';
import type { GateSite } from '@plat/model';
import { baseEnceinte, commitOuterRing, commitS3Slice, ENCEINTE_STRATEGY_ID, flatFixture, s3Slice, siteContext, traceBase } from '../../src/index.js';
import { ccw, departure, DEPARTURE_TOL_CM, lat, openRing } from '../../src/enceinte/plane.js';

const PINNED_OUTWARD = { moved: 165, line: 78, departureCm: 3943.41539784994 };
import { cityCommitted, closedChain, commitSite, densify, edgesOf, edgesWith, GROUND, handBuildWater, kernelFor, maxDeparture, P, ringDist, smallCommitted, smallSite, verticesWith, WALL, wallsWith } from './support.js';

const SEEDS = [1, 7];

describe('§4.2 S3 (9)\'s test on the CITY flat fixture', () => {
  for (const seed of SEEDS) {
    it(`seed ${String(seed)}: every gate vertex lies on the committed trace exactly; the trace departs from the boundary by ≤ 40 m everywhere`, () => {
      const c = cityCommitted(seed);
      const wall = closedChain(c.plat, WALL);
      expect(c.slice.gates.length).toBe(c.slice.n);
      for (const g of c.slice.gates) {
        // Lattice equality: the gate's point is a vertex of the wall chain, and that vertex carries the gate's row.
        expect(wall.some((q) => q.x === g.at.x && q.y === g.at.y)).toBe(true);
        expect(verticesWith(c.plat, 'gate', `gate:${String(g.ordinal)}`)).toEqual([g.at]);
      }
      // Measured here from the arena, every 50 cm along the committed wall, against the slice's boundary outline.
      const dep = maxDeparture(wall, c.slice.levelSet.outline);
      expect(dep).toBeLessThanOrEqual(4000);
      // The report's figure is the exact largest distance to within its stated tolerance below it (N-7); the 50 cm samples
      // here read at most 25 cm below the exact one.
      const rep = c.commit.traced.report.departureCm;
      expect(dep).toBeLessThanOrEqual(rep + DEPARTURE_TOL_CM);
      expect(rep - dep).toBeLessThanOrEqual(25);
    }, 60_000);
  }
});

describe('§4.2 S3 (9)\'s band held on every side, measured from the arena (C-0232; check B-1)', () => {
  // Fields asking for more than the band: farther from the centre costs less (a town in a bowl), or nearer does. On the
  // small site's seed 6 the smoothing used to bow sides between guarded vertices out of the band (41.6 m and 43.0 m).
  const FIELDS = {
    outward: (p: { x: number; y: number }): number => -Math.hypot(p.x, p.y) / 100,
    inward: (p: { x: number; y: number }): number => Math.hypot(p.x, p.y) / 100,
  };
  for (const [name, field] of Object.entries(FIELDS)) {
    it(`small seed 6, the ${name} field: the committed wall departs from the boundary by ≤ 40 m everywhere, every gate on it exactly`, () => {
      const c = commitSite(smallSite(6), { costField: field });
      const wall = closedChain(c.plat, WALL);
      expect(maxDeparture(wall, c.slice.levelSet.outline, 25)).toBeLessThanOrEqual(4000);
      expect(c.commit.traced.report.departureCm).toBeLessThanOrEqual(4000);
      expect(c.commit.traced.report.pull.maxOffsetCm).toBeGreaterThan(3000);
      for (const g of c.slice.gates) expect(verticesWith(c.plat, 'gate', `gate:${String(g.ordinal)}`)).toEqual([g.at]);
    }, 120_000);
  }

  it('a trace that cannot keep the band is refused E_INVARIANT `band`, nothing committed: a boundary grazing a lake whose shore lies 100 m off it (the band measured from the boundary as given, not the water-spliced ring)', () => {
    const site = smallSite(2);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    // A lake of radius 100 m centred on the boundary's east side, its ring turned 7.5° so no vertex lies on that side.
    const lake = Array.from({ length: 24 }, (_v, i) => {
      const a = ((i + 0.5) * Math.PI) / 12;
      return P(Math.round(30000 + 10000 * Math.cos(a)), Math.round(10000 * Math.sin(a)));
    });
    const water = handBuildWater(k, lake, 'lake:1', P(30000, 0));
    const ring = densify([[-30000, -30000], [30000, -30000], [30000, 30000], [-30000, 30000]]);
    const gates: GateSite[] = [
      { ordinal: 0, at: P(-30000, 0), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false },
      { ordinal: 1, at: P(0, -30000), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false },
    ];
    const r = traceBase(ring, gates, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    // Refused before the batch, by the proof on the line (not left to the batch's own check after the insertion).
    expect(r.detail).toMatch(/^band: the trace departs from its boundary by more than 4000 cm on \d+ side\(s\)/);
    expect(edgesWith(plat, 'wall')).toEqual([]);
  }, 60_000);
});

describe('the departure measure (N-7): the exact largest distance, to a stated tolerance', () => {
  it('reads a side\'s farthest point between metre samples: never above the exact value, never more than DEPARTURE_TOL_CM below it', () => {
    // A side from (0, −50.5) m to (0, 50) m inside a 200 m square: its distance from the ring is 100 m − |y|, largest at
    // y = 0, which metre samples along the 100.5 m side miss by 24.75 cm.
    const ring = [P(-10000, -10000), P(10000, -10000), P(10000, 10000), P(-10000, 10000)];
    const d = departure([P(0, -5050), P(0, 5000), P(-3000, 0)], ring);
    expect(DEPARTURE_TOL_CM).toBe(0.5);
    expect(d).toBeLessThanOrEqual(10000);
    expect(d).toBeGreaterThanOrEqual(10000 - DEPARTURE_TOL_CM);
  });
});

describe('the band proved again inside the batch, on the wall as committed (C-0232 (2); N-8)', () => {
  // A 300 m round town (a vertex every 2°) with a 60 m bay bowed into its east side, under a field asking for more than
  // the band: the pulled line stands 39.74 m out, and the simplify's chord across the bay's bottom, from (280.78, 8.24) m to
  // (284.84, 21.22) m, runs 39.93 m from the boundary at its farthest (the simplify holds sides to the band less 1 cm).
  const BAY: LatticePoint[] = [];
  for (let i = 0; i < 360; i += 2) {
    const d = ((i + 180) % 360) - 180;
    const r = 30000 - (Math.abs(d) < 30 ? 6000 * Math.cos((d / 30) * (Math.PI / 2)) ** 2 : 0);
    BAY.push(P(Math.round(r * Math.cos((i * Math.PI) / 180)), Math.round(r * Math.sin((i * Math.PI) / 180))));
  }
  const GATE: GateSite[] = [{ ordinal: 0, at: BAY[90], bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false }];
  const outward = (p: { x: number; y: number }): number => -Math.hypot(p.x, p.y) / 100;
  const L1: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S4 as StageId }, stage: STAGES.S4 as StageId, rederivesFrom: STAGES.S4 as StageId, workLimit: 1_000_000 };

  it('a way\'s vertex 25 cm beyond that chord\'s farthest point, 40.18 m from the boundary: the insertion routes the wall through it (§3.6 step 3) and the batch is refused E_INVARIANT `band`, nothing written', () => {
    const site = smallSite(2);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    expect(k.tx(L1, (o) => k.geom.insertChain(o, [P(28282, 1392), P(29282, 1392)], [{ role: 'way', entity: 'way:stub' }], 'mandatory', {})).ok).toBe(true);
    const r = traceBase(BAY, GATE, [], site.terrain, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, { costField: outward });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toMatch(/^band: the inserted trace departs from its boundary by more than 4000 cm from /);
    expect(edgesWith(plat, 'wall')).toEqual([]);
  }, 60_000);

  it('without the way the same trace commits, its chord across the bay 39.93 m out at most (the line the batch was given keeps the band)', () => {
    const site = smallSite(2);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const r = traceBase(BAY, GATE, [], site.terrain, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, { costField: outward });
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    if (!r.ok) return;
    const wall = closedChain(plat, WALL);
    expect(wall.some((q) => q.x === 28078 && q.y === 824)).toBe(true);
    expect(wall.some((q) => q.x === 28484 && q.y === 2122)).toBe(true);
    const dep = maxDeparture(wall, BAY, 10);
    expect(dep).toBeGreaterThan(3990);
    expect(dep).toBeLessThanOrEqual(3999);
  }, 60_000);
});

describe('the barred rings proved again on the wall as committed (N-11, N-18: the in-commit edge proof; §4.4 *Water and the waterfront*)', () => {
  // A 600 m square town on flat ground with a core ring (C-0232's barred rings: the water's and the core's) 10 cm inside its
  // south side, and a way's vertex in the core 20 cm off the side: the insertion routes the wall through it (§3.6 step 3),
  // so two wall edges dip 20 cm into the core — edges over a barred ring the line the batch was given never had (its
  // sides keep 10 cm off). With water in the core's place the insertion lays any vertex within its attraction distance of
  // the shore onto the shore (probed: a way's vertex 19 – 20 cm into a pond lands on the shore and the wall commits dry),
  // so the barred ring here is the core's; the proof is one for both (`committedWetEdge`).
  const SQUARE = densify([[-30000, -30000], [30000, -30000], [30000, 30000], [-30000, 30000]]);
  const CORE = [P(0, -29990), P(2000, -29990), P(2000, -29000), P(0, -29000)];
  const GATE: GateSite[] = [{ ordinal: 0, at: P(-30000, 0), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false }];
  const L1: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S4 as StageId }, stage: STAGES.S4 as StageId, rederivesFrom: STAGES.S4 as StageId, workLimit: 1_000_000 };
  const run = (stub: boolean): { r: ReturnType<typeof traceBase>; plat: ReturnType<typeof kernelFor>['plat'] } => {
    const site = smallSite(2);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    if (stub) expect(k.tx(L1, (o) => k.geom.insertChain(o, [P(1000, -29980), P(1000, -29200)], [{ role: 'way', entity: 'way:stub' }], 'mandatory', {})).ok).toBe(true);
    return { r: traceBase(SQUARE, GATE, [], site.terrain, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, { core: [CORE] }), plat };
  };

  it('a way\'s vertex in the core 20 cm off the side: the wall routed through it lies over the core, so the batch is refused E_INVARIANT `water`, nothing written', () => {
    const { r, plat } = run(true);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toBe('water: the committed wall edge -27000,-30000 → 1000,-29980 lies over water or a reservation and carries no wall_gate (§4.4 *Water and the waterfront*; N-54 (1))');
    expect(edgesWith(plat, 'wall')).toEqual([]);
  }, 60_000);

  it('without the way the same trace commits, its south side 10 cm off the core', () => {
    const { r, plat } = run(false);
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    expect(edgesWith(plat, 'wall').length).toBeGreaterThan(0);
  }, 60_000);
});

describe('the band measured from the boundary as given, never the ring after the water splice (C-0232 (3); N-9)', () => {
  // A 300 m round town (a vertex every 2°) crossed by a 40 m river (x 200–240 m). Where the boundary crosses it in the
  // north its course in the water leaves the circle 10 cm inside each shore and bows 24 m out (north) between: the
  // crossing's chord between the two banks lies on the spliced ring, and its middle 16 m and more from the boundary as
  // given.
  const onCircle = (x: number): LatticePoint => P(x, Math.round(Math.sqrt(30000 ** 2 - x ** 2)));
  const ROUND: LatticePoint[] = [];
  for (let i = 0; i < 360; i += 2) {
    const x = Math.round(30000 * Math.cos((i * Math.PI) / 180));
    const y = Math.round(30000 * Math.sin((i * Math.PI) / 180));
    if (x > 20000 && x < 24000 && y > 0) {
      if (x > 23000) ROUND.push(onCircle(23990), P(23990, onCircle(23990).y + 2400), P(20010, onCircle(20010).y + 2400), onCircle(20010));
      continue;
    }
    ROUND.push(P(x, y));
  }
  const RIVER40 = [P(20000, -90000), P(24000, -90000), P(24000, 90000), P(20000, 90000)];
  const GATE: GateSite[] = [{ ordinal: 0, at: ROUND[90], bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false }];
  const run = (costField?: (p: { x: number; y: number }) => number): ReturnType<typeof traceBase> => {
    const site = smallSite(2);
    const { k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const water = handBuildWater(k, RIVER40, 'river:1', P(22000, 0));
    return traceBase(ROUND, GATE, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, costField === undefined ? {} : { costField });
  };

  it('on flat ground the trace keeps the chord and the report reads its departure from the boundary as given: 16 m and more', () => {
    const r = run();
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    if (!r.ok) return;
    expect(r.value.traced.waterGates).toHaveLength(2);
    expect(r.value.traced.report.departureCm).toBeGreaterThanOrEqual(1500);
    expect(r.value.traced.report.departureCm).toBeLessThanOrEqual(departure(r.value.traced.line, ccw(openRing(ROUND.map(lat)))) + DEPARTURE_TOL_CM);
  }, 60_000);

  it('under an outward field the smoothing holds the band of the boundary as given: the line and its departure pinned', () => {
    const r = run((p) => -Math.hypot(p.x, p.y) / 100);
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    if (!r.ok) return;
    const t = r.value.traced;
    expect({ moved: t.report.pull.moved, line: t.line.length, departureCm: t.report.departureCm }).toEqual(PINNED_OUTWARD);
  }, 60_000);
});

describe('the committed trace (§4.4 S5a (3): a mandatory L1 chain carrying wall, gate vertices carrying their gate)', () => {
  it('inserts one closed mandatory chain carrying only wall on the enceinte, at L1', () => {
    const site = smallSite(5);
    const slice = s3Slice(site);
    const { k } = kernelFor(site);
    const calls: { roles: unknown; cls: unknown; closed: unknown; n: number }[] = [];
    const spy: Kernel = {
      ...k,
      geom: {
        ...k.geom,
        insertChain: (o, pts, roles, cls, opts) => {
          calls.push({ roles, cls, closed: opts?.closed, n: pts.length });
          return k.geom.insertChain(o, pts, roles, cls, opts);
        },
      },
    };
    const r = commitS3Slice(slice, spy);
    expect(r.ok).toBe(true);
    const walls = calls.filter((c) => JSON.stringify(c.roles) === JSON.stringify([WALL]));
    expect(walls).toHaveLength(1);
    expect(walls[0].cls).toBe('mandatory');
    expect(walls[0].closed).toBe(true);
    if (!r.ok) return;
    expect(walls[0].n).toBe(r.value.traced.line.length);
  });

  it('every wall edge is an L1 edge carrying wall on the enceinte (no wall_gate without a water gate); the chain is one closed run', () => {
    const c = smallCommitted(5);
    const es = edgesWith(c.plat, 'wall');
    expect(es.length).toBeGreaterThan(10);
    for (const e of es) {
      expect(e.level).toBe(1);
      expect(e.rows.filter((r) => r.role === 'wall')).toEqual([{ role: 'wall', entity: 'enceinte:1', ordinal: 0 }]);
    }
    expect(edgesWith(c.plat, 'wall_gate')).toEqual([]);
    const run = c.k.resolve(WALL, GROUND);
    expect(run.view).toBe('edges');
    if (run.view === 'edges') expect(run.runs).toHaveLength(1);
    // The committed chain is the line the strategy reports — every one of its vertices — plus the strips' caps: the two
    // points per main gate where its corridor's edges cross the trace, each on a side of the line.
    const wall = closedChain(c.plat, WALL);
    const line = c.commit.traced.line;
    const k = (q: { x: number; y: number }): string => `${String(q.x)},${String(q.y)}`;
    const onWall = new Set(wall.map(k));
    for (const q of line) expect(onWall.has(k(q))).toBe(true);
    const inLine = new Set(line.map(k));
    const extra = wall.filter((q) => !inLine.has(k(q)));
    expect(extra).toHaveLength(2 * c.slice.gates.length);
    for (const q of extra) expect(ringDist(q, line)).toBeLessThanOrEqual(1);
  });

  it('writes the minimal Enceinte and one main Gate per gate site, in order, not counting water gates (none here)', () => {
    const c = smallCommitted(5);
    const e = c.commit.enceinte;
    const n = c.slice.gateSites.length;
    expect(n).toBe(c.slice.n);
    expect(e.id).toBe('enceinte:1');
    expect(e.trace).toEqual(WALL);
    expect(e.stage).toBe(1);
    expect(e.gates).toEqual(c.slice.gateSites.map((g) => `gate:${String(g.ordinal)}`));
    // walls.json's era row (C-0158): thickness 2 m, inner setback 7 m, outer setback and glacis 14 m.
    expect(e.thicknessCm).toBe(200);
    expect(e.setbackCm).toEqual({ inner: 700, outer: 1400 });
    expect(e.strips).toEqual({ inner: { owner: 'wall_strip:1-inner', level: 1 }, outer: { owner: 'wall_strip:1-outer', level: 1 } });
    expect(e.lifecycle.existence).toBe('generated');
    expect(c.commit.gates).toHaveLength(n);
    c.commit.gates.forEach((g, i) => {
      expect(g).toMatchObject({ id: `gate:${String(c.slice.gateSites[i].ordinal)}`, enceinte: 'enceinte:1', kind: 'main', way: null });
      expect(g.banks).toBeUndefined();
    });
    expect(c.commit.waterGates).toEqual([]);
  });
});

describe('pull, smooth and simplify on the flat fixture (§4.4 S5a (2), (3))', () => {
  it('the pull is the identity but for the pins on flat ground; 3 pinned smoothing passes; the simplify leaves no free vertex below 20 m or 100°', () => {
    const c = cityCommitted(1);
    const rep = c.commit.traced.report;
    expect(rep.pull).toEqual({ moved: 0, maxOffsetCm: 0 });
    expect(rep.smoothPasses).toBe(3);
    expect(rep.simplify.skipped).toBe(false);
    expect(rep.simplify.after).toBeLessThan(rep.simplify.before);
    expect(rep.rungs).toEqual([]);
    expect(rep.closure).toBe('ring');
    expect(rep.arcs).toEqual([{ from: 0, to: rep.arcs[0].to, defensibility: 'open' }]);
    const line = c.commit.traced.line;
    const gates = new Set(c.slice.gates.map((g) => `${String(g.at.x)},${String(g.at.y)}`));
    const n = line.length;
    let free = 0;
    for (let i = 0; i < n; i += 1) {
      const b = line[i];
      if (gates.has(`${String(b.x)},${String(b.y)}`)) continue;
      free += 1;
      const a = line[(i + n - 1) % n];
      const d = line[(i + 1) % n];
      const la = Math.hypot(a.x - b.x, a.y - b.y);
      const ld = Math.hypot(d.x - b.x, d.y - b.y);
      const cos = ((a.x - b.x) * (d.x - b.x) + (a.y - b.y) * (d.y - b.y)) / (la * ld);
      expect(la).toBeGreaterThanOrEqual(2000);
      expect(ld).toBeGreaterThanOrEqual(2000);
      // Interior angle ≥ 100° ⇔ cos ≤ cos 100°.
      expect(cos).toBeLessThanOrEqual(Math.cos((100 * Math.PI) / 180) + 1e-12);
    }
    expect(free).toBeGreaterThan(10);
  }, 60_000);

  it('reads the smoothing passes and the simplify\'s minimum segment from walls.json (a changed cell changes the trace)', () => {
    const base = smallCommitted(5);
    const noSmooth = commitSiteWith(5, wallsWith('trace', 'smoothPasses', 0));
    expect(noSmooth.commit.traced.report.smoothPasses).toBe(0);
    expect(noSmooth.commit.traced.line).not.toEqual(base.commit.traced.line);
    const longer = commitSiteWith(5, wallsWith('trace', 'simplifyMinSegmentM', 60));
    expect(longer.commit.traced.line.length).toBeLessThan(base.commit.traced.line.length);
    const line = longer.commit.traced.line;
    const gates = new Set(longer.slice.gates.map((g) => `${String(g.at.x)},${String(g.at.y)}`));
    const short = line.filter((b, i) => {
      if (gates.has(`${String(b.x)},${String(b.y)}`)) return false;
      const d = line[(i + 1) % line.length];
      const a = line[(i + line.length - 1) % line.length];
      return Math.hypot(d.x - b.x, d.y - b.y) < 6000 || Math.hypot(a.x - b.x, a.y - b.y) < 6000;
    });
    expect(short).toEqual([]);
  }, 60_000);
});

function commitSiteWith(seed: number, tables: ReturnType<typeof wallsWith>): ReturnType<typeof smallCommitted> {
  const site = smallSite(seed, { tables });
  const slice = s3Slice(site);
  const { plat, k } = kernelFor(site);
  const r = commitS3Slice(slice, k);
  if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
  return { site, slice, plat, k, commit: r.value };
}

describe('the registered strategy and its staged branches (§4.12; §4b)', () => {
  it('is registered as `base` and is the trace the commits run', () => {
    expect(ENCEINTE_STRATEGY_ID).toBe('base');
    expect(baseEnceinte.trace).toBe(traceBase);
  });

  it('refuses the waterfront policies and placements M1 builds, notBuilt(\'M1\')', () => {
    const site = smallSite(5);
    const slice = s3Slice(site);
    const { k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const run = (policy: { waterfront: 'open' | 'quay_wall' | 'sea_wall'; placement: 'aroundAll' | 'aroundStage' }) => () =>
      traceBase(slice.levelSet.outline, slice.gateSites, [], site.terrain, { bodies: [], bridges: [] }, policy, siteContext(site), k);
    expect(run({ waterfront: 'quay_wall', placement: 'aroundAll' })).toThrow(/notBuilt\('M1'\)/);
    expect(run({ waterfront: 'sea_wall', placement: 'aroundAll' })).toThrow(/notBuilt\('M1'\)/);
    expect(run({ waterfront: 'open', placement: 'aroundStage' })).toThrow(/notBuilt\('M1'\)/);
  });

  it('a gate site off its boundary is a caller\'s error (§4.4: every gate lies on the boundary it was picked on)', () => {
    const site = smallSite(5);
    const { k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const ring = densify([[-20000, -20000], [20000, -20000], [20000, 20000], [-20000, 20000]]);
    const off: GateSite = { ordinal: 0, at: P(0, 25000), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false };
    expect(() => traceBase(ring, [off], [], site.terrain, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k)).toThrow(RangeError);
    // A gate within the attraction distance of a side is put on it as a vertex.
    const near: GateSite = { ordinal: 0, at: P(5050, 20010), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false };
    const r = traceBase(ring, [near], [], site.terrain, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.traced.line.some((q) => q.x === 5050 && q.y === 20010)).toBe(true);
  });

  it('commits the trace in S5a\'s batch (§4.1\'s S5 row, k = 1) after S3\'s', () => {
    const site = smallSite(5);
    const slice = s3Slice(site);
    const { k } = kernelFor(site);
    const stages: number[] = [];
    const spy: Kernel = {
      ...k,
      tx: (spec, fn) => {
        stages.push(spec.level * 100 + (spec.stage as number));
        return k.tx(spec, fn);
      },
    };
    expect(commitS3Slice(slice, spy).ok).toBe(true);
    expect(stages).toEqual([STAGES.S1, 100 + STAGES.S3, 100 + STAGES.S5, 100 + STAGES.S5]);
  });
});

describe('determinism', () => {
  it('the same slice committed twice on fresh arenas gives the same arena, edge for edge', () => {
    const run = (): string[] => {
      const site = flatFixture(9, { frameAreaHa: 400, walledHa: 30 });
      const { plat, k } = kernelFor(site);
      const r = commitS3Slice(s3Slice(site), k);
      if (!r.ok) throw new Error(r.detail);
      return edgesOf(plat).map((e) => `${String(e.level)} ${String(e.a.x)},${String(e.a.y)} ${String(e.b.x)},${String(e.b.y)} ${JSON.stringify(e.rows)}`).sort();
    };
    expect(run()).toEqual(run());
  }, 60_000);
});
