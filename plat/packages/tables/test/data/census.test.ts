// M0-s-02: the calibratable census (C-0070) — every calibratable cell listed by table and key, a snapshot the M0
// record cites (its count) and over which M1 runs `plat calibrate register --check` (M0.md §4b). The cells C-0070
// names — cut.flattenM, the granularity rows, the regime floors, the deep-interior shares, the band set — are among them
// (workLimits.json's laws are M0-f-03a's file and its census).
//
// The snapshot is exact for a table at its golden version; past it (a run item's hand-over, which never edits this
// test, C-0115, C-0117) a hand-over may add a calibratable cell and never lose one (C-0399).
import { describe, expect, it } from 'vitest';
import { BAND_IDS, calibratableCensus, loadTable, parseTable, TABLE_IDS, TABLE_SOURCES, type M0TableId, type Table } from '../../src/index.js';
import { tableCensus } from '../../src/loader/census.js';
import snapshot from './calibratable-census.json';
import { atGolden, simBase } from './handover.js';

/** Every breach of the snapshot: exact for a table at its golden version; past it, no committed calibratable cell lost. */
function censusProblems(tables: readonly Table[]): string[] {
  const out: string[] = [];
  for (const t of tables) {
    const mine = tableCensus(t);
    const theirs = snapshot.cells.filter((k) => k.startsWith(`${t.id}/`));
    if (atGolden(t)) {
      if (JSON.stringify(mine) !== JSON.stringify(theirs)) out.push(`${t.id}: its calibratable cells are not the snapshot's at its golden version`);
    } else {
      for (const k of theirs) if (!mine.includes(k)) out.push(`${k}: a calibratable cell lost`);
    }
  }
  return out;
}

/** A table bumped `by` versions from its version-1 file (handover.ts' `simBase`) and edited (a run item's file, lawful or not). */
function bumped(id: M0TableId, edit: (raw: { rows: Record<string, Record<string, Record<string, unknown>>> }) => void, by = 1): Table {
  const raw = simBase<{ version: number; rows: Record<string, Record<string, Record<string, unknown>>> }>(id);
  raw.version += by;
  edit(raw);
  return parseTable(id, raw);
}

describe('the calibratable census (C-0070)', () => {
  const census = calibratableCensus();

  it('equals the committed snapshot, cell for cell, and its count', () => {
    const shipped = TABLE_IDS.map((id) => loadTable(id));
    expect(censusProblems(shipped)).toEqual([]);
    if (shipped.every(atGolden)) {
      expect(census).toEqual(snapshot.cells);
      expect(census.length).toBe(snapshot.count);
    }
    expect(snapshot.cells).toHaveLength(snapshot.count);
    expect(snapshot.count).toBe(182);
  });

  it("past a table's golden version a hand-over may add a calibratable cell and never lose one; at it the snapshot is exact (N2)", () => {
    const added = (by: number): Table =>
      bumped('cut', (raw) => (raw.rows.settings.extraM = { value: 1, unit: 'm', provenance: 'M-1 2026-10-20', calibratable: true }), by);
    expect(censusProblems([added(1)])).toEqual([]);
    expect(censusProblems([added(0)])).toEqual(["cut: its calibratable cells are not the snapshot's at its golden version"]);
    const lost = bumped('cut', (raw) => (raw.rows.settings.flattenM.calibratable = false));
    expect(censusProblems([lost])).toEqual(['cut/settings/flattenM: a calibratable cell lost']);
    const gone = bumped('granularity', (raw) => delete raw.rows.rich.depthM);
    expect(censusProblems([gone])).toEqual(['granularity/rich/depthM: a calibratable cell lost']);
  });

  it("lists C-0070's cells", () => {
    const has = (k: string): boolean => census.includes(k);
    expect(has('cut/settings/flattenM')).toBe(true);
    for (const b of ['poor', 'modest', 'prosperous', 'rich']) {
      for (const c of ['frontageM', 'depthM', 'joinMax', 'vacancyShare']) expect(has(`granularity/${b}/${c}`)).toBe(true);
      for (const c of ['shares.court', 'shares.backLane', 'shares.throughAlley', 'shares.rearPlots']) expect(has(`interior/${b}/${c}`)).toBe(true);
    }
    for (const r of ['dense_core', 'walled_rings', 'ribbon', 'suburb']) expect(has(`regimes/${r}/blockDepthFloorM`)).toBe(true);
    for (const b of BAND_IDS) {
      expect(has(`bands/${b}/share`)).toBe(true);
      expect(has(`bands/${b}/weight`)).toBe(true);
    }
    // II.7.1's sewer law on the TOWN row: "PLAUSIBLE until calibrated (JT)" (C-0162 (4))
    for (const k of ['base', 'populationWeight', 'wealthWeight', 'cap']) expect(has(`ladder/TOWN/layers.sewers.law.${k}`)).toBe(true);
  });

  it('counts the tables it is given, in their order, each by the one loop', () => {
    const of = (id: string): string[] => census.filter((k) => k.startsWith(`${id}/`));
    expect(calibratableCensus(['cut', 'bands'])).toEqual([...of('cut'), ...of('bands')]);
    expect(calibratableCensus(['bands', 'cut'])).toEqual([...of('bands'), ...of('cut')]);
    expect(calibratableCensus([])).toEqual([]);
  });

  it('lists every calibratable cell of the raw files and nothing else, in table order then key order', () => {
    const expected: string[] = [];
    for (const id of TABLE_IDS) {
      const rows = (TABLE_SOURCES.get(id) as { rows: Record<string, Record<string, { calibratable: boolean }>> }).rows;
      for (const rk of Object.keys(rows).sort()) {
        for (const ck of Object.keys(rows[rk]).sort()) if (rows[rk][ck].calibratable === true) expected.push(`${id}/${rk}/${ck}`);
      }
    }
    expect(census).toEqual(expected);
    expect(new Set(census).size).toBe(census.length);
  });
});
