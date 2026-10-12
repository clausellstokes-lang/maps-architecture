// §13.1's per-class degenerate inputs (M0-x-06; §13.1 *Ladder coverage*: "the fixtures hold, per failure class, one
// degenerate input of each kind — zero-length, zero-area, self-touching, collinear and coincident (§5.1 (9))"; §5.1 (9);
// §5.2; C-0100, C-0183 (6); C-0273 (11)). Forty fixtures `class/<class>/<kind>`:
//   F-NUM, F-SKELETON  the kernel side by reference to M0-k-02's constructive cases tagged `ladder` (C-0183 (6)), each
//                      drawn at the fixture's seed and judged on the kernel by M0-k-04's judge; F-NUM's stage side too —
//                      an optional chain's step at S5c (EP-01/S5c/<kind>'s run): refused with its typed code and taken on
//                      F-NUM's ladder (re-propose, reject), never a throw;
//   F-CUT              S8 (EP-01/S8/<kind>'s run); F-RIVER S1's water batch (EP-01/S1); F-ROUTE S4 (EP-01/S4); F-WALL S5a's
//                      trace (EP-01/S5a); F-BUDGET-STAGE S5d's top-up rim (EP-01/S5d);
//   F-WORK             "the coarser rung's output made degenerate": S8 on its two-district arena carrying the kind, its
//                      cut.kernelCalls law lowered so the recursion stops on F-WORK's coarser rung (every face still open
//                      stands as a block, `work_cut` with the count) — the faces it keeps carry the kind.
// The stage-backed classes F-CUT, F-RIVER, F-ROUTE, F-WALL and F-BUDGET-STAGE are their stage's EP-01 cells by reference
// (the coverage table names `EP-01/<stage>/<kind>` for them, as F-NUM's and F-SKELETON's kernel side names M0-k-02's
// cases), so no seed runs twice; F-NUM's stage side is EP-01/S5c's cells.
import { loadWorkLimits, type WorkLimitsTable } from '@plat/tables';
import { CONSTRUCTIVE_SET } from '../constructive/set.js';
import type { ConstructiveCase } from '../constructive/types.js';
import { judgeOnKernel } from '../invariants/constructive.js';
import { ep01Known, ep01Pinned, ep01Residue, runEp01, type Ep01Stage } from './ep01.js';
import { DEGENERATE_KINDS, type DegenerateKind } from './kinds.js';
import { outcome, type EdgeFixture, type EdgeOutcome } from './types.js';

/** The eight failure classes §13.1's per-class inputs name at M0 (C-0100). */
export type EdgeClass = 'F-NUM' | 'F-CUT' | 'F-RIVER' | 'F-ROUTE' | 'F-WALL' | 'F-BUDGET-STAGE' | 'F-SKELETON' | 'F-WORK';
export const EDGE_CLASSES: readonly EdgeClass[] = Object.freeze(['F-NUM', 'F-CUT', 'F-RIVER', 'F-ROUTE', 'F-WALL', 'F-BUDGET-STAGE', 'F-SKELETON', 'F-WORK']);

/** The stage whose EP-01 cell carries a class's input (§4.1's transactions table; the class's own stage). */
export const CLASS_STAGE: Readonly<Record<Exclude<EdgeClass, 'F-SKELETON'>, Ep01Stage>> = Object.freeze({
  'F-NUM': 'S5c',
  'F-CUT': 'S8',
  'F-RIVER': 'S1',
  'F-ROUTE': 'S4',
  'F-WALL': 'S5a',
  'F-BUDGET-STAGE': 'S5d',
  'F-WORK': 'S8',
});

/** The classes whose (class, kind) pair is its stage's EP-01 cell by reference (no fixture of its own). */
export const BY_REFERENCE: readonly EdgeClass[] = Object.freeze(['F-CUT', 'F-RIVER', 'F-ROUTE', 'F-WALL', 'F-BUDGET-STAGE']);

/** The fixture ids that run a (class, kind) pair: its own fixture, and its stage's EP-01 cell where that carries it. */
export function classFixtureIds(cls: EdgeClass, kind: DegenerateKind): string[] {
  if (BY_REFERENCE.includes(cls)) return [`EP-01/${CLASS_STAGE[cls as Exclude<EdgeClass, 'F-SKELETON'>]}/${kind}`];
  if (cls === 'F-NUM') return [`class/F-NUM/${kind}`, `EP-01/S5c/${kind}`];
  return [`class/${cls}/${kind}`];
}

/** M0-k-02's kernel-side case for (class, kind) — the one tagged `ladder` with that pair (C-0183 (6)). */
export function kernelCase(cls: 'F-NUM' | 'F-SKELETON', kind: DegenerateKind): ConstructiveCase {
  const c = CONSTRUCTIVE_SET.find((x) => x.ladder !== undefined && x.ladder.failureClass === cls && x.ladder.kind === kind && x.milestone === 'M0');
  if (c === undefined) throw new Error(`classes: M0-k-02 tags no M0 case (${cls}, ${kind})`);
  return c;
}

/** The kernel case drawn at the seed and judged on the kernel (M0-k-04's judge): its verdict's problem, or null. */
function kernelSide(cls: 'F-NUM' | 'F-SKELETON', kind: DegenerateKind, seed: number): { problem: string | null; id: string; expect: string } {
  const c = kernelCase(cls, kind);
  const g = c.generate(seed);
  if (g.kind !== 'input') return { problem: `${c.id} is deferred to ${g.milestone}`, id: c.id, expect: c.expect.outcome };
  const w = c.witness?.(g) ?? null;
  if (w !== null) return { problem: `${c.id}'s draw is not its degeneracy: ${w}`, id: c.id, expect: c.expect.outcome };
  const v = judgeOnKernel(c, g);
  return { problem: v.ok ? null : `${c.id} on the kernel: ${v.reason}`, id: c.id, expect: c.expect.outcome };
}

/** F-WORK's lowered table: cut.kernelCalls' law 0 (no floor, no per-unit term): S8's recursion stops at its first call. */
export function lowWork(): WorkLimitsTable {
  const t = loadWorkLimits();
  const low = (counter: string) => (counter === 'cut.kernelCalls' ? Object.freeze({ ...t.law(counter), perUnit: 0, floor: 0 }) : t.law(counter));
  return Object.freeze({ ...t, laws: t.laws.map((l) => (l.counter === 'cut.kernelCalls' ? low(l.counter) : l)), law: low }) as WorkLimitsTable;
}

/** One class cell's run at the seed. */
function runClassCell(cls: EdgeClass, kind: DegenerateKind, seed: number): EdgeOutcome {
  if (cls === 'F-SKELETON') {
    const k = kernelSide('F-SKELETON', kind, seed);
    // the skeleton's readers: a validated skeleton (absorbed), or the reader's typed downgrade (laddered: tier 4)
    return outcome(k.expect === 'ok' ? 'absorbed' : 'laddered', `F-SKELETON: ${k.id} (${k.expect})`, k.problem === null ? [] : [k.problem], { kernelCase: k.id });
  }
  if (cls === 'F-WORK') return runEp01('S8', kind, seed, { s8WorkLimits: lowWork(), s8Scale: 3 });
  // F-NUM's kernel side here; its stage side is EP-01/S5c's cells (by reference)
  const k = kernelSide('F-NUM', kind, seed);
  return outcome(k.expect === 'ok' ? 'absorbed' : 'laddered', `F-NUM: ${k.id} (${k.expect})`, k.problem === null ? [] : [k.problem], { kernelCase: k.id });
}

/** The class × kind fixtures (40). */
export function classFixtures(): EdgeFixture[] {
  const out: EdgeFixture[] = [];
  for (const cls of EDGE_CLASSES) {
    if (BY_REFERENCE.includes(cls)) continue;
    for (const kind of DEGENERATE_KINDS) {
      const stage = cls === 'F-SKELETON' || cls === 'F-NUM' ? null : CLASS_STAGE[cls];
      const pinned = stage === null ? undefined : ep01Pinned(stage, kind);
      const residue = stage === null ? undefined : ep01Residue(stage, kind);
      const known = stage === null ? null : ep01Known(stage, kind);
      out.push({
        id: `class/${cls}/${kind}`,
        home: `§13.1 *Ladder coverage*; §5.1 (9); §5.2 ${cls}${stage === null ? '' : ` (at ${stage}'s coarser rung, §4.1's transactions table)`}${cls === 'F-NUM' || cls === 'F-SKELETON' ? "; M0-k-02's case by id (C-0183 (6))" : ''}`,
        run: (seed) => runClassCell(cls, kind, seed),
        expect: {
          outcome: `${cls}, ${kind}: refused by the kernel (or taken by §3.11's rule) and taken on ${cls}'s ladder, the rung named in the report; never a crash, hang, invalid output or whole-map retry`,
          allowed: residue !== undefined ? ['refused-residue', 'refused-safe'] : pinned === undefined ? ['absorbed', 'laddered', 'left-out'] : ['absorbed', 'laddered', 'left-out', 'refused-safe'],
          ...((pinned ?? residue) === undefined || known === null ? {} : { refusal: { codes: (pinned ?? residue) as readonly string[], known } }),
          ...(residue === undefined || known === null ? {} : { residue: { codes: residue, known } }),
          ...(cls === 'F-WORK' ? { judge: (o: EdgeOutcome) => (typeof o.facts.workCut === 'string' && o.facts.workCut.startsWith('work_cut') ? null : 'F-WORK: the coarser rung (work_cut) was not taken') } : {}),
        },
      });
    }
  }
  return out;
}
