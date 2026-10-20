#!/usr/bin/env node
// `corepack pnpm landed -- <item id> --lane <lane key>` (C-0104 (1), C-0111 (1), C-0120 (1)): a landing seat's
// attribution record. Seats run no git and up to four share one tree, so each seat lists what it landed: every file
// under its item's `owns` (read from docs/build/M0-work.json) with its SHA-256 and its status — created, changed,
// unchanged or deleted — against the wave's snapshot, and the lines it appended under the id rule (its own rows of
// choices.md and CLEAN-ROOM.md, found by the seat cell; C-0064's index line of a folder it owns). The record goes to
// docs/build/landed/<item id>.json, a file every item owns implicitly. A path the seat says it touched (--touched) that
// lies outside its owns and the permitted appends is refused, named. A seat without an item (a checker, a spec lane)
// declares its files with --owns (exact paths no item owns; C-0111), or none when it only appended rows or records.
// M-1's crossings (C-0120): a CrossingRecord appended to packages/testkit/baselines/crossings.json is the appending
// seat's when its `checkerSeat` names a CLEAN-ROOM.md ledger row whose seat cell is the seat's lane; the crossing file
// itself (baselines.json, ng-faces.json, denylist.json, a digest file) is attributed by that record in landed:verify,
// never declared here. An item landing in a wave before its own (a run item started early, C-0121) owns its files and
// hand-overs as at its own wave. A passed-ownership path (a module folder's index.ts, C-0013, C-0064; a bench harness
// index, C-0059; any owns entry a later item takes over) is resolved at its hand-over wave under any label: a wave
// label reads the waves up to it as open, and a label that names no wave (flow-N, session-…) reads every wave as open,
// so the latest owner — the hand-over's receiver — claims the path and its package-index line, never the giver
// (C-0318). The owner of a package index (`packages/<p>/src/index.ts`, the scaffold's) claims its own edits there line
// by line — every added line that is not a module folder's line — with the snapshot's lines it removed (C-0318).
//
// Options: --lane <key> (required) · --wave <label> (the snapshot of the wave the seat started in; default: the newest
// snapshot) · --touched <plat/path> (repeatable) · --whole <plat/path> (an append file the item owns, claimed whole for
// an edit that is not an append) · --owns <plat/path> (repeatable; seats without an item only).
// Exit 0 written, 1 refused, 2 no snapshot, 64 usage.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  CROSSINGS_FILE,
  LANDED_DIR,
  PLAT_ROOT,
  RECORD_SCHEMA,
  WORK_FILE,
  appendUnits,
  byCodeUnit,
  cliArgs,
  formatJson,
  fromPlat,
  isAppendFile,
  isCrossingFile,
  isMain,
  latestSnapshot,
  lineHash,
  listTree,
  readSnapshot,
  splitLines,
  toPlat,
  validLabel,
} from './snapshot.mjs';

// ---------------------------------------------------------------------------------------------------------------
// owns entries and ownership

/** Expands every {a,b,c} group of a path pattern (no nesting). */
export function expandBraces(s) {
  const m = /\{([^{}]*)\}/.exec(s);
  if (!m) return [s];
  return m[1].split(',').flatMap((alt) => expandBraces(s.slice(0, m.index) + alt.trim() + s.slice(m.index + m[0].length)));
}

/**
 * Parses one `owns` entry of M0-work.json: the text before " (" is the path (a trailing comment explains it); braces
 * expand; a segment `*` or `<name>` matches any one path segment; a trailing `/` makes the entry a folder.
 */
export function parseOwnsEntry(entry) {
  const head = String(entry).split(' (')[0].trim();
  const patterns = expandBraces(head).map((p) => {
    const folder = p.endsWith('/');
    const segments = (folder ? p.slice(0, -1) : p).split('/');
    return { folder, segments: segments.map((s) => (s === '*' || /^<[^<>/]+>$/.test(s) ? null : s)) };
  });
  return { entry: String(entry), head, patterns };
}

/** Does a pattern own a path (POSIX, starting `plat/`)? By directory prefix: the path itself or anything under it. */
export function patternMatches(pattern, path) {
  const segs = path.split('/');
  if (segs.length < pattern.segments.length) return false;
  for (let i = 0; i < pattern.segments.length; i += 1) {
    const want = pattern.segments[i];
    if (want !== null && want !== segs[i]) return false;
  }
  return segs.length > pattern.segments.length || !pattern.folder;
}

const ownsCache = new Map();
const parsedEntry = (e) => {
  let p = ownsCache.get(e);
  if (p === undefined) {
    p = parseOwnsEntry(e);
    ownsCache.set(e, p);
  }
  return p;
};

export function ownsMatch(owns, path) {
  return owns.some((e) => parsedEntry(e).patterns.some((p) => patternMatches(p, path)));
}

export function loadWork(root) {
  return JSON.parse(readFileSync(join(root, ...WORK_FILE.split('/')), 'utf8'));
}

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** The position of a wave value (0, 1, …, "T", "T-fix", "AFTER-M-1 (a)") in M0-work.json's waves, or null. */
export function wavePosition(work, wave) {
  const i = (work.waves ?? []).findIndex((w) => slug(w.wave) === slug(wave));
  return i < 0 ? null : i;
}

/** The wave a snapshot label names (`wave-<wave>`, compared as slugs: wave-2, wave-T2, wave-after-m-1-a), or null. */
export function labelPosition(work, label) {
  const m = /^wave-(.+)$/i.exec(label ?? '');
  return m ? wavePosition(work, m[1]) : null;
}

/**
 * The item or items that own a path while wave position W is open. Hand-overs run forward in waves, so of the items
 * whose owns match the path, the owner is the one of the latest wave not after W (e.g. tools/lint/index.mjs is
 * M0-s-01's in wave 0 and M0-d-07's from wave 1; a module folder's index.ts is the scaffold's until its owner's wave).
 */
export function ownersAt(work, path, W) {
  let best = -1;
  let owners = [];
  for (const item of work.items ?? []) {
    if (!ownsMatch(item.owns ?? [], path)) continue;
    const p = wavePosition(work, item.wave);
    if (p === null || p > W) continue;
    if (p > best) {
      best = p;
      owners = [item.id];
    } else if (p === best) owners.push(item.id);
  }
  return owners;
}

/** Every item whose owns match a path, at any wave. */
export function anyOwners(work, path) {
  return (work.items ?? []).filter((it) => ownsMatch(it.owns ?? [], path)).map((it) => it.id);
}

// ---------------------------------------------------------------------------------------------------------------
// the appended lines

/** A Markdown table row's cells (pipes inside a cell must be escaped as \|), or null for a non-row line. */
export function splitCells(line) {
  const t = line.trim();
  if (!t.startsWith('|')) return null;
  return t.replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim());
}

/** A row's id (`C-0104`, `L-0013`): its first cell, when it has that form. */
export function rowId(cells) {
  return cells && /^[A-Z]-\d{4}$/.test(cells[0]) ? cells[0] : null;
}

/** Is a line a Markdown table's separator row (`|---|:--|`)? An absent line is not. */
const isSeparatorRow = (line) => line !== undefined && /^\|[\s:|-]+$/.test(line.trim());

/** The index of a table header's seat column (the first cell starting with "seat"), or -1. */
const seatIndex = (headerLine) => (splitCells(headerLine) ?? []).findIndex((c) => /^seat\b/i.test(c));

/**
 * The index of the seat column of the table holding line i, or -1. The table's first row is its header, which counts
 * only with a separator row under it.
 */
export function seatColumn(lines, i) {
  let j = i;
  while (j > 0 && lines[j - 1].trim().startsWith('|')) j -= 1;
  if (!isSeparatorRow(lines[j + 1])) return -1;
  return seatIndex(lines[j]);
}

/** Does a seat cell name this lane (the lane key, then the cell's end or a separator: "build/x (Opus, …)")? */
export function seatNames(cell, lane) {
  const c = cell.replace(/^`/, '');
  return c.startsWith(lane) && (c.length === lane.length || /[^A-Za-z0-9_/-]/.test(c[lane.length]));
}

/** The lane named by a renumbering note in a row (C-0104's id rule), or null. */
export function renumberedBy(line) {
  const m = /renumbered from [A-Z]-\d{4} \(collision\) by `?([^\s`,;)]+)/.exec(line);
  return m ? m[1].replace(/\.$/, '') : null;
}

/**
 * §2's seat-ledger table of CLEAN-ROOM.md: the first table under the heading "## 2 " (never "## 2a"), as
 * { header, start, end, seat } — the header's line index, the first and one past the last row's index, and the seat
 * column — or null when the file has no such table.
 */
export function ledgerTable(lines) {
  const h = lines.findIndex((l) => /^## 2\s/.test(l));
  if (h < 0) return null;
  for (let i = h + 1; i < lines.length && !/^## /.test(lines[i]); i += 1) {
    if (!lines[i].trim().startsWith('|')) continue;
    if (!isSeparatorRow(lines[i + 1])) return null;
    let end = i + 2;
    while (end < lines.length && lines[end].trim().startsWith('|')) end += 1;
    return { header: i, start: i + 2, end, seat: seatIndex(lines[i]) };
  }
  return null;
}

/** The rule a stray ledger row breaks, quoted in landed's refusal (C-0104 (4), C-0120 (5), C-0306 (1)). */
export const LEDGER_RULE =
  'a seat signs CLEAN-ROOM.md by appending its row as the last row of §2\'s seat-ledger table (C-0104 (4); the id rule: ' +
  're-read the last L- id, append in one write), never at the file\'s end or under §2a – §5; landed reads a row\'s seat ' +
  'from the table that holds it, so a ledger row outside §2\'s table is claimed by no record and drops out of the ' +
  'committed ledger (Q23)';

/**
 * The CLEAN-ROOM.md rows that name a lane as §2's ledger rows do but lie outside §2's table (C-0306 (1)): a row
 * carrying an L- id, or a row in no table with a seat column, whose cell at §2's seat column names the lane or whose
 * renumbering note (C-0104's id rule) is the lane's. Rows of §3 – §5 that name the lane in their own table's seat column are
 * theirs, never strays. Returns [{ id, line }] (line 1-based).
 */
export function strayLedgerRows(lines, lane) {
  const t = ledgerTable(lines);
  const col = t !== null && t.seat >= 0 ? t.seat : 1;
  const out = [];
  lines.forEach((line, k) => {
    if (t !== null && k >= t.start && k < t.end) return;
    const cells = splitCells(line);
    if (cells === null) return;
    const id = rowId(cells);
    if (!((id !== null && id[0] === 'L') || seatColumn(lines, k) < 0)) return;
    if ((cells[col] !== undefined && seatNames(cells[col], lane)) || renumberedBy(line) === lane) out.push({ id: id ?? `line ${k + 1}`, line: k + 1 });
  });
  return out;
}

export const INDEX_LINE = /^export \* from '\.\/([A-Za-z0-9_-]+)\/index\.js';\s*$/;

/** A line of a package index that names a module folder (`'./<folder>/…'`) without C-0064's exact form: the folder. */
export const FOLDER_REF = /['"]\.\/([A-Za-z0-9_-]+)\//;

/** Longest common subsequence of two hash lists: the indices of a not kept (removed) and of b not kept (added). */
export function lcsDiff(a, b) {
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  }
  const removed = [];
  const added = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) removed.push(i++);
    else added.push(j++);
  }
  while (i < n) removed.push(i++);
  while (j < m) added.push(j++);
  return { removed, added };
}

/**
 * The current units of an append file — its lines, or crossings.json's records as canonical JSON — and their diff
 * against the snapshot's unit hashes. `unit` is 'line' or 'record'; `invalid` marks a crossings file that is not a JSON
 * array (C-0120).
 */
export function appendDiff(root, snapshot, path) {
  const rel = fromPlat(path);
  const abs = join(root, ...rel.split('/'));
  const parsed = existsSync(abs) ? appendUnits(rel, readFileSync(abs, 'utf8')) : null;
  const lines = parsed === null ? null : parsed.units;
  const hashes = lines === null ? [] : lines.map(lineHash);
  const before = snapshot.appendFiles?.[path];
  const old = before?.lines ?? [];
  return {
    lines,
    hashes,
    old,
    unit: rel === CROSSINGS_FILE ? 'record' : 'line',
    invalid: parsed?.invalid ?? false,
    placeholders: new Set(before?.placeholders ?? []),
    ...lcsDiff(old, hashes),
  };
}

/** A CrossingRecord's `file` as a path relative to plat/ (written with or without the leading `plat/`), or null. */
export function crossingFile(record) {
  return record !== null && typeof record === 'object' && typeof record.file === 'string' ? record.file.replace(/^plat\//, '') : null;
}

/** A record unit of crossings.json parsed back, or null. */
export function parseRecordUnit(unit) {
  try {
    const v = JSON.parse(unit);
    return v !== null && typeof v === 'object' && !Array.isArray(v) ? v : null;
  } catch {
    return null;
  }
}

/** The seat cell of the CLEAN-ROOM.md ledger row with this id (`L-0042`), or null when no such row exists. */
export function ledgerSeat(lines, id) {
  if (typeof id !== 'string' || !/^L-\d{4}$/.test(id)) return null;
  for (let i = 0; i < lines.length; i += 1) {
    const cells = splitCells(lines[i]);
    if (rowId(cells) !== id) continue;
    const col = seatColumn(lines, i);
    return col >= 0 ? (cells[col] ?? null) : null;
  }
  return null;
}

/** The current lines of plat/CLEAN-ROOM.md under root (empty when the file is absent). */
export function cleanRoomLines(root) {
  const abs = join(root, 'CLEAN-ROOM.md');
  return existsSync(abs) ? splitLines(readFileSync(abs, 'utf8')) : [];
}

/** The next free id with a row id's letter in a file's lines. */
function nextFreeId(lines, letter) {
  let max = 0;
  for (const l of lines) {
    const id = rowId(splitCells(l));
    if (id && id[0] === letter) max = Math.max(max, Number(id.slice(2)));
  }
  return `${letter}-${String(max + 1).padStart(4, '0')}`;
}

/** Ids carried by more than one row of a file where one of the rows is new since the snapshot (a collision). */
export function collisions(lines, addedSet) {
  const byId = new Map();
  lines.forEach((l, k) => {
    const id = rowId(splitCells(l));
    if (id) byId.set(id, [...(byId.get(id) ?? []), k]);
  });
  const out = [];
  for (const [id, ks] of byId) {
    if (ks.length > 1 && ks.some((k) => addedSet.has(k))) out.push({ id, lines: ks.map((k) => k + 1), next: nextFreeId(lines, id[0]) });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------
// the record

/**
 * Do two listing entries hold the same file? Both present, then the same link text for a symbolic link (a link is
 * recorded, never followed) or the same SHA-256.
 */
export const sameEntry = (a, b) =>
  a !== undefined && b !== undefined && (a.symlink !== undefined ? a.symlink === b.symlink : a.sha256 === b.sha256);

/** created / changed / unchanged / deleted, or null when the path is in neither listing. */
export function statusOf(before, now) {
  if (before === undefined && now === undefined) return null;
  if (before === undefined) return 'created';
  if (now === undefined) return 'deleted';
  return sameEntry(before, now) ? 'unchanged' : 'changed';
}

export const recordPath = (root, id) => join(root, ...LANDED_DIR.split('/'), `${id}.json`);

/** Is a path (relative to plat/) a landed record, i.e. any direct child of docs/build/landed/? */
export const isRecordRel = (rel) => rel.startsWith(`${LANDED_DIR}/`) && !rel.slice(LANDED_DIR.length + 1).includes('/');

/**
 * Builds (and, with write, writes) the landed record of one seat. Returns { ok, code, problems, notes, record }.
 * opts: { item, lane, wave?, touched?: string[], whole?: string[], owns?: string[], now?: Date, write?: boolean }.
 */
export function buildRecord(root, opts) {
  const problems = [];
  const notes = [];
  const fail = (code) => ({ ok: false, code, problems, notes, record: null });
  const { item: id, lane } = opts;
  const touched = opts.touched ?? [];
  const whole = opts.whole ?? [];
  const declared = opts.owns ?? [];
  // An item id names its record's file as a label names its snapshot's: one grammar (validLabel).
  if (!validLabel(id)) problems.push(`invalid item id ${JSON.stringify(id)}`);
  if (typeof lane !== 'string' || !/^\S+$/.test(lane)) problems.push('--lane <lane key> is required (the key of the LANDED line)');
  if (opts.wave !== undefined && !validLabel(opts.wave)) problems.push(`invalid snapshot label ${JSON.stringify(opts.wave)}`);
  // (A seat without an item may declare no file when it only appended rows or CrossingRecords; checked below.)
  if (problems.length) return fail(64);

  const snapshot = opts.wave !== undefined ? readSnapshot(root, opts.wave) : latestSnapshot(root);
  if (snapshot === null) {
    problems.push(
      opts.wave !== undefined
        ? `no snapshot ${opts.wave}: the session takes it when the wave opens (corepack pnpm snapshot -- ${opts.wave})`
        : 'no wave snapshot under docs/build/landed/snapshots/: the session takes one when a wave opens (corepack pnpm snapshot -- wave-<n>)',
    );
    return fail(2);
  }

  const work = loadWork(root);
  const item = (work.items ?? []).find((it) => it.id === id) ?? null;
  let owns;
  if (item !== null) {
    if (declared.length > 0) problems.push(`${id} is an item of ${WORK_FILE}: its owns come from there, never from --owns`);
    owns = item.owns ?? [];
  } else {
    for (const p of declared) {
      if (!p.startsWith('plat/') || /[*{}<>]/.test(p) || p.endsWith('/') || p.split('/').includes('..')) {
        problems.push(`--owns ${p}: a declared path is one exact file under plat/ (no folder, no pattern)`);
        continue;
      }
      const others = anyOwners(work, p);
      if (others.length > 0) problems.push(`--owns ${p}: owned by ${others.join(', ')} in ${WORK_FILE}; only that item's record may claim it`);
      if (isAppendFile(fromPlat(p))) problems.push(`--owns ${p}: an append file is claimed by its lines, never declared`);
      if (isCrossingFile(fromPlat(p))) {
        problems.push(`--owns ${p}: a crossing file is attributed by its CrossingRecord in ${toPlat(CROSSINGS_FILE)}, never declared (C-0120)`);
      }
    }
    owns = declared;
  }
  if (problems.length) return fail(1);

  // A label that names no wave (flow-N, session-…) reads every wave as open: a passed-ownership path is its latest
  // owner's, the hand-over's receiver (C-0318; the reading of the session's staging, ownersAt at Infinity).
  let W = labelPosition(work, snapshot.label);
  if (W === null) {
    W = Number.POSITIVE_INFINITY;
    if (item !== null) {
      notes.push(
        `snapshot ${snapshot.label} names no wave of ${WORK_FILE}; ownership resolved with every wave open: a handed-over path is ` +
          'its latest owner\'s (C-0318)',
      );
    }
  }
  // An item landing before its own wave (a run item started early in a build wave, C-0121) owns its files and its
  // hand-overs as at its own wave; every other landing resolves at the open wave (a later wave's landing of the same
  // item included).
  const own = item !== null ? wavePosition(work, item.wave) : null;
  const at = own !== null && W !== null && own > W ? own : W;
  if (at !== W) notes.push(`${id} is of wave ${item.wave}, landing in ${snapshot.label}: its owns resolved at its own wave (C-0121)`);
  const mine = (path) => (item !== null ? ownersAt(work, path, at).includes(id) : declared.includes(path));

  // Files under the owns (append files are claimed by their lines; records are their own items'; crossing files by
  // their CrossingRecords, C-0120).
  const tree = listTree(root);
  const now = new Map([...tree].map(([rel, e]) => [toPlat(rel), e]));
  const before = new Map(Object.entries(snapshot.files ?? {}));
  const paths = [...new Set([...before.keys(), ...now.keys()])].sort(byCodeUnit);
  const files = [];
  const counts = { created: 0, changed: 0, unchanged: 0, deleted: 0 };
  const claimFile = (path) => {
    const status = statusOf(before.get(path), now.get(path));
    if (status === null) return;
    counts[status] += 1;
    const e = now.get(path);
    if (e === undefined) files.push({ path, status, sha256: null, was: before.get(path).sha256 ?? null });
    else if (e.symlink !== undefined) files.push({ path, status, symlink: e.symlink });
    else files.push({ path, status, sha256: e.sha256, size: e.size });
  };
  const unclaimed = [];
  for (const path of paths) {
    const rel = fromPlat(path);
    if (isAppendFile(rel) || isRecordRel(rel) || isCrossingFile(rel)) continue;
    if (mine(path)) claimFile(path);
    else if (statusOf(before.get(path), now.get(path)) !== 'unchanged') unclaimed.push(path);
  }
  for (const p of whole) {
    const rel = fromPlat(p);
    if (rel === null || !isAppendFile(rel)) problems.push(`--whole ${p}: only an append file is claimed whole`);
    else if (!mine(p)) problems.push(`--whole ${p}: not ${id}'s at ${snapshot.label}`);
    else claimFile(p);
  }

  // The permitted appends: this lane's rows, renumbered rows, the index lines of folders the item owns, and the
  // CrossingRecords whose checkerSeat names a ledger row of this lane (C-0120).
  const ledger = cleanRoomLines(root);
  const previous = existsSync(recordPath(root, id)) ? JSON.parse(readFileSync(recordPath(root, id), 'utf8')) : null;
  const carried = previous !== null && previous.wave === snapshot.label ? previous : null;
  const appendPaths = [...new Set([...Object.keys(snapshot.appendFiles ?? {}), ...[...now.keys()].filter((p) => isAppendFile(fromPlat(p)))])].sort(byCodeUnit);
  const appends = [];
  for (const path of appendPaths) {
    const d = appendDiff(root, snapshot, path);
    if (d.lines === null) continue;
    const addedSet = new Set(d.added);
    const isIndex = /\/src\/index\.ts$/.test(path);
    const isRecords = d.unit === 'record';
    const pkg = path.split('/')[2];
    // A module folder's line (well formed or not) is its folder owner's; the package index's owner claims the rest.
    const folderMine = (folder) => item !== null && ownersAt(work, `plat/packages/${pkg}/src/${folder}/index.ts`, at).includes(id);
    const ownIndex = isIndex && item !== null && mine(path);
    if (!isIndex && !isRecords) {
      for (const c of collisions(d.lines, addedSet)) {
        problems.push(
          `${path}: id ${c.id} is carried by the rows on lines ${c.lines.join(' and ')} — a collision. By the id rule (C-0104) ` +
            `the later row takes the next free id, ${c.next}, and says "renumbered from ${c.id} (collision) by ${lane}" in its ` +
            'reason column; the next writer renumbers it, then runs landed again',
        );
      }
    }
    // A re-landing in the same wave (under any lane) keeps every unit an earlier landing of the record claimed, under
    // the id that landing gave it (C-0111 (4), C-0306 (2)).
    // A package index's lines are claimed by ownership alone, never carried (C-0318): a hand-over since the earlier
    // landing moves a module folder's line to its receiver.
    const carriedIds = new Map();
    for (const a of (carried?.appends ?? []).filter((x) => x.file === path && !isIndex)) a.lines.forEach((h, i) => carriedIds.set(h, a.ids?.[i] ?? null));
    const ids = [];
    const lines = [];
    for (const k of d.added) {
      const line = d.lines[k];
      let claim = null;
      if (isIndex) {
        const m = INDEX_LINE.exec(line);
        const folder = m ? m[1] : (FOLDER_REF.exec(line)?.[1] ?? null);
        if (m && folderMine(m[1])) claim = m[1];
        else if (ownIndex && (folder === null || folderMine(folder))) claim = `line ${k + 1}`;
      } else if (isRecords) {
        const rec = d.invalid ? null : parseRecordUnit(line);
        const seat = rec === null ? null : ledgerSeat(ledger, rec.checkerSeat);
        if (seat !== null && seatNames(seat, lane)) claim = `${crossingFile(rec) ?? '(no file)'}@${String(rec.sha256 ?? '').slice(0, 12)}`;
      } else {
        const cells = splitCells(line);
        const col = cells ? seatColumn(d.lines, k) : -1;
        if ((col >= 0 && cells[col] !== undefined && seatNames(cells[col], lane)) || renumberedBy(line) === lane) claim = rowId(cells) ?? `line ${k + 1}`;
      }
      if (claim === null && carriedIds.has(d.hashes[k])) {
        claim = carriedIds.get(d.hashes[k]) ?? (isRecords ? `record ${k + 1}` : (rowId(splitCells(line)) ?? `line ${k + 1}`));
      }
      if (claim !== null) {
        ids.push(claim);
        lines.push(d.hashes[k]);
      }
    }
    // The snapshot's lines a seat removed: its placeholder rows; in a package index it owns, every removed line (C-0318).
    const removed = ownIndex ? d.removed.map((r) => d.old[r]) : lines.length > 0 ? d.removed.map((r) => d.old[r]).filter((h) => d.placeholders.has(h)) : [];
    if (lines.length > 0 || removed.length > 0) appends.push({ file: path, ids, lines, removed });
  }

  // A ledger row of this lane outside §2's table would be claimed by no record (C-0306 (1)): refuse, naming it.
  for (const s of strayLedgerRows(ledger, lane)) {
    const t = ledgerTable(ledger);
    problems.push(
      `plat/CLEAN-ROOM.md:${s.line}: ledger row ${s.id} names lane ${lane} but lies outside §2's seat-ledger table ` +
        `(${t === null ? 'the file has none under "## 2 "' : `lines ${t.start + 1} – ${t.end}`}) — move it into §2's table, ` +
        `then run landed again. The rule: ${LEDGER_RULE}`,
    );
  }

  for (const p of touched) {
    const rel = fromPlat(p);
    if (rel === null || rel.split('/').includes('..')) problems.push(`--touched ${p}: not a path under plat/`);
    else if (isAppendFile(rel) || rel === `${LANDED_DIR}/${id}.json`) continue;
    else if (isCrossingFile(rel)) problems.push(`${p}: a crossing file, attributed by its CrossingRecord, never by a seat's record (C-0120)`);
    else if (!mine(p)) {
      const others = item !== null ? ownersAt(work, p, W) : anyOwners(work, p);
      problems.push(
        `${p}: outside ${id}'s owns and the permitted appends` + (others.length ? ` (owned by ${others.join(', ')} at ${snapshot.label})` : ''),
      );
    }
  }
  if (item === null && owns.length === 0 && appends.length === 0) {
    problems.push(
      `${id} is no item of ${WORK_FILE} and claims nothing: a seat without an item declares its files with --owns <plat/path> ` +
        'or records the rows or CrossingRecords it appended',
    );
  }
  if (problems.length) return fail(1);

  if (unclaimed.length > 0) {
    notes.push(
      `${unclaimed.length} changed path(s) since ${snapshot.label} claimed by no owns of ${id} (another seat's — or yours outside ` +
        `your owns, which fails your check): ${unclaimed.slice(0, 12).join(', ')}${unclaimed.length > 12 ? ', …' : ''}`,
    );
  }
  const record = {
    schema: RECORD_SCHEMA,
    item: id,
    lane,
    lanes: [...new Set([...(carried?.lanes ?? []), lane])],
    wave: snapshot.label,
    snapshotTaken: snapshot.taken,
    date: (opts.now ?? new Date()).toISOString(),
    ownsSource: item !== null ? WORK_FILE : 'declared',
    owns,
    counts,
    files,
    appends,
  };
  if (opts.write !== false) {
    mkdirSync(join(root, ...LANDED_DIR.split('/')), { recursive: true });
    writeFileSync(recordPath(root, id), formatJson(record));
  }
  return { ok: true, code: 0, problems, notes, record };
}

/** Parses `<id> --lane <key> [--wave <label>] [--touched p]… [--whole p]… [--owns p]…`, or returns null. */
export function parseArgs(args) {
  const out = { touched: [], whole: [], owns: [] };
  const rest = [];
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    const flag = /^--(lane|wave|touched|whole|owns)$/.exec(a);
    if (flag) {
      const v = args[i + 1];
      if (v === undefined || v.startsWith('--')) return null;
      i += 1;
      if (flag[1] === 'lane' || flag[1] === 'wave') {
        if (out[flag[1]] !== undefined) return null;
        out[flag[1]] = v;
      } else out[flag[1]].push(v);
    } else if (a.startsWith('--')) return null;
    else rest.push(a);
  }
  if (rest.length !== 1 || out.lane === undefined) return null;
  out.item = rest[0];
  return out;
}

if (isMain(import.meta.url)) {
  const parsed = parseArgs(cliArgs(process.argv.slice(2)));
  if (parsed === null) {
    process.stderr.write(
      'usage: corepack pnpm landed -- <item id> --lane <lane key> [--wave <label>] [--touched <plat/path>]… ' +
        '[--whole <plat/path>]… [--owns <plat/path>]… (--owns only for a seat without an item)\n',
    );
    process.exit(64);
  }
  const r = buildRecord(PLAT_ROOT, parsed);
  for (const n of r.notes) process.stdout.write(`landed note: ${n}\n`);
  for (const p of r.problems) process.stderr.write(`landed: ${p}\n`);
  if (!r.ok) process.exit(r.code);
  const c = r.record.counts;
  const ap = r.record.appends.map((a) => `${a.file.replace(/^plat\//, '')} ${a.ids.join(', ')}`).join('; ') || 'none';
  process.stdout.write(
    `landed ${r.record.item} (lane ${r.record.lane}, against ${r.record.wave}): ${c.created} created, ${c.changed} changed, ` +
      `${c.unchanged} unchanged, ${c.deleted} deleted; appends: ${ap} → ${toPlat(`${LANDED_DIR}/${r.record.item}.json`)}\n`,
  );
}
