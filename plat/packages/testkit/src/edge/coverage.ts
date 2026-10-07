// The edge suite's coverage table (M0-x-06; §4.13's edge table and combination table; §13.2 B-EDGE; §13.8's B-EDGE row:
// "first milestone: the milestone that lands each row's mechanism"; §13.1's class × kind grid; C-0100, C-0118; M0.md
// §4b's three B-EDGE rows). `edgeCoverage()` lists every §4.13 EP row (EP-01 – EP-27), every combination cell (nine
// features × four columns) and its named fixtures, every (class, kind) pair of §13.1 at M0, every EP-01 (stage, kind)
// cell and the two sweeps — each with the fixtures that run it now, or the milestone that lands its mechanism (a row may
// hold both: its M0 part's fixtures and its later part's milestone). A row missing from the table, a fixture it names
// that EDGE_FIXTURES lacks, or a built fixture no row names is a problem, and the table is incomplete.
import { EDGE_CLASSES } from './classes.js';
import { EP01_STAGES } from './ep01.js';
import { DEGENERATE_KINDS } from './kinds.js';
import type { EdgeFixture } from './types.js';

/** One row of the table. */
export interface EdgeCoverageRow {
  /** `EP-07`, `cell/<feature>×<column>`, `named/<…>`, `class/<class>/<kind>`, `EP-01/<stage>/<kind>`, `sweep/<…>`. */
  readonly key: string;
  readonly kind: 'EP row' | 'combination cell' | 'named fixture' | 'class × kind' | 'EP-01 cell' | 'sweep';
  /** What the row covers, in the design's words. */
  readonly what: string;
  /** The fixtures that run it at M0 (their EDGE_FIXTURES ids). */
  readonly fixtures: readonly string[];
  /** The milestone that lands its mechanism (or its later part's), when not wholly M0's. */
  readonly milestone?: string;
  /** The part the milestone covers, when the row has an M0 part too. */
  readonly later?: string;
}

/** The coverage report: the rows, the problems found and whether the table is complete. */
export interface EdgeCoverageReport {
  readonly rows: readonly EdgeCoverageRow[];
  readonly problems: readonly string[];
  readonly complete: boolean;
  /** Rows per kind, and the rows run at M0 (with a fixture) and listed with a milestone only. */
  readonly counts: { readonly rows: number; readonly built: number; readonly deferred: number; readonly fixtures: number };
}

/** §4.13's EP rows: id, mechanism, and the milestone its mechanism lands at (M0's rows carry their fixtures below). */
export const EP_ROWS: readonly { readonly id: string; readonly mechanism: string; readonly milestone?: string; readonly later?: string }[] = Object.freeze([
  { id: 'EP-01', mechanism: 'every stage: zero-length, zero-area, self-touching, collinear or coincident geometry' },
  { id: 'EP-02', mechanism: "S0: a band's floor, a single building, THORP to the METROPOLIS cap", milestone: 'M1' },
  { id: 'EP-03', mechanism: "S0's sewer feature: on at TOWN, on below TOWN, off at CITY, missing", milestone: 'M1' },
  { id: 'EP-04', mechanism: 'S5b / S5c: no new primary owed; no seed inside the boundary' },
  { id: 'EP-05', mechanism: 'S5d: a face whose reserves cover it' },
  { id: 'EP-06', mechanism: 'S6: a single coarse face; a degenerate district face' },
  { id: 'EP-07', mechanism: 'S7b: zero-capacity district; one district; a claim no face holds', milestone: 'M1' },
  { id: 'EP-08', mechanism: 'S10a: an empty allocation; one block; every rung', milestone: 'M1' },
  { id: 'EP-09', mechanism: 'S10b: a block with no class; a request with no item', milestone: 'M1' },
  { id: 'EP-10', mechanism: "S11: the village rungs' furniture", milestone: 'M1' },
  { id: 'EP-11', mechanism: 'S12a: no hinterland land', milestone: 'M1' },
  { id: 'EP-12', mechanism: 'S12b: a refused layout; no green face; save, undo, regenerate', milestone: 'M1' },
  { id: 'EP-13', mechanism: 'S13a: no nameable feature of a kind; one district', milestone: 'M1' },
  { id: 'EP-14', mechanism: 'an epoch: a target equal to the population; a residual ≤ 0; a spring at flow 0', milestone: 'M4' },
  { id: 'EP-15', mechanism: 'history-first generation: no peak, a founding after the present, …; a replay 300 years back', milestone: 'M6-E' },
  { id: 'EP-16', mechanism: 'the stop test and the ring spacing: the folded bell at its end (g = 1; f = 1)', milestone: 'M5', later: "the ring spacing's end (f = 1; II.2's ring template)" },
  { id: 'EP-17', mechanism: 'S12c: pseudo-districts, undercity and underground neighbourhoods, unit runs', milestone: 'M6-U' },
  { id: 'EP-18', mechanism: '§10.2 – §10.4: an empty or contradictory table row; a pack with no names; every rung; save, undo, migrate', milestone: 'M4b' },
  { id: 'EP-19', mechanism: 'II.7.1 – II.7.6: each edge the underground sections state', milestone: 'M6-U' },
  { id: 'EP-20', mechanism: 'S3 (6), S5a, S5d: less reachable land than a stage asks', milestone: 'M1', later: 'the island-town, fjord-site and narrow-valley METROPOLIS fixtures (coast and islands)' },
  { id: 'EP-21', mechanism: 'S3 (4), (7), (9); S5a: a barrier closing the arcs a gate falls on, or every arc', milestone: 'M1' },
  { id: 'EP-22', mechanism: "S3 (10); S5a's outer moats: a wet moat with no water within reach or on sloping ground", milestone: 'M3a' },
  { id: 'EP-23', mechanism: 'S3 (5), S4, S5b, S5c: the steepest ground', milestone: 'M1', later: "the S5b / S5c part (S5 on relief with B-CITY) and S3 (5)'s own grade limit (ways.crossing's rampMaxGrade, V11's row)" },
  { id: 'EP-24', mechanism: "S8's cliff band; S10, S11 levelling", milestone: 'M3a' },
  { id: 'EP-25', mechanism: 'S1 (6), S3 (2): a harbour on a site with a river but no coast', milestone: 'M1' },
  { id: 'EP-26', mechanism: "S10b's dossier request: no seat on the current map for a dossier element", milestone: 'M1' },
  { id: 'EP-27', mechanism: "§10.2's crisis looks (a look only)", milestone: 'M4b' },
]);

/** The combination table's rows (features) and columns, in the design's order. */
export const CELL_FEATURES: readonly string[] = Object.freeze(['cliff or steep slope', 'river, coast, moat', 'harbour', 'wall', 'bridge', 'square or reservation', 'hinterland', 'oasis', 'plots and buildings']);
export const CELL_COLUMNS: readonly string[] = Object.freeze(['raised way', 'retaining wall', 'deck plot', 'frame']);

/** Each cell's milestone (or its M0 fixture): the raised way's and the retaining wall's columns M3a, the deck plot's M1. */
function cellRow(feature: string, column: string): EdgeCoverageRow {
  const key = `cell/${feature}×${column}`;
  const what = `${feature} × ${column === 'frame' ? 'the frame' : `a ${column}`}`;
  if (column === 'raised way' || column === 'retaining wall') return { key, kind: 'combination cell', what, fixtures: [], milestone: 'M3a' };
  if (column === 'deck plot') return { key, kind: 'combination cell', what, fixtures: [], milestone: 'M1' };
  switch (feature) {
    case 'cliff or steep slope':
      return { key, kind: 'combination cell', what, fixtures: ['cell/cliff×frame'], milestone: 'M1', later: "the drawn clause, nothing drawn beyond the ring (S14; C-0118)" };
    case 'river, coast, moat':
      return { key, kind: 'combination cell', what, fixtures: ['cell/river×frame'], milestone: 'M1', later: 'the coast (M1) and the moat (M3a, carves) reaching the ring' };
    case 'wall':
      return { key, kind: 'combination cell', what, fixtures: ['cell/wall×frame'] };
    case 'bridge':
      return { key, kind: 'combination cell', what, fixtures: ['cell/bridge×frame'] };
    default:
      return { key, kind: 'combination cell', what, fixtures: [], milestone: 'M1' };
  }
}

/** The table (see the header). */
export function edgeCoverageRows(): EdgeCoverageRow[] {
  const rows: EdgeCoverageRow[] = [];
  const m0: Readonly<Record<string, readonly string[]>> = {
    'EP-01': EP01_STAGES.flatMap((s) => DEGENERATE_KINDS.map((k) => `EP-01/${s}/${k}`)),
    'EP-04': ['EP-04/S5b', 'EP-04/S5c'],
    'EP-05': ['EP-05/S5d'],
    'EP-06': ['EP-06/S6/single-face', 'EP-06/S6/degenerate-face'],
    'EP-16': ['EP-16/stop-test'],
    'EP-20': ['EP-20/M0'],
    'EP-23': ['EP-23/M0'],
  };
  for (const r of EP_ROWS) {
    rows.push({ key: r.id, kind: 'EP row', what: r.mechanism, fixtures: m0[r.id] ?? [], ...(r.milestone === undefined ? {} : { milestone: r.milestone }), ...(r.later === undefined ? {} : { later: r.later }) });
  }
  for (const f of CELL_FEATURES) for (const c of CELL_COLUMNS) rows.push(cellRow(f, c));
  rows.push({ key: 'named/cliff across a district; two plots at a cliff\'s top and foot', kind: 'named fixture', what: 'the cliff × retaining-wall cell', fixtures: [], milestone: 'M3a' });
  rows.push({ key: 'named/a cliff-headland coast with the harbour-wall rows on', kind: 'named fixture', what: 'the cliff × deck-plot cell', fixtures: [], milestone: 'M1' });
  rows.push({ key: 'named/a CITY viaduct at M3a with stage 2 unregistered', kind: 'named fixture', what: 'the plots × raised-way cell', fixtures: [], milestone: 'M3a' });
  for (const cls of EDGE_CLASSES) for (const k of DEGENERATE_KINDS) rows.push({ key: `class/${cls}/${k}`, kind: 'class × kind', what: `${cls}: one ${k} input`, fixtures: [`class/${cls}/${k}`] });
  for (const s of EP01_STAGES) for (const k of DEGENERATE_KINDS) rows.push({ key: `EP-01/${s}/${k}`, kind: 'EP-01 cell', what: `EP-01 at ${s}: ${k} geometry`, fixtures: [`EP-01/${s}/${k}`] });
  rows.push({ key: 'sweep/rung (TOWN, METROPOLIS)', kind: 'sweep', what: "B-EDGE's rung sweep: every row at every rung it names (the M0 fixtures run at CITY)", fixtures: [], milestone: 'M1' });
  rows.push({ key: 'sweep/preset (the parity presets, each layer on and off)', kind: 'sweep', what: "B-EDGE's preset sweep", fixtures: [], milestone: 'M1' });
  return rows;
}

/** The keys the table must hold: every EP row, every cell, every (class, kind) pair and every EP-01 cell. */
export function requiredKeys(): string[] {
  const out: string[] = EP_ROWS.map((r) => r.id);
  for (let i = 1; i <= 27; i += 1) {
    const id = `EP-${String(i).padStart(2, '0')}`;
    if (!out.includes(id)) out.push(id);
  }
  for (const f of CELL_FEATURES) for (const c of CELL_COLUMNS) out.push(`cell/${f}×${c}`);
  for (const cls of EDGE_CLASSES) for (const k of DEGENERATE_KINDS) out.push(`class/${cls}/${k}`);
  for (const s of EP01_STAGES) for (const k of DEGENERATE_KINDS) out.push(`EP-01/${s}/${k}`);
  return out;
}

/** The table's problems against the fixtures (see the header). */
export function coverageProblems(rows: readonly EdgeCoverageRow[], fixtures: readonly EdgeFixture[]): string[] {
  const out: string[] = [];
  const keys = new Set<string>();
  for (const r of rows) {
    if (keys.has(r.key)) out.push(`the table holds ${r.key} twice`);
    keys.add(r.key);
    if (r.fixtures.length === 0 && r.milestone === undefined) out.push(`${r.key} names neither a fixture nor a milestone`);
    if (r.milestone === 'M0') out.push(`${r.key} names M0 as its later milestone`);
  }
  for (const k of requiredKeys()) if (!keys.has(k)) out.push(`the table lacks ${k}`);
  const byId = new Map(fixtures.map((f) => [f.id, f]));
  const named = new Set<string>();
  for (const r of rows) {
    for (const id of r.fixtures) {
      named.add(id);
      const f = byId.get(id);
      if (f === undefined) out.push(`${r.key} names ${id}, which no fixture is`);
      else if (f.milestone !== undefined) out.push(`${r.key} names ${id} as run at M0, but it is ${f.milestone}'s`);
    }
  }
  for (const f of fixtures) if (f.milestone === undefined && !named.has(f.id)) out.push(`the fixture ${f.id} is in no row of the table`);
  return out;
}

/** The coverage report over the given fixtures (see the header). */
export function coverageReportOf(fixtures: readonly EdgeFixture[], rows: readonly EdgeCoverageRow[] = edgeCoverageRows()): EdgeCoverageReport {
  const problems = coverageProblems(rows, fixtures);
  const built = rows.filter((r) => r.fixtures.length > 0).length;
  return {
    rows: [...rows],
    problems,
    complete: problems.length === 0,
    counts: { rows: rows.length, built, deferred: rows.length - built, fixtures: fixtures.filter((f) => f.milestone === undefined).length },
  };
}
