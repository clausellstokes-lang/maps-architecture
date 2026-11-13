// M0-c-02 hardening round S7 — Q173 with Q187 (a): THE V AT A PINNED GATE (C-0505; §4.4 S5a *Trace* (2), (3)).
// The pulled trace crosses each arterial as the picked boundary did: neither the pull nor the smoothing nor the simplify
// closes the line into a spike at a gate. Each gate holds a FLOOR — the simplify's own, 100° (walls.json
// `trace/simplifyMinAngleCdeg`; "no interior angle < 100°", read as the kernel's simplify reads it: the unsigned angle
// between the two sides, 180° on a straight line), or the handed boundary's own angle there where that is sharper.
// (b) THE FAST PIN: a hand boundary cut from the stage-2 boundary relief-60 default seed 118 hands the trace (gate:8,
//     squared to its way, its neighbours 15 m off on the way's normal; checks/M0-c-04-s6-evidence/q173-diagnosis.txt),
//     a way laid through the gate with its vertex 55 cm inside it, and a cost surface that draws the line inward: before
//     the round the pull drew the gate's neighbours inward, the simplify dropped them (their sides shorter than 20 m)
//     and the insertion attracted both legs of the V onto the way's vertex — refused; now it commits with the gate on
//     the trace, the wall one closed chain and the angle at the gate at its floor or above.
// (c) THE PROPERTY over the item's own seeds: the small flat site's slices, seeds 1 – 12, each traced under two cost
//     surfaces (flat; a pit at the town's centre drawing every free vertex inward): no committed trace carries an angle
//     under its gate's floor; and (fast-check) where no gate's angle goes under its floor the pull and the smoothing are
//     as before the round, path for path (the floors given or not).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { STAGES, type Kernel, type KernelTx, type LatticePoint, type StageId } from '@plat/kernel';
import type { GateSite } from '@plat/model';
import { commitOuterRing, pullAndPin, s3Slice, siteContext, smoothPinned, traceBase, wetSides } from '../../src/index.js';
import { cosAt, pinFloors } from '../../src/enceinte/pull.js';
import { lat, openRing } from '../../src/enceinte/plane.js';
import { closedChain, commitSite, GROUND, kernelFor, P, smallSite } from './support.js';

/** The unsigned angle at b between a and c, in degrees (written here, independent of the code under test). */
function angleAt(a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }): number {
  const ux = a.x - b.x;
  const uy = a.y - b.y;
  const vx = c.x - b.x;
  const vy = c.y - b.y;
  return (Math.atan2(Math.abs(ux * vy - uy * vx), ux * vx + uy * vy) * 180) / Math.PI;
}

/** The angle at each gate of a closed line (its two neighbours on the line), keyed by the gate's point. */
function gateAngles(line: readonly { x: number; y: number }[], gates: readonly { x: number; y: number }[]): number[] {
  const n = line.length;
  return gates.map((g) => {
    const i = line.findIndex((q) => q.x === g.x && q.y === g.y);
    if (i < 0) return Number.NaN;
    return angleAt(line[(i + n - 1) % n], line[i], line[(i + 1) % n]);
  });
}

/** The floor of the round (C-0505): 100°, or the boundary's own angle at the gate where that is sharper. */
const FLOOR_DEG = 100;

// Relief-60 default seed 118's stage-2 boundary as the growth stage handed it, ring indices 214 – 226 around gate:8
// (80444, −38971), closed far inside the town; counter-clockwise.
const WINDOW: LatticePoint[] = [
  P(75540, -44629), P(76428, -42975), P(77434, -42231), P(78557, -42396), P(79557, -41592), P(80523, -40469), P(80444, -38971),
  P(80365, -37473), P(79619, -36501), P(78218, -35174), P(76252, -34145), P(74833, -32796), P(73960, -31127), P(60000, -20000), P(60000, -60000),
];
const GATE = P(80444, -38971);
/** The way through the gate: the way's own vertex 55 cm inside it (the dump's way:3 there). */
const WAY: LatticePoint[] = [P(79307, -39045), P(80389, -38974), GATE, P(81500, -38900)];
/** The cost surface drawing every free vertex inward: lower nearer the town's centre (the origin). */
const PIT = (p: { x: number; y: number }): number => Math.hypot(p.x, p.y) / 100;

function handState(): { k: Kernel; site: ReturnType<typeof smallSite> } {
  const site = smallSite(2);
  const { k } = kernelFor(site);
  expect(commitOuterRing(site, k).ok).toBe(true);
  const L1: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S4 as StageId }, stage: STAGES.S4 as StageId, rederivesFrom: STAGES.S4 as StageId, workLimit: 1_000_000 };
  expect(k.tx(L1, (o) => k.geom.insertChain(o, WAY, [{ role: 'way', entity: 'way:3' }], 'mandatory', {})).ok).toBe(true);
  return { k, site };
}

describe('(b) the V at a pinned gate, on a hand boundary squared at its gate (Q173; C-0505)', () => {
  const gates: GateSite[] = [{ ordinal: 8, at: GATE, bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false }];
  const mask = Uint8Array.from(WINDOW.map((q) => (q.x === GATE.x && q.y === GATE.y ? 1 : 0)));
  const g = WINDOW.findIndex((q) => q.x === GATE.x && q.y === GATE.y);

  it('the handed boundary crosses square at the gate: its two neighbours 15 m off on the way\'s normal, the angle 180°', () => {
    expect(angleAt(WINDOW[g - 1], GATE, WINDOW[g + 1])).toBeGreaterThan(179);
    for (const q of [WINDOW[g - 1], WINDOW[g + 1]]) expect(Math.round(Math.hypot(q.x - GATE.x, q.y - GATE.y))).toBe(1500);
  });

  it('the pull, the smoothing and the floors: the free pull draws a spike at the gate, the floored pull and smoothing keep 100°', () => {
    const floors = pinFloors(WINDOW, mask, 10_000);
    expect(floors[g]).toBeCloseTo(Math.cos((100 * Math.PI) / 180), 12);
    expect(Number.isNaN(floors[g + 1])).toBe(true);
    expect(cosAt(WINDOW[g - 1], GATE, WINDOW[g + 1])).toBeCloseTo(-1, 6);
    const dry = wetSides([], 0);
    const free = pullAndPin(WINDOW, mask, PIT, 4000, [], dry);
    expect(angleAt(free.line[g - 1], GATE, free.line[g + 1])).toBeLessThan(FLOOR_DEG);
    const held = pullAndPin(WINDOW, mask, PIT, 4000, [], dry, floors);
    expect(held.line[g]).toEqual(GATE);
    expect(angleAt(held.line[g - 1], GATE, held.line[g + 1])).toBeGreaterThanOrEqual(FLOOR_DEG - 1e-9);
    // The floored pull still pulls: the line moves inward elsewhere.
    expect(held.moved).toBeGreaterThan(4);
    const smooth = openRing(smoothPinned(held.line, mask, 3, WINDOW, 4000, [], dry, floors));
    const s = smooth.findIndex((q) => q.x === GATE.x && q.y === GATE.y);
    expect(angleAt(smooth[(s + smooth.length - 1) % smooth.length], GATE, smooth[(s + 1) % smooth.length])).toBeGreaterThanOrEqual(FLOOR_DEG - 1e-9);
  });

  it('a gate the boundary already crosses at a spike keeps that crossing as its floor: the floor is the handed angle, the pull still pulls', () => {
    // A diamond with its gate at a 53.13° tip (2 · atan ½), densified every 10 m; counter-clockwise.
    const corners: [number, number][] = [[-10000, -10000], [10000, -10000], [30000, 0], [10000, 10000], [-10000, 10000]];
    const ring: LatticePoint[] = [];
    corners.forEach(([x, y], i) => {
      const [x1, y1] = corners[(i + 1) % corners.length];
      const steps = Math.ceil(Math.hypot(x1 - x, y1 - y) / 1000);
      for (let t = 0; t < steps; t += 1) ring.push(lat({ x: x + ((x1 - x) * t) / steps, y: y + ((y1 - y) * t) / steps }));
    });
    const tip = ring.findIndex((q) => q.x === 30000 && q.y === 0);
    const gates = Uint8Array.from(ring.map((_q, i) => (i === tip ? 1 : 0)));
    const handed = angleAt(ring[tip - 1], ring[tip], ring[tip + 1]);
    expect(handed).toBeLessThan(FLOOR_DEG);
    const floors = pinFloors(ring, gates, 10_000);
    expect(floors[tip]).toBeCloseTo(Math.cos((handed * Math.PI) / 180), 12);
    const dry = wetSides([], 0);
    const held = pullAndPin(ring, gates, PIT, 4000, [], dry, floors);
    expect(held.moved).toBeGreaterThan(ring.length / 2);
    expect(angleAt(held.line[tip - 1], ring[tip], held.line[tip + 1])).toBeGreaterThanOrEqual(handed - 1e-9);
  });

  it('through the strategy: the trace commits, the gate on it at its point, the wall one closed chain, the angle at the gate at its floor or above', () => {
    const { k, site } = handState();
    const t = traceBase(WINDOW, gates, [], site.terrain, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, { costField: PIT, stage: 2, enceinteId: 'enceinte:2' });
    expect(t.ok ? 'ok' : `${t.code} ${t.detail}`).toBe('ok');
    if (!t.ok) return;
    const p = k.plat(GROUND);
    const r = k.resolve({ role: 'gate', entity: 'gate:8' }, GROUND);
    expect(r.view === 'vertices' ? r.vertices.map((v) => ({ x: p.vertices.x[v], y: p.vertices.y[v] })) : []).toEqual([GATE]);
    // One closed chain: every vertex of the wall of degree 2 (none of degree 3, `branches`).
    const wall = closedChain(p, { role: 'wall', entity: 'enceinte:2' });
    expect(wall.length).toBeGreaterThan(3);
    const [onLine] = gateAngles(t.value.traced.line, [GATE]);
    expect(onLine).toBeGreaterThanOrEqual(FLOOR_DEG - 1e-9);
    // The committed run (the insertion's attraction moves a vertex by 26 cm at most): the angle within a degree.
    const [committed] = gateAngles(wall, [GATE]);
    expect(committed).toBeGreaterThanOrEqual(FLOOR_DEG - 1);
  }, 120_000);
});

describe('(c) property over the item\'s own seeds: no committed trace carries an angle under its gate\'s floor (C-0505)', () => {
  const FIELDS: readonly [string, ((p: { x: number; y: number }) => number) | null][] = [
    ['flat', null],
    ['a pit at the centre', PIT],
  ];
  for (const [name, field] of FIELDS) {
    it(`the small flat site, seeds 1 – 12, ${name}: every gate at or above its floor on the committed line`, () => {
      const short: string[] = [];
      for (let seed = 1; seed <= 12; seed += 1) {
        const slice = s3Slice(smallSite(seed));
        const c = commitSite(smallSite(seed), field === null ? {} : { costField: field });
        const line = c.commit.traced.line;
        // The boundary as the trace takes it: the slice's outline with the gates as vertices.
        const outline = openRing(slice.levelSet.outline.map((q) => lat(q)));
        const gatesAt = slice.gates.map((s) => s.at);
        const angles = gateAngles(line, gatesAt);
        gatesAt.forEach((at, j) => {
          const i = outline.findIndex((q) => q.x === at.x && q.y === at.y);
          const own = i < 0 ? 180 : angleAt(outline[(i + outline.length - 1) % outline.length], at, outline[(i + 1) % outline.length]);
          const floor = Math.min(FLOOR_DEG, own);
          if (!(angles[j] >= floor - 1e-9)) short.push(`seed ${String(seed)} gate:${String(slice.gates[j].ordinal)} ${angles[j].toFixed(2)}° < ${floor.toFixed(2)}°`);
        });
      }
      expect(short).toEqual([]);
    }, 900_000);
  }

  it('property: where the free pull and smoothing keep every gate\'s floor, the floored ones are the same, path for path (fast-check)', () => {
    const dry = wetSides([], 0);
    let kept = 0;
    fc.assert(
      fc.property(fc.integer({ min: 8, max: 30 }).map((h) => h * 2), fc.array(fc.integer({ min: -800, max: 800 }), { minLength: 60, maxLength: 60 }), fc.integer({ min: 2, max: 9 }), fc.integer({ min: 0, max: 2 }), (n, jit, every, kind) => {
        const ring: LatticePoint[] = [];
        for (let i = 0; i < n; i += 1) {
          const r = (i % 2 === 0 ? 20000 : 16000) + jit[i % jit.length];
          ring.push(lat({ x: r * Math.cos((2 * Math.PI * i) / n), y: r * Math.sin((2 * Math.PI * i) / n) }));
        }
        const gates = Uint8Array.from(ring.map((_, i) => (i % every === 0 ? 1 : 0)));
        const cost = kind === 0 ? PIT : kind === 1 ? (p: { x: number; y: number }): number => -Math.hypot(p.x, p.y) / 100 : (p: { x: number; y: number }): number => Math.abs(Math.hypot(p.x, p.y) - 21000) / 100;
        const floors = pinFloors(ring, gates, 10_000);
        const free = pullAndPin(ring, gates, cost, 4000, [], dry);
        const freeSmooth = smoothPinned(free.line, gates, 3, ring, 4000, [], dry);
        const keeps = (line: readonly { x: number; y: number }[]): boolean => ring.every((_q, i) => gates[i] === 0 || cosAt(line[(i + n - 1) % n], line[i], line[(i + 1) % n]) <= floors[i] + 1e-12);
        if (!keeps(free.line) || !keeps(freeSmooth)) return;
        kept += 1;
        const held = pullAndPin(ring, gates, cost, 4000, [], dry, floors);
        expect(held.offsetsCm).toEqual(free.offsetsCm);
        expect(smoothPinned(held.line, gates, 3, ring, 4000, [], dry, floors)).toEqual(freeSmooth);
      }),
      { numRuns: 100 },
    );
    expect(kept).toBeGreaterThan(0);
  }, 600_000);
});
