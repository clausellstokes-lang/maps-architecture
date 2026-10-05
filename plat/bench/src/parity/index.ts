// bench/src/parity — the thin entry of the design's `plat parity` (M0-k-05; §13.5; C-0068, C-0113, C-0114). The folder
// was created empty by the scaffold's fourth fix round (M0-s-01, C-0113; C-0059) and belongs to M0-k-05.
//
// `corepack pnpm parity -- --ours <file>` (= `corepack pnpm bench -- parity --ours <file>`): @plat/testkit's parity CLI
// over `plat/packages/testkit/baselines/baselines.json` and our side's file (both inside plat/; nothing else opened),
// the report written in canonical form to $PLAT_BENCH_OUT/parity-report.json. Exit 0 every gating row passed, 1 a row
// failed, 2 stopped naming the file and the row (a missing file, an unreadable row, a row lacking referenceBuild,
// capture, script or date — T-RIG-1; a baseline file of no row, an our side of no entry or of no seed, a run whose
// every row reads missingBaseline or notApplicable — §13.8 Edges, C-0186; no report written), 64 usage. The logic is
// testkit's (C-0113).
import { fileURLToPath } from 'node:url';
import { parityArgs, runParity } from '@plat/testkit';
import { say, writeTruncated } from '../timing/output.js';

/** plat/ (this file is plat/bench/src/parity/index.ts). */
export const PLAT_ROOT = fileURLToPath(new URL('../../../', import.meta.url));

/** The report's file name under PLAT_BENCH_OUT. */
export const PARITY_REPORT_FILE = 'parity-report.json';

/** A report is never cut: a cut report is not canonical, so a larger one stops the run instead (16 MiB). */
const REPORT_CAP = 16 * 1024 * 1024;

/** The dispatcher's context; `baselines` lets a test point the CLI at a synthetic file inside plat/. */
export interface ParityContext {
  out: string;
  baselines?: string;
}

/** The dispatcher's entry: `bench -- parity --ours <file>` (C-0059, C-0113). */
export function run(args: string[], ctx: ParityContext): number {
  const a = parityArgs(args);
  if ('usage' in a) {
    say(a.usage);
    return 64;
  }
  const r = runParity({ platRoot: PLAT_ROOT, oursPath: a.ours, ...(ctx.baselines === undefined ? {} : { baselinesPath: ctx.baselines }) });
  for (const line of r.lines) say(line);
  if (r.text !== undefined) {
    if (Buffer.byteLength(r.text, 'utf8') > REPORT_CAP) {
      say(`parity stopped: the report exceeds ${REPORT_CAP} bytes; nothing written`);
      return 2;
    }
    const w = writeTruncated(ctx.out, PARITY_REPORT_FILE, r.text, REPORT_CAP);
    say(`parity: report ${w.path} (${w.bytes} bytes)`);
  }
  return r.code;
}
