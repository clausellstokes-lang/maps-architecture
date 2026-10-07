// The comparison's verdicts (M0-b-05; §13.5's band rule, the bent-cut signature and blocks rows, the ⟨M-1⟩ rule; §16 M0
// (b)'s clauses; C-0073, C-0081, C-0092, C-0116; the closing check of M0-k-05, N-d: "these bands fall to M0-b-05").
// Our side is measured by M0-k-05's registry (`measureSeeds`: one metric function and one metricVersion with M0-b-04,
// C-0122's rule) and judged by M0-k-05's parity report — row selection, the band rule in its M0 form, `missingBaseline`
// for a non-⟨M-1⟩ cell without a row, `fail` "⟨M-1⟩ row missing" for an ⟨M-1⟩ one, `reported` for a descriptive row,
// `notApplicable` for V12's forms. On that report the harness applies §13.5's row-specific bands (`override`, N-d):
//   cut.sigma      σ within ± 0.02 of the row's value (its p50), plain and ring faces (§16 M0 (b));
//   cut.fillet     the fillet share within ± 0.05 of the row's value (§13.5);
//   cut.cornerMid  the row reported beside ours (C-0081); the clause itself is absolute — ours ≥ 0.80 — and judged
//   cut.arrival85  on ours with no row (C-0073); likewise ours ≥ 0.95;
// and the distributions (block.area, cut.length) keep the band rule's distribution clause (ours ≤ 1.25 × the row's
// spreadKS.p90, C-0092). A row-specific band replaces only a verdict the band rule reached on a target row (pass or
// fail); every other verdict stands. A clause is GATING when the phase's exit bar names it; the run passes only when
// every gating clause reads `pass`, or `reported` on a descriptive row (an ⟨M-1⟩ cell M-1 could not measure, C-0071,
// C-0116) — `fail`, `missingBaseline` and `notApplicable` on a gating clause fail the run, never pass it vacuously
// (§13.8 Edges; the closing check's N-c and N-i).
import type { Hash128 } from '@plat/kernel';
import { measureSeeds, parityReport, type Baseline, type MetricDoc, type OursEntry, type ParityOurs, type ParityReport, type ParityRow, type ParityVerdict } from '@plat/testkit';

/** §16 M0 (b)'s σ band: ± 0.02 of the row. */
export const SIGMA_TOL = 0.02;
/** §13.5's fillet band: ± 0.05 of the row. */
export const FILLET_TOL = 0.05;
/** §16 M0 (b)'s corner clause: within 0.10 of mid-course on at least this share of bent cuts (C-0073). */
export const CORNER_MIN = 0.8;
/** §16 M0 (b)'s arrival clause: ≥ 85° on at least this share of cuts (C-0073). */
export const ARRIVAL_MIN = 0.95;

/** The override notes (N-d). */
export const OVERRIDE_SIGMA = 'σ within ± 0.02 of the row (§13.5 bent-cut row; §16 M0 (b))';
export const OVERRIDE_FILLET = 'fillet share within ± 0.05 of the row (§13.5 bent-cut row)';
export const NOTE_BESIDE = 'the row reported beside ours; the clause is absolute on ours (C-0073, C-0081)';

/** One clause of the comparison: a parity row's verdict after the row-specific bands, or an absolute clause. */
export interface Clause {
  readonly id: string;
  readonly metric: string;
  readonly key: string;
  readonly verdict: ParityVerdict;
  readonly gating: boolean;
  /** Ours (a scalar's median of per-seed values; a distribution's median single-seed KS; an absolute clause's share). */
  readonly ours: number | null;
  /** The reference value the band is around, or the absolute bound. */
  readonly reference: number | null;
  readonly band: { readonly lo?: number; readonly hi?: number; readonly ksMax?: number };
  readonly baselineIds: readonly string[];
  readonly role: string;
  readonly note?: string;
}

/** Our side of a run: per seed, the cuts as σ's rule reads them and the whole doc the other metrics read. */
export interface OursSeeds {
  readonly sigmaDocs: readonly MetricDoc[];
  readonly docs: readonly MetricDoc[];
}

/** The metrics each phase measures: σ under the rule, the corner, arrival and fillet shares, and phase b's distributions. */
export const PHASE_METRICS = Object.freeze({
  a: ['cut.cornerMid', 'cut.arrival85', 'cut.fillet'] as const,
  b: ['cut.cornerMid', 'cut.arrival85', 'cut.fillet', 'cut.length', 'block.area'] as const,
});

/** Our parity side (`ParityOurs`) from the per-seed docs (M0-k-05's measureSeeds). */
export function oursOf(phase: 'a' | 'b', seeds: OursSeeds, meta: { date: string; seedFamily: string }): ParityOurs {
  const entries: OursEntry[] = [...measureSeeds(seeds.sigmaDocs, ['cut.sigma']), ...measureSeeds(seeds.docs, [...PHASE_METRICS[phase]])];
  return {
    schema: 'plat.parity-ours/1',
    date: meta.date,
    outputVersion: 'M0',
    generatorVersion: 'bentcut-ng',
    rung: 'CITY',
    preset: 'default',
    setting: { population: 0, water: 'none', seedFamily: meta.seedFamily, seeds: seeds.docs.length },
    entries,
  };
}

function rowById(rows: readonly Baseline[], ids: readonly string[]): Baseline | undefined {
  return ids.length === 1 ? rows.find((r) => r.id === ids[0]) : undefined;
}

/** The ± band of a scalar target row (σ, the fillet share): pass inside [p50 − tol, p50 + tol]. */
function tolBand(r: ParityRow, row: Baseline | undefined, tol: number, note: string): ParityRow {
  if (r.verdict !== 'pass' && r.verdict !== 'fail') return r;
  const v = row?.values as { p50?: number } | undefined;
  const ref = v?.p50;
  if (ref === undefined || r.ours.p50 === undefined) return { ...r, verdict: 'fail', override: note, note: 'the row carries no p50 for the ± band (fail-safe)' };
  const lo = ref - tol;
  const hi = ref + tol;
  const inside = r.ours.p50 >= lo - 1e-12 && r.ours.p50 <= hi + 1e-12;
  return { ...r, verdict: inside ? 'pass' : 'fail', band: { lo, hi }, override: note };
}

/** The parity report with §13.5's row-specific bands applied (N-d). */
export function withOverrides(report: ParityReport, rows: readonly Baseline[]): ParityReport {
  const out: ParityRow[] = report.rows.map((r) => {
    const row = rowById(rows, r.baselineIds);
    if (r.metric === 'cut.sigma') return tolBand(r, row, SIGMA_TOL, OVERRIDE_SIGMA);
    if (r.metric === 'cut.fillet') return tolBand(r, row, FILLET_TOL, OVERRIDE_FILLET);
    if ((r.metric === 'cut.cornerMid' || r.metric === 'cut.arrival85') && (r.verdict === 'pass' || r.verdict === 'fail')) return { ...r, verdict: 'reported', note: NOTE_BESIDE };
    return r;
  });
  const summary = { pass: 0, fail: 0, reported: 0 };
  for (const r of out) if (r.verdict === 'pass' || r.verdict === 'fail' || r.verdict === 'reported') summary[r.verdict] += 1;
  return { ...report, rows: out, summary };
}

/** The parity report of a run, its row-specific bands applied. */
export function judgedReport(rows: readonly Baseline[], baselinesHash: Hash128, ours: ParityOurs, info: readonly string[]): ParityReport {
  return withOverrides(parityReport({ rows, baselinesHash, ours, info }), rows);
}

/** A clause from a report row. */
function clauseOf(r: ParityRow, key: string, gating: boolean, rows: readonly Baseline[]): Clause {
  const row = rowById(rows, r.baselineIds);
  const v = row?.values as { p50?: number } | undefined;
  const ours = r.ours.ks ?? r.ours.p50 ?? null;
  const base = {
    id: `${r.metric}/${key}`,
    metric: r.metric,
    key,
    verdict: r.verdict,
    gating,
    ours,
    reference: r.band.ksMax !== undefined ? null : (v?.p50 ?? null),
    band: { ...(r.band.lo === undefined ? {} : { lo: r.band.lo }), ...(r.band.hi === undefined ? {} : { hi: r.band.hi }), ...(r.band.ksMax === undefined ? {} : { ksMax: r.band.ksMax }) },
    baselineIds: [...r.baselineIds],
    role: r.role,
  };
  const note = [r.override, r.note].filter((x): x is string => x !== undefined).join('; ');
  return note === '' ? base : { ...base, note };
}

/**
 * The clauses of every report row; `gate(metric, key)` says which the phase's exit bar names. The report keeps our
 * entries' order with one row per reference the registry reads (M0-k-05's rowsFor), and every metric measured here is
 * read for NG alone, so row i is entry i's.
 */
export function reportClauses(report: ParityReport, ours: ParityOurs, rows: readonly Baseline[], gate: (metric: string, key: string) => boolean): Clause[] {
  if (report.rows.length !== ours.entries.length) throw new Error(`bentcut-ng: ${String(report.rows.length)} report rows for ${String(ours.entries.length)} entries (one NG row per entry expected)`);
  return report.rows.map((r, i) => clauseOf(r, ours.entries[i].key, gate(r.metric, ours.entries[i].key), rows));
}

/** An absolute clause on ours (C-0073): pass when the share is at least the bound; notApplicable on no cut. */
export function absoluteClause(id: string, metric: string, share: number | null, n: number, bound: number, beside: Clause | undefined): Clause {
  const ok = share !== null && n > 0;
  const besideNote = beside === undefined ? 'no row read beside ours' : `the row beside: ${beside.reference === null ? beside.verdict : String(beside.reference)}`;
  return {
    id,
    metric,
    key: 'all',
    verdict: ok ? (share >= bound ? 'pass' : 'fail') : 'notApplicable',
    gating: true,
    ours: share,
    reference: bound,
    band: { lo: bound },
    baselineIds: beside === undefined ? [] : [...beside.baselineIds],
    role: 'target',
    note: ok ? `absolute on ours over ${String(n)} cuts (C-0073, C-0081); ${besideNote}` : 'ours: no cut to measure (fails the gate, never passes vacuously)',
  };
}

/** Does a gating clause hold: pass, or reported on a descriptive row (C-0071, C-0116)? */
export function holds(c: Clause): boolean {
  return c.verdict === 'pass' || (c.verdict === 'reported' && c.role === 'descriptive');
}
