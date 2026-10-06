// bench/src/tiers — the tier runner (M0-f-02a; §13.8, §12.1, §16 M0 (f); C-0027, C-0069, C-0075, C-0088, C-0097,
// C-0099, C-0105, C-0113, C-0121, C-0241). The folder was created empty by the scaffold (M0-s-01, C-0013) and belongs
// to M0-f-02a; the job lists are bench/src/tier-jobs/ (handed over to M0-f-02b).
//
//   corepack pnpm tier:pr | tier:nightly | tier:milestone [-- --mode plain|whole|batched] [--fallback] [--list]
//
// runs every built job of the tier (plain mode: once, wall-clock and CPU time per job; whole and batched: §12.1's
// readings, C-0097 — the modes M0-t-00's timing-phase script invokes), lists a pending job (after-M-1) with its file
// and a not-built job with its item, prints the verdict and writes the TierReport to $PLAT_BENCH_OUT/tiers/<tier>.json
// (each unit's output tail to $PLAT_BENCH_OUT/tiers/<tier>/logs/). `--list` derives and prints the statuses only.
// `--fallback` applies §13.8's pre-decided fallback (fuzz 5 × 10³, seeds 25, the constructive set never cut). Exit 0
// when the tier passes (or its budget is unjudged or not gating), 1 when a built job fails or a gating budget is over,
// 64 on a bad argument. A tier run outside the timing phase is CONTENDED: its figures are reported, never gating.
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { manifest } from '../tier-jobs/index.js';
import { outDir, say, summariseReasons, writeJson } from '../timing/output.js';
import { runTier } from './runner.js';
import { deriveStatus } from './status.js';
import type { TierMode, TierName } from './types.js';

export { CLEARED_ENV, OUTPUT_TAIL_BYTES, parseTimes, spawnExecutor, unitEnv } from './exec.js';
export { FALLBACK_SIZES, OVER_BUDGET_TOLERANCE, PROJECTION_CORES, applyFallback, judgeBudget, logName, manifestProblems, nestedTierCall, runTier } from './runner.js';
export type { RunTierOptions } from './runner.js';
export { deriveStatus, holdsTest, importProbe, insideRoot, reviewPending, sha256File, suiteProblem } from './status.js';
export type { HarnessProbe } from './status.js';
export type * from './types.js';

/** plat/ (this file is bench/src/tiers/index.ts). */
export const PLAT_ROOT = fileURLToPath(new URL('../../../', import.meta.url));

const USAGE = 'usage: corepack pnpm tier:pr | tier:nightly | tier:milestone [-- --mode plain|whole|batched] [--fallback] [--list]';
const TIERS: readonly TierName[] = ['pr', 'nightly', 'milestone'];
const MODES: readonly TierMode[] = ['plain', 'whole', 'batched'];

const s = (ms: number): string => `${(ms / 1000).toFixed(1)} s`;

/** The dispatcher's entry: `bench -- tier:<tier> [--mode M] [--fallback] [--list]` (the tier is the entry's own argument). */
export async function run(args: string[], ctx: { out: string }): Promise<number> {
  const [tier, ...rest] = args;
  if (!TIERS.includes(tier as TierName)) {
    say(`tiers: unknown tier ${JSON.stringify(tier)}; ${USAGE}`);
    return 64;
  }
  let mode: TierMode = 'plain';
  let fallback = false;
  let list = false;
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === '--fallback') fallback = true;
    else if (a === '--list') list = true;
    else if (a === '--mode' && MODES.includes(rest[i + 1] as TierMode)) mode = rest[++i] as TierMode;
    else {
      say(`tiers: bad argument ${JSON.stringify(a)}; ${USAGE}`);
      return 64;
    }
  }
  const m = manifest(tier as TierName, PLAT_ROOT);
  if (list) {
    for (const j of m.jobs) say(`tier ${m.tier}: ${j.name} — ${(await deriveStatus(j, PLAT_ROOT)).status} (${j.item}; ${j.kind} ${j.source})`);
    return 0;
  }
  const out = join(outDir(ctx.out), 'tiers', m.tier);
  const report = await runTier(m, { root: PLAT_ROOT, out, mode, fallback, log: say });
  for (const j of report.jobs) {
    say(`tier ${report.tier}: ${j.name} — ${j.status}: ${j.outcome}${j.outcome === 'not run' ? '' : `, ${s(j.wallMs)} wall, ${s(j.cpuMs)} CPU`}${j.reason === null || j.outcome === 'not run' ? '' : ` (${j.reason})`}`);
  }
  for (const p of report.pending) say(`tier ${report.tier}: pending-after-M-1 ${p.name}: ${p.reason}`);
  say(`tier ${report.tier}: ${report.mode} run, ${s(report.wallMs)} wall, ${s(report.cpuMs)} CPU over ${report.covers}${report.endToEnd ? '' : ' — not end to end'}`);
  if (report.fallback.applied) say(`tier ${report.tier}: fallback applied: ${report.fallback.changed.map((c) => `${c.job} ${c.kind} ${String(c.from)} → ${String(c.to)}`).join(', ') || 'no size changed'}`);
  say(`tier ${report.tier}: budget ${report.budget.verdict} — ${report.budget.reason}; authority ${report.authority ?? 'none (plain run: CONTENDED, never gating)'}${report.reasons.length > 0 ? ` (${summariseReasons(report.reasons)})` : ''}`);
  const file = writeJson(join(outDir(ctx.out), 'tiers'), `${report.tier}.json`, report);
  say(`tier ${report.tier}: verdict ${report.verdict.toUpperCase()}; report ${file.path}`);
  return report.verdict === 'fail' || (report.verdict === 'over budget' && report.budget.gating) ? 1 : 0;
}
