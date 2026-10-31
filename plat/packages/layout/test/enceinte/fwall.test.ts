// M0-c-02: F-WALL's trace rungs M0 builds (§5.2 F-WALL; C-0085): a boundary with a notch narrower than twice the 40 m
// band, its walls pulled together by the cost surface, makes the smoothed trace self-touch; the re-offset rung (the
// closing by the band's radius, C-0226 (6)), then the topology-preserving union-simplify rung, each reached by its own
// fixture and reported; a trace neither repairs is refused (the later rungs are M1's). A notch twice the band or wider
// takes no rung.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import type { LatticePoint } from '@plat/kernel';
import type { CostField, GateSite, Pulled } from '../../src/index.js';
import { commitOuterRing, defectOf, outwardNormals, rungVerdict, selfTouches, siteContext, traceBase, wetSides } from '../../src/index.js';
import { touchPairs } from '../../src/enceinte/plane.js';
import { smoothKeptSimple, untangle } from '../../src/enceinte/pull.js';
import { closedChain, densify, kernelFor, maxDeparture, P, smallSite, verticesWith } from './support.js';

type Corner = readonly [number, number];
const TOP = (w: number): Corner[] => [[w / 2, 30000], [w / 2, 20000], [-w / 2, 20000], [-w / 2, 30000]];
const BOTTOM = (w: number): Corner[] => [[-w / 2, -30000], [-w / 2, -20000], [w / 2, -20000], [w / 2, -30000]];
/** A 600 m square with a notch down from its north side and, optionally, one up from its south side. */
const square = (top: Corner[], bottom: Corner[] = []): Corner[] => [[-30000, -30000], ...bottom, [30000, -30000], [30000, 30000], ...top, [-30000, 30000]];
/** High ground along the north notch's centre line: standing nearer x = 0 there costs less (a ridge down the notch). */
const ridge: CostField = (q) => (Math.abs(q.x) < 6000 && q.y > 15000 ? Math.abs(q.x) / 100 : 0);

function run(corners: Corner[], gates: Corner[], cost?: CostField, core: Corner[][] = []) {
  const site = smallSite(2);
  const { plat, k } = kernelFor(site);
  expect(commitOuterRing(site, k).ok).toBe(true);
  const sites: GateSite[] = gates.map(([x, y], i) => ({ ordinal: i, at: P(x, y), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false }));
  const boundary = densify(corners);
  const r = traceBase(boundary, sites, [], site.terrain, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, {
    ...(cost === undefined ? {} : { costField: cost }),
    core: core.map((ring) => ring.map(([x, y]) => P(x, y))),
  });
  return { r, plat, boundary, sites };
}

const SIDES: Corner[] = [[-30000, 0], [30000, 0], [0, -30000]];

describe('F-WALL\'s trace rungs (C-0085)', () => {
  it('a 60 m notch (narrower than twice the band) whose walls the pull brings together self-touches; the re-offset rung repairs it', () => {
    const { r, plat, boundary, sites } = run(square(TOP(6000)), SIDES, ridge);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const rep = r.value.traced.report;
    expect(rep.rungs).toEqual([{ rung: 'reoffset', cause: 'self_touch', radiusCm: 4000, held: true }]);
    const wall = closedChain(plat, { role: 'wall', entity: 'enceinte:1' });
    expect(selfTouches(wall)).toBe(false);
    // The notch is closed off: no wall vertex inside it below its mouth's last 10 m.
    expect(wall.some((q) => Math.abs(q.x) < 2900 && q.y < 29000 && q.y > 20000)).toBe(false);
    expect(maxDeparture(wall, boundary)).toBeLessThanOrEqual(4000);
    for (const s of sites) expect(verticesWith(plat, 'gate', `gate:${String(s.ordinal)}`)).toEqual([s.at]);
  }, 60_000);

  it('the same notch at 100 m (wider than twice the band) takes no rung: its walls stop 20 m apart', () => {
    const { r } = run(square(TOP(10000)), SIDES, ridge);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.traced.report.rungs).toEqual([]);
  }, 60_000);

  it('with a gate on the wall of a second, 70 m notch the re-offset would close over, the re-offset loses the gate and the union-simplify rung repairs the trace', () => {
    const gates: Corner[] = [[-30000, 0], [30000, 0], [-3500, -25000]];
    const { r, plat, boundary, sites } = run(square(TOP(6000), BOTTOM(7000)), gates, ridge);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.traced.report.rungs).toEqual([
      { rung: 'reoffset', cause: 'self_touch', radiusCm: 4000, held: false, why: 'pin_lost' },
      { rung: 'union_simplify', cause: 'self_touch', radiusCm: 0, held: true },
    ]);
    const wall = closedChain(plat, { role: 'wall', entity: 'enceinte:1' });
    expect(selfTouches(wall)).toBe(false);
    expect(maxDeparture(wall, boundary)).toBeLessThanOrEqual(4000);
    for (const s of sites) expect(verticesWith(plat, 'gate', `gate:${String(s.ordinal)}`)).toEqual([s.at]);
    // The gated notch stands: the wall still runs down into it.
    expect(wall.some((q) => q.y > -25500 && q.y < -24500 && Math.abs(q.x + 3500) <= 1)).toBe(true);
  }, 60_000);

  it('a trace crossing the core that neither rung repairs is refused, E_SELF_INTERSECT, nothing committed', () => {
    // A core ring straddling the boundary's east side: the closing adds no ground on a straight side, the union keeps it.
    const core: Corner[][] = [[[28000, -2000], [33000, -2000], [33000, 2000], [28000, 2000]]];
    const { r, plat } = run(square([]), [[-30000, 0], [0, -30000]], undefined, core);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe('E_SELF_INTERSECT');
      // The residual class, F-WALL's later rungs (RL2's proof, C-0454): pinned verbatim (J263 Q6). The pull untangled and
      // the boundary as given cross the core as well, so the round's re-run of steps (2) – (3) cannot hold.
      expect(r.detail).toBe("F-WALL: the trace crosses the core after the re-offset and union-simplify rungs on the pulled line, the pull untangled and the boundary as given; the later rungs are notBuilt('M1') (§5.2; C-0085)");
    }
    expect(() => closedChain(plat, { role: 'wall', entity: 'enceinte:1' })).toThrow();
  }, 60_000);

  it('a boundary as given that touches itself (a slot 20 cm wide, a gate on its wall) is the later rungs\' class: refused, the message naming notBuilt(\'M1\') verbatim (RL2; C-0454)', () => {
    // The re-offset closes the slot over the gate (pin_lost); the union keeps the slot (its walls do not overlap); the pull
    // untangled and the boundary unpulled are the boundary itself, so no line of the round's re-run holds either.
    const slot: Corner[] = [[10, 30000], [10, 20000], [-10, 20000], [-10, 30000]];
    const { r, plat } = run(square(slot), [[-30000, 0], [30000, 0], [10, 25000]]);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe('E_SELF_INTERSECT');
      expect(r.detail).toBe("F-WALL: the trace touches itself after the re-offset and union-simplify rungs on the pulled line, the pull untangled and the boundary as given; the later rungs are notBuilt('M1') (§5.2; C-0085)");
    }
    expect(() => closedChain(plat, { role: 'wall', entity: 'enceinte:1' })).toThrow();
  }, 60_000);

  it('the detection: a self-touch (sides within the attraction distance, or crossing) and a crossing of the core', () => {
    const sq = [P(0, 0), P(10000, 0), P(10000, 10000), P(0, 10000)];
    expect(defectOf(sq, [])).toBeNull();
    expect(defectOf(sq, [[P(4000, 4000), P(6000, 4000), P(6000, 6000)]])).toBeNull();
    expect(defectOf(sq, [[P(9000, 4000), P(11000, 4000), P(11000, 6000)]])).toBe('core');
    expect(defectOf(sq, [[P(20000, 4000), P(21000, 4000), P(21000, 6000)]])).toBe('core');
    // A slot whose two walls pass 20 cm apart touches; 30 cm apart does not.
    const slot = (gap: number) => [P(0, 0), P(10000, 0), P(10000, 10000), P(5000 + gap, 10000), P(5000 + gap, 2000), P(5000, 2000), P(5000, 10000), P(0, 10000)];
    expect(defectOf(slot(20), [])).toBe('self_touch');
    expect(defectOf(slot(30), [])).toBeNull();
    // A figure of eight crosses itself.
    expect(defectOf([P(0, 0), P(10000, 10000), P(10000, 0), P(0, 10000)], [])).toBe('self_touch');
  });

  it('the detection\'s fold-back clause alone: a sliver triangle (every pair of its sides adjacent) folds back on itself; a right triangle does not (N-4, M34)', () => {
    // At (100, 0) m the side back to (−100, 0.1) m leaves within a hair of the side from the origin: no non-adjacent pair
    // of sides exists to see it.
    expect(selfTouches([P(0, 0), P(10000, 0), P(-10000, 10)])).toBe(true);
    expect(selfTouches([P(0, 0), P(10000, 0), P(0, 10000)])).toBe(false);
  });

  it('a rung holds only within the band: a repaired trace departing more than 40 m from the boundary is not taken', () => {
    const boundary = [P(0, 0), P(60000, 0), P(60000, 60000), P(0, 60000)];
    // 39 m out along the south side, on the boundary elsewhere: within.
    const within = [P(0, -3900), P(60000, -3900), P(60000, 60000), P(0, 60000)];
    expect(rungVerdict(within, boundary, 4000, [])).toBeNull();
    // 41 m out along the south side: beyond the band.
    const beyond = [P(0, -4100), P(60000, -4100), P(60000, 60000), P(0, 60000)];
    expect(rungVerdict(beyond, boundary, 4000, [])).toBe('band');
    expect(rungVerdict(beyond, boundary, 4200, [])).toBeNull();
    // The defects come first.
    expect(rungVerdict([P(0, 0), P(10000, 10000), P(10000, 0), P(0, 10000)], boundary, 4000, [])).toBe('self_touch');
    expect(rungVerdict(within, boundary, 4000, [[P(70000, 70000), P(71000, 70000), P(71000, 71000)]])).toBe('core');
  });
});

describe('the pull\'s own crossings undone (Q122, Q88 / Q46; C-0454)', () => {
  /** A spiky star: `n` corners alternating `outer` and `inner` cm from the origin, counter-clockwise, its sides densified at 10 m. */
  const star = (n: number, outer: number, inner: number, jitter: (i: number) => number = () => 0): LatticePoint[] =>
    densify(Array.from({ length: n }, (_, i) => {
      const a = (2 * Math.PI * i) / n;
      const r = (i % 2 === 0 ? outer : inner) + jitter(i);
      return [Math.round(r * Math.cos(a)), Math.round(r * Math.sin(a))] as const;
    }));
  const pulledBy = (ring: readonly LatticePoint[], offsets: readonly number[]): Pulled => {
    const nm = outwardNormals(ring);
    return { line: ring.map((p, i) => ({ x: p.x + offsets[i] * nm[i].x, y: p.y + offsets[i] * nm[i].y })), offsetsCm: [...offsets], moved: offsets.filter((o) => o !== 0).length, maxOffsetCm: Math.max(...offsets.map((o) => Math.abs(o))) };
  };
  const dry = wetSides([], 0);

  it('a 10 m notch whose walls the pull moves 8 m into it crosses itself; untangled, no two sides touch and every offset is the pull\'s halved or none', () => {
    const ring = densify(square(TOP(1000)));
    expect(selfTouches(ring)).toBe(false);
    // The notch's walls (|x| = 5 m, below its mouth): their outward normals face each other across the notch.
    const offsets = ring.map((q) => (Math.abs(q.x) === 500 && q.y > 21000 && q.y < 29000 ? 800 : 0));
    const pulled = pulledBy(ring, offsets);
    expect(touchPairs(pulled.line).length).toBeGreaterThan(0);
    const u = untangle(ring, pulled, dry);
    expect(touchPairs(u.line)).toEqual([]);
    expect(u.moved).toBeGreaterThan(0);
    u.offsetsCm.forEach((s, i) => {
      expect(Math.abs(s)).toBeLessThanOrEqual(Math.abs(offsets[i]));
      if (s !== 0) expect(Math.sign(s)).toBe(Math.sign(offsets[i]));
      if (s === 0) expect(u.line[i]).toEqual(ring[i]);
    });
  });

  it('property: on a simple ring, any pull along the normals untangles to a line no two sides of which touch (fast-check)', () => {
    fc.assert(
      fc.property(fc.integer({ min: 8, max: 40 }).map((h) => h * 2), fc.array(fc.integer({ min: -3974, max: 3974 }), { minLength: 80, maxLength: 80 }), fc.array(fc.integer({ min: -800, max: 800 }), { minLength: 80, maxLength: 80 }), (n, offs, jit) => {
        const ring = star(n, 20000, 13000, (i) => jit[i]);
        fc.pre(!selfTouches(ring));
        const pulled = pulledBy(ring, ring.map((_, i) => offs[i % offs.length]));
        expect(touchPairs(untangle(ring, pulled, dry).line)).toEqual([]);
      }),
      { numRuns: 100 },
    );
  }, 600_000);

  it('property: the smoothing kept simple leaves a simple line simple, its pins exact (fast-check)', () => {
    fc.assert(
      fc.property(fc.integer({ min: 4, max: 12 }).map((h) => h * 2), fc.array(fc.integer({ min: -2000, max: 2000 }), { minLength: 24, maxLength: 24 }), fc.integer({ min: 0, max: 7 }), (n, jit, every) => {
        const ring = star(n, 20000, 6000, (i) => jit[i]);
        fc.pre(!selfTouches(ring));
        const pinned = Uint8Array.from(ring.map((_, i) => (every > 0 && i % (every + 1) === 0 ? 1 : 0)));
        const out = smoothKeptSimple(ring, pinned, 3, ring, 4000, [], dry);
        expect(selfTouches(out)).toBe(false);
        ring.forEach((p, i) => {
          if (pinned[i] === 1) expect(out[i]).toEqual(p);
        });
      }),
      { numRuns: 40 },
    );
  }, 600_000);
});
