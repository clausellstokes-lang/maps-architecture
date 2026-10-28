// The timing-phase script's FIXTURES (M0-t-00; C-0105, C-0115): fixture bars with planted timings (a planted group per
// real group id, each batch returning a planted stamp and planted samples — nothing is timed), a fixture tier manifest
// with planted unit durations over a temporary plat/-shaped tree (no job is spawned), planted detector readings, a
// stub sampler, a recording sleep, and a scratch copy of reference-score.json under PLAT_BENCH_OUT. No fixture runs a
// real bar, a real tier or the browser, and none touches the committed reference-score.json.
import { createHash, randomUUID } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { hostRecord, REFERENCE_SCORE_PATH, type HostRecord } from '../../src/host/index.js';
import { judgeContention, type ContentionReport, type MachineSample, type ProcessRow } from '../../src/timing/contention.js';
import type { TimingResult } from '../../src/timing/harness.js';
import type { Sampler } from '../../src/timing/sampler.js';
import type { Executor, Job, TierManifest, TierName, Unit, UnitRun } from '../../src/tiers/types.js';
import { CHROMIUM, type BatchOutput, type BatchPlan, type Group, type PhaseContext, type Samples, type DetectOptions } from '../../src/timing-phase/index.js';

export const HOST: HostRecord = hostRecord();

/** PLAT_BENCH_OUT (the bench's output folder, never plat/). */
export const BENCH_OUT = process.env['PLAT_BENCH_OUT'] ?? join(tmpdir(), 'plat-bench');

const made: string[] = [];

/** A fresh scratch folder under PLAT_BENCH_OUT. */
export function scratch(): string {
  const d = join(BENCH_OUT, 'timing-phase-tests', randomUUID());
  mkdirSync(d, { recursive: true });
  made.push(d);
  return d;
}

export function removeScratch(): void {
  for (const d of made.splice(0)) rmSync(d, { recursive: true, force: true });
}

export const sha256 = (path: string): string => createHash('sha256').update(readFileSync(path)).digest('hex');

/** A scratch copy of the committed reference-score.json (score null) in `dir`. */
export function scoreCopy(dir: string): string {
  const p = join(dir, 'reference-score.json');
  copyFileSync(REFERENCE_SCORE_PATH, p);
  return p;
}

/** A planted stamp: measured, authoritative, normalisation 1 unless overridden. */
export function stamp(extra: Partial<TimingResult> = {}): TimingResult {
  return {
    label: 'fixture',
    value: 1,
    unit: 'ms',
    host: HOST,
    authority: 'authoritative',
    readings: 'measured',
    reasons: [],
    normalisation: 1,
    poolSize: 0,
    wallMs: 1_000,
    cpuMs: 1_000,
    calibration: { before: 100, after: 101, drift: 0.01, attempts: 1 },
    flags: [],
    samples: 3,
    at: '2026-10-27T00:00:00.000Z',
    ...extra,
  };
}

/** A planted batch: its samples and stamp; `runs` counts its runs. */
export interface PlantedBatch {
  readonly samples: Samples;
  readonly stamp?: Partial<TimingResult>;
  readonly leg?: BatchPlan['leg'];
  readonly extra?: Record<string, unknown>;
  readonly label?: string;
}

/** A group of planted batches (the stamps returned in turn per batch when a list is given). */
export function planted(id: string, batches: readonly (PlantedBatch | PlantedBatch[])[], runs: string[] = []): Group {
  return {
    id,
    plans: batches.map((b, i) => {
      const seq = Array.isArray(b) ? b : [b];
      let k = 0;
      const first = seq[0];
      return {
        label: first.label ?? `${id} batch ${String(i)}`,
        ...(first.leg === undefined ? {} : { leg: first.leg }),
        run: (): Promise<BatchOutput> => {
          const p = seq[Math.min(k, seq.length - 1)];
          k += 1;
          runs.push(`${id}#${String(i)}`);
          return Promise.resolve({ stamp: stamp(p.stamp), samples: p.samples, ...(p.extra === undefined ? {} : { extra: p.extra }) });
        },
      };
    }),
  };
}

/** The planted figures of every fixture bar (each under its budget unless a test overrides it). */
export interface Plants {
  insert: number;
  splitFace: number;
  district: number;
  city: number;
  s11: number[];
  roof: number;
  spine: number;
  streamKey: number;
  share: number;
  finalise: number;
  recompute: number;
  point: number;
  overlap: number;
  fusionGate: number;
  fusionCall: number;
  fusionChromiumCall: number;
  fusionStages: Record<string, number>;
  siteGate: number;
  siteCall: number;
  siteChromiumCall: number;
  siteStages: Record<string, number>;
  hydrology: number;
}

export const PLANTS: Plants = {
  insert: 5,
  splitFace: 10,
  district: 2,
  city: 20,
  s11: [2, 2.5, 1.5],
  roof: 15,
  spine: 18,
  streamKey: 0.05,
  share: 3,
  finalise: 2,
  recompute: 100,
  point: 1.5,
  overlap: 12,
  fusionGate: 80,
  fusionCall: 100,
  fusionChromiumCall: 105,
  fusionStages: { S1: 4, S3: 9, S4: 8, S5: 35, S8: 18 },
  siteGate: 40,
  siteCall: 100,
  siteChromiumCall: 104,
  siteStages: { S1: 20, S3: 10, S4: 8, S6: 15 },
  hydrology: 15,
};

export const S11_CALLS = [{ ops: ['offsetFace', 'obb', 'lir', 'splitFace', 'splitFace', 'insertChain'], plots: 3 }];

/** One planted group per real group id (the fixture bars). */
export function fixtureGroups(p: Partial<Plants> = {}, runs: string[] = []): Record<string, Group> {
  const v: Plants = { ...PLANTS, ...p };
  const site = (leg: 'node' | 'chromium'): Samples => {
    const s: Samples = {};
    for (const f of ['relief-60', 'relief-3000']) {
      if (leg === 'chromium') {
        s[`site:${f}:call`] = [v.siteChromiumCall];
        continue;
      }
      s[`site:${f}:gate`] = [v.siteGate];
      s[`site:${f}:call`] = [v.siteCall];
      s[`site:${f}:hydrology`] = [v.hydrology];
      for (const [st, ms] of Object.entries(v.siteStages)) s[`site:${f}:${st}`] = [ms];
    }
    return s;
  };
  const fusion: Samples = { 'fusion:gate': [v.fusionGate], 'fusion:call': [v.fusionCall] };
  for (const [st, ms] of Object.entries(v.fusionStages)) fusion[`fusion:${st}`] = [ms];
  return {
    insert: planted('insert', [{ samples: { insert: [v.insert] } }], runs),
    splitFace: planted('splitFace', [{ samples: { splitFace: [v.splitFace] }, extra: { refusedOrSetup: 0 } }], runs),
    corridorUnion: planted('corridorUnion', [{ samples: { 'corridorUnion:district': [v.district], 'corridorUnion:city': [v.city] }, extra: { refused: 0 } }], runs),
    s11: planted('s11', [{ samples: { s11: v.s11 }, extra: { workloadFile: 'bench/src/fuzz-bar/s11Workload.ts', callList: S11_CALLS } }], runs),
    skeleton: planted('skeleton', [{ samples: { 'skeleton:roof': [v.roof] } }, { samples: { 'skeleton:spine': [v.spine] } }], runs),
    streamKey: planted('streamKey', [{ samples: { streamKey: [v.streamKey] } }], runs),
    digest: planted('digest', [{ samples: { 'digest:share': [v.share], 'digest:finalise': [v.finalise], 'digest:recompute': [v.recompute] } }], runs),
    matching: planted(
      'matching',
      [{ samples: { 'matching:synthetic:point': [v.point], 'matching:synthetic:overlap': [v.overlap], 'matching:pairs:point': [v.point], 'matching:pairs:overlap': [v.overlap] } }],
      runs,
    ),
    'fusion:node': planted('fusion:node', [{ samples: fusion }], runs),
    'fusion:chromium': planted('fusion:chromium', [{ samples: { 'fusion:call': [v.fusionChromiumCall] }, leg: CHROMIUM }], runs),
    'site:node': planted('site:node', [{ samples: site('node') }], runs),
    'site:chromium': planted('site:chromium', [{ samples: site('chromium'), leg: CHROMIUM }], runs),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// the detector's readings

const SELF: ProcessRow = { pid: process.pid, ppid: 1, pcpu: 50, comm: 'node' };

/** A machine reading: this process, the rows given, a low load, AC power. */
export function machine(rows: ProcessRow[] = [], extra: Partial<MachineSample> = {}): MachineSample {
  return { at: '2026-10-27T00:00:00.000Z', loadAverage: 0.2, power: 'ac', selfPid: process.pid, processes: [SELF, ...rows], ...extra };
}

/** A python3 planted outside the harness's tree (a child of pid 1). */
export const PYTHON3: ProcessRow = { pid: 4_000_001, ppid: 1, pcpu: 0, comm: '/usr/bin/python3' };
/** A Chromium of the Playwright cache planted outside the harness's tree. */
export const CHROMIUM_ROW: ProcessRow = { pid: 4_000_002, ppid: 1, pcpu: 0, comm: '/Users/x/Library/Caches/ms-playwright/chromium-1223/chrome-mac/Chromium.app/Contents/MacOS/Chromium' };

/**
 * The detector judging a planted reading with M0-f-01's own rule (`judgeContention`), stamped `measured` as the
 * detector stamps a reading it took (the seam stands for the reading, C-0047); `seen` logs each call's options.
 */
export function detector(reading: () => MachineSample = () => machine(), seen: DetectOptions[] = [], referenceScore: number | null = null): (o: DetectOptions) => ContentionReport {
  return (o) => {
    seen.push(o);
    return judgeContention(reading(), { ownPids: o.ownPids, referenceScore, readings: 'measured', ...(o.checkLoad === undefined ? {} : { checkLoad: o.checkLoad }), ...(o.calibration === undefined ? {} : { calibration: o.calibration }) });
  };
}

/** A sleep that resolves at once and logs each wait (ms). */
export function sleeper(log: number[] = []): (ms: number) => Promise<void> {
  return (ms) => {
    log.push(ms);
    return Promise.resolve();
  };
}

/** A sampler stub: logs its start period and stop; its stop returns `samples`. */
export function watcher(log: string[] = [], samples: MachineSample[] = [machine(), machine()]): (everyMs: number) => Promise<Sampler> {
  return (everyMs) => {
    log.push(`start ${String(everyMs)}`);
    return Promise.resolve({
      stop: () => {
        log.push('stop');
        return Promise.resolve(samples);
      },
    });
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// the fixture tier manifest (C-0105's form: a temporary plat/-shaped tree, trivial jobs, planted unit durations)

/** A temporary tree holding `files`. */
export function tree(files: Record<string, string>): string {
  const root = scratch();
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, p)), { recursive: true });
    writeFileSync(join(root, p), text);
  }
  return root;
}

export function job(name: string, units: string[], extra: Partial<Job> = {}): Job {
  return { name, kind: 'command', source: 'scripts/ok.mjs', inputs: [], item: 'M0-zz-01', units: () => units.map((u) => ({ name: u, argv: ['fixture', name, u] })), ...extra };
}

/** The fixture manifests: PR (a 75 s unit, a drifting unit, a pending job), nightly and milestone (projected). */
export function fixtureManifest(tier: TierName, extraJobs: Job[] = []): TierManifest {
  if (tier === 'pr') {
    return {
      tier,
      budget: { ms: 900_000, cores: 8, projected: false },
      jobs: [
        job('lint', ['kernel', 'model']),
        job('long', ['long-unit']),
        job('drifty', ['drifty-unit']),
        job('deny-list scan', ['scan'], { inputs: ['packages/testkit/baselines/denylist.json'], item: 'M0-k-06', reviewedBy: ['M0-k-07'] }),
        ...extraJobs,
      ],
    };
  }
  return { tier, budget: { ms: tier === 'nightly' ? 14_400_000 : 43_200_000, cores: 16, projected: true }, jobs: [job(`${tier} work`, ['a', 'b']), ...extraJobs] };
}

/** The planted unit durations (ms): `long-unit` 75 s; everything else 10 s wall, 30 s CPU. */
export const DURATIONS: Record<string, { wallMs: number; cpuMs: number }> = { 'long-unit': { wallMs: 75_000, cpuMs: 75_000 }, kernel: { wallMs: 10_000, cpuMs: 30_000 }, model: { wallMs: 20_000, cpuMs: 40_000 } };

/**
 * The planted executor and calibrate pair: each unit's figures from DURATIONS; calibrate answers 100 before a unit and,
 * after one, 101 — or `drift(unit)` when it plants a drift for that unit.
 */
export function plantedTiming(drift: (unit: string, n: number) => number | null = () => null, calls: Unit[] = []): { exec: Executor; calibrate: () => number; scores: number[] } {
  let after = false;
  let last = '';
  const seen = new Map<string, number>();
  const scores: number[] = [];
  let pid = 4_100_000;
  return {
    exec: (unit, ctx): Promise<UnitRun> => {
      calls.push(unit);
      ctx.onSpawn?.(pid++);
      after = true;
      last = unit.name;
      seen.set(unit.name, (seen.get(unit.name) ?? 0) + 1);
      const d = DURATIONS[unit.name] ?? { wallMs: 10_000, cpuMs: 30_000 };
      return Promise.resolve({ code: 0, wallMs: d.wallMs, cpuMs: d.cpuMs });
    },
    calibrate: () => {
      let s = 100;
      if (after) {
        after = false;
        s = drift(last, seen.get(last) ?? 0) ?? 101;
      }
      scores.push(s);
      return s;
    },
    scores,
  };
}

/** The fixture tier context of a test: the tree, the manifests, the planted timing, built readings (no idle). */
export function tierSeams(drift?: (unit: string, n: number) => number | null, extraJobs: Job[] = []): { tiers: NonNullable<PhaseContext['tiers']>; calls: Unit[]; scores: number[] } {
  const root = tree({ 'scripts/ok.mjs': 'process.exit(0);\n' });
  const calls: Unit[] = [];
  const t = plantedTiming(drift, calls);
  return {
    tiers: {
      root,
      manifest: (tier) => fixtureManifest(tier, tier === 'pr' ? extraJobs : []),
      options: { exec: t.exec, calibrate: t.calibrate, referenceScore: 100, machine: () => machine(), sampler: watcher(), host: HOST, idleMs: 0 },
    },
    calls,
    scores: t.scores,
  };
}

/** A whole fixture context: fixture bars, the fixture tiers, a quiet planted detector, scratch paths, the token. */
export function fixtureContext(extra: Partial<PhaseContext> & { plants?: Partial<Plants>; runs?: string[]; sleeps?: number[]; watchLog?: string[] } = {}): PhaseContext & { dir: string; scorePath: string; recordPath: string; lines: string[] } {
  const { plants, runs, sleeps, watchLog, ...rest } = extra;
  const dir = scratch();
  const scorePath = scoreCopy(dir);
  const recordPath = join(dir, 'M0-timings.json');
  const lines: string[] = [];
  let cal = 0;
  return {
    out: join(dir, 'out'),
    env: { PLAT_TIMING_TOKEN: 'tok-fixture-1' },
    groups: fixtureGroups(plants, runs),
    detect: detector(),
    calibrate: () => (cal++ % 2 === 0 ? 100 : 101),
    host: () => HOST,
    sleep: sleeper(sleeps),
    referenceScorePath: scorePath,
    recordPath,
    tiers: tierSeams().tiers,
    watch: watcher(watchLog),
    log: (l) => void lines.push(l),
    dir,
    scorePath,
    lines,
    ...rest,
  };
}
