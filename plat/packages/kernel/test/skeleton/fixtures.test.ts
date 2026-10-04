// M0-a-11: §3.8's fixture bar on §13.1's straight-skeleton fixtures (M0) — "0 crashes, 0 validator failures on the
// fixtures" (§16 M0 (a)), marked *here* in M0-work.json. Every family §13.1 lists: squares and rectangles at every
// centidegree 0°–90°; regular n-gons n = 3 … 64; equal-width strips; rotated L, T and U shapes; near-rectangles with a
// notch on a long side (the 20 × 10 m rectangle with a 3 × 2 m notch among them); 1 000 holed polygons; snapped rotated
// squares. Every fixture keeps the numeric contract, so every output must be the validated skeleton (a downgrade here
// is a validator failure or a work-limit hit, and both fail the bar). Each output is also judged independently: every
// arc inside its face (no roof line outside its footprint, §13.1's ladder coverage), the event count within §3.8's law.
// The holed family's seed is PLAT_SKELETON_SEED (1 when unset), so the checker runs it at three seeds and quotes the
// counts this test prints.
import { describe, expect, it } from 'vitest';
import { skeleton, skeletonEventLimit, type SkeletonUse } from '../../src/skeleton/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import {
  TIMEOUT,
  arcsInFace,
  holedPolygons,
  holedSeed,
  lShape,
  notched,
  rectangle,
  regularNgon,
  rotatedSquares,
  strip,
  tShape,
  uShape,
} from './support.js';

interface Tally {
  runs: number;
  crashes: number;
  validated: number;
  downgrades: number;
  outside: number;
  overLaw: number;
  maxEventsPerVertex: number;
  first: string[];
}

function tally(): Tally {
  return { runs: 0, crashes: 0, validated: 0, downgrades: 0, outside: 0, overLaw: 0, maxEventsPerVertex: 0, first: [] };
}

/** Runs one fixture and records its outcome; a throw is a crash, never rethrown, so every fixture is counted. */
function run(t: Tally, rings: LatticePoint[][], use: SkeletonUse): void {
  t.runs += 1;
  let r;
  try {
    r = skeleton(rings, use);
  } catch (e) {
    t.crashes += 1;
    if (t.first.length < 3) t.first.push(`crash ${String(e)} ${JSON.stringify(rings)}`);
    return;
  }
  if (!r.ok || r.value.kind !== 'skeleton') {
    t.downgrades += 1;
    if (t.first.length < 3) t.first.push(`${JSON.stringify(!r.ok ? r.code : r.value.kind === 'downgrade' ? r.value.cause : '')} ${JSON.stringify(rings)}`);
    return;
  }
  const g = r.value;
  t.validated += 1;
  if (!arcsInFace(g)) {
    t.outside += 1;
    if (t.first.length < 3) t.first.push(`arc outside ${JSON.stringify(rings)}`);
  }
  let n = 0;
  let reflex = 0;
  for (const ring of g.rings) {
    n += ring.length;
    for (let i = 0; i < ring.length; i += 1) {
      const a = ring[(i + ring.length - 1) % ring.length];
      const b = ring[i];
      const c = ring[(i + 1) % ring.length];
      if ((b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x) < 0) reflex += 1;
    }
  }
  if (g.events > skeletonEventLimit(n, reflex)) t.overLaw += 1;
  if (g.events / (n + reflex) > t.maxEventsPerVertex) t.maxEventsPerVertex = g.events / (n + reflex);
}

function expectClean(name: string, t: Tally): void {
  // the counts the checker quotes
  console.log(`[M0-a-11 fixture bar] ${name}: runs ${t.runs}, crashes ${t.crashes}, validator failures ${t.downgrades}, arcs outside ${t.outside}, over the work law ${t.overLaw}, max events per (n + r) ${t.maxEventsPerVertex.toFixed(2)}`);
  expect(t.first, t.first.join('\n')).toEqual([]);
  expect(t.crashes).toBe(0);
  expect(t.downgrades).toBe(0);
  expect(t.outside).toBe(0);
  expect(t.overLaw).toBe(0);
  expect(t.validated).toBe(t.runs);
}

describe('§13.1 straight-skeleton fixtures (M0): 0 crashes, 0 validator failures (§3.8, §16 M0 (a))', () => {
  it('squares and rectangles at every centidegree 0°–90°', { timeout: TIMEOUT }, () => {
    const t = tally();
    for (let c = 0; c <= 9_000; c += 1) {
      run(t, [rectangle(1_000, 1_000, c / 100)], 'roof');
      run(t, [rectangle(2_000, 1_000, c / 100)], 'roof');
    }
    expect(t.runs).toBe(18_002);
    expectClean('squares and rectangles, 0°–90° by 0.01°', t);
  });

  it('regular n-gons n = 3 … 64 (several radii, phases and centres)', { timeout: TIMEOUT }, () => {
    const t = tally();
    for (let n = 3; n <= 64; n += 1) {
      for (const r of [500, 2_000, 8_000]) for (const phase of [0, 0.1, 0.37, 1.1]) run(t, [regularNgon(n, r, phase, 777, -333)], 'roof');
    }
    expect(t.runs).toBe(62 * 12);
    expectClean('regular n-gons 3 … 64', t);
  });

  it('equal-width strips (straight, L, Z, U and meander paths; widths 3, 5 and 8 m; every 7.3°)', { timeout: TIMEOUT }, () => {
    const t = tally();
    const paths: [number, number][][] = [
      [
        [0, 0],
        [3_000, 0],
      ],
      [
        [0, 0],
        [2_000, 0],
        [2_000, 1_500],
      ],
      [
        [0, 0],
        [2_000, 0],
        [2_000, 1_500],
        [4_000, 1_500],
      ],
      [
        [0, 0],
        [2_000, 0],
        [2_000, 1_500],
        [0, 1_500],
      ],
      [
        [0, 0],
        [1_500, 0],
        [1_500, 1_500],
        [3_000, 1_500],
        [3_000, 0],
        [4_500, 0],
      ],
    ];
    for (const p of paths) for (const w of [300, 500, 800]) for (let d = 0; d < 360; d += 7.3) run(t, [strip(p, w, d, 1_000, 2_000)], 'spine');
    expectClean('equal-width strips', t);
  });

  it('rotated L, T and U shapes (every 3.1°, three arm proportions)', { timeout: TIMEOUT }, () => {
    const t = tally();
    const arms: [number, number, number, number][] = [
      [2_000, 500, 2_000, 500],
      [3_000, 800, 1_500, 400],
      [1_600, 600, 2_500, 500],
    ];
    for (let d = 0; d < 360; d += 3.1) {
      for (const [a, wa, b, wb] of arms) {
        run(t, [lShape(a, wa, b, wb, d, 50, 60)], 'roof');
        run(t, [tShape(a, wa, b, wb, d, 50, 60)], 'roof');
        run(t, [uShape(a, wa, b, wb, d, 50, 60)], 'roof');
      }
    }
    expectClean('rotated L, T and U shapes', t);
  });

  it('near-rectangles with a notch on a long side — the 20 × 10 m rectangle with a 3 × 2 m notch among them', { timeout: TIMEOUT }, () => {
    const t = tally();
    for (let d = 0; d < 90; d += 1.7) for (let nx = 100; nx <= 1_600; nx += 100) run(t, [notched(2_000, 1_000, nx, 300, 200, d, 3, 4)], 'roof');
    expectClean('notched near-rectangles', t);
  });

  it('1 000 holed polygons (seed PLAT_SKELETON_SEED)', { timeout: TIMEOUT }, () => {
    const seed = holedSeed();
    const t = tally();
    const set = holedPolygons(seed);
    expect(set.length).toBe(1_000);
    for (const rings of set) run(t, rings, 'spine');
    expectClean(`1 000 holed polygons at seed ${seed}`, t);
  });

  it('snapped rotated squares (3 000, sides 3 – 30 m)', { timeout: TIMEOUT }, () => {
    const t = tally();
    for (const sq of rotatedSquares(1, 3_000)) run(t, [sq], 'roof');
    expectClean('snapped rotated squares', t);
  });
});
