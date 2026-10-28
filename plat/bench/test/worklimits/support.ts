// Shared fixtures of the worklimits tests (M0-f-03b): the four committed summaries as text and parsed JSON; the
// version-2 placeholder file the hand-over starts from (fixtures/workLimits.v2.json: the bytes M0-f-03a shipped, sha256 =
// table.test.ts's PIN); the hand-over the fit makes of it (fixtures/workLimits.v3.json: version 3, the bytes `--write`
// writes); the shipped workLimits.json — still version 2 while the hand-over waits on the session's ruling (C-0441), the
// v3 bytes once it is applied — and helpers for the mutation cases.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseWorkLimitsText, type WorkLimitsTable } from '@plat/tables';
import { inputPath, STAGE_CHARGES, SUMMARY_IDS, TABLE_PATH, type StageCharges, type SummaryId } from '../../src/worklimits/index.js';

/** M0-f-03a's version-2 file (placeholder coefficients), as committed before the hand-over. */
export const V2_PATH = fileURLToPath(new URL('./fixtures/workLimits.v2.json', import.meta.url));
export const V2_TEXT = readFileSync(V2_PATH, 'utf8');
/** tables/test/workLimits/table.test.ts's PIN: version 2's bytes. */
export const V2_PIN = { version: 2, sha256: '8c5b12b4a9bea2d5571ba1e9e6986a5527de1affe9fe8fbc6fb76b1ccfc1591e' };

/** The hand-over the fit makes of version 2 from the four committed summaries (what `--write` writes). */
export const V3_PATH = fileURLToPath(new URL('./fixtures/workLimits.v3.json', import.meta.url));
export const V3_TEXT = readFileSync(V3_PATH, 'utf8');

/** The shipped table's text: version 2 until the hand-over is applied, the v3 bytes after. */
export const SHIPPED_TEXT = readFileSync(TABLE_PATH, 'utf8');

/** Has the hand-over been applied to the shipped file (its version past the PIN's)? */
export const HANDED_OVER = (JSON.parse(SHIPPED_TEXT) as { version: number }).version > V2_PIN.version;

export function v2Table(): WorkLimitsTable {
  return parseWorkLimitsText(V2_TEXT);
}

/** The four committed summaries' texts. */
export const SUMMARY_TEXTS: Readonly<Record<SummaryId, string>> = Object.freeze(
  Object.fromEntries(SUMMARY_IDS.map((id) => [id, readFileSync(inputPath(id), 'utf8')])) as Record<SummaryId, string>,
);

/** A fresh parsed copy of the four summaries (a test may mutate it). */
export function summaries(): Record<SummaryId, Record<string, unknown>> {
  return Object.fromEntries(SUMMARY_IDS.map((id) => [id, JSON.parse(SUMMARY_TEXTS[id]) as Record<string, unknown>])) as Record<SummaryId, Record<string, unknown>>;
}

export function sha256(text: string | Buffer): string {
  return createHash('sha256').update(text).digest('hex');
}

/** The value at a slash path of a JSON value (array indices as numbers). */
export function at(root: unknown, path: string): unknown {
  let v: unknown = root;
  for (const k of path.split('/')) v = (v as Record<string, unknown>)[k];
  return v;
}

/** The object at a slash path (to mutate it). */
export function objAt(root: unknown, path: string): Record<string, unknown> {
  return at(root, path) as Record<string, unknown>;
}

/** The date the hand-over's spike cells carry (`M0 spike ⟨date⟩`, the v3 fixture's). */
export function fitDate(): string {
  const m = /"M0 spike (\d{4}-\d{2}-\d{2})"/.exec(V3_TEXT);
  if (m === null) throw new Error('the v3 fixture carries no spike provenance');
  return m[1];
}

/**
 * A stage-charge table that charges each stage only what its blocks name (every STAGE_CHARGES stage, no counter): the
 * report as it read before C-0442, so a test reaches the paths behind the unbounded refusal (the hand-over's mechanics,
 * the over-target refusal, the loader's guard) on the committed summaries.
 */
export const BLOCKS_ONLY: StageCharges = new Map([...STAGE_CHARGES.keys()].map((k) => [k, [] as readonly string[]]));
