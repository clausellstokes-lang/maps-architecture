// The edge suite's coverage table (M0-x-06; §4.13's edge table and combination table, §13.1's class × kind grid, §13.8's
// B-EDGE row; C-0100, C-0118): every EP row, every combination cell and every (class, kind) pair with a fixture or a
// milestone, the deferrals the item's brief names, and a table missing a row fails naming it.
import { describe, expect, it } from 'vitest';
import { EDGE_FIXTURES, edgeCoverage, type EdgeFixture } from '../../src/edge/index.js';
import { CELL_COLUMNS, CELL_FEATURES, coverageProblems, coverageReportOf, edgeCoverageRows, EP_ROWS, requiredKeys } from '../../src/edge/coverage.js';
import { EDGE_CLASSES } from '../../src/edge/classes.js';
import { EP01_STAGES } from '../../src/edge/ep01.js';
import { DEGENERATE_KINDS } from '../../src/edge/kinds.js';

const EP_IDS = Array.from({ length: 27 }, (_, i) => `EP-${String(i + 1).padStart(2, '0')}`);
const rows = edgeCoverageRows();
const byKey = new Map(rows.map((r) => [r.key, r]));

describe('the coverage table (edgeCoverage)', () => {
  it('is complete over EDGE_FIXTURES: no problem', () => {
    const c = edgeCoverage();
    expect(c.problems).toEqual([]);
    expect(c.complete).toBe(true);
    expect(c.counts.rows).toBe(c.rows.length);
    expect(c.counts.built + c.counts.deferred).toBe(c.rows.length);
  });

  it('holds every §4.13 EP row, every combination cell, every (class, kind) pair and every EP-01 cell', () => {
    for (const id of EP_IDS) expect(byKey.has(id), id).toBe(true);
    expect(EP_ROWS.map((r) => r.id)).toEqual(EP_IDS);
    expect(CELL_FEATURES).toHaveLength(9);
    expect(CELL_COLUMNS).toEqual(['raised way', 'retaining wall', 'deck plot', 'frame']);
    for (const f of CELL_FEATURES) for (const c of CELL_COLUMNS) expect(byKey.has(`cell/${f}×${c}`), `${f} × ${c}`).toBe(true);
    expect(EDGE_CLASSES).toEqual(['F-NUM', 'F-CUT', 'F-RIVER', 'F-ROUTE', 'F-WALL', 'F-BUDGET-STAGE', 'F-SKELETON', 'F-WORK']);
    expect(DEGENERATE_KINDS).toEqual(['zero-length', 'zero-area', 'self-touching', 'collinear', 'coincident']);
    for (const cls of EDGE_CLASSES) for (const k of DEGENERATE_KINDS) expect(byKey.get(`class/${cls}/${k}`)?.fixtures.length, `${cls} ${k}`).toBeGreaterThan(0);
    expect(EP01_STAGES).toEqual(['S1', 'S3', 'S4', 'S5a', 'S5b', 'S5c', 'S5d', 'S6', 'S8']);
    for (const s of EP01_STAGES) for (const k of DEGENERATE_KINDS) expect(byKey.get(`EP-01/${s}/${k}`)?.fixtures).toEqual([`EP-01/${s}/${k}`]);
    expect(requiredKeys()).toHaveLength(27 + 36 + 40 + 45);
  });

  it("runs B-EDGE's M0 rows and lists the rest with the milestone the brief gives them", () => {
    const fx = (id: string) => byKey.get(id)?.fixtures ?? [];
    expect(fx('EP-01')).toHaveLength(45);
    expect(fx('EP-04')).toEqual(['EP-04/S5b', 'EP-04/S5c']);
    expect(fx('EP-05')).toEqual(['EP-05/S5d']);
    expect(fx('EP-06')).toEqual(['EP-06/S6/single-face', 'EP-06/S6/degenerate-face']);
    expect(fx('EP-16')).toEqual(['EP-16/stop-test']);
    expect(fx('EP-20')).toEqual(['EP-20/M0']);
    expect(fx('EP-23')).toEqual(['EP-23/M0']);
    for (const id of ['EP-01', 'EP-04', 'EP-05', 'EP-06']) expect(byKey.get(id)?.milestone, id).toBeUndefined();
    // the parts deferred with an M0 part run now
    expect(byKey.get('EP-16')?.milestone).toBeDefined();
    expect(byKey.get('EP-16')?.later).toMatch(/ring spacing/);
    expect(byKey.get('EP-20')?.milestone).toBe('M1');
    expect(byKey.get('EP-20')?.later).toMatch(/island.*fjord.*narrow-valley/);
    expect(byKey.get('EP-23')?.milestone).toBe('M1');
    expect(byKey.get('EP-23')?.later).toMatch(/S5b \/ S5c/);
    // EP-02, EP-03 (S0 → M1); EP-07 – EP-15, EP-17 – EP-19, EP-21, EP-22, EP-24 – EP-27: no fixture, a later milestone
    for (const id of ['EP-02', 'EP-03']) expect(byKey.get(id)?.milestone, id).toBe('M1');
    const later = ['EP-07', 'EP-08', 'EP-09', 'EP-10', 'EP-11', 'EP-12', 'EP-13', 'EP-14', 'EP-15', 'EP-17', 'EP-18', 'EP-19', 'EP-21', 'EP-22', 'EP-24', 'EP-25', 'EP-26', 'EP-27'];
    for (const id of ['EP-02', 'EP-03', ...later]) {
      const r = byKey.get(id);
      expect(r?.fixtures, id).toEqual([]);
      expect(r?.milestone, id).toMatch(/^M[1-9]/);
    }
    // the frame column: four cells at M0 (cliff, river, bridge, wall; C-0118), the cliff's drawn clause M1 (S14)
    expect(fx('cell/cliff or steep slope×frame')).toEqual(['cell/cliff×frame']);
    expect(byKey.get('cell/cliff or steep slope×frame')?.milestone).toBe('M1');
    expect(byKey.get('cell/cliff or steep slope×frame')?.later).toMatch(/S14/);
    expect(fx('cell/river, coast, moat×frame')).toEqual(['cell/river×frame']);
    expect(fx('cell/bridge×frame')).toEqual(['cell/bridge×frame']);
    expect(fx('cell/wall×frame')).toEqual(['cell/wall×frame']);
    for (const f of CELL_FEATURES) {
      for (const c of CELL_COLUMNS) {
        const r = byKey.get(`cell/${f}×${c}`);
        if (c === 'frame' && ['cliff or steep slope', 'river, coast, moat', 'bridge', 'wall'].includes(f)) continue;
        expect(r?.fixtures, `${f} × ${c}`).toEqual([]);
        expect(r?.milestone, `${f} × ${c}`).toMatch(/^M[1-9]/);
      }
    }
    // the sweeps: the rung sweep (TOWN, METROPOLIS) and the preset sweep → M1, the M0 fixtures running at CITY
    expect(byKey.get('sweep/rung (TOWN, METROPOLIS)')?.milestone).toBe('M1');
    expect(byKey.get('sweep/preset (the parity presets, each layer on and off)')?.milestone).toBe('M1');
  });

  it("names each class's inputs at the stage §4.1's transactions table gives the class (C-0272 (11))", () => {
    const byRef: Record<string, string> = { 'F-CUT': 'S8', 'F-RIVER': 'S1', 'F-ROUTE': 'S4', 'F-WALL': 'S5a', 'F-BUDGET-STAGE': 'S5d' };
    for (const k of DEGENERATE_KINDS) {
      for (const [cls, stage] of Object.entries(byRef)) expect(byKey.get(`class/${cls}/${k}`)?.fixtures, `${cls} ${k}`).toEqual([`EP-01/${stage}/${k}`]);
      expect(byKey.get(`class/F-NUM/${k}`)?.fixtures).toEqual([`class/F-NUM/${k}`, `EP-01/S5c/${k}`]);
      expect(byKey.get(`class/F-SKELETON/${k}`)?.fixtures).toEqual([`class/F-SKELETON/${k}`]);
      expect(byKey.get(`class/F-WORK/${k}`)?.fixtures).toEqual([`class/F-WORK/${k}`]);
    }
  });

  it('fails a table missing a row, naming it — for every required key', () => {
    for (const k of requiredKeys()) {
      const p = coverageProblems(
        rows.filter((r) => r.key !== k),
        EDGE_FIXTURES,
      );
      expect(p, k).toContain(`the table lacks ${k}`);
    }
  });

  it('fails a row with neither fixture nor milestone, a row named twice, a fixture no row names, and a row naming no fixture', () => {
    const bare = rows.map((r) => (r.key === 'EP-07' ? { key: r.key, kind: r.kind, what: r.what, fixtures: [] } : r));
    expect(coverageProblems(bare, EDGE_FIXTURES)).toContain('EP-07 names neither a fixture nor a milestone');
    expect(coverageProblems([...rows, rows[0]], EDGE_FIXTURES)).toContain(`the table holds ${rows[0].key} twice`);
    const stray: EdgeFixture = { id: 'stray/one', home: 'x', run: () => ({ handling: 'defined', rung: 'x', problems: [], facts: {} }), expect: { outcome: 'x', allowed: ['defined'] } };
    expect(coverageProblems(rows, [...EDGE_FIXTURES, stray])).toContain('the fixture stray/one is in no row of the table');
    const missing = EDGE_FIXTURES.filter((f) => f.id !== 'EP-05/S5d');
    expect(coverageProblems(rows, missing)).toContain('EP-05 names EP-05/S5d, which no fixture is');
    const r = coverageReportOf(missing);
    expect(r.complete).toBe(false);
  });

  it('every deferred row is a notBuilt stub of its milestone; the built fixtures are unique and carry their home', () => {
    const ids = EDGE_FIXTURES.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    const built = EDGE_FIXTURES.filter((f) => f.milestone === undefined);
    // 45 EP-01 cells, 8 row fixtures, 4 frame cells, 15 class cells (F-NUM's and F-SKELETON's kernel side, F-WORK)
    expect(built).toHaveLength(45 + 8 + 4 + 15);
    for (const f of built) {
      expect(f.home.length, f.id).toBeGreaterThan(0);
      expect(f.expect.allowed.length, f.id).toBeGreaterThan(0);
      expect(f.expect.allowed, f.id).not.toContain('off');
    }
    const deferred = EDGE_FIXTURES.filter((f) => f.milestone !== undefined);
    expect(deferred.length).toBe(rows.filter((r) => r.fixtures.length === 0).length);
    for (const f of deferred) {
      expect(f.milestone, f.id).toMatch(/^M[1-9]/);
      expect(() => f.run(1), f.id).toThrow(`notBuilt('${String(f.milestone)}')`);
    }
  });
});
