// The contention detector (§12.1's timing phase; C-0047, widened by C-0103, `ownPids` by C-0082): whether a timing is
// AUTHORITATIVE or CONTENDED is MEASURED, never declared. A sample is contended when
//   * the reference score is null ("no reference score", C-0075), or was taken with another calibrate version;
//   * the 1-minute load average is above 1.5 (the before-batch clause);
//   * the process table (`ps -axo pid,ppid,pcpu,comm`) holds, outside the harness's own process tree, a process of the
//     kinds browser (Google Chrome, Chromium, Firefox, WebKit, Safari, their helpers, Playwright's builds), node,
//     python / python3, bench, tsc, vitest or esbuild, or ANY other process at ≥ 10 % CPU — every process on the
//     machine, M-1's Chrome sessions and Python measurements among them, each offender named in `reasons`;
//   * the machine is not on AC power (`pmset -g batt`);
//   * a batch's two calibrate scores differ by more than 5 % (when the caller passes them).
// The harness's own process tree is this process, the `ownPids` and their descendants (the timing phase's own
// Chromium leg, C-0082); the detector's own probes (the ps, pmset and sysctl it runs) are this process's children and
// never offenders. This process's ancestors — the launch chain (the shell, corepack, pnpm, tsx) — and the source
// loader's esbuild service (tsx runs the bench from source, C-0059, through an esbuild child of this process) are exempt
// from the kind clause only: either at ≥ 10 % CPU still contends (C-0138).
import { execFileSync } from 'node:child_process';
import { loadavg } from 'node:os';
import { NO_REFERENCE_SCORE, readReferenceScore } from '../host/index.js';
import { CALIBRATE_VERSION } from '../calibrate/kernels.js';
import { scoreDrift } from '../calibrate/calibrate.js';

export type Authority = 'authoritative' | 'contended';

/** One row of `ps -axo pid,ppid,pcpu,comm`. */
export interface ProcessRow {
  pid: number;
  ppid: number;
  pcpu: number;
  comm: string;
}

export type PowerSource = 'ac' | 'battery' | 'unknown';

/** One reading of the machine: what the detector judges. */
export interface MachineSample {
  at: string;
  /** The 1-minute load average. */
  loadAverage: number;
  processes: ProcessRow[];
  power: PowerSource;
  /** The pid of the process that took the sample (the harness). */
  selfPid: number;
}

export interface Offender {
  pid: number;
  /** The kind (`node`, `python3`, `chromium`, …) or, for the CPU clause, the executable's name. */
  name: string;
  comm: string;
  pcpu: number;
  clause: 'kind' | 'cpu';
}

export interface ContentionReport {
  authority: Authority;
  /**
   * `measured` when the detector read the machine and the reference-score file itself; `built` when the caller passed
   * the reading or the reference score (the tests) — a built stamp is never judged (C-0047: measured, never declared).
   */
  readings: 'measured' | 'built';
  /** Every condition found, each offender named; empty exactly when authoritative. */
  reasons: string[];
  at: string;
  loadAverage: number;
  /** Whether the load-average clause was applied (the before-batch sample; a during-batch sample skips it). */
  loadChecked: boolean;
  power: PowerSource;
  offenders: Offender[];
  /** How many processes the table held (every process on the machine). */
  processes: number;
  /** The pids counted as the harness's own (this process, `ownPids` and their descendants). */
  ownTree: number[];
  referenceScore: number | null;
  /** The two calibrate scores' drift, when the caller passed them. */
  drift: number | null;
}

export interface ContentionOptions {
  /** Processes the harness launched for its own measurement (the Chromium leg, a tier job); with their descendants. */
  ownPids?: readonly number[];
  /** The reference score (default: read `bench/src/host/reference-score.json` now). */
  referenceScore?: number | null;
  /** The reference score's calibrate version (default: the file's). */
  referenceVersion?: number | null;
  /** A batch's two calibrate scores (the agreement clause, §12.1's 5 %). */
  calibration?: { before: number; after: number };
  /** The machine reading to judge (default: sampleMachine() now). Tests pass a reading built from real rows. */
  machine?: MachineSample;
  /** Apply the load-average clause (default true: the before-batch sample). */
  checkLoad?: boolean;
}

export const LOAD_LIMIT = 1.5;
export const CPU_LIMIT = 10;
export const DRIFT_LIMIT = 0.05;

/** The executables the detector itself runs; as this process's children they are never offenders. */
const PROBES = new Set(['ps', 'pmset', 'sysctl', 'sw_vers', 'arch']);
/** The source loader's service, a child of this process when the bench runs through tsx (C-0059). */
const LOADER = 'esbuild';

const PS = process.platform === 'darwin' ? '/bin/ps' : 'ps';
const PMSET = '/usr/bin/pmset';

/** The executable's file name (the last path segment of `comm`). */
export function baseName(comm: string): string {
  const i = comm.lastIndexOf('/');
  return i >= 0 ? comm.slice(i + 1) : comm;
}

/**
 * The C-0103 kind of a process from its `comm` (the executable path ps reports), or null for an unlisted process.
 * The browsers are recognised by their app bundles and Playwright's cached builds, so a browser's helper processes
 * (inside the bundle) count as the browser; the operating system's shared WebKit XPC services, which any app's web
 * view holds, are not a browser and fall to the CPU clause (C-0138). tsc and vitest run as `node`
 * (ps reports the executable), so the `node` kind covers them; the names `tsc`, `vitest`, `bench` and `esbuild` are
 * matched as executables too.
 */
export function processKind(comm: string): string | null {
  const path = comm.toLowerCase();
  const base = baseName(path);
  if (path.includes('/ms-playwright/chromium')) return 'chromium';
  if (path.includes('/ms-playwright/firefox')) return 'firefox';
  if (path.includes('/ms-playwright/webkit')) return 'webkit';
  if (path.includes('/google chrome.app/') || path.includes('/google chrome for testing.app/') || base.startsWith('google chrome') || base === 'chrome') return 'chrome';
  if (path.includes('/chromium.app/') || base.startsWith('chromium') || base === 'chrome-headless-shell') return 'chromium';
  if (path.includes('/firefox.app/') || path.includes('/firefox nightly.app/') || path.includes('/firefox developer edition.app/') || base.startsWith('firefox')) return 'firefox';
  if (path.includes('/safari.app/') || path.includes('/safari technology preview.app/') || base === 'safari') return 'safari';
  if (base === 'minibrowser' || base === 'webkitwebprocess' || base === 'webkitnetworkprocess') return 'webkit';
  if (base === 'node' || base === 'nodejs') return 'node';
  if (/^python3[0-9.]*$/.test(base) || path.includes('/python3.framework/') || (base === 'python' && path.includes('/versions/3.'))) return 'python3';
  if (/^python[0-9.]*$/.test(base)) return 'python';
  if (base === 'bench' || base === 'tsc' || base === 'vitest' || base === 'esbuild') return base;
  return null;
}

/** Parses `ps -axo pid,ppid,pcpu,comm` output (header first; `comm` may hold spaces). */
export function parsePs(text: string): ProcessRow[] {
  const rows: ProcessRow[] = [];
  for (const line of text.split('\n')) {
    const m = /^\s*(\d+)\s+(\d+)\s+([0-9]+(?:[.,][0-9]+)?)\s+(.+?)\s*$/.exec(line);
    if (m === null) continue;
    rows.push({ pid: Number(m[1]), ppid: Number(m[2]), pcpu: Number(m[3].replace(',', '.')), comm: m[4] });
  }
  return rows;
}

/** Parses `pmset -g batt`: "Now drawing from 'AC Power'" → ac; any other source (battery, UPS) → battery. */
export function parsePower(text: string | null): PowerSource {
  if (text === null) return 'unknown';
  const m = /Now drawing from '([^']+)'/.exec(text);
  if (m === null) return 'unknown';
  return m[1] === 'AC Power' ? 'ac' : 'battery';
}

function run(file: string, args: string[]): string | null {
  try {
    return execFileSync(file, args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      env: { ...process.env, LC_ALL: 'C' },
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch {
    return null;
  }
}

/** Reads the machine now: every process on it, the load average, the power source. */
export function sampleMachine(): MachineSample {
  const ps = run(PS, ['-axo', 'pid,ppid,pcpu,comm']);
  if (ps === null) throw new Error('contention: ps -axo pid,ppid,pcpu,comm failed');
  return {
    at: new Date().toISOString(),
    loadAverage: loadavg()[0],
    processes: parsePs(ps),
    power: process.platform === 'darwin' ? parsePower(run(PMSET, ['-g', 'batt'])) : 'unknown',
    selfPid: process.pid,
  };
}

/** This process, the `ownPids` and every descendant of them, from the table's parent links. */
export function ownTree(rows: readonly ProcessRow[], selfPid: number, ownPids: readonly number[] = []): Set<number> {
  const children = new Map<number, number[]>();
  for (const r of rows) {
    const list = children.get(r.ppid);
    if (list === undefined) children.set(r.ppid, [r.pid]);
    else list.push(r.pid);
  }
  // This process itself is always the harness's own; its other children are own only when listed (or when this
  // process's pid is among `ownPids`), so a process planted beside the harness is caught (C-0103's tests).
  const own = new Set<number>([selfPid]);
  const seen = new Set<number>();
  const stack = [...ownPids];
  while (stack.length > 0) {
    const p = stack.pop() as number;
    if (seen.has(p)) continue;
    seen.add(p);
    own.add(p);
    for (const c of children.get(p) ?? []) stack.push(c);
  }
  return own;
}

/** This process's ancestors (the launch chain), up to but excluding pid 1 and 0. */
export function ancestors(rows: readonly ProcessRow[], selfPid: number): Set<number> {
  const parent = new Map<number, number>();
  for (const r of rows) parent.set(r.pid, r.ppid);
  const up = new Set<number>();
  let p = parent.get(selfPid);
  while (p !== undefined && p > 1 && !up.has(p)) {
    up.add(p);
    p = parent.get(p);
  }
  return up;
}

/** Judges one machine reading (pure: the tests drive it with real and built readings). */
export function judgeContention(
  machine: MachineSample,
  opts: Omit<ContentionOptions, 'machine'> & { referenceScore: number | null; readings?: 'measured' | 'built' },
): ContentionReport {
  const reasons: string[] = [];
  const refVersion = opts.referenceVersion ?? null;
  if (opts.referenceScore === null) reasons.push(NO_REFERENCE_SCORE);
  else if (refVersion !== null && refVersion !== CALIBRATE_VERSION) {
    reasons.push(`reference score from calibrate version ${refVersion} (this is version ${CALIBRATE_VERSION})`);
  }
  const checkLoad = opts.checkLoad ?? true;
  if (checkLoad && !(machine.loadAverage <= LOAD_LIMIT)) reasons.push(`load average ${machine.loadAverage.toFixed(2)} > ${LOAD_LIMIT}`);
  const own = ownTree(machine.processes, machine.selfPid, opts.ownPids ?? []);
  const launch = ancestors(machine.processes, machine.selfPid);
  const offenders: Offender[] = [];
  for (const r of machine.processes) {
    if (own.has(r.pid) || r.pid <= 0) continue;
    const base = baseName(r.comm);
    if (r.ppid === machine.selfPid && PROBES.has(base)) continue; // the detector's own probe
    const runtime = launch.has(r.pid) || (r.ppid === machine.selfPid && base === LOADER);
    const kind = runtime ? null : processKind(r.comm);
    if (kind !== null) {
      offenders.push({ pid: r.pid, name: kind, comm: r.comm, pcpu: r.pcpu, clause: 'kind' });
      reasons.push(`process: ${kind} (${base}, pid ${r.pid})`);
    } else if (r.pcpu >= CPU_LIMIT) {
      offenders.push({ pid: r.pid, name: base, comm: r.comm, pcpu: r.pcpu, clause: 'cpu' });
      reasons.push(`process: ${base} (pid ${r.pid}) at ≥ ${CPU_LIMIT} % CPU`);
    }
  }
  if (machine.power !== 'ac') reasons.push(`power: ${machine.power === 'battery' ? 'battery' : 'unknown (pmset gave no AC reading)'}`);
  let drift: number | null = null;
  if (opts.calibration !== undefined) {
    drift = scoreDrift(opts.calibration.before, opts.calibration.after);
    if (!(drift <= DRIFT_LIMIT)) reasons.push(`calibrate drift ${(drift * 100).toFixed(1)} % > ${DRIFT_LIMIT * 100} %`);
  }
  return {
    authority: reasons.length === 0 ? 'authoritative' : 'contended',
    readings: opts.readings ?? 'built',
    reasons,
    at: machine.at,
    loadAverage: machine.loadAverage,
    loadChecked: checkLoad,
    power: machine.power,
    offenders,
    processes: machine.processes.length,
    ownTree: [...own].sort((a, b) => a - b),
    referenceScore: opts.referenceScore,
    drift,
  };
}

/** The detector: reads the machine now (or judges the given reading) and stamps it (C-0047, C-0103). */
export function contention(opts: ContentionOptions = {}): ContentionReport {
  let referenceScore = opts.referenceScore;
  let referenceVersion = opts.referenceVersion;
  if (referenceScore === undefined) {
    const ref = readReferenceScore();
    referenceScore = ref.score;
    if (referenceVersion === undefined) referenceVersion = ref.calibrateVersion;
  }
  const machine = opts.machine ?? sampleMachine();
  const readings = opts.machine === undefined && opts.referenceScore === undefined ? 'measured' : 'built';
  return judgeContention(machine, { ...opts, referenceScore, referenceVersion: referenceVersion ?? null, readings });
}
