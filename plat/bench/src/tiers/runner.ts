// The tier runner (M0-f-02a; §13.8, §12.1; C-0027, C-0069, C-0075, C-0088, C-0097, C-0099, C-0105, C-0121, C-0241).
// runTier() derives every job's status, applies the fallback switch when asked, runs every BUILT job's units, lists a
// pending job (after-M-1) with its file and a not-built job with its item, and judges the budget: a normalised figure
// more than 10 % over fails *over budget* — the PR tier on wall-clock read literally on its 8 cores, the nightly and
// milestone tiers on CPU time ÷ 16, marked projected and never gating at M0 (C-0027). Three modes:
//   plain   — each unit once, wall-clock and CPU recorded, no calibrate: the checkers' receipt (`corepack pnpm tier:pr`)
//   whole   — the same run with bench/calibrate before and after it, the drift reported, the detector sampling through
//             it (C-0097, C-0103; M0-t-00's script invokes it)
//   batched — every unit one batch through M0-f-01's timeBatch(): 30 s idle, calibrate before and after within 5 %, a
//             drifting batch re-run at most twice then flagged `throttled`, a unit over 60 s flagged `long-batch` with its
//             figure kept, the batches' wall-clock and CPU time summed (C-0097; the PR tier's gating figure)
// The vitest tests run this over FIXTURE manifests of trivial jobs only; a real tier end to end is a command receipt
// (C-0105). The budget caps are constants of the manifests and never raised in code (§13.8: "never to raise the cap").
import { join } from 'node:path';
import { calibrate as calibrateScore, scoreDrift } from '../calibrate/calibrate.js';
import { hostRecord, readReferenceScore, type HostRecord } from '../host/index.js';
import { contention, judgeContention, sampleMachine, type Authority, type MachineSample } from '../timing/contention.js';
import { timeBatch, type TimingFlag } from '../timing/harness.js';
import { writeTruncated } from '../timing/output.js';
import { SAMPLE_EVERY_MS, startSampler, type Sampler } from '../timing/sampler.js';
import { spawnExecutor } from './exec.js';
import { deriveStatus, importProbe, insideRoot, suiteProblem, type HarnessProbe } from './status.js';
import type {
  BatchRecord,
  BudgetRecord,
  DerivedStatus,
  Executor,
  FallbackRecord,
  Job,
  JobRecord,
  JobSize,
  PendingRecord,
  TierManifest,
  TierMode,
  TierReport,
  Unit,
  UnitRecord,
  UnitRun,
} from './types.js';

/** §13.8: a tier (or a job) whose normalised figure exceeds its budget by MORE than 10 % fails over budget. */
export const OVER_BUDGET_TOLERANCE = 0.1;

/** §13.8's pre-decided fallback: random fuzz 5 × 10³ inputs per primitive, B-CITY-lite 25 seeds per rung. */
export const FALLBACK_SIZES: Readonly<Record<'fuzz' | 'seeds', number>> = { fuzz: 5_000, seeds: 25 };

/** The cores a projected (16-core) tier's CPU time is divided by (C-0027). */
export const PROJECTION_CORES = 16;

/** A unit that would run a tier or the timing phase inside a tier (C-0088, C-0105): refused. */
const NESTED = /^(tier:(pr|nightly|milestone)|bench:timing-phase|timing-phase|tiers)$/;

export interface RunTierOptions {
  /** The tree the jobs read (default plat/; the tests pass a fixture tree). */
  root: string;
  /** The tier's output folder (PLAT_BENCH_OUT's tiers/<tier>/); the jobs get <out>/jobs. */
  out: string;
  mode?: TierMode;
  /** The fallback switch (§13.8): fuzz 10⁴ → 5 × 10³, seeds 50 → 25, the constructive set never cut. */
  fallback?: boolean;
  exec?: Executor;
  probe?: HarnessProbe;
  /** Progress lines (default: none). */
  log?: (line: string) => void;
  // The timing readings of the whole and batched modes, as M0-f-01's timeBatch takes them; any one passed makes the
  // run's readings `built` (the tests), and a built run's budget never gates (C-0047).
  idleMs?: number;
  sampleEveryMs?: number;
  maxBatchMs?: number;
  maxRepeats?: number;
  calibrate?: () => number | Promise<number>;
  referenceScore?: number | null;
  machine?: () => MachineSample;
  sampler?: (everyMs: number) => Promise<Sampler>;
  host?: HostRecord;
}

/** The structural problems of a manifest (empty when it may run). */
export function manifestProblems(m: TierManifest): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  if (!(m.budget.ms > 0)) out.push(`tier ${m.tier}: budget ${m.budget.ms} ms`);
  if (m.budget.projected !== (m.budget.cores === PROJECTION_CORES)) out.push(`tier ${m.tier}: a ${m.budget.cores}-core budget is ${m.budget.projected ? '' : 'not '}projected (C-0027)`);
  for (const j of m.jobs) {
    if (j.name.trim() === '') out.push(`tier ${m.tier}: a job without a name`);
    if (seen.has(j.name)) out.push(`tier ${m.tier}: job ${JSON.stringify(j.name)} listed twice`);
    seen.add(j.name);
    for (const p of [j.source, ...j.inputs, ...(j.suites ?? []).map((s) => s.path)]) {
      if (!insideRoot(p)) out.push(`job ${j.name}: ${JSON.stringify(p)} lies outside plat/ (C-0067)`);
    }
    if (j.kind === 'harness' && !/^bench\/src\/[^/]+\/$/.test(j.source)) out.push(`job ${j.name}: a harness source is a folder bench/src/<folder>/`);
    if (/^bench\/src\/(tiers|timing-phase)\//.test(j.source)) out.push(`job ${j.name}: a tier job never runs a tier or the timing phase (C-0088)`);
    if (j.size !== undefined && j.size.kind === 'constructive' && j.size.n !== Math.floor(j.size.n)) out.push(`job ${j.name}: a constructive size is a whole number`);
  }
  return out;
}

/** Whether a unit's command line would run a tier or the timing phase (C-0088, C-0105). */
export function nestedTierCall(unit: Unit): boolean {
  return unit.argv.some((a) => NESTED.test(a));
}

/** The effective size of each job under the switch, and the switch's record (§13.8's pre-decided fallback). */
export function applyFallback(jobs: readonly Job[], on: boolean): { sizes: Map<string, number | null>; record: FallbackRecord } {
  const sizes = new Map<string, number | null>();
  const changed: FallbackRecord['changed'] = [];
  for (const j of jobs) {
    const s: JobSize | undefined = j.size;
    if (s === undefined) {
      sizes.set(j.name, null);
      continue;
    }
    let n = s.n;
    if (on && (s.kind === 'fuzz' || s.kind === 'seeds')) {
      n = Math.min(s.n, FALLBACK_SIZES[s.kind]); // never raised: a job already below the fallback keeps its size
      if (n !== s.n) changed.push({ job: j.name, kind: s.kind, from: s.n, to: n });
    }
    sizes.set(j.name, n);
  }
  return { sizes, record: { applied: on, changed } };
}

/** §13.8's budget rule on one normalised figure: more than 10 % over its budget is over budget; exactly 10 % passes. */
export function judgeBudget(figureMs: number, normalisation: number | null, budgetMs: number): { normalisedMs: number | null; verdict: 'pass' | 'over budget' | 'unjudged' } {
  if (normalisation === null || !(normalisation > 0)) return { normalisedMs: null, verdict: 'unjudged' };
  const normalisedMs = figureMs / normalisation;
  return { normalisedMs, verdict: normalisedMs > budgetMs * (1 + OVER_BUDGET_TOLERANCE) ? 'over budget' : 'pass' };
}

/** A unit's log file name under <out>/logs/ (a plain file name). */
export function logName(job: string, unit: string): string {
  return `${job}--${unit}`.replace(/[^A-Za-z0-9._-]+/g, '_').slice(0, 120) + '.log';
}

/**
 * Whether a tier's budget verdict may gate: only a timed (whole or batched) run of a non-projected tier whose readings
 * were measured and stamped authoritative, with a normalised figure (C-0025, C-0027, C-0047, C-0075).
 */
export function budgetGates(r: { mode: TierMode; projected: boolean; authority: Authority | null; readings: 'measured' | 'built' | null; verdict: BudgetRecord['verdict'] }): boolean {
  return r.mode !== 'plain' && !r.projected && r.authority === 'authoritative' && r.readings === 'measured' && r.verdict !== 'unjudged';
}

function merge(into: string[], from: readonly string[]): void {
  for (const r of from) if (!into.includes(r)) into.push(r);
}

interface Planned {
  job: Job;
  derived: DerivedStatus;
  size: number | null;
  units: Unit[];
  /** Set when the built job fails before any unit runs (an empty suite, a refused unit, a harness that fails to load, units() throwing). */
  failBefore: string | null;
}

/** Runs one tier. Never throws on a failing job: a failure is a job record; a malformed manifest throws. */
export async function runTier(manifest: TierManifest, opts: RunTierOptions): Promise<TierReport> {
  const problems = manifestProblems(manifest);
  if (problems.length > 0) throw new Error(`tier ${manifest.tier}: the manifest is malformed: ${problems.join('; ')}`);
  const mode: TierMode = opts.mode ?? 'plain';
  const exec = opts.exec ?? spawnExecutor;
  const probe = opts.probe ?? importProbe;
  const log = opts.log ?? (() => undefined);
  const projected = manifest.budget.projected;
  const figureOf = (wallMs: number, cpuMs: number): number => (projected ? cpuMs / PROJECTION_CORES : wallMs);
  const { sizes, record: fallback } = applyFallback(manifest.jobs, opts.fallback ?? false);

  // 1. Derive every status (C-0099, C-0121) and plan the built jobs' units at their effective sizes.
  const planned: Planned[] = [];
  const pending: PendingRecord[] = [];
  const notBuilt: { name: string; status: string }[] = [];
  for (const job of manifest.jobs) {
    const derived = await deriveStatus(job, opts.root, probe);
    const size = sizes.get(job.name) ?? null;
    if (derived.state === 'after-M-1') {
      const reviewers = derived.reviewPending ?? [];
      pending.push({
        name: job.name,
        item: job.item,
        status: derived.status,
        file: derived.file ?? '',
        reviewPending: reviewers,
        reason: reviewers.length > 0 ? `${derived.file ?? ''} present, review pending: ${reviewers.join(', ')} (C-0121)` : `${derived.file ?? ''} absent (C-0069)`,
      });
      planned.push({ job, derived, size, units: [], failBefore: null });
      continue;
    }
    if (derived.state === 'not-built') {
      notBuilt.push({ name: job.name, status: derived.status });
      planned.push({ job, derived, size, units: [], failBefore: null });
      continue;
    }
    let failBefore: string | null = derived.loadError !== undefined ? `the harness failed to load: ${derived.loadError}` : null;
    for (const s of job.suites ?? []) {
      const p = suiteProblem(opts.root, s);
      if (p !== null && failBefore === null) failBefore = `empty suite: ${p} (§13.8 Edges)`;
    }
    if (failBefore === null && job.size !== undefined && size !== null && !(size >= 1 && Number.isInteger(size))) {
      failBefore = `empty suite: ${job.size.kind} family of ${String(size)} (§13.8 Edges)`;
    }
    let units: Unit[] = [];
    if (failBefore === null) {
      // a job whose units() throws (an unreadable tsconfig.json, a failed import, a declared entry unstaged unfilled)
      // FAILS naming the error, as a harness that fails to load does; the other jobs still run (N-2, C-0398)
      try {
        units = await job.units(size);
      } catch (e) {
        failBefore = `the job's units failed: ${e instanceof Error ? e.message : String(e)}`;
      }
    }
    if (failBefore === null) {
      if (units.length === 0) failBefore = 'empty suite: the job declares no unit (§13.8 Edges)';
      const nested = units.find(nestedTierCall);
      if (nested !== undefined) failBefore = `refused: unit ${nested.name} would run a tier or the timing phase inside a tier (C-0088, C-0105)`;
      const names = new Set<string>();
      for (const u of units) {
        if (names.has(u.name)) failBefore = `unit ${JSON.stringify(u.name)} listed twice`;
        names.add(u.name);
      }
    }
    planned.push({ job, derived, size, units, failBefore });
  }

  // 2. The readings (whole and batched modes).
  const own: number[] = [];
  const onSpawn = (pid: number): void => void own.push(pid);
  const calibrate = opts.calibrate ?? (() => calibrateScore().score);
  const machine = opts.machine ?? sampleMachine;
  const sampler = opts.sampler ?? ((ms: number) => startSampler({ everyMs: ms }));
  const readingsBuilt = opts.calibrate !== undefined || opts.referenceScore !== undefined || opts.machine !== undefined || opts.sampler !== undefined || opts.host !== undefined;
  const ref = mode !== 'plain' && opts.referenceScore === undefined ? readReferenceScore() : null;
  const referenceScore = ref !== null ? ref.score : opts.referenceScore ?? null;
  const referenceVersion = ref !== null ? ref.calibrateVersion : null;
  const host = mode === 'plain' ? null : opts.host ?? hostRecord();

  const unitRecords = new Map<string, UnitRecord[]>();
  const batches: BatchRecord[] = [];
  const reasons: string[] = [];
  let authority: Authority | null = null;
  let calibration: TierReport['calibration'] = null;
  let wholeNormalisation: number | null = null;
  const built = planned.filter((p) => p.derived.state === 'built' && p.failBefore === null);

  const runUnit = async (p: Planned, u: Unit): Promise<UnitRun> => {
    let r: UnitRun;
    try {
      r = await exec(u, { root: opts.root, out: opts.out, onSpawn });
    } catch (e) {
      r = { code: 1, wallMs: 0, cpuMs: 0, output: e instanceof Error ? e.message : String(e), signal: null };
    }
    if (r.output !== undefined && r.output !== '') writeTruncated(join(opts.out, 'logs'), logName(p.job.name, u.name), r.output);
    log(`tier ${manifest.tier}: ${p.job.name} [${u.name}] exit ${String(r.code)}, ${(r.wallMs / 1000).toFixed(1)} s wall, ${(r.cpuMs / 1000).toFixed(1)} s CPU`);
    return r;
  };

  const t0 = process.hrtime.bigint();
  if (mode === 'batched') {
    let allAuthoritative = true;
    for (const p of built) {
      const list: UnitRecord[] = [];
      for (const u of p.units) {
        let last: UnitRun | null = null;
        const r = await timeBatch(
          async () => {
            last = await runUnit(p, u);
          },
          {
            label: `${manifest.tier}: ${p.job.name} [${u.name}]`,
            idleMs: opts.idleMs,
            sampleEveryMs: opts.sampleEveryMs,
            maxBatchMs: opts.maxBatchMs,
            maxRepeats: opts.maxRepeats,
            calibrate: opts.calibrate,
            referenceScore: opts.referenceScore,
            machine: opts.machine,
            sampler: opts.sampler,
            host: opts.host,
            ownPids: () => own,
          },
        );
        const ran: UnitRun = last ?? { code: 1, wallMs: 0, cpuMs: 0 };
        const flags: TimingFlag[] = [...r.flags];
        if (ran.wallMs > (opts.maxBatchMs ?? 60_000) && !flags.includes('long-batch')) flags.push('long-batch');
        const rec: BatchRecord = {
          job: p.job.name,
          unit: u.name,
          code: ran.code,
          wallMs: ran.wallMs,
          cpuMs: ran.cpuMs,
          calibration: r.calibration,
          flags,
          authority: r.authority,
          reasons: r.reasons,
          normalisation: r.normalisation,
        };
        batches.push(rec);
        list.push(rec);
        merge(reasons, r.reasons);
        if (r.authority !== 'authoritative') allAuthoritative = false;
      }
      unitRecords.set(p.job.name, list);
    }
    authority = batches.length === 0 ? null : allAuthoritative ? 'authoritative' : 'contended';
  } else {
    let watch: Sampler | null = null;
    let s1 = 0;
    if (mode === 'whole') {
      merge(reasons, contention({ ownPids: own, referenceScore, referenceVersion, machine: machine(), checkLoad: true }).reasons);
      s1 = await calibrate();
      watch = await sampler(opts.sampleEveryMs ?? SAMPLE_EVERY_MS);
    }
    try {
      for (const p of built) {
        const list: UnitRecord[] = [];
        for (const u of p.units) {
          const r = await runUnit(p, u);
          list.push({ job: p.job.name, unit: u.name, code: r.code, wallMs: r.wallMs, cpuMs: r.cpuMs });
        }
        unitRecords.set(p.job.name, list);
      }
    } catch (e) {
      if (watch !== null) await watch.stop().catch(() => undefined); // never leave the sampler's worker running
      throw e;
    }
    if (mode === 'whole' && watch !== null) {
      const during = await watch.stop();
      const s2 = await calibrate();
      for (const s of during) merge(reasons, judgeContention(s, { ownPids: own, referenceScore, referenceVersion, checkLoad: false }).reasons);
      merge(reasons, contention({ ownPids: own, referenceScore, referenceVersion, machine: machine(), checkLoad: false, calibration: { before: s1, after: s2 } }).reasons);
      calibration = { before: s1, after: s2, drift: scoreDrift(s1, s2) };
      wholeNormalisation = referenceScore === null ? null : (s1 + s2) / 2 / referenceScore;
      authority = reasons.length === 0 ? 'authoritative' : 'contended';
    }
  }
  const elapsedMs = Number(process.hrtime.bigint() - t0) / 1e6;

  // 3. The records: per job, then the tier's sums and its budget.
  const batchNorm = (list: readonly UnitRecord[]): number | null => {
    // batched: each batch normalised by its own score (§12.1: every timing ÷ (runner score ÷ reference score))
    let sum = 0;
    for (const u of list) {
      const b = u as BatchRecord;
      if (b.normalisation === null || !(b.normalisation > 0)) return null;
      sum += figureOf(u.wallMs, u.cpuMs) / b.normalisation;
    }
    return sum;
  };
  const jobs: JobRecord[] = [];
  let wallMs = 0;
  let cpuMs = 0;
  let anyJobOver = false;
  let anyFail = false;
  const normalisedOf = (list: readonly UnitRecord[]): number | null => {
    if (mode === 'batched') return list.length === 0 ? null : batchNorm(list);
    if (mode === 'whole' && wholeNormalisation !== null && wholeNormalisation > 0) {
      let w = 0;
      let c = 0;
      for (const u of list) {
        w += u.wallMs;
        c += u.cpuMs;
      }
      return figureOf(w, c) / wholeNormalisation;
    }
    return null;
  };
  for (const p of planned) {
    const base = { name: p.job.name, item: p.job.item, kind: p.job.kind, source: p.job.source, status: p.derived.status, size: p.size, budgetMs: p.job.budgetMs ?? null };
    if (p.derived.state !== 'built') {
      const reason = p.derived.state === 'after-M-1' ? `pending-after-M-1: ${p.derived.status}` : `not built: ${p.derived.status}`;
      jobs.push({ ...base, outcome: 'not run', reason, wallMs: 0, cpuMs: 0, normalised: null, units: [] });
      continue;
    }
    if (p.failBefore !== null) {
      anyFail = true;
      jobs.push({ ...base, outcome: 'fail', reason: p.failBefore, wallMs: 0, cpuMs: 0, normalised: null, units: [] });
      continue;
    }
    const list = unitRecords.get(p.job.name) ?? [];
    let w = 0;
    let c = 0;
    for (const u of list) {
      w += u.wallMs;
      c += u.cpuMs;
    }
    wallMs += w;
    cpuMs += c;
    const failed = list.filter((u) => u.code !== 0);
    const normalised = normalisedOf(list);
    let outcome: JobRecord['outcome'] = 'pass';
    let reason: string | null = null;
    if (failed.length > 0) {
      outcome = 'fail';
      reason = failed.map((u) => `unit ${u.unit} exit ${String(u.code)}`).join('; ');
      anyFail = true;
    } else if (p.job.budgetMs !== undefined && normalised !== null && judgeBudget(normalised, 1, p.job.budgetMs).verdict === 'over budget') {
      outcome = 'over budget';
      reason = `${(normalised / 1000).toFixed(1)} s normalised against ${(p.job.budgetMs / 1000).toFixed(1)} s + 10 % (§13.8)`;
      anyJobOver = true;
    }
    jobs.push({ ...base, outcome, reason, wallMs: w, cpuMs: c, normalised, units: list });
  }

  const figureMs = figureOf(wallMs, cpuMs);
  let normalisation: number | null = null;
  let normalised: number | null = null;
  if (mode === 'whole') normalisation = wholeNormalisation;
  if (mode === 'batched') {
    const all = batches.length === 0 ? null : batchNorm(batches);
    if (all !== null && all > 0) {
      normalised = all;
      normalisation = figureMs / all;
    } else if (all === 0 && figureMs === 0) {
      normalised = 0;
      normalisation = batches.every((b) => b.normalisation !== null) ? 1 : null;
    }
  }
  const judged = mode === 'batched'
    ? normalised === null
      ? { normalisedMs: null, verdict: 'unjudged' as const }
      : judgeBudget(normalised, 1, manifest.budget.ms)
    : judgeBudget(figureMs, normalisation, manifest.budget.ms);
  if (mode !== 'batched') normalised = judged.normalisedMs;
  const readings = mode === 'plain' ? null : readingsBuilt ? 'built' : 'measured';
  const gating = budgetGates({ mode, projected, authority, readings, verdict: judged.verdict });
  const basis = projected ? 'cpu ÷ 16' : 'wall-clock';
  const budget: BudgetRecord = {
    ms: manifest.budget.ms,
    cores: manifest.budget.cores,
    figureMs,
    basis,
    normalisedMs: judged.normalisedMs,
    verdict: judged.verdict,
    gating,
    reason:
      judged.verdict === 'unjudged'
        ? mode === 'plain'
          ? 'unjudged: a plain run takes no calibrate score (the whole and batched modes do)'
          : 'unjudged: no reference score yet, so no normalisation (C-0075)'
        : `${((judged.normalisedMs ?? 0) / 1000).toFixed(1)} s normalised (${basis}${projected ? ', projected' : ''}) against ${(manifest.budget.ms / 1000).toFixed(0)} s on ${String(manifest.budget.cores)} cores + 10 %${gating ? '' : ' — not gating (' + (projected ? 'projected, C-0027' : authority !== 'authoritative' ? 'contended, C-0047' : 'built readings, C-0047') + ')'}`,
  };
  const verdict: TierReport['verdict'] = anyFail ? 'fail' : anyJobOver || judged.verdict === 'over budget' ? 'over budget' : 'pass';
  const builtNames = planned.filter((p) => p.derived.state === 'built').map((p) => p.job.name);
  const covers =
    `the sum over the ${String(builtNames.length)} built job(s)` +
    (pending.length > 0 ? `; pending, never run or timed: ${pending.map((x) => `${x.name} (${x.status})`).join(', ')}` : '') +
    (notBuilt.length > 0 ? `; not built: ${notBuilt.map((x) => `${x.name} (${x.status})`).join(', ')}` : '');
  return {
    tier: manifest.tier,
    mode,
    jobs,
    wallMs,
    cpuMs,
    normalised,
    normalisation,
    budget,
    verdict,
    projected,
    pending,
    notBuilt,
    endToEnd: notBuilt.length === 0,
    batches,
    calibration,
    authority,
    readings,
    reasons,
    fallback,
    elapsedMs,
    host,
    covers,
    at: new Date().toISOString(),
  };
}
