// M0-d-06's first test and its exit bar on the kernel fixtures (§6.5 (9), §16 M0 (d); C-0028): the five legs × workers
// on / off run the kernel fixtures — the constructive set's digests, the dmath and xoshiro vectors, the lane encoder,
// regularFit's doubles, the medial axis' circumcentres — and agree bit for bit. Every leg this machine can run runs;
// a leg it cannot (no arm64 Node; a browser absent from the Playwright cache) is reported blocked with its reason and
// never faked, which keeps the verdict `incomplete`, never a pass. On the reference Mac every leg runs and the verdict
// must be `pass` (the Mac step, C-0228 (6)).
import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  CROSSHOST_KERNEL_STAGES,
  CROSSHOST_LEGS,
  CROSSHOST_PLAT_ROOT,
  crossHostJobOf,
  crossHostKatExpected,
  planCrossHostLeg,
  runCrossHost,
  runCrossHostJob,
  type CrossHostLegPlan,
  type CrossHostReport,
} from '@plat/testkit';
import { kernelFixture, ON_REFERENCE_MAC, RUN_TIMEOUT_MS } from './support.js';

let report: CrossHostReport;
const plans = new Map<string, CrossHostLegPlan>();

beforeAll(async () => {
  for (const leg of CROSSHOST_LEGS) plans.set(leg, await planCrossHostLeg(leg));
  report = await runCrossHost(kernelFixture());
}, RUN_TIMEOUT_MS);

afterAll(() => {
  // the run's shape, for the seat's log
  const line = report.runs.map((r) => `${r.leg}/${r.workers}:${r.status}${r.agrees === false ? '!' : ''}`).join(' ');
  process.stdout.write(`crosshost kernel: ${line} → ${report.verdict}\n`);
});

describe('the five legs × workers on / off on the kernel fixtures', () => {
  it('asks for all ten runs, in the report order (legs as listed, workers off before on)', () => {
    expect(report.runs.map((r) => `${r.leg}/${r.workers}`)).toEqual(CROSSHOST_LEGS.flatMap((l) => [`${l}/off`, `${l}/on`]));
    expect(report.reference).toEqual({ leg: 'node-arm64', workers: 'off' });
    // 3 unseeded known-answer stages + 16 seeds × 6 seeded stages
    expect(report.cellsPerRun).toBe(3 + 16 * 6);
  });

  it('runs every leg this machine can run and blocks exactly the others, each with its reason', () => {
    for (const r of report.runs) {
      const plan = plans.get(r.leg);
      expect(plan, r.leg).toBeDefined();
      if (plan?.runnable) expect(r.status, `${r.leg}/${r.workers}: ${r.reason ?? ''}`).toBe('ran');
      else {
        expect(r.status).toBe('blocked');
        expect(r.reason).toBe(plan?.runnable === false ? plan.reason : '');
        expect(r.cells).toBeUndefined();
      }
    }
    expect(report.runs.some((r) => r.status === 'failed')).toBe(false);
    // an x86-64 Node runs on every machine M0 uses (the Mac's Rosetta slice, or a native x86-64 host)
    expect(report.runs.filter((r) => r.leg === 'node-x64-rosetta').map((r) => r.status)).toEqual(['ran', 'ran']);
  });

  it('agrees bit for bit: every ran run equals the compared run, cell for cell, and no difference is named', () => {
    const ran = report.runs.filter((r) => r.status === 'ran');
    expect(ran.length).toBeGreaterThanOrEqual(2);
    expect(report.differences).toEqual([]);
    const base = ran.find((r) => r.leg === report.comparedWith?.leg && r.workers === report.comparedWith.workers);
    expect(base?.cells?.length).toBe(report.cellsPerRun);
    for (const r of ran) {
      if (r === base) continue;
      expect(r.agrees, `${r.leg}/${r.workers}`).toBe(true);
      expect(r.cells).toEqual(base?.cells);
    }
    for (const c of base?.cells ?? []) {
      expect(c.error, `${c.stage}@${String(c.seed)}`).toBeUndefined();
      expect(c.model).toMatch(/^[0-9a-f]{32}$/);
      expect(c.records).toBeNull();
    }
  });

  it('the verdict: pass on the reference Mac (all ten ran), incomplete where a leg is blocked — never a pass then', () => {
    const blocked = report.runs.some((r) => r.status === 'blocked');
    expect(report.verdict).toBe(blocked ? 'incomplete' : 'pass');
    if (ON_REFERENCE_MAC) expect(report.verdict).toBe('pass');
    if (blocked) expect(report.comparedWith).not.toBeNull();
  });

  it('stamps every Node leg with its host record: the x86-64 leg is process.arch x64 (rosetta on the Mac, native-x64 elsewhere), the arm64 leg arm64', () => {
    for (const r of report.runs.filter((x) => x.status === 'ran' && x.leg.startsWith('node-'))) {
      const h = r.host;
      expect(h?.engine.name).toBe('node');
      expect(h?.engine.version).toBe(process.version);
      expect(h?.engine.v8).toBe(process.versions.v8);
      expect(h?.cores).toBeGreaterThan(0);
      expect(h?.memoryBytes).toBeGreaterThan(0);
      expect(h?.cpu).not.toBe('');
      expect(h?.os).toContain(process.platform);
      if (r.leg === 'node-x64-rosetta') {
        expect(h?.arch).toBe('x64');
        expect(h?.kind).toBe(process.platform === 'darwin' ? 'rosetta' : 'native-x64');
      } else {
        expect(h?.arch).toBe('arm64');
        expect(h?.kind).toBe('native-arm64');
      }
      expect(r.thread).toBe(r.workers === 'on' ? 'worker' : 'main');
    }
  });

  it('every leg that agrees agrees with the C on both architectures: the known-answer stages digest to the committed vectors', () => {
    const base = report.runs.find((r) => r.status === 'ran');
    const inputsOf = (arch: 'arm64' | 'x86_64'): Record<string, string> => {
      const k = kernelFixture();
      const out: Record<string, string> = { ...k.inputs };
      for (const name of Object.keys(out)) {
        if (name.startsWith('fdlibm/')) out[name] = readFileSync(`${CROSSHOST_PLAT_ROOT}packages/kernel/test/vectors/fdlibm/${arch}/${name.slice(7)}`, 'utf8');
        if (name.startsWith('xoshiro/')) out[name] = readFileSync(`${CROSSHOST_PLAT_ROOT}packages/kernel/test/vectors/xoshiro/${arch}/${name.slice(8)}`, 'utf8');
      }
      return out;
    };
    for (const arch of ['arm64', 'x86_64'] as const) {
      const inputs = inputsOf(arch);
      for (const stage of ['xoshiro.kat', 'dmath.kat', 'lanes.kat'] as const) {
        const cell = base?.cells?.find((c) => c.stage === stage);
        expect(cell?.seed).toBeNull();
        expect(cell?.model, `${stage} against the ${arch} vectors`).toBe(crossHostKatExpected(stage, inputs));
      }
    }
  });

  it("the runner's own Node (vitest's, in process) gives the same cells as the legs", () => {
    const base = report.runs.find((r) => r.status === 'ran');
    const here = runCrossHostJob(CROSSHOST_KERNEL_STAGES, crossHostJobOf(kernelFixture(), false), 'main');
    expect(here.cells).toEqual(base?.cells);
  });
});
