// M0-c-02: §4.4 S5a *Trace* (2), pull and pin — the boundary pulled to defensible ground within the 40 m search band by
// a cost-surface path, the gates pinned. On a flat site the pull is the identity but for the pins; here a synthetic
// cost field moves the line within the band and never moves a pinned gate (C-0226 (3)).
import { describe, expect, it } from 'vitest';
import { outwardNormals, PULL_STEPS, pullAndPin, s3Slice, terrainCost } from '../../src/index.js';
import { lat, openRing } from '../../src/enceinte/plane.js';
import { commitSite, closedChain, maxDeparture, smallSite, verticesWith } from './support.js';

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
