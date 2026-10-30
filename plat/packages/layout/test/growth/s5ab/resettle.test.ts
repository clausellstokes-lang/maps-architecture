// T's re-settlement (§4.4 S5a / S5b: "each S5b's new main roads re-settle T incrementally, only at the nodes whose cost
// they lower, so no stage computes a new field"; C-0244): on random road sets, the re-settled field equals a full
// recompute over the extended road set node for node (bitwise), lowers exactly the nodes whose T falls and leaves every
// other node's T as it was; with the water pull too; idempotent and order-free.
import { describe, expect, it } from 'vitest';
import { fieldT, flatFixture, s3Slice, type S3Slice, type WaterPull } from '../../../src/index.js';
import { resettleT } from '../../../src/growth/boundary.js';

let cached: S3Slice | null = null;
/** A small site (a 4 km² frame, 30 ha walled): a lattice of a few thousand nodes. */
function small(): S3Slice {
  if (cached === null) cached = s3Slice(flatFixture(5, { frameAreaHa: 400, walledHa: 30 }));
  return cached;
}

/** mulberry32: the test's own generator. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A random lattice walk of `len` steps from a random interior node (no immediate step back). */
function walk(s: S3Slice, r: () => number, len: number): number[] {
  const L = s.lattice;
  const interior: number[] = [];
  for (let i = 0; i < L.points.length; i += 1) if (L.interior[i] === 1) interior.push(i);
  let u = interior[Math.floor(r() * interior.length)];
  const out = [u];
  let prev = -1;
  for (let k = 0; k < len; k += 1) {
    const nb: number[] = [];
    for (let d = 0; d < 6; d += 1) {
      const v = L.adjacency[6 * u + d];
      if (v !== -1 && v !== prev) nb.push(v);
    }
    if (nb.length === 0) break;
    prev = u;
    u = nb[Math.floor(r() * nb.length)];
    out.push(u);
  }
  return out;
}

function sameT(a: Float64Array, b: Float64Array): number {
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) if (!Object.is(a[i], b[i])) diff += 1;
  return diff;
}

describe('resettleT', () => {
  it('equals a full recompute over the extended road set, lowering exactly the nodes whose T falls (60 road sets)', { timeout: 120_000 }, () => {
    const s = small();
    let loweredSomewhere = 0;
    for (let c = 0; c < 60; c += 1) {
      const r = rng(1000 + c);
      const roads = Array.from({ length: 1 + Math.floor(r() * 3) }, () => ({ nodes: walk(s, r, 5 + Math.floor(r() * 60)) }));
      const out = resettleT(s.field, roads);
      const full = fieldT(s.lattice, [...s.routes, ...roads], s.field.a);
      expect(sameT(out.field.T, full.T)).toBe(0);
      expect([...out.field.road]).toEqual([...full.road]);
      expect(out.field.a).toBe(s.field.a);
      expect(out.field.lattice).toBe(s.lattice);
      const fell: number[] = [];
      for (let i = 0; i < full.T.length; i += 1) {
        if (full.T[i] < s.field.T[i]) fell.push(i);
        else expect(Object.is(out.field.T[i], s.field.T[i])).toBe(true);
      }
      expect(out.lowered).toEqual(fell);
      loweredSomewhere += fell.length > 0 ? 1 : 0;
      // The old field is never written.
      expect(s.field.T).not.toBe(out.field.T);
    }
    // The property is not vacuous: most road sets lower T somewhere.
    expect(loweredSomewhere).toBeGreaterThan(40);
  });

  it('with the water pull, as fieldT computes it', { timeout: 60_000 }, () => {
    const s = small();
    const c = s.site.centre;
    const pull: WaterPull = { weight: 0.4, q: (p) => Math.max(0, 1 - Math.hypot(p.x - c.x - 30_000, p.y - c.y) / 50_000) };
    const base = fieldT(s.lattice, s.routes, s.field.a, { pull });
    for (let k = 0; k < 10; k += 1) {
      const r = rng(77 + k);
      const roads = [{ nodes: walk(s, r, 40) }, { nodes: walk(s, r, 25) }];
      const out = resettleT(base, roads, { pull });
      const full = fieldT(s.lattice, [...s.routes, ...roads], s.field.a, { pull });
      expect(sameT(out.field.T, full.T)).toBe(0);
    }
  });

  it('is idempotent, and order-free: two roads one after the other equal both at once', { timeout: 60_000 }, () => {
    const s = small();
    const r = rng(5);
    const a = { nodes: walk(s, r, 50) };
    const b = { nodes: walk(s, r, 50) };
    const both = resettleT(s.field, [a, b]);
    const ab = resettleT(resettleT(s.field, [a]).field, [b]);
    const ba = resettleT(resettleT(s.field, [b]).field, [a]);
    expect(sameT(ab.field.T, both.field.T)).toBe(0);
    expect(sameT(ba.field.T, both.field.T)).toBe(0);
    const again = resettleT(both.field, [a, b]);
    expect(again.lowered).toEqual([]);
    expect(again.addedEdges).toBe(0);
    expect(sameT(again.field.T, both.field.T)).toBe(0);
  });

  // Exact ties (N-1; C-0449 (1)): a node the new roads reach at exactly the cost it already has is not lowered. The
  // field is priced with the roads already in it (T a full recompute over the extended road set) while its road flags
  // are the old ones, so every relaxation from the new edges ties, bit for bit — the case two equal road branches make
  // where one is priced in and the other is added. Then a road set added in two steps lowers, at the second, only the
  // nodes the second strictly improves.
  it('a node the new roads reach at exactly its cost is not lowered: lowered lists strict falls only', { timeout: 60_000 }, () => {
    const s = small();
    const r = rng(31);
    const roads = [{ nodes: walk(s, r, 40) }, { nodes: walk(s, r, 30) }];
    const priced = fieldT(s.lattice, [...s.routes, ...roads], s.field.a);
    const tied = resettleT({ lattice: s.lattice, T: priced.T, road: s.field.road, a: s.field.a }, roads);
    expect(tied.addedEdges).toBeGreaterThan(0);
    expect(tied.lowered).toEqual([]);
    expect(sameT(tied.field.T, priced.T)).toBe(0);
    const out = resettleT(s.field, [roads[0]]);
    const both = resettleT(out.field, [roads[1]]);
    const fell: number[] = [];
    for (let i = 0; i < priced.T.length; i += 1) if (priced.T[i] < out.field.T[i]) fell.push(i);
    expect(both.lowered).toEqual(fell);
    // Ties met while the lowering propagates: the priced field with one node u of the new roads put back to its old,
    // higher T. The new edges lower u alone; from u the relaxation reaches the nodes priced through it at exactly their
    // cost, and none of them is lowered — for every such u whose re-settlement gives the priced field back bit for bit.
    let tried = 0;
    for (const u of new Set(roads.flatMap((r) => r.nodes))) {
      if (!(priced.T[u] < s.field.T[u])) continue;
      const raised = Float64Array.from(priced.T);
      raised[u] = s.field.T[u];
      const r1 = resettleT({ lattice: s.lattice, T: raised, road: s.field.road, a: s.field.a }, roads);
      if (sameT(r1.field.T, priced.T) !== 0) continue;
      tried += 1;
      expect(r1.lowered).toEqual([u]);
    }
    expect(tried).toBeGreaterThan(10);
  });

  it('a road along edges already in the road set lowers nothing; a road of non-neighbours is refused', { timeout: 60_000 }, () => {
    const s = small();
    const r = resettleT(s.field, [{ nodes: s.routes[0].nodes.slice(0, 20) }]);
    expect(r.addedEdges).toBe(0);
    expect(r.lowered).toEqual([]);
    const far = s.routes[0].nodes;
    expect(() => resettleT(s.field, [{ nodes: [far[0], far[far.length - 1]] }])).toThrow(RangeError);
  });
});
