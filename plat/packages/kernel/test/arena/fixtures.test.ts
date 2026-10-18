// M0-a-02's exit bar, first part: the arena's hard invariants hold on the hand-built fixtures — the structural rows of
// §3.10 an arena holds whatever wrote it: one vertex per lattice point; next and prev inverse, next continuing at the
// twin's origin, `out` leaving its vertex; every face record's outer half-edge of its level or coarser, its parent a
// live face one level up, its outer ring counter-clockwise and its holes not, no half-edge on two records of a level;
// level consistency (rule 3): an edge's birth level is the lowest among its rows, no vertex is coarser than every edge
// and vertex row at it, and a vertex finer than an incident edge lies inside that edge's run — its coarser incident
// edges exactly two, of one level, with identical rows of that level. The full suite at its scopes is M0-a-14's.
import { describe, expect, it } from 'vitest';
import {
  faceWalk,
  isFaceLive,
  isHalfEdgeLive,
  LEVELS,
  outgoing,
  rowKey,
  rowsOn,
  type Plat,
} from '../../src/arena/index.js';
import type { Level } from '../../src/types/index.js';
import { buildArena, dressQuarters, LAKE, permutation, QUARTERS, ringArea2, type Built } from './support.js';

/** The violations of the structural invariants (empty when they hold). */
function violations(b: Built, dressed: boolean): string[] {
  const p: Plat = b.plat;
  const out: string[] = [];
  const t = p.halfEdges;
  const at = new Map<string, number>();
  for (let v = 0; v < p.slots.vertex.top; v++) {
    const k = `${p.vertices.x[v]},${p.vertices.y[v]}`;
    if (at.has(k)) out.push(`two vertices at ${k}`);
    at.set(k, v);
    const o = p.vertices.out[v];
    if (o !== -1 && t.origin[o] !== v) out.push(`out of ${v} does not leave it`);
  }
  for (let h = 0; h < 2 * p.slots.pair.top; h++) {
    if (!isHalfEdgeLive(p, h)) continue;
    if (t.prev[t.next[h]] !== h) out.push(`prev(next(${h})) ≠ ${h}`);
    if (t.origin[t.next[h]] !== t.origin[h ^ 1]) out.push(`next(${h}) does not leave its end`);
  }
  for (const n of LEVELS) {
    const seen = new Set<number>();
    for (const f of b.faces[n]) {
      if (!isFaceLive(p, n, f)) out.push(`L${n} face ${f} dead`);
      if (t.level[p.faces[n].outer[f] >> 1] > n) out.push(`L${n} face ${f}: outer half-edge finer than its level`);
      if (n > 0 && !isFaceLive(p, (n - 1) as Level, p.faces[n].parent[f])) out.push(`L${n} face ${f}: no parent at L${n - 1}`);
      const rings = faceWalk(p, n, f);
      if (!(ringArea2(p, rings[0]) > 0)) out.push(`L${n} face ${f}: outer ring not counter-clockwise`);
      for (const r of rings.slice(1)) if (ringArea2(p, r) > 0) out.push(`L${n} face ${f}: a hole ring counter-clockwise`);
      for (const h of rings.flat()) {
        if (seen.has(h)) out.push(`L${n}: half-edge ${h} on two face records`);
        seen.add(h);
      }
    }
  }
  if (!dressed) return out;
  const rowLevels = (kind: 'edge' | 'vertex', e: number) => rowsOn(p, kind, e).map((r) => p.roles.level[r]);
  const rowsAtLevel = (h: number, level: number) => rowsOn(p, 'edge', h).filter((r) => p.roles.level[r] === level).map((r) => JSON.stringify(rowKey(p, r))).join(';');
  for (let e = 0; e < p.slots.pair.top; e++) {
    const levels = rowLevels('edge', 2 * e);
    if (levels.length === 0) out.push(`edge pair ${e} carries no row`);
    else if (Math.min(...levels) !== t.level[e]) out.push(`edge pair ${e}: birth level ${t.level[e]}, lowest row level ${Math.min(...levels)}`);
  }
  for (let v = 0; v < p.slots.vertex.top; v++) {
    const lv = p.vertices.level[v];
    const inc = outgoing(p, v);
    const lowest = Math.min(...inc.map((h) => t.level[h >> 1]), ...rowLevels('vertex', v));
    if (lv < lowest) out.push(`vertex ${v} (L${lv}) is coarser than every edge and row at it`);
    const coarser = inc.filter((h) => t.level[h >> 1] < lv);
    if (coarser.length > 0) {
      const l0 = t.level[coarser[0] >> 1];
      if (coarser.length !== 2 || t.level[coarser[1] >> 1] !== l0 || rowsAtLevel(coarser[0], l0) !== rowsAtLevel(coarser[1], l0)) {
        out.push(`vertex ${v} (L${lv}) is not inside one coarser run`);
      }
    }
  }
  return out;
}

describe('the arena\'s hard invariants on the hand-built fixtures (exit bar)', () => {
  it('hold on QUARTERS (plain and dressed with rows) and LAKE, in any allocation order', () => {
    for (const seed of [0, 7, 8]) {
      const order = (n: number, m: number) => (seed === 0 ? {} : { vertices: permutation(n, seed), edges: permutation(m, seed + 1) });
      expect(violations(buildArena(QUARTERS, order(QUARTERS.vertices.length, QUARTERS.edges.length)), false), `quarters ${seed}`).toEqual([]);
      expect(violations(dressQuarters(buildArena(QUARTERS, order(QUARTERS.vertices.length, QUARTERS.edges.length))), true), `dressed ${seed}`).toEqual([]);
      expect(violations(buildArena(LAKE, order(LAKE.vertices.length, LAKE.edges.length)), false), `lake ${seed}`).toEqual([]);
    }
  });

  it('the checker is not vacuous: a broken rotation, a coarse row on a fine edge, a vertex on two coarser runs and a coincident vertex are each reported', () => {
    const a = buildArena(QUARTERS);
    a.plat.halfEdges.prev[a.plat.halfEdges.next[a.he[0]]] = a.he[1];
    expect(violations(a, false).some((m) => m.startsWith('prev(next('))).toBe(true);
    const b = dressQuarters(buildArena(QUARTERS));
    b.plat.halfEdges.level[b.he[17] >> 1] = 3; // the L2 line made L3 under its L2 kerb row
    expect(violations(b, true)).toContain(`edge pair ${b.he[17] >> 1}: birth level 3, lowest row level 2`);
    const c = dressQuarters(buildArena(QUARTERS));
    c.plat.vertices.level[c.v[8]] = 2; // the L1 centre made L2: four L1 edges at it
    expect(violations(c, true)).toContain(`vertex ${c.v[8]} (L2) is not inside one coarser run`);
    const d = dressQuarters(buildArena(QUARTERS));
    d.plat.vertices.level[d.v[9]] = 0; // a Steiner vertex promoted onto its L0 run (rule 3): still valid, nothing reported
    expect(violations(d, true)).toEqual([]);
    d.plat.vertices.x[d.v[18]] = 750;
    d.plat.vertices.y[d.v[18]] = 0; // the antenna's end moved onto (750, 0)
    expect(violations(d, true)).toContain('two vertices at 750,0');
  });
});
