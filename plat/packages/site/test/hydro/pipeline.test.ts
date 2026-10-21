// M0-e-02: the hydrology pipeline on small grids — the bucket-queue priority flood with exact flats and the lake typing
// (§4.2 S1 (3)), the two-gradient flat resolution (§2.3 *Flats*), D8 with the fixed tie order and accumulation — each
// against its stated contract: the flood equals the exact (ε-free) minimal depression-free surface, every flat drains
// to its spill point through flatRank, D8's ties break E, NE, N, NW, W, SW, S, SE, every cell drains off the grid, and
// each cell's accumulation is itself plus its upstream.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { accumulate, d8, D8_DX, D8_DY, D8_NAMES, fieldOf, NO_FLOW, priorityFlood, recomputeCorridors, resolveFlats, type HydroField } from '../../src/hydro/index.js';
import { drainPath, fieldFrom, gridOf } from './support.js';

/** The exact minimal depression-free surface by Planchon and Darboux's iteration without ε (the reference). */
function referenceFill(field: HydroField): number[] {
  const g = field.grid;
  const h = field.heightCm;
  const w: number[] = [];
  for (let j = 0; j < g.rows; j += 1) {
    for (let i = 0; i < g.cols; i += 1) {
      const border = i === 0 || j === 0 || i === g.cols - 1 || j === g.rows - 1;
      w.push(border ? h[j * g.cols + i] : Infinity);
    }
  }
  for (let changed = true; changed; ) {
    changed = false;
    for (let j = 1; j < g.rows - 1; j += 1) {
      for (let i = 1; i < g.cols - 1; i += 1) {
        const c = j * g.cols + i;
        let m = Infinity;
        for (let k = 0; k < 8; k += 1) m = Math.min(m, w[(j + D8_DY[k]) * g.cols + i + D8_DX[k]]);
        const v = Math.max(h[c], m);
        if (v < w[c]) {
          w[c] = v;
          changed = true;
        }
      }
    }
  }
  return w;
}

function pipeline(field: HydroField): void {
  priorityFlood(field);
  resolveFlats(field);
  d8(field);
  accumulate(field);
}

/** A random grid of `cols × rows` with heights from a small set (many flats and pits). */
const smallGrids = fc
  .record({ cols: fc.integer({ min: 1, max: 9 }), rows: fc.integer({ min: 1, max: 9 }), levels: fc.integer({ min: 1, max: 6 }) })
  .chain(({ cols, rows, levels }) => fc.array(fc.integer({ min: 0, max: levels }), { minLength: cols * rows, maxLength: cols * rows }).map((hs) => ({ cols, rows, hs: hs.map((v) => v * 100) })));

describe('priorityFlood (§4.2 S1 (3))', () => {
  it('keeps exact flat surfaces: a bowl fills to its spill height exactly, every raised cell equal to it (no ε)', () => {
    // A 9 × 9 bowl: rim 100 m, floor 50 m, one notch in the rim at 80 m.
    const f = fieldFrom(9, 9, (i, j) => (i === 0 && j === 4 ? 8000 : i === 0 || j === 0 || i === 8 || j === 8 ? 10000 : 5000));
    const before = Int32Array.from(f.heightCm);
    const r = priorityFlood(f, 1_000_000);
    expect(f.filledCm).toBeInstanceOf(Int32Array);
    for (let j = 1; j < 8; j += 1) for (let i = 1; i < 8; i += 1) expect(f.filledCm[j * 9 + i]).toBe(8000);
    expect(f.filledCm[4 * 9]).toBe(8000);
    expect([...f.heightCm]).toEqual([...before]);
    expect(r.depressions).toEqual([{ first: 10, cells: 49, spillCm: 8000, depthCm: 3000, lowest: 10, lake: false }]);
    expect(r.cells).toBe(81);
  });

  it('types a depression deeper than the lake threshold a lake (strictly deeper), the others not', () => {
    const bowl = (): HydroField => fieldFrom(7, 7, (i, j) => (i === 0 || j === 0 || i === 6 || j === 6 ? 300 : i === 3 && j === 3 ? 100 : 250));
    const deep = priorityFlood(bowl(), 199);
    expect(deep.depressions.map((d) => [d.depthCm, d.lake])).toEqual([[200, true]]);
    expect(deep.lakeMask.reduce((a, b) => a + b, 0)).toBe(25);
    const exact = priorityFlood(bowl(), 200);
    expect(exact.depressions.map((d) => d.lake)).toEqual([false]);
    expect(exact.lakeMask.reduce((a, b) => a + b, 0)).toBe(0);
  });

  it('equals the exact minimal depression-free surface on random grids (integers in, integers out)', () => {
    fc.assert(
      fc.property(smallGrids, ({ cols, rows, hs }) => {
        const f = fieldOf(gridOf(cols, rows), hs);
        priorityFlood(f);
        expect([...f.filledCm]).toEqual(referenceFill(f));
        for (let c = 0; c < hs.length; c += 1) expect(f.filledCm[c]).toBeGreaterThanOrEqual(f.heightCm[c]);
      }),
      { numRuns: 3000 },
    );
  });
});

describe('resolveFlats and d8 (§2.3 Flats)', () => {
  it('every flat drains to its spill point through flatRank: rank falls strictly at equal height to a 0 that drains', () => {
    fc.assert(
      fc.property(smallGrids, ({ cols, rows, hs }) => {
        const f = fieldOf(gridOf(cols, rows), hs);
        priorityFlood(f);
        const flats = resolveFlats(f);
        const r = d8(f);
        expect(r.undefinedCells).toBe(0);
        expect(flats.unresolved).toBe(0);
        const fl = f.filledCm;
        for (let c = 0; c < hs.length; c += 1) {
          const path = drainPath(f, c);
          expect(path).not.toBeNull();
          if (path === null) return;
          for (let s = 1; s < path.length; s += 1) {
            const a = path[s - 1];
            const b = path[s];
            expect(fl[b]).toBeLessThanOrEqual(fl[a]);
            if (fl[b] === fl[a]) expect(f.flatRank[b]).toBeLessThan(f.flatRank[a]);
          }
          if (f.flatRank[c] > 0) {
            // A flat cell: the path stays at its height until a rank-0 cell (the spill), which then drains.
            const spill = path.find((m) => f.flatRank[m] === 0);
            expect(spill).toBeDefined();
            if (spill !== undefined) expect(fl[spill]).toBe(fl[c]);
          }
        }
      }),
      { numRuns: 3000 },
    );
  });

  it('a flat drains away from the higher ground beside it, towards its outlet (the two gradients)', () => {
    // A level shelf of seven cells at 50 m between higher ground (90 m north, 95 m south) and its one outlet on the
    // east border (40 m).
    const f = fieldFrom(9, 5, (i, j) => (j === 2 && i >= 1 ? (i === 8 ? 4000 : 5000) : j > 2 ? 9000 : 9500));
    pipeline(f);
    for (let i = 1; i < 7; i += 1) {
      const c = 2 * 9 + i;
      expect(f.flatRank[c]).toBeGreaterThan(0);
      expect(D8_NAMES[f.flowDir[c]]).toBe('E');
    }
    expect(f.flatRank[2 * 9 + 7]).toBe(0);
    expect(D8_NAMES[f.flowDir[2 * 9 + 7]]).toBe('E');
    expect(f.flatRank[2 * 9 + 6]).toBeLessThan(f.flatRank[2 * 9 + 1]);
  });

  it('the away-from-higher gradient breaks a towards-lower tie: a flat cell by the wall steps away from it', () => {
    // A 5 × 3 flat at 50 m walled at 100 m, its outlet on the east border at 40 m. Cell (3, 1) beside the south wall
    // has two neighbours two steps from the outlet — E (4, 1), also by the wall, and NE (4, 2), one step further from
    // it: the combined rank sends it NE; the towards-lower gradient alone would tie them and take E by the code order.
    const f = fieldFrom(7, 5, (i, j) => (i === 6 && j === 2 ? 4000 : i === 0 || j === 0 || i === 6 || j === 4 ? 10000 : 5000));
    pipeline(f);
    const c = 1 * 7 + 3;
    expect(f.flatRank[c]).toBeGreaterThan(0);
    expect(D8_NAMES[f.flowDir[c]]).toBe('NE');
    expect(f.flatRank[2 * 7 + 4]).toBeLessThan(f.flatRank[1 * 7 + 4]);
  });

  it("D8's tie order is E, NE, N, NW, W, SW, S, SE (a fixture with equal neighbours)", () => {
    // The centre of a 3 × 3 stands at 100 m; the orthogonal neighbours at 90 m tie (equal slopes), the diagonals at
    // 100 m. Raising the winner each time walks the orthogonal order; then the diagonals alone at 90 m walk theirs.
    const order: string[] = [];
    const heights = [10000, 9000, 10000, 9000, 10000, 9000, 10000, 9000, 10000];
    const centre = 4;
    const at = (k: number): number => (1 + D8_DY[k]) * 3 + 1 + D8_DX[k];
    const run = (): number => {
      const f = fieldOf(gridOf(3, 3), heights);
      // Border cells are seeds; the centre's direction is read straight from d8.
      priorityFlood(f);
      resolveFlats(f);
      d8(f);
      return f.flowDir[centre];
    };
    for (let s = 0; s < 4; s += 1) {
      const k = run();
      order.push(D8_NAMES[k]);
      heights[at(k)] = 10000;
    }
    for (const k of [1, 3, 5, 7]) heights[at(k)] = 9000;
    for (let s = 0; s < 4; s += 1) {
      const k = run();
      order.push(D8_NAMES[k]);
      heights[at(k)] = 10000;
    }
    expect(order).toEqual(['E', 'N', 'W', 'S', 'NE', 'NW', 'SW', 'SE']);
  });

  it('on a flat, equal ranks also tie in code order; the steeper slope wins over the code order', () => {
    // An orthogonal drop of 10 beats a diagonal drop of 10 (slope ÷ √2): the centre goes N, not NE.
    // Rows from the south: N is (1, 2) and NE is (2, 2), both 10 cm below the centre.
    const heights = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 9990, 9990];
    const f = fieldOf(gridOf(3, 3), heights);
    pipeline(f);
    expect(D8_NAMES[f.flowDir[4]]).toBe('N');
    // A 5 × 3 grid at one height: the middle row's cells are flat; (2, 1)'s neighbours of rank 0 are the six border
    // cells, and the first of them in code order is NE (E is a flat cell of rank above 0).
    const g = fieldFrom(5, 3, () => 500);
    pipeline(g);
    expect(g.flatRank[1 * 5 + 2]).toBeGreaterThan(0);
    expect(D8_NAMES[g.flowDir[1 * 5 + 2]]).toBe('NE');
  });

  it('a border cell with nothing lower inside the grid drains off it by its outward code', () => {
    const f = fieldFrom(4, 4, () => 700);
    pipeline(f);
    expect(D8_NAMES[f.flowDir[0]]).toBe('SW');
    expect(D8_NAMES[f.flowDir[3]]).toBe('SE');
    expect(D8_NAMES[f.flowDir[12]]).toBe('NW');
    expect(D8_NAMES[f.flowDir[15]]).toBe('NE');
    expect(D8_NAMES[f.flowDir[1]]).toBe('S');
    expect(D8_NAMES[f.flowDir[4]]).toBe('W');
    expect(D8_NAMES[f.flowDir[7]]).toBe('E');
    expect(D8_NAMES[f.flowDir[13]]).toBe('N');
  });
});

describe('recomputeCorridors (the corridor step after a carve, §4.2 S1 (3))', () => {
  it('a corridor drains along itself and off the grid; its neighbours re-point by steepest descent onto it; acyclic', () => {
    // A level 7 × 7 field; a corridor down the middle column from the north border, its bed falling 10 cm a cell.
    const f = fieldFrom(7, 7, () => 500);
    pipeline(f);
    const cells = [6, 5, 4, 3, 2, 1, 0].map((j) => j * 7 + 3);
    const bed = cells.map((_, k) => 400 - 10 * k);
    const before = Uint8Array.from(f.flowDir);
    const r = recomputeCorridors(f, [{ cells, bedCm: bed, exit: -1 }]);
    expect(r).toEqual({ corridorCells: 7, neighbours: 14 });
    for (let k = 0; k + 1 < cells.length; k += 1) expect(D8_NAMES[f.flowDir[cells[k]]]).toBe('S');
    expect(D8_NAMES[f.flowDir[cells[6]]]).toBe('S');
    for (const c of cells) expect(f.flatRank[c]).toBe(0);
    for (const c of cells) expect(f.filledCm[c]).toBe(bed[cells.indexOf(c)]);
    // Every cell beside the corridor now drains onto it — steepest descent on the lowered surface — with rank 0.
    for (let j = 0; j < 7; j += 1) {
      for (const i of [2, 4]) {
        const c = j * 7 + i;
        const k = f.flowDir[c];
        const target = (j + D8_DY[k]) * 7 + i + D8_DX[k];
        expect(cells).toContain(target);
        expect(f.flatRank[c]).toBe(0);
      }
    }
    // Cells two columns away keep their directions.
    for (let j = 0; j < 7; j += 1) for (const i of [0, 1, 5, 6]) expect(f.flowDir[j * 7 + i]).toBe(before[j * 7 + i]);
    accumulate(f);
    expect(f.flowAccum[cells[6]]).toBeGreaterThanOrEqual(7 + 14);
  });

  it('a tributary corridor drains into its confluence cell (exit)', () => {
    const f = fieldFrom(7, 7, () => 500);
    pipeline(f);
    const main = [6, 5, 4, 3, 2, 1, 0].map((j) => j * 7 + 3);
    const trib = [3 * 7 + 6, 3 * 7 + 5];
    recomputeCorridors(f, [
      { cells: main, bedCm: main.map((_, k) => 400 - 10 * k), exit: -1 },
      { cells: trib, bedCm: [450, 440], exit: 3 * 7 + 4 },
    ]);
    expect(D8_NAMES[f.flowDir[trib[0]]]).toBe('W');
    expect(D8_NAMES[f.flowDir[trib[1]]]).toBe('W');
    accumulate(f);
  });
});

describe('accumulate', () => {
  it('each cell counts itself and every cell draining through it; the off-grid outlets carry every cell', () => {
    fc.assert(
      fc.property(smallGrids, ({ cols, rows, hs }) => {
        const f = fieldOf(gridOf(cols, rows), hs);
        pipeline(f);
        const n = cols * rows;
        const sum = new Array<number>(n).fill(1);
        let out = 0;
        for (let c = 0; c < n; c += 1) {
          const k = f.flowDir[c];
          expect(k).not.toBe(NO_FLOW);
          const i = (c % cols) + D8_DX[k];
          const j = Math.floor(c / cols) + D8_DY[k];
          if (i < 0 || j < 0 || i >= cols || j >= rows) out += f.flowAccum[c];
          else sum[j * cols + i] += f.flowAccum[c];
        }
        expect([...f.flowAccum]).toEqual(sum);
        expect(out).toBe(n);
      }),
      { numRuns: 3000 },
    );
  });

  it('refuses a field whose directions hold a cycle (d8 never makes one)', () => {
    const f = fieldFrom(3, 3, () => 0);
    pipeline(f);
    f.flowDir[0] = 0; // (0,0) → (1,0)
    f.flowDir[1] = 4; // (1,0) → (0,0)
    expect(() => accumulate(f)).toThrow(/cycle/);
  });
});
