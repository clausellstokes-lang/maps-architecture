// Test support for M0-s-02's tables tests (cell/, loader/, data/), and for the package's other test folders by path:
// the one refusal catcher, the deep copy of a shipped table, the one-cell fixture table, the fixture cell and the
// version/PIN law of a pinned data file (C-0157 (2)). Not a test file.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect } from 'vitest';
import { TABLE_SOURCES, TableError, type M0TableId } from '../../src/index.js';

/** The TableError `f` throws; a test failure when it throws none ('no refusal') or throws another error. */
export function refusal(f: () => unknown): TableError {
  try {
    f();
  } catch (e) {
    expect(e).toBeInstanceOf(TableError);
    return e as TableError;
  }
  throw new Error('no refusal');
}

/** A deep copy of a JSON value. */
export function deepCopy<T>(x: T): T {
  return JSON.parse(JSON.stringify(x)) as T;
}

/** A shipped table's raw JSON as a fresh copy a test may edit. */
export function rawTable<T = Record<string, unknown>>(id: M0TableId): T {
  return deepCopy(TABLE_SOURCES.get(id)) as T;
}

/** A fixture cell of provenance 'own'. */
export function cell(value: unknown, unit: string, calibratable = true): Record<string, unknown> {
  return { value, unit, provenance: 'own', calibratable };
}

/** A one-cell table `t` around a raw cell: row `r`, cell `c`. */
export function oneCell(c: unknown): { table: string; version: number; section: string; rows: { r: { c: unknown } } } {
  return { table: 't', version: 1, section: '§4.6', rows: { r: { c } } };
}

/** The one-cell table whose cell loads: the value 1 in metres, provenance 'own', not calibratable. */
export const ONE_CELL = oneCell({ value: 1, unit: 'm', provenance: 'own', calibratable: false });

/**
 * A pinned data file's law (C-0157 (2)): the file names its table `id`; its version is never below the pin's; at the
 * pin's version its bytes (the final newline included) hash to the pin's SHA-256, so a cell edited without a version
 * bump fails; above it the file is a declared change (a hand-over's version bump), reported and passed.
 */
export function pinnedFile(file: string, id: string, pin: { readonly version: number; readonly sha256: string }): void {
  const bytes = readFileSync(file);
  const parsed = JSON.parse(bytes.toString('utf8')) as { table: string; version: number };
  expect(parsed.table).toBe(id);
  expect(parsed.version, 'a version below the pin').toBeGreaterThanOrEqual(pin.version);
  const sha = createHash('sha256').update(bytes).digest('hex');
  if (parsed.version === pin.version) {
    expect(sha, `${id}.json changed without a version bump: a changed cell is a declared change`).toBe(pin.sha256);
  } else {
    // A declared change (a version bump by the table's hand-over writer): reported, not refused.
    console.info(`${id}.json: version ${parsed.version} past the pin ${pin.version} — a declared change (sha256 ${sha})`);
  }
}
