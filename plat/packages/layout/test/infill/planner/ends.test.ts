// Step 7, the ends in the model (§4.6 step 7, GEO-21, J-P32; C-0046): each junction end extended along its arrival
// direction from the kerb to the crossed spine — the T-junction's planned point; an end with no spine beyond it (a wall
// strip's setback line) stays square on the kerb; an end on a hole is joined by connectHole; and the portal-gap
// slide: an end inside max(6 m, 2 × the wider lane's width) of an existing portal on a district-bounding spine slides
// along the spine out of the gap, toward the side that keeps its arrival within 85–95°, else the plan returns 'next
// rung'.
import { describe, expect, it } from 'vitest';
import { planCut, type KerbFace, type KerbSpine } from '../../../src/infill/planner.js';
import { asCut, CTX, dot, FACES, norm, ring, spineBeside, streamsFor, sub, unitV, withSpines } from './support.js';

/** The angle (degrees) between a leg and a spine direction, in [0, 90]. */
function arrivalDeg(leg: { x: number; y: number }, spineDir: { x: number; y: number }): number {
  const c = Math.abs(dot(unitV(leg), unitV(spineDir)));
  return (Math.acos(Math.min(1, c)) * 180) / Math.PI;
}

describe('step 7: the ends extended to the crossed spine', () => {
  it('a straight cut\'s two ends become T-junction points on the spines beside the kerb', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const p = asCut(planCut(FACES.rectangle, CTX, streamsFor(seed)));
      const [s, f] = p.cut.ends;
      expect(s.kind).toBe('spine');
      expect(f.kind).toBe('spine');
      expect(s.point.x).toBeCloseTo(p.start.A.x, 9);
      expect(s.point.y).toBe(-300);
      expect(f.point.y).toBe(7300);
      expect(f.point.x).toBeCloseTo(p.start.A.x, 9);
      expect(s.arrival.x).toBeCloseTo(0, 12);
      expect(s.arrival.y).toBe(-1);
      expect(p.cut.chain[0]).toEqual(s.point);
      expect(p.cut.chain[p.cut.chain.length - 1]).toEqual(f.point);
      expect(s.slidCm).toBe(0);
    }
  });

  it('a bent cut\'s far end is extended along its second leg', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const p = asCut(planCut(FACES.trapezoid, CTX, streamsFor(seed)));
      const f = p.cut.ends[1];
      expect(f.kind).toBe('spine');
      const last = p.cut.legs[p.cut.legs.length - 1];
      const prev = p.cut.legs[p.cut.legs.length - 2];
      // Collinear with the last leg, beyond the kerb, by about the spine's half-width.
      const leg = unitV(sub(last, prev));
      const ext = sub(f.point, last);
      expect(Math.abs(leg.x * ext.y - leg.y * ext.x)).toBeLessThan(1e-6);
      expect(dot(leg, ext)).toBeGreaterThan(299);
      expect(dot(leg, ext)).toBeLessThan(310);
    }
  });

  it('an end with no spine beyond it stays square on the kerb (a strip\'s setback line)', () => {
    const outer: [number, number][] = [[0, 0], [12000, 0], [12000, 7000], [0, 7000]];
    const all = withSpines(outer);
    // No spine on the south side: a setback line.
    const face: KerbFace = { rings: all.rings, spines: (all.spines ?? []).slice(1) };
    for (let seed = 1; seed <= 30; seed += 1) {
      const p = asCut(planCut(face, CTX, streamsFor(seed)));
      const s = p.cut.ends[0];
      expect(s.kind).toBe('kerb');
      expect(s.point).toEqual(s.kerbPoint);
      expect(s.point).toEqual(p.start.A);
      expect(s.index).toBe(-1);
      // Square to the line.
      expect(s.arrival.x).toBeCloseTo(0, 12);
      expect(s.arrival.y).toBe(-1);
      expect(p.cut.chain[0]).toEqual(p.start.A);
    }
  });

  it('reaches a spine within twice its half-width plus attractCm, no farther', () => {
    const base: [number, number][] = [[0, 0], [12000, 0], [12000, 7000], [0, 7000]];
    const near: KerbSpine = { points: [{ x: -2000, y: -626 }, { x: 14000, y: -626 }], halfWidthCm: 300 };
    const far: KerbSpine = { points: [{ x: -2000, y: -627 }, { x: 14000, y: -627 }], halfWidthCm: 300 };
    const p = asCut(planCut({ rings: [ring(base)], spines: [near] }, CTX, streamsFor(3)));
    const q = asCut(planCut({ rings: [ring(base)], spines: [far] }, CTX, streamsFor(3)));
    expect(p.cut.ends[0].kind).toBe('spine');
    expect(p.cut.ends[0].point.y).toBe(-626);
    expect(q.cut.ends[0].kind).toBe('kerb');
  });

  it('the first spine the arrival meets wins', () => {
    const base: [number, number][] = [[0, 0], [12000, 0], [12000, 7000], [0, 7000]];
    const a: KerbSpine = { points: [{ x: -2000, y: -500 }, { x: 14000, y: -500 }], halfWidthCm: 300 };
    const b: KerbSpine = { points: [{ x: -2000, y: -300 }, { x: 14000, y: -300 }], halfWidthCm: 300 };
    const p = asCut(planCut({ rings: [ring(base)], spines: [a, b] }, CTX, streamsFor(3)));
    expect(p.cut.ends[0].index).toBe(1);
    expect(p.cut.ends[0].point.y).toBe(-300);
  });
});

describe('step 7: the portal-gap slide', () => {
  /** A deep block (cuts ≈ 320 m long) whose south spine bounds the district. */
  const W = 40000;
  const H = 32000;
  const outer: [number, number][] = [[0, 0], [W, 0], [W, H], [0, H]];
  const deep = (portals: KerbSpine['portals'], bounding = true): KerbFace => {
    const f = withSpines(outer);
    const spines = (f.spines ?? []).slice();
    spines[0] = spineBeside(outer[0], outer[1], 300, 2000, { bounding, portals });
    return { rings: f.rings, spines };
  };
  const ctx = { ...CTX, depthRangeM: [24, 40] as const };

  it('slides an end inside a portal\'s gap to the gap\'s edge, on the nearer side, its arrival within 85–95°', () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      const free = asCut(planCut(deep([]), ctx, streamsFor(seed)));
      const s0 = free.cut.ends[0];
      expect(s0.kind).toBe('spine');
      // An existing portal 1 m east of the planned end, its lane 4 m wide: the gap is max(6, 2 × max(4, 5)) = 10 m.
      const portal = { at: { x: s0.point.x + 100, y: s0.point.y }, laneWidthCm: 400 };
      const p = asCut(planCut(deep([portal]), ctx, streamsFor(seed)));
      const s = p.cut.ends[0];
      expect(s.kind).toBe('spine');
      expect(s.slidCm).toBeCloseTo(900, 6);
      expect(s.point.y).toBeCloseTo(-300, 9);
      expect(portal.at.x - s.point.x).toBeCloseTo(1000, 6);
      const from = p.cut.legs[1];
      expect(arrivalDeg(sub(s.point, from), { x: 1, y: 0 })).toBeGreaterThanOrEqual(85);
      // The kerb point moved with it: on the kerb, on the new leg.
      expect(s.kerbPoint.y).toBeCloseTo(0, 6);
      expect(p.cut.legs[0]).toEqual(s.kerbPoint);
      const u = unitV(sub(s.point, from));
      const v = sub(s.kerbPoint, from);
      expect(Math.abs(u.x * v.y - u.y * v.x)).toBeLessThan(1e-6);
      // The chain starts at the slid junction.
      expect(p.cut.chain[0]).toEqual(s.point);
    }
  });

  it('sizes the gap as max(6 m, 2 × the wider lane\'s width)', () => {
    const free = asCut(planCut(deep([]), ctx, streamsFor(5)));
    const at = { x: free.cut.ends[0].point.x + 100, y: -300 };
    const cases: [number, number, number][] = [
      // [existing lane, new lane, gap]
      [250, 200, 600],
      [450, 200, 900],
      [250, 400, 800],
    ];
    for (const [lane, mine, gap] of cases) {
      const p = asCut(planCut(deep([{ at, laneWidthCm: lane }]), { ...ctx, newLaneWidthCm: mine }, streamsFor(5)));
      expect(p.cut.ends[0].slidCm).toBeCloseTo(gap - 100, 6);
    }
    // The new lane's default is the lane band's top, 5 m: a gap of 10 m.
    const d = asCut(planCut(deep([{ at, laneWidthCm: 250 }]), ctx, streamsFor(5)));
    expect(d.cut.ends[0].slidCm).toBeCloseTo(900, 6);
  });

  it('leaves an end at or beyond the gap where it is, and ignores portals on a spine that bounds no district', () => {
    const free = asCut(planCut(deep([]), ctx, streamsFor(7)));
    const x = free.cut.ends[0].point.x;
    const outside = asCut(planCut(deep([{ at: { x: x + 1000, y: -300 }, laneWidthCm: 400 }]), ctx, streamsFor(7)));
    expect(outside.cut.ends[0].slidCm).toBe(0);
    expect(outside.cut.chain).toEqual(free.cut.chain);
    const inner = asCut(planCut(deep([{ at: { x: x + 100, y: -300 }, laneWidthCm: 400 }], false), ctx, streamsFor(7)));
    expect(inner.cut.ends[0].slidCm).toBe(0);
    expect(inner.cut.chain).toEqual(free.cut.chain);
  });

  it('takes the other side when the nearer slide is blocked by a second portal\'s gap', () => {
    const free = asCut(planCut(deep([]), ctx, streamsFor(9)));
    const x = free.cut.ends[0].point.x;
    const p = asCut(
      planCut(
        deep([
          { at: { x: x + 100, y: -300 }, laneWidthCm: 400 },
          { at: { x: x - 1500, y: -300 }, laneWidthCm: 400 },
        ]),
        ctx,
        streamsFor(9),
      ),
    );
    // West edge x − 900 lies within the second portal's gap (|−900 + 1500| < 1 000): the end slides east to x + 1 100.
    expect(p.cut.ends[0].point.x).toBeCloseTo(x + 1100, 6);
    expect(p.cut.ends[0].slidCm).toBeCloseTo(1100, 6);
  });

  it('returns the next rung when neither side keeps the arrival within 85–95°', () => {
    // A shallow block: legs of 70 m; a 10 m slide turns the arrival by ≈ 8°.
    const shallow: [number, number][] = [[0, 0], [12000, 0], [12000, 7000], [0, 7000]];
    const free = asCut(planCut(withSpines(shallow), CTX, streamsFor(4)));
    const x = free.cut.ends[0].point.x;
    const f = withSpines(shallow);
    const spines = (f.spines ?? []).slice();
    spines[0] = spineBeside(shallow[0], shallow[1], 300, 2000, { bounding: true, portals: [{ at: { x: x + 100, y: -300 }, laneWidthCm: 400 }] });
    const r = planCut({ rings: f.rings, spines }, CTX, streamsFor(4));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.kind).toBe('nextRung');
    if (r.value.kind === 'nextRung') expect(r.value.reason).toBe('portalGap');
  });

  /** The point `s` cm along a spine's (straight) line from `at`, and the line's unit direction. */
  const alongSpine = (sp: KerbSpine, at: { x: number; y: number }, s: number) => {
    const d = unitV(sub(sp.points[1], sp.points[0]));
    return { p: { x: at.x + d.x * s, y: at.y + d.y * s }, d };
  };
  const inBand = (deg: number) => deg >= 85 && deg <= 95;

  it('returns the next rung for a bent cut whose far end lies in a gap that neither slide leaves within 85–95°', () => {
    // The trapezoid's bent cuts: the second leg is 30–45 m, so a 10 m slide turns its arrival far out of the band on
    // either side. slideEnd's own arrival test is what refuses it — a bent cut has no two-end re-check (the check's
    // B2, mutant m37).
    const T = FACES.trapezoid;
    let n = 0;
    for (let seed = 1; seed <= 60; seed += 1) {
      const free = asCut(planCut(T, CTX, streamsFor(seed)));
      if (!free.cut.bent) continue;
      const e = free.cut.ends[1];
      expect(e.kind).toBe('spine');
      const K = free.cut.legs[1];
      const spines = (T.spines ?? []).slice();
      const sp = spines[e.index];
      // A portal 1 cm along the spine from the planned junction; its gap is 10 m (lanes 4 m and the default 5 m).
      const portal = alongSpine(sp, e.point, 1);
      spines[e.index] = { ...sp, bounding: true, portals: [{ at: portal.p, laneWidthCm: 400 }] };
      // Neither gap edge keeps the second leg within the band (the test's own geometry).
      for (const s of [-1000, 1000]) expect(inBand(arrivalDeg(sub(alongSpine(sp, portal.p, s).p, K), portal.d))).toBe(false);
      const r = planCut({ rings: T.rings, spines }, CTX, streamsFor(seed));
      expect(r.ok).toBe(true);
      if (!r.ok) continue;
      expect(r.value.kind).toBe('nextRung');
      if (r.value.kind === 'nextRung') expect(r.value.reason).toBe('portalGap');
      n += 1;
    }
    expect(n).toBeGreaterThan(30);
  });

  it('slides a bent cut\'s far end to the farther gap edge when only that side keeps its arrival within 85–95°', () => {
    // A deep block (second legs 130–250 m) whose north spine is tilted 6° off its kerb: the planned junction arrives
    // at 84°. A portal 3 m along the spine puts the nearer edge 7 m back (turning the arrival further out) and the
    // farther edge 13 m on (turning it back into the band): the planner must take the farther slide.
    const outer: [number, number][] = [[0, 0], [40000, 0], [40000, 36000], [0, 32000]];
    const base = withSpines(outer);
    const kerbDir = unitV({ x: -40000, y: -4000 });
    const tilt = (6 * Math.PI) / 180;
    const sd = { x: kerbDir.x * Math.cos(tilt) - kerbDir.y * Math.sin(tilt), y: kerbDir.x * Math.sin(tilt) + kerbDir.y * Math.cos(tilt) };
    let n = 0;
    for (let seed = 1; seed <= 30; seed += 1) {
      const plain = asCut(planCut(base, CTX, streamsFor(seed)));
      if (!plain.cut.bent) continue;
      const [, K, F] = plain.cut.legs;
      const arr = unitV(sub(F, K));
      const J = { x: F.x + arr.x * 300, y: F.y + arr.y * 300 };
      const tilted: KerbSpine = { points: [{ x: J.x - sd.x * 5000, y: J.y - sd.y * 5000 }, { x: J.x + sd.x * 5000, y: J.y + sd.y * 5000 }], halfWidthCm: 300 };
      const spines = (base.spines ?? []).slice();
      spines[2] = tilted;
      const free = asCut(planCut({ rings: base.rings, spines }, CTX, streamsFor(seed)));
      const e = free.cut.ends[1];
      expect(e.kind).toBe('spine');
      expect(e.index).toBe(2);
      expect(free.cut.legs[1]).toEqual(K);
      // The side whose 7 m slide fails the band and whose 13 m slide passes it, by the test's own geometry.
      const side = [1, -1].find((g) => {
        const portal = alongSpine(tilted, e.point, 300 * g).p;
        const nearer = arrivalDeg(sub(alongSpine(tilted, portal, -1000 * g).p, K), sd);
        const farther = arrivalDeg(sub(alongSpine(tilted, portal, 1000 * g).p, K), sd);
        return !inBand(nearer) && inBand(farther);
      });
      expect(side).toBeDefined();
      if (side === undefined) continue;
      const portal = alongSpine(tilted, e.point, 300 * side).p;
      spines[2] = { ...tilted, bounding: true, portals: [{ at: portal, laneWidthCm: 400 }] };
      const p = asCut(planCut({ rings: base.rings, spines }, CTX, streamsFor(seed)));
      expect(p.cut.bent).toBe(true);
      const s = p.cut.ends[1];
      expect(s.slidCm).toBeCloseTo(1300, 6);
      expect(norm(sub(s.point, alongSpine(tilted, portal, 1000 * side).p))).toBeLessThan(1e-6);
      expect(inBand(arrivalDeg(sub(s.point, p.cut.legs[1]), sd))).toBe(true);
      n += 1;
    }
    expect(n).toBeGreaterThan(20);
  });

  it('slides the far end too', () => {
    for (let seed = 1; seed <= 10; seed += 1) {
      const free = asCut(planCut(deep([]), ctx, streamsFor(seed)));
      const e = free.cut.ends[1];
      const f = withSpines(outer);
      const spines = (f.spines ?? []).slice();
      spines[2] = spineBeside(outer[2], outer[3], 300, 2000, { bounding: true, portals: [{ at: { x: e.point.x - 100, y: e.point.y }, laneWidthCm: 400 }] });
      const p = asCut(planCut({ rings: f.rings, spines }, ctx, streamsFor(seed)));
      expect(p.cut.ends[1].slidCm).toBeCloseTo(900, 6);
      expect(norm(sub(p.cut.ends[1].point, { x: e.point.x + 900, y: e.point.y }))).toBeLessThan(1e-6);
    }
  });
});
