// The stage-rung registry (M0-x-05; §13.1 *Ladder coverage*: "every rung of every ladder in §5.2 is reachable by a
// fixture"; §5.2's two tables; §5.4's report codes; §16 M0 (a); C-0085, C-0109, C-0269).
//
// `SECTION_5_2` names every failure class of §5.2 — its main table and its staged layers' table — in the design's order.
// `STAGE_LADDERS` holds one row per rung of every stage ladder: the rungs M0 builds (F-CUT, F-ROUTE, F-NUM's re-propose
// and reject, F-RIVER, F-WALL, F-BUDGET-STAGE and F-WORK's declared coarser rungs, C-0085's list), each with the stage
// whose record it lands in, the report code or warning it leaves there and its fixture (`LADDER_FIXTURES`); the later
// rungs of those ladders and every ladder of a stage M0 does not build, each with its milestone (or its volume). The
// kernel ladders (F-SKELETON's downgrades; F-NUM's kernel side) are M0-k-04's `ladderCoverage()` rows, merged unchanged
// by `stageLadderCoverage()` (C-0109) — so F-SKELETON has no row here and F-NUM only its stage rungs.
import type { LadderRung } from './types.js';

/** Every failure class of §5.2: the main table, then the staged layers' table, in the design's order. */
export const SECTION_5_2: readonly string[] = Object.freeze([
  'F-NUM',
  'F-CUT',
  'F-CORRIDOR',
  'F-OUTLINE',
  'F-RIVER',
  'F-CONTOUR',
  'F-SITE',
  'F-ROUTE',
  'F-BUDGET-STAGE',
  'F-WALL',
  'F-CASTLE',
  'F-PLOT',
  'F-SITING',
  'F-SITEPLAN',
  'F-MASSING',
  'F-COMPOSE',
  'F-PLAN',
  'F-UNDER',
  'F-NET',
  'F-VOID',
  'F-SKELETON',
  'F-LABEL',
  'F-LIGHT',
  'F-WORK',
  'F-BUDGET-TIME',
  'F-EDIT',
  'F-REDERIVE',
  'F-TEMPLATE',
  'F-DISPATCH',
  'F-UNIT',
  'F-SKY-FILL',
  'F-SKY-PLACE',
  'F-SKY-TERRAIN',
  'F-SKY-ACCESS',
  'F-SKY-UNIT',
  'F-SKY-CLEAR',
  'F-SKY-CRYPT',
  'F-SKY-SHADE',
  'F-SKY-LANDFALL',
  'F-SKY-HANDOVER',
]);

/** The ladders whose rungs are the kernel's (M0-k-04's `ladderCoverage()` rows; C-0085, C-0109). */
export const KERNEL_LADDERS: readonly string[] = Object.freeze(['F-NUM', 'F-SKELETON']);

const built = (ladder: string, stage: string, rung: string, code: string, fixture: string): LadderRung => Object.freeze({ ladder, rung, stage, code, fixture });
const later = (ladder: string, stage: string, rung: string, code: string, where: string, milestone: string): LadderRung => Object.freeze({ ladder, rung, stage, code, fixture: where, milestone });

/** The stage-rung registry over §5.2 (see the header). */
export const STAGE_LADDERS: readonly LadderRung[] = Object.freeze([
  // ---- F-CUT (§4.6 step 8; M0-b-03's S8) ----
  built('F-CUT', 'S8', 'the reflex pre-cut: a face with a reflex vertex deeper than the band’s plot depth is split there first', 'pre', 'cut/reflex'),
  built('F-CUT', 'S8', 'the antenna split: a face split at an antenna’s root', 'antenna', 'cut/antenna'),
  built('F-CUT', 'S8', '(a) re-plan in the turned working frames on the stream key’s attempt component (attempt ≥ 1)', 'a@attempt>=1', 'cut/turned-frame'),
  built('F-CUT', 'S8', '(b) the straight cut on the mean normal', 'b', 'cut/mean-normal'),
  built('F-CUT', 'S8', '(c) the perpendicular cut through the longest run’s midpoint, its foot sliding until the contact rule passes', 'W_CUT_SLID', 'cut/slide'),
  built('F-CUT', 'S8', '(d) substitution: a face within step 8 (d)’s area bound becomes a court block', 'd', 'cut/court'),
  later('F-CUT', 'S8', '(d) the green, landmark and joined-plot substitutions (the allocation’s largest unplaced class, §4.7)', 'd', 'S10 / S10b’s allocation (§4.7); the court only at M0 (C-0036)', 'M1'),
  later('F-CUT', 'S10', 'the plot re-cuts of S10 on the bent cut’s ladder', 'pre … d', 'S10 (§4.7)', 'M1'),
  // ---- F-ROUTE (§4.3; M0-c-03's S4 and the router S5b reuses at stages k ≥ 2, M0-c-04: one ladder, one leaf) ----
  built('F-ROUTE', 'S4/S5b', 'another crossing site on the reach within its search band', 'another_site', 'route/another-site'),
  later('F-ROUTE', 'S4/S5b', 'one bridge at extra cost (a new deck)', 'extra_bridge', 'S4’s extra-bridge rung (C-0076: listed held false, notBuilt(M1))', 'M1'),
  built('F-ROUTE', 'S4/S5b', 'relax the slope limit one class', 'slope', 'route/slope'),
  built('F-ROUTE', 'S4/S5b', 'route to the nearest reachable junction, the destination unserved', 'unserved', 'route/unserved'),
  // ---- F-NUM, the stage side (§3.6 optional chains; M0-c-05's S5c) ----
  built('F-NUM', 'S5c', 're-propose from the next attempt stream', 're_propose', 'growth/re-propose'),
  built('F-NUM', 'S5c', 'reject the chain with a report line', 'reject', 'growth/reject'),
  // ---- F-RIVER (§4.2 S1 (3); M0-e-02's RiverStrategy) ----
  built('F-RIVER', 'S1', 'carve the sink deeper up to carveMaxCm', 'carve', 'river/sink'),
  built('F-RIVER', 'S1', 're-trace from the last good knot', 'retrace', 'river/ridge'),
  built('F-RIVER', 'S1', 'move the inlet along the frame edge (attempt)', 'inlet', 'river/eastward'),
  later('F-RIVER', 'S3', 'move the centre to the bank', 'centre', 'S3 (6)’s siting (§4.2 S3)', 'M1'),
  later('F-RIVER', 'S3', 'no crossing in the core band: arterials routed to the bank road', 'no_crossing', 'S3 / S4 with the bank road (§4.2 S1 (5))', 'M1'),
  later('F-RIVER', 'S1', 'a requested river island whose branch separation fails', 'not_built', 'river islands (§4.2 S1 (3); §4b)', 'M1'),
  // ---- F-WALL (§4.2 S3 (7), §4.4 S5a *Trace*; M0-c-01's gate picks, M0-c-02's trace) ----
  built('F-WALL', 'S3', 'gates: two gate routes cross the stage-1 boundary at one point → re-draw the later gate pick (≤ 3)', 'redraw', 'wall/redraw'),
  built('F-WALL', 'S3', 'gates: … → drop it and report', 'drop', 'wall/drop'),
  built('F-WALL', 'S3/S5a trace', 'trace: re-offset with a larger radius', 'reoffset', 'wall/reoffset'),
  built('F-WALL', 'S3/S5a trace', 'trace: topology-preserving union-simplify', 'union_simplify', 'wall/union-simplify'),
  later('F-WALL', 'S3/S5a trace', 'trace: anchor open ends on the nearest barrier edge or enceinte (an open stretch), adding water gates where the waterfront policy requires', 'anchor', 'open chains and the waterfront policy (§4.4; §4b)', 'M1'),
  later('F-WALL', 'S3/S5a trace', 'trace: divert excess arterials to the nearest gate as lanes', 'divert', 'S7 / S5a with the arterial roster (§4.4)', 'M1'),
  later('F-WALL', 'S3/S5a trace', 'trace: add posterns and report when N cannot be met', 'postern', 'S7’s gatehouses and posterns (§4.8)', 'M1'),
  later('F-WALL', 'S3/S5a trace', 'trace: cut a way reaching the wall at the setback band and prune the outer stub', 'setback_cut', 'S7’s wall strips and band (§4.8)', 'M1'),
  later('F-WALL', 'S3/S5a trace', 'a raised-way meeting: the boundary re-pulled once, then the stage left unwalled (W_RAISED_MEETING)', 'W_RAISED_MEETING', 'raised ways (§2.7’s laws)', 'M3a'),
  // ---- F-BUDGET-STAGE (§4.4 S5d; M0-c-05's S5d) ----
  built('F-BUDGET-STAGE', 'S5d', 'one bounded top-up before the next stage', 'top_up', 'budget/top-up'),
  built('F-BUDGET-STAGE', 'S5d', 'accept and report the shortfall', 'accept_shortfall', 'budget/accept'),
  later('F-BUDGET-STAGE', 'S10', 'the exact plot check after S10 feeds F-SITING', 'unplaced', 'S10 (§4.7)', 'M1'),
  // ---- F-WORK: each stage's declared coarser rung (C-0085), entered by the count, reported work_cut ----
  built('F-WORK', 'S1', 'hydro.cells: hydrology coarsens (R12-5’s step) and the flood re-runs on the coarser grid', 'work_cut', 'work/hydro'),
  built('F-WORK', 'S6 fields', 'field.cells: the fields one step coarser', 'work_cut', 'work/fields'),
  built('F-WORK', 'S3', 'route.nodes on S3’s gate routes: F-ROUTE’s unserved rung for the route', 'work_cut', 'work/route-s3'),
  built('F-WORK', 'S4/S5b', 'route.nodes on S4’s routes (and S5b’s, the router they share): F-ROUTE’s unserved rung for the route', 'work_cut', 'work/route-s4'),
  built('F-WORK', 'S5c', 'growth.proposals / growth.candidates: the proposal queue closes, the stage ends with what it accepted', 'work_cut', 'work/growth'),
  built('F-WORK', 'S6', 'grower.turns: the leftover rule assigns every face still unowned', 'work_cut', 'work/grower'),
  built('F-WORK', 'S8', 'cut.recursionDepth / cut.kernelCalls / cut.candidates: the recursion stops, the face stands as a block', 'work_cut', 'work/cut'),
  built('F-WORK', 'kernel', 'a kernel counter (insert.*, tx.facesWalked, …) reached: the typed E_WORK_LIMIT to the caller, whose stage rung applies', 'E_WORK_LIMIT', 'work/kernel'),
  later('F-WORK', 'S9 …', 'the declared coarser rungs of the stages M0 does not build', 'work_cut', 'each stage’s milestone (§4.1)', 'M1'),
  // ---- the ladders of stages M0 does not build (§4b), each with its milestone ----
  later('F-CORRIDOR', 'S9', 'absorbSliver → downgrade the lane to alley width → retype it invisible', 'residue', 'S9 (§4.7; corridorUnion built and timed at M0)', 'M1'),
  later('F-OUTLINE', 'S1', 'clamp the displacement → repair by non-zero union → type each loop', 'islet / pond / absorbed', 'S1 (2) coasts, lakes and islands (§4b, C-0048)', 'M1'),
  later('F-CONTOUR', 'S1', 'clip every contour to the land faces', 'clipped', 'S1’s coast and the contours (§8.2)', 'M1'),
  later('F-SITE', 'S3', 'relax the slope threshold → the land component’s centroid band → report; the nuclei rungs', 'reported', 'S3 (6) (§4.2 S3; §4b)', 'M1'),
  later('F-CASTLE', 'S3, S7', 'thinness bloat → equalise → re-site → keep without a bailey', 'reported', 'S3 (8), S7 (§4.8)', 'M1'),
  later('F-PLOT', 'S10', 'per-frontage regions → merge → an alley or passage → typed residue', 'residue', 'S10 (§4.7)', 'M1'),
  later('F-SITING', 'S10a, S10b, S11', 'reconcile → soft rows to 0 → reduce the manifest', 'unplaced', 'S10b (§4.7)', 'M1'),
  later('F-SITEPLAN', 'S11', 'stepped wings → lower coverage → next arrangement → vacant yard', 'reported', 'S11 (§4.7)', 'M1'),
  later('F-MASSING', 'S11 outline()', 'V02’s M14', 'reported', 'V02 §3.5 (stage 3)', 'V02'),
  later('F-COMPOSE', 'compose()', 'V02 §3.13’s rungs', 'reported', 'V02 §3.13 (stage 3)', 'V02'),
  later('F-PLAN', 'the plan rung', 'V03 §3.9’s fit ladder', 'reported', 'V03 §3.9 (stage 3)', 'V03'),
  later('F-UNDER', 'the underground stage', 'band depth → lower depth → class minimum → vacant', 'reported', 'II.7.3; V04 §3.4', 'V04'),
  later('F-NET', 'the network stage', 'outfalls, re-route, local root, gutters', 'reported', 'II.7.2', 'V04'),
  later('F-VOID', 'the underground systems', 'a smaller extent → omitted; the undercity’s rungs', 'reported', 'II.7.5, II.7.6; V04 §3.5–§3.6', 'V04'),
  later('F-LABEL', 'S13b', '§9.4’s rungs', 'counted', 'the view (§9.4; B-ZOOM)', 'M1'),
  later('F-LIGHT', 'the view', '§8.4’s fallback ladder', 'counted', 'the light pass (§8.4; item 68)', 'M4'),
  later('F-BUDGET-TIME', '@plat/api worker host', 'postpone or resume a lazy tier', 'time_over', 'the worker host (§6.5)', 'M1'),
  later('F-EDIT', 'S0, edits', '§7.1’s outcome table', 'outcome', 'the edit log and dry run (§7.1)', 'M2a'),
  later('F-REDERIVE', '§7.3’s operators', 're-cut → re-fit → demolish; the way, deck and site rules', 'fate report', 'S1’s water and terrain operators (§7.3)', 'M3a'),
  later('F-TEMPLATE', 'S8 seeds', 'V01 §3.13’s', 'reported', 'V01 §3.13', 'V01'),
  later('F-DISPATCH', 'S9b, S10a', 'V01 §3.13’s', 'reported', 'V01 §3.13', 'V01'),
  later('F-UNIT', 'the unit run', 'V01 §3.13’s', 'reported', 'V01 §3.13', 'V01'),
  later('F-SKY-FILL', 'S7b (5), SKY', 'V05 §3.17’s', 'reported', 'V05 §3.17', 'V05'),
  later('F-SKY-PLACE', 'SKY', 'V05 §3.17’s', 'reported', 'V05 §3.17', 'V05'),
  later('F-SKY-TERRAIN', 'SKY-F', 'V05 §3.17’s', 'reported', 'V05 §3.17', 'V05'),
  later('F-SKY-ACCESS', 'SKY', 'V05 §3.17’s', 'reported', 'V05 §3.17', 'V05'),
  later('F-SKY-UNIT', 'the unit run', 'V05 §3.17’s', 'reported', 'V05 §3.17', 'V05'),
  later('F-SKY-CLEAR', 'sky.clearance', 'V05 §3.17’s', 'reported', 'V05 §3.17', 'V05'),
  later('F-SKY-CRYPT', 'SKY', 'V05 §3.17’s', 'reported', 'V05 §3.17', 'V05'),
  later('F-SKY-SHADE', 'field pass 2', 'V05 §3.17’s', 'reported', 'V05 §3.17', 'V05'),
  later('F-SKY-LANDFALL', 'fallIsland', 'V05 §3.17’s', 'reported', 'V05 §3.17', 'V05'),
  later('F-SKY-HANDOVER', 'SKY', 'V05 §3.17’s', 'reported', 'V05 §3.17', 'V05'),
]);

/** A row's leaf key: what its fixture's (and the plain fixtures') records are counted under. */
export function leafOf(row: Pick<LadderRung, 'stage' | 'ladder' | 'code'>): string {
  return `${row.stage} ${row.ladder} ${row.code}`;
}

/**
 * The table check (§13.1; the item's test "every §5.2 ladder appears in the table once, built or with its milestone; a
 * ladder missing from the table fails"): every §5.2 class has rows (the kernel ladders may hold theirs in M0-k-04's
 * report, `kernelLadders`), no row names a class outside §5.2, no (stage, ladder, rung) pair or built leaf appears
 * twice, every built row names a fixture of `fixtures`, and every deferred row its milestone. Returns the problems.
 */
export function checkLadderTable(rows: readonly LadderRung[], classes: readonly string[] = SECTION_5_2, kernelLadders: readonly string[] = KERNEL_LADDERS, fixtures?: ReadonlySet<string>): string[] {
  const problems: string[] = [];
  const known = new Set(classes);
  const named = new Set<string>([...kernelLadders]);
  const pairs = new Set<string>();
  const leaves = new Set<string>();
  for (const r of rows) {
    if (!known.has(r.ladder)) problems.push(`'${r.ladder}' is no §5.2 ladder`);
    named.add(r.ladder);
    const pair = `${r.stage}|${r.ladder}|${r.rung}`;
    if (pairs.has(pair)) problems.push(`${r.ladder} '${r.rung}' at ${r.stage} appears twice`);
    pairs.add(pair);
    if (r.milestone === undefined) {
      const leaf = leafOf(r);
      if (leaves.has(leaf)) problems.push(`the leaf '${leaf}' is counted for two built rows`);
      leaves.add(leaf);
      if (fixtures !== undefined && !fixtures.has(r.fixture)) problems.push(`${r.ladder} '${r.rung}' names no fixture of the set ('${r.fixture}')`);
    } else if (r.milestone.trim().length === 0) problems.push(`${r.ladder} '${r.rung}' is deferred to no milestone`);
  }
  for (const c of classes) if (!named.has(c)) problems.push(`§5.2's ${c} is missing from the table`);
  return problems;
}
