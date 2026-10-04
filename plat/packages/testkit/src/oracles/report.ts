// The comparison harness's report (M0-k-03; §3.7, §13.1): per operation, the cases drawn, how many fell on each side
// of the split, the passes on each side, both shares and the unattracted draw count — the count §13.1's vacuity guard
// reads ("drawing ≥ 10⁵ unattracted cases per operation"). Numbers only; it writes no file (C-0144 (9)).
// §3.7 compares our result with EACH oracle, and §13.1 counts CASES: one `record` call is one case and carries the
// case's verdict against every oracle — one `compareSplit` verdict per engine of `ORACLE_ENGINES`, each exactly once,
// all on the case's split — so a case counts one draw whatever the number of oracles, and a case judged against one
// oracle only, or recorded twice, is refused rather than counted (C-0148 (1), superseding C-0144 (9)'s per-verdict
// count). A refused verdict (an oracle library that could not answer, C-0150) judges nothing: it is counted under its
// engine in `refusals`, the case is judged by its other verdicts, and a case every oracle refused is counted
// `unjudged` — neither a draw nor a pass nor a failure — so a refusal neither fails our engine nor hides the case.
import { ORACLE_ENGINES, type OracleEngine, type Verdict } from './types.js';

/** §13.1: at least this many unattracted cases per operation keep the strict comparison from being vacuous. */
export const UNATTRACTED_DRAW_MIN = 100_000;

/** One operation's line of the report. */
export interface OracleReportLine {
  /** Cases judged (one per `record` call with at least one verdict not refused, C-0150). */
  draws: number;
  unattracted: number;
  attracted: number;
  /** Cases that passed against every oracle, per side. */
  unattractedPass: number;
  attractedPass: number;
  /** unattracted ÷ draws (0 when nothing was drawn). */
  unattractedShare: number;
  /** attracted ÷ draws (0 when nothing was drawn). */
  attractedShare: number;
  /**
   * Failing cases per first failure reason (`faces`, `area`, `cross-check`, `oracle`, `ours`, `invalid`) — the first
   * reason of the first failing verdict, refused verdicts set aside, in `ORACLE_ENGINES` order.
   */
  failures: Record<string, number>;
  /** Refused verdicts per engine (an oracle library that could not answer the case; C-0150). */
  refusals: Record<string, number>;
  /** Cases every oracle refused: recorded, never drawn, passed or failed (C-0150). */
  unjudged: number;
}

function emptyLine(): OracleReportLine {
  return {
    draws: 0,
    unattracted: 0,
    attracted: 0,
    unattractedPass: 0,
    attractedPass: 0,
    unattractedShare: 0,
    attractedShare: 0,
    failures: {},
    refusals: {},
    unjudged: 0,
  };
}

/**
 * A case's verdicts in `ORACLE_ENGINES` order, or why they are not one case: every engine exactly once, one split.
 * A refusal is a harness usage error (like a Clipper2 call before `loadOracles()`), never a geometric result.
 */
function caseVerdicts(verdicts: readonly Verdict[]): Verdict[] | string {
  if (!Array.isArray(verdicts)) return 'a case is recorded as an array of verdicts';
  const byEngine = new Map<OracleEngine, Verdict>();
  for (const v of verdicts) {
    if (!ORACLE_ENGINES.includes(v.engine)) return `unknown oracle ${String(v.engine)}`;
    if (byEngine.has(v.engine)) return `two verdicts against ${v.engine}`;
    byEngine.set(v.engine, v);
  }
  const ordered: Verdict[] = [];
  for (const e of ORACLE_ENGINES) {
    const v = byEngine.get(e);
    if (v === undefined) return `no verdict against ${e}`;
    ordered.push(v);
  }
  const split = ordered[0].split;
  if (ordered.some((v) => v.split !== split)) return 'the verdicts disagree on the split (one case has one warning list)';
  return ordered;
}

/**
 * The harness's report: `record` every case under its operation (`union`, `buffer`, `tileRings`, …) with its verdict
 * against each oracle.
 */
export class OracleReport {
  readonly #lines = new Map<string, OracleReportLine>();

  /**
   * Adds one case: its verdicts against each oracle — one per engine of `ORACLE_ENGINES`, each exactly once, sharing
   * the split. A refused verdict is counted under its engine and set aside (C-0150); the case counts one draw and
   * passes only when every verdict left passes; when none is left the case is counted `unjudged`, not drawn. Throws
   * (`oracles: …`) on any other shape: a single verdict, a repeated or missing engine, or verdicts on different splits
   * (C-0148 (1)).
   */
  record(op: string, verdicts: readonly Verdict[]): void {
    const ordered = caseVerdicts(verdicts);
    if (typeof ordered === 'string') {
      throw new Error(`oracles: OracleReport.record takes one case — its verdict against each oracle (${ORACLE_ENGINES.join(', ')}): ${ordered}`);
    }
    let line = this.#lines.get(op);
    if (line === undefined) {
      line = emptyLine();
      this.#lines.set(op, line);
    }
    for (const v of ordered) if (v.refused) line.refusals[v.engine] = (line.refusals[v.engine] ?? 0) + 1;
    const judged = ordered.filter((v) => !v.refused);
    if (judged.length === 0) {
      line.unjudged += 1;
      return;
    }
    const pass = judged.every((v) => v.pass);
    line.draws += 1;
    if (judged[0].split === 'unattracted') {
      line.unattracted += 1;
      if (pass) line.unattractedPass += 1;
    } else {
      line.attracted += 1;
      if (pass) line.attractedPass += 1;
    }
    line.unattractedShare = line.unattracted / line.draws;
    line.attractedShare = line.attracted / line.draws;
    if (!pass) {
      const failing = judged.find((v) => !v.pass);
      const first = failing?.failures[0] ?? 'unknown';
      const reason = first.split(':')[0];
      line.failures[reason] = (line.failures[reason] ?? 0) + 1;
    }
  }

  /** The operations recorded, sorted by name. */
  ops(): string[] {
    return [...this.#lines.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  /** One operation's line (an empty line for an operation never recorded). */
  line(op: string): OracleReportLine {
    const l = this.#lines.get(op);
    return l === undefined ? emptyLine() : { ...l, failures: { ...l.failures }, refusals: { ...l.refusals } };
  }

  /** The unattracted draw count of an operation: its unattracted cases judged (an unjudged case is not drawn). */
  unattractedDraws(op: string): number {
    return this.#lines.get(op)?.unattracted ?? 0;
  }

  /** Whether an operation drew at least `min` unattracted cases (§13.1's guard: 10⁵ by default). */
  meetsDrawCount(op: string, min: number = UNATTRACTED_DRAW_MIN): boolean {
    return this.unattractedDraws(op) >= min;
  }

  /** Whether every judged case passed (an unjudged case neither passes nor fails; read `unjudged` for it). */
  allPass(): boolean {
    for (const l of this.#lines.values()) {
      if (l.unattractedPass + l.attractedPass !== l.draws) return false;
    }
    return true;
  }

  /** The numbers-only report: per operation its line, and the draw count the guard asks for. */
  toJSON(): { unattractedDrawMin: number; ops: Record<string, OracleReportLine> } {
    const ops: Record<string, OracleReportLine> = {};
    for (const op of this.ops()) ops[op] = this.line(op);
    return { unattractedDrawMin: UNATTRACTED_DRAW_MIN, ops };
  }
}
