// bench/src/tier-jobs — the three tiers' job lists (§13.8; C-0027, C-0069, C-0079, C-0088, C-0097, C-0099, C-0113,
// C-0121). M0-f-02a fills the PR list and DECLARES the nightly and milestone lists, every entry staged to the item that
// completes it; the folder is handed over to M0-f-02b, which fills those lists and the PR tier's spike stand-ins
// (M0.md §2's hand-over chain). Every status is derived at run time (bench/src/tiers/status.ts), never written here: a
// job flips to `built` when its item lands, with no edit of this file. The budgets are §13.8's and never raised here
// ("the answer is to split the job or make it faster, never to raise the cap").
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Job, TierManifest, TierName, Unit } from '../tiers/types.js';

/** The PR tier's B-FUZZ size (§13.8: 10⁴ random inputs per primitive) and the constructive set's draws per M0 case. */
export const PR_FUZZ_RUNS = 10_000;
export const PR_CONSTRUCTIVE_DRAWS = 10;
/** B-CITY-lite's seeds per rung in the PR tier (§13.8: 50; the spike runs stand in at M0, C-0015). */
export const PR_SEEDS = 50;

/** The budgets (§13.8), in ms: PR ≤ 15 min on 8 cores; nightly ≤ 4 h and milestone ≤ 12 h on 16 cores (C-0027). */
export const BUDGETS = {
  pr: { ms: 15 * 60_000, cores: 8, projected: false },
  nightly: { ms: 4 * 3_600_000, cores: 16, projected: true },
  milestone: { ms: 12 * 3_600_000, cores: 16, projected: true },
} as const satisfies Record<TierName, TierManifest['budget']>;

/** The deny-list (§17.1 (5)) and the parity baselines (§13.5): M-1's committed files (C-0071, C-0113). */
export const DENYLIST = 'packages/testkit/baselines/denylist.json';
export const BASELINES = 'packages/testkit/baselines/baselines.json';

/** `corepack pnpm …` (never a bare pnpm, C-0030). */
export const pnpm = (...args: string[]): string[] => ['corepack', 'pnpm', ...args];
/** A bench harness run through the dispatcher: `corepack pnpm bench -- <harness> <args>` (C-0059). */
export const harness = (name: string, ...args: string[]): string[] => pnpm('bench', '--', name, ...args);

/** The TypeScript projects in tsconfig.json's reference order (the dependency order), read from the tree now. */
export function tsProjects(root: string): string[] {
  const cfg = JSON.parse(readFileSync(join(root, 'tsconfig.json'), 'utf8')) as { references?: { path: string }[] };
  return (cfg.references ?? []).map((r) => r.path);
}

/** The vitest projects named in vitest.config.ts (`pkg('<name>', …)` and `name: '<name>'`), read from the tree now. */
export function vitestProjects(root: string): string[] {
  const text = readFileSync(join(root, 'vitest.config.ts'), 'utf8');
  const names: string[] = [];
  for (const m of text.matchAll(/pkg\('([^']+)'|name: '([^']+)'/g)) {
    const n = m[1] ?? m[2];
    if (n !== undefined && !names.includes(n)) names.push(n);
  }
  return names;
}

/** B-FUZZ's units (C-0097): one per kernel primitive at the tier's size, then the whole constructive set. */
export async function fuzzUnits(runs: number): Promise<Unit[]> {
  const { FUZZ_PRIMITIVES } = await import('@plat/testkit');
  const units: Unit[] = FUZZ_PRIMITIVES.map((p) => ({
    name: p.name,
    argv: harness('fuzz-bar', '--primitive', p.name, '--runs', String(runs), '--constructive-seeds', String(PR_CONSTRUCTIVE_DRAWS), '--no-summary'),
  }));
  // The constructive set is never cut (§13.8): its draws are fixed and the random fuzz is one input per primitive here.
  units.push({ name: 'constructive set', argv: harness('fuzz-bar', '--runs', '1', '--constructive-seeds', String(PR_CONSTRUCTIVE_DRAWS), '--no-summary') });
  return units;
}

/** The PR tier's jobs at M0 (§13.8's PR contents that exist at M0; §16 M0 (f)). */
export function prJobs(root: string): Job[] {
  return [
    {
      name: 'lint',
      kind: 'command',
      source: 'scripts/lint.mjs',
      inputs: [],
      item: 'M0-d-07',
      // the determinism allowlist, dependency direction, the repository path rule, the vendored scan and the lint's
      // whole-tree checks in one run: scripts/lint.mjs takes no package argument, so one unit (C-0241 (8))
      units: () => [{ name: 'lint (whole tree)', argv: pnpm('lint') }],
    },
    {
      name: 'type check',
      kind: 'command',
      source: 'tsconfig.json',
      inputs: [],
      item: 'M0-s-01',
      // tsc per project in reference order, each project checked whole and its declarations emitted for the next
      // (incremental off, so a unit never reuses an earlier build's state; C-0241 (7))
      units: () => tsProjects(root).map((p) => ({ name: p, argv: pnpm('exec', 'tsc', '-p', p, '--composite', 'false', '--incremental', 'false') })),
    },
    {
      name: 'unit and contract tests',
      kind: 'command',
      source: 'vitest.config.ts',
      inputs: [],
      item: 'M0-s-01',
      // vitest per project; the tier sizes are cleared from the environment, so the property tests and the edge suite
      // run at their PR sizes (PLAT_FUZZ_RUNS 10⁴, PLAT_EDGE_SEEDS 10)
      units: () => vitestProjects(root).map((p) => ({ name: p, argv: pnpm('exec', 'vitest', 'run', '--project', p) })),
    },
    {
      name: 'B-FUZZ (10⁴ per primitive and the constructive set)',
      kind: 'harness',
      source: 'bench/src/fuzz-bar/',
      inputs: [],
      item: 'M0-k-04',
      size: { kind: 'fuzz', n: PR_FUZZ_RUNS },
      units: (n) => fuzzUnits(n ?? PR_FUZZ_RUNS),
    },
    {
      name: 'licence check',
      kind: 'command',
      source: 'tools/lint/licences.mjs',
      inputs: [],
      item: 'M0-d-07',
      units: () => [
        {
          name: 'licence check',
          argv: [
            process.execPath,
            '--input-type=module',
            '-e',
            "const m = await import('./tools/lint/licences.mjs'); const r = m.checkLicencesOf(); for (const l of r.report) console.log(l); for (const p of r.problems) console.error(p); process.exit(r.ok ? 0 : 1);",
          ],
        },
      ],
    },
    {
      name: 'notices check',
      kind: 'command',
      source: 'tools/notices/generate.mjs',
      inputs: [],
      item: 'M0-s-01',
      units: () => [{ name: 'notices:check', argv: pnpm('notices:check') }],
    },
    {
      name: 'vendor check',
      kind: 'command',
      source: 'tools/vendor/verify.mjs',
      inputs: [],
      item: 'M0-s-01',
      units: () => [{ name: 'vendor:verify', argv: pnpm('vendor:verify') }],
    },
    {
      name: 'deny-list scan',
      kind: 'harness',
      source: 'bench/src/scan/',
      inputs: [DENYLIST],
      reviewedBy: ['M0-k-07'],
      item: 'M0-k-06',
      // one unit until the scanner's command takes a package (C-0241 (8)); pending until M-1's list crosses and
      // M0-k-07's summary names its sha256 (C-0101, C-0121)
      units: () => [{ name: 'scan (whole tree)', argv: harness('scan') }],
    },
    {
      name: 'B-CITY-lite stand-in: fusion spike',
      kind: 'harness',
      source: 'bench/src/fusion/',
      inputs: [],
      item: 'M0-c-06',
      stagedTo: 'M0-f-02b',
      size: { kind: 'seeds', n: PR_SEEDS },
      // declared here, filled by M0-f-02b (its arguments and its 10-seed blocks, C-0097)
      units: (n) => [{ name: `seeds 0–${String((n ?? PR_SEEDS) - 1)}`, argv: harness('fusion', '--seeds', String(n ?? PR_SEEDS)) }],
    },
    {
      name: 'B-CITY-lite stand-in: site spike',
      kind: 'harness',
      source: 'bench/src/site/',
      inputs: [],
      item: 'M0-e-06',
      stagedTo: 'M0-f-02b',
      size: { kind: 'seeds', n: PR_SEEDS },
      units: (n) => [{ name: `seeds 0–${String((n ?? PR_SEEDS) - 1)}`, argv: harness('site', '--seeds', String(n ?? PR_SEEDS)) }],
    },
  ];
}

/** A declared entry (C-0099): its source and owning item named, its arguments M0-f-02b's — staged until then. */
function declared(name: string, kind: Job['kind'], source: string, item: string, extra: Partial<Job> = {}): Job {
  return {
    name,
    kind,
    source,
    inputs: [],
    item,
    stagedTo: 'M0-f-02b',
    units: () => {
      throw new Error(`tier job ${name}: declared by M0-f-02a, filled by ${extra.stagedTo ?? 'M0-f-02b'}`);
    },
    ...extra,
  };
}

/** The nightly tier's jobs, declared (§13.8's nightly contents at M0; filled by M0-f-02b). */
export function nightlyJobs(): Job[] {
  return [
    declared('B-FUZZ (10⁶ per primitive)', 'harness', 'bench/src/fuzz-bar/', 'M0-k-04', { size: { kind: 'fuzz', n: 1_000_000 } }),
    declared('fusion spike (full seed set)', 'harness', 'bench/src/fusion/', 'M0-c-06'),
    declared('site spike (full seed set)', 'harness', 'bench/src/site/', 'M0-e-06'),
    declared('bent-cut F-CUT harness', 'harness', 'bench/src/bentcut/', 'M0-b-04'),
    declared('cross-host run', 'harness', 'bench/src/crosshost/', 'M0-d-06'),
    declared('determinism spike', 'harness', 'bench/src/determinism/', 'M0-d-09'),
    declared('edge-suite (1 000 seeds)', 'vitest', 'packages/testkit/test/edge/', 'M0-x-06'),
    declared('ladder-coverage bench', 'harness', 'bench/src/ladder-coverage/', 'M0-x-05'),
    // pending until baselines.json is committed and both phase-a run items' summaries name its sha256 (C-0068, C-0121)
    declared('parity report', 'harness', 'bench/src/parity/', 'M0-k-05', { inputs: [BASELINES], reviewedBy: ['M0-b-05a', 'M0-c-07a'] }),
    // last and alone: §13.8's four nightly timing-phase contents, all M1's; never bench:timing-phase (C-0088)
    declared('timing-phase (nightly contents)', 'command', 'bench/src/tier-jobs/nightly-timing-phase.ts', 'M1', { stagedTo: 'M1' }),
  ];
}

/** The milestone tier's jobs, declared: the nightly set and the F-CUT 10⁵-face bar (filled by M0-f-02b). */
export function milestoneJobs(): Job[] {
  return [...nightlyJobs().filter((j) => j.stagedTo !== 'M1'), declared('F-CUT (10⁵ faces)', 'harness', 'bench/src/bentcut/', 'M0-b-04')];
}

/** The tier's manifest over the tree at `root`. */
export function manifest(tier: TierName, root: string): TierManifest {
  const jobs = tier === 'pr' ? prJobs(root) : tier === 'nightly' ? nightlyJobs() : milestoneJobs();
  return { tier, budget: { ...BUDGETS[tier] }, jobs };
}
