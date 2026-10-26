// Every cut cell S8 reads is refused when unreadable (notes N-12; C-0426): step 10's continuation tolerance
// (cut.settings.continuationCdeg) and the residue's soft share (cut.ladder.substitutionSoftShare) stood in for by the
// constants 600 and 0.05 when the cell was not a number; they now refuse the run as every other cut cell does
// (`stopError`, a RangeError naming the cell), whether or not the run would have read them.
import { readFileSync } from 'node:fs';
import { parseTable } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { runFixture, twoDistricts } from './support.js';

const RAW = JSON.parse(readFileSync(new URL('../../../../tables/data/cut.json', import.meta.url), 'utf8')) as { rows: Record<string, Record<string, { value: unknown }>> };

/** The cut table with one cell's value replaced. */
function cutWith(row: string, cell: string, value: unknown) {
  const raw = JSON.parse(JSON.stringify(RAW)) as typeof RAW;
  raw.rows[row][cell].value = value;
  return parseTable('cut', raw);
}

describe('S8 refuses an unreadable cut cell instead of standing in a constant (notes N-12)', () => {
  for (const [row, cell] of [
    ['settings', 'continuationCdeg'],
    ['ladder', 'substitutionSoftShare'],
  ] as const) {
    it(`cut/${row}/${cell} not a number: the run is refused, naming the cell`, { timeout: 120_000 }, () => {
      const f = twoDistricts();
      expect(() => runFixture(f, { tables: { cut: cutWith(row, cell, 'unset') } })).toThrow(`BentCutFabric: cut/${row}/${cell} is not a number`);
    });
  }

  it('the shipped cells read as numbers: the same fixture runs', { timeout: 120_000 }, () => {
    const out = runFixture(twoDistricts(), { tables: { cut: cutWith('settings', 'continuationCdeg', RAW.rows.settings.continuationCdeg.value) } });
    expect(out.infill.report.refused).toEqual([]);
    expect(out.lanes.length).toBeGreaterThan(0);
  });
});
