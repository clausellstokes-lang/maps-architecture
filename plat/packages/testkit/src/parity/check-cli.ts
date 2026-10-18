// The `plat baselines check <file>` command (M0-k-05; §17.1 (4); C-0092, C-0113, C-0120): at M0 `corepack pnpm
// baselines:check -- <file> [--previous <file>]` through the thin entry `bench/src/baselines-check/`. It reads the file,
// the `crossings.json` beside it (the crossing records live beside the crossing files, `packages/testkit/baselines/`)
// and, when given, the previous version for C4 — every path inside plat/, nothing else opened — and returns the report
// with its exit code: 0 every check and the record pass, 1 a check or the record fails, 2 stopped naming the file
// (missing, or not JSON), 64 usage.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { canonicalJson } from './canonical.js';
import { baselinesCheck, kindOfFile, type BaselinesCheckReport } from './check.js';
import { insidePlat, platRelative, resolveInPlat } from './paths.js';

export const BASELINES_CHECK_USAGE =
  'usage: corepack pnpm baselines:check -- <file> [--previous <file>] (a file inside plat/ named baselines.json, ng-faces.json or denylist.json)';

/** One run's outcome: the exit code, the lines to print, and on 0 or 1 the report and its canonical text. */
export interface BaselinesCheckRun {
  code: 0 | 1 | 2 | 64;
  lines: string[];
  report?: BaselinesCheckReport;
  text?: string;
}

/** Marks a `crossings.json` that is not JSON, so the record check names it (it is then not an array). */
const NOT_JSON = Symbol('not JSON');

/** Runs the check (C-0092 (2), (3)); `platRoot` is plat/'s folder, every path resolved against it. */
export function runBaselinesCheck(args: readonly string[], opts: { platRoot: string }): BaselinesCheckRun {
  let file: string | undefined;
  let previous: string | undefined;
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === '--previous' && previous === undefined && i + 1 < args.length && args[i + 1] !== '') {
      previous = args[i + 1];
      i += 1;
    } else if (!a.startsWith('--') && file === undefined && a !== '') file = a;
    else return { code: 64, lines: [`baselines:check: unknown argument ${JSON.stringify(a)}; ${BASELINES_CHECK_USAGE}`] };
  }
  if (file === undefined) return { code: 64, lines: [`baselines:check: no file; ${BASELINES_CHECK_USAGE}`] };
  const kind = kindOfFile(file);
  if (kind === null) return { code: 64, lines: [`baselines:check: ${file} is not baselines.json, ng-faces.json or denylist.json; ${BASELINES_CHECK_USAGE}`] };
  for (const p of previous === undefined ? [file] : [file, previous]) {
    if (!insidePlat(opts.platRoot, p)) return { code: 64, lines: [`baselines:check: ${p} lies outside plat/ (§17.1 (3), C-0067); ${BASELINES_CHECK_USAGE}`] };
  }
  const rel = platRelative(opts.platRoot, file);
  const read = (p: string, label: string): { bytes: Uint8Array; value: unknown } | string => {
    const abs = resolveInPlat(opts.platRoot, p);
    if (!existsSync(abs)) return `baselines:check stopped: ${label}: missing file`;
    const bytes = readFileSync(abs);
    try {
      return { bytes, value: JSON.parse(Buffer.from(bytes).toString('utf8')) as unknown };
    } catch (e) {
      return `baselines:check stopped: ${label}: not JSON (${(e as Error).message.slice(0, 120)})`;
    }
  };
  const main = read(file, rel);
  if (typeof main === 'string') return { code: 2, lines: [main] };
  let prev: { bytes: Uint8Array; value: unknown } | undefined;
  if (previous !== undefined) {
    const p = read(previous, platRelative(opts.platRoot, previous));
    if (typeof p === 'string') return { code: 2, lines: [p] };
    prev = p;
  }
  const crossingsAbs = join(dirname(resolveInPlat(opts.platRoot, file)), 'crossings.json');
  let crossings: unknown = null;
  if (existsSync(crossingsAbs)) {
    try {
      crossings = JSON.parse(readFileSync(crossingsAbs, 'utf8')) as unknown;
    } catch {
      crossings = NOT_JSON;
    }
  }
  const report = baselinesCheck({ file: rel, kind, bytes: main.bytes, value: main.value, crossings, ...(prev === undefined ? {} : { previous: prev }) });
  const lines = [`baselines:check ${rel} (${kind}, ${report.rows} rows, sha256 ${report.sha256.slice(0, 12)}…): ${report.pass ? 'pass' : 'fail'}`];
  for (const c of report.checks) {
    lines.push(`  ${c.id} ${c.status}${c.note !== undefined && c.status !== 'pass' ? ` — ${c.note}` : ''}${c.problems.length > 0 ? `: ${c.problems.slice(0, 3).join('; ')}${c.problems.length > 3 ? `; … ${c.problems.length - 3} more` : ''}` : ''}`);
  }
  lines.push(`  record ${report.record.status}${report.record.problems.length > 0 ? `: ${report.record.problems.slice(0, 3).join('; ')}` : ''}`);
  return { code: report.pass ? 0 : 1, lines, report, text: `${canonicalJson(report)}\n` };
}
