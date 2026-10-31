// bench/src/tier-jobs/cli.ts — the tier jobs' own command (M0-f-02b; §13.8 *Edges*, §12.1; C-0067, C-0088, C-0097,
// C-0099, C-0105, C-0411 (4); the readings this item took: C-0447). Run from plat/ through tsx like the dispatcher:
//
//   corepack pnpm exec tsx --conditions=plat-source bench/src/tier-jobs/cli.ts <command> …
//
//   harness <name> [args…]        a bench harness run as the dispatcher runs it, with its numbers-only summary handed a
//                                 path under $PLAT_BENCH_OUT/summaries/ — so a harness that writes its summary on a bar
//                                 run writes nothing tracked into plat/ — and the committed summary checked unchanged
//                                 after it (changed: exit 1 naming it)
//   watch --deadline-ms N -- <argv…>
//                                 <argv> in its own process group, stopped at the deadline (exit 124)
//   edge --deadline-ms N -- <vitest argv…>
//                                 one edge-suite test file's vitest run, its outcomes logged to
//                                 $PLAT_BENCH_OUT/edge-suite/<file>.jsonl (PLAT_EDGE_LOG), stopped at the deadline
//   edge-hangs --hang-ms N        the post-hoc hang attribution (checks/M0-x-06-notes.md row 10): every built fixture
//                                 the logs never saw return is replayed seed by seed, each seed given N ms, and the
//                                 first seed that does not return is named; exit 0 when every built fixture returned
//   edge-replay <fixture> <n>     the attribution's child: the fixture's first n seeds, one progress line each
//   same-summary <item>           the x-05 notes' row 5: the summary a harness just wrote under
//                                 $PLAT_BENCH_OUT/summaries/<item>.json equals the committed
//                                 docs/build/summaries/<item>.json byte for byte, else exit 1 naming the first
//                                 differing key
//   summary --tier T --report F [--summary S]
//                                 the tier's section of docs/build/summaries/M0-f-02b.json from the TierReport F a real
//                                 `corepack pnpm tier:<T>` run wrote (numbers and names only; the report checked to be
//                                 this manifest's run, else refused)
//   receipt --tier T [--sample job=k,…] [--unit-cap-ms N] [--out D] [--summary S]
//                                 a real run of the tier's built jobs through the runner (plain mode), the jobs named in
//                                 --sample run on their first k units only and every unit stopped at the cap — the
//                                 receipt rule's PARTIAL form (the jobs that cannot finish inside a seat recorded by
//                                 their start, their first completed units and a projected wall-clock) — and its
//                                 section written; with neither option the receipt is whole
//
// Exit 64 on a bad argument. Nothing here runs a tier inside a tier or the timing phase (C-0088): `harness` refuses the
// tier entries and the timing-phase script.
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { runTier } from '../tiers/runner.js';
import type { HarnessProbe } from '../tiers/status.js';
import type { Executor, Job, TierManifest, TierName, TierReport, Unit } from '../tiers/types.js';
import { outDir, say } from '../timing/output.js';
import { EDGE_HANG_MS, manifest, TIER_CLI, tierCli } from './index.js';

/** plat/ (this file is bench/src/tier-jobs/cli.ts). */
export const PLAT_ROOT = fileURLToPath(new URL('../../../', import.meta.url));

/** This item's numbers-only summary (C-0067), relative to plat/. */
export const SUMMARY_FILE = 'docs/build/summaries/M0-f-02b.json';

/** The exit code of a run stopped at its deadline (the coreutils `timeout` convention). */
export const EXIT_DEADLINE = 124;

const TIERS: readonly TierName[] = ['pr', 'nightly', 'milestone'];

/** A harness entry of scripts/bench.mjs's map. */
export interface HarnessEntry {
  folder: string;
  item: string;
  args?: string[];
}

/** The names `harness` refuses: a tier or the timing phase never runs inside a tier (C-0088, C-0105). */
const NESTED = /^(tier:(pr|nightly|milestone)|timing-phase)$/;

/** The summary path a redirected harness writes: $PLAT_BENCH_OUT/summaries/<item>.json. */
export function redirectedSummary(out: string, item: string): string {
  return join(out, 'summaries', `${item}.json`);
}

/** The sha256 of a file's bytes, or null when it is absent. */
export function fileSha(path: string): string | null {
  return existsSync(path) ? createHash('sha256').update(readFileSync(path)).digest('hex') : null;
}

/** The dispatcher's harness map, read from the tree (scripts/bench.mjs exports it). */
export async function harnessMap(root: string): Promise<Record<string, HarnessEntry>> {
  const mod = (await import(pathToFileURL(join(root, 'scripts', 'bench.mjs')).href)) as { HARNESSES: Record<string, HarnessEntry> };
  return mod.HARNESSES;
}

export interface HarnessOptions {
  root?: string;
  out: string;
  /** The harness map (default scripts/bench.mjs's). */
  harnesses?: Record<string, HarnessEntry>;
  /** Loads a harness index (default a dynamic import). */
  load?: (indexPath: string) => Promise<Record<string, unknown>>;
  log?: (line: string) => void;
}

/**
 * Runs a bench harness as the dispatcher does — `run([...entry.args, ...args], ctx)` — with `ctx.summary` set under
 * `out`, so its numbers-only summary never lands in plat/; the stale redirected summary is removed first, and the
 * committed one (docs/build/summaries/<item>.json) is checked unchanged after the run: a harness that wrote it anyway
 * fails (exit 1) naming the file. Exit 64 for an unknown name or a tier entry, 2 for a harness that exports no `run`.
 */
export async function runRedirected(name: string, args: readonly string[], opts: HarnessOptions): Promise<number> {
  const root = opts.root ?? PLAT_ROOT;
  const log = opts.log ?? say;
  if (NESTED.test(name)) {
    log(`tier-jobs harness: ${name} would run a tier or the timing phase inside a tier (C-0088): refused`);
    return 64;
  }
  const map = opts.harnesses ?? (await harnessMap(root));
  const h = Object.hasOwn(map, name) ? map[name] : undefined;
  if (h === undefined) {
    log(`tier-jobs harness: unknown harness ${JSON.stringify(name)}`);
    return 64;
  }
  const summary = redirectedSummary(opts.out, h.item);
  rmSync(summary, { force: true });
  const committed = join(root, 'docs', 'build', 'summaries', `${h.item}.json`);
  const before = fileSha(committed);
  const index = join(root, 'bench', 'src', h.folder, 'index.ts');
  const mod = await (opts.load ?? ((p: string) => import(pathToFileURL(p).href) as Promise<Record<string, unknown>>))(index);
  const run = mod['run'];
  if (typeof run !== 'function') {
    log(`not built: ${h.item} (bench/src/${h.folder}/index.ts exports no run)`);
    return 2;
  }
  const code = (await (run as (a: string[], c: { out: string; summary: string }) => unknown)([...(h.args ?? []), ...args], { out: opts.out, summary })) as unknown;
  const after = fileSha(committed);
  if (after !== before) {
    log(`tier-jobs harness: ${name} changed the committed summary docs/build/summaries/${h.item}.json (sha256 ${String(before)} -> ${String(after)}): a tier job writes nothing tracked into plat/ (C-0411 (4))`);
    return 1;
  }
  return typeof code === 'number' ? code : 0;
}

/** The path of the first difference between two JSON values (`$.a[2].b`), or null when they are deep-equal. */
export function firstDifference(a: unknown, b: unknown, path = '$'): string | null {
  if (a === b) return null;
  if (typeof a !== typeof b || a === null || b === null || typeof a !== 'object') return path;
  if (Array.isArray(a) !== Array.isArray(b)) return path;
  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
      if (i >= a.length || i >= b.length) return `${path}[${String(i)}]`;
      const d = firstDifference(a[i], b[i], `${path}[${String(i)}]`);
      if (d !== null) return d;
    }
    return null;
  }
  const ao = a as Record<string, unknown>;
  const bo = b as Record<string, unknown>;
  const keys = [...Object.getOwnPropertyNames(ao)];
  for (const k of Object.getOwnPropertyNames(bo)) if (!keys.includes(k)) keys.push(k);
  for (const k of keys) {
    if (!Object.hasOwn(ao, k) || !Object.hasOwn(bo, k)) return `${path}.${k}`;
    const d = firstDifference(ao[k], bo[k], `${path}.${k}`);
    if (d !== null) return d;
  }
  return null;
}

/**
 * The x-05 notes' row 5: the summary written by this run (`fresh`) against the committed one, byte for byte. Exit 0
 * with both sha256s equal; else 1 naming the first differing key (or that the values agree and the bytes do not).
 */
export function sameSummary(item: string, opts: { root?: string; out: string }): { code: number; lines: string[] } {
  const committed = join(opts.root ?? PLAT_ROOT, 'docs', 'build', 'summaries', `${item}.json`);
  const fresh = redirectedSummary(opts.out, item);
  if (!existsSync(committed)) return { code: 1, lines: [`same-summary: the committed docs/build/summaries/${item}.json is missing (§13.8 Edges)`] };
  if (!existsSync(fresh)) return { code: 1, lines: [`same-summary: ${fresh} is missing: the run before this unit wrote no summary`] };
  const c = readFileSync(committed);
  const f = readFileSync(fresh);
  const cs = createHash('sha256').update(c).digest('hex');
  const fs = createHash('sha256').update(f).digest('hex');
  if (cs === fs) return { code: 0, lines: [`same-summary: ${item} reproduced byte for byte in a second process (sha256 ${cs})`] };
  let where: string;
  try {
    where = firstDifference(JSON.parse(c.toString('utf8')), JSON.parse(f.toString('utf8'))) ?? 'none: the values agree, the bytes do not (key order or layout)';
  } catch {
    where = 'unreadable JSON on one side';
  }
  return { code: 1, lines: [`same-summary: ${item} differs from the committed summary (sha256 ${cs} committed, ${fs} this run); first differing key ${where}`] };
}

export interface WatchResult {
  code: number;
  signal: NodeJS.Signals | null;
  timedOut: boolean;
  ms: number;
}

/**
 * Runs `argv` in its own process group with the output passed through, and stops the whole group (SIGTERM, then
 * SIGKILL after `graceMs`) when it outlasts `deadlineMs`. A signal sent to this process is passed to the group.
 */
export function watch(argv: readonly string[], opts: { deadlineMs: number; env?: NodeJS.ProcessEnv; cwd?: string; graceMs?: number; stdio?: 'inherit' | 'ignore' }): Promise<WatchResult> {
  return new Promise((resolve, reject) => {
    if (argv.length === 0) {
      reject(new Error('watch: an empty command line'));
      return;
    }
    const t0 = performance.now();
    const child = spawn(argv[0], argv.slice(1), { cwd: opts.cwd ?? PLAT_ROOT, env: opts.env ?? process.env, stdio: opts.stdio ?? 'inherit', detached: true });
    let timedOut = false;
    const killGroup = (sig: NodeJS.Signals): void => {
      try {
        if (child.pid !== undefined) process.kill(-child.pid, sig);
      } catch {
        // the group is gone already
      }
    };
    const timer = setTimeout(() => {
      timedOut = true;
      killGroup('SIGTERM');
      setTimeout(() => killGroup('SIGKILL'), opts.graceMs ?? 5_000).unref();
    }, opts.deadlineMs);
    const forward = (sig: NodeJS.Signals): void => killGroup(sig);
    process.on('SIGTERM', forward);
    process.on('SIGINT', forward);
    child.on('error', (e) => {
      clearTimeout(timer);
      process.off('SIGTERM', forward);
      process.off('SIGINT', forward);
      reject(e);
    });
    child.on('close', (code, signal) => {
      clearTimeout(timer);
      process.off('SIGTERM', forward);
      process.off('SIGINT', forward);
      resolve({ code: timedOut ? EXIT_DEADLINE : code ?? 128, signal, timedOut, ms: performance.now() - t0 });
    });
  });
}

/** The edge-suite log of one test file under `out`: edge-suite/<file>.jsonl. */
export function edgeLog(out: string, testFile: string): string {
  return join(out, 'edge-suite', `${basename(testFile)}.jsonl`);
}

/** The test file a vitest command line names (its last `*.test.ts` argument), or null. */
export function testFileOf(argv: readonly string[]): string | null {
  for (let i = argv.length - 1; i >= 0; i -= 1) if (/\.test\.ts$/.test(argv[i])) return argv[i];
  return null;
}

/**
 * One edge-suite unit: the vitest command under `watch`, with PLAT_EDGE_LOG set to the file's log (a stale one removed
 * first). Stopped at the deadline it exits 124 and says the hang is the post-hoc unit's to attribute.
 */
export async function edgeUnit(argv: readonly string[], opts: { out: string; deadlineMs: number; env?: NodeJS.ProcessEnv; log?: (line: string) => void; run?: typeof watch }): Promise<number> {
  const log = opts.log ?? say;
  const file = testFileOf(argv);
  if (file === null) {
    log('tier-jobs edge: the vitest command names no *.test.ts file');
    return 64;
  }
  const path = edgeLog(opts.out, file);
  mkdirSync(dirname(path), { recursive: true });
  rmSync(path, { force: true });
  const env = { ...(opts.env ?? process.env), PLAT_EDGE_LOG: path };
  const r = await (opts.run ?? watch)(argv, { deadlineMs: opts.deadlineMs, env });
  if (r.timedOut) log(`tier-jobs edge: ${file} stopped at its deadline of ${String(opts.deadlineMs)} ms with a run that never returned; the post-hoc unit names the fixture and the seed`);
  return r.code;
}

/** The fixture ids an edge-suite log folder saw return (each JSON line's `id`), and the logs read. */
export function loggedFixtures(dir: string): { ids: Set<string>; logs: number; unreadable: number } {
  const ids = new Set<string>();
  let logs = 0;
  let unreadable = 0;
  if (!existsSync(dir)) return { ids, logs, unreadable };
  for (const name of readdirSync(dir).filter((n) => n.endsWith('.jsonl')).sort()) {
    logs += 1;
    for (const line of readFileSync(join(dir, name), 'utf8').split('\n')) {
      if (line.trim() === '') continue;
      try {
        const v = JSON.parse(line) as { id?: unknown };
        if (typeof v.id === 'string') ids.add(v.id);
        else unreadable += 1;
      } catch {
        unreadable += 1;
      }
    }
  }
  return { ids, logs, unreadable };
}

/** A replay's outcome: the seeds that returned, those that threw, and the first that did not return in time. */
export interface ReplayResult {
  returned: number;
  crashed: number[];
  hang: { seed: number; ms: number } | null;
  /** The child's own exit (null while it was stopped for a hang). */
  code: number | null;
}

/**
 * Replays one fixture's seeds in a child (`edge-replay`) that prints `{"start":s}` before and `{"done":s,"ms":…}` (or
 * `{"crash":s}`) after each seed; a seed started and not done within `hangMs` stops the child's group and is named.
 */
export function replayFixture(id: string, seeds: number, opts: { hangMs: number; argv?: readonly string[]; env?: NodeJS.ProcessEnv; pollMs?: number }): Promise<ReplayResult> {
  return new Promise((resolve, reject) => {
    const argv = opts.argv ?? tierCli('edge-replay', id, String(seeds));
    const child = spawn(argv[0], argv.slice(1), { cwd: PLAT_ROOT, env: opts.env ?? process.env, stdio: ['ignore', 'pipe', 'inherit'], detached: true });
    const res: ReplayResult = { returned: 0, crashed: [], hang: null, code: null };
    let current: { seed: number; at: number } | null = null;
    let buf = '';
    child.stdout.on('data', (chunk: Buffer) => {
      buf += chunk.toString('utf8');
      let nl = buf.indexOf('\n');
      while (nl >= 0) {
        const line = buf.slice(0, nl);
        buf = buf.slice(nl + 1);
        nl = buf.indexOf('\n');
        let v: { start?: number; done?: number; crash?: number };
        try {
          v = JSON.parse(line) as typeof v;
        } catch {
          continue;
        }
        if (typeof v.start === 'number') current = { seed: v.start, at: performance.now() };
        else if (typeof v.done === 'number') {
          res.returned += 1;
          current = null;
        } else if (typeof v.crash === 'number') {
          res.crashed.push(v.crash);
          current = null;
        }
      }
    });
    const timer = setInterval(() => {
      if (current !== null && res.hang === null && performance.now() - current.at > opts.hangMs) {
        res.hang = { seed: current.seed, ms: Math.round(performance.now() - current.at) };
        try {
          if (child.pid !== undefined) process.kill(-child.pid, 'SIGKILL');
        } catch {
          // gone already
        }
      }
    }, opts.pollMs ?? Math.max(10, Math.min(1_000, Math.floor(opts.hangMs / 4))));
    child.on('error', (e) => {
      clearInterval(timer);
      reject(e);
    });
    child.on('close', (code) => {
      clearInterval(timer);
      res.code = res.hang === null ? code : null;
      resolve(res);
    });
  });
}

/** An edge fixture as the attribution reads it (@plat/testkit's EdgeFixture, its id, milestone and run). */
export interface FixtureLike {
  id: string;
  milestone?: string;
  run(seed: number): unknown;
}

/**
 * The post-hoc hang attribution (checks/M0-x-06-notes.md row 10): a fixture that never returned leaves no line in the
 * logs (support.ts writes a fixture's lines once its run returns), so every BUILT fixture missing from the logs is
 * replayed seed by seed and the first seed that does not return within `hangMs` is named; replaying stops at the first
 * hang (the fixtures after it are listed, not replayed). Exit 0 when every built fixture is in the logs; 1 otherwise —
 * a named hang, or a fixture missing from the logs whose replay returned on every seed (its unit's own failure).
 */
export async function edgeHangs(opts: {
  out: string;
  hangMs: number;
  seeds: number;
  fixtures: readonly FixtureLike[];
  replay?: (id: string, seeds: number, hangMs: number) => Promise<ReplayResult>;
  log?: (line: string) => void;
}): Promise<number> {
  const log = opts.log ?? say;
  const dir = join(opts.out, 'edge-suite');
  const { ids, logs, unreadable } = loggedFixtures(dir);
  const built = opts.fixtures.filter((f) => f.milestone === undefined);
  if (built.length === 0) {
    log('tier-jobs edge-hangs: no built fixture (§13.8 Edges: an empty fixture set fails naming it)');
    return 1;
  }
  if (logs === 0) {
    log(`tier-jobs edge-hangs: no edge-suite log under ${dir}: the edge units wrote none`);
    return 1;
  }
  const missing = built.filter((f) => !ids.has(f.id));
  if (unreadable > 0) log(`tier-jobs edge-hangs: ${String(unreadable)} unreadable log line(s)`);
  if (missing.length === 0) {
    log(`tier-jobs edge-hangs: every built fixture (${String(built.length)}) returned in the logs (${String(logs)} file(s)): no unattributed hang`);
    return unreadable > 0 ? 1 : 0;
  }
  log(`tier-jobs edge-hangs: ${String(missing.length)} built fixture(s) never returned in the logs: ${missing.map((f) => f.id).join(', ')}`);
  const replay = opts.replay ?? ((id: string, n: number, hangMs: number) => replayFixture(id, n, { hangMs }));
  for (let i = 0; i < missing.length; i += 1) {
    const f = missing[i];
    const r = await replay(f.id, opts.seeds, opts.hangMs);
    if (r.hang !== null) {
      log(`tier-jobs edge-hangs: ${f.id} at seed ${String(r.hang.seed)}: no return in ${String(r.hang.ms)} ms (a hang, over ${String(opts.hangMs)} ms) after ${String(r.returned)} seed(s) returned`);
      const rest = missing.slice(i + 1).map((x) => x.id);
      if (rest.length > 0) log(`tier-jobs edge-hangs: not replayed after the hang: ${rest.join(', ')}`);
      return 1;
    }
    log(`tier-jobs edge-hangs: ${f.id} replayed on ${String(opts.seeds)} seed(s): ${String(r.returned)} returned, ${String(r.crashed.length)} threw${r.crashed.length > 0 ? ` (seeds ${r.crashed.slice(0, 5).join(', ')}${r.crashed.length > 5 ? ', …' : ''})` : ''}; no hang — its unit's own failure`);
  }
  return 1;
}

/** The attribution's child: a fixture's first `n` seeds, one progress line each on stdout (the protocol above). */
export async function edgeReplay(id: string, n: number, write: (line: string) => void = (l) => void process.stdout.write(`${l}\n`)): Promise<number> {
  const { EDGE_FIXTURES, edgeSeeds } = await import('@plat/testkit');
  const f = EDGE_FIXTURES.find((x) => x.id === id);
  if (f === undefined) {
    write(JSON.stringify({ error: `no edge fixture ${id}` }));
    return 64;
  }
  for (const seed of edgeSeeds(id, n)) {
    write(JSON.stringify({ start: seed }));
    const t0 = performance.now();
    try {
      f.run(seed);
    } catch {
      write(JSON.stringify({ crash: seed }));
      continue;
    }
    write(JSON.stringify({ done: seed, ms: Math.round(performance.now() - t0) }));
  }
  return 0;
}

/** The units a job runs at its effective size, or null when it gives none (a declared entry's units throw). */
async function unitsOf(job: Job): Promise<Unit[] | null> {
  try {
    return await job.units(job.size?.n ?? null);
  } catch {
    return null;
  }
}

/** A digest of a manifest's job list: each job's fields and its units' names, command lines and variables. */
export async function manifestDigest(m: TierManifest): Promise<string> {
  const rows: unknown[] = [];
  for (const j of m.jobs) {
    const us = await unitsOf(j);
    rows.push([j.name, j.kind, j.source, j.inputs, j.reviewedBy ?? [], j.item, j.stagedTo ?? null, j.size ?? null, j.suites ?? [], us === null ? null : us.map((u) => [u.name, u.argv, u.env ?? {}])]);
  }
  return createHash('sha256').update(JSON.stringify([m.tier, m.budget, rows])).digest('hex');
}

/** A sampled job of a PARTIAL receipt: its first `k` units of `total`. */
export interface Sampled {
  job: string;
  k: number;
  total: number;
}

/** The checks a report must pass to be this manifest's run: the same jobs in order, each run job's units its own. */
export async function reportProblems(report: TierReport, m: TierManifest, sampled: readonly Sampled[] = []): Promise<string[]> {
  const out: string[] = [];
  if (report.tier !== m.tier) out.push(`the report is tier ${String(report.tier)}'s, not ${m.tier}'s`);
  const names = m.jobs.map((j) => j.name);
  const got = report.jobs.map((j) => j.name);
  if (JSON.stringify(names) !== JSON.stringify(got)) out.push(`the report's jobs ${JSON.stringify(got)} are not the manifest's ${JSON.stringify(names)}`);
  for (const rj of report.jobs) {
    if (rj.units.length === 0) continue;
    const job = m.jobs.find((j) => j.name === rj.name);
    if (job === undefined) continue;
    const us = await (async () => {
      try {
        return await job.units(rj.size);
      } catch {
        return null;
      }
    })();
    const want = us === null ? null : us.map((u) => u.name);
    const s = sampled.find((x) => x.job === rj.name);
    const ran = rj.units.map((u) => u.unit);
    const expected = want === null ? null : s === undefined ? want : want.slice(0, s.k);
    if (expected === null || JSON.stringify(ran) !== JSON.stringify(expected)) out.push(`job ${rj.name}: the units run ${JSON.stringify(ran)} are not the manifest's ${JSON.stringify(expected)}`);
  }
  return out;
}

/** The section a tier's run gives the summary: numbers, names and statuses only (C-0067). */
export function tierSection(report: TierReport, run: { reportSha256: string; manifestDigest: string; source: string }, partial: { reason: string; sampled: readonly Sampled[]; capMs: number | null } | null): Record<string, unknown> {
  const jobs = report.jobs.map((j) => {
    const s = partial?.sampled.find((x) => x.job === j.name);
    const finished = j.units.filter((u) => u.code !== 124);
    const mean = finished.length === 0 ? null : finished.reduce((a, u) => a + u.wallMs, 0) / finished.length;
    return {
      name: j.name,
      item: j.item,
      status: j.status,
      outcome: j.outcome,
      size: j.size,
      unitsRun: j.units.length,
      ...(s === undefined ? {} : { unitsTotal: s.total, projectedWallMs: mean === null ? null : Math.round(mean * s.total) }),
      failedUnits: j.units.filter((u) => u.code !== 0).map((u) => ({ unit: u.unit, code: u.code })),
      wallMs: Math.round(j.wallMs),
      cpuMs: Math.round(j.cpuMs),
    };
  });
  return {
    run: { source: run.source, at: report.at, mode: report.mode, reportSha256: run.reportSha256, manifestDigest: run.manifestDigest },
    receipt: partial === null ? 'whole' : 'PARTIAL',
    partial: partial === null ? null : { reason: partial.reason, sampled: partial.sampled, unitCapMs: partial.capMs },
    verdict: report.verdict,
    endToEnd: report.endToEnd,
    counts: {
      jobs: report.jobs.length,
      run: report.jobs.filter((j) => j.units.length > 0).length,
      passed: report.jobs.filter((j) => j.outcome === 'pass').length,
      failed: report.jobs.filter((j) => j.outcome === 'fail').length,
      overBudget: report.jobs.filter((j) => j.outcome === 'over budget').length,
      pending: report.pending.length,
      notBuilt: report.notBuilt.length,
    },
    wallMs: Math.round(report.wallMs),
    cpuMs: Math.round(report.cpuMs),
    elapsedMs: Math.round(report.elapsedMs),
    budget: { ms: report.budget.ms, cores: report.budget.cores, basis: report.budget.basis, figureMs: Math.round(report.budget.figureMs), verdict: report.budget.verdict, gating: report.budget.gating },
    authority: report.authority ?? 'contended',
    jobs,
    pending: report.pending.map((p) => ({ name: p.name, status: p.status, file: p.file })),
    notBuilt: report.notBuilt.map((n) => ({ name: n.name, status: n.status })),
  };
}

/** Writes one tier's section into the summary (the other tiers' sections kept; a tier never run reads null). */
export function writeSection(summaryPath: string, tier: TierName, section: Record<string, unknown>): void {
  let prev: { tiers?: Record<string, unknown> } = {};
  try {
    prev = JSON.parse(readFileSync(summaryPath, 'utf8')) as typeof prev;
  } catch {
    prev = {};
  }
  const tiers: Record<string, unknown> = {};
  for (const t of TIERS) tiers[t] = t === tier ? section : prev.tiers?.[t] ?? null;
  mkdirSync(dirname(summaryPath), { recursive: true });
  writeFileSync(summaryPath, `${JSON.stringify({ item: 'M0-f-02b', tiers }, null, 2)}\n`);
}

/** `--sample job=k,…` (a job name holds no comma); null on a malformed list. */
export function parseSample(text: string): Map<string, number> | null {
  const out = new Map<string, number>();
  for (const part of text.split(',')) {
    const eq = part.lastIndexOf('=');
    if (eq <= 0) return null;
    const k = part.slice(eq + 1);
    if (!/^[1-9][0-9]*$/.test(k)) return null;
    out.set(part.slice(0, eq), Number(k));
  }
  return out;
}

/**
 * A receipt's manifest: the jobs named in `sample` keep their first k units, and with a cap every unit runs under
 * `watch` (stopped at the cap, exit 124). Refuses a sampled name that is no job of the tier.
 */
export async function receiptManifest(m: TierManifest, sample: ReadonlyMap<string, number>, capMs: number | null): Promise<{ manifest: TierManifest; sampled: Sampled[] } | string> {
  for (const name of sample.keys()) if (!m.jobs.some((j) => j.name === name)) return `--sample names no job of tier ${m.tier}: ${JSON.stringify(name)}`;
  const sampled: Sampled[] = [];
  const jobs: Job[] = [];
  for (const j of m.jobs) {
    const k = sample.get(j.name);
    if (k !== undefined) {
      const all = await unitsOf(j);
      sampled.push({ job: j.name, k, total: all?.length ?? 0 });
    }
    jobs.push({
      ...j,
      units: async (size) => {
        const us = await j.units(size);
        const kept = k === undefined ? us : us.slice(0, k);
        return capMs === null ? kept : kept.map((u) => ({ ...u, argv: tierCli('watch', '--deadline-ms', String(capMs), '--', ...u.argv) }));
      },
    });
  }
  return { manifest: { ...m, jobs }, sampled };
}

function flag(args: readonly string[], name: string): string | undefined {
  const i = args.indexOf(name);
  return i < 0 ? undefined : args[i + 1];
}

const whole = (v: string | undefined): number | null => (v !== undefined && /^[1-9][0-9]*$/.test(v) ? Number(v) : null);

/** The command (see the header); its exit code. */
export async function main(argv: readonly string[], ctx: { out?: string; root?: string; exec?: Executor; probe?: HarnessProbe; log?: (line: string) => void } = {}): Promise<number> {
  const log = ctx.log ?? say;
  const out = outDir(ctx.out);
  const root = ctx.root ?? PLAT_ROOT;
  const [cmd, ...rest] = argv;
  const dash = rest.indexOf('--');
  switch (cmd) {
    case 'harness': {
      if (rest.length === 0) break;
      return runRedirected(rest[0], rest.slice(1), { root, out, log });
    }
    case 'watch':
    case 'edge': {
      const deadline = whole(flag(rest, '--deadline-ms'));
      if (deadline === null || dash < 0 || dash !== 2 || rest.length <= dash + 1) break;
      const child = rest.slice(dash + 1);
      if (cmd === 'edge') return edgeUnit(child, { out, deadlineMs: deadline, log });
      const r = await watch(child, { deadlineMs: deadline });
      if (r.timedOut) log(`tier-jobs watch: stopped at its deadline of ${String(deadline)} ms`);
      return r.code;
    }
    case 'edge-hangs': {
      const hangMs = whole(flag(rest, '--hang-ms')) ?? (rest.length === 0 ? EDGE_HANG_MS : null);
      if (hangMs === null || (rest.length !== 0 && rest.length !== 2)) break;
      const { EDGE_FIXTURES, edgeSeedCount } = await import('@plat/testkit');
      return edgeHangs({ out, hangMs, seeds: edgeSeedCount(), fixtures: EDGE_FIXTURES, log });
    }
    case 'edge-replay': {
      const n = whole(rest[1]);
      if (rest.length !== 2 || n === null) break;
      return edgeReplay(rest[0], n);
    }
    case 'same-summary': {
      if (rest.length !== 1) break;
      const r = sameSummary(rest[0], { root, out });
      for (const l of r.lines) log(l);
      return r.code;
    }
    case 'summary': {
      const tier = flag(rest, '--tier') as TierName | undefined;
      const reportPath = flag(rest, '--report');
      if (tier === undefined || !TIERS.includes(tier) || reportPath === undefined) break;
      const report = JSON.parse(readFileSync(reportPath, 'utf8')) as TierReport;
      const m = manifest(tier, root);
      const problems = await reportProblems(report, m);
      if (problems.length > 0) {
        for (const p of problems) log(`tier-jobs summary: refused: ${p}`);
        return 1;
      }
      const path = flag(rest, '--summary') ?? join(root, SUMMARY_FILE);
      const sha = fileSha(reportPath) ?? '';
      writeSection(path, tier, tierSection(report, { source: `corepack pnpm tier:${tier} (the runner's TierReport)`, reportSha256: sha, manifestDigest: await manifestDigest(m) }, null));
      log(`tier-jobs summary: tier ${tier}'s section written to ${path} from the report of ${report.at} (sha256 ${sha})`);
      return 0;
    }
    case 'receipt': {
      const tier = flag(rest, '--tier') as TierName | undefined;
      if (tier === undefined || !TIERS.includes(tier)) break;
      const sampleText = flag(rest, '--sample');
      const sample = sampleText === undefined ? new Map<string, number>() : parseSample(sampleText);
      const capText = flag(rest, '--unit-cap-ms');
      const capMs = capText === undefined ? null : whole(capText);
      if (sample === null || (capText !== undefined && capMs === null)) break;
      const m = manifest(tier, root);
      const rm = await receiptManifest(m, sample, capMs);
      if (typeof rm === 'string') {
        log(`tier-jobs receipt: ${rm}`);
        return 64;
      }
      const dir = flag(rest, '--out') ?? join(out, 'tiers', `${tier}-receipt`);
      const report = await runTier(rm.manifest, { root, out: dir, mode: 'plain', log, ...(ctx.exec === undefined ? {} : { exec: ctx.exec }), ...(ctx.probe === undefined ? {} : { probe: ctx.probe }) });
      const reportPath = join(dir, `${tier}.json`);
      mkdirSync(dir, { recursive: true });
      writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
      const partial = rm.sampled.length > 0 || capMs !== null;
      const reason = partial
        ? `the receipt rule (J319): ${rm.sampled.map((s) => `${s.job} on its first ${String(s.k)} of ${String(s.total)} unit(s)`).join('; ') || 'every job whole'}${capMs === null ? '' : `; every unit stopped at ${String(capMs)} ms (exit 124)`}`
        : '';
      const path = flag(rest, '--summary') ?? join(root, SUMMARY_FILE);
      const sha = fileSha(reportPath) ?? '';
      writeSection(path, tier, tierSection(report, { source: `bench/src/tier-jobs/cli.ts receipt --tier ${tier} (runTier, plain)`, reportSha256: sha, manifestDigest: await manifestDigest(m) }, partial ? { reason, sampled: rm.sampled, capMs } : null));
      for (const j of report.jobs) log(`receipt ${tier}: ${j.name} — ${j.status}: ${j.outcome} (${String(j.units.length)} unit(s), ${(j.wallMs / 1000).toFixed(1)} s wall)`);
      log(`receipt ${tier}: ${partial ? 'PARTIAL' : 'whole'}, verdict ${report.verdict}; report ${reportPath}; section written to ${path}`);
      return report.verdict === 'fail' ? 1 : 0;
    }
    default:
      break;
  }
  log(`tier-jobs: bad arguments ${JSON.stringify(argv)}; usage: corepack pnpm exec tsx --conditions=plat-source ${TIER_CLI} harness <name> [args…] | watch --deadline-ms N -- <argv…> | edge --deadline-ms N -- <vitest argv…> | edge-hangs [--hang-ms N] | edge-replay <fixture> <n> | same-summary <item> | summary --tier T --report F [--summary S] | receipt --tier T [--sample job=k,…] [--unit-cap-ms N] [--out D] [--summary S]`);
  return 64;
}

/** Is this module the script node was started with (real paths compared)? */
function isMain(): boolean {
  if (process.argv[1] === undefined) return false;
  try {
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isMain()) {
  const code = await main(process.argv.slice(2));
  process.exit(code);
}
