// M0-s-02: the cell check (§7.6; §13.7's JT; §2.1; §17.1 (6); C-0012) — an empty cell fails to load, a cell lacking
// unit, provenance or calibratable fails naming the table and the cell, a unit outside §2.1's list fails, a provenance
// outside §17.1 (6)'s forms fails; the unit list is §2.1's word for word, and the Unit type and §7.6's marker types
// are the literal unions the design writes (§2.1, §7.6).
import fc from 'fast-check';
import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  checkCell,
  parseTable,
  provenanceForm,
  UNITS,
  type ExtensionMode,
  type ExtensionOver,
  type PresetId,
  type ProvenanceForm,
  type TableError,
  type Unit,
} from '../../src/index.js';
import { oneCell, refusal } from '../loader/support.js';

const GOOD = { value: 3, unit: 'm', provenance: 'own', calibratable: false };
const AT = { table: 't', row: 'r', cell: 'c' };

/** The TableError parseTable throws on a raw table (a test failure when it loads). */
const refuseTable = (raw: unknown, id = 't'): TableError => refusal(() => parseTable(id, raw));

describe('JT: an empty cell fails to load (§4.7, §13.7)', () => {
  const empties: [string, unknown][] = [
    ['no value', { unit: 'm', provenance: 'own', calibratable: false }],
    ['a null value', { ...GOOD, value: null }],
    ['an empty string', { ...GOOD, value: '' }],
    ['an empty list', { ...GOOD, value: [] }],
    ['a list with an empty entry', { ...GOOD, value: [1, null] }],
    ['an empty object', {}],
    ['a null cell', null],
  ];
  for (const [what, cell] of empties) {
    it(`refuses ${what}, naming the table, the row and the cell`, () => {
      const e = refuseTable(oneCell(cell));
      expect(e.table).toBe('t');
      expect(e.row).toBe('r');
      expect(e.cell).toBe('c');
      expect(e.reason).toMatch(/^empty cell/);
      expect(e.message).toContain("table 't', row 'r', cell 'c': empty cell");
    });
  }

  it('refuses an empty row and an empty table', () => {
    expect(refuseTable({ table: 't', version: 1, section: '§4.6', rows: { r: {} } }).reason).toBe('empty row: no cells');
    expect(refuseTable({ table: 't', version: 1, section: '§4.6', rows: {} }).reason).toBe('empty table: no rows');
  });

  it('loads the same cell with a value', () => {
    expect(parseTable('t', oneCell(GOOD)).num('r', 'c')).toBe(3);
  });
});

describe('a cell lacking unit / provenance / calibratable fails naming the table and the cell', () => {
  for (const field of ['unit', 'provenance', 'calibratable'] as const) {
    it(`lacking ${field}`, () => {
      const cell: Record<string, unknown> = { ...GOOD };
      delete cell[field];
      const e = refuseTable({ table: 'cut', version: 1, section: '§4.6', rows: { settings: { flattenM: cell } } }, 'cut');
      expect(e.table).toBe('cut');
      expect(e.row).toBe('settings');
      expect(e.cell).toBe('flattenM');
      expect(e.reason).toBe(`lacks ${field}`);
      expect(e.message).toBe(`table 'cut', row 'settings', cell 'flattenM': lacks ${field}`);
    });
  }

  it('lists every issue of a cell lacking all three, the first in the message', () => {
    const e = refuseTable(oneCell({ value: 1 }));
    expect(e.issues.map((i) => i.reason)).toEqual(['lacks unit', 'lacks provenance', 'lacks calibratable']);
    expect(e.message).toMatch(/\(and 2 more\)$/);
  });

  it('refuses a calibratable that is not a flag, an unknown field and a prose value', () => {
    expect(checkCell({ ...GOOD, calibratable: 'yes' }, AT).map((i) => i.reason)).toEqual(['calibratable must be true or false']);
    expect(checkCell({ ...GOOD, calibrateable: true }, AT).map((i) => i.reason)).toEqual(["unknown field 'calibrateable'"]);
    expect(checkCell({ ...GOOD, value: 'two words' }, AT).map((i) => i.reason)).toEqual(["value 'two words' is not one of our own keys"]);
    expect(checkCell({ ...GOOD, value: { a: 1 } }, AT).map((i) => i.reason)).toEqual([
      'value must be a number, a key, a flag or a list of them',
    ]);
  });

  it("property: dropping any one required field of a good cell is refused naming that field", () => {
    fc.assert(
      fc.property(
        fc.constantFrom('unit', 'provenance', 'calibratable'),
        fc.oneof(fc.double({ noNaN: true, noDefaultInfinity: true }), fc.boolean(), fc.constantFrom('flatten', 'BIG_TOWN')),
        fc.constantFrom(...UNITS),
        (drop, value, unit) => {
          const cell: Record<string, unknown> = { value, unit, provenance: 'architecture 2026-09-25', calibratable: true };
          if (checkCell(cell, AT).length !== 0) return false;
          delete cell[drop];
          const issues = checkCell(cell, AT);
          return issues.length === 1 && issues[0].reason === `lacks ${drop}` && issues[0].cell === 'c' && issues[0].table === 't';
        },
      ),
    );
  });
});

describe("the unit vocabulary is §2.1's list (N-18)", () => {
  it('pins the list word for word, perKm2 and per100m included', () => {
    expect(UNITS).toEqual([
      'm', 'm2', 'ha', 'cm', 'cdeg', 'deg', 'share', 'weight', 'people', 'count', 'yr', 'wk', 'm3', 'lvl',
      'perHa', 'perKm', 'perKm2', 'per100m', 'ratio', 'bits', 'ms', 's', 'luma', 'rb', 'chroma', 'z', 'none',
    ]);
  });

  it('derives the Unit type from the list: the same union of words', () => {
    expectTypeOf<Unit>().toEqualTypeOf<
      | 'm' | 'm2' | 'ha' | 'cm' | 'cdeg' | 'deg' | 'share' | 'weight' | 'people' | 'count' | 'yr' | 'wk' | 'm3' | 'lvl'
      | 'perHa' | 'perKm' | 'perKm2' | 'per100m' | 'ratio' | 'bits' | 'ms' | 's' | 'luma' | 'rb' | 'chroma' | 'z' | 'none'
    >();
    expectTypeOf(UNITS).toEqualTypeOf<readonly Unit[]>();
    expect(Object.isFrozen(UNITS)).toBe(true);
  });

  for (const unit of ['km2', 'km', 'metres', 'M', 'deg2', 'percent', 'points', '']) {
    it(`refuses the unit '${unit}'`, () => {
      const e = refuseTable(oneCell({ ...GOOD, unit }));
      expect(e.cell).toBe('c');
      expect(e.reason).toBe(`unit '${unit}' is outside §2.1's list`);
    });
  }

  it('property: a word outside the list is refused, every word of it accepted', () => {
    fc.assert(
      fc.property(fc.string(), (u) => {
        const issues = checkCell({ ...GOOD, unit: u }, AT);
        return (UNITS as readonly string[]).includes(u) ? issues.length === 0 : issues.length === 1;
      }),
    );
    for (const u of UNITS) expect(checkCell({ ...GOOD, unit: u }, AT)).toEqual([]);
  });
});

describe("provenance: §17.1 (6)'s forms and the build's two", () => {
  const accepted: [string, ProvenanceForm][] = [
    ['own', 'own'],
    ['owner', 'owner'],
    ['corpus', 'corpus'],
    ['host', 'host'],
    ['owner-eye M2b', 'owner-eye'],
    ['owner-eye M-CAL', 'owner-eye'],
    ['architecture 2026-09-25', 'architecture'],
    ['architecture 2026-10-03 placeholder', 'architecture'],
    ['general town defence practice', 'general'],
    ['sf:institutionLadders.js@5d699cc68', 'sf'],
    ['ref:FTG lifestyle distribution', 'ref'],
    ['ref:MFCG gate law', 'ref'],
    ['ref:FTG shanty rule', 'ref'],
    ['ref:NG 1.2.2 per-face stop threshold (code), P1', 'ref-code'],
    ['ref:MFCG 12710731 three pinned smoothing passes (code), P12', 'ref-code'],
    ['ref:NG 1.2.2 per-face stop threshold (code) P1', 'ref-code'],
    ['ref:VG 1.6.9 descriptive row (code), D3', 'ref-code'],
    ['M-1 2026-10-12', 'M-1'],
    ['M0 spike 2026-10-20', 'M0-spike'],
    ['architecture 2024-02-29', 'architecture'],
    ['architecture 2000-02-29', 'architecture'],
  ];
  for (const [p, form] of accepted) {
    it(`accepts '${p}' as ${form}`, () => {
      expect(provenanceForm(p)).toBe(form);
      expect(checkCell({ ...GOOD, provenance: p }, AT)).toEqual([]);
    });
  }

  const refused = [
    '',
    'Own',
    'own ',
    'measured',
    'architecture',
    'architecture 2026-13-01',
    'architecture 2026-02-30',
    'architecture 2023-02-29',
    'architecture 1900-02-29',
    'architecture 2026-09-25 draft',
    'ref:',
    'ref:XYZ some behaviour',
    'ref:MFCG',
    'ref:NG 1.2.2 per-face stop threshold (code)',
    'ref:NG per-face stop threshold (code), P1',
    'ref:NG 1.2.2 per-face stop threshold (code), P0',
    'owner-eye',
    'general',
    'sf:file',
    'M-1',
    'M-1 yesterday',
    'M0 spike',
    'research/findings/x.md',
  ];
  for (const p of refused) {
    it(`refuses '${p}', naming the table and the cell`, () => {
      expect(provenanceForm(p)).toBeNull();
      const e = refuseTable(oneCell({ ...GOOD, provenance: p }));
      expect(e.cell).toBe('c');
      expect(e.reason).toBe(`provenance '${p}' is outside §17.1 (6)'s forms`);
    });
  }

  it('refuses a provenance that is not text', () => {
    expect(provenanceForm(7)).toBeNull();
    expect(checkCell({ ...GOOD, provenance: 7 }, AT).map((i) => i.reason)).toEqual(["provenance '7' is outside §17.1 (6)'s forms"]);
  });
});

describe("the optional markers (§7.6): evidence, note, owner rule, extension, presets", () => {
  it('accepts them in their forms', () => {
    const cell = {
      ...GOOD,
      evidence: ['B-0001'],
      note: 'a note',
      ownerRule: 'item 31',
      extension: { over: 'both', mode: 'option' },
      presets: { MFCG: { value: 8, provenance: 'ref:MFCG 12710731 square test (code), P5' } },
    };
    expect(checkCell(cell, AT)).toEqual([]);
    const t = parseTable('t', oneCell(cell));
    expect(t.cell('r', 'c').presets?.MFCG?.value).toBe(8);
    expect(Object.isFrozen(t.cell('r', 'c'))).toBe(true);
  });

  it("types the markers with §7.6's words", () => {
    expectTypeOf<ExtensionOver>().toEqualTypeOf<'MFCG' | 'FTG' | 'VG' | 'FM' | 'both' | 'none'>();
    expectTypeOf<ExtensionMode>().toEqualTypeOf<'chance' | 'weight' | 'option'>();
    expectTypeOf<PresetId>().toEqualTypeOf<'MFCG' | 'FTG' | 'VG' | 'FM' | 'NG'>();
    const reasons = (extra: Record<string, unknown>): string[] => checkCell({ ...GOOD, ...extra }, AT).map((i) => i.reason);
    for (const over of ['MFCG', 'FTG', 'VG', 'FM', 'both', 'none']) {
      for (const mode of ['chance', 'weight', 'option']) expect(reasons({ extension: { over, mode } })).toEqual([]);
    }
    for (const id of ['MFCG', 'FTG', 'VG', 'FM', 'NG']) expect(reasons({ presets: { [id]: { value: 1, provenance: 'own' } } })).toEqual([]);
  });

  it('refuses them out of form', () => {
    const reasons = (extra: Record<string, unknown>): string[] => checkCell({ ...GOOD, ...extra }, AT).map((i) => i.reason);
    expect(reasons({ evidence: [] })).toEqual(['evidence must be a non-empty list of ids']);
    expect(reasons({ note: ' ' })).toEqual(['note must be non-empty text']);
    expect(reasons({ ownerRule: 3 })).toEqual(['ownerRule must be non-empty text']);
    expect(reasons({ extension: { over: 'MFCG' } })).toEqual(["extension must be { over, mode } with §7.6's values"]);
    expect(reasons({ extension: { over: 'NG', mode: 'option' } })).toEqual(["extension must be { over, mode } with §7.6's values"]);
    expect(reasons({ presets: {} })).toEqual(['presets must be a non-empty map of preset values']);
    expect(reasons({ presets: { XX: { value: 1, provenance: 'own' } } })).toEqual(["preset 'XX' is not a parity preset"]);
    expect(reasons({ presets: { MFCG: { value: 1 } } })).toEqual(["preset 'MFCG' must be { value, provenance }"]);
    expect(reasons({ presets: { FTG: { value: '', provenance: 'own' } } })).toEqual(["preset 'FTG': empty cell: the value is an empty string"]);
    expect(reasons({ presets: { FTG: { value: 1, provenance: 'measured' } } })).toEqual([
      "preset 'FTG': provenance 'measured' is outside §17.1 (6)'s forms",
    ]);
  });

  it("refuses a categorical option cell without its MFCG and FTG values (§7.6: it has no neutral value)", () => {
    const opt = { value: 'law', unit: 'none', provenance: 'owner', calibratable: false, extension: { over: 'both', mode: 'option' } };
    const reasons = (c: unknown): string[] => checkCell(c, AT).map((i) => i.reason);
    const need = (id: string): string => `a categorical option cell needs a '${id}' preset value (§7.6)`;
    expect(reasons(opt)).toEqual([need('MFCG'), need('FTG')]);
    expect(reasons({ ...opt, value: ['a', 'b'] })).toEqual([need('MFCG'), need('FTG')]);
    expect(reasons({ ...opt, presets: { MFCG: { value: 'never', provenance: 'own' } } })).toEqual([need('FTG')]);
    expect(reasons({ ...opt, presets: { MFCG: { value: 'never', provenance: 'own' }, FTG: { value: 'never', provenance: 'own' } } })).toEqual([]);
    // a number or a flag has its neutral value (0, off), and a key under a weight or a chance is not an option
    expect(reasons({ ...GOOD, extension: { over: 'both', mode: 'option' } })).toEqual([]);
    expect(reasons({ ...GOOD, value: true, extension: { over: 'both', mode: 'option' } })).toEqual([]);
    expect(reasons({ ...opt, extension: { over: 'both', mode: 'weight' } })).toEqual([]);
    const e = refuseTable(oneCell(opt));
    expect([e.table, e.row, e.cell, e.reason]).toEqual(['t', 'r', 'c', need('MFCG')]);
  });
});
