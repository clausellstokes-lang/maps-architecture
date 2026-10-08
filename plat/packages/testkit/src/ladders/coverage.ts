// stageLadderCoverage() (M0-x-05; §13.1 *Ladder coverage*: "every rung of every ladder in §5.2 is reachable by a
// fixture, and each downgrade … is exercised"; §16 M0 (a); C-0085, C-0109, C-0269): M0-k-04's `ladderCoverage()` (the
// kernel ladders, merged unchanged — its file never edited, C-0109) and the stage rows of `STAGE_LADDERS`, each built
// row's fixture run and its leaf counted, with the plain controls' counts beside it; every §5.2 ladder named once. A
// built row is covered when its fixture left its code (count ≥ 1) and no plain control did (count 0): the code appears
// exactly where its fixture forces it. The plain flat fixture's baseline (`runBase(FLAT_BLUEPRINT, seed)`, every built
// leaf counted) is added on request — the CITY's 1 400 faces reach F-CUT's rungs, so it is a reported baseline, never
// part of the verdict (C-0269).
import { FLAT_BLUEPRINT, runBase } from '@plat/layout';
import { ladderCoverage } from '../invariants/ladders.js';
import type { CoverageReport } from '../invariants/types.js';
import { LADDER_CONTROLS, LADDER_FIXTURES, type LadderFixture } from './fixtures.js';
import { readModel, sumLeaves } from './readers.js';
import { checkLadderTable, KERNEL_LADDERS, leafOf, SECTION_5_2, STAGE_LADDERS } from './table.js';
import type { LadderRung, Leaves, PlainBaseline, StageCoverageReport, StageCoverageRow } from './types.js';

/** stageLadderCoverage's options. */
export interface StageCoverageOptions {
  /** The kernel report's draws (ladderCoverage's option; default its own 8). */
  readonly kernelDraws?: number;
  /** The kernel report to merge (default `ladderCoverage({ draws: kernelDraws })`): a caller holding one passes it. */
  readonly kernel?: CoverageReport;
  /** Run the plain flat fixture at this seed and report its baseline (a CITY: about three minutes). */
  readonly plain?: number;
  /** The registry (default `STAGE_LADDERS`), the fixtures and the controls (default the module's): a test's planted table. */
  readonly rows?: readonly LadderRung[];
  readonly fixtures?: readonly LadderFixture[];
  readonly controls?: readonly LadderFixture[];
  /** Only these built rows' fixtures are run (by leaf key); the rest are reported unrun (exercised null, not covered). */
  readonly only?: readonly string[];
}

/** Runs each fixture once (a fixture several rows name runs once), its leaves by fixture id. */
function runFixtures(fixtures: readonly LadderFixture[], ids: ReadonlySet<string>): Map<string, Leaves> {
  const out = new Map<string, Leaves>();
  for (const f of fixtures) if (ids.has(f.id) && !out.has(f.id)) out.set(f.id, f.run());
  return out;
}

/** The plain flat fixture's baseline (C-0269): `runBase(FLAT_BLUEPRINT, seed)`, every built row's leaf counted. */
export function plainBaseline(seed: number, rows: readonly LadderRung[] = STAGE_LADDERS): PlainBaseline {
  const { model, report } = runBase(FLAT_BLUEPRINT, seed, { kind: 'all' });
  const read = readModel(model);
  const keys = [...new Set(rows.filter((r) => r.milestone === undefined).map(leafOf))].sort();
  const ordered: Record<string, number> = {};
  for (const k of keys) ordered[k] = read[k] ?? 0;
  return { seed, leaves: ordered, reached: Object.keys(ordered).filter((k) => ordered[k] > 0), bugs: report.bugs.length };
}

/**
 * The combined report over §5.2 (C-0109; see the header): the kernel report unchanged, every stage row with its
 * fixture's and the controls' counts, the table check, and the verdicts.
 */
export function stageLadderCoverage(opts: StageCoverageOptions = {}): StageCoverageReport {
  const rows = opts.rows ?? STAGE_LADDERS;
  const fixtures = opts.fixtures ?? LADDER_FIXTURES;
  const controls = opts.controls ?? LADDER_CONTROLS;
  const kernel = opts.kernel ?? ladderCoverage(opts.kernelDraws === undefined ? {} : { draws: opts.kernelDraws });
  const tableProblems = checkLadderTable(rows, SECTION_5_2, KERNEL_LADDERS, new Set(fixtures.map((f) => f.id)));
  const only = opts.only === undefined ? null : new Set(opts.only);
  const wanted = new Set<string>();
  for (const r of rows) if (r.milestone === undefined && (only === null || only.has(leafOf(r)))) wanted.add(r.fixture);
  const ran = runFixtures(fixtures, wanted);
  const control = sumLeaves(...controls.map((c) => c.run()));
  const stage: StageCoverageRow[] = rows.map((r) => {
    const leaf = leafOf(r);
    if (r.milestone !== undefined) return Object.freeze({ ...r, status: { deferredTo: r.milestone }, leaf, exercised: null });
    const got = ran.get(r.fixture);
    return Object.freeze({ ...r, status: 'built' as const, leaf, exercised: got === undefined ? null : { fixture: got[leaf] ?? 0, control: control[leaf] ?? 0 } });
  });
  const stageCovered = tableProblems.length === 0 && stage.every((r) => r.status !== 'built' || (r.exercised !== null && r.exercised.fixture > 0 && r.exercised.control === 0));
  const ladders: string[] = [];
  for (const c of SECTION_5_2) if (kernel.ladders.includes(c as 'F-NUM' | 'F-SKELETON') || rows.some((r) => r.ladder === c)) ladders.push(c);
  return Object.freeze({
    ladders,
    kernel,
    rows: [...kernel.rows, ...stage],
    stage,
    tableProblems,
    plain: opts.plain === undefined ? null : plainBaseline(opts.plain, rows),
    stageCovered,
    covered: stageCovered && kernel.covered,
  });
}

/** The numbers-only summary of a combined report (C-0067: docs/build/summaries/M0-x-05.json). */
export function coverageSummary(r: StageCoverageReport): Record<string, unknown> {
  const built = r.stage.filter((x) => x.status === 'built');
  const rungs: Record<string, { fixture: number; control: number; plain?: number }> = {};
  for (const x of built) {
    if (x.exercised === null) continue;
    const p = r.plain?.leaves[x.leaf];
    rungs[x.leaf] = { fixture: x.exercised.fixture, control: x.exercised.control, ...(p === undefined ? {} : { plain: p }) };
  }
  const deferred: Record<string, number> = {};
  for (const x of r.stage) if (typeof x.status === 'object') deferred[x.status.deferredTo] = (deferred[x.status.deferredTo] ?? 0) + 1;
  const deferredSorted: Record<string, number> = {};
  for (const k of Object.keys(deferred).sort()) deferredSorted[k] = deferred[k];
  return {
    item: 'M0-x-05',
    ladders: r.ladders.length,
    kernelRows: r.kernel.rows.length,
    kernelCovered: r.kernel.covered,
    stageRows: r.stage.length,
    builtRows: built.length,
    builtReached: built.filter((x) => x.exercised !== null && x.exercised.fixture > 0).length,
    builtClean: built.filter((x) => x.exercised !== null && x.exercised.control === 0).length,
    deferredRows: deferredSorted,
    tableProblems: r.tableProblems.length,
    stageCovered: r.stageCovered,
    covered: r.covered,
    rungs,
    plain: r.plain === null ? null : { seed: r.plain.seed, reached: r.plain.reached.length, bugs: r.plain.bugs },
  };
}
