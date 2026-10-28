// M0-t-00's script tests on FIXTURE bars (C-0103, C-0075, C-0080, C-0115): the two designed refusals — no
// PLAT_TIMING_TOKEN, and the detector naming another process (a planted python3 and a planted Chromium outside
// `ownPids`, and a real python3 child read by the real detector) — the token recorded; every timingBars row of
// M0-work.json in the record exactly once; the first act writing reference-score.json once (a scratch copy under
// PLAT_BENCH_OUT, never the committed file) and a second run leaving it unchanged; `--only` running exactly the named
// bars and never rewriting the score. No test runs a real bar, a real tier or the browser.
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { REFERENCE_SCORE_PATH } from '../../src/host/index.js';
import { ancestors, contention, sampleMachine, type MachineSample, type ProcessRow } from '../../src/timing/contention.js';
import { IDLE_MS } from '../../src/timing/harness.js';
import { BAR_IDS, readTimingBars, run, timingPhase, WORK_PATH, type DetectOptions, type TimingsRecord } from '../../src/timing-phase/index.js';
import { CHROMIUM_ROW, detector, fixtureContext, HOST, machine, PYTHON3, removeScratch, sha256 } from './fixtures.js';

/**
 * The script's own launch on a real start (the checker's B1, ps snapshots on this machine): the `corepack pnpm` node
 * process an ANCESTOR of this process, and the tsx loader's esbuild service a CHILD of it — both at ≥ 10 % CPU while
 * the start-up transpile runs (`hot`), both idle 30 s later. M0-f-01's detector exempts them from the kind clause only
 * (C-0138), so a reading taken at start-up names them by the CPU clause.
 */
const ANCESTOR_PID = 4_000_010;
const LOADER_PID = 4_000_011;
function launch(hot: boolean, rows: ProcessRow[] = []): MachineSample {
  return machine([], {
    processes: [
      { pid: ANCESTOR_PID, ppid: 1, pcpu: hot ? 13.8 : 0.4, comm: 'node' },
      { pid: process.pid, ppid: ANCESTOR_PID, pcpu: hot ? 76.6 : 0.2, comm: 'node' },
      { pid: LOADER_PID, ppid: process.pid, pcpu: hot ? 77 : 1.2, comm: '/p/node_modules/@esbuild/linux-x64/bin/esbuild' },
      ...rows,
    ],
  });
}

/** A context whose detector reads the start-up machine until §12.1's 30 s idle has been waited, then `after`. */
function startUp(after: ProcessRow[] = []): { c: ReturnType<typeof fixtureContext>; events: string[]; seen: DetectOptions[] } {
  const events: string[] = [];
  const seen: DetectOptions[] = [];
  let idled = false;
  const read = detector(() => launch(!idled, after), seen);
  const c = fixtureContext({
    // the machine is quiet only once the wait has ELAPSED (resolved), so a wait not awaited reads the start-up machine
    sleep: (ms) => {
      events.push(`sleep ${String(ms)}`);
      return Promise.resolve().then(() => {
        if (ms >= IDLE_MS) idled = true;
      });
    },
    detect: (o) => {
      events.push('detect');
      return read(o);
    },
  });
  return { c, events, seen };
}

const COMMITTED_SCORE = sha256(REFERENCE_SCORE_PATH);
afterAll(() => {
  removeScratch();
  // no test writes the committed reference-score.json (C-0105, C-0115)
  expect(sha256(REFERENCE_SCORE_PATH)).toBe(COMMITTED_SCORE);
});

const recordOf = (path: string): TimingsRecord => JSON.parse(readFileSync(path, 'utf8')) as TimingsRecord;

describe('the token (C-0103): the script refuses to start without PLAT_TIMING_TOKEN, and records it', () => {
  it('no token (absent, empty, blank): REFUSE no-token naming the alternative; nothing measured, nothing written', async () => {
    for (const env of [{}, { PLAT_TIMING_TOKEN: '' }, { PLAT_TIMING_TOKEN: '   ' }]) {
      const runs: string[] = [];
      const sleeps: number[] = [];
      const c = fixtureContext({ env, runs, sleeps });
      const before = sha256(c.scorePath);
      const o = await timingPhase([], c);
      expect(o.kind).toBe('refused');
      if (o.kind !== 'refused') continue;
      expect(o.refusal.refused).toBe('no-token');
      expect(o.refusal.kind).toBe('unlawful-state');
      expect(o.refusal.message).toContain('PLAT_TIMING_TOKEN');
      expect(o.refusal.alternative).toMatch(/^set PLAT_TIMING_TOKEN=/);
      expect(runs).toEqual([]);
      expect(sleeps).toEqual([]);
      expect(sha256(c.scorePath)).toBe(before);
      expect(existsSync(c.recordPath)).toBe(false);
    }
  });

  it('the command exits 3 on the refusal and writes the typed refusal to PLAT_BENCH_OUT', async () => {
    const c = fixtureContext({ env: {} });
    expect(await run([], c)).toBe(3);
    const r = JSON.parse(readFileSync(join(c.out, 'timing-phase', 'refusal.json'), 'utf8')) as { refused: string };
    expect(r.refused).toBe('no-token');
    expect(c.lines.some((l) => l.startsWith('timing-phase: REFUSE (no-token)'))).toBe(true);
    expect(c.lines.some((l) => l.includes('the alternative: set PLAT_TIMING_TOKEN='))).toBe(true);
  });

  it('with a token it runs and the record keeps the token (the full record and an --only re-run block)', async () => {
    const c = fixtureContext({ env: { PLAT_TIMING_TOKEN: 'tok-2026-10-27-a' } });
    const o = await timingPhase([], c);
    expect(o.kind).toBe('ran');
    expect(recordOf(c.recordPath).token).toBe('tok-2026-10-27-a');
    const o2 = await timingPhase(['--only', 'insert'], { ...c, env: { PLAT_TIMING_TOKEN: ' tok-T2 ' } });
    expect(o2.kind).toBe('ran');
    const r = recordOf(c.recordPath);
    expect(r.token).toBe('tok-2026-10-27-a');
    expect(r.rerun.map((b) => b.token)).toEqual(['tok-T2']);
  });
});

describe('the detector (C-0103): the script refuses while another process of the listed kinds or at ≥ 10 % CPU runs outside ownPids', () => {
  const refusedBy = async (rows: Parameters<typeof machine>[0]): Promise<{ reasons: readonly string[]; message: string } | null> => {
    const runs: string[] = [];
    const events: string[] = [];
    const read = detector(() => machine(rows));
    const c = fixtureContext({
      detect: (o) => {
        events.push('detect');
        return read(o);
      },
      sleep: (ms) => {
        events.push(`sleep ${String(ms)}`);
        return Promise.resolve();
      },
      runs,
    });
    const before = sha256(c.scorePath);
    const o = await timingPhase([], c);
    // the preflight's reading is taken after §12.1's 30 s idle (C-0440 (10), B1), and refuses on what it reads then
    expect(events.slice(0, 2)).toEqual([`sleep ${String(IDLE_MS)}`, 'detect']);
    if (o.kind !== 'refused') return null;
    // refused by the PREFLIGHT itself: one idle, one reading, nothing after it (never left to the first act's attempts)
    expect(events).toEqual([`sleep ${String(IDLE_MS)}`, 'detect']);
    expect(o.refusal.refused).toBe('contended-machine');
    expect(o.refusal.alternative).toMatch(/^stop the processes named/);
    expect(runs).toEqual([]);
    expect(sha256(c.scorePath)).toBe(before);
    expect(existsSync(c.recordPath)).toBe(false);
    return { reasons: o.refusal.reasons, message: o.refusal.message };
  };

  it('a planted python3 outside ownPids: REFUSE contended-machine naming it', async () => {
    const r = await refusedBy([PYTHON3]);
    expect(r).not.toBeNull();
    expect(r?.reasons).toEqual([`process: python3 (python3, pid ${String(PYTHON3.pid)})`]);
    expect(r?.message).toContain(`names 1 other process(es) on the machine (C-0103): python3 (pid ${String(PYTHON3.pid)})`);
  });

  it('a planted Chromium of the Playwright cache outside ownPids: REFUSE naming it', async () => {
    const r = await refusedBy([CHROMIUM_ROW]);
    expect(r?.reasons).toEqual([`process: chromium (Chromium, pid ${String(CHROMIUM_ROW.pid)})`]);
  });

  it('an unlisted process at ≥ 10 % CPU refuses; at 9.9 % it does not (C-0103\'s CPU clause)', async () => {
    expect((await refusedBy([{ pid: 4_000_003, ppid: 1, pcpu: 10, comm: '/usr/bin/yes' }]))?.reasons).toEqual(['process: yes (pid 4000003) at ≥ 10 % CPU']);
    expect(await refusedBy([{ pid: 4_000_003, ppid: 1, pcpu: 9.9, comm: '/usr/bin/yes' }])).toBeNull();
  });

  it('a quiet machine (the reference score null is no offender) runs; the preflight passes no own process', async () => {
    const seen: DetectOptions[] = [];
    const c = fixtureContext({ detect: detector(() => machine(), seen) });
    const o = await timingPhase([], c);
    expect(o.kind).toBe('ran');
    expect(seen[0].ownPids).toEqual([]);
  });

  it('the start-up reading (an ancestor node and this process\'s esbuild child, each ≥ 10 % CPU) refuses; the preflight reads after the 30 s idle, finds the launch quiet, and the script runs (B1)', async () => {
    // the fixture's precondition: at start-up M0-f-01's detector names exactly the launch chain, by the CPU clause
    const hot = detector(() => launch(true))({ ownPids: [], checkLoad: false });
    expect(hot.offenders.map((o) => [o.pid, o.name, o.clause])).toEqual([
      [ANCESTOR_PID, 'node', 'cpu'],
      [LOADER_PID, 'esbuild', 'cpu'],
    ]);
    expect(detector(() => launch(false))({ ownPids: [], checkLoad: false }).offenders).toEqual([]);
    const { c, events, seen } = startUp();
    const o = await timingPhase([], c);
    expect(o.kind).toBe('ran');
    // the preflight's reading came after the idle: the first wait is §12.1's 30 s, the first reading follows it
    expect(events.slice(0, 2)).toEqual([`sleep ${String(IDLE_MS)}`, 'detect']);
    expect(seen[0]).toEqual({ ownPids: [], checkLoad: false });
    // the same on the --only re-run (the stored score read, no first-act idle): one idle, then the preflight
    const r = startUp();
    expect((await timingPhase(['--only', 'insert'], r.c)).kind).toBe('ran');
    expect(r.events.slice(0, 2)).toEqual([`sleep ${String(IDLE_MS)}`, 'detect']);
    expect(r.events.filter((e) => e.startsWith('sleep'))).toEqual([`sleep ${String(IDLE_MS)}`]);
  });

  it('after the idle a planted python3 or Chromium outside the tree still refuses, naming exactly it (never the quiet launch chain)', async () => {
    for (const row of [PYTHON3, CHROMIUM_ROW]) {
      const { c, events } = startUp([row]);
      const o = await timingPhase([], c);
      expect(events.slice(0, 2)).toEqual([`sleep ${String(IDLE_MS)}`, 'detect']);
      expect(o.kind).toBe('refused');
      if (o.kind !== 'refused') continue;
      expect(o.refusal.refused).toBe('contended-machine');
      const kind = row === PYTHON3 ? 'python3 (python3' : 'chromium (Chromium';
      expect(o.refusal.reasons).toEqual([`process: ${kind}, pid ${String(row.pid)})`]);
      expect(o.refusal.message).toContain('names 1 other process(es)');
      expect(events).toEqual([`sleep ${String(IDLE_MS)}`, 'detect']); // the preflight's own refusal
      expect(existsSync(c.recordPath)).toBe(false);
    }
  });

  it('a real python3 child of this test, outside ownPids, read by the REAL detector (ps over every process): REFUSE naming exactly it, by the kind clause', async () => {
    // what already contended before the child existed (another process on a shared machine) is the machine's state, not
    // the script's naming; this process's own launch chain (vitest's here, the script's own at T) may contend only by the
    // CPU clause (C-0138), never by its kind; nothing else may be named
    const priorOffenders = new Set(contention({ ownPids: [], checkLoad: false, referenceScore: null }).offenders.map((x) => x.pid));
    const child = spawn('python3', ['-c', 'import time; time.sleep(30)'], { stdio: 'ignore' });
    try {
      await new Promise((r) => setTimeout(r, 300));
      const chain = ancestors(sampleMachine().processes, process.pid);
      const c = fixtureContext({ detect: undefined });
      const o = await timingPhase([], c);
      expect(o.kind).toBe('refused');
      if (o.kind !== 'refused') return;
      const named = o.refusal.reasons.filter((x) => x.startsWith('process: '));
      expect(o.refusal.reasons.filter((x) => !x.startsWith('process: ')).every((x) => x.startsWith('power: ')), o.refusal.reasons.join('; ')).toBe(true);
      expect(named.filter((x) => x === `process: python3 (python3, pid ${String(child.pid)})`)).toHaveLength(1);
      const pidOf = (x: string): number => Number(/pid (\d+)/.exec(x)?.[1]);
      for (const x of named) {
        const pid = pidOf(x);
        if (pid === child.pid) continue;
        expect(pid, x).not.toBe(process.pid);
        if (chain.has(pid)) expect(x, 'the launch chain contends by the CPU clause only').toMatch(/at ≥ 10 % CPU$/);
        else expect(priorOffenders.has(pid), `${x}: named, yet neither the child, the launch chain nor a prior offender`).toBe(true);
      }
    } finally {
      child.kill('SIGKILL');
      await once(child, 'exit');
    }
  }, 30_000);
});

describe('every bar of M0-work.json\'s timingBars appears in the record exactly once (on fixture bars)', () => {
  it('the record\'s bars are the rows, in their order, each once, each row\'s text as M0-work.json states it', async () => {
    const rows = (JSON.parse(readFileSync(WORK_PATH, 'utf8')) as { timingBars: { bar: string; miss: string; code: string }[] }).timingBars;
    const c = fixtureContext();
    const o = await timingPhase([], c);
    expect(o.kind).toBe('ran');
    const r = recordOf(c.recordPath);
    expect(r.bars).toHaveLength(rows.length);
    expect(r.bars.map((b) => b.bar)).toEqual(rows.map((x) => x.bar));
    expect(new Set(r.bars.map((b) => b.id)).size).toBe(rows.length);
    expect([...r.bars.map((b) => b.id)].sort()).toEqual([...BAR_IDS].sort());
    for (const [i, b] of r.bars.entries()) expect(b.code).toBe(rows[i].code);
    expect(readTimingBars()).toHaveLength(rows.length);
  });

  it('every planted bar under its budget: each gating bar passes, each reported bar is reported, exit 0; the record names its host and its seams', async () => {
    const c = fixtureContext();
    const code = await run([], c);
    const r = recordOf(c.recordPath);
    for (const b of r.bars) {
      if (b.id === 'tiers') continue; // built readings never gate (C-0047): tiers.test.ts holds its record
      expect(b.verdict, b.id).toBe(b.role === 'gating' ? 'pass' : 'reported');
      for (const f of b.figures) expect(f.value, `${b.id} ${f.name}`).not.toBeNull();
      expect(b.host, b.id).toEqual(HOST);
      expect(b.batches.every((x) => x.fate === 'accepted' && x.authority === 'authoritative')).toBe(true);
    }
    expect(r.bars.find((b) => b.id === 'tiers')?.verdict).toBe('unmeasured');
    expect(code).toBe(1); // the tiers' built readings never gate, so the tier bar is unmeasured
    expect(r.readings).toBe('built');
    expect(r.seams).toEqual(expect.arrayContaining(['groups', 'detect', 'calibrate', 'tiers']));
    expect(r.schema).toBe('plat/M0-timings/1');
    expect(r.census).toMatchObject({ thisRun: 'none', barRefusals: {} });
    expect((r.census['designed'] as { class: string; verdict: string }[]).map((x) => `${x.class} ${x.verdict}`)).toEqual(['no-token REFUSE', 'contended-machine REFUSE']);
    const fusion = r.bars.find((b) => b.id === 'fusion');
    expect(fusion?.figures.map((f) => [f.name, f.reduce, f.role, f.verdict])).toEqual([
      ['S4 + S5 + S8 p50', 'p50', 'gating', 'pass'],
      ['S4 + S5 + S8 p95', 'p95', 'reported', 'reported'],
    ]);
    expect(r.bars.find((b) => b.id === 'hydrology')?.figures.map((f) => [f.value, f.budget, f.comparator])).toEqual([
      [15, 16, '≈'],
      [15, 16, '≈'],
    ]);
    expect(r.host).toEqual(HOST);
    // the copy in PLAT_BENCH_OUT
    expect(recordOf(join(c.out, 'timing-phase', 'M0-timings.json')).bars.map((b) => b.id)).toEqual(r.bars.map((b) => b.id));
  });
});

describe('the first act (C-0075): reference-score.json written once, with a non-null score and the host record', () => {
  it('a scratch copy (null) → written from the two agreeing calibrate scores after 30 s idle under the detector; a second run leaves it unchanged', async () => {
    const sleeps: number[] = [];
    const seen: DetectOptions[] = [];
    const c = fixtureContext({ sleeps, detect: detector(() => machine(), seen) });
    expect(JSON.parse(readFileSync(c.scorePath, 'utf8')).score).toBeNull();
    const o = await timingPhase([], c);
    expect(o.kind).toBe('ran');
    const file = JSON.parse(readFileSync(c.scorePath, 'utf8')) as { score: number; host: unknown; calibration: { scores: number[] }; calibrateVersion: number; writtenBy: string };
    expect(file.score).toBe(100.5);
    expect(file.host).toEqual(HOST);
    expect(file.calibration.scores).toEqual([100, 101]);
    expect(file.calibrateVersion).toBe(1);
    expect(file.writtenBy).toContain('tok-fixture-1');
    expect(sleeps.slice(0, 2)).toEqual([30_000, 30_000]); // the preflight's idle, then the first act's own before the first calibrate
    expect(seen[1]).toMatchObject({ checkLoad: true });
    expect(seen[2]).toMatchObject({ checkLoad: false, calibration: { before: 100, after: 101 } });
    const r = recordOf(c.recordPath);
    expect(r.referenceScore).toMatchObject({ action: 'written', score: 100.5, attempts: 1 });
    const bytes = sha256(c.scorePath);
    const o2 = await timingPhase([], { ...c, calibrate: () => 90 });
    expect(o2.kind).toBe('ran');
    expect(sha256(c.scorePath)).toBe(bytes);
    expect(recordOf(c.recordPath).referenceScore).toMatchObject({ action: 'read', score: 100.5 });
  });

  it('two scores exactly 5 % apart agree (written at the first attempt); just past 5 % is re-taken', async () => {
    const at5 = [100, 105];
    const c = fixtureContext({ calibrate: () => at5.shift() ?? 100 });
    expect((await timingPhase([], c)).kind).toBe('ran');
    expect(recordOf(c.recordPath).referenceScore).toMatchObject({ action: 'written', attempts: 1, score: 102.5 });
    const past = [100, 105.01, 100, 100];
    const d = fixtureContext({ calibrate: () => past.shift() ?? 100 });
    expect((await timingPhase([], d)).kind).toBe('ran');
    expect(recordOf(d.recordPath).referenceScore).toMatchObject({ action: 'written', attempts: 2, score: 100 });
  });

  it('a drifting pair is re-taken after its own idle wait; three contended attempts refuse (never a contended score)', async () => {
    const sleeps: number[] = [];
    const scores = [100, 110, 100, 102];
    const c = fixtureContext({ sleeps, calibrate: () => scores.shift() ?? 100 });
    const o = await timingPhase([], c);
    expect(o.kind).toBe('ran');
    expect(sleeps.slice(0, 3)).toEqual([30_000, 30_000, 30_000]); // the preflight's idle, then each attempt's own
    expect(JSON.parse(readFileSync(c.scorePath, 'utf8')).calibration.scores).toEqual([100, 102]);
    expect(recordOf(c.recordPath).referenceScore.attempts).toBe(2);

    const sleeps2: number[] = [];
    const busy = fixtureContext({ sleeps: sleeps2, detect: detector(() => machine([], { loadAverage: 3 })) });
    const before = sha256(busy.scorePath);
    const o2 = await timingPhase([], busy);
    expect(o2.kind).toBe('refused');
    if (o2.kind === 'refused') {
      expect(o2.refusal.refused).toBe('contended-machine');
      expect(o2.refusal.reasons).toEqual(['load average 3.00 > 1.5']);
    }
    expect(sleeps2).toEqual([30_000, 30_000, 30_000, 30_000]); // the preflight's idle, then three attempts' own
    expect(sha256(busy.scorePath)).toBe(before);
  });
});

describe('--only <ids> (C-0080): exactly the named bars, the stored score read and never rewritten', () => {
  it('a list of two gives two rows; only their groups run; the full record stands and a rerun block is appended', async () => {
    const runs: string[] = [];
    const c = fixtureContext({ runs });
    await timingPhase([], c);
    const first = recordOf(c.recordPath);
    const scoreBytes = sha256(c.scorePath);
    runs.length = 0;
    const o = await timingPhase(['--only', 'insert,digest'], c);
    expect(o.kind).toBe('ran');
    if (o.kind !== 'ran') return;
    expect(o.bars.map((b) => b.id)).toEqual(['insert', 'digest']);
    expect(o.code).toBe(0); // every gating bar it ran passed
    expect(runs).toEqual(['insert#0', 'digest#0']);
    const r = recordOf(c.recordPath);
    expect(r.bars).toEqual(first.bars);
    expect(r.rerun).toHaveLength(1);
    expect(r.rerun[0].only).toEqual(['insert', 'digest']);
    expect(r.rerun[0].bars.map((b) => b.id)).toEqual(['insert', 'digest']);
    expect(r.rerun[0].referenceScore.action).toBe('read');
    expect(sha256(c.scorePath)).toBe(scoreBytes);
    await timingPhase(['--only', 'fusion', 'skeleton'], c);
    expect(recordOf(c.recordPath).rerun.map((b) => b.bars.map((x) => x.id))).toEqual([['insert', 'digest'], ['skeleton', 'fusion']]);
    expect(await run(['--only', 'insert'], c)).toBe(0);
  });

  it('--only never writes the score, even when the stored score is null (the reference-score check reads it)', async () => {
    const sleeps: number[] = [];
    const c = fixtureContext({ sleeps });
    const before = sha256(c.scorePath);
    const o = await timingPhase(['--only', 's11'], c);
    expect(o.kind).toBe('ran');
    expect(sha256(c.scorePath)).toBe(before);
    expect(sleeps).toEqual([30_000]); // the preflight's idle only: no first-act idle, no calibrate
    expect(recordOf(c.recordPath).rerun[0].referenceScore).toMatchObject({ action: 'read', score: null });
  });

  it('a bad argument exits 64 (an unknown bar, a bar twice, --only empty, an unknown flag); --list prints the ids', async () => {
    for (const args of [['--only', 'nope'], ['--only', 'insert,insert'], ['--only'], ['--fast'], ['--only', 'insert', '--only', 'digest']]) {
      const c = fixtureContext();
      expect(await run(args, c), args.join(' ')).toBe(64);
      expect(existsSync(c.recordPath)).toBe(false);
    }
    const c = fixtureContext({ env: {} });
    expect(await run(['--list'], c)).toBe(0);
    expect(c.lines.map((l) => l.split(' ')[1])).toEqual(BAR_IDS.map(String));
  });
});
