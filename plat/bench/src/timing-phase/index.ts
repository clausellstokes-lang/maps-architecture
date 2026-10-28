// bench/src/timing-phase — the timing-phase script (M0-t-00, built and tested on fixture bars; run alone by M0-t-01 in
// wave T, and by M0-t-02 with `--only` in T2 — C-0075, C-0080, C-0082, C-0084, C-0097, C-0098, C-0103, C-0115, C-0121).
// The scaffold created this folder empty (M0-s-01, C-0013); it belongs to M0-t-00.
//
//   PLAT_TIMING_TOKEN=<token> corepack pnpm bench:timing-phase [-- --only <bar id>[,<bar id>…]] [--list]
//
// 1. Refuses to start without PLAT_TIMING_TOKEN (the session's TIMING-PHASE OPEN token, C-0103), which the record keeps;
//    refuses while the contention detector (M0-f-01's, every process on the machine), read after §12.1's 30 s idle so
//    the script's own start-up has settled, names another process of the listed kinds or one at ≥ 10 % CPU — two
//    designed refusals of an unlawful STATE, typed and visible (exit 3), each naming the alternative.
// 2. Its FIRST act: the reference score (C-0075) — bench/calibrate twice after 30 s idle under the detector, the two
//    within 5 %, written ONCE with its host record through M0-f-01's writer to bench/src/host/reference-score.json
//    (normalisation 1 from then on); a later run, and every `--only` run, reads it and never rewrites it (C-0080).
// 3. Every bar of M0-work.json's `timingBars` (bars.ts reads the list; no bar is written twice), each through its item's
//    exported entry (workloads.ts, tiers.ts), batch by batch by §12.1's protocol (protocol.ts): a contended batch
//    re-queued, never recorded as a result; the fusion and site gates in Node and in Chromium's worker with the ±15 %
//    rule (C-0082); R12-4's rows reported from the same runs' stamps (C-0084); a kernel bar's miss naming C-0098's
//    ladder; the tiers by C-0097 (tiers.ts).
// 4. Writes M0-timings.json (record.ts's shape) to docs/build/ — a full run the whole record, an `--only` run a `rerun`
//    block appended — and a copy to $PLAT_BENCH_OUT/timing-phase/.
// Exit 0 when every gating bar it ran passed; 1 when one missed or is unmeasured (re-run it with --only); 3 refused; 64
// on a bad argument. The `ctx` fields beyond `out` are a vitest test's seams (fixture bars with planted timings, a
// fixture tier manifest, the detector's readings, a scratch reference-score file under PLAT_BENCH_OUT): no test runs a
// real bar, a real tier or the browser, or writes the committed reference-score.json (C-0105, C-0115).
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { calibrate as calibrateScore, scoreDrift } from '../calibrate/calibrate.js';
import { CALIBRATE_VERSION } from '../calibrate/kernels.js';
import { hostRecord, NO_REFERENCE_SCORE, readReferenceScore, REFERENCE_SCORE_PATH, writeReferenceScore, type HostRecord } from '../host/index.js';
import { contention, DRIFT_LIMIT, type ContentionReport } from '../timing/contention.js';
import { IDLE_MS, MAX_BATCH_MS, MAX_REPEATS, timeBatch as realTimeBatch } from '../timing/harness.js';
import { outDir, say, summariseReasons } from '../timing/output.js';
import { SAMPLE_EVERY_MS, type Sampler } from '../timing/sampler.js';
import { BAR_IDS, readTimingBars, resolveBars, type BarId, type ResolvedBar, type TimingBarRow } from './bars.js';
import { CROSS_ENGINE_TOLERANCE, foldFigure, judgeFigure, ladderOf, MAX_REQUEUES, runGroup, TARGET_BATCH_MS, type BatchHarness, type FigureRecord, type Group, type GroupResult, type TimeBatchFn } from './protocol.js';
import { RECORD_SCHEMA, readRecord, writeAtomic, type BarRecord, type ReferenceAct, type Refusal, type RerunBlock, type TimingsRecord } from './record.js';
import { timeTiers, type TierContext, type TierRecord } from './tiers.js';
import { realGroup } from './workloads.js';

export { BAR_DEFS, BAR_IDS, LADDER_RULE, readTimingBars, resolveBars, SITE_GATE_FIXTURES, stated, WORK_PATH } from './bars.js';
export type { BarDef, BarId, FigureSpec, ResolvedBar, TimingBarRow } from './bars.js';
export { CHROMIUM, crossEngine, CROSS_ENGINE_TOLERANCE, foldFigure, isResult, judgeFigure, ladderOf, MAX_REQUEUES, nextBlockSize, quantile, runGroup, TARGET_BATCH_MS, values } from './protocol.js';
export type { BatchHarness, BatchOutput, BatchPlan, BatchSummary, CrossEngine, FigureRecord, Group, GroupResult, Ladder, Leg, Pooled, Samples, TimeBatchFn } from './protocol.js';
export { RECORD_SCHEMA, readRecord, writeAtomic } from './record.js';
export type { BarRecord, ReferenceAct, Refusal, RefusalClass, RerunBlock, TimingsRecord } from './record.js';
export { TIERS, timeTiers } from './tiers.js';
export type { DetectorSample, TierContext, TierRecord, TierRunRecord } from './tiers.js';
export { fusionGateOf, GATE_STAGES_ENTRY, REAL_GROUPS, realGroup, S11_WORKLOAD_FILE } from './workloads.js';

/** The record M0-t-01's run writes (inside plat/; M0-t-01 owns the file, C-0115). */
export const RECORD_PATH = fileURLToPath(new URL('../../../docs/build/M0-timings.json', import.meta.url));
/** plat/ (the tiers' root). */
export const PLAT_ROOT = fileURLToPath(new URL('../../../', import.meta.url));
/** The token variable (C-0103). */
export const TOKEN_VAR = 'PLAT_TIMING_TOKEN';

const USAGE = 'usage: PLAT_TIMING_TOKEN=<token> corepack pnpm bench:timing-phase [-- --only <bar id>[,<bar id>…]] [--list]';

/** What the detector seam is asked. */
export interface DetectOptions {
  readonly ownPids: readonly number[];
  readonly checkLoad?: boolean;
  readonly calibration?: { readonly before: number; readonly after: number };
}

/** The script's context: the dispatcher passes `out` only; the rest are the tests' seams. */
export interface PhaseContext {
  out: string;
  env?: Readonly<Record<string, string | undefined>>;
  /** The timingBars rows (default: read from M0-work.json). */
  rows?: readonly TimingBarRow[];
  /** Fixture groups by group id, in place of the real workloads (the tests' fixture bars). */
  groups?: Readonly<Record<string, Group>>;
  timeBatch?: TimeBatchFn;
  detect?: (o: DetectOptions) => ContentionReport;
  calibrate?: () => number | Promise<number>;
  host?: () => HostRecord;
  sleep?: (ms: number) => Promise<void>;
  /** The reference-score file (default the committed one; the tests' scratch copy under PLAT_BENCH_OUT). */
  referenceScorePath?: string;
  /** The record (default docs/build/M0-timings.json; the tests' scratch path). */
  recordPath?: string;
  tiers?: Partial<Pick<TierContext, 'manifest' | 'runTier' | 'options' | 'root'>>;
  watch?: (everyMs: number) => Promise<Sampler>;
  log?: (line: string) => void;
}

/** The outcome of one invocation (typed; `run` prints it and maps it to an exit code). */
export type PhaseOutcome =
  | { readonly kind: 'usage'; readonly message: string }
  | { readonly kind: 'list'; readonly bars: readonly { readonly id: BarId; readonly bar: string }[] }
  | { readonly kind: 'refused'; readonly refusal: Refusal }
  | { readonly kind: 'ran'; readonly record: TimingsRecord; readonly bars: readonly BarRecord[]; readonly code: 0 | 1 };

/** The parsed command line. */
export type PhaseArgs = { readonly ok: true; readonly only: readonly BarId[] | null; readonly list: boolean } | { readonly ok: false; readonly message: string };

/** Parses `[--only <id>[,<id>…] [<id>…]] [--list]`. */
export function parsePhaseArgs(args: readonly string[]): PhaseArgs {
  let only: BarId[] | null = null;
  let list = false;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--list') list = true;
    else if (a === '--only') {
      if (only !== null) return { ok: false, message: `timing-phase: --only twice; ${USAGE}` };
      only = [];
      while (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        for (const id of args[++i].split(',').filter((x) => x !== '')) {
          if (!(BAR_IDS as readonly string[]).includes(id)) return { ok: false, message: `timing-phase: no bar ${JSON.stringify(id)} (the bars: ${BAR_IDS.join(', ')}); ${USAGE}` };
          if (only.includes(id as BarId)) return { ok: false, message: `timing-phase: --only names ${id} twice; ${USAGE}` };
          only.push(id as BarId);
        }
      }
      if (only.length === 0) return { ok: false, message: `timing-phase: --only names no bar; ${USAGE}` };
    } else return { ok: false, message: `timing-phase: unknown argument ${JSON.stringify(a)}; ${USAGE}` };
  }
  return { ok: true, only, list };
}

function refusal(cls: Refusal['refused'], message: string, alternative: string, reasons: readonly string[]): Refusal {
  return { refused: cls, kind: 'unlawful-state', message, alternative, reasons, at: new Date().toISOString() };
}

const realSleep = (ms: number): Promise<void> => (ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve());

/** The detector's reading: the real one reads every process on the machine now (M0-f-01, C-0103). */
const realDetect = (o: DetectOptions): ContentionReport =>
  contention({ ownPids: o.ownPids, ...(o.checkLoad === undefined ? {} : { checkLoad: o.checkLoad }), ...(o.calibration === undefined ? {} : { calibration: o.calibration }) });

/**
 * The first act (C-0075): the stored score read; if null, bench/calibrate twice after 30 s idle under the detector
 * (before and after the two runs), the two within 5 %, written once with the host record — up to 1 + MAX_REPEATS
 * attempts, each after its own idle wait; never an authoritative run → the detector's refusal. `readOnly` (the `--only`
 * re-run): the stored score is read and never rewritten (C-0080).
 */
export async function firstAct(
  c: { path: string; detect: (o: DetectOptions) => ContentionReport; calibrate: () => number | Promise<number>; host: () => HostRecord; sleep: (ms: number) => Promise<void>; writtenBy: string },
  readOnly: boolean,
): Promise<ReferenceAct | Refusal> {
  const current = readReferenceScore(c.path);
  const read = (attempts: number): ReferenceAct => ({
    action: 'read',
    path: c.path,
    score: current.score,
    calibrateVersion: current.calibrateVersion,
    host: current.host,
    calibration: current.calibration,
    measuredAt: current.measuredAt,
    writtenBy: current.writtenBy,
    attempts,
    stamp: null,
  });
  if (readOnly || current.score !== null) return read(0);
  let last: string[] = [];
  for (let attempt = 1; attempt <= 1 + MAX_REPEATS; attempt++) {
    await c.sleep(IDLE_MS);
    const before = c.detect({ ownPids: [], checkLoad: true });
    const s1 = await c.calibrate();
    const s2 = await c.calibrate();
    const after = c.detect({ ownPids: [], checkLoad: false, calibration: { before: s1, after: s2 } });
    const reasons = [...new Set([...before.reasons, ...after.reasons])];
    const readings = before.readings === 'measured' && after.readings === 'measured' ? 'measured' : 'built';
    const others = reasons.filter((r) => r !== NO_REFERENCE_SCORE);
    const drift = scoreDrift(s1, s2);
    if (others.length > 0 || !(drift <= DRIFT_LIMIT) || readings !== 'measured') {
      last = others.length > 0 ? others : readings !== 'measured' ? ['the stamp was built from injected readings (C-0047)'] : [`calibrate drift ${(drift * 100).toFixed(1)} % > 5 %`];
      continue;
    }
    const host = c.host();
    const rec = writeReferenceScore({ scores: [s1, s2], calibrateVersion: CALIBRATE_VERSION, host, stamp: { readings, reasons } }, { writtenBy: c.writtenBy, path: c.path });
    return {
      action: 'written',
      path: c.path,
      score: rec.score,
      calibrateVersion: rec.calibrateVersion,
      host: rec.host,
      calibration: rec.calibration,
      measuredAt: rec.measuredAt,
      writtenBy: rec.writtenBy,
      attempts: attempt,
      stamp: { readings, reasons },
    };
  }
  return refusal(
    'contended-machine',
    `timing-phase: the reference score needs an AUTHORITATIVE calibrate run and ${String(1 + MAX_REPEATS)} attempts were contended (C-0075, C-0103)`,
    'stop the processes named (quit every browser, end every other node / python / bench / tsc / vitest / esbuild process), put the machine on AC power, let the load settle, and run the script again',
    last,
  );
}

/** Folds the tiers bar's figures from its tier records (C-0097; the PR batched sum gates, the rest is reported). */
function tierFigures(rb: ResolvedBar, tiers: readonly TierRecord[]): FigureRecord[] {
  const byTier = new Map(tiers.map((t) => [t.tier, t]));
  return rb.figures.map((spec) => {
    const [, tier, whole] = spec.key.split(':');
    const t = byTier.get(tier as TierRecord['tier']);
    if (t === undefined) return judgeFigure(spec, null, 0, { why: `the ${tier} tier was not run` });
    const run = tier === 'pr' ? t.runs[whole === 'whole' ? 1 : 0] : t.runs[t.runs.length - 1];
    if (run === undefined) return judgeFigure(spec, null, 0, { why: 'no run' });
    const perUnit = spec.unit === 'h' ? 3_600_000 : 60_000;
    if (run.failed.length > 0) return judgeFigure(spec, null, run.batches.length, { why: `a job failed, so the tier is not timed: ${run.failed.join('; ')}` });
    if (run.budget.normalisedMs === null) return judgeFigure(spec, null, run.batches.length, { why: run.budget.reason });
    const value = run.budget.normalisedMs / perUnit;
    if (spec.role === 'gating' && !run.budget.gating) {
      return judgeFigure(spec, null, run.batches.length, { why: `measured ${value.toFixed(2)} ${spec.unit}, not gating: ${run.budget.reason}` });
    }
    // §13.8's 10 % rule is the runner's: its verdict decides the gating figure (exactly 10 % over passes)
    const f = judgeFigure(spec, value, run.batches.length);
    return spec.role === 'gating' && f.verdict !== 'unmeasured' ? { ...f, verdict: run.budget.verdict === 'over budget' ? 'miss' : 'pass' } : f;
  });
}

/** Folds one bar's record from its groups' results (or the tiers' records). */
export function foldBar(rb: ResolvedBar, results: ReadonlyMap<string, GroupResult>, tiers: readonly TierRecord[] | null): BarRecord {
  const groups = rb.def.groups.filter((g) => g !== 'tiers').map((g) => results.get(g)).filter((g): g is GroupResult => g !== undefined);
  const pools = new Map<string, { raw: number; norm: number }[]>();
  for (const g of groups) for (const [k, v] of g.pools) pools.set(k, [...(pools.get(k) ?? []), ...v]);
  const complete = groups.length === rb.def.groups.filter((g) => g !== 'tiers').length && groups.every((g) => g.dropped === 0);
  const figures = rb.id === 'tiers' ? tierFigures(rb, tiers ?? []) : rb.figures.map((f) => foldFigure(f, pools, complete));
  const unmeasured = figures.some((f) => f.verdict === 'unmeasured');
  const missed = figures.filter((f) => f.verdict === 'miss');
  const verdict: BarRecord['verdict'] = unmeasured ? 'unmeasured' : rb.def.role === 'reported' ? 'reported' : missed.length > 0 ? 'miss' : 'pass';
  const factor = missed.length === 0 ? null : Math.max(...missed.map((f) => f.factor ?? 0));
  const exceeding = figures.some((f) => f.role === 'reported' && f.exceeds === true);
  const batches = groups.flatMap((g) => g.batches);
  return {
    id: rb.id,
    bar: rb.row.bar,
    source: rb.row.source,
    code: rb.row.code,
    measuredIn: rb.row.measuredIn,
    reMeasuredBy: rb.row.reMeasuredBy,
    role: rb.def.role,
    kernel: rb.def.kernel,
    entry: rb.def.entry,
    workload: rb.def.workload,
    figures,
    verdict,
    factor,
    fallback: verdict === 'miss' || (rb.def.role === 'reported' && exceeding) ? rb.row.miss : null,
    appliedBy: verdict === 'miss' || (rb.def.role === 'reported' && exceeding) ? rb.row.code : null,
    ladder: rb.def.kernel && verdict === 'miss' && factor !== null ? ladderOf(rb.def, factor) : null,
    batches,
    requeued: groups.reduce((a, g) => a + g.requeued, 0),
    dropped: groups.reduce((a, g) => a + g.dropped, 0),
    host: batches.find((b) => b.fate === 'accepted')?.host ?? null,
    extras: groups.flatMap((g) => g.extras),
    ...(rb.id === 'tiers' ? { tiers: tiers ?? [] } : {}),
  };
}

/** The refusal census (J264, N-58): the two designed refusals, and what the bars' batches refused, by bar. */
function census(bars: readonly BarRecord[], refused: Refusal | null): Record<string, unknown> {
  const barRefusals: Record<string, number> = {};
  for (const b of bars) {
    let n = 0;
    for (const e of b.extras) for (const k of ['refused', 'refusedOrSetup']) if (typeof e[k] === 'number') n += e[k] as number;
    if (n > 0) barRefusals[b.id] = n;
  }
  return {
    designed: [
      { class: 'no-token', input: 'UNLAWFUL state (the phase not opened by the session)', verdict: 'REFUSE', alternative: `set ${TOKEN_VAR} to the session's TIMING-PHASE OPEN token (C-0103)` },
      { class: 'contended-machine', input: 'UNLAWFUL state (another process on the machine)', verdict: 'REFUSE', alternative: 'stop the process the detector names, then run again (C-0103)' },
    ],
    thisRun: refused === null ? 'none' : refused.refused,
    contendedBatches: 're-queued (≤ 2), never recorded as a result and never a refusal of the run (C-0047)',
    barRefusals,
  };
}

/** One invocation of the script (typed outcome). */
export async function timingPhase(args: readonly string[], ctx: PhaseContext): Promise<PhaseOutcome> {
  const log = ctx.log ?? say;
  const a = parsePhaseArgs(args);
  if (!a.ok) return { kind: 'usage', message: a.message };
  const rows = ctx.rows ?? readTimingBars();
  const resolved = resolveBars(rows);
  if (a.list) return { kind: 'list', bars: resolved.map((r) => ({ id: r.id, bar: r.row.bar })) };
  const env = ctx.env ?? process.env;
  const token = (env[TOKEN_VAR] ?? '').trim();
  if (token === '') {
    return {
      kind: 'refused',
      refusal: refusal('no-token', `timing-phase: no ${TOKEN_VAR}: the timing phase starts only when the session has opened it (TIMING-PHASE OPEN <token>, after M-1's research-side seats are paused; C-0103)`, `set ${TOKEN_VAR}=<the token of the session's TIMING-PHASE OPEN line> and run again`, []),
    };
  }
  const detect = ctx.detect ?? realDetect;
  const sleep = ctx.sleep ?? realSleep;
  // The preflight reads the machine after §12.1's 30 s idle, as every batch and the first act do (C-0440 (10), the
  // first check's B1): at start-up the script's own launch is hot — the `corepack pnpm` node ancestor and the tsx
  // loader's esbuild child transpiling the sources, each ≥ 10 % CPU, which M0-f-01's detector exempts from the kind
  // clause only (C-0138) — so a reading taken then refused a quiet machine. After the idle the launch is quiet and only
  // another process (a browser, a python3, anything at ≥ 10 % CPU) is named.
  await sleep(IDLE_MS);
  const pre = detect({ ownPids: [], checkLoad: false });
  if (pre.offenders.length > 0) {
    return {
      kind: 'refused',
      refusal: refusal(
        'contended-machine',
        `timing-phase: the detector names ${String(pre.offenders.length)} other process(es) on the machine (C-0103): ${summariseReasons(pre.offenders.map((o) => `${o.name} (pid ${String(o.pid)}${o.clause === 'cpu' ? `, ${String(o.pcpu)} % CPU` : ''})`))}`,
        'stop the processes named (quit every browser; end every other node, python, bench, tsc, vitest or esbuild process and anything at ≥ 10 % CPU), then run again',
        pre.reasons.filter((r) => r !== NO_REFERENCE_SCORE),
      ),
    };
  }
  const startedAt = new Date().toISOString();
  const host = (ctx.host ?? hostRecord)();
  const scorePath = ctx.referenceScorePath ?? REFERENCE_SCORE_PATH;
  const act = await firstAct(
    { path: scorePath, detect, calibrate: ctx.calibrate ?? (() => calibrateScore().score), host: () => host, sleep, writtenBy: `M0-t-01 through bench:timing-phase (M0-t-00's script), ${TOKEN_VAR} ${token}` },
    a.only !== null,
  );
  if ('refused' in act) return { kind: 'refused', refusal: act };
  log(`timing-phase: reference score ${act.action}: ${act.score === null ? 'null' : `${act.score.toFixed(3)} ms`} (${act.path})`);

  const selected = a.only === null ? resolved : resolved.filter((r) => (a.only as readonly BarId[]).includes(r.id));
  const own: number[] = [];
  const harness: BatchHarness = { timeBatch: ctx.timeBatch ?? realTimeBatch, options: { ownPids: () => own }, own: (pid) => void own.push(pid) };
  const results = new Map<string, GroupResult>();
  for (const rb of selected) {
    for (const id of rb.def.groups) {
      if (id === 'tiers' || results.has(id)) continue;
      const group = ctx.groups?.[id] ?? (await realGroup(id));
      log(`timing-phase: ${rb.id}: group ${id}`);
      results.set(id, await runGroup(group, harness, log));
    }
  }
  let tiers: TierRecord[] | null = null;
  if (selected.some((r) => r.id === 'tiers')) {
    tiers = await timeTiers({ root: ctx.tiers?.root ?? PLAT_ROOT, out: outDir(ctx.out), ...ctx.tiers, sleep, ...(ctx.watch === undefined ? {} : { watch: ctx.watch }), referenceScorePath: scorePath, log });
  }
  const bars = selected.map((rb) => foldBar(rb, results, tiers));
  const seams = (['rows', 'groups', 'timeBatch', 'detect', 'calibrate', 'host', 'sleep', 'referenceScorePath', 'recordPath', 'tiers', 'watch', 'env'] as const).filter((k) => ctx[k] !== undefined);
  const builtSeams = seams.filter((s) => !['rows', 'referenceScorePath', 'recordPath', 'env'].includes(s));
  const recordPath = ctx.recordPath ?? RECORD_PATH;
  const finishedAt = new Date().toISOString();
  const verdict = {
    missed: bars.filter((b) => b.verdict === 'miss').map((b) => b.id),
    unmeasured: bars.filter((b) => b.verdict === 'unmeasured').map((b) => b.id),
    reportedExceeding: bars.filter((b) => b.role === 'reported' && b.figures.some((f) => f.exceeds === true)).map((b) => b.id),
  };
  const fresh: TimingsRecord = {
    schema: RECORD_SCHEMA,
    writtenBy: "M0-t-01's run of bench:timing-phase (M0-t-00's script, C-0115)",
    token,
    startedAt,
    finishedAt,
    host,
    readings: builtSeams.length === 0 ? 'measured' : 'built',
    seams,
    referenceScore: act,
    normalisation: "each figure ÷ (its batch's mean calibrate score ÷ the reference score) — §12.1's measured ratio, ≈ 1 on the reference machine (C-0027, C-0411 (3))",
    protocol: { idleMs: IDLE_MS, maxBatchMs: MAX_BATCH_MS, maxRepeats: MAX_REPEATS, sampleEveryMs: SAMPLE_EVERY_MS, driftLimit: DRIFT_LIMIT, maxRequeues: MAX_REQUEUES, crossEngineTolerance: CROSS_ENGINE_TOLERANCE, targetBatchMs: TARGET_BATCH_MS },
    bars: a.only === null ? bars : [],
    census: census(bars, null),
    rerun: [],
    verdict,
  };
  let record = fresh;
  if (a.only !== null) {
    const block: RerunBlock = { at: finishedAt, token, only: a.only, referenceScore: act, bars };
    const existing = readRecord(recordPath);
    record = existing === null ? { ...fresh, rerun: [block] } : { ...existing, rerun: [...existing.rerun, block] };
  }
  writeAtomic(recordPath, record);
  writeAtomic(join(outDir(ctx.out), 'timing-phase', 'M0-timings.json'), record);
  const gatingBad = bars.some((b) => b.role === 'gating' && (b.verdict === 'miss' || b.verdict === 'unmeasured'));
  return { kind: 'ran', record, bars, code: gatingBad ? 1 : 0 };
}

/** The dispatcher's entry: `bench -- timing-phase [--only <ids>] [--list]` (C-0059, C-0113). */
export async function run(args: string[], ctx: PhaseContext): Promise<number> {
  const o = await timingPhase(args, ctx);
  const log = ctx.log ?? say;
  switch (o.kind) {
    case 'usage':
      log(o.message);
      return 64;
    case 'list':
      for (const b of o.bars) log(`timing-phase: ${b.id} — ${b.bar}`);
      return 0;
    case 'refused':
      log(`timing-phase: REFUSE (${o.refusal.refused}): ${o.refusal.message}`);
      log(`timing-phase: the alternative: ${o.refusal.alternative}`);
      if (o.refusal.reasons.length > 0) log(`timing-phase: reasons: ${summariseReasons([...o.refusal.reasons])}`);
      writeAtomic(join(outDir(ctx.out), 'timing-phase', 'refusal.json'), o.refusal);
      return 3;
    case 'ran':
      for (const b of o.bars) {
        log(`timing-phase: ${b.id}: ${b.verdict}${b.factor === null ? '' : ` by ${b.factor.toFixed(2)}×`} — ${b.figures.map((f) => `${f.name} ${f.value === null ? '—' : f.value.toPrecision(4)} ${f.unit} (${f.comparator} ${String(f.budget)})`).join('; ')}${b.ladder === null ? '' : `; next: ${b.ladder.next}`}`);
      }
      log(`timing-phase: record ${ctx.recordPath ?? RECORD_PATH}; exit ${String(o.code)}`);
      return o.code;
  }
}
