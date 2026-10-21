// M0-s-02: the loader (§7.6) — every shipped table loads; a malformed file is refused naming the table, the row and the
// cell; the typed accessors refuse a cell of the wrong kind; §7.6's TableView (version, get, rows, slice, hash) and its
// pinning hash, which covers value, unit, calibratable, extension and presets and never the provenance block.
import { H128, utf8Bytes } from '@plat/kernel';
import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  cellPinning,
  checkTable,
  loadTable,
  parseTable,
  rowPinning,
  rungProfile,
  TABLE_IDS,
  TABLE_SOURCES,
  tableView,
  isTableId,
  type M0TableId,
  type Table,
} from '../../src/index.js';
import { deepCopy, ONE_CELL, refusal } from './support.js';

describe('every shipped table loads', () => {
  for (const id of TABLE_IDS) {
    it(`loads ${id}`, () => {
      const t = loadTable(id);
      expect(t.id).toBe(id);
      expect(Number.isInteger(t.version) && t.version >= 1).toBe(true);
      expect(t.section).toMatch(/^§\d/);
      expect(t.rows.size).toBeGreaterThan(0);
      expect(checkTable(id, TABLE_SOURCES.get(id))).toEqual([]);
      expect(loadTable(id)).toBe(t);
    });
  }

  it('reads rows and cells in key order, whatever the file order', () => {
    const raw = deepCopy(ONE_CELL) as { rows: Record<string, unknown> };
    raw.rows = { '2': raw.rows.r, b: raw.rows.r, a: raw.rows.r, '10': raw.rows.r };
    const t = parseTable('t', raw);
    expect([...t.rows.keys()]).toEqual(['10', '2', 'a', 'b']);
  });

  it('lists the thirteen ids once, typed as the literal tuple, and the sources in their order', () => {
    type Ids = readonly ['ladder', 'granularity', 'faces', 'regimes', 'ways', 'cut', 'interior', 'walls', 'lattice', 'district', 'fields', 'bands', 'terrain'];
    expectTypeOf(TABLE_IDS).toEqualTypeOf<Ids>();
    expectTypeOf<M0TableId>().toEqualTypeOf<Ids[number]>();
    expectTypeOf(TABLE_SOURCES).toEqualTypeOf<ReadonlyMap<M0TableId, unknown>>();
    expect([...TABLE_SOURCES.keys()]).toEqual([...TABLE_IDS]);
    for (const id of TABLE_IDS) expect((TABLE_SOURCES.get(id) as { table: string }).table).toBe(id);
  });

  it('refuses an unknown table id', () => {
    expect(isTableId('nope')).toBe(false);
    expect(refusal(() => loadTable('nope')).message).toBe("table 'nope': no such table in @plat/tables");
  });
});

describe('a malformed table file is refused, naming where', () => {
  const cases: [string, (raw: Record<string, unknown>) => void, string][] = [
    ['a file naming another table', (r) => (r.table = 'u'), "the file names table 'u', not 't'"],
    ['version 0', (r) => (r.version = 0), 'version must be a positive integer'],
    ['a fractional version', (r) => (r.version = 1.5), 'version must be a positive integer'],
    ['no section', (r) => delete r.section, 'section must name the design section'],
    ['a blank section', (r) => (r.section = '  '), 'section must name the design section'],
    ['no rows', (r) => delete r.rows, 'empty table: no rows'],
    ['an unknown top field', (r) => (r.extra = 1), "unknown field 'extra'"],
  ];
  for (const [what, mutate, reason] of cases) {
    it(`refuses ${what}`, () => {
      const raw = deepCopy(ONE_CELL) as Record<string, unknown>;
      mutate(raw);
      const e = refusal(() => parseTable('t', raw));
      expect(e.table).toBe('t');
      expect(e.reason).toBe(reason);
    });
  }

  it('builds each issue with its keys in order, an absent key left absent, never undefined', () => {
    const keys = (f: () => unknown): string[] => Object.keys(refusal(f).issues[0]);
    const raw = deepCopy(ONE_CELL) as { rows: Record<string, unknown> };
    raw.rows.r = {};
    expect(keys(() => parseTable('t', raw))).toEqual(['table', 'row', 'reason']);
    expect(keys(() => parseTable('t', { ...ONE_CELL, rows: { r: { c: { value: 1 } } } }))).toEqual(['table', 'row', 'cell', 'reason']);
    expect(keys(() => parseTable('t', [1]))).toEqual(['table', 'reason']);
    expect(keys(() => loadTable('nope'))).toEqual(['table', 'reason']);
    const t = loadTable('cut');
    expect(keys(() => t.row('nope'))).toEqual(['table', 'row', 'reason']);
    expect(keys(() => t.num('settings', 'bendMode'))).toEqual(['table', 'row', 'cell', 'reason']);
    expect(keys(() => tableView(['cut']).table('ways'))).toEqual(['table', 'reason']);
    expect(keys(() => rungProfile('THORP'))).toEqual(['table', 'row', 'reason']);
    expect(keys(() => rungProfile('TOWN', t))).toEqual(['table', 'reason']);
    expect(JSON.stringify(refusal(() => t.row('nope')).issues)).toBe('[{"table":"cut","row":"nope","reason":"no such row"}]');
  });

  it('refuses a file that is not an object', () => {
    expect(refusal(() => parseTable('t', [1])).reason).toBe('a table file must be a JSON object');
  });

  it('refuses a row key or cell key that is not a stable key', () => {
    const raw = deepCopy(ONE_CELL) as { rows: Record<string, Record<string, unknown>> };
    raw.rows['bad key'] = { c: raw.rows.r.c };
    expect(refusal(() => parseTable('t', raw)).reason).toBe("row key 'bad key' is not a stable key");
    const raw2 = deepCopy(ONE_CELL) as { rows: Record<string, Record<string, unknown>> };
    raw2.rows.r['1c'] = raw2.rows.r.c;
    const e = refusal(() => parseTable('t', raw2));
    expect([e.row, e.cell, e.reason]).toEqual(['r', '1c', "cell key '1c' is not a stable key"]);
  });

  it("refuses a '/' in a row key, a cell key and a key value — the slice key's separator is never part of a key (L22, N6)", () => {
    const row = deepCopy(ONE_CELL) as { rows: Record<string, Record<string, unknown>> };
    row.rows['a/b'] = { c: row.rows.r.c };
    const er = refusal(() => parseTable('t', row));
    expect([er.row, er.cell, er.reason]).toEqual(['a/b', undefined, "row key 'a/b' is not a stable key"]);
    const cellKey = deepCopy(ONE_CELL) as { rows: Record<string, Record<string, unknown>> };
    cellKey.rows.r['a/b'] = cellKey.rows.r.c;
    const ec = refusal(() => parseTable('t', cellKey));
    expect([ec.row, ec.cell, ec.reason]).toEqual(['r', 'a/b', "cell key 'a/b' is not a stable key"]);
    const value = deepCopy(ONE_CELL) as { rows: { r: { c: Record<string, unknown> } } };
    value.rows.r.c = { value: 'a/b', unit: 'none', provenance: 'own', calibratable: false };
    const ev = refusal(() => parseTable('t', value));
    expect([ev.row, ev.cell, ev.reason]).toEqual(['r', 'c', "value 'a/b' is not one of our own keys"]);
    value.rows.r.c.value = ['ok', 'a/b'];
    expect(refusal(() => parseTable('t', value)).reason).toBe("value 'a/b' is not one of our own keys");
  });

  it('gives a TableError no own row or cell key it does not name — absent, never undefined, as its issues (L22, N4)', () => {
    const table = refusal(() => loadTable('nope'));
    expect(Object.keys(table).filter((k) => k === 'row' || k === 'cell')).toEqual([]);
    expect(['row' in table, 'cell' in table]).toEqual([false, false]);
    const t = loadTable('cut');
    const row = refusal(() => t.row('nope'));
    expect([Object.hasOwn(row, 'row'), 'cell' in row, row.row]).toEqual([true, false, 'nope']);
    const cell = refusal(() => t.num('settings', 'bendMode'));
    expect([Object.hasOwn(cell, 'row'), Object.hasOwn(cell, 'cell'), cell.row, cell.cell]).toEqual([true, true, 'settings', 'bendMode']);
    expect(JSON.parse(JSON.stringify({ ...table }))).toEqual({ name: 'TableError', table: 'nope', reason: 'no such table in @plat/tables', issues: [{ table: 'nope', reason: 'no such table in @plat/tables' }] });
  });
});

describe('the typed accessors', () => {
  const t = loadTable('cut');
  /** A cell's value as the raw file holds it. */
  const raw = (id: string, row: string, cell: string): unknown =>
    (TABLE_SOURCES.get(id as never) as { rows: Record<string, Record<string, { value: unknown }>> }).rows[row][cell].value;

  it('read numbers, ranges, keys and flags — each the raw file\'s value (derived, so a hand-over never edits this test)', () => {
    expect(typeof raw('cut', 'settings', 'flattenM')).toBe('number');
    expect(t.num('settings', 'flattenM')).toBe(raw('cut', 'settings', 'flattenM'));
    expect(t.pair('width', 'laneM')).toEqual(raw('cut', 'width', 'laneM'));
    expect(t.str('settings', 'bendMode')).toBe(raw('cut', 'settings', 'bendMode'));
    expect(typeof raw('regimes', 'dense_core', 'walled')).toBe('boolean');
    expect(loadTable('regimes').bool('dense_core', 'walled')).toBe(raw('regimes', 'dense_core', 'walled'));
    expect(loadTable('bands').strs('settings', 'order')).toEqual(['squalid', 'poor', 'modest', 'comfortable', 'prosperous', 'rich']);
  });

  it('refuse a missing row or cell, or a cell of the wrong kind, naming it', () => {
    expect(refusal(() => t.row('nope')).message).toBe("table 'cut', row 'nope': no such row");
    expect(refusal(() => t.cell('settings', 'nope')).message).toBe("table 'cut', row 'settings', cell 'nope': no such cell");
    expect(refusal(() => t.num('settings', 'bendMode')).reason).toBe('not a number');
    expect(refusal(() => t.str('settings', 'flattenM')).reason).toBe('not a key');
    expect(refusal(() => t.pair('settings', 'flattenM')).reason).toBe('not a list of numbers');
    expect(refusal(() => t.pair('settings', 'portalGapMinM')).reason).toBe('not a list of numbers');
    expect(refusal(() => t.bool('settings', 'flattenM')).reason).toBe('not a flag');
    expect(refusal(() => t.strs('width', 'laneM')).reason).toBe('not a list of keys');
    expect(t.has('settings', 'flattenM')).toBe(true);
    expect(t.has('settings', 'nope')).toBe(false);
    expect(t.has('nope')).toBe(false);
  });

  it('refuse a reversed range', () => {
    const raw = deepCopy(ONE_CELL) as { rows: { r: { c: { value: unknown } } } };
    raw.rows.r.c.value = [5, 3];
    expect(refusal(() => parseTable('t', raw).pair('r', 'c')).reason).toBe('not a range [lo, hi]');
  });

  it('hand out frozen values', () => {
    const v = t.value('width', 'laneM') as number[];
    expect(Object.isFrozen(v)).toBe(true);
    expect(Object.isFrozen(t)).toBe(true);
  });
});

describe("§7.6's TableView", () => {
  const view = tableView();

  it('gives the pinned version, the resolved rows and undefined for a missing key', () => {
    expect(view.version('cut')).toBe(String(loadTable('cut').version));
    expect(view.get('cut', 'settings')).toBe(loadTable('cut').rows.get('settings'));
    expect(view.get('cut', 'nope')).toBeUndefined();
    expect(view.rows('granularity')).toBe(loadTable('granularity').rows);
    expect(view.table('ladder')).toBe(loadTable('ladder'));
    expect(refusal(() => view.rows('nope')).message).toBe("table 'nope': not in this view");
  });

  it('fills a slice with its version and its hash, for a row and for one field of a row', () => {
    const row = view.slice('granularity', 'row', 'modest');
    expect(row).toMatchObject({ table: 'granularity', version: String(loadTable('granularity').version), kind: 'row', key: 'modest' });
    expect(row.hash).toHaveLength(2);
    expect(row.hash).toEqual(view.slice('granularity', 'row', 'modest').hash);
    expect(row.hash).not.toEqual(view.slice('granularity', 'row', 'poor').hash);
    const field = view.slice('granularity', 'row', 'modest/depthM');
    expect(field.key).toBe('modest/depthM');
    expect(field.hash).not.toEqual(row.hash);
    expect(field.hash).not.toEqual(view.slice('granularity', 'row', 'modest/frontageM').hash);
    expect(refusal(() => view.slice('granularity', 'row', 'modest/nope')).cell).toBe('nope');
  });

  it("hashes a slice in SliceRef's fixed forms: a row's pinning content; a field's key and its cell's (C-0157 (1))", () => {
    const t = loadTable('granularity');
    const lanes = (h: readonly number[]): number[] => [h[0], h[1]];
    expect(view.slice('granularity', 'row', 'modest').hash).toEqual(lanes(H128(utf8Bytes(rowPinning(t.row('modest'))))));
    expect(view.slice('granularity', 'row', 'modest/depthM').hash).toEqual(
      lanes(H128(utf8Bytes(`${JSON.stringify('modest/depthM')}:${cellPinning(t.cell('modest', 'depthM'))}`))),
    );
    // A row key holds no '/', so the first '/' parts the row from the cell: a longer key names a cell the row lacks.
    const e = refusal(() => view.slice('granularity', 'row', 'modest/depthM/x'));
    expect([e.row, e.cell, e.reason]).toEqual(['modest', 'depthM/x', 'no such cell']);
  });

  it('has one hash over its tables, which a view over other tables does not share', () => {
    expect(view.hash).toEqual(tableView().hash);
    expect(view.hash).toHaveLength(4);
    expect(tableView(['cut']).hash).not.toEqual(view.hash);
    expect(tableView(['cut', 'ways']).hash).not.toEqual(tableView(['ways', 'cut']).hash);
  });
});

describe("a package's own table registered in a view: carried, and covered by the view's hash (C-0416; e-04's N-s3c-3)", () => {
  /** A fixture of layout's `s6` (its shape: a key cell and a count per rung), `edits` ([row, cell, value]) applied. */
  const s6 = (edits: readonly (readonly [string, string, unknown])[] = [], version = 1): Table => {
    const rows: Record<string, Record<string, Record<string, unknown>>> = {
      edge: { minBarrierClass: { value: 'primary', unit: 'none', provenance: 'architecture 2026-09-25', calibratable: false } },
      roster: { 'buildings.CITY': { value: 600, unit: 'count', provenance: 'own', calibratable: true } },
    };
    for (const [r, c, v] of edits) rows[r][c] = { ...rows[r][c], value: v };
    return parseTable('s6', { table: 's6', version, section: '§4.5', rows });
  };

  it('carries the registered table after the shipped ones: its version, rows, slices and the table itself', () => {
    const t = s6();
    const v = tableView(TABLE_IDS, [t]);
    expect(v.table('s6')).toBe(t);
    expect(v.version('s6')).toBe('1');
    expect(v.get('s6', 'edge')).toBe(t.rows.get('edge'));
    expect(v.rows('s6')).toBe(t.rows);
    expect(v.slice('s6', 'row', 'roster/buildings.CITY')).toMatchObject({ table: 's6', version: '1', kind: 'row', key: 'roster/buildings.CITY' });
    expect(v.table('cut')).toBe(loadTable('cut'));
  });

  it('hashes two views that differ only in their s6 differently, and each apart from the view without it', () => {
    const plain = tableView().hash;
    const a = tableView(TABLE_IDS, [s6()]).hash;
    const b = tableView(TABLE_IDS, [s6([['roster', 'buildings.CITY', 100]])]).hash;
    const c = tableView(TABLE_IDS, [s6([['edge', 'minBarrierClass', 'secondary']])]).hash;
    const d = tableView(TABLE_IDS, [s6([], 2)]).hash;
    expect(new Set([plain, a, b, c, d].map((h) => h.join(','))).size).toBe(5);
    expect(tableView(TABLE_IDS, [s6()]).hash).toEqual(a);
    expect(tableView(TABLE_IDS, []).hash).toEqual(plain);
    const other = parseTable('u', { table: 'u', version: 1, section: '§4.5', rows: { r: { c: { value: 1, unit: 'm', provenance: 'own', calibratable: false } } } });
    expect(tableView(['cut'], [s6(), other]).hash).not.toEqual(tableView(['cut'], [other, s6()]).hash);
  });

  it("hashes the registered table in the view's one form, after the shipped ids: H128 of '⟨id⟩@⟨version⟩:⟨table hash⟩' lines", () => {
    const t = s6();
    const line = (x: Table): string => `${x.id}@${x.version}:${x.hash.join(',')}`;
    const lines = [...TABLE_IDS.map((id) => line(loadTable(id))), line(t)];
    expect(tableView(TABLE_IDS, [t]).hash).toEqual(H128(utf8Bytes(lines.join('\n'))));
    expect(tableView().hash).toEqual(H128(utf8Bytes(lines.slice(0, -1).join('\n'))));
  });

  it('refuses, naming it, a registered table that is no checked Table, one of the shipped ids, or an id the view carries', () => {
    const fake = { ...s6(), id: 's6' } as unknown as Table;
    expect(refusal(() => tableView(TABLE_IDS, [fake])).message).toBe("table 'registered[0]': a registered table must be a Table that parseTable checked");
    const cut = parseTable('cut', TABLE_SOURCES.get('cut'));
    expect(refusal(() => tableView([], [cut])).message).toBe("table 'cut': a shipped table is loaded by id, never registered");
    expect(refusal(() => tableView(TABLE_IDS, [s6(), s6([['roster', 'buildings.CITY', 1]])])).message).toBe("table 's6': registered twice in this view");
  });
});

describe("the pinning hash (§7.6): value, unit, calibratable, extension and presets — never provenance", () => {
  const base = (): { rows: { r: { c: Record<string, unknown> } } } & Record<string, unknown> => deepCopy(ONE_CELL) as never;
  const hashOf = (raw: unknown): Table['hash'] => parseTable('t', raw).hash;
  const h0 = hashOf(base());

  it('moves with a value, a unit, calibratable, an extension or a preset value', () => {
    const edits: ((c: Record<string, unknown>) => void)[] = [
      (c) => (c.value = 2),
      (c) => (c.unit = 'cm'),
      (c) => (c.calibratable = true),
      (c) => (c.extension = { over: 'both', mode: 'option' }),
      (c) => (c.presets = { MFCG: { value: 8, provenance: 'own' } }),
    ];
    for (const edit of edits) {
      const raw = base();
      edit(raw.rows.r.c);
      expect(hashOf(raw)).not.toEqual(h0);
    }
  });

  it('stays with a reworded provenance, a note, evidence or an owner rule, and with the version', () => {
    const edits: ((raw: ReturnType<typeof base>) => void)[] = [
      (r) => (r.rows.r.c.provenance = 'architecture 2026-09-25'),
      (r) => (r.rows.r.c.note = 'reworded'),
      (r) => (r.rows.r.c.evidence = ['B-1']),
      (r) => (r.rows.r.c.ownerRule = 'item 9'),
      (r) => (r.version = 2),
    ];
    for (const edit of edits) {
      const raw = base();
      edit(raw);
      expect(hashOf(raw)).toEqual(h0);
    }
  });

  it('moves with a preset value but not with its provenance', () => {
    const a = base();
    a.rows.r.c.presets = { MFCG: { value: 8, provenance: 'own' } };
    const b = base();
    b.rows.r.c.presets = { MFCG: { value: 8, provenance: 'owner' } };
    const c = base();
    c.rows.r.c.presets = { MFCG: { value: 9, provenance: 'own' } };
    expect(hashOf(a)).toEqual(hashOf(b));
    expect(hashOf(a)).not.toEqual(hashOf(c));
  });
});
