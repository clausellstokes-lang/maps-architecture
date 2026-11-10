// M0-t-00 hardening round S1, RL10 (a) (Q72): the timing phase times the PRODUCT. (a) the production bundle is built by
// the stated copy of bench/src/profile/bundle.ts's recipe and the built bundle's `--list` (no bar runs; Q8) answers
// `production` — DEBUG_BUILD false, the arena's switch off, __name 0 — from outside plat/; the parity test reads both
// recipes and turns red when either changes. (b) the launcher (`run`, the dispatcher's entry) answers usage, a bad row
// and --list in-process, and for every measuring invocation builds the bundle, stops unless it is a production one, and
// spawns exactly [bundle, ...args] — measuring nothing in-process. (c) the child refuses a debug build (exit 64) and
// measures nothing. (d) the bundled launch topology — the tsx launcher (an ancestor), its esbuild loader (a SIBLING of
// the measuring process) and this process — passes the preflight on a quiet machine, and a planted python3 still
// refuses (B1's class not re-opened; M0-f-01's S1 rule, C-0465). No test runs a real bar, a real tier or the browser.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { REFERENCE_SCORE_PATH } from '../../src/host/index.js';
import { judgeContention, type MachineSample } from '../../src/timing/contention.js';
import { IDLE_MS } from '../../src/timing/harness.js';
import { childMain, debugChildMessage } from '../../src/timing-phase/child.js';
import { ENTRY, RUNTIME_EXTERNALS } from '../../src/timing-phase/bundle.js';
import { BAR_IDS, buildPhaseBundle, bundlePath, CONFIG_DEFECT, PLAT_ROOT, readTimingBars, run, timingPhase, type DetectOptions, type PhaseBundleReport, type TimingsRecord } from '../../src/timing-phase/index.js';
import { detector, fixtureContext, PYTHON3, removeScratch, scratch, sha256 } from './fixtures.js';

const COMMITTED_SCORE = sha256(REFERENCE_SCORE_PATH);
afterAll(() => {
  removeScratch();
  expect(sha256(REFERENCE_SCORE_PATH)).toBe(COMMITTED_SCORE);
});

describe('(a) the production bundle: built by the recipe, its --list answers production (RL10 (a); Q8: no bar runs)', () => {
  it("builds with no error, no __name and the flag defined; 'node <bundle> --list' from outside plat/ exits 0 with the thirteen ids and its build line 'production'", async () => {
    const dir = scratch();
    const t0 = performance.now();
    const b = await buildPhaseBundle(join(dir, 'timing-phase', 'bundle', 'timing-phase.mjs'));
    const builtMs = performance.now() - t0;
    expect(b).toMatchObject({ errors: 0, keepNames: 0, debugFlagLeft: false });
    expect(b.sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(b.sha256).toBe(sha256(b.outfile));
    // the runtime externals resolved from plat/ and imported by absolute file URL (the bundle loads outside plat/)
    const text = readFileSync(b.outfile, 'utf8');
    const code = text.slice(0, text.lastIndexOf('//# sourceMappingURL='));
    for (const x of RUNTIME_EXTERNALS) expect(code, x).toMatch(new RegExp(`["']file://${PLAT_ROOT.replace(/\/$/, '')}/node_modules/[^"']*/${x}/[^"']+["']`));
    expect(code).not.toMatch(/from ["'](esbuild|playwright-core)["']|import\(["'](esbuild|playwright-core)["']\)/);
    const t1 = performance.now();
    const r = spawnSync(process.execPath, [b.outfile, '--list'], { cwd: dir, encoding: 'utf8', env: { ...process.env, PLAT_BENCH_OUT: dir, PLAT_TIMING_TOKEN: '' } });
    const listMs = performance.now() - t1;
    expect(r.status, r.stderr).toBe(0);
    const lines = r.stdout.trim().split('\n');
    expect(lines[0]).toBe(`timing-phase: build production (production-bundle; DEBUG_BUILD false, the arena's assertion switch off, __name 0, ${String(b.bytes)} bytes, sha256 ${b.sha256}; node ${process.version})`);
    expect(lines.slice(1).map((l) => l.split(' ')[1])).toEqual([...BAR_IDS]);
    expect(lines).toHaveLength(1 + readTimingBars().length);
    // Q8: the test's wall-clock, informative (never a timing)
    process.stdout.write(`bundle.test: built the production bundle in ${builtMs.toFixed(0)} ms (${String(b.bytes)} bytes); its --list ran in ${listMs.toFixed(0)} ms\n`);
  }, 180_000);
});

describe("(a) the recipe is a stated copy of bench/src/profile/bundle.ts's (the session's ruling on Q1, J725): red when either changes", () => {
  const profile = readFileSync(join(PLAT_ROOT, 'bench', 'src', 'profile', 'bundle.ts'), 'utf8');
  const mine = readFileSync(join(PLAT_ROOT, 'bench', 'src', 'timing-phase', 'bundle.ts'), 'utf8');
  /** The text of the file's one `build({ … })` call. */
  const callOf = (src: string): string => {
    const from = src.indexOf('await build({');
    expect(from, 'a build({ … }) call').toBeGreaterThan(0);
    const rest = src.slice(from);
    return rest.slice(0, rest.search(/\n\s*\}\);/));
  };
  /** The option keys of that call, in order. */
  const optionsOf = (src: string): string[] => [...callOf(src).matchAll(/^ {4}(?: {2})?(\w+)[:,]/gm)].map((m) => m[1]);
  const RECIPE_LINES = ['bundle: true,', "format: 'esm',", "target: 'es2022',", "platform: 'node',", "conditions: ['plat-source'],", "sourcemap: 'inline',", "define: { PLAT_DEBUG_BUILD: 'false' },", "logLevel: 'silent',", 'absWorkingDir: '];

  it('format, target, platform, conditions, the inline source map and the define: the same option lines in both files', () => {
    for (const line of RECIPE_LINES) {
      expect(callOf(profile), `profile/bundle.ts: ${line}`).toContain(line);
      expect(callOf(mine), `timing-phase/bundle.ts: ${line}`).toContain(line);
    }
  });

  it('no keepNames, no minify, no other option: each file passes exactly its option set (the copy states its one difference: externals by a resolving plugin)', () => {
    expect(optionsOf(profile)).toEqual(['stdin', 'outfile', 'bundle', 'format', 'target', 'platform', 'conditions', 'external', 'sourcemap', 'define', 'plugins', 'logLevel', 'absWorkingDir']);
    expect(optionsOf(mine)).toEqual(['stdin', 'outfile', 'bundle', 'format', 'target', 'platform', 'conditions', 'sourcemap', 'define', 'plugins', 'logLevel', 'absWorkingDir']);
    for (const src of [profile, mine]) expect(callOf(src)).not.toMatch(/keepNames|minify/);
    expect(profile).toContain("external: ['playwright-core'],");
    expect(mine).toContain('plugins: [runtimeExternals, metaUrl],');
    expect(profile).toContain('plugins: [metaUrl],');
  });

  it("the import-meta-url plugin: the same name, filter, node_modules skip and file URL in both; the copy replaces on the code (esbuild's define), profile on the text", () => {
    for (const src of [profile, mine]) {
      expect(src).toContain("name: 'import-meta-url',");
      expect(src).toContain('b.onLoad({ filter: /\\.(m?ts|m?js)$/ }, async (args) => {');
      expect(src).toContain("if (args.path.includes('/node_modules/')) return undefined;");
      expect(src).toContain("if (!text.includes('import.meta.url')) return undefined;");
      expect(src).toContain('JSON.stringify(pathToFileURL(args.path).href)');
    }
    expect(profile).toContain("contents: text.replaceAll('import.meta.url', JSON.stringify(pathToFileURL(args.path).href))");
    expect(mine).toContain("define: { 'import.meta.url': JSON.stringify(pathToFileURL(args.path).href) },");
    // profile's scan, which the copy reads as identifiers (stated): __name( counted, the free flag looked for, after the map is cut
    expect(profile).toContain("text.slice(0, text.lastIndexOf('//# sourceMappingURL='))");
    expect(mine).toContain("text.lastIndexOf('//# sourceMappingURL=')");
    // the entry runs the child, handing it the bundle's own URL; esbuild's service stopped after the build
    expect(ENTRY).toBe("import { childMain } from './child.ts';\nprocess.exit(await childMain(process.argv.slice(2), { bundle: new URL(import.meta.url) }));\n");
    expect(mine.match(/await stop\(\);/g)).toHaveLength(2);
  });
});

/** A planted bundle report. */
const report = (outfile: string, extra: Partial<PhaseBundleReport> = {}): PhaseBundleReport => ({ outfile, errors: 0, warnings: 0, bytes: 10, sha256: 'a'.repeat(64), keepNames: 0, debugFlagLeft: false, ...extra });

describe('(b) the launcher: every measuring invocation spawns exactly [bundle, ...args] and measures nothing in-process', () => {
  const launcher = (extra: Partial<PhaseBundleReport> = {}, code = 7) => {
    const runs: string[] = [];
    const seen: DetectOptions[] = [];
    const built: string[] = [];
    const spawned: { argv: readonly string[]; env: Readonly<Record<string, string | undefined>> }[] = [];
    const c = fixtureContext({
      runs,
      detect: detector(undefined, seen),
      launch: {
        bundle: (outfile) => {
          built.push(outfile);
          return Promise.resolve(report(outfile, extra));
        },
        spawn: (argv, env) => {
          spawned.push({ argv, env });
          return Promise.resolve(code);
        },
      },
    });
    return { c, runs, seen, built, spawned };
  };

  it('a full run and an --only run: the bundle built under PLAT_BENCH_OUT, one child [bundle, ...args] with the environment and PLAT_BENCH_OUT, its exit code returned; no group ran, no reading, no record', async () => {
    for (const args of [[], ['--only', 'insert,digest'], ['--only', 'fusion', 'skeleton']]) {
      const l = launcher();
      const score = sha256(l.c.scorePath);
      expect(await run(args, l.c), args.join(' ')).toBe(7);
      expect(l.built).toEqual([join(l.c.out, 'timing-phase', 'bundle', 'timing-phase.mjs')]);
      expect(l.built[0]).toBe(bundlePath(l.c.out));
      expect(l.spawned.map((s) => s.argv)).toEqual([[l.built[0], ...args]]);
      expect(l.spawned[0].env['PLAT_TIMING_TOKEN']).toBe('tok-fixture-1');
      expect(l.spawned[0].env['PLAT_BENCH_OUT']).toBe(l.c.out);
      expect(l.runs).toEqual([]);
      expect(l.seen).toEqual([]);
      expect(existsSync(l.c.recordPath)).toBe(false);
      expect(sha256(l.c.scorePath)).toBe(score);
      expect(l.c.lines[0]).toBe(`timing-phase: bundle ${l.built[0]}: 10 bytes, errors 0, warnings 0, __name 0, PLAT_DEBUG_BUILD defined false, sha256 ${'a'.repeat(64)}`);
      expect(l.c.lines[1]).toBe(`timing-phase: running the production bundle as one child: node ${l.built[0]}${args.length === 0 ? '' : ` ${args.join(' ')}`}`);
    }
  });

  it('without a token the launcher still only launches: the child refuses (the refusal is the child\'s, as before)', async () => {
    const l = launcher({}, 3);
    expect(await run([], { ...l.c, env: {} })).toBe(3);
    expect(l.spawned).toHaveLength(1);
    expect(l.spawned[0].env['PLAT_TIMING_TOKEN']).toBeUndefined();
  });

  it('usage, a bad timingBars row and --list stay in-process: nothing built, nothing spawned', async () => {
    for (const [args, code] of [[['--only', 'nope'], 64], [['--fast'], 64], [['--list'], 0]] as const) {
      const l = launcher();
      expect(await run([...args], l.c), args.join(' ')).toBe(code);
      expect(l.built).toEqual([]);
      expect(l.spawned).toEqual([]);
      expect(l.runs).toEqual([]);
    }
  });

  it('a bundle that is not a production one stops with exit 1, the report printed and nothing spawned (as profile/index.ts:163)', async () => {
    for (const bad of [{ errors: 2 }, { keepNames: 3 }, { debugFlagLeft: true }]) {
      const l = launcher(bad);
      expect(await run(['--only', 'insert'], l.c), JSON.stringify(bad)).toBe(1);
      expect(l.built).toHaveLength(1);
      expect(l.spawned).toEqual([]);
      expect(l.runs).toEqual([]);
      expect(l.c.lines[0]).toMatch(/^timing-phase: bundle .*: 10 bytes, errors \d, warnings 0, __name \d, PLAT_DEBUG_BUILD (defined false|LEFT IN \(not a production bundle\))/);
      expect(l.c.lines[1]).toMatch(/is not a production bundle \(errors \d, __name \d, PLAT_DEBUG_BUILD (left in|defined false)\): nothing measured \(RL10/);
    }
  });
});

describe('(c) the child refuses a debug build: exit 64 naming bench:timing-phase, nothing measured', () => {
  it('the flag on, the arena switch on (a-14 note 7), or both — and the source run itself (vitest is a debug build)', async () => {
    for (const build of [{ debugBuild: true, arenaAssertions: true }, { debugBuild: false, arenaAssertions: true }, { debugBuild: true, arenaAssertions: false }, undefined]) {
      const runs: string[] = [];
      const seen: DetectOptions[] = [];
      const c = fixtureContext({ runs, detect: detector(undefined, seen) });
      expect(await childMain([], { ...(build === undefined ? {} : { build }), ctx: c }), JSON.stringify(build)).toBe(64);
      expect(c.lines).toEqual([debugChildMessage(build ?? { debugBuild: true, arenaAssertions: true })]);
      expect(c.lines[0]).toContain('corepack pnpm bench:timing-phase builds and launches');
      expect(runs).toEqual([]);
      expect(seen).toEqual([]);
      expect(existsSync(c.recordPath)).toBe(false);
    }
  });

  it('a production child runs the script in-process; the record carries its build block (RL10 (iv))', async () => {
    const c = fixtureContext({ build: undefined });
    const code = await childMain(['--only', 'insert'], { build: { debugBuild: false, arenaAssertions: false }, bundle: null, ctx: c });
    expect(code).toBe(0);
    const r = JSON.parse(readFileSync(c.recordPath, 'utf8')) as TimingsRecord;
    expect(r.rerun[0].build).toMatchObject({ kind: 'production-bundle', debugBuild: false, arenaAssertions: false, node: process.version });
    expect(r.build).toMatchObject({ kind: 'production-bundle', recipe: expect.stringContaining('bench/src/profile/bundle.ts') });
    expect(c.lines.filter((l) => /^timing-phase: build production \(production-bundle; DEBUG_BUILD false, the arena's assertion switch off/.test(l))).toHaveLength(1);
  });
});

describe("(d) the bundled launch topology passes the preflight on a quiet machine; a python3 still refuses (B1's class not re-opened)", () => {
  const LAUNCHER = 4_000_020;
  const LOADER = 4_000_021;
  /** [the tsx launcher (node, a child of the shell), its esbuild loader (this process's SIBLING), this process (the launcher's child)]. */
  const topology = (hot: boolean, extra: MachineSample['processes'] = []): MachineSample => ({
    at: '2026-11-10T00:00:00.000Z',
    loadAverage: 0.2,
    power: 'ac',
    selfPid: process.pid,
    processes: [
      { pid: LAUNCHER, ppid: 1, pcpu: hot ? 14 : 0.3, comm: 'node' },
      { pid: LOADER, ppid: LAUNCHER, pcpu: hot ? 70 : 0.4, comm: '/p/node_modules/@esbuild/linux-x64/bin/esbuild' },
      { pid: process.pid, ppid: LAUNCHER, pcpu: hot ? 80 : 0.2, comm: 'node' },
      ...extra,
    ],
  });

  it('the idle topology: no offender — the launcher by the launch chain, its esbuild loader by the kind clause\'s launch-chain exemption (C-0465); either hot is named by the CPU clause only (C-0138)', () => {
    const judge = (m: MachineSample) => judgeContention(m, { ownPids: [], referenceScore: null, readings: 'measured', checkLoad: false });
    expect(judge(topology(false)).offenders).toEqual([]);
    expect(judge(topology(true)).offenders.map((o) => [o.pid, o.name, o.clause])).toEqual([
      [LAUNCHER, 'node', 'cpu'],
      [LOADER, 'esbuild', 'cpu'],
    ]);
  });

  it('the preflight after the 30 s idle runs; a planted python3 still refuses, naming exactly it', async () => {
    let idled = false;
    const c = fixtureContext({
      detect: detector(() => topology(!idled)),
      sleep: (ms) => Promise.resolve().then(() => void (ms >= IDLE_MS && (idled = true))),
    });
    expect((await timingPhase(['--only', 'insert'], c)).kind).toBe('ran');
    const d = fixtureContext({ detect: detector(() => topology(false, [PYTHON3])) });
    const o = await timingPhase(['--only', 'insert'], d);
    expect(o.kind).toBe('refused');
    if (o.kind === 'refused') {
      expect(o.refusal.refused).toBe('contended-machine');
      expect(o.refusal.reasons).toEqual([`process: python3 (python3, pid ${String(PYTHON3.pid)})`]);
    }
  });
});

describe('a timingBars row the bars cannot read (note 7): a typed usage-class outcome, exit 64, reached in the launcher before any bundle', () => {
  it('a row no bar recognises, a row twice, a bar without its row, a row stating no budget: each message printed verbatim, then the defect line; nothing built', async () => {
    const rows = readTimingBars();
    const cases: [typeof rows, string][] = [
      [[...rows, { ...rows[0], bar: 'a new bar ≤ 1 ms' }], 'timing-phase: the timingBars row "a new bar ≤ 1 ms" is recognised by no bar'],
      [[...rows, rows[0]], 'timing-phase: two timingBars rows are the bar insert'],
      [rows.slice(1), 'timing-phase: no timingBars row for insert'],
      [rows.map((x, i) => (i === 0 ? { ...x, bar: 'insert + snap + attract + re-walk per growth proposal' } : x)), 'timing-phase: the timingBars row "insert + snap + attract + re-walk per growth proposal" states no per-proposal budget (/≤ (\\d+(?:\\.\\d+)?) µs per growth proposal/)'],
    ];
    for (const [bad, message] of cases) {
      const built: string[] = [];
      const c = fixtureContext({ rows: bad, launch: { bundle: (o) => Promise.resolve(void built.push(o)).then(() => report(o)), spawn: () => Promise.resolve(99) } });
      expect(await run([], c), message).toBe(64);
      expect(c.lines).toEqual([message, CONFIG_DEFECT]);
      expect(built).toEqual([]);
      // --list and --only alike, and the child's in-process path
      const l = fixtureContext({ rows: bad });
      expect(await run(['--list'], l)).toBe(64);
      expect(l.lines).toEqual([message, CONFIG_DEFECT]);
      const k = fixtureContext({ rows: bad });
      expect(await childMain(['--only', 'insert'], { build: { debugBuild: false, arenaAssertions: false }, ctx: k })).toBe(64);
      expect(k.lines).toEqual([message, CONFIG_DEFECT]);
      expect(existsSync(k.recordPath)).toBe(false);
    }
  });
});
