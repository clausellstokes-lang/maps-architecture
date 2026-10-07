// M0-x-05: the stage-rung registry (§13.1 *Ladder coverage*; §5.2's two tables; C-0085, C-0109, C-0268): every §5.2
// ladder appears in the table, built or with its milestone, and a table missing one fails; every rung of C-0085's list
// M0 builds is a built row with its fixture; every later rung and every ladder of a stage M0 does not build carries the
// milestone the item's brief gives it; the kernel ladders are M0-k-04's (merged, never re-listed).
import { describe, expect, it } from 'vitest';
import { checkLadderTable, KERNEL_LADDERS, LADDER_CONTROLS, LADDER_FIXTURES, ladderLeafOf, SECTION_5_2, STAGE_LADDERS, type LadderRung } from '@plat/testkit';

const FIXTURE_IDS = new Set(LADDER_FIXTURES.map((f) => f.id));

/** §5.2 as the design draws it: the main table, then the staged layers' table (F-SKY-* one row of ten). */
const DESIGN_5_2 = [
  'F-NUM', 'F-CUT', 'F-CORRIDOR', 'F-OUTLINE', 'F-RIVER', 'F-CONTOUR', 'F-SITE', 'F-ROUTE', 'F-BUDGET-STAGE', 'F-WALL', 'F-CASTLE',
  'F-PLOT', 'F-SITING', 'F-SITEPLAN', 'F-MASSING', 'F-COMPOSE', 'F-PLAN', 'F-UNDER', 'F-NET', 'F-VOID', 'F-SKELETON', 'F-LABEL',
  'F-LIGHT', 'F-WORK', 'F-BUDGET-TIME', 'F-EDIT', 'F-REDERIVE', 'F-TEMPLATE', 'F-DISPATCH', 'F-UNIT', 'F-SKY-FILL', 'F-SKY-PLACE',
  'F-SKY-TERRAIN', 'F-SKY-ACCESS', 'F-SKY-UNIT', 'F-SKY-CLEAR', 'F-SKY-CRYPT', 'F-SKY-SHADE', 'F-SKY-LANDFALL', 'F-SKY-HANDOVER',
];

/** C-0085's list: every stage rung M0 builds, as (ladder, stage, code) — each a built row with its own fixture. */
const C0085_BUILT: readonly [string, string, string][] = [
  ['F-CUT', 'S8', 'pre'],
  ['F-CUT', 'S8', 'antenna'],
  ['F-CUT', 'S8', 'a@attempt>=1'],
  ['F-CUT', 'S8', 'b'],
  ['F-CUT', 'S8', 'W_CUT_SLID'],
  ['F-CUT', 'S8', 'd'],
  ['F-ROUTE', 'S4', 'another_site'],
  ['F-ROUTE', 'S4', 'slope'],
  ['F-ROUTE', 'S4', 'unserved'],
  ['F-NUM', 'S5c', 're_propose'],
  ['F-NUM', 'S5c', 'reject'],
  ['F-RIVER', 'S1', 'carve'],
  ['F-RIVER', 'S1', 'retrace'],
  ['F-RIVER', 'S1', 'inlet'],
  ['F-WALL', 'S3', 'redraw'],
  ['F-WALL', 'S3', 'drop'],
  ['F-WALL', 'S3/S5a trace', 'reoffset'],
  ['F-WALL', 'S3/S5a trace', 'union_simplify'],
  ['F-BUDGET-STAGE', 'S5d', 'top_up'],
  ['F-BUDGET-STAGE', 'S5d', 'accept_shortfall'],
  ['F-WORK', 'S1', 'work_cut'],
  ['F-WORK', 'S6 fields', 'work_cut'],
  ['F-WORK', 'S3', 'work_cut'],
  ['F-WORK', 'S4', 'work_cut'],
  ['F-WORK', 'S5c', 'work_cut'],
  ['F-WORK', 'S6', 'work_cut'],
  ['F-WORK', 'S8', 'work_cut'],
  ['F-WORK', 'kernel', 'E_WORK_LIMIT'],
];

/** The item's brief: every ladder of a stage M0 does not build, with its milestone (or its volume). */
const DEFERRED_LADDERS: Readonly<Record<string, string>> = {
  'F-CORRIDOR': 'M1',
  'F-OUTLINE': 'M1',
  'F-CONTOUR': 'M1',
  'F-SITE': 'M1',
  'F-CASTLE': 'M1',
  'F-PLOT': 'M1',
  'F-SITING': 'M1',
  'F-SITEPLAN': 'M1',
  'F-EDIT': 'M2a',
  'F-REDERIVE': 'M3a',
  'F-BUDGET-TIME': 'M1',
  'F-LABEL': 'M1',
  'F-LIGHT': 'M4',
  'F-MASSING': 'V02',
  'F-COMPOSE': 'V02',
  'F-PLAN': 'V03',
  'F-UNDER': 'V04',
  'F-NET': 'V04',
  'F-VOID': 'V04',
  'F-TEMPLATE': 'V01',
  'F-DISPATCH': 'V01',
  'F-UNIT': 'V01',
  'F-SKY-FILL': 'V05',
  'F-SKY-PLACE': 'V05',
  'F-SKY-TERRAIN': 'V05',
  'F-SKY-ACCESS': 'V05',
  'F-SKY-UNIT': 'V05',
  'F-SKY-CLEAR': 'V05',
  'F-SKY-CRYPT': 'V05',
  'F-SKY-SHADE': 'V05',
  'F-SKY-LANDFALL': 'V05',
  'F-SKY-HANDOVER': 'V05',
};

/** The later rungs of the ladders M0 builds (§4b's row; C-0085): (ladder, code) → milestone. */
const LATER_RUNGS: readonly [string, string, string][] = [
  ['F-ROUTE', 'extra_bridge', 'M1'],
  ['F-RIVER', 'centre', 'M1'],
  ['F-RIVER', 'no_crossing', 'M1'],
  ['F-RIVER', 'not_built', 'M1'],
  ['F-WALL', 'anchor', 'M1'],
  ['F-WALL', 'divert', 'M1'],
  ['F-WALL', 'postern', 'M1'],
  ['F-WALL', 'setback_cut', 'M1'],
  ['F-WALL', 'W_RAISED_MEETING', 'M3a'],
  ['F-BUDGET-STAGE', 'unplaced', 'M1'],
];

describe('§5.2 in the table (C-0085, C-0109)', () => {
  it('SECTION_5_2 is §5.2’s two tables in the design’s order, each class once', () => {
    expect([...SECTION_5_2]).toEqual(DESIGN_5_2);
    expect(new Set(SECTION_5_2).size).toBe(SECTION_5_2.length);
    expect([...KERNEL_LADDERS]).toEqual(['F-NUM', 'F-SKELETON']);
  });

  it('every §5.2 ladder appears in the table, built or with its milestone; the registry is whole (no problem)', () => {
    expect(checkLadderTable(STAGE_LADDERS, SECTION_5_2, KERNEL_LADDERS, FIXTURE_IDS)).toEqual([]);
    for (const c of SECTION_5_2) {
      if (c === 'F-SKELETON') continue;
      expect(STAGE_LADDERS.some((r) => r.ladder === c), c).toBe(true);
    }
    // F-SKELETON is the kernel's alone (M0-k-04's rows); the table never re-lists it.
    expect(STAGE_LADDERS.some((r) => r.ladder === 'F-SKELETON')).toBe(false);
  });

  it('a ladder missing from the table fails, named: each §5.2 class removed in turn', () => {
    for (const c of SECTION_5_2) {
      if (c === 'F-SKELETON') continue;
      const without = STAGE_LADDERS.filter((r) => r.ladder !== c);
      const problems = checkLadderTable(without, SECTION_5_2, KERNEL_LADDERS, FIXTURE_IDS);
      // F-NUM stays named by the kernel's rows when its stage rows go; every other class is then missing.
      expect(problems, c).toEqual(c === 'F-NUM' ? [] : [`§5.2's ${c} is missing from the table`]);
    }
    // Without the kernel's report, F-SKELETON (and F-NUM's kernel side) is missing too.
    expect(checkLadderTable(STAGE_LADDERS, SECTION_5_2, [], FIXTURE_IDS)).toEqual(["§5.2's F-SKELETON is missing from the table"]);
  });

  it('a ladder outside §5.2, a rung listed twice, a built row with no fixture, a deferred row with no milestone each fail', () => {
    const one = STAGE_LADDERS[0];
    const def = STAGE_LADDERS.find((r) => r.milestone !== undefined) as LadderRung;
    const planted: [string, LadderRung[], string][] = [
      ['outside', [...STAGE_LADDERS, { ...one, ladder: 'F-NOPE', rung: 'x' }], "'F-NOPE' is no §5.2 ladder"],
      ['twice', [...STAGE_LADDERS, { ...def }], `${def.ladder} '${def.rung}' at ${def.stage} appears twice`],
      ['no fixture', [...STAGE_LADDERS.slice(1), { ...one, fixture: 'cut/nosuch' }], `${one.ladder} '${one.rung}' names no fixture of the set ('cut/nosuch')`],
      ['no milestone', [...STAGE_LADDERS, { ...one, rung: 'later', milestone: ' ' }], `${one.ladder} 'later' is deferred to no milestone`],
      ['one leaf twice', [...STAGE_LADDERS, { ...one, rung: 'another wording' }], `the leaf '${ladderLeafOf(one)}' is counted for two built rows`],
    ];
    for (const [what, rows, problem] of planted) expect([what, checkLadderTable(rows, SECTION_5_2, KERNEL_LADDERS, FIXTURE_IDS)]).toEqual([what, [problem]]);
    // A built row repeated whole is both: its rung twice and its leaf twice.
    expect(checkLadderTable([...STAGE_LADDERS, { ...one }], SECTION_5_2, KERNEL_LADDERS, FIXTURE_IDS)).toEqual([`${one.ladder} '${one.rung}' at ${one.stage} appears twice`, `the leaf '${ladderLeafOf(one)}' is counted for two built rows`]);
  });
});

describe('the rungs M0 builds (C-0085’s list)', () => {
  const builtRows = STAGE_LADDERS.filter((r) => r.milestone === undefined);

  it('every rung of C-0085’s list is a built row of its stage and code, and nothing else is built', () => {
    expect(builtRows.map((r) => [r.ladder, r.stage, r.code]).sort()).toEqual([...C0085_BUILT].map((x) => [...x]).sort());
  });

  it('every built row names its own fixture of the set; every fixture forces one row; no control is a row’s fixture', () => {
    const fixtures = builtRows.map((r) => r.fixture);
    expect(new Set(fixtures).size).toBe(fixtures.length);
    for (const f of fixtures) expect(FIXTURE_IDS.has(f), f).toBe(true);
    expect(LADDER_FIXTURES.map((f) => f.id).sort()).toEqual([...fixtures].sort());
    for (const c of LADDER_CONTROLS) expect(fixtures.includes(c.id), c.id).toBe(false);
    for (const f of LADDER_FIXTURES) expect(f.forces.length, f.id).toBeGreaterThan(10);
  });

  it('every built row has the registry’s fields: ladder, rung, stage, code, fixture, and no milestone', () => {
    for (const r of builtRows) {
      expect(Object.keys(r).sort(), r.rung).toEqual(['code', 'fixture', 'ladder', 'rung', 'stage']);
      for (const v of [r.ladder, r.rung, r.stage, r.code, r.fixture]) expect(v.length).toBeGreaterThan(0);
    }
  });
});

describe('the deferred rows (§4b; the item’s defers)', () => {
  it('every ladder of a stage M0 does not build carries the brief’s milestone on every row, and no built row', () => {
    for (const [ladder, milestone] of Object.entries(DEFERRED_LADDERS)) {
      const rows = STAGE_LADDERS.filter((r) => r.ladder === ladder);
      expect(rows.length, ladder).toBeGreaterThan(0);
      for (const r of rows) expect([ladder, r.milestone]).toEqual([ladder, milestone]);
    }
    // Every ladder is either deferred whole, built in part, or the kernel's: the three sets cover §5.2.
    const builtLadders = new Set(STAGE_LADDERS.filter((r) => r.milestone === undefined).map((r) => r.ladder));
    for (const c of SECTION_5_2) expect([c, c in DEFERRED_LADDERS || builtLadders.has(c) || KERNEL_LADDERS.includes(c)]).toEqual([c, true]);
    for (const c of builtLadders) expect(c in DEFERRED_LADDERS, c).toBe(false);
  });

  it('the later rungs of F-ROUTE, F-RIVER, F-WALL and F-BUDGET-STAGE carry M1 / M3a', () => {
    for (const [ladder, code, milestone] of LATER_RUNGS) {
      const rows = STAGE_LADDERS.filter((r) => r.ladder === ladder && r.code === code);
      expect(rows.map((r) => r.milestone), `${ladder} ${code}`).toEqual([milestone]);
    }
    // F-CUT's later uses: the green / landmark / joined-plot substitutions and S10's plot re-cuts.
    expect(STAGE_LADDERS.filter((r) => r.ladder === 'F-CUT' && r.milestone !== undefined).map((r) => [r.stage, r.milestone])).toEqual([
      ['S8', 'M1'],
      ['S10', 'M1'],
    ]);
  });
});
