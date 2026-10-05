// `plat baselines check <file>` in its M0 form (M0-k-05; §17.1 (4); C-0092 (2), (3), C-0113; N-21, N-22, N-24, N-32;
// C-0180 (12), (13)): run as `corepack pnpm baselines:check -- <file> [--previous <file>]` through the thin entry
// `bench/src/baselines-check/`. Seven checks for `baselines.json` and `ng-faces.json` — C1 strings by pattern, C2
// notes scanned, C3 no colour value, C4 append-only rows against the previous version, C5 research-side paths only as
// opaque `research:` labels, C6 corpus ids salted, C7 no corpus string but our preset keys — and C1 and C3 for
// `denylist.json` (N-22: the others have nothing to read in that kind); C8 – C10 are named in the report as not run at
// M0 (V12 §3.3, M1); and the crossing record check (C-0092 (3)). C2's token scan of the notes is the content scan's
// (`corepack pnpm scan` reads this folder's files by their string values, N-26; M0-k-06, M0-k-07): the check reads a
// note's length and characters.
import { createHash } from 'node:crypto';
import { isUnit } from '@plat/tables';
import { rowProblem, rowsOf } from './baselines.js';
import { canonicalJson } from './canonical.js';
import { crossingFileOf, recordCheck, type CrossingRecord } from './crossing.js';
import { denylistProblems } from './denylist.js';
import { ngFacesProblems } from './ngfaces.js';
import {
  BUILD_RE,
  CAPTURE_STAMP_RE,
  COLOUR_RE,
  CORPUS_ID_RE,
  DATE_RE,
  DATE_TIME_RE,
  DIGEST_RE,
  ID_RE,
  looksLikePath,
  NOTE_RE,
  PRESET_KEYS,
  RESEARCH_LABEL_RE,
  SEMVER_RE,
} from './patterns.js';

/** The three crossing files M0 checks, by their file names (§17.1 (4), C-0120, N-22). */
export type CheckKind = 'baselines' | 'ng-faces' | 'denylist';

/** The file kind of a path, by its file name, or null. */
export function kindOfFile(path: string): CheckKind | null {
  const base = path.split(/[\\/]/).pop() ?? '';
  return base === 'baselines.json' ? 'baselines' : base === 'ng-faces.json' ? 'ng-faces' : base === 'denylist.json' ? 'denylist' : null;
}

/** One check's line in the report. */
export interface CheckLine {
  id: string;
  status: 'pass' | 'fail' | 'not run' | 'not applicable';
  problems: string[];
  note?: string;
}

/** The check's report (C-0092 (2), (3)). */
export interface BaselinesCheckReport {
  file: string;
  kind: CheckKind;
  sha256: string;
  rows: number;
  checks: CheckLine[];
  record: { status: 'pass' | 'fail'; problems: string[] };
  /** The record the countersigning seat appends, but for its date, checkerSeat and statement (C-0120). */
  proposedRecord: Pick<CrossingRecord, 'file' | 'sha256' | 'rows' | 'checks'>;
  pass: boolean;
}

const NOT_RUN_AT_M0 = 'not run at M0 (V12 §3.3, M1)';
/** The checks each kind runs (N-22: C1 and C3 alone for the deny-list). */
export const CHECKS_RUN: Readonly<Record<CheckKind, readonly string[]>> = Object.freeze({
  baselines: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
  'ng-faces': ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
  denylist: ['C1', 'C3'],
});

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Every string of a value — each key and each string value — with its path. */
export function strings(v: unknown, at: string, visit: (path: string, s: string, isKey: boolean) => void): void {
  if (typeof v === 'string') visit(at, v, false);
  else if (Array.isArray(v)) v.forEach((x, i) => strings(x, `${at}[${i}]`, visit));
  else if (isObj(v))
    for (const [k, x] of Object.entries(v)) {
      const p = at === '' ? k : `${at}.${k}`;
      visit(p, k, true);
      strings(x, p, visit);
    }
}

/** A row's name in a problem: its id when it has one. */
const rowName = (r: unknown, i: number): string => (isObj(r) && typeof r['id'] === 'string' ? `row ${i} (${r['id'].slice(0, 120)})` : `row ${i}`);

/** The notes and the failed attempts' reasons (C2's fields). */
const isNoteField = (path: string): boolean => /(?:^|\.)note$/.test(path) || /sample\.failed\[\d+\]\.reason$/.test(path);

/** C1 for one baseline row: every string by its field's pattern; any other string an id-like token. */
function c1Row(r: unknown, name: string, out: string[]): void {
  const p = rowProblem(r);
  if (p !== null) out.push(`${name}: ${p.message}`);
  if (!isObj(r)) return;
  const pat = (field: string, ok: (s: string) => boolean): void => {
    const v = r[field];
    if (typeof v === 'string' && !ok(v)) out.push(`${name}: ${field} outside its pattern`);
  };
  pat('id', (s) => ID_RE.test(s));
  pat('metric', (s) => ID_RE.test(s));
  pat('supersedes', (s) => ID_RE.test(s));
  pat('unit', isUnit);
  pat('reference', (s) => ['MFCG', 'FTG', 'NG', 'VG', 'FM'].includes(s) || /^corpus:(?:frame|map):\S+$/.test(s));
  pat('referenceBuild', (s) => BUILD_RE.test(s));
  pat('capture', (s) => CAPTURE_STAMP_RE.test(s) || RESEARCH_LABEL_RE.test(s));
  pat('script', (s) => RESEARCH_LABEL_RE.test(s));
  pat('date', (s) => DATE_RE.test(s) || DATE_TIME_RE.test(s));
  pat('metricVersion', (s) => SEMVER_RE.test(s));
  const typed = new Set(['id', 'metric', 'supersedes', 'unit', 'reference', 'referenceBuild', 'capture', 'script', 'date', 'metricVersion', 'role', 'estimator', 'scale', 'evidence']);
  strings(r, '', (path, s, isKey) => {
    if (isKey || typed.has(path) || isNoteField(path) || path === 'matched.rung' || path === 'matched.ftgSize') return;
    if (/^sample\.captures\[\d+\]$/.test(path)) {
      if (!(ID_RE.test(s) || CAPTURE_STAMP_RE.test(s) || RESEARCH_LABEL_RE.test(s))) out.push(`${name}: ${path} outside its pattern`);
      return;
    }
    if (!ID_RE.test(s)) out.push(`${name}: ${path} is not a pattern string (an id-like token)`);
  });
  strings(r, '', (path, s, isKey) => {
    if (isKey && !/^[A-Za-z][A-Za-z0-9_]{0,40}$/.test(s)) out.push(`${name}: a member name outside its pattern at ${path}`);
  });
}

/** C1 over a `baselines.json`: the file's form, the header's strings and every row. */
function c1Baselines(v: unknown, out: string[]): void {
  const rows = rowsOf(v);
  if (rows === null) {
    out.push('file: neither a list of rows nor an object with a rows list');
    return;
  }
  if (isObj(v))
    strings(v, '', (path, s, isKey) => {
      if (path.startsWith('rows') || isKey) return;
      if (/(?:^|\.)note$/.test(path)) return;
      if (!(ID_RE.test(s) || DATE_RE.test(s) || DATE_TIME_RE.test(s) || SEMVER_RE.test(s) || RESEARCH_LABEL_RE.test(s))) out.push(`header: ${path} is not a pattern string`);
    });
  const ids = new Set<string>();
  rows.forEach((r, i) => {
    const name = rowName(r, i);
    c1Row(r, name, out);
    if (isObj(r) && typeof r['id'] === 'string') {
      if (ids.has(r['id'])) out.push(`${name}: id repeats an earlier row`);
      ids.add(r['id']);
    }
  });
}

/** C2: every note and failed attempt's reason ≤ 200 characters of the note set (N-32), named by row and field. */
function c2(v: unknown, out: string[]): void {
  const rows = rowsOf(v) ?? [];
  const check = (where: string, path: string, s: string): void => {
    if (s.length > 200) out.push(`${where}: ${path} longer than 200 characters (${s.length})`);
    else if (!NOTE_RE.test(s)) {
      const bad = [...s].find((ch) => !NOTE_RE.test(ch));
      out.push(`${where}: ${path} holds a character outside the note set${bad === undefined ? '' : ` (U+${bad.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')})`}`);
    }
  };
  rows.forEach((r, i) => strings(r, '', (path, s, isKey) => !isKey && isNoteField(path) && check(rowName(r, i), path, s)));
  if (isObj(v)) strings(v, '', (path, s, isKey) => !isKey && !path.startsWith('rows') && /(?:^|\.)note$/.test(path) && check('header', path, s));
}

/** C3 (N-22): a colour only inside a JSON string (a key or a value), never inside a number. */
function c3(v: unknown, out: string[]): void {
  strings(v, '', (path, s, isKey) => {
    if (COLOUR_RE.test(s)) out.push(`${isKey ? 'a member name' : 'a string'} at ${path || '(top)'} holds a colour value`);
  });
}

/** C5: no string is a research-side path or a file path unless it is an opaque `research:` label. */
function c5(v: unknown, out: string[]): void {
  strings(v, '', (path, s) => {
    if (looksLikePath(s)) out.push(`${path || '(top)'} names a path; research-side paths cross only as opaque research: labels`);
  });
}

/** C6: every corpus id salted. */
function c6(v: unknown, out: string[]): void {
  strings(v, '', (path, s) => {
    if (/^corpus:/i.test(s) && !CORPUS_ID_RE.test(s)) out.push(`${path} holds an unsalted corpus id`);
  });
}

/** C7: in a corpus row, every string but the typed fields is a salted id or one of our preset keys. */
function c7(v: unknown, out: string[]): void {
  const typed = new Set(['id', 'metric', 'supersedes', 'unit', 'reference', 'referenceBuild', 'capture', 'script', 'date', 'metricVersion', 'role', 'estimator', 'scale', 'evidence']);
  (rowsOf(v) ?? []).forEach((r, i) => {
    if (!isObj(r) || typeof r['reference'] !== 'string' || !r['reference'].startsWith('corpus:')) return;
    strings(r, '', (path, s, isKey) => {
      if (isKey || typed.has(path) || isNoteField(path) || path === 'matched.rung' || path === 'matched.ftgSize') return;
      if (!(CORPUS_ID_RE.test(s) || DIGEST_RE.test(s) || PRESET_KEYS.includes(s))) out.push(`${rowName(r, i)}: ${path} is a corpus string that is neither salted nor one of our preset keys`);
    });
  });
  strings(v, '', (path, s, isKey) => {
    if (!isKey && /(?:^|\.)preset$/.test(path) && !PRESET_KEYS.includes(s)) out.push(`${path} is not one of our preset keys`);
  });
}

/** The records C4 compares, by id: a baselines file's rows, an ng-faces file's hoods and faces. */
function recordsById(kind: CheckKind, v: unknown): Map<string, string> {
  const out = new Map<string, string>();
  if (kind === 'baselines') {
    for (const r of rowsOf(v) ?? []) if (isObj(r) && typeof r['id'] === 'string') out.set(`row ${r['id']}`, canonicalJson(r));
  } else if (kind === 'ng-faces' && isObj(v)) {
    for (const [what, list] of [['hood', v['hoods']], ['face', v['faces']]] as const)
      if (Array.isArray(list)) for (const r of list) if (isObj(r) && r['id'] !== undefined) out.set(`${what} ${String(r['id'])}`, canonicalJson(r));
  }
  return out;
}

/** C4: every record of the previous version present and unchanged (append-only rows, §13.5 *Edges*). */
function c4(kind: CheckKind, v: unknown, prev: unknown, out: string[]): void {
  const now = recordsById(kind, v);
  for (const [id, text] of recordsById(kind, prev)) {
    const cur = now.get(id);
    if (cur === undefined) out.push(`${id} deleted (rows are append-only; a new row supersedes)`);
    else if (cur !== text) out.push(`${id} edited (rows are append-only; a new row supersedes)`);
  }
}

/** A crossing file's row count, the crossing record's `rows`: rows, faces, or digests (C-0180 (13)). */
export function rowCount(kind: CheckKind, v: unknown): number {
  if (kind === 'baselines') return rowsOf(v)?.length ?? 0;
  if (kind === 'ng-faces') return isObj(v) && Array.isArray(v['faces']) ? v['faces'].length : 0;
  return denylistProblems(v).digests;
}

export function sha256Hex(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex');
}

/**
 * Checks one crossing file (its bytes, parsed value and plat-relative path) against `crossings.json` (parsed, or null
 * when absent) and, for C4, the previous version (its bytes and parsed value, when given).
 */
export function baselinesCheck(input: {
  file: string;
  kind: CheckKind;
  bytes: Uint8Array;
  value: unknown;
  crossings: unknown;
  previous?: { bytes: Uint8Array; value: unknown };
}): BaselinesCheckReport {
  const { kind, value } = input;
  const file = crossingFileOf(input.file);
  const sha256 = sha256Hex(input.bytes);
  const rows = rowCount(kind, value);
  const run = CHECKS_RUN[kind];
  const lines: CheckLine[] = [];
  const add = (id: string, f: (out: string[]) => void, note?: string): void => {
    if (!run.includes(id)) {
      lines.push({ id, status: 'not applicable', problems: [], note: kind === 'denylist' ? 'nothing to read in a deny-list (N-22)' : 'not applicable' });
      return;
    }
    const out: string[] = [];
    f(out);
    const line: CheckLine = { id, status: out.length === 0 ? 'pass' : 'fail', problems: out };
    if (note !== undefined) line.note = note;
    lines.push(line);
  };
  const rec = recordCheck(input.crossings, file, sha256, rows, run);
  add('C1', (out) => {
    if (kind === 'baselines') c1Baselines(value, out);
    else if (kind === 'ng-faces') for (const p of ngFacesProblems(value)) out.push(p);
    else for (const p of denylistProblems(value).problems) out.push(p);
  });
  add(
    'C2',
    (out) => {
      if (kind === 'baselines') c2(value, out);
    },
    kind === 'ng-faces' ? 'the file holds no note (attachment B)' : 'the notes read by length and character set (N-32); their token scan is corepack pnpm scan over this folder (N-26; M0-k-06, M0-k-07)',
  );
  add('C3', (out) => c3(value, out));
  add('C4', (out) => {
    const earlier = rec.earlier;
    if (earlier === undefined) return;
    if (input.previous === undefined) {
      out.push(`an earlier CrossingRecord names ${file} (sha256 ${earlier.sha256.slice(0, 12)}…); pass --previous <file> holding that version`);
      return;
    }
    const prevSha = sha256Hex(input.previous.bytes);
    if (prevSha !== earlier.sha256) {
      out.push(`--previous has sha256 ${prevSha.slice(0, 12)}…, the earlier record names ${earlier.sha256.slice(0, 12)}…`);
      return;
    }
    c4(kind, value, input.previous.value, out);
  }, rec.earlier === undefined ? 'first crossing: no earlier record names the file' : undefined);
  add('C5', (out) => c5(value, out));
  add('C6', (out) => c6(value, out));
  add('C7', (out) => c7(value, out));
  for (const id of ['C8', 'C9', 'C10']) lines.push({ id, status: 'not run', problems: [], note: NOT_RUN_AT_M0 });
  const pass = lines.every((l) => l.status !== 'fail') && rec.status === 'pass';
  return { file, kind, sha256, rows, checks: lines, record: { status: rec.status, problems: rec.problems }, proposedRecord: { file, sha256, rows, checks: [...run] }, pass };
}
