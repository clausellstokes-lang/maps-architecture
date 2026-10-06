// The tier runner's FIXTURE manifests and trees (C-0105: never a real tier). A fixture tree is a temporary folder
// shaped like plat/ (harness folders, vitest folders, scripts, declared inputs, reviewers' summaries); a fixture
// executor plants each unit's wall-clock, CPU time and exit code instead of spawning anything.
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { hostRecord, type HostRecord } from '../../src/host/index.js';
import type { MachineSample } from '../../src/timing/contention.js';
import type { Sampler } from '../../src/timing/sampler.js';
import type { Executor, Job, TierManifest, Unit, UnitRun } from '../../src/tiers/types.js';

export const RUN_INDEX = 'export function run(): number {\n  return 0;\n}\n';
export const EMPTY_INDEX = 'export {};\n';

const made: string[] = [];

/** A temporary tree holding `files` (path relative to the tree → content). */
export function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'plat-tiers-'));
  made.push(root);
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, p)), { recursive: true });
    writeFileSync(join(root, p), text);
  }
  return root;
}

export function write(root: string, path: string, text: string): void {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), text);
}

export function removeTrees(): void {
  for (const r of made.splice(0)) rmSync(r, { recursive: true, force: true });
}

export const sha = (text: string): string => createHash('sha256').update(text).digest('hex');

/** A trivial job: one unit per name in `units`, named after the job when none is given. */
export function job(name: string, extra: Partial<Job> & { unitNames?: string[] } = {}): Job {
  const { unitNames, ...rest } = extra;
  const j: Job = {
    name,
    kind: 'command',
    source: 'scripts/ok.mjs',
    inputs: [],
    item: 'M0-zz-09',
    units: (size) => (unitNames ?? [j.name]).map((u) => ({ name: u, argv: ['fixture', u, ...(size === null ? [] : [String(size)])] })),
    ...rest,
  };
  return j;
}

export function fixtureManifest(jobs: Job[], extra: Partial<TierManifest> = {}): TierManifest {
  return { tier: 'pr', budget: { ms: 1_000_000, cores: 8, projected: false }, jobs, ...extra };
}

export interface Planted {
  wallMs: number;
  cpuMs: number;
  code?: number;
}

/** An executor planting each unit's figures by unit name (default 1 000 ms wall, 2 000 ms CPU, exit 0); it logs every call. */
export function plantedExec(plants: Record<string, Planted> = {}, calls: Unit[] = []): Executor {
  let pid = 900_000;
  return (unit, ctx): Promise<UnitRun> => {
    calls.push(unit);
    ctx.onSpawn?.(pid++);
    const p = plants[unit.name] ?? { wallMs: 1_000, cpuMs: 2_000 };
    return Promise.resolve({ code: p.code ?? 0, wallMs: p.wallMs, cpuMs: p.cpuMs });
  };
}

/** A quiet machine reading (no other process, low load, AC power). */
export const quiet = (): MachineSample => ({
  at: '2026-10-06T00:00:00.000Z',
  loadAverage: 0.2,
  power: 'ac',
  selfPid: process.pid,
  processes: [{ pid: process.pid, ppid: 1, pcpu: 50, comm: 'node' }],
});

/** A sampler stub: logs its start and stop, returns `samples` from stop(). */
export function stubSampler(log: string[] = [], samples: MachineSample[] = []): (everyMs: number) => Promise<Sampler> {
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

/** A calibrate stub taking its scores from a queue (the last repeats when it runs dry); logs each call. */
export function scoreQueue(queue: number[], log: number[] = []): () => number {
  return () => {
    const s = queue.length > 1 ? (queue.shift() as number) : queue[0];
    log.push(s);
    return s;
  };
}

/** A calibrate stub cycling through its scores (before, after, before, after, …); logs each call. */
export function scoreCycle(scores: number[], log: number[] = []): () => number {
  let i = 0;
  return () => {
    const s = scores[i++ % scores.length];
    log.push(s);
    return s;
  };
}

export const HOST: HostRecord = hostRecord();

/** The built timing readings: no idle, a quiet machine, a stub sampler, reference score 100, the given calibrations cycling. */
export function readings(scores: number[], extra: { log?: string[]; calls?: number[] } = {}) {
  return {
    idleMs: 0,
    machine: quiet,
    sampler: stubSampler(extra.log ?? []),
    calibrate: scoreCycle(scores, extra.calls ?? []),
    referenceScore: 100,
    host: HOST,
  };
}
