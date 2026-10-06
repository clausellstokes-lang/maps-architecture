// The counts report of a B-FUZZ run (M0-k-04; §13.1's bar; §5.4 `GenerationReport.kernel` — warnings per code,
// downgrades, work-limit hits — and `bugs`; C-0067's numbers-only summary; C-0091's work quantiles per counter): the
// primitives' reports, the constructive set's run and the kernel ladders' coverage folded into one report, and its
// summary — numbers and ids only, no timing, no clock, so a re-run at the same size writes the same bytes.
import type { KernelConstructiveReport } from './constructive.js';
import type { ConstructiveRun, CountsReport, CoverageReport, FuzzReport } from './types.js';

/** A constructive iteration's report as the counts report carries it. */
export function constructiveRun(r: KernelConstructiveReport): ConstructiveRun {
  return {
    cases: r.cases,
    judged: r.judged,
    draws: r.draws,
    green: r.green,
    failedCases: r.failedCases,
    pending: [...r.pending],
    deferred: { ...r.deferred },
    failures: r.failures.map((f) => ({ id: f.id, seed: f.seed, reason: f.reason })),
    known: r.known.map((k) => ({ ...k })),
    staleKnown: [...r.staleKnown],
  };
}

/**
 * The bar's first promise over the primitives' runs (§13.1: 0 crashes, 0 hangs (hard timeout), 0 invalid outputs; §5.1
 * (8): `bugs` empty) — one decision for the whole run's `countsReport` and the bench's one-primitive runs (C-0240 (4)).
 */
export function fuzzCountsPass(totals: { readonly crashes: number; readonly hangs: number; readonly invalid: number }, bugs: readonly unknown[]): boolean {
  return totals.crashes === 0 && totals.hangs === 0 && totals.invalid === 0 && bugs.length === 0;
}

/** Folds the parts into the counts report and decides the bar (§13.1; §16 M0 (a)). */
export function countsReport(runsPerPrimitive: number, primitives: readonly FuzzReport[], constructive: ConstructiveRun, ladders: CoverageReport): CountsReport {
  const warnings = new Map<string, number>();
  let crashes = 0;
  let hangs = 0;
  let invalid = 0;
  let downgrades = 0;
  let workLimitHits = 0;
  for (const p of primitives) {
    crashes += p.crashes;
    hangs += p.hangs;
    invalid += p.invalid;
    downgrades += p.downgrades;
    workLimitHits += p.workLimitHits;
    for (const k of Object.keys(p.warnings)) warnings.set(k, (warnings.get(k) ?? 0) + p.warnings[k]);
  }
  const w: Record<string, number> = {};
  for (const k of [...warnings.keys()].sort()) w[k] = warnings.get(k) as number;
  const bugs = primitives.flatMap((p) => p.bugs);
  const pass = fuzzCountsPass({ crashes, hangs, invalid }, bugs) && constructive.failedCases === 0 && constructive.staleKnown.length === 0 && constructive.pending.length === 0 && constructive.judged > 0 && ladders.covered;
  return { runsPerPrimitive, primitives: [...primitives], totals: { crashes, hangs, invalid, warnings: w, downgrades, workLimitHits }, constructive, ladders, bugs, pass };
}

/**
 * The numbers-only summary (C-0067, C-0091): per primitive its counts and, per counter it charged, the work-per-unit
 * quantiles and unit count; the constructive set's counts with its deferred cases by milestone and the failing case ids;
 * the ladder table's rows as reached / draws; `bugs` as a count. No timing and no clock.
 */
export function countsSummary(r: CountsReport): Record<string, unknown> {
  const primitives: Record<string, unknown> = {};
  for (const p of r.primitives) {
    const work: Record<string, unknown> = {};
    for (const q of p.work) work[q.counter] = { unit: q.unit, n: q.n, p50: q.p50, p99: q.p99, p999: q.p999, max: q.max, units: q.units };
    primitives[p.primitive] = {
      runs: p.runs,
      crashes: p.crashes,
      hangs: p.hangs,
      invalid: p.invalid,
      ok: p.ok,
      skipped: p.skipped,
      refused: p.refused,
      warnings: p.warnings,
      notes: p.notes,
      downgrades: p.downgrades,
      workLimitHits: p.workLimitHits,
      oracle: p.oracle,
      sampled: p.sampled,
      bugs: p.bugs.length,
      work,
    };
  }
  const c = r.constructive;
  return {
    item: 'M0-k-04',
    bar: 'B-FUZZ (§13.1; §16 M0 (a))',
    runsPerPrimitive: r.runsPerPrimitive,
    pass: r.pass,
    totals: { ...r.totals, bugs: r.bugs.length },
    primitives,
    constructive: {
      cases: c.cases,
      judged: c.judged,
      draws: c.draws,
      green: c.green,
      failedCases: c.failedCases,
      failing: [...new Set(c.failures.map((f) => f.id))].sort(),
      pending: c.pending.length,
      known: c.known.map((k) => k.id),
      staleKnown: c.staleKnown,
      deferred: c.deferred,
    },
    ladders: {
      covered: r.ladders.covered,
      rows: r.ladders.rows.map((row) => ({ failureClass: row.failureClass, code: row.code, fixture: row.fixture.split(' ')[0], status: row.status, reached: row.exercised === null ? null : row.exercised.reached, draws: row.exercised === null ? null : row.exercised.draws })),
      degenerate: r.ladders.degenerate.length,
    },
  };
}
