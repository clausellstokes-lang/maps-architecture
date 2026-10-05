// The field T (§4.2 S3 (6), §4.4 S5a; M0-c-01): a multi-source Dijkstra from the plaza with the road multiplier 1/a₁
// on the gate routes' edges and the water pull a soft term at weight 0; a function of the lattice and routes alone.
import { dijkstraTree } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { fieldSources, fieldT, roadSet, stageA, stageThreshold } from '../../src/index.js';
import { sliceOf } from './support.js';

const S = sliceOf(1);
const L = S.lattice;

function bytes(a: Float64Array): Buffer {
  return Buffer.from(a.buffer, a.byteOffset, a.byteLength);
}

describe('the field T', () => {
  it("uses stage 1's regime row a₁ = 1.3 (walled core) and the slice's routes", () => {
    expect(stageA(S.site, 0)).toBe(1.3);
    expect(S.field.a).toBe(1.3);
    expect(bytes(fieldT(L, S.routes, 1.3).T).equals(bytes(S.field.T))).toBe(true);
  });

  it('is a function of the lattice and routes alone: every permutation of the route order gives the same field, byte for byte', () => {
    const base = bytes(S.field.T);
    const r = S.routes;
    const orders = [[...r].reverse(), [r[3], r[0], r[6], r[1], r[5], r[2], r[4]], [...r.slice(2), ...r.slice(0, 2)]];
    for (const o of orders) expect(bytes(fieldT(L, o, 1.3).T).equals(base)).toBe(true);
    // A route given twice adds nothing either (the road set is a set of edges).
    expect(bytes(fieldT(L, [...r, r[0]], 1.3).T).equals(base)).toBe(true);
  });

  it('is the multi-source Dijkstra from the plaza: sources at 0, and with no routes the plain lattice distances', () => {
    const src = fieldSources(L);
    expect(src.length).toBeGreaterThan(L.attachNodes[0].length);
    for (const i of src) expect(S.field.T[i]).toBe(0);
    const plain = dijkstraTree(L.graph, src).dist;
    expect(bytes(fieldT(L, [], 1).T).equals(bytes(plain))).toBe(true);
    // The road multiplier at a = 1 changes nothing.
    expect(bytes(fieldT(L, S.routes, 1).T).equals(bytes(plain))).toBe(true);
  });

  it('prices the road set at 1/a₁: along a route T falls below the terrain-only field by the multiplier', () => {
    const plain = fieldT(L, [], 1).T;
    const road = roadSet(L, S.routes);
    let marked = 0;
    for (let e = 0; e < road.length; e += 1) marked += road[e];
    expect(marked).toBeGreaterThan(0);
    let lower = 0;
    for (const r of S.routes) {
      const far = r.nodes[r.pickAt];
      expect(S.field.T[far]).toBeLessThan(plain[far]);
      // Never below the road-only bound: the whole route at 1/a₁.
      expect(S.field.T[far]).toBeGreaterThanOrEqual(plain[far] / 1.3 - 1e-6);
      lower += 1;
    }
    expect(lower).toBe(S.routes.length);
    // With a larger a the reach along the roads grows.
    const t18 = fieldT(L, S.routes, 1.8).T;
    const far = S.routes[0].nodes[S.routes[0].pickAt];
    expect(t18[far]).toBeLessThan(S.field.T[far]);
  });

  it('the water-pull term at weight 0 is byte-identical to the term absent; at a positive weight it lowers T', () => {
    const q = (p: { x: number; y: number }): number => Math.min(1, Math.abs(p.x) / 250_000);
    const absent = fieldT(L, S.routes, 1.3).T;
    const zero = fieldT(L, S.routes, 1.3, { pull: { weight: 0, q } }).T;
    expect(bytes(zero).equals(bytes(absent))).toBe(true);
    const pulled = fieldT(L, S.routes, 1.3, { pull: { weight: 0.5, q } }).T;
    let lowered = 0;
    for (let i = 0; i < pulled.length; i += 1) {
      expect(pulled[i]).toBeLessThanOrEqual(absent[i]);
      if (pulled[i] < absent[i]) lowered += 1;
    }
    expect(lowered).toBeGreaterThan(L.points.length / 2);
    expect(() => fieldT(L, S.routes, 1.3, { pull: { weight: 1, q } })).toThrow(RangeError);
  });

  it('refuses an anisotropy below 1', () => {
    expect(() => fieldT(L, [], 0.9)).toThrow(RangeError);
  });
});

describe("t₁ by accumulated cell areas (§4.2 S3 (6); C-0017's 'exact to one cell')", () => {
  it("takes the stage's land within one cell and is the T of the last node taken", () => {
    const th = S.threshold;
    const asked = S.site.land.stagesHa[0] * 1e8;
    expect(th.askedCm2).toBe(asked);
    expect(Math.abs(th.landCm2 - asked)).toBeLessThanOrEqual(L.cellAreaCm2);
    expect(th.capped).toBe(false);
    expect(th.shortfallCm2).toBe(0);
    // Exactly the land nodes with T ≤ t₁ are counted.
    let count = 0;
    for (let i = 0; i < L.points.length; i += 1) if (L.interior[i] === 1 && S.field.T[i] <= th.t) count += 1;
    expect(count * L.cellAreaCm2).toBe(th.landCm2);
    // One cell more of land asks a larger t.
    const more = stageThreshold(S.field, asked + 2 * L.cellAreaCm2);
    expect(more.t).toBeGreaterThan(th.t);
    expect(more.landCm2).toBeGreaterThan(th.landCm2);
  });

  it('counts only the interior (land) nodes: the rim is never the town’s land', () => {
    const all = stageThreshold(S.field, 1e15);
    let interior = 0;
    for (let i = 0; i < L.points.length; i += 1) interior += L.interior[i];
    expect(all.capped).toBe(true);
    expect(all.landCm2).toBe(interior * L.cellAreaCm2);
    expect(all.shortfallCm2).toBe(1e15 - interior * L.cellAreaCm2);
    let maxT = 0;
    for (let i = 0; i < L.points.length; i += 1) if (L.interior[i] === 1 && S.field.T[i] > maxT) maxT = S.field.T[i];
    expect(all.t).toBe(maxT);
  });
});
