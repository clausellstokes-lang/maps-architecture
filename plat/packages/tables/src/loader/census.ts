// The calibratable census (C-0070; M0-s-02) and the class floors' one derivation (§4.7).
// Every cell the design marks calibratable carries `calibratable: true`; the census lists them by table, row and
// cell, in the tables' order and then key order — the snapshot the M0 record cites, over which M1 runs
// `plat calibrate register --check` (V12 §3.11; M0.md §4b).
import { BASE_RUNGS } from './ladder.js';
import { TABLE_IDS } from './registry.js';
import { loadTable } from './table.js';

/** Every calibratable cell of the given tables as `⟨table⟩/⟨row⟩/⟨cell⟩`. */
export function calibratableCensus(ids: readonly string[] = TABLE_IDS): string[] {
  const out: string[] = [];
  for (const id of ids) {
    for (const [rk, row] of loadTable(id).rows) for (const [ck, c] of row) if (c.calibratable) out.push(`${id}/${rk}/${ck}`);
  }
  return out;
}

/**
 * `minCorridor(c)` (§4.7's class floors): the smallest corridor width ways.json gives the class at any rung — the low
 * end of its narrowest width band, a derivation and no number of its own.
 */
export function minCorridorM(wayClass: string): number {
  const t = loadTable('ways');
  let min = Infinity;
  for (const r of BASE_RUNGS) min = Math.min(min, t.pair(wayClass, `widthM.${r}`)[0]);
  return min;
}
