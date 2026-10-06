// M0-c-02: §4.4 S5a *Trace* (2), pull and pin — the boundary pulled to defensible ground within the 40 m search band by
// a cost-surface path, the gates pinned. On a flat site the pull is the identity but for the pins; here a synthetic
// cost field moves the line within the band and never moves a pinned gate (C-0226 (3)).
import { describe, expect, it } from 'vitest';
import { commitOuterRing, outwardNormals, PULL_STEPS, pullAndPin, s3Slice, siteContext, smoothPinned, terrainCost, traceBase } from '../../src/index.js';
import { laplacianPinned, snap } from '@plat/kernel';
import { lat, openRing } from '../../src/enceinte/plane.js';
import { area2, commitSite, closedChain, kernelFor, maxDeparture, smallSite, verticesWith } from './support.js';

const BAND = 4000;
/** The pull's reach: the band less the attraction distance (26 cm), in eight steps. */
const REACH = BAND - 26;
const STEP = REACH / 8;
const slice = s3Slice(smallSite(11));
const ring = (() => {
  const r = openRing(slice.levelSet.outline.map((q) => lat(q)));
  let s = 0;
  for (let i = 0; i < r.length; i += 1) s += r[i].x * r[(i + 1) % r.length].y - r[(i + 1) % r.length].x * r[i].y;
  return s < 0 ? [...r].reverse() : r;
})();
const gateKeys = new Set(slice.gates.map((g) => `${String(g.at.x)},${String(g.at.y)}`));
const mask = Uint8Array.from(ring.map((q) => (gateKeys.has(`${String(q.x)},${String(q.y)}`) ? 1 : 0)));
const meanR = ring.reduce((s, q) => s + Math.hypot(q.x, q.y), 0) / ring.length;
/** A ridge 25 m outside the town's mean radius: standing on it costs least. */
const ridge = (p: { x: number; y: number }): number => Math.abs(Math.hypot(p.x, p.y) - (meanR + 2500)) / 100;

describe('pull and pin', () => {
  it('a cost surface that does not vary along the normals (flat ground) leaves the boundary where it is', () => {
    const flat = terrainCost(slice.site.terrain);
    const r = pullAndPin(ring, mask, flat, BAND, []);
    expect(r.moved).toBe(0);
    expect(r.maxOffsetCm).toBe(0);
    expect(r.line).toEqual(ring.map((q) => ({ x: q.x, y: q.y })));
    expect(r.offsetsCm.every((s) => s === 0)).toBe(true);
    const constant = pullAndPin(ring, new Uint8Array(ring.length), () => 7, BAND, []);
    expect(constant.moved).toBe(0);
  });

  it('a synthetic ridge pulls the line toward it within the band, along each vertex\'s normal, never moving a pinned gate', () => {
    expect(mask.reduce((s, v) => s + v, 0)).toBe(slice.gates.length);
    const r = pullAndPin(ring, mask, ridge, BAND, []);
    const normals = outwardNormals(ring);
    expect(r.moved).toBeGreaterThan(ring.length / 2);
    const sideOf = (i: number): number => Math.hypot(ring[i].x - ring[(i + ring.length - 1) % ring.length].x, ring[i].y - ring[(i + ring.length - 1) % ring.length].y);
    ring.forEach((q, i) => {
      const s = r.offsetsCm[i];
      // Whole steps of the reach, never beyond it, along the vertex's normal.
      expect(Math.abs(s)).toBeLessThanOrEqual(REACH + 1e-9);
      expect(Math.abs(Math.round(s / STEP) - s / STEP)).toBeLessThan(1e-9);
      expect(r.line[i].x).toBeCloseTo(q.x + s * normals[i].x, 6);
      expect(r.line[i].y).toBeCloseTo(q.y + s * normals[i].y, 6);
      // A path: the offset changes between neighbours by at most their distance apart (45°).
      expect(Math.abs(s - r.offsetsCm[(i + ring.length - 1) % ring.length])).toBeLessThanOrEqual(sideOf(i) + 1e-6);
      if (mask[i] === 1) {
        expect(s).toBe(0);
        expect(r.line[i]).toEqual({ x: q.x, y: q.y });
      }
    });
    // The path stands lower on the cost surface than the boundary, in sum.
    const sum = (pts: readonly { x: number; y: number }[]): number => pts.reduce((t, q) => t + ridge(q), 0);
    expect(sum(r.line)).toBeLessThan(sum(ring) * 0.5);
    expect(r.maxOffsetCm).toBeGreaterThan(1000);
  });

  it('a field asking for more than the band stops at the band exactly', () => {
    // Standing farther from the centre always costs less: every free vertex wants to leave by more than 40 m.
    const outward = (p: { x: number; y: number }): number => -Math.hypot(p.x, p.y) / 100;
    const free = new Uint8Array(ring.length);
    const r = pullAndPin(ring, free, outward, BAND, []);
    expect(r.maxOffsetCm).toBeCloseTo(REACH, 9);
    expect(r.offsetsCm.every((s) => Math.abs(s - REACH) < 1e-9)).toBe(true);
    // With the gates pinned, they stay; the path ramps to the reach and holds it.
    const p = pullAndPin(ring, mask, outward, BAND, []);
    ring.forEach((_q, i) => {
      if (mask[i] === 1) expect(p.offsetsCm[i]).toBe(0);
      else expect(p.offsetsCm[i]).toBeGreaterThan(0);
    });
    expect(p.maxOffsetCm).toBeCloseTo(REACH, 9);
    // A smaller band is the band: the step follows it.
    const half = pullAndPin(ring, free, outward, BAND / 2, []);
    expect(half.maxOffsetCm).toBeCloseTo(BAND / 2 - 26, 9);
  });

  it('bars a candidate inside a barred ring (the water, a reservation)', () => {
    const outward = (p: { x: number; y: number }): number => -Math.hypot(p.x, p.y) / 100;
    // A barred box just outside one boundary vertex, 20–60 m out along its normal.
    const normals = outwardNormals(ring);
    const i = ring.findIndex((_q, j) => mask[j] === 0 && mask[(j + 1) % ring.length] === 0 && mask[(j + ring.length - 1) % ring.length] === 0);
    const q = ring[i];
    const n = normals[i];
    const c = { x: q.x + n.x * REACH, y: q.y + n.y * REACH };
    const box = [
      { x: c.x - 2100, y: c.y - 2100 },
      { x: c.x + 2100, y: c.y - 2100 },
      { x: c.x + 2100, y: c.y + 2100 },
      { x: c.x - 2100, y: c.y + 2100 },
    ];
    const r = pullAndPin(ring, new Uint8Array(ring.length), outward, BAND, [box]);
    const inBox = (p: { x: number; y: number }): boolean => p.x > box[0].x && p.x < box[1].x && p.y > box[0].y && p.y < box[2].y;
    expect(r.line.some(inBox)).toBe(false);
    expect(r.offsetsCm[i]).toBeLessThan(REACH - 1);
    const free = pullAndPin(ring, new Uint8Array(ring.length), outward, BAND, []);
    expect(inBox(free.line[i])).toBe(true);
  });

  it('through the strategy: the committed trace moves toward the ridge, within 40 m of the boundary, every gate exactly on it', () => {
    const c = commitSite(smallSite(11), { costField: ridge });
    const wall = closedChain(c.plat, { role: 'wall', entity: 'enceinte:1' });
    expect(c.commit.traced.report.pull.moved).toBeGreaterThan(0);
    const dep = maxDeparture(wall, c.slice.levelSet.outline);
    expect(dep).toBeLessThanOrEqual(BAND);
    expect(dep).toBeGreaterThan(1500);
    for (const g of c.slice.gates) expect(verticesWith(c.plat, 'gate', `gate:${String(g.ordinal)}`)).toEqual([g.at]);
  }, 60_000);
});

describe('the base\'s default cost surface: the terrain\'s, high ground preferred (C-0226 (3); §4.4\'s "penalty for leaving high ground")', () => {
  /** The site's terrain raster with the ground rising 1 m every 10 m toward +x (height in cm = x / 10 at the cell's centre). */
  const t0 = slice.site.terrain;
  const heightCm = new Int32Array(t0.cols * t0.rows);
  for (let row = 0; row < t0.rows; row += 1) {
    for (let col = 0; col < t0.cols; col += 1) heightCm[row * t0.cols + col] = Math.round((t0.originX + (col + 0.5) * t0.cellCm) / 10);
  }
  const slope = { ...t0, heightCm };
  const heightAt = (q: { x: number; y: number }): number => {
    const col = Math.min(t0.cols - 1, Math.max(0, Math.floor((q.x - t0.originX) / t0.cellCm)));
    const row = Math.min(t0.rows - 1, Math.max(0, Math.floor((q.y - t0.originY) / t0.cellCm)));
    return heightCm[row * t0.cols + col];
  };

  it('terrainCost reads the height negated, in metres: higher ground costs less', () => {
    const cost = terrainCost(slope);
    const lo = { x: -10000, y: 0 };
    const hi = { x: 10000, y: 0 };
    expect(cost(hi)).toBeLessThan(cost(lo));
    expect(cost(lo)).toBe(-heightAt(lo) * 0.01);
  });

  it('the pull through terrainCost on a slope moves the line uphill', () => {
    const r = pullAndPin(ring, mask, terrainCost(slope), BAND, []);
    let up = 0;
    let down = 0;
    ring.forEach((q, i) => {
      const dh = heightAt(r.line[i]) - heightAt(q);
      if (dh > 0) up += 1;
      if (dh < 0) down += 1;
    });
    expect(r.moved).toBeGreaterThan(ring.length / 4);
    expect(up).toBeGreaterThan(9 * down);
  });

  it('the trace with no cost field given takes the terrain\'s: on the slope the committed line stands east (uphill) of its boundary', () => {
    const site = { ...slice.site, terrain: slope };
    const { k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const r = traceBase(slice.levelSet.outline, slice.gateSites, [], slope, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.traced.report.pull.moved).toBeGreaterThan(0);
    /** The area centroid's x of a ring. */
    const cx = (pts: readonly { x: number; y: number }[]): number => {
      let sx = 0;
      for (let i = 0; i < pts.length; i += 1) {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        sx += (a.x + b.x) * (a.x * b.y - b.x * a.y);
      }
      return sx / (3 * area2(pts));
    };
    expect(cx(r.value.traced.line) - cx(slice.levelSet.outline)).toBeGreaterThan(1000);
  }, 60_000);
});

describe('the pinned smoothing (§4.4 S5a (3): 3 passes, the pins never moving)', () => {
  /** A 600 m square densified every 10 m, with a gate at its north side's middle. */
  const sq: { x: number; y: number }[] = [];
  for (let i = 0; i < 60; i += 1) sq.push({ x: -30000 + i * 1000, y: -30000 });
  for (let i = 0; i < 60; i += 1) sq.push({ x: 30000, y: -30000 + i * 1000 });
  for (let i = 0; i < 60; i += 1) sq.push({ x: 30000 - i * 1000, y: 30000 });
  for (let i = 0; i < 60; i += 1) sq.push({ x: -30000, y: 30000 - i * 1000 });
  const pinned = new Uint8Array(sq.length);
  pinned[150] = 1;

  it("runs exactly the passes it is given, each the kernel's pinned Laplacian at λ ½, rounded to the lattice at the end", () => {
    for (const passes of [1, 2, 3]) {
      const got = smoothPinned(sq, pinned, passes, sq, 4000, []);
      const want = laplacianPinned(sq, { closed: true, pinned: [150], iterations: passes, lambda: 0.5 }).map((q) => {
        const l = snap(q.x, q.y);
        if (!l.ok) throw new Error('off the lattice');
        return { x: l.value.x, y: l.value.y };
      });
      expect(got.map((q) => ({ x: q.x, y: q.y }))).toEqual(want);
    }
    expect(smoothPinned(sq, pinned, 3, sq, 4000, [])[150]).toEqual(sq[150]);
  });

  it('keeps a vertex where a pass would carry it into a barred ring, or out of the band (less the attraction distance)', () => {
    // The square's south-west corner moves inward along the diagonal: a barred box just inside it holds it back.
    const free = smoothPinned(sq, new Uint8Array(sq.length), 1, sq, 4000, []);
    expect(free[0]).not.toEqual(sq[0]);
    const box = [{ x: -29900, y: -29900 }, { x: -29000, y: -29900 }, { x: -29000, y: -29000 }, { x: -29900, y: -29000 }];
    const held = smoothPinned(sq, new Uint8Array(sq.length), 1, sq, 4000, [box]);
    expect(held[0]).toEqual(sq[0]);
    // A band of 2 m (less 26 cm): the corner's first move (about 2.5 m in) would leave it, so the corner stays.
    const narrow = smoothPinned(sq, new Uint8Array(sq.length), 1, sq, 200, []);
    expect(narrow[0]).toEqual(sq[0]);
    expect(smoothPinned(sq, new Uint8Array(sq.length), 1, sq, 300, [])[0]).toEqual(free[0]);
  });
});
