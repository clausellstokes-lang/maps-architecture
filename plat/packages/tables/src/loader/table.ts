// The table loader (§7.6; §13.7's JT; C-0012; M0-s-02): a versioned JSON table → a checked, frozen `Table`, or a
// refusal naming the table, the row and the cell. The file's shape is `{ table, version, section, rows }`: `table` its
// registry id, `version` a positive integer that every change of a cell bumps (a changed cell is a declared change),
// `section` the design section that states it, `rows` a map from a stable row key to a map from a cell key to a cell.
// A row key may also begin with a digit (`ROW_KEY`); a cell key is a stable key (`STABLE_KEY`, the cell module's).
// Keys are read in one total order (the kernel's sortedKeys, C-0009), never in the engine's enumeration order.
import { H128, sortedKeys, utf8Bytes, type Hash128 } from '@plat/kernel';
import { issueAt, nonEmptyString, STABLE_KEY } from '../cell/cell.js';
import { checkCell, isRecord, type Cell, type CellValue, type TableIssue } from '../cell/index.js';
import { TABLE_SOURCES, isTableId } from './registry.js';

/** A row: its cells by key, in key order. */
export type Row = ReadonlyMap<string, Cell>;

/** A refusal to load: the first issue in its message, every issue in `issues`. */
export class TableError extends Error {
  readonly table: string;
  readonly row?: string;
  readonly cell?: string;
  readonly reason: string;
  readonly issues: readonly TableIssue[];

  constructor(issues: readonly TableIssue[]) {
    const first = issues[0];
    const where = [`table '${first.table}'`];
    if (first.row !== undefined) where.push(`row '${first.row}'`);
    if (first.cell !== undefined) where.push(`cell '${first.cell}'`);
    const more = issues.length > 1 ? ` (and ${issues.length - 1} more)` : '';
    super(`${where.join(', ')}: ${first.reason}${more}`);
    this.name = 'TableError';
    this.table = first.table;
    if (first.row !== undefined) this.row = first.row;
    if (first.cell !== undefined) this.cell = first.cell;
    this.reason = first.reason;
    this.issues = Object.freeze([...issues]);
  }
}

const TOP_FIELDS: ReadonlySet<string> = new Set(['table', 'version', 'section', 'rows']);
/** A row key: a stable key that may also begin with a digit. */
const ROW_KEY = /^[A-Za-z0-9][A-Za-z0-9_.\-]*$/;

/** Every issue of one raw table file (none: it loads). */
export function checkTable(id: string, raw: unknown): TableIssue[] {
  const issues: TableIssue[] = [];
  const issue = (reason: string, row?: string, cell?: string): void => {
    issues.push(issueAt({ table: id, row, cell, reason }));
  };
  if (!isRecord(raw)) {
    issue('a table file must be a JSON object');
    return issues;
  }
  for (const k of sortedKeys(raw)) if (!TOP_FIELDS.has(k)) issue(`unknown field '${k}'`);
  if (raw.table !== id) issue(`the file names table '${String(raw.table)}', not '${id}'`);
  if (!(typeof raw.version === 'number' && Number.isInteger(raw.version) && raw.version >= 1)) {
    issue('version must be a positive integer');
  }
  if (!nonEmptyString(raw.section)) issue('section must name the design section');
  const rows = raw.rows;
  if (!isRecord(rows) || sortedKeys(rows).length === 0) {
    issue('empty table: no rows');
    return issues;
  }
  for (const rk of sortedKeys(rows)) {
    if (!ROW_KEY.test(rk)) issue(`row key '${rk}' is not a stable key`, rk);
    const row = rows[rk];
    if (!isRecord(row) || sortedKeys(row).length === 0) {
      issue('empty row: no cells', rk);
      continue;
    }
    for (const ck of sortedKeys(row)) {
      if (!STABLE_KEY.test(ck)) issue(`cell key '${ck}' is not a stable key`, rk, ck);
      issues.push(...checkCell(row[ck], { table: id, row: rk, cell: ck }));
    }
  }
  return issues;
}

/** A value frozen deep (lists of lists included). */
function frozenValue(v: CellValue): CellValue {
  return Array.isArray(v) ? Object.freeze(v.map((e: CellValue) => frozenValue(e))) : v;
}

/** A checked raw cell copied into a frozen `Cell` carrying only the fields present. */
function frozenCell(raw: Record<string, unknown>): Cell {
  const out: Record<string, unknown> = {
    value: frozenValue(raw.value as CellValue),
    unit: raw.unit,
    provenance: raw.provenance,
    calibratable: raw.calibratable,
  };
  if (raw.evidence !== undefined) out.evidence = Object.freeze([...(raw.evidence as string[])]);
  if (raw.note !== undefined) out.note = raw.note;
  if (raw.ownerRule !== undefined) out.ownerRule = raw.ownerRule;
  if (raw.extension !== undefined) {
    const e = raw.extension as { over: unknown; mode: unknown };
    out.extension = Object.freeze({ over: e.over, mode: e.mode });
  }
  if (raw.presets !== undefined) {
    const ps = raw.presets as Record<string, { value: CellValue; provenance: string }>;
    const copy: Record<string, unknown> = {};
    for (const id of sortedKeys(ps)) copy[id] = Object.freeze({ value: frozenValue(ps[id].value), provenance: ps[id].provenance });
    out.presets = Object.freeze(copy);
  }
  return Object.freeze(out) as unknown as Cell;
}

// The pinning content (§7.6) and the two slice hashes. A cell's pinning content is its value, unit, calibratable,
// extension and presets' values — never the provenance block (source, note, evidence, owner rule), so rewording
// provenance never moves a hash; a row's is its cells' in key order. A row slice hashes the row's pinning content; a
// field slice hashes its `'<row>/<cell>'` key and the cell's pinning content. They are the forms `SliceRef.hash`
// records (C-0157 (1)), fixed.

/** The pinning content of a cell (§7.6). */
export function cellPinning(c: Cell): string {
  const ext = c.extension === undefined ? '-' : `${JSON.stringify(c.extension.over)}/${JSON.stringify(c.extension.mode)}`;
  let presets = '-';
  if (c.presets !== undefined) {
    const parts: string[] = [];
    for (const id of sortedKeys(c.presets)) {
      const pv = (c.presets as Record<string, { value: CellValue }>)[id];
      parts.push(`${JSON.stringify(id)}=${JSON.stringify(pv.value)}`);
    }
    presets = parts.join(';');
  }
  return `[${JSON.stringify(c.value)}|${c.unit}|${c.calibratable ? 1 : 0}|${ext}|${presets}]`;
}

/** The pinning content of a row: its cells' in key order. */
export function rowPinning(row: Row): string {
  const parts: string[] = [];
  for (const [k, c] of row) parts.push(`${JSON.stringify(k)}:${cellPinning(c)}`);
  return `{${parts.join(',')}}`;
}

/** A loaded table: checked, frozen, its rows and cells in key order, its pinning hash (§7.6). */
export class Table {
  readonly id: string;
  readonly version: number;
  readonly section: string;
  readonly rows: ReadonlyMap<string, Row>;
  /** H128 of the table's pinning content (every row's, in key order; §7.6's pinning hash). */
  readonly hash: Hash128;

  constructor(id: string, raw: Record<string, unknown>) {
    this.id = id;
    this.version = raw.version as number;
    this.section = raw.section as string;
    const src = raw.rows as Record<string, Record<string, unknown>>;
    const rows = new Map<string, Row>();
    const parts: string[] = [];
    for (const rk of sortedKeys(src)) {
      const cells = new Map<string, Cell>();
      for (const ck of sortedKeys(src[rk])) cells.set(ck, frozenCell(src[rk][ck] as Record<string, unknown>));
      rows.set(rk, cells);
      parts.push(`${JSON.stringify(rk)}:${rowPinning(cells)}`);
    }
    this.rows = rows;
    this.hash = H128(utf8Bytes(parts.join('\n')));
    Object.freeze(this);
  }

  private refuse(reason: string, row?: string, cell?: string): never {
    throw new TableError([issueAt({ table: this.id, row, cell, reason })]);
  }

  /** Does the table hold the row (and, given one, the cell)? */
  has(row: string, cell?: string): boolean {
    const r = this.rows.get(row);
    return r !== undefined && (cell === undefined || r.has(cell));
  }

  /** The row, or a refusal naming the table and the row. */
  row(row: string): Row {
    const r = this.rows.get(row);
    if (r === undefined) this.refuse('no such row', row);
    return r;
  }

  /** The cell, or a refusal naming the table, the row and the cell. */
  cell(row: string, cell: string): Cell {
    const c = this.row(row).get(cell);
    if (c === undefined) this.refuse('no such cell', row, cell);
    return c;
  }

  value(row: string, cell: string): CellValue {
    return this.cell(row, cell).value;
  }

  /** A number cell. */
  num(row: string, cell: string): number {
    const v = this.value(row, cell);
    if (typeof v !== 'number') this.refuse('not a number', row, cell);
    return v;
  }

  /** A list-of-numbers cell. */
  nums(row: string, cell: string): readonly number[] {
    const v = this.value(row, cell);
    if (!Array.isArray(v) || !v.every((e) => typeof e === 'number')) this.refuse('not a list of numbers', row, cell);
    return v as readonly number[];
  }

  /** A range cell `[lo, hi]`, lo ≤ hi. */
  pair(row: string, cell: string): [number, number] {
    const v = this.nums(row, cell);
    if (v.length !== 2 || v[0] > v[1]) this.refuse('not a range [lo, hi]', row, cell);
    return [v[0], v[1]];
  }

  /** A key cell. */
  str(row: string, cell: string): string {
    const v = this.value(row, cell);
    if (typeof v !== 'string') this.refuse('not a key', row, cell);
    return v;
  }

  /** A list-of-keys cell. */
  strs(row: string, cell: string): readonly string[] {
    const v = this.value(row, cell);
    if (!Array.isArray(v) || !v.every((e) => typeof e === 'string')) this.refuse('not a list of keys', row, cell);
    return v as readonly string[];
  }

  /** A flag cell. */
  bool(row: string, cell: string): boolean {
    const v = this.value(row, cell);
    if (typeof v !== 'boolean') this.refuse('not a flag', row, cell);
    return v;
  }

  /** H128 of one row's pinning content (a `row` slice, §2.8). */
  rowHash(row: string): Hash128 {
    return H128(utf8Bytes(rowPinning(this.row(row))));
  }
}

/** H128 of a field slice: its `'<row>/<cell>'` key, as the reader cites it, and the cell's pinning content (§2.8). */
export function cellSliceHash(key: string, c: Cell): Hash128 {
  return H128(utf8Bytes(`${JSON.stringify(key)}:${cellPinning(c)}`));
}

/** A raw table file checked into a `Table`, or a `TableError` naming every issue. */
export function parseTable(id: string, raw: unknown): Table {
  const issues = checkTable(id, raw);
  if (issues.length > 0) throw new TableError(issues);
  return new Table(id, raw as Record<string, unknown>);
}

const LOADED = new Map<string, Table>();

/** One of M0's tables by id (`loadTable(id)`): checked once, then shared; a refusal names the table, row and cell. */
export function loadTable(id: string): Table {
  const hit = LOADED.get(id);
  if (hit !== undefined) return hit;
  if (!isTableId(id)) throw new TableError([issueAt({ table: id, reason: 'no such table in @plat/tables' })]);
  const t = parseTable(id, TABLE_SOURCES.get(id));
  LOADED.set(id, t);
  return t;
}
