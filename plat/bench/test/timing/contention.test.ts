// M0-f-01's detector tests (C-0047, C-0082, C-0103, C-0114). The real-machine tests read EVERY process on the machine
// (`ps -axo pid,ppid,pcpu,comm`): planted processes — a busy child, a sleeping python3, a Chromium launched through
// playwright-core from the cache, a busy process of an unlisted name, a busy process named like the detector's own probe
// but not its child (fix round 1, F-1 (c)) — are named when outside `ownPids` and never when inside. Fix round 2
// (checks/M0-f-01.md F-3, F-4; C-0141): Microsoft Edge — this machine's browser — and the rest of the Chromium family are
// browsers by their app bundles, an idle Edge tree contends; the Chromium test kills its browser itself, and the cleanup
// hook has its own bound. Other seats run on this machine, so the full table is always contended; the "authoritative" verdicts are
// judged on a quiet reading built from the same real rows — the harness's own row and the planted processes' trees —
// with the other conditions met (load ≤ 1.5, AC power, a reference score, agreeing calibrate scores).
import { spawn, type ChildProcess } from 'node:child_process';
import { once } from 'node:events';
import { mkdtempSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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
/** Planted processes reparented away from this process (no ChildProcess handle): killed by pid. */
const orphans: number[] = [];
/** The Chromium of the playwright-core test while it runs; the test kills it itself, the hook only after a failure. */
let server: BrowserServer | null = null;

/**
 * The cleanup's own bound (fix round 2, checks/M0-f-01.md F-4): vitest's default hook timeout is 10 s, and Chromium's
 * graceful close took longer than that at load average 85–133. The browser is now killed inside its test (SIGKILL and
 * the wait for its exit, its temporary profile removed — 27 ms against close()'s 583 ms at load 6, probed); the hook
 * kills it only when the test failed first, and has 60 s for that and the planted processes' exits.
 */
const CLEANUP_MS = 60_000;

afterEach(async () => {
  for (const c of planted.splice(0)) {
    if (c.exitCode === null && c.signalCode === null) {
      c.kill('SIGKILL');
      await once(c, 'exit');
    }
  }
  for (const pid of orphans.splice(0)) {
    try {
      process.kill(pid, 'SIGKILL');
    } catch {
      // already gone
    }
  }
  if (server !== null) {
    const s = server;
    server = null;
    await s.kill();
  }
}, CLEANUP_MS);

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

  it('classes Microsoft Edge as the browser "edge": its main binary, every helper, the renderer, the crashpad handler, every channel, its web-app shims and its bare names (F-3)', () => {
    // the first four paths are this machine's Edge rows as ps gave them on 2026-10-03
    const fw = '/Applications/Microsoft Edge.app/Contents/Frameworks/Microsoft Edge Framework.framework/Versions/154.0.4258.37/Helpers';
    const edge = [
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      `${fw}/Microsoft Edge Helper.app/Contents/MacOS/Microsoft Edge Helper`,
      `${fw}/Microsoft Edge Helper (Renderer).app/Contents/MacOS/Microsoft Edge Helper (Renderer)`,
      `${fw}/msedge_crashpad_handler`,
      `${fw}/Microsoft Edge Helper (GPU).app/Contents/MacOS/Microsoft Edge Helper (GPU)`,
      `${fw}/Microsoft Edge Helper (Plugin).app/Contents/MacOS/Microsoft Edge Helper (Plugin)`,
      // executables inside the bundle that are not named for Edge (listed from this machine's Edge.app)
      `${fw}/EdgeSpotlightIndexer.app/Contents/MacOS/EdgeSpotlightIndexer`,
      `${fw}/web_app_shortcut_copier`,
      `${fw}/app_mode_loader`,
      '/Applications/Microsoft Edge Beta.app/Contents/Frameworks/Microsoft Edge Framework.framework/Versions/155.0.1.0/Helpers/web_app_shortcut_copier',
      '/Applications/Microsoft Edge Canary.app/Contents/Frameworks/Microsoft Edge Framework.framework/Versions/156.0.1.0/Helpers/app_mode_loader',
      '/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta',
      '/Applications/Microsoft Edge Dev.app/Contents/Frameworks/Microsoft Edge Framework.framework/Versions/155.0.1.0/Helpers/msedge_crashpad_handler',
      '/Applications/Microsoft Edge Canary.app/Contents/Frameworks/Microsoft Edge Framework.framework/Versions/156.0.1.0/Helpers/Microsoft Edge Helper (Renderer).app/Contents/MacOS/Microsoft Edge Helper (Renderer)',
      '/Users/x/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      '/Users/x/Applications/Edge Apps.localized/Outlook (PWA).app/Contents/MacOS/app_mode_loader',
      'msedge',
      'msedge_crashpad_handler',
      'Microsoft Edge',
      'Microsoft Edge Helper (Renderer)',
    ];
    for (const comm of edge) expect(processKind(comm), comm).toBe('edge');
    // not Edge: Claude's native host for the browser extension (a child of Edge's main process here) and another native
    // host kept in Edge's profile folder, Claude's own Electron helpers, Edge's (outside the bundle) and Office's updaters
    for (const comm of [
      '/Applications/Claude.app/Contents/Helpers/chrome-native-host',
      '/Users/x/Library/Application Support/Microsoft Edge/NativeMessagingHosts/bin/native-host', // in Edge's profile folder, not its bundle
      '/Applications/Claude.app/Contents/Frameworks/Claude Helper (Renderer).app/Contents/MacOS/Claude Helper (Renderer)',
      '/Library/Application Support/Microsoft/EdgeUpdater/155.0.4271.0/EdgeUpdater.app/Contents/MacOS/EdgeUpdater',
      '/Library/Application Support/Microsoft/MAU2.0/Microsoft AutoUpdate.app/Contents/MacOS/Microsoft AutoUpdate',
      '/usr/libexec/knowledge-agent',
    ]) expect(processKind(comm), comm).toBeNull();
  });

  it('classes the rest of the Chromium family by its app bundles, and every channel of Chrome (its crashpad handler and web-app shims among them), Firefox and Safari (C-0141)', () => {
    const cases: [string, string | null][] = [
      ['/Applications/Google Chrome Canary.app/Contents/Frameworks/Google Chrome Framework.framework/Versions/143.0.1.0/Helpers/chrome_crashpad_handler', 'chrome'],
      ['/Applications/Google Chrome Beta.app/Contents/Frameworks/Google Chrome Framework.framework/Versions/142.0.1.0/Helpers/chrome_crashpad_handler', 'chrome'],
      ['/Applications/Google Chrome Dev.app/Contents/MacOS/Google Chrome Dev', 'chrome'],
      ['/Users/x/Applications/Chrome Apps.localized/Gmail.app/Contents/MacOS/app_mode_loader', 'chrome'],
      ['/Applications/Brave Browser.app/Contents/MacOS/Brave Browser', 'brave'],
      ['/Applications/Brave Browser.app/Contents/Frameworks/Brave Browser Framework.framework/Versions/141.1.83.109/Helpers/Brave Browser Helper (Renderer).app/Contents/MacOS/Brave Browser Helper (Renderer)', 'brave'],
      ['/Applications/Brave Browser Nightly.app/Contents/Frameworks/Brave Browser Framework.framework/Versions/142.1.85.1/Helpers/chrome_crashpad_handler', 'brave'],
      ['/Applications/Arc.app/Contents/MacOS/Arc', 'arc'],
      ['/Applications/Arc.app/Contents/Frameworks/ArcCore.framework/Versions/A/Helpers/Browser Helper (Renderer).app/Contents/MacOS/Browser Helper (Renderer)', 'arc'],
      ['/Applications/Opera.app/Contents/MacOS/Opera', 'opera'],
      ['/Applications/Opera GX.app/Contents/Frameworks/Opera Framework.framework/Versions/122.0.1.0/Helpers/Opera Helper (Renderer).app/Contents/MacOS/Opera Helper (Renderer)', 'opera'],
      ['/Applications/Vivaldi.app/Contents/MacOS/Vivaldi', 'vivaldi'],
      ['/Applications/Vivaldi Snapshot.app/Contents/Frameworks/Vivaldi Framework.framework/Versions/7.6.1.1/Helpers/Vivaldi Helper (GPU).app/Contents/MacOS/Vivaldi Helper (GPU)', 'vivaldi'],
      // the channels of C-0103's own browsers, their crash reporters inside the bundle
      ['/Applications/Firefox Nightly.app/Contents/MacOS/crashreporter.app/Contents/MacOS/crashreporter', 'firefox'],
      ['/Applications/Firefox Developer Edition.app/Contents/MacOS/plugin-container.app/Contents/MacOS/plugin-container', 'firefox'],
      ['/Applications/Safari Technology Preview.app/Contents/MacOS/Safari Technology Preview', 'safari'],
      // the executables' bare names, where ps gives no path
      ['Google Chrome Helper (Renderer)', 'chrome'],
      ['chrome', 'chrome'],
      ['Chromium Helper', 'chromium'],
      ['chrome-headless-shell', 'chromium'],
      ['firefox', 'firefox'],
      ['Safari', 'safari'],
      // not browsers: Google's updater, an app whose name merely begins like a browser's
      ['/Users/x/Library/Application Support/Google/GoogleUpdater/142.0.7416.0/GoogleUpdater.app/Contents/MacOS/GoogleUpdater', null],
      ['/Applications/Operator.app/Contents/MacOS/Operator', null],
      ['/Applications/Archive Utility.app/Contents/MacOS/Archive Utility', null],
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

  it('the detector\'s probes are exempt only as the harness\'s own children: a busy ps or pmset elsewhere contends by CPU (C-0138 (3))', () => {
    const r = judgeContention(base([
      { pid: 510, ppid: SELF, pcpu: 60, comm: '/bin/ps' }, // the detector's own probes, busy: never offenders
      { pid: 511, ppid: SELF, pcpu: 60, comm: '/usr/sbin/sysctl' },
      { pid: 512, ppid: SELF, pcpu: 60, comm: '/usr/bin/arch' },
      { pid: 520, ppid: 1, pcpu: 60, comm: '/private/tmp/x/ps' }, // a process named ps that is not the harness's child
      { pid: 521, ppid: 300, pcpu: 40, comm: '/usr/bin/pmset' }, // an ancestor's child, not the harness's
      { pid: 522, ppid: 1, pcpu: 0, comm: '/bin/ps' }, // another process's idle ps: no clause applies
    ]), ok);
    expect(r.reasons).toEqual(['process: ps (pid 520) at ≥ 10 % CPU', 'process: pmset (pid 521) at ≥ 10 % CPU']);
    expect(r.offenders.map((o) => [o.pid, o.clause])).toEqual([[520, 'cpu'], [521, 'cpu']]);
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

  it('an idle Microsoft Edge tree (0 % CPU) outside ownPids contends, each process named "process: edge (…)"; inside ownPids it is the harness\'s own (F-3)', () => {
    // this machine's Edge tree as ps gave it on 2026-10-03 (pids renumbered): the browser, two helpers, the crashpad
    // handler (adopted by launchd) and Claude's native host for the browser extension, a child of the browser
    const fw = '/Applications/Microsoft Edge.app/Contents/Frameworks/Microsoft Edge Framework.framework/Versions/154.0.4258.37/Helpers';
    const rows: ProcessRow[] = [
      { pid: 800, ppid: 1, pcpu: 0, comm: '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge' },
      { pid: 801, ppid: 800, pcpu: 0, comm: `${fw}/Microsoft Edge Helper (Renderer).app/Contents/MacOS/Microsoft Edge Helper (Renderer)` },
      { pid: 802, ppid: 800, pcpu: 0, comm: `${fw}/Microsoft Edge Helper.app/Contents/MacOS/Microsoft Edge Helper` },
      { pid: 803, ppid: 800, pcpu: 0, comm: '/Applications/Claude.app/Contents/Helpers/chrome-native-host' },
      { pid: 804, ppid: 1, pcpu: 0, comm: `${fw}/msedge_crashpad_handler` },
    ];
    const outside = judgeContention(base(rows), ok);
    expect(outside.authority).toBe('contended');
    expect(outside.reasons).toEqual([
      'process: edge (Microsoft Edge, pid 800)',
      'process: edge (Microsoft Edge Helper (Renderer), pid 801)',
      'process: edge (Microsoft Edge Helper, pid 802)',
      'process: edge (msedge_crashpad_handler, pid 804)',
    ]);
    expect(outside.offenders.map((o) => [o.pid, o.name, o.clause])).toEqual([[800, 'edge', 'kind'], [801, 'edge', 'kind'], [802, 'edge', 'kind'], [804, 'edge', 'kind']]);
    // the browser's pid covers its children (the native host included); its crashpad handler is launchd's child
    expect(judgeContention(base(rows), { ...ok, ownPids: [800] }).reasons).toEqual(['process: edge (msedge_crashpad_handler, pid 804)']);
    const inside = judgeContention(base(rows), { ...ok, ownPids: [800, 804] });
    expect(inside.reasons).toEqual([]);
    expect(inside.authority).toBe('authoritative');
    // and one idle process of another Chromium-family browser, as Brave's
    const brave = judgeContention(base([{ pid: 900, ppid: 1, pcpu: 0, comm: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser' }]), ok);
    expect(brave.reasons).toEqual(['process: brave (Brave Browser, pid 900)']);
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

  it('a busy process named like a probe (ps), reparented away from the harness, contends at ≥ 10 % CPU (C-0138 (3))', async () => {
    // yes run through a link named ps (ps reports the path it was run by; a copied platform binary is killed by macOS),
    // started by a shell that exits at once: launchd adopts it, so it is never this process's child
    const dir = mkdtempSync(join(tmpdir(), 'plat-f01-probe-'));
    try {
      const fake = join(dir, 'ps');
      symlinkSync('/usr/bin/yes', fake);
      const sh = spawn('/bin/sh', ['-c', '"$0" > /dev/null 2>&1 & echo $!', fake], { stdio: ['ignore', 'pipe', 'ignore'] });
      let said = '';
      sh.stdout.on('data', (d: Buffer) => {
        said += d.toString();
      });
      await once(sh, 'close');
      const pid = Number(said.trim());
      expect(pid).toBeGreaterThan(1);
      orphans.push(pid);
      const m = await sampleUntil((s) => (row(s, pid)?.pcpu ?? 0) >= 10 && row(s, pid)?.ppid !== process.pid);
      expect(baseNameOf(row(m, pid)?.comm)).toBe('ps');
      expect(processKind(row(m, pid)?.comm ?? '')).toBeNull();
      expect(named(contention({ machine: m, ...QUIET_OTHER }).reasons, pid)).toEqual([`process: ps (pid ${pid}) at ≥ 10 % CPU`]);
      expect(contention({ machine: quiet(m, [pid]), ...QUIET_OTHER }).reasons).toEqual([`process: ps (pid ${pid}) at ≥ 10 % CPU`]);
      expect(contention({ machine: quiet(m, [pid]), ownPids: [pid], ...QUIET_OTHER }).authority).toBe('authoritative');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
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
    const browser = await chromium.launchServer({ headless: true });
    server = browser; // the hook's to kill only if this test fails before its own kill
    try {
      const pid = browser.process().pid as number;
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
    } finally {
      // killed here, under this test's own timeout, never left to the hook (F-4)
      server = null;
      await browser.kill();
    }
  }, 120_000);
});

function baseNameOf(comm: string | undefined): string {
  if (comm === undefined) return '';
  const i = comm.lastIndexOf('/');
  return i >= 0 ? comm.slice(i + 1) : comm;
}
