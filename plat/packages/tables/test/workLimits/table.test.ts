// M0-f-03a: workLimits.json and its loader (§5.1 (5), §14; C-0021, C-0153, C-0174) — every counter of M0-work.json's
// list has exactly one row; a duplicate or a missing counter fails the loader; every cell carries unit, provenance (an
// admitted form) and calibratable, a counting law's coefficients are calibratable and the fixed row (`warp.halvings`) is
// pinned at every version (N-56 (4), C-0301, refining C-0174 (1)), while C-0021's placeholder provenance is pinned only
// at the PIN's version, so M0-f-03b's hand-over (spike provenance, a new version) meets these tests green (C-0162 (1)'s
// pattern, round build/M0-f-03a-fix-s3); the law form is refused when malformed; the file is pinned at its version (a
// changed cell is a declared change, the hand-over's writer bumping the version).
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
  type ProvenanceForm,
  type WorkLimitsTable,
  WORK_LIMIT_COUNTERS,
  WORK_LIMITS_TABLE,
  WORK_UNITS,
  workLimitsCensus,
} from '../../src/index.js';

const FILE = fileURLToPath(new URL('../../data/workLimits.json', import.meta.url));
const WORK = fileURLToPath(new URL('../../../../docs/build/M0-work.json', import.meta.url));
const TEXT = readFileSync(FILE, 'utf8');
const PLACEHOLDER = 'architecture 2026-10-03 placeholder';
/** The content pin (the golden form, C-0162 (1)): at this version the file hashes to `sha256`, and C-0021's placeholder
 *  forms are pinned; a higher version is M0-f-03b's declared change. */
const PIN = { version: 2, sha256: '8c5b12b4a9bea2d5571ba1e9e6986a5527de1affe9fe8fbc6fb76b1ccfc1591e' };

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
    // Anchored on skeleton.events' floor cell whatever its value, so M0-f-03b's rewritten coefficients keep the probe live.
    const cell = TEXT.replace(/("skeleton\.events": \{[^}]*\},[^}]*\},\s*)"floor": \{/, '$1"floor": {"value": 1, "unit": "count", "provenance": "own", "calibratable": true}, "floor": {');
    expect(cell).not.toBe(TEXT);
    expect(refusal(() => parseWorkLimitsText(cell)).issues).toEqual([{ table: 'workLimits', row: 'skeleton.events', cell: 'floor', reason: 'duplicate cell' }]);
    const top = TEXT.replace(/"version": (\d+),/, (m, v: string) => `${m}\n  "version": ${Number(v) + 1},`);
    expect(top).not.toBe(TEXT);
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

// ---- the placeholder laws, gated by the version (C-0162 (1)'s pattern; C-0309, round build/M0-f-03a-fix-s3, Q35) ---
// M0-f-03b's hand-over rewrites the counting rows' perUnit and floor from the spikes' p999 × 1.5 with provenance
// 'M0 spike ⟨date⟩' (calibratable kept; C-0021, C-0154 (1)) and bumps the version, and a run item edits no test
// (C-0115, C-0117). So the laws true at ANY version are asserted always — every cell carries unit, provenance and
// calibratable in an admitted form, a counting law's coefficients are calibratable, the fixed row `warp.halvings` is
// pinned (C-0301) — and C-0021's placeholder forms only while the file is at the PIN's version; past it the change is
// the run item's declared change, which the PIN test reports. The simulated hand-overs below prove both halves.

/** The provenance M0-f-03b's writer stamps (the form `M0 spike ⟨date⟩`; the date is the simulation's). */
const SPIKE = 'M0 spike 2026-10-20';

/**
 * The provenance forms a workLimits cell may take, read from the loader's own classifier (`provenanceForm`, C-0154 (1)):
 * the placeholder's form — `architecture ⟨date⟩ [placeholder]`, the structure's, the fixed law's and C-0021's — and the
 * spike form M0-f-03b writes. Any other admitted form of §17.1 (6) (`own`, `M-1 ⟨date⟩`, …) has no writer here.
 */
function admittedForms(): ReadonlySet<ProvenanceForm> {
  const placeholder = provenanceForm(PLACEHOLDER);
  const spike = provenanceForm(SPIKE);
  if (placeholder === null || spike === null || placeholder === spike) throw new Error('the loader no longer admits the placeholder and spike forms apart');
  return new Set([placeholder, spike]);
}
const ADMITTED = admittedForms();

/** Is the table at the PIN's version (C-0021's placeholder laws) rather than past it (M0-f-03b's declared change)? */
function atPin(t: WorkLimitsTable): boolean {
  return t.table.version === PIN.version;
}

/** The counting rows (every row whose unit is not `fixed`), in key order. */
function countingRows(r: RawTable): string[] {
  return Object.entries(r.rows)
    .filter(([, row]) => row.unit.value !== 'fixed')
    .map(([rk]) => rk);
}

/**
 * The file in its PIN-version form, rebuilt from the shipped rows at any version: the version set to the PIN's and every
 * counting row's perUnit and floor stamped with C-0021's placeholder (values kept). At the PIN version it is the shipped
 * file itself (the first test below proves it), so the simulations stay live after M0-f-03b's hand-over has landed.
 */
function pinForm(): RawTable {
  const r = raw();
  r.version = PIN.version;
  for (const rk of countingRows(r)) for (const ck of ['perUnit', 'floor'] as const) r.rows[rk][ck].provenance = PLACEHOLDER;
  return r;
}

/**
 * M0-f-03b's hand-over as its writer makes it (C-0021, C-0154 (1), C-0301 (3)): the version bumped past the PIN, each
 * named counting row's perUnit and floor multiplied by `scale` and stamped with the spike's provenance, calibratable
 * kept; the fixed row is never rewritten.
 */
function handOver(rows: readonly string[], scale: number, r: RawTable = pinForm()): RawTable {
  r.version += 1;
  for (const rk of rows) {
    for (const ck of ['perUnit', 'floor'] as const) {
      const c = r.rows[rk][ck];
      c.value = (c.value as number) * scale;
      c.provenance = SPIKE;
    }
  }
  return r;
}

/** Every cell carries unit, provenance and calibratable, read from the raw text's cells. */
function rawCells(r: RawTable): void {
  for (const [rk, row] of Object.entries(r.rows)) {
    for (const [ck, c] of Object.entries(row)) {
      expect(typeof c.unit, `${rk}/${ck}`).toBe('string');
      expect(typeof c.provenance, `${rk}/${ck}`).toBe('string');
      expect(typeof c.calibratable, `${rk}/${ck}`).toBe('boolean');
    }
  }
}

/** Every cell's provenance takes an admitted form (the placeholder's or the spike's), whatever the version. */
function admittedProvenance(t: WorkLimitsTable): void {
  for (const [rk, row] of t.table.rows) {
    for (const [ck, c] of row) {
      const form = provenanceForm(c.provenance);
      expect(form !== null && ADMITTED.has(form), `${rk}/${ck}: provenance '${c.provenance}' (${String(form)}) is not a workLimits form`).toBe(true);
    }
  }
}

/** A counting law's coefficients are calibratable, a fixed law's and the structure are not; perUnit in ratio or perHa, floor in count. */
function coefficients(t: WorkLimitsTable): void {
  for (const l of t.laws) {
    const row = t.table.row(l.counter);
    expect(row.get('unit')?.calibratable, l.counter).toBe(false);
    expect(row.get('log2')?.calibratable ?? false, l.counter).toBe(false);
    expect(row.get('perUnit')?.calibratable, l.counter).toBe(l.unit !== 'fixed');
    expect(row.get('floor')?.calibratable, l.counter).toBe(l.unit !== 'fixed');
    expect(row.get('perUnit')?.unit, l.counter).toBe(l.unit === 'landHa' ? 'perHa' : 'ratio');
    expect(row.get('floor')?.unit, l.counter).toBe('count');
    expect(l.perUnit, l.counter).toBeGreaterThanOrEqual(0);
    expect(l.floor, l.counter).toBeGreaterThanOrEqual(0);
  }
}

/**
 * The fixed row is pinned at every version (N-56 (4), C-0301): `warp.halvings` is the only fixed row, `{ fixed, 0, 8 }`
 * (§3.6's 8 halvings, the kernel's MAX_HALVINGS), its floor provenance `architecture 2026-10-03` and not calibratable,
 * no placeholder cell — M0-f-03b's p999 × 1.5 rewrite skips it.
 */
function fixedRow(t: WorkLimitsTable): void {
  expect([...t.table.rows].filter(([, row]) => row.get('unit')?.value === 'fixed').map(([rk]) => rk)).toEqual(['warp.halvings']);
  expect(t.law('warp.halvings')).toEqual({ counter: 'warp.halvings', unit: 'fixed', perUnit: 0, floor: 8 });
  const row = t.table.row('warp.halvings');
  expect(row.get('floor')?.provenance).toBe('architecture 2026-10-03');
  expect(row.get('floor')?.calibratable).toBe(false);
  expect(row.get('perUnit')?.calibratable).toBe(false);
  expect([...row.values()].filter((c) => c.provenance === PLACEHOLDER)).toEqual([]);
}

/** skeleton.events never undercuts §3.8's 4(n + r) + 64 (r ≤ n) — M0.md §2.2's floor, at every version. */
function skeletonLaw(t: WorkLimitsTable): void {
  const sk = t.law('skeleton.events');
  expect(sk.unit).toBe('vertices');
  for (const n of [0, 3, 4, 100, 10_000]) expect(sk.floor + sk.perUnit * n, `n = ${n}`).toBeGreaterThanOrEqual(4 * (n + n) + 64);
}

/** What holds at ANY version (C-0162 (1)): the raw file loads and every law above holds. Returns the loaded table. */
function invariants(r: RawTable): WorkLimitsTable {
  rawCells(r);
  const t = parseWorkLimits(r);
  admittedProvenance(t);
  coefficients(t);
  fixedRow(t);
  skeletonLaw(t);
  return t;
}

/** C-0021's placeholder forms — applied only while the file is at the PIN's version. */
function placeholderPins(t: WorkLimitsTable): void {
  const architecture = provenanceForm(PLACEHOLDER);
  for (const [rk, row] of t.table.rows) {
    const fixed = row.get('unit')?.value === 'fixed';
    const placeholders = [...row.values()].filter((c) => c.provenance === PLACEHOLDER);
    if (fixed) expect(placeholders, rk).toEqual([]);
    else expect(placeholders.length, rk).toBeGreaterThan(0);
    for (const [ck, c] of row) {
      if (c.calibratable) expect(c.provenance, `${rk}/${ck}`).toBe(PLACEHOLDER);
      expect(provenanceForm(c.provenance), `${rk}/${ck}`).toBe(architecture);
    }
    expect(row.get('floor')?.provenance, rk).toBe(fixed ? 'architecture 2026-10-03' : PLACEHOLDER);
    expect(row.get('floor')?.calibratable, rk).toBe(!fixed);
  }
}

describe('the placeholder laws (C-0021)', () => {
  it('at any version: every cell carries an admitted provenance form (the loader’s placeholder or spike form), the fixed row is pinned', () => {
    // N-56 (4) (2026-10-08): a fixed law's floor is the design's constant (§3.6's 8 halvings, the kernel's MAX_HALVINGS),
    // never a placeholder and never calibrated — M0-f-03b's p999 × 1.5 rewrite skips it.
    const t = invariants(raw());
    expect(t.table.hash).toEqual(loadWorkLimits().table.hash);
    if (atPin(t)) expect(pinForm(), 'at the PIN version the pin form is the shipped file').toEqual(raw());
    expect([...ADMITTED].sort()).toEqual([provenanceForm(PLACEHOLDER), provenanceForm(SPIKE)].sort());
  });

  it('at the PIN version: placeholder provenance is present on every counting row, on each calibratable cell; past it the pins are not applied', () => {
    const t = loadWorkLimits();
    expect(t.table.version).toBeGreaterThanOrEqual(PIN.version);
    if (atPin(t)) placeholderPins(t);
    else console.info(`workLimits.json: version ${t.table.version} past the pin ${PIN.version} — the placeholder pins are not applied (M0-f-03b's declared change)`);
  });

  it('every cell carries unit, provenance and calibratable in the raw file', () => {
    rawCells(raw());
  });

  it('a counting law’s coefficients are calibratable, a fixed law’s and the structure are not; perUnit in ratio or perHa, floor in count', () => {
    coefficients(loadWorkLimits());
  });

  it('the census lists the calibratable cells (C-0070): 32 — every counting law’s floor and perUnit, no fixed law’s cell', () => {
    // 33 → 32 at version 2 (N-56 (4)): `warp.halvings/floor` left the census when its metadata was pinned.
    const census = workLimitsCensus();
    expect(census).toHaveLength(32);
    expect(new Set(census).size).toBe(32);
    for (const s of WORK_LIMIT_COUNTERS) {
      expect(census.includes(`workLimits/${s.counter}/floor`), s.counter).toBe(s.unit !== 'fixed');
      expect(census.includes(`workLimits/${s.counter}/perUnit`), s.counter).toBe(s.unit !== 'fixed');
    }
    expect(census).toEqual([...census].sort());
  });

  it('skeleton.events never undercuts §3.8’s 4(n + r) + 64 (r ≤ n), and warp.halvings is the fixed 8 of §3.6', () => {
    const t = loadWorkLimits();
    skeletonLaw(t);
    fixedRow(t);
  });

  it('is pinned at its version: version 2 hashes to the pin; a higher version is a declared change', () => {
    // Re-recorded at version 2 (N-56 (4), round build/M0-f-03a-fix-s2, 2026-10-08): the one change is warp.halvings'
    // floor metadata — provenance 'architecture 2026-10-03', calibratable false, its note naming the kernel's
    // MAX_HALVINGS; every value is unchanged (floor 8). Version 1 hashed to 87de920b6b2e88ca…842b9e5. The PIN itself
    // sits at the top of the file, where the placeholder pins read its version (round build/M0-f-03a-fix-s3).
    const version = raw().version;
    expect(version).toBeGreaterThanOrEqual(PIN.version);
    const sha = createHash('sha256').update(readFileSync(FILE)).digest('hex');
    if (version === PIN.version) expect(sha, 'workLimits.json changed without a version bump').toBe(PIN.sha256);
    else console.info(`workLimits.json: version ${version} past the pin ${PIN.version} — a declared change (sha256 ${sha})`);
  });
});

describe('M0-f-03b’s hand-over, simulated (C-0162 (1)): the invariants hold past the PIN, the placeholder pins only at it', () => {
  const sims: [string, () => RawTable][] = [
    ['one counting row rewritten (insert.points, × 2, spike provenance)', () => handOver(['insert.points'], 2)],
    ['every counting row rewritten (× 1.5, spike provenance) — the whole hand-over; the fixed row kept', () => handOver(countingRows(raw()), 1.5)],
    ['every counting row’s provenance rewritten, values unchanged', () => handOver(countingRows(raw()), 1)],
  ];
  for (const [what, make] of sims) {
    it(`${what}: GREEN on the invariants, past the PIN, the placeholder pins not applied (they would refuse it)`, () => {
      const r = make();
      expect(r.version).toBe(PIN.version + 1);
      const t = invariants(r);
      expect(atPin(t)).toBe(false);
      expect(workLimitsCensus(t)).toEqual(workLimitsCensus());
      expect(() => placeholderPins(t), 'the placeholder pins would refuse the hand-over').toThrow();
    });
  }

  it('at the PIN version the placeholder pins apply: a counting cell off the placeholder is refused (no weakening at version 2)', () => {
    const control = invariants(pinForm());
    expect(atPin(control)).toBe(true);
    placeholderPins(control);
    for (const provenance of ['architecture 2026-10-03', SPIKE]) {
      for (const ck of ['perUnit', 'floor'] as const) {
        const r = pinForm();
        r.rows['grower.turns'][ck].provenance = provenance;
        const t = invariants(r);
        expect(atPin(t)).toBe(true);
        expect(() => placeholderPins(t), `grower.turns/${ck} = '${provenance}' at version ${PIN.version}`).toThrow();
      }
    }
  });

  it('a file that breaks an any-version law is refused, at the PIN version and past it', () => {
    const breaks: [string, (r: RawTable) => void][] = [
      ['the fixed row’s floor calibratable', (r) => (r.rows['warp.halvings'].floor.calibratable = true)],
      ['the fixed row’s floor stamped with the spike', (r) => (r.rows['warp.halvings'].floor.provenance = SPIKE)],
      ['the fixed row’s floor a placeholder', (r) => (r.rows['warp.halvings'].floor.provenance = PLACEHOLDER)],
      ['the fixed row’s floor below 8', (r) => (r.rows['warp.halvings'].floor.value = 4)],
      ['a second fixed row', (r) => {
        r.rows['index.rebuilds'].unit.value = 'fixed';
        r.rows['index.rebuilds'].perUnit.value = 0;
      }],
      ['a counting floor not calibratable', (r) => (r.rows['route.nodes'].floor.calibratable = false)],
      ['a counting perUnit not calibratable', (r) => (r.rows['route.nodes'].perUnit.calibratable = false)],
      ['a coefficient in the form own', (r) => (r.rows['cut.candidates'].perUnit.provenance = 'own')],
      ['a coefficient in the form M-1 ⟨date⟩', (r) => (r.rows['cut.candidates'].floor.provenance = 'M-1 2026-10-20')],
      ['a structure cell in a ref form', (r) => (r.rows['hydro.cells'].unit.provenance = 'ref:FTG lifestyle distribution')],
      ['skeleton.events under §3.8’s law', (r) => (r.rows['skeleton.events'].perUnit.value = 4)],
    ];
    for (const [what, wreck] of breaks) {
      for (const [at, make] of [
        [`at version ${PIN.version}`, pinForm],
        [`past the PIN (version ${PIN.version + 1})`, () => handOver(['insert.points'], 2)],
      ] as const) {
        const r = make();
        expect(() => invariants(r), `control ${at}`).not.toThrow();
        wreck(r);
        expect(() => invariants(r), `${what}, ${at}`).toThrow();
      }
    }
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
