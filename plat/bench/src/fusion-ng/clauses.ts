// The clauses of a phase (M0-c-07; §13.5's band rule and ⟨M-1⟩ rule through M0-k-05's parity report; C-0072, C-0092,
// C-0116). Our side is measured by M0-k-05's registry (`measureSeeds`, one metric function and one metricVersion with
// M0-c-06, C-0122's rule) and judged by M0-k-05's parity report — row selection, the band rule in its M0 form,
// `missingBaseline` for a non-⟨M-1⟩ cell without a row, `fail` "⟨M-1⟩ row missing" for an ⟨M-1⟩ one, `reported` for a
// descriptive row and for a proxy (C-0018), `notApplicable` for V12's forms and a metric measured from M1 — never a
// second implementation of the CLI. A report row becomes one clause (M0-b-05's `Clause`); a clause is GATING when the
// phase's exit bar names it, and the run passes only when every gating clause holds (`pass`, or `reported` on a
// descriptive row, C-0071, C-0116: M0-b-05's `holds`) — `fail`, `missingBaseline` and `notApplicable` on a gating clause
// fail the run, never pass it vacuously (§13.8 Edges).
import type { Hash128 } from '@plat/kernel';
import { metricById, parityReport, type Baseline, type ParityOurs, type ParityReport, type ParityRow } from '@plat/testkit';
import { holds, type Clause } from '../bentcut-ng/index.js';

/** A clause's gating predicate: the metric, the key (N-25's trailing segments) and the row's reference. */
export type GatePredicate = (metric: string, key: string, reference: string | null) => boolean;

/** The parity report of our side (M0-k-05's `parityReport`: the parity CLI's own logic). */
export function judged(rows: readonly Baseline[], baselinesHash: Hash128, ours: ParityOurs, info: readonly string[]): ParityReport {
  return parityReport({ rows, baselinesHash, ours, info });
}

/**
 * The report rows' (entry, reference) pairs in report order: M0-k-05's `rowsFor` gives each of our entries one row
 * per reference the registry reads for its metric (one row when it reads none).
 */
export function rowOwners(ours: ParityOurs): { key: string; reference: string | null }[] {
  const out: { key: string; reference: string | null }[] = [];
  for (const e of ours.entries) {
    const def = metricById(e.metric);
    if (def === undefined) throw new Error(`fusion-ng: our side names an unregistered metric ${JSON.stringify(e.metric)}`);
    if (def.refs.length === 0) out.push({ key: e.key, reference: null });
    else for (const r of def.refs) out.push({ key: e.key, reference: r.reference });
  }
  return out;
}

function rowById(rows: readonly Baseline[], ids: readonly string[]): Baseline | undefined {
  return ids.length === 1 ? rows.find((r) => r.id === ids[0]) : undefined;
}

/** A clause's id: `<metric>/<key>`, with the reference when the registry reads more than one for the metric. */
export function clauseId(metric: string, key: string, reference: string | null): string {
  const def = metricById(metric);
  return def !== undefined && def.refs.length > 1 && reference !== null ? `${metric}/${key}@${reference}` : `${metric}/${key}`;
}

/** One report row as a clause. */
function clauseOf(r: ParityRow, key: string, reference: string | null, gating: boolean, rows: readonly Baseline[]): Clause {
  const row = rowById(rows, r.baselineIds);
  const v = row?.values as { p50?: number } | undefined;
  const base = {
    id: clauseId(r.metric, key, reference),
    metric: r.metric,
    key,
    verdict: r.verdict,
    gating,
    ours: r.ours.ks ?? r.ours.p50 ?? null,
    reference: r.band.ksMax !== undefined ? null : (v?.p50 ?? null),
    band: { ...(r.band.lo === undefined ? {} : { lo: r.band.lo }), ...(r.band.hi === undefined ? {} : { hi: r.band.hi }), ...(r.band.ksMax === undefined ? {} : { ksMax: r.band.ksMax }) },
    baselineIds: [...r.baselineIds],
    role: r.role,
  };
  const note = [r.override, r.note].filter((x): x is string => x !== undefined).join('; ');
  return note === '' ? base : { ...base, note };
}

/** Every report row as a clause, gated by the phase's predicate. */
export function clausesOf(report: ParityReport, ours: ParityOurs, rows: readonly Baseline[], gate: GatePredicate): Clause[] {
  const owners = rowOwners(ours);
  if (owners.length !== report.rows.length) throw new Error(`fusion-ng: ${String(report.rows.length)} report rows for ${String(owners.length)} (entry, reference) pairs`);
  return report.rows.map((r, i) => clauseOf(r, owners[i].key, owners[i].reference, gate(r.metric, owners[i].key, owners[i].reference), rows));
}

/** The gating clauses that do not hold. */
export function failingOf(clauses: readonly Clause[]): string[] {
  return clauses.filter((c) => c.gating && !holds(c)).map((c) => c.id);
}

/** The newest provenance date among the rows read: our side's date (the report holds no wall-clock). */
export function rowsDate(rows: readonly Baseline[]): string {
  let d = '';
  for (const r of rows) if (/^\d{4}-\d{2}-\d{2}/.test(r.date) && r.date.slice(0, 10) > d) d = r.date.slice(0, 10);
  return d === '' ? '1970-01-01' : d;
}
