// M0-s-02: the golden hash of every data file — a changed cell is a declared change. Each of M0-s-02's tables is
// pinned at its version with the SHA-256 of its bytes (golden.json): a file at its pinned version must hash to the pin,
// so a cell edited without a version bump fails here; a file at a higher version is a declared change (the hand-overs'
// table-cell writer bumps the version with its cells, M0.md §2's hand-over chains) and passes, reported; a lower
// version fails. The data folder holds M0-s-02's thirteen tables and, from M0-f-03a on, its workLimits.json — nothing
// else.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { TABLE_IDS } from '../../src/index.js';
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
      const bytes = readFileSync(`${DATA}${id}.json`);
      const file = JSON.parse(bytes.toString('utf8')) as { table: string; version: number };
      const pin = PINS[`${id}.json`];
      expect(file.table).toBe(id);
      expect(file.version, 'a version below the pin').toBeGreaterThanOrEqual(pin.version);
      const sha = createHash('sha256').update(bytes).digest('hex');
      if (file.version === pin.version) {
        expect(sha, `${id}.json changed without a version bump: a changed cell is a declared change`).toBe(pin.sha256);
      } else {
        // A declared change (a version bump by the table's hand-over writer): reported, not refused.
        console.info(`${id}.json: version ${file.version} past the pin ${pin.version} — a declared change (sha256 ${sha})`);
      }
    });
  }
});
