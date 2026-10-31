// bench/src/tier-jobs — the three tiers' job lists (§13.8; C-0027, C-0069, C-0079, C-0088, C-0097, C-0099, C-0113,
// C-0121). M0-f-02a filled the PR list and DECLARED the nightly and milestone lists, every entry staged to the item that
// completes it; the folder was handed over to M0-f-02b (M0.md §2's hand-over chain), which fills those lists and the PR
// tier's spike stand-ins, complete for M0 (the readings it took: C-0447). Every status is derived at run time
// (bench/src/tiers/status.ts), never written here: a job flips to `built` when its item lands, with no edit of this file.
// The budgets are §13.8's and never raised here ("the answer is to split the job or make it faster, never to raise the
// cap"). The sizes are the design's (J238): no job cut, no size narrowed; an empty suite fails naming it (§13.8 Edges).
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Job, Suite, TierManifest, TierName, Unit } from '../tiers/types.js';

/** plat/ (this file is bench/src/tier-jobs/index.ts): the tree the lists read when no root is given. */
const HERE_ROOT = fileURLToPath(new URL('../../../', import.meta.url));

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
      size: { kind: 'seeds', n: PR_SEEDS },
      // the flat CITY fixture (C-0016) is the family the seeds draw from: missing or empty, the job fails naming it (N-6)
      suites: [FUSION_FIXTURE],
      // the stand-in per 10-seed block (C-0097), seeds from 1 as the gate's own run (fusion's --from default)
      units: (n) => seedBlocks(1, n ?? PR_SEEDS).map((b) => ({ name: blockName(b), argv: harness('fusion', '--from', String(b.from), '--seeds', String(b.count)) })),
    },
    {
      name: 'B-CITY-lite stand-in: site spike',
      kind: 'harness',
      source: 'bench/src/site/',
      inputs: [],
      item: 'M0-e-06',
      size: { kind: 'seeds', n: PR_SEEDS },
      suites: [SITE_FIXTURES],
      units: (n) => seedBlocks(1, n ?? PR_SEEDS).map((b) => ({ name: blockName(b), argv: harness('site', '--first', String(b.from), '--seeds', String(b.count)) })),
    },
  ];
}

/** The seeds per block of a spike job's units (C-0097: "the spike stand-ins per 10-seed block"). */
export const SEED_BLOCK = 10;

/** A block of consecutive seeds. */
export interface SeedBlock {
  from: number;
  count: number;
}

/** `n` seeds from `first` in blocks of SEED_BLOCK, the last block holding the remainder; none for n < 1 (an empty family). */
export function seedBlocks(first: number, n: number, block: number = SEED_BLOCK): SeedBlock[] {
  const out: SeedBlock[] = [];
  for (let from = first; from < first + n; from += block) out.push({ from, count: Math.min(block, first + n - from) });
  return out;
}

const blockName = (b: SeedBlock): string => `seeds ${String(b.from)}–${String(b.from + b.count - 1)}`;

/** The suites the spike jobs read (N-6): the fixture each seed family is drawn on; missing or empty fails naming it. */
export const FUSION_FIXTURE = { kind: 'fixtures', path: 'packages/layout/src/fixtures/flat.ts' } as const satisfies Suite;
export const SITE_FIXTURES = { kind: 'fixtures', path: 'bench/src/site/fixtures.ts' } as const satisfies Suite;
export const BENTCUT_FACES = { kind: 'fixtures', path: 'bench/src/bentcut/faces.ts' } as const satisfies Suite;
export const CROSSHOST_KERNEL = { kind: 'fixtures', path: 'bench/src/crosshost/fixtures/kernel.json' } as const satisfies Suite;

/** The full seed sets of the spike harnesses (their bars' sizes: fusion's 1 000, §16 M0 (c); the site spike's 200). */
export const FUSION_SEEDS = 1_000;
export const SITE_SEEDS = 200;
/** B-FUZZ's nightly size (§13.8: 10⁶ random inputs per primitive; §16 M0 (a)). */
export const NIGHTLY_FUZZ_RUNS = 1_000_000;
/** The bent cut's F-CUT bar size (§4.6 step 8: 10⁵ random concave and holed faces; the milestone tier's job). */
export const FCUT_FACES = 100_000;

/** The edge suite (M0-x-06; C-0100): its vitest folder, its nightly seed count, the run judged a hang (support.ts). */
export const EDGE_FOLDER = 'packages/testkit/test/edge/';
export const EDGE_NIGHTLY_SEEDS = 1000;
export const EDGE_HANG_MS = 120_000;
/**
 * A unit of the edge suite stopped and failed when it outlasts the milestone tier's whole budget (12 h): a run that
 * never returns is caught here, the hang then attributed by the post-hoc unit (the x-06 notes' row 10; C-0447).
 */
export const EDGE_DEADLINE_MS = 12 * 3_600_000;

/** The ladder-coverage bench's committed summary, reproduced byte for byte by a second process (the x-05 notes' row 5). */
export const LADDER_SUMMARY = 'docs/build/summaries/M0-x-05.json';
/** The parity report's our side: the phase-a run item's summary carrying `parityOurs` (M0-c-07a; C-0121). */
export const PARITY_OURS = 'docs/build/summaries/M0-c-07a.json';

/** The tier jobs' own command (bench/src/tier-jobs/cli.ts, run through tsx from plat/ like the dispatcher). */
export const TIER_CLI = 'bench/src/tier-jobs/cli.ts';
export const tierCli = (...args: string[]): string[] => pnpm('exec', 'tsx', '--conditions=plat-source', TIER_CLI, ...args);
/**
 * A harness run through the tier command, which hands it a summary path under PLAT_BENCH_OUT, so a harness that writes
 * its numbers-only summary on a bar run (the cross-host run, the determinism spike, the ladder-coverage bench) writes
 * nothing tracked into plat/ (C-0411 (4)'s reading of C-0241 (8); C-0447).
 */
export const redirected = (name: string, ...args: string[]): string[] => tierCli('harness', name, ...args);

/** The vitest command of one edge-suite test file: the testkit project, that file (the tree's own form). */
export const edgeVitest = (file: string): string[] => pnpm('exec', 'vitest', 'run', '--project', 'testkit', `${EDGE_FOLDER}${file}`);

/** The edge suite's test files in the tree now, in code-unit order (a folder of none gives no unit: the job fails). */
export function edgeFiles(root: string): string[] {
  let names: string[];
  try {
    names = readdirSync(join(root, EDGE_FOLDER));
  } catch {
    return [];
  }
  return names.filter((n) => /\.test\.ts$/.test(n)).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

/**
 * The edge suite at 1 000 seeds (B-EDGE's nightly form at M0, C-0100): one unit per test file (C-0097's "the edge suite
 * per fixture" at the grain vitest takes), each the file's vitest run with PLAT_EDGE_SEEDS=1000 under the tier
 * command's watch (its outcomes logged under PLAT_BENCH_OUT, stopped at EDGE_DEADLINE_MS), then the post-hoc hang
 * attribution over those logs (x-06's row 10).
 */
export function edgeUnits(root: string): Unit[] {
  const env = { PLAT_EDGE_SEEDS: String(EDGE_NIGHTLY_SEEDS) };
  const files = edgeFiles(root);
  if (files.length === 0) return [];
  return [
    ...files.map((f) => ({ name: f, argv: tierCli('edge', '--deadline-ms', String(EDGE_DEADLINE_MS), '--', ...edgeVitest(f)), env })),
    { name: 'hang attribution (post-hoc)', argv: tierCli('edge-hangs', '--hang-ms', String(EDGE_HANG_MS)), env },
  ];
}

/** The nightly tier's jobs over the tree at `root` (§13.8's nightly contents that exist at M0; §16 M0 (f)). */
export function nightlyJobs(root: string = HERE_ROOT): Job[] {
  return [
    {
      name: 'B-FUZZ (10⁶ per primitive)',
      kind: 'harness',
      source: 'bench/src/fuzz-bar/',
      inputs: [],
      item: 'M0-k-04',
      size: { kind: 'fuzz', n: NIGHTLY_FUZZ_RUNS },
      units: (n) => fuzzUnits(n ?? NIGHTLY_FUZZ_RUNS),
    },
    {
      name: 'fusion spike (full seed set)',
      kind: 'harness',
      source: 'bench/src/fusion/',
      inputs: [],
      item: 'M0-c-06',
      size: { kind: 'seeds', n: FUSION_SEEDS },
      suites: [FUSION_FIXTURE],
      units: (n) => seedBlocks(1, n ?? FUSION_SEEDS).map((b) => ({ name: blockName(b), argv: harness('fusion', '--from', String(b.from), '--seeds', String(b.count)) })),
    },
    {
      name: 'site spike (full seed set)',
      kind: 'harness',
      source: 'bench/src/site/',
      inputs: [],
      item: 'M0-e-06',
      size: { kind: 'seeds', n: SITE_SEEDS },
      suites: [SITE_FIXTURES],
      units: (n) => seedBlocks(1, n ?? SITE_SEEDS).map((b) => ({ name: blockName(b), argv: harness('site', '--first', String(b.from), '--seeds', String(b.count)) })),
    },
    {
      name: 'bent-cut F-CUT harness',
      kind: 'harness',
      source: 'bench/src/bentcut/',
      inputs: [],
      item: 'M0-b-04',
      suites: [BENTCUT_FACES],
      // its nightly parts at their bar sizes (1 000 districts judged with F-CUT, the signature's 100 faces a kind,
      // T34-1's 10 000-draw mean nightly, §13.8's schedule); F-CUT on 10⁵ faces is the milestone tier's job
      units: () => [{ name: 'residue, signature, T34-1 mean', argv: harness('bentcut', '--only', 'residue,signature,t34') }],
    },
    {
      name: 'cross-host run',
      kind: 'harness',
      source: 'bench/src/crosshost/',
      inputs: [],
      item: 'M0-d-06',
      suites: [CROSSHOST_KERNEL],
      // the full run: all five legs, workers off and on (a leg blocked on a host exits 3: incomplete, never a pass)
      units: () => [{ name: 'kernel fixture, five legs, workers off and on', argv: redirected('crosshost', 'run', 'kernel') }],
    },
    {
      name: 'determinism spike',
      kind: 'harness',
      source: 'bench/src/determinism/',
      inputs: [],
      item: 'M0-d-09',
      // its bar run: 100 seeds of the spike city at CITY on the five legs, workers off and on
      units: () => [{ name: 'spike city, 100 seeds', argv: redirected('determinism') }],
    },
    {
      name: 'edge-suite (1 000 seeds)',
      kind: 'vitest',
      source: EDGE_FOLDER,
      inputs: [],
      item: 'M0-x-06',
      units: () => edgeUnits(root),
    },
    {
      name: 'ladder-coverage bench',
      kind: 'harness',
      source: 'bench/src/ladder-coverage/',
      inputs: [],
      item: 'M0-x-05',
      // the committed summary is the baseline the second process reproduces: missing or empty fails naming it
      suites: [{ kind: 'baseline', path: LADDER_SUMMARY }],
      units: () => [
        { name: 'whole run (the plain flat fixture at seed 1, the kernel at its own draws)', argv: redirected('ladder-coverage') },
        { name: 'the summary reproduced byte for byte in a second process', argv: tierCli('same-summary', 'M0-x-05') },
      ],
    },
    {
      name: 'parity report',
      kind: 'harness',
      source: 'bench/src/parity/',
      // pending until baselines.json is committed and both phase-a run items' summaries name its sha256 (C-0068, C-0121)
      inputs: [BASELINES],
      reviewedBy: ['M0-b-05a', 'M0-c-07a'],
      item: 'M0-k-05',
      suites: [{ kind: 'seeds', path: PARITY_OURS }],
      units: () => [{ name: 'parity report over our side (M0-c-07a)', argv: harness('parity', '--ours', PARITY_OURS) }],
    },
    // last and alone: §13.8's four nightly timing-phase contents, all M1's; never bench:timing-phase (C-0088)
    {
      name: 'timing-phase (nightly contents)',
      kind: 'command',
      source: 'bench/src/tier-jobs/nightly-timing-phase.ts',
      inputs: [],
      item: 'M1',
      stagedTo: 'M1',
      units: () => {
        throw new Error('tier job timing-phase (nightly contents): not built: M1 (§13.8\'s four nightly timing-phase contents, C-0088)');
      },
    },
  ];
}

/** The milestone tier's jobs: the nightly set less its timing-phase entry, plus the F-CUT 10⁵-face bar (§16 M0 (b)). */
export function milestoneJobs(root: string = HERE_ROOT): Job[] {
  return [
    ...nightlyJobs(root).filter((j) => j.stagedTo !== 'M1'),
    {
      name: 'F-CUT (10⁵ faces)',
      kind: 'harness',
      source: 'bench/src/bentcut/',
      inputs: [],
      item: 'M0-b-04',
      suites: [BENTCUT_FACES],
      units: () => [{ name: 'F-CUT on 10⁵ random concave and holed faces', argv: harness('bentcut', '--only', 'fcut', '--fcut', String(FCUT_FACES)) }],
    },
  ];
}

/** The tier's manifest over the tree at `root`. */
export function manifest(tier: TierName, root: string): TierManifest {
  const jobs = tier === 'pr' ? prJobs(root) : tier === 'nightly' ? nightlyJobs(root) : milestoneJobs(root);
  return { tier, budget: { ...BUDGETS[tier] }, jobs };
}
