// workLimits.json and its loader (§5.1 (5), §14's `@plat/tables: workLimits.json`; C-0021, C-0153 (5), C-0174; M0-f-03a).
//
// The file is one table of M0's form (C-0153): `{ table: 'workLimits', version, section, rows }`, a row per counter keyed
// by the counter's name, its cells `unit` (the WorkUnit the law counts, or `fixed`), `perUnit`, `floor` and, on a
// recursion depth, `log2` — every cell `{ value, unit, provenance, calibratable }`. The law's two coefficients carry
// C-0021's provenance `architecture 2026-10-03 placeholder` until M0-f-03b rewrites them from the spikes' measured work
// (p999 × 1.5, provenance `M0 spike ⟨date⟩`); the unit and the log2 form are the list's (M0.md §2.2) and not calibratable.
// The loader refuses a missing counter, a counter whose unit or log2 form departs from the list, a malformed law, and —
// read from the file's text — a duplicate counter (C-0174 (4)); every refusal names the table, the row and the cell.
import type { WorkLimitLaw } from '@plat/model';
import type { TableIssue } from '../cell/index.js';
import { parseTable, TableError, type Table } from '../loader/index.js';
import shipped from '../../data/workLimits.json';
import { WORK_LIMIT_COUNTERS, isTableWorkUnit, type WorkLimitCounterSpec } from './counters.js';

/** The table's id (the file stem). */
export const WORK_LIMITS_TABLE = 'workLimits';

/** A law whose unit is `fixed`: it reads no count, so its limit is its floor (M0.md §2.2's `warp.halvings`; C-0174 (2)). */
export interface FixedWorkLimitLaw {
  counter: string;
  unit: 'fixed';
  perUnit: 0;
  floor: number;
}

/** A row of workLimits.json as a law: §5.1 (5)'s WorkLimitLaw, or a fixed law. */
export type TableWorkLimitLaw = WorkLimitLaw | FixedWorkLimitLaw;

/** The loaded table: checked, frozen, its laws in key order. */
export interface WorkLimitsTable {
  /** The checked table (C-0153): its version, section and pinning hash (§7.6). */
  readonly table: Table;
  /** Every row's law, in key order. */
  readonly laws: readonly Readonly<TableWorkLimitLaw>[];
  /** Does the table hold a row for the counter? */
  has(counter: string): boolean;
  /** The counter's law, or a refusal naming the table and the counter. */
  law(counter: string): Readonly<TableWorkLimitLaw>;
}

const CELLS: ReadonlySet<string> = new Set(['unit', 'perUnit', 'floor', 'log2']);

/** Every issue of a checked table against the law form and the counter list (none: it loads). */
export function checkWorkLimits(t: Table, required: readonly WorkLimitCounterSpec[] = WORK_LIMIT_COUNTERS): TableIssue[] {
  const issues: TableIssue[] = [];
  const issue = (reason: string, row?: string, cell?: string): void => {
    issues.push(row === undefined ? { table: t.id, reason } : cell === undefined ? { table: t.id, row, reason } : { table: t.id, row, cell, reason });
  };
  const specs = new Map<string, WorkLimitCounterSpec>();
  for (const s of required) {
    if (specs.has(s.counter)) issue(`the counter list names '${s.counter}' twice`, s.counter);
    specs.set(s.counter, s);
  }
  for (const [rk, row] of t.rows) {
    for (const ck of row.keys()) if (!CELLS.has(ck)) issue(`unknown cell '${ck}': a law row has unit, perUnit, floor and log2`, rk, ck);
    const unit = row.get('unit');
    const perUnit = row.get('perUnit');
    const floor = row.get('floor');
    const log2 = row.get('log2');
    if (unit === undefined) issue('lacks unit', rk, 'unit');
    else if (!isTableWorkUnit(unit.value)) issue(`unit '${String(unit.value)}' is not a WorkUnit of §5.1 (5) nor 'fixed'`, rk, 'unit');
    if (perUnit === undefined) issue('lacks perUnit', rk, 'perUnit');
    else if (typeof perUnit.value !== 'number' || perUnit.value < 0) issue('perUnit must be a number ≥ 0', rk, 'perUnit');
    else {
      const want = unit !== undefined && unit.value === 'landHa' ? 'perHa' : 'ratio';
      if (perUnit.unit !== want) issue(`perUnit's unit must be '${want}', not '${perUnit.unit}'`, rk, 'perUnit');
    }
    if (floor === undefined) issue('lacks floor', rk, 'floor');
    else if (typeof floor.value !== 'number' || floor.value < 0) issue('floor must be a number ≥ 0', rk, 'floor');
    else if (floor.unit !== 'count') issue(`floor's unit must be 'count', not '${floor.unit}'`, rk, 'floor');
    if (log2 !== undefined && typeof log2.value !== 'boolean') issue('log2 must be a flag', rk, 'log2');
    const isLog2 = log2 !== undefined && log2.value === true;
    if (unit !== undefined && unit.value === 'fixed') {
      if (isLog2) issue('a fixed law takes no log2 form', rk, 'log2');
      if (perUnit !== undefined && perUnit.value !== 0) issue('a fixed law counts nothing: perUnit must be 0', rk, 'perUnit');
    }
    const spec = specs.get(rk);
    if (spec !== undefined) {
      if (unit !== undefined && unit.value !== spec.unit) issue(`the counter list gives '${rk}' the unit '${spec.unit}', not '${String(unit.value)}'`, rk, 'unit');
      if (isLog2 !== (spec.log2 === true)) issue(`the counter list gives '${rk}' ${spec.log2 === true ? 'the log2 form' : 'no log2 form'}`, rk, 'log2');
    }
  }
  for (const s of required) if (!t.rows.has(s.counter)) issue('missing counter: the counter list names it (M0.md §2.2)', s.counter);
  return issues;
}

/** One row of a checked table as a frozen law. */
function lawOf(t: Table, counter: string): Readonly<TableWorkLimitLaw> {
  const unit = t.str(counter, 'unit');
  const perUnit = t.num(counter, 'perUnit');
  const floor = t.num(counter, 'floor');
  if (unit === 'fixed') return Object.freeze({ counter, unit: 'fixed', perUnit: 0, floor } satisfies FixedWorkLimitLaw);
  const law: WorkLimitLaw = { counter, unit: unit as WorkLimitLaw['unit'], perUnit, floor };
  if (t.has(counter, 'log2') && t.bool(counter, 'log2')) law.log2 = true;
  return Object.freeze(law);
}

class Laws implements WorkLimitsTable {
  readonly table: Table;
  readonly laws: readonly Readonly<TableWorkLimitLaw>[];
  private readonly byCounter: ReadonlyMap<string, Readonly<TableWorkLimitLaw>>;

  constructor(table: Table) {
    this.table = table;
    const by = new Map<string, Readonly<TableWorkLimitLaw>>();
    for (const rk of table.rows.keys()) by.set(rk, lawOf(table, rk));
    this.byCounter = by;
    this.laws = Object.freeze([...by.values()]);
    Object.freeze(this);
  }

  has(counter: string): boolean {
    return this.byCounter.has(counter);
  }

  law(counter: string): Readonly<TableWorkLimitLaw> {
    const l = this.byCounter.get(counter);
    if (l === undefined) throw new TableError([{ table: this.table.id, row: counter, reason: 'no such counter' }]);
    return l;
  }
}

/** A raw workLimits.json checked into its laws, or a `TableError` naming every issue (C-0153's form, then the law form). */
export function parseWorkLimits(raw: unknown, required: readonly WorkLimitCounterSpec[] = WORK_LIMIT_COUNTERS): WorkLimitsTable {
  const t = parseTable(WORK_LIMITS_TABLE, raw);
  const issues = checkWorkLimits(t, required);
  if (issues.length > 0) throw new TableError(issues);
  return new Laws(t);
}

/** A key a JSON object holds twice, and where: the keys of the objects enclosing it (array entries by index). */
export interface DuplicateKey {
  readonly path: readonly string[];
  readonly key: string;
}

/**
 * Every key a JSON text's objects hold twice, in text order. A parsed object keeps only the last of two equal keys, so
 * a duplicate counter is visible only in the text. Throws `SyntaxError` on a text that is not JSON.
 */
export function duplicateKeys(text: string): DuplicateKey[] {
  JSON.parse(text);
  interface Frame {
    readonly object: boolean;
    readonly keys: Set<string>;
    readonly path: readonly string[];
    expectKey: boolean;
    lastKey: string;
    index: number;
  }
  const out: DuplicateKey[] = [];
  const stack: Frame[] = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    const top = stack.length > 0 ? stack[stack.length - 1] : undefined;
    if (ch === '"') {
      let j = i + 1;
      while (text[j] !== '"') j += text[j] === '\\' ? 2 : 1;
      if (top !== undefined && top.object && top.expectKey) {
        const key = JSON.parse(text.slice(i, j + 1)) as string;
        if (top.keys.has(key)) out.push({ path: top.path, key });
        top.keys.add(key);
        top.expectKey = false;
        top.lastKey = key;
      }
      i = j + 1;
      continue;
    }
    if (ch === '{' || ch === '[') {
      const path = top === undefined ? [] : [...top.path, top.object ? top.lastKey : String(top.index)];
      stack.push({ object: ch === '{', keys: new Set(), path, expectKey: ch === '{', lastKey: '', index: 0 });
    } else if (ch === '}' || ch === ']') {
      stack.pop();
    } else if (ch === ',' && top !== undefined) {
      if (top.object) top.expectKey = true;
      else top.index += 1;
    }
    i += 1;
  }
  return out;
}

/**
 * workLimits.json's text checked into its laws: a text that is not JSON or holds a key twice — a duplicate counter
 * among them — is refused before the parsed table is checked (C-0174 (4)).
 */
export function parseWorkLimitsText(text: string, required: readonly WorkLimitCounterSpec[] = WORK_LIMIT_COUNTERS): WorkLimitsTable {
  let dups: DuplicateKey[];
  try {
    dups = duplicateKeys(text);
  } catch (e) {
    throw new TableError([{ table: WORK_LIMITS_TABLE, reason: `not JSON: ${(e as Error).message}` }]);
  }
  if (dups.length > 0) {
    throw new TableError(
      dups.map((d): TableIssue => {
        if (d.path.length === 1 && d.path[0] === 'rows') return { table: WORK_LIMITS_TABLE, row: d.key, reason: 'duplicate counter: the file holds its row twice' };
        if (d.path.length === 2 && d.path[0] === 'rows') return { table: WORK_LIMITS_TABLE, row: d.path[1], cell: d.key, reason: 'duplicate cell' };
        const at = d.path.length === 0 ? '' : ` in ${d.path.join('.')}`;
        return { table: WORK_LIMITS_TABLE, reason: `duplicate key '${d.key}'${at}` };
      }),
    );
  }
  return parseWorkLimits(JSON.parse(text), required);
}

let LOADED: WorkLimitsTable | undefined;

/** The shipped workLimits.json (`loadWorkLimits()`): checked once, then shared. */
export function loadWorkLimits(): WorkLimitsTable {
  if (LOADED === undefined) LOADED = parseWorkLimits(shipped);
  return LOADED;
}

/** The table's calibratable cells as `workLimits/⟨counter⟩/⟨cell⟩`, in key order (C-0070's census, this file's share). */
export function workLimitsCensus(t: WorkLimitsTable = loadWorkLimits()): string[] {
  const out: string[] = [];
  for (const [rk, row] of t.table.rows) for (const [ck, c] of row) if (c.calibratable) out.push(`${t.table.id}/${rk}/${ck}`);
  return out;
}
