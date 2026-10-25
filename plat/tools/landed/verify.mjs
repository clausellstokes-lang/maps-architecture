#!/usr/bin/env node
// `corepack pnpm landed:verify -- <label> [--item <id>]` (C-0104 (1), C-0111 (1), C-0120 (1)): attribution
// without git. With --item, the checker's steps (a) and (b) of M0.md §3 on one landed record: every path in it lies
// under the item's owns (or the seat's declared files) or is a permitted append, and every hash equals the tree now.
// Without --item, the wave's close: (a) and (b) on every record of the wave, then (c) every file that differs from the
// wave's snapshot — and every line added to or removed from an append file, a §2 ledger row among them — that no
// record of the wave claims is named (C-0306 (3)). A removed line is claimed when a record of the wave lists it as
// removed and it is a placeholder row, or it is a line of a package index (`packages/<p>/src/index.ts`): a module
// folder's C-0064 line by a record whose item owns that folder at the label (N-25), any other line by a record whose
// item owns the index (the owner's per-line edit, C-0318); any other removed or edited line is named. Ownership at a
// label is landed's reading: under a label that names no wave a receiver owns a handed-over path only once it has a
// record of the wave, else the giver does (N-24, J451); so a giver's entry for a path whose receiver has landed since,
// and whose receiver's record matches the tree, has lapsed — a note, never a mismatch. A crossing file (M-1's baselines.json, ng-faces.json,
// denylist.json, a digest file) is attributed instead by a CrossingRecord appended to crossings.json in the same wave,
// claimed by its countersigning seat's record, whose sha256 equals the file now; a crossing file is never deleted and
// never claimed by a record (C-0120 (4)).
// An unattributed change fails the wave's check and goes to the session, which alone runs git.
// Exit 0 clean, 1 problems named, 2 no snapshot, 64 usage.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  CROSSINGS_FILE,
  LANDED_DIR,
  PLAT_ROOT,
  RECORD_SCHEMA,
  WORK_FILE,
  byCodeUnit,
  cliArgs,
  fromPlat,
  isAppendFile,
  isCrossingFile,
  isMain,
  listTree,
  readSnapshot,
  toPlat,
  validLabel,
} from './snapshot.mjs';
import {
  anyOwners,
  appendDiff,
  claimantsAt,
  crossingFile,
  folderLines,
  isRecordRel,
  labelPosition,
  loadWork,
  ownsMatch,
  parseRecordUnit,
  sameEntry,
  statusOf,
  wavePosition,
} from './landed.mjs';

/** Every landed record under docs/build/landed/ (direct children), with the problems of the unreadable ones. */
export function readRecords(root) {
  const dir = join(root, ...LANDED_DIR.split('/'));
  const records = [];
  const problems = [];
  if (!existsSync(dir)) return { records, problems };
  for (const name of readdirSync(dir).sort(byCodeUnit)) {
    if (!name.endsWith('.json')) continue;
    const path = toPlat(`${LANDED_DIR}/${name}`);
    let r;
    try {
      r = JSON.parse(readFileSync(join(dir, name), 'utf8'));
    } catch (e) {
      problems.push(`${path}: not JSON (${e.message})`);
      continue;
    }
    if (r.schema !== RECORD_SCHEMA) problems.push(`${path}: schema ${JSON.stringify(r.schema)} is not ${RECORD_SCHEMA}`);
    else if (`${r.item}.json` !== name) problems.push(`${path}: names item ${r.item}; a record is named by its item`);
    else records.push({ path, record: r });
  }
  return { records, problems };
}

/** Does the tree match a record's entry now? A deleted entry by the file's absence, any other as sameEntry. */
const sameNow = (entry, now) => (entry.status === 'deleted' ? now === undefined : sameEntry(entry, now));

/**
 * Verifies a wave (or, with opts.item, one record of it) against the tree under root.
 * Returns { ok, code, problems, notes, summary }.
 */
export function verifyWave(root, label, opts = {}) {
  const problems = [];
  const notes = [];
  if (!validLabel(label)) return { ok: false, code: 64, problems: [`invalid label ${JSON.stringify(label)}`], notes, summary: null };
  const snapshot = readSnapshot(root, label);
  if (snapshot === null) {
    return { ok: false, code: 2, problems: [`no snapshot ${label} under docs/build/landed/snapshots/`], notes, summary: null };
  }
  const work = loadWork(root);
  // The open waves as landed reads them: a wave label the waves up to it, a label naming no wave every wave (C-0318).
  const W = labelPosition(work, label) ?? Number.POSITIVE_INFINITY;
  const now = new Map([...listTree(root)].map(([rel, e]) => [toPlat(rel), e]));
  const read = readRecords(root);
  problems.push(...read.problems);
  const ofWave = read.records.filter(({ record }) => record.wave === label);
  let scope = ofWave;
  if (opts.item !== undefined) {
    scope = ofWave.filter(({ record }) => record.item === opts.item);
    if (scope.length === 0) problems.push(`no landed record of ${opts.item} against ${label} (${toPlat(`${LANDED_DIR}/${opts.item}.json`)})`);
  }
  const mismatch = (msg) => (opts.item !== undefined ? problems : notes).push(msg);
  // Under a label that names no wave, the items with a record of it: a receiver claims a handed-over path only once
  // it is among them (landed's reading, N-24, J451); null under a wave label (ownersAt's reading).
  const landed = Number.isFinite(W) ? null : new Set(ofWave.filter(({ record }) => record.ownsSource !== 'declared').map(({ record }) => record.item));
  const atOf = (item) => {
    const own = item !== null ? wavePosition(work, item.wave) : null;
    return own !== null && own > W ? own : W;
  };
  // The records of the wave other than `record` whose item claims `path` now and whose entry for it matches the tree.
  const takenOverBy = (record, item, path) => {
    if (landed === null || item === null) return [];
    const claimants = claimantsAt(work, path, W, landed);
    if (claimants.includes(item.id)) return [];
    return ofWave
      .filter(({ record: r }) => r !== record && claimants.includes(r.item) && (r.files ?? []).some((g) => g.path === path && sameNow(g, now.get(path))))
      .map(({ record: r }) => r.item);
  };

  // (a) and (b): each record against its owns and the tree.
  for (const { path, record } of scope) {
    const item = (work.items ?? []).find((it) => it.id === record.item) ?? null;
    if (record.ownsSource === 'declared') {
      if (item !== null) problems.push(`${path}: ${record.item} is an item of ${WORK_FILE}, yet its record declares its owns`);
    } else if (item === null) problems.push(`${path}: ${record.item} is no item of ${WORK_FILE}`);
    for (const f of record.files ?? []) {
      const rel = fromPlat(f.path);
      if (rel === null) {
        problems.push(`${path}: ${f.path} is not under plat/`);
        continue;
      }
      const under =
        record.ownsSource === 'declared'
          ? (record.owns ?? []).includes(f.path) && anyOwners(work, f.path).length === 0
          : item !== null && ownsMatch(item.owns ?? [], f.path);
      if (!under) problems.push(`${path}: ${f.path} lies outside ${record.item}'s owns`);
      if (isCrossingFile(rel)) problems.push(`${path}: ${f.path} is a crossing file, attributed by its CrossingRecord, never by a record (C-0120)`);
      if (isAppendFile(rel) && record.ownsSource === 'declared') problems.push(`${path}: ${f.path} is an append file, claimed whole by a declared record`);
      if (!sameNow(f, now.get(f.path))) {
        const takers = record.ownsSource === 'declared' ? [] : takenOverBy(record, item, f.path);
        if (takers.length > 0) {
          notes.push(`${f.path}: handed over to ${takers.join(', ')}, whose record claims it now; ${record.item}'s entry has lapsed (N-24)`);
        } else mismatch(`${f.path}: the tree no longer matches ${record.item}'s record (${f.status} at landing; changed since)`);
      }
    }
    for (const a of record.appends ?? []) {
      const rel = fromPlat(a.file);
      if (rel === null || !isAppendFile(rel)) {
        problems.push(`${path}: ${a.file} is not a permitted append file`);
        continue;
      }
      const d = appendDiff(root, snapshot, a.file);
      const added = new Set(d.added.map((k) => d.hashes[k]));
      a.lines.forEach((h, i) => {
        if (!added.has(h)) mismatch(`${a.file}: ${record.item}'s appended ${a.ids[i] ?? h} is no longer an added line`);
      });
    }
  }

  // (c): the wave's close — every change since the snapshot claimed by a record of the wave.
  let changed = 0;
  let attributed = 0;
  if (opts.item === undefined) {
    // The CrossingRecords appended since the snapshot and claimed by a record of the wave (the countersigning seat's):
    // only such a record vouches for a crossing file.
    const crossings = appendDiff(root, snapshot, toPlat(CROSSINGS_FILE));
    const claimedCrossings = new Set(
      ofWave.flatMap(({ record }) => (record.appends ?? []).filter((a) => a.file === toPlat(CROSSINGS_FILE)).flatMap((a) => a.lines)),
    );
    const newCrossings =
      crossings.lines === null || crossings.invalid
        ? []
        : crossings.added.filter((k) => claimedCrossings.has(crossings.hashes[k])).map((k) => parseRecordUnit(crossings.lines[k])).filter((r) => r !== null);
    const claims = new Map();
    for (const { record } of ofWave) {
      for (const f of record.files ?? []) claims.set(f.path, [...(claims.get(f.path) ?? []), { record, f }]);
    }
    const before = new Map(Object.entries(snapshot.files ?? {}));
    const paths = [...new Set([...before.keys(), ...now.keys()])].sort(byCodeUnit);
    for (const path of paths) {
      const status = statusOf(before.get(path), now.get(path));
      if (status === null || status === 'unchanged') continue;
      changed += 1;
      const rel = fromPlat(path);
      const owners = (claims.get(path) ?? []).filter(({ f }) => sameNow(f, now.get(path)));
      if (isAppendFile(rel)) {
        const d = appendDiff(root, snapshot, path);
        const lineClaims = new Set();
        const removedClaims = new Set();
        const ownerRemoved = new Set();
        const packageIndex = /^packages\/[^/]+\/src\/index\.ts$/.test(rel);
        const pkg = rel.split('/')[1];
        const byLine = packageIndex ? folderLines(pkg, paths) : new Map();
        for (const { record } of ofWave) {
          const item = record.ownsSource === 'declared' ? null : ((work.items ?? []).find((it) => it.id === record.item) ?? null);
          const owner = packageIndex && item !== null && ownsMatch(item.owns ?? [], path);
          // A module folder's C-0064 line removed: vouched for by the folder's owner at the label (an item landing
          // before its own wave as at its own, C-0121; landed's reading of a hand-over, N-24), never by the index's
          // owner for another's folder (N-25).
          const at = atOf(item);
          const folderOwner = (h) => item !== null && claimantsAt(work, `plat/packages/${pkg}/src/${byLine.get(h)}/index.ts`, at, landed).includes(item.id);
          for (const a of record.appends ?? []) {
            if (a.file !== path) continue;
            a.lines.forEach((h) => lineClaims.add(h));
            for (const h of a.removed ?? []) {
              if (packageIndex && byLine.has(h)) {
                if (folderOwner(h)) ownerRemoved.add(h);
              } else (owner ? ownerRemoved : removedClaims).add(h);
            }
          }
        }
        const issues = [];
        const unit = d.unit === 'record' ? 'record' : 'line';
        if (d.lines === null) issues.push(`${path}: deleted since ${label}`);
        if (d.invalid) issues.push(`${path}: not a JSON array of CrossingRecords (C-0092, C-0120)`);
        for (const r of d.removed) {
          const h = d.old[r];
          if (!(ownerRemoved.has(h) || (d.placeholders.has(h) && removedClaims.has(h)))) issues.push(`${path}: ${unit} ${r + 1} of the snapshot's file removed or edited`);
        }
        for (const k of d.added) {
          if (!lineClaims.has(d.hashes[k])) {
            issues.push(`${path}:${unit === 'record' ? `record ${k + 1}` : k + 1} added, claimed by no record of ${label}: ${d.lines[k].slice(0, 100)}`);
          }
        }
        if (issues.length === 0) attributed += 1;
        else if (owners.length > 0) {
          attributed += 1;
          notes.push(`${path}: edited beyond appends, claimed whole by ${owners.map((o) => o.record.item).join(', ')}`);
        } else problems.push(...issues);
        continue;
      }
      if (isRecordRel(rel)) {
        const id = rel.slice(LANDED_DIR.length + 1, -'.json'.length);
        if (status !== 'deleted' && ofWave.some(({ record }) => record.item === id)) {
          attributed += 1;
          continue;
        }
      }
      if (isCrossingFile(rel)) {
        const sha = now.get(path)?.sha256;
        if (status === 'deleted') problems.push(`${path}: a crossing file deleted since ${label} (crossings are append-only, §17.1 (4); C-0120)`);
        else if (newCrossings.some((r) => crossingFile(r) === rel && String(r.sha256 ?? '').toLowerCase() === sha)) attributed += 1;
        else {
          problems.push(
            `${path}: ${status} since ${label}; no CrossingRecord appended to ${toPlat(CROSSINGS_FILE)} in this wave and claimed ` +
              `by its countersigning seat names it with its sha256 ${String(sha).slice(0, 12)}… (C-0120)`,
          );
        }
        continue;
      }
      if (owners.length > 0) {
        attributed += 1;
        if (owners.length > 1) notes.push(`${path}: claimed by ${owners.map((o) => o.record.item).join(' and ')}`);
        continue;
      }
      const stale = (claims.get(path) ?? []).map(({ record }) => record.item);
      problems.push(
        `${path}: ${status} since ${label}, claimed by no landed record of the wave` +
          (stale.length ? ` (${stale.join(', ')} recorded an earlier state)` : ''),
      );
    }
  }
  const summary = { label, records: scope.length, changed, attributed };
  return { ok: problems.length === 0, code: problems.length === 0 ? 0 : 1, problems, notes, summary };
}

if (isMain(import.meta.url)) {
  const args = cliArgs(process.argv.slice(2));
  let item;
  const rest = [];
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--item' && args[i + 1] !== undefined && item === undefined) item = args[(i += 1)];
    else rest.push(args[i]);
  }
  if (rest.length !== 1 || !validLabel(rest[0]) || rest[0].startsWith('--')) {
    process.stderr.write('usage: corepack pnpm landed:verify -- <label> [--item <id>]\n');
    process.exit(64);
  }
  const r = verifyWave(PLAT_ROOT, rest[0], { item });
  for (const n of r.notes) process.stdout.write(`landed:verify note: ${n}\n`);
  for (const p of r.problems) process.stderr.write(`landed:verify FAIL ${p}\n`);
  if (r.summary !== null) {
    const s = r.summary;
    process.stdout.write(
      item !== undefined
        ? `landed:verify ${s.label} --item ${item}: ${r.ok ? 'ok' : 'FAIL'} (${s.records} record)\n`
        : `landed:verify ${s.label}: ${r.ok ? 'ok' : 'FAIL'} — ${s.records} records, ${s.changed} changed paths, ${s.attributed} attributed\n`,
    );
  }
  process.exit(r.code);
}
