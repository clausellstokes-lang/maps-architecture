// The calibratable census (C-0070; M0-s-02) and the class floors' one derivation (§4.7).
// Every cell the design marks calibratable carries `calibratable: true`; the census lists them by table, row and
// cell, in the tables' order and then key order — the snapshot the M0 record cites, over which M1 runs
// `plat calibrate register --check` (V12 §3.11; C-0070). `tableCensus` is the loop over one table, exported from
// this file (not the package's API) for the package's other tables.
import { BASE_RUNGS } from './ladder.js';
import { TABLE_IDS } from './registry.js';
import { loadTable, type Table } from './table.js';

/** One table's calibratable cells as `⟨table⟩/⟨row⟩/⟨cell⟩`, in row then cell key order (the order `Table` holds). */
export function tableCensus(t: Table): string[] {
  const out: string[] = [];
  for (const [rk, row] of t.rows) for (const [ck, c] of row) if (c.calibratable) out.push(`${t.id}/${rk}/${ck}`);
  return out;
}

/** Every calibratable cell of the given tables as `⟨table⟩/⟨row⟩/⟨cell⟩`, in the tables' order. */
export function calibratableCensus(ids: readonly string[] = TABLE_IDS): string[] {
  const out: string[] = [];
  for (const id of ids) out.push(...tableCensus(loadTable(id)));
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
