// M0-e-03's outfalls (§4.2 S1 (9): "per water body, each 50 m bank stretch (`outfallStretchM`) into which D8 flow from
// land enters, and each 50 m of frame edge the flow leaves by, as one `Outfall` at its cell of largest accumulation";
// §2.3's Outfall; C-0225 (9)) on hand-built hydrology: a river along y = 0 across a 500 m × 200 m arena on a 25 m grid,
// the land's D8 set by hand, its accumulation varying cell by cell — so the expected outfalls are read off the layout.
import type { Cm, CmArray, HydroGrid, Terrain, WaterBody } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { cellAt } from '../../src/hydro/index.js';
import { intoOf, outfalls, type WaterReach } from '../../src/water/index.js';

const REACH = { x: 25_000, y: 10_000 };
const COLS = 20;
const ROWS = 8;
const CELL = 2500;
const GRID: HydroGrid = { cellCm: CELL as Cm, cols: COLS, rows: ROWS, originX: -25_000 as Cm, originY: -10_000 as Cm };
const E = 0;
const N = 2;
const S = 6;

/** The river along y = 0, `halfWidth` either side, from the west edge to the east edge. */
function river(halfWidth: number): WaterReach {
  const body: WaterBody = {
    id: 'water:river:0',
    kind: 'river',
    face: { owner: 'water:river:0', level: 0 },
    shore: { role: 'shore', entity: 'water:river:0' },
    course: [
      { x: -25_000 as Cm, y: 0 as Cm },
      { x: 25_000 as Cm, y: 0 as Cm },
    ],
    widthProfile: Int32Array.from([2 * halfWidth, 2 * halfWidth]) as CmArray,
    lifecycle: { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } },
  };
  const h = halfWidth as Cm;
  const rect = [
    { x: -25_000 as Cm, y: -h as Cm },
    { x: 25_000 as Cm, y: -h as Cm },
    { x: 25_000 as Cm, y: h },
    { x: -25_000 as Cm, y: h },
  ];
  return { body, parts: [{ rings: [rect], seeds: [{ x: 0 as Cm, y: 0 as Cm }] }] };
}

/** A terrain record over the grid with D8 codes and accumulation from functions of (column, row). */
function terrainOf(dir: (i: number, j: number) => number, acc: (i: number, j: number) => number): Terrain {
  const n = COLS * ROWS;
  const flowDir = new Uint8Array(n);
  const flowAccum = new Uint32Array(n);
  for (let j = 0; j < ROWS; j += 1) {
    for (let i = 0; i < COLS; i += 1) {
      flowDir[j * COLS + i] = dir(i, j);
      flowAccum[j * COLS + i] = acc(i, j);
    }
  }
  return {
    id: 'terrain:test',
    key: { layer: 'ground', part: 0 },
    cellCm: 800 as Cm,
    cols: 1,
    rows: 1,
    originX: 0 as Cm,
    originY: 0 as Cm,
    datumCm: 0 as Cm,
    heightCm: new Int32Array(1),
    reliefLimitCm: 1_000_000 as Cm,
    hydro: GRID,
    flowDir,
    flatRank: new Uint32Array(n),
    flowAccum,
    outfalls: [],
    seaLevelCm: 0 as Cm,
    wind: { bearingCdeg: 0, strength: 0 },
    features: [],
    lifecycle: { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } },
  };
}

/** A pseudo-random accumulation per cell (distinct maxima in most stretches, some ties). */
const accOf = (i: number, j: number): number => 1 + ((i * 7 + j * 3) % 5);

/** The narrow river (10 m): the water cells are the course's (row 4); rows 5 – 7 drain south, rows 0 – 3 north, row 7 off the north edge. */
const narrowDir = (i: number, j: number): number => (j === 4 ? E : j >= 5 ? (j === 7 ? N : S) : N);

describe('§4.2 S1 (9): one outfall per 50 m bank stretch, at the cell of largest accumulation', () => {
  it('a narrow river: each bank\'s inflow grouped by 50 m of course, the largest accumulation kept (ties: the lower cell), at the bank point; then the frame edge', () => {
    const t = terrainOf(narrowDir, accOf);
    const out = outfalls(t, [river(500)], { reach: REACH, stretchCm: 5000 });
    // expected: the left (north) bank fed by row 5, the right (south) bank by row 3, both in pairs of columns; then
    // the north frame edge fed by row 7, in pairs of columns
    const expected: { cell: number; at: { x: number; y: number }; into: string; water: string | null }[] = [];
    const pick = (row: number): number[] => {
      const cells: number[] = [];
      for (let k = 0; k < COLS / 2; k += 1) {
        const a = row * COLS + 2 * k;
        const b = a + 1;
        cells.push(t.flowAccum[b] > t.flowAccum[a] ? b : a);
      }
      return cells;
    };
    const centre = (c: number): { x: number; y: number } => ({ x: -25_000 + ((c % COLS) + 0.5) * CELL, y: -10_000 + (Math.floor(c / COLS) + 0.5) * CELL });
    for (const c of pick(5)) expected.push({ cell: c, at: { x: centre(c).x, y: 500 }, into: 'river', water: 'water:river:0' });
    for (const c of pick(3)) expected.push({ cell: c, at: { x: centre(c).x, y: -500 }, into: 'river', water: 'water:river:0' });
    for (const c of pick(7)) expected.push({ cell: c, at: { x: centre(c).x, y: 10_000 }, into: 'frame', water: null });
    expect(out.map((o) => ({ into: o.into, water: o.water, at: { x: o.at.x, y: o.at.y } }))).toEqual(expected.map((e) => ({ into: e.into, water: e.water, at: e.at })));
    // `cell` is the hydro cell containing `at`
    for (const o of out) {
      const { i, j } = cellAt(GRID, o.at.x, o.at.y);
      expect(o.cell).toBe(j * COLS + i);
    }
    // the stretch's largest accumulation stands there: each `at` lies over the picked cell's column
    out.forEach((o, q) => expect(Math.floor((o.at.x + 25_000) / CELL)).toBe(expected[q].cell % COLS));
  });

  it('recomputed deterministically: the same list twice, and the terrain unchanged', () => {
    const t = terrainOf(narrowDir, accOf);
    const before = [Uint8Array.from(t.flowDir), Uint32Array.from(t.flowAccum)];
    const a = outfalls(t, [river(500)], { reach: REACH, stretchCm: 5000 });
    const b = outfalls(t, [river(500)], { reach: REACH, stretchCm: 5000 });
    expect(b).toEqual(a);
    expect([t.flowDir, t.flowAccum]).toEqual(before);
  });

  it('a wide river: a cell whose centre lies inside the polygon is water, so the land above it drains into the bank there', () => {
    // a 60 m river (y ∈ [−3000, 3000]): rows 3 and 4 (centres ±1 250) are water; rows 5 – 7 drain south, 0 – 2 north
    const t = terrainOf((i, j) => (j === 3 || j === 4 ? E : j >= 5 ? S : N), () => 1);
    const out = outfalls(t, [river(3000)], { reach: REACH, stretchCm: 5000 });
    const left = out.filter((o) => o.at.y === 3000);
    const right = out.filter((o) => o.at.y === -3000);
    expect(left).toHaveLength(10);
    expect(right).toHaveLength(10);
    // all accumulations equal: the lower cell index of each pair, so the even columns
    expect(left.map((o) => Math.floor((o.at.x + 25_000) / CELL))).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
    expect(out).toHaveLength(20);
  });

  it('the stretch length is read: 100 m stretches give half as many outfalls; water cells and cells draining within land give none', () => {
    const t = terrainOf(narrowDir, accOf);
    expect(outfalls(t, [river(500)], { reach: REACH, stretchCm: 10_000 })).toHaveLength(15);
    // no river: rows 0 – 3 drain north into land, row 4 east within land: only the north edge's 10 outfalls
    const dry = outfalls(t, [], { reach: REACH, stretchCm: 5000 });
    expect(dry.every((o) => o.into === 'frame')).toBe(true);
    // row 4 now land whose last cell drains off the east edge: one more frame outfall (E), before the north edge's
    expect(dry.map((o) => o.at.x === 25_000 ? 'E' : o.at.y === 10_000 ? 'N' : '?')).toEqual(['E', ...Array<string>(10).fill('N')]);
  });

  it('§2.3: `into` follows the receiving water\'s kind', () => {
    expect(['river', 'tributary', 'estuary', 'distributary', 'islet_channel'].map((k) => intoOf(k as WaterBody['kind']))).toEqual(['river', 'river', 'river', 'river', 'river']);
    expect(['sea', 'lake', 'pond', 'oxbow', 'canal', 'ditch', 'moat'].map((k) => intoOf(k as WaterBody['kind']))).toEqual(['sea', 'lake', 'lake', 'lake', 'canal', 'ditch', 'moat']);
  });
});
