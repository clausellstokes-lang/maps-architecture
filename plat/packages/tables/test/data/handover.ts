// The hand-overs of M0-s-02's tables and the law a handed-over table keeps past its golden version (M0.md §2's chains;
// M0-work.json's handsOver; C-0162 (1), C-0416). A run item writes the cells its hand-over names, re-signs each with
// 'M-1 ⟨date⟩' and bumps the file's version; it never edits these tests (C-0115, C-0117). Past the golden version a
// table is held to its version-1 content (handover-v1.json) cell by cell: no version-1 cell lost; a cell that moved, or
// a cell added, lies inside one of the table's hand-overs and carries the 'M-1 ⟨date⟩' provenance with its unit and its
// calibratable flag kept; every other cell keeps its version-1 content (value, unit, provenance, flag and markers). A
// table no run item receives stays at its golden version. Not a test file.
import { expect } from 'vitest';
import { parseTable, provenanceForm, TABLE_SOURCES, type Cell, type M0TableId, type Table } from '../../src/index.js';
import golden from './golden.json';
import v1 from './handover-v1.json';

/** golden.json's pins: each data file's version and the SHA-256 of its bytes at that version. */
export const PINS = golden as Record<string, { version: number; sha256: string }>;

/** The four rowed bands of granularity.json and interior.json's shares (§4.5's four-row-over-six-band rule). */
export const ROWED = ['poor', 'modest', 'prosperous', 'rich'] as const;
/** The regimes that carry a block-depth band floor (§4.4). */
export const FLOORED = ['dense_core', 'walled_rings', 'ribbon', 'suburb'] as const;
/** The deep-interior rule's default shares (§4.6). */
export const SHARES = ['shares.court', 'shares.backLane', 'shares.throughAlley', 'shares.rearPlots'] as const;

/** One hand-over: its receiver, M0-work.json's words for it, and the cells it may write ('*': every row or cell). */
export interface HandOver {
  readonly receiver: string;
  readonly what: string;
  readonly rows: readonly string[] | '*';
  readonly cells: readonly string[] | '*';
}

/**
 * The hand-overs by table, as M0-work.json gives them: granularity.json and regimes.json → M0-b-05a (the re-fitted
 * plot-depth rows; the regime block-depth minimums), interior.json → M0-c-07a (the fitted default shares), cut.json →
 * M0-b-05b (cut.flattenM) → M0-c-07b (the infill constants, `cut.*`), bands.json → M0-c-07b (the band table).
 */
export const HAND_OVERS: Readonly<Record<string, readonly HandOver[]>> = {
  granularity: [{ receiver: 'M0-b-05a', what: 'the re-fitted plot-depth rows', rows: ROWED, cells: ['depthM'] }],
  regimes: [{ receiver: 'M0-b-05a', what: 'the regime block-depth minimums', rows: FLOORED, cells: ['blockDepthFloorM'] }],
  interior: [{ receiver: 'M0-c-07a', what: 'the fitted default shares of the deep-interior rule', rows: ROWED, cells: SHARES }],
  cut: [
    { receiver: 'M0-b-05b', what: 'cut.flattenM', rows: ['settings'], cells: ['flattenM'] },
    { receiver: 'M0-c-07b', what: 'the infill constants on a statistics miss (cut.*)', rows: '*', cells: '*' },
  ],
  bands: [{ receiver: 'M0-c-07b', what: 'the band table on a statistics miss', rows: '*', cells: '*' }],
};

/** The version-1 raw files of the handed-over tables, by id. */
export const V1 = v1.tables as Readonly<Record<string, unknown>>;

/**
 * A fresh copy of a table's raw file as a simulated hand-over starts from: the version-1 copy for a handed-over table
 * (so a simulation means the same thing after a real hand-over has bumped the shipped file), the shipped file otherwise.
 */
export function simBase<T>(id: string): T {
  const raw = V1[id] ?? TABLE_SOURCES.get(id as M0TableId);
  return JSON.parse(JSON.stringify(raw)) as T;
}

/** Is the table at its golden.json version (the design's defaults) rather than past it (a run item's declared change)? */
export function atGolden(t: Table): boolean {
  const pin = PINS[`${t.id}.json`];
  expect(pin, `${t.id}.json has a golden pin`).toBeDefined();
  return t.version === pin.version;
}

/** May one of the table's hand-overs write this cell? */
export function handedOver(table: string, row: string, cell: string): boolean {
  const within = (keys: readonly string[] | '*', k: string): boolean => keys === '*' || keys.includes(k);
  return (HAND_OVERS[table] ?? []).some((h) => within(h.rows, row) && within(h.cells, cell));
}

/** A cell's whole content (value, unit, provenance, calibratable and every marker), as one comparable text. */
function content(c: Cell): string {
  return JSON.stringify(c);
}

/** Every breach of the hand-over law by the table `t` (none: it holds). */
export function handOverProblems(t: Table): string[] {
  const out: string[] = [];
  const raw = V1[t.id];
  if (raw === undefined) {
    if (!atGolden(t)) out.push(`${t.id}: no run item receives this table, so it stays at its golden version`);
    return out;
  }
  const base = parseTable(t.id, raw);
  const at = (r: string, c: string): string => `${t.id}/${r}/${c}`;
  let moved = false;
  for (const [rk, row] of base.rows) {
    for (const [ck, was] of row) {
      if (!t.has(rk, ck)) {
        out.push(`${at(rk, ck)}: a version-1 cell lost`);
        moved = true;
        continue;
      }
      const now = t.cell(rk, ck);
      if (content(now) === content(was)) continue;
      moved = true;
      if (!handedOver(t.id, rk, ck)) out.push(`${at(rk, ck)}: moved outside the table's hand-overs`);
      else {
        if (provenanceForm(now.provenance) !== 'M-1') out.push(`${at(rk, ck)}: moved without the hand-over's provenance 'M-1 ⟨date⟩'`);
        if (now.unit !== was.unit || now.calibratable !== was.calibratable) out.push(`${at(rk, ck)}: its unit or calibratable flag moved`);
      }
    }
  }
  for (const [rk, row] of t.rows) {
    for (const [ck, now] of row) {
      if (base.has(rk, ck)) continue;
      moved = true;
      if (!handedOver(t.id, rk, ck)) out.push(`${at(rk, ck)}: added outside the table's hand-overs`);
      else if (provenanceForm(now.provenance) !== 'M-1') out.push(`${at(rk, ck)}: added without the hand-over's provenance 'M-1 ⟨date⟩'`);
    }
  }
  if (moved && t.version <= base.version) out.push(`${t.id}: cells moved without a version bump`);
  if (t.version < base.version) out.push(`${t.id}: a version below version ${base.version}`);
  return out;
}
