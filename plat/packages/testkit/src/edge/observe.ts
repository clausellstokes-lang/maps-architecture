// What every edge fixture checks of a run (M0-x-06; §4.13 EP-01's "never a crash, hang, invalid output or whole-map
// retry", §5.1 (1) and (8), §3.10, §5.3's kernel row): the arena valid by the kernel's own whole-arena sweep (M0-a-14's
// `checkCI`: every §3.10 hard row over the whole arena and the Euler counts), the stages before the home clean, each stage
// run once, and a refusal typed and named. Each returns one sentence per problem.
import { checkCI, type Plat } from '@plat/kernel';
import type { GenerationReport } from '@plat/layout';
import { CHAIN_ORDER, restartFree, type ChainRun, type ChainStage } from './chain.js';
import type { AttemptRefusal } from './standing.js';

/** The §3.1 codes a refusal may carry (num/result.ts's KernelError). */
export const KERNEL_CODES: ReadonlySet<string> = new Set([
  'E_OUT_OF_RANGE',
  'E_DEGENERATE',
  'E_LEVEL',
  'E_LOCKED',
  'E_KEPT',
  'E_SCOPE',
  'E_STRUCTURAL',
  'E_NOT_TWO_CROSSINGS',
  'E_HOLE_CONTACT',
  'E_SELF_INTERSECT',
  'E_BELOW_MIN_EDGE',
  'E_BELOW_MIN_ANGLE',
  'E_BELOW_MIN_AREA',
  'E_BELOW_MIN_WIDTH',
  'E_NON_CONVEX',
  'E_NO_PATH',
  'E_WORK_LIMIT',
  'E_INVARIANT',
]);

/** The arena's hard rows that fail the whole-arena sweep (an invalid output), one line each. */
export function arenaProblems(plat: Plat): string[] {
  const out: string[] = [];
  for (const r of checkCI(plat)) {
    if (r.class !== 'hard' || r.holds) continue;
    out.push(`the arena fails ${r.name}: ${r.problems.slice(0, 2).join('; ')}`);
  }
  return out;
}

/** The ground arena of a chain run. */
export function groundOf(run: ChainRun): Plat {
  const p = run.model.plats.get('ground/0');
  if (p === undefined) throw new Error('edge: the chain holds no ground arena');
  return p;
}

/** The bugs entries a report holds for one stage. */
export function bugsOf(report: GenerationReport, stage: string): GenerationReport['bugs'] {
  return report.bugs.filter((b) => b.stage === stage);
}

/** A stage's refusal detail as the census and the unmet lines quote it (the first 160 characters). */
export function refusalDetail(run: ChainRun, stage: string): string {
  return run.refusals.get(stage)?.detail.slice(0, 160) ?? '';
}

/**
 * A chain run's checks for a fixture whose home is `home`, split in three (C-0278 (2), C-NEWROW (2)): `problems` —
 * fail-safety violations that fail the run whatever state it stood on (a restart, an invalid arena, a refusal that is
 * not a §3.1 code); `unmet` — the prepared state did not stand (a stage before the home refused), which makes the state
 * the fixture's to replace (./standing.ts), never the home's outcome; and `lawful` — each such refusal, a stage refusing
 * the fixture's lawful prepared state (J264's census: counted and named, never hidden by the replacement).
 */
export function chainCheck(run: ChainRun, upTo: ChainStage, home: ChainStage): { problems: string[]; unmet: string[]; lawful: AttemptRefusal[] } {
  const problems: string[] = [];
  const unmet: string[] = [];
  const lawful: AttemptRefusal[] = [];
  const r = restartFree(run, upTo);
  if (r !== null) problems.push(`restart: ${r}`);
  const before = CHAIN_ORDER.slice(0, CHAIN_ORDER.indexOf(home));
  for (const b of run.report.bugs) {
    if (before.includes(b.stage as ChainStage)) {
      unmet.push(`the prepared state did not stand: ${b.stage} refused ${b.cls} (${refusalDetail(run, b.stage)})`);
      lawful.push({ stage: b.stage, code: b.cls, where: 'preparation', detail: refusalDetail(run, b.stage) });
    }
    if (!KERNEL_CODES.has(b.cls)) problems.push(`${b.stage}'s refusal carries no §3.1 code: ${b.cls}`);
  }
  problems.push(...arenaProblems(groundOf(run)));
  return { problems, unmet, lawful };
}

/** A chain run's unmet preparation and fail-safety problems in one list (chainCheck's two, unmet first). */
export function chainProblems(run: ChainRun, upTo: ChainStage, home: ChainStage): string[] {
  const c = chainCheck(run, upTo, home);
  return [...c.unmet, ...c.problems];
}
