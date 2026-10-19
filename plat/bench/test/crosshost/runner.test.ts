// The bench runner's own tests (M0-d-06; C-0114): the leg list and the command line, the cache-only launch, and the
// timing mode's report shape on a fixture bundle — `corepack pnpm bench -- crosshost run <fixture> …` through its run().
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import { CROSSHOST_LEGS, crossHostPlaywright, planCrossHostLeg, type CrossHostLegId } from '@plat/testkit';
import { EXIT_INCOMPLETE, KERNEL_FIXTURE, fixturePath, parseCrossHostArgs, run } from '../../src/crosshost/index.js';

const PLAT = fileURLToPath(new URL('../../../', import.meta.url));
const scratch = mkdtempSync(join(tmpdir(), 'plat-crosshost-bench-'));
afterAll(() => rmSync(scratch, { recursive: true, force: true }));
const TIMEOUT = 600_000;

async function nodeLegs(): Promise<CrossHostLegId[]> {
  const out: CrossHostLegId[] = [];
  for (const leg of ['node-arm64', 'node-x64-rosetta'] as const) if ((await planCrossHostLeg(leg)).runnable) out.push(leg);
  return out;
}

describe('the leg list and the command line', () => {
  it('names the five legs in order, the arm64 reference first', () => {
    expect(CROSSHOST_LEGS).toEqual(['node-arm64', 'node-x64-rosetta', 'chromium', 'firefox', 'webkit']);
  });
  it('runs every leg with workers off and on by default; --legs and --workers narrow it', () => {
    expect(parseCrossHostArgs(['run', 'kernel'])).toEqual({ ok: true, fixture: 'kernel', timing: false, legs: [...CROSSHOST_LEGS], workers: ['off', 'on'] });
    expect(parseCrossHostArgs(['run', 'kernel', '--timing', '--legs', 'webkit,chromium', '--workers', 'on'])).toEqual({ ok: true, fixture: 'kernel', timing: true, legs: ['chromium', 'webkit'], workers: ['on'] });
    expect(parseCrossHostArgs(['run', 'x', '--workers', 'both'])).toMatchObject({ ok: true, workers: ['off', 'on'] });
  });
  it('refuses a bad command line', () => {
    for (const a of [[], ['go', 'kernel'], ['run'], ['run', 'a', 'b'], ['run', 'a', '--legs', 'safari'], ['run', 'a', '--legs', 'webkit,webkit'], ['run', 'a', '--legs'], ['run', 'a', '--workers', 'two'], ['run', 'a', '--fast'], ['run', 'a', '--timing', '--timing']]) {
      expect(parseCrossHostArgs(a).ok, a.join(' ')).toBe(false);
    }
  });
  it('reads a bare name as a fixture of fixtures/, anything else as a plat/-relative path', () => {
    expect(fixturePath('kernel')).toBe(KERNEL_FIXTURE);
    expect(fixturePath('bench/test/crosshost/tiny.json')).toBe('bench/test/crosshost/tiny.json');
  });
  it('exits 64 on a bad argument or a fixture it refuses (missing, outside plat/)', async () => {
    const out = join(scratch, 'bad');
    expect(await run(['run'], { out })).toBe(64);
    expect(await run(['run', 'no-such-fixture'], { out })).toBe(64);
    expect(await run(['run', '../../etc/passwd'], { out })).toBe(64);
  });
});

describe('the cache-only launch', () => {
  it('sets PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 before playwright-core loads, as the install script does', async () => {
    await crossHostPlaywright();
    expect(process.env['PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD']).toBe('1');
    const pkg = JSON.parse(readFileSync(join(PLAT, 'package.json'), 'utf8')) as { scripts: Record<string, string> };
    expect(pkg.scripts['install:frozen']).toContain('PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1');
    const src = readFileSync(join(PLAT, 'packages/testkit/src/crosshost/legs.ts'), 'utf8');
    expect(src.indexOf("process.env['PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD'] = '1'")).toBeGreaterThan(-1);
    expect(src.indexOf("process.env['PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD'] = '1'")).toBeLessThan(src.indexOf("await import('playwright-core')"));
    expect(src).not.toMatch(/\binstall\(|registry\.install|npx playwright/);
  });

  it(
    'launches exactly the pinned build inside the cache it is pointed at; a build that refuses to start is blocked, never downloaded',
    async () => {
      const { pw, root } = await crossHostPlaywright();
      expect(root).not.toBeNull();
      const inCache = relative(root ?? '', pw.chromium.executablePath());
      const cache = join(scratch, 'fake-cache');
      const exe = join(cache, inCache);
      const marker = join(scratch, 'launched.txt');
      mkdirSync(dirname(exe), { recursive: true });
      writeFileSync(exe, `#!/bin/sh\necho "$0" > '${marker}'\nexit 1\n`);
      chmodSync(exe, 0o755);
      const out = join(scratch, 'out-fake');
      const legs = await nodeLegs();
      const pids: number[] = [];
      const code = await run(['run', 'bench/test/crosshost/tiny.json', '--legs', [...legs, 'chromium'].join(',')], {
        out,
        runner: { env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: cache }, onChild: (pid) => pids.push(pid) },
      });
      expect(code).toBe(EXIT_INCOMPLETE);
      expect(readFileSync(marker, 'utf8').trim()).toBe(exe);
      const report = (JSON.parse(readFileSync(join(out, 'crosshost-tiny.json'), 'utf8')) as { report: { runs: { leg: string; status: string; reason?: string }[] } }).report;
      for (const r of report.runs.filter((x) => x.leg === 'chromium')) {
        expect(r.status).toBe('blocked');
        expect(r.reason).toContain(`refused to launch from the Playwright cache (${exe})`);
        expect(r.reason).toContain('never downloaded');
      }
      expect(report.runs.filter((x) => x.leg.startsWith('node-')).every((x) => x.status === 'ran')).toBe(true);
      expect(pids.length).toBeGreaterThanOrEqual(2 * legs.length);
    },
    TIMEOUT,
  );
});

describe("the timing mode's report shape on a fixture bundle", () => {
  it(
    'writes crosshost-<id>.json with the report and one figure per stage per seed per run; no summary for a non-kernel fixture',
    async () => {
      const legs = await nodeLegs();
      const out = join(scratch, 'out-timing');
      const summary = join(scratch, 'summary-tiny.json');
      const code = await run(['run', 'bench/test/crosshost/tiny.json', '--timing', '--legs', legs.join(','), '--workers', 'on'], { out, summary });
      expect(code).toBe(0);
      expect(existsSync(summary)).toBe(false);
      const doc = JSON.parse(readFileSync(join(out, 'crosshost-tiny.json'), 'utf8')) as {
        item: string;
        report: { timing: boolean; verdict: string; cellsPerRun: number; runs: { leg: string; workers: string; cells: { stage: string; seed: number | null; ms: number }[] }[] };
        times: { leg: string; workers: string; stages: { stage: string; seeds: (number | null)[]; ms: number[]; medianMs: number }[] }[];
      };
      expect(doc.item).toBe('M0-d-06');
      expect(doc.report.timing).toBe(true);
      expect(doc.report.verdict).toBe('pass');
      expect(doc.report.cellsPerRun).toBe(1 + 3);
      expect(doc.times.map((t) => `${t.leg}/${t.workers}`)).toEqual(legs.map((l) => `${l}/on`));
      for (const t of doc.times) {
        expect(t.stages.map((s) => [s.stage, s.seeds])).toEqual([
          ['once', [null]],
          ['per-seed', [1, 2, 3]],
        ]);
        for (const s of t.stages) for (const ms of s.ms) expect(ms).toBeGreaterThanOrEqual(0);
      }
    },
    TIMEOUT,
  );

  it(
    "the kernel fixture's full run writes the numbers-only summary: counts, statuses, the verdict",
    async () => {
      const legs = await nodeLegs();
      const summary = join(scratch, 'summary-kernel.json');
      // the browsers pointed at an empty cache, so they are blocked on every machine and the run is the full one
      const emptyCache = mkdtempSync(join(scratch, 'empty-cache-'));
      const code = await run(['run', 'kernel'], { out: join(scratch, 'out-kernel'), summary, runner: { env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: emptyCache } } });
      expect(code).toBe(EXIT_INCOMPLETE);
      const s = JSON.parse(readFileSync(summary, 'utf8')) as Record<string, unknown>;
      expect(s).toMatchObject({ item: 'M0-d-06', fixture: 'kernel', seeds: 16, stages: 9, cellsPerRun: 99, timing: false, reference: 'node-arm64/off', ran: 2 * legs.length, blocked: 10 - 2 * legs.length, failed: 0, differences: 0, verdict: 'incomplete' });
      const runs = s['runs'] as { leg: string; workers: string; status: string; arch?: string; kind?: string; thread?: string }[];
      expect(runs.map((r) => `${r.leg}/${r.workers}`)).toEqual(CROSSHOST_LEGS.flatMap((l) => [`${l}/off`, `${l}/on`]));
      expect(runs.filter((r) => r.status === 'ran').map((r) => `${r.leg}/${r.workers}/${String(r.thread)}`)).toEqual(legs.flatMap((l) => [`${l}/off/main`, `${l}/on/worker`]));
      for (const r of runs.filter((x) => x.leg === 'node-x64-rosetta')) expect(r.arch).toBe('x64');
    },
    TIMEOUT,
  );

  // Hardening round S1, row 4 (checks/M0-d-06-notes.md note 4): a narrowed kernel run (some legs, one workers
  // setting, or the timing mode) once overwrote the committed summary with its own few runs.
  it(
    "a narrowed kernel run (fewer legs, one workers setting, the timing mode) leaves the summary unwritten and says so",
    async () => {
      const emptyCache = mkdtempSync(join(scratch, 'empty-cache-'));
      const runner = { env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: emptyCache } };
      const legs = await nodeLegs();
      const narrowed: [string, string[], number][] = [
        ['legs', ['run', 'kernel', '--legs', [...legs, 'chromium'].join(',')], EXIT_INCOMPLETE],
        ['workers', ['run', 'kernel', '--workers', 'on'], EXIT_INCOMPLETE],
        ['timing', ['run', 'kernel', '--timing'], EXIT_INCOMPLETE],
      ];
      for (const [what, args, want] of narrowed) {
        const summary = join(scratch, `summary-narrowed-${what}.json`);
        const lines: string[] = [];
        const write = process.stdout.write.bind(process.stdout);
        process.stdout.write = ((chunk: string | Uint8Array, ...rest: unknown[]) => {
          lines.push(String(chunk));
          return (write as (c: string | Uint8Array, ...r: unknown[]) => boolean)(chunk, ...rest);
        }) as typeof process.stdout.write;
        let code: number;
        try {
          code = await run(args, { out: join(scratch, `out-narrowed-${what}`), summary, runner });
        } finally {
          process.stdout.write = write;
        }
        expect(code, what).toBe(want);
        expect(existsSync(summary), what).toBe(false);
        expect(lines.join(''), what).toContain(`crosshost: summary ${summary} not written: a narrowed run`);
        expect(existsSync(join(scratch, `out-narrowed-${what}`, 'crosshost-kernel.json')), what).toBe(true);
      }
    },
    TIMEOUT,
  );
});
