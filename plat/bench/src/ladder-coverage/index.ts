// bench/src/ladder-coverage — the stage ladder-coverage check as a bench entry (M0-x-05; §13.1 *Ladder coverage*, §16 M0
// (a); C-0067, C-0085, C-0095, C-0109, C-0269). The folder was created empty by the scaffold's second fix round (M0-s-01,
// C-0095) and belongs to M0-x-05.
//
// `corepack pnpm bench -- ladder-coverage [--plain SEED | --no-plain] [--kernel-draws N] [--no-summary]` runs
// `stageLadderCoverage()` — M0-k-04's kernel ladders merged unchanged with every stage rung's fixture and the plain
// controls (C-0109) — and, unless `--no-plain`, the plain flat fixture's baseline at SEED (default 1; a CITY run of about
// three minutes); writes the full report to $PLAT_BENCH_OUT/ladder-coverage/report.json and — for a whole run (the plain
// baseline included, the kernel at its own draws) — the numbers-only summary to docs/build/summaries/M0-x-05.json
// (C-0067); prints one line per built rung (its fixture's count, the controls', the plain fixture's); exits 0 when every
// rung is covered (each built rung reached by its fixture and left nowhere on the controls, every §5.2 ladder named,
// the kernel ladders covered), 1 when not, 64 on a bad argument.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stageCoverageSummary, stageLadderCoverage, type StageCoverageOptions, type StageCoverageReport } from '@plat/testkit';
import { outDir, say, writeJson } from '../timing/output.js';

/** plat/ (this file is bench/src/ladder-coverage/index.ts). */
export const PLAT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

/** The numbers-only summary (C-0067). */
export const SUMMARY_PATH = join(PLAT_ROOT, 'docs', 'build', 'summaries', 'M0-x-05.json');

const USAGE = 'usage: corepack pnpm bench -- ladder-coverage [--plain SEED | --no-plain] [--kernel-draws N] [--no-summary]';

/** The dispatcher's context, with the summary path and the coverage run a test may redirect. */
export interface LadderCoverageContext {
  out: string;
  summary?: string;
  /** Replaces `stageLadderCoverage` (the entry's own tests run it on a fixture registry). */
  coverage?: (opts: StageCoverageOptions) => StageCoverageReport;
}

interface Args {
  plain: number | null;
  kernelDraws: number | undefined;
  summary: boolean;
}

function parse(args: readonly string[]): Args | string {
  const a: Args = { plain: 1, kernelDraws: undefined, summary: true };
  for (let i = 0; i < args.length; i += 1) {
    const x = args[i];
    const num = (): number | null => {
      const v = args[i + 1];
      i += 1;
      if (v === undefined || !/^[0-9]+$/.test(v)) return null;
      return Number(v);
    };
    if (x === '--plain') {
      const n = num();
      if (n === null) return `--plain takes a seed (a whole number)`;
      a.plain = n;
    } else if (x === '--no-plain') a.plain = null;
    else if (x === '--kernel-draws') {
      const n = num();
      if (n === null || n < 1) return `--kernel-draws takes a whole number ≥ 1`;
      a.kernelDraws = n;
    } else if (x === '--no-summary') a.summary = false;
    else return `unknown argument ${JSON.stringify(x)}`;
  }
  return a;
}

/** The entry (see the header). */
export function run(args: string[], ctx: LadderCoverageContext): number {
  const a = parse(args);
  if (typeof a === 'string') {
    process.stderr.write(`ladder-coverage: ${a}\n${USAGE}\n`);
    return 64;
  }
  const coverage = ctx.coverage ?? stageLadderCoverage;
  const report = coverage({ ...(a.plain === null ? {} : { plain: a.plain }), ...(a.kernelDraws === undefined ? {} : { kernelDraws: a.kernelDraws }) });
  const dir = join(outDir(ctx.out), 'ladder-coverage');
  writeJson(dir, 'report.json', report);
  for (const r of report.stage) {
    if (r.status !== 'built') continue;
    const p = report.plain?.leaves[r.leaf];
    say(`${r.leaf}: fixture ${r.exercised === null ? 'not run' : String(r.exercised.fixture)}, controls ${r.exercised === null ? '-' : String(r.exercised.control)}${p === undefined ? '' : `, plain ${String(p)}`} (${r.fixture})`);
  }
  const deferred = report.stage.filter((r) => r.status !== 'built').length;
  say(`ladders ${String(report.ladders.length)}; kernel rows ${String(report.kernel.rows.length)} covered ${String(report.kernel.covered)}; stage rows ${String(report.stage.length)} (${String(deferred)} deferred); table problems ${String(report.tableProblems.length)}; covered ${String(report.covered)}`);
  const whole = a.plain !== null && a.kernelDraws === undefined;
  if (a.summary && whole) {
    const path = ctx.summary ?? SUMMARY_PATH;
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify(stageCoverageSummary(report), null, 2)}\n`);
  }
  return report.covered ? 0 : 1;
}
