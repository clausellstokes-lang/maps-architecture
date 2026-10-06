// M0-c-02: the registered EnceinteStrategy `base` on the S3 slice (§4.2 S3 (9), §4.4 S5a *Trace* (1)–(3), §4.12, §2.7;
// C-0032): §4.2 S3 (9)'s test — every gate vertex on the committed trace exactly (lattice equality), the trace within
// 40 m of the boundary everywhere — the mandatory wall chain and its gate vertices, the minimal Enceinte and Gate
// records, the smoothing and the simplify's bounds read from walls.json, barrier closure as the identity, the policy's
// staged branches, and the run's determinism.
import { describe, expect, it } from 'vitest';
import { STAGES, type Kernel } from '@plat/kernel';
import type { GateSite } from '@plat/model';
import { baseEnceinte, commitOuterRing, commitS3Slice, ENCEINTE_STRATEGY_ID, flatFixture, s3Slice, siteContext, traceBase } from '../../src/index.js';
import { cityCommitted, closedChain, densify, edgesOf, edgesWith, GROUND, kernelFor, maxDeparture, P, ringDist, smallCommitted, smallSite, verticesWith, wallsWith } from './support.js';

const WALL = { role: 'wall', entity: 'enceinte:1' };
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
      expect(Math.abs(dep - c.commit.traced.report.departureCm)).toBeLessThan(150);
    }, 60_000);
  }
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
