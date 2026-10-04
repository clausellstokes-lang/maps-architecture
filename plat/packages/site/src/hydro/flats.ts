// The two-gradient flat resolution (M0-e-02; §2.3 *Flats*: "Flow across every flat — filled depressions and genuinely
// level ground — is resolved by the two-gradient flat-resolution method (a breadth-first gradient away from higher
// terrain and one towards lower terrain, combined into `flatRank`), computed into its own array, so stored heights are
// untouched, D8 is defined on every land cell and each flat drains to its spill point").
//
// The method is the published one (Barnes, Lehman and Mulla, "An efficient assignment of drainage direction over flat
// surfaces in raster digital elevation models", Computers & Geosciences 62, 2014), on the filled surface:
//   * a cell is FLAT when it is interior and no 8-neighbour is strictly lower (a border cell always drains — off the
//     grid when nothing inside is lower, ./field.ts);
//   * a LOW EDGE is a draining cell beside a flat cell of its own height (where the flat spills); a HIGH EDGE a flat cell
//     beside a higher cell;
//   * each flat is labelled from its low edges (the 8-connected cells of that height);
//   * the gradient AWAY from higher terrain: a breadth-first search from the high edges through the flat's cells, the
//     step count a (1 at a high edge), its largest value H per flat;
//   * the gradient TOWARDS lower terrain: a breadth-first search from the low edges through the flat's cells, the step
//     count t (1 at a low edge);
//   * combined: rank = 2t + (H − a) where a cell was reached from a high edge, else 2t. Along the towards-search the
//     first term grows by 2 per step and the second changes by at most 1, so every flat cell has a neighbour of its flat
//     with a lower rank, and the lowest ranks lie at the spill: d8 sends each flat cell to its lowest-ranked neighbour of
//     equal height and the flat drains to its spill point, away from the higher ground around it.
// The stored rank is the combined value on flat cells and 0 everywhere else (the low edges included: they drain by
// descent), so following d8 from a flat cell the rank falls strictly until a 0, the spill (§2.3: "0 off flats").
import { cellCount, D8_DX, D8_DY, invCols, onBorder, type HydroField } from './field.js';

/** What resolveFlats reports beside the ranks it writes. */
export interface FlatsResult {
  /** The flat cells (interior, no lower neighbour on the filled surface). */
  flatCells: number;
  /** The number of flats labelled (each drains through at least one low edge). */
  flats: number;
  /** Flat cells no search reached — 0 on every flooded field (a flat with no spill cannot survive the flood). */
  unresolved: number;
}

/** Whether cell c (at column i, row j) has an 8-neighbour strictly lower on the filled surface. */
function hasLower(f: Int32Array, cols: number, rows: number, c: number, i: number, j: number): boolean {
  const v = f[c];
  for (let k = 0; k < 8; k += 1) {
    const x = i + D8_DX[k];
    const y = j + D8_DY[k];
    if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
    if (f[y * cols + x] < v) return true;
  }
  return false;
}

/**
 * Resolves every flat of `grid`'s filled surface (priorityFlood first) into `grid.flatRank`: the combined two-gradient
 * order on flat cells, 0 elsewhere.
 */
export function resolveFlats(grid: HydroField): FlatsResult {
  const g = grid.grid;
  const cols = g.cols;
  const rows = g.rows;
  const n = cellCount(g);
  const f = grid.filledCm;
  if (f.length !== n) throw new RangeError('resolveFlats: the field is not flooded (priorityFlood first)');
  const inv = invCols(g);
  // 1 flat (no way down), 0 draining.
  const flat = new Uint8Array(n);
  let flatCells = 0;
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      const c = j * cols + i;
      if (onBorder(g, i, j)) continue;
      if (!hasLower(f, cols, rows, c, i, j)) {
        flat[c] = 1;
        flatCells += 1;
      }
    }
  }
  const rank = new Uint32Array(n);
  grid.flatRank = rank;
  if (flatCells === 0) return { flatCells: 0, flats: 0, unresolved: 0 };

  // Low and high edges, in scan order.
  const low: number[] = [];
  const high: number[] = [];
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      const c = j * cols + i;
      const v = f[c];
      for (let k = 0; k < 8; k += 1) {
        const x = i + D8_DX[k];
        const y = j + D8_DY[k];
        if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
        const m = y * cols + x;
        if (flat[c] === 0 && flat[m] === 1 && f[m] === v) {
          low.push(c);
          break;
        }
        if (flat[c] === 1 && f[m] > v) {
          high.push(c);
          break;
        }
      }
    }
  }

  // Labels: the 8-connected cells of one height reached from each low edge.
  const label = new Uint32Array(n);
  const queue = new Uint32Array(n);
  let flats = 0;
  for (const s of low) {
    if (label[s] !== 0) continue;
    flats += 1;
    const v = f[s];
    let qh = 0;
    let qt = 0;
    label[s] = flats;
    queue[qt] = s;
    qt += 1;
    while (qh < qt) {
      const c = queue[qh];
      qh += 1;
      const ci = c % cols;
      const cj = Math.round((c - ci) * inv);
      for (let k = 0; k < 8; k += 1) {
        const x = ci + D8_DX[k];
        const y = cj + D8_DY[k];
        if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
        const m = y * cols + x;
        if (label[m] !== 0 || f[m] !== v) continue;
        label[m] = flats;
        queue[qt] = m;
        qt += 1;
      }
    }
  }

  // Away from higher terrain: a (1 at a high edge) through the flat's cells; H per label its largest value.
  const away = new Uint32Array(n);
  const flatHeight = new Uint32Array(flats + 1);
  bfs(high, (c) => label[c] !== 0, (c, step) => {
    away[c] = step;
    if (step > flatHeight[label[c]]) flatHeight[label[c]] = step;
  });
  // Towards lower terrain: t (1 at a low edge); the combined rank on flat cells.
  let reached = 0;
  bfs(low, () => true, (c, step) => {
    if (flat[c] === 1) {
      rank[c] = 2 * step + (away[c] > 0 ? flatHeight[label[c]] - away[c] : 0);
      reached += 1;
    }
  });
  return { flatCells, flats, unresolved: flatCells - reached };

  /**
   * A breadth-first search from `seeds` (each taken once, in order, at step 1) to the flat cells of the same label,
   * level by level; `visit(c, step)` once per cell reached.
   */
  function bfs(seeds: readonly number[], admit: (c: number) => boolean, visit: (c: number, step: number) => void): void {
    const mark = new Uint8Array(n);
    let qt = 0;
    for (const s of seeds) {
      if (mark[s] === 1 || !admit(s)) continue;
      mark[s] = 1;
      queue[qt] = s;
      qt += 1;
    }
    let qh = 0;
    let step = 1;
    let levelEnd = qt;
    while (qh < qt) {
      const c = queue[qh];
      qh += 1;
      visit(c, step);
      const ci = c % cols;
      const cj = Math.round((c - ci) * inv);
      for (let k = 0; k < 8; k += 1) {
        const x = ci + D8_DX[k];
        const y = cj + D8_DY[k];
        if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
        const m = y * cols + x;
        if (mark[m] === 1 || flat[m] === 0 || label[m] !== label[c]) continue;
        mark[m] = 1;
        queue[qt] = m;
        qt += 1;
      }
      if (qh === levelEnd) {
        step += 1;
        levelEnd = qt;
      }
    }
  }
}
