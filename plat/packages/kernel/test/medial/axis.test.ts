// M0-a-12: medialAxis(rings, stepCm) — §3.8's sampled medial axis, "a Voronoi of boundary samples at 1 m
// (`sampleBoundary`) …, pruned by clearance" (C-0007, C-0172, C-0176). The item's listed claims: the medial axis of a
// rectangle is its ridge within one sample step; of a holed face a graph with h cycles — on the faces the tests draw, on
// M0-a-11's §13.1 holed polygons at three seeds, on holes and slots 8 – 60 cm from the other rings and on frames 9 cm
// wide; a face resolved is always connected with one cycle per hole (C-0176 (4)); a face without holes is a tree, never
// split by the pruning (C-0176 (3)). Beside them: the step pinned at 1 m (the site count), the refinement near narrow
// passages and its bound, every node inside the face and every arc clear of the boundary (unresolved faces too), each node's
// clearance its distance to the nearest sample, the canonical order, determinism and translation, §3.11's no-input rows,
// the refusals, the inputs the skeleton's contract refuses (the `spine` reader's downgrade is exactly where they arrive;
// `resolved` false where the lattice cannot resolve a passage), the pruning rule's corner threshold, and the injection
// into `skeleton(rings, 'spine', { medialAxis })`. Judged by support.ts's independent references.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { sampleBoundary } from '../../src/geom/index.js';
import { medialAxis, MEDIAL_MERGE_CM, MEDIAL_REFINE_CAP, MEDIAL_STEP_CM, type MedialAxis } from '../../src/medial/index.js';
import { roundHalfAway } from '../../src/num/lattice.js';
import { skeleton } from '../../src/skeleton/index.js';
import { holedPolygons, notched } from '../skeleton/support.js';
import {
  boundaryDist,
  generator,
  hausdorffToSegment,
  insideEvenOdd,
  meet,
  place,
  pt,
  rectLocal,
  segDist,
  topology,
  TIMEOUT,
  type Ring,
} from './support.js';

const STEP = MEDIAL_STEP_CM;

function axisOf(rings: Ring[], step = STEP): MedialAxis {
  const r = medialAxis(rings, step);
  if (!r.ok) throw new Error(`medialAxis refused: ${r.code} ${r.detail}`);
  return r.value;
}

/** Every node strictly inside the face by the even–odd rule, every arc meeting no ring edge. */
function checkInside(rings: Ring[], axis: MedialAxis): void {
  for (const n of axis.nodes) expect(insideEvenOdd(rings, n.x, n.y)).toBe(true);
  for (const { a, b } of axis.arcs) {
    const u = axis.nodes[a];
    const v = axis.nodes[b];
    for (const r of rings) {
      for (let i = 0; i < r.length; i += 1) {
        const p = r[i];
        const q = r[(i + 1) % r.length];
        expect(meet(p.x, p.y, q.x, q.y, u.x, u.y, v.x, v.y)).toBe(false);
      }
    }
  }
}

/**
 * The world shift's rounding: the axis is built and ordered in the rings' bounding-box frame and shifted to world cm by
 * the integer corner (C-0172 (6)); a world coordinate is that local double plus the corner, rounded, so a distance or a
 * tie read in world cm can differ from the local one by a few ulps of the coordinate (≤ 2 × 10⁻⁹ cm within ±10⁷ cm).
 */
const WORLD_ULPS = 1e-6;

/**
 * The canonical order, read in world cm: nodes with x non-decreasing (a common integer shift rounds monotonically, so the
 * local (x, y, t) order keeps x in order; its y and t order within an x tie is held exactly by "the canonical order in the
 * local frame" below), arcs a < b by (a, b), no repeated arc, and no node without an arc unless it is the only one — or,
 * with `pieces`, a ring set whose even–odd region has several pieces, where a piece pruned whole is its one node of
 * greatest clearance (C-0176 (3)).
 */
function checkCanonical(axis: MedialAxis, pieces = false): void {
  // centres within 1 mm are one node: no arc that short (C-0172 (6)), measured in the local frame — here in world cm,
  // within the shift's rounding (a random set once gave an arc of exactly 1 mm read as 0.09999999999990905 in world cm)
  for (const { a, b } of axis.arcs) {
    expect(Math.hypot(axis.nodes[a].x - axis.nodes[b].x, axis.nodes[a].y - axis.nodes[b].y)).toBeGreaterThanOrEqual(MEDIAL_MERGE_CM - WORLD_ULPS);
  }
  for (let i = 1; i < axis.nodes.length; i += 1) expect(axis.nodes[i - 1].x).toBeLessThanOrEqual(axis.nodes[i].x);
  for (let i = 0; i < axis.arcs.length; i += 1) {
    const { a, b } = axis.arcs[i];
    expect(a).toBeLessThan(b);
    expect(b).toBeLessThan(axis.nodes.length);
    if (i > 0) {
      const p = axis.arcs[i - 1];
      expect(p.a < a || (p.a === a && p.b < b)).toBe(true);
    }
  }
  if (axis.nodes.length > 1 && !pieces) {
    const deg = new Int32Array(axis.nodes.length);
    for (const { a, b } of axis.arcs) {
      deg[a] += 1;
      deg[b] += 1;
    }
    expect(deg.every((x) => x > 0)).toBe(true);
  }
}

describe('medialAxis — the rectangle is its ridge within one sample step', () => {
  it(
    'axis-aligned rectangles: every node within one step of the ridge and the ridge within one step of the graph',
    () => {
      for (const [w, h] of [
        [2000, 1000],
        [3000, 450],
        [1234, 987],
        [5000, 4900],
        [800, 790],
        [12_000, 2_500],
        [301, 299],
      ]) {
        const ring = place(rectLocal(w, h), 0, 0, 0);
        const axis = axisOf([ring]);
        const half = (w - h) / 2;
        const d = hausdorffToSegment(axis, -half, 0, half, 0);
        expect(d.graphToSeg, `${w} × ${h}`).toBeLessThanOrEqual(STEP);
        expect(d.segToGraph, `${w} × ${h}`).toBeLessThanOrEqual(STEP);
        expect(topology(axis)).toEqual({ components: 1, cycles: 0 });
        checkInside([ring], axis);
        checkCanonical(axis);
      }
    },
    TIMEOUT,
  );

  it(
    'rotated, snapped rectangles anywhere in the range: the same bar on 300 seeded cases',
    () => {
      const rnd = generator(2026);
      for (let k = 0; k < 300; k += 1) {
        const a = 300 + Math.floor(rnd() * 4000);
        const b = 300 + Math.floor(rnd() * 3000);
        const w = Math.max(a, b);
        const h = Math.min(a, b);
        const deg = rnd() * 360;
        const cx = Math.floor(rnd() * 14_000_000) - 7_000_000;
        const cy = Math.floor(rnd() * 14_000_000) - 7_000_000;
        const ring = place(rectLocal(w, h), deg, cx, cy);
        const axis = axisOf([ring]);
        const rad = (deg * Math.PI) / 180;
        const half = (w - h) / 2;
        const d = hausdorffToSegment(axis, cx - half * Math.cos(rad), cy - half * Math.sin(rad), cx + half * Math.cos(rad), cy + half * Math.sin(rad));
        expect(d.graphToSeg, `case ${k}`).toBeLessThanOrEqual(STEP);
        expect(d.segToGraph, `case ${k}`).toBeLessThanOrEqual(STEP);
        expect(topology(axis).cycles).toBe(0);
      }
    },
    TIMEOUT,
  );

  it('a square is one node at its centre (no arc survives: the interior node of greatest clearance)', () => {
    for (const s of [1000, 1999, 450]) {
      const axis = axisOf([place(rectLocal(s, s), 0, 500, -700)]);
      expect(axis.arcs).toHaveLength(0);
      expect(axis.nodes).toHaveLength(1);
      expect(Math.hypot(axis.nodes[0].x - 500, axis.nodes[0].y + 700)).toBeLessThanOrEqual(STEP);
      expect(axis.nodes[0].t).toBeGreaterThan(s / 2 - STEP);
    }
  });
});

describe('medialAxis — the step: boundary samples at 1 m (§3.8)', () => {
  it('the default step is 100 cm: a 20 × 10 m rectangle is triangulated over its 60 samples, none refined', () => {
    expect(MEDIAL_STEP_CM).toBe(100);
    for (const [deg, cx, cy] of [[0, 0, 0], [0, 123_456, -654_321], [90, 7, 9]] as const) {
      const r = medialAxis([place(rectLocal(2000, 1000), deg, cx, cy)]); // the default step, no argument
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.value.stepCm).toBe(100);
      expect(r.value.sites).toBe(60);
      expect(r.value.refined).toBe(0);
      expect(r.value.resolved).toBe(true);
    }
    // the count follows the step: 50 cm gives 120, 300 cm gives 22 (each side cut into ⌈length ÷ step⌉ equal parts: 7 + 4 + 7 + 4)
    expect(axisOf([place(rectLocal(2000, 1000), 0, 0, 0)], 50).sites).toBe(120);
    expect(axisOf([place(rectLocal(2000, 1000), 0, 0, 0)], 300).sites).toBe(22);
  });
});

describe('medialAxis — a holed face is a graph with h cycles', () => {
  function holed(nh: number, deg: number, rnd: () => number, cx: number, cy: number, holesClockwise: boolean): Ring[] {
    const W = 1500 * nh + 1000;
    const H = 2500 + Math.floor(rnd() * 2000);
    const rings = [place(rectLocal(W, H), deg, cx, cy)];
    for (let i = 0; i < nh; i += 1) {
      const hx = -W / 2 + 750 + 1500 * i;
      const hw = 500 + Math.floor(rnd() * 400);
      const hh = 600 + Math.floor(rnd() * (H - 1600));
      const local = rectLocal(hw, hh, hx, -hh / 2);
      rings.push(place(holesClockwise ? [...local].reverse() : local, deg, cx, cy));
    }
    return rings;
  }

  it(
    'h = 1 … 4 holes, rotated and placed anywhere, holes in either orientation: connected, exactly h independent cycles',
    () => {
      const rnd = generator(77);
      for (let k = 0; k < 120; k += 1) {
        const nh = 1 + (k % 4);
        const rings = holed(nh, rnd() * 360, rnd, Math.floor(rnd() * 2_000_000) - 1_000_000, Math.floor(rnd() * 2_000_000) - 1_000_000, k % 2 === 0);
        const axis = axisOf(rings);
        expect(topology(axis), `case ${k}, ${nh} holes`).toEqual({ components: 1, cycles: nh });
        checkInside(rings, axis);
        checkCanonical(axis);
      }
    },
    TIMEOUT,
  );

  it(
    "M0-a-11's §13.1 holed polygons at seeds 1, 2 and 3 (1 000 each; holes 50 cm and more from the other rings, corners ≥ 6°): resolved, connected, exactly h cycles",
    () => {
      for (const seed of [1, 2, 3]) {
        let refinedFaces = 0;
        const wrong: string[] = [];
        for (const [i, rings] of holedPolygons(seed, 1000).entries()) {
          const axis = axisOf(rings);
          const { components, cycles } = topology(axis);
          const outside = axis.nodes.filter((n) => !insideEvenOdd(rings, n.x, n.y)).length;
          if (!axis.resolved || components !== 1 || cycles !== rings.length - 1 || outside > 0) {
            wrong.push(`#${i}: ${rings.length - 1} holes → resolved ${String(axis.resolved)}, ${components} components, ${cycles} cycles, ${outside} nodes outside`);
          }
          if (axis.refined > 0) refinedFaces += 1;
          if (i % 50 === 0) {
            checkInside(rings, axis);
            checkCanonical(axis);
          }
        }
        expect(wrong, `seed ${seed}`).toEqual([]);
        // the sets whose rings come within a step of each other are the ones refined (about one in nine)
        expect(refinedFaces, `seed ${seed}`).toBeGreaterThan(50);
      }
    },
    TIMEOUT,
  );

  it(
    'every face whose rings keep 8 – 60 cm from each other (holes and a slot of one ring), rotated anywhere: resolved, connected, exactly h cycles',
    () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 2 }),
          fc.array(fc.integer({ min: 8, max: 60 }), { minLength: 8, maxLength: 8 }),
          fc.double({ min: 0, max: 360, noNaN: true }),
          fc.integer({ min: -1_000_000, max: 1_000_000 }),
          fc.integer({ min: -1_000_000, max: 1_000_000 }),
          (holes, gap, deg, cx, cy) => {
            let rings: Ring[];
            if (holes === 0) {
              const w = gap[0];
              const slot: [number, number][] = [[0, 0], [4000, 0], [4000, 3000], [2000 + w, 3000], [2000 + w, 800], [2000, 800], [2000, 3000], [0, 3000]];
              rings = [place(slot, deg, cx, cy)];
            } else {
              const W = 1500 * holes + 1000;
              const H = 2000;
              rings = [place(rectLocal(W, H), deg, cx, cy)];
              let x = -W / 2 + gap[0];
              for (let i = 0; i < holes; i += 1) {
                const hw = 1300 - gap[1 + 3 * i];
                const y0 = -H / 2 + gap[2 + 3 * i];
                const hh = H - gap[2 + 3 * i] - gap[3 + 3 * i];
                rings.push(place(rectLocal(hw, hh, x, y0), deg, cx, cy).reverse());
                x += hw + gap[4 + 3 * i];
              }
            }
            const axis = axisOf(rings);
            expect(axis.resolved).toBe(true);
            expect(topology(axis)).toEqual({ components: 1, cycles: rings.length - 1 });
            checkInside(rings, axis);
          },
        ),
        { numRuns: 200 },
      );
    },
    TIMEOUT,
  );

  it('a face with no hole is a tree (an L, a T, a U, a triangle)', () => {
    const shapes: [number, number][][] = [
      [[0, 0], [3000, 0], [3000, 1000], [1000, 1000], [1000, 3000], [0, 3000]],
      [[0, 0], [3000, 0], [3000, 800], [1900, 800], [1900, 2600], [1100, 2600], [1100, 800], [0, 800]],
      [[0, 0], [2400, 0], [2400, 2000], [1700, 2000], [1700, 700], [700, 700], [700, 2000], [0, 2000]],
      [[0, 0], [1000, 0], [0, 1000]],
    ];
    for (const s of shapes) {
      const ring = place(s, 17, 1000, 1000);
      const axis = axisOf([ring]);
      expect(axis.nodes.length).toBeGreaterThan(1);
      expect(topology(axis)).toEqual({ components: 1, cycles: 0 });
      checkInside([ring], axis);
    }
  });

  it(
    "pruning never splits a face without holes: M0-a-11's notched rectangles, 400 seeded and rotated anywhere, one tree each (C-0176 (3))",
    () => {
      // the shape where the pruning's arcs past a notch carry small clearance: a rule that cut any arc failing the
      // ratio, wherever it lay, split 84 of these 400 into pieces (measured on the replaced rule, C-0172 (5))
      const rnd = generator(9);
      for (let k = 0; k < 400; k += 1) {
        const w = 800 + Math.floor(rnd() * 2400);
        const h = 500 + Math.floor(rnd() * 1500);
        const nw = 100 + Math.floor(rnd() * (w / 3));
        const nh = 60 + Math.floor(rnd() * (h / 2));
        const nx = Math.floor(rnd() * (w - nw - 20)) + 10;
        const ring = notched(w, h, nx, nw, nh, rnd() * 360, Math.floor(rnd() * 100_000), Math.floor(rnd() * 100_000));
        const axis = axisOf([ring]);
        expect(axis.resolved, `case ${k}`).toBe(true);
        expect(topology(axis), `case ${k}`).toEqual({ components: 1, cycles: 0 });
        if (k % 20 === 0) checkInside([ring], axis);
      }
    },
    TIMEOUT,
  );
});

describe('medialAxis — nodes, clearance and order', () => {
  it('each node clearance is its distance to the nearest (rounded) sample, within half a step of the boundary distance', () => {
    const rnd = generator(5);
    for (let k = 0; k < 40; k += 1) {
      const shape: [number, number][] = [[0, 0], [2600, 0], [2600, 900], [1500, 900], [1500, 2200], [0, 2200]];
      const rings = [place(shape, rnd() * 360, Math.floor(rnd() * 100_000), Math.floor(rnd() * 100_000))];
      const axis = axisOf(rings);
      // no piece is crowded here (no two walls within a step), so the sites are the step's samples alone
      expect(axis.refined).toBe(0);
      // the sites: the samples of the rings taken in their bounding-box corner's frame, rounded there (C-0172 (2))
      const ox = Math.min(...rings.flat().map((p) => p.x));
      const oy = Math.min(...rings.flat().map((p) => p.y));
      const local = rings.map((r) => r.map((p) => pt(p.x - ox, p.y - oy)));
      const samples = sampleBoundary(local, STEP).flat().map((s) => ({ x: roundHalfAway(s.x) + ox, y: roundHalfAway(s.y) + oy }));
      for (const n of axis.nodes) {
        let near = Infinity;
        for (const s of samples) near = Math.min(near, Math.hypot(n.x - s.x, n.y - s.y));
        expect(Math.abs(n.t - near)).toBeLessThan(1e-6 * Math.max(1, near));
        expect(Math.abs(n.t - boundaryDist(rings, n.x, n.y))).toBeLessThanOrEqual(STEP / 2 + 1);
      }
    }
  });

  it('is deterministic, and a whole-lattice translation moves every node by it and keeps the arcs', () => {
    const rnd = generator(31);
    for (let k = 0; k < 30; k += 1) {
      const local: [number, number][] = [[0, 0], [3000, 0], [3000, 1100], [1800, 1100], [1800, 2400], [0, 2400]];
      const rings = [place(local, rnd() * 360, 0, 0), place(rectLocal(400, 400, 300, 300), 0, 0, 0).reverse()];
      const dx = Math.floor(rnd() * 6_000_000) - 3_000_000;
      const dy = Math.floor(rnd() * 6_000_000) - 3_000_000;
      const a = axisOf(rings);
      expect(axisOf(rings)).toEqual(a);
      const b = axisOf(rings.map((r) => r.map((p) => pt(p.x + dx, p.y + dy))));
      expect(b.nodes.length).toBe(a.nodes.length);
      expect(b.arcs).toEqual(a.arcs);
      for (let i = 0; i < a.nodes.length; i += 1) {
        expect(Math.abs(b.nodes[i].x - dx - a.nodes[i].x)).toBeLessThan(1e-6);
        expect(Math.abs(b.nodes[i].y - dy - a.nodes[i].y)).toBeLessThan(1e-6);
        expect(b.nodes[i].t).toBe(a.nodes[i].t);
      }
    }
  });

  it('the canonical order in the local frame: with the bounding-box corner at the origin, nodes by (x, y, t) exactly and no arc under 1 mm (C-0172 (6))', () => {
    // a corner at (0, 0) makes world cm the local frame itself, so the order and the merge are read without the shift
    const atOrigin = (rings: Ring[]): Ring[] => {
      const ox = Math.min(...rings.flat().map((p) => p.x));
      const oy = Math.min(...rings.flat().map((p) => p.y));
      return rings.map((r) => r.map((p) => pt(p.x - ox, p.y - oy)));
    };
    const rnd = generator(43);
    const sets: Ring[][] = [
      [place([[0, 0], [3000, 0], [3000, 1100], [1800, 1100], [1800, 2400], [0, 2400]], 0, 0, 0)],
      [place(rectLocal(4000, 2000), 0, 0, 0), place(rectLocal(1000, 800, -2000 + 30, -400), 0, 0, 0).reverse()],
      [place(rectLocal(2000, 2000), 0, 0, 0)],
    ];
    for (let k = 0; k < 40; k += 1) {
      const deg = rnd() * 360;
      sets.push([place([[0, 0], [2600, 0], [2600, 900], [1500, 900], [1500, 2200], [0, 2200]], deg, 0, 0), place(rectLocal(300, 300, 300, 300), deg, 0, 0).reverse()]);
    }
    let ties = 0;
    for (const raw of sets) {
      const rings = atOrigin(raw);
      expect(Math.min(...rings.flat().map((p) => p.x))).toBe(0);
      expect(Math.min(...rings.flat().map((p) => p.y))).toBe(0);
      const axis = axisOf(rings);
      expect(axis.nodes.length).toBeGreaterThan(0);
      for (let i = 1; i < axis.nodes.length; i += 1) {
        const g = axis.nodes[i - 1];
        const h = axis.nodes[i];
        if (g.x === h.x) ties += 1;
        expect(g.x < h.x || (g.x === h.x && (g.y < h.y || (g.y === h.y && g.t <= h.t)))).toBe(true);
      }
      // the merge's own arithmetic (squared, in the local frame): no arc's ends within 1 mm
      for (const { a, b } of axis.arcs) {
        const dx = axis.nodes[a].x - axis.nodes[b].x;
        const dy = axis.nodes[a].y - axis.nodes[b].y;
        expect(dx * dx + dy * dy).toBeGreaterThanOrEqual(MEDIAL_MERGE_CM * MEDIAL_MERGE_CM);
      }
      checkCanonical(axis);
    }
    // the axis-aligned faces put nodes on common verticals: the (y, t) order within an x tie is exercised
    expect(ties).toBeGreaterThan(0);
  });

  it('answers a ring whatever vertex it starts at', () => {
    const local: [number, number][] = [[0, 0], [3000, 0], [3000, 1100], [1800, 1100], [1800, 2400], [0, 2400]];
    const ring = place(local, 33, 5000, 5000);
    const a = axisOf([ring]);
    for (let s = 1; s < ring.length; s += 1) {
      const b = axisOf([[...ring.slice(s), ...ring.slice(0, s)]]);
      expect(b.arcs).toEqual(a.arcs);
      expect(b.nodes.length).toBe(a.nodes.length);
      for (let i = 0; i < a.nodes.length; i += 1) {
        expect(Math.abs(b.nodes[i].x - a.nodes[i].x)).toBeLessThan(1e-6);
        expect(Math.abs(b.nodes[i].y - a.nodes[i].y)).toBeLessThan(1e-6);
      }
    }
  });
});

describe('medialAxis — narrow passages (the pieces near another ring refined, C-0176 (1))', () => {
  /** The 40 × 20 m rectangle with a 10 × 8 m hole `gap` cm from its left side, rotated `deg`. */
  const nearHole = (gap: number, deg: number): Ring[] => [place(rectLocal(4000, 2000), deg, 0, 0), place(rectLocal(1000, 800, -2000 + gap, -400), deg, 0, 0).reverse()];

  it('a hole 10 – 150 cm from the outer ring, the 30 cm one at 23° among them: refined, resolved, one loop, no arc crossing or touching a ring', () => {
    for (const gap of [10, 20, 30, 50, 70, 100, 150]) {
      for (const deg of [0, 23, 61]) {
        const rings = nearHole(gap, deg);
        const axis = axisOf(rings);
        expect(axis.resolved, `${gap} cm, ${deg}°`).toBe(true);
        expect(topology(axis), `${gap} cm, ${deg}°`).toEqual({ components: 1, cycles: 1 });
        // a rotated gap of 30 cm or less crowds the pieces facing it, which are refined (at 0° the two walls' samples
        // can fall clear of each other's widened discs, as they do from 15 cm up)
        if (gap <= 30 && deg !== 0) expect(axis.refined, `${gap} cm, ${deg}°`).toBeGreaterThan(0);
        checkInside(rings, axis);
        checkCanonical(axis);
      }
    }
  });

  it('a 60 cm corridor between two rooms and a 40 cm slot: resolved, one tree, no arc crossing or touching a ring', () => {
    const dumbbell: [number, number][] = [[0, 0], [2000, 0], [2000, 970], [3000, 970], [3000, 0], [5000, 0], [5000, 2000], [3000, 2000], [3000, 1030], [2000, 1030], [2000, 2000], [0, 2000]];
    const slot: [number, number][] = [[0, 0], [4000, 0], [4000, 3000], [2020, 3000], [2020, 800], [1980, 800], [1980, 3000], [0, 3000]];
    for (const rings of [[place(dumbbell, 0, 0, 0)], [place(dumbbell, 37, 10_000, -3_000)], [place(slot, 0, 0, 0)], [place(slot, 61, 0, 0)]]) {
      const axis = axisOf(rings);
      expect(axis.resolved).toBe(true);
      expect(topology(axis)).toEqual({ components: 1, cycles: 0 });
      checkInside(rings, axis);
      checkCanonical(axis);
    }
  });

  /** The 40 × 20 m rectangle with a hole `gap` cm from it all round (a frame), rotated `deg`, centred at (cx, cy). */
  const frame = (gap: number, deg: number, cx = 0, cy = 0): Ring[] => [place(rectLocal(4000, 2000), deg, cx, cy), place(rectLocal(4000 - 2 * gap, 2000 - 2 * gap), deg, cx, cy).reverse()];

  it('below the bound the construction cannot resolve the passage (C-0176 (4)): a hole 2 – 4 cm from the outer ring (pieces stuck at the 8 cm floor), or 5 – 7 cm from it all round (the refinement\'s bound reached), is answered, unresolved, every node inside and no arc meeting a ring', () => {
    for (const gap of [2, 3, 4]) {
      for (const deg of [23, 61]) {
        const rings = nearHole(gap, deg);
        const axis = axisOf(rings);
        expect(axis.resolved, `${gap} cm, ${deg}°`).toBe(false);
        expect(axis.nodes.length).toBeGreaterThan(1);
        checkInside(rings, axis);
        checkCanonical(axis, true);
      }
    }
    // the frames: every piece is a passage, so the refinement reaches its bound; centres of the unresolved triangulation
    // fall on a wall (6 cm, 0°: 96 nodes exactly on the outer ring) or within 10⁻¹⁰ cm of it (6 cm at 80.27° far from
    // the origin) — taken as touching it, never answered (MEDIAL_TOUCH_CM)
    for (const [gap, deg, cx, cy] of [[5, 0, 0, 0], [6, 0, 0, 0], [7, 0, 0, 0], [6, 80.26543384417892, 852_508, 545_067], [5, 23, -40_000, 9_000], [7, 61, 0, 0]] as const) {
      const rings = frame(gap, deg, cx, cy);
      const axis = axisOf(rings);
      expect(axis.resolved, `frame ${gap} cm, ${deg}°`).toBe(false);
      expect(axis.nodes.length).toBeGreaterThan(1);
      checkInside(rings, axis);
      checkCanonical(axis, true);
    }
    // from 9 cm all round the same frames are resolved: one loop
    for (const deg of [0, 23, 80.26543384417892]) {
      const axis = axisOf(frame(9, deg, 852_508, 545_067));
      expect(axis.resolved, `frame 9 cm, ${deg}°`).toBe(true);
      expect(topology(axis)).toEqual({ components: 1, cycles: 1 });
    }
  });

  it('the refinement is bounded (C-0176 (1)): sampled at 4 m, a frame 20 cm wide would need more than 8 × its samples + 256 sites — the last round undone, unresolved, still every node inside and no arc meeting a ring; at 1 m it is resolved', () => {
    for (const deg of [0, 23]) {
      const rings = frame(20, deg);
      const fine = axisOf(rings, 100);
      expect(fine.resolved).toBe(true);
      expect(topology(fine)).toEqual({ components: 1, cycles: 1 });
      const coarse = axisOf(rings, 400);
      const samples = coarse.sites - coarse.refined;
      expect(coarse.sites).toBeLessThanOrEqual(MEDIAL_REFINE_CAP * samples + 256);
      expect(coarse.refined).toBeGreaterThan(0);
      // the refinement a resolved axis needs here (the 1 m axis's sites) exceeds the bound
      expect(fine.sites).toBeGreaterThan(MEDIAL_REFINE_CAP * samples + 256);
      expect(coarse.resolved).toBe(false);
      checkInside(rings, coarse);
      checkCanonical(coarse, true);
    }
  });
});

describe('medialAxis — §3.11 and the refusals', () => {
  it('no input, one point, two points and a zero-area ring give the empty axis', () => {
    for (const rings of [[], [[]], [[pt(5, 5)]], [[pt(0, 0), pt(1000, 0)]], [[pt(0, 0), pt(500, 0), pt(1200, 0)]]] as Ring[][]) {
      const axis = axisOf(rings);
      expect(axis.nodes).toEqual([]);
      expect(axis.arcs).toEqual([]);
    }
  });

  it('refuses an off-lattice coordinate with E_OUT_OF_RANGE and a bad step with a RangeError', () => {
    const r = medialAxis([[pt(0, 0), pt(1000, 0), pt(0.5, 1000)]], STEP);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_OUT_OF_RANGE');
    for (const step of [0, 0.5, -100, Number.NaN, Infinity]) {
      expect(() => medialAxis([[pt(0, 0), pt(1000, 0), pt(0, 1000)]], step)).toThrow(RangeError);
      expect(() => medialAxis([], step)).toThrow(RangeError); // asserted before anything else, an empty input included
    }
  });

  it('answers the ring sets the skeleton contract refuses: a hole touching the outer ring, a 3° spike, crossing rings, a hole outside', () => {
    const touching = [place(rectLocal(3000, 2000), 0, 0, 0), place(rectLocal(800, 600, -1500, -300), 0, 0, 0).reverse()];
    const spike = [[pt(0, 0), pt(4000, 0), pt(4000, 200)]];
    const crossing = [[pt(0, 0), pt(3000, 2000), pt(3000, 0), pt(0, 2000)]];
    const outside = [place(rectLocal(2000, 2000), 0, 0, 0), place(rectLocal(500, 500), 0, 5000, 0)];
    for (const rings of [touching, spike, crossing, outside]) {
      const axis = axisOf(rings);
      for (const n of axis.nodes) expect(insideEvenOdd(rings, n.x, n.y)).toBe(true);
      checkInside(rings, axis);
      checkCanonical(axis, true);
    }
    // a hole touching the outer ring, the spike's tip and the crossing: pieces at the refinement's floor — unresolved
    for (const rings of [touching, spike, crossing]) expect(axisOf(rings).resolved).toBe(false);
    // the touching hole opens the face: one tree; the crossing ring's even–odd region is two triangles: two trees
    expect(topology(axisOf(touching))).toEqual({ components: 1, cycles: 0 });
    expect(topology(axisOf(crossing))).toEqual({ components: 2, cycles: 0 });
    // walls of two different rings are never pruned against each other (C-0172 (5), C-0176 (3)): the right-angled corners
    // where the touching hole's sides meet the outer wall keep their branches, a node within 6 cm of each (a rule that
    // judged them as one ring stopped 9 – 13 cm short)
    for (const deg of [0, 17]) {
      const rings = [place(rectLocal(3000, 2000), deg, 0, 0), place(rectLocal(800, 600, -1500, -300), deg, 0, 0).reverse()];
      const axis = axisOf(rings);
      const rad = (deg * Math.PI) / 180;
      for (const [x, y] of [[-1500, 300], [-1500, -300]]) {
        const cx = x * Math.cos(rad) - y * Math.sin(rad);
        const cy = x * Math.sin(rad) + y * Math.cos(rad);
        expect(Math.min(...axis.nodes.map((n) => Math.hypot(n.x - cx, n.y - cy))), `${deg}°, corner (${x}, ${y})`).toBeLessThanOrEqual(6);
      }
    }
    // a hole outside the outer ring is a second piece of the even–odd region: two squares, each pruned whole to its
    // centre — one node per piece, no arc (C-0176 (3))
    const two = axisOf(outside);
    expect(two.resolved).toBe(true);
    expect(two.arcs).toEqual([]);
    expect(two.nodes).toHaveLength(2);
    expect(Math.hypot(two.nodes[0].x, two.nodes[0].y)).toBeLessThanOrEqual(STEP);
    expect(Math.hypot(two.nodes[1].x - 5000, two.nodes[1].y)).toBeLessThanOrEqual(STEP);
  });

  it('a ring set whose inside triangles give no arc at all is its one inside node of greatest clearance (C-0176 (3))', () => {
    // two small acute triangles far apart: each is one Delaunay triangle inside, no two adjacent — no arc
    const big = [pt(0, 0), pt(90, 0), pt(45, 80)];
    const small = [pt(1000, 0), pt(1040, 0), pt(1020, 35)];
    for (const rings of [[big, small], [small, big]]) {
      const axis = axisOf(rings);
      expect(axis.arcs).toEqual([]);
      expect(axis.nodes).toHaveLength(1);
      // the big triangle's circumcentre (45, 27.34375), its clearance the circumradius 52.65625
      expect(Math.abs(axis.nodes[0].x - 45)).toBeLessThan(1e-9);
      expect(Math.abs(axis.nodes[0].y - 27.34375)).toBeLessThan(1e-9);
      expect(Math.abs(axis.nodes[0].t - 52.65625)).toBeLessThan(1e-9);
    }
  });

  it('the random property\'s counterexamples, fixed: a self-crossing ring whose pieces are not all triangulation edges, and two triangles meeting in an exactly 1 mm arc', () => {
    // a crossing ring: its two crossing pieces cannot both be Delaunay edges, so the parity walk is refused and the face
    // read by the centres themselves — unresolved, every node inside
    const crossing: Ring[] = [[pt(-3, 0), pt(0, -500), pt(0, 10), pt(494, 0)]];
    const a = axisOf(crossing);
    expect(a.resolved).toBe(false);
    expect(a.nodes.length).toBeGreaterThan(0);
    checkInside(crossing, a);
    checkCanonical(a, true);
    // two overlapping triangles: an arc of exactly 1 mm in the local frame reads 0.09999999999990905 cm in world cm
    const pair: Ring[] = [
      [pt(-2739, -1183), pt(-1217, 1858), pt(0, 0)],
      [pt(484, 1682), pt(-2482, -234), pt(0, 0)],
    ];
    const b = axisOf(pair);
    for (const n of b.nodes) expect(insideEvenOdd(pair, n.x, n.y) || boundaryDist(pair, n.x, n.y) < 1e-6).toBe(true);
    checkCanonical(b, true);
  });

  it('merges a centre only with centres inside the face: the random property\'s counterexample, every node inside', () => {
    // two overlapping triangles: an inside centre 0.09 mm from an edge was once merged onto an outside one beyond it
    const rings: Ring[] = [
      [pt(0, 0), pt(865, -1115), pt(-889, -2205)],
      [pt(-1476, 1689), pt(-1580, -372), pt(830, -1673)],
    ];
    const axis = axisOf(rings);
    expect(axis.nodes.length).toBeGreaterThan(100);
    for (const n of axis.nodes) expect(insideEvenOdd(rings, n.x, n.y)).toBe(true);
    checkInside(rings, axis);
  });

  it(
    'never throws on random lattice ring sets (self-crossing, repeated, touching): every node inside by the even–odd rule, no arc meeting a ring',
    () => {
      fc.assert(
        fc.property(
          fc.array(fc.array(fc.tuple(fc.integer({ min: -3000, max: 3000 }), fc.integer({ min: -3000, max: 3000 })), { minLength: 0, maxLength: 12 }), { minLength: 0, maxLength: 3 }),
          (rs) => {
            const rings = rs.map((r) => r.map(([x, y]) => pt(x, y)));
            const axis = axisOf(rings);
            // a node within 10⁻⁶ cm of an edge is inside or not by rounding alone: either answer stands
            for (const n of axis.nodes) expect(insideEvenOdd(rings, n.x, n.y) || boundaryDist(rings, n.x, n.y) < 1e-6).toBe(true);
            // no arc meets a ring edge (an arc ending within 10⁻⁶ cm of one is likewise left to rounding)
            for (const { a, b } of axis.arcs) {
              const u = axis.nodes[a];
              const v = axis.nodes[b];
              for (const r of rings) {
                for (let i = 0; i < r.length; i += 1) {
                  const p = r[i];
                  const q = r[(i + 1) % r.length];
                  const close = Math.min(segDist(u.x, u.y, p.x, p.y, q.x, q.y), segDist(v.x, v.y, p.x, p.y, q.x, q.y)) < 1e-6;
                  expect(close || !meet(p.x, p.y, q.x, q.y, u.x, u.y, v.x, v.y)).toBe(true);
                }
              }
            }
            checkCanonical(axis, true); // a self-crossing set's even–odd region may have several pieces
          },
        ),
        { numRuns: 300 },
      );
    },
    TIMEOUT,
  );
});

describe('medialAxis — pruned by clearance (C-0172 (5))', () => {
  /** An isosceles triangle with apex angle `deg` at the origin, opening along +x, legs of 3 000 cm. */
  function wedge(deg: number): Ring {
    const h = (deg * Math.PI) / 360;
    return place([[0, 0], [3000 * Math.cos(h), -3000 * Math.sin(h)], [3000 * Math.cos(h), 3000 * Math.sin(h)]], 0, 0, 0);
  }

  it('a 5 – 7° wedge whose tip triangle has its centre outside the face: that leaf goes from the leaves and the face stays resolved, one tree (C-0176 (3))', () => {
    // found by a seeded sweep of 400 wedges of 5 – 90°: the four whose pruning removed a leaf only for its centre
    const tips: Ring[] = [
      [pt(93225, 0), pt(93470, -372), pt(93504, -348)],
      [pt(48291, 0), pt(45276, 4), pt(45288, -269)],
      [pt(36603, 0), pt(35749, -3023), pt(36065, -3095)],
      [pt(60081, 0), pt(57730, 1167), pt(57609, 883)],
    ];
    for (const ring of tips) {
      const axis = axisOf([ring]);
      expect(axis.resolved).toBe(true);
      expect(axis.nodes.length).toBeGreaterThan(5);
      expect(topology(axis)).toEqual({ components: 1, cycles: 0 });
      checkInside([ring], axis);
      checkCanonical(axis);
    }
  });

  it('a corner sharper than about 79° keeps its branch to within two steps of its tip; a right or obtuse corner keeps none', () => {
    for (const deg of [30, 45, 60, 70]) {
      const axis = axisOf([wedge(deg)]);
      const nearTip = Math.min(...axis.nodes.map((n) => Math.hypot(n.x, n.y)));
      expect(nearTip, `${deg}°`).toBeLessThanOrEqual(2 * STEP / Math.sin((deg * Math.PI) / 360));
    }
    // the rectangle's four right corners: no node nearer a corner than the ridge's ends are
    const axis = axisOf([place(rectLocal(3000, 1200), 0, 0, 0)]);
    for (const [cx, cy] of [[-1500, -600], [1500, -600], [1500, 600], [-1500, 600]]) {
      const near = Math.min(...axis.nodes.map((n) => Math.hypot(n.x - cx, n.y - cy)));
      expect(near).toBeGreaterThanOrEqual(600 * Math.SQRT2 - STEP);
    }
  });
});

describe("skeleton(rings, 'spine', { medialAxis }) — the spine reader's downgrade carries the axis (§3.8, C-0168 (6))", () => {
  it('a ring set the contract refuses downgrades to the sampled medial axis, computed', () => {
    const outer = place(rectLocal(4000, 2000), 0, 0, 0);
    const touching = place(rectLocal(800, 600, -2000, -300), 0, 0, 0).reverse(); // a hole touching the outer ring
    const rings = [outer, touching];
    const r = skeleton(rings, 'spine', { medialAxis: (rr) => medialAxis(rr, STEP) });
    expect(r.ok).toBe(true);
    if (!r.ok || r.value.kind !== 'downgrade') throw new Error('expected a downgrade');
    expect(r.value.to).toBe('medialAxis');
    const axis = r.value.axis;
    expect(axis?.ok).toBe(true);
    if (axis === undefined || !axis.ok) return;
    expect(axis.value.nodes.length).toBeGreaterThan(1);
    expect(axis.value).toEqual(axisOf(rings));
  });
});
