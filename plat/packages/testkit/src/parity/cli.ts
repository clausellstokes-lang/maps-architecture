// The parity CLI (M0-k-05; §13.5, §14's `@plat/testkit` "the parity CLI reading baselines/baselines.json only";
// C-0068, C-0113, C-0180 (9)). At M0 it is `corepack pnpm parity -- --ours <file>` (the design's `plat parity`, M1's
// bin), through the thin entry `bench/src/parity/`: it reads `plat/packages/testkit/baselines/baselines.json` and our
// side's file — both inside plat/, nothing else — and returns the report in canonical form with its exit code:
// 0 every gating row passed, 1 a row failed, 2 stopped naming the file and the row (T-RIG-1; no report), 64 usage.
// A run that reads nothing or judges nothing is a stop, never a pass (§13.8 *Edges*: "empty or missing fails naming it,
// never passes vacuously"; C-0068, C-0099; C-0186, fix round 1, F-1): a baseline file of no row, an our side of no entry
// or of `setting.seeds` 0 (the readers), and a report whose every row reads `missingBaseline` or `notApplicable` — no
// row passed, failed or was reported — stop with exit 2, naming the files, and write no report.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { H128 } from '@plat/kernel';
import { readBaselines } from './baselines.js';
import { canonicalJson } from './canonical.js';
import { readOurs } from './ours.js';
import { insidePlat, resolveInPlat } from './paths.js';
import { parityReport } from './report.js';
import { ParityStop, type ParityReport } from './types.js';

/** `baselines.json`'s one place (§17.1 (4)), relative to plat/. */
export const BASELINES_FILE = 'packages/testkit/baselines/baselines.json';

export const PARITY_USAGE = 'usage: corepack pnpm parity -- --ours <file inside plat/> (our side, a plat.parity-ours/1 object or a summary holding one as parityOurs)';

/** One run's outcome: the exit code, the lines to print, and on 0 or 1 the report and its canonical text. */
export interface ParityRun {
  code: 0 | 1 | 2 | 64;
  lines: string[];
  report?: ParityReport;
  text?: string;
}

/** The stop of a run that judged nothing (C-0186, the fix round's pick). */
export const NOTE_JUDGES_NOTHING = 'every row reads missingBaseline or notApplicable — a run that judges nothing fails, never passes vacuously (§13.8 Edges)';

/**
 * True when a report judged nothing: it has no row, or every row reads `missingBaseline` or `notApplicable` (C-0186). A
 * partial run — some rows judged, others missing — is not such a run; a `reported` row (descriptive, proxy) was read.
 */
export function judgesNothing(report: ParityReport): boolean {
  return report.rows.every((r) => r.verdict === 'missingBaseline' || r.verdict === 'notApplicable');
}

/** The CLI's arguments: exactly `--ours <file>`; anything else is usage. */
export function parityArgs(args: readonly string[]): { ours: string } | { usage: string } {
  if (args.length === 2 && args[0] === '--ours' && args[1] !== '') return { ours: args[1] };
  return { usage: args.length === 0 ? `parity: --ours <file> is required at M0 (B-CITY's run is M1's); ${PARITY_USAGE}` : `parity: unknown arguments ${JSON.stringify(args)}; ${PARITY_USAGE}` };
}

function readIn(platRoot: string, p: string): Uint8Array {
  const abs = resolveInPlat(platRoot, p);
  if (!existsSync(abs)) throw new ParityStop(p, 'missing file (T-RIG-1)');
  return readFileSync(abs);
}

/**
 * Runs the parity CLI over `baselines.json` (its one place, or `baselinesPath` — a test's synthetic file inside plat/)
 * and our side's file. Opens no path outside plat/ and no file but those two.
 */
export function runParity(opts: { platRoot: string; oursPath: string; baselinesPath?: string }): ParityRun {
  const baselinesPath = opts.baselinesPath ?? join(opts.platRoot, BASELINES_FILE);
  for (const p of [baselinesPath, opts.oursPath]) {
    if (!insidePlat(opts.platRoot, p)) return { code: 64, lines: [`parity: ${p} lies outside plat/ (§17.1 (3), C-0067); ${PARITY_USAGE}`] };
  }
  try {
    const bytes = readIn(opts.platRoot, baselinesPath);
    const base = readBaselines(Buffer.from(bytes).toString('utf8'), baselinesPath);
    const ours = readOurs(Buffer.from(readIn(opts.platRoot, opts.oursPath)).toString('utf8'), opts.oursPath);
    const report = parityReport({ rows: base.rows, baselinesHash: H128(bytes), ours, info: base.info });
    const s = report.summary;
    const counts = `${report.rows.length} rows — pass ${s.pass}, fail ${s.fail}, reported ${s.reported}, notApplicable ${report.rows.filter((r) => r.verdict === 'notApplicable').length}, missingBaseline ${report.rows.filter((r) => r.verdict === 'missingBaseline').length}; unread ${report.unread.length}`;
    if (judgesNothing(report)) {
      const stop = new ParityStop(baselinesPath, `judges nothing for ${opts.oursPath}: ${NOTE_JUDGES_NOTHING}`);
      return { code: 2, lines: [`parity stopped: ${stop.message}`, `  ${counts}`] };
    }
    const text = `${canonicalJson(report)}\n`;
    const lines = [`parity: ${counts}`];
    for (const r of report.rows.filter((x) => x.verdict === 'fail').slice(0, 8)) lines.push(`  fail ${r.metric} ${r.baselineIds.join(',')} ${r.note ?? ''}`.trimEnd());
    return { code: s.fail > 0 ? 1 : 0, lines, report, text };
  } catch (e) {
    if (e instanceof ParityStop) return { code: 2, lines: [`parity stopped: ${e.message}`] };
    throw e;
  }
}
