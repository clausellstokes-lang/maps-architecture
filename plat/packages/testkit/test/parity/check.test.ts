// M0-k-05's `plat baselines check` tests (§17.1 (4); C-0092 (2), (3), C-0120; N-21, N-22, N-24, N-32): a colour value,
// a non-pattern string, a deleted row, an unsalted corpus id, or a missing or stale CrossingRecord fails naming it; an
// appended row with its record passes; the report names C8 – C10 as not run at M0; the notes by length and character
// set; C3 inside strings only; the deny-list kind; the ng-faces kind; and the command's exit codes.
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  baselinesCheck,
  crossingRecordProblem,
  denylistProblems,
  kindOfFile,
  runBaselinesCheck,
  type Baseline,
  type BaselinesCheckReport,
  type CheckKind,
  type CrossingRecord,
} from '../../src/index.js';
import { row, synthetic } from './support.js';

const FILE = 'packages/testkit/baselines/baselines.json';
const sha = (b: Uint8Array | string): string => createHash('sha256').update(b).digest('hex');
const enc = (v: unknown): Uint8Array => Buffer.from(JSON.stringify(v));
const record = (bytes: Uint8Array, rows: number, over: Partial<CrossingRecord> = {}): CrossingRecord => ({
  file: FILE,
  sha256: sha(bytes),
  rows,
  date: '2026-10-05',
  checks: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
  checkerSeat: 'L-0200',
  statement: 'read only this file; C1 – C7 run, C8 – C10 not run at M0'.replace(/–/g, '-'),
  ...over,
});
const rows2 = (): Baseline[] => [
  row({ id: 'm1/junction.share4/NG/medium/all', metric: 'junction.share4', note: 'S-V12-1 edge noise 0.32: lo 0.481-0.561, hi 0.712-0.769' }),
  row({ id: 'm1/block.countTemplate/NG/medium/template-area', metric: 'block.countTemplate', unit: 'count', values: { p10: 16, p50: 39, p90: 57, n: 5, seeds: 5 } }),
];
/** Runs the check on a value with a record for it (unless `crossings` is given). */
function check(value: unknown, opts: { kind?: CheckKind; crossings?: unknown; previous?: unknown; file?: string } = {}): BaselinesCheckReport {
  const bytes = enc(value);
  const kind = opts.kind ?? 'baselines';
  const n = kind === 'baselines' ? (Array.isArray(value) ? value.length : ((value as { rows: unknown[] }).rows ?? []).length) : kind === 'ng-faces' ? (value as { faces: unknown[] }).faces.length : denylistProblems(value).digests;
  const file = opts.file ?? FILE;
  const checks = kind === 'denylist' ? ['C1', 'C3'] : undefined;
  const crossings = 'crossings' in opts ? opts.crossings : [record(bytes, n, { file, ...(checks === undefined ? {} : { checks }) })];
  const previous = opts.previous === undefined ? undefined : { bytes: enc(opts.previous), value: opts.previous };
  return baselinesCheck({ file, kind, bytes, value, crossings, ...(previous === undefined ? {} : { previous }) });
}
const line = (r: BaselinesCheckReport, id: string): BaselinesCheckReport['checks'][number] => r.checks.find((c) => c.id === id) as BaselinesCheckReport['checks'][number];

describe('C1 – C7 on baselines.json (C-0092 (2))', () => {
  it('a clean file with its record passes, and the report names C8 – C10 as not run at M0', () => {
    const r = check(rows2());
    expect(r.pass).toBe(true);
    expect(r.checks.map((c) => [c.id, c.status])).toEqual([
      ['C1', 'pass'],
      ['C2', 'pass'],
      ['C3', 'pass'],
      ['C4', 'pass'],
      ['C5', 'pass'],
      ['C6', 'pass'],
      ['C7', 'pass'],
      ['C8', 'not run'],
      ['C9', 'not run'],
      ['C10', 'not run'],
    ]);
    for (const id of ['C8', 'C9', 'C10']) expect(line(r, id).note).toBe('not run at M0 (V12 §3.3, M1)');
    expect(line(r, 'C4').note).toBe('first crossing: no earlier record names the file');
    expect(r.proposedRecord).toEqual({ file: FILE, sha256: sha(enc(rows2())), rows: 2, checks: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'] });
    // the object form with a header passes too
    expect(check({ schema: 'plat.baselines/1', metricsVersion: '1.0.0', rows: rows2() }).pass).toBe(true);
  });

  it('C1: a non-pattern string fails naming the row; block.countTemplate passes (N-24)', () => {
    const r = check([...rows2(), row({ id: 'x/junction.share4/NG/all', metric: 'junction.share4', sample: { family: 'capture/NG', captures: ['a b c'] } })]);
    expect(line(r, 'C1').status).toBe('fail');
    expect(line(r, 'C1').problems).toEqual(['row 2 (x/junction.share4/NG/all): sample.captures[0] outside its pattern']);
    expect(r.pass).toBe(false);
    const r2 = check([row({ id: 'y', metric: 'junction.share4', estimator: 'type7', ...({ grammar: 'two words' } as object) })]);
    expect(line(r2, 'C1').problems).toEqual(['row 0 (y): grammar is not a pattern string (an id-like token)']);
    const r3 = check([row({ id: 'z', metric: 'junction.share4', unit: 'furlong' })]);
    expect(line(r3, 'C1').problems).toEqual(['row 0 (z): unit outside its pattern']);
    const r4 = check([row({ id: 'w', metric: 'junction.share4', script: 'measure.sh' })]);
    expect(line(r4, 'C1').problems).toEqual(['row 0 (w): script outside its pattern']);
    expect(line(check([{ id: 'v', metric: 'junction.share4' }]), 'C1').problems[0]).toBe('row 0 (v): lacks referenceBuild (T-RIG-1)');
  });

  it('C2: a note in the stability-marker form passes; 201 characters or a character outside the set is refused (N-32)', () => {
    expect(line(check(rows2()), 'C2').status).toBe('pass');
    const long = check([row({ id: 'n', metric: 'junction.share4', note: 'a'.repeat(201) })]);
    expect(line(long, 'C2').problems).toEqual(['row 0 (n): note longer than 200 characters (201)']);
    expect(line(check([row({ id: 'n', metric: 'junction.share4', note: 'a'.repeat(200) })]), 'C2').status).toBe('pass');
    const odd = check([row({ id: 'n', metric: 'junction.share4', note: 'see the list: alpha & beta' })]);
    expect(line(odd, 'C2').problems).toEqual(['row 0 (n): note holds a character outside the note set (U+0026)']);
    const reason = check([row({ id: 'n', metric: 'junction.share4', sample: { family: 'capture/NG', captures: ['a'], failed: [{ index: 0, reason: 'feature "absent"' }] } })]);
    expect(line(reason, 'C2').problems).toEqual(['row 0 (n): sample.failed[0].reason holds a character outside the note set (U+0022)']);
    expect(line(check(rows2()), 'C2').note).toMatch(/corepack pnpm scan/);
  });

  it('C3: a six-hex run in a string fails; a 16-hex digest, a 64-hex salt, a nine-digit integer and a six-decimal number pass (N-22)', () => {
    for (const s of ['#a1b2c3', '0xA1B2C3', 'a1b2c3', 'tone ffeedd here']) {
      const r = check([row({ id: 'c', metric: 'junction.share4', note: s })]);
      expect(line(r, 'C3').problems, s).toEqual(['a string at [0].note holds a colour value']);
    }
    const ok = check([
      row({ id: 'c', metric: 'junction.share4', sample: { family: 'capture/NG', captures: ['3ed08da5d2df31e8', '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'] }, values: { p10: 123456789, p50: 123456790, p90: 123456791, n: 3, seeds: 3 } }),
      row({ id: 'd', metric: 'block.area', unit: 'm2', values: { bins: [50, 66.420, 88.234567, 117.200001], histogram: [1, 2, 3, 4, 5], n: 15, seeds: 3 }, spreadKS: { p90: 0.2, pairs: 3 } }),
    ]);
    expect(line(ok, 'C3').status).toBe('pass');
    expect(line(check([{ ...rows2()[0], ...({ abcdef: 1 } as object) }]), 'C3').problems).toEqual(['a member name at [0].abcdef holds a colour value']);
  });

  it('C4: a deleted or an edited row fails naming it; an appended row with its record passes', () => {
    const prev = rows2();
    const prevBytes = enc(prev);
    const earlier = record(prevBytes, 2);
    const appended = [...prev, row({ id: 'm1/cut.fillet/NG/all', metric: 'cut.fillet' })];
    const ok = check(appended, { crossings: [earlier, record(enc(appended), 3)], previous: prev });
    expect(ok.pass).toBe(true);
    expect(line(ok, 'C4').status).toBe('pass');
    const deleted = [prev[1]];
    const d = check(deleted, { crossings: [earlier, record(enc(deleted), 1)], previous: prev });
    expect(line(d, 'C4').problems).toEqual(['row m1/junction.share4/NG/medium/all deleted (rows are append-only; a new row supersedes)']);
    const edited = [{ ...prev[0], values: { p10: 0.3, p50: 0.46, p90: 0.55, n: 20, seeds: 20 } }, prev[1]];
    const e = check(edited, { crossings: [earlier, record(enc(edited), 2)], previous: prev });
    expect(line(e, 'C4').problems).toEqual(['row m1/junction.share4/NG/medium/all edited (rows are append-only; a new row supersedes)']);
    // the previous version must be the one the earlier record names, and must be given
    expect(line(check(appended, { crossings: [earlier, record(enc(appended), 3)] }), 'C4').problems[0]).toMatch(/^an earlier CrossingRecord names packages\/testkit\/baselines\/baselines\.json .*pass --previous <file>/);
    expect(line(check(appended, { crossings: [earlier, record(enc(appended), 3)], previous: deleted }), 'C4').problems[0]).toMatch(/^--previous has sha256 /);
  });

  it('C5: a research-side or file path fails; an opaque research: label passes', () => {
    for (const s of ['research/baselines/measure.py', 'captures/ng/2026', '/Users/x/file', '../up', 'C:/x', 'measure.py', 'a\\b']) {
      const r = check([row({ id: 'p', metric: 'junction.share4', capture: 'research:captures-ng/plan-seeds', sample: { family: s, captures: ['a'] } })]);
      expect(line(r, 'C5').problems, s).toEqual(['[0].sample.family names a path; research-side paths cross only as opaque research: labels']);
    }
    expect(line(check(rows2()), 'C5').status).toBe('pass');
  });

  it('C6: an unsalted corpus id fails; C7: a corpus row holds salted ids and our preset keys only', () => {
    const corpus = (reference: string, family: string): Baseline => row({ id: 'k', metric: 'junction.share4', reference: reference as Baseline['reference'], sample: { family, captures: ['0123456789abcdef'] } });
    expect(line(check([corpus('corpus:map:lubeck-1650', 'corpus:map:0123456789abcdef')]), 'C6').problems).toEqual(['[0].reference holds an unsalted corpus id']);
    const salted = check([corpus('corpus:map:0123456789abcdef', 'corpus:map:fedcba9876543210')]);
    expect([line(salted, 'C6').status, line(salted, 'C7').status]).toEqual(['pass', 'pass']);
    const named = check([corpus('corpus:frame:0123456789abcdef', 'hanseatic')]);
    expect(line(named, 'C7').problems).toEqual(['row 0 (k): sample.family is a corpus string that is neither salted nor one of our preset keys']);
    expect(line(check([corpus('corpus:frame:0123456789abcdef', 'MFCG')]), 'C7').status).toBe('pass');
  });
});

describe('the crossing record (C-0092 (3), C-0120)', () => {
  it('a missing record fails naming the file; a stale one names both sha256s; rows and checks must match', () => {
    const v = rows2();
    const bytes = enc(v);
    expect(check(v, { crossings: [] }).record.problems).toEqual([`record missing: no CrossingRecord names ${FILE} (the countersigning checker seat appends one, C-0120)`]);
    expect(check(v, { crossings: [] }).pass).toBe(false);
    const stale = check(v, { crossings: [record(enc([v[0]]), 1)] });
    expect(stale.record.problems[0]).toMatch(/^record stale: the latest CrossingRecord for packages\/testkit\/baselines\/baselines\.json names sha256 [0-9a-f]{12}…, the file is [0-9a-f]{12}…$/);
    expect(check(v, { crossings: [record(bytes, 3)] }).record.problems).toEqual(['record stale: its rows 3, the file holds 2']);
    expect(check(v, { crossings: [record(bytes, 2, { checks: ['C1', 'C3'] })] }).record.problems).toEqual(['record stale: its checks lack C2, C4, C5, C6, C7']);
    // with or without the plat/ prefix (C-0120)
    expect(check(v, { crossings: [record(bytes, 2, { file: `plat/${FILE}` })] }).record.status).toBe('pass');
    // crossings.json absent, not an array, or holding a malformed record
    expect(check(v, { crossings: null }).record.problems).toEqual(['crossings.json: missing (M0-k-05 creates it as []; C-0092 (3))']);
    expect(check(v, { crossings: { file: FILE } }).record.problems).toEqual(['crossings.json: not a JSON array (C-0120)']);
    expect(check(v, { crossings: [record(bytes, 2), { file: 'x' }] }).record.problems).toEqual(['crossings.json: record 1: sha256 missing']);
  });

  it('the record shape: exactly the seven members, each by its pattern', () => {
    const r = record(enc([]), 0);
    expect(crossingRecordProblem(r)).toBeNull();
    expect(crossingRecordProblem({ ...r, extra: 1 })).toBe('unknown member extra');
    expect(crossingRecordProblem({ ...r, checkerSeat: 'seat-1' })).toBe('checkerSeat is not a CLEAN-ROOM.md ledger row id');
    expect(crossingRecordProblem({ ...r, sha256: r.sha256.toUpperCase() })).toBe('sha256 is not 64 lower-case hex digits');
    expect(crossingRecordProblem({ ...r, file: '../outside.json' })).toBe('file is not a path relative to plat/');
    expect(crossingRecordProblem({ ...r, checks: ['C11'] })).toBe('checks is not a list of check ids C1 – C10');
    expect(crossingRecordProblem({ ...r, statement: 'x'.repeat(401) })).toBe('statement is not 1 – 400 characters of the note set');
  });
});

/** A synthetic deny-list in attachment C's form (digests invented, sorted). */
function denylist(): Record<string, unknown> {
  const d = (n: number): string[] => Array.from({ length: n }, (_, i) => sha(`item-${i}`).slice(0, 16)).sort();
  return {
    schema: 'plat.denylist/1',
    normalisationVersion: 1,
    digestHexDigits: 16,
    date: '2026-10-03T22:04:00Z',
    corpusCut: '2026-10-01T00:00:00Z',
    salt: '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f',
    counts: { tokens: 5, trigrams: 3 },
    tokens: d(5),
    trigrams: d(3),
    colours: d(2),
    files: [],
    lists: [{ id: 1, words: d(4) }],
    spell: d(2),
  };
}

describe('the deny-list kind (N-22, attachment C)', () => {
  it('a synthetic deny-list passes C1 and C3; the other checks read not applicable', () => {
    const r = check(denylist(), { kind: 'denylist', file: 'packages/testkit/baselines/denylist.json' });
    expect(r.pass).toBe(true);
    expect(r.rows).toBe(16);
    expect(r.checks.map((c) => [c.id, c.status])).toEqual([
      ['C1', 'pass'],
      ['C2', 'not applicable'],
      ['C3', 'pass'],
      ['C4', 'not applicable'],
      ['C5', 'not applicable'],
      ['C6', 'not applicable'],
      ['C7', 'not applicable'],
      ['C8', 'not run'],
      ['C9', 'not run'],
      ['C10', 'not run'],
    ]);
  });

  it('an unsorted array, a repeat or a 15-digit digest fails C1 naming the field', () => {
    const unsorted = denylist();
    (unsorted['tokens'] as string[]).reverse();
    expect(denylistProblems(unsorted).problems).toEqual(['tokens[1]: out of ascending order']);
    const repeat = denylist();
    (repeat['spell'] as string[])[1] = (repeat['spell'] as string[])[0];
    expect(denylistProblems(repeat).problems).toEqual(['spell[1]: repeats the digest before it']);
    const short = denylist();
    (short['lists'] as { words: string[] }[])[0].words[2] = (short['lists'] as { words: string[] }[])[0].words[2].slice(0, 15);
    expect(denylistProblems(short).problems).toEqual(['lists[0].words[2]: not a digest of 16 lower-case hex digits']);
    const extra = { ...denylist(), tokensPlain: [] };
    expect(denylistProblems(extra).problems).toEqual(['top: unknown member tokensPlain']);
    expect(denylistProblems({ ...denylist(), salt: 'abc' }).problems).toEqual(['salt: not 64 lower-case hex digits']);
    expect(denylistProblems({ ...denylist(), date: '3 October' }).problems).toEqual(['date: not an ISO 8601 date-time']);
    const r = check(unsorted, { kind: 'denylist', file: 'packages/testkit/baselines/denylist.json' });
    expect(line(r, 'C1').status).toBe('fail');
  });
});

describe('the ng-faces kind (N-21)', () => {
  it('a synthetic file passes; C1 holds attachment B refusals; C4 compares hoods and faces by id', () => {
    const f = synthetic();
    const file = 'packages/testkit/baselines/ng-faces.json';
    expect(check(f, { kind: 'ng-faces', file }).pass).toBe(true);
    const bad = synthetic() as unknown as { hoods: Record<string, unknown>[] };
    bad.hoods[0]['seedLabel'] = 'two words';
    expect(line(check(bad, { kind: 'ng-faces', file }), 'C1').problems).toEqual(['hoods[0] (id 1): seedLabel outside its pattern']);
    const prev = synthetic();
    const now = synthetic();
    now.faces.pop();
    const earlier = record(enc(prev), 3, { file });
    const r = check(now, { kind: 'ng-faces', file, crossings: [earlier, record(enc(now), 2, { file })], previous: prev });
    expect(line(r, 'C4').problems).toEqual(['face 12 deleted (rows are append-only; a new row supersedes)']);
  });
});

describe('hardening round S1 (N-j): a crossing of an empty file fails C1, never passes', () => {
  const EMPTY_ROWS = 'file: empty: the file holds no row — an empty baseline file fails, never passes vacuously (§13.8 Edges; C-0099)';
  const EMPTY_FACES = 'faces: empty: the file holds no face — an empty face file fails, never passes vacuously (§13.8 Edges; C-0099)';
  it('baselines.json as [] or { rows: [] } with its rows-0 record: C1 fails naming it, every other check and the record pass', () => {
    for (const v of [[], { schema: 'plat.baselines/1', metricsVersion: '1.0.0', rows: [] }]) {
      const r = check(v);
      expect(r.rows).toBe(0);
      expect(r.record.status).toBe('pass');
      expect(line(r, 'C1')).toEqual({ id: 'C1', status: 'fail', problems: [EMPTY_ROWS] });
      expect(r.checks.filter((c) => c.status === 'fail').map((c) => c.id)).toEqual(['C1']);
      expect(r.pass).toBe(false);
    }
    // one row is not empty: the clean one-row file passes
    expect(check([rows2()[0]]).pass).toBe(true);
  });

  it('ng-faces.json of no face (hoods kept or not): C1 fails naming it; a file with faces passes', () => {
    const file = 'packages/testkit/baselines/ng-faces.json';
    for (const v of [{ ...synthetic(), faces: [] }, { ...synthetic(), hoods: [], faces: [] }]) {
      const r = check(v, { kind: 'ng-faces', file });
      expect(r.rows).toBe(0);
      expect(r.record.status).toBe('pass');
      expect(line(r, 'C1').status).toBe('fail');
      expect(line(r, 'C1').problems).toContain(EMPTY_FACES);
      expect(r.pass).toBe(false);
    }
    expect(line(check({ ...synthetic(), hoods: [], faces: [] }, { kind: 'ng-faces', file }), 'C1').problems).toEqual([EMPTY_FACES]);
    expect(check(synthetic(), { kind: 'ng-faces', file }).pass).toBe(true);
  });

  it('the command: the note probe — [] with a rows-0 record — exits 1 (it exited 0 before the round)', () => {
    const root = mkdtempSync(join(tmpdir(), 'plat-k05-empty-'));
    try {
      mkdirSync(join(root, 'packages', 'testkit', 'baselines'), { recursive: true });
      writeFileSync(join(root, FILE), '[]\n');
      writeFileSync(join(root, 'packages', 'testkit', 'baselines', 'crossings.json'), JSON.stringify([record(Buffer.from('[]\n'), 0)]));
      const r = runBaselinesCheck([FILE], { platRoot: root });
      expect(r.code).toBe(1);
      expect(r.lines[0]).toMatch(/^baselines:check packages\/testkit\/baselines\/baselines\.json \(baselines, 0 rows, sha256 37517e5f3dc6…\): fail$/);
      expect(r.lines).toContain(`  C1 fail: ${EMPTY_ROWS}`);
      expect(r.lines).toContain('  record pass');
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});

describe('runBaselinesCheck: the command (C-0113)', () => {
  let root = '';
  beforeAll(() => {
    root = mkdtempSync(join(tmpdir(), 'plat-k05-check-'));
    mkdirSync(join(root, 'packages', 'testkit', 'baselines'), { recursive: true });
  });
  afterAll(() => rmSync(root, { recursive: true, force: true }));
  const put = (rel: string, text: string): void => writeFileSync(join(root, rel), text);

  it('exits 0 pass, 1 fail, 2 missing or not JSON, 64 usage; the crossings.json beside the file holds its record', () => {
    const v = rows2();
    const text = JSON.stringify(v);
    put(FILE, text);
    put('packages/testkit/baselines/crossings.json', '[]\n');
    const fail = runBaselinesCheck([FILE], { platRoot: root });
    expect(fail.code).toBe(1);
    expect(fail.lines.join('\n')).toMatch(/record fail: record missing/);
    put('packages/testkit/baselines/crossings.json', JSON.stringify([record(Buffer.from(text), 2)]));
    const ok = runBaselinesCheck([FILE], { platRoot: root });
    expect(ok.code).toBe(0);
    expect(JSON.parse(ok.text ?? '')).toMatchObject({ pass: true, kind: 'baselines', rows: 2 });
    expect(ok.lines[0]).toMatch(/^baselines:check packages\/testkit\/baselines\/baselines\.json \(baselines, 2 rows, sha256 [0-9a-f]{12}…\): pass$/);
    expect(ok.lines.filter((l) => /C(8|9|10) not run — not run at M0/.test(l)).length).toBe(3);
    expect(runBaselinesCheck(['packages/testkit/baselines/ng-faces.json'], { platRoot: root })).toMatchObject({ code: 2, lines: ['baselines:check stopped: packages/testkit/baselines/ng-faces.json: missing file'] });
    put('packages/testkit/baselines/denylist.json', '{ broken');
    expect(runBaselinesCheck(['packages/testkit/baselines/denylist.json'], { platRoot: root }).code).toBe(2);
    expect(runBaselinesCheck([], { platRoot: root }).code).toBe(64);
    expect(runBaselinesCheck(['notes.json'], { platRoot: root }).code).toBe(64);
    expect(runBaselinesCheck([FILE, '--force'], { platRoot: root }).code).toBe(64);
    expect(runBaselinesCheck(['/etc/baselines.json'], { platRoot: root }).code).toBe(64);
    expect(runBaselinesCheck([FILE, '--previous', '/etc/hosts'], { platRoot: root }).code).toBe(64);
    expect(kindOfFile('a/b/ng-faces.json')).toBe('ng-faces');
  });
});
