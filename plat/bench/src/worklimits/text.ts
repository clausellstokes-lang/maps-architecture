// workLimits.json's text as the fit rewrites it, and the numbers-only summary (M0-f-03b; C-0021, C-0067, C-0091,
// C-0301 (3), N-61 (6)). The text keeps the file's own layout — the rows in M0-work.json's counter order (a row beyond
// the list after them, in key order), each row's cells in the order unit, log2, perUnit, floor, each cell on one line as
// { value, unit, provenance, calibratable[, note] } — so a fit that changes nothing writes the same bytes, and a fit
// that changes a row changes only that row's perUnit and floor lines. Every row keeps its counter, its unit, its log2
// form and every calibratable flag; only perUnit, floor and their provenance (and, on a floored row, their note) change.
import type { Cell, WorkLimitsTable } from '@plat/tables';
import { WORK_LIMIT_COUNTERS } from '@plat/tables';
import { FitError, type CounterFit, type WorkLimitCoefficientReport } from './fit.js';

/** The cells a law row holds, in the file's order. */
const CELL_ORDER = Object.freeze(['unit', 'log2', 'perUnit', 'floor'] as const);

/** The cell fields the file uses, in its order; any other field (evidence, ownerRule, extension, presets) is refused. */
const FIELD_ORDER = Object.freeze(['value', 'unit', 'provenance', 'calibratable', 'note'] as const);

/** A cell as the text writes it. */
interface TextCell {
  readonly value: unknown;
  readonly unit: string;
  readonly provenance: string;
  readonly calibratable: boolean;
  readonly note?: string;
}

function cellOf(counter: string, key: string, c: Cell): TextCell {
  for (const k of Object.keys(c).sort()) {
    if (!(FIELD_ORDER as readonly string[]).includes(k)) throw new FitError(`workLimits.json ${counter}/${key}: field '${k}' is outside the law rows' form`);
  }
  return c.note === undefined
    ? { value: c.value, unit: c.unit, provenance: c.provenance, calibratable: c.calibratable }
    : { value: c.value, unit: c.unit, provenance: c.provenance, calibratable: c.calibratable, note: c.note };
}

function cellText(c: TextCell): string {
  const parts = [`"value": ${JSON.stringify(c.value)}`, `"unit": ${JSON.stringify(c.unit)}`, `"provenance": ${JSON.stringify(c.provenance)}`, `"calibratable": ${JSON.stringify(c.calibratable)}`];
  if (c.note !== undefined) parts.push(`"note": ${JSON.stringify(c.note)}`);
  return `{${parts.join(', ')}}`;
}

/** The rows in the file's order: M0-work.json's list first, any further row after it in key order. */
export function rowOrder(table: WorkLimitsTable): string[] {
  const listed = WORK_LIMIT_COUNTERS.map((s) => s.counter).filter((c) => table.has(c));
  const extra = [...table.table.rows.keys()].filter((c) => !listed.includes(c)).sort();
  return [...listed, ...extra];
}

/** The note a floored row's perUnit and floor carry (N-61 (6)'s wording). */
export function flooredNote(f: CounterFit): string {
  if (f.law === null || f.coefficient === null) throw new FitError(`${f.counter}: not a floored row`);
  return `floored by ${f.law.law} (M0.md §2.2; §5.1 (5), N-61 (6)): the row is max(measured, law); measured p999 × 1.5 = ${String(f.coefficient)}`;
}

/** The table's text with the fit applied: the version bumped by one when a cell changes, kept when none does. */
export function fittedText(table: WorkLimitsTable, fits: readonly CounterFit[]): { text: string; version: number; changed: boolean } {
  const byCounter = new Map<string, CounterFit>();
  for (const f of fits) byCounter.set(f.counter, f);
  let changed = false;
  const rows: string[] = [];
  for (const counter of rowOrder(table)) {
    const row = table.table.row(counter);
    for (const k of row.keys()) if (!(CELL_ORDER as readonly string[]).includes(k)) throw new FitError(`workLimits.json ${counter}: cell '${k}' is outside the law rows' form`);
    const f = byCounter.get(counter);
    if (f === undefined) throw new FitError(`workLimits.json ${counter}: the fit has no entry for the row`);
    const lines: string[] = [];
    for (const key of CELL_ORDER) {
      const c = row.get(key);
      if (c === undefined) continue;
      let cell = cellOf(counter, key, c);
      if ((key === 'perUnit' || key === 'floor') && (f.status === 'measured' || f.status === 'floored')) {
        const value = key === 'perUnit' ? f.after.perUnit : f.after.floor;
        const provenance = key === 'perUnit' ? f.after.perUnitProvenance : f.after.floorProvenance;
        const next: TextCell = f.status === 'floored' ? { value, unit: cell.unit, provenance, calibratable: cell.calibratable, note: flooredNote(f) } : { value, unit: cell.unit, provenance, calibratable: cell.calibratable };
        if (cellText(next) !== cellText(cell)) changed = true;
        cell = next;
      }
      lines.push(`      ${JSON.stringify(key)}: ${cellText(cell)}`);
    }
    rows.push(`    ${JSON.stringify(counter)}: {\n${lines.join(',\n')}\n    }`);
  }
  const version = changed ? table.table.version + 1 : table.table.version;
  const text = `{\n  "table": ${JSON.stringify(table.table.id)},\n  "version": ${String(version)},\n  "section": ${JSON.stringify(table.table.section)},\n  "rows": {\n${rows.join(',\n')}\n  }\n}\n`;
  return { text, version, changed };
}

/** One input as the summary records it. */
export interface SummaryInput {
  readonly summary: string;
  /** Its path under plat/. */
  readonly path: string;
  readonly sha256: string;
  readonly bytes: number;
}

/**
 * The numbers-only summary `docs/build/summaries/M0-f-03b.json` (C-0067): the inputs by hash, per counter what it was
 * fitted from and what was written, the skeleton's measured coefficient beside its law (N-61 (6)), the hit-rate rows
 * before and after with the unbounded ones named (C-0442), the version written and the files the run opened.
 */
export function summaryOf(report: WorkLimitCoefficientReport, inputs: readonly SummaryInput[], version: number, opened: readonly string[]): unknown {
  const counters: Record<string, unknown> = {};
  for (const f of report.counters) {
    counters[f.counter] = {
      unit: f.unit,
      log2: f.log2,
      status: f.status,
      blocks: f.sources.length,
      samples: f.sources.reduce((s, b) => s + b.n, 0),
      p999: f.p999,
      coefficient: f.coefficient,
      law: f.law === null ? null : { perUnit: f.law.perUnit, floor: f.law.floor, law: f.law.law },
      perUnit: f.after.perUnit,
      floor: f.after.floor,
      provenance: f.after.perUnitProvenance === f.after.floorProvenance ? f.after.perUnitProvenance : [f.after.perUnitProvenance, f.after.floorProvenance],
      sources: f.sources.map((b) => ({ summary: b.summary, at: b.at, n: b.n, p999: b.p999, max: b.max })),
    };
  }
  const h = report.hitRate;
  return {
    item: report.item,
    date: report.date,
    provenance: report.provenance,
    table: { file: 'packages/tables/data/workLimits.json', version },
    inputs,
    opened,
    counters,
    hitRate: {
      target: { perThousand: 1 },
      batches: h.batches,
      before: h.before,
      beforeUnrecorded: h.beforeUnrecorded,
      after: h.after,
      worstPerThousand: h.worstPerThousand,
      pass: h.pass,
      // C-0442: the rows whose stage charges a counter its summary carries no block for — after null, never 0.
      unbounded: h.unbounded.map((m) => ({ summary: m.summary, at: m.at, stage: m.stage, counters: m.counters })),
      rows: h.rows.map((r) => ({ summary: r.summary, at: r.at, stage: r.stage, rung: r.rung, batches: r.batches, before: r.before, after: r.after, afterExact: r.afterExact, perThousand: r.perThousand, unbounded: r.unbounded })),
      fWork: h.fWork.rows.map((r) => ({ stage: r.stage, rung: r.rung, position: r.position, batches: r.batches, workCuts: r.workCuts, perThousand: r.perThousand })),
    },
    pass: h.pass,
  };
}
