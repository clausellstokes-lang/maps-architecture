// M0-s-01's third fix round (C-0104, C-0111): the attribution tools. The snapshot covers every file outside its
// exclusions with its SHA-256; `landed` writes a seat's record with each status and its appended lines, and refuses a
// path outside its owns and the permitted appends, naming it; `landed:verify` passes a fully attributed wave and names
// every unattributed change; no tool reads a path outside plat/ (a symbolic link is recorded, never followed; no CLI
// takes a root). Every case runs on a fixture tree in the OS temporary folder; the CLIs are spawned only on arguments
// that write nothing.
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
import { PLAT_ROOT, isExcluded, lineHash, takeSnapshot, validLabel, writeSnapshot } from './snapshot.mjs';
import { buildRecord, labelPosition, lcsDiff, loadWork, ownersAt, parseArgs, parseOwnsEntry, patternMatches } from './landed.mjs';
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
