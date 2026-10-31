// S5b's count and picks (§4.4 S5b; C-0244): N_k by the gate law on the land inside the stage's enceinte (walled) or one
// per mainRoadSpacingM of boundary (unwalled); N_k − c spawned destinations (none when N_k ≤ c), each a contour vertex
// of the boundary, by sequential nested picks — largest angular gaps first, one uniform per candidate per pick, so a
// smaller count is a prefix of a larger one — with the masks and the open-edge filter honoured. On slices only.
import { describe, expect, it } from 'vitest';
import type { Stream } from '@plat/kernel';
import { flatFixture, s3Slice, type S3Slice } from '../../../src/index.js';
import { HA_CM2, stageBoundary, type StageBoundary } from '../../../src/growth/boundary.js';
import { mainRoadCount, mainRoadStream, spawnPrimaries, stageWalled, withinOf } from '../../../src/growth/mainRoads.js';

let cached: { s: S3Slice; b2: StageBoundary; b3: StageBoundary } | null = null;
function city(): { s: S3Slice; b2: StageBoundary; b3: StageBoundary } {
  if (cached === null) {
    const s = s3Slice(flatFixture(1));
    const b2 = stageBoundary(s.field, 2, s.site.land, { enclosure: s.levelSet.selected });
    const b3 = stageBoundary(s.field, 3, s.site.land, { enclosure: b2.set.selected });
    cached = { s, b2, b3 };
  }
  return cached;
}

/** The angular gap (cdeg) between two bearings, written here. */
function gap(a: number, b: number): number {
  const d = Math.abs(a - b) % 36_000;
  return d > 18_000 ? 36_000 - d : d;
}

function bearing(dx: number, dy: number): number {
  return ((Math.round((Math.atan2(dx, dy) * 18_000) / Math.PI) % 36_000) + 36_000) % 36_000;
}

/** The candidate edges counted here: the contour's crossed edges whose inside node is interior dry land, once each. */
function candidates(b: StageBoundary, centre: { x: number; y: number }, mask?: Uint8Array): { u: number; v: number; at: { x: number; y: number } }[] {
  const L = b.set.field.lattice;
  const seen = new Set<string>();
  const out: { u: number; v: number; at: { x: number; y: number } }[] = [];
  b.set.contourEdges.forEach(([u, v], i) => {
    if (L.interior[u] !== 1 || L.water[u] !== 0 || (mask !== undefined && mask[u] !== 1)) return;
    // Within 35° of the outward radial direction.
    const e = { x: L.points[v].x - L.points[u].x, y: L.points[v].y - L.points[u].y };
    const r = { x: b.set.contour[i].x - centre.x, y: b.set.contour[i].y - centre.y };
    if (e.x * r.x + e.y * r.y < Math.cos((35 * Math.PI) / 180) * Math.hypot(e.x, e.y) * Math.hypot(r.x, r.y)) return;
    const key = `${String(u)},${String(v)}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ u, v, at: b.set.contour[i] });
  });
  return out;
}

const SEVEN = [0, 5_143, 10_286, 15_429, 20_571, 25_714, 30_857].map((b) => ({ bearingCdeg: b }));

describe('mainRoadCount', () => {
  it('walled: the land law on the land inside the enceinte; unwalled: one per 450 m of boundary at CITY', { timeout: 60_000 }, () => {
    const { s, b2, b3 } = city();
    expect([1, 2, 3].map((k) => stageWalled(s.site, k))).toEqual([true, true, false]);
    const c2 = mainRoadCount(s.site, 2, b2);
    expect(c2).toEqual({ n: Math.round(1 + 0.47 * Math.sqrt(b2.landCm2 / HA_CM2)), measure: b2.landCm2, walled: true, rule: 'gateLaw' });
    expect(c2.n).toBe(8);
    const o = b3.set.outline;
    let per = 0;
    for (let i = 0; i < o.length; i += 1) per += Math.hypot(o[(i + 1) % o.length].x - o[i].x, o[(i + 1) % o.length].y - o[i].y);
    const c3 = mainRoadCount(s.site, 3, b3);
    expect(c3).toEqual({ n: Math.round(per / 45_000), measure: per, walled: false, rule: 'spacing' });
    expect(c3.n).toBeGreaterThan(8);
  });
});

describe('spawnPrimaries', () => {
  it('N_k − c picks, none when N_k ≤ c; refuses a count that is no whole number', { timeout: 60_000 }, () => {
    const { s, b2 } = city();
    expect(spawnPrimaries(b2, 7, SEVEN, mainRoadStream(s))).toEqual([]);
    expect(spawnPrimaries(b2, 5, SEVEN, mainRoadStream(s))).toEqual([]);
    expect(spawnPrimaries(b2, 8, SEVEN, mainRoadStream(s)).length).toBe(1);
    expect(spawnPrimaries(b2, 11, SEVEN, mainRoadStream(s)).length).toBe(4);
    expect(spawnPrimaries(b2, 3, [], mainRoadStream(s)).length).toBe(3);
    expect(() => spawnPrimaries(b2, -1, SEVEN, mainRoadStream(s))).toThrow(RangeError);
    expect(() => spawnPrimaries(b2, 2.5, SEVEN, mainRoadStream(s))).toThrow(RangeError);
  });

  it('each pick a contour vertex on its crossed edge, its bearing radial from the nucleus, itself first among the alternatives', { timeout: 60_000 }, () => {
    const { s, b2 } = city();
    const picks = spawnPrimaries(b2, 12, SEVEN, mainRoadStream(s), { centre: s.site.centre });
    expect(picks.length).toBe(5);
    const sel = b2.set.selected;
    picks.forEach((p, i) => {
      expect(p.ordinal).toBe(i);
      const at = b2.set.contour.findIndex((q, j) => q.x === p.at.x && q.y === p.at.y && b2.set.contourEdges[j][0] === p.edge[0] && b2.set.contourEdges[j][1] === p.edge[1]);
      expect(at).toBeGreaterThanOrEqual(0);
      expect(sel[p.edge[0]]).toBe(1);
      expect(sel[p.edge[1]]).toBe(0);
      expect(p.bearingCdeg).toBe(bearing(p.at.x - s.site.centre.x, p.at.y - s.site.centre.y));
      expect(p.ranked[0]).toBe(p.edge[0]);
      expect(p.alternatives[0]).toEqual({ at: p.at, edge: p.edge, bearingCdeg: p.bearingCdeg });
      expect(p.alternatives.length).toBe(16);
      expect(p.ranked).toEqual(p.alternatives.slice(0, 4).map((a) => a.edge[0]));
      // Every candidate leaves along an edge within 35° of radial.
      for (const a of p.alternatives) {
        const L = s.lattice;
        const e = { x: L.points[a.edge[1]].x - L.points[a.edge[0]].x, y: L.points[a.edge[1]].y - L.points[a.edge[0]].y };
        const r = { x: a.at.x - s.site.centre.x, y: a.at.y - s.site.centre.y };
        expect(e.x * r.x + e.y * r.y).toBeGreaterThanOrEqual(Math.cos((35 * Math.PI) / 180) * Math.hypot(e.x, e.y) * Math.hypot(r.x, r.y) - 1e-6);
      }
    });
  });

  it('largest angular gaps first: each pick\'s gap within the jitter of the best candidate\'s', { timeout: 60_000 }, () => {
    const { s, b2 } = city();
    const cands = candidates(b2, s.site.centre).map((c) => bearing(c.at.x - s.site.centre.x, c.at.y - s.site.centre.y));
    const picks = spawnPrimaries(b2, 12, SEVEN, mainRoadStream(s), { centre: s.site.centre });
    const taken = SEVEN.map((c) => c.bearingCdeg);
    for (const p of picks) {
      const minGap = (b: number): number => Math.min(...taken.map((t) => gap(b, t)));
      const best = Math.max(...cands.map(minGap));
      const mine = minGap(p.bearingCdeg);
      // Flat ground: score = gap ÷ 18 000 + 0.05 · u; the jitter is worth at most 900 cdeg of gap.
      expect(mine).toBeGreaterThanOrEqual(best - 900);
      expect(best - mine).toBeLessThanOrEqual(900);
      taken.push(p.bearingCdeg);
    }
    // With no crossing the first pick's gap is 1 for every candidate: the jitter alone decides, any candidate may win.
    const lone = spawnPrimaries(b2, 2, [], mainRoadStream(s), { centre: s.site.centre });
    expect(gap(lone[0].bearingCdeg, lone[1].bearingCdeg)).toBeGreaterThanOrEqual(18_000 - 900);
  });

  it('nested: a smaller count is a prefix of a larger one; one uniform per candidate per pick', { timeout: 60_000 }, () => {
    const { s, b2 } = city();
    const few = spawnPrimaries(b2, 9, SEVEN, mainRoadStream(s), { centre: s.site.centre });
    const many = spawnPrimaries(b2, 13, SEVEN, mainRoadStream(s), { centre: s.site.centre });
    expect(many.slice(0, few.length).map((p) => [p.at, p.edge])).toEqual(few.map((p) => [p.at, p.edge]));
    // The stream's draws: exactly picks × candidates.
    const n = candidates(b2, s.site.centre).length;
    const used: Stream = mainRoadStream(s);
    spawnPrimaries(b2, 10, SEVEN, used, { centre: s.site.centre });
    const fresh = mainRoadStream(s);
    for (let i = 0; i < 3 * n; i += 1) fresh.float01();
    expect(used.float01()).toBe(fresh.float01());
    // Deterministic: the same stream gives the same picks.
    expect(spawnPrimaries(b2, 10, SEVEN, mainRoadStream(s), { centre: s.site.centre })).toEqual(spawnPrimaries(b2, 10, SEVEN, mainRoadStream(s), { centre: s.site.centre }));
  });

  it('the masks and the open-edge filter: a destination\'s inside node in the mask, its outside node in the outer mask, its edge open', { timeout: 60_000 }, () => {
    const { s, b2 } = city();
    const L = s.lattice;
    const east = new Uint8Array(L.points.length);
    const north = new Uint8Array(L.points.length);
    for (let i = 0; i < L.points.length; i += 1) {
      east[i] = L.points[i].x > s.site.centre.x ? 1 : 0;
      north[i] = L.points[i].y > s.site.centre.y ? 1 : 0;
    }
    const picks = spawnPrimaries(b2, 12, SEVEN, mainRoadStream(s), { centre: s.site.centre, mask: east, outerMask: north });
    expect(picks.length).toBe(5);
    for (const p of picks) {
      expect(east[p.edge[0]]).toBe(1);
      expect(north[p.edge[1]]).toBe(1);
      for (const a of p.alternatives) {
        expect(east[a.edge[0]]).toBe(1);
        expect(north[a.edge[1]]).toBe(1);
      }
    }
    const closed = new Set(picks.map((p) => `${String(p.edge[0])},${String(p.edge[1])}`));
    const open = spawnPrimaries(b2, 12, SEVEN, mainRoadStream(s), { centre: s.site.centre, edgeOpen: (u, v) => !closed.has(`${String(u)},${String(v)}`) });
    for (const p of open) expect(closed.has(`${String(p.edge[0])},${String(p.edge[1])}`)).toBe(false);
    // No candidate left: no pick (the shortfall is the caller's to report).
    expect(spawnPrimaries(b2, 12, SEVEN, mainRoadStream(s), { mask: new Uint8Array(L.points.length) })).toEqual([]);
  });

  it('the gate square (C-0454 (1)): no destination within apart.cm of a crossing\'s point or of an earlier pick; the draws unchanged', { timeout: 60_000 }, () => {
    const { s, b2 } = city();
    const centre = s.site.centre;
    const free = spawnPrimaries(b2, 10, SEVEN, mainRoadStream(s), { centre });
    expect(free.length).toBe(3);
    // A crossing's point on the free run's first pick: that destination and every candidate within the square of it is
    // never taken, nor offered as an alternative; the others keep the square from it and from each other.
    const cm = 3000;
    const from = [free[0].at];
    const used: Stream = mainRoadStream(s);
    const kept = spawnPrimaries(b2, 10, SEVEN, used, { centre, apart: { cm, from } });
    expect(kept.length).toBe(3);
    const d = (a: { x: number; y: number }, b: { x: number; y: number }): number => Math.hypot(a.x - b.x, a.y - b.y);
    for (const p of kept) {
      expect(d(p.at, from[0])).toBeGreaterThanOrEqual(cm);
      for (const a of p.alternatives) expect(d(a.at, from[0])).toBeGreaterThanOrEqual(cm);
    }
    for (let i = 0; i < kept.length; i += 1) for (let j = 0; j < i; j += 1) expect(d(kept[i].at, kept[j].at)).toBeGreaterThanOrEqual(cm);
    expect(kept[0].at).not.toEqual(free[0].at);
    // Every candidate draws its uniform still: exactly picks × candidates, as without the square.
    const n = candidates(b2, centre).length;
    const fresh = mainRoadStream(s);
    for (let i = 0; i < 3 * n; i += 1) fresh.float01();
    expect(used.float01()).toBe(fresh.float01());
    // A square the far side of the frame excludes nothing: the free picks, byte for byte.
    expect(spawnPrimaries(b2, 10, SEVEN, mainRoadStream(s), { centre, apart: { cm, from: [{ x: 1e9, y: 1e9 }] } })).toEqual(free);
    // The earlier picks are squares too: a square wide enough to hold the whole boundary leaves room for one pick only.
    const one = spawnPrimaries(b2, 10, SEVEN, mainRoadStream(s), { centre, apart: { cm: 1e9, from: [] } });
    expect(one.length).toBe(1);
    expect(one[0].at).toEqual(free[0].at);
    // withinOf: strictly nearer than cm.
    expect(withinOf({ x: 0, y: 0 }, [{ x: 3000, y: 0 }], 3000)).toBe(false);
    expect(withinOf({ x: 0, y: 0 }, [{ x: 2999, y: 0 }], 3000)).toBe(true);
  });
});
