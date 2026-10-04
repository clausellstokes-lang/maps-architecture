#!/usr/bin/env node
// The flow steward's staging (J173; workflows/23-build-m0-waves.js flow mode). Stages EXACTLY the checked work the
// named landed records describe and nothing of a busy item, so a mid-run commit never carries unchecked code:
//   * a record's non-append files whole, each only if the tree still matches the record's hash, and never a path a
//     busy item's owns also match (a hand-over: the successor's commit carries it);
//   * the records themselves (plat/docs/build/landed/<id>.json);
//   * each line-append file (choices.md, CLEAN-ROOM.md, packages/*/src/index.ts) CUT to HEAD's lines plus the lines
//     the committed records claim (a HEAD line is dropped only where a committed record lists it as removed);
//   * crossings.json (its units are records) whole, and only when every record added since HEAD is claimed by a
//     committed record (or, absent at HEAD, when a committed item owns it);
//   * the flow's snapshot (--label) and docs/lane-events.log.
// usage: node tools/flow_stage.mjs [--items <id,...>] [--records <id,...>] [--busy <id,id,...>] [--label <snapshot label>] [--stage]
//        [--scratch <dir>]
// Without --stage it prints the plan; with --stage it stages the plan, re-reads every staged blob and compares it
// with the record's hash (or the cut text), and unstages the plan's paths and exits 1 on any mismatch. Exit 1 also
// when a record is missing or a committed file no longer matches its record. Prints one JSON object.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CROSSINGS_FILE, LANDED_DIR, SNAPSHOT_DIR, appendUnits, fromPlat, isAppendFile, lineHash, splitLines, toPlat } from '../plat/tools/landed/snapshot.mjs';
import { lcsDiff, loadWork, ownsMatch } from '../plat/tools/landed/landed.mjs';

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const PLAT = join(REPO, 'plat');
const argv = process.argv.slice(2);
const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined; };
const list = (k) => (opt(k) || '').split(',').map((s) => s.trim()).filter(Boolean);
// --items <id,...> expands each item to its own record and the records of its checks that exist on disk
// (check-<id>, check-<id>-notes, check-<id>-cutoff-notes); --records names further records (integration checks).
const ITEM_RECORDS = list('--items').flatMap((id) => [id, `check-${id}`, `check-${id}-notes`, `check-${id}-cutoff-notes`].filter((r, k) => k === 0 || existsSync(join(PLAT, ...LANDED_DIR.split('/'), `${r}.json`))));
const RECORDS = [...new Set([...ITEM_RECORDS, ...list('--records')])];
const BUSY = new Set(list('--busy'));
const LABEL = opt('--label');
const STAGE = argv.includes('--stage');
const SCRATCH = opt('--scratch') || join(tmpdir(), 'flow-stage');

const git = (args, input) => execFileSync('git', args, { cwd: REPO, input, encoding: input === undefined ? 'utf8' : undefined, stdio: ['pipe', 'pipe', 'pipe'], maxBuffer: 1 << 28 });
const sha = (buf) => createHash('sha256').update(buf).digest('hex');
const headText = (path) => { try { return execFileSync('git', ['show', `HEAD:${path}`], { cwd: REPO, stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 1 << 28 }).toString('utf8'); } catch { return null; } };
const headMode = (path) => { try { return git(['ls-tree', 'HEAD', '--', path]).split(/\s/)[0] || '100644'; } catch { return '100644'; } };
const abs = (p) => join(REPO, ...p.split('/'));

const work = loadWork(PLAT);
const busyOwners = (path) => (work.items ?? []).filter((it) => BUSY.has(it.id) && ownsMatch(it.owns ?? [], path)).map((it) => it.id);

const plan = []; // { path, how: 'add' | 'rm' | 'cut', sha256?, cutFile?, cutSha? }
const skipped = [];
const problems = [];
const claims = new Map(); // append file -> Map(hash -> count)
const removedClaims = new Map(); // append file -> Set(hash)
const committedItems = new Set();

for (const id of RECORDS) {
  const rp = `${toPlat(LANDED_DIR)}/${id}.json`;
  if (!existsSync(abs(rp))) { problems.push(`${rp}: no such record`); continue; }
  const rec = JSON.parse(readFileSync(abs(rp), 'utf8'));
  if (rec.ownsSource !== 'declared') committedItems.add(rec.item);
  plan.push({ path: rp, how: 'add' });
  for (const f of rec.files ?? []) {
    const rel = fromPlat(f.path);
    if (rel === null) { problems.push(`${id}: ${f.path} is not under plat/`); continue; }
    if (isAppendFile(rel)) continue;
    const busy = busyOwners(f.path);
    if (busy.length) { skipped.push({ path: f.path, why: `also owned by busy ${busy.join(', ')} (a hand-over: its commit carries it)` }); continue; }
    if (f.status === 'deleted') {
      if (existsSync(abs(f.path))) problems.push(`${f.path}: ${id}'s record says deleted, the tree has it`);
      else plan.push({ path: f.path, how: 'rm' });
      continue;
    }
    if (f.symlink !== undefined) { plan.push({ path: f.path, how: 'add' }); continue; }
    if (!existsSync(abs(f.path))) { problems.push(`${f.path}: in ${id}'s record, missing from the tree`); continue; }
    const now = sha(readFileSync(abs(f.path)));
    if (now !== f.sha256) { problems.push(`${f.path}: the tree no longer matches ${id}'s record (changed since it landed)`); continue; }
    plan.push({ path: f.path, how: 'add', sha256: f.sha256 });
  }
  for (const a of rec.appends ?? []) {
    const m = claims.get(a.file) ?? new Map();
    for (const h of a.lines) m.set(h, (m.get(h) ?? 0) + 1);
    claims.set(a.file, m);
    const r = removedClaims.get(a.file) ?? new Set();
    for (const h of a.removed ?? []) r.add(h);
    removedClaims.set(a.file, r);
  }
}

// line-append files: CUT to HEAD plus claimed lines
mkdirSync(SCRATCH, { recursive: true });
for (const [file, m] of claims) {
  const rel = fromPlat(file);
  if (rel === CROSSINGS_FILE) continue;
  if (!existsSync(abs(file))) { problems.push(`${file}: claimed lines but the file is missing`); continue; }
  const workText = readFileSync(abs(file), 'utf8');
  const head = headText(file);
  const a = head === null ? [] : splitLines(head);
  const b = splitLines(workText);
  const ah = a.map(lineHash);
  const bh = b.map(lineHash);
  const { removed, added } = lcsDiff(ah, bh);
  const rem = new Set(removed);
  const add = new Set(added);
  const left = new Map(m);
  const dropRemoved = removedClaims.get(file) ?? new Set();
  const out = [];
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && rem.has(i)) { if (!dropRemoved.has(ah[i])) out.push(a[i]); i += 1; }
    else if (j < b.length && add.has(j)) { const c = left.get(bh[j]) ?? 0; if (c > 0) { out.push(b[j]); left.set(bh[j], c - 1); } j += 1; }
    else { out.push(a[i]); i += 1; j += 1; }
  }
  const kept = new Set(out.map(lineHash));
  for (const [h, c] of left) if (c > 0 && !kept.has(h)) problems.push(`${file}: a claimed line ${h} is not in the working file`);
  const nl = workText.endsWith('\n') || (head ?? '').endsWith('\n');
  const text = out.join('\n') + (out.length && nl ? '\n' : '');
  if (head !== null && text === head) { skipped.push({ path: file, why: 'cut equals HEAD (claimed lines already committed)' }); continue; }
  const cutFile = join(SCRATCH, file.replace(/\//g, '__'));
  writeFileSync(cutFile, text);
  plan.push({ path: file, how: 'cut', cutFile, cutSha: sha(Buffer.from(text, 'utf8')), kept: out.length });
}

// crossings.json: whole, only when every record added since HEAD is claimed (or created by a committed owner)
{
  const file = toPlat(CROSSINGS_FILE);
  if (existsSync(abs(file))) {
    const workText = readFileSync(abs(file), 'utf8');
    const head = headText(file);
    if (head !== workText) {
      const owned = [...committedItems].some((id) => ownsMatch((work.items.find((it) => it.id === id) || {}).owns ?? [], file));
      const claimed = claims.get(file) ?? new Map();
      if (owned || claimed.size) {
        const wu = appendUnits(CROSSINGS_FILE, workText);
        const hu = head === null ? { units: [] } : appendUnits(CROSSINGS_FILE, head);
        if (wu.invalid) problems.push(`${file}: not a JSON array of CrossingRecords`);
        else {
          const { added } = lcsDiff(hu.units.map(lineHash), wu.units.map(lineHash));
          const unclaimed = added.filter((k) => !claimed.has(lineHash(wu.units[k])));
          if (unclaimed.length) skipped.push({ path: file, why: `${unclaimed.length} added record(s) claimed by no committed record` });
          else plan.push({ path: file, how: 'add', sha256: sha(Buffer.from(workText, 'utf8')) });
        }
      }
    }
  }
}

if (LABEL) {
  const snap = `${toPlat(SNAPSHOT_DIR)}/${LABEL}.json`;
  if (existsSync(abs(snap))) plan.push({ path: snap, how: 'add' });
}
plan.push({ path: 'docs/lane-events.log', how: 'add' });

const result = { records: RECORDS, busy: [...BUSY], plan: plan.map(({ path, how, kept }) => ({ path, how, ...(kept !== undefined ? { kept } : {}) })), skipped, problems, staged: false };
if (problems.length || !STAGE) {
  console.log(JSON.stringify(result, null, 1));
  process.exit(problems.length ? 1 : 0);
}

// stage, then verify every staged blob
const paths = [...new Set(plan.map((p) => p.path))];
try {
  for (const p of plan) {
    if (p.how === 'add') git(['add', '--', p.path]);
    else if (p.how === 'rm') git(['rm', '--cached', '--quiet', '--ignore-unmatch', '--', p.path]);
    else {
      const blob = git(['hash-object', '-w', '--', p.cutFile]).trim();
      git(['update-index', '--add', '--cacheinfo', `${headMode(p.path)},${blob},${p.path}`]);
    }
  }
  for (const p of plan) {
    if (p.how === 'rm' || (p.sha256 === undefined && p.cutSha === undefined)) continue;
    const staged = execFileSync('git', ['cat-file', 'blob', `:${p.path}`], { cwd: REPO, maxBuffer: 1 << 28 });
    const want = p.how === 'cut' ? p.cutSha : p.sha256;
    if (sha(staged) !== want) problems.push(`${p.path}: the staged blob differs from ${p.how === 'cut' ? 'the cut text' : 'the record'} (written between check and stage?)`);
  }
} catch (e) {
  problems.push(`staging failed: ${String(e.message || e).split('\n')[0]}`);
}
if (problems.length) {
  try { git(['reset', '-q', '--', ...paths]); } catch { /* best effort */ }
  result.problems = problems;
  result.unstaged = paths;
  console.log(JSON.stringify(result, null, 1));
  process.exit(1);
}
result.staged = true;
result.cached = git(['diff', '--cached', '--stat']).trim().split('\n').slice(-1)[0];
console.log(JSON.stringify(result, null, 1));
