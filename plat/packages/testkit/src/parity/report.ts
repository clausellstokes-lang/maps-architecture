// The parity report (M0-k-05; §13.5's `ParityReport`, the ⟨M-1⟩ rule and *Edges*; C-0068, C-0092, C-0116, N-20, N-25,
// N-31; C-0180 (10)). Rows are selected by `metric`, `reference`, `matched` and the trailing segments of their id only —
// `sample.family` is read only to tell a plain row from a stress row of one cell (N-31 (2)). Each of our entries gives
// one report row per reference the registry reads for its metric: no row → `fail` "⟨M-1⟩ row missing" for an ⟨M-1⟩
// cell, `missingBaseline` otherwise; a row → the band rule; a proxy (C-0018) → `reported`, naming the proxy.
import { H128, utf8Bytes, type Hash128 } from '@plat/kernel';
import type { Rung } from '@plat/model';
import { keyOfRowId, metricById, METRICS_VERSION, type MetricDef, type OursEntry } from '../metrics/registry.js';
import { bandRule, type OursCell } from './band.js';
import { canonicalJson, hash128Hex } from './canonical.js';
import type { Baseline, ParityOurs, ParityReport, ParityRow, ParityUnread } from './types.js';

/** The note of an ⟨M-1⟩ cell without its row (C-0116); the reference and the key follow it in brackets. */
export const NOTE_M1_MISSING = '⟨M-1⟩ row missing';

/** The rung a row is matched to (§13.5 *Matched sizes*), or null when it names none (it then applies at every rung). */
export function rowRung(row: Baseline): Rung | null {
  const m = row.matched;
  if (m === undefined) return null;
  if (m.rung !== undefined) return m.rung;
  if (m.mfcgSize !== undefined) return m.mfcgSize === 40 ? 'TOWN' : m.mfcgSize === 80 ? 'CITY' : m.mfcgSize === 130 ? 'METROPOLIS' : null;
  if (m.ftgSize !== undefined) return m.ftgSize === 'BIG_TOWN' ? 'TOWN' : m.ftgSize === 'METROPOLIS' ? 'METROPOLIS' : 'CITY';
  return null;
}

/** The options segment of a row's sample family (its last `/` segment; N-31 (2)). */
export function optionsSegment(row: Baseline): string {
  const parts = row.sample.family.split('/');
  return parts[parts.length - 1];
}

/** A selected cell: the row read for it, or the duplicate rows that leave it unread. */
export type Selection = { row: Baseline } | { duplicate: Baseline[] };

/** The rows of a run, selected per (metric, reference, key) for the rung, and the rows left unread with their reasons. */
export interface Selected {
  cells: Map<string, Selection>;
  unread: ParityUnread[];
}

/** The selection key of a cell. */
export function cellKey(metric: string, reference: string, key: string): string {
  return `${metric}|${reference}|${key}`;
}

/**
 * Selects the rows a run reads (N-20, N-25, N-31): superseded rows, rows of an unregistered metric, of another
 * `metricVersion` or unit than the registry's, with trailing segments naming no known subset or field, or of a
 * reference the registry does not read for the metric are listed unread; rows matched to another rung are skipped;
 * per cell a row matched to the rung wins over an unmatched one, then a plain row over a stress row (the other listed
 * `other setting: <options>`); any other pair, and every three or more, is a duplicate naming all of them.
 */
export function selectRows(rows: readonly Baseline[], rung: Rung): Selected {
  const unread: ParityUnread[] = [];
  const supersededBy = new Map<string, string>();
  for (const r of rows) if (r.supersedes !== undefined) supersededBy.set(r.supersedes, r.id);
  const groups = new Map<string, Baseline[]>();
  for (const r of rows) {
    const by = supersededBy.get(r.id);
    if (by !== undefined) {
      unread.push({ id: r.id, reason: `superseded by ${by}` });
      continue;
    }
    const def = metricById(r.metric);
    if (def === undefined) {
      unread.push({ id: r.id, reason: `metric ${r.metric} is not registered at M0` });
      continue;
    }
    if (r.metricVersion !== def.metricVersion) {
      unread.push({ id: r.id, reason: `metricVersion ${r.metricVersion}; the registry measures ${def.metricVersion}` });
      continue;
    }
    if (r.unit !== def.unit) {
      unread.push({ id: r.id, reason: `unit ${r.unit}; the registry's is ${def.unit}` });
      continue;
    }
    const key = keyOfRowId(def, r.id);
    if (key === null) {
      unread.push({ id: r.id, reason: 'its trailing segment names no known subset or field (N-25)' });
      continue;
    }
    if (!def.refs.some((x) => x.reference === r.reference)) {
      unread.push({ id: r.id, reason: `reference ${r.reference} is not read for ${def.id} at M0` });
      continue;
    }
    const rr = rowRung(r);
    if (rr !== null && rr !== rung) continue;
    const k = cellKey(def.id, r.reference, key);
    const g = groups.get(k);
    if (g === undefined) groups.set(k, [r]);
    else g.push(r);
  }
  const cells = new Map<string, Selection>();
  for (const [k, g0] of groups) {
    let g = g0;
    if (g.length > 1 && g.some((r) => rowRung(r) !== null) && g.some((r) => rowRung(r) === null)) {
      for (const r of g) if (rowRung(r) === null) unread.push({ id: r.id, reason: `unmatched; a row matched to ${rung} is read` });
      g = g.filter((r) => rowRung(r) !== null);
    }
    if (g.length === 1) {
      cells.set(k, { row: g[0] });
      continue;
    }
    const plain = g.filter((r) => optionsSegment(r) === 'plain');
    if (g.length === 2 && plain.length === 1) {
      const other = g.find((r) => r !== plain[0]) as Baseline;
      unread.push({ id: other.id, reason: `other setting: ${optionsSegment(other)}` });
      cells.set(k, { row: plain[0] });
      continue;
    }
    const ids = g.map((r) => r.id).join(', ');
    for (const r of g) unread.push({ id: r.id, reason: `duplicate: ${ids}` });
    cells.set(k, { duplicate: g });
  }
  return { cells, unread };
}

/** Our cell from an entry. */
function cellOf(e: OursEntry, seeds: number): OursCell {
  return e.samples !== undefined ? { samples: e.samples, seeds } : { perSeed: e.perSeed ?? [], seeds };
}

/** The report rows of one of our entries (one per reference the registry reads for its metric). */
function rowsFor(def: MetricDef, e: OursEntry, ours: ParityOurs, sel: Selected): ParityRow[] {
  const base = { metric: def.id, metricVersion: def.metricVersion, rung: ours.rung, preset: ours.preset, setting: { ...ours.setting } };
  const cell = cellOf(e, ours.setting.seeds);
  if (def.refs.length === 0) {
    const verdict = e.notApplicable !== undefined ? 'notApplicable' : 'missingBaseline';
    const note = e.notApplicable ?? `no reference row is read for this metric at M0 (${e.key})`;
    return [{ ...base, baselineIds: [], role: 'target', band: {}, ours: { n: 0, seeds: ours.setting.seeds }, verdict, note }];
  }
  const out: ParityRow[] = [];
  for (const ref of def.refs) {
    const sel1 = sel.cells.get(cellKey(def.id, ref.reference, e.key));
    const where = `(${ref.reference}, ${e.key})`;
    if (e.notApplicable !== undefined) {
      const ids = sel1 !== undefined && 'row' in sel1 ? [sel1.row.id] : [];
      out.push({ ...base, baselineIds: ids, role: ref.role, band: {}, ours: { n: 0, seeds: ours.setting.seeds }, verdict: 'notApplicable', note: e.notApplicable });
      continue;
    }
    if (sel1 === undefined) {
      const m1 = ref.m1 === true;
      out.push({
        ...base,
        baselineIds: [],
        role: ref.role,
        band: {},
        ours: { n: 0, seeds: ours.setting.seeds },
        verdict: m1 ? 'fail' : 'missingBaseline',
        note: m1 ? `${NOTE_M1_MISSING} ${where}` : `no baseline row ${where}`,
      });
      continue;
    }
    if ('duplicate' in sel1) {
      out.push({
        ...base,
        baselineIds: sel1.duplicate.map((r) => r.id),
        role: ref.role,
        band: {},
        ours: { n: 0, seeds: ours.setting.seeds },
        verdict: 'fail',
        note: `duplicate rows ${where}: ${sel1.duplicate.map((r) => r.id).join(', ')}`,
      });
      continue;
    }
    const row = sel1.row;
    const b = bandRule(row, cell, { weakness: def.weakness, m1: ref.m1 === true });
    const r: ParityRow = { ...base, baselineIds: [row.id], role: row.role, band: b.band, ours: b.ours, verdict: b.verdict };
    if (b.note !== undefined) r.note = b.note;
    if (def.proxy !== undefined && (b.verdict === 'pass' || b.verdict === 'fail')) {
      r.verdict = 'reported';
      r.note = `proxy: ${def.proxy}; ${b.verdict === 'pass' ? 'in band' : 'out of band'}`;
    }
    out.push(r);
  }
  return out;
}

/** The inputs of one run: the rows read, the hash of the bytes they came from, our side, and the reader's lines. */
export interface ParityInput {
  readonly rows: readonly Baseline[];
  readonly baselinesHash: Hash128;
  readonly ours: ParityOurs;
  readonly info?: readonly string[];
}

/** The run's id: H128 of the baselines hash and our side's canonical form, hex (the same inputs, the same id). */
export function runIdOf(baselinesHash: Hash128, ours: ParityOurs): string {
  return `parity-${hash128Hex(H128(utf8Bytes(`${hash128Hex(baselinesHash)}|${canonicalJson(ours)}`)))}`;
}

/** The parity report of one run (§13.5), deterministic in its inputs (T-RIG-2). */
export function parityReport(input: ParityInput): ParityReport {
  const { ours } = input;
  const sel = selectRows(input.rows, ours.rung);
  const rows: ParityRow[] = [];
  for (const e of ours.entries) {
    const def = metricById(e.metric);
    if (def === undefined) throw new Error(`parity: ours names an unregistered metric ${JSON.stringify(e.metric)}`);
    for (const r of rowsFor(def, e, ours, sel)) rows.push(r);
  }
  const summary = { pass: 0, fail: 0, reported: 0 };
  for (const r of rows) if (r.verdict === 'pass' || r.verdict === 'fail' || r.verdict === 'reported') summary[r.verdict] += 1;
  return {
    runId: runIdOf(input.baselinesHash, ours),
    date: ours.date,
    outputVersion: ours.outputVersion,
    generatorVersion: ours.generatorVersion,
    baselines: [...input.baselinesHash] as Hash128,
    metricsVersion: METRICS_VERSION,
    rows,
    summary,
    unread: sel.unread,
    info: [...(input.info ?? [])],
  };
}
