// The table-cell writers of the fusion statistics harness (M0-c-07; C-0117; §7.6 "a changed cell is a declared change";
// §17.1 (6)'s provenance forms) — both through M0-b-05's one writer (`writeCells`: the named cells, their provenance, a
// version bump by one, nothing else, checked by M0-s-02's loader; `tableText`: the data files' own layout):
//
//   * phase a's deep-interior shares (§4.6's deep-interior rule: "Default shares … calibrated at M-1 (provenance
//     'M-1 ⟨date⟩')"): a cells file (`plat.table-cells/1`) naming `interior.json`'s `shares.*` cells only, each band
//     row it names given all four shares summing to 1 (§4.6: "each row's other three shares are renormalised so the row
//     sums to 1 (three decimals, largest remainder)"), provenance of the form `M-1 <date>`;
//   * phase b's recalibration (§4.4: "if it fails on statistics, the infill constants are recalibrated against the NG
//     vertex captures and the MFCG size-sweep exports — through the baseline rows, never the captures"):
//     `recalibrate(constants, miss)` writes the constants — the `cut.*` and band-table cells the run item fitted — as a
//     version bump of `cut.json` and `bands.json` with their provenance, only on a statistics miss, and returns the
//     table change with the choices row the run item appends (C-0117: "a table-version bump with its choices row").
//
// Each writes proposed tables into the output folder, or with --apply into plat/packages/tables/data/ (the run items'
// hand-overs: interior.json to M0-c-07a, cut.json and bands.json to M0-c-07b); this item's tests write scratch copies
// only. Every refusal names the file, the table, the row and the cell.
import { CellWriteRefusal, readCellsFile, tableText, writeCells, type CellEdit, type CellsFile, type RawTable, type WrittenTable } from '../bentcut-ng/index.js';

/** The shares cells of a deep-interior band row (§4.6), in the table's order. */
export const SHARE_CELLS = Object.freeze(['shares.court', 'shares.backLane', 'shares.throughAlley', 'shares.rearPlots']);

/** A row's shares sum to 1 within half a unit of the third decimal (§4.6: three decimals, largest remainder). */
export const SHARE_SUM_TOL = 0.0005;

/** The tables each writer may write. */
export const INTERIOR_TABLES = Object.freeze(['interior'] as const);
export const RECALIBRATION_TABLES = Object.freeze(['cut', 'bands'] as const);

/** A table write: the table's change and the text to write. */
export interface TableWrite {
  readonly table: WrittenTable;
  readonly text: string;
}

/**
 * Checks phase a's interior cells: `shares.*` cells only, every share a number in [0, 1], each named band row given
 * all four shares summing to 1. A message naming the file, the row and the cell, or null.
 */
export function interiorProblem(cf: CellsFile, file: string): string | null {
  const edits = cf.tables['interior'] ?? [];
  const byRow = new Map<string, CellEdit[]>();
  for (const e of edits) {
    if (!SHARE_CELLS.includes(e.cell)) return `${file}: table 'interior', row '${e.row}', cell '${e.cell}': not a deep-interior share (the fitted cells are ${SHARE_CELLS.join(', ')}; §4.6)`;
    if (typeof e.value !== 'number' || !Number.isFinite(e.value) || e.value < 0 || e.value > 1) return `${file}: table 'interior', row '${e.row}', cell '${e.cell}': ${JSON.stringify(e.value)} is not a share in [0, 1]`;
    byRow.set(e.row, [...(byRow.get(e.row) ?? []), e]);
  }
  for (const [row, list] of byRow) {
    const named = new Set(list.map((e) => e.cell));
    const missing = SHARE_CELLS.filter((c) => !named.has(c));
    if (missing.length > 0) return `${file}: table 'interior', row '${row}': ${missing.join(', ')} not given (a fitted row names all four shares; §4.6)`;
    let sum = 0;
    for (const e of list) sum += e.value as number;
    if (Math.abs(sum - 1) > SHARE_SUM_TOL) return `${file}: table 'interior', row '${row}': the shares sum to ${String(sum)}, not 1 (§4.6: each row sums to 1)`;
  }
  return null;
}

/** Writes one table's cells (M0-b-05's writer, provenance of the form `M-1 <date>`). */
function writeOne(raw: RawTable, edits: readonly CellEdit[], provenance: string, mode: WrittenTable['mode']): TableWrite {
  const w = writeCells(raw, edits, provenance, { form: 'M-1' });
  return { table: { table: raw.table, from: raw.version, to: w.raw.version, provenance, changes: w.changes, mode }, text: tableText(w.raw) };
}

/**
 * Phase a's deep-interior shares as cells of `interior.json` (see the module comment). `source` is the table as it
 * stands (raw JSON). Throws CellWriteRefusal naming the file, the row and the cell.
 */
export function interiorShares(source: RawTable, cellsText: string, file: string, mode: WrittenTable['mode']): TableWrite {
  const cf = readCellsFile(cellsText, file, INTERIOR_TABLES);
  if (typeof cf === 'string') throw new CellWriteRefusal(cf);
  const p = interiorProblem(cf, file);
  if (p !== null) throw new CellWriteRefusal(p);
  return writeOne(source, cf.tables['interior'] ?? [], cf.provenance, mode);
}

/** The constants a recalibration writes: a cells file's provenance and its `cut` / `bands` cells. */
export interface Constants {
  readonly provenance: string;
  readonly tables: Readonly<Partial<Record<(typeof RECALIBRATION_TABLES)[number], readonly CellEdit[]>>>;
}

/** Reads the recalibration's constants from a cells file (only `cut` and `bands`); a CellWriteRefusal naming the file. */
export function readConstants(text: string, file: string): Constants {
  const cf = readCellsFile(text, file, RECALIBRATION_TABLES);
  if (typeof cf === 'string') throw new CellWriteRefusal(cf);
  return { provenance: cf.provenance, tables: cf.tables as Constants['tables'] };
}

/** The refusal of a recalibration that answers no miss (§4.4: the fallback follows a statistics failure). */
export const NO_MISS = 'no statistics miss: the infill constants are recalibrated only when the gate fails on statistics (§4.4)';

/**
 * recalibrate(constants, miss): the table change with provenance (C-0117; §4.4's statistics fallback). `miss` names
 * the failing statistics clauses it answers (refused when empty); `sources` gives each table as it stands. Every cell
 * written is one the table holds and marks calibratable (M0-b-05's writer), each table's version bumps by one, and the
 * choices row the run item appends names the section, the miss, the tables and their versions.
 */
export function recalibrate(constants: Constants, miss: readonly string[], sources: Readonly<Record<string, RawTable>>, mode: WrittenTable['mode']): { writes: TableWrite[]; choicesRow: string } {
  if (miss.length === 0) throw new CellWriteRefusal(NO_MISS);
  const writes: TableWrite[] = [];
  for (const id of RECALIBRATION_TABLES) {
    const edits = constants.tables[id];
    if (edits === undefined) continue;
    const raw = sources[id];
    if (raw === undefined) throw new CellWriteRefusal(`table '${id}': not given to the recalibration`);
    writes.push(writeOne(raw, edits, constants.provenance, mode));
  }
  if (writes.length === 0) throw new CellWriteRefusal(`the constants name no cell of ${RECALIBRATION_TABLES.join(' or ')}`);
  const tables = writes.map((w) => `${w.table.table}.json ${String(w.table.from)} → ${String(w.table.to)} (${w.table.changes.map((c) => `${c.row}.${c.cell}`).join(', ')})`).join('; ');
  const choicesRow = `§4.4 (the fusion gate's statistics fallback: "the infill constants are recalibrated against the NG vertex captures and the MFCG size-sweep exports"), §16 M0 (c) | the statistics miss ${miss.join(', ')} answered by a table-version bump: ${tables}, provenance '${constants.provenance}' | the gate failed on statistics (C-0117) | the gate re-run through M0-c-06's harness on the bumped tables; bench -- fusion-ng --phase b re-judged`;
  return { writes, choicesRow };
}
