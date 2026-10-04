// M0-s-02: the calibratable census (C-0070) — every calibratable cell listed by table and key, a snapshot the M0
// record cites (its count) and over which M1 runs `plat calibrate register --check` (M0.md §4b). The cells C-0070
// names — cut.flattenM, the granularity rows, the regime floors, the deep-interior shares, the band set — are among them
// (workLimits.json's laws are M0-f-03a's file and its census).
import { describe, expect, it } from 'vitest';
import { BAND_IDS, calibratableCensus, TABLE_IDS, TABLE_SOURCES } from '../../src/index.js';
import snapshot from './calibratable-census.json';

describe('the calibratable census (C-0070)', () => {
  const census = calibratableCensus();

  it('equals the committed snapshot, cell for cell, and its count', () => {
    expect(census).toEqual(snapshot.cells);
    expect(census.length).toBe(snapshot.count);
    expect(snapshot.count).toBe(182);
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
