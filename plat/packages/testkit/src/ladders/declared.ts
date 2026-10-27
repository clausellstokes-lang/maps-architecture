// The stages' own ladder declarations against the registry (M0-x-05, hardening round S1, notes row 1; §4.12's StageDecl
// `ladder`, §5.2, C-0085, C-0269): every (stage, failure class, rung) a stage registered by M0-x-04's `registerBase`
// declares is mapped to the `STAGE_LADDERS` row it reaches — by (ladder, stage, code): a rung M0 builds or a later rung
// with its milestone — or to a declared extra, a rung of the stage's own row that is no §5.2 rung, with its reason. A
// stage that comes to declare a rung the table does not hold, a mapped row the table lost, or a mapping no stage
// declares any more is a problem, so the table cannot drift from what the stages say they do. No vitest import: the
// bench loads it through `stageLadderCoverage()`.
import { stageText } from '@plat/kernel';
import { createRegistry, registerBase } from '@plat/layout';
import { STAGE_LADDERS } from './table.js';
import type { LadderRung } from './types.js';

/** One stage's declared ladder row, as the registered stage carries it (§4.12: `{ failureClass, rungs }`). */
export interface DeclaredRung {
  /** The base order's stage name (`S1`, `S3`, …). */
  readonly stage: string;
  readonly failureClass: string;
  readonly rung: string;
}

/** Where a declared rung lands: the table rows it is (by ladder, stage and code), or an extra with its reason. */
export type DeclaredTarget = { readonly rows: readonly (readonly [ladder: string, stage: string, code: string])[] } | { readonly extra: string };

const row = (ladder: string, stage: string, code: string): readonly [string, string, string] => [ladder, stage, code];

/**
 * Every rung a base stage declares, by `stage class rung` (read 2026-10-27 from `registerBase`'s stages: S1 declares none
 * — the RiverStrategy reports its F-RIVER and F-WORK uses as §5.4 `ladderUses` — and S5 declares the union of S5a – S5d).
 */
export const DECLARED_RUNGS: Readonly<Record<string, DeclaredTarget>> = Object.freeze({
  // S3: the slice's gate picks (M0-c-01) and its trace (M0-c-02); its F-ROUTE `unserved` is the router's rung, counted
  // where S4 and S5b leave it.
  'S3 F-WALL redraw': { rows: [row('F-WALL', 'S3', 'redraw')] },
  'S3 F-WALL drop': { rows: [row('F-WALL', 'S3', 'drop')] },
  'S3 F-WALL reroute': { extra: 'M0-c-01’s re-route of a gate route the plaza tree cannot reach (C-0201 (6); siting/slice.ts gateRungs): S3 (7)’s own step, no rung of §5.2’s F-WALL ladder' },
  'S3 F-WALL reoffset': { rows: [row('F-WALL', 'S3/S5a trace', 'reoffset')] },
  'S3 F-WALL union_simplify': { rows: [row('F-WALL', 'S3/S5a trace', 'union_simplify')] },
  'S3 F-ROUTE unserved': { rows: [row('F-ROUTE', 'S4/S5b', 'unserved')] },
  // S4: F-ROUTE's ladder (M0-c-03); the extra bridge is M1's.
  'S4 F-ROUTE another_site': { rows: [row('F-ROUTE', 'S4/S5b', 'another_site')] },
  'S4 F-ROUTE extra_bridge': { rows: [row('F-ROUTE', 'S4/S5b', 'extra_bridge')] },
  'S4 F-ROUTE slope': { rows: [row('F-ROUTE', 'S4/S5b', 'slope')] },
  'S4 F-ROUTE unserved': { rows: [row('F-ROUTE', 'S4/S5b', 'unserved')] },
  // S5: S5b's router (S4's ladder), S5a's trace, S5c's F-NUM and F-WORK, S5d's F-BUDGET-STAGE (M0-c-04, M0-c-05).
  'S5 F-ROUTE another_site': { rows: [row('F-ROUTE', 'S4/S5b', 'another_site')] },
  'S5 F-ROUTE extra_bridge': { rows: [row('F-ROUTE', 'S4/S5b', 'extra_bridge')] },
  'S5 F-ROUTE slope': { rows: [row('F-ROUTE', 'S4/S5b', 'slope')] },
  'S5 F-ROUTE unserved': { rows: [row('F-ROUTE', 'S4/S5b', 'unserved')] },
  'S5 F-WALL reoffset': { rows: [row('F-WALL', 'S3/S5a trace', 'reoffset')] },
  'S5 F-WALL union_simplify': { rows: [row('F-WALL', 'S3/S5a trace', 'union_simplify')] },
  'S5 F-NUM re_propose': { rows: [row('F-NUM', 'S5c', 're_propose')] },
  'S5 F-NUM reject': { rows: [row('F-NUM', 'S5c', 'reject')] },
  'S5 F-WORK work_cut': { rows: [row('F-WORK', 'S5c', 'work_cut'), row('F-WORK', 'S4/S5b', 'work_cut')] },
  'S5 F-BUDGET-STAGE top_up': { rows: [row('F-BUDGET-STAGE', 'S5d', 'top_up')] },
  'S5 F-BUDGET-STAGE accept_shortfall': { rows: [row('F-BUDGET-STAGE', 'S5d', 'accept_shortfall')] },
  // S6: the grower's leftover rule (F-WORK's coarser rung, C-0085) and §4.1's S6-row merge of a degenerate face.
  'S6 F-WORK leftoverRule': { rows: [row('F-WORK', 'S6', 'work_cut')] },
  'S6 F-NUM degenerateFaceMerge': { extra: '§4.1’s S6 row (“a degenerate district face merges into its neighbour”; districts/grow.ts, M0-e-04): the stage row’s own clean-up, no rung of §5.2’s F-NUM ladder (re-propose → reject)' },
  // S8: F-CUT's ladder (§4.6 step 8; M0-b-03) and F-WORK's recursion stop.
  'S8 F-CUT reflexPreCut': { rows: [row('F-CUT', 'S8', 'pre')] },
  'S8 F-CUT antennaSplit': { rows: [row('F-CUT', 'S8', 'antenna')] },
  'S8 F-CUT turnedFrame': { rows: [row('F-CUT', 'S8', 'a@attempt>=1')] },
  'S8 F-CUT meanNormal': { rows: [row('F-CUT', 'S8', 'b')] },
  'S8 F-CUT perpendicularSlide': { rows: [row('F-CUT', 'S8', 'W_CUT_SLID')] },
  'S8 F-CUT substitution': { rows: [row('F-CUT', 'S8', 'd')] },
  'S8 F-WORK recursionStops': { rows: [row('F-WORK', 'S8', 'work_cut')] },
});

/** Every ladder row the base product's stages declare (a fresh registry, `registerBase` with no option), in order. */
export function registeredRungs(): DeclaredRung[] {
  const registry = createRegistry();
  registerBase(registry, {});
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('ladders: registerBase registered no base product');
  const out: DeclaredRung[] = [];
  for (const s of product.stages) for (const l of s.ladder) for (const rung of l.rungs) out.push({ stage: stageText(s.id), failureClass: l.failureClass, rung });
  return out;
}

/**
 * The declarations' problems against the table: a declared rung with no mapping, a mapping whose class is not the
 * declared one, a mapped row the table does not hold, an extra with no reason, a mapping no stage declares. Empty when
 * the table and the declarations agree.
 */
export function declaredRungProblems(declared: readonly DeclaredRung[] = registeredRungs(), rows: readonly LadderRung[] = STAGE_LADDERS, map: Readonly<Record<string, DeclaredTarget>> = DECLARED_RUNGS): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  for (const d of declared) {
    const key = `${d.stage} ${d.failureClass} ${d.rung}`;
    seen.add(key);
    const target = Object.hasOwn(map, key) ? map[key] : undefined;
    if (target === undefined) {
      problems.push(`${d.stage} declares ${d.failureClass} '${d.rung}', which is no table row and no declared extra`);
      continue;
    }
    if ('extra' in target) {
      if (target.extra.trim().length === 0) problems.push(`${d.stage}'s ${d.failureClass} '${d.rung}' is a declared extra with no reason`);
      continue;
    }
    if (target.rows.length === 0) problems.push(`${d.stage}'s ${d.failureClass} '${d.rung}' maps to no row`);
    for (const [ladder, stage, code] of target.rows) {
      if (ladder !== d.failureClass) problems.push(`${d.stage}'s ${d.failureClass} '${d.rung}' maps to a ${ladder} row`);
      else if (!rows.some((r) => r.ladder === ladder && r.stage === stage && r.code === code)) problems.push(`${d.stage}'s ${d.failureClass} '${d.rung}' maps to '${stage} ${ladder} ${code}', which the table does not hold`);
    }
  }
  for (const key of Object.keys(map)) if (!seen.has(key)) problems.push(`the mapping '${key}' is declared by no registered stage`);
  return problems;
}
