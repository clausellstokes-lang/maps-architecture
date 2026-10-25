// The attribution tools (C-0104, C-0111, C-0120, C-0121, C-0306). The snapshot covers every file outside its
// exclusions with its SHA-256; `landed` writes a seat's record with each status and its appended lines, and refuses a
// path outside its owns and the permitted appends, naming it; `landed:verify` passes a fully attributed wave and names
// every unattributed change; no tool reads a path outside plat/ (a symbolic link is recorded, never followed; no CLI
// takes a root). M-1's crossings: a crossing file attributed by the CrossingRecord appended in its wave, that record
// and the CLEAN-ROOM.md §2 – §5 rows claimed by the appending seat's lane, a seat that only appended recording without
// --owns — and a run item landing before its own wave. A ledger row outside §2's table is refused, and a re-landed
// record keeps its earlier claims. A passed-ownership path is its receiver's under a wave label at or past the hand-over
// and under a label that names no wave, and the package index's owner claims its own edits there line by line (C-0318).
// Every case runs on a fixture tree in the OS temporary folder; the CLIs are spawned only on arguments that write
// nothing.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { CROSSINGS_FILE, PLAT_ROOT, canonicalJson, isCrossingFile, isExcluded, lineHash, takeSnapshot, validLabel, writeSnapshot } from './snapshot.mjs';
import {
  buildRecord,
  labelPosition,
  lcsDiff,
  LEDGER_RULE,
  ledgerSeat,
  ledgerTable,
  loadWork,
  ownersAt,
  parseArgs,
  parseOwnsEntry,
  patternMatches,
  seatColumn,
  splitCells,
  strayLedgerRows,
} from './landed.mjs';
import { verifyWave } from './verify.mjs';

const roots = [];
afterEach(() => {
  while (roots.length) rmSync(roots.pop(), { recursive: true, force: true });
});

const sha = (s) => createHash('sha256').update(s).digest('hex');

const WORK = {
  waves: [
    { wave: 0, items: ['M0-s-01'] },
    { wave: 1, items: ['M0-a-01', 'M0-a-02'] },
    { wave: 'T', items: [] },
  ],
  items: [
    {
      id: 'M0-s-01',
      wave: 0,
      owns: [
        'plat/package.json',
        'plat/packages/{kernel,model}/src/index.ts',
        'plat/packages/*/src/<module>/index.ts (created empty; ownership passes to the folder\'s owner, C-0013)',
      ],
    },
    { id: 'M0-a-01', wave: 1, owns: ['plat/packages/kernel/src/num/', 'plat/packages/kernel/test/num/'] },
    { id: 'M0-a-02', wave: 1, owns: ['plat/packages/kernel/src/arena/ (the arena; its index.ts created empty by the scaffold)'] },
  ],
};

const CHOICES = [
  '# choices.md',
  '',
  '| id | date | seat | section | the choice | the reason | test that holds it |',
  '|---|---|---|---|---|---|---|',
  '| C-0001 | 2026-10-03 | build/m0-spec | §1 | one | because | t |',
  '',
].join('\n');

const CLEAN_ROOM = [
  '# CLEAN-ROOM.md',
  '',
  '## 2 Seat ledger',
  '',
  '| # | seat (lane key / model) | date | role | what it read | notes |',
  '|---|---|---|---|---|---|',
  '| L-0001 | build/m0-spec (Opus) | 2026-10-03 | spec | ARCHITECTURE | — |',
  '',
  '## 5 Published sources',
  '',
  '| # | algorithm | URL | SHA-256 | date | seat | made from it |',
  '|---|---|---|---|---|---|---|',
  '| (none yet — a later seat enters the first source) | | | | | | |',
  '',
].join('\n');

/** A fixture plat/ tree in the OS temporary folder (written by the test; never an input of the build). */
function fixture(extra = {}) {
  const root = mkdtempSync(join(tmpdir(), 'plat-landed-test-'));
  roots.push(root);
  const files = {
    'package.json': '{ "name": "fixture" }\n',
    'packages/kernel/src/index.ts': "// kernel index\nexport * from './num/index.js';\n",
    'packages/kernel/src/num/index.ts': '',
    'packages/kernel/src/num/old.ts': 'export const a = 1;\n',
    'packages/kernel/src/num/gone.ts': 'export const g = 1;\n',
    'packages/kernel/src/arena/index.ts': '',
    'packages/model/src/index.ts': '// model index\n',
    'docs/build/choices.md': CHOICES,
    'docs/build/M0-work.json': `${JSON.stringify(WORK, null, 2)}\n`,
    'CLEAN-ROOM.md': CLEAN_ROOM,
    ...extra,
  };
  for (const [rel, text] of Object.entries(files)) write(root, rel, text);
  return root;
}

function write(root, rel, text) {
  const abs = join(root, ...rel.split('/'));
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, text);
}
const read = (root, rel) => readFileSync(join(root, ...rel.split('/')), 'utf8');
const replaceIn = (root, rel, from, to) => write(root, rel, read(root, rel).replace(from, to));

/** Seat M0-a-01's work in wave 1: one change, one creation, one deletion, a test, a choices row, two ledger rows. */
function seatA01(root) {
  write(root, 'packages/kernel/src/num/old.ts', 'export const a = 2;\n');
  write(root, 'packages/kernel/src/num/new.ts', 'export const n = 1;\n');
  unlinkSync(join(root, 'packages', 'kernel', 'src', 'num', 'gone.ts'));
  write(root, 'packages/kernel/test/num/a.test.ts', 'export {};\n');
  appendFileSync(join(root, 'docs', 'build', 'choices.md'), '| C-0002 | 2026-10-03 | build/m0-a-01 | §3.2 | two | why | a.test.ts |\n');
  replaceIn(root, 'CLEAN-ROOM.md', '| L-0001 | build/m0-spec (Opus) | 2026-10-03 | spec | ARCHITECTURE | — |\n',
    '| L-0001 | build/m0-spec (Opus) | 2026-10-03 | spec | ARCHITECTURE | — |\n| L-0002 | build/m0-a-01 (Opus) | 2026-10-03 | numeric core | §3.1 | — |\n');
  replaceIn(root, 'CLEAN-ROOM.md', /\| \(none yet[^\n]*\n/, '| S-0001 | Shewchuk\'s predicates | https://example.org | 00 | 2026-10-03 | build/m0-a-01 | the adapter |\n');
}

/** Seat M0-a-02's work in wave 1: the arena folder (its index.ts handed over by the scaffold), its index line, a row. */
function seatA02(root) {
  write(root, 'packages/kernel/src/arena/index.ts', "export * from './plat.js';\n");
  write(root, 'packages/kernel/src/arena/plat.ts', 'export const p = 1;\n');
  appendFileSync(join(root, 'packages', 'kernel', 'src', 'index.ts'), "export * from './arena/index.js';\n");
  appendFileSync(join(root, 'docs', 'build', 'choices.md'), '| C-0003 | 2026-10-03 | build/m0-a-02 (Opus) | §2.2 | three | why | arena.test.ts |\n');
}

describe('the snapshot (C-0104 (1), C-0111)', () => {
  it('covers every file outside the exclusions with its sha256 and size, and line-hashes the append files', () => {
    const root = fixture({
      'packages/kernel/dist/index.js': 'built\n',
      'bench/dist/b.js': 'built\n',
      'vendor/lib@1.0.0/dist/lib.js': 'vendored bytes\n',
      'node_modules/x/index.js': 'x\n',
      'packages/kernel/node_modules/y/index.js': 'y\n',
      'coverage/c.json': '{}\n',
      'packages/kernel/tsconfig.tsbuildinfo': '{}\n',
      '.DS_Store': 'x',
      'bench-out/o.txt': 'o\n',
      'docs/build/landed/snapshots/older.json': '{}\n',
      'docs/build/landed/M0-zz-00.json': '{}\n',
    });
    const snap = takeSnapshot(root, 'wave-1', new Date('2026-10-03T12:00:00Z'));
    expect(Object.keys(snap.files).sort()).toEqual([
      'plat/CLEAN-ROOM.md',
      'plat/docs/build/M0-work.json',
      'plat/docs/build/choices.md',
      'plat/docs/build/landed/M0-zz-00.json',
      'plat/package.json',
      'plat/packages/kernel/src/arena/index.ts',
      'plat/packages/kernel/src/index.ts',
      'plat/packages/kernel/src/num/gone.ts',
      'plat/packages/kernel/src/num/index.ts',
      'plat/packages/kernel/src/num/old.ts',
      'plat/packages/model/src/index.ts',
      'plat/vendor/lib@1.0.0/dist/lib.js',
    ]);
    expect(snap.fileCount).toBe(12);
    expect(snap.files['plat/package.json']).toEqual({ sha256: sha('{ "name": "fixture" }\n'), size: 22 });
    expect(Object.keys(snap.appendFiles).sort()).toEqual([
      'plat/CLEAN-ROOM.md', 'plat/docs/build/choices.md', 'plat/packages/kernel/src/index.ts', 'plat/packages/model/src/index.ts',
    ]);
    expect(snap.appendFiles['plat/docs/build/choices.md'].lines).toEqual(CHOICES.split('\n').slice(0, -1).map(lineHash));
    expect(snap.appendFiles['plat/CLEAN-ROOM.md'].placeholders).toHaveLength(1);
    expect(snap.label).toBe('wave-1');
    expect(snap.taken).toBe('2026-10-03T12:00:00.000Z');
  });

  it('records a symbolic link by its text and never follows it out of the tree (§17.1 (3))', () => {
    const root = fixture();
    const outside = mkdtempSync(join(tmpdir(), 'plat-landed-outside-'));
    roots.push(outside);
    writeFileSync(join(outside, 'secret.txt'), 'outside plat\n');
    symlinkSync(join(outside, 'secret.txt'), join(root, 'link.txt'));
    symlinkSync(outside, join(root, 'linkdir'));
    const snap = takeSnapshot(root, 'wave-1');
    expect(snap.files['plat/link.txt']).toEqual({ symlink: join(outside, 'secret.txt') });
    expect(snap.files['plat/linkdir']).toEqual({ symlink: outside });
    expect(Object.keys(snap.files).some((p) => p.includes('secret'))).toBe(false);
  });

  it('is taken once per label, and a label is a plain file name', () => {
    const root = fixture();
    expect(writeSnapshot(root, 'wave-1').ok).toBe(true);
    const again = writeSnapshot(root, 'wave-1');
    expect(again.ok).toBe(false);
    expect(again.problem).toContain('a wave\'s snapshot is taken once');
    for (const bad of ['', '../wave-1', 'a/b', '-x', 'wave 1']) expect(validLabel(bad), bad).toBe(false);
    expect(() => takeSnapshot(root, '../escape')).toThrow(/invalid label/);
  });

  it('excludes exactly the build outputs, never the vendored dist/', () => {
    expect(isExcluded('packages/kernel/dist')).toBe(true);
    expect(isExcluded('vendor/flatbush@4.6.2/dist')).toBe(false);
    expect(isExcluded('docs/build/landed/snapshots/wave-2.json')).toBe(true);
    expect(isExcluded('docs/build/landed/M0-a-01.json')).toBe(false);
  });
});

describe('owns entries and hand-overs (C-0104 (2))', () => {
  it('reads the comment, braces, wildcards and folders of an owns entry', () => {
    const e = parseOwnsEntry('plat/packages/{kernel,model}/src/<module>/index.ts (created empty; passes, C-0013)');
    expect(e.head).toBe('plat/packages/{kernel,model}/src/<module>/index.ts');
    expect(e.patterns).toHaveLength(2);
    expect(patternMatches(e.patterns[0], 'plat/packages/kernel/src/num/index.ts')).toBe(true);
    expect(patternMatches(e.patterns[0], 'plat/packages/site/src/num/index.ts')).toBe(false);
    expect(patternMatches(e.patterns[0], 'plat/packages/kernel/src/num/old.ts')).toBe(false);
    const folder = parseOwnsEntry('plat/tools/landed/').patterns[0];
    expect(patternMatches(folder, 'plat/tools/landed/landed.mjs')).toBe(true);
    expect(patternMatches(folder, 'plat/tools/landed')).toBe(false);
    expect(patternMatches(folder, 'plat/tools/landedx/a.mjs')).toBe(false);
  });

  it('gives a handed-over file to the latest owner whose wave is open', () => {
    const at = (p, label) => ownersAt(WORK, p, labelPosition(WORK, label));
    expect(at('plat/packages/kernel/src/arena/index.ts', 'wave-0')).toEqual(['M0-s-01']);
    expect(at('plat/packages/kernel/src/arena/index.ts', 'wave-1')).toEqual(['M0-a-02']);
    expect(at('plat/packages/kernel/src/arena/index.ts', 'wave-T')).toEqual(['M0-a-02']);
    expect(labelPosition(WORK, 'wave-t')).toBe(2);
    expect(labelPosition(WORK, 'session-extra')).toBe(null);
  });

  it('parses every owns entry of the committed M0-work.json to plat/ paths, and resolves its hand-overs', () => {
    const work = loadWork(PLAT_ROOT);
    for (const item of work.items) {
      for (const o of item.owns) {
        for (const p of parseOwnsEntry(o).patterns) {
          expect(p.segments[0], `${item.id}: ${o}`).toBe('plat');
          expect(p.segments.filter((s) => s !== null && /[\s{}*<>()]/.test(s)), `${item.id}: ${o}`).toEqual([]);
        }
      }
    }
    expect(ownersAt(work, 'plat/tools/lint/index.mjs', labelPosition(work, 'wave-0'))).toEqual(['M0-s-01']);
    expect(ownersAt(work, 'plat/tools/lint/index.mjs', labelPosition(work, 'wave-1'))).toEqual(['M0-d-07']);
    expect(ownersAt(work, 'plat/tools/landed/landed.mjs', labelPosition(work, 'wave-1'))).toEqual(['M0-s-01']);
  });

  it('diffs line hashes by longest common subsequence', () => {
    expect(lcsDiff(['a', 'b', 'c'], ['a', 'x', 'b', 'c', 'y'])).toEqual({ removed: [], added: [1, 4] });
    expect(lcsDiff(['a', 'p', 'c'], ['a', 'c', 'r'])).toEqual({ removed: [1], added: [2] });
  });
});

describe('landed — the seat\'s record (C-0104 (2), (4))', () => {
  it('writes the record with every status and the seat\'s own appended lines', () => {
    const root = fixture();
    writeSnapshot(root, 'wave-1');
    seatA01(root);
    seatA02(root);
    const r = buildRecord(root, { item: 'M0-a-01', lane: 'build/m0-a-01', now: new Date('2026-10-03T13:00:00Z') });
    expect(r.problems).toEqual([]);
    expect(r.ok).toBe(true);
    const status = Object.fromEntries(r.record.files.map((f) => [f.path, f.status]));
    expect(status).toEqual({
      'plat/packages/kernel/src/num/gone.ts': 'deleted',
      'plat/packages/kernel/src/num/index.ts': 'unchanged',
      'plat/packages/kernel/src/num/new.ts': 'created',
      'plat/packages/kernel/src/num/old.ts': 'changed',
      'plat/packages/kernel/test/num/a.test.ts': 'created',
    });
    expect(r.record.counts).toEqual({ created: 2, changed: 1, unchanged: 1, deleted: 1 });
    expect(r.record.files.find((f) => f.status === 'changed').sha256).toBe(sha('export const a = 2;\n'));
    const appends = Object.fromEntries(r.record.appends.map((a) => [a.file, a.ids]));
    expect(appends).toEqual({ 'plat/CLEAN-ROOM.md': ['L-0002', 'S-0001'], 'plat/docs/build/choices.md': ['C-0002'] });
    expect(r.record.appends.find((a) => a.file === 'plat/CLEAN-ROOM.md').removed).toHaveLength(1); // the placeholder
    expect(r.record).toMatchObject({ item: 'M0-a-01', lane: 'build/m0-a-01', wave: 'wave-1', ownsSource: 'docs/build/M0-work.json' });
    expect(r.notes.join('\n')).toContain('plat/packages/kernel/src/arena/plat.ts'); // a-02's, named as not a-01's
    const written = JSON.parse(read(root, 'docs/build/landed/M0-a-01.json'));
    expect(written.files).toEqual(r.record.files);
  });

  it('gives a folder\'s index line to the folder\'s owner and the handed-over index.ts to the receiver', () => {
    const root = fixture();
    writeSnapshot(root, 'wave-1');
    seatA02(root);
    const r = buildRecord(root, { item: 'M0-a-02', lane: 'build/m0-a-02' });
    expect(r.ok).toBe(true);
    expect(r.record.files.map((f) => `${f.path} ${f.status}`)).toEqual([
      'plat/packages/kernel/src/arena/index.ts changed',
      'plat/packages/kernel/src/arena/plat.ts created',
    ]);
    expect(r.record.appends.map((a) => [a.file, a.ids])).toEqual([
      ['plat/docs/build/choices.md', ['C-0003']],
      ['plat/packages/kernel/src/index.ts', ['arena']],
    ]);
    const scaffold = buildRecord(root, { item: 'M0-s-01', lane: 'build/m0-scaffold-fix9', write: false });
    expect(scaffold.record.files.map((f) => f.path)).toEqual(['plat/package.json']); // the indexes are append files
    expect(scaffold.record.appends).toEqual([]);
  });

  it('refuses a touched path outside the owns and the permitted appends, naming it and its owner', () => {
    const root = fixture();
    writeSnapshot(root, 'wave-1');
    seatA01(root);
    const r = buildRecord(root, {
      item: 'M0-a-01',
      lane: 'build/m0-a-01',
      touched: ['plat/packages/kernel/src/num/new.ts', 'plat/docs/build/choices.md', 'plat/packages/kernel/src/arena/plat.ts', 'plat/README.md'],
    });
    expect(r.ok).toBe(false);
    expect(r.code).toBe(1);
    expect(r.problems).toEqual([
      'plat/packages/kernel/src/arena/plat.ts: outside M0-a-01\'s owns and the permitted appends (owned by M0-a-02 at wave-1)',
      'plat/README.md: outside M0-a-01\'s owns and the permitted appends',
    ]);
    expect(existsSync(join(root, 'docs', 'build', 'landed', 'M0-a-01.json'))).toBe(false);
    expect(buildRecord(root, { item: 'M0-a-01', lane: 'build/m0-a-01', touched: ['plat/../outside.txt'] }).problems[0]).toContain('not a path under plat/');
  });

  it('refuses a collision of ids, naming the next free id, and accepts the renumbered row (the id rule)', () => {
    const root = fixture();
    writeSnapshot(root, 'wave-1');
    appendFileSync(join(root, 'docs', 'build', 'choices.md'), '| C-0002 | 2026-10-03 | build/m0-a-01 | §3 | x | y | z |\n');
    appendFileSync(join(root, 'docs', 'build', 'choices.md'), '| C-0002 | 2026-10-03 | build/m0-a-02 | §2 | x | y | z |\n');
    const r = buildRecord(root, { item: 'M0-a-02', lane: 'build/m0-a-02' });
    expect(r.ok).toBe(false);
    expect(r.problems[0]).toContain('id C-0002 is carried by the rows on lines 6 and 7 — a collision');
    expect(r.problems[0]).toContain('the next free id, C-0003');
    replaceIn(root, 'docs/build/choices.md', '| C-0002 | 2026-10-03 | build/m0-a-02 | §2 | x | y | z |',
      '| C-0003 | 2026-10-03 | build/m0-a-02 | §2 | x | y (renumbered from C-0002 (collision) by build/m0-a-02) | z |');
    const again = buildRecord(root, { item: 'M0-a-02', lane: 'build/m0-a-02' });
    expect(again.problems).toEqual([]);
    expect(again.record.appends[0].ids).toEqual(['C-0003']);
  });

  it('exits 2 without a snapshot and 64 on bad arguments', () => {
    const root = fixture();
    expect(buildRecord(root, { item: 'M0-a-01', lane: 'build/m0-a-01' }).code).toBe(2);
    expect(buildRecord(root, { item: '../M0-a-01', lane: 'build/m0-a-01' }).code).toBe(64);
    expect(buildRecord(root, { item: 'M0-a-01' }).code).toBe(64);
    expect(parseArgs(['M0-a-01', '--lane', 'build/x', '--touched', 'plat/a', '--touched', 'plat/b'])).toMatchObject({
      item: 'M0-a-01', lane: 'build/x', touched: ['plat/a', 'plat/b'],
    });
    expect(parseArgs(['M0-a-01', '--root', '/tmp'])).toBe(null);
    expect(parseArgs(['M0-a-01', '--lane'])).toBe(null);
  });

  it('lets a seat without an item (a checker) declare exact files no item owns', () => {
    const root = fixture();
    writeSnapshot(root, 'wave-1');
    write(root, 'docs/build/checks/M0-a-01.md', '# check\n');
    replaceIn(root, 'CLEAN-ROOM.md', '| L-0001 | build/m0-spec (Opus) | 2026-10-03 | spec | ARCHITECTURE | — |\n',
      '| L-0001 | build/m0-spec (Opus) | 2026-10-03 | spec | ARCHITECTURE | — |\n| L-0002 | build/m0-check-a-01 (Opus) | 2026-10-03 | checker | M0-a-01 | — |\n');
    const r = buildRecord(root, { item: 'check-M0-a-01', lane: 'build/m0-check-a-01', owns: ['plat/docs/build/checks/M0-a-01.md'] });
    expect(r.problems).toEqual([]);
    expect(r.record.ownsSource).toBe('declared');
    expect(r.record.files.map((f) => `${f.path} ${f.status}`)).toEqual(['plat/docs/build/checks/M0-a-01.md created']);
    expect(r.record.appends.map((a) => a.ids)).toEqual([['L-0002']]);
    const grab = buildRecord(root, { item: 'check-M0-a-01', lane: 'build/m0-check-a-01', owns: ['plat/packages/kernel/src/num/old.ts'] });
    expect(grab.problems[0]).toContain('owned by M0-a-01');
    expect(buildRecord(root, { item: 'M0-a-01', lane: 'build/m0-a-01', owns: ['plat/x.md'] }).problems[0]).toContain('never from --owns');
  });
});

describe('landed:verify — the wave\'s close (C-0104 (3))', () => {
  function landedWave() {
    const root = fixture();
    writeSnapshot(root, 'wave-1');
    seatA01(root);
    seatA02(root);
    expect(buildRecord(root, { item: 'M0-a-01', lane: 'build/m0-a-01' }).ok).toBe(true);
    expect(buildRecord(root, { item: 'M0-a-02', lane: 'build/m0-a-02' }).ok).toBe(true);
    return root;
  }

  it('passes a fully attributed wave, the records themselves included', () => {
    const root = landedWave();
    const r = verifyWave(root, 'wave-1');
    expect(r.problems).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.summary).toEqual({ label: 'wave-1', records: 2, changed: 11, attributed: 11 });
    expect(verifyWave(root, 'wave-1', { item: 'M0-a-01' }).ok).toBe(true);
  });

  it('names an unattributed changed file, an unclaimed row and an edited row', () => {
    const root = landedWave();
    write(root, 'package.json', '{ "name": "changed by nobody\'s record" }\n');
    appendFileSync(join(root, 'docs', 'build', 'choices.md'), '| C-0004 | 2026-10-03 | build/m0-zz | §0 | stray | why | t |\n');
    replaceIn(root, 'docs/build/choices.md', '| C-0001 | 2026-10-03 | build/m0-spec | §1 | one |', '| C-0001 | 2026-10-03 | build/m0-spec | §1 | edited |');
    const r = verifyWave(root, 'wave-1');
    expect(r.ok).toBe(false);
    expect(r.problems).toEqual([
      'plat/docs/build/choices.md: line 5 of the snapshot\'s file removed or edited',
      'plat/docs/build/choices.md:5 added, claimed by no record of wave-1: | C-0001 | 2026-10-03 | build/m0-spec | §1 | edited | because | t |',
      'plat/docs/build/choices.md:8 added, claimed by no record of wave-1: | C-0004 | 2026-10-03 | build/m0-zz | §0 | stray | why | t |',
      'plat/package.json: changed since wave-1, claimed by no landed record of the wave',
    ]);
  });

  it('names a file changed after its record: a note at the wave\'s close, a failure for the item\'s checker', () => {
    const root = landedWave();
    write(root, 'packages/kernel/src/num/old.ts', 'export const a = 3;\n');
    const wave = verifyWave(root, 'wave-1');
    expect(wave.problems).toEqual([
      'plat/packages/kernel/src/num/old.ts: changed since wave-1, claimed by no landed record of the wave (M0-a-01 recorded an earlier state)',
    ]);
    const item = verifyWave(root, 'wave-1', { item: 'M0-a-01' });
    expect(item.ok).toBe(false);
    expect(item.problems[0]).toContain('plat/packages/kernel/src/num/old.ts: the tree no longer matches M0-a-01\'s record');
  });

  it('fails a record that claims a path outside its owns, and exits 2 without the snapshot', () => {
    const root = landedWave();
    const path = join(root, 'docs', 'build', 'landed', 'M0-a-02.json');
    const rec = JSON.parse(readFileSync(path, 'utf8'));
    rec.files.push({ path: 'plat/package.json', status: 'unchanged', sha256: sha('{ "name": "fixture" }\n'), size: 22 });
    writeFileSync(path, JSON.stringify(rec));
    expect(verifyWave(root, 'wave-1').problems).toContain('plat/docs/build/landed/M0-a-02.json: plat/package.json lies outside M0-a-02\'s owns');
    expect(verifyWave(root, 'wave-9').code).toBe(2);
    expect(verifyWave(root, '../wave-1').code).toBe(64);
  });
});

describe('the commands (C-0104 (5))', () => {
  const tool = (name) => join(fileURLToPath(new URL('.', import.meta.url)), name);
  const spawn = (name, args) => spawnSync(process.execPath, [tool(name), ...args], { cwd: PLAT_ROOT, encoding: 'utf8' });

  it('are root scripts run through corepack pnpm', () => {
    const scripts = JSON.parse(readFileSync(join(PLAT_ROOT, 'package.json'), 'utf8')).scripts;
    expect(scripts.snapshot).toBe('node tools/landed/snapshot.mjs');
    expect(scripts.landed).toBe('node tools/landed/landed.mjs');
    expect(scripts['landed:verify']).toBe('node tools/landed/verify.mjs');
  });

  it('take no root (every path is plat/\'s own) and refuse bad usage with exit 64, writing nothing', () => {
    for (const [name, args] of [
      ['snapshot.mjs', []],
      ['snapshot.mjs', ['--', '../escape']],
      ['snapshot.mjs', ['--root', '/tmp']],
      ['landed.mjs', ['M0-a-01']],
      ['landed.mjs', ['--', 'M0-a-01', '--lane', 'build/x', '--root', '/tmp']],
      ['verify.mjs', []],
      ['verify.mjs', ['--root', '/tmp']],
    ]) {
      const r = spawn(name, args);
      expect(r.status, `${name} ${args.join(' ')}`).toBe(64);
      expect(r.stderr).toContain('usage: corepack pnpm');
    }
  });

  it('exit 2 on a snapshot label that does not exist, writing nothing', () => {
    const missing = 'zz-landed-test-missing';
    const landed = spawn('landed.mjs', ['--', 'M0-s-01', '--lane', 'build/m0-scaffold-fix3', '--wave', missing]);
    expect(landed.status).toBe(2);
    expect(landed.stderr).toContain(`no snapshot ${missing}`);
    const verify = spawn('verify.mjs', ['--', missing]);
    expect(verify.status).toBe(2);
    expect(existsSync(join(PLAT_ROOT, 'docs', 'build', 'landed', 'snapshots', `${missing}.json`))).toBe(false);
  });
});

// ---------------------------------------------------------------------------------------------------------------
// M-1's crossings and early run items (C-0120, C-0121)

const CLEAN_ROOM_X = [
  '# CLEAN-ROOM.md',
  '',
  '## 2 Seat ledger',
  '',
  '| # | seat (lane key / model) | date | role | what it read | notes |',
  '|---|---|---|---|---|---|',
  '| L-0001 | build/m0-spec (Opus) | 2026-10-03 | spec | ARCHITECTURE | — |',
  '',
  '## 3 The implementer digest checker\'s reports',
  '',
  '| # | date | seat (lane key / model) | digest files | checks run | result | notes |',
  '|---|---|---|---|---|---|---|',
  '| (none yet — the digest\'s first checker enters the first report, id D-0001) | | | | | | |',
  '',
  '## 4 The deny-list\'s generation record',
  '',
  '| # | date | seat (lane key / model) | file sha256 | normalisationVersion | sources (labels only) | counts | notes |',
  '|---|---|---|---|---|---|---|---|',
  '| (none yet — the first crossing of the deny-list enters the first record, id G-0001) | | | | | | | |',
  '',
].join('\n');

const DENY = '{ "normalisationVersion": 1, "salt": "00", "tokens": [] }\n';
const crossingRecord = (file, text, checkerSeat) => ({
  file, sha256: sha(text), rows: 0, date: '2026-10-03', checks: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'], checkerSeat, statement: 'numbers only',
});
const appendRecord = (root, rec) => {
  const recs = JSON.parse(read(root, CROSSINGS_FILE));
  write(root, CROSSINGS_FILE, `${JSON.stringify([...recs, rec], null, 2)}\n`);
};
const addLedgerRow = (root, row) => replaceIn(root, 'CLEAN-ROOM.md', '| L-0001 | build/m0-spec (Opus) | 2026-10-03 | spec | ARCHITECTURE | — |\n',
  `| L-0001 | build/m0-spec (Opus) | 2026-10-03 | spec | ARCHITECTURE | — |\n${row}\n`);

/** A wave in which M-1's deny-list crosses: the research seat's file and §4 row, the countersigning seat's record and row. */
function crossingWave() {
  const root = fixture({
    'CLEAN-ROOM.md': CLEAN_ROOM_X,
    [CROSSINGS_FILE]: '[]\n',
    'docs/digest/README.md': '# digest\n',
  });
  writeSnapshot(root, 'wave-1');
  write(root, 'packages/testkit/baselines/denylist.json', DENY);
  replaceIn(root, 'CLEAN-ROOM.md', /\| \(none yet — the first crossing of the deny-list[^\n]*\n/,
    `| G-0001 | 2026-10-03 | m1/W-16 (Fable) | ${sha(DENY).slice(0, 12)} | 1 | research: deny-list sources | 3 lists | — |\n`);
  addLedgerRow(root, '| L-0002 | build/m0-cross-denylist (Opus) | 2026-10-03 | countersigning checker | denylist.json only | — |');
  appendRecord(root, crossingRecord('packages/testkit/baselines/denylist.json', DENY, 'L-0002'));
  return root;
}

describe('M-1\'s crossings (C-0120)', () => {
  it('names the crossing files and line-hashes crossings.json by record, whatever its layout', () => {
    for (const rel of ['packages/testkit/baselines/baselines.json', 'packages/testkit/baselines/ng-faces.json',
      'packages/testkit/baselines/denylist.json', 'docs/digest/behaviours.md']) expect(isCrossingFile(rel), rel).toBe(true);
    for (const rel of ['docs/digest/README.md', CROSSINGS_FILE, 'packages/testkit/baselines/denylist-allow.json']) expect(isCrossingFile(rel), rel).toBe(false);
    const rec = crossingRecord('packages/testkit/baselines/denylist.json', DENY, 'L-0002');
    const pretty = fixture({ [CROSSINGS_FILE]: `${JSON.stringify([rec], null, 2)}\n` });
    const compact = fixture({ [CROSSINGS_FILE]: JSON.stringify([rec]) });
    const a = takeSnapshot(pretty, 'wave-1').appendFiles[`plat/${CROSSINGS_FILE}`];
    expect(a).toEqual({ lines: [lineHash(canonicalJson(rec))], placeholders: [], unit: 'record' });
    expect(takeSnapshot(compact, 'wave-1').appendFiles[`plat/${CROSSINGS_FILE}`]).toEqual(a);
  });

  it('gives each seat its own appends: the countersigner its CrossingRecord and ledger row, the research seat its §4 row', () => {
    const root = crossingWave();
    const cross = buildRecord(root, { item: 'cross-denylist-1', lane: 'build/m0-cross-denylist' });
    expect(cross.problems).toEqual([]);
    expect(cross.record.ownsSource).toBe('declared');
    expect(cross.record.files).toEqual([]);
    expect(Object.fromEntries(cross.record.appends.map((a) => [a.file, a.ids]))).toEqual({
      'plat/CLEAN-ROOM.md': ['L-0002'],
      [`plat/${CROSSINGS_FILE}`]: [`packages/testkit/baselines/denylist.json@${sha(DENY).slice(0, 12)}`],
    });
    const gen = buildRecord(root, { item: 'gen-denylist-1', lane: 'm1/W-16' });
    expect(gen.problems).toEqual([]);
    expect(gen.record.appends.map((a) => [a.file, a.ids])).toEqual([['plat/CLEAN-ROOM.md', ['G-0001']]]);
    expect(gen.record.appends[0].removed).toHaveLength(1); // §4's placeholder row
    expect(ledgerSeat(read(root, 'CLEAN-ROOM.md').split('\n'), 'L-0002')).toBe('build/m0-cross-denylist (Opus)');
    const r = verifyWave(root, 'wave-1');
    expect(r.problems).toEqual([]);
    expect(r.summary).toEqual({ label: 'wave-1', records: 2, changed: 5, attributed: 5 });
  });

  it('attributes a digest file by its record too, and a reformatted crossings.json is no edit', () => {
    const root = crossingWave();
    write(root, 'docs/digest/behaviours.md', '# behaviours\n');
    appendRecord(root, crossingRecord('plat/docs/digest/behaviours.md', '# behaviours\n', 'L-0002'));
    write(root, CROSSINGS_FILE, JSON.stringify(JSON.parse(read(root, CROSSINGS_FILE)))); // one line, same records
    expect(buildRecord(root, { item: 'cross-denylist-1', lane: 'build/m0-cross-denylist' }).ok).toBe(true);
    expect(buildRecord(root, { item: 'gen-denylist-1', lane: 'm1/W-16' }).ok).toBe(true);
    expect(verifyWave(root, 'wave-1').problems).toEqual([]);
  });

  it('names a crossing file without its record, a wrong sha256, another lane\'s record, an edited or a deleted crossing', () => {
    const root = fixture({ 'CLEAN-ROOM.md': CLEAN_ROOM_X, [CROSSINGS_FILE]: '[]\n', 'packages/testkit/baselines/baselines.json': '{ "rows": [] }\n' });
    write(root, CROSSINGS_FILE, `${JSON.stringify([crossingRecord('packages/testkit/baselines/baselines.json', '{ "rows": [] }\n', 'L-0001')], null, 2)}\n`);
    writeSnapshot(root, 'wave-1');
    write(root, 'packages/testkit/baselines/ng-faces.json', '{ "faces": [] }\n'); // no record at all
    write(root, 'packages/testkit/baselines/denylist.json', DENY);
    addLedgerRow(root, '| L-0002 | build/m0-cross-x (Opus) | 2026-10-03 | countersigning checker | denylist.json only | — |');
    appendRecord(root, crossingRecord('packages/testkit/baselines/denylist.json', 'other bytes', 'L-0002')); // wrong sha256
    appendRecord(root, crossingRecord('docs/digest/a.md', '# a\n', 'L-0001')); // L-0001 is build/m0-spec's row
    write(root, 'docs/digest/a.md', '# a\n');
    expect(buildRecord(root, { item: 'cross-x', lane: 'build/m0-cross-x' }).ok).toBe(true);
    let r = verifyWave(root, 'wave-1');
    expect(r.ok).toBe(false);
    expect(r.problems).toEqual([
      'plat/docs/digest/a.md: created since wave-1; no CrossingRecord appended to plat/packages/testkit/baselines/crossings.json in this wave and claimed by its countersigning seat names it ' +
        `with its sha256 ${sha('# a\n').slice(0, 12)}… (C-0120)`,
      `plat/${CROSSINGS_FILE}:record 3 added, claimed by no record of wave-1: ${canonicalJson(crossingRecord('docs/digest/a.md', '# a\n', 'L-0001')).slice(0, 100)}`,
      'plat/packages/testkit/baselines/denylist.json: created since wave-1; no CrossingRecord appended to plat/packages/testkit/baselines/crossings.json in this wave and claimed by its countersigning seat names it ' +
        `with its sha256 ${sha(DENY).slice(0, 12)}… (C-0120)`,
      'plat/packages/testkit/baselines/ng-faces.json: created since wave-1; no CrossingRecord appended to plat/packages/testkit/baselines/crossings.json in this wave and claimed by its countersigning seat names it ' +
        `with its sha256 ${sha('{ "faces": [] }\n').slice(0, 12)}… (C-0120)`,
    ]);
    const recs = JSON.parse(read(root, CROSSINGS_FILE));
    recs[0].statement = 'edited';
    write(root, CROSSINGS_FILE, JSON.stringify(recs));
    unlinkSync(join(root, 'packages', 'testkit', 'baselines', 'baselines.json'));
    r = verifyWave(root, 'wave-1');
    expect(r.problems).toContain(`plat/${CROSSINGS_FILE}: record 1 of the snapshot's file removed or edited`);
    expect(r.problems).toContain('plat/packages/testkit/baselines/baselines.json: a crossing file deleted since wave-1 (crossings are append-only, §17.1 (4); C-0120)');
    write(root, CROSSINGS_FILE, '{ "records": [] }\n');
    expect(verifyWave(root, 'wave-1').problems).toContain(`plat/${CROSSINGS_FILE}: not a JSON array of CrossingRecords (C-0092, C-0120)`);
  });

  it('refuses a crossing file in --owns or --touched, and a seat without an item that claims nothing', () => {
    const root = crossingWave();
    const owns = buildRecord(root, { item: 'cross-x', lane: 'build/m0-cross-denylist', owns: ['plat/packages/testkit/baselines/denylist.json'] });
    expect(owns.ok).toBe(false);
    expect(owns.problems).toEqual([
      '--owns plat/packages/testkit/baselines/denylist.json: a crossing file is attributed by its CrossingRecord in plat/packages/testkit/baselines/crossings.json, never declared (C-0120)',
    ]);
    const touched = buildRecord(root, { item: 'M0-a-01', lane: 'build/m0-a-01', touched: ['plat/docs/digest/x.md'] });
    expect(touched.problems).toEqual(['plat/docs/digest/x.md: a crossing file, attributed by its CrossingRecord, never by a seat\'s record (C-0120)']);
    const empty = buildRecord(root, { item: 'nobody-1', lane: 'build/m0-nobody' });
    expect(empty.ok).toBe(false);
    expect(empty.problems[0]).toContain('claims nothing');
    expect(existsSync(join(root, 'docs', 'build', 'landed', 'nobody-1.json'))).toBe(false);
  });

  it('a record that claims a crossing file fails (a)', () => {
    const root = crossingWave();
    expect(buildRecord(root, { item: 'cross-denylist-1', lane: 'build/m0-cross-denylist' }).ok).toBe(true);
    const path = join(root, 'docs', 'build', 'landed', 'cross-denylist-1.json');
    const rec = JSON.parse(readFileSync(path, 'utf8'));
    rec.owns = ['plat/packages/testkit/baselines/denylist.json'];
    rec.files = [{ path: 'plat/packages/testkit/baselines/denylist.json', status: 'created', sha256: sha(DENY), size: DENY.length }];
    writeFileSync(path, JSON.stringify(rec));
    expect(verifyWave(root, 'wave-1').problems).toContain(
      'plat/docs/build/landed/cross-denylist-1.json: plat/packages/testkit/baselines/denylist.json is a crossing file, attributed by its CrossingRecord, never by a record (C-0120)',
    );
  });

  it('the committed CLEAN-ROOM.md holds §3 and §4 as tables with a seat column and a placeholder row', () => {
    const lines = read(PLAT_ROOT, 'CLEAN-ROOM.md').split('\n');
    for (const heading of ['## 3 ', '## 4 ']) {
      const h = lines.findIndex((l) => l.startsWith(heading));
      expect(h, heading).toBeGreaterThan(0);
      const next = lines.findIndex((l, i) => i > h && l.startsWith('## '));
      const row = lines.findIndex((l, i) => i > h && i < next && /^\|\s*\(none yet\b/.test(l));
      expect(row, heading).toBeGreaterThan(h);
      expect(seatColumn(lines, row), heading).toBeGreaterThan(0);
      expect(splitCells(lines[row - 2])?.[0], heading).toBe('#');
    }
  });
});

describe('a run item landing before its own wave (C-0121)', () => {
  const WORK_K = {
    waves: [
      { wave: 0, items: ['M0-s-01'] },
      { wave: 1, items: ['M0-k-06'] },
      { wave: 'T', items: [] },
      { wave: 'AFTER-M-1 (a)', items: ['M0-k-07'] },
    ],
    items: [
      { id: 'M0-s-01', wave: 0, owns: ['plat/package.json'] },
      { id: 'M0-k-06', wave: 1, owns: ['plat/packages/testkit/src/scanner/', 'plat/packages/testkit/baselines/denylist-allow.json (created empty here; handed over to M0-k-07)'] },
      { id: 'M0-k-07', wave: 'AFTER-M-1 (a)', owns: ['plat/packages/testkit/baselines/denylist-allow.json (handed over from M0-k-06)', 'plat/docs/build/summaries/M0-k-07.json'] },
    ],
  };

  it('owns its files and hand-overs as at its own wave, with a note; the wave\'s close attributes them', () => {
    const root = fixture({ 'docs/build/M0-work.json': `${JSON.stringify(WORK_K, null, 2)}\n`, 'packages/testkit/baselines/denylist-allow.json': '{ "entries": [] }\n' });
    writeSnapshot(root, 'wave-1');
    expect(ownersAt(WORK_K, 'plat/packages/testkit/baselines/denylist-allow.json', labelPosition(WORK_K, 'wave-1'))).toEqual(['M0-k-06']);
    write(root, 'packages/testkit/baselines/denylist-allow.json', '{ "entries": [{ "id": "A-0001" }] }\n');
    write(root, 'docs/build/summaries/M0-k-07.json', '{ "reviewed": {} }\n');
    const r = buildRecord(root, { item: 'M0-k-07', lane: 'build/m0-k-07' });
    expect(r.problems).toEqual([]);
    expect(r.record.files.map((f) => `${f.path} ${f.status}`)).toEqual([
      'plat/docs/build/summaries/M0-k-07.json created',
      'plat/packages/testkit/baselines/denylist-allow.json changed',
    ]);
    expect(r.notes.join('\n')).toContain('M0-k-07 is of wave AFTER-M-1 (a), landing in wave-1: its owns resolved at its own wave (C-0121)');
    expect(verifyWave(root, 'wave-1').problems).toEqual([]);
    // An item landing in its own wave or later is unchanged: M0-k-06 in wave 1 still owns the file it hands over.
    const k06 = buildRecord(root, { item: 'M0-k-06', lane: 'build/m0-k-06', write: false });
    expect(k06.record.files.map((f) => f.path)).toEqual(['plat/packages/testkit/baselines/denylist-allow.json']);
    expect(k06.notes.join('\n')).not.toContain('C-0121');
  });
});

// ---------------------------------------------------------------------------------------------------------------
// A ledger row outside §2's table, and re-landed records (C-0306)

const L1 = '| L-0001 | build/m0-spec (Opus) | 2026-10-03 | spec | ARCHITECTURE | — |\n';
const rowOf = (id, lane, note = '—') => `| ${id} | ${lane} (Opus) | 2026-10-11 | checker | M0-a-01 | ${note} |`;
const inS2 = (root, row) => replaceIn(root, 'CLEAN-ROOM.md', L1, `${L1}${row}\n`);
const atEnd = (root, row) => appendFileSync(join(root, 'CLEAN-ROOM.md'), `${row}\n`);

describe('a CLEAN-ROOM.md ledger row outside §2\'s table (Q23 (a))', () => {
  it('finds §2\'s table and no stray in the committed ledger', () => {
    const lines = read(PLAT_ROOT, 'CLEAN-ROOM.md').split('\n');
    const t = ledgerTable(lines);
    expect(t).not.toBe(null);
    expect(lines[t.header - 2]).toMatch(/^## 2 Seat ledger/);
    expect(t.seat).toBe(1);
    expect(rowIds(lines.slice(t.start, t.end)).every((id) => id.startsWith('L-'))).toBe(true);
    expect(strayLedgerRows(lines, 'build/M0-s-01-fix-s2')).toEqual([]);
  });

  it('refuses the record when the lane\'s row sits under §5\'s table, naming the row and the rule; writes nothing', () => {
    const root = fixture();
    writeSnapshot(root, 'wave-1');
    write(root, 'docs/build/checks/M0-a-01.md', '# check\n');
    atEnd(root, rowOf('L-0007', 'check/m0-a-01-close'));
    const lines = read(root, 'CLEAN-ROOM.md').split('\n');
    expect(seatColumn(lines, lines.length - 2)).toBe(5); // §5's seat column: the row's notes cell, so it names no seat
    const r = buildRecord(root, { item: 'check-M0-a-01', lane: 'check/m0-a-01-close', owns: ['plat/docs/build/checks/M0-a-01.md'] });
    expect(r.ok).toBe(false);
    expect(r.code).toBe(1);
    expect(r.problems).toEqual([
      `plat/CLEAN-ROOM.md:14: ledger row L-0007 names lane check/m0-a-01-close but lies outside §2's seat-ledger table (lines 7 – 7) — ` +
        `move it into §2's table, then run landed again. The rule: ${LEDGER_RULE}`,
    ]);
    expect(LEDGER_RULE).toContain('the last row of §2\'s seat-ledger table');
    expect(existsSync(join(root, 'docs', 'build', 'landed', 'check-M0-a-01.json'))).toBe(false);
    // The same row after a blank line (in no table at all) is refused too; another lane's landing is not held up.
    appendFileSync(join(root, 'CLEAN-ROOM.md'), `\n${rowOf('L-0008', 'check/m0-a-01-close')}\n`);
    expect(buildRecord(root, { item: 'check-M0-a-01', lane: 'check/m0-a-01-close', owns: ['plat/docs/build/checks/M0-a-01.md'], write: false })
      .problems.map((p) => p.split(':').slice(0, 3).join(':'))).toEqual(['plat/CLEAN-ROOM.md:14: ledger row L-0007 names lane check/m0-a-01-close but lies outside §2\'s seat-ledger table (lines 7 – 7) — move it into §2\'s table, then run landed again. The rule', 'plat/CLEAN-ROOM.md:16: ledger row L-0008 names lane check/m0-a-01-close but lies outside §2\'s seat-ledger table (lines 7 – 7) — move it into §2\'s table, then run landed again. The rule']);
    seatA01(root);
    expect(buildRecord(root, { item: 'M0-a-01', lane: 'build/m0-a-01', write: false }).problems).toEqual([]);
  });

  it('accepts the same row inside §2\'s table and claims it: its id and its line hash', () => {
    const root = fixture();
    writeSnapshot(root, 'wave-1');
    write(root, 'docs/build/checks/M0-a-01.md', '# check\n');
    const row = rowOf('L-0002', 'check/m0-a-01-close');
    inS2(root, row);
    const r = buildRecord(root, { item: 'check-M0-a-01', lane: 'check/m0-a-01-close', owns: ['plat/docs/build/checks/M0-a-01.md'] });
    expect(r.problems).toEqual([]);
    expect(r.record.appends).toEqual([{ file: 'plat/CLEAN-ROOM.md', ids: ['L-0002'], lines: [lineHash(row)], removed: [] }]);
    expect(verifyWave(root, 'wave-1').problems).toEqual([]);
  });

  it('refuses a stray row named by its renumbering note, keeps the id rule inside §2, and leaves §3 – §5\'s own rows alone', () => {
    const root = fixture();
    writeSnapshot(root, 'wave-1');
    write(root, 'docs/build/checks/M0-a-01.md', '# check\n');
    const lane = 'check/m0-a-01-close';
    const owns = ['plat/docs/build/checks/M0-a-01.md'];
    // §5's own row with the lane in §5's seat column is the lane's append, never a stray.
    replaceIn(root, 'CLEAN-ROOM.md', /\| \(none yet[^\n]*\n/, `| S-0001 | an algorithm | https://example.org | 00 | 2026-10-11 | ${lane} | the check |\n`);
    // Two §2 rows with one id: the collision is refused, the next free id named.
    inS2(root, rowOf('L-0002', lane));
    inS2(root, rowOf('L-0002', 'build/m0-other'));
    const clash = buildRecord(root, { item: 'check-M0-a-01', lane, owns, write: false });
    expect(clash.problems).toHaveLength(1);
    expect(clash.problems[0]).toContain('id L-0002 is carried by the rows on lines 8 and 9 — a collision');
    expect(clash.problems[0]).toContain('the next free id, L-0003');
    // The renumbered row moved under §5 is refused by its renumbering note; back inside §2 it is claimed.
    const renumbered = rowOf('L-0003', 'build/m0-other', `renumbered from L-0002 (collision) by ${lane}`);
    replaceIn(root, 'CLEAN-ROOM.md', `${rowOf('L-0002', 'build/m0-other')}\n`, '');
    atEnd(root, renumbered);
    const stray = buildRecord(root, { item: 'check-M0-a-01', lane, owns, write: false });
    expect(stray.problems).toHaveLength(1);
    expect(stray.problems[0]).toMatch(/^plat\/CLEAN-ROOM\.md:15: ledger row L-0003 names lane check\/m0-a-01-close but lies outside §2's seat-ledger table/);
    replaceIn(root, 'CLEAN-ROOM.md', `${renumbered}\n`, '');
    replaceIn(root, 'CLEAN-ROOM.md', `${rowOf('L-0002', lane)}\n`, `${rowOf('L-0002', lane)}\n${renumbered}\n`);
    const ok = buildRecord(root, { item: 'check-M0-a-01', lane, owns });
    expect(ok.problems).toEqual([]);
    expect(ok.record.appends.map((a) => [a.file, a.ids])).toEqual([['plat/CLEAN-ROOM.md', ['L-0002', 'L-0003', 'S-0001']]]);
    expect(verifyWave(root, 'wave-1').problems).toEqual([]);
  });

  it('refuses a lane\'s row when the ledger has no §2 table at all', () => {
    const root = fixture({ 'CLEAN-ROOM.md': CLEAN_ROOM.replace('## 2 Seat ledger', '## Seat ledger') });
    writeSnapshot(root, 'wave-1');
    inS2(root, rowOf('L-0002', 'check/x'));
    const r = buildRecord(root, { item: 'check-x', lane: 'check/x', write: false });
    expect(r.ok).toBe(false);
    expect(r.problems[0]).toContain('ledger row L-0002 names lane check/x but lies outside §2\'s seat-ledger table (the file has none under "## 2 ")');
  });
});

describe('a record re-landed under a later lane, and the wave\'s unclaimed §2 rows (Q23 (b))', () => {
  it('keeps every row and CrossingRecord an earlier landing of the record claimed (ids and hashes), and claims the new lane\'s', () => {
    const root = crossingWave();
    const first = buildRecord(root, { item: 'cross-denylist-1', lane: 'build/m0-cross-denylist' });
    expect(first.problems).toEqual([]);
    const before = Object.fromEntries(first.record.appends.map((a) => [a.file, a]));
    const close = '| L-0003 | build/m0-cross-denylist-close (Opus) | 2026-10-11 | closing checker | denylist.json only | — |';
    replaceIn(root, 'CLEAN-ROOM.md', '| L-0002 | build/m0-cross-denylist (Opus)', `${close}\n| L-0002 | build/m0-cross-denylist (Opus)`);
    // Rows later in the ledger than L-0003 keep their claim: the carry is by line hash, not by position.
    const again = buildRecord(root, { item: 'cross-denylist-1', lane: 'build/m0-cross-denylist-close' });
    expect(again.problems).toEqual([]);
    expect(again.record.lane).toBe('build/m0-cross-denylist-close');
    expect(again.record.lanes).toEqual(['build/m0-cross-denylist', 'build/m0-cross-denylist-close']);
    const after = Object.fromEntries(again.record.appends.map((a) => [a.file, a]));
    const ledgerRow = read(root, 'CLEAN-ROOM.md').split('\n').find((l) => l.startsWith('| L-0002 '));
    expect(after['plat/CLEAN-ROOM.md'].ids).toEqual(['L-0003', 'L-0002']);
    expect(after['plat/CLEAN-ROOM.md'].lines).toEqual([lineHash(close), lineHash(ledgerRow)]);
    expect(after['plat/CLEAN-ROOM.md'].lines).toContain(before['plat/CLEAN-ROOM.md'].lines[0]);
    expect(after[`plat/${CROSSINGS_FILE}`]).toEqual(before[`plat/${CROSSINGS_FILE}`]); // the same id, the same hash
    expect(buildRecord(root, { item: 'gen-denylist-1', lane: 'm1/W-16' }).ok).toBe(true);
    expect(verifyWave(root, 'wave-1').problems).toEqual([]);
  });

  it('keeps an item\'s earlier rows when its fix round re-lands it under the fix lane', () => {
    const root = fixture();
    writeSnapshot(root, 'wave-1');
    seatA01(root);
    const first = buildRecord(root, { item: 'M0-a-01', lane: 'build/m0-a-01' });
    expect(first.ok).toBe(true);
    appendFileSync(join(root, 'docs', 'build', 'choices.md'), '| C-0003 | 2026-10-11 | build/m0-a-01-fix1 | §3.2 | three | why | a.test.ts |\n');
    const fix = buildRecord(root, { item: 'M0-a-01', lane: 'build/m0-a-01-fix1' });
    expect(fix.problems).toEqual([]);
    const ids = Object.fromEntries(fix.record.appends.map((a) => [a.file, a.ids]));
    expect(ids).toEqual({ 'plat/CLEAN-ROOM.md': ['L-0002', 'S-0001'], 'plat/docs/build/choices.md': ['C-0002', 'C-0003'] });
    const firstLines = first.record.appends.flatMap((a) => a.lines);
    expect(fix.record.appends.flatMap((a) => a.lines)).toEqual(expect.arrayContaining(firstLines));
  });

  it('landed:verify names a §2 row added since the snapshot that no record of the wave claims, and is clean once one does', () => {
    const root = fixture();
    writeSnapshot(root, 'wave-1');
    write(root, 'docs/build/checks/M0-a-01.md', '# check\n');
    const row = rowOf('L-0002', 'check/m0-a-01');
    inS2(root, row);
    expect(buildRecord(root, { item: 'check-M0-a-01', lane: 'check/m0-a-01', owns: ['plat/docs/build/checks/M0-a-01.md'] }).ok).toBe(true);
    expect(verifyWave(root, 'wave-1').problems).toEqual([]);
    // The record as a re-landing that carried nothing forward would write it: the §2 row is then claimed by nobody.
    const path = join(root, 'docs', 'build', 'landed', 'check-M0-a-01.json');
    const rec = JSON.parse(readFileSync(path, 'utf8'));
    writeFileSync(path, JSON.stringify({ ...rec, appends: [] }));
    expect(verifyWave(root, 'wave-1').problems).toEqual([`plat/CLEAN-ROOM.md:8 added, claimed by no record of wave-1: ${row}`]);
    writeFileSync(path, JSON.stringify(rec));
    expect(verifyWave(root, 'wave-1').problems).toEqual([]);
  });
});

// ---------------------------------------------------------------------------------------------------------------
// Passed ownership under any label, and the package index's own lines (L12, C-0318)

const WORK_H = {
  waves: [
    { wave: 0, items: ['M0-s-01'] },
    { wave: 1, items: ['M0-a-01'] },
    { wave: 2, items: ['M0-c-06'] },
    { wave: 'T', items: [] },
  ],
  items: [
    {
      id: 'M0-s-01',
      wave: 0,
      owns: [
        'plat/package.json',
        'plat/packages/{kernel,model}/src/index.ts',
        'plat/packages/*/src/<module>/index.ts (created empty; ownership passes to the folder\'s owner, C-0013)',
        'plat/bench/src/<harness>/index.ts (created empty; passes to the harness\'s owner, C-0059)',
      ],
    },
    { id: 'M0-a-01', wave: 1, owns: ['plat/packages/kernel/src/num/'] },
    { id: 'M0-c-06', wave: 2, owns: ['plat/packages/kernel/src/fuse/', 'plat/bench/src/fusion/'] },
  ],
};
const FUSE_LINE = "export * from './fuse/index.js';";

/** A tree under WORK_H with its snapshot under `label`, then the receiver M0-c-06's work: its two index files and its line. */
function handOverTree(label) {
  const root = fixture({
    'docs/build/M0-work.json': `${JSON.stringify(WORK_H, null, 2)}\n`,
    'packages/kernel/src/fuse/index.ts': '',
    'bench/src/fusion/index.ts': '',
  });
  writeSnapshot(root, label);
  write(root, 'packages/kernel/src/fuse/index.ts', "export * from './fuse.js';\n");
  write(root, 'packages/kernel/src/fuse/fuse.ts', 'export const f = 1;\n');
  write(root, 'bench/src/fusion/index.ts', 'export function run() { return 0; }\n');
  appendFileSync(join(root, 'packages', 'kernel', 'src', 'index.ts'), `${FUSE_LINE}\n`);
  return root;
}
const claimsOf = (r) => ({
  files: r.record.files.map((f) => f.path),
  index: r.record.appends.filter((a) => a.file === 'plat/packages/kernel/src/index.ts').flatMap((a) => a.ids),
});
const PASSED = ['plat/bench/src/fusion/index.ts', 'plat/packages/kernel/src/fuse/index.ts'];

describe('a passed-ownership path under any label (L12, C-0013, C-0059, C-0064, C-0318)', () => {
  it('is the giver\'s under a wave label before the hand-over, and the receiver\'s at or past it and under a label naming no wave', () => {
    for (const [label, holder] of [['wave-0', 'M0-s-01'], ['wave-2', 'M0-c-06'], ['wave-T', 'M0-c-06'], ['flow-7', 'M0-c-06'], ['session-x', 'M0-c-06']]) {
      const root = handOverTree(label);
      const giver = buildRecord(root, { item: 'M0-s-01', lane: 'build/m0-scaffold-fixz', write: false });
      const receiver = buildRecord(root, { item: 'M0-c-06', lane: 'build/m0-c-06', write: false });
      expect(giver.problems, label).toEqual([]);
      expect(receiver.problems, label).toEqual([]);
      const g = claimsOf(giver);
      const c = claimsOf(receiver);
      // arena/ has no owner in WORK_H, so its index.ts stays the scaffold's at every wave; num/ passes at wave 1.
      if (holder === 'M0-s-01') {
        expect(g, label).toEqual({
          files: [PASSED[0], 'plat/package.json', 'plat/packages/kernel/src/arena/index.ts', PASSED[1], 'plat/packages/kernel/src/num/index.ts'],
          index: ['fuse'],
        });
      } else {
        expect(g, label).toEqual({ files: ['plat/package.json', 'plat/packages/kernel/src/arena/index.ts'], index: [] });
        expect(giver.record.appends, label).toEqual([]);
      }
      // The receiver claims its files and its line wherever it lands (in wave 0: as at its own wave, C-0121).
      expect(c, label).toEqual({ files: [...PASSED.slice(0, 1), 'plat/packages/kernel/src/fuse/fuse.ts', PASSED[1]], index: ['fuse'] });
    }
  });

  it('says so in a note under a label naming no wave, and the wave\'s close attributes every path once', () => {
    const root = handOverTree('flow-7');
    const giver = buildRecord(root, { item: 'M0-s-01', lane: 'build/m0-scaffold-fixz' });
    expect(giver.notes[0]).toBe(
      'snapshot flow-7 names no wave of docs/build/M0-work.json; ownership resolved with every wave open: a handed-over path is its latest owner\'s (C-0318)',
    );
    expect(giver.notes.join('\n')).toContain('plat/packages/kernel/src/fuse/index.ts'); // named as another seat's
    expect(buildRecord(root, { item: 'M0-c-06', lane: 'build/m0-c-06' }).ok).toBe(true);
    const v = verifyWave(root, 'flow-7');
    expect(v.problems).toEqual([]);
    expect(v.notes.filter((n) => n.includes('claimed by'))).toEqual([]); // no path claimed twice
    // A giver touching a passed path is refused, naming the receiver.
    expect(buildRecord(root, { item: 'M0-s-01', lane: 'build/m0-scaffold-fixz', touched: [PASSED[1]], write: false }).problems).toEqual([
      `${PASSED[1]}: outside M0-s-01's owns and the permitted appends (owned by M0-c-06 at flow-7)`,
    ]);
  });

  it('never carries a package-index line an earlier landing of the giver claimed in the same wave', () => {
    const root = handOverTree('flow-7');
    const old = buildRecord(root, { item: 'M0-s-01', lane: 'build/m0-scaffold-fixy', write: false }).record;
    const stale = { ...old, appends: [{ file: 'plat/packages/kernel/src/index.ts', ids: ['fuse'], lines: [lineHash(FUSE_LINE)], removed: [] }] };
    write(root, 'docs/build/landed/M0-s-01.json', `${JSON.stringify(stale)}\n`);
    const again = buildRecord(root, { item: 'M0-s-01', lane: 'build/m0-scaffold-fixz', write: false });
    expect(again.record.lanes).toEqual(['build/m0-scaffold-fixy', 'build/m0-scaffold-fixz']); // carried as a record…
    expect(again.record.appends).toEqual([]); // …but the line is the receiver's
  });

  it('the committed M0-work.json: no module folder or bench harness with an owner leaves its index.ts with the scaffold', () => {
    const work = loadWork(PLAT_ROOT);
    let folders = 0;
    for (const item of work.items) {
      if (item.id === 'M0-s-01') continue;
      for (const o of item.owns) {
        for (const p of parseOwnsEntry(o).patterns) {
          const s = p.segments;
          const moduleFolder = s.length === 5 && s[1] === 'packages' && s[3] === 'src' && s[2] !== null && s[4] !== null && p.folder;
          const harness = s.length === 4 && s[1] === 'bench' && s[2] === 'src' && s[3] !== null && p.folder;
          if (!moduleFolder && !harness) continue;
          const index = `${s.join('/')}/index.ts`;
          folders += 1;
          const owners = ownersAt(work, index, Number.POSITIVE_INFINITY);
          expect(owners, index).not.toContain('M0-s-01');
          // The latest owner is an item that owns the folder (tier-jobs/ passes from M0-f-02a to M0-f-02b).
          expect(owners.length, index).toBeGreaterThan(0);
          for (const o of owners) {
            const owns = work.items.find((it) => it.id === o).owns;
            expect(owns.some((e) => parseOwnsEntry(e).patterns.some((q) => q.folder && patternMatches(q, index))), `${index} ${o}`).toBe(true);
          }
        }
      }
    }
    expect(folders).toBeGreaterThan(40);
    expect(ownersAt(work, 'plat/packages/layout/src/index.ts', Number.POSITIVE_INFINITY)).toEqual(['M0-s-01']);
    expect(ownersAt(work, 'plat/tools/landed/landed.mjs', Number.POSITIVE_INFINITY)).toEqual(['M0-s-01']);
  });

  it('re-landing the scaffold under a flow label on the committed M0-work.json lists its own files only, never a passed index', () => {
    const real = read(PLAT_ROOT, 'docs/build/M0-work.json');
    const root = fixture({
      'docs/build/M0-work.json': real,
      'packages/layout/src/index.ts': "// layout index\nexport * from './districts/index.js';\n",
      'packages/layout/src/districts/index.ts': '',
      'packages/testkit/src/index.ts': "// testkit index\n",
      'bench/src/fusion/index.ts': '',
      'tools/lint/index.mjs': 'export default {};\n',
      'tools/landed/landed.mjs': '// landed\n',
    });
    writeSnapshot(root, 'flow-7');
    for (const rel of ['package.json', 'packages/layout/src/districts/index.ts', 'bench/src/fusion/index.ts', 'tools/lint/index.mjs', 'tools/landed/landed.mjs']) {
      write(root, rel, `${read(root, rel)}// edited\n`);
    }
    write(root, 'packages/testkit/src/edge/index.ts', 'export const e = 1;\n');
    appendFileSync(join(root, 'packages', 'testkit', 'src', 'index.ts'), "export * from './edge/index.js';\n");
    const r = buildRecord(root, { item: 'M0-s-01', lane: 'build/m0-scaffold-fixz', write: false });
    expect(r.problems).toEqual([]);
    expect(r.record.files.filter((f) => f.status !== 'unchanged').map((f) => f.path)).toEqual(['plat/package.json', 'plat/tools/landed/landed.mjs']);
    expect(r.record.files.map((f) => f.path).filter((p) => /\/src\/[^/]+\/index\.ts$/.test(p))).toEqual([]);
    expect(r.record.appends).toEqual([]); // the testkit barrel's edge line is M0-x-06's
    expect(claimsOf(buildRecord(root, { item: 'M0-e-04', lane: 'build/m0-e-04', write: false })).files).toEqual(['plat/packages/layout/src/districts/index.ts']);
    const x06 = buildRecord(root, { item: 'M0-x-06', lane: 'build/m0-x-06', write: false }).record;
    expect(x06.appends.map((a) => [a.file, a.ids])).toEqual([['plat/packages/testkit/src/index.ts', ['edge']]]);
  });
});

describe('the package index\'s owner claims its own edits line by line (J273 Q2, C-0318)', () => {
  const NEW1 = "// kernel index (C-0013): the package's public API is its folders' union";
  for (const label of ['wave-1', 'flow-7']) {
    it(`claims a changed first line per line, with the snapshot's line as removed, and the close accepts it (${label})`, () => {
      const root = fixture();
      writeSnapshot(root, label);
      seatA02(root);
      replaceIn(root, 'packages/kernel/src/index.ts', '// kernel index\n', `${NEW1}\n`);
      const r = buildRecord(root, { item: 'M0-s-01', lane: 'build/m0-scaffold-fixz' });
      expect(r.problems).toEqual([]);
      expect(r.record.appends).toEqual([
        { file: 'plat/packages/kernel/src/index.ts', ids: ['line 1'], lines: [lineHash(NEW1)], removed: [lineHash('// kernel index')] },
      ]);
      expect(buildRecord(root, { item: 'M0-a-02', lane: 'build/m0-a-02' }).ok).toBe(true);
      expect(verifyWave(root, label).problems).toEqual([]);
      // Without the owner's removal claim, or with it in a record whose item does not own the index, the edit is named.
      const path = join(root, 'docs', 'build', 'landed', 'M0-s-01.json');
      const rec = JSON.parse(readFileSync(path, 'utf8'));
      writeFileSync(path, JSON.stringify({ ...rec, appends: [{ ...rec.appends[0], removed: [] }] }));
      expect(verifyWave(root, label).problems).toEqual(['plat/packages/kernel/src/index.ts: line 1 of the snapshot\'s file removed or edited']);
      writeFileSync(path, JSON.stringify({ ...rec, appends: [] }));
      const a02 = join(root, 'docs', 'build', 'landed', 'M0-a-02.json');
      const ra = JSON.parse(readFileSync(a02, 'utf8'));
      writeFileSync(a02, JSON.stringify({ ...ra, appends: ra.appends.map((a) => (a.file === rec.appends[0].file ? { ...a, removed: rec.appends[0].removed } : a)) }));
      expect(verifyWave(root, label).problems).toEqual([
        'plat/packages/kernel/src/index.ts: line 1 of the snapshot\'s file removed or edited',
        `plat/packages/kernel/src/index.ts:1 added, claimed by no record of ${label}: ${NEW1}`,
      ]);
    });
  }

  it('vouches for a removal in a package index only: an owner of another append file still has its edit named', () => {
    const work = { ...WORK, items: WORK.items.map((it) => (it.id === 'M0-a-01' ? { ...it, owns: [...it.owns, 'plat/docs/build/choices.md'] } : it)) };
    const root = fixture({ 'docs/build/M0-work.json': `${JSON.stringify(work, null, 2)}\n` });
    writeSnapshot(root, 'wave-1');
    const row = '| C-0001 | 2026-10-03 | build/m0-spec | §1 | one | because | t |';
    replaceIn(root, 'docs/build/choices.md', row, row.replace('| one |', '| edited |'));
    write(root, 'packages/kernel/src/num/new.ts', 'export const n = 1;\n');
    expect(buildRecord(root, { item: 'M0-a-01', lane: 'build/m0-a-01' }).ok).toBe(true);
    const path = join(root, 'docs', 'build', 'landed', 'M0-a-01.json');
    const rec = JSON.parse(readFileSync(path, 'utf8'));
    writeFileSync(path, JSON.stringify({ ...rec, appends: [{ file: 'plat/docs/build/choices.md', ids: [], lines: [], removed: [lineHash(row)] }] }));
    expect(verifyWave(root, 'wave-1').problems).toEqual([
      'plat/docs/build/choices.md: line 5 of the snapshot\'s file removed or edited',
      `plat/docs/build/choices.md:5 added, claimed by no record of wave-1: ${row.replace('| one |', '| edited |')}`,
    ]);
  });

  it('leaves a malformed line naming another owner\'s folder unclaimed, and claims a removal alone', () => {
    const root = fixture();
    writeSnapshot(root, 'wave-1');
    appendFileSync(join(root, 'packages', 'kernel', 'src', 'index.ts'), "export * from './arena/index.js'\n");
    const r = buildRecord(root, { item: 'M0-s-01', lane: 'build/m0-scaffold-fixz', write: false });
    expect(r.record.appends).toEqual([]);
    const root2 = fixture();
    writeSnapshot(root2, 'wave-1');
    replaceIn(root2, 'packages/kernel/src/index.ts', '// kernel index\n', '');
    const r2 = buildRecord(root2, { item: 'M0-s-01', lane: 'build/m0-scaffold-fixz' });
    expect(r2.record.appends).toEqual([{ file: 'plat/packages/kernel/src/index.ts', ids: [], lines: [], removed: [lineHash('// kernel index')] }]);
    expect(verifyWave(root2, 'wave-1').problems).toEqual([]);
  });
});

function rowIds(lines) {
  return lines.map((l) => splitCells(l)?.[0]).filter((c) => c !== undefined);
}
