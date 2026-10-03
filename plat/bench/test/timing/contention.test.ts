// M0-f-01's detector tests (C-0047, C-0082, C-0103, C-0114). The real-machine tests read EVERY process on the machine
// (`ps -axo pid,ppid,pcpu,comm`): planted processes — a busy child, a sleeping python3, a Chromium launched through
// playwright-core from the cache, a busy process of an unlisted name — are named when outside `ownPids` and never when
// inside. Other seats run on this machine, so the full table is always contended; the "authoritative" verdicts are
// judged on a quiet reading built from the same real rows — the harness's own row and the planted processes' trees —
// with the other conditions met (load ≤ 1.5, AC power, a reference score, agreeing calibrate scores).
import { spawn, type ChildProcess } from 'node:child_process';
import { once } from 'node:events';
import { afterEach, describe, expect, it } from 'vitest';
import { chromium, type BrowserServer } from 'playwright-core';
import { NO_REFERENCE_SCORE } from '../../src/host/index.js';
import {
  ancestors,
  contention,
  judgeContention,
  ownTree,
  parsePower,
  parsePs,
  processKind,
  sampleMachine,
  type MachineSample,
  type ProcessRow,
} from '../../src/timing/contention.js';

// ------------------------------------------------------------------------------------------------------------ helpers

const planted: ChildProcess[] = [];
let server: BrowserServer | null = null;

afterEach(async () => {
  for (const c of planted.splice(0)) {
    if (c.exitCode === null && c.signalCode === null) {
      c.kill('SIGKILL');
      await once(c, 'exit');
    }
  }
  if (server !== null) {
    await server.close();
    server = null;
  }
});

async function plant(file: string, args: string[]): Promise<number> {
  const c = spawn(file, args, { stdio: 'ignore' });
  planted.push(c);
  if (c.pid === undefined) await once(c, 'spawn');
  return c.pid as number;
}

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

/** Samples the whole machine until `ok` holds (a planted process exec'd, a busy one past the CPU threshold). */
async function sampleUntil(ok: (m: MachineSample) => boolean, timeoutMs = 15_000): Promise<MachineSample> {
  const end = Date.now() + timeoutMs;
  for (;;) {
    const m = sampleMachine();
    if (ok(m)) return m;
    if (Date.now() > end) throw new Error('sampleUntil: condition not met in time');
    await sleep(250);
  }
}

const row = (m: MachineSample, pid: number): ProcessRow | undefined => m.processes.find((r) => r.pid === pid);

/** The subtree of `pids` in a reading. */
function subtree(m: MachineSample, pids: readonly number[]): Set<number> {
  const set = new Set(pids);
  let grew = true;
  while (grew) {
    grew = false;
    for (const r of m.processes) {
      if (set.has(r.ppid) && !set.has(r.pid)) {
        set.add(r.pid);
        grew = true;
      }
    }
  }
  return set;
}

/** A quiet reading built from real rows: this process and the planted trees only, every other condition met. */
function quiet(m: MachineSample, pids: readonly number[]): MachineSample {
  const keep = subtree(m, pids);
  keep.add(m.selfPid);
  return { ...m, loadAverage: 0.5, power: 'ac', processes: m.processes.filter((r) => keep.has(r.pid)) };
}

const QUIET_OTHER = { referenceScore: 100, calibration: { before: 100, after: 101 } } as const;

const named = (reasons: readonly string[], pid: number): string[] => reasons.filter((r) => r.includes(`pid ${pid})`));

// ------------------------------------------------------------------------------------------------------- unit level

describe('the process kinds of C-0103', () => {
  it('classifies the browsers, their helpers and Playwright\'s builds, node, python, the build tools — and nothing else', () => {
    const cases: [string, string | null][] = [
      ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', 'chrome'],
      ['/Applications/Google Chrome.app/Contents/Frameworks/Google Chrome Framework.framework/Versions/141.0/Helpers/Google Chrome Helper (Renderer).app/Contents/MacOS/Google Chrome Helper (Renderer)', 'chrome'],
      ['/Applications/Google Chrome.app/Contents/Frameworks/Google Chrome Framework.framework/Versions/141.0/Helpers/chrome_crashpad_handler', 'chrome'],
      ['/Users/x/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell', 'chromium'],
      ['/Users/x/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chromium'],
      ['/Applications/Chromium.app/Contents/MacOS/Chromium', 'chromium'],
      ['/Users/x/Library/Caches/ms-playwright/firefox-1522/firefox/Nightly.app/Contents/MacOS/firefox', 'firefox'],
      ['/Applications/Firefox.app/Contents/MacOS/plugin-container.app/Contents/MacOS/plugin-container', 'firefox'],
      ['/Users/x/Library/Caches/ms-playwright/webkit-2251/Playwright.app/Contents/MacOS/Playwright', 'webkit'],
      ['/Applications/Safari.app/Contents/MacOS/Safari', 'safari'],
      ['/usr/local/bin/node', 'node'],
      ['node', 'node'],
      ['/Library/Developer/CommandLineTools/Library/Frameworks/Python3.framework/Versions/3.9/Resources/Python.app/Contents/MacOS/Python', 'python3'],
      ['/usr/bin/python3', 'python3'],
      ['python3.12', 'python3'],
      ['/usr/bin/python', 'python'],
      ['/x/node_modules/@esbuild/darwin-arm64/bin/esbuild', 'esbuild'],
      ['tsc', 'tsc'],
      ['vitest', 'vitest'],
      ['bench', 'bench'],
      // not browsers: the OS's shared WebKit services (any app's web view), Safari's system agents, an Electron app's crashpad
      ['/System/Library/Frameworks/WebKit.framework/Versions/A/XPCServices/com.apple.WebKit.WebContent.xpc/Contents/MacOS/com.apple.WebKit.WebContent', null],
      ['/System/Cryptexes/App/System/Library/CoreServices/SafariSupport.bundle/Contents/MacOS/SafariBookmarksSyncAgent', null],
      ['/System/Library/PrivateFrameworks/SafariSafeBrowsing.framework/com.apple.Safari.SafeBrowsing.Service', null],
      ['/Applications/Claude.app/Contents/Frameworks/Electron Framework.framework/Helpers/chrome_crashpad_handler', null],
      ['/Applications/Utilities/Adobe Creative Cloud Experience/CCXProcess/CCXProcess.app/Contents/MacOS/Creative Cloud Content Manager.node', null],
      ['yes', null],
      ['/usr/libexec/WindowServer', null],
    ];
    for (const [comm, kind] of cases) expect(processKind(comm), comm).toBe(kind);
  });

  it('parses ps (comm with spaces) and pmset', () => {
    const rows = parsePs('  PID  PPID  %CPU COMM\n    1     0   0.0 /sbin/launchd\n  913     1  12,5 /Applications/A B.app/Contents/MacOS/A B\n\n');
    expect(rows).toEqual([
      { pid: 1, ppid: 0, pcpu: 0, comm: '/sbin/launchd' },
      { pid: 913, ppid: 1, pcpu: 12.5, comm: '/Applications/A B.app/Contents/MacOS/A B' },
    ]);
    expect(parsePower("Now drawing from 'AC Power'\n -InternalBattery-0 (id=1)\t84%; charging")).toBe('ac');
    expect(parsePower("Now drawing from 'Battery Power'\n -InternalBattery-0 (id=1)\t84%; discharging")).toBe('battery');
    expect(parsePower("Now drawing from 'UPS Power'")).toBe('battery');
    expect(parsePower('garbage')).toBe('unknown');
    expect(parsePower(null)).toBe('unknown');
  });
});

describe('judgeContention on built readings (each clause alone)', () => {
  const SELF = 500;
  const base = (rows: ProcessRow[], extra: Partial<MachineSample> = {}): MachineSample => ({
    at: '2026-10-03T00:00:00.000Z',
    loadAverage: 0.4,
    power: 'ac',
    selfPid: SELF,
    processes: [
      { pid: 1, ppid: 0, pcpu: 0, comm: '/sbin/launchd' },
      { pid: 100, ppid: 1, pcpu: 0, comm: '/bin/zsh' },
      { pid: 200, ppid: 100, pcpu: 0, comm: '/usr/local/bin/node' }, // corepack, an ancestor
      { pid: 300, ppid: 200, pcpu: 0, comm: 'node' }, // tsx, an ancestor
      { pid: SELF, ppid: 300, pcpu: 95, comm: 'node' }, // the harness itself, busy
      ...rows,
    ],
    ...extra,
  });
  const ok = { referenceScore: 100, calibration: { before: 100, after: 100 } };

  it('a quiet reading is authoritative; the harness, its ancestors (idle) and its probes are never offenders', () => {
    const r = judgeContention(base([
      { pid: 501, ppid: SELF, pcpu: 0, comm: '/bin/ps' },
      { pid: 502, ppid: SELF, pcpu: 0, comm: '/usr/bin/pmset' },
      { pid: 503, ppid: SELF, pcpu: 0, comm: '/x/node_modules/@esbuild/darwin-arm64/bin/esbuild' },
    ]), ok);
    expect(r.reasons).toEqual([]);
    expect(r.authority).toBe('authoritative');
    expect(r.ownTree).toEqual([SELF]);
  });

  it('battery power, an unknown power source, the load average, a 6 % calibrate drift and a null reference score each contend', () => {
    expect(judgeContention(base([], { power: 'battery' }), ok).reasons).toEqual(['power: battery']);
    expect(judgeContention(base([], { power: 'unknown' }), ok).reasons).toEqual(['power: unknown (pmset gave no AC reading)']);
    expect(judgeContention(base([], { loadAverage: 2 }), ok).reasons).toEqual(['load average 2.00 > 1.5']);
    expect(judgeContention(base([], { loadAverage: 2 }), { ...ok, checkLoad: false }).reasons).toEqual([]);
    expect(judgeContention(base([], { loadAverage: 1.5 }), ok).reasons).toEqual([]);
    const d = judgeContention(base([]), { referenceScore: 100, calibration: { before: 100, after: 106 } });
    expect(d.reasons).toEqual(['calibrate drift 6.0 % > 5 %']);
    expect(d.drift).toBeCloseTo(0.06, 12);
    expect(judgeContention(base([]), { referenceScore: 100, calibration: { before: 106, after: 100 } }).authority).toBe('contended');
    expect(judgeContention(base([]), { referenceScore: 100, calibration: { before: 100, after: 104.9 } }).authority).toBe('authoritative');
    expect(judgeContention(base([]), { ...ok, referenceScore: null }).reasons).toEqual([NO_REFERENCE_SCORE]);
    expect(judgeContention(base([]), { ...ok, referenceVersion: 0 }).reasons).toEqual(['reference score from calibrate version 0 (this is version 1)']);
  });

  it('a listed kind contends at any CPU, an unlisted process at ≥ 10 % CPU, an ancestor or the loader only by CPU', () => {
    const r = judgeContention(base([
      { pid: 600, ppid: 1, pcpu: 0, comm: '/usr/bin/python3' },
      { pid: 601, ppid: 1, pcpu: 9.9, comm: '/usr/libexec/WindowServer' },
      { pid: 602, ppid: 1, pcpu: 10, comm: 'yes' },
      { pid: 603, ppid: SELF, pcpu: 0, comm: '/bin/sleep' }, // a child of the harness, not listed in ownPids
      { pid: 604, ppid: 1, pcpu: 0, comm: '/x/esbuild' }, // another process's esbuild
    ]), ok);
    expect(r.reasons).toEqual(['process: python3 (python3, pid 600)', 'process: yes (pid 602) at ≥ 10 % CPU', 'process: esbuild (esbuild, pid 604)']);
    expect(r.offenders.map((o) => [o.pid, o.clause])).toEqual([[600, 'kind'], [602, 'cpu'], [604, 'kind']]);
    const busyAncestor = base([]);
    busyAncestor.processes[3].pcpu = 30; // tsx busy
    expect(judgeContention(busyAncestor, ok).reasons).toEqual(['process: node (pid 300) at ≥ 10 % CPU']);
  });

  it('ownPids and their descendants are the harness\'s own; the harness\'s other children are not', () => {
    const rows: ProcessRow[] = [
      { pid: 700, ppid: SELF, pcpu: 50, comm: '/x/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell' },
      { pid: 701, ppid: 700, pcpu: 20, comm: '/x/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell' },
      { pid: 702, ppid: SELF, pcpu: 0, comm: '/usr/bin/python3' },
    ];
    expect(judgeContention(base(rows), { ...ok, ownPids: [700, 702] }).authority).toBe('authoritative');
    expect(judgeContention(base(rows), { ...ok, ownPids: [700] }).reasons).toEqual(['process: python3 (python3, pid 702)']);
    expect(judgeContention(base(rows), { ...ok, ownPids: [SELF] }).authority).toBe('authoritative');
    expect(judgeContention(base(rows), ok).reasons).toEqual([
      'process: chromium (chrome-headless-shell, pid 700)',
      'process: chromium (chrome-headless-shell, pid 701)',
      'process: python3 (python3, pid 702)',
    ]);
    expect([...ownTree(base(rows).processes, SELF, [700])].sort((a, b) => a - b)).toEqual([SELF, 700, 701]);
    expect([...ancestors(base(rows).processes, SELF)]).toEqual([300, 200, 100]);
  });
});

// ------------------------------------------------------------------------------------- the real machine, every process

describe('the detector over every process on this machine (C-0103)', () => {
  it('reads every process: launchd, other users\' daemons, this process', () => {
    const m = sampleMachine();
    expect(m.processes.length).toBeGreaterThan(100);
    expect(row(m, 1)?.comm).toBe('/sbin/launchd');
    expect(row(m, process.pid)).toBeDefined();
    expect(m.power).not.toBe('unknown');
    expect(m.loadAverage).toBeGreaterThanOrEqual(0);
  });

  it('with reference-score.json at null every stamp is contended with the reason "no reference score"', () => {
    const r = contention();
    expect(r.authority).toBe('contended');
    expect(r.readings).toBe('measured');
    expect(r.reasons[0]).toBe(NO_REFERENCE_SCORE);
    expect(r.referenceScore).toBeNull();
    const q = contention({ machine: quiet(sampleMachine(), []), calibration: { before: 100, after: 100 } });
    expect(q.reasons).toEqual([NO_REFERENCE_SCORE]);
    expect(q.readings).toBe('built');
  });

  it('a synthetic load (a busy child process) contends, named as a process; passed in ownPids it is the harness\'s own', async () => {
    const pid = await plant(process.execPath, ['-e', 'for (;;) {}']);
    const m = await sampleUntil((s) => (row(s, pid)?.pcpu ?? 0) >= 10);
    const outside = contention({ machine: m, ...QUIET_OTHER });
    expect(outside.authority).toBe('contended');
    expect(named(outside.reasons, pid)).toEqual([`process: node (node, pid ${pid})`]);
    expect(outside.reasons.some((r) => r.startsWith('load average') || r.startsWith('process'))).toBe(true);
    const inside = contention({ machine: m, ownPids: [pid], ...QUIET_OTHER });
    expect(named(inside.reasons, pid)).toEqual([]);
    expect(contention({ machine: quiet(m, [pid]), ownPids: [pid], ...QUIET_OTHER }).authority).toBe('authoritative');
    expect(contention({ machine: quiet(m, [pid]), ...QUIET_OTHER }).reasons).toEqual([`process: node (node, pid ${pid})`]);
  }, 30_000);

  it('a busy process of an unlisted name at ≥ 10 % CPU contends, named; inside ownPids it does not', async () => {
    const pid = await plant('/usr/bin/yes', []);
    const m = await sampleUntil((s) => (row(s, pid)?.pcpu ?? 0) >= 10);
    expect(processKind(row(m, pid)?.comm ?? '')).toBeNull();
    expect(named(contention({ machine: m, ...QUIET_OTHER }).reasons, pid)).toEqual([`process: yes (pid ${pid}) at ≥ 10 % CPU`]);
    expect(named(contention({ machine: m, ownPids: [pid], ...QUIET_OTHER }).reasons, pid)).toEqual([]);
    expect(contention({ machine: quiet(m, [pid]), ownPids: [pid], ...QUIET_OTHER }).authority).toBe('authoritative');
  }, 30_000);

  it('a planted python3 (sleeping, 0 % CPU) outside ownPids contends as "process: python3"; inside, it leaves the stamp authoritative', async () => {
    const pid = await plant('/usr/bin/python3', ['-c', 'import time; time.sleep(30)']);
    const m = await sampleUntil((s) => (row(s, pid)?.comm ?? '').includes('Python3.framework') || baseNameOf(row(s, pid)?.comm) === 'python3');
    const outside = contention({ machine: m, ...QUIET_OTHER });
    expect(named(outside.reasons, pid)).toHaveLength(1);
    expect(named(outside.reasons, pid)[0]).toMatch(/^process: python3 \(/);
    expect(named(contention({ machine: m, ownPids: [pid], ...QUIET_OTHER }).reasons, pid)).toEqual([]);
    expect(contention({ machine: quiet(m, [pid]), ownPids: [pid], ...QUIET_OTHER }).authority).toBe('authoritative');
    expect(contention({ machine: quiet(m, [pid]), ...QUIET_OTHER }).authority).toBe('contended');
  }, 30_000);

  it('a Chromium launched through playwright-core from the cache contends as "process: chromium"; inside ownPids its whole tree is own', async () => {
    process.env['PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD'] = '1';
    server = await chromium.launchServer({ headless: true });
    const pid = server.process().pid as number;
    const m = await sampleUntil((s) => row(s, pid) !== undefined);
    const tree = subtree(m, [pid]);
    const outside = contention({ machine: m, ...QUIET_OTHER });
    const mine = [...tree].flatMap((p) => named(outside.reasons, p));
    expect(mine.length).toBeGreaterThanOrEqual(1);
    expect(named(outside.reasons, pid)[0]).toMatch(/^process: chromium \(/);
    for (const r of mine) expect(r).toMatch(/^process: chromium \(/);
    const inside = contention({ machine: m, ownPids: [pid], ...QUIET_OTHER });
    expect([...tree].flatMap((p) => named(inside.reasons, p))).toEqual([]);
    expect(contention({ machine: quiet(m, [pid]), ownPids: [pid], ...QUIET_OTHER }).authority).toBe('authoritative');
    expect(contention({ machine: quiet(m, [pid]), ...QUIET_OTHER }).authority).toBe('contended');
  }, 60_000);
});

function baseNameOf(comm: string | undefined): string {
  if (comm === undefined) return '';
  const i = comm.lastIndexOf('/');
  return i >= 0 ? comm.slice(i + 1) : comm;
}
