// The stage-1 boundary keeps the main plaza inside and clear (Q122's siting share, M0-c-02 S6's N-61; hardening round S4,
// C-0475): the lattice triangles within the attraction distance of the plaza's reservation are selected whole
// (`levelSet`'s `keepClear`), so the boundary the trace pins never crosses the core it must enclose (§4.2 S3 (9),
// F-WALL). The cell M0-x-06's Q52 E 1918289972 (bridge × frame, the small river frame) refused S3 with F-WALL "crosses
// the core" because the slice's own boundary — OUR OWN INTERMEDIATE — crossed the plaza: a node just outside the plaza,
// between its side and the river, lay beyond t₁ (the plaza's ring and the river block T there).
import { LATTICE } from '@plat/kernel';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { keepsClear, smoothOutline } from '../../src/siting/levelset.js';
import { insideRing, levelSet, RIVER_BLUEPRINT, runBase, s3Slice, selectNodes, type BaseBlueprint, type S3Commit, type S3Slice } from '../../src/index.js';
import { P, smallSite } from './support.js';

/** M0-x-06's small river frame (testkit's `SMALL_RIVER`): CITY, a 30 ha frame, the river from the west, 6 ha walled. */
const SMALL_RIVER: BaseBlueprint = { ...RIVER_BLUEPRINT, size: { ...RIVER_BLUEPRINT.size, areaHa: 30 }, walledHa: 6 };

/**
 * The boundary's defects against the plaza: the outline's points inside or on it, whether the outline keeps it clear,
 * the exact contour's points inside or on it, and the gates inside or on it.
 */
function againstPlaza(s: Pick<S3Slice, 'plaza' | 'levelSet' | 'gates'>): { inside: number; clear: boolean; contourIn: number; gatesIn: number } {
  const ring = s.plaza.ring;
  const inside = s.levelSet.outline.filter((p) => insideRing(ring, p, true)).length;
  const contourIn = s.levelSet.contour.filter((p) => insideRing(ring, p, true)).length;
  const gatesIn = s.gates.filter((g) => insideRing(ring, g.at, true)).length;
  return { inside, clear: keepsClear(s.levelSet.outline, [ring]), contourIn, gatesIn };
}

const CLEAR = { inside: 0, clear: true, contourIn: 0, gatesIn: 0 };

describe("the stage-1 boundary keeps the plaza clear (Q122's siting share; C-0475)", () => {
  it("Q52 E's cell 1918289972 (bridge × frame on the small river frame): S3 commits, its boundary clear of the plaza", { timeout: 300_000 }, () => {
    const { model, report } = runBase(SMALL_RIVER, 1918289972, { kind: 'all' });
    // before the round: S3 refused E_SELF_INTERSECT "F-WALL: the trace crosses the core …" (checks/M0-c-02-notes.md N-61)
    expect(report.bugs.filter((b) => b.stage === 'S3')).toEqual([]);
    expect(model.data.get('s3.commit') as S3Commit | undefined).toBeDefined();
    const s = model.data.get('s3.slice') as S3Slice;
    // the river runs under the plaza on this seed
    expect(s.site.water.faces.length).toBeGreaterThan(0);
    expect(s.lattice.reservedNodes.some((i) => s.lattice.water[i] === 1)).toBe(true);
    expect(againstPlaza(s)).toEqual(CLEAR);
    for (const q of s.plaza.ring) expect(insideRing(s.levelSet.outline, q)).toBe(true);
    // the declared shift: the selection is T's at t₁ and one cell more — the node between the plaza's side and the river
    const tOnly = levelSet(s.field, s.threshold.t);
    expect(againstPlaza({ ...s, levelSet: tOnly })).toMatchObject({ clear: false });
    let added = 0;
    for (let i = 0; i < tOnly.selected.length; i += 1) {
      expect(tOnly.selected[i] === 1 && s.levelSet.selected[i] === 0).toBe(false);
      if (s.levelSet.selected[i] === 1 && tOnly.selected[i] === 0) added += 1;
    }
    expect(added).toBe(1);
    expect(s.levelSet.landCm2).toBe(s.threshold.landCm2 + s.lattice.cellAreaCm2);
  });

  it("the item's small flat frame (30 ha, 6 ha walled), seeds 81 and 136: T's own contour cut a plaza corner; the boundary now keeps it clear", () => {
    for (const seed of [81, 136]) {
      const s = s3Slice(smallSite(seed, { frameAreaHa: 30, walledHa: 6 }));
      expect(againstPlaza(s), `seed ${String(seed)}`).toEqual(CLEAR);
      // T's selection alone: one contour vertex inside the plaza (the clearing adds the nodes that hold it out)
      const tOnly = levelSet(s.field, s.threshold.t);
      expect(againstPlaza({ ...s, levelSet: tOnly }).contourIn, `seed ${String(seed)}`).toBe(1);
      expect(s.levelSet.landCm2 - s.threshold.landCm2).toBeCloseTo(s.lattice.cellAreaCm2, 3);
    }
  });

  it("every slice of the item's small sites keeps its plaza inside and clear: no boundary point, no gate, inside the reservation", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 2_000_000 }), fc.constantFrom(6, 30), (seed, walledHa) => {
        const s = s3Slice(smallSite(seed, { frameAreaHa: walledHa === 6 ? 30 : 400, walledHa }));
        expect(againstPlaza(s)).toEqual(CLEAR);
        // the selection holds T's at t₁ (the clearing only adds)
        const { lattice, T } = s.field;
        for (let i = 0; i < T.length; i += 1) if (lattice.interior[i] === 1 && lattice.water[i] === 0 && T[i] <= s.threshold.t) expect(s.levelSet.selected[i]).toBe(1);
      }),
      { numRuns: 40 },
    );
  });

  it('keepsClear: the ring strictly inside, no side of the outline within the attraction distance (26 cm) of a side of it', () => {
    const square = [P(0, 0), P(10_000, 0), P(10_000, 10_000), P(0, 10_000)];
    const tri = (x: number, y: number): ReturnType<typeof P>[] => [P(x, y), P(x + 300, y), P(x, y + 300)];
    expect(keepsClear(square, [tri(5_000, 5_000)])).toBe(true);
    expect(keepsClear(square, [])).toBe(true);
    // 27 cm off the side: clear; 25 cm: within the attraction distance; on it, across it, outside it: not clear
    expect(keepsClear(square, [tri(5_000, 27)])).toBe(true);
    expect(keepsClear(square, [tri(5_000, 25)])).toBe(false);
    expect(keepsClear(square, [tri(5_000, 0)])).toBe(false);
    expect(keepsClear(square, [tri(9_900, 5_000)])).toBe(false);
    expect(keepsClear(square, [tri(20_000, 5_000)])).toBe(false);
  });

  it("the outline's smoothing is not kept where it would cut into a ring kept clear (the corner's Chaikin cut over the plaza)", () => {
    const square = [P(0, 0), P(10_000, 0), P(10_000, 10_000), P(0, 10_000)];
    const guards = { inside: new Set<number>(), outside: new Set<number>() };
    // with nothing kept clear the two passes are kept
    expect(smoothOutline(square, [], [], guards).passes).toBe(2);
    // a ring inside the square's corner, beyond the chord the first pass cuts (x + y > 17 500): no pass is kept
    const corner = [P(9_300, 9_300), P(9_600, 9_300), P(9_300, 9_600)];
    const kept = smoothOutline(square, [], [], guards, [corner]);
    expect(kept.passes).toBe(0);
    expect(kept.outline).toEqual(square);
    expect(keepsClear(kept.outline, [corner])).toBe(true);
    // a ring well inside keeps both passes
    expect(smoothOutline(square, [], [], guards, [[P(4_000, 4_000), P(6_000, 4_000), P(5_000, 6_000)]]).passes).toBe(2);
  });
});

// The clearing's own contract at the interface (C-0475 (2); the s4 closing check's F1 / F2, round S5): "every interior
// vertex of a lattice triangle within LATTICE.attractCm (26 cm, plus the snap's 1 cm) of such a ring is added". The
// tests below judge `selectNodes` against an independent reading of that sentence: the lattice's triangles enumerated
// from its adjacency alone (both orientations, each once), and the closed-region gap of a triangle and a ring computed
// here, exactly on the integer centimetres the rings and the lattice carry.

type Pt = { x: number; y: number };
/** C-0475 (2)'s reach: the attraction distance and the snap's centimetre. */
const REACH = LATTICE.attractCm + 1;

const orient = (a: Pt, b: Pt, c: Pt): number => Math.sign((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
const onSeg = (a: Pt, b: Pt, p: Pt): boolean =>
  orient(a, b, p) === 0 && Math.min(a.x, b.x) <= p.x && p.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= p.y && p.y <= Math.max(a.y, b.y);
function meet(a: Pt, b: Pt, c: Pt, d: Pt): boolean {
  const o1 = orient(a, b, c);
  const o2 = orient(a, b, d);
  const o3 = orient(c, d, a);
  const o4 = orient(c, d, b);
  if (o1 !== o2 && o3 !== o4 && o1 !== 0 && o2 !== 0 && o3 !== 0 && o4 !== 0) return true;
  return onSeg(a, b, c) || onSeg(a, b, d) || onSeg(c, d, a) || onSeg(c, d, b);
}
function distPS(p: Pt, a: Pt, b: Pt): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}
/** Is `p` inside the closed polygon `poly` (its boundary included)? Even-odd, exact on integers. */
function inClosed(poly: readonly Pt[], p: Pt): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i, i += 1) {
    const a = poly[j];
    const b = poly[i];
    if (onSeg(a, b, p)) return true;
    if (a.y > p.y !== b.y > p.y && orient(a, b, p) * (b.y > a.y ? 1 : -1) > 0) inside = !inside;
  }
  return inside;
}
/** The gap (cm) between the closed regions of two polygons: 0 where they meet or one holds a vertex of the other. */
function gapOf(u: readonly Pt[], v: readonly Pt[]): number {
  if (u.some((p) => inClosed(v, p)) || v.some((p) => inClosed(u, p))) return 0;
  let g = Infinity;
  for (let i = 0; i < u.length; i += 1) {
    const a = u[i];
    const b = u[(i + 1) % u.length];
    for (let j = 0; j < v.length; j += 1) {
      const c = v[j];
      const d = v[(j + 1) % v.length];
      if (meet(a, b, c, d)) return 0;
      g = Math.min(g, distPS(a, c, d), distPS(b, c, d), distPS(c, a, b), distPS(d, a, b));
    }
  }
  return g;
}

/** The flat fixture's slice the interface tests read (the 400 ha frame, 30 ha walled, seed 1: a real field and lattice). */
let FLAT: S3Slice | undefined;
function flat(): S3Slice {
  FLAT ??= s3Slice(smallSite(1));
  return FLAT;
}

/** Every lattice triangle (three mutually adjacent nodes), each once, from the adjacency alone. */
function trianglesOf(s: S3Slice): [number, number, number][] {
  const { adjacency } = s.lattice;
  const n = s.lattice.points.length;
  const adj = (u: number, v: number): boolean => {
    for (let d = 0; d < 6; d += 1) if (adjacency[6 * u + d] === v) return true;
    return false;
  };
  const seen = new Set<string>();
  const out: [number, number, number][] = [];
  for (let i = 0; i < n; i += 1) {
    for (let d = 0; d < 6; d += 1) {
      const j = adjacency[6 * i + d];
      const k = adjacency[6 * i + ((d + 1) % 6)];
      if (j === -1 || k === -1 || !adj(j, k)) continue;
      const t = [i, j, k].sort((a, b) => a - b) as [number, number, number];
      const key = t.join(',');
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(t);
    }
  }
  return out;
}

/** C-0475 (2) read independently: the interior vertices of every triangle within REACH of `ring`, sorted. */
function judged(s: S3Slice, ring: readonly Pt[]): number[] {
  const { points, interior } = s.lattice;
  const out = new Set<number>();
  for (const t of trianglesOf(s)) {
    if (gapOf(t.map((v) => points[v]), ring) < REACH) for (const v of t) if (interior[v] === 1) out.add(v);
  }
  return [...out].sort((a, b) => a - b);
}

/** The nodes `selectNodes` selects at t = −1 (nothing by T) with `ring` kept clear, sorted. */
function selectedBy(s: S3Slice, ring: readonly Pt[]): number[] {
  const { selected, filled } = selectNodes(s.field, -1, [ring as never]);
  expect(filled).toBe(0);
  const out: number[] = [];
  for (let v = 0; v < selected.length; v += 1) if (selected[v] === 1) out.push(v);
  return out;
}

/** A node near the lattice's middle whose east, north-east and north-west neighbours and their own neighbours are interior. */
function middleNode(s: S3Slice): { i: number; e: number; ne: number; nw: number } {
  const { points, adjacency, interior } = s.lattice;
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const p of points) {
    x0 = Math.min(x0, p.x);
    y0 = Math.min(y0, p.y);
    x1 = Math.max(x1, p.x);
    y1 = Math.max(y1, p.y);
  }
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const deep = (v: number): boolean => interior[v] === 1 && [0, 1, 2, 3, 4, 5].every((d) => adjacency[6 * v + d] !== -1 && interior[adjacency[6 * v + d]] === 1);
  let best = -1;
  let bestD = Infinity;
  for (let i = 0; i < points.length; i += 1) {
    const [e, ne, nw] = [adjacency[6 * i], adjacency[6 * i + 1], adjacency[6 * i + 2]];
    if (e === -1 || ne === -1 || nw === -1 || ![i, e, ne, nw].every(deep)) continue;
    const d = Math.hypot(points[i].x - cx, points[i].y - cy);
    if (d < bestD) {
      best = i;
      bestD = d;
    }
  }
  return { i: best, e: adjacency[6 * best], ne: adjacency[6 * best + 1], nw: adjacency[6 * best + 2] };
}

const sorted = (xs: number[]): number[] => [...xs].sort((a, b) => a - b);
const centroid = (s: S3Slice, t: number[]): Pt => {
  const p = t.map((v) => s.lattice.points[v]);
  return { x: Math.round((p[0].x + p[1].x + p[2].x) / 3), y: Math.round((p[0].y + p[1].y + p[2].y) / 3) };
};
/** A small ring (1 m wide) about `c`. */
const small = (c: Pt): Pt[] => [
  { x: c.x - 50, y: c.y - 30 },
  { x: c.x + 50, y: c.y - 30 },
  { x: c.x, y: c.y + 60 },
];

describe("the clearing's contract at the interface (C-0475 (2); round S5's pins of the s4 check's F1 / F2)", () => {
  it('a ring inside one upward lattice triangle selects exactly its three vertices (F1: the (i, e, ne) triangles visited)', () => {
    const s = flat();
    const { i, e, ne } = middleNode(s);
    const ring = small(centroid(s, [i, e, ne]));
    expect(selectedBy(s, ring)).toEqual(sorted([i, e, ne]));
    expect(selectedBy(s, ring)).toEqual(judged(s, ring));
  });

  it('a ring inside one downward lattice triangle selects exactly its three vertices (F1: the (i, ne, nw) triangles visited)', () => {
    const s = flat();
    const { i, ne, nw } = middleNode(s);
    const ring = small(centroid(s, [i, ne, nw]));
    expect(selectedBy(s, ring)).toEqual(sorted([i, ne, nw]));
    expect(selectedBy(s, ring)).toEqual(judged(s, ring));
  });

  it('a ring just inside 27 cm (26 cm + the snap) of a triangle\'s side selects that triangle; just beyond it does not (F2: the side gap)', () => {
    const s = flat();
    const { i, e, ne, nw } = middleNode(s);
    const P0 = s.lattice.points;
    // the side (i, ne) the upward (i, e, ne) and the downward (i, ne, nw) triangles share; a ring inside the upward one,
    // its apex `off` cm from the side's midpoint along the normal into the upward triangle
    const a = P0[i];
    const b = P0[ne];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    let nx = -(b.y - a.y) / len;
    let ny = (b.x - a.x) / len;
    if (nx * (P0[e].x - a.x) + ny * (P0[e].y - a.y) < 0) {
      nx = -nx;
      ny = -ny;
    }
    const tx = (b.x - a.x) / len;
    const ty = (b.y - a.y) / len;
    const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const ringAt = (off: number): Pt[] => {
      const at = (along: number, out: number): Pt => ({ x: Math.round(m.x + tx * along + nx * out), y: Math.round(m.y + ty * along + ny * out) });
      return [at(0, off), at(30, off + 40), at(-30, off + 40)];
    };
    const gap = (r: Pt[]): number => gapOf([a, b], r);
    // the ring nearest the side within the reach, and the nearest beyond it (the rounding makes the gap move by < 1 cm)
    let inside: Pt[] | undefined;
    let beyond: Pt[] | undefined;
    for (let off = 20; off <= 34 && (inside === undefined || beyond === undefined); off += 0.25) {
      const r = ringAt(off);
      const g = gap(r);
      if (inside === undefined && g > REACH - 1 && g < REACH) inside = r;
      if (beyond === undefined && g >= REACH && g < REACH + 1) beyond = r;
    }
    expect(inside).toBeDefined();
    expect(beyond).toBeDefined();
    const rIn = inside as Pt[];
    const rOut = beyond as Pt[];
    expect(gap(rIn)).toBeGreaterThan(26);
    expect(gap(rIn)).toBeLessThan(27);
    expect(gap(rOut)).toBeGreaterThanOrEqual(27);
    expect(gap(rOut)).toBeLessThan(28);
    // just inside: the downward triangle across the side is selected too (its far vertex nw); just beyond: it is not
    expect(selectedBy(s, rIn)).toEqual(sorted([i, e, ne, nw]));
    expect(selectedBy(s, rOut)).toEqual(sorted([i, e, ne]));
    expect(selectedBy(s, rIn)).toEqual(judged(s, rIn));
    expect(selectedBy(s, rOut)).toEqual(judged(s, rOut));
  });

  it('a 2 cm sliver ring across four cells selects every triangle it crosses whole, those with no vertex of either inside the other included (F2)', () => {
    const s = flat();
    const { i, e, ne } = middleNode(s);
    const c = centroid(s, [i, e, ne]);
    const w = 4 * s.lattice.spacingCm;
    const ring: Pt[] = [c, { x: c.x + w, y: c.y }, { x: c.x + w, y: c.y + 2 }];
    const want = judged(s, ring);
    expect(selectedBy(s, ring)).toEqual(want);
    // the case is exercised: a crossed triangle neither holding a vertex of the ring nor having a vertex in it, whose
    // vertices containment alone would not select
    const { points } = s.lattice;
    const crossedOnly = trianglesOf(s).filter((t) => {
      const tri = t.map((v) => points[v]);
      return gapOf(tri, ring) === 0 && !tri.some((p) => inClosed(ring, p)) && !ring.some((p) => inClosed(tri, p));
    });
    expect(crossedOnly.length).toBeGreaterThan(0);
    const byContainment = new Set<number>();
    for (const t of trianglesOf(s)) {
      const tri = t.map((v) => points[v]);
      if (tri.some((p) => inClosed(ring, p)) || ring.some((p) => inClosed(tri, p))) for (const v of t) byContainment.add(v);
    }
    expect(want.length).toBeGreaterThan(byContainment.size);
    expect(want.length).toBe(11);
  });
});

describe("the clearing on the registered family's slices (C-0475's declared +1 node; round S5's pins of the s4 check's F1 / F2)", () => {
  /** The stage-1 selection against T's own at t₁: the nodes added (T's selection is never lost). */
  function addedOver(s: S3Slice): number {
    const tOnly = levelSet(s.field, s.threshold.t);
    let added = 0;
    for (let i = 0; i < tOnly.selected.length; i += 1) {
      expect(tOnly.selected[i] === 1 && s.levelSet.selected[i] === 0).toBe(false);
      if (s.levelSet.selected[i] === 1 && tOnly.selected[i] === 0) added += 1;
    }
    return added;
  }

  // M0-x-06's cell/bridge × frame family on the small river frame (C-0475's declared shift): index 39, whose added node
  // only a downward triangle near the plaza brings (F1), and index 72, whose added node only the side-gap reach brings (F2)
  for (const [index, seed] of [
    [39, 1220771869],
    [72, 2973157694],
  ] as const) {
    it(`the bridge × frame family's index ${String(index)} (runBase(SMALL_RIVER, ${String(seed)})): T's selection at t₁ plus exactly one node, the plaza kept clear`, { timeout: 300_000 }, () => {
      const { model } = runBase(SMALL_RIVER, seed, { kind: 'all' });
      const s = model.data.get('s3.slice') as S3Slice;
      expect(addedOver(s)).toBe(1);
      expect(againstPlaza(s)).toEqual(CLEAR);
    });
  }

  it("the item's small flat frame (30 ha, 6 ha walled), seed 19818: T's selection at t₁ plus exactly two nodes (F2)", () => {
    const s = s3Slice(smallSite(19818, { frameAreaHa: 30, walledHa: 6 }));
    expect(addedOver(s)).toBe(2);
    expect(againstPlaza(s)).toEqual(CLEAR);
  });
});
