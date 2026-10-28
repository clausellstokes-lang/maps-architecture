// bench/src/profile/driver.ts — R7's driver.mts as the tool's child entry (AMENDMENTS-2026-10-28z item 990 (c); R7's
// plat/docs/build/checks/profile-s8-after-q18.md §1.2 and APPENDIX). index.ts bundles it (bundle.ts: the production
// bundle, PLAT_DEBUG_BUILD=false) and runs the bundle as ONE child process; nothing here runs on import.
//
// Runs the fusion harness's own single-seed entry `derive(run, seed)` (fusion/runs.ts) with every registered stage's
// `run` wrapped once more through derive's `plant` hook (before the harness's own `instrument`) by process.hrtime marks;
// the stage named by --stage is the profiled window.
//   --mode cpu    the inspector's Profiler (--interval µs sampling) started right before the stage, stopped right after
//   --mode plain  the marks only
//   --mode count  precise coverage with call counts, taken (and so reset) at every stage boundary; the stage's kept
//   cut logpoints (Debugger breakpoints whose condition records an hrtime stamp and returns false: no pause) at
//                 bentCutFabric.ts tryCandidate's `splitFace(run.o, fv.face, …)` and `connectHole(…)` — armed at the
//                 stage's start in cpu and plain modes (the cut count; off with --no-cut-count) — and, with --cuts,
//                 at `kerb(this.o, face, …)` (kerbFace) and `kerb(o, face, …)` (kerbSeed) too: the per-cut timeline.
// Output under --out: <tag>.json (ProfileRecord), <tag>.cpuprofile, <tag>.sources.json (the generated sources the
// profile or coverage names: their inline maps lead back to TypeScript), <tag>.coverage.json (count mode).
import inspector from 'node:inspector';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { stageText } from '@plat/kernel';
import type { PipelineStage } from '@plat/layout';
import { derive, type RunKind } from '../fusion/runs.js';
import type { Coverage, CpuProfile, CutKind, Mark, ProfileRecord, Sources } from './types.js';

/** The driver's arguments (index.ts passes them through; parsed again here so the child stands alone). */
export interface DriverArgs {
  readonly run: RunKind;
  readonly seed: number;
  readonly stage: string;
  readonly mode: 'cpu' | 'plain' | 'count';
  readonly interval: number;
  readonly cuts: boolean;
  readonly cutCount: boolean;
  readonly out: string;
  readonly tag: string;
  readonly frameHa: number | null;
  readonly walledHa: number | null;
}

/** The argument vector index.ts builds for the child. */
export function driverArgv(a: DriverArgs): string[] {
  return [
    '--run', a.run, '--seed', String(a.seed), '--stage', a.stage, '--mode', a.mode, '--interval', String(a.interval),
    '--out', a.out, '--tag', a.tag,
    ...(a.cuts ? ['--cuts'] : []), ...(a.cutCount ? [] : ['--no-cut-count']),
    ...(a.frameHa === null ? [] : ['--frame-ha', String(a.frameHa)]), ...(a.walledHa === null ? [] : ['--walled-ha', String(a.walledHa)]),
  ];
}

/** The child's own parse of driverArgv's vector. */
export function parseDriverArgv(argv: readonly string[]): DriverArgs {
  const get = (name: string): string | undefined => {
    const i = argv.indexOf(name);
    return i < 0 ? undefined : argv[i + 1];
  };
  const need = (name: string): string => {
    const v = get(name);
    if (v === undefined) throw new Error(`driver: ${name} is required`);
    return v;
  };
  const fh = get('--frame-ha');
  const wh = get('--walled-ha');
  return {
    run: need('--run') as RunKind,
    seed: Number(need('--seed')),
    stage: need('--stage'),
    mode: need('--mode') as DriverArgs['mode'],
    interval: Number(need('--interval')),
    cuts: argv.includes('--cuts'),
    cutCount: !argv.includes('--no-cut-count'),
    out: need('--out'),
    tag: need('--tag'),
    frameHa: fh === undefined ? null : Number(fh),
    walledHa: wh === undefined ? null : Number(wh),
  };
}

/** R7's logpoint sites, found by pattern in the generated source (esbuild may suffix a colliding name: run → run4). */
export const SITES: readonly { readonly kind: CutKind; readonly re: RegExp }[] = [
  { kind: 'split', re: /const r\d*\s*=\s*splitFace\d*\(\w+\.o,\s*fv\.face/ },
  { kind: 'hole', re: /const r\d*\s*=\s*connectHole\d*\(\w+\.o,\s*fv\.face/ },
  { kind: 'kerbFace', re: /const kr\d*\s*=\s*kerb\d*\(this\.o,\s*face/ },
  { kind: 'kerbSeed', re: /const kr\d*\s*=\s*kerb\d*\(o,\s*face/ },
];

/** A Hash128 (or any word array) as hex, as measure.ts prints the root. */
export function hex(h: Iterable<number> | undefined): string {
  return h === undefined ? '' : [...h].map((x) => (x >>> 0).toString(16).padStart(8, '0')).join('');
}

/** The build flag kernel/src/invariants/debug.ts reads; bundle.ts defines it false (the production bundle). */
declare const PLAT_DEBUG_BUILD: boolean | undefined;
const DEBUG_BUILD: boolean = typeof PLAT_DEBUG_BUILD === 'undefined' || PLAT_DEBUG_BUILD !== false;

/** Profiler.takePreciseCoverage's answer (the fields kept). */
interface RawCoverage {
  readonly result: readonly { readonly scriptId: string; readonly url: string; readonly functions: readonly { readonly functionName: string; readonly ranges: readonly { readonly startOffset: number; readonly count: number }[] }[] }[];
}

interface RawSession {
  post(method: string, params: object, cb: (e: Error | null, r: unknown) => void): void;
}

/** Runs one derivation under the given mode and writes its files. Returns the record. */
export function main(argv: readonly string[]): ProfileRecord {
  const a = parseDriverArgv(argv);
  mkdirSync(a.out, { recursive: true });
  const session = new inspector.Session();
  session.connect();
  const raw = session as unknown as RawSession;
  /** session.post, synchronous for the in-thread session (asserted: the callback ran before post returned). */
  function post<T = Record<string, unknown>>(method: string, params: object = {}): T {
    let done = false;
    let res: unknown;
    let error: Error | null = null;
    raw.post(method, params, (e, r) => {
      done = true;
      error = e;
      res = r;
    });
    if (!done) throw new Error(`driver: ${method} did not answer synchronously`);
    if (error !== null) throw error as Error;
    return res as T;
  }

  const now = (): bigint => process.hrtime.bigint();
  const marks: Record<string, Mark> = {};
  const scripts = new Map<string, string>();
  session.on('Debugger.scriptParsed', (m: { params: { scriptId: string; url: string } }) => {
    scripts.set(m.params.scriptId, m.params.url);
  });
  if (a.mode === 'count') {
    post('Profiler.enable');
    post('Profiler.startPreciseCoverage', { callCount: true, detailed: false });
  }
  const stamps: [CutKind, bigint][] = [];
  (globalThis as unknown as { __platProfileCut: (k: CutKind) => void }).__platProfileCut = (k) => {
    stamps.push([k, process.hrtime.bigint()]);
  };
  const kinds: CutKind[] = a.mode === 'count' ? [] : [...(a.cutCount || a.cuts ? (['split', 'hole'] as const) : []), ...(a.cuts ? (['kerbFace', 'kerbSeed'] as const) : [])];

  function arm(): string[] {
    if (kinds.length === 0) return [];
    post('Debugger.enable');
    const armed: string[] = [];
    for (const [id, url] of scripts) {
      if (url === '' || url.startsWith('node:') || url.includes('/node_modules/')) continue;
      const src = post<{ scriptSource: string }>('Debugger.getScriptSource', { scriptId: id }).scriptSource;
      for (const site of SITES) {
        if (!kinds.includes(site.kind)) continue;
        const m = site.re.exec(src);
        if (m === null) continue;
        const before = src.slice(0, m.index);
        const line = before.split('\n').length - 1;
        const col = m.index - (before.lastIndexOf('\n') + 1);
        const r = post<{ actualLocation: unknown }>('Debugger.setBreakpoint', { location: { scriptId: id, lineNumber: line, columnNumber: col }, condition: `globalThis.__platProfileCut(${JSON.stringify(site.kind)}), false` });
        armed.push(`${site.kind}@${url.split('/').pop() ?? url}:${String(line + 1)}:${String(col)} -> ${JSON.stringify(r.actualLocation)}`);
      }
    }
    return armed;
  }

  // set inside the planted stage's run (a holder, so the type is not narrowed to its initial null)
  const got: { profile: CpuProfile | null; coverage: RawCoverage | null } = { profile: null, coverage: null };
  let armed: string[] = [];
  let seen = 0;
  const t0 = now();
  const d = derive(a.run, a.seed, {
    ...(a.frameHa === null ? {} : { frameHa: a.frameHa }),
    ...(a.walledHa === null ? {} : { walledHa: a.walledHa }),
    plant(registry) {
      const product = registry.products.get('base');
      if (product === undefined) throw new Error('driver: the registry holds no base product');
      product.stages.forEach((s, i) => {
        const name = stageText(s.id);
        const orig = s.run;
        product.stages[i] = {
          ...s,
          run(input: unknown, ctx: unknown) {
            const mine = name === a.stage;
            if (mine) seen += 1;
            if (a.mode === 'count') post('Profiler.takePreciseCoverage'); // the reset at the stage boundary
            if (mine) armed = arm();
            if (mine && a.mode === 'cpu') {
              post('Profiler.enable');
              post('Profiler.setSamplingInterval', { interval: a.interval });
              post('Profiler.start');
            }
            const t = now();
            const r = (orig as (i: unknown, c: unknown) => unknown).call(s, input, ctx);
            const u = now();
            if (mine && a.mode === 'cpu') got.profile = post<{ profile: CpuProfile }>('Profiler.stop').profile;
            if (a.mode === 'count') {
              const c = post<RawCoverage>('Profiler.takePreciseCoverage');
              if (mine) got.coverage = c;
            }
            if (mine && kinds.length > 0) post('Debugger.disable');
            const key = marks[name] === undefined ? name : `${name}#${String(Object.keys(marks).length)}`;
            marks[key] = { t0: String(t), t1: String(u), ms: Number(u - t) / 1e6 };
            return r;
          },
        } as PipelineStage;
      });
    },
  });
  const t1 = now();
  if (seen === 0) throw new Error(`driver: the ${a.run} run registers no stage ${a.stage}`);

  const data = d.model.data as ReadonlyMap<string, unknown>;
  const len = (k: string): number | null => {
    const v = data.get(k);
    return Array.isArray(v) ? v.length : null;
  };
  const stageRoots: Record<string, string> = {};
  for (const [k, v] of d.model.stageRoots) stageRoots[String(k)] = hex(v as Iterable<number>);
  const cutCounts: Partial<Record<CutKind, number>> = {};
  for (const [k] of stamps) cutCounts[k] = (cutCounts[k] ?? 0) + 1;

  const prof = got.profile;
  const cov = got.coverage;
  const wanted = new Set<string>();
  if (prof !== null) for (const n of prof.nodes) if (n.callFrame.scriptId !== '0') wanted.add(n.callFrame.scriptId);
  if (cov !== null) for (const s of cov.result) if (s.functions.some((f) => f.ranges[0].count > 0)) wanted.add(s.scriptId);
  const sources: Record<string, { url: string; source: string }> = {};
  if (wanted.size > 0) {
    post('Debugger.enable');
    for (const id of wanted) {
      const url = scripts.get(id);
      if (url === undefined || url === '' || url.startsWith('node:')) continue;
      sources[id] = { url, source: post<{ scriptSource: string }>('Debugger.getScriptSource', { scriptId: id }).scriptSource };
    }
    post('Debugger.disable');
  }
  session.disconnect();

  const rec: ProfileRecord = {
    run: a.run, seed: a.seed, stage: a.stage, mode: a.mode, interval: a.interval, cuts: a.cuts,
    node: process.version, v8: process.versions.v8, debugBuild: DEBUG_BUILD,
    root: hex(d.model.root as Iterable<number> | undefined), stageRoots,
    marks, totalMs: Number(t1 - t0) / 1e6, lanes: len('lanes'), blocks: len('blocks'),
    cutCounts, armed, cutStamps: stamps.map(([k, t]) => [k, String(t)] as const),
  };
  writeFileSync(join(a.out, `${a.tag}.json`), JSON.stringify(rec, null, 1));
  if (prof !== null) writeFileSync(join(a.out, `${a.tag}.cpuprofile`), JSON.stringify(prof));
  if (cov !== null) {
    const kept: Coverage = cov.result
      .map((s) => ({ scriptId: s.scriptId, url: s.url, functions: s.functions.filter((f) => f.ranges[0].count > 0).map((f) => ({ functionName: f.functionName, start: f.ranges[0].startOffset, count: f.ranges[0].count })) }))
      .filter((s) => s.functions.length > 0);
    writeFileSync(join(a.out, `${a.tag}.coverage.json`), JSON.stringify(kept));
  }
  if (Object.keys(sources).length > 0) writeFileSync(join(a.out, `${a.tag}.sources.json`), JSON.stringify(sources satisfies Sources));
  return rec;
}
