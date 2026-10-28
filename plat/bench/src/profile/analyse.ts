// bench/src/profile/analyse.ts — R7's analyse.mjs as a module: one stage's CPU profile read through the generated
// sources' inline source maps. For the stage's window (only the samples inside its hrtime marks count; the marks and the
// profile share the monotonic clock): self time per function and per file, inclusive time per function and per file
// (each once per sample), the heaviest call path, the inclusive time of named functions, joint times ("A>B": samples
// with B on the stack below A), and — when the run stamped its cuts — the windows of W cuts: wall ms, ms a cut and the
// named functions' inclusive ms in each. Every time is µs inside, ms when printed.
import { shortPath, SourceMap } from './sourcemap.js';
import type { CallFrame, CpuProfile, ProfileRecord, Sources } from './types.js';

/** R7's named functions (analyse.mjs's --fns default), with putBack added: growth.ts's savepoint split reads it. */
export const NAMED_FNS: readonly string[] = 'ladderOn,kerbFace,kerbSeed,kerb,readKerb,readOn,censusRead,restagedRead,dryInsert,dryRegion,splitsOn,readFace,insertChain,rewalk,reparent,query,collect,gridCandidates,takeSavepoint,restoreSavepoint,opSave,putBack,rollback,splitFace,connectHole,tryCandidate,planCut,judge,mint,mintOne,relevant,makeBlock,junctionAt,spinePortals,pointLocate,(garbage collector)'.split(',');

export interface AnalyseOptions {
  /** The window's cut count (0: no windows). */
  readonly window: number;
  readonly fns?: readonly string[];
  readonly joint?: readonly string[];
  /** Drop every sample with this function name on its stack (the residual outside it; shares stay of the whole window). */
  readonly exclude?: string;
}

/** One window of W cuts (a cut: a splitFace or connectHole call; reads: kerb calls in kerbFace and kerbSeed). */
export interface Window {
  readonly w: number;
  readonly cuts: number;
  readonly reads: number;
  readonly wallMs: number;
  /** Inclusive ms of each named function in the window (by V8 function name). */
  readonly fns: Record<string, number>;
}

/** A ranked table: [key, µs]. */
export type Ranked = [string, number][];

export interface Analysis {
  readonly stage: string;
  /** The stage's hrtime mark (ms; the profiled run's, so it carries the profiler's overhead). */
  readonly stageMs: number;
  /** The window the shares are of (µs). */
  readonly totalUs: number;
  readonly samples: number;
  readonly enclosed: boolean;
  readonly self: Ranked;
  readonly selfFile: Ranked;
  readonly incl: Ranked;
  readonly inclFile: Ranked;
  readonly named: Record<string, number>;
  readonly heaviest: [string, number][];
  readonly joint: Record<string, number>;
  readonly windows: Window[] | null;
}

const add = (m: Map<string, number>, k: string, v: number): void => {
  m.set(k, (m.get(k) ?? 0) + v);
};
const ranked = (m: Map<string, number>): Ranked => [...m.entries()].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
const us = (ns: string): number => Number(BigInt(ns) / 1000n);

/** Analyses the stage window of one cpu run. */
export function analyse(rec: ProfileRecord, prof: CpuProfile, sources: Sources, opt: AnalyseOptions): Analysis {
  const fns = opt.fns ?? NAMED_FNS;
  const maps = new Map<string, SourceMap | null>();
  const mapOf = (id: string): SourceMap | null => {
    if (!maps.has(id)) {
      const s = sources[id];
      maps.set(id, s === undefined ? null : SourceMap.fromInline(s.source));
    }
    return maps.get(id) ?? null;
  };
  const frameKey = (cf: CallFrame): { key: string; file: string } => {
    const name = cf.functionName === '' ? '(anonymous)' : cf.functionName;
    if (cf.url === '' || cf.scriptId === '0') return { key: name, file: name };
    const m = cf.lineNumber < 0 ? null : mapOf(cf.scriptId);
    const o = m === null ? null : m.originalFor(cf.lineNumber + 1, cf.columnNumber);
    if (o !== null) {
      const file = shortPath(o.source);
      return { key: `${name} ${file}:${String(o.line)}`, file };
    }
    const file = shortPath(cf.url.replace(/^file:\/\//, ''));
    return { key: `${name} ${file}:${String(cf.lineNumber + 1)}(gen)`, file };
  };

  const nodes = new Map<number, CpuProfile['nodes'][number]>();
  const parent = new Map<number, number>();
  const keyOf = new Map<number, string>();
  const fileOf = new Map<number, string>();
  const nameOf = new Map<number, string>();
  for (const n of prof.nodes) {
    nodes.set(n.id, n);
    for (const c of n.children ?? []) parent.set(c, n.id);
    const k = frameKey(n.callFrame);
    keyOf.set(n.id, k.key);
    fileOf.set(n.id, k.file);
    nameOf.set(n.id, n.callFrame.functionName === '' ? '(anonymous)' : n.callFrame.functionName);
  }

  // the samples and their durations (µs): sample i lasts until sample i + 1
  const S = prof.samples;
  const ts: number[] = [];
  let t = prof.startTime;
  for (let i = 0; i < S.length; i += 1) {
    t += prof.timeDeltas[i];
    ts.push(t);
  }
  const dur = S.map((_, i) => (i + 1 < S.length ? ts[i + 1] : prof.endTime) - ts[i]);
  const mark = rec.marks[rec.stage];
  if (mark === undefined) throw new Error(`analyse: the record has no mark for ${rec.stage}`);
  const T0 = us(mark.t0);
  const T1 = us(mark.t1);
  for (let i = 0; i < S.length; i += 1) if (ts[i] < T0 || ts[i] >= T1) dur[i] = 0;
  const totalUs = T1 - T0;

  const stacks = new Map<number, number[]>();
  const stackOf = (id: number): number[] => {
    const hit = stacks.get(id);
    if (hit !== undefined) return hit;
    const out: number[] = [];
    for (let x: number | undefined = id; x !== undefined; x = parent.get(x)) out.push(x);
    out.reverse();
    stacks.set(id, out);
    return out;
  };
  const excl = opt.exclude ?? '';
  if (excl !== '') for (let i = 0; i < S.length; i += 1) if (stackOf(S[i]).some((x) => nameOf.get(x) === excl)) dur[i] = 0;

  const self = new Map<string, number>();
  const selfFile = new Map<string, number>();
  const incl = new Map<string, number>();
  const inclFile = new Map<string, number>();
  const inclName = new Map<string, number>();
  const nodeTotal = new Map<number, number>();
  for (let i = 0; i < S.length; i += 1) {
    const d = dur[i];
    if (d === 0) continue;
    add(self, keyOf.get(S[i]) ?? '?', d);
    add(selfFile, fileOf.get(S[i]) ?? '?', d);
    const seenK = new Set<string>();
    const seenF = new Set<string>();
    const seenN = new Set<string>();
    for (const x of stackOf(S[i])) {
      nodeTotal.set(x, (nodeTotal.get(x) ?? 0) + d);
      const k = keyOf.get(x) ?? '?';
      if (!seenK.has(k)) {
        seenK.add(k);
        add(incl, k, d);
      }
      const f = fileOf.get(x) ?? '?';
      if (!seenF.has(f)) {
        seenF.add(f);
        add(inclFile, f, d);
      }
      const nm = nameOf.get(x) ?? '?';
      if (!seenN.has(nm)) {
        seenN.add(nm);
        add(inclName, nm, d);
      }
    }
  }

  // the heaviest path: the heaviest child at each step while it holds ≥ 1 % of the window
  const heaviest: [string, number][] = [];
  let cur = prof.nodes[0]?.id;
  while (cur !== undefined) {
    const kids = nodes.get(cur)?.children ?? [];
    let best: number | undefined;
    for (const c of kids) if (best === undefined || (nodeTotal.get(c) ?? 0) > (nodeTotal.get(best) ?? 0)) best = c;
    if (best === undefined || (nodeTotal.get(best) ?? 0) < totalUs * 0.01) break;
    heaviest.push([keyOf.get(best) ?? '?', nodeTotal.get(best) ?? 0]);
    cur = best;
  }

  const joint: Record<string, number> = {};
  for (const j of opt.joint ?? []) {
    const [a, b] = j.split('>');
    let v = 0;
    for (let i = 0; i < S.length; i += 1) {
      const st = stackOf(S[i]);
      const ia = st.findIndex((x) => nameOf.get(x) === a);
      if (ia >= 0 && st.slice(ia + 1).some((x) => nameOf.get(x) === b)) v += dur[i];
    }
    joint[j] = v;
  }

  let windows: Window[] | null = null;
  if (opt.window > 0 && rec.cutStamps.length > 0) {
    const cutsT = rec.cutStamps.filter(([k]) => k === 'split' || k === 'hole').map(([, x]) => us(x));
    const reads = rec.cutStamps.filter(([k]) => k === 'kerbFace' || k === 'kerbSeed').map(([, x]) => us(x));
    const bounds = [T0];
    for (let i = opt.window; i < cutsT.length; i += opt.window) bounds.push(cutsT[i]);
    bounds.push(T1);
    const track = fns.filter((f) => f !== 'ladderOn');
    windows = [];
    for (let w = 0; w + 1 < bounds.length; w += 1) {
      const a = bounds[w];
      const b = bounds[w + 1];
      const per = new Map<string, number>();
      for (let i = 0; i < S.length; i += 1) {
        if (ts[i] < a || ts[i] >= b || dur[i] === 0) continue;
        const seenN = new Set<string>();
        for (const x of stackOf(S[i])) {
          const nm = nameOf.get(x) ?? '?';
          if (seenN.has(nm)) continue;
          seenN.add(nm);
          add(per, nm, dur[i]);
        }
      }
      windows.push({
        w,
        cuts: cutsT.filter((x) => x >= a && x < b).length,
        reads: reads.filter((x) => x >= a && x < b).length,
        wallMs: (b - a) / 1000,
        fns: Object.fromEntries(track.map((f) => [f, (per.get(f) ?? 0) / 1000])),
      });
    }
  }
  return {
    stage: rec.stage,
    stageMs: mark.ms,
    totalUs,
    samples: S.length,
    enclosed: prof.startTime <= T0 && prof.endTime >= T1,
    self: ranked(self),
    selfFile: ranked(selfFile),
    incl: ranked(incl),
    inclFile: ranked(inclFile),
    named: Object.fromEntries(fns.map((f) => [f, inclName.get(f) ?? 0])),
    heaviest,
    joint,
    windows,
  };
}

const ms = (u: number): string => (u / 1000).toFixed(0);

/** The printed tables (top N each), every figure with its unit and the run it came from. */
export function formatAnalysis(a: Analysis, top: number): string[] {
  const pc = (u: number): string => `${((100 * u) / a.totalUs).toFixed(1)} %`;
  const table = (title: string, rows: Ranked): string[] => [`## ${title}, top ${String(top)} (ms of profiled ${a.stage}, % of its window)`, ...rows.slice(0, top).map(([k, v], i) => `${String(i + 1)}\t${k}\t${ms(v)} ms\t${pc(v)}`)];
  const out = [
    `profile: ${a.stage} window ${ms(a.totalUs)} ms (profiled hrtime marks), ${String(a.samples)} samples, profile encloses the marks: ${String(a.enclosed)}`,
    ...table('self time by function', a.self),
    ...table('self time by file', a.selfFile),
    ...table('inclusive time by function', a.incl),
    ...table('inclusive time by file', a.inclFile),
    `## named functions, inclusive (by V8 function name, every definition; ms of profiled ${a.stage})`,
    ...Object.entries(a.named).map(([f, v]) => `${f}\t${ms(v)} ms\t${pc(v)}`),
    '## heaviest call path (the heaviest child at each step, ≥ 1 % of the window)',
    ...a.heaviest.map(([k, v]) => `${k}\t${pc(v)}`),
  ];
  if (Object.keys(a.joint).length > 0) out.push('## joint (B below A)', ...Object.entries(a.joint).map(([j, v]) => `${j}\t${ms(v)} ms\t${pc(v)}`));
  return out;
}

/** The window table: each window's cuts, reads, wall ms (profiled), ms a cut and the named functions' inclusive ms. */
export function formatWindows(ws: readonly Window[], window: number): string[] {
  if (ws.length === 0) return [];
  const track = Object.keys(ws[0].fns);
  return [
    `## windows of ${String(window)} cuts (a cut: a splitFace or connectHole call; reads: kerb calls in kerbFace and kerbSeed; wall ms and ms/cut of the profiled run; the named columns inclusive ms)`,
    ['win', 'cuts', 'reads', 'wall ms', 'ms/cut', ...track].join('\t'),
    ...ws.map((r) => [r.w, r.cuts, r.reads, r.wallMs.toFixed(0), r.cuts > 0 ? (r.wallMs / r.cuts).toFixed(1) : '-', ...track.map((f) => r.fns[f].toFixed(0))].join('\t')),
  ];
}
