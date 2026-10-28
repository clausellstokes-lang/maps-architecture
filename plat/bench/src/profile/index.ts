// bench/src/profile — the S8 profiler as a repo tool (AMENDMENTS-2026-10-28z item 990 (c), accepted J618; seat T1).
// R7's driver and analysers (plat/docs/build/checks/profile-s8-after-q18.md, APPENDIX) carried into the bench: bench
// code outside the model packages — it changes no model output. The record: plat/docs/build/checks/profile-tool.md.
//
//   corepack pnpm bench -- profile --seed N [--run fusion|integrated] [--stage S8] [--mode plain|cpu|count] [--cuts]
//                                  [--window N] [--out DIR] [--tag T] [--interval µs] [--top N] [--frame-ha N --walled-ha N]
//                                  [--no-cut-count] [--load-max L] [--load-wait S] [--fns a,b] [--joint A>B,C>D] [--exclude F]
//
// Builds the driver's production bundle (bundle.ts, PLAT_DEBUG_BUILD=false) into the output folder, waits for the idle
// box (load.ts: the one-minute load < --load-max, at most --load-wait s), runs the bundle as ONE child process (the
// load logged every 30 s while it runs), then reads its files: --mode plain prints the stage's wall-clock, the cuts
// counted and the ms a cut and the model root; --mode cpu also the top-N self and inclusive tables by function and by
// file and, with --window N, the windows of N cuts and their least-squares lines (growth.ts); --mode count the calls a
// cut (counts.ts); --cuts writes the per-cut log (<tag>.cuts.tsv). Output goes to --out, else
// $PLAT_BENCH_OUT/profile/<tag> (C-0067: never into plat/). Exit 0 on a run, 1 when the child fails, 64 on a bad argument.
import { spawn } from 'node:child_process';
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { outDir, say } from '../timing/output.js';
import { analyse, formatAnalysis, formatWindows } from './analyse.js';
import { buildBundle } from './bundle.js';
import { counts, formatCounts } from './counts.js';
import { driverArgv, type DriverArgs } from './driver.js';
import { formatGrowth, growthFits, growthRows } from './growth.js';
import { readLoad, showLoad, waitIdle, type Load } from './load.js';
import type { Coverage, CpuProfile, ProfileRecord, Sources } from './types.js';

export { analyse, formatAnalysis, formatWindows, NAMED_FNS, type Analysis, type AnalyseOptions, type Window } from './analyse.js';
export { counts, COUNT_FNS, formatCounts, type CountRow, type Counts } from './counts.js';
export { fit, formatGrowth, growthFits, growthRows, GROWTH_KEYS, type Fit, type GrowthRow } from './growth.js';
export { decodeVlq, SourceMap, shortPath } from './sourcemap.js';
export type { Coverage, CpuProfile, ProfileRecord, Sources } from './types.js';

export const USAGE = 'usage: corepack pnpm bench -- profile --seed N [--run fusion|integrated] [--stage S8] [--mode plain|cpu|count] [--cuts] [--window N] [--out DIR] [--tag T] [--interval µs] [--top N] [--frame-ha N --walled-ha N] [--no-cut-count] [--load-max L] [--load-wait S] [--fns a,b] [--joint A>B] [--exclude F]';

export interface ProfileArgs extends Omit<DriverArgs, 'out' | 'tag'> {
  readonly out: string | null;
  readonly tag: string | null;
  readonly window: number;
  readonly top: number;
  readonly loadMax: number;
  readonly loadWait: number;
  readonly fns: readonly string[] | null;
  readonly joint: readonly string[];
  readonly exclude: string;
}

const FLAGS = new Set(['--run', '--seed', '--stage', '--mode', '--window', '--out', '--tag', '--interval', '--top', '--frame-ha', '--walled-ha', '--load-max', '--load-wait', '--fns', '--joint', '--exclude']);
const SWITCHES = new Set(['--cuts', '--no-cut-count']);

/** The arguments, or the reason they are refused. */
export function parseArgs(args: readonly string[]): ProfileArgs | string {
  const v = new Map<string, string>();
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (SWITCHES.has(a)) continue;
    if (!FLAGS.has(a)) return `unknown argument ${JSON.stringify(a)}`;
    const x = args[i + 1];
    if (x === undefined || x.startsWith('--')) return `${a} needs a value`;
    if (v.has(a)) return `${a} given twice`;
    v.set(a, x);
    i += 1;
  }
  const num = (name: string, dflt: number | null, lo: number, hi: number, int = true): number | null | string => {
    const raw = v.get(name);
    if (raw === undefined) return dflt;
    const n = Number(raw);
    if (!Number.isFinite(n) || (int && !Number.isInteger(n)) || n < lo || n > hi) return `${name} ${JSON.stringify(raw)} is not ${int ? 'an integer' : 'a number'} in ${String(lo)} – ${String(hi)}`;
    return n;
  };
  const seed = num('--seed', null, 0, 2 ** 31 - 1);
  if (seed === null) return '--seed is required';
  const ints = { seed, window: num('--window', 0, 0, 100_000), interval: num('--interval', 500, 1, 1_000_000), top: num('--top', 20, 1, 1000), frameHa: num('--frame-ha', null, 1, 1_000_000), walledHa: num('--walled-ha', null, 1, 1_000_000), loadWait: num('--load-wait', 300, 0, 86_400) };
  for (const x of Object.values(ints)) if (typeof x === 'string') return x;
  const loadMax = num('--load-max', 0.3, 0, 1000, false);
  if (typeof loadMax === 'string') return loadMax;
  const run = v.get('--run') ?? 'fusion';
  if (run !== 'fusion' && run !== 'integrated') return `--run ${JSON.stringify(run)} is not fusion or integrated`;
  const mode = v.get('--mode') ?? 'plain';
  if (mode !== 'cpu' && mode !== 'plain' && mode !== 'count') return `--mode ${JSON.stringify(mode)} is not cpu, plain or count`;
  const stage = v.get('--stage') ?? 'S8';
  if (!/^S\d+[a-z]?$|^SKY$/.test(stage)) return `--stage ${JSON.stringify(stage)} is not a stage name (S8, S7b, SKY …)`;
  if ((ints.frameHa === null) !== (ints.walledHa === null)) return '--frame-ha and --walled-ha go together';
  if (ints.window !== 0 && mode !== 'cpu') return '--window goes with --mode cpu (the windows are of the profile)';
  const cuts = args.includes('--cuts');
  const cutCount = !args.includes('--no-cut-count');
  if (ints.window !== 0 && !cutCount && !cuts) return '--window needs the cut stamps (drop --no-cut-count)';
  const tag = v.get('--tag') ?? null;
  if (tag !== null && !/^[A-Za-z0-9._-]+$/.test(tag)) return `--tag ${JSON.stringify(tag)} is not a plain name`;
  return {
    run, seed: seed as number, stage, mode, interval: ints.interval as number, cuts, cutCount,
    frameHa: ints.frameHa as number | null, walledHa: ints.walledHa as number | null,
    out: v.get('--out') ?? null, tag, window: ints.window as number, top: ints.top as number,
    loadMax: loadMax as number, loadWait: ints.loadWait as number,
    fns: v.has('--fns') ? (v.get('--fns') ?? '').split(',').filter((x) => x !== '') : null,
    joint: (v.get('--joint') ?? '').split(',').filter((x) => x !== ''), exclude: v.get('--exclude') ?? '',
  };
}

/** The figures of a run's record: the stage's wall-clock, the cuts, the ms a cut (null without cuts). */
export function perCut(rec: ProfileRecord, cutsFromCoverage: number | null = null): { stageMs: number; cuts: number | null; msPerCut: number | null } {
  const stageMs = rec.marks[rec.stage]?.ms ?? NaN;
  const stamped = rec.armed.some((x) => x.startsWith('split@')) ? (rec.cutCounts.split ?? 0) + (rec.cutCounts.hole ?? 0) : null;
  const cuts = cutsFromCoverage ?? stamped;
  return { stageMs, cuts, msPerCut: cuts === null || cuts === 0 ? null : stageMs / cuts };
}

/** The per-cut log: every logpoint hit, its time since the stage's start and since the previous cut (ms). */
export function cutLog(rec: ProfileRecord): string {
  const t0 = BigInt(rec.marks[rec.stage]?.t0 ?? '0');
  let prev: bigint | null = null;
  let n = 0;
  const lines = ['kind\tcut#\tms since stage start\tms since previous cut'];
  for (const [k, t] of rec.cutStamps) {
    const at = BigInt(t);
    const isCut = k === 'split' || k === 'hole';
    if (isCut) n += 1;
    const since = (Number(at - t0) / 1e6).toFixed(3);
    lines.push(`${k}\t${isCut ? String(n) : ''}\t${since}\t${isCut && prev !== null ? (Number(at - prev) / 1e6).toFixed(3) : ''}`);
    if (isCut) prev = at;
  }
  return `${lines.join('\n')}\n`;
}

/** Runs the bundle as one child process, the load logged every 30 s to `loadlog`; resolves with its exit code and output. */
function runChild(bundle: string, argv: readonly string[], loadlog: string): Promise<{ code: number; stdout: string; stderr: string; maxLoad: number | null }> {
  return new Promise((done) => {
    let maxLoad: number | null = null;
    const sample = (): void => {
      const l = readLoad();
      if (l !== null) maxLoad = Math.max(maxLoad ?? 0, l[0]);
      appendFileSync(loadlog, `${new Date().toISOString()} ${showLoad(l)}\n`);
    };
    sample();
    const timer = setInterval(sample, 30_000);
    const child = spawn(process.execPath, [bundle, ...argv], { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (b: Buffer) => (stdout += b.toString('utf8')));
    child.stderr.on('data', (b: Buffer) => (stderr += b.toString('utf8')));
    child.on('close', (code) => {
      clearInterval(timer);
      sample();
      done({ code: code ?? 1, stdout, stderr, maxLoad });
    });
  });
}

const readJson = <T>(path: string): T => JSON.parse(readFileSync(path, 'utf8')) as T;

export async function run(args: string[], ctx: { out: string }): Promise<number> {
  const a = parseArgs(args);
  if (typeof a === 'string') {
    say(`profile: ${a}; ${USAGE}`);
    return 64;
  }
  const tag = a.tag ?? `${a.run}-${String(a.seed)}-${a.stage}-${a.mode}${a.cuts ? '-cuts' : ''}`;
  const dir = resolve(a.out ?? join(outDir(ctx.out), 'profile', tag));
  mkdirSync(dir, { recursive: true });

  const b = await buildBundle(join(dir, 'driver.mjs'));
  say(`profile: bundle ${b.outfile}: ${String(b.bytes)} bytes, errors ${String(b.errors)}, warnings ${String(b.warnings)}, __name ${String(b.keepNames)}, PLAT_DEBUG_BUILD ${b.debugFlagLeft ? 'LEFT IN (not a production bundle)' : 'defined false'}`);
  if (b.errors > 0) return 1;

  const before = await waitIdle(a.loadMax, a.loadWait, say);
  const loadNote = before.load === null ? 'load n/a (no /proc/loadavg)' : `load before ${showLoad(before.load)}${before.idle ? '' : ` — NOT IDLE (≥ ${String(a.loadMax)} after ${String(before.waitedS)} s; the figures are not the idle box's)`}`;
  say(`profile: ${new Date().toISOString()} ${loadNote}; running ${a.run} seed ${String(a.seed)}, ${a.stage} ${a.mode}${a.cuts ? ' + cuts' : ''} (one child process)`);
  const d: DriverArgs = { run: a.run, seed: a.seed, stage: a.stage, mode: a.mode, interval: a.interval, cuts: a.cuts, cutCount: a.cutCount, out: dir, tag, frameHa: a.frameHa, walledHa: a.walledHa };
  const loadlog = join(dir, `${tag}.loadlog`);
  writeFileSync(loadlog, '');
  const c = await runChild(b.outfile, driverArgv(d), loadlog);
  const after: Load | null = readLoad();
  say(`profile: load before ${showLoad(before.load)} → max during ${c.maxLoad === null ? 'n/a' : c.maxLoad.toFixed(2)} → after ${showLoad(after)} (one-minute; ${loadlog})`);
  if (c.code !== 0) {
    say(`profile: the driver exited ${String(c.code)}: ${c.stderr.trim().split('\n').slice(-3).join(' | ')}`);
    return 1;
  }
  const rec = readJson<ProfileRecord>(join(dir, `${tag}.json`));
  const src = a.mode === 'plain' ? 'plain: hrtime marks around the stage, no profiler' : a.mode === 'cpu' ? 'profiled: the CPU profiler on, its overhead included' : 'count mode: precise coverage on — never a timing';
  const sizeNote = a.frameHa === null ? 'CITY' : `test size ${String(a.frameHa)} ha / ${String(a.walledHa)} ha`;
  say(`profile: ${tag} (${sizeNote}; node ${rec.node}; production bundle: ${String(!rec.debugBuild)}) root ${rec.root}; lanes ${String(rec.lanes)}, blocks ${String(rec.blocks)}`);
  say(`profile: stages ms (${src}): ${Object.entries(rec.marks).map(([k, m]) => `${k} ${m.ms.toFixed(0)}`).join(' · ')}`);
  if (rec.armed.length > 0) say(`profile: logpoints armed ${String(rec.armed.length)}: ${rec.armed.map((x) => x.split(' ->')[0]).join(', ')}; hits ${JSON.stringify(rec.cutCounts)}`);

  let covCuts: number | null = null;
  if (a.mode === 'count') {
    const cov = readJson<Coverage>(join(dir, `${tag}.coverage.json`));
    const c2 = counts(cov, readJson<Sources>(join(dir, `${tag}.sources.json`)), a.fns ?? undefined);
    covCuts = c2.cuts;
    writeFileSync(join(dir, `${tag}.counts.json`), JSON.stringify({ tag, cuts: c2.cuts, named: c2.named, top: c2.rows.slice(0, 200) }, null, 1));
    for (const line of formatCounts(c2, a.top * 2)) say(`profile: ${line}`);
  }
  const p = perCut(rec, covCuts);
  say(`profile: ${a.stage} ${p.stageMs.toFixed(0)} ms wall-clock (${src}); cuts ${p.cuts === null ? 'not counted (the split logpoint was not armed)' : `${String(p.cuts)} (splitFace + connectHole calls, ${covCuts === null ? 'logpoints' : 'coverage'})`}; ${p.msPerCut === null ? 'ms a cut n/a' : `${p.msPerCut.toFixed(1)} ms a cut (${a.mode})`}`);

  if (a.mode === 'cpu') {
    const prof = readJson<CpuProfile>(join(dir, `${tag}.cpuprofile`));
    const an = analyse(rec, prof, readJson<Sources>(join(dir, `${tag}.sources.json`)), { window: a.window, ...(a.fns === null ? {} : { fns: a.fns }), joint: a.joint, exclude: a.exclude });
    for (const line of formatAnalysis(an, a.top)) say(`profile: ${line}`);
    let growth: unknown = null;
    if (an.windows !== null) {
      for (const line of formatWindows(an.windows, a.window)) say(`profile: ${line}`);
      const rows = growthRows(an.windows, a.window);
      const fits = growthFits(rows);
      for (const line of formatGrowth(rows, fits, a.window)) say(`profile: ${line}`);
      growth = { rows, fits };
    }
    writeFileSync(join(dir, `${tag}.analysis.json`), JSON.stringify({ tag, totalUs: an.totalUs, stageMs: an.stageMs, self: an.self.slice(0, 60), selfFile: an.selfFile.slice(0, 40), incl: an.incl.slice(0, 80), inclFile: an.inclFile.slice(0, 40), named: an.named, heaviest: an.heaviest, joint: an.joint, windows: an.windows, growth }, null, 1));
  }
  if (a.cuts) {
    writeFileSync(join(dir, `${tag}.cuts.tsv`), cutLog(rec));
    say(`profile: the per-cut log ${join(dir, `${tag}.cuts.tsv`)} (${String(rec.cutStamps.length)} logpoint hits)`);
  }
  say(`profile: files in ${dir}`);
  return 0;
}
