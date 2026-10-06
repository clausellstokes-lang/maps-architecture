// bench/src/scan — the thin entry of the clean-room content scan (M0-k-06; §17.1 (5), §13.8; C-0101, C-0113, C-0114).
// The folder was created empty by the scaffold's fourth fix round (M0-s-01, C-0113; C-0059) and belongs to M0-k-06.
//
// `corepack pnpm scan` (= `corepack pnpm bench -- scan`): @plat/testkit's scanner over the plat/ this file lies in
// (resolved from its own place, never an absolute path — a scratch copy scans itself, N-23) with
// packages/testkit/baselines/denylist.json and denylist-allow.json; the report (counts, each hit's file, line and check,
// never the matched content) to $PLAT_BENCH_OUT/scan-report.json. Exit 0 no unreviewed hit, 1 an unreviewed hit, 2
// stopped naming the file (a missing file, a normalisationVersion that is not 1 naming both, a digestHexDigits that is
// not 16, a malformed allow entry; no report written), 64 usage. The PR tier's `deny-list scan` job names this folder
// with denylist.json as its declared input and M0-k-07 as its reviewer, so its status reads `after-M-1: denylist.json`
// until M-1's list crosses and M0-k-07's summary names its sha256 (C-0099, C-0121). The logic is testkit's (C-0113).
import { fileURLToPath } from 'node:url';
import { runScan, scanArgs } from '@plat/testkit';
import { say, writeTruncated } from '../timing/output.js';

/** plat/ (this file is plat/bench/src/scan/index.ts). */
export const PLAT_ROOT = fileURLToPath(new URL('../../../', import.meta.url));

/** The report's file name under PLAT_BENCH_OUT. */
export const SCAN_REPORT_FILE = 'scan-report.json';

/** A report is never cut (a cut report would hide hits): a larger one stops the run instead (64 MiB). */
const REPORT_CAP = 64 * 1024 * 1024;

/** The dispatcher's context; `root`, `list` and `allow` let a test point the scan at a synthetic tree and list. */
export interface ScanContext {
  out: string;
  root?: string;
  list?: string;
  allow?: string;
}

/** The dispatcher's entry: `bench -- scan` (C-0059, C-0113). */
export function run(args: string[], ctx: ScanContext): number {
  const a = scanArgs(args);
  if ('usage' in a) {
    say(a.usage);
    return 64;
  }
  const r = runScan({
    platRoot: ctx.root ?? PLAT_ROOT,
    ...(ctx.list === undefined ? {} : { listPath: ctx.list }),
    ...(ctx.allow === undefined ? {} : { allowPath: ctx.allow }),
  });
  for (const line of r.lines) say(line);
  if (r.text !== undefined) {
    if (Buffer.byteLength(r.text, 'utf8') > REPORT_CAP) {
      say(`scan stopped: the report exceeds ${REPORT_CAP} bytes; nothing written`);
      return 2;
    }
    const w = writeTruncated(ctx.out, SCAN_REPORT_FILE, r.text, REPORT_CAP);
    say(`scan: report ${w.path} (${w.bytes} bytes)`);
  }
  return r.code;
}
