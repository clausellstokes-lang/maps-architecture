// The table-cell writer (M0-b-05; the listed test: "the table-cell writer changes only the named cells, bumps the version
// and sets the provenance; the file round-trips through M0-s-02's loader"; C-0117; §7.6). The tables are M0-s-02's
// shipped ones as the package imports them (in memory); the cells written are made up.
import { describe, expect, it } from 'vitest';
import { parseTable, TABLE_SOURCES } from '@plat/tables';
import cutText from '../../../packages/tables/data/cut.json?raw';
import granularityText from '../../../packages/tables/data/granularity.json?raw';
import regimesText from '../../../packages/tables/data/regimes.json?raw';
import { CellWriteRefusal, compactJson, readCellsFile, sameShape, tableText, writeCells, type RawTable } from '../../src/bentcut-ng/index.js';

const raw = (id: 'cut' | 'granularity' | 'regimes'): RawTable => TABLE_SOURCES.get(id) as RawTable;
const PROV = 'M-1 2026-10-04';

describe('writeCells(table, cells, provenance)', () => {
  it('changes only the named cells, bumps the version, sets the provenance, and round-trips through the loader', () => {
    const before = raw('granularity');
    const { raw: after, changes } = writeCells(before, [
      { row: 'modest', cell: 'depthM', value: [14, 22] },
      { row: 'rich', cell: 'depthM', value: [25, 41] },
    ], PROV);
    expect(after.version).toBe(before.version + 1);
    expect(changes).toEqual([
      { row: 'modest', cell: 'depthM', before: before.rows['modest']['depthM']['value'], after: [14, 22] },
      { row: 'rich', cell: 'depthM', before: before.rows['rich']['depthM']['value'], after: [25, 41] },
    ]);
    // Every other cell, row and field is as it was; the named cells differ in value and provenance alone.
    expect(Object.keys(after.rows)).toEqual(Object.keys(before.rows));
    for (const rk of Object.keys(before.rows)) {
      expect(Object.keys(after.rows[rk])).toEqual(Object.keys(before.rows[rk]));
      for (const ck of Object.keys(before.rows[rk])) {
        const named = (rk === 'modest' || rk === 'rich') && ck === 'depthM';
        if (!named) expect(after.rows[rk][ck]).toEqual(before.rows[rk][ck]);
        else expect(after.rows[rk][ck]).toEqual({ ...before.rows[rk][ck], value: rk === 'modest' ? [14, 22] : [25, 41], provenance: PROV });
      }
    }
    expect([after.table, after.section]).toEqual([before.table, before.section]);
    // The input is never mutated.
    expect(before.rows['modest']['depthM']['provenance']).not.toBe(PROV);
    // The written file round-trips through M0-s-02's loader: the cells read back, version 2, the hash moved.
    const t = parseTable('granularity', JSON.parse(tableText(after)));
    expect(t.version).toBe(before.version + 1);
    expect(t.pair('modest', 'depthM')).toEqual([14, 22]);
    expect(t.cell('modest', 'depthM').provenance).toBe(PROV);
    expect(t.pair('poor', 'depthM')).toEqual(parseTable('granularity', before).pair('poor', 'depthM'));
    expect(t.hash).not.toEqual(parseTable('granularity', before).hash);
  });

  it('the data files\' own layout: the shipped hand-over tables reproduce byte for byte; a written one differs in the edited lines and the version alone', () => {
    expect(tableText(raw('granularity'))).toBe(granularityText);
    expect(tableText(raw('regimes'))).toBe(regimesText);
    expect(tableText(raw('cut'))).toBe(cutText);
    const { raw: after } = writeCells(raw('cut'), [{ row: 'settings', cell: 'flattenM', value: 0.6 }], PROV);
    const a = cutText.split('\n');
    const b = tableText(after).split('\n');
    expect(b.length).toBe(a.length);
    const diff = a.map((l, i) => [i, l, b[i]] as const).filter(([, x, y]) => x !== y);
    expect(diff.map(([, x]) => x.trim().slice(0, 12))).toEqual(['"version": 1', '"flattenM": ']);
    expect(diff[1][2]).toContain('"value": 0.6');
    expect(diff[1][2]).toContain(`"provenance": "${PROV}"`);
    // The MFCG preset's value of the cell is kept.
    expect(diff[1][2]).toContain('"presets": {"MFCG": {"value": 8');
    // A table on top of a written one bumps again.
    expect(writeCells(after, [{ row: 'settings', cell: 'flattenM', value: 0.65 }], PROV).raw.version).toBe(3);
  });

  it('refuses a missing row or cell, a cell named twice, a non-calibratable cell, a value of another shape, a bad provenance, an empty list', () => {
    const g = raw('granularity');
    const refuse = (f: () => unknown, words: string): void => {
      expect(f).toThrow(CellWriteRefusal);
      expect(f).toThrow(words);
    };
    refuse(() => writeCells(g, [{ row: 'nope', cell: 'depthM', value: [1, 2] }], PROV), "row 'nope': no such row");
    refuse(() => writeCells(g, [{ row: 'modest', cell: 'nope', value: [1, 2] }], PROV), "cell 'nope': no such cell");
    refuse(() => writeCells(g, [{ row: 'modest', cell: 'depthM', value: [1, 2] }, { row: 'modest', cell: 'depthM', value: [3, 4] }], PROV), 'named twice');
    refuse(() => writeCells(raw('regimes'), [{ row: 'dense_core', cell: 'walled', value: false }], PROV), 'not calibratable');
    refuse(() => writeCells(g, [{ row: 'modest', cell: 'depthM', value: [1, 2, 3] }], PROV), 'another shape');
    refuse(() => writeCells(g, [{ row: 'modest', cell: 'depthM', value: 14 }], PROV), 'another shape');
    refuse(() => writeCells(g, [{ row: 'modest', cell: 'vacancyShare', value: 'x' }], PROV), 'another shape');
    refuse(() => writeCells(g, [{ row: 'modest', cell: 'depthM', value: [1, 2] }], 'M-1 yesterday'), 'outside §17.1 (6)');
    refuse(() => writeCells(g, [{ row: 'modest', cell: 'depthM', value: [1, 2] }], 'own', { form: 'M-1' }), 'not of the form M-1');
    refuse(() => writeCells(g, [], PROV), 'no cell to write');
    // A result the loader refuses (a range written upside down is a list of two numbers, which the loader takes): a
    // value whose list holds a non-finite number is refused by the shape check before the loader.
    refuse(() => writeCells(g, [{ row: 'modest', cell: 'depthM', value: [1, Number.NaN] }], PROV), 'another shape');
    expect(sameShape([1, 2], [3, 4])).toBe(true);
    expect(sameShape(0.7, 0.6)).toBe(true);
    expect(sameShape(true, false)).toBe(true);
    expect(sameShape('a', 'b')).toBe(true);
    expect(sameShape(1, '1')).toBe(false);
    expect(sameShape([1, 2], [1, '2'])).toBe(false);
  });

  it('reads a cells file and refuses anything else', () => {
    const ok = JSON.stringify({ schema: 'plat.table-cells/1', provenance: PROV, tables: { granularity: [{ row: 'modest', cell: 'depthM', value: [14, 22] }] } });
    expect(readCellsFile(ok, 'c.json', ['granularity', 'regimes'])).toEqual({ schema: 'plat.table-cells/1', provenance: PROV, tables: { granularity: [{ row: 'modest', cell: 'depthM', value: [14, 22] }] } });
    const bad = [
      'nope',
      JSON.stringify({ schema: 'x', provenance: PROV, tables: {} }),
      JSON.stringify({ schema: 'plat.table-cells/1', provenance: PROV, tables: {} }),
      JSON.stringify({ schema: 'plat.table-cells/1', provenance: PROV, tables: { cut: [{ row: 'settings', cell: 'flattenM', value: 1 }] } }),
      JSON.stringify({ schema: 'plat.table-cells/1', provenance: PROV, tables: { granularity: [{ row: 'modest', cell: 'depthM' }] } }),
      JSON.stringify({ schema: 'plat.table-cells/1', provenance: PROV, tables: { granularity: [] } }),
      JSON.stringify({ schema: 'plat.table-cells/1', provenance: 3, tables: { granularity: [{ row: 'modest', cell: 'depthM', value: [1, 2] }] } }),
      JSON.stringify({ schema: 'plat.table-cells/1', provenance: PROV, tables: { granularity: [{ row: 'modest', cell: 'depthM', value: [1, 2], extra: 1 }] } }),
      JSON.stringify({ schema: 'plat.table-cells/1', provenance: PROV, tables: { granularity: [{ row: 'modest', cell: 'depthM', value: [1, 2] }] }, more: 1 }),
    ];
    for (const b of bad) expect(typeof readCellsFile(b, 'c.json', ['granularity', 'regimes'])).toBe('string');
    expect(readCellsFile(bad[3], 'c.json', ['granularity', 'regimes'])).toContain("table 'cut' is not one this phase writes");
  });

  it('compactJson writes a cell on one line as the data files do', () => {
    expect(compactJson({ value: [2, 3], unit: 'm', provenance: 'own', calibratable: true })).toBe('{"value": [2, 3], "unit": "m", "provenance": "own", "calibratable": true}');
    expect(() => compactJson({ value: Number.POSITIVE_INFINITY })).toThrow(CellWriteRefusal);
  });
});
