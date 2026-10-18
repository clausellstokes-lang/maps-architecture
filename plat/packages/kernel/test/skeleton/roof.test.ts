// M0-a-11: the exact path for convex near-rectangles (§3.8 *Convex near-rectangles take the exact path*, J-K21): the
// convex near-rectangle test (convex by exact orient2d; four OBB corners matched by ring vertices within 30 cm; area at
// least 0.97 of the OBB's), the exact roofs — a hip roof's ridge half the OBB's minor extent in from each short side
// with hips from the four matched vertices, a gable ridge on the wing's ridgeAxis line ending on the ring (§2.6's
// arc-length midpoints), a pyramid's apex at the OBB's centre — "so a 1 cm edit cannot flip a micro-ridge" (the GEO-8
// case: snapping leaves rotated squares micro-ridges on a skeleton coalesced only as far as §3.8's events; the count
// this build's skeleton path keeps at one apex is reported, descriptive), and every roof line inside its footprint. The 20 × 10 m rectangle with a 3 × 2 m notch (area 0.970 of its OBB, all four corners present)
// has a reflex vertex and takes the skeleton, which validates with no roof line outside.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { convexNearRectangle, exactRoof, skeleton, type ExactRoof, type RoofWing } from '../../src/skeleton/index.js';
import type { Cm, LatticePoint } from '../../src/types/index.js';
import { TIMEOUT, arcsInFace, generator, inFace, intIn, place, pt, rectangle, rotatedSquares } from './support.js';

function roof(wing: RoofWing): ExactRoof {
  const r = exactRoof(wing);
  if (!r.ok || !r.value.exact) throw new Error(`not exact: ${JSON.stringify(r)}`);
  return r.value.roof;
}

/** Every line of an exact roof inside (or on) its ring: both ends in the face — the ring is convex, so the segment is. */
function linesInside(ring: readonly LatticePoint[], r: ExactRoof): boolean {
  const pts = [...r.hips.flat(), ...(r.ridge ?? []), ...(r.apex === null ? [] : [r.apex])];
  return pts.every((p) => inFace([ring], p.x, p.y, 1e-6));
}

const R20x10 = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(0, 1_000)];

describe('the convex near-rectangle test (§3.8)', () => {
  it('a rectangle passes, its four corners matched in the OBB’s order, either orientation', () => {
    const r = convexNearRectangle(R20x10);
    expect(r.ok && r.value).toMatchObject({ pass: true, corners: [0, 1, 2, 3] });
    const cw = convexNearRectangle([...R20x10].reverse());
    expect(cw.ok && cw.value.pass).toBe(true);
    const rot = convexNearRectangle(rectangle(2_000, 1_000, 33.33));
    expect(rot.ok && rot.value.pass).toBe(true);
  });

  it('the 20 × 10 m rectangle with a 3 × 2 m notch at x = 1–4 m on a long side: 0.970 of its OBB, four corners, not convex', () => {
    const notched = [pt(0, 0), pt(100, 0), pt(100, 200), pt(400, 200), pt(400, 0), pt(2_000, 0), pt(2_000, 1_000), pt(0, 1_000)];
    let a2 = 0;
    for (let i = 0; i < notched.length; i += 1) {
      const p = notched[i];
      const q = notched[(i + 1) % notched.length];
      a2 += p.x * q.y - q.x * p.y;
    }
    expect(a2 / 2 / (2_000 * 1_000)).toBeCloseTo(0.97, 10);
    const r = convexNearRectangle(notched);
    expect(r.ok && r.value).toEqual({ pass: false, reason: 'nonConvex' });
    const x = exactRoof({ kind: 'quad', ring: notched, ridgeAxis: 0, form: 'hip' });
    expect(x.ok && x.value).toEqual({ exact: false, reason: 'nonConvex' });
    // it takes the skeleton, which validates, with no roof line outside its footprint
    const s = skeleton([notched], 'roof');
    if (!s.ok || s.value.kind !== 'skeleton') throw new Error('expected the validated skeleton');
    expect(arcsInFace(s.value)).toBe(true);
  });

  it('a corner cut back more than 30 cm is unmatched; one cut 20 cm passes', () => {
    const cut = (c: number): LatticePoint[] => [pt(0, 0), pt(2_000 - c, 0), pt(2_000, c), pt(2_000, 1_000), pt(0, 1_000)];
    expect(convexNearRectangle(cut(40)).ok && convexNearRectangle(cut(40))).toMatchObject({ value: { pass: false, reason: 'cornerUnmatched' } });
    expect(convexNearRectangle(cut(20))).toMatchObject({ ok: true, value: { pass: true } });
  });

  it('an area below 0.97 of the OBB fails (a 5 × 0.4 m bar with four 28 × 15 cm corner cuts: 0.958)', () => {
    const bar = [pt(28, 0), pt(472, 0), pt(500, 15), pt(500, 25), pt(472, 40), pt(28, 40), pt(0, 25), pt(0, 15)];
    expect(convexNearRectangle(bar)).toMatchObject({ ok: true, value: { pass: false, reason: 'area' } });
  });

  it('a ring that turns left at every corner but winds twice (a pentagram) is not convex; a collinear one is degenerate', () => {
    const star = [0, 2, 4, 1, 3].map((k) => pt(Math.round(1_000 * Math.cos((2 * Math.PI * k) / 5)), Math.round(1_000 * Math.sin((2 * Math.PI * k) / 5))));
    expect(convexNearRectangle(star)).toMatchObject({ ok: true, value: { pass: false, reason: 'nonConvex' } });
    expect(convexNearRectangle([pt(0, 0), pt(10, 0), pt(20, 0)])).toMatchObject({ ok: true, value: { pass: false, reason: 'degenerate' } });
  });

  it('an off-lattice coordinate is E_OUT_OF_RANGE', () => {
    const r = convexNearRectangle([pt(0, 0), { x: 0.5 as Cm, y: 0 as Cm }, pt(0, 10)]);
    expect(r.ok).toBe(false);
    const w = exactRoof({ kind: 'rect', ring: [pt(0, 0), { x: Number.NaN as Cm, y: 0 as Cm }, pt(0, 10)], ridgeAxis: 0, form: 'hip' });
    expect(w.ok).toBe(false);
  });
});

describe('the exact roofs (§3.8)', () => {
  it('hip: the ridge half the minor extent in from each short side, hips from the four corners to the nearer end', () => {
    const r = roof({ kind: 'rect', ring: R20x10, ridgeAxis: 0, form: 'hip' });
    expect(r.ridge).toEqual([
      { x: 500, y: 500 },
      { x: 1_500, y: 500 },
    ]);
    expect(r.apex).toBeNull();
    expect(r.hips).toEqual([
      [{ x: 0, y: 0 }, { x: 500, y: 500 }],
      [{ x: 2_000, y: 0 }, { x: 1_500, y: 500 }],
      [{ x: 2_000, y: 1_000 }, { x: 1_500, y: 500 }],
      [{ x: 0, y: 1_000 }, { x: 500, y: 500 }],
    ]);
  });

  it('hip on rotated snapped rectangles: the ridge on the long axis, as long as major − minor, centred, inside', () => {
    for (let c = 0; c <= 9_000; c += 37) {
      const ring = rectangle(2_000, 1_000, c / 100);
      const r = roof({ kind: 'rect', ring, ridgeAxis: 0, form: 'hip' });
      if (r.ridge === null) throw new Error('expected a ridge');
      const [a, b] = r.ridge;
      expect(Math.abs(Math.hypot(b.x - a.x, b.y - a.y) - 1_000)).toBeLessThanOrEqual(2);
      const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      const want = c / 100;
      expect(Math.min(Math.abs(ang - want), Math.abs(ang - want + 180), Math.abs(ang - want - 180))).toBeLessThan(0.1);
      expect(Math.hypot((a.x + b.x) / 2 - 12_345, (a.y + b.y) / 2 + 6_789)).toBeLessThanOrEqual(1);
      expect(linesInside(ring, r)).toBe(true);
    }
  });

  it('a hip ridge shorter than minEdge (25 cm) is the apex: 10 × 10 m and 10.2 × 10 m an apex, 10.3 × 10 m a 30 cm ridge', () => {
    expect(roof({ kind: 'rect', ring: rectangle(1_000, 1_000, 0), ridgeAxis: 0, form: 'hip' }).apex).toEqual({ x: 12_345, y: -6_789 });
    expect(roof({ kind: 'rect', ring: rectangle(1_020, 1_000, 0), ridgeAxis: 0, form: 'hip' }).ridge).toBeNull();
    const r = roof({ kind: 'rect', ring: rectangle(1_030, 1_000, 0), ridgeAxis: 0, form: 'hip' });
    if (r.ridge === null) throw new Error('expected a ridge');
    expect(Math.hypot(r.ridge[1].x - r.ridge[0].x, r.ridge[1].y - r.ridge[0].y)).toBeCloseTo(30, 6);
  });

  it('pyramid: the apex at the OBB centre, hips from the four matched vertices', () => {
    const r = roof({ kind: 'rect', ring: R20x10, ridgeAxis: 0, form: 'pyramid' });
    expect(r.apex).toEqual({ x: 1_000, y: 500 });
    expect(r.ridge).toBeNull();
    expect(r.hips.map((h) => h[0])).toEqual(R20x10.map((p) => ({ x: p.x, y: p.y })));
  });

  it('gable: the ridge on the ridgeAxis line, ending on the ring — a rect’s axis 0 runs along side 1, a quad’s axis 1 likewise', () => {
    expect(roof({ kind: 'rect', ring: R20x10, ridgeAxis: 0, form: 'gable' }).ridge).toEqual([
      { x: 2_000, y: 500 },
      { x: 0, y: 500 },
    ]);
    expect(roof({ kind: 'rect', ring: R20x10, ridgeAxis: 1, form: 'gable' }).ridge).toEqual([
      { x: 1_000, y: 0 },
      { x: 1_000, y: 1_000 },
    ]);
    expect(roof({ kind: 'quad', ring: R20x10, ridgeAxis: 1, form: 'gable' }).ridge).toEqual(roof({ kind: 'rect', ring: R20x10, ridgeAxis: 0, form: 'gable' }).ridge);
    expect(roof({ kind: 'quad', ring: R20x10, ridgeAxis: 0, form: 'gable' }).ridge).toEqual(roof({ kind: 'rect', ring: R20x10, ridgeAxis: 1, form: 'gable' }).ridge);
    expect(roof({ kind: 'rect', ring: R20x10, ridgeAxis: 0, form: 'gable' }).hips).toEqual([]);
  });

  it('gable on a quad whose sides carry other vertices: the arc-length midpoints of the sides its corners delimit', () => {
    // a row quad: side 1 (party wall) 0 → 2 with a vertex at (0, 300) collinear, side 2 front, side 3 back wall, side 4 rear
    const ring = [pt(0, 0), pt(800, 0), pt(800, 1_000), pt(0, 1_000), pt(0, 300)];
    // axis 0: the midpoints of sides 1 and 3; axis 1: of sides 2 and 4 — side 4 the chain (0, 1000) → (0, 300) → (0, 0)
    expect(roof({ kind: 'quad', ring, corners: [0, 1, 2, 3], ridgeAxis: 0, form: 'gable' }).ridge).toEqual([
      { x: 400, y: 0 },
      { x: 400, y: 1_000 },
    ]);
    expect(roof({ kind: 'quad', ring, corners: [0, 1, 2, 3], ridgeAxis: 1, form: 'gable' }).ridge).toEqual([
      { x: 800, y: 500 },
      { x: 0, y: 500 },
    ]);
  });

  it('a ring that fails the test is refused with the test’s reason (the caller takes the skeleton)', () => {
    const x = exactRoof({ kind: 'rect', ring: [pt(0, 0), pt(1_000, 0), pt(500, 300)], ridgeAxis: 0, form: 'hip' });
    expect(x.ok && x.value).toEqual({ exact: false, reason: 'cornerUnmatched' });
  });
});

describe('the GEO-8 case: a 1 cm edit never flips a ridge on a convex near-rectangle', () => {
  it('every snapped rotated square takes one apex on the exact path (the skeleton path’s count reported)', { timeout: TIMEOUT }, () => {
    let apexSkeleton = 0;
    const squares = rotatedSquares(2, 2_000);
    for (const ring of squares) {
      const r = roof({ kind: 'rect', ring, ridgeAxis: 0, form: 'hip' });
      expect(r.apex).not.toBeNull();
      expect(r.ridge).toBeNull();
      const s = skeleton([ring], 'roof');
      if (s.ok && s.value.kind === 'skeleton' && s.value.nodes.length === 5) apexSkeleton += 1;
    }
    console.log(`[M0-a-11 GEO-8] snapped rotated squares with one apex: exact path ${squares.length}/${squares.length}, skeleton path ${apexSkeleton}/${squares.length} (descriptive)`);
  });

  it('every 1 cm move of every vertex of rotated squares and rectangles: the ridge keeps its axis, an apex stays an apex', { timeout: TIMEOUT }, () => {
    const rnd = generator(8);
    const moves = [-1, 0, 1].flatMap((dx) => [-1, 0, 1].map((dy) => [dx, dy])).filter(([dx, dy]) => dx !== 0 || dy !== 0);
    let edits = 0;
    for (let i = 0; i < 300; i += 1) {
      const w = i % 2 === 0 ? intIn(rnd, 300, 3_000) : intIn(rnd, 600, 3_000);
      const h = i % 2 === 0 ? w : intIn(rnd, 300, w - 40);
      const ring = rectangle(w, h, rnd() * 90, intIn(rnd, -50_000, 50_000), intIn(rnd, -50_000, 50_000));
      const base = roof({ kind: 'rect', ring, ridgeAxis: 0, form: 'hip' });
      for (let v = 0; v < 4; v += 1) {
        for (const [dx, dy] of moves) {
          const edited = ring.map((p, j) => (j === v ? pt(p.x + dx, p.y + dy) : p));
          const r = exactRoof({ kind: 'rect', ring: edited, ridgeAxis: 0, form: 'hip' });
          if (!r.ok || !r.value.exact) continue;
          edits += 1;
          const e = r.value.roof;
          if (base.apex !== null) {
            expect(e.apex).not.toBeNull();
            if (e.apex !== null) expect(Math.hypot(e.apex.x - base.apex.x, e.apex.y - base.apex.y)).toBeLessThanOrEqual(1.5);
          } else if (base.ridge !== null) {
            expect(e.ridge).not.toBeNull();
            if (e.ridge === null) continue;
            const u = [base.ridge[1].x - base.ridge[0].x, base.ridge[1].y - base.ridge[0].y];
            const q = [e.ridge[1].x - e.ridge[0].x, e.ridge[1].y - e.ridge[0].y];
            const sin = Math.abs(u[0] * q[1] - u[1] * q[0]) / (Math.hypot(u[0], u[1]) * Math.hypot(q[0], q[1]));
            expect(sin).toBeLessThan(Math.sin(Math.PI / 180));
          }
          expect(linesInside(edited, e)).toBe(true);
        }
      }
    }
    expect(edits).toBeGreaterThan(5_000);
  });
});

describe('property: no roof line lies outside its footprint (§13.1 ladder coverage)', () => {
  it('jittered convex near-rectangles: the exact roof inside when taken, the skeleton’s arcs inside otherwise', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 200, max: 4_000 }),
        fc.integer({ min: 200, max: 4_000 }),
        fc.double({ min: 0, max: 360, noNaN: true }),
        fc.array(fc.integer({ min: -25, max: 25 }), { minLength: 8, maxLength: 8 }),
        fc.constantFrom<'hip' | 'gable' | 'pyramid'>('hip', 'gable', 'pyramid'),
        (w, h, deg, j, form) => {
          const base = place(
            [
              [-w / 2, -h / 2],
              [w / 2, -h / 2],
              [w / 2, h / 2],
              [-w / 2, h / 2],
            ],
            deg,
            0,
            0,
          );
          const ring = base.map((p, i) => pt(p.x + j[2 * i], p.y + j[2 * i + 1]));
          const r = exactRoof({ kind: 'quad', ring, ridgeAxis: 0, form });
          if (!r.ok) return false;
          if (r.value.exact) return linesInside(ring, r.value.roof);
          const s = skeleton([ring], 'roof');
          if (!s.ok) return false;
          return s.value.kind === 'downgrade' ? s.value.to === 'plainRoof' : arcsInFace(s.value);
        },
      ),
    );
  });
});
