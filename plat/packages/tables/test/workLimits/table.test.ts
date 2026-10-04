// M0-f-03a: workLimits.json and its loader (§5.1 (5), §14; C-0021, C-0153, C-0174) — every counter of M0-work.json's
// list has exactly one row; a duplicate or a missing counter fails the loader; the placeholder provenance is present
// on every row; every cell carries unit, provenance and calibratable; the law form is refused when malformed; the file
// is pinned at its version (a changed cell is a declared change, the hand-over's writer bumping the version).
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, expectTypeOf, it } from 'vitest';
import type { WorkUnit } from '@plat/model';
import {
  checkWorkLimits,
  duplicateKeys,
  loadWorkLimits,
  parseTable,
  parseWorkLimits,
  parseWorkLimitsText,
  provenanceForm,
  TableError,
  WORK_LIMIT_COUNTERS,
  WORK_LIMITS_TABLE,
  WORK_UNITS,
  workLimitsCensus,
} from '../../src/index.js';

const FILE = fileURLToPath(new URL('../../data/workLimits.json', import.meta.url));
const WORK = fileURLToPath(new URL('../../../../docs/build/M0-work.json', import.meta.url));
const TEXT = readFileSync(FILE, 'utf8');
const PLACEHOLDER = 'architecture 2026-10-03 placeholder';

type RawCell = { value: unknown; unit: string; provenance: string; calibratable: boolean; note?: string };
type RawTable = { table: string; version: number; section: string; rows: Record<string, Record<string, RawCell>> };

/** A fresh copy of the shipped file. */
function raw(): RawTable {
  return JSON.parse(TEXT) as RawTable;
}

/** The M0-work.json counter list (the authority, C-0021). */
function workList(): { counter: string; unit: string; log2?: boolean }[] {
  const w = JSON.parse(readFileSync(WORK, 'utf8')) as { workLimitCounters: { counters: { counter: string; unit: string; log2?: boolean }[] } };
  return w.workLimitCounters.counters;
}

function refusal(f: () => unknown): TableError {
  try {
    f();
  } catch (e) {
    expect(e).toBeInstanceOf(TableError);
    return e as TableError;
  }
  throw new Error('no refusal');
}

describe('one row per counter of M0-work.json’s list', () => {
  it('the list constant is M0-work.json’s list: counters, units and the log2 form, in its order', () => {
    const list = workList();
    expect(WORK_LIMIT_COUNTERS.map((s) => s.counter)).toEqual(list.map((c) => c.counter));
    for (const [i, s] of WORK_LIMIT_COUNTERS.entries()) {
      expect(s.unit, s.counter).toBe(list[i].unit);
      expect(s.log2 === true, s.counter).toBe(list[i].log2 === true);
    }
    expect(WORK_LIMIT_COUNTERS).toHaveLength(17);
  });

  it('the shipped table holds exactly one row per listed counter, with the list’s unit and log2 form', () => {
    const t = loadWorkLimits();
    const list = workList();
    expect([...t.table.rows.keys()]).toEqual(list.map((c) => c.counter).sort());
    for (const c of list) {
      const law = t.law(c.counter);
      expect(law.unit, c.counter).toBe(c.unit);
      expect('log2' in law && law.log2 === true, c.counter).toBe(c.log2 === true);
    }
    expect(t.laws.map((l) => l.counter)).toEqual([...t.table.rows.keys()]);
    expect(t.table.id).toBe(WORK_LIMITS_TABLE);
    expect(t.table.section).toBe('§5.1 (5)');
    expect(loadWorkLimits()).toBe(t);
  });

  it('the file’s text holds no key twice and loads to the same table', () => {
    expect(duplicateKeys(TEXT)).toEqual([]);
    expect(parseWorkLimitsText(TEXT).table.hash).toEqual(loadWorkLimits().table.hash);
  });

  it('a missing counter fails the loader, naming it', () => {
    for (const s of WORK_LIMIT_COUNTERS) {
      const r = raw();
      delete r.rows[s.counter];
      const e = refusal(() => parseWorkLimits(r));
      expect(e.issues).toEqual([{ table: 'workLimits', row: s.counter, reason: 'missing counter: the counter list names it (M0.md §2.2)' }]);
    }
  });

  it('a duplicate counter fails the loader, naming it', () => {
    const dup = TEXT.replace('    "index.rebuilds": {', '    "insert.points": {\n      "unit": {"value": "vertices", "unit": "none", "provenance": "own", "calibratable": false},\n      "perUnit": {"value": 1, "unit": "ratio", "provenance": "own", "calibratable": true},\n      "floor": {"value": 1, "unit": "count", "provenance": "own", "calibratable": true}\n    },\n    "index.rebuilds": {');
    expect(dup).not.toBe(TEXT);
    const e = refusal(() => parseWorkLimitsText(dup));
    expect(e.issues).toEqual([{ table: 'workLimits', row: 'insert.points', reason: 'duplicate counter: the file holds its row twice' }]);
    expect(e.message).toBe("table 'workLimits', row 'insert.points': duplicate counter: the file holds its row twice");
  });

  it('a duplicate cell, a duplicate top field and a text that is not JSON fail the loader', () => {
    const cell = TEXT.replace('"floor": {"value": 64, "unit": "count"', '"floor": {"value": 1, "unit": "count", "provenance": "own", "calibratable": true}, "floor": {"value": 64, "unit": "count"');
    expect(refusal(() => parseWorkLimitsText(cell)).issues).toEqual([{ table: 'workLimits', row: 'skeleton.events', cell: 'floor', reason: 'duplicate cell' }]);
    const top = TEXT.replace('"version": 1,', '"version": 1,\n  "version": 2,');
    expect(refusal(() => parseWorkLimitsText(top)).issues).toEqual([{ table: 'workLimits', reason: "duplicate key 'version'" }]);
    expect(refusal(() => parseWorkLimitsText(TEXT.slice(0, 40))).reason).toMatch(/^not JSON: /);
  });

  it('a counter beyond the list is admitted in the list’s row form (C-0174 (3)); the list test above pins the file to M0-work.json', () => {
    const r = raw();
    r.rows['plan.pieces'] = {
      unit: { value: 'moduleCells', unit: 'none', provenance: 'architecture 2026-10-03', calibratable: false },
      perUnit: { value: 2, unit: 'ratio', provenance: PLACEHOLDER, calibratable: true },
      floor: { value: 64, unit: 'count', provenance: PLACEHOLDER, calibratable: true },
    };
    const t = parseWorkLimits(r);
    expect(t.law('plan.pieces')).toEqual({ counter: 'plan.pieces', unit: 'moduleCells', perUnit: 2, floor: 64 });
    expect(t.laws).toHaveLength(18);
  });
});

describe('the placeholder laws (C-0021)', () => {
  it('placeholder provenance is present on every row, on each calibratable cell', () => {
    const t = loadWorkLimits();
    for (const [rk, row] of t.table.rows) {
      const placeholders = [...row.values()].filter((c) => c.provenance === PLACEHOLDER);
      expect(placeholders.length, rk).toBeGreaterThan(0);
      for (const [ck, c] of row) {
        if (c.calibratable) expect(c.provenance, `${rk}/${ck}`).toBe(PLACEHOLDER);
        expect(provenanceForm(c.provenance), `${rk}/${ck}`).toBe('architecture');
      }
      expect(row.get('floor')?.provenance, rk).toBe(PLACEHOLDER);
      expect(row.get('floor')?.calibratable, rk).toBe(true);
    }
  });

  it('every cell carries unit, provenance and calibratable in the raw file', () => {
    for (const [rk, row] of Object.entries(raw().rows)) {
      for (const [ck, c] of Object.entries(row)) {
        expect(typeof c.unit, `${rk}/${ck}`).toBe('string');
        expect(typeof c.provenance, `${rk}/${ck}`).toBe('string');
        expect(typeof c.calibratable, `${rk}/${ck}`).toBe('boolean');
      }
    }
  });

  it('the coefficients are calibratable and the structure is not; perUnit in ratio or perHa, floor in count', () => {
    const t = loadWorkLimits();
    for (const l of t.laws) {
      const row = t.table.row(l.counter);
      expect(row.get('unit')?.calibratable, l.counter).toBe(false);
      expect(row.get('log2')?.calibratable ?? false, l.counter).toBe(false);
      expect(row.get('perUnit')?.calibratable, l.counter).toBe(l.unit !== 'fixed');
      expect(row.get('perUnit')?.unit, l.counter).toBe(l.unit === 'landHa' ? 'perHa' : 'ratio');
      expect(row.get('floor')?.unit, l.counter).toBe('count');
      expect(l.perUnit, l.counter).toBeGreaterThanOrEqual(0);
      expect(l.floor, l.counter).toBeGreaterThanOrEqual(0);
    }
  });

  it('the census lists the calibratable cells (C-0070): 33 — every floor and every counting law’s perUnit', () => {
    const census = workLimitsCensus();
    expect(census).toHaveLength(33);
    expect(new Set(census).size).toBe(33);
    for (const s of WORK_LIMIT_COUNTERS) {
      expect(census.includes(`workLimits/${s.counter}/floor`), s.counter).toBe(true);
      expect(census.includes(`workLimits/${s.counter}/perUnit`), s.counter).toBe(s.unit !== 'fixed');
    }
    expect(census).toEqual([...census].sort());
  });

  it('skeleton.events never undercuts §3.8’s 4(n + r) + 64 (r ≤ n), and warp.halvings is the fixed 8 of §3.6', () => {
    const t = loadWorkLimits();
    const sk = t.law('skeleton.events');
    expect(sk.unit).toBe('vertices');
    for (const n of [0, 3, 4, 100, 10_000]) expect(sk.floor + sk.perUnit * n).toBeGreaterThanOrEqual(4 * (n + n) + 64);
    expect(t.law('warp.halvings')).toEqual({ counter: 'warp.halvings', unit: 'fixed', perUnit: 0, floor: 8 });
  });

  it('is pinned at its version: version 1 hashes to the pin; a higher version is a declared change', () => {
    const PIN = { version: 1, sha256: '87de920b6b2e88cae44d162b4f0cffc5434b038888b27c2c30e4ac8da842b9e5' };
    const version = raw().version;
    expect(version).toBeGreaterThanOrEqual(PIN.version);
    const sha = createHash('sha256').update(readFileSync(FILE)).digest('hex');
    if (version === PIN.version) expect(sha, 'workLimits.json changed without a version bump').toBe(PIN.sha256);
    else console.info(`workLimits.json: version ${version} past the pin ${PIN.version} — a declared change (sha256 ${sha})`);
  });
});

describe('the law form is refused when malformed, naming the row and the cell', () => {
  const cases: [string, (r: RawTable) => void, { row?: string; cell?: string; reason: string }][] = [
    ['an unknown cell', (r) => (r.rows['insert.points'].extra = { value: 1, unit: 'count', provenance: 'own', calibratable: false }), { row: 'insert.points', cell: 'extra', reason: "unknown cell 'extra': a law row has unit, perUnit, floor and log2" }],
    ['a missing unit', (r) => delete r.rows['insert.points'].unit, { row: 'insert.points', cell: 'unit', reason: 'lacks unit' }],
    ['a missing perUnit', (r) => delete r.rows['tx.facesWalked'].perUnit, { row: 'tx.facesWalked', cell: 'perUnit', reason: 'lacks perUnit' }],
    ['a missing floor', (r) => delete r.rows['route.nodes'].floor, { row: 'route.nodes', cell: 'floor', reason: 'lacks floor' }],
    ['a unit outside WorkUnit', (r) => (r.rows['field.cells'].unit.value = 'pixels'), { row: 'field.cells', cell: 'unit', reason: "unit 'pixels' is not a WorkUnit of §5.1 (5) nor 'fixed'" }],
    ['a unit departing from the list', (r) => (r.rows['field.cells'].unit.value = 'faces'), { row: 'field.cells', cell: 'unit', reason: "the counter list gives 'field.cells' the unit 'frameCells', not 'faces'" }],
    ['a negative perUnit', (r) => (r.rows['cut.candidates'].perUnit.value = -1), { row: 'cut.candidates', cell: 'perUnit', reason: 'perUnit must be a number ≥ 0' }],
    ['a key as perUnit', (r) => (r.rows['cut.candidates'].perUnit.value = 'many'), { row: 'cut.candidates', cell: 'perUnit', reason: 'perUnit must be a number ≥ 0' }],
    ['a negative floor', (r) => (r.rows['grower.turns'].floor.value = -8), { row: 'grower.turns', cell: 'floor', reason: 'floor must be a number ≥ 0' }],
    ['a perUnit in the wrong unit', (r) => (r.rows['growth.proposals'].perUnit.unit = 'ratio'), { row: 'growth.proposals', cell: 'perUnit', reason: "perUnit's unit must be 'perHa', not 'ratio'" }],
    ['a floor in the wrong unit', (r) => (r.rows['hydro.cells'].floor.unit = 'ratio'), { row: 'hydro.cells', cell: 'floor', reason: "floor's unit must be 'count', not 'ratio'" }],
    ['a log2 the list does not give', (r) => (r.rows['cut.candidates'].log2 = { value: true, unit: 'none', provenance: 'own', calibratable: false }), { row: 'cut.candidates', cell: 'log2', reason: "the counter list gives 'cut.candidates' no log2 form" }],
    ['a log2 the list gives, dropped', (r) => delete r.rows['cut.recursionDepth'].log2, { row: 'cut.recursionDepth', cell: 'log2', reason: "the counter list gives 'cut.recursionDepth' the log2 form" }],
    ['a log2 that is not a flag', (r) => (r.rows['cut.recursionDepth'].log2.value = 'yes'), { row: 'cut.recursionDepth', cell: 'log2', reason: 'log2 must be a flag' }],
    ['a fixed law that counts', (r) => (r.rows['warp.halvings'].perUnit.value = 1), { row: 'warp.halvings', cell: 'perUnit', reason: 'a fixed law counts nothing: perUnit must be 0' }],
  ];
  for (const [name, mutate, want] of cases) {
    it(name, () => {
      const r = raw();
      mutate(r);
      const e = refusal(() => parseWorkLimits(r));
      expect(e.issues[0]).toEqual({ table: 'workLimits', ...want });
    });
  }

  it('a fixed law with a log2 form is refused', () => {
    const t = parseTable('workLimits', {
      table: 'workLimits',
      version: 1,
      section: '§5.1 (5)',
      rows: {
        w: {
          unit: { value: 'fixed', unit: 'none', provenance: 'own', calibratable: false },
          log2: { value: true, unit: 'none', provenance: 'own', calibratable: false },
          perUnit: { value: 0, unit: 'ratio', provenance: 'own', calibratable: false },
          floor: { value: 8, unit: 'count', provenance: 'own', calibratable: true },
        },
      },
    });
    expect(checkWorkLimits(t, [])).toEqual([{ table: 'workLimits', row: 'w', cell: 'log2', reason: 'a fixed law takes no log2 form' }]);
  });

  it('the cell check (C-0153) runs first: an empty cell or a provenance outside §17.1 (6) is refused', () => {
    const r = raw();
    r.rows['insert.points'].floor.provenance = 'a guess';
    expect(refusal(() => parseWorkLimits(r)).issues[0]).toEqual({ table: 'workLimits', row: 'insert.points', cell: 'floor', reason: "provenance 'a guess' is outside §17.1 (6)'s forms" });
    const s = raw();
    (s.rows['insert.points'].floor as { value: unknown }).value = null;
    expect(refusal(() => parseWorkLimits(s)).issues[0]).toEqual({ table: 'workLimits', row: 'insert.points', cell: 'floor', reason: 'empty cell: no value' });
  });

  it('a counter list naming a counter twice is refused', () => {
    expect(checkWorkLimits(loadWorkLimits().table, [...WORK_LIMIT_COUNTERS, WORK_LIMIT_COUNTERS[0]])).toEqual([
      { table: 'workLimits', row: 'insert.points', reason: "the counter list names 'insert.points' twice" },
    ]);
  });

  it('law(counter) refuses a counter the table lacks; the laws are frozen', () => {
    const t = loadWorkLimits();
    expect(t.has('nope')).toBe(false);
    expect(refusal(() => t.law('nope')).message).toBe("table 'workLimits', row 'nope': no such counter");
    expect(Object.isFrozen(t.laws)).toBe(true);
    for (const l of t.laws) expect(Object.isFrozen(l)).toBe(true);
  });
});

describe('duplicateKeys: the text scan', () => {
  it('finds a key twice at any depth, with its path, and only there', () => {
    expect(duplicateKeys('{"a": 1, "b": {"c": 1, "c": 2}, "a": 3}')).toEqual([
      { path: ['b'], key: 'c' },
      { path: [], key: 'a' },
    ]);
    expect(duplicateKeys('[{"k": 1}, {"k": 2}, [{"x": 0, "x": 1}]]')).toEqual([{ path: ['2', '0'], key: 'x' }]);
    expect(duplicateKeys('{"q\\"": 1, "q\\u0022": 2, "s": "\\\\", "t": "{\\"a\\": 1, \\"a\\": 2}"}')).toEqual([{ path: [], key: 'q"' }]);
    expect(duplicateKeys('{"a": [1, 2, 3], "b": "a", "c": {"a": "a"}}')).toEqual([]);
    expect(() => duplicateKeys('{"a": ')).toThrow(SyntaxError);
  });
});

describe('the unit vocabulary', () => {
  it('WORK_UNITS is §5.1 (5)’s WorkUnit, every member once', () => {
    expectTypeOf<(typeof WORK_UNITS)[number]>().toEqualTypeOf<WorkUnit>();
    expect(new Set(WORK_UNITS).size).toBe(WORK_UNITS.length);
    expect(WORK_UNITS).toEqual(['plots', 'buildings', 'households', 'landHa', 'frameCells', 'latticeNodes', 'faces', 'vertices', 'moduleCells']);
  });
});
