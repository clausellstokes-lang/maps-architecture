// M0-e-02: the river's descent surface (./src/hydro/surface.ts; C-0175 (1) – (3)) and the descent on it (trace.ts
// descentLine) — the outlets are the open border, the walls are never entered, every admitted cell's level lies within
// the cap of its height and its parents lead to an outlet with the level never rising, a flat drains to its spill by
// the fewest steps, a pit deeper than the cap is left out, and the line's monotone bed on the hydrology grid cuts at
// most the cap. And the rule C-0175 (1) exists for: where the hydrology's D8 runs straight back out of the inlet's own
// edge, the river's line still crosses the arena.
import { streamFromKey } from '@plat/kernel';
import type { HydroGrid } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { accumulate, d8, D8_DX, D8_DY, descentLine, inletMasks, NO_PARENT, onBorder, priorityFlood, resolveFlats, riverSurface, type HydroField } from '../../src/hydro/index.js';
import { drainPath, fieldOver, gridOf } from './support.js';

/** A grid of cols × rows 25 m cells centred on the frame's centre. */
function centred(cols: number, rows: number): HydroGrid {
  return gridOf(cols, rows, 2500, -1250 * cols, -1250 * rows);
}

/** Rolling random ground: a tilt toward the south, two long waves and per-cell noise, in centimetres. */
function rolling(g: HydroGrid, seed: number): HydroField {
  const s = streamFromKey([seed, 21, 22, 23]);
  const a = s.float01() * 6;
  const b = s.float01() * 6;
  const noise = Array.from({ length: g.cols * g.rows }, () => Math.floor(s.float01() * 400));
  return fieldOver(g, (i, j) => 100_000 + 30 * j + Math.round(600 * Math.sin(i * 0.31 + a) + 500 * Math.cos(j * 0.27 + b)) + noise[j * g.cols + i]);
}

const CAP = 200;

describe("the river's surface (§4.2 S1 (3); C-0175 (1))", () => {
  it('outlets are the open border; walls are never admitted; levels within the cap of the height; parents lead down to an outlet', () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      const g = centred(24, 20);
      const field = rolling(g, seed);
      const n = g.cols * g.rows;
      const inlet = (g.rows - 1) * g.cols + 12;
      const m = inletMasks(g, inlet, undefined);
      const walls = Uint8Array.from(m.edge);
      const s = streamFromKey([seed, 9, 9, 9]);
      for (let k = 0; k < 12; k += 1) walls[(2 + Math.floor(s.float01() * (g.rows - 4))) * g.cols + 2 + Math.floor(s.float01() * (g.cols - 4))] = 1;
      const surf = riverSurface(field, m.outlet, walls, CAP);
      const h = field.heightCm;
      for (let c = 0; c < n; c += 1) {
        const i = c % g.cols;
        const j = Math.floor(c / g.cols);
        // The open border is exactly the outlet set: every border cell off the inlet's (north) edge.
        expect(m.outlet[c]).toBe(onBorder(g, i, j) && j !== g.rows - 1 ? 1 : 0);
        if (walls[c] === 1) {
          expect(surf.admitted[c]).toBe(0);
          continue;
        }
        if (surf.admitted[c] === 0) {
          // Left out only where every admitted neighbour's level lies more than the cap above it.
          for (let k = 0; k < 8; k += 1) {
            const x = i + D8_DX[k];
            const y = j + D8_DY[k];
            if (x < 0 || y < 0 || x >= g.cols || y >= g.rows) continue;
            const q = y * g.cols + x;
            if (surf.admitted[q] === 1) expect(surf.levelCm[q] - h[c]).toBeGreaterThan(CAP);
          }
          continue;
        }
        expect(surf.levelCm[c] - h[c]).toBeGreaterThanOrEqual(0);
        expect(surf.levelCm[c] - h[c]).toBeLessThanOrEqual(CAP);
        if (surf.outlet[c] === 1) {
          expect([surf.parent[c], surf.levelCm[c]]).toEqual([NO_PARENT, h[c]]);
          continue;
        }
        let cur = c;
        for (let guard = 0; guard <= n && surf.parent[cur] !== NO_PARENT; guard += 1) {
          const p = surf.parent[cur];
          expect(Math.abs((p % g.cols) - (cur % g.cols)) <= 1 && Math.abs(Math.floor(p / g.cols) - Math.floor(cur / g.cols)) <= 1).toBe(true);
          expect(surf.levelCm[p]).toBeLessThanOrEqual(surf.levelCm[cur]);
          cur = p;
        }
        expect(surf.outlet[cur]).toBe(1);
      }
    }
  });

  it('on a flat the parents lead to the outlet by the fewest steps (first-in, first-out buckets)', () => {
    const g = centred(15, 11);
    const field = fieldOver(g, () => 50_000);
    const outlet = new Uint8Array(g.cols * g.rows);
    const sink = 0 * g.cols + 4;
    outlet[sink] = 1;
    const surf = riverSurface(field, outlet, new Uint8Array(g.cols * g.rows), CAP);
    for (let c = 0; c < g.cols * g.rows; c += 1) {
      let steps = 0;
      for (let cur = c; surf.parent[cur] !== NO_PARENT; cur = surf.parent[cur]) steps += 1;
      const chebyshev = Math.max(Math.abs((c % g.cols) - 4), Math.floor(c / g.cols));
      expect(steps).toBe(chebyshev);
    }
  });

  it('a pit deeper than the cap below its spill is left out; the descent goes round it; its bed on the grid cuts ≤ the cap', () => {
    // Ground falling southward with a 6 m pit, 3 cells across, on the line from the north inlet.
    const g = centred(21, 21);
    const field = fieldOver(g, (i, j) => 100_000 + 40 * j - (Math.abs(i - 10) <= 1 && Math.abs(j - 12) <= 1 ? 600 : 0));
    const inlet = 20 * g.cols + 10;
    const m = inletMasks(g, inlet, undefined);
    const surf = riverSurface(field, m.outlet, m.edge, CAP);
    expect(surf.admitted[12 * g.cols + 10]).toBe(0);
    const line = descentLine(field, surf, inlet, undefined, []);
    expect(line.end.kind).toBe('frame');
    expect(line.cells).not.toContain(12 * g.cols + 10);
    let bed = Infinity;
    for (const c of line.cells) {
      bed = Math.min(bed, field.heightCm[c]);
      expect(field.heightCm[c] - bed).toBeLessThanOrEqual(CAP);
    }
  });

  it('the descent never enters its walled edge, ends at an outlet, and its monotone bed on the grid cuts at most the cap', () => {
    let lines = 0;
    for (let seed = 1; seed <= 40; seed += 1) {
      const g = centred(30, 26);
      const field = rolling(g, 100 + seed);
      const inlet = (g.rows - 1) * g.cols + 5 + (seed % 20);
      const m = inletMasks(g, inlet, undefined);
      const surf = riverSurface(field, m.outlet, m.edge, CAP);
      const h = field.heightCm;
      // Only an inlet the river can descend from (an admitted neighbour within the cap of its height; the strategy's
      // `descends`) carries the bound from its first step.
      let admissible = false;
      for (let k = 0; k < 8; k += 1) {
        const x = (inlet % g.cols) + D8_DX[k];
        const y = g.rows - 1 + D8_DY[k];
        if (x < 0 || y < 0 || x >= g.cols || y >= g.rows) continue;
        const q = y * g.cols + x;
        if (surf.admitted[q] === 1 && surf.levelCm[q] - h[inlet] <= CAP) admissible = true;
      }
      if (!admissible) continue;
      lines += 1;
      const line = descentLine(field, surf, inlet, undefined, []);
      expect(line.end.kind).toBe('frame');
      expect(surf.outlet[line.cells[line.cells.length - 1]]).toBe(1);
      expect(new Set(line.cells).size).toBe(line.cells.length);
      let bed = Infinity;
      for (let q = 0; q < line.cells.length; q += 1) {
        const c = line.cells[q];
        if (q > 0) expect(m.edge[c]).toBe(0);
        bed = Math.min(bed, h[c]);
        expect(h[c] - bed).toBeLessThanOrEqual(CAP);
      }
    }
    expect(lines).toBeGreaterThan(20);
  });

  it('the descent is steepest: the lower neighbour of the largest drop² (× 2 orthogonal), never merely the first lower one in the tie order', () => {
    const g = centred(9, 9);
    const border = new Uint8Array(81);
    for (let c = 0; c < 81; c += 1) if (onBorder(g, c % 9, Math.floor(c / 9))) border[c] = 1;
    const start = 4 * 9 + 4;
    const firstStep = (h: (i: number, j: number) => number): number => {
      const field = fieldOver(g, h);
      return descentLine(field, riverSurface(field, border, new Uint8Array(81), CAP), start, undefined, []).cells[1];
    };
    // Falling 1 m per cell west and south: W and S drop 100 cm (key 2 × 100²), SW drops 200 cm (key 200²) — SW, though W
    // comes first in the tie order E, NE, N, NW, W, SW, S, SE.
    expect(firstStep((i, j) => 100_000 + 100 * i + 100 * j)).toBe(3 * 9 + 3);
    // Falling 100 cm west and 30 cm south per cell: W (key 2 × 100² = 20 000) beats SW (130² = 16 900) by the orthogonal weight.
    expect(firstStep((i, j) => 100_000 + 100 * i + 30 * j)).toBe(4 * 9 + 3);
    // Equal keys take the first in the tie order: W and S both drop 100 cm, SW is level with them by a rise — W.
    expect(firstStep((i, j) => 100_000 + 100 * Math.min(i, 4) + 100 * Math.min(j, 4) + (i < 4 && j < 4 ? 300 : 0))).toBe(4 * 9 + 3);
  });

  it("where the hydrology's D8 runs straight back out of the inlet's edge, the river's line still crosses the arena", () => {
    // Ground rising northward (the north edge the highest) with a short channel at the north edge's middle draining
    // north out of the arena: the hydrology's flow from the inlet's inward neighbour leaves by the inlet's own edge in
    // one step — a descent on the hydrology's surface would crawl along that closed edge and fold (C-0175 (1)).
    const g = centred(32, 32);
    const field = fieldOver(g, (i, j) => (Math.abs(i - 16) <= 1 && j >= 28 ? 101_070 - 20 * (j - 28) : 100_000 + 40 * j));
    priorityFlood(field);
    resolveFlats(field);
    d8(field);
    accumulate(field);
    const inlet = 31 * g.cols + 16;
    const back = drainPath(field, inlet - g.cols) ?? [];
    expect(back.length).toBeLessThanOrEqual(2);
    expect(Math.floor(back[back.length - 1] / g.cols)).toBe(31);
    // On the river's surface the north edge is a wall: the channel fills to its spill and the line runs south.
    const m = inletMasks(g, inlet, undefined);
    const surf = riverSurface(field, m.outlet, m.edge, CAP);
    const line = descentLine(field, surf, inlet, undefined, []);
    expect(line.end.kind).toBe('frame');
    expect(Math.floor(line.end.cell / g.cols)).toBe(0);
    expect(line.cells.slice(1).every((c) => Math.floor(c / g.cols) < 31)).toBe(true);
  });

  it("inletMasks: the inlet's own side is walled (never an outlet), every other border cell an outlet, a tributary's stop cells outlets too (hardening round S1, note N-c1-6)", () => {
    const g = gridOf(6, 5);
    const n = 6 * 5;
    const side = (i: number, j: number): string => (i === 0 ? 'W' : i === 5 ? 'E' : j === 0 ? 'S' : j === 4 ? 'N' : '');
    const expectMasks = (inlet: number, walled: (i: number, j: number) => boolean, stop?: Uint8Array): void => {
      const m = inletMasks(g, inlet, stop);
      for (let c = 0; c < n; c += 1) {
        const i = c % 6;
        const j = Math.floor(c / 6);
        const border = side(i, j) !== '';
        const wall = border && walled(i, j);
        expect([c, m.edge[c]]).toEqual([c, wall ? 1 : 0]);
        expect([c, m.outlet[c]]).toEqual([c, (border && !wall) || stop?.[c] === 1 ? 1 : 0]);
      }
    };
    // The north edge's middle cell: the north row walled, the other three sides outlets.
    expectMasks(4 * 6 + 2, (_i, j) => j === 4);
    // The west edge's cell of row 2: the west column walled.
    expectMasks(2 * 6, (i) => i === 0);
    // The north-east corner: both its sides walled.
    expectMasks(4 * 6 + 5, (i, j) => j === 4 || i === 5);
    // A tributary's stop: its interior cells become outlets (it ends beside the river it joins).
    const stop = new Uint8Array(n);
    stop[2 * 6 + 2] = 1;
    stop[2 * 6 + 3] = 1;
    expectMasks(2 * 6 + 5, (i) => i === 5, stop);
  });
});
