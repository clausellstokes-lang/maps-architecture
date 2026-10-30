// Shared fixtures of the worklimits tests (M0-f-03b): the four summaries the fit reads, twice — FROZEN byte copies
// (fixtures/summaries/<item>.json, copied from docs/build/summaries/ at session round S1's base and pinned by sha256 in
// FIXTURE_SHA256: every test that pins a number the fit makes reads them, so another item's landing never moves a pin;
// a re-freeze is a declared change of FIXTURE_SHA256 and the pins together, Q134) and the LIVE committed files (read only
// by live.test.ts, which asserts invariants and prints a report, never a pinned count); the version-2 placeholder file the
// hand-over starts from (fixtures/workLimits.v2.json: the bytes M0-f-03a shipped, sha256 = table.test.ts's PIN); the
// hand-over the fit made of it at F0 (fixtures/workLimits.v3.json: version 3, the bytes F0's `--write` writes, recorded
// with summaries/M0-f-03b.json — both F0's record, kept byte-unchanged by S1); the shipped workLimits.json — still
// version 2 while the hand-over waits on the session's ruling (C-0445), the v3 bytes once it is applied — and helpers
// for the mutation cases.
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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

/** The frozen copies of the four summaries (session round S1's base; Q134). */
export const FIXTURE_DIR = fileURLToPath(new URL('./fixtures/summaries/', import.meta.url));

/**
 * The frozen copies' sha256: the committed files at S1's base, as their items' landed records name them (M0-c-06's
 * 1 000-seed fold, J628; M0-e-06 S2's 200-seed regeneration, J593; M0-b-04 and M0-k-04 as F0 read them).
 */
export const FIXTURE_SHA256: Readonly<Record<SummaryId, string>> = Object.freeze({
  'M0-c-06': 'f3829f1011e7ca6c5dc6a4817d8ca3c74c37b0db3d0e7a2421a8ce695a4d5e53',
  'M0-e-06': '6ba690c92b4b14e95c6fb93caa76ad3d4571feacf76698737ecbfd0232273613',
  'M0-b-04': '05ae6332417e21f1460c671cca6bc63ccc078163bd47eba62a7a9cdb5dbc51a8',
  'M0-k-04': '67322e4e7d5ead1348308714dfdddf0eda0fd4cee78efbc0400dab557bd28165',
});

/** The four frozen summaries' texts (every pinned test reads these). */
export const SUMMARY_TEXTS: Readonly<Record<SummaryId, string>> = Object.freeze(
  Object.fromEntries(SUMMARY_IDS.map((id) => [id, readFileSync(inputPath(id, FIXTURE_DIR), 'utf8')])) as Record<SummaryId, string>,
);

/** A fresh parsed copy of the four frozen summaries (a test may mutate it). */
export function summaries(): Record<SummaryId, Record<string, unknown>> {
  return Object.fromEntries(SUMMARY_IDS.map((id) => [id, JSON.parse(SUMMARY_TEXTS[id]) as Record<string, unknown>])) as Record<SummaryId, Record<string, unknown>>;
}

/** The live committed summaries' texts, docs/build/summaries/ (live.test.ts alone: invariants and a report). */
export function liveTexts(): Record<SummaryId, string> {
  return Object.fromEntries(SUMMARY_IDS.map((id) => [id, readFileSync(inputPath(id), 'utf8')])) as Record<SummaryId, string>;
}

/** A fresh parsed copy of the live committed summaries (live.test.ts alone). */
export function liveSummaries(): Record<SummaryId, Record<string, unknown>> {
  const t = liveTexts();
  return Object.fromEntries(SUMMARY_IDS.map((id) => [id, JSON.parse(t[id]) as Record<string, unknown>])) as Record<SummaryId, Record<string, unknown>>;
}

/**
 * The frozen summaries with M0-c-06's integrated S8 cut.candidates max lowered from 28.33 to 20 — under its fitted
 * threshold 20.3359 (b-04's p999 13.5572 × 1.5) — so the hit-rate report narrowed to the blocks (BLOCKS_ONLY) PASSES: the
 * frozen inputs themselves are over the target there (⌈33 569 / 1 000⌉ = 34 hits, 1.0128 per 1 000), and the entry's
 * hand-over mechanics (--write writes, a second run writes nothing, the loader's guard) need a passing report to reach.
 */
export function passingSummaries(): Record<SummaryId, Record<string, unknown>> {
  const s = summaries();
  objAt(s['M0-c-06'], 'runs/1/work/cut.candidates/perUnit')['max'] = 20;
  return s;
}

/** The passing variant written as the four files of a fresh folder under `parent` (the entry reads it as its summariesDir). */
export function passingDir(parent: string = tmpdir()): string {
  const d = mkdtempSync(join(parent, 'passing-'));
  const s = passingSummaries();
  for (const id of SUMMARY_IDS) writeFileSync(inputPath(id, d), `${JSON.stringify(s[id], null, 2)}\n`);
  return d;
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
 * report as it read before C-0446, so a test reaches the paths behind the unbounded refusal (the hand-over's mechanics,
 * the over-target refusal, the loader's guard) on the committed summaries.
 */
export const BLOCKS_ONLY: StageCharges = new Map([...STAGE_CHARGES.keys()].map((k) => [k, [] as readonly string[]]));
