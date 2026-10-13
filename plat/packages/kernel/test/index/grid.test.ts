// M0-a-03: the dynamic uniform grid (§3.3 *Spatial indexes* (b)) — O(1) insert and delete (an item entered in at most
// MAX_ITEM_CELLS cells, a larger one in the level's large set), replacement by key, and candidates that are exactly
// the entries whose boxes meet the query box, each once — against a model on random operations; and the index's grids
// taking their cells per level.
import { describe, expect, it } from 'vitest';
import { attachIndex, boxesMeet, createGrid, gridCandidates, MAX_ITEM_CELLS, type Box } from '../../src/index/index.js';
import { gridPut, gridTake } from '../../src/index/grid.js';
import { buildArena, CELLS, generator, intIn, QUARTERS } from './support.js';

function randomBox(rnd: () => number): Box {
  const x = intIn(rnd, -5000, 5000) + (rnd() < 0.3 ? 0.71 : 0);
  const y = intIn(rnd, -5000, 5000) - (rnd() < 0.3 ? 0.71 : 0);
  const big = rnd() < 0.1;
  return { minX: x, minY: y, maxX: x + intIn(rnd, 0, big ? 8000 : 300), maxY: y + intIn(rnd, 0, big ? 8000 : 300) };
}

describe('the dynamic uniform grid (§3.3)', () => {
  it('agrees with a model under 20 000 random puts, takes and replacements; candidates exact and each once', () => {
    for (const cell of [1, 37, 100, 2500]) {
      const rnd = generator(cell);
      const g = createGrid(cell);
      const model = new Map<number, { partition: number; box: Box }>();
      for (let i = 0; i < 20_000; i++) {
        const r = rnd();
        const key = intIn(rnd, 0, 400) + (rnd() < 0.5 ? 2 ** 32 : 0);
        if (r < 0.55) {
          const box = randomBox(rnd);
          const partition = intIn(rnd, 0, 9);
          const old = gridPut(g, key, partition, box);
          expect(old?.partition).toBe(model.get(key)?.partition);
          model.set(key, { partition, box });
        } else if (r < 0.85) {
          expect(gridTake(g, key)?.key).toBe(model.has(key) ? key : undefined);
          model.delete(key);
        } else {
          const q = randomBox(rnd);
          const got = gridCandidates(g, q).sort((a, b) => a - b);
          const want = [...model].filter(([, e]) => boxesMeet(e.box, q)).map(([k]) => k).sort((a, b) => a - b);
          expect(got).toEqual(want);
        }
      }
      expect(g.entries.size).toBe(model.size);
      for (const e of g.entries.values()) {
        if (e.cells === null) expect(g.large.has(e.key)).toBe(true);
        else expect(e.cells.length).toBeLessThanOrEqual(MAX_ITEM_CELLS);
      }
      // every cell holds only entered keys; no empty cell is kept
      for (const [, s] of g.cells) {
        expect(s.size).toBeGreaterThan(0);
        for (const k of s) expect(g.entries.get(k)?.cells).not.toBeNull();
      }
    }
  }, 120_000);

  it('an empty grid answers nothing; a cell is a whole number of centimetres', () => {
    expect(gridCandidates(createGrid(100), { minX: 0, minY: 0, maxX: 1e6, maxY: 1e6 })).toEqual([]);
    expect(() => createGrid(0)).toThrow(/whole number of centimetres/);
    expect(() => createGrid(2.5)).toThrow(/whole number of centimetres/);
    // the index's grids take their cells per level (`gridCellCm`: one number for every level, or five; arena/plat's `five`)
    expect(attachIndex(buildArena(QUARTERS).plat, { gridCellCm: CELLS }).levels.map((l) => l.dynamic.cellCm)).toEqual(CELLS);
    expect(attachIndex(buildArena(QUARTERS).plat, { gridCellCm: 300 }).levels.map((l) => l.dynamic.cellCm)).toEqual([300, 300, 300, 300, 300]);
  });
});
