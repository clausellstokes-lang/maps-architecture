// The minimal `CrossingRecord` (M0-k-05; §17.1 (4): "each commit appends a `CrossingRecord` countersigned by a checker
// seat that reads only the file"; C-0092 (3), C-0120): `{ file, sha256, rows, date, checks, checkerSeat, statement }`,
// appended by the countersigning checker seat to `plat/packages/testkit/baselines/crossings.json` — a JSON array,
// append-only (M0-k-05 creates it as `[]`) — `file` the path relative to plat/ (with or without `plat/`, C-0120),
// `checkerSeat` the countersigner's CLEAN-ROOM.md ledger row id. `baselines:check` refuses a file whose record is
// missing or stale (C-0092 (3)) and reads the previous version's record for C4.
import { DATE_RE, DATE_TIME_RE, LEDGER_ID_RE, SHA256_RE, STATEMENT_RE } from './patterns.js';

/** C-0092 (3)'s minimal record. */
export interface CrossingRecord {
  file: string;
  sha256: string;
  rows: number;
  date: string;
  checks: string[];
  checkerSeat: string;
  statement: string;
}

export const CROSSING_MEMBERS: readonly string[] = Object.freeze(['file', 'sha256', 'rows', 'date', 'checks', 'checkerSeat', 'statement']);
/** The check ids a record's `checks` may name: C1 – C10 (C8 – C10 never run at M0). */
const CHECK_ID_RE = /^C(?:[1-9]|10)$/;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** A record's `file` relative to plat/ (C-0120: with or without the `plat/` prefix). */
export function crossingFileOf(file: string): string {
  return file.startsWith('plat/') ? file.slice('plat/'.length) : file;
}

/** Why a record is not C-0092 (3)'s minimal record, naming the member, or null. */
export function crossingRecordProblem(r: unknown): string | null {
  if (!isObj(r)) return 'not an object';
  for (const m of CROSSING_MEMBERS) if (!(m in r)) return `${m} missing`;
  for (const m of Object.keys(r)) if (!CROSSING_MEMBERS.includes(m)) return `unknown member ${m}`;
  if (typeof r['file'] !== 'string' || r['file'] === '' || r['file'].includes('\\') || r['file'].startsWith('/') || r['file'].split('/').includes('..')) return 'file is not a path relative to plat/';
  if (typeof r['sha256'] !== 'string' || !SHA256_RE.test(r['sha256'])) return 'sha256 is not 64 lower-case hex digits';
  if (!(Number.isInteger(r['rows']) && (r['rows'] as number) >= 0)) return 'rows is not a count';
  if (typeof r['date'] !== 'string' || !(DATE_RE.test(r['date']) || DATE_TIME_RE.test(r['date']))) return 'date is not an ISO date';
  const checks = r['checks'];
  if (!Array.isArray(checks) || checks.length === 0 || !checks.every((c) => typeof c === 'string' && CHECK_ID_RE.test(c))) return 'checks is not a list of check ids C1 – C10';
  if (typeof r['checkerSeat'] !== 'string' || !LEDGER_ID_RE.test(r['checkerSeat'])) return 'checkerSeat is not a CLEAN-ROOM.md ledger row id';
  if (typeof r['statement'] !== 'string' || !STATEMENT_RE.test(r['statement'])) return 'statement is not 1 – 400 characters of the note set';
  return null;
}

/** The record check's outcome for one file. */
export interface RecordOutcome {
  status: 'pass' | 'fail';
  problems: string[];
  /** The previous version's record (the last record for the file whose sha256 differs), for C4. */
  earlier?: CrossingRecord;
}

/**
 * The record check (C-0092 (3)): `crossings.json` (parsed, or null when absent) must be an array of minimal records;
 * one of them must name `file` with the file's `sha256`, its `rows` and every check id the kind runs — else the record
 * is missing (none names the file) or stale (the latest names another sha256, or the matching one another count or
 * fewer checks).
 */
export function recordCheck(crossings: unknown, file: string, sha256: string, rows: number, need: readonly string[]): RecordOutcome {
  const problems: string[] = [];
  if (crossings === null) return { status: 'fail', problems: ['crossings.json: missing (M0-k-05 creates it as []; C-0092 (3))'] };
  if (!Array.isArray(crossings)) return { status: 'fail', problems: ['crossings.json: not a JSON array (C-0120)'] };
  const valid: CrossingRecord[] = [];
  crossings.forEach((r, i) => {
    const p = crossingRecordProblem(r);
    if (p !== null) problems.push(`crossings.json: record ${i}: ${p}`);
    else valid.push(r as CrossingRecord);
  });
  const mine = valid.filter((r) => crossingFileOf(r.file) === file);
  const matching = mine.filter((r) => r.sha256 === sha256);
  let earlier: CrossingRecord | undefined;
  for (const r of mine) if (r.sha256 !== sha256) earlier = r;
  if (matching.length === 0) {
    if (mine.length === 0) problems.push(`record missing: no CrossingRecord names ${file} (the countersigning checker seat appends one, C-0120)`);
    else problems.push(`record stale: the latest CrossingRecord for ${file} names sha256 ${mine[mine.length - 1].sha256.slice(0, 12)}…, the file is ${sha256.slice(0, 12)}…`);
  } else {
    const r = matching[matching.length - 1];
    if (r.rows !== rows) problems.push(`record stale: its rows ${r.rows}, the file holds ${rows}`);
    const lacking = need.filter((c) => !r.checks.includes(c));
    if (lacking.length > 0) problems.push(`record stale: its checks lack ${lacking.join(', ')}`);
  }
  return earlier === undefined ? { status: problems.length === 0 ? 'pass' : 'fail', problems } : { status: problems.length === 0 ? 'pass' : 'fail', problems, earlier };
}
