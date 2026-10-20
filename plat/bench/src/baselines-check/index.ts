// bench/src/baselines-check — the thin entry of the design's `plat baselines check <file>` (M0-k-05; §17.1 (4); C-0092,
// C-0113, C-0114, C-0120). The folder was created empty by the scaffold's fourth fix round (M0-s-01, C-0113; C-0059)
// and belongs to M0-k-05.
//
// `corepack pnpm baselines:check -- <file> [--previous <file>]` (= `corepack pnpm bench -- baselines-check <file>`):
// @plat/testkit's check of one crossing file — `baselines.json`, `ng-faces.json` or `denylist.json`, inside plat/ —
// C1 – C7 (C1 and C3 for a deny-list), C8 – C10 named as not run at M0, and its `CrossingRecord` in the `crossings.json`
// beside it; the report written in canonical form to $PLAT_BENCH_OUT/baselines-check.json. Exit 0 pass, 1 fail, 2
// stopped naming the file (missing, or not JSON), 64 usage. The logic is testkit's (C-0113). A report left in
// PLAT_BENCH_OUT by an earlier run is removed before the check runs, so the folder holds this run's report or none
// (hardening round S1, N-h).
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runBaselinesCheck } from '@plat/testkit';
import { outDir, say, writeTruncated } from '../timing/output.js';

/** plat/ (this file is plat/bench/src/baselines-check/index.ts). */
export const PLAT_ROOT = fileURLToPath(new URL('../../../', import.meta.url));

/** The report's file name under PLAT_BENCH_OUT. */
export const CHECK_REPORT_FILE = 'baselines-check.json';

const REPORT_CAP = 16 * 1024 * 1024;

/** The dispatcher's context. */
export interface BaselinesCheckContext {
  out: string;
}

/** The dispatcher's entry: `bench -- baselines-check <file> [--previous <file>]` (C-0059, C-0113). */
export function run(args: string[], ctx: BaselinesCheckContext): number {
  rmSync(join(outDir(ctx.out), CHECK_REPORT_FILE), { force: true }); // an earlier run's report never stands beside this run's exit code (N-h)
  const r = runBaselinesCheck(args, { platRoot: PLAT_ROOT });
  for (const line of r.lines) say(line);
  if (r.text !== undefined) {
    const w = writeTruncated(ctx.out, CHECK_REPORT_FILE, r.text, REPORT_CAP);
    say(`baselines:check: report ${w.path} (${w.bytes} bytes${w.dropped > 0 ? `, ${w.dropped} cut` : ''})`);
  }
  return r.code;
}
