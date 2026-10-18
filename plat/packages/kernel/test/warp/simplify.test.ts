// M0-a-13: §3.4's `simplify` — Visvalingam–Whyatt, topology-preserving: it refuses a removal whose new segment would
// touch or cross another segment of the chain or an obstacle, or whose cut-off triangle holds another vertex; it never
// moves or removes a pinned vertex; and §4.4 step 3's parameters (minimum segment 20 m, no interior angle below 100°)
// run on a wall-trace fixture. Plus its refusals and a property: every output is a sub-sequence of the input that keeps
// its ends, its pinned vertices and its simplicity.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { segmentsMeet } from '../../src/insert/decimate.js';
import type { Cm, Point, Polygon } from '../../src/types/index.js';
import { simplify } from '../../src/warp/index.js';
import { P } from './support.js';

const cm = (v: number): Cm => v as Cm;
const pts = (xs: readonly (readonly [number, number])[]): Point[] => xs.map(([x, y]) => P(x, y));
const text = (ps: readonly Point[]): string => ps.map((q) => `${q.x},${q.y}`).join(' ');

function must(r: ReturnType<typeof simplify>): Point[] {
  if (!r.ok) throw new Error(`refused: ${r.code} ${r.detail}`);
  return r.value;
}

/**
 * A spike E (28° at (1 500, 1 000)) between D (1 000, 3 000) and F (2 000, 3 000) — every other angle ≥ 90° — after a
 * start A that leaves upwards to (1 500, 4 000) and comes round by (0, 4 000) and (0, 3 000).
 */
const spike = (a: readonly [number, number]): Point[] => pts([a, [1500, 4000], [0, 4000], [0, 3000], [1000, 3000], [1500, 1000], [2000, 3000], [3000, 3000]]);
const ABOVE: [number, number] = [1500, 3200];

/** Is the chain simple (no two non-adjacent segments meet)? */
function simple(ps: readonly Point[], closed: boolean): boolean {
  const n = closed ? ps.length - 1 : ps.length;
  const seg = (i: number): [Point, Point] => [ps[i], ps[(i + 1) % (closed ? n : ps.length)]];
  const m = closed ? n : n - 1;
  for (let i = 0; i < m; i++) {
    for (let j = i + 1; j < m; j++) {
      if (j === i + 1 || (closed && i === 0 && j === m - 1)) continue;
      const [a, b] = seg(i);
      const [c, d] = seg(j);
      if (segmentsMeet(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y)) return false;
    }
  }
  return true;
}

describe('simplify refuses a removal that would touch or cross an edge or an obstacle', () => {
  it('control: the 56° spike goes', () => {
    expect(text(must(simplify(spike(ABOVE), cm(0), 6000, [], [])))).toBe('1500,3200 1500,4000 0,4000 0,3000 1000,3000 2000,3000 3000,3000');
  });

  it('a chain segment the new one would cross, its end inside the cut-off triangle: refused', () => {
    expect(text(must(simplify(spike([1500, 2500]), cm(0), 6000, [], [])))).toBe(text(spike([1500, 2500])));
  });

  it('a chain vertex on the new segment (a touch): refused', () => {
    expect(text(must(simplify(spike([1500, 3000]), cm(0), 6000, [], [])))).toBe(text(spike([1500, 3000])));
  });

  it('the chain\'s own end inside the cut-off triangle, joined to its corner (no crossing): refused', () => {
    // A (1 500, 2 500) → D (pinned) → E (the 28° spike) → F → G: removing E would leave A on the other side of D–F.
    const chain = pts([[1500, 2500], [1000, 3000], [1500, 1000], [2000, 3000], [3000, 3000]]);
    expect(text(must(simplify(chain, cm(0), 6000, [], [1])))).toBe(text(chain));
    const outside = pts([[1500, 3500], [1000, 3000], [1500, 1000], [2000, 3000], [3000, 3000]]);
    expect(text(must(simplify(outside, cm(0), 6000, [], [1])))).toBe('1500,3500 1000,3000 2000,3000 3000,3000');
  });

  it('an obstacle touching the new segment, or crossing it, or inside the triangle: refused', () => {
    const touch: Polygon = pts([[1300, 3000], [1350, 3100], [1250, 3100]]);
    const cross: Polygon = pts([[1200, 2900], [1300, 2900], [1250, 3100]]);
    const inside: Polygon = pts([[1400, 2000], [1600, 2000], [1500, 2200]]);
    for (const o of [touch, cross, inside]) {
      expect(text(must(simplify(spike(ABOVE), cm(0), 6000, [o], [])))).toBe(text(spike(ABOVE)));
    }
    // A long obstacle edge through the new segment whose vertices all lie outside the triangle (beneath the spike).
    const through: Polygon = pts([[1500, 3500], [1520, 500], [1480, 500]]);
    expect(text(must(simplify(spike(ABOVE), cm(0), 6000, [through], [])))).toBe(text(spike(ABOVE)));
    // An obstacle clear of the triangle and the segment changes nothing.
    const clear: Polygon = pts([[1200, 3200], [1300, 3200], [1250, 3400]]);
    expect(must(simplify(spike(ABOVE), cm(0), 6000, [clear], [])).length).toBe(7);
  });
});

describe('simplify\'s order and its ring floor (note 5)', () => {
  it('two removable vertices of equal effective area: the lower input index goes first', () => {
    // (500, 300) and (400, 200) are 141 cm apart (< 150): both removable, each cutting off an area of 60 000 (twice the
    // triangle). Removing (500, 300) first leaves (400, 200) on the straight line (800, 0)–(0, 400), 447 cm from each end:
    // it stays. Removing (400, 200) first would leave (500, 300) at a 146° angle, 424 and 510 cm from its neighbours.
    const chain = pts([[800, 0], [500, 300], [400, 200], [0, 400]]);
    expect(text(must(simplify(chain, cm(150), 9000, [], [])))).toBe('800,0 400,200 0,400');
  });

  it('a ring keeps three vertices: a ring of three with a repeated point comes back whole', () => {
    // The floor is unreachable on a ring of distinct points (the fold test refuses the removal that would leave two:
    // none in 2.5 million random rings of 3 – 6 distinct points); with a repeated point it is the guard, and without it
    // the removal loop runs off the ring.
    const ring = pts([[150, 200], [300, 150], [300, 150], [150, 200]]);
    expect(text(must(simplify(ring, cm(120), 9000, [], [])))).toBe('150,200 300,150 300,150 150,200');
  });
});

describe('simplify never moves a pinned vertex', () => {
  it('a pinned spike stays; the unpinned short segments around it go', () => {
    const chain = pts([[0, 0], [1000, 0], [1100, 0], [1500, 1500], [1900, 0], [2000, 0], [3000, 0]]);
    const r = must(simplify(chain, cm(500), 10_000, [], [3]));
    expect(r.map((q) => `${q.x},${q.y}`)).toContain('1500,1500');
    // (1 100, 0) and (1 900, 0) turn by 105°: they keep the bounds and stay.
    expect(text(r)).toBe('0,0 1100,0 1500,1500 1900,0 3000,0');
  });

  it('a pinned vertex and the chain\'s ends survive any parameters', () => {
    const chain = pts([[0, 0], [30, 5], [60, 0], [90, 7], [120, 0], [150, 3], [180, 0]]);
    const r = must(simplify(chain, cm(100_000), 18_000, [], [2]));
    expect(text(r)).toBe('0,0 60,0 180,0');
  });
});

/** A wall trace: an octagon of radius 100 m sampled every ≈ 4 m with ± 20 cm lattice jitter, a 3 m spike, two gates. */
function trace(): { ring: Point[]; gates: number[] } {
  const ring: Point[] = [];
  const R = 10_000;
  let seed = 7;
  const rnd = (): number => {
    seed = (Math.imul(seed, 1_103_515_245) + 12_345) >>> 0;
    return (seed >>> 8) / 16_777_216;
  };
  const corners: [number, number][] = [];
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI) / 4 + Math.PI / 8;
    corners.push([Math.round(R * Math.cos(a)), Math.round(R * Math.sin(a))]);
  }
  for (let k = 0; k < 8; k++) {
    const [x0, y0] = corners[k];
    const [x1, y1] = corners[(k + 1) % 8];
    const steps = 19;
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      let x = Math.round(x0 + t * (x1 - x0) + (i === 0 ? 0 : Math.round(40 * rnd() - 20)));
      let y = Math.round(y0 + t * (y1 - y0) + (i === 0 ? 0 : Math.round(40 * rnd() - 20)));
      if (k === 2 && i === 9) {
        // A spike 3 m outwards.
        x = Math.round(x * 1.03);
        y = Math.round(y * 1.03);
      }
      ring.push(P(x, y));
    }
  }
  ring.push(ring[0]);
  return { ring, gates: [19 * 1 + 9, 19 * 5 + 9] };
}

describe('§4.4 step 3\'s parameters on a trace fixture: minimum segment 20 m, no interior angle below 100°', () => {
  it('the jittered trace simplifies to segments ≥ 20 m and angles ≥ 100°, keeping both gates and its simplicity', () => {
    const { ring, gates } = trace();
    const water: Polygon = pts([[0, 0], [400, 0], [400, 400], [0, 400]]);
    const r = must(simplify(ring, cm(2000), 10_000, [water], gates));
    expect(r[0]).toEqual(r[r.length - 1]);
    for (const g of gates) expect(r.some((q) => q.x === ring[g].x && q.y === ring[g].y)).toBe(true);
    expect(r.length).toBeLessThan(ring.length / 3);
    const n = r.length - 1;
    for (let i = 0; i < n; i++) {
      const a = r[(i + n - 1) % n];
      const b = r[i];
      const c = r[(i + 1) % n];
      expect(Math.hypot(c.x - b.x, c.y - b.y)).toBeGreaterThanOrEqual(2000);
      const ang = Math.acos(((a.x - b.x) * (c.x - b.x) + (a.y - b.y) * (c.y - b.y)) / (Math.hypot(a.x - b.x, a.y - b.y) * Math.hypot(c.x - b.x, c.y - b.y)));
      expect((ang * 180) / Math.PI).toBeGreaterThanOrEqual(100 - 1e-9);
    }
    expect(simple(r, true)).toBe(true);
  });
});

describe('simplify\'s refusals', () => {
  it('E_DEGENERATE for fewer than two distinct points; E_OUT_OF_RANGE off the lattice', () => {
    expect(simplify(pts([[5, 5]]), cm(10), 0, [], [])).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'empty' });
    expect(simplify(pts([[5, 5], [5, 5]]), cm(10), 0, [], [])).toMatchObject({ ok: false, code: 'E_DEGENERATE' });
    expect(simplify([P(0, 0), { x: 0.5 as Cm, y: 0 as Cm }], cm(10), 0, [], [])).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
    expect(simplify([P(0, 0), P(8_388_608, 0)], cm(10), 0, [], [])).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
    expect(() => simplify(pts([[0, 0], [10, 0]]), cm(10), 0, [], [5])).toThrow(/pinned index/);
  });
});

describe('simplify: B-FUZZ (random chains — every output a simple sub-sequence keeping ends and pins)', () => {
  it('random walks, closed and open, with random obstacles', () => {
    fc.assert(
      fc.property(
        fc.array(fc.tuple(fc.integer({ min: -400, max: 400 }), fc.integer({ min: -400, max: 400 })), { minLength: 2, maxLength: 60 }),
        fc.boolean(),
        fc.integer({ min: 0, max: 300 }),
        fc.integer({ min: 0, max: 18_000 }),
        fc.array(fc.nat(), { maxLength: 4 }),
        (steps, closed, minSeg, minAng, pinPick) => {
          const chain: Point[] = [];
          let x = 0;
          let y = 0;
          for (const [dx, dy] of steps) {
            x += dx;
            y += dy;
            chain.push(P(x, y));
          }
          if (closed && chain.length >= 3) chain.push(chain[0]);
          const pins = pinPick.map((k) => k % chain.length);
          const obstacle: Polygon = pts([[x + 50, y + 50], [x + 150, y + 50], [x + 100, y + 150]]);
          const r = simplify(chain, cm(minSeg), minAng, [obstacle], pins);
          if (!r.ok) {
            expect(r.code).toBe('E_DEGENERATE');
            return;
          }
          const out = r.value;
          const isClosed = chain.length >= 4 && chain[0].x === chain[chain.length - 1].x && chain[0].y === chain[chain.length - 1].y;
          // A sub-sequence of the input, in order (a ring's closing point aside), keeping an open chain's ends, a ring's
          // closure and at least three of its vertices, and every pinned point.
          const body = isClosed ? out.slice(0, -1) : out;
          const src = isClosed ? chain.slice(0, -1) : chain;
          let j = 0;
          for (const q of body) {
            while (j < src.length && (src[j].x !== q.x || src[j].y !== q.y)) j++;
            expect(j).toBeLessThan(src.length);
            j++;
          }
          if (isClosed) {
            expect(out[out.length - 1]).toEqual(out[0]);
            expect(body.length).toBeGreaterThanOrEqual(Math.min(3, src.length));
          } else {
            expect(out[0]).toEqual(chain[0]);
            expect(out[out.length - 1]).toEqual(chain[chain.length - 1]);
          }
          for (const k of pins) expect(out.some((q) => q.x === chain[k].x && q.y === chain[k].y)).toBe(true);
          // Simplicity is kept: an input that was simple gives a simple output.
          if (simple(chain, isClosed)) expect(simple(out, isClosed)).toBe(true);
        },
      ),
    );
  }, 600_000);
});
