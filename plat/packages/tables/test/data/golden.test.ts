// M0-s-02: the golden hash of every data file — a changed cell is a declared change. Each of M0-s-02's tables is
// pinned at its version with the SHA-256 of its bytes (golden.json): a file at its pinned version must hash to the pin,
// so a cell edited without a version bump fails here; a file at a higher version is a declared change (the hand-overs'
// table-cell writer bumps the version with its cells, M0.md §2's hand-over chains) and passes, reported; a lower
// version fails. The data folder holds M0-s-02's thirteen tables and, from M0-f-03a on, its workLimits.json — nothing
// else.
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { TABLE_IDS } from '../../src/index.js';
import { pinnedFile } from '../loader/support.js';
import golden from './golden.json';

const DATA = fileURLToPath(new URL('../../data/', import.meta.url));
const PINS = golden as Record<string, { version: number; sha256: string }>;
const OTHER_OWNERS = new Set(['workLimits.json']); // M0-f-03a → M0-f-03b (C-0021)

describe('golden hash of every data file', () => {
  it('pins exactly the thirteen tables, and the data folder holds nothing else of ours', () => {
    const files = readdirSync(DATA).filter((f) => !OTHER_OWNERS.has(f)).sort();
    expect(files).toEqual(TABLE_IDS.map((id) => `${id}.json`).sort());
    expect(Object.keys(PINS).sort()).toEqual(files);
  });

  for (const id of TABLE_IDS) {
    it(`${id}.json: at its pinned version its bytes are the pinned bytes`, () => {
      pinnedFile(`${DATA}${id}.json`, id, PINS[`${id}.json`]);
    });
  }
});
