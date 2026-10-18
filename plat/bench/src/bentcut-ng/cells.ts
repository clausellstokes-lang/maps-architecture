// The table-cell writer (M0-b-05; C-0117: "the table-cell writer with provenance and version bump"; §7.6 "a changed
// cell is a declared change"; M0-s-02's loader and cell check, C-0153, C-0154). `writeCells(table, cells, provenance)`
// takes one of M0's tables as raw JSON (the shape `{ table, version, section, rows }` M0-s-02's loader reads), sets the
// named cells' values and their provenance, bumps the version by one, and changes nothing else — no other cell, no
// other field of a named cell, no row added or removed. It refuses (CellWriteRefusal, naming the table, the row and the
// cell) a cell the table does not hold, a cell named twice, a cell that is not calibratable (a re-fit moves only a
// calibratable cell, §7.6), a value of another shape than the cell's (a number for a number, a list of the same length
// and kinds for a list), a provenance outside §17.1 (6)'s forms, and any result M0-s-02's loader refuses. `tableText`
// writes a table in the data files' own layout (two-space indent, one line per cell, ", " and ": " inside a cell), so
// a written file differs from the shipped one in the edited cells' lines and the version line alone.
import { parseTable, provenanceForm, type CellValue, type ProvenanceForm } from '@plat/tables';

/** A table file as M0-s-02's loader reads it. */
export interface RawTable {
  readonly table: string;
  readonly version: number;
  readonly section: string;
  readonly rows: Readonly<Record<string, Readonly<Record<string, Readonly<Record<string, unknown>>>>>>;
}

/** One cell to write: its row, its cell key and its new value. */
export interface CellEdit {
  readonly row: string;
  readonly cell: string;
  readonly value: CellValue;
}

/** One written cell: where, and its value before and after. */
export interface CellChange {
  readonly row: string;
  readonly cell: string;
  readonly before: CellValue;
  readonly after: CellValue;
}

/** A refusal of the writer, naming the table, and the row and cell when one is at fault. */
export class CellWriteRefusal extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CellWriteRefusal';
  }
}

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Does `next` have the shape of `prev`: a number for a number, a key for a key, a flag for a flag, a list alike? */
export function sameShape(prev: unknown, next: unknown): boolean {
  if (Array.isArray(prev)) return Array.isArray(next) && next.length === prev.length && prev.every((p, i) => sameShape(p, next[i]));
  if (typeof prev === 'number') return typeof next === 'number' && Number.isFinite(next);
  return typeof prev === typeof next && (typeof prev === 'string' || typeof prev === 'boolean');
}

/** A deep copy of a JSON value (the raw table is never mutated). */
function copy<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

/**
 * writeCells(table, cells, provenance): the table with the named cells set, each cell's provenance set, the version
 * bumped by one, and nothing else changed; checked by M0-s-02's loader before it is returned.
 */
export function writeCells(table: RawTable, cells: readonly CellEdit[], provenance: string, opts: { readonly form?: ProvenanceForm } = {}): { raw: RawTable; changes: CellChange[] } {
  const id = table.table;
  const at = (e: { row: string; cell: string }): string => `table '${id}', row '${e.row}', cell '${e.cell}'`;
  const form = provenanceForm(provenance);
  if (form === null) throw new CellWriteRefusal(`table '${id}': provenance '${provenance}' is outside §17.1 (6)'s forms`);
  if (opts.form !== undefined && form !== opts.form) throw new CellWriteRefusal(`table '${id}': provenance '${provenance}' is not of the form ${opts.form}`);
  if (cells.length === 0) throw new CellWriteRefusal(`table '${id}': no cell to write (a version bump changes at least one cell)`);
  if (!(Number.isInteger(table.version) && table.version >= 1)) throw new CellWriteRefusal(`table '${id}': version ${String(table.version)} is not a positive integer`);
  const seen = new Set<string>();
  const out = copy(table) as { table: string; version: number; section: string; rows: Record<string, Record<string, Record<string, unknown>>> };
  const changes: CellChange[] = [];
  for (const e of cells) {
    const key = `${e.row}\u0000${e.cell}`;
    if (seen.has(key)) throw new CellWriteRefusal(`${at(e)}: named twice`);
    seen.add(key);
    const row = out.rows[e.row];
    if (!isRecord(row)) throw new CellWriteRefusal(`table '${id}', row '${e.row}': no such row (the writer adds no row)`);
    const cell = row[e.cell];
    if (!isRecord(cell)) throw new CellWriteRefusal(`${at(e)}: no such cell (the writer adds no cell)`);
    if (cell['calibratable'] !== true) throw new CellWriteRefusal(`${at(e)}: not calibratable (a re-fit moves only a calibratable cell, §7.6)`);
    if (!sameShape(cell['value'], e.value)) throw new CellWriteRefusal(`${at(e)}: the value ${JSON.stringify(e.value)} has another shape than ${JSON.stringify(cell['value'])}`);
    changes.push({ row: e.row, cell: e.cell, before: copy(cell['value']) as CellValue, after: copy(e.value) });
    cell['value'] = copy(e.value);
    cell['provenance'] = provenance;
  }
  out.version = table.version + 1;
  try {
    parseTable(id, out);
  } catch (err) {
    throw new CellWriteRefusal(`table '${id}': the loader refuses the result: ${(err as Error).message}`);
  }
  return { raw: out, changes };
}

/** A value on one line, as the data files write it: ", " between members, ": " after a key. */
export function compactJson(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(compactJson).join(', ')}]`;
  if (isRecord(v)) return `{${Object.keys(v).map((k) => `${JSON.stringify(k)}: ${compactJson(v[k])}`).join(', ')}}`;
  if (typeof v === 'number' && !Number.isFinite(v)) throw new CellWriteRefusal(`a table value is not a finite number (${String(v)})`);
  return JSON.stringify(v);
}

/** A table in the data files' layout: the four top fields, one row per block, one cell per line. */
export function tableText(raw: RawTable): string {
  const rows = Object.keys(raw.rows).map((rk) => {
    const row = raw.rows[rk];
    const cells = Object.keys(row).map((ck) => `      ${JSON.stringify(ck)}: ${compactJson(row[ck])}`);
    return `    ${JSON.stringify(rk)}: {\n${cells.join(',\n')}\n    }`;
  });
  return `{\n  "table": ${JSON.stringify(raw.table)},\n  "version": ${String(raw.version)},\n  "section": ${JSON.stringify(raw.section)},\n  "rows": {\n${rows.join(',\n')}\n  }\n}\n`;
}

/** A cells file (`plat.table-cells/1`): the provenance and, per table, the cells to write. */
export interface CellsFile {
  readonly schema: 'plat.table-cells/1';
  readonly provenance: string;
  readonly tables: Readonly<Record<string, readonly CellEdit[]>>;
}

export const CELLS_SCHEMA = 'plat.table-cells/1';

/** Reads a cells file's text: refuses (a message) anything but the schema, a provenance and lists of { row, cell, value }. */
export function readCellsFile(text: string, file: string, allowed: readonly string[]): CellsFile | string {
  let v: unknown;
  try {
    v = JSON.parse(text);
  } catch (e) {
    return `${file}: not JSON (${(e as Error).message.slice(0, 120)})`;
  }
  if (!isRecord(v) || v['schema'] !== CELLS_SCHEMA) return `${file}: not a ${CELLS_SCHEMA} object`;
  for (const k of Object.keys(v)) if (!['schema', 'provenance', 'tables'].includes(k)) return `${file}: unknown member ${k}`;
  if (typeof v['provenance'] !== 'string') return `${file}: provenance is not text`;
  const tables = v['tables'];
  if (!isRecord(tables) || Object.keys(tables).length === 0) return `${file}: tables is not a non-empty map`;
  const out: Record<string, CellEdit[]> = {};
  for (const id of Object.keys(tables)) {
    if (!allowed.includes(id)) return `${file}: table '${id}' is not one this phase writes (${allowed.join(', ')})`;
    const list = tables[id];
    if (!Array.isArray(list) || list.length === 0) return `${file}: tables.${id} is not a non-empty list`;
    const edits: CellEdit[] = [];
    for (const [i, e] of list.entries()) {
      if (!isRecord(e) || typeof e['row'] !== 'string' || typeof e['cell'] !== 'string' || !('value' in e) || Object.keys(e).length !== 3) {
        return `${file}: tables.${id}[${String(i)}] is not { row, cell, value }`;
      }
      edits.push({ row: e['row'], cell: e['cell'], value: e['value'] as CellValue });
    }
    out[id] = edits;
  }
  return { schema: CELLS_SCHEMA, provenance: v['provenance'], tables: out };
}
