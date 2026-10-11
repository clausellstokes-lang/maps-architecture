// The cell and its check (§7.6 "Tables have keyed rows"; §13.7's JT; §2.1; §17.1 (6); C-0012; M0-s-02). A table is
// versioned JSON, a map from a stable row key to a row of cells; every cell carries `{ value, unit, provenance,
// calibratable }` and may carry `evidence`, a `note`, an `ownerRule`, an `extension` marker and per-preset `presets`
// values (§7.6). M0's form (C-0012: no zod before M1): `provenance` is the source string in §17.1 (6)'s grammar —
// the `{source, date, note, …}` block of §7.6 flattened to its source, with `note`, `evidence` and `ownerRule` beside
// it on the cell (C-0153). The check refuses an empty cell (JT: "a table with an empty cell fails
// to load"), a cell lacking unit, provenance or calibratable, a unit outside §2.1's list, a provenance outside
// §17.1 (6)'s forms, and anything else it cannot read — every issue naming the table, the row and the cell. The file
// also gives the loader three helpers by path, outside the package's API: the stable-key grammar `STABLE_KEY`, the
// text predicate `nonEmptyString` and the issue builder `issueAt`.
import { sortedKeys } from '@plat/kernel';
import { provenanceForm } from './provenance.js';
import { isUnit, type Unit } from './unit.js';

/** A cell's value: a number, one of our own keys, a flag, or a list of them (a range, a per-band row, a list of keys). */
export type CellValue = number | string | boolean | readonly CellValue[];

// §7.6's three marker vocabularies, each written once as a list and its type derived from it. They differ by design
// from each other and from provenance.ts's REFERENCES (§17.1 (1)'s captured references): `over` names the references
// a cell extends, with `both` and `none`; the parity presets are the references a preset reproduces, NG among them.
const EXTENSION_OVERS = ['MFCG', 'FTG', 'VG', 'FM', 'both', 'none'] as const;
const EXTENSION_MODES = ['chance', 'weight', 'option'] as const;
const PRESET_IDS = ['MFCG', 'FTG', 'VG', 'FM', 'NG'] as const;

/** The references a cell may extend over (§7.6). */
export type ExtensionOver = (typeof EXTENSION_OVERS)[number];
export type ExtensionMode = (typeof EXTENSION_MODES)[number];
/** The parity presets a cell may carry a value for (§7.6). */
export type PresetId = (typeof PRESET_IDS)[number];

export interface PresetValue {
  readonly value: CellValue;
  readonly provenance: string;
}

/** `cell = { value, unit, provenance, calibratable, evidence? }` (M0-work.json) with §7.6's optional markers. */
export interface Cell {
  readonly value: CellValue;
  readonly unit: Unit;
  /** §17.1 (6)'s source form ('own', 'ref:…', 'owner', 'architecture ⟨date⟩', …). */
  readonly provenance: string;
  readonly calibratable: boolean;
  /** Ids of the baseline rows, calibration run and panel that set the value (V12 §2.10). */
  readonly evidence?: readonly string[];
  readonly note?: string;
  /** The OWNER RULE item and part the cell encodes (§7.6). */
  readonly ownerRule?: string;
  readonly extension?: { readonly over: ExtensionOver; readonly mode: ExtensionMode };
  readonly presets?: Readonly<Partial<Record<PresetId, PresetValue>>>;
}

/** One refusal of the check, naming where it lies. */
export interface TableIssue {
  readonly table: string;
  readonly row?: string;
  readonly cell?: string;
  readonly reason: string;
}

/**
 * The one builder of a `TableIssue`: `{ table, reason }`, `{ table, row, reason }` or `{ table, row, cell, reason }`, its
 * keys in that order and an absent key left absent, never present as undefined; a cell is named only within its row.
 */
export function issueAt({ table, row, cell, reason }: TableIssue): TableIssue {
  if (row === undefined) return { table, reason };
  return cell === undefined ? { table, row, reason } : { table, row, cell, reason };
}

/** Where a cell lies: its table, row and cell key. */
export interface CellAt {
  readonly table: string;
  readonly row: string;
  readonly cell: string;
}

const CELL_FIELDS: ReadonlySet<string> = new Set([
  'value',
  'unit',
  'provenance',
  'calibratable',
  'evidence',
  'note',
  'ownerRule',
  'extension',
  'presets',
]);
const OVERS: ReadonlySet<string> = new Set<string>(EXTENSION_OVERS);
const MODES: ReadonlySet<string> = new Set<string>(EXTENSION_MODES);
const PRESETS: ReadonlySet<string> = new Set<string>(PRESET_IDS);

/**
 * A stable key, our own: a letter, then letters, digits, `_`, `.` and `-`; no space and no prose. A cell key follows it,
 * and so does a key value (C-0153 (4)) — so no reference word list, palette or prose can be a value.
 */
export const STABLE_KEY = /^[A-Za-z][A-Za-z0-9_.\-]*$/;

/** A plain JSON object (not an array, not null). */
export function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x);
}

/** Why a value is not a cell value, or null when it is one; `empty` reports a missing, empty or hollow value. */
function valueProblem(v: unknown): { empty: boolean; reason: string } | null {
  if (v === undefined || v === null) return { empty: true, reason: 'empty cell: no value' };
  if (typeof v === 'number') return Number.isFinite(v) ? null : { empty: false, reason: 'value is not a finite number' };
  if (typeof v === 'boolean') return null;
  if (typeof v === 'string') {
    if (v.length === 0) return { empty: true, reason: 'empty cell: the value is an empty string' };
    return STABLE_KEY.test(v) ? null : { empty: false, reason: `value '${v}' is not one of our own keys` };
  }
  if (Array.isArray(v)) {
    if (v.length === 0) return { empty: true, reason: 'empty cell: the value is an empty list' };
    for (const e of v) {
      const p = valueProblem(e);
      if (p !== null) return p.empty ? { empty: true, reason: `empty cell: a list entry is empty` } : p;
    }
    return null;
  }
  return { empty: false, reason: 'value must be a number, a key, a flag or a list of them' };
}

/** Is `x` text with something besides whitespace? */
export function nonEmptyString(x: unknown): x is string {
  return typeof x === 'string' && x.trim().length > 0;
}

/** Every issue of one raw cell (none: the cell loads). */
export function checkCell(raw: unknown, at: CellAt): TableIssue[] {
  const issues: TableIssue[] = [];
  const issue = (reason: string): void => {
    issues.push(issueAt({ table: at.table, row: at.row, cell: at.cell, reason }));
  };
  if (!isRecord(raw)) {
    issue(raw === undefined || raw === null ? 'empty cell: no cell object' : 'a cell must be an object');
    return issues;
  }
  for (const k of sortedKeys(raw)) if (!CELL_FIELDS.has(k)) issue(`unknown field '${k}'`);
  const vp = valueProblem(raw.value);
  if (vp !== null) issue(vp.reason);
  if (raw.unit === undefined) issue('lacks unit');
  else if (!isUnit(raw.unit)) issue(`unit '${String(raw.unit)}' is outside §2.1's list`);
  if (raw.provenance === undefined) issue('lacks provenance');
  else if (provenanceForm(raw.provenance) === null) issue(`provenance '${String(raw.provenance)}' is outside §17.1 (6)'s forms`);
  if (raw.calibratable === undefined) issue('lacks calibratable');
  else if (typeof raw.calibratable !== 'boolean') issue('calibratable must be true or false');
  if (raw.evidence !== undefined && !(Array.isArray(raw.evidence) && raw.evidence.length > 0 && raw.evidence.every(nonEmptyString))) {
    issue('evidence must be a non-empty list of ids');
  }
  if (raw.note !== undefined && !nonEmptyString(raw.note)) issue('note must be non-empty text');
  if (raw.ownerRule !== undefined && !nonEmptyString(raw.ownerRule)) issue('ownerRule must be non-empty text');
  if (raw.extension !== undefined) {
    const e = raw.extension;
    if (!isRecord(e) || !OVERS.has(String(e.over)) || !MODES.has(String(e.mode)) || sortedKeys(e).length !== 2) {
      issue('extension must be { over, mode } with §7.6\'s values');
    }
  }
  if (raw.presets !== undefined) {
    const ps = raw.presets;
    if (!isRecord(ps) || sortedKeys(ps).length === 0) issue('presets must be a non-empty map of preset values');
    else {
      for (const id of sortedKeys(ps)) {
        const pv = ps[id];
        if (!PRESETS.has(id)) issue(`preset '${id}' is not a parity preset`);
        else if (!isRecord(pv) || sortedKeys(pv).length !== 2) issue(`preset '${id}' must be { value, provenance }`);
        else {
          const p = valueProblem(pv.value);
          if (p !== null) issue(`preset '${id}': ${p.reason}`);
          if (provenanceForm(pv.provenance) === null) {
            issue(`preset '${id}': provenance '${String(pv.provenance)}' is outside §17.1 (6)'s forms`);
          }
        }
      }
    }
  }
  // §7.6: "a categorical `option` cell has no neutral value, so the table schema refuses one without an entry for `MFCG`
  // and `FTG`" — the parity presets resolve it to that entry (C-0162 (3)).
  if (isRecord(raw.extension) && raw.extension.mode === 'option' && isCategorical(raw.value)) {
    const ps = isRecord(raw.presets) ? raw.presets : {};
    for (const id of CATEGORICAL_OPTION_PRESETS) {
      if (!isRecord(ps[id])) issue(`a categorical option cell needs a '${id}' preset value (§7.6)`);
    }
  }
  return issues;
}

/** The presets a categorical `option` cell must carry a value for (§7.6; `VG` on the village product's tables is M1's). */
const CATEGORICAL_OPTION_PRESETS = ['MFCG', 'FTG'] as const;

/** A key or a list of keys: a value with no neutral number or flag. */
function isCategorical(v: unknown): boolean {
  return typeof v === 'string' || (Array.isArray(v) && v.length > 0 && v.every((e) => typeof e === 'string'));
}
