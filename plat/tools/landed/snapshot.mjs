#!/usr/bin/env node
// `corepack pnpm snapshot -- <label>` (M0-s-01's third fix round; C-0104, C-0111): the wave's listing that attribution
// is judged against. When a wave opens, the session runs it once (`snapshot -- wave-<n>`); it writes every file under
// plat/ — outside the exclusions below — with its SHA-256 and size to docs/build/landed/snapshots/<label>.json, and for
// the files that seats may append to (choices.md, CLEAN-ROOM.md, each package's src/index.ts) the hash of every line —
// for the CrossingRecords file (packages/testkit/baselines/crossings.json, a JSON array) the hash of every record — so
// `landed` and `landed:verify` can tell an appended row or record from an edit without git (C-0120). No seat edits a
// snapshot.
//
// Node built-ins only. Every path is read inside plat/: the root is this file's own plat/ (no --root option), and a
// symbolic link is recorded by its link text, never followed (§17.1 (3)).
import { createHash } from 'node:crypto';
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, readlinkSync, realpathSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PLAT_ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const LANDED_DIR = 'docs/build/landed';
export const SNAPSHOT_DIR = 'docs/build/landed/snapshots';
export const WORK_FILE = 'docs/build/M0-work.json';
export const SNAPSHOT_SCHEMA = 'plat-landed-snapshot/1';
export const RECORD_SCHEMA = 'plat-landed-record/1';

/** The exclusions (C-0104 (1) as refined by C-0111), in words, written into every snapshot. */
export const EXCLUDES = [
  'node_modules/ (any depth)',
  'coverage/ (any depth)',
  '*.tsbuildinfo',
  '.DS_Store',
  'packages/*/dist/ and bench/dist/ (build outputs; vendor/*/dist/ is vendored bytes and stays in)',
  'bench-out/',
  'docs/build/landed/snapshots/ (the session\'s own files)',
];

/** Is a path (POSIX, relative to plat/) outside the snapshot? Works for folders and files alike. */
export function isExcluded(rel) {
  const parts = rel.split('/');
  const base = parts[parts.length - 1];
  if (parts.includes('node_modules') || parts.includes('coverage')) return true;
  if (base === '.DS_Store' || base.endsWith('.tsbuildinfo')) return true;
  if (parts.length >= 3 && parts[0] === 'packages' && parts[2] === 'dist') return true;
  if (parts.length >= 2 && parts[0] === 'bench' && parts[1] === 'dist') return true;
  if (parts[0] === 'bench-out') return true;
  if (rel === SNAPSHOT_DIR || rel.startsWith(`${SNAPSHOT_DIR}/`)) return true;
  return false;
}

/** The CrossingRecords file (C-0092 (3)): a JSON array, one record appended by the countersigning seat per crossing. */
export const CROSSINGS_FILE = 'packages/testkit/baselines/crossings.json';

/**
 * The files seats may append to (C-0104 (4) as widened by C-0120): rows of choices.md and of CLEAN-ROOM.md (§2 – §5),
 * C-0064's index lines, and the records of crossings.json.
 */
export function isAppendFile(rel) {
  return (
    rel === 'docs/build/choices.md' ||
    rel === 'CLEAN-ROOM.md' ||
    rel === CROSSINGS_FILE ||
    /^packages\/[^/]+\/src\/index\.ts$/.test(rel)
  );
}

/**
 * M-1's crossing files at M0 (§17.1 (2), (4); C-0071, C-0120): the numbers-only files committed into
 * packages/testkit/baselines/ and every file of the digest but the scaffold's README. A change to one is attributed by a
 * CrossingRecord appended in the same wave whose sha256 equals the file — never by a landed record (a later milestone
 * that adds crossing files, §17.1 (4)'s goldens/d5/ and calibration/ among them, adds them here).
 */
export const CROSSING_FILES = [
  'packages/testkit/baselines/baselines.json',
  'packages/testkit/baselines/ng-faces.json',
  'packages/testkit/baselines/denylist.json',
];
export function isCrossingFile(rel) {
  return CROSSING_FILES.includes(rel) || (rel.startsWith('docs/digest/') && rel !== 'docs/digest/README.md');
}

/** A table row that stands in for an empty table ("| (none yet — …"); the first real row may replace it. */
export const PLACEHOLDER_ROW = /^\|\s*\(none yet\b/;

export const toPlat = (rel) => `plat/${rel}`;
export const fromPlat = (p) => (p.startsWith('plat/') ? p.slice('plat/'.length) : null);
export const byCodeUnit = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

export function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

/** A file's lines (split on \n; a final newline ends the last line rather than starting an empty one). */
export function splitLines(text) {
  const lines = text.split('\n');
  if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
  return lines;
}

/** The short line hash the snapshot and the records carry (64 bits of SHA-256: unique within one file). */
export function lineHash(line) {
  return sha256(Buffer.from(line, 'utf8')).slice(0, 16);
}

/**
 * Every file under root outside the exclusions, as a Map from the POSIX path relative to root to
 * { sha256, size } or, for a symbolic link, { symlink: <link text> } (never followed).
 */
export function listTree(root) {
  const out = new Map();
  const walk = (dirAbs, dirRel) => {
    for (const name of readdirSync(dirAbs).sort(byCodeUnit)) {
      const rel = dirRel === '' ? name : `${dirRel}/${name}`;
      if (isExcluded(rel)) continue;
      const abs = join(dirAbs, name);
      const st = lstatSync(abs);
      if (st.isSymbolicLink()) out.set(rel, { symlink: readlinkSync(abs) });
      else if (st.isDirectory()) walk(abs, rel);
      else if (st.isFile()) {
        const bytes = readFileSync(abs);
        out.set(rel, { sha256: sha256(bytes), size: bytes.length });
      }
    }
  };
  walk(root, '');
  return new Map([...out.entries()].sort(([a], [b]) => byCodeUnit(a, b)));
}

/** JSON with every object's keys in code-unit order and no white space: a record's identity whatever the layout. */
export function canonicalJson(v) {
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  if (Array.isArray(v)) return `[${v.map(canonicalJson).join(',')}]`;
  return `{${Object.keys(v).sort(byCodeUnit).map((k) => `${JSON.stringify(k)}:${canonicalJson(v[k])}`).join(',')}}`;
}

/**
 * The units of an append file: its lines, or for crossings.json its records (each as canonical JSON). A crossings file
 * that is not a JSON array is one unit naming its hash, `invalid` set, so any change to it is an edit, never an append.
 */
export function appendUnits(rel, text) {
  if (rel === CROSSINGS_FILE) {
    let v;
    try {
      v = JSON.parse(text);
    } catch {
      v = undefined;
    }
    if (!Array.isArray(v)) return { units: [`(not a JSON array) sha256 ${sha256(Buffer.from(text, 'utf8'))}`], invalid: true, unit: 'record' };
    return { units: v.map(canonicalJson), invalid: false, unit: 'record' };
  }
  return { units: splitLines(text), invalid: false, unit: 'line' };
}

/** The unit hashes of an append file, with the hashes of its placeholder rows. */
export function appendLines(text, rel = '') {
  const { units, unit } = appendUnits(rel, text);
  const out = {
    lines: units.map(lineHash),
    placeholders: [...new Set(units.filter((l) => PLACEHOLDER_ROW.test(l)).map(lineHash))],
  };
  return unit === 'record' ? { ...out, unit } : out;
}

/** A label is a file name: letters, digits, '.', '_' and '-', starting with a letter or digit. */
export function validLabel(label) {
  return typeof label === 'string' && /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(label);
}

/** The snapshot object for the tree under root (not written). */
export function takeSnapshot(root, label, now = new Date()) {
  if (!validLabel(label)) throw new Error(`invalid label ${JSON.stringify(label)}`);
  const tree = listTree(root);
  const files = {};
  const appendFiles = {};
  for (const [rel, entry] of tree) {
    files[toPlat(rel)] = entry;
    if (isAppendFile(rel) && entry.sha256 !== undefined) {
      appendFiles[toPlat(rel)] = appendLines(readFileSync(join(root, ...rel.split('/')), 'utf8'), rel);
    }
  }
  return {
    schema: SNAPSHOT_SCHEMA,
    label,
    taken: now.toISOString(),
    excludes: EXCLUDES,
    fileCount: tree.size,
    files,
    appendFiles,
  };
}

export const snapshotPath = (root, label) => join(root, ...SNAPSHOT_DIR.split('/'), `${label}.json`);

/** Takes and writes the snapshot; refuses to replace an existing one (a wave's listing is taken once). */
export function writeSnapshot(root, label, now = new Date()) {
  const path = snapshotPath(root, label);
  if (existsSync(path)) {
    return { ok: false, problem: `${toPlat(`${SNAPSHOT_DIR}/${label}.json`)} exists: a wave's snapshot is taken once` };
  }
  const snap = takeSnapshot(root, label, now);
  mkdirSync(join(root, ...SNAPSHOT_DIR.split('/')), { recursive: true });
  writeFileSync(path, formatJson(snap));
  return { ok: true, snapshot: snap, path };
}

export function readSnapshot(root, label) {
  const path = snapshotPath(root, label);
  if (!existsSync(path)) return null;
  const snap = JSON.parse(readFileSync(path, 'utf8'));
  if (snap.schema !== SNAPSHOT_SCHEMA) throw new Error(`${label}.json: schema ${snap.schema} is not ${SNAPSHOT_SCHEMA}`);
  return snap;
}

/** The newest snapshot by its `taken` time (ties by label), or null when none exists. */
export function latestSnapshot(root) {
  const dir = join(root, ...SNAPSHOT_DIR.split('/'));
  if (!existsSync(dir)) return null;
  let best = null;
  for (const name of readdirSync(dir).sort(byCodeUnit)) {
    if (!name.endsWith('.json')) continue;
    const snap = readSnapshot(root, name.slice(0, -'.json'.length));
    if (snap && (best === null || snap.taken > best.taken || (snap.taken === best.taken && snap.label > best.label))) best = snap;
  }
  return best;
}

/**
 * JSON with two-space indentation, except that an array of primitives or an object whose values are all primitives is
 * written on one line — so a snapshot or record carries one file per line and diffs line by line.
 */
export function formatJson(value) {
  const prim = (v) => v === null || typeof v !== 'object';
  const flat = (v) => (Array.isArray(v) ? v.every(prim) : Object.values(v).every(prim));
  const fmt = (v, ind) => {
    if (prim(v)) return JSON.stringify(v);
    if (flat(v)) {
      if (Array.isArray(v)) return `[${v.map((x) => JSON.stringify(x)).join(', ')}]`;
      return `{ ${Object.entries(v).map(([k, x]) => `${JSON.stringify(k)}: ${JSON.stringify(x)}`).join(', ')} }`.replace('{  }', '{}');
    }
    const pad = ' '.repeat(ind + 2);
    if (Array.isArray(v)) return `[\n${v.map((x) => pad + fmt(x, ind + 2)).join(',\n')}\n${' '.repeat(ind)}]`;
    return `{\n${Object.entries(v).map(([k, x]) => `${pad}${JSON.stringify(k)}: ${fmt(x, ind + 2)}`).join(',\n')}\n${' '.repeat(ind)}}`;
  };
  return `${fmt(value, 0)}\n`;
}

/** The arguments after pnpm's optional `--`. */
export function cliArgs(argv) {
  return argv[0] === '--' ? argv.slice(1) : argv;
}

/** Is the module at `url` the script node was started with? (Real paths compared: /tmp is a link on macOS.) */
export const isMain = (url) => {
  if (!process.argv[1]) return false;
  try {
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(url));
  } catch {
    return false;
  }
};

if (isMain(import.meta.url)) {
  const args = cliArgs(process.argv.slice(2));
  if (args.length !== 1 || !validLabel(args[0])) {
    process.stderr.write('usage: corepack pnpm snapshot -- <label>   (the label is a file name, e.g. wave-2)\n');
    process.exit(64);
  }
  const r = writeSnapshot(PLAT_ROOT, args[0]);
  if (!r.ok) {
    process.stderr.write(`snapshot: ${r.problem}\n`);
    process.exit(1);
  }
  const appendCount = Object.keys(r.snapshot.appendFiles).length;
  process.stdout.write(
    `snapshot ${args[0]}: ${r.snapshot.fileCount} files (${appendCount} append files line-hashed) → ` +
      `${toPlat(`${SNAPSHOT_DIR}/${args[0]}.json`)}\n`,
  );
}
